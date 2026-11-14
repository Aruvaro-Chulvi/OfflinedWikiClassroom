/* WikiAula — Música, Grado 6: acordes, mayor y menor, semicorcheas, compás de 6/8, Romanticismo y siglo XX, músicas urbanas,
   música de cine e instrumentos del mundo. Textos y bancos en i18n/<lang>/mus6.js (S.mus6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus6.acorde", (R, S) => B.mixed(S.mus6.acorde, R));
def("mus6.modo", (R, S) => B.mixed(S.mus6.modo, R));
def("mus6.compas", (R, S) => B.mixed(S.mus6.compas, R));
def("mus6.epoca", (R, S) => B.mixed(S.mus6.epoca, R));
def("mus6.estilo", (R, S) => B.mixed(S.mus6.estilo, R));
def("mus6.cine", (R, S) => B.mixed(S.mus6.cine, R));
def("mus6.mundo", (R, S) => B.mixed(S.mus6.mundo, R));

// Suma de duraciones con semicorcheas.
def("mus6.figura", (R, S) => {
  const T = S.mus6, vals = [2, 1, 0.5, 0.25], n = R.int(2, 5), idx = [];
  for (let i = 0; i < n; i++) idx.push(R.pick([0, 1, 1, 2, 2, 3, 3, 3]));
  const tot = idx.reduce((s, i) => s + vals[i], 0);
  return { q: T.fi_q(idx), kind: "num", ans: tot, tol: 0.001, sol: T.fi_s(idx, tot) };
});
})();
