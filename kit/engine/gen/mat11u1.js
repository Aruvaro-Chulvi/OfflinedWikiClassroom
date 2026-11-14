/* WikiAula — Matemáticas, Grado 11 · Unidad 1: Números reales.
   Textos: i18n/<lang>/mat11u1.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, factorize, gcd } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;

// ── Intervalos y valor absoluto ───────────────────────────────────────
function ivl(a, b, ca, cb) { // a, b pueden ser ±Infinity
  const L = a === -Infinity ? "(−∞" : (ca ? "[" : "(") + neg(a);
  const Rr = b === Infinity ? "+∞)" : neg(b) + (cb ? "]" : ")");
  return `${L}, ${Rr}`;
}
function choice4(R, ok, alts) {   // la buena y hasta tres distractores distintos de ella
  const seen = [ok];
  for (const s of R.shuffle(alts)) { if (seen.length === 4) break; if (s && !seen.includes(s)) seen.push(s); }
  if (seen.length < 3) return null;
  const opts = R.shuffle(seen);
  return { kind: "choice", opts, correct: opts.indexOf(ok) };
}
// Intervalos: traducir con el porqué de cada extremo, intersección (también ∅), unión y entornos (también el reducido).
def("m11.re.intervalo", (R, S, H) => {
  const T = S.m11.iv_t, k = R.pick([0, 0, 1, 1, 2, 3]);
  if (k === 0) {
    const a = R.int(-9, 5), b = a + R.int(1, 9), t = R.int(0, 3), ca = R.r() < 0.5, cb = R.r() < 0.5;
    let d, ok, alts, parts;
    if (t <= 1) { d = `${neg(a)} ${ca ? "≤" : "&lt;"} x ${cb ? "≤" : "&lt;"} ${neg(b)}`; ok = ivl(a, b, ca, cb); alts = [ivl(a, b, !ca, cb), ivl(a, b, ca, !cb), ivl(a, b, !ca, !cb)]; parts = [T.ext(neg(a), ca), T.ext(neg(b), cb)]; }
    else if (t === 2) { d = `x ${ca ? "≥" : "&gt;"} ${neg(a)}`; ok = ivl(a, Infinity, ca); alts = [ivl(a, Infinity, !ca), ivl(-Infinity, a, false, ca), ivl(-Infinity, a, false, !ca)]; parts = [T.ext(neg(a), ca), T.inf]; }
    else { d = `x ${cb ? "≤" : "&lt;"} ${neg(b)}`; ok = ivl(-Infinity, b, false, cb); alts = [ivl(-Infinity, b, false, !cb), ivl(b, Infinity, cb), ivl(b, Infinity, !cb)]; parts = [T.ext(neg(b), cb), T.inf]; }
    const c = choice4(R, ok, alts);
    return c && Object.assign({ q: S.m11.int_q(d), sol: S.m11.int_s(ok, parts.join(" ")) }, c);
  }
  if (k <= 2) {
    // A y B acotados con extremos al azar; en la intersección a veces no se tocan (∅); en la unión siempre se solapan
    let A, B, lo, hi, loI, hiI, t = 0;
    const bad = () => lo === hi || (A[0] === B[0] && A[2] === B[2]) || (k === 2 && lo > hi) || A[2] === B[0] || B[2] === A[0];
    do {
      const a1 = R.int(-6, 3), b1 = a1 + R.int(2, 6), a2 = R.int(a1 - 3, b1 + (k === 1 ? 2 : -1)), b2 = a2 + R.int(2, 6);
      A = [a1, R.r() < 0.5, b1, R.r() < 0.5]; B = [a2, R.r() < 0.5, b2, R.r() < 0.5];
      lo = Math.max(A[0], B[0]); loI = A[0] > B[0] ? A[1] : B[0] > A[0] ? B[1] : A[1] && B[1];
      hi = Math.min(A[2], B[2]); hiI = A[2] < B[2] ? A[3] : B[2] < A[2] ? B[3] : A[3] && B[3];
      t++;
    } while (t < 60 && bad());
    if (bad()) return null;
    const sA = ivl(A[0], A[2], A[1], A[3]), sB = ivl(B[0], B[2], B[1], B[3]);
    if (k === 1) {
      if (lo > hi) {
        const c = choice4(R, "∅", [ivl(hi, lo, true, true), ivl(Math.min(A[0], B[0]), Math.max(A[2], B[2]), true, true), sA, sB]);
        return c && Object.assign({ q: T.q1(sA, sB, "∩"), sol: T.s1v(A[2] < B[0] ? "A" : "B", neg(hi), neg(lo)) }, c);
      }
      const ok = ivl(lo, hi, loI, hiI);
      const c = choice4(R, ok, [ivl(lo, hi, !loI, hiI), ivl(lo, hi, loI, !hiI), ivl(Math.min(A[0], B[0]), Math.max(A[2], B[2]), A[0] < B[0] ? A[1] : B[1], A[2] > B[2] ? A[3] : B[3]), "∅"]);
      return c && Object.assign({ q: T.q1(sA, sB, "∩"), sol: T.s1(neg(lo), loI, neg(hi), hiI, ok) }, c);
    }
    const L = Math.min(A[0], B[0]), LI = A[0] < B[0] ? A[1] : B[0] < A[0] ? B[1] : A[1] || B[1];
    const U = Math.max(A[2], B[2]), UI = A[2] > B[2] ? A[3] : B[2] > A[2] ? B[3] : A[3] || B[3];
    const ok = ivl(L, U, LI, UI);
    const c = choice4(R, ok, [ivl(L, U, !LI, UI), ivl(L, U, LI, !UI), ivl(lo, hi, loI, hiI)]);
    return c && Object.assign({ q: T.q1(sA, sB, "∪"), sol: T.s2(neg(L), LI, neg(U), UI, ok) }, c);
  }
  // entornos: E(c, r) y el reducido E*(c, r)
  const c = R.int(-5, 6), r = R.int(1, 6), red = R.r() < 0.5;
  const plain = ivl(c - r, c + r, false, false);
  if (!red) return Object.assign({ q: T.q3(`E(${neg(c)}, ${r})`), sol: T.s3(neg(c), r, neg(c - r), neg(c + r), plain) },
    choice4(R, plain, [ivl(c - r, c + r, true, true), ivl(c, c + r, false, false), ivl(c - 2 * r, c + 2 * r, false, false)]));
  const ok = `${ivl(c - r, c, false, false)} ∪ ${ivl(c, c + r, false, false)}`;
  return Object.assign({ q: T.q3(`E*(${neg(c)}, ${r})`), sol: T.s3r(neg(c), r, neg(c - r), neg(c + r), ok) },
    choice4(R, ok, [plain, `${ivl(c - r, c, true, false)} ∪ ${ivl(c, c + r, false, true)}`, `${ivl(c - r, c, false, true)} ∪ ${ivl(c, c + r, true, false)}`]));
});
def("m11.re.absoluto", (R, S, H) => {
  const a = R.int(-6, 6), r = R.int(1, 7), sa = a < 0 ? `x + ${-a}` : a ? `x − ${a}` : "x";
  const k = R.int(0, 2);
  if (k === 0) return { q: S.m11.abs_q(`|${sa}| = ${r}`), kind: "set", ans: [a - r, a + r], hint: S.m11.abs_hint,
    sol: S.m11.abs_eq_s(sa, neg(a), r, neg(a - r), neg(a + r)) + ` Soluciones: <b>${neg(a - r)}, ${neg(a + r)}</b>.` };
  const lt = k === 1, eq = R.r() < 0.5;   // «≤» o «≥» la mitad de las veces
  const two = (c1, c2) => `${ivl(-Infinity, a - r, false, c1)} ∪ ${ivl(a + r, Infinity, c2)}`;
  const ok = lt ? ivl(a - r, a + r, eq, eq) : two(eq, eq);
  const alts = lt ? [ivl(a - r, a + r, !eq, !eq), two(eq, eq), ivl(-r, r, eq, eq)]
    : [ivl(a - r, a + r, eq, eq), two(!eq, !eq), `${ivl(-Infinity, -r, false, eq)} ∪ ${ivl(r, Infinity, eq)}`];
  const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 4));
  const op = lt ? (eq ? "≤" : "&lt;") : (eq ? "≥" : "&gt;");
  return { q: S.m11.abs_q(`|${sa}| ${op} ${r}`), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.abs_in_s(sa, neg(a), r, neg(a - r), neg(a + r), ok, lt, eq) };
});
// |mx + b| con coeficiente (lo nuevo de 1.º): <, ≤, >, ≥ por el método algebraico; a veces el coeficiente es
// negativo (las desigualdades cambian de sentido) y a veces el segundo miembro es negativo (∅ o toda la recta).
def("m11.re.inecabs", (R, S, H) => {
  const T = S.m11.ia_t, a = R.pick([2, 2, 3, 3, 4, 5]), sg = R.r() < 0.3 ? -1 : 1, m = sg * a;
  let x1, x2, b, r, t = 0;
  const bad = () => !Number.isInteger(b) || !Number.isInteger(r) || !b || (sg < 0 && b < 0);
  do { x1 = R.int(-6, 4); x2 = x1 + R.int(1, 6); b = sg > 0 ? -a * (x1 + x2) / 2 : a * (x1 + x2) / 2; r = a * (x2 - x1) / 2; t++; } while (t < 80 && bad());
  if (bad()) return null;
  const mx = `${m < 0 ? "−" : ""}${a}x`, A = sg > 0 ? `${mx} ${b < 0 ? "−" : "+"} ${Math.abs(b)}` : `${b} − ${a}x`;
  const lt = R.r() < 0.5, eq = R.r() < 0.5, OP = lt ? (eq ? "≤" : "&lt;") : (eq ? "≥" : "&gt;");
  const flip = o => ({ "&lt;": "&gt;", "&gt;": "&lt;", "≤": "≥", "≥": "≤" })[o];
  const two = e => `${ivl(-Infinity, x1, false, e)} ∪ ${ivl(x2, Infinity, e)}`;
  if (R.r() < 0.15) {   // segundo miembro negativo: ningún número o todos
    const rr = -R.int(1, 5), ok = lt ? "∅" : "(−∞, +∞)";
    const c = choice4(R, ok, [lt ? "(−∞, +∞)" : "∅", ivl(x1, x2, eq, eq), two(eq)]);
    return c && Object.assign({ q: T.q(`|${A}| ${OP} ${neg(rr)}`), sol: lt ? T.none(neg(rr)) : T.all(neg(rr)) }, c);
  }
  const ok = lt ? ivl(x1, x2, eq, eq) : two(eq);
  const L = -r - b, U = r - b, sub = b > 0 ? T.minus(b) : T.plus(-b), dv = v => neg(v / m);
  let sol;
  if (lt) {
    const after = m > 0 ? `${dv(L)} ${OP} x ${OP} ${dv(U)}` : `${dv(L)} ${flip(OP)} x ${flip(OP)} ${dv(U)}, ${T.es} ${dv(U)} ${OP} x ${OP} ${dv(L)}`;
    sol = T.slt(A, OP, r, `${neg(L)} ${OP} ${mx} ${OP} ${neg(U)}`, sub, neg(m), m < 0, after, ok);
  } else {
    const oL = flip(OP);
    const p1 = `${A} ${oL} ${neg(-r)} → ${mx} ${oL} ${neg(L)} → x ${m > 0 ? oL : OP} ${dv(L)}`;
    const p2 = `${A} ${OP} ${r} → ${mx} ${OP} ${neg(U)} → x ${m > 0 ? OP : oL} ${dv(U)}`;
    sol = T.sgt(A, OP, oL, r, p1, p2, m < 0, ok);
  }
  const lo2 = Math.min(L, U), hi2 = Math.max(L, U);   // error típico: no dividir entre el coeficiente
  const c = choice4(R, ok, [lt ? ivl(x1, x2, !eq, !eq) : two(!eq), lt ? two(eq) : ivl(x1, x2, eq, eq),
    lt ? ivl(lo2, hi2, eq, eq) : `${ivl(-Infinity, lo2, false, eq)} ∪ ${ivl(hi2, Infinity, eq)}`]);
  return c && Object.assign({ q: T.q(`|${A}| ${OP} ${r}`), sol }, c);
});

// ── Radicales ─────────────────────────────────────────────────────────
const SQF = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
const SUPN = n => n > 1 ? `<sup>${n}</sup>` : "";
// Extraer factores: raíz cuadrada (70 %) o cúbica (30 %), con la descomposición agrupada por parejas (o tríos).
def("m11.re.extraer", (R, S, H) => {
  const cube = R.r() < 0.3, idx = cube ? 3 : 2;
  let a, b; do { a = cube ? R.int(2, 4) : R.int(2, 8); b = cube ? R.pick([2, 3, 4, 5, 6, 7, 9, 10]) : R.pick(SQF); } while (a ** idx * b > 640);   // radicando ≤ 640
  const n = a ** idx * b;
  const f = factorize(n), ps = Object.keys(f).map(Number).sort((p, q) => p - q);
  const fs = ps.map(p => `${p}${SUPN(f[p])}`).join(" · ");
  const grp = [...ps.filter(p => f[p] >= idx).map(p => `${p}${SUPN(idx * Math.floor(f[p] / idx))}`), ...ps.filter(p => f[p] % idx).map(p => `${p}${SUPN(f[p] % idx)}`)].join(" · ");
  const outs = ps.filter(p => f[p] >= idx).map(p => `${p}${SUPN(Math.floor(f[p] / idx))}`), ins = ps.filter(p => f[p] % idx).map(p => `${p}${SUPN(f[p] % idx)}`);
  const r = cube ? "∛" : "√";
  return { q: S.m11.rad_q(`${r}${n}`, cube), kind: "fields", fields: [{ label: S.m11.rad_f[0], ans: a }, { label: S.m11.rad_f[1], ans: b }],
    sol: S.m11.rad_s(r, n, fs, grp === fs ? null : grp, cube, outs.join(" · "), a, ins.join(" · "), b) };
});
// Sumar radicales: se extraen factores, se sustituye y se suman los coeficientes (sin «1√»).
def("m11.re.sumarad", (R, S, H) => {
  const b = R.pick([2, 3, 5]), n = R.int(2, 3);
  let ks, k;   // al menos dos radicandos distintos (hay que extraer factores) y resultado distinto de 0
  do { ks = Array.from({ length: n }, () => [rnz(R, -5, 6), R.int(1, 4)]); k = ks.reduce((s, [c, m]) => s + c * m, 0); } while (!k || new Set(ks.map(([, m]) => m)).size < 2);
  const co = (c, i) => (i ? (c < 0 ? " − " : " + ") : (c < 0 ? "−" : "")) + (Math.abs(c) === 1 ? "" : Math.abs(c));
  const terms = ks.map(([c, m], i) => `${co(c, i)}√${m * m * b}`).join("");
  const ext = [...new Set(ks.filter(([, m]) => m > 1).map(([, m]) => m))].sort((x, y) => x - y).map(m => `√${m * m * b} = √(${m * m} · ${b}) = ${m}√${b}`).join("; ");
  const sub = ks.map(([c, m], i) => m === 1 || Math.abs(c) === 1 ? `${co(c * m, i)}√${b}` : `${co(c, i)} · ${m}√${b}`).join("");
  const simp = ks.map(([c, m], i) => `${co(c * m, i)}√${b}`).join("");
  const sum = ks.map(([c, m], i) => i ? (c * m < 0 ? " − " : " + ") + Math.abs(c * m) : neg(c * m)).join("");
  return { q: S.m11.radsum_q(terms), kind: "fields", fields: [{ label: S.m11.radsum_f(b)[0], ans: k }],
    sol: S.m11.radsum_s(ext, sub === simp ? simp : `${sub} = ${simp}`, sum, neg(k), `${co(k, 0)}√${b}`) };
});
// Racionalizar: a/√b (simplificando) o 1/(c ± √b) con el conjugado; denominador negativo pasado arriba,
// sin «/1» y sin dos opciones que valgan lo mismo.
function choiceVal(R, ok, v, alts) {
  const seen = [ok], vals = [v];
  for (const [s, x] of R.shuffle(alts)) {
    if (seen.length === 4) break;
    if (!isFinite(x) || seen.includes(s) || vals.some(y => Math.abs(y - x) < 1e-9)) continue;
    seen.push(s); vals.push(x);
  }
  if (seen.length < 3) return null;
  const opts = R.shuffle(seen);
  return { kind: "choice", opts, correct: opts.indexOf(ok) };
}
def("m11.re.racionalizar", (R, S, H) => {
  const k = R.int(0, 1);
  if (k === 0) {
    const a = R.int(1, 12), b = R.pick(SQF), g = gcd(a, b), num = a / g, den = b / g, sb = Math.sqrt(b);
    const rt = (c, r) => `${c === 1 ? "" : c}√${r}`;
    const ok = den === 1 ? rt(num, b) : `${rt(num, b)}/${den}`;
    const c = choiceVal(R, ok, a / sb, [[`${rt(a, b)}/${b * b}`, a * sb / (b * b)], [`√${b}/${a}`, sb / a], [`${a}/${b}`, a / b], [rt(a, b), a * sb]]);
    if (!c) return null;
    const st = `${H.frac(rt(a, b), `√${b} · √${b}`)} = ${H.frac(rt(a, b), b)}`;
    return Object.assign({ q: S.m11.racio_q(H.frac(a, "√" + b)), sol: S.m11.racio_s[0](b, st, g > 1 ? g : 0, ok) }, c);
  }
  const b = R.pick([2, 3, 5, 6, 7]), c = R.int(1, 3);
  if (c * c === b) return null;
  const d = c * c - b, plus = R.r() < 0.5, s = plus ? 1 : -1, sb = Math.sqrt(b);
  const den = `${c} ${plus ? "+" : "−"} √${b}`, conj = `${c} ${plus ? "−" : "+"} √${b}`, D = Math.abs(d);
  const over = (E, n) => n === 1 ? E : `(${E})/${n}`;
  let ok;
  if (d > 0) ok = over(conj, d);
  else if (plus) ok = over(`√${b} − ${c}`, D);
  else ok = `−${D === 1 ? `(${conj})` : `(${conj})/${D}`}`;
  const v = 1 / (c + s * sb);
  const ch = choiceVal(R, ok, v, [
    [over(conj, c * c + b), (c - s * sb) / (c * c + b)],
    [over(den, D), (c + s * sb) / D],
    [over(conj, D), (c - s * sb) / D],
    [over(conj, b), (c - s * sb) / b]]);
  if (!ch) return null;
  const st = `${H.frac(conj, `(${den})(${conj})`)} = ${H.frac(conj, `${c}² − (√${b})²`)} = ${H.frac(conj, d < 0 ? neg(d) : d)}`;
  return Object.assign({ q: S.m11.racio_q(H.frac(1, den)), sol: S.m11.racio_s[1](conj, st, d, ok) }, ch);
});

// ── Logaritmos ────────────────────────────────────────────────────────
def("m11.re.log", (R, S, H) => {
  const b = R.pick([2, 3, 5, 10, 2, 3]);
  let e; do e = R.int(-3, b === 2 ? 7 : 4); while ((e === 0 || e === 1) && R.r() < 0.6);   // pocos triviales (log 1, log b)
  const x = b ** e;
  const xs = e >= 0 ? H.n(x) : (b === 10 ? H.dec(x, 6) : H.frac(1, b ** -e));
  const name = b === 10 ? "log" : `log<sub>${b}</sub>`;
  return { q: S.m11.log_q(`${name} ${xs}`), kind: "int", ans: e, sol: S.m11.log_s(b, xs, neg(e)) };
});
def("m11.re.logprop", (R, S, H) => {
  // [expresión, descomposición, sustitución, valor en milésimas (log 2 = 301, log 3 = 477, log 10 = 1000)]
  const cases = [
    ["log 6", "log(2 · 3) = log 2 + log 3", "0,301 + 0,477", 778], ["log 12", "log(2² · 3) = 2 log 2 + log 3", "2 · 0,301 + 0,477", 1079],
    ["log 18", "log(2 · 3²) = log 2 + 2 log 3", "0,301 + 2 · 0,477", 1255], ["log 5", "log(10/2) = log 10 − log 2 = 1 − log 2", "1 − 0,301", 699],
    ["log 1,5", "log(3/2) = log 3 − log 2", "0,477 − 0,301", 176], ["log 0,2", "log(2/10) = log 2 − log 10 = log 2 − 1", "0,301 − 1", -699],
    ["log √3", "log 3<sup>1/2</sup> = ½ log 3", "0,477 : 2 = 0,2385", 238.5], ["log 72", "log(2³ · 3²) = 3 log 2 + 2 log 3", "3 · 0,301 + 2 · 0,477", 1857],
    ["log 15", "log(3 · 10/2) = log 3 + log 10 − log 2", "0,477 + 1 − 0,301", 1176], ["log 8", "log 2³ = 3 log 2", "3 · 0,301", 903],
    ["log ∛2", "log 2<sup>1/3</sup> = ⅓ log 2", "0,301 : 3 = 0,1003…", 100.33], ["log 4,5", "log(9/2) = 2 log 3 − log 2", "2 · 0,477 − 0,301", 653],
  ];
  const [e, dec, sub, m] = R.pick(cases), r = Math.round(m) / 1000;
  const loc = s => WA.H.esn(s).replace(/ : /g, ` ${H.div} `);   // los datos están escritos a la española
  const r3 = (r < 0 ? "−" : "") + Math.abs(r).toFixed(3).replace(".", WA.H.ds);   // siempre tres decimales: 0,100
  return { q: S.m11.logp_q(loc(e), loc("log 2 ≈ 0,301 y log 3 ≈ 0,477")), kind: "num", ans: r, tol: 0.0015, sol: S.m11.logp_s(loc(`${e} = ${dec}`), loc(sub), r3) };
});
def("m11.re.logecuacion", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { // log_b(x) = c
    const b = R.pick([2, 3, 5, 10]), c = R.int(1, b === 2 ? 6 : 3), x = b ** c;
    return { q: S.m11.logeq_q(`${b === 10 ? "log" : `log<sub>${b}</sub>`} x = ${c}`), kind: "int", ans: x, sol: S.m11.logeq_s(`Por definición de logaritmo, x = ${b}<sup>${c}</sup> = <b>${H.n(x)}</b>.`) };
  }
  if (k === 1) { // b^(x + m) = b^n
    const b = R.pick([2, 3, 5]), n = R.int(2, b === 2 ? 7 : 4), m = R.int(-3, 3), x = n - m;
    return { q: S.m11.logeq_q(`${b}<sup>x${m ? (m < 0 ? " − " + -m : " + " + m) : ""}</sup> = ${H.n(b ** n)}`), kind: "int", ans: x,
      sol: S.m11.logeq_s(`${H.n(b ** n)} = ${b}<sup>${n}</sup>. Igualamos exponentes: ${m ? `x${m < 0 ? " − " + -m : " + " + m} = ${n} → <b>x = ${neg(x)}</b>` : `<b>x = ${n}</b>`}.`) };
  }
  // log x + log(x + k) = log c: segundo grado, con una raíz negativa que se descarta
  const j = R.int(1, 6), x = R.int(1, 8), c = x * (x + j), o = x + j, kx = j === 1 ? "x" : `${j}x`;
  return { q: S.m11.logeq_q(`log x + log(x + ${j}) = log ${c}`), kind: "int", ans: x,
    sol: S.m11.logeq_s(S.m11.logeq_disc(`log[x(x + ${j})] = log ${c} → x² + ${kx} = ${c} → x² + ${kx} − ${c} = 0 → x = ${x} o x = −${o}`, o, x)) };
});
// ── Lo nuevo de 1.º: logaritmos fraccionarios, ecuaciones con logaritmos y sistemas ──
const F = WA.MATH.F;
const fr = q => q[1] === 1 ? neg(q[0]) : `${q[0] < 0 ? "−" : ""}${Math.abs(q[0])}/${q[1]}`;
const SUPU = n => (n < 0 ? "⁻" : "") + String(Math.abs(n)).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");
const rt = (n, x) => n === 2 ? `√${x}` : n === 3 ? `∛${x}` : `${SUPU(n)}√${x}`;
def("m11.re.logfrac", (R, S, H) => {
  const T = S.m11.lf_t, k = R.int(0, 3);
  const nm = b => b === 10 ? "log" : `log<sub>${b}</sub>`;
  const pw = (p, n) => n >= 0 ? H.n(p ** n) : `1/${H.n(p ** -n)}`, pq = (p, n) => n >= 0 ? pw(p, n) : `(${pw(p, n)})`;
  if (k === 0) {   // base potencia de p y argumento potencia de p: log₄ 8 = 3/2
    const p = R.pick([2, 2, 3, 5]), m = p === 2 ? R.pick([2, 3, 4]) : R.pick([2, 3]);
    let n; do n = R.int(-3, p === 2 ? 7 : 4); while (!n || n % m === 0 || p ** Math.abs(n) > 729);
    const q = F.make(n, m);
    return { q: S.m11.log_q(`${nm(p ** m)} ${pq(p, n)}`), kind: "frac", ans: q, sol: T.s0(H.n(p ** m), p, m, pw(p, n), SUPU(n), fr(q)) };
  }
  if (k === 1) {   // base 1/p: log_{1/2} 8 = −3
    const p = R.pick([2, 3, 5]);
    let n; do n = R.int(-3, p === 2 ? 6 : 4); while (!n || n === -1 || p ** Math.abs(n) > 729);
    return { q: S.m11.log_q(`log<sub>1/${p}</sub> ${pq(p, n)}`), kind: "frac", ans: [-n, 1], sol: T.s1(p, pw(p, n), SUPU(n), n, neg(-n)) };
  }
  if (k === 2) {   // argumento con raíz: log₂ √8 = 3/2, log₃ (1/∛9) = −2/3
    const p = R.pick([2, 3, 5, 10]), n = R.pick([2, 2, 3, 3, 4]);
    let m; do m = R.int(1, 2 * n - 1); while (m % n === 0 || p ** m > 1000);
    const inv = R.r() < 0.3, q = F.make(inv ? -m : m, n), rad = rt(n, H.n(p ** m));
    return { q: S.m11.log_q(`${nm(p)} ${inv ? `(1/${rad})` : rad}`), kind: "frac", ans: q,
      sol: T.s2(rad, H.n(p ** m), n, p, `${m}/${n}`, inv, fr(q), `${nm(p)} ${inv ? `(1/${rad})` : rad}`) };
  }
  // logaritmo neperiano: ln e⁴, ln (1/e²), ln √e, ln ∛(e²), ln (e√e)
  const c = R.int(0, 4);
  const cases = [() => { const j = R.int(2, 6); return [`e${SUPU(j)}`, `e${SUPU(j)}`, [j, 1]]; },
    () => { const j = R.int(1, 4); return [`(1/e${j > 1 ? SUPU(j) : ""})`, `e${SUPU(-j)}`, [-j, 1]]; },
    () => { const n = R.pick([2, 3, 4]); return [rt(n, "e"), `e<sup>1/${n}</sup>`, [1, n]]; },
    () => { const n = R.pick([3, 5]), m = R.pick([2, 4].filter(x => x < n)); return [rt(n, `(e${SUPU(m)})`), `e<sup>${m}/${n}</sup>`, F.make(m, n)]; },
    () => ["e√e", "e · e<sup>1/2</sup> = e<sup>3/2</sup>", [3, 2]]];
  const [arg, pow, q] = cases[c]();
  return { q: S.m11.log_q(`ln ${arg}`), kind: "frac", ans: q, sol: T.s3(arg, pow, fr(q)) };
});
// Ecuaciones de 1.º: exponenciales que exigen logaritmos, logarítmicas con un número suelto (y una solución que se
// descarta) y sistemas de ecuaciones logarítmicas.
def("m11.re.ecexplog", (R, S, H) => {
  const T = S.m11.xl_t, k = R.pick([0, 0, 1, 1, 2, 3]);
  const l4 = x => H.dec(Math.log10(x), 4).replace(new RegExp(`[${H.ds}](\\d{1,3})$`), (s, d) => H.ds + d.padEnd(4, "0"));
  if (k === 0) {   // aˣ⁺ᵐ = b sin base común
    const a = R.pick([2, 3, 5, 6, 7]), m = R.r() < 0.4 ? R.pick([-2, -1, 1, 2]) : 0;
    let b; do b = R.int(3, 200); while (Math.abs(Math.log(b) / Math.log(a) - Math.round(Math.log(b) / Math.log(a))) < 1e-9);
    const v = Math.log10(b) / Math.log10(a), x = v - m, xe = m ? `x ${m < 0 ? "−" : "+"} ${Math.abs(m)}` : "x";
    return { q: T.q0(`${a}<sup>${xe}</sup> = ${b}`), kind: "num", ans: Math.round(x * 100) / 100, tol: 0.011,
      sol: T.s0(a, b, m ? `(${xe})` : "x", xe, l4(b), l4(a), H.dec(v, 2), m ? `x ≈ ${H.dec(v, 2)} ${m < 0 ? "+" : "−"} ${Math.abs(m)} = ${H.dec(Math.round(v * 100) / 100 - m, 2)}` : "") };
  }
  if (k === 1) {   // número suelto: log x + log(x ± k) = n, con N = Bⁿ
    const B = R.pick([10, 10, 2]), n = B === 10 ? R.pick([1, 2]) : R.pick([3, 4, 5]), N = B ** n;
    const ds = []; for (let d = 1; d <= N; d++) if (N % d === 0 && d * d !== N && Math.abs(N / d - d) <= 30) ds.push(d);
    const x0 = R.pick(ds), o = N / x0, kk = Math.abs(o - x0), plus = o > x0, nm = B === 10 ? "log" : "log<sub>2</sub>";
    const kx = kk === 1 ? "x" : `${kk}x`, sg = plus ? "+" : "−";
    return { q: S.m11.logeq_q(`${nm} x + ${nm}(x ${sg} ${kk}) = ${n}`), kind: "int", ans: x0,
      sol: T.s1(n, nm, N, `${nm}[x(x ${sg} ${kk})] = ${nm} ${N} → x² ${sg} ${kx} = ${N} → x² ${sg} ${kx} − ${N} = 0 → x = ${x0} o x = −${o}`, o, x0) };
  }
  if (k === 2) {   // cociente: log(x + a) − log(x − b) = 1
    const x0 = R.int(2, 9), b = R.int(1, x0 - 1), a = 9 * x0 - 10 * b;
    if (a < 1) return null;
    return { q: S.m11.logeq_q(`log(x + ${a}) − log(x − ${b}) = 1`), kind: "int", ans: x0, sol: T.s2(a, b, a + 10 * b, x0, x0 + a, x0 - b) };
  }
  // sistema: log x + log y = n, x − y = d   (o log x − log y = 1, x + y = s)
  if (R.r() < 0.3) {
    const y0 = R.int(1, 9), s = 11 * y0;
    return { q: T.q3(`log x − log y = 1`, `x + y = ${s}`), kind: "fields", fields: [{ label: "x", ans: 10 * y0 }, { label: "y", ans: y0 }], sol: T.s3b(s, y0, 10 * y0) };
  }
  const n = R.pick([2, 3, 3]), N = 10 ** n, ps = [];
  for (let y = 2; y * y < N; y++) if (N % y === 0 && N / y - y <= 200) ps.push(y);
  const y0 = R.pick(ps), x0 = N / y0, d = x0 - y0;
  return { q: T.q3(`log x + log y = ${n}`, `x − y = ${d}`), kind: "fields", fields: [{ label: "x", ans: x0 }, { label: "y", ans: y0 }],
    sol: T.s3(n, H.n(N), d, y0, x0) };
});
// Radicales de 1.º: un solo radical con bases distintas, simplificar el índice y operaciones con la misma base.
def("m11.re.indice", (R, S, H) => {
  const T = S.m11.ix_t, k = R.int(0, 2), lcm = (a, b) => a * b / gcd(a, b);
  const sup = SUPU;
  if (k === 0) {   // ⁿ√a · ᵐ√b con bases distintas
    const [n1, n2] = R.pick([[2, 3], [3, 2], [2, 4], [4, 2], [3, 4], [2, 6]]);
    const [a, b] = R.shuffle([2, 3, 5, 7]).slice(0, 2), L = lcm(n1, n2), e1 = L / n1, e2 = L / n2, v = a ** e1 * b ** e2;
    if (v > 5000) return null;
    const ok = rt(L, H.n(v));
    const c = choice4(R, ok, [rt(n1 + n2, a * b), rt(L, a * b), rt(L, H.n(a ** e2 * b ** e1)), rt(n1 * n2 === L ? n1 + n2 : n1 * n2, H.n(v))]);
    const pw = (x, e) => e === 1 ? `${x}` : `${x}${sup(e)}`;
    return c && Object.assign({ q: T.q0(`${rt(n1, a)} · ${rt(n2, b)}`),
      sol: T.s0(n1, n2, L, `${rt(n1, a)} = ${rt(L, pw(a, e1))}`, `${rt(n2, b)} = ${rt(L, pw(b, e2))}`, `${rt(L, `(${pw(a, e1)} · ${pw(b, e2)})`)} = <b>${ok}</b>`) }, c);
  }
  if (k === 1) {   // simplificar el índice: ⁶√8 = √2
    const [p, e, n] = R.pick([[2, 3, 6], [3, 2, 4], [5, 2, 6], [2, 5, 10], [3, 3, 6], [5, 2, 4], [2, 4, 8], [2, 2, 6], [3, 3, 9], [3, 2, 6], [7, 2, 4], [2, 3, 12], [2, 4, 12], [2, 5, 15], [7, 2, 6], [2, 6, 9]]);
    const g = gcd(e, n), n2 = n / g, e2 = e / g, val = p ** (e / n);
    const ok = rt(n2, e2 === 1 ? p : H.n(p ** e2));
    const alts = [[rt(e2 === 1 ? n2 + 1 : e2, p), 0], [rt(n2, H.n(p ** e)), p ** (e / n2)], [rt(n - e, p), p ** (1 / (n - e))], [rt(n2, p * e2), (p * e2) ** (1 / n2)]]
      .filter(([s, x]) => !x || Math.abs(x - val) > 1e-9).map(([s]) => s);
    const c = choice4(R, ok, alts);
    return c && Object.assign({ q: T.q1(rt(n, H.n(p ** e))), sol: T.s1(rt(n, H.n(p ** e)), H.n(p ** e), `${p}${sup(e)}`, `${e}/${n}`, `${e2}/${n2}`, ok) }, c);
  }
  // misma base: ⁿ√(pᵃ) · ᵐ√(pᵇ) / ʳ√(pᶜ) → exponente
  const p = R.pick([2, 3, 5]);
  const term = () => { const n = R.pick([2, 3, 4, 6]); let e; do e = R.int(1, 3); while (e >= n); return [n, e]; };
  const t = [term(), term(), term()];
  if (t[0][0] === t[1][0] && t[1][0] === t[2][0]) return null;
  const qs = t.map(([n, e]) => F.make(e, n));
  const sum = F.sub(F.add(qs[0], qs[1]), qs[2]);
  const L = t.reduce((l, [n]) => lcm(l, n), 1);
  const show = ([n, e]) => rt(n, e === 1 ? p : `(${p}${sup(e)})`).replace(`√(${p}${sup(1)})`, `√${p}`);
  const asPow = ([n, e]) => `${p}<sup>${e}/${n}</sup>`;
  const common = qs.map(q => `${q[0] * L / q[1]}/${L}`);
  return { q: T.q2(p, `${show(t[0])} · ${show(t[1])} / ${show(t[2])}`), kind: "frac", ans: sum,
    sol: T.s2(t.map((x, i) => `${show(x)} = ${asPow(x)}`).join("; "), `${t[0][1]}/${t[0][0]} + ${t[1][1]}/${t[1][0]} − ${t[2][1]}/${t[2][0]}`, `${common[0]} + ${common[1]} − ${common[2]}`, sum[1] === L ? null : `${sum[0] * L / sum[1]}/${L}`, fr(sum), p) };
});
})();
