/* WikiAula — Informática, Grado 12: pilas, colas, árboles, grafos, BFS/DFS, Dijkstra, voraces, lógica, autómatas, RSA y métricas.
   Textos y bancos en i18n/<lang>/inf12.js (S.inf12). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const modpow = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1; } return r; };

def("inf12.comput", (R, S) => B.mixed(S.inf12.comput, R));
def("inf12.regex", (R, S) => B.mixed(S.inf12.regex, R));
def("inf12.scrum", (R, S) => B.mixed(S.inf12.scrum, R));
def("inf12.prueba", (R, S) => B.mixed(S.inf12.prueba, R));
def("inf12.iasoc", (R, S) => B.mixed(S.inf12.iasoc, R));
def("inf12.nube", (R, S) => B.mixed(S.inf12.nube, R));
def("inf12.proy", (R, S) => B.mixed(S.inf12.proy, R));

def("inf12.pila", (R, S) => {
  const T = S.inf12, cola = R.int(0, 1), ops = [], st = []; let n = 1;
  for (let i = 0; i < R.int(5, 8); i++) {
    if (st.length && R.int(0, 2) === 0) { ops.push(cola ? T.deq : T.pop); cola ? st.shift() : st.pop(); }
    else { const v = cola ? "ABCDEFGH"[n - 1] : n * R.int(1, 3); ops.push(`${cola ? T.enq : T.push}(${v})`); st.push(v); n++; }
  }
  if (!st.length) { const v = cola ? "Z" : 9; ops.push(`${cola ? T.enq : T.push}(${v})`); st.push(v); }
  const ans = String(cola ? st[0] : st[st.length - 1]);
  return { q: cola ? T.co_q(ops) : T.pi_q(ops), kind: "text", ans, sol: T.ps_s(st, ans, cola) };
});
def("inf12.arbol", (R, S) => {
  const T = S.inf12, [vals, pre, ino, post, h] = R.pick(T.abbs), k = R.int(0, 3);
  const what = [["preorden", pre], ["inorden", ino], ["postorden", post]][Math.min(k, 2)];
  if (k === 3) return { q: T.ar_q2(vals), kind: "int", ans: h, sol: T.ar_s2(h) };
  return { q: T.ar_q1(vals, what[0]), kind: "text", ans: [what[1].join(" "), what[1].join(", ")], sol: T.ar_s1(what[0], what[1]) };
});
def("inf12.abb", (R, S) => {
  const T = S.inf12, [vals] = R.pick(T.abbs), x = R.pick(vals);
  let node = { v: vals[0] }; const root = node;
  for (const v of vals.slice(1)) { let c = root; for (;;) { const side = v < c.v ? "l" : "r"; if (!c[side]) { c[side] = { v }; break; } c = c[side]; } }
  let c = root, steps = 0; const path = []; while (c) { steps++; path.push(c.v); if (c.v === x) break; c = x < c.v ? c.l : c.r; }
  return { q: T.ab_q(vals, x), kind: "int", ans: steps, sol: T.ab_s(path, steps) };
});
def("inf12.grafo", (R, S) => {
  const T = S.inf12, k = R.int(0, 1);
  if (k === 0) { const n = R.int(4, 15); return { q: T.gr_q1(n), kind: "int", ans: n * (n - 1) / 2, sol: T.gr_s1(n) }; }
  const nodes = ["A", "B", "C", "D", "E"], edges = new Set();
  while (edges.size < R.int(5, 7)) { const a = R.int(0, 4), b = R.int(0, 4); if (a !== b) edges.add([Math.min(a, b), Math.max(a, b)].join("")); }
  const x = R.int(0, 4), deg = [...edges].filter(e => e.includes(String(x))).length;
  return { q: T.gr_q2([...edges].map(e => nodes[+e[0]] + "–" + nodes[+e[1]]).join(", "), nodes[x]), kind: "int", ans: deg, sol: T.gr_s2(nodes[x], deg) };
});
def("inf12.bfs", (R, S) => {
  const T = S.inf12, [edges, bfs, dfs] = R.pick(T.grafos), k = R.int(0, 1);
  return { q: T.bf_q(edges, k ? "DFS" : "BFS"), kind: "text", ans: [(k ? dfs : bfs).join(" "), (k ? dfs : bfs).join(", "), (k ? dfs : bfs).join("")], sol: T.bf_s(k ? dfs : bfs) };
});
def("inf12.dijkstra", (R, S) => {
  const T = S.inf12, w = { AB: R.int(5, 12), AC: R.int(1, 4), CB: R.int(1, 5), CD: R.int(2, 6), BD: R.int(1, 4) };
  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity }, adj = { A: [["B", w.AB], ["C", w.AC]], B: [["A", w.AB], ["C", w.CB], ["D", w.BD]], C: [["A", w.AC], ["B", w.CB], ["D", w.CD]], D: [["B", w.BD], ["C", w.CD]] };
  const done = new Set();
  while (done.size < 4) { const u = Object.keys(dist).filter(n => !done.has(n)).sort((a, b) => dist[a] - dist[b])[0]; done.add(u); for (const [v, ww] of adj[u]) if (dist[u] + ww < dist[v]) dist[v] = dist[u] + ww; }
  const tgt = R.pick(["B", "D"]);
  return { q: T.dj_q(w, tgt), kind: "int", ans: dist[tgt], sol: T.dj_s(tgt, dist[tgt]) };
});
def("inf12.monedas", (R, S) => {
  const T = S.inf12, k = R.int(0, 1);
  if (k === 0) { const coins = [50, 20, 10, 5, 2, 1], amt = R.int(11, 99); let a = amt, n = 0; const used = []; for (const c of coins) while (a >= c) { a -= c; n++; used.push(c); }
    return { q: T.mo_q1(amt), kind: "int", ans: n, sol: T.mo_s1(used) }; }
  const coins = [1, 3, 4], amt = R.int(5, 12), best = [0]; for (let c = 1; c <= amt; c++) best.push(1 + Math.min(...coins.filter(x => x <= c).map(x => best[c - x])));
  return { q: T.mo_q2(amt), kind: "int", ans: best[amt], sol: T.mo_s2(amt, best) };
});
def("inf12.logica", (R, S) => {
  const T = S.inf12, k = R.int(0, 2);
  if (k === 0) { const a = R.int(0, 1), b = R.int(0, 1), g = R.pick(["XOR", "NAND", "NOR", "AND", "OR"]); const r = { XOR: a ^ b, NAND: 1 - (a & b), NOR: 1 - (a | b), AND: a & b, OR: a | b }[g];
    return { q: T.lo_q1(g, a, b), kind: "int", ans: r, sol: T.lo_s1(g, a, b, r) }; }
  if (k === 1) { const a = R.int(0, 1), b = R.int(0, 1), w = R.pick(["suma", "acarreo"]); const r = w === "suma" ? a ^ b : a & b;
    return { q: T.lo_q2(a, b, w), kind: "int", ans: r, sol: T.lo_s2(a, b, a ^ b, a & b) }; }
  const x = R.int(1, 7), y = R.int(1, 7), s = x + y;
  return { q: T.lo_q3(x.toString(2).padStart(4, "0"), y.toString(2).padStart(4, "0")), kind: "text", ans: [s.toString(2).padStart(4, "0"), s.toString(2)], sol: T.lo_s3(x, y, s) };
});
def("inf12.automata", (R, S) => {
  const T = S.inf12, len = R.int(3, 7); let w = ""; for (let i = 0; i < len; i++) w += R.pick(["0", "1"]);
  const k = R.int(0, 1), ok = k === 0 ? w.endsWith("0") : (w.split("1").length - 1) % 2 === 0;
  return { q: k === 0 ? T.au_q1(w) : T.au_q2(w), kind: "choice", opts: [T.acepta, T.rechaza], correct: ok ? 0 : 1, shuffle: false, sol: k === 0 ? T.au_s1(w, ok) : T.au_s2(w, ok) };
});
def("inf12.rsa", (R, S) => {
  const T = S.inf12, k = R.int(0, 2);
  if (k === 0) { const [p, q] = R.pick([[3, 11], [5, 11], [3, 7], [5, 7], [7, 11], [5, 13]]); return R.int(0, 1) ? { q: T.rs_q1(p, q), kind: "int", ans: p * q, sol: T.rs_s1(p, q) } : { q: T.rs_q2(p, q), kind: "int", ans: (p - 1) * (q - 1), sol: T.rs_s2(p, q) }; }
  if (k === 1) { const a = R.int(20, 200), n = R.int(5, 13); return { q: T.rs_q3(a, n), kind: "int", ans: a % n, sol: T.rs_s3(a, n) }; }
  const [n, e] = R.pick([[55, 3], [33, 3], [35, 5], [77, 7]]), m = R.int(2, 9), c = modpow(m, e, n);
  return { q: T.rs_q4(m, e, n), kind: "int", ans: c, sol: T.rs_s4(m, e, n, c) };
});
def("inf12.metricas", (R, S) => {
  const T = S.inf12, k = R.int(0, 1), vp = R.pick([20, 30, 36, 40, 45, 60]);
  if (k === 0) { const fp = R.pick([5, 10, 15, 20].filter(x => (vp * 100) % (vp + x) === 0)); if (fp === undefined) return { q: T.me_q1(30, 10), kind: "int", ans: 75, sol: T.me_s1(30, 10, 75) };
    return { q: T.me_q1(vp, fp), kind: "int", ans: vp * 100 / (vp + fp), sol: T.me_s1(vp, fp, vp * 100 / (vp + fp)) }; }
  const fn = R.pick([5, 10, 15, 20, 40].filter(x => (vp * 100) % (vp + x) === 0)); if (fn === undefined) return { q: T.me_q2(30, 20), kind: "int", ans: 60, sol: T.me_s2(30, 20, 60) };
  return { q: T.me_q2(vp, fn), kind: "int", ans: vp * 100 / (vp + fn), sol: T.me_s2(vp, fn, vp * 100 / (vp + fn)) };
});
})();
