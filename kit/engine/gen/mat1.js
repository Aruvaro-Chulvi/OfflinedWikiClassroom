/* WikiAula — Matemáticas, Grado 1 (1.º de Primaria).
   Textos: i18n/<lang>/mat1.js (S.m1). Dibujos: WA.SVG (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SVG = WA.SVG, C = SVG.C;
const COLS = [C.blue, C.green, C.amber, C.red, C.purple];
// solo formas que se nombran en 1.º (círculo, cuadrado, triángulo, rectángulo) y dibujos (estrella, corazón): nada de rombos
const SHAPES = ["circle", "square", "triangle", "rect", "star", "heart"];

// Figuras en filas de "per" (de 5 en 5 para contar mejor); cross = cuántas tachar al final
function many(items, per = 5, cross = 0, r = 13) {
  const gap = 2 * r + 8, rows = Math.ceil(items.length / per) || 1;
  let b = "";
  items.forEach((it, i) => {
    const x = 8 + r + (i % per) * gap, y = 8 + r + Math.floor(i / per) * gap;
    b += SVG.shape(it.k, x, y, it.k === "rect" ? r * 0.8 : r, it.c);   // el rectángulo es más ancho: más pequeño para que no se toquen
    if (i >= items.length - cross) b += `<line x1="${x - r}" y1="${y - r}" x2="${x + r}" y2="${y + r}" stroke="${C.red}" stroke-width="3"/><line x1="${x + r}" y1="${y - r}" x2="${x - r}" y2="${y + r}" stroke="${C.red}" stroke-width="3"/>`;
  });
  return SVG.svg(16 + Math.min(items.length, per) * gap - 8, 16 + rows * gap - 8, b);
}
const same = (n, k, c) => Array.from({ length: n }, () => ({ k, c }));
const howMany = (S, k) => S.m1.cuantos(S.m1.cosas[k]);

// ═════ Unidad 1 · Los números hasta el 10 ═════
def("m1.contar", (R, S) => {
  const n = R.int(1, 10), k = R.pick(SHAPES), c = R.pick(COLS);
  return { q: `${S.m1.contar_q}<br>${many(same(n, k, c))}`, kind: "int", ans: n, sol: S.m1.contar_s(n) };   // sin nombres de figuras (se enseñan en la U7)
});

function letras(lo, hi) {
  return (R, S, H, L) => {
    const n = R.int(lo, hi);
    if (R.r() < 0.5) return { q: S.m1.letras_q(L.words(n)), kind: "int", ans: n, sol: S.m1.letras_s(L.words(n), n) };
    const set = new Set([n]);
    while (set.size < 4) set.add(Math.max(lo, Math.min(hi, n + R.pick([-10, -2, -1, 1, 2, 10, 3]))) );
    const nums = [...set], opts = R.shuffle(nums.map(x => L.words(x)));
    return { q: S.m1.letras2_q(n), kind: "choice", opts, correct: opts.indexOf(L.words(n)), sol: S.m1.letras2_s(L.words(n), n) };
  };
}
def("m1.letras10", letras(0, 10));
def("m1.letras20", letras(11, 20));
def("m1.letras99", letras(21, 99));

function comp(hi) {
  return (R, S) => {
    const a = R.int(0, hi);
    let b = R.r() < 0.2 ? a : R.int(0, hi);
    if (hi > 20 && b !== a && R.r() < 0.5) b = (a % 10) * 10 + Math.floor(a / 10);   // 47 y 74
    const k = a > b ? 0 : a < b ? 1 : 2;
    return { q: S.m1.comp_q(a, b), kind: "choice", opts: [">", "<", "="], correct: k, shuffle: false, sol: S.m1.comp_s(a, b, k) };
  };
}
def("m1.comp10", comp(10));
def("m1.comp20", comp(20));
def("m1.comp99", comp(99));

function vecinos(lo, hi) {
  return (R, S) => {
    const k = R.int(0, 2);
    let n = R.int(lo, hi);
    if (hi > 20 && R.r() < 0.3) {   // el cambio de decena: después del 39, antes del 60, entre el 49 y el 51
      const d = R.int(2, 9);
      n = k === 0 ? d * 10 - 1 : k === 1 ? d * 10 : R.pick([d * 10, d * 10 - 1]);
    }
    if (k === 0) return { q: S.m1.desp_q(n), kind: "int", ans: n + 1, sol: S.m1.desp_s(n, n + 1) };
    if (k === 1) return { q: S.m1.antes_q(n), kind: "int", ans: n - 1, sol: S.m1.antes_s(n, n - 1) };
    return { q: S.m1.entre_q(n - 1, n + 1), kind: "int", ans: n, sol: S.m1.entre_s(n - 1, n, n + 1) };
  };
}
def("m1.vecinos10", vecinos(1, 9));
def("m1.vecinos99", vecinos(11, 98));

// ═════ Unidad 2 · Sumar y restar hasta 10 ═════
function suma(lo, hi) {
  return (R, S) => {
    let a, b;
    do { a = R.int(1, 9); b = R.int(1, 9); } while (a + b < lo || a + b > hi);
    const k = R.pick(SHAPES), pic = hi <= 10 ? `<br>${many([...same(a, k, C.blue), ...same(b, k, C.amber)], 5)}` : "";
    return { q: S.m1.suma_q(a, b) + pic, kind: "int", ans: a + b, sol: hi <= 10 ? S.m1.suma_s(a, b, a + b) : S.m1.suma20_s(a, b, a + b) };   // hasta 20: se completa el 10 desde el mayor
  };
}
def("m1.suma10", suma(2, 10));
def("m1.suma20", suma(11, 18));

def("m1.resta10", (R, S) => {
  const a = R.int(2, 10), b = R.int(1, a), k = R.pick(SHAPES);
  return { q: `${S.m1.resta_q(a, b)}<br>${many(same(a, k, C.green), 5, b)}`, kind: "int", ans: a - b, sol: S.m1.resta_s(a, b, a - b) };
});
def("m1.hueco10", (R, S) => {
  const c = R.int(3, 10), a = R.int(1, c - 1);
  if (R.r() < 0.5) return { q: S.m1.hueco_q(`${a} + ☐ = ${c}`), kind: "int", ans: c - a, sol: S.m1.hueco_s(a, c, c - a) };
  return { q: S.m1.hueco_q(`${c} − ☐ = ${a}`), kind: "int", ans: c - a, sol: S.m1.hueco2_s(c, a, c - a) };
});

// los nombres de las personas, en S.m1.nombres (i18n/<lang>/mat1.js)
function probs(hi, noCarry) {
  return (R, S) => {
    // solo cosas de las que es creíble tener tantas (nada de «91 globos»)
    const [obj, fem, mx] = R.pick(S.m1.objs.filter(o => !o[2] || o[2] >= Math.min(hi, 40))), N = R.pick(S.m1.nombres);
    const top = Math.min(hi, mx || hi);
    let M; do M = R.pick(S.m1.nombres); while (M === N);
    const k = R.int(0, 5);
    let a, b;
    for (;;) {   // hasta 20, se suma o se resta un número de una cifra (como en la U4)
      a = R.int(top > 20 ? 10 : 2, top); b = R.int(1, top > 20 ? top - 10 : Math.min(top, 9));
      const ok = k < 3 ? a + b <= top && (!noCarry || (a % 10) + (b % 10) < 10) : b < a && (!noCarry || (a % 10) >= (b % 10)) && !(top === 20 && a === 20);   // 20 − 7 no se enseña en 1.º
      if (ok) break;
    }
    const ans = k < 3 ? a + b : a - b;
    return { q: S.m1.prob_q[k](N, M, a, b, obj, fem), kind: "int", ans, sol: S.m1.prob_s[k](a, b, ans, pasos(S, a, b, k < 3, top > 20)) };
  };
}
// Los pasos de la cuenta, con el método de cada unidad: hasta 10, nada; hasta 20, completar o bajar al 10
// (o solo las unidades); hasta 99, unidades con unidades y decenas con decenas (sin llevar)
function pasos(S, a, b, plus, big) {
  const r = plus ? a + b : a - b;
  if (big) return S.m1.cols_s(a, b, plus);
  if (plus && a < 10 && r > 10) { const g = Math.max(a, b), p = Math.min(a, b); return S.m1.diez_s(g, 10 - g, p - (10 - g), r); }
  if (!plus && a > 10 && r < 10) return S.m1.bajar_s(a, a - 10, b - (a - 10), r);
  if (a > 10) return S.m1.uni20_s(a % 10, b, r, plus);
  return "";
}
def("m1.prob10", probs(10));
def("m1.prob20", probs(20));
def("m1.prob99", probs(99, true));

// ═════ Unidad 3 · Los números hasta el 20 ═════
function decUni(lo, hi) {
  return (R, S) => {
    const n = R.int(lo, hi), d = Math.floor(n / 10), u = n % 10;
    if (R.r() < 0.5) return { q: S.m1.bloques_q + "<br>" + SVG.base10(0, d, u), kind: "int", ans: n, sol: S.m1.du_s(n, d, u) };
    return { q: S.m1.du_q(n), kind: "fields", fields: [{ label: S.m1.du_f[0], ans: d }, { label: S.m1.du_f[1], ans: u }], sol: S.m1.du_s(n, d, u) };
  };
}
def("m1.decena", decUni(10, 20));
def("m1.decena14", decUni(10, 14));   // «La decena»: solo hasta el 14, los que se nombran en la lección
def("m1.decunid", decUni(21, 99));

// mult: si es true, en los saltos de 2 y de 5 se empieza en un múltiplo del salto (2, 4, 6…; 5, 10, 15…), como en 1.º;
// top5: hasta dónde llegan esas series (los saltos de 10 pueden empezar en cualquier número)
function falta(hi, steps, q, mult, top5) {
  return (R, S) => {
    const st = R.pick(steps), len = 5, down = R.r() < 0.25;
    const top = mult && st < 10 ? top5 : hi;
    const start = mult && st < 10 ? st * R.int(1, Math.floor((top - st * (len - 1)) / st)) : R.int(0, top - st * (len - 1));
    let seq = Array.from({ length: len }, (_, i) => start + i * st);
    if (down) seq = seq.reverse();
    const hole = R.int(1, len - 1), ans = seq[hole];
    const full = seq.map((x, i) => i === hole ? `<b>${x}</b>` : x).join(", ");
    return { q: (q ? S.m1[q] : S.m1.falta_q)(seq.map((x, i) => i === hole ? "☐" : x).join(", ")), kind: "int", ans, sol: S.m1.falta_s(st, down, ans, full) };
  };
}
def("m1.falta20", falta(20, [1, 1, 2]));
def("m1.falta1", falta(20, [1], "falta1_q"));                      // «Ordenar números»: solo de uno en uno
def("m1.saltos", falta(99, [10, 10, 10, 2, 5]));
def("m1.saltos10", falta(99, [10, 10, 10, 2, 5], null, 1, 50));   // «Contar de 10 en 10»: de 2 en 2 y de 5 en 5, desde un múltiplo y hasta 50

def("m1.mayor", (R, S) => {
  const set = new Set(); while (set.size < 4) set.add(R.int(0, 20));
  const nums = R.shuffle([...set]), big = R.r() < 0.5, ans = big ? Math.max(...nums) : Math.min(...nums);
  return { q: (big ? S.m1.mayor_q : S.m1.menor_q)(nums.join(", ")), kind: "choice", opts: nums.map(String), correct: nums.indexOf(ans), shuffle: false,
    sol: S.m1.orden_s([...nums].sort((x, y) => x - y).join(" &lt; "), ans) };
});

// ═════ Unidad 4 · Sumas y restas hasta 20 ═════
def("m1.resta20", (R, S) => {
  let a, b;
  do { a = R.int(11, 18); b = R.int(2, 9); } while (a - b >= 10);
  return { q: S.m1.resta_q(a, b), kind: "int", ans: a - b, sol: S.m1.resta20_s(a, b, a - 10, b - (a - 10), a - b) };
});
def("m1.dobles", (R, S) => {
  if (R.r() < 0.5) { const n = R.int(1, 10); return { q: S.m1.doble_q(n), kind: "int", ans: 2 * n, sol: S.m1.doble_s(n, 2 * n) }; }
  const n = R.int(1, 10) * 2; return { q: S.m1.mitad_q(n), kind: "int", ans: n / 2, sol: S.m1.mitad_s(n, n / 2) };
});

// ═════ Unidad 5 · Los números hasta el 99 ═════
def("m1.parimpar", (R, S) => {
  const n = R.int(1, R.r() < 0.4 ? 12 : 99), k = n % 2;
  const pic = n <= 12 ? "<br>" + many(same(n, "circle", C.blue), 2).replace("<svg", "<svg").replace(/viewBox/, "viewBox") : "";
  return { q: S.m1.par_q(n) + pic, kind: "choice", opts: S.m1.par_o, correct: k, shuffle: false, sol: S.m1.par_s(n, n % 10, k) };   // con dibujo (n ≤ 12), la solución hace parejas
});

// ═════ Unidad 6 · Sumas y restas sin llevar ═════
// La cuenta en columnas, como en la lección: D y U arriba (S.m1.col_h), el signo a la izquierda y la raya (el resultado, en blanco)
function colPic(a, b, plus, S) {
  const X = [52, 84], big = (x, y, s) => SVG.txt(x, y, s, 28, C.dark, "middle", "bold");
  let s = SVG.txt(X[0], 18, S.m1.col_h[0], 14, C.grey, "middle", "bold") + SVG.txt(X[1], 18, S.m1.col_h[1], 14, C.grey, "middle", "bold");
  s += (a >= 10 ? big(X[0], 54, Math.floor(a / 10)) : "") + big(X[1], 54, a % 10);
  s += big(16, 90, plus ? "+" : "−") + (b >= 10 ? big(X[0], 90, Math.floor(b / 10)) : "") + big(X[1], 90, b % 10);
  s += `<line x1="8" y1="102" x2="104" y2="102" stroke="${C.dark}" stroke-width="2.5"/>`;
  s += X.map(x => `<rect x="${x - 13}" y="110" width="26" height="32" rx="4" fill="#fff" stroke="${C.grey}" stroke-dasharray="4 3" stroke-width="1.5"/>`).join("");
  return SVG.svg(112, 150, s);
}
// La mitad de las veces, en columnas (y entonces, a menudo, con un número de una cifra: 42 + 5, el caso del error frecuente)
def("m1.suma99", (R, S) => {
  const col = R.r() < 0.5, small = col && R.r() < 0.35;
  let a, b;
  do { a = R.int(10, 88); b = small ? R.int(1, 9) : R.int(1, 88); } while (a + b > 99 || (a % 10) + (b % 10) > 9);
  return { q: col ? S.m1.colq_q(a, b, true) + "<br>" + colPic(a, b, true, S) : S.m1.suma_q(a, b), kind: "int", ans: a + b, sol: S.m1.col_s(a, b, Math.floor(a / 10) + Math.floor(b / 10), (a % 10) + (b % 10), a + b, true) };
});
def("m1.resta99", (R, S) => {
  const col = R.r() < 0.5, small = col && R.r() < 0.35;
  let a, b;
  do { a = R.int(20, 99); b = small ? R.int(1, 9) : R.int(1, a - 1); } while ((a % 10) < (b % 10) || b >= a);
  return { q: col ? S.m1.colq_q(a, b, false) + "<br>" + colPic(a, b, false, S) : S.m1.resta_q(a, b), kind: "int", ans: a - b, sol: S.m1.col_s(a, b, Math.floor(a / 10) - Math.floor(b / 10), (a % 10) - (b % 10), a - b, false) };
});

// «Calcular de cabeza»: los tres trucos de la lección (decenas enteras, ±1 y ±10 en la tabla, decenas y unidades)
def("m1.mental", (R, S) => {
  const T = S.m1.MT, k = R.int(0, 3);
  if (k === 0) {   // 30 + 20, 80 − 30
    const plus = R.r() < 0.5; let a, b;
    do { a = R.int(1, 9); b = R.int(1, 8); } while (plus ? a + b > 9 : b >= a);
    const r = plus ? a + b : a - b;
    return { q: S.m1.mental_q(a * 10, b * 10, plus), kind: "int", ans: r * 10, sol: T.dec_s(a, b, r, plus) };
  }
  if (k === 1) {   // 45 + 1, 45 − 1
    const plus = R.r() < 0.5, n = plus ? R.int(11, 98) : R.int(12, 99), r = plus ? n + 1 : n - 1;
    return { q: S.m1.mental_q(n, 1, plus), kind: "int", ans: r, sol: T.uno_s(n, r, plus) };
  }
  if (k === 2) {   // 45 + 10, 45 − 10
    const plus = R.r() < 0.5, n = plus ? R.int(1, 89) : R.int(11, 99), r = plus ? n + 10 : n - 10;
    return { q: S.m1.mental_q(n, 10, plus), kind: "int", ans: r, sol: T.diez_s(n, r, plus) };
  }
  const d = R.int(1, 9) * 10, u = R.int(1, 9), v = R.int(0, 2);   // 40 + 7, 47 − 7, 47 − 40
  if (v === 0) return { q: S.m1.mental_q(d, u, true), kind: "int", ans: d + u, sol: T.du_s(d, u) };
  if (v === 1) return { q: S.m1.mental_q(d + u, u, false), kind: "int", ans: d, sol: T.quitau_s(d + u, u, d) };
  return { q: S.m1.mental_q(d + u, d, false), kind: "int", ans: u, sol: T.quitad_s(d + u, d, u) };
});

// ═════ Unidad 7 · Formas y posiciones ═════
const FIG = ["circle", "square", "triangle", "rect"];
def("m1.figura", (R, S) => {   // no siempre en la posición de siempre: cuadrado y triángulo girados, rectángulo de pie
  const k = R.int(0, 3), c = R.pick(COLS);
  const rot = k === 1 ? R.pick([0, 0, 45, 20]) : k === 2 ? R.pick([0, 0, 180, 90, 20]) : k === 3 ? R.pick([0, 0, 90]) : 0;
  const pic = SVG.svg(90, 90, `<g transform="rotate(${rot} 45 45)">${SVG.shape(FIG[k], 45, 45, 28, c)}</g>`);
  return { q: S.m1.figura_q + "<br>" + pic, kind: "choice", opts: S.m1.figuras, correct: k, shuffle: false, sol: S.m1.figura_s[k] + (rot && k !== 3 ? " " + S.m1.girada_s : "") };
});
def("m1.lados", (R, S) => {
  const k = R.pick(["triangle", "square", "rect", "pentagon", "hexagon"]), n = { triangle: 3, square: 4, rect: 4, pentagon: 5, hexagon: 6 }[k], v = R.r() < 0.5;
  return { q: (v ? S.m1.vertices_q : S.m1.lados_q) + "<br>" + SVG.svg(90, 72, SVG.shape(k, 45, 37, 30, R.pick(COLS))), kind: "int", ans: n, sol: S.m1.lados_s(n, v) };
});
const SOL = ["cube", "sphere", "cylinder", "cone"];
def("m1.cuerpo", (R, S) => {
  const k = R.int(0, 3);
  return { q: S.m1.cuerpo_q + "<br>" + SVG.solid(SOL[k]), kind: "choice", opts: S.m1.cuerpos, correct: k, shuffle: false, sol: S.m1.cuerpo_s[k] };
});
function scene(k, R) {   // 0 encima · 1 debajo · 2 dentro · 3 fuera · 4 izquierda · 5 derecha
  const ball = (x, y) => SVG.shape("circle", x, y, 12, C.red);
  if (k < 2) return SVG.svg(200, 130, `<rect x="40" y="62" width="120" height="10" fill="#b07a4a"/><rect x="48" y="72" width="8" height="50" fill="#b07a4a"/><rect x="144" y="72" width="8" height="50" fill="#b07a4a"/>` + ball(R.int(70, 130), k === 0 ? 49 : 110));
  if (k < 4) return SVG.svg(200, 110, `<rect x="60" y="40" width="80" height="60" fill="#f3e2a0" stroke="${C.dark}" stroke-width="2"/><line x1="60" y1="40" x2="45" y2="20" stroke="${C.dark}" stroke-width="2"/><line x1="140" y1="40" x2="155" y2="20" stroke="${C.dark}" stroke-width="2"/>` + ball(k === 2 ? 100 : R.pick([28, 172]), k === 2 ? 75 : 88));
  const tree = `<rect x="94" y="60" width="12" height="40" fill="#8a5a33"/><circle cx="100" cy="45" r="28" fill="${C.green}"/>`;
  return SVG.svg(200, 110, tree + ball(k === 4 ? 40 : 160, 88));
}
def("m1.posicion", (R, S) => {
  const g = R.int(0, 2), k = g * 2 + R.int(0, 1);
  return { q: S.m1.pos_q[g] + "<br>" + scene(k, R), kind: "choice", opts: S.m1.pos_o[g], correct: k % 2, shuffle: false, sol: S.m1.pos_s[k] };
});
// «Arriba, abajo, dentro, fuera»: las cinco parejas de la lección, sin izquierda ni derecha (llegan en la lección siguiente)
function scene2(g, w, R) {   // g: 2 delante/detrás · 3 cerca/lejos · 4 arriba/abajo; w: 0 la primera palabra, 1 la segunda
  const ball = (x, y) => SVG.shape("circle", x, y, 12, C.red);
  if (g === 2) return SVG.svg(210, 74, `<g transform="translate(62 10) scale(1.6)">${car(0, 0, C.blue)}</g>` + ball(w === 0 ? 30 + R.int(-4, 4) : 178 + R.int(-4, 4), 50));   // el coche mira a la izquierda (faro y morro)
  if (g === 3) {
    const house = `<rect x="150" y="50" width="40" height="40" fill="#f3e2a0" stroke="${C.dark}" stroke-width="1.5"/><path d="M144,52 L170,28 L196,52 Z" fill="${C.red}" stroke="${C.dark}" stroke-width="1.5"/><rect x="164" y="66" width="12" height="24" fill="#b07a4a"/>`;
    return SVG.svg(210, 100, `<line x1="4" y1="90" x2="206" y2="90" stroke="${C.grey}" stroke-width="2"/>` + house + ball(w === 0 ? 128 + R.int(-4, 4) : 22 + R.int(-4, 6), 78));
  }
  const shelf = `<rect x="50" y="10" width="8" height="110" fill="#b07a4a"/><rect x="142" y="10" width="8" height="110" fill="#b07a4a"/><rect x="50" y="44" width="100" height="7" fill="#b07a4a"/><rect x="50" y="108" width="100" height="7" fill="#b07a4a"/>`;
  return SVG.svg(200, 125, shelf + ball(R.int(80, 120), w === 0 ? 32 : 96));
}
def("m1.posicion1", (R, S) => {
  const T = S.m1.P1, g = R.int(0, 4), w = R.int(0, 1);
  const pic = g < 2 ? scene(g * 2 + w, R) : scene2(g, w, R);
  return { q: T.q[g] + "<br>" + pic, kind: "choice", opts: T.o[g], correct: w, shuffle: false, sol: T.s[g][w] };
});
// «Derecha e izquierda» y «Giros»: la pelota y el árbol, una fila de frutas y alguien que te mira de frente
const FRK = ["apple", "pear", "banana", "orange"];
def("m1.lado", (R, S) => {
  const T = S.m1.LD, t = R.int(0, 2);
  if (t === 0) { const k = 4 + R.int(0, 1); return { q: S.m1.pos_q[2] + "<br>" + scene(k, R), kind: "choice", opts: S.m1.pos_o[2], correct: k - 4, shuffle: false, sol: S.m1.pos_s[k] }; }
  if (t === 1) {
    const fr = R.shuffle([0, 1, 2, 3]).slice(0, 3), right = R.r() < 0.5, ans = fr[right ? 2 : 0];
    const pic = SVG.svg(200, 66, fr.map((f, i) => SVG.shape(FRK[f], 40 + i * 60, 34, 22)).join(""));
    const opts = R.shuffle([fr[0], fr[2], R.pick([0, 1, 2, 3].filter(f => !fr.includes(f)))]);
    return { q: T.fila_q(T.fr[fr[1]], right) + "<br>" + pic, kind: "choice", opts: opts.map(f => cap1(T.fr[f])), correct: opts.indexOf(ans), shuffle: false, sol: T.fila_s(T.fr[fr[1]], T.fr[ans], right) };
  }
  const N = R.pick(T.nombres), right = R.r() < 0.5;
  return { q: T.frente_q(N, right), kind: "choice", opts: T.frente_o, correct: right ? 0 : 1, shuffle: false, sol: T.frente_s(N, right) };
});
const PATS = [[0, 1], [0, 1, 2], [0, 0, 1], [0, 1, 1], [0, 1, 2, 2]];
def("m1.serie", (R, S) => {
  const pat = R.pick(PATS), byColor = R.r() < 0.4;
  const ks = R.shuffle(SHAPES).slice(0, 3), cs = R.shuffle(COLS).slice(0, 3), base = R.pick(SHAPES), baseC = R.pick(COLS);
  const item = i => byColor ? { k: base, c: cs[i] } : { k: ks[i], c: baseC };
  const len = pat.length * 2 + R.int(1, pat.length - 1 || 1);
  const seq = Array.from({ length: len + 1 }, (_, i) => item(pat[i % pat.length]));
  const ans = seq[len], used = [...new Set(pat)].map(item);
  const others = byColor ? COLS.filter(c => !cs.slice(0, used.length).includes(c)).slice(0, 1).map(c => ({ k: base, c })) : SHAPES.filter(s => !ks.slice(0, used.length).includes(s)).slice(0, 1).map(k => ({ k, c: baseC }));
  const optsI = R.shuffle([...used, ...others]).slice(0, 4);
  if (!optsI.some(o => o.k === ans.k && o.c === ans.c)) optsI[0] = ans;
  const opts = optsI.map(o => SVG.icon(o.k, o.c));
  return { q: S.m1.serie_q + "<br>" + SVG.row([...seq.slice(0, len), null]), kind: "choice", opts, correct: optsI.findIndex(o => o.k === ans.k && o.c === ans.c), shuffle: false,
    sol: S.m1.serie_s(pat.length) + " " + SVG.icon(ans.k, ans.c) };
});

// ═════ Unidad 8 · Medir ═════
function strip(n, color, u = 22) {   // tira de n cuadraditos
  let b = "";
  for (let i = 0; i < n; i++) b += `<rect x="${6 + i * u}" y="6" width="${u}" height="${u}" fill="${color}" stroke="${C.dark}" stroke-width="1.2"/>`;
  return b;
}
def("m1.largo", (R, S) => {
  const t = R.int(0, 3);
  if (t === 0) {
    const n = R.int(2, 12);
    return { q: S.m1.medir_q + "<br>" + SVG.svg(n * 22 + 12, 34, strip(n, "#f3e2a0")), kind: "int", ans: n, sol: S.m1.medir_s(n) };
  }
  if (t === 2) {   // dos cintas que NO empiezan en el mismo sitio, sobre una cuadrícula: hay que contar
    const trap = R.r() < 0.6, u = 22;
    let a, b, oa, ob;
    do { a = R.int(3, 9); b = R.int(3, 9); oa = R.int(0, 4); ob = R.int(0, 4); } while (a === b || oa === ob || (trap && (oa + a > ob + b) === (a > b)));
    const W = Math.max(oa + a, ob + b);
    let g = "";   // dos filas de cuadros; cada cinta pinta los suyos
    [[oa, a, C.blue], [ob, b, C.red]].forEach(([o, l, col], r) => {
      for (let i = 0; i < W; i++) g += `<rect x="${6 + i * u}" y="${6 + r * (u + 8)}" width="${u}" height="${u}" fill="${i >= o && i < o + l ? col : "#fff"}" stroke="${C.grey}" stroke-width="1"/>`;
    });
    const long = R.r() < 0.5, ans = long ? (a > b ? 0 : 1) : (a < b ? 0 : 1);
    return { q: (long ? S.m1.largo_q : S.m1.corto_q) + " " + S.m1.cuadros_q + "<br>" + SVG.svg(W * u + 12, 2 * u + 20, g), kind: "choice", opts: S.m1.cintas, correct: ans, shuffle: false,
      sol: S.m1.largo2_s(a, b, S.m1.cintas[ans], long) };
  }
  if (t === 3) {   // tres cintas: la más larga o la más corta
    const ls = R.shuffle([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 3), CC = [C.blue, C.red, C.green], long = R.r() < 0.5;
    const ans = ls.indexOf(long ? Math.max(...ls) : Math.min(...ls));
    const pic = SVG.svg(Math.max(...ls) * 22 + 20, 104, ls.map((l, i) => `<rect x="6" y="${8 + i * 32}" width="${l * 22}" height="18" rx="9" fill="${CC[i]}"/>`).join(""));
    return { q: (long ? S.m1.larga3_q : S.m1.corta3_q) + "<br>" + pic, kind: "choice", opts: S.m1.cintas3, correct: ans, shuffle: false, sol: S.m1.largo3_s(S.m1.cintas3[ans], long) };
  }
  let a, b; do { a = R.int(3, 12); b = R.int(3, 12); } while (a === b);
  const long = R.r() < 0.5, ans = long ? (a > b ? 0 : 1) : (a < b ? 0 : 1);
  const pic = SVG.svg(Math.max(a, b) * 22 + 20, 70, `<rect x="6" y="8" width="${a * 22}" height="18" rx="9" fill="${C.blue}"/><rect x="6" y="42" width="${b * 22}" height="18" rx="9" fill="${C.red}"/>`);
  return { q: (long ? S.m1.largo_q : S.m1.corto_q) + "<br>" + pic, kind: "choice", opts: S.m1.cintas, correct: ans, shuffle: false, sol: S.m1.largo_s(S.m1.cintas[ans], long) };
});
def("m1.reloj", (R, S) => {
  const h = R.int(1, 12);
  if (R.r() < 0.5) return { q: S.m1.reloj_q + "<br>" + SVG.clock(h, 0), kind: "int", ans: h, sol: S.m1.reloj_s(h) };
  // y media: la buena, la del número que viene (el error típico), en punto y «las 6 y media» (quien lee la larga)
  const n = h % 12 + 1, p = (h + 10) % 12 + 1, M = S.m1.ymedia;
  const { opts, correct } = choose(R, M(h), [M(n), S.m1.enpunto(h), M(6), M(p)]);
  return { q: S.m1.reloj2_q + "<br>" + SVG.clock(h, 30), kind: "choice", opts, correct, sol: S.m1.reloj2_s(h, n) };
});
def("m1.dias", (R, S) => {
  const months = R.r() < 0.4, L = months ? S.m1.meses : S.m1.dias, n = L.length, i = R.int(0, n - 1), after = R.r() < 0.6;
  const ans = L[(i + (after ? 1 : n - 1)) % n];
  const set = new Set([ans]); while (set.size < 4) set.add(R.pick(L.filter(x => x !== L[i])));
  const opts = R.shuffle([...set]);
  return { q: (after ? S.m1.despues_q : S.m1.antesde_q)(L[i], months), kind: "choice", opts, correct: opts.indexOf(ans), shuffle: false, sol: S.m1.dias_s(L[i], ans, after, months) };
});
// Monedero hecho a mano (no siempre con las menos piezas: a veces varias monedas de 1 € o de 2 €, el caso del error
// frecuente de contar monedas en vez de sumar lo que valen), de mayor a menor; cada pieza es un SVG.money suelto
def("m1.dinero", (R, S) => {
  let parts, e;
  // en dólares no hay piezas de 2: billetes de $1 en su lugar (L.money). Y como en dólares las monedas son de
  // céntimos, la mitad de las veces el monedero lleva monedas de EE. UU. (25¢, 10¢, 5¢ y 1¢, hasta 30¢), con el
  // mismo error frecuente: tres monedas de 10¢ no son 3¢, sino 30¢ (textos S.m1.dineroc_q, dineroc_s, llegac_*)
  const usd = WA.H.moneyCfg.code === "USD", c = usd && R.r() < 0.5;
  const P = c ? [25, 10, 10, 5, 5, 1, 1, 1, 1] : usd ? [20, 10, 10, 5, 5, 1, 1, 1, 1, 1, 1] : [20, 10, 10, 5, 5, 2, 2, 2, 1, 1, 1], top = c ? 30 : 20;
  do { parts = Array.from({ length: R.int(2, 5) }, () => R.pick(P)); e = parts.reduce((s, v) => s + v, 0); } while (e > top || e < 3);
  parts.sort((x, y) => y - x);
  const pic = "<br>" + parts.map(v => SVG.money(c ? v : v * 100)).join(" ");
  const sum = c ? S.m1.dineroc_s : S.m1.dinero_s;
  if (R.r() < 0.7) return { q: (c ? S.m1.dineroc_q : S.m1.dinero_q) + pic, kind: "int", ans: e, sol: sum(e, parts) };
  const ok = R.r() < 0.5, p = ok ? R.pick([e, e - R.int(1, Math.min(3, e - 1))]) : e + R.int(1, 4);   // ¿te llega para pagar? (la mitad, sí)
  return { q: (c ? S.m1.llegac_q : S.m1.llega_q)(p) + pic, kind: "choice", opts: S.m1.llega_o, correct: ok ? 0 : 1, shuffle: false, sol: (c ? S.m1.llegac_s : S.m1.llega_s)(sum(e, parts), e, p) };
});

// ═════ Unidad 9 · Datos ═════
function tally(n) {   // palotes en grupos de 5: cuatro de pie y el quinto los cruza
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.dark}" stroke-width="3.5" stroke-linecap="round"/>`;
  let b = "", x = 14;
  for (let i = 0; i < Math.floor(n / 5); i++) { for (let j = 0; j < 4; j++) b += ln(x + j * 11, 10, x + j * 11, 52); b += ln(x - 6, 46, x + 39, 16); x += 62; }
  for (let j = 0; j < n % 5; j++) b += ln(x + j * 11, 10, x + j * 11, 52);
  return SVG.svg(x + (n % 5) * 11 + 10, 62, b);
}
def("m1.clasificar", (R, S) => {
  const n = R.int(8, 14), ks = R.shuffle(["circle", "square", "triangle"]), cs = R.shuffle([C.blue, C.red, C.amber]);
  const items = Array.from({ length: n }, () => ({ k: R.pick(ks), c: R.pick(cs) }));
  const v = R.int(0, 3);
  if (v === 2) {   // dos cosas a la vez: ¿cuántos triángulos rojos?
    const k = R.pick(ks), c = R.pick(cs), ans = items.filter(x => x.k === k && x.c === c).length, w = S.m1.dos_w(S.m1.cosas[k][0], S.m1.coloresM[[C.blue, C.red, C.amber].indexOf(c)]);
    return { q: S.m1.dos_q(w) + "<br>" + many(items, 7), kind: "int", ans, sol: S.m1.clas_s(ans, [w, 0]) };
  }
  if (v === 3) {   // leer palotes
    const m = R.int(3, 14);
    return { q: S.m1.palotes_q + "<br>" + tally(m), kind: "int", ans: m, sol: S.m1.palotes_s(m) };
  }
  if (v === 0) {
    const k = R.pick(ks), ans = items.filter(x => x.k === k).length;
    return { q: howMany(S, k) + "<br>" + many(items, 7), kind: "int", ans, sol: S.m1.clas_s(ans, S.m1.cosas[k]) };
  }
  const ci = R.int(0, 2), c = cs[ci], ans = items.filter(x => x.c === c).length, col = S.m1.colores[[C.blue, C.red, C.amber].indexOf(c)];
  return { q: S.m1.color_q(col) + "<br>" + many(items, 7), kind: "int", ans, sol: S.m1.clas_s(ans, [S.m1.figuras_de(col), 1]) };
});
def("m1.picto", (R, S) => {
  const fr = R.shuffle(S.m1.frutas.map((f, i) => [f, i])).slice(0, R.int(3, 4));
  let ns; do ns = fr.map(() => R.int(1, 8)); while (new Set(ns).size < ns.length);
  const KS = ["apple", "pear", "banana", "orange"], CS = [C.red, C.green, C.amber, C.purple];   // en el orden de S.m1.frutas
  const rows = fr.map(([f, i], j) => ({ label: f, n: ns[j], k: KS[i], c: CS[i] }));
  const pic = "<br>" + SVG.picto(rows), v = R.int(0, rows.length === 3 ? 3 : 2);
  if (v === 3) { const tot = ns.reduce((s, x) => s + x, 0); return { q: S.m1.ptot_q + pic, kind: "int", ans: tot, sol: S.m1.ptot_s(rows.map(r => [r.label, r.n]), tot) }; }   // ¿cuántos en total? (solo con 3 filas)
  if (v === 0) { const j = R.int(0, rows.length - 1); return { q: S.m1.picto_q(rows[j].label) + pic, kind: "int", ans: ns[j], sol: S.m1.picto_s(rows[j].label, ns[j]) }; }
  if (v === 1) { const big = R.r() < 0.6, j = ns.indexOf(big ? Math.max(...ns) : Math.min(...ns)); return { q: (big ? S.m1.pmas_q : S.m1.pmenos_q) + pic, kind: "choice", opts: rows.map(r => r.label), correct: j, shuffle: false, sol: S.m1.pmas_s(rows[j].label, ns[j], big) }; }
  let a, b; do { a = R.int(0, rows.length - 1); b = R.int(0, rows.length - 1); } while (ns[a] <= ns[b]);
  return { q: S.m1.pdif_q(rows[a].label, rows[b].label) + pic, kind: "int", ans: ns[a] - ns[b], sol: S.m1.pdif_s(ns[a], ns[b], ns[a] - ns[b], rows[a].label, rows[b].label) };
});

// ═════ Ordinales, líneas, el tiempo, capacidad, peso, giros y estimación ═════
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
// Opciones sin repetir: la buena y las de "cands" (hasta n), barajadas
function choose(R, good, cands, n = 4) {
  const opts = R.shuffle([...new Set([good, ...cands])].slice(0, n));
  return { opts, correct: opts.indexOf(good) };
}

// ── Primero, segundo, tercero ──
const CARC = [C.red, C.blue, C.green, C.amber, C.purple, "#f08a24"];   // en el orden de S.m1.OC.col
function car(x, y, c) {   // coche de juguete mirando a la izquierda (en la carrera se dibuja dado la vuelta)
  return `<rect x="${x}" y="${y + 10}" width="54" height="14" rx="5" fill="${c}" stroke="${C.dark}" stroke-width="1.3"/>`
    + `<path d="M${x + 18},${y + 10} L${x + 25},${y} L${x + 46},${y} L${x + 51},${y + 10} Z" fill="${c}" stroke="${C.dark}" stroke-width="1.3"/>`
    + `<path d="M${x + 25},${y + 9} L${x + 28},${y + 3} L${x + 35},${y + 3} L${x + 35},${y + 9} Z M${x + 38},${y + 9} L${x + 38},${y + 3} L${x + 45},${y + 3} L${x + 48},${y + 9} Z" fill="#dff0ff"/>`
    + `<circle cx="${x + 4}" cy="${y + 15}" r="2.5" fill="#fff6a8" stroke="${C.dark}" stroke-width=".6"/>`
    + `<circle cx="${x + 13}" cy="${y + 25}" r="6" fill="${C.dark}"/><circle cx="${x + 41}" cy="${y + 25}" r="6" fill="${C.dark}"/>`
    + `<circle cx="${x + 13}" cy="${y + 25}" r="2.2" fill="${C.grey}"/><circle cx="${x + 41}" cy="${y + 25}" r="2.2" fill="${C.grey}"/>`;
}
function race(cols, meta) {   // la meta a la derecha, como en la lección; el primer coche es el que está más cerca
  const W = 36 + cols.length * 64 + 4, mx = W - 26;
  let b = SVG.txt(mx + 6, 14, meta, 11, C.dark, "middle", "bold");
  for (let r = 0; r < 7; r++) for (let c = 0; c < 2; c++) b += `<rect x="${mx + c * 6}" y="${20 + r * 6}" width="6" height="6" fill="${(r + c) % 2 ? "#fff" : C.dark}"/>`;
  b += `<rect x="${mx}" y="20" width="12" height="42" fill="none" stroke="${C.dark}"/>`;
  cols.forEach((c, i) => { const x = mx - 64 - i * 64; b += `<g transform="translate(${2 * x + 54} 0) scale(-1 1)">${car(x, 28, c)}</g>`; });   // espejo: mira a la derecha
  return SVG.svg(W, 66, b);
}
def("m1.ordinal", (R, S, H, L) => {
  const T = S.m1.OC, O = T.ord, k = R.int(0, 5);
  if (k === 0) {   // la carrera
    const n = R.int(4, 6), idx = R.shuffle([0, 1, 2, 3, 4, 5]).slice(0, n), names = idx.map(i => T.col[i]);
    const p = R.int(0, n - 1), pic = "<br>" + race(idx.map(i => CARC[i]), T.meta);
    const sol = T.carrera_s(names.slice(0, p + 1).map((c, i) => T.paso(c, O[i])).join("; "), names[p], O[p]);
    if (R.r() < 0.6) {
      const { opts, correct } = choose(R, cap1(O[p]), [cap1(O[p > 0 ? p - 1 : p + 2]), cap1(O[p + 1]), cap1(L.words(p + 1))]);
      return { q: T.lugar_q(names[p]) + pic, kind: "choice", opts, correct, sol };
    }
    const { opts, correct } = choose(R, cap1(names[p]), R.shuffle(names.filter((_, i) => i !== p)).map(cap1));
    return { q: T.color_q(O[p]) + pic, kind: "choice", opts, correct, sol };
  }
  if (k === 1) {   // leer 4.º
    const n = R.int(1, 10);
    const { opts, correct } = choose(R, cap1(O[n - 1]), [cap1(L.words(n)), cap1(O[n % 10]), cap1(O[n >= 2 ? n - 2 : 2])]);
    return { q: T.lee_q(n), kind: "choice", opts, correct, sol: T.lee_s(n, O[n - 1], L.words(n)) };
  }
  if (k === 2) {   // escribir «octavo»
    const n = R.int(1, 10), c1 = n < 10 ? n + 1 : 9, c2 = n < 10 ? n * 10 : 100, c3 = n === 1 ? 3 : n === 10 ? 1 : n - 1;
    const { opts, correct } = choose(R, WA.H.ord(n), [WA.H.ord(c1), WA.H.ord(c2), WA.H.ord(c3)]);
    return { q: T.esc_q(O[n - 1]), kind: "choice", opts, correct, sol: T.esc_s(O[n - 1], n) };
  }
  if (k === 3) {   // el que va antes o después
    const after = R.r() < 0.6, n = after ? R.int(1, 9) : R.int(2, 10), a = after ? n + 1 : n - 1, ai = a - 1, gi = n - 1;
    const near = [ai - 1, ai + 1, ai - 2, ai + 2].filter(j => j >= 0 && j < 10 && j !== gi).map(j => cap1(O[j]));
    const { opts, correct } = choose(R, cap1(O[ai]), [cap1(O[gi]), ...near]);
    const seq = O.slice(0, Math.max(a, n)).map((w, i) => i === a - 1 ? `<b>${w}</b>` : w).join(", ");
    return { q: (after ? T.desp_q : T.ant_q)(O[n - 1]), kind: "choice", opts, correct, sol: T.sig_s(seq, O[n - 1], O[a - 1], after) };
  }
  if (k === 4) {   // el último de la fila
    const N = R.int(3, 10);
    const { opts, correct } = choose(R, cap1(O[N - 1]), [cap1(O[N - 2]), N < 10 ? cap1(O[N]) : cap1(L.words(N)), cap1(O[0])]);
    return { q: T.ult_q(N), kind: "choice", opts, correct, sol: T.ult_s(N, O[N - 1]) };
  }
  const D = T.dias, i = R.int(1, 6), list = D.slice(0, i + 1).map((d, j) => `${d}, ${WA.H.ord(j + 1)}`).join("; ");   // los días de la semana
  if (R.r() < 0.5) {
    const { opts, correct } = choose(R, cap1(D[i]), [D[i - 1], D[(i + 1) % 7], D[(i + 2) % 7]].map(cap1));
    return { q: T.dia_q(O[i]), kind: "choice", opts, correct, sol: T.dia_s(list, D[i], O[i]) };
  }
  const { opts, correct } = choose(R, cap1(O[i]), [cap1(O[i - 1]), cap1(O[i + 1]), cap1(L.words(i + 1))]);
  return { q: T.dial_q(D[i]), kind: "choice", opts, correct, sol: T.dia_s(list, D[i], O[i]) };
});

// ── Líneas abiertas y cerradas ──
const LST = `fill="none" stroke="${C.blue}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
const f1 = v => v.toFixed(1);
// t: 0 recta · 1 curva · 2 quebrada · 3 casi cerrada (con un hueco) · 4 círculo · 5 óvalo · 6 mancha · 7 triángulo · 8 cuadrado
function lineSvg(t, R) {
  const cx = 100, cy = 60;
  let b;
  if (t === 0) { const a = R.int(-35, 35) * Math.PI / 180, l = 72; b = `<line x1="${f1(cx - l * Math.cos(a))}" y1="${f1(cy - l * Math.sin(a))}" x2="${f1(cx + l * Math.cos(a))}" y2="${f1(cy + l * Math.sin(a))}" ${LST}/>`; }
  else if (t === 1) b = `<path d="${R.pick(["M25,90 C60,0 140,120 175,30", "M30,95 Q100,-15 170,95", "M20,60 C45,15 70,15 95,60 S145,105 180,60", "M40,30 C120,10 170,60 120,90 C90,110 60,100 50,80"])}" ${LST}/>`;
  else if (t === 2) b = `<polyline points="20,90 55,30 90,90 125,30 160,90" ${LST}/>`;
  else if (t === 3) { const a0 = R.int(0, 359) * Math.PI / 180, g = 0.4, r = 45, p = a => `${f1(cx + r * Math.cos(a))},${f1(cy + r * Math.sin(a))}`; b = `<path d="M${p(a0 + g)} A${r},${r} 0 1,1 ${p(a0 - g)}" ${LST}/>`; }
  else if (t === 4) b = `<circle cx="${cx}" cy="${cy}" r="45" ${LST}/>`;
  else if (t === 5) b = `<ellipse cx="${cx}" cy="${cy}" rx="75" ry="40" ${LST}/>`;
  else if (t === 6) b = `<path d="M60,30 C100,0 170,20 160,60 C150,100 110,110 80,95 C40,80 20,50 60,30 Z" ${LST}/>`;
  else if (t === 7) b = `<polygon points="100,15 170,102 30,102" ${LST}/>`;
  else b = `<rect x="58" y="18" width="84" height="84" transform="rotate(${R.int(-20, 20)} 100 60)" ${LST}/>`;
  return SVG.svg(200, 120, b);
}
function sheep(x, y) {
  return `<ellipse cx="${x + 2}" cy="${y}" rx="10" ry="7" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/><circle cx="${x - 9}" cy="${y - 2}" r="4.2" fill="${C.dark}"/>`
    + `<line x1="${x - 3}" y1="${y + 6}" x2="${x - 3}" y2="${y + 10}" stroke="${C.dark}" stroke-width="1.5"/><line x1="${x + 7}" y1="${y + 6}" x2="${x + 7}" y2="${y + 10}" stroke="${C.dark}" stroke-width="1.5"/>`;
}
def("m1.lineas", (R, S) => {
  const T = S.m1.LN, k = R.int(0, 4);
  if (k === 0) {   // abierta o cerrada, con dibujo
    const t = R.pick([0, 1, 2, 3, 3, 4, 5, 6, 7, 8]), closed = t >= 4;
    return { q: T.ac_q + "<br>" + lineSvg(t, R), kind: "choice", opts: T.ac_o, correct: closed ? 1 : 0, shuffle: false, sol: closed ? T.cerr_s : t === 3 ? T.hueco_s : T.abie_s };
  }
  if (k === 1) {   // recta o curva
    const t = R.int(0, 1);
    return { q: T.rc_q + "<br>" + lineSvg(t, R), kind: "choice", opts: T.rc_o, correct: t, shuffle: false, sol: T.rc_s[t] };
  }
  if (k === 2) {   // dentro y fuera del corral
    const a = R.int(1, 6), o = R.int(1, 6), cx = 130, cy = 80, rx = 84, ry = 52, pts = [];
    for (let x = 20; x <= 240; x += 34) for (let y = 16; y <= 146; y += 24) pts.push({ x, y, d: ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 });
    const ins = R.shuffle(pts.filter(p => p.d < 0.55)).slice(0, a), outs = R.shuffle(pts.filter(p => p.d > 1.6 && p.x > 12 && p.x < 248)).slice(0, o);
    const pic = SVG.svg(260, 160, `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#eef7e4" stroke="#8a5a33" stroke-width="4"/>` + [...ins, ...outs].map(p => sheep(p.x, p.y)).join(""));
    const v = R.int(0, 2), ans = [a, o, a + o][v];
    return { q: T.corral_q[v] + "<br>" + pic, kind: "int", ans, sol: T.corral_s[v](a, o, ans) };
  }
  if (k === 3) {   // ¿qué letra o número es una línea cerrada?
    const good = R.pick(["O", "0"]), opts = R.shuffle([good, ...R.shuffle(["C", "U", "L", "S", "J", "V", "Z", "M", "1", "2", "3", "7", "5"]).slice(0, 3)]);
    return { q: T.let_q, kind: "choice", opts: opts.map(s => `<span style="font:bold 1.6em sans-serif">${s}</span>`), correct: opts.indexOf(good), sol: T.let_s(good) };
  }
  const [what, g, ans, own] = R.pick(T.bank);   // cosas de la vida diaria
  return { q: T.bank_q(what), kind: "choice", opts: T.bank_o[g], correct: ans, shuffle: false, sol: own || T.bank_s[g][ans](what) };
});

// ── Ayer, hoy y mañana ──
def("m1.ayerhoy", (R, S) => {
  const T = S.m1.AH, D = T.dias, k = R.int(0, 5);
  if (k <= 3) {   // 0 hoy → mañana · 1 hoy → ayer · 2 ayer fue → hoy · 3 mañana será → hoy
    const i = R.int(0, 6), d = k === 0 || k === 2 ? 1 : -1, ans = D[(i + d + 7) % 7];
    const { opts, correct } = choose(R, cap1(ans), [cap1(D[(i - d + 7) % 7]), cap1(D[(i + 2 * d + 7) % 7])]);
    return { q: T.q[k](D[i]), kind: "choice", opts, correct, sol: T.s[k](D[i], ans) };
  }
  if (k === 4) {
    if (R.r() < 0.5) {   // partes del día
      const [p, after, r] = R.pick([[0, true, 1], [1, true, 2], [1, false, 0], [2, false, 1]]);
      return { q: T.parte_q(T.partes[p], after), kind: "choice", opts: T.partes_o, correct: r, shuffle: false, sol: T.parte_s(T.partes[p], T.partes[r], after) };
    }
    const [what, r] = R.pick(T.act);
    return { q: T.act_q(what), kind: "choice", opts: T.act_o, correct: r, shuffle: false, sol: T.act_s(what, T.act_o[r].toLowerCase()) };
  }
  const [a, b] = R.pick(T.orden), first = R.r() < 0.5, ab = R.r() < 0.5 ? [a, b] : [b, a];   // ¿qué va antes?
  const opts = ab.map(cap1);
  return { q: T.orden_q(first, ab[0], ab[1]), kind: "choice", opts, correct: opts.indexOf(cap1(first ? a : b)), shuffle: false, sol: T.orden_s(a, b) };
});

// ── Cabe más, cabe menos ──
function glass(x, y, lv, w = 50, h = 64) {   // vaso con agua hasta lv (0 vacío · 0,5 por la mitad · 1 lleno)
  const s = 0.12 * w, xl = yy => x + s * (yy - y) / h, xr = yy => x + w - s * (yy - y) / h, yw = y + 5 + (h - 5) * (1 - lv);
  const water = lv > 0 ? `<polygon points="${f1(xl(yw))},${f1(yw)} ${f1(xr(yw))},${f1(yw)} ${f1(x + w - s)},${y + h} ${f1(x + s)},${y + h}" fill="#7fb8ef"/>` : "";
  return `<polygon points="${x},${y} ${x + w},${y} ${f1(x + w - s)},${y + h} ${f1(x + s)},${y + h}" fill="#f4fbff"/>` + water
    + `<polygon points="${x},${y} ${x + w},${y} ${f1(x + w - s)},${y + h} ${f1(x + s)},${y + h}" fill="none" stroke="${C.dark}" stroke-width="2"/>`;
}
def("m1.capacidad", (R, S) => {
  const T = S.m1.CP, k = R.int(0, 5);
  if (k === 0) {   // lleno, por la mitad o vacío
    const v = R.int(0, 2);
    return { q: T.vaso_q + "<br>" + SVG.svg(70, 80, glass(10, 8, [1, 0.5, 0][v])), kind: "choice", opts: T.vaso_o, correct: v, shuffle: false, sol: T.vaso_s[v] };
  }
  if (k === 1) {   // medir con vasos
    const n = R.int(2, 8);
    let b = ""; for (let i = 0; i < n; i++) b += glass(8 + i * 40, 8, 0.85, 30, 40);
    return { q: T.medir_q(T.recs[R.int(0, 1)]) + "<br>" + SVG.svg(8 + n * 40, 56, b), kind: "int", ans: n, sol: T.medir_s(n) };
  }
  if (k === 2) {   // ¿dónde cabe más / menos? (en vasos)
    const m = R.int(2, 3), rs = R.shuffle(T.jarras).slice(0, m);   // jarras de colores: los números no chocan con el tamaño real
    let ns; do ns = rs.map(() => R.int(2, 12)); while (new Set(ns).size < m);
    const more = R.r() < 0.5, j = ns.indexOf(more ? Math.max(...ns) : Math.min(...ns));
    return { q: T.comp_q(rs, ns, more), kind: "choice", opts: rs.map(r => T.en(r)), correct: j, shuffle: false, sol: T.comp_s(rs, ns, j, more) };
  }
  if (k === 3) {   // ¿cuántos vasos más?
    const [r1, r2] = R.shuffle(T.jarras).slice(0, 2); let a, b; do { a = R.int(3, 12); b = R.int(2, 11); } while (a <= b);
    return { q: T.dif_q(r1, a, r2, b), kind: "int", ans: a - b, sol: T.dif_s(r1, a, r2, b) };
  }
  if (k === 4) {   // ¿cuántos vasos más puedes llenar?
    const [r, lo, hi] = R.pick(T.quedan_r), n = R.int(lo, hi), u = R.int(1, n - 1);   // cantidades creíbles para cada recipiente
    return { q: T.quedan_q(r, n, u), kind: "int", ans: n - u, sol: T.quedan_s(n, u) };
  }
  const [big, small] = R.pick(T.pares), more = R.r() < 0.6, ab = R.r() < 0.5 ? [big, small] : [small, big];   // sentido común
  const opts = ab.map(x => T.en(x));
  return { q: T.pares_q(ab[0], ab[1], more), kind: "choice", opts, correct: opts.indexOf(T.en(more ? big : small)), shuffle: false, sol: T.pares_s(big, small) };
});

// ── Pesa más, pesa menos ──
// [clave, peso aproximado en gramos, tamaño en el dibujo]
const OBJ = [["sandia", 4000, 20], ["melon", 1500, 17], ["botella", 1000, 18], ["piedra", 800, 12], ["libro", 500, 14], ["manzana", 200, 10], ["naranja", 200, 10],
  ["fresa", 20, 7], ["lapiz", 10, 6], ["pluma", 1, 8], ["hoja", 2, 9], ["globo", 5, 22], ["pelota", 100, 21]];
function thing(k, x, yb) {   // el objeto apoyado en el platillo (yb = borde del platillo)
  const st = `stroke="${C.dark}" stroke-width="1.2"`;
  switch (k) {
    case "sandia": return `<circle cx="${x}" cy="${yb - 20}" r="20" fill="#2e9e4f" ${st}/><path d="M${x - 10},${yb - 37} Q${x - 4},${yb - 20} ${x - 10},${yb - 3} M${x + 10},${yb - 37} Q${x + 4},${yb - 20} ${x + 10},${yb - 3}" fill="none" stroke="#1d6b34" stroke-width="3"/>`;
    case "melon": return `<ellipse cx="${x}" cy="${yb - 14}" rx="18" ry="14" fill="#d8e27a" ${st}/>`;
    case "botella": return `<rect x="${x - 8}" y="${yb - 30}" width="16" height="30" rx="4" fill="#bfe0fb" ${st}/><rect x="${x - 4}" y="${yb - 38}" width="8" height="9" fill="#bfe0fb" ${st}/><rect x="${x - 5}" y="${yb - 42}" width="10" height="4" fill="${C.blue}"/>`;
    case "piedra": return `<path d="M${x - 15},${yb} Q${x - 17},${yb - 12} ${x - 6},${yb - 17} Q${x + 6},${yb - 22} ${x + 14},${yb - 12} Q${x + 18},${yb - 4} ${x + 12},${yb} Z" fill="#9aa1a8" ${st}/>`;
    case "libro": return `<rect x="${x - 18}" y="${yb - 12}" width="36" height="12" fill="${C.blue}" ${st}/><line x1="${x - 15}" y1="${yb - 4}" x2="${x + 15}" y2="${yb - 4}" stroke="#fff" stroke-width="2"/>`;
    case "manzana": return SVG.shape("apple", x, yb - 10, 10);
    case "naranja": return SVG.shape("orange", x, yb - 10, 10);
    case "fresa": return `<path d="M${x - 6},${yb - 11} Q${x},${yb - 14} ${x + 6},${yb - 11} Q${x + 5},${yb - 2} ${x},${yb} Q${x - 5},${yb - 2} ${x - 6},${yb - 11} Z" fill="${C.red}" ${st}/><path d="M${x - 4},${yb - 12} L${x},${yb - 16} L${x + 4},${yb - 12}" fill="${C.green}"/>`;
    case "lapiz": return `<rect x="${x - 16}" y="${yb - 6}" width="26" height="6" fill="${C.amber}" ${st}/><path d="M${x + 10},${yb - 6} L${x + 18},${yb - 3} L${x + 10},${yb} Z" fill="#f3d6a8" ${st}/>`;
    case "pluma": return `<ellipse cx="${x}" cy="${yb - 5}" rx="16" ry="4" fill="#fff" ${st} transform="rotate(-12 ${x} ${yb - 5})"/><line x1="${x - 18}" y1="${yb - 1}" x2="${x + 14}" y2="${yb - 8}" stroke="${C.dark}" stroke-width="1"/>`;
    case "hoja": return `<ellipse cx="${x}" cy="${yb - 5}" rx="12" ry="5" fill="#59b35f" ${st}/><line x1="${x - 12}" y1="${yb - 5}" x2="${x + 12}" y2="${yb - 5}" stroke="#2e6b33" stroke-width="1"/>`;
    case "globo": return `<circle cx="${x}" cy="${yb - 24}" r="22" fill="#f49ac1" ${st}/><path d="M${x - 3},${yb - 1} L${x + 3},${yb - 1} L${x},${yb - 3} Z" fill="#f49ac1" ${st}/>`;
    case "pelota": return `<circle cx="${x}" cy="${yb - 21}" r="21" fill="#fff" ${st}/><path d="M${x},${yb - 42} Q${x - 14},${yb - 21} ${x},${yb} Q${x - 26},${yb - 21} ${x},${yb - 42} Z" fill="${C.red}"/><path d="M${x},${yb - 42} Q${x + 14},${yb - 21} ${x},${yb} Q${x + 26},${yb - 21} ${x},${yb - 42} Z" fill="${C.blue}"/><circle cx="${x}" cy="${yb - 21}" r="21" fill="none" ${st}/>`;
    case "cubos": return "";
  }
  return "";
}
function cubes(n, x, yb) {   // n cubos apilados de 4 en 4
  let b = "";
  for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4), w = Math.min(4, n - r * 4); b += `<rect x="${x - w * 6.5 + c * 13}" y="${yb - 13 - r * 13}" width="12" height="12" fill="${C.amber}" stroke="${C.dark}" stroke-width="1"/>`; }
  return b;
}
function toy(k, x, yb) {   // juguetes para pesar con cubos
  const st = `stroke="${C.dark}" stroke-width="1.2"`;
  if (k === 0) return `<rect x="${x - 11}" y="${yb - 26}" width="22" height="20" rx="3" fill="${C.grey}" ${st}/><rect x="${x - 8}" y="${yb - 40}" width="16" height="13" rx="3" fill="${C.grey}" ${st}/><circle cx="${x - 3}" cy="${yb - 34}" r="2" fill="${C.blue}"/><circle cx="${x + 3}" cy="${yb - 34}" r="2" fill="${C.blue}"/><rect x="${x - 9}" y="${yb - 6}" width="6" height="6" fill="${C.dark}"/><rect x="${x + 3}" y="${yb - 6}" width="6" height="6" fill="${C.dark}"/>`;
  if (k === 1) return `<g transform="translate(${x - 18} ${yb - 22}) scale(0.66)">${car(0, 0, C.red)}</g>`;
  if (k === 2) return `<circle cx="${x}" cy="${yb - 13}" r="12" fill="#b7814a" ${st}/><circle cx="${x}" cy="${yb - 32}" r="9" fill="#b7814a" ${st}/><circle cx="${x - 7}" cy="${yb - 40}" r="4" fill="#b7814a" ${st}/><circle cx="${x + 7}" cy="${yb - 40}" r="4" fill="#b7814a" ${st}/><circle cx="${x}" cy="${yb - 30}" r="2" fill="${C.dark}"/>`;
  return `<circle cx="${x}" cy="${yb - 13}" r="13" fill="${C.red}" ${st}/><path d="M${x - 13},${yb - 13} Q${x},${yb - 5} ${x + 13},${yb - 13}" fill="none" stroke="#fff" stroke-width="2"/>`;
}
// Balanza: tilt −1 baja la izquierda · 0 equilibrada · 1 baja la derecha
function balance(tilt, left, right, ll, rl) {
  const cx = 160, cy = 40, L = 100, a = tilt * 12 * Math.PI / 180;
  const ends = [[cx - L * Math.cos(a), cy - L * Math.sin(a)], [cx + L * Math.cos(a), cy + L * Math.sin(a)]];
  let b = `<rect x="${cx - 40}" y="150" width="80" height="8" rx="2" fill="#8a5a33"/><rect x="${cx - 4}" y="${cy}" width="8" height="110" fill="#b07a4a"/>`
    + `<line x1="${f1(ends[0][0])}" y1="${f1(ends[0][1])}" x2="${f1(ends[1][0])}" y2="${f1(ends[1][1])}" stroke="#8a5a33" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${C.dark}"/>`;
  [[left, ll], [right, rl]].forEach(([draw, lab], i) => {
    const [ex, ey] = ends[i], yb = ey + 60;
    b += `<line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex - 34)}" y2="${f1(yb)}" stroke="${C.dark}"/><line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex + 34)}" y2="${f1(yb)}" stroke="${C.dark}"/>`
      + `<path d="M${f1(ex - 40)},${f1(yb)} Q${f1(ex)},${f1(yb + 18)} ${f1(ex + 40)},${f1(yb)} Z" fill="#d5d9df" stroke="${C.dark}" stroke-width="1.2"/>`
      + draw(ex, yb) + (lab ? SVG.txt(f1(ex), f1(yb + 30), lab, 13) : "");
  });
  return SVG.svg(320, 162, b);
}
def("m1.pesar", (R, S) => {
  const T = S.m1.PS, k = R.int(0, 4);
  const pair = () => {   // dos cosas que pesan claramente distinto (a veces la grande es la ligera)
    let a, b; do { [a, b] = R.shuffle(OBJ).slice(0, 2); } while (Math.max(a[1], b[1]) < 4 * Math.min(a[1], b[1]) || (R.r() < 0.5 && !(a[2] > b[2] + 6 && a[1] < b[1]) && !(b[2] > a[2] + 6 && b[1] < a[1])));
    return [a, b];
  };
  if (k <= 1) {   // balanza inclinada: ¿qué pesa más / menos?
    const [a, b] = pair(), heavy = a[1] > b[1] ? a : b, light = heavy === a ? b : a, more = R.r() < 0.6;
    const pic = balance(heavy === a ? -1 : 1, (x, y) => thing(a[0], x, y), (x, y) => thing(b[0], x, y), T.nom[a[0]], T.nom[b[0]]);
    const opts = [a, b].map(o => cap1(T.art[o[0]])), ans = more ? heavy : light;
    return { q: (more ? T.mas_q : T.menos_q) + "<br>" + pic, kind: "choice", opts, correct: ans === a ? 0 : 1, shuffle: false,
      sol: T.bal_s(T.art[heavy[0]], T.art[light[0]], light[2] > heavy[2] + 6) };
  }
  if (k === 2) {   // equilibrada con cubos
    const t = R.int(0, 3), n = R.int(2, 9), right = R.r() < 0.5;
    const pic = right ? balance(0, (x, y) => cubes(n, x, y), (x, y) => toy(t, x, y), "", T.toys[t][1]) : balance(0, (x, y) => toy(t, x, y), (x, y) => cubes(n, x, y), T.toys[t][1], "");
    return { q: T.cubos_q(T.toys[t][0]) + "<br>" + pic, kind: "int", ans: n, sol: T.cubos_s(T.toys[t][0], n) };
  }
  if (k === 3) {   // comparar con cubos, sin dibujo
    const [t1, t2] = R.shuffle([0, 1, 2, 3, 4, 5]).slice(0, 2); let a, b; do { a = R.int(2, 12); b = R.int(2, 12); } while (a === b);
    if (R.r() < 0.5) { const more = R.r() < 0.5, j = more ? (a > b ? 0 : 1) : (a < b ? 0 : 1); return { q: T.cmp_q(T.toys[t1][2], a, T.toys[t2][2], b, more), kind: "choice", opts: [cap1(T.toys[t1][0]), cap1(T.toys[t2][0])], correct: j, shuffle: false, sol: T.cmp_s(T.toys[[t1, t2][j]][0], Math.max(a, b), Math.min(a, b), more) }; }
    const [x, y] = a > b ? [t1, t2] : [t2, t1];
    return { q: T.dif_q(T.toys[t1][2], a, T.toys[t2][2], b, T.toys[x][0], T.toys[y][0]), kind: "int", ans: Math.abs(a - b), sol: T.dif_s(Math.max(a, b), Math.min(a, b), T.toys[x][0], T.toys[y][0]) };
  }
  const [a, b] = pair(), heavy = a[1] > b[1] ? a : b, light = heavy === a ? b : a, more = R.r() < 0.6;   // sentido común, sin dibujo
  const opts = [a, b].map(o => cap1(T.art[o[0]]));
  return { q: T.sin_q(T.art[a[0]], T.art[b[0]], more), kind: "choice", opts, correct: (more ? heavy : light) === a ? 0 : 1, shuffle: false, sol: T.sin_s(T.art[heavy[0]], T.art[light[0]], light[2] > heavy[2] + 6) };
});

// ── Giros y recorridos ──
function mica(x, y, dir) {   // mariquita robot mirando hacia dir (0 arriba · 1 derecha · 2 abajo · 3 izquierda)
  return `<g transform="translate(${x} ${y}) rotate(${dir * 90})"><circle cx="0" cy="-11" r="6" fill="${C.dark}"/><ellipse cx="0" cy="2" rx="11" ry="13" fill="${C.red}" stroke="${C.dark}" stroke-width="1.2"/>`
    + `<line x1="0" y1="-11" x2="0" y2="15" stroke="${C.dark}" stroke-width="1.2"/><circle cx="-5" cy="-1" r="2.2" fill="${C.dark}"/><circle cx="5" cy="-1" r="2.2" fill="${C.dark}"/><circle cx="-5" cy="8" r="2.2" fill="${C.dark}"/><circle cx="5" cy="8" r="2.2" fill="${C.dark}"/>`
    + `<circle cx="-2.5" cy="-13" r="1.4" fill="#fff"/><circle cx="2.5" cy="-13" r="1.4" fill="#fff"/></g>`;
}
function prize(k, x, y) {   // 0 flor · 1 hoja · 2 seta
  if (k === 0) { let b = ""; for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5; b += `<circle cx="${f1(x + 7 * Math.sin(a))}" cy="${f1(y - 7 * Math.cos(a))}" r="5.5" fill="#f49ac1" stroke="${C.dark}" stroke-width=".8"/>`; } return b + `<circle cx="${x}" cy="${y}" r="4.5" fill="${C.amber}" stroke="${C.dark}" stroke-width=".8"/>`; }
  if (k === 1) return `<ellipse cx="${x}" cy="${y}" rx="13" ry="6.5" fill="#59b35f" stroke="${C.dark}" stroke-width="1" transform="rotate(-30 ${x} ${y})"/><line x1="${x - 10}" y1="${y + 6}" x2="${x + 10}" y2="${y - 6}" stroke="#2e6b33" stroke-width="1"/>`;
  return `<rect x="${x - 4}" y="${y}" width="8" height="10" fill="#f3e2c0" stroke="${C.dark}" stroke-width=".8"/><path d="M${x - 13},${y + 1} Q${x},${y - 18} ${x + 13},${y + 1} Z" fill="${C.red}" stroke="${C.dark}" stroke-width="1"/><circle cx="${x - 5}" cy="${y - 5}" r="2" fill="#fff"/><circle cx="${x + 4}" cy="${y - 7}" r="2" fill="#fff"/>`;
}
const GC = 6, GR = 4, GS = 34;   // tablero de 6 × 4 cuadros
function board(start, items, dir = 0) {   // dir: hacia dónde mira Mica (la dirección de la primera flecha: las flechas no son giros)
  let b = "";
  for (let c = 0; c < GC; c++) for (let r = 0; r < GR; r++) b += `<rect x="${6 + c * GS}" y="${6 + r * GS}" width="${GS}" height="${GS}" fill="${c === start[0] && r === start[1] ? "#fde6e6" : "#fff"}" stroke="${C.grey}" stroke-width="1.2"/>`;
  items.forEach(it => { b += prize(it.k, 6 + it.c * GS + GS / 2, 6 + it.r * GS + GS / 2); });
  return SVG.svg(GC * GS + 12, GR * GS + 12, b + mica(6 + start[0] * GS + GS / 2, 6 + start[1] * GS + GS / 2 + 1, dir));
}
const ARR = { R: "→", L: "←", U: "↑", D: "↓" }, MOV = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] }, FACE = { U: 0, R: 1, D: 2, L: 3 };
const walk = (p, seq) => seq.reduce(([c, r], m) => [c + MOV[m][0], r + MOV[m][1]], p);
const arrows = seq => seq.map(m => ARR[m]).join(" ");
function route(R, maxLen = 7) {   // salida y llegada distintas; primero en horizontal y después en vertical
  let s, t;
  do { s = [R.int(0, GC - 1), R.int(0, GR - 1)]; t = [R.int(0, GC - 1), R.int(0, GR - 1)]; } while ((s[0] === t[0] && s[1] === t[1]) || Math.abs(t[0] - s[0]) + Math.abs(t[1] - s[1]) > maxLen);
  const dx = t[0] - s[0], dy = t[1] - s[1];
  return { s, t, dx, dy, seq: [...Array(Math.abs(dx)).fill(dx > 0 ? "R" : "L"), ...Array(Math.abs(dy)).fill(dy > 0 ? "D" : "U")] };
}
def("m1.giros", (R, S) => {
  const T = S.m1.GR, k = R.int(0, 3);
  if (k === 0) {   // girar: Mica mira hacia arriba
    const [turns, end] = R.pick([[[0], 1], [[1], 3], [[2], 2], [[3], 0], [[0, 1], 0], [[1, 0], 0], [[2, 2], 0], [[0], 1], [[1], 3], [[2], 2]]);
    let d = 0;
    const steps = turns.map((t, i) => { d = (d + [1, 3, 2, 0][t]) % 4; return T.paso(i && turns[0] === 2 && t === 2 ? T.otra : T.gira[t], T.dirs[d].toLowerCase()); });
    const instr = turns.length === 1 ? T.gira[turns[0]] : T.y(T.gira[turns[0]], turns[0] === 2 && turns[1] === 2 ? T.otra : T.gira[turns[1]].toLowerCase());
    return { q: T.giro_q(instr) + "<br>" + SVG.svg(70, 70, mica(35, 37, 0)), kind: "choice", opts: T.dirs, correct: end, shuffle: false, sol: T.giro_s(steps.join(" "), T.dirs[end].toLowerCase()) };
  }
  if (k === 1) {   // ¿qué flechas llevan hasta la flor?
    for (let tries = 0; tries < 30; tries++) {
      const { s, t, dx, dy, seq } = route(R), h = seq.slice(0, Math.abs(dx)), v = seq.slice(Math.abs(dx));
      const flip = m => ({ R: "L", L: "R", U: "D", D: "U" })[m];
      const cands = [
        [...h, ...v, ...(seq.length < 7 ? [seq[seq.length - 1]] : [])].slice(0, seq.length < 7 ? seq.length + 1 : seq.length - 1),
        dy ? [...h, ...v.map(flip)] : [...h.map(flip), ...v],
        [...Array(Math.abs(dy)).fill(dx >= 0 ? "R" : "L"), ...Array(Math.abs(dx)).fill(dy > 0 ? "D" : "U")],
        seq.slice(0, -1),
        [...h.slice(0, -1), ...v],
      ].filter(c => c.length && (walk(s, c)[0] !== t[0] || walk(s, c)[1] !== t[1]));
      const opts = [...new Set([arrows(seq), ...cands.map(arrows)])].slice(0, 4);
      if (opts.length < 3) continue;
      const sh = R.shuffle(opts);
      return { q: T.flechas_q + "<br>" + board(s, [{ k: 0, c: t[0], r: t[1] }], FACE[seq[0]]), kind: "choice", opts: sh, correct: sh.indexOf(arrows(seq)), sol: T.flechas_s(T.cuenta(seq)) };
    }
    return null;
  }
  if (k === 2) {   // ¿a dónde llega?
    for (let tries = 0; tries < 30; tries++) {
      const { s, t, seq } = route(R, 6);
      const free = []; for (let c = 0; c < GC; c++) for (let r = 0; r < GR; r++) if (!(c === s[0] && r === s[1]) && !(c === t[0] && r === t[1])) free.push([c, r]);
      const [p1, p2] = R.shuffle(free).slice(0, 2), ks = R.shuffle([0, 1, 2]);
      const items = [{ k: ks[0], c: t[0], r: t[1] }, { k: ks[1], c: p1[0], r: p1[1] }, { k: ks[2], c: p2[0], r: p2[1] }];
      return { q: T.llega_q(arrows(seq)) + "<br>" + board(s, items, FACE[seq[0]]), kind: "choice", opts: T.premios_o, correct: ks[0], shuffle: false, sol: T.llega_s(T.cuenta(seq), T.premios[ks[0]]) };
    }
    return null;
  }
  const { seq } = route(R), dirs = [...new Set(seq)];   // contar cuadros
  if (dirs.length > 1 && R.r() < 0.5) { const m = R.pick(dirs), n = seq.filter(x => x === m).length; return { q: T.cuantos_q(arrows(seq), T.hacia[m]), kind: "int", ans: n, sol: T.cuantos_s(ARR[m], n, T.hacia[m]) }; }
  return { q: T.total_q(arrows(seq)), kind: "int", ans: seq.length, sol: T.total_s(seq.length) };
});

// ── Estimar cantidades ──
function pile(n, R) {   // grupo de 10 de referencia (a la izquierda) y un montón de n canicas
  const cols = [C.blue, C.red, C.green, C.amber, C.purple];
  let b = `<rect x="6" y="40" width="74" height="54" rx="8" fill="none" stroke="${C.grey}" stroke-width="1.5" stroke-dasharray="5 3"/>` + SVG.txt(43, 34, "10", 14, C.dark, "middle", "bold");
  for (let i = 0; i < 10; i++) b += `<circle cx="${19 + (i % 5) * 12}" cy="${60 + Math.floor(i / 5) * 14}" r="5.5" fill="${cols[i % 5]}"/>`;
  const cells = [];
  for (let x = 104; x <= 356; x += 15) for (let y = 14; y <= 136; y += 15) if (((x - 230) / 128) ** 2 + ((y - 75) / 66) ** 2 < 1) cells.push([x, y]);
  R.shuffle(cells).slice(0, n).forEach(([x, y], i) => { b += `<circle cx="${x + R.int(-2, 2)}" cy="${y + R.int(-2, 2)}" r="5.5" fill="${cols[i % 5]}"/>`; });
  return SVG.svg(366, 150, b);
}
def("m1.estimar", (R, S) => {
  const T = S.m1.ES, k = R.int(0, 4), [o, fem] = R.pick(T.objs), N1 = R.pick(T.nombres);
  if (k === 0) {   // el montón, comparado con un grupo de 10
    const t = R.int(2, 6) * 10, n = t + R.int(-3, 3);
    const far = R.shuffle([5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter(x => Math.abs(x - t) >= 30)).slice(0, 2);
    const { opts, correct } = choose(R, T.unos(t), far.map(T.unos));
    const seq = Array.from({ length: t / 10 }, (_, i) => (i + 1) * 10).join(", ");
    return { q: T.mont_q(T.canicas, true) + "<br>" + pile(n, R), kind: "choice", opts, correct, sol: T.mont_s(t / 10, seq, t, n) };
  }
  if (k === 1) {   // puñados de unos 10
    const p = R.int(2, 9), seq = Array.from({ length: p }, (_, i) => (i + 1) * 10).join(", ");
    return { q: T.pun_q(o, fem, p), kind: "int", ans: 10 * p, sol: T.pun_s(seq, 10 * p, o, fem) };
  }
  if (k === 2) {   // grupos de 10 y sueltos
    const g = R.int(2, 9), s = R.int(1, 9);
    return { q: T.grup_q(o, fem, g, s), kind: "int", ans: 10 * g + s, sol: T.grup_s(g, s, 10 * g + s) };
  }
  const N2 = R.pick(T.nombres.filter(x => x !== N1)), n = R.int(21, 79);
  if (k === 3) {   // ¿quién se ha acercado más?
    const good = Math.round(n / 10) * 10; let bad; do bad = R.int(1, 9) * 10; while (Math.abs(bad - n) < 15);
    const first = R.r() < 0.5, [e1, e2] = first ? [good, bad] : [bad, good];
    return { q: T.quien_q(o, fem, N1, e1, N2, e2, n), kind: "choice", opts: [N1, N2], correct: first ? 0 : 1, shuffle: false, sol: T.quien_s(n, good, bad, first ? N1 : N2) };
  }
  const ok = R.r() < 0.5;   // ¿ha estimado bien?
  let e = R.int(2, 8) * 10, m;
  if (ok) m = e + R.int(-3, 3);
  else if (R.r() < 0.25) { e = 1000; m = n; }
  else do m = R.int(11, 99); while (Math.abs(m - e) < 30);   // «lejos» tiene que verse sin dudas
  return { q: T.bien_q(o, fem, N1, e, m), kind: "choice", opts: T.bien_o, correct: ok ? 0 : 1, shuffle: false, sol: T.bien_s(e, m, ok) };
});
})();
