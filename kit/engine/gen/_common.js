/* WikiAula — utilidades comunes de los generadores de ejercicios (se carga
   antes que cualquier gen/*.js).

   WA.def(id, fn)   registra un generador: fn(R, S, H, L) → ejercicio
                    R = azar con semilla (R.r, R.int, R.pick, R.shuffle)
                    S = textos de los generadores del idioma (WA.I18N[lang].gen;
                        cada archivo de curso usa su propio apartado: S.m5, S.m11…)
                    H = formato (H.n, H.dec, H.pow, H.frac, H.sqrt, H.mul, H.div)
                    L = todo el idioma (L.words, L.num…)
   WA.MATH          aritmética: primos, m.c.d., fracciones exactas, polinomios…
   WA.SVG           dibujos sencillos para los enunciados (sobre todo Primaria)
   Tipos de ejercicio y sus campos: ver wikiaula.js (check). */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
WA.GEN = WA.GEN || {};
WA.def = (id, fn) => { WA.GEN[id] = fn; };

// ── Aritmética ─────────────────────────────────────────────────────────
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const isPrime = n => { if (n < 2 || !Number.isInteger(n)) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
const factorize = n => { const f = {}; let m = n; for (let p = 2; p * p <= m; p++) while (m % p === 0) { f[p] = (f[p] || 0) + 1; m /= p; } if (m > 1) f[m] = (f[m] || 0) + 1; return f; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => a / gcd(a, b) * b;
const digitSum = n => String(Math.abs(n)).split("").reduce((s, d) => s + +d, 0);
const divisors = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
const factorsHtml = (f, H) => Object.keys(f).map(Number).sort((a, b) => a - b).map(p => f[p] > 1 ? H.pow(p, f[p]) : String(p)).join(" " + H.mul + " ");

// Fracciones exactas: [n, d] con d > 0, irreducibles
const F = {
  make(n, d) { if (!d) throw new Error("d=0"); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; },
  add: (a, b) => F.make(a[0] * b[1] + b[0] * a[1], a[1] * b[1]),
  sub: (a, b) => F.make(a[0] * b[1] - b[0] * a[1], a[1] * b[1]),
  mul: (a, b) => F.make(a[0] * b[0], a[1] * b[1]),
  div: (a, b) => F.make(a[0] * b[1], a[1] * b[0]),
  eq: (a, b) => a[0] * b[1] === b[0] * a[1],
  num: a => a[0] / a[1],
  // HTML: −3/4 · 5 · 2 1/3 (mixed = número mixto)
  html(a, H, mixed) {
    const [n, d] = a, s = n < 0 ? "−" : "", m = Math.abs(n);
    if (d === 1) return s + H.n(m);
    if (mixed && m > d) return s + H.n(Math.floor(m / d)) + " " + H.frac(m % d, d);
    return s + H.frac(m, d);
  },
  text: a => a[1] === 1 ? String(a[0]) : `${a[0]}/${a[1]}`,
};

// Polinomios: coeficientes de mayor a menor grado → "3x² − 2x + 1"
const sup = n => String(n).split("").map(c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c] || c).join("");
function polyHtml(cs, v = "x", opts = {}) {
  const deg = cs.length - 1, parts = [];
  cs.forEach((c, i) => {
    if (!c) return;
    const e = deg - i, a = Math.abs(c);
    const coef = e === 0 ? String(a) : a === 1 ? "" : String(a);
    const term = coef + (e === 0 ? "" : e === 1 ? v : opts.html ? `${v}<sup>${e}</sup>` : v + sup(e));
    parts.push((c < 0 ? (parts.length ? " − " : "−") : parts.length ? " + " : "") + term);
  });
  return parts.length ? parts.join("") : "0";
}
function polyText(cs, v = "x") {   // para el campo ans de un ejercicio "expr"
  const deg = cs.length - 1, parts = [];
  cs.forEach((c, i) => { if (c) parts.push(`${c < 0 ? "-" : "+"}${Math.abs(c)}${deg - i ? `*${v}^${deg - i}` : ""}`); });
  return parts.length ? parts.join("").replace(/^\+/, "") : "0";
}
// Signo para encadenar términos: sgn(3) = " + 3", sgn(−3) = " − 3"
const sgn = (n, show) => (n < 0 ? " − " : " + ") + (show ? show(Math.abs(n)) : Math.abs(n));
// Entre paréntesis si es negativo: (−3)
const par = (n, show) => n < 0 ? `(−${show ? show(-n) : -n})` : (show ? show(n) : String(n));
// Entero no nulo
const rnz = (R, lo, hi) => { let x; do x = R.int(lo, hi); while (!x); return x; };
// Términos para expresiones de una variable: term(−3, "x") → " − 3x"; lin(2, −5) → "2x − 5"
function term(c, v, first) {
  if (!c) return "";
  const a = Math.abs(c), body = v ? (a === 1 ? v : a + v) : String(a);
  return first ? (c < 0 ? "−" : "") + body : (c < 0 ? " − " : " + ") + body;
}
function lin(a, b, v = "x") {
  const s = term(a, v, true);
  const t = term(b, "", !s);
  return (s + t) || "0";
}

// Importe sin el símbolo, en cualquier moneda con céntimos (euros, dólares): 6,10 · 12 · 1250,50 (en: 6.10 ·
// 1,250.50) → siempre dos decimales, salvo si es una cantidad entera (always = true: también 12,00).
// Con el símbolo de la moneda del idioma (L.money): H.money(x, always) → «6,10 €» · «$6.10»
function eur(x, H, always) {
  const c = Math.round(Math.abs(x) * 100), e = Math.floor(c / 100), ct = c % 100;
  const sep = H.dec(1.5).replace(/[0-9]/g, "") || ",";
  return (x < 0 && c ? "−" : "") + H.n(e) + (ct || always ? sep + String(ct).padStart(2, "0") : "");
}
// Plural sencillo: pl(1, "caja", "cajas") → "1 caja"; pl(3, …) → "3 cajas"
const pl = (n, one, many, show) => `${show ? show(n) : n} ${Math.abs(n) === 1 ? one : many}`;

WA.MATH = { PRIMES, isPrime, factorize, gcd, lcm, digitSum, divisors, factorsHtml, F, polyHtml, polyText, sup, sgn, par, rnz, term, lin, eur, pl };

// ── Dibujos (SVG en línea, colores fijos que se leen en claro y oscuro) ──
const C = { blue: "#3366cc", green: "#14866d", amber: "#edab00", red: "#d73333", grey: "#a2a9b1", dark: "#202122", light: "#eaf3ff", purple: "#6b4ba1" };
const svg = (w, h, body, label) => `<svg class="wa-svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"${label ? ` aria-label="${label}"` : ""} style="background:#fff;border-radius:4px;max-width:100%">${body}</svg>`;
const txt = (x, y, s, size = 14, fill = C.dark, anchor = "middle", weight = "normal") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" font-family="sans-serif">${s}</text>`;
const SVG = {
  C, svg, txt,
  // n puntos (o figuras) en filas de "per": para contar, sumar, repartir
  dots(n, opts = {}) {
    const per = opts.per || 10, r = opts.r || 9, gap = r * 2 + 6, rows = Math.ceil(n / per) || 1;
    const shape = opts.shape || "circle", col = opts.color || C.blue;
    let b = "";
    for (let i = 0; i < n; i++) {
      const x = 8 + r + (i % per) * gap + (opts.split && i % per >= 5 ? 8 : 0), y = 8 + r + Math.floor(i / per) * gap;
      const c = (opts.colors && opts.colors[i]) || col;
      b += shape === "square" ? `<rect x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" rx="3" fill="${c}"/>`
        : shape === "star" ? `<path d="${star(x, y, r)}" fill="${c}"/>` : `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
    }
    return svg(16 + Math.min(n, per) * gap + (opts.split && per > 5 ? 8 : 0), 16 + rows * gap - 6, b, opts.label);
  },
  // Bloques de base 10: centenas (placas), decenas (barras), unidades (cubitos)
  base10(c, d, u) {
    let b = "", x = 8;
    for (let i = 0; i < c; i++) { b += `<rect x="${x}" y="8" width="60" height="60" fill="${C.light}" stroke="${C.blue}" stroke-width="1.5"/>`; for (let k = 1; k < 10; k++) b += `<line x1="${x + k * 6}" y1="8" x2="${x + k * 6}" y2="68" stroke="${C.blue}" stroke-width=".4"/><line x1="${x}" y1="${8 + k * 6}" x2="${x + 60}" y2="${8 + k * 6}" stroke="${C.blue}" stroke-width=".4"/>`; x += 68; }
    for (let i = 0; i < d; i++) { b += `<rect x="${x}" y="8" width="7" height="60" fill="#d5fdf4" stroke="${C.green}" stroke-width="1.2"/>`; for (let k = 1; k < 10; k++) b += `<line x1="${x}" y1="${8 + k * 6}" x2="${x + 7}" y2="${8 + k * 6}" stroke="${C.green}" stroke-width=".4"/>`; x += 11; }
    if (d) x += 4;
    for (let i = 0; i < u; i++) b += `<rect x="${x + (i % 2) * 10}" y="${60 - Math.floor(i / 2) * 10}" width="8" height="8" fill="#fef6e7" stroke="${C.amber}" stroke-width="1.2"/>`;
    return svg(x + (u ? 26 : 4), 76, b);
  },
  // Reloj de agujas
  clock(h, m, size = 130) {
    const R = size / 2 - 6, cx = size / 2, cy = size / 2;
    let b = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${C.dark}" stroke-width="3"/>`;
    for (let i = 0; i < 60; i++) { const a = i * Math.PI / 30, l = i % 5 ? 4 : 9; b += `<line x1="${cx + (R - l) * Math.sin(a)}" y1="${cy - (R - l) * Math.cos(a)}" x2="${cx + (R - 1) * Math.sin(a)}" y2="${cy - (R - 1) * Math.cos(a)}" stroke="${C.dark}" stroke-width="${i % 5 ? 1 : 2}"/>`; }
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6; b += txt(cx + (R - 20) * Math.sin(a), cy - (R - 20) * Math.cos(a) + 5, i, size / 10, C.dark); }
    const ah = ((h % 12) + m / 60) * Math.PI / 6, am = m * Math.PI / 30;
    b += `<line x1="${cx}" y1="${cy}" x2="${cx + R * 0.5 * Math.sin(ah)}" y2="${cy - R * 0.5 * Math.cos(ah)}" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/>`;
    b += `<line x1="${cx}" y1="${cy}" x2="${cx + R * 0.8 * Math.sin(am)}" y2="${cy - R * 0.8 * Math.cos(am)}" stroke="${C.blue}" stroke-width="3" stroke-linecap="round"/>`;
    b += `<circle cx="${cx}" cy="${cy}" r="4" fill="${C.dark}"/>`;
    return svg(size, size, b);
  },
  // Fracción como barra o como tarta (n partes coloreadas de d)
  fracBar(n, d, w = 240) {
    let b = "";
    const pw = w / d;
    for (let i = 0; i < d; i++) b += `<rect x="${6 + i * pw}" y="6" width="${pw}" height="34" fill="${i < n ? C.blue : "#fff"}" stroke="${C.dark}" stroke-width="1.5"/>`;
    return svg(w + 12, 46, b);
  },
  fracPie(n, d, size = 110) {
    const r = size / 2 - 6, cx = size / 2, cy = size / 2;
    let b = "";
    if (d === 1) b = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${n ? C.blue : "#fff"}" stroke="${C.dark}" stroke-width="1.5"/>`;
    else for (let i = 0; i < d; i++) {
      const a0 = i / d * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / d * 2 * Math.PI - Math.PI / 2;
      b += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${1 / d > 0.5 ? 1 : 0},1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${i < n ? C.blue : "#fff"}" stroke="${C.dark}" stroke-width="1.5"/>`;
    }
    return svg(size, size, b);
  },
  // Recta numérica de min a max con marcas cada "step"; marks = [{x, label, color}]
  numberLine(min, max, step, marks = [], opts = {}) {
    const w = opts.w || 460, pad = 24, sc = (w - 2 * pad) / (max - min), X = v => pad + (v - min) * sc;
    let b = `<line x1="${pad - 10}" y1="40" x2="${w - pad + 10}" y2="40" stroke="${C.dark}" stroke-width="2"/>`;
    for (let v = min, k = 0; v <= max + 1e-9 && k < 200; v += step, k++) {
      const vv = +v.toFixed(6);
      b += `<line x1="${X(vv)}" y1="33" x2="${X(vv)}" y2="47" stroke="${C.dark}" stroke-width="1.5"/>`;
      if (!opts.noLabels && (opts.labelEvery ? k % opts.labelEvery === 0 : true)) b += txt(X(vv), 66, opts.fmt ? opts.fmt(vv) : String(vv).replace("-", "−").replace(".", WA.H.ds), 13);
    }
    marks.forEach(m => {
      b += `<circle cx="${X(m.x)}" cy="40" r="7" fill="${m.color || C.red}"/>`;
      if (m.label) b += txt(X(m.x), 22, m.label, 14, m.color || C.red, "middle", "bold");
    });
    return svg(w, 76, b);
  },
  // Monedas y billetes (céntimos) de la moneda del idioma (L.money.code, ver MOTOR.md): euros o dólares
  money(cents) {
    if (WA.H && WA.H.moneyCfg && WA.H.moneyCfg.code === "USD") return moneyUSD(cents);
    const kinds = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    let b = "", x = 8, rest = cents;
    for (const k of kinds) {
      while (rest >= k && x < 600) {
        rest -= k;
        // billetes con su color real: 5 € gris, 10 € rojo, 20 € azul, 50 € naranja
        if (k >= 500) { b += `<rect x="${x}" y="10" width="70" height="40" rx="4" fill="${{ 500: "#d3d6db", 1000: "#f4b6ad", 2000: "#b5d0f2", 5000: "#f8c48a" }[k]}" stroke="${C.dark}"/>` + txt(x + 35, 36, `${k / 100} €`, 15, C.dark, "middle", "bold"); x += 76; }
        else if (k >= 100) {   // bicolores: 1 € = corona dorada y centro plateado; 2 € = corona plateada y centro dorado
          const r = k === 200 ? 22 : 20, gold = "#e9c44c", silver = "#d5d9df", out = k === 200 ? silver : gold, inn = k === 200 ? gold : silver;
          b += `<circle cx="${x + r}" cy="30" r="${r}" fill="${out}" stroke="${C.dark}"/><circle cx="${x + r}" cy="30" r="${r * 0.66}" fill="${inn}" stroke="#8a8f96" stroke-width=".8"/>` + txt(x + r, 35, `${k / 100}€`, 12, C.dark, "middle", "bold");
          x += 2 * r + 6;
        }
        else { const r = k >= 10 ? 18 : 15, fill = k >= 10 ? "#f0c75e" : "#d39a63"; b += `<circle cx="${x + r}" cy="30" r="${r}" fill="${fill}" stroke="${C.dark}"/>` + txt(x + r, 35, `${k}c`, 11, C.dark, "middle", "bold"); x += 2 * r + 6; }
      }
    }
    return svg(x + 4, 60, b);
  },
  // Figura plana centrada en (x, y) de "radio" r: circle, square, rect, triangle, star, diamond, pentagon, hexagon, heart
  shape(k, x, y, r, fill = C.blue, stroke = C.dark) {
    const P = pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
    const reg = (n, rot = -Math.PI / 2) => P(Array.from({ length: n }, (_, i) => [x + r * Math.cos(rot + i * 2 * Math.PI / n), y + r * Math.sin(rot + i * 2 * Math.PI / n)]));
    switch (k) {
      case "circle": return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
      case "square": return `<rect x="${x - r * 0.85}" y="${y - r * 0.85}" width="${r * 1.7}" height="${r * 1.7}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
      case "rect": return `<rect x="${x - r * 1.2}" y="${y - r * 0.65}" width="${r * 2.4}" height="${r * 1.3}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
      case "triangle": return P([[x, y - r], [x + r * 0.95, y + r * 0.75], [x - r * 0.95, y + r * 0.75]]);
      case "star": return `<path d="${star(x, y, r)}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
      case "diamond": return P([[x, y - r], [x + r * 0.7, y], [x, y + r], [x - r * 0.7, y]]);
      case "pentagon": return reg(5);
      case "hexagon": return reg(6, 0);
      case "heart": return `<path d="M${x},${y + r * 0.8} C${x - r * 1.4},${y - r * 0.1} ${x - r * 0.6},${y - r * 1.1} ${x},${y - r * 0.35} C${x + r * 0.6},${y - r * 1.1} ${x + r * 1.4},${y - r * 0.1} ${x},${y + r * 0.8}Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
      // Frutas (para pictogramas): colores propios, no usan "fill"
      case "apple": case "orange": case "pear": case "banana": return fruit(k, x, y, r, stroke);
    }
    return "";
  },
  // Fila de figuras: items = [{k, c}] (k = figura, c = color; null = hueco con «?»)
  row(items, r = 16) {
    const gap = r * 2 + 10;
    const b = items.map((it, i) => it ? SVG.shape(it.k, 8 + r + i * gap, 8 + r, r, it.c) : `<rect x="${8 + i * gap}" y="8" width="${2 * r}" height="${2 * r}" rx="5" fill="#fff" stroke="${C.grey}" stroke-dasharray="4 3" stroke-width="2"/>` + txt(8 + r + i * gap, 8 + r + 6, "?", 18, C.grey, "middle", "bold")).join("");
    return svg(16 + items.length * gap - 10, 16 + 2 * r, b);
  },
  icon: (k, c, r = 14) => svg(2 * r + 8, 2 * r + 8, SVG.shape(k, r + 4, r + 4, r, c)),
  // Cuerpos geométricos: cube, sphere, cylinder, cone, pyramid, prism
  solid(k, size = 110) {
    const s = size, f = "#cfe0ff", f2 = "#a9c6f5", st = `stroke="${C.dark}" stroke-width="1.8"`;
    let b = "";
    if (k === "cube") b = `<polygon points="20,40 70,40 70,90 20,90" fill="${f}" ${st}/><polygon points="20,40 40,22 90,22 70,40" fill="#e8f0fd" ${st}/><polygon points="70,40 90,22 90,72 70,90" fill="${f2}" ${st}/>`;
    else if (k === "sphere") b = `<circle cx="55" cy="55" r="38" fill="${f}" ${st}/><ellipse cx="55" cy="55" rx="38" ry="11" fill="none" stroke="${C.dark}" stroke-width="1" stroke-dasharray="4 3"/><circle cx="42" cy="40" r="8" fill="#fff" opacity=".6"/>`;
    else if (k === "cylinder") b = `<path d="M25,28 L25,85 A30,9 0 0,0 85,85 L85,28" fill="${f}" ${st}/><ellipse cx="55" cy="28" rx="30" ry="9" fill="#e8f0fd" ${st}/>`;
    else if (k === "cone") b = `<path d="M55,15 L25,85 A30,9 0 0,0 85,85 Z" fill="${f}" ${st}/>`;
    else if (k === "pyramid") b = `<polygon points="55,15 20,80 60,95" fill="${f}" ${st}/><polygon points="55,15 60,95 92,78" fill="${f2}" ${st}/>`;
    else if (k === "prism") b = `<polygon points="15,45 75,45 75,92 15,92" fill="${f}" ${st}/><polygon points="15,45 35,25 95,25 75,45" fill="#e8f0fd" ${st}/><polygon points="75,45 95,25 95,72 75,92" fill="${f2}" ${st}/>`;
    return svg(s, s, `<g transform="scale(${s / 110})">${b}</g>`);
  },
  // Pictograma: rows = [{label, n, k, c}]; cada figura vale "each"
  picto(rows, each = 1) {
    const r = 11, lw = 96;
    let b = "";
    rows.forEach((row, i) => {
      const y = 10 + i * 34;
      b += txt(lw - 8, y + 17, row.label, 14, C.dark, "end");
      for (let j = 0; j < row.n; j++) b += SVG.shape(row.k || "circle", lw + 6 + r + j * (2 * r + 6), y + r + 2, r, row.c || C.blue);
    });
    const maxn = Math.max(...rows.map(x => x.n));
    return svg(lw + 16 + maxn * (2 * r + 6), 14 + rows.length * 34, b + (each > 1 ? "" : ""));
  },
  // Gráfico de barras vertical: data = [{label, v, c}], escala hasta max con líneas cada step
  bars(data, max, step = 1) {
    const h = 150, bw = 34, gap = 22, x0 = 36, y0 = 14 + h, sc = h / max;
    let b = "";
    for (let v = 0; v <= max + 1e-9; v += step) b += `<line x1="${x0 - 4}" y1="${y0 - v * sc}" x2="${x0 + data.length * (bw + gap)}" y2="${y0 - v * sc}" stroke="#e3e6ea" stroke-width="1"/>` + txt(x0 - 8, y0 - v * sc + 4, v, 11, C.dark, "end");
    data.forEach((d, i) => {
      const x = x0 + gap / 2 + i * (bw + gap);
      b += `<rect x="${x}" y="${y0 - d.v * sc}" width="${bw}" height="${d.v * sc}" fill="${d.c || C.blue}"/>` + txt(x + bw / 2, y0 + 16, d.label, 12);
    });
    b += `<line x1="${x0}" y1="${y0}" x2="${x0 + data.length * (bw + gap)}" y2="${y0}" stroke="${C.dark}" stroke-width="1.5"/><line x1="${x0}" y1="14" x2="${x0}" y2="${y0}" stroke="${C.dark}" stroke-width="1.5"/>`;
    return svg(x0 + data.length * (bw + gap) + 10, y0 + 26, b);
  },
  // Barra de "len" unidades sobre una regla (cm); start = dónde empieza la barra
  ruler(len, start = 0, total = 15, color = C.amber) {
    const u = 28, x0 = 14;
    let b = `<rect x="${x0 + start * u}" y="10" width="${len * u}" height="18" rx="4" fill="${color}" stroke="${C.dark}" stroke-width="1.2"/>`;
    b += `<rect x="${x0 - 6}" y="36" width="${total * u + 12}" height="34" fill="#fdf6d8" stroke="${C.dark}" stroke-width="1.2"/>`;
    for (let i = 0; i <= total; i++) b += `<line x1="${x0 + i * u}" y1="36" x2="${x0 + i * u}" y2="${i % 5 ? 46 : 50}" stroke="${C.dark}" stroke-width="1.2"/>` + txt(x0 + i * u, 64, i, 11);
    return svg(total * u + 28, 76, b);
  },
};
// Frutas reconocibles: manzana roja con rabito y hoja, naranja redonda, pera verde, plátano amarillo
function fruit(k, x, y, r, stroke) {
  const p = (dx, dy) => `${(x + dx * r).toFixed(1)},${(y + dy * r).toFixed(1)}`;
  const st = `stroke="${stroke}" stroke-width="1.1"`;
  const stem = (x0, y0, x1, y1) => `<path d="M${p(x0, y0)} Q${p((x0 + x1) / 2 - 0.05, (y0 + y1) / 2)} ${p(x1, y1)}" fill="none" stroke="#7a4a21" stroke-width="${Math.max(1.5, r * 0.14).toFixed(1)}" stroke-linecap="round"/>`;
  const leaf = (cx, cy, rot) => `<ellipse cx="${(x + cx * r).toFixed(1)}" cy="${(y + cy * r).toFixed(1)}" rx="${(r * 0.32).toFixed(1)}" ry="${(r * 0.15).toFixed(1)}" fill="#2e9e4f" transform="rotate(${rot} ${(x + cx * r).toFixed(1)} ${(y + cy * r).toFixed(1)})"/>`;
  if (k === "apple") return `<path d="M${p(0, -0.55)} C${p(-0.35, -0.95)} ${p(-1, -0.75)} ${p(-0.95, 0)} C${p(-0.9, 0.7)} ${p(-0.35, 1)} ${p(0, 0.82)} C${p(0.35, 1)} ${p(0.9, 0.7)} ${p(0.95, 0)} C${p(1, -0.75)} ${p(0.35, -0.95)} ${p(0, -0.55)}Z" fill="#d93a2b" ${st}/>`
    + stem(0, -0.55, 0.12, -1) + leaf(0.42, -0.85, -25);
  if (k === "orange") return `<circle cx="${x}" cy="${(y + r * 0.08).toFixed(1)}" r="${(r * 0.9).toFixed(1)}" fill="#f5901e" ${st}/>`
    + `<circle cx="${x}" cy="${(y - r * 0.72).toFixed(1)}" r="${(r * 0.1).toFixed(1)}" fill="#6b8e23"/>` + leaf(0.3, -0.92, -20);
  if (k === "pear") return `<path d="M${p(0, -0.78)} C${p(0.32, -0.78)} ${p(0.34, -0.3)} ${p(0.55, -0.02)} C${p(0.98, 0.45)} ${p(0.72, 0.98)} ${p(0, 0.98)} C${p(-0.72, 0.98)} ${p(-0.98, 0.45)} ${p(-0.55, -0.02)} C${p(-0.34, -0.3)} ${p(-0.32, -0.78)} ${p(0, -0.78)}Z" fill="#a9c83a" ${st}/>`
    + stem(0, -0.76, 0.1, -1.08) + leaf(0.38, -0.92, -30);
  // plátano: media luna amarilla con las puntas marrones
  return `<path d="M${p(-0.95, -0.45)} C${p(-0.85, 0.55)} ${p(0.2, 1.02)} ${p(0.98, 0.25)} C${p(0.35, 0.6)} ${p(-0.4, 0.35)} ${p(-0.62, -0.62)}Z" fill="#f7d23e" ${st} stroke-linejoin="round"/>`
    + `<circle cx="${(x - r * 0.8).toFixed(1)}" cy="${(y - r * 0.56).toFixed(1)}" r="${(r * 0.13).toFixed(1)}" fill="#6b4a1f"/><circle cx="${(x + r * 0.95).toFixed(1)}" cy="${(y + r * 0.26).toFixed(1)}" r="${(r * 0.09).toFixed(1)}" fill="#6b4a1f"/>`;
}
// Dólares de EE. UU. (céntimos): billetes de $1 a $100 verdes, con el valor y el óvalo del retrato; monedas
// de 1¢ (cobre), 5¢, 10¢ y 25¢ (plateadas), con su tamaño relativo real (la de 10¢ es la más pequeña)
function moneyUSD(cents) {
  const kinds = [10000, 5000, 2000, 1000, 500, 100, 25, 10, 5, 1], R0 = { 25: 19, 5: 16.5, 1: 15, 10: 14 };
  let b = "", x = 8, rest = cents;
  for (const k of kinds) {
    while (rest >= k && x < 600) {
      rest -= k;
      if (k >= 100) {
        b += `<rect x="${x}" y="10" width="74" height="40" rx="3" fill="#dfe9d3" stroke="#3f6b35"/><rect x="${x + 3}" y="13" width="68" height="34" rx="2" fill="none" stroke="#7fa36f" stroke-width=".8"/>`
          + `<ellipse cx="${x + 56}" cy="30" rx="9" ry="12" fill="#c9dbb8" stroke="#6f9a5f" stroke-width=".8"/>` + txt(x + 24, 36, `$${k / 100}`, 15, "#1f3d1a", "middle", "bold");
        x += 80;
      } else {
        const r = R0[k], fill = k === 1 ? "#d39a63" : "#d5d9df";
        b += `<circle cx="${x + r}" cy="30" r="${r}" fill="${fill}" stroke="${C.dark}"/><circle cx="${x + r}" cy="30" r="${r - 2.5}" fill="none" stroke="#8a8f96" stroke-width=".6"/>` + txt(x + r, 34, `${k}¢`, k === 25 ? 12 : 11, C.dark, "middle", "bold");
        x += 2 * r + 6;
      }
    }
  }
  return svg(x + 4, 60, b);
}
function star(x, y, r) {
  let d = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + "," + (y + rr * Math.sin(a)).toFixed(1); }
  return d + "Z";
}
WA.SVG = SVG;

// ── Bancos de clasificación (Ciencias y otras asignaturas sin cálculo) ──
// Un banco (en los textos del idioma) es { q: x => enunciado, cats: [nombres de
// las categorías], why: [explicación de cada categoría], items: [[cosa, categoría,
// explicación propia opcional], …], find: [enunciado «¿Cuál de estos…?» de cada
// categoría, o null] }.
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bankSol = (b, it) => `${cap(it[0])}: <b>${b.cats[it[1]]}</b>. ${it[2] || (b.why ? b.why[it[1]] : "")}`;
WA.BANK = {
  // ¿A qué categoría pertenece esta cosa?
  classify(b, R) {
    const it = R.pick(b.items);
    return { q: b.q(it[0]), kind: "choice", opts: b.cats.slice(), correct: it[1], shuffle: false, sol: bankSol(b, it) };
  },
  // ¿Cuál de estas cosas es de tal categoría? (una buena y tres de otras)
  findOne(b, R) {
    const cs = (b.find || []).map((f, i) => (f ? i : -1)).filter(i => i >= 0);
    const c = R.pick(cs);
    const good = R.pick(b.items.filter(x => x[1] === c));
    const seen = new Set([good[0]]), others = [];
    for (const x of R.shuffle(b.items.filter(x => x[1] !== c))) if (!seen.has(x[0]) && others.length < 3) { seen.add(x[0]); others.push(x); }
    const opts = R.shuffle([good, ...others]);
    return { q: b.find[c], kind: "choice", opts: opts.map(x => cap(x[0])), correct: opts.indexOf(good), shuffle: false, sol: bankSol(b, good) };
  },
  // Las dos a la vez, al azar
  mixed(b, R) { return (b.find && R.r() < 0.4) ? WA.BANK.findOne(b, R) : WA.BANK.classify(b, R); },
};
})();
