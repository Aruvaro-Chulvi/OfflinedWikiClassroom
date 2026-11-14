/* WikiAula — Salud y educación física, Grado 1: cuerpo y movimiento, actividad diaria, higiene, alimentación, sueño, juego,
   seguridad y cuidado del propio cuerpo. Textos y bancos en i18n/<lang>/sal1.js (S.sal1). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal1.parte", (R, S) => B.mixed(S.sal1.parte, R));
def("sal1.activo", (R, S) => B.mixed(S.sal1.activo, R));
def("sal1.higiene", (R, S) => B.mixed(S.sal1.higiene, R));
def("sal1.alimento", (R, S) => B.mixed(S.sal1.alimento, R));
def("sal1.juego", (R, S) => B.mixed(S.sal1.juego, R));
def("sal1.seguridad", (R, S) => B.mixed(S.sal1.seguridad, R));
def("sal1.secreto", (R, S) => B.mixed(S.sal1.secreto, R));

// Horas de sueño: de la hora de acostarse a la de levantarse.
def("sal1.sueno", (R, S) => {
  const T = S.sal1, a = R.int(8, 10), b = R.int(7, 8), h = 12 - a + b;
  return { q: T.su_q(a, b), kind: "int", ans: h, sol: T.su_s(a, b, h) };
});
})();
