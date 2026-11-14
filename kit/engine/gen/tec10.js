/* WikiAula — Tecnología, Grado 10: instalaciones, electrónica, control, neumática e hidráulica (cálculos y bancos).
   Textos y bancos en i18n/<lang>/tec10.js (S.tec10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("tec10.elec", (R, S) => B.mixed(S.tec10.elec, R));
def("tec10.agua", (R, S) => B.mixed(S.tec10.agua, R));
def("tec10.clima", (R, S) => B.mixed(S.tec10.clima, R));
def("tec10.domo", (R, S) => B.mixed(S.tec10.domo, R));
def("tec10.anal", (R, S) => B.mixed(S.tec10.anal, R));
def("tec10.lazo", (R, S) => B.mixed(S.tec10.lazo, R));
def("tec10.robot", (R, S) => B.mixed(S.tec10.robot, R));
def("tec10.prog", (R, S) => B.mixed(S.tec10.prog, R));
def("tec10.neu", (R, S) => B.mixed(S.tec10.neu, R));
def("tec10.hid", (R, S) => B.mixed(S.tec10.hid, R));
def("tec10.hist", (R, S) => B.mixed(S.tec10.hist, R));
def("tec10.fut", (R, S) => B.mixed(S.tec10.fut, R));

def("tec10.potcont", (R, S, H) => {
  const T = S.tec10, pool = R.shuffle(T.aparatos.slice()).slice(0, R.int(3, 5));
  const t = +pool.reduce((a, [, p]) => a + p, 0).toFixed(2);
  return { q: T.pc_q(pool.map(([n, p]) => `${n} (${H.n(p)} kW)`).join(", ")), kind: "num", ans: t, tol: 0.01,
           sol: T.pc_s(pool.map(([, p]) => H.n(p)).join(" + "), H.n(t)) };
});
def("tec10.consumo", (R, S, H) => {
  const T = S.tec10, l = R.pick([10, 12, 15, 20, 25, 30]), d = R.pick([7, 30, 365]), t = l * d;
  return { q: T.cs_q(l, d), kind: "int", ans: t, sol: T.cs_s(l, d, H.n(t)) };
});
def("tec10.cop", (R, S, H) => {
  const T = S.tec10, cop = R.pick([2.5, 3, 3.5, 4, 4.5]), e = R.int(2, 12);
  if (R.int(0, 1)) { const c = +(cop * e).toFixed(2); return { q: T.cop_q1(H.n(cop), e), kind: "num", ans: c, tol: 0.01, sol: T.cop_s1(H.n(cop), e, H.n(c)) }; }
  const c = cop * e;
  return { q: T.cop_q2(H.n(cop), H.n(c)), kind: "num", ans: e, tol: 0.01, sol: T.cop_s2(H.n(c), H.n(cop), e) };
});
def("tec10.rc", (R, S, H) => {
  const T = S.tec10, r = R.pick([10, 22, 47, 100, 220]), c = R.pick([100, 220, 470, 1000]);
  const tau = +(r * 1000 * c / 1e6).toFixed(3);
  if (R.int(0, 1)) return { q: T.rc_q1(r, c), kind: "num", ans: tau, tol: 0.01, sol: T.rc_s1(r, c, H.n(tau)) };
  const t5 = +(5 * tau).toFixed(3);
  return { q: T.rc_q2(r, c), kind: "num", ans: t5, tol: 0.05, sol: T.rc_s2(H.n(tau), H.n(t5)) };
});
def("tec10.bool", (R, S) => {
  const T = S.tec10, a = R.int(0, 1), b = R.int(0, 1), c = R.int(0, 1);
  const ex = R.pick(T.expr), v = ex[1](a, b, c);
  return { q: T.bo_q(ex[0], a, b, c), kind: "int", ans: v, sol: T.bo_s(ex[0], a, b, c, v) };
});
def("tec10.hex", (R, S) => {
  const T = S.tec10, n = R.int(17, 255), h = n.toString(16).toUpperCase();
  return { q: T.hx_q(h), kind: "int", ans: n, sol: T.hx_s(h, n) };
});
def("tec10.ultra", (R, S, H) => {
  const T = S.tec10, ms = R.pick([1, 1.5, 2, 2.5, 3, 4, 5, 6]), d = +(343 * ms / 1000 / 2 * 100).toFixed(1);
  return { q: T.ul_q(H.n(ms)), kind: "num", ans: d, tol: 0.6, sol: T.ul_s(H.n(ms), H.n(d)) };
});
def("tec10.fuerza", (R, S, H) => {
  const T = S.tec10, p = R.pick([4, 5, 6, 8]), r = R.pick([1, 1.5, 2, 2.5, 3]);
  const sArea = Math.PI * Math.pow(r / 100, 2), f = Math.round(p * 1e5 * sArea);
  return { q: T.fu_q(p, H.n(r)), kind: "num", ans: f, tol: Math.max(2, f * 0.01), sol: T.fu_s(H.n(r), p, H.n(+sArea.toFixed(6)), f) };
});
def("tec10.pascal", (R, S, H) => {
  const T = S.tec10, s1 = R.pick([2, 4, 5, 10]), k = R.pick([5, 10, 20, 25, 50]), s2 = s1 * k, f1 = R.pick([20, 40, 50, 100, 150, 200]);
  if (R.int(0, 1)) return { q: T.pa_q1(s1, s2, f1), kind: "int", ans: f1 * k, sol: T.pa_s1(f1, s2, s1, H.n(f1 * k)) };
  const f2 = f1 * k;
  return { q: T.pa_q2(s1, s2, H.n(f2)), kind: "int", ans: f1, sol: T.pa_s2(H.n(f2), s1, s2, f1) };
});
})();
