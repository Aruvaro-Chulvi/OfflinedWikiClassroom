/* WikiAula — Salud y educación física, Grado 9: principios del entrenamiento, Karvonen, planificación, salud mental, adicciones
   sin sustancia, sexualidad saludable, VMP, atragantamiento y ergonomía. Textos y bancos en i18n/<lang>/sal9.js (S.sal9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal9.principio", (R, S) => B.mixed(S.sal9.principio, R));
def("sal9.sesion", (R, S) => B.mixed(S.sal9.sesion, R));
def("sal9.mental", (R, S) => B.mixed(S.sal9.mental, R));
def("sal9.ludopatia", (R, S) => B.mixed(S.sal9.ludopatia, R));
def("sal9.sexual", (R, S) => B.mixed(S.sal9.sexual, R));
def("sal9.vmp", (R, S) => B.mixed(S.sal9.vmp, R));
def("sal9.atragante", (R, S) => B.mixed(S.sal9.atragante, R));
def("sal9.ergo", (R, S) => B.mixed(S.sal9.ergo, R));

// Karvonen: FC rep + % × (220 − edad − FC rep).
def("sal9.karvonen", (R, S) => {
  const T = S.sal9, e = R.int(13, 18), r = R.pick([55, 60, 65, 70, 75, 80]), p = R.pick([50, 60, 70, 75, 80, 85]), f = 220 - e, res = f - r, z = Math.round(r + res * p / 100);
  return { q: T.ka_q(e, r, p), kind: "num", ans: z, tol: 1, sol: T.ka_s(e, f, r, res, p, z) };
});

// Volumen semanal.
def("sal9.volumen", (R, S) => {
  const T = S.sal9, a = R.int(2, 4), m = R.pick([30, 40, 45, 50]), b = R.pick([0, 1]), m2 = R.pick([60, 75, 90]), v = a * m + b * m2;
  return { q: T.vo_q(a, m, b, m2), kind: "int", ans: v, sol: T.vo_s(a, m, b, m2, v) };
});

// Ganancia esperada = p × premio − apuesta.
def("sal9.esperanza", (R, S, H) => {
  const T = S.sal9, [num, den] = R.pick([[1, 10], [1, 5], [1, 4], [1, 20], [1, 2]]), a = R.pick([1, 2]), lim = a * den / num;
  const pr = R.int(Math.max(1, Math.floor(lim / 2)), Math.ceil(lim) - 1), g = +(pr * num / den - a).toFixed(2);
  return { q: T.es_q(pr, num, den, a), kind: "num", ans: g, tol: 0.01, ansHtml: WA.MATH.eur(g, H) + " €", sol: T.es_s(pr, num, den, a, g) };
});
})();
