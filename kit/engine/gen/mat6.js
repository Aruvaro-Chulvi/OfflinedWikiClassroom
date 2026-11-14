/* WikiAula — Matemáticas, Grado 6 (6.º de Primaria): generadores propios de este curso
   (el resto de las lecciones usan los de 4.º y 5.º).
   Textos: i18n/<lang>/mat6.js (S.m6). Dibujos: WA.SVG (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const X = "×";
// Opciones sin repetir: la buena y las de "cands" (hasta n), barajadas
function opt6(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ═════ Unidad 1 · Patrones y números desconocidos ═════
// Serie aritmética (+d o −d) o geométrica (× 2, × 3)
function serie(R) {
  const t = R.r();
  if (t < 0.3) { const r = R.r() < 0.7 ? 2 : 3, a = R.int(1, r === 2 ? 12 : 5); return { kind: "g", r, seq: Array.from({ length: 6 }, (_, i) => a * r ** i) }; }
  const d = R.int(2, 15), up = t < 0.75, a = up ? R.int(1, 150) : R.int(6 * d, 6 * d + 120);
  return { kind: "a", d, up, seq: Array.from({ length: 6 }, (_, i) => a + (up ? i : -i) * d) };
}
const ruleTxt = (T, s) => s.kind === "g" ? T.por(s.r) : s.up ? T.mas(s.d) : T.menos(s.d);
def("m6.series", (R, S, H) => {
  const T = S.m6.SE, k = R.int(0, 3), s = serie(R), sh = s.seq.slice(0, 4).map(H.n).join(", ");
  if (k === 0) return { q: T.sig_q(sh), kind: "int", ans: s.seq[4], sol: T.sig_s(ruleTxt(T, s), H.n(s.seq[3]), H.n(s.seq[4])) };
  if (k === 1) return { q: T.dos_q(sh), kind: "fields", fields: [{ label: T.f[0], ans: s.seq[4] }, { label: T.f[1], ans: s.seq[5] }], sol: T.dos_s(ruleTxt(T, s), H.n(s.seq[4]), H.n(s.seq[5])) };
  if (k === 2) {   // la regla: comprobar con todos los saltos
    let cands;
    if (s.kind === "g") cands = [T.mas(s.seq[1] - s.seq[0]), T.por(s.r === 2 ? 3 : 2), T.mas(s.seq[2] - s.seq[1])];
    else cands = [s.up ? T.menos(s.d) : T.mas(s.d), (s.up ? T.mas : T.menos)(s.d + 1), (s.up ? T.mas : T.menos)(s.d - 1 || s.d + 2), T.por(2)];
    const { opts, correct } = opt6(R, ruleTxt(T, s), cands);
    return { q: T.regla_q(s.seq.slice(0, 5).map(H.n).join(", ")), kind: "choice", opts, correct, sol: T.regla_s(s.seq.slice(0, 5).map(H.n), ruleTxt(T, s), s.kind === "g" ? X + " " + s.r : (s.up ? "+" : "−") + " " + s.d) };
  }
  // un término lejano de una serie que suma
  const a = R.int(1, 30), d = R.int(2, 12), n = R.int(10, 40), ans = a + (n - 1) * d;
  return { q: T.lejos_q([0, 1, 2, 3].map(i => H.n(a + i * d)).join(", "), n), kind: "int", ans, sol: T.lejos_s(H.n(a), d, n, H.n(ans)) };
});

// Figuras de palillos: 0 triángulos en fila (1 + 2n) · 1 cuadrados en fila (1 + 3n) · 2 casitas en fila (1 + 5n)
const PER = [2, 3, 5], FIRST = [3, 4, 6];
function sticks(kind, n, x0, y0, u = 22) {
  const segs = [], h = u * 0.87;
  if (kind === 0) {
    for (let i = 0; i < n; i++) {
      const up = i % 2 === 0, bx = x0 + i * u / 2;
      if (up) { segs.push([bx, y0 + h, bx + u, y0 + h]); if (i === 0) segs.push([bx, y0 + h, bx + u / 2, y0]); segs.push([bx + u / 2, y0, bx + u, y0 + h]); }
      else { segs.push([bx, y0, bx + u, y0]); segs.push([bx + u / 2, y0 + h, bx + u, y0]); }
    }
  } else {
    const yb = kind === 2 ? y0 + u * 0.7 : y0;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * u;
      segs.push([x, yb, x + u, yb], [x, yb + u, x + u, yb + u], [x + u, yb, x + u, yb + u]);
      if (i === 0) segs.push([x, yb, x, yb + u]);
      if (kind === 2) segs.push([x, yb, x + u / 2, yb - u * 0.7], [x + u / 2, yb - u * 0.7, x + u, yb]);
    }
  }
  return segs.map(([a, b, c, d]) => `<line x1="${a.toFixed(1)}" y1="${b.toFixed(1)}" x2="${c.toFixed(1)}" y2="${d.toFixed(1)}" stroke="#c98a3e" stroke-width="3.2" stroke-linecap="round"/>`).join("")
    + segs.map(([a, b, c, d]) => `<circle cx="${c.toFixed(1)}" cy="${d.toFixed(1)}" r="1.8" fill="${C.red}"/>`).join("");
}
function stages(kind, T) {   // las figuras 1, 2 y 3
  let b = "", x = 10;
  const w = n => kind === 0 ? (n + 1) * 11 : n * 22;
  for (let n = 1; n <= 3; n++) { b += sticks(kind, n, x, kind === 2 ? 10 : 18) + SVG.txt(x + w(n) / 2, 72, T.fig(n), 11, C.dark); x += w(n) + 34; }
  return SVG.svg(x - 20, 80, b);
}
def("m6.palillos", (R, S) => {
  const T = S.m6.PA, kind = R.int(0, 2), p = PER[kind], f = FIRST[kind], P = n => 1 + p * n, k = R.int(0, 3), pic = "<br>" + stages(kind, T);
  const head = T.intro(T.que[kind], [1, 2, 3].map(P).join(", "));
  if (k === 0) { const n = R.int(5, 25); return { q: head + " " + T.cuantos_q(n, T.que[kind]) + pic, kind: "int", ans: P(n), sol: T.cuantos_s(f, p, n, P(n), T.que[kind]) }; }
  if (k === 1) { const n = R.int(5, 30); return { q: head + " " + T.cuantas_q(P(n), T.que[kind]) + pic, kind: "int", ans: n, sol: T.cuantas_s(p, n, P(n)) }; }
  if (k === 2) {   // la regla general
    const { opts, correct } = opt6(R, T.regla(1, p), [T.regla(0, f), T.regla(f, p), T.regla(0, p)]);
    return { q: head + " " + T.regla_q(T.que[kind]) + pic, kind: "choice", opts, correct, sol: T.regla_s(f, p, T.que[kind]) };
  }
  const n = R.int(4, 9);   // completar la tabla
  return { q: T.tabla_q(T.que[kind], [1, 2, 3].map(P).join(" | "), n) + pic, kind: "int", ans: P(n), sol: T.cuantos_s(f, p, n, P(n), T.que[kind]) };
});

def("m6.desconocido", (R, S, H) => {
  const T = S.m6.DE, k = R.int(0, 6), v = R.pick(["x", "n", "□"]);
  if (k === 0) { const x = R.int(5, 90), a = R.int(5, 60); return { q: T.halla_q(v, `${v} + ${a} = ${x + a}`), kind: "int", ans: x, sol: T.suma_s(v, a, x + a, x) }; }
  if (k === 1) { const x = R.int(20, 120), a = R.int(5, x - 5); return { q: T.halla_q(v, `${v} − ${a} = ${x - a}`), kind: "int", ans: x, sol: T.resta_s(v, a, x - a, x) }; }
  if (k === 2) { const a = R.int(2, 12), x = R.int(2, 15); return { q: T.halla_q(v, `${a} ${X} ${v} = ${a * x}`), kind: "int", ans: x, sol: T.mult_s(v, a, a * x, x) }; }
  if (k === 3) { const a = R.int(2, 9), x = a * R.int(2, 12); return { q: T.halla_q(v, `${v} ${WA.H.div} ${a} = ${x / a}`), kind: "int", ans: x, sol: T.div_s(v, a, x / a, x) }; }
  if (k === 4) {   // dos operaciones: se deshacen en orden inverso
    const a = R.int(2, 9), x = R.int(2, 12), b = R.int(1, 20), plus = R.r() < 0.6, c = plus ? a * x + b : a * x - b;
    if (c <= 0) return { q: T.halla_q(v, `${a} ${X} ${v} + ${b} = ${a * x + b}`), kind: "int", ans: x, sol: T.dos_s(v, a, b, a * x + b, x, true) };
    return { q: T.halla_q(v, `${a} ${X} ${v} ${plus ? "+" : "−"} ${b} = ${c}`), kind: "int", ans: x, sol: T.dos_s(v, a, b, c, x, plus) };
  }
  if (k === 5) {   // «Pienso un número…»
    const a = R.int(2, 9), x = R.int(2, 15), b = R.int(1, 15), plus = R.r() < 0.6, c = plus ? a * x + b : a * x - b;
    if (c <= 0 || R.r() < 0.3) return { q: T.pienso1_q(a, a * x), kind: "int", ans: x, sol: T.pienso1_s(a, a * x, x) };
    return { q: T.pienso_q(a, b, plus, c), kind: "int", ans: x, sol: T.pienso_s(a, b, plus, c, x) };
  }
  const a = R.int(1, 9), x = R.int(2, 15);   // la balanza
  const pic = SVG.svg(240, 96, `<line x1="120" y1="22" x2="120" y2="86" stroke="${C.dark}" stroke-width="3"/><rect x="96" y="84" width="48" height="6" fill="${C.dark}"/><line x1="30" y1="22" x2="210" y2="22" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/>`
    + `<rect x="18" y="38" width="30" height="24" fill="#d9b382" stroke="${C.dark}"/>` + SVG.txt(33, 55, "?", 14, C.dark, "middle", "bold")
    + `<rect x="54" y="44" width="26" height="18" fill="${C.grey}" stroke="${C.dark}"/>` + SVG.txt(67, 57, `${a} kg`, 10, C.dark, "middle", "bold")
    + `<rect x="166" y="38" width="36" height="24" fill="${C.grey}" stroke="${C.dark}"/>` + SVG.txt(184, 55, `${a + x} kg`, 11, C.dark, "middle", "bold")
    + `<line x1="12" y1="62" x2="86" y2="62" stroke="${C.dark}" stroke-width="2"/><line x1="156" y1="62" x2="214" y2="62" stroke="${C.dark}" stroke-width="2"/><line x1="49" y1="22" x2="49" y2="38" stroke="${C.dark}"/><line x1="184" y1="22" x2="184" y2="38" stroke="${C.dark}"/>`);
  return { q: T.balanza_q(a, a + x) + "<br>" + pic, kind: "int", ans: x, sol: T.balanza_s(a, a + x, x) };
});

// ¿>, < o =? Se calcula cada lado respetando la jerarquía
function side(R) {
  const t = R.int(0, 3), a = R.int(2, 12), b = R.int(2, 12);
  if (t === 0) return [`${a} ${X} ${b}`, a * b];
  if (t === 1) { const c = R.int(10, 90), d = R.int(1, c - 1); return [`${c} − ${d}`, c - d]; }
  if (t === 2) { const c = R.int(10, 90), d = R.int(2, 40); return [`${c} + ${d}`, c + d]; }
  const q = R.int(2, 12); return [`${a * q} ${WA.H.div} ${a}`, q];
}
def("m6.signo", (R, S) => {
  const T = S.m6.SG;
  let L, Rr, tries = 0;
  do { L = side(R); Rr = side(R); tries++; } while ((Math.abs(L[1] - Rr[1]) > 6 || (L[1] !== Rr[1] && R.r() < 0.15)) && tries < 200);
  if (R.r() < 0.25 && L[1] > 3) {   // a veces, iguales: el otro lado se ajusta con una suma o una resta
    const d = R.int(1, L[1] - 1); Rr = [`${L[1] - d} + ${d}`, L[1]];
    if (R.r() < 0.5) { const e = R.int(1, 30); Rr = [`${L[1] + e} − ${e}`, L[1]]; }
  }
  const k = L[1] > Rr[1] ? 0 : L[1] < Rr[1] ? 1 : 2;
  return { q: T.q(L[0], Rr[0]), kind: "choice", opts: [">", "<", "="], correct: k, shuffle: false, sol: T.s(L[0], L[1], Rr[0], Rr[1], k) };
});
// ═════════════ Grado 6: versiones de Primaria de los generadores de 1.º de ESO ═════════════
// Signo × y «dividir entre», sin letras como números generales, decimales hasta las milésimas,
// números de la vida diaria y soluciones con los pasos de cada lección. Textos: S.m6 (i18n/es/mat6.js).
const { gcd, lcm, factorize, F, eur, digitSum } = WA.MATH;
const pad6 = (s, n) => String(s).padStart(n, "0");
const neg6 = n => n < 0 ? "−" + Math.abs(n) : String(n);
const fxh = (H, f) => Object.keys(f).map(Number).sort((a, b) => a - b).map(p => f[p] > 1 ? H.pow(p, f[p]) : String(p)).join(" × ");
const divs6 = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
const mults6 = (d, m) => { const r = []; for (let x = d; x <= m; x += d) r.push(x); return r.join(", "); };
// Decimal con k cifras tras la coma, sin quitar ceros finales: 30, 1 → 3,0
const fix6 = (H, i, k) => { if (!k) return H.n(i); const s = pad6(i, k + 1); return H.n(+s.slice(0, -k)) + H.ds + s.slice(-k); };
const E6 = (H, x) => eur(x, H);

// ── Unidad 1 · Potencias, raíces y potencias de 10 ──
def("m6.raizent", (R, S, H) => {
  const T = S.m6.RZ;
  const big = R.r() < 0.25;   // fuera de la tabla (hasta 15 × 15): se tantea con las decenas
  let n; do n = big ? R.int(230, 899) : R.int(10, 224); while (Number.isInteger(Math.sqrt(n)) || [54, 70, 90, 150, 543].includes(n));
  const r = Math.floor(Math.sqrt(n)), q = r * r, ctx = R.r() < 0.35, f = ctx ? T.fb : T.f, d = Math.floor(r / 10) * 10;
  return { q: ctx ? T.bald_q(n) : T.q(n), kind: "fields", fields: [{ label: f[0], ans: r }, { label: f[1], ans: n - q }],
    sol: (big ? T.tanteo(n, d, d * d, d + 10, (d + 10) * (d + 10)) : "") + T.s(n, r, q, r + 1, (r + 1) * (r + 1), n - q, ctx, big) };
});
def("m6.pot10", (R, S, H) => {
  const T = S.m6.P10, t = R.r();
  if (t < 0.35) {   // natural por una potencia de 10: añadir ceros
    const a = R.int(2, 99), k = R.int(2, 6), r = a * 10 ** k;
    return { q: T.calc_q(`${a} × ${H.pow(10, k)}`), kind: "int", ans: r, sol: T.nat_s(a, H.pow(10, k), k, H.n(r)) };
  }
  if (t < 0.7) {   // decimal por una potencia de 10: mover la coma (y rellenar con ceros)
    const kd = R.int(1, 2); let ix; do ix = kd === 1 ? R.int(11, 99) : R.int(101, 999); while (ix % 10 === 0);
    const k = R.int(kd, 6), r = ix * 10 ** (k - kd), x = ix / 10 ** kd, dd = String(ix).slice(-kd).split("");
    return { q: T.calc_q(`${H.dec(x)} × ${H.pow(10, k)}`), kind: "int", ans: r, sol: T.dec_s(k, dd, k - kd, H.n(r)) };
  }
  // abreviar un número grande: un número entre 1 y 10 por una potencia de 10
  const sig = R.pick([1, 2, 2, 3]);
  let M; do M = R.int(10 ** (sig - 1), 10 ** sig - 1); while (sig > 1 && M % 10 === 0);
  const k = R.int(Math.max(sig, 3), 9), N = M * 10 ** (k - sig + 1), m = H.dec(M / 10 ** (sig - 1)), P = e => H.pow(10, e);
  const good = `${m} × ${P(k)}`, alts = [`${m} × ${P(k - 1)}`, `${m} × ${P(k + 1)}`, sig > 1 ? `${H.n(M)} × ${P(k)}` : `${m} × ${P(k + 2)}`];
  const opts = R.shuffle([good, ...alts]);
  return { q: T.abr_q(H.n(N)), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol: T.abr_s(sig, m, H.n(N), k, good) };
});
def("m6.descomp", (R, S, H) => {
  const T = S.m6.DC, len = R.int(4, 7);
  let ds; do ds = Array.from({ length: len }, (_, i) => i === 0 ? R.int(1, 9) : (R.r() < 0.35 ? 0 : R.int(1, 9))); while (ds.filter(Boolean).length < 3);
  const n = +ds.join(""), terms = ds.map((d, i) => [d, len - 1 - i]).filter(([d]) => d);
  const tH = ([d, e]) => e === 0 ? String(d) : e === 1 ? `${d} × 10` : `${d} × ${H.pow(10, e)}`, val = ([d, e]) => H.n(d * 10 ** e);
  if (R.r() < 0.55) return { q: T.num_q(terms.map(tH).join(" + ")), kind: "int", ans: n, sol: T.num_s(terms.map(t => `${tH(t)} = ${val(t)}`).join("; "), terms.map(val).join(" + "), H.n(n)) };
  const cand = terms.filter(([, e]) => e >= 2), pk = R.pick(cand), [d, e] = pk;
  const shown = terms.map(t => t === pk ? `${d} × 10<sup>□</sup>` : tH(t)).join(" + ");
  return { q: T.exp_q(H.n(n), shown), kind: "int", ans: e, sol: T.exp_s(d, T.pos[e], H.n(d * 10 ** e), H.n(10 ** e), H.pow(10, e), e) };
});

// ── Unidad 1 · Operaciones combinadas «por pisos» ──
// Fichas: {t:"n",v} número · {t:"op",v} + − × : · {t:"pw",v} exponente del anterior · {t:"o"|"c",v} ( ) [ ]
function cParse(tpl, val) {
  return tpl.split(" ").map(w => /^[a-e]$/.test(w) ? { t: "n", v: val[w] } : w[0] === "^" ? { t: "pw", v: +w.slice(1) } : "([".includes(w) ? { t: "o", v: w } : ")]".includes(w) ? { t: "c", v: w } : { t: "op", v: w });
}
function cRender(tk, H) {
  const out = [];
  tk.forEach(x => {
    if (x.t === "pw") { out[out.length - 1] = /<sup>/.test(out[out.length - 1]) ? out[out.length - 1] : out[out.length - 1] + `<sup>${x.v}</sup>`; return; }
    out.push(x.t === "n" ? H.n(x.v) : x.v === ":" ? H.div : x.v);
  });
  return out.join(" ").replace(/([([]) /g, "$1").replace(/ ([)\]])/g, "$1");
}
function cClean(tk) {   // quita paréntesis que solo encierran un número
  for (let i = 0; i + 2 < tk.length; i++) if (tk[i].t === "o" && tk[i + 1].t === "n" && tk[i + 2].t === "c") { tk = tk.slice(0, i).concat([tk[i + 1]], tk.slice(i + 3)); i = -1; }
  return tk;
}
function cLevel(seg) {   // un peldaño de la escalera en un trozo sin paréntesis
  if (seg.some(x => x.t === "pw")) { const o = []; for (const x of seg) { if (x.t === "pw") { if (o[o.length - 1].v < 2) return null; o[o.length - 1] = { t: "n", v: o[o.length - 1].v ** x.v }; } else o.push(x); } return o; }
  if (seg.some(x => x.t === "op" && (x.v === "×" || x.v === ":"))) {
    const o = [seg[0]];
    for (let i = 1; i < seg.length; i += 2) {
      const op = seg[i].v, b = seg[i + 1].v;
      if (op === "×" || op === ":") {
        const a = o[o.length - 1].v;
        if (op === ":" && (!b || a % b)) return null;
        o[o.length - 1] = { t: "n", v: op === "×" ? a * b : a / b };
      } else o.push(seg[i], seg[i + 1]);
    }
    return o;
  }
  let r = seg[0].v;
  for (let i = 1; i < seg.length; i += 2) { r = seg[i].v === "+" ? r + seg[i + 1].v : r - seg[i + 1].v; if (r < 0) return null; }
  return [{ t: "n", v: r }];
}
function cEval(tk, H) {   // → {lines, v} o null si sale un negativo, una división no exacta o números enormes
  const lines = [];
  for (let g = 0; g < 30; g++) {
    tk = cClean(tk);
    if (tk.length === 1) return { lines, v: tk[0].v };
    const close = tk.findIndex(x => x.t === "c");
    let lo = 0, hi = tk.length;
    if (close >= 0) { let open = close; while (tk[open].t !== "o") open--; lo = open + 1; hi = close; }
    const seg = cLevel(tk.slice(lo, hi));
    if (!seg || seg.some(x => x.t === "n" && (x.v > 5000 || x.v === 0))) return null;
    tk = cClean(tk.slice(0, lo).concat(seg, tk.slice(hi)));
    lines.push(cRender(tk, H));
  }
  return null;
}
const CTPL = ["a + b × ( c − d ) ^2", "a ^2 − b × c", "a × [ b − ( c + d ) ]", "[ a + ( b − c ) × d ] : e", "a + b ^2 : c", "( a + b ) × c − d ^2",
  "a − [ b + c × ( d − e ) ]", "a ^3 + b × c", "( a − b ) ^2 + c : d", "a × b − c : d + e", "[ ( a + b ) × c − d ] : e", "a × ( b + c ) − d", "a + b × c − d : e",
  "a × [ b + c × ( d − e ) ]", "( a + b ^2 ) : c"];
def("m6.combinadas", (R, S, H) => {
  const T = S.m6.CB;
  for (let k = 0; k < 400; k++) {
    const tpl = R.pick(CTPL), val = {};
    "abcde".split("").forEach(l => { val[l] = R.int(2, 20); });
    const m3 = /([a-e]) \^3/.exec(tpl), m2 = /([a-e]) \^2/.exec(tpl);
    if (m3) val[m3[1]] = R.int(2, 5);
    if (m2) val[m2[1]] = R.int(2, 10);
    const tk = cParse(tpl, val), ev = cEval(tk, H);
    if (!ev || ev.v > 999 || ev.lines.length < 2) continue;
    const first = cRender(tk, H);
    return { q: T.q(first), kind: "int", ans: ev.v, sol: T.s(first, ev.lines.slice(0, -1), H.n(ev.v)) };
  }
  return null;
});
// ¿Dónde van los paréntesis? (todas las opciones dan resultados distintos) · ¿Qué expresión resuelve el problema?
def("m6.parentesis", (R, S, H) => {
  const T = S.m6.PA2;
  if (R.r() < 0.35) {
    for (let k = 0; k < 200; k++) {
      if (R.r() < 0.6) {
        const n1 = R.int(2, 6), p1 = R.int(1, 5), n2 = R.int(2, 6), p2 = R.int(1, 4), tot = n1 * p1 + n2 * p2, B = [10, 20, 50].find(x => x > tot + 1);
        if (!B) continue;
        const [o1, o2] = R.pick(T.cosas), good = `${B} − (${n1} × ${p1} + ${n2} × ${p2})`;
        const alts = [[`${B} − ${n1} × ${p1} + ${n2} × ${p2}`, B - n1 * p1 + n2 * p2], [`(${B} − ${n1}) × ${p1} + ${n2} × ${p2}`, (B - n1) * p1 + n2 * p2], [`${B} − ${n1} × (${p1} + ${n2}) × ${p2}`, B - n1 * (p1 + n2) * p2]];
        if (alts.some(a => a[1] === B - tot)) continue;
        const opts = R.shuffle([good, ...alts.map(a => a[0])]);
        return { q: T.compra_q(n1, o1, p1, n2, o2, p2, B), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol: T.compra_s(n1, p1, n2, p2, tot, B, B - tot, alts[0][0], alts[0][1], o2) };
      }
      const c = R.int(3, 8), q = R.int(4, 15), a = R.int(5, c * q - 1), b = c * q - a, good = `(${a} + ${b}) ${WA.H.div} ${c}`;
      if (a % c === 0 && b % c === 0) continue;
      const alts = [`${a} + ${b} ${WA.H.div} ${c}`, `${a} ${WA.H.div} ${c} + ${b}`, `${a} + ${b} × ${c}`];
      const opts = R.shuffle([good, ...alts]), o = R.pick(T.reparto);
      return { q: T.rep_q(a, b, c, o), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol: T.rep_s(a, b, c, a + b, q, o) };
    }
    return null;
  }
  for (let k = 0; k < 300; k++) {
    const four = R.r() < 0.5, nn = four ? 4 : 3, ns = Array.from({ length: nn }, () => R.int(2, 12)), ops = Array.from({ length: nn - 1 }, () => R.pick(["+", "−", "×", "×", ":"]));
    const spans = nn === 3 ? [[0, 1], [1, 2]] : [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];
    const build = sp => { const w = []; ns.forEach((v, i) => { if (sp && i === sp[0]) w.push({ t: "o", v: "(" }); w.push({ t: "n", v }); if (sp && i === sp[1]) w.push({ t: "c", v: ")" }); if (i < ops.length) w.push({ t: "op", v: ops[i] }); }); return w; };
    const v0 = cEval(build(null), H);
    if (!v0) continue;
    const all = spans.map(sp => { const tk = build(sp), ev = cEval(tk, H); return ev ? { txt: cRender(tk, H), v: ev.v } : null; }).filter(Boolean);
    const cand = all.filter(o => o.v !== v0.v && all.filter(p => p.v === o.v).length === 1 && o.v <= 999);
    if (!cand.length) continue;
    const good = R.pick(cand), others = R.shuffle(all.filter(o => o !== good && o.v !== good.v)).slice(0, 3);
    if (!others.length) continue;
    if (nn === 3) others.push({ txt: T.ninguno, v: v0.v });
    const opts = R.shuffle([good, ...others]);
    return { q: T.q(cRender(build(null), H), H.n(good.v)), kind: "choice", opts: opts.map(o => o.txt), correct: opts.indexOf(good), shuffle: false,
      sol: T.s(opts.filter(o => o.txt !== T.ninguno).map(o => `${o.txt} = ${H.n(o.v)}`).join("; "), good.txt, H.n(good.v), cRender(build(null), H), H.n(v0.v)) };
  }
  return null;
});

// ── Unidad 1 · Números enteros en contexto (contando hasta el cero, como en la lección) ──
def("m6.enteros", (R, S, H) => {
  const T = S.m6.EN, t = R.int(0, 4);
  if (t === 0 || t === 1) {   // temperatura o ascensor que sube o baja
    const temp = t === 0, U = temp ? T.grados : T.plantas;
    let s, c, up;
    do { up = R.r() < 0.5; s = temp ? R.int(-12, 12) : R.int(-4, 9); c = temp ? R.int(2, 15) : R.int(2, 9); } while (!s || (up && s > 0) || (s === -4 && c === 9 && up));
    const r = up ? s + c : s - c;
    let sol;
    if (up) sol = r > 0 ? T.cruza_up(neg6(s), -s, c, r, U) : T.noCruza_up(neg6(s), c, neg6(r), U);
    else if (s > 0) sol = r < 0 ? T.cruza_down(s, c, -r, neg6(r), U) : T.noCruza_down(s, c, r, U);
    else sol = T.bajo_cero(neg6(s), c, -s, -r, neg6(r), U);
    return { q: temp ? T.temp_q(neg6(s), up, c) : T.asc_q(neg6(s), up, c), kind: "int", ans: r, sol };
  }
  if (t === 2) {   // diferencia entre la máxima y la mínima
    let M, m; do { M = R.r() < 0.8 ? R.int(1, 20) : R.int(-8, -1); m = R.int(-15, -1); } while (m >= M || (M === 9 && m === -4) || (M === 5 && m === -3));
    return { q: T.dif_q(R.pick(T.sitios), neg6(M), neg6(m)), kind: "int", ans: M - m, sol: M > 0 ? T.dif_s(neg6(m), -m, M, M - m) : T.dif2_s(neg6(m), neg6(M), -m, -M, M - m) };
  }
  if (t === 3) {   // dinero: tener y deber
    if (R.r() < 0.5) { const a = R.int(2, 20), g = R.int(a + 1, a + 25), r = a - g; return { q: T.gasto_q(a, g), kind: "int", ans: r, sol: T.gasto_s(a, g, -r, neg6(r)) }; }
    const d = R.int(2, 20), g = R.int(2, 30), r = g - d;
    return { q: T.deuda_q(d, g), kind: "int", ans: r, sol: r >= 0 ? T.deuda_s(d, g, r) : T.deuda2_s(d, g, -r, neg6(r)) };
  }
  // bajo el nivel del mar
  if (R.r() < 0.6) { let d, u; do { d = 10 * R.int(2, 20); u = 10 * R.int(1, d / 10 - 1); } while (d === 80 && u === 30); return { q: T.sub_q(d, u), kind: "int", ans: u - d, sol: T.sub_s(d, u, d - u, neg6(u - d)) }; }
  const d = R.int(3, 20), b = R.int(2, 15);
  return { q: T.buzo_q(d, b), kind: "int", ans: -(d + b), sol: T.buzo_s(d, b, d + b, neg6(-(d + b))) };
});
def("m6.opuesto", (R, S, H) => {
  const T = S.m6.OP, t = R.r();
  if (t < 0.35) { let n; do n = R.int(-60, 60); while (!n || n === -25 || n === -7); return { q: T.abs_q(neg6(n)), kind: "int", ans: Math.abs(n), sol: T.abs_s(neg6(n), Math.abs(n)) }; }
  if (t < 0.7) { let n; do n = R.int(-60, 60); while (!n || n === -7); return { q: T.op_q(neg6(n)), kind: "int", ans: -n, sol: T.op_s(neg6(n), neg6(-n), Math.abs(n)) }; }
  let a, b; do { a = R.int(-20, 20); b = R.int(-20, 20); } while (!a || !b || Math.abs(a) === Math.abs(b) || (a > 0 && b > 0));
  const big = Math.abs(a) > Math.abs(b) ? 0 : 1;
  return { q: T.mas_q(neg6(a), neg6(b)), kind: "choice", opts: [neg6(a), neg6(b)], correct: big, shuffle: false, sol: T.mas_s(neg6(a), Math.abs(a), neg6(b), Math.abs(b), [neg6(a), neg6(b)][big]) };
});
def("m6.entcomp", (R, S, H) => {
  const T = S.m6.EC;
  if (R.r() < 0.25) {   // el mayor o el menor de cuatro
    const xs = []; while (xs.length < 4) { const x = R.int(-15, 15); if (!xs.includes(x)) xs.push(x); }
    if (xs.every(x => x >= 0)) xs[0] = -xs[0] || -3;
    const menor = R.r() < 0.5, v = menor ? Math.min(...xs) : Math.max(...xs), o = xs.slice().sort((p, q) => p - q);
    return { q: T.ext_q(menor, xs.map(neg6).join(", ")), kind: "choice", opts: xs.map(neg6), correct: xs.indexOf(v), shuffle: false, sol: T.ext_s(o.map(neg6).join(" &lt; "), menor, neg6(v)) };
  }
  let a, b; do { a = R.int(-20, 20); b = R.int(-20, 20); } while (a === b || (a >= 0 && b >= 0) || (a === -21 && b === -12));
  const gt = a > b;
  return { q: T.q(neg6(a), neg6(b)), kind: "choice", opts: ["&lt;", "&gt;"], correct: gt ? 1 : 0, shuffle: false, sol: T.s(neg6(gt ? a : b), `${neg6(a)} ${gt ? "&gt;" : "&lt;"} ${neg6(b)}`, a < 0 && b < 0) };
});
// Problemas de comparar con el modelo de barras
def("m6.barras", (R, S, H) => {
  const T = S.m6.BA, [p1, p2] = R.shuffle(T.nombres).slice(0, 2), cosa = R.pick(T.cosas), t = R.int(0, 2);
  if (t === 0) {   // entre los dos tienen…; uno tiene k veces lo del otro
    const k = R.int(2, 5), x = R.int(6, 40), tot = (k + 1) * x, askSmall = R.r() < 0.5;
    return { q: T.veces_q(p1, p2, tot, cosa, T.veces[k], askSmall ? p1 : p2), kind: "int", ans: askSmall ? x : k * x, sol: T.veces_s(p1, p2, k, tot, x, k * x) };
  }
  if (t === 1) {   // entre los dos tienen…; uno tiene d más
    const x = R.int(8, 60), d = R.int(3, 30), tot = 2 * x + d, askSmall = R.r() < 0.5;
    return { q: T.mas_q(p1, p2, tot, cosa, d, askSmall ? p2 : p1), kind: "int", ans: askSmall ? x : x + d, sol: T.mas_s(p1, p2, tot, d, x, x + d) };
  }
  const k = R.int(2, 5), x = R.int(4, 30), dif = (k - 1) * x;   // uno tiene k veces lo del otro y d más
  return { q: T.dif_q(p1, p2, cosa, T.veces[k], dif), kind: "int", ans: x, sol: T.dif_s(p1, p2, k, dif, x, k * x) };
});

// ── Unidad 1 · Números de 9 y 10 cifras: leer, escribir, valor de una cifra y redondear ──
const cls6 = n => [Math.floor(n / 1e9), Math.floor(n / 1e6) % 1000, Math.floor(n / 1000) % 1000, n % 1000];
const clsTxt6 = n => { const c = cls6(n), i0 = c[0] ? 0 : 1; return c.slice(i0).map((x, i) => i ? pad6(x, 3) : String(x)).join(" | "); };
const dig6 = (n, p) => Math.floor(n / 10 ** p) % 10;
function grande6(R, m0) {   // m0: con el grupo de los millones vacío (000)
  const ten = m0 || R.r() < 0.6, g = () => R.pick([0, R.int(1, 99), R.int(100, 999), R.int(1, 9) * 100, R.int(100, 999)]);
  for (;;) {
    const a = ten ? R.int(1, 9) : 0, m = m0 ? 0 : ten ? R.pick([0, R.int(2, 99), R.int(100, 999), R.int(100, 999)]) : R.int(100, 999);
    const n = a * 1e9 + m * 1e6 + g() * 1000 + g();
    if (n % 1e6 && n !== 7425093816 && n !== 2305040078) return n;
  }
}
function escr6(R, T, H, L, W) {
  const n = grande6(R, R.r() < 0.25), c = cls6(n), i0 = c[0] ? 0 : 1;
  const parts = c.map((x, i) => [T.cl[i], x ? T.frag(L, x, i) : "", i > i0 ? pad6(x, 3) : String(x)]).slice(i0);
  return { q: T.escr_q(W(n)), kind: "int", ans: n, sol: T.escr_s(parts, H.n(n)) };
}
def("m6.grandes", (R, S, H, L) => {
  const T = S.m6.GR, k = R.int(0, 3), W = n => T.words(L, n);
  if (k === 0) return escr6(R, T, H, L, W);   // escribir con cifras, clase a clase
  if (k === 1) {   // valor de una cifra que sale una sola vez
    for (let g = 0; g < 50; g++) {
      const n = grande6(R), s = String(n), ps = [];
      for (let p = 3; p < s.length; p++) { const d = dig6(n, p); if (d && s.split(String(d)).length === 2) ps.push(p); }
      if (!ps.length) continue;
      const p = R.pick(ps), d = dig6(n, p), v = d * 10 ** p;
      return { q: T.val_q(H.n(n), d), kind: "int", ans: v, sol: T.val_s(clsTxt6(n), d, T.pos[p], H.n(v)) };
    }
    return null;
  }
  if (k === 2) {   // redondear a los millones, decenas o centenas de millón, o a los miles de millones
    for (let g = 0; g < 50; g++) {
      const n = grande6(R), len = String(n).length, p = R.pick(len === 10 ? [6, 7, 8, 9] : [6, 7, 8]), td = dig6(n, p), nd = dig6(n, p - 1), up = nd >= 5;
      if (up && td === 9) continue;
      const cut = 10 ** p, r = (Math.floor(n / cut) + (up ? 1 : 0)) * cut;
      return { q: T.red_q(H.n(n), T.lugar[p]), kind: "int", ans: r, sol: T.red_s(T.lugar[p], T.pos[p - 1], nd, up, T.pos[p], td, H.n(r)) };
    }
    return null;
  }
  // ¿cómo se lee? Distractores: saltarse «millones», un «mil» de más, una clase con un cero de más o de menos
  const n = grande6(R, R.r() < 0.4), c = cls6(n), w = W(n), alt = new Set();
  if (c[0] && !c[1]) alt.add(T.sinMill(L, n));
  if (!c[2]) alt.add(W(n + 1000));
  [1, 2, 3].forEach(i => { const x = c[i]; const put = y => { if (y < 1000 && y !== x && !(i === 1 && y === 1)) alt.add(W(c.map((v, j) => j === i ? y : v).reduce((a, b) => a * 1000 + b, 0))); }; if (x && x * 10 < 1000) put(x * 10); if (x && x % 10 === 0) put(x / 10); });
  if (c[0] > 1) alt.add(W(n - 1e9));
  alt.delete(w);
  const first = c[0] && !c[1] ? [T.sinMill(L, n)] : [], rest = R.shuffle([...alt].filter(x => !first.includes(x)));
  const opts = R.shuffle([w, ...first, ...rest].slice(0, 4));
  if (opts.length < 3) return escr6(R, T, H, L, W);
  return { q: T.leer_q(H.n(n)), kind: "choice", opts, correct: opts.indexOf(w), sol: T.leer_s(clsTxt6(n), w, c[0] && !c[1]) };
});
// Distancias en la recta y saltos de la rana (contando hasta el 0)
def("m6.distancia", (R, S, H) => {
  const T = S.m6.DS, nl = (lo, hi, marks) => SVG.numberLine(lo, hi, 1, marks, { w: 460, labelEvery: hi - lo > 16 ? 2 : 1 });
  if (R.r() < 0.5) {
    let a, b, t = R.r(); do { if (t < 0.6) { a = -R.int(1, 15); b = R.int(1, 15); } else if (t < 0.8) { a = -R.int(2, 15); b = -R.int(1, 14); } else { a = R.int(1, 14); b = R.int(2, 15); } } while (a >= b || (a === -9 && b === 6) || (a === -3 && b === 4) || (a === -12 && b === 5));
    const d = b - a;
    const sol = a < 0 && b > 0 ? T.dist_s(neg6(a), -a, b, d) : a < 0 ? T.distN_s(neg6(a), neg6(b), -a, -b, d) : T.distP_s(a, b, d);
    return { q: T.dist_q(neg6(a), neg6(b)), kind: "int", ans: d, sol };
  }
  let s, c, right; do { s = R.int(-9, 9); c = R.int(2, 10); right = R.r() < 0.5; } while (!s || (s === -2 && c === 5 && right) || (s === 5 && c === 9 && !right) || Math.abs(right ? s + c : s - c) > 12);
  const r = right ? s + c : s - c;
  let sol;
  if (right) sol = s < 0 && r > 0 ? T.cruza(neg6(s), -s, c, r, T.der) : s < 0 ? T.acerca(neg6(s), c, T.der, -s, -r, neg6(r)) : T.sigue(s, c, T.der, s, s + c, r);
  else sol = s > 0 && r < 0 ? T.cruza(s, s, c, neg6(r), T.izq) : s > 0 ? T.acerca(s, c, T.izq, s, r, neg6(r)) : T.sigue(neg6(s), c, T.izq, -s, -s + c, neg6(r));
  const lo = Math.min(s, r, -1) - 1, hi = Math.max(s, r, 1) + 1;
  return { q: T.rana_q(neg6(s), c, right) + "<br>" + nl(lo, hi, [{ x: s, label: T.sale }]), kind: "int", ans: r, sol };
});

// ── Unidad 2 · Divisibilidad ──
const CRD = [2, 3, 5, 9, 10];
const sumTxt = n => String(n).split("").join(" + ");
def("m6.criterio", (R, S, H) => {
  const T = S.m6.CR, t = R.r();
  if (t < 0.3) {
    let n; do n = R.r() < 0.75 ? R.pick([2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90]) * R.int(12, 200) : R.int(100, 9999); while (CRD.every(d => n % d));
    return { q: T.multi_q(n), kind: "multi", opts: CRD.map(String), correct: CRD.map((d, i) => n % d === 0 ? i : -1).filter(i => i >= 0), sol: CRD.map(d => T.s[d](n, n % d === 0, sumTxt(n), digitSum(n))).join("<br>") };
  }
  if (t < 0.5) {
    const d = R.pick([3, 3, 9, 9, 2, 5, 10]);
    if (d === 3 || d === 9) {
      const a = R.int(1, 99), b = R.int(0, 9), s0 = digitSum(a) + b, ans = [];
      for (let x = 0; x <= 9; x++) if ((s0 + x) % d === 0) ans.push(x);
      return { q: T.hueco_q(`${a}_${b}`, d), kind: "set", ans, sol: T.hueco39_s(String(a).split("").concat([b]).join(" + "), s0, d, ans.join(", ")) };
    }
    const a = R.int(10, 999), ans = d === 2 ? [0, 2, 4, 6, 8] : d === 5 ? [0, 5] : [0];
    return { q: T.hueco_q(`${a}_`, d), kind: "set", ans, sol: T.hueco_s[d] };
  }
  const d = R.pick(CRD), yes = R.r() < 0.5;
  let n; do n = R.int(100, 9999); while ((n % d === 0) !== yes);
  return { q: T.q(n, d), kind: "choice", opts: T.sino, correct: yes ? 0 : 1, shuffle: false, sol: T.s[d](n, yes, sumTxt(n), digitSum(n)) };
});
const PRI6 = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149];
const COMP6 = [49, 77, 91, 119, 121, 133, 143, 161, 169, 187, 57, 87, 93, 111, 117, 129, 141, 145, 155, 185, 69, 81, 63, 99, 125, 115];
def("m6.primo", (R, S, H) => {
  const T = S.m6.PR, n = R.r() < 0.5 ? R.pick(PRI6) : R.pick(COMP6), st = [];
  for (const p of [2, 3, 5, 7, 11, 13]) {
    if (p * p > n) return { q: T.q(n), kind: "choice", opts: T.opts, correct: 0, shuffle: false, sol: st.join("<br>") + "<br>" + T.primo(p, p * p, n) };
    const ok = n % p === 0;
    st.push(T.paso(p, n, ok, String(n).slice(-1), digitSum(n), Math.floor(n / p), n % p));
    if (ok) return { q: T.q(n), kind: "choice", opts: T.opts, correct: 1, shuffle: false, sol: st.join("<br>") + "<br>" + T.comp(n, p, n / p) };
  }
  return null;
});
// Número compuesto con sus factores (2, 3, 5, 7, 11, 13), entre 12 y 500
function compuesto6(R, maxN = 500) {
  for (;;) {
    const k = R.int(2, 6); let n = 1; const fs = [];
    for (let i = 0; i < k; i++) { const p = R.pick([2, 2, 2, 3, 3, 3, 5, 5, 7, 7, 11, 13]); n *= p; fs.push(p); }
    if (n >= 12 && n <= maxN) return { n, fs: fs.sort((a, b) => a - b) };
  }
}
def("m6.factoriza", (R, S, H) => {
  const T = S.m6.FA, { n, fs } = compuesto6(R), f = factorize(n), good = fxh(H, f);
  if (R.r() < 0.3 && fs.length >= 3) {
    const ps = Object.keys(f).map(Number), p0 = R.pick(ps), w1 = Object.assign({}, f); w1[p0] = f[p0] + 1;
    const p = fs[0], alt2 = `${p} × ${n / p}`, w3 = Object.assign({}, f); const pr = ps.find(x => f[x] > 1) || ps[0]; w3[pr] = f[pr] > 1 ? f[pr] - 1 : f[pr] + 1;
    const opts = R.shuffle([...new Set([good, fxh(H, w1), alt2, fxh(H, w3)])]);
    return { q: T.ch_q(n), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol: T.col(colSteps6(T, n)) + "<br>" + T.fin(n, fs.join(" × "), good, fs.length !== ps.length) + " " + T.ch_no(alt2, n / p) };
  }
  return { q: T.q(n), kind: "factors", ans: n, ansHtml: good, hint: T.hint, sol: T.col(colSteps6(T, n)) + "<br>" + T.fin(n, fs.join(" × "), good, fs.length !== Object.keys(f).length) };
});
function colSteps6(T, n) {
  const L = []; let m = n;
  while (m > 1) {
    const p = [2, 3, 5, 7, 11, 13].find(x => m % x === 0) || m;
    L.push(T.paso(m, p, m === p, String(m).slice(-1), digitSum(m), m / p));
    m /= p;
  }
  return L.join("<br>");
}
def("m6.defact", (R, S, H) => {
  const T = S.m6.FA;
  for (;;) {
    const { n } = compuesto6(R, 1000), f = factorize(n), ps = Object.keys(f).map(Number).sort((a, b) => a - b);
    if (ps.length < 2 || ps.every(p => f[p] === 1) && R.r() < 0.6) continue;
    const pw = ps.filter(p => f[p] > 1).map(p => `${H.pow(p, f[p])} = ${p ** f[p]}`), vals = ps.map(p => p ** f[p]);
    return { q: T.def_q(fxh(H, f)), kind: "int", ans: n, sol: T.def_s(pw.join("; "), vals.join(" × "), H.n(n)) };
  }
});
// m.c.d. y m.c.m.: con listas (números pequeños) o con los factores primos
const MCD_FIJOS = ["18,30", "40,56", "7,21", "12,18", "16,24", "36,48", "60,72", "9,20", "45,60", "24,36", "18,24"];
function parGcd6(R, small) {
  for (;;) {
    const g = R.pick(small ? [2, 3, 4, 5, 6, 8, 9, 10, 12] : [2, 3, 4, 5, 6, 8, 9, 10, 12, 15]), a1 = R.int(2, 9), b1 = R.int(2, 9);
    if (a1 === b1 || gcd(a1, b1) !== 1) continue;
    const a = Math.min(g * a1, g * b1), b = Math.max(g * a1, g * b1);
    if (b <= 150 && !MCD_FIJOS.includes(`${a},${b}`)) return [a, b];
  }
}
function gcdSol6(T, H, a, b) {
  const g = gcd(a, b);
  if (b <= 40) {
    const da = divs6(a), db = divs6(b), c = da.filter(x => db.includes(x));
    return T.lista_s(a, da.join(", "), b, db.join(", "), c.join(", "), g);
  }
  const fa = factorize(a), fb = factorize(b), cm = {};
  for (const p in fa) if (fb[p]) cm[p] = Math.min(fa[p], fb[p]);
  if (!Object.keys(cm).length) return T.fac_s(a, fxh(H, fa), b, fxh(H, fb), null, 1);
  const ch = fxh(H, cm);
  return T.fac_s(a, fxh(H, fa), b, fxh(H, fb), ch === String(g) ? null : ch, g);
}
function lcmSol6(T, H, a, b) {
  const m = lcm(a, b);
  if (m <= 72) return T.mlista_s(b, mults6(b, m), m, a, m / a);
  const fa = factorize(a), fb = factorize(b), al = {};
  for (const p in fa) al[p] = fa[p];
  for (const p in fb) al[p] = Math.max(al[p] || 0, fb[p]);
  return T.mfac_s(a, fxh(H, fa), b, fxh(H, fb), fxh(H, al), H.n(m));
}
def("m6.mcd", (R, S, H) => {
  const T = S.m6.MD;
  let a, b;
  if (R.r() < 0.12) { do { a = R.int(4, 30); b = R.int(4, 30); } while (a >= b || gcd(a, b) !== 1 || MCD_FIJOS.includes(`${a},${b}`)); }
  else [a, b] = parGcd6(R, false);
  return { q: T.q(a, b), kind: "int", ans: gcd(a, b), sol: gcdSol6(T, H, a, b) };
});
def("m6.mcdprob", (R, S, H) => {
  const T = S.m6.MD, P = R.pick(T.prob), [a, b] = parGcd6(R, true), g = gcd(a, b), per = P.per && R.r() < 0.3;
  if (per) return { q: T.sinPreg(P.q(a, b)) + P.per_q, kind: "int", ans: a / g, sol: T.por[P.tipo](P.cosa, a, b) + "<br>" + gcdSol6(T, H, a, b) + "<br>" + P.per_s(g, a, a / g) };
  return { q: P.q(a, b), kind: "int", ans: g, sol: T.por[P.tipo](P.cosa, a, b) + "<br>" + gcdSol6(T, H, a, b) + "<br>" + P.s(g) };
});
const MCM_FIJOS = ["8,12", "9,15", "4,6", "4,10", "6,8", "10,15", "12,18", "3,5"];
function parLcm6(R) {
  for (;;) {
    const a = R.int(3, 30), b = R.int(3, 30);
    if (a >= b || b % a === 0 || lcm(a, b) > 240 || MCM_FIJOS.includes(`${a},${b}`)) continue;
    return [a, b];
  }
}
def("m6.mcm", (R, S, H) => {
  const T = S.m6.MD, [a, b] = parLcm6(R);
  return { q: T.mq(a, b), kind: "int", ans: lcm(a, b), sol: lcmSol6(T, H, a, b) };
});
def("m6.mcmprob", (R, S, H) => {
  const T = S.m6.MD, P = R.pick(T.mprob), [a, b] = parLcm6(R), m = lcm(a, b);
  return { q: P.q(a, b), kind: "int", ans: m, sol: T.coinc + "<br>" + lcmSol6(T, H, a, b) + "<br>" + P.s(H.n(m)) };
});
def("m6.mcxtipo", (R, S, H) => {
  const T = S.m6.MD;
  if (R.r() < 0.5) { const P = R.pick(T.prob), [a, b] = parGcd6(R, true); return { q: T.x_q(P.q(a, b)), kind: "choice", opts: T.x_opts, correct: 0, shuffle: false, sol: T.x_s[P.tipo] }; }
  const P = R.pick(T.mprob), [a, b] = parLcm6(R);
  return { q: T.x_q(P.q(a, b)), kind: "choice", opts: T.x_opts, correct: 1, shuffle: false, sol: T.x_s.coinc };
});

// ── Unidad 3 · Fracciones ──
const prop6 = (R, dens) => { for (;;) { const d = R.pick(dens), n = R.int(1, d - 1); if (gcd(n, d) === 1) return [n, d]; } };
def("m6.esequiv", (R, S, H) => {
  const T = S.m6.EQ, [n, d] = prop6(R, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let k1, k2; do { k1 = R.int(1, 6); k2 = R.int(2, 9); } while (k1 === k2);
  const yes = R.r() < 0.5, a = n * k1, b = d * k1, c = n * k2 + (yes ? 0 : R.pick([-1, 1])), e = d * k2;
  return { q: T.q(H.frac(a, b), H.frac(c, e)), kind: "choice", opts: T.sino, correct: yes ? 0 : 1, shuffle: false, sol: T.s(a, e, b, c, a * e, b * c, yes) };
});
def("m6.frfr", (R, S, H) => {
  const T = S.m6.FF, [a, b] = prop6(R, [2, 3, 4, 5, 6]), [c, d] = prop6(R, [2, 3, 4, 5, 6]), N = a * c, D = b * d, r = F.make(N, D), g = gcd(N, D);
  const fr = H.frac(r[0], r[1]), sol = T.prod(H.frac(a, b), H.frac(c, d), H.frac(`${a} × ${c}`, `${b} × ${d}`), H.frac(N, D)) + (g > 1 ? T.simp(g, fr) : T.irr), t = R.r();
  if (t < 0.45) return { q: T.q(H.frac(a, b), H.frac(c, d)), kind: "frac", ans: r, simplest: true, sol };
  const C = R.pick(T.ctx);
  if (t < 0.72) return { q: C.q(H.frac(c, d), H.frac(a, b)) + " " + C.f, kind: "frac", ans: r, simplest: true, sol };
  const tot = r[1] * R.int(2, 6) * (r[1] < 10 ? 2 : 1), x = tot / r[1] * r[0];
  return { q: C.n(tot, H.frac(c, d), H.frac(a, b)), kind: "int", ans: x, sol: sol + "<br>" + T.cant(fr, tot, r[1], tot / r[1], r[0], x, C.u) };
});

// Comparar fracciones: mismo denominador, mismo numerador, truco de la mitad o común denominador (m.c.m.)
const FC_FIJOS = ["5/8,7/12", "3/4,5/6", "2/3,3/4", "4/9,1/2", "3/7,5/8", "1/2,2/3"];
def("m6.frcomp", (R, S, H) => {
  const T = S.m6.FC, t = R.r(), sign = (x, y) => x < y ? "&lt;" : "&gt;";
  for (let g = 0; g < 200; g++) {
    let a, b, c, d, sol;
    if (t < 0.2) { d = R.int(3, 12); a = R.int(1, d - 1); c = R.int(1, d - 1); b = d; if (a === c) continue; }
    else if (t < 0.4) { a = c = R.int(1, 6); b = R.int(a + 1, 12); d = R.int(a + 1, 12); if (b === d) continue; }
    else { [a, b] = prop6(R, [3, 4, 5, 6, 7, 8, 9, 10, 12]); [c, d] = prop6(R, [3, 4, 5, 6, 7, 8, 9, 10, 12]); if (b === d || a === c || a * d === b * c) continue; }
    if (FC_FIJOS.includes(`${a}/${b},${c}/${d}`) || FC_FIJOS.includes(`${c}/${d},${a}/${b}`)) continue;
    const v1 = a / b, v2 = c / d, res = `${H.frac(a, b)} ${sign(v1, v2)} ${H.frac(c, d)}`;
    if (t < 0.2) sol = T.den(res);
    else if (t < 0.4) sol = T.num(res);
    else if (t < 0.65) {   // truco de la mitad: una por debajo y otra por encima de 1/2
      if ((2 * a < b) === (2 * c < d) || 2 * a === b || 2 * c === d) continue;
      sol = T.mitad(H.frac(a, b), H.dec(b / 2), a, 2 * a < b) + " " + T.mitad(H.frac(c, d), H.dec(d / 2), c, 2 * c < d) + " " + T.mitad_fin(res);
    } else {
      const m = lcm(b, d); if (m > 60) continue;
      sol = T.mcm(b, d, m, H.frac(a, b), H.frac(a * m / b, m), m / b, H.frac(c, d), H.frac(c * m / d, m), m / d, a * m / b, c * m / d, res);
    }
    return { q: T.q(H.frac(a, b), H.frac(c, d)), kind: "choice", opts: ["&lt;", "&gt;"], correct: v1 < v2 ? 0 : 1, shuffle: false, sol };
  }
  return null;
});
// Problemas con fracciones de los tres tipos de la lección, con las cuentas de cada paso
const nomFr6 = (S, a, b) => S.m6.FP.nom(a, b);
def("m6.frprob", (R, S, H) => {
  const T = S.m6.FP, t = R.int(0, 2);
  if (t === 0) {   // varias partes del mismo total
    for (let g = 0; g < 200; g++) {
      const [a, b] = prop6(R, [2, 3, 4, 5, 6]), [c, d] = prop6(R, [3, 4, 5, 6, 8]);
      if (b === d || a * d + c * b >= b * d) continue;
      const m = lcm(b, d), tot = m * R.int(1, Math.max(1, Math.floor(60 / m))), x = tot / b * a, y = tot / d * c, q = tot - x - y, C = R.pick(T.c1), asF = R.r() < 0.35;
      if (tot < 12) continue;
      const fr = F.make(q, tot), body = T.t1_s(H.frac(a, b), tot, b, a, x, H.frac(c, d), d, c, y, q, C.u);
      if (asF) return { q: C.q(tot, H.frac(a, b), H.frac(c, d)) + " " + C.fq, kind: "frac", ans: fr, simplest: true, sol: body + " " + T.t1_f(q, tot, H.frac(q, tot), H.frac(fr[0], fr[1]), q === fr[0]) };
      return { q: C.q(tot, H.frac(a, b), H.frac(c, d)) + " " + C.nq, kind: "int", ans: q, sol: body };
    }
    return null;
  }
  if (t === 1) {   // una fracción de lo que queda
    for (let g = 0; g < 200; g++) {
      const [a, b] = prop6(R, [2, 3, 4, 5, 6]), [c, d] = prop6(R, [2, 3, 4, 5]), C = R.pick(T.c2);
      const tot = b * d * R.int(1, Math.max(1, Math.floor(C.max / (b * d))));
      const x = tot / b * a, rest = tot - x;
      if (rest % d || tot < 20) continue;
      const y = rest / d * c, q = rest - y;
      if ([`60,1,4,2,3`, `840,1,4,1,3`, `40,1,4,2,5`, `240,1,4,1,3`, `200,2,5,1,3`].includes(`${tot},${a},${b},${c},${d}`)) continue;
      return { q: C.q(tot, H.frac(a, b), H.frac(c, d)), kind: "int", ans: q, sol: T.t2_s(H.frac(a, b), tot, b, a, x, rest, H.frac(c, d), d, c, y, q, C.u) };
    }
    return null;
  }
  // conozco una parte, busco el total (a veces, la parte que queda)
  for (let g = 0; g < 200; g++) {
    const [a, b] = prop6(R, [3, 4, 5, 6, 7, 8, 9, 10]), C = R.pick(T.c3), u = R.int(2, C.max), queda = !!C.queda;
    const k = queda ? b - a : a, P = k * u, tot = b * u;
    if (k < 2 || [`3,5,24`, `2,7,18`, `2,5,18`, `3,8,15`].includes(`${a},${b},${P}`)) continue;
    const pic = "<br>" + SVG.fracBar(k, b, 240);
    return { q: C.q(H.frac(a, b), P) + pic, kind: "int", ans: tot, sol: (queda ? T.t3_queda(H.frac(a, b), H.frac(b - a, b)) : "") + T.t3_s(k, b, P, u, tot, C.u, H.frac(k, b), nomFr6(S, k, b), nomFr6(S, 1, b), nomFr6(S, b, b)) };
  }
  return null;
});

// ── Unidad 4 · Decimales ──
// División larga con decimales: dividendo M / 10^k (k decimales) entre un natural n, paso a paso
function decSteps6(T, H, M, k, n) {
  const s = pad6(M, k + 1), ip = +s.slice(0, s.length - k), dec = k ? s.slice(-k) : "", L = [];
  let q = Math.floor(ip / n), r = ip - q * n;
  L.push(q ? T.ds_ent(H.n(ip), n, H.n(q), r) : T.ds_cero(H.n(ip), n));
  for (let i = 0; (i < dec.length || r) && i < 5; i++) {
    const isDec = i < dec.length, dig = isDec ? +dec[i] : 0, cur = r * 10 + dig, qi = Math.floor(cur / n);
    L.push(T.ds_paso(i === 0, isDec, dig, cur, n, qi, cur - qi * n));
    r = cur - qi * n;
  }
  return L.join("<br>");
}
const nd6 = x => { const s = String(Math.round(x * 1e6) / 1e6); return s.includes(".") ? s.split(".")[1].length : 0; };
def("m6.decdiv", (R, S, H) => {
  const T = S.m6.DD, t = R.int(0, 2);
  if (t === 0) {   // natural entre natural, con cociente decimal
    let n, D; do { n = R.pick([2, 4, 5, 8, 4, 8, 16, 20, 25, 40]); D = R.int(3, 400); } while (D % n === 0 || (D * 1000) % n || (D === 9 && n === 4) || (D === 7 && n === 4));
    const q = D / n;
    return { q: T.q(H.n(D), n), kind: "num", ans: q, sol: T.caso[0] + "<br>" + decSteps6(T, H, D, 0, n) + "<br>" + T.fin(H.n(D), n, H.dec(q)) };
  }
  if (t === 1) {   // decimal entre natural (a veces el cociente empieza por «0,»)
    let n, k, M; do { n = R.int(2, 9); k = R.int(1, 2); M = R.r() < 0.3 ? R.int(10 ** k, n * 10 ** k - 1) : R.int(10 ** k + 1, 400 * 10 ** k); } while (M % 10 === 0 || (M * 10 ** (3 - k)) % n || (n === 6 && M === 144 && k === 1));
    const D = M / 10 ** k, q = Math.round(D / n * 1e6) / 1e6;
    return { q: T.q(H.dec(D), n), kind: "num", ans: q, sol: T.caso[1] + "<br>" + decSteps6(T, H, M, k, n) + "<br>" + T.fin(H.dec(D), n, H.dec(q)) };
  }
  // divisor decimal: se multiplican los dos por 10 o por 100
  for (let g = 0; g < 100; g++) {
    const d = R.pick([0.2, 0.4, 0.5, 0.25, 0.15, 1.2, 1.5, 2.5, 0.12, 0.6, 0.8, 3.5, 0.3, 0.75, 1.25]), kd = nd6(d), p = 10 ** kd, n = Math.round(d * p);
    const q = R.r() < 0.7 ? R.int(2, 60) : R.int(11, 99) / 10, D = Math.round(q * d * 1e6) / 1e6, kD = nd6(D);
    if (kD > 2 || (D === 3.6 && d === 0.12) || (D === 7 && d === 0.25) || (D === 4.5 && d === 0.15)) continue;
    const Dp = Math.round(D * p * 1e6) / 1e6, kp = nd6(Dp), Mp = Math.round(Dp * 10 ** kp);
    const vasos = Number.isInteger(q) && d < 1 && R.r() < 0.35;
    const head = T.mult(kd, p, H.dec(D), H.dec(Dp), H.dec(d), n);
    return { q: vasos ? T.vasos_q(H.dec(d), H.dec(D)) : T.q(H.dec(D), H.dec(d)), kind: "num", ans: q, sol: T.caso[2] + "<br>" + head + "<br>" + decSteps6(T, H, Mp, kp, n) + "<br>" + T.fin(H.dec(D), H.dec(d), H.dec(q)) };
  }
  return null;
});
def("m6.redondeo", (R, S, H) => {
  const T = S.m6.RD, k = R.int(2, 3), ip = R.pick([R.int(0, 9), R.int(10, 99), R.int(100, 250)]);
  let fr; do fr = R.int(1, 10 ** k - 1); while (fr % 10 === 0);
  const X = ip * 10 ** k + fr, j = R.int(0, k - 1), cut = 10 ** (k - j), keep = Math.floor(X / cut), nd = Math.floor(X / 10 ** (k - j - 1)) % 10, td = keep % 10;
  const RI = nd >= 5 ? keep + 1 : keep, res = fix6(H, RI, j), xs = fix6(H, X, k), C = R.r() < 0.3 ? R.pick(T.ctx) : null;
  return { q: C ? C(xs, T.lugar[j]) : T.q(xs, T.lugar[j]), kind: "num", ans: RI / 10 ** j, ansHtml: res, sol: T.s(T.lugar[j], td, nd, res, j === 0) };
});

// Fracción ↔ decimal (dividiendo, o leyendo el decimal en voz alta) y comparar fracción, decimal y porcentaje
def("m6.fdp", (R, S, H, L) => {
  const T = S.m6.FD, t = R.r();
  if (t < 0.35) {   // fracción → decimal: numerador entre denominador, paso a paso
    let n, d; do { d = R.pick([2, 4, 5, 8, 8, 20, 25, 40, 50]); n = R.int(1, 3 * d - 1); } while (gcd(n, d) !== 1 || (n === 7 && d === 8) || (n === 3 && d === 8));
    const q = n / d;
    return { q: T.fd_q(H.frac(n, d)), kind: "num", ans: q, sol: T.fd_s + "<br>" + decSteps6(S.m6.DD, H, n, 0, d) + "<br>" + S.m6.DD.fin(n, d, H.dec(q)) };
  }
  if (t < 0.65) {   // decimal → fracción irreducible, leyendo el decimal
    let k, m; do { k = R.pick([1, 2, 2, 2, 3]); m = k === 3 ? R.pick([125, 375, 625, 875]) : R.int(1, 10 ** k - 1); } while ((k === 2 && m % 10 === 0) || (k === 2 && [45, 35, 8].includes(m)) || (k === 1 && m === 4));
    const den = 10 ** k, g = gcd(m, den), fr = [m / g, den / g];
    return { q: T.df_q(fix6(H, m, k)), kind: "frac", ans: fr, simplest: true, sol: T.df_s(fix6(H, m, k), L.words(m), T.uds[k], H.frac(m, den), g, H.frac(fr[0], fr[1])) };
  }
  // comparar: una fracción, un porcentaje y un decimal; ¿cuál es mayor (o menor)?
  for (let g = 0; g < 200; g++) {
    const [a, b] = prop6(R, [2, 4, 5, 10, 20, 25]), fv = Math.round(100 * a / b), p = fv + R.pick([-8, -5, -3, -2, 2, 3, 5, 8]), x = fv + R.pick([-7, -4, -1, 1, 4, 7, 9]);
    if (p < 1 || p > 99 || x < 1 || x > 99 || p === x || x % 10 === 0) continue;
    if (`${a}/${b},${p},${x}` === "3/5,62,65" || `${a}/${b},${p},${x}` === "2/5,38,42") continue;
    const items = [[H.frac(a, b), fv, T.vf(H.frac(a, b), a, b, fix6(H, fv, 2))], [T.pct(p), p, T.vp(p, fix6(H, p, 2))], [fix6(H, x, 2), x, fix6(H, x, 2)]];
    const mayor = R.r() < 0.6, best = items.reduce((u, v) => (mayor ? v[1] > u[1] : v[1] < u[1]) ? v : u), ord = items.slice().sort((u, v) => u[1] - v[1]);
    const opts = R.shuffle(items.map(i => i[0]));
    return { q: T.cmp_q(mayor, opts.join(", ")), kind: "choice", opts, correct: opts.indexOf(best[0]), shuffle: false,
      sol: T.cmp_s(items.map(i => i[2]).join("; "), ord.map(i => fix6(H, i[1], 2)).join(" &lt; "), mayor, best[0]) };
  }
  return null;
});

// ── Unidad 5 · Proporcionalidad ──
def("m6.razon", (R, S, H) => {
  const T = S.m6.RA, C = R.pick(T.ctx);
  const mx = C.max || 30; let a, b; do { a = R.int(4, mx); b = R.int(4, mx); } while (a === b || gcd(a, b) === 1 && R.r() < 0.6 || (a === 10 && b === 4));
  const g = gcd(a, b);
  if (R.r() < 0.3) {   // con la razón, la cantidad que falta
    const ra = a / g, rb = b / g, k = R.int(2, 8);
    if (ra !== rb && ra > 1 && rb > 1 && ra < 10 && rb < 10) return { q: C.inv_q(H.frac(ra, rb), rb * k), kind: "int", ans: ra * k, sol: T.inv_s(rb * k, rb, k, ra, ra * k, C.u1, C.u2) };
  }
  return { q: C.q(a, b), kind: "frac", ans: [a / g, b / g], simplest: true, sol: T.s(a, b, H.frac(a, b), g, H.frac(a / g, b / g), a / g, b / g, C) };
});
def("m6.cuarto", (R, S, H) => {
  const T = S.m6.CU;
  let a, b; do { a = R.int(2, 12); b = R.int(2, 12); } while (a === b);
  const k = R.int(2, 9), v = [a, b, a * k, b * k], h = R.int(0, 3), part = [3, 2, 1, 0][h], oth = [0, 1, 2, 3].filter(i => i !== h && i !== part);
  if (v.join() === "2,9,6,27") return null;
  const sh = v.map((x, i) => i === h ? "x" : String(x)), prod = v[oth[0]] * v[oth[1]];
  return { q: T.q(H.frac(sh[0], sh[1]), H.frac(sh[2], sh[3])), kind: "int", ans: v[h],
    sol: T.s(v[part], v[oth[0]], v[oth[1]], prod, v[h], h < 2 ? v[h + 2] : v[h - 2], k, h < 2) };
});
def("m6.esprop", (R, S, H) => {
  const T = S.m6.CU, a = R.int(2, 9); let b; do b = R.int(2, 12); while (b === a);
  const k = R.int(2, 6), yes = R.r() < 0.5, c = a * k, d = b * k + (yes ? 0 : R.pick([-1, 1, 2]));
  return { q: T.p_q(H.frac(a, b), H.frac(c, d)), kind: "choice", opts: T.sino, correct: yes ? 0 : 1, shuffle: false, sol: T.p_s(a, d, b, c, a * d, b * c, yes) };
});
def("m6.directa", (R, S, H) => {
  const T = S.m6.DI, C = R.pick(T.ctx), a = R.int(2, 8);
  let b; do b = R.int(2, 12); while (b === a);
  const u = C.eur ? 5 * R.int(C.u[0] / 5, C.u[1] / 5) / 100 : R.int(C.u[0], C.u[1]), A = Math.round(a * u * 100) / 100, r = Math.round(b * u * 100) / 100;
  const f = x => C.eur ? E6(H, x) : H.dec(x);
  if ((a === 4 && b === 7 && A === 6) || (a === 3 && b === 5 && A === 4.5)) return null;
  return Object.assign({ q: C.q(a, f(A), b), kind: "num", ans: r, sol: T.s(C.mas, b, f(A), H.dec(Math.round(b * A * 100) / 100), a, f(r), C.u1, f(u), C.uu) }, C.eur ? { ansHtml: H.money(r) } : {});
});
def("m6.inversa", (R, S, H) => {
  const T = S.m6.IN;
  for (let g = 0; g < 200; g++) {
    const C = R.pick(T.ctx);
    const a = C.v ? R.pick(C.v) : R.int(C.a[0], C.a[1]), A = R.int(C.A[0], C.A[1]), b = C.v ? R.pick(C.v) : R.int(C.a[0], C.a[1]), P = a * A;
    if (a === b || (P * 2) % b) continue;
    const r = P / b;
    if (r < 1 || (!C.half && !Number.isInteger(r)) || [`6,4,8`, `3,8,4`, `4,6,3`, `2,6,3`, `60,2,80`].includes(`${a},${A},${b}`)) continue;
    const rs = C.money ? H.money(r) : H.dec(r) + (C.horas && !Number.isInteger(r) ? T.hmed(C.u, Math.floor(r)) : ` ${C.u}`);
    return Object.assign({ q: C.q(a, A, b), kind: "num", ans: r, sol: T.s(C.mas(b > a), a, A, H.n(P), C.prod, b, rs) }, C.money ? { ansHtml: rs } : {});
  }
  return null;
});
def("m6.prtipo", (R, S, H) => {
  const T = S.m6.PT, [s, k] = R.pick(T.items);
  return { q: T.q(s), kind: "choice", opts: T.tipos, correct: k, shuffle: false, sol: T.s[k] };
});
const tabla6 = (h1, h2, xs, ys, hole) => `<table style="border-collapse:collapse;margin:6px 0"><tr><th style="border:1px solid #a2a9b1;padding:4px 8px;text-align:left">${h1}</th>${xs.map(x => `<td style="border:1px solid #a2a9b1;padding:4px 10px;text-align:center">${x}</td>`).join("")}</tr><tr><th style="border:1px solid #a2a9b1;padding:4px 8px;text-align:left">${h2}</th>${ys.map((y, i) => `<td style="border:1px solid #a2a9b1;padding:4px 10px;text-align:center">${i === hole ? '<span class="wa-hole">□</span>' : y}</td>`).join("")}</tr></table>`;
def("m6.prtabla", (R, S, H) => {
  const T = S.m6.TB, h = R.int(0, 3); let j; do j = R.int(0, 3); while (j === h);
  if (R.r() < 0.35) {   // inversa: el producto se mantiene
    const P = R.pick([24, 36, 48, 60, 72, 120]), dv = divs6(P).filter(x => x > 1 && x < P), xs = R.shuffle(dv).slice(0, 4).sort((p, q) => p - q), ys = xs.map(x => P / x), [h1, h2] = R.pick(T.inv);
    return { q: T.inv_q + tabla6(h1, h2, xs, ys, h), kind: "int", ans: ys[h], sol: T.inv_s(xs[j], ys[j], P, xs[h], ys[h]) };
  }
  const k = R.int(2, 15), xs = R.shuffle([1, 2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 4).sort((p, q) => p - q), ys = xs.map(x => x * k), [h1, h2] = R.pick(T.dir);
  return { q: T.dir_q + tabla6(h1, h2, xs, ys, h), kind: "int", ans: ys[h], sol: T.dir_s(ys[j], xs[j], k, xs[h], ys[h]) };
});
const pc6 = p => (p >= 100 ? "1" : "0") + WA.H.ds + pad6(p % 100, 2);
def("m6.aumento", (R, S, H) => {
  const T = S.m6.AU, t = R.r(), E = x => E6(H, x);
  if (t < 0.4) {
    const p = R.pick([10, 20, 25, 30, 40, 50, 15, 5, 60, 75]), [obj, lo, hi] = R.pick(T.objs);
    let P; do P = R.int(lo, hi); while ((P * (100 - p)) % 10 || (P === 36 && p === 25) || (P === 40 && p === 30) || (P === 60 && p === 25));
    const dsc = P * p / 100, r = P - dsc;
    return { q: T.desc_q(obj, P, p), kind: "num", ans: r, ansHtml: H.money(r), sol: T.desc_s(p, 100 - p, pc6(100 - p), P, E(r), E(dsc)) };
  }
  if (t < 0.7) {
    const p = R.pick([10, 20, 25, 50, 5, 15]), [obj, lo, hi] = R.pick(T.subidas);
    let P; do P = R.int(lo, hi); while ((P * (100 + p)) % 10 || (P === 30 && p === 10) || (P === 8 && p === 10));
    const i = P * p / 100, r = P + i;
    return { q: T.aum_q(obj, P, p), kind: "num", ans: r, ansHtml: H.money(r), sol: T.aum_s(p, 100 + p, pc6(100 + p), P, E(r), E(i)) };
  }
  const [obj, p, lo, hi] = R.pick(T.iva);
  let P; do P = R.int(lo, hi); while (T.iva_no(P, p));   // los precios de la lección
  const i = Math.round(P * p) / 100, r = Math.round(P * (100 + p)) / 100;
  return { q: T.iva_q(obj, P, p), kind: "num", ans: r, ansHtml: H.money(r), sol: T.iva_s(p, pc6(p), P, E(i), E(r), pc6(100 + p)) };
});
def("m6.original", (R, S, H) => {
  const T = S.m6.OR, p = R.pick([10, 20, 30, 40, 50, 60, 25, 75, 20, 10]), obj = R.pick(T.objs), E = x => E6(H, x);
  let O; do O = p % 10 === 0 ? 10 * R.int(2, 15) : 4 * R.int(3, 30); while ((p === 20 && O === 30) || (p === 10 && O === 40));
  const pay = O * (100 - p) / 100, dsc = O - pay;
  if (p % 10 === 0) { const k = (100 - p) / 10, d10 = pay / k; return { q: T.q(E(pay), obj, p), kind: "num", ans: O, ansHtml: H.money(O), sol: T.s10(p, 100 - p, E(pay), k, E(d10), E(O), E(dsc)) }; }
  if (p === 25) return { q: T.q(E(pay), obj, p), kind: "num", ans: O, ansHtml: H.money(O), sol: T.s25(E(pay), E(pay / 3), E(O), E(dsc)) };
  return { q: T.q(E(pay), obj, p), kind: "num", ans: O, ansHtml: H.money(O), sol: T.s75(E(pay), E(O), E(dsc)) };
});

// Presupuesto con porcentajes, plan de ahorro (redondeando las semanas hacia arriba), precio por kilo e intereses
const pcOf6 = (T, H, p, P) => { const v = P * p / 100; return T.pc(p, H.n(P), E6(H, v), p === 50 ? 2 : p === 25 ? 4 : p === 20 ? 5 : p === 10 ? 10 : 0, pc6(p)); };
def("m6.dinero", (R, S, H) => {
  const T = S.m6.DN, t = R.int(0, 3), E = x => E6(H, x);
  if (t === 0) {   // presupuesto: primero el ahorro
    for (let g = 0; g < 100; g++) {
      const P = R.pick([10, 12, 15, 16, 20, 24, 25, 30, 40, 50]), a = R.pick([10, 20, 25, 50]), o = R.pick([20, 30, 40, 50]), rest = 100 - a - o;
      if (rest < 10 || (P * a) % 50 || (P * o) % 50 || (P === 20 && a === 25 && o === 40) || (P === 15 && a === 20)) continue;
      const va = P * a / 100, vo = P * o / 100, vr = P - va - vo, cosa = R.pick(T.para);
      if (R.r() < 0.35) return { q: T.aho_q(P, a), kind: "num", ans: va, ansHtml: H.money(va), sol: pcOf6(T, H, a, P) };
      return { q: T.pre_q(P, a, o, cosa), kind: "num", ans: vr, ansHtml: H.money(vr), sol: T.pre_s(pcOf6(T, H, a, P), pcOf6(T, H, o, P), P, E(va), E(vo), E(vr), rest, a, o) };
    }
    return null;
  }
  if (t === 1) {   // plan de ahorro
    for (let g = 0; g < 100; g++) {
      const [obj, lo, hi] = R.pick(T.objs), C = R.int(lo, hi), s = R.int(2, 6), h = R.r() < 0.4 ? R.int(1, 10) : 0, F = C - h;
      if (F <= s * 2 || (C === 27 && s === 4) || (C === 42 && s === 3)) continue;
      const q = Math.floor(F / s), r = F - q * s;
      return { q: T.plan_q(obj, C, h, s), kind: "int", ans: r ? q + 1 : q, sol: (h ? T.falta(C, h, F) : "") + (r ? T.plan_s(F, s, q, r, q * s, q + 1) : T.plan_ok(F, s, q)) };
    }
    return null;
  }
  if (t === 2) {   // ¿qué envase sale más barato por kilo?
    for (let g = 0; g < 100; g++) {
      const [obj, gr, lo, hi] = R.pick(T.envases), [ga, gb] = R.shuffle(gr).slice(0, 2), ua = R.int(lo * 10, hi * 10) * 10, ub = R.int(lo * 10, hi * 10) * 10;
      const pa = ua * ga / 1000, pb = ub * gb / 1000;   // céntimos
      if (ua === ub || !Number.isInteger(pa) || !Number.isInteger(pb)) continue;
      const kA = ga / 1000, kB = gb / 1000, w = ua < ub ? 0 : 1;
      const line = (L, gg, k, p, u) => { const m = 10 ** nd6(k); return T.uni_s(L, gg, H.dec(k), E(p / 100), m, H.dec(Math.round(p * m) / 100), H.dec(Math.round(k * m * 1000) / 1000), E(u / 100)); };
      return { q: T.uni_q(obj, ga, E(pa / 100), gb, E(pb / 100)), kind: "choice", opts: T.ab, correct: w, shuffle: false,
        sol: line("A", ga, kA, pa, ua) + "<br>" + line("B", gb, kB, pb, ub) + "<br>" + T.uni_fin(T.ab[w], E(Math.abs(ua - ub) / 100)) };
    }
    return null;
  }
  const C = 50 * R.int(2, 12), r = R.int(1, 5), n = R.int(1, 4), i = C * r / 100;   // intereses de una cuenta de ahorro
  if ((C === 150 && r === 2) || (C === 200 && r === 2)) return null;
  return { q: T.int_q(C, r, n), kind: "num", ans: i * n, ansHtml: H.money(i * n), sol: T.int_s(r, C, pc6(r), E(i), n, E(i * n), E(C + i * n)) };
});

// ── Unidad 6 · Medida ──
const hm6 = (h, m) => `${h}:${pad6(m, 2)}`;
def("m6.horario", (R, S, H) => {
  const T = S.m6.HO, t = R.r();
  if (t < 0.45) {   // hora de llegada: 60 minutos forman una hora
    for (let g = 0; g < 100; g++) {
      const h = R.int(6, 19), m = 5 * R.int(1, 11), dh = R.int(0, 3), dm = 5 * R.int(2, 11), carry = m + dm >= 60;
      if ((!carry && R.r() < 0.7) || h + dh + (carry ? 1 : 0) > 23 || (h === 10 && m === 40 && dh === 1 && dm === 35) || (h === 11 && m === 50 && dh === 2 && dm === 25) || (h === 13 && m === 15 && dm === 50)) continue;
      const H2 = h + dh + (carry ? 1 : 0), M2 = (m + dm) % 60, C = R.pick(T.ctx), tm = H.time;
      return { q: C(tm(h, m), T.dur(dh, dm)), kind: "fields", fields: [{ label: T.f[0], ans: T.h12 ? H2 % 12 || 12 : H2 }, { label: T.f[1], ans: M2 }],
        sol: (dh ? T.mas_h(tm(h, m), dh, tm(h + dh, m)) + " " : "") + (carry ? T.mas_m_c(tm(h + dh, m), dm, h + dh, m + dm, m + dm - 60, tm(H2, M2)) : T.mas_m(tm(h + dh, m), dm, tm(H2, M2))) };
    }
    return null;
  }
  if (t < 0.7) {   // horas con decimales → minutos
    let w, f, x; do { w = R.int(0, 3); f = R.pick([0.5, 0.25, 0.75, 0.5]); x = w + f; } while (x === 2.5 || x === 1.25);
    return { q: T.dec_q(H.dec(x)), kind: "int", ans: Math.round(x * 60), sol: T.dec_s(H.dec(x), w, w * 60, f, f * 60, Math.round(x * 60)) };
  }
  // reloj de 24 horas (con el mediodía y la medianoche)
  const k = R.pick(["m", "t", "t", "n", "md", "mn"]), m = 5 * R.int(0, 11);
  const h = k === "m" ? R.int(1, 11) : k === "t" ? R.int(1, 7) : k === "n" ? R.int(8, 11) : 12;
  if (k === "n" && h === 9 && m === 15) return null;
  const good = k === "m" || k === "md" ? hm6(h, m) : k === "mn" ? hm6(0, m) : hm6(h + 12, m);
  const cand = k === "md" ? [hm6(24, m), hm6(0, m), hm6(13, m)] : k === "mn" ? [hm6(24, m), hm6(12, m), hm6(1, m)] : k === "m" ? [hm6(h + 12, m), hm6(h + 10, m), hm6(h + 1, m)] : [hm6(h, m), hm6(h + 10, m), hm6(h + 14 > 23 ? h + 11 : h + 14, m)];
  const { opts, correct } = opt6(R, good, cand);
  return { q: T.r24_q(T.dice[k](h, pad6(m, 2))), kind: "choice", opts, correct, shuffle: false, sol: T.r24_s[k](good) };
});
def("m6.compleja", (R, S, H) => {
  const T = S.m6.CX, t = R.int(0, 3);
  if (t === 0) {   // km, m y cm → m
    let a, b, c; do { a = R.int(1, 9); b = R.int(1, 999); c = R.int(1, 99); } while ((a === 2 && b === 350) || (a === 3 && b === 45));
    const r = Math.round((a * 1000 + b + c / 100) * 100) / 100;
    return { q: T.q(`${a} km ${b} m ${c} cm`, T.u.m), kind: "num", ans: r, sol: T.s([T.p(`${a} km`, `${a} × ${H.n(1000)}`, H.n(a * 1000), "m"), `${b} m`, T.p(`${c} cm`, `${c} ${WA.H.div} 100`, H.dec(c / 100), "m")], [H.n(a * 1000), b, H.dec(c / 100)], H.dec(r), "m") };
  }
  if (t === 1) {   // kg y g → kg
    let a, b; do { a = R.int(1, 9); b = R.int(1, 99) * (R.r() < 0.6 ? 10 : 1); } while (b >= 1000 || (a === 3 && b === 250));
    const r = Math.round((a + b / 1000) * 1000) / 1000;
    return { q: T.q(`${a} kg ${b} g`, T.u.kg), kind: "num", ans: r, sol: T.s([`${a} kg`, T.p(`${b} g`, `${b} ${WA.H.div} ${H.n(1000)}`, H.dec(b / 1000), "kg")], [a, H.dec(b / 1000)], H.dec(r), "kg") };
  }
  if (t === 2) {   // t y kg → kg
    const a = R.int(1, 30), b = R.int(5, 995), r = a * 1000 + b;
    return { q: T.q(`${a} t ${b} kg`, T.u.kg), kind: "int", ans: r, sol: T.s([T.p(`${a} t`, `${a} × ${H.n(1000)}`, H.n(a * 1000), "kg"), `${b} kg`], [H.n(a * 1000), b], H.n(r), "kg") };
  }
  let a, b, c; do { a = R.int(1, 9); b = R.int(1, 9); c = R.int(1, 9); } while (a === 2 && b === 5);   // L, dL y cL → L
  const r = Math.round((a + b / 10 + c / 100) * 100) / 100;
  return { q: T.q(`${a} L ${b} dL ${c} cL`, T.u.L), kind: "num", ans: r, sol: T.s([`${a} L`, T.p(`${b} dL`, `${b} ${WA.H.div} 10`, H.dec(b / 10), "L"), T.p(`${c} cL`, `${c} ${WA.H.div} 100`, H.dec(c / 100), "L")], [a, H.dec(b / 10), H.dec(c / 100)], H.dec(r), "L") };
});
const mulTxt6 = (H, xs) => { let v = xs[0], s = xs.map(x => H.dec(x)).join(" × "); const st = []; for (let i = 1; i < xs.length; i++) { v = Math.round(v * xs[i] * 1000) / 1000; if (i < xs.length - 1) st.push(H.dec(v) + " × " + H.dec(xs[i + 1])); } return s + (st.length ? " = " + st.join(" = ") : "") + " = " + H.dec(v); };
def("m6.volumen", (R, S, H) => {
  const T = S.m6.VO, t = R.int(0, 3);
  if (t === 0) {   // caja con medidas en cm
    let a, b, c; do { a = R.int(8, 40); b = R.int(5, 30); c = R.int(4, 20); } while (a * b * c > 20000 || (a === 5 && b === 4) || (a === 25 && b === 6));
    return { q: T.caja_q(R.pick(T.cajas), a, b, c), kind: "int", ans: a * b * c, sol: T.orto_s(mulTxt6(H, [a, b, c]), "cm³") };
  }
  if (t === 1) {   // cubo
    const a = R.pick([2, 3, 4, 5, 7, 8, 9, 10, 11, 12]);
    return { q: T.cubo_q(a), kind: "int", ans: a ** 3, sol: T.cubo_s(a, H.n(a * a), H.n(a ** 3)) };
  }
  if (t === 2) {   // habitación o piscina, en metros (a veces con decimales)
    const [sitio, hs] = R.pick(T.sitios), a = R.int(3, 9), b = R.int(2, 6), c = R.pick(hs);
    if (a === 8 && b === 6 && c === 3) return null;
    const v = Math.round(a * b * c * 10) / 10;
    return { q: T.hab_q(sitio, a, b, H.dec(c)), kind: "num", ans: v, sol: T.orto_s(mulTxt6(H, [a, b, c]), "m³") };
  }
  const up = R.r() < 0.5, u = R.pick([["cm³", "dm³"], ["dm³", "m³"]]);   // cambiar de unidad: cada peldaño, × 1000
  const x = up ? R.int(1, 99) * 100 : R.int(2, 95) / (R.r() < 0.5 ? 10 : 1), r = up ? x / 1000 : x * 1000;
  return { q: T.cv_q(H.dec(x), up ? u[0] : u[1], up ? u[1] : u[0]), kind: "num", ans: r, sol: T.cv_s(up ? u[0] : u[1], up ? u[1] : u[0], up, H.dec(x), H.dec(r)) };
});
def("m6.capvol", (R, S, H) => {
  const T = S.m6.CV, t = R.int(0, 3);
  if (t === 0) {   // acuario con medidas en cm → litros, pasando a dm
    let a, b, c; do { a = 10 * R.int(2, 10); b = 10 * R.int(2, 6); c = 10 * R.int(2, 6); } while ((a === 50 && b === 30 && c === 40) || (a === 40 && c === 30));
    const v = a * b * c / 1000;
    return { q: T.acu_q(R.pick(T.recip), a, b, c), kind: "int", ans: v, sol: T.acu_s(a, b, c, a / 10, b / 10, c / 10, mulTxt6(H, [a / 10, b / 10, c / 10]), H.n(v)) };
  }
  if (t === 1) {   // cm³ = mL, o cm³ → L
    if (R.r() < 0.5) { const x = R.pick([5, 10, 20, 25, 50, 125, 250, 330]); return { q: T.ml_q(R.pick(T.peq), x), kind: "int", ans: x, sol: T.ml_s(x) }; }
    const x = 100 * R.int(3, 60), r = x / 1000;
    return { q: T.cml_q(H.n(x)), kind: "num", ans: r, sol: T.cml_s(H.n(x), H.dec(r)) };
  }
  if (t === 2) {   // m³ → litros
    const x = R.int(2, 95) / (R.r() < 0.6 ? 10 : 1);
    if (x === 2.5) return null;
    return { q: T.m3_q(R.pick(T.gran), H.dec(x)), kind: "int", ans: Math.round(x * 1000), sol: T.m3_s(H.dec(x), H.n(Math.round(x * 1000))) };
  }
  const a = R.pick([2, 3, 4, 1.5, 2.5]), b = R.pick([1, 2, 1.5]), c = R.pick([1, 0.5, 2, 1.2]), v = Math.round(a * b * c * 1000) / 1000;   // depósito en metros
  if (a === 1.5 && b === 1 && c === 0.8) return null;
  return { q: T.dep_q(H.dec(a), H.dec(b), H.dec(c)), kind: "int", ans: Math.round(v * 1000), sol: T.dep_s(mulTxt6(H, [a, b, c]), H.dec(v), H.n(Math.round(v * 1000))) };
});

// ── Unidad 7 · Geometría ──
def("m6.poligono", (R, S, H) => {
  const T = S.m6.PO, t = R.r();
  if (t < 0.35) { const n = R.int(4, 12), s = (n - 2) * 180; return { q: T.suma_q(T.nom[n]), kind: "int", ans: s, sol: T.suma_s(n, n - 2, H.n(s), true) }; }
  if (t < 0.75) { const n = R.pick([3, 4, 5, 6, 8, 9, 12]), s = (n - 2) * 180; return { q: T.reg_q(T.nomReg[n]), kind: "int", ans: s / n, sol: T.suma_s(n, n - 2, H.n(s), false) + " " + T.reg_s(n, H.n(s), s / n) }; }
  const n = R.int(5, 12), s = (n - 2) * 180;
  return { q: T.inv_q(H.n(s)), kind: "int", ans: n, sol: T.inv_s(H.n(s), n - 2, n) };
});
const lbl6 = (x, y, s, col = C.dark, anchor = "middle") => SVG.txt(x, y, s, 13, col, anchor, "bold");
const poly6 = (pts, fill = C.light) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${C.blue}" stroke-width="2"/>`;
const dash6 = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.red}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
const cm6 = (H, v) => `${H.dec(v)} cm`;
def("m6.romboide", (R, S, H) => {
  const T = S.m6.AR;
  if (R.r() < 0.6) {
    const b = R.int(5, 20), h = R.int(3, 14), side = h + R.int(1, 4), r = b * h;
    const body = poly6([[100, 130], [270, 130], [240, 30], [70, 30]]) + dash6(100, 30, 100, 130) + lbl6(185, 150, cm6(H, b)) + lbl6(106, 85, cm6(H, h), C.red, "start") + lbl6(62, 85, cm6(H, side), C.grey, "end");
    return { q: T.q(T.fig[0]) + "<br>" + SVG.svg(300, 160, body), kind: "num", ans: r, sol: T.romb_s(b, h, r, side) };
  }
  let D, d; do { D = R.int(6, 24); d = R.int(4, D - 1); } while ((D * d) % 2);
  const body = poly6([[130, 15], [230, 85], [130, 155], [30, 85]]) + dash6(30, 85, 230, 85) + dash6(130, 15, 130, 155) + lbl6(180, 80, cm6(H, D), C.red) + lbl6(136, 125, cm6(H, d), C.red, "start");
  return { q: T.q(T.fig[1]) + "<br>" + SVG.svg(260, 170, body), kind: "num", ans: D * d / 2, sol: T.rombo_s(D, d, D * d, D * d / 2) };
});
def("m6.compuesta", (R, S, H) => {
  const T = S.m6.AR, W = R.int(8, 20), Hh = R.int(6, 16), w = R.int(2, W - 3), h = R.int(2, Hh - 3), r = W * Hh - w * h;
  const sx = 200 / W, sy = 130 / Hh, X = v => +(64 + v * sx).toFixed(1), Y = v => +(22 + v * sy).toFixed(1);
  const body = poly6([[X(0), Y(0)], [X(W - w), Y(0)], [X(W - w), Y(h)], [X(W), Y(h)], [X(W), Y(Hh)], [X(0), Y(Hh)]]) + lbl6(X(W / 2), Y(Hh) + 18, cm6(H, W)) + lbl6(X(0) - 6, Y(Hh / 2), cm6(H, Hh), C.dark, "end") + lbl6(X((W - w) / 2), Y(0) - 4, cm6(H, W - w)) + lbl6(X(W) + 6, Y((h + Hh) / 2), cm6(H, Hh - h), C.dark, "start");
  const a1 = (W - w) * Hh, a2 = w * (Hh - h);
  return { q: T.q(T.fig[2]) + "<br>" + SVG.svg(330, 180, body), kind: "num", ans: r, sol: T.comp_s(W, W - w, Hh, a1, w, Hh - h, a2, r) };
});
def("m6.regular", (R, S, H) => {
  const T = S.m6.AR, n = R.pick([5, 6, 8]), l = R.int(4, 20), a = Math.round(l / (2 * Math.tan(Math.PI / n)) * 10) / 10, p = n * l, r = Math.round(p * a / 2 * 100) / 100;
  const cx = 110, cy = 85, rr = 65, pts = Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n; return [+(cx + rr * Math.cos(t)).toFixed(1), +(cy + rr * Math.sin(t)).toFixed(1)]; });
  const m = [(pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2];
  const body = poly6(pts) + dash6(cx, cy, m[0], m[1]) + `<circle cx="${cx}" cy="${cy}" r="3" fill="${C.dark}"/>` + lbl6(m[0] + 30, m[1] + 14, cm6(H, l)) + lbl6((cx + m[0]) / 2 - 4, (cy + m[1]) / 2 - 6, cm6(H, a), C.red, "end");
  return { q: T.reg_q(T.nreg[n]) + "<br>" + SVG.svg(260, 170, body), kind: "num", ans: r, tol: 0.01, sol: T.reg_s(n, l, p, H.dec(a), H.dec(Math.round(p * a * 100) / 100), H.dec(r)) };
});
const piTol6 = v => Math.max(0.051, Math.abs(v) * 0.0015);   // vale con π ≈ 3,14 o con la tecla π
def("m6.ciarea", (R, S, H) => {
  const T = S.m6.CI, [obj, lo, hi] = R.pick(T.objs), isD = R.r() < 0.4;
  let r = R.int(lo, hi); if (isD && r > 30) r = R.int(lo, Math.max(lo, 30));
  const A = Math.round(314 * r * r) / 100;
  return { q: T.area_q(obj, isD ? 2 * r : r, isD), kind: "num", ans: A, tol: piTol6(A), sol: (isD ? T.rad(2 * r, r) : "") + T.area_s(r, H.n(r * r), H.dec(A)) };
});
def("m6.radio", (R, S, H) => {
  const T = S.m6.CI, [obj, lo, hi] = R.pick(T.objs), diam = R.r() < 0.3;
  let r; do r = R.int(lo, hi); while (r === 10 && hi > lo);
  const L = Math.round(628 * r) / 100;
  if (diam) return { q: T.diam_q(obj, H.dec(L)), kind: "num", ans: 2 * r, tol: 0.06, sol: T.diam_s(H.dec(L), H.n(Math.round(L * 100)), 2 * r) };
  return { q: T.rad_q(obj, H.dec(L)), kind: "num", ans: r, tol: 0.03, sol: T.rad_s(H.dec(L), H.n(Math.round(L * 100)), r) };
});
// Coordenadas en los cuatro cuadrantes (primero la x, después la y)
function ejes6(lo, hi, size = 260) {
  const pad = 26, s = (size - 2 * pad) / (hi - lo), X = v => +(pad + (v - lo) * s).toFixed(1), Y = v => +(size - pad - (v - lo) * s).toFixed(1);
  let g = "";
  for (let v = lo; v <= hi; v++) g += `<line x1="${X(v)}" y1="${Y(lo)}" x2="${X(v)}" y2="${Y(hi)}" stroke="#e3e6ea"/><line x1="${X(lo)}" y1="${Y(v)}" x2="${X(hi)}" y2="${Y(v)}" stroke="#e3e6ea"/>`;
  g += `<line x1="${X(lo)}" y1="${Y(0)}" x2="${X(hi) + 8}" y2="${Y(0)}" stroke="${C.dark}" stroke-width="1.6"/><line x1="${X(0)}" y1="${Y(lo)}" x2="${X(0)}" y2="${Y(hi) - 8}" stroke="${C.dark}" stroke-width="1.6"/>`;
  for (let v = lo; v <= hi; v += 2) if (v) g += SVG.txt(X(v), Y(0) + 15, neg6(v), 10, "#54595d") + SVG.txt(X(0) - 5, Y(v) + 4, neg6(v), 10, "#54595d", "end");
  g += SVG.txt(X(hi) + 4, Y(0) - 6, "x", 12, C.dark, "end", "bold") + SVG.txt(X(0) + 8, Y(hi) - 2, "y", 12, C.dark, "start", "bold");
  return { X, Y, svg: body => SVG.svg(size, size, g + body) };
}
def("m6.coordenadas", (R, S, H) => {
  const T = S.m6.CO, x = R.int(-5, 5), y = R.int(-5, 5);
  if (!x && !y) return null;
  const A = ejes6(-6, 6), dot = `<circle cx="${A.X(x)}" cy="${A.Y(y)}" r="5" fill="${C.red}" stroke="${C.dark}"/>` + SVG.txt(A.X(x) + 8, A.Y(y) - 8, "P", 13, C.red, "start", "bold");
  return { q: T.q + "<br>" + A.svg(dot), kind: "fields", fields: [{ label: "x", ans: x }, { label: "y", ans: y }], sol: T.s(neg6(x), neg6(y), T.hor(x), T.ver(y)) };
});

// Cuerpos redondos: qué figura los genera al girar, sus medidas y la etiqueta del cilindro (2 × π × r)
def("m6.redondos", (R, S, H) => {
  const T = S.m6.RE, t = R.r();
  if (t < 0.3) {
    if (R.r() < 0.5) { const k = R.int(0, 2), { opts, correct } = opt6(R, T.cuerpos[k], T.cuerpos.filter((_, i) => i !== k).concat([T.prisma])); return { q: T.gen_q(T.figs[k]), kind: "choice", opts, correct, shuffle: false, sol: T.gen_s[k] }; }
    const k = R.int(1, 2), { opts, correct } = opt6(R, T.figsC[k], T.figsC.filter((_, i) => i !== k).concat([T.circ]));
    return { q: T.fig_q(T.cuerpos[k]), kind: "choice", opts, correct, shuffle: false, sol: T.gen_s[k] };
  }
  if (t < 0.55) {   // un rectángulo o un triángulo rectángulo gira sobre uno de sus lados
    const tri = R.r() < 0.4; let a, b; do { a = R.int(2, 12); b = R.int(2, 15); } while (a === b);
    return { q: T.med_q(tri, a, b), kind: "fields", fields: [{ label: T.f[0], ans: a }, { label: T.f[1], ans: b }], sol: T.med_s(tri, a, b) };
  }
  if (t < 0.85) {   // el largo de la etiqueta de un bote
    const diam = R.r() < 0.3; let r; do r = R.pick([2, 3, 4.5, 6, 7, 2.5, 8, 9, 10, 5.5, 6.5]); while (r === 4 || r === 3.5 || r === 5);
    const L = Math.round(628 * r) / 100;
    return { q: T.eti_q(R.pick(T.botes), diam ? H.dec(2 * r) : H.dec(r), diam), kind: "num", ans: L, tol: 0.02, sol: diam ? T.eti_d(H.dec(2 * r), H.dec(L)) : T.eti_s(H.dec(r), H.dec(L)) };
  }
  const [q, k] = R.pick(T.elem);   // elementos
  const { opts, correct } = opt6(R, T.nom[k], T.nom.filter((_, i) => i !== k));
  return { q, kind: "choice", opts, correct, shuffle: false, sol: T.elem_s[k] };
});
// Traslaciones, simetrías (eje vertical u horizontal) y giros del minutero, en la cuadrícula
def("m6.movimientos", (R, S, H) => {
  const T = S.m6.MV, t = R.r(), A = ejes6(0, 12), dot = (x, y, l, c) => `<circle cx="${A.X(x)}" cy="${A.Y(y)}" r="5" fill="${c}" stroke="${C.dark}"/>` + SVG.txt(A.X(x) + 8, A.Y(y) - 8, l, 13, c, "start", "bold");
  if (t < 0.4) {
    let x, y, dx, dy; do { x = R.int(0, 10); y = R.int(0, 10); dx = R.int(-6, 6); dy = R.int(-6, 6); } while (!dx || !dy || x + dx < 0 || x + dx > 12 || y + dy < 0 || y + dy > 12 || (x === 2 && y === 5) || (x === 1 && y === 4));
    const q = T.tras_q(x, y, Math.abs(dx), dx > 0, Math.abs(dy), dy > 0) + "<br>" + A.svg(dot(x, y, "P", C.red));
    return { q, kind: "fields", fields: [{ label: "x", ans: x + dx }, { label: "y", ans: y + dy }], sol: T.tras_s(x, dx, x + dx, y, dy, y + dy) };
  }
  if (t < 0.75) {
    const vert = R.r() < 0.6; let e, x, y; do { e = R.int(3, 9); x = R.int(0, 12); y = R.int(0, 12); } while ((vert ? x : y) === e || 2 * e - (vert ? x : y) < 0 || 2 * e - (vert ? x : y) > 12 || (vert && e === 5 && x === 3 && y === 4));
    const p = vert ? x : y, d = Math.abs(p - e), r = 2 * e - p, axis = vert ? `<line x1="${A.X(e)}" y1="${A.Y(0)}" x2="${A.X(e)}" y2="${A.Y(12)}" stroke="${C.blue}" stroke-width="2.5" stroke-dasharray="6 4"/>` : `<line x1="${A.X(0)}" y1="${A.Y(e)}" x2="${A.X(12)}" y2="${A.Y(e)}" stroke="${C.blue}" stroke-width="2.5" stroke-dasharray="6 4"/>`;
    return { q: T.sim_q(x, y, vert, e) + "<br>" + A.svg(axis + dot(x, y, "P", C.red)), kind: "fields", fields: [{ label: "x", ans: vert ? r : x }, { label: "y", ans: vert ? y : r }],
      sol: T.sim_s(vert, e, p, d, p < e, r, vert ? `(${r}, ${y})` : `(${x}, ${r})`) };
  }
  const m = R.pick([5, 20, 25, 35, 40, 50, 55, 12, 18]);
  return { q: T.giro_q(m), kind: "int", ans: m * 6, sol: T.giro_s(m, m * 6) };
});

// ── Unidad 8 · Estadística y probabilidad ──
def("m6.media", (R, S, H) => {
  const T = S.m6.ME;
  for (let g = 0; g < 200; g++) {
    const [ctx, lo, hi, u] = R.pick(T.ctx), n = R.int(4, 8), xs = Array.from({ length: n }, () => R.int(lo, hi)), sum = xs.reduce((a, b) => a + b, 0);
    if ((sum * 10) % n) continue;
    const m = sum / n;
    return { q: T.q(ctx, xs.join(", ")), kind: "num", ans: m, sol: T.s(xs.join(" + "), sum, n, H.dec(m), u) };
  }
  return null;
});
def("m6.rango", (R, S, H) => {
  const T = S.m6.RG;
  if (R.r() < 0.3) {   // temperaturas bajo cero: se cuenta pasando por el 0
    const n = R.int(5, 7); let xs; do xs = Array.from({ length: n }, () => R.int(-8, 15)); while (Math.min(...xs) >= 0 || Math.max(...xs) <= 0);
    const mx = Math.max(...xs), mn = Math.min(...xs);
    return { q: T.temp_q(xs.map(neg6).join(", ")), kind: "int", ans: mx - mn, sol: T.temp_s(mx, neg6(mn), -mn, mx - mn) };
  }
  const [ctx, lo, hi, u] = R.pick(T.ctx), xs = Array.from({ length: R.int(6, 10) }, () => R.int(lo, hi)), mx = Math.max(...xs), mn = Math.min(...xs);
  return { q: T.q(ctx, xs.join(", ")), kind: "int", ans: mx - mn, sol: T.s(mx, mn, mx - mn, u) };
});
// Frecuencias con totales que dan decimales y porcentajes exactos (10, 20, 25, 50)
def("m6.frecuencia", (R, S, H) => {
  const T = S.m6.FR, [ctx, vals] = R.pick(T.ctx), N = R.pick([10, 20, 20, 25, 50]);
  for (let g = 0; g < 100; g++) {
    const k = Math.min(vals.length, R.int(3, 4)), vs = vals.slice(0, k), cnt = vs.map(() => 1);
    for (let i = k; i < N; i++) cnt[R.int(0, k - 1)]++;
    const j = R.int(0, k - 1), f = cnt[j], rel = f / N, t = R.r();
    if (f === N || (N === 25 && f === 7) || (N === 20 && f === 9)) continue;
    const data = N <= 20 ? T.lista(ctx, R.shuffle(vs.flatMap((v, i) => Array(cnt[i]).fill(v))).join(", ")) : T.tabla(ctx, N, vs.map((v, i) => `${v}: ${cnt[i]}`).join(" · "));
    if (N <= 20 && t < 0.3) return { q: data + " " + T.abs_q(vs[j]), kind: "int", ans: f, sol: T.abs_s(vs[j], f) };
    if (t < 0.65) return { q: data + " " + T.rel_q(vs[j]), kind: "num", ans: rel, sol: T.rel_s(vs[j], f, N, H.dec(rel)) };
    return { q: data + " " + T.pc_q(vs[j]), kind: "num", ans: rel * 100, sol: T.rel_s(vs[j], f, N, H.dec(rel)) + " " + T.pc_s(H.dec(rel), H.dec(rel * 100)) };
  }
  return null;
});
// Probabilidad experimental: cuántas veces se espera un resultado, o su frecuencia relativa
def("m6.esperado", (R, S, H) => {
  const T = S.m6.ES, [exp, num, den] = R.pick(T.exps), N = den * R.pick([5, 10, 20, 30, 50].filter(x => den * x <= 300 && !(den === 2 && x === 50)));
  if (R.r() < 0.6) return { q: T.q(exp, N), kind: "int", ans: N * num / den, sol: T.s(H.frac(num, den), num, den, N, N * num / den) };
  const M = R.pick([20, 25, 50, 100]), e = M * num / den, obs = Math.round(e) + R.pick([-3, -2, -1, 1, 2, 3]);
  if (obs < 2 || obs >= M) return null;
  return { q: T.fr_q(exp, M, obs), kind: "num", ans: obs / M, sol: T.fr_s(obs, M, H.dec(obs / M), H.frac(num, den), H.dec(Math.round(num / den * 100) / 100)) };
});
def("m6.tipovar", (R, S, H) => {
  const T = S.m6.TV, [v, k] = R.pick(T.items);
  return { q: T.q(v), kind: "choice", opts: T.tipos, correct: k, shuffle: false, sol: T.s[k] };
});
def("m6.casos", (R, S, H) => {
  const T = S.m6.CA;
  if (R.r() < 0.35) { const n = R.int(5, 20), w = R.pick(T.bolas); return { q: T.q(w(n)), kind: "int", ans: n, sol: T.bolas_s(n) }; }
  const [e, n, how] = R.pick(T.items);
  return { q: T.q(e), kind: "int", ans: n, sol: T.s(n, how) };
});
def("m6.suceso", (R, S, H) => {
  const T = S.m6.SU;
  if (R.r() < 0.5) {
    const cols = R.shuffle(T.col).slice(0, 3), a = R.int(1, 9), b = R.int(1, 9), k = R.int(0, 2);
    const bolsa = T.bolsa(a, cols[0], b, cols[1]), what = [T.una(cols[0]), T.una(cols[2]), T.oo(cols[0], cols[1])][k];
    return { q: T.q(T.saca(bolsa, what)), kind: "choice", opts: T.tipos, correct: [1, 2, 0][k], shuffle: false, sol: T.bs[k](cols[0], cols[1], cols[2]) };
  }
  const [s, k] = R.pick(T.items);
  return { q: T.q(s), kind: "choice", opts: T.tipos, correct: k, shuffle: false, sol: T.s[k] };
});
})();
