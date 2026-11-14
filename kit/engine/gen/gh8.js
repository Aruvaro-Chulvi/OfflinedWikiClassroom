/* WikiAula — Geografía e Historia, Grado 8 (2.º ESO): bancos y cálculos (siglos, demografía, densidad).
   Textos y bancos en i18n/<lang>/gh8.js (S.gh8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("gh8.bizancio", (R, S) => B.mixed(S.gh8.bizancio, R));
def("gh8.islam", (R, S) => B.mixed(S.gh8.islam, R));
def("gh8.feudal", (R, S) => B.mixed(S.gh8.feudal, R));
def("gh8.vida", (R, S) => B.mixed(S.gh8.vida, R));
def("gh8.ciudad", (R, S) => B.mixed(S.gh8.ciudad, R));
def("gh8.iglesia", (R, S) => B.mixed(S.gh8.iglesia, R));
def("gh8.arte", (R, S) => B.mixed(S.gh8.arte, R));
def("gh8.crisis", (R, S) => B.mixed(S.gh8.crisis, R));
def("gh8.asia", (R, S) => B.mixed(S.gh8.asia, R));
def("gh8.africa", (R, S) => B.mixed(S.gh8.africa, R));
def("gh8.america", (R, S) => B.mixed(S.gh8.america, R));
def("gh8.renac", (R, S) => B.mixed(S.gh8.renac, R));
def("gh8.reforma", (R, S) => B.mixed(S.gh8.reforma, R));
def("gh8.viaje", (R, S) => B.mixed(S.gh8.viaje, R));
def("gh8.colonia", (R, S) => B.mixed(S.gh8.colonia, R));
def("gh8.asiamod", (R, S) => B.mixed(S.gh8.asiamod, R));
def("gh8.absol", (R, S) => B.mixed(S.gh8.absol, R));
def("gh8.barroco", (R, S) => B.mixed(S.gh8.barroco, R));
def("gh8.ciencia", (R, S) => B.mixed(S.gh8.ciencia, R));
def("gh8.demo", (R, S) => B.mixed(S.gh8.demo, R));
def("gh8.migra", (R, S) => B.mixed(S.gh8.migra, R));
def("gh8.urbano", (R, S) => B.mixed(S.gh8.urbano, R));

def("gh8.siglo", (R, S) => {
  const T = S.gh8, y = R.int(300, 1800), c = Math.ceil(y / 100);
  return { q: T.si_q(y), kind: "int", ans: c, sol: T.si_s(y, c) };
});
def("gh8.cosecha", (R, S) => {
  const T = S.gh8, n = R.int(3, 8) * 10, d = n / 10, r = R.int(2, 4) * 3 + d % 3, s = R.int(3, 6), q = n - d - r - s;
  return { q: T.co_q(n, r, s), kind: "int", ans: q, sol: T.co_s(n, d, r, s, q) };
});
def("gh8.peste", (R, S, H) => {
  const T = S.gh8, p = R.int(2, 12) * 5000, k = R.pick([30, 35, 40, 45, 50]), m = p * k / 100;
  return { q: T.pe_q(H.n(p), k), kind: "int", ans: p - m, sol: T.pe_s(H.n(p), k, H.n(m), H.n(p - m)) };
});
def("gh8.densidad", (R, S, H) => {
  const T = S.gh8, d = R.pick([5, 10, 20, 25, 40, 50, 80, 100, 120, 200, 250, 400]), a = R.pick([10000, 20000, 50000, 100000, 200000, 500000]);
  return { q: T.de_q(H.n(d * a), H.n(a)), kind: "int", ans: d, sol: T.de_s(H.n(d * a), H.n(a), d) };
});
def("gh8.tasa", (R, S, H) => {
  const T = S.gh8, pop = R.pick([2, 4, 5, 10, 20, 40]) * 1000000, t = R.int(6, 40), n = pop / 1000 * t, mort = R.int(0, 1) === 1;
  return { q: T.ta_q(mort, H.n(n), H.n(pop)), kind: "int", ans: t, sol: T.ta_s(H.n(n), H.n(pop), t) };
});
def("gh8.saldo", (R, S, H) => {
  const T = S.gh8, i = R.int(5, 90) * 10000, e = R.int(5, 90) * 10000;
  return { q: T.sa_q(H.n(i), H.n(e)), kind: "int", ans: i - e, sol: T.sa_s(H.n(i), H.n(e), i - e) };
});
def("gh8.porc", (R, S) => {
  const T = S.gh8, tot = R.pick([10, 20, 25, 40, 50]), pc = R.int(4, 19) * 5, u = tot * pc / 100;
  return { q: T.po_q(tot, u), kind: "num", ans: pc, tol: 0.01, sol: T.po_s(u, tot, pc) };
});
})();
