/* WikiAula — Geografía e Historia, Grado 10 (4.º ESO): bancos y cálculos (duraciones, caídas porcentuales).
   Textos y bancos en i18n/<lang>/gh10.js (S.gh10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("gh10.ilustr", (R, S) => B.mixed(S.gh10.ilustr, R));
def("gh10.revfr", (R, S) => B.mixed(S.gh10.revfr, R));
def("gh10.liberal", (R, S) => B.mixed(S.gh10.liberal, R));
def("gh10.indep", (R, S) => B.mixed(S.gh10.indep, R));
def("gh10.industr", (R, S) => B.mixed(S.gh10.industr, R));
def("gh10.obrero", (R, S) => B.mixed(S.gh10.obrero, R));
def("gh10.imper", (R, S) => B.mixed(S.gh10.imper, R));
def("gh10.gm1", (R, S) => B.mixed(S.gh10.gm1, R));
def("gh10.rusia", (R, S) => B.mixed(S.gh10.rusia, R));
def("gh10.crisis29", (R, S) => B.mixed(S.gh10.crisis29, R));
def("gh10.totalit", (R, S) => B.mixed(S.gh10.totalit, R));
def("gh10.gm2", (R, S) => B.mixed(S.gh10.gm2, R));
def("gh10.holo", (R, S) => B.mixed(S.gh10.holo, R));
def("gh10.gfria", (R, S) => B.mixed(S.gh10.gfria, R));
def("gh10.descol", (R, S) => B.mixed(S.gh10.descol, R));
def("gh10.modelos", (R, S) => B.mixed(S.gh10.modelos, R));
def("gh10.caida", (R, S) => B.mixed(S.gh10.caida, R));
def("gh10.actual", (R, S) => B.mixed(S.gh10.actual, R));
def("gh10.derechos", (R, S) => B.mixed(S.gh10.derechos, R));
def("gh10.retos", (R, S) => B.mixed(S.gh10.retos, R));
def("gh10.arte19", (R, S) => B.mixed(S.gh10.arte19, R));
def("gh10.vanguard", (R, S) => B.mixed(S.gh10.vanguard, R));

def("gh10.indice", (R, S) => {
  const T = S.gh10, a = R.int(10, 50) * 10, pc = R.pick([20, 25, 40, 50, 60, 75, 80]), b = a - a * pc / 100;
  return { q: T.in_q(a, b), kind: "num", ans: pc, tol: 0.01, sol: T.in_s(a, b, pc) };
});
def("gh10.duracion", (R, S) => {
  const T = S.gh10, e = R.pick(T.du_data);
  return { q: T.du_q(e[0], e[1], e[2]), kind: "int", ans: e[2] - e[1], sol: T.du_s(e[1], e[2]) };
});
})();
