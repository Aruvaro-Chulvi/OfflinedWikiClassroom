/* WikiAula — Salud y educación física, Grado 5: sistema cardiorrespiratorio, zonas de esfuerzo, raciones, hidratación, juego
   limpio, orientación, pubertad y primeros auxilios. Textos y bancos en i18n/<lang>/sal5.js (S.sal5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sal5.circula", (R, S) => B.mixed(S.sal5.circula, R));
def("sal5.habla", (R, S) => B.mixed(S.sal5.habla, R));
def("sal5.racion", (R, S) => B.mixed(S.sal5.racion, R));
def("sal5.agua", (R, S) => B.mixed(S.sal5.agua, R));
def("sal5.juego", (R, S) => B.mixed(S.sal5.juego, R));
def("sal5.cardinal", (R, S) => B.mixed(S.sal5.cardinal, R));
def("sal5.pubertad", (R, S) => B.mixed(S.sal5.pubertad, R));
def("sal5.auxilio", (R, S) => B.mixed(S.sal5.auxilio, R));

// FC máx ≈ 220 − edad.
def("sal5.fcmax", (R, S) => {
  const T = S.sal5, e = R.int(8, 70);
  return { q: T.fc_q(e), kind: "int", ans: 220 - e, sol: T.fc_s(e, 220 - e) };
});

// Pulsaciones de una zona: FC máx × % ÷ 100.
def("sal5.zona", (R, S) => {
  const T = S.sal5, f = R.pick([200, 205, 210, 180, 190]), p = R.pick([50, 60, 70, 80, 90]), z = f * p / 100;
  return { q: T.zo_q(f, p), kind: "num", ans: z, tol: 0.5, sol: T.zo_s(f, p, z) };
});

// Sudor perdido y agua a beber (×1,5).
def("sal5.sudor", (R, S) => {
  const T = S.sal5, a = R.int(300, 650) / 10, d = R.pick([0.2, 0.4, 0.5, 0.6, 0.8, 1, 1.2]), b = +(a - d).toFixed(1), w = +(d * 1.5).toFixed(2);
  return { q: T.su_q(a, b), kind: "num", ans: w, tol: 0.01, sol: T.su_s(a, b, d, w) };
});

// Escala 1:10 000 → 1 cm = 100 m (o 1:5000 → 50 m).
def("sal5.escala", (R, S) => {
  const T = S.sal5, [e, m] = R.pick([[10000, 100], [5000, 50], [15000, 150]]), c = R.int(2, 12);
  return { q: T.es_q(e, c), kind: "int", ans: c * m, sol: T.es_s(e, m, c, c * m) };
});
})();
