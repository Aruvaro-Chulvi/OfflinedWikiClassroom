/* WikiAula — Informática, Grado 2: entrada/salida, aplicaciones, algoritmos, robots, bucles y errores.
   Textos y bancos en i18n/<lang>/inf2.js (S.inf2). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const ARR = { R: "→", L: "←", U: "↑", D: "↓" };

def("inf2.es", (R, S) => B.mixed(S.inf2.es, R));
def("inf2.app", (R, S) => B.mixed(S.inf2.app, R));
def("inf2.archivo", (R, S) => B.mixed(S.inf2.archivo, R));
def("inf2.pintar", (R, S) => B.mixed(S.inf2.pintar, R));
def("inf2.texto", (R, S) => B.mixed(S.inf2.texto, R));
def("inf2.clave", (R, S) => B.mixed(S.inf2.clave, R));
def("inf2.amable", (R, S) => B.mixed(S.inf2.amable, R));

def("inf2.algoritmo", (R, S) => {
  const T = S.inf2, seq = R.pick(T.seqs), k = R.int(0, seq.length - 1), first = R.int(0, 1) === 0;
  if (first) {
    const right = seq[0], c = choice(R, right, R.shuffle(seq.slice(1)).slice(0, 2));
    return { q: T.al_q1(T.goal[T.seqs.indexOf(seq)]), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.al_s(seq) };
  }
  const right = seq[seq.length - 1], c = choice(R, right, R.shuffle(seq.slice(0, -1)).slice(0, 2));
  return { q: T.al_q2(T.goal[T.seqs.indexOf(seq)]), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.al_s(seq) };
});
def("inf2.robot", (R, S) => {
  const T = S.inf2, dx = R.int(1, 4), dy = R.int(1, 3);
  if (R.int(0, 1)) return { q: T.ro_q1(dx, dy), kind: "int", ans: dx + dy, sol: T.ro_s1(dx, dy) };
  const prog = R.shuffle([...Array(dx).fill("R"), ...Array(dy).fill("D")]).map(a => ARR[a]).join(" ");
  return { q: T.ro_q2(prog), kind: "int", ans: dx, sol: T.ro_s2(prog, dx) };
});
def("inf2.repetir", (R, S) => {
  const T = S.inf2, n = R.int(2, 5), k = R.int(1, 3), a = R.pick(["→", "↓", "↑", "←"]);
  if (R.int(0, 1)) return { q: T.re_q1(n, Array(k).fill(a).join(" ")), kind: "int", ans: n * k, sol: T.re_s1(n, k) };
  const m = R.int(3, 8);
  return { q: T.re_q2(Array(m).fill(a).join(" ")), kind: "int", ans: m, sol: T.re_s2(m, a) };
});
def("inf2.error", (R, S) => {
  const T = S.inf2, dx = R.int(1, 3), dy = R.int(1, 2);
  const prog = [...Array(dx).fill("R"), ...Array(dy).fill("D")], i = R.int(0, prog.length - 1);
  const bad = prog.slice(); bad[i] = prog[i] === "R" ? R.pick(["L", "U"]) : R.pick(["U", "L"]);
  const pos = T.ord.slice(0, prog.length), c = { opts: pos, correct: i };
  return { q: T.er_q(dx, dy, bad.map(a => ARR[a]).join(" ")), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false,
           sol: T.er_s(T.ord[i], ARR[prog[i]], prog.map(a => ARR[a]).join(" ")) };
});
})();
