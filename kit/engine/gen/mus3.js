/* WikiAula — Música, Grado 3: pentagrama, notas, compás, figuras y silencios, flauta dulce, orquesta, matices y compositores.
   Textos y bancos en i18n/<lang>/mus3.js (S.mus3). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus3.pentagrama", (R, S) => B.mixed(S.mus3.pentagrama, R));
def("mus3.nota", (R, S) => B.mixed(S.mus3.nota, R));
def("mus3.flauta", (R, S) => B.mixed(S.mus3.flauta, R));
def("mus3.orquesta", (R, S) => B.mixed(S.mus3.orquesta, R));
def("mus3.matiz", (R, S) => B.mixed(S.mus3.matiz, R));
def("mus3.compositor", (R, S) => B.mixed(S.mus3.compositor, R));

// Compases: tiempos por compás o número de compases.
def("mus3.compas", (R, S) => {
  const T = S.mus3, t = R.pick([2, 3, 4]), k = R.int(0, 2);
  if (k === 0) return { q: T.cp_q(t), kind: "int", ans: t, sol: T.cp_s(t) };
  const n = R.int(2, 12);
  return { q: T.cn_q(n * t, t), kind: "int", ans: n, sol: T.cn_s(n * t, t, n) };
});

// Suma de duraciones de figuras (redonda 4, blanca 2, negra 1, corchea ½, silencio de negra 1).
def("mus3.figura", (R, S) => {
  const T = S.mus3, vals = [4, 2, 1, 0.5, 1, 2], n = R.int(2, 4), idx = [];
  for (let i = 0; i < n; i++) idx.push(R.pick([1, 1, 2, 2, 2, 3, 3, 4, 5, 0]));
  const tot = idx.reduce((s, i) => s + vals[i], 0);
  return { q: T.fi_q(idx), kind: "num", ans: tot, tol: 0.01, sol: T.fi_s(idx, tot) };
});
})();
