/* WikiAula — Biología y Geología, Grado 9 (3.º de ESO): bancos y problemas.
   Textos y bancos en i18n/<lang>/bg9.js (S.bg9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg9.tejido", (R, S) => B.mixed(S.bg9.tejido, R));
def("bg9.funcion", (R, S) => B.mixed(S.bg9.funcion, R));
def("bg9.nutriente", (R, S) => B.mixed(S.bg9.nutriente, R));
def("bg9.dieta", (R, S) => B.mixed(S.bg9.dieta, R));
def("bg9.digestivo", (R, S) => B.mixed(S.bg9.digestivo, R));
def("bg9.respiratorio", (R, S) => B.mixed(S.bg9.respiratorio, R));
def("bg9.circulatorio", (R, S) => B.mixed(S.bg9.circulatorio, R));
def("bg9.excretor", (R, S) => B.mixed(S.bg9.excretor, R));
def("bg9.nervioso", (R, S) => B.mixed(S.bg9.nervioso, R));
def("bg9.sentido", (R, S) => B.mixed(S.bg9.sentido, R));
def("bg9.hormona", (R, S) => B.mixed(S.bg9.hormona, R));
def("bg9.locomotor", (R, S) => B.mixed(S.bg9.locomotor, R));
def("bg9.reproductor", (R, S) => B.mixed(S.bg9.reproductor, R));
def("bg9.ciclo", (R, S) => B.mixed(S.bg9.ciclo, R));
def("bg9.its", (R, S) => B.mixed(S.bg9.its, R));
def("bg9.enfermedad", (R, S) => B.mixed(S.bg9.enfermedad, R));
def("bg9.defensa", (R, S) => B.mixed(S.bg9.defensa, R));
def("bg9.vacuna", (R, S) => B.mixed(S.bg9.vacuna, R));
def("bg9.droga", (R, S) => B.mixed(S.bg9.droga, R));
def("bg9.habito", (R, S) => B.mixed(S.bg9.habito, R));

def("bg9.kcal", (R, S, H) => {
  const T = S.bg9, p = R.int(1, 20), g = R.int(2, 60), l = R.int(0, 25), r = p * 4 + g * 4 + l * 9;
  return { q: T.kc_q(p, g, l), kind: "int", ans: r, sol: T.kc_s(p, g, l, H.n(r)) };
});
def("bg9.imc", (R, S, H) => {
  const T = S.bg9, m = R.int(50, 95), h = R.pick([1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85]), r = Math.round(m / (h * h) * 10) / 10;
  return { q: T.imc_q(m, H.dec(h)), kind: "num", ans: r, tol: 0.15, sol: T.imc_s(m, H.dec(h), H.dec(r)) };
});
def("bg9.ventilacion", (R, S, H) => {
  const T = S.bg9, f = R.pick([12, 14, 15, 16, 20, 30, 40]), v = R.pick([0.5, 1, 1.5, 2]), r = Math.round(f * v * 10) / 10;
  return { q: T.ve_q(f, H.dec(v)), kind: "num", ans: r, tol: 0.05, sol: T.ve_s(f, H.dec(v), H.dec(r)) };
});
def("bg9.pulso", (R, S, H) => {
  const T = S.bg9, s = R.pick([10, 15, 20, 30]), n = R.int(Math.round(55 * s / 60), Math.round(110 * s / 60)), r = n * 60 / s;
  return { q: T.pu_q(n, s), kind: "int", ans: r, sol: T.pu_s(n, s, H.n(r)) };
});
def("bg9.dias", (R, S, H) => {
  const T = S.bg9, d = R.int(1, 28), c = R.int(25, 32), t = d + c, r = t > 31 ? t - 31 : t;
  return { q: T.di_q(d, c), kind: "int", ans: r, sol: T.di_s(d, c, r) };
});
})();
