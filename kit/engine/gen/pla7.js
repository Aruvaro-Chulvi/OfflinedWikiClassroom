/* WikiAula — Educación plástica, visual y audiovisual, Grado 7: comunicación visual, Gestalt, síntesis del color, propiedades del color,
   elementos expresivos, trazados, polígonos inscritos, transformaciones, lectura de la imagen y técnicas. Textos en i18n/<lang>/pla7.js (S.pla7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla7.funcion", (R, S) => B.mixed(S.pla7.funcion, R));
def("pla7.gestalt", (R, S) => B.mixed(S.pla7.gestalt, R));
def("pla7.sintesis", (R, S) => B.mixed(S.pla7.sintesis, R));
def("pla7.propiedad", (R, S) => B.mixed(S.pla7.propiedad, R));
def("pla7.elemento", (R, S) => B.mixed(S.pla7.elemento, R));
def("pla7.trazado", (R, S) => B.mixed(S.pla7.trazado, R));
def("pla7.poligono", (R, S) => B.mixed(S.pla7.poligono, R));
def("pla7.transformacion", (R, S) => B.mixed(S.pla7.transformacion, R));
def("pla7.lectura", (R, S) => B.mixed(S.pla7.lectura, R));
def("pla7.tecnica", (R, S) => B.mixed(S.pla7.tecnica, R));

// Ángulo central = 360 ÷ n (o n a partir del ángulo); lado del hexágono = radio.
def("pla7.central", (R, S) => {
  const T = S.pla7, n = R.pick([3, 4, 5, 6, 8, 9, 10, 12]), a = 360 / n, k = R.int(0, 3);
  if (k === 0) return { q: T.ce_q2(a), kind: "int", ans: n, sol: T.ce_s2(a, n) };
  if (k === 1) { const r = R.int(2, 9); return { q: T.hx_q(r), kind: "int", ans: r, sol: T.hx_s(r) }; }
  return { q: T.ce_q(n), kind: "int", ans: a, sol: T.ce_s(n, a) };
});
})();
