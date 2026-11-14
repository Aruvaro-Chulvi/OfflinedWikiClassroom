/* WikiAula — Salud y educación física, Grado 7: condición física saludable, calentamiento, resistencia y zonas de FC, kcal,
   sueño, pantallas, tabaco y vapeo, PLS y deporte inclusivo. Textos y bancos en i18n/<lang>/sal7.js (S.sal7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal7.componente", (R, S) => B.mixed(S.sal7.componente, R));
def("sal7.calentar", (R, S) => B.mixed(S.sal7.calentar, R));
def("sal7.sistema", (R, S) => B.mixed(S.sal7.sistema, R));
def("sal7.adolescente", (R, S) => B.mixed(S.sal7.adolescente, R));
def("sal7.higiene", (R, S) => B.mixed(S.sal7.higiene, R));
def("sal7.digital", (R, S) => B.mixed(S.sal7.digital, R));
def("sal7.tabaco", (R, S) => B.mixed(S.sal7.tabaco, R));
def("sal7.pls", (R, S) => B.mixed(S.sal7.pls, R));
def("sal7.inclusivo", (R, S) => B.mixed(S.sal7.inclusivo, R));

// Zona aeróbica (60 % o 80 % de 220 − edad).
def("sal7.zona", (R, S) => {
  const T = S.sal7, e = R.int(11, 17), f = 220 - e, p = R.pick([60, 70, 80]), z = Math.round(f * p / 100);
  return { q: T.zo_q(e, p), kind: "num", ans: z, tol: 1, sol: T.zo_s(e, f, p, z) };
});

// kcal = 4·HC + 4·P + 9·G.
def("sal7.kcal", (R, S) => {
  const T = S.sal7, [al] = R.pick(T.alimentos), h = R.int(0, 60), p = R.int(1, 25), g = R.int(0, 20), k = 4 * h + 4 * p + 9 * g;
  return { q: T.kc_q(al, h, p, g), kind: "int", ans: k, sol: T.kc_s(h, p, g, k) };
});

// Horas de sueño entre dos horas (con medias horas).
def("sal7.horas", (R, S) => {
  const T = S.sal7, a = R.pick([21.5, 22, 22.5, 23, 23.5, 24]), b = R.pick([6.5, 7, 7.5, 8, 8.5]), h = 24 - a + b;
  return { q: T.ho_q(a, b), kind: "num", ans: h, tol: 0.01, sol: T.ho_s(a, b, h) };
});
})();
