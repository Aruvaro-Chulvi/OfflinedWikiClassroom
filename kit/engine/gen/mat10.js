/* WikiAula — Matemáticas, Grado 10 (4.º de ESO): generadores nuevos (los demás
   temas usan los de los grados 8, 9 y 11). Textos: i18n/<lang>/mat10.js (S.m10). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F, polyHtml } = WA.MATH;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pt = (x, y) => `(${neg(x)}, ${neg(y)})`;
const mulP = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
const fact = n => n <= 1 ? 1 : n * fact(n - 1);
const V = (m, n) => { let p = 1; for (let i = 0; i < n; i++) p *= m - i; return p; };   // producto exacto (sin dividir factoriales enormes)
const Cb = (m, n) => V(m, n) / fact(n);
const choice = (R, ok, alts) => { const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 3)); return { kind: "choice", opts, correct: opts.indexOf(ok) }; };
const TRIP = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const lin = (a, b) => `${a === 1 ? "" : a === -1 ? "−" : neg(a)}x${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;

// ── Números reales ──
// Racional o irracional, con el porqué de cada caso; mitad y mitad, y operaciones (lo nuevo de 4.º).
const NSQ = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23];
const PRODQ = [[2, 8], [2, 18], [3, 12], [3, 27], [5, 20], [2, 32], [6, 24], [7, 28], [5, 45], [2, 50]];
def("m10.irracional", (R, S) => {
  const T = S.m10.ir_t, irr = R.r() < 0.5 ? 1 : 0;
  let x, s;
  if (!irr) {
    const k = R.int(0, 6);
    if (k === 0) { const a = R.int(2, 15); x = `√${a * a}`; s = T.sq(x, a); }
    else if (k === 1) { let a, b; do { a = R.int(1, 9); b = R.int(2, 12); } while (gcd(a, b) !== 1); x = `√(${a * a}/${b * b})`; s = T.sqf(x, `${a}/${b}`); }
    else if (k === 2) { const [a, b] = R.pick(PRODQ), [u, v] = R.r() < 0.5 ? [a, b] : [b, a]; x = `√${u} · √${v}`; s = T.prod(x, u * v, Math.sqrt(u * v)); }
    else if (k === 3) { const [a, b] = R.pick(PRODQ); x = `√${b} ${WA.H.div} √${a}`; s = T.quo(x, b / a, Math.sqrt(b / a)); }
    else if (k === 4) { const c = R.int(1, 9), n = R.pick(NSQ); x = `(${c} + √${n}) − √${n}`; s = T.dif(x, c); }
    else if (k === 5) { const d = R.int(1, 9); let e; do e = R.int(0, 9); while (e === d); x = `0${WA.H.ds}${d}${e}${d}${e}${d}${e}…`; s = T.per(x, `${d}${e}`); }
    else { const c = R.int(2, 6); x = `∛${c ** 3}`; s = T.cub(x, c); }
  } else {
    const k = R.int(0, 6);
    if (k === 0) { const n = R.pick(NSQ.concat([20, 30, 40, 50, 60, 80, 90])), a = Math.floor(Math.sqrt(n)); x = `√${n}`; s = T.nsq(x, n, a); }
    else if (k === 1) { const c = R.int(1, 9), n = R.pick(NSQ); x = R.r() < 0.5 ? `${c} + √${n}` : `√${n} − ${c}`; s = T.sum(x, `√${n}`); }
    else if (k === 2) { const c = R.int(2, 9), t = R.pick(["π", `√${R.pick(NSQ)}`]); x = R.r() < 0.5 ? `${c}${t}` : `${t}/${c}`; s = T.mul(x, t); }
    else if (k === 3) { let a, b; do { [a, b] = R.shuffle([2, 3, 5, 7, 6, 10]).slice(0, 2); } while (Number.isInteger(Math.sqrt(a * b))); x = `√${a} · √${b}`; s = T.prodi(x, a * b); }
    else if (k === 4) { const b = R.int(2, 7), n = R.pick([2, 3, 5, 7]); x = `√(${n}/${b * b})`; s = T.sqfi(x, `√${n}/${b}`, n); }
    else if (k === 5) { const n = R.pick([2, 3, 4, 5, 6, 7, 9, 10, 20]); x = `∛${n}`; s = T.cubi(x, n); }
    else { x = WA.H.esn(R.pick(["π", "0,1010010001…", "0,123456789101112…", "e"])); s = T.nper(x); }
  }
  return { q: S.m10.ir_q(x), kind: "choice", opts: S.m10.ir_o, correct: irr, shuffle: false, sol: s };
});
// ¿A qué conjuntos pertenece? y acotar una raíz entre dos décimas (con cuadrados).
def("m10.reales", (R, S) => {
  const T = S.m10.re_t, dec = x => String(x).replace(".", WA.H.ds);
  if (R.r() < 0.55) {
    const k = R.int(0, 3);
    let x, s;
    if (k === 0) { const a = R.int(2, 9), w = R.int(0, 2); x = [`√${a * a * 4}/2`, `${a * 3}/3`, `√${a * a}`][w]; s = T.nat([`√${a * a * 4}/2 = ${2 * a}/2 = ${a}`, `${a * 3}/3 = ${a}`, `√${a * a} = ${a}`][w]); }
    else if (k === 1) { const a = R.int(2, 9), w = R.int(0, 2); x = [`−√${a * a}`, `−${a * 4}/4`, `${a} − ${2 * a}`][w]; s = T.ent(`${x} = −${a}`); }
    else if (k === 2) { const w = R.int(0, 2); let a, b; do { a = R.int(1, 9); b = R.int(2, 9); } while (gcd(a, b) !== 1); x = [`−${a}/${b}`, `√(${a * a}/${b * b})`, `0${WA.H.ds}${a}${b}${a}${b}…`][w]; s = T.rac([`${x} es una fracción que no da un número entero`, `${x} = ${a}/${b}, una fracción que no da un número entero`, `${x} es periódico, así que es una fracción (${a * 10 + b}/99) que no da un número entero`][w]); }
    else { const n = R.pick(NSQ), c = R.int(1, 5), w = R.int(0, 2); x = [`√${n} − ${c}`, `−√${n}`, `π/${c + 1}`][w]; s = T.irr(x, w === 2 ? "π" : `√${n}`); }
    return { q: T.q0(x), kind: "choice", opts: T.o, correct: k, shuffle: false, sol: s };
  }
  let n; do n = R.int(10, 150); while (Number.isInteger(Math.sqrt(n)));
  const a = Math.floor(Math.sqrt(n)), d = Math.floor(Math.sqrt(n) * 10) / 10, lo = Math.round(d * 10), d2 = x => dec(Math.round(x * x * 100) / 100);
  const iv = t => `${dec(t / 10)} y ${dec((t + 1) / 10)}`;
  const opts = [lo - 1, lo, lo + 1, lo + 2].filter(t => t >= 10).map(iv);
  while (opts.length < 4) opts.push(iv(lo + 3));
  const ok = iv(lo), sh = R.shuffle(opts.slice(0, 4));
  return { q: T.q1(n), kind: "choice", opts: sh, correct: sh.indexOf(ok),
    sol: T.s1(n, a, a * a, (a + 1) ** 2, dec(lo / 10), d2(lo / 10), dec((lo + 1) / 10), d2((lo + 1) / 10)) };
});
// Intervalos (u1): traducir con el porqué de cada extremo, intersección y unión, entornos.
const IVS = (a, ai, b, bi) => `${ai ? "[" : "("}${a === -Infinity ? "−∞" : neg(a)}, ${b === Infinity ? "+∞" : neg(b)}${bi ? "]" : ")"}`;
def("m10.intervalos", (R, S) => {
  const T = S.m10.iv_t, k = R.int(0, 3);
  if (k === 0) {
    const a = R.int(-6, 4), b = a + R.int(2, 7), t = R.int(0, 5);
    const forms = [[`${neg(a)} ≤ x < ${neg(b)}`, a, 1, b, 0], [`${neg(a)} < x ≤ ${neg(b)}`, a, 0, b, 1], [`${neg(a)} < x < ${neg(b)}`, a, 0, b, 0], [`${neg(a)} ≤ x ≤ ${neg(b)}`, a, 1, b, 1],
      [`x ${R.r() < 0.5 ? ">" : "≥"} ${neg(a)}`, a, null, Infinity, 0], [`x ${R.r() < 0.5 ? "<" : "≤"} ${neg(b)}`, -Infinity, 0, b, null]];
    const f = forms[t];
    let ai = f[2], bi = f[4];
    if (ai === null) ai = f[0].includes("≥") ? 1 : 0;
    if (bi === null) bi = f[0].includes("≤") ? 1 : 0;
    const ok = IVS(f[1], ai, f[3], bi);
    const alts = f[1] === -Infinity ? [IVS(-Infinity, 0, f[3], 1 - bi), IVS(-Infinity, 1, f[3], bi), IVS(f[3], bi, Infinity, 0)]
      : f[3] === Infinity ? [IVS(f[1], 1 - ai, Infinity, 0), IVS(f[1], ai, Infinity, 1), IVS(-Infinity, 0, f[1], ai)]
      : [IVS(f[1], 1 - ai, f[3], bi), IVS(f[1], ai, f[3], 1 - bi), IVS(f[1], 1 - ai, f[3], 1 - bi)];
    const why = (v, inc, sym) => v === Infinity || v === -Infinity ? T.inf : T.ext(neg(v), inc, sym);
    const syms = f[0].match(/[<>≤≥]/g);
    let parts;
    if (f[1] === -Infinity) parts = [why(f[3], bi, syms[0]), why(-Infinity)];
    else if (f[3] === Infinity) parts = [why(f[1], ai, syms[0]), why(Infinity)];
    else parts = [why(f[1], ai, syms[0]), why(f[3], bi, syms[1])];
    return Object.assign({ q: T.q0(f[0]), sol: T.s0(parts.join(" "), ok) }, choice(R, ok, alts));
  }
  if (k <= 2) {
    // A y B: dos tramos acotados con extremos al azar; a veces se tocan, a veces no
    let A, B, t = 0;
    do {
      const a1 = R.int(-6, 3), b1 = a1 + R.int(2, 6), a2 = R.int(a1 - 3, b1 + 2), b2 = a2 + R.int(2, 6);
      A = [a1, R.int(0, 1), b1, R.int(0, 1)]; B = [a2, R.int(0, 1), b2, R.int(0, 1)];
      if (R.r() < 0.3) B = R.r() < 0.5 ? [a2, B[1], Infinity, 0] : [-Infinity, 0, b2, B[3]];
      t++;
    } while (t < 50 && (A[0] === B[2] || B[0] === A[2] || A[0] === B[0] && A[2] === B[2]));
    if (A[0] === B[2] || B[0] === A[2] || A[0] === B[0] && A[2] === B[2]) return null;
    const lo = Math.max(A[0], B[0]), loI = A[0] > B[0] ? A[1] : B[0] > A[0] ? B[1] : A[1] && B[1];
    const hi = Math.min(A[2], B[2]), hiI = A[2] < B[2] ? A[3] : B[2] < A[2] ? B[3] : A[3] && B[3];
    const sA = IVS(...A), sB = IVS(...B), meet = lo < hi;
    if (k === 1) {
      const ok = meet ? IVS(lo, loI, hi, hiI) : "∅";
      const alts = meet ? [IVS(lo, 1 - loI, hi, hiI), IVS(lo, loI, hi, 1 - hiI), IVS(Math.min(A[0], B[0]), 1, Math.max(A[2], B[2]), 0).replace("[−∞", "(−∞").replace("+∞]", "+∞)"), "∅"]
        : [IVS(Math.min(A[2], B[2]), 1, Math.max(A[0], B[0]), 1), IVS(Math.min(A[0], B[0]), 1, Math.max(A[2], B[2]), 1).replace("[−∞", "(−∞").replace("+∞]", "+∞)"), sA];
      const from = (v, a, b, inc) => a === b ? T.both(neg(v), inc) : T.one(neg(v), a > b ? "A" : "B", inc);
      const sol = meet ? T.s1(from(lo, A[0], B[0], loI), hi === Infinity ? T.inf2 : T.end(neg(hi), A[2] === B[2] ? "AB" : A[2] < B[2] ? "A" : "B", hiI), ok)
        : T.s1v(A[2] < B[0] ? "A" : "B", neg(Math.min(A[2], B[2])), neg(Math.max(A[0], B[0])));
      return Object.assign({ q: T.q1(sA, sB, "∩"), sol }, choice(R, ok, alts));
    }
    // unión
    const L = Math.min(A[0], B[0]), LI = A[0] < B[0] ? A[1] : B[0] < A[0] ? B[1] : A[1] || B[1];
    const U = Math.max(A[2], B[2]), UI = A[2] > B[2] ? A[3] : B[2] > A[2] ? B[3] : A[3] || B[3];
    const touch = meet || (lo === hi && (loI || hiI));
    const first = A[0] <= B[0] ? sA : sB, second = A[0] <= B[0] ? sB : sA;
    const ok = touch ? IVS(L, LI && L !== -Infinity, U, UI && U !== Infinity) : `${first} ∪ ${second}`;
    const alts = touch ? [IVS(L, !LI && L !== -Infinity, U, UI && U !== Infinity), IVS(lo, loI, hi, hiI), IVS(L, LI && L !== -Infinity, U, !UI && U !== Infinity)]
      : [IVS(L, LI && L !== -Infinity, U, UI && U !== Infinity), "∅", IVS(Math.min(A[2], B[2]), 1, Math.max(A[0], B[0]), 1)];
    const sol = touch ? T.s2(neg(L).replace("Infinity", "∞"), L === -Infinity ? 0 : LI ? 1 : 2, U === Infinity ? "+∞" : neg(U), U === Infinity ? 0 : UI ? 1 : 2, ok) : T.s2h(ok);
    return Object.assign({ q: T.q1(sA, sB, "∪"), sol }, choice(R, ok.replace("−Infinity", "−∞"), alts.filter(x => !/Infinity|NaN/.test(x))));
  }
  // entornos
  const c = R.int(-5, 6), r = R.int(1, 6);
  if (R.r() < 0.5) return { q: T.q3(IVS(c - r, 0, c + r, 0)), kind: "fields", fields: [{ label: T.f[0], ans: c }, { label: T.f[1], ans: r }],
    sol: T.s3(`(${neg(c - r)} + ${c + r < 0 ? `(${neg(c + r)})` : c + r}) / 2 = ${neg(c)}`, `(${neg(c + r)} − ${c - r < 0 ? `(${neg(c - r)})` : c - r}) / 2 = ${r}`, `E(${neg(c)}, ${r})`) };
  const ok = IVS(c - r, 0, c + r, 0);
  return Object.assign({ q: T.q4(`E(${neg(c)}, ${r})`), sol: T.s4(neg(c), r, neg(c - r), neg(c + r), ok) },
    choice(R, ok, [IVS(c - r, 1, c + r, 1), IVS(c, 0, c + r, 0), IVS(c - 2 * r, 0, c + 2 * r, 0)]));
});
// Valor absoluto (u1): |ax + b| = r, cuántas soluciones, ≤ y ≥, |p − √n| y de intervalo a |x − c| < r.
def("m10.abs", (R, S) => {
  const T = S.m10.ab_t, k = R.int(0, 4);
  const inner = (a, b) => `${a === 1 ? "" : a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}`;
  if (k === 0) {
    const a = R.pick([1, 2, 2, 3, 3]);
    let x1, x2; do { x1 = R.int(-6, 8); x2 = R.int(-8, 6); } while (x1 <= x2 || (a * (x1 + x2)) % 2 || a * (x1 - x2) / 2 > 15 || a * (x1 + x2) === 0);
    const r = a * (x1 - x2) / 2, b = -a * (x1 + x2) / 2, e = inner(a, b);
    const st = v => a === 1 ? `x = ${neg(v - b)}` : `${a}x = ${neg(v - b)} → x = ${neg((v - b) / a)}`;
    return { q: T.q0(e, r), kind: "set", ans: [x2, x1], hint: S.m10.set_hint,
      sol: T.s0(e, r, `${e} = ${r} → ${st(r)}`, `${e} = −${r} → ${st(-r)}`, `${neg(x1)} y ${neg(x2)}`) };
  }
  if (k === 1) {
    const a = R.int(-5, 5), r = R.pick([-3, -2, -1, 0, 0, 2, 3, 4, 5]), add = R.r() < 0.4 ? R.int(1, 6) : 0;
    const e = `|x ${a < 0 ? "+" : "−"} ${Math.abs(a)}|${add ? ` + ${add}` : ""}`.replace(/x [−+] 0/, "x"), rhs = r + add;
    const n = r < 0 ? 0 : r === 0 ? 1 : 2;
    return { q: T.q1(`${e} = ${neg(rhs)}`), kind: "choice", opts: T.o1, correct: n, shuffle: false, sol: T.s1(add ? `|x ${a < 0 ? "+" : "−"} ${Math.abs(a)}| = ${neg(rhs)} − ${add} = ${neg(r)}`.replace(/x [−+] 0/, "x") : "", r, neg(a), neg(a - r), neg(a + r)) };
  }
  if (k === 2) {
    const a = R.int(-5, 5), r = R.int(1, 6), op = R.pick(["<", "≤", ">", "≥"]), inc = op.length === 1 && "≤≥".includes(op);
    const e = `|x ${a < 0 ? "+" : "−"} ${Math.abs(a)}|`.replace("|x − 0|", "|x|").replace("|x + 0|", "|x|");
    const lo = neg(a - r), hi = neg(a + r), less = op === "<" || op === "≤";
    const I = `${inc ? "[" : "("}${lo}, ${hi}${inc ? "]" : ")"}`, U = `(−∞, ${lo}${inc ? "]" : ")"} ∪ ${inc ? "[" : "("}${hi}, +∞)`;
    const I2 = `${!inc ? "[" : "("}${lo}, ${hi}${!inc ? "]" : ")"}`, U2 = `(−∞, ${lo}${!inc ? "]" : ")"} ∪ ${!inc ? "[" : "("}${hi}, +∞)`;
    const ok = less ? I : U, opts = [I, I2, U, U2], sh = R.shuffle(opts);
    return { q: T.q2(`${e} ${op} ${r}`), kind: "choice", opts: sh, correct: sh.indexOf(ok), sol: T.s2(neg(a), op, r, lo, hi, inc, less, ok, a < 0 ? `|x − (${neg(a)})|` : "") };
  }
  if (k === 3) {
    const n = R.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 19, 20, 24]), s = Math.sqrt(n), p = R.r() < 0.5 ? Math.floor(s) : Math.ceil(s);
    if (p < 1) return null;
    const pos = p > s, ok = pos ? `${p} − √${n}` : `√${n} − ${p}`, opts = R.shuffle([`${p} − √${n}`, `√${n} − ${p}`, `${p} + √${n}`, `−${p} − √${n}`]);
    return { q: T.q3(`|${p} − √${n}|`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s3(n, String(Math.round(s * 100) / 100).replace(".", WA.H.ds), p, pos, ok) };
  }
  const c = R.int(-5, 7), r = R.int(1, 5), cl = R.r() < 0.35, iv = `${cl ? "[" : "("}${neg(c - r)}, ${neg(c + r)}${cl ? "]" : ")"}`;
  const ab = (cc, op, rr) => `${cc === 0 ? "|x|" : `|x ${cc < 0 ? "+" : "−"} ${Math.abs(cc)}|`} ${op} ${rr}`;
  const op = cl ? "≤" : "<", ok = ab(c, op, r);
  const alts = [ab(c, cl ? "<" : "≤", r), ab(-c, op, r), ab(c, cl ? "≥" : ">", r)].filter(x => x !== ok);
  if (c === 0) alts.push(ab(r, op, r === 0 ? 1 : r));
  return Object.assign({ q: T.q4(iv), sol: T.s4(`(${neg(c - r)} + ${c + r < 0 ? `(${neg(c + r)})` : c + r}) / 2 = ${neg(c)}`, `(${neg(c + r)} − ${c - r < 0 ? `(${neg(c - r)})` : c - r}) / 2 = ${r}`, cl, ok) }, choice(R, ok, alts));
});
// Errores (u1): cotas al operar (lo nuevo de 4.º) y la regla de las cifras significativas con dos datos.
def("m10.propagacion", (R, S, H) => {
  const T = S.m10.pg_t, k = R.int(0, 2), d = (x, p = 4) => H.dec(Math.round(x * 10 ** p) / 10 ** p);
  if (k === 0) {
    const L = R.int(21, 99) / 10, lo = L - 0.05, hi = L + 0.05, A0 = Math.round(lo * lo * 100) / 100, A1 = Math.round(hi * hi * 100) / 100;
    return { q: T.q0(H.dec(L)), kind: "fields", fields: [{ label: T.f0[0], kind: "num", ans: A0, tol: 0.011 }, { label: T.f0[1], kind: "num", ans: A1, tol: 0.011 }],
      sol: T.s0(d(lo, 2), d(hi, 2), d(lo * lo), H.dec(A0), d(hi * hi), H.dec(A1), H.dec(L), d(L * L)) };
  }
  if (k === 1) {
    const sides = R.pick([[3, "triángulo equilátero"], [4, "cuadrado"], [5, "pentágono regular"], [6, "hexágono regular"]]), tenth = R.r() < 0.6;
    const L = tenth ? R.int(21, 99) / 10 : R.int(5, 40), e = tenth ? 0.05 : 0.5, n = sides[0];
    return { q: T.q1(sides[1], H.dec(L), tenth), kind: "num", ans: Math.round(n * e * 100) / 100, tol: 0.001,
      sol: T.s1(n, H.dec(e), H.dec(Math.round(n * e * 100) / 100), d(n * (L - e), 2), d(n * (L + e), 2), d(n * L, 2)) };
  }
  // regla práctica: el resultado con las cifras significativas del dato menos preciso (2)
  for (let t = 0; t < 40; t++) {
    const tm = R.int(11, 49) / 10, dist = R.int(1001, 4999) / 10, v = dist / tm;
    if (v < 10 || v >= 99.5) continue;
    const ok = Math.round(v), full = Math.round(v * 1000) / 1000;
    if (Math.abs(v - ok) < 0.05 || Math.abs(Math.abs(v - Math.floor(v)) - 0.5) < 0.02) continue;
    const opts = R.shuffle([H.dec(ok) + " km/h", H.dec(full) + " km/h", H.dec(Math.round(v * 10) / 10) + " km/h", H.dec(Math.round(v / 10) * 10) + " km/h"]);
    if (new Set(opts).size < 4) continue;
    return { q: T.q2(H.dec(dist), H.dec(tm)), kind: "choice", opts, correct: opts.indexOf(H.dec(ok) + " km/h"), sol: T.s2(H.dec(dist), H.dec(tm), H.dec(full), H.dec(ok)) };
  }
  return null;
});

// ── Radicales (u2): el método de la lección (dividir el exponente entre el índice, conjugado, completar el índice) ──
const SQF = [2, 3, 5, 6, 7, 10, 11];
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const rt = n => n === 2 ? "√" : "∛";
const radT = (c, n, b) => `${c === 1 ? "" : c === -1 ? "−" : neg(c)}${rt(n)}${b}`;
const pw = (p, e) => e > 1 ? `${p}<sup>${e}</sup>` : String(p);
const choiceV = (R, ok, v, alts) => {
  const seen = new Set([ok]), keep = [];
  alts.forEach(([s, x]) => { if (!seen.has(s) && isFinite(x) && Math.abs(x - v) > 1e-9) { seen.add(s); keep.push(s); } });
  if (keep.length < 2) return null;
  const opts = R.shuffle([ok, ...keep.slice(0, 3)]);
  return { kind: "choice", opts, correct: opts.indexOf(ok) };
};
def("m10.rad.extraer", (R, S) => {
  const n = R.r() < 0.6 ? 2 : 3;
  for (let t = 0; t < 60; t++) {
    const ps = R.shuffle([2, 3, 5, 7]).slice(0, R.int(1, 2)).sort((a, b) => a - b);
    const ex = ps.map(() => R.int(1, 5));
    const N = ps.reduce((s, p, i) => s * p ** ex[i], 1);
    let out = 1, inn = 1;
    ps.forEach((p, i) => { out *= p ** Math.floor(ex[i] / n); inn *= p ** (ex[i] % n); });
    if (out === 1 || inn === 1 || N > (n === 2 ? 1000 : 3000)) continue;
    const fs = ps.map((p, i) => pw(p, ex[i])).join(" · ");
    const steps = ps.map((p, i) => S.m10.rx_paso(pw(p, ex[i]), ex[i], n, pw(p, Math.floor(ex[i] / n)), Math.floor(ex[i] / n), pw(p, ex[i] % n), ex[i] % n)).join("; ");
    return { q: S.m10.rx_q(rt(n) + N, rt(n)), kind: "fields", fields: [{ label: S.m10.rx_f[0], ans: out }, { label: S.m10.rx_f[1], ans: inn }],
      sol: S.m10.rx_s(rt(n) + N, N, fs, n, steps, ps.filter((p, i) => ex[i] >= n).map((p, i, a) => pw(p, Math.floor(ex[ps.indexOf(p)] / n))).join(" · "), out, radT(out, n, inn)) };
  }
  return null;
});
def("m10.rad.sumar", (R, S) => {
  const n = R.r() < 0.75 ? 2 : 3, b = n === 2 ? R.pick([2, 3, 5]) : R.pick([2, 3]);
  const ms = R.shuffle(n === 2 ? [1, 2, 3, 4, 5] : [1, 2, 3]).slice(0, R.int(2, 3));
  const cs = ms.map((m, i) => i ? rnz(R, -4, 5) : R.int(1, 5));
  const k = cs.reduce((s, c, i) => s + c * ms[i], 0);
  if (!k) return null;
  const sg = (c, i, t) => i ? (c < 0 ? " − " : " + ") + t : (c < 0 ? "−" : "") + t;
  const co = x => Math.abs(x) === 1 ? "" : String(Math.abs(x));
  const terms = ms.map((m, i) => sg(cs[i], i, `${co(cs[i])}${rt(n)}${m ** n * b}`)).join("");
  const ext = ms.filter(m => m > 1).map(m => `${rt(n)}${m ** n * b} = ${m}${rt(n)}${b}`).join(", ");
  const sub = ms.map((m, i) => sg(cs[i], i, m === 1 ? `${co(cs[i])}${rt(n)}${b}` : Math.abs(cs[i]) === 1 ? `${m}${rt(n)}${b}` : `${Math.abs(cs[i])} · ${m}${rt(n)}${b}`)).join("");
  const simp = ms.map((m, i) => sg(cs[i], i, `${co(cs[i] * m)}${rt(n)}${b}`)).join("");
  const sum = `(${ms.map((m, i) => i ? (cs[i] < 0 ? " − " : " + ") + Math.abs(cs[i] * m) : neg(cs[i] * m)).join("")})${rt(n)}${b}`;
  return { q: S.m10.rs_q(terms, rt(n) + b), kind: "fields", fields: [{ label: S.m10.rs_f(rt(n) + b), ans: k }],
    sol: S.m10.rs_s(ext, sub === simp ? simp : `${sub} = ${simp}`, sum, radT(k, n, b)) };
});
def("m10.rad.racionalizar", (R, S) => {
  const k = R.int(0, 2), fr = (a, d) => d === 1 ? a : `${a}/${d}`;
  const rfr = (c, n, r, d) => { const g = gcd(c, d); return fr(radT(c / g, n, r), d / g); };
  const qfr = (a, d) => { const g = gcd(a, d); return fr(String(a / g), d / g); };
  const nf = (c, E, d) => { const g = gcd(c, d), c1 = c / g, d1 = d / g; return `${c1 === 1 ? (d1 === 1 ? E : `(${E})`) : `${c1}(${E})`}${d1 === 1 ? "" : "/" + d1}`; };
  if (k === 0) {
    const a = R.int(1, 12), b = R.pick(SQF), g = gcd(a, b), p = a / g, d = b / g, v = a / Math.sqrt(b);
    const ok = fr(radT(p, 2, b), d);
    const c = choiceV(R, ok, v, [[rfr(a, 2, b, b * b), a * Math.sqrt(b) / (b * b)], [fr("√" + b, a), Math.sqrt(b) / a], [qfr(a, b), a / b], [radT(a, 2, b), a * Math.sqrt(b)], [rfr(p, 2, b, d * b), p * Math.sqrt(b) / (d * b)]]);
    if (!c) return null;
    return Object.assign({ q: S.m10.rz_q(`${a}/√${b}`), sol: S.m10.rz_s[0](radT(a, 2, b), b, `${radT(a, 2, b)}/${b}`, g > 1 ? g : 0, ok) }, c);
  }
  if (k === 1) {
    const p = R.pick([2, 3, 5]), e = R.int(1, 2), c0 = R.int(1, 9), m = p ** (3 - e), g = gcd(c0, p), v = c0 / p ** (e / 3);
    const ok = fr(radT(c0 / g, 3, m), p / g);
    const c = choiceV(R, ok, v, [[rfr(c0, 3, p ** e, p ** e), c0 * p ** (e / 3) / p ** e], [qfr(c0, p), c0 / p], [rfr(c0, 3, p ** e, p), c0 * p ** (e / 3) / p], [radT(c0, 3, m), c0 * m ** (1 / 3)], [rfr(c0, 3, m, m), c0 * m ** (1 / 3) / m]]);
    if (!c) return null;
    return Object.assign({ q: S.m10.rz_q(`${c0}/∛${p ** e}`), sol: S.m10.rz_s[1](`${p}<sup>${e}</sup>`, `${p}<sup>${3 - e}</sup>`, p, `${radT(c0, 3, m)} / (∛${p ** e} · ∛${m}) = ${radT(c0, 3, m)} / ∛${p ** 3}`, `${radT(c0, 3, m)}/${p}`, m, g > 1 ? g : 0, ok) }, c);
  }
  const b = R.pick(SQF), c0 = R.int(1, 4), kk = R.pick([1, 1, 2, 3, 4, 6]), plus = R.r() < 0.5;
  const d = c0 * c0 - b, g = gcd(kk, d), k1 = kk / g, D = Math.abs(d) / g, s = plus ? -1 : 1;
  const den = `${c0} ${plus ? "+" : "−"} √${b}`, conj = `${c0} ${plus ? "−" : "+"} √${b}`, v = kk / (c0 - s * Math.sqrt(b));
  const kp = x => x === 1 ? "" : String(x);
  let E = conj, minus = false;
  if (d < 0) { if (plus) E = `√${b} − ${c0}`; else minus = true; }
  const ok = minus ? `−${k1 === 1 ? `(${E})` : `${k1}(${E})`}${D === 1 ? "" : "/" + D}` : `${k1 === 1 ? (D === 1 ? E : `(${E})`) : `${k1}(${E})`}${D === 1 ? "" : "/" + D}`;
  const ch = choiceV(R, ok, v, [
    [nf(kk, conj, c0 * c0 + b), kk * (c0 + s * Math.sqrt(b)) / (c0 * c0 + b)],
    [nf(kk, conj, Math.abs(d)), kk * (c0 + s * Math.sqrt(b)) / Math.abs(d)],
    [nf(kk, den, Math.abs(d)), kk * (c0 - s * Math.sqrt(b)) / Math.abs(d)],
    [nf(kk, conj, b), kk * (c0 + s * Math.sqrt(b)) / b]]);
  if (!ch) return null;
  const st1 = `${kp(kk)}(${conj}) / (${c0}² − (√${b})²) = ${kp(kk)}(${conj}) / ${d < 0 ? `(${neg(d)})` : d}`;
  const st2 = g > 1 ? S.m10.rz_simp(g, `${kp(k1)}(${conj}) / ${d < 0 ? `(${neg(d / g)})` : d / g}`) : "";
  return Object.assign({ q: S.m10.rz_q(`${kk}/(${den})`), sol: S.m10.rz_s[2](conj, `${kp(kk)}(${conj}) / ((${den})(${conj}))`, st1, st2, d < 0, ok) }, ch);
});
// Lo nuevo de 4.º en radicales: índice común (ordenar, multiplicar, dividir), raíz de una raíz y extraer con letras.
const SUPD = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const rootN = n => n === 2 ? "√" : n === 3 ? "∛" : String(n).split("").map(c => SUPD[c]).join("") + "√";
const lcm2 = (a, b) => a * b / gcd(a, b);
const pwT = (b, e) => e === 1 ? String(b) : `${b}${String(e).split("").map(c => SUPD[c]).join("")}`;
def("m10.radicales", (R, S) => {
  const T = S.m10.rd_t, k = R.int(0, 3);
  if (k === 0) {
    for (let t = 0; t < 40; t++) {
      const [n1, n2] = R.shuffle([2, 3, 4, 6]).slice(0, 2), a = R.int(2, 9), b = R.int(2, 9), L = lcm2(n1, n2);
      const A = a ** (L / n1), B = b ** (L / n2);
      if (A === B || A > 20000 || B > 20000 || L > 12) continue;
      const ra = rootN(n1) + a, rb = rootN(n2) + b, big = A > B ? ra : rb, opts = [ra, rb, T.eq];
      return { q: T.q0(ra, rb), kind: "choice", opts, correct: opts.indexOf(big), shuffle: false,
        sol: T.s0(n1, n2, L, L === n1 ? T.same(ra, L) : `${ra} = ${rootN(L)}${pwT(a, L / n1)} = ${rootN(L)}${A}`, L === n2 ? T.same(rb, L) : `${rb} = ${rootN(L)}${pwT(b, L / n2)} = ${rootN(L)}${B}`, big) };
    }
    return null;
  }
  if (k === 1) {
    const [n1, n2] = R.shuffle([2, 3, 4]).slice(0, 2), L = lcm2(n1, n2), quo = R.r() < 0.35;
    const a = R.pick([2, 3, 5]), b = quo ? a : R.pick([2, 3, 5].filter(x => x !== a || R.r() < 0.3));
    const e1 = L / n1, e2 = L / n2;
    if (quo && e1 <= e2) return null;
    const ra = rootN(n1) + a, rb = rootN(n2) + b;
    let ok, alts, rad;
    if (quo) { const e = e1 - e2, v = a ** e; rad = v; ok = rootN(L) + v; alts = [rootN(n1 - n2 > 0 ? n1 - n2 : n2) + 1, rootN(L) + a, rootN(n1 * n2) + (a ** e1 / a)].filter(x => !/√1$/.test(x)); alts.push(rootN(L) + a ** e1); }
    else { rad = a ** e1 * b ** e2; ok = rootN(L) + rad; alts = [rootN(n1 + n2) + a * b, rootN(L) + a * b, rootN(n1 * n2) + (a ** e2 * b ** e1)]; }
    if (rad > 2000) return null;
    const steps = `${e1 === 1 ? T.same(ra, L) : `${ra} = ${rootN(L)}${pwT(a, e1)} = ${rootN(L)}${a ** e1}`} y ${e2 === 1 ? T.same(rb, L) : `${rb} = ${rootN(L)}${pwT(b, e2)} = ${rootN(L)}${b ** e2}`}`;
    return Object.assign({ q: T.q1(`${ra} ${quo ? WA.H.div : "·"} ${rb}`), sol: T.s1(n1, n2, L, steps, quo, `${rootN(L)}(${a ** e1} ${quo ? WA.H.div : "·"} ${b ** e2})`, ok) }, choice(R, ok, alts));
  }
  if (k === 2) {
    const [b, m, n] = R.pick([[2, 2, 2], [3, 2, 2], [2, 2, 3], [2, 3, 2], [3, 2, 3], [3, 3, 2], [2, 3, 3], [5, 2, 2], [10, 2, 3], [10, 3, 2]]);
    const N = b ** (m * n), inner = b ** m;   // ᵐ√(ⁿ√N): primero ⁿ√N = b^m, luego ᵐ√ = b
    return { q: T.q2(`${rootN(m)}(${rootN(n)}${N})`), kind: "int", ans: b,
      sol: T.s2(m, n, m * n, `${rootN(m * n)}${N} = ${rootN(m * n)}${pwT(b, m * n)} = <b>${b}</b>`, `${rootN(n)}${N} = ${inner}`, `${rootN(m)}${inner} = ${b}`) };
  }
  // extraer factores con letras
  for (let t = 0; t < 40; t++) {
    const n = R.r() < 0.5 ? 2 : 3, p = R.pick([2, 3, 5]), e = R.int(1, n === 2 ? 5 : 5), ka = R.int(n, 3 * n + 1), two = R.r() < 0.35, kb = two ? R.int(1, 2 * n) : 0;
    const N = p ** e;
    if (N > 300) continue;
    const qo = x => Math.floor(x / n), re = x => x % n;
    const out = (qo(e) ? (p ** qo(e) === 1 ? "" : String(p ** qo(e))) : "") + (qo(ka) ? "a" + (qo(ka) > 1 ? `<sup>${qo(ka)}</sup>` : "") : "") + (kb && qo(kb) ? "b" + (qo(kb) > 1 ? `<sup>${qo(kb)}</sup>` : "") : "");
    const inP = (re(e) ? String(p ** re(e)) : "") + (re(ka) ? "a" + (re(ka) > 1 ? `<sup>${re(ka)}</sup>` : "") : "") + (kb && re(kb) ? "b" + (re(kb) > 1 ? `<sup>${re(kb)}</sup>` : "") : "");
    if (!inP || !out) continue;
    const rad = x => `${rootN(n)}${x.length > 1 || /</.test(x) ? `(${x})` : x}`;
    const ok = `${out}${rad(inP)}`;
    const radicand = `${N === 1 ? "" : N}a<sup>${ka}</sup>${kb ? (kb > 1 ? `b<sup>${kb}</sup>` : "b") : ""}`;
    const wrong1 = `${N === 1 ? "" : N}${out.replace(/^\d+/, "")}${rad(inP)}`;   // el número sin extraer
    const wrong2 = `${out.replace(/a(<sup>\d+<\/sup>)?/, `a<sup>${ka}</sup>`)}${rad(inP)}`;   // la letra con su exponente
    const wrong3 = `${inP.replace(/<\/?sup>/g, "")}${rad(out.replace(/<\/?sup>/g, ""))}`;
    const steps = [[p, e], ["a", ka], ...(kb ? [["b", kb]] : [])].map(([f, x]) => S.m10.rd_t.st(pwT(f, x), x, n, qo(x), re(x))).join("; ");
    return Object.assign({ q: T.q3(`${rootN(n)}(${radicand})`), sol: T.s3(`${radicand} = ${pwT(p, e)} · ${pwT("a", ka)}${kb ? " · " + pwT("b", kb) : ""}`, n, steps, out, inP, `${rootN(n)}(${radicand}) = <b>${ok}</b>`) },
      choice(R, ok, [wrong1, wrong2, wrong3].filter(x => x !== ok)));
  }
  return null;
});
// Logaritmos (u2): fraccionarios por potencias de la misma base, hallar el número o la base, acotar entre enteros.
const logT = (b, x) => `${b === 10 ? "log" : `log<sub>${b}</sub>`} ${x}`;
def("m10.log", (R, S) => {
  const T = S.m10.lg_t, k = R.int(0, 2);
  if (k === 0) {
    const b = R.pick([2, 2, 3]), p = R.pick(b === 2 ? [2, 3, 4] : [2, 3]), q = R.pick([-3, -2, -1, 1, 2, 3, 4, 5].filter(x => x % p !== 0 && Math.abs(x) <= (b === 2 ? 6 : 4)));
    const B = b ** p, N = q > 0 ? String(b ** q) : `1/${b ** -q}`, fr = F.make(q, p);
    return { q: T.q0(logT(B, q > 0 ? N : `(${N})`)), kind: "frac", ans: fr,
      sol: T.s0(B, `${b}${pwT("", p)}`.replace(/^(\d+)/, "$1"), N, q > 0 ? `${b}<sup>${q}</sup>` : `${b}<sup>−${-q}</sup>`, b, p, q < 0 ? "−" + -q : q, fr[1] === 1 ? neg(fr[0]) : `${neg(fr[0])}/${fr[1]}`) };
  }
  if (k === 1) {
    const w = R.int(0, 2);
    if (w === 0) { const b = R.pick([2, 3, 4, 5, 10]), e = R.pick([-3, -2, -1, 2, 3, 4].filter(x => Math.abs(b ** x) <= 10000)), v = e > 0 ? [b ** e, 1] : [1, b ** -e];
      return { q: T.q1(`${logT(b, "x")} = ${neg(e)}`), kind: "frac", ans: v, sol: T.s1(b, neg(e), e > 0 ? String(b ** e) : `1/${b}<sup>${-e}</sup> = 1/${b ** -e}`) }; }
    if (w === 1) { const x = R.int(2, 6), e = R.pick([2, 3, 3, 4].filter(y => x ** y <= 1300));
      return { q: T.q1(`${logT("x", x ** e)} = ${e}`), kind: "int", ans: x, sol: T.s1b(e, x ** e, x) }; }
    const [b, num, den] = R.pick([[4, 3, 2], [9, 3, 2], [8, 2, 3], [27, 2, 3], [16, 3, 4], [4, 5, 2], [25, 3, 2], [8, 4, 3]]), r = Math.round(Math.pow(b, 1 / den)), v = r ** num;
    return { q: T.q1(`${logT(b, "x")} = ${num}/${den}`), kind: "int", ans: v, sol: T.s1c(b, num, den, r, v) };
  }
  const b = R.pick([2, 3, 10]);
  let N; do N = b === 10 ? R.int(11, 99) * 10 ** R.int(0, 3) : R.int(5, b === 2 ? 1000 : 700); while (Number.isInteger(Math.log(N) / Math.log(b)) || Math.abs(Math.log(N) / Math.log(b) - Math.round(Math.log(N) / Math.log(b))) < 1e-9);
  const e = Math.floor(Math.log(N) / Math.log(b) + 1e-12);
  if (b ** e > N || b ** (e + 1) <= N) return null;
  const opts = [e - 1, e, e + 1, e + 2].filter(x => x >= 0).slice(0, 4).map(x => T.btw(x, x + 1)), ok = T.btw(e, e + 1);
  return { q: T.q2(logT(b, N)), kind: "choice", opts, correct: opts.indexOf(ok), shuffle: false, sol: T.s2(b, e, b ** e, N, b ** (e + 1), logT(b, N)) };
});
// Propiedades de los logaritmos (u2): calcular con log 2 y log 3 (descomponiendo), agrupar, desarrollar, cambio de base y cifras.
const L2 = 0.301, L3 = 0.477;
def("m10.logprop", (R, S, H) => {
  const T = S.m10.lp_t, k = R.int(0, 4), d3 = x => H.dec(Math.round(x * 1000) / 1000);
  if (k === 0) {
    for (let t = 0; t < 40; t++) {
      const a = R.int(-3, 4), b = R.int(0, 2), c = R.int(-1, 1), five = R.r() < 0.2;
      // N = 2^a · 3^b · 10^c (con 5 = 10/2 cuando a < 0 y c > 0)
      const N = 2 ** a * 3 ** b * 10 ** c;
      if (a === 0 && b === 0 || N < 0.05 || N > 2000 || !Number.isInteger(Math.round(N * 1000)) || Math.abs(N * 1000 - Math.round(N * 1000)) > 1e-6) continue;
      if (N === 2 || N === 3 || N === 10 || N === 1) continue;
      const Ns = H.dec(Math.round(N * 1000) / 1000);
      const fac = [a ? pwT(2, Math.abs(a)) : "", b ? pwT(3, b) : "", c ? (c > 0 ? "10" : "") : ""].filter(Boolean);
      const den = [a < 0 ? pwT(2, -a) : "", c < 0 ? "10" : ""].filter(Boolean);
      const numF = [a > 0 ? pwT(2, a) : "", b ? pwT(3, b) : "", c > 0 ? "10" : ""].filter(Boolean).join(" · ") || "1";
      const dec = den.length ? `${numF}/${den.join(" · ")}` : numF;
      if (/^1\/|^1$/.test(dec) && !den.length) continue;
      const terms = [], vals = [];
      if (a) { terms.push(`${a < 0 ? "−" : ""}${Math.abs(a) === 1 ? "" : Math.abs(a) + " "}log 2`); vals.push([`${Math.abs(a) === 1 ? "" : Math.abs(a) + " · "}${H.dec(0.301)}`, a * L2, a < 0]); }
      if (b) { terms.push(`${b === 1 ? "" : b + " "}log 3`); vals.push([`${b === 1 ? "" : b + " · "}${H.dec(0.477)}`, b * L3, false]); }
      if (c) { terms.push(`${c < 0 ? "−" : ""}log 10`); vals.push(["1", c, c < 0]); }
      const ans = Math.round((a * L2 + b * L3 + c) * 1000) / 1000;
      const sumT = terms.map((s, i) => i === 0 ? s : s[0] === "−" ? " − " + s.slice(1) : " + " + s).join("");
      const numT = vals.map(([s, v, m], i) => i === 0 ? (m ? "−" : "") + s : (m ? " − " : " + ") + s).join("");
      const partT = vals.map(([s, v, m], i) => { const x = d3(Math.abs(v)); return i === 0 ? (v < 0 ? "−" : "") + x : (v < 0 ? " − " : " + ") + x; }).join("");
      void five;
      return { q: T.q0(Ns), kind: "num", ans, tol: 0.0011, sol: T.s0(Ns, dec, sumT, numT, partT, d3(ans), vals.length > 1) };
    }
    return null;
  }
  if (k === 1) {
    const [p, q, r] = [R.int(2, 4), R.int(1, 2), R.int(2, 3)], [x, y, z] = R.shuffle(["a", "b", "c", "x", "y", "z"]).slice(0, 3);
    const P = (v, e) => e === 1 ? v : `${v}<sup>${e}</sup>`, co = e => e === 1 ? "" : e + " ";
    const e = `${co(p)}log ${x} + ${co(q)}log ${y} − ${co(r)}log ${z}`;
    const ok = `log (${P(x, p)}${P(y, q)} / ${P(z, r)})`;
    return Object.assign({ q: T.q1(e), sol: T.s1(`${co(p)}log ${x} = log ${P(x, p)}`, `${co(q)}log ${y} = log ${P(y, q)}`, `${co(r)}log ${z} = log ${P(z, r)}`, ok) },
      choice(R, ok, [`log (${p}${x} + ${q === 1 ? "" : q}${y} − ${r}${z})`, `log (${P(x, p)}${P(y, q)}) / log ${P(z, r)}`, `log (${p}${x}${q === 1 ? "" : q}${y} / (${r}${z}))`]));
  }
  if (k === 2) {
    const p = R.int(2, 5), n = R.pick([2, 3]), [x, y, z] = R.shuffle(["a", "b", "c", "x", "y", "z"]).slice(0, 3), frac = n === 2 ? "½" : "⅓";
    const e = `log (${x}<sup>${p}</sup> · ${rootN(n)}${y} / ${z})`, ok = `${p} log ${x} + ${frac} log ${y} − log ${z}`;
    return Object.assign({ q: T.q2(e), sol: T.s2(x, p, y, n, frac, z, ok) },
      choice(R, ok, [`${p} log ${x} + ${n} log ${y} − log ${z}`, `log ${p}${x} + ${frac} log ${y} − log ${z}`, `${p} log ${x} · ${frac} log ${y} ${WA.H.div} log ${z}`]));
  }
  if (k === 3) {
    const b = R.pick([2, 3, 5, 6, 7]); let N; do N = R.int(3, 200); while (Number.isInteger(Math.log(N) / Math.log(b)) || N === b);
    const v = Math.log(N) / Math.log(b), lN = Math.log10(N), lb = Math.log10(b);
    return { q: T.q3(logT(b, N)), kind: "num", ans: Math.round(v * 100) / 100, tol: 0.011, sol: T.s3(logT(b, N), N, b, H.dec(Math.round(lN * 100000) / 100000), H.dec(Math.round(lb * 100000) / 100000), H.dec(Math.round(v * 100) / 100)) };
  }
  const [b, lb] = R.pick([[2, 0.30103], [3, 0.47712], [5, 0.69897], [7, 0.8451]]);
  for (let t = 0; t < 30; t++) {
    const n = R.int(15, 99), L = n * lb, fr = L - Math.floor(L), real = Math.floor(n * Math.log10(b)) + 1;
    if (fr < 0.03 || fr > 0.97 || real !== Math.floor(L) + 1) continue;
    return { q: T.q4(b, n, H.dec(lb)), kind: "int", ans: real, sol: T.s4(b, n, H.dec(lb), H.dec(Math.round(L * 1000) / 1000), Math.floor(L), Math.floor(L) + 1, real) };
  }
  return null;
});
// ── Fracciones algebraicas ──
// Factorizar (u3) con el método de la lección: factor común, coeficiente principal, Ruffini (una o dos veces) y la fórmula.
const xr = r => r === 0 ? "x" : `(x ${r > 0 ? "−" : "+"} ${Math.abs(r)})`;
const evalT = (P, r) => P.map((a, i) => a * r ** (P.length - 1 - i)).filter(t => t !== 0).map((t, i) => i ? (t < 0 ? " − " : " + ") + Math.abs(t) : neg(t)).join("");
const divs = c => { const d = []; for (let t = 1; t <= Math.abs(c); t++) if (c % t === 0) d.push(t); return d; };
def("m10.factoriza", (R, S) => {
  const T = S.m10.fz_t, k = R.int(0, 3);
  const quadF = (u, v) => { const p = -(u + v), q = u * v, Q = polyHtml([1, p, q]);
    return p === 0 ? T.q0(Q, -q, Math.abs(u)) : T.qf(Q, neg(-p), p * p - 4 * q, Math.abs(u - v), neg(Math.max(u, v)), neg(Math.min(u, v))); };
  const ruf = (P) => { const c = P[P.length - 1], dv = divs(c), r = dv.flatMap(d => [d, -d]).find(d => P.reduce((s, a) => s * d + a, 0) === 0);
    const row = []; P.reduce((s, a) => { const v = s * r + a; row.push(v); return v; }, 0); row.pop();
    return { c: Math.abs(c), dv: dv.map(d => "±" + d).join(", "), r, ev: evalT(P, r), Q: row }; };
  const sortR = rs => rs.slice().sort((x, y) => (x === 0 ? -1 : y === 0 ? 1 : y - x));
  const facts = rs => { const m = {}; rs.forEach(r => { m[r] = (m[r] || 0) + 1; }); return Object.keys(m).map(Number).sort((x, y) => (x === 0 ? -1 : y === 0 ? 1 : y - x)).map(r => r === 0 ? (m[r] > 1 ? `x<sup>${m[r]}</sup>` : "x") : xr(r) + (m[r] > 1 ? `<sup>${m[r]}</sup>` : "")).join(""); };
  if (k === 0) {   // grado 4, cuatro raíces enteras, dos Ruffini y la fórmula
    let rs, P;
    do { rs = R.shuffle([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 4); P = rs.reduce((p, t) => mulP(p, [1, -t]), [1]); } while (Math.abs(P[4]) > 60);
    const s1 = ruf(P), s2 = ruf(s1.Q), [u, v] = rs.filter(r => r !== s1.r && r !== s2.r);
    const ok = facts(rs);
    return Object.assign({ q: T.q(polyHtml(P, "x", { html: true })), sol: T.s4(s1.c, s1.dv, neg(s1.r), s1.ev, polyHtml(s1.Q, "x", { html: true }), neg(s2.r), s2.ev, polyHtml(s2.Q), quadF(u, v), ok) }, choice(R, ok, [facts(rs.map(r => -r)), facts(rs.map((r, i) => i === 0 ? -r : r)), facts(rs.map((r, i) => i === 3 ? -r : r))]));
  }
  if (k === 1) {   // coeficiente principal distinto de 1 (y a veces factor común x)
    const c = R.pick([2, 3, -1, -2, 3]), zero = R.r() < 0.5;
    let rs; do rs = zero ? [0, rnz(R, -4, 4), rnz(R, -4, 4)] : [rnz(R, -4, 4), rnz(R, -4, 4), rnz(R, -3, 3)]; while (new Set(rs).size < 3);
    const P = rs.reduce((p, t) => mulP(p, [1, -t]), [c]), M = rs.reduce((p, t) => mulP(p, [1, -t]), [1]);
    const cs = c === 1 ? "" : c === -1 ? "−" : neg(c), ok = cs + facts(rs);
    let steps;
    if (zero) { const [u, v] = rs.filter(r => r); steps = T.comun(polyHtml(mulP([1, -u], [1, -v]))) + " " + quadF(u, v) + "."; }
    else { const s1 = ruf(M), [u, v] = rs.filter(r => r !== s1.r); steps = T.ruf1(s1.c, s1.dv, neg(s1.r), s1.ev, polyHtml(s1.Q)) + " " + quadF(u, v) + "."; }
    return Object.assign({ q: T.q(polyHtml(P, "x", { html: true })), sol: T.sc(polyHtml(P, "x", { html: true }), cs, polyHtml(M, "x", { html: true }), steps, ok) },
      choice(R, ok, [facts(rs), cs + facts(rs.map(r => -r)), (c < 0 ? "" : "−") + (Math.abs(c) === 1 ? "" : Math.abs(c)) + facts(rs), cs + facts(rs.map((r, i) => i === 1 ? -r : r)), cs + facts(rs.filter(r => r !== 0))]));
  }
  if (k === 2) {   // un factor irreducible de grado 2
    const a = rnz(R, -4, 4), kk = R.pick([1, 2, 3, 4, 5, 9]), Q = [1, 0, kk], P = mulP([1, -a], Q), s1 = ruf(P);
    const ok = `${xr(a)}(${polyHtml(Q)})`;
    return Object.assign({ q: T.q(polyHtml(P, "x", { html: true })), sol: T.si(s1.c, s1.dv, neg(s1.r), s1.ev, polyHtml(Q), kk, ok) },
      choice(R, ok, [`${xr(a)}(x + ${Number.isInteger(Math.sqrt(kk)) ? Math.sqrt(kk) : "√" + kk})(x − ${Number.isInteger(Math.sqrt(kk)) ? Math.sqrt(kk) : "√" + kk})`, `${xr(-a)}(${polyHtml(Q)})`, `${xr(a)}(${polyHtml([1, 0, -kk])})`]));
  }
  // factor común x² y trinomio (como el Ejemplo 2)
  const c = R.pick([1, 2, 3]); let u, v; do { u = rnz(R, -5, 5); v = rnz(R, -5, 5); } while (u === v);
  const P = [0, 0, u, v].reduce((p, t) => mulP(p, [1, -t]), [c]), cs = c === 1 ? "" : String(c);
  const ordered = `${cs}x<sup>2</sup>${facts([u, v])}`;
  return Object.assign({ q: T.q(polyHtml(P, "x", { html: true })), sol: T.sx(polyHtml(P, "x", { html: true }), `${cs}x<sup>2</sup>`, polyHtml(mulP([1, -u], [1, -v])), quadF(u, v), ordered) },
    choice(R, ordered, [`${cs}x${facts([u, v])}`, `${cs}x<sup>2</sup>${facts([-u, -v])}`, `${cs}${facts([u, v])}`].filter(x => x !== ordered)));
});
def("m10.fa.simplificar", (R, S) => {
  const a = R.int(2, 9), b = rnz(R, -6, 6), k = R.int(0, 5), B = Math.abs(b), sg = b < 0 ? "−" : "+";
  const T = S.m10.fs_t, xm = r => r > 0 ? `x − ${r}` : `x + ${-r}`;
  if (k === 3) {   // grado 2 arriba y abajo con un factor común: el resultado es una fracción
    let u, v, w; do { [u, v, w] = [rnz(R, -6, 6), rnz(R, -6, 6), rnz(R, -6, 6)]; } while (new Set([u, v, w]).size < 3 || v === -w);
    const N = polyHtml(mulP([1, -u], [1, -v])), D = polyHtml(mulP([1, -u], [1, -w])), ok = `(${xm(v)}) / (${xm(w)})`;
    return Object.assign({ q: S.m10.fs_q(`(${N}) / (${D})`), sol: T.s3(N, neg(u), neg(v), `(${xm(u)})(${xm(v)})`, D, neg(u), neg(w), `(${xm(u)})(${xm(w)})`, xm(u), ok, neg(u), neg(w)) },
      choice(R, ok, [`(${xm(u)}) / (${xm(w)})`, `(${xm(-v)}) / (${xm(-w)})`, `(${xm(v)}) / (${xm(u)})`]));
  }
  if (k === 4) {   // factores opuestos
    const A = R.int(1, 7);
    if (R.r() < 0.5) return Object.assign({ q: S.m10.fs_q(`(x² − ${A * A}) / (${A} − x)`), sol: T.s4a(A) }, choice(R, `−x − ${A}`, [`x + ${A}`, `x − ${A}`, `−x + ${A}`]));
    return Object.assign({ q: S.m10.fs_q(`(${A} − x) / (x² − ${A * A})`), sol: T.s4b(A) }, choice(R, `−1 / (x + ${A})`, [`1 / (x + ${A})`, `1 / (x − ${A})`, `−1 / (x − ${A})`]));
  }
  if (k === 5) {   // ¿dónde no existe?
    const w = R.int(0, 3);
    let den, ans, how;
    if (w === 0) { const c = rnz(R, -7, 7); den = polyHtml([1, -c, 0]); ans = [0, c]; how = T.ex[0](den, neg(c)); }
    else if (w === 1) { const c = R.int(1, 7); den = `x² − ${c * c}`; ans = [-c, c]; how = T.ex[1](den, c); }
    else if (w === 2) { let u, v; do { u = rnz(R, -6, 6); v = rnz(R, -6, 6); } while (u === v || u === -v); den = polyHtml(mulP([1, -u], [1, -v])); ans = [u, v].sort((p, q) => p - q); how = T.ex[2](den, `(${xm(u)})(${xm(v)})`, neg(u), neg(v)); }
    else { const c = rnz(R, -5, 5); den = polyHtml([1, -2 * c, c * c]); ans = [c]; how = T.ex[3](den, xm(c), neg(c)); }
    const num = xm(rnz(R, -5, 5));
    return { q: T.q5(`(${num}) / (${den})`), kind: "set", ans, hint: S.m10.set_hint, sol: how };
  }
  let q, ok, alts, sol;
  if (k === 0) { q = `(x² − ${a * a}) / (x − ${a})`; ok = `x + ${a}`; alts = [`x − ${a}`, `x`, `x² + ${a}`]; sol = S.m10.fs_s[0](a * a, a, ok); }
  else if (k === 1) { q = `(x² ${sg} ${2 * B}x + ${b * b}) / (x ${sg} ${B})`; ok = `x ${sg} ${B}`; alts = [`x ${b < 0 ? "+" : "−"} ${B}`, `(x ${sg} ${B})²`, `x + ${b * b}`]; sol = S.m10.fs_s[1](`x² ${sg} ${2 * B}x + ${b * b}`, ok, neg(-b)); }
  else { q = `(${a}x² + ${a * B}x) / (${a}x)`; ok = `x + ${B}`; alts = [`${a}x + ${B}`, `x + ${a * B}`, `x² + ${B}`]; sol = S.m10.fs_s[2](`${a}x² + ${a * B}x`, `${a}x`, ok); }
  return Object.assign({ q: S.m10.fs_q(q), sol }, choice(R, ok, alts));
});
def("m10.fa.operar", (R, S) => {
  const [a, b] = R.shuffle([1, 2, 3, 4, 5, 6]), k = R.pick([0, 1, 2, 3, 3, 4, 4, 5, 5, 6]), T = S.m10.fo_t;
  if (k === 3) {   // m.c.m. factorizando: 1/(x² − ax) ± 1/(x² − a²)
    const plus = R.r() < 0.6, f1 = `x(x − ${a})`, f2 = `(x − ${a})(x + ${a})`, den = `x(x − ${a})(x + ${a})`;
    const ok = plus ? `(2x + ${a}) / (${den})` : `${a} / (${den})`;
    return Object.assign({ q: S.m10.fo_q(`1/(x² − ${a === 1 ? "" : a}x) ${plus ? "+" : "−"} 1/(x² − ${a * a})`), sol: T.s3(f1, f2, den, `x + ${a}`, plus, a, ok) },
      choice(R, ok, plus ? [`2 / (${den})`, `(2x + ${a}) / (x(x − ${a}))`, `(2x − ${a}) / (${den})`] : [`−${a} / (${den})`, `0`, `(2x + ${a}) / (${den})`]));
  }
  if (k === 4) {   // resta con un binomio: x/(x − a) − b/(x + a)
    const num = polyHtml([1, a - b, a * b]), ok = `(${num}) / (x² − ${a * a})`;
    return Object.assign({ q: S.m10.fo_q(`x/(x − ${a}) − ${b}/(x + ${a})`), sol: T.s4(a, b, `x(x + ${a}) − ${b === 1 ? "" : b}(x − ${a})`, `x² + ${a === 1 ? "" : a}x − ${b === 1 ? "" : b}x + ${a * b}`, num, ok) },
      choice(R, ok, [`(${polyHtml([1, a - b, -a * b])}) / (x² − ${a * a})`, `(${polyHtml([1, a + b, -a * b])}) / (x² − ${a * a})`, `(x − ${b}) / (x² − ${a * a})`.replace("x − " + b + ")", polyHtml([1, -b]) + ")")]));
  }
  if (k === 5) {   // cociente: (x + a)/(x − b) : (x² − a²)/(x² − b²) = (x + b)/(x − a)
    const ok = `(x + ${b}) / (x − ${a})`;
    return Object.assign({ q: S.m10.fo_q(`(x + ${a})/(x − ${b}) ${WA.H.div} (x² − ${a * a})/(x² − ${b * b})`), sol: T.s5(a, b, ok) },
      choice(R, ok, [`(x − ${a}) / (x + ${b})`, `(x + ${a}) / (x − ${a})`, `(x + ${b}) / (x + ${a})`]));
  }
  if (k === 6) {   // producto que no da algo trivial
    const ok = `x(x − ${a})`;
    return Object.assign({ q: S.m10.fo_q(`(x² − ${a * a})/x · x²/(x + ${a})`), sol: T.s6(a, ok) },
      choice(R, ok, [`x(x + ${a})`, `x − ${a}`, `x²(x − ${a})`]));
  }
  let q, ok, alts;
  if (k === 0) { q = `1/(x − ${a}) + 1/(x − ${b})`; ok = `(2x − ${a + b}) / ((x − ${a})(x − ${b}))`; alts = [`2 / (2x − ${a + b})`, `2 / ((x − ${a})(x − ${b}))`, `(2x + ${a + b}) / ((x − ${a})(x − ${b}))`]; }
  else if (k === 1) { q = `(x + ${a})/x · x²/(x + ${a})`; ok = "x"; alts = ["x²", `x + ${a}`, "1/x"]; }
  else { const ax = a === 1 ? "x" : a + "x"; q = `${a}/x − ${b}/x²`; ok = `(${ax} − ${b}) / x²`; alts = [`${neg(a - b)}/x²`, `(${a} − ${b}) / x`, `(${ax} − ${b}) / x`]; }
  return Object.assign({ q: S.m10.fo_q(q), sol: S.m10.fo_s[k](ok, a, b) }, choice(R, ok, alts));
});

// ── Ecuaciones polinómicas ──
def("m10.ec.polinomica", (R, S) => {
  const r = R.shuffle(R.r() < 0.3 ? [-4, -3, -2, -1, 0, 1, 2, 3, 4] : [-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 3);
  const P = r.reduce((p, x) => mulP(p, [1, -x]), [1]), lst = [...r].sort((a, b) => a - b).map(neg).join(", ");
  // segundo grado con las raíces u, v: x² = k si no hay término en x; si no, la fórmula
  const quad = (u, v) => { const p = -(u + v), q = u * v, Q = polyHtml([1, p, q]);
    return p === 0 ? S.m10.ep_q0(Q, -q, Math.abs(u)) : S.m10.ep_qf(Q, neg(-p), (u - v) ** 2, Math.abs(u - v), neg(Math.max(u, v)), neg(Math.min(u, v))); };
  if (r.includes(0)) {   // sin término independiente: factor común x (Ejemplo 1 de la lección)
    const [u, v] = r.filter(x => x !== 0);
    return { q: S.m10.ep_q(polyHtml(P)), kind: "set", ans: r, hint: S.m10.set_hint, sol: S.m10.ep_s[0](polyHtml(mulP([1, -u], [1, -v])), quad(u, v), lst) };
  }
  // con término independiente: divisores, P(r) = 0 y Ruffini (Ejemplo 2 de la lección)
  const c = P[3], dv = []; for (let d = 1; d <= Math.abs(c); d++) if (c % d === 0) dv.push(d);
  const r1 = dv.flatMap(d => [d, -d]).find(d => r.includes(d)), [u, v] = r.filter(x => x !== r1);
  const ev = P.map((a, i) => a * r1 ** (3 - i)).filter(t => t !== 0).map((t, i) => i ? (t < 0 ? " − " : " + ") + Math.abs(t) : neg(t)).join("");
  const Qc = mulP([1, -u], [1, -v]);
  return { q: S.m10.ep_q(polyHtml(P)), kind: "set", ans: r, hint: S.m10.set_hint,
    sol: S.m10.ep_s[1](Math.abs(c), dv.map(d => "±" + d).join(", "), neg(r1), ev, Qc.map(neg).join(", "), polyHtml([1, -r1]), polyHtml(Qc), quad(u, v), lst) };
});

// Ecuaciones racionales (u4): segundo grado, denominadores que hay que factorizar y soluciones falsas.
const pm = c => c < 0 ? `− ${-c}` : `+ ${c}`;
const quadS = (b, c) => { const D = b * b - 4 * c, s = Math.round(Math.sqrt(D)); return `x = (${neg(-b)} ± √${D}) / 2 = (${neg(-b)} ± ${s}) / 2`; };
def("m10.ec.racional", (R, S) => {
  const T = S.m10.er_t, k = R.int(0, 2);
  if (k === 0) {   // a/x = x − b
    let u, v; do { u = rnz(R, -6, 7); v = rnz(R, -6, 7); } while (u === v || u * v >= 0);
    const b = u + v, a = u * v * -1;   // x² − bx − a = 0 con raíces u, v
    return { q: T.q(`${a}/x = ${b ? `x ${b > 0 ? "−" : "+"} ${Math.abs(b)}` : "x"}`), kind: "set", ans: [u, v], hint: S.m10.set_hint,
      sol: T.s0(a, polyHtml([1, -b, 0]), polyHtml([1, -b, -a]), quadS(-b, -a), neg(Math.max(u, v)), neg(Math.min(u, v))) };
  }
  if (k === 1) {   // x/(x − a) − c/(x + a) = k/(x² − a²), con una solución falsa (±a) y otra válida
    for (let t = 0; t < 40; t++) {
      const a = R.int(1, 5), f = R.pick([a, -a]); let s; do s = rnz(R, -6, 6); while (Math.abs(s) === a);
      const c = a + s + f, kk = c * a - s * f;
      if (!c || !kk || s === f) continue;
      const B = a - c, C = c * a - kk;   // x² + Bx + C = 0, raíces s y f
      return { q: T.q(`x/(x − ${a}) ${c > 0 ? "−" : "+"} ${Math.abs(c)}/(x + ${a}) = ${neg(kk)}/(x² − ${a * a})`), kind: "set", ans: [s], hint: S.m10.set_hint,
        sol: T.s1(a, `x(x + ${a}) ${c > 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}(x − ${a}) = ${neg(kk)}`, polyHtml([1, B, C]), quadS(B, C), neg(s), neg(f)) };
    }
    return null;
  }
  // ¿cuántas soluciones? (x² − a²)/(x − a) = m: una, o ninguna si sale el valor prohibido
  const a = R.int(1, 6), none = R.r() < 0.5; let m = 2 * a;
  if (!none) do m = a + rnz(R, -5, 5); while (m === 2 * a || m === 0);
  return { q: T.q2(`(x² − ${a * a})/(x − ${a}) = ${neg(m)}`), kind: "choice", opts: T.o2, correct: none ? 0 : 1, shuffle: false,
    sol: T.s2(a, neg(m), neg(m - a), none) };
});
// Ecuaciones irracionales (u4): aislar la raíz, dos raíces, comprobar con números, casos sin solución.
def("m10.ec.irracional", (R, S) => {
  const T = S.m10.ei_t, k = R.int(0, 2), rad = a => a === 0 ? "√x" : `√(x ${pm(a)})`;
  if (k === 0) {   // x − √(x + a) = b → x − b = √(x + a)
    const p = R.int(2, 5), b = R.int(1, 6), a = p * (p - 1) - b, x1 = b + p, x2 = b + 1 - p;
    const chk = x => { const r = Math.sqrt(x + a); return `con x = ${neg(x)}: ${neg(x)} − √${x + a} = ${neg(x)} − ${r} = ${neg(x - r)}${x - r === b ? ", vale" : `, que no es ${b}: no vale`}`; };
    return { q: T.q(`x − ${rad(a)} = ${b}`), kind: "set", ans: [x1], hint: S.m10.set_hint,
      sol: T.s0(`x − ${b} = ${rad(a)}`, `(x − ${b})² = x ${pm(a)}`.replace(" + 0", ""), polyHtml([1, -(2 * b + 1), b * b - a]), quadS(-(2 * b + 1), b * b - a), neg(Math.max(x1, x2)), neg(Math.min(x1, x2)), chk(x1) + "; " + chk(x2), neg(x1)) };
  }
  if (k === 1) {   // √(x + a) − √x = c
    const c = R.int(1, 3), m = R.int(1, 6), a = c * c + 2 * c * m;
    return { q: T.q(`√(x + ${a}) − √x = ${c}`), kind: "set", ans: [m * m], hint: S.m10.set_hint, sol: T.s1(a, c, c * c, 2 * c, a - c * c, m, m * m, m + c) };
  }
  const a = R.int(-4, 9), c = R.int(1, 8), d = R.int(0, 9), r = d - c;   // √(x + a) + c = d
  if (r < 0) return { q: T.q2(`${rad(a)} + ${c} = ${d}`), kind: "choice", opts: T.o2, correct: 0, shuffle: false, sol: T.s2n(`${rad(a)} = ${d} − ${c} = ${neg(r)}`) };
  return { q: T.q2(`${rad(a)} + ${c} = ${d}`), kind: "choice", opts: T.o2, correct: 1, shuffle: false, sol: T.s2u(`${rad(a)} = ${d} − ${c} = ${r}`, `x ${pm(a)} = ${r * r}`.replace(" + 0", ""), neg(r * r - a)) };
});
// Ecuaciones exponenciales y logarítmicas (u4): tomar logaritmos (decimal), logarítmicas con solución falsa, interés, cambio de variable.
def("m10.ec.exp", (R, S, H) => {
  const T = S.m10.ex_t, k = R.int(0, 3), L = x => H.dec(Math.round(Math.log10(x) * 100000) / 100000);
  if (k === 0) {
    for (let t = 0; t < 30; t++) {
      const b = R.pick([2, 3, 5, 1.05, 1.08, 1.5, 1.2]), a = R.pick([1, 2, 3, 4, 5]), q = R.pick([3, 5, 6, 7, 10, 12, 15, 20, 30, 50]);
      if (q <= a || Number.isInteger(Math.log(q) / Math.log(b))) continue;
      const c = a * q, v = Math.log(q) / Math.log(b);
      if (v > 60) continue;
      return { q: T.q0(`${a === 1 ? "" : a + " · "}${H.dec(b)}<sup>x</sup> = ${c}`), kind: "num", ans: Math.round(v * 100) / 100, tol: 0.011,
        sol: T.s0(a, H.dec(b), c, q, L(q), L(b), H.dec(Math.round(v * 100) / 100)) };
    }
    return null;
  }
  if (k === 1) {   // log x + log (x − a) = log b
    let r, s; do { r = R.int(3, 10); s = R.int(1, r - 1); } while (r * s > 90);
    const a = r - s, b = r * s, rhs = b === 10 ? "1" : `log ${b}`;
    return { q: T.q(`log x + log (x − ${a}) = ${rhs}`), kind: "int", ans: r, sol: T.s1(a, b, rhs === "1", polyHtml([1, -a, -b]), quadS(-a, -b), r, -s) };
  }
  if (k === 2) {   // interés compuesto: años completos para superar una cantidad
    for (let t = 0; t < 30; t++) {
      const C = R.pick([500, 1000, 2000, 3000, 5000]), i = R.pick([2, 3, 4, 5, 6, 8]), f = R.pick([1.2, 1.5, 2, 1.3, 1.8]);
      const D = C * f, v = Math.log(f) / Math.log(1 + i / 100), n = Math.ceil(v);
      if (n - v < 0.05 || n - v > 0.95) continue;
      return { q: T.q2(C, i, D), kind: "int", ans: n, sol: T.s2(C, i, H.dec(1 + i / 100), D, H.dec(f), L(f), L(1 + i / 100), H.dec(Math.round(v * 100) / 100), n) };
    }
    return null;
  }
  // cambio de variable: b^(2x) − p·b^x + q = 0
  const b = R.pick([2, 3]), [e1, e2] = R.shuffle([0, 1, 2, 3].filter(e => b ** e <= 27)).slice(0, 2), neg2 = R.r() < 0.3;
  const t1 = b ** e1, t2 = neg2 ? -R.int(1, 5) : b ** e2, p = t1 + t2, q = t1 * t2;
  if (!p) return null;
  const eq = `${b * b}<sup>x</sup> ${p < 0 ? "+" : "−"} ${Math.abs(p) === 1 ? "" : Math.abs(p) + " · "}${b}<sup>x</sup> ${q < 0 ? "−" : "+"} ${Math.abs(q)} = 0`;
  const sols = neg2 ? [e1] : [e1, e2];
  return { q: T.q(eq), kind: "set", ans: sols, hint: S.m10.set_hint, sol: T.s3(b, b * b, polyHtml([1, -p, q], "t"), t1, t2, e1, neg2 ? null : e2, sols.map(neg).join(", ")) };
});
// ── Inecuaciones (u5) ──
const FLIP = { "<": ">", ">": "<", "≤": "≥", "≥": "≤" };
const ivOf = (op, v) => op === "<" ? `(−∞, ${v})` : op === "≤" ? `(−∞, ${v}]` : op === ">" ? `(${v}, +∞)` : `[${v}, +∞)`;
const ivOpts = (R, op, v) => { const all = ["<", "≤", ">", "≥"].map(o => ivOf(o, v)), ok = ivOf(op, v), opts = R.shuffle(all); return { kind: "choice", opts, correct: opts.indexOf(ok) }; };
const esc = s => s.replace(/</g, "&lt;");
def("m10.inec1", (R, S, H) => {
  const T = S.m10.i1_t, k = R.int(0, 3);
  if (k === 0) {   // agrupar, a veces con coeficiente negativo
    let a, c; do { a = rnz(R, -6, 6); c = rnz(R, -6, 6); } while (a === c);
    const A = a - c, v = R.int(-6, 8), b = R.int(-9, 9), d = A * v + b, op = R.pick(["<", "≤", ">", "≥"]);
    const fop = A < 0 ? FLIP[op] : op, lhs = `${lin(a, b)}`, rhs = `${lin(c, d)}`;
    const cx = n => (Math.abs(n) === 1 ? "" : Math.abs(n)) + "x";
    const grp = `${a < 0 ? "−" : ""}${cx(a)} ${c < 0 ? "+" : "−"} ${cx(c)} ${op} ${neg(d)} ${b < 0 ? "+" : "−"} ${Math.abs(b)}`;
    const step = A === 1 ? "" : `${A === -1 ? "−" : neg(A)}x ${op} ${neg(A * v)} → `;
    return Object.assign({ q: T.q(esc(`${lhs} ${op} ${rhs}`)), sol: T.s0(esc(grp), esc(`${step}x ${fop} ${neg(v)}`), A < 0 ? neg(A) : "", esc(ivOf(fop, neg(v)))) }, ivOpts(R, fop, neg(v)));
  }
  if (k === 1) {   // con denominadores: (x − a)/p − (x + b)/q ≥ c
    for (let t = 0; t < 40; t++) {
      const [p, q] = R.pick([[2, 3], [3, 2], [2, 5], [3, 4], [4, 3], [2, 4], [6, 4]]), Lc = p * q / gcd(p, q), a = R.int(1, 6), b = R.int(1, 6);
      const A = Lc / p - Lc / q, B = -(Lc / p) * a - (Lc / q) * b, v = R.int(-5, 12), op = R.pick(["<", "≤", ">", "≥"]);
      if (!A || (A * v + B) % Lc) continue;
      const c = (A * v + B) / Lc, fop = A < 0 ? FLIP[op] : op;
      const ex = `${Lc / p === 1 ? "" : Lc / p}(x − ${a}) − ${Lc / q === 1 ? "" : Lc / q}(x + ${b}) ${op} ${neg(Lc * c)}`;
      const dev = `${polyHtml([A, B])} ${op} ${neg(Lc * c)}`;
      return Object.assign({ q: T.q(esc(`(x − ${a})/${p} − (x + ${b})/${q} ${op} ${neg(c)}`)), sol: T.s1(Lc, esc(ex), esc(dev), esc(`${A === 1 ? "" : `${A === -1 ? "−" : neg(A)}x ${op} ${neg(A * v)} → `}x ${fop} ${neg(v)}`), A < 0, esc(ivOf(fop, neg(v)))) }, ivOpts(R, fop, neg(v)));
    }
    return null;
  }
  if (k === 2) {   // casos extremos: k(x + a) op kx + b
    const kk = R.int(2, 5), a = rnz(R, -4, 4), b = R.int(-9, 9), op = R.pick([">", "<", "≥", "≤"]), L = kk * a;
    if (L === b) return null;
    const truth = op === ">" ? L > b : op === "<" ? L < b : op === "≥" ? L >= b : L <= b;
    const opts = [T.none, T.all, esc(ivOf(op, neg(b - L))), esc(ivOf(FLIP[op], "0"))];
    return { q: T.q(esc(`${kk}(x ${a < 0 ? "−" : "+"} ${Math.abs(a)}) ${op} ${kk}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}`)), kind: "choice", opts, correct: truth ? 1 : 0, shuffle: false,
      sol: T.s2(esc(`${kk}x ${L < 0 ? "−" : "+"} ${Math.abs(L)} ${op} ${kk}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}`), esc(`${neg(L)} ${op} ${neg(b)}`), truth) };
  }
  // dos tarifas: ¿a partir de cuántas unidades conviene la segunda?
  for (let t = 0; t < 40; t++) {
    const p = R.pick([0.5, 0.6, 0.8, 1, 1.2, 1.5, 2]), q = R.pick([0.2, 0.3, 0.4, 0.5, 0.6, 1]), A = R.pick([10, 12, 15, 20, 25]), x0 = R.pick([20, 25, 30, 40, 50, 60, 75, 80, 100]);
    if (q >= p || q === 1 || Math.abs(p - q - 1) < 1e-9) continue;
    const B = Math.round((A + (p - q) * x0) * 100) / 100;
    if (!Number.isInteger(B) || B > 120) continue;
    const ctx = R.pick(T.ctx);
    return { q: T.q3(ctx, A, H.dec(p), B, H.dec(q)), kind: "int", ans: x0, sol: T.s3(ctx, B, H.dec(q), A, H.dec(p), B - A, H.dec(Math.round((p - q) * 100) / 100), x0) };
  }
  return null;
});
def("m10.inec2", (R, S) => {
  const T = S.m10.i2_t, k = R.pick([0, 0, 1, 2, 3, 3]);
  const iv = (r1, r2, inside, inc) => inside ? `${inc ? "[" : "("}${neg(r1)}, ${neg(r2)}${inc ? "]" : ")"}` : `(−∞, ${neg(r1)}${inc ? "]" : ")"} ∪ ${inc ? "[" : "("}${neg(r2)}, +∞)`;
  const four = (R, r1, r2, ok) => { const o = R.shuffle([iv(r1, r2, true, false), iv(r1, r2, true, true), iv(r1, r2, false, false), iv(r1, r2, false, true)]); return { kind: "choice", opts: o, correct: o.indexOf(ok) }; };
  if (k === 0 || k === 3) {   // a > 0 (k = 3) o a < 0 (k = 0), dos raíces enteras
    let r1, r2; do { r1 = R.int(-6, 5); r2 = R.int(-5, 7); } while (r1 >= r2);
    const B = -(r1 + r2), C = r1 * r2, op = R.pick(["<", "≤", ">", "≥"]), inc = op.length === 1 && (op === "≤" || op === "≥");
    const t0 = C !== 0 ? 0 : Math.floor((r1 + r2) / 2) === r1 || Math.floor((r1 + r2) / 2) === r2 ? r2 + 1 : Math.floor((r1 + r2) / 2);
    const val = t0 * t0 + B * t0 + C, tin = t0 > r1 && t0 < r2;
    if (k === 3) {
      const less = op === "<" || op === "≤", ok = iv(r1, r2, less, inc);
      return Object.assign({ q: T.q(esc(`${polyHtml([1, B, C])} ${op} 0`)), sol: T.s3(polyHtml([1, B, C]), quadS(B, C), neg(r1), neg(r2), `(${xm2(r1)})(${xm2(r2)})`, neg(t0), val, tin, op === "<" || op === "≤", inc, esc(op), ok) }, four(R, r1, r2, ok));
    }
    const fop = FLIP[op], less = fop === "<" || fop === "≤", ok = iv(r1, r2, less, inc);
    return Object.assign({ q: T.q(esc(`${polyHtml([-1, -B, -C])} ${op} 0`)), sol: T.s0(esc(`${polyHtml([1, B, C])} ${fop} 0`), quadS(B, C), neg(r1), neg(r2), less, inc, ok) }, four(R, r1, r2, ok));
  }
  if (k === 1) {   // discriminante negativo
    const b = R.int(-4, 4); let c; do c = R.int(1, 9); while (b * b - 4 * c >= 0);
    const op = R.pick(["<", "≤", ">", "≥"]), pos = op === ">" || op === "≥";
    return { q: T.q(esc(`${polyHtml([1, b, c])} ${op} 0`)), kind: "choice", opts: T.o1, correct: pos ? 1 : 0, shuffle: false, sol: T.s1(polyHtml([1, b, c]), b * b - 4 * c, pos) };
  }
  // raíz doble: (x − r)² op 0
  const r = rnz(R, -5, 5), op = R.pick(["<", "≤", ">", "≥"]), P = polyHtml([1, -2 * r, r * r]);
  const opts = [T.o2[0](neg(r)), T.o2[1], T.o2[2], T.o2[3](neg(r))], c = { ">": 0, "≥": 1, "<": 2, "≤": 3 }[op];
  return { q: T.q(esc(`${P} ${op} 0`)), kind: "choice", opts, correct: c, shuffle: false, sol: T.s2(P, xm2(r), neg(r), c) };
});
const xm2 = r => r === 0 ? "x" : r > 0 ? `x − ${r}` : `x + ${-r}`;
// Sistemas no lineales (u5): las soluciones son parejas (x, y).
def("m10.sis.nolineal", (R, S) => {
  const T = S.m10.nl_t, k = R.int(0, 3), P2 = (x, y) => pt(x, y), two = (a, b) => `${a} ${T.y} ${b}`;
  if (k === 0) {   // recta y parábola
    let u, v; do { u = R.int(-4, 4); v = R.int(-4, 4); } while (u >= v);
    const m = R.int(-3, 3), n = R.int(-4, 4), p = m - (u + v), q = n + u * v;
    const yu = m * u + n, yv = m * v + n, ok = two(P2(u, yu), P2(v, yv));
    const alts = [two(P2(yu, u), P2(yv, v)), T.xs(neg(u), neg(v)), P2(v, yv), T.none];
    const rect = m === 0 ? neg(n) : lin(m, n);
    return Object.assign({ q: T.q(`y = ${polyHtml([1, p, q])}`, `y = ${rect}`), sol: T.s0(polyHtml([1, p, q]), rect, polyHtml([1, p - m, q - n]), quadS(p - m, q - n), neg(u), neg(v), rect, ok) }, choice4(R, ok, alts));
  }
  if (k === 1) {   // circunferencia de radio 5 y recta x ± y = c
    const pts = [[3, 4], [4, 3], [-3, 4], [-4, 3], [3, -4], [4, -3], [-3, -4], [-4, -3], [5, 0], [-5, 0], [0, 5], [0, -5]];
    const s = R.pick([1, -1]), pairs = [];
    pts.forEach((A, i) => pts.forEach((B, j) => { if (i < j && A[0] + s * A[1] === B[0] + s * B[1]) pairs.push([A, B]); }));
    const [A, B] = R.pick(pairs), c = A[0] + s * A[1], [P1, Q1] = A[0] < B[0] ? [A, B] : [B, A];
    const ok = two(P2(...P1), P2(...Q1)), alts = [two(P2(P1[1], P1[0]), P2(Q1[1], Q1[0])), T.xs(neg(P1[0]), neg(Q1[0])), P2(...P1), T.none];
    const line = `x ${s > 0 ? "+" : "−"} y = ${neg(c)}`, ys = s > 0 ? `y = ${c === 0 ? "−x" : `${neg(c)} − x`}` : `y = ${lin(1, -c)}`;
    const sub = s > 0 ? `x² + (${neg(c)} − x)² = 25` : `x² + (${lin(1, -c)})² = 25`;
    return Object.assign({ q: T.q(`x² + y² = 25`, line), sol: T.s1(ys, sub, polyHtml([2, -2 * c, c * c - 25]), polyHtml([1, -c, (c * c - 25) / 2]), neg(P1[0]), neg(Q1[0]), ok) }, choice4(R, ok, alts));
  }
  if (k === 2) {   // sin solución: la recta no corta a la parábola
    const m = R.int(-2, 2), n = R.int(-3, 3); let p; do p = R.int(-3, 6); while (m * m - 4 * (p - n) >= 0);
    const rect = m === 0 ? neg(n) : lin(m, n), Q = polyHtml([1, -m, p - n]);
    const fake = R.int(-3, 3);
    return Object.assign({ q: T.q(`y = ${polyHtml([1, 0, p])}`, `y = ${rect}`), sol: T.s2(polyHtml([1, 0, p]), rect, Q, m * m - 4 * (p - n)) },
      choice4(R, T.none, [two(P2(fake, fake * fake + p), P2(fake + 1, (fake + 1) ** 2 + p)), T.xs(neg(fake), neg(fake + 1)), P2(0, p)]));
  }
  // suma y producto: x + y = s, xy = p
  let u, v; do { u = R.int(1, 9); v = R.int(1, 9); } while (u >= v);
  const s = u + v, p = u * v, ok = two(P2(u, v), P2(v, u));
  return Object.assign({ q: T.q(`x + y = ${s}`, `x · y = ${p}`), sol: T.s3(s, p, polyHtml([1, -s, p]), quadS(-s, p), u, v, ok) }, choice4(R, ok, [P2(u, v), T.xs(u, v), two(P2(u, v), P2(-u, -v)), T.none]));
});
const setKey = s => s.split(" y ").sort().join("|");
const choice4 = (R, ok, alts) => { const o = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok && setKey(x) !== setKey(ok)).slice(0, 3)]); return { kind: "choice", opts: o, correct: o.indexOf(ok) }; };
// ── Inecuaciones: sistemas ──
def("m10.sisinec", (R, S) => {
  const T = S.m10.sx_t, kk = R.int(0, 2);
  if (kk === 1) {   // una incógnita: intersección de intervalos (a veces vacía)
    const p = R.int(-4, 4), q = p + R.pick([-3, -1, 2, 3, 4, 5]), a1 = R.int(2, 4), b1 = R.int(-5, 5), c1 = a1 * p + b1, b2 = R.int(1, 6), c2 = q + b2;
    const sA = R.pick([">", "≥"]), sB = R.pick(["<", "≤"]);
    const e1 = `${a1}x ${b1 < 0 ? "−" : "+"} ${Math.abs(b1)} ${sA} ${neg(c1)}`.replace(" + 0", "").replace(" − 0", ""), e2 = `x + ${b2} ${sB} ${neg(c2)}`;
    const ok = q > p ? `${sA === "≥" ? "[" : "("}${neg(p)}, ${neg(q)}${sB === "≤" ? "]" : ")"}` : T.none;
    const alts = [q > p ? `${sA === "≥" ? "(" : "["}${neg(p)}, ${neg(q)}${sB === "≤" ? ")" : "]"}` : `${sB === "≤" ? "[" : "("}${neg(q)}, ${neg(p)}${sA === "≥" ? "]" : ")"}`, ivOf(sA, neg(p)), ivOf(sB, neg(q)), T.none];
    return Object.assign({ q: T.q1(esc(e1), esc(e2)), sol: T.s1(esc(`${a1}x ${sA} ${neg(c1 - b1)}`), esc(`x ${sA} ${neg(p)}`), esc(`x ${sB} ${neg(q)}`), q > p, esc(ok)) }, choice4(R, esc(ok), alts.map(esc)));
  }
  if (kk === 2) {   // vértice: punto de corte de dos rectas que limitan la región
    let x0, y0, a, b; do { x0 = R.int(0, 6); y0 = R.int(0, 6); a = R.int(1, 3); b = R.int(2, 4); } while (a === b || x0 + y0 === 0);
    const c1 = x0 + y0, c2 = a * x0 + b * y0;
    const ok = pt(x0, y0);
    const cy = n => n === 1 ? "y" : n === -1 ? "−y" : neg(n) + "y";
    return Object.assign({ q: T.q2(`x + y = ${c1}`, `${a === 1 ? "" : a}x + ${b}y = ${c2}`), sol: T.s2(a, b, c1, c2, a === 1 ? `${cy(b - 1)} = ${neg(c2 - c1)}` : `(${a}x + ${b}y) − ${a}(x + y) = ${c2} − ${a * c1}, es decir, ${cy(b - a)} = ${neg(c2 - a * c1)}`, y0, `x = ${c1} − ${y0} = ${x0}`, ok) },
      choice4(R, ok, [pt(y0, x0), pt(x0, c1), pt(x0 + 1, y0 - 1)]));
  }
  const a = R.int(-2, 3), b = R.int(1, 5), c = R.int(-3, 2);
  const ok1 = (x, y) => y <= a * x + b, ok2 = (x, y) => y >= c;
  const pts = [];
  for (let t = 0; t < 60 && pts.length < 4; t++) {
    const x = R.int(-4, 4), y = R.int(-5, 6), good = ok1(x, y) && ok2(x, y);
    if (pts.some(p => p[0] === x && p[1] === y)) continue;
    if (good && pts.filter(p => p[2]).length === 0 || !good && pts.filter(p => !p[2]).length < 3) pts.push([x, y, good]);
  }
  if (pts.length < 4) return null;
  const opts = R.shuffle(pts.map(p => pt(p[0], p[1]))), good = pts.find(p => p[2]), bad = pts.find(p => !p[2]);
  const r1 = (x, y) => `${neg(y)} ≤ ${a === 0 ? neg(b) : `${a === 1 ? "" : a === -1 ? "−" : neg(a) + " · "}${x < 0 && a !== 1 && a !== -1 ? `(${neg(x)})` : a === 1 || a === -1 ? (x < 0 ? `(${neg(x)})` : x) : x} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${neg(a * x + b)}`}`;
  const r2 = y => `${neg(y)} ≥ ${neg(c)}`;
  const why = ok1(bad[0], bad[1]) ? `${r2(bad[1])} ✗` : `${r1(bad[0], bad[1])} ✗`;
  return { q: S.m10.si_q(`y ≤ ${a === 0 ? neg(b) : lin(a, b)}`, `y ≥ ${neg(c)}`), kind: "choice", opts, correct: opts.indexOf(pt(good[0], good[1])),
    sol: S.m10.si_s(pt(good[0], good[1]), `${r1(good[0], good[1])} ✓ y ${r2(good[1])} ✓`, pt(bad[0], bad[1]), why) };
});

// ── Trigonometría ──
def("m10.tr.razones", (R, S) => {
  const T = S.m10.tz_t, [p, q, h] = R.pick(TRIP), k = R.int(1, 2), mode = R.int(0, 2), beta = R.r() < 0.4;
  const a = p * k, b = q * k, c = h * k;   // catetos a, b e hipotenusa c
  const [o, t] = beta ? [b, a] : [a, b];   // opuesto y contiguo del ángulo pedido
  const fr = (x, y) => { const f = F.make(x, y); return f[0] === x ? `${x}/${y}` : `${x}/${y} = ${f[0]}/${f[1]}`; };
  const pre = mode === 0 ? "" : mode === 1 ? T.hip(a, b, a * a + b * b, c) : T.cat(c, beta ? b : a, beta ? a : b, c * c - (beta ? b : a) ** 2);
  const q0 = mode === 0 ? T.q[0](a, b, c, o) : mode === 1 ? T.q[1](a, b, o) : T.q[2](c, beta ? b : a, o);
  return { q: q0, kind: "fields", fields: [{ label: "sen α", kind: "frac", ans: F.make(o, c) }, { label: "cos α", kind: "frac", ans: F.make(t, c) }, { label: "tg α", kind: "frac", ans: F.make(o, t) }],
    sol: pre + T.s(fr(o, c), fr(t, c), fr(o, t)) };
});
def("m10.tr.relaciones", (R, S, H) => {
  const T = S.m10.tl_t, u = R.r();
  if (u < 0.45) {   // dato: seno o coseno (terna pitagórica), con la resta y la raíz escritas
    const [a, b, c] = R.pick(TRIP), sinGiven = R.r() < 0.5, g = sinGiven ? a : b, w = sinGiven ? b : a;
    return { q: S.m10.tl_q(sinGiven ? "sen" : "cos", `${g}/${c}`), kind: "fields",
      fields: [{ label: sinGiven ? "cos α" : "sen α", kind: "frac", ans: F.make(w, c) }, { label: "tg α", kind: "frac", ans: F.make(a, b) }],
      sol: T.s0(sinGiven ? "cos" : "sen", `${g}/${c}`, g * g, c * c, w * w, w, c, `(${a}/${c}) ${WA.H.div} (${b}/${c}) = ${a}/${b}`) };
  }
  if (u < 0.7) {   // dato: la tangente
    const [a, b, c] = R.pick(TRIP);
    return { q: S.m10.tl_q("tg", `${a}/${b}`), kind: "fields", fields: [{ label: "sen α", kind: "frac", ans: F.make(a, c) }, { label: "cos α", kind: "frac", ans: F.make(b, c) }],
      sol: T.s1(a, b, a * a, b * b, c * c, c) };
  }
  if (u < 0.85) {   // dato que no es de una terna: sale una raíz
    const n = R.pick([2, 3, 4, 5]), sinGiven = R.r() < 0.5, m = n * n - 1, rt = { 3: "√3", 8: "2√2", 15: "√15", 24: "2√6" }[m];
    const ok = `${rt}/${n}`, opts = R.shuffle([ok, `${m}/${n * n}`, `√${m}`, `${n - 1}/${n}`]);
    return { q: T.q2(sinGiven ? "sen" : "cos", `1/${n}`, sinGiven ? "cos" : "sen"), kind: "choice", opts, correct: opts.indexOf(ok),
      sol: T.s2(sinGiven ? "cos" : "sen", `1/${n}`, n * n, m, rt === `√${m}` ? `√${m}/${n}` : `√${m}/${n} = ${ok}`) };
  }
  const A = R.int(10, 80), f = R.pick(["sen", "cos"]), g = f === "sen" ? "cos" : "sen", v = Math.round((f === "sen" ? Math.sin(A * Math.PI / 180) : Math.cos(A * Math.PI / 180)) * 1000) / 1000;
  return { q: T.q3(f, A, H.dec(v), g, 90 - A), kind: "num", ans: v, tol: 0.0006, sol: T.s3(A, 90 - A, g, f, H.dec(v)) };
});
def("m10.tr.resolver", (R, S, H) => {
  const T = S.m10.tv_t, k = R.int(0, 6), rad = x => x * Math.PI / 180, f2 = x => (Math.round(x * 100) / 100).toFixed(2).replace(".", WA.H.ds), f1 = x => (Math.round(x * 10) / 10).toFixed(1).replace(".", WA.H.ds);
  if (k === 0) { const h = R.int(6, 24) / 2, A = R.int(55, 80), v = rd(h * Math.sin(rad(A))); return { q: T.q[0](H.dec(h), A), kind: "num", ans: v, tol: 0.011, sol: T.s[0](H.dec(h), A, f2(v)) }; }
  if (k === 1) { const c = R.int(8, 60), A = R.int(15, 70), v = rd(c * Math.tan(rad(A))); return { q: T.q[1](c, A), kind: "num", ans: v, tol: 0.011, sol: T.s[1](c, A, f2(v)) }; }
  if (k === 2) { const a = R.int(3, 20), b = R.int(3, 20), ang = rd(Math.atan(a / b) * 180 / Math.PI, 1); return { q: T.q[2](a, b), kind: "num", ans: ang, tol: 0.06, sol: T.s[2](a, b, f1(ang)) }; }
  if (k === 3) { const c = R.int(5, 20), A = R.int(20, 70), cs = Math.cos(rad(A)), v = rd(c / cs); return { q: T.q[3](c, A), kind: "num", ans: v, tol: 0.011, sol: T.s[3](c, A, H.dec(Math.round(cs * 10000) / 10000), f2(v)) }; }
  if (k === 4) { const h = R.int(4, 24) * 5, A = R.int(5, 35), tg = Math.tan(rad(A)), v = rd(h / tg); return { q: T.q[4](h, A), kind: "num", ans: v, tol: 0.011, sol: T.s[4](h, A, H.dec(Math.round(tg * 10000) / 10000), f2(v)) }; }
  if (k === 5) { const p = R.int(3, 25), ang = rd(Math.atan(p / 100) * 180 / Math.PI, 1); return { q: T.q[5](p), kind: "num", ans: ang, tol: 0.06, sol: T.s[5](p, H.dec(p / 100), f1(ang)) }; }
  let h, o; do { h = R.int(5, 20); o = R.int(2, 19); } while (o >= h);
  const ang = rd(Math.asin(o / h) * 180 / Math.PI, 1);
  return { q: T.q[6](h, o), kind: "num", ans: ang, tol: 0.06, sol: T.s[6](h, o, H.dec(Math.round(o / h * 10000) / 10000), f1(ang)) };
});
// Triángulos no rectángulos (u6.oblicuangulos): la estrategia de la altura, el área con ángulo obtuso y dos observadores.
def("m10.tr.oblicuo", (R, S, H) => {
  const T = S.m10.ob_t, k = R.int(0, 2), rad = x => x * Math.PI / 180, f2 = x => (Math.round(x * 100) / 100).toFixed(2).replace(".", WA.H.ds), f1 = x => (Math.round(x * 10) / 10).toFixed(1).replace(".", WA.H.ds);
  if (k === 0) {
    for (let t = 0; t < 40; t++) {
      const b = R.int(6, 20), c = R.int(8, 24), A = R.int(30, 75), h = b * Math.sin(rad(A)), AH = b * Math.cos(rad(A)), HB = c - AH;
      if (HB < 1) continue;
      const h2 = Math.round(h * 100) / 100, AH2 = Math.round(AH * 100) / 100, HB2 = Math.round((c - AH2) * 100) / 100, a = Math.sqrt(h * h + HB * HB);
      return { q: T.q0(b, c, A), kind: "num", ans: rd(a), tol: 0.03, sol: T.s0(b, A, f2(h2), f2(AH2), c, f2(HB2), f2(rd(a))) };
    }
    return null;
  }
  if (k === 1) {
    const a = R.int(4, 15), b = R.int(3, 12), C = R.pick([R.int(95, 160), R.int(25, 80)]), obt = C > 90, ref = obt ? 180 - C : C, s = Math.round(Math.sin(rad(ref)) * 10000) / 10000, v = rd(a * b * s / 2);
    return { q: T.q1(a, b, C), kind: "num", ans: v, tol: 0.011, sol: T.s1(a, b, C, ref, H.dec(s), f2(v), obt) };
  }
  const d = R.int(6, 20) * 10, al = R.int(25, 60), be = R.int(30, 70), ta = Math.tan(rad(al)), tb = Math.tan(rad(be));
  const x = d * ta / (ta + tb), hh = x * tb;
  return { q: T.q2(d, al, be), kind: "num", ans: rd(hh, 1), tol: 0.11, sol: T.s2(d, al, be, H.dec(Math.round(ta * 1000) / 1000), H.dec(Math.round(tb * 1000) / 1000), f2(x), f1(hh)) };
});
// Radianes (u6.radianes): grados con decimales, arcos y sectores (lo que usa FyQ en el movimiento circular).
def("m10.tr.arco", (R, S, H) => {
  const T = S.m10.ar_t, k = R.int(0, 3), f1 = x => (Math.round(x * 10) / 10).toFixed(1).replace(".", WA.H.ds), f2 = x => (Math.round(x * 100) / 100).toFixed(2).replace(".", WA.H.ds);
  const piF = (num, den) => { const g = gcd(num, den), n = num / g, m = den / g; return `${n === 1 ? "" : n}π${m === 1 ? "" : "/" + m}`; };
  if (k === 0) { const th = R.int(5, 40) / 10, v = th * 180 / Math.PI; return { q: T.q0(H.dec(th)), kind: "num", ans: rd(v, 1), tol: 0.06, sol: T.s0(H.dec(th), f1(v)) }; }
  if (k === 1) {
    const r = R.int(2, 15), den = R.pick([2, 3, 4, 6]); let num; do num = R.int(1, 2 * den - 1); while (gcd(num, den) !== 1);
    const L = r * num * Math.PI / den;
    return { q: T.q1(r, piF(num, den)), kind: "num", ans: rd(L), tol: 0.011, sol: T.s1(r, piF(num, den), piF(r * num, den), f2(L)) };
  }
  if (k === 2) { const r = R.int(2, 12), th = R.int(3, 25) / 10, A = r * r * th / 2; return { q: T.q2(r, H.dec(th)), kind: "num", ans: rd(A), tol: 0.011, sol: T.s2(r, H.dec(th), r * r, f2(A)) }; }
  const r = R.int(2, 15), deg = R.pick([30, 45, 60, 90, 120, 135, 150, 210, 240, 270, 300]), L = r * deg * Math.PI / 180;
  return { q: T.q3(r, deg), kind: "num", ans: rd(L), tol: 0.011, sol: T.s3(deg, piF(deg, 180), r, piF(r * deg, 180), f2(L)) };
});

// ── Semejanza en el triángulo rectángulo (u6.semejanza): teoremas de la altura y del cateto ──
def("m10.tr.altura", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) {
    const h = R.int(2, 12), ds = []; for (let m = 1; m < h; m++) if (h * h % m === 0 && h * h / m <= 60) ds.push(m);
    if (!ds.length) return null;
    const m = R.pick(ds), n = h * h / m;
    return { q: S.m10.al_q[0](m, n), kind: "int", ans: h, sol: S.m10.al_s[0](m, n, h * h, h) };
  }
  if (k === 1) {
    const c = R.int(6, 25), m = R.int(2, c - 2), v = Math.sqrt(c * m), r = rd(v);
    return { q: S.m10.al_q[1](c, m), kind: "num", ans: r, tol: 0.011, sol: S.m10.al_s[1](c, m, c * m, Number.isInteger(v) ? String(v) : "≈ " + H.dec(r)) };
  }
  if (k === 2) {
    const c = R.int(5, 20), b = R.int(2, c - 1), r = rd(b * b / c);
    return { q: S.m10.al_q[2](b, c), kind: "num", ans: r, tol: 0.011, sol: S.m10.al_s[2](b, c, b * b, (b * b) % c === 0 ? String(b * b / c) : "≈ " + H.dec(r)) };
  }
  const kk = R.int(2, 5), vol = R.r() < 0.4;
  return { q: S.m10.al_q[3](vol ? kk ** 3 : kk * kk, vol), kind: "int", ans: kk, sol: S.m10.al_s[3](vol ? kk ** 3 : kk * kk, vol, kk) };
});

// ── Trigonometría: valores exactos y circunferencia goniométrica ──
// Escuadras: [opuesto, contiguo, hipotenusa] respecto del ángulo, y el valor exacto de cada razón (ya racionalizado).
const ESC = { 30: ["1", "√3", "2"], 45: ["1", "1", "√2"], 60: ["√3", "1", "2"] };
const EXV = { 30: { sen: "1/2", cos: "√3/2", tg: "√3/3" }, 45: { sen: "√2/2", cos: "√2/2", tg: "1" }, 60: { sen: "√3/2", cos: "1/2", tg: "√3" } };
const EXF = { 30: { sen: "1/2", cos: "√3/2", tg: "1/√3" }, 45: { sen: "1/√2", cos: "1/√2", tg: "1/1" }, 60: { sen: "√3/2", cos: "1/2", tg: "√3/1" } };
const EXALL = ["1/2", "√2/2", "√3/2", "√3/3", "1", "√3"];
def("m10.tr.notables", (R, S) => {
  const a = R.pick([30, 45, 60]), f = R.pick(["sen", "cos", "tg"]), ok = EXV[a][f];
  if (R.r() < 0.6) {
    const opts = R.shuffle([ok, ...R.shuffle(EXALL.filter(x => x !== ok)).slice(0, 3)]);
    return { q: S.m10.nt_q[0](f, a), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m10.nt_s[0](f, a, ESC[a], EXF[a][f], ok) };
  }
  const opts = ["30°", "45°", "60°"];
  return { q: S.m10.nt_q[1](f, ok), kind: "choice", opts, correct: opts.indexOf(a + "°"), shuffle: false, sol: S.m10.nt_s[1](f, ok, a) };
});
// Ángulo → cuadrante (1–4) o eje; ángulo de referencia con el eje X y cómo se escribe.
const quadInfo = a => { const t = ((a % 360) + 360) % 360;
  if (t % 90 === 0) return { axis: true, t };
  if (t < 90) return { q: 1, ref: t, how: "" };
  if (t < 180) return { q: 2, ref: 180 - t, how: `${t}° = 180° − ${180 - t}°` };
  if (t < 270) return { q: 3, ref: t - 180, how: `${t}° = 180° + ${t - 180}°` };
  return { q: 4, ref: 360 - t, how: `${t}° = 360° − ${360 - t}°` }; };
const SG = { sen: [1, 1, -1, -1], cos: [1, -1, -1, 1], tg: [1, -1, 1, -1] };
const AX = { 0: [1, 0], 90: [0, 1], 180: [-1, 0], 270: [0, -1] };
def("m10.tr.exacto", (R, S) => {
  const f = R.pick(["sen", "cos", "tg"]);
  const a = R.r() < 0.2 ? R.pick([90, 180, 270, 0]) : R.pick([120, 135, 150, 210, 225, 240, 300, 315, 330, 30, 45, 60]);
  const I = quadInfo(a);
  let ok, sol;
  if (I.axis) {
    const [x, y] = AX[I.t], v = f === "sen" ? y : f === "cos" ? x : (x === 0 ? null : 0);
    ok = v === null ? S.m10.ex_noex : neg(v);
    sol = S.m10.ex_s[0](f, a, neg(x), neg(y), ok, v === null);
  } else {
    const s = SG[f][I.q - 1], base = EXV[I.ref][f];
    ok = s < 0 ? "−" + base : base;
    sol = S.m10.ex_s[1](f, a, I.q, I.how, I.ref, base, ok);
  }
  const pool = ["0", "1", "−1", "1/2", "−1/2", "√2/2", "−√2/2", "√3/2", "−√3/2", "√3", "−√3", "√3/3", "−√3/3", ...(f === "tg" ? [S.m10.ex_noex] : [])];
  const near = [ok[0] === "−" ? ok.slice(1) : "−" + ok].filter(x => pool.includes(x) && x !== ok);
  const opts = R.shuffle([ok, ...near, ...R.shuffle(pool.filter(x => x !== ok && !near.includes(x))).slice(0, 3 - near.length)]);
  return { q: S.m10.ex_q(f, a), kind: "choice", opts, correct: opts.indexOf(ok), sol };
});
def("m10.tr.signo", (R, S) => {
  const f = R.pick(["sen", "cos", "tg"]);
  let a; do a = R.int(1, 359); while (a % 90 === 0);
  if (R.r() < 0.15) a -= 360;   // a veces, un ángulo negativo
  const I = quadInfo(a), pos = SG[f][I.q - 1] > 0;
  return { q: S.m10.sg_q(f, a), kind: "choice", opts: S.m10.sg_o, correct: pos ? 0 : 1, shuffle: false, sol: S.m10.sg_s(f, a, I.q) };
});
def("m10.tr.cuadrante", (R, S, H) => {
  const [p, q, h] = R.pick(TRIP), quad = R.int(2, 4), giveSin = R.r() < 0.5;
  const sn = SG.sen[quad - 1] * p, cs = SG.cos[quad - 1] * q;
  const g = giveSin ? sn : cs, w = giveSin ? cs : sn, fg = giveSin ? "sen" : "cos", fw = giveSin ? "cos" : "sen";
  const gs = `${neg(g)}/${h}`, ws = `${neg(w)}/${h}`;
  return { q: S.m10.cu_q(fg, gs, quad, fw), kind: "frac", ans: F.make(w, h),
    sol: S.m10.cu_s(fg, fw, `(${gs})²`, `${g * g}/${h * h}`, `${h * h - g * g}/${h * h}`, `${Math.abs(w)}/${h}`, quad, ws) };
});
// ── Geometría analítica (u7): la recta con la punto-pendiente de la lección y sin «1(x − 1)» ni «y − 0» ──
const ftx = f => f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`;
const fA = (f, H) => F.html([Math.abs(f[0]), f[1]], H);
const rhsE = (H, m, n) => { const mx = m[0] === 0 ? "" : m[0] === m[1] ? "x" : m[0] === -m[1] ? "−x" : (m[0] < 0 ? "−" : "") + fA(m, H) + "x";
  return mx + (n[0] === 0 ? (mx ? "" : "0") : mx ? (n[0] < 0 ? " − " : " + ") + fA(n, H) : (n[0] < 0 ? "−" : "") + fA(n, H)); };
const explE = (H, m, n) => ({ html: `y = ${rhsE(H, m, n)}`, text: `(${ftx(m)})*x + (${ftx(n)})` });
const fS = (f, H) => (f[0] < 0 ? "−" : "") + fA(f, H);
// y − y₀ = m(x − x₀), y el paso de quitar el paréntesis
const ppE = (H, P, m) => {
  const ys = P[1] === 0 ? "y" : `y ${P[1] < 0 ? "+" : "−"} ${Math.abs(P[1])}`, xs = P[0] === 0 ? "x" : `(x ${P[0] < 0 ? "+" : "−"} ${Math.abs(P[0])})`;
  const mc = m[0] === m[1] ? "" : m[0] === -m[1] ? "−" : fS(m, H);
  const pp = m[0] === 0 ? `${ys} = 0` : `${ys} = ${mc}${mc ? xs : xs.replace(/^\(|\)$/g, "")}`;
  const mid = m[0] !== 0 && P[0] !== 0 && P[1] !== 0 ? `${ys} = ${rhsE(H, m, F.mul(m, [-P[0], 1]))}` : "";
  return { pp, mid, fin: P[1] !== 0 ? 0 : P[0] !== 0 && m[0] !== 0 ? 1 : 2 };
};
const genE = (A, B, C) => { let s = "";
  [[A, "x"], [B, "y"]].forEach(([k, v]) => { if (!k) return; const c = Math.abs(k) === 1 ? "" : Math.abs(k); s += s ? (k < 0 ? " − " : " + ") + c + v : (k < 0 ? "−" : "") + c + v; });
  return s + (C ? (C < 0 ? " − " : " + ") + Math.abs(C) : "") + " = 0"; };
const dif = (a, b) => `${neg(a)} − ${b < 0 ? `(${neg(b)})` : b}`;
def("m10.ga.recta", (R, S, H) => {
  if (R.r() < 0.5) {
    const P = [R.int(-5, 5), R.int(-5, 5)], m = F.make(rnz(R, -4, 4), R.pick([1, 1, 2, 3])), n = F.sub([P[1], 1], F.mul(m, [P[0], 1]));
    const e = explE(H, m, n), p = ppE(H, P, m);
    return { q: S.m10.gr_q[0](pt(...P), fS(m, H)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m10.gr_hint, sol: S.m10.gr_s[0](p.pp, p.mid + S.m10.gr_fin[p.fin], e.html) };
  }
  let A, B;
  do { A = [R.int(-5, 5), R.int(-5, 5)]; B = [R.int(-5, 5), R.int(-5, 5)]; } while (A[0] === B[0] || A[1] === B[1] && R.r() < 0.7);
  const dx = B[0] - A[0], dy = B[1] - A[1], m = F.make(dy, dx), n = F.sub([A[1], 1], F.mul(m, [A[0], 1]));
  const e = explE(H, m, n), p = ppE(H, A, m);
  return { q: S.m10.gr_q[1](pt(...A), pt(...B)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m10.gr_hint,
    sol: S.m10.gr_s[1](`(${dif(B[1], A[1])}) / (${dif(B[0], A[0])}) = ${neg(dy)}/${dx < 0 ? `(${neg(dx)})` : dx}` + (dx > 1 && m[1] === dx ? "" : " = " + fS(m, H)), p.pp, p.mid + S.m10.gr_fin[p.fin], e.html) };
});
def("m10.ga.paralelaperp", (R, S, H) => {
  const P = [R.int(-5, 5), R.int(-5, 5)], A = rnz(R, -4, 4), B = rnz(R, -4, 4), C = R.int(-9, 9);
  const m = F.make(-A, B), perp = R.r() < 0.5;
  if (perp && !m[0]) return null;
  const mm = perp ? F.make(-m[1], m[0]) : m, n = F.sub([P[1], 1], F.mul(mm, [P[0], 1])), e = explE(H, mm, n), p = ppE(H, P, mm);
  return { q: S.m10.gp_q(perp, genE(A, B, C), pt(...P)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m10.gr_hint,
    sol: S.m10.gp_s(perp, neg(A), neg(B), fS(m, H), fS(mm, H), p.pp, p.mid + S.m10.gr_fin[p.fin], e.html) };
});
def("m10.ga.mediatriz", (R, S, H) => {
  let A, B;
  do { A = [R.int(-5, 5), R.int(-5, 5)]; B = [A[0] + 2 * rnz(R, -3, 3), A[1] + 2 * rnz(R, -3, 3)]; } while (Math.abs(B[0]) > 7 || Math.abs(B[1]) > 7);
  const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], m = F.make(B[1] - A[1], B[0] - A[0]), mp = F.make(-m[1], m[0]);
  const n = F.sub([M[1], 1], F.mul(mp, [M[0], 1])), e = explE(H, mp, n), p = ppE(H, M, mp);
  return { q: S.m10.gm_q(pt(...A), pt(...B)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m10.gr_hint,
    sol: S.m10.gm_s(`(${neg(A[0])} + ${B[0] < 0 ? `(${neg(B[0])})` : B[0]}) / 2`, `(${neg(A[1])} + ${B[1] < 0 ? `(${neg(B[1])})` : B[1]}) / 2`, pt(...M), fS(m, H), fS(mp, H), p.pp, p.mid + S.m10.gr_fin[p.fin], e.html) };
});
def("m10.ga.distpp", (R, S, H) => {
  const A = [R.int(-6, 6), R.int(-6, 6)], dx = rnz(R, -8, 8), dy = rnz(R, -8, 8), B = [A[0] + dx, A[1] + dy];
  const s = dx * dx + dy * dy, r = Math.sqrt(s), exact = Number.isInteger(r), d = rd(r);
  return { q: S.m10.gd_q(pt(...A), pt(...B)), kind: "num", ans: d, tol: 0.006,
    sol: S.m10.gd_s(`(${neg(dx)})²`.replace(/^\((\d+)\)/, "$1"), `(${neg(dy)})²`.replace(/^\((\d+)\)/, "$1"), dx * dx, dy * dy, s, exact ? "= <b>" + r + "</b>" : "≈ <b>" + d.toFixed(2).replace(".", WA.H.ds) + "</b>") };
});
// ── Vectores (u7): coordenadas con la resta escrita, módulo, punto medio, simétrico, operaciones y paralelismo ──
const pq = v => v < 0 ? `(${neg(v)})` : String(v);
def("m10.ve.coord", (R, S, H) => {
  const T = S.m10.vc_t, k = R.int(0, 3);
  const A = [R.int(-6, 6), R.int(-6, 6)];
  if (k === 0) {
    const B = [R.int(-6, 6), R.int(-6, 6)];
    if (B[0] === A[0] && B[1] === A[1]) return null;
    return { q: T.q0(pt(...A), pt(...B)), kind: "fields", fields: [{ label: T.f[0], ans: B[0] - A[0] }, { label: T.f[1], ans: B[1] - A[1] }],
      sol: T.s0(`${neg(B[0])} − ${pq(A[0])}`, `${neg(B[1])} − ${pq(A[1])}`, pt(B[0] - A[0], B[1] - A[1])) };
  }
  if (k === 1) {
    const [p, q, h] = R.r() < 0.6 ? R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5], [12, 5, 13]]) : [R.int(1, 7), R.int(1, 7), 0];
    const dx = p * R.pick([1, -1]), dy = q * R.pick([1, -1]), B = [A[0] + dx, A[1] + dy], s = dx * dx + dy * dy, r = Math.sqrt(s);
    const v = Number.isInteger(r) ? r : Math.round(r * 100) / 100;
    return { q: T.q1(pt(...A), pt(...B)), kind: "num", ans: v, tol: 0.006,
      sol: T.s1(`${neg(B[0])} − ${pq(A[0])}`, `${neg(B[1])} − ${pq(A[1])}`, pt(dx, dy), `${pq(dx)}² + ${pq(dy)}²`, s, Number.isInteger(r) ? `= ${r}` : `≈ ${H.dec(v)}`) };
  }
  if (k === 2) {
    const B = [A[0] + 2 * rnz(R, -4, 4), A[1] + R.int(-7, 7)], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    return { q: T.q2(pt(...A), pt(...B)), kind: "fields", fields: [{ label: T.f[0], kind: "num", ans: M[0] }, { label: T.f[1], kind: "num", ans: M[1] }],
      sol: T.s2(`(${neg(A[0])} + ${pq(B[0])}) / 2 = ${H.dec(M[0])}`, `(${neg(A[1])} + ${pq(B[1])}) / 2 = ${H.dec(M[1])}`, Number.isInteger(M[1]) ? pt(...M) : `(${H.dec(M[0])}; ${H.dec(M[1])})`) };
  }
  const M = [R.int(-5, 5), R.int(-5, 5)];
  if (M[0] === A[0] && M[1] === A[1]) return null;
  const B = [2 * M[0] - A[0], 2 * M[1] - A[1]];
  return { q: T.q3(pt(...A), pt(...M)), kind: "fields", fields: [{ label: T.f[0], ans: B[0] }, { label: T.f[1], ans: B[1] }],
    sol: T.s3(neg(A[0]), neg(M[0]), neg(B[0]), neg(A[1]), neg(M[1]), neg(B[1]), pt(...B), pt(M[0] - A[0], M[1] - A[1])) };
});
def("m10.ve.operar", (R, S) => {
  const T = S.m10.vo_t;
  if (R.r() < 0.6) {
    const u = [rnz(R, -5, 5), rnz(R, -5, 5)], v = [rnz(R, -5, 5), rnz(R, -5, 5)]; let a, b; do { a = rnz(R, -3, 4); b = rnz(R, -3, 3); } while (Math.abs(a) === 1 && Math.abs(b) === 1);
    const au = [a * u[0], a * u[1]], bv = [b * v[0], b * v[1]], res = [au[0] + bv[0], au[1] + bv[1]];
    const co = (k, n) => k === 1 ? n : k === -1 ? "−" + n : neg(k) + n;
    const expr = `${co(a, "u")} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}v`;
    return { q: T.q0(pt(...u), pt(...v), expr), kind: "fields", fields: [{ label: S.m10.vc_t.f[0], ans: res[0] }, { label: S.m10.vc_t.f[1], ans: res[1] }],
      sol: T.s0(co(a, "u"), pt(...au), co(b, "v"), pt(...bv), `(${neg(au[0])} + ${pq(bv[0])}, ${neg(au[1])} + ${pq(bv[1])})`, pt(...res)) };
  }
  const u = [rnz(R, -5, 5), rnz(R, -5, 5)], par = R.r() < 0.5, k = R.pick([-3, -2, 2, 3, -1]);
  let v = [k * u[0], k * u[1]];
  if (!par) v = [v[0], v[1] + R.pick([-1, 1, 2])];
  const r0 = `${neg(v[0])}/${pq(u[0])}`, r1 = `${neg(v[1])}/${pq(u[1])}`;
  return { q: T.q1(pt(...u), pt(...v)), kind: "choice", opts: T.o1, correct: par ? 0 : 1, shuffle: false,
    sol: T.s1(r0, r1, par, neg(k), pt(...v), pt(...u)) };
});
// Rectas (u7): vector director, ecuación vectorial, paramétricas y continua (lo nuevo de 4.º).
def("m10.ga.director", (R, S) => {
  const T = S.m10.gd_t, k = R.int(0, 2);
  if (k === 0) {
    let A, B; do { A = rnz(R, -6, 6); B = rnz(R, -6, 6); } while (gcd(A, B) !== 1);
    const C = R.int(-9, 9), ok = pt(-B, A);
    return Object.assign({ q: T.q0(genE(A, B, C)), sol: T.s0(neg(A), neg(B), ok, pt(A, B)) }, choice(R, ok, [pt(A, B), pt(B, A), pt(-A, -B)].filter(x => x !== pt(B, -A))));
  }
  if (k === 1) {
    const P = [R.int(-5, 5), R.int(-5, 5)]; let v; do v = [rnz(R, -4, 4), rnz(R, -4, 4)]; while (gcd(v[0], v[1]) !== 1);
    // continua: (x − x0)/v1 = (y − y0)/v2  →  v2(x − x0) = v1(y − y0)  →  v2 x − v1 y + (v1 y0 − v2 x0) = 0
    let A = v[1], B = -v[0], C = v[0] * P[1] - v[1] * P[0];
    if (A < 0) { A = -A; B = -B; C = -C; }
    const ok = genE(A, B, C), xs = P[0] === 0 ? "x" : `x ${P[0] < 0 ? "+" : "−"} ${Math.abs(P[0])}`, ys = P[1] === 0 ? "y" : `y ${P[1] < 0 ? "+" : "−"} ${Math.abs(P[1])}`;
    const cont = `(${xs})/${pq(v[0])} = (${ys})/${pq(v[1])}`;
    const cross = `${pq(v[1])}(${xs}) = ${pq(v[0])}(${ys})`;
    return Object.assign({ q: T.q1(pt(...P), pt(...v)), sol: T.s1(cont, cross, ok) },
      choice(R, ok, [genE(v[0], v[1], -(v[0] * P[0] + v[1] * P[1])), genE(A, B, -C), genE(A, -B, C)].filter(x => x !== ok)));
  }
  const P = [R.int(-5, 5), R.int(-5, 5)], v = [rnz(R, -4, 4), rnz(R, -4, 4)], t = rnz(R, -3, 3);
  const Q = [P[0] + t * v[0], P[1] + t * v[1]];
  return { q: T.q2(pt(...P), pt(...v), neg(t)), kind: "fields", fields: [{ label: "x", ans: Q[0] }, { label: "y", ans: Q[1] }],
    sol: T.s2(neg(P[0]), pq(t), pq(v[0]), neg(P[1]), pq(v[1]), pt(...Q)) };
});
// Punto de corte de dos rectas (u7.posiciones), por reducción con los pasos.
def("m10.ga.corte", (R, S) => {
  const T = S.m10.gc_t, x0 = R.int(-5, 5), y0 = R.int(-5, 5);
  let a1, b1, a2, b2; do { a1 = rnz(R, -4, 4); b1 = rnz(R, -4, 4); a2 = rnz(R, -4, 4); b2 = R.pick([b1, -b1, rnz(R, -4, 4)]); } while (a1 * b2 === a2 * b1 || Math.abs(b2) !== Math.abs(b1));
  const c1 = -(a1 * x0 + b1 * y0), c2 = -(a2 * x0 + b2 * y0), add = b1 === -b2;
  const e1 = genE(a1, b1, c1), e2 = genE(a2, b2, c2);
  const ax = add ? a1 + a2 : a1 - a2, cx = add ? c1 + c2 : c1 - c2;   // ax·x + cx = 0
  return { q: T.q(e1, e2), kind: "fields", fields: [{ label: "x", ans: x0 }, { label: "y", ans: y0 }],
    sol: T.s(add, genE(ax, 0, cx), neg(x0), genE(0, b1, a1 * x0 + c1), neg(y0), pt(x0, y0)) };
});
// Distancia de un punto a una recta (con la sustitución escrita) y circunferencias (u7.distancias).
def("m10.ga.distpr", (R, S, H) => {
  const T = S.m10.dr_t, k = R.int(0, 2);
  if (k === 0) {
    const [A, B, n] = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [1, 1, 0], [1, 2, 0], [2, 1, 0]]).map((x, i) => i < 2 ? x * R.pick([1, -1]) : x);
    const C = R.int(-12, 12), P = [R.int(-5, 6), R.int(-5, 6)], num = A * P[0] + B * P[1] + C, s = A * A + B * B, r = Math.sqrt(s);
    if (num === 0) return null;
    const d = Math.abs(num) / r, v = Math.round(d * 100) / 100;
    const sub = `${A === 1 ? "" : A === -1 ? "−" : neg(A) + " · "}${pq(P[0])} ${B < 0 ? "−" : "+"} ${Math.abs(B) === 1 ? "" : Math.abs(B) + " · "}${pq(P[1])}${C ? (C < 0 ? " − " : " + ") + Math.abs(C) : ""}`;
    return { q: T.q0(pt(...P), genE(A, B, C)), kind: "num", ans: v, tol: 0.006,
      sol: T.s0(sub, neg(num), Math.abs(num), `${pq(A)}² + ${pq(B)}²`, s, Number.isInteger(r) ? String(r) : `√${s}`, Number.isInteger(r) ? (Number.isInteger(d) ? `= <b>${d}</b>` : `= <b>${H.dec(v)}</b>`) : `≈ <b>${v.toFixed(2).replace(".", WA.H.ds)}</b>`) };
  }
  const a = R.int(-5, 5), b = R.int(-5, 5), r = R.int(2, 7);
  const xs = a === 0 ? "x²" : `(x ${a < 0 ? "+" : "−"} ${Math.abs(a)})²`, ys = b === 0 ? "y²" : `(y ${b < 0 ? "+" : "−"} ${Math.abs(b)})²`;
  if (k === 1) return { q: T.q1(`${xs} + ${ys} = ${r * r}`), kind: "fields", fields: [{ label: T.f[0], ans: a }, { label: T.f[1], ans: b }, { label: T.f[2], ans: r }],
    sol: T.s1(xs, ys, a < 0 ? `(x − (${neg(a)}))²` : "", b < 0 ? `(y − (${neg(b)}))²` : "", r * r, r, pt(a, b)) };
  const [p, q] = R.pick([[3, 4], [4, 3], [1, 1], [2, 3], [5, 0], [0, 6], [1, 5], [6, 2]]), P = [a + p * R.pick([1, -1]), b + q * R.pick([1, -1])];
  const s = p * p + q * q, dd = Math.sqrt(s), where = dd < r ? 0 : dd === r ? 1 : 2;
  return { q: T.q2(pt(...P), pt(a, b), r), kind: "choice", opts: T.o2, correct: where, shuffle: false,
    sol: T.s2(`${pq(P[0] - a)}² + ${pq(P[1] - b)}²`, s, Number.isInteger(dd) ? `= ${dd}` : `≈ ${dd.toFixed(2).replace(".", WA.H.ds)}`, r, where) };
});
// ── Funciones ──
def("m10.trozos", (R, S, H) => {
  const T = S.m10.tp_t, k = R.pick([0, 0, 1, 2]), mo = x => (Math.round(x * 100) / 100).toFixed(2).replace(".", WA.H.ds);
  if (k === 2) {   // tarifa por tramos
    const p = R.pick([0.4, 0.5, 0.6, 0.8]), q = R.pick([1, 1.2, 1.4, 1.5, 2]), L = R.pick([10, 12, 15, 20]), x = L + R.int(-6, 9);
    const v = Math.round((x <= L ? p * x : p * L + q * (x - L)) * 100) / 100;
    return { q: T.q2(H.dec(p), L, H.dec(q), x), kind: "num", ans: v, tol: 0.006,
      sol: x <= L ? T.s2a(x, L, H.dec(p), mo(v)) : T.s2b(x, L, H.dec(p), x - L, H.dec(q), mo(p * L), mo(q * (x - L)), mo(v)) };
  }
  const p = R.int(-2, 3), m = rnz(R, -3, 3), n = R.int(-5, 5), c = R.int(-5, 5);
  const f = `<table style="border-left:2px solid #202122;margin:6px 0 6px 4px"><tr><td style="padding:1px 8px">${lin(m, n)}</td><td style="padding:1px 8px">${S.m10.si} x &lt; ${neg(p)}</td></tr><tr><td style="padding:1px 8px">x²${c ? (c < 0 ? " − " : " + ") + Math.abs(c) : ""}</td><td style="padding:1px 8px">${S.m10.si} x ≥ ${neg(p)}</td></tr></table>`;
  const e1 = x => `${m === 1 ? "" : m === -1 ? "−" : neg(m) + " · "}${pq(x)}${n ? (n < 0 ? " − " : " + ") + Math.abs(n) : ""}`;
  const e2 = x => `${pq(x)}²${c ? (c < 0 ? " − " : " + ") + Math.abs(c) : ""}`;
  if (k === 1) {   // ¿hay salto en la frontera?
    const L = m * p + n, Rv = p * p + c;
    return { q: T.q1(f, neg(p)), kind: "int", ans: Math.abs(Rv - L), sol: T.s1(neg(p), e1(p), neg(L), e2(p), neg(Rv), Math.abs(Rv - L)) };
  }
  const x = R.int(-5, 6), first = x < p, v = first ? m * x + n : x * x + c;
  return { q: S.m10.tp_q(f, neg(x)), kind: "int", ans: v, sol: T.s0(neg(x), first, neg(p), first ? e1(x) : e2(x), neg(v)) };
});
def("m10.fn.explog", (R, S) => {
  const k = R.int(0, 2);
  if (k === 0) { const b = R.pick([2, 3, 5]), a = R.int(1, 4), x = R.int(0, b === 2 ? 5 : 3); return { q: S.m10.fe_q[0](a === 1 ? "" : a + " · ", b, x), kind: "int", ans: a * b ** x, sol: S.m10.fe_s[0](a, b, x, a * b ** x) }; }
  if (k === 1) { const b = R.pick([2, 3, 10]), e = R.int(0, b === 10 ? 4 : 5); return { q: S.m10.fe_q[1](b, b ** e), kind: "int", ans: e, sol: S.m10.fe_s[1](b, e, b ** e) }; }
  const b = R.pick([2, 3, 4]), c = rnz(R, -5, 5);
  return { q: S.m10.fe_q[2](b, c), kind: "int", ans: 1 + c, sol: S.m10.fe_s[2](b, neg(c), neg(1 + c)) };
});
def("m10.fn.racional", (R, S) => {
  const T = S.m10.fq_t, u = R.r();
  if (u < 0.45) {
    const k = rnz(R, -6, 6), a = R.int(-5, 5), b = R.int(-5, 5);
    const den = a ? `(x ${a < 0 ? "+" : "−"} ${Math.abs(a)})` : "x";
    const f = `${neg(k)}/${den}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;
    return { q: S.m10.fr_q(f), kind: "fields", fields: [{ label: S.m10.fr_f[0], ans: a }, { label: S.m10.fr_f[1], ans: b }], sol: S.m10.fr_s(neg(a), neg(b)) };
  }
  if (u < 0.85) {   // (ax + b)/(x − c)
    let a, b, c; do { a = rnz(R, -5, 5); b = R.int(-9, 9); c = R.int(-5, 5); } while (a * c + b === 0);
    const num = polyHtml([a, b]), den = c ? `x ${c < 0 ? "+" : "−"} ${Math.abs(c)}` : "x";
    return { q: S.m10.fr_q(`(${num})/(${den})`), kind: "fields", fields: [{ label: S.m10.fr_f[0], ans: c }, { label: S.m10.fr_f[1], ans: a }],
      sol: T.s1(den, neg(c), `${a === 1 ? "" : a === -1 ? "−" : neg(a) + " · "}${pq(c)}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`, neg(a * c + b), num, den, `${a === 1 ? "" : a === -1 ? "−" : neg(a)}x`, neg(a)) };
  }
  const F0 = R.pick([200, 300, 500, 800, 1200]), v = R.pick([2, 3, 5, 8, 12, 15]), ctx = R.pick(T.ctx);
  return { q: T.q2(ctx, F0, v), kind: "num", ans: v, tol: 0.001, sol: T.s2(F0, v, ctx) };
});
// Funciones polinómicas (u8): el signo de una cúbica por tramos y la forma canónica completando el cuadrado.
def("m10.fn.cubica", (R, S) => {
  const T = S.m10.cb_t;
  if (R.r() < 0.6) {
    let rs; do rs = R.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3).sort((a, b) => a - b); while (rs[2] - rs[0] > 7 || rs[1] - rs[0] < 2 || rs[2] - rs[1] < 2);
    const P = rs.reduce((p, t) => mulP(p, [1, -t]), [1]), pos = R.r() < 0.5;
    const [a, b, c] = rs, I = (l, r) => `(${l}, ${r})`;
    const posSet = `${I(neg(a), neg(b))} ∪ ${I(neg(c), "+∞")}`, negSet = `${I("−∞", neg(a))} ∪ ${I(neg(b), neg(c))}`;
    const ok = pos ? posSet : negSet, alts = [pos ? negSet : posSet, `${I(neg(a), neg(c))}`, `${I(neg(a), neg(b))}`, `${I("−∞", neg(a))} ∪ ${I(neg(c), "+∞")}`];
    const tests = [a - 1, a + 1, b + 1, c + 1];
    const val = t => P.reduce((s, q) => s * t + q, 0);
    const tline = tests.map(t => `f(${neg(t)}) = ${neg(val(t))} ${val(t) > 0 ? ">" : "&lt;"} 0`).join("; ");
    const fac = rs.map(r => r === 0 ? "x" : `(x ${r > 0 ? "−" : "+"} ${Math.abs(r)})`).join("");
    return Object.assign({ q: T.q0(polyHtml(P, "x", { html: true }), pos), sol: T.s0(fac, rs.map(neg).join(", "), tline, pos, ok) }, choice4(R, ok, alts));
  }
  const h = rnz(R, -5, 5), q = R.int(-9, 9), b = -2 * h, c = h * h + q;
  return { q: T.q1(polyHtml([1, b, c])), kind: "fields", fields: [{ label: "p", ans: h }, { label: "q", ans: q }],
    sol: T.s1(polyHtml([1, b, 0]), neg(b), neg(b / 2), `(${xm2(h)})²`, h * h, polyHtml([1, b, c]), c, neg(q), neg(h)) };
});
// Modelos exponenciales (u8.exponenciales): del porcentaje al factor, interés, depreciación, duplicación, crecer o decrecer.
def("m10.fn.modelo", (R, S, H) => {
  const T = S.m10.md_t, k = R.int(0, 4), e2 = x => (Math.round(x * 100) / 100).toFixed(2).replace(".", WA.H.ds);
  if (k === 0) {
    const up = R.r() < 0.5, p = R.pick([2, 3, 4, 5, 6, 8, 12, 15, 20, 25]), f = up ? 1 + p / 100 : 1 - p / 100, ok = H.dec(f);
    const opts = R.shuffle([ok, H.dec(p / 100), H.dec(up ? 1 - p / 100 : 1 + p / 100), `${up ? "" : "−"}${p}`]);
    return { q: T.q0(up, p), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s0(up, p, 100 + (up ? p : -p), ok) };
  }
  if (k === 1) {
    const C = R.pick([1000, 2000, 3000, 5000, 1500]), r = R.pick([1.5, 2, 2.5, 3, 3.5, 4, 5]), t = R.int(3, 12), f = 1 + r / 100, v = Math.round(C * f ** t * 100) / 100;
    return { q: T.q1(C, H.dec(r), t), kind: "num", ans: v, tol: 0.011, sol: T.s1(C, H.dec(r), H.dec(f), t, e2(v)) };
  }
  if (k === 2) {
    const V0 = R.pick([800, 1200, 15000, 20000, 600]), p = R.pick([10, 15, 20, 25]), t = R.int(2, 5), f = 1 - p / 100, v = Math.round(V0 * f ** t * 100) / 100;
    return { q: T.q2(R.pick(T.obj), V0, p, t), kind: "num", ans: v, tol: 0.011, sol: T.s2(p, H.dec(f), V0, t, e2(v)) };
  }
  if (k === 3) {
    const r = R.pick([2, 3, 4, 5, 6, 8, 10]), f = 1 + r / 100, v = Math.log10(2) / Math.log10(f);
    return { q: T.q3(r), kind: "num", ans: Math.round(v * 10) / 10, tol: 0.06, sol: T.s3(H.dec(f), H.dec(Math.round(Math.log10(f) * 100000) / 100000), H.dec(Math.round(v * 10) / 10), Math.ceil(v)) };
  }
  const a = R.pick([0.2, 0.5, 0.75, 0.8, 0.9, 1.5, 2, 3, 1.1, 4]), up = a > 1;
  return { q: T.q4(H.dec(a)), kind: "choice", opts: T.o4, correct: up ? 0 : 1, shuffle: false, sol: T.s4(H.dec(a), up) };
});
// ── Funciones (u8): solo lo que enseña el curso (traslaciones, familias vistas, recorrido sin eˣ) ──
const xmn = a => a === 0 ? "x" : a > 0 ? `x − ${a}` : `x + ${-a}`;
const sgn = c => c ? (c < 0 ? " − " : " + ") + Math.abs(c) : "";
const pick4 = (R, ok, alts) => { const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok).slice(0, 3)]); return { opts, correct: opts.indexOf(ok) }; };
def("m10.fn.traslacion", (R, S) => {
  const [bn, bf] = R.pick([["x²", s => s === "x" ? "x²" : `(${s})²`], ["x³", s => s === "x" ? "x³" : `(${s})³`], ["|x|", s => `|${s}|`], ["√x", s => `√(${s})`.replace("√(x)", "√x")]]);
  let h, v; do { h = R.int(-5, 5); v = R.int(-5, 5); } while (!h && !v);
  return { q: S.m10.ft_q(bn, `${bf(xmn(h))}${sgn(v)}`), kind: "fields", fields: [{ label: S.m10.ft_f[0], ans: h }, { label: S.m10.ft_f[1], ans: v }],
    sol: S.m10.ft_s(xmn(h), h, v) };
});
def("m10.fn.tipo", (R, S) => {
  const k = R.int(0, 5), a = rnz(R, -5, 5), b = R.int(-6, 6), c = R.int(2, 5);
  const f = [lin(a, b), polyHtml([a, b, R.int(-5, 5)]), polyHtml([a, 0, rnz(R, -5, 5), R.int(-5, 5)]), `${neg(a)}/x`, `${c}<sup>x</sup>`, `log<sub>${c}</sub> x`][k];
  return { q: S.m10.fy_q(f), kind: "choice", opts: S.m10.fy_o, correct: k, shuffle: false, sol: S.m10.fy_s[k] };
});
def("m10.fn.recorrido", (R, S) => {
  const h = R.int(-5, 5), v = R.int(-6, 6), k = R.int(0, 3), V = neg(v);
  const I = { sube: `[${V}, +∞)`, baja: `(−∞, ${V}]`, ab: `(${V}, +∞)`, menos: `ℝ − {${V}}`, R: "ℝ" };
  const xx = xmn(h), sq = xx === "x" ? "x²" : `(${xx})²`;
  let f, ok, alts;
  if (k === 0) { f = `${sq}${sgn(v)}`; ok = I.sube; alts = [I.baja, I.ab, I.R]; }
  else if (k === 1) { f = `−${sq}${sgn(v)}`; ok = I.baja; alts = [I.sube, I.menos, I.R]; }
  else if (k === 2) { f = `${xx === "x" ? "√x" : `√(${xx})`}${sgn(v)}`; ok = I.sube; alts = [`[${neg(h)}, +∞)`, I.ab, I.R]; }
  else { f = `1/${xx === "x" ? "x" : `(${xx})`}${sgn(v)}`; ok = I.menos; alts = [`ℝ − {${neg(h)}}`, I.ab, I.R]; }
  return { q: S.m10.fc_q(f), kind: "choice", ...pick4(R, ok, alts), sol: S.m10.fc_s(k, v ? `0${sgn(v)} = ${V}` : "0", V) };
});
// ── Estadística bidimensional (u9): covarianza y recta con todas las cuentas y sin «− −» ──
def("m10.es.cov", (R, S, H) => {
  let xs, ys, r;
  do {
    const b = R.int(-2, 2) || 1, n = R.int(4, 5);
    xs = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, n).sort((a, c) => a - c);
    ys = xs.map(x => b * x + R.int(-2, 2) + 10);
    const N = xs.length, mx = xs.reduce((a, c) => a + c) / N, my = ys.reduce((a, c) => a + c) / N;
    const sxy = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0), sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0), syy = ys.reduce((s, y) => s + (y - my) ** 2, 0);
    r = syy ? sxy / Math.sqrt(sxx * syy) : 0;
  } while (Math.abs(r) < 0.5);
  const N = xs.length, sx = xs.reduce((a, c) => a + c), sy = ys.reduce((a, c) => a + c), mx = sx / N, my = sy / N;
  const sp = xs.reduce((s, x, i) => s + x * ys[i], 0), mxy = sp / N, cov = rd(mxy - mx * my, 2);
  const prods = xs.map((x, i) => `${x} · ${ys[i] < 0 ? `(${neg(ys[i])})` : ys[i]}`).join(" + ");
  const P = H.dec(mx * my), dot = `${H.dec(mx)} · ${my < 0 ? `(${H.dec(my)})` : H.dec(my)}`;
  return { q: S.m10.ec_q(xs.join(", "), ys.map(neg).join(", ")), kind: "num", ans: cov, tol: 0.011,
    sol: S.m10.ec_s(sx, N, H.dec(mx), neg(sy), H.dec(my), prods, neg(sp), H.dec(mxy), dot, P.startsWith("−") ? `(${P})` : P, H.dec(mxy - mx * my), H.dec(cov), rd(mxy - mx * my, 6) === cov, cov > 0) };
});
def("m10.es.regresion", (R, S, H) => {
  const m = R.pick([0.5, 1.5, 2, 2.5, 3, -0.5, -1.5, -2, 0.8, -0.4, 1.2]);
  const sx2 = R.pick([4, 5, 8, 10, 20, 25]), sxy = rd(m * sx2, 2), xb = R.int(2, 12), yb = R.int(5, 40), n = rd(yb - m * xb, 2);
  const M = m < 0 ? `(${H.dec(m)})` : H.dec(m), prod = rd(m * xb, 2);
  if (R.r() < 0.5) return { q: S.m10.er_q(H.dec(xb), H.dec(yb), H.dec(sx2), H.dec(sxy)), kind: "fields",
    fields: [{ label: "m", kind: "num", ans: m, tol: 0.011 }, { label: "n", kind: "num", ans: n, tol: 0.011 }],
    sol: S.m10.er_s(H.dec(sxy), H.dec(sx2), H.dec(m), H.dec(yb), M, H.dec(xb), `${H.dec(yb)} ${prod < 0 ? "+" : "−"} ${H.dec(Math.abs(prod))}`, H.dec(n)) };
  const x0 = xb + R.int(1, 5), y0 = rd(yb + m * (x0 - xb), 2), d = x0 - xb, inc = rd(m * d, 2);
  return { q: S.m10.ee_q(H.dec(xb), H.dec(yb), H.dec(sx2), H.dec(sxy), x0), kind: "num", ans: y0, tol: 0.011,
    sol: S.m10.ee_s(H.dec(sxy), H.dec(sx2), H.dec(m), H.dec(yb), M, H.dec(xb), x0, d, `${H.dec(yb)} ${inc < 0 ? "−" : "+"} ${H.dec(Math.abs(inc))}`, H.dec(y0)) };
});
// El coeficiente de correlación r (u9.correlacion): calcularlo, interpretarlo y juzgar si una estimación es fiable.
def("m10.es.r", (R, S, H) => {
  const T = S.m10.rr_t, k = R.int(0, 2);
  const kind = r => Math.abs(r) >= 0.75 ? T.fuerte : Math.abs(r) >= 0.4 ? T.moderada : T.debil;
  if (k === 0) {
    const sx = R.pick([1.5, 2, 2.5, 3, 4, 5]), sy = R.pick([1.2, 2, 2.5, 3, 4, 6]), r = R.pick([0.95, 0.9, 0.85, 0.8, 0.6, 0.5, 0.3, 0.2]) * R.pick([1, -1]);
    const sxy = Math.round(r * sx * sy * 100) / 100, rr = Math.round(sxy / (sx * sy) * 100) / 100;
    return { q: T.q0(H.dec(sxy), H.dec(sx), H.dec(sy)), kind: "num", ans: rr, tol: 0.006, sol: T.s0(H.dec(sxy), H.dec(sx), H.dec(sy), H.dec(Math.round(sx * sy * 10000) / 10000), (Math.abs(sxy / (sx * sy) - rr) < 1e-9 ? "= " : "≈ ") + H.dec(rr), kind(rr), rr > 0) };
  }
  if (k === 1) {
    const sx = R.int(2, 6), sy = R.int(2, 6), r = R.pick([0.25, 0.5, 0.75, 0.8, 0.9, 0.4, 0.6]) * R.pick([1, -1]), sxy = Math.round(r * sx * sy * 100) / 100, rr = Math.round(sxy / (sx * sy) * 100) / 100;
    return { q: T.q1(H.dec(sxy), sx * sx, sy * sy), kind: "num", ans: rr, tol: 0.006, sol: T.s1(sx * sx, sx, sy * sy, sy, H.dec(sxy), sx * sy, H.dec(rr), kind(rr), rr > 0) };
  }
  const lo = R.int(1, 5), hi = lo + R.int(4, 8), r = R.pick([0.95, 0.92, 0.3, 0.25, -0.9, -0.2]), out = R.r() < 0.5, x0 = out ? hi + R.int(10, 25) : R.int(lo + 1, hi - 1);
  const ok = Math.abs(r) < 0.5 ? 2 : out ? 1 : 0;
  return { q: T.q2(lo, hi, H.dec(r), x0), kind: "choice", opts: T.o2, correct: ok, shuffle: false, sol: T.s2[ok](H.dec(r), x0, lo, hi) };
});
// ── Probabilidad total (u11): con el árbol de la lección («caminos» y «hacia atrás»), sin Σ ni Bayes formal ──
def("m10.pb.total", (R, S, H) => {
  const three = R.r() < 0.4, names = three ? ["A", "B", "C"] : ["A", "B"];
  const shares = three ? R.pick([[50, 30, 20], [60, 30, 10], [45, 35, 20], [40, 40, 20], [70, 20, 10]]) : (s => [s, 100 - s])(R.pick([55, 60, 65, 70, 75, 80, 40, 30]));
  const def_ = names.map(() => R.int(1, 8));
  const p4 = shares.map((s, i) => s * def_[i]), t4 = p4.reduce((a, c) => a + c, 0);   // en diezmilésimas: cuentas exactas
  const paths = p4.map(x => x / 10000), tot = t4 / 10000, f3 = x => x.toFixed(3).replace(".", WA.H.ds);
  const ctx = shares.map((s, i) => S.m10.pt_m(names[i], s)).join(", ").replace(/, ([^,]*)$/, S.m10.pt_y + "$1");
  const dctx = def_.map((d, i) => S.m10.pt_d(names[i], d)).join(", ").replace(/, ([^,]*)$/, S.m10.pt_y + "$1");
  const steps = names.map((n, i) => `${n}–D: ${H.dec(shares[i] / 100)} · ${H.dec(def_[i] / 100)} = ${H.dec(paths[i])}`).join("; ");
  const sum = `P(D) = ${paths.map(p => H.dec(p)).join(" + ")} = ${H.dec(tot)}`;
  if (R.r() < 0.5) {
    const v = Math.round(t4 / 10) / 1000;
    return { q: S.m10.pt_q[0](ctx, dctx), kind: "num", ans: v, tol: 0.0006, sol: S.m10.pt_s[0](steps, sum, H.dec(tot), f3(v), t4 % 10 === 0) };
  }
  const j = R.int(0, names.length - 1), v = Math.round(1000 * p4[j] / t4) / 1000;
  return { q: S.m10.pt_q[1](ctx, dctx, names[j]), kind: "num", ans: v, tol: 0.0006, sol: S.m10.pt_s[1](steps, sum, names[j], H.dec(paths[j]), H.dec(tot), f3(v)) };
});
// Probabilidad con recuento (u11.compuesta): casos con combinaciones, dos cartas y unión de sucesos.
const fr2 = f => f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`;
def("m10.pb.recuento", (R, S) => {
  const T = S.m10.rc_t, k = R.int(0, 2);
  if (k === 0) {
    const p = R.int(4, 8), q = R.int(3, 7), n = R.int(2, 4), kk = R.int(1, Math.min(n, q));
    if (n - kk > p) return null;
    const tot = Cb(p + q, n), fav = Cb(q, kk) * Cb(p, n - kk), f = F.make(fav, tot);
    return { q: T.q0(n, p, q, kk), kind: "frac", ans: f, sol: T.s0(p + q, n, tot, q, kk, Cb(q, kk), p, n - kk, Cb(p, n - kk), fav, fr2(f)) };
  }
  if (k === 1) {
    const [what, m] = R.pick([[T.palo[R.int(0, 3)], 10], [T.ases, 4], [T.figuras, 12]]), tot = Cb(40, 2), fav = Cb(m, 2), f = F.make(fav, tot);
    return { q: T.q1(what), kind: "frac", ans: f, sol: T.s1(m, fav, tot, fr2(f), m - 1) };
  }
  const [a, la] = R.pick([[10, T.palo[R.int(0, 3)]], [10, T.palo[R.int(0, 3)]]]);
  const [b, lb, c, cl] = R.pick([[4, T.unAs, 1, T.ases], [12, T.unaFigura, 3, T.figs], [20, T.mayor5, 5, T.mayores], [4, T.sieteOseis, 1, T.seisSiete]]);
  const f = F.make(a + b - c, 40);
  return { q: T.q2(la, lb), kind: "frac", ans: f, sol: T.s2(la, a, cl, b, c, a + b - c, fr2(f)) };
});
// Probabilidad condicionada «directa» (u11.condicionada): recuento, fórmula e independencia.
def("m10.pb.cond", (R, S, H) => {
  const T = S.m10.cd_t, k = R.int(0, 2);
  if (k === 0) {
    const N = R.pick([25, 28, 30, 32]), a = R.int(10, 20), b = R.int(6, 16), c = R.int(2, Math.min(a, b) - 1);
    if (a + b - c > N) return null;
    const Pr = R.pick(T.pares), f = F.make(c, a);
    return { q: T.q0(N, a, b, c, Pr), kind: "frac", ans: f, sol: T.s0(a, c, Pr, `${c}/${a}`, fr2(f)) };
  }
  if (k === 1) {
    const pb = R.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.8]), ab = Math.round(pb * R.pick([0.1, 0.2, 0.25, 0.3, 0.5, 0.75]) * 1000) / 1000, v = Math.round(ab / pb * 1000) / 1000;
    return { q: T.q1(H.dec(ab), H.dec(pb)), kind: "num", ans: v, tol: 0.0006, sol: T.s1(H.dec(ab), H.dec(pb), H.dec(v)) };
  }
  const pa = R.pick([0.2, 0.3, 0.4, 0.5, 0.6]), pb = R.pick([0.2, 0.25, 0.4, 0.5, 0.7]), ind = R.r() < 0.5;
  const prod = Math.round(pa * pb * 1000) / 1000, ab = ind ? prod : Math.round((prod + R.pick([-0.05, 0.05, 0.1])) * 1000) / 1000;
  if (ab <= 0 || ab > Math.min(pa, pb)) return null;
  return { q: T.q2(H.dec(pa), H.dec(pb), H.dec(ab)), kind: "choice", opts: T.o2, correct: ind ? 0 : 1, shuffle: false, sol: T.s2(H.dec(pa), H.dec(pb), H.dec(prod), H.dec(ab), ind) };
});
// Tablas de contingencia (u11.contingencia): construirla desde porcentajes, simple e intersección, independencia.
def("m10.pb.tabla", (R, S, H) => {
  const T = S.m10.tb_t, k = R.int(0, 2), d3 = x => H.dec(Math.round(x * 1000) / 1000);
  const C = R.pick(T.ctx);
  if (k === 0) {
    const r = R.pick([30, 40, 45, 55, 60]), a = R.pick([10, 20, 30, 40, 50]), b = R.pick([10, 20, 25, 30, 60]);
    const nA = 10 * r, nB = 1000 - nA, xA = nA * a / 100, xB = nB * b / 100, tot = xA + xB, ask = R.int(0, 1);
    if (!Number.isInteger(xA) || !Number.isInteger(xB)) return null;
    const v = ask ? Math.round(xA / tot * 1000) / 1000 : Math.round(tot / 1000 * 1000) / 1000;
    return { q: T.q0(C, r, a, b, ask), kind: "num", ans: v, tol: 0.0006, sol: T.s0(C, nA, xA, nB, xB, tot, ask, d3(v)) };
  }
  const N = R.pick([200, 300, 400, 500]), nA = Math.round(N * R.pick([0.4, 0.45, 0.5, 0.55, 0.6])), px = R.pick([0.3, 0.4, 0.5, 0.6]);
  const ind = k === 2 && R.r() < 0.5, xT = Math.round(N * px), xA = ind ? Math.round(nA * px) : Math.round(nA * px) + R.pick([-20, -10, 10, 20]);
  if (xA <= 0 || xA >= nA || xT - xA <= 0 || xT - xA >= N - nA) return null;
  if (k === 1) {
    const w = R.int(0, 1), f = w ? F.make(xA, N) : F.make(xT, N);
    return { q: T.q1(C, N, nA, xT, xA, w), kind: "frac", ans: f, sol: T.s1(C, w, xA, xT, N, fr2(f)) };
  }
  const pX = xT / N, pXA = xA / nA, same = Math.abs(pX - pXA) < 1e-9;
  return { q: T.q2(C, N, nA, xT, xA), kind: "choice", opts: T.o2, correct: same ? 0 : 1, shuffle: false,
    sol: T.s2(C, xT, N, d3(pX), xA, nA, d3(pXA), same) };
});
// ── Combinatoria ──
def("m10.co.mult", (R, S, H) => {
  const T = S.m10.cm_t, k = R.pick([0, 1, 2, 3, 3, 4, 5, 5]);
  if (k === 0) { const a = R.int(2, 6), b = R.int(2, 6), c = R.int(2, 5); return { q: S.m10.cm_q[0](a, b, c), kind: "int", ans: a * b * c, sol: S.m10.cm_s[0](a, b, c, a * b * c) }; }
  if (k === 1) { const n = R.int(2, 4); return { q: S.m10.cm_q[1](n), kind: "int", ans: 10 ** n, sol: S.m10.cm_s[1](n, 10 ** n) }; }
  if (k === 2) { const n = R.int(3, 6); return { q: S.m10.cm_q[2](n), kind: "int", ans: 2 ** n, sol: S.m10.cm_s[2](n, 2 ** n) }; }
  if (k === 3) {   // la casilla más restringida
    const n = R.int(3, 4), w = R.int(0, 2), last = [5, 5, 2][w], ans = 9 * 10 ** (n - 2) * last;
    return { q: T.q3(n, w), kind: "int", ans, sol: T.s3(n, w, last, ans) };
  }
  if (k === 4) {   // una letra y cifras distintas
    const d = R.int(2, 4), ds = Array.from({ length: d }, (_, i) => 10 - i), ans = 27 * ds.reduce((p, x) => p * x, 1);
    return { q: T.q4(d), kind: "int", ans, sol: T.s4(d, `27 · ${ds.join(" · ")}`, H.n ? H.n(ans) : ans) };
  }
  // ¿sumar o multiplicar?
  const a = R.int(2, 5), b = R.int(2, 4), both = R.r() < 0.5;
  return { q: T.q5(a, b, both), kind: "int", ans: both ? (a + b) ** 2 : a + b, sol: T.s5(a, b, both, a + b, (a + b) ** 2) };
});
def("m10.co.variaciones", (R, S) => {
  if (R.r() < 0.6) { const m = R.int(4, 16), n = R.int(2, 3); return { q: S.m10.cv_q[0](m, n), kind: "int", ans: V(m, n), sol: S.m10.cv_s[0](m, n, V(m, n)) }; }
  const m = R.int(3, 6), n = R.int(2, 4); return { q: S.m10.cv_q[1](m, n), kind: "int", ans: m ** n, sol: S.m10.cv_s[1](m, n, m ** n) };
});
def("m10.co.permutaciones", (R, S, H) => {
  const T = S.m10.cp_t, k = R.pick([0, 1, 1, 2, 3, 4]);
  if (k === 0) { const n = R.int(3, 7); return { q: S.m10.cp_q[0](n), kind: "int", ans: fact(n), sol: S.m10.cp_s[0](n, fact(n)) }; }
  if (k === 1) {
    const w = R.pick(["CASA", "PERRO", "ROMA", "LUNA", "TOMATE", "PAPEL", "LIBRO", "BANANA", "PELOTA", "CARRETA", "MAMA", "PERA", "COCO", "ARROZ", "MANZANA", "SALSA"]);
    const cnt = {}; [...w].forEach(c => { cnt[c] = (cnt[c] || 0) + 1; });
    const rep = Object.entries(cnt).filter(([c, x]) => x > 1), den = rep.reduce((p, [c, x]) => p * fact(x), 1), ans = fact(w.length) / den;
    return { q: S.m10.cp_q[1](w), kind: "int", ans, sol: T.s1(w, w.length, rep.map(([c, x]) => T.rep(c, x)).join(" y "), rep.map(([c, x]) => x + "!").join(" · "), fact(w.length), den, ans) };
  }
  if (k === 2) { const n = R.int(4, 8); return { q: T.q2(n), kind: "int", ans: fact(n - 1), sol: T.s2(n, n - 1, fact(n - 1)) }; }
  const n = R.int(4, 7), together = k === 3, tog = fact(n - 1) * 2;
  return { q: T.q3(n, together), kind: "int", ans: together ? tog : fact(n) - tog, sol: T.s3(n, together, n - 2, n - 1, fact(n - 1), tog, fact(n), fact(n) - tog) };
});
def("m10.co.combinaciones", (R, S) => {
  const T = S.m10.cc_t, k = R.pick([0, 0, 1, 2, 3]);
  if (k === 0) {
    const ctx = R.int(0, 2), m = ctx === 2 ? R.int(20, 30) : R.int(6, 15), n = ctx === 2 ? R.int(2, 3) : R.int(2, 4);
    const num = Array.from({ length: n }, (_, i) => m - i), den = Array.from({ length: n }, (_, i) => n - i);
    return { q: S.m10.cc_q[ctx](m, n), kind: "int", ans: Cb(m, n), sol: T.s0(m, n, num.join(" · "), V(m, n), den.join(" · "), fact(n), Cb(m, n)) };
  }
  if (k === 1) {   // comité mixto
    const p = R.int(4, 8), q = R.int(4, 7), a = R.int(1, 3), b = R.int(1, 3), ans = Cb(p, a) * Cb(q, b);
    return { q: T.q1(a, p, b, q), kind: "int", ans, sol: T.s1(p, a, Cb(p, a), q, b, Cb(q, b), ans) };
  }
  if (k === 2) {   // al menos uno
    const p = R.int(3, 6), q = R.int(4, 7), n = R.int(2, 3), tot = Cb(p + q, n), none = Cb(q, n);
    return { q: T.q2(n, p, q), kind: "int", ans: tot - none, sol: T.s2(p + q, n, tot, q, none, tot - none) };
  }
  const m = R.int(8, 15), n = m - R.int(1, 3), r = m - n;   // simetría
  return { q: T.q3(m, n), kind: "int", ans: Cb(m, n), sol: T.s3(m, n, r, Array.from({ length: r }, (_, i) => m - i).join(" · "), Array.from({ length: r }, (_, i) => r - i).join(" · "), Cb(m, n)) };
});
def("m10.co.tipo", (R, S) => {
  const i = R.int(0, S.m10.ct.length - 1);
  return { q: S.m10.ct_q(S.m10.ct[i][0]), kind: "choice", opts: S.m10.ct_o, correct: S.m10.ct[i][1], sol: S.m10.ct_s[S.m10.ct[i][1]] };
});
})();
