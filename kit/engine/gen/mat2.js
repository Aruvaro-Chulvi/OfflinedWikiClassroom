/* WikiAula — Matemáticas, Grado 2 (2.º de Primaria).
   Textos: i18n/<lang>/mat2.js (S.m2). Dibujos: WA.SVG (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const COLS = [C.blue, C.green, C.amber, C.red, C.purple];
const X = "×";
const digits = n => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

// ═════ Unidad 1 · Números hasta el 999 ═════
def("m2.centenas", (R, S) => {
  if (R.r() < 0.22) {   // el número de después o de antes, cuando se llena (o se rompe) una barra o una placa
    const after = R.r() < 0.5, full = R.r() < 0.5;   // full: cambia la centena (299 → 300, 600 → 599)
    const n = after ? (full ? R.int(1, 8) * 100 + 99 : R.int(1, 9) * 100 + R.int(0, 8) * 10 + 9) : (full ? R.int(2, 9) * 100 : R.int(1, 9) * 100 + R.int(1, 9) * 10);
    const r = after ? n + 1 : n - 1;
    return { q: S.m2.vecino_q(n, after), kind: "int", ans: r, sol: S.m2.vecino_s(digits(n), digits(r), after) };
  }
  const n = R.int(100, 999), [c, d, u] = digits(n);
  if (R.r() < 0.4 && c <= 4) return { q: S.m2.bloques_q + "<br>" + SVG.base10(c, d, u), kind: "int", ans: n, sol: S.m2.cdu_s(n, c, d, u) };
  if (R.r() < 0.5) return { q: S.m2.cdu_q(n), kind: "fields", fields: S.m2.cdu_f.map((label, i) => ({ label, ans: [c, d, u][i] })), sol: S.m2.cdu_s(n, c, d, u) };
  return { q: S.m2.descomp_q(c, d, u), kind: "int", ans: n, sol: S.m2.cdu_s(n, c, d, u) };
});
def("m2.valor", (R, S) => {
  let n; do n = R.int(100, 999); while (new Set(String(n)).size < 3 || String(n).includes("0"));
  const pos = R.int(0, 2), dg = digits(n)[pos], v = dg * [100, 10, 1][pos];
  return { q: S.m2.valor_q(n, dg), kind: "int", ans: v, sol: S.m2.valor_s(dg, S.m2.posn[pos], v) };
});
def("m2.letras", (R, S, H, L) => {
  const n = R.int(100, 999);
  const [c, d, u] = digits(n), rest = n % 100;
  // los dos trozos de la lección: las centenas y el número de dos cifras que queda
  const sol = S.m2.letras_s(n, c, rest, rest ? (L.wordsBefore ? L.wordsBefore(c * 100) : L.words(c * 100 + 1).split(" ")[0]) : L.words(c * 100), rest ? L.words(rest) : "", L.words(n));
  if (R.r() < 0.55) return { q: S.m2.letras_q(L.words(n)), kind: "int", ans: n, sol };
  const set = new Set([n]);
  [u * 100 + d * 10 + c, c * 100 + u * 10 + d, n + 100 > 999 ? n - 100 : n + 100, n + 10 > 999 ? n - 10 : n + 10].forEach(x => { if (set.size < 4 && x >= 100 && x !== n) set.add(x); });
  while (set.size < 4) set.add(R.int(100, 999));
  const words = [...set].map(x => L.words(x));
  // a veces, en lugar de un número vecino, el error de la lección: «cincocientos», «nuevecientos», «cien veinte», «ciento y cinco»
  const bad = S.m2.letras_mal(L.words(n), c, rest);
  if (bad && R.r() < 0.7) words[3] = bad;
  const opts = R.shuffle(words);
  return { q: S.m2.letras2_q(n), kind: "choice", opts, correct: opts.indexOf(L.words(n)), sol };
});
def("m2.comparar", (R, S) => {
  if (R.r() < 0.5) {
    const a = R.int(100, 999);
    let b = R.r() < 0.15 ? a : R.pick([R.int(100, 999), Math.floor(a / 10) * 10 + R.int(0, 9), Math.floor(a / 100) * 100 + R.int(0, 99)]);
    const k = a > b ? 0 : a < b ? 1 : 2;
    return { q: S.m2.comp_q(a, b), kind: "choice", opts: [">", "<", "="], correct: k, shuffle: false, sol: S.m2.comp_s(a, b, k, digits(a), digits(b)) };
  }
  const set = new Set(); const base = R.int(1, 8) * 100;
  while (set.size < 4) set.add(R.r() < 0.6 ? base + R.int(0, 99) : R.int(100, 999));
  const nums = R.shuffle([...set]), big = R.r() < 0.5, ans = big ? Math.max(...nums) : Math.min(...nums);
  return { q: (big ? S.m2.mayor_q : S.m2.menor_q)(nums.join(", ")), kind: "choice", opts: nums.map(String), correct: nums.indexOf(ans), shuffle: false,
    sol: S.m2.orden_s([...nums].sort((x, y) => x - y).join(" &lt; "), ans) };
});
// ¿Par o impar? con números de tres cifras (el de 1.º llega al 99): el truco de la última cifra, y la trampa
// de la lección (418 empieza por 4, pero manda el 8)
def("m2.parimpar", (R, S) => {
  const lastOk = p => R.pick(p ? [0, 2, 4, 6, 8] : [1, 3, 5, 7, 9]);
  const num = (first, last) => first * 100 + R.int(0, 9) * 10 + last;
  if (R.r() < 0.55) {
    const odd = R.r() < 0.5, trap = R.r() < 0.5;   // trap: la primera cifra es de la otra clase
    const n = num(trap ? R.pick(odd ? [2, 4, 6, 8] : [1, 3, 5, 7, 9]) : R.int(1, 9), lastOk(!odd));
    return { q: S.m2.par_q(n), kind: "choice", opts: S.m2.par_o, correct: odd ? 1 : 0, shuffle: false, sol: S.m2.par_s(n, n % 10, odd, Math.floor(n / 100), trap) };
  }
  const even = R.r() < 0.5;   // ¿cuál es par? / ¿cuál es impar?
  const good = num(R.int(1, 9), lastOk(even));
  const nums = [good, num(R.pick(even ? [2, 4, 6, 8] : [1, 3, 5, 7, 9]), lastOk(!even))];   // la trampa: empieza por la cifra buena
  while (nums.length < 4) { const x = num(R.int(1, 9), lastOk(!even)); if (!nums.includes(x)) nums.push(x); }
  const opts = R.shuffle(nums.map(String));
  return { q: S.m2.parcual_q(even), kind: "choice", opts, correct: opts.indexOf(String(good)), shuffle: false, sol: S.m2.parcual_s(opts.map(Number), good, even) };
});
def("m2.redondeo", (R, S) => {
  const n = R.int(11, 994), r = Math.round(n / 10) * 10;   // hasta 994: el 1000 no se ve en 2.º
  if (n % 10 === 0) return { q: S.m2.red_q(n + 3), kind: "int", ans: n, sol: S.m2.red_s(n + 3, 3, n, false) };
  return { q: S.m2.red_q(n), kind: "int", ans: r, sol: S.m2.red_s(n, n % 10, r, n % 10 >= 5) };
});

// ═════ Unidad 2 · La suma ═════
function carry(R, lo, hi) {
  let a, b;
  do { a = R.int(lo, hi); b = R.int(lo, hi); } while (a + b > 999 || (a % 10) + (b % 10) < 10 && (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) < 10);
  return [a, b];
}
def("m2.sumar", (R, S) => {
  // dos cifras + dos cifras (a veces sale una centena), tres + dos (colocar por la derecha) o tres + tres
  const k = R.r(), mix = k >= 0.35 && k < 0.55;
  let a, b;
  if (mix) { do { a = R.int(105, 899); b = R.int(15, 99); } while (a + b > 999 || (a % 10) + (b % 10) < 10 && (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) < 10); }
  else [a, b] = carry(R, k < 0.35 ? 15 : 105, k < 0.35 ? 99 : 899);
  if (mix && R.r() < 0.5) [a, b] = [b, a];   // el pequeño, a veces, primero
  // la suma en columnas, como en la lección: cada columna con su cuenta y la que me llevaba
  const cols = [], n = String(Math.max(a, b)).length;
  let c = 0;
  for (let p = 0; p < 3; p++) {
    const x = Math.floor(a / 10 ** p) % 10, y = Math.floor(b / 10 ** p) % 10, has = [a >= 10 ** p, b >= 10 ** p];
    if (p >= n) { if (c) cols.push(S.m2.sc_new(p)); break; }
    const s = x + y + c;
    cols.push(S.m2.sc_col(p, has[0] ? x : null, has[1] ? y : null, c, s, has[0] ? b : a));
    c = s >= 10 ? 1 : 0;
  }
  return { q: S.m2.suma_q(a, b), kind: "int", ans: a + b, sol: S.m2.suma_s(a, b, a + b, cols, mix) };
});
def("m2.propiedades", (R, S) => {
  const a = R.int(12, 89), b = R.int(12, 89), c = R.int(2, 30), k = R.int(0, 2);
  if (k === 0) return { q: S.m2.prop_q(`${a} + ${b} = ${b} + ☐`), kind: "int", ans: a, sol: S.m2.prop_s[0](a, b) };
  if (k === 1) return { q: S.m2.prop_q(`(${a} + ${b}) + ${c} = ${a} + (${b} + ☐)`), kind: "int", ans: c, sol: S.m2.prop_s[1](c) };
  return { q: S.m2.prop_q(`${a} + ☐ = ${a}`), kind: "int", ans: 0, sol: S.m2.prop_s[2] };
});
// Propiedades de la suma en 2.º, sin paréntesis (se ven en 3.º): el orden, los amigos del 10 y sumar 0
def("m2.propsuma", (R, S) => {
  const k = R.r();
  if (k < 0.35) {
    const a = R.int(12, 89), b = R.int(12, 89), left = R.r() < 0.5;
    return { q: S.m2.prop_q(left ? `${a} + ${b} = ${b} + ☐` : `☐ + ${a} = ${a} + ${b}`), kind: "int", ans: left ? a : b, sol: S.m2.ps_orden(a, b, left ? a : b) };
  }
  if (k < 0.8) {
    const p = R.int(1, 9), q = 10 - p, r = R.r() < 0.5 ? R.int(2, 9) : R.int(11, 29);
    const nums = R.shuffle([p, q, r]), [x, y] = nums.indexOf(p) <= nums.lastIndexOf(q) ? [p, q] : [q, p];   // la pareja, en el orden en que se lee
    return { q: S.m2.ps_amigos_q(nums.join(" + ")), kind: "int", ans: 10 + r, sol: S.m2.ps_amigos_s(x, y, r, 10 + r) };
  }
  const a = R.int(5, 350), v = R.int(0, 2);
  const e = [`${a} + ☐ = ${a}`, `${a} + 0 = ☐`, `0 + ${a} = ☐`][v];
  return { q: S.m2.prop_q(e), kind: "int", ans: v ? a : 0, sol: S.m2.ps_cero(a, v ? a : 0) };
});
function mental(resta) {
  return (R, S) => {
  const k = resta ? R.int(0, 3) : R.pick([0, 1, 3, 4]), a = R.int(12, 88);
  if (k === 4) {   // Truco 3: partir en decenas y unidades (sin llevar)
    let x, y; do { x = R.int(11, 78); y = R.int(11, 78); } while ((x % 10) + (y % 10) > 9 || x + y > 99 || x % 10 === 0 || y % 10 === 0);
    const dx = x - x % 10, dy = y - y % 10;
    return { q: S.m2.suma_q(x, y), kind: "int", ans: x + y, sol: S.m2.ment_partir(dx, dy, x % 10, y % 10, x + y) };
  }
  if (k === 0) { const t = R.int(1, 5) * 10; return { q: S.m2.suma_q(a, t), kind: "int", ans: a + t, sol: S.m2.ment_s[0](a, t, a + t) }; }
  if (k === 1) { const b = R.pick([9, 19, 29]); return { q: S.m2.suma_q(a, b), kind: "int", ans: a + b, sol: S.m2.ment_s[1](a, b, b + 1, a + b) }; }
  if (k === 2) { const b = R.pick([9, 11, 19, 21]); return { q: S.m2.resta_q(a + 30, b), kind: "int", ans: a + 30 - b, sol: S.m2.ment_s[2](a + 30, b, a + 30 - b) }; }
  const x = R.int(1, 9) * 10, y = 100 - x; return { q: S.m2.suma_q(x, y), kind: "int", ans: 100, sol: S.m2.ment_s[3](x, y) };
  };
}
def("m2.mental", mental(true));          // con restar 9, 11, 19, 21 (lo usa también Mates 3)
def("m2.mentalsuma", mental(false));     // solo los trucos de sumar (Mates 2: restar de cabeza va en la U3)
// Series hasta el 999 (el de 1.º, m1.saltos, llega al 99): de 2, 5, 10 y 100 en 100, que suben o bajan; un tercio
// de las de 2, 5 y 10 pasan por una centena (390, 400, 410); y torres que crecen
def("m2.saltos", (R, S) => {
  if (R.r() < 0.15) {   // torres de cubitos: 3 torres y la siguiente
    const a = R.int(1, 3), g = R.int(1, 3), hs = [a, a + g, a + 2 * g], u = 10;
    let b = "";
    hs.forEach((h, i) => { for (let j = 0; j < h; j++) b += `<rect x="${10 + i * 40}" y="${8 + (9 - j) * u}" width="${u * 2}" height="${u}" fill="#fef6e7" stroke="${C.amber}" stroke-width="1.5"/>`; });
    b += `<rect x="130" y="${8 + 10 * u - 30}" width="20" height="30" rx="4" fill="#fff" stroke="${C.grey}" stroke-dasharray="4 3" stroke-width="1.5"/>` + SVG.txt(140, 8 + 10 * u - 9, "?", 16, C.grey, "middle", "bold");
    return { q: S.m2.torre_q(hs.join(", ")) + "<br>" + SVG.svg(162, 8 + 10 * u + 6, b), kind: "int", ans: a + 3 * g, sol: S.m2.torre_s(hs, g, a + 3 * g) };
  }
  const st = R.pick([2, 5, 10, 10, 100]), len = 5, down = R.r() < 0.3;
  let start;
  if (st === 100) start = R.r() < 0.5 ? R.int(1, 5) * 100 : R.int(1, 59) * 10 + (R.r() < 0.3 ? R.int(1, 9) : 0);
  else if (R.r() < 0.35) {   // pasa por una centena
    const cen = R.int(1, 9) * 100, back = st * R.int(1, len - 1);
    start = cen - back + (st === 10 ? R.pick([0, 0, 5]) : 0);
  } else { const top = 999 - st * (len - 1); start = st === 5 ? R.int(2, Math.floor(top / 5)) * 5 : R.int(10, top); }
  let seq = Array.from({ length: len }, (_, i) => start + i * st);
  if (down) seq = seq.reverse();
  const hole = R.int(1, len - 1), ans = seq[hole];
  const cross = seq.some((x, i) => i && Math.floor(x / 100) !== Math.floor(seq[i - 1] / 100)) && st < 100;
  return { q: S.m2.ser_q(seq.map((x, i) => i === hole ? "☐" : x).join(", ")), kind: "int", ans,
    sol: S.m2.ser_s(st, down, seq.map((x, i) => i === hole ? `<b>${x}</b>` : x).join(", "), ans, cross) };
});

// ═════ Unidad 3 · La resta ═════
def("m2.restar", (R, S) => {
  let a, b;
  const small = R.r() < 0.4;
  do { a = R.int(small ? 20 : 120, small ? 99 : 999); b = R.int(11, a - 1); } while ((a % 10) >= (b % 10) && (Math.floor(a / 10) % 10) >= (Math.floor(b / 10) % 10));
  // Método de los colegios de España: si arriba hay menos, «le pongo un 1 delante y me llevo una»,
  // que se suma a la cifra de abajo de la columna siguiente
  const steps = [];
  let carry = 0;
  for (let p = 0; p < String(a).length; p++) {
    const top = Math.floor(a / 10 ** p) % 10, b0 = Math.floor(b / 10 ** p) % 10, bot = b0 + carry;
    // a (último argumento): para los idiomas que explican la resta pidiendo a la columna siguiente (en: regrouping)
    if (p === String(a).length - 1 && top === bot && p > 0) { steps.push(S.m2.rs_col(p, top, b0, carry, false, 0, true, a)); break; }
    const borrow = top < bot;
    steps.push(S.m2.rs_col(p, top, b0, carry, borrow, (borrow ? top + 10 : top) - bot, false, a));
    carry = borrow ? 1 : 0;
  }
  return { q: S.m2.resta_q(a, b), kind: "int", ans: a - b, sol: S.m2.resta_s(a, b, a - b, steps) };
});
def("m2.prueba", (R, S) => {
  const b = R.int(12, 300), d = R.int(12, 400), a = b + d, k = R.int(0, 2);
  if (k === 0) return { q: S.m2.pr_q0(a, b, d), kind: "int", ans: a, sol: S.m2.pr_s0(d, b, a) };
  if (k === 1) return { q: S.m2.hueco_q(`☐ − ${b} = ${d}`), kind: "int", ans: a, sol: S.m2.pr_s1(d, b, a) };
  return { q: S.m2.hueco_q(`${a} − ☐ = ${d}`), kind: "int", ans: b, sol: S.m2.pr_s2(a, d, b) };
});
// «¿Sumo o resto?» con números de dos y tres cifras (el de 1.º, m1.prob99, no lleva y llega al 99): juntar, quitar,
// comparar, «¿cuántos faltan?» y «tiene N más que…», con los pasos de la lección (pienso, calculo, compruebo)
def("m2.prob", (R, S) => {
  const T = S.m2.PB, k = R.int(0, 4), big = R.r() < 0.5, [N, fN] = R.pick(T.nombres);
  let M, fM; do [M, fM] = R.pick(T.nombres); while (M === N);
  const [obj, fo, hi] = R.pick(k === 1 || k === 3 ? T.objs.slice(0, 3) : T.objs);   // los puntos no se regalan ni se pegan
  let a, b;
  for (;;) {   // a > b; casi siempre se lleva
    a = big ? R.int(120, hi) : R.int(25, 99); b = big ? R.int(15, a - 10) : R.int(11, a - 5);
    const plus = k === 0 || k === 4, r = plus ? a + b : a - b;
    if (plus && r > 999) continue;
    const lleva = plus ? (a % 10) + (b % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10 : (a % 10) < (b % 10) || (Math.floor(a / 10) % 10) < (Math.floor(b / 10) % 10);
    if (lleva || R.r() < 0.2) break;
  }
  const plus = k === 0 || k === 4, r = plus ? a + b : a - b;
  return { q: T.q[k](N, fN, M, fM, a, b, obj, fo), kind: "int", ans: r, sol: T.s[k](a, b, r, obj, M) };
});
def("m2.dospasos", (R, S) => {
  const N = R.pick(S.m2.dp_nombres), k = R.int(0, 4);
  if (k === 4) {   // de compras: sumar los precios y calcular la vuelta
    const [[c1, lo1, hi1], [c2, lo2, hi2]] = R.shuffle(S.m2.compras).slice(0, 2);
    const a = R.int(lo1, hi1), b = R.int(lo2, hi2), p = a + b < 20 ? 20 : 50;
    return { q: S.m2.dp_compra_q(N, c1, a, c2, b, p), kind: "int", ans: p - a - b, sol: S.m2.dp_compra_s(a, b, p) };
  }
  let a, b, c, ans;
  // rangos creíbles para cada historia: hucha y libro, autobús (≤ 55 plazas), huevos de una granja, páginas
  const RG = [[[25, 90], [6, 18], [5, 20]], [[10, 40], [2, 15], [2, 20]], [[120, 400], [20, 120], [20, 120]], [[12, 60], [10, 60], [10, 60]]][k];
  for (;;) {
    a = R.int(...RG[0]); b = R.int(...RG[1]); c = R.int(...RG[2]);
    if (k === 1 && (a + b > 55 || c >= a + b)) continue;
    ans = [a - b + c, a + b - c, a - b - c, a + b + c][k];
    if (ans > 0 && (k !== 0 || a > b) && (k !== 2 || a > b + c)) break;
  }
  return { q: S.m2.dp_q[k](N, a, b, c), kind: "int", ans, sol: S.m2.dp_s[k](a, b, c, [a - b, a + b, a - b, a + b][k], ans) };
});

// ═════ Unidad 4 · La multiplicación ═════
def("m2.repetida", (R, S) => {
  const n = R.int(2, 6), k = R.int(2, 5), sh = R.pick(["circle", "star", "heart", "square"]), c = R.pick(COLS), v = R.r();
  if (v < 0.15) {   // el doble y el triple
    const t = R.int(2, 3), m = R.int(2, 10);
    return { q: S.m2.dobtri_q(t, m), kind: "int", ans: t * m, sol: S.m2.dobtri_s(t, m) };
  }
  if (v < 0.3) {   // en filas: k filas de n
    return { q: S.m2.filas_q + "<br>" + SVG.dots(n * k, { per: n, shape: sh === "heart" ? "circle" : sh, color: c }), kind: "int", ans: n * k, sol: S.m2.filas_s(k, n, Array(k).fill(n).join(" + "), n * k) };
  }
  if (v < 0.45) {   // ¿qué suma es k × n? (el error de escribirla al revés)
    const good = Array(k).fill(n).join(" + "), opts = R.shuffle([...new Set([good, Array(n).fill(k).join(" + "), `${k} + ${n}`, Array(k + 1).fill(n).join(" + ")])]);
    return { q: S.m2.quesuma_q(k, n), kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol: S.m2.quesuma_s(k, n, good, n * k) };
  }
  if (R.r() < 0.5) {
    let b = ""; const r = 10, gap = 26;
    for (let i = 0; i < k; i++) { b += `<rect x="${4 + i * (n * gap + 14)}" y="4" width="${n * gap + 4}" height="${gap + 6}" rx="8" fill="#f6f8fb" stroke="${C.grey}"/>`; for (let j = 0; j < n; j++) b += SVG.shape(sh, 4 + i * (n * gap + 14) + 15 + j * gap, 4 + 3 + gap / 2, r, c); }
    return { q: S.m2.grupos_q(k, n) + "<br>" + SVG.svg(8 + k * (n * gap + 14), gap + 14, b), kind: "int", ans: n * k, sol: S.m2.grupos_s(k, n, Array(k).fill(n).join(" + "), n * k) };
  }
  const sum = Array(k).fill(n).join(" + ");
  return { q: S.m2.rep_q(sum, n), kind: "int", ans: k, sol: S.m2.rep_s(sum, k, n, n * k) };
});
function tabla(ts) {
  return (R, S) => {
    const t = R.pick(ts), m = R.int(0, 10), k = R.r();
    if (k < 0.65) {   // la solución lee la multiplicación tal como se pregunta: «a × b» es «a veces b»
      const [a, b] = R.r() < 0.5 ? [t, m] : [m, t];
      return { q: S.m2.mult_q(`${a} ${X} ${b}`), kind: "int", ans: t * m, sol: S.m2.mult_s(a, b, t * m, t) };
    }
    if (k < 0.85) return { q: S.m2.hueco_q(`${t} ${X} ☐ = ${t * m}`), kind: "int", ans: m, sol: S.m2.multh_s(t, m, t * m) };
    const p = R.pick(S.m2.paquetes), mm = m || 3;
    return { q: S.m2.pm_q(mm, p, t), kind: "int", ans: t * mm, sol: S.m2.mult_s(mm, t, t * mm, t) };
  };
}
def("m2.tabla2510", tabla([2, 5, 10]));
def("m2.tabla34", tabla([3, 4]));
def("m2.tabla67", tabla([6, 7]));   // «Las tablas del 6 y 7»
def("m2.tabla89", tabla([8, 9]));   // «Las tablas del 8 y 9»
def("m2.tablas", tabla([2, 3, 4, 5, 6, 7, 8, 9, 10]));

// ═════ Unidad 5 · Repartir ═════
def("m2.reparto", (R, S) => {
  const k = R.int(2, 5), each = R.int(2, 6), n = k * each, [obj, fem] = R.pick(S.m2.objs), v = R.r();
  if (v < 0.25) {   // a veces sobra: la tabla «sin pasarse»
    const r = R.int(1, k - 1), N = n + r;
    return { q: S.m2.rep3_q(N, obj, k, fem), kind: "fields", fields: S.m2.rep3_f.map((label, i) => ({ label, ans: [each, r][i] })), sol: S.m2.rep3_s(N, k, each, r) };
  }
  if (v < 0.5) return { q: S.m2.grp_q(n, obj, each, fem), kind: "int", ans: k, sol: S.m2.grp_s(n, each, k) };   // hacer grupos: ¿cuántas bolsas?
  return { q: S.m2.rep2_q(n, obj, k, fem), kind: "int", ans: each, sol: S.m2.rep2_s(n, k, each) };
});
// barra partida en d trozos, iguales o no (para «¿de verdad son iguales?»)
function fracParts(ws) {
  let b = "", x = 6;
  ws.forEach((w, i) => { b += `<rect x="${x}" y="6" width="${w}" height="34" fill="${i === 0 ? C.blue : "#fff"}" stroke="${C.dark}" stroke-width="1.5"/>`; x += w; });
  return SVG.svg(x + 6, 46, b);
}
def("m2.fraccion", (R, S) => {
  const d = R.int(2, 4), di = d - 2, v = R.r();
  if (v < 0.15) {   // ¿son partes iguales?
    const ok = R.r() < 0.5, base = 180 / d;
    let ws = Array(d).fill(base);
    if (!ok) { const i = R.int(0, d - 1), j = (i + 1) % d, dw = Math.round(base * R.pick([0.4, 0.5, 0.6])); ws = ws.map((w, k) => k === i ? w + dw : k === j ? w - dw : w); }
    return { q: S.m2.friq_q(S.m2.fr_pl[di]) + "<br>" + fracParts(ws), kind: "choice", opts: S.m2.sim_o, correct: ok ? 0 : 1, shuffle: false, sol: S.m2.friq_s(ok, d, S.m2.fr_pl[di]) };
  }
  if (v < 0.3) {   // ¿qué trozo es más grande?
    const [a, b] = R.shuffle([2, 3, 4]).slice(0, 2), names = S.m2.fr_o, opts = [names[a - 2], names[b - 2], S.m2.fr_igual];
    return { q: S.m2.frcmp_q(a, b), kind: "choice", opts, correct: a < b ? 0 : 1, shuffle: false, sol: S.m2.frcmp_s(names[Math.min(a, b) - 2], names[Math.max(a, b) - 2]) };
  }
  if (v < 0.65) {
    const pic = R.r() < 0.5 ? SVG.fracPie(1, d) : SVG.fracBar(1, d, 180);
    return { q: S.m2.fr_q + "<br>" + pic, kind: "choice", opts: S.m2.fr_o, correct: di, shuffle: false, sol: S.m2.fr_s(d, S.m2.fr_o[di]) };
  }
  const n = d * R.int(2, 10);
  return { q: S.m2.frc_q(S.m2.frc_w[di], n), kind: "int", ans: n / d, sol: S.m2.frc_s(n, d, n / d) };
});

// ═════ Unidad 6 · Medidas ═════
def("m2.metro", (R, S) => {
  const k = R.int(0, 3);
  if (k === 0) { const len = R.int(2, 12), st = R.r() < 0.4 ? R.int(1, 3) : 0; return { q: S.m2.regla_q(st) + "<br>" + SVG.ruler(len, st, 15), kind: "int", ans: len, sol: S.m2.regla_s(st, st + len, len) }; }
  if (k === 1) { const m = R.int(1, 9); return { q: S.m2.mcm_q(m), kind: "int", ans: m * 100, sol: S.m2.mcm_s(m, m * 100) }; }
  if (k === 2) { const m = R.int(1, 5), cm = R.int(5, 95); return { q: S.m2.mcm2_q(m, cm), kind: "int", ans: m * 100 + cm, sol: S.m2.mcm2_s(m, cm, m * 100 + cm) }; }
  // al revés, como Lola: 125 cm son 1 m y 25 cm
  const m = R.int(1, 3), cm = R.int(5, 95), n = m * 100 + cm;
  return { q: S.m2.cmm_q(n), kind: "fields", fields: [{ label: "m", ans: m }, { label: "cm", ans: cm }], sol: S.m2.cmm_s(n, m, cm) };
});
def("m2.unidad", (R, S) => {
  const [what, k] = R.pick(S.m2.medir_cosas);
  return { q: S.m2.unid_q(what), kind: "choice", opts: S.m2.unid_o, correct: k, shuffle: false, sol: S.m2.unid_s(what, S.m2.unid_o[k].toLowerCase(), k) };
});
def("m2.kilolitro", (R, S) => {
  const k = R.int(0, 2);
  if (k === 0) { const a = R.int(1, 9), b = R.int(1, 9); const [obj] = R.pick(S.m2.pesos); return { q: S.m2.kg_q(a, b, obj), kind: "int", ans: a + b, sol: S.m2.kg_s(a, b, a + b) }; }
  if (k === 1) { const n = R.int(2, 10); return { q: S.m2.medios_q(n), kind: "int", ans: n * 2, sol: S.m2.medios_s(n, n * 2) }; }
  const a = R.int(5, 20), b = R.int(1, a - 1); return { q: S.m2.litros_q(a, b), kind: "int", ans: a - b, sol: S.m2.litros_s(a, b, a - b) };
});
// La hora h:m (m = 0, 30, 15 o 45 según k) dicha con palabras y tres opciones que cazan el error de la hora
// Hora del reloj digital (h de 1 a 12) con H.time: es «4:15»; si el idioma escribe a.m./p.m. (S.m2.ampm, en), las
// horas del 7 al 11 son de la mañana y las del 12 al 6, de la tarde (horas de un día de colegio): «4:15 p.m.»;
// con S.m2.ampm === false, la pantalla sin a.m./p.m. en cualquier idioma («4:15»)
const clk = (S, H, h, m) => S.m2.ampm === false ? `${h}:${String(m).padStart(2, "0")}` : H.time(S.m2.ampm && (h < 7 || h === 12) ? h % 12 + 12 : h, m);
function horaOpts(R, S, H) {
  const h = R.int(1, 12), k = R.int(0, 3), m = [0, 30, 15, 45][k];
  const nh = h % 12 + 1, phrase = [S.m2.hr_punto(h), S.m2.hr_media(h), S.m2.hr_cuarto(h), S.m2.hr_menos(nh)];
  const ok = phrase[k], alts = [S.m2.hr_media(nh), S.m2.hr_cuarto(nh), S.m2.hr_menos(h), S.m2.hr_punto(nh), ...phrase];
  const set = new Set([ok]); for (const a of alts) if (set.size < 4) set.add(a);
  return { h, k, m, nh, ok, opts: R.shuffle([...set]), dig: clk(S, H, h, m) };
}
// «El reloj de agujas»: leer la hora, los minutos de la aguja larga (de 5 en 5) y cuánto dura algo
def("m2.reloj", (R, S, H) => {
  const { h, k, m, nh, ok, opts } = horaOpts(R, S, H), v = R.r();
  if (v < 0.2) {   // cada número son 5 minutos: la tabla del 5
    const n = R.int(1, 11);
    return { q: S.m2.min_q(n) + "<br>" + SVG.clock(h, n * 5), kind: "int", ans: n * 5, sol: S.m2.min_s(n), hint: S.m2.min_h };
  }
  if (v < 0.35 && k !== 3) {   // ¿cuánto dura? empieza a una hora y dura un cuarto de hora o media hora
    const dur = m === 30 ? 15 : R.pick([15, 30]), e = m + dur, P = [S.m2.hr_punto, S.m2.hr_cuarto, S.m2.hr_media, S.m2.hr_menos];
    const end = e === 45 ? S.m2.hr_menos(nh) : P[e / 15](h), wrong = [S.m2.hr_menos(h), e === 45 ? S.m2.hr_cuarto(h) : S.m2.hr_menos(nh), P[(e / 15 + 1) % 4 === 3 ? 2 : (e / 15 + 1) % 4](nh), P[e / 15 === 3 ? 0 : e / 15](nh)];
    const dopts = R.shuffle([...new Set([end, ...wrong])].slice(0, 4));
    return { q: S.m2.dur_q(ok.toLowerCase(), dur), kind: "choice", opts: dopts, correct: dopts.indexOf(end), shuffle: false, sol: S.m2.dur_s(ok.toLowerCase(), dur, m, e, end) };
  }
  return { q: S.m2.reloj_q + "<br>" + SVG.clock(h, m), kind: "choice", opts, correct: opts.indexOf(ok), shuffle: false, sol: S.m2.reloj_s[k](ok, h, nh) };
});
// «El reloj digital»: leerlo, escribir la hora como él, pasar del reloj de agujas al digital y un rato después
def("m2.relojdig", (R, S, H) => {
  const { h, k, m, nh, ok, opts, dig } = horaOpts(R, S, H), v = R.r(), DT = (hh, mm) => clk(S, H, hh, mm);
  const ph = h === 1 ? 12 : h - 1, n = [12, 6, 3, 9][k];   // n: el número al que apunta la aguja larga
  // la buena; la hora equivocada (en «menos cuarto», la que viene); el número de la aguja leído como minutos; otro cuarto
  const digOpts = () => R.shuffle([...new Set([dig, DT(k === 3 || R.r() < 0.5 ? nh : ph, m), DT(h, n), DT(h, [30, 45, 0, 15][k])])]);
  if (v < 0.3) return { q: S.m2.dig_q(dig), kind: "choice", opts, correct: opts.indexOf(ok), shuffle: false, sol: S.m2.dig_s(dig, h, m, ok) };
  if (v < 0.5) { const o = digOpts(); return { q: S.m2.digw_q(ok.toLowerCase()), kind: "choice", opts: o, correct: o.indexOf(dig), shuffle: false, sol: S.m2.digw_s(dig, h, m, ok) }; }
  if (v < 0.8) { const o = digOpts(); return { q: S.m2.adig_q + "<br>" + SVG.clock(h, m), kind: "choice", opts: o, correct: o.indexOf(dig), shuffle: false, sol: S.m2.adig_s(dig, h, m, n) }; }
  // un cuarto de hora o media hora después, sin pasar a la hora siguiente: 4:15 y media hora más, 4:45
  const m0 = R.pick([0, 0, 15, 30]), dur = m0 === 30 ? 15 : R.pick([15, 30]), e = m0 + dur, d1 = DT(h, e);
  const o = R.shuffle([...[0, 15, 30, 45].filter(x => x !== m0).map(x => DT(h, x)), DT(nh, m0)]);
  return { q: S.m2.desp_q(DT(h, m0), dur), kind: "choice", opts: o, correct: o.indexOf(d1), shuffle: false, sol: S.m2.desp_s(m0, dur, e, d1) };
});
// Hoja de un mes de 2027, como la de la lección (columnas de lunes a domingo); marks = {día: color}
// S.m2.CA (opcional): inicio = día de la primera columna (0 domingo, 1 lunes; por omisión, 1) y finde = columnas en
// rojo (por omisión, [5, 6]); cal_l, cal_pl y OD.dias van en ese orden. En inglés, de domingo a sábado.
function monthSheet(S, mo, marks = {}) {
  const CA = S.m2.CA || {}, we = CA.finde || [5, 6];
  const first = (new Date(2027, mo, 1).getDay() + 7 - (CA.inicio ?? 1)) % 7, len = new Date(2027, mo + 1, 0).getDate(), cw = 34, rh = 26, x0 = 6, y0 = 50;
  let b = SVG.txt(x0 + 3.5 * cw, 20, S.m2.cal_tit(S.m2.OD.meses[mo], 2027), 15, C.dark, "middle", "bold");
  S.m2.cal_l.forEach((l, i) => { b += SVG.txt(x0 + i * cw + cw / 2, 42, l, 13, we.includes(i) ? C.red : C.dark, "middle", "bold"); });
  for (let d = 1; d <= len; d++) {
    const i = first + d - 1, x = x0 + (i % 7) * cw, y = y0 + Math.floor(i / 7) * rh, mk = marks[d];
    b += `<rect x="${x}" y="${y}" width="${cw}" height="${rh}" fill="${mk ? mk : "#fff"}" fill-opacity="${mk ? 0.25 : 1}" stroke="${C.grey}"/>` + SVG.txt(x + cw / 2, y + 18, d, 13, mk || C.dark, "middle", mk ? "bold" : "normal");
  }
  return { pic: SVG.svg(x0 * 2 + 7 * cw, y0 + Math.ceil((first + len) / 7) * rh + 6, b), first, len };
}
// «Leer el calendario» (el de 1.º, m1.dias, solo pregunta el día de antes o de después): qué día de la semana es una
// fecha, una semana después (+ 7), cuántos domingos tiene el mes y cuántos días faltan
def("m2.calendario", (R, S) => {
  const T = S.m2, mo = R.int(0, 11), D = T.OD.dias, M = T.OD.meses[mo], k = R.int(0, 3);
  const { first, len } = monthSheet(S, mo), wd = d => (first + d - 1) % 7;
  if (k === 0) {
    const d = R.int(1, len), w = wd(d), { pic } = monthSheet(S, mo, { [d]: C.red });
    const cands = [(w + 1) % 7, (w + 6) % 7, (w + 2) % 7].map(i => capF(D[i])), { opts, correct } = pick4(R, capF(D[w]), cands);
    return { q: T.calw_q(d, M) + "<br>" + pic, kind: "choice", opts, correct, sol: T.calw_s(d, T.cal_l[w], D[w]) };
  }
  if (k === 1) {
    const d = R.int(1, len - 7), { pic } = monthSheet(S, mo, { [d]: C.blue });
    return { q: T.cal7_q(D[wd(d)], d, M) + "<br>" + pic, kind: "int", ans: d + 7, sol: T.cal7_s(d, D[wd(d)]) };
  }
  if (k === 2) {
    const w = R.int(0, 6), days = []; for (let d = 1; d <= len; d++) if (wd(d) === w) days.push(d);
    return { q: T.caln_q(T.cal_pl[w]) + "<br>" + monthSheet(S, mo).pic, kind: "int", ans: days.length, sol: T.caln_s(T.cal_pl[w], days) };
  }
  const d1 = R.int(1, len - 3), d2 = R.int(d1 + 2, Math.min(len, d1 + 12)), { pic } = monthSheet(S, mo, { [d1]: C.blue, [d2]: C.red });
  return { q: T.calf_q(d1, M, d2) + "<br>" + pic, kind: "int", ans: d2 - d1, sol: T.calf_s(d1, d2) };
});
// Monedas y billetes con su tamaño de verdad (la de 50 céntimos, más grande que la de 1 €), como en la figura de la
// lección; los radios siguen los diámetros reales (SVG.money los dibuja todos casi iguales)
function money2(cents) {
  const R = { 1: 12, 2: 13.5, 5: 15, 10: 14, 20: 16, 50: 17.5, 100: 16.5, 200: 18.5 }, kinds = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  let b = "", x = 8, rest = cents;
  for (const k of kinds) {
    while (rest >= k && x < 600) {
      rest -= k;
      if (k >= 500) { b += `<rect x="${x}" y="10" width="70" height="40" rx="4" fill="${{ 500: "#d3d6db", 1000: "#f4b6ad", 2000: "#b5d0f2", 5000: "#f8c48a" }[k]}" stroke="${C.dark}"/>` + SVG.txt(x + 35, 36, `${k / 100} €`, 15, C.dark, "middle", "bold"); x += 76; continue; }
      const r = R[k];
      if (k >= 100) {   // 1 €: corona dorada y centro plateado; 2 €: al revés
        const gold = "#e9c44c", silver = "#d5d9df", out = k === 200 ? silver : gold, inn = k === 200 ? gold : silver;
        b += `<circle cx="${x + r}" cy="30" r="${r}" fill="${out}" stroke="${C.dark}"/><circle cx="${x + r}" cy="30" r="${r * 0.66}" fill="${inn}" stroke="#8a8f96" stroke-width=".8"/>` + SVG.txt(x + r, 34, `${k / 100}€`, 11, C.dark, "middle", "bold");
      } else b += `<circle cx="${x + r}" cy="30" r="${r}" fill="${k >= 10 ? "#f0c75e" : "#d39a63"}" stroke="${C.dark}"/>` + SVG.txt(x + r, 34, `${k}c`, 10, C.dark, "middle", "bold");
      x += 2 * r + 6;
    }
  }
  return SVG.svg(x + 4, 60, b);
}
// En otra moneda (H.moneyCfg.code; en: dólares), las mismas cantidades con sus billetes y monedas (SVG.money)
def("m2.euros", (R, S, H) => {
  if (R.r() < 0.55) {
    const c = R.int(1, 15) * 100 + R.pick([5, 10, 20, 50, 70, 25, 60, 85, 35]), pic = H.moneyCfg.code === "EUR" ? money2(c) : SVG.money(c);
    return { q: S.m2.din_q + "<br>" + pic, kind: "fields", fields: [{ label: S.m2.eur_f, ans: Math.floor(c / 100) }, { label: S.m2.cent, ans: c % 100 }], sol: S.m2.din_s(Math.floor(c / 100), c % 100) };
  }
  // precios creíbles para cada cosa (en céntimos); las vueltas de 1 € o más se dan en euros y céntimos
  const [thing, lo, hi] = R.pick(S.m2.tienda), p = R.int(lo / 5, hi / 5) * 5, pay = p < 100 && R.r() < 0.6 ? 100 : 200, c = pay - p;
  if (c < 100) return { q: S.m2.cambio_q(thing, p, pay / 100), kind: "int", ans: c, sol: S.m2.cambio_s(pay, p, c) };
  return { q: S.m2.cambio2_q(thing, p, pay / 100), kind: "fields", fields: [{ label: S.m2.eur_f, ans: Math.floor(c / 100) }, { label: S.m2.cent, ans: c % 100 }], sol: S.m2.cambio_s(pay, p, c) };
});

// ═════ Unidad 7 · Geometría ═════
function linePic(k, R) {
  let d;
  if (k === 0) d = `M20,${R.int(20, 60)} L180,${R.int(20, 60)}`;
  else if (k === 1) d = `M20,50 C60,${R.int(-10, 20)} 100,${R.int(70, 100)} 180,40`;
  else if (k === 2) { let x = 20, s = `M${x},50`; for (let i = 0; i < 4; i++) { x += 40; s += ` L${x},${R.pick([15, 30, 60, 75])}`; } d = s; }
  else d = `M20,60 L80,20 C120,0 140,90 180,50`;
  return SVG.svg(200, 80, `<path d="${d}" fill="none" stroke="${C.blue}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);
}
// Línea cerrada (curva o poligonal) o la misma con un hueco: abierta
function closedPic(open, R) {
  const n = R.int(5, 7), cx = 100, cy = 45, pts = Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n + R.r() * 0.4, rr = 0.75 + 0.25 * R.r(); return [cx + 70 * rr * Math.cos(a), cy + 32 * rr * Math.sin(a)]; });
  let d;
  const f = p => p.map(v => v.toFixed(1)).join(",");
  if (R.r() < 0.5) d = "M" + pts.map(f).join(" L") + (open ? "" : " Z");   // poligonal; abierta: falta el último lado
  else {   // curva: por los puntos medios, con curvas suaves; abierta: falta el último trozo
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    d = `M${f(mid(pts[n - 1], pts[0]))}` + pts.slice(0, open ? n - 1 : n).map((p, i) => ` Q${f(p)} ${f(mid(p, pts[(i + 1) % n]))}`).join("");
  }
  return SVG.svg(200, 92, `<path d="${d}" fill="none" stroke="${C.blue}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);
}
def("m2.lineas", (R, S) => {
  if (R.r() < 0.3) { const open = R.r() < 0.5; return { q: S.m2.abce_q + "<br>" + closedPic(open, R), kind: "choice", opts: S.m2.abce_o, correct: open ? 0 : 1, shuffle: false, sol: S.m2.abce_s[open ? 0 : 1] }; }
  const k = R.int(0, 3);
  return { q: S.m2.lin_q + "<br>" + linePic(k, R), kind: "choice", opts: S.m2.lin_o, correct: k, shuffle: false, sol: S.m2.lin_s[k] };
});
def("m2.poligono", (R, S) => {
  // de 3 a 6 lados casi siempre; 7 y 8, menos (y dibujados casi regulares, para que se vean bien todas las esquinas)
  const n = R.r() < 0.78 ? R.int(3, 6) : R.int(7, 8), r = n >= 7 ? 45 : 40, rot = R.r() * Math.PI;
  const pts = Array.from({ length: n }, (_, i) => { const a = rot + i * 2 * Math.PI / n, rr = r * (n >= 7 ? 0.95 + 0.05 * R.r() : 0.85 + 0.15 * R.r()); return `${(55 + rr * Math.cos(a)).toFixed(1)},${(50 + rr * Math.sin(a)).toFixed(1)}`; }).join(" ");
  const pic = SVG.svg(110, 100, `<polygon points="${pts}" fill="${R.pick(["#cfe0ff", "#d5fdf4", "#fef6e7", "#fee7e6"])}" stroke="${C.dark}" stroke-width="2"/>`);
  if (R.r() < 0.4) return { q: S.m2.lados_q + "<br>" + pic, kind: "int", ans: n, sol: S.m2.lados_s(n) };
  // cuatro nombres: el bueno, el de un lado menos, el de uno más y otro; en orden de lados
  const ns = new Set([n, n > 3 ? n - 1 : n + 2, n < 8 ? n + 1 : n - 2]);
  while (ns.size < 4) ns.add(R.int(3, 8));
  const list = [...ns].sort((a, b) => a - b), opts = list.map(x => S.m2.pol_o[x - 3]);
  return { q: S.m2.pol_q + "<br>" + pic, kind: "choice", opts, correct: list.indexOf(n), shuffle: false, sol: S.m2.pol_s(n, S.m2.pol_o[n - 3]) };
});
// Cuerpos geométricos de 2.º (el de 1.º, m1.cuerpo, solo tiene cubo, esfera, cilindro y cono): los seis, y ¿rueda?
const SOLIDS = ["cube", "prism", "pyramid", "cylinder", "cone", "sphere"];   // en el orden de S.m2.cue_o
def("m2.cuerpo", (R, S) => {
  const T = S.m2, v = R.r();
  if (v < 0.3) {   // ¿puede rodar?
    const k = R.int(0, 5), rolls = k >= 3;
    return { q: T.rueda_q + "<br>" + SVG.solid(SOLIDS[k]), kind: "choice", opts: T.sim_o, correct: rolls ? 0 : 1, shuffle: false, sol: T.rueda_s(T.cue_o[k].toLowerCase(), rolls, k) };
  }
  if (v < 0.55) {   // cosas de casa
    const [thing, k] = R.pick(T.cue_cosas), { opts, correct } = pick4(R, T.cue_o[k], R.shuffle(T.cue_o.filter((_, i) => i !== k)).slice(0, 3));
    return { q: T.cuecosa_q(thing), kind: "choice", opts, correct, sol: T.cuecosa_s(capF(thing), T.cue_o[k].toLowerCase(), T.cue_why[k]) };
  }
  const k = R.int(0, 5), { opts, correct } = pick4(R, T.cue_o[k], R.shuffle(T.cue_o.filter((_, i) => i !== k)).slice(0, 3));
  return { q: T.cue_q + "<br>" + SVG.solid(SOLIDS[k]), kind: "choice", opts, correct, sol: T.cue_s(T.cue_o[k].toLowerCase(), T.cue_why[k]) };
});
def("m2.simetria", (R, S) => {
  const W = 3, Hh = 4, u = 22, cells = [];
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) if (R.r() < 0.45 || x === W - 1 && y === 1) cells.push([x, y]);
  const sym = R.r() < 0.5, full = [];
  cells.forEach(([x, y]) => { full.push([x, y]); full.push([2 * W - 1 - x, y]); });
  if (!sym) {   // estropeamos la simetría: quitamos o ponemos una casilla de la derecha
    const x = R.int(W, 2 * W - 1), y = R.int(0, Hh - 1), i = full.findIndex(c => c[0] === x && c[1] === y);
    if (i >= 0) full.splice(i, 1); else full.push([x, y]);
  }
  let b = "";
  for (let y = 0; y < Hh; y++) for (let x = 0; x < 2 * W; x++) b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${full.some(c => c[0] === x && c[1] === y) ? C.blue : "#fff"}" stroke="${C.grey}"/>`;
  b += `<line x1="${6 + W * u}" y1="0" x2="${6 + W * u}" y2="${12 + Hh * u}" stroke="${C.red}" stroke-width="3" stroke-dasharray="6 4"/>`;
  return { q: S.m2.sim_q + "<br>" + SVG.svg(12 + 2 * W * u, 12 + Hh * u, b), kind: "choice", opts: S.m2.sim_o, correct: sym ? 0 : 1, shuffle: false, sol: S.m2.sim_s[sym ? 0 : 1] };
});

// «Completar en la cuadrícula»: ¿dónde va la pareja simétrica de un cuadrado? (se cuentan los cuadros desde el eje)
def("m2.simpareja", (R, S) => {
  const W = 6, Hh = 4, u = 22, d = R.int(1, 5), left = R.r() < 0.5, row = R.int(0, Hh - 1), col = left ? W - d : W + d - 1;
  let b = "";
  for (let y = 0; y < Hh; y++) for (let x = 0; x < 2 * W; x++) b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${x === col && y === row ? C.blue : "#fff"}" stroke="${C.grey}"/>`;
  b += `<line x1="${6 + W * u}" y1="0" x2="${6 + W * u}" y2="${12 + Hh * u}" stroke="${C.red}" stroke-width="3" stroke-dasharray="6 4"/>`;
  const T = S.m2, side = l => l ? T.izq : T.der, opt = (n, l) => T.sp_o(n, side(l));
  const good = opt(d, !left), cands = [opt(d, left), opt(d + 1, !left), opt(2 * d, !left), opt(d > 1 ? d - 1 : d + 2, !left)];
  const { opts, correct } = pick4(R, good, cands);
  return { q: T.sp_q + "<br>" + SVG.svg(12 + 2 * W * u, 12 + Hh * u, b), kind: "choice", opts, correct, sol: T.sp_s(d, side(left), side(!left)) };
});
// Caminos en la cuadrícula (el de 1.º, m1.posicion, es encima/debajo y dentro/fuera): qué camino lleva a la estrella,
// cuántos cuadros se recorren y a qué letra se llega
def("m2.camino", (R, S) => {
  const T = S.m2, Wc = 7, Hc = 5, u = 30;
  let sx, sy, tx, ty;
  do { sx = R.int(0, Wc - 1); sy = R.int(0, Hc - 1); tx = R.int(0, Wc - 1); ty = R.int(0, Hc - 1); } while (sx === tx || sy === ty);
  const dx = tx - sx, dy = sy - ty;   // dy > 0: hacia arriba
  const H = n => T.cam_h(Math.abs(n), n > 0), V = n => T.cam_v(Math.abs(n), n > 0);
  const cell = (x, y) => [6 + x * u + u / 2, 6 + y * u + u / 2];
  let b = "";
  for (let y = 0; y < Hc; y++) for (let x = 0; x < Wc; x++) b += `<rect x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="#fff" stroke="${C.grey}"/>`;
  const [rx, ry] = cell(sx, sy);
  b += `<circle cx="${rx}" cy="${ry}" r="11" fill="${C.green}" stroke="${C.dark}"/>` + SVG.txt(rx, ry + 5, "R", 13, "#fff", "middle", "bold");
  const k = R.r();
  if (k < 0.3) {   // ¿a qué letra llega?
    const letters = ["A", "B", "C"], spots = [[tx, ty]];
    for (const [x, y] of R.shuffle([[sx + dy * 0 + (tx - sx), sy + (sy - ty)], [sx - (tx - sx), ty], [tx, sy], [sx, ty], [tx + (dx > 0 ? -1 : 1), ty]])) if (x >= 0 && x < Wc && y >= 0 && y < Hc && !(x === sx && y === sy) && !spots.some(s => s[0] === x && s[1] === y) && spots.length < 3) spots.push([x, y]);
    const order = R.shuffle(spots.map((s, i) => i)), lab = spots.map((_, i) => letters[order.indexOf(i)]);
    spots.forEach(([x, y], i) => { const [cx, cy] = cell(x, y); b += SVG.txt(cx, cy + 6, lab[i], 17, C.red, "middle", "bold"); });
    const opts = letters.slice(0, spots.length);
    return { q: T.camlet_q(H(dx), V(dy)) + "<br>" + SVG.svg(12 + Wc * u, 12 + Hc * u, b), kind: "choice", opts, correct: opts.indexOf(lab[0]), shuffle: false, sol: T.camlet_s(H(dx), V(dy), lab[0]) };
  }
  const [gx, gy] = cell(tx, ty);
  b += SVG.shape("star", gx, gy, 12, C.amber);
  const pic = "<br>" + SVG.svg(12 + Wc * u, 12 + Hc * u, b);
  if (k < 0.55) return { q: T.camn_q + pic, kind: "int", ans: Math.abs(dx) + Math.abs(dy), sol: T.camn_s(H(dx), V(dy), Math.abs(dx), Math.abs(dy)) };
  const good = T.cam_o(H(dx), V(dy)), cands = [T.cam_o(T.cam_h(Math.abs(dy), dx > 0), T.cam_v(Math.abs(dx), dy > 0)), T.cam_o(H(-dx), V(dy)), T.cam_o(H(dx), V(-dy))];
  const { opts, correct } = pick4(R, good, cands);
  return { q: T.cam_q + pic, kind: "choice", opts, correct, sol: T.cam_s(H(dx), V(dy)) };
});

// ═════ Unidad 8 · Datos y azar ═════
// Palotes en grupos de 5 (cuatro de pie y el quinto los cruza), en (x, y); devuelve [svg, ancho]
function tally(n, x0, y0, h = 34) {
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.dark}" stroke-width="3" stroke-linecap="round"/>`;
  let b = "", x = x0 + 8;
  for (let i = 0; i < Math.floor(n / 5); i++) { for (let j = 0; j < 4; j++) b += ln(x + j * 9, y0, x + j * 9, y0 + h); b += ln(x - 5, y0 + h - 4, x + 32, y0 + 4); x += 50; }
  for (let j = 0; j < n % 5; j++) b += ln(x + j * 9, y0, x + j * 9, y0 + h);
  return [b, x + (n % 5) * 9 - x0];
}
// «Recuento con palotes» (el de 1.º, m1.picto, no tiene palotes ni pide pasar a la tabla): leer palotes, el total
// de una encuesta, cuántos tiene una respuesta y cuántos más tiene una que otra
def("m2.palotes", (R, S) => {
  const T = S.m2;
  if (R.r() < 0.35) {
    const n = R.int(6, 24), [b, w] = tally(n, 0, 8);
    return { q: T.pal_q + "<br>" + SVG.svg(w + 14, 52, b), kind: "int", ans: n, sol: T.pal_s(n) };
  }
  const cats = R.shuffle(T.colores).slice(0, 3);
  let ns; do ns = cats.map(() => R.int(3, 14)); while (new Set(ns).size < 3);
  let b = "", wmax = 0;
  cats.forEach((c, i) => { const [t, w] = tally(ns[i], 90, 10 + i * 46); b += SVG.txt(80, 33 + i * 46, c, 14, C.dark, "end") + t; wmax = Math.max(wmax, w); });
  const pic = "<br>" + SVG.svg(90 + wmax + 16, 20 + cats.length * 46, b), v = R.int(0, 2), rows = cats.map((c, i) => `${c}, ${ns[i]}`).join("; ");
  if (v === 0) { const tot = ns.reduce((a, x) => a + x, 0); return { q: T.paltot_q + pic, kind: "int", ans: tot, sol: T.paltot_s(rows, ns.join(" + "), tot) }; }
  if (v === 1) { const j = R.int(0, 2); return { q: T.paluno_q(cats[j]) + pic, kind: "int", ans: ns[j], sol: T.pal_s(ns[j]) }; }
  let a, c2; do { a = R.int(0, 2); c2 = R.int(0, 2); } while (ns[a] <= ns[c2]);
  return { q: T.paldif_q(cats[a], cats[c2]) + pic, kind: "int", ans: ns[a] - ns[c2], sol: T.paldif_s(cats[a], ns[a], cats[c2], ns[c2]) };
});
def("m2.barras", (R, S) => {
  const cats = R.shuffle(S.m2.cats.map((c, i) => [c, i])).slice(0, 4), CS = [C.blue, C.green, C.amber, C.red, C.purple];
  let vs; do vs = cats.map(() => R.int(1, 10)); while (new Set(vs).size < vs.length);
  const data = cats.map(([c, i], j) => ({ label: c, v: vs[j], c: CS[i % 5] })), pic = "<br>" + SVG.bars(data, 10, 1), k = R.int(0, 3);
  if (k === 3) {   // comparar dos barras: ¿cuántos más? (se resta)
    let a, b; do { a = R.int(0, 3); b = R.int(0, 3); } while (vs[a] <= vs[b]);
    return { q: S.m2.bardif_q(data[a].label, data[b].label) + pic, kind: "int", ans: vs[a] - vs[b], sol: S.m2.bardif_s(data[a].label, vs[a], data[b].label, vs[b]) };
  }
  if (k === 0) { const j = R.int(0, 3); return { q: S.m2.bar_q(data[j].label) + pic, kind: "int", ans: vs[j], sol: S.m2.bar_s(data[j].label, vs[j]) }; }
  if (k === 1) { const big = R.r() < 0.6, j = vs.indexOf(big ? Math.max(...vs) : Math.min(...vs)); return { q: (big ? S.m2.barmas_q : S.m2.barmenos_q) + pic, kind: "choice", opts: data.map(d => d.label), correct: j, shuffle: false, sol: S.m2.barmas_s(data[j].label, big) }; }
  const tot = vs.reduce((a, b) => a + b, 0); return { q: S.m2.bartot_q + pic, kind: "int", ans: tot, sol: S.m2.bartot_s(vs.join(" + "), tot) };
});
def("m2.azar", (R, S) => {
  const CS = [C.red, C.blue, C.green, C.amber], names = S.m2.bolas;
  if (R.r() < 0.2) {   // muchas de un color y solo una de otro: sacar la de muchas es posible, no seguro
    const [m, o] = R.shuffle([0, 1, 2, 3]).slice(0, 2), n = R.int(6, 8), balls = R.shuffle([...Array(n - 1).fill(m), o]), many = R.r() < 0.7;
    let b = `<path d="M20,40 Q20,130 90,130 Q160,130 160,40 Z" fill="#f6efe0" stroke="${C.dark}" stroke-width="2"/>`;
    balls.forEach((c, i) => { b += `<circle cx="${45 + (i % 4) * 30}" cy="${70 + Math.floor(i / 4) * 30}" r="12" fill="${CS[c]}" stroke="${C.dark}"/>`; });
    return { q: S.m2.azar_q(names[many ? m : o]) + "<br>" + SVG.svg(180, 140, b), kind: "choice", opts: S.m2.azar_o, correct: 1, shuffle: false, sol: S.m2.azar_mucho(names[m], names[o], many) };
  }
  const used = R.shuffle([0, 1, 2, 3]).slice(0, R.int(1, 3)), n = R.int(4, 8);
  const balls = Array.from({ length: n }, (_, i) => used[i % used.length]);
  const target = R.r() < 0.35 ? R.pick([0, 1, 2, 3].filter(c => !used.includes(c)).concat(used)) : R.pick(used);
  const k = !balls.includes(target) ? 2 : balls.every(b => b === target) ? 0 : 1;
  let b = `<path d="M20,40 Q20,130 90,130 Q160,130 160,40 Z" fill="#f6efe0" stroke="${C.dark}" stroke-width="2"/>`;
  R.shuffle(balls).forEach((c, i) => { b += `<circle cx="${45 + (i % 4) * 30}" cy="${70 + Math.floor(i / 4) * 30}" r="12" fill="${CS[c]}" stroke="${C.dark}"/>`; });
  return { q: S.m2.azar_q(names[target]) + "<br>" + SVG.svg(180, 140, b), kind: "choice", opts: S.m2.azar_o, correct: k, shuffle: false, sol: S.m2.azar_s[k](names[target]) };
});
// ═════ Ordinales del 1.º al 10.º y medir a ojo (generadores añadidos) ═════
const capF = s => s.charAt(0).toUpperCase() + s.slice(1);
// Opciones sin repetir: la buena y las de "cands" (hasta n), barajadas
function pick4(R, good, cands, n = 4) { const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n)); return { opts, correct: opts.indexOf(good) }; }

// ── Ordinales ──
const QSH = ["circle", "square", "triangle", "star", "heart", "rect"];   // en el orden de S.m2.OD.fig
const QCO = [C.red, C.blue, C.green, C.amber, C.purple];   // en el orden de S.m2.OD.col
function queue(items, front) {   // cola del tobogán: delante (a la izquierda) está el tobogán
  let b = `<path d="M6,82 Q14,40 42,30" fill="none" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/><line x1="42" y1="30" x2="58" y2="30" stroke="${C.dark}" stroke-width="3"/>`
    + `<line x1="58" y1="30" x2="58" y2="84" stroke="${C.dark}" stroke-width="2.5"/><line x1="46" y1="30" x2="46" y2="84" stroke="${C.dark}" stroke-width="2.5"/>`;
  for (let y = 40; y < 84; y += 10) b += `<line x1="46" y1="${y}" x2="58" y2="${y}" stroke="${C.dark}" stroke-width="1.5"/>`;
  b += SVG.txt(32, 16, front, 12, C.dark, "middle", "bold");
  items.forEach((it, i) => { b += SVG.shape(QSH[it.s], 82 + i * 38, 66, it.s === 5 ? 12 : 15, QCO[it.c]); });
  return SVG.svg(64 + items.length * 38 + 6, 90, b);
}
def("m2.ordinal", (R, S, H, L) => {
  const T = S.m2.OD, k = R.int(0, 5);
  const word = (n, f) => (f ? T.ordF : T.ordM)[n - 1];
  const ab = (n, f) => WA.H.ord(n, f);
  const fmt = (n, f) => `${ab(n, f)} (${word(n, f)})`;
  if (k === 0) {   // la cola del tobogán
    const n = R.int(6, 10), all = [];
    for (let s = 0; s < QSH.length; s++) for (let c = 0; c < QCO.length; c++) all.push({ s, c });
    const items = R.shuffle(all).slice(0, n), p = R.int(0, n - 1), it = items[p], back = R.r() < 0.4;
    const f = T.fig[it.s][1], name = T.nom(T.fig[it.s][0], T.col[it.c][f]), pos = back ? n - p : p + 1, other = back ? p + 1 : n - p;
    const { opts, correct } = pick4(R, fmt(pos, f), [other !== pos ? fmt(other, f) : fmt(pos + 2 <= 10 ? pos + 2 : pos - 2, f), fmt(pos > 1 ? pos - 1 : pos + 1, f), fmt(pos < 10 ? pos + 1 : pos - 2, f)]);
    return { q: T.cola_q(name, back) + "<br>" + queue(items, T.delante), kind: "choice", opts, correct, sol: T.cola_s(name, back ? n - p - 1 : p, pos, fmt(pos, f), back, f) };
  }
  if (k === 1) {   // leer 6.ª
    const n = R.int(1, 10), f = R.r() < 0.5;
    const { opts, correct } = pick4(R, capF(word(n, f)), [capF(word(n, !f)), capF(L.words(n)), capF(word(n < 10 ? n + 1 : n - 1, f))]);
    return { q: T.lee_q(ab(n, f)), kind: "choice", opts, correct, sol: T.lee_s(ab(n, f), n, f, word(n, f)) };
  }
  if (k === 2) {   // escribir «octava»
    const n = R.int(1, 10), f = R.r() < 0.5;
    const { opts, correct } = pick4(R, ab(n, f), [ab(n, !f), ab(n < 10 ? n + 1 : n - 1, f), n < 10 ? ab(10 + n, f) : ab(100, f)]);
    return { q: T.esc_q(word(n, f)), kind: "choice", opts, correct, sol: T.esc_s(word(n, f), n, f, ab(n, f)) };
  }
  if (k === 3) {   // la cola del comedor (sin dibujo)
    const [nom, f] = R.pick(T.nombres), v = R.int(0, 2);
    if (v === 0) { const p = R.int(2, 10); return { q: T.delante_q(nom, f, ab(p, f)), kind: "int", ans: p - 1, sol: T.delante_s(p, f) }; }
    const N = R.int(5, 10), p = R.int(2, N - 1);
    if (v === 1) return { q: T.detras_q(nom, f, N, ab(p, f)), kind: "int", ans: N - p, sol: T.detras_s(N, p, f) };
    const back = N - p + 1, { opts, correct } = pick4(R, fmt(back, f), [fmt(back - 1, f), back !== p ? fmt(p, f) : fmt(back + 2, f), fmt(back + 1, f)]);
    return { q: T.desde_q(nom, f, N, ab(p, f)), kind: "choice", opts, correct, sol: T.desde_s(nom, N, p, back, fmt(back, f)) };
  }
  if (k === 4) {   // días de la semana y meses
    const v = R.int(0, 2);
    if (v === 0) { const i = R.int(1, 6), D = T.dias; const { opts, correct } = pick4(R, capF(D[i]), [D[i - 1], D[(i + 1) % 7], D[(i + 2) % 7]].map(capF)); return { q: T.dia_q(word(i + 1, false)), kind: "choice", opts, correct, sol: T.dia_s(D.slice(0, i + 1).map((d, j) => `${d} (${ab(j + 1, false)})`).join(", "), D[i], word(i + 1, false)) }; }
    const i = R.int(0, 9), M = T.meses, list = M.slice(0, i + 1).map((m, j) => `${m} (${ab(j + 1, false)})`).join(", ");
    if (v === 1) { const { opts, correct } = pick4(R, capF(M[i]), [M[(i + 1) % 12], M[(i + 11) % 12], M[(i + 2) % 12]].map(capF)); return { q: T.mes_q(word(i + 1, false)), kind: "choice", opts, correct, sol: T.mes_s(list, M[i], word(i + 1, false)) }; }
    const { opts, correct } = pick4(R, capF(word(i + 1, false)), [i > 0 ? capF(word(i, false)) : capF(word(3, false)), capF(word(i < 9 ? i + 2 : i - 1, false)), capF(L.words(i + 1))]);
    return { q: T.mesl_q(M[i]), kind: "choice", opts, correct, sol: T.mes_s(list, M[i], word(i + 1, false)) };
  }
  if (R.r() < 0.5) {   // el último de la carrera
    const N = R.int(4, 10), { opts, correct } = pick4(R, capF(word(N, false)), [capF(word(N - 1, false)), N < 10 ? capF(word(N + 1, false)) : capF(L.words(N)), capF(word(1, false))]);
    return { q: T.ult_q(N), kind: "choice", opts, correct, sol: T.ult_s(N, word(N, false)) };
  }
  const after = R.r() < 0.5, n = after ? R.int(2, 9) : R.int(3, 10), a = after ? n + 1 : n - 1;   // el siguiente o el anterior
  const near = [a - 1, a + 1, a - 2, a + 2].filter(j => j >= 1 && j <= 10 && j !== n).map(j => capF(word(j, false)));
  const { opts, correct } = pick4(R, capF(word(a, false)), [capF(word(n, false)), ...near]);
  return { q: (after ? T.desp_q : T.ant_q)(word(n, false)), kind: "choice", opts, correct, sol: T.sig_s(word(n, false), ab(n, false), word(a, false), ab(a, false), after) };
});

// ── Medir a ojo ──
def("m2.medirojo", (R, S) => {
  const T = S.m2.MO, k = R.int(0, 5), [nom, fem] = R.pick(T.nombres);
  if (k === 0) { const [w, lo, hi] = R.pick(T.sitios), n = 2 * R.int(lo, hi); return { q: T.pasos_q(nom, w, n), kind: "int", ans: n / 2, sol: T.pasos_s(n, n / 2, w) }; }
  if (k === 1) { const [w, lo, hi] = R.pick(T.palmos), n = R.int(lo, hi); return { q: T.palmo_q(w, n), kind: "int", ans: 15 * n, sol: T.palmo_s(n, w) }; }
  if (k === 2) {
    if (R.r() < 0.5) { const l = R.int(1, 3); return { q: T.vasos_q(l), kind: "int", ans: 4 * l, sol: T.vasos_s(l) }; }
    const v = 4 * R.int(1, 3); return { q: T.litros_q(v), kind: "int", ans: v / 4, sol: T.litros_s(v) };
  }
  if (k === 3) {   // ¿cuánto mide, pesa o cabe, más o menos?
    const [what, kind, os, why] = R.pick(T.bank), { opts, correct } = pick4(R, os[0], os.slice(1));
    return { q: T.bank_q[kind](what), kind: "choice", opts, correct, sol: why };
  }
  if (k === 4) {   // sumar referentes
    if (R.r() < 0.5) { const a = R.int(1, 5), b = R.int(1, 5), [x, y] = R.shuffle(T.pesados).slice(0, 2); return { q: T.kg_q(x, a, y, b), kind: "int", ans: a + b, sol: T.kg_s(a, b) }; }
    const n = R.int(4, 9), u = R.int(1, n - 1), w = R.pick(T.cubos); return { q: T.bot_q(w, n, u), kind: "int", ans: n - u, sol: T.bot_s(n, u) };
  }
  // ¿quién ha estimado mejor?
  const [nom2] = R.pick(T.nombres.filter(x => x[0] !== nom)), [w, lo, hi] = R.pick(T.sitios), m = R.int(lo, hi - 1), cm = R.int(1, 9) * 10, real = m + cm / 100;
  const good = Math.round(real); let bad; do bad = R.int(2, 15); while (Math.abs(bad - real) < 3);
  const first = R.r() < 0.5;
  return { q: T.quien_q(nom, first ? good : bad, nom2, first ? bad : good, w, m, cm), kind: "choice", opts: [nom, nom2], correct: first ? 0 : 1, shuffle: false, sol: T.quien_s(m, cm, good, bad, first ? nom : nom2) };
});
// ── fin: ═════ Ordinales del 1.º al 10.º y medir a ojo (generadores añadidos) ═════
})();
