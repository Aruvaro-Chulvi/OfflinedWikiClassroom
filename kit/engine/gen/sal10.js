/* WikiAula — Salud y educación física, Grado 10: plan personal, pruebas de condición física y VO₂ máx, sistema sanitario, vacunas,
   determinantes de la salud, deporte y sociedad, publicidad, triaje y primeros auxilios en la naturaleza. Textos y bancos en i18n/<lang>/sal10.js (S.sal10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal10.plan", (R, S) => B.mixed(S.sal10.plan, R));
def("sal10.test", (R, S) => B.mixed(S.sal10.test, R));
def("sal10.nivel", (R, S) => B.mixed(S.sal10.nivel, R));
def("sal10.prevencion", (R, S) => B.mixed(S.sal10.prevencion, R));
def("sal10.vacuna", (R, S) => B.mixed(S.sal10.vacuna, R));
def("sal10.determinante", (R, S) => B.mixed(S.sal10.determinante, R));
def("sal10.sociedad", (R, S) => B.mixed(S.sal10.sociedad, R));
def("sal10.publi", (R, S) => B.mixed(S.sal10.publi, R));
def("sal10.triaje", (R, S) => B.mixed(S.sal10.triaje, R));
def("sal10.natural", (R, S) => B.mixed(S.sal10.natural, R));

// Distancia = pasos × zancada (en km).
def("sal10.pasos", (R, S) => {
  const T = S.sal10, p = R.int(4, 16) * 1000, z = R.pick([0.6, 0.65, 0.7, 0.75, 0.8]), d = +(p * z / 1000).toFixed(2);
  return { q: T.pa_q(p, z), kind: "num", ans: d, tol: 0.01, sol: T.pa_s(p, z, d) };
});

// VO₂ máx ≈ (d − 504,9) ÷ 44,73.
def("sal10.cooper", (R, S) => {
  const T = S.sal10, d = R.int(30, 64) * 50, v = +((d - 504.9) / 44.73).toFixed(1);
  return { q: T.co_q(d), kind: "num", ans: v, tol: 0.2, sol: T.co_s(d, v) };
});

// Personas vacunadas = población × cobertura ÷ 100.
def("sal10.grupo", (R, S) => {
  const T = S.sal10, p = R.pick([200, 400, 500, 800, 1000, 2000, 5000, 10000, 50000]), c = R.int(85, 99), v = p * c / 100;
  return { q: T.gr_q(p, c), kind: "num", ans: v, tol: 0.5, sol: T.gr_s(p, c, v) };
});
})();
