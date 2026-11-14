/* WikiAula — Geografía e Historia, Grado 9 (3.º ESO): bancos y cálculos (paro, balanza, PIB per cápita, sectores).
   Textos y bancos en i18n/<lang>/gh9.js (S.gh9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("gh9.estado", (R, S) => B.mixed(S.gh9.estado, R));
def("gh9.regimen", (R, S) => B.mixed(S.gh9.regimen, R));
def("gh9.organiz", (R, S) => B.mixed(S.gh9.organiz, R));
def("gh9.ue", (R, S) => B.mixed(S.gh9.ue, R));
def("gh9.sistema", (R, S) => B.mixed(S.gh9.sistema, R));
def("gh9.factor", (R, S) => B.mixed(S.gh9.factor, R));
def("gh9.trabajo", (R, S) => B.mixed(S.gh9.trabajo, R));
def("gh9.global", (R, S) => B.mixed(S.gh9.global, R));
def("gh9.agro", (R, S) => B.mixed(S.gh9.agro, R));
def("gh9.ganpes", (R, S) => B.mixed(S.gh9.ganpes, R));
def("gh9.recurso", (R, S) => B.mixed(S.gh9.recurso, R));
def("gh9.industria", (R, S) => B.mixed(S.gh9.industria, R));
def("gh9.energia", (R, S) => B.mixed(S.gh9.energia, R));
def("gh9.regind", (R, S) => B.mixed(S.gh9.regind, R));
def("gh9.transporte", (R, S) => B.mixed(S.gh9.transporte, R));
def("gh9.turismo", (R, S) => B.mixed(S.gh9.turismo, R));
def("gh9.servicio", (R, S) => B.mixed(S.gh9.servicio, R));
def("gh9.indicador", (R, S) => B.mixed(S.gh9.indicador, R));
def("gh9.desig", (R, S) => B.mixed(S.gh9.desig, R));
def("gh9.sosten", (R, S) => B.mixed(S.gh9.sosten, R));

def("gh9.paro", (R, S, H) => {
  const T = S.gh9, a = R.pick([20000, 40000, 50000, 80000, 100000, 200000, 500000]), t = R.int(3, 30), p = a * t / 100;
  return { q: T.pa_q(H.n(a), H.n(p)), kind: "int", ans: t, sol: T.pa_s(H.n(p), H.n(a), t) };
});
def("gh9.balanza", (R, S, H) => {
  const T = S.gh9, e = R.int(20, 200) * 1000, i = R.int(20, 200) * 1000;
  return { q: T.ba_q(H.n(e), H.n(i)), kind: "int", ans: e - i, sol: T.ba_s(H.n(e), H.n(i), e - i) };
});
def("gh9.pibpc", (R, S, H) => {
  const T = S.gh9, pc = R.int(1, 80) * 1000, pop = R.pick([2, 5, 10, 20, 40, 50, 100]), pib = pc * pop;
  return { q: T.pi_q(H.n(pib), pop), kind: "int", ans: pc, sol: T.pi_s(H.n(pib), pop, H.n(pc)) };
});
def("gh9.mix", (R, S) => {
  const T = S.gh9, tot = R.pick([100, 200, 250, 400, 500]), pc = R.int(2, 18) * 5, r = tot * pc / 100;
  return { q: T.mi_q(tot, r), kind: "num", ans: pc, tol: 0.01, sol: T.mi_s(r, tot, pc) };
});
def("gh9.sector", (R, S) => {
  const T = S.gh9, tot = R.pick([25, 50]), pc = R.pick([60, 64, 68, 72, 76]), p3 = tot * pc / 100, p1 = R.int(1, 3), p2 = tot - p1 - p3;
  return { q: T.se_q(tot, p1, p2, p3), kind: "int", ans: pc, sol: T.se_s(tot, p3, pc) };
});
})();
