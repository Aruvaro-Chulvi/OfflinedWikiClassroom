/* WikiAula — generadores de ejercicios de Matemáticas, Grado 7 (1.º ESO).
   Cada generador recibe (R, S, H): R = azar (con semilla), S = textos del
   idioma (WA.I18N[lang].gen), H = ayudas de formato. Devuelve un ejercicio:
   { q, kind, ans, fields, opts, correct, sol }. Ver gen/_common.js y
   wikiaula.js (check). Textos: i18n/<lang>/mat7.js. */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
const def = WA.def;
const { PRIMES, isPrime, factorize, gcd, lcm, digitSum, divisors, factorsHtml } = WA.MATH;   // gen/_common.js

// ═════════════════ Unidad 1 · Números naturales ═════════════════

// Valor de una cifra según su posición
def("nat.posicional", (R, S, H) => {
  const len = R.int(5, 8);
  let digits;
  do { digits = Array.from({ length: len }, (_, i) => i === 0 ? R.int(1, 9) : R.int(0, 9)); }
  while (new Set(digits).size < len - 1);
  const n = +digits.join("");
  // posición (desde la derecha) con cifra no nula y que no se repita
  const cand = [];
  digits.forEach((d, i) => { if (d && digits.filter(x => x === d).length === 1) cand.push(len - 1 - i); });
  const pos = R.pick(cand.length ? cand : [len - 1]);
  const d = digits[len - 1 - pos];
  const v = d * 10 ** pos;
  return { q: S.posicional_q(H.n(n), d), kind: "int", ans: v, sol: S.posicional_s(d, S.posName1[pos], H.n(v)) };
});

// Qué cifra ocupa una posición
def("nat.orden", (R, S, H) => {
  const n = R.int(10000, 99999999);
  const len = String(n).length;
  const pos = R.int(1, len - 1);
  const d = Math.floor(n / 10 ** pos) % 10;
  // Contamos desde la derecha, orden a orden, hasta llegar al pedido (como en la tabla de la lección)
  const walk = Array.from({ length: pos + 1 }, (_, i) => [S.posNames[i], Math.floor(n / 10 ** i) % 10]);
  return { q: S.orden_q(H.n(n), S.posName1[pos]), kind: "int", ans: d, sol: S.orden_s(H.n(n), S.posName1[pos], d, walk) };
});

// Redondeo
def("nat.redondeo", (R, S, H) => {
  const pos = R.int(1, 4);
  const n = R.int(10 ** (pos + 1), 10 ** (pos + 3) - 1);
  const p = 10 ** pos;
  const look = Math.floor(n / (p / 10)) % 10;
  const r = Math.round(n / p) * p; // n entero positivo: round = criterio escolar (5 hacia arriba)
  return { q: S.redondeo_q(H.n(n), S.posName1[pos]), kind: "int", ans: r, sol: S.redondeo_s(look, look >= 5, H.n(r)) };
});

// Descomposición polinómica → número
def("nat.descomp", (R, S, H) => {
  const len = R.int(4, 7);
  let terms = [];
  const zeros = [];
  let n = 0;
  for (let pos = len - 1; pos >= 0; pos--) {
    const d = pos === len - 1 ? R.int(1, 9) : (R.r() < 0.35 ? 0 : R.int(1, 9));
    if (!d) { zeros.push(S.posNames[pos]); continue; }
    n += d * 10 ** pos;
    // Como la lección: «2 · 1000», sin potencias de 10 (llegan dos lecciones después)
    terms.push({ d, pos, t: pos === 0 ? String(d) : `${d} ${H.mul} ${H.n(10 ** pos)}` });
  }
  // A veces, desordenado (para que no sea leer de izquierda a derecha)
  const mixed = R.r() < 0.3;
  if (mixed) terms = R.shuffle(terms);
  const vals = terms.map(x => x.pos === 0 ? null : `${x.t} = ${H.n(x.d * 10 ** x.pos)}`).filter(Boolean);
  const sum = terms.slice().sort((a, b) => b.pos - a.pos).map(x => H.n(x.d * 10 ** x.pos)).join(" + ");
  return { q: S.descomp_q(terms.map(x => x.t).join(" + ")), kind: "int", ans: n, sol: S.descomp_s(vals, sum, H.n(n), zeros, mixed) };
});

// Número escrito con letras → cifras (solo idiomas con WA.I18N[lang].words)
def("nat.letras", (R, S, H, L) => {
  const kind = R.int(0, 2);
  let n;
  if (kind === 0) n = R.int(1, 999) * 1000 + R.pick([0, R.int(1, 99), R.int(100, 999)]);
  else if (kind === 1) n = R.int(1, 99) * 1e6 + R.int(0, 999) * 1000 + R.int(0, 999);
  else n = R.int(10, 999) * 1000 + R.int(0, 9) * 10;
  // Clase a clase (millones | millares | unidades), con los grupos de abajo siempre de tres cifras
  const g = [Math.floor(n / 1e6), Math.floor(n / 1000) % 1000, n % 1000];
  const top = g.findIndex(x => x > 0);
  const groups = [];
  for (let i = top; i < 3; i++)
    groups.push({ cls: i, w: g[i] ? L.words(g[i] * [1e6, 1000, 1][i]) : null, g: i === top ? String(g[i]) : String(g[i]).padStart(3, "0") });
  return { q: S.letras_q(L.words(n)), kind: "int", ans: n, sol: S.letras_s(groups, H.n(n)) };
});

// División entera: cociente y resto
def("ops.division", (R, S, H) => {
  const b = R.int(6, 48), q = R.int(12, 250), r = R.int(0, b - 1);
  const a = b * q + r;
  return { q: S.division_q(H.n(a), b), kind: "fields",
    fields: [{ label: S.division_f[0], ans: q }, { label: S.division_f[1], ans: r }],
    sol: S.division_s(H.n(a), b, q, r) };
});

// Reconstruir el dividendo
def("ops.dividendo", (R, S, H) => {
  const d = R.int(7, 45), q = R.int(11, 120), r = R.int(1, d - 1);
  const D = d * q + r;
  return { q: S.dividendo_q(d, q, r), kind: "int", ans: D, sol: S.dividendo_s(d, q, r, H.n(D)) };
});

// Propiedad distributiva (sacar factor común)
def("ops.distributiva", (R, S, H) => {
  const a = R.int(3, 19);
  const minus = R.r() < 0.35;
  let b, c, s;
  if (minus) { s = R.pick([10, 20, 50, 100]); c = R.int(3, 40); b = s + c; }
  else { s = R.pick([10, 20, 50, 100, 200]); b = R.int(2, s - 2); c = s - b; }
  const e = `${a} ${H.mul} ${b} ${minus ? "−" : "+"} ${a} ${H.mul} ${c}`;
  const r = a * s;
  return { q: S.distrib_q(e), kind: "int", ans: r, sol: (minus ? S.distrib_s2 : S.distrib_s)(a, b, c, s, H.n(r)) };
});

// Problemas de operaciones combinadas
def("ops.problema", (R, S, H) => {
  const P = R.pick(S.problemas);
  let a, b, c, r;
  for (let k = 0; k < 50; k++) {
    if (P.div) { b = R.pick([4, 5, 6, 8, 10, 12]); a = b * R.int(8, 40); c = R.int(3, 7); }
    else { a = R.int(8, 60); b = R.int(6, 30); c = R.int(2, 9) * (R.r() < 0.5 ? 1 : 3); }
    if (P.money) { b = R.int(2, 6); c = R.int(2, 9); a = b * c + R.int(3, 40); }   // dinero: cantidades pequeñas
    r = P.f(a, b, c);
    if (Number.isInteger(r) && r > 0) break;
  }
  return { q: P.q(a, b, c), kind: "int", ans: r, sol: P.s(a, b, c, H.n(r)) };
});

// ── Jerarquía de las operaciones ────────────────────────────────────────
// Tokens: números, "+", "-", "*", "/", "^", "(", ")", "[", "]". Evalúa paso a paso.
const OPEN = ["(", "["], CLOSE = [")", "]"];
function powStep(toks) { // resuelve todas las potencias de un tramo (base y exponente números)
  const t = toks.slice();
  for (let i = t.length - 2; i > 0; i--) {
    if (t[i] !== "^") continue;
    const a = t[i - 1], e = t[i + 1];
    if (typeof a !== "number" || typeof e !== "number") return null;
    const v = a ** e;
    if (v > 400) return null;
    t.splice(i - 1, 3, v);
  }
  return t;
}
function evalFlat(toks) { // sin paréntesis; null si no es natural/exacto
  const t = toks.includes("^") ? powStep(toks) : toks.slice();
  if (!t) return null;
  for (let i = 1; i < t.length; i += 2) {
    if (t[i] === "*" || t[i] === "/") {
      const a = t[i - 1], b = t[i + 1];
      let v;
      if (t[i] === "*") v = a * b; else { if (!b || a % b) return null; v = a / b; }
      t.splice(i - 1, 3, v); i -= 2;
    }
  }
  let v = t[0];
  for (let i = 1; i < t.length; i += 2) { v = t[i] === "+" ? v + t[i + 1] : v - t[i + 1]; if (v < 0) return null; }
  return v;
}
function stepOnce(toks) { // un paso "de nivel": el paréntesis más interno, o todas las potencias, o todos los ×/:, o las sumas/restas
  const close = toks.findIndex(x => CLOSE.includes(x));
  if (close >= 0) {
    let open = close - 1;
    while (open >= 0 && !OPEN.includes(toks[open])) open--;
    const inner = toks.slice(open + 1, close);
    if (inner.includes("^")) { // dentro del paréntesis también hay jerarquía: primero la potencia
      const p = powStep(inner);
      if (!p) return null;
      return toks.slice(0, open + 1).concat(p, toks.slice(close));
    }
    const v = evalFlat(inner);
    if (v === null) return null;
    return toks.slice(0, open).concat([v], toks.slice(close + 1));
  }
  if (toks.includes("^")) return powStep(toks);
  if (toks.some(x => x === "*" || x === "/")) {
    // En cada cadena de · y : solo la primera operación (de izquierda a derecha): 24 : 6 · 2 → 4 · 2 → 8
    const t = toks.slice();
    let done = false;
    for (let i = 1; i < t.length; i += 2) {
      if (t[i] === "+" || t[i] === "-") { done = false; continue; }
      if (done) continue;
      const a = t[i - 1], b = t[i + 1];
      if (t[i] === "/" && (!b || a % b)) return null;
      t.splice(i - 1, 3, t[i] === "*" ? a * b : a / b); i -= 2; done = true;
    }
    return t;
  }
  if (toks.length >= 5) { // varias sumas y restas: una a una, de izquierda a derecha (18 − 6 − 2 → 12 − 2 → 10)
    const v = toks[1] === "+" ? toks[0] + toks[2] : toks[0] - toks[2];
    return v < 0 ? null : [v].concat(toks.slice(3));
  }
  const v = evalFlat(toks);
  return v === null ? null : [v];
}
function toksHtml(toks, H) {
  let s = "";
  toks.forEach((x, i) => {
    if (toks[i - 1] === "^") return;
    if (x === "^") s += `<sup>${toks[i + 1]}</sup>`;
    else if (x === "(" || x === ")" || x === "[" || x === "]") s += x;
    else if (x === "*") s += ` ${H.mul} `;
    else if (x === "/") s += ` ${H.div} `;
    else if (x === "+") s += " + ";
    else if (x === "-") s += " − ";
    else s += String(x);
  });
  return s;
}
const JER_TEMPLATES = [
  "a + b * c", "a - b * c", "a * b - c", "a + b / c", "a * b + c * d", "a / b + c * d",
  "( a + b ) * c", "a * ( b - c )", "( a - b ) * c + d", "a + ( b + c ) / d", "a - ( b - c ) * d",
  "a * b - c / d", "( a + b ) / c - d", "a + b * ( c - d )", "( a * b - c ) / d", "a * ( b + c ) - d * e",
];
// Lo nuevo de 1.º ESO: cadenas del mismo piso (de izquierda a derecha), potencias y corchetes
const JER_CHAIN = ["a / b * c", "a - b - c", "a / b * c - d", "a - b + c - d", "a - b - c + d * e", "a + b / c * d"];
const JER_POW = ["a + b ^ 2 * c", "( a - b ^ 2 ) * c", "a ^ 2 - b * c", "a * ( b + c ^ 2 )", "( a + b ) ^ 2 - c",
  "a ^ 3 + b / c", "a - ( b - c ) ^ 2", "a * b ^ 2 - c", "( a ^ 2 + b ) / c"];
const JER_BRACKET = ["a * [ b - ( c + d ) ] + e", "[ ( a + b ) ^ 2 - c ] / d", "a + [ b * ( c - d ) - e ]", "[ a - ( b + c ) ] * d",
  "a - [ b + ( c - d ) * e ]", "[ a * ( b - c ) + d ] / e"];
def("jer.calcula", (R, S, H) => {
  for (let tries = 0; tries < 400; tries++) {
    const u = R.r();
    const tpl = R.pick(u < 0.25 ? JER_TEMPLATES : u < 0.45 ? JER_CHAIN : u < 0.75 ? JER_POW : JER_BRACKET).split(" ");
    const toks = tpl.map((x, i) => {
      if (/^\d+$/.test(x)) return +x;                       // exponente fijo (2 o 3)
      if (!/^[a-e]$/.test(x)) return x;
      if (tpl[i + 1] === "^") return tpl[i + 2] === "3" ? R.int(2, 4) : R.int(2, 6);   // bases pequeñas
      if (tpl[i - 1] === "/" && CLOSE.includes(tpl[i - 2])) return R.int(2, 5);        // divisor de un paréntesis
      return R.int(2, 15);
    });
    // divisiones: hacemos el dividendo múltiplo cuando es un número suelto
    for (let i = 0; i < toks.length; i++) if (toks[i] === "/" && typeof toks[i - 1] === "number" && typeof toks[i + 1] === "number" && toks[i - 2] !== "^") toks[i - 1] = toks[i + 1] * R.int(1, 9);
    let cur = toks, steps = [toksHtml(cur, H)], ok = true;
    while (cur.length > 1) { cur = stepOnce(cur); if (!cur) { ok = false; break; } steps.push(toksHtml(cur, H)); }
    if (!ok || cur[0] > 300) continue;
    const res = cur[0];
    return { q: S.jer_q(steps[0]), kind: "int", ans: res,
      sol: S.jer_s_intro + "<br>" + steps.map((s, i) => i ? "= " + (i === steps.length - 1 ? `<b>${s}</b>` : s) : s).join("<br>") };
  }
  return { q: S.jer_q("2 + 3 " + H.mul + " 4"), kind: "int", ans: 14, sol: S.jer_s_intro + "<br>2 + 12<br>= <b>14</b>" };
});

// Dónde van los paréntesis
def("jer.parentesis", (R, S, H) => {
  for (let tries = 0; tries < 200; tries++) {
    const ops = [R.pick(["+", "-"]), R.pick(["*"])];
    if (R.r() < 0.5) ops.reverse();
    const [a, b, c] = [R.int(2, 12), R.int(2, 12), R.int(2, 12)];
    const plain = [a, ops[0], b, ops[1], c];
    const left = ["(", a, ops[0], b, ")", ops[1], c];
    const right = [a, ops[0], "(", b, ops[1], c, ")"];
    const ev = t => { let cur = t; while (cur && cur.length > 1) cur = stepOnce(cur); return cur ? cur[0] : null; };
    const vp = ev(plain), vl = ev(left), vr = ev(right);
    if (vp === null || vl === null || vr === null || vl === vr) continue;
    // Una vez de cada cuatro se pide el resultado de la expresión SIN paréntesis: la buena es «En ningún sitio».
    // Solo se ofrece entonces el paréntesis que sí cambia el resultado (el otro rodea la multiplicación y daría lo mismo).
    if (R.r() < 0.25) {
      const change = vl !== vp ? left : right, other = change === left ? vl : vr;
      if (other === vp) continue;
      const steps = [plain]; let cur = plain;
      while (cur.length > 1) { cur = stepOnce(cur); steps.push(cur); }
      return { q: S.paren_q(toksHtml(plain, H), vp), kind: "choice", opts: [toksHtml(change, H), S.paren_none], correct: 1,
        sol: S.paren_s_none(steps.map(t => toksHtml(t, H)), toksHtml(change, H), other) };
    }
    // El resultado pedido es el de "left" o "right" y debe ser distinto del de sin paréntesis
    const target = R.r() < 0.5 ? left : right;
    const tv = ev(target);
    if (tv === vp) continue;
    const opts = [toksHtml(left, H), toksHtml(right, H), S.paren_none];
    const correct = target === left ? 0 : 1;
    return { q: S.paren_q(toksHtml(plain, H), tv), kind: "choice", opts, correct, sol: S.paren_s(toksHtml(target, H), tv) };
  }
  return null;
});

// ── Potencias ───────────────────────────────────────────────────────────
def("pot.valor", (R, S, H) => {
  const b = R.int(2, 12);
  const e = b <= 3 ? R.int(2, 6) : b <= 5 ? R.int(2, 4) : b <= 10 ? R.int(2, 3) : 2;
  const r = b ** e;
  const prod = Array(e).fill(b).join(" " + H.mul + " ");
  return { q: S.potvalor_q(H.pow(b, e)), kind: "int", ans: r, sol: S.potvalor_s(`${H.pow(b, e)} = ${prod}`, H.n(r)) };
});
def("pot.partes", (R, S, H) => {
  let b = R.int(2, 15), e = R.int(2, 9);
  while (e === b) e = R.int(2, 9);
  const what = R.pick(["b", "e"]);
  return { q: S.potpartes_q(H.pow(b, e), what), kind: "int", ans: what === "b" ? b : e, sol: S.potpartes_s(b, e) };
});
function powChoice(R, H, b, m, n, r) {
  // Respuesta correcta b^r + distractores típicos
  // Se descarta todo distractor con el mismo VALOR que la respuesta o que otro ya elegido (4⁸ = 2¹⁶, 4¹ = 2²…)
  const val = c => (BigInt(c.b) ** BigInt(c.e)).toString();
  const bad = new Set([val({ b, e: r })]);
  const opts = [{ b, e: r }];
  const cand = [{ b, e: m * n }, { b, e: m + n }, { b: b * b, e: r }, { b, e: Math.abs(m - n) || m + 1 }, { b: b * 2, e: m + n }, { b, e: r + 1 }, { b, e: r + 2 }, { b: b + 1, e: r }];
  for (const c of R.shuffle(cand)) { if (c.e > 0 && !bad.has(val(c))) { bad.add(val(c)); opts.push(c); } if (opts.length === 4) break; }
  const sh = R.shuffle(opts.map((o, i) => ({ o, i })));
  return { opts: sh.map(x => H.pow(x.o.b, x.o.e)), correct: sh.findIndex(x => x.i === 0) };
}
def("pot.producto", (R, S, H) => {
  const b = R.int(2, 9), m = R.int(2, 7), n = R.int(2, 7);
  const c = powChoice(R, H, b, m, n, m + n);
  return { q: S.potprod_q(`${H.pow(b, m)} ${H.mul} ${H.pow(b, n)}`), kind: "choice", ...c, sol: S.potprod_s(b, m, n, H.pow(b, m + n)) };
});
def("pot.cociente", (R, S, H) => {
  const b = R.int(2, 9), n = R.int(2, 6), m = n + R.int(1, 6);
  const c = powChoice(R, H, b, m, n, m - n);
  return { q: S.potprod_q(`${H.pow(b, m)} ${H.div} ${H.pow(b, n)}`), kind: "choice", ...c, sol: S.potcoc_s(b, m, n, H.pow(b, m - n)) };
});
def("pot.potpot", (R, S, H) => {
  const b = R.int(2, 9), m = R.int(2, 5), n = R.int(2, 5);
  const c = powChoice(R, H, b, m, n, m * n);
  return { q: S.potprod_q(`(${H.pow(b, m)})<sup>${n}</sup>`), kind: "choice", ...c, sol: S.potpot_s(b, m, n, H.pow(b, m * n)) };
});
def("pot.diez", (R, S, H) => {
  const a = R.int(1, 99), k = R.int(2, 7);
  const r = a * 10 ** k;
  return { q: S.potdiez_q(`${a} ${H.mul} ${H.pow(10, k)}`), kind: "int", ans: r, sol: S.potdiez_s(k, H.n(r)) };
});
def("pot.problema", (R, S, H) => {
  if (R.r() < 0.5) { const l = R.int(4, 30); return { q: S.potarea_q(l), kind: "int", ans: l * l, sol: S.potarea_s(l, H.n(l * l)) }; }
  const l = R.int(2, 15);
  return { q: S.potcubo_q(l), kind: "int", ans: l ** 3, sol: S.potcubo_s(l, H.n(l ** 3)) };
});

// ── Raíz cuadrada ───────────────────────────────────────────────────────
// Tanteo de la lección para raíces fuera de la tabla (más de 15²): decenas y, si es exacta, la última cifra
function rootTanteo(n, r, S, H) {
  const k = Math.floor(r / 10) * 10;
  if (k === r) return S.raiz_tant_dec(r, H.n(n));
  const last = n % 10;
  const ends = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => (x * x) % 10 === last);
  const cands = ends.map(x => k + x).filter(x => x > k && x < k + 10);
  return S.raiz_tant(k, H.n(k * k), k + 10, H.n((k + 10) ** 2), last, ends, cands, r, H.n(n));
}
def("raiz.exacta", (R, S, H) => {
  const r = R.int(2, 30);
  return { q: S.raiz_q(H.sqrt(H.n(r * r))), kind: "int", ans: r, sol: r > 15 ? rootTanteo(r * r, r, S, H) : S.raiz_s(H.n(r * r), r) };
});
def("raiz.entera", (R, S, H) => {
  const r = R.int(3, 25), s = R.int(1, 2 * r);
  const n = r * r + s;
  const k = Math.floor(r / 10) * 10;
  return { q: S.raizent_q(H.n(n)), kind: "fields",
    fields: [{ label: S.raizent_f[0], ans: r }, { label: S.raizent_f[1], ans: s }],
    sol: r > 15 ? S.raizent_tant(H.n(n), k, k + 10, r, s) : S.raizent_s(H.n(n), r, s) };
});
def("raiz.entre", (R, S, H) => {
  const a = R.int(2, 20), n = a * a + R.int(1, 2 * a);
  return { q: S.raizentre_q(H.sqrt(n)), kind: "fields",
    fields: [{ label: S.raizentre_f[0], ans: a }, { label: S.raizentre_f[1], ans: a + 1 }],
    sol: S.raizentre_s(n, a) };
});
def("raiz.problema", (R, S, H) => {
  const l = R.int(5, 40);
  return { q: S.raizlado_q(H.n(l * l)), kind: "int", ans: l,
    sol: l > 15 ? S.raizlado_t(H.n(l * l), rootTanteo(l * l, l, S, H), l) : S.raizlado_s(H.n(l * l), l) };
});

// ── Estrategias para resolver problemas (heurísticas de la lección) ─────
def("m7.heur", (R, S, H) => {
  const t = R.int(0, 3);
  if (t === 0) { // ensayo y error organizado: animales y patas, vehículos y ruedas…
    const P = R.pick(S.heur_pares);
    const n = R.int(8, 30), big = R.int(2, n - 2), small = n - big;
    const total = small * P.na + big * P.nb;
    const askBig = R.r() < 0.6;
    return { q: S.heur_patas_q(P, n, total, askBig), kind: "int", ans: askBig ? big : small,
      sol: S.heur_patas_s(P, n, total, big, small) };
  }
  if (t === 1) { // empezar por el final: el número pensado
    const x = R.int(2, 20), a = R.int(2, 9), b = R.int(1, 30), plus = R.r() < 0.5;
    if (!plus && x * a - b < 1) return { q: S.heur_num_q(a, b, true, x * a + b), kind: "int", ans: x, sol: S.heur_num_s(a, b, true, x * a + b, x) };
    const c = plus ? x * a + b : x * a - b;
    return { q: S.heur_num_q(a, b, plus, c), kind: "int", ans: x, sol: S.heur_num_s(a, b, plus, c, x) };
  }
  if (t === 2) { // casos pequeños y una regla: apretones de manos o partidos de una liga
    const n = R.int(4, 12), ctx = R.int(0, 1);
    const terms = Array.from({ length: n - 1 }, (_, i) => n - 1 - i);
    return { q: S.heur_apret_q(n, ctx), kind: "int", ans: n * (n - 1) / 2, sol: S.heur_apret_s(n, ctx, terms.join(" + "), n * (n - 1) / 2) };
  }
  // hacer un dibujo o una tabla: el caracol (o la rana) en el pozo
  const up = R.int(3, 7), down = R.int(1, up - 1), g = up - down;
  const h = R.int(up + g + 1, Math.min(30, up + 11 * g));   // como mucho 12 días de tabla
  const day = Math.ceil((h - up) / g) + 1;           // primer día en que start + up ≥ h
  const st = d => (d - 1) * g;
  return { q: S.heur_pozo_q(R.pick(S.heur_animal), h, up, down), kind: "int", ans: day,
    sol: S.heur_pozo_s(h, up, down, g, day, st(day - 1), st(day)) };
});

// ═════════════════ Unidad 2 · Divisibilidad ═════════════════

def("div.multiplo", (R, S, H) => {
  const b = R.int(3, 19);
  const yes = R.r() < 0.5;
  const q = R.int(4, 40);
  const a = yes ? b * q : b * q + R.int(1, b - 1);
  return { q: S.multiplo_q(a, b), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: yes ? 0 : 1,
    sol: S.multiplo_s(a, b, yes, Math.floor(a / b), a % b) };
});
def("div.divisores", (R, S, H) => {
  const n = R.pick([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 70, 72, 75, 80, 84, 90, 96, 100]);
  const d = divisors(n);
  const pairs = [];
  for (const x of d) { if (x * x > n) break; pairs.push(`${x} ${H.mul} ${n / x}`); }
  return { q: S.divisores_q(n), kind: "set", ans: d, sol: S.divisores_s(n, pairs.join(", "), d.join(", ")) };
});
def("div.multrango", (R, S, H) => {
  const n = R.int(6, 25);
  let a = R.int(20, 150);
  if (a % n === 0) a++;   // los extremos nunca son múltiplos: «entre a y b» no deja dudas
  const b = a + n * R.int(3, 5);
  const list = [];
  for (let k = Math.ceil(a / n) * n; k <= b; k += n) if (k >= a) list.push(k);
  return { q: S.multrango_q(n, a, b), kind: "set", ans: list, sol: S.multrango_s(n, list.join(", ")) };
});
def("div.divisorde", (R, S, H) => {
  const n = R.pick([24, 30, 36, 42, 45, 48, 54, 56, 60, 63, 66, 70, 72, 78, 84, 88, 90, 96, 98, 105]);
  const ds = divisors(n).filter(x => x > 2 && x < n);
  const good = R.pick(ds);
  const bad = R.shuffle(Array.from({ length: 20 }, (_, i) => i + 4).filter(x => n % x !== 0)).slice(0, 3);
  const all = R.shuffle([good, ...bad]);
  return { q: S.divde_q(n), kind: "choice", opts: all.map(String), correct: all.indexOf(good), sol: S.divde_s(n, good) };
});
function altSums(n) { const ds = String(n).split("").reverse().map(Number); let a = 0, b = 0; ds.forEach((d, i) => i % 2 ? b += d : a += d); return [a, b]; }
function divInfo(n, d, S, H) {
  const ok = n % d === 0;
  const [a, b] = altSums(n);
  return S.crit_rule[d](H.n(n), ok, digitSum(n), a, b, n);
}
// Con los criterios del 4 y del 6 («Combinar criterios» de la lección)
def("crit.divisible", (R, S, H) => {
  const d = R.pick([2, 3, 4, 5, 6, 9, 10, 11]);
  const yes = R.r() < 0.5;
  let n;
  for (let k = 0; k < 300; k++) { n = R.int(100, 99999); if ((n % d === 0) === yes) break; }
  return { q: S.crit_q(H.n(n), d), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: n % d === 0 ? 0 : 1, sol: divInfo(n, d, S, H) };
});
def("crit.multi", (R, S, H) => {
  const D = [2, 3, 4, 5, 6, 9, 10, 11];
  let n;
  do { n = R.pick([R.int(100, 9999) * R.pick([1, 2, 3, 4, 5, 6, 9, 10, 15]), R.int(100, 99999)]); } while (n < 100 || n > 99999);
  const correct = D.map((d, i) => n % d === 0 ? i : -1).filter(i => i >= 0);
  return { q: S.critmulti_q(H.n(n)), kind: "multi", opts: D.map(String), correct,
    sol: S.critmulti_s(H.n(n), correct.map(i => D[i]).join(", ")) + "<br>" + D.map(d => "• " + divInfo(n, d, S, H)).join("<br>") };
});
def("crit.cifra", (R, S, H) => {
  const d = R.pick([3, 9, 3, 11]);
  for (let k = 0; k < 100; k++) {
    const len = R.int(3, 5);
    const digits = Array.from({ length: len }, (_, i) => i === 0 ? R.int(1, 9) : R.int(0, 9));
    const hole = R.int(1, len - 1);
    const ok = [];
    for (let x = 0; x <= 9; x++) { const ds = digits.slice(); ds[hole] = x; if (+ds.join("") % d === 0) ok.push(x); }
    if (!ok.length) continue;
    const shown = digits.map((x, i) => i === hole ? "<span class=\"wa-hole\">□</span>" : x).join("");
    // Método de la lección (ejemplo 4): sumar las cifras conocidas y ver cuánto falta
    let sol;
    if (d !== 11) {
      const known = digits.filter((_, i) => i !== hole), s = known.reduce((a, x) => a + x, 0);
      sol = S.critcifra_s(d, known.join(" + "), s, ok.map(x => s + x), ok);
    } else {
      // desde la derecha: lugares impares (1.º, 3.º…) y pares (2.º, 4.º…)
      const fromR = digits.slice().reverse(), hR = len - 1 - hole;
      const odd = [], even = [];
      fromR.forEach((x, i) => { if (i !== hR) (i % 2 ? even : odd).push(x); });
      const so = odd.reduce((a, x) => a + x, 0), se = even.reduce((a, x) => a + x, 0), x = ok[0];
      const holeOdd = hR % 2 === 0, A = so + (holeOdd ? x : 0), B = se + (holeOdd ? 0 : x);
      sol = S.critcifra_s11(odd, even, holeOdd, so, se, x, A, B);
    }
    return { q: S.critcifra_q(shown, d), kind: "set", ans: ok, sol };
  }
  return null;
});
def("prim.esprimo", (R, S, H) => {
  let n;
  if (R.r() < 0.5) n = R.pick(PRIMES.filter(p => p > 10).concat([101, 103, 107, 109, 113, 127, 131, 137, 139, 149]));
  else {
    // compuestos "engañosos": impares, sin criterio evidente
    n = R.pick([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99, 111, 119, 121, 133, 143, 147, 161, 169, 187]);
  }
  const prime = isPrime(n);
  // Primos que hay que probar (p · p ≤ n) y el primero que ya se pasa, como en la lección
  const tried = PRIMES.filter(p => p * p <= n), next = PRIMES.find(p => p * p > n);
  const sm = (() => { for (let p = 2; p * p <= n; p++) if (n % p === 0) return p; return n; })();
  return { q: S.primo_q(n), kind: "choice", opts: S.primo_opts, correct: prime ? 0 : 1,
    sol: prime ? S.primo_s_p(n, tried, next) : S.primo_s_c(n, sm, PRIMES.filter(p => p < sm)) };
});
function randComposite(R, maxN) {
  for (;;) {
    let n = 1;
    const k = R.int(2, 5);
    for (let i = 0; i < k; i++) n *= R.pick([2, 2, 2, 3, 3, 5, 5, 7, 11]);
    if (n >= 12 && n <= maxN && !isPrime(n)) return n;
  }
}
def("prim.factoriza", (R, S, H) => {
  const n = randComposite(R, 1000);
  const f = factorize(n);
  const steps = [];
  let m = n;
  const ps = Object.keys(f).map(Number).sort((a, b) => a - b);
  for (const p of ps) for (let i = 0; i < f[p]; i++) { steps.push(`${m} ${WA.H.div} ${p} = ${m / p}`); m /= p; }
  // Un paso por línea (como la columna de la lección); nunca «·» como separador, que aquí es multiplicar
  return { q: S.factoriza_q(H.n(n)), kind: "factors", ans: n,
    sol: S.factoriza_s(steps.join("<br>"), ps.map(p => S.factoriza_veces(p, f[p])), factorsHtml(f, H)) };
});
def("prim.defact", (R, S, H) => {
  const n = randComposite(R, 2000);
  const f = factorize(n);
  // Como el ejemplo de la lección: primero las potencias, después multiplicar paso a paso
  const ps = Object.keys(f).map(Number).sort((a, b) => a - b);
  const pows = ps.filter(p => f[p] > 1).map(p => `${H.pow(p, f[p])} = ${p ** f[p]}`);
  const vals = ps.map(p => p ** f[p]);
  const steps = [];
  let acc = vals[0];
  for (let i = 1; i < vals.length; i++) { steps.push(`${H.n(acc)} ${H.mul} ${vals[i]} = ${H.n(acc * vals[i])}`); acc *= vals[i]; }
  return { q: S.defact_q(factorsHtml(f, H)), kind: "int", ans: n, sol: S.defact_s(factorsHtml(f, H), H.n(n), pows, steps) };
});
function pairWithGcd(R, small) {
  for (;;) {
    const g = R.pick(small ? [2, 3, 4, 5, 6, 8, 9, 10, 12] : [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18]);
    const a1 = R.int(2, 9), b1 = R.int(2, 9);
    if (a1 === b1 || gcd(a1, b1) !== 1) continue;
    const a = g * a1, b = g * b1;
    if (a <= 200 && b <= 200) return [Math.min(a, b), Math.max(a, b)];
  }
}
function gcdSol(a, b, S, H) {
  const fa = factorize(a), fb = factorize(b), common = {};
  for (const p in fa) if (fb[p]) common[p] = Math.min(fa[p], fb[p]);
  const g = gcd(a, b), ch = factorsHtml(common, H);
  const res = !Object.keys(common).length ? S.nocommon : ch === String(g) ? `<b>${g}</b>` : `${ch} = <b>${g}</b>`;
  return S.mcd_s(`${a} = ${factorsHtml(fa, H)}`, `${b} = ${factorsHtml(fb, H)}`, res);
}
function lcmSol(a, b, S, H) {
  const fa = factorize(a), fb = factorize(b), all = {};
  for (const p in fa) all[p] = fa[p];
  for (const p in fb) all[p] = Math.max(all[p] || 0, fb[p]);
  const ah = factorsHtml(all, H), m = H.n(lcm(a, b));
  return S.mcm_s(`${a} = ${factorsHtml(fa, H)}`, `${b} = ${factorsHtml(fb, H)}`, ah === String(m) ? `<b>${m}</b>` : `${ah} = <b>${m}</b>`);
}
def("mcd.calcula", (R, S, H) => {
  const [a, b] = pairWithGcd(R);
  return { q: S.mcd_q(a, b), kind: "int", ans: gcd(a, b), sol: gcdSol(a, b, S, H) };
});
def("mcm.calcula", (R, S, H) => {
  for (;;) {
    const a = R.int(4, 40), b = R.int(4, 40);
    if (a === b || a % b === 0 || b % a === 0) continue;
    const m = lcm(a, b);
    if (m > 400) continue;
    const [x, y] = [Math.min(a, b), Math.max(a, b)];
    return { q: S.mcm_q(x, y), kind: "int", ans: m, sol: lcmSol(x, y, S, H) };
  }
});
def("mcd.problema", (R, S, H) => {
  const P = R.pick(S.mcdprob);
  const [a, b] = pairWithGcd(R, true);
  const g = gcd(a, b);
  return { q: P.q(a, b), kind: "int", ans: g, sol: P.s(a, b, g) + "<br>" + gcdSol(a, b, S, H) };
});
function lcmPair(R) {
  for (;;) {
    const a = R.int(4, 30), b = R.int(4, 30);
    if (a === b || a % b === 0 || b % a === 0) continue;
    if (lcm(a, b) <= 240) return [Math.min(a, b), Math.max(a, b)];
  }
}
def("mcm.problema", (R, S, H) => {
  const P = R.pick(S.mcmprob);
  const [a, b] = lcmPair(R);
  const m = lcm(a, b);
  return { q: P.q(a, b), kind: "int", ans: m, sol: P.s(a, b, m) + "<br>" + lcmSol(a, b, S, H) };
});
def("mcx.tipo", (R, S, H) => {
  const isMcd = R.r() < 0.5;
  let q, P;
  if (isMcd) { const [a, b] = pairWithGcd(R, true); P = R.pick(S.mcdprob); q = P.q(a, b); }
  else { const [a, b] = lcmPair(R); P = R.pick(S.mcmprob); q = P.q(a, b); }
  // La solución usa las palabras del propio enunciado (P.pista)
  return { q: S.mcx_q(q), kind: "choice", opts: S.mcx_opts, correct: isMcd ? 0 : 1, sol: (isMcd ? S.mcx_s_mcd : S.mcx_s_mcm)(P.pista) };
});

// ── Pensamiento computacional: seguir algoritmos (traza) ───────────────
def("m7.algo", (R, S, H) => {
  const t = R.int(0, 2);
  if (t === 0) { // Euclides con traza: m.c.d. y número de vueltas
    for (;;) {
      const g = R.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15]), b = g * R.int(3, 25), a = b * R.int(1, 4) + g * R.int(1, 20);
      if (a > 300 || b < 12 || a <= b || gcd(a, b) !== g) continue;
      const rows = [];
      let x = a, y = b;
      while (true) { const q = Math.floor(x / y), r = x % y; rows.push([x, y, q, r]); if (!r) break; x = y; y = r; }
      if (rows.length < 2 || rows.length > 5) continue;
      return { q: S.algo_euc_q(a, b), kind: "fields", fields: [{ label: S.algo_euc_f[0], ans: g }, { label: S.algo_euc_f[1], ans: rows.length }],
        sol: S.algo_euc_s(rows) };
    }
  }
  if (t === 1) { // seguir un bucle: ¿cuál es el último número que escribe?
    for (;;) {
      const mul = R.r() < 0.4, k = mul ? R.int(2, 3) : R.int(2, 9), n0 = mul ? R.int(1, 5) : R.int(0, 12);
      const lim = mul ? R.int(20, 200) : R.int(20, 80), until = R.r() < 0.5;   // «mientras n < lim» o «hasta que n > lim»
      const out = [];
      let n = n0;
      for (;;) { out.push(n); n = mul ? n * k : n + k; if (until ? n > lim : !(n < lim)) break; }
      if (out.length < 3 || out.length > 9 || n0 === 0 && mul) continue;
      return { q: S.algo_bucle_q(n0, mul, k, lim, until), kind: "int", ans: out[out.length - 1], sol: S.algo_bucle_s(out, n, lim, until) };
    }
  }
  // sumar las cifras hasta que quede una sola
  const N = R.int(1000, 99999), steps = [];
  let m = N;
  while (m > 9) { const ds = String(m).split("").map(Number), s = ds.reduce((p, x) => p + x, 0); steps.push(`${ds.join(" + ")} = ${s}`); m = s; }
  return { q: S.algo_cifras_q(H.n(N)), kind: "int", ans: m, sol: S.algo_cifras_s(steps, m) };
});
})();
