/* WikiAula — Matemáticas, Grado 11 · Unidad 9: Límites y continuidad.
   Textos: i18n/<lang>/mat11u9.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, lin, polyHtml, F } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const xm = a => a === 0 ? "x" : a > 0 ? `x − ${a}` : `x + ${-a}`;
const sg = (c, t) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 && t ? "" : Math.abs(c)) + t : "";
const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
const lim = (a, f) => `lim<sub>x→${a}</sub> ${f}`;
const wr = s => /^−?[0-9]*x?$/.test(s) ? s : `(${s})`;                  // x, 3x, 5 sin paréntesis; el resto, con ellos
const fr = (p, q) => `${wr(p)} / ${wr(q)}`;
const fac = vs => { const fs = vs.map(xm); return [...fs.filter(f => f === "x"), ...fs.filter(f => f !== "x").map(f => `(${f})`)].join(""); };   // x(x − 2)(x + 1)
const br = s => /^\(?[^()]*\)?$/.test(s) && !/\)\(|x\(/.test(s) ? s : `[${s}]`;   // producto de factores entre corchetes: [(x − 2)(x + 1)]
const piece = (f1, c, f2, strict2) => `<span style="white-space:nowrap">f(x) = ${f1} si x &lt; ${neg(c)}</span>; <span style="white-space:nowrap">f(x) = ${f2} si x ${strict2 ? "&gt;" : "≥"} ${neg(c)}</span>`;

def("m11.li.lateral", (R, S, H) => {
  if (R.r() < 0.25) {   // k/(x − c): los laterales son infinitos de signo distinto
    const c = R.int(-3, 3), k = rnz(R, -6, 6), ok = k > 0 ? S.m11.li_lat_inf[0] : S.m11.li_lat_inf[1];
    const opts = R.shuffle(S.m11.li_lat_inf);
    return { q: S.m11.li_lat_q2(`${k}/(${xm(c)})`, neg(c)), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.li_lat_s2(neg(c), xm(c), k > 0) };
  }
  const c = R.int(-3, 3), a = rnz(R, -3, 3), b = R.int(-5, 5), d = rnz(R, -3, 3);
  const L = a * c + b, same = R.r() < 0.4, e = same ? L - d * c : R.int(-6, 6), Rr = d * c + e;
  if (d === a && e === b) return null;   // dos trozos iguales: no hay nada que estudiar
  return { q: S.m11.li_lat_q(piece(lin(a, b), c, lin(d, e)), neg(c)), kind: "fields",
    fields: [{ label: S.m11.li_lat_f[0], ans: L }, { label: S.m11.li_lat_f[1], ans: Rr }],
    sol: S.m11.li_lat_s(neg(c), neg(L), neg(Rr), L === Rr) };
});

def("m11.li.directo", (R, S, H) => {
  const a = R.int(-3, 3);
  if (R.r() < 0.5) {
    const cs = [rnz(R, -3, 3), R.int(-5, 5), R.int(-6, 6)];
    if (R.r() < 0.4) cs.unshift(rnz(R, -2, 2));
    const v = ev(cs, a), deg = cs.length - 1, pa = a < 0 ? `(${neg(a)})` : String(a), SUPS = ["", "", "²", "³"];
    const terms = cs.map((c, i) => [c, deg - i]).filter(([c]) => c);
    const sub = terms.map(([c, e], i) => { const body = e ? `${Math.abs(c) === 1 ? "" : Math.abs(c) + " · "}${pa}${SUPS[e]}` : Math.abs(c); return (i ? (c < 0 ? " − " : " + ") : (c < 0 ? "−" : "")) + body; }).join("");
    const vals = terms.map(([c, e], i) => { const t = c * a ** e; return i ? (t < 0 ? " − " : " + ") + Math.abs(t) : neg(t); }).join("");
    return { q: S.m11.li_dir_q(lim(neg(a), `(${polyHtml(cs)})`)), kind: "int", ans: v, sol: S.m11.li_dir_p(neg(a), sub, vals, neg(v)) };
  }
  let p, q, r, s;
  do { p = rnz(R, -4, 4); q = R.int(-6, 6); r = rnz(R, -3, 3); s = R.int(-6, 6); } while (r * a + s === 0 || p * s === q * r);
  const v = F.make(p * a + q, r * a + s), pa = a < 0 ? `(${neg(a)})` : String(a);
  const ex = (m, n) => `${a === 0 ? "0" : (m === 1 ? "" : m === -1 ? "−" : neg(m) + " · ") + pa}${n ? ` ${n < 0 ? "−" : "+"} ${Math.abs(n)}` : ""}`;
  return { q: S.m11.li_dir_q(lim(neg(a), fr(lin(p, q), lin(r, s)))), kind: "frac", ans: v, sol: S.m11.li_dir_f(neg(a), neg(r * a + s), `(${ex(p, q)}) / (${ex(r, s)}) = ${neg(p * a + q)}/${r * a + s < 0 ? `(${neg(r * a + s)})` : r * a + s}`, F.html(v, H)) };
});

def("m11.li.infinito", (R, S, H) => {
  const dp = R.int(1, 3), dq = R.int(1, 3);
  const P = [rnz(R, -6, 6), ...Array.from({ length: dp }, () => R.int(-7, 7))];
  const Q = [rnz(R, -6, 6), ...Array.from({ length: dq }, () => R.int(-7, 7))];
  const ratio = F.make(P[0], Q[0]), rh = F.html(ratio, H), minus = R.r() < 0.3;   // 30 %: x → −∞
  const sgn = P[0] / Q[0] * (minus && (dp - dq) % 2 ? -1 : 1);
  const k = dp < dq ? 1 : dp === dq ? 0 : sgn > 0 ? 2 : 3;
  const opts = [rh, "0", "+∞", "−∞"];
  return { q: S.m11.li_inf_q(lim(minus ? "−∞" : "+∞", fr(polyHtml(P), polyHtml(Q)))), kind: "choice", opts, correct: k,
    sol: S.m11.li_inf_s(k, dp, dq, rh) + (minus && k >= 2 ? S.m11.li_inf_m(dp - dq) : "") };
});

def("m11.li.cero", (R, S, H) => {
  const a = rnz(R, -4, 4), k = R.int(0, 2);
  if (k === 0) {   // (x² − a²)/(x − a) → 2a
    return { q: S.m11.li_cero_q(lim(neg(a), fr(`x² − ${a * a}`, xm(a)))), kind: "int", ans: 2 * a,
      sol: S.m11.li_cero_s(neg(a), fac([a, -a]), `(${xm(a)})`, xm(-a), neg(2 * a)) };
  }
  let b, c;
  do { b = R.int(-5, 5); c = R.int(-5, 5); } while (b === a || c === a || b === c);
  const num = polyHtml([1, -(a + b), a * b]);
  if (k === 1) {   // (x − a)(x − b)/(x − a) → a − b
    return { q: S.m11.li_cero_q(lim(neg(a), fr(num, xm(a)))), kind: "int", ans: a - b,
      sol: S.m11.li_cero_s(neg(a), fac([a, b]), `(${xm(a)})`, xm(b), neg(a - b)) };
  }
  const den = polyHtml([1, -(a + c), a * c]), v = F.make(a - b, a - c);
  return { q: S.m11.li_cero_q(lim(neg(a), fr(num, den))), kind: "frac", ans: v,
    sol: S.m11.li_cero_s(neg(a), `[${fac([a, b])}]`, `[${fac([a, c])}]`, fr(xm(b), xm(c)), F.html(v, H)) };
});

def("m11.li.raiz", (R, S, H) => {
  if (R.r() < 0.5) {   // (√(x + a²) − a)/x → 1/(2a)
    const a = R.int(1, 6), v = F.make(1, 2 * a);
    return { q: S.m11.li_cero_q(lim(0, `(√(x + ${a * a}) − ${a}) / x`)), kind: "frac", ans: v, sol: S.m11.li_rz0_s(a, a * a, F.html(v, H)) };
  }
  const b = rnz(R, -9, 9), c = R.int(-6, 6), v = F.make(b, 2);   // √(x² + bx + c) − x → b/2
  return { q: S.m11.li_inf2_q(lim("+∞", `(√(${polyHtml([1, b, c])}) − x)`)), kind: "frac", ans: v, sol: S.m11.li_rzi_s(polyHtml([1, b, c]), wr(polyHtml([b, c])), neg(b), F.html(v, H)) };
});

const eP = k => k === 1 ? "e" : `e<sup>${neg(k)}</sup>`;   // e, no «e¹»
def("m11.li.e", (R, S, H) => {
  const b = rnz(R, 1, 5);
  if (R.r() < 0.4) {   // ((x + p)/(x + q))^(bx): base que no está escrita como 1 + a/x → fórmula general, L = b(p − q)
    let p, q; do { p = R.int(-5, 5); q = R.int(-5, 5); } while (p === q);
    const k = b * (p - q), base = `${wr(xm(-p))}/${wr(xm(-q))}`;
    return { q: S.m11.li_e_q(lim("+∞", `(${base})<sup>${b === 1 ? "" : b}x</sup>`)), kind: "expr", ans: `e^(${k})`, ansHtml: eP(k), hint: S.m11.li_e_hint,
      sol: S.m11.li_e2_s(base, `(${xm(-q)})`.replace(/^\(x\)$/, "x"), neg(p - q), b, k, eP(k)) };
  }
  const a = rnz(R, -4, 4), k = a * b;
  return { q: S.m11.li_e_q(lim("+∞", `(1 ${a < 0 ? "−" : "+"} ${Math.abs(a)}/x)<sup>${b === 1 ? "" : b}x</sup>`)), kind: "expr", ans: `e^(${k})`, ansHtml: eP(k), hint: S.m11.li_e_hint,
    sol: S.m11.li_e_s(neg(a), b, neg(k), eP(k)) };
});

def("m11.li.asint", (R, S, H) => {
  if (R.r() < 0.55) {   // (ax + b)/(x − c): x = c, y = a
    let a, b, c;
    do { a = rnz(R, -5, 5); b = R.int(-8, 8); c = R.int(-5, 5); } while (a * c + b === 0);
    return { q: S.m11.li_as_q(fr(lin(a, b), xm(c))), kind: "fields", fields: [{ label: S.m11.li_as_f[0], ans: c }, { label: S.m11.li_as_f[1], ans: a }],
      sol: S.m11.li_as_s(neg(c), neg(a)) };
  }
  // (x² + px + q)/(x − c) = x + (p + c) + resto/(x − c): oblicua y = x + p + c
  let p, q, c;
  do { p = R.int(-6, 6); q = R.int(-8, 8); c = R.int(-4, 4); } while (c * c + p * c + q === 0);
  const n = p + c;
  return { q: S.m11.li_ob_q(fr(polyHtml([1, p, q]), xm(c))), kind: "fields", fields: [{ label: "m", ans: 1 }, { label: "n", ans: n }],
    sol: S.m11.li_ob_s(polyHtml([1, p, q]), xm(c), lin(1, n), c * c + p * c + q, wr(polyHtml([1, p, q])), wr(xm(c))) };
});

def("m11.li.continua", (R, S, H) => {
  if (R.r() < 0.3) {   // tres trozos y dos parámetros: x + a (x < 0); x² + b (0 ≤ x < c); m·x (x ≥ c)
    const c = R.int(1, 3), m = R.int(2, 5), b = m * c - c * c, a = b;
    const f = `<span style="white-space:nowrap">f(x) = x + a si x &lt; 0</span>; <span style="white-space:nowrap">f(x) = x² + b si 0 ≤ x &lt; ${c}</span>; <span style="white-space:nowrap">f(x) = ${m}x si x ≥ ${c}</span>`;
    return { q: S.m11.li_ct2_q(f), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }], sol: S.m11.li_ct2_s(c, c * c, m * c, neg(b)) };
  }
  const c = R.int(-3, 3), a = rnz(R, -4, 4), b = R.int(-6, 6), L = a * c + b;
  if (R.r() < 0.5) {   // x² + k (x < c) y ax + b (x ≥ c)
    const k = L - c * c;
    return { q: S.m11.li_ct_q(piece("x² + k", c, lin(a, b))), kind: "int", ans: k, sol: S.m11.li_ct_s(neg(c), c ? `${c * c} + k` : "k", neg(L), neg(k), `${neg(a)} · ${c < 0 ? `(${neg(c)})` : c}${b ? ` ${b < 0 ? "−" : "+"} ${Math.abs(b)}` : ""}`) };
  }
  const m = rnz(R, -3, 3), n = L - m * c;   // kx + m·… : mx + k (x < c) y ax + b (x ≥ c)
  return { q: S.m11.li_ct_q(piece(`${m === 1 ? "" : m === -1 ? "−" : neg(m)}x + k`, c, lin(a, b))), kind: "int", ans: n,
    sol: S.m11.li_ct_s(neg(c), c ? `${neg(m * c)} + k` : "k", neg(L), neg(n), `${neg(a)} · ${c < 0 ? `(${neg(c)})` : c}${b ? ` ${b < 0 ? "−" : "+"} ${Math.abs(b)}` : ""}`) };
});

def("m11.li.discont", (R, S, H) => {
  const k = R.int(0, 2), a = rnz(R, -4, 4);
  let f;
  if (k === 0 && R.r() < 0.3) {   // evitable también si f(a) existe pero vale otra cosa
    const v = 2 * a + rnz(R, -3, 3);
    f = `<span style="white-space:nowrap">f(x) = ${fr(`x² − ${a * a}`, xm(a))} si x ≠ ${neg(a)}</span>; f(${neg(a)}) = ${neg(v)}`;
    return { q: S.m11.li_dc_q(f, neg(a)), kind: "choice", opts: S.m11.li_dc_o, correct: 0, shuffle: false, sol: S.m11.li_dc_s2(neg(2 * a), neg(v)) };
  }
  if (k === 0) f = `f(x) = ${fr(`x² − ${a * a}`, xm(a))}`;
  else if (k === 1) { const b = R.int(-4, 4); f = piece(lin(1, b), a, lin(1, b + rnz(R, -4, 4))); }
  else f = `f(x) = ${R.int(1, 9)}/(${xm(a)})`;
  return { q: S.m11.li_dc_q(f, neg(a)), kind: "choice", opts: S.m11.li_dc_o, correct: k, shuffle: false, sol: S.m11.li_dc_s[k] };
});
// Lo que pide el currículo y no se practicaba: estimar límites con una tabla o leerlos en una gráfica.
def("m11.li.grafica", (R, S, H) => {
  const T = S.m11.lg_t, a = R.int(-2, 2);
  const kind = R.pick(["salto", "agujero", "cont", "punto"]);
  const L1 = R.int(-3, 3); let L2 = L1, V = L1, defined = true;
  if (kind === "salto") { do L2 = R.int(-3, 3); while (L2 === L1); V = R.r() < 0.5 ? L1 : L2; }
  else if (kind === "agujero") defined = false;
  else if (kind === "punto") { do V = R.int(-3, 3); while (V === L1); }
  const SL = [-1, -0.5, 0.5, 1], m1 = R.pick(SL.filter(m => Math.abs(L1 - 3 * m) <= 4)), m2 = R.pick(SL.filter(m => Math.abs(L2 + 3 * m) <= 4));   // que no se salgan del dibujo
  if (R.r() < 0.35) {   // tabla de valores a cada lado de a
    const hs = [0.1, 0.01, 0.001], d = n => H.dec(n, 4);
    const left = hs.map(h => `f(${H.dec(a - h)}) = ${d(L1 - m1 * h)}`), right = hs.map(h => `f(${H.dec(a + h)}) = ${d(L2 + m2 * h)}`);
    const ok = L1 === L2 ? T.ex(neg(L1)) : T.noex;
    const others = [T.noex, T.ex(neg(L1)), T.ex(neg(L2)), T.ex(neg(L1 + 1)), T.ex("0")].filter((v, i, A) => v !== ok && A.indexOf(v) === i).slice(0, 3);
    const opts = R.shuffle([ok, ...others]);
    return { q: T.qt(neg(a), left.join("; "), right.join("; ")), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.st(neg(L1), neg(L2), L1 === L2) };
  }
  // gráfica: dos tramos rectos que llegan a (a, L1) y salen de (a, L2), con el punto (a, f(a))
  const W = 300, Hh = 220, X = x => 20 + (x - (a - 3)) * W / 6 + 10, Y = y => Hh / 2 - y * Hh / 9;
  const C = WA.SVG.C;
  let body = "";
  for (let i = -4; i <= 4; i++) body += `<line x1="30" y1="${Y(i)}" x2="${W + 30}" y2="${Y(i)}" stroke="#eee"/>`;
  for (let x = a - 3; x <= a + 3; x++) body += `<line x1="${X(x)}" y1="${Y(4.4)}" x2="${X(x)}" y2="${Y(-4.4)}" stroke="#eee"/>`;
  body += `<line x1="30" y1="${Y(0)}" x2="${W + 30}" y2="${Y(0)}" stroke="${C.dark}"/>`;
  if (0 >= a - 3 && 0 <= a + 3) body += `<line x1="${X(0)}" y1="${Y(4.4)}" x2="${X(0)}" y2="${Y(-4.4)}" stroke="${C.dark}"/>`;
  for (let x = a - 3; x <= a + 3; x++) if (x) body += WA.SVG.txt(X(x), Y(0) + 15, neg(x), 11, C.grey);
  for (const yv of [-4, -2, 2, 4]) body += WA.SVG.txt(X(Math.max(a - 3, Math.min(0, a + 3))) - 10, Y(yv) + 4, neg(yv), 11, C.grey, "end");
  const seg = (x1, y1, x2, y2) => `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${C.blue}" stroke-width="3"/>`;
  body += seg(a - 3, L1 - 3 * m1, a, L1) + seg(a, L2, a + 3, L2 + 3 * m2);
  const dot = (y, full) => `<circle cx="${X(a)}" cy="${Y(y)}" r="5" fill="${full ? C.blue : "#fff"}" stroke="${C.blue}" stroke-width="2.5"/>`;
  if (!(defined && V === L1)) body += dot(L1, false);
  if (L2 !== L1 && !(defined && V === L2)) body += dot(L2, false);
  if (defined) body += dot(V, true);
  const pic = WA.SVG.svg(W + 60, Hh, body, T.alt);
  const ask = R.int(0, 3);
  if (ask === 3) {
    const opts = T.yn.slice(), ok = L1 === L2 ? 0 : 1;
    return { q: T.qg(pic, T.ask[3](neg(a))), kind: "choice", opts, correct: ok, shuffle: false, sol: T.sg(neg(a), neg(L1), neg(L2), defined ? neg(V) : null, L1 === L2) };
  }
  if (ask === 2 && !defined) {
    return { q: T.qg(pic, T.ask[2](neg(a))), kind: "choice", opts: T.nodef(neg(L1)), correct: 0, shuffle: false, sol: T.sg(neg(a), neg(L1), neg(L2), null, true) };
  }
  const ans = [L1, L2, V][ask];
  return { q: T.qg(pic, T.ask[ask](neg(a))), kind: "int", ans, sol: T.sg(neg(a), neg(L1), neg(L2), defined ? neg(V) : null, L1 === L2) };
});
// Indeterminaciones que no tenían práctica: ∞ − ∞ con fracciones, k/0 tras simplificar (laterales) y raíces en −∞.
def("m11.li.mas", (R, S, H) => {
  const T = S.m11.lm_t, k = R.pick([0, 0, 1, 2]);
  if (k === 0) {   // a/(x − c) − 2ac/(x² − c²) = a/(x + c) → a/(2c)
    const c = rnz(R, -4, 4), a = rnz(R, -5, 5), v = F.make(a, 2 * c);
    const den2 = `x² − ${c * c}`, num2 = 2 * a * c;
    return { q: S.m11.li_cero_q(lim(neg(c), `(${neg(a)}/(${xm(c)}) ${num2 < 0 ? "+" : "−"} ${Math.abs(num2)}/(${den2}))`)), kind: "frac", ans: v,
      sol: T.s0(`(${neg(a)}(${xm(-c)}) ${num2 < 0 ? "+" : "−"} ${Math.abs(num2)}) / (${den2})`, `${a === 1 ? "" : a === -1 ? "−" : neg(a)}(${xm(c)}) / [(${xm(c)})(${xm(-c)})]`, `${neg(a)}/(${xm(-c)})`, neg(c), F.html(v, H)) };
  }
  if (k === 1) {   // (x − a)(x − b)/(x − a)² = (x − b)/(x − a): k/0 → laterales ±∞, el límite no existe
    let a, b; do { a = rnz(R, -4, 4); b = R.int(-4, 4); } while (a === b);
    const num = polyHtml([1, -(a + b), a * b]), den = polyHtml([1, -2 * a, a * a]), kk = a - b;
    const ok = T.opts[kk > 0 ? 0 : 1], opts = R.shuffle(T.opts.slice());
    return { q: S.m11.li_cero_q(lim(neg(a), fr(num, den))), kind: "choice", opts, correct: opts.indexOf(ok),
      sol: T.s1(`(${xm(a)})(${xm(b)})`, `(${xm(a)})²`, `(${xm(b)})/(${xm(a)})`, neg(a), neg(kk), kk > 0) };
  }
  // √(x² + q)/(px + r) cuando x → −∞: √(x²) = |x| = −x
  const p = rnz(R, -4, 4), q = R.int(1, 9), r = R.int(-6, 6), v = F.make(-1, p);
  return { q: S.m11.li_cero_q(lim("−∞", `√(x² + ${q}) / (${lin(p, r)})`)), kind: "frac", ans: v, sol: T.s2(q, lin(p, r), neg(p), F.html(v, H)) };
});
// Asíntotas (además de m11.li.asint, que usa también Mates 12): dos verticales, el «agujero» y la posición de la curva.
def("m11.li.asint2", (R, S, H) => {
  const T = S.m11.la_t, k = R.int(0, 2);
  if (k === 0) {   // k/(x² − b²): dos verticales, horizontal y = 0
    const b = R.int(1, 5), kk = rnz(R, -6, 6), ok = T.o0(b), opts = R.shuffle([ok, T.o1(b), T.o2(b), T.o3(b * b)]);
    return { q: T.q(`${kk}/(x² − ${b * b})`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s0(b * b, b) };
  }
  if (k === 1) {   // (x − a)/(x² − a²) = 1/(x + a): en x = a hay un agujero, no una asíntota
    const a = rnz(R, -5, 5), ok = T.v1(neg(-a)), opts = R.shuffle([ok, T.v2(neg(a), neg(-a)), T.v1(neg(a)), T.v0]);
    return { q: T.qv(`(${xm(a)})/(x² − ${a * a})`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s1(xm(a), xm(-a), neg(a), neg(-a)) };
  }
  // posición respecto a la horizontal: (ax + b)/(x − c) − a = (b + ac)/(x − c)
  let a, b, c; do { a = rnz(R, -4, 4); b = R.int(-8, 8); c = R.int(-4, 4); } while (b + a * c === 0);
  const res = b + a * c, plus = R.r() < 0.5, above = plus ? res > 0 : res < 0;
  return { q: T.qp(fr(lin(a, b), xm(c)), neg(a), plus ? "+∞" : "−∞"), kind: "choice", opts: T.pos, correct: above ? 0 : 1, shuffle: false,
    sol: T.sp(a < 0 ? `(${neg(a)})` : neg(a), fr(lin(a, b), xm(c)), `${neg(res)}/${wr(xm(c))}`, plus, res > 0, above) };
});
})();
