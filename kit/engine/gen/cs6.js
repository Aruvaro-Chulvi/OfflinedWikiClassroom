/* WikiAula — Ciencias sociales, Grado 6 (6.º de Primaria): bancos y problemas sencillos.
   Textos y bancos en i18n/<lang>/cs6.js (S.cs6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs6.viaje", (R, S) => B.mixed(S.cs6.viaje, R));
def("cs6.renac", (R, S) => B.mixed(S.cs6.renac, R));
def("cs6.ciencia", (R, S) => B.mixed(S.cs6.ciencia, R));
def("cs6.revol", (R, S) => B.mixed(S.cs6.revol, R));
def("cs6.industria", (R, S) => B.mixed(S.cs6.industria, R));
def("cs6.xx", (R, S) => B.mixed(S.cs6.xx, R));
def("cs6.global", (R, S) => B.mixed(S.cs6.global, R));
def("cs6.agente", (R, S) => B.mixed(S.cs6.agente, R));
def("cs6.oferta", (R, S) => B.mixed(S.cs6.oferta, R));
def("cs6.empresa", (R, S) => B.mixed(S.cs6.empresa, R));
def("cs6.ods", (R, S) => B.mixed(S.cs6.ods, R));
def("cs6.idh", (R, S) => B.mixed(S.cs6.idh, R));
def("cs6.estado", (R, S) => B.mixed(S.cs6.estado, R));
def("cs6.organiz", (R, S) => B.mixed(S.cs6.organiz, R));
def("cs6.paz", (R, S) => B.mixed(S.cs6.paz, R));
def("cs6.mujer", (R, S) => B.mixed(S.cs6.mujer, R));
def("cs6.ciudad", (R, S) => B.mixed(S.cs6.ciudad, R));

def("cs6.siglo", (R, S) => {
  const T = S.cs6, y = R.int(101, 2025), c = Math.ceil(y / 100);
  return { q: T.si_q(y), kind: "int", ans: c, sol: T.si_s(y, c) };
});
def("cs6.duracion", (R, S) => {
  const T = S.cs6, e = R.pick(T.du_data);
  return { q: T.du_q(e[0], e[1], e[2]), kind: "int", ans: e[2] - e[1], sol: T.du_s(e[1], e[2]) };
});
def("cs6.iva", (R, S, H) => {
  const T = S.cs6, p = R.int(2, 20) * 10, t = R.pick([10, 21]), r = p * t / 100;
  return { q: T.iva_q(p, t), kind: "num", ans: p + r, tol: 0.01, sol: T.iva_s(p, t, H.n(r), H.n(p + r)) };
});
def("cs6.beneficio", (R, S) => {
  const T = S.cs6, n = R.int(20, 200), pr = R.pick([2, 3, 5, 10]), c = R.int(10, 60) * 10, i = n * pr, b = i - c;
  return { q: T.be_q(n, pr, c), kind: "int", ans: b, sol: T.be_s(n, pr, i, c, b) };
});
})();
