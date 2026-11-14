/* WikiAula — Historia del mundo contemporáneo, Grado 12: bancos y cálculos (duraciones y porcentajes).
   Textos y bancos en i18n/<lang>/hmc12.js (S.hmc12). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("hmc12.bloq", (R, S) => B.mixed(S.hmc12.bloq, R));
def("hmc12.conf", (R, S) => B.mixed(S.hmc12.conf, R));
def("hmc12.fases", (R, S) => B.mixed(S.hmc12.fases, R));
def("hmc12.fin", (R, S) => B.mixed(S.hmc12.fin, R));
def("hmc12.asia", (R, S) => B.mixed(S.hmc12.asia, R));
def("hmc12.afr", (R, S) => B.mixed(S.hmc12.afr, R));
def("hmc12.op", (R, S) => B.mixed(S.hmc12.op, R));
def("hmc12.tm", (R, S) => B.mixed(S.hmc12.tm, R));
def("hmc12.occ", (R, S) => B.mixed(S.hmc12.occ, R));
def("hmc12.neo", (R, S) => B.mixed(S.hmc12.neo, R));
def("hmc12.este", (R, S) => B.mixed(S.hmc12.este, R));
def("hmc12.china", (R, S) => B.mixed(S.hmc12.china, R));
def("hmc12.al1", (R, S) => B.mixed(S.hmc12.al1, R));
def("hmc12.al2", (R, S) => B.mixed(S.hmc12.al2, R));
def("hmc12.orden", (R, S) => B.mixed(S.hmc12.orden, R));
def("hmc12.ue", (R, S) => B.mixed(S.hmc12.ue, R));
def("hmc12.glob", (R, S) => B.mixed(S.hmc12.glob, R));
def("hmc12.xxi", (R, S) => B.mixed(S.hmc12.xxi, R));
def("hmc12.soc", (R, S) => B.mixed(S.hmc12.soc, R));
def("hmc12.tec", (R, S) => B.mixed(S.hmc12.tec, R));
def("hmc12.cult", (R, S) => B.mixed(S.hmc12.cult, R));

def("hmc12.dur", (R, S) => {
  const T = S.hmc12, e = R.pick(T.du_data);
  return { q: T.du_q(e[0], e[1], e[2]), kind: "int", ans: e[2] - e[1], sol: T.du_s(e[1], e[2]) };
});
def("hmc12.pct", (R, S) => {
  const T = S.hmc12, a = R.pick([2, 3, 4, 5, 10, 20, 40]), k = R.pick([2, 3, 4, 5, 10]), b = a * k, pc = (k - 1) * 100;
  return { q: T.pc_q(a, b), kind: "int", ans: pc, sol: T.pc_s(a, b, pc) };
});
})();
