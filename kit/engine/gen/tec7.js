/* WikiAula — Tecnología, Grado 7: bancos y cálculos (escalas, ley de Ohm, kWh, bytes, ángulos).
   Textos y bancos en i18n/<lang>/tec7.js (S.tec7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("tec7.necesidad", (R, S) => B.mixed(S.tec7.necesidad, R));
def("tec7.cienciatec", (R, S) => B.mixed(S.tec7.cienciatec, R));
def("tec7.fase", (R, S) => B.mixed(S.tec7.fase, R));
def("tec7.vista", (R, S) => B.mixed(S.tec7.vista, R));
def("tec7.prop", (R, S) => B.mixed(S.tec7.prop, R));
def("tec7.madera", (R, S) => B.mixed(S.tec7.madera, R));
def("tec7.metal", (R, S) => B.mixed(S.tec7.metal, R));
def("tec7.otros", (R, S) => B.mixed(S.tec7.otros, R));
def("tec7.herr", (R, S) => B.mixed(S.tec7.herr, R));
def("tec7.esfuerzo", (R, S) => B.mixed(S.tec7.esfuerzo, R));
def("tec7.estab", (R, S) => B.mixed(S.tec7.estab, R));
def("tec7.elemento", (R, S) => B.mixed(S.tec7.elemento, R));
def("tec7.ahorro", (R, S) => B.mixed(S.tec7.ahorro, R));
def("tec7.hard", (R, S) => B.mixed(S.tec7.hard, R));
def("tec7.seguro", (R, S) => B.mixed(S.tec7.seguro, R));
def("tec7.algo", (R, S) => B.mixed(S.tec7.algo, R));

def("tec7.dibujo", (R, S) => {
  const T = S.tec7, d = R.int(2, 30) * 2;
  return { q: T.di_q(d), kind: "int", ans: d / 2, sol: T.di_s(d) };
});
def("tec7.escala", (R, S, H) => {
  const T = S.tec7, red = R.int(0, 2) > 0;
  if (red) {
    const k = R.pick([2, 5, 10, 20, 50, 100]), real = R.int(2, 40) * k * 10;
    return { q: T.es_q1(H.n(real), k), kind: "num", ans: real / k, tol: 0.01, sol: T.es_s1(H.n(real), k, H.n(real / k)) };
  }
  const k = R.pick([2, 5, 10]), real = R.int(2, 20);
  return { q: T.es_q2(real, k), kind: "int", ans: real * k, sol: T.es_s2(real, k) };
});
def("tec7.ohm", (R, S, H) => {
  const T = S.tec7, mode = R.int(0, 2), I = R.pick([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2, 3]), Rr = R.pick([2, 3, 4, 5, 6, 8, 10, 12, 20, 30, 50, 100]), V = +(I * Rr).toFixed(3);
  if (mode === 0) return { q: T.oh_qI(H.n(V), Rr), kind: "num", ans: I, tol: 0.001, sol: T.oh_sI(H.n(V), Rr, H.n(I)) };
  if (mode === 1) return { q: T.oh_qV(H.n(I), Rr), kind: "num", ans: V, tol: 0.001, sol: T.oh_sV(H.n(I), Rr, H.n(V)) };
  return { q: T.oh_qR(H.n(V), H.n(I)), kind: "num", ans: Rr, tol: 0.001, sol: T.oh_sR(H.n(V), H.n(I), Rr) };
});
def("tec7.kwh", (R, S, H) => {
  const T = S.tec7, P = R.pick([10, 20, 60, 100, 500, 1000, 2000]), h = R.pick([1, 2, 3, 4, 5, 8]), d = R.pick([1, 10, 30]), e = P / 1000 * h * d;
  return { q: T.kw_q(P, h, d), kind: "num", ans: +e.toFixed(3), tol: 0.001, sol: T.kw_s(H.n(P / 1000), h, d, H.n(+e.toFixed(3))) };
});
def("tec7.bytes", (R, S, H) => {
  const T = S.tec7, f = R.pick([2, 4, 5, 8, 10]), gb = R.pick([1, 4, 8, 16, 32, 64]), n = gb * 1000 / f;
  return { q: T.by_q(f, gb), kind: "int", ans: n, sol: T.by_s(gb, f, H.n(n)) };
});
def("tec7.bucle", (R, S) => {
  const T = S.tec7, n = R.pick([3, 4, 5, 6, 8, 9, 10, 12]);
  return { q: T.bu_q(n), kind: "int", ans: 360 / n, sol: T.bu_s(n) };
});
})();
