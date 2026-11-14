/* WikiAula — Informática, Grado 7: hardware, archivos, licencias y Python (tipos, operadores, if, while, for, errores).
   Textos y bancos en i18n/<lang>/inf7.js (S.inf7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = lines => `<pre>${lines.map(esc).join("\n")}</pre>`;

def("inf7.comp", (R, S) => B.mixed(S.inf7.comp, R));
def("inf7.so", (R, S) => B.mixed(S.inf7.so, R));
def("inf7.licencia", (R, S) => B.mixed(S.inf7.licencia, R));
def("inf7.error", (R, S) => B.mixed(S.inf7.error, R));
def("inf7.doc", (R, S) => B.mixed(S.inf7.doc, R));
def("inf7.priv", (R, S) => B.mixed(S.inf7.priv, R));
def("inf7.netiq", (R, S) => B.mixed(S.inf7.netiq, R));

def("inf7.capac", (R, S) => {
  const T = S.inf7, gb = R.pick([16, 32, 64, 128, 256, 512]), [what, mb] = R.pick(T.files), n = Math.floor(gb * 1000 / mb);
  return { q: T.ca_q(gb, what, mb), kind: "int", ans: n, sol: T.ca_s(gb, mb, n) };
});
def("inf7.ruta", (R, S) => {
  const T = S.inf7, [path, folder, others] = R.pick(T.rutas), c = choice(R, folder, others);
  return { q: T.ru_q(path), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ru_s(folder) };
});
def("inf7.tipo", (R, S) => {
  const T = S.inf7, [v, t] = R.pick(T.vals), c = { opts: ["int", "float", "str", "bool"], correct: ["int", "float", "str", "bool"].indexOf(t) };
  return { q: T.ti_q(esc(v)), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ti_s(esc(v), t) };
});
def("inf7.salida", (R, S) => {
  const T = S.inf7, a = R.int(2, 9), b = R.int(2, 9), k = R.int(0, 3);
  const cases = [[`print("${a}" + "${b}")`, `${a}${b}`], [`print(${a} + ${b})`, `${a + b}`], [`print("ja" * ${Math.min(a, 4)})`, "ja".repeat(Math.min(a, 4))],
                 [`print(len("${"programa".slice(0, a % 6 + 3)}"))`, `${a % 6 + 3}`]];
  const [src, out] = cases[k];
  return { q: T.sa_q(code([src])), kind: "text", ans: out, sol: T.sa_s(esc(out)) };
});
def("inf7.ops", (R, S) => {
  const T = S.inf7, a = R.int(10, 60), b = R.int(2, 9), k = R.int(0, 4);
  const cases = [[`${a} // ${b}`, Math.floor(a / b)], [`${a} % ${b}`, a % b], [`${b} ** ${R.int(2, 3)}`, null], [`${a} - ${b} * 2`, a - b * 2], [`(${a} + ${b}) // 2`, Math.floor((a + b) / 2)]];
  let [ex, r] = cases[k];
  if (r === null) { const e = +ex.split("** ")[1]; r = Math.pow(b, e); }
  return { q: T.op_q(ex), kind: "int", ans: r, sol: T.op_s(ex, r) };
});
def("inf7.ifpy", (R, S) => {
  const T = S.inf7, n = R.int(0, 10), lines = ["if nota >= 9:", '    print("Sobresaliente")', "elif nota >= 7:", '    print("Notable")', "elif nota >= 5:", '    print("Aprobado")', "else:",
    '    print("Suspenso")'];
  const r = n >= 9 ? "Sobresaliente" : n >= 7 ? "Notable" : n >= 5 ? "Aprobado" : "Suspenso", c = { opts: ["Sobresaliente", "Notable", "Aprobado", "Suspenso"], correct: ["Sobresaliente", "Notable", "Aprobado", "Suspenso"].indexOf(r) };
  if (R.int(0, 1)) return { q: T.if_q(n, code(lines)), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.if_s(n, r) };
  const x = R.int(1, 30), par = x % 2 === 0, big = x > 15, lines2 = ["if x % 2 == 0 and x > 15:", '    print("A")', "elif x % 2 == 0 or x > 15:", '    print("B")', "else:", '    print("C")'];
  const r2 = par && big ? "A" : (par || big) ? "B" : "C";
  return { q: T.if_q2(x, code(lines2)), kind: "choice", opts: ["A", "B", "C"], correct: ["A", "B", "C"].indexOf(r2), shuffle: false, sol: T.if_s2(x, par, big, r2) };
});
def("inf7.while", (R, S) => {
  const T = S.inf7, k = R.int(0, 2);
  if (k === 0) { const x0 = R.int(1, 5), m = R.pick([2, 3]), lim = R.int(20, 80); let x = x0; const seq = [x]; while (x < lim) { x *= m; seq.push(x); }
    return { q: T.wh_q(code([`x = ${x0}`, `while x < ${lim}:`, `    x = x * ${m}`, "print(x)"])), kind: "int", ans: x, sol: T.wh_s(seq) }; }
  if (k === 1) { const n0 = R.int(10, 30), d = R.int(2, 5); let n = n0, c = 0; while (n > 0) { n -= d; c++; }
    return { q: T.wh_q2(code([`n = ${n0}`, "c = 0", "while n > 0:", `    n = n - ${d}`, "    c = c + 1", "print(c)"])), kind: "int", ans: c, sol: T.wh_s2(n0, d, c) }; }
  const lim = R.int(10, 40); let s = 0, i = 1; while (s < lim) { s += i; i++; }
  return { q: T.wh_q(code(["s = 0", "i = 1", `while s < ${lim}:`, "    s = s + i", "    i = i + 1", "print(s)"])), kind: "int", ans: s, sol: T.wh_s3(i - 1, s) };
});
def("inf7.for", (R, S) => {
  const T = S.inf7, k = R.int(0, 2);
  if (k === 0) { const a = R.int(0, 5), b = a + R.int(6, 20), p = R.int(2, 4), xs = []; for (let i = a; i < b; i += p) xs.push(i);
    return { q: T.fo_q1(a, b, p), kind: "int", ans: xs.length, sol: T.fo_s1(xs) }; }
  if (k === 1) { const a = R.int(1, 4), b = a + R.int(3, 7); let s = 0; for (let i = a; i < b; i++) s += i;
    return { q: T.fo_q2(code(["s = 0", `for i in range(${a}, ${b}):`, "    s = s + i", "print(s)"])), kind: "int", ans: s, sol: T.fo_s2(a, b, s) }; }
  const n = R.int(3, 6), m = R.int(2, 9);
  return { q: T.fo_q2(code(["p = 1", `for i in range(${n}):`, `    p = p * ${m === 1 ? 2 : 2}`, "print(p)"])), kind: "int", ans: Math.pow(2, n), sol: T.fo_s3(n) };
});
def("inf7.hoja", (R, S) => {
  const T = S.inf7, v = R.int(0, 10), lim = R.pick([5, 6, 7]), yes = R.pick(["Aprobado", "Apto", "Sí"]), no = { Aprobado: "Suspenso", Apto: "No apto", "Sí": "No" }[yes];
  return { q: T.ho_q(v, lim, yes, no), kind: "choice", opts: [yes, no], correct: v >= lim ? 0 : 1, shuffle: false, sol: T.ho_s(v, lim, v >= lim ? yes : no) };
});
def("inf7.abs", (R, S) => {
  const T = S.inf7, c1 = R.pick(["B", "C"]), fix = R.pick(["E1", "F1", "H2"]), r0 = R.int(2, 3), r1 = r0 + R.int(2, 7), fx = fix.replace(/([A-Z])(\d)/, "$$$1$$$2");
  const right = `=${c1}${r1}*${fx}`, c = choice(R, right, [`=${c1}${r1}*${fix.replace(/\d/, d => +d + r1 - r0)}`, `=${c1}${r0}*${fx}`, `=${c1}${r1}*${fix}`]);
  return { q: T.ab_q(`=${c1}${r0}*${fx}`, r0, r1), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ab_s(right) };
});
})();
