/* WikiAula — Salud y educación física, Grado 8: fuerza, velocidad, balance energético, TCA, afectividad, drogas, RCP con DEA,
   lesiones y orientación. Textos y bancos en i18n/<lang>/sal8.js (S.sal8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal8.fuerza", (R, S) => B.mixed(S.sal8.fuerza, R));
def("sal8.velocidad", (R, S) => B.mixed(S.sal8.velocidad, R));
def("sal8.balance", (R, S) => B.mixed(S.sal8.balance, R));
def("sal8.tca", (R, S) => B.mixed(S.sal8.tca, R));
def("sal8.relacion", (R, S) => B.mixed(S.sal8.relacion, R));
def("sal8.droga", (R, S) => B.mixed(S.sal8.droga, R));
def("sal8.rcp", (R, S) => B.mixed(S.sal8.rcp, R));
def("sal8.lesion", (R, S) => B.mixed(S.sal8.lesion, R));
def("sal8.price", (R, S) => B.mixed(S.sal8.price, R));
def("sal8.mapa", (R, S) => B.mixed(S.sal8.mapa, R));

// Series × repeticiones.
def("sal8.series", (R, S) => {
  const T = S.sal8, s = R.int(2, 5), r = R.pick([8, 10, 12, 15, 20]), [ej] = R.pick(T.ejercicios);
  return { q: T.se_q(s, r, ej), kind: "int", ans: s * r, sol: T.se_s(s, r, s * r) };
});

// Velocidad media en m/s.
def("sal8.ms", (R, S) => {
  const T = S.sal8, [d, t] = R.pick([[60, 10], [50, 8], [100, 16], [100, 20], [40, 8], [30, 5], [80, 16], [200, 40], [400, 80], [60, 12]]), v = +(d / t).toFixed(2);
  return { q: T.ms_q(d, t), kind: "num", ans: v, tol: 0.01, sol: T.ms_s(d, t, v) };
});

// Gasto = kcal/min × minutos.
def("sal8.gasto", (R, S) => {
  const T = S.sal8, [a, k] = R.pick(T.actividades), m = R.pick([10, 15, 20, 25, 30, 40, 45, 60]);
  return { q: T.ga_q(a, k, m), kind: "int", ans: k * m, sol: T.ga_s(k, m, k * m) };
});

// Ciclos de RCP 30:2.
def("sal8.ritmo", (R, S) => {
  const T = S.sal8, c = R.int(2, 8);
  if (R.int(0, 1)) return { q: T.ri_q1(c), kind: "int", ans: 30 * c, sol: T.ri_s1(c, 30 * c) };
  return { q: T.ri_q2(c), kind: "int", ans: 2 * c, sol: T.ri_s2(c, 2 * c) };
});

// Escala del mapa.
def("sal8.escala", (R, S) => {
  const T = S.sal8, [e, m] = R.pick([[25000, 250], [50000, 500], [10000, 100], [20000, 200]]), c = R.pick([2, 3, 4, 5, 6, 7, 8, 10, 12]);
  return { q: T.es_q(e, c), kind: "int", ans: c * m, sol: T.es_s(e, m, c, c * m) };
});
})();
