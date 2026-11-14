/* WikiAula — Matemáticas, Grado 11 · Unidad 2: Números complejos.
   Textos: i18n/<lang>/mat11u2.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;

// Complejo a + bi como texto: 3 − 2i, −i, 5, 4i
function cx(a, b) {
  if (!b) return neg(a);
  const bi = Math.abs(b) === 1 ? "i" : Math.abs(b) + "i";
  if (!a) return (b < 0 ? "−" : "") + bi;
  return `${neg(a)} ${b < 0 ? "−" : "+"} ${bi}`;
}
WA.MATH.cx = cx;
const pc = (a, b) => `(${cx(a, b)})`;
const fields = (S, a, b) => [{ label: S.m11.cx_f[0], ans: a }, { label: S.m11.cx_f[1], ans: b }];
// Suma de términos [coeficiente, "", "i" o "i²"] sin ceros ni «1i»: terms([[−10, ""], [5, "i"], [−1, "i²"]]) → "−10 + 5i − i²"
const terms = ts => ts.filter(([c]) => c).map(([c, v], k) => (k ? (c < 0 ? " − " : " + ") : (c < 0 ? "−" : "")) + (Math.abs(c) === 1 && v ? "" : Math.abs(c)) + v).join("") || "0";

def("m11.cx.potencia", (R, S, H) => {
  const n = R.int(5, 200), r = n % 4, vals = ["1", "i", "−1", "−i"];
  return { q: S.m11.cx_pot_q(n), kind: "choice", opts: vals, correct: r, shuffle: false, sol: S.m11.cx_pot_s(n, r, vals[r]) };
});
def("m11.cx.ecuacion", (R, S, H) => {
  if (R.r() < 0.3) {   // tercer grado: (x − r)(x² + c²) = 0, con Ruffini
    const r = rnz(R, -4, 4), c = R.int(1, 5), c2 = c * c;
    const co = [1, -r, c2, -r * c2];   // x³ − r x² + c² x − r c²
    const t = (k, v) => k ? `${k < 0 ? " − " : " + "}${Math.abs(k) === 1 && v ? "" : Math.abs(k)}${v}` : "";
    const eq = `x³${t(co[1], "x²")}${t(co[2], "x")}${t(co[3], "")} = 0`;
    return { q: S.m11.cx_ec_q(eq), kind: "fields", fields: fields(S, 0, c), sol: S.m11.cx_ec3_s(neg(r), r < 0 ? `x + ${-r}` : `x − ${r}`, c2, c === 1 ? "i" : `${c}i`) };
  }
  const a = R.int(-5, 5), b = R.int(1, 6), p = -2 * a, q = a * a + b * b, D = p * p - 4 * q;
  const e = `x² ${p ? (p < 0 ? "− " + (-p === 1 ? "" : -p) + "x" : "+ " + (p === 1 ? "" : p) + "x") : ""} + ${q} = 0`.replace("  ", " ");
  const mp = neg(-p);   // −p, que es 2a
  return { q: S.m11.cx_ec_q(e), kind: "fields", fields: fields(S, a, b),
    sol: S.m11.cx_ec_s(neg(D), `${2 * b}i`, p ? `(${mp} ± ${2 * b}i)/2` : `±${2 * b}i/2`, a ? `${neg(a)} ± ${b === 1 ? "" : b}i` : `±${b === 1 ? "" : b}i`, cx(a, b), cx(a, -b)) };
});
// Parámetros (forma binómica): ¿para qué k es real o imaginario puro (k + ai)(c + di) o (k + ai)/(c + di)?
def("m11.cx.param", (R, S, H) => {
  const T = S.m11.cxp_t, div = R.r() < 0.5, real = R.r() < 0.5;
  // producto: (kc − ad) + (kd + ac)i ; cociente: [(kc + ad) + (ac − kd)i] / (c² + d²)
  let a, c, d, k, t = 0;
  do {
    a = rnz(R, -6, 6); c = rnz(R, -4, 4); d = rnz(R, -4, 4);
    if (!div) k = real ? -a * c / d : a * d / c;
    else k = real ? a * c / d : -a * d / c;
    t++;
  } while (t < 40 && (!Number.isInteger(k) || Math.abs(k) > 20));
  if (!Number.isInteger(k) || Math.abs(k) > 20) return null;
  k += 0;
  const kz = `k ${a < 0 ? "−" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}i`, w = cx(c, d);
  const e = div ? H.frac(kz, w) : `(${kz})(${w})`;
  const pr = (x, y) => `${x}${y < 0 ? " − " : " + "}${Math.abs(y)}`;   // «kc − ad» con números
  const kc = v => v === 1 ? "k" : v === -1 ? "−k" : `${neg(v)}k`;
  let re, im, cond;
  if (!div) { re = pr(kc(c), -a * d); im = pr(kc(d), a * c); }
  else { re = pr(kc(c), a * d); im = pr(neg(a * c), -d).replace(/ ([−+]) (\d+)$/, (s, sg, n) => ` ${sg} ${n === "1" ? "" : n}k`); }
  cond = real ? im : re;
  return { q: T.q(e, real), kind: "int", ans: k,
    sol: div ? T.sd(cx(c, -d), c * c + d * d, re, im, real, cond, neg(k)) : T.sp(re, im, real, cond, neg(k)) };
});
def("m11.cx.suma", (R, S, H) => {
  const a = R.int(-9, 9), b = rnz(R, -9, 9), c = R.int(-9, 9), d = rnz(R, -9, 9), plus = R.r() < 0.5;
  const re = plus ? a + c : a - c, im = plus ? b + d : b - d, e = `${pc(a, b)} ${plus ? "+" : "−"} ${pc(c, d)}`;
  return { q: S.m11.cx_q(e), kind: "fields", fields: fields(S, re, im), sol: S.m11.cx_sum_s(e, cx(re, im)) };
});
def("m11.cx.mult", (R, S, H) => {
  const a = rnz(R, -6, 6), b = rnz(R, -6, 6), c = rnz(R, -6, 6), d = rnz(R, -6, 6);
  const re = a * c - b * d, im = a * d + b * c, e = `${pc(a, b)} · ${pc(c, d)}`;
  const step = terms([[a * c, ""], [a * d, "i"], [b * c, "i"], [b * d, "i²"]]);
  const step2 = terms([[a * c, ""], [im, "i"], [-b * d, ""]]);
  return { q: S.m11.cx_q(e), kind: "fields", fields: fields(S, re, im), sol: S.m11.cx_mul_s(`${e} = ${step}`, step2, cx(re, im)) };
});
def("m11.cx.div", (R, S, H) => {
  // resultado entero: z = w · (c + di)
  const p = R.int(-5, 5), q = rnz(R, -5, 5), c = rnz(R, -4, 4), d = rnz(R, -4, 4);   // c, d ≠ 0: denominador c² + d² ≥ 2
  const a = p * c - q * d, b = p * d + q * c, den = c * c + d * d;
  const num = [a * c + b * d, b * c - a * d];
  const pr = `${pc(a, b)}${pc(c, -d)} = ${terms([[a * c, ""], [-a * d, "i"], [b * c, "i"], [-b * d, "i²"]])} = ${cx(num[0], num[1])}`;
  const dn = `${c < 0 ? `(${neg(c)})` : c}² + ${d < 0 ? `(${neg(d)})` : d}² = ${den}`;
  const sp = `${H.frac(neg(num[0]), den)} ${num[1] < 0 ? "−" : "+"} ${H.frac(Math.abs(num[1]), den)}i`;
  return { q: S.m11.cx_q(`${H.frac(cx(a, b), cx(c, d))}`), kind: "fields", fields: fields(S, p, q),
    sol: S.m11.cx_div_s(cx(c, -d), pr, dn, sp, cx(p, q)) };
});
const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [1, 0, 1], [0, 7, 7], [9, 12, 15], [12, 5, 13]];
def("m11.cx.modulo", (R, S, H) => {
  let [a, b, r] = R.pick(TRIPLES);
  if (R.r() < 0.5) a = -a; if (R.r() < 0.5) b = -b;
  if (R.r() < 0.5) [a, b] = [b, a];
  return { q: S.m11.cx_mod_q(cx(a, b)), kind: "num", ans: r, sol: S.m11.cx_mod_s(a < 0 ? `(${neg(a)})` : a, b < 0 ? `(${neg(b)})` : b, r) };
});
def("m11.cx.argumento", (R, S, H) => {
  const t = R.r();
  if (t < 0.4) {   // ángulo no notable: tg α = b/a con la calculadora y corrección de cuadrante (a décimas)
    let a, b; do { a = rnz(R, -6, 6); b = rnz(R, -6, 6); } while (Math.abs(a) === Math.abs(b));
    const calc = Math.atan(b / a) * 180 / Math.PI, add = a < 0 ? 180 : b < 0 ? 360 : 0, ang = calc + add, qd = a > 0 ? (b > 0 ? 0 : 3) : (b > 0 ? 1 : 2);
    return { q: S.m11.cx_arg_q(cx(a, b)) + S.m11.cx_arg_dec, kind: "num", ans: Math.round(ang * 10) / 10, tol: 0.15,
      sol: S.m11.cx_arg_calc(neg(b), a < 0 ? `(${neg(a)})` : a, H.dec(calc, 1), S.m11.cx_quad[qd], add, H.dec(Math.round(ang * 10) / 10, 1)) };
  }
  if (t < 0.6) {   // 30°, 60° y sus simétricos: k√3 ± ki o k ± k√3 i
    const k = R.int(1, 3), big = R.r() < 0.5, sa = R.r() < 0.5 ? 1 : -1, sb = R.r() < 0.5 ? 1 : -1;
    const ref = big ? 60 : 30, qd = sa > 0 ? (sb > 0 ? 0 : 3) : (sb > 0 ? 1 : 2);
    const ang = [ref, 180 - ref, 180 + ref, 360 - ref][[0, 1, 2, 3].indexOf(qd)];
    const kk = k === 1 ? "" : k, r3 = `${kk}√3`;
    const re = big ? `${sa < 0 ? "−" : ""}${k}` : `${sa < 0 ? "−" : ""}${r3}`, im = big ? `${r3}i` : `${kk}i`;
    const z = `${re} ${sb < 0 ? "−" : "+"} ${im}`;
    return { q: S.m11.cx_arg_q(z), kind: "num", ans: ang, sol: S.m11.cx_arg_s3(big ? "√3" : "1/√3", ref, S.m11.cx_quad[qd], ["", `180° − ${ref}° = `, `180° + ${ref}° = `, `360° − ${ref}° = `][qd], ang) };
  }
  const k = R.int(1, 5), opts = [[k, 0, 0, 4], [k, k, 45, 0], [0, k, 90, 5], [-k, k, 135, 1], [-k, 0, 180, 6], [-k, -k, 225, 2], [0, -k, 270, 7], [k, -k, 315, 3]];
  const [a, b, ang, qd] = R.pick(opts);
  return { q: S.m11.cx_arg_q(cx(a, b)), kind: "num", ans: ang, sol: S.m11.cx_arg_s(S.m11.cx_quad[qd], ang, a && b ? 45 : 0) };
});
def("m11.cx.polarbin", (R, S, H) => {
  const r = R.int(1, 8), t = R.pick([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300, 315, 330]);
  const xa = r * Math.cos(t * Math.PI / 180), xb = r * Math.sin(t * Math.PI / 180);
  const a = rd(xa, 2) + 0, b = rd(xb, 2) + 0, ea = Math.abs(xa - a) < 1e-9, eb = Math.abs(xb - b) < 1e-9;
  const bi = Math.abs(b) === 1 ? "i" : H.dec(Math.abs(b)) + "i";
  const z = !b ? H.dec(a) : !a ? (b < 0 ? "−" : "") + bi : `${H.dec(a)} ${b < 0 ? "−" : "+"} ${bi}`;
  return { q: S.m11.cx_pb_q(`${r}<sub>${t}°</sub>`), kind: "fields", fields: [{ label: S.m11.cx_f[0], kind: "num", ans: a, tol: 0.011 }, { label: S.m11.cx_f[1], kind: "num", ans: b, tol: 0.011 }],
    sol: S.m11.cx_pb_s(r, t, H.dec(a), H.dec(b), ea, eb) + ` z ${ea && eb ? "=" : "≈"} <b>${z}</b>.` };
});
def("m11.cx.polarop", (R, S, H) => {
  const k = R.int(0, 2), A = [30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300];
  if (k === 0) {
    const r1 = R.int(1, 6), r2 = R.int(1, 6), a1 = R.pick(A), a2 = R.pick(A), r = r1 * r2, a = (a1 + a2) % 360;
    return { q: S.m11.cx_pp_q(`${r1}<sub>${a1}°</sub> · ${r2}<sub>${a2}°</sub>`), kind: "fields", fields: [{ label: S.m11.cx_pp_f[0], ans: r }, { label: S.m11.cx_pp_f[1], ans: a }], sol: S.m11.cx_pp_prod_s(r1, r2, a1, a2, r, a, a1 + a2) };
  }
  if (k === 1) {
    const r2 = R.int(1, 5), r = R.int(1, 6), r1 = r * r2, a1 = R.pick(A), a2 = R.pick(A), a = ((a1 - a2) % 360 + 360) % 360;
    return { q: S.m11.cx_pp_q(`${r1}<sub>${a1}°</sub> ${WA.H.div} ${r2}<sub>${a2}°</sub>`), kind: "fields", fields: [{ label: S.m11.cx_pp_f[0], ans: r }, { label: S.m11.cx_pp_f[1], ans: a }], sol: S.m11.cx_pp_coc_s(r1, r2, a1, a2, r, a, a1 - a2) };
  }
  const r1 = R.int(1, 3), n = R.int(2, 5), a1 = R.pick(A), r = r1 ** n, a = (a1 * n) % 360;
  return { q: S.m11.cx_pp_q(`(${r1}<sub>${a1}°</sub>)<sup>${n}</sup>`), kind: "fields", fields: [{ label: S.m11.cx_pp_f[0], ans: r }, { label: S.m11.cx_pp_f[1], ans: a }], sol: S.m11.cx_pp_pot_s(r1, a1, n, r, a, a1 * n) };
});
def("m11.cx.raices", (R, S, H) => {
  const n = R.int(2, 4), m = R.int(1, 3), r = m ** n, bin = R.r() < 0.5;
  const a = bin ? R.pick([0, 90, 180, 270]) : R.pick([0, 60, 90, 120, 180, 240, 270]), a1 = a / n, last = (a + 360 * (n - 1)) / n;
  const z = bin ? cx(...[[r, 0], [0, r], [-r, 0], [0, -r]][a / 90]) : `${r}<sub>${a}°</sub>`;
  return { q: S.m11.cx_raiz_q(n, z), kind: "fields", fields: [{ label: S.m11.cx_raiz_f[0], kind: "num", ans: m }, { label: S.m11.cx_raiz_f[1], kind: "num", ans: a1, tol: 0.01 },
    { label: S.m11.cx_raiz_f[2], kind: "num", ans: last, tol: 0.01 }],
    sol: (bin ? S.m11.cx_raiz_pol(z, r, a) : "") + S.m11.cx_raiz_s(n, r, a, m, H.dec(a1, 2), H.dec(360 / n, 2), H.dec(last, 2)) };
});
})();
