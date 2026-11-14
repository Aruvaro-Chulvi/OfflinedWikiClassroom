/* WikiAula — Música, Grado 7: física del sonido, parámetros, ritmo, melodía e intervalos, textura, forma, organología, voz,
   audición activa y creación. Textos y bancos en i18n/<lang>/mus7.js (S.mus7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const NOTES = ["do", "re", "mi", "fa", "sol", "la", "si"];

def("mus7.parametro", (R, S) => B.mixed(S.mus7.parametro, R));
def("mus7.ritmo", (R, S) => B.mixed(S.mus7.ritmo, R));
def("mus7.escala", (R, S) => B.mixed(S.mus7.escala, R));
def("mus7.textura", (R, S) => B.mixed(S.mus7.textura, R));
def("mus7.forma", (R, S) => B.mixed(S.mus7.forma, R));
def("mus7.organologia", (R, S) => B.mixed(S.mus7.organologia, R));
def("mus7.voz", (R, S) => B.mixed(S.mus7.voz, R));
def("mus7.audicion", (R, S) => B.mixed(S.mus7.audicion, R));
def("mus7.crear", (R, S) => B.mixed(S.mus7.crear, R));

// Frecuencia: octavas (×2), periodo, armónicos y distancia del trueno.
def("mus7.frecuencia", (R, S) => {
  const T = S.mus7, k = R.int(0, 3);
  if (k === 0) { const f0 = R.pick([110, 220, 440, 262, 330]), up = R.int(0, 1) === 0, o = R.int(1, 2); const ans = up ? f0 * 2 ** o : f0 / 2 ** o;
    return { q: T.oc_q(f0, o, up), kind: "num", ans, tol: 0.01, sol: T.oc_s(f0, o, up, ans) }; }
  if (k === 1) { const f0 = R.pick([100, 200, 250, 400, 500, 1000]); return { q: T.pe_q(f0), kind: "num", ans: 1 / f0, tol: 1e-6, sol: T.pe_s(f0) }; }
  if (k === 2) { const f0 = R.pick([110, 220, 200, 300, 440]), h = R.int(2, 5); return { q: T.ar_q(f0, h), kind: "int", ans: f0 * h, sol: T.ar_s(f0, h) }; }
  const t = R.int(1, 8); return { q: T.tr_q(t), kind: "int", ans: 340 * t, sol: T.tr_s(t) };
});

// Intervalo (número) entre dos notas, ascendente.
def("mus7.intervalo", (R, S) => {
  const T = S.mus7, a = R.int(0, 6), size = R.int(2, 8), seq = [];
  for (let i = 0; i < size; i++) seq.push(NOTES[(a + i) % 7]);
  return { q: T.in_q(NOTES[a], NOTES[(a + size - 1) % 7]), kind: "int", ans: size, sol: T.in_s(seq, size) };
});
})();
