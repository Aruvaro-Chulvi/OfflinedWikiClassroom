/* WikiAula — Ciencias sociales, Grado 2 (2.º de Primaria): bancos y problemas sencillos.
   Textos y bancos en i18n/<lang>/cs2.js (S.cs2). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs2.localidad", (R, S) => B.mixed(S.cs2.localidad, R));
def("cs2.servicio", (R, S) => B.mixed(S.cs2.servicio, R));
def("cs2.ayto", (R, S) => B.mixed(S.cs2.ayto, R));
def("cs2.cadena", (R, S) => B.mixed(S.cs2.cadena, R));
def("cs2.consumo", (R, S) => B.mixed(S.cs2.consumo, R));
def("cs2.transporte", (R, S) => B.mixed(S.cs2.transporte, R));
def("cs2.comunicacion", (R, S) => B.mixed(S.cs2.comunicacion, R));
def("cs2.senal", (R, S) => B.mixed(S.cs2.senal, R));
def("cs2.tiempo", (R, S) => B.mixed(S.cs2.tiempo, R));
def("cs2.fuente", (R, S) => B.mixed(S.cs2.fuente, R));
def("cs2.patrimonio", (R, S) => B.mixed(S.cs2.patrimonio, R));
def("cs2.relieve", (R, S) => B.mixed(S.cs2.relieve, R));
def("cs2.aguas", (R, S) => B.mixed(S.cs2.aguas, R));
def("cs2.plano", (R, S) => B.mixed(S.cs2.plano, R));
def("cs2.cultura", (R, S) => B.mixed(S.cs2.cultura, R));
def("cs2.derecho", (R, S) => B.mixed(S.cs2.derecho, R));
def("cs2.responsable", (R, S) => B.mixed(S.cs2.responsable, R));

def("cs2.monedas", (R, S) => {
  const T = S.cs2, vals = [1, 2, 5, 10, 20, 50], n = R.int(2, 4), coins = Array.from({ length: n }, () => R.pick(vals)), r = coins.reduce((a, b) => a + b, 0);
  const txt = coins.map(c => `una moneda de ${c} céntimo${c > 1 ? "s" : ""}`).join(", ").replace(/, ([^,]*)$/, " y $1");
  return { q: T.mo_q(txt), kind: "int", ans: r, sol: T.mo_s(r) };
});
def("cs2.ahorro", (R, S) => {
  const T = S.cs2, w = R.pick([1, 2, 3, 5]), k = R.int(2, 6), p = w * k;
  return { q: T.ah_q(p, w), kind: "int", ans: k, sol: T.ah_s(p, w, k) };
});
def("cs2.anios", (R, S) => {
  const T = S.cs2, a = R.int(1950, 2020), d = R.int(1, 60), b = a + d;
  return { q: T.an_q(a, b), kind: "int", ans: d, sol: T.an_s(a, b, d) };
});
})();
