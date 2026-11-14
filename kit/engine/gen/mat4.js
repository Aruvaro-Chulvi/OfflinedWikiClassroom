/* WikiAula — Matemáticas, Grado 4 (4.º de Primaria).
   Textos: i18n/<lang>/mat4.js (S.m4). Dibujos: WA.SVG (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const { gcd, F } = WA.MATH;
const X = "×";
// los nombres de personas de los problemas están en S.m4.nombres (i18n/<lang>/mat4.js)
const digitAt = (n, p) => Math.floor(n / 10 ** p) % 10;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;

// ═════ Unidad 1 · Números grandes ═════
def("m4.millones", (R, S, H, L) => {
  const n = R.int(100000, 9999999), k = R.int(0, 2);
  if (k === 0) {   // solo cifras que salen una vez en el número (si no, «¿cuánto vale el 6?» tendría dos respuestas)
    const s = String(n), ps = [];
    for (let p = 0; p < s.length; p++) { const d = digitAt(n, p); if (d && s.split(String(d)).length === 2) ps.push(p); }
    if (ps.length) { const p = R.pick(ps), d = digitAt(n, p), v = d * 10 ** p; return { q: S.m4.valor_q(H.n(n), d), kind: "int", ans: v, sol: S.m4.valor_s(d, S.m4.pos[p], H.n(v)) }; }
  }
  if (k <= 1) return { q: S.m4.letras_q(L.words(n)), kind: "int", ans: n, sol: S.m4.letras_s(L.words(n), H.n(n)) };
  const set = new Set([n]); [n + 100000, n - 10000, n + 1000].forEach(x => { if (x > 99999 && x < 1e7) set.add(x); });
  while (set.size < 4) set.add(R.int(100000, 9999999));
  const opts = R.shuffle([...set].map(x => L.words(x)));
  return { q: S.m4.letras2_q(H.n(n)), kind: "choice", opts, correct: opts.indexOf(L.words(n)), sol: S.m4.letras_s(L.words(n), H.n(n)) };
});
def("m4.valorpos", (R, S, H) => {
  const n = R.int(100000, 9999999);
  if (R.r() < 0.5) {
    const parts = String(n).split("").map((d, i, a) => +d * 10 ** (a.length - 1 - i)).filter(Boolean);
    return { q: S.m4.desc_q(parts.map(H.n).join(" + ")), kind: "int", ans: n, sol: S.m4.desc_s(H.n(n)) };
  }
  const p = R.pick([3, 5, 6].filter(x => 10 ** x <= n)), v = digitAt(n, p) * 10 ** p;
  return { q: S.m4.desc2_q(H.n(n), S.m4.pos[p]), kind: "int", ans: digitAt(n, p), sol: S.m4.desc2_s(H.n(n), S.m4.pos[p], digitAt(n, p), H.n(v)) };
});
def("m4.aprox", (R, S, H) => {
  const p = R.pick([3, 4, 5]), n = R.int(10 ** (p + 1), 9999999), r = Math.round(n / 10 ** p) * 10 ** p, look = digitAt(n, p - 1);
  return { q: S.m4.red_q(H.n(n), S.m4.redp[p]), kind: "int", ans: r, sol: S.m4.red_s(S.m4.pos[p - 1], look, look >= 5, H.n(r)) };
});
const ROM = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
const toRoman = n => ROM.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");
def("m4.romanos", (R, S, H) => {
  const n = R.r() < 0.5 ? R.int(1, 50) : R.r() < 0.5 ? R.int(50, 500) : R.int(500, 3999), r = toRoman(n);
  // la solución separa por órdenes, como la lección: 348 = 300 + 40 + 8 = CCC + XL + VIII
  const parts = [3, 2, 1, 0].map(p => [digitAt(n, p) * 10 ** p, digitAt(n, p)]).filter(([v]) => v).map(([v, c]) => [v, toRoman(v), c === 4 || c === 9]);
  if (R.r() < 0.55) return { q: S.m4.rom_q(r), kind: "int", ans: n, sol: S.m4.rom_s(r, n, parts, H.n) };
  return { q: S.m4.rom2_q(n), kind: "text", ans: [r], hint: S.m4.rom_hint, ansHtml: r, sol: S.m4.rom2_s(r, n, parts, H.n) };
});

// ═════ Unidad 2 · Operaciones ═════
def("m4.mult3", (R, S, H) => {
  const a = R.int(23, 999), b = R.r() < 0.6 ? R.int(12, 99) : R.int(101, 459);
  // la solución, como la lección: arriba el de más cifras y un producto por cada cifra de abajo (la fila del 0 se salta)
  const sw = String(a).length < String(b).length, top = sw ? b : a, bot = sw ? a : b;
  const rows = String(bot).split("").reverse().map((c, i) => [+c, i, top * +c * 10 ** i]);
  return { q: S.m4.op_q(`${H.n(a)} ${X} ${b}`), kind: "int", ans: a * b, sol: S.m4.mult_s(top, bot, rows, a * b, sw, H.n) };
});
def("m4.jerarquia", (R, S) => {
  // de dos y de tres operaciones; también sumas y restas seguidas, × y : seguidas y una división con paréntesis
  const T = S.m4.JE, a = R.int(2, 20), b = R.int(2, 9), c = R.int(2, 9), k = R.int(0, 9);
  let E;
  if (k === 0) E = [`${a} + ${b} ${X} ${c}`, a + b * c, "md", [`${b} ${X} ${c} = ${b * c}`, `${a} + ${b * c} = ${a + b * c}`]];
  if (k === 1) E = [`(${a} + ${b}) ${X} ${c}`, (a + b) * c, "par", [`${a} + ${b} = ${a + b}`, `${a + b} ${X} ${c} = ${(a + b) * c}`]];
  if (k === 2) E = [`${a * c + b} − ${a} ${X} ${c}`, b, "md", [`${a} ${X} ${c} = ${a * c}`, `${a * c + b} − ${a * c} = ${b}`]];
  if (k === 3) { const d = R.int(2, 30), e = R.int(2, Math.min(9, d + a * b - 1)), s = d + a * b; E = [`${d} + ${a} ${X} ${b} − ${e}`, s - e, "mdlr", [`${a} ${X} ${b} = ${a * b}`, `${d} + ${a * b} = ${s}`, `${s} − ${e} = ${s - e}`]]; }
  if (k === 4) E = [`${a} + ${b * c} ${WA.H.div} ${b}`, a + c, "md", [`${b * c} ${WA.H.div} ${b} = ${c}`, `${a} + ${c} = ${a + c}`]];
  if (k === 5) E = [`${b} ${X} (${a + c} − ${c})`, b * a, "par", [`${a + c} − ${c} = ${a}`, `${b} ${X} ${a} = ${b * a}`]];
  if (k === 6) { const x = R.int(20, 90), y = R.int(5, x - 5), z = R.int(2, 30); E = [`${x} − ${y} + ${z}`, x - y + z, "lr", [`${x} − ${y} = ${x - y}`, `${x - y} + ${z} = ${x - y + z}`]]; }
  if (k === 7) { const p = R.int(1, 5), q = R.int(1, 5), d = R.int(2, 5), m = (p + q) * d, y = m + R.int(1, 30); E = [`${y} − (${p} + ${q}) ${X} ${d}`, y - m, "pmd", [`${p} + ${q} = ${p + q}`, `${p + q} ${X} ${d} = ${m}`, `${y} − ${m} = ${y - m}`]]; }
  if (k === 8) { const s = c * R.int(2, 12), x = R.int(1, s - 1); E = [`(${x} + ${s - x}) ${WA.H.div} ${c}`, s / c, "par", [`${x} + ${s - x} = ${s}`, `${s} ${WA.H.div} ${c} = ${s / c}`]]; }
  if (k === 9) { const r = R.int(2, 9); E = [`${b * c} ${WA.H.div} ${b} ${X} ${r}`, c * r, "mdiz", [`${b * c} ${WA.H.div} ${b} = ${c}`, `${c} ${X} ${r} = ${c * r}`]]; }
  return { q: S.m4.jer_q(E[0]), kind: "int", ans: E[1], sol: T.s(E[2], E[3]) };
});
def("m4.combinados", (R, S, H) => {
  const k = R.int(0, 3), N = R.pick(S.m4.nombres);
  // precios creíbles: libros de 6 a 20 €, cuadernos de 1 a 4 €, entradas de 4 a 25 €
  if (k === 0) { const n = R.int(2, 6), p = R.int(6, 20), m = R.int(2, 8), q = R.int(1, 4), t = n * p + m * q; return { q: S.m4.cb_q[0](N, n, p, m, q), kind: "int", ans: t, sol: S.m4.cb_s[0](n, p, m, q, n * p, m * q, t) }; }
  if (k === 1) { const cajas = R.int(4, 15), per = R.int(12, 48), vend = R.int(10, cajas * per - 1); return { q: S.m4.cb_q[1](cajas, per, vend), kind: "int", ans: cajas * per - vend, sol: S.m4.cb_s[1](cajas, per, cajas * per, vend, cajas * per - vend) }; }
  if (k === 2) { const sem = R.int(3, 9), dia = R.int(15, 60); return { q: S.m4.cb_q[2](N, dia, sem), kind: "int", ans: dia * 7 * sem, sol: S.m4.cb_s[2](dia, 7 * dia, sem, H.n(dia * 7 * sem)) }; }
  const pers = R.int(3, 9), each = R.int(4, 25), total = Math.ceil(pers * each * (1 + R.r() * 0.6) / 10) * 10 + 10; return { q: S.m4.cb_q[3](total, pers, each), kind: "int", ans: total - pers * each, sol: S.m4.cb_s[3](pers, each, pers * each, total, total - pers * each) };
});

// ═════ Unidad 3 · División ═════
// La cuenta de la lección, paso a paso: tomo las cifras necesarias, tanteo tapando la última cifra del divisor y
// del trozo (si sale 10 o más, empiezo por 9; si me paso, bajo), multiplico, resto y bajo la cifra siguiente.
// Devuelve una lista de pasos: {k: "toma"|"baja", cur, prev?, dig?} + {t0, q, p, rest, over?} o {cero: true}
function longDiv(D, d) {
  const s = String(D), st = [];
  let i = 1; while (+s.slice(0, i) < d) i++;
  let cur = +s.slice(0, i), first = true;
  for (;;) {
    const step = first ? { k: "toma", cur, short: i > 1 ? +s.slice(0, i - 1) : null } : { k: "baja", cur };
    if (cur < d) Object.assign(step, { cero: true, rest: cur });
    else {
      const t0 = Math.floor(Math.floor(cur / 10) / Math.floor(d / 10)), q = Math.floor(cur / d), start = Math.min(t0, 9);
      Object.assign(step, { hi: Math.floor(cur / 10), lo: Math.floor(d / 10), t0, start, q, p: d * q, rest: cur - d * q });
    }
    st.push(step);
    if (i >= s.length) break;
    step.next = s[i];
    cur = step.rest * 10 + +s[i]; i++; first = false;
  }
  return st;
}
function div2gen(R, S, H, maxD) {
  let d, q, r, D;
  do { d = R.int(11, 59); q = R.r() < 0.5 ? R.int(2, 9) : R.int(10, 99); r = R.int(0, d - 1); D = d * q + r; } while (D > maxD || (maxD < 1000 && D < 100));
  return { q: S.m4.div_q(H.n(D), d), kind: "fields", fields: [{ label: S.m4.div_f[0], ans: q }, { label: S.m4.div_f[1], ans: r }], sol: S.m4.div_s(D, d, q, r, longDiv(D, d), H.n) };
}
def("m4.div2", (R, S, H) => div2gen(R, S, H, 99999));     // Mates 5: también dividendos de cuatro cifras
def("m4.div2c", (R, S, H) => div2gen(R, S, H, 999));      // Mates 4: dividendos de tres cifras, como la lección
def("m4.propdiv", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) { const d = R.int(2, 9), q = R.int(2, 12), m = R.pick([2, 3, 5, 10]); return { q: S.m4.pd_q0(d * q, d, q, d * q * m, d * m), kind: "int", ans: q, sol: S.m4.pd_s0(m, q) }; }
  if (k === 1) { const f = R.pick([10, 100]), n = R.int(2, 99) * f; return { q: S.m4.op_q(`${H.n(n)} ${WA.H.div} ${f}`), kind: "int", ans: n / f, sol: S.m4.pd_s1(f, H.n(n / f)) }; }
  if (k === 3) {   // tachar los mismos ceros en los dos números: 7200 : 900 = 72 : 9
    const b = R.int(2, 9), q = R.int(2, 9), z = R.int(1, 2), e = R.int(0, 1), D = b * q * 10 ** (z + e), d = b * 10 ** z;
    return { q: S.m4.op_q(`${H.n(D)} ${WA.H.div} ${H.n(d)}`), kind: "int", ans: q * 10 ** e, sol: S.m4.pd_s3(z, H.n(D / 10 ** z), b, H.n(q * 10 ** e), H.n(d), H.n(D)) };
  }
  const d = R.int(3, 9), q = R.int(3, 20), r = R.int(1, d - 1); return { q: S.m4.pd_q2(d, q, r), kind: "int", ans: d * q + r, sol: S.m4.pd_s2(d, q, r, d * q + r) };
});
def("m4.probdiv", (R, S) => {
  // los tres destinos del resto (añadir uno, el cociente, el resto) y los dos tipos (agrupar y repartir)
  const T = S.m4.PV, k = R.int(0, 4);
  if (k === 0) { const cap = R.int(20, 55), n = R.int(cap + 1, cap * 6); const b = Math.ceil(n / cap); return { q: S.m4.bus_q(n, cap), kind: "int", ans: b, sol: S.m4.bus_s(n, cap, Math.floor(n / cap), n % cap, b) }; }
  if (k === 1) { const per = R.pick([6, 10, 12, 18, 24, 30]), n = R.int(per * 3, per * 40); return { q: S.m4.cajas_q(n, per), kind: "int", ans: Math.floor(n / per), sol: S.m4.cajas_s(n, per, Math.floor(n / per), n % per) }; }
  if (k === 2) {
    const p = R.int(12, 35), m = R.int(3, 20);
    if (R.r() < 0.5) return { q: S.m4.precio_q(p * m, p), kind: "int", ans: m, sol: T.precio_s(p * m, p, m) };
    const r = R.int(1, p - 1), t = p * m + r; return { q: T.max_q(t, p), kind: "int", ans: m, sol: T.max_s(t, p, m, r) };
  }
  if (k === 3) { const tr = R.int(3, 25), q = R.int(3, 15), r = R.int(1, tr - 1), n = tr * q + r; return { q: T.cuerda_q(n, tr), kind: "int", ans: r, sol: T.cuerda_s(n, tr, q, r) }; }
  const [cosa, quien, fem] = R.pick(T.rep), kk = R.int(3, 12), q = R.int(8, 40), r = R.int(0, kk - 1), n = kk * q + r;
  return { q: T.rep_q(n, cosa, kk, quien, fem), kind: "int", ans: q, sol: T.rep_s(n, kk, q, r, cosa) };
});

// ═════ Unidad 4 · Fracciones ═════
def("m4.equiv", (R, S) => {
  let a, b; do { b = R.int(2, 9); a = R.int(1, b - 1); } while (gcd(a, b) !== 1);
  const k = R.int(2, 6);
  if (R.r() < 0.5) return { q: S.m4.eq_q(`${a}/${b} = ☐/${b * k}`), kind: "int", ans: a * k, sol: S.m4.eq_s(a, b, k) };
  if (R.r() < 0.5) return { q: S.m4.eq_q(`${a * k}/${b * k} = ${a}/☐`), kind: "int", ans: b, sol: S.m4.eq2_s(a * k, b * k, k) };
  const ok = `${a * k}/${b * k}`, opts = R.shuffle([ok, `${a + k}/${b + k}`, `${a * k}/${b + k}`, `${a}/${b * k}`].filter((x, i, arr) => arr.indexOf(x) === i));
  return { q: S.m4.eq3_q(`${a}/${b}`), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m4.eq_s(a, b, k) };
});
def("m4.compfr", (R, S) => {
  let a, b, c, d;
  do { b = R.int(2, 10); d = R.int(2, 10); a = R.int(1, b - 1); c = R.int(1, d - 1); } while (b === d && a === c);
  const l = a * d, r = c * b, k = l > r ? 0 : l < r ? 1 : 2;
  return { q: S.m4.cf_q(a, b, c, d), kind: "choice", opts: [">", "<", "="], correct: k, shuffle: false, sol: b === d ? S.m4.cf_s1(a, b, c, k) : S.m4.cf_s2(a, b, c, d, b * d, l, r, k) };
});
def("m4.sumafr", (R, S) => {
  const d = R.int(3, 12), add = R.r() < 0.55;
  let a, b; do { a = R.int(1, d); b = R.int(1, d); } while (add ? a + b > 2 * d : a <= b);
  const n = add ? a + b : a - b;
  return { q: S.m4.op_q(`${a}/${d} ${add ? "+" : "−"} ${b}/${d}`), kind: "frac", ans: [n, d], hint: S.m4.frac_hint, sol: S.m4.sf_s(a, b, d, n, add) };
});
def("m4.fracnum", (R, S, H) => {
  let d, n; do { d = R.int(2, 12); n = R.int(1, d - 1); } while (gcd(n, d) !== 1);   // fracción irreducible
  const N = d * R.int(3, 40);
  if (R.r() < 0.3) { const [obj] = R.pick(S.m4.objs); return { q: S.m4.fn2_q(N, obj, n, d), kind: "int", ans: N / d * n, sol: S.m4.fn_s(N, d, N / d, n, N / d * n) }; }
  return { q: S.m4.fn_q(n, d, H.n(N)), kind: "int", ans: N / d * n, sol: S.m4.fn_s(N, d, N / d, n, N / d * n) };
});
def("m4.mixtos", (R, S) => {
  const d = R.int(2, 9), e = R.int(1, 5), r = R.int(1, d - 1), n = e * d + r;
  if (R.r() < 0.5) return { q: S.m4.mx_q(n, d), kind: "fields", fields: [{ label: S.m4.mx_f[0], ans: e }, { label: S.m4.mx_f[1], ans: r }], sol: S.m4.mx_s(n, d, e, r) };
  return { q: S.m4.mx2_q(e, r, d), kind: "frac", ans: [n, d], hint: S.m4.frac_hint, sol: S.m4.mx2_s(e, d, r, n) };
});

// ═════ Unidad 5 · Números decimales ═════
function grid(k) {   // cuadrícula de 10 × 10 con k casillas coloreadas
  let b = "";
  for (let i = 0; i < 100; i++) b += `<rect x="${6 + (i % 10) * 14}" y="${6 + Math.floor(i / 10) * 14}" width="14" height="14" fill="${i < k ? C.blue : "#fff"}" stroke="${C.grey}" stroke-width=".8"/>`;
  return SVG.svg(152, 152, b);
}
def("m4.decimas", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const n = R.int(1, 99); return { q: S.m4.grid_q + "<br>" + grid(n), kind: "num", ans: n / 100, sol: S.m4.grid_s(n, H.dec(n / 100)) }; }
  if (k === 1) { const d = R.pick([10, 100]), n = R.int(1, d === 10 ? 99 : 999); return { q: S.m4.fd_q(n, d), kind: "num", ans: n / d, sol: S.m4.fd_s(n, d, H.dec(n / d)) }; }
  const n = R.int(1, 999), x = n / 100; return { q: S.m4.df_q(H.dec(x)), kind: "frac", ans: [n, 100], sol: S.m4.df_s(H.dec(x), n) };
});
// Mates 4 (m4.decimas sigue para Mates 5): solo fracciones menores que 1, como la lección, y la cuadrícula
// coloreada por columnas (una columna = una décima)
function gridCols(k) {
  let b = "";
  for (let i = 0; i < 100; i++) b += `<rect x="${6 + Math.floor(i / 10) * 14}" y="${6 + (i % 10) * 14}" width="14" height="14" fill="${i < k ? C.blue : "#fff"}" stroke="${C.grey}" stroke-width=".8"/>`;
  return SVG.svg(152, 152, b);
}
def("m4.fracdec", (R, S, H) => {
  const k = R.int(0, 2), T = S.m4.FD;
  if (k === 0) { const n = R.int(1, 99); return { q: S.m4.grid_q + "<br>" + gridCols(n), kind: "num", ans: n / 100, sol: T.grid_s(n, Math.floor(n / 10), n % 10, H.dec(n / 100)) }; }
  if (k === 1 && R.r() < 0.35) { const n = R.int(1, 9); return { q: S.m4.fd_q(n, 10), kind: "num", ans: n / 10, sol: T.dec_s(n, H.dec(n / 10)) }; }
  let n; do n = R.int(1, 99); while (n % 10 === 0);   // 40/100 = 0,4 se trata con las décimas
  if (k === 1) return { q: S.m4.fd_q(n, 100), kind: "num", ans: n / 100, sol: T.cent_s(n, Math.floor(n / 10), n % 10, H.dec(n / 100)) };
  return { q: S.m4.df_q(H.dec(n / 100)), kind: "frac", ans: [n, 100], sol: T.df_s(H.dec(n / 100), Math.floor(n / 10), n % 10, n) };
});
def("m4.leerdec", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) {
    const a = R.int(0, 99), b = R.int(1, 99), x = a + b / 100, p = R.int(0, 1), dg = p === 0 ? Math.floor(b / 10) : b % 10;
    const all = String(a) + String(b).padStart(2, "0");
    if (!dg || all.split(String(dg)).length > 2) return { q: S.m4.dw2_q(a, b), kind: "num", ans: x, sol: S.m4.dw_s(H.dec(x)) };
    return { q: S.m4.dv_q(H.dec(x), dg, S.m4.decp[p]), kind: "choice", opts: S.m4.decp_o, correct: p + 1, shuffle: false, sol: S.m4.dv_s(dg, S.m4.decp[p]) };
  }
  if (k === 1) { const e = R.int(0, 30), c = R.int(1, 99); return { q: S.m4.dw2_q(e, c), kind: "num", ans: e + c / 100, sol: S.m4.dw_s(H.dec(e + c / 100)) }; }
  let a = R.int(0, 9) + R.int(0, 99) / 100, b = Math.floor(a) + R.pick([R.int(0, 9) / 10, R.int(0, 99) / 100]);
  if (R.r() < 0.15) b = a;
  const kk = a > b ? 0 : a < b ? 1 : 2;
  return { q: S.m4.dc_q(H.dec(a), H.dec(b)), kind: "choice", opts: [">", "<", "="], correct: kk, shuffle: false, sol: S.m4.dc_s(H.dec(a), H.dec(b), kk) };
});
def("m4.sumadec", (R, S, H) => {
  const add = R.r() < 0.55;
  let a = rd(R.int(10, 9999) / 100), b = rd(R.int(1, 999) / (R.r() < 0.5 ? 10 : 100));
  if (!add && b > a) [a, b] = [b, a];
  const r = rd(add ? a + b : a - b), cifras = v => (H.dec(v).split(/[,.]/)[1] || "").length;
  // la solución, como la lección: relleno con ceros, las comas en columna y columna a columna (llevándome 1)
  return { q: S.m4.op_q(`${H.dec(a)} ${add ? "+" : "−"} ${H.dec(b)}`), kind: "num", ans: r, sol: S.m4.SD.s(add, Math.round(a * 100), Math.round(b * 100), Math.round(r * 100), cifras(a) < 2 || cifras(b) < 2) };
});
def("m4.dinero", (R, S, H) => {
  // importes con dos decimales (6,10 €) y precios creíbles (en céntimos, de 5 en 5)
  const k = R.int(0, 2), eu = c => WA.MATH.eur(c / 100, H), c5 = (lo, hi) => R.int(lo / 5, hi / 5) * 5, money = c => ({ ansHtml: H.money(c / 100) });
  if (k === 0) { const a = c5(1500, 4500), b = c5(300, 1200), c = c5(100, 400), t = a + b + c; return Object.assign({ q: S.m4.ti_q(eu(a), eu(b), eu(c)), kind: "num", ans: t / 100, sol: S.m4.ti_s(eu(t)) }, money(t)); }
  if (k === 1) { const p = c5(500, 4500), pay = [1000, 2000, 5000].find(x => x > p); return Object.assign({ q: S.m4.vu_q(eu(p), pay / 100), kind: "num", ans: (pay - p) / 100, sol: S.m4.vu_s(pay / 100, eu(p), eu(pay - p)) }, money(pay - p)); }
  const p = c5(300, 1200), n = R.int(2, 9); return Object.assign({ q: S.m4.ud_q(n, eu(p)), kind: "num", ans: n * p / 100, sol: S.m4.ud_s(n, eu(p), eu(n * p)) }, money(n * p));
});

// Mates 4 (m4.dinero sigue para Mates 5 y 6): las soluciones usan los métodos de la lección (sumar con las comas
// en columna, contar hacia arriba desde el precio y, para varias cosas iguales, pasar a céntimos)
def("m4.euros", (R, S, H) => {
  const T = S.m4.EU, k = R.int(0, 2), eu = c => WA.MATH.eur(c / 100, H), eu2 = c => WA.MATH.eur(c / 100, H, true), c5 = (lo, hi) => R.int(lo / 5, hi / 5) * 5, money = c => ({ ansHtml: H.money(c / 100) });
  if (k === 0) { const a = c5(1500, 4500), b = c5(300, 1200), c = c5(100, 400), t = a + b + c; return Object.assign({ q: S.m4.ti_q(eu(a), eu(b), eu(c)), kind: "num", ans: t / 100, sol: T.ti_s(eu2(a), eu2(b), eu2(c), eu2(a + b), eu(t)) }, money(t)); }
  if (k === 1) {
    const p = c5(500, 4500), pay = [1000, 2000, 5000].find(x => x > p), J = [];
    let x = p;
    // se cuenta hasta las cantidades «redondas»: 10 c, 50 c y 1 € (en dólares, hasta el siguiente quarter y el siguiente dólar)
    for (const m of H.moneyCfg.code === "USD" ? [25, 100] : [10, 50, 100]) if (x % m) { const y = Math.ceil(x / m) * m; J.push([x, y]); x = y; }
    if (x < pay) J.push([x, pay]);
    return Object.assign({ q: S.m4.vu_q(eu(p), pay / 100), kind: "num", ans: (pay - p) / 100, sol: T.vu_s(J.map(([u, v]) => [eu(u), eu(v), v - u, eu(v - u)]), eu(pay - p), eu(pay), eu(p)) }, money(pay - p));
  }
  const p = c5(300, 1200), n = R.int(2, 9); return Object.assign({ q: S.m4.ud_q(n, eu(p)), kind: "num", ans: n * p / 100, sol: T.ud_s(n, eu2(p), p, H.n(n * p), Math.floor(n * p / 100), n * p % 100, eu(n * p)) }, money(n * p));
});

// ═════ Unidad 6 · Medida ═════
const LU = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
function conv(units, R, S, H, base) {
  let i, j; do { i = R.int(0, units.length - 1); j = R.int(0, units.length - 1); } while (i === j || Math.abs(i - j) > 3);
  const f = 10 ** Math.abs(i - j), v = R.int(1, 99) * (i > j ? f : 1) / (R.r() < 0.2 && i < j ? 10 : 1);
  const r = i < j ? rd(v * f, 6) : rd(v / f, 6);
  return { q: S.m4.cv_q(H.dec(v), units[i], units[j]), kind: "num", ans: r, sol: S.m4.cv_s(units[i], units[j], H.n(f), i < j, H.dec(v), H.dec(r)) };
}
def("m4.longitud", (R, S, H) => conv(LU, R, S, H));
def("m4.masacap", (R, S, H) => R.r() < 0.5 ? conv(["kg", "hg", "dag", "g", "dg", "cg", "mg"], R, S, H) : conv(["kL", "hL", "daL", "L", "dL", "cL", "mL"], R, S, H));
// Mates 4 (m4.longitud y m4.masacap siguen para Mates 5, 6 y 7): sin decimales (multiplicarlos por 10, 100 o 1000
// es de 5.º), sobre todo con las unidades más usadas, medidas con dos unidades y la solución contando peldaños
const LM = ["kg", "hg", "dag", "g", "dg", "cg", "mg"], LC = ["kL", "hL", "daL", "L", "dL", "cL", "mL"];
function conv4(R, S, H, L, common) {   // common: pares [i, j] de la escalera (i, la unidad mayor)
  let i, j;
  if (R.r() < 0.8) [i, j] = R.pick(common); else do { i = R.int(0, 6); j = R.int(0, 6); } while (i >= j || j - i > 3);
  const down = R.r() < 0.5, k = j - i, f = 10 ** k, from = down ? L[i] : L[j], to = down ? L[j] : L[i];
  const v = down ? R.int(1, 99) : R.int(1, 99) * f, r = down ? v * f : v / f;
  const chain = (down ? L.slice(i, j + 1) : L.slice(i, j + 1).reverse()).join(" → ");
  return { q: S.m4.cv_q(H.n(v), from, to), kind: "int", ans: r, sol: S.m4.cv4_s(from, to, k, down, chain, H.n(f), H.n(v), H.n(r)) };
}
function dos4(R, S, H, pairs) {   // [mayor, menor, factor, máximo de la menor]
  const [big, small, f, bmax] = R.pick(pairs), a = R.int(1, 9), b = R.int(1, bmax);
  return { q: S.m4.dos_q(a, big, b, small), kind: "int", ans: a * f + b, sol: S.m4.dos_s(a, big, b, small, H.n(f), H.n(a * f), H.n(a * f + b)) };
}

function partir4(R, S, H, opts) {   // escribir con dos unidades: 4500 m = 4 km y 500 m
  const [big, small, f] = R.pick(opts); let n; do n = R.int(f + 1, 9 * f + f - 1); while (n % f === 0);
  return { q: S.m4.par_q(H.n(n), small, big), kind: "fields", fields: [{ label: big, ans: Math.floor(n / f) }, { label: small, ans: n % f }], sol: S.m4.par_s(H.n(n), small, big, H.n(f), Math.floor(n / f), H.n(Math.floor(n / f) * f), H.n(n % f)) };
}
def("m4.convlong", (R, S, H) => { const x = R.r(); return x < 0.6 ? conv4(R, S, H, LU, [[0, 3], [3, 5], [5, 6], [3, 6], [3, 4], [4, 5]]) : x < 0.85 ? dos4(R, S, H, [["km", "m", 1000, 999], ["m", "cm", 100, 99], ["cm", "mm", 10, 9]]) : partir4(R, S, H, [["km", "m", 1000], ["m", "cm", 100], ["cm", "mm", 10]]); });
def("m4.convmasa", (R, S, H) => {
  const masa = R.r() < 0.5, x = R.r();
  if (masa && x < 0.15) { const a = R.int(2, 40), down = R.r() < 0.5; return down ? { q: S.m4.cv_q(a, "t", "kg"), kind: "int", ans: a * 1000, sol: S.m4.tkg_s(true, a, H.n(a * 1000)) } : { q: S.m4.cv_q(H.n(a * 1000), "kg", "t"), kind: "int", ans: a, sol: S.m4.tkg_s(false, a, H.n(a * 1000)) }; }
  if (x < 0.55) return masa ? conv4(R, S, H, LM, [[0, 3]]) : conv4(R, S, H, LC, [[3, 6], [3, 5], [5, 6], [3, 4]]);
  if (x < 0.68) return partir4(R, S, H, masa ? [["kg", "g", 1000]] : [["L", "mL", 1000]]);
  if (!masa && x < 0.8) {   // problema: ¿cuántos vasos se llenan?
    const v = R.pick([100, 125, 200, 250, 500]), l = R.int(1, 3), [rec] = R.pick(S.m4.recip);
    return { q: S.m4.vasos_q(rec, l, v), kind: "int", ans: l * 1000 / v, sol: S.m4.vasos_s(l, H.n(l * 1000), v, l * 1000 / v) };
  }
  return dos4(R, S, H, masa ? [["kg", "g", 1000, 999], ["t", "kg", 1000, 999]] : [["L", "mL", 1000, 999], ["L", "cL", 100, 99]]);
});
def("m4.tiempo", (R, S) => {
  const k = R.int(0, 3);
  if (k === 0) { const h = R.int(1, 9), m = R.int(0, 59); return { q: S.m4.tmin_q(h, m), kind: "int", ans: h * 60 + m, sol: S.m4.tmin_s(h, m, h * 60 + m) }; }
  if (k === 1) { const m = R.int(2, 15), s = R.int(0, 59); return { q: S.m4.tseg_q(m, s), kind: "int", ans: m * 60 + s, sol: S.m4.tseg_s(m, s, m * 60 + s) }; }
  if (k === 2) { const t = R.int(61, 600); return { q: S.m4.thm_q(t), kind: "fields", fields: [{ label: S.m4.hm_f[0], ans: Math.floor(t / 60) }, { label: S.m4.hm_f[1], ans: t % 60 }], sol: S.m4.thm_s(t, Math.floor(t / 60), t % 60) }; }
  const h1 = R.int(7, 18), m1 = R.int(0, 11) * 5, h2 = R.int(h1 + 1, 22), m2 = R.int(0, 11) * 5, d = h2 * 60 + m2 - h1 * 60 - m1;   // minutos de 5 en 5, como en la lección
  return { q: S.m4.tdur_q(h1, m1, h2, m2), kind: "fields", fields: [{ label: S.m4.hm_f[0], ans: Math.floor(d / 60) }, { label: S.m4.hm_f[1], ans: d % 60 }], sol: S.m4.tdur_s(Math.floor(d / 60), d % 60, h1, m1, h2, m2) };
});

// ═════ Unidad 7 · Geometría ═════
def("m4.angulos", (R, S) => {
  const k = R.int(0, 2);
  if (k === 0) { const deg = R.pick([R.int(5, 85), 90, R.int(95, 175), 180]), t = deg < 90 ? 0 : deg === 90 ? 1 : deg < 180 ? 2 : 3; return { q: S.m4.ang_q(deg), kind: "choice", opts: S.m4.ang_o, correct: t, shuffle: false, sol: S.m4.ang_s[t](deg) }; }
  if (k === 1) { const a = R.int(10, 80); return { q: S.m4.comp_q(a), kind: "int", ans: 90 - a, sol: S.m4.comp_s(a, 90 - a) }; }
  const a = R.int(10, 170); return { q: S.m4.supl_q(a), kind: "int", ans: 180 - a, sol: S.m4.supl_s(a, 180 - a) };
});
def("m4.triangulos", (R, S) => {
  const x = R.r();
  if (x < 0.35) {   // según sus lados
    const t = R.int(0, 2); let L;
    if (t === 0) { const a = R.int(3, 12); L = [a, a, a]; }
    else if (t === 1) { const a = R.int(3, 12); let c; do c = R.int(2, 2 * a - 1); while (c === a); L = R.shuffle([a, a, c]); }
    else { let a, b, c; do { [a, b, c] = [R.int(2, 12), R.int(2, 12), R.int(2, 12)].sort((p, q) => p - q); } while (a === b || b === c || a + b <= c); L = R.shuffle([a, b, c]); }
    return { q: S.m4.trl_q(L.map(v => v + " cm")), kind: "choice", opts: S.m4.trl_o, correct: t, shuffle: false, sol: S.m4.trl_s[t](L) };
  }
  if (x < 0.65) { let a, b; do { a = R.int(20, 120); b = R.int(20, 120); } while (a + b >= 170); return { q: S.m4.tri3_q(a, b), kind: "int", ans: 180 - a - b, sol: S.m4.tri3_s(a, b, 180 - a - b) }; }
  const k = R.int(0, 2);
  let A;
  if (k === 0) { do { A = [R.int(35, 85), R.int(35, 85)]; } while (180 - A[0] - A[1] >= 90 || 180 - A[0] - A[1] <= 0); }
  else if (k === 1) { const a = R.int(20, 70); A = [90, a]; }
  else { const a = R.int(95, 140); A = [a, R.int(10, 170 - a)]; }
  A.push(180 - A[0] - A[1]);
  A = R.shuffle(A);
  return { q: S.m4.tri_q(A.map(v => v + "°").join(", ")), kind: "choice", opts: S.m4.tri_o, correct: k, shuffle: false, sol: S.m4.tri_s[k] };
});
function quad(k) {
  const P = [[[20, 20], [100, 20], [100, 100], [20, 100]], [[10, 30], [150, 30], [150, 90], [10, 90]], [[80, 10], [140, 60], [80, 110], [20, 60]], [[40, 25], [150, 25], [120, 95], [10, 95]], [[45, 25], [115, 25], [150, 95], [10, 95]], [[30, 25], [140, 15], [120, 100], [20, 85]]][k];
  return SVG.svg(160, 120, `<polygon points="${P.map(p => p.join(",")).join(" ")}" fill="#fef6e7" stroke="${C.dark}" stroke-width="2"/>`);
}
def("m4.cuadri", (R, S) => {
  const k = R.int(0, 5);
  if (R.r() < 0.7) return { q: S.m4.cu_q + "<br>" + quad(k), kind: "choice", opts: S.m4.cu_o, correct: k, shuffle: false, sol: S.m4.cu_s[k] };
  const t = k < 4 ? 0 : k === 4 ? 1 : 2;
  return { q: S.m4.cu2_q + "<br>" + quad(k), kind: "choice", opts: S.m4.cu2_o, correct: t, shuffle: false, sol: S.m4.cu2_s[t] };
});
def("m4.area", (R, S) => {
  const u = 20;
  if (R.r() < 0.5) {
    const w = R.int(2, 8), h = R.int(2, 5), cut = R.r() < 0.5 ? [R.int(1, w - 1), R.int(1, h - 1)] : null;
    let b = "", n = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const on = !cut || !(x >= w - cut[0] && y < cut[1]);
      if (on) n++;
      b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${on ? "#cfe0ff" : "#fff"}" stroke="${C.grey}"/>`;
    }
    return { q: S.m4.ar_q + "<br>" + SVG.svg(12 + w * u, 12 + h * u, b), kind: "int", ans: n, sol: S.m4.ar_s(n, cut ? null : `${w} ${X} ${h}`) };
  }
  const l = R.int(3, 25), w = R.int(2, 15);
  return { q: S.m4.arr_q(l, w), kind: "int", ans: l * w, sol: S.m4.arr_s(l, w, l * w) };
});
// [nombre, caras, vértices, aristas, tipo, lados de la base]: la solución cuenta como la lección (base y cúspide, dos bases…)
// (el nombre es el índice de S.m4.cp_nom: cubo, prisma triangular, prisma cuadrangular, pirámide cuadrangular, pirámide
// triangular, prisma hexagonal, pirámide hexagonal)
const BODIES = [[0, 6, 8, 12, "cubo", 4], [1, 5, 6, 9, "prisma", 3], [2, 6, 8, 12, "prisma", 4], [3, 5, 5, 8, "piramide", 4], [4, 4, 4, 6, "piramide", 3], [5, 8, 12, 18, "prisma", 6], [6, 7, 7, 12, "piramide", 6]];
def("m4.cuerpos", (R, S) => {
  if (R.r() < 0.6) { const [ni, c, ve, ar, tipo, nb] = R.pick(BODIES), name = S.m4.cp_nom[ni], v = [c, ve, ar], k = R.int(0, 2); return { q: S.m4.cp_q(S.m4.cp_w[k], name), kind: "int", ans: v[k], sol: S.m4.cp_s2(name, k, tipo, nb, v) }; }
  const k = R.int(0, 5), sol = ["cube", "prism", "pyramid", "sphere", "cylinder", "cone"][k];
  return { q: S.m4.cr_q + "<br>" + SVG.solid(sol), kind: "choice", opts: S.m4.cr_o, correct: k < 3 ? 0 : 1, shuffle: false, sol: S.m4.cr_s[k < 3 ? 0 : 1] };
});

// ═════ Unidad 8 · Estadística y probabilidad ═════
def("m4.frecuencias", (R, S) => {
  const opts = R.shuffle(S.m4.colores).slice(0, 4), n = R.int(12, 20);
  const data = Array.from({ length: n }, () => R.pick(opts)), k = R.int(0, 1);
  if (k === 0) { const c = R.pick(opts), f = data.filter(x => x === c).length; return { q: S.m4.fr_q(data.join(", "), c), kind: "int", ans: f, sol: S.m4.fr_s(c, f) }; }
  const counts = opts.map(c => data.filter(x => x === c).length), mx = Math.max(...counts);
  if (counts.filter(x => x === mx).length > 1) return { q: S.m4.frt_q(data.join(", ")), kind: "int", ans: n, sol: S.m4.frt_s(n) };
  return { q: S.m4.moda_q(data.join(", ")), kind: "choice", opts, correct: counts.indexOf(mx), shuffle: false, sol: S.m4.moda_s(opts[counts.indexOf(mx)], mx) };
});
def("m4.media", (R, S) => {
  // datos dentro del rango propio de cada magnitud (notas de 0 a 10, goles de 0 a 6…) y media exacta
  const [ctx, lo, hi] = R.pick(S.m4.media_ctx), n = R.int(3, 6);
  let xs, m;
  do { xs = Array.from({ length: n }, () => R.int(lo, hi)); m = xs.reduce((a, b) => a + b, 0) / n; } while (!Number.isInteger(m) || new Set(xs).size < 2);
  return { q: S.m4.media_q(ctx, xs.join(", ")), kind: "int", ans: m, sol: S.m4.media_s(xs.join(" + "), m * n, n, m) };
});
function ruleta(n, c) {
  let b = ""; for (let i = 0; i < n; i++) { const a0 = i / n * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / n * 2 * Math.PI - Math.PI / 2; b += `<path d="M60,60 L${60 + 50 * Math.cos(a0)},${60 + 50 * Math.sin(a0)} A50,50 0 0,1 ${60 + 50 * Math.cos(a1)},${60 + 50 * Math.sin(a1)} Z" fill="${i < c ? C.red : C.light}" stroke="${C.dark}" stroke-width="1.5"/>`; }
  b += `<polygon points="60,4 54,16 66,16" fill="${C.dark}"/>`;
  return SVG.svg(120, 120, b);
}
def("m4.probjuego", (R, S) => {   // Mates 5 (con «múltiplo» y «casos favorables», como su lección)
  const k = R.int(0, 2);
  if (k === 0) { const [desc, fav] = R.pick(S.m4.dado); return { q: S.m4.pd_q(desc), kind: "frac", ans: [fav, 6], hint: S.m4.frac_hint, sol: S.m4.pdj_s(fav, 6) }; }
  if (k === 1) { const r = R.int(1, 6), a = R.int(1, 6), v = R.int(0, 5), t = r + a + v; return { q: S.m4.pb_q(r, a, v), kind: "frac", ans: [r, t], hint: S.m4.frac_hint, sol: S.m4.pdj_s(r, t) }; }
  const n = R.pick([4, 5, 6, 8]), c = R.int(1, n - 1);
  return { q: S.m4.rul_q + "<br>" + ruleta(n, c), kind: "frac", ans: [c, n], hint: S.m4.frac_hint, sol: S.m4.pdj_s(c, n) };
});
def("m4.probfrac", (R, S) => {    // Mates 4: sin «múltiplo», con «casos a favor» y diciendo cuáles son
  const T = S.m4.PF, k = R.int(0, 2);
  if (k === 0) { const [desc, caras] = R.pick(T.dado); return { q: S.m4.pd_q(desc), kind: "frac", ans: [caras.length, 6], hint: S.m4.frac_hint, sol: T.dado_s(caras) }; }
  if (k === 1) { const r = R.int(1, 6), a = R.int(1, 6), v = R.int(0, 5), t = r + a + v; return { q: S.m4.pb_q(r, a, v), kind: "frac", ans: [r, t], hint: S.m4.frac_hint, sol: T.bolsa_s(r, a, v, t) }; }
  const n = R.pick([4, 5, 6, 8]), c = R.int(1, n - 1);
  return { q: S.m4.rul_q + "<br>" + ruleta(n, c), kind: "frac", ans: [c, n], hint: S.m4.frac_hint, sol: T.rul_s(c, n) };
});
// ═════ El calendario, figuras circulares, coordenadas y escalas (generadores añadidos) ═════
const cap4 = s => s.charAt(0).toUpperCase() + s.slice(1);
const f1 = v => +v.toFixed(1);
// Opciones sin repetir: la buena y las de "cands" (hasta n), barajadas
function opt4(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ── El calendario ──
const mLen = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const fDay = (y, m) => (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;   // 0 = lunes
const leap = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
function calSheet(y, m, T, mark) {   // hoja de un mes; mark = día rodeado
  // la semana empieza en T.inicio (0 = lunes, como en España; 6 = domingo, como en EE. UU.); sábado y domingo, en rojo
  const s0 = T.inicio || 0, f = (fDay(y, m) - s0 + 7) % 7, n = mLen(y, m), rows = Math.ceil((f + n) / 7), cw = 34, ch = 24, wk = c => (c + s0) % 7 >= 5;
  let b = `<rect x="4" y="4" width="${7 * cw}" height="${46 + rows * ch}" fill="#fff" stroke="${C.grey}"/><rect x="4" y="4" width="${7 * cw}" height="24" fill="${C.blue}"/>` + SVG.txt(4 + 3.5 * cw, 21, `${cap4(T.meses[m])} ${y}`, 14, "#fff", "middle", "bold");
  for (let i = 0; i < 7; i++) b += SVG.txt(4 + i * cw + cw / 2, 44, T.letras[(i + s0) % 7], 12, wk(i) ? C.red : C.dark, "middle", "bold");
  for (let d = 1; d <= n; d++) {
    const i = f + d - 1, c = i % 7, r = Math.floor(i / 7), x = 4 + c * cw, y0 = 50 + r * ch;
    if (d === mark) b += `<circle cx="${x + cw / 2}" cy="${y0 + 11}" r="11" fill="none" stroke="${C.red}" stroke-width="2"/>`;
    b += SVG.txt(x + cw / 2, y0 + 16, d, 12, wk(c) ? C.red : C.dark);
  }
  return SVG.svg(8 + 7 * cw, 54 + rows * ch, b);
}
def("m4.calendario", (R, S) => {
  const T = S.m4.CL, D = T.dias, k = R.pick([0, 1, 1, 1, 2, 3, 4, 4, 5]);   // más peso a lo nuevo de 4.º: días entre fechas y días de un trimestre
  if (k === 0) {   // dentro de n días
    const w = R.int(0, 6), n = R.int(8, 40), w2 = (w + n) % 7, { opts, correct } = opt4(R, cap4(D[w2]), [D[(w2 + 6) % 7], D[(w2 + 1) % 7], D[(w2 + 2) % 7]].map(cap4));
    return { q: T.dentro_q(D[w], n), kind: "choice", opts, correct, sol: T.dentro_s(D[w], n, Math.floor(n / 7), n % 7, D[w2]) };
  }
  if (k === 1) {   // días entre dos fechas de meses seguidos
    const y = R.pick([2026, 2027, 2028]), m = R.int(0, 11), L = mLen(y, m), d1 = R.int(L - 15, L - 1), m2 = (m + 1) % 12, d2 = R.int(1, 20);
    if (R.r() < 0.4) {   // con un mes entero en medio: del 20 de octubre al 5 de diciembre
      const y2 = m === 11 ? y + 1 : y, L2 = mLen(y2, m2), m3 = (m + 2) % 12;
      return { q: T.entre_q(d1, T.meses[m], d2, T.meses[m3], y, m === 1 || m2 === 1), kind: "int", ans: L - d1 + L2 + d2, sol: T.entre2_s(T.meses[m], L, d1, T.meses[m2], L2, m2 === 1 ? leap(y2) : null, d2, T.meses[m3], m === 1 ? leap(y) : null) };
    }
    return { q: T.entre_q(d1, T.meses[m], d2, T.meses[m2], y, m === 1), kind: "int", ans: L - d1 + d2, sol: T.entre_s(T.meses[m], L, d1, d2, T.meses[m2], m === 1 && leap(y)) };
  }
  if (k === 2) {   // años bisiestos
    const yl = 2004 + 4 * R.int(0, 11);
    if (R.r() < 0.5) {
      const others = R.shuffle([yl - 1, yl + 1, yl + 2, yl - 2, yl + 3, yl - 3]).slice(0, 3), { opts, correct } = opt4(R, String(yl), others.map(String));
      return { q: T.bis_q, kind: "choice", opts, correct, sol: T.bis_s(yl) };
    }
    const y = R.r() < 0.5 ? yl : yl + R.int(1, 3);
    const lp = y - y % 4;
    return { q: T.sera_q(y), kind: "choice", opts: T.sino, correct: leap(y) ? 0 : 1, shuffle: false, sol: T.sera_s(y, leap(y), [lp - 4, lp, lp + 4].join(", ")) };
  }
  if (k === 3) {   // trimestres, semestres, quincenas, décadas y siglos
    const v = R.int(0, 5), n = R.int(2, 6);
    const qa = [[T.trim_q(n), 3 * n, T.trim_s(n)], [T.sem_q(n), 6 * n, T.sem_s(n)], [T.quin_q(n), 15 * n, T.quin_s(n)], [T.medio_q(n), 12 * n + 6, T.medio_s(n)], [T.dec_q(n), 10 * n, T.dec_s(n)], [T.sig_q(n), 100 * n, T.sig_s(n)]][v];
    return { q: qa[0], kind: "int", ans: qa[1], sol: qa[2] };
  }
  if (k === 4) {   // los días de un trimestre
    const y = R.int(2025, 2029), t = R.int(0, 3), ms = [3 * t, 3 * t + 1, 3 * t + 2], ds = ms.map(m => mLen(y, m)), tot = ds.reduce((a, b) => a + b, 0);
    return { q: T.trimd_q(T.ordT[t], y), kind: "int", ans: tot, sol: T.trimd_s(ms.map(m => T.meses[m]), ds, tot, t === 0 ? leap(y) : null, y) };
  }
  // la hoja del mes: sumar 7 te lleva al mismo día de la semana
  const y = R.int(2025, 2028), m = R.int(0, 11), n = mLen(y, m), f = fDay(y, m), d = R.int(1, n - 7), w = (f + d - 1) % 7;
  if (R.r() < 0.5) {
    const add = R.pick([7, 14, 21].filter(a => d + a <= n)), d2 = d + add;
    return { q: T.hoja_q(d, D[w], d2, T.meses[m]) + "<br>" + calSheet(y, m, T, d), kind: "choice", opts: D.map(cap4), correct: w, shuffle: false, sol: T.hoja_s(d, d2, add, D[w]) };
  }
  const later = [d + 7, d + 14, d + 21].filter(x => x <= n);
  return { q: T.cuantos_q(d, D[w], T.meses[m], y), kind: "int", ans: 1 + later.length + Math.floor((d - 1) / 7), sol: T.cuantos_s(D[w], [...Array.from({ length: Math.floor((d - 1) / 7) }, (_, i) => d - 7 * (Math.floor((d - 1) / 7) - i)), d, ...later].join(", "), 1 + later.length + Math.floor((d - 1) / 7), n) };
});

// ── Figuras circulares ──
// el dibujo: circunferencia de centro O; en rojo, el elemento por el que se pregunta
function circ(kind, R) {   // 0 radio · 1 diámetro · 2 cuerda · 3 arco · 4 semicírculo · 5 sector
  const cx = 90, cy = 88, r = 70, P = a => [f1(cx + r * Math.cos(a)), f1(cy + r * Math.sin(a))], red = `stroke="${C.red}" stroke-width="4" stroke-linecap="round"`;
  const a0 = R.r() * 2 * Math.PI;
  let b = "";
  if (kind === 4) { const [x1, y1] = P(a0), [x2, y2] = P(a0 + Math.PI); b = `<path d="M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z" fill="#f4a3a3" stroke="${C.red}" stroke-width="2"/>`; }
  if (kind === 5) { const t = R.pick([45, 60, 90, 120]) * Math.PI / 180, [x1, y1] = P(a0), [x2, y2] = P(a0 + t); b = `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z" fill="#f4a3a3" stroke="${C.red}" stroke-width="2"/>`; }
  b += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.dark}" stroke-width="2"/>`;
  if (kind === 0) { const [x, y] = P(a0); b += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" ${red}/>`; }
  if (kind === 1) { const [x1, y1] = P(a0), [x2, y2] = P(a0 + Math.PI); b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>`; }
  if (kind === 2) { const [x1, y1] = P(a0), [x2, y2] = P(a0 + R.pick([1.4, 1.8, 2.2, 2.5])); b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>`; }
  if (kind === 3) { const [x1, y1] = P(a0), [x2, y2] = P(a0 + R.pick([1, 1.4, 1.8])); b += `<path d="M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}" fill="none" ${red}/>`; }
  b += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${C.dark}"/>` + SVG.txt(cx + 9, cy - 6, "O", 13, C.dark, "start", "bold");
  return SVG.svg(180, 176, b);
}
const PARTS = [[2, 180], [3, 120], [4, 90], [5, 72], [6, 60], [8, 45], [10, 36], [12, 30]];
def("m4.circulares", (R, S) => {
  const T = S.m4.CI, k = R.int(0, 4);
  if (k === 0) {   // ¿cómo se llama lo que está en rojo?
    const kind = R.int(0, 5);
    if (kind < 4) return { q: T.nombre_q + "<br>" + circ(kind, R), kind: "choice", opts: T.lineas, correct: kind, shuffle: false, sol: T.nombre_s[kind] };
    return { q: T.nombre_q + "<br>" + circ(kind, R), kind: "choice", opts: T.figuras, correct: kind - 4, shuffle: false, sol: T.nombre_s[kind] };
  }
  if (k === 1) { const [n] = R.pick(PARTS.slice(0, -1).concat([[9, 40]])), what = R.pick(T.cosas); return { q: T.partes_q(what, n), kind: "int", ans: 360 / n, sol: T.partes_s(n, 360 / n) }; }   // n partes iguales
  if (k === 2) {   // ¿qué parte del círculo es?
    const i = R.int(0, PARTS.length - 1), [n, a] = PARTS[i], good = T.parte(n);
    const { opts, correct } = opt4(R, good, R.shuffle(PARTS.filter((_, j) => j !== i)).map(([m]) => T.parte(m)));
    return { q: T.cual_q(a), kind: "choice", opts, correct, sol: T.cual_s(a, n, good.toLowerCase()) };
  }
  if (k === 3) {   // la cuerda más larga
    if (R.r() < 0.5) { const r = R.int(2, 25); return { q: T.cuerda_q(r), kind: "int", ans: 2 * r, sol: T.cuerda_s(r) }; }
    const d = R.int(4, 20), x = R.r() < 0.5 ? R.int(1, d - 1) : R.int(d + 1, d + 6);
    return { q: T.puede_q(d, x), kind: "choice", opts: T.puede_o, correct: x < d ? 0 : 1, shuffle: false, sol: T.puede_s(d, x) };
  }
  const [n, a] = R.pick(PARTS);   // ¿cuántas porciones?
  return { q: T.cuantas_q(a), kind: "int", ans: n, sol: T.cuantas_s(a, n) };
});

// ── Coordenadas en la cuadrícula ──
function coordIcon(k, x, y) {   // 0 fuente · 1 quiosco · 2 tesoro · 3 árbol · 4 banco
  if (k === 0) return `<circle cx="${x}" cy="${y}" r="9" fill="#9ccbee" stroke="${C.blue}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="2.5" fill="#fff"/>`;
  if (k === 1) return `<rect x="${x - 8}" y="${y - 4}" width="16" height="12" fill="#f2d16b" stroke="${C.dark}"/><path d="M${x - 11},${y - 3} L${x},${y - 12} L${x + 11},${y - 3} Z" fill="${C.purple}" stroke="${C.dark}"/>`;
  if (k === 2) return `<path d="M${x - 8},${y - 8} L${x + 8},${y + 8} M${x + 8},${y - 8} L${x - 8},${y + 8}" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>`;
  if (k === 3) return `<rect x="${x - 2}" y="${y}" width="4" height="9" fill="#8a5a33"/><circle cx="${x}" cy="${y - 4}" r="8" fill="${C.green}" stroke="${C.dark}"/>`;
  return `<rect x="${x - 10}" y="${y - 3}" width="20" height="5" fill="#b07a4a" stroke="${C.dark}"/><line x1="${x - 8}" y1="${y + 2}" x2="${x - 8}" y2="${y + 8}" stroke="${C.dark}" stroke-width="2"/><line x1="${x + 8}" y1="${y + 2}" x2="${x + 8}" y2="${y + 8}" stroke="${C.dark}" stroke-width="2"/>`;
}
const CW = 8, CH = 6, CZ = 34;
function coordSvg(places, names) {
  const x0 = 30, y0 = 12, X = v => x0 + v * CZ, Y = v => y0 + (CH - v) * CZ;
  let b = `<rect x="${x0}" y="${y0}" width="${CW * CZ}" height="${CH * CZ}" fill="#eef5e6"/>`;
  for (let i = 0; i <= CW; i++) b += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(CH)}" stroke="${i ? "#c9d3c0" : C.dark}" stroke-width="${i ? 1 : 2}"/>` + SVG.txt(X(i), Y(0) + 17, i, 12, C.dark);
  for (let j = 0; j <= CH; j++) b += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(CW)}" y2="${Y(j)}" stroke="${j ? "#c9d3c0" : C.dark}" stroke-width="${j ? 1 : 2}"/>` + SVG.txt(X(0) - 11, Y(j) + 4, j, 12, C.dark);
  places.forEach(p => { b += coordIcon(p.k, X(p.x), Y(p.y)); });
  const lx = X(CW) + 18;
  places.slice().sort((p, q) => p.k - q.k).forEach((p, i) => { b += coordIcon(p.k, lx + 10, y0 + 18 + i * 34) + SVG.txt(lx + 26, y0 + 23 + i * 34, names[p.k], 12, C.dark, "start"); });
  return SVG.svg(lx + 110, Y(0) + 26, b);
}
const pt = (x, y) => `(${x}, ${y})`;
def("m4.coordenadas", (R, S) => {
  const T = S.m4.CO, k = R.int(0, 2);
  if (k === 2) {   // moverse desde un punto
    const x = R.int(0, 4), y = R.int(0, 3), p = R.int(1, CW - x), q = R.int(1, CH - y), from0 = R.r() < 0.4, sx = from0 ? 0 : x, sy = from0 ? 0 : y;
    const ex = sx + p, ey = sy + q;
    if (ex > CW || ey > CH) return { q: T.mueve_q(0, 0, p, q), kind: "choice", ...opt4(R, pt(p, q), [pt(q, p), pt(p, p), pt(p + q, 0)].filter(s => s !== pt(p, q))), sol: T.mueve_s(0, 0, p, q, p, q) };
    const { opts, correct } = opt4(R, pt(ex, ey), [pt(ey, ex), pt(sx + q, sy + p), pt(ex, sy), pt(sx, ey), pt(ex + 1, ey)]);
    return { q: T.mueve_q(sx, sy, p, q), kind: "choice", opts, correct, sol: T.mueve_s(sx, sy, p, q, ex, ey) };
  }
  // un plano con 4 sitios en cruces de la cuadrícula
  let pl;
  do {
    const ks = R.shuffle([0, 1, 2, 3, 4]).slice(0, 4), used = new Set();
    pl = ks.map(kk => { let x, y; do { x = R.int(1, CW); y = R.int(1, CH); } while (used.has(x + "," + y)); used.add(x + "," + y); return { k: kk, x, y }; });
  } while (!pl.some(p => p.x !== p.y && p.y <= CW && p.x <= CH));
  const cands = pl.filter(p => p.x !== p.y), p = R.pick(cands);
  if (k === 0) {   // ¿cuáles son sus coordenadas?
    const { opts, correct } = opt4(R, pt(p.x, p.y), [p.y <= CW && p.x <= CH ? pt(p.y, p.x) : pt(p.x, p.y + 1), pt(p.x, p.y > 0 ? p.y - 1 : p.y + 1), pt(p.x < CW ? p.x + 1 : p.x - 1, p.y), pt(p.x + 1, p.y + 1)]);
    return { q: T.coord_q(T.sitios[p.k]) + "<br>" + coordSvg(pl, T.sitios), kind: "choice", opts, correct, sol: T.coord_s(T.sitios[p.k], p.x, p.y) };
  }
  return { q: T.hay_q(pt(p.x, p.y)) + "<br>" + coordSvg(pl, T.sitios), kind: "choice", opts: pl.map(x => cap4(T.sitios[x.k])), correct: pl.indexOf(p), shuffle: false, sol: T.hay_s(p.x, p.y, T.sitios[p.k]) };
});

// ── Planos a escala ──
const SCALES = [50, 100, 200, 250, 500];
function escSvg(T, h, v, val, a, b) {   // camino de a a b: h cuadritos en horizontal y v en vertical; escala gráfica debajo
  const W = 10, Hh = 6, z = 26, x0 = 10, y0 = 10, P = (c, r) => [x0 + c * z, y0 + r * z];
  let s = `<rect x="${x0}" y="${y0}" width="${W * z}" height="${Hh * z}" fill="#f3f1ea"/>`;
  for (let c = 0; c <= W; c++) s += `<line x1="${x0 + c * z}" y1="${y0}" x2="${x0 + c * z}" y2="${y0 + Hh * z}" stroke="#cfcab8"/>`;
  for (let r = 0; r <= Hh; r++) s += `<line x1="${x0}" y1="${y0 + r * z}" x2="${x0 + W * z}" y2="${y0 + r * z}" stroke="#cfcab8"/>`;
  const [ax, ay] = P(a[0], a[1]), [cx, cy] = P(a[0] + h, a[1]), [bx, by] = P(a[0] + h, a[1] - v);
  s += `<polyline points="${ax},${ay} ${cx},${cy} ${bx},${by}" fill="none" stroke="${C.red}" stroke-width="4" stroke-linejoin="round"/>`;
  s += `<circle cx="${ax}" cy="${ay}" r="7" fill="${C.blue}" stroke="#fff" stroke-width="2"/><circle cx="${bx}" cy="${by}" r="7" fill="${C.green}" stroke="#fff" stroke-width="2"/>`;
  s += SVG.txt(ax, ay + (ay > y0 + Hh * z - 20 ? -12 : 22), a[2], 12, C.blue, "middle", "bold") + SVG.txt(bx, by + (by < y0 + 20 ? 22 : -12), b, 12, C.green, "middle", "bold");
  const sy = y0 + Hh * z + 22;
  for (let i = 0; i < 3; i++) s += `<rect x="${x0 + i * z}" y="${sy}" width="${z}" height="8" fill="${i % 2 ? "#fff" : C.dark}" stroke="${C.dark}"/>` ;
  for (let i = 0; i <= 3; i++) s += SVG.txt(x0 + i * z, sy + 22, i * val, 11);
  s += SVG.txt(x0 + 3 * z + 14, sy + 8, T.metros, 11, C.dark, "start");
  return SVG.svg(x0 + W * z + 12, sy + 30, s);
}
def("m4.escala", (R, S, H) => {
  const T = S.m4.ES, k = R.int(0, 4);
  if (k === 0) {   // el camino por las calles del plano
    const val = R.pick(SCALES), h = R.int(1, 6), v = R.int(1, 4), ax = R.int(0, 10 - h), ay = R.int(v, 6), [na, nb] = R.shuffle(T.sitios).slice(0, 2);
    return { q: T.camino_q(na, nb) + "<br>" + escSvg(T, h, v, val, [ax, ay, na], nb), kind: "int", ans: (h + v) * val, sol: T.camino_s(val, h, v, H.n((h + v) * val)) };
  }
  if (k === 1) { const val = R.pick(SCALES), n = R.int(2, 12); return { q: T.calle_q(val, n), kind: "int", ans: n * val, sol: T.calle_s(n, val, H.n(n * val)) }; }   // cada cuadrito vale…
  if (k === 2) { const e = R.pick([2, 5, 10, 20, 25, 50]), d = R.int(2, 15), [p1, p2] = R.shuffle(T.pueblos).slice(0, 2); return { q: T.mapa_q(e, p1, p2, d), kind: "int", ans: d * e, sol: T.mapa_s(d, e) }; }   // 1 cm del mapa son e km
  if (k === 4) { const [val, paso] = R.pick([[100, 10], [200, 5], [250, 4], [500, 2]]), n = paso * R.int(1, Math.floor(16 / paso) || 1); return { q: T.km_q(val, n), kind: "int", ans: n * val / 1000, sol: T.km_s(n, val, H.n(n * val), n * val / 1000) }; }   // y en kilómetros
  const [w, mx] = R.pick(T.largos), e = R.pick([50, 100, 200, 500].filter(x => 2 * x <= mx)), cm = R.int(2, Math.min(12, Math.floor(mx / e)));   // de la realidad al plano
  return { q: T.plano_q(e, w, H.n(cm * e)), kind: "int", ans: cm, sol: T.plano_s(H.n(cm * e), e, cm) };
});
// ── fin: ═════ El calendario, figuras circulares, coordenadas y escalas (generadores añadidos) ═════
// ═════ Generadores propios de 4.º (ronda de mejoras) ═════
// Sustituyen en las lecciones de 4.º a los de cursos anteriores (m2.*, m3.*) y a los m4.* que también usan
// Mates 5, 6 y 7 (m4.millones, m4.valorpos, m4.aprox, m4.combinados, m4.equiv, m4.sumafr, m4.fracnum, m4.leerdec,
// m4.area, m4.frecuencias), que siguen igual para esos cursos.

// ── Unidad 1 ──
const zgrp = R => R.pick([R.int(0, 9), R.int(10, 99), R.int(1, 9) * 100 + R.int(1, 9), R.int(1, 9) * 100, R.int(1, 9) * 10, R.int(1, 9) * 100 + R.int(1, 9) * 10]);
function bigNum(R) {   // 6 o 7 cifras; algo más de la mitad, con grupos que llevan ceros («los ceros guardan el sitio»)
  const seven = R.r() < 0.55, z = R.r() < 0.55;
  const T = seven ? (z ? zgrp(R) : R.int(100, 999)) : (z ? R.int(1, 9) * 100 + R.pick([0, R.int(1, 9), R.int(1, 9) * 10]) : R.int(100, 999));
  return (seven ? R.int(1, 9) * 1e6 : 0) + T * 1000 + (z ? zgrp(R) : R.int(100, 999));
}
const groups = n => (n >= 1e6 ? [Math.floor(n / 1e6)] : []).concat([Math.floor(n / 1000) % 1000, n % 1000]);
const gtxt = n => groups(n).map((g, i) => i ? String(g).padStart(3, "0") : String(g)).join(" | ");
const fromGroups = g => g.reduce((a, x) => a * 1000 + x, 0);
// [nombre del grupo, cómo se dice (vacío si es 000), cifras]
const gparts = (n, T, L) => { const g = groups(n), nm = g.length === 3 ? T.gnom : T.gnom.slice(1); return g.map((x, i) => [nm[i], x ? L.words(x * 1000 ** (g.length - 1 - i)) : "", i ? String(x).padStart(3, "0") : String(x)]); };
def("m4.grandes", (R, S, H, L) => {
  const T = S.m4.GR, n = bigNum(R), k = R.int(0, 3);
  if (k === 0) {   // ¿cuánto vale la cifra…? (solo cifras que salen una vez)
    const s = String(n), ps = [];
    for (let p = 0; p < s.length; p++) { const d = digitAt(n, p); if (d && s.split(String(d)).length === 2) ps.push(p); }
    if (ps.length) { const p = R.pick(ps), d = digitAt(n, p), v = d * 10 ** p; return { q: S.m4.valor_q(H.n(n), d), kind: "int", ans: v, sol: T.valor_s(gtxt(n), d, S.m4.pos[p], H.n(v)) }; }
  }
  if (k <= 1) return { q: S.m4.letras_q(L.words(n)), kind: "int", ans: n, sol: T.escr_s(gparts(n, T, L), H.n(n)) };
  if (k === 2) {   // ¿cómo se lee? Los distractores tienen un cero de más o de menos en un grupo
    const g = groups(n), alt = new Set();
    g.forEach((x, i) => {
      const put = y => alt.add(fromGroups(g.map((v, j) => j === i ? y : v)));
      if (i === 0) { if (g.length === 3) put(x * 10); return; }
      if (x && x * 10 < 1000) put(x * 10);
      if (x && x % 10 === 0) put(x / 10);
      if (x && x * 100 < 1000) put(x * 100);
    });
    [n + 100000, n - 10000, n + 1000, n + 10000].forEach(y => alt.add(y));
    alt.delete(n);
    const cands = R.shuffle([...alt].filter(y => y > 99999 && y < 1e8)).sort((a, b) => (String(b).length === String(n).length) - (String(a).length === String(n).length) || 0);
    const opts = R.shuffle([n, ...cands.slice(0, 3)].map(y => L.words(y)));
    return { q: S.m4.letras2_q(H.n(n)), kind: "choice", opts, correct: opts.indexOf(L.words(n)), sol: T.leer_s(gtxt(n), gparts(n, T, L), L.words(n)) };
  }
  // comparar dos números grandes
  let a = n, b;
  if (R.r() < 0.3) b = n >= 1e6 ? R.pick([R.int(900000, 999999), R.int(100000, 999999)]) : R.int(1000000, 1099999);
  else {
    const g = groups(n), j = R.int(1, g.length - 1), x = g[j], ds = String(x).padStart(3, "0").split("");
    let y; do { y = R.r() < 0.6 ? +R.shuffle(ds.slice()).join("") : R.int(0, 999); } while (y === x);
    b = fromGroups(g.map((v, i) => i === j ? y : v));
  }
  if (R.r() < 0.5) [a, b] = [b, a];
  const cr = a > b ? 0 : 1, ga = groups(a), gb = groups(b);
  let sol;
  if (ga.length !== gb.length) sol = T.cmp1_s(H.n(a), String(a).length, H.n(b), String(b).length, cr);
  else { const j = ga.findIndex((v, i) => v !== gb[i]), nm = ga.length === 3 ? T.gnom : T.gnom.slice(1); sol = T.cmp2_s(String(a).length, ga.slice(0, j).map((v, i) => [nm[i], i ? String(v).padStart(3, "0") : v]), nm[j], j ? String(ga[j]).padStart(3, "0") : ga[j], j ? String(gb[j]).padStart(3, "0") : gb[j], H.n(a), H.n(b), cr); }
  return { q: T.cmp_q(H.n(a), H.n(b)), kind: "choice", opts: [">", "<", "="], correct: cr, shuffle: false, sol };
});
def("m4.ordenes", (R, S, H) => {
  const T = S.m4.OR, x = R.r();
  if (x < 0.35) {   // ¿cuántas centenas (decenas, millares) hay en total?
    const p = R.pick([1, 2, 2, 3]), bill = p < 3 && R.r() < 0.4, q = R.int(p === 3 ? 12 : 23, p === 3 || bill ? 999 : 9999), n = q * 10 ** p;
    return { q: bill ? T.bill_q(H.n(n), 10 ** p) : T.cuantas_q(T.ordp[p], H.n(n)), kind: "int", ans: q, sol: T.cuantas_s(T.ordp[p], T.tapa[p], q, "0".repeat(p), H.n(q), H.n(n), 10 ** p, bill) };
  }
  if (x < 0.6) {   // componer, con órdenes vacíos (6 cifras)
    let d; do { d = [R.int(1, 9)].concat(Array.from({ length: 5 }, () => R.r() < 0.45 ? 0 : R.int(1, 9))); } while (!d.includes(0));
    const n = +d.join(""), parts = d.map((v, i) => v * 10 ** (5 - i)).filter(Boolean);
    return { q: S.m4.desc_q(parts.map(H.n).join(" + ")), kind: "int", ans: n, sol: T.comp_s(d.map((v, i) => `${v} ${T.ab[5 - i]}`).join(", "), H.n(n)) };
  }
  if (x < 0.75) {   // ¿qué cifra ocupa…?
    const n = bigNum(R), p = R.pick([2, 3, 4, 5].filter(v => 10 ** v <= n)), d = digitAt(n, p);
    return { q: S.m4.desc2_q(H.n(n), S.m4.pos[p]), kind: "int", ans: d, sol: T.cifra_s(gtxt(n), S.m4.pos[p], d, H.n(d * 10 ** p)) };
  }
  // pasar de un orden a otro: 3 CM = 300 UM
  const [a, b] = R.pick([[5, 3], [5, 4], [4, 3], [4, 2], [3, 2], [3, 1], [6, 5], [6, 4], [5, 2]]), v = R.int(2, 9), f = 10 ** (a - b);
  const chain = Array.from({ length: a - b + 1 }, (_, i) => `${H.n(10 ** i)} ${i ? T.ab[a - i] : T.ab1[a]}`).join(" = ");
  return { q: T.conv_q(T.ordp[b], v, T.ordq[a]), kind: "int", ans: v * f, sol: T.conv_s(chain, v, T.abv[a], H.n(f), H.n(v * f), T.ab[b], a - b) };
});
def("m4.redondeo", (R, S, H) => {
  const T = S.m4.RD;
  if (R.r() < 0.25) {   // estimar redondeando
    const big = R.r() < 0.6, p = big ? 3 : 2, lo = big ? 1100 : 110, hi = big ? 9800 : 980, rnd = v => Math.round(v / 10 ** p) * 10 ** p, add = R.r() < 0.5;
    let a, b; do { a = R.int(lo, hi); b = R.int(lo, hi); } while (rnd(a) <= rnd(b) || rnd(a) === a || rnd(b) === b);
    const A = rnd(a), B = rnd(b);
    return { q: T.est_q(T.pos[p], `${H.n(a)} ${add ? "+" : "−"} ${H.n(b)}`), kind: "int", ans: add ? A + B : A - B,
      sol: T.est_s(H.n(a), H.n(A), digitAt(a, p - 1), H.n(b), H.n(B), digitAt(b, p - 1), add, H.n(add ? A + B : A - B), H.n(add ? a + b : a - b)) };
  }
  let p, n, r;
  do {
    p = R.pick([1, 2, 3, 3, 4, 5]);
    n = R.int(10 ** (p + 1), Math.min(9999999, 10 ** (p + 3) - 1));
    if (R.r() < 0.3) { n += (9 - digitAt(n, p)) * 10 ** p; n += (R.int(5, 9) - digitAt(n, p - 1)) * 10 ** (p - 1); }   // un 9 que sube
    if (n % 10 ** p === 0) n += R.int(1, 9) * 10 ** (p - 1);   // que no sea ya redondo
    r = Math.round(n / 10 ** p) * 10 ** p;
  } while (r >= 1e7);
  const look = digitAt(n, p - 1), up = look >= 5, carry = [];
  if (up) { let q = p; while (digitAt(n, q) === 9) { carry.push(q); q++; } carry.push(q); }
  return { q: T.red_q(H.n(n), T.pos[p]), kind: "int", ans: r, sol: T.red_s(T.pos, p, look, up, digitAt(n, p), carry.map(q => [q, digitAt(n, q)]), H.n(r)) };
});

// ── Unidad 2 ──
def("m4.mental", (R, S, H) => {
  const T = S.m4.ME, k = R.int(0, 5);
  if (k === 0) { const c = R.pick([99, 199, 299, 98, 198]), a = R.int(120, 2900), up = Math.ceil(c / 100) * 100; return { q: T.q(`${H.n(a)} + ${c}`), kind: "int", ans: a + c, sol: T.suma_s(H.n(a), up, up - c, H.n(a + up), H.n(a + c)) }; }
  if (k === 1) { const c = R.pick([99, 199, 98, 198, 299]), a = R.int(c + 60, 3000), up = Math.ceil(c / 100) * 100; return { q: T.q(`${H.n(a)} − ${c}`), kind: "int", ans: a - c, sol: T.resta_s(H.n(a), up, up - c, H.n(a - up), H.n(a - c)) }; }
  if (k === 2) { const n = R.int(12, 98); return { q: T.q(`${n} ${X} 5`), kind: "int", ans: 5 * n, sol: T.por5_s(n, 10 * n, 5 * n) }; }
  if (k === 3) { const n = R.int(12, 60); return { q: T.q(`${n} ${X} 9`), kind: "int", ans: 9 * n, sol: T.por9_s(n, 10 * n, 9 * n) }; }
  if (k === 4) {   // parejas amigas
    if (R.r() < 0.5) { const [x, y] = R.pick([[25, 4], [2, 50], [5, 2], [4, 25], [50, 2], [20, 5]]), m = R.int(3, 19); return { q: T.q(`${x} ${X} ${m} ${X} ${y}`), kind: "int", ans: x * y * m, sol: T.parm_s(x, y, x * y, m, H.n(x * y * m)) }; }
    let a; do a = R.int(11, 89); while (a % 10 === 0);
    const b = R.int(11, 89);
    return { q: T.q(`${a} + ${b} + ${100 - a}`), kind: "int", ans: 100 + b, sol: T.pars_s(a, 100 - a, b, 100 + b) };
  }
  let n; do n = R.int(12, 39); while (n % 10 === 0);
  const a = R.int(3, 9), t = n - n % 10, u = n % 10;
  return { q: T.q(`${a} ${X} ${n}`), kind: "int", ans: a * n, sol: T.desc_s(a, n, t, u, a * t, a * u, a * n) };
});
def("m4.series", (R, S, H) => {
  const T = S.m4.SE, x = R.r();
  const arith = () => { const d = R.pick([R.int(3, 12), R.int(3, 12), 15, 20, 25, 50, 125]), down = R.r() < 0.4, a0 = down ? R.int(d * 6, d * 6 + 400) : R.int(1, 300); return [a0, down ? -d : d]; };
  const geo = () => { const m = R.pick([2, 2, 3, 5]), a0 = R.int(1, m === 2 ? 12 : m === 3 ? 6 : 4); return [a0, m]; };
  if (x < 0.4) {   // el número siguiente
    if (R.r() < 0.3) { const [a0, m] = geo(), s = [0, 1, 2, 3].map(i => a0 * m ** i); return { q: T.sig_q(s.map(H.n).join(", ")), kind: "int", ans: a0 * m ** 4, sol: T.mul_s(s.map(H.n), m, H.n(s[3]), H.n(a0 * m ** 4)) }; }
    const [a0, d] = arith(), s = [0, 1, 2, 3].map(i => a0 + i * d);
    return { q: T.sig_q(s.map(H.n).join(", ")), kind: "int", ans: a0 + 4 * d, sol: T.ar_s(s.map(H.n), d, H.n(s[3]), H.n(a0 + 4 * d)) };
  }
  if (x < 0.65) {   // el número que falta
    const [a0, d] = arith(), s = [0, 1, 2, 3, 4].map(i => a0 + i * d), j = R.int(1, 3);
    return { q: T.falta_q(s.map((v, i) => i === j ? "☐" : H.n(v)).join(", ")), kind: "int", ans: s[j], sol: T.falta_s(s.map(H.n), j, d) };
  }
  if (x < 0.82) {   // ¿cuál es la regla?
    if (R.r() < 0.45) {
      const [a0, m] = geo(), s = [0, 1, 2, 3].map(i => a0 * m ** i), good = T.rmul(m);
      const { opts, correct } = opt4(R, good, [T.rsum(s[1] - s[0]), T.rsum(s[2] - s[1]), T.rmul(m + 1)].filter(o => o !== good));
      return { q: T.regla_q(s.map(H.n).join(", ")), kind: "choice", opts, correct, sol: T.rmul_s(s.map(H.n), m) };
    }
    const [a0, d] = arith(), s = [0, 1, 2, 3].map(i => a0 + i * d), good = d > 0 ? T.rsum(d) : T.rres(-d);
    const { opts, correct } = opt4(R, good, [d > 0 ? T.rres(d) : T.rsum(-d), d > 0 ? T.rsum(2 * d) : T.rres(-2 * d), T.rmul(2)]);
    return { q: T.regla_q(s.map(H.n).join(", ")), kind: "choice", opts, correct, sol: T.rsum_s(s.map(H.n), d) };
  }
  // un patrón que crece: mesas, palillos…
  const [ctx, f, st] = R.pick(T.crece), n = R.int(5, 15);
  return { q: T.crece_q(ctx, f, st, n), kind: "int", ans: f + (n - 1) * st, sol: T.crece_s(ctx, f, st, n) };
});
def("m4.hueco", (R, S) => {   // el número escondido, con la operación que lo deshace
  const T = S.m4.HU, k = R.int(0, 7);
  let a, b, c;   // a ∘ b = c
  if (k < 4) { a = R.int(12, 480); b = R.int(12, 480); c = a + b; } else { a = R.int(2, 12); b = R.int(2, 10); c = a * b; }
  const E = [
    [`☐ + ${b} = ${c}`, a, T.s_suma(c, b, a, `${a} + ${b} = ${c}`)],
    [`${a} + ☐ = ${c}`, b, T.s_suma(c, a, b, `${a} + ${b} = ${c}`)],
    [`☐ − ${b} = ${a}`, c, T.s_ini(a, b, c)],
    [`${c} − ☐ = ${a}`, b, T.s_quita(c, a, b)],
    [`☐ × ${b} = ${c}`, a, T.s_mul(c, b, a, `${a} × ${b} = ${c}`)],
    [`${a} × ☐ = ${c}`, b, T.s_mul(c, a, b, `${a} × ${b} = ${c}`)],
    [`☐ ${WA.H.div} ${b} = ${a}`, c, T.s_div(a, b, c)],
    [`${c} ${WA.H.div} ☐ = ${a}`, b, T.s_entre(c, a, b)],
  ][k];
  return { q: T.q(E[0]), kind: "int", ans: E[1], sol: E[2] };
});
def("m4.dospasos", (R, S, H) => {   // los cuatro tipos de m4.combinados, comparación con barras y multiplicar y repartir
  const T = S.m4.DP, k = R.int(0, 3);
  if (k < 2) return WA.GEN["m4.combinados"](R, S, H);
  if (k === 2) {
    const [N1, N2] = R.shuffle(S.m4.nombres).slice(0, 2), [obj, fem] = R.pick(T.objs), a = R.int(40, 300), d = R.int(10, Math.min(90, a - 10)), mas = R.r() < 0.5, b = mas ? a + d : a - d;
    return { q: T.comp_q(N1, a, obj, N2, d, mas, fem), kind: "int", ans: a + b, sol: T.comp_s(N1, N2, a, d, b, a + b, mas, obj, fem) };
  }
  let c, p, n;
  do { c = R.int(2, 8); p = R.pick([6, 8, 10, 12, 15, 20, 24, 25, 30, 36, 40, 48]); const ds = [3, 4, 5, 6, 8, 9, 10, 12].filter(v => (c * p) % v === 0 && c * p / v >= 3 && v !== c && v !== p); n = ds.length ? R.pick(ds) : 0; } while (!n);
  const [caja, cosa, quien, fem] = R.pick(T.rep);
  return { q: T.rep_q(c, caja, p, cosa, n, quien, fem), kind: "int", ans: c * p / n, sol: T.rep_s(c, p, c * p, n, c * p / n, cosa, quien) };
});

// ── Unidad 4 ──
def("m4.fraccomp", (R, S) => {   // comparar con la unidad, con un medio y pasando a una equivalente
  const T = S.m4.FC, sg = [">", "&lt;", "="], res = (l, r) => l > r ? 0 : l < r ? 1 : 2, x = R.r(), sw = R.r() < 0.5;
  if (x < 0.4) {   // un denominador cabe en el otro
    let a, b, k, c; do { b = R.int(2, 6); k = R.int(2, 4); a = R.int(1, b - 1); c = R.r() < 0.25 ? a * k : R.int(1, b * k - 1); } while (b * k > 12);
    const d = b * k, cr = sw ? res(c, a * k) : res(a * k, c);
    return { q: T.q(sw ? `${c}/${d}` : `${a}/${b}`, sw ? `${a}/${b}` : `${c}/${d}`), kind: "choice", opts: [">", "<", "="], correct: cr, shuffle: false, sol: T.eq_s(a, b, c, d, k, sg[res(a * k, c)], sw ? `${c}/${d}` : `${a}/${b}`, sw ? `${a}/${b}` : `${c}/${d}`, sg[cr]) };
  }
  if (x < 0.65) {   // con la unidad
    const d = R.int(3, 12), n = R.pick([d - R.int(1, 2), d, d + R.int(1, 3)]), rel = res(n, d), cr = sw ? res(d, n) : rel;
    return { q: T.q(sw ? "1" : `${n}/${d}`, sw ? `${n}/${d}` : "1"), kind: "choice", opts: [">", "<", "="], correct: cr, shuffle: false, sol: T.uni_s(n, d, rel, sw ? "1" : `${n}/${d}`, sw ? `${n}/${d}` : "1", sg[cr]) };
  }
  const half = d => d % 2 ? T.medio((d - 1) / 2) : T.trozos(d / 2);
  if (R.r() < 0.4) {   // con 1/2 directamente
    const d = 2 * R.int(2, 6); let n; do n = R.int(1, d - 1); while (2 * n === d);
    const rel = res(2 * n, d), cr = sw ? res(d, 2 * n) : rel;
    return { q: T.q(sw ? "1/2" : `${n}/${d}`, sw ? `${n}/${d}` : "1/2"), kind: "choice", opts: [">", "<", "="], correct: cr, shuffle: false, sol: T.mit1_s(n, d, d / 2, sg[rel], sw ? "1/2" : `${n}/${d}`, sw ? `${n}/${d}` : "1/2", sg[cr]) };
  }
  let d1, d2, x1, y2; do { d1 = R.int(3, 12); d2 = R.int(3, 12); x1 = R.int(1, d1 - 1); y2 = R.int(1, d2 - 1); } while (d1 === d2 || 2 * x1 >= d1 || 2 * y2 <= d2);
  const L1 = `${x1}/${d1}`, L2 = `${y2}/${d2}`, cr = sw ? 0 : 1;
  return { q: T.q(sw ? L2 : L1, sw ? L1 : L2), kind: "choice", opts: [">", "<", "="], correct: cr, shuffle: false, sol: T.mit2_s(x1, d1, half(d1), y2, d2, half(d2), sw ? L2 : L1, sw ? L1 : L2, sg[cr]) };
});
def("m4.equivfr", (R, S) => {   // como m4.equiv, pero con denominadores hasta 24 (se pueden dibujar con tiras)
  const T = S.m4.EQ;
  let a, b, k; do { b = R.int(2, 9); a = R.int(1, b - 1); k = R.int(2, 6); } while (gcd(a, b) !== 1 || b * k > 24);
  const x = R.r();
  if (x < 0.35) return { q: S.m4.eq_q(`${a}/${b} = ☐/${b * k}`), kind: "int", ans: a * k, sol: T.mul_s(a, b, k) };
  if (x < 0.6) return { q: S.m4.eq_q(`${a * k}/${b * k} = ${a}/☐`), kind: "int", ans: b, sol: T.div_s(a, b, k) };
  if (x < 0.8) {
    const ok = `${a * k}/${b * k}`, opts = R.shuffle([ok, `${a + k}/${b + k}`, `${a * k}/${b + k}`, `${a}/${b * k}`].filter((v, i, arr) => arr.indexOf(v) === i));
    return { q: S.m4.eq3_q(`${a}/${b}`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.opt_s(a, b, k) };
  }
  const yes = R.r() < 0.5, c = yes ? a * k : a * k + (a * k > 1 && R.r() < 0.5 ? -1 : 1);
  return { q: T.son_q(`${a}/${b}`, `${c}/${b * k}`), kind: "choice", opts: T.sino, correct: yes ? 0 : 1, shuffle: false, sol: T.son_s(a, b, c, k, yes) };
});
def("m4.sumfr", (R, S) => {   // sumar y restar con igual denominador, restar a la unidad y problemas
  const T = S.m4.SF, d = R.int(3, 12), x = R.r(), fr = (q, n, sol) => ({ q, kind: "frac", ans: [n, d], hint: S.m4.frac_hint, sol });
  if (x < 0.3) { const a = R.int(1, d - 1), b = R.int(1, d - 1); return fr(S.m4.op_q(`${a}/${d} + ${b}/${d}`), a + b, S.m4.sf_s(a, b, d, a + b, true)); }
  if (x < 0.5) { const a = R.int(2, d - 1), b = R.int(1, a - 1); return fr(S.m4.op_q(`${a}/${d} − ${b}/${d}`), a - b, S.m4.sf_s(a, b, d, a - b, false)); }
  if (x < 0.75) { const b = R.int(1, d - 1); return fr(S.m4.op_q(`1 − ${b}/${d}`), d - b, T.uno_s(b, d)); }
  if (R.r() < 0.5) { const [cosa, verbo] = R.pick(T.llenos), b = R.int(1, d - 1); return fr(T.queda_q(cosa, verbo, b, d), d - b, T.queda_s(cosa, b, d)); }
  const a = R.int(1, d - 2), b = R.int(1, d - 1 - a), [obra, verbo] = R.pick(T.obras);
  return fr(T.falta_q(obra, verbo, a, b, d), d - a - b, T.falta_s(obra, a, b, d));
});
def("m4.fracde", (R, S, H, L) => {   // fracción de un número, de una medida y «lo que queda»
  const T = S.m4.FN, pickF = ds => { let n, d; do { d = R.pick(ds); n = R.int(1, d - 1); } while (gcd(n, d) !== 1); return [n, d]; }, x = R.r();
  if (x < 0.4) {
    const [n, d] = pickF([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), N = d * R.int(3, 40), obj = R.r() < 0.3 ? R.pick(S.m4.objs)[0] : null;
    return { q: obj ? S.m4.fn2_q(N, obj, n, d) : S.m4.fn_q(n, d, H.n(N)), kind: "int", ans: N / d * n, sol: T.s(H.n(N), n, d, H.n(N / d), H.n(N / d * n), L, obj) };
  }
  if (x < 0.75) { const [w, tot, unit, ds] = R.pick(T.med), [n, d] = pickF(ds); return { q: T.med_q(unit, n, d, w), kind: "int", ans: tot / d * n, sol: T.med_s(w, H.n(tot), unit, n, d, tot / d, tot / d * n, L) }; }
  const [n, d] = pickF([3, 4, 5, 6, 8, 10]), [qf, unit] = R.pick(T.queda), N = d * R.int(4, 30);
  return { q: qf(H.n(N), n, d), kind: "int", ans: N / d * (d - n), sol: T.queda_s(H.n(N), n, d, H.n(N / d), H.n(N / d * (d - n)), unit, L) };
});

// ── Unidad 5 ──
def("m4.decleer", (R, S, H) => {   // como m4.leerdec, pero al comparar: 4,6 = 4,60 y partes enteras distintas
  const T = S.m4.DL, k = R.int(0, 2);
  if (k === 0) {
    const a = R.int(0, 99), b = R.int(1, 99), x = a + b / 100, p = R.int(0, 1), dg = p === 0 ? Math.floor(b / 10) : b % 10;
    const all = String(a) + String(b).padStart(2, "0");
    if (dg && all.split(String(dg)).length === 2) return { q: S.m4.dv_q(H.dec(x), dg, S.m4.decp[p]), kind: "choice", opts: S.m4.decp_o, correct: p + 1, shuffle: false, sol: S.m4.dv_s(dg, S.m4.decp[p]) };
  }
  if (k <= 1) { const e = R.int(0, 30), c = R.int(1, 99); return { q: S.m4.dw2_q(e, c), kind: "num", ans: e + c / 100, sol: T.dw_s(e, c, Math.floor(c / 10), c % 10, H.dec(e + c / 100)) }; }
  const m = R.r(), sw = R.r() < 0.5, sg = [">", "&lt;", "="];
  const cmp = (sa, sb, cr, sol) => ({ q: S.m4.dc_q(sw ? sb : sa, sw ? sa : sb), kind: "choice", opts: [">", "<", "="], correct: sw ? [1, 0, 2][cr] : cr, shuffle: false, sol });
  if (m < 0.2) { const e = R.int(0, 9), t = R.int(1, 9), sa = H.dec(e + t / 10), sb = sa + "0"; return cmp(sa, sb, 2, T.igual_s(sw ? sb : sa, sw ? sa : sb, t)); }
  if (m < 0.5) {   // partes enteras distintas; el menor, con más cifras decimales
    const e = R.int(0, 8); let c; do c = R.int(11, 99); while (c % 10 === 0);
    const sa = H.dec(e + c / 100), sb = H.dec(e + 1 + R.int(0, 9) / 10);
    return cmp(sa, sb, 1, T.ent_s(sw ? sb : sa, sw ? sa : sb, sw ? e + 1 : e, sw ? e : e + 1, sg[sw ? 0 : 1]));
  }
  let a, b; do { const e = R.int(0, 9); a = Math.round((e + R.int(0, 99) / 100) * 100); b = Math.round((e + R.pick([R.int(0, 9) / 10, R.int(0, 99) / 100])) * 100); } while (a === b);
  const cr = a > b ? 0 : 1, dd = v => [Math.floor(v / 10) % 10, v % 10];
  return cmp(H.dec(a / 100), H.dec(b / 100), cr, T.dec_s(Math.floor(a / 100), sw ? dd(b) : dd(a), sw ? dd(a) : dd(b), sw ? H.dec(b / 100) : H.dec(a / 100), sw ? H.dec(a / 100) : H.dec(b / 100), sg[sw ? [1, 0][cr] : cr]));
});

// ── Unidad 7 ──
function protr(th, left) {   // transportador de doble escala; un lado sobre el 0 de la derecha (o de la izquierda) y el otro a th° (el 0 y el 180 se rotulan un poco por encima de la línea)
  const cx = 180, cy = 172, r = 150, P = (g, rr) => [f1(cx + rr * Math.cos(g * Math.PI / 180)), f1(cy - rr * Math.sin(g * Math.PI / 180))];
  let b = `<path d="M${cx - r},${cy} A${r},${r} 0 0,1 ${cx + r},${cy} Z" fill="#fef6e7" stroke="${C.dark}" stroke-width="1.5"/>`;
  for (let g = 0; g <= 180; g += 5) { const [x1, y1] = P(g, r), [x2, y2] = P(g, r - (g % 10 ? 6 : 12)); b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.dark}" stroke-width="1"/>`; }
  for (let g = 0; g <= 180; g += 10) { const gl = g === 0 ? 5 : g === 180 ? 175 : g, [x1, y1] = P(gl, r - 25), [x2, y2] = P(gl, r - 46); b += SVG.txt(x1, y1 + 4, g, 11, C.dark, "middle", "bold") + SVG.txt(x2, y2 + 4, 180 - g, 10, C.blue); }
  const g2 = left ? 180 - th : th, [ex, ey] = P(g2, r + 12), [bx, by] = P(left ? 180 : 0, r + 12);
  b += `<line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="${C.red}" stroke-width="3.5" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="${C.red}" stroke-width="3.5" stroke-linecap="round"/>`;
  b += `<circle cx="${cx}" cy="${cy}" r="4" fill="${C.dark}"/>`;
  return SVG.svg(360, 182, b);
}
def("m4.medirang", (R, S) => {   // medir con el transportador (doble escala) y los ángulos del reloj
  const T = S.m4.MA;
  if (R.r() < 0.65) {
    let th; do th = R.int(1, 17) * 10; while (th === 90);
    const left = R.r() < 0.45, { opts, correct } = opt4(R, th + "°", [180 - th, th + (th < 170 ? 10 : -10), th - (th > 10 ? 10 : -20)].map(v => v + "°"));
    return { q: T.tr_q + "<br>" + protr(th, left), kind: "choice", opts, correct, sol: T.tr_s(th, left) };
  }
  const h = R.int(1, 11), e = Math.min(h, 12 - h);
  return { q: T.rel_q(h) + "<br>" + SVG.clock(h, 0, 120), kind: "int", ans: 30 * e, sol: T.rel_s(h, e, 30 * e) };
});
def("m4.areacuad", (R, S) => {   // área con cuadrículas: contar, filas, medios cuadraditos y área frente a perímetro
  const T = S.m4.AQ, u = 20, cell = (x, y, f) => `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${f}" stroke="${C.grey}"/>`, x = R.r();
  if (x < 0.3) {
    const w = R.int(2, 8), h = R.int(2, 5), cut = R.r() < 0.5 ? [R.int(1, w - 1), R.int(1, h - 1)] : null;
    let b = "", n = 0;
    for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) { const on = !cut || !(xx >= w - cut[0] && y < cut[1]); if (on) n++; b += cell(xx, y, on ? "#cfe0ff" : "#fff"); }
    return { q: S.m4.ar_q + "<br>" + SVG.svg(12 + w * u, 12 + h * u, b), kind: "int", ans: n, sol: cut ? T.cnt_s(n, w, h, cut[0] * cut[1]) : T.fil_s(w, h, n) };
  }
  if (x < 0.5) { const l = R.int(3, 12), w = R.int(2, 9); return { q: S.m4.arr_q(l, w), kind: "int", ans: l * w, sol: T.arr_s(l, w, l * w) }; }
  if (x < 0.75) {   // con medios cuadraditos (los triángulos amarillos de la fila de arriba)
    const w = R.int(3, 7), h = R.int(1, 3), m = 2 * R.int(1, Math.floor(w / 2)), cols = R.shuffle([...Array(w).keys()]).slice(0, m);
    let b = "";
    for (let xx = 0; xx < w; xx++) {
      b += cell(xx, 0, "#fff");
      if (cols.includes(xx)) { const X0 = 6 + xx * u, Y0 = 6; b += `<polygon points="${X0},${Y0 + u} ${X0 + u},${Y0 + u} ${X0 + u},${Y0}" fill="#f2d16b" stroke="${C.dark}" stroke-width="1"/>`; }
      for (let y = 1; y <= h; y++) b += cell(xx, y, "#cfe0ff");
    }
    return { q: T.med_q + "<br>" + SVG.svg(12 + w * u, 12 + (h + 1) * u, b), kind: "int", ans: w * h + m / 2, sol: T.med_s(w * h, m, m / 2, w * h + m / 2) };
  }
  const l = R.int(2, 8), h = R.int(2, 5);
  let b = "";
  for (let y = 0; y < h + 2; y++) for (let xx = 0; xx < l + 2; xx++) b += cell(xx, y, xx && y && xx <= l && y <= h ? "#cfe0ff" : "#fff");
  b += `<rect x="${6 + u}" y="${6 + u}" width="${l * u}" height="${h * u}" fill="none" stroke="${C.blue}" stroke-width="2.5"/>`;
  return { q: T.ap_q + "<br>" + SVG.svg(12 + (l + 2) * u, 12 + (h + 2) * u, b), kind: "fields", fields: [{ label: T.ap_f[0], ans: l * h }, { label: T.ap_f[1], ans: 2 * (l + h) }], sol: T.ap_s(l, h, l * h, 2 * (l + h)) };
});
function simPic(k) {   // figuras para contar ejes (caja de 120 × 110)
  const P = pts => `<polygon points="${pts.map(p => p.map(f1).join(",")).join(" ")}" fill="#d5fdf4" stroke="${C.dark}" stroke-width="2"/>`;
  const reg = (n, r) => P(Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [60 + r * Math.cos(a), 58 + r * Math.sin(a)]; }));
  const F = { sq: P([[20, 15], [100, 15], [100, 95], [20, 95]]), rect: P([[5, 30], [115, 30], [115, 85], [5, 85]]), eq: P([[60, 10], [106, 90], [14, 90]]),
    iso: P([[60, 5], [90, 100], [30, 100]]), esc: P([[10, 95], [112, 95], [38, 18]]), rombo: P([[60, 5], [95, 55], [60, 105], [25, 55]]),
    trap: P([[35, 25], [85, 25], [112, 90], [8, 90]]), pent: reg(5, 50), hex: reg(6, 50) };
  return F[k] ? SVG.svg(120, 110, F[k]) : SVG.svg(110, 110, SVG.txt(55, 90, k, 88, C.blue, "middle", "bold"));
}
def("m4.simetria", (R, S) => {   // contar ejes, el simétrico de un punto y trasladar un punto
  const T = S.m4.SM, x = R.r();
  if (x < 0.4) { const [name, n, pic, why] = R.pick(T.figs); return { q: T.ejes_q(name) + "<br>" + simPic(pic), kind: "int", ans: n, sol: T.ejes_s(name, n, why) }; }
  const W = 10, Hh = 6, z = 26, x0 = 16, y0 = 10, X = v => x0 + v * z, Y = v => y0 + (Hh - v) * z;
  let b = "";
  for (let i = 0; i <= W; i++) b += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(Hh)}" stroke="#c9d3c0"/>` + SVG.txt(X(i), Y(0) + 17, i, 11, C.dark);
  for (let j = 0; j <= Hh; j++) b += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(W)}" y2="${Y(j)}" stroke="#c9d3c0"/>` + SVG.txt(X(0) - 9, Y(j) + 4, j, 11, C.dark);
  const dot = (px, py, col) => `<circle cx="${X(px)}" cy="${Y(py)}" r="6" fill="${col}" stroke="#fff" stroke-width="1.5"/>`;
  if (x < 0.7) {
    const e = R.int(3, 7); let c; do c = R.int(0, W); while (c === e || 2 * e - c < 0 || 2 * e - c > W);
    const row = R.int(1, Hh - 1);
    b += `<line x1="${X(e)}" y1="${Y(Hh) - 6}" x2="${X(e)}" y2="${Y(0) + 4}" stroke="${C.red}" stroke-width="3" stroke-dasharray="7 4"/>` + dot(c, row, C.blue);
    return { q: T.pun_q(c, e) + "<br>" + SVG.svg(X(W) + 12, Y(0) + 26, b), kind: "int", ans: 2 * e - c, sol: T.pun_s(c, e, Math.abs(e - c), 2 * e - c, c < e) };
  }
  let px, py, dx, dy; do { px = R.int(0, 7); py = R.int(0, 5); dx = R.int(1, 5) * (R.r() < 0.7 ? 1 : -1); dy = R.int(1, 4) * (R.r() < 0.5 ? 1 : -1); } while (px + dx < 0 || px + dx > W || py + dy < 0 || py + dy > Hh);
  b += dot(px, py, C.blue);
  return { q: T.tra_q(px, py, Math.abs(dx), dx > 0, Math.abs(dy), dy > 0) + "<br>" + SVG.svg(X(W) + 12, Y(0) + 26, b), kind: "fields", fields: [{ label: T.tra_f[0], ans: px + dx }, { label: T.tra_f[1], ans: py + dy }], sol: T.tra_s(px, py, Math.abs(dx), dx > 0, Math.abs(dy), dy > 0, px + dx, py + dy) };
});

// ── Unidad 8 ──
function pictoSvg(T, rows, v, frutas) {   // pictograma: una fila por fruta; cada círculo vale v; medio círculo, v/2
  const r = 10, gap = 26, x0 = 96;
  let b = SVG.txt(8, 20, T.ley[0], 13, C.dark, "start", "bold") + `<circle cx="52" cy="15" r="8" fill="${C.amber}" stroke="${C.dark}"/>` + SVG.txt(66, 20, T.ley[1](v), 13, C.dark, "start", "bold");
  rows.forEach((n, i) => {
    const y = 48 + i * 30;
    b += SVG.txt(8, y + 5, frutas[i], 13, C.dark, "start");
    for (let j = 0; j < Math.floor(n); j++) b += `<circle cx="${x0 + j * gap}" cy="${y}" r="${r}" fill="${C.amber}" stroke="${C.dark}"/>`;
    if (n % 1) { const cx = x0 + Math.floor(n) * gap; b += `<path d="M${cx},${y - r} A${r},${r} 0 0,0 ${cx},${y + r} Z" fill="${C.amber}" stroke="${C.dark}"/>`; }
  });
  return SVG.svg(x0 + 6 * gap, 48 + rows.length * 30 - 8, b);
}
def("m4.recuento", (R, S) => {   // recuento con palotes (listas cortas), total, moda y pictogramas con leyenda
  const T = S.m4.RC, x = R.r();
  if (x < 0.6) {
    const opts = R.shuffle(S.m4.colores).slice(0, R.int(3, 4)), n = R.int(10, 12), k = R.int(0, 2);
    let data, cnt, counts, mx;
    do { data = Array.from({ length: n }, () => R.pick(opts)); cnt = c => data.filter(y => y === c).length; counts = opts.map(cnt); mx = Math.max(...counts); } while (k === 2 && counts.filter(y => y === mx).length > 1);
    const tabla = opts.map((c, i) => [c, counts[i]]);
    if (k === 0) { const c = R.pick(opts); return { q: S.m4.fr_q(data.join(", "), c), kind: "int", ans: cnt(c), sol: T.fr_s(c, cnt(c)) }; }
    if (k === 1) return { q: S.m4.frt_q(data.join(", ")), kind: "int", ans: n, sol: T.tot_s(tabla, n) };
    return { q: S.m4.moda_q(data.join(", ")), kind: "choice", opts, correct: counts.indexOf(mx), shuffle: false, sol: T.moda_s(tabla, opts[counts.indexOf(mx)], mx) };
  }
  const v = R.pick([2, 4, 10]), fr = R.shuffle(T.frutas).slice(0, 4), rows = fr.map(() => R.int(1, 5) + (R.r() < 0.5 ? 0.5 : 0)), i = R.int(0, 3), w = Math.floor(rows[i]), half = rows[i] % 1 > 0, N = w * v + (half ? v / 2 : 0);
  if (x < 0.85) return { q: T.pic_q(fr[i]) + "<br>" + pictoSvg(T, rows, v, fr), kind: "int", ans: N, sol: T.pic_s(fr[i], v, w, half, N) };
  const good = T.dib(w, half), { opts, correct } = opt4(R, good, [T.dib(N, false), T.dib(w, !half), T.dib(N * v, false)].filter(o => o !== good));
  return { q: T.con_q(v, fr[i], N), kind: "choice", opts, correct, sol: T.con_s(N, v, w, half) };
});
})();
