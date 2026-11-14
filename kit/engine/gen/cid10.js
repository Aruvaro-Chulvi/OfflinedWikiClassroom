/* WikiAula — Ciudadanía y ética, Grado 10: bioética, genética, donación, IA, datos, economía, ética ambiental y animal, justicia,
   justicia global, paz y ciudadanía global. Textos y bancos en i18n/<lang>/cid10.js (S.cid10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid10.principio", (R, S) => B.mixed(S.cid10.principio, R));
def("cid10.genetica", (R, S) => B.mixed(S.cid10.genetica, R));
def("cid10.final", (R, S) => B.mixed(S.cid10.final, R));
def("cid10.ia", (R, S) => B.mixed(S.cid10.ia, R));
def("cid10.datos", (R, S) => B.mixed(S.cid10.datos, R));
def("cid10.economia", (R, S) => B.mixed(S.cid10.economia, R));
def("cid10.centrismo", (R, S) => B.mixed(S.cid10.centrismo, R));
def("cid10.animal", (R, S) => B.mixed(S.cid10.animal, R));
def("cid10.justicia", (R, S) => B.mixed(S.cid10.justicia, R));
def("cid10.global", (R, S) => B.mixed(S.cid10.global, R));
def("cid10.violencia", (R, S) => B.mixed(S.cid10.violencia, R));
def("cid10.autor", (R, S) => B.mixed(S.cid10.autor, R));

// Donantes por millón de habitantes.
def("cid10.pmp", (R, S) => {
  const T = S.cid10, m = R.int(2, 60), t = R.int(10, 50);
  return { q: T.pm_q(m, m * t), kind: "int", ans: t, sol: T.pm_s(m, m * t, t) };
});

// Huella ecológica: ¿cuántas Tierras? (biocapacidad 1,6 gha por persona).
def("cid10.huella", (R, S) => {
  const T = S.cid10, k = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6]), h = +(k * 1.6).toFixed(1);
  return { q: T.hu_q(h), kind: "num", ans: k, tol: 0.05, sol: T.hu_s(h, k) };
});

// Maximin (Rawls) frente a suma total (utilitarismo).
def("cid10.maximin", (R, S) => {
  const T = S.cid10;
  const mk = () => [R.int(1, 8) * 5, R.int(5, 14) * 5, R.int(12, 40) * 5].sort((a, b) => a - b);
  const A = mk(), sum = x => x[0] + x[1] + x[2];
  let Bs = mk();
  while (A[0] === Bs[0] || sum(A) === sum(Bs)) Bs = mk();
  const rawls = R.int(0, 1), w = rawls ? (A[0] > Bs[0] ? 0 : 1) : (sum(A) > sum(Bs) ? 0 : 1);
  return { q: T.mx_q(A, Bs, rawls), kind: "choice", opts: ["A", "B"], correct: w, shuffle: false, sol: T.mx_s(A, Bs, rawls, ["A", "B"][w]) };
});

// El 0,7 % de la renta nacional.
def("cid10.ayuda", (R, S) => {
  const T = S.cid10, r = R.int(1, 30) * 10000, a = Math.round(r * 0.007);
  return { q: T.ay_q(r), kind: "int", ans: a, sol: T.ay_s(r, a) };
});
})();
