/* WikiAula — Educación plástica y visual, Grado 3: elementos visuales, texturas, círculo cromático, luces y sombras, cómic, planos,
   géneros de la pintura y arte rupestre. Textos y bancos en i18n/<lang>/pla3.js (S.pla3). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla3.elemento", (R, S) => B.mixed(S.pla3.elemento, R));
def("pla3.textura", (R, S) => B.mixed(S.pla3.textura, R));
def("pla3.terciario", (R, S) => B.mixed(S.pla3.terciario, R));
def("pla3.luz", (R, S) => B.mixed(S.pla3.luz, R));
def("pla3.comic", (R, S) => B.mixed(S.pla3.comic, R));
def("pla3.plano", (R, S) => B.mixed(S.pla3.plano, R));
def("pla3.genero", (R, S) => B.mixed(S.pla3.genero, R));
def("pla3.rupestre", (R, S) => B.mixed(S.pla3.rupestre, R));
})();
