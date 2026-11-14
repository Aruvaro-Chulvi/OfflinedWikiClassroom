/* WikiAula — Matemáticas, Grado 9 (3.º de ESO): generadores nuevos (los demás
   temas usan los de los grados 7, 8 y 11). Textos: i18n/<lang>/mat9.js (S.m9). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F, gcd, polyHtml, polyText } = WA.MATH;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pt = (x, y) => `(${neg(x)}, ${neg(y)})`;
const fr = (n, d) => F.make(n, d);
const mulP = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
const addP = (a, b) => { const n = Math.max(a.length, b.length), A = Array(n - a.length).fill(0).concat(a), B = Array(n - b.length).fill(0).concat(b); return A.map((x, i) => x + B[i]); };
const trim = p => { let i = 0; while (i < p.length - 1 && !p[i]) i++; return p.slice(i); };
const evalP = (p, x) => p.reduce((s, c) => s * x + c, 0);
const choice = (R, ok, alts) => { const opts = R.shuffle([ok, ...[...new Set(alts.map(String))].filter(x => x !== String(ok))].slice(0, 3)); return { kind: "choice", opts, correct: opts.indexOf(ok) }; };

// ── Aproximaciones y errores ──
def("m9.error", (R, S, H) => {
  if (R.r() < 0.55) {
    const x = R.int(10000, 99999) / 1000 + R.int(1, 9) / 1e4, k = R.int(1, 2), a = rd(x, k), e = rd(Math.abs(x - a), 4);
    return { q: S.m9.er_q(H.dec(x), k), kind: "fields", fields: [{ label: S.m9.er_f[0], kind: "num", ans: a, tol: 1e-9 }, { label: S.m9.er_f[1], kind: "num", ans: e, tol: 1e-6 }], sol: S.m9.er_s(H.dec(x), H.dec(a), H.dec(e)) };
  }
  const real = R.int(20, 400), err = R.pick([1, 2, 4, 5]) * (R.r() < 0.5 ? 1 : -1), m = real + err, er = rd(Math.abs(err) / real * 100);
  const q4 = rd(Math.abs(err) / real, 4), exact = Math.abs(Math.abs(err) * 10000 - q4 * 10000 * real) < 1e-6;
  return { q: S.m9.err_q(real, m), kind: "num", ans: er, tol: 0.011, sol: S.m9.err_s(real, m, Math.abs(err), er.toFixed(2).replace(".", WA.H.ds), q4.toFixed(4).replace(".", WA.H.ds), exact) };
});
// Cotas de error, truncar/redondear (defecto y exceso) y cifras significativas (lo que m9.error no practica).
def("m9.cota", (R, S, H) => {
  const v = R.r();
  if (v < 0.5) {   // cota de un redondeo: absoluta y relativa
    const k = R.int(1, 2), x = k === 1 ? R.int(12, 250) / 10 : R.int(12, 199) / 100, c = 0.5 / 10 ** k, q4 = rd(c / x, 4), p = rd(c / x * 100, 1), u = R.pick(S.m9.ct_u);
    if (!p) return null;
    return { q: S.m9.ct_q(H.dec(x), k, u), kind: "fields",
      fields: [{ label: S.m9.ct_f[0], kind: "num", ans: c, tol: 1e-9 }, { label: S.m9.ct_f[1], kind: "num", ans: p, tol: 0.051 }],
      sol: S.m9.ct_s(k, H.dec(c), H.dec(x), H.dec(q4), H.dec(p), u) };
  }
  if (v < 0.8) {   // truncar y redondear a las centésimas o a las décimas
    const k = R.int(1, 2), X = R.int(1000, 99999), x = X / 10000;   // en enteros, para no arrastrar errores de coma flotante
    const T = Math.floor(X / 10 ** (4 - k)), dig = Math.floor(X / 10 ** (3 - k)) % 10, t = rd(T / 10 ** k, k), r = rd((T + (dig >= 5 ? 1 : 0)) / 10 ** k, k);
    if (X % 10 ** (4 - k) === 0 || X % 10 === 0) return null;
    return { q: S.m9.tr0_q(H.dec(x), k), kind: "fields", fields: [{ label: S.m9.tr0_f[0], kind: "num", ans: t, tol: 1e-9 }, { label: S.m9.tr0_f[1], kind: "num", ans: r, tol: 1e-9 }],
      sol: S.m9.tr0_s(H.dec(x), k, H.dec(t), dig, r > x ? H.dec(r) : null, H.dec(r)) };
  }
  // cifras significativas de un decimal (sin enteros acabados en cero, que son ambiguos)
  const z = R.int(0, 3), n = z ? R.int(2, 4) : R.int(3, 4);
  const ds = [R.int(1, 9), ...Array.from({ length: n - 1 }, () => R.r() < 0.35 ? 0 : R.int(1, 9))];
  let s;
  if (z) s = "0" + WA.H.ds + "0".repeat(z - 1) + ds.join("");
  else { const ip = R.int(1, Math.min(2, n - 1)); s = ds.slice(0, ip).join("") + WA.H.ds + ds.slice(ip).join(""); }
  return { q: S.m9.cs_q(s), kind: "int", ans: n, sol: S.m9.cs_s(s, z, ds.join(", "), n, ds.slice(1).includes(0)) };
});

// ── Números racionales: tipo de decimal, fracción generatriz y números irracionales ──
// Tipo de decimal con fracciones a veces sin simplificar (la trampa de la lección).
def("m9.dec.tipo", (R, S, H) => {
  const c = R.int(0, 2);
  const [n0, d0] = R.pick([
    [[3, 8], [7, 20], [9, 40], [3, 5], [7, 25], [1, 4], [3, 16], [11, 50], [13, 20]],
    [[2, 3], [5, 9], [3, 11], [4, 7], [7, 9], [5, 33], [10, 13], [8, 27]],
    [[5, 6], [7, 12], [11, 30], [1, 6], [7, 15], [5, 22], [13, 18], [4, 45]]][c]);
  const k = R.r() < 0.45 ? R.pick(c === 1 ? [2, 5, 10] : [3, 7, 9]) : 1, n = n0 * k, d = d0 * k;
  const fd = WA.MATH.factorsHtml(WA.MATH.factorize(d0), H), fac = fd === String(d0) ? String(d0) : `${d0} = ${fd}`;
  return { q: S.m9.dt_q(H.frac(n, d)), kind: "choice", opts: S.m9.dt_o, correct: c, shuffle: false, sol: S.m9.dt_s(`${n}/${d}`, k > 1 ? `${n0}/${d0}` : null, k, fac, c) };
});
// Fracción generatriz con las dos vías de la lección: el método de la resta y la regla rápida.
def("m9.dec.generatriz", (R, S, H) => {
  const sep = H.dec(1.5).replace(/[0-9]/g, "") || ",";
  const E = R.pick([0, 0, 0, 1, 2, 3, 5]), a = R.pick([0, 0, 1, 1, 1, 2]), k = a === 2 ? 1 : R.pick([1, 1, 2]);
  const ante = a ? String(a === 2 ? R.int(10, 99) : R.int(0, 9)).padStart(a, "0") : "";
  let per; do per = String(k === 1 ? R.int(1, 8) : R.int(1, 98)).padStart(k, "0"); while (k === 2 && per[0] === per[1]);
  if (a && ante.slice(-1) === per.slice(-1)) return null;   // 0,4545… escrito como 0,4(54): sería puro
  const big = +(String(E) + ante + per), small = +(String(E) + ante), num = big - small;
  const m1 = 10 ** (a + k), m0 = 10 ** a, den = m1 - m0, ans = F.make(num, den);
  const tail = per.repeat(k === 1 ? 3 : 2) + "…";
  const shown = `${E}${sep}${ante}<span style="text-decoration:overline">${per}</span>`;
  return { q: S.m9.dg_q(shown), kind: "frac", ans, simplest: true,
    sol: S.m9.dg_s(`${E}${sep}${ante}${tail}`, m1, `${big}${sep}${tail}`, m0, `${small}${sep}${tail}`, den, num, big, small, k, a, `${num}/${den}`, F.text(ans)) };
});
// ¿Racional o irracional?, con el porqué de cada caso (m10.irracional da la misma frase para todo).
def("m9.irracional", (R, S) => {
  const sq = R.int(2, 12), q = R.int(2, 9), p = R.int(1, 20), ns = R.pick([2, 3, 5, 6, 7, 10, 11, 13, 15]), cb = R.int(2, 5), nc = R.pick([2, 3, 4, 5, 9]);
  const a = R.int(1, 8), b = R.int(a + 1, 10), g = gcd(a, b), k = R.int(2, 5), t = R.pick([2, 3, 5]);
  const pool = [
    [`√${sq * sq}`, 0, S.m9.ir_r.cuad(sq * sq, sq)], [`√${ns}`, 1, S.m9.ir_r.nocuad(ns)], ["π", 1, S.m9.ir_r.pi], [`${p}/${q}`, 0, S.m9.ir_r.frac],
    [`0${WA.H.ds}${"3".repeat(3)}…`, 0, S.m9.ir_r.per], [WA.H.esn("0,1010010001…"), 1, S.m9.ir_r.sinper], [`√(${a * a}/${b * b})`, 0, S.m9.ir_r.cfrac(a * a, b * b, a, b, a / g, b / g)],
    [`${k} + √${t}`, 1, S.m9.ir_r.suma(k, t)], [`${p}${WA.H.ds}${R.int(10, 99)}`, 0, S.m9.ir_r.exacto], ["e", 1, S.m9.ir_r.e], [`${k}π`, 1, S.m9.ir_r.kpi(k)],
    [`∛${cb ** 3}`, 0, S.m9.ir_r.cubo(cb ** 3, cb)], [`∛${nc}`, 1, S.m9.ir_r.nocubo(nc)], [`√${t} · √${t * k * k}`, 0, S.m9.ir_r.prod(t, t * k * k, t * t * k * k, t * k)],
  ];
  const [x, irr, why] = R.pick(pool);
  return { q: S.m9.ir_q(x), kind: "choice", opts: S.m9.ir_o, correct: irr, shuffle: false, sol: why };
});

// ── Potencias de exponente fraccionario y radicales ──
def("m9.potfrac", (R, S, H) => {
  const n = R.pick([2, 3]), b = R.int(2, n === 2 ? 6 : 4), m = R.pick([1, 2, 3].filter(k => k % n)), a = b ** n;   // nunca 2/2 ni 3/3
  if (R.r() < 0.6) return { q: S.m9.pf_q(`${a}<sup>${m}/${n}</sup>`), kind: "int", ans: b ** m, sol: S.m9.pf_s(a, m, n, b, b ** m) };
  const base = R.pick([2, 3, 5, 7, "x", "a"]), e = R.int(2, 5), r = R.pick([2, 3, 4].filter(k => k !== e));
  if (e % r === 0) return null;
  const g = gcd(e, r), ok = `${base}<sup>${e / g}/${r / g}</sup>`;
  const idx = r === 2 ? "" : `<sup>${r}</sup>`;
  return Object.assign({ q: S.m9.pf2_q(`${idx}√${base}<sup>${e}</sup>`), sol: S.m9.pf2_s(ok) }, choice(R, ok, [`${base}<sup>${r}/${e}</sup>`, `${base}<sup>${e * r}</sup>`, `${base}<sup>${e - r}</sup>`, `${base}<sup>${e + r}</sup>`]));
});
// Exponentes fraccionarios negativos, pasar a potencias para operar radicales y sumar exponentes (lo nuevo de la lección).
const RAD = (d, base, e) => `${d === 2 ? "" : `<sup>${d}</sup>`}√${base}${e > 1 ? `<sup>${e}</sup>` : ""}`;
const POW = (base, n, d) => d === 1 ? `${base}${n > 1 ? `<sup>${n}</sup>` : ""}` : `${base}<sup>${n}/${d}</sup>`;
def("m9.potfrac.ops", (R, S, H) => {
  const v = R.r();
  if (v < 0.35) {   // √x · ∛x = ⁶√x⁵
    const PE = [[2, 1], [3, 1], [3, 2], [4, 1], [4, 3]], div = R.r() < 0.35, base = R.pick(["x", "a", "x", "b"]);
    let p, e1, q, e2; do { [p, e1] = R.pick(PE); [q, e2] = R.pick(PE); } while (p === q || (div && e1 * q <= e2 * p));
    const L = p * q / gcd(p, q), num = e1 * L / p + (div ? -1 : 1) * e2 * L / q;

    const g = gcd(num, L), n = num / g, d = L / g;
    const ok = d === 1 ? POW(base, n, 1) : RAD(d, base, n);
    const alts = [RAD(p + q, base, e1 + e2), RAD(p * q, base, 1), RAD(2, base, e1 + e2), RAD(L, base, e1 * e2 + 1), RAD(p + q, base, 1)];
    const op = div ? ` ${WA.H.div} ` : " · ";
    return Object.assign({ q: S.m9.po_q(RAD(p, base, e1) + op + RAD(q, base, e2)),
      sol: S.m9.po_s(POW(base, e1, p) + op + POW(base, e2, q), base, `${e1}/${p} ${div ? "−" : "+"} ${e2}/${q}`, `${e1 * L / p}/${L} ${div ? "−" : "+"} ${e2 * L / q}/${L}`, g > 1 ? `${num}/${L}` : null, d === 1 ? String(n) : `${n}/${d}`, ok) }, choice(R, ok, alts));
  }
  if (v < 0.7) {   // 8^(−2/3) = 1/4
    const n = R.pick([2, 3]), b = R.int(2, n === 2 ? 5 : 4), m = R.pick([1, 2, 3].filter(k => k % n && b ** k <= 125)), a = b ** n;
    return { q: S.m9.pf_q(`${a}<sup>−${m}/${n}</sup>`), kind: "frac", ans: [1, b ** m], sol: S.m9.pn_s(a, m, n, b, b ** m) };
  }
  // misma base: se suman (o restan) los exponentes y sale un entero
  const base = R.pick([2, 3, 5, 2, 3]), q = R.pick([2, 3, 4]), k = R.int(1, base === 5 ? 2 : 3), div = R.r() < 0.4;
  let p, r; do { r = R.int(1, div ? 2 * q - 1 : k * q - 1); p = div ? k * q + r : k * q - r; } while (gcd(r, q) > 1 || gcd(p, q) > 1);
  return { q: S.m9.ps_q(`${base}<sup>${p}/${q}</sup>${div ? ` ${WA.H.div} ` : " · "}${base}<sup>${r}/${q}</sup>`), kind: "int", ans: base ** k,
    sol: S.m9.ps_s(div, p, r, q, k, base, base ** k) };
});
// Cuántas soluciones tiene xⁿ = a, simplificar un radical (radicales equivalentes) y comparar radicales de distinto índice.
def("m9.rad.equiv", (R, S) => {
  const v = R.r();
  if (v < 0.4) {
    const n = R.pick([2, 3, 4, 5, 6]), b = R.int(1, n <= 3 ? 5 : 2), sg = R.r() < 0.45 ? -1 : 1, a = sg * b ** n;
    const c = sg < 0 && n % 2 === 0 ? 0 : n % 2 ? 1 : 2;
    return { q: S.m9.re0_q(n, neg(a)), kind: "choice", opts: S.m9.re0_o, correct: c, shuffle: false, sol: S.m9.re0_s[c](n, neg(a), b) };
  }
  if (v < 0.7) {
    const [n, m] = R.pick([[2, 1], [3, 1], [3, 2], [4, 1], [4, 3]]), k = R.int(2, 3), base = R.pick([2, 3, 5, 7, "a", "x"]);
    return { q: S.m9.re1_q(RAD(k * n, base, k * m)), kind: "fields", fields: [{ label: S.m9.re1_f[0], ans: n }, { label: S.m9.re1_f[1], ans: m }],
      sol: S.m9.re1_s(RAD(k * n, base, k * m), k, RAD(n, base, m), n, m) };
  }
  const NP = { 2: [2, 3, 5, 6, 7, 8, 10], 3: [2, 3, 4, 5, 6, 7, 9], 4: [2, 3, 5, 6, 7], 6: [2, 3, 5] };   // radicandos que no son potencias exactas
  const [p, q] = R.pick([[2, 3], [3, 2], [2, 4], [4, 2], [3, 6]]), L = p * q / gcd(p, q), a = R.pick(NP[p]), b = R.pick(NP[q]);
  const A = a ** (L / p), B = b ** (L / q);
  if (A > 400 || B > 400) return null;
  const c = A > B ? 0 : A < B ? 1 : 2, r1 = RAD(p, a, 1), r2 = RAD(q, b, 1);
  return { q: S.m9.re2_q(r1, r2), kind: "choice", opts: S.m9.re2_o(r1, r2), correct: c, shuffle: false,
    sol: S.m9.re2_s(L, p, q, r1, r2, RAD(L, a, L / p), RAD(L, b, L / q), RAD(L, A, 1), RAD(L, B, 1), A, B, c) };
});
def("m9.radical", (R, S) => {
  const n = R.pick([2, 3, 3, 4, 5]), b = R.int(2, n === 2 ? 15 : n === 3 ? 6 : 3), s = n % 2 && R.r() < 0.35 ? -1 : 1, x = s * b ** n;
  const idx = n === 2 ? "" : `<sup>${n}</sup>`;
  return { q: S.m9.ra_q(`${idx}√${neg(x)}`), kind: "int", ans: s * b, sol: S.m9.ra_s(neg(s * b), n, neg(x)) };
});
def("m9.radmult", (R, S) => {
  const k = R.int(0, 2);
  if (k === 0) { const p = R.pick([2, 3, 5, 6, 7]), m = R.int(1, 4), n = R.int(1, 4); if (m === n && m === 1) return null; return { q: S.m9.rm_q(`√${p * m * m} · √${p * n * n}`), kind: "int", ans: p * m * n, sol: S.m9.rm_s(p * m * m, p * n * n, p, m, n, p * m * n) }; }
  if (k === 1) { const y = R.pick([2, 3, 5, 6, 7]), c = R.int(2, 6); return { q: S.m9.rm_q(`√${y * c * c} ${WA.H.div} √${y}`), kind: "int", ans: c, sol: S.m9.rd_s(y * c * c, y, c * c, c) }; }
  const a = R.int(2, 6), b = R.pick([2, 3, 5, 7]);
  return { q: S.m9.ri_q(`${a}√${b}`), kind: "int", ans: a * a * b, sol: S.m9.ri_s(a, b, a * a * b) };
});
// Extraer factores (sustituye en 3.º a m11.re.extraer): raíz cuadrada o cúbica, con la descomposición agrupada.
const SUPN = n => n > 1 ? `<sup>${n}</sup>` : "";
def("m9.rad.extraer", (R, S) => {
  const cube = R.r() < 0.3, idx = cube ? 3 : 2;
  let a, b; do { a = cube ? R.int(2, 4) : R.int(2, 8); b = cube ? R.pick([2, 3, 4, 5, 6, 7, 9, 10]) : R.pick([2, 3, 5, 6, 7, 10, 11, 13, 14, 15]); } while (a ** idx * b > 640);   // radicando ≤ 640
  const n = a ** idx * b;
  const f = WA.MATH.factorize(n), ps = Object.keys(f).map(Number).sort((p, q) => p - q);
  const fs = ps.map(p => `${p}${SUPN(f[p])}`).join(" · ");
  const grp = [...ps.filter(p => f[p] >= idx).map(p => `${p}${SUPN(idx * Math.floor(f[p] / idx))}`), ...ps.filter(p => f[p] % idx).map(p => `${p}${SUPN(f[p] % idx)}`)].join(" · ");
  const outs = ps.filter(p => f[p] >= idx).map(p => `${p}${SUPN(Math.floor(f[p] / idx))}`), ins = ps.filter(p => f[p] % idx).map(p => `${p}${SUPN(f[p] % idx)}`);
  const r = cube ? "<sup>3</sup>√" : "√";
  return { q: S.m9.rx_q(`${r}${n}`, cube), kind: "fields", fields: [{ label: S.m9.rx_f[0], ans: a }, { label: S.m9.rx_f[1], ans: b }],
    sol: S.m9.rx_s(r, n, fs, grp === fs ? null : grp, cube, outs.join(" · "), a, ins.join(" · "), b) };
});
// Sumar radicales (sustituye en 3.º a m11.re.sumarad): se extraen factores y se suman los coeficientes.
def("m9.rad.suma", (R, S) => {
  const b = R.pick([2, 3, 5]), n = R.int(2, 3);
  let ks, k;   // al menos dos radicandos distintos (hay que extraer factores) y resultado distinto de 0
  do { ks = Array.from({ length: n }, () => [rnz(R, -5, 6), R.int(1, 4)]); k = ks.reduce((s, [c, m]) => s + c * m, 0); } while (!k || new Set(ks.map(([, m]) => m)).size < 2);
  const co = (c, i) => (i ? (c < 0 ? " − " : " + ") : (c < 0 ? "−" : "")) + (Math.abs(c) === 1 ? "" : Math.abs(c));
  const terms = ks.map(([c, m], i) => `${co(c, i)}√${m * m * b}`).join("");
  const ext = [...new Set(ks.filter(([, m]) => m > 1).map(([, m]) => m))].sort((x, y) => x - y).map(m => `√${m * m * b} = √(${m * m} · ${b}) = ${m}√${b}`).join("; ");
  const sub = ks.map(([c, m], i) => `${co(c * m, i)}√${b}`).join("");
  const sum = ks.map(([c, m], i) => i ? (c * m < 0 ? " − " : " + ") + Math.abs(c * m) : neg(c * m)).join("");
  return { q: S.m9.rs_q(terms), kind: "fields", fields: [{ label: S.m9.rs_f(b), ans: k }], sol: S.m9.rs_s(ext, sub, sum, neg(k), `${co(k, 0)}√${b}`) };
});

// Notación científica: sumar con distinta potencia, elevar y hacer raíces (lo nuevo de 3.º; multiplicar y dividir ya está en m8.cientops).
const P10 = e => `10<sup>${neg(e)}</sup>`;
const SCI = (m, e, H) => `${H.dec(m)} · ${P10(e)}`;
const norm10 = (M, e) => {   // M entero positivo × 10^e → [mantisa, exponente]
  const L = String(M).length - 1;
  return [rd(M / 10 ** L, 6), e + L];
};
def("m9.cientifica", (R, S, H) => {
  const v = R.r();
  let ans, q, sol;
  if (v < 0.4) {   // suma o resta con potencias distintas
    const d = R.int(1, 2), resta = R.r() < 0.4, nz = () => { let x; do x = R.int(11, 99); while (x % 10 === 0); return x; };
    const M1 = nz(), M2 = nz(); let e1; do e1 = R.int(-8, 12); while (e1 === 0 || e1 - d === 0);
    const A = M1 * 10 ** d, B = M2, Sm = resta ? A - B : A + B, base = e1 - 1 - d;
    const [m, e] = norm10(Sm, base), m1 = M1 / 10, m2 = M2 / 10, m2b = rd(m2 / 10 ** d, 6), sum = rd(m1 + (resta ? -m2b : m2b), 6);
    q = SCI(m1, e1, H) + (resta ? " − " : " + ") + SCI(m2, e1 - d, H);
    ans = [m, e];
    sol = S.m9.sc_sum(SCI(m2, e1 - d, H), SCI(m2b, e1, H), H.dec(m1), resta, H.dec(m2b), P10(e1), H.dec(sum), e === e1 ? null : SCI(m, e, H));
  } else if (v < 0.7) {   // potencia
    const k = R.r() < 0.6 ? 2 : 3, m = R.pick(k === 2 ? [2, 3, 4, 5, 6, 7, 8, 9, 1.5, 2.5, 1.2] : [2, 3, 4, 5, 1.5]), e = rnz(R, -6, 7);
    const mk = rd(m ** k, 6), [mm, ee] = norm10(Math.round(mk * 1000), e * k - 3);
    q = `(${SCI(m, e, H)})<sup>${k}</sup>`;
    ans = [mm, ee];
    sol = S.m9.sc_pow(H.dec(m), k, H.dec(mk), neg(e), neg(e * k), mk >= 10 ? SCI(mm, ee, H) : null, SCI(mk, e * k, H));
  } else {   // raíz cuadrada (si el exponente es impar, se reescribe antes)
    const r = R.pick([2, 3, 4, 5, 6, 7, 8, 9, 1.2, 1.5]), f = rnz(R, -6, 7), r2 = rd(r * r, 6);
    const odd = r2 >= 10, m0 = odd ? rd(r2 / 10, 6) : r2, e0 = odd ? 2 * f + 1 : 2 * f;
    q = `√(${SCI(m0, e0, H)})`;
    ans = [r, f];
    sol = S.m9.sc_root(odd, SCI(m0, e0, H), H.dec(r2), neg(2 * f), e0, H.dec(r), neg(f));
  }
  return { q: S.m9.sc_q(q), kind: "fields", fields: [{ label: S.m9.sc_f[0], kind: "num", ans: ans[0], tol: 1e-9 }, { label: S.m9.sc_f[1], ans: ans[1] }], sol };
});

// ── Sucesiones y progresiones ──
def("m9.suc.termino", (R, S) => {
  const k = R.int(0, 2), n = R.int(5, 20);
  if (k === 0) { const p = rnz(R, -5, 6), q = R.int(-9, 9); const f = `${p === 1 ? "" : p === -1 ? "−" : neg(p)}n${q ? (q < 0 ? " − " : " + ") + Math.abs(q) : ""}`; return { q: S.m9.st_q(f, n), kind: "int", ans: p * n + q, sol: S.m9.st_s(`${p === 1 ? "" : p === -1 ? "−" : neg(p) + " · "}${n}${q ? (q < 0 ? " − " : " + ") + Math.abs(q) : ""}`, neg(p * n + q)) }; }
  if (k === 1) { const q = R.int(-9, 9), nn = R.int(3, 12); const f = `n²${q ? (q < 0 ? " − " : " + ") + Math.abs(q) : ""}`; return { q: S.m9.st_q(f, nn), kind: "int", ans: nn * nn + q, sol: S.m9.st_s(f.replace("n²", nn + "²"), neg(nn * nn + q)) }; }
  if (R.r() < 0.5) {   // de los términos al término general (el «trabajo de detective» del Ejemplo 3)
    const a = R.int(-6, 15), d = rnz(R, -6, 7), seq = [0, 1, 2, 3].map(i => a + i * d), c = a - d;
    const L = (p, q) => WA.MATH.lin(p, q, "n"), ok = L(d, c);
    return Object.assign({ q: S.m9.tg_q(seq.map(neg).join(", ")), sol: S.m9.tg_s(d, a, c, ok) }, choice(R, ok, [L(1, a - 1), L(d, a), L(a, 0), L(d, c + 2 * (c >= 0 ? 1 : -1)), L(-d, a + d)]));
  }
  // ¿qué lugar ocupa un número? (a veces no pertenece)
  const p = R.int(2, 7), q = R.int(-6, 9), n0 = R.int(8, 60), inS = R.r() < 0.7, v = p * n0 + q + (inS ? 0 : R.int(1, p - 1));
  return { q: S.m9.lu_q(v, WA.MATH.lin(p, q, "n")), kind: "int", ans: inS ? n0 : 0, sol: S.m9.lu_s(p, q, v, inS, n0) };
});
def("m9.suc.arit", (R, S) => {
  const a1 = R.int(-10, 15), d = rnz(R, -5, 6), k = R.int(0, 1);
  if (k === 0) { const n = R.int(8, 40); return { q: S.m9.pa_q(neg(a1), neg(d), n), kind: "int", ans: a1 + (n - 1) * d, sol: S.m9.pa_s(n, neg(a1), n - 1, neg(d), neg(a1 + (n - 1) * d)) }; }
  const i = R.int(2, 5), j = i + R.int(2, 6), ai = a1 + (i - 1) * d, aj = a1 + (j - 1) * d;
  return { q: S.m9.pa2_q(i, neg(ai), j, neg(aj)), kind: "fields", fields: [{ label: "d", ans: d }, { label: "a₁", ans: a1 }], sol: S.m9.pa2_s(neg(aj), neg(ai), j - i, neg(d), neg(a1), i, (i - 1) * d) };
});
def("m9.suc.geom", (R, S, H) => {
  const a1 = rnz(R, -5, 6), r = R.pick([2, 3, -2, -3, 2]), k = R.r();
  if (k < 0.3) {
    if (R.r() < 0.35) {   // razón fraccionaria: progresión decreciente
      const m = R.pick([2, 3]), n = R.int(3, m === 2 ? 6 : 4), c = R.int(1, 3), b1 = c * m ** (n - 1);
      return { q: S.m9.pg_q(b1, `1/${m}`, n), kind: "int", ans: c, sol: S.m9.pg_s(n, b1, `1/${m}`, n - 1, c) };
    }
    const n = R.int(4, r === 2 || r === -2 ? 8 : 6); return { q: S.m9.pg_q(neg(a1), neg(r), n), kind: "int", ans: a1 * r ** (n - 1), sol: S.m9.pg_s(n, neg(a1), neg(r), n - 1, neg(a1 * r ** (n - 1))) };
  }
  if (k < 0.55) { const seq = [0, 1, 2].map(i => a1 * r ** i);
    return { q: S.m9.pg2_q(seq.map(neg).join(", ")), kind: "fields", fields: [{ label: "r", ans: r }, { label: S.m9.next, ans: a1 * r ** 3 }], sol: S.m9.pg2_s(neg(seq[1]), neg(seq[0]), neg(r), neg(a1 * r ** 3)) }; }
  if (k < 0.75) {   // la razón a partir de dos términos (tres saltos: r³)
    const i = R.int(1, 4), ai = a1 * r ** (i - 1), aj = ai * r ** 3;
    return { q: S.m9.pg3_q(i, neg(ai), i + 3, neg(aj)), kind: "int", ans: r, sol: S.m9.pg3_s(neg(aj), neg(ai), neg(r ** 3), neg(r)) };
  }
  // cambios porcentuales repetidos: multiplicar por 1 ± p/100
  const V = R.pick([200, 400, 500, 800, 1000, 1500, 2000, 1200]), up = R.r() < 0.5, p = up ? R.pick([2, 3, 4, 5, 10]) : R.pick([10, 15, 20, 25, 30]), n = R.int(2, 4);
  const f = up ? 1 + p / 100 : 1 - p / 100, fn = rd(f ** n, 6), res = rd(V * f ** n, 2);
  return { q: S.m9.pp_q[up ? 0 : 1](V, p, n), kind: "num", ans: res, tol: 0.011, sol: S.m9.pp_s(up, p, H.dec(f), V, n, H.dec(fn), res.toFixed(2).replace(".", WA.H.ds)) };
});
def("m9.suc.suma", (R, S, H) => {
  const v = R.r();
  if (v < 0.45) {
    if (R.r() < 0.4) {   // con enunciado de problema (ahorro o butacas)
      const a1 = R.int(2, 15), d = R.int(1, 5), n = R.int(8, 30), an = a1 + (n - 1) * d, s = (a1 + an) * n / 2, t = R.int(0, 1);
      if (!Number.isInteger(s)) return null;
      return { q: S.m9.sp3_q[t](a1, d, n), kind: "int", ans: s, sol: S.m9.sp3_i[t](a1, d) + " " + S.m9.sa_s(n, neg(an), neg(a1), neg(s), n - 1, neg(d)) };
    }
    const a1 = R.int(-5, 12), d = rnz(R, -3, 5), n = R.int(6, 30), an = a1 + (n - 1) * d, s = (a1 + an) * n / 2;
    if (!Number.isInteger(s)) return null;
    return { q: S.m9.sa_q(neg(a1), neg(d), n), kind: "int", ans: s, sol: S.m9.sa_s(n, neg(an), neg(a1), neg(s), n - 1, neg(d)) };
  }
  if (v < 0.72) {   // suma infinita, |r| < 1
    const m = R.pick([2, 3, 4]), a1 = R.int(1, 5) * m, t = [a1, F.make(a1, m), F.make(a1, m * m)].map(x => Array.isArray(x) ? F.text(x) : String(x)), Sv = F.make(a1 * m, m - 1);
    return { q: S.m9.si2_q(t.join(" + ")), kind: "frac", ans: Sv, sol: S.m9.si2_s(t[1], t[0], m, a1, F.text(F.make(m - 1, m)), F.text(Sv)) };
  }
  const a1 = R.int(1, 5), r = R.pick([2, 3]), n = R.int(4, r === 2 ? 8 : 6), s = a1 * (r ** n - 1) / (r - 1);
  return { q: S.m9.sg_q(a1, r, n), kind: "int", ans: s, sol: S.m9.sg_s(a1, r, n, s) };
});

// ── División de polinomios, Ruffini, teorema del resto y factorización ──
def("m9.pol.division", (R, S) => {
  const dg = R.r() < 0.5 ? 1 : 2, D = dg === 1 ? [1, rnz(R, -5, 5)] : [1, R.int(-3, 3), rnz(R, -4, 4)];
  const Q = [rnz(R, -3, 4), R.int(-5, 5), ...(R.r() < 0.5 ? [R.int(-5, 5)] : [])], Rm = dg === 1 ? [R.int(-9, 9)] : [R.int(-4, 4), R.int(-7, 7)];
  const P = trim(addP(mulP(D, Q), Rm)), rr = trim(Rm);
  // los pasos del algoritmo, como en la lección: dividir el primer término, multiplicar, restar (D es mónico)
  const steps = []; let rem = P.slice();
  while (rem.length >= D.length) {
    const k = rem.length - D.length, t = rem[0], mono = [t, ...Array(k).fill(0)], prod = mulP(D, mono);
    const next = trim(addP(rem, prod.map(c => -c)));
    steps.push(S.m9.dv_step(polyHtml([t, ...Array(rem.length - 1).fill(0)]), polyHtml([1, ...Array(D.length - 1).fill(0)]), polyHtml(mono), polyHtml(D), polyHtml(prod), polyHtml(next)));
    rem = next;
  }
  return { q: S.m9.dv_q(polyHtml(P), polyHtml(D)), kind: "fields", hint: S.m9.pol_hint,
    fields: [{ label: S.m9.dv_f[0], kind: "expr", ans: polyText(Q), ansHtml: polyHtml(Q) }, { label: S.m9.dv_f[1], kind: "expr", ans: polyText(rr), ansHtml: polyHtml(rr) }],
    sol: S.m9.dv_s(polyHtml(P), polyHtml(D), polyHtml(Q), polyHtml(rr), steps.join(" ")) };
});
def("m9.pol.ruffini", (R, S) => {
  const a = rnz(R, -4, 4), Q = [rnz(R, -3, 3), R.int(-5, 5), R.int(-6, 6)], r = R.int(-8, 8), P = addP(mulP([1, -a], Q), [r]);
  const D = polyHtml([1, -a]);
  // la fila de abajo, columna a columna: se baja el primero; después, (último · a) + coeficiente
  const row = [P[0]], cols = [];
  for (let i = 1; i < P.length; i++) { const m = row[i - 1] * a; row.push(m + P[i]); cols.push(`${neg(row[i - 1])} · ${a < 0 ? "(" + neg(a) + ")" : a} = ${neg(m)} → ${neg(P[i])} ${m < 0 ? "−" : "+"} ${Math.abs(m)} = ${neg(row[i])}`); }
  return { q: S.m9.ru_q(polyHtml(P), D), kind: "fields", hint: S.m9.pol_hint,
    fields: [{ label: S.m9.dv_f[0], kind: "expr", ans: polyText(Q), ansHtml: polyHtml(Q) }, { label: S.m9.dv_f[1], ans: r }],
    sol: S.m9.ru_s(neg(a), P.map(neg).join(", "), polyHtml(Q), neg(r), neg(P[0]), cols.join(". ")) };
});
// P(a) escrito con la sustitución y con el valor de cada término: −(−3)³ + 3 · (−3)² … = 27 + 27 − 9 + 6
const subst = (P, a) => {
  const deg = P.length - 1, pa = a < 0 ? `(${neg(a)})` : String(a), sub = [], val = [];
  P.forEach((c, i) => {
    if (!c) return; const e = deg - i, A = Math.abs(c), v = c * a ** e;
    const body = e === 0 ? String(A) : `${A === 1 ? "" : A + " · "}${pa}${e > 1 ? `<sup>${e}</sup>` : ""}`;
    sub.push((c < 0 ? (sub.length ? " − " : "−") : sub.length ? " + " : "") + body);
    val.push((v < 0 ? (val.length ? " − " : "−") : val.length ? " + " : "") + Math.abs(v));
  });
  return [sub.join(""), val.join("")];
};
def("m9.pol.resto", (R, S) => {
  const P = [rnz(R, -3, 3), R.int(-5, 5), R.int(-6, 6), R.int(-9, 9)], a = rnz(R, -3, 3);
  if (R.r() < 0.6) { const [s, v] = subst(P, a); return { q: S.m9.re_q(polyHtml(P), polyHtml([1, -a])), kind: "int", ans: evalP(P, a), sol: S.m9.re_s(neg(a), polyHtml(P), neg(evalP(P, a)), s, v) }; }
  const base = P.slice(0, 3), k = -evalP([...base, 0], a), [s, v] = subst([...base, 0], a);
  return { q: S.m9.rk_q(polyHtml([...base, 0]).replace(/$/, " + k"), polyHtml([1, -a])), kind: "int", ans: k, sol: S.m9.rk_s(neg(a), neg(k), s, v, neg(-k)) };
});
// Factorizar con coeficiente principal distinto de 1 y con un factor irreducible (lo que m9.pol.factoriza, que usa Mates 10, no trae).
def("m9.pol.factoriza2", (R, S) => {
  if (R.r() < 0.55) {   // coeficiente principal: 2x³ − 2x² − 4x = 2x(x + 1)(x − 2)
    const c = R.pick([2, 3, -1, -2]), zero = R.r() < 0.5;
    let roots; do roots = zero ? [0, rnz(R, -4, 4), rnz(R, -4, 4)] : [rnz(R, -4, 4), rnz(R, -4, 4), rnz(R, -3, 3)]; while (new Set(roots).size < 3);
    const P = roots.reduce((p, t) => mulP(p, [1, -t]), [c]);
    const fs = roots.slice().sort((x, y) => (x === 0 ? -1 : y === 0 ? 1 : y - x)).map(t => t === 0 ? "x" : `(${polyHtml([1, -t])})`).join("");
    const cs = c === 1 ? "" : c === -1 ? "−" : neg(c);
    const ok = cs + fs, alts = [fs, (c < 0 ? "" : "−") + (Math.abs(c) === 1 ? "" : Math.abs(c)) + fs, cs + roots.map(t => t === 0 ? "x" : `(${polyHtml([1, t])})`).join(""), `${neg(c * 2)}${fs}`];
    const Q = roots.reduce((p, t) => mulP(p, [1, -t]), [1]);
    // los pasos de la lección para el polinomio mónico: factor común x o Ruffini con un divisor, y después el trinomio
    const quad = ([u, v]) => S.m9.fa_quad(polyHtml(mulP([1, -u], [1, -v])), -u - v, u * v, neg(-u), neg(-v));
    let steps;
    if (zero) { const rest = roots.filter(t => t); steps = S.m9.fa_comun(1, polyHtml(mulP([1, -rest[0]], [1, -rest[1]]))) + " " + quad(rest); }
    else {
      const k0 = Q[3], dv = []; for (let t = 1; t <= Math.abs(k0); t++) if (k0 % t === 0) dv.push(t);
      const r1 = dv.flatMap(t => [t, -t]).find(t => evalP(Q, t) === 0), others = roots.filter(t => t !== r1), Q2 = mulP([1, -others[0]], [1, -others[1]]);
      steps = S.m9.fa_ruf(Math.abs(k0), dv.map(t => "±" + t).join(", "), neg(r1), [...Q2, 0].map(neg).join(", "), polyHtml([1, -r1]), polyHtml(Q2)) + " " + quad(others);
    }
    return Object.assign({ q: S.m9.f2_q(polyHtml(P)), sol: S.m9.f2_s(polyHtml(P), cs, polyHtml(Q), ok, steps) }, choice(R, ok, alts));
  }
  // un factor irreducible: (x − a)(x² + k)
  const a = rnz(R, -4, 4), k = R.pick([1, 2, 3, 4, 5, 9]), Q = [1, 0, k], P = mulP([1, -a], Q);
  return { q: S.m9.f3_q(polyHtml(P)), kind: "int", ans: 1, sol: S.m9.f3_s(neg(a), polyHtml(P), [1, 0, k].map(neg).concat(["0"]).join(", "), polyHtml(Q), polyHtml([1, -a]), k) };
});
def("m9.pol.factoriza", (R, S) => {
  const roots = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
  if (new Set(roots).size < 2) return null;
  const P = roots.reduce((p, r) => mulP(p, [1, -r]), [1]);
  // factorización con potencias: primero x o x², después cada (x − r) con su exponente (raíces dobles al cuadrado)
  const mult = {}; roots.forEach(r => { mult[r] = (mult[r] || 0) + 1; });
  const rs = Object.keys(mult).map(Number).sort((x, y) => (x === 0 ? -1 : y === 0 ? 1 : y - x));
  const SQ = k => k > 1 ? `<sup>${k}</sup>` : "";
  const fac = rs.map(r => r === 0 ? `x${SQ(mult[r])}` : `(${polyHtml([1, -r])})${SQ(mult[r])}`).join("");
  const rootsTxt = rs.map(r => neg(r) + (mult[r] === 2 ? S.m9.fa_doble : "")).join(", ");
  // pasos como en la lección: factor común si el término independiente es 0; si no, Ruffini con un divisor
  const z = mult[0] || 0, rest = roots.filter(r => r !== 0);
  const quad = Q => { const u = -Q[0], v = -Q[1]; return S.m9.fa_quad(polyHtml([1, u + v, u * v]), u + v, u * v, neg(u), neg(v)); };   // x² + bx + c con raíces Q[0], Q[1]
  let steps;
  if (z) {
    const Qp = rest.reduce((p, r) => mulP(p, [1, -r]), [1]);
    steps = S.m9.fa_comun(z, polyHtml(Qp)) + (rest.length === 2 ? " " + quad(rest) : "");
  } else {
    const c = P[3], dv = []; for (let d = 1; d <= Math.abs(c); d++) if (c % d === 0) dv.push(d);
    const r1 = [...dv.flatMap(d => [d, -d])].find(d => evalP(P, d) === 0), others = [...rest]; others.splice(others.indexOf(r1), 1);
    const Qp = others.reduce((p, r) => mulP(p, [1, -r]), [1]);
    steps = S.m9.fa_ruf(Math.abs(c), dv.map(d => "±" + d).join(", "), neg(r1), mulP(Qp, [1, 0]).map(neg).join(", "), polyHtml([1, -r1]), polyHtml(Qp)) + " " + quad(others);
  }
  return { q: S.m9.fa_q(polyHtml(P), z > 0), kind: "set", ans: [...new Set(roots)], hint: S.m9.set_hint, sol: S.m9.fa_s(polyHtml(P), fac, steps, rootsTxt) };
});

// ── Ecuaciones de segundo grado: discriminante y problemas ──
def("m9.discriminante", (R, S) => {
  const a = rnz(R, -3, 3), k = R.int(0, 2);
  let b, c;
  if (k === 1) { const h = rnz(R, -4, 4); b = -2 * a * h; c = a * h * h; }
  else { b = rnz(R, -8, 8); c = rnz(R, -9, 9); }   // completas: b ≠ 0 y c ≠ 0 (las incompletas se resuelven sin Δ)
  const D = b * b - 4 * a * c, n = D > 0 ? 0 : D === 0 ? 1 : 2;
  return { q: S.m9.di_q(polyHtml([a, b, c])), kind: "choice", opts: S.m9.di_o, correct: n, sol: S.m9.di_s(neg(b), a, neg(c), D, n) };
});
// Bicuadradas y factorizar (sustituye en 3.º a m11.al.bicuadrada): con la letra z de la lección, a veces una z negativa.
def("m9.ec.bicuadrada", (R, S) => {
  const k = R.r(), lst = xs => [...xs].sort((a, b) => a - b).map(neg).join(", ");
  if (k < 0.22) {   // factor común: x(x − r)(x − s) = 0
    let r, s; do { r = rnz(R, -5, 5); s = rnz(R, -5, 5); } while (r === s);
    const Q = mulP([1, -r], [1, -s]), P = mulP(Q, [1, 0]), sols = [0, r, s];
    return { q: S.m9.bq_q(polyHtml(P)), kind: "set", ans: sols, hint: S.m9.set_hint, sol: S.m9.bq_fac(polyHtml(Q), -Q[1], Q[2], neg(r), neg(s), lst(sols)) };
  }
  const neg2 = k < 0.55; let a, z2;
  do { a = R.int(1, 4); z2 = neg2 ? -R.int(1, 6) : R.int(0, 4) ** 2; } while (a * a === z2 || a * a === -z2);
  const z1 = a * a;
  const Sm = z1 + z2, Pr = z1 * z2, D = (z1 - z2) ** 2, root = Math.abs(z1 - z2);
  const sols = [...new Set([a, -a, ...(z2 >= 0 ? [Math.sqrt(z2), -Math.sqrt(z2)] : [])])];
  const eqx = polyHtml([1, 0, -Sm, 0, Pr]), eqz = polyHtml([1, -Sm, Pr], "z");
  const how = Pr === 0 ? S.m9.bq_zc(eqz, neg(Sm)) : S.m9.bq_zf(eqz, neg(Sm), D, root, neg(z1), neg(z2));
  return { q: S.m9.bq_q(eqx), kind: "set", ans: sols, hint: S.m9.set_hint, sol: S.m9.bq_s(eqz, how, z1, z2, a, lst(sols)) };
});
// Ecuaciones de segundo grado que hay que ordenar (paréntesis, denominadores, factor común) y se resuelven con la fórmula.
const fmla = (Sm, P, S, sols) => S.m9.sg2_f(Sm < 0 ? "−" + Math.abs(Sm) : String(Sm), Sm * Sm, -4 * P, Sm * Sm - 4 * P, Math.round(Math.sqrt(Sm * Sm - 4 * P)), sols);
def("m9.ec.segundo", (R, S) => {
  const t = R.int(0, 3);
  let p, q; do { p = R.int(-7, 8); q = R.int(-7, 8); } while (p === q || !p || !q || (t === 0 && p + q === 0) || (t === 2 && (p + q) % 2));
  const Sm = p + q, P = p * q, std = polyHtml([1, -Sm, P]), sols = [p, q].sort((a, b) => b - a).map(neg);
  let eq, how;
  if (t === 0) {   // x(x − k) = c
    eq = `x(${polyHtml([1, -Sm])}) = ${neg(-P)}`; how = S.m9.sg2_o(std);
  } else if (t === 1) {   // (x + k)² = mx + n
    let k; do k = rnz(R, -4, 4); while (2 * k + Sm === 0);
    const m = 2 * k + Sm, n = k * k - P;
    eq = `(${polyHtml([1, k])})<sup>2</sup> = ${polyHtml([m, n])}`; how = S.m9.sg2_p(`x<sup>2</sup>${k < 0 ? " − " : " + "}${Math.abs(2 * k)}x + ${k * k}`, polyHtml([m, n]), std);
  } else if (t === 2) {   // (x² + a)/2 = (bx + c)/3
    const tt = rnz(R, -3, 3), c = 3 * tt, a = P + 2 * tt, b = 3 * Sm / 2;
    eq = `(${polyHtml([1, 0, a])}) / 2 = (${polyHtml([b, c])}) / 3`;
    how = S.m9.sg2_d(`3(${polyHtml([1, 0, a])}) = 2(${polyHtml([b, c])})`, `${polyHtml([3, 0, 3 * a])} = ${polyHtml([2 * b, 2 * c])}`, polyHtml([3, -2 * b, 3 * a - 2 * c]), std);
  } else {   // todos los coeficientes con un factor común (o a negativo): se divide antes
    const k = R.pick([2, 3, -1, -2, -3]), big = polyHtml([k, -k * Sm, k * P]);
    eq = `${big} = 0`; how = S.m9.sg2_k(neg(k), std);
  }
  return { q: S.m9.sg2_q(eq), kind: "set", ans: [p, q], hint: S.m9.set_hint, sol: how + " " + fmla(Sm, P, S, sols) };
});
// Ecuaciones con la incógnita en el denominador: valores prohibidos, segundo grado y soluciones falsas.
def("m9.ec.racional", (R, S) => {
  const v = R.r();
  if (v < 0.45) {   // x + k/x = s
    let p, q; do { p = rnz(R, -6, 7); q = rnz(R, -6, 7); } while (p === q || p + q === 0);
    const k = p * q, s = p + q, sols = [p, q].sort((a, b) => b - a).map(neg);
    const eq = `x ${k < 0 ? "−" : "+"} ${Math.abs(k)}/x = ${neg(s)}`;
    return { q: S.m9.er2_q(eq), kind: "set", ans: [p, q], hint: S.m9.set_hint, sol: S.m9.er2_s(neg(k), polyHtml([s, 0]), polyHtml([1, -s, k])) + " " + fmla(s, k, S, sols) + " " + S.m9.er2_ok };
  }
  if (v < 0.7) {   // solución falsa: x/(x − a) + b = a/(x − a)
    const a = rnz(R, -6, 7), b = R.int(1, 3), d = polyHtml([1, -a]);
    const opts = [S.m9.er3_no, `x = ${neg(a)}`, `x = ${neg(-a)}`, "x = 0"];
    return { q: S.m9.er3_q(`x/(${d}) + ${b} = ${neg(a)}/(${d})`), kind: "choice", opts, correct: 0, sol: S.m9.er3_s(neg(a), d, b, -a * b, 1 + b, neg(a * (1 + b))) };
  }
  // m/(x − a) = n/(x + b): en cruz, primer grado
  const x0 = R.int(-6, 8), a = rnz(R, -5, 5), b = rnz(R, -5, 5), u = x0 + b, w = x0 - a;
  if (!u || !w || -b === a) return null;
  const g = gcd(u, w), m = w / g, n = u / g;
  if (m === n || Math.abs(m) > 12 || Math.abs(n) > 12) return null;
  const d1 = polyHtml([1, -a]), d2 = polyHtml([1, b]);
  return { q: S.m9.er4_q(`${neg(m)}/(${d1}) = ${neg(n)}/(${d2})`), kind: "int", ans: x0,
    sol: S.m9.er4_s(neg(a), neg(-b), neg(m), d2, neg(n), d1, polyHtml([m, m * b]), polyHtml([n, -n * a]), polyHtml([m - n, 0]), neg(-n * a - m * b), neg(x0)) };
});
def("m9.ec.problema", (R, S) => {
  const k = R.int(0, 4);
  if (k === 3) {   // Pitágoras: un cateto mide d más que el otro
    const [a, b, c] = R.pick([[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), d = b - a, K = (d * d - c * c) / 2;
    return { q: S.m9.ep3_q(c, d), kind: "int", ans: a, sol: S.m9.ep3_s(c, d, d * d - c * c, K, d * d - 4 * K, 2 * a + d, a, a + d, polyHtml([2, 2 * d, d * d - c * c]), polyHtml([1, d, K])) };
  }
  if (k === 4) {   // lanzamiento vertical: h = vt − 5t²
    const t1 = R.int(1, 4), t2 = t1 + R.int(1, 4), v = 5 * (t1 + t2), H = 5 * t1 * t2;
    return { q: S.m9.ep4_q(v, H), kind: "set", ans: [t1, t2], hint: S.m9.set_hint, sol: S.m9.ep4_s(v, H, t1 + t2, t1 * t2, t1, t2) };
  }
  if (k === 0) { const x = R.int(3, 25); return { q: S.m9.ep_q[0](x * (x + 1)), kind: "int", ans: x, sol: S.m9.ep_s[0](x * (x + 1), x, x + 1) }; }
  if (k === 1) { const a = R.int(2, 15), b = a + R.int(1, 10); return { q: S.m9.ep_q[1](2 * (a + b), a * b), kind: "set", ans: [a, b], hint: S.m9.set_hint, sol: S.m9.ep_s[1](a + b, a * b, a, b) }; }
  const x = R.int(3, 15), d = R.int(1, 6);
  return { q: S.m9.ep_q[2](d, (x + d) ** 2), kind: "int", ans: x, sol: S.m9.ep_s[2](d, (x + d) ** 2, x + d, x) };
});

// ── Sistemas: número de soluciones y problemas ──
def("m9.sis.tipo", (R, S) => {
  const a = rnz(R, -5, 5), b = rnz(R, -5, 5), c = R.int(-9, 9), k = R.int(0, 2), m = R.pick([2, 3, -2]);
  let a2, b2, c2;
  if (k === 0) { do { a2 = rnz(R, -5, 5); b2 = rnz(R, -5, 5); } while (a * b2 === a2 * b); c2 = R.int(-9, 9); }
  else { a2 = m * a; b2 = m * b; c2 = k === 1 ? m * c : m * c + rnz(R, -3, 3); }
  const eq = (p, q, r) => `${polyHtml([p, 0]).replace("x", "x")}${q < 0 ? " − " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}y = ${neg(r)}`;
  return { q: S.m9.ti_q(eq(a, b, c), eq(a2, b2, c2)), kind: "choice", opts: S.m9.ti_o, correct: k,
    sol: S.m9.ti_s[k](m, F.text(F.make(a2, a)).replace("-", "−"), F.text(F.make(b2, b)).replace("-", "−"), neg(a), neg(b), neg(c), neg(a2), neg(b2), neg(c2), neg(m * c)) };
});
// Resolver sistemas por reducción con todos los pasos, y sistemas con paréntesis y denominadores que hay que ordenar.
const lin2 = (a, b, c) => `${polyHtml([a, 0])}${b < 0 ? " − " : " + "}${Math.abs(b) === 1 ? "" : Math.abs(b)}y = ${neg(c)}`;
def("m9.sis.metodo", (R, S) => {
  const x0 = R.int(-5, 8), y0 = R.int(-5, 8);
  if (R.r() < 0.65) {
    let a, b, c, d; do { a = rnz(R, -5, 6); b = rnz(R, -5, 6); c = rnz(R, -5, 6); d = rnz(R, -5, 6); } while (a * d === b * c);
    const e = a * x0 + b * y0, f = c * x0 + d * y0, g = gcd(b, d);
    let m1 = Math.abs(d) / g, m2 = -Math.sign(b) * Math.sign(d) * Math.abs(b) / g;   // m1·b + m2·d = 0
    const A = m1 * a + m2 * c, E = m1 * e + m2 * f;
    const mul = (k, p, q, r) => k === 1 ? lin2(p, q, r) : lin2(k * p, k * q, k * r);
    return { q: S.m9.sm_q(lin2(a, b, e), lin2(c, d, f)), kind: "fields", fields: [{ label: "x", ans: x0 }, { label: "y", ans: y0 }],
      sol: S.m9.sm_s(neg(m1), neg(m2), mul(m1, a, b, e), mul(m2, c, d, f), neg(A), neg(E), neg(x0), neg(a), neg(b), neg(e), neg(a * x0), neg(e - a * x0), neg(y0)) };
  }
  // con denominadores y paréntesis: x/2 + y/3 = k; m(x − s) − y = r
  const X = 2 * R.int(-3, 4), Y = 3 * R.int(-2, 3), m = R.int(2, 4), s = rnz(R, -3, 3), k = X / 2 + Y / 3, r = m * (X - s) - Y;
  const e2 = `${m}(${polyHtml([1, -s])}) − y = ${neg(r)}`;
  return { q: S.m9.sm_q(`x/2 + y/3 = ${neg(k)}`, e2), kind: "fields", fields: [{ label: "x", ans: X }, { label: "y", ans: Y }],
    sol: S.m9.sm2_s(neg(6 * k), m, neg(-m * s), neg(r), neg(r + m * s), 3 + 2 * m, neg(6 * k + 2 * (r + m * s)), neg(X), neg(m * X), neg(Y)) };
});
def("m9.sis.problema", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const t = R.int(3, 5), f = R.int(2, t - 1), g = (t - 1) * (f - 1), lo = Math.ceil(20 / g), hi = Math.floor(Math.min(45 / g, 60 / (t * (f - 1)))); if (lo > hi) return null; const u = R.int(lo, hi), j = (t - f) * u, y = u * (f - 1), x = t * y; /* edades posibles: 20–45 años de diferencia y madre de 60 como mucho */ return { q: S.m9.sp_q[0](t, j, f), kind: "fields", fields: [{ label: S.m9.sp_f[0][0], ans: x }, { label: S.m9.sp_f[0][1], ans: y }], sol: S.m9.sp_s[0](x, y, t, j, f) }; }
  if (k === 1) { const a = R.int(3, 20), b = R.int(3, 20); return { q: S.m9.sp_q[1](a + b, 5 * a + 10 * b), kind: "fields", fields: [{ label: S.m9.sp_f[1][0], ans: a }, { label: S.m9.sp_f[1][1], ans: b }], sol: S.m9.sp_s[1](a, b, a + b, 5 * a + 10 * b) }; }
  const c = R.int(10, 25) / 10, t = R.int(15, 40) / 10, p = R.int(2, 4), q = R.int(1, 3), u = R.int(1, 3), v = R.int(2, 4);
  if (p * v === q * u) return null;
  const E = x => WA.MATH.eur(x, H), E2 = x => x.toFixed(2).replace(".", WA.H.ds);   // precios con dos decimales: 1,40 €; 3,00 €
  return { q: S.m9.sp_q[2](p, q, E(rd(p * c + q * t)), u, v, E(rd(u * c + v * t))), kind: "fields", fields: [{ label: S.m9.sp_f[2][0], kind: "num", ans: c, tol: 0.011 }, { label: S.m9.sp_f[2][1], kind: "num", ans: t, tol: 0.011 }],
    ansHtml: `${S.m9.sp_f[2][0]}: ${E2(c)} · ${S.m9.sp_f[2][1]}: ${E2(t)}`,
    sol: S.m9.sp_s[2](E2(c), E2(t), p, q, E2(rd(p * c + q * t)), u, v, E2(rd(u * c + v * t)), E2(rd(u * (p * c + q * t))), E2(rd(p * (u * c + v * t))), u * q, p * v, p * v - u * q, E2(rd(p * (u * c + v * t) - u * (p * c + q * t))), E2(rd(q * t)), E2(rd(p * c))) };
});
const H_ = x => String(x).replace(".", WA.H.ds);

// ── Funciones: parábola y proporcionalidad inversa ──
def("m9.parabola", (R, S) => {
  const a = R.pick([1, -1, 2, -2, 1]), h = R.int(-4, 4), kk = R.int(-6, 6), P = [a, -2 * a * h, a * h * h + kk], t = R.int(0, 3);
  if (t === 0) return { q: S.m9.pb_q[0](polyHtml(P)), kind: "fields", fields: [{ label: S.m9.pb_f[0], ans: h }, { label: S.m9.pb_f[1], ans: kk }], sol: S.m9.pb_s[0](-P[1], 2 * a, neg(h), neg(kk), ...subst(P, h)) };
  if (t === 1) return { q: S.m9.pb_q[1](polyHtml(P)), kind: "int", ans: P[2], sol: S.m9.pb_s[1](neg(P[2])) };
  if (t === 2) { const r1 = R.int(-5, 5), r2 = R.int(-5, 5), Q = mulP([a, -a * r1], [1, -r2]), D = Q[1] * Q[1] - 4 * Q[0] * Q[2];
    return { q: S.m9.pb_q[2](polyHtml(Q)), kind: "set", ans: [...new Set([r1, r2])], hint: S.m9.set_hint, sol: S.m9.pb_s[2](polyHtml(Q), [...new Set([r1, r2])].map(neg).join(S.m9.and), neg(-Q[1]), D, Math.round(Math.sqrt(D)), neg(2 * Q[0]), r1 === r2) }; }
  return { q: S.m9.pb_q[3](polyHtml(P)), kind: "choice", opts: S.m9.pb_o, correct: a > 0 ? 0 : 1, sol: S.m9.pb_s[3](a) };
});
// Parábola en 3.º: máximos (área de un recinto), cuántas veces corta al eje X y el vértice de y = a(x − p)² + q.
def("m9.parabola.max", (R, S) => {
  const v = R.r();
  if (v < 0.4) {
    if (R.r() < 0.6) { const P = R.pick([24, 36, 40, 48, 60, 80, 100]), L = P / 4;
      return { q: S.m9.pm_q[0](P), kind: "int", ans: L * L, sol: S.m9.pm_s[0](P, P / 2, L, L * L) }; }
    const P = R.pick([20, 24, 40, 48, 60, 80]), L = P / 4;   // con una pared: tres lados
    return { q: S.m9.pm_q[1](P), kind: "int", ans: L * (P / 2), sol: S.m9.pm_s[1](P, L, P / 2, L * P / 2) };
  }
  const a = R.pick([1, -1, 2, -2, 1, 3]), h = R.int(-4, 4), sg = R.int(0, 2);
  if (v < 0.7) {   // número de cortes con el eje X, con el discriminante
    const k = sg === 1 ? 0 : (sg === 0 ? -Math.sign(a) : Math.sign(a)) * R.int(1, 6), P = [a, -2 * a * h, a * h * h + k], D = P[1] * P[1] - 4 * P[0] * P[2];
    const c = D > 0 ? 0 : D === 0 ? 1 : 2;
    return { q: S.m9.pm_q[2](polyHtml(P)), kind: "choice", opts: S.m9.pm_o, correct: c, shuffle: false,
      sol: S.m9.pm_s[2](neg(P[1]), P[0] < 0 ? `(${neg(P[0])})` : P[0], P[2] < 0 ? `(${neg(P[2])})` : P[2], neg(D), c) };
  }
  // vértice de la forma desplazada
  const q = rnz(R, -6, 6), A = a === 1 ? "" : a === -1 ? "−" : neg(a);
  return { q: S.m9.pm_q[3](`${A}(${polyHtml([1, -h])})<sup>2</sup> ${q < 0 ? "−" : "+"} ${Math.abs(q)}`.replace("(x)", "x")), kind: "fields",
    fields: [{ label: S.m9.pb_f[0], ans: h }, { label: S.m9.pb_f[1], ans: q }], sol: S.m9.pm_s[3](polyHtml([1, -h]), neg(h), neg(q), a) };
});
// Recta: punto-pendiente, paralela por un punto y un problema de función afín (la lección usa y − y₀ = m(x − x₀)).
def("m9.recta", (R, S) => {
  const v = R.r();
  if (v < 0.7) {
    const m = rnz(R, -4, 4), x0 = R.int(-4, 5), y0 = R.int(-6, 8), n = y0 - m * x0, par = v >= 0.35, c = R.int(-6, 6);
    if (par && c === n) return null;
    const P0 = pt(x0, y0), mx0 = -m * x0;
    return { q: par ? S.m9.rc_q[1](polyHtml([m, c]), P0) : S.m9.rc_q[0](neg(m), P0), kind: "expr", hint: S.m9.rc_hint,
      ans: polyText([m, n]), ansHtml: `y = ${polyHtml([m, n])}`,
      sol: (par ? S.m9.rc_par(neg(m)) : "") + S.m9.rc_s(neg(y0), neg(m), polyHtml([1, -x0]), polyHtml([m, mx0]), polyHtml([m, n]), neg(m), neg(x0), n, neg(y0)) };
  }
  const t = R.int(0, 1), r = t ? R.pick([15, 18, 20, 25, 30]) : R.pick([12, 15, 18, 20, 24]), Fx = R.int(4, 9) * 5, q = R.int(2, 5), T = Fx + r * q;
  return { q: S.m9.rc_q[2 + t](r, q, T), kind: "int", ans: Fx, sol: S.m9.rc_s2(r, q, T, r * q, Fx) };
});
// Estudio de una gráfica: dominio, recorrido, intervalos de crecimiento y extremos absolutos (con intervalos).
def("m9.fn.estudio", (R, S) => {
  const up = R.r() < 0.5, xs = [R.int(-5, -2)]; for (let i = 0; i < 3; i++) xs.push(xs[i] + R.int(1, 3));
  let ys; do { ys = [R.int(-3, 3)]; for (let i = 0; i < 3; i++) ys.push(ys[i] + ((i % 2 === 0) === up ? 1 : -1) * R.int(1, 4)); } while (Math.max(...ys) > 6 || Math.min(...ys) < -6);
  const ymin = Math.min(...ys), ymax = Math.max(...ys), I = (a, b, o) => o ? `(${neg(a)}, ${neg(b)})` : `[${neg(a)}, ${neg(b)}]`;
  const A = WA.SVG.axes(Math.min(xs[0] - 1, 0), Math.max(xs[3] + 1, 0), Math.min(ymin - 1, 0), Math.max(ymax + 1, 0), { w: 300, h: 260 });
  const body = `<polyline points="${xs.map((x, i) => `${A.X(x)},${A.Y(ys[i])}`).join(" ")}" fill="none" stroke="${WA.SVG.C.blue}" stroke-width="2.5"/>` + [0, 3].map(i => `<circle cx="${A.X(xs[i])}" cy="${A.Y(ys[i])}" r="4" fill="${WA.SVG.C.blue}"/>`).join("");
  const pic = "<br>" + A.svg(body), k = R.int(0, 3);
  if (k === 0) { const ok = I(xs[0], xs[3]); return Object.assign({ q: S.m9.fe_q[0] + pic, sol: S.m9.fe_s[0](neg(xs[0]), neg(xs[3]), ok) }, choice(R, ok, [I(ymin, ymax), I(xs[0], xs[3], 1), I(0, xs[3]), I(xs[0], ymax)])); }
  if (k === 1) { const ok = I(ymin, ymax); return Object.assign({ q: S.m9.fe_q[1] + pic, sol: S.m9.fe_s[1](neg(ymin), neg(ymax), ok) }, choice(R, ok, [I(xs[0], xs[3]), I(ymin, ymax, 1), I(ys[0], ys[3]), I(0, ymax)])); }
  if (k === 2) { const ok = I(xs[1], xs[2], 1), lo = Math.min(ys[1], ys[2]), hi = Math.max(ys[1], ys[2]);
    return Object.assign({ q: S.m9.fe_q[2](up) + pic, sol: S.m9.fe_s[2](up, neg(xs[1]), neg(xs[2]), ok) }, choice(R, ok, [I(lo, hi, 1), I(xs[0], xs[1], 1), I(xs[2], xs[3], 1), I(xs[0], xs[3])])); }
  // extremo absoluto: con «sube, baja, sube» se pregunta el mínimo; con «baja, sube, baja», el máximo
  const val = up ? ymin : ymax, at = xs.filter((x, i) => ys[i] === val).map(neg).join(S.m9.and), rel = up ? ys[2] : ys[1];
  return { q: S.m9.fe_q[3](up) + pic, kind: "int", ans: val, sol: S.m9.fe_s[3](up, neg(val), at, neg(rel), neg(up ? xs[2] : xs[1]), rel !== val) };
});
def("m9.inversa", (R, S, H) => {
  const w = R.r();
  if (w < 0.35) {   // problema: el producto es constante
    const t = R.int(0, 2), a = R.pick([[2, 3, 4, 6, 8], [40, 60, 80, 90, 120], [3, 4, 5, 6, 8]][t]), b = R.pick([[6, 8, 12, 9, 10], [3, 4, 6, 2], [8, 12, 15, 10]][t]), k = a * b;
    const cs = [[2, 3, 4, 6, 8, 12, 16, 24], [30, 40, 60, 80, 90, 120, 100, 150], [2, 3, 4, 5, 6, 10, 12, 15]][t].filter(c => c !== a && k % c === 0);
    if (!cs.length) return null;
    const c = R.pick(cs);
    return { q: S.m9.ip_q[t](a, b, c), kind: "int", ans: k / c, sol: S.m9.ip_s[t](a, b, k, c, k / c) };
  }
  if (w < 0.55) {   // cuadrantes y crecimiento según el signo de k
    const k = rnz(R, -20, 20), c = k > 0 ? 0 : 1;
    return { q: S.m9.iq_q(neg(k)), kind: "choice", opts: S.m9.iq_o, correct: c, sol: S.m9.iq_s[c](neg(k)) };
  }
  const k = rnz(R, -6, 12) * R.pick([1, 2, 3]), xs = [1, 2, 3, 4, 6].filter(x => k % x === 0), x0 = R.pick(xs);
  if (R.r() < 0.5) return { q: S.m9.iv_q(pt(x0, k / x0)), kind: "int", ans: k, sol: S.m9.iv_s(x0, neg(k / x0), neg(k)) };
  const x1 = rnz(R, -8, 8), v = F.make(k, x1);
  return { q: S.m9.iv2_q(neg(k), neg(x1)), kind: "frac", ans: v, sol: S.m9.iv2_s(neg(k), neg(x1), F.html(v, H)) };
});

// ── Geometría plana ──
// Lugares geométricos: definición, aplicaciones y puntos notables, con el porqué en la solución.
def("m9.lugar", (R, S) => {
  const r = R.int(2, 9), d = R.int(1, 9), k = R.r();
  const [pool, names] = k < 0.45 ? [S.m9.lg(r, d), S.m9.lg_n(r, d)] : k < 0.7 ? [S.m9.lga(r, d), S.m9.lg_n(r, d)] : [S.m9.lgp, S.m9.lgp_n];
  const [q, ok, why] = R.pick(pool);
  return Object.assign({ q, sol: why }, choice(R, names[ok], names.filter((x, i) => i !== ok)));
});
def("m9.inscrito", (R, S) => {
  const k = R.int(0, 3), c = 2 * R.int(15, 170);   // centrales hasta 340°: también inscritos obtusos
  if (k === 0) return { q: S.m9.in_q[0](c), kind: "int", ans: c / 2, sol: S.m9.in_s[0](c, c / 2) };
  if (k === 1) { const i = R.int(15, 85); return { q: S.m9.in_q[1](i), kind: "int", ans: 2 * i, sol: S.m9.in_s[1](i, 2 * i) }; }
  if (k === 2) { const a = R.int(20, 70); return { q: S.m9.in_q[2](a), kind: "int", ans: 90 - a, sol: S.m9.in_s[2](a, 90 - a) }; }
  const a = R.int(50, 130);
  return { q: S.m9.in_q[3](a), kind: "int", ans: 180 - a, sol: S.m9.in_s[3](a, 180 - a) };
});

// Áreas de 3.º: la apotema con Pitágoras (hexágono) y figuras con un semicírculo.
def("m9.area.figuras", (R, S, H) => {
  if (R.r() < 0.5) {
    const L = 2 * R.int(2, 9), a = Math.sqrt(L * L - L * L / 4), a2 = rd(a, 2), A = 3 * L * a;
    return { q: S.m9.af_q[0](L), kind: "fields", fields: [{ label: S.m9.af_f[0], kind: "num", ans: rd(a, 1), tol: 0.06 }, { label: S.m9.af_f[1], kind: "num", ans: rd(A, 1), tol: 0.6 }],
      sol: S.m9.af_s[0](L, L / 2, L * L, L * L / 4, L * L * 3 / 4, H.dec(a2), 6 * L, H.dec(rd(A, 1))) };
  }
  const b = 2 * R.int(2, 6), h = R.int(3, 12), r = b / 2, semi = Math.PI * r * r / 2, A = b * h + semi;
  return { q: S.m9.af_q[1](b, h), kind: "num", ans: rd(A, 1), tol: 0.15, sol: S.m9.af_s[1](b, h, b * h, r, H.dec(rd(semi, 2)), H.dec(rd(A, 1))) };
});
// Tales y Pitágoras juntos: una rampa (o un cable) y un punto intermedio.
def("m9.tales.pit", (R, S, H) => {
  const [a, b, c] = R.pick([[12, 5, 13], [8, 6, 10], [4, 3, 5], [15, 8, 17], [16, 12, 20], [24, 7, 25]]);
  const x = R.pick(Array.from({ length: a - 1 }, (_, i) => i + 1).filter(t => (20 * b * t) % a === 0)), h = rd(b * x / a, 2);   // alturas múltiplos de 0,05
  const t = R.int(0, 1);
  return { q: S.m9.tp_q[t](c, b, x), kind: "fields", fields: [{ label: S.m9.tp_f[0], ans: a }, { label: S.m9.tp_f[1], kind: "num", ans: h, tol: 0.011 }],
    sol: S.m9.tp_s(c, b, c * c - b * b, a, x, H.dec(h)) };
});

// ── Movimientos en el plano ──
def("m9.mov.traslacion", (R, S) => {
  const x = R.int(-6, 6), y = R.int(-6, 6), u = rnz(R, -5, 5), v = R.int(-5, 5);
  if (R.r() < 0.6) return { q: S.m9.tr_q(pt(x, y), pt(u, v)), kind: "fields", fields: [{ label: "x′", ans: x + u }, { label: "y′", ans: y + v }], sol: S.m9.tr_s(pt(x, y), pt(u, v), pt(x + u, y + v), neg(x), neg(y), neg(u), neg(v)) };
  return { q: S.m9.tr2_q(pt(x, y), pt(x + u, y + v)), kind: "fields", fields: [{ label: "v₁", ans: u }, { label: "v₂", ans: v }], sol: S.m9.tr2_s(pt(u, v), neg(x), neg(y), neg(x + u), neg(y + v)) };
});
const PN = n => n < 0 ? `(${neg(n)})` : String(n);   // negativos entre paréntesis
// Vectores (coordenadas y módulo) y composición de traslaciones: lo nuevo de 3.º (m9.mov.traslacion lo usa Mates 8).
def("m9.vector", (R, S) => {
  if (R.r() < 0.6) {
    const [p, q] = R.pick([[3, 4], [6, 8], [5, 12], [8, 6], [4, 3], [12, 5], [9, 12], [8, 15]]), sx = R.pick([1, -1]), sy = R.pick([1, -1]);
    const ax = R.int(-5, 5), ay = R.int(-5, 5), bx = ax + sx * p, by = ay + sy * q, m = Math.round(Math.hypot(p, q));
    return { q: S.m9.ve_q(pt(ax, ay), pt(bx, by)), kind: "fields", fields: [{ label: "v₁", ans: bx - ax }, { label: "v₂", ans: by - ay }, { label: S.m9.ve_f, ans: m }],
      sol: S.m9.ve_s(neg(bx), PN(ax), neg(by), PN(ay), pt(bx - ax, by - ay), PN(bx - ax), PN(by - ay), p * p + q * q, m) };
  }
  const u = [rnz(R, -6, 6), rnz(R, -6, 6)], w = [rnz(R, -6, 6), rnz(R, -6, 6)];
  return { q: S.m9.ve2_q(pt(...u), pt(...w)), kind: "fields", fields: [{ label: "v₁", ans: u[0] + w[0] }, { label: "v₂", ans: u[1] + w[1] }],
    sol: S.m9.ve2_s(neg(u[0]), PN(w[0]), neg(u[1]), PN(w[1]), pt(u[0] + w[0], u[1] + w[1])) };
});
def("m9.mov.giro", (R, S) => {
  const x = rnz(R, -6, 6), y = rnz(R, -6, 6), g = R.pick([90, 180, 270, -90]);
  const [a, b] = g === 90 ? [-y, x] : g === 180 ? [-x, -y] : [y, -x];
  return { q: S.m9.gi_q(pt(x, y), g), kind: "fields", fields: [{ label: "x′", ans: a }, { label: "y′", ans: b }], sol: S.m9.gi_s(g, pt(a, b), neg(x), neg(y)) };
});
// Simetrías nuevas en 3.º: respecto de la recta y = x y respecto de un punto cualquiera.
def("m9.mov.sim2", (R, S) => {
  const x = rnz(R, -7, 7), y = rnz(R, -7, 7);
  if (R.r() < 0.4) { if (x === y) return null; return { q: S.m9.s2_q[0](pt(x, y)), kind: "fields", fields: [{ label: "x′", ans: y }, { label: "y′", ans: x }], sol: S.m9.s2_s[0](pt(y, x)) }; }
  const a = rnz(R, -4, 4), b = rnz(R, -4, 4);
  if (a === x && b === y) return null;
  return { q: S.m9.s2_q[1](pt(x, y), pt(a, b)), kind: "fields", fields: [{ label: "x′", ans: 2 * a - x }, { label: "y′", ans: 2 * b - y }],
    sol: S.m9.s2_s[1](pt(a, b), PN(a), PN(x), PN(b), PN(y), pt(2 * a - x, 2 * b - y), neg(2 * a), neg(2 * b)) };
});
// Orden de giro de una figura y composición de giros con el mismo centro.
def("m9.mov.orden", (R, S) => {
  if (R.r() < 0.55) {
    const [name, n] = R.pick(S.m9.or_fig);
    return { q: S.m9.or_q(name), kind: "fields", fields: [{ label: S.m9.or_f[0], ans: n }, { label: S.m9.or_f[1], ans: 360 / n }], sol: S.m9.or_s(name, n, 360 / n) };
  }
  const a = R.int(2, 17) * 10, b = R.int(2, 17) * 10, same = R.r() < 0.6, t = same ? (a + b) % 360 : a - b;
  if (!t || (same && a + b === 360)) return null;
  return { q: S.m9.oc_q(a, b, same), kind: "int", ans: Math.abs(t), sol: S.m9.oc_s(a, b, same, t) };
});
// Mosaicos: si un polígono regular tesela, cuántos concurren y qué polígono completa un vértice.
def("m9.mosaico", (R, S, H) => {
  const ang = n => (n - 2) * 180 / n, v = R.r();
  if (v < 0.35) {
    const n = R.int(3, 12), a = ang(n), k = 360 / a, ok = Number.isInteger(k);
    return { q: S.m9.mo_q[0](n, S.m9.mo_n[n]), kind: "choice", opts: S.m9.mo_o, correct: ok ? 0 : 1, shuffle: false, sol: S.m9.mo_s[0](n, H.dec(rd(a, 2)), ok, H.dec(rd(k, 2))) };
  }
  if (v < 0.5) { const n = R.pick([3, 4, 6]); return { q: S.m9.mo_q[1](S.m9.mo_n[n]), kind: "int", ans: 360 / ang(n), sol: S.m9.mo_s[1](n, ang(n), 360 / ang(n)) }; }
  // vértices de los mosaicos regulares y semirregulares (en su orden) a los que les falta un polígono
  const g = R.pick([[3, 3, 3, 3, 3], [4, 4, 4], [6, 6], [8, 8], [4, 8], [12, 12], [3, 12], [4, 6], [4, 12], [6, 12], [3, 4, 6], [3, 4, 4], [4, 6, 4],
    [3, 6, 3], [6, 3, 6], [3, 3, 3, 4], [3, 3, 4, 4], [3, 3, 4, 3], [3, 3, 3, 3]]);
  const sum = g.reduce((s, n) => s + ang(n), 0), m = Math.round(360 / (180 - (360 - sum)));
  return { q: S.m9.mo_q[2](g.map(n => S.m9.mo_n[n]).join(", ")), kind: "int", ans: m,
    sol: S.m9.mo_s[2](g.map(n => `${rd(ang(n), 2)}°`).join(" + "), rd(sum, 2), rd(360 - sum, 2), S.m9.mo_n[m], m) };
});
def("m9.mov.simetria", (R, S) => {
  const x = rnz(R, -7, 7), y = rnz(R, -7, 7), k = R.int(0, 2);
  const [a, b] = k === 0 ? [x, -y] : k === 1 ? [-x, y] : [-x, -y];
  return { q: S.m9.si_q(pt(x, y), S.m9.si_t[k]), kind: "fields", fields: [{ label: "x′", ans: a }, { label: "y′", ans: b }], sol: S.m9.si_s[k](pt(a, b)) };
});

// ── La esfera terrestre ──
def("m9.geo", (R, S) => {
  const k = R.int(0, 3);
  // cómo sale la diferencia: si están a distinto lado de la línea de referencia se suman; si al mismo, se restan
  const how = (a, b, sa, sb, nm) => !a || !b ? S.m9.ge_h[0](Math.max(a, b), nm) : sa !== sb ? S.m9.ge_h[1](a, b, nm) : S.m9.ge_h[2](Math.max(a, b), Math.min(a, b), nm);
  if (k === 0) { const l1 = R.int(0, 6) * 15, l2 = R.int(0, 6) * 15, w1 = R.r() < 0.5, w2 = R.r() < 0.5, d = Math.abs((w1 ? -l1 : l1) - (w2 ? -l2 : l2)); if (!d || d > 180) return null; const L = (l, w) => l ? `${l}° ${w ? S.m9.O : "E"}` : "0°"; return { q: S.m9.ge_q[0](L(l1, w1), L(l2, w2)), kind: "int", ans: d / 15, sol: how(l1, l2, w1, w2, 0) + S.m9.ge_s[0](d, d / 15) }; }
  if (k === 1) { const a = R.int(0, 60), b = R.int(0, 60), na = R.r() < 0.5, nb = R.r() < 0.6, d = Math.abs((na ? a : -a) - (nb ? b : -b)); if (!d) return null; const L = (l, n) => l ? `${l}° ${n ? "N" : "S"}` : "0°"; return { q: S.m9.ge_q[1](L(a, na), L(b, nb)), kind: "int", ans: d * 111, sol: how(a, b, na, nb, 1) + S.m9.ge_s[1](d, d * 111) }; }
  if (k === 3) {   // ¿qué hora solar es?
    const n = R.int(1, 11), e = R.r() < 0.5, h0 = R.pick([12, 12, 9, 15, 18]), h = (h0 + (e ? n : -n) + 24) % 24;
    return { q: S.m9.ge_q[3](h0, `${15 * n}° ${e ? "E" : S.m9.O}`), kind: "int", ans: h, sol: S.m9.ge_s[3](15 * n, n, e, h0, h) };
  }
  const la = R.int(1, 70), lo = R.int(1, 170), n = R.r() < 0.5, e = R.r() < 0.5;
  const ok = S.m9.ge_o[(n ? 0 : 2) + (e ? 1 : 0)];
  return { q: S.m9.ge_q[2](`${la}° ${n ? "N" : "S"}, ${lo}° ${e ? "E" : S.m9.O}`), kind: "choice", opts: S.m9.ge_o, correct: S.m9.ge_o.indexOf(ok), sol: S.m9.ge_s[2](ok) };
});

// Poliedros: contar aristas y vértices a partir de las caras, Euler despejando y área de los regulares.
def("m9.poliedro", (R, S, H) => {
  const v = R.r();
  if (v < 0.4) {
    const [fs, kv, name] = R.pick(S.m9.ph_sol), lados = fs.reduce((s, [c, n]) => s + c * n, 0), C = fs.reduce((s, [c]) => s + c, 0), A = lados / 2, V = lados / kv;
    return { q: S.m9.ph_q(fs.map(([c, n]) => S.m9.ph_c(c, n)).join(" y "), kv), kind: "fields", fields: [{ label: S.m9.ph_f[0], ans: A }, { label: S.m9.ph_f[1], ans: V }],
      sol: S.m9.ph_s(fs.map(([c, n]) => `${c} · ${n}`).join(" + "), lados, A, kv, V, C, name) };
  }
  if (v < 0.7) {   // Euler despejando, sin decir el nombre en el enunciado
    const n = R.int(3, 10), [C, V, A, name] = R.pick([[n + 2, 2 * n, 3 * n, S.m9.ph_pr(n)], [n + 1, n + 1, 2 * n, S.m9.ph_py(n)], [4, 4, 6, "un tetraedro"], [8, 6, 12, "un octaedro"], [12, 20, 30, "un dodecaedro"], [20, 12, 30, "un icosaedro"]]);
    const t = R.int(0, 2);
    return { q: S.m9.pe_q[t](C, V, A), kind: "int", ans: [C, V, A][t], sol: S.m9.pe_s[t](C, V, A, name) };
  }
  const [n, name] = R.pick([[4, "tetraedro"], [8, "octaedro"], [20, "icosaedro"]]), L = R.int(2, 12), h = Math.sqrt(L * L - L * L / 4), a1 = L * h / 2, At = n * a1;
  return { q: S.m9.pa_q3(name, L), kind: "num", ans: rd(At, 1), tol: Math.max(0.15, At / 200),
    sol: S.m9.pa_s3(L, H.dec(L / 2), H.dec(rd(h, 2)), H.dec(rd(a1, 2)), n, H.dec(rd(At, 1))) };
});
// Cuerpos de 3.º: apotema de la pirámide, troncos, generatriz del cono y ángulo del desarrollo.
def("m9.cuerpos", (R, S, H) => {
  const v = R.r();
  if (v < 0.25) {
    const [k, h, a] = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [9, 12, 15], [12, 9, 15], [12, 5, 13]]), L = 2 * k;
    return { q: S.m9.cp_q[0](L, h), kind: "fields", fields: [{ label: S.m9.cp_f[0], ans: a }, { label: S.m9.cp_f[1], ans: L * L + 2 * L * a }],
      sol: S.m9.cp_s[0](h, k, h * h + k * k, a, 4 * L, 2 * L * a, L * L, L * L + 2 * L * a) };
  }
  if (v < 0.5) {   // tronco de pirámide: la grande menos la pequeña (mitad de lado y de altura)
    const L = 2 * R.int(2, 8), Hh = 6 * R.int(1, 4), Vg = L * L * Hh / 3, Vp = (L / 2) * (L / 2) * (Hh / 2) / 3;
    return { q: S.m9.cp_q[1](L, Hh), kind: "int", ans: Vg - Vp, sol: S.m9.cp_s[1](L, Hh, Vg, L / 2, Hh / 2, Vp, Vg - Vp) };
  }
  if (v < 0.75) {
    const [r, h, g] = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15], [4, 3, 5], [8, 15, 17], [12, 5, 13], [12, 9, 15]]), AL = Math.PI * r * g;
    return { q: S.m9.cp_q[2](r, h), kind: "fields", fields: [{ label: S.m9.cp_f[2], ans: g }, { label: S.m9.cp_f[3], kind: "num", ans: rd(AL, 1), tol: Math.max(0.2, AL / 300) }],
      sol: S.m9.cp_s[2](h, r, h * h + r * r, g, r * g, H.dec(rd(AL, 1))) };
  }
  const [r, g] = R.pick([[3, 5], [4, 6], [2, 5], [3, 4], [1, 4], [2, 3], [5, 6], [4, 5], [3, 6], [2, 6], [3, 10], [1, 3], [5, 8], [3, 8], [7, 10]]), F = fr(r, g);
  return { q: S.m9.cp_q[3](r, g), kind: "int", ans: 360 * r / g, sol: S.m9.cp_s[3](r, g, 2 * r, 2 * g, `${F[0]}/${F[1]}`, 360 * r / g) };
});

// ── Estadística: dispersión y cuartiles ──
def("m9.es.dispersion", (R, S, H) => {
  const n = R.pick([4, 5, 6]), m = R.int(6, 12), xs = Array.from({ length: n - 1 }, () => Math.max(0, m + R.int(-5, 5))), last = n * m - xs.reduce((a, b) => a + b, 0);
  if (last < 0 || last > 25) return null;
  xs.push(last);
  const s = n * m, sq = xs.map(x => (x - m) ** 2), ssq = sq.reduce((a, b) => a + b, 0);
  const v = rd(ssq / n), sd = rd(Math.sqrt(ssq / n));
  if (!v) return null;
  const w = R.r();
  if (w < 0.5) return { q: S.m9.ds_q(xs.join(", ")), kind: "fields", fields: [{ label: S.m9.ds_f[0], ans: m }, { label: S.m9.ds_f[1], kind: "num", ans: v, tol: 0.011 }, { label: S.m9.ds_f[2], kind: "num", ans: sd, tol: 0.011 }],
    sol: S.m9.ds_s(m, xs.map(x => `(${x} − ${m})² = ${(x - m) ** 2}`).join("; "), n, H.dec(v), H.dec(sd), xs.join(" + "), s, sq.join(", "), ssq, ssq % n === 0) };
  if (w < 0.75) {   // tabla de frecuencias con la fórmula abreviada
    const vals = [...new Set(xs)].sort((a, b) => a - b), fs = vals.map(x => xs.filter(y => y === x).length * R.int(1, 3)), N = fs.reduce((a, b) => a + b, 0);
    const sx = vals.reduce((a, x, i) => a + x * fs[i], 0), sx2 = vals.reduce((a, x, i) => a + x * x * fs[i], 0), mean = sx / N, varr = sx2 / N - mean * mean;
    if (vals.length >= 3 && Number.isInteger(rd(mean * 100, 6)) && varr > 0) return { q: S.m9.dt2_q(S.m9.ft_table(vals, fs)), kind: "fields", fields: [{ label: S.m9.ds_f[0], kind: "num", ans: rd(mean), tol: 0.011 }, { label: S.m9.ds_f[1], kind: "num", ans: rd(varr), tol: 0.011 }, { label: S.m9.ds_f[2], kind: "num", ans: rd(Math.sqrt(varr)), tol: 0.011 }],
      sol: S.m9.dt2_s(vals.map((x, i) => `${x} · ${fs[i]}`).join(" + "), sx, N, H.dec(rd(mean)), vals.map((x, i) => `${x}² · ${fs[i]}`).join(" + "), sx2, H.dec(rd(sx2 / N, 4)), H.dec(rd(mean * mean, 4)), H.dec(rd(varr)), H.dec(rd(Math.sqrt(varr)))) };
  }
  if (w < 0.75) return { q: S.m9.ds_q(xs.join(", ")), kind: "fields", fields: [{ label: S.m9.ds_f[0], ans: m }, { label: S.m9.ds_f[1], kind: "num", ans: v, tol: 0.011 }, { label: S.m9.ds_f[2], kind: "num", ans: sd, tol: 0.011 }],
    sol: S.m9.ds_s(m, xs.map(x => `(${x} − ${m})² = ${(x - m) ** 2}`).join("; "), n, H.dec(v), H.dec(sd), xs.join(" + "), s, sq.join(", "), ssq, ssq % n === 0) };
  const cv = rd(sd / m * 100, 1);
  return { q: S.m9.cv_q(xs.join(", "), H.dec(sd)), kind: "num", ans: cv, tol: 0.15, sol: S.m9.cv_s(H.dec(sd), m, H.dec(cv)) };
});
// Cuartiles con la regla de la lección (posición N/4, N/2, 3N/4: si no es entera, la siguiente; si es entera, la media
// de ese dato y el siguiente), número de datos par o impar, y valores atípicos.
def("m9.es.cuartiles", (R, S, H) => {
  const n = R.pick([7, 8, 10, 11, 12, 15]), xs = Array.from({ length: n }, () => R.int(1, 30)), k = R.r();
  if (k >= 0.6 && R.r() < 0.5) xs[0] = R.int(55, 80);   // a veces, un dato muy alejado
  xs.sort((a, b) => a - b);
  const Q = p => { const pos = n * p; return Number.isInteger(pos) ? [(xs[pos - 1] + xs[pos]) / 2, pos, true] : [xs[Math.ceil(pos) - 1], Math.ceil(pos), false]; };
  const [q1, p1, e1] = Q(1 / 4), [me, p2, e2] = Q(1 / 2), [q3, p3, e3] = Q(3 / 4);
  const ex = (name, num, f, pos, ent, v) => S.m9.cq_pos(name, num, n, H.dec(rd(n * f, 2)), pos, ent, H.dec(v));
  const steps = [ex("Q<sub>1</sub>", "1/4", 1 / 4, p1, e1, q1), ex("Me", "1/2", 1 / 2, p2, e2, me), ex("Q<sub>3</sub>", "3/4", 3 / 4, p3, e3, q3)].join(" ");
  const shown = R.shuffle(xs.slice());
  if (k < 0.45) return { q: S.m9.cu_q(shown.join(", ")), kind: "fields", fields: [{ label: "Q₁", kind: "num", ans: q1, tol: 1e-9 }, { label: "Me", kind: "num", ans: me, tol: 1e-9 }, { label: "Q₃", kind: "num", ans: q3, tol: 1e-9 }], sol: S.m9.cu_s(xs.join(", "), n, steps) };
  const ric = q3 - q1;
  if (k < 0.6) return { q: S.m9.ri_q2(shown.join(", ")), kind: "num", ans: ric, tol: 1e-9, sol: S.m9.ri_s2(xs.join(", "), n, steps, H.dec(q1), H.dec(q3), H.dec(ric)) };
  const lo = q1 - 1.5 * ric, hi = q3 + 1.5 * ric, out = xs.filter(x => x < lo || x > hi);
  if (out.length > 1) return null;
  return { q: S.m9.at_q(shown.join(", ")), kind: "int", ans: out.length ? out[0] : 0, sol: S.m9.at_s(xs.join(", "), n, steps, H.dec(q1), H.dec(q3), H.dec(ric), H.dec(1.5 * ric), H.dec(lo), H.dec(hi), out[0]) };
});
// Datos agrupados (media con marcas de clase, clase modal y clase mediana) y mediana con frecuencias acumuladas.
def("m9.es.agrupados", (R, S, H) => {
  const v = R.r();
  if (v < 0.7) {
    const w = R.pick([2, 5, 10]), a0 = R.pick([0, 0, w, 2 * w]), c = R.int(4, 5);
    let fs; do fs = Array.from({ length: c }, () => R.int(2, 12)); while (fs.filter(f => f === Math.max(...fs)).length > 1);
    const marks = fs.map((_, i) => a0 + w * i + w / 2), N = fs.reduce((a, b) => a + b, 0), sx = marks.reduce((a, m, i) => a + m * fs[i], 0);
    const cls = fs.map((_, i) => `[${a0 + w * i}, ${a0 + w * (i + 1)}${i === c - 1 ? "]" : ")"}`);
    const tbl = S.m9.ag_table(cls, fs);
    if (v < 0.35) return { q: S.m9.ag_q[0](tbl), kind: "num", ans: rd(sx / N), tol: 0.011, sol: S.m9.ag_s[0](marks.map(m => H.dec(m)).join(", "), marks.map((m, i) => `${H.dec(m)} · ${fs[i]}`).join(" + "), H.dec(sx), N, H.dec(rd(sx / N))) };
    if (v < 0.52) { const im = fs.indexOf(Math.max(...fs)); return Object.assign({ q: S.m9.ag_q[1](tbl), sol: S.m9.ag_s[1](cls[im], fs[im]) }, choice(R, cls[im], cls.filter((_, i) => i !== im))); }
    const acc = []; fs.reduce((a, f) => (acc.push(a + f), a + f), 0);
    const im = acc.findIndex(x => x >= N / 2);
    return Object.assign({ q: S.m9.ag_q[2](tbl), sol: S.m9.ag_s[2](N, H.dec(N / 2), acc.join(", "), cls[im]) }, choice(R, cls[im], cls.filter((_, i) => i !== im)));
  }
  // variable discreta: mediana con las frecuencias acumuladas
  const x0 = R.int(0, 2), vals = [0, 1, 2, 3, 4].map(i => x0 + i), fs = vals.map(() => R.int(1, 9)), N = fs.reduce((a, b) => a + b, 0), acc = [];
  fs.reduce((a, f) => (acc.push(a + f), a + f), 0);
  const pos = N / 2, val = p => vals[acc.findIndex(x => x >= p)], me = Number.isInteger(pos) ? (val(pos) + val(pos + 1)) / 2 : val(Math.ceil(pos));
  return { q: S.m9.ag_q[3](S.m9.ft_table(vals, fs)), kind: "num", ans: me, tol: 1e-9, sol: S.m9.ag_s[3](N, H.dec(pos), acc.join(", "), Number.isInteger(pos), pos, H.dec(me)) };
});
// Muestreo estratificado proporcional y detectar muestras sesgadas.
def("m9.es.muestreo", (R, S) => {
  if (R.r() < 0.6) {
    const n = R.pick([20, 40, 60, 80, 100]), T = R.pick([200, 300, 400, 500, 600, 800, 1000, 1200]), parts = R.pick([[0.5, 0.3, 0.2], [0.6, 0.3, 0.1], [0.4, 0.4, 0.2], [0.7, 0.2, 0.1], [0.45, 0.35, 0.2], [0.5, 0.25, 0.25]]);
    const N = parts.map(p => Math.round(p * T)), m = parts.map(p => p * n);
    if (m.some(x => !Number.isInteger(rd(x, 6)))) return null;
    const [g, names, u] = R.pick(S.m9.mu_ctx);
    return { q: S.m9.mu_q(g, N, names, n, u), kind: "fields", fields: names.map((nm, i) => ({ label: nm, ans: rd(m[i], 6) })),
      sol: S.m9.mu_s(N.join(" + "), T, names, N, parts.map(p => String(p).replace(".", WA.H.ds)), m.map(x => rd(x, 6)), n) };
  }
  const [q, sesgo, why] = R.pick(S.m9.sesgo);
  return { q: S.m9.sesgo_q(q), kind: "choice", opts: S.m9.sesgo_o, correct: sesgo ? 0 : 1, shuffle: false, sol: why };
});

// ── Probabilidad: experimentos compuestos, árboles y condicionada ──
def("m9.pb.compuesto", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) { const s = R.int(2, 12), f = 6 - Math.abs(7 - s), cases = [1, 2, 3, 4, 5, 6].filter(a => s - a >= 1 && s - a <= 6).map(a => `(${a}, ${s - a})`);
    return { q: S.m9.pc_q[0](s), kind: "frac", ans: fr(f, 36), sol: S.m9.pc_s[0](s, f, F.html(fr(f, 36), H), cases) }; }
  if (k === 1) {   // «al menos uno», con el suceso contrario
    const dado = R.r() < 0.6, n = dado ? R.int(2, 3) : R.int(2, 4), num = dado ? 5 ** n : 1, den = dado ? 6 ** n : 2 ** n;
    return { q: S.m9.pc_q[1](dado, n), kind: "frac", ans: fr(den - num, den), sol: S.m9.pc_s[1](dado, n, num, den, F.html(fr(den - num, den), H)) };
  }
  if (k === 2) { const j = R.int(1, 3), c = [1, 3, 3, 1][j]; return { q: S.m9.pc_q[2](j), kind: "frac", ans: fr(c, 8), sol: S.m9.pc_s[2](j, c, F.html(fr(c, 8), H)) }; }
  const [ev, c] = R.pick(S.m9.pc_ev), cara = R.r() < 0.5;
  return { q: S.m9.pc_q[3](ev, cara), kind: "frac", ans: fr(c, 12), sol: S.m9.pc_s[3](ev, cara, c, F.html(fr(c, 12), H)) };
});
def("m9.pb.arbol", (R, S, H) => {
  const r = R.int(2, 7), b = R.int(2, 7), t = r + b, rep = R.r() < 0.5, k = R.int(0, 2), t2 = rep ? t : t - 1;
  let ans, sol;
  if (k === 0) { const nn = r * (rep ? r : r - 1); ans = fr(nn, t * t2); sol = (rep ? S.m9.ar_s0r : S.m9.ar_s0)(r, t, F.html(ans, H), `${nn}/${t * t2}`); }
  else if (k === 1) { const nn = r * b; ans = fr(2 * nn, t * t2); sol = (rep ? S.m9.ar_s1r : S.m9.ar_s1)(r, b, t, F.html(ans, H), `${nn}/${t * t2}`, `${2 * nn}/${t * t2}`); }
  else { const nn = b * (rep ? b : b - 1); ans = fr(t * t2 - nn, t * t2); sol = S.m9.ar_s2(b, t, rep, `${nn}/${t * t2}`, `${t * t2 - nn}/${t * t2}`, F.html(ans, H)); }
  return { q: S.m9.ar_q(r, b, rep, k), kind: "frac", ans, sol };
});
// Árboles con probabilidades decimales (tiros libres, penaltis): exactamente uno, al menos uno, ninguno.
def("m9.pb.arbol.dec", (R, S, H) => {
  const p = R.pick([0.6, 0.7, 0.75, 0.8, 0.9, 0.65]), q = rd(1 - p, 2), k = R.int(0, 3), [who, what] = R.pick(S.m9.ad_ctx);
  const pp = rd(p * p, 4), pq = rd(p * q, 4), qq = rd(q * q, 4);
  const ans = [rd(2 * pq, 4), rd(1 - qq, 4), qq, pp][k];
  return { q: S.m9.ad_q(who, what, H.dec(p * 100), k), kind: "num", ans, tol: 0.0006, sol: S.m9.ad_s[k](H.dec(p), H.dec(q), H.dec(pp), H.dec(pq), H.dec(qq), H.dec(ans)) };
});
// Probabilidad total con un árbol (lo que m9.pb.condicionada, con tablas, no trae).
def("m9.pb.total", (R, S, H) => {
  const [ctx, ev] = R.pick(S.m9.pt_ctx), a = R.int(1, 8) / 10, y = R.int(1, 9) / 10, z = R.pick([0.05, 0.1, 0.2, 0.3].filter(x => x < y));
  const pa = rd(a * y, 4), pb = rd((1 - a) * z, 4), tot = rd(pa + pb, 4);
  if (!pb) return null;
  return { q: S.m9.pt_q(ctx, H.dec(a * 100), H.dec(y * 100), H.dec(z * 100)), kind: "num", ans: tot, tol: 0.0006,
    sol: S.m9.pt_s(ev, H.dec(a), H.dec(y), H.dec(pa), H.dec(rd(1 - a, 2)), H.dec(z), H.dec(pb), H.dec(tot)) };
});
// La fórmula de la unión: P(A ∪ B) = P(A) + P(B) − P(A ∩ B), con números del 1 al N o con la baraja española.
def("m9.pb.union", (R, S, H) => {
  if (R.r() < 0.6) {
    const N = R.int(12, 30), [a, b] = R.pick([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [3, 7]].filter(([x, y]) => x * y <= N)), l = a * b / gcd(a, b);   // que A ∩ B no esté vacío
    const nA = Math.floor(N / a), nB = Math.floor(N / b), both = Array.from({ length: Math.floor(N / l) }, (_, i) => l * (i + 1)), ans = fr(nA + nB - both.length, N);
    return { q: S.m9.un_q(N, a, b), kind: "frac", ans, sol: S.m9.un_s(N, a, b, nA, nB, both, l, `${nA + nB - both.length}/${N}`, F.html(ans, H)) };
  }
  const [x, nx, y, ny, nxy] = R.pick(S.m9.un_bar), ans = fr(nx + ny - nxy, 40);
  return { q: S.m9.ub_q(x, y), kind: "frac", ans, sol: S.m9.ub_s(x, nx, y, ny, nxy, `${nx + ny - nxy}/40`, F.html(ans, H)) };
});
def("m9.pb.condicionada", (R, S, H) => {
  const a = R.int(5, 40), b = R.int(5, 40), c = R.int(5, 40), d = R.int(5, 40), k = R.int(0, 2);
  const tbl = S.m9.co_table(a, b, c, d);
  if (k === 0) { const v = fr(a, a + c); return { q: S.m9.co_q[0](tbl), kind: "frac", ans: v, sol: S.m9.co_s[0](a, a + c, F.html(v, H)) }; }
  if (k === 1) { const v = fr(a, a + b); return { q: S.m9.co_q[1](tbl), kind: "frac", ans: v, sol: S.m9.co_s[1](a, a + b, F.html(v, H)) }; }
  const v = fr(d, b + d);   // también condicionada: P(chica | no hace deporte)
  return { q: S.m9.co_q[2](tbl), kind: "frac", ans: v, sol: S.m9.co_s[2](d, b + d, F.html(v, H)) };
});
})();
