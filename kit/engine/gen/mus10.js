/* WikiAula — Música, Grado 10: funciones armónicas, grandes formas, música para la imagen y los videojuegos, identidad, compositoras,
   producción, directo, presupuesto de un concierto y streaming. Textos y bancos en i18n/<lang>/mus10.js (S.mus10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus10.funcion", (R, S) => B.mixed(S.mus10.funcion, R));
def("mus10.forma", (R, S) => B.mixed(S.mus10.forma, R));
def("mus10.cine", (R, S) => B.mixed(S.mus10.cine, R));
def("mus10.videojuego", (R, S) => B.mixed(S.mus10.videojuego, R));
def("mus10.identidad", (R, S) => B.mixed(S.mus10.identidad, R));
def("mus10.compositora", (R, S) => B.mixed(S.mus10.compositora, R));
def("mus10.produccion", (R, S) => B.mixed(S.mus10.produccion, R));
def("mus10.directo", (R, S) => B.mixed(S.mus10.directo, R));

// Presupuesto: ingresos por entradas y resultado.
def("mus10.presupuesto", (R, S) => {
  const T = S.mus10, n = R.int(6, 40) * 5, p = R.pick([2, 3, 4, 5, 6, 8, 10]), g1 = R.int(5, 30) * 10, g2 = R.int(2, 12) * 10;
  if (R.int(0, 1) === 0) return { q: T.en_q(n, p), kind: "int", ans: n * p, sol: T.en_s(n, p) };
  return { q: T.re_q(n, p, g1, g2), kind: "int", ans: n * p - g1 - g2, sol: T.re_s(n, p, g1, g2) };
});

// Streaming: ingresos = reproducciones × pago por reproducción.
def("mus10.streaming", (R, S) => {
  const T = S.mus10, r = R.pick([10000, 50000, 100000, 200000, 500000, 1000000, 2000000]), pago = R.pick([0.002, 0.003, 0.004, 0.005]);
  if (R.int(0, 2) === 0) { const objetivo = R.pick([100, 500, 1000, 2000]); const need = Math.round(objetivo / pago);
    return { q: T.ob_q(objetivo, pago), kind: "int", ans: need, sol: T.ob_s(objetivo, pago, need) }; }
  return { q: T.st_q(r, pago), kind: "num", ans: +(r * pago).toFixed(2), tol: 0.01, sol: T.st_s(r, pago) };
});
})();
