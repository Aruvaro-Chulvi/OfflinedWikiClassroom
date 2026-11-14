/* WikiAula — Ciencias sociales, Grado 4 (4.º de Primaria): bancos y problemas sencillos.
   Textos y bancos en i18n/<lang>/cs4.js (S.cs4). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs4.continente", (R, S) => B.mixed(S.cs4.continente, R));
def("cs4.paisaje", (R, S) => B.mixed(S.cs4.paisaje, R));
def("cs4.catastrofe", (R, S) => B.mixed(S.cs4.catastrofe, R));
def("cs4.sector", (R, S) => B.mixed(S.cs4.sector, R));
def("cs4.materia", (R, S) => B.mixed(S.cs4.materia, R));
def("cs4.gasto", (R, S) => B.mixed(S.cs4.gasto, R));
def("cs4.truco", (R, S) => B.mixed(S.cs4.truco, R));
def("cs4.civ", (R, S) => B.mixed(S.cs4.civ, R));
def("cs4.grecia", (R, S) => B.mixed(S.cs4.grecia, R));
def("cs4.roma", (R, S) => B.mixed(S.cs4.roma, R));
def("cs4.mundoantiguo", (R, S) => B.mixed(S.cs4.mundoantiguo, R));
def("cs4.patrimonio", (R, S) => B.mixed(S.cs4.patrimonio, R));
def("cs4.museo", (R, S) => B.mixed(S.cs4.museo, R));
def("cs4.ley", (R, S) => B.mixed(S.cs4.ley, R));
def("cs4.participa", (R, S) => B.mixed(S.cs4.participa, R));
def("cs4.clima", (R, S) => B.mixed(S.cs4.clima, R));

def("cs4.tamano", (R, S) => {
  const T = S.cs4, d = T.ta_data;
  let i, j;
  do { i = R.int(0, d.length - 1); j = R.int(0, d.length - 1); } while (d[i][1] < d[j][1] * 1.5);
  const r = Math.round(d[i][1] / d[j][1]);
  return { q: T.ta_q(d[i][0].charAt(0).toUpperCase() + d[i][0].slice(1), d[i][1], d[j][0], d[j][1]), kind: "int", ans: r, sol: T.ta_s(d[i][1], d[j][1], r) };
});
def("cs4.balance", (R, S, H) => {
  const T = S.cs4, items = [["alquiler", R.pick([600, 700, 800])], ["comida", R.pick([350, 400, 450])], ["luz y agua", R.pick([90, 110, 130])], ["transporte", R.pick([60, 80, 100])], ["ocio", R.pick([50, 100, 150])]];
  const g = items.reduce((a, b) => a + b[1], 0), i = g + R.pick([50, 100, 150, 200, 300]), r = i - g;
  return { q: T.ba_q(H.n(i), items.map(([n, v]) => `${n} ${v} €`).join(", ")), kind: "int", ans: r, sol: T.ba_s(H.n(i), H.n(g), r) };
});
})();
