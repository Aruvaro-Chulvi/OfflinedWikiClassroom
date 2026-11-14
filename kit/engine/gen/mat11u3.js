/* WikiAula — Matemáticas, Grado 11 · Unidad 3: Álgebra.
   Textos: i18n/<lang>/mat11u3.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, lin } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const sgnT = (c, t) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 && t ? "" : Math.abs(c)) + t : "";
const listS = xs => [...xs].sort((a, b) => a - b).map(neg).join(", ");
const ivl = (a, b, ca, cb) => `${a === -Infinity ? "(−∞" : (ca ? "[" : "(") + neg(a)}, ${b === Infinity ? "+∞)" : neg(b) + (cb ? "]" : ")")}`;
const sys = rows => `<table style="border-left:2px solid #202122;margin:6px 0 6px 4px">${rows.map(r => `<tr><td style="padding:1px 8px">${r}</td></tr>`).join("")}</table>`;

// ── Ecuaciones ────────────────────────────────────────────────────────
def("m11.al.bicuadrada", (R, S, H) => {
  // t₁ = a² > 0 y t₂ = b² ≥ 0 (4 o 3 soluciones) o, en un 30 %, t₂ < 0 (no da soluciones: solo ±a)
  let a, t2;
  if (R.r() < 0.3) { a = R.int(1, 5); t2 = -R.int(1, 9); }
  else { let b; do { a = R.int(1, 5); b = R.int(0, 5); } while (a === b); t2 = b * b; }
  const t1 = a * a, sols = [...new Set(t2 >= 0 ? [a, -a, Math.sqrt(t2), -Math.sqrt(t2)] : [a, -a])];
  const qt = (v4, v2) => `${v4}${sgnT(-(t1 + t2), v2)}${sgnT(t1 * t2, "")} = 0`;
  return { q: S.m11.ec_q(qt("x⁴", "x²")), kind: "set", ans: sols, hint: S.m11.ec_hint_set,
    sol: S.m11.bic_s(qt("t²", "t"), Math.min(t1, t2), Math.max(t1, t2), t2, a, listS(sols)) };
});
def("m11.al.racional", (R, S, H) => {
  // (x + a)/(x − b) = c  →  x + a = c(x − b) → x = (cb + a)/(c − 1)
  for (;;) {
    const c = R.pick([2, 3, -1, -2, 4]), b = R.int(-5, 5), x = R.int(-8, 8);
    const a = x * (c - 1) - c * b;
    if (x === b || Math.abs(a) > 30) continue;
    const e = `${H.frac(lin(1, a), lin(1, -b))} = ${neg(c)}`;
    const cf = b ? `${c === -1 ? "−" : neg(c)}(${lin(1, -b)})` : lin(c, 0);   // sin «−1(…)» ni «4(x)»
    const steps = `${lin(1, a)} = ${cf}${b ? ` → ${lin(1, a)} = ${lin(c, -c * b)}` : ""} → ${lin(1 - c, 0)} = ${neg(-c * b - a)}`;
    return { q: S.m11.ec_q(e), kind: "int", ans: x, sol: S.m11.rac_s(steps, neg(x)) };
  }
});
def("m11.al.irracional", (R, S, H) => {
  // √(x + a) = x − b, con raíz x0 ≥ b; la otra raíz de la cuadrática puede ser falsa
  for (;;) {
    const b = R.int(-3, 4), x0 = b + R.int(1, 5), a = (x0 - b) ** 2 - x0;
    // (x − b)² = x + a → x² − (2b + 1)x + b² − a = 0
    const B = -(2 * b + 1), C = b * b - a, D = B * B - 4 * C;
    if (D < 0) continue;
    const sq = Math.round(Math.sqrt(D));
    if (sq * sq !== D) continue;
    const r1 = (-B + sq) / 2, r2 = (-B - sq) / 2;
    if (!Number.isInteger(r1) || !Number.isInteger(r2)) continue;
    const valid = [r1, r2].filter(r => r - b >= 0 && r + a >= 0 && Math.abs(Math.sqrt(r + a) - (r - b)) < 1e-9);
    const bad = [r1, r2].filter(r => !valid.includes(r));
    const steps = `x${sgnT(a, "")} = ${b ? `(${lin(1, -b)})²` : "x²"} → x²${sgnT(B, "x")}${sgnT(C, "")} = 0 → x = ${listS([...new Set([r1, r2])])}`;
    const rad = a ? `√(${lin(1, a)})` : "√x";
    const checks = [...new Set([r1, r2])].sort((u, v) => u - v).map(r => S.m11.irr_chk(neg(r), r + a < 0 ? null : `√${r + a} = ${Math.sqrt(r + a)}`, neg(r - b), valid.includes(r)));
    return { q: S.m11.ec_q(`${rad} = ${lin(1, -b)}`), kind: "set", ans: [...new Set(valid)], hint: S.m11.ec_hint_set,
      sol: S.m11.irr_s(steps, checks.join("; "), `<b>x = ${listS([...new Set(valid)])}</b>`) };
  }
});
def("m11.al.exponencial", (R, S, H) => {
  // t₁ = kᵉ¹ y t₂ = kᵉ² (dos soluciones) o, en un 30 %, t₂ < 0 (no da solución)
  const k = R.pick([2, 3]), e1 = R.int(0, 3), t1 = k ** e1;
  let e2 = null, t2;
  if (R.r() < 0.3) { do t2 = -R.int(1, 6); while (t1 + t2 === 0); }
  else { do e2 = R.int(0, 3); while (e2 === e1); t2 = k ** e2; }
  const B = -(t1 + t2), C = t1 * t2, kx = `${k}<sup>x</sup>`;
  const mid = (c, v) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 ? "" : Math.abs(c) + " · ") + v : "";
  const sols = e2 === null ? [e1] : [e1, e2];
  return { q: S.m11.ec_q(`${k}<sup>2x</sup>${mid(B, kx)}${sgnT(C, "")} = 0`), kind: "set", ans: sols, hint: S.m11.ec_hint_set,
    sol: S.m11.exp_s(k, `t²${sgnT(B, "t")}${sgnT(C, "")} = 0`, Math.min(t1, t2), Math.max(t1, t2), [[t1, e1], [t2, e2]].sort((p, q) => p[0] - q[0]), listS(sols)) };
});
def("m11.al.sistema", (R, S, H) => {
  const pr = ([u, v]) => `(${neg(u)}, ${neg(v)})`;
  const out = (e, P, sol) => { P.sort((u, v) => u[0] - v[0]); return { q: S.m11.sis_q(e), kind: "fields", fields: S.m11.sis_f.map((l, i) => ({ label: l, ans: P[i >> 1][i & 1] })), sol }; };
  if (R.r() < 0.45) {   // circunferencia x² + y² = r² y recta x ∓ y = k con dos puntos de corte enteros
    let p, q, minus;
    do { p = R.int(-5, 5); q = R.int(-5, 5); minus = R.r() < 0.5; } while (!p || !q || p * p + q * q > 50 || (minus ? p === -q : p === q));
    const r2 = p * p + q * q, k = minus ? p - q : p + q, c0 = minus ? -p * q : p * q;
    const P = [[p, q], minus ? [-q, -p] : [q, p]];
    const yx = minus ? lin(1, -k) : (k ? `${neg(k)} − x` : "−x");
    const e = sys([`x² + y² = ${r2}`, `${minus ? "x − y" : "x + y"} = ${neg(k)}`]);
    const ys = P.slice().sort((u, v) => u[0] - v[0]).map(([u, v]) => `x = ${neg(u)} → y = ${neg(v)}`).join("; ");
    return out(e, P, S.m11.sis_cr(yx, r2, `2x²${sgnT(-2 * k, "x")}${sgnT(k * k - r2, "")} = 0`, `x²${sgnT(-k, "x")}${sgnT(c0, "")} = 0`, ys, P.slice().sort((u, v) => u[0] - v[0]).map(pr).join(" y ")));
  }
  let x1, x2;
  do { x1 = R.int(-5, 7); x2 = R.int(-5, 7); } while (x1 === x2 || x1 + x2 === 0 || x1 * x2 === 0);
  const s = x1 + x2, p = x1 * x2, P = [[x1, x2], [x2, x1]];
  const e = sys([`x + y = ${neg(s)}`, `x · y = ${neg(p)}`]);
  const ys = P.slice().sort((u, v) => u[0] - v[0]).map(([u, v]) => `x = ${neg(u)} → y = ${neg(v)}`).join("; ");
  return out(e, P, S.m11.sis_s(lin(-1, s), `x(${lin(-1, s)}) = ${neg(p)} → −x²${sgnT(s, "x")} = ${neg(p)}`, `x²${sgnT(-s, "x")}${sgnT(p, "")} = 0`, listS([x1, x2]), ys, P.slice().sort((u, v) => u[0] - v[0]).map(pr).join(" y ")));
});
// Lo nuevo de 1.º: ecuaciones con soluciones falsas (racionales de 2.º grado, racionales sin solución), irracionales sin
// aislar y con dos radicales.
def("m11.al.ecfalsa", (R, S, H) => {
  const T = S.m11.ef_t, k = R.pick([0, 0, 1, 2, 3, 3]);
  if (k === 0) {   // x²/(x − a) = (px + q)/(x − a): raíces a (falsa) y s
    let a, s; do { a = rnz(R, -5, 5); s = R.int(-6, 6); } while (s === a);
    const p = a + s, q = -a * s;
    const e = `${H.frac("x²", lin(1, -a))} = ${H.frac(lin(p, q), lin(1, -a))}`;
    return { q: S.m11.ec_q(e), kind: "set", ans: [s], hint: S.m11.ec_hint_set,
      sol: T.s0(lin(1, -a), neg(a), `x² = ${lin(p, q)} → x²${sgnT(-p, "x")}${sgnT(-q, "")} = 0`, listS([a, s]), neg(a), neg(s)) };
  }
  if (k === 1) {   // x/(x − a) + c = a/(x − a): da x = a, que anula el denominador → ninguna solución
    const a = rnz(R, -6, 6); let c; do c = rnz(R, -3, 4); while (c === -1);
    const e = `${H.frac("x", lin(1, -a))} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${H.frac(neg(a), lin(1, -a))}`;
    const opts = R.shuffle([T.none, `x = ${neg(a)}`, `x = ${neg(-a)}`, "x = 0"].filter((v, i, A) => A.indexOf(v) === i));
    const cx = c === 1 ? "" : c === -1 ? "−" : neg(c);
    return { q: S.m11.ec_q(e) + T.q1, kind: "choice", opts, correct: opts.indexOf(T.none),
      sol: T.s1(lin(1, -a), `x ${c < 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}(${lin(1, -a)}) = ${neg(a)} → ${lin(1 + c, -c * a)} = ${neg(a)} → ${lin(1 + c, 0)} = ${neg(a + c * a)} → x = ${neg(a)}`, neg(a)) };
  }
  if (k === 2) {   // √(x + a) + b = x: primero hay que aislar la raíz
    for (let t = 0; t < 60; t++) {
      const b = R.int(-3, 4), x0 = b + R.int(1, 5), a = (x0 - b) ** 2 - x0;
      if (!a || !b) continue;
      const B = -(2 * b + 1), C = b * b - a, D = B * B - 4 * C, sq = Math.round(Math.sqrt(Math.max(D, 0)));
      if (D < 0 || sq * sq !== D) continue;
      const rs = [...new Set([(-B + sq) / 2, (-B - sq) / 2])].sort((u, v) => u - v);
      if (!rs.every(Number.isInteger)) continue;
      const ok = rs.filter(r => r + a >= 0 && Math.abs(Math.sqrt(r + a) + b - r) < 1e-9);
      const chk = rs.map(r => S.m11.irr_chk(neg(r), r + a < 0 ? null : `√${r + a} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${Math.sqrt(r + a) + b}`, neg(r), ok.includes(r)));
      return { q: S.m11.ec_q(`√(${lin(1, a)}) ${b < 0 ? "−" : "+"} ${Math.abs(b)} = x`), kind: "set", ans: ok, hint: S.m11.ec_hint_set,
        sol: T.s2(`√(${lin(1, a)}) = ${lin(1, -b)}`, `${lin(1, a)} = (${lin(1, -b)})² → x²${sgnT(B, "x")}${sgnT(C, "")} = 0 → x = ${listS(rs)}`, chk.join("; "), listS(ok)) };
    }
    return null;
  }
  // dos radicales: √(px + q) − √(x + r) = d
  for (let t = 0; t < 80; t++) {
    const p = R.pick([2, 3]), d = R.int(1, 3), u0 = R.int(0, 4), x0 = R.int(1, 12), r = u0 * u0 - x0, q = (d + u0) ** 2 - p * x0;
    if (Math.abs(r) > 9 || Math.abs(q) > 20 || !r || !q) continue;
    const K = q - d * d - r;   // (p − 1)x + K = 2d√(x + r)
    const A2 = (p - 1) ** 2, B2 = 2 * (p - 1) * K - 4 * d * d, C2 = K * K - 4 * d * d * r, D = B2 * B2 - 4 * A2 * C2;
    if (D < 0) continue;
    const sq = Math.round(Math.sqrt(D));
    if (sq * sq !== D) continue;
    const rs = [...new Set([(-B2 + sq) / (2 * A2), (-B2 - sq) / (2 * A2)])].sort((u, v) => u - v);
    if (!rs.every(Number.isInteger)) continue;
    const f = x => p * x + q >= 0 && x + r >= 0 && Math.abs(Math.sqrt(p * x + q) - Math.sqrt(x + r) - d) < 1e-9;
    const ok = rs.filter(f);
    if (!ok.length) continue;
    const g = (A, B, C) => `${A === 1 ? "" : A}x²${sgnT(B, "x")}${sgnT(C, "")} = 0`;
    const gcdI = (u, v) => { u = Math.abs(u); v = Math.abs(v); while (v) [u, v] = [v, u % v]; return u; };
    const gg = gcdI(gcdI(A2, B2), C2), A3 = A2 / gg, B3 = B2 / gg, C3 = C2 / gg;
    const sr = v => v >= 0 ? `√${v} = ${Math.sqrt(v)}` : null;
    const chk = rs.map(x => S.m11.irr_chk(neg(x), sr(p * x + q) && sr(x + r) ? `√${p * x + q} − √${x + r} = ${Math.sqrt(p * x + q)} − ${Math.sqrt(x + r)} = ${Math.sqrt(p * x + q) - Math.sqrt(x + r)}` : null, d, ok.includes(x)));
    const L = lin(p - 1, K), Rr = lin(1, r);
    return { q: S.m11.ec_q(`√(${lin(p, q)}) − √(${Rr}) = ${d}`), kind: "set", ans: ok, hint: S.m11.ec_hint_set,
      sol: T.s3(`√(${lin(p, q)}) = ${d} + √(${Rr})`, `${lin(p, q)} = ${d * d} + ${2 * d}√(${Rr}) + ${Rr}`,
        `${L} = ${2 * d}√(${Rr})`, `${K === 0 ? (p === 2 ? "x²" : `${(p - 1) ** 2}x²`) : `(${L})²`} = ${4 * d * d}(${Rr}) → ${g(A2, B2, C2)}${gg > 1 ? ` → ${g(A3, B3, C3)}` : ""} → x = ${listS(rs)}`, chk.join("; "), listS(ok)) };
  }
  return null;
});

// ── Inecuaciones ──────────────────────────────────────────────────────
function opts4(R, ok, alts) { const o = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok).slice(0, 3)]); return { opts: o, correct: o.indexOf(ok) }; }
def("m11.al.inec1", (R, S, H) => {
  let a, c;
  do { a = rnz(R, -6, 6); c = rnz(R, -6, 6); } while (a === c);
  const b = R.int(-10, 10), x0 = R.int(-6, 6), d = (a - c) * x0 + b;
  const rel = R.pick(["&lt;", "≤", "&gt;", "≥"]);
  const strict = rel === "&lt;" || rel === "&gt;", less = rel === "&lt;" || rel === "≤";
  const A = a - c, flip = A < 0, lessFinal = flip ? !less : less;
  const ok = lessFinal ? ivl(-Infinity, x0, false, !strict) : ivl(x0, Infinity, !strict, false);
  const alts = [lessFinal ? ivl(x0, Infinity, !strict) : ivl(-Infinity, x0, false, !strict), lessFinal ? ivl(-Infinity, x0, false, strict) : ivl(x0, Infinity, strict), ivl(-Infinity, -x0, false, !strict)];
  const left = `${lin(a, 0)}${sgnT(-c, "x")}`, right = b ? (d ? `${neg(d)}${sgnT(-b, "")}` : neg(-b)) : neg(d);
  const fin = `x ${flip ? { "&lt;": "&gt;", "≤": "≥", "&gt;": "&lt;", "≥": "≤" }[rel] : rel} ${neg(x0)}`;
  const steps = `${left} ${rel} ${right} → ${A === 1 ? fin : `${lin(A, 0)} ${rel} ${neg(d - b)} → ${fin}${flip ? S.m11.in1_flip : ""}`}`;
  return { q: S.m11.in_q(`${lin(a, b)} ${rel} ${lin(c, d)}`), kind: "choice", ...opts4(R, ok, alts), sol: S.m11.in1_s(steps, ok) };
});
def("m11.al.inec2", (R, S, H) => {
  const T = S.m11.in2_t, rel = R.pick(["&lt;", "≤", "&gt;", "≥"]), strict = rel === "&lt;" || rel === "&gt;", less = rel === "&lt;" || rel === "≤";
  const RR = "(−∞, +∞)", t = R.r();
  if (t < 0.15) {   // sin raíces (x² + c) o raíz doble ((x − r)²)
    if (R.r() < 0.5) {
      const c = R.int(1, 9), ok = less ? "∅" : RR;
      return { q: S.m11.in_q(`x² + ${c} ${rel} 0`), kind: "choice", ...opts4(R, ok, [less ? RR : "∅", ivl(-c, c, !strict, !strict), "{0}"]), sol: T.sa(c, less, ok) };
    }
    const r = rnz(R, -5, 5), out2 = `${ivl(-Infinity, r, false, false)} ∪ ${ivl(r, Infinity, false)}`;
    const ok = rel === "&gt;" ? out2 : rel === "≥" ? RR : rel === "&lt;" ? "∅" : `{${neg(r)}}`;
    return { q: S.m11.in_q(`x²${sgnT(-2 * r, "x")}${sgnT(r * r, "")} ${rel} 0`), kind: "choice", ...opts4(R, ok, [out2, RR, "∅", `{${neg(r)}}`]),
      sol: T.sb(`x²${sgnT(-2 * r, "x")}${sgnT(r * r, "")}`, `(${lin(1, -r)})²`, neg(r), rel, ok) };
  }
  const a = t < 0.65 ? 1 : t < 0.85 ? -1 : 2;
  let r1, r2;
  do { r1 = R.int(-6, 6); r2 = R.int(-6, 6); } while (r1 >= r2);
  const B = -a * (r1 + r2), C = a * r1 * r2, inside = (a > 0) === less;
  const ok = inside ? ivl(r1, r2, !strict, !strict) : `${ivl(-Infinity, r1, false, !strict)} ∪ ${ivl(r2, Infinity, !strict)}`;
  const alts = [inside ? `${ivl(-Infinity, r1, false, !strict)} ∪ ${ivl(r2, Infinity, !strict)}` : ivl(r1, r2, !strict, !strict), inside ? ivl(r1, r2, strict, strict) : `${ivl(-Infinity, r1, false, strict)} ∪ ${ivl(r2, Infinity, strict)}`, ivl(-r2, -r1, !strict, !strict)];
  const lead = a === 1 ? "" : a === -1 ? "−" : String(a), fac = r => r ? `(${lin(1, -r)})` : "x";
  const facS = lead + [r1, r2].sort((u, v) => (u === 0 ? -1 : v === 0 ? 1 : 0)).map(fac).join("");
  const poly = `${lead}x²${sgnT(B, "x")}${sgnT(C, "")}`;
  return { q: S.m11.in_q(`${poly} ${rel} 0`), kind: "choice", ...opts4(R, ok, alts), sol: T.s(poly, facS, neg(r1), neg(r2), a, inside, rel, strict, ok) };
});
def("m11.al.inecracional", (R, S, H) => {
  let a, b;
  do { a = R.int(-5, 5); b = R.int(-5, 5); } while (a === b);
  const rel = R.pick(["&gt;", "≥", "&lt;", "≤"]), pos = rel === "&gt;" || rel === "≥", incA = rel === "≥" || rel === "≤";
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const cl = v => incA && v === a;
  const ok = pos ? `${ivl(-Infinity, lo, false, cl(lo))} ∪ ${ivl(hi, Infinity, cl(hi))}` : ivl(lo, hi, cl(lo), cl(hi));
  const alts = [pos ? ivl(lo, hi, cl(lo), cl(hi)) : `${ivl(-Infinity, lo, false, cl(lo))} ∪ ${ivl(hi, Infinity, cl(hi))}`, pos ? `${ivl(-Infinity, lo, false, true)} ∪ ${ivl(hi, Infinity, true)}` : ivl(lo, hi, true, true), pos ? `${ivl(-Infinity, lo, false, false)} ∪ ${ivl(hi, Infinity, false)}` : ivl(lo, hi, false, false)];
  return { q: S.m11.in_q(`${H.frac(lin(1, -a), lin(1, -b))} ${rel} 0`), kind: "choice", ...opts4(R, ok, alts), sol: S.m11.inr_s(neg(a), neg(b), ok, incA, neg(lo), neg(hi), pos, rel) };
});

// Lo nuevo de 1.º: tabla de signos con varios factores (grado 3), racionales que hay que reducir, un problema de
// beneficios y un sistema de inecuaciones no lineal.
// Resuelve f(x) rel 0 con los puntos críticos [{v, pole}] y una tabla de signos (signo de cada tramo con un número de prueba).
function signTable(pts, f, rel) {
  const P = [...pts].sort((u, v) => u.v - v.v), strict = rel === "&lt;" || rel === "&gt;", wantPos = rel === "&gt;" || rel === "≥";
  const tests = P.map((p, i) => i ? (P[i - 1].v + p.v) / 2 : p.v - 1).concat([P[P.length - 1].v + 1]);
  const signs = tests.map(x => f(x) > 0);
  const parts = [];
  for (let i = 0; i < signs.length; i++) {
    if (signs[i] !== wantPos) continue;
    const L = i ? P[i - 1] : null, U = i < P.length ? P[i] : null;
    parts.push([L ? L.v : -Infinity, L ? !strict && !L.pole : false, U ? U.v : Infinity, U ? !strict && !U.pole : false]);
  }
  for (let i = parts.length - 1; i > 0; i--) if (parts[i - 1][2] === parts[i][0] && parts[i][1]) { parts[i - 1][2] = parts[i][2]; parts[i - 1][3] = parts[i][3]; parts.splice(i, 1); }
  if (!strict) P.forEach(p => { if (!p.pole && !parts.some(q => (q[0] === p.v && q[1]) || (q[2] === p.v && q[3]))) parts.push([p.v, true, p.v, true]); });
  parts.sort((u, v) => u[0] - v[0]);
  const ok = parts.length ? parts.map(q => q[0] === q[2] ? `{${neg(q[0])}}` : ivl(q[0], q[2], q[1], q[3])).join(" ∪ ") : "∅";
  const tram = signs.map((s, i) => `${ivl(i ? P[i - 1].v : -Infinity, i < P.length ? P[i].v : Infinity, false, false)}: ${s ? "+" : "−"}`);
  return { ok, tram: tram.join("; ") };
}
def("m11.al.inecpol", (R, S, H) => {
  const T = S.m11.ip_t, k = R.pick([0, 0, 1, 1, 2, 3]), rel = R.pick(["&lt;", "≤", "&gt;", "≥"]);
  if (k === 0) {   // grado 3: (x − r₁)(x − r₂)(x − r₃) o x(x² + bx + c)
    let rs; do rs = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)]; while (new Set(rs).size < 3);
    const zero = R.r() < 0.5;
    if (zero) rs[0] = 0;
    if (new Set(rs).size < 3) return null;
    rs.sort((u, v) => u - v);
    const fac = r => r ? `(${lin(1, -r)})` : "x";
    const f = x => (x - rs[0]) * (x - rs[1]) * (x - rs[2]);
    const st = signTable(rs.map(v => ({ v })), f, rel);
    let e, how;
    if (zero) {
      const o = rs.filter(r => r), s1 = -(o[0] + o[1]), s2 = o[0] * o[1];
      e = `x³${sgnT(s1, "x²")}${sgnT(s2, "x")}`;
      how = T.fz(e, `x(x²${sgnT(s1, "x")}${sgnT(s2, "")})`, `x · ${o.map(fac).join("")}`);
    } else { e = [...rs].sort(() => R.r() - 0.5).map(fac).join(""); how = ""; }
    const alts = [st.ok.replace(/[\[\]]/g, c => c === "[" ? "(" : ")"), signTable(rs.map(v => ({ v })), x => -f(x), rel).ok, `${ivl(rs[0], rs[1], true, true)}`];
    return { q: S.m11.in_q(`${e} ${rel} 0`), kind: "choice", ...opts4(R, st.ok, alts.filter(x => x !== st.ok)), sol: T.s0(how, rs.map(neg).join(", "), st.tram, rel, st.ok) };
  }
  if (k === 1) {   // c/(x − b) rel m: se pasa todo a un miembro (¡sin multiplicar por x − b!)
    const b = R.int(-4, 5), m = R.pick([1, 1, 2, -1]);
    let c; do c = rnz(R, -6, 8); while (c % m !== 0);
    const z = (c + m * b) / m;   // c − m(x − b) = 0 en x = (c + mb)/m
    const num = lin(-m, c + m * b), f = x => (c - m * (x - b)) / (x - b);
    const st = signTable([{ v: z }, { v: b, pole: true }], f, rel);
    const alts = [signTable([{ v: z }, { v: b, pole: true }], x => -f(x), rel).ok, st.ok.replace(/[\[\]]/g, c2 => c2 === "[" ? "(" : ")"), ivl(Math.min(z, b), Math.max(z, b), true, true)];
    return { q: S.m11.in_q(`${H.frac(neg(c), lin(1, -b))} ${rel} ${neg(m)}`), kind: "choice", ...opts4(R, st.ok, alts.filter(x => x !== st.ok)),
      sol: T.s1(neg(m), lin(1, -b), `${H.frac(`${neg(c)}${m === 1 ? " − " : m === -1 ? " + " : m > 0 ? ` − ${m}` : ` + ${-m}`}${b ? `(${lin(1, -b)})` : "x"}`, lin(1, -b))} = ${H.frac(num, lin(1, -b))}`, neg(z), neg(b), st.tram, rel, st.ok) };
  }
  if (k === 2) {   // beneficios: B(x) = −x² + sx − p > 0
    let r1, r2; do { r1 = R.int(1, 6); r2 = R.int(4, 14); } while (r2 - r1 < 2);
    const s = r1 + r2, p = r1 * r2, ok = ivl(r1, r2, false, false);
    return { q: T.q2(`−x² + ${s}x − ${p}`), kind: "choice", ...opts4(R, ok, [`${ivl(0, r1, true, false)} ∪ ${ivl(r2, Infinity, false)}`, ivl(r1, r2, true, true), ivl(0, r2, false, false)]),
      sol: T.s2(`−x² + ${s}x − ${p}`, r1, r2, ok, H.n(r1 * 1000), H.n(r2 * 1000)) };
  }
  // sistema no lineal: x² − c² rel1 0 y x > d (o 1/(x − d) > 0)
  const c = R.int(2, 6), d = R.int(-c + 1, c - 1), le = R.r() < 0.5, frac = R.r() < 0.5;
  const ok = ivl(d, c, false, le);
  const e1 = `x² − ${c * c} ${le ? "≤" : "&lt;"} 0`, e2 = frac ? `${H.frac(1, lin(1, -d))} &gt; 0` : `x &gt; ${neg(d)}`;
  return { q: T.q3(e1, e2), kind: "choice", ...opts4(R, ok, [ivl(-c, c, le, le), ivl(-c, d, le, false), `${ivl(-Infinity, -c, false, le)} ∪ ${ivl(d, Infinity, false)}`]),
    sol: T.s3(e1, ivl(-c, c, le, le), e2, ivl(d, Infinity, false), frac, ok) };
});

// ── Gauss ─────────────────────────────────────────────────────────────
const eq3 = (a, b, c, d) => `${lin(a, 0).replace("x", "x")}${sgnT(b, "y")}${sgnT(c, "z")} = ${neg(d)}`.replace(/^0/, "");
function row(a, b, c, d) {
  let s = "";
  [[a, "x"], [b, "y"], [c, "z"]].forEach(([k, v]) => { if (!k) return; s += s ? sgnT(k, v) : (k < 0 ? "−" : "") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v; });
  return `${s || "0"} = ${neg(d)}`;
}
def("m11.al.gauss", (R, S, H) => {
  const x = R.int(-4, 5), y = R.int(-4, 5), z = R.int(-4, 5);
  // matriz triangular "amable" y luego mezclada con combinaciones enteras
  const r3 = [0, 0, rnz(R, -3, 3)], r2 = [0, rnz(R, -3, 3), R.int(-3, 3)], r1 = [1, R.int(-3, 3), R.int(-3, 3)];
  let k2, k3, k32; do { k2 = R.int(-2, 2); k3 = R.int(-2, 2); k32 = R.int(-1, 1); } while (!k2 && !k3);   // nunca ya escalonado
  const A1 = r1, A2 = r2.map((v, i) => v + k2 * r1[i]), A3 = r3.map((v, i) => v + k3 * r1[i] + k32 * r2[i]);
  const dot = r => r[0] * x + r[1] * y + r[2] * z;
  const rows = [A1, A2, A3].map(r => row(r[0], r[1], r[2], dot(r)));
  const tri = [r1, r2, r3].map(r => row(r[0], r[1], r[2], dot(r)));
  // operaciones: E₂ − k₂E₁ da r₂; E₃ − k₃E₁ da r₃ + k₃₂r₂; E₃ − k₃₂E₂ da r₃
  const op = (i, k, j) => `E<sub>${i}</sub> ${k > 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}E<sub>${j}</sub>`;
  const mid3 = r3.map((v, i) => v + k32 * r2[i]);
  const ops = [];
  if (k2) ops.push(`${op(2, k2, 1)}: ${tri[1]}`);
  if (k3) ops.push(`${op(3, k3, 1)}: ${row(mid3[0], mid3[1], mid3[2], dot(mid3))}`);
  if (k32) ops.push(`${op(3, k32, 2)}: ${tri[2]}`);
  const cy = c => c === 1 ? "" : c === -1 ? "−" : neg(c);
  const back = [r3[2] === 1 ? `z = ${neg(z)}` : `${cy(r3[2])}z = ${neg(dot(r3))} → z = ${neg(z)}`,
    r2[1] === 1 && !r2[2] ? `y = ${neg(y)}` : `${cy(r2[1])}y${sgnT(r2[2] * z, "")} = ${neg(dot(r2))} → y = ${neg(y)}`,
    `x${sgnT(r1[1] * y, "")}${sgnT(r1[2] * z, "")} = ${neg(dot(r1))} → x = ${neg(x)}`];
  return { q: S.m11.ga_q(sys(rows)), kind: "fields", fields: [{ label: "x", ans: x }, { label: "y", ans: y }, { label: "z", ans: z }],
    sol: S.m11.ga_s(ops.join(". "), sys(tri), back, neg(x), neg(y), neg(z)) };
});
def("m11.al.gausstipo", (R, S, H) => {
  const k = R.int(0, 2), a = rnz(R, -4, 4), b = R.int(-4, 4), c = rnz(R, -4, 4), d = R.int(-9, 9), e = R.int(-9, 9);
  if (k && R.r() < 0.5) {   // sin escalonar: E₃ = E₁ + E₂ (indeterminado) o con otro término independiente (incompatible)
    const E1 = [1, a, b, d], E2 = [R.int(-3, 3), c, R.int(-3, 3), e], E3 = E1.map((v, i) => v + E2[i]);
    if (!E3[0] && !E3[1] && !E3[2]) return null;
    const w = k === 2 ? rnz(R, -5, 5) : 0;
    E3[3] += w;
    return { q: S.m11.ga_tipo_q2(sys([E1, E2, E3].map(r => row(...r)))), kind: "choice", opts: S.m11.ga_tipos, correct: k, shuffle: false,
      sol: S.m11.ga_tipo_s2(k === 1 ? "0 = 0" : `0 = ${neg(w)}`, k) };
  }
  const last = k === 0 ? row(0, 0, rnz(R, -5, 5), R.int(-9, 9)) : k === 1 ? "0 = 0" : `0 = ${neg(rnz(R, -9, 9))}`;
  return { q: S.m11.ga_tipo_q(sys([row(1, a, b, d), row(0, c, R.int(-3, 3), e), last])), kind: "choice", opts: S.m11.ga_tipos, correct: k, shuffle: false, sol: S.m11.ga_tipo_s[k] };
});
})();
