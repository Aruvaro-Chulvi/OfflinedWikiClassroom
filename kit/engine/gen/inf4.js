/* WikiAula — Informática, Grado 4: E/P/S, binario, sistema operativo, condicionales, variables, datos y hoja de cálculo.
   Textos y bancos en i18n/<lang>/inf4.js (S.inf4). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("inf4.eps", (R, S) => B.mixed(S.inf4.eps, R));
def("inf4.so", (R, S) => B.mixed(S.inf4.so, R));
def("inf4.anim", (R, S) => B.mixed(S.inf4.anim, R));
def("inf4.juego", (R, S) => B.mixed(S.inf4.juego, R));
def("inf4.permiso", (R, S) => B.mixed(S.inf4.permiso, R));
def("inf4.autor", (R, S) => B.mixed(S.inf4.autor, R));

def("inf4.bin", (R, S) => {
  const T = S.inf4, n = R.int(1, 15), b = n.toString(2).padStart(4, "0");
  return { q: T.bi_q(b), kind: "int", ans: n, sol: T.bi_s(b, n) };
});
def("inf4.dec", (R, S) => {
  const T = S.inf4, n = R.int(1, 15), b = n.toString(2).padStart(4, "0");
  return { q: T.de_q(n), kind: "text", ans: [b, n.toString(2)], sol: T.de_s(n, b) };
});
def("inf4.bits", (R, S) => {
  const T = S.inf4, n = R.int(2, 12);
  if (R.int(0, 1)) return { q: T.bt_q1(n), kind: "int", ans: n * 8, sol: T.bt_s1(n) };
  return { q: T.bt_q2(n * 8), kind: "int", ans: n, sol: T.bt_s2(n) };
});
def("inf4.si", (R, S) => {
  const T = S.inf4, [v, yes, no] = R.pick(T.conds), lim = R.int(3, 10), op = R.pick([">", "<", "="]);
  const val = op === "=" ? (R.int(0, 1) ? lim : lim + R.int(1, 3)) : R.int(0, 15);
  const ok = op === ">" ? val > lim : op === "<" ? val < lim : val === lim;
  const c = choice(R, ok ? yes : no, [ok ? no : yes, T.nada]);
  return { q: T.si_q(v, op, lim, yes, no, val), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.si_s(val, op, lim, ok, ok ? yes : no) };
});
def("inf4.var", (R, S) => {
  const T = S.inf4, [name, a0] = R.pick(T.vars), start = a0 === null ? R.int(0, 5) : a0, n = R.int(2, 4);
  const steps = []; for (let i = 0; i < n; i++) steps.push(R.pick([1, 2, 5, 10, -1, -2]));
  let v = start; steps.forEach(s => { v += s; });
  if (v < 0) { steps.push(-v + 1); v = 1; }
  return { q: T.va_q(name, start, steps), kind: "int", ans: v, sol: T.va_s(start, steps, v) };
});
def("inf4.cuenta", (R, S) => {
  const T = S.inf4, set = R.pick(T.sets), n = R.int(7, 12), data = []; for (let i = 0; i < n; i++) data.push(R.pick(set));
  const x = R.pick(set), k = data.filter(d => d === x).length;
  return { q: T.cu_q(data, x), kind: "int", ans: k, sol: T.cu_s(x, k) };
});
def("inf4.grafico", (R, S) => {
  const T = S.inf4, [cats, unit] = R.pick(T.graf), vals = cats.map(() => R.int(2, 15)), i = R.int(0, cats.length - 1);
  let j = R.int(0, cats.length - 1); if (j === i) j = (i + 1) % cats.length;
  const k = R.int(0, 2), data = cats.map((c, n) => `${c} ${vals[n]}`).join(", ");
  if (k === 0) return { q: T.gr_q1(data, unit, cats[i], cats[j]), kind: "int", ans: Math.abs(vals[i] - vals[j]), sol: T.gr_s1(vals[i], vals[j]) };
  if (k === 1) { const t = vals.reduce((a, b) => a + b, 0); return { q: T.gr_q2(data, unit), kind: "int", ans: t, sol: T.gr_s2(vals, t) }; }
  const mx = Math.max(...vals), m = cats[vals.indexOf(mx)], c = choice(R, m, cats.filter(x => x !== m).slice(0, 3));
  return { q: T.gr_q3(data, unit), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.gr_s3(m, mx) };
});
def("inf4.celda", (R, S) => {
  const T = S.inf4, k = R.int(0, 2);
  if (k === 0) { const a = R.int(2, 20), b = R.int(2, 20); return { q: T.ce_q1(a, b), kind: "int", ans: a + b, sol: T.ce_s1(a, b) }; }
  if (k === 1) { const xs = [R.int(1, 9), R.int(1, 9), R.int(1, 9), R.int(1, 9)], t = xs.reduce((a, b) => a + b, 0); return { q: T.ce_q2(xs), kind: "int", ans: t, sol: T.ce_s2(xs, t) }; }
  const col = R.pick(["A", "B", "C", "D", "E"]), row = R.int(1, 9), c = choice(R, col + row, [row + col, R.pick(["A", "B", "C", "D", "E"].filter(x => x !== col)) + row, col + (row + 1)]);
  return { q: T.ce_q3(col, row), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ce_s3(col, row) };
});
})();
