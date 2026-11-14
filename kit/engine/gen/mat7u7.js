/* WikiAula — Matemáticas, Grado 7 · Unidad 7: Expresiones algebraicas y ecuaciones.
   Textos: i18n/<lang>/mat7u7.js (S.m7). Respuestas algebraicas con kind "expr". */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, polyHtml, polyText, lin } = WA.MATH;   // lin(a, b) → "ax + b" (gen/_common.js)
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pp = n => n < 0 ? `(${neg(n)})` : String(n);

// ── Patrones: encontrar la regla «dn + b» (todo positivo, como en la lección) ──
const reglaTxt = (d, b) => `${d}n${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;
def("m7.pat.regla", (R, S, H) => {
  const k = R.r();
  if (k < 0.4) {   // la regla de una secuencia
    const d = R.int(2, 9), a1 = R.int(1, 15), b = a1 - d, t = [1, 2, 3, 4].map(n => d * n + b);
    return { q: S.m7.pat_q0(t.join(", ")), kind: "expr", vars: ["n"], ans: `${d}*n${b < 0 ? "-" : "+"}${Math.abs(b)}`, ansHtml: reglaTxt(d, b), hint: S.m7.pat_hint,
      sol: S.m7.pat_s0(d, [1, 2, 3, 4].map(n => d * n).join(", "), b, reglaTxt(d, b), d * 3 + b) };
  }
  const c = R.pick(S.m7.pat_ctx), d = c.d, b = c.a1 - d, t = [1, 2, 3].map(n => d * n + b), N = R.int(8, 40);
  if (k < 0.7) {   // de la figura n al número de objetos
    const r = d * N + b;
    return { q: S.m7.pat_q1(c, t, N), kind: "int", ans: r, sol: S.m7.pat_s1(c, b, reglaTxt(d, b), N, r) };
  }
  const T = d * N + b;   // al revés: cuántas figuras con T objetos
  return { q: S.m7.pat_q2(c, t, T), kind: "int", ans: N, sol: S.m7.pat_s2(c, b, reglaTxt(d, b), T, N) };
});

// ── Lenguaje algebraico ───────────────────────────────────────────────
def("m7.al.traducir", (R, S, H) => {
  const [t, ok, bad, why] = R.pick(S.m7.al_trad);
  const opts = R.shuffle([ok, ...bad]);
  return { q: S.m7.al_trad_q(t), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m7.al_trad_s(ok, why) };
});
// Valor numérico «por pisos», como el Ejemplo 2 de la lección: sustituir, potencia, productos, sumas.
const sumTxt = ts => ts.map((t, i) => i ? (t < 0 ? " − " : " + ") + Math.abs(t) : neg(t)).join("");   // [8, 6, 1] → «8 + 6 + 1»
const coefDot = a => a === 1 ? "" : a === -1 ? "−" : neg(a) + " · ";                            // delante de un paréntesis
def("m7.al.valor", (R, S, H) => {
  const v = rnz(R, -5, 6), kind = R.int(0, 2), L = S.m7.al_val_l, lines = [];
  let e, r;
  if (kind === 0) {   // ax + b
    const a = rnz(R, -7, 9), b = rnz(R, -12, 12), p = a * v;
    e = lin(a, b); r = p + b;
    lines.push(L.sust(`${coefDot(a)}${pp(v)}${b < 0 ? " − " : " + "}${Math.abs(b)}`, v < 0));
    if (a !== 1) lines.push(L.prod(`${coefDot(a)}${pp(v)} = ${neg(p)}`));
    lines.push(L.fin(`${sumTxt([p, b])} = <b>${neg(r)}</b>`));
  } else if (kind === 1) {   // ax² + bx + c
    const a = rnz(R, -4, 5), b = R.int(-6, 6), c = R.int(-9, 9), v2 = v * v, p1 = a * v2, p2 = b * v;
    e = polyHtml([a, b, c], "x", { html: true }); r = p1 + p2 + c;
    const bx = w => b ? (b < 0 ? " − " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b) + " · ") + w : "";
    const cc = c ? (c < 0 ? " − " : " + ") + Math.abs(c) : "";
    lines.push(L.sust(`${coefDot(a)}${pp(v)}<sup>2</sup>${bx(pp(v))}${cc}`, v < 0));
    lines.push(L.pot(`${pp(v)}<sup>2</sup> = ${v2}`, `${coefDot(a)}${v2}${bx(pp(v))}${cc}`));
    const prods = [];
    if (Math.abs(a) !== 1) prods.push(`${neg(a)} · ${v2} = ${neg(p1)}`);
    if (Math.abs(b) > 1 || (b === -1 && v < 0)) prods.push(`${b === -1 ? "−" : neg(b) + " · "}${pp(v)} = ${p2 > 0 && b < 0 ? "+" : ""}${neg(p2)}`);
    if (prods.length) lines.push(L.prod(prods.join(L.y)));
    lines.push(L.fin(`${sumTxt([p1, p2, c].filter((t, i) => i === 0 || (i === 1 ? b : c)))} = <b>${neg(r)}</b>`));
  } else {   // a(x + b), siempre con un número delante (sin paréntesis sobrantes ni dobles)
    const a = R.pick([-5, -4, -3, -2, -1, 2, 3, 4, 5]), b = rnz(R, -6, 6), s = v + b;
    e = `${a === -1 ? "−" : neg(a)}(x${b < 0 ? " − " : " + "}${Math.abs(b)})`; r = a * s;
    lines.push(L.sust(`${coefDot(a)}(${neg(v)}${b < 0 ? " − " : " + "}${Math.abs(b)})`, false));
    lines.push(L.par(`${neg(v)}${b < 0 ? " − " : " + "}${Math.abs(b)} = ${neg(s)}`));
    lines.push(L.prod(`${coefDot(a)}${pp(s)} = <b>${neg(r)}</b>`));
  }
  return { q: S.m7.al_val_q(e, `x = ${neg(v)}`), kind: "int", ans: r, sol: lines.join("<br>") };
});
def("m7.al.monomio", (R, S, H) => {
  const c = rnz(R, -12, 12), ex = R.int(1, 5), ey = R.r() < 0.5 ? R.int(1, 3) : 0;
  const lit = `x${ex > 1 ? `<sup>${ex}</sup>` : ""}${ey ? `y${ey > 1 ? `<sup>${ey}</sup>` : ""}` : ""}`;
  const m = `${c === 1 ? "" : c === -1 ? "−" : neg(c)}${lit}`;
  return { q: S.m7.al_mono_q(m), kind: "fields", fields: [{ label: S.m7.al_mono_f[0], ans: c }, { label: S.m7.al_mono_f[1], ans: ex + ey }],
    sol: S.m7.al_mono_s(neg(c), ex, ey) };
});

// ── Monomios ──────────────────────────────────────────────────────────
const lit = (v, e) => e === 0 ? "" : e === 1 ? v : `${v}<sup>${e}</sup>`;
const mono = (c, v, e) => e === 0 ? neg(c) : `${c === 1 ? "" : c === -1 ? "−" : neg(c)}${lit(v, e)}`;
const monoText = (c, v, e) => e === 0 ? String(c) : `${c}*${v}^${e}`;
def("m7.al.semejantes", (R, S, H) => {
  const e = R.int(1, 3), n = R.int(2, 4), cs = Array.from({ length: n }, () => rnz(R, -9, 9));
  const sum = cs.reduce((a, b) => a + b, 0);
  const q = cs.map((c, i) => i ? (c < 0 ? " − " : " + ") + mono(Math.abs(c), "x", e) : mono(c, "x", e)).join("");
  return { q: S.m7.al_q(q), kind: "expr", ans: monoText(sum, "x", e), ansHtml: sum ? mono(sum, "x", e) : "0", hint: S.m7.al_hint,
    sol: S.m7.al_sem_s(cs.map((c, i) => i ? (c < 0 ? " − " + Math.abs(c) : " + " + c) : neg(c)).join("") + " = " + neg(sum), sum ? mono(sum, "x", e) : "0") };
});
def("m7.al.prodmono", (R, S, H) => {
  const a = rnz(R, -8, 8), b = rnz(R, -8, 8), m = R.int(1, 5), n = R.int(1, 5);
  if (R.r() < 0.6) {
    const c = a * b, e = m + n;
    return { q: S.m7.al_q(`(${mono(a, "x", m)}) ${H.mul} (${mono(b, "x", n)})`), kind: "expr", ans: monoText(c, "x", e), ansHtml: mono(c, "x", e), hint: S.m7.al_hint,
      sol: S.m7.al_prod_s(`${neg(a)} · ${pp(b)} = ${neg(c)}`, `${m} + ${n} = ${e}`, mono(c, "x", e)) };
  }
  // cociente exacto
  const c = rnz(R, -6, 6), d = rnz(R, -5, 5), num = c * d, mm = n + R.int(0, 4);
  const e = mm - n;
  return { q: S.m7.al_q(`(${mono(num, "x", mm)}) ${H.div} (${mono(d, "x", n)})`), kind: "expr", ans: monoText(c, "x", e), ansHtml: mono(c, "x", e), hint: S.m7.al_hint,
    sol: S.m7.al_coc_s(`${neg(num)} ${WA.H.div} ${pp(d)} = ${neg(c)}`, `${mm} − ${n} = ${e}`, mono(c, "x", e), e === 0) };
});
def("m7.al.reducir", (R, S, H) => {
  // ax² + bx + c mezclados en 5-6 términos
  const terms = [];
  const tot = [0, 0, 0];
  const n = R.int(4, 6);
  for (let i = 0; i < n; i++) {
    const g = R.pick([2, 1, 1, 0, 0]), c = rnz(R, -9, 9);
    terms.push([g, c]); tot[2 - g] += c;
  }
  if (!terms.some(t => t[0] === 1) || tot.every(x => !x)) return null;
  const q = terms.map(([g, c], i) => i ? (c < 0 ? " − " : " + ") + mono(Math.abs(c), "x", g) : mono(c, "x", g)).join("");
  // Cada grupo: un término solo (con su signo, sin «+ −») o (suma de coeficientes)·parte literal
  const groups = [2, 1, 0].filter(g => terms.some(t => t[0] === g)).map((g, i) => {
    const cs = terms.filter(t => t[0] === g).map(t => t[1]);
    if (cs.length === 1) return i ? (cs[0] < 0 ? " − " : " + ") + mono(Math.abs(cs[0]), "x", g) : mono(cs[0], "x", g);
    return (i ? " + " : "") + `(${cs.map((c, j) => j ? (c < 0 ? " − " + Math.abs(c) : " + " + c) : neg(c)).join("")})${lit("x", g)}`;
  }).join("");
  return { q: S.m7.al_q(q), kind: "expr", ans: polyText(tot), ansHtml: polyHtml(tot, "x", { html: true }), hint: S.m7.al_hint,
    sol: S.m7.al_red_s(groups, polyHtml(tot, "x", { html: true })) };
});
def("m7.al.parentesis", (R, S, H) => {
  const a = rnz(R, -6, 6), b = rnz(R, -5, 5), c = rnz(R, -9, 9), d = R.int(-9, 9);
  // a(bx + c) + d·x  → (ab + d)x + ac
  const q = `${a === 1 ? "" : a === -1 ? "−" : neg(a)}(${lin(b, c)})${d ? (d < 0 ? " − " : " + ") + (Math.abs(d) === 1 ? "x" : Math.abs(d) + "x") : ""}`;
  const res = [a * b + d, a * c];
  const step = `${lin(a * b, a * c)}${d ? (d < 0 ? " − " : " + ") + (Math.abs(d) === 1 ? "x" : Math.abs(d) + "x") : ""}`;
  return { q: S.m7.al_q(q), kind: "expr", ans: polyText(res), ansHtml: polyHtml(res, "x", { html: true }), hint: S.m7.al_hint, sol: S.m7.al_par_s(a, step, polyHtml(res, "x", { html: true }), !!d) };
});

// ── Ecuaciones de primer grado ────────────────────────────────────────
function linearSteps(a, b, c, d) {   // ax + b = cx + d, con a ≠ c
  const A = a - c, B = d - b, x = B / A;
  const lines = [];
  // No se repite una línea igual a la anterior (p. ej. «x = 3» y «x = 3»)
  const push = l => { if (l.replace(/<\/?b>/g, "") !== (lines[lines.length - 1] || "").replace(/<\/?b>/g, "")) lines.push(l); else lines[lines.length - 1] = l; };
  push(`${lin(a, b)} = ${lin(c, d)}`);
  if (c) push(`${lin(a, 0)} ${c < 0 ? "+ " + (Math.abs(c) === 1 ? "x" : Math.abs(c) + "x") : "− " + (c === 1 ? "x" : c + "x")} = ${neg(d)} ${b < 0 ? "+ " + Math.abs(b) : "− " + b}`.replace(/ [+−] 0$/, ""));
  else if (b) push(`${lin(a, 0)} = ${neg(d)} ${b < 0 ? "+ " + Math.abs(b) : "− " + b}`);
  push(`${lin(A, 0)} = ${neg(B)}`);
  if (A !== 1) push(`x = ${neg(B)} ${WA.H.div} ${pp(A)}`);
  push(`<b>x = ${neg(x)}</b>`);
  return lines;
}
def("m7.ec.simple", (R, S, H) => {
  // Como en la lección: casi siempre coeficiente y solución positivos; uno de cada tres, con negativos (Ejemplo 5)
  const x = R.r() < 0.7 ? R.int(1, 12) : R.int(-10, -1), a = R.r() < 0.7 ? R.int(1, 9) : R.int(-9, -1), b = R.int(-20, 20);
  if (a === 1 && !b) return null;
  const d = a * x + b;
  const lines = linearSteps(a, b, 0, d);
  return { q: S.m7.ec_q(`${lin(a, b)} = ${neg(d)}`), kind: "int", ans: x, hint: S.m7.ec_hint,
    sol: S.m7.ec_steps + "<br>" + lines.join("<br>") };
});
def("m7.ec.ambos", (R, S, H) => {
  const x = R.r() < 0.7 ? R.int(1, 10) : R.int(-9, -1);
  let a, c;
  do { a = rnz(R, -9, 9); c = rnz(R, -9, 9); } while (a === c);
  if (a < c && R.r() < 0.5) [a, c] = [c, a];   // las x quedan con coeficiente negativo solo uno de cada cuatro
  const b = R.int(-20, 20), d = (a - c) * x + b;
  const lines = linearSteps(a, b, c, d);
  return { q: S.m7.ec_q(`${lin(a, b)} = ${lin(c, d)}`), kind: "int", ans: x, hint: S.m7.ec_hint,
    sol: S.m7.ec_steps + "<br>" + lines.join("<br>") + "<br>" + S.m7.ec_check(neg(x), neg(a * x + b), neg(c * x + d)) };
});
def("m7.ec.parentesis", (R, S, H) => {
  const x = rnz(R, -8, 9), p = rnz(R, -6, 6), q = rnz(R, -7, 7), c = R.int(-4, 5);
  let r = R.int(-10, 10);
  // p(x + q) + r = c·x + d
  if (p === c) return null;
  const d = p * (x + q) + r - c * x;
  const left = `${p === 1 ? "" : p === -1 ? "−" : neg(p)}(x${q < 0 ? " − " : " + "}${Math.abs(q)})${r ? (r < 0 ? " − " : " + ") + Math.abs(r) : ""}`;
  const right = lin(c, d);
  const exp = `${lin(p, p * q + r)} = ${right}`;
  const lines = linearSteps(p, p * q + r, c, d);
  lines[0] = exp;
  return { q: S.m7.ec_q(`${left} = ${right}`), kind: "int", ans: x, hint: S.m7.ec_hint,
    sol: `${S.m7.al_par_s(p, lin(p, p * q) + (r ? (r < 0 ? " − " : " + ") + Math.abs(r) : ""), lin(p, p * q + r), !!r)}<br>${S.m7.ec_steps}<br>${lines.join("<br>")}` };
});
def("m7.ec.denominador", (R, S, H) => {
  const a = R.pick([2, 3, 4, 5, 6]), k = rnz(R, -8, 9), x = a * k, b = R.int(-9, 9), c = k + b;
  const q = `${H.frac("x", a)}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""} = ${neg(c)}`;
  // Primero se deja sola la fracción (si hay número que pasar); después, lo que divide pasa multiplicando
  const sol = [...(b ? [`${H.frac("x", a)} = ${neg(c)}${b < 0 ? " + " : " − "}${Math.abs(b)}`, `${H.frac("x", a)} = ${neg(k)}`] : []), `x = ${neg(k)} · ${a}`, `<b>x = ${neg(x)}</b>`];
  return { q: S.m7.ec_q(q), kind: "int", ans: x, hint: S.m7.ec_hint, sol: S.m7.ec_den_steps(a, !!b) + "<br>" + sol.join("<br>") };
});
def("m7.ec.essol", (R, S, H) => {
  const x = rnz(R, -6, 7);
  let a, c;
  do { a = rnz(R, -6, 6); c = rnz(R, -6, 6); } while (a === c);
  const b = R.int(-12, 12), d = (a - c) * x + b;
  const yes = R.r() < 0.5, v = yes ? x : x + R.pick([1, -1, 2, -2]);
  const l = a * v + b, r = c * v + d;
  return { q: S.m7.ec_sol_q(`${lin(a, b)} = ${lin(c, d)}`, neg(v)), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: l === r ? 0 : 1, shuffle: false,
    sol: S.m7.ec_sol_s(neg(v), neg(l), neg(r), l === r) };
});
def("m7.ec.problema", (R, S, H) => {
  const P = S.m7.ec_prob, k = R.int(0, P.length - 1), p = P[k];
  if (k === 0) { const x = R.int(5, 60), s = 3 * x + 3; return { q: p.q(s), kind: "int", ans: x, sol: p.s(s, x) }; }
  if (k === 1) { const a = R.int(2, 9), x = R.int(5, 30), y = 2 * x + a; return { q: p.q(a, 0, y), kind: "int", ans: x, sol: p.s(a, y, x) }; }
  if (k === 2) { const kk = R.int(2, 12), x = R.int(3, 25), per = 4 * x + 2 * kk; return { q: p.q(per, kk), kind: "int", ans: x, sol: p.s(per, kk, x) }; }
  if (k === 3) { const kk = R.pick([0, 0, 10, 20, 30]), x = R.int(5, 60) * 5, t = 4 * x + kk; return { q: p.q(t, kk), kind: "int", ans: x, sol: p.s(t, kk, x) }; }
  const x = R.int(3, 60), r = 3 * x;
  return { q: p.q(0, r), kind: "int", ans: x, sol: p.s(r, x) };
});
// Problemas de la lección que m7.ec.problema (lo usa 8.º) no tiene: edades con tabla y «dos cosas con un total»
def("m7.ec.plantea", (R, S, H) => {
  const P = S.m7.plant;
  if (R.r() < 0.5) {   // edades: dentro de x años, el mayor tendrá k veces la edad del pequeño
    // La diferencia de edad, M − h = (k − 1)(h + x), entre 20 y 45 años; h de 2 a 14 y x de 1 a 15
    const k = R.pick([2, 3, 3, 4]), smin = Math.ceil(20 / (k - 1)), smax = Math.floor(45 / (k - 1));
    const x = R.int(Math.max(1, smin - 14), Math.min(15, smax - 2)), sum = R.int(Math.max(smin, x + 2), Math.min(smax, x + 14));
    const h = sum - x, M = k * (h + x) - x;
    const par = R.pick(P.parejas);
    return { q: P.edad_q(par, M, h, k), kind: "int", ans: x,
      sol: P.edad_s(par, M, h, k, x, M - k * h, k - 1) };
  }
  const c = R.pick(P.ctx), n = R.int(c.n[0], c.n[1]), x = R.int(2, n - 2), tot = c.A * x + c.B * (n - x);
  const big = R.r() < 0.6;
  return { q: P.dos_q(c, n, tot, big), kind: "int", ans: big ? x : n - x,
    sol: P.dos_s(c, n, tot, x, big) };
});
})();
