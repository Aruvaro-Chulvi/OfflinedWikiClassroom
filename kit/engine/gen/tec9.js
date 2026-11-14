/* WikiAula — Tecnología, Grado 9: electrónica, binario, lógica, Python, redes (cálculos y bancos).
   Textos y bancos en i18n/<lang>/tec9.js (S.tec9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("tec9.dt", (R, S) => B.mixed(S.tec9.dt, R));
def("tec9.doc", (R, S) => B.mixed(S.tec9.doc, R));
def("tec9.placa", (R, S) => B.mixed(S.tec9.placa, R));
def("tec9.algo", (R, S) => B.mixed(S.tec9.algo, R));
def("tec9.py", (R, S) => B.mixed(S.tec9.py, R));
def("tec9.web", (R, S) => B.mixed(S.tec9.web, R));
def("tec9.com", (R, S) => B.mixed(S.tec9.com, R));
def("tec9.red", (R, S) => B.mixed(S.tec9.red, R));
def("tec9.ciber", (R, S) => B.mixed(S.tec9.ciber, R));
def("tec9.sost", (R, S) => B.mixed(S.tec9.sost, R));
def("tec9.ia", (R, S) => B.mixed(S.tec9.ia, R));

def("tec9.gantt", (R, S) => {
  const T = S.tec9, n = R.int(3, 5), d = []; for (let i = 0; i < n; i++) d.push(R.int(1, 6));
  return { q: T.ga_q(d), kind: "int", ans: d.reduce((a, b) => a + b, 0), sol: T.ga_s(d) };
});
def("tec9.esc", (R, S, H) => {
  const T = S.tec9, items = [["tablas", R.int(1, 4), R.pick([2.5, 3, 3.5])], ["motor", 1, R.pick([3, 4, 5])], ["pila", R.int(1, 2), R.pick([1.5, 2, 2.2])], ["tornillería", 1, R.pick([1, 1.3, 2])]];
  const t = +items.reduce((a, [, q, p]) => a + q * p, 0).toFixed(2);
  return { q: T.pr_q(items.map(([n, q, p]) => `${q} ${n} a ${H.n(p)} €`).join(", ")), kind: "num", ans: t, tol: 0.01, sol: T.pr_s(H.n(t)) };
});
def("tec9.colores", (R, S, H) => {
  const T = S.tec9, a = R.int(1, 9), b = R.int(0, 9), m = R.int(0, 4), v = (a * 10 + b) * Math.pow(10, m);
  return { q: T.co_q(T.cols[a], T.cols[b], T.cols[m]), kind: "int", ans: v, sol: T.co_s(a, b, m, H.n(v)) };
});
def("tec9.divisor", (R, S, H) => {
  const T = S.tec9, V = R.pick([5, 6, 9, 12]), r1 = R.pick([1, 2, 3, 4, 5]), r2 = R.pick([1, 2, 3, 5, 6]), vs = +(V * r2 / (r1 + r2)).toFixed(2);
  return { q: T.dv_q(V, r1, r2), kind: "num", ans: vs, tol: 0.01, sol: T.dv_s(V, r1, r2, H.n(vs)) };
});
def("tec9.bin", (R, S) => {
  const T = S.tec9, n = R.int(5, 63), b = n.toString(2);
  return { q: T.bi_q(b), kind: "int", ans: n, sol: T.bi_s(b, n) };
});
def("tec9.dec", (R, S) => {
  const T = S.tec9, n = R.int(3, 31), b = n.toString(2);
  return { q: T.de_q(n), kind: "int", ans: parseInt(b, 10), sol: T.de_s(n, b) };
});
def("tec9.puerta", (R, S) => {
  const T = S.tec9, g = R.pick(["AND", "OR", "XOR", "NAND", "NOR"]), a = R.int(0, 1), b = R.int(0, 1);
  const out = { AND: a & b, OR: a | b, XOR: a ^ b, NAND: 1 - (a & b), NOR: 1 - (a | b) }[g];
  return { q: T.pu_q(g, a, b), kind: "int", ans: out, sol: T.pu_s(g, a, b, out) };
});
def("tec9.adc", (R, S, H) => {
  const T = S.tec9, v = R.pick([0.5, 1, 1.25, 2, 2.5, 3, 3.75, 4, 5]), val = Math.round(v / 5 * 1023);
  return { q: T.ad_q(H.n(v)), kind: "num", ans: val, tol: 2, sol: T.ad_s(H.n(v), val) };
});
def("tec9.traza", (R, S) => {
  const T = S.tec9, n = R.int(3, 8);
  return { q: T.tr_q(n), kind: "int", ans: n * (n + 1) / 2, sol: T.tr_s(n) };
});
def("tec9.salida", (R, S) => {
  const T = S.tec9, k = R.int(0, 2), a = R.int(7, 40), b = R.int(2, 6);
  if (k === 0) return { q: T.sa_q(`${a} // ${b}`), kind: "int", ans: Math.floor(a / b), sol: T.sa_s(`${a} // ${b}`, Math.floor(a / b)) };
  if (k === 1) return { q: T.sa_q(`${a} % ${b}`), kind: "int", ans: a % b, sol: T.sa_s(`${a} % ${b}`, a % b) };
  const e = R.int(2, 5), bb = R.int(2, 3);
  return { q: T.sa_q(`${bb} ** ${e}`), kind: "int", ans: Math.pow(bb, e), sol: T.sa_s(`${bb} ** ${e}`, Math.pow(bb, e)) };
});
def("tec9.desc", (R, S) => {
  const T = S.tec9, mb = R.pick([100, 125, 250, 500, 750, 1000]), sp = R.pick([10, 20, 50, 100, 200]), t = mb * 8 / sp;
  return { q: T.ds_q(mb, sp), kind: "num", ans: t, tol: 0.01, sol: T.ds_s(mb, sp, t) };
});
def("tec9.pass", (R, S, H) => {
  const T = S.tec9, n = R.int(3, 8), base = R.pick([10, 26]), c = Math.pow(base, n);
  return { q: T.pa_q(n, base), kind: "int", ans: c, sol: T.pa_s(base, n, H.n(c)) };
});
})();
