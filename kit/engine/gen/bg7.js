/* WikiAula — Biología y Geología, Grado 7 (1.º de ESO): bancos y problemas.
   Textos y bancos en i18n/<lang>/bg7.js (S.bg7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg7.metodo", (R, S) => B.mixed(S.bg7.metodo, R));
def("bg7.vivo", (R, S) => B.mixed(S.bg7.vivo, R));
def("bg7.celula", (R, S) => B.mixed(S.bg7.celula, R));
def("bg7.organulo", (R, S) => B.mixed(S.bg7.organulo, R));
def("bg7.niveles", (R, S) => B.mixed(S.bg7.niveles, R));
def("bg7.reino", (R, S) => B.mixed(S.bg7.reino, R));
def("bg7.clave", (R, S) => B.mixed(S.bg7.clave, R));
def("bg7.hongo", (R, S) => B.mixed(S.bg7.hongo, R));
def("bg7.planta", (R, S) => B.mixed(S.bg7.planta, R));
def("bg7.fotosintesis", (R, S) => B.mixed(S.bg7.fotosintesis, R));
def("bg7.flor", (R, S) => B.mixed(S.bg7.flor, R));
def("bg7.invertebrado", (R, S) => B.mixed(S.bg7.invertebrado, R));
def("bg7.artropodo", (R, S) => B.mixed(S.bg7.artropodo, R));
def("bg7.vertebrado", (R, S) => B.mixed(S.bg7.vertebrado, R));
def("bg7.mamifero", (R, S) => B.mixed(S.bg7.mamifero, R));
def("bg7.sintiente", (R, S) => B.mixed(S.bg7.sintiente, R));
def("bg7.biotico", (R, S) => B.mixed(S.bg7.biotico, R));
def("bg7.relacion", (R, S) => B.mixed(S.bg7.relacion, R));
def("bg7.amenaza", (R, S) => B.mixed(S.bg7.amenaza, R));

def("bg7.aumentos", (R, S, H) => {
  const T = S.bg7, oc = R.pick([5, 10, 15]), ob = R.pick([4, 10, 40, 100]), r = oc * ob;
  if (R.r() < 0.6) return { q: T.au_q(oc, ob), kind: "int", ans: r, sol: T.au_s(oc, ob, H.n(r)) };
  const um = R.pick([2, 10, 20, 50, 100]), mm = Math.round(um / 1000 * r * 100) / 100;
  return { q: T.au_q2(r, um), kind: "num", ans: mm, tol: Math.max(0.01, mm * 0.01), sol: T.au_s2(r, um, H.dec(mm)) };
});
def("bg7.micro", (R, S, H) => {
  const T = S.bg7;
  if (R.r() < 0.6) return B.mixed(T.micro, R);
  const min = R.pick([20, 30, 60]), h = R.pick([1, 2, 3, 4]), n = h * 60 / min, r = 2 ** n;
  return { q: T.bi_q(min, h), kind: "int", ans: r, sol: T.bi_s(n, H.n(r)) };
});
})();
