/* WikiAula — Música, Grado 8: historia de la música (Antigüedad a siglo XX), música popular urbana, flamenco y folclore,
   música en los medios. Textos y bancos en i18n/<lang>/mus8.js (S.mus8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus8.antiguedad", (R, S) => B.mixed(S.mus8.antiguedad, R));
def("mus8.medieval", (R, S) => B.mixed(S.mus8.medieval, R));
def("mus8.renacimiento", (R, S) => B.mixed(S.mus8.renacimiento, R));
def("mus8.genero", (R, S) => B.mixed(S.mus8.genero, R));
def("mus8.compositor", (R, S) => B.mixed(S.mus8.compositor, R));
def("mus8.vanguardia", (R, S) => B.mixed(S.mus8.vanguardia, R));
def("mus8.urbano", (R, S) => B.mixed(S.mus8.urbano, R));
def("mus8.flamenco", (R, S) => B.mixed(S.mus8.flamenco, R));
def("mus8.medios", (R, S) => B.mixed(S.mus8.medios, R));

// Siglo de un año (de una obra o un nacimiento).
def("mus8.siglo", (R, S) => {
  const T = S.mus8, [what, y] = R.pick([["L'Orfeo de Monteverdi", 1607], ["el nacimiento de Bach", 1685], ["El Mesías de Händel", 1742], ["el nacimiento de Vivaldi", 1678],
    ["el nacimiento de Mozart", 1756], ["la imprenta musical de Petrucci", 1501], ["el nacimiento de Chopin", 1810], ["el Concierto de Aranjuez", 1939],
    ["las Cantigas de Alfonso X", 1270], ["el nacimiento de Domenico Scarlatti", 1685]]);
  const c = Math.floor((y - 1) / 100) + 1;
  return { q: T.si_q(what, y), kind: "int", ans: c, sol: T.si_s(y, c) };
});
})();
