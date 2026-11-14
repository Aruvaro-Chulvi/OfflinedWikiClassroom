/* WikiAula — Salud y educación física, Grado 3: aparato locomotor, postura y mochila, pulso, pirámide de actividad, plato
   saludable, juegos cooperativos, bici y prevención de lesiones. Textos y bancos en i18n/<lang>/sal3.js (S.sal3). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal3.locomotor", (R, S) => B.mixed(S.sal3.locomotor, R));
def("sal3.postura", (R, S) => B.mixed(S.sal3.postura, R));
def("sal3.piramide", (R, S) => B.mixed(S.sal3.piramide, R));
def("sal3.plato", (R, S) => B.mixed(S.sal3.plato, R));
def("sal3.coop", (R, S) => B.mixed(S.sal3.coop, R));
def("sal3.bici", (R, S) => B.mixed(S.sal3.bici, R));
def("sal3.lesion", (R, S) => B.mixed(S.sal3.lesion, R));

// Peso máximo de la mochila: 10 % del peso.
def("sal3.mochila", (R, S) => {
  const T = S.sal3, p = R.int(20, 45), m = p / 10;
  return { q: T.mo_q(p), kind: "num", ans: m, tol: 0.01, sol: T.mo_s(p, m) };
});

// Pulsaciones por minuto: latidos en 15 s × 4 (o en 10 s × 6).
def("sal3.pulso", (R, S) => {
  const T = S.sal3;
  if (R.int(0, 3)) { const l = R.int(18, 42); return { q: T.pu_q(l, 15), kind: "int", ans: l * 4, sol: T.pu_s(l, 4, l * 4) }; }
  const l = R.int(12, 28);
  return { q: T.pu_q(l, 10), kind: "int", ans: l * 6, sol: T.pu_s(l, 6, l * 6) };
});
})();
