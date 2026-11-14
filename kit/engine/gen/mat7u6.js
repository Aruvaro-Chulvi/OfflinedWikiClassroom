/* WikiAula — Matemáticas, Grado 7 · Unidad 6: Proporcionalidad y porcentajes.
   Textos: i18n/<lang>/mat7u6.js (S.m7). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { F, gcd } = WA.MATH;
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;

// ── Razón y proporción ────────────────────────────────────────────────
def("m7.pr.razon", (R, S, H) => {
  const [A, B, L] = R.pick(S.m7.pr_pares);
  let a, b;
  do { a = R.int(2, 30); b = R.int(2, 30); } while (a === b || gcd(a, b) === 1 && R.r() < 0.6);
  const r = F.make(a, b);
  return { q: S.m7.pr_razon_q(a, A, b, B, L), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol: S.m7.pr_razon_s(a, b, F.html(r, H), gcd(a, b) === 1) };
});
def("m7.pr.cuarto", (R, S, H) => {
  const a = R.int(2, 12), k = R.int(2, 9);
  let b; do b = R.int(2, 15); while (b === a);   // sin razones 1 (5/5 = 35/x)
  const c = a * k, x = b * k;
  const pos = R.int(0, 3), vals = [a, b, c, x];
  const hole = "x";
  const v = vals.map((n, i) => i === pos ? hole : n);
  const e = `${H.frac(v[0], v[1])} = ${H.frac(v[2], v[3])}`;
  const cross = pos < 2 ? `${pos === 0 ? "x" : vals[0]} · ${pos === 1 ? "x" : vals[3]} = ${pos === 0 ? vals[1] : vals[0]} · ${vals[2]}`.replace(/^(\d+) · x = /, "x · $1 = ") : "";
  const sol = pos === 0 ? `x · ${x} = ${b} · ${c} → x = ${b * c} ${WA.H.div} ${x}` : pos === 1 ? `${a} · ${x} = x · ${c} → x = ${a * x} ${WA.H.div} ${c}`
    : pos === 2 ? `${a} · ${x} = ${b} · x → x = ${a * x} ${WA.H.div} ${b}` : `${a} · x = ${b} · ${c} → x = ${b * c} ${WA.H.div} ${a}`;
  return { q: S.m7.pr_cuarto_q(e), kind: "int", ans: vals[pos], sol: S.m7.pr_cuarto_s(sol, vals[pos]) };
});
def("m7.pr.esprop", (R, S, H) => {
  const a = R.int(2, 12), b = R.int(2, 15), k = R.int(2, 6), yes = R.r() < 0.5;
  let c = a * k, d = b * k;
  if (!yes) d += R.pick([1, -1, 2]);
  const ok = a * d === b * c;
  return { q: S.m7.pr_esprop_q(H.frac(a, b), H.frac(c, d)), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: ok ? 0 : 1, shuffle: false,
    sol: S.m7.pr_esprop_s(`${a} · ${d} = ${a * d}`, `${b} · ${c} = ${b * c}`, ok) };
});

// ── Directa e inversa ─────────────────────────────────────────────────
def("m7.pr.directa", (R, S, H) => {
  // datos creíbles para cada historia (nada de «8 litros cada 2 km»): ver S.m7.pr_dir
  const P = R.pick(S.m7.pr_dir), [a0, a1] = P.a || [2, 8], [b0, b1] = P.b || [2, 15], unit = R.pick(P.unit || [2, 3, 4, 5, 6, 12, 15, 20]);
  const a = R.int(a0, a1);
  let b; do b = R.int(b0, b1); while (b === a);
  const A = rd(a * unit, 2), r = rd(b * unit, 2), f = x => P.eur ? WA.MATH.eur(x, H) : H.dec(x);
  return Object.assign({ q: P.q(a, f(A), b), kind: "num", ans: r, sol: S.m7.pr_dir_s(a, f(A), b, { unit: f(unit), v: P.eur ? H.money(r) : f(r) + (P.u ? " " + P.u : ""), per: P.per, d: P.d, m: !!P.eur }) },
    P.eur ? { ansHtml: H.money(r) } : {});
});
def("m7.pr.inversa", (R, S, H) => {
  const P = R.pick(S.m7.pr_inv);
  const kmh = P.q(1, 1, 1).includes("km/h");
  for (;;) {
    // datos creíbles: velocidades de 60 a 120 km/h y viajes de 2 a 8 horas; el nuevo número, entre un tercio y el triple
    // del primero (y no más de 24), y el resultado al menos 2
    const a = kmh ? R.int(6, 12) : R.int(2, 12), A = kmh ? R.int(2, 8) : R.int(2, 30), p = a * A;
    const divs = [];
    for (let d = Math.max(kmh ? 6 : 2, Math.ceil(a / 3)); d <= Math.min(p, 3 * a, kmh ? 12 : 24); d++) if (p % d === 0 && d !== a && p / d !== A && p / d >= 2) divs.push(d);
    if (!divs.length) continue;
    const b = R.pick(divs);
    if (P.q(1, 1, 1).includes("km/h")) { const s = a * 10, S2 = b * 10; if (p * 10 % S2) continue; return { q: P.q(s, A, S2), kind: "num", ans: rd(s * A / S2, 4), sol: S.m7.pr_inv_s(s, A, S2, s * A, H.dec(rd(s * A / S2, 4))) }; }
    return { q: P.q(a, A, b), kind: "int", ans: p / b, sol: S.m7.pr_inv_s(a, A, b, p, p / b) };
  }
});
def("m7.pr.tipo", (R, S, H) => {
  const [s, k] = R.pick(S.m7.pr_tipo_items);
  return { q: S.m7.pr_tipo_q(s), kind: "choice", opts: S.m7.pr_tipos, correct: k, shuffle: false, sol: S.m7.pr_tipo_s[k] };
});
def("m7.pr.tabla", (R, S, H) => {
  // tabla de valores directa o inversa con un hueco
  const inv = R.r() < 0.4, k = R.int(2, 12);
  const xs = R.shuffle(inv ? [1, 2, 3, 4, 6, 8, 12] : [1, 2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 4).sort((p, q) => p - q);
  const P = k * 24;
  const ys = xs.map(x => inv ? P / x : k * x);
  const hole = R.int(1, 3);
  const cell = (v, i) => `<td style="border:1px solid #a2a9b1;padding:4px 10px;text-align:center">${i === hole ? '<span class="wa-hole">□</span>' : v}</td>`;
  const tbl = `<table style="border-collapse:collapse;margin:6px 0"><tr><th style="border:1px solid #a2a9b1;padding:4px 8px">A</th>${xs.map(x => cell(x, -1)).join("")}</tr><tr><th style="border:1px solid #a2a9b1;padding:4px 8px">B</th>${ys.map(cell).join("")}</tr></table>`;
  return { q: S.m7.pr_tabla_q(inv, tbl), kind: "int", ans: ys[hole],
    sol: S.m7.pr_tabla_s(inv, xs[0], ys[0], P, k, xs[hole], ys[hole]) };
});

// ── Porcentajes ───────────────────────────────────────────────────────
def("m7.pc.de", (R, S, H) => {
  const p = R.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75, 80, 4, 8, 16]), c = R.int(2, 60) * R.pick([5, 10, 20, 25]);
  const r = rd(c * p / 100, 2);
  return { q: S.m7.pc_q(S.m7.pc_de_e(p, H.n(c))), kind: "num", ans: r, sol: S.m7.pc_de_s(p, H.n(c), H.dec(r)) };
});
def("m7.pc.que", (R, S, H) => {
  let a, b, p;
  do { b = R.pick([20, 25, 40, 50, 80, 200, 250, 400, 500, 120, 60]); p = R.pick([5, 10, 15, 20, 25, 30, 40, 45, 60, 75, 80, 90]); a = b * p / 100; } while (!Number.isInteger(a));
  return { q: S.m7.pc_que_q(H.n(a), H.n(b)), kind: "num", ans: p, hint: S.m7.pc_hint_pct, sol: S.m7.pc_que_s(H.n(a), H.n(b), p) };
});
def("m7.pc.total", (R, S, H) => {
  const p = R.pick([5, 10, 20, 25, 30, 40, 50, 60, 75, 80]), t = R.int(2, 50) * 20, a = t * p / 100;
  return { q: S.m7.pc_tot_q(p, H.n(a)), kind: "num", ans: t, sol: S.m7.pc_tot_s(p, H.n(a), H.n(t)) };
});
def("m7.pc.aumento", (R, S, H) => {
  const up = R.r() < 0.45, p = R.pick([5, 10, 12, 15, 20, 25, 30, 40, 50]), f = 100 + (up ? p : -p);
  // En céntimos y con enteros: el precio nuevo tiene que salir exacto, sin medios céntimos
  let c;
  do c = R.int(10, 400) * R.pick([100, 50, 25, 10]); while ((c * f) % 100 !== 0);
  const x = c / 100, i = f / 100, r = (c * f / 100) / 100;
  const E = v => WA.MATH.eur(v, H);   // importes con dos decimales: 19,90 €
  return { q: S.m7.pc_aum_q(E(x), p, up), kind: "num", ans: r, tol: 0.006, ansHtml: H.money(r), sol: S.m7.pc_aum_s(E(x), H.dec(i), E(r), up) };
});
def("m7.pc.iva", (R, S, H) => {
  const p = R.pick(S.m7.pc_iva_p);
  let x; do x = R.int(10, 300) * 2; while (S.m7.pc_iva_no.includes(x));   // sin los importes de la lección del idioma
  const i = rd(1 + p / 100, 2), r = rd(x * i, 2);
  const E = v => WA.MATH.eur(v, H);
  return { q: S.m7.pc_iva_q(E(x), p), kind: "num", ans: r, tol: 0.006, ansHtml: H.money(r), sol: S.m7.pc_aum_s(E(x), H.dec(i), E(r), true) };
});
def("m7.pc.original", (R, S, H) => {
  const p = R.pick([10, 20, 25, 30, 40, 50, 60, 75]), x = R.int(2, 40) * 4 * 5, i = rd(1 - p / 100, 2), y = rd(x * i, 2);
  const E = v => WA.MATH.eur(v, H);
  return { q: S.m7.pc_orig_q(E(y), p), kind: "num", ans: x, tol: 0.006, ansHtml: H.money(x), sol: S.m7.pc_orig_s(E(y), H.dec(i), E(x)) };
});
def("m7.pc.convertir", (R, S, H) => {
  if (R.r() < 0.3) {
    // Fracción → porcentaje (el primer paso de la lección): denominadores que dan un decimal exacto
    let n, d;
    do { d = R.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]); n = R.int(1, d - 1); } while (gcd(n, d) !== 1);
    const x = n / d, pc = rd(x * 100, 4);
    return { q: S.m7.pc_conv_q3(H.frac(n, d)), kind: "num", ans: pc, hint: S.m7.pc_hint_pct, sol: S.m7.pc_conv_s3(n, d, H.dec(x), H.dec(pc)) };
  }
  if (R.r() < 0.5) {
    const p = R.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 64, 75, 80, 125, 150]), r = F.make(p, 100);
    return { q: S.m7.pc_conv_q1(p), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol: S.m7.pc_conv_s1(p, F.html(r, H)) };
  }
  const x = rd(R.int(1, 250) / 100, 2) || 0.5;
  return { q: S.m7.pc_conv_q2(H.dec(x)), kind: "num", ans: rd(x * 100, 4), hint: S.m7.pc_hint_pct, sol: S.m7.pc_conv_s2(H.dec(x), H.dec(rd(x * 100, 4))) };
});
})();
