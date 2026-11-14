/* WikiAula — Informática, Grado 9: diccionarios, archivos, pruebas, redes, SQL, criptografía, contraseñas y estadística.
   Textos y bancos en i18n/<lang>/inf9.js (S.inf9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = lines => `<pre>${lines.map(esc).join("\n")}</pre>`;
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

def("inf9.arch", (R, S) => B.mixed(S.inf9.arch, R));
def("inf9.test", (R, S) => B.mixed(S.inf9.test, R));
def("inf9.capa", (R, S) => B.mixed(S.inf9.capa, R));
def("inf9.proto", (R, S) => B.mixed(S.inf9.proto, R));
def("inf9.bd", (R, S) => B.mixed(S.inf9.bd, R));
def("inf9.ataque", (R, S) => B.mixed(S.inf9.ataque, R));
def("inf9.sesgo", (R, S) => B.mixed(S.inf9.sesgo, R));

def("inf9.dict", (R, S) => {
  const T = S.inf9, names = R.shuffle(T.names.slice()).slice(0, 3), vals = names.map(() => R.int(4, 9)), add = R.pick(T.names.filter(n => !names.includes(n))), inc = R.int(1, 2);
  const lines = [`notas = {${names.map((n, i) => `"${n}": ${vals[i]}`).join(", ")}}`, `notas["${add}"] = ${R.int(5, 9)}`, `notas["${names[0]}"] += ${inc}`];
  if (R.int(0, 1)) return { q: T.di_q(code([...lines, `print(notas["${names[0]}"])`])), kind: "int", ans: vals[0] + inc, sol: T.di_s1(vals[0], inc) };
  return { q: T.di_q(code([...lines, "print(len(notas))"])), kind: "int", ans: 4, sol: T.di_s2() };
});
def("inf9.freq", (R, S) => {
  const T = S.inf9, words = [], n = R.int(6, 10); for (let i = 0; i < n; i++) words.push(R.pick(T.ws));
  const w = R.pick(words), k = words.filter(x => x === w).length;
  return { q: T.fr_q(words.join(" "), w), kind: "int", ans: k, sol: T.fr_s(w, k) };
});
def("inf9.csv", (R, S) => {
  const T = S.inf9, rows = [], n = R.int(3, 5); for (let i = 0; i < n; i++) rows.push([R.pick(T.prods), R.int(1, 12)]);
  const t = rows.reduce((a, r) => a + r[1], 0);
  return { q: T.cs_q(code(["producto,cantidad", ...rows.map(r => `${r[0]},${r[1]}`)])), kind: "int", ans: t, sol: T.cs_s(rows.map(r => r[1]), t) };
});
def("inf9.ip", (R, S) => {
  const T = S.inf9, k = R.int(0, 1);
  if (k === 0) { const n = R.pick([24, 25, 26, 27, 28, 29, 30, 23, 22]); return { q: T.ip_q1(n), kind: "int", ans: Math.pow(2, 32 - n) - 2, sol: T.ip_s1(n) }; }
  const ok = R.int(0, 1), parts = [R.int(1, 223), R.int(0, 255), R.int(0, 255), R.int(1, 254)];
  if (!ok) parts[R.int(0, 3)] = R.int(256, 400);
  return { q: T.ip_q2(parts.join(".")), kind: "choice", opts: [T.si, T.no], correct: ok ? 0 : 1, shuffle: false, sol: T.ip_s2(ok) };
});
def("inf9.red", (R, S) => {
  const T = S.inf9, [svc, port] = R.pick(T.ports), c = choice(R, String(port), T.ports.filter(p => p[1] !== port).map(p => String(p[1])).slice(0, 3));
  return { q: T.pt_q(svc), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.pt_s(svc, port) };
});
def("inf9.sql", (R, S) => {
  const T = S.inf9, rows = R.shuffle(T.libros.slice()).slice(0, 6), y = R.pick([1950, 1970, 1985, 2000]), k = R.int(0, 1);
  const tab = rows.map(r => `(${r[0]}, ${r[1]}, ${r[2]} €)`).join(" ");
  if (k === 0) { const c = rows.filter(r => r[1] > y).length; return { q: T.sq_q1(tab, y), kind: "int", ans: c, sol: T.sq_s1(y, c) }; }
  const p = R.pick([8, 10, 12]), c = rows.filter(r => r[2] < p).length;
  return { q: T.sq_q2(tab, p), kind: "int", ans: c, sol: T.sq_s2(p, c) };
});
def("inf9.cesar", (R, S) => {
  const T = S.inf9, w = R.pick(T.palabras), k = R.int(1, 5), enc = [...w].map(c => ABC[(ABC.indexOf(c) + k) % 26]).join("");
  if (R.int(0, 1)) return { q: T.ce_q1(w, k), kind: "text", ans: enc, sol: T.ce_s(w, enc, k) };
  return { q: T.ce_q2(enc, k), kind: "text", ans: w, sol: T.ce_s(enc, w, -k) };
});
def("inf9.fuerza", (R, S) => {
  const T = S.inf9, k = R.int(0, 1);
  if (k === 0) { const bits = R.pick([8, 10, 16, 20]); return { q: T.fu_q1(bits), kind: "int", ans: Math.pow(2, bits), sol: T.fu_s1(bits) }; }
  const n = R.int(2, 4), per = R.pick([10, 100, 1000]), t = Math.pow(26, n) / per;
  if (!Number.isInteger(t)) return { q: T.fu_q1(12), kind: "int", ans: 4096, sol: T.fu_s1(12) };
  return { q: T.fu_q2(n, per), kind: "int", ans: t, sol: T.fu_s2(n, per, t) };
});
def("inf9.entropia", (R, S) => {
  const T = S.inf9, [nm, bitsPer] = R.pick(T.alfab), L = R.int(4, 16);
  return { q: T.en_q(L, nm, Math.pow(2, bitsPer)), kind: "int", ans: L * bitsPer, sol: T.en_s(L, bitsPer) };
});
def("inf9.clave", (R, S) => {
  const T = S.inf9, opts = R.shuffle(T.claves.slice()).slice(0, 4), best = opts.slice().sort((a, b) => b[1] - a[1])[0];
  return { q: T.cl_q, kind: "choice", opts: opts.map(o => o[0]), correct: opts.indexOf(best), shuffle: false, sol: T.cl_s(best[0]) };
});
def("inf9.estad", (R, S) => {
  const T = S.inf9, n = R.pick([5, 7]), xs = []; for (let i = 0; i < n; i++) xs.push(R.int(1, 12));
  const k = R.int(0, 2), sorted = xs.slice().sort((a, b) => a - b);
  if (k === 0) { const s = xs.reduce((a, b) => a + b, 0), r = s % n; if (r) xs[0] += n - r; const s2 = xs.reduce((a, b) => a + b, 0);
    return { q: T.es_q(xs, T.media), kind: "int", ans: s2 / n, sol: T.es_s1(xs, s2, n) }; }
  if (k === 1) return { q: T.es_q(xs, T.mediana), kind: "int", ans: sorted[(n - 1) / 2], sol: T.es_s2(sorted) };
  xs[1] = xs[0]; xs[2] = xs[0]; xs[3] = xs[0]; const cnt = {}; xs.forEach(x => { cnt[x] = (cnt[x] || 0) + 1; }); const mode = +Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
  return { q: T.es_q(R.shuffle(xs), T.moda), kind: "int", ans: mode, sol: T.es_s3(mode, cnt[mode]) };
});
})();
