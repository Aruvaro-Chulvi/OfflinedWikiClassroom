/* WikiAula — Matemáticas, Grado 7 · Unidad 9: Polígonos y triángulos.
   Textos: i18n/<lang>/mat7u9.js (S.m7). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SV = WA.SVG;

function polySvg(n) {
  const r = 55, cx = 70, cy = 70;
  const pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  let b = `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}" fill="${SV.C.light}" stroke="${SV.C.blue}" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) { if (i === 0 && j === n - 1) continue; b += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[j][0].toFixed(1)}" y2="${pts[j][1].toFixed(1)}" stroke="${SV.C.amber}" stroke-width="1"/>`; }
  return SV.svg(140, 140, b);
}

def("m7.po.diagonales", (R, S, H) => {
  const n = R.int(4, 12), name = S.m7.po_names[n], r = n * (n - 3) / 2;
  return { q: S.m7.po_diag_q(n, name) + (n <= 8 ? "<br>" + polySvg(n).replace(new RegExp(`stroke="${SV.C.amber}"`, "g"), 'stroke="none"') : ""), kind: "int", ans: r, sol: S.m7.po_diag_s(n, r) + (n <= 8 ? "<br>" + polySvg(n) : "") };
});
def("m7.po.lados", (R, S, H) => {
  const n = R.int(5, 12), name = S.m7.po_names[n];
  return { q: S.m7.po_lados_q(name), kind: "int", ans: n, sol: S.m7.po_lados_s(name, n) };
});
def("m7.tr.lados", (R, S, H) => {
  const k = R.int(0, 2);
  let a, b, c;
  if (k === 0) a = b = c = R.int(3, 15);
  else if (k === 1) { a = b = R.int(4, 15); do c = R.int(2, 2 * a - 1); while (c === a); }
  else { do { a = R.int(3, 15); b = R.int(3, 15); c = R.int(3, 15); } while (a === b || b === c || a === c || a + b <= c || a + c <= b || b + c <= a); }
  const sides = R.shuffle([a, b, c]);
  return { q: S.m7.tr_lados_q(...sides), kind: "choice", opts: S.m7.tr_lados, correct: k, shuffle: false, sol: S.m7.tr_lados_s[k] };
});
def("m7.tr.angulos", (R, S, H) => {
  const k = R.int(0, 2);
  let a, b, c;
  if (k === 1) { a = 90; b = R.int(10, 80); c = 90 - b; }
  else if (k === 2) { a = R.int(95, 150); b = R.int(5, 180 - a - 5); c = 180 - a - b; }
  else { do { a = R.int(30, 89); b = R.int(30, 89); c = 180 - a - b; } while (c <= 0 || c >= 90); }
  const angs = R.shuffle([a, b, c]);
  return { q: S.m7.tr_ang_q(...angs), kind: "choice", opts: S.m7.tr_ang, correct: k, shuffle: false, sol: S.m7.tr_ang_s[k] };
});
def("m7.tr.desigualdad", (R, S, H) => {
  const a = R.int(2, 12), b = R.int(2, 12), yes = R.r() < 0.5;
  const c = yes ? R.int(Math.abs(a - b) + 1, a + b - 1) : R.int(a + b, a + b + 6);
  const sides = R.shuffle([a, b, c]), big = Math.max(...sides), sum = a + b + c - big;
  const ok = big < sum;
  return { q: S.m7.tr_des_q(...sides), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: ok ? 0 : 1, shuffle: false, sol: S.m7.tr_des_s(big, sum, ok) };
});
// Además del nombre de memoria: situaciones (pueblos, fuente, peonza), qué rectas se trazan, dónde cae cada punto
// según el tipo de triángulo, el radio con la hipotenusa y el baricentro a 2/3 de la mediana.
def("m7.tr.notables", (R, S, H) => {
  const T = S.m7.tr_not2, k = R.r();
  if (k < 0.2) { const [q, c] = R.pick(S.m7.tr_not); return { q, kind: "choice", opts: S.m7.tr_not_opts, correct: c, shuffle: false, sol: S.m7.tr_not_s[c] }; }
  if (k < 0.5) {
    const c = R.int(0, 2), q = T.sit_q[c](R);
    return { q, kind: "choice", opts: S.m7.tr_not_opts, correct: c, shuffle: false, sol: T.sit_s[c] };
  }
  if (k < 0.6) { const c = R.int(0, 3); return { q: T.rectas_q(S.m7.tr_not_opts[c]), kind: "choice", opts: T.rectas, correct: c, shuffle: false, sol: S.m7.tr_not_s[c] }; }
  if (k < 0.8) {   // ¿dentro, en un lado o vértice, o fuera?
    const t = R.int(0, 2), p = R.int(0, 3);
    const where = t === 0 || p === 1 || p === 2 ? 0 : t === 1 ? 1 : 2;   // acutángulo; incentro y baricentro siempre dentro
    return { q: T.donde_q(T.tipos[t], S.m7.tr_not_opts[p].toLowerCase()), kind: "choice", opts: T.donde, correct: where, shuffle: false, sol: T.donde_s(t, p) };
  }
  if (k < 0.9) { const h = 2 * R.int(3, 16); return { q: T.hip_q(h), kind: "int", ans: h / 2, sol: T.hip_s(h, h / 2) }; }
  const m = 3 * R.int(2, 12);
  return { q: T.bar_q(m), kind: "int", ans: 2 * m / 3, sol: T.bar_s(m, m / 3, 2 * m / 3) };
});
// Definiciones inclusivas, como en la lección: un cuadrado también es rectángulo y rombo, así que se marcan
// todos los nombres que valen (respuesta de varias opciones).
def("m7.cu.tipo", (R, S, H) => {
  const [p, ks, why] = R.pick(S.m7.cu_props);
  return { q: S.m7.cu_q(p), kind: "multi", opts: S.m7.cu_opts, correct: ks, shuffle: false, sol: S.m7.cu_s(why, ks.map(k => S.m7.cu_opts[k].toLowerCase())) };
});
def("m7.cu.angulos", (R, S, H) => {
  const a = R.int(30, 150);
  if (a === 90) return null;
  return { q: S.m7.cu_ang_q(a), kind: "int", ans: 180 - a, sol: S.m7.cu_ang_s(a, 180 - a) };
});
def("m7.ci.radio", (R, S, H) => {
  const toD = R.r() < 0.5, v = toD ? R.int(2, 40) : R.int(3, 80), r = toD ? 2 * v : v / 2;
  return { q: S.m7.ci_rd_q(v, toD), kind: "num", ans: r, sol: S.m7.ci_rd_s(v, H.dec(r), toD) };
});
def("m7.ci.posicion", (R, S, H) => {
  const r = R.int(3, 12), k = R.int(0, 2), d = k === 0 ? R.int(0, r - 1) : k === 1 ? r : R.int(r + 1, r + 10);
  if (R.r() < 0.5) return { q: S.m7.ci_pos_q(r, d), kind: "choice", opts: S.m7.ci_pos, correct: k, shuffle: false, sol: S.m7.ci_pos_s(r, d, k) };
  return { q: S.m7.ci_rec_q(r, d), kind: "choice", opts: S.m7.ci_rec, correct: k, shuffle: false, sol: S.m7.ci_rec_s(r, d, k) };
});
})();
