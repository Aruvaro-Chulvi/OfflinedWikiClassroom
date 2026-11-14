/* WikiAula — Salud y educación física, Grado 2: sentidos, lateralidad, desayuno, dientes, sol y agua, habilidades, peatón y
   primeros auxilios básicos. Textos y bancos en i18n/<lang>/sal2.js (S.sal2). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal2.sentido", (R, S) => B.mixed(S.sal2.sentido, R));
def("sal2.posicion", (R, S) => B.mixed(S.sal2.posicion, R));
def("sal2.grupo", (R, S) => B.mixed(S.sal2.grupo, R));
def("sal2.diente", (R, S) => B.mixed(S.sal2.diente, R));
def("sal2.sol", (R, S) => B.mixed(S.sal2.sol, R));
def("sal2.habilidad", (R, S) => B.mixed(S.sal2.habilidad, R));
def("sal2.vial", (R, S) => B.mixed(S.sal2.vial, R));
def("sal2.auxilio", (R, S) => B.mixed(S.sal2.auxilio, R));

// Vasos de agua → mililitros.
def("sal2.vasos", (R, S) => {
  const T = S.sal2, v = R.int(2, 8), ml = R.pick([200, 250]);
  return { q: T.va_q(v, ml), kind: "int", ans: v * ml, sol: T.va_s(v, ml, v * ml) };
});
})();
