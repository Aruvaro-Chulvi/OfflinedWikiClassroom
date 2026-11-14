/* WikiAula — Informática, Grado 8: hexadecimal, tamaños, compresión, cadenas, listas, funciones, búsqueda, ordenación, eficiencia, HTML/CSS.
   Textos y bancos en i18n/<lang>/inf8.js (S.inf8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = lines => `<pre>${lines.map(esc).join("\n")}</pre>`;
const pyStr = s => `"${s}"`;

def("inf8.comp", (R, S) => B.mixed(S.inf8.comp, R));
def("inf8.html", (R, S) => B.mixed(S.inf8.html, R));
def("inf8.css", (R, S) => B.mixed(S.inf8.css, R));
def("inf8.acces", (R, S) => B.mixed(S.inf8.acces, R));
def("inf8.brecha", (R, S) => B.mixed(S.inf8.brecha, R));

def("inf8.hex", (R, S) => {
  const T = S.inf8, k = R.int(0, 2), n = R.int(16, 255), h = n.toString(16).toUpperCase().padStart(2, "0");
  if (k === 0) return { q: T.hx_q1(h), kind: "int", ans: n, sol: T.hx_s1(h, n) };
  if (k === 1) return { q: T.hx_q2(n), kind: "text", ans: [h, h.toLowerCase(), n.toString(16)], sol: T.hx_s2(n, h) };
  const b = n.toString(2).padStart(8, "0");
  return { q: T.hx_q3(b), kind: "text", ans: [h, h.toLowerCase(), n.toString(16)], sol: T.hx_s3(b, h) };
});
def("inf8.max", (R, S) => {
  const T = S.inf8, n = R.int(3, 16);
  if (R.int(0, 1)) return { q: T.mx_q1(n), kind: "int", ans: Math.pow(2, n) - 1, sol: T.mx_s1(n) };
  const v = R.int(5, 250), c = Math.max(8, 0), x = R.int(1, 30), r = (v + x) % 256;
  return { q: T.mx_q2(v, x), kind: "int", ans: r, sol: T.mx_s2(v, x, r) };
});
def("inf8.unid", (R, S) => {
  const T = S.inf8, mb = R.pick([8, 16, 40, 100, 250]), mbps = R.pick([8, 16, 20, 40, 100].filter(v => (mb * 8) % v === 0)), t = mb * 8 / mbps;
  return { q: T.un_q(mb, mbps), kind: "int", ans: t, sol: T.un_s(mb, mbps, t) };
});
def("inf8.img", (R, S) => {
  const T = S.inf8, w = R.pick([10, 20, 32, 50, 64, 100, 200]), h = R.pick([10, 20, 32, 50, 100]), bpp = R.pick([1, 3]);
  return { q: T.im_q(w, h, bpp), kind: "int", ans: w * h * bpp, sol: T.im_s(w, h, bpp) };
});
def("inf8.audio", (R, S) => {
  const T = S.inf8, f = R.pick([8000, 11025, 22050, 44100]), b = R.pick([1, 2]), ch = R.pick([1, 2]), s = R.int(1, 10);
  return { q: T.au_q(f, b, ch, s), kind: "int", ans: f * b * ch * s, sol: T.au_s(f, b, ch, s) };
});
def("inf8.rle", (R, S) => {
  const T = S.inf8, letters = R.shuffle(["A", "B", "X", "N", "Z"]).slice(0, R.int(2, 4)), runs = letters.map(l => [l, R.int(1, 7)]);
  for (let i = 1; i < runs.length; i++) if (runs[i][0] === runs[i - 1][0]) runs[i][0] = "Q";
  const raw = runs.map(([l, n]) => l.repeat(n)).join(""), enc = runs.map(([l, n]) => n + l).join("");
  if (R.int(0, 1)) return { q: T.rl_q1(raw), kind: "text", ans: enc, sol: T.rl_s1(enc) };
  return { q: T.rl_q2(enc), kind: "int", ans: raw.length, sol: T.rl_s2(enc, raw) };
});
def("inf8.cad", (R, S) => {
  const T = S.inf8, w = R.pick(T.words), k = R.int(0, 4), i = R.int(0, w.length - 1), a = R.int(0, w.length - 3), b = a + R.int(2, 3);
  const cases = [[`s[${i}]`, w[i]], [`s[-1]`, w[w.length - 1]], [`s[${a}:${b}]`, w.slice(a, b)], [`len(s)`, String(w.length)], [`s.lower()`, w.toLowerCase()]];
  const [ex, r] = cases[k];
  return { q: T.ca_q(w, ex), kind: "text", ans: [r, `'${r}'`, `"${r}"`], sol: T.ca_s(ex, r) };
});
def("inf8.lista", (R, S) => {
  const T = S.inf8, L = []; for (let i = 0; i < R.int(4, 6); i++) L.push(R.int(1, 9));
  const k = R.int(0, 3);
  if (k === 0) { const i = R.int(0, L.length - 1); return { q: T.li_q(L, `L[${i}]`), kind: "int", ans: L[i], sol: T.li_s(`L[${i}]`, L[i]) }; }
  if (k === 1) return { q: T.li_q(L, "sum(L)"), kind: "int", ans: L.reduce((a, b) => a + b, 0), sol: T.li_s("sum(L)", L.reduce((a, b) => a + b, 0)) };
  if (k === 2) { const x = R.int(1, 9); return { q: T.li_q2(L, x), kind: "int", ans: L.length + 1, sol: T.li_s2(L.length) }; }
  const lim = R.int(3, 7), c = L.filter(x => x >= lim).length;
  return { q: T.li_q3(L, lim, code(["c = 0", "for x in L:", `    if x >= ${lim}:`, "        c = c + 1", "print(c)"])), kind: "int", ans: c, sol: T.li_s3(lim, c) };
});
def("inf8.func", (R, S) => {
  const T = S.inf8, a = R.int(2, 5), b = R.int(0, 6), x = R.int(1, 6), y = R.int(0, 5), k = R.int(0, 1);
  if (k === 0) { const f = v => a * v + b; return { q: T.fu_q(code(["def f(x):", `    return ${a} * x + ${b}`, `print(f(${x}) + f(${y}))`])), kind: "int", ans: f(x) + f(y), sol: T.fu_s(`f(${x}) = ${f(x)}; f(${y}) = ${f(y)}`, f(x) + f(y)) }; }
  const g = (p, q) => p * q - a;
  return { q: T.fu_q(code(["def g(p, q):", `    return p * q - ${a}`, `print(g(${x}, ${y + 2}))`])), kind: "int", ans: g(x, y + 2), sol: T.fu_s(`${x} · ${y + 2} − ${a}`, g(x, y + 2)) };
});
def("inf8.busca", (R, S) => {
  const T = S.inf8, k = R.int(0, 1);
  if (k === 0) { const n = R.pick([10, 100, 1000, 5000, 1000000]); return { q: T.bu_q1(n), kind: "int", ans: n, sol: T.bu_s1(n) }; }
  const n = R.pick([15, 31, 100, 1000, 4000, 1000000]), s = Math.ceil(Math.log2(n + 1));
  return { q: T.bu_q2(n), kind: "int", ans: s, sol: T.bu_s2(n, s) };
});
def("inf8.ordena", (R, S) => {
  const T = S.inf8, n = R.int(4, 20);
  return { q: T.or_q(n), kind: "int", ans: n * (n - 1) / 2, sol: T.or_s(n) };
});
def("inf8.efic", (R, S) => {
  const T = S.inf8, k = R.int(0, 2);
  if (k === 0) { const n = R.int(3, 12), m = R.int(2, 10); return { q: T.ef_q1(code([`for i in range(${n}):`, `    for j in range(${m}):`, '        print("*")'])), kind: "int", ans: n * m, sol: T.ef_s1(n, m) }; }
  if (k === 1) { const f = R.pick([2, 3, 10]), kind = R.pick(["lineal", "cuadrático"]), r = kind === "lineal" ? f : f * f;
    return { q: T.ef_q2(kind, f), kind: "int", ans: r, sol: T.ef_s2(kind, f, r) }; }
  const n = R.int(5, 20);
  return { q: T.ef_q3(n), kind: "int", ans: Math.pow(2, n), sol: T.ef_s3(n) };
});
})();
