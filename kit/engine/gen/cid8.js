/* WikiAula — Ciudadanía y ética, Grado 8: historia y Declaración de los derechos humanos, generaciones, organismos, igualdad de género,
   diversidad, discapacidad, racismo y refugio, pobreza, infancia, convivencia y libertad de expresión. Textos en i18n/<lang>/cid8.js (S.cid8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid8.hito", (R, S) => B.mixed(S.cid8.hito, R));
def("cid8.caracter", (R, S) => B.mixed(S.cid8.caracter, R));
def("cid8.articulo", (R, S) => B.mixed(S.cid8.articulo, R));
def("cid8.generacion", (R, S) => B.mixed(S.cid8.generacion, R));
def("cid8.organismo", (R, S) => B.mixed(S.cid8.organismo, R));
def("cid8.genero", (R, S) => B.mixed(S.cid8.genero, R));
def("cid8.diversidad", (R, S) => B.mixed(S.cid8.diversidad, R));
def("cid8.barrera", (R, S) => B.mixed(S.cid8.barrera, R));
def("cid8.discriminacion", (R, S) => B.mixed(S.cid8.discriminacion, R));
def("cid8.migracion", (R, S) => B.mixed(S.cid8.migracion, R));
def("cid8.idh", (R, S) => B.mixed(S.cid8.idh, R));
def("cid8.infancia", (R, S) => B.mixed(S.cid8.infancia, R));
def("cid8.modelo", (R, S) => B.mixed(S.cid8.modelo, R));
def("cid8.expresion", (R, S) => B.mixed(S.cid8.expresion, R));

// Brecha salarial = (H − M) / H · 100, con resultado entero.
def("cid8.brecha", (R, S) => {
  const T = S.cid8, h = R.int(16, 32) * 100, g = R.pick([5, 10, 12, 15, 20, 25]), m = h * (100 - g) / 100;
  if (!Number.isInteger(m)) return null;
  return { q: T.br_q(h, m), kind: "int", ans: g, sol: T.br_s(h, m, g) };
});

// ¿Cuántas veces más gana el grupo rico?
def("cid8.veces", (R, S) => {
  const T = S.cid8, p = R.int(2, 9) * 1000, k = R.int(3, 20), q = R.pick([10, 20]);
  return { q: T.ve_q(q, p * k, p), kind: "int", ans: k, sol: T.ve_s(p * k, p, k) };
});
})();
