/* WikiAula — Historia del arte, Grado 11: comentario, lenguaje arquitectónico, técnicas, Prehistoria, Egipto, Grecia, Roma,
   íberos y celtas, paleocristiano y bizantino, al-Ándalus, prerrománico, Románico, Gótico y patrimonio. Textos en i18n/<lang>/hart11.js (S.hart11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("hart11.fase", (R, S) => B.mixed(S.hart11.fase, R));
def("hart11.elemento", (R, S) => B.mixed(S.hart11.elemento, R));
def("hart11.tecnica", (R, S) => B.mixed(S.hart11.tecnica, R));
def("hart11.prehistoria", (R, S) => B.mixed(S.hart11.prehistoria, R));
def("hart11.egipto", (R, S) => B.mixed(S.hart11.egipto, R));
def("hart11.grecia", (R, S) => B.mixed(S.hart11.grecia, R));
def("hart11.roma", (R, S) => B.mixed(S.hart11.roma, R));
def("hart11.iberico", (R, S) => B.mixed(S.hart11.iberico, R));
def("hart11.bizantino", (R, S) => B.mixed(S.hart11.bizantino, R));
def("hart11.andalus", (R, S) => B.mixed(S.hart11.andalus, R));
def("hart11.prerromanico", (R, S) => B.mixed(S.hart11.prerromanico, R));
def("hart11.romanico", (R, S) => B.mixed(S.hart11.romanico, R));
def("hart11.gotico", (R, S) => B.mixed(S.hart11.gotico, R));
def("hart11.patrimonio", (R, S) => B.mixed(S.hart11.patrimonio, R));

// Cánones: altura = cabezas × cabeza (Policleto 7, Lisipo 8).
def("hart11.canon", (R, S) => {
  const T = S.hart11, [aut, c] = R.pick([["Policleto", 7], ["Lisipo", 8]]), h = R.int(22, 30);
  if (R.int(0, 1) === 0) return { q: T.ca_q(aut, c, h), kind: "int", ans: c * h, sol: T.ca_s(c, h) };
  return { q: T.cb_q(aut, c, c * h), kind: "int", ans: h, sol: T.cb_s(c, c * h, h) };
});
})();
