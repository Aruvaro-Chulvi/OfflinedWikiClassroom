/* WikiAula — Matemáticas, Grado 8 (2.º de ESO): generadores nuevos (los demás
   temas usan los de los grados 7 y 11). Textos: i18n/<lang>/mat8.js (S.m8). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const { rnz, F, gcd, polyHtml, polyText, lin } = WA.MATH;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);

// ── Potencias de exponente negativo ──
def("m8.potneg", (R, S, H) => {
  const b = R.pick([2, 3, 4, 5, 10]), e = R.int(1, b === 10 ? 4 : 3), k = R.r();
  if (k < 0.4) return { q: S.m8.pn_q(`${b}<sup>−${e}</sup>`), kind: "frac", ans: [1, b ** e], sol: S.m8.pn_s(b, e, b ** e) };
  if (k < 0.7) {   // base negativa: con paréntesis (el signo depende del exponente) o sin ellos (el menos queda fuera)
    const c = R.pick([2, 3, 4, 5]), f = R.int(2, c === 2 ? 4 : 3), par = R.r() < 0.6, sg = par && f % 2 ? -1 : 1;
    return { q: S.m8.pn_q(par ? `(−${c})<sup>−${f}</sup>` : `−${c}<sup>−${f}</sup>`), kind: "frac", ans: [par ? sg : -1, c ** f], sol: S.m8.pnn_s(c, f, c ** f, par) };
  }
  let p, q; do { p = R.int(1, 5); q = R.int(2, 5); } while (gcd(p, q) !== 1);   // base irreducible y distinta de 1 (1/2, 2/3, 5/4…)
  const e2 = Math.min(e, 3);
  return { q: S.m8.pn2_q(`${p}/${q}`, e2), kind: "frac", ans: F.make(q ** e2, p ** e2), sol: S.m8.pn2_s(p, q, e2, q ** e2, p ** e2) };
});

// ── Notación científica ──
def("m8.cientifica", (R, S, H) => {
  const m = rd(R.int(11, 99) / 10, 1), e = R.pick([R.int(3, 9), -R.int(2, 4)]), x = Number((m * 10 ** e).toPrecision(10));
  const num = e > 0 ? H.n(Math.round(x)) : x.toFixed(-e + 1).replace(/0+$/, "").replace(".", WA.H.ds);   // sin ceros finales: 0,006
  if (R.r() < 0.5) return { q: S.m8.nc_q(num), kind: "fields", fields: [{ label: S.m8.nc_f[0], kind: "num", ans: m }, { label: S.m8.nc_f[1], ans: e }], sol: S.m8.nc_s(num, H.dec(m), e) };
  return { q: S.m8.nc2_q(`${H.dec(m)}${H.sx(true)}10<sup>${neg(e)}</sup>`), kind: "num", ans: x, tol: Math.abs(x) * 1e-9, sol: S.m8.nc2_s(e, num) };
});
def("m8.cientops", (R, S, H) => {
  // Mantisas en décimas (A, B enteros): el producto es exacto en centésimas y los cocientes se eligen exactos,
  // con dos decimales como mucho: no hace falta redondear y la igualdad de la solución siempre es cierta.
  const e1 = R.int(-6, 9), e2 = R.int(-6, 9), mul = R.r() < 0.6;
  let A, B, raw, m, adj = 0;
  if (mul) {
    A = R.int(11, 49); B = R.int(11, 49); raw = A * B / 100;
    if (A * B >= 1000) { m = A * B / 1000; adj = 1; } else m = raw;
  } else {
    let k = 0;
    const ok = () => A !== B && (A > B ? (A * 100) % B === 0 : (A * 1000) % B === 0);
    do { A = R.int(11, 49); B = R.int(11, 49); k++; } while (!ok() && k < 200);
    if (!ok()) return null;
    raw = Math.round(A * 1000 / B) / 1000;
    if (A < B) { m = Math.round(A * 1000 / B) / 100; adj = -1; } else m = Math.round(A * 100 / B) / 100;
  }
  const s = mul ? e1 + e2 : e1 - e2, e = s + adj, a = A / 10, b = B / 10;
  return { q: S.m8.nco_q(`(${H.dec(a)}${H.sx(true)}10<sup>${neg(e1)}</sup>) ${mul ? H.mul : H.div} (${H.dec(b)}${H.sx(true)}10<sup>${neg(e2)}</sup>)`), kind: "fields",
    fields: [{ label: S.m8.nc_f[0], kind: "num", ans: m, tol: 1e-6 }, { label: S.m8.nc_f[1], ans: e }],
    sol: S.m8.nco_s(mul, H.dec(a), H.dec(b), H.dec(raw), e1, e2, s, adj, H.dec(m), e) };
});

// ── Proporcionalidad compuesta, repartos, porcentajes encadenados, interés ──
// Proporcionalidad compuesta: dos directas (reducción a la unidad), una directa y una inversa, o dos inversas (factores de cambio)
def("m8.compuesta", (R, S) => {
  const T = S.m8.CP, t = R.r();
  if (t < 0.4) {   // directa + directa: reducción a la unidad
    const c = R.int(0, 3), u = R.pick([[50, 75, 100, 120, 150], [15, 20, 25, 30, 40], [4, 5, 6, 8, 12], [10, 12, 15, 20]][c]);
    let a, d, a2, d2; do { a = R.int(2, 8); d = R.int(2, 10); a2 = R.int(2, 12); d2 = R.int(2, 12); } while (a2 === a || d2 === d);
    return { q: T.dd_q[c](a, d, u * a * d, a2, d2), kind: "int", ans: u * a2 * d2, sol: T.dd_s[c](a, d, u * a * d, a * d, u, a2, d2, u * a2 * d2) };
  }
  if (t < 0.8) {   // directa (trabajo) + inversa (trabajadores): ¿cuántos días/minutos?
    const c = R.int(0, 1), u = c ? R.pick([20, 30, 40, 50, 60]) : R.pick([2, 3, 4, 5, 6]);
    let n, d, n2, d2; do { n = R.int(2, 12); d = R.int(2, 12); n2 = R.int(2, 15); d2 = R.int(2, 15); } while (n2 === n || d2 === d);
    const m = u * n * d, m2 = u * n2 * d2, num = d * m2 * n, den = m * n2;
    return { q: T.di_q[c](n, m, d, n2, m2), kind: "int", ans: d2, sol: T.di_s[c](d, m2, m, n, n2, num, den, d2) };
  }
  // inversa + inversa: personas y comidas al día (el refugio)
  for (let k = 0; k < 60; k++) {
    const n = R.int(4, 20), c = R.int(2, 4), d = R.int(5, 20), n2 = R.int(4, 24), c2 = R.int(1, 4), tot = n * c * d;
    if (n2 === n || c2 === c || tot % (n2 * c2) || tot / (n2 * c2) > 40) continue;
    return { q: T.ii_q(n, d, c, n2, c2), kind: "int", ans: tot / (n2 * c2), sol: T.ii_s(d, n, n2, c, c2, d * n * c, n2 * c2, tot / (n2 * c2)) };
  }
  return null;
});
// Repartos: directos (partes distintas; se simplifican si se puede) e inversos (2 o 3 personas, a los inversos con común denominador)
def("m8.reparto", (R, S) => {
  const T = S.m8.RP, n = R.int(2, 3), names = R.shuffle(S.m8.NAMES).slice(0, n);
  if (R.r() < 0.4) {   // inverso
    let a; do a = R.shuffle([2, 3, 4, 5, 6]).slice(0, n).sort((x, y) => x - y); while (n === 3 && a.includes(5) && a.includes(6));
    const L = a.reduce((x, y) => lcm(x, y)), w = a.map(x => L / x), W = w.reduce((x, y) => x + y, 0), u = R.int(2, 20) * (W > 15 ? 5 : 10), Tot = W * u;
    return { q: T.ri_q(Tot, names, a), kind: "fields", fields: names.map((nm, i) => ({ label: nm, ans: w[i] * u })), sol: T.ri_s(a, L, w, W, Tot, u) };
  }
  let p; do p = Array.from({ length: n }, () => R.int(1, 8)); while (new Set(p).size < n);
  const g = p.reduce((x, y) => gcd(x, y)), q = p.map(x => x / g), sum = q.reduce((x, y) => x + y, 0), u = R.int(3, 40) * (sum > 10 ? 5 : 10), Tot = sum * u;
  return { q: T.rp_q(Tot, names, p), kind: "fields", fields: names.map((nm, i) => ({ label: nm, ans: q[i] * u })), sol: T.rp_s(Tot, p, g, q, sum, u) };
});
def("m8.encadenados", (R, S, H) => {
  const P = R.int(20, 400), a = R.pick([10, 20, 25, 30, 40]), b = R.pick([10, 15, 20, 25, 50]), k = R.int(0, 4);
  const fa = 1 + a / 100, fb = 1 - b / 100, T = S.m8;
  if (k === 0) {   // con enteros (diezmilésimas de euro): solo precios finales exactos en céntimos
    let P2 = P, g = 0;
    while ((P2 * (100 + a) * (100 - b)) % 100 !== 0 && g++ < 100) P2 = R.int(20, 400);
    if ((P2 * (100 + a) * (100 - b)) % 100 !== 0) P2 = 100 * R.int(1, 4);
    const v = P2 * (100 + a) * (100 - b) / 10000, mid = P2 * (100 + a) / 100, E = WA.MATH.eur(v, H);
    return { q: T.en_q(P2, a, b), kind: "num", ans: v, tol: 0.001, ansHtml: H.money(v), sol: T.en_s(P2, H.dec(fa), H.dec(fb), WA.MATH.eur(mid, H), E, H.dec((100 + a) * (100 - b) / 10000)) };
  }
  if (k === 1) { const t = ((100 + a) * (100 - b) - 10000) / 100; return { q: T.en2_q(a, b), kind: "num", ans: t, tol: 0.001, sol: T.en2_s(H.dec(fa), H.dec(fb), H.dec(rd(fa * fb, 4)), H.dec(t)) }; }
  if (k === 2) {   // dos descuentos seguidos
    const d1 = R.pick([10, 15, 20, 25, 30, 40, 50]), d2 = R.pick([5, 10, 15, 20, 25]), f = (100 - d1) * (100 - d2) / 10000, tot = 100 - (100 - d1) * (100 - d2) / 100;
    return { q: T.en3_q(d1, d2), kind: "num", ans: tot, tol: 0.001, sol: T.en3_s(H.dec(1 - d1 / 100), H.dec(1 - d2 / 100), H.dec(f), H.dec(100 - tot), H.dec(tot), d1 + d2) };
  }
  if (k === 3) {   // la misma subida varios años: potencia del índice
    const r = R.pick([2, 3, 4, 5, 10, 20]), y = R.int(2, 3), big = (100 + r) ** y, f = big / 100 ** y, pc = (big - 100 ** y) / 100 ** (y - 1), pr = Math.round(pc * 100) / 100;
    return { q: T.en4_q(r, y), kind: "num", ans: pr, tol: 0.006, ansHtml: H.dec(pr), sol: T.en4_s(H.dec(1 + r / 100), y, H.dec(f), H.dec(pc), H.dec(pr), r * y, pr !== pc) };
  }
  // el precio de antes: final : índice total
  for (let g = 0; g < 80; g++) {
    const P0 = R.int(4, 80) * 5, num = P0 * (100 + a) * (100 - b);
    if (num % 100) continue;
    const v = num / 10000, E = WA.MATH.eur(v, H);
    return { q: T.en5_q(a, b, E), kind: "num", ans: P0, tol: 0.001, sol: T.en5_s(H.dec(fa), H.dec(fb), H.dec((100 + a) * (100 - b) / 10000), E, P0, WA.MATH.eur(P0 * (100 + a) / 100, H)) };
  }
  return null;
});
// Interés simple: el interés (años o meses) o el dato que falta (rédito, tiempo, capital), sustituyendo y resolviendo como en la lección
def("m8.interes", (R, S, H) => {
  const T = S.m8, eu = x => WA.MATH.eur(x, H), k = R.r();
  const C0 = R.int(5, 100) * 100, r = R.pick([1, 1.5, 2, 2.5, 3, 4, 5]), t = R.int(1, 8), I = rd(C0 * r * t / 100), A = rd(C0 * r / 100);
  if (k < 0.35) return { q: T.is_q(H.n(C0), H.dec(r), t), kind: "num", ans: I, tol: 0.011, ansHtml: H.money(I), sol: T.is_s(H.n(C0), H.dec(r), t, eu(I)) };
  if (k < 0.55) {   // tiempo en meses: se pasa a años
    for (let g = 0; g < 60; g++) {
      const C = R.int(6, 120) * 100, rr = R.pick([1, 2, 2.5, 3, 4, 5, 6]), m = R.pick([2, 3, 4, 5, 6, 8, 9, 10, 15, 18]), cents = C * rr * m / 12;   // interés en céntimos
      if (Math.abs(cents - Math.round(cents)) > 1e-9) continue;
      return { q: T.ism_q(H.n(C), H.dec(rr), m), kind: "num", ans: cents / 100, tol: 0.011, ansHtml: H.money(cents / 100), sol: T.ism_s(H.n(C), H.dec(rr), m, eu(C * rr / 100), eu(cents / 100)) };
    }
    return null;
  }
  if (k < 0.7) { const ct = rd(C0 * t / 100); return { q: T.is2_q(H.n(C0), eu(I), t), kind: "num", ans: r, tol: 0.011, sol: T.is2_s(eu(I), H.n(C0), t, H.dec(ct), H.dec(r)) }; }
  if (k < 0.85) return { q: T.ist_q(H.n(C0), H.dec(r), eu(I)), kind: "int", ans: t, sol: T.ist_s(eu(I), H.n(C0), H.dec(r), eu(A), t) };
  const rt = r * t; return { q: T.isc_q(H.dec(r), eu(I), t), kind: "num", ans: C0, tol: 0.011, ansHtml: H.money(C0), sol: T.isc_s(eu(I), H.dec(r), t, H.dec(rt), H.dec(rt / 100), H.n(C0)) };
});

// ── Polinomios ──
const rpoly = (R, deg) => [rnz(R, -5, 5), ...Array.from({ length: deg }, () => R.int(-7, 7))];
const addP = (a, b, s = 1) => { const n = Math.max(a.length, b.length), A = Array(n - a.length).fill(0).concat(a), B = Array(n - b.length).fill(0).concat(b); return A.map((x, i) => x + s * B[i]); };
const mulP = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
const trim = p => { let i = 0; while (i < p.length - 1 && !p[i]) i++; return p.slice(i); };
// Monomios para escribir los pasos: mono(−3, 2) → "3x²" (sin signo), sgnM → "−3x²", chain([[3,2],[−2,1]]) → "3x² − 2x"
const monoA = (c, e, v = "x") => { const a = Math.abs(c); return (e === 0 ? String(a) : a === 1 ? "" : String(a)) + (e === 0 ? "" : e === 1 ? v : v + WA.MATH.sup(e)); };
const sgnM = (c, e) => (c < 0 ? "−" : "") + monoA(c, e);
const chain = ts => ts.map(([c, e], i) => (c < 0 ? (i ? " − " : "−") : i ? " + " : "") + monoA(c, e)).join("") || "0";
const pm = (c, e) => c < 0 ? `(${sgnM(c, e)})` : monoA(c, e);
const termsOf = p => p.map((c, i) => [c, p.length - 1 - i]).filter(([c]) => c);
// Junta los términos semejantes de una lista: «x: −6x − 4x = −10x; números: −3 + 2 = −1»
function groupTxt(ts, T) {
  const degs = [...new Set(ts.map(t => t[1]))].sort((a, b) => b - a), out = [];
  degs.forEach(e => { const g = ts.filter(t => t[1] === e); if (g.length > 1) { const s = g.reduce((a, t) => a + t[0], 0); out.push(`${e ? monoA(1, e) : T.nums}: ${chain(g)} = ${s ? sgnM(s, e) : "0"}`); } });
  return out.join("; ");
}
def("m8.polsuma", (R, S) => {
  const a = rpoly(R, R.int(2, 3)), b = rpoly(R, R.int(1, 3)), s = R.r() < 0.5 ? 1 : -1, r = trim(addP(a, b, s));
  const all = termsOf(a).concat(termsOf(b).map(([c, e]) => [s * c, e]));
  return { q: S.m8.pol_q(`(${polyHtml(a)}) ${s > 0 ? "+" : "−"} (${polyHtml(b)})`), kind: "expr", ans: polyText(r), ansHtml: polyHtml(r), hint: S.m8.pol_hint, sol: S.m8.polsuma_s(s, chain(all), groupTxt(all, S.m8), polyHtml(r)) };
});
def("m8.polmult", (R, S) => {
  const a = R.r() < 0.5 ? [rnz(R, -4, 4), R.int(-6, 6)] : [rnz(R, -3, 3), 0, R.int(-5, 5)], b = [rnz(R, -4, 4), R.int(-6, 6)];
  const steps = (A, B) => {
    const ps = [], prods = [];
    termsOf(A).forEach(([c1, e1]) => termsOf(B).forEach(([c2, e2]) => { ps.push([c1 * c2, e1 + e2]); prods.push(`${pm(c1, e1)} · ${pm(c2, e2)} = ${sgnM(c1 * c2, e1 + e2)}`); }));
    return [prods.join("; "), chain(ps), groupTxt(ps, S.m8)];
  };
  if (R.r() < 0.3) { const m = rnz(R, -5, 5), e = R.int(1, 2), mono = [m, ...Array(e).fill(0)], p = rpoly(R, 2), r = mulP(mono, p); return { q: S.m8.pol_q(`${polyHtml(mono)} · (${polyHtml(p)})`), kind: "expr", ans: polyText(r), ansHtml: polyHtml(r), hint: S.m8.pol_hint, sol: S.m8.polmult_s(...steps(mono, p), polyHtml(r)) }; }
  const r = mulP(a, b);
  return { q: S.m8.pol_q(`(${polyHtml(a)}) · (${polyHtml(b)})`), kind: "expr", ans: polyText(r), ansHtml: polyHtml(r), hint: S.m8.pol_hint, sol: S.m8.polmult_s(...steps(a, b), polyHtml(r)) };
});
def("m8.notables", (R, S) => {
  const a = R.int(1, 5), b = R.int(1, 9), k = R.int(0, 2);
  const A = a === 1 ? "x" : `${a}x`;
  const forms = [[`(${A} + ${b})²`, [a * a, 2 * a * b, b * b]], [`(${A} − ${b})²`, [a * a, -2 * a * b, b * b]], [`(${A} + ${b})(${A} − ${b})`, [a * a, 0, -b * b]]];
  const [e, r] = forms[k], a2 = a === 1 ? "x²" : `(${A})² = ${a * a}x²`, ab2 = `2 · ${A} · ${b} = ${2 * a * b}x`, b2 = `${b}² = ${b * b}`;
  const sol = S.m8.not_s[k](A, b, a2, ab2, b2, polyHtml(r));
  if (R.r() < 0.35) {   // al revés: reconocer el desarrollo
    const opts = R.shuffle(forms.map(f => f[0]));
    return { q: S.m8.not2_q(polyHtml(r)), kind: "choice", opts, correct: opts.indexOf(e), sol };
  }
  return { q: S.m8.not_q(e), kind: "expr", ans: polyText(r), ansHtml: polyHtml(r), hint: S.m8.pol_hint, sol };
});
// Vocabulario de polinomios: grado (desordenado o con varias letras), valor numérico P(a) y ¿es raíz?
def("m8.polvocab", (R, S) => {
  const T = S.m8.PV2, v = R.r();
  if (v < 0.25) {   // grado de un polinomio con los términos desordenados
    const n = R.int(5, 7), es = R.shuffle([0, 1, 2, 3, 4, 5, 6, 7].slice(0, n + 1)).slice(0, R.int(3, 4)), ts = es.map(e => [rnz(R, -9, 9), e]);
    if (ts[0][1] === Math.max(...es)) ts.push(ts.shift());   // el de mayor grado no va primero
    return { q: T.gr_q(chain(ts)), kind: "int", ans: Math.max(...es), sol: T.gr_s(ts.map(([c, e]) => `${sgnM(c, e)} → ${e}`).join("; "), Math.max(...es)) };
  }
  if (v < 0.4) {   // grado de un monomio con varias letras
    const c = rnz(R, -9, 9), L = R.shuffle([["x", R.int(1, 4)], ["y", R.int(1, 4)], ["z", R.int(1, 3)]]).slice(0, R.int(2, 3)).sort((p, q) => p[0] < q[0] ? -1 : 1);
    const m = (c === 1 ? "" : c === -1 ? "−" : neg(c)) + L.map(([l, e]) => l + (e > 1 ? WA.MATH.sup(e) : "")).join(""), g = L.reduce((s, [, e]) => s + e, 0);
    return { q: T.mo_q(m), kind: "int", ans: g, sol: T.mo_s(m, L.map(([l, e]) => `${l}: ${e}`).join(", "), L.map(([, e]) => e).join(" + "), g) };
  }
  const x0 = rnz(R, -3, 3), px = x0 < 0 ? `(${neg(x0)})` : String(x0);
  const subst = ts => ts.map(([c, e], i) => { const ab = Math.abs(c), body = e === 0 ? String(ab) : (ab === 1 ? "" : `${ab} · `) + px + (e > 1 ? WA.MATH.sup(e) : ""); return (c < 0 ? (i ? " − " : "−") : i ? " + " : "") + body; }).join("");
  const vals = ts => ts.map(([c, e], i) => { const w = c * x0 ** e; return i ? (w < 0 ? ` − ${-w}` : ` + ${w}`) : neg(w); }).join("");
  if (v < 0.7) {   // valor numérico
    const p = [rnz(R, -3, 3), R.int(-5, 5), R.int(-6, 6), R.int(-9, 9)].slice(R.r() < 0.5 ? 0 : 1), ts = termsOf(p), val = ts.reduce((s, [c, e]) => s + c * x0 ** e, 0);
    return { q: T.val_q(chain(ts), neg(x0)), kind: "int", ans: val, sol: T.val_s(neg(x0), subst(ts), vals(ts), val) };
  }
  // ¿es raíz?
  const r1 = rnz(R, -4, 4), r2 = R.int(-5, 5), isR = R.r() < 0.5, p = [1, -(r1 + r2), r1 * r2], test = isR ? r1 : (() => { let t; do t = rnz(R, -3, 3); while (t === r1 || t === r2); return t; })();
  const ts = termsOf(p), x1 = test, pt = x1 < 0 ? `(${neg(x1)})` : String(x1);
  const sub2 = ts.map(([c, e], i) => { const ab = Math.abs(c), body = e === 0 ? String(ab) : (ab === 1 ? "" : `${ab} · `) + pt + (e > 1 ? WA.MATH.sup(e) : ""); return (c < 0 ? (i ? " − " : "−") : i ? " + " : "") + body; }).join("");
  const val2 = ts.map(([c, e], i) => { const w = c * x1 ** e; return i ? (w < 0 ? ` − ${-w}` : ` + ${w}`) : neg(w); }).join(""), P1 = ts.reduce((s, [c, e]) => s + c * x1 ** e, 0);
  return { q: T.raiz_q(neg(x1), chain(ts)), kind: "choice", opts: T.sino, correct: P1 === 0 ? 0 : 1, shuffle: false, sol: T.raiz_s(neg(x1), sub2, val2, P1) };
});
def("m8.factorcomun", (R, S) => {
  const g = R.pick([2, 3, 4, 5]), e = R.int(0, 2);
  let p; do p = [R.int(1, 5), rnz(R, -6, 6), ...(R.r() < 0.5 ? [rnz(R, -5, 5)] : [])]; while (gcd(gcd(p[0], p[1]), p[2] || 0) !== 1);
  const full = mulP([g, ...Array(e).fill(0)], p), out = `${g}${e ? (e === 1 ? "x" : "x²") : ""}`, ok = `${out}(${polyHtml(p)})`;
  const alts = [`${g}(${polyHtml(mulP([1, ...Array(e).fill(0)], p))})`, `${out}(${polyHtml(p.map((c, i) => i === p.length - 1 ? c * g : c))})`, `x(${polyHtml(trim(mulP([g, ...Array(Math.max(e - 1, 0)).fill(0)], p)))})`];
  const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 4));
  const L = p.length, mono = (c, deg) => polyHtml([c, ...Array(deg).fill(0)]);
  const divs = p.map((c, i) => `${mono(g * c, L - 1 - i + e)} ${WA.H.div} ${out} = ${mono(c, L - 1 - i)}`).join("; ");
  return { q: S.m8.fc_q(polyHtml(full)), kind: "choice", opts, correct: opts.indexOf(ok),
    sol: S.m8.fc_s(out, polyHtml(p), g, e, S.m8.lista(p.map(c => Math.abs(g * c))), divs) };
});
// Respuesta escrita (como la pregunta fija de la lección): un hueco en el número de fuera o en el último término de dentro
def("m8.fcescrito", (R, S) => {
  const g = R.pick([2, 3, 4, 5, 6]), e = R.int(1, 2), xe = e === 1 ? "x" : "x²", hole = '<span class="wa-hole">□</span>';
  let p; do p = [R.int(1, 5), rnz(R, -6, 6), ...(R.r() < 0.5 ? [rnz(R, -5, 5)] : [])]; while (gcd(gcd(p[0], p[1]), p[2] || 0) !== 1);
  const full = mulP([g, ...Array(e).fill(0)], p), out = `${g}${xe}`, L = p.length, mono = (c, deg) => polyHtml([c, ...Array(deg).fill(0)]);
  const divs = p.map((c, i) => `${mono(g * c, L - 1 - i + e)} ${WA.H.div} ${out} = ${mono(c, L - 1 - i)}`).join("; ");
  const sol = S.m8.fc_s(out, polyHtml(p), g, e, S.m8.lista(p.map(c => Math.abs(g * c))), divs);
  if (R.r() < 0.5) return { q: S.m8.fce_q(`${polyHtml(full)} = ${hole}${xe}(${polyHtml(p)})`, S.m8.fce_num), kind: "int", ans: g, sol };
  const c = p[L - 1], inner = `${polyHtml([...p.slice(0, -1), 0])} ${c < 0 ? "−" : "+"} ${hole}`;   // último término: número (grado 0)
  return { q: S.m8.fce_q(`${polyHtml(full)} = ${out}(${inner})`, S.m8.fce_dentro), kind: "int", ans: Math.abs(c), sol };
});

// ── Ecuaciones de segundo grado ──
def("m8.segundo", (R, S) => {
  const k = R.int(0, 2), a = rnz(R, -3, 3);
  if (k === 0) { const r = R.int(1, 9); return { q: S.m8.sg_q(polyHtml([a, 0, -a * r * r])), kind: "set", ans: [r, -r], hint: S.m8.sg_hint, sol: S.m8.sg0_s(r * r, r) }; }
  if (k === 1) { const r = rnz(R, -9, 9); return { q: S.m8.sg_q(polyHtml([a, -a * r, 0])), kind: "set", ans: [0, r], hint: S.m8.sg_hint, sol: S.m8.sg1_s(polyHtml([a, -a * r]), neg(r)) }; }
  let r1, r2; do { r1 = R.int(-8, 8); r2 = R.int(-8, 8); } while (r1 === r2);
  const cs = [a, -a * (r1 + r2), a * r1 * r2], D = cs[1] ** 2 - 4 * cs[0] * cs[2];
  return { q: S.m8.sg_q(polyHtml(cs)), kind: "set", ans: [r1, r2], hint: S.m8.sg_hint, sol: (p => p.pre + formulaSteps(p.a, p.b, p.c, S.m8.FO).t)(prepQ(cs, S.m8.FO)) };
});
// Solo incompletas (lección de incompletas, antes de la fórmula): ax² + c = 0 y ax² + bx = 0
def("m8.seginc", (R, S) => {
  const a = rnz(R, -3, 3);
  if (R.r() < 0.5) { const r = R.int(1, 9); return { q: S.m8.sg_q(polyHtml([a, 0, -a * r * r])), kind: "set", ans: [r, -r], hint: S.m8.sg_hint, sol: S.m8.sgi0_s(polyHtml([a, 0, 0]), a === 1 ? "" : neg(a), neg(a * r * r), r * r, r) }; }
  const r = rnz(R, -9, 9);
  return { q: S.m8.sg_q(polyHtml([a, -a * r, 0])), kind: "set", ans: [0, r], hint: S.m8.sg_hint, sol: S.m8.sg1_s(polyHtml([a, -a * r]), neg(r)) };
});

// ── Sistemas de ecuaciones lineales ──
def("m8.sistema", (R, S) => {
  let a, b, c, d; do { a = rnz(R, -5, 5); b = rnz(R, -5, 5); c = rnz(R, -5, 5); d = rnz(R, -5, 5); } while (a * d - b * c === 0);
  const x = R.int(-6, 6), y = R.int(-6, 6), e1 = a * x + b * y, e2 = c * x + d * y;
  const eq = (p, q, r) => `${lin(p, 0)}${q < 0 ? " − " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}y = ${neg(r)}`;
  return { q: S.m8.si_q(eq(a, b, e1), eq(c, d, e2)), kind: "fields", fields: [{ label: "x", ans: x }, { label: "y", ans: y }], sol: redSol([[a, b, e1], [c, d, e2]], [x, y], S.m8.SI) };
});
// Ecuaciones lineales con dos incógnitas (lección anterior a los métodos): ¿es solución?, calcular y, ¿cuántas soluciones?
def("m8.sislineal", (R, S) => {
  const T = S.m8.SL, v = R.int(0, 2);
  const eq = (p, q, r) => `${lin(p, 0)}${q < 0 ? " − " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}y = ${neg(r)}`;
  const par = n => n < 0 ? `(${neg(n)})` : String(n);
  const sub = (c, n, first) => { const a = Math.abs(c), t = a === 1 ? par(n) : `${a} · ${par(n)}`; return first ? (c < 0 ? "−" : "") + t : (c < 0 ? " − " : " + ") + t; };
  if (v === 0) {   // ¿es (x, y) solución?
    const a = rnz(R, -4, 4), b = rnz(R, -3, 3), x0 = R.int(-5, 5), y0 = R.int(-5, 5), c = a * x0 + b * y0;
    let x = x0, y = y0; if (R.r() < 0.5) { do { x = x0 + rnz(R, -2, 2); } while (a * x + b * y === c); }
    const t1 = a * x, t2 = b * y, val = t1 + t2, ok = val === c;
    return { q: T.es_q(`(${neg(x)}, ${neg(y)})`, eq(a, b, c)), kind: "choice", opts: T.sino, correct: ok ? 0 : 1, shuffle: false,
      sol: T.es_s(neg(x), neg(y), sub(a, x, true) + sub(b, y, false), `${neg(t1)}${t2 < 0 ? " − " : " + "}${Math.abs(t2)}`, neg(val), neg(c), ok) };
  }
  if (v === 1) {   // en ax ± y = c, ¿cuánto vale y si x = k?
    const a = rnz(R, -5, 5), b = R.pick([1, -1]), k = R.int(-4, 5), y = R.int(-9, 9), c = a * k + b * y;
    return { q: T.y_q(eq(a, b, c), neg(k)), kind: "int", ans: y,
      sol: T.y_s(neg(k), sub(a, k, true) + (b < 0 ? " − y" : " + y"), neg(a * k), b, neg(c), b > 0 ? `${neg(c)} ${a * k < 0 ? "+" : "−"} ${Math.abs(a * k)}` : `${neg(a * k)} ${c < 0 ? "+" : "−"} ${Math.abs(c)}`, neg(y)) };
  }
  // ¿cuántas soluciones tiene el sistema?
  const caso = R.int(0, 2), a = rnz(R, -4, 4), b = rnz(R, -3, 3), x0 = R.int(-4, 4), y0 = R.int(-4, 4), c = a * x0 + b * y0;
  let a2, b2, c2, m = R.pick([2, 3, -1, -2]);
  if (caso === 0) { do { a2 = rnz(R, -4, 4); b2 = rnz(R, -3, 3); } while (a * b2 - b * a2 === 0); c2 = a2 * x0 + b2 * y0; }
  else { a2 = m * a; b2 = m * b; c2 = caso === 2 ? m * c : m * c + rnz(R, -5, 5); }
  return { q: T.n_q(eq(a, b, c), eq(a2, b2, c2)), kind: "choice", opts: T.n_o, correct: [0, 1, 2][caso], shuffle: false,
    sol: T.n_s(caso, neg(m), eq(a2, b2, m * c), neg(c2), `(${neg(x0)}, ${neg(y0)})`) };
});
def("m8.sisproblema", (R, S) => {
  const k = R.int(0, 2);
  if (k === 0) {   // entradas de dos precios: x a p €, y a q € (precios distintos y cantidades distintas)
    let x, y, p, q; do { x = R.int(5, 30); y = R.int(5, 30); p = R.int(2, 9); q = R.int(2, 9); } while (p === q || x === y);
    return { q: S.m8.sp_q[0](x + y, p, q, p * x + q * y), kind: "fields", fields: [{ label: S.m8.sp_f[0][0](p), ans: x }, { label: S.m8.sp_f[0][1](q), ans: y }], sol: S.m8.sp_s[0](x, y, p, q, x + y, p * x + q * y) };
  }
  if (k === 1) { const x = R.int(10, 60), y = R.int(1, x - 1); return { q: S.m8.sp_q[1](x + y, x - y), kind: "fields", fields: [{ label: S.m8.sp_f[1][0], ans: x }, { label: S.m8.sp_f[1][1], ans: y }], sol: S.m8.sp_s[1](x, y, x + y, x - y) }; }
  if (R.r() < 0.35) {   // edades: hace n años, una edad era k veces la otra; ahora suman s
    let x, y, n, k; do { k = R.int(2, 4); n = R.int(2, 8); y = R.int(n + 2, 20); x = k * (y - n) + n; } while (x > 70 || x === y);
    return { q: S.m8.sp_q[3](n, k, x + y), kind: "fields", fields: [{ label: S.m8.sp_f[3][0], ans: x }, { label: S.m8.sp_f[3][1], ans: y }], sol: S.m8.sp_s[3](x, y, n, k, x + y) };
  }
  let g, c; do { g = R.int(4, 20); c = R.int(4, 20); } while (g === c); return { q: S.m8.sp_q[2](g + c, 2 * g + 4 * c), kind: "fields", fields: [{ label: S.m8.sp_f[2][0], ans: g }, { label: S.m8.sp_f[2][1], ans: c }], sol: S.m8.sp_s[2](g, c, g + c, 2 * g + 4 * c) };
});

// ── Teorema de Pitágoras ──
const TRIP = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15], [12, 16, 20], [20, 21, 29], [9, 40, 41], [15, 20, 25]];
// Escaleras creíbles (en décimas de metro): el pie cerca de la pared y la escalera de 1,3 a 6,5 m, como en la lección (6,5 m con el pie a 2,5 m)
const ESC = [[7, 24, 25], [9, 40, 41], [5, 12, 13], [15, 36, 39], [10, 24, 26], [25, 60, 65], [20, 48, 52], [8, 15, 17]];
function escalera(R, S, H) {
  const [a, b, c] = R.pick(ESC), d = x => H.dec(x / 10), q = x => H.dec(x / 100);
  return { q: S.m8.pa_q[2](d(c), d(a)), kind: "num", ans: b / 10, sol: S.m8.pa_esc(d(c), d(a), q(c * c), q(a * a), q(c * c - a * a), d(b)) };
}
def("m8.pitagoras", (R, S, H) => {
  const [a, b, c] = R.pick(TRIP), k = R.int(0, 2);
  if (k === 0) return { q: S.m8.pi_h_q(a, b), kind: "num", ans: c, sol: S.m8.pi_h_s(a, b, a * a + b * b, c, a * a, b * b) };
  if (k === 1) return { q: S.m8.pi_c_q(c, a), kind: "num", ans: b, sol: S.m8.pi_c_s(c, a, c * c - a * a, b, c * c, a * a) };
  let x, y; do { x = R.int(2, 9); y = R.int(2, 9); } while (Number.isInteger(Math.sqrt(x * x + y * y)));   // raíz no exacta
  const d = Math.sqrt(x * x + y * y), r = Math.round(d * 100) / 100;
  const fx = (v, k) => v.toFixed(k).replace(".", WA.H.ds);
  return { q: S.m8.pi_n_q(x, y), kind: "num", ans: r, tol: 0.006, ansHtml: fx(r, 2), sol: S.m8.pi_n_s(x, y, x * x, y * y, x * x + y * y, fx(Math.floor(d * 1000) / 1000, 3), fx(r, 2)) };
});
def("m8.pitaplic", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const [a, b, c] = R.pick(TRIP); return { q: S.m8.pa_q[0](a, b), kind: "num", ans: c, sol: S.m8.pa_s[0](a, b, c) }; }
  if (k === 1) { const [hb, h, l] = R.pick(TRIP); return { q: S.m8.pa_q[1](l, 2 * hb), kind: "num", ans: h, sol: S.m8.pa_s[1](l, hb, h) }; }
  return escalera(R, S, H);
});
def("m8.pit3d", (R, S, H) => {
  const B = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [3, 4, 12, 13], [2, 10, 11, 15]];
  const [a, b, c, d] = R.pick(B), k = R.int(1, 3);
  return { q: S.m8.p3_q(a * k, b * k, c * k), kind: "num", ans: d * k, sol: S.m8.p3_s(a * k, b * k, c * k, (d * k) ** 2, d * k) };
});

// ── Semejanza y teorema de Tales ──
def("m8.tales", (R, S, H) => {
  if (R.r() < 0.5) {   // dos rectas que se cortan en O, cortadas por dos paralelas
    let a, b; do { a = R.int(2, 9); b = R.int(2, 9); } while (a === b);
    const k = R.pick([1.5, 2, 2.5, 3, 4]), a2 = a * k, b2 = rd(b * k);
    return { q: S.m8.ta_q(a, b, H.dec(a2)), kind: "num", ans: b2, tol: 0.011, sol: S.m8.ta_s(a, b, H.dec(a2), H.dec(b2), H.dec(k)) };
  }
  for (let g = 0; g < 100; g++) {   // sombras: palo de 1 a 2 m, árbol de menos de 30 m, todo exacto
    const h = R.pick([1, 1.2, 1.5, 1.6, 2]), r = R.pick([0.5, 0.6, 0.75, 0.8, 1.2, 1.25, 1.5, 2]), s = rd(h / r, 4), S2 = R.int(4, 20), x = rd(S2 * r, 4);
    if (!Number.isInteger(s * 100) || s === h || !Number.isInteger(x * 100) || x >= 30) continue;
    return { q: S.m8.ta2_q(H.dec(h), H.dec(s), S2), kind: "num", ans: x, tol: 0.011, sol: S.m8.ta2_s(H.dec(h), H.dec(s), S2, H.dec(x), H.dec(r)) };
  }
  return null;
});
def("m8.semejanza", (R, S, H) => {
  const k = R.pick([2, 3, 4, 0.5, 1.5]), t = R.int(0, 2);
  if (t === 0) { const l = R.int(2, 10); return { q: S.m8.se_q[0](l, H.dec(rd(l * k))), kind: "num", ans: k, tol: 0.001, sol: S.m8.se_s[0](H.dec(rd(l * k)), l, H.dec(k)) }; }
  if (t === 1) { const A = R.int(5, 40); return { q: S.m8.se_q[1](H.dec(k), A, k < 1), kind: "num", ans: rd(A * k * k), tol: 0.011, sol: S.m8.se_s[1](H.dec(k), A, H.dec(rd(k * k)), H.dec(rd(A * k * k))) }; }
  const V = Number.isInteger(k) ? R.int(2, 30) : 4 * R.int(1, 7);   // con k = 0,5 o 1,5, V múltiplo de 4: el volumen sale exacto (una cifra decimal como mucho)
  return { q: S.m8.se_q[2](H.dec(k), V, k < 1), kind: "num", ans: rd(V * k ** 3), tol: 0.011, sol: S.m8.se_s[2](H.dec(k), V, H.dec(rd(k ** 3, 3)), H.dec(rd(V * k ** 3))) };
});

// ── Áreas y volúmenes de cuerpos ──
def("m8.areavol", (R, S, H) => {
  const k = R.int(0, 6), a = R.int(2, 10), b = R.int(2, 10), h = R.int(2, 12), PI = Math.PI, A = S.m8.av_s;
  const v2 = x => H.dec(rd(x, 2)), eqa = n => n % 3 === 0 ? "=" : "≈";   // «=» si la división entre 3 es exacta
  const T = [
    [S.m8.av_q[0](a, b, h), a * b * h, 0, A[0](a, b, h, a * b * h)],
    [S.m8.av_q[1](a, b, h), 2 * (a * b + a * h + b * h), 0, A[1](a, b, h, 2 * a * b, 2 * a * h, 2 * b * h, 2 * (a * b + a * h + b * h))],
    [S.m8.av_q[2](a, h), a * a * h / 3, 2, A[2](a, h, a * a, a * a * h, eqa(a * a * h), v2(a * a * h / 3))],
    [S.m8.av_q[3](a, h), PI * a * a * h, 2, A[3](a, h, a * a * h, v2(PI * a * a * h))],
    [S.m8.av_q[4](a, h), 2 * PI * a * (a + h), 2, A[4](a, h, 2 * a * h, 2 * a * a, 2 * a * (a + h), v2(2 * PI * a * (a + h)))],
    [S.m8.av_q[5](a, h), PI * a * a * h / 3, 2, A[5](a, h, a * a * h, a * a * h % 3 === 0 ? `${a * a * h / 3}π` : null, v2(PI * a * a * h / 3))],
    [S.m8.av_q[6](a), 4 / 3 * PI * a ** 3, 2, A[6](a, a ** 3, 4 * a ** 3, 4 * a ** 3 % 3 === 0 ? `${4 * a ** 3 / 3}π` : null, v2(4 / 3 * PI * a ** 3))],
  ][k];
  return { q: T[0], kind: "num", ans: rd(T[1], T[2]), tol: T[2] ? 0.6 + T[1] * 0.002 : 0, sol: T[3] };
});

// ── Áreas de prismas y pirámides (solo lo de esa lección: sin volúmenes ni cuerpos redondos) ──
const TRIP2 = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];
def("m8.areapris", (R, S) => {
  const T = S.m8.AP, v = R.int(0, 4);
  if (v === 0) { let a, b, c; do { a = R.int(2, 12); b = R.int(2, 10); c = R.int(2, 9); } while (a === b && b === c);
    return { q: T.ort_q(a, b, c), kind: "int", ans: 2 * (a * b + a * c + b * c), sol: T.ort_s(a, b, c, a * b, a * c, b * c) }; }
  if (v === 1) { const l = R.int(2, 15); return { q: T.cubo_q(l), kind: "int", ans: 6 * l * l, sol: T.cubo_s(l, l * l, 6 * l * l) }; }
  if (v === 2) {   // prisma de base triángulo rectángulo (catetos de una terna pitagórica)
    const [p, q, r] = R.pick(TRIP2), h = R.int(4, 20), P = p + q + r;
    return { q: T.tri_q(p, q, h), kind: "int", ans: P * h + p * q, sol: T.tri_s(p, q, r, p * p + q * q, P, h, P * h, p * q / 2, p * q) };
  }
  if (v === 3) {   // pirámide cuadrangular con la apotema
    const L = 2 * R.int(2, 8), ap = R.int(L / 2 + 1, 16);
    return { q: T.pa_q(L, ap), kind: "int", ans: 2 * L * ap + L * L, sol: T.pa_s(L, ap, L * ap / 2, 2 * L * ap, L * L) };
  }
  const [m, h, ap] = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15]]), L = 2 * m, lat = R.r() < 0.5;   // con la altura: Pitágoras
  return { q: T.ph_q(L, h, lat), kind: "int", ans: 2 * L * ap + (lat ? 0 : L * L), sol: T.ph_s(L, m, h, h * h + m * m, ap, L * ap / 2, 2 * L * ap, L * L, lat) };
});

// ── Áreas del cilindro, el cono y la esfera (en función de π o con la tecla π, redondeando a las décimas) ──
def("m8.arearedo", (R, S) => {
  const T = S.m8.AR, v = R.int(0, 3), exact = R.r() < 0.3;
  let q, k, body;
  if (v === 0) { const r = R.int(1, 10), h = R.int(2, 15), tot = R.r() < 0.5; k = 2 * r * h + (tot ? 2 * r * r : 0); q = T.cil_q(r, h, tot); body = T.cil_s(r, h, 2 * r * h, 2 * r * r, tot); }
  else if (v === 1 || v === 2) {
    let r, g, h = 0;
    if (v === 1) { r = R.int(2, 9); g = R.int(r + 1, 15); } else { [r, h, g] = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [4, 3, 5], [8, 6, 10], [12, 5, 13]]); }
    const tot = R.r() < 0.5; k = r * g + (tot ? r * r : 0);
    q = h ? T.conoh_q(r, h, tot) : T.cono_q(r, g, tot);
    body = (h ? T.gen_s(r, h, r * r + h * h, g) : "") + T.cono_s(r, g, r * g, r * r, tot);
  }
  else { const r = R.int(1, 12); k = 4 * r * r; q = T.esf_q(r); body = T.esf_s(r, r * r, k); }
  if (exact) return { q: q + " " + T.k_q, kind: "int", ans: k, sol: body + " " + T.k_s(k) };
  const val = Math.round(k * Math.PI * 10) / 10, v1 = val.toFixed(1).split("."), vt = WA.H.n(+v1[0]) + WA.H.ds + v1[1];   // 1809,6 (es) · 1,809.6 (en)
  return { q: q + " " + T.dec_q, kind: "num", ans: val, tol: 0.051, ansHtml: vt, sol: body + " " + T.dec_s(k, vt) };
});

// ── Función de proporcionalidad directa y = mx (antes de las afines: nunca «+ n») ──
def("m8.lineal", (R, S, H) => {
  const T = S.m8.LI, v = R.int(0, 3), MS = [2, 3, 4, 5, -2, -3, -4, 0.5, 1.5, 2.5, -0.5, -1.5];
  const eqm = m => `y = ${m === 1 ? "" : m === -1 ? "−" : H.dec(m)}x`, pr = x => x < 0 ? `(${neg(x)})` : String(x);
  if (v === 0) {   // m a partir de un punto
    const m = R.pick(MS), x = R.pick([2, 4, 6, 8, 10, -2, -4]), y = m * x;
    return { q: T.m_q(`(${neg(x)}, ${H.dec(y)})`), kind: "num", ans: m, sol: T.m_s(H.dec(y), pr(x), H.dec(m), eqm(m)) };
  }
  if (v === 1) {   // completar la tabla
    const m = R.pick(MS), xs = R.shuffle([-3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 4).sort((a, b) => a - b);
    return { q: T.tab_q(eqm(m)), kind: "fields", fields: xs.map(x => ({ label: `x = ${neg(x)}`, kind: "num", ans: m * x })),
      sol: T.tab_s(H.dec(m), xs.map(x => `${H.dec(m)} · ${pr(x)} = ${H.dec(m * x)}`).join("; ")) };
  }
  if (v === 3) {   // ¿cuál es la más inclinada? (se compara la pendiente sin el signo)
    const ab = R.shuffle([0.5, 1, 1.5, 2, 3, 4, 5]).slice(0, 4), ms = ab.map(x => R.r() < 0.45 ? -x : x), big = R.r() < 0.6, j = ab.indexOf(big ? Math.max(...ab) : Math.min(...ab)), eqs = ms.map(eqm);
    return { q: big ? T.inc_q : T.inc2_q, kind: "choice", opts: eqs, correct: j, shuffle: false, sol: T.inc_s(ms.map(x => `|${H.dec(x)}| = ${H.dec(Math.abs(x))}`).join("; "), eqs[j], big) };
  }
  const m = R.pick([2, 3, 4, 5, 1.5, 2.5]), n = R.r() < 0.5 ? 0 : rnz(R, -4, 4), xs = R.shuffle([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((a, b) => a - b), ys = xs.map(x => m * x + n);
  const quots = xs.map((x, i) => `${H.dec(ys[i])} ${WA.H.div} ${x} = ${H.dec(Math.round(ys[i] / x * 1000) / 1000)}${Number.isInteger(ys[i] * 1000 / x) ? "" : "…"}`).join("; ");
  return { q: T.es_q(xs.join("; "), ys.map(y => H.dec(y)).join("; ")), kind: "choice", opts: T.sino, correct: n === 0 ? 0 : 1, shuffle: false, sol: T.es_s(quots, n === 0, eqm(m)) };
});

// ── Rectas: pendiente y ordenada en el origen ──
def("m8.recta", (R, S) => {
  const x1 = R.int(-5, 3), x2 = x1 + R.int(1, 4), m = F.make(rnz(R, -4, 4), R.pick([1, 1, 2])), y1 = R.int(-5, 5);
  const y2 = y1 + (x2 - x1) * m[0] / m[1];
  if (!Number.isInteger(y2)) return null;
  const n = F.sub(F.make(y1, 1), F.mul(m, F.make(x1, 1))), fh = f => F.html(f, WA.H), par = v => v < 0 ? `(${neg(v)})` : String(v);
  const dy = y2 - y1, dx = x2 - x1, frac0 = dx === 1 || (dy / dx === m[0] / m[1] && dx === m[1]) ? "" : `${neg(dy)}/${dx}`;
  const slope = S.m8.re_s(neg(y2), par(y1), neg(x2), par(x1), frac0, fh(m));
  if (R.r() < 0.5) return { q: S.m8.re_q(`(${neg(x1)}, ${neg(y1)})`, `(${neg(x2)}, ${neg(y2)})`), kind: "frac", ans: m, sol: slope };
  const mt = m[1] === 1 ? String(m[0]) : `${m[0]}/${m[1]}`, nt = n[1] === 1 ? String(n[0]) : `${n[0]}/${n[1]}`;
  // y = −x + 1, y = x, y = 3/2 x + 7 (fracción apilada): sin «1x» ni «+ 0»
  const mc = m[1] === 1 ? (m[0] === 1 ? "" : m[0] === -1 ? "−" : neg(m[0])) : fh(m), mp = m[1] === 1 ? par(m[0]) : `(${fh(m)})`;
  const eqH = `y = ${mc}x${n[0] === 0 ? "" : n[0] < 0 ? ` − ${fh([-n[0], n[1]])}` : ` + ${fh(n)}`}`;
  const p = F.mul(m, F.make(x1, 1));
  // n = y₁ − p con p fraccionaria: con común denominador, «n = 3 − 3/2 = 6/2 − 3/2 = 3/2» (no saltar la resta)
  const Hh = WA.H, mid = p[1] === 1 || y1 === 0 ? "" : ` = ${y1 < 0 ? "−" : ""}${Hh.frac(Math.abs(y1) * p[1], p[1])} ${p[0] < 0 ? "+" : "−"} ${Hh.frac(Math.abs(p[0]), p[1])}`;
  const pp = (p[0] < 0 ? `(${fh(p)})` : fh(p)) + mid;
  return { q: S.m8.re2_q(`(${neg(x1)}, ${neg(y1)})`, `(${neg(x2)}, ${neg(y2)})`), kind: "expr", ans: `(${mt})*x+(${nt})`, ansHtml: eqH, hint: S.m8.re_hint,
    sol: S.m8.re2_s(slope, neg(y1), mp, par(x1), fh(p), pp, fh(n), eqH) };
});
// ═════ Inecuaciones, la parábola y = ax² y frecuencia relativa (generadores añadidos) ═════
function opt8(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ── Desigualdades e inecuaciones sencillas ──
const SGN = ["<", "≤", ">", "≥"];   // 0 <, 1 ≤, 2 >, 3 ≥
const flipS = s => (s + 2) % 4, eqS = s => s ^ 1;   // dar la vuelta · con o sin igual
const holds = (v, s, k) => [v < k, v <= k, v > k, v >= k][s];
const ineq = (s, k) => `x ${SGN[s]} ${neg(k)}`;
const ineqH = (s, k) => ineq(s, k).replace("<", "&lt;").replace(">", "&gt;");   // para las opciones
const term8 = (c, first) => WA.MATH.term(c, "x", first);
// Una inecuación de primer grado cuya solución es x [s] k
function makeIneq(R) {
  const k = rnz(R, -9, 9), s = R.int(0, 3);
  if (R.r() < 0.5) {   // a·x + b [s0] c
    let a; do a = rnz(R, -6, 6); while (Math.abs(a) < 2);
    const b = rnz(R, -12, 12), c = a * k + b, s0 = a < 0 ? flipS(s) : s;
    return { k, s, text: `${lin(a, b)} ${SGN[s0]} ${neg(c)}`, steps: [[`${term8(a, true)} ${SGN[s0]} ${neg(c)} ${b < 0 ? "+" : "−"} ${Math.abs(b)}`, `${term8(a, true)} ${SGN[s0]} ${neg(c - b)}`], a, s0], val: x => [a * x + b, c] };
  }
  let a, c; do { a = rnz(R, -6, 6); c = rnz(R, -6, 6); } while (a === c || Math.abs(a - c) < 2 || Math.abs(a - c) > 6);   // a·x + b [s0] c·x + d
  const m = a - c, b = rnz(R, -10, 10), d = b + m * k, s0 = m < 0 ? flipS(s) : s;
  return { k, s, text: `${lin(a, b)} ${SGN[s0]} ${lin(c, d)}`, steps: [[`${term8(a, true)}${c < 0 ? " + " : " − "}${Math.abs(c) === 1 ? "" : Math.abs(c)}x ${SGN[s0]} ${neg(d)}${b < 0 ? " + " : " − "}${Math.abs(b)}`, `${term8(m, true)} ${SGN[s0]} ${neg(d - b)}`], m, s0], val: x => [a * x + b, c * x + d] };
}
// Cociente de un problema: exacto si lo es; si no, truncado a las centésimas con «…» (nunca redondeado hacia arriba)
const cot = (n, d, H) => { const v = n / d; return Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-6 ? H.dec(Math.round(v * 1000) / 1000) : H.dec(Math.floor(v * 100 + 1e-9) / 100) + "…"; };
const solveTxt = (T, e) => { const [[st1, st2], m, s0] = e.steps; return T.pasos(e.text, st1, st2, m, m < 0, ineq(e.s, e.k), SGN[s0]); };
function rayLine(s, k) {   // la solución x [s] k en la recta numérica
  const lo = k - 5, hi = k + 5, w = 340, pad = 20, X = v => pad + (v - lo) * (w - 2 * pad) / (hi - lo), y = 34, left = s < 2, x0 = X(k);
  let b = `<line x1="8" y1="${y}" x2="${w - 8}" y2="${y}" stroke="${C.dark}" stroke-width="1.5"/>`;
  for (let v = lo; v <= hi; v++) b += `<line x1="${X(v)}" y1="${y - 5}" x2="${X(v)}" y2="${y + 5}" stroke="${C.dark}"/>` + SVG.txt(X(v), y + 20, neg(v), 11);
  const xe = left ? 10 : w - 10;
  b += `<line x1="${x0}" y1="${y}" x2="${xe}" y2="${y}" stroke="${C.blue}" stroke-width="5"/><path d="M${xe},${y} l${left ? 9 : -9},-6 l0,12 Z" fill="${C.blue}"/>`;
  b += `<circle cx="${x0}" cy="${y}" r="6" fill="${s % 2 ? C.blue : "#fff"}" stroke="${C.blue}" stroke-width="2.5"/>`;
  return SVG.svg(w, 62, b);
}
def("m8.inecuacion", (R, S, H) => {
  const T = S.m8.IN, v = R.int(0, 5);
  if (v === 0) {   // resolver
    const e = makeIneq(R), { opts, correct } = opt8(R, ineqH(e.s, e.k), [ineqH(flipS(e.s), e.k), ineqH(e.s, -e.k), ineqH(eqS(e.s), e.k)]);
    return { q: T.resuelve_q(e.text), kind: "choice", opts, correct, sol: solveTxt(T, e) };
  }
  if (v === 1) {   // el mayor o el menor entero que la cumple
    const e = makeIneq(R), up = e.s < 2, ans = [e.k - 1, e.k, e.k + 1, e.k][e.s];
    return { q: T.entero_q(e.text, up), kind: "int", ans, sol: solveTxt(T, e) + " " + T.entero_s(ineq(e.s, e.k), up, ans, e.s % 2 === 1) };
  }
  if (v === 2) {   // leer la recta numérica
    const s = R.int(0, 3), k = R.int(-6, 6);
    return { q: T.recta_q + "<br>" + rayLine(s, k), kind: "choice", opts: [0, 1, 2, 3].map(g => ineqH(g, k)), correct: s, shuffle: false, sol: T.recta_s(s % 2 === 1, s < 2, ineq(s, k)) };
  }
  if (v === 3) {   // problemas
    const t = R.int(0, 3);
    if (t === 0) { const F0 = R.pick([100, 150, 200, 250]), p = R.pick([8, 10, 12, 15, 20]), xm = R.int(10, 40), B = F0 + p * xm + R.int(0, p - 1) - (R.r() < 0.5 ? 0 : 0); const B2 = Math.round(B / 10) * 10, ans = Math.floor((B2 - F0) / p); return { q: T.sala_q(F0, p, B2), kind: "int", ans, sol: T.sala_s(F0, p, B2, cot(B2 - F0, p, H), ans) }; }
    if (t === 1) { const m0 = R.int(60, 95), w = R.pick([20, 25, 30, 35, 40]), M = R.pick([450, 600, 630, 800, 1000]), ans = Math.floor((M - m0) / w); return { q: T.asc_q(M, m0, w), kind: "int", ans, sol: T.asc_s(m0, w, M, cot(M - m0, w, H), ans) }; }
    if (t === 2) { const b = R.int(5, 12), p = R.pick([1.5, 2, 2.5, 3]), B = R.int(b + 3 * p, b + 12 * p), ans = Math.floor((B - b) / p); const eu = x => WA.MATH.eur(x, H); return { q: T.movil_q(eu(b), eu(p), eu(B)), kind: "int", ans, sol: T.movil_s(eu(b), eu(p), eu(B), eu(B - b), cot(B - b, p, H), ans) }; }
    const s0 = R.int(0, 10) * 5, a = R.pick([5, 6, 8, 10, 12, 15, 20]), G0 = R.int(8, 30) * 10, ans = Math.ceil((G0 - s0) / a);
    if (G0 <= s0) return null;
    return { q: T.ahorro_q(s0, a, G0), kind: "int", ans, sol: T.ahorro_s(s0, a, G0, G0 - s0, cot(G0 - s0, a, H), ans) };
  }
  if (v === 4) {   // ¿es solución?
    const e = makeIneq(R), x = e.k + R.pick([-2, -1, 0, 0, 1, 2]), [l, r] = e.val(x), ok = holds(x, e.s, e.k), sgn0 = e.steps[2];
    return { q: T.essol_q(e.text, x), kind: "choice", opts: T.sino, correct: ok ? 0 : 1, shuffle: false, sol: T.essol_s(x, neg(l), neg(r), SGN[sgn0], ok) };
  }
  const lt = R.r() < 0.5, m = rnz(R, -5, 5), add = R.r() < 0.3;   // propiedades
  const correct = add ? (lt ? 1 : 0) : (m > 0 ? (lt ? 1 : 0) : (lt ? 0 : 1));
  const ea = add ? `a ${m < 0 ? "−" : "+"} ${Math.abs(m)}` : `${m === -1 ? "−" : m === 1 ? "" : neg(m)}a`, eb = add ? `b ${m < 0 ? "−" : "+"} ${Math.abs(m)}` : `${m === -1 ? "−" : m === 1 ? "" : neg(m)}b`;
  return { q: T.prop_q(lt ? "<" : ">", ea, eb), kind: "choice", opts: [">", "<", "="], correct, shuffle: false, sol: T.prop_s(add, m < 0, lt, ea, eb, [">", "<"][correct], m) };
});

// ── La parábola y = ax² ──
const AS = [1, 2, 3, 4, 5, -1, -2, -3, -4, 0.5, -0.5];
const eqA = (a, H) => `y = ${a === 1 ? "" : a === -1 ? "−" : H.dec(a)}x²`;
const sq = x => x < 0 ? `(${neg(x)})` : String(x);
function parabSvg(a) {   // y = ax² con la misma escala en los dos ejes
  const u = 18, xr = 4, yr = 5, W = 2 * xr * u + 30, Hh = 2 * yr * u + 20, ox = W / 2, oy = Hh / 2, P = (x, y) => [ox + x * u, oy - y * u];
  let b = "";
  for (let i = -xr; i <= xr; i++) b += `<line x1="${ox + i * u}" y1="${oy - yr * u}" x2="${ox + i * u}" y2="${oy + yr * u}" stroke="#e3e6ea"/>`;
  for (let j = -yr; j <= yr; j++) b += `<line x1="${ox - xr * u}" y1="${oy - j * u}" x2="${ox + xr * u}" y2="${oy - j * u}" stroke="#e3e6ea"/>`;
  b += `<line x1="${ox - xr * u - 6}" y1="${oy}" x2="${ox + xr * u + 6}" y2="${oy}" stroke="${C.dark}" stroke-width="1.5"/><line x1="${ox}" y1="${oy + yr * u + 6}" x2="${ox}" y2="${oy - yr * u - 6}" stroke="${C.dark}" stroke-width="1.5"/>`;
  for (let i = -xr; i <= xr; i += 2) if (i) b += SVG.txt(ox + i * u, oy + 13, neg(i), 10);
  for (let j = -yr + 1; j <= yr; j += 2) b += SVG.txt(ox - 5, oy - j * u + 4, neg(j), 10, C.dark, "end");
  const xb = Math.min(xr, Math.sqrt(yr / Math.abs(a))), pts = [];   // sin salirse de la cuadrícula
  for (let i = 0; i <= 80; i++) { const x = -xb + 2 * xb * i / 80; pts.push(P(x, a * x * x).map(v => v.toFixed(1)).join(",")); }
  b += `<polyline points="${pts.join(" ")}" fill="none" stroke="${C.red}" stroke-width="2.5"/>`;
  for (let x = -2; x <= 2; x++) { const y = a * x * x; if (Math.abs(y) <= yr && Number.isInteger(y)) { const [px, py] = P(x, y); b += `<circle cx="${px}" cy="${py}" r="3.5" fill="${C.red}"/>`; } }
  return SVG.svg(W, Hh, b);
}
def("m8.parabola", (R, S, H) => {
  const T = S.m8.PB, v = R.int(0, 7), a = R.pick(AS), E = eqA(a, H);
  if (v === 0) {   // calcular y
    const x = rnz(R, -6, 6), y = a * x * x;
    return { q: T.valor_q(E, neg(x)), kind: "num", ans: y, sol: T.valor_s(H.dec(a), sq(x), x * x, H.dec(y), x < 0) };
  }
  if (v === 1) {   // la tabla de valores
    const xs = [-2, -1, 0, 1, 2];
    return { q: T.tabla_q(E), kind: "fields", fields: xs.map(x => ({ label: `x = ${neg(x)}`, kind: "num", ans: a * x * x })), sol: T.tabla_s(xs.map(x => `${H.dec(a)} · ${sq(x)}² = ${H.dec(a * x * x)}`).join("; "), a > 0) };
  }
  if (v === 2) {   // hallar a
    const x0 = rnz(R, -4, 4), y0 = a * x0 * x0;
    return { q: T.hallar_q(`(${neg(x0)}, ${H.dec(y0)})`), kind: "num", ans: a, sol: T.hallar_s(H.dec(y0), sq(x0), x0 * x0, H.dec(a), E) };
  }
  if (v === 3) return { q: T.abre_q(E), kind: "choice", opts: T.abre_o, correct: a > 0 ? 0 : 1, shuffle: false, sol: T.abre_s(H.dec(a), a > 0) };   // hacia dónde se abre
  if (v === 4) {   // la más cerrada o la más abierta
    const abs = R.shuffle([0.25, 0.5, 1, 2, 3, 4, 5]).slice(0, 4), as = abs.map(x => R.r() < 0.35 ? -x : x), closed = R.r() < 0.5;
    const j = abs.indexOf(closed ? Math.max(...abs) : Math.min(...abs)), eqs = as.map(x => eqA(x, H));
    return { q: (closed ? T.cerrada_q : T.abierta_q), kind: "choice", opts: eqs, correct: j, shuffle: false, sol: T.cerr_s(abs.map(x => H.dec(x)).join("; "), eqs[j], closed) };
  }
  if (v === 5) {   // ¿pasa por el punto?
    const x0 = rnz(R, -4, 4), good = a * x0 * x0, wrong = R.pick([(a * x0) ** 2, 2 * a * x0, -good].filter(w => w !== good)), y0 = R.r() < 0.5 ? good : wrong;
    return { q: T.pasa_q(E, `(${neg(x0)}, ${H.dec(y0)})`), kind: "choice", opts: T.sino, correct: y0 === good ? 0 : 1, shuffle: false, sol: T.pasa_s(H.dec(a), sq(x0), H.dec(good), H.dec(y0), y0 === good) };
  }
  if (v === 6) {   // no es proporcional: al multiplicar x por k, y se multiplica por k²
    const k = R.int(2, 5), c = R.int(0, 1);
    return { q: T.escala_q[c](k), kind: "int", ans: k * k, sol: T.escala_s(k, c ? "t" : "x", T.escala_w[c]) };
  }
  const pool = [2, 1, 0.5, -1, -2, -0.5, 3, -3], aa = R.pick(pool), others = R.shuffle(pool.filter(x => x !== aa)).slice(0, 3), eqs = R.shuffle([aa, ...others]);   // ¿de qué parábola es la gráfica?
  return { q: T.graf_q + "<br>" + parabSvg(aa), kind: "choice", opts: eqs.map(x => eqA(x, H)), correct: eqs.indexOf(aa), sol: T.graf_s(H.dec(aa), H.dec(4 * aa), aa > 0, eqA(aa, H)) };
});

// ── Frecuencia relativa y probabilidad ──
def("m8.frecrel", (R, S, H) => {
  const T = S.m8.FR, v = R.int(0, 5);
  if (v <= 1) {   // estimar una probabilidad con la frecuencia relativa
    const [obj, ev, other] = R.pick(T.objs), N = R.pick([200, 250, 400, 500, 800, 1000]), h = R.int(15, 85) / 100, f = Math.round(h * N), hr = Math.round(f / N * 1000) / 1000;
    if (v === 0) return { q: T.h_q(obj, N, ev, f), kind: "num", ans: hr, tol: 0.0006, sol: T.h_s(f, N, H.dec(hr)) };
    return { q: T.contr_q(obj, N, ev, f, other), kind: "num", ans: Math.round((1 - hr) * 1000) / 1000, tol: 0.0006, sol: T.contr_s(f, N, H.dec(hr), H.dec(Math.round((1 - hr) * 1000) / 1000), other) };
  }
  if (v === 2) {   // número esperado = N · P
    const [what, num, den] = R.pick(T.esperado), N = den * R.int(5, 40) * (den === 6 ? 5 : den === 20 ? 1 : 10);
    return { q: T.esp_q(what, N), kind: "int", ans: N * num / den, sol: T.esp_s(N, num, den, N * num / den) };
  }
  if (v === 3) {   // tres resultados
    const N = R.pick([200, 400, 500]); let a, b, c; do { a = R.int(10, 70) * N / 100; b = R.int(5, 40) * N / 100; c = N - a - b; } while (c < N * 0.05);
    const ns = [a, b, c], j = R.int(0, 2), p = Math.round(ns[j] / N * 1000) / 1000;
    return { q: T.tres_q(N, ns, j), kind: "num", ans: p, tol: 0.0006, sol: T.tres_s(T.vaso[j], ns[j], N, H.dec(p)) };
  }
  if (v === 4) {   // ¿se puede decir algo?
    const caso = R.int(0, 2), ji = R.int(0, 1), [what, p, pTxt, obj] = T.juicio[ji];
    let N, f;
    // «pocas tiradas»: solo resultados que pasan a menudo con una moneda o un dado normales (probabilidad de salir o pasarse > 10 %)
    if (caso === 1) { const ok = ji === 0 ? { 10: [6, 7], 12: [7, 8], 20: [12, 13] } : { 12: [3, 4], 20: [5, 6] }; N = +R.pick(Object.keys(ok)); f = R.pick(ok[N]); }
    else if (caso === 0) { N = R.pick([600, 1000, 2000]); f = Math.round(N * (p + R.pick([0.12, 0.15, 0.2]))); }
    else { N = R.pick([600, 1000, 2000]); f = Math.round(N * (p + R.pick([-0.01, 0.005, 0.01]))); }
    const hr = Math.round(f / N * 1000) / 1000;
    return { q: T.juicio_q(what, N, f), kind: "choice", opts: T.juicio_o, correct: caso, shuffle: false, sol: T.juicio_s(caso, f, N, H.dec(hr), pTxt, obj) };
  }
  const n = R.int(4, 9);   // el azar no compensa
  return { q: T.falacia_q(n), kind: "choice", opts: T.falacia_o, correct: 0, shuffle: false, sol: T.falacia_s };
});
// ── fin: ═════ Inecuaciones, la parábola y = ax² y frecuencia relativa (generadores añadidos) ═════

// ═════ Ronda M (2026-11): lo nuevo de 2.º con generadores propios ═════
const { lcm, factorize, factorsHtml, sup } = WA.MATH;
const ft = f => f[1] === 1 ? neg(f[0]) : `${neg(f[0])}/${f[1]}`;      // −1/3
const fp = f => f[0] < 0 ? `(${ft(f)})` : ft(f);                        // (−1/3)
// Suma o resta con el m.c.m. de los denominadores; simplifica al final
function addF(a, b, s) {
  const m = lcm(a[1], b[1]), x = a[0] * m / a[1], y = b[0] * m / b[1], n = x + s * y, r = F.make(n, m), op = s > 0 ? "+" : "−";
  let t = `${ft(a)} ${op} ${fp(b)}`;
  if (m === 1) return { t: `${t} = ${neg(n)}`, r };
  if (a[1] !== m || b[1] !== m) t += ` = ${neg(x)}/${m} ${op} ${y < 0 ? `(${neg(y)}/${m})` : `${y}/${m}`}`;
  t += ` = ${neg(n)}/${m}`;
  if (r[1] !== m) t += ` = ${ft(r)}`;
  return { t, r };
}
// Producto simplificando antes de multiplicar (como enseña la lección)
function mulF(a, b, T) {
  const g1 = gcd(a[0], b[1]), g2 = gcd(b[0], a[1]), r = F.mul(a, b), t0 = `${fp(a)} · ${fp(b)}`, cuts = [];
  if (g1 > 1) cuts.push(T.corta(Math.abs(a[0]), b[1], g1));
  if (g2 > 1) cuts.push(T.corta(Math.abs(b[0]), a[1], g2));
  return { t: cuts.length ? `${t0} = ${ft(r)} ${T.simp(cuts)}` : `${t0} = ${ft(r)}`, r };
}
function powF(a, e, T) {
  const r = [a[0] ** e, a[1] ** e];
  return { t: `(${ft(a)})${sup(e)} = ${a[0] < 0 ? `(${neg(a[0])})` : a[0]}${sup(e)}/${a[1]}${sup(e)} = ${ft(r)}${a[0] < 0 ? " " + T.par(e % 2 === 0) : ""}`, r };
}
const rfr = (R, dens) => { const d = R.pick(dens); let n; do n = R.int(1, d + 2); while (gcd(n, d) !== 1 || n === d); return F.make(n, d); };

// ── Fracciones: operaciones combinadas con potencias ──
def("m8.frpot", (R, S) => {
  const T = S.m8.FP, t = R.int(0, 3);
  for (let k = 0; k < 80; k++) {
    if (t === 3) {   // potencia impar de una fracción negativa, producto y suma
      const A0 = rfr(R, [2, 3, 4]), A = [-A0[0], A0[1]], C = rfr(R, [2, 3, 4, 5, 8, 9]), E = R.pick([[1, 1], [2, 1], [1, 2]]);
      if (Math.abs(A[0]) > 3) continue;
      const pw = powF(A, 3, T), m = mulF(pw.r, C, T), z = addF(m.r, E, 1);
      if (Math.abs(z.r[0]) > 60 || z.r[1] > 60 || !z.r[0]) continue;
      return { q: T.q(`(${ft(A)})³ · ${ft(C)} + ${ft(E)}`), kind: "frac", ans: z.r, simplest: true,
        sol: [T.pot(pw.t), T.prod(m.t), T.suma(z.t), T.fin(ft(z.r))].join(" ") };
    }
    const A = rfr(R, [2, 3, 4, 5, 6]), B = rfr(R, [2, 3, 4, 6]);
    if (A[1] === B[1]) continue;
    const s = R.r() < 0.5 ? 1 : -1, sm = addF(A, B, s), P = sm.r;
    if (!P[0] || Math.abs(P[0]) > 5 || P[1] > 12) continue;
    const pw = powF(P, 2, T), inner = `(${ft(A)} ${s > 0 ? "+" : "−"} ${ft(B)})²`, C = rfr(R, [2, 3, 4, 5, 6, 8, 9]), steps = [T.par_(sm.t), T.pot(pw.t)];
    let r, expr;
    if (t === 0) { const m = mulF(pw.r, C, T); r = m.r; expr = `${inner} · ${ft(C)}`; steps.push(T.prod(m.t)); }
    else if (t === 1) { const D = R.pick([[1, 1], [2, 1], [3, 1], [1, 2], [3, 4]]), m = mulF(C, pw.r, T), z = addF(D, m.r, -1); r = z.r; expr = `${ft(D)} − ${ft(C)} · ${inner}`; steps.push(T.prod(m.t), T.resta(z.t)); }
    else { const m = mulF(pw.r, [C[1], C[0]], T); r = m.r; expr = `${inner} ${WA.H.div} ${ft(C)}`; steps.push(T.coc(`${ft(pw.r)} ${WA.H.div} ${ft(C)} = ${m.t}`)); }
    if (!r[0] || Math.abs(r[0]) > 99 || r[1] > 99) continue;
    steps.push(T.fin(ft(r)));
    return { q: T.q(expr), kind: "frac", ans: r, simplest: true, sol: steps.join(" ") };
  }
  return null;
});

// ── Problemas con fracciones: «de lo que queda», total desconocido, diferencia de fracciones ──
def("m8.frprob", (R, S) => {
  const T = S.m8.FB, t = R.int(0, 3), nm = R.pick(S.m8.NAMES);
  const pf = (dens) => rfr(R, dens).map(Math.abs);
  for (let k = 0; k < 80; k++) {
    const A = pf([3, 4, 5, 6]), Cc = pf([2, 3, 4, 5]);
    if (A[0] >= A[1] || Cc[0] >= Cc[1]) continue;
    if (t <= 1) {   // gasta A del total y Cc de lo que queda
      const q1 = addF([1, 1], A, -1), m = mulF(Cc, q1.r, T), q = addF(q1.r, m.r, -1), Q = q.r;
      if (!Q[0] || Q[0] < 0) continue;
      const steps = [T.queda1(q1.t), T.luego(m.t), T.queda2(q.t)];
      if (t === 1) return { q: T.frac_q(nm, ft(A), ft(Cc)), kind: "frac", ans: Q, simplest: true, sol: steps.concat(T.fin(ft(Q))).join(" ") };
      const ctx = R.int(0, 1), lo = ctx ? 60 : 30, hi = ctx ? 600 : 400;
      const ks = []; for (let j = 1; Q[1] * j <= hi; j++) if (Q[1] * j >= lo) ks.push(j);
      if (!ks.length) continue;
      const j = R.pick(ks), Tot = Q[1] * j, Rest = Q[0] * j;
      return { q: T.total_q[ctx](nm, ft(A), ft(Cc), Rest), kind: "int", ans: Tot,
        sol: steps.concat(T.total_s(ft(Q), Rest, Q[0], Q[1], j, Tot, ctx)).join(" ") };
    }
    if (t === 2) {   // el depósito: de A a Cc al añadir L litros
      const lo = A[0] / A[1], hi = Cc[0] / Cc[1];
      if (hi - lo < 0.15 || A[1] === Cc[1]) continue;
      const d = addF(Cc, A, -1), D = d.r, js = []; for (let j = 1; D[1] * j <= 600; j++) if (D[1] * j >= 60 && (D[1] * j) % A[1] === 0 && (D[1] * j) % Cc[1] === 0) js.push(j);
      if (!js.length) continue;
      const j = R.pick(js), Tot = D[1] * j, L = D[0] * j;
      return { q: T.dep_q(ft(A), L, ft(Cc)), kind: "int", ans: Tot, sol: T.dep_s(d.t, ft(D), L, D[0], D[1], j, Tot, ft(A), Tot * A[0] / A[1], ft(Cc), Tot * Cc[0] / Cc[1]) };
    }
    // la clase: A andando, Cc en autobús, el resto en bici
    if (A[1] === Cc[1]) continue;
    const s = addF(A, Cc, 1); if (s.r[0] >= s.r[1]) continue;
    const rest = addF([1, 1], s.r, -1), L = lcm(A[1], Cc[1]), N = L * R.int(Math.ceil(12 / L), Math.floor(36 / L) || 1);
    if (N < 12 || N > 36 || N % rest.r[1]) continue;
    return { q: T.clase_q(N, ft(A), ft(Cc)), kind: "int", ans: N * rest.r[0] / rest.r[1], sol: T.clase_s(s.t, rest.t, rest.r, N, N * rest.r[0] / rest.r[1]) };
  }
  return null;
});

// ── Decimales periódicos → fracción (con x, 10x, 100x) y tipo de decimal sin simplificar ──
function decTxt(n, d, H) {   // 0,58333… · 0,2727… · 0,375
  const sep = H.dec(1.5).replace(/[0-9]/g, "") || ",", ip = Math.floor(n / d), digs = [], seen = {};
  let r = n % d;
  while (r && !(r in seen) && digs.length < 30) { seen[r] = digs.length; r *= 10; digs.push(Math.floor(r / d)); r %= d; }
  if (!r) return `${ip}${digs.length ? sep + digs.join("") : ""}`;
  const a = seen[r], per = digs.slice(a).join("");
  return `${ip}${sep}${digs.slice(0, a).join("")}${per.repeat(per.length === 1 ? 4 : per.length === 2 ? 2 : 1)}…`;
}
def("m8.periodico", (R, S, H) => {
  const T = S.m8.PE, v = R.r();
  const sep = H.dec(1.5).replace(/[0-9]/g, "") || ",";
  if (v < 0.4) {   // puro
    const E = R.pick([0, 0, 0, 1, 2, 3]), k = R.r() < 0.55 ? 1 : 2, M = 10 ** k - 1;
    let P; do P = k === 1 ? R.int(1, 8) : R.int(1, 98); while (k === 2 && P % 11 === 0);
    const ps = String(P).padStart(k, "0"), x = `${E}${sep}${ps.repeat(k === 1 ? 4 : 2)}…`, big = E * (M + 1) + P, ans = F.make(big - E, M);
    return { q: T.q(x), kind: "frac", ans, simplest: true,
      sol: T.puro_s(x, k, M + 1, `${big}${sep}${ps.repeat(k === 1 ? 3 : 2)}…`, big, E, M, big - E, ft(ans)) };
  }
  if (v < 0.75) {   // mixto: anteperiodo de 1 cifra
    const E = R.pick([0, 0, 0, 1, 2]), k = R.r() < 0.7 ? 1 : 2, a = R.int(0, 9);
    let P; do P = k === 1 ? R.int(1, 8) : R.int(1, 98); while ((k === 2 && P % 11 === 0) || P % 10 === a);
    const ps = String(P).padStart(k, "0"), x = `${E}${sep}${a}${ps.repeat(k === 1 ? 4 : 2)}…`;
    const n10 = 10 * E + a, nBig = n10 * 10 ** k + P, M = 10 ** (k + 1) - 10, ans = F.make(nBig - n10, M);
    return { q: T.q(x), kind: "frac", ans, simplest: true,
      sol: T.mixto_s(x, `${n10}${sep}${ps.repeat(k === 1 ? 3 : 2)}…`, 10 ** (k + 1), `${nBig}${sep}${ps.repeat(k === 1 ? 3 : 2)}…`, k, nBig, n10, M, nBig - n10, ft(ans)) };
  }
  // ¿qué tipo de decimal? con una fracción sin simplificar
  const c = R.int(0, 2), base = R.pick([[[3, 8], [7, 20], [9, 40], [3, 5], [7, 25], [1, 4], [3, 16]], [[2, 3], [5, 9], [3, 11], [4, 7], [7, 9], [1, 3]], [[5, 6], [7, 12], [11, 30], [1, 6], [7, 15], [5, 22]]][c]);
  const kk = R.pick([[3, 7, 9], [2, 5, 10], [3, 7]][c]), n = base[0] * kk, d = base[1] * kk;
  return { q: T.tipo_q(`${n}/${d}`), kind: "choice", opts: T.tipos, correct: c, shuffle: false,
    sol: T.tipo_s(`${n}/${d}`, `${base[0]}/${base[1]}`, kk, base[1] === 1 ? "1" : (Object.keys(factorize(base[1])).length > 1 || Object.values(factorize(base[1]))[0] > 1 ? `${base[1]} = ${factorsHtml(factorize(base[1]), H)}` : String(base[1])), c, decTxt(base[0], base[1], H)) };
});

// ── Propiedades de las potencias con exponentes enteros (negativos y cero) ──
const P = (b, e) => `${b}<sup>${neg(e)}</sup>`, pe = e => e < 0 ? `(${neg(e)})` : String(e);
def("m8.potprop", (R, S) => {
  const T = S.m8.PP, v = R.r();
  if (v < 0.4) {   // misma base: producto y cociente
    const b = R.pick([2, 3, 5, 7, 10]);
    let es, ops; do { es = [R.int(-6, 7), R.int(-6, 7), R.int(-6, 7)]; ops = [R.r() < 0.5, R.r() < 0.5]; } while (!es.some(x => x < 0) || es.some(x => x === 0 || x === 1));
    const tot = es[0] + (ops[0] ? es[1] : -es[1]) + (ops[1] ? es[2] : -es[2]);
    const expr = `${P(b, es[0])} ${ops[0] ? "·" : WA.H.div} ${P(b, es[1])} ${ops[1] ? "·" : WA.H.div} ${P(b, es[2])}`;
    const sum = `${neg(es[0])} ${ops[0] ? "+" : "−"} ${pe(es[1])} ${ops[1] ? "+" : "−"} ${pe(es[2])}`;
    return { q: T.una_q(expr, b), kind: "int", ans: tot, sol: T.una_s(sum, tot, b) };
  }
  if (v < 0.65) {   // bases distintas que son potencias de 2 o de 3
    const fam = R.r() < 0.6 ? [2, [[4, 2], [8, 3], [16, 4]]] : [3, [[9, 2], [27, 3]]], b = fam[0];
    const [B1, k1] = R.pick(fam[1]), [B2, k2] = R.pick(fam[1]);
    let e1, e2, e3; do { e1 = R.int(-3, 4); e2 = R.int(-3, 3); e3 = R.int(1, 5); } while (!e1 || !e2 || (e1 > 0 && e2 > 0));
    const div = R.r() < 0.5, tot = k1 * e1 + k2 * e2 + (div ? -e3 : e3);
    const expr = `${P(B1, e1)} · ${P(B2, e2)} ${div ? WA.H.div : "·"} ${P(b, e3)}`;
    return { q: T.una_q(expr, b), kind: "int", ans: tot,
      sol: T.base_s(b, [[B1, k1, e1], [B2, k2, e2]].map(([B, k, e]) => `${P(B, e)} = (${b}<sup>${k}</sup>)<sup>${neg(e)}</sup> = ${P(b, k * e)}`), `${P(b, k1 * e1)} · ${P(b, k2 * e2)} ${div ? WA.H.div : "·"} ${P(b, e3)}`, `${neg(k1 * e1)} ${k2 * e2 < 0 ? "−" : "+"} ${Math.abs(k2 * e2)} ${div ? "−" : "+"} ${e3}`, tot) };
  }
  if (v < 0.8) {   // potencia de una potencia
    const b = R.pick([2, 3, 5, 10]); let m, n; do { m = R.int(-4, 4); n = R.int(-4, 4); } while (!m || !n || m === 1 || n === 1 || (m > 0 && n > 0));
    return { q: T.una_q(`(${P(b, m)})<sup>${neg(n)}</sup>`, b), kind: "int", ans: m * n, sol: T.pot_s(neg(m), pe(n), m * n, b) };
  }
  // mismo exponente: se juntan las bases
  const [a, c, mul] = R.pick([[2, 5, 1], [25, 4, 1], [20, 5, 1], [50, 2, 1], [4, 5, 1], [12, 4, 0], [15, 5, 0], [18, 6, 0], [35, 7, 0], [40, 20, 0]]), n = R.int(2, mul ? (a * c >= 100 ? 4 : 5) : 4);
  const base = mul ? a * c : a / c, val = base ** n;
  return { q: T.mismo_q(mul ? `${P(a, n)} · ${P(c, n)}` : `${P(a, n)} ${WA.H.div} ${P(c, n)}`), kind: "int", ans: val, sol: T.mismo_s(a, c, n, mul, base, val) };
});

// ── Aproximar raíces por tanteo (décimas, por defecto) y raíces exactas de decimales y fracciones ──
def("m8.raizaprox", (R, S, H) => {
  const T = S.m8.RA;
  if (R.r() < 0.7) {
    let n; do n = R.int(2, 200); while (Number.isInteger(Math.sqrt(n)));
    const a = Math.floor(Math.sqrt(n)); let t = 0; while ((10 * a + t + 1) ** 2 <= 100 * n) t++;   // con enteros: (10a + t)² ≤ 100n
    const sq = k => H.dec(k * k / 100), lo = 10 * a + t, hi = lo + 1;
    return { q: T.q(n), kind: "num", ans: lo / 10, tol: 1e-6, ansHtml: H.dec(lo / 10).includes(H.ds) ? H.dec(lo / 10) : `${a}${H.ds}0`,
      sol: T.s(n, a, a * a, a + 1, (a + 1) ** 2, `${a}${H.ds}${t}`, sq(lo), `${Math.floor(hi / 10)}${H.ds}${hi % 10}`, sq(hi)) };
  }
  const k = R.int(0, 2);
  if (k === 0) { const r = R.int(1, 9), dd = R.r() < 0.5 ? 1 : 2, x = r / 10 ** dd, x2 = r * r / 10 ** (2 * dd); return { q: T.ex_q(`√${H.dec(x2)}`), kind: "num", ans: x, tol: 1e-9, sol: T.dec_s(H.dec(x), H.dec(x2), H.dec(x2 * 10)) }; }
  if (k === 1) { let p, q; do { p = R.int(1, 9); q = R.int(2, 10); } while (gcd(p, q) !== 1); return { q: T.ex_q(`√(${p * p}/${q * q})`) + " " + T.fr_q, kind: "frac", ans: [p, q], sol: T.fr_s(p, q, p * p, q * q) }; }
  const r = rnz(R, -6, 6), c = r ** 3; return { q: T.ex_q(`∛(${neg(c)})`), kind: "int", ans: r, sol: T.cub_s(neg(r), r < 0 ? `(${neg(r)})` : r, neg(c)) };
});

// ── Porcentaje de variación (también por encima del 100 %) y puntos porcentuales ──
def("m8.pcvar", (R, S, H) => {
  const T = S.m8.PV;
  if (R.r() < 0.25) {   // puntos porcentuales frente a porcentaje
    for (let g = 0; g < 80; g++) {
      const a = R.pick([4, 5, 8, 10, 12, 15, 16, 20, 25, 40]), b = R.int(2, 50), d = b - a;
      if (!d || (d * 100) % a || b > 2 * a || 2 * b < a) continue;
      const [what] = R.pick(T.pp_ctx);
      return { q: T.pp_q(what, a, b), kind: "fields", fields: [{ label: T.pp_f[0], kind: "num", ans: d }, { label: T.pp_f[1], kind: "num", ans: d * 100 / a }], sol: T.pp_s(a, b, d, d * 100 / a) };
    }
    return null;
  }
  const big = R.r() < 0.3, [obj, u, As, cts] = R.pick(T.ctx);
  for (let g = 0; g < 80; g++) {
    const A = R.pick(As);
    const p = big ? R.pick([120, 150, 200, 250, 300]) : R.pick([-60, -45, -40, -30, -25, -20, -15, -12, -10, -5, 5, 8, 10, 15, 20, 25, 30, 40, 60, 75, 90]);
    const B = A * (100 + p) / 100;
    if (!Number.isInteger(cts ? Math.round(B * 1e6) / 1e4 : B) || B <= 0) continue;
    const i = B / A;
    const sh = x => u === H.moneyCfg.sym ? WA.MATH.eur(x, H) : H.n(x);
    return { q: T.q(obj, sh(A), sh(B), u), kind: "num", ans: p, tol: 0.001, sol: T.s(sh(A), sh(B), H.dec(i), p, u) };
  }
  return null;
});

// ── Consumo responsable: precio por unidad, ofertas, plazos y tarifas ──
def("m8.consumo", (R, S, H) => {
  const T = S.m8.CO, eu = x => WA.MATH.eur(x, H, true), v = R.int(0, 3);
  if (v === 0) {   // dos formatos: ¿cuál sale más barato por kilo o litro?
    const [prod, U, sub] = R.pick(T.prods), sz = R.shuffle([250, 500, 750, 1000, 1500, 2000]).slice(0, 2).sort((x, y) => y - x);
    let k1, k2; do { k1 = 20 * R.int(15, 90); k2 = 20 * R.int(15, 90); } while (Math.abs(k1 - k2) < 40);   // céntimos por kilo (o litro)
    const p1 = k1 * sz[0] / 1000, p2 = k2 * sz[1] / 1000, best = Math.min(k1, k2) / 100;   // precios en céntimos exactos
    const s = x => x >= 1000 ? `${H.dec(x / 1000)} ${U}` : `${x} ${sub}`;
    return { q: T.pu_q(prod, s(sz[0]), eu(p1 / 100), s(sz[1]), eu(p2 / 100), U), kind: "num", ans: best, tol: 0.001, ansHtml: H.money(best, true) + "/" + U,
      sol: T.pu_s([[eu(p1 / 100), H.dec(sz[0] / 1000), eu(k1 / 100)], [eu(p2 / 100), H.dec(sz[1] / 1000), eu(k2 / 100)]], U, k1 < k2 ? s(sz[0]) : s(sz[1]), eu(best)) };
  }
  if (v === 1) {   // ¿a qué descuento equivale la oferta?
    const c = R.int(0, 2);
    if (c === 0) { const p = R.pick([20, 30, 40, 50, 60, 70, 80]); return { q: T.of_q[0](p), kind: "num", ans: p / 2, tol: 0.001, sol: T.of_s[0](p, H.dec(1 - p / 100), H.dec(2 - p / 100), H.dec(p / 100), H.dec(p / 2)) }; }
    if (c === 1) { const [n, m] = R.pick([[3, 2], [4, 3], [5, 4], [6, 5]]), d = Math.round((n - m) / n * 1000) / 10; return { q: T.of_q[1](n, m), kind: "num", ans: d, tol: 0.051, ansHtml: H.dec(d), sol: T.of_s[1](n, m, H.dec(d)) }; }
    const g = R.pick([20, 25, 50, 100]), d = Math.round(g / (100 + g) * 1000) / 10;
    return { q: T.of_q[2](g), kind: "num", ans: d, tol: 0.051, ansHtml: H.dec(d), sol: T.of_s[2](g, 100 + g, H.dec(d)) };
  }
  if (v === 2) {   // al contado o a plazos: ¿qué porcentaje más?
    for (let g = 0; g < 200; g++) {
      const n = R.pick([6, 10, 12, 20, 24]), p = R.pick([5, 8, 10, 12, 15, 20, 25]), C = 20 * R.int(10, 60), tot = C * (100 + p) / 100;
      if (!Number.isInteger(tot) || tot % n) continue;
      return { q: T.pl_q(C, n, tot / n), kind: "num", ans: p, tol: 0.001, sol: T.pl_s(n, tot / n, tot, C, tot - C, H.dec((tot - C) / C), p) };
    }
    return null;
  }
  // dos tarifas: ¿con cuántos meses cuestan lo mismo?
  const b = R.int(8, 30), a = b + R.pick([3, 4, 5, 6, 8, 10]), m = R.int(3, 12), F0 = (a - b) * m, what = R.pick(T.tar);
  return { q: T.ta_q(what, a, b, F0), kind: "int", ans: m, sol: T.ta_s(a, b, F0, a - b, m) };
});

// ── La fórmula de segundo grado paso a paso (la usan m8.segundo, m8.formula y m8.ecproblema) ──
const pz = n => n < 0 ? `(${neg(n)})` : String(n);
function formulaSteps(a, b, c, T) {   // a > 0 y raíces reales; devuelve texto y raíces
  const D = b * b - 4 * a * c, sD = Math.sqrt(D), nb = -b, den = 2 * a;
  let t = T.fs_abc(neg(a), neg(b), neg(c)) + " " + T.fs_D(pz(b), pz(a), pz(c), b * b, 4 * a * c, D);
  if (D === 0) return { t: t + " " + T.fs_doble(neg(nb), den, ft(F.make(nb, den))), roots: [nb / den] };
  const r1 = F.make(nb + sD, den), r2 = F.make(nb - sD, den), fd = r => ft(r) + (r[1] === 1 ? "" : " = " + neg(r[0] / r[1]).replace(".", WA.H.ds));
  t += " " + T.fs_x(neg(nb), sD, den, `${neg(nb + sD)}/${den}`, fd(r1), `${neg(nb - sD)}/${den}`, fd(r2));
  return { t, roots: [r1[0] / r1[1], r2[0] / r2[1]] };
}
// Antes de la fórmula: si a es negativo, se multiplica por −1; si hay factor común, se simplifica
function prepQ(cs, T) {
  let [a, b, c] = cs, pre = "";
  if (a < 0) { a = -a; b = -b; c = -c; pre += T.fs_neg(polyHtml([a, b, c])) + " "; }
  const g = gcd(gcd(a, b), c);
  if (g > 1) { a /= g; b /= g; c /= g; pre += T.fs_simp(g, polyHtml([a, b, c])) + " "; }
  return { a, b, c, pre };
}
def("m8.formula", (R, S, H) => {
  const T = S.m8.FO, v = R.r();
  if (v < 0.3) {   // ¿cuántas soluciones? (el discriminante)
    const caso = R.int(0, 2); let a, b, c, D;
    do { a = rnz(R, -3, 3); b = R.int(-9, 9); c = rnz(R, -9, 9);
      if (caso === 1) { const r = rnz(R, -5, 5); b = -2 * a * r; c = a * r * r; }
      D = b * b - 4 * a * c; } while ((caso === 0 && D <= 0) || (caso === 2 && D >= 0) || Math.abs(b) > 30);
    return { q: T.n_q(polyHtml([a, b, c])), kind: "choice", opts: T.n_o, correct: caso, shuffle: false, sol: T.n_s(neg(a), neg(b), neg(c), pz(b), pz(a), pz(c), b * b, 4 * a * c, D, caso) };
  }
  let cs, sep = ",";
  if (v < 0.6) {   // dos raíces enteras, a veces con a negativo o con factor común
    let r1, r2; do { r1 = R.int(-8, 8); r2 = R.int(-8, 8); } while (r1 === r2);
    const a = R.pick([1, 1, 2, 3, -1, -2]); cs = [a, -a * (r1 + r2), a * r1 * r2];
  } else if (v < 0.8) {   // una raíz no entera (con decimales): (2x − q)(x − r)
    let q, r; do { q = R.pick([-7, -5, -3, -1, 1, 3, 5, 7]); r = R.int(-5, 5); } while (2 * r === q);
    cs = [2, -(q + 2 * r), q * r]; sep = ";";
  } else {   // solución doble: a(x − r)²
    const r = rnz(R, -6, 6), a = R.pick([1, 1, 2, -1]); cs = [a, -2 * a * r, a * r * r];
  }
  const p = prepQ(cs, T), f = formulaSteps(p.a, p.b, p.c, T), ans = [...new Set(f.roots)];
  return { q: T.r_q(polyHtml(cs), sep === ";"), kind: "set", ans, sep, hint: sep === ";" ? T.hint_pc : S.m8.sg_hint, sol: p.pre + f.t };
});

// ── Ecuaciones con denominadores: multiplicar por el m.c.m. ──
// Cada término: [signo, coef. de x, número, denominador] → «(x + 3)/4», «x/6», «2»
function fracTerm(s, cx, cn, d, first) {
  let num = cx && cn ? `${cx === 1 ? "" : cx}x ${cn < 0 ? "−" : "+"} ${Math.abs(cn)}` : cx ? `${cx === 1 ? "" : cx}x` : String(Math.abs(cn));
  const body = d === 1 ? num : (cx && cn ? `(${num})/${d}` : `${num}/${d}`);
  const neg0 = s < 0 || (!cx && cn < 0 && d === 1);
  return (first ? (neg0 ? "−" : "") : neg0 ? " − " : " + ") + body;
}
def("m8.ecden", (R, S) => {
  const T = S.m8.ED, t = R.int(0, 2), D2 = [2, 3, 4, 6];
  for (let k = 0; k < 200; k++) {
    let L, Rt;   // lados: listas de términos [s, cx, cn, d]
    const [p, q, r] = R.shuffle(D2).slice(0, 3), a = rnz(R, -6, 6), b = rnz(R, -6, 6), c = rnz(R, -4, 4);
    if (t === 0) { L = [[1, 1, a, p], [-1, 1, b, q]]; Rt = [[1, 0, c, 1]]; }
    else if (t === 1) { L = [[1, 1, 0, p], [1, 1, a, q]]; Rt = [[1, 1, b, r]]; }
    else { L = [[1, 0, Math.abs(c) + 1, 1], [-1, 1, a, p]]; Rt = [[1, 1, 0, q]]; }
    const all = L.concat(Rt), M = all.reduce((m, x) => lcm(m, x[3]), 1);
    const ex = side => side.map(([s, cx, cn, d]) => [s * cx * M / d, s * cn * M / d]);   // tras multiplicar por M
    const le = ex(L), re = ex(Rt), A = le.reduce((u, x) => u + x[0], 0) - re.reduce((u, x) => u + x[0], 0), B = re.reduce((u, x) => u + x[1], 0) - le.reduce((u, x) => u + x[1], 0);
    if (!A) continue;
    const X = F.make(B, A);
    if (X[1] !== 1 && R.r() < 0.75) continue;   // casi siempre solución entera
    if (Math.abs(X[0]) > 30 || X[1] > 9) continue;
    const show = side => side.map((x, i) => fracTerm(...x, i === 0)).join("");
    const mult = side => side.map(([s, cx, cn, d], i) => { const m = M / d, body = cx && cn ? `${m === 1 ? "" : m}(${cx === 1 ? "" : cx}x ${cn < 0 ? "−" : "+"} ${Math.abs(cn)})` : cx ? `${m * cx === 1 ? "" : m * cx}x` : String(Math.abs(m * cn)); const ng = s < 0 || (!cx && cn < 0); return (i ? (ng ? " − " : " + ") : ng ? "−" : "") + body; }).join("");
    const exp = side => chain(side.flatMap(([cx, cn]) => [[cx, 1], [cn, 0]]).filter(([v]) => v));
    const divs = all.filter(x => x[3] > 1).map(x => `${M} ${WA.H.div} ${x[3]} = ${M / x[3]}`);
    const hasMinus = all.some(([s, cx, cn, d]) => s < 0 && cx && cn);
    let a2 = A, b2 = B; if (a2 < 0) { a2 = -a2; b2 = -b2; }
    const raw = `${neg(b2)}/${a2}`;
    return { q: T.q(show(L) + " = " + show(Rt)), kind: "frac", ans: X, hint: T.hint,
      sol: T.s(all.filter(x => x[3] > 1).map(x => x[3]).join(", "), M, [...new Set(divs)].join(", "), mult(L) + " = " + mult(Rt), hasMinus, exp(le) + " = " + exp(re), `${A === 1 ? "" : A === -1 ? "−" : neg(A)}x = ${neg(B)}`, ft(X), A === 1 ? "" : X[1] === 1 ? `${neg(B)} ${WA.H.div} ${pz(A)}` : raw === ft(X) ? "" : raw) };
  }
  return null;
});

// ── Problemas que se resuelven con una ecuación (también de segundo grado) ──
def("m8.ecproblema", (R, S) => {
  const T = S.m8.EP, t = R.int(0, 3);
  for (let g = 0; g < 200; g++) {
    if (t === 0) {   // edades en dos momentos
      const k = R.int(3, 6), m = R.int(2, k - 1), n = R.int(2, 20), num = (m - 1) * n, den = k - m;
      if (num % den) continue; const x = num / den; if (x < 3 || x > 16 || k * x > 60 || k * x < 25) continue;
      return { q: T.ed_q(k, n, m), kind: "int", ans: x, sol: T.ed_s(k, n, m, k - m, m * n - n, x, k * x) };
    }
    if (t === 1) {   // rectángulo: área y diferencia de lados
      const x = R.int(3, 15), d = R.int(1, 8), A = x * (x + d), D = d * d + 4 * A, sD = Math.sqrt(D);
      return { q: T.re_q(A, d), kind: "int", ans: x, sol: T.re_s(d, A, D, sD, x, -d - sD, (-d - sD) / 2, x + d) };
    }
    if (t === 2) {   // dos consecutivos de producto P
      const x = R.int(5, 25), P = x * (x + 1), D = 1 + 4 * P, sD = Math.sqrt(D);
      return { q: T.co_q(P), kind: "int", ans: x, sol: T.co_s(P, D, sD, x, (-1 - sD) / 2) };
    }
    const x = R.int(3, 12), kk = R.int(1, 3), N = x * x - kk * x, D = kk * kk + 4 * N, sD = Math.sqrt(D), x2 = (kk - sD) / 2;   // el cuadrado de un número menos k veces el número
    if (N <= 0 || !Number.isInteger(x2)) continue;
    return { q: T.cu_q(kk, N), kind: "int", ans: x, sol: T.cu_s(kk, N, D, sD, x, x2) };
  }
  return null;
});

// ── Sistemas: la solución con el método de cada lección (sustitución, igualación, reducción) ──
const VN = ["x", "y"];
const eqSis = (p, q, r) => `${lin(p, 0)}${q < 0 ? " − " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}y = ${neg(r)}`;
const kv = (c, v) => (Math.abs(c) === 1 ? (c < 0 ? "−" : "") : neg(c)) + v;                     // −x, 3y
const tm = (c, v, first) => first ? kv(c, v) : (c < 0 ? " − " : " + ") + kv(Math.abs(c), v);     // « − 3y»
const nm = (c, first) => first ? neg(c) : (c < 0 ? " − " : " + ") + Math.abs(c);
const cdot = (c, val) => (c === 1 ? "" : c === -1 ? "−" : `${neg(c)} · `) + pz(val);            // 3 · (−2)
const subLin = (M, N, val) => M === 0 ? neg(N) : cdot(M, val) + (N ? (N < 0 ? ` − ${-N}` : ` + ${N}`) : "");
const chk = (E, X, T) => T.comp + " " + E.map(([a, b, e]) => `${cdot(a, X[0])} ${b < 0 ? "−" : "+"} ${cdot(Math.abs(b), X[1])} = ${neg(a * X[0] + b * X[1])} ✓`).join("; ") + ".";
const solveLin = (A, B, v) => A === 1 ? `${v} = ${neg(B)}` : `${kv(A, v)} = ${neg(B)} → ${v} = ${neg(B)} ${WA.H.div} ${pz(A)} = ${neg(B / A)}`;
function susSol(E, k, u, X, T) {
  const w = 1 - u, o = 1 - k, s = E[k][u], cw = E[k][w], r = E[k][2], M = -s * cw, N = s * r;
  const cu2 = E[o][u], cw2 = E[o][w], r2 = E[o][2], A = cw2 + cu2 * M, B = r2 - cu2 * N, exprU = lin(M, N, VN[w]);
  const partU = `${Math.abs(cu2) === 1 ? (cu2 < 0 ? "−" : "") : `${neg(cu2)} · `}(${exprU})`, partW = kv(cw2, VN[w]);
  const sub = (u === 0 ? partU + (cw2 < 0 ? " − " + kv(-cw2, VN[w]) : " + " + partW) : partW + (cu2 < 0 ? " − " + partU.replace(/^−/, "") : " + " + partU)) + ` = ${neg(r2)}`;
  const ex = (u === 0 ? [[cu2 * M, 1], [cu2 * N, 0], [cw2, 1]] : [[cw2, 1], [cu2 * M, 1], [cu2 * N, 0]]).filter(([c]) => c);
  const exp = ex.map(([c, isV], i) => isV ? tm(c, VN[w], i === 0) : nm(c, i === 0)).join("") + ` = ${neg(r2)}`;
  return `${T.desp(VN[u], k, s)} ${VN[u]} = ${exprU}. ${T.sust(o)} ${sub} → ${exp} → ${solveLin(A, B, VN[w])}. ${T.vuelve} ${VN[u]} = ${subLin(M, N, X[w])} = ${neg(X[u])}. ${chk(E, X, T)}`;
}
function redSol(E, X, T) {
  const v = Math.abs(E[0][0]) === Math.abs(E[1][0]) ? 0 : 1, w = 1 - v;   // v: la incógnita que se elimina
  const k1 = Math.abs(E[0][v]), k2 = Math.abs(E[1][v]), g = gcd(k1, k2), m1 = k2 / g, m2 = k1 / g, out = [];
  const F1 = E[0].map(t => t * m1), F2 = E[1].map(t => t * m2);
  if (m1 !== 1) out.push(T.mult(0, m1, eqSis(...F1)));
  if (m2 !== 1) out.push(T.mult(1, m2, eqSis(...F2)));
  const same = Math.sign(F1[v]) === Math.sign(F2[v]), sg = same ? -1 : 1, A = F1[w] + sg * F2[w], B = F1[2] + sg * F2[2];
  const pair = (c1, c2, vv) => same ? `(${kv(c1, vv)} − ${c2 < 0 ? `(${kv(c2, vv)})` : kv(c2, vv)})` : `(${kv(c1, vv)} ${c2 < 0 ? "−" : "+"} ${kv(Math.abs(c2), vv)})`;
  const cons = same ? `${neg(F1[2])} − ${pz(F2[2])}` : `${neg(F1[2])} ${F2[2] < 0 ? "−" : "+"} ${Math.abs(F2[2])}`;
  out.push(`${same ? T.resta : T.suma} ${pair(F1[0], F2[0], "x")} + ${pair(F1[1], F2[1], "y")} = ${cons}, ${T.esdecir} ${solveLin(A, B, VN[w])}.`);
  const cv = E[0][v], cw0 = E[0][w], rest = E[0][2] - cw0 * X[w];
  const subst = w === 0 ? `${cdot(cw0, X[0])}${tm(cv, "y", false)}` : `${kv(cv, "x")} ${cw0 < 0 ? "−" : "+"} ${cdot(Math.abs(cw0), X[1])}`;
  out.push(`${T.en1} ${subst} = ${neg(E[0][2])} → ${kv(cv, VN[v])} = ${neg(E[0][2])} ${cw0 * X[w] < 0 ? "+" : "−"} ${Math.abs(cw0 * X[w])} = ${neg(rest)}${cv === 1 ? "" : ` → ${VN[v]} = ${neg(rest)} ${WA.H.div} ${pz(cv)} = ${neg(X[v])}`}.`);
  out.push(chk(E, X, T));
  return out.join(" ");
}
function iguSol(E, X, T, ya) {
  const MN = E.map(([a, b, e]) => [-a / b, e / b]);   // y = Mx + N (b = ±1)
  const [[M1, N1], [M2, N2]] = MN, A = M1 - M2, B = N2 - N1;
  return `${ya ? T.ya : T.desp2} y = ${lin(M1, N1)} ; y = ${lin(M2, N2)}. ${T.iguala} ${lin(M1, N1)} = ${lin(M2, N2)} → ${solveLin(A, B, "x")}. ${T.en1y} y = ${subLin(M1, N1, X[0])} = ${neg(X[1])}. ${ya ? `${T.comp} ${MN.map(([M, N]) => `${subLin(M, N, X[0])} = ${neg(X[1])} ✓`).join("; ")}.` : chk(E, X, T)}`;
}
const sisGen = (R, need) => {   // sistema con solución entera y determinante no nulo
  for (let k = 0; k < 400; k++) {
    const a = rnz(R, -5, 5), b = rnz(R, -5, 5), c = rnz(R, -5, 5), d = rnz(R, -5, 5), x = R.int(-6, 6), y = R.int(-6, 6);
    if (a * d - b * c === 0) continue;
    const E = [[a, b, a * x + b * y], [c, d, c * x + d * y]];
    if (need && !need(E)) continue;
    return { E, X: [x, y] };
  }
  return null;
};
const sisItem = (S, show, X, extra, sol) => ({ q: S.m8.si_q(show[0], show[1]) + (extra ? " " + extra : ""), kind: "fields", fields: [{ label: "x", ans: X[0] }, { label: "y", ans: X[1] }], sol });
def("m8.sissus", (R, S) => {
  const T = S.m8.SI, s = sisGen(R, E => [0, 1].some(k => [0, 1].some(u => Math.abs(E[k][u]) === 1)));
  if (!s) return null;
  const opts = []; [1, 0].forEach(u => [0, 1].forEach(k => { if (Math.abs(s.E[k][u]) === 1) opts.push([k, u]); }));
  const [k, u] = opts[0];
  return sisItem(S, s.E.map(t => eqSis(...t)), s.X, T.por[0], susSol(s.E, k, u, s.X, T));
});
def("m8.sisigu", (R, S) => {
  const T = S.m8.SI, ya = R.r() < 0.5, s = sisGen(R, E => Math.abs(E[0][1]) === 1 && Math.abs(E[1][1]) === 1 && (!ya || (E[0][1] === 1 && E[1][1] === 1)));
  if (!s) return null;
  const show = ya ? s.E.map(([a, b, e]) => `y = ${lin(-a, e)}`) : s.E.map(t => eqSis(...t));
  return sisItem(S, show, s.X, T.por[1], iguSol(s.E, s.X, T, ya));
});
def("m8.sisred", (R, S) => {
  const T = S.m8.SI, direct = R.r() < 0.5, s = sisGen(R, E => direct ? (Math.abs(E[0][0]) === Math.abs(E[1][0]) || Math.abs(E[0][1]) === Math.abs(E[1][1])) : (Math.abs(E[0][0]) !== Math.abs(E[1][0]) && Math.abs(E[0][1]) !== Math.abs(E[1][1]) && Math.abs(E[0][1]) > 1 && Math.abs(E[1][1]) > 1));
  if (!s) return null;
  return sisItem(S, s.E.map(t => eqSis(...t)), s.X, T.por[2], redSol(s.E, s.X, T));
});

// ── Pitágoras en el plano (lección `plano`): rectángulo, isósceles, escalera, rombo, distancia entre puntos, equilátero y hexágono ──
def("m8.pitplano", (R, S, H) => {
  const T = S.m8.PL, v = R.int(0, 5), [a, b, c] = R.pick(TRIP);
  if (v === 0) return { q: S.m8.pa_q[0](a, b), kind: "num", ans: c, sol: T.hip(T.diag, a, b, a * a, b * b, c, "m") };
  if (v === 1) return { q: S.m8.pa_q[1](c, 2 * a), kind: "num", ans: b, sol: T.iso(a) + " " + T.cat(c, a, c * c, a * a, b, "cm") };
  if (v === 2) return escalera(R, S, H);
  if (v === 3) return { q: T.rombo_q(2 * a, 2 * b), kind: "num", ans: c, sol: T.rombo(a, b) + " " + T.hip(T.lado, a, b, a * a, b * b, c, "cm") };
  if (v === 4) {   // distancia entre dos puntos (con coordenadas negativas)
    const sx = R.pick([1, -1]), sy = R.pick([1, -1]), x1 = R.int(-6, 4), y1 = R.int(-6, 4), x2 = x1 + sx * a, y2 = y1 + sy * b;
    return { q: T.dist_q(`(${neg(x1)}, ${neg(y1)})`, `(${neg(x2)}, ${neg(y2)})`), kind: "num", ans: c,
      sol: T.dist(`${neg(x2)} − ${pz(x1)} = ${neg(x2 - x1)}`, `${neg(y2)} − ${pz(y1)} = ${neg(y2 - y1)}`, a, b, a * a + b * b, c) };
  }
  const l = 2 * R.int(1, 6), hx = R.r() < 0.5, h2 = l * l - (l / 2) ** 2, val = Math.round(Math.sqrt(h2) * 10) / 10;
  return { q: hx ? T.hex_q(l) : T.equi_q(l), kind: "num", ans: val, tol: 0.051, ansHtml: H.dec(val).includes(H.ds) ? H.dec(val) : H.dec(val) + H.ds + "0",
    sol: (hx ? T.hex(l) : T.equi) + " " + T.cat2(l, l / 2, l * l, (l / 2) ** 2, h2, H.dec(Math.floor(Math.sqrt(h2) * 1000) / 1000), H.dec(val)) };
});
// ── Pitágoras en el espacio (lección `espacio`): caja, cono, pirámide y ¿cabe? ──
const B3 = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [3, 4, 12, 13], [2, 10, 11, 15], [6, 6, 7, 11], [4, 8, 8, 12]];
def("m8.pitesp", (R, S, H) => {
  const T = S.m8.PE3, v = R.r();
  if (v < 0.3) { const [a, b, c, d] = R.pick(B3), k = R.int(1, 3); return { q: S.m8.p3_q(a * k, b * k, c * k), kind: "num", ans: d * k, sol: T.caja(a * k, b * k, c * k, (a * k) ** 2, (b * k) ** 2, (c * k) ** 2, (d * k) ** 2, d * k) }; }
  const [p, q, r] = R.pick(TRIP);
  if (v < 0.55) {   // cono: generatriz o altura
    if (R.r() < 0.5) return { q: T.cono_g_q(p, q), kind: "num", ans: r, sol: T.cono + " " + T.hip3("g", p, q, p * p, q * q, r, "cm") };
    return { q: T.cono_h_q(r, p), kind: "num", ans: q, sol: T.cono + " " + T.cat3("h", r, p, r * r, p * p, q) };
  }
  if (v < 0.8) return { q: T.pir_q(2 * p, q), kind: "num", ans: r, sol: T.pir(p) + " " + T.hip3("a′", q, p, q * q, p * p, r, "m") };   // apotema de la pirámide
  // ¿cabe una varilla?
  let a, b, c, D; do { a = R.int(10, 40); b = R.int(10, 40); c = R.int(5, 30); D = Math.sqrt(a * a + b * b + c * c); } while (Number.isInteger(D));
  const fits = R.r() < 0.5, L = fits ? Math.floor(D * (1 - R.pick([0.02, 0.03, 0.05]))) : Math.ceil(D * (1 + R.pick([0.02, 0.03, 0.05])));
  return { q: T.cabe_q(L, a, b, c), kind: "choice", opts: S.m8.SL.sino, correct: L < D ? 0 : 1, shuffle: false, sol: T.cabe(a, b, c, a * a, b * b, c * c, a * a + b * b + c * c, H.dec(Math.round(D * 10) / 10), L, L < D) };
});

// ── Triángulos semejantes: criterios y posición de Tales ──
def("m8.trisem", (R, S, H) => {
  const T = S.m8.TS, v = R.int(0, 2);
  if (v === 0) {   // ángulos
    let a, b; do { a = R.int(25, 95); b = R.int(20, 95); } while (a + b > 160 || a === b);
    const c = 180 - a - b, yes = R.r() < 0.5, g = yes ? c : c + R.pick([-10, -5, 5, 10]);
    if (g === a || g === b || g <= 0) return null;
    return { q: T.ang_q(a, b, b, g), kind: "choice", opts: S.m8.SL.sino, correct: yes ? 0 : 1, shuffle: false, sol: T.ang_s(a, b, c, g, yes) };
  }
  if (v === 1) {   // lados proporcionales
    const base = R.pick([[2, 3, 4], [3, 4, 6], [4, 5, 7], [4, 6, 9], [5, 6, 8], [3, 5, 7], [6, 8, 10]]), k = R.pick([1.5, 2, 2.5, 3]), yes = R.r() < 0.5;
    const big = base.map(x => rd(x * k, 1)); if (!yes) big[R.int(0, 2)] += R.pick([1, -1]);
    return { q: T.lad_q(base.join(", "), big.map(x => H.dec(x)).join(", ")), kind: "choice", opts: S.m8.SL.sino, correct: yes ? 0 : 1, shuffle: false,
      sol: T.lad_s(base.map((x, i) => { const q = big[i] / x, r2 = rd(q, 2); return `${H.dec(big[i])} ${WA.H.div} ${x} ${Math.abs(q - r2) < 1e-9 ? "=" : "≈"} ${H.dec(r2)}`; }).join("; "), yes) };
  }
  // posición de Tales: una paralela a BC corta AB en D y AC en E
  const AD = R.int(2, 8), DB = R.int(2, 9), k = R.pick([0.5, 1.5, 2, 2.5]), AE = rd(AD * k, 1), EC = rd(DB * k, 1);
  if (AD === DB) return null;
  if (R.r() < 0.5) return { q: T.tal_q(AD, DB, H.dec(AE)), kind: "num", ans: EC, tol: 0.001, sol: T.tal_s(AD, DB, H.dec(AE), H.dec(k), H.dec(EC)) };
  const AB = AD + DB, BC = AB * R.int(1, 3), DE = rd(BC * AD / AB, 2);
  if (!Number.isInteger(DE * 10)) return null;
  return { q: T.de_q(AD, DB, BC), kind: "num", ans: DE, tol: 0.001, sol: T.de_s(AD, DB, AB, BC, H.dec(DE)) };
});
// ── Escalas: longitudes, áreas y volúmenes reales, y escalas de ampliación ──
def("m8.escala", (R, S, H) => {
  const T = S.m8.ES, v = R.int(0, 3);
  if (v === 0) {   // habitación en un plano: área real
    const n = R.pick([50, 100, 200]), A = R.pick([2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8]), B = R.pick([2, 2.5, 3, 3.5, 4, 5, 6]), a = rd(A * 100 / n, 2), b = rd(B * 100 / n, 2), ar = rd(A * B, 4);   // habitación de 2 a 8 m
    if (!Number.isInteger(a * 100) || !Number.isInteger(b * 100)) return null;
    return { q: T.hab_q(n, H.dec(a), H.dec(b)), kind: "num", ans: ar, tol: 0.001, sol: T.hab_s(n, H.dec(a), H.dec(b), H.n(Math.round(a * n)), H.n(Math.round(b * n)), H.dec(A), H.dec(B), H.dec(ar)) };
  }
  if (v === 1) {   // superficie en el plano → real (por n²)
    const n = R.pick([50, 100, 200, 500]), s = R.int(2, 30), cm2 = s * n * n, m2 = cm2 / 10000;
    return { q: T.sup_q(n, s), kind: "num", ans: m2, tol: 0.001, sol: T.sup_s(n, s, H.n(n * n), H.n(cm2), H.dec(m2)) };
  }
  if (v === 2) {   // maqueta: volumen real (por n³)
    const n = R.pick([10, 20, 50, 100]), V = R.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), cm3 = V * n ** 3, m3 = cm3 / 1e6;
    return { q: T.maq_q(n, V), kind: "num", ans: m3, tol: 1e-6, sol: T.maq_s(n, V, H.n(n ** 3), H.n(cm3), H.dec(m3)) };
  }
  const n = R.pick([5, 10, 20, 50]), real = R.int(2, Math.floor(300 / n)), d = real * n / 10;   // ampliación n : 1 (real en mm, dibujo en cm, como mucho 30 cm)
  if (!Number.isInteger(d * 10) || d > 30) return null;
  return { q: T.amp_q(n, H.dec(d)), kind: "num", ans: real, tol: 0.001, sol: T.amp_s(n, H.dec(d), H.dec(d * 10), real) };
});

// ── Poliedros (prismas y pirámides de cualquier base, Euler despejando, regulares) y cuerpos de revolución ──
def("m8.poliedros", (R, S) => {
  const T = S.m8.PO, v = R.int(0, 3);
  if (v === 0) {   // elementos de un prisma o una pirámide de n lados
    const n = R.int(5, 12), pir = R.r() < 0.5, el = R.int(0, 2), val = pir ? [n + 1, n + 1, 2 * n][el] : [n + 2, 2 * n, 3 * n][el];
    return { q: T.el_q(pir, n, el), kind: "int", ans: val, sol: T.el_s(pir, n, el, val) };
  }
  if (v === 1) {   // Euler despejando (sin decir qué poliedro es)
    const P = R.pick([...[5, 6, 7, 8, 9, 10].map(n => [n + 2, 2 * n, 3 * n]), ...[5, 6, 7, 8, 9].map(n => [n + 1, n + 1, 2 * n]), [8, 6, 12], [12, 20, 30], [20, 12, 30], [10, 7, 15]]), miss = R.int(0, 2), [C, V, A] = P;
    return { q: T.eu_q(miss, C, V, A), kind: "int", ans: P[miss], sol: T.eu_s(miss, C, V, A) };
  }
  if (v === 2) {   // cuerpos de revolución
    const [a, b, c] = R.pick(TRIP), k = R.int(0, 2);
    if (k === 0) return { q: T.cil_q(a, b), kind: "int", ans: b, sol: T.cil_s(a, b) };
    if (k === 1) return { q: T.con_q(a, b, false), kind: "int", ans: b, sol: T.con_s(a, b, c, false) };
    return { q: T.con_q(a, b, true), kind: "int", ans: c, sol: T.con_s(a, b, c, true) };
  }
  const [nom, k, pol, ang] = R.pick(T.reg);   // poliedros regulares: caras en cada vértice
  return { q: T.reg_q(nom), kind: "int", ans: k, sol: T.reg_s(nom, k, pol, ang, k * ang) };
});

// ── Características de una función a partir de su gráfica (tramos rectos): crecimiento, recorrido, máximo, cortes ──
function tramosSvg(P) {   // P: puntos [x, y] con x de 0 a 8 e y de 0 a 8
  const u = 26, ox = 30, oy = 8 * u + 14, X = x => ox + x * u, Y = y => oy - y * u, W = ox + 8 * u + 24, Hh = oy + 26;
  let b = "";
  for (let i = 0; i <= 8; i++) b += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}" stroke="#e3e6ea"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(8)}" y2="${Y(i)}" stroke="#e3e6ea"/>`;
  b += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(8) + 10}" y2="${Y(0)}" stroke="${C.dark}" stroke-width="1.5"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(8) - 8}" stroke="${C.dark}" stroke-width="1.5"/>`;
  for (let i = 0; i <= 8; i++) { b += SVG.txt(X(i), Y(0) + 15, i, 10); if (i) b += SVG.txt(X(0) - 6, Y(i) + 4, i, 10, C.dark, "end"); }
  b += SVG.txt(X(8) + 14, Y(0) + 4, "x", 11) + SVG.txt(X(0), Y(8) - 12, "y", 11);
  b += `<polyline points="${P.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}" fill="none" stroke="${C.blue}" stroke-width="2.5"/>`;
  P.forEach(([x, y]) => { b += `<circle cx="${X(x)}" cy="${Y(y)}" r="3.5" fill="${C.blue}"/>`; });
  return SVG.svg(W, Hh, b);
}
def("m8.funcar", (R, S, H) => {
  const T = S.m8.FC, v = R.int(0, 3);
  if (v === 3) {   // corte con el eje X de y = ax + b
    const a = rnz(R, -5, 5), x0 = R.int(-6, 6), b = -a * x0;
    if (!b) return null;
    return { q: T.cx_q(lin(a, b)), kind: "int", ans: x0, sol: T.cx_s(lin(a, b), a, b, x0) };
  }
  const pats = ["+0-", "+-+", "-+0", "0+-", "+-0", "-0+", "+0+", "-+-"];
  for (let g = 0; g < 100; g++) {
    const pat = R.pick(pats), xs = [0, ...R.shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 2).sort((a, b) => a - b), 8], ys = [R.int(0, 8)];
    let ok = true;
    for (const s of pat) { const y = ys[ys.length - 1], ny = s === "0" ? y : s === "+" ? R.int(y + 1, 8) : R.int(0, y - 1); if (ny < 0 || ny > 8 || (s === "+" && y >= 8) || (s === "-" && y <= 0)) { ok = false; break; } ys.push(ny); }
    if (!ok) continue;
    const P = xs.map((x, i) => [x, ys[i]]), svg = tramosSvg(P), iv = i => `(${xs[i]}, ${xs[i + 1]})`;
    const ymin = Math.min(...ys), ymax = Math.max(...ys);
    if (v === 0) {   // ¿en qué intervalo crece / decrece?
      const sg = R.pick(["+", "-"].filter(s => pat.split(s).length === 2));
      if (!sg) continue;
      const i = pat.indexOf(sg), other = [0, 1, 2].filter(j => j !== i).map(iv), wrongY = `(${Math.min(ys[i], ys[i + 1])}, ${Math.max(ys[i], ys[i + 1])})`;
      const opts = R.shuffle([...new Set([iv(i), ...other, wrongY])]).slice(0, 4);
      if (!opts.includes(iv(i))) continue;
      return { q: T.int_q(sg === "+") + "<br>" + svg, kind: "choice", opts, correct: opts.indexOf(iv(i)), sol: T.int_s(sg === "+", iv(i), xs[i], ys[i], xs[i + 1], ys[i + 1]) };
    }
    if (v === 1) {   // recorrido
      const good = T.de(ymin, ymax), opts = R.shuffle([...new Set([good, T.de(0, 8), T.de(0, ymax), T.de(ymin, 8)])]).slice(0, 4);
      if (opts.length < 3 || !opts.includes(good)) continue;
      return { q: T.rec_q + "<br>" + svg, kind: "choice", opts, correct: opts.indexOf(good), sol: T.rec_s(ymin, ymax) };
    }
    // máximo: un solo punto más alto, que no esté en un extremo ni en un tramo horizontal
    const im = ys.indexOf(ymax);
    if (ys.filter(y => y === ymax).length !== 1 || im === 0 || im === 3) continue;
    const good = `(${xs[im]}, ${ymax})`, opts = R.shuffle([good, String(ymax), String(xs[im]), `(${ymax}, ${xs[im]})`].filter((x, i, a) => a.indexOf(x) === i));
    return { q: T.max_q + "<br>" + svg, kind: "choice", opts, correct: opts.indexOf(good), sol: T.max_s(xs[im], ymax) };
  }
  return null;
});
// ── Función afín a partir de un enunciado: fórmula, valor, x para un valor, m y n ──
def("m8.afin", (R, S, H) => {
  const T = S.m8.AF, v = R.int(0, 3);
  if (v === 3) {   // pendiente y ordenada de una fórmula desordenada
    const m = rnz(R, -6, 6), n = rnz(R, -9, 9);
    return { q: T.mn_q(`y = ${neg(n)} ${m < 0 ? "−" : "+"} ${Math.abs(m) === 1 ? "" : Math.abs(m)}x`), kind: "fields", fields: [{ label: "m", ans: m }, { label: T.mn_n, ans: n }], sol: T.mn_s(lin(m, n), m, n) };
  }
  const [ctx, n, m] = (() => { const c = R.int(0, 4), d = T.ctx[c]; const n0 = R.pick(d[1]), m0 = R.pick(d[2]); return [c, n0, m0]; })();
  const f = x => n + m * x, E = `y = ${lin(m, n)}`.replace(/(\d)\.(\d)/g, "$1" + WA.H.ds + "$2");
  if (v === 0) {
    const wrong = [`y = ${lin(n, m)}`, `y = ${lin(-m, n)}`, `y = ${lin(m, -n)}`].map(s => s.replace(/(\d)\.(\d)/g, "$1" + WA.H.ds + "$2")), opts = R.shuffle([E, ...wrong.filter(w => w !== E)]).slice(0, 4);
    return { q: T.f_q(ctx, H.dec(n), H.dec(Math.abs(m))), kind: "choice", opts, correct: opts.indexOf(E), sol: T.f_s(ctx, H.dec(n), H.dec(m), E) };
  }
  if (v === 1) { const x = R.int(2, 12), y = rd(f(x), 2); if (y < 0) return null; return { q: T.f_q(ctx, H.dec(n), H.dec(Math.abs(m))) + " " + T.y_q(ctx, x), kind: "num", ans: y, tol: 0.001, sol: T.y_s(E, x, H.dec(m), H.dec(n), H.dec(y), ctx) }; }
  const x = R.int(2, 12), y = rd(f(x), 2); if (y < 0) return null;
  return { q: T.f_q(ctx, H.dec(n), H.dec(Math.abs(m))) + " " + T.x_q(ctx, H.dec(y)), kind: "num", ans: x, tol: 0.001, sol: T.x_s(E, H.dec(y), H.dec(m), H.dec(n), H.dec(rd(y - n, 2)), x, ctx) };
});

// ═════ Estadística de 2.º ═════
const tablaTxt = (vals, fs) => vals.map((v, i) => `${v}: ${fs[i]}`).join("; ");
// ── Población y muestra: muestra proporcional, muestras sesgadas, población/muestra/individuo ──
def("m8.muestra", (R, S) => {
  const T = S.m8.MU, v = R.int(0, 2);
  if (v === 0) {   // muestra proporcional
    const [ctx, names] = R.pick(T.prop_ctx), k = R.r() < 0.5 ? 2 : 3;
    for (let g = 0; g < 100; g++) {
      const n = R.pick([20, 30, 40, 50, 60, 80, 100]), parts = Array.from({ length: k }, () => R.int(1, 9)), tot = parts.reduce((a, b) => a + b, 0), mult = R.pick([20, 25, 40, 50, 100]);
      if (parts.some(p => (p * n) % tot) || new Set(parts).size < k) continue;
      const sizes = parts.map(p => p * mult), T0 = tot * mult, j = R.int(0, k - 1);
      const fr = F.make(parts[j], tot);
      return { q: T.prop_q(ctx, names.slice(0, k), sizes, n, j), kind: "int", ans: parts[j] * n / tot, sol: T.prop_s(names[j], sizes[j], T0, fr[0], fr[1], n, parts[j] * n / tot) };
    }
    return null;
  }
  if (v === 1) { const [txt, ses, why] = R.pick(T.ses); return { q: T.ses_q(txt), kind: "choice", opts: S.m8.SL.sino, correct: ses ? 0 : 1, shuffle: false, sol: T.ses_s(ses, why) }; }
  const [txt, N, n, vari] = R.pick(T.pm), w = R.int(0, 2);
  return { q: T.pm_q(txt(N, n), [n, N, null][w], vari, w), kind: "choice", opts: T.pm_o, correct: [1, 0, 3][w], shuffle: false, sol: T.pm_s(N, n, vari) };
});
// ── Tablas de frecuencias: acumuladas, porcentajes, datos agrupados y el gráfico adecuado ──
def("m8.tablafrec", (R, S, H) => {
  const T = S.m8.TF, v = R.int(0, 2);
  if (v === 0) {
    const N = R.pick([20, 25, 40, 50]), [ctx, vals] = R.pick(T.disc);
    for (let g = 0; g < 200; g++) {
      const fs = vals.map(() => R.int(1, Math.ceil(N / 3))), s = fs.reduce((a, b) => a + b, 0);
      if (s !== N) continue;
      const j = R.int(1, vals.length - 2), acc = fs.slice(0, j + 1).reduce((a, b) => a + b, 0), kind = R.int(0, 2);
      const ans = [acc, N - acc, acc * 100 / N][kind], sumTxt = fs.slice(0, j + 1).join(" + ");
      return { q: T.disc_q(ctx, N, tablaTxt(vals, fs), vals[j], kind), kind: "num", ans, tol: 0.001, sol: T.disc_s(vals[j], sumTxt, acc, N, kind, H.dec(ans)) };
    }
    return null;
  }
  if (v === 1) {   // datos agrupados
    const a0 = R.pick([145, 150, 155]), w = 5, fs = [R.int(1, 4), R.int(3, 7), R.int(4, 9), R.int(2, 6), R.int(1, 3)], cls = fs.map((f, i) => [a0 + i * w, a0 + (i + 1) * w]);
    const lab = c => `[${c[0]}, ${c[1]})`, tabla = cls.map((c, i) => `${lab(c)}: ${fs[i]}`).join("; "), k = R.int(0, 3);
    if (k === 0) { const j = R.int(1, 4), acc = fs.slice(0, j).reduce((a, b) => a + b, 0); return { q: T.ag_q(tabla) + " " + T.menos_q(cls[j][0]), kind: "int", ans: acc, sol: T.menos_s(cls[j][0], cls.slice(0, j).map(lab).join(", "), fs.slice(0, j).join(" + "), acc) }; }
    if (k === 1) { const mx = Math.max(...fs); if (fs.filter(f => f === mx).length > 1) return null; const opts = cls.map(lab); return { q: T.ag_q(tabla) + " " + T.modal_q, kind: "choice", opts, correct: fs.indexOf(mx), shuffle: false, sol: T.modal_s(lab(cls[fs.indexOf(mx)]), mx) }; }
    if (k === 2) { const j = R.int(0, 4); return { q: T.ag_q(tabla) + " " + T.marca_q(lab(cls[j])), kind: "num", ans: (cls[j][0] + cls[j][1]) / 2, tol: 0.001, sol: T.marca_s(cls[j][0], cls[j][1], H.dec((cls[j][0] + cls[j][1]) / 2)) }; }
    const j = R.int(1, 4), x = cls[j][0], opts = [lab(cls[j - 1]), lab(cls[j])];
    return { q: T.ag_q(tabla) + " " + T.front_q(x), kind: "choice", opts, correct: 1, shuffle: false, sol: T.front_s(x, lab(cls[j])) };
  }
  const [txt, c, why] = R.pick(T.graf);
  return { q: T.graf_q(txt), kind: "choice", opts: T.graf_o, correct: c, shuffle: false, sol: T.graf_s(T.graf_o[c], why) };
});
// ── Centralización con tablas: media, mediana, la nota que falta y qué medida elegir ──
def("m8.central", (R, S, H) => {
  const T = S.m8.CE, v = R.int(0, 3);
  if (v <= 1) {
    const [ctx, vals] = R.pick(T.ctx);
    for (let g = 0; g < 300; g++) {
      const N = v === 0 ? R.pick([20, 25, 40, 50]) : R.int(15, 30), fs = vals.map(() => R.int(1, Math.ceil(N / 2.5))), s = fs.reduce((a, b) => a + b, 0);
      if (s !== N) continue;
      const tab = tablaTxt(vals, fs);
      if (v === 0) {
        const sum = vals.reduce((a, x, i) => a + x * fs[i], 0), m = sum / N;
        if (!Number.isInteger(m * 100)) continue;
        return { q: T.media_q(ctx, N, tab), kind: "num", ans: m, tol: 0.001, sol: T.media_s(vals.map((x, i) => `${x} · ${fs[i]}`).join(" + "), sum, fs.join(" + "), N, H.dec(m)) };
      }
      // mediana con las acumuladas
      const acc = []; fs.reduce((a, f, i) => (acc[i] = a + f), 0);
      const at = k => vals[acc.findIndex(F => F >= k)], odd = N % 2 === 1, k1 = odd ? (N + 1) / 2 : N / 2, me = odd ? at(k1) : (at(k1) + at(k1 + 1)) / 2;
      return { q: T.med_q(ctx, N, tab), kind: "num", ans: me, tol: 0.001, sol: T.med_s(N, odd, k1, acc.map((F, i) => `${vals[i]} → ${F}`).join("; "), odd ? at(k1) : T.med_y(at(k1), at(k1 + 1)), H.dec(me), odd) };
    }
    return null;
  }
  if (v === 2) {   // ¿qué nota necesito?
    for (let g = 0; g < 100; g++) {
      const n = R.int(3, 6), m = R.pick([5, 5.5, 6, 6.5, 7, 7.5]), m2 = m + R.pick([0.5, 1]), need = (n + 1) * m2 - n * m;
      if (need < 5 || need > 10 || !Number.isInteger(need * 2)) continue;
      return { q: T.nota_q(R.pick(S.m8.NAMES), n, H.dec(m), H.dec(m2)), kind: "num", ans: need, tol: 0.001, sol: T.nota_s(n, H.dec(m), H.dec(n * m), H.dec(m2), n + 1, H.dec((n + 1) * m2), H.dec(need)) };
    }
    return null;
  }
  const c = R.int(0, 2);   // 0: valor extremo → mediana; 1: datos parejos → media; 2: cualitativa → moda
  if (c === 2) { const [txt] = R.pick(T.cual); return { q: T.el_q(txt), kind: "choice", opts: T.el_o, correct: 2, shuffle: false, sol: T.el_s2 }; }
  let d; do { d = Array.from({ length: R.int(5, 6) }, () => R.int(10, 20)); } while (new Set(d).size < 3);
  if (c === 0) d[R.int(0, d.length - 1)] = R.pick([60, 80, 95, 120]);
  d.sort((a, b) => a - b);
  const sum = d.reduce((a, b) => a + b, 0), m = rd(sum / d.length, 2), n = d.length, me = n % 2 ? d[(n - 1) / 2] : (d[n / 2 - 1] + d[n / 2]) / 2;
  return { q: T.el_q(T.datos(d.join(", "))), kind: "choice", opts: T.el_o, correct: c === 0 ? 1 : 0, shuffle: false, sol: T.el_s(H.dec(m), H.dec(me), c === 0) };
});
// ── Dispersión: desviación media y comparar dos grupos con la misma media ──
def("m8.dispersion", (R, S, H) => {
  const T = S.m8.DI;
  const gen = () => { for (let g = 0; g < 200; g++) { const n = R.int(4, 5), d = Array.from({ length: n }, () => R.int(2, 18)), s = d.reduce((a, b) => a + b, 0); if (s % n) continue; const m = s / n, ds = d.map(x => Math.abs(x - m)), dm = ds.reduce((a, b) => a + b, 0) / n; if (!dm) continue; return { d, m, ds, dm }; } return null; };
  if (R.r() < 0.6) {
    const z = gen(); if (!z) return null;
    return { q: T.dm_q(z.d.join(", ")), kind: "num", ans: z.dm, tol: 0.001, sol: T.dm_s(z.d.join(" + "), z.d.reduce((a, b) => a + b, 0), z.d.length, z.m, z.d.map(x => `|${x} − ${z.m}| = ${Math.abs(x - z.m)}`).join("; "), z.ds.join(" + "), z.ds.reduce((a, b) => a + b, 0), H.dec(z.dm)) };
  }
  for (let g = 0; g < 200; g++) {   // dos grupos con la misma media
    const m = R.int(6, 14), n = 5, mk = spread => { const d = Array.from({ length: n - 1 }, () => m + R.int(-spread, spread)); d.push(n * m - d.reduce((a, b) => a + b, 0)); return d; };
    const A = mk(1), B = mk(6);
    if (A.some(x => x < 0) || B.some(x => x < 0) || Math.abs(A[n - 1] - m) > 2 || Math.abs(B[n - 1] - m) > 9) continue;
    const st = d => ({ rg: Math.max(...d) - Math.min(...d), dm: d.reduce((a, x) => a + Math.abs(x - m), 0) / n });
    const a = st(A), b = st(B);
    if (a.rg >= b.rg || a.dm >= b.dm || !a.dm) continue;
    const swap = R.r() < 0.5, [P, Q, p, q] = swap ? [B, A, b, a] : [A, B, a, b];
    return { q: T.cmp_q(R.pick(T.cmp_ctx), P.join(", "), Q.join(", ")), kind: "choice", opts: T.cmp_o, correct: swap ? 1 : 0, shuffle: false,
      sol: T.cmp_s(m, H.dec(p.rg), H.dec(q.rg), H.dec(p.dm), H.dec(q.dm), swap ? "B" : "A") };
  }
  return null;
});

// ═════ Probabilidad de 2.º ═════
const setTxt = s => s.length ? `{${s.join(", ")}}` : "∅";
// ── Sucesos: unión, intersección, contrario, compatibles ──
def("m8.sucesos", (R, S) => {
  const T = S.m8.SU, [exp, n] = R.pick([[0, 6], [0, 6], [1, 10], [2, 12]]), om = Array.from({ length: n }, (_, i) => i + 1);
  const isP = x => x > 1 && [2, 3, 5, 7, 11].includes(x);
  const props = [[0, x => x % 2 === 0], [1, x => x % 2 === 1], [2, x => x % 3 === 0], [3, isP], ...[3, 4, 5].map(k => [4, x => x > k, k]), ...[3, 4].map(k => [5, x => x < k, k])];
  for (let g = 0; g < 100; g++) {
    const [pa, pb] = R.shuffle(props).slice(0, 2), A = om.filter(pa[1]), B = om.filter(pb[1]);
    if (!A.length || !B.length || A.length === n || B.length === n || A.join() === B.join()) continue;
    const U = om.filter(x => A.includes(x) || B.includes(x)), I = A.filter(x => B.includes(x)), nA = om.filter(x => !A.includes(x));
    const dA = T.prop(pa[0], pa[2]), dB = T.prop(pb[0], pb[2]), v = R.int(0, 3), head = T.head(exp, n, dA, dB);
    const base = T.sets(setTxt(A), setTxt(B));
    if (v === 0) return { q: head + " " + T.u_q, kind: "int", ans: U.length, sol: base + " " + T.u_s(setTxt(U), U.length) };
    if (v === 1) return { q: head + " " + T.i_q, kind: "int", ans: I.length, sol: base + " " + T.i_s(setTxt(I), I.length) };
    if (v === 2) {
      const inc = om.filter(x => !A.includes(x)).slice(0, Math.max(1, nA.length - 1)), wrong = [setTxt(A), setTxt(inc), setTxt(U)];
      if (inc.length === nA.length) continue;
      const opts = R.shuffle([...new Set([setTxt(nA), ...wrong])]).slice(0, 4);
      if (!opts.includes(setTxt(nA)) || opts.length < 3) continue;
      return { q: T.c_q(exp, n, dA), kind: "choice", opts, correct: opts.indexOf(setTxt(nA)), sol: T.c_s(setTxt(A), setTxt(nA), setTxt(inc)) };
    }
    if (I.length && R.r() < 0.5) continue;   // equilibrar compatibles e incompatibles
    return { q: head + " " + T.k_q, kind: "choice", opts: S.m8.SL.sino, correct: I.length ? 0 : 1, shuffle: false, sol: base + " " + T.k_s(setTxt(I), I.length > 0) };
  }
  return null;
});
// ── Laplace con dos dados, tres monedas y la baraja española (y el contrario) ──
def("m8.laplace", (R, S) => {
  const T = S.m8.LP, v = R.int(0, 2);
  const res = (f, n) => { const r = F.make(f, n); return { ans: r, txt: `${f}/${n}${r[1] !== n ? ` = ${ft(r)}` : ""}` }; };
  if (v === 0) {   // dos dados
    const k = R.int(0, 2), s = R.int(2, 12), pairs = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (k === 1 ? a === b : a + b === s) pairs.push(`(${a}, ${b})`);
    const f = pairs.length, r = res(f, 36);
    if (k === 2) { const c = F.make(36 - f, 36); return { q: T.dd_q(s, true), kind: "frac", ans: c, simplest: true, sol: T.dd_s(pairs.join(", "), f, r.txt) + " " + T.no_s(ft(r.ans), ft(c)) }; }
    return { q: k === 1 ? T.dob_q : T.dd_q(s, false), kind: "frac", ans: r.ans, simplest: true, sol: T.dd_s(pairs.join(", "), f, r.txt) };
  }
  if (v === 1) {   // tres monedas
    const k = R.int(0, 3), all = ["CCC", "CCX", "CXC", "XCC", "CXX", "XCX", "XXC", "XXX"], fav = all.filter(w => w.split("C").length - 1 === k), r = res(fav.length, 8);
    return { q: T.mon_q(k), kind: "frac", ans: r.ans, simplest: true, sol: T.mon_s(all.map(T.mon_w).join(", "), fav.map(T.mon_w).join(", "), fav.length, r.txt) };
  }
  const [txt, f, why, contra] = R.pick(T.bar), r = res(f, 40);
  if (contra) { const c = F.make(40 - f, 40); return { q: T.bar_q(txt), kind: "frac", ans: c, simplest: true, sol: T.bar_s(why, f, r.txt) + " " + T.no_s(ft(r.ans), ft(c)) }; }
  return { q: T.bar_q(txt), kind: "frac", ans: r.ans, simplest: true, sol: T.bar_s(why, f, r.txt) };
});
})();
