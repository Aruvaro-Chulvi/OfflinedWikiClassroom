/* WikiAula — Geografía e Historia, Grado 7 (1.º ESO): bancos y cálculos (husos, escalas, climogramas, fechas).
   Textos y bancos en i18n/<lang>/gh7.js (S.gh7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("gh7.movimiento", (R, S) => B.mixed(S.gh7.movimiento, R));
def("gh7.zona", (R, S) => B.mixed(S.gh7.zona, R));
def("gh7.coord", (R, S) => B.mixed(S.gh7.coord, R));
def("gh7.mapa", (R, S) => B.mixed(S.gh7.mapa, R));
def("gh7.capa", (R, S) => B.mixed(S.gh7.capa, R));
def("gh7.placa", (R, S) => B.mixed(S.gh7.placa, R));
def("gh7.forma", (R, S) => B.mixed(S.gh7.forma, R));
def("gh7.agente", (R, S) => B.mixed(S.gh7.agente, R));
def("gh7.continente", (R, S) => B.mixed(S.gh7.continente, R));
def("gh7.rio", (R, S) => B.mixed(S.gh7.rio, R));
def("gh7.agua", (R, S) => B.mixed(S.gh7.agua, R));
def("gh7.factor", (R, S) => B.mixed(S.gh7.factor, R));
def("gh7.clima", (R, S) => B.mixed(S.gh7.clima, R));
def("gh7.bioma", (R, S) => B.mixed(S.gh7.bioma, R));
def("gh7.riesgo", (R, S) => B.mixed(S.gh7.riesgo, R));
def("gh7.ambiente", (R, S) => B.mixed(S.gh7.ambiente, R));
def("gh7.homo", (R, S) => B.mixed(S.gh7.homo, R));
def("gh7.paleo", (R, S) => B.mixed(S.gh7.paleo, R));
def("gh7.neo", (R, S) => B.mixed(S.gh7.neo, R));
def("gh7.meso", (R, S) => B.mixed(S.gh7.meso, R));
def("gh7.egipto", (R, S) => B.mixed(S.gh7.egipto, R));
def("gh7.asia", (R, S) => B.mixed(S.gh7.asia, R));
def("gh7.grecia", (R, S) => B.mixed(S.gh7.grecia, R));
def("gh7.legado", (R, S) => B.mixed(S.gh7.legado, R));
def("gh7.roma", (R, S) => B.mixed(S.gh7.roma, R));
def("gh7.vidaroma", (R, S) => B.mixed(S.gh7.vidaroma, R));
def("gh7.antiguo", (R, S) => B.mixed(S.gh7.antiguo, R));

def("gh7.huso", (R, S) => {
  const T = S.gh7, n = R.int(1, 10), east = R.int(0, 1) === 1, h = R.int(0, 23), lon = n * 15;
  const r = ((h + (east ? n : -n)) % 24 + 24) % 24;
  return { q: T.hu_q(lon, east, h), kind: "int", ans: r, sol: T.hu_s(lon, n, east, h, r) };
});
def("gh7.escala", (R, S, H) => {
  const T = S.gh7, den = R.pick([10000, 25000, 50000, 100000, 200000, 500000, 1000000]), cm = R.int(2, 12);
  const km = cm * den / 100000;
  return { q: T.es_q(H.n(den), cm), kind: "num", ans: km, tol: 0.001, sol: T.es_s(cm, H.n(den), H.n(cm * den), H.n(km)) };
});
def("gh7.altura", (R, S) => {
  const T = S.gh7, t0 = R.int(14, 30), km = R.int(1, 4), r = t0 - 6 * km;
  return { q: T.al_q(t0, km * 1000), kind: "int", ans: r, sol: T.al_s(t0, km, r) };
});
def("gh7.climograma", (R, S) => {
  const T = S.gh7, lo = R.int(-20, 12), hi = lo + R.int(4, 34);
  return { q: T.cl_q(lo, hi), kind: "int", ans: hi - lo, sol: T.cl_s(lo, hi) };
});
def("gh7.fecha", (R, S) => {
  const T = S.gh7, a = R.int(1, 30) * 100, mixed = R.int(0, 1) === 1;
  if (mixed) { const b = R.int(1, 15) * 100; return { q: T.fe_q(a, true, b, false), kind: "int", ans: a + b - 1, sol: T.fe_s2(a, b) }; }
  const b = R.int(0, a / 100 - 1) * 100 || 50;
  return { q: T.fe_q(a, true, b, true), kind: "int", ans: a - b, sol: T.fe_s1(a, b) };
});
def("gh7.anos", (R, S) => {
  const T = S.gh7, e = R.pick(T.an_data);
  const ans = e[2] ? e[1] - e[3] : e[1] + e[3] - 1;
  return { q: T.an_q(e[0], e[1], e[2], e[3]), kind: "int", ans, sol: T.an_s(e[1], e[2], e[3], ans) };
});
def("gh7.romanos", (R, S) => {
  const T = S.gh7, n = R.int(4, 2025);
  const map = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let x = n, s = "";
  for (const [v, l] of map) while (x >= v) { s += l; x -= v; }
  return { q: T.ro_q(s), kind: "int", ans: n, sol: T.ro_s(s, n) };
});
})();
