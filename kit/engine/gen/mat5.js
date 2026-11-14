/* WikiAula — Matemáticas, Grados 5 y 6 (5.º y 6.º de Primaria): generadores
   nuevos (los demás temas usan los de los grados 3, 4 y 7).
   Textos: i18n/<lang>/mat5.js (S.m5). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;

// ── Fracciones (sin negativos) y criterios de divisibilidad de Primaria ──
const { gcd, F } = WA.MATH;
// Fracción propia e irreducible de denominador ≤ maxd (3/4, 2/5…; nunca 4/2 ni 6/8)
const propFrac = (R, maxd = 9) => { for (;;) { const d = R.int(2, maxd), n = R.int(1, d - 1); if (gcd(n, d) === 1) return [n, d]; } };
const ft = r => r[1] === 1 ? String(r[0]) : `${r[0]}/${r[1]}`;
def("m5.frmult", (R, S) => {
  const [a, b] = propFrac(R), [c, d] = propFrac(R), r = F.make(a * c, b * d);
  if (R.r() < 0.3) { const n = R.int(2, 9); const r2 = F.make(a * n, b); return { q: S.m5.fm_q(`${n} × ${a}/${b}`), kind: "frac", ans: r2, sol: S.m5.fm2_s(n, a, b, a * n, b, ft(r2)) }; }
  return { q: S.m5.fm_q(`${a}/${b} × ${c}/${d}`), kind: "frac", ans: r, sol: S.m5.fm_s(a, c, b, d, a * c, b * d, ft(r)) };
});
// División de fracciones para Primaria: sin negativos y con números pequeños
def("m5.frdiv", (R, S) => {
  if (R.r() < 0.25) {   // fracción entre un número natural
    const [a, b] = propFrac(R), n = R.int(2, 6), r = F.make(a, b * n);
    return { q: S.m5.fm_q(`${a}/${b} ${WA.H.div} ${n}`), kind: "frac", ans: r, sol: S.m5.fd2_s(a, b, n, b * n, ft(r)) };
  }
  const [a, b] = propFrac(R), [c, d] = propFrac(R), r = F.make(a * d, b * c);
  return { q: S.m5.fm_q(`${a}/${b} ${WA.H.div} ${c}/${d}`), kind: "frac", ans: r, sol: S.m5.fd_s(a, b, c, d, a * d, b * c, ft(r)) };
});
// Operaciones combinadas con fracciones para Primaria: sin resultados negativos
// ni intermedios negativos, denominadores pequeños y resultado razonable
def("m5.frcomb", (R, S) => {
  const fh = f => ft(f);
  for (let k = 0; k < 200; k++) {
    const a = propFrac(R, 6), b = propFrac(R, 6), c = propFrac(R, 6), t = R.int(0, 3);
    let q, mid, r;
    if (t === 0) { const bc = F.mul(b, c); r = F.add(a, bc); q = `${fh(a)} + ${fh(b)} × ${fh(c)}`; mid = `${fh(a)} + ${fh(bc)}`; }
    else if (t === 1) { const ab = F.add(a, b); r = F.mul(ab, c); q = `(${fh(a)} + ${fh(b)}) × ${fh(c)}`; mid = `${fh(ab)} × ${fh(c)}`; }
    else if (t === 2) { const bc = F.mul(b, c); r = F.sub(a, bc); q = `${fh(a)} − ${fh(b)} × ${fh(c)}`; mid = `${fh(a)} − ${fh(bc)}`; }
    else { const ab = F.sub(a, b); if (ab[0] <= 0) continue; r = F.mul(ab, c); q = `(${fh(a)} − ${fh(b)}) × ${fh(c)}`; mid = `${fh(ab)} × ${fh(c)}`; }
    if (r[0] <= 0 || r[0] > 30 || r[1] > 36) continue;
    return { q: S.m5.fm_q(q), kind: "frac", ans: r, sol: S.m5.fc_s(q, mid, fh(r), t === 1 || t === 3) };
  }
  return null;
});
const dsum5 = n => String(n).split("").reduce((s, x) => s + +x, 0);
def("m5.criterio", (R, S) => {
  const t = R.r();
  if (t < 0.25) {   // ¿entre cuáles de 2, 3, 5 y 10 es divisible? (puede haber varios)
    const n = R.r() < 0.75 ? R.pick([2, 3, 5, 6, 10, 15, 30]) * R.int(12, 330) : R.int(100, 9999), ds = [2, 3, 5, 10];
    return { q: S.m5.cr_multi_q(n), kind: "multi", opts: ds.map(String), correct: ds.map((d, i) => n % d === 0 ? i : -1).filter(i => i >= 0),
      sol: ds.map(d => S.m5.cr_s[d](n, n % d === 0, dsum5(n))).join("<br>") };
  }
  if (t < 0.45) {   // la cifra que falta
    const d = R.pick([3, 3, 3, 2, 5, 10]);
    if (d === 3) {
      const a = R.int(1, 99), b = R.int(0, 9), s0 = dsum5(a) + b, ans = [];
      for (let x = 0; x <= 9; x++) if ((s0 + x) % 3 === 0) ans.push(x);
      return { q: S.m5.cr_hueco_q(`${a}_${b}`, 3), kind: "set", ans, sol: S.m5.cr_hueco3_s(String(a).split("").concat([b]).join(" + "), s0, ans) };
    }
    const a = R.int(10, 999), ans = d === 2 ? [0, 2, 4, 6, 8] : d === 5 ? [0, 5] : [0];
    return { q: S.m5.cr_hueco_q(`${a}_`, d), kind: "set", ans, sol: S.m5.cr_hueco_s(d, ans) };
  }
  const d = R.pick([2, 3, 5, 10]), yes = R.r() < 0.5;
  let n; do n = R.int(100, 9999); while ((n % d === 0) !== yes);
  return { q: S.m5.cr_q(n, d), kind: "choice", opts: S.m5.sino, correct: yes ? 0 : 1, shuffle: false, sol: S.m5.cr_s[d](n, yes, dsum5(n)) };
});

// ── Escalas (mapas y planos) ──
def("m5.escala", (R, S, H) => {
  const e = R.pick([100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000, 200000]), k = R.int(0, 2);
  if (k === 0) { const cm = R.int(2, 15), real = cm * e; return { q: S.m5.esc_q(H.n(e), cm, e), kind: "num", ans: real / 100, sol: S.m5.esc_s(cm, H.n(e), H.n(real), H.dec(real / 100), e) }; }
  if (k === 1) { const cm = R.int(2, 15), m = cm * e / 100; return { q: S.m5.esc2_q(H.n(e), H.dec(m), e), kind: "num", ans: cm, sol: S.m5.esc2_s(H.dec(m), H.n(m * 100), H.n(e), cm, e) }; }
  const cm = R.int(2, 12), km = R.int(1, 20), ee = km * 100000 / cm;
  if (!Number.isInteger(ee)) return { q: S.m5.esc_q(H.n(e), cm, e), kind: "num", ans: cm * e / 100, sol: S.m5.esc_s(cm, H.n(e), H.n(cm * e), H.dec(cm * e / 100), e) };
  return { q: S.m5.esc3_q(cm, km), kind: "int", ans: ee, sol: S.m5.esc3_s(km, H.n(km * 100000), cm, H.n(ee)) };
});

// ── Superficie: km², hm², dam², m², dm², cm², mm² (cada escalón × 100) ──
const SU = ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"];
def("m5.superficie", (R, S, H) => {
  let i, j; do { i = R.int(1, 6); j = R.int(1, 6); } while (i === j || Math.abs(i - j) > 2);
  const f = 100 ** Math.abs(i - j), down = i < j;
  const v = down ? R.int(1, 60) : R.int(1, 60) * f, r = down ? v * f : v / f;
  return { q: S.m5.sup_q(H.n(v), SU[i], SU[j]), kind: "num", ans: r, sol: S.m5.sup_s(SU[i], SU[j], H.n(f), down, H.n(v), H.n(r)) };
});

// ── Gráfico de líneas (temperaturas) ──
function lineChart(vals, labels) {
  const w = 300, h = 160, x0 = 34, y0 = 140, max = Math.max(...vals) + 2, sx = (w - x0 - 10) / (vals.length - 1), sy = (y0 - 14) / max;
  let b = "";
  for (let v = 0; v <= max; v += 2) b += `<line x1="${x0}" y1="${y0 - v * sy}" x2="${w - 6}" y2="${y0 - v * sy}" stroke="#e3e6ea"/>` + SVG.txt(x0 - 6, y0 - v * sy + 4, v, 10, C.dark, "end");
  b += `<polyline points="${vals.map((v, i) => `${x0 + i * sx},${y0 - v * sy}`).join(" ")}" fill="none" stroke="${C.red}" stroke-width="2.5"/>`;
  vals.forEach((v, i) => { b += `<circle cx="${x0 + i * sx}" cy="${y0 - v * sy}" r="4" fill="${C.red}"/>` + SVG.txt(x0 + i * sx, y0 + 14, labels[i], 10); });
  b += `<line x1="${x0}" y1="${y0}" x2="${w - 6}" y2="${y0}" stroke="${C.dark}"/><line x1="${x0}" y1="10" x2="${x0}" y2="${y0}" stroke="${C.dark}"/>`;
  return SVG.svg(w, h, b);
}
def("m5.lineas", (R, S) => {
  const days = S.m5.dias, vals = days.map(() => 2 * R.int(2, 12)),   // pares: cada punto cae en una línea de la cuadrícula
    pic = "<br>" + lineChart(vals, days), k = R.int(0, 3);
  if (k === 3) {   // ¿entre qué dos días subió más?
    const up = vals.slice(1).map((v, i) => v - vals[i]), mx = Math.max(...up);
    if (mx > 0 && up.filter(x => x === mx).length === 1) {
      const i = up.indexOf(mx), opts = days.slice(1).map((_, j) => S.m5.lin_par(S.m5.diasL[j], S.m5.diasL[j + 1]));
      return { q: S.m5.linsub_q + pic, kind: "choice", opts, correct: i, shuffle: false,
        sol: S.m5.linsub_s(up.map((x, j) => x > 0 ? `${S.m5.lin_par(S.m5.diasL[j], S.m5.diasL[j + 1])}, +${x} °C` : null).filter(Boolean).join("; "), opts[i], vals[i], vals[i + 1], mx) };
    }
  }
  if (k === 0) { const i = R.int(0, days.length - 1); return { q: S.m5.lin_q(S.m5.diasL[i]) + pic, kind: "int", ans: vals[i], sol: S.m5.lin_s(S.m5.diasL[i], vals[i]) }; }
  if (k === 1) { let i; do i = R.int(0, days.length - 2); while (vals[i + 1] === vals[i]); return { q: S.m5.lind_q(S.m5.diasL[i], S.m5.diasL[i + 1]) + pic, kind: "int", ans: Math.abs(vals[i + 1] - vals[i]), sol: S.m5.lind_s(vals[i], vals[i + 1]) }; }
  const mx = Math.max(...vals), i = vals.indexOf(mx);
  if (vals.filter(v => v === mx).length > 1) return { q: S.m5.lin_q(S.m5.diasL[0]) + pic, kind: "int", ans: vals[0], sol: S.m5.lin_s(S.m5.diasL[0], vals[0]) };
  return { q: S.m5.linm_q + pic, kind: "choice", opts: S.m5.diasL, correct: i, shuffle: false, sol: S.m5.linm_s(S.m5.diasL[i], mx) };
});

// ── Volumen: cubos unidad y unidades cúbicas (cada escalón × 1000) ──
function cubes(a, b, c) {
  const s = 14, dx = 6, dy = 5;
  let g = "";
  for (let z = 0; z < c; z++) for (let y = b - 1; y >= 0; y--) for (let x = 0; x < a; x++) {
    const X = 20 + x * s + y * dx, Y = 20 + (c - z) * s + (b - 1 - y) * dy + 10;
    g += `<rect x="${X}" y="${Y}" width="${s}" height="${s}" fill="#cfe0ff" stroke="${C.blue}" stroke-width=".8"/>`;
  }
  return SVG.svg(40 + a * s + b * dx, 40 + c * s + b * dy, g);
}
const VU = ["km³", "hm³", "dam³", "m³", "dm³", "cm³", "mm³"];
def("m5.volumen", (R, S, H) => {
  if (R.r() < 0.5) {
    const a = R.int(2, 5), b = R.int(2, 4), c = R.int(1, 4);
    return { q: S.m5.vol_q + "<br>" + cubes(a, b, c), kind: "int", ans: a * b * c, sol: S.m5.vol_s(a, b, c, a * b * c) };
  }
  let i, j; do { i = R.int(3, 6); j = R.int(3, 6); } while (i === j || Math.abs(i - j) > 1);
  const f = 1000, down = i < j, v = down ? R.int(1, 40) : R.int(1, 40) * f, r = down ? v * f : v / f;
  return { q: S.m5.sup_q(H.n(v), VU[i], VU[j]), kind: "num", ans: r, sol: S.m5.vol2_s(VU[i], VU[j], down, H.n(v), H.n(r)) };
});
def("m5.capvol", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const v = R.int(1, 30); return { q: S.m5.cv_q(v, "dm³", "L"), kind: "num", ans: v, sol: S.m5.cv_s0(v) }; }
  if (k === 1) { const v = R.int(1, 9); return { q: S.m5.cv_q(v, "m³", "L"), kind: "num", ans: v * 1000, sol: S.m5.cv_s1(v, H.n(v * 1000)) }; }
  const a = R.int(2, 10), b = R.int(2, 8), c = R.int(2, 6);
  return { q: S.m5.cv2_q(a, b, c), kind: "num", ans: a * b * c, sol: S.m5.cv2_s(a, b, c, a * b * c) };
});
def("m5.agrarias", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const v = R.int(1, 40); return { q: S.m5.ag_q(v, "ha", "m²"), kind: "num", ans: v * 10000, sol: S.m5.ag_s0(v, H.n(v * 10000)) }; }
  if (k === 1) { const v = R.int(1, 90); return { q: S.m5.ag_q(v, "a", "m²"), kind: "num", ans: v * 100, sol: S.m5.ag_s1(v, H.n(v * 100)) }; }
  const v = R.int(1, 30) * 10000; return { q: S.m5.ag_q(H.n(v), "m²", "ha"), kind: "num", ans: v / 10000, sol: S.m5.ag_s2(H.n(v), v / 10000) };
});

// ── Área del trapecio ──
def("m5.trapecio", (R, S) => {
  let B, b, h; do { B = R.int(5, 20); b = R.int(2, B - 1); h = R.int(2, 12); } while (((B + b) * h) % 2);
  const tw = Math.round(180 * b / B);
  const pic = SVG.svg(220, 110, `<polygon points="20,95 200,95 ${20 + tw},20 20,20" fill="#fef6e7" stroke="${C.dark}" stroke-width="2"/>`
    + SVG.txt(110, 108, `B = ${B} cm`, 12) + SVG.txt(20 + tw / 2, 15, `b = ${b} cm`, 12) + `<line x1="40" y1="20" x2="40" y2="95" stroke="${C.red}" stroke-dasharray="4 3"/>` + SVG.txt(48, 62, `h = ${h}`, 12, C.red, "start"));
  return { q: S.m5.trap_q + "<br>" + pic, kind: "num", ans: (B + b) * h / 2, sol: S.m5.trap_s(B, b, h, (B + b) * h / 2) };
});

// ── Poliedros: fórmula de Euler ──
// [nombre (índice de S.m5.eu_poli), caras, vértices, aristas]: cubo, tetraedro, octaedro, prisma pentagonal, pirámide
// pentagonal, dodecaedro, icosaedro, prisma hexagonal
const POLI = [[0, 6, 8, 12], [1, 4, 4, 6], [2, 8, 6, 12], [3, 7, 10, 15], [4, 6, 6, 10], [5, 12, 20, 30], [6, 20, 12, 30], [7, 8, 12, 18]];
def("m5.euler", (R, S) => {
  const [ni, c, v, a] = R.pick(POLI), n = S.m5.eu_poli[ni], k = R.int(0, 2);
  const vals = [c, v, a], miss = vals[k];
  return { q: S.m5.eu_q(n, S.m5.eu_w.map((w, i) => i === k ? null : `${vals[i]} ${w}`).filter(Boolean), S.m5.eu_w[k]), kind: "int", ans: miss, sol: S.m5.eu_s(c, v, a, k, n) };
});
// ═══════════ Grado 5: versiones de Primaria de los generadores de 1.º de ESO ═══════════
// Signo × y «dividir entre», sin m.c.d./m.c.m. ni «regla de Laplace», decimales hasta las
// milésimas y soluciones con los pasos de la lección. Textos: S.m5 (i18n/es/mat5.js).
const { lcm, eur, PRIMES } = WA.MATH;
const T = S => S.m5;
const pow10 = k => 10 ** k;
const pad = (s, n) => String(s).padStart(n, "0");
const fr = (H, a) => a[1] === 1 ? H.n(a[0]) : H.frac(a[0], a[1]);
// Decimal con k cifras tras la coma (con ceros finales) a partir de un entero: 2496, 2 → 24,96
const fixd = (H, i, k) => { if (!k) return H.n(i); const s = pad(i, k + 1); return H.n(+s.slice(0, -k)) + H.ds + s.slice(-k); };
// Múltiplos hasta llegar a m: 4, 8, 12
const mults = (d, m) => { const r = []; for (let x = d; x <= m; x += d) r.push(x); return r.join(", "); };

// ── División entera larga, paso a paso (como en mat5.u1.dividir) ──
function longDiv(S, H, a, d) {
  const s = String(a), L = [];
  let k = String(d).length, chunk = +s.slice(0, k);
  if (chunk < d) { k++; chunk = +s.slice(0, k); }
  let q = Math.floor(chunk / d), r = chunk - q * d;
  L.push(T(S).ld_first(H.n(chunk), d, q, H.n(d * q), r));
  for (let i = k; i < s.length; i++) {
    const cur = r * 10 + +s[i], qi = Math.floor(cur / d);
    r = cur - qi * d;
    L.push(qi ? T(S).ld_step(s[i], H.n(cur), d, qi, H.n(d * qi), r) : T(S).ld_zero(s[i], H.n(cur), d));
  }
  return L;
}
def("m5.division", (R, S, H) => {
  const three = R.r() < 0.3, d = three ? R.int(101, 399) : R.int(12, 99), q = three ? R.int(12, 99) : R.int(12, 250), r = R.int(0, d - 1), a = d * q + r;
  return { q: T(S).div_q(H.n(a), d), kind: "fields", fields: [{ label: T(S).div_f[0], ans: q }, { label: T(S).div_f[1], ans: r }],
    sol: longDiv(S, H, a, d).join("<br>") + "<br>" + T(S).div_s(H.n(a), d, q, r, H.n(d * q)) };
});
def("m5.dividendo", (R, S, H) => {
  const d = R.int(12, 45), q = R.int(11, 120), r = R.int(1, d - 1), D = d * q + r;
  return { q: T(S).dvd_q(d, q, r), kind: "int", ans: D, sol: T(S).dvd_s(d, q, r, H.n(d * q), H.n(D)) };
});

// ── Potencias y raíz cuadrada ──
def("m5.potvalor", (R, S, H) => {
  const b = R.int(2, 12), e = b <= 3 ? R.int(2, 6) : b <= 5 ? R.int(2, 4) : b <= 10 ? R.int(2, 3) : 2;
  const st = []; let v = b;
  for (let i = 1; i < e; i++) { st.push(`${H.n(v)} × ${b} = ${H.n(v * b)}`); v *= b; }
  return { q: T(S).pv_q(H.pow(b, e)), kind: "int", ans: v, sol: T(S).pv_s(H.pow(b, e), Array(e).fill(b).join(" × "), st, H.n(v)) };
});
def("m5.potpartes", (R, S, H) => {
  const b = R.int(2, 15); let e = R.int(2, 9); while (e === b) e = R.int(2, 9);
  const what = R.pick(["b", "e"]);
  return { q: T(S).pp_q(H.pow(b, e), what), kind: "int", ans: what === "b" ? b : e, sol: T(S).pp_s(H.pow(b, e), Array(e).fill(b).join(" × "), b, e) };
});
def("m5.raiz", (R, S, H) => {
  const tens = R.r() < 0.4, r = tens ? 10 * R.int(2, 9) : R.int(2, 12), n = r * r, patio = R.r() < 0.35;
  const sol = tens ? T(S).rz_s10(H.n(n), n / 100, r / 10, r) : T(S).rz_s(n, r);
  return { q: patio ? T(S).rz_patio_q(H.n(n)) : T(S).rz_q(H.sqrt(H.n(n))), kind: "int", ans: r, sol };
});
def("m5.raizentre", (R, S, H) => {
  const a = R.int(2, 11), n = a * a + R.int(1, 2 * a);
  return { q: T(S).rze_q(H.sqrt(n)), kind: "fields", fields: [{ label: T(S).rze_f[0], ans: a }, { label: T(S).rze_f[1], ans: a + 1 }], sol: T(S).rze_s(n, a) };
});

// ── Divisibilidad ──
def("m5.multiplo", (R, S) => {
  if (R.r() < 0.25) {   // los múltiplos que hay entre dos números
    const b = R.int(3, 12); let x, y; do { x = R.int(10, 70); y = x + b * R.int(3, 5) + R.int(1, b - 1); } while (x % b === 0 || y % b === 0);
    const k0 = Math.floor(x / b) + 1, ans = []; for (let m = k0 * b; m < y; m += b) ans.push(m);
    return { q: T(S).mul_set_q(b, x, y), kind: "set", ans, sol: T(S).mul_set_s(b, k0, x, y, ans.join(", ")) };
  }
  const b = R.int(3, 19), yes = R.r() < 0.5, q = R.int(4, 40), a = yes ? b * q : b * q + R.int(1, b - 1);
  return { q: T(S).mul_q(a, b), kind: "choice", opts: T(S).sino, correct: yes ? 0 : 1, shuffle: false, sol: T(S).mul_s(a, b, Math.floor(a / b), a % b) };
});
def("m5.divisores", (R, S) => {
  const n = R.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 52, 54, 56, 60]);
  const d = [], pairs = [], no = [];
  for (let x = 1; x <= n; x++) if (n % x === 0) d.push(x);
  for (let x = 1; x * x <= n; x++) { if (n % x === 0) pairs.push(`${x} × ${n / x}`); else no.push(x); }
  return { q: T(S).dvs_q(n), kind: "set", ans: d, sol: T(S).dvs_s(n, pairs.join(", "), no, d.join(", ")) };
});
def("m5.primo", (R, S) => {
  const n = R.r() < 0.5 ? R.pick(PRIMES.filter(p => p > 10).concat([101, 103, 107, 109, 113]))
    : R.pick([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99, 111, 117, 119]);
  const st = [];
  for (const p of [2, 3, 5, 7]) {
    const ok = n % p === 0;
    st.push(T(S).pr_paso[p](n, ok, String(n).split("").reduce((s, x) => s + +x, 0)));
    if (ok) return { q: T(S).pr_q(n), kind: "choice", opts: T(S).pr_opts, correct: 1, sol: st.join("<br>") + "<br>" + T(S).pr_comp(n, p, n / p) };
  }
  return { q: T(S).pr_q(n), kind: "choice", opts: T(S).pr_opts, correct: 0, sol: st.join("<br>") + "<br>" + T(S).pr_primo(n) };
});

// ── Fracciones ──
const DEN5 = [2, 3, 4, 5, 6, 8, 10, 12];
const prop5 = (R, dens = DEN5) => { for (;;) { const d = R.pick(dens), n = R.int(1, d - 1); if (gcd(n, d) === 1) return [n, d]; } };
// Simplificar poco a poco (entre 2, entre 3…): pasos «entre 2: 6/24»
function simpSteps(H, n, d) {
  const st = [];
  for (const p of [2, 3, 5, 7, 11]) while (n % p === 0 && d % p === 0) { n /= p; d /= p; st.push([p, n, d]); }
  return st;
}
def("m5.frsimp", (R, S, H) => {
  const [n, d] = prop5(R), k = R.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]), N = n * k, D = d * k;
  const st = simpSteps(H, N, D);
  return { q: T(S).fs_q(H.frac(N, D)), kind: "frac", ans: [n, d], simplest: true, hint: T(S).hint_simp,
    sol: T(S).fs_s(st.map(([p, a, b], i) => T(S).fs_paso(p, H.frac(a, b), i === st.length - 1)), st.length > 1 ? k : 0) };
});
def("m5.frcomp", (R, S, H) => {
  let a, b, t = R.r();
  if (t < 0.2) { const d = R.pick(DEN5.slice(2)); let x, y; do { x = R.int(1, d - 1); y = R.int(1, d - 1); } while (x === y); a = [x, d]; b = [y, d]; }
  else if (t < 0.4) { let d1, d2; const n = R.int(1, 5); do { d1 = R.int(n + 1, 12); d2 = R.int(n + 1, 12); } while (d1 === d2 || gcd(n, d1) !== 1 || gcd(n, d2) !== 1); a = [n, d1]; b = [n, d2]; }
  else { do { a = prop5(R); b = prop5(R); } while (a[1] === b[1] || lcm(a[1], b[1]) > 36 || a[0] * b[1] === b[0] * a[1]); t = 1; }
  const gt = a[0] * b[1] > b[0] * a[1], sg = gt ? "&gt;" : "&lt;", fa = H.frac(a[0], a[1]), fb = H.frac(b[0], b[1]), res = `${fa} ${sg} ${fb}`;
  let sol;
  if (a[1] === b[1]) sol = T(S).fc_den(res);
  else if (a[0] === b[0]) sol = T(S).fc_num(res);
  else {
    const m = lcm(a[1], b[1]), ka = m / a[1], kb = m / b[1];
    const eq = (f, fh, k) => k === 1 ? T(S).fc_ya(fh, m) : `${fh} = ${H.frac(f[0] * k, m)} ${T(S).fc_por(k)}`;
    sol = T(S).fc_mcm(a[1], mults(a[1], m), b[1], mults(b[1], m), m, eq(a, fa, ka), eq(b, fb, kb), a[0] * ka, gt ? "&gt;" : "&lt;", b[0] * kb, res);
  }
  return { q: T(S).fc_q(fa, fb), kind: "choice", opts: ["&lt;", "&gt;"], correct: gt ? 1 : 0, shuffle: false, sol };
});
def("m5.frcant", (R, S, H) => {
  const [n, d] = prop5(R, [2, 3, 4, 5, 6, 8, 9, 10, 12]), c = d * R.int(2, 25), u = R.pick(T(S).fq_u), p = c / d;
  return { q: T(S).fq_q(H.frac(n, d), H.n(c), u), kind: "int", ans: p * n, sol: T(S).fq_s(H.n(c), d, H.n(p), n, H.n(p * n)) };
});
def("m5.frsuma", (R, S, H) => {
  if (R.r() < 0.2) {   // lo que falta hasta la unidad
    const [n, d] = prop5(R);
    return { q: T(S).sr_q(`1 − ${H.frac(n, d)}`), kind: "frac", ans: [d - n, d], simplest: true, hint: T(S).hint_simp, sol: T(S).sr_uno(d, H.frac(d, d), H.frac(n, d), H.frac(d - n, d)) };
  }
  let a, b, minus;
  do {
    minus = R.r() < 0.5;
    if (R.r() < 0.15) { const d = R.pick(DEN5.slice(1)); a = prop5(R, [d]); b = prop5(R, [d]); }
    else { a = prop5(R); b = prop5(R); }
    if (minus && a[0] * b[1] < b[0] * a[1]) [a, b] = [b, a];
  } while (lcm(a[1], b[1]) > 24 || (minus && a[0] * b[1] === b[0] * a[1]));
  const m = lcm(a[1], b[1]), A = a[0] * m / a[1], B = b[0] * m / b[1], N = minus ? A - B : A + B, r = F.make(N, m), sym = minus ? "−" : "+";
  const fa = H.frac(a[0], a[1]), fb = H.frac(b[0], b[1]), raw = H.frac(N, m), fin = fr(H, r);
  const simp = r[1] === m ? "" : T(S).sr_simp(simpSteps(H, N, m).map(([p, x, y]) => T(S).fs_paso(p, y === 1 ? H.n(x) : H.frac(x, y), false)).join("; "));
  const sol = a[1] === b[1] ? T(S).sr_igual(`${fa} ${sym} ${fb}`, raw, simp, fin)
    : T(S).sr_dist(a[1], b[1], m, a[1] === m ? T(S).fc_ya(fa, m) : `${fa} = ${H.frac(A, m)}`, b[1] === m ? T(S).fc_ya(fb, m) : `${fb} = ${H.frac(B, m)}`, `${H.frac(A, m)} ${sym} ${H.frac(B, m)} = ${raw}`, simp, fin);
  return { q: T(S).sr_q(`${fa} ${sym} ${fb}`), kind: "frac", ans: r, simplest: true, hint: T(S).hint_simp, sol };
});
def("m5.fracdec", (R, S, H) => {
  if (R.r() < 0.35) {   // del decimal a la fracción irreducible
    const d = R.pick([2, 4, 5, 20, 25, 50]); let n; do n = R.int(1, d - 1); while (gcd(n, d) !== 1);
    const Tg = d === 2 || d === 5 ? 10 : 100, c = n * Tg / d, v = c / Tg, st = simpSteps(H, c, Tg);
    return { q: T(S).fd_inv_q(H.dec(v)), kind: "frac", ans: [n, d], simplest: true, hint: T(S).hint_simp,
      sol: T(S).fd_inv_s(H.dec(v), c, Tg, H.frac(c, Tg), st.map(([p, x, y], i) => T(S).fs_paso(p, H.frac(x, y), i === st.length - 1)).join("; ")) };
  }
  const d = R.pick([2, 4, 5, 10, 20, 25, 50]); let n; do n = R.int(1, d - 1); while (gcd(n, d) !== 1);
  const Tg = d === 2 || d === 5 || d === 10 ? 10 : 100, k = Tg / d, v = n * k / Tg;
  return { q: T(S).fd_q(H.frac(n, d)), kind: "num", ans: v, sol: k === 1 ? T(S).fd_s1(H.frac(n, d), n, Tg, H.dec(v)) : T(S).fdec_s(d, k, Tg, H.frac(n, d), H.frac(n * k, Tg), n * k, H.dec(v)) };
});

// ── Decimales ──
const noZero = (R, lo, hi) => { let x; do x = R.int(lo, hi); while (x % 10 === 0); return x; };
def("m5.decpot10", (R, S, H) => {
  const mul = R.r() < 0.5, k = R.int(1, 3);
  const kx = mul ? R.int(1, 3) : R.int(0, 3 - k), ix = kx ? noZero(R, 11, 99 * pow10(kx) + 9) : R.int(2, 999);
  const x = ix / pow10(kx), r = mul ? Math.round(ix * pow10(k) / pow10(kx) * 1e6) / 1e6 : Math.round(ix / pow10(kx + k) * 1e6) / 1e6;
  const fill = mul ? k > kx : String(Math.floor(x)).length <= k;
  return { q: T(S).dp_q(`${H.dec(x)} ${mul ? "×" : WA.H.div} ${H.n(pow10(k))}`), kind: "num", ans: r,
    sol: T(S).dp_s(mul, H.n(pow10(k)), k, fill, H.dec(x), H.dec(r)) };
});
def("m5.decmult", (R, S, H) => {
  if (R.r() < 0.3) {   // con contexto: kilos por el precio del kilo
    let k10; do k10 = R.int(3, 45); while (k10 % 10 === 0);
    const pc = 10 * R.int(8, 45), prod = k10 * pc, cost = prod / 1000, fruta = R.pick(T(S).dps_frutas);
    return { q: T(S).dm_ctx_q(H.dec(k10 / 10), fruta, eur(pc / 100, H, true)), kind: "num", ans: cost, ansHtml: H.money(cost, true),
      sol: T(S).dm_ctx_s(H.dec(k10 / 10), eur(pc / 100, H, true), k10, pc, H.n(prod), fixd(H, prod, 3), eur(cost, H, true)) };
  }
  let ia, ka, ib, kb;
  if (R.r() < 0.45) { ia = R.int(2, 9); ka = 0; kb = R.int(1, 2); ib = kb === 1 ? noZero(R, 11, 99) : noZero(R, 11, 999); }
  else { ka = 1; ia = noZero(R, 11, 99); kb = R.int(1, 2); ib = kb === 1 ? noZero(R, 2, 99) : noZero(R, 2, 99); }
  const k = ka + kb, p = ia * ib, r = p / pow10(k), a = ia / pow10(ka), b = ib / pow10(kb);
  const full = fixd(H, p, k), trim = H.dec(r);
  return { q: T(S).dm_q(`${H.dec(a)} × ${H.dec(b)}`), kind: "num", ans: Math.round(r * 1e6) / 1e6,
    sol: T(S).dm_s(H.n(ia), H.n(ib), H.n(p), H.dec(a), ka, H.dec(b), kb, k, full, trim, String(p).length <= k) };
});
// División decimal : natural paso a paso (la coma al bajar la primera cifra decimal; ceros si sobra)
function decDiv(S, H, cents, n) {
  const ip = Math.floor(cents / 100), fd = pad(cents % 100, 2).replace(/0+$/, ""), L = [];
  let q = Math.floor(ip / n), r = ip - q * n;
  L.push(T(S).dd_ent(ip, n, q, r));
  for (let i = 0; i < fd.length || r; i++) {
    const dig = i < fd.length ? +fd[i] : 0, cur = r * 10 + dig, qi = Math.floor(cur / n);
    L.push(T(S).dd_paso(i, i < fd.length, dig, cur, n, qi, cur - qi * n));
    r = cur - qi * n;
    if (i > 4) break;
  }
  return L;
}
def("m5.decprob", (R, S, H) => {
  const k = R.int(0, 2), E = x => eur(x, H, true);
  if (k === 0) { const n = R.int(2, 9), ip = R.int(30, 600), r = n * ip / 100; return { q: T(S).dpr_mul_q(n, E(ip / 100), R.pick(T(S).dpr_u)), kind: "num", ans: r, ansHtml: H.money(r, true), sol: T(S).dpr_mul_s(n, E(ip / 100), ip, H.n(n * ip), E(r)) }; }
  if (k === 1) { const ia = R.int(120, 9500), a = ia / 100, b = [5, 10, 20, 50, 100].find(x => x > a), r = (b * 100 - ia) / 100; return { q: T(S).dpr_sub_q(E(a), b), kind: "num", ans: r, ansHtml: H.money(r, true), sol: T(S).dpr_sub_s(E(a), b, E(r)) }; }
  const n = R.int(2, 8), ec = R.int(11, 250), tc = n * ec;
  return { q: T(S).dpr_div_q(H.dec(tc / 100), n), kind: "num", ans: ec / 100, sol: decDiv(S, H, tc, n).join("<br>") + "<br>" + T(S).dpr_div_s(H.dec(ec / 100)) };
});

// ── Porcentajes y proporcionalidad ──
def("m5.pcconv", (R, S, H) => {
  const t = R.int(0, 3);
  if (t === 3) { const p = R.pick([R.int(1, 19) * 5, R.int(1, 99)]), [ctx, comp] = R.pick(T(S).pcv_falta); return { q: T(S).pcv_q4(ctx, p, comp), kind: "num", ans: 100 - p, hint: T(S).hint_pct, sol: T(S).pcv_s4(comp, p, 100 - p) }; }
  if (t === 0) { const p = R.pick([5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]), g = gcd(p, 100), r = F.make(p, 100); return { q: T(S).pcv_q1(p), kind: "frac", ans: r, simplest: true, hint: T(S).hint_simp, sol: T(S).pcv_s1(p, g, H.frac(r[0], r[1])) }; }
  if (t === 1) { const c = R.int(1, 99), x = c / 100; return { q: T(S).pcv_q2(H.dec(x)), kind: "num", ans: c, hint: T(S).hint_pct, sol: T(S).pcv_s2(H.dec(x), c % 10 === 0, c) }; }
  const d = R.pick([2, 4, 5, 10, 20, 25, 50]); let n; do n = R.int(1, d - 1); while (gcd(n, d) !== 1);
  const k = 100 / d;
  return { q: T(S).pcv_q3(H.frac(n, d)), kind: "num", ans: n * k, hint: T(S).hint_pct, sol: T(S).pcv_s3(d, k, H.frac(n, d), H.frac(n * k, 100), n * k) };
});
def("m5.pcde", (R, S, H) => {
  if (R.r() < 0.3) {   // descuento: se calcula el porcentaje y se resta
    const p = R.pick([10, 20, 25, 50, 30]), c = 20 * R.int(1, 10), dsc = c * p / 100, obj = R.pick(T(S).pcd_obj);
    return { q: T(S).pcd_desc_q(obj, c, p), kind: "num", ans: c - dsc, sol: T(S).pcd_desc_s(p, c, dsc, c - dsc) };
  }
  const p = R.pick([5, 10, 20, 25, 30, 40, 50, 60, 75, 80]), c = 20 * R.int(1, 25), r = c * p / 100;
  return { q: T(S).pcd_q(p, H.n(c)), kind: "int", ans: r, sol: T(S).pcd_s(p, H.n(c), c, H.n(r)) };
});
def("m5.pcque", (R, S, H) => {
  const b = R.pick([2, 4, 5, 10, 20, 20, 25, 25, 50, 50, 200, 400, 500]);
  let a, p;
  if (b <= 50) { a = R.int(1, b - 1); p = a * 100 / b; } else { p = R.int(1, 99); a = b * p / 100; }
  const ctx = b >= 10 && R.r() < 0.5;
  return { q: !ctx ? T(S).pcq_q(H.n(a), H.n(b)) : b <= 50 ? T(S).pcq_q2(H.n(a), H.n(b)) : T(S).pcq_q3(H.n(a), H.n(b)), kind: "num", ans: p, hint: T(S).hint_pct,
    sol: b <= 100 ? T(S).pcq_s_amp(b, 100 / b, H.frac(a, b), H.frac(p, 100), p) : T(S).pcq_s_simp(b / 100, H.frac(a, b), H.frac(p, 100), p) };
});
def("m5.prop", (R, S, H) => {
  const P = R.pick(T(S).pro), a = R.int(2, 6), unit = R.pick(P.unit);
  let b; do b = R.int(P.b[0], P.b[1]); while (b === a);
  const A = Math.round(a * unit * 100) / 100, r = Math.round(b * unit * 100) / 100, f = x => P.eur ? eur(x, H) : H.dec(x);
  return Object.assign({ q: P.q(a, f(A), b), kind: "num", ans: r, sol: T(S).pro_s(f(A), a, f(unit), P.u1, b, f(r), P.u) }, P.eur ? { ansHtml: H.money(r) } : {});
});
def("m5.escala5", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) { const e = R.pick([50, 100, 200, 250, 500]), cm = R.int(2, 15), real = cm * e; return { q: T(S).e5_q0(e, cm), kind: "num", ans: real / 100, sol: T(S).e5_s0(cm, e, H.n(real), H.dec(real / 100)) }; }
  if (k === 1) { const e = R.pick([50, 100, 200, 500]), cm = R.int(2, 15), m = cm * e / 100; return { q: T(S).e5_q1(e, H.dec(m)), kind: "num", ans: cm, sol: T(S).e5_s1(H.dec(m), H.n(m * 100), e, cm) }; }
  if (k === 2) {
    const e = R.pick([25000, 50000, 100000, 200000, 500000]), cm = e === 25000 ? 4 * R.int(1, 4) : e === 50000 ? 2 * R.int(1, 7) : R.int(2, 12), real = cm * e;
    return { q: T(S).e5_q2(H.n(e), cm), kind: "num", ans: real / 100000, sol: T(S).e5_s2(cm, H.n(e), H.n(real), H.n(real / 100), H.n(real / 100000)) };
  }
  const [obj, lo, hi] = R.pick(T(S).e5_obj);
  let e, a, z; do { e = R.pick([10, 20, 25, 40, 50, 100]); a = Math.ceil(lo / e); z = Math.floor(hi / e); } while (a > z || z < 2);
  const model = R.int(Math.max(a, 2), z), real = model * e;
  return { q: T(S).e5_q3(obj, H.n(real), e), kind: "num", ans: model, sol: T(S).e5_s3(H.n(real), e, model) };
});

// ── Medida: longitud, masa y capacidad (con decimales, también al subir de unidad) ──
const MU = [["km", "hm", "dam", "m", "dm", "cm", "mm"], ["kg", "hg", "dag", "g", "dg", "cg", "mg"], ["kL", "hL", "daL", "L", "dL", "cL", "mL"]];
const MPAIRS = [[[0, 3], [3, 5], [3, 6], [5, 6], [3, 4], [4, 5]], [[0, 3], [3, 6], [0, 3], [3, 4]], [[3, 6], [3, 5], [3, 4], [3, 6]]];
def("m5.medida", (R, S, H) => {
  if (R.r() < 0.25) {
    if (R.r() < 0.3) {   // toneladas
      const down = R.r() < 0.5, v = down ? R.pick([R.int(2, 40), R.int(11, 95) / 10]) : R.pick([R.int(2, 40) * 1000, R.int(1, 9) * 1000 + R.int(1, 9) * 100]), r = down ? Math.round(v * 1000) : v / 1000;
      return { q: T(S).me_q(H.dec(v), down ? "t" : "kg", down ? "kg" : "t"), kind: "num", ans: r, sol: T(S).me_t_s(down, H.dec(v), H.dec(r)) };
    }
    // forma compleja: «2 kg 300 g» a g o a kg
    const [u1, u2, f] = R.pick(T(S).me_comp), a = R.int(1, 12), b = R.int(1, f - 1);
    if (R.r() < 0.5) return { q: T(S).me_comp_q(a, u1, b, u2, u2), kind: "num", ans: a * f + b, sol: T(S).me_comp_s1(a, u1, b, u2, H.n(f), H.n(a * f), H.n(a * f + b)) };
    const r = Math.round((a + b / f) * 1e6) / 1e6;
    return { q: T(S).me_comp_q(a, u1, b, u2, u1), kind: "num", ans: r, sol: T(S).me_comp_s2(a, u1, b, u2, H.n(f), H.dec(b / f), H.dec(r)) };
  }
  const t = R.int(0, 2), U = MU[t];
  let i, j;
  if (R.r() < 0.85) [i, j] = R.pick(MPAIRS[t]); else do { i = R.int(0, 6); j = R.int(0, 6); } while (i >= j || j - i > 3);
  const down = R.r() < 0.5, k = j - i, f = pow10(k), from = down ? U[i] : U[j], to = down ? U[j] : U[i];
  let v, r;
  if (down) { const kd = R.int(0, 2), iv = kd ? noZero(R, 2, 99) : R.int(2, 99); v = iv / pow10(kd); r = Math.round(iv * f / pow10(kd) * 1e6) / 1e6; }
  else { const iv = R.int(2, 999); v = iv; r = Math.round(iv / f * 1e6) / 1e6; }
  const chain = (down ? U.slice(i, j + 1) : U.slice(i, j + 1).reverse()).join(" → ");
  return { q: T(S).me_q(H.dec(v), from, to), kind: "num", ans: r, sol: T(S).me_s(from, to, k, down, chain, H.n(f), H.dec(v), H.dec(r)) };
});

// ── Geometría ──
def("m5.circ", (R, S, H) => {
  const [obj, lo, hi] = R.pick(T(S).ci_obj), isR = R.r() < 0.35;
  let D = R.r() < 0.5 && hi >= 40 ? 10 * R.int(Math.ceil(lo / 10), Math.floor(hi / 10)) : R.int(lo, hi);
  if (isR && D % 2) D++;
  const r0 = D / 2, L = Math.round(314 * D) / 100;
  return { q: T(S).ci_q(obj, isR ? r0 : D, isR), kind: "num", ans: L, sol: T(S).ci_s(isR, r0, D, H.dec(L)) };
});
def("m5.polados", (R, S) => {
  const n = R.int(3, 10), nm = T(S).po_n[n];
  if (R.r() < 0.6) return { q: T(S).po_q(nm), kind: "int", ans: n, sol: T(S).po_s(nm, T(S).po_pre[n], n) };
  const o = [n]; while (o.length < 4) { const x = R.int(3, 10); if (!o.includes(x)) o.push(x); }
  const sh = R.shuffle(o);
  return { q: T(S).po_q2(n), kind: "choice", opts: sh.map(x => T(S).po_n[x]), correct: sh.indexOf(n), shuffle: false, sol: T(S).po_s(nm, T(S).po_pre[n], n) };
});
const lbl5 = (x, y, s, col = C.dark, anchor = "middle") => SVG.txt(x, y, s, 13, col, anchor, "bold");
const poly5 = pts => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${C.light}" stroke="${C.blue}" stroke-width="2"/>`;
const dash5 = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.red}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
def("m5.arrect", (R, S, H) => {
  const z = R.r();
  if (z < 0.2) {   // al revés: la altura a partir del área
    const b = R.int(3, 15), h = R.int(2, 15), A = b * h;
    return { q: T(S).ar_inv_q(A, b), kind: "int", ans: h, sol: T(S).ar_inv_s(A, b, h) };
  }
  if (z < 0.4) {   // sala en forma de L: dos rectángulos (como el Ejemplo 3 de la lección)
    const W = R.int(6, 12), Hh = R.int(5, 9), w = R.int(2, W - 3), hn = R.int(2, Hh - 2), Hb = Hh - hn, Wt = W - w, A = W * Hb + Wt * hn, u = 18;
    const x0 = 50, y0 = 24, P = [[x0, y0], [x0 + Wt * u, y0], [x0 + Wt * u, y0 + hn * u], [x0 + W * u, y0 + hn * u], [x0 + W * u, y0 + Hh * u], [x0, y0 + Hh * u]];
    const pic = SVG.svg(x0 + W * u + 60, y0 + Hh * u + 34, poly5(P) + lbl5(x0 + W * u / 2, y0 + Hh * u + 22, `${W} m`) + lbl5(x0 - 6, y0 + Hh * u / 2 + 5, `${Hh} m`, C.dark, "end")
      + lbl5(x0 + Wt * u / 2, y0 - 8, `${Wt} m`) + lbl5(x0 + W * u + 6, y0 + hn * u + Hb * u / 2 + 5, `${Hb} m`, C.dark, "start"));
    return { q: T(S).ar_l_q + "<br>" + pic, kind: "int", ans: A, sol: T(S).ar_l_s(W, Hb, W * Hb, Hh, hn, Wt, Wt * hn, A) };
  }
  const sq = R.r() < 0.3, b = R.int(3, 25); let h = sq ? b : R.int(2, 18); while (!sq && h === b) h = R.int(2, 18);
  const W = 180, Hh = Math.max(40, Math.min(120, 180 * h / b));
  const pic = SVG.svg(280, 50 + Hh, poly5([[70, 20], [70 + W, 20], [70 + W, 20 + Hh], [70, 20 + Hh]]) + lbl5(70 + W / 2, 40 + Hh, `${b} cm`) + lbl5(64, 25 + Hh / 2, `${h} cm`, C.dark, "end"));
  const fig = T(S).ar_fig[sq ? 1 : 0];
  if (R.r() < 0.35) { const r = 2 * (b + h); return { q: T(S).ar_per_q(fig) + "<br>" + pic, kind: "num", ans: r, sol: T(S).ar_per_s(`${b} + ${h} + ${b} + ${h}`, r) }; }
  return { q: T(S).ar_area_q(fig) + "<br>" + pic, kind: "num", ans: b * h, sol: sq ? T(S).ar_cuad_s(b, b * b) : T(S).ar_rect_s(b, h, b * h) };
});
def("m5.artri", (R, S, H) => {
  const z = R.r();
  if (z < 0.2) {   // fachada: rectángulo + tejado triangular
    const b = R.int(4, 12), a = R.int(3, 8), t = R.int(2, 5), Ar = b * a, At = b * t / 2;
    return { q: T(S).ar_fach_q(b, a, t), kind: "num", ans: Ar + At, sol: T(S).ar_fach_s(b, a, Ar, t, b * t, H.dec(At), H.dec(Ar + At)) };
  }
  const out = z < 0.45, b = R.int(4, 24), h = R.int(3, 18), r = b * h / 2, apex = out ? R.int(255, 300) : R.int(40, 200);   // out: la altura cae fuera
  const pic = SVG.svg(out ? 365 : 260, 170, poly5([[30, 140], [230, 140], [apex, 20]]) + (out ? dash5(230, 140, apex + 12, 140) : "") + dash5(apex, 20, apex, 140) + lbl5(130, 160, `${b} cm`) + lbl5(apex + 6, 85, `${h} cm`, C.red, "start"));
  return { q: T(S).ar_area_q(T(S).ar_fig[2]) + "<br>" + pic, kind: "num", ans: r, sol: (out ? T(S).ar_fuera : "") + T(S).ar_tri_s(b, h, b * h, H.dec(r)) };
});

// ── Estadística y probabilidad ──
def("m5.sectores", (R, S) => {
  const N = R.pick([12, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120]), n = R.int(1, N - 1), g = 360 / N;
  if (R.r() < 0.3) {
    if (R.r() < 0.5) return { q: T(S).se_cada_q(N), kind: "int", ans: g, sol: T(S).se_cada_s(N, g) };
    const dep = R.pick(T(S).se_dep); return { q: T(S).se_inv_q(N, dep, n * g), kind: "int", ans: n, sol: T(S).se_inv_s(N, g, n * g, n) };
  }
  return { q: T(S).se_q(N, n, R.pick(T(S).se_dep)), kind: "int", ans: n * g, sol: T(S).se_s(N, n, g, n * g) };
});
def("m5.probab", (R, S, H) => {
  if (R.r() < 0.35) {   // imposible, posible o seguro; ¿qué color es más probable?
    const k = R.int(1, 3), cols = R.shuffle(T(S).pb_col).slice(0, 4), ns = cols.slice(0, k).map(() => R.int(1, 9));
    const list = cols.slice(0, k).map((c, j) => T(S).pb_bolas(ns[j], c)), txt = T(S).lst(list);
    const mx = Math.max(...ns);
    if (k >= 2 && R.r() < 0.4 && ns.filter(x => x === mx).length === 1) {
      const i = ns.indexOf(mx), opts = cols.slice(0, k).map(c => c[0][0].toUpperCase() + c[0].slice(1));
      return { q: T(S).pb_mas_q(txt), kind: "choice", opts, correct: i, shuffle: false, sol: T(S).pb_mas_s(cols[i][1], mx) };
    }
    const j = k === 1 ? R.pick([0, 3]) : R.r() < 0.35 ? 3 : R.int(0, k - 1), tipo = j >= k ? 0 : k === 1 ? 2 : 1;
    return { q: T(S).pb_suc_q(txt, cols[j][0]), kind: "choice", opts: T(S).pb_suc_o, correct: tipo, shuffle: false, sol: T(S).pb_suc_s[tipo](cols[j][1], ns[j], ns.reduce((a, b) => a + b, 0)) };
  }
  if (R.r() < 0.3) { const [q, fav, how] = R.pick(T(S).pb_dado), r = F.make(fav, 6); return { q: T(S).pb_q(q), kind: "frac", ans: r, sol: T(S).pb_dado_s(how, fav, H.frac(fav, 6), fr(H, r)) }; }
  const k = R.int(2, 4), cols = R.shuffle(T(S).pb_col).slice(0, k), ns = cols.map(() => R.int(1, 9));
  const tot = ns.reduce((a, b) => a + b, 0), i = R.int(0, k - 1), r = F.make(ns[i], tot);
  const list = cols.map((c, j) => T(S).pb_bolas(ns[j], c));
  return { q: T(S).pb_q(T(S).pb_urna(T(S).lst(list), cols[i][0])), kind: "frac", ans: r,
    sol: T(S).pb_s(ns.join(" + "), tot, cols[i][1], ns[i], H.frac(ns[i], tot), fr(H, r)) };
});

// ═══════════ Grado 5 · ronda de mejoras: práctica de lo nuevo de 5.º ═══════════
// (millones de 8 y 9 cifras, estimar, del trozo al total, común denominador, milésimas,
// decimal entre natural, problemas de varios pasos, medida, tiempo y ángulos, dinero,
// geometría, estadística). Todos con «×» y «:» y con los pasos de su lección.
const dig5 = (n, p) => Math.floor(n / 10 ** p) % 10;
const tipoAng = g => g < 90 ? 0 : g === 90 ? 1 : g < 180 ? 2 : 3;

// ── Los millones (8 y 9 cifras), por clases ──
function bigNum5(R) {
  const mill = R.pick([R.int(1, 9), R.int(10, 99), R.int(10, 99), R.int(100, 999)]);
  const g = () => R.pick([R.int(0, 9), R.int(10, 99), R.int(1, 9) * 100, R.int(1, 9) * 100 + R.int(1, 9), R.int(100, 999), R.int(100, 999)]);
  return mill * 1e6 + g() * 1000 + g();
}
const cls5 = n => [Math.floor(n / 1e6), Math.floor(n / 1000) % 1000, n % 1000];
const clsTxt5 = n => cls5(n).map((x, i) => i ? String(x).padStart(3, "0") : String(x)).join(" | ");
def("m5.millones", (R, S, H, L) => {
  const n = bigNum5(R), k = R.int(0, 3), g = cls5(n);
  if (k === 0) {   // valor de una cifra que sale una sola vez
    const s = String(n), ps = [];
    for (let p = 0; p < s.length; p++) { const d = dig5(n, p); if (d && s.split(String(d)).length === 2) ps.push(p); }
    if (ps.length) { const p = R.pick(ps), d = dig5(n, p), v = d * 10 ** p; return { q: T(S).mi_val_q(H.n(n), d), kind: "int", ans: v, sol: T(S).mi_val_s(clsTxt5(n), d, T(S).pos5[p], H.n(v)) }; }
  }
  const parts = g.map((x, i) => [T(S).mi_cl[i], x ? L.words(x * [1e6, 1000, 1][i]) : "", i ? String(x).padStart(3, "0") : String(x)]);
  if (k <= 1) return { q: T(S).mi_escr_q(L.words(n)), kind: "int", ans: n, sol: T(S).mi_escr_s(parts, H.n(n)) };
  if (k === 2) {   // ¿cómo se lee? Distractores: un cero de más o de menos en una clase, o «veintiuno millones»
    const w = L.words(n), alt = new Set();
    const mal = w.replace(/veintiún millones/, "veintiuno millones").replace(/ y un millones/, " y uno millones").replace(/^un millón/, "uno millón");
    if (mal !== w) alt.add(mal);
    [1, 2].forEach(i => { const x = g[i]; const put = y => { if (y < 1000 && y !== x) alt.add(L.words(g.map((v, j) => j === i ? y : v).reduce((a, b) => a * 1000 + b, 0))); }; if (x && x * 10 < 1000) put(x * 10); if (x && x % 10 === 0) put(x / 10); });
    [n + 1e6, n + 10000, n - 100000].filter(y => y > 1e6).forEach(y => alt.add(L.words(y)));
    alt.delete(w);
    alt.delete(mal);
    const opts = R.shuffle([w, ...(mal !== w ? [mal] : []), ...R.shuffle([...alt]).slice(0, mal !== w ? 2 : 3)]);
    return { q: T(S).mi_leer_q(H.n(n)), kind: "choice", opts, correct: opts.indexOf(w), sol: T(S).mi_leer_s(clsTxt5(n), parts, w, mal !== w) };
  }
  // comparar: con distinto número de cifras o con las mismas y una clase cambiada
  let a = n, b;
  if (R.r() < 0.35) { const m = String(n).length; b = R.int(10 ** (m - 2), 10 ** (m - 1) - 1); if (R.r() < 0.6) b = 10 ** (m - 1) - R.int(1, 99999); }
  else {
    const j = R.int(0, 2), d = j ? String(g[j]).padStart(3, "0") : String(g[0]), len = d.length;
    let y, k = 0; do { y = R.r() < 0.6 ? +R.shuffle(d.split("")).join("") : j ? R.int(0, 999) : R.int(10 ** (len - 1), 10 ** len - 1); k++; } while ((y === g[j] || (j === 0 && String(y).length !== len)) && k < 50);
    if (y === g[j] || (j === 0 && String(y).length !== len)) y = j ? (g[j] + 1) % 1000 : g[0] + (g[0] < 10 ** len - 1 ? 1 : -1);
    b = g.map((v, i) => i === j ? y : v).reduce((p, q) => p * 1000 + q, 0);
  }
  if (R.r() < 0.5) [a, b] = [b, a];
  const la = String(a).length, lb = String(b).length, gt = a > b, res = `${H.n(a)} ${gt ? "&gt;" : "&lt;"} ${H.n(b)}`;
  let sol;
  if (la !== lb) sol = T(S).mi_cmp_len(H.n(a), la, H.n(b), lb, res);
  else { let p = la - 1; while (dig5(a, p) === dig5(b, p)) p--; sol = T(S).mi_cmp_dig(T(S).pos5[p], dig5(a, p), dig5(b, p), res); }
  return { q: T(S).fc_q(H.n(a), H.n(b)), kind: "choice", opts: ["&lt;", "&gt;"], correct: gt ? 1 : 0, shuffle: false, sol };
});

// ── Estimar sumas, restas, productos y divisiones ──
def("m5.estimar", (R, S, H) => {
  const t = R.int(0, 2);
  if (t === 0) {
    const p = R.pick([3, 4]), f = 10 ** p, rnd = x => Math.round(x / f) * f, minus = R.r() < 0.5;
    let a, b;
    do { a = R.int(10 * f, 999 * f); b = minus ? R.int(2 * f, a - 2 * f) : R.int(10 * f, 999 * f); } while (a % f === 0 || b % f === 0 || (minus && rnd(a) <= rnd(b)));
    const ra = rnd(a), rb = rnd(b), r = minus ? ra - rb : ra + rb, ex = minus ? a - b : a + b, op = minus ? "−" : "+";
    return { q: T(S).es_q(`${H.n(a)} ${op} ${H.n(b)}`, T(S).es_pl[p]), kind: "int", ans: r,
      sol: T(S).es_s(T(S).es_pl[p], T(S).pos5[p - 1], H.n(a), H.n(ra), H.n(b), H.n(rb), `${H.n(ra)} ${op} ${H.n(rb)}`, H.n(r), H.n(ex), Math.abs(r - ex) <= 0.1 * ex) };
  }
  if (t === 1) {
    let a, b; do { a = R.int(11, 98); b = R.int(11, 98); } while (a % 10 === 0 || b % 10 === 0 || a % 10 === 5 || b % 10 === 5);
    const ra = Math.round(a / 10) * 10, rb = Math.round(b / 10) * 10, r = ra * rb, ctx = R.r() < 0.5 ? R.pick(T(S).es_ctx) : null;
    return { q: ctx ? ctx(a, b) : T(S).es_q(`${a} × ${b}`, T(S).es_pl[1]), kind: "int", ans: r, sol: T(S).es_mul_s(a, ra, b, rb, ra / 10, rb / 10, H.n(ra * rb / 100), H.n(r), H.n(a * b)) };
  }
  let d, q, D, rd, m;
  do { d = R.int(12, 89); q = R.int(6, 60); D = d * q + R.int(0, d - 1); rd = Math.round(d / 10) * 10; m = Math.round(D / rd) * rd; }
  while (d % 10 === 0 || d % 10 === 5 || D % rd === rd / 2 || m < 2 * rd || D < 100);
  return { q: T(S).es_div_q(H.n(D), d), kind: "int", ans: m / rd, sol: T(S).es_div_s(d, rd, H.n(D), H.n(m), m / rd, Math.floor(D / d), D % d) };
});

// ── Fracción de una cantidad: del trozo al total y lo que queda ──
def("m5.frtotal", (R, S, H) => {
  const [n, d] = prop5(R, [3, 4, 5, 6, 7, 8, 9, 10, 12]), u = R.int(2, 15), t = R.r();
  const fh = H.frac(n, d), nm = T(S).ft_nom[d];
  if (t < 0.5) {
    const C = R.pick(T(S).ft_tot), part = n * u, tot = d * u;
    return { q: C.q(fh, part), kind: "int", ans: tot, sol: T(S).ft_tot_s(n, nm, part, u, d, tot, C.u) };
  }
  const C = R.pick(T(S).ft_queda), tot = d * u, used = n * u;
  return { q: C.q(fh, tot), kind: "int", ans: tot - used, sol: T(S).ft_queda_s(tot, d, u, nm, n, used, tot - used, H.frac(d - n, d), C.u) };
});

// ── Reducir a común denominador y ordenar ──
def("m5.comun", (R, S, H) => {
  if (R.r() < 0.6) {
    let a, b; do { a = prop5(R); b = prop5(R); } while (a[1] === b[1] || lcm(a[1], b[1]) > 36);
    const m = lcm(a[1], b[1]), ka = m / a[1], kb = m / b[1];
    const eq = (f, k) => k === 1 ? T(S).fc_ya(H.frac(f[0], f[1]), m) : `${H.frac(f[0], f[1])} = ${H.frac(f[0] * k, m)} ${T(S).fc_por(k)}`;
    return { q: T(S).cm_q(H.frac(a[0], a[1]), H.frac(b[0], b[1])), kind: "fields",
      fields: [{ label: T(S).cm_f[0], ans: m }, { label: T(S).cm_f[1](`${a[0]}/${a[1]}`), ans: a[0] * ka }, { label: T(S).cm_f[1](`${b[0]}/${b[1]}`), ans: b[0] * kb }],
      sol: T(S).cm_s(a[1], mults(a[1], m), b[1], mults(b[1], m), m, eq(a, ka), eq(b, kb)) };
  }
  let fs, m;
  do { fs = [0, 1, 2].map(() => prop5(R, [2, 3, 4, 6, 8, 12])); m = fs.reduce((x, f) => lcm(x, f[1]), 1); }
  while (m > 24 || new Set(fs.map(f => f[0] * 24 / f[1])).size < 3 || new Set(fs.map(f => f[1])).size < 3);
  const ord = fs.slice().sort((x, y) => x[0] * y[1] - y[0] * x[1]), fh = f => H.frac(f[0], f[1]);
  const txt = arr => arr.map(fh).join(" &lt; ");
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(p => p.map(i => ord[i]));
  const wrong = R.shuffle(perms.slice(1)).slice(0, 3), opts = R.shuffle([ord, ...wrong]);
  return { q: T(S).cm_ord_q(fs.map(fh).join(", ")), kind: "choice", opts: opts.map(txt), correct: opts.indexOf(ord), shuffle: false,
    sol: T(S).cm_ord_s(m, fs.map(f => f[1] === m ? T(S).fc_ya(fh(f), m) : `${fh(f)} = ${H.frac(f[0] * m / f[1], m)}`).join(", "), ord.map(f => f[0] * m / f[1]).join(" &lt; "), txt(ord)) };
});

// ── Décimas, centésimas y milésimas ──
def("m5.milesimas", (R, S, H) => {
  const t = R.int(0, 3);
  if (t === 0) {
    for (let k = 0; k < 20; k++) {
      const x = R.int(1001, 99999), s = String(x).padStart(4, "0"), dd = [dig5(x, 2), dig5(x, 1), dig5(x, 0)];
      const ps = [0, 1, 2].filter(i => dd[i] && s.split(String(dd[i])).length === 2);
      if (!ps.length) continue;
      const i = R.pick(ps), dg = dd[i], v = x / 1000;
      return { q: T(S).ml_val_q(H.dec(v), dg), kind: "choice", opts: T(S).ml_val_o(dg), correct: i, shuffle: false,
        sol: T(S).ml_val_s(dd, dg, i, H.dec(dg / [10, 100, 1000][i])) };
    }
  }
  if (t <= 1) {
    const u = R.r() < 0.3 ? 0 : R.int(1, 30), m = R.pick([R.int(1, 9), R.int(10, 99), R.int(10, 99), R.int(101, 999)]), v = u + m / 1000;
    return { q: T(S).ml_esc_q(u, m), kind: "num", ans: v, sol: T(S).ml_esc_s(m, pad(m, 3), u, H.dec(v)) };
  }
  if (t === 2) {
    const v = R.pick([R.int(1, 9) / 10, R.int(1, 99) / 100, R.int(11, 99) / 10, R.int(1, 9) + R.int(1, 99) / 100]), r = Math.round(v * 1000);
    return { q: T(S).ml_cuantas_q(H.dec(v)), kind: "int", ans: r, sol: T(S).ml_cuantas_s(H.dec(v), fixd(H, r, 3), H.n(r)) };
  }
  // comparar con trampa: más cifras no es más grande (y, a veces, iguales con un cero de más)
  const e = R.int(0, 9), eqc = R.r() < 0.12, a3 = R.int(1, 99) * 10 + (eqc || R.r() < 0.5 ? 0 : R.int(1, 9));
  let b3; do b3 = R.int(1, 999); while (b3 === a3 || String(a3).replace(/0+$/, "").length === String(b3).replace(/0+$/, "").length && R.r() < 0.7);
  const IA = e * 1000 + a3, IB = eqc ? IA : e * 1000 + b3, As = H.dec(IA / 1000), Bs = eqc ? fixd(H, IB, 3) : H.dec(IB / 1000);
  const sg = IA > IB ? "&gt;" : IA < IB ? "&lt;" : "=", res = `${As} ${sg} ${Bs}`;
  return { q: T(S).fc_q(As, Bs), kind: "choice", opts: ["&lt;", "=", "&gt;"], correct: IA < IB ? 0 : IA === IB ? 1 : 2, shuffle: false,
    sol: T(S).ml_cmp_s(fixd(H, IA, 3), fixd(H, IB, 3), res, IA !== IB && (IA > IB ? b3 : a3) % 10 !== 0 && (IA > IB ? a3 : b3) % 10 === 0) };
});

// ── Dividir un decimal entre un natural (también entre dos cifras) ──
def("m5.decdiv", (R, S, H) => {
  const t = R.int(0, 3);
  let n, qm, D;
  do {
    n = t === 3 ? R.int(12, 25) : R.int(2, 9);
    qm = t === 1 ? R.int(101, 999) : t === 3 ? R.int(1100, 9999) : R.int(1100, 25000);
    D = n * qm;
  } while (D % 10 || qm % 1000 === 0 || (t === 2 && qm % 10 === 0) || (t === 0 && qm % 10 !== 0) || D / 1000 >= 300);
  const cents = D / 10, q = qm / 1000, Dv = cents / 100, euro = qm % 10 === 0 && q < 3 && R.r() < 0.5;
  const steps = decDiv(S, H, cents, n).join("<br>");
  if (euro) { const u = R.pick(T(S).dd_u); return { q: T(S).dd_eur_q(n, u, eur(Dv, H, true)), kind: "num", ans: q, ansHtml: H.money(q, true), sol: steps + "<br>" + T(S).dd_fin(n, H.money(q, true), H.money(Dv, true)) }; }
  return { q: T(S).dd_q(H.dec(Dv), n), kind: "num", ans: q, sol: steps + "<br>" + T(S).dd_fin(n, H.dec(q), H.dec(Dv)) };
});

// ── Problemas de dos o tres pasos con decimales ──
def("m5.decpasos", (R, S, H) => {
  const t = R.int(0, 3), E = x => eur(x, H, true), c2 = x => Math.round(x * 100) / 100;
  if (t === 0) {
    const n = R.int(2, 6), p = R.int(45, 395) / 100, q = R.int(80, 950) / 100, a = c2(n * p), tot = c2(a + q), B = [5, 10, 20, 50].find(x => x > tot), r = c2(B - tot);
    const [u, obj] = R.pick(T(S).dps_cosas);
    return { q: T(S).dps0_q(n, u, E(p), obj, E(q), B), kind: "num", ans: r, ansHtml: H.money(r, true), sol: T(S).dps0_s(n, u, E(p), E(a), E(q), E(tot), B, E(r)) };
  }
  if (t === 1) {
    const a = R.int(500, 4000) / 100, b = R.int(50, 1500) / 100, l = c2(a + b), s = c2(a + l), [p1, p2] = R.pick(T(S).dps_nombres);
    return { q: T(S).dps1_q(p1, E(a), p2, E(b)), kind: "num", ans: s, ansHtml: H.money(s, true), sol: T(S).dps1_s(p1, E(a), p2, E(b), E(l), E(s)) };
  }
  if (t === 2) {
    const k = R.pick([0.5, 1.5, 2.5, 3.5, 1.2, 0.8, 1.4]), p = R.int(8, 45) / 10, cost = c2(k * p), B = [5, 10, 20].find(x => x > cost), r = c2(B - cost), fr0 = R.pick(T(S).dps_frutas);
    return { q: T(S).dps2_q(H.dec(k), fr0, E(p), B), kind: "num", ans: r, ansHtml: H.money(r, true), sol: T(S).dps2_s(H.dec(k), E(p), Math.round(k * 10), Math.round(p * 100), H.n(Math.round(k * 10) * Math.round(p * 100)), E(cost), B, E(r)) };
  }
  const n = R.int(2, 6), x = R.int(150, 900) / 100, T0 = c2(n * x), q = R.int(50, 250) / 100, r = c2(x + q), obj = R.pick(T(S).dps_regalos);
  return { q: T(S).dps3_q(n, obj, E(T0), E(q)), kind: "num", ans: r, ansHtml: H.money(r, true), sol: T(S).dps3_s(obj, E(T0), n, E(x), E(q), E(r)) };
});

// ── Superficie para 5.º: sobre todo m², dm², cm² y km² ──
const SUP5 = [[3, 4], [3, 4], [4, 5], [4, 5], [3, 5], [0, 3], [1, 3], [0, 1]];
def("m5.sup5", (R, S, H) => {
  const [i, j] = R.pick(SUP5), k = j - i, f = 100 ** k;
  const down = i === 0 && j === 3 ? true : R.r() < 0.5;
  let v, r;
  if (down) { const dec1 = k === 1 && R.r() < 0.3; v = dec1 ? R.int(11, 99) / 10 : R.int(2, k === 3 ? 9 : 60); r = Math.round(v * f * 1e6) / 1e6; }
  else { v = k === 1 && R.r() < 0.4 ? R.int(101, 999) : R.int(1, 60) * f; r = Math.round(v / f * 1e6) / 1e6; }
  const from = down ? SU[i] : SU[j], to = down ? SU[j] : SU[i];
  return { q: S.m5.sup_q(H.dec(v), from, to), kind: "num", ans: r, sol: T(S).s5_s(from, to, k, down, H.n(f), H.dec(v), H.dec(r)) };
});

// ── Duraciones contando por saltos, y horas ↔ minutos ──
def("m5.duracion", (R, S, H) => {
  const hm5 = H.time;   // 19:18 (es) · 7:18 p.m. (en)
  if (R.r() < 0.7) {
    let h1, m1, D, h2, m2;
    do { h1 = R.int(7, 19); m1 = R.int(1, 59); D = R.int(65, 290); const e = h1 * 60 + m1 + D; h2 = Math.floor(e / 60); m2 = e % 60; } while (h2 > 23 || h2 <= h1 + 0 || m2 === 0 || m1 % 5 === 0 && R.r() < 0.5);
    const a = 60 - m1, hh = h2 - h1 - 1, sum = a + m2, H2 = hh + Math.floor(sum / 60), M2 = sum % 60;
    const ctx = R.pick(T(S).du_ctx);
    return { q: ctx(hm5(h1, m1), hm5(h2, m2)), kind: "fields", fields: [{ label: T(S).du_f[0], ans: H2 }, { label: T(S).du_f[1], ans: M2 }],
      sol: T(S).du_s(hm5(h1, m1), hm5(h1 + 1, 0), a, hm5(h2, 0), hh, hm5(h2, m2), m2, sum, H2, M2) };
  }
  if (R.r() < 0.5) { const h = R.int(1, 6), m = R.int(5, 55); return { q: T(S).du_min_q(h, m), kind: "int", ans: h * 60 + m, sol: T(S).du_min_s(h, m, h * 60, h * 60 + m) }; }
  const M = R.int(65, 400); return { q: T(S).du_hm_q(M), kind: "fields", fields: [{ label: T(S).du_f[0], ans: Math.floor(M / 60) }, { label: T(S).du_f[1], ans: M % 60 }], sol: T(S).du_hm_s(M, Math.floor(M / 60), M % 60) };
});

// ── Grados, minutos y segundos de ángulo ──
def("m5.sexag", (R, S) => {
  const t = R.int(0, 3);
  if (t === 0) { const g = R.int(2, 15); return { q: T(S).sx0_q(g), kind: "int", ans: g * 60, sol: T(S).sx0_s(g, g * 60) }; }
  if (t === 1) { let M; do M = R.int(61, 600); while (M % 60 === 0); return { q: T(S).sx1_q(M), kind: "fields", fields: [{ label: T(S).sx_f[0], ans: Math.floor(M / 60) }, { label: T(S).sx_f[1], ans: M % 60 }], sol: T(S).sx1_s(M, Math.floor(M / 60), M % 60) }; }
  if (t === 2) { const a = R.int(1, 9), b = R.int(1, 59); return { q: T(S).sx2_q(a, b), kind: "int", ans: a * 60 + b, sol: T(S).sx2_s(a, b, a * 60, a * 60 + b) }; }
  const g = R.int(1, 12), m = R.int(5, 55); return { q: T(S).sx3_q(g, m), kind: "int", ans: g * 60 + m, sol: T(S).sx3_s(g, m, g * 60, g * 60 + m) };
});

// ── Dinero: precio por unidad, qué pack sale más barato y planes de ahorro ──
def("m5.dinero", (R, S, H) => {
  const t = R.int(0, 2), E = x => eur(x, H, true);
  if (t === 0) {
    let n1, n2, u1, u2; do { n1 = R.pick([2, 3, 4, 5, 6, 8, 10, 12]); n2 = R.pick([2, 3, 4, 5, 6, 8, 10, 12]); u1 = 5 * R.int(3, 40); u2 = 5 * R.int(3, 40); } while (n1 === n2 || u1 === u2 || Math.abs(u1 - u2) > 30 || (n1 - n2) * (n1 * u1 - n2 * u2) <= 0);
    const [pl] = R.pick(T(S).din_prod), P1 = n1 * u1 / 100, P2 = n2 * u2 / 100, best = u1 < u2 ? 0 : 1;
    return { q: T(S).din_pack_q(n1, E(P1), n2, E(P2), pl), kind: "choice", opts: [T(S).din_el(n1), T(S).din_el(n2)], correct: best, shuffle: false,
      sol: T(S).din_pack_s(E(P1), n1, E(u1 / 100), E(P2), n2, E(u2 / 100), [n1, n2][best], E(Math.abs(u1 - u2) / 100)) };
  }
  if (t === 1) {
    const A = R.pick([2, 3, 4, 5, 1.5, 2.5]), half = A % 1 !== 0, w = half ? 2 * R.int(2, 8) : R.int(3, 15), F0 = A * w, T0 = R.int(1, 8), P = F0 + T0, obj = R.pick(T(S).din_obj);
    return { q: T(S).din_ah_q(obj, P, T0, half ? E(A) : String(A)), kind: "int", ans: w, sol: half ? T(S).din_ah_s2(P, T0, F0, E(A), String(2 * A), F0 / (2 * A), w) : T(S).din_ah_s(P, T0, F0, A, w) };
  }
  const [pl] = R.pick(T(S).din_prod), n = R.pick([2, 3, 4, 5, 6, 8]), u = 5 * R.int(3, 60), P = n * u / 100;
  return { q: T(S).din_u_q(n, pl, E(P)), kind: "num", ans: u / 100, ansHtml: H.money(u / 100, true), sol: decDiv(S, H, n * u, n).join("<br>") + "<br>" + T(S).dd_fin(n, H.money(u / 100, true), H.money(P, true)) };
});

// ── Ángulos: el reloj y el transportador de dos filas ──
function clock5(h) {
  const cx = 65, cy = 65, r = 58, a = h * Math.PI / 6;
  let b = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.dark}" stroke-width="3"/>`;
  for (let i = 1; i <= 12; i++) { const t = i * Math.PI / 6; b += `<line x1="${cx + (r - 8) * Math.sin(t)}" y1="${cy - (r - 8) * Math.cos(t)}" x2="${cx + (r - 2) * Math.sin(t)}" y2="${cy - (r - 2) * Math.cos(t)}" stroke="${C.dark}" stroke-width="2"/>` + SVG.txt(cx + (r - 18) * Math.sin(t), cy - (r - 18) * Math.cos(t) + 4, i, 11, C.dark); }
  b += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 12}" stroke="${C.blue}" stroke-width="3"/><line x1="${cx}" y1="${cy}" x2="${cx + 32 * Math.sin(a)}" y2="${cy - 32 * Math.cos(a)}" stroke="${C.red}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="4" fill="${C.dark}"/>`;
  return SVG.svg(130, 130, b);
}
def("m5.reloj", (R, S) => {
  if (R.r() < 0.25) { const m = R.pick([5, 10, 15, 20, 25, 30, 40, 45, 50]); return { q: T(S).rl_min_q(m), kind: "int", ans: m * 6, sol: T(S).rl_min_s(m, m * 6) }; }
  const h = R.int(1, 11), s = Math.min(h, 12 - h), g = 30 * s, pic = R.r() < 0.5;
  return { q: T(S).rl_q(h) + (pic ? "<br>" + clock5(h) : ""), kind: "int", ans: g, sol: T(S).rl_s(h, s, g, h > 6, T(S).tipo[tipoAng(g)]) };
});
function protr5(a) {
  const cx = 150, cy = 150, r = 120;
  let b = `<path d="M${cx - r},${cy} A${r},${r} 0 0,1 ${cx + r},${cy} Z" fill="#eaf3ff" stroke="${C.blue}" stroke-width="1.5"/>`;
  for (let g = 0; g <= 180; g += 5) {
    const t = g * Math.PI / 180, L = g % 10 ? 7 : 12;
    b += `<line x1="${cx + r * Math.cos(t)}" y1="${cy - r * Math.sin(t)}" x2="${cx + (r - L) * Math.cos(t)}" y2="${cy - (r - L) * Math.sin(t)}" stroke="${C.dark}" stroke-width="${g % 10 ? 0.8 : 1.3}"/>`;
    if (g % 10 === 0) {
      const up = g === 0 || g === 180 ? 8 : 0;
      b += SVG.txt(cx + (r + 13) * Math.cos(t), cy - (r + 13) * Math.sin(t) + 4 - up, g, 10, C.dark) + SVG.txt(cx + (r - 24) * Math.cos(t), cy - (r - 24) * Math.sin(t) + 3 - up, 180 - g, 8, C.grey);
    }
  }
  const t = a * Math.PI / 180;
  b += `<line x1="${cx}" y1="${cy}" x2="${cx + r + 22}" y2="${cy}" stroke="${C.dark}" stroke-width="2.5"/><line x1="${cx}" y1="${cy}" x2="${cx + (r + 22) * Math.cos(t)}" y2="${cy - (r + 22) * Math.sin(t)}" stroke="${C.red}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="none" stroke="${C.dark}" stroke-width="1.4"/>`;
  return SVG.svg(310, 165, b);
}
def("m5.angmedir", (R, S) => {
  let a; do a = 5 * R.int(3, 33); while (a === 90);
  const o = [a, 180 - a]; for (const x of R.shuffle([a + 10, a - 10, a + 5, a - 5])) if (o.length < 4 && x > 0 && x < 180 && !o.includes(x)) o.push(x);
  const opts = R.shuffle(o);
  return { q: T(S).am_q + "<br>" + protr5(a), kind: "choice", opts: opts.map(x => x + "°"), correct: opts.indexOf(a), shuffle: false, sol: T(S).am_s(a, 180 - a, T(S).tipo[tipoAng(a)], a < 90) };
});

// ── Polígonos regulares: perímetro, lado y ángulo central ──
def("m5.regular", (R, S, H) => {
  const t = R.int(0, 2);
  if (t === 2) { const n = R.pick([3, 4, 5, 6, 8, 9, 10]); return { q: T(S).rg_ang_q(T(S).rg_nom(n)), kind: "int", ans: 360 / n, sol: T(S).rg_ang_s(n, 360 / n) }; }
  const n = R.int(3, 10), nm = T(S).rg_nom(n);
  if (t === 0) { const L = R.r() < 0.3 ? R.int(11, 95) / 10 : R.int(2, 40), P = Math.round(n * L * 10) / 10; return { q: T(S).rg_per_q(nm, H.dec(L)), kind: "num", ans: P, sol: T(S).rg_per_s(n, H.dec(L), H.dec(P)) }; }
  const L = R.int(2, 30), P = n * L; return { q: T(S).rg_lado_q(nm, P), kind: "int", ans: L, sol: T(S).rg_lado_s(n, P, L) };
});

// ── ¿Cuántos ejes de simetría? ──
def("m5.ejes", (R, S) => {
  if (R.r() < 0.35) { const n = R.int(3, 12); return { q: T(S).ej_reg_q(n), kind: "int", ans: n, sol: T(S).ej_reg_s(n) }; }
  const [nm, k, why] = R.pick(T(S).ej_figs);
  return { q: T(S).ej_q(nm), kind: "int", ans: k, sol: T(S).ej_s(nm, k, why) };
});

// ── Prismas y pirámides: caras, aristas, vértices y desarrollo ──
def("m5.poliedros", (R, S) => {
  const n = R.int(3, 8), pir = R.r() < 0.5, adj = T(S).pl_adj[n], nm = T(S).pl_nom(pir, adj);
  if (R.r() < 0.25) {
    const pol = T(S).pl_pol[n], ok = pir ? T(S).pl_des_pir(pol, n) : T(S).pl_des_pri(pol, n);
    const alts = [pir ? T(S).pl_des_pri(pol, n) : T(S).pl_des_pir(pol, n), pir ? T(S).pl_des_pir(pol, n + 1) : T(S).pl_des_pri(pol, n + 1), pir ? T(S).pl_des_pir2(pol, n) : T(S).pl_des_pri1(pol, n)];
    const opts = R.shuffle([ok, ...alts]);
    return { q: T(S).pl_des_q(nm), kind: "choice", opts, correct: opts.indexOf(ok), shuffle: false, sol: T(S).pl_des_s(nm, ok, pir) };
  }
  const w = R.int(0, 2), vals = pir ? [n + 1, 2 * n, n + 1] : [n + 2, 3 * n, 2 * n];
  return { q: T(S).pl_q(nm, T(S).pl_que[w]), kind: "int", ans: vals[w], sol: T(S).pl_s(n, pir, w, vals[w]) };
});

// ── Mediana (impar y par, con los dos centrales) y moda (también de datos que no son números) ──
def("m5.mediana", (R, S, H) => {
  const t = R.int(0, 3);
  if (t === 3) {
    const opts = R.shuffle(T(S).md_dep).slice(0, 4); let c; do c = opts.map(() => R.int(2, 12)); while (c.filter(x => x === Math.max(...c)).length > 1);
    const i = c.indexOf(Math.max(...c));
    return { q: T(S).md_mq(opts.map((o, j) => `${o}: ${c[j]}`).join(", ")), kind: "choice", opts, correct: i, shuffle: false, sol: T(S).md_ms(opts[i], c[i]) };
  }
  const [ctx, lo, hi, u] = R.pick(T(S).md_ctx);
  if (t === 2) {
    let xs; do xs = Array.from({ length: R.int(6, 9) }, () => R.int(lo, Math.min(hi, lo + 7))); while ((() => { const f = {}; xs.forEach(x => f[x] = (f[x] || 0) + 1); const mx = Math.max(...Object.values(f)); return mx < 2 || Object.values(f).filter(v => v === mx).length > 1; })());
    const f = {}; xs.forEach(x => f[x] = (f[x] || 0) + 1); const mo = +Object.keys(f).find(k => f[k] === Math.max(...Object.values(f)));
    return { q: T(S).md_q(ctx, xs.join(", "), T(S).md_que[1]), kind: "int", ans: mo, sol: T(S).md_mod_s(Object.keys(f).map(Number).sort((a, b) => a - b).map(k => `${k} (${f[k]})`).join(", "), mo, f[mo], u) };
  }
  const n = t === 0 ? R.pick([5, 7, 9]) : R.pick([4, 6, 8]);
  const xs = Array.from({ length: n }, () => R.int(lo, hi)), o = xs.slice().sort((a, b) => a - b);
  if (t === 0) { const k = (n - 1) / 2; return { q: T(S).md_q(ctx, xs.join(", "), T(S).md_que[0]), kind: "int", ans: o[k], sol: T(S).md_imp_s(o.map((x, j) => j === k ? `<b>${x}</b>` : x).join(", "), n, k + 1, o[k], u) }; }
  const k = n / 2, a = o[k - 1], b = o[k], m = (a + b) / 2;
  return { q: T(S).md_q(ctx, xs.join(", "), T(S).md_que[0]), kind: "num", ans: m, sol: T(S).md_par_s(o.map((x, j) => j === k - 1 || j === k ? `<b>${x}</b>` : x).join(", "), n, k, a, b, a + b, H.dec(m), u) };
});

// ═══════════ Grado 5 · lecciones nuevas (2026-11-10): patrones, algoritmos y coordenadas ═══════════
const pt5 = (x, y) => `(${x}, ${y})`;

// ── Patrones y relaciones (mat5.u1.patrones): series, tablas con regla, patrones que se repiten e igualdades con hueco ──
// Tabla de dos filas: rows = [[rótulo, v1, v2…], [rótulo, …]]; el «?» va en rojo
function tabla5(rows) {
  const lw = Math.max(...rows.map(r => String(r[0]).length)) * 7.6 + 18, cw = 48, rh = 32, n = rows[0].length - 1;
  let b = "";
  rows.forEach((r, i) => {
    const y = 6 + i * rh;
    b += `<rect x="6" y="${y}" width="${lw}" height="${rh}" fill="${i ? "#e7f5ef" : C.light}" stroke="${C.dark}"/>` + SVG.txt(6 + lw / 2, y + 21, r[0], 13, C.dark, "middle", "bold");
    r.slice(1).forEach((v, j) => {
      const x = 6 + lw + j * cw, q = v === "?";
      b += `<rect x="${x}" y="${y}" width="${cw}" height="${rh}" fill="${q ? "#fde2e2" : "#fff"}" stroke="${C.dark}"/>` + SVG.txt(x + cw / 2, y + 21, v, 14, q ? C.red : C.dark, "middle", q ? "bold" : "normal");
    });
  });
  return SVG.svg(12 + lw + n * cw, 12 + 2 * rh, b);
}
// Pulsera: las n primeras cuentas de un patrón que se repite (índices de COL5), numeradas
const COL5 = [C.red, C.blue, C.green, C.amber, C.purple];
function cuentas5(pat, n) {
  const gap = 32;
  let b = `<line x1="6" y1="22" x2="${20 + (n - 1) * gap + 18}" y2="22" stroke="${C.grey}" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) b += `<circle cx="${20 + i * gap}" cy="22" r="13" fill="${COL5[pat[i % pat.length]]}" stroke="${C.dark}"/>` + SVG.txt(20 + i * gap, 52, i + 1, 11, C.dark);
  b += SVG.txt(22 + (n - 1) * gap + 22, 28, "…", 18, C.dark, "start", "bold");
  return SVG.svg(20 + (n - 1) * gap + 52, 60, b);
}
def("m5.patron", (R, S, H) => {
  const t = R.int(0, 6);
  if (t === 0) {   // series cuyo salto crece, o los cuadrados perfectos
    if (R.r() < 0.3) {
      const a = R.int(2, 8), s = [0, 1, 2, 3].map(i => (a + i) * (a + i)), n = a + 4;
      return { q: T(S).pt_sig_q(s.join(", ")), kind: "int", ans: n * n,
        sol: T(S).pt_cuad_s(s.map((v, i) => `${v} = ${a + i} × ${a + i}`).join(", "), s.slice(1).map((v, i) => "+" + (v - s[i])).join(", "), n, n * n) };
    }
    const a0 = R.int(1, 30), d0 = R.int(1, 6), k = R.pick([1, 1, 2]), s = [a0];
    for (let i = 0; i < 5; i++) s.push(s[i] + d0 + i * k);
    const J = s.slice(1).map((v, i) => v - s[i]);   // los saltos: d0, d0 + k, d0 + 2k…
    if (R.r() < 0.45) {   // falta uno de en medio (se ven al menos dos saltos antes)
      const j = R.pick([3, 4]);
      return { q: T(S).pt_falta_q(s.map((v, i) => i === j ? "□" : v).join(", ")), kind: "int", ans: s[j],
        sol: T(S).pt_falta_s(J.slice(0, j - 1).map(x => "+" + x).join(", "), k, T(S).lst([`+${J[j - 1]}`, `+${J[j]}`]), s[j - 1], J[j - 1], s[j], J[j], s[j + 1]) };
    }
    return { q: T(S).pt_sig_q(s.slice(0, 5).join(", ")), kind: "int", ans: s[5], sol: T(S).pt_crece_s(J.slice(0, 4).map(x => "+" + x).join(", "), k, J[4], s[4], s[5]) };
  }
  if (t <= 3) {   // tabla con una regla (× k o + k): el número que falta, al revés o cuál es la regla
    const mul = R.r() < 0.6, c = R.pick(mul ? T(S).pt_mul : T(S).pt_mas), a = c[0], b = c[1], k = c[2] || (mul ? R.int(3, 12) : R.int(2, 15));
    const x0 = mul ? R.pick([1, 1, 2]) : R.int(1, 9), xs = [0, 1, 2, 3].map(i => x0 + i), f = x => mul ? x * k : x + k;
    const rule = T(S).pt_regla(mul, k), pairs = xs.slice(0, 3).map(x => `${x} → ${f(x)}`).join(", ");
    if (t === 3) {
      const y0 = f(x0), alts = [];
      if (mul && y0 > x0) alts.push(T(S).pt_regla(false, y0 - x0));   // la trampa: solo vale en la primera columna
      if (!mul && y0 % x0 === 0 && y0 / x0 >= 2) alts.push(T(S).pt_regla(true, y0 / x0));
      const trap = alts[0];
      alts.push(T(S).pt_regla(mul, k + 1), T(S).pt_regla(!mul, k), T(S).pt_regla(mul, k + 2), T(S).pt_regla(true, 2));
      const opts = [rule];
      for (const o of alts) if (opts.length < 4 && !opts.includes(o)) opts.push(o);
      const sh = R.shuffle(opts);
      return { q: T(S).pt_regla_q(tabla5([[a, ...xs.slice(0, 3)], [b, ...xs.slice(0, 3).map(f)]])), kind: "choice", opts: sh, correct: sh.indexOf(rule), shuffle: false,
        sol: T(S).pt_regla_s(pairs, rule, trap) };
    }
    const N = mul ? R.int(10, k > 9 ? 25 : 40) : R.int(15, 60), M = f(N), top = [a, ...xs, "…"], bot = [b, ...xs.map(f), "…"];
    if (t === 1) return { q: T(S).pt_tab_q(tabla5([[...top, N], [...bot, "?"]])), kind: "int", ans: M, sol: T(S).pt_tab_s(pairs, rule, N, mul ? "×" : "+", k, M) };
    return { q: T(S).pt_tab_q(tabla5([[...top, "?"], [...bot, M]])), kind: "int", ans: N, sol: T(S).pt_tabr_s(rule, mul, M, k, N) };
  }
  if (t === 4) {   // patrón que se repite: el color de una cuenta lejana (división con resto)
    let p, pat;
    do { p = R.pick([3, 3, 4, 4, 5]); const cs = R.shuffle([0, 1, 2, 3, 4]).slice(0, p === 3 ? 2 : R.int(2, 3)); pat = Array.from({ length: p }, () => R.pick(cs)); }
    while (new Set(pat).size < 2 || (p === 4 && pat[0] === pat[2] && pat[1] === pat[3]));
    const N = R.int(2 * p + 3, 99), r = N % p, col = pat[(r || p) - 1], used = [...new Set(pat)], nm = T(S).pt_col;
    return { q: T(S).pt_rep_q(cuentas5(pat, 2 * p), N), kind: "choice", opts: used.map(i => nm[i][0].toUpperCase() + nm[i].slice(1)), correct: used.indexOf(col), shuffle: false,
      sol: T(S).pt_rep_s(pat.map(i => nm[i]).join(", "), p, N, Math.floor(N / p), r, nm[col]) };
  }
  const g = R.int(0, 3);   // igualdades con hueco
  if (g === 0) {   // a + b = c + □, con c cerca de a: se piensa sin hacer la suma
    let a; do a = R.int(21, 89); while (a % 10 === 0);
    const up = R.r() < 0.6, c = up ? Math.ceil(a / 10) * 10 : Math.floor(a / 10) * 10, e = Math.abs(c - a), b = R.int(e + 12, 95), ans = up ? b - e : b + e;
    return { q: T(S).pt_hue_q(`${a} + ${b} = ${c} + □`), kind: "int", ans, sol: T(S).pt_hue_suma_s(a, c, e, b, ans, a + b, up) };
  }
  if (g === 1) {   // a × b = c × □, con c = doble, triple… de a
    const m = R.pick([2, 2, 3, 5]), a = R.int(3, 20), b = m * R.int(2, 12), c = a * m, ans = b / m;
    return { q: T(S).pt_hue_q(`${a} × ${b} = ${c} × □`), kind: "int", ans, sol: T(S).pt_hue_mul_s(a, c, m, b, ans, H.n(a * b)) };
  }
  const k = R.int(2, 9), m = R.pick([12, 15, 20, 25, 50, 75, 125, 150, 250]), P = k * m, Tt = (Math.floor(P / 100) + R.int(1, 3)) * 100, ans = Tt - P;
  if (g === 2) return { q: T(S).pt_hue_q(`${k} × ${m} + □ = ${H.n(Tt)}`), kind: "int", ans, sol: T(S).pt_hue_dos_s(k, m, H.n(P), H.n(Tt), H.n(ans)) };
  return { q: T(S).pt_hue_q(`${H.n(Tt)} − □ = ${k} × ${m}`), kind: "int", ans, sol: T(S).pt_hue_res_s(k, m, H.n(P), H.n(Tt), H.n(ans)) };
});

// ── Algoritmos y pasos (mat5.u1.algoritmos): seguir pasos, máquinas con pregunta, ordenar, depurar y la división ──
const opDo5 = (o, x) => o[0] === "+" ? x + o[1] : o[0] === "-" ? x - o[1] : o[0] === "x" ? x * o[1] : x / o[1];
const opSym5 = o => ({ "+": "+", "-": "−", x: "×", ":": WA.H.div })[o[0]];
const opCalc5 = (H, o, x) => `${H.n(x)} ${opSym5(o)} ${o[1]} = ${H.n(opDo5(o, x))}`;
def("m5.algoritmo", (R, S, H) => {
  const t = R.r();
  if (t < 0.25) {   // seguir dos pasos que se repiten n veces
    for (let z = 0; z < 100; z++) {
      const a = R.int(2, 12), o1 = R.pick([["x", 2], ["x", 2], ["x", 3], ["+", R.int(3, 9)]]), o2 = o1[0] === "x" ? R.pick([["-", R.int(1, 5)], ["+", R.int(1, 6)]]) : ["x", 2];
      const n = R.int(2, 4), lines = [];
      let x = a, ok = true;
      for (let v = 1; v <= n; v++) { const y = opDo5(o1, x), w = opDo5(o2, y); if (w <= 0 || w === x) ok = false; lines.push(T(S).al_vuelta(v, opCalc5(H, o1, x), opCalc5(H, o2, y))); x = w; }
      if (!ok || x > 5000) continue;
      return { q: T(S).al_seg_q(a, T(S).al_op[o1[0]](o1[1]), T(S).al_op[o2[0]](o2[1]), n), kind: "int", ans: x, sol: lines.join("<br>") + "<br>" + T(S).al_seg_s(H.n(x)) };
    }
  }
  if (t < 0.45) {   // una máquina con pregunta: ¿es par?
    const v3 = R.r() < 0.5, step = x => x % 2 ? (v3 ? 3 * x + 1 : x + 1) : x / 2;
    const trace = tr => tr.slice(0, -1).map((x, i) => x % 2 ? T(S).al_maq_imp(x, v3, tr[i + 1]) : T(S).al_maq_par(x, tr[i + 1])).join("<br>");
    if (!v3 || R.r() < 0.5) {   // ¿cuántas vueltas hasta llegar a 1?
      for (;;) {
        const N = R.int(5, v3 ? 40 : 60), tr = [N];
        while (tr[tr.length - 1] !== 1 && tr.length < 20) tr.push(step(tr[tr.length - 1]));
        if (tr.length - 1 < 4 || tr.length - 1 > 10) continue;
        return { q: T(S).al_maq_q(N, v3) + T(S).al_maq_hasta, kind: "int", ans: tr.length - 1, sol: trace(tr) + "<br>" + T(S).al_maq_s1(tr.length - 1) };
      }
    }
    const N = R.int(6, 60), k = R.int(3, 5), tr = [N];
    for (let i = 0; i < k; i++) tr.push(step(tr[i]));
    return { q: T(S).al_maq_q(N, v3) + T(S).al_maq_k(k), kind: "int", ans: tr[k], sol: trace(tr) + "<br>" + T(S).al_maq_s2(tr[k]) };
  }
  if (t < 0.65) {   // ordenar los pasos (los errores: dos pasos seguidos cambiados de sitio)
    const [tit, pasos] = R.pick(T(S).al_ord), L4 = "ABCD";
    let perm; do perm = R.shuffle([0, 1, 2, 3]); while (perm.every((p, i) => p === i));   // perm[i] = el paso que lleva la letra i
    const letra = p => L4[perm.indexOf(p)], seq = o => o.map(letra).join(", "), good = seq([0, 1, 2, 3]);
    const opts = R.shuffle([good, seq([1, 0, 2, 3]), seq([0, 2, 1, 3]), seq([0, 1, 3, 2])]);
    return { q: T(S).al_ord_q(tit, perm.map((p, i) => `${L4[i]}. ${pasos[p]}`).join("<br>")), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false,
      sol: T(S).al_ord_s(good, pasos.map((p, i) => `${WA.H.ord(i + 1)} (${letra(i)}) ${p}`).join("<br>")) };
  }
  if (t < 0.85) {   // depurar: ¿en qué paso está el error?
    for (;;) {
      let x = R.int(6, 30);
      const a0 = x, ops = [];
      for (let i = 0; i < 4; i++) {
        const r = R.r();
        const o = r < 0.3 ? ["x", R.int(2, 5)] : r < 0.55 ? ["+", R.int(5, 60)] : r < 0.8 ? ["-", R.int(3, Math.max(3, Math.min(40, x - 1)))] : x % 2 ? ["+", R.int(5, 30)] : [":", 2];
        ops.push(o); x = opDo5(o, x);
      }
      const w = R.int(0, 3), e = R.pick([-10, -2, -1, 1, 2, 10]), shown = [], fix = [];
      let y = a0, ok = true;
      ops.forEach((o, i) => {
        const real = opDo5(o, y), out = i === w ? real + e : real;
        if (!Number.isInteger(real) || real <= 0 || out <= 0 || out > 2000) ok = false;
        const base = `${H.n(y)} ${opSym5(o)} ${o[1]} = `;
        shown.push(T(S).al_paso(i + 1, base + H.n(out)));
        fix.push(i === w ? T(S).al_err_mal(T(S).al_paso(i + 1, base + H.n(out)), H.n(real)) : T(S).al_err_bien(T(S).al_paso(i + 1, base + H.n(out))));
        y = out;
      });
      if (!ok) continue;
      return { q: T(S).al_err_q(R.pick(T(S).al_err_nom), shown.join("<br>")), kind: "choice", opts: T(S).al_err_o, correct: w, shuffle: false, sol: T(S).al_err_s(fix.join("<br>"), w + 1) };
    }
  }
  // la división es un algoritmo: ¿qué número queda después de restar y bajar la cifra?
  const d = R.int(12, 89), A = d * R.int(21, 299) + R.int(0, d - 1), s = String(A);
  let k = String(d).length, chunk = +s.slice(0, k);
  if (chunk < d) { k++; chunk = +s.slice(0, k); }
  const q1 = Math.floor(chunk / d), r1 = chunk - q1 * d, nx = r1 * 10 + +s[k];
  return { q: T(S).al_div_q(H.n(A), d), kind: "int", ans: nx, sol: T(S).ld_first(H.n(chunk), d, q1, H.n(d * q1), r1) + T(S).al_div_s(s[k], nx) };
});

// ── Coordenadas en la cuadrícula (mat5.u7.coordenadas): leer, localizar, el cuarto vértice, medidas y caminos ──
const GX5 = 10, GY5 = 8, COLP5 = [C.red, C.blue, C.green, C.purple], L4C = "ABCD";
function grid5(draw) {   // cuadrícula de 10 × 8 con las líneas numeradas desde el (0, 0); draw(P) dibuja encima
  const u = 30, x0 = 30, y0 = 16 + GY5 * u, P = (x, y) => [x0 + x * u, y0 - y * u];
  let b = "";
  for (let i = 0; i <= GX5; i++) b += `<line x1="${x0 + i * u}" y1="${y0}" x2="${x0 + i * u}" y2="${y0 - GY5 * u}" stroke="#d5dae0"/>` + SVG.txt(x0 + i * u, y0 + 17, i, 12, C.dark);
  for (let j = 0; j <= GY5; j++) b += `<line x1="${x0}" y1="${y0 - j * u}" x2="${x0 + GX5 * u}" y2="${y0 - j * u}" stroke="#d5dae0"/>` + (j ? SVG.txt(x0 - 8, y0 - j * u + 4, j, 12, C.dark, "end") : "");
  b += `<line x1="${x0}" y1="${y0}" x2="${x0 + GX5 * u + 12}" y2="${y0}" stroke="${C.dark}" stroke-width="2"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - GY5 * u - 10}" stroke="${C.dark}" stroke-width="2"/>`;
  return SVG.svg(x0 + GX5 * u + 22, y0 + 26, b + draw(P));
}
const dot5 = (P, p, l, c) => { const [X, Y] = P(p[0], p[1]); return `<circle cx="${X}" cy="${Y}" r="5.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>` + SVG.txt(X + 8, Y - 7, l, 14, c, "start", "bold"); };
const seg5 = (P, a, b) => { const [x1, y1] = P(a[0], a[1]), [x2, y2] = P(b[0], b[1]); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.blue}" stroke-width="3"/>`; };
function puntos5(R, n, ps = []) {   // n puntos distintos y separados (sin el (0, 0)); ps = los que ya están
  ps = ps.slice();
  while (ps.length < n) { const p = [R.int(0, GX5), R.int(0, GY5)]; if ((p[0] || p[1]) && ps.every(q => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) >= 2)) ps.push(p); }
  return ps;
}
def("m5.coordenadas", (R, S, H) => {
  const t = R.int(0, 5);
  if (t === 0) {   // leer las coordenadas de un punto
    let ps; do ps = puntos5(R, 4); while (ps.every(p => p[0] === p[1]));
    const i = R.pick(ps.map((p, j) => p[0] !== p[1] ? j : -1).filter(j => j >= 0)), svg = grid5(P => ps.map((p, j) => dot5(P, p, L4C[j], COLP5[j])).join(""));
    return { q: T(S).co_leer_q(L4C[i], svg), kind: "fields", fields: [{ label: T(S).co_f[0], ans: ps[i][0] }, { label: T(S).co_f[1], ans: ps[i][1] }], sol: T(S).co_leer_s(L4C[i], ps[i][0], ps[i][1]) };
  }
  if (t === 1) {   // ¿qué punto está en (x, y)? Con la trampa del (y, x)
    let x, y; do { x = R.int(1, GY5); y = R.int(0, GY5); } while (x === y);
    const ps = R.shuffle(puntos5(R, 4, [[x, y], [y, x]])), i = ps.findIndex(p => p[0] === x && p[1] === y), tr = ps.findIndex(p => p[0] === y && p[1] === x);
    return { q: T(S).co_hay_q(pt5(x, y), grid5(P => ps.map((p, j) => dot5(P, p, L4C[j], COLP5[j])).join(""))), kind: "choice", opts: L4C.split(""), correct: i, shuffle: false,
      sol: T(S).co_hay_s(x, y, L4C[i], L4C[tr]) };
  }
  if (t === 2) {   // el cuarto vértice de un rectángulo
    const x1 = R.int(0, 6), x2 = R.int(x1 + 2, Math.min(GX5, x1 + 8)), y1 = R.int(0, 5), y2 = R.int(y1 + 2, GY5);
    const cs = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], s0 = R.int(0, 3), dir = R.r() < 0.5 ? 1 : 3, V = [0, 1, 2].map(i => cs[(s0 + i * dir) % 4]);
    const hor = V[0][1] === V[1][1], D = hor ? [V[0][0], V[2][1]] : [V[2][0], V[0][1]];
    const svg = grid5(P => seg5(P, V[0], V[1]) + seg5(P, V[1], V[2]) + V.map((p, j) => dot5(P, p, L4C[j], COLP5[j])).join(""));
    return { q: T(S).co_vert_q(pt5(...V[0]), pt5(...V[1]), pt5(...V[2]), svg), kind: "fields", fields: [{ label: T(S).co_f[0], ans: D[0] }, { label: T(S).co_f[1], ans: D[1] }],
      sol: T(S).co_vert_s(hor ? "A" : "C", D[0], hor ? "C" : "A", D[1]) };
  }
  if (t === 3) {   // medir sin dibujar: un segmento, o el perímetro o el área de un rectángulo
    if (R.r() < 0.4) {
      const hor = R.r() < 0.5, c = R.int(0, hor ? GY5 : GX5), a = R.int(0, (hor ? GX5 : GY5) - 2), b = R.int(a + 2, hor ? GX5 : GY5), sw = R.r() < 0.3;
      const p1 = hor ? pt5(a, c) : pt5(c, a), p2 = hor ? pt5(b, c) : pt5(c, b);
      return { q: T(S).co_seg_q(sw ? p2 : p1, sw ? p1 : p2), kind: "int", ans: b - a, sol: T(S).co_seg_s(hor, c, a, b, b - a) };
    }
    const x1 = R.int(0, 6), x2 = R.int(x1 + 2, GX5), y1 = R.int(0, 5), y2 = R.int(y1 + 2, GY5), per = R.r() < 0.5, bb = x2 - x1, hh = y2 - y1, res = per ? 2 * (bb + hh) : bb * hh;
    return { q: T(S).co_rect_q(T(S).lst([pt5(x1, y1), pt5(x2, y1), pt5(x2, y2), pt5(x1, y2)]), per), kind: "int", ans: res, sol: T(S).co_rect_s(x1, x2, y1, y2, bb, hh, per, res) };
  }
  if (t === 4) {   // el camino del robot de A a B
    let A, B; do { A = [R.int(0, GX5), R.int(0, GY5)]; B = [R.int(0, GX5), R.int(0, GY5)]; } while (A[0] === B[0] || A[1] === B[1] || Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]) < 4);
    const dx = Math.abs(B[0] - A[0]), dy = Math.abs(B[1] - A[1]), svg = grid5(P => dot5(P, A, "A", C.red) + dot5(P, B, "B", C.green));
    return { q: T(S).co_cam_q(svg), kind: "fields", fields: [{ label: T(S).co_cam_f[0], ans: dx }, { label: T(S).co_cam_f[1], ans: dy }],
      sol: T(S).co_cam_s(pt5(...A), pt5(...B), `${Math.max(A[0], B[0])} − ${Math.min(A[0], B[0])}`, dx, B[0] > A[0], `${Math.max(A[1], B[1])} − ${Math.min(A[1], B[1])}`, dy, B[1] > A[1]) };
  }
  // moverse desde un punto, también hacia la izquierda y hacia abajo
  let x, y, nx, ny; do { x = R.int(0, GX5); y = R.int(0, GY5); nx = R.int(0, GX5); ny = R.int(0, GY5); } while (nx === x || ny === y || (nx > x && ny > y));
  const dx = Math.abs(nx - x), dy = Math.abs(ny - y);
  return { q: T(S).co_mov_q(pt5(x, y), dx, nx > x, dy, ny > y), kind: "fields", fields: [{ label: T(S).co_f[0], ans: nx }, { label: T(S).co_f[1], ans: ny }],
    sol: T(S).co_mov_s(x, dx, nx > x, nx, y, dy, ny > y, ny) };
});
})();
