/* WikiAula — Matemáticas, Grado 7 · Unidad 4: Fracciones.
   Textos: i18n/<lang>/mat7u4.js (S.m7). Fracciones exactas con WA.MATH.F. */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { F, gcd, lcm, rnz } = WA.MATH;
const fh = (H, a) => F.html(a, H);                 // fracción en HTML (con signo)
const fp = (H, a) => a[0] < 0 ? `(${fh(H, a)})` : fh(H, a);   // entre paréntesis si es negativa
const raw = (H, n, d) => (n < 0 ? "−" : "") + H.frac(Math.abs(n), d);   // sin simplificar
const DEN = [2, 3, 4, 5, 6, 8, 9, 10, 12];
const randFrac = (R, opts = {}) => {
  for (;;) {
    const d = R.pick(opts.den || DEN), n = opts.neg ? rnz(R, -d * (opts.max || 2), d * (opts.max || 2)) : R.int(1, d * (opts.max || 1) - (opts.proper ? 1 : 0) || 1);
    if (opts.proper && Math.abs(n) >= d) continue;
    if (gcd(n, d) === 1 && n % d !== 0) return [n, d];
  }
};

// ── Equivalentes, simplificar ─────────────────────────────────────────
def("m7.fr.completa", (R, S, H) => {
  const [n, d] = randFrac(R, { proper: true }), k = R.int(2, 9), mult = R.r() < 0.6;
  const big = [n * k, d * k];
  const hole = '<span class="wa-hole">□</span>';
  const missNum = R.r() < 0.5;
  let e, ans;
  if (mult) { e = `${H.frac(n, d)} = ${missNum ? H.frac(hole, big[1]) : H.frac(big[0], hole)}`; ans = missNum ? big[0] : big[1]; }
  else { e = `${H.frac(big[0], big[1])} = ${missNum ? H.frac(hole, d) : H.frac(n, hole)}`; ans = missNum ? n : d; }
  return { q: S.m7.fr_comp_q(e), kind: "int", ans, sol: S.m7.fr_comp_s(k, mult, ans) };
});
def("m7.fr.simplificar", (R, S, H) => {
  const [n, d] = randFrac(R, { proper: R.r() < 0.7, max: 2 }), k = R.pick([2, 3, 4, 5, 6, 8, 9, 10, 12, 15]);
  const N = n * k, Dd = d * k;
  return { q: S.m7.fr_simp_q(H.frac(N, Dd)), kind: "frac", ans: [n, d], simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.fr_simp_s(gcd(N, Dd), H.frac(N, Dd), H.frac(n, d)) };
});
def("m7.fr.esequiv", (R, S, H) => {
  const [n, d] = randFrac(R, { proper: true });
  const k1 = R.int(2, 6), yes = R.r() < 0.5;
  let k2;
  do k2 = R.int(2, 6); while (k2 === k1);
  const a = [n * k1, d * k1];
  let b = [n * k2, d * k2];
  if (!yes) b = R.r() < 0.5 ? [b[0] + R.pick([1, -1, 2]), b[1]] : [b[0], b[1] + R.pick([1, 2])];
  if (b[0] <= 0) b[0] = 1;
  const ok = a[0] * b[1] === a[1] * b[0];
  return { q: S.m7.fr_eq_q(H.frac(a[0], a[1]), H.frac(b[0], b[1])), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: ok ? 0 : 1, shuffle: false,
    sol: S.m7.fr_eq_s(`${a[0]} ${H.mul} ${b[1]} = ${a[0] * b[1]}`, `${a[1]} ${H.mul} ${b[0]} = ${a[1] * b[0]}`, ok) };
});
def("m7.fr.grafica", (R, S, H) => {
  const d = R.pick([3, 4, 5, 6, 8, 10, 12]), n = R.int(1, d - 1);
  const pic = R.r() < 0.5 ? WA.SVG.fracPie(n, d) : WA.SVG.fracBar(n, d);
  return { q: S.m7.fr_graf_q + "<br>" + pic, kind: "frac", ans: [n, d], sol: S.m7.fr_graf_s(n, d, H.frac(n, d)) };
});
def("m7.fr.cantidad", (R, S, H) => {
  const [n, d] = randFrac(R, { proper: true });
  const c = d * R.int(2, 25), u = R.pick(S.m7.fr_cant_u);   // unidades del idioma (la primera, la moneda)
  return { q: S.m7.fr_cant_q(H.frac(n, d), H.n(c), u), kind: "int", ans: c / d * n, sol: S.m7.fr_cant_s(c, d, n, H.n(c / d * n)) };
});

// ── Comparar ──────────────────────────────────────────────────────────
def("m7.fr.comparar", (R, S, H) => {
  let a, b;
  do { a = randFrac(R, { max: 2 }); b = randFrac(R, { max: 2 }); } while (F.eq(a, b) || a[1] === b[1] && R.r() < 0.7);
  const m = lcm(a[1], b[1]), a2 = a[0] * m / a[1], b2 = b[0] * m / b[1];
  const gt = a2 > b2;
  return { q: S.m7.fr_cmp_q(fh(H, a), fh(H, b)), kind: "choice", opts: ["&lt;", "&gt;"], correct: gt ? 1 : 0, shuffle: false,
    sol: a[1] === b[1] ? S.m7.fr_cmp_s1(a[0], b[0], `${fh(H, a)} ${gt ? "&gt;" : "&lt;"} ${fh(H, b)}`)
      : S.m7.fr_cmp_s(H.frac(a2, m), H.frac(b2, m), `${fh(H, a)} ${gt ? "&gt;" : "&lt;"} ${fh(H, b)}`) };
});
def("m7.fr.mayor", (R, S, H) => {
  const fs = [];
  while (fs.length < 4) { const f = randFrac(R, { proper: true, den: [2, 3, 4, 5, 6, 8, 10, 12] }); if (!fs.some(g => F.eq(f, g))) fs.push(f); }
  const big = R.r() < 0.5, m = fs.reduce((a, f) => lcm(a, f[1]), 1);
  const tgt = fs.reduce((x, f) => (big ? F.num(f) > F.num(x) : F.num(f) < F.num(x)) ? f : x);
  return { q: S.m7.fr_may_q(big), kind: "choice", opts: fs.map(f => fh(H, f)), correct: fs.indexOf(tgt),
    sol: S.m7.fr_may_s(fs.map(f => `${fh(H, f)} = ${H.frac(f[0] * m / f[1], m)}`).join(", "), fh(H, tgt)) };
});

// ── Suma y resta ──────────────────────────────────────────────────────
function addSol(S, H, a, b, op) {
  const m = lcm(a[1], b[1]), A = a[0] * m / a[1], B = b[0] * m / b[1];
  const r0n = op === "+" ? A + B : A - B, r = F.make(r0n, m);
  const sym = op === "+" ? "+" : "−";
  if (a[1] === b[1]) return { r, sol: S.m7.fr_sum_s1(`${fh(H, a)} ${sym} ${fp(H, b)}`, raw(H, r0n, m), fh(H, r)) };
  return { r, sol: S.m7.fr_sum_s(m, `${raw(H, A, m)} ${sym} ${B < 0 ? "(" + raw(H, B, m) + ")" : raw(H, B, m)}`, raw(H, r0n, m), fh(H, r)) };
}
def("m7.fr.suma", (R, S, H) => {
  // común denominador razonable (m.c.m. ≤ 30) y resultado sin numeradores enormes (nada de 199/72)
  let a, b;
  do {
    a = randFrac(R, { max: 2 }); b = R.r() < 0.25 ? [R.int(1, a[1] * 2), a[1]] : randFrac(R, { max: 2 });
    if (b[0] % b[1] === 0) b[0]++;
  } while (lcm(a[1], b[1]) > 30 || Math.abs(F.add(a, b)[0]) > 50);
  const { r, sol } = addSol(S, H, a, b, "+");
  return { q: S.m7.fr_q(`${fh(H, a)} + ${fh(H, b)}`), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol };
});
def("m7.fr.resta", (R, S, H) => {
  // Como m7.fr.suma: m.c.m. ≤ 30 y numeradores razonables; casi siempre (70 %) resultado positivo
  let a, b;
  do {
    a = randFrac(R, { max: 2 }); b = randFrac(R, { max: 2 });
    if (R.r() < 0.7 && F.num(a) < F.num(b)) [a, b] = [b, a];
  } while (lcm(a[1], b[1]) > 30 || Math.abs(F.sub(a, b)[0]) > 50);
  const { r, sol } = addSol(S, H, a, b, "-");
  if (!r[0]) return null;
  return { q: S.m7.fr_q(`${fh(H, a)} − ${fh(H, b)}`), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol };
});
def("m7.fr.entero", (R, S, H) => {
  const w = R.int(1, 5), b = randFrac(R, { proper: true }), plus = R.r() < 0.5;
  const a = [w, 1], { r, sol } = addSol(S, H, a, b, plus ? "+" : "-");
  return { q: S.m7.fr_q(`${w} ${plus ? "+" : "−"} ${fh(H, b)}`), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol };
});
def("m7.fr.signos", (R, S, H) => {
  const a = randFrac(R, { neg: true, max: 1 }), b = randFrac(R, { neg: true, max: 1 }), plus = R.r() < 0.5;
  const { r, sol } = addSol(S, H, a, b, plus ? "+" : "-");
  if (!r[0]) return null;
  return { q: S.m7.fr_q(`${fh(H, a)} ${plus ? "+" : "−"} ${fp(H, b)}`), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol };
});

// ── Multiplicación y división ─────────────────────────────────────────
def("m7.fr.mult", (R, S, H) => {
  // La mitad de las veces se puede simplificar antes de multiplicar (un número de arriba con uno de abajo), como en la lección
  const cross = R.r() < 0.5;
  let a, b;
  do { a = randFrac(R, { max: 2, neg: R.r() < 0.25 }); b = randFrac(R, { max: 2 }); }
  while (cross && gcd(Math.abs(a[0]), b[1]) === 1 && gcd(b[0], a[1]) === 1);
  const r = F.mul(a, b), n0 = a[0] * b[0], d0 = a[1] * b[1];
  const e = `${fh(H, a)} ${H.mul} ${fp(H, b)}`;
  const g1 = gcd(Math.abs(a[0]), b[1]), g2 = gcd(b[0], a[1]);
  if (g1 > 1 || g2 > 1) {
    const pairs = [];
    if (g1 > 1) pairs.push(S.m7.fr_cruz_par(Math.abs(a[0]), b[1], g1));
    if (g2 > 1) pairs.push(S.m7.fr_cruz_par(b[0], a[1], g2));
    const n1 = a[0] / g1 * (b[0] / g2), d1 = a[1] / g2 * (b[1] / g1);
    return { q: S.m7.fr_q(e), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
      sol: S.m7.fr_mul_cruz(e, pairs, `${a[0] < 0 ? "−" : ""}${H.frac(`${Math.abs(a[0]) / g1} ${H.mul} ${b[0] / g2}`, `${a[1] / g2} ${H.mul} ${b[1] / g1}`)}`, fh(H, F.make(n1, d1))) };
  }
  return { q: S.m7.fr_q(e), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.fr_mul_s(e, raw(H, n0, d0), fh(H, r)) };
});
def("m7.fr.div", (R, S, H) => {
  const a = randFrac(R, { max: 2, neg: R.r() < 0.25 }), b = randFrac(R, { max: 2 });
  const inv = [b[1], b[0]], r = F.div(a, b), n0 = a[0] * inv[0], d0 = a[1] * inv[1];
  return { q: S.m7.fr_q(`${fh(H, a)} ${H.div} ${fp(H, b)}`), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.fr_div_s(`${fh(H, a)} ${H.div} ${fp(H, b)}`, `${fh(H, a)} ${H.mul} ${H.frac(inv[0], inv[1])}`, raw(H, n0, d0), fh(H, r)) };
});
def("m7.fr.inversa", (R, S, H) => {
  const a = randFrac(R, { max: 2, neg: R.r() < 0.2 });
  const inv = F.make(a[1], a[0]);
  return { q: S.m7.fr_inv_q(fh(H, a)), kind: "frac", ans: inv, sol: S.m7.fr_inv_s(fh(H, a), fh(H, inv)) };
});
def("m7.fr.dedefraccion", (R, S, H) => {
  const a = randFrac(R, { proper: true }), b = randFrac(R, { proper: true });
  const r = F.mul(a, b);
  return { q: S.m7.fr_q(S.m7.fr_de(fh(H, a), fh(H, b))), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.fr_mul_s(`${fh(H, a)} ${H.mul} ${fh(H, b)}`, raw(H, a[0] * b[0], a[1] * b[1]), fh(H, r)) };
});

// ── Operaciones combinadas ────────────────────────────────────────────
// Árbol sencillo: tres fracciones y dos operaciones, con o sin paréntesis
// Pasos de x ± y con la línea de común denominador (lo que más fallos da) y la de simplificar
function sumLines(H, x, y, op) {
  const m = lcm(x[1], y[1]), X = x[0] * m / x[1], Y = y[0] * m / y[1], n = op === "+" ? X + Y : X - Y, r = F.make(n, m);
  const out = [];
  if (x[1] !== y[1]) out.push(`${raw(H, X, m)} ${op} ${Y < 0 ? "(" + raw(H, Y, m) + ")" : raw(H, Y, m)}`);
  if (n && r[1] !== m) out.push(raw(H, n, m));
  out.push(fh(H, r));                       // la última línea es siempre la fracción simplificada
  return { r, out };
}
// Pasos de x · y: numeradores entre sí y denominadores entre sí, y después simplificar.
// Si un número de arriba y uno de abajo tienen un divisor común, se simplifica ANTES de multiplicar (como en la lección)
function mulLines(H, x, y) {
  const r = F.mul(x, y), n = x[0] * y[0], d = x[1] * y[1];
  const g1 = gcd(Math.abs(x[0]), y[1]), g2 = gcd(Math.abs(y[0]), x[1]);
  if ((g1 > 1 || g2 > 1) && x[1] * y[1] !== g1 * g2) {
    const sg = x[0] * y[0] < 0 ? "−" : "";
    return { r, out: [sg + H.frac(`${Math.abs(x[0]) / g1} ${H.mul} ${Math.abs(y[0]) / g2}`, `${x[1] / g2} ${H.mul} ${y[1] / g1}`), fh(H, r)] };
  }
  return { r, out: r[0] === n && r[1] === d ? [fh(H, r)] : [raw(H, n, d), fh(H, r)] };
}
def("m7.fr.comb", (R, S, H) => {
  for (let k = 0; k < 200; k++) {
    const a = randFrac(R, { max: 1, proper: true }), b = randFrac(R, { proper: true }), c = randFrac(R, { proper: true });
    const t = R.int(0, 5);
    let q, steps, r, pre = "";
    const inv = x => F.make(x[1], x[0]);
    if (t === 0) {         // a + b · c
      const p = mulLines(H, b, c), s = sumLines(H, a, p.r, "+"); r = s.r;
      q = `${fh(H, a)} + ${fh(H, b)} ${H.mul} ${fh(H, c)}`;
      steps = [q, ...p.out.map(x => `${fh(H, a)} + ${x}`), ...s.out];
    } else if (t === 1) {  // (a + b) · c
      const s = sumLines(H, a, b, "+"), ab = s.r, p = mulLines(H, ab, c); r = p.r;
      q = `(${fh(H, a)} + ${fh(H, b)}) ${H.mul} ${fh(H, c)}`;
      steps = [q, ...s.out.slice(0, -1).map(x => `(${x}) ${H.mul} ${fh(H, c)}`), `${fp(H, ab)} ${H.mul} ${fh(H, c)}`, ...p.out];
    } else if (t === 2) {  // a − b : c
      const p = mulLines(H, b, inv(c)), s = sumLines(H, a, p.r, "−"); r = s.r;
      q = `${fh(H, a)} − ${fh(H, b)} ${H.div} ${fh(H, c)}`;
      steps = [q, `${fh(H, a)} − ${fh(H, b)} ${H.mul} ${fh(H, inv(c))}`, ...p.out.map(x => `${fh(H, a)} − ${x}`), ...s.out];
    } else if (t === 3) {  // (a − b) : c
      const s = sumLines(H, a, b, "−"), ab = s.r, p = mulLines(H, ab, inv(c)); r = p.r;
      q = `(${fh(H, a)} − ${fh(H, b)}) ${H.div} ${fh(H, c)}`;
      steps = [q, ...s.out.slice(0, -1).map(x => `(${x}) ${H.div} ${fh(H, c)}`), `${fp(H, ab)} ${H.div} ${fh(H, c)}`,
        `${fp(H, ab)} ${H.mul} ${fh(H, inv(c))}`, ...p.out];
    } else if (t === 4) {  // (a − b) : (c + d), dos paréntesis como el «Inténtalo» de la lección
      const d = randFrac(R, { proper: true });
      const s1 = sumLines(H, a, b, "−"), s2 = sumLines(H, c, d, "+"), ab = s1.r, cd = s2.r;
      if (!ab[0]) continue;
      const p = mulLines(H, ab, inv(cd)); r = p.r;
      q = `(${fh(H, a)} − ${fh(H, b)}) ${H.div} (${fh(H, c)} + ${fh(H, d)})`;
      pre = S.m7.fr_comb_par(`${fh(H, a)} − ${fh(H, b)} = ${s1.out.join(" = ")}`, `${fh(H, c)} + ${fh(H, d)} = ${s2.out.join(" = ")}`) + "<br>";
      steps = [`${fp(H, ab)} ${H.div} ${fp(H, cd)}`, `${fp(H, ab)} ${H.mul} ${fh(H, inv(cd))}`, ...p.out];
    } else {               // (a − 1) · b + c, con un resultado parcial negativo (como el ejemplo 4)
      const s1 = sumLines(H, a, [1, 1], "−"), am = s1.r, p = mulLines(H, am, b), s2 = sumLines(H, p.r, c, "+"); r = s2.r;
      q = `(${fh(H, a)} − 1) ${H.mul} ${fh(H, b)} + ${fh(H, c)}`;
      steps = [q, ...s1.out.slice(0, -1).map(x => `(${x}) ${H.mul} ${fh(H, b)} + ${fh(H, c)}`), `${fp(H, am)} ${H.mul} ${fh(H, b)} + ${fh(H, c)}`,
        ...p.out.map(x => `${x} + ${fh(H, c)}`), ...s2.out];
    }
    if (!r[0] || Math.abs(r[0]) > 60 || r[1] > 60) continue;
    steps = steps.filter((s, i) => !i || s !== steps[i - 1]);
    steps[steps.length - 1] = `<b>${steps[steps.length - 1]}</b>`;
    return { q: S.m7.fr_q(q), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
      sol: S.m7.fr_comb_s + "<br>" + pre + steps.map((s, i) => (i ? "= " : "") + s).join("<br>") };
  }
  return null;
});

// ── Problemas ─────────────────────────────────────────────────────────
def("m7.fr.problema", (R, S, H) => {
  if (R.r() < 0.5) {
    for (;;) {
      const a = randFrac(R, { proper: true, den: [3, 4, 5, 6, 8, 10] }), b = randFrac(R, { proper: true, den: [3, 4, 5, 6, 8, 10] });
      const sum = F.add(a, b);
      if (F.num(sum) >= 1) continue;
      const r = F.sub([1, 1], sum), P = R.pick(S.m7.fr_prob);
      // Pasos con común denominador, como en la lección: 2/3 + 3/10 = 20/30 + 9/30 = 29/30; 1 − 29/30 = 30/30 − 29/30 = 1/30
      const s1 = sumLines(H, a, b, "+").out, s2 = sumLines(H, [1, 1], sum, "−").out;
      s1[s1.length - 1] = fh(H, sum); s2[s2.length - 1] = `<b>${fh(H, r)}</b>`;
      const note = a[1] !== b[1] ? S.m7.fr_prob_mcm(a[1], b[1], lcm(a[1], b[1])) : "";
      return { q: P.q(fh(H, a), fh(H, b)), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
        sol: P.s(fh(H, a), fh(H, b), s1.join(" = "), [fh(H, sum), ...s2].join(" = "), note) };
    }
  }
  if (R.r() < 0.4) {
    // Conozco una parte, busco el total: «los 3/5 son 270» → 1/5 es 270 : 3 = 90 → el total, 5 · 90
    let f;
    do f = randFrac(R, { proper: true, den: [3, 4, 5, 6, 8, 10] }); while (f[0] < 2);
    const k = R.int(3, 40) * (f[1] <= 4 ? 5 : 2);
    const tot = f[1] * k, part = f[0] * k, P = R.pick(S.m7.fr_prob3);
    return { q: P.q(fh(H, f), H.n(part)), kind: "int", ans: tot, sol: S.m7.fr_prob3_s(fh(H, f), H.n(part), f[0], f[1], H.n(k), H.n(tot), P.u) };
  }
  for (;;) {
    const a = randFrac(R, { proper: true, den: [2, 3, 4, 5] }), b = randFrac(R, { proper: true, den: [2, 3, 4, 5] });
    const tot = a[1] * b[1] * R.int(2, 12) * 10;
    const g1 = tot / a[1] * a[0], q1 = tot - g1;
    if (q1 % b[1]) continue;
    const g2 = q1 / b[1] * b[0], r = q1 - g2;
    return { q: S.m7.fr_prob2_q(H.n(tot), fh(H, a), fh(H, b)), kind: "int", ans: r,
      sol: S.m7.fr_prob2_s(fh(H, a), H.n(tot), a[1], a[0], H.n(g1), H.n(q1), fh(H, b), b[1], b[0], H.n(g2), H.n(r)) };
  }
});
})();
