/* WikiAula — Historia del mundo contemporáneo, Grado 11: bancos y cálculos (crecimientos y porcentajes).
   Textos y bancos en i18n/<lang>/hmc11.js (S.hmc11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("hmc11.ar", (R, S) => B.mixed(S.hmc11.ar, R));
def("hmc11.ilus", (R, S) => B.mixed(S.hmc11.ilus, R));
def("hmc11.eeuu", (R, S) => B.mixed(S.hmc11.eeuu, R));
def("hmc11.revfr", (R, S) => B.mixed(S.hmc11.revfr, R));
def("hmc11.napo", (R, S) => B.mixed(S.hmc11.napo, R));
def("hmc11.olas", (R, S) => B.mixed(S.hmc11.olas, R));
def("hmc11.nac", (R, S) => B.mixed(S.hmc11.nac, R));
def("hmc11.al", (R, S) => B.mixed(S.hmc11.al, R));
def("hmc11.usa", (R, S) => B.mixed(S.hmc11.usa, R));
def("hmc11.ri", (R, S) => B.mixed(S.hmc11.ri, R));
def("hmc11.ri2", (R, S) => B.mixed(S.hmc11.ri2, R));
def("hmc11.obr", (R, S) => B.mixed(S.hmc11.obr, R));
def("hmc11.soc", (R, S) => B.mixed(S.hmc11.soc, R));
def("hmc11.imp", (R, S) => B.mixed(S.hmc11.imp, R));
def("hmc11.asia", (R, S) => B.mixed(S.hmc11.asia, R));
def("hmc11.gm1", (R, S) => B.mixed(S.hmc11.gm1, R));
def("hmc11.rus", (R, S) => B.mixed(S.hmc11.rus, R));
def("hmc11.eco", (R, S) => B.mixed(S.hmc11.eco, R));
def("hmc11.tot", (R, S) => B.mixed(S.hmc11.tot, R));
def("hmc11.gm2", (R, S) => B.mixed(S.hmc11.gm2, R));
def("hmc11.holo", (R, S) => B.mixed(S.hmc11.holo, R));
def("hmc11.cons", (R, S) => B.mixed(S.hmc11.cons, R));

def("hmc11.crec", (R, S) => {
  const T = S.hmc11, a = R.pick([20, 40, 50, 80, 100, 120, 200]), pc = R.pick([10, 20, 25, 40, 50, 60, 75, 100, 150]), b = a + a * pc / 100;
  return { q: T.cr_q(a, b), kind: "num", ans: pc, tol: 0.01, sol: T.cr_s(a, b, pc) };
});
def("hmc11.pct", (R, S) => {
  const T = S.hmc11, e = R.pick(T.pc_data), pc = Math.round(e[2] / e[1] * 100);
  return { q: T.pc_q(e[0], e[1], e[2]), kind: "num", ans: pc, tol: 1, sol: T.pc_s(e[1], e[2], pc) };
});
})();
