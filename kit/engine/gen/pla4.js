/* WikiAula — Educación plástica y visual, Grado 4: proporciones, movimiento, complementarios, gamas, cartel, animación,
   instrumentos de dibujo y relieve. Textos y bancos en i18n/<lang>/pla4.js (S.pla4). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla4.cara", (R, S) => B.mixed(S.pla4.cara, R));
def("pla4.movimiento", (R, S) => B.mixed(S.pla4.movimiento, R));
def("pla4.complementario", (R, S) => B.mixed(S.pla4.complementario, R));
def("pla4.tinte", (R, S) => B.mixed(S.pla4.tinte, R));
def("pla4.cartel", (R, S) => B.mixed(S.pla4.cartel, R));
def("pla4.juguete", (R, S) => B.mixed(S.pla4.juguete, R));
def("pla4.instrumento", (R, S) => B.mixed(S.pla4.instrumento, R));
def("pla4.relieve", (R, S) => B.mixed(S.pla4.relieve, R));

// Altura ≈ cabezas × altura de la cabeza (o al revés).
def("pla4.proporcion", (R, S) => {
  const T = S.pla4, [who, n] = R.pick([["adulto", 8], ["adulto", 7], ["niño", 6], ["bebé", 4]]), c = who === "bebé" ? R.int(14, 16) : who === "niño" ? R.int(19, 21) : R.int(21, 24);
  const h = n * c;
  if (R.int(0, 2) === 0) return { q: T.pr_q2(who, h, c), kind: "int", ans: n, sol: T.pr_s2(h, c, n) };
  return { q: T.pr_q(who, n, c), kind: "int", ans: h, sol: T.pr_s(n, c, h) };
});

// Fotogramas = segundos × fotogramas por segundo.
def("pla4.animacion", (R, S) => {
  const T = S.pla4, f = R.pick([12, 24, 25, 30]), s = R.pick([2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 60]);
  if (R.int(0, 2) === 0) return { q: T.an_q2(s * f, f), kind: "int", ans: s, sol: T.an_s2(s * f, f, s) };
  return { q: T.an_q(s, f), kind: "int", ans: s * f, sol: T.an_s(s, f, s * f) };
});
})();
