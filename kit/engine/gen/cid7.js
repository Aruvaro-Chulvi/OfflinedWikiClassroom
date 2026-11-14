/* WikiAula — Ciudadanía y ética, Grado 7: ética y moral, normas, dignidad, Kohlberg, Aristóteles, Epicuro, Kant, utilitarismo, dilemas,
   falacias, asertividad y relaciones sanas. Textos y bancos en i18n/<lang>/cid7.js (S.cid7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid7.juicio", (R, S) => B.mixed(S.cid7.juicio, R));
def("cid7.norma", (R, S) => B.mixed(S.cid7.norma, R));
def("cid7.dignidad", (R, S) => B.mixed(S.cid7.dignidad, R));
def("cid7.kohlberg", (R, S) => B.mixed(S.cid7.kohlberg, R));
def("cid7.medio", (R, S) => B.mixed(S.cid7.medio, R));
def("cid7.deseo", (R, S) => B.mixed(S.cid7.deseo, R));
def("cid7.kant", (R, S) => B.mixed(S.cid7.kant, R));
def("cid7.teoria", (R, S) => B.mixed(S.cid7.teoria, R));
def("cid7.dilema", (R, S) => B.mixed(S.cid7.dilema, R));
def("cid7.falacia", (R, S) => B.mixed(S.cid7.falacia, R));
def("cid7.estilo", (R, S) => B.mixed(S.cid7.estilo, R));
def("cid7.relacion", (R, S) => B.mixed(S.cid7.relacion, R));

// Cálculo utilitarista: personas × puntos (− perjudicados).
def("cid7.utilidad", (R, S) => {
  const T = S.cid7, [a, b] = R.pick(T.proyectos);
  const mk = () => ({ n: R.int(1, 8) * 50, p: R.int(1, 5), m: R.int(0, 1) ? R.int(1, 4) * 20 : 0, l: R.int(1, 3) });
  const tot = o => o.n * o.p - o.m * o.l;
  let A = mk(), Bo = mk();
  while (tot(A) === tot(Bo)) Bo = mk();
  if (R.int(0, 1)) return { q: T.ut_q1(a, A), kind: "int", ans: tot(A), sol: T.ut_s1(A, tot(A)) };
  const w = tot(A) > tot(Bo) ? 0 : 1;
  return { q: T.ut_q2(a, A, b, Bo), kind: "choice", opts: [a, b], correct: w, shuffle: false, sol: T.ut_s2(a, tot(A), b, tot(Bo), [a, b][w]) };
});
})();
