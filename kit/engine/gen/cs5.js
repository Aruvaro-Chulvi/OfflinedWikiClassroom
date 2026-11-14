/* WikiAula — Ciencias sociales, Grado 5 (5.º de Primaria): bancos y problemas sencillos.
   Textos y bancos en i18n/<lang>/cs5.js (S.cs5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs5.relieve", (R, S) => B.mixed(S.cs5.relieve, R));
def("cs5.rios", (R, S) => B.mixed(S.cs5.rios, R));
def("cs5.europa", (R, S) => B.mixed(S.cs5.europa, R));
def("cs5.capital", (R, S) => B.mixed(S.cs5.capital, R));
def("cs5.ue", (R, S) => B.mixed(S.cs5.ue, R));
def("cs5.tig", (R, S) => B.mixed(S.cs5.tig, R));
def("cs5.coordenadas", (R, S) => B.mixed(S.cs5.coordenadas, R));
def("cs5.demo", (R, S) => B.mixed(S.cs5.demo, R));
def("cs5.piramide", (R, S) => B.mixed(S.cs5.piramide, R));
def("cs5.migra", (R, S) => B.mixed(S.cs5.migra, R));
def("cs5.urbano", (R, S) => B.mixed(S.cs5.urbano, R));
def("cs5.estamento", (R, S) => B.mixed(S.cs5.estamento, R));
def("cs5.islam", (R, S) => B.mixed(S.cs5.islam, R));
def("cs5.medieval", (R, S) => B.mixed(S.cs5.medieval, R));
def("cs5.civmed", (R, S) => B.mixed(S.cs5.civmed, R));
def("cs5.derecho", (R, S) => B.mixed(S.cs5.derecho, R));
def("cs5.poder", (R, S) => B.mixed(S.cs5.poder, R));
def("cs5.genero", (R, S) => B.mixed(S.cs5.genero, R));

def("cs5.crecimiento", (R, S, H) => {
  const T = S.cs5, n = R.int(20, 90) * 100, m = R.int(20, 90) * 100, r = n - m;
  return { q: T.cr_q(H.n(n), H.n(m)), kind: "int", ans: r, sol: T.cr_s(H.n(n), H.n(m), r) };
});
})();
