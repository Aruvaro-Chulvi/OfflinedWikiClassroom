/* WikiAula — Salud y educación física, Grado 4: capacidades físicas, calentamiento, respiración, pantallas, nutrientes,
   etiquetas, tipos de deporte y primeros auxilios. Textos y bancos en i18n/<lang>/sal4.js (S.sal4). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal4.capacidad", (R, S) => B.mixed(S.sal4.capacidad, R));
def("sal4.calentar", (R, S) => B.mixed(S.sal4.calentar, R));
def("sal4.respira", (R, S) => B.mixed(S.sal4.respira, R));
def("sal4.ocio", (R, S) => B.mixed(S.sal4.ocio, R));
def("sal4.nutriente", (R, S) => B.mixed(S.sal4.nutriente, R));
def("sal4.nutriscore", (R, S) => B.mixed(S.sal4.nutriscore, R));
def("sal4.deporte", (R, S) => B.mixed(S.sal4.deporte, R));
def("sal4.auxilio", (R, S) => B.mixed(S.sal4.auxilio, R));

// Respiraciones por minuto: en 15 s × 4.
def("sal4.resp", (R, S) => {
  const T = S.sal4, r = R.int(4, 14);
  return { q: T.re_q(r), kind: "int", ans: r * 4, sol: T.re_s(r, r * 4) };
});

// Horas de pantalla a la semana.
def("sal4.horas", (R, S) => {
  const T = S.sal4, h = R.pick([1, 1.5, 2, 2.5, 3, 4]), t = h * 7;
  return { q: T.ho_q(h), kind: "num", ans: t, tol: 0.01, sol: T.ho_s(h, t) };
});

// Azúcar en una ración y terrones (4 g).
def("sal4.azucar", (R, S) => {
  const T = S.sal4, [p, c] = R.pick(T.productos), g = R.pick([20, 25, 30, 40, 50]), a = +(c * g / 100).toFixed(1);
  if (R.int(0, 1)) return { q: T.az_q1(p, c, g), kind: "num", ans: a, tol: 0.05, sol: T.az_s1(c, g, a) };
  const tr = +(a / 4).toFixed(1);
  return { q: T.az_q2(p, c, g), kind: "num", ans: tr, tol: 0.1, sol: T.az_s2(c, g, a, tr) };
});
})();
