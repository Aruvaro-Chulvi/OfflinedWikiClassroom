/* WikiAula — Matemáticas, Grado 11 · Unidad 12: Estadística y probabilidad.
   Textos: i18n/<lang>/mat11u12.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz } = WA.MATH;
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const PHI = { 0.25: 0.5987, 0.5: 0.6915, 0.75: 0.7734, 1: 0.8413, 1.25: 0.8944, 1.5: 0.9332, 1.75: 0.9599, 2: 0.9772, 2.5: 0.9938, 3: 0.9987 };

def("m11.es.regresion", (R, S, H) => {
  const m = R.pick([0.5, 1.5, 2, 2.5, 3, -0.5, -1.5, -2, 0.8, -0.4, 1.2]);
  const sx2 = R.pick([4, 5, 8, 10, 20, 25]), sxy = rd(m * sx2, 2), xb = R.int(2, 12), yb = R.int(5, 40), n = rd(yb - m * xb, 2);
  if (R.r() < 0.5) return { q: S.m11.es_rg_q(H.dec(xb), H.dec(yb), H.dec(sx2), H.dec(sxy)), kind: "fields",
    fields: [{ label: "m", kind: "num", ans: m, tol: 0.011 }, { label: "n", kind: "num", ans: n, tol: 0.011 }],
    sol: S.m11.es_rg_s(H.dec(sxy), H.dec(sx2), H.dec(m), `${H.dec(yb)} − ${m < 0 ? `(${H.dec(m)})` : H.dec(m)} · ${H.dec(xb)} = ${H.dec(yb)} ${m < 0 ? "+" : "−"} ${H.dec(rd(Math.abs(m * xb), 2))}`, H.dec(n)) };
  const x0 = xb + R.int(1, 5), y0 = rd(yb + m * (x0 - xb), 2);
  return { q: S.m11.es_est_q(H.dec(xb), H.dec(yb), H.dec(sx2), H.dec(sxy), x0), kind: "num", ans: y0, tol: 0.011,
    sol: S.m11.es_est_s(H.dec(m), H.dec(yb), H.dec(xb), x0, H.dec(y0), `${H.dec(yb)} ${m < 0 ? "−" : "+"} ${H.dec(Math.abs(m))} · ${x0 - xb} = ${H.dec(yb)} ${m < 0 ? "−" : "+"} ${H.dec(rd(Math.abs(m) * (x0 - xb), 2))}`) };
});

def("m11.es.cov", (R, S, H) => {
  let xs, ys;
  do {
    const b = R.int(-2, 2) || 1, n = R.int(4, 5);
    xs = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, n).sort((a, c) => a - c);
    ys = xs.map(x => b * x + R.int(-2, 2) + 10);
  } while (new Set(ys).size < 2);
  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  const mxy = xs.reduce((s, x, i) => s + x * ys[i], 0) / n, cov = rd(mxy - mx * my, 2);
  const ng = v => (v < 0 ? "−" : "") + Math.abs(v);   // signo menos tipográfico en las listas
  const ex = v => Number.isInteger(rd(v, 6)) || Number.isInteger(rd(v * 10, 6)) || Number.isInteger(rd(v * 100, 6));   // ¿cabe en dos decimales?
  const sub = `${H.dec(rd(mxy, 2))} − ${H.dec(rd(mx, 2))} · ${my < 0 ? `(${H.dec(rd(my, 2))})` : H.dec(rd(my, 2))}`;
  return { q: S.m11.es_cov_q(xs.map(ng).join(", "), ys.map(ng).join(", ")), kind: "num", ans: cov, tol: 0.011,
    sol: S.m11.es_cov_s(H.dec(rd(mx, 2)), H.dec(rd(my, 2)), H.dec(rd(mxy, 2)), H.dec(cov), Math.sign(cov), sub, ex(mx) && ex(my) && ex(mxy)) };
});

def("m11.es.correl", (R, S, H) => {
  const k = R.int(0, 4);
  // Escala de Mates 10 y Mates 11 (cortes orientativos en 0,3 y 0,7); valores lejos de los cortes para que no haya dudas
  const r = [R.pick([0.92, 0.95, 0.98, 0.85]), R.pick([0.45, 0.55, 0.4, 0.6]), R.pick([0.05, -0.08, 0.1, -0.15]), R.pick([-0.4, -0.52, -0.45, -0.6]), R.pick([-0.9, -0.96, -0.99, -0.85])][k];
  return { q: S.m11.es_co_q(H.dec(r)), kind: "choice", opts: S.m11.es_co_o, correct: k, shuffle: false, sol: S.m11.es_co_s[k](H.dec(r)) };
});

def("m11.es.discreta", (R, S, H) => {
  let ps, miss;
  do {
    const n = R.int(3, 5);
    ps = Array.from({ length: n }, () => R.int(1, 5) / 20);
    miss = R.int(0, n - 1);
  } while (rd(1 - ps.reduce((a, b, i) => i === miss ? a : a + b, 0), 2) <= 0);
  ps[miss] = rd(1 - ps.reduce((a, b, i) => i === miss ? a : a + b, 0), 2);
  const xs = ps.map((_, i) => i), mu = rd(xs.reduce((s, x, i) => s + x * ps[i], 0), 2);
  const cells = ps.map((p, i) => i === miss ? "p" : H.dec(p));
  return { q: S.m11.es_di_q(xs.join(" | "), cells.join(" | ")), kind: "fields",
    fields: [{ label: "p", kind: "num", ans: ps[miss], tol: 0.001 }, { label: "μ", kind: "num", ans: mu, tol: 0.006 }],
    sol: S.m11.es_di_s(H.dec(ps[miss]), xs.map((x, i) => `${x} · ${H.dec(ps[i])}`).join(" + "), H.dec(mu)) };
});

// Varianza y desviación típica de una distribución discreta; juegos justos (solo Mates 11: m11.es.discreta la usa también Mates 12)
def("m11.es.varianza", (R, S, H) => {
  const T = S.m11.VA;
  if (R.r() < 0.6) {
    const n = R.int(3, 4), x0 = R.int(0, 1);
    let ps, s;
    do { ps = Array.from({ length: n - 1 }, () => R.int(1, 8) / 20); s = rd(ps.reduce((a, b) => a + b, 0), 2); } while (s > 0.95);
    ps.push(rd(1 - s, 2));
    const xs = ps.map((_, i) => x0 + i), mu = rd(xs.reduce((a, x, i) => a + x * ps[i], 0), 4), m2 = rd(xs.reduce((a, x, i) => a + x * x * ps[i], 0), 4);
    const v = rd(m2 - mu * mu, 4), sd = rd(Math.sqrt(v), 2);
    return { q: T.q(xs.join(" | "), ps.map(p => H.dec(p)).join(" | ")), kind: "fields",
      fields: [{ label: "μ", kind: "num", ans: mu, tol: 0.006 }, { label: "σ²", kind: "num", ans: rd(v, 2), tol: 0.006 }, { label: "σ", kind: "num", ans: sd, tol: 0.011 }],
      sol: T.s(xs.map((x, i) => `${x} · ${H.dec(ps[i])}`).join(" + "), H.dec(mu), xs.map((x, i) => `${x}² · ${H.dec(ps[i])}`).join(" + "), H.dec(m2), H.dec(v), H.dec(sd), rd(v, 2) === v ? "" : H.dec(rd(v, 2))) };
  }
  const [ev, k] = R.pick(T.ev), c = R.int(1, 5), P = fr(k, 6);
  if (R.r() < 0.35) {   // premio para que sea justo
    const g = 6 * c / k;
    return { q: T.jq2(c, ev), kind: "num", ans: g, tol: 0.001, sol: T.js2(P, c, g) };
  }
  const g = R.r() < 0.25 ? 6 * c / k : R.r() < 0.6 ? R.int(1, 2 * k + 2) * 6 / k : R.int(5, 20), gp = g * k / 6, ex = Number.isInteger(rd(gp * 100, 6));
  const m = rd(gp - c, 2);
  return { q: T.jq(c, g, ev), kind: "num", ans: m, tol: 0.006, sol: T.js(g, P, c, H.dec(rd(gp, 2)), H.dec(m), Math.sign(m), ex) };
});

// Coeficiente de correlación (y de determinación) con datos: solo Mates 11
def("m11.es.correl2", (R, S, H) => {
  const T = S.m11.CR2, fuerza = r => Math.abs(r) >= 0.7 ? 0 : Math.abs(r) >= 0.3 ? 1 : 2;
  if (R.r() < 0.5) {
    const sx = R.pick([1.5, 2, 2.5, 3, 4, 5]), sy = R.pick([1.5, 2, 2.5, 3, 4, 5, 6]), r0 = R.pick([0.95, 0.9, 0.85, 0.8, 0.6, 0.5, 0.4, 0.2, 0.15]) * (R.r() < 0.6 ? 1 : -1);
    const sxy = rd(r0 * sx * sy, 2), r = rd(sxy / (sx * sy), 2), r2 = rd((sxy / (sx * sy)) ** 2, 2);
    return { q: T.q0(H.dec(sxy), H.dec(sx), H.dec(sy)), kind: "fields",
      fields: [{ label: "r", kind: "num", ans: r, tol: 0.011 }, { label: "R²", kind: "num", ans: r2, tol: 0.011 }],
      sol: T.s0(H.dec(sxy), H.dec(sx), H.dec(sy), H.dec(rd(sx * sy, 4)), H.dec(r), T.f[fuerza(r)], r > 0, H.dec(r2), Math.round(r2 * 100)) };
  }
  let xs, ys;
  do {
    const b = R.pick([-2, -1, 1, 2]), n = R.int(4, 5);
    xs = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, n).sort((a, c) => a - c);
    ys = xs.map(x => b * x + R.int(-3, 3) + 10);
  } while (new Set(ys).size < 3);
  const n = xs.length, mean = a => a.reduce((s, v) => s + v, 0) / n;
  const mx = mean(xs), my = mean(ys), vx = mean(xs.map(x => x * x)) - mx * mx, vy = mean(ys.map(y => y * y)) - my * my;
  const mxy = mean(xs.map((x, i) => x * ys[i])), cxy = mxy - mx * my, r = cxy / Math.sqrt(vx * vy);
  const d = v => H.dec(rd(v, 4)), pd = v => v < 0 ? `(${d(v)})` : d(v), ng = v => H.dec(v);
  return { q: T.q1(xs.join(", "), ys.map(ng).join(", ")), kind: "num", ans: rd(r, 2), tol: 0.011,
    sol: T.s1(d(mx), d(my), d(mean(xs.map(x => x * x))), d(vx), d(mean(ys.map(y => y * y))), d(vy), d(mxy), d(cxy), pd(mx), pd(my), H.dec(rd(r, 2)), T.f[fuerza(r)], r > 0) };
});

// Muestreo y estimación puntual: solo Mates 11
def("m11.es.muestra", (R, S, H) => {
  const T = S.m11.MU, k = R.int(0, 2);
  if (k === 0) {   // muestra estratificada proporcional
    const [ctx, labels] = R.pick(T.estratos), ns = labels.slice(0, R.int(2, 3)), f = R.pick([5, 6, 8, 10, 12, 15, 20]);
    const a = ns.map(() => R.int(4, 25)), Ns = a.map(v => v * f), n = a.reduce((s, v) => s + v, 0), N = n * f;
    return { q: T.q0(ctx, ns.map((l, i) => `${H.n(Ns[i])} ${l}`), n), kind: "fields", fields: ns.map((l, i) => ({ label: l, ans: a[i] })),
      sol: T.s0(n, H.n(N), f, ns.map((l, i) => `${H.n(Ns[i])}/${f} = ${a[i]} ${l}`).join(", ")) };
  }
  if (k === 1) {   // proporción
    const n = R.pick([200, 250, 500, 1000]), m = R.pick([20, 40, 50, 100, 200]), x = Math.round(n * R.int(5, 60) / 100), pc = rd(100 * x / n, 2), what = R.pick(T.props);
    return { q: T.q1(n, H.n(n * m), what, x), kind: "fields", fields: [{ label: "%", kind: "num", ans: pc, tol: 0.051 }, { label: T.pers, ans: x * m }],
      sol: T.s1(x, n, H.dec(rd(x / n, 4)), H.dec(pc), H.n(n * m), H.n(x * m)) };
  }
  const [what, lo, hi, u] = R.pick(T.medias), vals = Array.from({ length: 5 }, () => R.int(lo, hi)), s = vals.reduce((a, b) => a + b, 0);
  return { q: T.q2(what, vals.join(", "), u), kind: "num", ans: s / 5, tol: 0.001, sol: T.s2(vals.join(" + "), s, H.dec(s / 5), u) };
});

def("m11.es.binom", (R, S, H) => {
  const n = R.int(3, 10), p = R.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9]), q = rd(1 - p, 2);
  const f4 = x => x.toFixed(4).replace(".", WA.H.ds);   // siempre los cuatro decimales pedidos: 0,9980
  const v = R.r();
  if (v < 0.4) {   // P(X = k) con k cerca de la media, para que no redondee a 0
    const k = Math.min(n, Math.max(0, Math.round(n * p) + R.int(-2, 2))), pr = C(n, k) * p ** k * q ** (n - k);
    if (pr < 0.002) return null;
    return { q: S.m11.es_bi_q(n, H.dec(p), k), kind: "num", ans: rd(pr, 4), tol: 0.0006,
      sol: S.m11.es_bi_s(n, k, C(n, k), H.dec(p), H.dec(q), n - k, f4(pr)) };
  }
  if (v < 0.6) {   // al menos uno (con p ≤ 0,5, para que no salga 1,0000)
    const pp = Math.min(p, q), qq = rd(1 - pp, 2), pr = 1 - qq ** n;
    return { q: S.m11.es_bi1_q(n, H.dec(pp)), kind: "num", ans: rd(pr, 4), tol: 0.0006, sol: S.m11.es_bi1_s(H.dec(qq), n, f4(pr)) };
  }
  if (v < 0.8) {   // como mucho uno / al menos dos
    const pp = Math.min(p, q, 0.4), qq = rd(1 - pp, 2), p0 = qq ** n, p1 = n * pp * qq ** (n - 1), le = p0 + p1, ge = R.r() < 0.5;
    return { q: S.m11.es_bi2_q(n, H.dec(pp), ge), kind: "num", ans: rd(ge ? 1 - le : le, 4), tol: 0.0006,
      sol: S.m11.es_bi2_s(n, H.dec(pp), H.dec(qq), n - 1, f4(p0), f4(p1), f4(le), ge, f4(1 - le)) };
  }
  const mu = rd(n * p, 2), sd = rd(Math.sqrt(n * p * q), 2);
  return { q: S.m11.es_bims_q(n, H.dec(p)), kind: "fields", fields: [{ label: "μ", kind: "num", ans: mu, tol: 0.006 }, { label: "σ", kind: "num", ans: sd, tol: 0.011 }],
    sol: S.m11.es_bims_s(n, H.dec(p), H.dec(q), H.dec(mu), H.dec(rd(n * p * q, 4)), H.dec(sd)) };
});

def("m11.es.normal", (R, S, H) => {
  const mu = R.pick([50, 60, 100, 170, 20, 500, 12]), sd = R.pick(mu >= 100 ? [10, 15, 20] : [2, 4, 5, 8]);
  const z = Number(R.pick(Object.keys(PHI))), ph = PHI[z], k = R.int(0, 4);
  const a = rd(mu + z * sd, 2), b = rd(mu - z * sd, 2);
  if (k === 4) return { q: S.m11.es_no_z_q(mu, sd, H.dec(a)), kind: "num", ans: z, tol: 0.001, sol: S.m11.es_no_z_s(H.dec(a), mu, sd, H.dec(z)) };
  const ans = [ph, 1 - ph, 1 - ph, 2 * ph - 1][k];
  return { q: S.m11.es_no_q[k](mu, sd, H.dec(a), H.dec(b), H.dec(z), H.dec(ph)), kind: "num", ans: rd(ans, 4), tol: 0.0002,
    sol: S.m11.es_no_s[k](H.dec(a), H.dec(b), mu, sd, H.dec(z), H.dec(ph), H.dec(rd(ans, 4))) };
});
// ═════ Técnicas de recuento y probabilidad (generadores añadidos) ═════
const g11 = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const sf = (a, b) => WA.MATH.F.make(a, b);   // fracción irreducible (la respuesta)
const fr = (a, b) => { const g = g11(a, b); return b / g === 1 ? `${a / g}` : `${a / g}/${b / g}`; };   // 6/6 → 1, no «1/1»
const V = (m, n) => { let r = 1; for (let i = 0; i < n; i++) r *= m - i; return r; };
const fact = n => V(n, n);
const dec = (x, k = 4) => String(rd(x, k)).replace(".", WA.H.ds);
function opt11(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ── Técnicas de recuento ──
// Cada situación: [tipo (0 V · 1 VR · 2 P · 3 C), datos (m, n), cuenta]
function situacion(R) {
  const t = R.int(0, 9);
  if (t === 0) { const m = R.int(6, 12); return { k: 0, i: 0, m, n: 3, r: V(m, 3) }; }   // podio
  if (t === 1) { const n = R.int(3, 5); return { k: 1, i: 1, m: 10, n, r: 10 ** n }; }   // PIN
  if (t === 2) { const m = R.int(4, 8); return { k: 2, i: 2, m, n: m, r: fact(m) }; }   // ordenar libros
  if (t === 3) { const m = R.int(8, 25), n = R.int(2, 4); return { k: 3, i: 3, m, n, r: C(m, n) }; }   // equipo / comité
  if (t === 4) { const m = R.int(5, 15); return { k: 3, i: 4, m, n: 2, r: C(m, 2) }; }   // apretones de manos
  if (t === 5) { const m = R.int(5, 8), n = R.int(2, 4); return { k: 0, i: 5, m, n, r: V(m, n) }; }   // palabras con letras distintas
  if (t === 6) { const m = R.int(4, 8); return { k: 0, i: 6, m, n: 3, r: V(m, 3) }; }   // banderas de tres franjas
  if (t === 7) { const n = R.int(3, 8); return { k: 1, i: 7, m: 3, n, r: 3 ** n }; }   // quinielas
  if (t === 8) { const m = R.int(15, 30); return { k: 0, i: 8, m, n: 2, r: V(m, 2) }; }   // delegado y subdelegado
  const m = R.int(5, 12); return { k: 3, i: 9, m, n: 2, r: C(m, 2) };   // dos sabores de helado
}
def("m11.es.recuento", (R, S, H) => {
  const T = S.m11.RC, v = R.int(0, 4);
  if (v <= 1) {
    const s = situacion(R), q = T.sit[s.i](s.m, s.n);
    if (v === 0) return { q: T.tipo_q(q), kind: "choice", opts: T.tipos, correct: s.k, shuffle: false, sol: T.tipo_s[s.k] + " " + T.cuenta(s.k, s.m, s.n, H.n(s.r)) };
    return { q: q + " " + T.cuantos, kind: "int", ans: s.r, sol: T.tipo_s[s.k] + " " + T.cuenta(s.k, s.m, s.n, H.n(s.r)) };
  }
  if (v === 2) {   // número combinatorio (a veces con la simetría)
    const m = R.int(5, 12), n = R.int(2, m - 2), sym = n > m / 2;
    return { q: T.comb_q(m, n), kind: "int", ans: C(m, n), sol: T.comb_s(m, n, sym ? m - n : n, H.n(C(m, n)), sym) };
  }
  if (v === 3) {   // binomio de Newton
    const n = R.int(4, 9), k = R.int(1, n - 1), row = Array.from({ length: n + 1 }, (_, i) => C(n, i));
    if (R.r() < 0.5) return { q: T.bin1_q(n, k), kind: "int", ans: C(n, k), sol: T.bin1_s(n, k, row.join(", "), C(n, k)) };
    return { q: T.binab_q(n, n - k, k), kind: "int", ans: C(n, k), sol: T.binab_s(n, k, C(n, k)) };   // sin «a¹» ni «b¹» (en los textos)
  }
  const [what, labels] = R.pick(T.etapas), ns = labels.map(() => R.int(2, 6)), tot = ns.reduce((a, b) => a * b, 1);   // principio de multiplicación
  const [, , que] = T.etapas.find(e => e[0] === what);
  return { q: T.mult_q(what, labels.map((l, i) => `${ns[i]} ${l}`), que), kind: "int", ans: tot, sol: T.mult_s(ns.join(" · "), tot) };
});

// ── Experimentos aleatorios y probabilidad ──
const DIE = [1, 2, 3, 4, 5, 6];
// Sucesos de un dado: [texto, condición]
const dieEv = (T, R) => R.pick([
  () => { const k = R.int(1, 4); return [T.ev.mayor(k), x => x > k]; }, () => { const k = R.int(3, 6); return [T.ev.menor(k), x => x < k]; },
  () => [T.ev.par, x => x % 2 === 0], () => [T.ev.impar, x => x % 2 === 1], () => [T.ev.mult3, x => x % 3 === 0],
  () => [T.ev.primo, x => [2, 3, 5].includes(x)], () => [T.ev.div6, x => 6 % x === 0],
])();
def("m11.es.laplace", (R, S, H) => {
  const T = S.m11.PL, v = R.int(0, 6);
  if (v === 0) {   // Laplace con un dado
    const [txt, f] = dieEv(T, R), fav = DIE.filter(f);
    return { q: T.dado_q(txt), kind: "frac", ans: sf(fav.length, 6), sol: T.dado_s(fav.join(", "), fav.length, fr(fav.length, 6), `${fav.length}/6`) };
  }
  if (v === 1) {   // unión de sucesos
    let a, b, i; do { a = R.int(2, 7) / 10; b = R.int(2, 7) / 10; i = R.int(1, 4) / 10; } while (i > Math.min(a, b) || a + b - i > 1);
    if (R.r() < 0.6) { const u = rd(a + b - i, 2); return { q: T.union_q(dec(a), dec(b), dec(i)), kind: "num", ans: u, tol: 0.001, sol: T.union_s(dec(a), dec(b), dec(i), dec(u)) }; }
    const u = rd(a + b - i, 2); return { q: T.inter_q(dec(a), dec(b), dec(u)), kind: "num", ans: rd(i, 2), tol: 0.001, sol: T.inter_s(dec(a), dec(b), dec(u), dec(i)) };
  }
  if (v === 2) {   // el contrario: al menos un 6
    const n = R.int(2, 5), r = rd(1 - (5 / 6) ** n, 4);
    return { q: T.almenos_q(n), kind: "num", ans: r, tol: 0.0006, sol: T.almenos_s(n, dec((5 / 6) ** n), dec(r)) };
  }
  if (v === 3) {   // la suma de dos dados
    const s = R.int(2, 12), f = 6 - Math.abs(s - 7), cases = [];
    for (let a = 1; a <= 6; a++) { const b = s - a; if (b >= 1 && b <= 6) cases.push(`${a}+${b}`); }
    return { q: T.suma_q(s), kind: "frac", ans: sf(f, 36), sol: T.suma_s(s, cases.join(", "), f, fr(f, 36), `${f}/36`) };
  }
  if (v === 4) {   // sacar varias a la vez: combinatoria
    if (R.r() < 0.5) { const r = R.int(3, 6), b = R.int(2, 6), fav = C(r, 2), pos = C(r + b, 2); return { q: T.bolsa_q(r, b), kind: "frac", ans: sf(fav, pos), sol: T.bolsa_s(r, b, fav, pos, fr(fav, pos)) }; }
    const a = R.int(4, 7), b = R.int(3, 6), fav = C(a, 3), pos = C(a + b, 3);
    return { q: T.comite_q(a, b), kind: "frac", ans: sf(fav, pos), sol: T.comite_s(a, b, fav, pos, fr(fav, pos)) };
  }
  if (v === 5) {   // operaciones con sucesos de un dado
    const [ta, fa] = dieEv(T, R); let tb, fb, tries = 0;
    do [tb, fb] = dieEv(T, R); while (tb === ta && ++tries < 30);
    const A = DIE.filter(fa), B = DIE.filter(fb), U = DIE.filter(x => fa(x) || fb(x)), I = DIE.filter(x => fa(x) && fb(x));
    if (R.r() < 0.6) return { q: T.op_q(ta, tb), kind: "frac", ans: sf(U.length, 6), sol: T.op_s(A.join(", "), B.join(", "), U.join(", "), U.length, fr(U.length, 6), I.join(", ") || "∅") };
    return { q: T.incomp_q(ta, tb), kind: "choice", opts: T.sino, correct: I.length ? 1 : 0, shuffle: false, sol: T.incomp_s(A.join(", "), B.join(", "), I.join(", ")) };
  }
  const [obj, ev] = R.pick(T.objs), N = R.pick([500, 800, 1000, 2000]), f = Math.round(R.int(20, 80) / 100 * N), h = rd(f / N, 3);   // frecuencia relativa
  return { q: T.frec_q(obj, N, ev, f), kind: "num", ans: h, tol: 0.0006, sol: T.frec_s(f, N, h.toFixed(3).replace(".", WA.H.ds)) };   // siempre tres decimales: 0,290
});
// ── fin: ═════ Técnicas de recuento y probabilidad (generadores añadidos) ═════
})();
