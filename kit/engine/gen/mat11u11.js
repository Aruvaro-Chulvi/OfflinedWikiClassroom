/* WikiAula — Matemáticas, Grado 11 · Unidad 11: Aplicaciones de la derivada.
   Textos: i18n/<lang>/mat11u11.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, polyHtml } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
const dpoly = cs => cs.slice(0, -1).map((c, i) => c * (cs.length - 1 - i));
const xm = a => a === 0 ? "x" : a > 0 ? `x − ${a}` : `x + ${-a}`;

// Cúbica con f′(x) = 3a(x − p)(x − q), p < q, coeficientes enteros
function cubic(R) {
  let a, p, q;
  do { a = rnz(R, -2, 2); p = R.int(-4, 3); q = R.int(p + 1, 5); } while ((3 * a * (p + q)) % 2);
  return { a, p, q, cs: [a, -3 * a * (p + q) / 2, 3 * a * p * q, R.int(-6, 6)] };
}
// Un valor de prueba en cada tramo de f′(x) = 3a(x − p)(x − q), como en la lección
function tests(H, a, p, q) {
  const t1 = p < 0 && q > 0 ? 0 : q - p >= 2 ? p + 1 : (p + q) / 2;
  return [p - 1, t1, q + 1].map(t => { const v = 3 * a * (t - p) * (t - q); return `f′(${H.dec(t)}) = ${H.dec(v)} ${v > 0 ? "&gt;" : "&lt;"} 0`; }).join("; ");
}
const cf = (n, v) => n === 1 ? v : n === -1 ? "−" + v : neg(n) + v;                         // 3a, −a, a
const st = (n, v) => (n < 0 ? " − " : " + ") + (Math.abs(n) === 1 && v ? "" : Math.abs(n)) + v;   // término con signo
const par = n => n < 0 ? `(${neg(n)})` : String(n);

def("m11.ap.extremos", (R, S, H) => {
  const { a, p, q, cs } = cubic(R), d = dpoly(cs);
  const mx = a > 0 ? p : q, mn = a > 0 ? q : p;
  return { q: S.m11.ap_ex_q(polyHtml(cs)), kind: "fields", fields: [{ label: S.m11.ap_ex_f[0], ans: mx }, { label: S.m11.ap_ex_f[1], ans: mn }],
    sol: S.m11.ap_ex_s(polyHtml(d), `${neg(3 * a)}${[xm(p), xm(q)].sort((u, v) => (v === "x") - (u === "x")).map(f => f === "x" ? f : `(${f})`).join("")}`, neg(p), neg(q), tests(H, a, p, q), neg(mx), neg(ev(cs, mx)), neg(mn), neg(ev(cs, mn))) };
});

def("m11.ap.crec", (R, S, H) => {
  const { a, p, q, cs } = cubic(R), m = H.dec((p + q) / 2), sm = Number.isInteger((p + q) / 2) ? ", " : "; ";   // con decimales, punto y coma: (−0,5; +∞)
  const P = neg(p), Q = neg(q);
  const A = S.m11.ap_cr_o(`(−∞, ${P}) ∪ (${Q}, +∞)`, `(${P}, ${Q})`), B = S.m11.ap_cr_o(`(${P}, ${Q})`, `(−∞, ${P}) ∪ (${Q}, +∞)`);
  const C = S.m11.ap_cr_o(`(−∞${sm}${m})`, `(${m}${sm}+∞)`), Dd = S.m11.ap_cr_o(`(${m}${sm}+∞)`, `(−∞${sm}${m})`);
  const ok = a > 0 ? A : B, opts = R.shuffle([A, B, C, Dd]);
  const out = `(−∞, ${P}) ∪ (${Q}, +∞)`, ins = `(${P}, ${Q})`;
  return { q: S.m11.ap_cr_q(polyHtml(cs)), kind: "choice", opts, correct: opts.indexOf(ok),
    sol: S.m11.ap_cr_s(polyHtml(dpoly(cs)), P, Q, tests(H, a, p, q), a > 0 ? out : ins, a > 0 ? ins : out) };
});

// Extremos con parámetros (tipo PAU): hallar a y b sabiendo dónde está el extremo
def("m11.ap.param", (R, S, H) => {
  const k = R.int(0, 2);
  let f, d, e1, e2, d2, v2, A, B, p, y;
  if (k === 0) {   // x³ + ax² + b
    p = R.pick([-4, -2, 2, 4]); A = -3 * p / 2; y = R.int(-9, 9); B = y + p ** 3 / 2;
    f = "x³ + ax² + b"; d = "3x² + 2ax";
    e1 = `3 · ${par(p)}² + 2a · ${par(p)} = ${3 * p * p}${st(2 * p, "a")} = 0 → <b>a = ${neg(A)}</b>`;
    e2 = `${par(p)}³ + ${par(A)} · ${par(p)}² + b = ${neg(y)} → ${neg(p ** 3)}${st(A * p * p, "")} + b = ${neg(y)} → <b>b = ${neg(B)}</b>`;
    d2 = `6x${st(2 * A, "")}`; v2 = 6 * p + 2 * A;
  } else if (k === 1) {   // ax³ + bx
    p = R.pick([-2, -1, 1, 2]); A = rnz(R, -2, 2); y = -2 * A * p ** 3; B = -3 * A * p * p;
    f = "ax³ + bx"; d = "3ax² + b";
    e1 = `3a · ${par(p)}² + b = ${cf(3 * p * p, "a")} + b = 0, es decir, b = ${cf(-3 * p * p, "a")}`;
    e2 = `a · ${par(p)}³ + b · ${par(p)} = ${neg(y)}; sustituyendo b: ${cf(p ** 3, "a")}${st(-3 * p ** 3, "a")} = ${cf(-2 * p ** 3, "a")} = ${neg(y)} → <b>a = ${neg(A)}</b>, y b = ${neg(-3 * p * p)} · ${par(A)} = <b>${neg(B)}</b>`;
    d2 = `6ax = ${cf(6 * A, "x")}`; v2 = 6 * A * p;
  } else {   // x² + ax + b
    p = rnz(R, -5, 5); A = -2 * p; y = R.int(-8, 8); B = y + p * p;
    f = "x² + ax + b"; d = "2x + a";
    e1 = `2 · ${par(p)} + a = 0 → <b>a = ${neg(A)}</b>`;
    e2 = `${par(p)}² + ${par(A)} · ${par(p)} + b = ${neg(y)} → ${p * p}${st(-2 * p * p, "")} + b = ${neg(y)} → <b>b = ${neg(B)}</b>`;
    d2 = "2"; v2 = 2;
  }
  return { q: S.m11.ap_pa_q(f, `(${neg(p)}, ${neg(y)})`), kind: "fields", fields: [{ label: "a =", ans: A }, { label: "b =", ans: B }],
    sol: S.m11.ap_pa_s(neg(p), neg(y), d, e1, `(${neg(p)}, ${neg(y)})`, e2, d2, neg(v2), v2 < 0) };
});

def("m11.ap.inflexion", (R, S, H) => {
  if (R.r() < 0.55) {
    const a = rnz(R, -2, 2), k = R.int(-3, 3), cs = [a, -3 * a * k, R.int(-6, 6), R.int(-6, 6)];
    return { q: S.m11.ap_in_q(polyHtml(cs)), kind: "fields", fields: [{ label: "x", ans: k }, { label: "y", ans: ev(cs, k) }],
      sol: S.m11.ap_in_s(polyHtml(dpoly(dpoly(cs))), neg(k), neg(ev(cs, k))) };
  }
  const opts = S.m11.ap_cv_o;
  if (R.r() < 0.3) {   // a·x⁴ + cx + d: f″ = 12a·x² no cambia de signo
    const a = rnz(R, -2, 2), cs = [a, 0, 0, R.int(-5, 5), R.int(-5, 5)];
    return { q: S.m11.ap_cv_q(polyHtml(cs)), kind: "choice", opts: opts("0"), correct: a > 0 ? 2 : 3, shuffle: false, sol: S.m11.ap_cv4_s(polyHtml(dpoly(dpoly(cs))), a > 0) };
  }
  const a = rnz(R, -2, 2), k = R.int(-3, 3), cs = [a, -3 * a * k, R.int(-6, 6), R.int(-6, 6)];
  return { q: S.m11.ap_cv_q(polyHtml(cs)), kind: "choice", opts: opts(neg(k)), correct: a > 0 ? 0 : 1, shuffle: false,
    sol: S.m11.ap_cv_s(polyHtml(dpoly(dpoly(cs))), neg(k), a > 0) };
});

def("m11.ap.lectura", (R, S, H) => {
  const k = R.int(0, 5), c = R.int(-4, 5);
  const ans = [0, 1, 0, 1, 2, 2][k];
  return { q: S.m11.ap_le_q(S.m11.ap_le_c[k](neg(c)), neg(c)), kind: "choice", opts: S.m11.ap_le_o, correct: ans, shuffle: false, sol: S.m11.ap_le_s[k] };
});

def("m11.ap.optim", (R, S, H) => {
  const k = R.int(0, 5);
  if (k === 0) { const s = R.int(5, 30) * 2; return { q: S.m11.ap_op_q[0](s), kind: "num", ans: s / 2, sol: S.m11.ap_op_s[0](s, s / 2) }; }
  if (k === 1) { const p = R.int(3, 25) * 4; return { q: S.m11.ap_op_q[1](p), kind: "num", ans: (p / 4) ** 2, sol: S.m11.ap_op_s[1](p, p / 4, (p / 4) ** 2) }; }
  if (k === 2) { const l = R.int(5, 30) * 4; return { q: S.m11.ap_op_q[2](l), kind: "num", ans: l / 4, sol: S.m11.ap_op_s[2](l, l / 4, l / 2, H.n(l * l / 8)) }; }
  if (k === 3) { const a = R.int(2, 10) * 6; return { q: S.m11.ap_op_q[3](a), kind: "num", ans: a / 6, sol: S.m11.ap_op_s[3](a, a / 6, H.n(a / 6 * (a - a / 3) ** 2)) }; }
  if (k === 4) { const r = R.int(2, 15), p = r * r; return { q: S.m11.ap_op_q[4](p), kind: "num", ans: 2 * r, sol: S.m11.ap_op_s[4](p, r, 2 * r) }; }
  const a = R.int(1, 5), x = R.int(3, 40), b = 2 * a * x, c = R.int(10, 200);   // B(x) = −ax² + bx − c
  return { q: S.m11.ap_op_q[5](polyHtml([-a, b, -c])), kind: "num", ans: x, sol: S.m11.ap_op_s[5](polyHtml([-2 * a, b]), x, H.n(a * x * x - c)) };
});
})();
