/* WikiAula — Economía y emprendimiento, Grado 10: emprendimiento, Canvas, DAFO, formas jurídicas, marketing, costes, interés compuesto,
   préstamos, sistema financiero, contrato, nómina, sector público y sostenibilidad. Textos y bancos en i18n/<lang>/eco10.js (S.eco10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("eco10.cualidad", (R, S) => B.mixed(S.eco10.cualidad, R));
def("eco10.canvas", (R, S) => B.mixed(S.eco10.canvas, R));
def("eco10.dafo", (R, S) => B.mixed(S.eco10.dafo, R));
def("eco10.forma", (R, S) => B.mixed(S.eco10.forma, R));
def("eco10.4p", (R, S) => B.mixed(S.eco10.p4, R));
def("eco10.financiero", (R, S) => B.mixed(S.eco10.financiero, R));
def("eco10.contrato", (R, S) => B.mixed(S.eco10.contrato, R));
def("eco10.sostenible", (R, S) => B.mixed(S.eco10.sostenible, R));

def("eco10.costes", (R, S) => {
  const T = S.eco10, cf = R.pick([500, 800, 1000, 1200, 2000, 3000]), cv = R.int(1, 6), p = cv + R.int(2, 8), q = R.pick([100, 200, 250, 300, 400, 500]);
  const b = p * q - (cf + cv * q);
  return { q: T.co_q(cf, cv, p, q), kind: "int", ans: b, sol: T.co_s(cf, cv, p, q, b) };
});
def("eco10.umbral", (R, S) => {
  const T = S.eco10, m = R.int(2, 10), q = R.pick([50, 100, 150, 200, 250, 300, 400, 500]), cf = m * q, cv = R.int(1, 8), p = cv + m;
  return { q: T.um_q(cf, p, cv), kind: "int", ans: q, sol: T.um_s(cf, p, cv, q) };
});
def("eco10.compuesto", (R, S, H) => {
  const T = S.eco10, k = R.int(0, 1);
  if (k === 0) { const C = R.pick([1000, 2000, 5000, 10000]), r = R.pick([2, 5, 10]), t = R.int(2, 3), V = +(C * Math.pow(1 + r / 100, t)).toFixed(2);
    return { q: T.cp_q1(C, r, t), kind: "num", ans: V, tol: 0.01, ansHtml: WA.MATH.eur(V, H) + " €", sol: T.cp_s1(C, r, t, V) }; }
  const r = R.pick([2, 3, 4, 6, 8, 9, 12]);
  return { q: T.cp_q2(r), kind: "int", ans: 72 / r, sol: T.cp_s2(r) };
});
def("eco10.prestamo", (R, S) => {
  const T = S.eco10, C = R.pick([600, 1000, 1500, 2000, 3000]), n = R.pick([12, 18, 24, 36]), extra = R.pick([5, 8, 10, 12, 15]), cuota = Math.ceil(C * (1 + extra / 100) / n);
  const tot = cuota * n;
  if (R.int(0, 1)) return { q: T.pr_q1(C, n, cuota), kind: "int", ans: tot - C, sol: T.pr_s1(n, cuota, tot, C) };
  return { q: T.pr_q2(C, n, cuota), kind: "int", ans: tot, sol: T.pr_s2(n, cuota, tot) };
});
def("eco10.nomina", (R, S, H) => {
  const T = S.eco10, b = R.pick([1200, 1400, 1500, 1600, 1800, 2000, 2400]), ss = 6.5, irpf = R.pick([2, 8, 10, 12, 15]), ded = +(b * (ss + irpf) / 100).toFixed(2), net = +(b - ded).toFixed(2);
  return { q: T.no_q(b, ss, irpf), kind: "num", ans: net, tol: 0.01, ansHtml: WA.MATH.eur(net, H) + " €", sol: T.no_s(b, ss, irpf, ded, net) };
});
def("eco10.publico", (R, S) => {
  const T = S.eco10, ing = R.int(40, 90) * 10, gas = ing + R.pick([-40, -20, 20, 30, 40, 60, 80]), d = gas - ing;
  return { q: T.pu_q(ing, gas), kind: "int", ans: Math.abs(d), sol: T.pu_s(ing, gas, d) };
});
})();
