/* WikiAula — Música, Grado 5: tonos y semitonos, alteraciones, intervalos, voces, agrupaciones, Barroco y Clasicismo, soportes y decibelios.
   Textos y bancos en i18n/<lang>/mus5.js (S.mus5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const NOTES = ["do", "re", "mi", "fa", "sol", "la", "si"];

def("mus5.tono", (R, S) => B.mixed(S.mus5.tono, R));
def("mus5.alteracion", (R, S) => B.mixed(S.mus5.alteracion, R));
def("mus5.voz", (R, S) => B.mixed(S.mus5.voz, R));
def("mus5.agrupacion", (R, S) => B.mixed(S.mus5.agrupacion, R));
def("mus5.epoca", (R, S) => B.mixed(S.mus5.epoca, R));
def("mus5.soporte", (R, S) => B.mixed(S.mus5.soporte, R));
def("mus5.decibelio", (R, S) => B.mixed(S.mus5.decibelio, R));

// Intervalo: contar notas de la primera a la última (ascendente o descendente).
def("mus5.intervalo", (R, S) => {
  const T = S.mus5, a = R.int(0, 6), size = R.int(2, 8), up = R.int(0, 2) > 0;
  const b = up ? a + size - 1 : a - (size - 1), seq = [];
  for (let i = 0; i < size; i++) seq.push(NOTES[(((up ? a + i : a - i) % 7) + 7) % 7]);
  return { q: T.in_q(NOTES[a], NOTES[((b % 7) + 7) % 7], up, size === 8), kind: "int", ans: size, sol: T.in_s(seq, size) };
});

// Músicos de una agrupación.
def("mus5.cuantos", (R, S) => {
  const T = S.mus5, g = R.pick([["un dúo", 2], ["un trío", 3], ["un cuarteto", 4], ["un quinteto", 5], ["un sexteto", 6]]), k = R.int(2, 6);
  return { q: T.cu_q(g[0], k), kind: "int", ans: g[1] * k, sol: T.cu_s(g[1], k) };
});
})();
