/* WikiAula — Música, Grado 4: notas, puntillo y ligadura, tempo y metrónomo, forma, cuerda, viento, Edad Media y teatro musical.
   Textos y bancos en i18n/<lang>/mus4.js (S.mus4). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus4.nota", (R, S) => B.mixed(S.mus4.nota, R));
def("mus4.tempo", (R, S) => B.mixed(S.mus4.tempo, R));
def("mus4.forma", (R, S) => B.mixed(S.mus4.forma, R));
def("mus4.cuerda", (R, S) => B.mixed(S.mus4.cuerda, R));
def("mus4.viento", (R, S) => B.mixed(S.mus4.viento, R));
def("mus4.medieval", (R, S) => B.mixed(S.mus4.medieval, R));
def("mus4.escena", (R, S) => B.mixed(S.mus4.escena, R));

// Duraciones con puntillo y ligadura.
def("mus4.puntillo", (R, S) => {
  const T = S.mus4, F = [["redonda", 4], ["blanca", 2], ["negra", 1], ["corchea", 0.5]];
  if (R.int(0, 1) === 0) {
    const [nm, v] = R.pick(F.slice(0, 3));
    return { q: T.pu_q(nm), kind: "num", ans: v * 1.5, tol: 0.01, sol: T.pu_s(v) };
  }
  const a = R.pick(F), b = R.pick(F);
  return { q: T.li_q(a[0], b[0]), kind: "num", ans: a[1] + b[1], tol: 0.01, sol: T.li_s(a[1], b[1]) };
});

// Pulsos = ppm × minutos (o segundos ÷ 60).
def("mus4.bpm", (R, S) => {
  const T = S.mus4, ppm = R.pick([60, 80, 90, 100, 120, 140]), k = R.int(0, 2);
  if (k === 0) { const m = R.int(1, 5); return { q: T.bp_q(ppm, m), kind: "int", ans: ppm * m, sol: T.bp_s(ppm, m) }; }
  if (k === 1) { const s = R.pick(ppm % 4 === 0 ? [15, 30, 45] : [30]); return { q: T.bs_q(ppm, s), kind: "int", ans: ppm * s / 60, sol: T.bs_s(ppm, s) }; }
  return { q: T.bt_q(ppm), kind: "num", ans: +(60 / ppm).toFixed(2), tol: 0.01, sol: T.bt_s(ppm) };
});
})();
