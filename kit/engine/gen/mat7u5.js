/* WikiAula — Matemáticas, Grado 7 · Unidad 5: Números decimales.
   Textos: i18n/<lang>/mat7u5.js (S.m7). Los decimales se generan como
   enteros / 10^k para evitar errores de coma flotante. */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { F, gcd, factorize, factorsHtml } = WA.MATH;
const dv = (i, k) => i / 10 ** k;                   // entero → decimal con k cifras
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const randDec = (R, maxInt, k) => R.int(1, maxInt * 10 ** k - 1) / 10 ** k;
const ndec = x => { const s = String(x); return s.includes(".") ? s.split(".")[1].length : 0; };
const fixed = (H, x, k) => {   // con ceros finales (para la columna de decimales)
  const [ip, fp] = Math.abs(x).toFixed(k).split(".");
  return (x < 0 ? "−" : "") + H.n(+ip) + (k ? H.ds + fp : "");
};

// Expresión decimal de a/b: {ante, periodo} (división larga)
function expand(a, b) {
  const ip = Math.floor(a / b);
  let r = a % b;
  const digits = [], seen = new Map();
  while (r && !seen.has(r) && digits.length < 40) { seen.set(r, digits.length); r *= 10; digits.push(Math.floor(r / b)); r %= b; }
  if (!r) return { ip, ante: digits.join(""), per: "" };
  const st = seen.get(r);
  return { ip, ante: digits.slice(0, st).join(""), per: digits.slice(st).join("") };
}

// ── Tipos de decimales ────────────────────────────────────────────────
def("m7.dec.tipo", (R, S, H) => {
  const kind = R.int(0, 2);
  let d;
  if (kind === 0) d = R.pick([2, 4, 5, 8, 10, 16, 20, 25, 40, 50]);
  else if (kind === 1) d = R.pick([3, 7, 9, 11, 13, 21, 27, 33, 37]);
  else d = R.pick([6, 12, 14, 15, 18, 22, 24, 30, 35, 45]);
  let n;
  do n = R.int(1, d * 2); while (gcd(n, d) !== 1);
  const fac = factorsHtml(factorize(d), H) === String(d) ? String(d) : `${d} = ${factorsHtml(factorize(d), H)}`;
  // Uno de cada tres, sin simplificar (la trampa de la lección: 6/15 parece periódico y es 2/5): primero se simplifica.
  // Los periódicos puros se amplían por 2 o 5 (parecen mixtos); los demás, por 3 o 7 (parecen periódicos o mixtos).
  if (R.r() < 1 / 3) {
    const k = kind === 1 ? R.pick([2, 5]) : (d > 20 ? 3 : R.pick([3, 7]));
    return { q: S.m7.dc_tipo_q(H.frac(n * k, d * k)), kind: "choice", opts: S.m7.dc_tipos, correct: kind, shuffle: false,
      sol: S.m7.dc_tipo_s2(H.frac(n * k, d * k), k, H.frac(n, d), fac, S.m7.dc_tipo_t[kind]) };
  }
  return { q: S.m7.dc_tipo_q(H.frac(n, d)), kind: "choice", opts: S.m7.dc_tipos, correct: kind, shuffle: false,
    sol: S.m7.dc_tipo_s(H.frac(n, d), fac, S.m7.dc_tipo_t[kind]) };
});
def("m7.dec.periodo", (R, S, H) => {
  for (;;) {
    const d = R.pick([3, 6, 7, 9, 11, 12, 15, 18, 22, 27, 33, 37, 45, 55, 74, 99]), n = R.int(1, d - 1);
    if (gcd(n, d) !== 1) continue;
    const e = expand(n, d);
    if (!e.per || e.per.length > 6) continue;
    const show = `${e.ip}${H.ds}${e.ante}${e.per}${e.per}`;
    // La división larga con sus restos: cuando un resto se repite, se repiten las cifras (como en la lección)
    const rests = [];
    let r = n % d;
    while (!rests.includes(r)) { rests.push(r); r = r * 10 % d; }
    return { q: S.m7.dc_per_q(H.frac(n, d)), kind: "text", ans: e.per, hint: S.m7.dc_hint_digits,
      sol: S.m7.dc_per_s(H.frac(n, d), show, e.per, n, d, rests, r, e.ante) };
  }
});

// ── Cambios de unidad con decimales: la escalera de la lección (peldaños y coma) ──
def("m7.dec.unidades", (R, S, H) => {
  const fam = R.pick(S.m7.met_fam);                      // {u: [7 unidades de mayor a menor], ...}
  const sh = (I, k, e) => Number(`${I}e${e - k}`);       // I / 10^k · 10^e, sin errores de coma flotante
  if (R.r() < 0.25) {
    // Sumar dos medidas en unidades distintas (ejemplo 3): se pasan a la misma unidad
    for (;;) {
      const i = R.int(fam.lo, fam.hi - 1), j = i + R.int(1, Math.min(2, fam.hi - i)), k = 1;
      const I = R.int(11, 99), J = R.int(5, 95);
      const a = sh(I, k, 0), b = J, toSmall = R.r() < 0.6;
      const aSmall = sh(I, k, j - i), r = toSmall ? aSmall + b : sh(I * 10 ** (j - i) + J * 10, k + (j - i), 0);
      if (ndec(r) > 3) continue;
      return { q: S.m7.met_suma_q(H.dec(a), fam.u[i], H.n(b), fam.u[j], toSmall ? fam.u[j] : fam.u[i]), kind: "num", ans: r,
        sol: S.m7.met_suma_s(H.dec(a), fam.u[i], H.n(b), fam.u[j], j - i, toSmall, H.dec(aSmall), H.dec(sh(J, 0, -(j - i))), H.dec(r)) };
    }
  }
  for (;;) {
    const i = R.int(fam.lo, fam.hi), j = R.int(fam.lo, fam.hi), steps = j - i;   // j > i: bajar (unidad menor)
    if (!steps || Math.abs(steps) > 3) continue;
    const k = R.int(0, 3), I = k ? R.int(1, 50 * 10 ** k - 1) : R.int(2, 999);
    if (k && I % 10 === 0) continue;                    // sin ceros sobrantes tras la coma
    const v = sh(I, k, 0), r = sh(I, k, steps);
    if (ndec(r) > 4 || r >= 100000) continue;
    return { q: S.m7.met_q(H.dec(v), fam.u[i], fam.u[j]), kind: "num", ans: r,
      sol: S.m7.met_s(H.dec(v), fam.u[i], fam.u[j], fam.u.slice(Math.min(i, j), Math.max(i, j) + 1), steps, H.dec(r)) };
  }
});

// ── Operaciones ───────────────────────────────────────────────────────
def("m7.dec.suma", (R, S, H) => {
  const ka = R.int(1, 3), kb = R.int(0, 3), plus = R.r() < 0.5, k = Math.max(ka, kb);
  let a = randDec(R, 100, ka), b = randDec(R, 60, kb) || 1;
  if (a === Math.round(a)) return null;
  if (!plus && b > a) [a, b] = [b, a];
  const r = rd(plus ? a + b : a - b, k);
  const e = `${H.dec(a)} ${plus ? "+" : "−"} ${H.dec(b)}`;
  return { q: S.m7.dc_q(e), kind: "num", ans: r, sol: S.m7.dc_sum_s(e, H.dec(r)) };
});
def("m7.dec.mult", (R, S, H) => {
  const ka = R.int(1, 2), kb = R.int(0, 2);
  // Sin ceros finales tras la coma (2,50 se vería 2,5 y la solución contaría mal las cifras decimales)
  let ia, ib;
  do ia = R.int(2, ka === 2 ? 999 : 99); while (ia % 10 === 0);
  do ib = R.int(2, kb ? 99 : 30); while (kb && ib % 10 === 0);
  const a = dv(ia, ka), b = dv(ib, kb), k = ka + kb, r = rd(ia * ib / 10 ** k, k);
  return { q: S.m7.dc_q(`${H.dec(a)} ${H.mul} ${H.dec(b)}`), kind: "num", ans: r,
    sol: S.m7.dc_mul_s(H.dec(a), H.dec(b), ia, ib, H.n(ia * ib), k, H.dec(r)) };
});
// División larga de P / 10^s (dividendo) entre el natural d, cifra a cifra después de la parte entera.
// El cociente es exacto con kq cifras decimales. Devuelve las líneas de la solución.
function longDiv(S, H, P, s, d, kq) {
  const pw = 10 ** s, I = Math.floor(P / pw), decs = s ? String(P % pw).padStart(s, "0") : "";
  const lines = [];
  let r = I % d;
  lines.push(I < d ? S.m7.dc_ld_cero(H.n(I), d) : S.m7.dc_ld_ent(H.n(I), d, H.n(Math.floor(I / d)), r));
  for (let j = 1; j <= kq; j++) {
    const bajo = j <= s, next = bajo ? +decs[j - 1] : 0, num = r * 10 + next;
    lines.push(S.m7.dc_ld_paso(j === 1, bajo, next, num, d, Math.floor(num / d), num % d));
    r = num % d;
  }
  return lines;
}
def("m7.dec.div", (R, S, H) => {
  const kb = R.int(0, 2);
  let ib = R.int(2, kb ? 90 : 12);
  if (kb && ib % 10 === 0) return null;               // 0,50 se vería 0,5
  // Si el divisor no tiene coma, el cociente tiene decimales (nunca natural : natural exacta);
  // el dividendo, como mucho con tres cifras decimales
  const kq = kb ? R.int(0, Math.min(2, 3 - kb)) : R.int(1, 2);
  let iq = R.int(2, 300);
  if (kq && iq % 10 === 0) iq++;
  const b = dv(ib, kb), q = dv(iq, kq);
  // Dividendo exacto en enteros: P / 10^kq tras quitar la coma del divisor (= a · 10^kb)
  let P = ib * iq, s = kq;                            // a · 10^kb = P / 10^kq
  while (s && P % 10 === 0) { P /= 10; s--; }
  let A = ib * iq, sa = kb + kq;                      // a = A / 10^sa
  while (sa && A % 10 === 0) { A /= 10; sa--; }
  const a = dv(A, sa);
  if (a === Math.round(a) && !kb && !kq) return null;
  const steps = longDiv(S, H, P, s, ib, kq).join("<br>");
  let sol;
  if (kb) sol = S.m7.dc_div_s(H.dec(a), H.dec(b), 10 ** kb, H.dec(dv(P, s)), ib) + "<br>" + steps;
  else if (sa) sol = S.m7.dc_div_s1 + "<br>" + steps;
  else sol = S.m7.dc_div_s2 + "<br>" + steps;
  return { q: S.m7.dc_q(`${H.dec(a)} ${H.div} ${H.dec(b)}`), kind: "num", ans: q, sol: sol + "<br>" + S.m7.dc_ld_fin(H.dec(q)) };
});
def("m7.dec.pot10", (R, S, H) => {
  const k = R.int(1, 3), x = randDec(R, 100, R.int(1, 3)), mul = R.r() < 0.5;
  const r = mul ? rd(x * 10 ** k, 6) : rd(x / 10 ** k, 8);
  return { q: S.m7.dc_q(`${H.dec(x)} ${mul ? H.mul : H.div} ${H.n(10 ** k)}`), kind: "num", ans: r,
    sol: S.m7.dc_p10_s(mul ? "mul" : "div", k, S.m7.dc_p10_dir[mul ? 0 : 1], H.dec(r, 8)) };
});

// ── Aproximación ──────────────────────────────────────────────────────
def("m7.dec.redondeo", (R, S, H) => {
  const k = R.int(0, 2), nd = k + R.int(1, 3), I = R.int(1, 200 * 10 ** nd - 1), x = dv(I, nd);
  if (ndec(x) <= k) return null;
  // Todo con enteros: el número es I / 10^nd; se mira solo la cifra siguiente a la del redondeo
  const p = 10 ** (nd - k), cut = Math.floor(I / p), look = Math.floor(I / 10 ** (nd - k - 1)) % 10;
  const r = dv(look >= 5 ? cut + 1 : cut, k);
  return { q: S.m7.dc_red_q(H.dec(x), S.m7.dc_pos[k]), kind: "num", ans: r, sol: S.m7.dc_red_s(look, look >= 5, fixed(H, r, k)), ansHtml: fixed(H, r, k) };
});
def("m7.dec.truncar", (R, S, H) => {
  const k = R.int(1, 2), x = randDec(R, 100, k + R.int(1, 3));
  if (ndec(x) <= k) return null;
  const r = Math.floor(x * 10 ** k + 1e-9) / 10 ** k;
  return { q: S.m7.dc_trunc_q(H.dec(x), S.m7.dc_pos[k]), kind: "num", ans: r, sol: S.m7.dc_trunc_s(fixed(H, r, k)), ansHtml: fixed(H, r, k) };
});
def("m7.dec.comparar", (R, S, H) => {
  const base = R.int(0, 9), xs = new Set();
  while (xs.size < 4) { const k = R.int(1, 3); xs.add(rd(base + R.int(0, 10 ** k - 1) / 10 ** k, 3)); }
  const arr = R.shuffle([...xs]), big = R.r() < 0.5;
  const tgt = big ? Math.max(...arr) : Math.min(...arr);
  return { q: S.m7.dc_may_q(big), kind: "choice", opts: arr.map(x => H.dec(x)), correct: arr.indexOf(tgt),
    sol: S.m7.dc_may_s(arr.map(x => fixed(H, x, 3)).join(", "), H.dec(tgt)) };
});

// ── Fracciones y decimales ────────────────────────────────────────────
def("m7.dec.fracadec", (R, S, H) => {
  const d = R.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
  let n;
  do n = R.int(1, d * 3); while (gcd(n, d) !== 1);
  return { q: S.m7.dc_f2d_q(H.frac(n, d)), kind: "num", ans: rd(n / d, 6), sol: S.m7.dc_f2d_s(n, d, H.dec(n / d)) };
});
def("m7.dec.decafrac", (R, S, H) => {
  const k = R.int(1, 3);
  let i;
  do i = R.int(1, 10 ** k * 4); while (i % 10 === 0);
  const x = dv(i, k), r = F.make(i, 10 ** k);
  return { q: S.m7.dc_d2f_q(H.dec(x)), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp || "",
    sol: S.m7.dc_d2f_s(H.dec(x), H.frac(i, 10 ** k), F.html(r, H)) };
});
def("m7.dec.generatriz", (R, S, H) => {
  // periódico puro a,(bc) o mixto a,b(c)
  const pure = R.r() < 0.5, ip = R.int(0, 9);
  const ante = pure ? "" : String(R.int(1, 9));
  let per;
  do per = String(R.int(1, R.r() < 0.6 ? 9 : 99)); while (/^(\d)\1+$/.test(per) && per.length > 1);
  if (per === "9") per = "4";
  const all = +(String(ip) + ante + per), noPer = +(String(ip) + ante);
  const num = all - noPer, den = +("9".repeat(per.length) + "0".repeat(ante.length));
  const r = F.make(num, den);
  const sep = H.ds;
  const shown = `${ip}${sep}${ante}<span style="text-decoration:overline">${per}</span>`;
  return { q: S.m7.dc_gen_q(shown), kind: "frac", ans: r, simplest: true,
    sol: S.m7.dc_gen_s(`${all} − ${noPer} = ${num}`, S.m7.dc_gen_den(per.length, ante.length, den), H.frac(num, den), F.html(r, H)) };
});

// ── Problemas ─────────────────────────────────────────────────────────
def("m7.dec.problema", (R, S, H) => {
  const P = R.pick(S.m7.dc_prob);
  // euros siempre con dos decimales (2,50 €) y precios creíbles; se paga con el billete justo por encima
  if (P.k === "mul") { const n = R.int(2, 9), p = dv(R.int(30, 600), 2), r = rd(n * p, 2); return { q: P.q(n, fixed(H, p, 2), R.pick(S.m7.dc_units)), kind: "num", ans: r, sol: P.s(n, fixed(H, p, 2), fixed(H, r, 2)), ansHtml: fixed(H, r, 2) }; }
  if (P.k === "sub") { const a = dv(R.int(120, 9500), 2), b = [5, 10, 20, 50, 100].find(x => x > a), r = rd(b - a, 2); return { q: P.q(fixed(H, a, 2), b), kind: "num", ans: r, sol: P.s(fixed(H, a, 2), b, fixed(H, r, 2)), ansHtml: fixed(H, r, 2) }; }
  const n = R.int(2, 8), each = dv(R.int(11, 250), 2), t = rd(n * each, 2);
  return { q: P.q(H.dec(t), n), kind: "num", ans: each, sol: P.s(H.dec(t), n, H.dec(each)) };
});
})();
