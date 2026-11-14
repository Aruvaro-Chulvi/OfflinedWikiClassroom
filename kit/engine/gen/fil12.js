/* WikiAula — Historia de la Filosofía, Grado 12: de los presocráticos a la filosofía actual.
   Textos y bancos en i18n/<lang>/fil12.js (S.fil12). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("fil12.arje", (R, S) => B.mixed(S.fil12.arje, R));
def("fil12.socrates", (R, S) => B.mixed(S.fil12.socrates, R));
def("fil12.platon", (R, S) => B.mixed(S.fil12.platon, R));
def("fil12.causa", (R, S) => B.mixed(S.fil12.causa, R));
def("fil12.helenismo", (R, S) => B.mixed(S.fil12.helenismo, R));
def("fil12.medieval", (R, S) => B.mixed(S.fil12.medieval, R));
def("fil12.tomas", (R, S) => B.mixed(S.fil12.tomas, R));
def("fil12.renacimiento", (R, S) => B.mixed(S.fil12.renacimiento, R));
def("fil12.descartes", (R, S) => B.mixed(S.fil12.descartes, R));
def("fil12.hume", (R, S) => B.mixed(S.fil12.hume, R));
def("fil12.ilustracion", (R, S) => B.mixed(S.fil12.ilustracion, R));
def("fil12.juicio", (R, S) => B.mixed(S.fil12.juicio, R));
def("fil12.imperativo", (R, S) => B.mixed(S.fil12.imperativo, R));
def("fil12.marx", (R, S) => B.mixed(S.fil12.marx, R));
def("fil12.nietzsche", (R, S) => B.mixed(S.fil12.nietzsche, R));
def("fil12.ortega", (R, S) => B.mixed(S.fil12.ortega, R));
def("fil12.contemporanea", (R, S) => B.mixed(S.fil12.contemporanea, R));
def("fil12.siglo", (R, S) => B.mixed(S.fil12.siglo, R));

// ¿Quién vivió antes? (fecha de nacimiento aproximada).
def("fil12.cronologia", (R, S) => {
  const T = S.fil12, L = T.filosofos, i = R.int(0, L.length - 1);
  let j = R.int(0, L.length - 1);
  while (j === i || Math.abs(L[i][1] - L[j][1]) < 40) j = R.int(0, L.length - 1);
  const a = L[i], b = L[j], w = a[1] < b[1] ? 0 : 1;
  return { q: T.cr_q(a[0], b[0]), kind: "choice", opts: [a[0], b[0]], correct: w, shuffle: false, sol: T.cr_s(a, b) };
});
})();
