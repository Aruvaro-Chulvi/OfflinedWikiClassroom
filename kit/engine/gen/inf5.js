/* WikiAula — Informática, Grado 5: binario de 8 bits, imágenes y texto, operadores, lógica, bucles, redes y ciudadanía.
   Textos y bancos en i18n/<lang>/inf5.js (S.inf5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("inf5.repr", (R, S) => B.mixed(S.inf5.repr, R));
def("inf5.pseudo", (R, S) => B.mixed(S.inf5.pseudo, R));
def("inf5.red", (R, S) => B.mixed(S.inf5.red, R));
def("inf5.correo", (R, S) => B.mixed(S.inf5.correo, R));
def("inf5.presenta", (R, S) => B.mixed(S.inf5.presenta, R));
def("inf5.edicion", (R, S) => B.mixed(S.inf5.edicion, R));
def("inf5.bulo", (R, S) => B.mixed(S.inf5.bulo, R));
def("inf5.bienestar", (R, S) => B.mixed(S.inf5.bienestar, R));

def("inf5.b2d", (R, S) => {
  const T = S.inf5, n = R.int(16, 255), b = n.toString(2).padStart(8, "0");
  return { q: T.bd_q(b), kind: "int", ans: n, sol: T.bd_s(b, n) };
});
def("inf5.d2b", (R, S) => {
  const T = S.inf5, n = R.int(5, 120), b = n.toString(2).padStart(8, "0");
  return { q: T.db_q(n), kind: "text", ans: [b, n.toString(2)], sol: T.db_s(n, b) };
});
def("inf5.comb", (R, S) => {
  const T = S.inf5, n = R.int(2, 10);
  if (R.int(0, 1)) return { q: T.co_q1(n), kind: "int", ans: Math.pow(2, n), sol: T.co_s1(n) };
  return { q: T.co_q2(Math.pow(2, n)), kind: "int", ans: n, sol: T.co_s2(n) };
});
def("inf5.pix", (R, S) => {
  const T = S.inf5, k = R.int(0, 1);
  if (k === 0) { const w = R.pick([8, 10, 16, 20, 32, 40, 64]), h = R.pick([8, 10, 12, 16, 30]); return { q: T.px_q1(w, h), kind: "int", ans: w * h, sol: T.px_s1(w, h) }; }
  const w = R.pick([8, 16, 24, 32]), h = R.pick([8, 16, 24]), bits = w * h;
  return { q: T.px_q2(w, h), kind: "int", ans: bits / 8, sol: T.px_s2(w, h, bits) };
});
def("inf5.rgb", (R, S) => {
  const T = S.inf5, i = R.int(0, T.cols.length - 1), [rgb, name] = T.cols[i];
  const wrong = R.shuffle(T.cols.filter((c, j) => j !== i)).slice(0, 3).map(c => c[1]), c = choice(R, name, wrong);
  return { q: T.rg_q(rgb), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.rg_s(rgb, name) };
});
def("inf5.ascii", (R, S) => {
  const T = S.inf5, k = R.int(0, 2), L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (k === 0) { const i = R.int(1, 25); return { q: T.as_q1(L[i]), kind: "int", ans: 65 + i, sol: T.as_s1(L[i], i) }; }
  if (k === 1) { const i = R.int(0, 25); return { q: T.as_q2(L[i].toLowerCase()), kind: "int", ans: 97 + i, sol: T.as_s2(L[i].toLowerCase(), i) }; }
  const i = R.int(0, 25); return { q: T.as_q3(65 + i), kind: "text", ans: L[i], sol: T.as_s3(65 + i, L[i]) };
});
def("inf5.op", (R, S) => {
  const T = S.inf5, a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 6), k = R.int(0, 3);
  const ex = [[`(${a} + ${b}) * ${c}`, (a + b) * c], [`${a} + ${b} * ${c}`, a + b * c], [`${a} * ${b} - ${c}`, a * b - c], [`${a * c} / ${c} + ${b}`, a + b]][k];
  return { q: T.op_q(ex[0]), kind: "int", ans: ex[1], sol: T.op_s(ex[0], ex[1]) };
});
def("inf5.azar", (R, S) => {
  const T = S.inf5, a = R.int(0, 5), b = a + R.int(3, 20);
  return { q: T.az_q(a, b), kind: "int", ans: b - a + 1, sol: T.az_s(a, b) };
});
def("inf5.logica", (R, S) => {
  const T = S.inf5, v = R.pick(["x", "edad", "puntos"]), x = R.int(0, 20), a = R.int(2, 18), b = R.int(2, 18), op = R.pick(["y", "o"]);
  const c1 = R.int(0, 1) ? [">", x > a] : ["<", x < a], c2 = R.int(0, 1) ? [">", x > b] : ["=", x === b];
  const neg = R.int(0, 3) === 0, r0 = op === "y" ? (c1[1] && c2[1]) : (c1[1] || c2[1]), r = neg ? !r0 : r0;
  const expr = `${neg ? "no " : ""}((${v} ${c1[0]} ${a}) ${op} (${v} ${c2[0]} ${b}))`;
  return { q: T.lo_q(v, x, expr), kind: "choice", opts: [T.V, T.F], correct: r ? 0 : 1, shuffle: false, sol: T.lo_s(c1[1], c2[1], op, neg, r) };
});
def("inf5.hasta", (R, S) => {
  const T = S.inf5, k = R.int(0, 1);
  if (k === 0) { const step = R.pick([2, 3, 5]), lim = R.int(10, 30), s0 = R.int(0, 4); let x = s0, n = 0; while (!(x >= lim)) { x += step; n++; }
    return R.int(0, 1) ? { q: T.ha_q1(s0, lim, step), kind: "int", ans: x, sol: T.ha_s1(s0, step, x) } : { q: T.ha_q2(s0, lim, step), kind: "int", ans: n, sol: T.ha_s2(s0, step, x, n) }; }
  const s0 = R.int(1, 3), lim = R.int(10, 60); let x = s0; const seq = [x]; while (!(x > lim)) { x *= 2; seq.push(x); }
  return { q: T.ha_q3(s0, lim), kind: "int", ans: x, sol: T.ha_s3(seq) };
});
def("inf5.paq", (R, S) => {
  const T = S.inf5, size = R.pick([2, 4, 5, 8, 10]), n = R.int(5, 40), extra = R.int(0, 1) ? R.int(1, size - 1) : 0, tot = size * n + extra;
  const p = Math.ceil(tot / size);
  return { q: T.pq_q(tot, size), kind: "int", ans: p, sol: T.pq_s(tot, size, p, extra > 0) };
});
def("inf5.url", (R, S) => {
  const T = S.inf5, [proto, dom, path] = R.pick(T.urls), k = R.int(0, 2), parts = [proto, dom, path];
  const c = choice(R, parts[k], parts.filter((p, i) => i !== k));
  return { q: T.ur_q(`${proto}://${dom}${path}`, T.partes[k]), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ur_s(T.partes[k], parts[k]) };
});
})();
