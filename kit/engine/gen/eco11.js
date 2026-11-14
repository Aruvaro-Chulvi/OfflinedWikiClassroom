/* WikiAula — Economía, Grado 11: micro y macro, costes, oferta y demanda, elasticidad, mercados, PIB, IPC, dinero, política fiscal,
   comercio internacional, tipos de cambio y desarrollo. Textos y bancos en i18n/<lang>/eco11.js (S.eco11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("eco11.positiva", (R, S) => B.mixed(S.eco11.positiva, R));
def("eco11.micro", (R, S) => B.mixed(S.eco11.micro, R));
def("eco11.sistema", (R, S) => B.mixed(S.eco11.sistema, R));
def("eco11.desplaza", (R, S) => B.mixed(S.eco11.desplaza, R));
def("eco11.mercado", (R, S) => B.mixed(S.eco11.mercado, R));
def("eco11.fallo", (R, S) => B.mixed(S.eco11.fallo, R));
def("eco11.paro", (R, S) => B.mixed(S.eco11.paro, R));
def("eco11.monetaria", (R, S) => B.mixed(S.eco11.monetaria, R));
def("eco11.fiscal", (R, S) => B.mixed(S.eco11.fiscal, R));
def("eco11.balanza", (R, S) => B.mixed(S.eco11.balanza, R));
def("eco11.integracion", (R, S) => B.mixed(S.eco11.integracion, R));
def("eco11.desarrollo", (R, S) => B.mixed(S.eco11.desarrollo, R));

def("eco11.productividad", (R, S) => {
  const T = S.eco11, L = R.int(2, 12), p = R.pick([20, 25, 40, 50, 80, 100, 120]);
  return { q: T.pr_q(L, L * p), kind: "int", ans: p, sol: T.pr_s(L, L * p, p) };
});
def("eco11.costes", (R, S, H) => {
  const T = S.eco11, cf = R.pick([100, 200, 300]), steps = [0, 10, 20, 30], ct = [cf]; let c = cf;
  for (let i = 1; i < 4; i++) { c += 10 * R.pick([4, 5, 6, 7, 8]); ct.push(c); }
  const k = R.int(0, 2);
  if (k === 0) { const i = R.int(1, 3); return { q: T.co_q1(steps, ct, steps[i]), kind: "num", ans: +(ct[i] / steps[i]).toFixed(2), tol: 0.01, ansHtml: WA.MATH.eur(ct[i] / steps[i], H) + " €", sol: T.co_s1(ct[i], steps[i]) }; }
  if (k === 1) { const i = R.int(1, 3); return { q: T.co_q2(steps, ct, steps[i - 1], steps[i]), kind: "num", ans: (ct[i] - ct[i - 1]) / 10, tol: 0.01, sol: T.co_s2(ct[i - 1], ct[i]) }; }
  const i = R.int(1, 3); return { q: T.co_q3(steps, ct, steps[i]), kind: "int", ans: ct[i] - cf, sol: T.co_s3(ct[i], cf) };
});
def("eco11.equilibrio", (R, S) => {
  const T = S.eco11, b = R.int(1, 4), d = R.int(1, 4), P = R.int(5, 30), c = R.int(0, 30), Q = c + d * P, a = Q + b * P;
  if (R.int(0, 1)) return { q: T.eq_q1(a, b, c, d), kind: "int", ans: P, sol: T.eq_s1(a, b, c, d, P) };
  return { q: T.eq_q2(a, b, c, d), kind: "int", ans: Q, sol: T.eq_s2(a, b, c, d, P, Q) };
});
def("eco11.elasticidad", (R, S) => {
  const T = S.eco11, dp = R.pick([5, 10, 20, 25, 50]), e = R.pick([0.2, 0.4, 0.5, 1.5, 2, 2.5, 3]), dq = +(dp * e).toFixed(1);
  if (R.int(0, 1)) return { q: T.el_q1(dp, dq), kind: "num", ans: e, tol: 0.01, sol: T.el_s1(dp, dq, e) };
  return { q: T.el_q2(dp, dq), kind: "choice", opts: [T.elastica, T.inelastica], correct: e > 1 ? 0 : 1, shuffle: false, sol: T.el_s2(e) };
});
def("eco11.pib", (R, S) => {
  const T = S.eco11, C = R.int(40, 70) * 10, I = R.int(10, 30) * 10, G = R.int(15, 30) * 10, X = R.int(10, 40) * 10, M = R.int(10, 40) * 10;
  return { q: T.pi_q(C, I, G, X, M), kind: "int", ans: C + I + G + X - M, sol: T.pi_s(C, I, G, X, M) };
});
def("eco11.real", (R, S) => {
  const T = S.eco11, y0 = R.pick([800, 1000, 1200, 1500, 2000]), g = R.pick([-2, 1, 1.5, 2, 2.5, 3, 4]), y1 = +(y0 * (1 + g / 100)).toFixed(1);
  return { q: T.re_q(y0, y1), kind: "num", ans: g, tol: 0.05, sol: T.re_s(y0, y1, g) };
});
def("eco11.ipc", (R, S) => {
  const T = S.eco11, i0 = R.pick([100, 105, 110, 120, 125, 200]), pi = R.pick([1, 2, 3, 4, 5, 8, 10, -1]), i1 = +(i0 * (1 + pi / 100)).toFixed(2);
  return { q: T.ip_q(i0, i1), kind: "num", ans: pi, tol: 0.05, sol: T.ip_s(i0, i1, pi) };
});
def("eco11.multiplicador", (R, S) => {
  const T = S.eco11, r = R.pick([2, 4, 5, 10, 20, 25]), D = R.pick([100, 500, 1000, 2000]);
  if (R.int(0, 1)) return { q: T.mu_q1(r), kind: "int", ans: 100 / r, sol: T.mu_s1(r) };
  return { q: T.mu_q2(r, D), kind: "int", ans: D * 100 / r, sol: T.mu_s2(r, D) };
});
def("eco11.deuda", (R, S) => {
  const T = S.eco11, pib = R.pick([800, 1000, 1200, 1400, 1500, 2000]), pct = R.pick([3, 5, 40, 60, 80, 100, 110]), v = pib * pct / 100;
  const k = R.int(0, 1);
  return { q: k ? T.de_q1(v, pib) : T.de_q2(v, pib), kind: "int", ans: pct, sol: T.de_s(v, pib, pct) };
});
def("eco11.ventaja", (R, S) => {
  const T = S.eco11, [g1, g2] = R.pick(T.bienes), a1 = R.int(2, 8), a2 = R.int(1, 6), b1 = R.int(1, 6), b2 = R.int(1, 6);
  if (a1 / a2 === b1 / b2) return { q: T.ve_q("A", 4, 2, 1, 1, "vino", "tela", "B"), kind: "choice", opts: ["vino", "tela"], correct: 1, shuffle: false, sol: T.ve_s("B", "tela") };
  const who = R.pick(["A", "B"]), adv = who === "A" ? (a1 / a2 > b1 / b2 ? g1 : g2) : (b1 / b2 > a1 / a2 ? g1 : g2);
  return { q: T.ve_q(who, a1, a2, b1, b2, g1, g2), kind: "choice", opts: [g1, g2], correct: adv === g1 ? 0 : 1, shuffle: false, sol: T.ve_s(who, adv) };
});
def("eco11.cambio", (R, S, H) => {
  const T = S.eco11, rate = R.pick([1.05, 1.1, 1.2, 1.25, 0.85, 0.9]), k = R.int(0, 1);
  if (k === 0) { const e = R.pick([100, 200, 400, 500, 1000]); return { q: T.ca_q1(rate, e), kind: "num", ans: +(e * rate).toFixed(2), tol: 0.01, sol: T.ca_s1(e, rate) }; }
  const d = R.pick([105, 210, 250, 500, 840, 1000]), e = +(d / rate).toFixed(2);
  return { q: T.ca_q2(rate, d), kind: "num", ans: e, tol: 0.01, ansHtml: WA.MATH.eur(e, H) + " €", sol: T.ca_s2(d, rate, e) };
});
})();
