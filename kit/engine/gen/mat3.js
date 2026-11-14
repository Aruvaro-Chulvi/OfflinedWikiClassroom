/* WikiAula — Matemáticas, Grado 3 (3.º de Primaria).
   Textos: i18n/<lang>/mat3.js (S.m3). Dibujos: WA.SVG (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const { gcd } = WA.MATH;
const X = "×";
// Nombres de personas: S.m3.nombres (14, en el orden de i18n/es/mat3.js). El género va por posición:
// son chicas las de las posiciones 0, 2, 4, 6, 8, 10 y 12 (Lucía, Sara, Nora, Alba, Irene, Aisha, Mei)
const FEM_I = new Set([0, 2, 4, 6, 8, 10, 12]);
const digitAt = (n, p) => Math.floor(n / 10 ** p) % 10;

// ═════ Unidad 1 · Números hasta el 99 999 ═════
def("m3.millares", (R, S, H) => {
  const n = R.int(1000, 9999), ds = [3, 2, 1, 0].map(p => digitAt(n, p)), k = R.r();
  if (k < 0.3) {   // ¿cuántas decenas (o centenas) hay en…? — no es la cifra de la casilla
    if (R.r() < 0.5) {
      const m = R.int(101, 999) * 10, [a, b, c] = [3, 2, 1].map(p => digitAt(m, p));
      return { q: S.m3.cuantasd_q(H.n(m)), kind: "int", ans: m / 10, sol: S.m3.cuantasd_s(H.n(m), a, b, c, m / 10) };
    }
    const m = R.int(11, 99) * 100, [a, b] = [3, 2].map(p => digitAt(m, p));
    return { q: S.m3.cuantasc_q(H.n(m)), kind: "int", ans: m / 100, sol: S.m3.cuantasc_s(H.n(m), a, b, m / 100) };
  }
  if (k < 0.65) return { q: S.m3.um_q(H.n(n)), kind: "fields", fields: S.m3.um_f.map((label, i) => ({ label, ans: ds[i] })), sol: S.m3.um_s(H.n(n), ds) };
  const parts = ds.map((d, i) => d * 10 ** (3 - i)).filter(Boolean).map(v => H.n(v)).join(" + ");
  return { q: S.m3.desc_q(parts), kind: "int", ans: n, sol: S.m3.desc_s(parts, H.n(n)) };
});
def("m3.decmillar", (R, S, H, L) => {
  const n = R.int(10000, 99999), k = R.int(0, 2);
  if (k === 0) { let p; do p = R.int(0, 4); while (!digitAt(n, p)); const d = digitAt(n, p), v = d * 10 ** p; return { q: S.m3.valor_q(H.n(n), d, p), kind: "int", ans: v, sol: S.m3.valor_s(d, S.m3.pos[p], H.n(v)) }; }
  if (k === 1) return { q: S.m3.letras_q(L.words(n)), kind: "int", ans: n, sol: S.m3.letras_s(L.words(n), H.n(n)) };
  const set = new Set([n]); [n + 10000 > 99999 ? n - 10000 : n + 10000, n + 1000 > 99999 ? n - 1000 : n + 1000, n + 100 > 99999 ? n - 100 : n + 100].forEach(x => set.add(x));
  const opts = R.shuffle([...set].map(x => L.words(x)));
  return { q: S.m3.letras2_q(H.n(n)), kind: "choice", opts, correct: opts.indexOf(L.words(n)), sol: S.m3.letras_s(L.words(n), H.n(n)) };
});
// Número parecido a «a»: igual hasta la casilla p, distinto en p y con las cifras de la derecha al azar
function nearNum(R, a, p) {
  const len = String(a).length;
  for (let t = 0; t < 50; t++) {
    let b = Math.floor(a / 10 ** (p + 1)) * 10 ** (p + 1);
    let d; do d = R.int(0, 9); while (d === digitAt(a, p) || (p === len - 1 && d === 0));
    b += d * 10 ** p + R.int(0, 10 ** p - 1);
    if (b !== a && b >= 1000 && b <= 99999) return b;
  }
  return a + (a < 99000 ? 10 ** p : -(10 ** p));
}
// Pasos de la comparación: cuenta las cifras y, si son iguales, casilla a casilla hasta la primera distinta
function compSteps(S, H, a, b) {
  const la = String(a).length, lb = String(b).length;
  if (la !== lb) return S.m3.comp_len(H.n(a), la, H.n(b), lb);
  const st = [];
  for (let p = la - 1; p >= 0; p--) {
    const x = digitAt(a, p), y = digitAt(b, p);
    if (x === y) st.push(S.m3.comp_eq(p, x));
    else { st.push(S.m3.comp_dif(p, x, y)); break; }
  }
  return st.join(" ");
}
def("m3.comparar", (R, S, H) => {
  const k = R.r();
  if (k < 0.45) {   // dos números: a veces con distinto número de cifras, casi siempre parecidos
    let a, b;
    if (R.r() < 0.25) { a = R.int(1000, 9999); b = R.int(10000, 99999); if (R.r() < 0.5) [a, b] = [b, a]; }
    else { a = R.int(2000, 97999); b = nearNum(R, a, R.int(0, String(a).length - 1)); }
    const c = a > b ? 0 : 1;
    return { q: S.m3.comp_q(H.n(a), H.n(b)), kind: "choice", opts: [">", "<"], correct: c, shuffle: false, sol: S.m3.comp_s(compSteps(S, H, a, b), H.n(a), H.n(b), c) };
  }
  // cuatro números que empiezan igual (y, a veces, uno de cuatro cifras)
  const a0 = R.int(11, 98) * 1000 + R.int(0, 999), set = new Set([a0]);
  while (set.size < 4) set.add(R.r() < 0.15 && ![...set].some(x => x < 10000) ? R.int(1000, 9999) : nearNum(R, a0, R.int(0, 2)));
  const nums = R.shuffle([...set]), sorted = [...nums].sort((x, y) => x - y), lt = " &lt; ";
  if (k < 0.75) {
    const big = R.r() < 0.5, ans = big ? sorted[3] : sorted[0];
    return { q: (big ? S.m3.mayor_q : S.m3.menor_q)(nums.map(H.n).join(" · ")), kind: "choice", opts: nums.map(H.n), correct: nums.indexOf(ans), shuffle: false,
      sol: S.m3.orden_s(sorted.map(H.n).join(lt), H.n(ans)) };
  }
  // ordenar de menor a mayor: la buena y tres órdenes con dos números cambiados de sitio
  const good = sorted.map(H.n).join(lt), cands = [];
  for (const [i, j] of R.shuffle([[0, 1], [1, 2], [2, 3], [0, 3], [1, 3]])) { const o = sorted.slice(); [o[i], o[j]] = [o[j], o[i]]; cands.push(o.map(H.n).join(lt)); }
  const { opts, correct } = opt3(R, good, cands);
  return { q: S.m3.ordenar_q(nums.map(H.n).join(" · ")), kind: "choice", opts, correct, sol: S.m3.ordenar_s(compSteps(S, H, sorted[0], sorted[1]), compSteps(S, H, sorted[1], sorted[2]), compSteps(S, H, sorted[2], sorted[3]), good) };
});
def("m3.redondeo", (R, S, H) => {
  // sin pasar de 99 999 al redondear (99 500 a los millares daría 100 000, fuera del curso)
  const p = R.int(1, 3), top = 99999 - 5 * 10 ** (p - 1);
  let n = R.int(10 ** p + 1, top);
  if (R.r() < 0.25) {   // a menudo, el 9 que sube y arrastra a su vecina
    const hi = Math.floor(n / 10 ** (p + 1)), lo = R.int(5 * 10 ** (p - 1), 10 ** p - 1), m = hi * 10 ** (p + 1) + 9 * 10 ** p + lo;
    if (m <= top && m > 10 ** p) n = m;
  }
  const r = Math.round(n / 10 ** p) * 10 ** p, look = digitAt(n, p - 1), up = look >= 5;
  return { q: S.m3.red_q(H.n(n), S.m3.redp[p - 1]), kind: "int", ans: r, sol: S.m3.red_s(p, look, up, up && digitAt(n, p) === 9, H.n(r)) };
});
def("m3.ordinales", (R, S) => {
  // lo nuevo de 3.º es del 11.º al 20.º: salen más a menudo
  const n = R.r() < 0.6 ? R.int(10, 20) : R.int(1, 9), w = S.m3.ord[n - 1], k = R.r();
  if (k < 0.25) return { q: S.m3.ord2_q(w), kind: "int", ans: n, sol: S.m3.ord2_s(n, w) };
  if (k < 0.6) {
    const set = new Set([w]); while (set.size < 4) set.add(R.pick(S.m3.ord));
    const opts = R.shuffle([...set]);
    return { q: S.m3.ord_q(n), kind: "choice", opts, correct: opts.indexOf(w), sol: S.m3.ord_s(n, w) };
  }
  // el ordinal y el pronombre concuerdan con el nombre (la lección: «Mei es una niña: decimos quinta»)
  const N = R.pick(S.m3.nombres), fem = FEM_I.has(S.m3.nombres.indexOf(N)), j = R.int(1, 12), tot = R.int(j + 1, 20);
  return { q: S.m3.fila_q(N, tot, j, fem), kind: "int", ans: tot - j + 1, sol: S.m3.fila_s(tot, j, tot - j + 1, fem) };
});

// ═════ Unidad 2 · Suma y resta ═════
def("m3.sumaresta", (R, S, H) => {
  const add = R.r() < 0.5;
  let a = R.int(1000, 60000), b = R.int(500, 40000);
  if (!add && b > a) [a, b] = [b, a];
  const r = add ? a + b : a - b;
  if (add) {   // suma en columna, con los pasos de la lección: «escribo 3 y me llevo 1»
    const st = [], L = Math.max(String(a).length, String(b).length);
    let carry = 0;
    for (let p = 0; p < L || carry; p++) {
      const x = digitAt(a, p), y = digitAt(b, p), hx = p < String(a).length, hy = p < String(b).length, s = x + y + carry;
      st.push(S.m3.su_col(p, hx ? x : null, hy ? y : null, carry, s, p >= L - 1 && s >= 10));
      carry = s >= 10 ? 1 : 0;
      if (p >= L - 1) break;
    }
    return { q: S.m3.op_q(`${H.n(a)} + ${H.n(b)}`), kind: "int", ans: r, sol: S.m3.suma_s(st, H.n(r)) };
  }
  // La resta con el método de la lección (y de 2.º): si arriba hay menos, «le pongo un 1 delante y me llevo una»,
  // que se suma a la cifra de abajo de la columna siguiente. Se muestra columna a columna.
  const steps = [], L = String(a).length, Lb = String(b).length, Lr = String(r).length;
  let carry = 0;
  for (let p = 0; p < L; p++) {
    const top = digitAt(a, p), b0 = digitAt(b, p), has = p < Lb, bot = b0 + carry, borrow = top < bot, res = (borrow ? top + 10 : top) - bot;
    steps.push(S.m3.rs_col(p, top, b0, has, carry, borrow, res, p > 0 && p >= Lr));
    carry = borrow ? 1 : 0;
  }
  return { q: S.m3.op_q(`${H.n(a)} − ${H.n(b)}`), kind: "int", ans: r, sol: S.m3.resta_s(steps, H.n(a), H.n(b), H.n(r)) };
});
// Cálculo mental de 3.º: los trucos de la lección (±9/19/99/199, contar en centenas, decenas primero,
// restar contando hacia delante y parejas que suman 10 o 100)
def("m3.mental", (R, S, H) => {
  const T = S.m3.MN, k = R.r();
  if (k < 0.3) {   // truco del 9: sumar o restar 9, 19, 99 o 199
    const n = R.pick([9, 19, 99, 99, 199]), r10 = n + 1, add = R.r() < 0.55;
    const a = n < 99 ? R.int(23, 89) : R.int(n === 199 ? 215 : 112, 880);
    const r = add ? a + n : a - n, mid = add ? a + r10 : a - r10;
    return { q: T.q(`${H.n(a)} ${add ? "+" : "−"} ${n}`), kind: "int", ans: r, sol: T.nueve_s(add, n, r10, H.n(a), H.n(mid), H.n(r)) };
  }
  if (k < 0.55) {
    if (R.r() < 0.55) {   // números redondos: contar en centenas (placas de cien)
      const add = R.r() < 0.6, a = R.int(11, 89), b = R.int(2, 9), A = a * 100, B = b * 100;
      const r = add ? a + b : a - b;
      return { q: T.q(`${H.n(A)} ${add ? "+" : "−"} ${B}`), kind: "int", ans: r * 100, sol: T.cent_s(H.n(A), a, b, add, r, H.n(r * 100)) };
    }
    // dos números de dos cifras: primero las decenas y luego las unidades
    const a = R.int(23, 79);
    let b; do b = R.int(14, 68); while (b % 10 === 0);
    const d = Math.floor(b / 10) * 10, u = b % 10;
    return { q: T.q(`${a} + ${b}`), kind: "int", ans: a + b, sol: T.desc_s(a, b, d, u, a + d, a + b) };
  }
  if (k < 0.85) {   // restar números cercanos contando hacia delante (como la cajera)
    const big = R.r() < 0.4;
    let a, b; do { a = big ? R.int(121, 980) : R.int(41, 98); b = a - R.int(12, 39); } while (b % 10 === 0 || a % 10 === 0);
    const t1 = Math.ceil(b / 10) * 10, t2 = Math.floor(a / 10) * 10;
    const jumps = t2 > t1 ? [[b, t1], [t1, t2], [t2, a]] : [[b, t1], [t1, a]];
    return { q: T.q(`${H.n(a)} − ${H.n(b)}`), kind: "int", ans: a - b, sol: T.contar_s(jumps.map(([x, y]) => T.salto(H.n(x), H.n(y), y - x)), jumps.map(([x, y]) => y - x).join(" + "), a - b) };
  }
  // parejas que suman 10 o 100
  const hund = R.r() < 0.5;
  const x = hund ? R.int(1, 9) * 10 : R.int(1, 9), y = (hund ? 100 : 10) - x;
  let m; do m = hund ? R.int(11, 89) : R.int(2, 9); while (m === x || m === y);
  const order = R.shuffle([0, 1]), terms = order[0] ? [x, m, y] : [y, m, x];
  return { q: T.q(terms.join(" + ")), kind: "int", ans: x + y + m, sol: T.par_s(terms[0], terms[2], terms[1], x + y, x + y + m) };
});
def("m3.estimar", (R, S, H) => {
  const add = R.r() < 0.6, p = R.r() < 0.5 ? 2 : 3;
  let a, b;
  let ra, rb, e, exact;
  do {   // la estimación tiene que quedar de verdad cerca del resultado exacto (a 1/4 como mucho): la solución lo dice
    a = R.int(10 ** p, 9 * 10 ** p); b = R.int(10 ** p, 9 * 10 ** p);
    if (!add && b > a) [a, b] = [b, a];
    ra = Math.round(a / 10 ** p) * 10 ** p; rb = Math.round(b / 10 ** p) * 10 ** p;
    e = add ? ra + rb : ra - rb; exact = add ? a + b : a - b;
  } while (e <= 0 || Math.abs(e - exact) * 4 > exact);
  return { q: S.m3.est_q(`${H.n(a)} ${add ? "+" : "−"} ${H.n(b)}`, S.m3.redp[p - 1]), kind: "int", ans: e, sol: S.m3.est_s(H.n(ra), H.n(rb), add, H.n(e), H.n(exact)) };
});
def("m3.problemas", (R, S, H) => {
  const k = R.int(0, 3), N = R.pick(S.m3.nombres);
  if (k === 0) { let a, b, c; do { a = R.int(200, 900); b = R.int(50, 300); c = R.int(50, 300); } while (b + c > a - 10); return { q: S.m3.pb_q[0](N, a, b, c), kind: "int", ans: a - b - c, sol: S.m3.pb_s[0](a, b, c, a - b, a - b - c) }; }
  if (k === 1) { const n = R.int(2, 6), p = R.int(4, 9), pay = [10, 20, 50, 100].find(x => x > n * p); return { q: S.m3.pb_q[1](N, n, p, pay), kind: "int", ans: pay - n * p, sol: S.m3.pb_s[1](n, p, n * p, pay, pay - n * p) }; }
  if (k === 2) { const a = R.int(1200, 5000), b = R.int(100, 900); return { q: S.m3.pb_q[2](H.n(a), H.n(b)), kind: "int", ans: 2 * a + b, sol: S.m3.pb_s[2](H.n(a), H.n(a + b), H.n(2 * a + b)) }; }
  const f = R.int(3, 8), m = R.int(4, 9), g = R.int(2, f * m - 1); return { q: S.m3.pb_q[3](f, m, g), kind: "int", ans: f * m - g, sol: S.m3.pb_s[3](f, m, f * m, g, f * m - g) };
});

// ═════ Unidad 3 · Multiplicación ═════
// Tablas de 3.º: el hueco, problemas de grupos, «¿está en la tabla?», combinar y el doble/triple
def("m3.tablas", (R, S) => {
  const T = S.m3.TB, k = R.r(), t = R.int(3, 9), m = R.int(2, 10);
  if (k < 0.3) {   // el hueco
    if (R.r() < 0.5) return { q: T.hueco_q(`${t} ${X} ☐ = ${t * m}`), kind: "int", ans: m, sol: T.hueco_s(t, m, t * m) };
    return { q: T.hueco_q(`☐ ${X} ${t} = ${t * m}`), kind: "int", ans: m, sol: T.hueco2_s(t, m, t * m) };
  }
  if (k < 0.55) {   // grupos iguales: «cuántos grupos × cuántos hay en cada grupo»
    const [cont, obj, per] = R.pick(T.grupos), g = R.int(3, 9);
    return { q: T.grupos_q(g, cont, per, obj), kind: "int", ans: g * per, sol: T.grupos_s(g, per, obj) };
  }
  if (k < 0.75) {   // ¿cuál NO está en la tabla?
    const ins = R.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3).map(x => x * t);
    let out; do out = R.int(2 * t + 1, 10 * t - 1); while (out % t === 0);
    const opts = R.shuffle([...ins, out].map(String)), below = Math.floor(out / t);
    return { q: T.noesta_q(t), kind: "choice", opts, correct: opts.indexOf(String(out)), sol: T.noesta_s(t, out, below, below * t, (below + 1) * t) };
  }
  if (k < 0.88) {   // combinar: camisetas y pantalones, sabores y conos…
    const [a, b, qa, qb] = R.pick(T.comb), x = R.int(2, 6), y = R.int(2, 5);
    return { q: T.comb_q(x, a, y, b, qa, qb), kind: "int", ans: x * y, sol: T.comb_s(x, a, y, b, x * y) };
  }
  // el doble, el triple, el cuádruple
  const v = R.int(2, 4), base = R.int(3, 10), N = R.pick(S.m3.nombres), M = R.pick(S.m3.nombres.filter(x => x !== N)), [obj] = R.pick(T.cosas);
  return { q: T.veces_q(N, base, obj, M, T.veces[v - 2]), kind: "int", ans: v * base, sol: T.veces_s(T.veces[v - 2], v, base, obj) };
});
// Pasos de una multiplicación por una cifra, columna a columna (como en la lección)
function multSteps(S, a, b) {
  const st = [], L = String(a).length;
  let carry = 0;
  for (let p = 0; p < L; p++) {
    const x = digitAt(a, p), v = x * b + carry;
    st.push(S.m3.mu_col(p, x, b, carry, v, p === L - 1));
    carry = Math.floor(v / 10);
  }
  return st;
}
def("m3.mult1", (R, S, H) => {
  // la mitad, de dos cifras; la otra mitad, de tres o cuatro (los dos rangos, sin mezclarse)
  const big = R.r() < 0.5, a = big ? R.int(105, 2999) : R.int(12, 99), b = R.int(2, 9);
  return { q: S.m3.op_q(`${H.n(a)} ${X} ${b}`), kind: "int", ans: a * b, sol: S.m3.mult1_s(multSteps(S, a, b), H.n(a * b)) };
});
def("m3.mult10", (R, S, H) => {
  if (R.r() < 0.4) {   // decenas y centenas redondas: se multiplica sin los ceros y se añaden al final
    const d = R.int(2, 9), z = R.pick([10, 100]), b = R.int(2, 9), nz = z === 10 ? 1 : 2;
    return { q: S.m3.op_q(`${H.n(d * z)} ${X} ${b}`), kind: "int", ans: d * z * b, sol: S.m3.m10r_s(d, b, d * b, nz, H.n(d * z), H.n(d * b * z)) };
  }
  // en 3.º los números llegan hasta el 99 999: el producto no pasa de cinco cifras
  const f = R.pick([10, 100, 1000]), a = R.int(2, f === 1000 ? 99 : 999), z = String(f).length - 1;
  return { q: S.m3.op_q(`${H.n(a)} ${X} ${H.n(f)}`), kind: "int", ans: a * f, sol: S.m3.m10_s(z, H.n(a), H.n(a * f)) };
});
def("m3.mult2", (R, S, H) => {
  // la lección enseña dos cifras por dos cifras; con tres cifras arriba, solo por 11–19 (el resto queda para 4.º)
  const big = R.r() < 0.3, a = big ? R.int(100, 499) : R.int(12, 99), b = big ? R.int(11, 19) : R.int(11, 49);
  return { q: S.m3.op_q(`${a} ${X} ${b}`), kind: "int", ans: a * b, sol: S.m3.mult2_s(a, Math.floor(b / 10), b % 10, H.n(a * (b % 10)), H.n(a * Math.floor(b / 10) * 10), H.n(a * b)) };
});
def("m3.propmult", (R, S) => {
  // la mitad de las veces se USA la propiedad para calcular (como en la lección), no solo se rellena el hueco
  if (R.r() < 0.5) {
    if (R.r() < 0.5) {   // buscar la pareja que da 10 (o 100)
      const [p, q] = R.pick([[2, 5], [5, 2], [4, 25], [25, 4], [2, 50], [20, 5]]), m = R.int(3, 9), ord = R.int(0, 2);
      const fs = [[p, m, q], [p, q, m], [m, p, q]][ord];
      return { q: S.m3.facil_q(fs.join(` ${X} `)), kind: "int", ans: p * q * m, sol: S.m3.facil_s(p, q, p * q, m, p * q * m) };
    }
    const m = R.int(3, 9), c = R.int(1, 9);   // distributiva: partir el número en 10 + algo
    return { q: S.m3.partir_q(m, 10 + c), kind: "int", ans: m * (10 + c), sol: S.m3.partir_s(m, c, 10 * m, m * c, m * (10 + c)) };
  }
  const a = R.int(2, 12), b = R.int(2, 12), c = R.int(2, 9), k = R.int(0, 4);
  if (k === 0) return { q: S.m3.hueco_q(`${a} ${X} ${b} = ${b} ${X} ☐`), kind: "int", ans: a, sol: S.m3.pm_s[0] };
  if (k === 1) return { q: S.m3.hueco_q(`(${a} ${X} ${b}) ${X} ${c} = ${a} ${X} (☐ ${X} ${c})`), kind: "int", ans: b, sol: S.m3.pm_s[1] };
  // distributiva con el mismo formato que la lección: 7 × 12 = 7 × 10 + 7 × 2 (sin paréntesis)
  if (k === 2) { const m = R.int(2, 9); return { q: S.m3.hueco_q(`${m} ${X} ${10 + c} = ${m} ${X} 10 + ${m} ${X} ☐`), kind: "int", ans: c, sol: S.m3.pm_dist_s(m, c) }; }
  if (k === 3) return { q: S.m3.hueco_q(`${a * 7} ${X} ☐ = ${a * 7}`), kind: "int", ans: 1, sol: S.m3.pm_s[3] };
  return { q: S.m3.hueco_q(`${a * 13} ${X} 0 = ☐`), kind: "int", ans: 0, sol: S.m3.pm_s[4] };
});
def("m3.probmult", (R, S, H) => {
  // cada recipiente trae una cantidad creíble (hueveras de 6 o 12, bandejas de 30…)
  const [obj, cont, fem, pers] = R.pick(S.m3.paq), per = R.pick(pers), n = R.int(11, 29);
  const [a, b] = per > n ? [per, n] : [n, per];   // en la cuenta en columna, arriba el número más largo
  const steps = b < 10 ? S.m3.mult1_s(multSteps(S, a, b), H.n(a * b))
    : S.m3.mult2_s(a, Math.floor(b / 10), b % 10, H.n(a * (b % 10)), H.n(a * Math.floor(b / 10) * 10), H.n(a * b));
  return { q: S.m3.pmq(n, cont, per, obj, fem), kind: "int", ans: n * per, sol: S.m3.pms(n, cont, per, a, b, steps) };
});

// ═════ Unidad 4 · División ═════
def("m3.reparto", (R, S) => {
  // cocientes dentro de la tabla (la división en columna llega dos lecciones después)
  const [obj, fem] = R.pick(S.m3.objs), k = R.int(2, 9), each = R.int(2, 10), N = R.pick(S.m3.nombres);
  if (R.r() < 0.4) return { q: S.m3.agr_q(N, k * each, obj, k, fem), kind: "int", ans: each, sol: S.m3.agr_s(k * each, k, each) };   // agrupar: ¿cuántas bolsas?
  return { q: S.m3.rep_q(N, k * each, obj, k, fem), kind: "int", ans: each, sol: S.m3.rep_s(k * each, k, each) };
});
def("m3.exacta", (R, S) => {
  // dividendos que caben en la tabla (cociente de una cifra): la división cifra a cifra llega en la lección siguiente
  const d = R.int(2, 9), q = R.int(2, 9), r = R.r() < 0.5 ? 0 : R.int(1, d - 1), D = d * q + r;
  if (R.r() < 0.5) return { q: S.m3.ex_q(D, d), kind: "choice", opts: S.m3.ex_o, correct: r ? 1 : 0, shuffle: false, sol: S.m3.ex_s(D, d, q, r) };
  return { q: S.m3.div_q(D, d), kind: "fields", fields: [{ label: S.m3.div_f[0], ans: q }, { label: S.m3.div_f[1], ans: r }], sol: S.m3.ex_s(D, d, q, r) };
});
// Pasos de la división en la casita, como en la lección: «7 entre 5 toca a 1 y sobran 2; bajo el 4…»
function divSteps(S, D, d) {
  const ds = String(D).split("").map(Number), st = [];
  let i = 0, cur = ds[0];
  if (cur < d && ds.length > 1) { i = 1; cur = cur * 10 + ds[1]; st.push(S.m3.dv_dos(ds[0], d, cur)); }
  for (;;) {
    const q = Math.floor(cur / d), r = cur - q * d;
    st.push(q ? S.m3.dv_paso(cur, d, q, q * d, r) : S.m3.dv_cero(cur, d));
    i++;
    if (i >= ds.length) break;
    const nxt = r * 10 + ds[i];
    st.push(S.m3.dv_baja(ds[i], nxt));
    cur = nxt;
  }
  return st;
}
def("m3.div1", (R, S) => {
  const d = R.int(2, 9), q = R.int(11, R.r() < 0.5 ? 99 : 199), r = R.int(0, d - 1), D = d * q + r;
  return { q: S.m3.div_q(D, d), kind: "fields", fields: [{ label: S.m3.div_f[0], ans: q }, { label: S.m3.div_f[1], ans: r }], sol: S.m3.div1_s(divSteps(S, D, d), D, d, q, r) };
});
def("m3.prueba", (R, S) => {
  const d = R.int(2, 9), q = R.int(5, 99), r = R.int(0, d - 1), D = d * q + r;
  if (R.r() < 0.5) return { q: S.m3.pr_q(d, q, r), kind: "int", ans: D, sol: S.m3.pr_s(d, q, r, D) };
  const k = R.int(0, 2);
  if (k === 2 && q > 5) {   // la prueba sale, pero el resto no es menor que el divisor: cabía otra vez
    const sq = q - 1, sr = r + d;
    return { q: S.m3.pr2_q(D, d, sq, sr), kind: "choice", opts: S.m3.pr2_o, correct: 1, shuffle: false, sol: S.m3.pr3_s(d, sq, sr, D, q, r) };
  }
  const wrong = k === 1, shown = wrong ? q + R.pick([-1, 1]) : q;
  return { q: S.m3.pr2_q(D, d, shown, r), kind: "choice", opts: S.m3.pr2_o, correct: wrong ? 1 : 0, shuffle: false, sol: S.m3.pr2_s(d, shown, r, d * shown + r, D, wrong) };
});

// ═════ Unidad 5 · Fracciones ═════
def("m3.fracdibujo", (R, S) => {
  const d = R.int(2, 8), n = R.int(1, d - 1), k = R.r();
  if (k < 0.25) {   // fracción de un grupo: globos
    const [col, ci] = R.pick([[C.red, 0], [C.green, 1], [C.amber, 2]]), cname = S.m3.globos[ci];   // «rojos», «verdes», «amarillos»
    const pic = SVG.dots(d, { per: d, r: 12, colors: Array.from({ length: d }, (_, i) => i < n ? col : "#cfd6de") });
    return { q: S.m3.fg_q(d, n, cname) + "<br>" + pic, kind: "frac", ans: [n, d], hint: S.m3.frac_hint, sol: S.m3.fg_s(d, n, cname) };
  }
  const pic = R.r() < 0.5 ? SVG.fracPie(n, d) : SVG.fracBar(n, d, 200);
  if (k < 0.6) return { q: S.m3.fd2_q + "<br>" + pic, kind: "frac", ans: [d - n, d], hint: S.m3.frac_hint, sol: S.m3.fd2_s(n, d) };   // lo que queda
  return { q: S.m3.fd_q + "<br>" + pic, kind: "frac", ans: [n, d], hint: S.m3.frac_hint, sol: S.m3.fd_s(n, d) };
});
def("m3.fracleer", (R, S) => {
  const d = R.int(2, 10), n = R.int(1, d - 1), w = S.m3.fname(n, d);
  if (R.r() < 0.5) return { q: S.m3.fl_q(w), kind: "frac", ans: [n, d], hint: S.m3.frac_hint, sol: S.m3.fl_s(w, n, d) };
  const set = new Set([w]);
  [[d - n, d], [n, d === 10 ? 9 : d + 1], [n + 1 < d ? n + 1 : n - 1 || 1, d]].forEach(([a, b]) => { if (a >= 1 && a < b) set.add(S.m3.fname(a, b)); });
  while (set.size < 4) { const dd = R.int(2, 10); set.add(S.m3.fname(R.int(1, dd - 1), dd)); }
  const opts = R.shuffle([...set]);
  return { q: S.m3.fl2_q(n, d), kind: "choice", opts, correct: opts.indexOf(w), sol: S.m3.fl_s(w, n, d) };
});
def("m3.fraccomp", (R, S) => {
  let a, b, c, d;
  if (R.r() < 0.6) { d = c = R.int(3, 12); do { a = R.int(1, d - 1); b = R.int(1, d - 1); } while (a === b); }
  else { a = b = R.int(1, 3); do { c = R.int(a + 1, 10); d = R.int(a + 1, 10); } while (c === d); }
  const k = a / c > b / d ? 0 : 1;
  return { q: S.m3.fc_q(a, c, b, d), kind: "choice", opts: [">", "<"], correct: k, shuffle: false, sol: c === d ? S.m3.fc_s1(a, b, c, k) : S.m3.fc_s2(a, c, d, k) };
});
def("m3.fraccant", (R, S) => {
  const d = R.int(2, 10), n = R.int(1, d - 1), N = d * R.int(2, 12), part = N / d;
  if (R.r() < 0.5) { const c = R.int(0, S.m3.fq_ctx.length - 1); return { q: S.m3.fq_ctx[c](n, d, N), kind: "int", ans: n * part, sol: S.m3.fq_s(N, d, part, n, n * part) }; }   // con historia
  return { q: S.m3.fq_q(n, d, N), kind: "int", ans: n * part, sol: S.m3.fq_s(N, d, part, n, n * part) };
});

// ═════ Unidad 6 · Medida ═════
const UL = [["km", 1000], ["m", 1], ["cm", 0.01], ["mm", 0.001]];
// Medidas en dos unidades (2 kg y 500 g) y comparar medidas en unidades distintas (3 kg o 2800 g):
// g = unidad grande, p = pequeña, f = cuántas pequeñas tiene una grande, w = «pesa más», «es más largo»…
function medCompuesta(R, S, H, g, p, f) {
  const a = R.int(1, 5), b = f === 100 ? R.int(1, 9) * 5 + R.pick([0, 10, 20, 40]) : R.int(1, 9) * 50 + R.pick([0, 0, 25]);
  if (b >= f) return null;
  if (R.r() < 0.5) return { q: S.m3.mc_q(a, g, b, p), kind: "int", ans: a * f + b, sol: S.m3.mc_s(a, g, b, p, f, H.n(a * f), H.n(a * f + b)) };   // 2 m y 25 cm = ☐ cm
  const v = a * f + b;
  return { q: S.m3.mc2_q(H.n(v), p, g), kind: "fields", fields: [{ label: g, ans: a }, { label: p, ans: b }], sol: S.m3.mc2_s(H.n(v), p, g, f, a, H.n(a * f), b) };   // 2500 g = ☐ kg y ☐ g
}
function medComparar(R, S, H, g, p, f, w) {
  const a = R.int(1, 5), d = R.pick([-1, 1]) * R.int(1, 4) * (f === 100 ? 10 : 100), v = a * f + d, kk = R.r() < 0.5;
  const opts = kk ? [`${a} ${g}`, `${H.n(v)} ${p}`, S.m3.mc_igual] : [`${H.n(v)} ${p}`, `${a} ${g}`, S.m3.mc_igual];
  const goodTxt = d < 0 ? `${a} ${g}` : `${H.n(v)} ${p}`;
  return { q: S.m3.mc3_q(w, opts[0], opts[1]), kind: "choice", opts, correct: opts.indexOf(goodTxt), shuffle: false, sol: S.m3.mc3_s(a, g, H.n(a * f), p, H.n(v), goodTxt) };
}
def("m3.longitud", (R, S, H) => {
  if (R.r() < 0.35) { const [g, p, f] = R.pick([["m", "cm", 100], ["km", "m", 1000]]); return R.r() < 0.6 ? medCompuesta(R, S, H, g, p, f) : medComparar(R, S, H, g, p, f, S.m3.mc_w[0]); }
  const pairs = [[0, 1], [1, 2], [2, 3], [1, 3]], [i, j] = R.pick(pairs), f = Math.round(UL[i][1] / UL[j][1]);
  if (R.r() < 0.6) { const v = R.int(2, 15); return { q: S.m3.conv_q(v, UL[i][0], UL[j][0]), kind: "int", ans: v * f, sol: S.m3.conv_s(UL[i][0], H.n(f), UL[j][0], v, H.n(v * f)) }; }
  const v = R.int(2, 15) * f; return { q: S.m3.conv_q(H.n(v), UL[j][0], UL[i][0]), kind: "int", ans: v / f, sol: S.m3.conv2_s(UL[i][0], H.n(f), UL[j][0], H.n(v), v / f) };
});
def("m3.masa", (R, S, H) => {
  if (R.r() < 0.35) return R.r() < 0.6 ? medCompuesta(R, S, H, "kg", "g", 1000) : medComparar(R, S, H, "kg", "g", 1000, S.m3.mc_w[1]);
  const k = R.int(0, 2);
  if (k === 0) { const v = R.int(1, 9); return { q: S.m3.conv_q(v, "kg", "g"), kind: "int", ans: v * 1000, sol: S.m3.conv_s("kg", H.n(1000), "g", v, H.n(v * 1000)) }; }
  // S.m3.gr_w: «medio kilo», «un cuarto de kilo», «tres cuartos de kilo», «kilo y medio»
  if (k === 1) { const [i, g] = R.pick([[0, 500], [1, 250], [2, 750], [3, 1500]]), w = S.m3.gr_w[i]; return { q: S.m3.gr_q(w), kind: "int", ans: g, sol: S.m3.gr_s(w, H.n(g)) }; }
  const a = R.int(1, 4) * 100 + R.pick([0, 50]), b = R.int(1, 4) * 100 + R.pick([0, 25, 50]); return { q: S.m3.bal_q(a, b), kind: "int", ans: 1000 - a - b, sol: S.m3.bal_s(a, b, a + b, 1000 - a - b) };
});
def("m3.capacidad", (R, S, H) => {
  // L y mL, como en la lección (la «l» minúscula se confunde con el 1)
  if (R.r() < 0.35) return R.r() < 0.6 ? medCompuesta(R, S, H, "L", "mL", 1000) : medComparar(R, S, H, "L", "mL", 1000, S.m3.mc_w[2]);
  const k = R.int(0, 2);
  if (k === 0) { const v = R.int(1, 9); return { q: S.m3.conv_q(v, "L", "mL"), kind: "int", ans: v * 1000, sol: S.m3.conv_s("L", H.n(1000), "mL", v, H.n(v * 1000)) }; }
  // S.m3.ml_w: «medio litro», «un cuarto de litro», «litro y medio», «tres cuartos de litro»
  if (k === 1) { const [i, ml] = R.pick([[0, 500], [1, 250], [2, 1500], [3, 750]]), w = S.m3.ml_w[i]; return { q: S.m3.ml_q(w), kind: "int", ans: ml, sol: S.m3.ml_s(w, H.n(ml)) }; }
  const b = R.pick([250, 500, 200]), L = R.int(1, 4); return { q: S.m3.vasos_q(L, b), kind: "int", ans: L * 1000 / b, sol: S.m3.vasos_s(L, H.n(L * 1000), b, L * 1000 / b) };
});
def("m3.tiempo", (R, S) => {
  const T = S.m3, k = R.r(), hmF = (a, b) => [{ label: T.hm_f[0], ans: a }, { label: T.hm_f[1], ans: b }];
  if (k < 0.42) {   // leer el reloj: de 5 en 5 y, a veces, minuto a minuto (las rayitas pequeñas)
    const h = R.int(1, 12), m = R.r() < 0.55 ? R.int(0, 11) * 5 : R.int(0, 11) * 5 + R.int(1, 4);
    return { q: T.hora_q + "<br>" + SVG.clock(h, m), kind: "fields", fields: hmF(h, m), sol: T.hora_s(h, m) };
  }
  if (k < 0.56) {   // ¿cómo se dice? «y» o «menos»
    const h = R.int(1, 12), m = R.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]), nh = h % 12 + 1;
    const good = T.dice(h, m), cands = m <= 30 ? [T.diceY(nh, m)].concat(m < 30 ? [T.diceMenos(h, m), T.diceMenos(nh, m)] : []) : [T.diceMenos(h, 60 - m), T.diceY(h, m), T.diceY(nh, 60 - m)];
    const { opts, correct } = opt3(R, good, cands);
    return { q: T.dice_q(`${h}:${String(m).padStart(2, "0")}`), kind: "choice", opts, correct, sol: T.dice_s(h, m, good) };
  }
  if (k < 0.7) {   // de la tarde o de la noche al reloj de 24 horas
    const h = R.int(1, 11), m = R.int(0, 11) * 5;
    return { q: T.h24_q(h, m), kind: "fields", fields: hmF(h + 12, m), sol: T.h24_s(h, m) };
  }
  const h = R.int(8, 19), m = R.int(0, 11) * 5, dur = R.pick([15, 20, 25, 30, 40, 45, 50, 75, 90, 95, 105, 110]), t = h * 60 + m + dur;
  const ctx = dur <= 30 ? 0 : dur <= 75 ? 1 : 2;   // un capítulo de dibujos, el entrenamiento o la película
  // T.h12: el idioma escribe estas horas con el reloj de 12 horas (en: 7:30 p.m.), así que la hora de la respuesta es 1–12
  const hh = x => T.h12 ? x % 12 || 12 : x;
  if (k < 0.86) return { q: T.dur_q(h, m, dur, ctx), kind: "fields", fields: hmF(hh(Math.floor(t / 60)), t % 60), sol: T.dur_s(h, m, dur, Math.floor(t / 60), t % 60) };
  return { q: T.cuanto_q(h, m, Math.floor(t / 60), t % 60, ctx), kind: "fields", fields: hmF(Math.floor(dur / 60), dur % 60), sol: T.cuanto_s(h, m, Math.floor(t / 60), t % 60, dur) };   // ¿cuánto dura?
});
def("m3.dinero", (R, S, H) => {
  // precios creíbles por objeto (S.m3.papeleria y S.m3.juguetes: [nombre, mínimo, máximo] en céntimos)
  const k = R.int(0, 1), eu = c => H.money(c / 100), price = ([, lo, hi]) => R.int(lo / 5, hi / 5) * 5;
  if (k === 0) {
    const [x, y] = R.shuffle(S.m3.papeleria).slice(0, 2), a = price(x), b = price(y), s = a + b;
    return { q: S.m3.din_q(x[0], eu(a), y[0], eu(b)), kind: "fields", fields: [{ label: S.m3.eur_f, ans: Math.floor(s / 100) }, { label: S.m3.cent, ans: s % 100 }], sol: S.m3.din_s(a, b, s, eu(s)) };
  }
  const t = R.pick(S.m3.juguetes), a = price(t), pay = [500, 1000, 2000, 5000].find(x => x > a), c = pay - a;
  // las vueltas, como en la lección: contando hacia delante desde el precio, a saltos (hasta los 10 c, el euro y lo que pagas).
  // En dólares no hay monedas de 20 ni de 50 c: el primer salto llega al quarter (25¢) siguiente, con nickels y dimes,
  // y el segundo, al dólar, con quarters (25¢, 50¢ o 75¢). Siguen siendo tres saltos como mucho.
  const st1 = H.moneyCfg.code === "USD" ? 25 : 10, jumps = [];
  let at = a;
  if (at % st1) { const to = at + st1 - at % st1; jumps.push([at, to]); at = to; }
  if (at % 100) { const to = at + 100 - at % 100; jumps.push([at, to]); at = to; }
  if (at < pay) jumps.push([at, pay]);
  const fmt = v => eu(v), amt = v => v >= 100 ? H.money(v / 100, v % 100 !== 0) : H.cents(v);
  return { q: S.m3.vuelta_q(t[0], eu(a), pay / 100), kind: "fields", fields: [{ label: S.m3.eur_f, ans: Math.floor(c / 100) }, { label: S.m3.cent, ans: c % 100 }],
    sol: S.m3.vuelta_s(jumps.map(([x, y]) => S.m3.vsalto(fmt(x), fmt(y), amt(y - x))), jumps.map(([x, y]) => amt(y - x)).join(" + "), Math.floor(c / 100), c % 100, eu(c)) };
});

// ═════ Unidad 7 · Geometría ═════
// Ángulo de «deg» grados con el vértice en (cx, cy), girado «rot» grados (para que no siempre tenga un lado tumbado)
function angSvgBody(deg, rot, cx, cy, len, col = C.blue) {
  const a = deg * Math.PI / 180;
  let b = `<line x1="${cx}" y1="${cy}" x2="${cx + len}" y2="${cy}" stroke="${col}" stroke-width="3" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${(cx + len * Math.cos(a)).toFixed(1)}" y2="${(cy - len * Math.sin(a)).toFixed(1)}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
  if (deg === 90) b += `<path d="M${cx + 14},${cy} L${cx + 14},${cy - 14} L${cx},${cy - 14}" fill="none" stroke="${C.red}" stroke-width="2"/>`;
  else b += `<path d="M${cx + 20},${cy} A20,20 0 0,0 ${(cx + 20 * Math.cos(a)).toFixed(1)},${(cy - 20 * Math.sin(a)).toFixed(1)}" fill="none" stroke="${C.red}" stroke-width="2"/>`;
  return `<g transform="rotate(${rot} ${cx} ${cy})">${b}</g>`;
}
function rays(deg, rot = 0) { return SVG.svg(180, 180, angSvgBody(deg, rot, 90, 90, 78)); }
def("m3.angulos", (R, S) => {
  const k = R.r();
  if (k < 0.2) {   // las agujas del reloj a una hora en punto
    const h = R.pick([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]), d = Math.min(h, 12 - h), c = d === 3 ? 1 : d < 3 ? 0 : 2;
    return { q: S.m3.angr_q(h) + "<br>" + SVG.clock(h, 0, 110), kind: "choice", opts: S.m3.ang_o, correct: c, shuffle: false, sol: S.m3.angr_s(h, d, c) };
  }
  if (k < 0.4) {   // tres ángulos: ¿cuál es el más abierto (o el más cerrado)?
    const ds = R.shuffle([R.pick([25, 35, 45]), R.pick([60, 75, 90]), R.pick([110, 130, 150])]), big = R.r() < 0.5;
    let b = "";
    ds.forEach((d, i) => { b += angSvgBody(d, R.int(-40, 40), 30 + i * 150, 100, 62, C.blue) + SVG.txt(55 + i * 150, 30, "ABC"[i], 18, C.dark, "middle", "bold"); });
    const ans = ds.indexOf(big ? Math.max(...ds) : Math.min(...ds));
    return { q: S.m3.angc_q(big) + "<br>" + SVG.svg(460, 170, b), kind: "choice", opts: ["A", "B", "C"], correct: ans, shuffle: false, sol: S.m3.angc_s(big, "ABC"[ans]) };
  }
  const c = R.int(0, 2), deg = [R.pick([25, 35, 45, 60, 70]), 90, R.pick([110, 125, 140, 155])][c];
  return { q: S.m3.ang_q + "<br>" + rays(deg, R.int(0, 359)), kind: "choice", opts: S.m3.ang_o, correct: c, shuffle: false, sol: S.m3.ang_s[c] };
});
def("m3.rectas", (R, S) => {
  const k = R.int(0, 2), rot = R.int(-30, 30);
  let b;
  if (k === 0) b = `<line x1="20" y1="30" x2="180" y2="30" stroke="${C.blue}" stroke-width="3"/><line x1="20" y1="70" x2="180" y2="70" stroke="${C.green}" stroke-width="3"/>`;
  else if (k === 1) b = `<line x1="20" y1="50" x2="180" y2="50" stroke="${C.blue}" stroke-width="3"/><line x1="100" y1="5" x2="100" y2="95" stroke="${C.green}" stroke-width="3"/><rect x="100" y="36" width="14" height="14" fill="none" stroke="${C.red}" stroke-width="2"/>`;
  else b = `<line x1="20" y1="80" x2="180" y2="20" stroke="${C.blue}" stroke-width="3"/><line x1="20" y1="30" x2="180" y2="70" stroke="${C.green}" stroke-width="3"/>`;
  return { q: S.m3.rec_q + "<br>" + SVG.svg(200, 100, `<g transform="rotate(${rot} 100 50)">${b}</g>`), kind: "choice", opts: S.m3.rec_o, correct: k, shuffle: false, sol: S.m3.rec_s[k] };
});
def("m3.poligonos", (R, S) => {
  const n = R.int(3, 8), k = R.int(0, 2), what = S.m3.el_w[k];
  // no siempre regulares: cada vértice a una distancia distinta del centro y el polígono girado
  const irr = R.r() < 0.7, ph = R.r() * 2 * Math.PI;
  const pts = Array.from({ length: n }, (_, i) => { const a = ph + i * 2 * Math.PI / n + (irr ? (R.r() - 0.5) * 0.6 * Math.PI / n : 0), r = 42 * (irr ? 0.7 + 0.3 * R.r() : 1); return `${(55 + r * Math.cos(a)).toFixed(1)},${(52 + r * Math.sin(a)).toFixed(1)}`; }).join(" ");
  return { q: S.m3.el_q(what) + "<br>" + SVG.svg(110, 104, `<polygon points="${pts}" fill="#d5fdf4" stroke="${C.dark}" stroke-width="2"/>`), kind: "int", ans: n, sol: S.m3.el_s(n, what) };
});
// Cuadrilátero k (0 cuadrado · 1 rectángulo · 2 rombo · 3 trapecio · 4 trapezoide) con medidas al azar y girado
function quad(k, R) {
  let P;
  if (k === 0) { const s = R.int(50, 80); P = [[0, 0], [s, 0], [s, s], [0, s]]; }
  else if (k === 1) { const w = R.int(90, 130), h = Math.round(w / (1.4 + R.r() * 0.6)); P = [[0, 0], [w, 0], [w, h], [0, h]]; }
  else if (k === 2) { const d1 = R.int(110, 130), d2 = Math.round(d1 / (1.5 + R.r() * 0.6)); P = [[0, -d2 / 2], [d1 / 2, 0], [0, d2 / 2], [-d1 / 2, 0]]; }
  else if (k === 3) { const b = R.int(110, 140), t = R.int(40, b - 40), h = R.int(50, 70), off = R.int(0, b - t); P = [[0, h], [b, h], [off + t, 0], [off, 0]]; }
  else {   // trapezoide: ningún lado paralelo a otro
    const par = (p, q, r, s) => Math.abs((q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0])) < 0.25 * Math.hypot(q[0] - p[0], q[1] - p[1]) * Math.hypot(s[0] - r[0], s[1] - r[1]);
    do { P = [[R.int(0, 30), R.int(0, 30)], [R.int(90, 130), R.int(0, 40)], [R.int(80, 130), R.int(70, 110)], [R.int(0, 40), R.int(60, 100)]]; }
    while (par(P[0], P[1], P[3], P[2]) || par(P[1], P[2], P[0], P[3]));
  }
  const rot = (k === 0 && R.r() < 0.3) ? 45 : R.int(-35, 35), a = rot * Math.PI / 180;
  P = P.map(([x, y]) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]);
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]), sc = Math.min(140 / (Math.max(...xs) - Math.min(...xs)), 110 / (Math.max(...ys) - Math.min(...ys)), 1);
  P = P.map(([x, y]) => [10 + (x - Math.min(...xs)) * sc, 10 + (y - Math.min(...ys)) * sc]);
  let b = `<polygon points="${P.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}" fill="#fef6e7" stroke="${C.dark}" stroke-width="2"/>`;
  if (k <= 1) P.forEach((p, i) => {   // los ángulos rectos, marcados con un cuadradito (como en la lección)
    const q = P[(i + 1) % 4], r = P[(i + 3) % 4], u = (v, w) => { const L = Math.hypot(w[0] - v[0], w[1] - v[1]); return [(w[0] - v[0]) / L * 11, (w[1] - v[1]) / L * 11]; };
    const [ux, uy] = u(p, q), [vx, vy] = u(p, r);
    b += `<path d="M${(p[0] + ux).toFixed(1)},${(p[1] + uy).toFixed(1)} L${(p[0] + ux + vx).toFixed(1)},${(p[1] + uy + vy).toFixed(1)} L${(p[0] + vx).toFixed(1)},${(p[1] + vy).toFixed(1)}" fill="none" stroke="${C.dark}" stroke-width="1.4"/>`;
  });
  return SVG.svg(160, 130, b);
}
def("m3.triangcuad", (R, S) => {
  if (R.r() < 0.5) {
    const k = R.int(0, 4);
    return { q: S.m3.cu_q + "<br>" + quad(k, R), kind: "choice", opts: S.m3.cu_o, correct: k, shuffle: false, sol: S.m3.cu_s[k] };
  }
  const k = R.int(0, 2), a = R.int(3, 12);
  let s;
  if (k === 0) s = [a, a, a];
  else if (k === 1) { let b; do b = R.int(3, 12); while (b === a || b >= 2 * a); s = R.shuffle([a, a, b]); }
  else { let b, c; do { b = R.int(3, 12); c = R.int(3, 12); } while (new Set([a, b, c]).size < 3 || a + b <= c || a + c <= b || b + c <= a); s = [a, b, c]; }
  return { q: S.m3.tr_q(s.join(" cm, ") + " cm"), kind: "choice", opts: S.m3.tr_o, correct: k, shuffle: false, sol: S.m3.tr_s[k] };
});
def("m3.perimetro", (R, S) => {
  if (R.r() < 0.5) {
    // ancho menor que el largo (si fueran iguales sería un cuadrado) y dibujo proporcional
    const l = R.int(3, 20), w = R.int(2, l - 1), sc = Math.min(140 / l, 70 / w), rw = l * sc, rh = w * sc;
    const pic = SVG.svg(200, 110, `<rect x="30" y="20" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" fill="#eaf3ff" stroke="${C.dark}" stroke-width="2"/>` + SVG.txt(30 + rw / 2, 15, `${l} cm`, 13) + SVG.txt(38 + rw, 20 + rh / 2 + 4, `${w} cm`, 13, C.dark, "start"));
    return { q: S.m3.per_rect_q + "<br>" + pic, kind: "int", ans: 2 * (l + w), sol: S.m3.per_s(`${l} + ${w} + ${l} + ${w}`, 2 * (l + w)) };
  }
  // el polígono tiene que poder cerrarse: el lado mayor, menor que la suma de los demás
  const n = R.int(3, 6);
  let s; do s = Array.from({ length: n }, () => R.int(2, 15)); while (2 * Math.max(...s) >= s.reduce((x, y) => x + y, 0));
  if (R.r() < 0.4) { const a = R.int(2, 12); return { q: S.m3.per_reg_q(S.m3.regn[n - 3], a), kind: "int", ans: n * a, sol: S.m3.per_s(Array(n).fill(a).join(" + "), n * a) }; }
  return { q: S.m3.per_q(s.join(" cm, ") + " cm"), kind: "int", ans: s.reduce((x, y) => x + y, 0), sol: S.m3.per_s(s.join(" + "), s.reduce((x, y) => x + y, 0)) };
});
// Simetría de 3.º: contar ejes, el punto simétrico en la cuadrícula y la simetría con el eje tumbado (horizontal)
def("m3.simetria", (R, S) => {
  const T = S.m3.SI, k = R.r();
  if (k < 0.4) {   // ¿cuántos ejes de simetría tiene?
    const [name, axes, why, draw] = R.pick(T.figs);
    const pic = draw === "txt" ? SVG.svg(110, 110, SVG.txt(55, 88, name.slice(-1), 84, C.blue, "middle", "bold")) : SVG.svg(120, 110, simFig(draw));
    return { q: T.ejes_q(name) + "<br>" + pic, kind: "int", ans: axes, sol: T.ejes_s(name, axes, why) };
  }
  if (k < 0.75) {   // el punto simétrico: columnas numeradas y el eje entre dos columnas
    const e = R.int(4, 6), c = R.int(1, e), tc = 2 * e + 1 - c, row = R.int(1, 4), u = 22, Wc = 2 * e;
    let b = "";
    for (let x = 0; x < Wc; x++) { for (let y = 0; y < 4; y++) b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="#fff" stroke="${C.grey}"/>`; b += SVG.txt(6 + x * u + u / 2, 6 + 4 * u + 15, x + 1, 11, C.dark); }
    b += `<line x1="${6 + e * u}" y1="0" x2="${6 + e * u}" y2="${12 + 4 * u}" stroke="${C.red}" stroke-width="3" stroke-dasharray="6 4"/>`;
    b += `<circle cx="${6 + (c - 1) * u + u / 2}" cy="${6 + (4 - row) * u + u / 2}" r="7" fill="${C.blue}"/>`;
    return { q: T.punto_q(c) + "<br>" + SVG.svg(12 + Wc * u, 30 + 4 * u, b), kind: "int", ans: tc, sol: T.punto_s(c, e, e - c + 1, tc) };
  }
  // ¿es simétrico respecto a la línea roja tumbada?
  const W = 6, Hh = 3, u = 22, cells = [];
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) if (R.r() < 0.45 || (x === 2 && y === Hh - 1)) cells.push([x, y]);
  const sym = R.r() < 0.5, full = [];
  cells.forEach(([x, y]) => { full.push([x, y]); full.push([x, 2 * Hh - 1 - y]); });
  if (!sym) { const x = R.int(0, W - 1), y = R.int(Hh, 2 * Hh - 1), i = full.findIndex(cc => cc[0] === x && cc[1] === y); if (i >= 0) full.splice(i, 1); else full.push([x, y]); }
  let b = "";
  for (let y = 0; y < 2 * Hh; y++) for (let x = 0; x < W; x++) b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${full.some(cc => cc[0] === x && cc[1] === y) ? C.blue : "#fff"}" stroke="${C.grey}"/>`;
  b += `<line x1="0" y1="${6 + Hh * u}" x2="${12 + W * u}" y2="${6 + Hh * u}" stroke="${C.red}" stroke-width="3" stroke-dasharray="6 4"/>`;
  return { q: T.hor_q + "<br>" + SVG.svg(12 + W * u, 12 + 2 * Hh * u, b), kind: "choice", opts: T.hor_o, correct: sym ? 0 : 1, shuffle: false, sol: T.hor_s[sym ? 0 : 1] };
});
function simFig(k) {   // figuras para contar ejes (en una caja de 120 × 110)
  const P = pts => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="#d5fdf4" stroke="${C.dark}" stroke-width="2"/>`;
  return { sq: P([[20, 10], [100, 10], [100, 90], [20, 90]]), rect: P([[5, 25], [115, 25], [115, 85], [5, 85]]), eq: P([[60, 8], [106, 88], [14, 88]]),
    iso: P([[60, 5], [92, 98], [28, 98]]), esc: P([[10, 90], [110, 90], [38, 15]]), rombo: P([[60, 5], [100, 55], [60, 105], [20, 55]]),
    trap: P([[35, 25], [85, 25], [110, 90], [10, 90]]) }[k];
}
// Cuerpos de 3.º: poliedro o cuerpo redondo, prisma o pirámide, y contar caras, aristas y vértices
def("m3.cuerpos", (R, S) => {
  const T = S.m3.CU, k = R.r();
  if (k < 0.3) {   // ¿poliedro o cuerpo redondo? (con dibujo)
    const s = R.pick(["cube", "prism", "pyramid", "cylinder", "cone", "sphere"]), poly = ["cube", "prism", "pyramid"].includes(s);
    return { q: T.fam_q + "<br>" + SVG.solid(s), kind: "choice", opts: T.fam_o, correct: poly ? 0 : 1, shuffle: false, sol: T.fam_s(T.nom[s], poly) };
  }
  if (k < 0.55) {   // ¿prisma o pirámide? (por cómo es, o por un objeto)
    const [txt, j] = R.pick(T.pp);
    return { q: T.pp_q(txt), kind: "choice", opts: T.pp_o, correct: j, shuffle: false, sol: T.pp_s[j] };
  }
  // contar caras, aristas o vértices (tabla fija de valores)
  const [name, draw, pri, n] = R.pick(T.tabla), w = R.int(0, 2), cv = pri ? [n + 2, 3 * n, 2 * n] : [n + 1, 2 * n, n + 1];
  return { q: T.cuenta_q(T.elem[w], name) + (draw ? "<br>" + SVG.solid(draw) : ""), kind: "int", ans: cv[w], sol: T.cuenta_s(w, name, pri, n, cv[w]) };
});
def("m3.circulo", (R, S) => {
  const k = R.int(0, 2), r = R.int(2, 25);
  if (k === 0) return { q: S.m3.diam_q(r), kind: "int", ans: 2 * r, sol: S.m3.diam_s(r, 2 * r) };
  if (k === 1) return { q: S.m3.rad_q(2 * r), kind: "int", ans: r, sol: S.m3.rad_s(2 * r, r) };
  const w = R.int(0, 1);
  return { q: S.m3.cc_q[w], kind: "choice", opts: S.m3.cc_o, correct: w, shuffle: false, sol: S.m3.cc_s[w] };
});

// ═════ Unidad 8 · Estadística y probabilidad ═════
// Pictograma con medio dibujo: cada estrella vale «each»; la mitad, each / 2
function pictoHalf(cats, vs, each, uid) {   // uid: para que los id del recorte no choquen entre ejercicios
  const r = 11, lw = 90, gap = 2 * r + 6;
  let b = "";
  cats.forEach((c, i) => {
    const y = 12 + i * 32, full = Math.floor(vs[i] / each), half = vs[i] % each !== 0;
    b += SVG.txt(lw - 8, y + 15, c, 13, C.dark, "end");
    for (let j = 0; j < full; j++) b += SVG.shape("star", lw + 6 + r + j * gap, y + r, r, C.amber);
    if (half) { const x = lw + 6 + r + full * gap; b += `<clipPath id="ph${uid}_${i}"><rect x="${x - r - 1}" y="${y - 2}" width="${r + 1}" height="${2 * r + 4}"/></clipPath><g clip-path="url(#ph${uid}_${i})">${SVG.shape("star", x, y + r, r, C.amber)}</g>`; }
  });
  const maxn = Math.max(...vs.map(v => Math.ceil(v / each)));
  b += SVG.shape("star", lw + 6 + r, 18 + cats.length * 32, r, C.amber) + SVG.txt(lw + 6 + 2 * r + 8, 23 + cats.length * 32, `= ${each}`, 13, C.dark, "start", "bold");
  return SVG.svg(lw + 16 + Math.max(maxn, 3) * gap, 36 + cats.length * 32, b);
}
def("m3.graficos", (R, S) => {
  const cats = R.shuffle(S.m3.cats).slice(0, 4), CS = [C.blue, C.green, C.amber, C.red];
  if (R.r() < 0.3) {   // pictograma con clave: cada dibujo vale 2 (o 4) y a veces hay medio dibujo
    const each = R.pick([2, 2, 4]);
    let vs; do vs = cats.map(() => R.int(2, 12) * each / 2); while (new Set(vs).size < 4 || !vs.some(v => v % each));
    const j = R.int(0, 3), full = Math.floor(vs[j] / each), half = vs[j] % each !== 0;
    return { q: S.m3.gp_q(cats[j], each) + "<br>" + pictoHalf(cats, vs, each, R.int(1e5, 1e6 - 1)), kind: "int", ans: vs[j], sol: S.m3.gp_s(cats[j], full, each, half, vs[j]) };
  }
  const step = R.pick([2, 2, 5]), mid = step === 2 && R.r() < 0.5;   // con la escala de 2 en 2, a veces una barra queda entre dos líneas
  let vs; do vs = cats.map((_, i) => (mid && i === 0 ? R.int(1, 7) * step + step / 2 : R.int(1, 8) * step)); while (new Set(vs).size < 4);
  const ord = R.shuffle([0, 1, 2, 3]), cs = ord.map(i => cats[i]), v2 = ord.map(i => vs[i]);
  const data = cs.map((c, i) => ({ label: c, v: v2[i], c: CS[i] })), pic = "<br>" + SVG.bars(data, 8 * step, step), k = R.int(0, 2);
  if (k === 0 || mid) { const j = mid && R.r() < 0.7 ? ord.indexOf(0) : R.int(0, 3); return { q: S.m3.gb_q(cs[j]) + pic, kind: "int", ans: v2[j], sol: S.m3.gb_s(step, cs[j], v2[j]) }; }
  return grafOtros(S, cs, v2, pic, k, R);
});
function grafOtros(S, cats, vs, pic, k, R) {
  if (k === 1) { let a, b; do { a = R.int(0, 3); b = R.int(0, 3); } while (vs[a] <= vs[b]); return { q: S.m3.gd_q(cats[a], cats[b]) + pic, kind: "int", ans: vs[a] - vs[b], sol: S.m3.gd_s(vs[a], vs[b], vs[a] - vs[b]) }; }
  const tot = vs.reduce((x, y) => x + y, 0); return { q: S.m3.gt_q + pic, kind: "int", ans: tot, sol: S.m3.gt_s(vs.join(" + "), tot) };
}
def("m3.probable", (R, S) => {
  const CS = [C.red, C.blue, C.green], ns = [R.int(0, 6), R.int(0, 6), R.int(0, 6)];
  if (ns.every(x => !x)) ns[0] = 3;
  let b = `<path d="M20,30 Q20,140 110,140 Q200,140 200,30 Z" fill="#f6efe0" stroke="${C.dark}" stroke-width="2"/>`, i = 0;
  ns.forEach((n, c) => { for (let j = 0; j < n; j++, i++) b += `<circle cx="${42 + (i % 6) * 28}" cy="${55 + Math.floor(i / 6) * 26}" r="11" fill="${CS[c]}" stroke="${C.dark}"/>`; });
  const pic = "<br>" + SVG.svg(220, 150, b);
  let a, c2; do { a = R.int(0, 2); c2 = R.int(0, 2); } while (a === c2);
  const k = ns[a] > ns[c2] ? 0 : ns[a] < ns[c2] ? 1 : 2;
  // opciones con el nombre del color (no «la primera» / «la segunda»: así no hay que volver a leer la pregunta)
  const opts = [cap3(S.m3.col[a]), cap3(S.m3.col[c2]), S.m3.pb2_o[2]];
  return { q: S.m3.pb2_q(S.m3.col[a], S.m3.col[c2]) + pic, kind: "choice", opts, correct: k, shuffle: false, sol: S.m3.pb2_s(S.m3.col[a], ns[a], S.m3.col[c2], ns[c2], k) };
});
// ═════ Series, calendario, estimar medidas, movimientos, planos y encuestas (generadores añadidos) ═════
const cap3 = s => s.charAt(0).toUpperCase() + s.slice(1);
const f1 = v => +v.toFixed(1);
// Opciones sin repetir: la buena y las de "cands" (hasta n), barajadas
function opt3(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ── Patrones y series numéricas ──
const STEPS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 25, 50, 100];
function arith(R, len) {   // serie que sube o baja de s en s (todos los términos ≥ 0)
  const s = R.pick(STEPS), up = R.r() < 0.6;
  const a = up ? R.int(1, s >= 50 ? 400 : 200) : R.int(s * len, s * len + (s >= 50 ? 400 : 150));
  return { s, up, seq: Array.from({ length: len }, (_, i) => a + (up ? i : -i) * s) };
}
def("m3.series", (R, S, H) => {
  const T = S.m3.SR, k = R.int(0, 3);
  if (k === 0) {   // el siguiente
    const { s, up, seq } = arith(R, 5), shown = seq.slice(0, 4), ans = seq[4];
    return { q: T.sig_q(shown.map(H.n).join(", ")), kind: "int", ans, sol: T.sig_s(shown.map(H.n), s, up, H.n(ans)) };
  }
  if (k === 1) {   // el que falta
    const { s, up, seq } = arith(R, 5), h = R.int(1, 3), ans = seq[h];
    return { q: T.falta_q(seq.map((x, i) => i === h ? "☐" : H.n(x)).join(", ")), kind: "int", ans, sol: T.falta_s(H.n(seq[h - 1]), s, up, H.n(ans), H.n(seq[h + 1])) };
  }
  if (k === 2) {   // ¿cuál es la regla?
    if (R.r() < 0.4) {   // dobles: sin pasar de 100 (el doble de un número grande es multiplicar, U3)
      const a = R.int(2, 6), seq = [a, 2 * a, 4 * a, 8 * a, 16 * a];
      const { opts, correct } = opt3(R, T.por2, [T.sumar(a), T.sumar(2 * a), T.restar(a)]);
      return { q: T.regla_q(seq.map(H.n).join(", ")), kind: "choice", opts, correct, sol: T.doble_s(seq) };
    }
    const { s, up, seq } = arith(R, 5), good = up ? T.sumar(s) : T.restar(s);
    const { opts, correct } = opt3(R, good, [up ? T.restar(s) : T.sumar(s), (up ? T.sumar : T.restar)(s + R.pick([-1, 1])), T.por2]);
    return { q: T.regla_q(seq.map(H.n).join(", ")), kind: "choice", opts, correct, sol: T.regla_s(seq.map(H.n), s, up) };
  }
  const a = R.int(1, 6), seq = [a, 2 * a, 4 * a, 8 * a];   // dobles, sin pasar de 100
  return { q: T.sig_q(seq.map(H.n).join(", ")), kind: "int", ans: 16 * a, sol: T.doble2_s(seq, 16 * a) };
});

const BEAD = [C.red, C.blue, C.green, C.amber];   // en el orden de S.m3.SR.cols
const NUC = [[0, 1], [0, 1, 1], [0, 0, 1], [0, 1, 2], [0, 1, 1, 2], [0, 0, 1, 1]];
def("m3.patron", (R, S) => {
  const T = S.m3.SR;
  if (R.r() < 0.5) {   // la pulsera: ¿de qué color es la cuenta n.º N?
    const nuc = R.pick(NUC), L = nuc.length, cs = R.shuffle([0, 1, 2, 3]).slice(0, Math.max(...nuc) + 1), shown = 2 * L + R.int(0, L - 1);
    const N = R.int(shown + 2, 20), r = (N - 1) % L, col = cs[nuc[r]];
    let b = `<line x1="8" y1="24" x2="${18 + shown * 26 + 24}" y2="24" stroke="${C.grey}" stroke-width="2"/>`;
    for (let i = 0; i < shown; i++) b += `<circle cx="${20 + i * 26}" cy="24" r="10" fill="${BEAD[cs[nuc[i % L]]]}" stroke="${C.dark}" stroke-width="1.2"/>` + SVG.txt(20 + i * 26, 50, i + 1, 10, C.grey);
    b += SVG.txt(20 + shown * 26 + 8, 29, "…", 18, C.dark);
    const names = T.cols.map(cap3);   // siempre los cuatro colores: con dos opciones se acertaría la mitad al azar
    const ends = Array.from({ length: Math.floor((N - 1) / L) }, (_, i) => (i + 1) * L);
    return { q: T.pulsera_q(N) + "<br>" + SVG.svg(20 + shown * 26 + 30, 56, b), kind: "choice", opts: names, correct: names.indexOf(cap3(T.cols[col])), shuffle: false,
      sol: T.pulsera_s(nuc.map(j => T.cols[cs[j]]).join(", "), L, ends.join(", "), N, r + 1, T.cols[col]) };
  }
  // torres que crecen
  let t1, d; do { t1 = R.int(1, 6); d = R.int(1, 4); } while (t1 + 3 * d > 14);
  const k = R.int(5, 10), ans = t1 + (k - 1) * d, tw = [0, 1, 2, 3].map(i => t1 + i * d);
  let b = "";
  tw.forEach((h, i) => { for (let j = 0; j < h; j++) b += `<rect x="${12 + i * 46}" y="${8 + (14 - j - 1) * 11}" width="20" height="11" fill="${C.amber}" stroke="${C.dark}" stroke-width="1"/>`; b += SVG.txt(22 + i * 46, 8 + 14 * 11 + 16, WA.H.ord(i + 1, true), 12); });
  const list = Array.from({ length: k }, (_, i) => t1 + i * d);
  return { q: T.torre_q(k) + "<br>" + SVG.svg(12 + 4 * 46, 8 + 14 * 11 + 24, b), kind: "int", ans, sol: T.torre_s(d, list.join(", "), k, ans) };
});

def("m3.escondido", (R, S, H) => {
  const T = S.m3.SR, k = R.int(0, 3);
  let a, b; do { a = R.int(11, 89); b = R.int(a + 6, 100); } while (a % 10 === 0 && R.r() < 0.7);
  const x = b - a, toTen = a % 10 ? 10 - a % 10 : 0;
  const jump = toTen && toTen < x ? T.salto(H.n(a), H.n(a + toTen), toTen, H.n(b), b - a - toTen, x) : T.directo(H.n(a), H.n(b), x);
  if (k === 0) return { q: T.esc_q(`${a} + ☐ = ${b}`), kind: "int", ans: x, sol: jump + " " + T.comp(`${a} + ${x} = ${b}`) };
  if (k === 1) return { q: T.esc_q(`☐ + ${a} = ${b}`), kind: "int", ans: x, sol: jump + " " + T.comp(`${x} + ${a} = ${b}`) };
  if (k === 2) return { q: T.esc_q(`${b} − ☐ = ${a}`), kind: "int", ans: x, sol: T.resta_s(a, b, x) + " " + T.comp(`${b} − ${x} = ${a}`) };
  return { q: T.esc_q(`☐ − ${x} = ${a}`), kind: "int", ans: b, sol: T.quita_s(x, a, b) + " " + T.comp(`${b} − ${x} = ${a}`) };
});

// ── El calendario ──
// La semana empieza en el día T.inicio (0 domingo, 1 lunes…; es: 1, lunes; en: 0, domingo) y T.dias y T.letras
// van en ese orden; T.finde: columnas del fin de semana, en rojo (es: [5, 6]; en: [0, 6])
const firstDay = (y, m, T) => (new Date(Date.UTC(y, m, 1)).getUTCDay() + 7 - (T.inicio ?? 1)) % 7;   // columna del día 1
const monthLen = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
function sheet(y, m, T, mark) {   // hoja de un mes, con las semanas empezando en T.inicio
  const f = firstDay(y, m, T), n = monthLen(y, m), rows = Math.ceil((f + n) / 7), cw = 34, ch = 24, we = T.finde || [5, 6];
  let b = `<rect x="4" y="4" width="${7 * cw}" height="24" fill="${C.red}"/>` + SVG.txt(4 + 3.5 * cw, 21, `${cap3(T.meses[m])} ${y}`, 14, "#fff", "middle", "bold");
  T.letras.forEach((l, i) => { b += SVG.txt(4 + i * cw + cw / 2, 44, l, 12, we.includes(i) ? C.red : C.dark, "middle", "bold"); });
  for (let d = 1; d <= n; d++) {
    const i = f + d - 1, c = i % 7, r = Math.floor(i / 7), x = 4 + c * cw, y0 = 50 + r * ch;
    if (d === mark) b += `<circle cx="${x + cw / 2}" cy="${y0 + 11}" r="11" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
    b += SVG.txt(x + cw / 2, y0 + 16, d, 12, we.includes(c) ? C.red : C.dark);
  }
  return SVG.svg(8 + 7 * cw, 54 + rows * ch, `<rect x="4" y="4" width="${7 * cw}" height="${46 + rows * ch}" fill="#fff" stroke="${C.grey}"/>` + b);
}
// Opciones de día de la semana: la buena, la de antes, la de después y una más
const wdOpts = (R, D, w) => opt3(R, cap3(D[w]), [D[(w + 6) % 7], D[(w + 1) % 7], D[(w + 2) % 7]].map(cap3));
def("m3.calendario", (R, S) => {
  const T = S.m3.CA, D = T.dias, k = R.int(0, 5);
  if (k === 0) {   // equivalencias
    const v = R.int(0, 5);
    if (v === 0) { const n = R.int(2, 9); return { q: T.sem_q(n), kind: "int", ans: 7 * n, sol: T.sem_s(n) }; }
    if (v === 1) { const n = R.int(2, 5); return { q: T.anos_q(n), kind: "int", ans: 12 * n, sol: T.anos_s(n) }; }
    if (v === 2) { const n = R.int(2, 9); return { q: T.dias_q(7 * n), kind: "int", ans: n, sol: T.dias_s(n) }; }
    if (v === 3) return { q: T.medio_q, kind: "int", ans: 6, sol: T.medio_s };
    if (v === 4) { const n = R.int(2, 9); return { q: T.dec_q(n), kind: "int", ans: 10 * n, sol: T.dec_s(n) }; }
    const n = R.int(2, 5); return { q: T.sig_q(n), kind: "int", ans: 100 * n, sol: T.sig_s(n) };
  }
  if (k === 1) {   // días de cada mes
    const m = R.int(0, 11), bis = m === 1 && R.r() < 0.5, n = m === 1 ? (bis ? 29 : 28) : monthLen(2026, m);
    return { q: T.mesd_q(T.meses[m], m === 1, bis), kind: "int", ans: n, sol: T.mesd_s(T.meses[m], n, m === 1, bis) };
  }
  if (k === 2) {   // el mismo día de la semana una semana después, o unos días después
    const w = R.int(0, 6), d = R.int(1, 14), add = R.pick([7, 7, 14, 1, 2, 3]), w2 = (w + add) % 7, { opts, correct } = wdOpts(R, D, w2);
    return { q: T.semdia_q(D[w], d, d + add), kind: "choice", opts, correct, sol: T.semdia_s(D[w], d, d + add, add, D[w2]) };
  }
  if (k === 3) {   // ¿cuántos días faltan?
    const y = 2026, m = R.int(0, 11), L = monthLen(y, m);
    if (R.r() < 0.5) { const d1 = R.int(1, L - 3), d2 = R.int(d1 + 2, L); return { q: T.faltan_q(d1, T.meses[m], d2, T.meses[m]), kind: "int", ans: d2 - d1, sol: T.faltan1_s(d1, d2) }; }
    const d1 = R.int(L - 9, L - 1), m2 = (m + 1) % 12, d2 = R.int(1, 20);
    return { q: T.faltan_q(d1, T.meses[m], d2, T.meses[m2]), kind: "int", ans: L - d1 + d2, sol: T.faltan2_s(T.meses[m], L, d1, d2, T.meses[m2]) };
  }
  if (k === 4) {   // la hoja del calendario
    const y = R.int(2025, 2028), m = R.int(0, 11), n = monthLen(y, m), f = firstDay(y, m, T), v = R.int(0, 2);
    if (v === 0) { const d = R.int(1, n), w = (f + d - 1) % 7, { opts, correct } = wdOpts(R, D, w); return { q: T.hoja_q(d) + "<br>" + sheet(y, m, T, d), kind: "choice", opts, correct, sol: T.hoja_s(d, T.letras[w], D[w]) }; }
    const w = R.int(0, 6), first = (w - f + 7) % 7 + 1, cnt = Math.floor((n - first) / 7) + 1;
    if (v === 1) return { q: T.cuantos_q(D[w]) + "<br>" + sheet(y, m, T, 0), kind: "int", ans: cnt, sol: T.cuantos_s(D[w], Array.from({ length: cnt }, (_, i) => first + 7 * i).join(", "), cnt) };
    return { q: T.primer_q(D[w]) + "<br>" + sheet(y, m, T, 0), kind: "int", ans: first, sol: T.primer_s(D[w], T.letras[w], first) };
  }
  const d = R.int(1, 28), m = R.int(0, 11), y = R.int(2025, 2028);   // la fecha en números
  const { opts, correct } = opt3(R, cap3(T.meses[m]), [T.meses[(m + 1) % 12], T.meses[(m + 11) % 12], T.meses[(d - 1) % 12]].map(cap3));
  return { q: T.fecha_q(T.fecha(d, m + 1, y)), kind: "choice", opts, correct, sol: T.fecha_s(d, m + 1, T.meses[m], y) };
});

// ── Estimar medidas ──
def("m3.estmedidas", (R, S) => {
  const T = S.m3.EM, k = R.int(0, 4);
  if (k === 0) {   // la medida con sentido
    const [what, os, why] = R.pick(T.bank), { opts, correct } = opt3(R, os[0], os.slice(1));
    return { q: T.bank_q(what), kind: "choice", opts, correct, sol: why };
  }
  if (k === 1) {   // andando, 1 km en unos 15 minutos
    if (R.r() < 0.6) { const n = R.int(1, 6), m = 15 * n, w = R.pick(T.sitios); return { q: T.km_q(m, w), kind: "int", ans: n, sol: T.km_s(m, n) }; }
    const n = R.int(1, 6); return { q: T.min_q(n), kind: "int", ans: 15 * n, sol: T.min_s(n) };
  }
  if (k === 2) {   // referentes que se suman
    const v = R.int(0, 2);
    if (v === 0) { const n = R.pick([10, 20, 50, 100, 200, 500]); return { q: T.clip_q(n), kind: "int", ans: n, sol: T.clip_s(n) }; }
    if (v === 1) { const n = R.pick([50, 80, 100, 120, 200, 300]); return { q: T.hojas_q(n), kind: "int", ans: n / 10, sol: T.hojas_s(n) }; }
    const n = R.int(2, 9); return { q: T.pisos_q(n), kind: "int", ans: 3 * n, sol: T.pisos_s(n) };
  }
  if (k === 3) { const n = R.int(8, 40), w = R.pick(T.largos); return { q: T.pasos_q(w, n), kind: "int", ans: n, sol: T.pasos_s(w, n) }; }   // pasos grandes
  // ¿quién se ha acercado más?
  // las estimaciones son números redondos (g y mL a la centena, cm a la decena, m al metro); la medida real, no
  const [w, u, lo, hi] = R.pick(T.medir), real = R.int(lo, hi), names = R.shuffle(T.nombres).slice(0, 2);
  const st = u === "m" ? 1 : u === "cm" ? 10 : 100, near = Math.round(real / st) * st;
  let good; do good = u === "m" ? real + R.pick([-2, -1, 1, 2]) : near + R.pick([-1, 0, 1]) * st; while (good === real);
  let bad; do bad = near + R.pick([-1, 1]) * R.int(3, 6) * (u === "m" ? 3 : st); while (bad <= 0 || Math.abs(bad - real) <= Math.abs(good - real));
  const first = R.r() < 0.5;
  return { q: T.quien_q(w, names[0], first ? good : bad, names[1], first ? bad : good, real, u), kind: "choice", opts: names, correct: first ? 0 : 1, shuffle: false, sol: T.quien_s(real, good, bad, u, names[first ? 0 : 1]) };
});

// ── Traslaciones y giros ──
const PIECES = [[[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]], [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]], [[0, 0], [1, 0], [1, 1], [1, 2]]];
const GW = 13, GH = 8, GZ = 18;
const inGrid = cs => cs.every(([x, y]) => x >= 0 && y >= 0 && x < GW && y < GH);
const overlap = (a, b) => a.some(([x, y]) => b.some(([u, v]) => Math.abs(u - x) + Math.abs(v - y) <= 1));   // se pisan o comparten un lado
function piecesSvg(a, b, extra = "") {
  let s = "";
  for (let x = 0; x <= GW; x++) s += `<line x1="${6 + x * GZ}" y1="6" x2="${6 + x * GZ}" y2="${6 + GH * GZ}" stroke="#d5dae0"/>`;
  for (let y = 0; y <= GH; y++) s += `<line x1="6" y1="${6 + y * GZ}" x2="${6 + GW * GZ}" y2="${6 + y * GZ}" stroke="#d5dae0"/>`;
  a.forEach(([x, y]) => { s += `<rect x="${6 + x * GZ}" y="${6 + y * GZ}" width="${GZ}" height="${GZ}" fill="#9cc0f0" stroke="${C.blue}" stroke-width="1.5"/>`; });
  b.forEach(([x, y]) => { s += `<rect x="${6 + x * GZ}" y="${6 + y * GZ}" width="${GZ}" height="${GZ}" fill="#f4a9a3" stroke="${C.red}" stroke-width="1.5"/>`; });   // roja, como en la lección
  return SVG.svg(12 + GW * GZ, 12 + GH * GZ, s + extra);
}
// Pieza azul y su imagen roja por un movimiento (0 traslación · 1 giro de un cuarto de vuelta · 2 simetría de eje vertical)
function moved(R, kind) {
  for (let t = 0; t < 1000; t++) {
    const base = R.pick(PIECES), ox = R.int(0, GW - 3), oy = R.int(0, GH - 4), a = base.map(([x, y]) => [x + ox, y + oy]);
    let b, info = {};
    if (kind === 0) {
      const dx = R.int(-6, 6), dy = R.r() < 0.5 ? 0 : R.int(-3, 3); if (!dx && !dy) continue;
      b = a.map(([x, y]) => [x + dx, y + dy]); info = { dx, dy };
    } else if (kind === 1) {
      const cw = R.r() < 0.5, xs = a.map(c => c[0]), ys = a.map(c => c[1]), px = R.int(Math.min(...xs) - 2, Math.max(...xs) + 3), py = R.int(Math.min(...ys) - 2, Math.max(...ys) + 3);   // centro de giro cerca de la pieza
      b = a.map(([x, y]) => cw ? [px - (y + 1 - py), py + (x - px)] : [px + (y - py), py - (x + 1 - px)]); info = { px, py };
    } else {
      const maxX = Math.max(...a.map(c => c[0])), ax = maxX + 1 + R.int(1, 2);
      b = a.map(([x, y]) => [2 * ax - x - 1, y]); info = { ax };
    }
    if (inGrid(a) && inGrid(b) && !overlap(a, b)) return { a, b, info };
  }
  return null;
}
def("m3.movimientos", (R, S) => {
  const T = S.m3.MV, k = R.int(0, 5);
  if (k === 0) {   // ¿qué movimiento es?
    const kind = R.int(0, 2), m = moved(R, kind); if (!m) return null;
    return { q: T.cual_q + "<br>" + piecesSvg(m.a, m.b), kind: "choice", opts: T.movs, correct: kind, shuffle: false, sol: T.cual_s[kind] };
  }
  if (k === 1) {   // ¿cuántos cuadritos se ha trasladado?
    let m; do m = moved(R, 0); while (m && m.info.dx && m.info.dy);
    if (!m) return null;
    const n = Math.abs(m.info.dx || m.info.dy), dir = m.info.dx > 0 ? 0 : m.info.dx < 0 ? 1 : m.info.dy < 0 ? 2 : 3;
    return { q: T.tras_q(T.hacia[dir]) + "<br>" + piecesSvg(m.a, m.b), kind: "int", ans: n, sol: T.tras_s(n, T.hacia[dir]) };
  }
  if (k === 2) {   // la aguja del reloj
    const h = R.int(1, 12), q = R.int(1, 3), cw = R.r() < 0.7, end = ((h + (cw ? 3 : -3) * q) % 12 + 12) % 12 || 12;
    return { q: T.reloj_q(h, T.vueltas[q - 1], cw), kind: "int", ans: end, sol: T.reloj_s(h, q, cw, end, T.vueltas[q - 1]) };
  }
  if (k === 3) {   // la bandera que gira
    const d0 = R.int(0, 3), q = R.int(1, 3), cw = R.r() < 0.6, d1 = (d0 + (cw ? q : 4 - q)) % 4;
    const flag = `<g transform="rotate(${d0 * 90} 40 40)"><line x1="40" y1="40" x2="40" y2="8" stroke="${C.dark}" stroke-width="3"/><path d="M40,8 L62,15 L40,22 Z" fill="${C.red}"/></g><circle cx="40" cy="40" r="4" fill="${C.dark}"/>` + SVG.txt(48, 56, "O", 12);
    return { q: T.bandera_q(T.dirs[d0], T.vueltas[q - 1], cw) + "<br>" + SVG.svg(80, 80, flag), kind: "choice", opts: T.dirsO, correct: d1, shuffle: false, sol: T.bandera_s(q, cw, T.dirs[d1]) };
  }
  if (k === 4) { const [w, kind] = R.pick(T.bank); return { q: T.bank_q(w), kind: "choice", opts: T.movs, correct: kind, shuffle: false, sol: T.bank_s[kind](w) }; }   // en la vida diaria
  if (R.r() < 0.5) { const n = R.int(2, 5); return { q: T.cuartos_q(n), kind: "int", ans: 4 * n, sol: T.cuartos_s(n) }; }   // cuartos de vuelta
  const q = R.int(2, 4); return { q: T.cuantos_q(q), kind: "choice", opts: T.vueltasO, correct: q - 2, shuffle: false, sol: T.cuantos_s(q) };
});

// ── Planos e itinerarios ──
const COLS6 = ["A", "B", "C", "D", "E", "F"];
const cell = (c, r) => COLS6[c] + (r + 1);   // r = 0 es la fila 1 (abajo)
function placeIcon(k, x, y) {   // 0 casa · 1 parque (árbol) · 2 fuente · 3 cole · 4 tienda
  if (k === 0) return `<rect x="${x - 11}" y="${y - 3}" width="22" height="15" fill="#f3e2c0" stroke="${C.dark}"/><path d="M${x - 14},${y - 2} L${x},${y - 14} L${x + 14},${y - 2} Z" fill="${C.red}" stroke="${C.dark}"/><rect x="${x - 3}" y="${y + 4}" width="6" height="8" fill="#8a5a33"/>`;
  if (k === 1) return `<rect x="${x - 2}" y="${y + 2}" width="4" height="11" fill="#8a5a33"/><circle cx="${x}" cy="${y - 4}" r="10" fill="${C.green}" stroke="${C.dark}"/>`;
  if (k === 2) return `<circle cx="${x}" cy="${y}" r="12" fill="#9ccbee" stroke="${C.blue}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`;
  if (k === 3) return `<rect x="${x - 13}" y="${y - 6}" width="26" height="18" fill="#f2d16b" stroke="${C.dark}"/><path d="M${x - 15},${y - 5} L${x},${y - 14} L${x + 15},${y - 5} Z" fill="${C.red}" stroke="${C.dark}"/><line x1="${x + 9}" y1="${y - 9}" x2="${x + 9}" y2="${y - 18}" stroke="${C.dark}"/><path d="M${x + 9},${y - 18} L${x + 15},${y - 16} L${x + 9},${y - 14} Z" fill="${C.blue}"/>`;
  return `<rect x="${x - 12}" y="${y - 4}" width="24" height="16" fill="#fff" stroke="${C.dark}"/><path d="M${x - 14},${y - 4} L${x - 10},${y - 12} L${x + 10},${y - 12} L${x + 14},${y - 4} Z" fill="${C.green}" stroke="${C.dark}"/>`;
}
function plano(places, names) {   // cuadrícula A–F × 1–5 (la fila 1, abajo) y la leyenda
  const z = 40, x0 = 26, y0 = 8;
  let b = "";
  for (let c = 0; c <= 6; c++) b += `<line x1="${x0 + c * z}" y1="${y0}" x2="${x0 + c * z}" y2="${y0 + 5 * z}" stroke="#c9d3c0"/>`;
  for (let r = 0; r <= 5; r++) b += `<line x1="${x0}" y1="${y0 + r * z}" x2="${x0 + 6 * z}" y2="${y0 + r * z}" stroke="#c9d3c0"/>`;
  COLS6.forEach((l, c) => { b += SVG.txt(x0 + c * z + z / 2, y0 + 5 * z + 18, l, 13, C.dark, "middle", "bold"); });
  for (let r = 0; r < 5; r++) b += SVG.txt(x0 - 12, y0 + (4 - r) * z + z / 2 + 5, r + 1, 13, C.dark, "middle", "bold");
  places.forEach(p => { b += placeIcon(p.k, x0 + p.c * z + z / 2, y0 + (4 - p.r) * z + z / 2); });
  const lx = x0 + 6 * z + 14;
  places.slice().sort((p, q) => p.k - q.k).forEach((p, i) => { b += placeIcon(p.k, lx + 14, y0 + 22 + i * 40) + SVG.txt(lx + 34, y0 + 27 + i * 40, names[p.k], 12, C.dark, "start"); });
  return SVG.svg(lx + 150, y0 + 5 * z + 26, `<rect x="${x0}" y="${y0}" width="${6 * z}" height="${5 * z}" fill="#eef5e6"/>` + b);
}
def("m3.plano", (R, S) => {
  const T = S.m3.PL, k = R.int(0, 5);
  if (k <= 1) {
    const cells = []; for (let c = 0; c < 6; c++) for (let r = 0; r < 5; r++) cells.push([c, r]);
    const ks = R.shuffle([0, 1, 2, 3, 4]).slice(0, 4), pl = R.shuffle(cells).slice(0, 4).map(([c, r], i) => ({ k: ks[i], c, r })), j = R.int(0, 3), p = pl[j];
    if (k === 0) {   // ¿en qué casilla está?
      const cands = [p.r < 6 && p.c < 5 ? cell(p.r, p.c) : null, cell(p.c, p.r < 4 ? p.r + 1 : p.r - 1), cell(p.c < 5 ? p.c + 1 : p.c - 1, p.r), cell(p.c > 0 ? p.c - 1 : p.c + 1, p.r)].filter(Boolean);
      const { opts, correct } = opt3(R, cell(p.c, p.r), cands);
      return { q: T.donde_q(T.sitios[p.k]) + "<br>" + plano(pl, T.sitios), kind: "choice", opts, correct, sol: T.donde_s(T.sitios[p.k], COLS6[p.c], p.r + 1) };
    }
    return { q: T.que_q(cell(p.c, p.r)) + "<br>" + plano(pl, T.sitios), kind: "choice", opts: pl.map(x => cap3(T.sitios[x.k])), correct: j, shuffle: false, sol: T.que_s(cell(p.c, p.r), COLS6[p.c], p.r + 1, T.sitios[p.k]) };
  }
  if (k === 2) {   // el robot avanza por la cuadrícula
    for (let t = 0; t < 50; t++) {
      const c = R.int(0, 5), r = R.int(0, 4), d = R.int(0, 3), n = R.int(1, 4), [dc, dr] = [[1, 0], [-1, 0], [0, 1], [0, -1]][d], c2 = c + dc * n, r2 = r + dr * n;
      if (c2 < 0 || c2 > 5 || r2 < 0 || r2 > 4) continue;
      const short = [c + dc * (n - 1), r + dr * (n - 1)], back = [c - dc * n, r - dr * n], swap = [c + dr * n, r + dc * n];
      const ok = ([x, y]) => x >= 0 && x <= 5 && y >= 0 && y <= 4;
      const { opts, correct } = opt3(R, cell(c2, r2), [short, back, swap].filter(ok).map(([x, y]) => cell(x, y)).filter(s => s !== cell(c, r)));
      if (opts.length < 3) continue;
      return { q: T.robot_q(cell(c, r), n, T.mov[d], d < 2 ? T.fila(r + 1) : T.columna(COLS6[c])), kind: "choice", opts, correct, sol: T.robot_s(cell(c, r), n, T.mov[d], cell(c2, r2), d < 2) };
    }
    return null;
  }
  if (k === 3) {   // girar mientras caminas por el plano
    const h = R.int(0, 3), right = R.r() < 0.5, h2 = (h + (right ? 1 : 3)) % 4;
    return { q: T.gira_q(T.rumbo[h], right), kind: "choice", opts: T.rumboO, correct: h2, shuffle: false, sol: T.gira_s(T.rumbo[h], right, T.rumbo[h2], h) };
  }
  if (k === 4) {   // de cara o de espaldas
    const facing = R.r() < 0.6, rightHand = R.r() < 0.5, seen = facing ? !rightHand : rightHand;
    return { q: T.mano_q(facing, rightHand), kind: "choice", opts: T.manoO, correct: seen ? 0 : 1, shuffle: false, sol: T.mano_s(facing, rightHand, seen) };
  }
  // el robot de la clase: pizarra (0), ventana (1, a la derecha), fondo (2), puerta (3, a la izquierda)
  const turns = R.shuffle([[1, "d"], [3, "i"], [2, "m"], [1, "d"], [3, "i"]]).slice(0, R.int(1, 2));
  let f = 0; const steps = turns.map(([q, t], i) => { f = (f + q) % 4; return T.paso(t, T.clase[f], i); });
  return { q: T.clase_q(turns.map(([, t]) => T.giros[t]).join(T.y)), kind: "choice", opts: T.claseO, correct: f, shuffle: false, sol: turns.length === 1 ? T.clase1_s(turns[0][1], T.clase[f]) : steps.join(" ") };
});

// ── Encuestas y recuento de datos ──
function tally(n, x, y) {   // palotes agrupados de cinco en cinco
  let b = "";
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), j = i % 5, gx = x + g * 34;
    b += j < 4 ? `<line x1="${gx + j * 6}" y1="${y}" x2="${gx + j * 6}" y2="${y + 18}" stroke="${C.dark}" stroke-width="2" stroke-linecap="round"/>`
      : `<line x1="${gx - 4}" y1="${y + 15}" x2="${gx + 22}" y2="${y + 3}" stroke="${C.red}" stroke-width="2" stroke-linecap="round"/>`;
  }
  return b;
}
function tallyTable(cats, ns) {
  const lw = 92, rh = 28;
  let b = `<rect x="2" y="2" width="${lw + 4 * 34 + 10}" height="${cats.length * rh + 4}" fill="#fff" stroke="${C.grey}"/>`;
  cats.forEach((c, i) => { b += SVG.txt(10, 22 + i * rh, c, 13, C.dark, "start") + tally(ns[i], lw + 8, 7 + i * rh); if (i) b += `<line x1="2" y1="${4 + i * rh}" x2="${lw + 4 * 34 + 12}" y2="${4 + i * rh}" stroke="#e3e6ea"/>`; });
  b += `<line x1="${lw}" y1="2" x2="${lw}" y2="${cats.length * rh + 6}" stroke="${C.grey}"/>`;
  return SVG.svg(lw + 4 * 34 + 16, cats.length * rh + 10, b);
}
def("m3.encuesta", (R, S) => {
  const T = S.m3.EN, k = R.int(0, 5);
  if (k === 5) {   // la buena pregunta
    const [topic, good, ...bad] = R.pick(T.preguntas), { opts, correct } = opt3(R, good, bad);
    return { q: T.preg_q(topic), kind: "choice", opts, correct, sol: T.preg_s };
  }
  if (k === 4) {   // grupos de palotes, sin dibujo
    if (R.r() < 0.5) { const g = R.int(1, 5), s = R.int(0, 4); return { q: T.grupos_q(g, s), kind: "int", ans: 5 * g + s, sol: T.grupos_s(g, s) }; }
    const n = R.int(6, 24); return { q: T.cuantos_q(n), kind: "int", ans: Math.floor(n / 5), sol: T.cuantos_s(n) };
  }
  const [topic, list] = R.pick(T.temas), m = R.int(3, 4), cats = R.shuffle(list).slice(0, m).map(cap3);
  let ns; do ns = cats.map(() => R.int(2, 14)); while (new Set(ns).size < m);
  const pic = "<br>" + tallyTable(cats, ns), j = R.int(0, m - 1);
  const read = i => T.leer(cats[i], Math.floor(ns[i] / 5), ns[i] % 5, ns[i]);
  if (k === 0) return { q: T.frec_q(topic, cats[j]) + pic, kind: "int", ans: ns[j], sol: read(j) };
  if (k === 1) { const tot = ns.reduce((a, b) => a + b, 0); return { q: T.total_q(topic) + pic, kind: "int", ans: tot, sol: T.total_s(ns.join(" + "), tot) }; }
  if (k === 2) {
    const more = R.r() < 0.6, i = ns.indexOf(more ? Math.max(...ns) : Math.min(...ns));
    return { q: (more ? T.mas_q : T.menos_q)(topic) + pic, kind: "choice", opts: cats, correct: i, shuffle: false, sol: T.masmenos_s(cats.map((c, x) => `${c}: ${ns[x]}`).join("; "), cats[i], ns[i], more) };
  }
  let a, b; do { a = R.int(0, m - 1); b = R.int(0, m - 1); } while (a === b);
  if (R.r() < 0.5) { if (ns[a] < ns[b]) [a, b] = [b, a]; return { q: T.dif_q(cats[a], cats[b]) + pic, kind: "int", ans: ns[a] - ns[b], sol: T.dif_s(read(a), read(b), ns[a], ns[b]) }; }
  return { q: T.o_q(cats[a], cats[b]) + pic, kind: "int", ans: ns[a] + ns[b], sol: T.o_s(ns[a], ns[b]) };
});
// ── fin: ═════ Series, calendario, estimar medidas, movimientos, planos y encuestas (generadores añadidos) ═════
})();
