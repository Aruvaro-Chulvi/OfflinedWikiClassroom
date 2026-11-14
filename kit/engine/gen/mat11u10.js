/* WikiAula — Matemáticas, Grado 11 · Unidad 10: Derivadas.
   Textos: i18n/<lang>/mat11u10.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, lin, polyHtml, polyText, sup, F } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const cf = c => c === 1 ? "" : c === -1 ? "−" : neg(c);            // coeficiente delante de una letra
const cfs = c => { const s = cf(c); return s && s !== "−" ? s + " " : s; };   // 5 sen x
const sg = (c, t) => c ? (c < 0 ? " − " : " + ") + (Math.abs(c) === 1 && t ? "" : Math.abs(c)) + t : "";
const xp = n => n === 0 ? "" : n === 1 ? "x" : "x" + sup(n);
const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
const dpoly = cs => cs.slice(0, -1).map((c, i) => c * (cs.length - 1 - i));

def("m11.de.tvm", (R, S, H) => {
  let a, b;
  do { a = R.int(-3, 3); b = R.int(-2, 5); } while (b <= a);
  if (R.r() < 0.35) {   // velocidad media
    const p = R.pick([2, 3, 4, 5]), t1 = R.int(0, 3), t2 = t1 + R.int(1, 4), v = p * (t1 + t2);
    return { q: S.m11.de_vm_q(p, t1, t2), kind: "num", ans: v, sol: S.m11.de_vm_s(p, t1, t2, p * t1 * t1, p * t2 * t2, v) };
  }
  const cs = [rnz(R, -3, 3), R.int(-6, 6), R.int(-6, 6)], fa = ev(cs, a), fb = ev(cs, b), v = F.make(fb - fa, b - a);
  return { q: S.m11.de_tvm_q(polyHtml(cs), neg(a), neg(b)), kind: "frac", ans: v, sol: S.m11.de_tvm_s(neg(a), neg(b), neg(fa), neg(fb), b - a, F.html(v, H)) };
});

def("m11.de.def", (R, S, H) => {
  const p = rnz(R, -3, 3), q = R.int(-6, 6), r = R.int(-6, 6), a = R.int(-3, 3);
  const cs = [p, q, r], v = 2 * p * a + q, fa = ev(cs, a);
  // f(a + h) desarrollado: f(a) + (2pa + q)h + ph²
  const ah = a ? `(${a < 0 ? `−${-a}` : a} + h)` : "h", pa = p === 1 ? "" : p === -1 ? "−" : neg(p);
  const sub = `${pa}${ah}²${q ? ` ${q < 0 ? "−" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}${ah}` : ""}${r ? ` ${r < 0 ? "−" : "+"} ${Math.abs(r)}` : ""}`;
  const hv = (c, t) => c ? `${c < 0 ? " − " : " + "}${Math.abs(c) === 1 && t ? "" : Math.abs(c)}${t}` : "";
  const exp = `${neg(fa)}${hv(v, "h")}${hv(p, "h²")}`.replace(/^0 \+ /, "").replace(/^0 − /, "−");
  const dif = `${v ? `${neg(v)}h` : ""}${v ? hv(p, "h²") : `${p === 1 ? "" : p === -1 ? "−" : neg(p)}h²`}`;
  return { q: S.m11.de_def_q(polyHtml(cs), neg(a)), kind: "int", ans: v,
    sol: S.m11.de_def_s2(neg(a), sub, exp, neg(fa), dif, `${neg(v)}${sg(p, "h")}`.replace(/^0 \+ /, "").replace(/^0 − /, "−"), neg(v)) };
});

def("m11.de.poli", (R, S, H) => {
  const deg = R.int(2, 4), cs = [rnz(R, -5, 5), ...Array.from({ length: deg }, () => R.int(-7, 7))], d = dpoly(cs);
  return { q: S.m11.de_q(`f(x) = ${polyHtml(cs)}`), kind: "expr", ans: polyText(d), ansHtml: polyHtml(d), hint: S.m11.de_hint, sol: S.m11.de_poli_s(polyHtml(d)) };
});

const RULES = [
  R => { const a = rnz(R, -5, 5), n = R.int(2, 7); return { f: `${cf(a)}${xp(n)}`, d: `${cf(a * n)}${xp(n - 1)}`, ans: `${a * n}*x^${n - 1}`, k: 0 }; },
  R => { const a = R.int(1, 5) * 2; return { f: `${cf(a)}√x`, d: `${a / 2}/√x`.replace(/^1\//, "1/"), ans: `${a}/(2*sqrt(x))`, k: 1 }; },
  R => { const a = rnz(R, -5, 5), n = R.int(1, 3); return { f: `${neg(a)}/${xp(n)}`, d: `${neg(-a * n)}/${xp(n + 1)}`, ans: `${-a * n}/x^${n + 1}`, k: 2 }; },
  R => { const a = rnz(R, -5, 5), b = rnz(R, -5, 5); return { f: `${cf(a)}e<sup>x</sup>${sg(b, " ln x")}`.replace(/([+−])  ln x/, "$1 ln x"), d: `${cf(a)}e<sup>x</sup>${sg(b, "")}/x`.replace(/([+−]) \/x/, "$1 1/x"), ans: `${a}*e^x+(${b})/x`, k: 3 }; },
  R => { const a = rnz(R, -5, 5), b = rnz(R, -5, 5); return { f: `${cfs(a)}sen x${sg(b, " cos x")}`.replace(/([+−])  cos/, "$1 cos"), d: `${cfs(a)}cos x${sg(-b, " sen x")}`.replace(/([+−])  sen/, "$1 sen"), ans: `${a}*cos(x)-(${b})*sin(x)`, k: 4 }; },
  R => { const n = R.int(2, 4); return { f: `${xp(n)} · e<sup>x</sup>`, d: `${n}${xp(n - 1)}e<sup>x</sup> + ${xp(n)}e<sup>x</sup>`, ans: `${n}*x^${n - 1}*e^x+x^${n}*e^x`, k: 5,
    st: `u = ${xp(n)}, u′ = ${n}${xp(n - 1)}; v = e<sup>x</sup>, v′ = e<sup>x</sup>` }; },
  R => { const n = R.int(1, 3); return { f: `${xp(n)} · ln x`, d: n === 1 ? "ln x + 1" : `${n}${xp(n - 1)} ln x + ${xp(n - 1)}`, ans: `${n}*x^${n - 1}*ln(x)+x^${n - 1}`, k: 5,
    st: `u = ${xp(n)}, u′ = ${n === 1 ? "1" : n + xp(n - 1)}; v = ln x, v′ = 1/x`, pre: `${n === 1 ? "1" : n + xp(n - 1)} · ln x + ${xp(n)} · 1/x` }; },
  R => { const n = R.int(1, 3); return { f: `${xp(n)} · sen x`, d: `${n === 1 ? "" : n}${xp(n - 1)}${n === 1 ? "" : " "}sen x + ${xp(n)} cos x`, ans: `${n}*x^${n - 1}*sin(x)+x^${n}*cos(x)`, k: 5,
    st: `u = ${xp(n)}, u′ = ${n === 1 ? "1" : n + xp(n - 1)}; v = sen x, v′ = cos x` }; },
  R => { let a, b, c, d; do { a = rnz(R, -4, 4); b = R.int(-6, 6); c = rnz(R, -3, 3); d = R.int(-6, 6); } while (a * d - b * c === 0);
    const u = lin(a, b), v = lin(c, d);
    return { f: `(${u}) / (${v})`, d: `${neg(a * d - b * c)} / (${v})²`, ans: `(${a * d - b * c})/(${c}*x+(${d}))^2`, k: 6,
      st: `u = ${u}, u′ = ${neg(a)}; v = ${v}, v′ = ${neg(c)}`, pre: `[${neg(a)}(${v}) − (${u}) · ${c < 0 ? `(${neg(c)})` : c}] / (${v})²` }; },
  R => ({ f: "e<sup>x</sup> / x", d: "e<sup>x</sup>(x − 1) / x²", ans: "e^x*(x-1)/x^2", k: 6, st: "u = e<sup>x</sup>, u′ = e<sup>x</sup>; v = x, v′ = 1", pre: "(e<sup>x</sup> · x − e<sup>x</sup> · 1) / x²" }),
  // logaritmo en otra base: log_b x = ln x / ln b
  R => { const b = R.pick([2, 3, 10]), a = rnz(R, -4, 4); return { f: `${cfs(a)}log${b === 10 ? "" : `<sub>${b}</sub>`} x`, d: `${neg(a)} / (x ln ${b})`, ans: `${a}/(x*ln(${b}))`, k: 7 }; },
  // sen x / xⁿ: se escribe la regla del cociente y, si n ≥ 2, se simplifica x^(n−1) (como recomienda la lección)
  R => { const n = R.int(1, 3); return { f: `sen x / ${xp(n)}`, pre: n === 1 ? null : `(${xp(n)} cos x − ${n}${xp(n - 1)} sen x) / ${xp(2 * n)}`, d: n === 1 ? "(x cos x − sen x) / x²" : `(x cos x − ${n} sen x) / ${xp(n + 1)}`, ans: `(x*cos(x)-${n}*sin(x))/x^${n + 1}`, k: 6 }; },
];
def("m11.de.reglas", (R, S, H) => {
  const t = R.pick(RULES)(R);
  return { q: S.m11.de_q(`f(x) = ${t.f}`), kind: "expr", ans: t.ans, ansHtml: t.d, hint: S.m11.de_hint, sol: S.m11.de_rg_s(t.k, t.d, t.pre, t.st) };
});

// Cada caso con la función de fuera (o) y su derivada (od), escritas en u, para que la solución las muestre.
const CHAIN = [
  R => { const a = rnz(R, -4, 5), b = rnz(R, -6, 6), n = R.int(2, 6), u = lin(a, b); return { f: `(${u})${sup(n)}`, u, du: neg(a), o: `u${sup(n)}`, od: `${n}u${n - 1 === 1 ? "" : sup(n - 1)}`, d: `${neg(n * a)}(${u})${n - 1 === 1 ? "" : sup(n - 1)}`, ans: `${n * a}*(${a}*x+(${b}))^${n - 1}` }; },
  R => { const c = rnz(R, -5, 5), n = R.int(2, 5), u = `x²${sg(c, "")}`; return { f: `(${u})${sup(n)}`, u, du: "2x", o: `u${sup(n)}`, od: `${n}u${n - 1 === 1 ? "" : sup(n - 1)}`, d: `${2 * n}x(${u})${n - 1 === 1 ? "" : sup(n - 1)}`, ans: `${2 * n}*x*(x^2+(${c}))^${n - 1}` }; },
  R => { const a = rnz(R, -4, 5), b = R.int(-5, 5), u = lin(a, b); return { f: `e<sup>${u}</sup>`, u, du: neg(a), o: "e<sup>u</sup>", od: "e<sup>u</sup>", d: `${cf(a)}e<sup>${u}</sup>`, ans: `${a}*e^(${a}*x+(${b}))` }; },
  R => { const k = rnz(R, -3, 3), u = `${cf(k)}x²`; return { f: `e<sup>${u}</sup>`, u, du: `${cf(2 * k)}x`, o: "e<sup>u</sup>", od: "e<sup>u</sup>", d: `${cf(2 * k)}x e<sup>${u}</sup>`, ans: `${2 * k}*x*e^(${k}*x^2)` }; },
  R => { const a = R.int(1, 5), b = R.int(-5, 5), u = lin(a, b); return { f: `ln(${u})`, u, du: String(a), o: "ln u", od: "1/u", d: `${a} / (${u})`, ans: `${a}/(${a}*x+(${b}))` }; },
  R => { const c = R.int(1, 9), u = `x² + ${c}`; return { f: `ln(${u})`, u, du: "2x", o: "ln u", od: "1/u", d: `2x / (${u})`, ans: `2*x/(x^2+${c})` }; },
  R => { const a = R.int(2, 6), u = `${a}x`; return { f: `sen(${u})`, u, du: String(a), o: "sen u", od: "cos u", d: `${a} cos(${u})`, ans: `${a}*cos(${a}*x)` }; },
  R => { const a = R.int(2, 6), u = `${a}x`; return { f: `cos(${u})`, u, du: String(a), o: "cos u", od: "−sen u", d: `−${a} sen(${u})`, ans: `-${a}*sin(${a}*x)` }; },
  R => { const c = R.int(-4, 4), u = `x²${sg(c, "")}`; return { f: `sen(${u})`, u, du: "2x", o: "sen u", od: "cos u", d: `2x cos(${u})`, ans: `2*x*cos(x^2+(${c}))` }; },
  R => { const a = R.int(1, 6), b = R.int(-5, 5), u = lin(a, b); return { f: `√(${u})`, u, du: String(a), o: "√u", od: "1/(2√u)", d: `${a} / (2√(${u}))`, ans: `${a}/(2*sqrt(${a}*x+(${b})))` }; },
  R => ({ f: "sen² x", u: "sen x", du: "cos x", o: "u² (sen² x = (sen x)²)", od: "2u", d: "2 sen x cos x", ans: "2*sin(x)*cos(x)" }),
];
def("m11.de.cadena", (R, S, H) => {
  const t = R.pick(CHAIN)(R);
  return { q: S.m11.de_q(`f(x) = ${t.f}`), kind: "expr", ans: t.ans, ansHtml: t.d, hint: S.m11.de_hint, sol: S.m11.de_ch_s2(t.o, t.od, t.u, t.du, t.d) };
});

// Punto-pendiente sin «y − (−2)», «(x − 0)», «y − 0» ni «1(…)»: y + 2 = 4x, y = −4(x + 1), y − 6 = −x, y − 4 = x + 1
function pointSlope(a, fa, m) {
  const lhs = fa ? `y ${fa < 0 ? "+" : "−"} ${Math.abs(fa)}` : "y";
  const xs = a ? `x ${a < 0 ? "+" : "−"} ${Math.abs(a)}` : "x";
  const rhs = !m ? "0" : m === 1 ? xs : m === -1 ? (a ? `−(${xs})` : "−x") : a ? `${neg(m)}(${xs})` : `${neg(m)}x`;
  return `${lhs} = ${rhs}`;
}
def("m11.de.tangente", (R, S, H) => {
  const cs = R.r() < 0.6 ? [rnz(R, -3, 3), R.int(-5, 5), R.int(-6, 6)] : [R.pick([1, -1]), 0, R.int(-4, 4), R.int(-5, 5)];
  const a = R.int(-2, 2), fa = ev(cs, a), m = ev(dpoly(cs), a), n = fa - m * a;
  return { q: S.m11.de_tg_q(polyHtml(cs), neg(a)), kind: "expr", ans: `${m}*x+(${n})`, ansHtml: `y = ${lin(m, n)}`, hint: S.m11.de_tg_hint,
    sol: S.m11.de_tg_s(neg(a), neg(fa), polyHtml(dpoly(cs)), neg(m), pointSlope(a, fa, m), lin(m, n)) };
});
// Derivadas laterales de una función a trozos continua: x² + px + q (x < c) y mx + n (x ≥ c)
def("m11.de.lateral", (R, S, H) => {
  const c = R.int(-2, 2), p = R.int(-4, 4), q = R.int(-4, 4), L = c * c + p * c + q, dl = 2 * c + p;
  let m, t = 0; do m = R.r() < 0.5 ? dl : dl + rnz(R, -3, 3); while (!m && ++t < 20);   // la recta no es horizontal
  if (!m) return null;
  const n = L - m * c;
  const f1 = polyHtml([1, p, q]), f2 = lin(m, n), pc = c < 0 ? `(${neg(c)})` : String(c);
  const piece = `<span style="white-space:nowrap">f(x) = ${f1} si x &lt; ${neg(c)}</span>; <span style="white-space:nowrap">f(x) = ${f2} si x ≥ ${neg(c)}</span>`;
  return { q: S.m11.dl_t.q(piece, neg(c)), kind: "fields", fields: [{ label: S.m11.dl_t.f[0], ans: dl }, { label: S.m11.dl_t.f[1], ans: m }],
    sol: S.m11.dl_t.s(neg(c), neg(L), polyHtml([2, p]), `2 · ${pc}${p ? ` ${p < 0 ? "−" : "+"} ${Math.abs(p)}` : ""}`, neg(dl), neg(m), dl === m) };
});
// Tangentes con condiciones (lo que la lección enseña y no se practicaba): paralela a una recta, horizontal,
// recta normal, tangentes desde un punto exterior y tangentes a eˣ y ln x.
def("m11.de.tgcond", (R, S, H) => {
  const T = S.m11.tc_t, k = R.pick([0, 0, 1, 1, 2, 2, 3, 4]);
  if (k <= 1) {   // f(x) = x² + bx + c paralela a y = mx + n (o, k = 1, horizontal en x³ − 3a²x + c)
    if (k === 0) {
      const b = R.int(-6, 6), c = R.int(-6, 6), x0 = R.int(-4, 4), m = 2 * x0 + b, y0 = x0 * x0 + b * x0 + c, n = R.int(-6, 6);
      const f = polyHtml([1, b, c]);
      return { q: T.q0(f, `y = ${lin(m, n)}`), kind: "fields", fields: [{ label: "x", ans: x0 }, { label: "y", ans: y0 }],
        sol: T.s0(polyHtml([2, b]), neg(m), lin(2, b), neg(x0), neg(y0)) };
    }
    const a = R.int(1, 4), c = R.int(-6, 6), f = `x³ − ${3 * a * a}x${sg(c, "")}`;
    return { q: T.q1(f), kind: "set", ans: [-a, a], hint: S.m11.de_set_hint, sol: T.s1(`3x² − ${3 * a * a}`, a * a, a) };
  }
  if (k === 2) {   // recta normal en x = a a f(x) = px² + qx + r
    const p = rnz(R, -2, 2), q = R.int(-5, 5), r = R.int(-5, 5), cs = [p, q, r];
    let a; do a = R.int(-2, 2); while (2 * p * a + q === 0);
    const fa = ev(cs, a), m = 2 * p * a + q, mn = F.make(-1, m), n = F.sub([fa, 1], F.mul(mn, [a, 1]));
    const mh = F.html(mn, H), nh = n[0] ? ` ${n[0] < 0 ? "−" : "+"} ${F.html([Math.abs(n[0]), n[1]], H)}` : "";
    const ft = q => q[1] === 1 ? String(q[0]) : `${q[0]}/${q[1]}`;
    return { q: T.q2(polyHtml(cs), neg(a)), kind: "expr", ans: `(${ft(mn)})*x+(${ft(n)})`, ansHtml: `y = ${mh}x${nh}`, hint: S.m11.de_tg_hint,
      sol: T.s2(neg(a), neg(fa), polyHtml(dpoly(cs)), neg(m), mh, `y = ${mh}x${nh}`) };
  }
  if (k === 3) {   // tangentes a y = x² desde un punto exterior P(p, q): t² − 2pt + q = 0
    let t1, t2; do { t1 = R.int(-4, 4); t2 = R.int(-4, 4); } while (t1 === t2 || (t1 + t2) % 2);
    const p = (t1 + t2) / 2, q = t1 * t2, tg = t => `y = ${lin(2 * t, -t * t)}`;
    const ok = `${tg(Math.min(t1, t2))} ; ${tg(Math.max(t1, t2))}`;
    const opts = R.shuffle([...new Set([ok, `${tg(-t1)} ; ${tg(-t2)}`, `${tg(Math.min(t1, t2))} ; y = ${lin(2 * Math.max(t1, t2), t2 * t2)}`, `y = ${lin(2 * t1, 0)} ; y = ${lin(2 * t2, 0)}`])]);
    if (opts.length < 3) return null;
    return { q: T.q3(`(${neg(p)}, ${neg(q)})`), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s3(neg(p), neg(q), `t²${sg(-2 * p, "t")}${sg(q, "")} = 0`, neg(Math.min(t1, t2)), neg(Math.max(t1, t2)), ok) };
  }
  // tangente a e^(kx) en x = 0 o a ln x en x = 1
  if (R.r() < 0.5) {
    const kk = rnz(R, -3, 3);
    return { q: S.m11.de_tg_q(`e<sup>${cf(kk)}x</sup>`, "0"), kind: "expr", ans: `${kk}*x+1`, ansHtml: `y = ${lin(kk, 1)}`, hint: S.m11.de_tg_hint, sol: T.s4(cf(kk), neg(kk), `y = ${lin(kk, 1)}`) };
  }
  return { q: S.m11.de_tg_q("ln x", "1"), kind: "expr", ans: "x-1", ansHtml: "y = x − 1", hint: S.m11.de_tg_hint, sol: T.s5 };
});
})();
