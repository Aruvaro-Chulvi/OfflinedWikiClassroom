/* WikiAula — Matemáticas, Grado 11 · Unidad 7: Cónicas.
   Textos: i18n/<lang>/mat11u7.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const sg = (c, t) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 && t ? "" : Math.abs(c)) + t : "";
function circGen(a, b, r) {   // x² + y² + Dx + Ey + F = 0
  const D = -2 * a, E = -2 * b, Fc = a * a + b * b - r * r;
  return `x² + y²${sg(D, "x")}${sg(E, "y")}${sg(Fc, "")} = 0`;
}
const sqrtTxt = n => { const r = Math.sqrt(n); return Number.isInteger(r) ? String(r) : `√${n}`; };
const f2 = x => (x < 0 ? "−" : "") + Math.abs(x).toFixed(2).replace(".", WA.H.ds);   // siempre dos decimales: 0,60
const sq2 = (v, d) => d === 1 ? `${v}²` : `${v}²/${d}`;                          // x²/9, pero x² (no «x²/1»)
const co1 = n => n === 1 ? "" : n;                                                // sin «1x²»

// Completar cuadrados con los números: «(x² + 10x) + (y² − 10y) = −14 → (x + 5)² − 25 + (y − 5)² − 25 = −14»
const grp = (v, D) => D ? `(${v}²${sg(D, v)})` : `${v}²`;
const sqc = (v, a) => a ? `(${v} ${a < 0 ? "+" : "−"} ${Math.abs(a)})²` : `${v}²`;
const sqm = (v, a) => a ? `${sqc(v, a)} − ${a * a}` : `${v}²`;
def("m11.co.circcr", (R, S, H) => {
  const a = R.int(-6, 6), b = R.int(-6, 6);
  if (R.r() < 0.25) {   // ¿es de verdad una circunferencia? (radio², 0 o negativo)
    const t = R.int(0, 2), r2 = [R.pick([4, 9, 16, 25]), 0, -R.pick([1, 4, 9])][t], D = -2 * a, E = -2 * b, Fc = a * a + b * b - r2;
    const eq = `x² + y²${sg(D, "x")}${sg(E, "y")}${sg(Fc, "")} = 0`;
    return { q: S.m11.co_es_q(eq), kind: "choice", opts: S.m11.co_es_opts, correct: t, shuffle: false,
      sol: S.m11.co_es_s(`${grp("x", D)} + ${grp("y", E)} = ${neg(-Fc)}`, `${sqm("x", a)} + ${sqm("y", b)} = ${neg(-Fc)}`, `${sqc("x", a)} + ${sqc("y", b)} = ${neg(r2)}`, t, `(${neg(a)}, ${neg(b)})`) };
  }
  const r = R.int(1, 8), D = -2 * a, E = -2 * b, Fc = a * a + b * b - r * r;
  return { q: S.m11.co_cr_q(circGen(a, b, r)), kind: "fields", fields: [{ label: S.m11.co_cr_f[0], ans: a }, { label: S.m11.co_cr_f[1], ans: b }, { label: S.m11.co_cr_f[2], kind: "num", ans: r }],
    sol: S.m11.co_cr_s(`${grp("x", D)} + ${grp("y", E)} = ${neg(-Fc)}`, `${sqm("x", a)} + ${sqm("y", b)} = ${neg(-Fc)}`, `${sqc("x", a)} + ${sqc("y", b)} = ${r * r}`, neg(a), neg(b), r * r, r) };
});
def("m11.co.circec", (R, S, H) => {
  const a = R.int(-5, 5), b = R.int(-5, 5), r = R.int(1, 7);
  const ok = circGen(a, b, r);
  const alts = [circGen(-a || 1, b, r), circGen(a, -b || 1, r), circGen(a, b, r + 1), `x² + y²${sg(-2 * a, "x")}${sg(-2 * b, "y")}${sg(a * a + b * b + r * r, "")} = 0`];
  const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok).slice(0, 3)]);
  const dev = `${a ? `x²${sg(-2 * a, "x")} + ${a * a}` : "x²"} + ${b ? `y²${sg(-2 * b, "y")} + ${b * b}` : "y²"} = ${r * r}`;
  return { q: S.m11.co_ce_q(`(${neg(a)}, ${neg(b)})`, r), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.co_ce_s(`${sqc("x", a)} + ${sqc("y", b)} = ${r * r}`, dev, ok) };
});
// Posiciones y tangentes (lo nuevo de 1.º): posición de una recta, circunferencia tangente a una recta y tangentes
// desde un punto exterior a x² + y² = r².
const NRM = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, -5, 13], [6, 8, 10], [8, -6, 10]];
function lineTxt(A, B, C) {
  let s = ""; [[A, "x"], [B, "y"]].forEach(([k, v]) => { if (!k) return; s += s ? (k < 0 ? " − " : " + ") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v : (k < 0 ? "−" : "") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v; });
  return s + (C ? (C < 0 ? " − " : " + ") + Math.abs(C) : "") + " = 0";
}
def("m11.co.circpos", (R, S, H) => {
  const T = S.m11.cp_t, k = R.pick([0, 0, 1, 1, 2]);
  const pd = v => v < 0 ? `(${neg(v)})` : v;
  if (k <= 1) {
    const [A, B, n] = R.pick(NRM), a = R.int(-4, 4), b = R.int(-4, 4), r = R.int(1, 6), t = k === 1 ? 1 : R.int(0, 2);
    const dist = [r - R.int(1, r) + (r > 1 ? 0 : 0), r, r + R.int(1, 4)][t];
    const s = R.r() < 0.5 ? 1 : -1, C = s * dist * n - A * a - B * b;   // |A a + B b + C| / n = dist
    if (t === 0 && dist >= r) return null;
    const num = `|${neg(A)} · ${pd(a)} ${B < 0 ? "−" : "+"} ${Math.abs(B)} · ${pd(b)}${C ? ` ${C < 0 ? "−" : "+"} ${Math.abs(C)}` : ""}| / ${n} = ${dist * n}/${n} = ${dist}`;
    if (k === 1) return { q: T.q1(`(${neg(a)}, ${neg(b)})`, lineTxt(A, B, C)), kind: "fields", fields: [{ label: T.f1, ans: dist }],
      sol: T.s1(num, `${sqc("x", a)} + ${sqc("y", b)} = ${dist * dist}`, dist) };
    return { q: T.q0(lineTxt(A, B, C), `(${neg(a)}, ${neg(b)})`, r), kind: "choice", opts: T.opts, correct: t, shuffle: false, sol: T.s0(num, dist, r, t) };
  }
  // tangentes desde P(x₀, y₀) a x² + y² = r²: (x₀² − r²)m² − 2x₀y₀m + y₀² − r² = 0, con x₀² + y₀² − r² = s²
  const C2 = [];
  for (let x0 = 1; x0 <= 9; x0++) for (let y0 = -4; y0 <= 4; y0++) for (let r = 2; r <= 6; r++) {
    const s2 = x0 * x0 + y0 * y0 - r * r, s = Math.sqrt(s2);
    if (s2 <= 0 || !Number.isInteger(s) || x0 === r) continue;
    const A2 = x0 * x0 - r * r, B2 = -2 * x0 * y0, D = B2 * B2 - 4 * A2 * (y0 * y0 - r * r), sq = Math.sqrt(D);
    const m1 = F.make(-B2 + sq, 2 * A2), m2 = F.make(-B2 - sq, 2 * A2);
    if (Math.abs(m1[1]) > 12 || Math.abs(m2[1]) > 12) continue;
    C2.push([x0, y0, r, m1, m2, A2, B2]);
  }
  const [x0, y0, r, m1, m2, A2, B2] = R.pick(C2), C0 = y0 * y0 - r * r;
  const tg = m => lineTxtNorm(m[0], -m[1], m[1] * y0 - m[0] * x0);   // m x − y + (y₀ − m x₀) = 0, por m[1]
  const ok = `${tg(m1)} ; ${tg(m2)}`;
  const swapRoles = m => lineTxtNorm(m[0], -m[1], m[1] * x0 - m[0] * y0);
  const opts0 = [ok, `${tg(m1)} ; ${swapRoles(m2)}`, `${swapRoles(m1)} ; ${swapRoles(m2)}`, `${lineTxtNorm(m1[0], -m1[1], 0)} ; ${lineTxtNorm(m2[0], -m2[1], 0)}`];
  const opts = R.shuffle([...new Set(opts0)]);
  if (opts.length < 3) return null;
  const quad = `${A2 === 1 ? "" : A2 === -1 ? "−" : neg(A2)}m²${sg(B2, "m")}${sg(C0, "")} = 0`, mt = m => `${m[0] < 0 ? "−" : ""}${Math.abs(m[0])}${m[1] === 1 ? "" : "/" + m[1]}`;
  return { q: T.q2(`(${x0}, ${neg(y0)})`, r * r), kind: "choice", opts, correct: opts.indexOf(ok),
    sol: T.s2(`y ${y0 < 0 ? "+" : "−"} ${Math.abs(y0)} = m(x − ${x0})`.replace("y − 0", "y").replace("y + 0", "y"), `|${neg(y0)} − ${x0 === 1 ? "" : x0}m| / √(m² + 1) = ${r}`, quad, mt(m1), mt(m2), ok) };
});
function lineTxtNorm(A, B, C) {   // entre el m.c.d. y con A > 0
  const g = (u, v) => { u = Math.abs(u); v = Math.abs(v); while (v) [u, v] = [v, u % v]; return u; };
  const d = g(g(A, B), C) || 1, s = A < 0 || (A === 0 && B < 0) ? -1 : 1;
  return lineTxt(s * A / d, s * B / d, s * C / d);
}
const ELL = [[5, 3, 4], [5, 4, 3], [10, 6, 8], [10, 8, 6], [13, 5, 12], [13, 12, 5], [17, 8, 15], [3, 2, Math.sqrt(5)], [4, 2, Math.sqrt(12)], [6, 3, Math.sqrt(27)]];
def("m11.co.elipse", (R, S, H) => {
  const t = R.r();
  if (t < 0.4) {   // los focos, también de elipses verticales
    const [a, b, c] = R.pick(ELL.filter(x => Number.isInteger(x[2]))), vert = R.r() < 0.5;
    const e = vert ? `x²/${b * b} + y²/${a * a} = 1` : `x²/${a * a} + y²/${b * b} = 1`;
    const ok = vert ? `(0, ±${c})` : `(±${c}, 0)`, opts = R.shuffle([ok, vert ? `(±${c}, 0)` : `(0, ±${c})`, vert ? `(0, ±${a})` : `(±${a}, 0)`, vert ? `(0, ±${b})` : `(±${b}, 0)`].filter((v, i, A) => A.indexOf(v) === i));
    return { q: S.m11.co_fo_q(e), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.co_fo_s(a * a, vert ? "y²" : "x²", a, b, c, ok) };
  }
  if (t < 0.6) {   // escribir la ecuación a partir de los focos y el semieje mayor
    const [a, b, c] = R.pick(ELL.filter(x => Number.isInteger(x[2]))), vert = R.r() < 0.4;
    const ok = vert ? `x²/${b * b} + y²/${a * a} = 1` : `x²/${a * a} + y²/${b * b} = 1`;
    const opts = R.shuffle([ok, vert ? `x²/${a * a} + y²/${b * b} = 1` : `x²/${b * b} + y²/${a * a} = 1`, vert ? `x²/${c * c} + y²/${a * a} = 1` : `x²/${a * a} + y²/${c * c} = 1`, vert ? `x²/${b} + y²/${a} = 1` : `x²/${a} + y²/${b} = 1`]);
    return { q: S.m11.co_ee_q(vert ? `(0, ±${c})` : `(±${c}, 0)`, a), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.co_ee_s(a, c, b * b, vert, ok) };
  }
  const [a, b, c] = R.pick(ELL), vertical = R.r() < 0.3;
  const e = vertical ? `x²/${b * b} + y²/${a * a} = 1` : `x²/${a * a} + y²/${b * b} = 1`;
  if (R.r() < 0.6) return { q: S.m11.co_el_q(e), kind: "fields", fields: [{ label: "a", kind: "num", ans: a }, { label: "b", kind: "num", ans: b }, { label: "c", kind: "num", ans: rd(c, 2), tol: 0.011 }],
    sol: S.m11.co_el_s(a, b, Number.isInteger(c) ? c : `${sqrtTxt(a * a - b * b)} ≈ ${f2(c)}`) };
  const ex = rd(c / a, 2), exact = Number.isInteger(c) && Number.isInteger(c * 100 / a);
  return { q: S.m11.co_ex_q(e), kind: "num", ans: ex, tol: 0.006, sol: S.m11.co_ex_s(Number.isInteger(c) ? c : sqrtTxt(a * a - b * b), a, f2(ex), exact) };
});
const HYP = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [12, 5, 13], [8, 6, 10], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [2, 1, Math.sqrt(5)], [1, 2, Math.sqrt(5)], [3, 2, Math.sqrt(13)], [1, 3, Math.sqrt(10)]];
def("m11.co.hiperbola", (R, S, H) => {
  const [a, b, c] = R.pick(HYP), vert = R.r() < 0.4, m = vert ? F.make(a, b) : F.make(b, a);   // vertical: y²/a² − x²/b² = 1, asíntotas y = ±(a/b)x
  const e = vert ? `${sq2("y", a * a)} − ${sq2("x", b * b)} = 1` : `${sq2("x", a * a)} − ${sq2("y", b * b)} = 1`;
  if (!vert && R.r() < 0.3) {   // escribir la ecuación a partir de vértices y focos
    const [a2, b2, c2] = R.pick(HYP.filter(x => Number.isInteger(x[2])));
    const ok = `${sq2("x", a2 * a2)} − ${sq2("y", b2 * b2)} = 1`;
    const opts = R.shuffle([ok, `${sq2("x", a2 * a2)} + ${sq2("y", b2 * b2)} = 1`, `${sq2("x", a2 * a2)} − ${sq2("y", c2 * c2)} = 1`, `${sq2("y", a2 * a2)} − ${sq2("x", b2 * b2)} = 1`]);
    return { q: S.m11.co_he_q(a2, c2), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m11.co_he_s(a2, c2, b2 * b2, ok) };
  }
  return { q: S.m11.co_hi_q(e), kind: "fields", fields: [{ label: S.m11.co_hi_f[0], kind: "num", ans: rd(c, 2), tol: 0.011 }, { label: S.m11.co_hi_f[1], kind: "frac", ans: m }],
    sol: S.m11.co_hi_s(a, b, Number.isInteger(c) ? c : `√${a * a + b * b} ≈ ${f2(c)}`, F.html(m, H), vert) };
});
def("m11.co.parabola", (R, S, H) => {
  // El convenio de la lección: y² = 2px, con foco (p/2, 0) y directriz x = −p/2 (o x² = 2py)
  const q2 = rnz(R, -6, 6) * 2, p = q2 / 2, k = R.int(0, 1), h = R.r() < 0.3 ? rnz(R, -4, 4) : 0, kk = h ? R.int(-4, 4) : 0;   // 30 %: vértice desplazado
  const pd = v => v < 0 ? `(${H.dec(v)})` : H.dec(v);
  const dx = (v, c) => c ? `(${v} ${c < 0 ? "+" : "−"} ${Math.abs(c)})` : v;
  const pt = (x, y) => `(${H.dec(x)}${Number.isInteger(x) && Number.isInteger(y) ? ", " : "; "}${H.dec(y)})`;
  if (k === 0) {
    const fx = h + p / 2, fy = kk;
    return { q: S.m11.co_pa_q(`${dx("y", kk)}² = ${neg(q2)}${dx("x", h)}`), kind: "fields", fields: [{ label: S.m11.co_pa_f[0], kind: "num", ans: fx }, { label: S.m11.co_pa_f[1], kind: "num", ans: fy }],
      sol: S.m11.co_pa_s(`${neg(q2)} = 2 · ${pd(p)}`, H.dec(p), pt(h, kk), "x", pt(fx, fy), `x = ${H.dec(h - p / 2)}`, p > 0 ? "derecha" : "izquierda", !!h) };
  }
  const fx = h, fy = kk + p / 2;
  return { q: S.m11.co_pa_q(`${dx("x", h)}² = ${neg(q2)}${dx("y", kk)}`), kind: "fields", fields: [{ label: S.m11.co_pa_f[0], kind: "num", ans: fx }, { label: S.m11.co_pa_f[1], kind: "num", ans: fy }],
    sol: S.m11.co_pa_s(`${neg(q2)} = 2 · ${pd(p)}`, H.dec(p), pt(h, kk), "y", pt(fx, fy), `y = ${H.dec(kk - p / 2)}`, p > 0 ? "arriba" : "abajo", !!h) };
});
def("m11.co.tipo", (R, S, H) => {
  const k = R.int(0, 3), a = R.int(1, 6), b = R.int(1, 6), c = R.int(1, 30);
  let e;
  if (k === 0) e = `${co1(a)}x² + ${co1(a)}y² = ${c * a}`;
  else if (k === 1) e = `${co1(a)}x² + ${a + b}y² = ${c}`;
  else if (k === 2) e = R.r() < 0.5 ? `${co1(a)}x² − ${co1(b)}y² = ${c}` : `${co1(b)}y² − ${co1(a)}x² = ${c}`;
  else e = R.r() < 0.5 ? `y² = ${a * 2}x` : `y = ${co1(a)}x²${sg(-b, "x")}${sg(c, "")}`;
  const A = a, Cc = k === 0 ? a : k === 1 ? a + b : -b, D = rnz(R, -8, 8), E = rnz(R, -8, 8), Fc = R.int(-20, 20);
  const rhs = D * D / (4 * A) + E * E / (4 * Cc) - Fc;   // A(x − h)² + C(y − k)² = rhs: tiene que haber puntos
  if (k < 3 && R.r() < 0.3 && (k === 2 ? Math.abs(rhs) > 1e-9 : rhs > 0)) {   // en forma general, con términos en x e y: se mira solo x² e y²
    e = `${co1(A)}x²${Cc < 0 ? ` − ${co1(-Cc)}y²` : ` + ${co1(Cc)}y²`}${sg(D, "x")}${sg(E, "y")}${sg(Fc, "")} = 0`;
    return { q: S.m11.co_tipo_q(e), kind: "choice", opts: S.m11.co_tipos, correct: k, shuffle: false, sol: S.m11.co_tipo_g + S.m11.co_tipo_s[k] };
  }
  return { q: S.m11.co_tipo_q(e), kind: "choice", opts: S.m11.co_tipos, correct: k, shuffle: false, sol: S.m11.co_tipo_s[k] };
});
})();
