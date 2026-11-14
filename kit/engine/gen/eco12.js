/* WikiAula — Empresa y modelos de negocio, Grado 12: entorno, estrategia, modelos, productividad, costes, inventarios, marketing, VAN,
   financiación, balance, resultados, ratios, organización, RSC y trámites. Textos y bancos en i18n/<lang>/eco12.js (S.eco12). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("eco12.pestel", (R, S) => B.mixed(S.eco12.pestel, R));
def("eco12.porter", (R, S) => B.mixed(S.eco12.porter, R));
def("eco12.estrategia", (R, S) => B.mixed(S.eco12.estrategia, R));
def("eco12.modelo", (R, S) => B.mixed(S.eco12.modelo, R));
def("eco12.segmento", (R, S) => B.mixed(S.eco12.segmento, R));
def("eco12.ciclo", (R, S) => B.mixed(S.eco12.ciclo, R));
def("eco12.precio", (R, S) => B.mixed(S.eco12.precio, R));
def("eco12.financiacion", (R, S) => B.mixed(S.eco12.financiacion, R));
def("eco12.balance", (R, S) => B.mixed(S.eco12.balance, R));
def("eco12.rrhh", (R, S) => B.mixed(S.eco12.rrhh, R));
def("eco12.rsc", (R, S) => B.mixed(S.eco12.rsc, R));
def("eco12.tramites", (R, S) => B.mixed(S.eco12.tramites, R));

def("eco12.productividad", (R, S) => {
  const T = S.eco12, k = R.int(0, 1);
  if (k === 0) { const c = R.pick([40000, 50000, 80000, 100000]), g = R.pick([0.8, 1.1, 1.2, 1.25, 1.5]), v = c * g; return { q: T.pd_q1(v, c), kind: "num", ans: g, tol: 0.01, sol: T.pd_s1(v, c, g) }; }
  const p0 = R.pick([4, 5, 8, 10, 20]), pct = R.pick([-10, 5, 10, 20, 25, 50]), p1 = +(p0 * (1 + pct / 100)).toFixed(2);
  return { q: T.pd_q2(p0, p1), kind: "num", ans: pct, tol: 0.05, sol: T.pd_s2(p0, p1, pct) };
});
def("eco12.umbral", (R, S) => {
  const T = S.eco12, m = R.pick([2, 4, 5, 8, 10, 20]), q = R.pick([500, 1000, 1500, 2000, 3000]), cf = m * q, cv = R.int(1, 10), p = cv + m;
  return { q: T.um_q(cf, p, cv), kind: "int", ans: q, sol: T.um_s(cf, p, cv, q) };
});
def("eco12.comprar", (R, S) => {
  const T = S.eco12, cvu = R.pick([1, 2, 3, 5]), d = R.pick([1, 2, 4, 5]), pc = cvu + d, q0 = R.pick([1000, 2000, 5000, 10000]), cf = q0 * d, k = R.int(0, 1);
  if (k === 0) return { q: T.cm_q1(cf, cvu, pc), kind: "int", ans: q0, sol: T.cm_s1(cf, pc, cvu, q0) };
  const need = R.pick([q0 / 2, q0 * 2]);
  return { q: T.cm_q2(cf, cvu, pc, need), kind: "choice", opts: [T.producir, T.comprarlo], correct: need > q0 ? 0 : 1, shuffle: false, sol: T.cm_s2(q0, need) };
});
def("eco12.beneficio", (R, S) => {
  const T = S.eco12, cf = R.pick([2000, 5000, 10000]), cv = R.int(2, 8), p = cv + R.int(3, 10), q = R.pick([500, 1000, 2000, 3000]);
  return { q: T.be_q(cf, cv, p, q), kind: "int", ans: p * q - cf - cv * q, sol: T.be_s(cf, cv, p, q) };
});
def("eco12.inventario", (R, S) => {
  const T = S.eco12, d = R.pick([10, 20, 25, 40, 50, 80]), t = R.int(2, 7), ss = R.pick([20, 30, 50, 60, 100]);
  return { q: T.in_q(d, t, ss), kind: "int", ans: d * t + ss, sol: T.in_s(d, t, ss) };
});
def("eco12.cuota", (R, S) => {
  const T = S.eco12, tot = R.pick([200, 500, 800, 1000, 2000]), pct = R.pick([5, 10, 12, 15, 20, 25, 30, 40]), v = tot * pct / 100;
  return { q: T.cu_q(v, tot), kind: "num", ans: pct, tol: 0.05, sol: T.cu_s(v, tot, pct) };
});
def("eco12.van", (R, S, H) => {
  const T = S.eco12, k = R.pick([5, 10, 20]), n = R.int(1, 2), A = R.pick([1000, 2000, 5000, 10000]);
  const pv = n === 1 ? [A * R.pick([0.8, 1, 1.2])] : [A * 0.5, A * R.pick([0.4, 0.5, 0.6, 0.7])];
  const Q = pv.map((v, i) => +(v * Math.pow(1 + k / 100, i + 1)).toFixed(2));
  const van = +(-A + pv.reduce((a, b) => a + b, 0)).toFixed(2);
  return { q: T.va_q(A, Q, k), kind: "num", ans: van, tol: 1, ansHtml: WA.MATH.eur(van, H) + " €", sol: T.va_s(A, Q, k, pv, van) };
});
def("eco12.payback", (R, S) => {
  const T = S.eco12, f = R.pick([2000, 2500, 4000, 5000]), y = R.int(2, 5), A = f * y;
  return { q: T.pb_q(A, f), kind: "int", ans: y, sol: T.pb_s(A, f, y) };
});
def("eco12.patrimonio", (R, S) => {
  const T = S.eco12, A = R.pick([100, 150, 200, 300, 500]) * 1000, p = R.pick([0.3, 0.4, 0.5, 0.6]), P = A * p, k = R.int(0, 1);
  if (k === 0) return { q: T.pa_q1(A, P), kind: "int", ans: A - P, sol: T.pa_s1(A, P) };
  const ac = R.pick([60, 80, 90, 120]) * 1000, pc = R.pick([30, 40, 50, 60, 100]) * 1000;
  return { q: T.pa_q2(ac, pc), kind: "int", ans: ac - pc, sol: T.pa_s2(ac, pc) };
});
def("eco12.resultados", (R, S) => {
  const T = S.eco12, v = R.pick([200, 300, 500, 800]) * 1000, g = v - R.pick([40, 60, 80, 100]) * 1000, i = R.pick([5, 10, 20]) * 1000, bai = v - g - i, bn = bai * 0.75;
  return { q: T.re_q(v, g, i), kind: "int", ans: bn, sol: T.re_s(v, g, i, bai, bn) };
});
def("eco12.ratio", (R, S) => {
  const T = S.eco12, k = R.int(0, 3);
  if (k === 0) { const pc = R.pick([20, 40, 50, 80]) * 1000, r = R.pick([0.8, 1.2, 1.5, 2, 2.5]), ac = pc * r; return { q: T.ra_q1(ac, pc), kind: "num", ans: r, tol: 0.01, sol: T.ra_s1(ac, pc, r) }; }
  if (k === 1) { const tot = R.pick([200, 300, 400, 500]) * 1000, r = R.pick([0.3, 0.4, 0.5, 0.6, 0.7]), p = tot * r; return { q: T.ra_q2(p, tot), kind: "num", ans: r, tol: 0.01, sol: T.ra_s2(p, tot, r) }; }
  if (k === 2) { const a = R.pick([200, 300, 400, 500]) * 1000, r = R.pick([5, 8, 10, 12, 15]), b = a * r / 100; return { q: T.ra_q3(b, a), kind: "num", ans: r, tol: 0.05, sol: T.ra_s3(b, a, r) }; }
  const pn = R.pick([100, 150, 200, 250]) * 1000, r = R.pick([4, 6, 8, 10, 12.5, 15]), bn = pn * r / 100;
  return { q: T.ra_q4(bn, pn), kind: "num", ans: r, tol: 0.05, sol: T.ra_s4(bn, pn, r) };
});
})();
