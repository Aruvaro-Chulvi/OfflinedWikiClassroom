/* WikiAula — Economía, Grado 9: necesidades, escasez, sectores, mercado, dinero, presupuesto, interés, inflación, empleo, impuestos y desarrollo.
   Textos y bancos en i18n/<lang>/eco9.js (S.eco9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("eco9.bien", (R, S) => B.mixed(S.eco9.bien, R));
def("eco9.factor", (R, S) => B.mixed(S.eco9.factor, R));
def("eco9.sector", (R, S) => B.mixed(S.eco9.sector, R));
def("eco9.agente", (R, S) => B.mixed(S.eco9.agente, R));
def("eco9.mercado", (R, S) => B.mixed(S.eco9.mercado, R));
def("eco9.dinero", (R, S) => B.mixed(S.eco9.dinero, R));
def("eco9.consumo", (R, S) => B.mixed(S.eco9.consumo, R));
def("eco9.trabajo", (R, S) => B.mixed(S.eco9.trabajo, R));
def("eco9.impuesto", (R, S) => B.mixed(S.eco9.impuesto, R));
def("eco9.ods", (R, S) => B.mixed(S.eco9.ods, R));

def("eco9.coste", (R, S) => {
  const T = S.eco9, [ctx, opts] = R.pick(T.dilemas), i = R.int(0, 2), j = (i + 1 + R.int(0, 1)) % 3;
  const chosen = opts[i], best = opts[j], c = choice(R, best, opts.filter(o => o !== best && o !== chosen).concat([T.nada]));
  return { q: T.co_q(ctx, opts, chosen, best), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.co_s(best) };
});
def("eco9.fpp", (R, S) => {
  const T = S.eco9, a = R.pick([40, 60, 80, 100, 120]), b = R.pick([20, 40, 60, 80]), k = R.pick([2, 4]), x = a / k;
  return { q: T.fp_q(a, b, x), kind: "int", ans: b - b * x / a, sol: T.fp_s(a, b, x, b - b * x / a) };
});
def("eco9.equilibrio", (R, S) => {
  const T = S.eco9, pe = R.int(2, 5), rows = [1, 2, 3, 4, 5, 6].map(pr => [pr, 100 - 10 * pr, 10 * pr + 100 - 20 * pe]);
  return { q: T.eq_q(rows), kind: "int", ans: pe, sol: T.eq_s(pe, 100 - 10 * pe) };
});
def("eco9.cambio", (R, S) => {
  const T = S.eco9, [cur, rate] = R.pick(T.monedas), eur = R.pick([50, 100, 150, 200, 300, 500]);
  return { q: T.ca_q(eur, cur, rate), kind: "num", ans: +(eur * rate).toFixed(2), tol: 0.01, sol: T.ca_s(eur, rate, +(eur * rate).toFixed(2), cur) };
});
def("eco9.presupuesto", (R, S) => {
  const T = S.eco9, ing = R.pick([30, 40, 50, 60, 80]), g = [R.int(5, 12), R.int(5, 15), R.int(2, 8)], a = ing - g.reduce((x, y) => x + y, 0);
  return { q: T.pr_q(ing, g), kind: "int", ans: a, sol: T.pr_s(ing, g, a) };
});
def("eco9.regla", (R, S) => {
  const T = S.eco9, s = R.pick([1000, 1200, 1500, 1600, 1800, 2000, 2400]), [lab, pct] = R.pick([["necesidades", 50], ["deseos", 30], ["ahorro", 20]]);
  return { q: T.re_q(s, lab), kind: "int", ans: s * pct / 100, sol: T.re_s(s, pct, s * pct / 100) };
});
def("eco9.interes", (R, S) => {
  const T = S.eco9, C = R.pick([200, 500, 1000, 1500, 2000, 5000]), r = R.pick([1, 2, 3, 4, 5]), t = R.int(1, 5), I = C * r * t / 100;
  if (R.int(0, 1)) return { q: T.in_q1(C, r, t), kind: "num", ans: I, tol: 0.01, sol: T.in_s1(C, r, t, I) };
  return { q: T.in_q2(C, r, t), kind: "num", ans: C + I, tol: 0.01, sol: T.in_s2(C, I) };
});
def("eco9.inflacion", (R, S, H) => {
  const T = S.eco9, [obj, p] = R.pick(T.objetos), i = R.pick([2, 3, 4, 5, 10]), np = +(p * (1 + i / 100)).toFixed(2);
  return { q: T.if_q(obj, p, i), kind: "num", ans: np, tol: 0.01, ansHtml: WA.MATH.eur(np, H) + " €", sol: T.if_s(p, i, np) };
});
def("eco9.paro", (R, S) => {
  const T = S.eco9, act = R.pick([500, 800, 1000, 2000, 4000, 5000]), pct = R.pick([5, 8, 10, 12, 15, 20, 25]), par = act * pct / 100;
  return { q: T.pa_q(act, par), kind: "int", ans: pct, sol: T.pa_s(par, act, pct) };
});
def("eco9.iva", (R, S, H) => {
  const T = S.eco9, [obj, base, tipo] = R.pick(T.productos), pf = +(base * (1 + tipo / 100)).toFixed(2);
  return { q: T.iv_q(obj, base, tipo), kind: "num", ans: pf, tol: 0.01, ansHtml: WA.MATH.eur(pf, H) + " €", sol: T.iv_s(base, tipo, pf) };
});
def("eco9.desarrollo", (R, S) => {
  const T = S.eco9, hab = R.pick([2, 4, 5, 8, 10, 20, 40, 50]), pc = R.pick([1000, 2000, 5000, 12000, 20000, 30000, 45000]), pib = hab * pc;
  return { q: T.de_q(pib, hab), kind: "int", ans: pc, sol: T.de_s(pib, hab, pc) };
});
})();
