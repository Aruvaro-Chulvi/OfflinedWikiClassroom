/* WikiAula — Biología y Geología, Grado 8 (2.º de ESO): bancos y problemas.
   Textos y bancos en i18n/<lang>/bg8.js (S.bg8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg8.planeta", (R, S) => B.mixed(S.bg8.planeta, R));
def("bg8.movimiento", (R, S) => B.mixed(S.bg8.movimiento, R));
def("bg8.capa", (R, S) => B.mixed(S.bg8.capa, R));
def("bg8.mineral", (R, S) => B.mixed(S.bg8.mineral, R));
def("bg8.roca", (R, S) => B.mixed(S.bg8.roca, R));
def("bg8.uso", (R, S) => B.mixed(S.bg8.uso, R));
def("bg8.contaminante", (R, S) => B.mixed(S.bg8.contaminante, R));
def("bg8.clima", (R, S) => B.mixed(S.bg8.clima, R));
def("bg8.ciclo", (R, S) => B.mixed(S.bg8.ciclo, R));
def("bg8.agente", (R, S) => B.mixed(S.bg8.agente, R));
def("bg8.suelo", (R, S) => B.mixed(S.bg8.suelo, R));
def("bg8.trofico", (R, S) => B.mixed(S.bg8.trofico, R));
def("bg8.ciclomateria", (R, S) => B.mixed(S.bg8.ciclomateria, R));
def("bg8.bioma", (R, S) => B.mixed(S.bg8.bioma, R));
def("bg8.impacto", (R, S) => B.mixed(S.bg8.impacto, R));
def("bg8.residuo", (R, S) => B.mixed(S.bg8.residuo, R));
def("bg8.salud", (R, S) => B.mixed(S.bg8.salud, R));

def("bg8.luz", (R, S, H) => {
  const T = S.bg8;
  if (R.r() < 0.3) {
    const n = R.pick([4, 8, 25, 100, 640]);
    return { q: T.luz_q2(n), kind: "int", ans: n, sol: T.luz_s2(H.n(n)) };
  }
  const [name, d] = R.pick(T.luz_obj), t = Math.round(d / 300000 * 10) / 10;
  return { q: T.luz_q(name, H.n(d)), kind: "num", ans: t, tol: Math.max(0.1, t * 0.02), sol: T.luz_s(H.n(d), H.dec(t)) };
});
def("bg8.mohs", (R, S) => {
  const T = S.bg8;
  let a, b;
  do { [a, b] = [R.pick(T.mohs_min), R.pick(T.mohs_min)]; } while (a[0] === b[0]);
  const correct = a[1] > b[1] ? 0 : a[1] < b[1] ? 1 : 2;
  return { q: T.mohs_q(a[0], String(a[1]).replace(".", ","), b[0], String(b[1]).replace(".", ",")), kind: "choice",
           opts: T.mohs_ops(a[0], b[0]), correct, shuffle: false, sol: T.mohs_s };
});
def("bg8.atmosfera", (R, S, H) => {
  const T = S.bg8;
  if (R.r() < 0.6) return B.mixed(T.atmosfera, R);
  const t = R.int(15, 30), h = R.pick([1000, 2000, 3000, 4000]), r = Math.round((t - h / 1000 * 6.5) * 10) / 10;
  return { q: T.at_q(t, H.n(h)), kind: "num", ans: r, tol: 0.1, sol: T.at_s(t, h, H.dec(r)) };
});
def("bg8.agua", (R, S, H) => {
  const T = S.bg8;
  if (R.r() < 0.5) return B.mixed(T.agua, R);
  const L = R.pick([100, 200, 1000, 40, 1000000]), r = L * 0.025;
  return { q: T.agua_q(H.n(L)), kind: "num", ans: r, tol: r * 0.01, sol: T.agua_s(H.n(L), H.dec(r)) };
});
def("bg8.consumo", (R, S, H) => {
  const T = S.bg8;
  if (R.r() < 0.5) {
    const l = R.pick([10, 20, 30, 40]), d = R.pick([7, 30, 365]), r = l * d;
    return { q: T.cons_q(l, d), kind: "int", ans: r, sol: T.cons_s(l, d, H.n(r)) };
  }
  const n = R.int(2, 5), m = R.pick([5, 8, 10]), l = R.pick([8, 10, 12]), r = n * m * l;
  return { q: T.cons_q2(n, m, l), kind: "int", ans: r, sol: T.cons_s2(n, m, l, H.n(r)) };
});
def("bg8.energia", (R, S, H) => {
  const T = S.bg8, e = R.pick([10000, 50000, 100000, 200000, 1000000]), n = R.int(2, 4), r = e / 10 ** (n - 1);
  return { q: T.en_q(H.n(e), n), kind: "num", ans: r, tol: r * 0.01, sol: T.en_s(H.n(e), n, H.n(r)) };
});
})();
