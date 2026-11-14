/* WikiAula — Informática, Grado 11: arquitectura, memoria, complemento a dos, SO, comandos, subredes, recursividad, complejidad, POO, SQL y web.
   Textos y bancos en i18n/<lang>/inf11.js (S.inf11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = lines => `<pre>${lines.map(esc).join("\n")}</pre>`;
const ip2s = n => [24, 16, 8, 0].map(s => (n >>> s) & 255).join(".");

def("inf11.cpu", (R, S) => B.mixed(S.inf11.cpu, R));
def("inf11.mem", (R, S) => B.mixed(S.inf11.mem, R));
def("inf11.proc", (R, S) => B.mixed(S.inf11.proc, R));
def("inf11.bash", (R, S) => B.mixed(S.inf11.bash, R));
def("inf11.serv", (R, S) => B.mixed(S.inf11.serv, R));
def("inf11.bigo", (R, S) => B.mixed(S.inf11.bigo, R));
def("inf11.poo", (R, S) => B.mixed(S.inf11.poo, R));
def("inf11.er", (R, S) => B.mixed(S.inf11.er, R));
def("inf11.http", (R, S) => B.mixed(S.inf11.http, R));
def("inf11.ley", (R, S) => B.mixed(S.inf11.ley, R));

def("inf11.ciclo", (R, S) => {
  const T = S.inf11, k = R.int(0, 2), right = T.fases[(k + 1) % 3], c = choice(R, right, T.fases.filter(f => f !== right));
  return { q: T.ci_q(T.fases[k]), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.ci_s() };
});
def("inf11.cache", (R, S) => {
  const T = S.inf11, k = R.int(0, 1);
  if (k === 0) { const tot = R.pick([200, 400, 500, 1000]), pct = R.pick([80, 85, 90, 95, 98]), ok = tot * pct / 100;
    return { q: T.ca_q1(ok, tot), kind: "int", ans: pct, sol: T.ca_s1(ok, tot, pct) }; }
  const hit = R.pick([90, 95, 98]), tc = R.pick([1, 2, 4]), tm = R.pick([50, 100]), t = +((hit * tc + (100 - hit) * tm) / 100).toFixed(2);
  return { q: T.ca_q2(hit, tc, tm), kind: "num", ans: t, tol: 0.01, sol: T.ca_s2(hit, tc, tm, t) };
});
def("inf11.ca2", (R, S) => {
  const T = S.inf11, v = R.int(-128, 127), b = ((v + 256) % 256).toString(2).padStart(8, "0");
  if (R.int(0, 1)) return { q: T.c2_q1(b), kind: "int", ans: v, sol: T.c2_s1(b, v) };
  const n = R.int(-100, -1), bn = ((n + 256) % 256).toString(2).padStart(8, "0");
  return { q: T.c2_q2(n), kind: "text", ans: bn, sol: T.c2_s2(n, bn) };
});
def("inf11.utf8", (R, S) => {
  const T = S.inf11, w = R.pick(T.palabras), n = [...w].reduce((a, ch) => { const c = ch.codePointAt(0); return a + (c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4); }, 0);
  return { q: T.u8_q(w), kind: "int", ans: n, sol: T.u8_s(w, n) };
});
def("inf11.rr", (R, S) => {
  const T = S.inf11, k = R.int(0, 1);
  if (k === 0) { const ts = [R.int(1, 9), R.int(1, 9), R.int(1, 9)]; let t = 0; const ends = ts.map(x => (t += x)); const avg = ends.reduce((a, b) => a + b, 0) / 3;
    const sorted = ts.slice().sort((a, b) => a - b); t = 0; const ends2 = sorted.map(x => (t += x)); const avg2 = ends2.reduce((a, b) => a + b, 0) / 3;
    if (R.int(0, 1)) return { q: T.rr_q1(ts, "FCFS"), kind: "num", ans: +avg.toFixed(2), tol: 0.01, sol: T.rr_s1(ends, avg) };
    return { q: T.rr_q1(ts, "SJF"), kind: "num", ans: +avg2.toFixed(2), tol: 0.01, sol: T.rr_s1(ends2, avg2) }; }
  const a = R.int(2, 5), b = R.int(1, 4), q = 1; const rem = [a, b], name = ["A", "B"], order = []; let t = 0, endB = 0, endA = 0;
  while (rem[0] > 0 || rem[1] > 0) { for (let i = 0; i < 2; i++) if (rem[i] > 0) { rem[i] -= q; t += q; order.push(name[i]); if (rem[i] === 0) { if (i === 0) endA = t; else endB = t; } } }
  const ask = R.pick(["A", "B"]);
  return { q: T.rr_q2(a, b, ask), kind: "int", ans: ask === "A" ? endA : endB, sol: T.rr_s2(order, ask, ask === "A" ? endA : endB) };
});
def("inf11.pag", (R, S) => {
  const T = S.inf11, ps = R.pick([1000, 1024, 4096]), addr = R.int(ps + 1, ps * 9), k = R.int(0, 1);
  if (k === 0) return { q: T.pa_q1(ps, addr), kind: "int", ans: Math.floor(addr / ps), sol: T.pa_s(ps, addr) };
  return { q: T.pa_q2(ps, addr), kind: "int", ans: addr % ps, sol: T.pa_s(ps, addr) };
});
def("inf11.chmod", (R, S) => {
  const T = S.inf11, ds = [R.pick([7, 6, 5, 4]), R.pick([7, 5, 4, 0]), R.pick([5, 4, 0])], str = ds.map(d => (d & 4 ? "r" : "-") + (d & 2 ? "w" : "-") + (d & 1 ? "x" : "-")).join("");
  if (R.int(0, 1)) return { q: T.ch_q1(str), kind: "text", ans: ds.join(""), sol: T.ch_s(str, ds.join("")) };
  return { q: T.ch_q2(ds.join("")), kind: "text", ans: str, sol: T.ch_s(str, ds.join("")) };
});
def("inf11.subred", (R, S) => {
  const T = S.inf11, n = R.pick([24, 25, 26, 27, 28]), ip = ((192 << 24) | (168 << 16) | (R.int(0, 50) << 8) | R.int(1, 254)) >>> 0;
  const mask = n === 0 ? 0 : (0xFFFFFFFF << (32 - n)) >>> 0, net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0, k = R.int(0, 2);
  if (k === 0) return { q: T.sb_q1(ip2s(ip), n), kind: "text", ans: ip2s(net), sol: T.sb_s(ip2s(net), ip2s(bc), n) };
  if (k === 1) return { q: T.sb_q2(ip2s(ip), n), kind: "text", ans: ip2s(bc), sol: T.sb_s(ip2s(net), ip2s(bc), n) };
  return { q: T.sb_q3(n), kind: "text", ans: ip2s(mask), sol: T.sb_s3(n, ip2s(mask)) };
});
def("inf11.rec", (R, S) => {
  const T = S.inf11, k = R.int(0, 3);
  if (k === 0) { const n = R.int(3, 7); let f = 1; for (let i = 2; i <= n; i++) f *= i; return { q: T.re_q(code(["def f(n):", "    if n == 0:", "        return 1", "    return n * f(n - 1)", `print(f(${n}))`])), kind: "int", ans: f, sol: T.re_s1(n, f) }; }
  if (k === 1) { const n = R.int(3, 9), L = []; for (let i = 0; i < n; i++) L.push(R.int(1, 9)); const s = L.reduce((a, b) => a + b, 0);
    return { q: T.re_q(code(["def suma(L):", "    if L == []:", "        return 0", "    return L[0] + suma(L[1:])", `print(suma([${L.join(", ")}]))`])), kind: "int", ans: s, sol: T.re_s2(L, s) }; }
  if (k === 2) { const n = R.int(3, 8); return { q: T.re_q3(n), kind: "int", ans: Math.pow(2, n) - 1, sol: T.re_s3(n) }; }
  const n = R.int(4, 10), fib = [0, 1]; for (let i = 2; i <= n; i++) fib.push(fib[i - 1] + fib[i - 2]);
  return { q: T.re_q(code(["def fib(n):", "    if n < 2:", "        return n", "    return fib(n - 1) + fib(n - 2)", `print(fib(${n}))`])), kind: "int", ans: fib[n], sol: T.re_s4(fib.slice(0, n + 1)) };
});
def("inf11.ops", (R, S) => {
  const T = S.inf11, k = R.int(0, 1);
  if (k === 0) { const t = R.pick([1, 2, 3, 5]), f = R.pick([2, 3, 4, 10]), cls = R.pick(["O(n)", "O(n²)"]), r = cls === "O(n)" ? t * f : t * f * f;
    return { q: T.op_q1(cls, t, f), kind: "int", ans: r, sol: T.op_s1(cls, t, f, r) }; }
  const n = R.pick([16, 64, 256, 1024, 4096]), c = Math.round(Math.log2(n));
  return { q: T.op_q2(code(["i = " + n, "c = 0", "while i > 1:", "    i = i // 2", "    c = c + 1", "print(c)"])), kind: "int", ans: c, sol: T.op_s2(n, c) };
});
def("inf11.merge", (R, S) => {
  const T = S.inf11, k = R.int(0, 2);
  if (k === 0) { const n = R.pick([4, 8, 16, 32, 64, 128, 1024]); return { q: T.me_q1(n), kind: "int", ans: Math.log2(n), sol: T.me_s1(n) }; }
  if (k === 1) { const a = [], b = []; for (let i = 0; i < 3; i++) { a.push(R.int(1, 30)); b.push(R.int(1, 30)); } a.sort((x, y) => x - y); b.sort((x, y) => x - y);
    const m = a.concat(b).sort((x, y) => x - y); return { q: T.me_q2(a, b), kind: "text", ans: [m.join(" "), m.join(", "), m.join(",")], sol: T.me_s2(m) }; }
  const L = []; const used = new Set(); while (L.length < 6) { const x = R.int(1, 20); if (!used.has(x)) { used.add(x); L.push(x); } }
  const p = L[0], lo = L.slice(1).filter(x => x < p), hi = L.slice(1).filter(x => x >= p);
  return { q: T.me_q3(L, p), kind: "int", ans: lo.length, sol: T.me_s3(lo, p, hi) };
});
def("inf11.poocod", (R, S) => {
  const T = S.inf11, [cls, out] = R.pick(T.animales), name = R.pick(["Rex", "Mia", "Tom"]);
  const c = choice(R, out, T.animales.map(a => a[1]).filter(o => o !== out));
  return { q: T.pc_q(code(["class Animal:", "    def hablar(self): return \"...\"", "class Perro(Animal):", "    def hablar(self): return \"¡Guau!\"", "class Gato(Animal):",
    "    def hablar(self): return \"¡Miau!\"", "class Pez(Animal):", "    pass", `print(${cls}().hablar())`])), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.pc_s(cls, out) };
});
def("inf11.sql", (R, S) => {
  const T = S.inf11, tiendas = ["A", "B", "C"], rows = []; for (let i = 0; i < R.int(5, 7); i++) rows.push([R.pick(tiendas), R.pick([5, 10, 15, 20, 25, 30])]);
  const t = R.pick(rows.map(r => r[0])), k = R.int(0, 1);
  if (k === 0) { const s = rows.filter(r => r[0] === t).reduce((a, r) => a + r[1], 0); return { q: T.sq_q1(rows, t), kind: "int", ans: s, sol: T.sq_s1(t, s) }; }
  const c = rows.filter(r => r[0] === t).length; return { q: T.sq_q2(rows, t), kind: "int", ans: c, sol: T.sq_s2(t, c) };
});
})();
