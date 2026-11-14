/* WikiAula — Matemáticas, Grado 7 · Unidad 10: Perímetros y áreas.
   Textos: i18n/<lang>/mat7u10.js (S.m7). Figuras acotadas en SVG. */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SV = WA.SVG, C = SV.C;
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const piTol = v => Math.max(0.051, Math.abs(v) * 0.0015);   // vale con π ≈ 3,14 o con π exacto

const lbl = (x, y, s, col = C.dark, anchor = "middle") => SV.txt(x, y, s, 13, col, anchor, "bold");
const fig = (body, w = 260, h = 170) => SV.svg(w, h, body);
const poly = (pts, fill = C.light, stroke = C.blue) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const dash = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.red}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
const cm = (H, v) => `${H.dec(v)} cm`;

def("m7.ar.rectangulo", (R, S, H) => {
  const sq = R.r() < 0.3, b = R.int(3, 25), h = sq ? b : R.int(2, 18);
  // El dibujo conserva la forma: el cuadrado sale cuadrado (antes, 180 × 120) y el rectángulo, con sus proporciones
  // (si es muy alargado, se limita la altura entre 40 y 130 y se ajusta la base para no deformarlo de más).
  let W = 180, Hh = 180 * h / b;
  if (sq) { W = 120; Hh = 120; }
  else if (Hh > 130) { Hh = 130; W = Math.max(60, 130 * b / h); }
  else if (Hh < 40) Hh = 40;
  const body = poly([[70, 20], [70 + W, 20], [70 + W, 20 + Hh], [70, 20 + Hh]]) + lbl(70 + W / 2, 40 + Hh, cm(H, b)) + lbl(64, 25 + Hh / 2, cm(H, h), C.dark, "end");
  const per = R.r() < 0.35;
  if (per) { const r = 2 * (b + h); return { q: S.m7.ar_per_q(S.m7.ar_fig[sq ? "cuad" : "rect"]) + "<br>" + fig(body, 280, 50 + Hh), kind: "num", ans: r, sol: S.m7.ar_per_s(`${b} + ${h} + ${b} + ${h}`, r) }; }
  const r = b * h;
  return { q: S.m7.ar_area_q(S.m7.ar_fig[sq ? "cuad" : "rect"]) + "<br>" + fig(body, 280, 50 + Hh), kind: "num", ans: r, sol: sq ? S.m7.ar_cuad_s(b, r) : S.m7.ar_rect_s(b, h, r) };
});
def("m7.ar.triangulo", (R, S, H) => {
  const b = R.int(4, 24), h = R.int(3, 18), r = b * h / 2, apex = R.int(40, 200);
  const body = poly([[30, 140], [230, 140], [apex, 20]], C.light) + dash(apex, 20, apex, 140) + lbl(130, 160, cm(H, b)) + lbl(apex + 6, 85, cm(H, h), C.red, "start");
  return { q: S.m7.ar_area_q(S.m7.ar_fig.tri) + "<br>" + fig(body, 260, 170), kind: "num", ans: r, sol: S.m7.ar_tri_s(b, h, H.dec(r)) };
});
def("m7.ar.paralelogramo", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) {
    const b = R.int(5, 20), h = R.int(3, 14), side = h + R.int(1, 4), r = b * h;
    const body = poly([[100, 130], [270, 130], [240, 30], [70, 30]], C.light) + dash(100, 30, 100, 130) + lbl(185, 150, cm(H, b)) + lbl(106, 85, cm(H, h), C.red, "start") + lbl(62, 85, cm(H, side), C.grey, "end");
    return { q: S.m7.ar_area_q(S.m7.ar_fig.para) + "<br>" + fig(body, 300, 160), kind: "num", ans: r, sol: S.m7.ar_para_s(b, h, r) };
  }
  if (k === 1) {
    const D = R.int(6, 24), d = R.int(4, D - 1), r = D * d / 2;
    const body = poly([[130, 15], [230, 85], [130, 155], [30, 85]], C.light) + dash(30, 85, 230, 85) + dash(130, 15, 130, 155) + lbl(180, 80, cm(H, D), C.red) + lbl(136, 125, cm(H, d), C.red, "start");
    return { q: S.m7.ar_area_q(S.m7.ar_fig.rombo) + "<br>" + fig(body, 260, 170), kind: "num", ans: r, sol: S.m7.ar_rombo_s(D, d, H.dec(r)) };
  }
  const B = R.int(8, 25), b = R.int(3, B - 2), h = R.int(3, 14), r = (B + b) * h / 2;
  const body = poly([[20, 140], [240, 140], [180, 40], [80, 40]], C.light) + dash(80, 40, 80, 140) + lbl(130, 160, cm(H, B)) + lbl(130, 32, cm(H, b)) + lbl(86, 95, cm(H, h), C.red, "start");
  return { q: S.m7.ar_area_q(S.m7.ar_fig.trap) + "<br>" + fig(body, 260, 170), kind: "num", ans: r, sol: S.m7.ar_trap_s(B, b, h, H.dec(r)) };
});
def("m7.ar.regular", (R, S, H) => {
  const n = R.pick([5, 6]), l = R.int(4, 20), a = rd(l / (2 * Math.tan(Math.PI / n)), 1), p = n * l, r = rd(p * a / 2, 2);
  const cx = 110, cy = 85, rr = 65, pts = Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n + (n === 6 ? 0 : 0); return [+(cx + rr * Math.cos(t)).toFixed(1), +(cy + rr * Math.sin(t)).toFixed(1)]; });
  const m = [(pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2];
  const body = poly(pts) + dash(cx, cy, m[0], m[1]) + `<circle cx="${cx}" cy="${cy}" r="3" fill="${C.dark}"/>` + lbl((pts[1][0] + pts[2][0]) / 2 + 30, (pts[1][1] + pts[2][1]) / 2 + 14, cm(H, l)) + lbl((cx + m[0]) / 2 - 4, (cy + m[1]) / 2 - 6, cm(H, a), C.red, "end");
  return { q: S.m7.ar_area_q(S.m7.ar_fig[n === 6 ? "hex" : "pent"]) + "<br>" + fig(body, 260, 170), kind: "num", ans: r, tol: 0.01, sol: S.m7.ar_reg_s(n, l, H.dec(a), p, H.dec(r)) };
});
def("m7.ar.compuesta", (R, S, H) => {
  // Figura en L: rectángulo grande W×Hh menos esquina w×h
  const W = R.int(8, 20), Hh = R.int(6, 16), w = R.int(2, W - 3), h = R.int(2, Hh - 3), r = W * Hh - w * h;
  const sx = 200 / W, sy = 130 / Hh, X = v => 64 + v * sx, Y = v => 22 + v * sy;
  const pts = [[X(0), Y(0)], [X(W - w), Y(0)], [X(W - w), Y(h)], [X(W), Y(h)], [X(W), Y(Hh)], [X(0), Y(Hh)]].map(p => p.map(v => +v.toFixed(1)));
  const body = poly(pts) + lbl(X(W / 2), Y(Hh) + 18, cm(H, W)) + lbl(X(0) - 6, Y(Hh / 2), cm(H, Hh), C.dark, "end") + lbl(X((W - w) / 2), Y(0) - 4, cm(H, W - w)) + lbl(X(W) + 6, Y((h + Hh) / 2), cm(H, Hh - h), C.dark, "start");
  const a1 = (W - w) * Hh, a2 = w * (Hh - h);
  return { q: S.m7.ar_area_q(S.m7.ar_fig.comp) + "<br>" + fig(body, 330, 180), kind: "num", ans: r, sol: S.m7.ar_comp_s(W, Hh, W - w, Hh - h, w, h, a1, a2, r) };
});
def("m7.ar.inverso", (R, S, H) => {
  // Lado de un cuadrado: casi siempre con cuadrados hasta 15² (los de la tabla de la unidad 1); si no, tanteo con las decenas
  if (R.r() < 0.5) { const l = R.r() < 0.75 ? R.int(3, 15) : R.int(16, 25), d = Math.floor(l / 10) * 10;
    return { q: S.m7.ar_lado_q(l * l), kind: "num", ans: l, sol: l <= 15 ? S.m7.ar_lado_s(l * l, l) : S.m7.ar_lado_t(l * l, l, d) }; }
  const b = R.int(4, 20), h = R.int(3, 20), A = b * h / 2;
  return { q: S.m7.ar_alt_q(H.dec(A), b), kind: "num", ans: h, sol: S.m7.ar_alt_s(H.dec(A), b, h) };
});
def("m7.ar.unidades", (R, S, H) => {
  if (R.r() < 0.25) {   // unidades agrarias: 1 ha = 10 000 m², 1 a = 100 m², 1 ha = 100 a
    const t = R.int(0, 3), v = R.pick([R.int(2, 40), R.int(11, 99) / 10]);
    const [from, to, k, mult] = [["ha", "m²", 10000, true], ["a", "m²", 100, true], ["ha", "a", 100, true], ["m²", "ha", 10000, false]][t];
    const val = mult ? v : v * 10000, r = mult ? v * k : val / k;
    return { q: S.m7.un_q(H.dec(val), from, to), kind: "num", ans: rd(r, 6), sol: S.m7.un_agr_s(from, to, H.n(k), mult, H.dec(val), H.dec(rd(r, 6))) };
  }
  const U = ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"];
  const i = R.int(1, 5), j = Math.max(0, Math.min(6, i + R.pick([-2, -1, 1, 2]))), v = R.pick([R.int(1, 99), R.int(1, 999) / 10, R.int(2, 50) * 100]);
  const p = Math.abs(j - i), k = 100 ** p, r = j > i ? v * k : v / k;
  return { q: S.m7.un_q(H.dec(v), U[i], U[j]), kind: "num", ans: rd(r, 8), sol: S.m7.un_s(U[i], U[j], p, j > i, H.n(k), H.dec(v), H.dec(r, 8)) };
});

// ── Círculo ───────────────────────────────────────────────────────────
def("m7.ci.longitud", (R, S, H) => {
  const isD = R.r() < 0.35, v = R.int(2, 30), r = isD ? v / 2 : v, L = 2 * Math.PI * r;
  // Con el diámetro, L = π · d (como en la lección); con el radio, L = 2 · π · r
  return { q: S.m7.ci_long_q(v, isD), kind: "num", ans: rd(L, 2), tol: piTol(L), hint: S.m7.ci_hint, ansHtml: S.m7.ci_ans(H.dec(rd(2 * 3.14 * r, 4)), H.dec(rd(L, 2))), sol: S.m7.ci_long_s(v, isD, H.dec(rd(L, 2)), H.dec(rd(2 * 3.14 * r, 4))) };
});
def("m7.ci.area", (R, S, H) => {
  const isD = R.r() < 0.3, v = R.int(2, 24), r = isD ? v / 2 : v, A = Math.PI * r * r;
  return { q: S.m7.ci_area_q(v, isD), kind: "num", ans: rd(A, 2), tol: piTol(A), hint: S.m7.ci_hint, ansHtml: S.m7.ci_ans(H.dec(rd(3.14 * r * r, 4)), H.dec(rd(A, 2))), sol: S.m7.ci_area_s(H.dec(r), H.dec(rd(A, 2)), H.dec(rd(3.14 * r * r, 4))) };
});
def("m7.ci.radiodesde", (R, S, H) => {
  // La longitud se da calculada con π ≈ 3,14, como en la lección: la división sale exacta (2 · 3,14 = 6,28)
  const r = R.int(2, 25), L = rd(6.28 * r, 2);
  return { q: S.m7.ci_rdesde_q(H.dec(L)), kind: "num", ans: r, tol: 0.06, hint: S.m7.ci_hint, sol: S.m7.ci_rdesde_s(H.dec(L), r) };
});
def("m7.ci.figuras", (R, S, H) => {
  if (R.r() < 0.5) {
    // Como el Ejemplo 5 de la lección: círculo grande menos círculo pequeño, con π ≈ 3,14 (sin sacar factor común)
    const Rr = R.int(4, 20), r = R.int(1, Rr - 1), A = Math.PI * (Rr * Rr - r * r);
    const g = rd(3.14 * Rr * Rr, 4), p = rd(3.14 * r * r, 4), c = rd(g - p, 4);
    return { q: S.m7.ci_corona_q(Rr, r), kind: "num", ans: rd(A, 2), tol: piTol(A), hint: S.m7.ci_hint, ansHtml: S.m7.ci_ans(H.dec(c), H.dec(rd(A, 2))),
      sol: S.m7.ci_corona_s(Rr, r, H.dec(g), H.dec(p), H.dec(c), H.dec(rd(A, 2))) };
  }
  // Como el Ejemplo 4: el círculo entero con π ≈ 3,14 y la fracción de 360 simplificada
  const r = R.int(2, 20), a = R.pick([30, 45, 60, 90, 120, 135, 150, 180, 240, 270]), A = Math.PI * r * r * a / 360;
  const gcd = (x, y) => y ? gcd(y, x % y) : x, g = gcd(a, 360), p = a / g, q = 360 / g;
  const C0 = rd(3.14 * r * r, 4), s314 = C0 * p / q, s2 = rd(s314, 2);
  return { q: S.m7.ci_sector_q(r, a), kind: "num", ans: rd(A, 2), tol: piTol(A), hint: S.m7.ci_hint, ansHtml: S.m7.ci_ans(H.dec(s2), H.dec(rd(A, 2))),
    sol: S.m7.ci_sector_s(r, a, H.dec(C0), p, q, H.dec(s2), Math.abs(s314 - s2) > 1e-9, H.dec(rd(A, 2))) };
});
})();
