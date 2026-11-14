/* WikiAula — Informática, Grado 10: JavaScript, JSON, UX, clases, Git, aprendizaje automático, neuronas, cifrado, redes y sociedad digital.
   Textos y bancos en i18n/<lang>/inf10.js (S.inf10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = lines => `<pre>${lines.map(esc).join("\n")}</pre>`;

def("inf10.evento", (R, S) => B.mixed(S.inf10.evento, R));
def("inf10.web", (R, S) => B.mixed(S.inf10.web, R));
def("inf10.ux", (R, S) => B.mixed(S.inf10.ux, R));
def("inf10.git", (R, S) => B.mixed(S.inf10.git, R));
def("inf10.ml", (R, S) => B.mixed(S.inf10.ml, R));
def("inf10.genia", (R, S) => B.mixed(S.inf10.genia, R));
def("inf10.cifrado", (R, S) => B.mixed(S.inf10.cifrado, R));
def("inf10.redsec", (R, S) => B.mixed(S.inf10.redsec, R));
def("inf10.rgpd", (R, S) => B.mixed(S.inf10.rgpd, R));
def("inf10.econ", (R, S) => B.mixed(S.inf10.econ, R));
def("inf10.iot", (R, S) => B.mixed(S.inf10.iot, R));

def("inf10.js", (R, S) => {
  const T = S.inf10, a = R.int(2, 9), b = R.int(2, 9), k = R.int(0, 4);
  const cases = [[`console.log("${a}" + ${b});`, `${a}${b}`], [`console.log(${a} + ${b});`, `${a + b}`], [`console.log("${a}" * ${b});`, `${a * b}`],
                 [`let x = ${a};`, `x = x * 2 + ${b};`, `console.log(x);`, `${a * 2 + b}`], [`const L = [${a}, ${b}, ${a + b}];`, `console.log(L.length + L[2]);`, `${3 + a + b}`]];
  const c = cases[k], out = c[c.length - 1], src = c.slice(0, -1);
  return { q: T.js_q(code(src)), kind: "text", ans: out, sol: T.js_s(out) };
});
def("inf10.json", (R, S) => {
  const T = S.inf10, [obj, paths] = R.pick(T.objs), [p, v] = R.pick(paths);
  return { q: T.jn_q(code([obj]), p), kind: "text", ans: [v, `"${v}"`], sol: T.jn_s(p, v) };
});
def("inf10.clase", (R, S) => {
  const T = S.inf10, e0 = R.int(3, 10), ops = []; let e = e0;
  for (let i = 0; i < R.int(2, 4); i++) { const op = R.pick(["jugar", "comer"]); ops.push(op); e += op === "jugar" ? -2 : 3; }
  return { q: T.cl_q(code(["class Mascota:", "    def __init__(self, nombre, energia):", "        self.nombre = nombre", "        self.energia = energia", "    def jugar(self):",
    "        self.energia -= 2", "    def comer(self):", "        self.energia += 3", "", `m = Mascota("Rex", ${e0})`, ...ops.map(o => `m.${o}()`), "print(m.energia)"])), kind: "int", ans: e, sol: T.cl_s(e0, ops, e) };
});
def("inf10.precision", (R, S) => {
  const T = S.inf10, tot = R.pick([20, 25, 40, 50, 80, 100, 200]), pct = R.pick([60, 70, 75, 80, 85, 90, 95]), ok = tot * pct / 100;
  if (!Number.isInteger(ok)) return { q: T.pr_q(80, 100), kind: "int", ans: 80, sol: T.pr_s(80, 100, 80) };
  return { q: T.pr_q(ok, tot), kind: "int", ans: pct, sol: T.pr_s(ok, tot, pct) };
});
def("inf10.neurona", (R, S) => {
  const T = S.inf10, n = 3, x = [], w = []; for (let i = 0; i < n; i++) { x.push(R.int(0, 1)); w.push(R.pick([-4, -3, -2, -1, 1, 2, 3, 4])); }
  const s = x.reduce((a, xi, i) => a + xi * w[i], 0), th = R.int(1, 4);
  if (R.int(0, 1)) return { q: T.ne_q1(x, w), kind: "int", ans: s, sol: T.ne_s1(x, w, s) };
  return { q: T.ne_q2(x, w, th), kind: "choice", opts: ["1 (se activa)", "0 (no se activa)"], correct: s > th ? 0 : 1, shuffle: false, sol: T.ne_s2(s, th) };
});
def("inf10.claves", (R, S) => {
  const T = S.inf10, [task, right] = R.pick(T.tareas), c = choice(R, right, T.todas.filter(x => x !== right).slice(0, 3));
  return { q: T.cv_q(task), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.cv_s(right) };
});
})();
