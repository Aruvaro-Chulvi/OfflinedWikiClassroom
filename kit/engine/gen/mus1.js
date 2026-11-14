/* WikiAula — Música, Grado 1: sonido y silencio, duración, intensidad, altura, percusión corporal, instrumentos, voz y pulso.
   Textos y bancos en i18n/<lang>/mus1.js (S.mus1). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus1.sonido", (R, S) => B.mixed(S.mus1.sonido, R));
def("mus1.duracion", (R, S) => B.mixed(S.mus1.duracion, R));
def("mus1.intensidad", (R, S) => B.mixed(S.mus1.intensidad, R));
def("mus1.altura", (R, S) => B.mixed(S.mus1.altura, R));
def("mus1.cuerpo", (R, S) => B.mixed(S.mus1.cuerpo, R));
def("mus1.instrumento", (R, S) => B.mixed(S.mus1.instrumento, R));
def("mus1.voz", (R, S) => B.mixed(S.mus1.voz, R));
def("mus1.pulso", (R, S) => B.mixed(S.mus1.pulso, R));
})();
