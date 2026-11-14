/* WikiAula — Educación plástica y visual, Grado 5: perspectiva, luz y sombreado, armonía y contraste, significado del color,
   ángulos de cámara, logotipos, teselados y pintores españoles. Textos y bancos en i18n/<lang>/pla5.js (S.pla5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla5.perspectiva", (R, S) => B.mixed(S.pla5.perspectiva, R));
def("pla5.luz", (R, S) => B.mixed(S.pla5.luz, R));
def("pla5.armonia", (R, S) => B.mixed(S.pla5.armonia, R));
def("pla5.significado", (R, S) => B.mixed(S.pla5.significado, R));
def("pla5.angulo", (R, S) => B.mixed(S.pla5.angulo, R));
def("pla5.logo", (R, S) => B.mixed(S.pla5.logo, R));
def("pla5.tesela", (R, S) => B.mixed(S.pla5.tesela, R));
def("pla5.pintor", (R, S) => B.mixed(S.pla5.pintor, R));

// Ángulo interior de un polígono regular y piezas por vértice (360 ÷ ángulo).
def("pla5.vertice", (R, S) => {
  const T = S.pla5, n = R.pick([3, 4, 6, 3, 4, 6, 5, 8, 10, 12]), a = 180 * (n - 2) / n;
  if ([3, 4, 6].includes(n) && R.int(0, 1) === 0) return { q: T.ve_q(n), kind: "int", ans: 360 / a, sol: T.ve_s(n, a, 360 / a) };
  return { q: T.an_q(n), kind: "int", ans: a, sol: T.an_s(n, a) };
});
})();
