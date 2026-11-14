/* WikiAula — Ciudadanía y ética, Grado 5: identidad, emociones, empatía, normas, conflictos, acoso, derechos, igualdad, planeta y votaciones.
   Textos y bancos en i18n/<lang>/cid5.js (S.cid5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid5.identidad", (R, S) => B.mixed(S.cid5.identidad, R));
def("cid5.emocion", (R, S) => B.mixed(S.cid5.emocion, R));
def("cid5.empatia", (R, S) => B.mixed(S.cid5.empatia, R));
def("cid5.norma", (R, S) => B.mixed(S.cid5.norma, R));
def("cid5.conflicto", (R, S) => B.mixed(S.cid5.conflicto, R));
def("cid5.acoso", (R, S) => B.mixed(S.cid5.acoso, R));
def("cid5.derecho", (R, S) => B.mixed(S.cid5.derecho, R));
def("cid5.igualdad", (R, S) => B.mixed(S.cid5.igualdad, R));
def("cid5.planeta", (R, S) => B.mixed(S.cid5.planeta, R));
def("cid5.participar", (R, S) => B.mixed(S.cid5.participar, R));

def("cid5.voto", (R, S) => {
  const T = S.cid5, opts = R.shuffle(T.opciones.slice()).slice(0, 3), v = [R.int(3, 12), R.int(3, 12), R.int(3, 12)];
  if (new Set(v).size < 3) v[0] = Math.max(...v) + 1;
  const k = R.int(0, 1);
  if (k === 0) { const w = v.indexOf(Math.max(...v)); return { q: T.vo_q1(opts, v), kind: "choice", opts, correct: w, shuffle: false, sol: T.vo_s1(opts[w], v[w]) }; }
  const tot = v.reduce((a, b) => a + b, 0);
  return { q: T.vo_q2(opts, v), kind: "int", ans: tot, sol: T.vo_s2(v, tot) };
});
})();
