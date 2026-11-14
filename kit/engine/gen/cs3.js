/* WikiAula — Ciencias sociales, Grado 3 (3.º de Primaria): bancos y problemas sencillos.
   Textos y bancos en i18n/<lang>/cs3.js (S.cs3). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs3.continente", (R, S) => B.mixed(S.cs3.continente, R));
def("cs3.cardinal", (R, S) => B.mixed(S.cs3.cardinal, R));
def("cs3.mapa", (R, S) => B.mixed(S.cs3.mapa, R));
def("cs3.elemento", (R, S) => B.mixed(S.cs3.elemento, R));
def("cs3.instrumento", (R, S) => B.mixed(S.cs3.instrumento, R));
def("cs3.clima", (R, S) => B.mixed(S.cs3.clima, R));
def("cs3.relieve", (R, S) => B.mixed(S.cs3.relieve, R));
def("cs3.rio", (R, S) => B.mixed(S.cs3.rio, R));
def("cs3.poblacion", (R, S) => B.mixed(S.cs3.poblacion, R));
def("cs3.ciudad", (R, S) => B.mixed(S.cs3.ciudad, R));
def("cs3.edad", (R, S) => B.mixed(S.cs3.edad, R));
def("cs3.paleo", (R, S) => B.mixed(S.cs3.paleo, R));
def("cs3.neolitico", (R, S) => B.mixed(S.cs3.neolitico, R));
def("cs3.nivel", (R, S) => B.mixed(S.cs3.nivel, R));
def("cs3.protegido", (R, S) => B.mixed(S.cs3.protegido, R));
def("cs3.ciclista", (R, S) => B.mixed(S.cs3.ciclista, R));

const ROM = n => [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((acc, [v, s]) => { while (n >= v) { acc += s; n -= v; } return acc; }, "");
const ROMAN = n => (n >= 20 ? "XX" + ROM(n - 20) : n >= 10 ? "X" + ROM(n - 10) : ROM(n));

def("cs3.hemisferio", (R, S) => {
  const T = S.cs3, [p, k] = R.pick(T.he_items);
  return { q: T.he_q(p), kind: "choice", opts: T.he_ops.slice(), correct: k, shuffle: false, sol: T.he_s };
});
def("cs3.escala", (R, S, H) => {
  const T = S.cs3, cm = R.int(2, 9), km = R.pick([2, 5, 10, 20, 50, 100]), r = cm * km;
  return { q: T.esc_q(cm, km), kind: "int", ans: r, sol: T.esc_s(cm, km, H.n(r)) };
});
def("cs3.media", (R, S) => {
  const T = S.cs3, n = R.pick([3, 4]);
  let vals;
  do { vals = Array.from({ length: n }, () => R.int(2, 30)); } while (vals.reduce((a, b) => a + b, 0) % n);
  const r = vals.reduce((a, b) => a + b, 0) / n;
  return { q: T.me_q(vals), kind: "int", ans: r, sol: T.me_s(vals, r) };
});
def("cs3.crece", (R, S, H) => {
  const T = S.cs3, p = R.int(5, 40) * 100, n = R.int(5, 40), d = R.int(5, 40), l = R.int(0, 30), s = R.int(0, 30), r = p + n - d + l - s;
  return { q: T.cr_q(H.n(p), n, d, l, s), kind: "int", ans: r, sol: T.cr_s(H.n(p), n, d, l, s, H.n(r)) };
});
def("cs3.siglo", (R, S) => {
  const T = S.cs3, y = R.int(101, 2099), r = Math.floor((y - 1) / 100) + 1;
  return { q: T.si_q(y), kind: "int", ans: r, sol: T.si_s(y, r, ROMAN(r)) };
});
})();
