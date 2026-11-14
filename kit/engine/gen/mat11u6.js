/* WikiAula — Matemáticas, Grado 11 · Unidad 6: Geometría analítica del plano.
   Textos: i18n/<lang>/mat11u6.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F, gcd } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const pt = (a, b) => `(${neg(a)}, ${neg(b)})`;
const ft = f => f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`;   // fracción en texto para "expr"

// y = m x + n con m, n fracciones exactas → HTML y texto para comparar
function explicit(H, m, n) {
  const mx = m[0] === 0 ? "" : (m[0] === m[1] ? "x" : m[0] === -m[1] ? "−x" : F.html(m, H) + "x");
  const nn = n[0] === 0 ? (mx ? "" : "0") : (mx ? (n[0] < 0 ? " − " : " + ") + F.html([Math.abs(n[0]), n[1]], H) : F.html(n, H));
  return { html: `y = ${mx}${nn}`, text: `(${ft(m)})*x + (${ft(n)})` };
}
// Punto-pendiente sin «y − (−5)», «(x − (−3))», «1(x − 2)», «y − 0» ni «(x − 0)»: y + 5 = x − 2, y − 3 = −½(x + 3), y = 2x
function pointSlope(H, P, m) {
  const lhs = P[1] ? `y ${P[1] < 0 ? "+" : "−"} ${Math.abs(P[1])}` : "y";
  const one = m[0] === m[1], mone = m[0] === -m[1], c = one ? "" : mone ? "−" : F.html(m, H);
  const xs = P[0] ? `x ${P[0] < 0 ? "+" : "−"} ${Math.abs(P[0])}` : "x";
  const rhs = !P[0] ? `${c}x` : one ? xs : `${c}(${xs})`;
  return `${lhs} = ${rhs}`;
}
const f2 = x => (x < 0 ? "−" : "") + Math.abs(x).toFixed(2).replace(".", WA.H.ds);   // siempre dos decimales: 6,40
const rt = n => { const r = Math.sqrt(n); return Number.isInteger(r) ? null : n; };   // null si la raíz es exacta
// y = m(x − x₀) + y₀ desarrollado antes de agrupar: «y = −1/5x + 2/5 − 5» (null si no hay nada que agrupar)
function expandPP(H, P, m) {
  const k = F.mul(m, [-P[0], 1]);
  if (!k[0] || !P[1]) return null;
  const mx = m[0] === m[1] ? "x" : m[0] === -m[1] ? "−x" : F.html(m, H) + "x";
  return `y = ${mx} ${k[0] < 0 ? "−" : "+"} ${F.html([Math.abs(k[0]), k[1]], H)} ${P[1] < 0 ? "−" : "+"} ${Math.abs(P[1])}`;
}
// Ax + By + C = 0 como texto
function general(A, B, C) {
  let s = "";
  [[A, "x"], [B, "y"]].forEach(([k, v]) => { if (!k) return; s += s ? (k < 0 ? " − " : " + ") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v : (k < 0 ? "−" : "") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v; });
  if (C) s += (C < 0 ? " − " : " + ") + Math.abs(C);
  return s + " = 0";
}

def("m11.ga.pendiente", (R, S, H) => {
  let A, B;
  do { A = [R.int(-6, 6), R.int(-6, 6)]; B = [R.int(-6, 6), R.int(-6, 6)]; } while (A[0] === B[0]);
  const m = F.make(B[1] - A[1], B[0] - A[0]);
  return { q: S.m11.ga_pend_q(pt(...A), pt(...B)), kind: "frac", ans: m, hint: S.m11.ga_hint_frac, sol: S.m11.ga_pend_s(`(${neg(B[1])} − ${A[1] < 0 ? "(" + neg(A[1]) + ")" : A[1]})/(${neg(B[0])} − ${A[0] < 0 ? "(" + neg(A[0]) + ")" : A[0]})`, F.html(m, H)) };
});
def("m11.ga.dospuntos", (R, S, H) => {
  let A, B;
  do { A = [R.int(-5, 5), R.int(-5, 5)]; B = [R.int(-5, 5), R.int(-5, 5)]; } while (A[0] === B[0]);
  const m = F.make(B[1] - A[1], B[0] - A[0]), n = F.sub([A[1], 1], F.mul(m, [A[0], 1]));
  const e = explicit(H, m, n), pd = v => v < 0 ? `(${neg(v)})` : v;
  return { q: S.m11.ga_dos_q(pt(...A), pt(...B)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m11.ga_hint_eq,
    sol: S.m11.ga_dos_s(`(${neg(B[1])} − ${pd(A[1])})/(${neg(B[0])} − ${pd(A[0])})`, F.html(m, H), pt(...A), pointSlope(H, A, m), (expandPP(H, A, m) ? expandPP(H, A, m) + " = " : "") + e.html.replace(/^y = /, expandPP(H, A, m) ? "" : "y = ")) };
});
def("m11.ga.puntopendiente", (R, S, H) => {
  const P = [R.int(-5, 5), R.int(-5, 5)], m = F.make(rnz(R, -4, 4), R.pick([1, 1, 2, 3])), n = F.sub([P[1], 1], F.mul(m, [P[0], 1]));
  const e = explicit(H, m, n);
  return { q: S.m11.ga_pp_q(pt(...P), F.html(m, H)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m11.ga_hint_eq,
    sol: S.m11.ga_pp_s(pointSlope(H, P, m), (expandPP(H, P, m) ? expandPP(H, P, m) + " = " : "") + e.html.replace(/^y = /, expandPP(H, P, m) ? "" : "y = ")) };
});
def("m11.ga.general", (R, S, H) => {
  const A = rnz(R, -6, 6), B = rnz(R, -6, 6), C = R.int(-12, 12);
  const m = F.make(-A, B), n = F.make(-C, B);
  return { q: S.m11.ga_gen_q(general(A, B, C)), kind: "fields", fields: [{ label: S.m11.ga_gen_f[0], kind: "frac", ans: m }, { label: S.m11.ga_gen_f[1], kind: "frac", ans: n }], hint: S.m11.ga_hint_frac,
    sol: S.m11.ga_gen_s(explicit(H, m, n).html, F.html(m, H), F.html(n, H)) };
});
def("m11.ga.posicion", (R, S, H) => {
  const k = R.int(0, 2), A = rnz(R, -5, 5), B = rnz(R, -5, 5), C = R.int(-9, 9), t = R.pick([2, 3, -1, -2]);
  let A2, B2, C2;
  if (k === 0) { A2 = rnz(R, -5, 5); B2 = rnz(R, -5, 5); if (A * B2 === A2 * B) B2 += 1; C2 = R.int(-9, 9); }
  else if (k === 1) { A2 = t * A; B2 = t * B; C2 = t * C + rnz(R, -4, 4); }
  else { A2 = t * A; B2 = t * B; C2 = t * C; }
  if (A * B2 === A2 * B && k === 0) return null;
  return { q: S.m11.ga_pos_q(general(A, B, C), general(A2, B2, C2)), kind: "choice", opts: S.m11.ga_pos_opts, correct: k, shuffle: false, sol: S.m11.ga_pos_s[k] };
});
def("m11.ga.corte", (R, S, H) => {
  const x = R.int(-5, 5), y = R.int(-5, 5);
  let A, B, A2, B2;
  do { A = rnz(R, -5, 5); B = rnz(R, -5, 5); A2 = rnz(R, -5, 5); B2 = rnz(R, -5, 5); } while (A * B2 === A2 * B);
  const C = -(A * x + B * y), C2 = -(A2 * x + B2 * y);
  // reducción: E₁ · B₂ − E₂ · B elimina la y; después se sustituye x en la 1.ª
  const g = gcd(Math.abs(B), Math.abs(B2)), k1 = B2 / g, k2 = B / g;   // E₁·k1 − E₂·k2
  const cx = A * k1 - A2 * k2, cc = C * k1 - C2 * k2;
  const mul = (k, i) => k === 1 ? `la ${i}.ª tal cual` : k === -1 ? `la ${i}.ª por −1` : `la ${i}.ª por ${neg(k)}`;
  const by = B === 1 ? "y" : B === -1 ? "−y" : `${neg(B)}y`, byT = `${B < 0 ? " − " : " + "}${Math.abs(B) === 1 ? "" : Math.abs(B)}y`;
  const st1 = `${S.m11.ga_corte_mul(mul(k1, 1), mul(k2, 2))}: ${cx === 1 ? "x" : cx === -1 ? "−x" : neg(cx) + "x"}${cc ? ` ${cc < 0 ? "−" : "+"} ${Math.abs(cc)}` : ""} = 0 → x = ${neg(x)}`;
  const st2 = `${neg(A)} · ${x < 0 ? `(${neg(x)})` : x}${byT}${C ? ` ${C < 0 ? "−" : "+"} ${Math.abs(C)}` : ""} = 0 → ${B === 1 ? `y = ${neg(y)}` : `${by} = ${neg(-(A * x + C))} → y = ${neg(y)}`}`;
  return { q: S.m11.ga_corte_q(general(A, B, C), general(A2, B2, C2)), kind: "fields", fields: [{ label: "x", ans: x }, { label: "y", ans: y }], sol: S.m11.ga_corte_s(st1, st2, neg(x), neg(y)) };
});
def("m11.ga.paralelaperp", (R, S, H) => {
  const P = [R.int(-5, 5), R.int(-5, 5)], A = rnz(R, -4, 4), B = rnz(R, -4, 4), C = R.int(-9, 9);
  const m = F.make(-A, B), perp = R.r() < 0.5;
  const mm = perp ? F.make(-m[1], m[0]) : m;
  if (perp && !m[0]) return null;
  const n = F.sub([P[1], 1], F.mul(mm, [P[0], 1])), e = explicit(H, mm, n);
  const pp = pointSlope(H, P, mm);
  return { q: (perp ? S.m11.ga_perp_q : S.m11.ga_par_q)(general(A, B, C), pt(...P)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m11.ga_hint_eq,
    sol: perp ? S.m11.ga_perp_s(F.html(m, H), F.html(mm, H), pp, e.html) : S.m11.ga_par_s(F.html(m, H), pp, e.html) };
});

// ── Distancias y ángulos ──────────────────────────────────────────────
def("m11.ga.distpp", (R, S, H) => {
  const A = [R.int(-6, 6), R.int(-6, 6)], B = [R.int(-6, 6), R.int(-6, 6)], dx = B[0] - A[0], dy = B[1] - A[1];
  if (!dx && !dy) return null;
  const d = rd(Math.hypot(dx, dy), 2);
  const s2 = dx * dx + dy * dy, pd = v => v < 0 ? `(${neg(v)})` : v;
  return { q: S.m11.ga_dpp_q(pt(...A), pt(...B)), kind: "num", ans: d, tol: 0.006,
    sol: S.m11.ga_dpp_s(`√((${neg(B[0])} − ${pd(A[0])})² + (${neg(B[1])} − ${pd(A[1])})²) = √(${dx * dx} + ${dy * dy}) = √${s2}`, rt(s2) ? f2(d) : String(d), !rt(s2)) };
});
def("m11.ga.distpr", (R, S, H) => {
  if (R.r() < 0.3) {   // distancia entre dos rectas paralelas: un punto de una y la fórmula con la otra
    const [A, B, n] = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, -6, 10], [3, -4, 5], [1, 0, 1], [0, 1, 1]]);
    let C, C2; do { C = R.int(-12, 12); C2 = R.int(-12, 12); } while (C === C2);
    // un punto de la primera con coordenadas enteras: x₀ que hace entera la y (o la x si B = 0)
    let P = null;
    for (let x0 = -6; x0 <= 6 && !P; x0++) if (B && (-(A * x0 + C)) % B === 0) P = [x0, -(A * x0 + C) / B];
    if (!B) P = [-C / A, 0];
    if (!P || !Number.isInteger(P[0])) return null;
    const num = A * P[0] + B * P[1] + C2, d = rd(Math.abs(num) / n, 2), pd = v => v < 0 ? `(${neg(v)})` : v;
    const sub = `|${A ? `${neg(A)} · ${pd(P[0])}` : ""}${B ? `${A ? (B < 0 ? " − " : " + ") + Math.abs(B) : neg(B)} · ${pd(P[1])}` : ""}${C2 ? ` ${C2 < 0 ? "−" : "+"} ${Math.abs(C2)}` : ""}| / ${n} = ${Math.abs(num)}/${n}`;
    return { q: S.m11.ga_dpar_q(general(A, B, C), general(A, B, C2)), kind: "num", ans: d, tol: 0.006,
      sol: S.m11.ga_dpar_s(pt(...P), sub, Math.abs(Math.abs(num) / n - d) < 1e-9 ? H.dec(d) : f2(d), `|${neg(C)} − ${pd(C2)}| / ${n}`) };
  }
  const P = [R.int(-5, 5), R.int(-5, 5)], A = rnz(R, -5, 5), B = rnz(R, -5, 5), C = R.int(-9, 9);
  const num = A * P[0] + B * P[1] + C, d = rd(Math.abs(num) / Math.hypot(A, B), 2);
  const pd = v => v < 0 ? `(${neg(v)})` : v, s2 = A * A + B * B;
  const sub = `|${neg(A)} · ${pd(P[0])} ${B < 0 ? "−" : "+"} ${Math.abs(B)} · ${pd(P[1])}${C ? ` ${C < 0 ? "−" : "+"} ${Math.abs(C)}` : ""}| / √(${pd(A)}² + ${pd(B)}²) = ${Math.abs(num)}/√${s2}${rt(s2) ? "" : ` = ${Math.abs(num)}/${Math.sqrt(s2)}`}`;
  const ex = Number.isInteger(Math.abs(num) / Math.hypot(A, B) * 100) && !rt(s2) || !num;
  return { q: S.m11.ga_dpr_q(pt(...P), general(A, B, C)), kind: "num", ans: d, tol: 0.006, sol: S.m11.ga_dpr_s(sub, ex ? H.dec(d) : f2(d), ex) };
});
def("m11.ga.angulo", (R, S, H) => {
  if (R.r() < 0.3) {   // con las pendientes: tg α = |(m₂ − m₁)/(1 + m₁m₂)|
    let m1, m2; do { m1 = F.make(rnz(R, -4, 4), R.pick([1, 1, 2])); m2 = F.make(R.int(-4, 4), R.pick([1, 1, 3])); } while (F.eq(m1, m2) || F.eq(F.mul(m1, m2), [-1, 1]));
    const t = F.div(F.sub(m2, m1), F.add([1, 1], F.mul(m1, m2))), tv = Math.abs(F.num(t)), a = rd(Math.atan(tv) * 180 / Math.PI, 2);
    const yx = (m, n) => `y = ${m[0] === 0 ? "" : m[0] === m[1] ? "x" : m[0] === -m[1] ? "−x" : F.html(m, H) + "x"}${n ? (m[0] ? ` ${n < 0 ? "−" : "+"} ${Math.abs(n)}` : neg(n)) : m[0] ? "" : "0"}`;
    const ft2 = q => q[0] < 0 ? `(${F.html(q, H)})` : F.html(q, H);
    return { q: S.m11.ga_ang_q(yx(m1, R.int(-5, 5)), yx(m2, rnz(R, -5, 5))), kind: "num", ans: a, tol: 0.02,
      sol: S.m11.ga_ang_m(F.html(m1, H), F.html(m2, H), `|(${F.html(m2, H)} − ${ft2(m1)}) / (1 + ${ft2(m1)} · ${ft2(m2)})| = ${F.html([Math.abs(t[0]), t[1]], H)}`, Number.isInteger(a) ? String(a) : f2(a), Number.isInteger(a)) };
  }
  const A = rnz(R, -5, 5), B = rnz(R, -5, 5), A2 = rnz(R, -5, 5), B2 = rnz(R, -5, 5);
  const c = Math.abs(A * A2 + B * B2) / (Math.hypot(A, B) * Math.hypot(A2, B2)), a = rd(Math.acos(Math.min(1, c)) * 180 / Math.PI, 2);
  return { q: S.m11.ga_ang_q(general(A, B, R.int(-5, 5)), general(A2, B2, R.int(-5, 5))), kind: "num", ans: a, tol: 0.02,
    sol: S.m11.ga_ang_s(`(${neg(A)}, ${neg(B)}) y (${neg(A2)}, ${neg(B2)})`, `cos α = |${neg(A)} · ${A2 < 0 ? "(" + neg(A2) + ")" : A2} + ${B < 0 ? "(" + neg(B) + ")" : B} · ${B2 < 0 ? "(" + neg(B2) + ")" : B2}| / (√${A * A + B * B} · √${A2 * A2 + B2 * B2}) = ${Math.abs(A * A2 + B * B2)}/(√${A * A + B * B} · √${A2 * A2 + B2 * B2}) ${Math.abs(c - rd(c, 4)) < 1e-12 ? "= " + H.dec(c) : "≈ " + rd(c, 4).toFixed(4).replace(".", WA.H.ds)}`, Number.isInteger(a) ? String(a) : f2(a), Number.isInteger(a)) };
});
def("m11.ga.mediatriz", (R, S, H) => {
  let A, B;
  do { A = [R.int(-5, 5), R.int(-5, 5)]; B = [R.int(-5, 5), R.int(-5, 5)]; } while (A[0] === B[0] || A[1] === B[1]);
  const M = [F.make(A[0] + B[0], 2), F.make(A[1] + B[1], 2)], m = F.make(B[1] - A[1], B[0] - A[0]), mp = F.make(-m[1], m[0]);
  const n = F.sub(M[1], F.mul(mp, M[0])), e = explicit(H, mp, n);
  // el método de la lección: d(P, A) = d(P, B), se desarrolla y se van x² e y²
  const sqv = (v, a) => a ? `(${v} ${a < 0 ? "+" : "−"} ${Math.abs(a)})²` : `${v}²`;
  const [gA, gB, gC] = genNorm(2 * (B[0] - A[0]), 2 * (B[1] - A[1]), A[0] ** 2 + A[1] ** 2 - B[0] ** 2 - B[1] ** 2);
  return { q: S.m11.ga_med_q(pt(...A), pt(...B)), kind: "expr", ans: e.text, ansHtml: e.html, hint: S.m11.ga_hint_eq,
    sol: S.m11.ga_med_s(`${sqv("x", A[0])} + ${sqv("y", A[1])} = ${sqv("x", B[0])} + ${sqv("y", B[1])}`, general(gA, gB, gC), e.html, `(${F.html(M[0], H)}, ${F.html(M[1], H)})`, F.html(m, H), F.html(mp, H)) };
});
// Lo nuevo de 1.º en la recta: de punto y vector a la general, ¿pertenece un punto a unas paramétricas?, rectas verticales
// y paramétricas por dos puntos.
function genNorm(A, B, C) {   // divide entre el m.c.d. y deja A > 0 (o B > 0 si A = 0)
  const g = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(C)) || 1, s = A < 0 || (A === 0 && B < 0) ? -1 : 1;
  return [s * A / g, s * B / g, s * C / g];
}
function choiceOf(R, ok, alts) {
  const seen = [ok];
  for (const a of R.shuffle(alts)) { if (seen.length === 4) break; if (a && !seen.includes(a)) seen.push(a); }
  if (seen.length < 3) return null;
  const opts = R.shuffle(seen);
  return { kind: "choice", opts, correct: opts.indexOf(ok) };
}
def("m11.ga.formas", (R, S, H) => {
  const T = S.m11.gf_t, k = R.pick([0, 0, 1, 1, 2, 3]);
  const tm = (p, w) => p ? `${neg(p)} ${w < 0 ? "−" : "+"} ${Math.abs(w) === 1 ? "" : Math.abs(w)}t` : `${w < 0 ? "−" : ""}${Math.abs(w) === 1 ? "" : Math.abs(w)}t`;
  const par = (P, v) => `x = ${tm(P[0], v[0])}, y = ${tm(P[1], v[1])}`;
  if (k === 0) {   // general por un punto y un vector director
    const P = [R.int(-5, 5), R.int(-5, 5)]; let v; do v = [R.int(-4, 4), rnz(R, -4, 4)]; while (gcd(Math.abs(v[0]), Math.abs(v[1])) !== 1);
    const [a, b, c] = genNorm(v[1], -v[0], v[0] * P[1] - v[1] * P[0]), ok = general(a, b, c);
    const alts = [general(...genNorm(v[0], v[1], -(v[0] * P[0] + v[1] * P[1]))), general(...genNorm(v[1], -v[0], -(v[0] * P[1] - v[1] * P[0]))), general(...genNorm(v[1], -v[0], v[0] * P[0] - v[1] * P[1])), general(...genNorm(v[1], v[0], -(v[1] * P[0] + v[0] * P[1])))];
    const c0 = choiceOf(R, ok, alts);
    const pd = x => x < 0 ? `(${neg(x)})` : x;
    const how = v[0] ? T.s0c(`(x ${P[0] < 0 ? "+" : "−"} ${Math.abs(P[0])})/${pd(v[0])} = (y ${P[1] < 0 ? "+" : "−"} ${Math.abs(P[1])})/${pd(v[1])}`.replace(/\(x − 0\)/, "x").replace(/\(y − 0\)/, "y"), `${neg(v[1])}(x ${P[0] < 0 ? "+" : "−"} ${Math.abs(P[0])}) = ${neg(v[0])}(y ${P[1] < 0 ? "+" : "−"} ${Math.abs(P[1])})`.replace(/\(x − 0\)/, "x").replace(/\(y − 0\)/, "y")) : T.s0v(neg(P[0]));
    return c0 && Object.assign({ q: T.q0(pt(...P), pt(...v)), sol: `${how} ${T.s0e(ok)}` }, c0);
  }
  if (k === 1) {   // ¿pertenece Q a la recta en paramétricas?
    const P = [R.int(-4, 4), R.int(-4, 4)], v = [rnz(R, -3, 3), rnz(R, -3, 3)], t0 = rnz(R, -3, 3), yes = R.r() < 0.5;
    const Q = [P[0] + t0 * v[0], P[1] + t0 * v[1] + (yes ? 0 : rnz(R, -2, 2))];
    const t1 = (Q[0] - P[0]) / v[0], t2 = (Q[1] - P[1]) / v[1];
    const tf = t => Number.isInteger(t) ? neg(t) : F.html(F.make(Math.round(t * Math.abs(v[1])), Math.abs(v[1])), H);
    return { q: T.q1(pt(...Q), par(P, v)), kind: "choice", opts: T.yn, correct: yes ? 0 : 1, shuffle: false,
      sol: T.s1(`${neg(Q[0])} = ${par(P, v).split(", y")[0].slice(4)}`, neg(t1), `${neg(Q[1])} = ${par(P, v).split("y = ")[1]}`, tf(t2), yes) };
  }
  if (k === 2) {   // recta vertical por dos puntos con la misma x
    const a = rnz(R, -6, 6); let y1, y2; do { y1 = R.int(-5, 5); y2 = R.int(-5, 5); } while (y1 === y2);
    const ok = `x = ${neg(a)}`, c2 = choiceOf(R, ok, [`y = ${neg(a)}`, `y = ${neg(a)}x`, T.nope, `x = ${neg(y1)}`]);
    return c2 && Object.assign({ q: T.q2(pt(a, y1), pt(a, y2)), sol: T.s2(neg(a), ok) }, c2);
  }
  // paramétricas por dos puntos: punto A y vector AB
  let A, B; do { A = [R.int(-4, 4), R.int(-4, 4)]; B = [R.int(-4, 4), R.int(-4, 4)]; } while (B[0] === A[0] || B[1] === A[1] || A[0] * B[1] === A[1] * B[0] || Math.abs(B[0] - A[0]) === Math.abs(B[1] - A[1]));
  const v = [B[0] - A[0], B[1] - A[1]], ok = par(A, v);
  const c3 = choiceOf(R, ok, [par(A, B), par(A, [v[1], v[0]]), par(B, [A[0] + B[0], A[1] + B[1]]), par(A, [B[0] + A[0], B[1] + A[1]])].filter(x => !/[+−] 0t|= 0t/.test(x)));
  return c3 && Object.assign({ q: T.q3(pt(...A), pt(...B)), sol: T.s3(pt(...v), pt(...A), ok) }, c3);
});
// Lugares geométricos (además de la mediatriz): bisectrices de dos rectas y centro y radio de una circunferencia
def("m11.ga.lugar", (R, S, H) => {
  const T = S.m11.gl_t;
  if (R.r() < 0.5) for (let tr = 0; tr < 25; tr++) {   // bisectrices: |r|/n₁ = |s|/n₂
    const N = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, -5, 13], [0, 1, 1], [1, 0, 1], [6, 8, 10], [8, -6, 10]];
    let r, s; do { r = R.pick(N); s = R.pick(N); } while (r[0] * s[1] === r[1] * s[0]);
    const C1 = R.int(-6, 6), C2 = R.int(-6, 6);
    const lin1 = (sg, a, b) => genNorm(a * r[0] + sg * b * s[0], a * r[1] + sg * b * s[1], a * C1 + sg * b * C2);
    const ok1 = lin1(-1, s[2], r[2]), ok2 = lin1(1, s[2], r[2]);
    if ((!ok1[0] && !ok1[1]) || (!ok2[0] && !ok2[1])) continue;
    const pair = (a, b) => `${general(...a)} y ${general(...b)}`;
    const ok = pair(ok1, ok2);
    const alts = [pair(lin1(-1, 1, 1), lin1(1, 1, 1)), pair(lin1(-1, r[2], s[2]), lin1(1, r[2], s[2])), pair(ok1, lin1(1, 1, 1)), pair(lin1(-1, 1, 1), ok2)];
    const c = choiceOf(R, ok, alts.filter(x => x !== pair(ok2, ok1)));
    const e1 = general(r[0], r[1], C1).replace(" = 0", ""), e2 = general(s[0], s[1], C2).replace(" = 0", "");
    if (!c) continue;
    return Object.assign({ q: T.q0(general(r[0], r[1], C1), general(s[0], s[1], C2)),
      sol: T.s0(`|${e1}|/${r[2]} = |${e2}|/${s[2]}`, `${s[2] === 1 ? "" : s[2]}(${e1}) = ${r[2] === 1 ? "" : r[2]}(${e2})`, `${s[2] === 1 ? "" : s[2]}(${e1}) = −${r[2] === 1 ? "" : r[2]}(${e2})`, general(...ok1), general(...ok2)) }, c);
  }
  // centro y radio de x² + y² + Dx + Ey + F = 0, completando cuadrados
  const a = R.int(-5, 5), b = R.int(-5, 5), r = R.int(1, 7), D = -2 * a, E = -2 * b, F0 = a * a + b * b - r * r;
  const t = (k, v) => k ? ` ${k < 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}` : "";
  const eq = `x² + y²${t(D, "x")}${t(E, "y")}${F0 ? ` ${F0 < 0 ? "−" : "+"} ${Math.abs(F0)}` : ""} = 0`;
  const cs = (v, c) => c ? `(${v} ${c < 0 ? "+" : "−"} ${Math.abs(c)})² − ${c * c}` : `${v}²`;
  return { q: T.q1(eq), kind: "fields", fields: [{ label: T.f[0], ans: a }, { label: T.f[1], ans: b }, { label: T.f[2], ans: r }],
    sol: T.s1(`${cs("x", a)} + ${cs("y", b)}${F0 ? ` ${F0 < 0 ? "−" : "+"} ${Math.abs(F0)}` : ""} = 0`, `(${a ? `x ${a < 0 ? "+" : "−"} ${Math.abs(a)}` : "x"})² + (${b ? `y ${b < 0 ? "+" : "−"} ${Math.abs(b)}` : "y"})² = ${r * r}`.replace("(x)²", "x²").replace("(y)²", "y²"), pt(a, b), r) };
});
})();
