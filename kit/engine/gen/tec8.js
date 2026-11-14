/* WikiAula — Tecnología, Grado 8: mecanismos, circuitos, potencia, rendimiento, programación (cálculos y bancos).
   Textos y bancos en i18n/<lang>/tec8.js (S.tec8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("tec8.genero", (R, S) => B.mixed(S.tec8.genero, R));
def("tec8.transf", (R, S) => B.mixed(S.tec8.transf, R));
def("tec8.sp", (R, S) => B.mixed(S.tec8.sp, R));
def("tec8.comp", (R, S) => B.mixed(S.tec8.comp, R));
def("tec8.forma", (R, S) => B.mixed(S.tec8.forma, R));
def("tec8.central", (R, S) => B.mixed(S.tec8.central, R));
def("tec8.sost", (R, S) => B.mixed(S.tec8.sost, R));
def("tec8.prog", (R, S) => B.mixed(S.tec8.prog, R));
def("tec8.sensor", (R, S) => B.mixed(S.tec8.sensor, R));
def("tec8.robot", (R, S) => B.mixed(S.tec8.robot, R));
def("tec8.d3", (R, S) => B.mixed(S.tec8.d3, R));
def("tec8.ciclo", (R, S) => B.mixed(S.tec8.ciclo, R));

def("tec8.palanca", (R, S, H) => {
  const T = S.tec8, Rr = R.int(2, 12) * 100, bR = R.pick([0.2, 0.25, 0.4, 0.5]), k = R.pick([2, 3, 4, 5]), bF = +(bR * k).toFixed(2), F = Rr / k;
  return { q: T.pa_q(Rr, H.n(bR), H.n(bF)), kind: "num", ans: F, tol: 0.01, sol: T.pa_s(Rr, H.n(bR), H.n(bF), H.n(F)) };
});
def("tec8.transm", (R, S) => {
  const T = S.tec8, gear = R.int(0, 1) === 1, z1 = R.pick([10, 12, 15, 20, 24, 30, 40]), k = R.pick([2, 3, 4]), red = R.int(0, 1) === 1;
  const z2 = red ? z1 * k : z1 / k, n1 = R.pick([60, 90, 120, 150, 300, 600]);
  if (!Number.isInteger(z2)) { const z2b = z1 * k; return { q: T.tr_q(gear, n1, z1, z2b), kind: "num", ans: n1 * z1 / z2b, tol: 0.01, sol: T.tr_s(gear, n1, z1, z2b) }; }
  return { q: T.tr_q(gear, n1, z1, z2), kind: "num", ans: n1 * z1 / z2, tol: 0.01, sol: T.tr_s(gear, n1, z1, z2) };
});
def("tec8.serie", (R, S) => {
  const T = S.tec8, n = R.int(2, 4), rs = []; for (let i = 0; i < n; i++) rs.push(R.pick([5, 10, 15, 20, 30, 47, 50, 100]));
  const t = rs.reduce((a, b) => a + b, 0);
  return { q: T.se_q(rs), kind: "int", ans: t, sol: T.se_s(rs, t) };
});
def("tec8.paralelo", (R, S) => {
  const T = S.tec8, r = R.pick([10, 12, 20, 30, 40, 60, 100]), n = R.pick([2, 3, 4]), ok = r % n === 0 ? n : 2;
  return { q: T.pr_q(r, ok), kind: "num", ans: r / ok, tol: 0.01, sol: T.pr_s(r, ok) };
});
def("tec8.led", (R, S, H) => {
  const T = S.tec8, V = R.pick([5, 6, 9, 12]), vl = R.pick([2, 3]), i = R.pick([0.01, 0.02]), r = (V - vl) / i;
  return { q: T.le_q(V, vl, H.n(i)), kind: "num", ans: r, tol: 0.5, sol: T.le_s(V, vl, H.n(i), H.n(r)) };
});
def("tec8.pot", (R, S, H) => {
  const T = S.tec8, V = R.pick([12, 230]), I = R.pick([0.5, 1, 2, 4, 5, 8, 10]), P = V * I;
  return { q: T.po_q(V, H.n(I)), kind: "num", ans: P, tol: 0.01, sol: T.po_s(V, H.n(I), H.n(P)) };
});
def("tec8.coste", (R, S, H) => {
  const T = S.tec8, P = R.pick([0.5, 1, 1.5, 2, 2.5]), h = R.pick([1, 2, 3, 4, 5]), pr = R.pick([0.1, 0.15, 0.2, 0.25]), e = P * h, c = +(e * pr).toFixed(3);
  return { q: T.co_q(H.n(P), h, H.n(pr)), kind: "num", ans: c, tol: 0.01, sol: T.co_s(H.n(P), h, H.n(e), H.n(pr), H.n(c)) };
});
def("tec8.rend", (R, S) => {
  const T = S.tec8, e = R.pick([100, 200, 400, 500, 800, 1000]), pc = R.pick([10, 20, 25, 40, 50, 60, 75, 80, 90]), u = e * pc / 100;
  return { q: T.re_q(e, u), kind: "int", ans: pc, sol: T.re_s(u, e, pc) };
});
def("tec8.traza", (R, S) => {
  const T = S.tec8, x0 = R.int(0, 10), a = R.int(2, 6), n = R.int(2, 6);
  return { q: T.tz_q(x0, a, n), kind: "int", ans: x0 + a * n, sol: T.tz_s(x0, a, n) };
});
def("tec8.capas", (R, S, H) => {
  const T = S.tec8, c = R.pick([0.1, 0.2, 0.25, 0.3]), n = R.int(10, 80), h = +(n * c).toFixed(2);
  return { q: T.ca_q(H.n(h), H.n(c)), kind: "int", ans: n, sol: T.ca_s(H.n(h), H.n(c), n) };
});
})();
