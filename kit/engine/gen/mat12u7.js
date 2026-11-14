/* WikiAula — Matemáticas, Grado 12 · Unidades 7–11: Límites y continuidad,
   Derivadas, Integrales indefinidas, Integral definida y Probabilidad.
   Textos: i18n/<lang>/mat12u7.js (S.m12). Fórmulas en LaTeX ($…$, KaTeX). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F, polyText } = WA.MATH;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
const $ = s => `$${s}$`;
// Polinomio en LaTeX: [3, 0, -2] → 3x^{2} - 2
function ptex(cs, v = "x") {
  const deg = cs.length - 1;
  let s = "";
  cs.forEach((c, i) => {
    if (!c) return;
    const e = deg - i, a = Math.abs(c), co = e && a === 1 ? "" : String(a), t = co + (e === 0 ? "" : e === 1 ? v : `${v}^{${e}}`);
    s += s ? (c < 0 ? " - " : " + ") + t : (c < 0 ? "-" : "") + t;
  });
  return s || "0";
}
const ftex = f => f[1] === 1 ? String(f[0]) : `${f[0] < 0 ? "-" : ""}\\frac{${Math.abs(f[0])}}{${f[1]}}`;
const fnum = f => `(${f[0]})/(${f[1]})`;
const fco = f => f[1] === 1 && Math.abs(f[0]) === 1 ? (f[0] < 0 ? "-" : "") : ftex(f);   // coeficiente delante de una función   // fracción para el campo ans de "expr"

// ═════ Unidad 7 · Límites y continuidad ═════
const dc2 = x => String(rd(x, 2)).replace(".", WA.H.ds).replace("-", "−");
// Bolzano: elegir el intervalo (polinomios o ecuaciones trascendentes, con los valores de f en los extremos de
// todas las opciones) o calcular f(a) y f(b) tras pasar la ecuación a la forma f(x) = 0
const BZ = [   // [f en LaTeX, f, ecuación, continuidad, candidatos]
  R => { const k = R.int(1, 3), m = R.int(4, 12); return [`e^{x} ${k === 1 ? "+ x" : `+ ${k}x`} - ${m}`, x => Math.exp(x) + k * x - m, `e^{x} = ${m} ${k === 1 ? "- x" : `- ${k}x`}`, 0, [-1, 0, 1, 2, 3]]; },
  R => { const m = R.int(3, 7); return [`\\ln x + x - ${m}`, x => Math.log(x) + x - m, `\\ln x = ${m} - x`, 1, [1, 2, 3, 4, 5, 6]]; },
];
def("m12.lc.bolzano", (R, S) => {
  const t = R.r();
  if (t < 0.3) {   // tipo PAU: pasar la ecuación a f(x) = 0 y calcular f(a), f(b)
    const v = R.int(0, 2);
    const T = [() => { const k = R.int(1, 3), m = R.int(2, 3); return [`e^{x} = ${m} ${k === 1 ? "- x" : `- ${k}x`}`, `f(x) = e^{x} ${k === 1 ? "+ x" : `+ ${k}x`} - ${m}`, x => Math.exp(x) + k * x - m, 0, 1, 0]; },
      () => { const m = R.int(2, 6); return [`\\ln x = ${m} - x`, `f(x) = \\ln x + x - ${m}`, x => Math.log(x) + x - m, 1, m, 1]; },
      () => { const k = R.int(1, 2); return [`\\cos x = ${k === 1 ? "" : k}x`, `f(x) = \\cos x - ${k === 1 ? "" : k}x`, x => Math.cos(x) - k * x, 0, 1, 2]; }][v]();
    const [eq, fx, f, a, b, why] = T, fa = rd(f(a), 2), fb = rd(f(b), 2);
    return { q: S.m12.lc_bz2_q($(eq), a, b), kind: "fields", fields: [{ label: `f(${a})`, kind: "num", ans: fa, tol: 0.011 }, { label: `f(${b})`, kind: "num", ans: fb, tol: 0.011 }],
      sol: S.m12.lc_bz2_s($(eq), $(fx), S.m12.lc_bz_why[why], a, dc2(fa), b, dc2(fb)) };
  }
  for (;;) {
    let fl, f, eq = null, why = 3, cand;
    if (t < 0.65) { const cs = [1, R.int(-3, 3), R.int(-6, 6), R.int(-9, 9)]; fl = ptex(cs); f = x => ev(cs, x); cand = [-4, -3, -2, -1, 0, 1, 2, 3, 4]; }
    else { [fl, f, eq, why, cand] = R.pick(BZ)(R); }
    const iv = [];
    for (let i = 0; i + 1 < cand.length; i++) { const a = cand[i], b = a + 1; iv.push([a, b, Math.sign(f(a)) * Math.sign(f(b)) < 0]); }
    const yes = iv.filter(x => x[2]), no = iv.filter(x => !x[2] && Math.abs(f(x[0])) > 0.005 && Math.abs(f(x[1])) > 0.005);
    if (yes.length !== 1 || no.length < 3) continue;
    const opts4 = R.shuffle([yes[0], ...R.shuffle(no).slice(0, 3)]), ok = opts4.indexOf(yes[0]);
    const [a, b] = yes[0], val = x => Number.isInteger(f(x)) ? neg(f(x)) : `≈ ${dc2(f(x))}`.replace("≈ ", "≈ ");
    const vals = [...new Set(opts4.flatMap(([p, q]) => [p, q]))].sort((x, y) => x - y).map(x => `f(${neg(x)}) ${Number.isInteger(f(x)) ? "= " + neg(f(x)) : "≈ " + dc2(f(x))}`).join(", ");
    return { q: eq ? S.m12.lc_bz_qe($(eq), $(`f(x) = ${fl}`)) : S.m12.lc_bz_q($(`f(x) = ${fl}`)), kind: "choice", opts: opts4.map(([a, b]) => `(${neg(a)}, ${neg(b)})`), correct: ok, shuffle: false,
      sol: S.m12.lc_bz_s(S.m12.lc_bz_why[why], neg(a), neg(b), vals) };
  }
});
const pn = n => n < 0 ? `(${neg(n)})` : String(n);   // negativo entre paréntesis
// Límites de 2.º: Ruffini de grado 3, k/0 con laterales, x → −∞ con raíces, ∞ − ∞ con raíces y 1^∞ con x → 0
def("m12.lc.limite", (R, S) => {
  const t = R.int(0, 4);
  if (t === 0) {   // (x − a)(x² + px + q) / ((x − a)(x + r))
    let a, p, q, r;
    do { a = rnz(R, -3, 3); p = R.int(-3, 3); q = R.int(-5, 5); r = R.int(-4, 4); } while (a + r === 0 || a * a + p * a + q === 0 || r * r - p * r + q === 0);
    const N = [1, p - a, q - a * p, -a * q], Dn = [1, r - a, -a * r], v = F.make(a * a + p * a + q, a + r);
    // Ruffini con a: se baja el 1; 1·a + (p − a) = p; p·a + (q − ap) = q; q·a − aq = 0
    const rf = S.m12.lc_rf(neg(a), N.map(neg).join("  ") + (N.includes(0) ? S.m12.lc_rf0 : ""), `${neg(a)}·1 + ${pn(N[1])} = ${neg(p)}`, `${neg(a)}·${pn(p)} + ${pn(N[2])} = ${neg(q)}`, `${neg(a)}·${pn(q)} + ${pn(N[3])} = 0`);
    return { q: S.m12.lc_lim_q($(`\\lim_{x \\to ${a}} \\frac{${ptex(N)}}{${ptex(Dn)}}`)), kind: "frac", ans: v,
      sol: S.m12.lc_ru_s(neg(a), rf, $(ptex([1, p, q])), $(`${ptex(Dn)} = (x ${a < 0 ? "+" : "-"} ${Math.abs(a)})${r ? `(${ptex([1, r])})` : "\\,x"}`), $(`\\lim_{x \\to ${a}} \\frac{${ptex([1, p, q])}}{${ptex([1, r])}} = \\frac{${a * a + p * a + q}}{${a + r}}`), $(ftex(v))) };
  }
  if (t === 1) {   // k/0: (x + c)/(x − a) o (x + c)/(x − a)²
    const a = R.int(-3, 3); let c; do c = R.int(-4, 4); while (a + c === 0);
    const sq = R.r() < 0.35, k = a + c, O = S.m12.lc_lat_o;
    const left = sq ? Math.sign(k) : -Math.sign(k), right = Math.sign(k);
    const idx = (left > 0 ? 0 : 2) + (right > 0 ? 0 : 1);   // 0: +∞ y +∞ · 1: +∞ y −∞ · 2: −∞ y +∞ · 3: −∞ y −∞
    const den = sq ? (a ? `(${ptex([1, -a])})^{2}` : "x^{2}") : ptex([1, -a]);
    return { q: S.m12.lc_lat_q($(`f(x) = \\frac{${ptex([1, c])}}{${den}}`), neg(a)), kind: "choice", opts: O, correct: idx, shuffle: false,
      sol: S.m12.lc_lat_s(a ? `x ${a < 0 ? "+" : "−"} ${Math.abs(a)}` : "x", neg(a), neg(k), sq) + O[idx] + "." };
  }
  if (t === 2) {   // √(k²x² + b)/(cx + d) cuando x → ±∞
    const k = R.int(1, 4), b = R.int(1, 9), c = rnz(R, -4, 4), d = R.int(-5, 5), minus = R.r() < 0.6, v = F.make(minus ? -k : k, c);
    return { q: S.m12.lc_lim_q($(`\\lim_{x \\to ${minus ? "-" : "+"}\\infty} \\frac{\\sqrt{${k * k === 1 ? "" : k * k}x^{2} + ${b}}}{${ptex([c, d])}}`)), kind: "frac", ans: v,
      sol: S.m12.lc_rt_s(minus, k * k, b, neg(c), d ? `${neg(c)} ${d < 0 ? "−" : "+"} ${Math.abs(d)}/x` : neg(c), $(ftex(v))) };
  }
  if (t === 3) {   // √(x² + bx) − x cuando x → +∞
    const b = rnz(R, -6, 6), v = F.make(b, 2);
    return { q: S.m12.lc_lim_q($(`\\lim_{x \\to +\\infty} \\left(\\sqrt{x^{2} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x} - x\\right)`)), kind: "frac", ans: v,
      sol: S.m12.lc_cj_s(b < 0 ? `− ${Math.abs(b) === 1 ? "" : Math.abs(b)}x` : `+ ${b === 1 ? "" : b}x`, neg(b), $(ftex(v)), b === 1 ? "x" : b === -1 ? "−x" : `${neg(b)}x`, `${b < 0 ? "−" : "+"} ${Math.abs(b)}/x`) };
  }
  // 1^∞: (1 + kx)^{m/x} cuando x → 0, o ((x + a)/(x + b))^{cx} cuando x → ∞; se pide L con e^L
  if (R.r() < 0.5) {
    const k = rnz(R, -4, 4), m = rnz(R, -3, 3);
    return { q: S.m12.lc_e_q($(`\\lim_{x \\to 0} (1 ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}x)^{${m}/x}`)), kind: "int", ans: k * m,
      sol: S.m12.lc_e_s(`${neg(m)}/x · (1 ${k < 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}x − 1) = ${neg(m)}/x · ${k === 1 ? "" : k === -1 ? "(−" : pn(k).replace(")", "")}x${k === -1 || k < -1 ? ")" : ""} = ${neg(k * m)}`, neg(k * m)) };
  }
  let a, b; do { a = R.int(-4, 4); b = R.int(-4, 4); } while (a === b);
  const c = rnz(R, -3, 3), xa = v => v ? `x ${v < 0 ? "-" : "+"} ${Math.abs(v)}` : "x", xt = v => xa(v).replace("-", "−");
  return { q: S.m12.lc_e_q($(`\\lim_{x \\to +\\infty} \\left(\\frac{${xa(a)}}{${xa(b)}}\\right)^{${c === 1 ? "" : c === -1 ? "-" : c}x}`)), kind: "int", ans: c * (a - b),
    sol: S.m12.lc_e_s(`${c === 1 ? "" : c === -1 ? "−" : neg(c)}x · ((${xt(a)})/(${xt(b)}) − 1) = ${c === 1 ? "" : c === -1 ? "−" : neg(c)}x · ${neg(a - b)}/(${xt(b)}) → ${neg(c * (a - b))}`, neg(c * (a - b))) };
});
// Asíntotas de funciones que no son polinomios: exponenciales, oblicuas con m y n, raíces con x → −∞
def("m12.lc.asintota", (R, S) => {
  const t = R.int(0, 2);
  if (t === 0) {   // (a eˣ + b)/(eˣ + c): y = a en +∞; y = b/c en −∞
    const c = R.int(1, 4), a = rnz(R, -5, 5), b = c * R.int(-3, 3);
    const num = `${a === 1 ? "" : a === -1 ? "-" : a}e^{x}${b ? ` ${b < 0 ? "-" : "+"} ${Math.abs(b)}` : ""}`;
    return { q: S.m12.lc_as_eq($(`f(x) = \\frac{${num}}{e^{x} + ${c}}`)), kind: "fields", fields: [{ label: "y (x → +∞)", ans: a }, { label: "y (x → −∞)", ans: b / c }],
      sol: S.m12.lc_as_es(neg(a), neg(b), c, neg(b / c)) };
  }
  if (t === 1) {   // (x² + px + q)/(x − d): y = x + (p + d)
    let p, q, d; do { p = R.int(-4, 4); q = R.int(-6, 6); d = rnz(R, -3, 3); } while (d * d + p * d + q === 0);
    const n = p + d, rest = d * d + p * d + q;
    return { q: S.m12.lc_as_oq($(`f(x) = \\frac{${ptex([1, p, q])}}{${ptex([1, -d])}}`)), kind: "fields", fields: [{ label: "m", ans: 1 }, { label: "n", ans: n }],
      sol: S.m12.lc_as_os($(`m = \\lim \\frac{f(x)}{x} = \\lim \\frac{${ptex([1, p, q])}}{${ptex([1, -d, 0])}} = 1`), $(`n = \\lim (f(x) - x) = \\lim \\frac{${ptex([n, q])}}{${ptex([1, -d])}} = ${n}`), $(`y = ${ptex([1, n])}`), $(`${ptex([1, p, q])} = (${ptex([1, -d])})(${ptex([1, n])}) ${rest < 0 ? "-" : "+"} ${Math.abs(rest)}`), $(ptex([1, -d]))) };
  }
  // √(x² + bx) cuando x → +∞ (y = x + b/2) o x → −∞ (y = −x − b/2), con b par
  const b = 2 * rnz(R, -3, 3), minus = R.r() < 0.6, m = minus ? -1 : 1, n = minus ? -b / 2 : b / 2;
  return { q: S.m12.lc_as_rq($(`f(x) = \\sqrt{x^{2} ${b < 0 ? "-" : "+"} ${Math.abs(b)}x}`), minus ? "−∞" : "+∞"), kind: "fields", fields: [{ label: "m", ans: m }, { label: "n", ans: n }],
    sol: S.m12.lc_as_rs(minus, b < 0 ? `− ${Math.abs(b)}x` : `+ ${b}x`, neg(b), m, neg(n)) };
});
def("m12.lc.continua", (R, S) => {
  if (R.r() < 0.4) {   // con exponencial y logaritmo: e^{x−p} + a si x ≤ p; ln(x − p + 1) + k si x > p (o a·e^{x−p} y k + ln)
    const p = R.int(-2, 3), k = R.int(-5, 5), mult = R.r() < 0.4, a = mult ? k : k - 1;
    if (mult && !k) return null;
    const xp = p ? `x ${p < 0 ? "+" : "-"} ${Math.abs(p)}` : "x", arg = p === 1 ? "x" : `x ${1 - p < 0 ? "-" : "+"} ${Math.abs(1 - p)}`;
    const left = mult ? `a\\,e^{${xp}}` : `e^{${xp}} + a`;
    const f = `f(x) = \\begin{cases} ${left} & x \\le ${p} \\\\ \\ln(${arg})${k ? ` ${k < 0 ? "-" : "+"} ${Math.abs(k)}` : ""} & x > ${p} \\end{cases}`;
    return { q: S.m12.lc_ct1_q($(f)), kind: "int", ans: a, sol: S.m12.lc_ct1_s(neg(p), mult, neg(k), neg(a), arg.replace("-", "−")) };
  }
  // p y q distintos de 0: con q = 0 la condición en q (b·0 = 0) no fija b (infinitas soluciones), y con p = 0, a = 0 siempre
  let p, q; do { p = R.int(-2, 1); q = p + R.int(1, 2); } while (p === 0 || q === 0);
  const b = rnz(R, -3, 3), K = b * q * q, a = b * p * p - p;
  const f = `f(x) = \\begin{cases} x + a & x < ${p} \\\\ b\\,x^{2} & ${p} \\le x < ${q} \\\\ ${K} & x \\ge ${q} \\end{cases}`;
  const kb = (k) => k === 1 ? "b" : `${k}b`;
  return { q: S.m12.lc_ct_q($(f)), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }],
    sol: S.m12.lc_ct_s(neg(q), pn(q), kb(q * q), q * q === 1, neg(K), neg(b), neg(p), pn(p), pn(b), p * p, neg(b * p * p), neg(a)) };
});

// ═════ Unidad 8 · Derivadas ═════
def("m12.dv.derivable", (R, S) => {
  const t = R.r();
  if (t < 0.25) {   // con exponencial: a·e^{kx} si x ≤ 0; x² + bx + c₀ si x > 0 → a = c₀, b = k·c₀
    const k = R.pick([1, 2, 3, -1, -2]), c0 = rnz(R, -5, 5), a = c0, b = k * c0;
    const ek = k === 1 ? "x" : k === -1 ? "-x" : `${k}x`;
    const f = `f(x) = \\begin{cases} a\\,e^{${ek}} & x \\le 0 \\\\ x^{2} + bx ${c0 < 0 ? "-" : "+"} ${Math.abs(c0)} & x > 0 \\end{cases}`;
    return { q: S.m12.dv_der_q($(f)), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }],
      sol: S.m12.dv_derexp_s(neg(c0), ek.replace("-", "−"), k === 1 ? "" : k === -1 ? "−" : neg(k), k === 1 ? "a" : k === -1 ? "−a" : `${neg(k)}a`, k === 1 ? "b = a" : `b = ${neg(k)}·${pn(c0)}`, neg(b)) };
  }
  if (t < 0.4) {   // ¿derivable? con valores absolutos
    const k = R.int(1, 4), v = R.int(0, 2);
    const f = [`|x^{2} - ${k * k}|`, `(x - ${k})\\,|x - ${k}|`, `|x^{2} - ${k * k}|`][v], x0 = v === 2 ? 0 : k;
    return { q: S.m12.dv_abs_q($(`f(x) = ${f}`), x0), kind: "choice", opts: S.m12.yesno, correct: v === 0 ? 1 : 0, shuffle: false, sol: S.m12.dv_abs_s[v](k, k * k, 2 * k) };
  }
  const c = rnz(R, -2, 2), k = R.int(-5, 5), b = 2 * c, a = c * c + k;   // c ≠ 0: con c = 0 quedaba «0·0 + k»
  const kt = k ? ` ${k < 0 ? "-" : "+"} ${Math.abs(k)}` : "", kx = k ? ` ${k < 0 ? "−" : "+"} ${Math.abs(k)}` : "";
  const f = `f(x) = \\begin{cases} x^{2} + a & x \\le ${c} \\\\ b\\,x${kt} & x > ${c} \\end{cases}`;
  // en el orden de la lección: primero la continuidad, después la derivabilidad
  return { q: S.m12.dv_der_q($(f)), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }],
    sol: S.m12.dv_der_s(neg(c), pn(c), c * c, kx, neg(b), `${pn(b)}·${pn(c)}${kx}`, neg(b * c + k), neg(a)) };
});
// Valor medio y Rolle. Parábolas (c es el punto medio o el vértice), cúbicas x³ + px en [0, b] (c = b/√3) y √x en [m², n²]
def("m12.dv.valormedio", (R, S) => {
  const u = R.r();
  if (u < 0.2) {   // tipo PAU: a trozos con parámetros que cumpla Rolle en [0, L]: x² + ax si x ≤ p; bx + c si x > p
    const [p, L] = R.pick([[1, 2], [1, 3], [1, 4], [2, 3], [2, 5], [3, 4], [2, 4], [3, 5]]);
    const a = F.make(p * (p - 2 * L), L), b = F.make(p * p, L), c = F.mul(b, F.make(-L, 1)), x0 = F.make(p * (2 * L - p), 2 * L);
    return { q: S.m12.dv_rp_q($(`f(x) = \\begin{cases} x^{2} + ax & x \\le ${p} \\\\ bx + c & x > ${p} \\end{cases}`), p, L), kind: "fields",
      fields: [{ label: "a", kind: "frac", ans: a }, { label: "b", kind: "frac", ans: b }, { label: "c", kind: "frac", ans: c }],
      sol: S.m12.dv_rp_s(p, L, p * p, 2 * p, $(ftex(a)), $(ftex(b)), $(ftex(c)), $(ftex(x0))) };
  }
  if (u < 0.32) {   // ¿qué hipótesis de Rolle falla?
    const k = R.int(-2, 3), h = R.int(1, 3), v = R.int(0, 3), O = S.m12.dv_hip_o;
    const xk = k ? `x ${k < 0 ? "+" : "-"} ${Math.abs(k)}` : "x";
    const s = 2 * k + h, sx = s === 0 ? "" : ` ${s > 0 ? "-" : "+"} ${Math.abs(s) === 1 ? "" : Math.abs(s)}x`;
    const [f, I, ok] = [[`|${xk}|`, [k - h, k + h], 1], [`\\frac{1}{(${xk})^{2}}`, [k - h, k + h], 0], [`x^{2}`, [Math.abs(k), Math.abs(k) + h], 2], [`x^{2}${sx}`, [k, k + h], 3]][v];
    return { q: S.m12.dv_hip_q($(`f(x) = ${f}`), neg(I[0]), neg(I[1])), kind: "choice", opts: O, correct: ok, shuffle: false,
      sol: S.m12.dv_hip_s[v](neg(k), neg(I[0]), neg(I[1]), neg(I[0] ** 2), neg(I[1] ** 2), neg(-k * k - h * k), $(`f'(x) = 2x${sx.replace("x", "")}`)) };
  }
  if (u < 0.42) {   // ¿cuántas soluciones? x³ − 3m²x + q: Bolzano + Rolle
    const m = R.int(1, 2), M = 2 * m ** 3; let q; do q = R.int(-M - 6, M + 6); while (Math.abs(q) === M || q === 0);
    const three = Math.abs(q) < M, fa = M + q, fb = -M + q;
    return { q: S.m12.dv_nsol_q($(`x^{3} - ${3 * m * m}x ${q < 0 ? "-" : "+"} ${Math.abs(q)} = 0`)), kind: "int", ans: three ? 3 : 1,
      sol: S.m12.dv_nsol_s(3 * m * m, m, neg(-m), neg(fa), neg(m), neg(fb), three) };
  }
  const t = R.r(), dc = x => String(x).replace(".", WA.H.ds).replace("-", "−");
  if (t < 0.3) {   // Rolle con una parábola
    const p = rnz(R, -3, 3), r = R.int(-5, 5), v = R.int(-3, 3), qq = -2 * p * v, h = R.int(1, 3);
    return { q: S.m12.dv_rolle_q($(`f(x) = ${ptex([p, qq, r])}`), neg(v - h), neg(v + h)), kind: "num", ans: v,
      sol: S.m12.dv_rolle_s(neg(v - h), neg(v + h), $(`f'(x) = ${ptex([2 * p, qq])}`), $(`${ptex([2 * p, qq], "c")} = 0`), neg(v)) };
  }
  if (t < 0.55) {   // valor medio con una parábola
    const p = rnz(R, -3, 3), q = R.int(-5, 5), r = R.int(-5, 5), a = R.int(-4, 3), b = a + R.int(1, 4) * 2, c = (a + b) / 2;
    const fa = ev([p, q, r], a), fb = ev([p, q, r], b), m = (fb - fa) / (b - a);
    return { q: S.m12.dv_tvm_q($(`f(x) = ${ptex([p, q, r])}`), neg(a), neg(b)), kind: "num", ans: c,
      sol: S.m12.dv_tvm_s(neg(a), neg(b), `(${neg(fb)} − ${pn(fa)})/(${neg(b)} − ${pn(a)})`, neg(m), $(`f'(x) = ${ptex([2 * p, q])}`), $(`${ptex([2 * p, q], "c")} = ${m < 0 ? "-" + -m : m}`), dc(c), S.m12.dv_tvm_par) };
  }
  if (t < 0.8) {   // cúbica x³ + px en [0, b]: 3c² + p = b² + p → c = b/√3
    const p = R.int(-3, 3), b = R.int(1, 4), c = rd(b / Math.sqrt(3), 2), cs = [1, 0, p, 0];
    return { q: S.m12.dv_tvm_q($(`f(x) = ${ptex(cs)}`), "0", String(b)) + S.m12.dv_dec, kind: "num", ans: c, tol: 0.011,
      sol: S.m12.dv_tvm_s("0", String(b), `(${neg(ev(cs, b))} − 0)/(${b} − 0)`, neg(b * b + p), $(`f'(x) = ${ptex([3, 0, p])}`), $(`3c^{2}${p ? (p < 0 ? " - " : " + ") + Math.abs(p) : ""} = ${b * b + p} \\;\\Rightarrow\\; c^{2} = \\frac{${b * b}}{3}`), dc(c), S.m12.dv_tvm_cub(b, dc(c))) };
  }
  // √x en [m², n²]: (n − m)/(n² − m²) = 1/(n + m) = 1/(2√c) → c = ((n + m)/2)²
  const m0 = R.int(0, 3), n0 = m0 + R.int(1, 3), c = ((m0 + n0) / 2) ** 2;
  return { q: S.m12.dv_tvm_q($("f(x) = \\sqrt{x}"), String(m0 * m0), String(n0 * n0)) + S.m12.dv_dec, kind: "num", ans: c, tol: 0.011,
    sol: S.m12.dv_tvm_raiz(String(m0 * m0), String(n0 * n0), `(${n0} − ${m0})/(${n0 * n0} − ${m0 * m0})`, `1/${m0 + n0}`, dc((m0 + n0) / 2), dc(c)) };
});
const bx = b => b === 1 ? "x" : `${b}x`;
const ax = a => a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;          // LaTeX
const axT = a => a === 1 ? "x" : a === -1 ? "−x" : `${neg(a)}x`;     // texto
const coefT = a => a === 1 ? "" : a === -1 ? "−" : `${neg(a)}·`;
const fracT = (n, d) => d === 1 ? neg(n) : `${neg(n)}/${d}`;
// L'Hôpital: cada plantilla da el límite (LaTeX), el valor y los pasos de la solución con los números del enunciado
const LH = [
  (R) => { const a = rnz(R, -5, 5), b = R.int(1, 6), arg = Math.abs(a) === 1 ? (a === 1 ? " x" : "(-x)") : `(${a}x)`;
    return { e: `\\lim_{x \\to 0} \\frac{\\operatorname{sen}${arg}}{${bx(b)}}`, v: F.make(a, b), s: 0, args: [`${coefT(a)}cos(${axT(a)})`, String(b), fracT(a, b)] }; },
  (R) => { const a = rnz(R, -4, 4), b = R.int(1, 6);
    return { e: `\\lim_{x \\to 0} \\frac{e^{${ax(a)}} - 1}{${bx(b)}}`, v: F.make(a, b), s: 1, args: [`${coefT(a)}e<sup>${axT(a)}</sup>`, String(b), fracT(a, b)] }; },
  (R) => { const a = R.int(1, 5), b = R.int(1, 6);
    return { e: `\\lim_{x \\to 0} \\frac{\\ln(1 + ${bx(a)})}{${bx(b)}}`, v: F.make(a, b), s: 2, args: [`${a}/(1 + ${axT(a)})`, String(b), fracT(a, b)] }; },
  (R) => { const a = R.int(1, 4), arg = a === 1 ? " x" : `(${a}x)`;
    return { e: `\\lim_{x \\to 0} \\frac{1 - \\cos${arg}}{x^{2}}`, v: F.make(a * a, 2), s: 3, args: [`${coefT(a)}sen(${axT(a)})`, `${a === 1 ? "" : a * a + "·"}cos(${axT(a)})`, fracT(a * a, 2)] }; },
  (R) => ({ e: "\\lim_{x \\to 0} \\frac{x - \\operatorname{sen} x}{x^{3}}", v: F.make(1, 6), s: 4, args: [] }),
  (R) => { const n = R.int(1, 4);
    // derivadas sucesivas del numerador: x³ → 3x² → 6x → 6
    const chain = []; let c = 1;
    for (let k = n; k >= 1; k--) { c *= k; const e = k - 1; chain.push(`${c === 1 && e ? "" : c}${e === 0 ? "" : e === 1 ? "x" : `x${["", "", "²", "³"][e]}`}/eˣ`); }
    return { e: `\\lim_{x \\to +\\infty} \\frac{${n === 1 ? "x" : `x^{${n}}`}}{e^{x}}`, v: F.make(0, 1), s: 5, args: [chain.join(" → "), n === 1 ? "una vez" : `${n} veces`] }; },
  (R) => { const a = R.int(2, 6);
    return { e: `\\lim_{x \\to ${a}} \\frac{x^{2} - ${a * a}}{\\ln(x - ${a - 1})}`, v: F.make(2 * a, 1), s: 6, args: [String(a - 1), String(a), String(2 * a)] }; },
];
def("m12.dv.lhopital", (R, S) => {
  const u = R.r();
  if (u < 0.45) {   // otras indeterminaciones (0·∞, ∞ − ∞, potencias) y el tipo PAU con un parámetro
    const v = R.int(0, 4);
    if (v === 0) { const k = R.int(1, 3), xk = k === 1 ? "x" : `x^{${k}}`;
      return { q: S.m12.dv_lh_q($(`\\lim_{x \\to 0^{+}} ${xk}\\ln x`)), kind: "frac", ans: F.make(0, 1), sol: S.m12.dv_lh2_s[0](k) }; }
    if (v === 1) return { q: S.m12.dv_lh_q($("\\lim_{x \\to 0} \\left(\\frac{1}{x} - \\frac{1}{e^{x} - 1}\\right)")), kind: "frac", ans: F.make(1, 2), sol: S.m12.dv_lh2_s[1]() };
    if (v === 2) { const a = R.int(1, 4), L = F.make(-a * a, 2), arg = a === 1 ? " x" : `(${a}x)`;
      return { q: S.m12.dv_lhe_q($(`\\lim_{x \\to 0} (\\cos${arg})^{1/x^{2}}`)), kind: "frac", ans: L, sol: S.m12.dv_lh2_s[2](a, a === 1 ? "x" : `${a}x`, a * a, $(ftex(L))) }; }
    // con parámetro: (e^{kx} + ax − 1)/x² → a = −k y vale k²/2; (ln(1 + kx) + ax)/x² → a = −k y vale −k²/2
    const k = R.int(1, 4), ex = v === 3, kx = k === 1 ? "x" : `${k}x`, askA = R.r() < 0.5;
    const e = ex ? `\\frac{e^{${kx}} + ax - 1}{x^{2}}` : `\\frac{\\ln(1 + ${kx}) + ax}{x^{2}}`, val = F.make(ex ? k * k : -k * k, 2);
    return { q: (askA ? S.m12.dv_lhp_qa : S.m12.dv_lhp_qv)($(`\\lim_{x \\to 0} ${e}`)), kind: askA ? "int" : "frac", ans: askA ? -k : val,
      sol: S.m12.dv_lhp_s(ex, k, kx.replace("x", "") || "1", $(ftex(val))) };
  }
  const t = R.pick(LH)(R), args = t.args.slice();
  // la última expresión de la cadena; si no está simplificada, se añade « = resultado»
  const last = t.s === 4 ? "1/6" : t.s === 5 ? "0" : args.pop(), vs = t.v[1] === 1 ? neg(t.v[0]) : `${neg(t.v[0])}/${t.v[1]}`;
  const end = last === vs ? `<b>${last}</b>` : `${last} = <b>${vs}</b>`;
  return { q: S.m12.dv_lh_q($(t.e)), kind: "frac", ans: t.v, sol: S.m12.dv_lh_s[t.s](...args, end) };
});
def("m12.dv.caja", (R, S) => {
  const t = R.int(0, 2), fl = [{ label: S.m12.dv_caja_f[0], kind: "num" }, { label: S.m12.dv_caja_f[1], kind: "num" }], fm = [{ label: S.m12.dv_dep_f[0], kind: "num" }, { label: S.m12.dv_dep_f[1], kind: "num" }];
  if (t === 1) {   // caja con tapa: S = 2x² + 4V/x → x = ∛V (un cubo)
    const x = R.int(2, 10), V = x ** 3;
    return { q: S.m12.dv_cajat_q(V), kind: "fields", fields: [{ ...fl[0], ans: x }, { ...fl[1], ans: x }], sol: S.m12.dv_cajat_s(V, 4 * V, x, 8 * V) };
  }
  if (t === 2) {   // depósito: la base cuesta pb €/m² y las paredes pp €/m²: C = pb·x² + 4pp·V/x → x³ = 2pp·V/pb
    let pb, pp, x, V; do { [pb, pp] = R.pick([[2, 1], [4, 1], [3, 1], [6, 2], [4, 3], [8, 1], [5, 2]]); x = R.int(2, 6); V = pb * x ** 3 / (2 * pp); } while (!Number.isInteger(V));
    const h = V / (x * x);
    return { q: S.m12.dv_dep_q(V, pb, pp), kind: "fields", fields: [{ ...fm[0], ans: x }, { ...fm[1], ans: h }], sol: S.m12.dv_dep_s(V, pb, pp, 4 * pp * V, 2 * pb, x ** 3, x, String(h).replace(".", WA.H.ds), 8 * pp * V) };
  }
  const x = R.pick([2, 4, 6, 8, 10, 12]), V = x ** 3 / 2, h = V / (x * x);
  return { q: S.m12.dv_caja_q(V), kind: "fields", fields: [{ ...fl[0], ans: x }, { ...fl[1], ans: h }],
    sol: S.m12.dv_caja_s(V, 4 * V, x, h) + S.m12.dv_caja_min(8 * V) };
});
// Estudio de funciones de 2.º: x·e^{kx}, racionales con oblicua, coeficientes a partir de extremos e inflexiones, recta tangente
def("m12.dv.estudio", (R, S) => {
  const t = R.int(0, 3);
  if (t === 0) {   // x·e^{kx}: extremo en −1/k, inflexión en −2/k
    const k = rnz(R, -3, 3), kx = k === 1 ? "x" : k === -1 ? "-x" : `${k}x`, e1 = F.make(-1, k), e2 = F.make(-2, k);
    return { q: S.m12.dv_es1_q($(`f(x) = x\\,e^{${kx}}`)), kind: "fields", fields: [{ label: S.m12.dv_es1_f[0], kind: "frac", ans: e1 }, { label: S.m12.dv_es1_f[1], kind: "frac", ans: e2 }],
      sol: S.m12.dv_es1_s(kx.replace("-", "−"), k === 1 ? "" : `${pn(k)}·`, `1 ${k < 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}x`, `2 ${k < 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}x`, k === 1 ? "" : k === -1 ? "−" : neg(k), $(ftex(e1)), $(ftex(e2)), k > 0 ? S.m12.dv_min : S.m12.dv_max) };
  }
  if (t === 1) {   // (x² + c)/(x − d) con (x − d)² = c + d² = s²: extremos en d ± s
    let d, s, c; do { d = R.int(-3, 3); s = R.int(1, 4); c = s * s - d * d; } while (c === 0 || d * d + c === 0);
    const f = `f(x) = \\frac{${ptex([1, 0, c])}}{${ptex([1, -d])}}`;
    return { q: S.m12.dv_es2_q($(f)), kind: "fields", fields: [{ label: S.m12.dv_es2_f[0], ans: d - s }, { label: S.m12.dv_es2_f[1], ans: d + s }],
      sol: S.m12.dv_es2_s(neg(d), $(`f'(x) = \\frac{2x(${ptex([1, -d])}) - (${ptex([1, 0, c])})}{(${ptex([1, -d])})^{2}} = \\frac{${ptex([1, -2 * d, -c])}}{(${ptex([1, -d])})^{2}}`), neg(d - s), neg(d + s), $(`y = ${ptex([1, d])}`)) };
  }
  if (t === 2) {   // f = x³ + ax² + bx + c con inflexión en x = p y extremo en (q, r)
    let p, q; do { p = R.int(-2, 2); q = R.int(-3, 3); } while (p === q);
    const r = R.int(-6, 6), a = -3 * p, b = -3 * q * q - 2 * a * q, c = r - q ** 3 - a * q * q - b * q;
    if (Math.abs(c) > 60) return null;
    return { q: S.m12.dv_es3_q(neg(p), `(${neg(q)}, ${neg(r)})`), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }, { label: "c", ans: c }],
      sol: S.m12.dv_es3_s(neg(p), pn(p), neg(a), neg(q), pn(q), `3·${pn(q)}² + 2·${pn(a)}·${pn(q)} + b = 0`, neg(b), `${pn(q)}³ + ${pn(a)}·${pn(q)}² + ${pn(b)}·${pn(q)} + c = ${neg(r)}`, neg(c), neg(6 * q + 2 * a), 6 * q + 2 * a > 0) };
  }
  // recta tangente y = mx + n en un punto
  const v = R.int(0, 2);
  if (v === 0) { const k = R.pick([1, 2, 3, 4, -1, -3, -4]), m = 2 + k, n = 1 - m;
    return { q: S.m12.dv_tg_q($(`f(x) = x^{2} ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}\\ln x`), 1), kind: "fields", fields: [{ label: "m", ans: m }, { label: "n", ans: n }],
      sol: S.m12.dv_tg_s(1, "1", $(`f'(x) = 2x ${k < 0 ? "-" : "+"} \\frac{${Math.abs(k)}}{x}`), neg(m), $(`y - 1 = ${m === 1 ? "" : m === -1 ? "-" : m}(x - 1)`), $(`y = ${ptex([m, n])}`)) }; }
  if (v === 1) { const a = R.int(-3, 3), m = a + 1, n = a;
    return { q: S.m12.dv_tg_q($(`f(x) = (${ptex([1, a])})\\,e^{x}`), 0), kind: "fields", fields: [{ label: "m", ans: m }, { label: "n", ans: n }],
      sol: S.m12.dv_tg_s(0, neg(a), $(`f'(x) = e^{x} + (${ptex([1, a])})\\,e^{x} = (${ptex([1, a + 1])})\\,e^{x}`), neg(m), $(`y - ${a < 0 ? `(${a})` : a} = ${m === 0 ? "0" : m === 1 ? "x" : m === -1 ? "-x" : `${m}x`}`), $(`y = ${ptex([m, n])}`)) }; }
  let a; do a = R.int(-3, 3); while (a === -1);
  const m = -1 - a, f2 = 2 + a, n = f2 - 2 * m;
  return { q: S.m12.dv_tg_q($(`f(x) = \\frac{${ptex([1, a])}}{x - 1}`), 2), kind: "fields", fields: [{ label: "m", ans: m }, { label: "n", ans: n }],
    sol: S.m12.dv_tg_s(2, neg(f2), $(`f'(x) = \\frac{(x - 1) - (${ptex([1, a])})}{(x - 1)^{2}} = \\frac{${-1 - a}}{(x - 1)^{2}}`), neg(m), $(`y - ${f2 < 0 ? `(${f2})` : f2} = ${m === 1 ? "" : m === -1 ? "-" : m}(x - 2)`), $(`y = ${ptex([m, n])}`)) };
});
// Optimización de 2.º: punto más cercano, rectángulo inscrito y tubería (coste con una raíz y extremos del intervalo)
def("m12.dv.optim", (R, S) => {
  const t = R.int(0, 2);
  if (t === 0) {   // punto de y = x² más cercano a A(0, k), k = s² + 1/2
    const s = R.int(1, 4), k2 = 2 * s * s + 1, kS = String(k2 / 2).replace(".", WA.H.ds);
    return { q: S.m12.dv_op1_q(kS), kind: "int", ans: s, sol: S.m12.dv_op1_s(kS, s * s, s, String(s * s + 0.25).replace(".", WA.H.ds), String((k2 / 2) ** 2).replace(".", WA.H.ds)) };
  }
  if (t === 1) {   // rectángulo bajo y = c − x², con c = 3s²
    const s = R.int(1, 3), c = 3 * s * s, A = 4 * s ** 3;
    return { q: S.m12.dv_op2_q($(`y = ${c} - x^{2}`)), kind: "int", ans: A, sol: S.m12.dv_op2_s(c, s * s, s, 2 * s * s, A) };
  }
  // tubería: C(x) = p1·√(x² + h²) + p2·(L − x), 0 ≤ x ≤ L
  const [p1, p2, h, x] = R.pick([[5, 4, 3, 4], [5, 4, 6, 8], [5, 3, 4, 3], [5, 3, 8, 6], [10, 6, 4, 3], [10, 8, 3, 4]]), L = x + R.int(2, 6);
  const hyp = Math.sqrt(x * x + h * h), Cm = p1 * hyp + p2 * (L - x), C0 = p1 * h + p2 * L, CL = rd(p1 * Math.sqrt(L * L + h * h), 1);
  return { q: S.m12.dv_op3_q(h, L, p1, p2), kind: "fields", fields: [{ label: S.m12.dv_op3_f[0], kind: "num", ans: x }, { label: S.m12.dv_op3_f[1], kind: "num", ans: Cm, tol: 0.05 }],
    sol: S.m12.dv_op3_s(p1, p2, h, L, `${p1 * p1 - p2 * p2}x² = ${p2 * p2 * h * h}`, x, C0, Cm, String(CL).replace(".", WA.H.ds)) };
});

// ═════ Unidad 9 · Integrales indefinidas ═════
// Cada plantilla: f (integrando, LaTeX), F (primitiva, para el corrector), Ft (primitiva, LaTeX) y s (los pasos, con
// los números del enunciado: el cambio con su du, u, du, dv y v en partes, los coeficientes A y B en racionales)
const cx = (k, v = "x") => k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`;            // LaTeX: 3x, −x
const sg = (n, t) => n === 0 ? "" : ` ${n < 0 ? "-" : "+"} ${Math.abs(n) === 1 && t ? "" : Math.abs(n)}${t || ""}`;   // « + 3x»
const INM = [
  R => { const n = R.int(2, 5), a = rnz(R, -4, 6), c = F.make(a, n + 1); return { f: `${a === 1 ? "" : a === -1 ? "-" : a}x^{${n}}`, F: `${fnum(c)}*x^${n + 1}`, Ft: `${fco(c)}x^{${n + 1}}`,
    s: S => S.m12.in_inm_pot(neg(a), n, n + 1, $(`${fco(c)}x^{${n + 1}}`)) }; },
  R => { const cs = [rnz(R, -4, 4) * 3, R.int(-4, 4) * 2, R.int(-6, 6)]; const P = [F.make(cs[0], 3), F.make(cs[1], 2), F.make(cs[2], 1)];
    return { f: `(${ptex(cs)})`, F: P.map((c, i) => `${fnum(c)}*x^${3 - i}`).join("+"), Ft: ptex(P.map(c => c[0] / c[1]).concat(0)), s: S => S.m12.in_inm_poli }; },
  R => { const a = rnz(R, -5, 5); return { f: `\\frac{${a}}{x}`, F: `${a}*ln(abs(x))`, Ft: `${a === 1 ? "" : a === -1 ? "-" : a}\\ln|x|`, s: S => S.m12.in_inm_log(neg(a)) }; },
  R => { const a = rnz(R, -4, 4), k = rnz(R, -3, 3), c = F.make(a, k); return { f: `${a === 1 ? "" : a === -1 ? "-" : a}e^{${cx(k)}}`, F: `${fnum(c)}*e^(${k}*x)`, Ft: `${fco(c)}e^{${cx(k)}}`,
    s: S => S.m12.in_inm_exp(neg(a), neg(k), $(ftex(c))) }; },
  R => { const k = R.int(2, 5), b = R.int(0, 5), arg = `${k}x${sg(b)}`; return { f: `\\cos(${arg})`, F: `sin(${k}*x+${b})/${k}`, Ft: `\\frac{\\operatorname{sen}(${arg})}{${k}}`, s: S => S.m12.in_inm_lin(k, "cos", "sen") }; },
  R => { const k = R.int(2, 5), b = R.int(0, 5), arg = `${k}x${sg(b)}`; return { f: `\\operatorname{sen}(${arg})`, F: `-cos(${k}*x+${b})/${k}`, Ft: `-\\frac{\\cos(${arg})}{${k}}`, s: S => S.m12.in_inm_lin(k, "sen", "−cos") }; },
  R => { const a = R.int(2, 5), b = rnz(R, -4, 4); return { f: `e^{${a}x${sg(b)}}`, F: `e^(${a}*x+(${b}))/${a}`, Ft: `\\frac{e^{${a}x${sg(b)}}}{${a}}`, s: S => S.m12.in_inm_lin(a, "exp", "exp") }; },
  R => { const a = R.int(1, 5) * 3; return { f: `${a}\\sqrt{x}`, F: `${2 * a / 3}*x^(3/2)`, Ft: `${2 * a / 3}x^{3/2}`, s: S => S.m12.in_inm_raiz(a, 2 * a / 3) }; },
  R => { const a = R.int(1, 4); return { f: `\\frac{${a}}{1 + x^{2}}`, F: `${a}*arctan(x)`, Ft: `${a === 1 ? "" : a}\\operatorname{arctg} x`, s: S => S.m12.in_inm_atg(a) }; },
  R => { const b = R.int(2, 5), a = R.int(1, 4); return { f: a === 1 ? `${b}^{x}` : `${a}\\cdot${b}^{x}`, F: `${a}*${b}^x/ln(${b})`, Ft: `\\frac{${a === 1 ? "" : a + "\\cdot"}${b}^{x}}{\\ln ${b}}`, s: S => S.m12.in_inm_ax(b) }; },
];
const CAMBIO = [
  R => { const c = R.int(1, 5), n = R.int(2, 4); return { f: `x\\,(x^{2} + ${c})^{${n}}`, F: `(x^2+${c})^${n + 1}/${2 * (n + 1)}`, Ft: `\\frac{(x^{2} + ${c})^{${n + 1}}}{${2 * (n + 1)}}`,
    s: S => S.m12.in_cv_s($(`u = x^{2} + ${c}`), $("du = 2x\\,dx"), $("x\\,dx = \\frac{du}{2}"), $(`\\int u^{${n}}\\,\\frac{du}{2} = \\frac{u^{${n + 1}}}{${2 * (n + 1)}}`)) }; },
  R => { const c = R.int(1, 9); return { f: `\\frac{2x}{x^{2} + ${c}}`, F: `ln(x^2+${c})`, Ft: `\\ln(x^{2} + ${c})`,
    s: S => S.m12.in_cv_s($(`u = x^{2} + ${c}`), $("du = 2x\\,dx"), $("2x\\,dx = du"), $("\\int \\frac{du}{u} = \\ln|u|"), S.m12.in_cv_pos) }; },
  R => { const a = R.pick([2, 3, 4]); return { f: `x\\,e^{${a === -1 ? "-" : a}x^{2}}`, F: `e^(${a}*x^2)/${2 * a}`, Ft: `\\frac{e^{${a === -1 ? "-" : a}x^{2}}}{${2 * a}}`,
    s: S => S.m12.in_cv_s($(`u = ${a === -1 ? "-" : a}x^{2}`), $(`du = ${2 * a}x\\,dx`), $(`x\\,dx = \\frac{du}{${2 * a}}`), $(`\\int e^{u}\\,\\frac{du}{${2 * a}} = \\frac{e^{u}}{${2 * a}}`)) }; },
  R => { const n = R.int(1, 3); return { f: n === 1 ? "\\frac{\\ln x}{x}" : `\\frac{(\\ln x)^{${n}}}{x}`, F: `ln(x)^${n + 1}/${n + 1}`, Ft: `\\frac{(\\ln x)^{${n + 1}}}{${n + 1}}`,
    s: S => S.m12.in_cv_s($("u = \\ln x"), $("du = \\frac{dx}{x}"), $("\\frac{dx}{x} = du"), $(`\\int u^{${n}}\\,du = \\frac{u^{${n + 1}}}{${n + 1}}`)) }; },
  R => { const n = R.int(2, 4), cosw = R.r() < 0.5;
    return cosw ? { f: `\\cos^{${n}}x\\,\\operatorname{sen} x`, F: `-cos(x)^${n + 1}/${n + 1}`, Ft: `-\\frac{\\cos^{${n + 1}}x}{${n + 1}}`,
      s: S => S.m12.in_cv_s($("u = \\cos x"), $("du = -\\operatorname{sen} x\\,dx"), $("\\operatorname{sen} x\\,dx = -du"), $(`-\\int u^{${n}}\\,du = -\\frac{u^{${n + 1}}}{${n + 1}}`)) }
      : { f: `\\operatorname{sen}^{${n}}x\\,\\cos x`, F: `sin(x)^${n + 1}/${n + 1}`, Ft: `\\frac{\\operatorname{sen}^{${n + 1}}x}{${n + 1}}`,
      s: S => S.m12.in_cv_s($("u = \\operatorname{sen} x"), $("du = \\cos x\\,dx"), $("\\cos x\\,dx = du"), $(`\\int u^{${n}}\\,du = \\frac{u^{${n + 1}}}{${n + 1}}`)) }; },
  R => { const k = R.int(1, 6); return { f: `\\frac{e^{x}}{e^{x} + ${k}}`, F: `ln(e^x+${k})`, Ft: `\\ln(e^{x} + ${k})`,
    s: S => S.m12.in_cv_s($(`u = e^{x} + ${k}`), $("du = e^{x}\\,dx"), $("e^{x}\\,dx = du"), $("\\int \\frac{du}{u} = \\ln|u|"), S.m12.in_cv_pos) }; },
  R => { const c = R.int(1, 9); return { f: `\\frac{x}{\\sqrt{x^{2} + ${c}}}`, F: `sqrt(x^2+${c})`, Ft: `\\sqrt{x^{2} + ${c}}`,
    s: S => S.m12.in_cv_s($(`u = x^{2} + ${c}`), $("du = 2x\\,dx"), $("x\\,dx = \\frac{du}{2}"), $("\\int \\frac{1}{\\sqrt{u}}\\,\\frac{du}{2} = \\frac12\\cdot2\\sqrt{u} = \\sqrt{u}")) }; },
];
const PARTES = [
  R => { const a = R.int(1, 4), A = cx(a);
    return { f: `x\\,e^{${A}}`, F: `e^(${a}*x)*(x/${a}-1/${a * a})`, Ft: a === 1 ? "e^{x}(x - 1)" : `e^{${A}}\\left(\\frac{x}{${a}} - \\frac{1}{${a * a}}\\right)`,
      s: S => S.m12.in_pp_s($("u = x"), $("du = dx"), $(`dv = e^{${A}}dx`), $(`v = ${a === 1 ? "" : `\\frac{1}{${a}}`}e^{${A}}`), $(`${a === 1 ? "" : `\\frac{1}{${a}}`}x\\,e^{${A}} - \\int ${a === 1 ? "" : `\\frac{1}{${a}}`}e^{${A}}dx`)) }; },
  R => { const a = R.int(1, 3), A = cx(a), co = R.r() < 0.5;
    return co ? { f: `x\\cos ${a === 1 ? "x" : `(${A})`}`, F: `x*sin(${a}*x)/${a}+cos(${a}*x)/${a * a}`, Ft: a === 1 ? "x\\operatorname{sen} x + \\cos x" : `\\frac{x\\operatorname{sen}(${A})}{${a}} + \\frac{\\cos(${A})}{${a * a}}`,
      s: S => S.m12.in_pp_s($("u = x"), $("du = dx"), $(`dv = \\cos(${A})\\,dx`), $(`v = ${a === 1 ? "" : `\\frac{1}{${a}}`}\\operatorname{sen}(${A})`), $(`${a === 1 ? "" : `\\frac{1}{${a}}`}x\\operatorname{sen}(${A}) - \\int ${a === 1 ? "" : `\\frac{1}{${a}}`}\\operatorname{sen}(${A})\\,dx`)) }
      : { f: `x\\operatorname{sen} ${a === 1 ? "x" : `(${A})`}`, F: `-x*cos(${a}*x)/${a}+sin(${a}*x)/${a * a}`, Ft: a === 1 ? "-x\\cos x + \\operatorname{sen} x" : `-\\frac{x\\cos(${A})}{${a}} + \\frac{\\operatorname{sen}(${A})}{${a * a}}`,
      s: S => S.m12.in_pp_s($("u = x"), $("du = dx"), $(`dv = \\operatorname{sen}(${A})\\,dx`), $(`v = -${a === 1 ? "" : `\\frac{1}{${a}}`}\\cos(${A})`), $(`-${a === 1 ? "" : `\\frac{1}{${a}}`}x\\cos(${A}) + \\int ${a === 1 ? "" : `\\frac{1}{${a}}`}\\cos(${A})\\,dx`)) }; },
  R => { const n = R.int(0, 2), m = n + 1, xn = n === 0 ? "" : n === 1 ? "x" : `x^{${n}}`, xm = m === 1 ? "x" : `x^{${m}}`;
    return { f: n === 0 ? "\\ln x" : `${xn}\\ln x`, F: `x^${m}*ln(x)/${m}-x^${m}/${m * m}`, Ft: n === 0 ? "x\\ln x - x" : `\\frac{${xm}\\ln x}{${m}} - \\frac{${xm}}{${m * m}}`,
      s: S => S.m12.in_pp_s($("u = \\ln x"), $("du = \\frac{dx}{x}"), $(`dv = ${xn || ""}${n ? "\\," : ""}dx`), $(`v = ${m === 1 ? "x" : `\\frac{${xm}}{${m}}`}`), $(`${m === 1 ? "x" : `\\frac{${xm}}{${m}}`}\\ln x - \\int ${m === 1 ? "x" : `\\frac{${xm}}{${m}}`}\\cdot\\frac{1}{x}\\,dx`)) }; },
  R => { const b = rnz(R, -4, 4); return { f: `(x${sg(b)})\\,e^{x}`, F: `(x+(${b})-1)*e^x`, Ft: b === 1 ? "x\\,e^{x}" : `(x${sg(b - 1)})\\,e^{x}`,
    s: S => S.m12.in_pp_s($(`u = x${sg(b)}`), $("du = dx"), $("dv = e^{x}dx"), $("v = e^{x}"), $(`(x${sg(b)})\\,e^{x} - \\int e^{x}dx`)) }; },
  R => { const b = rnz(R, -4, 4), co = R.r() < 0.5, xb = `x${sg(b)}`;   // (x + b)·cos x o (x + b)·sen x
    return co ? { f: `(${xb})\\cos x`, F: `(x+(${b}))*sin(x)+cos(x)`, Ft: `(${xb})\\operatorname{sen} x + \\cos x`,
      s: S => S.m12.in_pp_s($(`u = ${xb}`), $("du = dx"), $("dv = \\cos x\\,dx"), $("v = \\operatorname{sen} x"), $(`(${xb})\\operatorname{sen} x - \\int \\operatorname{sen} x\\,dx`)) }
      : { f: `(${xb})\\operatorname{sen} x`, F: `-(x+(${b}))*cos(x)+sin(x)`, Ft: `-(${xb})\\cos x + \\operatorname{sen} x`,
      s: S => S.m12.in_pp_s($(`u = ${xb}`), $("du = dx"), $("dv = \\operatorname{sen} x\\,dx"), $("v = -\\cos x"), $(`-(${xb})\\cos x + \\int \\cos x\\,dx`)) }; },
  R => ({ f: "x^{2}e^{x}", F: "e^x*(x^2-2*x+2)", Ft: "e^{x}(x^{2} - 2x + 2)", s: S => S.m12.in_pp_dos }),
  R => ({ f: "e^{x}\\operatorname{sen} x", F: "e^x*(sin(x)-cos(x))/2", Ft: "\\frac{e^{x}(\\operatorname{sen} x - \\cos x)}{2}", s: S => S.m12.in_pp_cic }),
];
const xm = v => v ? `x ${v < 0 ? "+" : "-"} ${Math.abs(v)}` : "x";
const RACIO = [
  R => { const a = rnz(R, -5, 5), b = rnz(R, -5, 5); return { f: `\\frac{${a}}{${xm(b)}}`, F: `${a}*ln(abs(x-(${b})))`, Ft: `${a === 1 ? "" : a === -1 ? "-" : a}\\ln|${xm(b)}|`, s: S => S.m12.in_ra_log(neg(a), xm(b).replace("-", "−")) }; },
  R => {   // (px + q)/((x − a)(x − b)) = A/(x − a) + B/(x − b), con el denominador factorizado o desarrollado
    let a, b, A, B; do { a = R.int(-4, 4); b = R.int(-4, 4); A = rnz(R, -3, 3); B = rnz(R, -3, 3); } while (a === b || (A + B === 0 && A * b + B * a === 0));
    const p = A + B, q = -(A * b + B * a), pf = v => v === 0 ? "x" : `(${xm(v)})`, exp = R.r() < 0.5, num = ptex([p, q]);
    const den = exp ? ptex([1, -(a + b), a * b]) : `${pf(a)}${pf(b)}`, lg = (c, v) => `${c === 1 ? "" : c === -1 ? "-" : c}\\ln|${xm(v)}|`;
    return { f: `\\frac{${num}}{${den}}`, F: `${A}*ln(abs(x-(${a})))+(${B})*ln(abs(x-(${b})))`, Ft: `${lg(A, a)} ${B < 0 ? "-" : "+"} ${lg(Math.abs(B), b)}`,
      s: S => (exp ? S.m12.in_ra_fac(neg(a), neg(b), $(`${den} = ${pf(a)}${pf(b)}`)) : "") + S.m12.in_ra_ab($(`\\frac{${num}}{${pf(a)}${pf(b)}} = \\frac{A}{${xm(a)}} + \\frac{B}{${xm(b)}}`), $(`${num} = A(${xm(b)}) + B(${xm(a)})`), neg(a), neg(A), neg(b), neg(B)) }; },
  R => { const a = rnz(R, -4, 4); return { f: `\\frac{x}{${xm(a)}}`, F: `x+${a}*ln(abs(x-(${a})))`, Ft: `x ${a < 0 ? "-" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}\\ln|${xm(a)}|`, s: S => S.m12.in_ra_div($(`\\frac{x}{${xm(a)}} = 1 + \\frac{${a}}{${xm(a)}}`)) }; },
  R => { const a = rnz(R, -3, 3); let c; do c = R.int(-4, 4); while (a + c === 0); const k = a + c;   // (x + c)/(x − a)² = 1/(x − a) + (a + c)/(x − a)²
    return { f: `\\frac{${ptex([1, c])}}{(${xm(a)})^{2}}`, F: `ln(abs(x-(${a})))-(${k})/(x-(${a}))`, Ft: `\\ln|${xm(a)}| ${k < 0 ? "+" : "-"} \\frac{${Math.abs(k)}}{${xm(a)}}`,
      s: S => S.m12.in_ra_dob($(`\\frac{${ptex([1, c])}}{(${xm(a)})^{2}} = \\frac{A}{${xm(a)}} + \\frac{B}{(${xm(a)})^{2}}`), $(`${ptex([1, c])} = A(${xm(a)}) + B`), neg(k), $(`\\int \\frac{${k}}{(${xm(a)})^{2}}dx = -\\frac{${k}}{${xm(a)}}`)) }; },
  R => { const k = R.int(1, 3); return { f: `\\frac{1}{x^{2} + ${k * k}}`, F: `arctan(x/${k})/${k}`, Ft: k === 1 ? "\\operatorname{arctg} x" : `\\frac{1}{${k}}\\operatorname{arctg}\\frac{x}{${k}}`,
    s: S => S.m12.in_ra_atg(k, k * k) }; },
];
function integral(list) {
  return (R, S) => {
    const t = R.pick(list)(R);
    return { q: S.m12.in_q($(`\\int ${t.f}\\,dx`)), kind: "expr", ans: t.F, ansHtml: $(`${t.Ft} + C`), upToConst: true, hint: S.m12.in_hint,
      sol: t.s(S) + ` ${$(`\\int ${t.f}\\,dx = ${t.Ft} + C`)}.` };
  };
}
def("m12.in.inmediata", integral(INM));
def("m12.in.cambio", integral(CAMBIO));
def("m12.in.partes", integral(PARTES));
def("m12.in.racional", integral(RACIO));
// ¿Qué método usar? Las pistas de la lección para reconocer el tipo de integral
const MET = [
  [0, R => `\\cos(${R.int(2, 6)}x)`], [0, R => `\\frac{${R.int(2, 7)}}{1 + x^{2}}`], [0, R => `e^{${R.int(2, 5)}x}`], [0, R => `(x^{3} - ${R.int(2, 9)}x)`], [0, R => `\\frac{${R.int(2, 9)}}{x}`],
  [1, R => `x\\,e^{x^{2} + ${R.int(1, 5)}}`], [1, R => `\\operatorname{sen}^{${R.int(2, 5)}}x\\cos x`], [1, R => `\\frac{(\\ln x)^{${R.int(2, 4)}}}{x}`], [1, R => `\\frac{e^{x}}{e^{x} + ${R.int(1, 6)}}`], [1, R => `x\\sqrt{x^{2} + ${R.int(1, 8)}}`],
  [2, R => `x\\,e^{${R.int(2, 5)}x}`], [2, R => R.pick(["x", "x^{2}", "x^{3}"]) + "\\ln x"], [2, R => `x\\cos(${R.int(2, 5)}x)`], [2, R => `e^{x}\\cos(${R.int(2, 3)}x)`], [2, R => `\\operatorname{arctg} x`],
  [3, R => { const a = R.int(1, 4), b = R.int(1, 4); return `\\frac{${R.int(1, 6)}}{(x - ${a})(x + ${b})}`; }], [3, R => { const a = R.int(2, 5); return `\\frac{x + 1}{x^{2} - ${a * a}}`; }],
  [3, R => { const a = R.int(2, 5); return `\\frac{3}{x^{2} + ${a}x}`; }], [3, R => { const a = R.int(1, 3); return `\\frac{x^{2}}{x + ${a}}`; }],
];
def("m12.in.metodo", (R, S) => {
  const [k, g] = R.pick(MET), f = g(R);
  return { q: S.m12.in_met_q($(`\\int ${f}\\,dx`)), kind: "choice", opts: S.m12.in_met_o, correct: k, shuffle: false, sol: S.m12.in_met_s[k] };
});

// ═════ Unidad 10 · Integral definida ═════
const anti = cs => { const d = cs.length - 1; return cs.map((c, i) => F.make(c, d - i + 1)).concat([F.make(0, 1)]); };
const evalF = (P, x) => P.reduce((s, c) => F.add(F.mul(s, F.make(x, 1)), c), F.make(0, 1));
const ft = f => ftex(f);
const fpar = f => f[0] < 0 ? `\\left(${ftex(f)}\\right)` : ftex(f);
const dc2b = x => String(rd(x, 2)).replace(".", WA.H.ds).replace("-", "−");
def("m12.id.barrow", (R, S) => {
  const t = R.r();
  if (t < 0.15) {   // ∫ |x − c| entre a y b, con a < c < b: se separa en c
    const c = R.int(-2, 3), a = c - R.int(1, 3), b = c + R.int(1, 4), v = F.make((c - a) ** 2 + (b - c) ** 2, 2);
    const xc = c ? `x ${c < 0 ? "+" : "-"} ${Math.abs(c)}` : "x";
    return { q: S.m12.id_br_q($(`\\int_{${a}}^{${b}} |${xc}|\\,dx`)), kind: "frac", ans: v,
      sol: S.m12.id_abs_s(neg(c), $(`\\int_{${a}}^{${c}} (${c ? `${c} - x` : "-x"})\\,dx + \\int_{${c}}^{${b}} (${xc})\\,dx`), $(ft(F.make((c - a) ** 2, 2))), $(ft(F.make((b - c) ** 2, 2))), $(ft(v))) };
  }
  if (t < 0.45) {   // funciones de la unidad 9
    const v = R.int(0, 4);
    if (v === 0) { const a = rnz(R, -3, 4), m = R.int(1, 3); return { q: S.m12.id_br_q($(`\\int_{1}^{e^{${m}}} \\frac{${a}}{x}\\,dx`)), kind: "int", ans: a * m, sol: S.m12.id_trs[0](neg(a), m, neg(a * m)) }; }
    if (v === 1) { const a = R.int(1, 5), k = R.int(1, 2), r = rd(a * (Math.exp(k) - 1) / k, 2);
      return { q: S.m12.id_br_q($(`\\int_{0}^{1} ${a === 1 ? "" : a}e^{${k === 1 ? "" : k}x}\\,dx`)) + S.m12.id_dec, kind: "num", ans: r, tol: 0.011, sol: S.m12.id_trs[1](a, k, dc2b(r)) }; }
    if (v === 2) { const a = R.int(1, 5), half = R.r() < 0.5; return { q: S.m12.id_br_q($(`\\int_{0}^{${half ? "\\pi/2" : "\\pi"}} ${a === 1 ? "" : a}\\operatorname{sen} x\\,dx`)), kind: "int", ans: half ? a : 2 * a, sol: S.m12.id_trs[2](a, half) }; }
    if (v === 3) return { q: S.m12.id_br_q($("\\int_{0}^{1} x\\,e^{x}\\,dx")), kind: "int", ans: 1, sol: S.m12.id_trs[3]() };
    const b = R.int(2, 3); return { q: S.m12.id_br_q($(`\\int_{0}^{${b}} \\frac{2x}{x^{2} + 1}\\,dx`)) + S.m12.id_dec, kind: "num", ans: rd(Math.log(b * b + 1), 2), tol: 0.011, sol: S.m12.id_trs[4](b, b * b + 1, dc2b(Math.log(b * b + 1))) };
  }
  const cs = [R.int(-3, 3), R.int(-4, 4), R.int(-5, 5)];
  if (R.r() < 0.4) cs.unshift(rnz(R, -2, 2));
  if (cs.every(x => !x)) cs[cs.length - 1] = 1;
  const a = R.int(-2, 1), b = a + R.int(1, 3), P = anti(cs), Fb = evalF(P, b), Fa = evalF(P, a), v = F.sub(Fb, Fa);
  return { q: S.m12.id_br_q($(`\\int_{${a}}^{${b}} (${ptex(cs)})\\,dx`)), kind: "frac", ans: v,
    sol: S.m12.id_br_s($(`F(x) = ${ptexF(P)}`), neg(b), neg(a), $(ft(Fb)), $(ft(Fa)), $(`${ft(Fb)} - ${fpar(Fa)}`), $(ft(v))) };
});
function ptexF(P) {   // primitiva con coeficientes fraccionarios
  const d = P.length - 1;
  let s = "";
  P.forEach((c, i) => {
    if (!c[0]) return;
    const e = d - i, a = [Math.abs(c[0]), c[1]], co = a[1] === 1 ? (a[0] === 1 && e ? "" : String(a[0])) : `\\frac{${a[0]}}{${a[1]}}`;
    const t = co + (e === 0 ? "" : e === 1 ? "x" : `x^{${e}}`);
    s += s ? (c[0] < 0 ? " - " : " + ") + t : (c[0] < 0 ? "-" : "") + t;
  });
  return s || "0";
}
// Funciones definidas por una integral: F(x) = ∫₀ˣ g(t) dt (extremos) y G(x) = ∫₀^{x²} h(t) dt (regla de la cadena)
def("m12.id.fundamental", (R, S) => {
  if (R.r() < 0.6) {   // F′(x) = g(x) = (x − a)(x − b)·h(x), con h > 0: máximo en a y mínimo en b
    let a, b; do { a = R.int(-3, 2); b = a + R.int(1, 4); } while (false);
    const H = R.pick(["e^{-t}", "e^{t}", "(t^{2} + 1)", "1"]), pa = ptex([1, -(a + b), a * b], "t");
    const g = H === "1" ? `(${pa})` : `(${pa})\\,${H}`;
    return { q: S.m12.id_fu_q($(`F(x) = \\int_{0}^{x} ${g}\\,dt`)), kind: "fields", fields: [{ label: S.m12.dv_es2_f[0], ans: a }, { label: S.m12.dv_es2_f[1], ans: b }],
      sol: S.m12.id_fu_s($(`F'(x) = ${g.replace(/t/g, "x")}`), H === "1" ? "" : $(H.replace(/t/g, "x")), neg(a), neg(b)) };
  }
  const c = R.int(-4, 4), x0 = rnz(R, -2, 2), v = (x0 * x0 + c) * 2 * x0;
  return { q: S.m12.id_fc_q($(`G(x) = \\int_{0}^{x^{2}} (${ptex([1, c], "t")})\\,dt`), neg(x0)), kind: "int", ans: v,
    sol: S.m12.id_fc_s($(`A(u) = \\int_{0}^{u} (${ptex([1, c], "t")})\\,dt`), $(`A'(u) = ${ptex([1, c], "u")}`), $(`G'(x) = A'(x^{2})\\cdot 2x = (${ptex([1, 0, c])})\\cdot 2x`), neg(x0), `(${x0 * x0}${c ? ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}` : ""})·2·${pn(x0)}`, neg(v)) };
});
def("m12.id.area", (R, S) => {
  let r1, r2; do { r1 = R.int(-3, 2); r2 = r1 + R.int(1, 4); } while (false);
  const t = R.r();
  if (t < 0.25) {   // parábola y = c(x − r1)(x − r2) y el eje X, con la primitiva
    const c = rnz(R, -2, 2), cs = [c, -c * (r1 + r2), c * r1 * r2], P = anti(cs), I = F.sub(evalF(P, r2), evalF(P, r1)), A = F.make(Math.abs(I[0]), I[1]);
    return { q: S.m12.id_ar_q($(`y = ${ptex(cs)}`)), kind: "frac", ans: A,
      sol: S.m12.id_ar_s(neg(r1), neg(r2), $(`\\int_{${r1}}^{${r2}} (${ptex(cs)})\\,dx = \\Big[${ptexF(P)}\\Big]_{${r1}}^{${r2}} = ${ft(evalF(P, r2))} - ${fpar(evalF(P, r1))} = ${ft(I)}`), c < 0, $(ft(A))) };
  }
  if (t < 0.45) {   // y = x² y la recta que la corta en r1 y r2
    const m = r1 + r2, n = -r1 * r2, P = anti([-1, m, n]), A = F.sub(evalF(P, r2), evalF(P, r1));
    return { q: S.m12.id_ar2_q($("y = x^{2}"), $(`y = ${ptex([m, n])}`)), kind: "frac", ans: A,
      sol: S.m12.id_ar2_s(neg(r1), neg(r2), $(`\\int_{${r1}}^{${r2}} (${ptex([-1, m, n])})\\,dx = \\Big[${ptexF(P)}\\Big]_{${r1}}^{${r2}}`), $(ft(A))) };
  }
  if (t < 0.6) {   // dos recintos: y = x³ − k²x y el eje X
    const k = R.int(1, 3), half = F.make(k ** 4, 4), A = F.make(k ** 4, 2);
    return { q: S.m12.id_ar_q($(`y = x^{3} - ${k * k === 1 ? "" : k * k}x`)), kind: "frac", ans: A, sol: S.m12.id_cub_s(k, k * k, $(`\\frac{x^{4}}{4} - \\frac{${k * k === 1 ? "" : k * k}x^{2}}{2}`), $(ft(half)), $(ft(A))) };
  }
  if (t < 0.7) {   // y = sen x en [0, bπ]: b recintos de área 2
    const b = R.int(1, 3);
    return { q: S.m12.id_sen_q($("y = \\operatorname{sen} x"), b === 1 ? "π" : `${b}π`), kind: "int", ans: 2 * b, sol: S.m12.id_sen_s(b) };
  }
  if (t < 0.8) {   // y = k·ln x, el eje X y x = e^m
    const k = R.int(1, 3), m = R.int(1, 2), r = rd(k * (Math.exp(m) * (m - 1) + 1), 2);
    return { q: S.m12.id_ln_q($(`y = ${k === 1 ? "" : k}\\ln x`), $(m === 1 ? "x = e" : `x = e^{${m}}`)) + S.m12.id_dec, kind: "num", ans: r, tol: 0.011, sol: S.m12.id_ln_s(k, m, dc2b(r)) };
  }
  if (t < 0.9) {   // y = x², su tangente en x = p y el eje X: área p³/12
    const p = R.int(1, 3), A = F.make(p ** 3, 12);
    return { q: S.m12.id_tg_q(p), kind: "frac", ans: A, sol: S.m12.id_tg_s(p, $(`y = ${ptex([2 * p, -p * p])}`), $(ft(F.make(p, 2))), $(ft(F.make(p ** 3, 3))), $(ft(F.make(p ** 3, 4))), $(ft(A))) };
  }
  // parámetro: el área entre y = x² e y = ax vale a³/6
  const a = R.int(1, 6), A = F.make(a ** 3, 6);
  return { q: S.m12.id_par_q($(ft(A))), kind: "int", ans: a, sol: S.m12.id_par_s($(ft(A)), a ** 3, a) };
});
def("m12.id.volumen", (R, S) => {
  const a = R.int(1, 4);
  if (R.r() < 0.5) { const k = R.int(1, 4), V = F.make(k * a * a, 2);
    return { q: S.m12.id_vol_q($(`y = \\sqrt{${k === 1 ? "" : k}x}`), 0, a), kind: "frac", ans: V,
      sol: S.m12.id_vol_s($(`V = \\pi\\int_{0}^{${a}} ${k === 1 ? "" : k}x\\,dx = \\pi\\left[\\frac{${k === 1 ? "" : k}x^{2}}{2}\\right]_{0}^{${a}} = \\pi\\cdot\\frac{${k * a * a}}{2}`), $(`${ft(V)}\\pi`)) }; }
  const m = R.int(1, 3), V = F.make(m * m * a ** 3, 3);
  return { q: S.m12.id_vol_q($(`y = ${m === 1 ? "" : m}x`), 0, a), kind: "frac", ans: V,
    sol: S.m12.id_vol_s($(`V = \\pi\\int_{0}^{${a}} ${m * m === 1 ? "" : m * m}x^{2}\\,dx = \\pi\\left[\\frac{${m * m === 1 ? "" : m * m}x^{3}}{3}\\right]_{0}^{${a}} = \\pi\\cdot\\frac{${m * m * a ** 3}}{3}`), $(`${ft(V)}\\pi`)) };
});
def("m12.id.propiedades", (R, S) => {
  const p = R.int(-9, 9), q = R.int(-9, 9), a = R.int(-2, 1), b = a + R.int(1, 3), c = b + R.int(1, 3), k = R.int(0, 3);
  const I = (x, y) => `\\int_{${x}}^{${y}} f(x)\\,dx`;
  const data = $(`${I(a, b)} = ${p},\\; ${I(b, c)} = ${q}`);
  const Q = [[I(a, c), p + q], [I(c, a), -(p + q)], [I(b, b), 0], [`\\int_{${a}}^{${b}} 3f(x)\\,dx`, 3 * p]][k];
  return { q: S.m12.id_pr_q(data, $(Q[0])), kind: "int", ans: Q[1], sol: S.m12.id_pr_s[k](p, q, Q[1], $(`${I(c, a)} = -${I(a, c)} = -\\left(${I(a, b)} + ${I(b, c)}\\right)`)) };
});

// ═════ Unidad 11 · Probabilidad ═════
def("m12.pr.total", (R, S) => {
  // máquinas en orden (A, B[, C]) y con porcentajes de defectuosas distintos; cuentas en diezmilésimas enteras
  const n = R.int(2, 3), names = S.m12.pr_maq.slice(0, n), L = "ABC";
  let ps; do { ps = Array.from({ length: n - 1 }, () => R.int(1, 6) * 10); } while (ps.reduce((a, b) => a + b, 0) >= 100);
  ps.push(100 - ps.reduce((a, b) => a + b, 0));
  let ds; do ds = ps.map(() => R.int(1, 8)); while (new Set(ds).size < n);
  const p4 = ps.map((p, i) => p * ds[i]), t4 = p4.reduce((a, b) => a + b, 0), dcm = x => String(x).replace(".", WA.H.ds);
  const desc = names.map((m, i) => S.m12.pr_desc(m, ps[i], ds[i])).join("; ");
  const steps = ps.map((p, i) => `${L[i]}–D: ${dcm(p / 100)} · ${dcm(ds[i] / 100)} = ${dcm(p4[i] / 10000)}`).join("; ");
  const sum = `P(D) = ${p4.map(x => dcm(x / 10000)).join(" + ")} = ${dcm(t4 / 10000)}`;
  if (R.r() < 0.5) {
    const v = Math.round(t4 / 10) / 1000;   // milésimas
    return { q: S.m12.pr_tot_q(desc), kind: "num", ans: v, tol: 0.0006, sol: S.m12.pr_tot_s(steps, `P(D) = ${p4.map(x => dcm(x / 10000)).join(" + ")}`, dcm(t4 / 10000), dcm(v), t4 % 10 === 0) };
  }
  const j = R.int(0, n - 1), v = Math.round(10000 * p4[j] / t4) / 10000;   // diezmilésimas
  return { q: S.m12.pr_bay_q(desc, names[j]), kind: "num", ans: v, tol: 0.0006,
    sol: S.m12.pr_bay_s(steps, sum, L[j], dcm(ps[j] / 100), dcm(ds[j] / 100), dcm(p4[j] / 10000), dcm(t4 / 10000), dcm(v), (p4[j] * 10000) % t4 === 0) };
});
// Aproximación de la binomial por la normal. Φ(z) con 4 decimales, como en la tabla (Simpson de la densidad entre 0 y z)
function Phi(z) {
  const f = t => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI), a = Math.abs(z), N = 200, h = a / N;
  let s = f(0) + f(a); for (let i = 1; i < N; i++) s += (i % 2 ? 4 : 2) * f(i * h);
  const v = 0.5 + s * h / 3;
  return z < 0 ? 1 - v : v;
}
const phi4 = z => Math.round(Phi(z) * 10000);   // en diezmilésimas, z ≥ 0 con dos decimales
// [n, p, μ, σ]: μ y σ enteros, también con p ≠ 0,5
const APROX = [[100, 0.2, 20, 4], [225, 0.2, 45, 6], [400, 0.2, 80, 8], [900, 0.1, 90, 9], [100, 0.5, 50, 5], [144, 0.5, 72, 6], [400, 0.5, 200, 10]];
def("m12.pr.aproximacion", (R, S) => {
  if (R.r() < 0.12) {   // ¿se puede aproximar? n·p ≥ 5 y n·q ≥ 5
    const [n, p] = R.pick([[20, 0.1], [30, 0.1], [40, 0.05], [50, 0.2], [100, 0.03], [60, 0.5], [200, 0.98], [80, 0.9], [25, 0.4], [12, 0.5]]), np = rd(n * p, 2), nq = rd(n * (1 - p), 2), ok = np >= 5 && nq >= 5;
    return { q: S.m12.pr_ok_q(n, String(p).replace(".", WA.H.ds)), kind: "choice", opts: S.m12.yesno, correct: ok ? 0 : 1, shuffle: false, sol: S.m12.pr_ok_s(n, String(p).replace(".", WA.H.ds), String(np).replace(".", WA.H.ds), String(nq).replace(".", WA.H.ds), ok) };
  }
  const [n, p, mu, sd] = R.pick(APROX), dcm = x => String(x).replace(".", WA.H.ds).replace("-", "−"), pS = dcm(p), q = rd(1 - p, 1);
  if (R.r() < 0.2) return { q: S.m12.pr_ms_q(n, pS), kind: "fields", fields: [{ label: "μ", kind: "num", ans: mu }, { label: "σ", kind: "num", ans: sd }], sol: S.m12.pr_ms_s(n, pS, mu, sd, dcm(q), rd(n * p * (1 - p), 2)) };
  // z redondeado a centésimas (como se busca en la tabla) y su valor en la tabla
  const zOf = x => rd((x - mu) / sd, 2), zTxt = x => `(${dcm(x)} − ${mu})/${sd} = ${dcm(rd((x - mu) / sd, 4))}${Math.abs(rd((x - mu) / sd, 4) * 100 - Math.round(rd((x - mu) / sd, 4) * 100)) < 1e-9 ? "" : ` ≈ ${dcm(zOf(x))}`}`;
  // P(Z ≤ z) en diezmilésimas y su explicación a partir del dato P(Z ≤ |z|)
  const leq = z => z >= 0 ? [phi4(z), `P(Z ≤ ${dcm(z)}) = ${dcm(phi4(z) / 10000)}`] : [10000 - phi4(-z), `P(Z ≤ ${dcm(z)}) = 1 − P(Z ≤ ${dcm(-z)}) = 1 − ${dcm(phi4(-z) / 10000)} = ${dcm((10000 - phi4(-z)) / 10000)}`];
  // una sola probabilidad: en el 80 % hace falta el complemento (si no, la respuesta sería el propio dato de la tabla)
  const t = R.int(0, 4), direct = R.r() < 0.2;
  let k, k2, z, z2;
  do { k = mu + R.int(-Math.round(2.2 * sd), Math.round(2.2 * sd)); k2 = k + R.int(Math.max(2, Math.round(sd / 2)), 2 * sd);
    const x = [k + 0.5, k - 0.5, k - 0.5, k + 0.5, k - 0.5][t]; z = zOf(x); z2 = zOf(k2 + 0.5);
  } while (Math.abs(z) < 0.1 || Math.abs(z) > 2.5 || (t === 4 && (Math.abs(z2) < 0.1 || Math.abs(z2) > 2.5)) || (t < 4 && !direct && (t <= 1 ? z > 0 : z < 0)));
  const xc = [k + 0.5, k - 0.5, k - 0.5, k + 0.5, k - 0.5][t];
  const rel = ["≤", "&lt;", "≥", "&gt;", "≤"][t], relC = ["≤", "≤", "≥", "≥", "≤"][t];
  const datos = [Math.abs(z)].concat(t === 4 ? [Math.abs(z2)] : []).filter((v, i, a) => a.indexOf(v) === i).map(v => `P(Z ≤ ${dcm(v)}) = ${dcm(phi4(v) / 10000)}`).join("; ");
  let ans4, last;
  if (t <= 1) { const [v, s] = leq(z); ans4 = v; last = s; }
  else if (t <= 3) { const [v, s] = leq(z); ans4 = 10000 - v; last = `P(Z ≥ ${dcm(z)}) = 1 − P(Z ≤ ${dcm(z)}) = 1 − ${dcm(v / 10000)} = ${dcm(ans4 / 10000)}`; if (z < 0) last = `P(Z ≥ ${dcm(z)}) = P(Z ≤ ${dcm(-z)}) = ${dcm(ans4 / 10000)}`; }
  else { const [v2, s2] = leq(z2), [v1, s1] = leq(z); ans4 = v2 - v1; last = `${s2}; ${s1}. P = ${dcm(v2 / 10000)} − ${dcm(v1 / 10000)} = ${dcm(ans4 / 10000)}`; }
  const ask = t === 4 ? `${k} ≤ X ≤ ${k2}` : `X ${rel} ${k}`, corr = t === 4 ? `${dcm(k - 0.5)} ≤ X′ ≤ ${dcm(k2 + 0.5)}` : `X′ ${relC} ${dcm(xc)}`;
  const tip = t === 4 ? `z₁ = ${zTxt(k - 0.5)} y z₂ = ${zTxt(k2 + 0.5)}` : `z = ${zTxt(xc)}`;
  return { q: S.m12.pr_ap_q(n, pS, ask, datos), kind: "num", ans: ans4 / 10000, tol: 0.0002,
    sol: S.m12.pr_ap_s(n, pS, rd(n * p, 1), rd(n * (1 - p), 1), mu, sd, ask, corr, tip, last, dcm(ans4 / 10000)) };
});
// ═════ Probabilidad condicionada e independencia (generador añadido) ═════
const dc = (x, k = 4) => String(rd(x, k)).replace(".", WA.H.ds);
const sfr = (a, b) => F.make(a, b);
const ftx = f => f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`;
const DADO = [1, 2, 3, 4, 5, 6];
def("m12.pr.condicionada", (R, S) => {
  const T = S.m12.CD, v = R.int(0, 9);
  if (v >= 8) {   // contrarios y De Morgan: P(A ∪ B), P(no A y no B) y P(no A | no B) a partir de P(A), P(B) y P(A | B)
    let pa, pb, pab, pi, pu; do { pa = R.int(2, 7) / 10; pb = R.int(2, 7) / 10; pab = R.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]); pi = rd(pb * pab, 4); pu = rd(pa + pb - pi, 4); } while (pi > pa || pu > 1);
    const w = R.int(0, 2), nn = rd(1 - pu, 4), nb = rd(1 - pb, 4), cond = rd(nn / nb, 4);
    const ans = [pu, nn, cond][w], what = [T.dm_u, T.dm_n, T.dm_c][w];
    return { q: T.dm_q(dc(pa), dc(pb), dc(pab), what), kind: "num", ans: rd(ans, 4), tol: 0.0006, sol: T.dm_s(w, dc(pa), dc(pb), dc(pab), dc(pi), dc(pu), dc(nn), dc(nb), dc(cond)) };
  }
  if (v === 0) {   // definición y regla del producto
    const pb = R.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.8]), pab = R.int(1, 9) / 10, pi = rd(pb * pab, 4);
    if (R.r() < 0.6) return { q: T.def_q(dc(pi), dc(pb)), kind: "num", ans: pab, tol: 0.001, sol: T.def_s(dc(pi), dc(pb), dc(pab)) };
    return { q: T.prod_q(dc(pb), dc(pab)), kind: "num", ans: pi, tol: 0.0006, sol: T.prod_s(dc(pb), dc(pab), dc(pi)) };
  }
  if (v === 1) {   // un dado: el espacio muestral se reduce a lo que se sabe
    let tb, ta, B, AB, tries = 0;
    do { let fb, fa; [tb, fb] = R.pick(T.dadoB); [ta, fa] = R.pick(T.dadoA); B = DADO.filter(fb); AB = B.filter(fa); } while ((!AB.length || AB.length === B.length) && ++tries < 50);
    return { q: T.dado_q(tb, ta), kind: "frac", ans: sfr(AB.length, B.length), sol: T.dado_s(B.join(", "), AB.join(", "), AB.length, B.length, ftx(sfr(AB.length, B.length))) };
  }
  if (v === 2) {   // ¿independientes?
    const ind = R.r() < 0.5; let pa, pb, pi, tries = 0;
    do { pa = R.int(2, 7) / 10; pb = R.int(2, 7) / 10; pi = ind ? rd(pa * pb, 4) : rd(pa * pb + R.pick([-0.06, -0.04, 0.04, 0.06, 0.1]), 4); } while ((pi <= 0 || pi > Math.min(pa, pb) || rd(pa + pb - pi, 4) > 1) && ++tries < 50);
    const pu = rd(pa + pb - pi, 4);
    return { q: T.ind_q(dc(pa), dc(pb), dc(pu)), kind: "choice", opts: T.sino, correct: ind ? 0 : 1, shuffle: false, sol: T.ind_s(dc(pa), dc(pb), dc(pu), dc(pi), dc(rd(pa * pb, 4)), ind) };
  }
  if (v === 3) {   // tabla de contingencia
    const [n1, n2, r1, r2] = R.pick(T.tablas), a = R.int(10, 60), b = R.int(10, 60), c = R.int(10, 60), d = R.int(10, 60), tot = a + b + c + d;
    const k = R.int(0, 3);   // 0 P(col1 | fila1) · 1 P(fila1 | col1) · 2 P(col1 | no fila1) · 3 P(fila1)
    const [num, den, txt] = [[a, a + b, T.p(n2, n1)], [a, a + c, T.p(n1, n2)], [c, c + d, T.p(n2, `\\overline{${n1}}`)], [a + b, tot, T.p1(n1)]][k];
    const table = `<table class="wa-tab" style="border-collapse:collapse;margin:6px 0"><tr><th></th><th style="padding:2px 10px">${r2[0]}</th><th style="padding:2px 10px">${r2[1]}</th><th style="padding:2px 10px">${T.total}</th></tr>`
      + `<tr><th style="padding:2px 10px;text-align:left">${r1[0]}</th><td align="center">${a}</td><td align="center">${b}</td><td align="center">${a + b}</td></tr>`
      + `<tr><th style="padding:2px 10px;text-align:left">${r1[1]}</th><td align="center">${c}</td><td align="center">${d}</td><td align="center">${c + d}</td></tr>`
      + `<tr><th style="padding:2px 10px;text-align:left">${T.total}</th><td align="center">${a + c}</td><td align="center">${b + d}</td><td align="center">${tot}</td></tr></table>`;
    return { q: T.tabla_q(tot, T.leyenda(n1, r1[0], n2, r2[0]), txt) + table, kind: "frac", ans: sfr(num, den), sol: T.tabla_s(k, txt, num, den, ftx(sfr(num, den))) };
  }
  if (v === 4) {   // al menos uno funciona
    const n = R.int(2, 3), ps = Array.from({ length: n }, () => R.pick([0.05, 0.1, 0.2, 0.25, 0.3])), all = ps.reduce((x, y) => x * y, 1), r = rd(1 - all, 4);
    const [ap, fem] = R.pick(T.aparatos);
    return { q: T.alarma_q(ap, fem, ps.map(p => dc(p))), kind: "num", ans: r, tol: 0.0006, sol: T.alarma_s(fem, ps.map(p => dc(p)).join(" · "), dc(all, 6), dc(r)) };
  }
  if (v === 5) {   // extracciones sin reemplazamiento (o con él)
    const [what, good, tot, fem] = R.pick(T.extrac), repl = R.r() < 0.3, f = repl ? sfr(good * good, tot * tot) : sfr(good * (good - 1), tot * (tot - 1));
    return { q: T.extr_q(what, repl, fem), kind: "frac", ans: f, sol: T.extr_s(good, tot, repl, ftx(f), fem) };
  }
  if (v === 6) {   // dos dados y una suma conocida
    const six = R.r() < 0.5, s = six ? R.int(7, 10) : 2 * R.int(2, 5), cases = []; for (let a = 1; a <= 6; a++) { const b = s - a; if (b >= 1 && b <= 6) cases.push([a, b]); }
    const fav = cases.filter(([a, b]) => six ? a === 6 || b === 6 : a === b);
    return { q: T.dados_q(s, six), kind: "frac", ans: sfr(fav.length, cases.length), sol: T.dados_s(s, cases.map(([a, b]) => `(${a},${b})`).join(", "), fav.length, cases.length, ftx(sfr(fav.length, cases.length))) };
  }
  const pa = R.int(1, 5) / 10, pb = R.int(1, 4) / 10;   // incompatibles frente a independientes
  return { q: T.incomp_q(dc(pa), dc(pb)), kind: "choice", opts: T.sino, correct: 1, shuffle: false, sol: T.incomp_s(dc(pa), dc(pb), dc(rd(pa * pb, 4))) };
});
// ── fin: ═════ Probabilidad condicionada e independencia (generador añadido) ═════
// ═════ Probabilidad de 2.º: binomial en contexto, normal (directos e inversos) y función de densidad ═════
const dd = (x, k = 4) => String(rd(x, k)).replace(".", WA.H.ds).replace("-", "−");
const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const bin = (n, p, k) => comb(n, k) * p ** k * (1 - p) ** (n - k);
def("m12.pr.binomial", (R, S) => {
  const [txt, p] = R.pick(S.m12.BI.ctx), pS = dd(p, 2), q = rd(1 - p, 2), qS = dd(q, 2), t = R.int(0, 4);
  if (t === 3) {   // ¿cuántas pruebas para que P(al menos un éxito) ≥ c?
    const c = R.pick([0.9, 0.95, 0.99]), n = Math.ceil(Math.log(1 - c) / Math.log(q) - 1e-12), cS = dd(c, 2);
    return { q: S.m12.BI.n_q(txt, cS), kind: "int", ans: n, sol: S.m12.BI.n_s(pS, qS, cS, dd(1 - c, 2), dd(Math.log(1 - c) / Math.log(q), 2), n, dd(q ** (n - 1), 4), dd(q ** n, 4)) };
  }
  if (t === 4) {   // media y desviación típica
    const n = R.pick([10, 20, 25, 50, 100]), mu = rd(n * p, 2), sd = rd(Math.sqrt(n * p * q), 2);
    return { q: S.m12.BI.ms_q(txt, n), kind: "fields", fields: [{ label: "μ", kind: "num", ans: mu, tol: 0.011 }, { label: "σ", kind: "num", ans: sd, tol: 0.011 }],
      sol: S.m12.BI.ms_s(n, pS, qS, dd(mu, 2), dd(n * p * q, 4), dd(sd, 2)) };
  }
  const n = R.int(5, 8);
  if (t === 0) {   // exactamente k
    const k = R.int(1, n - 1), v = bin(n, p, k);
    return { q: S.m12.BI.eq_q(txt, n, k), kind: "num", ans: rd(v, 4), tol: 0.0006, sol: S.m12.BI.eq_s(n, pS, k, comb(n, k), qS, n - k, dd(v)) };
  }
  // traducir: al menos, más de, como mucho, menos de
  const w = R.int(0, 3), k = w === 1 ? R.int(n - 3, n - 1) : w === 0 ? R.int(n - 2, n - 1) : R.int(1, 2);
  const ks = [[k, n], [k + 1, n], [0, k], [0, k - 1]][w];   // valores de X que cuentan
  let v = 0; for (let i = ks[0]; i <= ks[1]; i++) v += bin(n, p, i);
  const terms = []; for (let i = ks[0]; i <= ks[1]; i++) terms.push(`P(X = ${i}) = ${dd(bin(n, p, i))}`);
  return { q: S.m12.BI.tr_q(txt, n, S.m12.BI.w[w], k), kind: "num", ans: rd(v, 4), tol: 0.0006,
    sol: S.m12.BI.tr_s(n, pS, S.m12.BI.w[w], k, S.m12.BI.rel[w](k), ks[0] === ks[1] ? `X = ${ks[0]}` : `X = ${ks[0]}, …, ${ks[1]}`, terms.join("; "), dd(v)) };
});
// Normal: directos con la tabla y los tipos inversos de 2.º (valor que deja un porcentaje, intervalo centrado, μ y σ)
const ZT = [[0.9, 1.28], [0.95, 1.645], [0.975, 1.96], [0.99, 2.33], [0.8, 0.84], [0.7, 0.52]];
def("m12.pr.normal", (R, S) => {
  const [txt, mu, sd, u] = R.pick(S.m12.NO.ctx), t = R.int(0, 3);
  if (t === 0) {   // directo: P(X ≤ x), P(X ≥ x) o P(a ≤ X ≤ b)
    const w = R.int(0, 2), z1 = R.int(-20, 20) / 10 || 0.5, z2 = Math.min(z1 + R.int(5, 15) / 10, 2.9), x1 = rd(mu + z1 * sd, 2), x2 = rd(mu + z2 * sd, 2);
    const P = z => z >= 0 ? phi4(z) / 10000 : 1 - phi4(-z) / 10000, rel = w === 0 ? `X ≤ ${dd(x1, 2)}` : w === 1 ? `X ≥ ${dd(x1, 2)}` : `${dd(x1, 2)} ≤ X ≤ ${dd(x2, 2)}`;
    const v = w === 0 ? P(z1) : w === 1 ? 1 - P(z1) : P(z2) - P(z1), datos = [...new Set([Math.abs(z1)].concat(w === 2 ? [Math.abs(z2)] : []))].map(z => `P(Z ≤ ${dd(z, 2)}) = ${dd(phi4(z) / 10000)}`).join("; ");
    return { q: S.m12.NO.d_q(txt, dd(mu, 2), dd(sd, 2), rel, datos), kind: "num", ans: rd(v, 4), tol: 0.0006,
      sol: S.m12.NO.d_s(dd(mu, 2), dd(sd, 2), w, dd(x1, 2), dd(z1, 2), dd(x2, 2), dd(z2, 2), dd(P(z1)), dd(P(z2)), dd(v)) };
  }
  if (t === 1) {   // inverso: ¿qué valor supera solo el (1 − c)·100 %?
    const [c, z] = R.pick(ZT.slice(0, 4)), x = rd(mu + z * sd, 2), pct = Math.round((1 - c) * 1000) / 10;
    return { q: S.m12.NO.i_q(txt, dd(mu, 2), dd(sd, 2), dd(pct, 1), `P(Z ≤ ${dd(z, 3)}) ≈ ${dd(c, 3)}`), kind: "num", ans: x, tol: 0.06, sol: S.m12.NO.i_s(dd(pct, 1), dd(c, 3), dd(z, 3), dd(mu, 2), dd(sd, 2), dd(x, 2), u) };
  }
  if (t === 2) {   // intervalo centrado en la media que contiene el c %
    const [c, z] = R.pick([[0.9, 1.645], [0.95, 1.96], [0.99, 2.575]]), a = rd(mu - z * sd, 2), b = rd(mu + z * sd, 2), pc = Math.round(c * 100), tail = (1 + c) / 2;
    return { q: S.m12.NO.c_q(txt, dd(mu, 2), dd(sd, 2), pc, `P(Z ≤ ${dd(z, 3)}) ≈ ${dd(tail, 3)}`), kind: "fields", fields: [{ label: S.m12.NO.c_f[0], kind: "num", ans: a, tol: 0.06 }, { label: S.m12.NO.c_f[1], kind: "num", ans: b, tol: 0.06 }],
      sol: S.m12.NO.c_s(pc, dd((1 - c) / 2 * 100, 1), dd(tail, 3), dd(z, 3), dd(mu, 2), dd(sd, 2), dd(z * sd, 2), dd(a, 2), dd(b, 2)) };
  }
  // μ y σ a partir de dos porcentajes: P(X ≤ x1) = 1 − c1 y P(X ≥ x2) = 1 − c2
  const [[c1, z1], [c2, z2]] = R.shuffle(ZT.slice(0, 3)).slice(0, 2), x1 = rd(mu - z1 * sd, 1), x2 = rd(mu + z2 * sd, 1);
  const s2 = (x2 - x1) / (z1 + z2), m2 = x1 + z1 * s2;
  return { q: S.m12.NO.p_q(txt, dd((1 - c1) * 100, 1), dd(x1, 1), dd((1 - c2) * 100, 1), dd(x2, 1), `P(Z ≤ ${dd(z1, 3)}) ≈ ${dd(c1, 3)}; P(Z ≤ ${dd(z2, 3)}) ≈ ${dd(c2, 3)}`),
    kind: "fields", fields: [{ label: "μ", kind: "num", ans: rd(m2, 1), tol: 0.15 }, { label: "σ", kind: "num", ans: rd(s2, 1), tol: 0.15 }],
    sol: S.m12.NO.p_s(dd(x1, 1), dd(z1, 3), dd(x2, 1), dd(z2, 3), dd(x2 - x1, 2), dd(z1 + z2, 3), dd(s2, 1), dd(m2, 1)) };
});
// Función de densidad f(x) = k·xⁿ en [0, a]: k, P(X ≤ b) y la media
def("m12.pr.densidad", (R, S) => {
  const n = R.int(1, 2), a = R.int(1, 3), t = R.int(0, 2), k = F.make(n + 1, a ** (n + 1)), xn = n === 1 ? "x" : "x^{2}";
  const f = $(`f(x) = ${n === 1 ? "kx" : "kx^{2}"}`), I = $(`[0, ${a}]`);
  if (t === 0) return { q: S.m12.DE.k_q(f, I), kind: "frac", ans: k, sol: S.m12.DE.k_s(n, a, n + 1, a ** (n + 1), $(ftex(k))) };
  const kT = ftex(k);
  if (t === 1) {
    const b = F.make(R.int(1, 2 * a - 1), 2), v = F.make(b[0] ** (n + 1), b[1] ** (n + 1) * a ** (n + 1));
    return { q: S.m12.DE.p_q($(`f(x) = ${kT}${xn}`), I, $(ftex(b))), kind: "frac", ans: v, sol: S.m12.DE.p_s($(`P(X \\le ${ftex(b)}) = \\int_{0}^{${ftex(b)}} ${kT}${xn}\\,dx = ${kT}\\left[\\frac{x^{${n + 1}}}{${n + 1}}\\right]_{0}^{${ftex(b)}}`), $(ftex(v))) };
  }
  const m = F.make((n + 1) * a, n + 2);
  return { q: S.m12.DE.m_q($(`f(x) = ${kT}${xn}`), I), kind: "frac", ans: m, sol: S.m12.DE.m_s($(`\\mu = \\int_{0}^{${a}} x\\cdot ${kT}${xn}\\,dx = ${kT}\\left[\\frac{x^{${n + 2}}}{${n + 2}}\\right]_{0}^{${a}}`), $(ftex(m))) };
});
})();
