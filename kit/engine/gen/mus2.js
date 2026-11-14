/* WikiAula — Música, Grado 2: timbre, cualidades del sonido, pulso y ritmo, figuras, familias de instrumentos, Pedro y el lobo,
   danzas populares y usos de la música. Textos y bancos en i18n/<lang>/mus2.js (S.mus2). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus2.material", (R, S) => B.mixed(S.mus2.material, R));
def("mus2.cualidad", (R, S) => B.mixed(S.mus2.cualidad, R));
def("mus2.pulso", (R, S) => B.mixed(S.mus2.pulso, R));
def("mus2.figura", (R, S) => B.mixed(S.mus2.figura, R));
def("mus2.familia", (R, S) => B.mixed(S.mus2.familia, R));
def("mus2.pedro", (R, S) => B.mixed(S.mus2.pedro, R));
def("mus2.danza", (R, S) => B.mixed(S.mus2.danza, R));
def("mus2.uso", (R, S) => B.mixed(S.mus2.uso, R));

// Contar pulsos de un ritmo: ta = 1, ti-ti = 1, ta-a = 2, silencio = 1.
def("mus2.contar", (R, S) => {
  const T = S.mus2, toks = [], n = R.int(3, 6);
  for (let i = 0; i < n; i++) toks.push(R.pick([0, 0, 1, 1, 2, 3]));
  const val = [1, 1, 2, 1], tot = toks.reduce((s, t) => s + val[t], 0);
  return { q: T.co_q(toks), kind: "int", ans: tot, sol: T.co_s(toks, tot) };
});
})();
