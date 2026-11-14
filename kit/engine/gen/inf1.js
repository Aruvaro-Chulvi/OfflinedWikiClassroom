/* WikiAula — Informática, Grado 1: aparatos, secuencias, caminos con flechas, patrones y seguridad.
   Textos y bancos en i18n/<lang>/inf1.js (S.inf1). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("inf1.aparato", (R, S) => B.mixed(S.inf1.aparato, R));
def("inf1.parte", (R, S) => B.mixed(S.inf1.parte, R));
def("inf1.raton", (R, S) => B.mixed(S.inf1.raton, R));
def("inf1.cuidado", (R, S) => B.mixed(S.inf1.cuidado, R));
def("inf1.clasifica", (R, S) => B.mixed(S.inf1.clasifica, R));
def("inf1.seguro", (R, S) => B.mixed(S.inf1.seguro, R));
def("inf1.datos", (R, S) => B.mixed(S.inf1.datos, R));

def("inf1.secuencia", (R, S) => {
  const T = S.inf1, seq = R.pick(T.seqs), k = R.int(0, seq.length - 2);
  const right = seq[k + 1], wrong = seq.filter((x, i) => i !== k + 1 && i !== k).slice(0, 2);
  const c = choice(R, right, wrong);
  return { q: T.sq_q(seq[k]), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.sq_s(seq) };
});
def("inf1.camino", (R, S) => {
  const T = S.inf1, k = R.int(0, 2);
  if (k === 0) { const a = R.int(1, 4), n = R.int(1, 5); return { q: T.ca_q1(a, n), kind: "int", ans: a + n, sol: T.ca_s1(a, n, a + n) }; }
  if (k === 1) { const a = R.int(1, 3), b = a + R.int(2, 6); return { q: T.ca_q2(a, b), kind: "int", ans: b - a, sol: T.ca_s2(a, b, b - a) }; }
  const a = R.int(2, 4), n = R.int(2, 4), m = R.int(1, Math.min(n + a - 1, 3));
  return { q: T.ca_q3(a, n, m), kind: "int", ans: a + n - m, sol: T.ca_s3(a, n, m, a + n - m) };
});
def("inf1.patron", (R, S) => {
  const T = S.inf1, set = R.pick(T.sets), els = R.shuffle(set.slice()), form = R.pick(["AB", "AAB", "ABC", "ABB"]);
  const unit = [...form].map(ch => els[ch.charCodeAt(0) - 65]), len = unit.length * 2 + R.int(1, unit.length);
  const shown = []; for (let i = 0; i < len; i++) shown.push(unit[i % unit.length]);
  const right = unit[len % unit.length], wrong = set.filter(x => x !== right).slice(0, 2);
  const c = choice(R, right, wrong);
  return { q: T.pa_q(shown), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.pa_s(unit, right) };
});
def("inf1.tamano", (R, S) => {
  const T = S.inf1, xs = R.shuffle([R.int(1, 3), R.int(4, 6), R.int(7, 9)]), min = Math.min(...xs);
  return { q: T.ta_q(xs), kind: "int", ans: min, sol: T.ta_s([...xs].sort((a, b) => a - b)) };
});
})();
