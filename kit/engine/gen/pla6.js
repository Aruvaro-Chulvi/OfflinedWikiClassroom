/* WikiAula — Educación plástica y visual, Grado 6: composición, escala, píxeles, edición fotográfica, arte moderno, patrimonio,
   diseño de objetos y proyecto artístico. Textos y bancos en i18n/<lang>/pla6.js (S.pla6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla6.composicion", (R, S) => B.mixed(S.pla6.composicion, R));
def("pla6.digital", (R, S) => B.mixed(S.pla6.digital, R));
def("pla6.edicion", (R, S) => B.mixed(S.pla6.edicion, R));
def("pla6.movimiento", (R, S) => B.mixed(S.pla6.movimiento, R));
def("pla6.patrimonio", (R, S) => B.mixed(S.pla6.patrimonio, R));
def("pla6.diseno", (R, S) => B.mixed(S.pla6.diseno, R));
def("pla6.fase", (R, S) => B.mixed(S.pla6.fase, R));

// Escala 1:E — real = dibujo × E, dibujo = real ÷ E (en cm o m).
def("pla6.escala", (R, S) => {
  const T = S.pla6, E = R.pick([10, 20, 25, 50, 100, 200]), d = R.int(2, 12);
  if (R.int(0, 1) === 0) {
    const real = d * E;
    return { q: T.es_q(E, d), kind: "num", ans: real / 100, tol: 0.001, sol: T.es_s(E, d, real) };
  }
  return { q: T.es_q2(E, d * E), kind: "int", ans: d, sol: T.es_s2(E, d * E, d) };
});

// Ampliar con cuadrícula: factor = lado nuevo ÷ lado original.
def("pla6.cuadricula", (R, S) => {
  const T = S.pla6, a = R.pick([1, 1, 2]), k = R.int(2, 4), w = R.int(4, 9);
  if (R.int(0, 1) === 0) return { q: T.cu_q(a, a * k), kind: "int", ans: k, sol: T.cu_s(a, a * k, k) };
  return { q: T.cu_q2(w, k), kind: "int", ans: w * k, sol: T.cu_s2(w, k, w * k) };
});

// Píxeles = ancho × alto; megapíxeles.
def("pla6.pixeles", (R, S) => {
  const T = S.pla6, [w, h] = R.pick([[800, 600], [1024, 768], [1280, 720], [1920, 1080], [2000, 1500], [3000, 2000], [4000, 3000], [6000, 4000], [640, 480]]);
  if (w * h >= 2000000 && R.int(0, 1) === 0) return { q: T.mp_q(w, h), kind: "num", ans: +(w * h / 1e6).toFixed(1), tol: 0.05, sol: T.mp_s(w, h, w * h) };
  return { q: T.px_q(w, h), kind: "int", ans: w * h, sol: T.px_s(w, h, w * h) };
});
})();
