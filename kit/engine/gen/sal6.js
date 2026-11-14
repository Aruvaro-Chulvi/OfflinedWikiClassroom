/* WikiAula — Salud y educación física, Grado 6: FITT, fuerza y flexibilidad, adicciones, estrés, naturaleza, juegos del mundo,
   RCP y seguridad en el agua. Textos y bancos en i18n/<lang>/sal6.js (S.sal6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal6.fitt", (R, S) => B.mixed(S.sal6.fitt, R));
def("sal6.ejercicio", (R, S) => B.mixed(S.sal6.ejercicio, R));
def("sal6.adiccion", (R, S) => B.mixed(S.sal6.adiccion, R));
def("sal6.estres", (R, S) => B.mixed(S.sal6.estres, R));
def("sal6.monte", (R, S) => B.mixed(S.sal6.monte, R));
def("sal6.mundo", (R, S) => B.mixed(S.sal6.mundo, R));
def("sal6.rcp", (R, S) => B.mixed(S.sal6.rcp, R));
def("sal6.agua", (R, S) => B.mixed(S.sal6.agua, R));

// Minutos a la semana.
def("sal6.minutos", (R, S) => {
  const T = S.sal6, s = R.int(2, 6), m = R.pick([30, 40, 45, 50, 60, 75, 90]);
  return { q: T.mi_q(s, m), kind: "int", ans: s * m, sol: T.mi_s(s, m, s * m) };
});

// Compresiones en un tiempo dado a un ritmo dado.
def("sal6.compresiones", (R, S) => {
  const T = S.sal6, r = R.pick([100, 110, 120]), t = R.pick([30, 60, 90, 120]), c = r * t / 60;
  return { q: T.co_q(r, t), kind: "int", ans: c, sol: T.co_s(r, t, c) };
});
})();
