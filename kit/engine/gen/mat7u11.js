/* WikiAula — Matemáticas, Grado 7 · Unidad 11: Funciones y gráficas.
   Textos: i18n/<lang>/mat7u11.js (S.m7). WA.SVG.axes: ejes cartesianos. */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SV = WA.SVG, C = SV.C;
const { rnz, lin } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pp = n => n < 0 ? `(${neg(n)})` : String(n);

// Ejes cartesianos con cuadrícula: devuelve {svg(body), X, Y}
function axes(xmin, xmax, ymin, ymax, opts = {}) {
  const w = opts.w || 300, h = opts.h || 260, pad = 26;
  const sx = (w - 2 * pad) / (xmax - xmin), sy = (h - 2 * pad) / (ymax - ymin);
  const X = v => +(pad + (v - xmin) * sx).toFixed(1), Y = v => +(h - pad - (v - ymin) * sy).toFixed(1);
  const sx1 = opts.stepX || 1, sy1 = opts.stepY || 1;
  let g = "";
  for (let v = xmin; v <= xmax; v += sx1) g += `<line x1="${X(v)}" y1="${Y(ymin)}" x2="${X(v)}" y2="${Y(ymax)}" stroke="#e3e6ea" stroke-width="1"/>`;
  for (let v = ymin; v <= ymax; v += sy1) g += `<line x1="${X(xmin)}" y1="${Y(v)}" x2="${X(xmax)}" y2="${Y(v)}" stroke="#e3e6ea" stroke-width="1"/>`;
  const x0 = xmin <= 0 && xmax >= 0 ? 0 : xmin, y0 = ymin <= 0 && ymax >= 0 ? 0 : ymin;
  g += `<line x1="${X(xmin)}" y1="${Y(y0)}" x2="${X(xmax) + 8}" y2="${Y(y0)}" stroke="${C.dark}" stroke-width="1.6"/><line x1="${X(x0)}" y1="${Y(ymin)}" x2="${X(x0)}" y2="${Y(ymax) - 8}" stroke="${C.dark}" stroke-width="1.6"/>`;
  const lx = opts.labelX || sx1, ly = opts.labelY || sy1;
  for (let v = xmin; v <= xmax; v += lx) if (v !== x0 || x0 === xmin) g += SV.txt(X(v), Y(y0) + 15, neg(v), 10, "#54595d");
  for (let v = ymin; v <= ymax; v += ly) if (v !== y0) g += SV.txt(X(x0) - 5, Y(v) + 4, neg(v), 10, "#54595d", "end");
  if (opts.nameX) g += SV.txt(X(xmax), Y(y0) - 6, opts.nameX, 11, C.dark, "end");
  if (opts.nameY) g += SV.txt(X(x0) + 6, Y(ymax) - 2, opts.nameY, 11, C.dark, "start");
  return { X, Y, svg: body => SV.svg(w, h, g + body) };
}
SV.axes = axes;
const dot = (x, y, col = C.red, lab) => `<circle cx="${x}" cy="${y}" r="5" fill="${col}" stroke="${C.dark}" stroke-width="1"/>` + (lab ? SV.txt(x + 8, y - 8, lab, 13, col, "start", "bold") : "");
const table = (xs, ys, hole) => `<table style="border-collapse:collapse;margin:6px 0"><tr><th style="border:1px solid #a2a9b1;padding:4px 8px">x</th>${xs.map(x => `<td style="border:1px solid #a2a9b1;padding:4px 10px;text-align:center">${neg(x)}</td>`).join("")}</tr><tr><th style="border:1px solid #a2a9b1;padding:4px 8px">y</th>${ys.map((y, i) => `<td style="border:1px solid #a2a9b1;padding:4px 10px;text-align:center">${i === hole ? '<span class="wa-hole">□</span>' : neg(y)}</td>`).join("")}</tr></table>`;

def("m7.fn.coordenadas", (R, S, H) => {
  const x = R.int(-5, 5), y = R.int(-5, 5);
  if (!x && !y) return null;
  const A = axes(-6, 6, -6, 6, { w: 260, h: 260, labelX: 2, labelY: 2 });
  return { q: S.m7.fn_coord_q + "<br>" + A.svg(dot(A.X(x), A.Y(y), C.red, "P")), kind: "fields",
    fields: [{ label: S.m7.fn_coord_f[0], ans: x }, { label: S.m7.fn_coord_f[1], ans: y }], sol: S.m7.fn_coord_s(neg(x), neg(y)) };
});
def("m7.fn.cuadrante", (R, S, H) => {
  const axis = R.r() < 0.15;
  const x = axis && R.r() < 0.5 ? 0 : rnz(R, -9, 9), y = axis && x !== 0 ? 0 : rnz(R, -9, 9);
  const k = !x || !y ? 4 : x > 0 ? (y > 0 ? 0 : 3) : (y > 0 ? 1 : 2);
  return { q: S.m7.fn_cuad_q(`(${neg(x)}, ${neg(y)})`), kind: "choice", opts: S.m7.fn_cuads, correct: k, shuffle: false,
    sol: S.m7.fn_cuad_s(x, y, k) };
});
def("m7.fn.imagen", (R, S, H) => {
  const a = rnz(R, -6, 6), b = R.int(-10, 10), k = R.int(-6, 6), r = a * k + b;
  const e = `${a === 1 ? "" : a === -1 ? "−" : neg(a) + " · "}${pp(k)}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;
  return { q: S.m7.fn_img_q(lin(a, b), neg(k)), kind: "int", ans: r, sol: S.m7.fn_img_s(e, neg(r)) };
});
def("m7.fn.tabla", (R, S, H) => {
  const a = rnz(R, -5, 5), b = R.int(-8, 8), xs = [-2, -1, 0, 1, 2, 3].slice(R.int(0, 1)).slice(0, 5), ys = xs.map(x => a * x + b);
  const hole = R.int(0, xs.length - 1), x = xs[hole];
  const e = `${a === 1 ? "" : a === -1 ? "−" : neg(a) + " · "}${pp(x)}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;
  return { q: S.m7.fn_tabla_q(lin(a, b), table(xs, ys, hole)), kind: "int", ans: ys[hole], sol: S.m7.fn_img_s(e, neg(ys[hole])) };
});
def("m7.fn.formula", (R, S, H) => {
  const a = rnz(R, -5, 5), b = R.int(-6, 6), xs = [0, 1, 2, 3], ys = xs.map(x => a * x + b);
  const ok = lin(a, b);
  const cand = [lin(a, -b || 2), lin(b || 1, a), lin(a + 1, b), lin(-a, b), lin(a, b + 1)].filter((f, i, arr) => f !== ok && arr.indexOf(f) === i);
  const opts = R.shuffle([ok, ...R.shuffle(cand).slice(0, 3)]);
  return { q: S.m7.fn_form_q(table(xs, ys, -1)), kind: "choice", opts: opts.map(f => "y = " + f), correct: opts.indexOf(ok), sol: S.m7.fn_form_s(ok, neg(a), neg(b), lin(a, 0), neg(a * 2 + b)) };
});
def("m7.fn.grafica", (R, S, H) => {
  let a, b;
  do { a = R.pick([-2, -1, 1, 2, 0.5, -0.5, 3]); b = R.int(-3, 3); } while (Math.abs(a * 4 + b) > 6 || Math.abs(-a * 4 + b) > 6);
  const xs = [-4, -2, 0, 2, 4].filter(x => Number.isInteger(a * x + b) && Math.abs(a * x + b) <= 6), k = R.pick(xs);
  const A = axes(-5, 5, -7, 7, { w: 260, h: 300, labelY: 2 });
  const body = `<line x1="${A.X(-5)}" y1="${A.Y(a * -5 + b)}" x2="${A.X(5)}" y2="${A.Y(a * 5 + b)}" stroke="${C.blue}" stroke-width="2.5"/>`;
  return { q: S.m7.fn_graf_q(neg(k)) + "<br>" + A.svg(body), kind: "int", ans: a * k + b, sol: S.m7.fn_graf_s(neg(k), a * k + b, neg(a * k + b)) };
});
def("m7.fn.esfuncion", (R, S, H) => {
  const [s, ok, why] = R.pick(S.m7.fn_es);
  return { q: S.m7.fn_es_q(s), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: ok ? 0 : 1, shuffle: false, sol: S.m7.fn_es_s(ok, why) };
});
def("m7.fn.interpretar", (R, S, H) => {
  // Paseo: tramos de 5 min; distancia en múltiplos de 100 m; al final vuelve a casa
  const n = R.int(4, 6), pts = [[0, 0]];
  let d = 0, stop = 0;
  for (let i = 1; i < n; i++) {
    const t = i * 5, k = R.r();
    if (k < 0.3 && i > 1) stop += 5; else d = Math.min(800, d + R.int(1, 4) * 100);
    pts.push([t, d]);
  }
  pts.push([n * 5 + R.pick([5, 10]), 0]);
  stop = 0;
  for (let i = 1; i < pts.length; i++) if (pts[i][1] === pts[i - 1][1]) stop += pts[i][0] - pts[i - 1][0];
  const tMax = pts[pts.length - 1][0], dMax = Math.max(...pts.map(p => p[1]));
  if (!dMax) return null;
  const A = axes(0, tMax, 0, 800, { w: 320, h: 240, stepX: 5, stepY: 100, labelY: 200, nameX: S.m7.fn_ejes[0], nameY: S.m7.fn_ejes[1] });
  const body = `<polyline points="${pts.map(p => `${A.X(p[0])},${A.Y(p[1])}`).join(" ")}" fill="none" stroke="${C.blue}" stroke-width="2.5"/>` + pts.map(p => `<circle cx="${A.X(p[0])}" cy="${A.Y(p[1])}" r="3" fill="${C.blue}"/>`).join("");
  const k = R.int(0, 2), pic = A.svg(body);
  // Tramos horizontales (paradas), para decir en la solución cuáles son
  const stops = []; for (let i = 1; i < pts.length; i++) if (pts[i][1] === pts[i - 1][1]) stops.push([pts[i - 1][0], pts[i][0]]);
  if (k === 0) return { q: S.m7.fn_int_q[0]() + "<br>" + pic, kind: "int", ans: stop, sol: S.m7.fn_int_s[0](stop, stops) };
  if (k === 1) return { q: S.m7.fn_int_q[1]() + "<br>" + pic, kind: "int", ans: dMax, sol: S.m7.fn_int_s[1](dMax) };
  const p = R.pick(pts.slice(1, -1));
  return { q: S.m7.fn_int_q[2](p[0]) + "<br>" + pic, kind: "int", ans: p[1], sol: S.m7.fn_int_s[2](p[0], p[1]) };
});

// La temperatura de un día (Ejemplos 2 y 3 de «Interpretar gráficas»): creciente, decreciente, máximo, mínimo, variación
def("m7.fn.describir", (R, S, H) => {
  const hs = [0, 3, 6, 9, 12, 15, 18, 21, 24], iMin = R.pick([1, 2]), iMax = R.pick([4, 5, 6]);
  // Baja hasta el mínimo, sube hasta el máximo (sin pasar de 16) y baja sin llegar al mínimo: un solo mínimo y un solo máximo
  const v = [R.int(2, 6)], up = iMax - iMin === 2 ? 3 : 2;
  for (let i = 1; i < hs.length; i++) {
    const c = v[i - 1], rem = i <= iMax ? iMax - i + 1 : hs.length - i;
    if (i <= iMin) v.push(c - R.int(1, 3));
    else if (i <= iMax) v.push(c + R.int(up, Math.max(up, Math.min(5, Math.floor((16 - c) / rem)))));
    else v.push(c - R.int(1, Math.max(1, Math.min(4, Math.floor((c - v[iMin] - 1) / rem)))));
  }
  const A = axes(0, 24, -4, 16, { w: 340, h: 300, stepX: 3, stepY: 1, labelX: 3, labelY: 2, nameX: S.m7.fn_temp_ejes[0], nameY: S.m7.fn_temp_ejes[1] });
  const body = `<polyline points="${hs.map((h, i) => `${A.X(h)},${A.Y(v[i])}`).join(" ")}" fill="none" stroke="${C.red}" stroke-width="2.5"/>`
    + hs.map((h, i) => `<circle cx="${A.X(h)}" cy="${A.Y(v[i])}" r="3" fill="${C.red}"/>`).join("");
  const pic = A.svg(body), T = S.m7.fn_temp, hMin = hs[iMin], hMax = hs[iMax], m = v[iMin], M = v[iMax], k = R.int(0, 4);
  if (k === 0) return { q: T.q[0] + "<br>" + pic, kind: "int", ans: hMax, sol: T.s[0](hMax, M) };
  if (k === 1) return { q: T.q[1] + "<br>" + pic, kind: "int", ans: m, sol: T.s[1](hMin, neg(m)) };
  if (k === 2) return { q: T.q[2] + "<br>" + pic, kind: "fields", fields: [{ label: T.f[0], ans: hMin }, { label: T.f[1], ans: hMax }], sol: T.s[2](hMin, hMax, neg(m), M) };
  if (k === 3) return { q: T.q[3] + "<br>" + pic, kind: "int", ans: M - m, sol: T.s[3](M, neg(m), m, M - m) };
  const i = R.int(1, hs.length - 1);
  return { q: T.q[4](hs[i]) + "<br>" + pic, kind: "int", ans: v[i], sol: T.s[4](hs[i], neg(v[i])) };
});

// Las dos ideas nuevas de «Tablas y gráficas»: ¿pertenece un punto a la gráfica? ¿se unen los puntos?
def("m7.fn.pertenece", (R, S, H) => {
  const P = S.m7.fn_pert;
  if (R.r() < 0.6) {
    const a = rnz(R, -4, 5), b = R.int(-6, 6), x = R.int(-3, 4), y0 = a * x + b, yes = R.r() < 0.5, y = yes ? y0 : y0 + R.pick([-2, -1, 1, 2]);
    const e = `${a === 1 ? "" : a === -1 ? "−" : neg(a) + " · "}${pp(x)}${b ? (b < 0 ? " − " : " + ") + Math.abs(b) : ""}`;
    return { q: P.q(neg(x), neg(y), lin(a, b)), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: yes ? 0 : 1, shuffle: false,
      sol: P.s(neg(x), e, neg(y0), neg(y), yes) };
  }
  const [t, cont, why] = R.pick(P.sit);
  return { q: P.unir_q(t), kind: "choice", opts: P.unir_opts, correct: cont ? 0 : 1, shuffle: false, sol: P.unir_s(cont, why) };
});
})();
