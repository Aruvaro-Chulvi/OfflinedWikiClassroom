/* WikiAula — Informática, Grado 6: búsqueda y ordenación, funciones, listas, hoja de cálculo, bases de datos, robótica, IA y seguridad.
   Textos y bancos en i18n/<lang>/inf6.js (S.inf6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };
const distinct = (R, n, a, b) => { const s = new Set(); while (s.size < n) s.add(R.int(a, b)); return R.shuffle([...s]); };

def("inf6.pc", (R, S) => B.mixed(S.inf6.pc, R));
def("inf6.juego", (R, S) => B.mixed(S.inf6.juego, R));
def("inf6.bd", (R, S) => B.mixed(S.inf6.bd, R));
def("inf6.sensor", (R, S) => B.mixed(S.inf6.sensor, R));
def("inf6.ia", (R, S) => B.mixed(S.inf6.ia, R));
def("inf6.ciber", (R, S) => B.mixed(S.inf6.ciber, R));
def("inf6.identidad", (R, S) => B.mixed(S.inf6.identidad, R));

def("inf6.busca", (R, S) => {
  const T = S.inf6, k = R.int(0, 1);
  if (k === 0) { const xs = distinct(R, R.int(5, 8), 1, 30), i = R.int(0, xs.length - 1); return { q: T.bu_q1(xs, xs[i]), kind: "int", ans: i + 1, sol: T.bu_s1(xs, i) }; }
  const n = R.pick([3, 7, 15, 31, 63, 100, 127, 255, 1000]), steps = Math.ceil(Math.log2(n + 1));
  return { q: T.bu_q2(n), kind: "int", ans: steps, sol: T.bu_s2(n, steps) };
});
def("inf6.ordena", (R, S) => {
  const T = S.inf6, xs = distinct(R, R.int(4, 5), 1, 9), k = R.int(0, 2);
  if (k === 0) { const a = xs.slice(); for (let i = 0; i < a.length - 1; i++) if (a[i] > a[i + 1]) { const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; }
    return { q: T.or_q1(xs), kind: "text", ans: [a.join(" "), a.join(", "), a.join(",")], sol: T.or_s1(a) }; }
  if (k === 1) { let sw = 0; for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) if (xs[i] > xs[j]) sw++;
    return { q: T.or_q2(xs), kind: "int", ans: sw, sol: T.or_s2(xs, sw) }; }
  const m = Math.min(...xs), c = choice(R, String(m), xs.filter(x => x !== m).slice(0, 3).map(String));
  return { q: T.or_q3(xs), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.or_s3(m) };
});
def("inf6.func", (R, S) => {
  const T = S.inf6, [name, f, txt] = R.pick(T.funcs), k = R.int(0, 2), a = R.int(2, 9), b = R.int(1, 9);
  if (k === 0) return { q: T.fu_q1(name, txt, a), kind: "int", ans: f(a), sol: T.fu_s1(name, a, f(a)) };
  if (k === 1) return { q: T.fu_q2(name, txt, a, b), kind: "int", ans: f(a) + b, sol: T.fu_s2(name, a, f(a), b) };
  const n = R.pick([3, 4, 5, 6, 8, 9, 10, 12]);
  return { q: T.fu_q3(n), kind: "int", ans: 360 / n, sol: T.fu_s3(n) };
});
def("inf6.lista", (R, S) => {
  const T = S.inf6, base = R.shuffle(T.items.slice()).slice(0, R.int(3, 5)), k = R.int(0, 2);
  if (k === 0) { const add = R.pick(T.items.filter(x => !base.includes(x))); return { q: T.li_q1(base, add), kind: "int", ans: base.length + 1, sol: T.li_s1(base.length) }; }
  if (k === 1) { const i = R.int(1, base.length); const c = choice(R, base[i - 1], base.filter((x, j) => j !== i - 1).slice(0, 3));
    return { q: T.li_q2(base, i), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.li_s2(i, base[i - 1]) }; }
  const nums = [R.int(2, 9), R.int(2, 9), R.int(2, 9), R.int(2, 9)], s = nums.reduce((x, y) => x + y, 0);
  return { q: T.li_q3(nums), kind: "int", ans: s, sol: T.li_s3(nums, s) };
});
def("inf6.hoja", (R, S) => {
  const T = S.inf6, n = R.int(4, 5), f = R.pick(["SUMA", "PROMEDIO", "MAX", "MIN", "CONTAR"]);
  let xs = []; for (let i = 0; i < n; i++) xs.push(R.int(1, 20));
  if (f === "PROMEDIO") { const s = xs.reduce((a, b) => a + b, 0), r = s % n; if (r) xs[0] += n - r; }
  const s = xs.reduce((a, b) => a + b, 0), r = { SUMA: s, PROMEDIO: s / n, MAX: Math.max(...xs), MIN: Math.min(...xs), CONTAR: n }[f];
  return { q: T.ho_q(xs, f), kind: "int", ans: r, sol: T.ho_s(xs, f, r) };
});
def("inf6.relativa", (R, S) => {
  const T = S.inf6, c1 = R.pick(["A", "B"]), c2 = R.pick(["C", "D"]), op = R.pick(["+", "*", "-"]), r0 = R.int(1, 3), r1 = r0 + R.int(1, 6);
  const right = `=${c1}${r1}${op}${c2}${r1}`, c = choice(R, right, [`=${c1}${r0}${op}${c2}${r0}`, `=${c1}${r1}${op}${c2}${r0}`, `=${c1}${r0 + 1}${op}${c2}${r0 + 1}`].filter(x => x !== right).slice(0, 3));
  return { q: T.re_q(`=${c1}${r0}${op}${c2}${r0}`, r0, r1), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.re_s(right) };
});
def("inf6.filtro", (R, S) => {
  const T = S.inf6, rows = [], n = R.int(6, 8);
  for (let i = 0; i < n; i++) rows.push([R.pick(T.gen), R.int(2000, 2024)]);
  const g = R.pick(T.gen), y = R.pick([2005, 2010, 2015, 2018]), k = rows.filter(r => r[0] === g && r[1] > y).length;
  return { q: T.fi_q(rows, g, y), kind: "int", ans: k, sol: T.fi_s(g, y, k) };
});
def("inf6.robot", (R, S) => {
  const T = S.inf6, [sen, act, lim, op, hi] = R.pick(T.reglas), v = R.int(0, hi), on = op === "<" ? v < lim : v > lim;
  return { q: T.ro_q(sen, op, lim, act, v), kind: "choice", opts: [T.si, T.no], correct: on ? 0 : 1, shuffle: false, sol: T.ro_s(v, op, lim, on) };
});
def("inf6.pin", (R, S) => {
  const T = S.inf6, k = R.int(0, 1);
  if (k === 0) { const n = R.int(2, 6); return { q: T.pi_q1(n), kind: "int", ans: Math.pow(10, n), sol: T.pi_s1(n) }; }
  const n = R.int(2, 3); return { q: T.pi_q2(n), kind: "int", ans: Math.pow(26, n), sol: T.pi_s2(n) };
});
})();
