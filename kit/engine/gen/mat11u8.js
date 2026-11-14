/* WikiAula — Matemáticas, Grado 11 · Unidad 8: Funciones.
   Textos: i18n/<lang>/mat11u8.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, lin, polyHtml, polyText } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const xm = a => a === 0 ? "x" : a > 0 ? `x − ${a}` : `x + ${-a}`;   // x − a
const am = a => a === 0 ? "−x" : `${neg(a)} − x`;                   // a − x
const pw = s => s === "x" ? "x" : `(${s})`;   // (x − 2)² pero x²; también 1/x, √x, ln x en vez de «1/(x)»
const sg = (c, t) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 && t ? "" : Math.abs(c)) + t : "";
const pick4 = (R, ok, alts) => { const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok).slice(0, 3)]); return { opts, correct: opts.indexOf(ok) }; };

def("m11.fu.dominio", (R, S, H) => {
  const a = R.int(-6, 6), k = R.int(0, 6), A = neg(a);
  const I = { menos: `ℝ − {${A}}`, cerr: `[${A}, +∞)`, ab: `(${A}, +∞)`, izq: `(−∞, ${A}]`, izqab: `(−∞, ${A})`, R: "ℝ" };
  let f, ok, alts;
  if (k === 0) { f = `${R.int(1, 9)}/${pw(xm(a))}`; ok = I.menos; alts = [I.ab, I.cerr, I.R]; }
  else if (k === 1) { f = `√${pw(xm(a))}`; ok = I.cerr; alts = [I.ab, I.izq, I.menos]; }
  else if (k === 2) { f = `√(${am(a)})`; ok = I.izq; alts = [I.cerr, I.izqab, I.menos]; }
  else if (k === 3) { f = `ln(${xm(a)})`; ok = I.ab; alts = [I.cerr, I.menos, I.R]; }
  else if (k === 4) { const b = R.int(1, 6); f = `${pw(lin(1, R.int(-5, 5)))}/(x² − ${b * b})`; ok = `ℝ − {−${b}, ${b}}`; alts = [`ℝ − {${b}}`, `(${b}, +∞)`, "ℝ", `ℝ − {${b * b}}`]; }
  else if (k === 5) { const b = R.int(1, 6); f = `${R.int(1, 9)}/(x² + ${b * b})`; ok = "ℝ"; alts = [`ℝ − {−${b}, ${b}}`, `ℝ − {${b}}`, `(${b * b}, +∞)`]; }
  else { f = polyHtml([rnz(R, -4, 4), R.int(-6, 6), R.int(-9, 9), R.int(-9, 9)]); ok = "ℝ"; alts = ["[0, +∞)", "ℝ − {0}", "(0, +∞)"]; }
  return { q: S.m11.fu_dom_q(f), kind: "choice", ...pick4(R, ok, alts), sol: S.m11.fu_dom_s(k, A, ok) };
});

// Dominios de 1.º (Mates 10 usa m11.fu.dominio, que no se toca): varias condiciones, inecuaciones de 2.º grado y racionales.
def("m11.fu.dominio2", (R, S, H) => {
  const T = S.m11.fd_t, k = R.int(0, 3), ivN = (a, ca, b, cb) => `${a === -Infinity ? "(−∞" : (ca ? "[" : "(") + neg(a)}, ${b === Infinity ? "+∞)" : neg(b) + (cb ? "]" : ")")}`;
  if (k === 0) {   // √((x − a)/(x − b)): cociente ≥ 0, el cero del denominador nunca entra
    let a, b; do { a = R.int(-5, 5); b = R.int(-5, 5); } while (a === b);
    const lo = Math.min(a, b), hi = Math.max(a, b), ca = lo === a, cb = hi === a;   // el cero del numerador entra
    const ok = `${ivN(-Infinity, false, lo, ca)} ∪ ${ivN(hi, cb, Infinity, false)}`;
    const alts = [`${ivN(-Infinity, false, lo, true)} ∪ ${ivN(hi, true, Infinity, false)}`, ivN(lo, ca, hi, cb), `${ivN(-Infinity, false, lo, false)} ∪ ${ivN(hi, false, Infinity, false)}`, `ℝ − {${neg(b)}}`];
    return { q: S.m11.fu_dom_q(`√((${xm(a)})/(${xm(b)}))`), kind: "choice", ...pick4(R, ok, alts), sol: T.s0(`(${xm(a)})/(${xm(b)})`, neg(a), neg(b), neg(lo), neg(hi), ok) };
  }
  if (k === 1) {   // ln(x² − b²): x² > b²
    const b = R.int(1, 6), ok = `${ivN(-Infinity, false, -b, false)} ∪ ${ivN(b, false, Infinity, false)}`;
    const alts = [ivN(-b, false, b, false), `${ivN(-Infinity, false, -b, true)} ∪ ${ivN(b, true, Infinity, false)}`, ivN(b, false, Infinity, false), `ℝ − {${neg(-b)}, ${b}}`];
    return { q: S.m11.fu_dom_q(`ln(x² − ${b * b})`), kind: "choice", ...pick4(R, ok, alts), sol: T.s1(b * b, b, ok) };
  }
  if (k === 2) {   // √(x² − px) = √(x(x − p)): fuera de las raíces, con ellas
    const p = rnz(R, -6, 6), lo = Math.min(0, p), hi = Math.max(0, p);
    const ok = `${ivN(-Infinity, false, lo, true)} ∪ ${ivN(hi, true, Infinity, false)}`;
    const alts = [ivN(lo, true, hi, true), `${ivN(-Infinity, false, lo, false)} ∪ ${ivN(hi, false, Infinity, false)}`, ivN(Math.abs(p), true, Infinity, false)];
    return { q: S.m11.fu_dom_q(`√(x²${sg(-p, "x")})`), kind: "choice", ...pick4(R, ok, alts), sol: T.s2(`x²${sg(-p, "x")}`, `x(${xm(p)})`, neg(lo), neg(hi), ok) };
  }
  // √(x − a)/(x − b): radicando ≥ 0 y denominador ≠ 0 (intersección)
  const a = R.int(-5, 3), b = a + R.int(1, 6);
  const ok = `${ivN(a, true, b, false)} ∪ ${ivN(b, false, Infinity, false)}`;
  const alts = [ivN(a, true, Infinity, false), `ℝ − {${neg(b)}}`, `${ivN(a, false, b, false)} ∪ ${ivN(b, false, Infinity, false)}`, ivN(b, false, Infinity, false)];
  return { q: S.m11.fu_dom_q(`√${pw(xm(a))}/(${xm(b)})`), kind: "choice", ...pick4(R, ok, alts), sol: T.s3(neg(a), neg(b), ok) };
});

def("m11.fu.recorrido", (R, S, H) => {
  if (R.r() < 0.3) {   // despejando x: y = (ax + b)/(x − c) → x = (cy + b)/(y − a): todo salvo y = a
    let a, b, c; do { a = rnz(R, -4, 4); b = R.int(-6, 6); c = R.int(-4, 4); } while (a * c + b === 0);
    const ok = `ℝ − {${neg(a)}}`, alts = [`ℝ − {${neg(c)}}`, "ℝ", `(${neg(a)}, +∞)`, `ℝ − {${neg(-b)}}`];
    const ax = a === 1 ? "x" : a === -1 ? "−x" : `${neg(a)}x`, ay = a === 1 ? "x" : a === -1 ? "−x" : `${neg(a)}x`;
    const yc = c === 0 ? "xy" : `y(${xm(c)})`, cy = c === 1 ? "y" : c === -1 ? "−y" : c ? `${neg(c)}y` : "";
    const num = `${cy}${b ? (cy ? sg(b, "") : neg(b)) : (cy ? "" : "0")}`;
    return { q: S.m11.fu_rec_q(H.frac(`${ax}${sg(b, "")}`, xm(c))), kind: "choice", ...pick4(R, ok, alts),
      sol: S.m11.fu_rec_d(`y = ${H.frac(`${ax}${sg(b, "")}`, xm(c))}`, `${yc} = ${ay}${sg(b, "")}`, `x(y ${a < 0 ? "+" : "−"} ${Math.abs(a)}) = ${num}`, `x = ${H.frac(num, `y ${a < 0 ? "+" : "−"} ${Math.abs(a)}`)}`, neg(a), ok) };
  }
  const h = R.int(-5, 5), v = R.int(-6, 6), k = R.int(0, 4), V = neg(v);
  const I = { sube: `[${V}, +∞)`, baja: `(−∞, ${V}]`, ab: `(${V}, +∞)`, menos: `ℝ − {${V}}`, R: "ℝ" };
  let f, ok, alts;
  if (k === 0) { f = `${pw(xm(h))}²${sg(v, "")}`; ok = I.sube; alts = [I.baja, I.ab, I.R]; }
  else if (k === 1) { f = `−${pw(xm(h))}²${sg(v, "")}`; ok = I.baja; alts = [I.sube, I.menos, I.R]; }
  else if (k === 2) { f = `√${pw(xm(h))}${sg(v, "")}`; ok = I.sube; alts = [`[${neg(h)}, +∞)`, I.ab, I.R]; }
  else if (k === 3) { f = `e<sup>x</sup>${sg(v, "")}`; ok = I.ab; alts = [I.sube, I.R, "(0, +∞)"]; }
  else { f = `1/${pw(xm(h))}${sg(v, "")}`; ok = I.menos; alts = [`ℝ − {${neg(h)}}`, I.ab, I.R]; }
  const z = v ? `0 ${v < 0 ? "−" : "+"} ${Math.abs(v)} = ${V}` : "0";   // «0 + 4 = 4», no «0 + (4)»
  return { q: S.m11.fu_rec_q(f), kind: "choice", ...pick4(R, ok, alts), sol: S.m11.fu_rec_s(k, V, z, pw(xm(h))) };
});

def("m11.fu.simetria", (R, S, H) => {
  if (R.r() < 0.4) {   // no polinómicas: racionales, valor absoluto, exponenciales
    const a = R.int(1, 5), b = R.int(1, 9);
    const [f, fm, k] = R.pick([
      [`${a === 1 ? "" : a}x/(x² + ${b})`, `${a === 1 ? "" : a}(−x)/((−x)² + ${b}) = −${a === 1 ? "" : a}x/(x² + ${b})`, 1],
      [`x²/(x² + ${b})`, `(−x)²/((−x)² + ${b}) = x²/(x² + ${b})`, 0],
      [`x² + ${a === 1 ? "" : a}|x|`, `(−x)² + ${a === 1 ? "" : a}|−x| = x² + ${a === 1 ? "" : a}|x|`, 0],
      [`${a}/x`, `${a}/(−x) = −${a}/x`, 1],
      [`x/(x − ${b})`, `(−x)/(−x − ${b}) = x/(x + ${b})`, 2],
      [`e<sup>x</sup> + e<sup>−x</sup>`, `e<sup>−x</sup> + e<sup>x</sup>`, 0],
      [`x³ + |x|`, `−x³ + |x|`, 2]]);
    return { q: S.m11.fu_sim_q(f), kind: "choice", opts: S.m11.fu_sim_o, correct: k, shuffle: false, sol: S.m11.fu_sim_s2(fm, k) };
  }
  const k = R.int(0, 2), a = rnz(R, -5, 5), b = rnz(R, -5, 5), c = rnz(R, -9, 9);
  let cs;
  if (k === 0) cs = R.pick([[a, 0, b, 0, c], [a, 0, c], [a, 0, b, 0, 0]]);
  else if (k === 1) cs = R.pick([[a, 0, b, 0], [a, 0, 0, 0, b, 0], [a, 0, 0]].map(x => x.length === 3 ? [a, 0] : x));
  else cs = R.pick([[a, b, c], [a, 0, b, c], [a, b, 0, 0], [a, 0, 0, b]]);
  const deg = cs.length - 1, mcs = cs.map((x, i) => (deg - i) % 2 ? -x : x);   // f(−x)
  return { q: S.m11.fu_sim_q(polyHtml(cs)), kind: "choice", opts: S.m11.fu_sim_o, correct: k, shuffle: false,
    sol: S.m11.fu_sim_s(k, polyHtml(mcs)) };
});

def("m11.fu.comp", (R, S, H) => {
  const T = S.m11.fc_t, t0 = R.r();
  if (t0 < 0.2) {   // descomponer h(x) = (px + q)ⁿ como g(f(x))
    const p = R.pick([2, 3, 5, -2]), q = rnz(R, -6, 6), n = R.pick([3, 4, 5]), inn = lin(p, q);
    const ok = T.pair(inn, `x<sup>${n}</sup>`), opts0 = [ok, T.pair(`x<sup>${n}</sup>`, inn), T.pair(`${inn}`, `${n}x`), T.pair(lin(p, 0), `(x${sg(q, "")})<sup>${n}</sup>`)];
    const opts = R.shuffle([...new Set(opts0)]);
    return { q: T.q0(`(${inn})<sup>${n}</sup>`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s0(inn, n) };
  }
  if (t0 < 0.35) {   // dominio de g ∘ f con f(x) = x − a y g(x) = √x
    const a = R.int(-6, 6), ok = `[${neg(a)}, +∞)`, opts = R.shuffle([ok, "[0, +∞)", `(${neg(a)}, +∞)`, "ℝ"].filter((v, i, A) => A.indexOf(v) === i));
    return { q: T.q1(xm(a)), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s1(xm(a), neg(a), ok) };
  }
  const a = rnz(R, -4, 4), b = R.int(-6, 6), c = R.int(-5, 5), k = R.int(0, 3);
  if (a === 1 && b === 0) return null;   // f(x) = x no tiene nada que componer
  const f = lin(a, b), g = polyHtml([1, 0, c]), t = R.int(-3, 3);
  if (k === 0) { const gt = t * t + c; return { q: S.m11.fu_cn_q("f ∘ g", f, g, neg(t)), kind: "int", ans: a * gt + b, sol: S.m11.fu_cn_s("g", neg(t), neg(gt), "f", neg(a * gt + b)) }; }
  if (k === 1) { const ft = a * t + b; return { q: S.m11.fu_cn_q("g ∘ f", f, g, neg(t)), kind: "int", ans: ft * ft + c, sol: S.m11.fu_cn_s("f", neg(t), neg(ft), "g", neg(ft * ft + c)) }; }
  const cs = k === 2 ? [a, 0, a * c + b] : [a * a, 2 * a * b, b * b + c];
  return { q: S.m11.fu_cx_q(k === 2 ? "f ∘ g" : "g ∘ f", f, g), kind: "expr", ans: polyText(cs), ansHtml: polyHtml(cs), hint: S.m11.fu_hint,
    sol: k === 2 ? S.m11.fu_cx_s(`f(g(x)) = f(${g})${c ? ` = ${a === 1 ? "" : a === -1 ? "−" : neg(a)}(${g})${sg(b, "")}` : ""}`, polyHtml(cs))
                 : S.m11.fu_cx_s(`g(f(x)) = g(${f}) = (${f})²${sg(c, "")}`, polyHtml(cs)) };
});

def("m11.fu.inversa", (R, S, H) => {
  const k = R.int(0, 4), a = R.pick([-4, -3, -2, 2, 3, 4, 5]), b = rnz(R, -6, 6);
  if (k === 0 && R.r() < 0.5) {   // valor de la inversa
    const t = R.int(-4, 5), y = a * t + b;
    return { q: S.m11.fu_inv_v_q(lin(a, b), neg(y)), kind: "int", ans: t, sol: S.m11.fu_inv_v_s(lin(a, b), neg(y), neg(t)) };
  }
  let f, ans, html, cc = 0;
  if (k === 0) { f = lin(a, b); ans = `(x-(${b}))/(${a})`; html = a > 0 ? `(${xm(b)})/${a}` : `(${am(b)})/${-a}`; }
  else if (k === 1) { f = a < 0 ? `−(${xm(-b)})/${-a}` : `(${xm(-b)})/${a}`; ans = `${a}*x-(${b})`; html = lin(a, -b); }
  else if (k === 2) { const c = cc = R.int(-3, 3); f = `e<sup>x</sup>${sg(c, "")}`; ans = `ln(x-(${c}))`; html = `ln(${xm(c)})`; }
  else if (k === 3) { const c = cc = R.int(-4, 4); f = `ln x${sg(c, "")}`; ans = `e^(x-(${c}))`; html = c ? `e<sup>${xm(c)}</sup>` : "e<sup>x</sup>"; }
  else { f = `${neg(a)}/(${xm(b)})`; ans = `${a}/x+(${b})`; html = `${neg(a)}/x${sg(b, "")}`; }
  // la solución con los números del ejercicio (antes, con letras)
  let st;
  if (k === 0) st = `y = ${lin(a, b)} → ${a === -1 ? "−x" : `${neg(a)}x`} = y${sg(-b, "")} → x = ${a > 0 ? `(y${sg(-b, "")})/${a}` : `(${neg(b)} − y)/${-a}`}`.replace("(y)/", "y/");
  else if (k === 1) { const c = -b; st = `y = ${f} → ${a < 0 ? `−${-a}y` : `${a}y`} = ${xm(c)} → x = ${a < 0 ? `−${-a}y` : `${a}y`}${sg(c, "")}`; }
  else if (k === 2) { const c = cc; st = `y = ${f} → e<sup>x</sup> = ${c ? `y${sg(-c, "")}` : "y"} → x = ln(${c ? `y${sg(-c, "")}` : "y"})`; }
  else if (k === 3) { const c = cc; st = `y = ${f} → ln x = ${c ? `y${sg(-c, "")}` : "y"} → x = e<sup>${c ? `y${sg(-c, "")}` : "y"}</sup>`; }
  else st = `y = ${f} → ${xm(b)} = ${neg(a)}/y → x = ${neg(a)}/y${sg(b, "")}`;
  return { q: S.m11.fu_inv_q(f), kind: "expr", ans, ansHtml: html, hint: S.m11.fu_hint, sol: S.m11.fu_inv_s2(st, html) };
});

const BASES = [["x²", s => `(${s})²`], ["|x|", s => `|${s}|`], ["√x", s => `√(${s})`], ["x³", s => `(${s})³`], ["1/x", s => `1/(${s})`]];
const EXPB = ["e<sup>x</sup>", s => `e<sup>${s}</sup>`];
// Bases válidas en cada rama de opciones (para que solo haya una respuesta correcta y la gráfica cambie):
// −f(x): sin las impares (x³, 1/x), donde −f(x) = f(−x); f(−x): ni pares (no cambian) ni impares → √x o eˣ;
// c · f(x) y f(cx): sin |x|, donde |cx| = c|x|.
const TR2 = [[0, 1, 2], [2, 5], [0, 2, 3, 4], [0, 2, 3, 4]];
def("m11.fu.transf", (R, S, H) => {
  let [bn, bf] = R.pick(BASES);
  if (R.r() < 0.2) {   // describir c · f(x − h) + v (lo pedía B en la ronda 1): estiramiento, traslación horizontal y vertical
    const [bn2, bf2] = R.pick([BASES[0], BASES[2], BASES[1]]), c = R.pick([2, 3, -2, -1]);
    let h, v; do { h = rnz(R, -4, 4); v = rnz(R, -4, 4); } while (!h);
    const g = `${c === -1 ? "−" : c === 1 ? "" : neg(c)}${bf2(xm(h))}${sg(v, "")}`.replace("(x)", "x");
    const T = S.m11.ft_t, ok = T.d(c, h, v), opts0 = [ok, T.d(c, -h, v), T.d(c, h, -v), T.d(c === -1 ? 2 : -c, h, v)];
    const opts = R.shuffle([...new Set(opts0)]);
    return { q: S.m11.fu_tr2_q(bn2, g), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s(c, h, v) };
  }
  if (R.r() < 0.65) {
    let h, v;
    do { h = R.int(-5, 5); v = R.int(-5, 5); } while (!h && !v);
    return { q: S.m11.fu_tr_q(bn, `${bf(xm(h)).replace("(x)", "x")}${sg(v, "")}`), kind: "fields", fields: [{ label: S.m11.fu_tr_f[0], ans: h }, { label: S.m11.fu_tr_f[1], ans: v }],
      sol: S.m11.fu_tr_s(neg(h), neg(v)) };
  }
  const k = R.int(0, 3), c = R.int(2, 4), bi = R.pick(TR2[k]);
  [bn, bf] = bi === 5 ? EXPB : BASES[bi];
  const g = [`−${bf("x")}`, bf("−x"), bn === "1/x" ? `${c}/(x)` : `${c} · ${bf("x")}`, bf(`${c}x`)][k].replace(/\(x\)/g, "x");
  return { q: S.m11.fu_tr2_q(bn, g), kind: "choice", opts: S.m11.fu_tr2_o(c), correct: k, shuffle: false, sol: S.m11.fu_tr2_s[k] };
});

def("m11.fu.tipo", (R, S, H) => {
  const k = R.int(0, 5), b = R.int(-6, 6), c = R.int(2, 5), tr = R.r() < 0.5;
  let a; do a = rnz(R, -5, 5); while (k === 0 && a === 1 && b === 0);   // nunca f(x) = x
  const v = rnz(R, -4, 4);
  // la mitad, transformadas (obligan a mirar la estructura): 2^(x − 1) + 3, ln(2x), 1/(x − 2) + 1, 3√(x + 1)
  const f = [lin(a, b), polyHtml([a, b, R.int(-5, 5)]),
    tr ? `${c}<sup>${xm(b)}</sup>${sg(v, "")}` : `${c}<sup>x</sup>`,
    tr ? `ln(${c}x)${sg(v, "")}` : R.r() < 0.5 ? `log<sub>${c}</sub> x` : `ln${xm(b) === "x" ? " x" : `(${xm(b)})`}`,
    tr ? `${neg(a)}/(${xm(b || 2)})${sg(v, "")}` : `${neg(a)}/x`,
    tr ? `${c}√(${xm(b || -1)})${sg(v, "")}` : `√${pw(xm(b))}`][k];
  return { q: S.m11.fu_tipo_q(f), kind: "choice", opts: S.m11.fu_tipo_o, correct: k, shuffle: false, sol: S.m11.fu_tipo_s[k] };
});
})();
