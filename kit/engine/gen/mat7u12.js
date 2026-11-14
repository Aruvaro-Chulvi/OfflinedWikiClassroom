/* WikiAula — Matemáticas, Grado 7 · Unidad 12: Estadística y probabilidad.
   Textos: i18n/<lang>/mat7u12.js (S.m7). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SV = WA.SVG, C = SV.C;
const { F } = WA.MATH;
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;

function dataset(R, n, lo, hi) { return Array.from({ length: n }, () => R.int(lo, hi)); }
const show = (H, xs) => xs.map(x => H.n(x)).join(", ");
function counts(xs) { const m = new Map(); xs.forEach(x => m.set(x, (m.get(x) || 0) + 1)); return m; }

def("m7.es.tipovar", (R, S, H) => {
  const [v, k, why] = R.pick(S.m7.es_var_items);   // why: solución propia (números que son etiquetas)
  return { q: S.m7.es_var_q(v), kind: "choice", opts: S.m7.es_vars, correct: k, shuffle: false, sol: why || S.m7.es_var_s[k] };
});
def("m7.es.frecuencia", (R, S, H) => {
  const xs = dataset(R, R.int(12, 20), 0, 5), c = counts(xs), v = R.pick([...c.keys()]), n = c.get(v);
  if (R.r() < 0.55) return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_frec_q(v), kind: "int", ans: n, sol: S.m7.es_frec_s(v, n) };
  const r = F.make(n, xs.length), simp = r[0] !== n;
  return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_frel_q(v), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.es_frel_s2(v, n, xs.length, H.frac(n, xs.length), simp ? F.html(r, H) : "") };
});
def("m7.es.frecrel", (R, S, H) => {
  const T = S.m7.es_fr2, k = R.r();
  if (k < 0.25) {   // al revés: parte = porcentaje del total (como en la unidad de porcentajes)
    const N = R.pick([20, 30, 40, 50, 60, 80, 120, 200, 250, 300]), p = R.pick([10, 20, 25, 30, 40, 50, 60, 75, 5, 15, 35, 45]);
    if ((N * p) % 100) return null;
    const [que, cosa] = R.pick(T.encuestas);
    return { q: T.inv_q(N, p, que), kind: "int", ans: N * p / 100, sol: T.inv_s(N, p, N * p / 100, cosa) };
  }
  // tabla de frecuencias absolutas con un total cómodo (10, 20, 25, 40 o 50)
  const [tema, cats] = R.pick(T.tablas), N = R.pick([10, 20, 25, 40, 50]), m = cats.length;
  const f = Array(m).fill(1); for (let i = m; i < N; i++) f[R.int(0, m - 1)]++;
  const i = R.int(0, m - 1), dec = f[i] / N;
  const tab = `<table style="border-collapse:collapse;margin:6px 0"><tr><th style="border:1px solid #a2a9b1;padding:3px 10px">${tema}</th>${cats.map(c => `<td style="border:1px solid #a2a9b1;padding:3px 10px;text-align:center">${c}</td>`).join("")}</tr>`
    + `<tr><th style="border:1px solid #a2a9b1;padding:3px 10px">${T.fa}</th>${f.map(x => `<td style="border:1px solid #a2a9b1;padding:3px 10px;text-align:center">${x}</td>`).join("")}</tr></table>`;
  const total = T.total(f.join(" + "), N);
  if (k < 0.65) return { q: T.rel_q(tab, cats[i]), kind: "num", ans: dec, tol: 0.001, sol: total + T.rel_s(f[i], N, H.dec(dec)) };
  return { q: T.pct_q(tab, cats[i]), kind: "num", ans: rd(dec * 100, 4), tol: 0.01, sol: total + T.pct_s(f[i], N, H.dec(dec), H.dec(rd(dec * 100, 4))) };
});
def("m7.es.media", (R, S, H) => {
  const xs = dataset(R, R.int(5, 9), 1, 20), n = xs.length, sum = xs.reduce((a, b) => a + b, 0), m = rd(sum / n, 2);
  // Cociente exacto o con «…» (periódico o con más de dos decimales) y, si se redondea, «≈»
  const ex = sum / n, isInt = v => Math.abs(v - Math.round(v)) < 1e-9;
  const exact = isInt(ex * 100) ? null : isInt(ex * 1000) ? H.dec(ex, 3) : H.dec(Math.floor(ex * 1000 + 1e-9) / 1000, 3) + "…";
  return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_media_q, kind: "num", ans: m, tol: 0.006, sol: S.m7.es_media_s(xs.join(" + "), sum, n, exact, H.dec(m)) };
});
def("m7.es.mediana", (R, S, H) => {
  const xs = dataset(R, R.int(5, 10), 1, 30), s = [...xs].sort((a, b) => a - b), n = s.length;
  const even = n % 2 === 0, med = even ? (s[n / 2 - 1] + s[n / 2]) / 2 : s[(n - 1) / 2];
  const pos = even ? [n / 2, n / 2 + 1] : [(n + 1) / 2], cen = pos.map(p => s[p - 1]);
  return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_mediana_q, kind: "num", ans: med, sol: S.m7.es_mediana_s2(show(H, s), n, pos, cen, H.dec(med)) };
});
def("m7.es.moda", (R, S, H) => {
  for (;;) {
    const xs = dataset(R, R.int(8, 14), 1, 9), c = counts(xs), max = Math.max(...c.values()), top = [...c.keys()].filter(k => c.get(k) === max);
    if (top.length !== 1 || max < 2) continue;
    return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_moda_q, kind: "int", ans: top[0], sol: S.m7.es_moda_s(top[0], max) };
  }
});
def("m7.es.rango", (R, S, H) => {
  const xs = dataset(R, R.int(6, 10), -5, 40), M = Math.max(...xs), m = Math.min(...xs);
  const neg = n => n < 0 ? `(${H.n(n)})` : H.n(n);
  return { q: S.m7.es_datos(show(H, xs)) + S.m7.es_rango_q, kind: "int", ans: M - m, sol: S.m7.es_rango_s(H.n(M), neg(m), M - m) };
});
def("m7.es.barras", (R, S, H) => {
  const cats = R.shuffle(S.m7.es_frutas).slice(0, R.int(4, 5)), vals = cats.map(() => R.int(1, 9));
  const w = 300, h = 200, pad = 30, bw = (w - 2 * pad) / cats.length, sy = (h - 60) / 10;
  let b = "";
  // Una línea de la cuadrícula en cada unidad (las barras impares acaban en una línea) y números cada 2
  for (let v = 0; v <= 10; v++) b += `<line x1="${pad}" y1="${h - 30 - v * sy}" x2="${w - 10}" y2="${h - 30 - v * sy}" stroke="${v % 2 ? "#eef0f2" : "#d5d9de"}"/>` + (v % 2 ? "" : SV.txt(pad - 6, h - 26 - v * sy, v, 10, "#54595d", "end"));
  cats.forEach((c, i) => {
    const x = pad + i * bw + bw * 0.2;
    b += `<rect x="${x}" y="${h - 30 - vals[i] * sy}" width="${bw * 0.6}" height="${vals[i] * sy}" fill="${[C.blue, C.green, C.amber, C.red, C.purple][i]}"/>` + SV.txt(x + bw * 0.3, h - 14, c, 11, C.dark);
  });
  b += `<line x1="${pad}" y1="${h - 30}" x2="${w - 10}" y2="${h - 30}" stroke="${C.dark}" stroke-width="1.5"/><line x1="${pad}" y1="${h - 30}" x2="${pad}" y2="15" stroke="${C.dark}" stroke-width="1.5"/>`;
  const pic = SV.svg(w, h, b);
  if (R.r() < 0.6) { const i = R.int(0, cats.length - 1); return { q: S.m7.es_barras_q(cats[i]) + "<br>" + pic, kind: "int", ans: vals[i], sol: S.m7.es_barras_s(vals[i]) }; }
  const tot = vals.reduce((a, c) => a + c, 0);
  return { q: S.m7.es_barras_tot_q + "<br>" + pic, kind: "int", ans: tot, sol: S.m7.es_barras_tot_s(vals.join(" + "), tot) };
});
def("m7.es.sectores", (R, S, H) => {
  // N siempre divide a 360: primero los grados de una persona (360 : N) y después por n, como en la lección
  const N = R.pick([20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360]), n = R.int(1, N - 1), g = 360 / N, r = n * g;
  return { q: S.m7.es_sect_q(n, N), kind: "num", ans: r, tol: 0.01, sol: S.m7.es_sect_s(n, N, g, r) };
});

// ── Probabilidad ──────────────────────────────────────────────────────
def("m7.pb.laplace", (R, S, H) => {
  if (R.r() < 0.35) {
    const [q, [a, b]] = R.pick(S.m7.pb_dado), r = F.make(a, b);
    return { q: S.m7.pb_q(q), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp, sol: S.m7.pb_s(a, b, H.frac(a, b), F.html(r, H)) };
  }
  const k = R.int(2, 4), cols = R.shuffle(S.m7.pb_colores).slice(0, k), ns = cols.map(() => R.int(1, 9));
  const tot = ns.reduce((a, b) => a + b, 0), i = R.int(0, k - 1), r = F.make(ns[i], tot);
  const list = cols.map((c, j) => S.m7.pb_bolas(ns[j], c));
  const txt = S.m7.pb_lista(list);
  return { q: S.m7.pb_q(S.m7.pb_urna_q(`${txt}`, cols[i][0])), kind: "frac", ans: r, simplest: true, hint: S.m7.fr_hint_simp,
    sol: S.m7.pb_urna_s(ns.join(" + "), tot, ns[i], cols[i][ns[i] === 1 ? 0 : 1]) + " " + S.m7.pb_s(ns[i], tot, H.frac(ns[i], tot), F.html(r, H)) };
});
def("m7.pb.frecrel", (R, S, H) => {
  const T = S.m7.pb_fr, k = R.r();
  if (k < 0.35) {   // estimar la probabilidad con la frecuencia relativa
    // k múltiplo del paso para que k : n tenga como mucho dos decimales
    const [obj, suc] = R.pick(T.exps), [n, st] = R.pick([[50, 1], [100, 1], [200, 2], [250, 5], [400, 4], [500, 5]]);
    const kk = st * R.int(Math.ceil(n * 0.15 / st), Math.floor(n * 0.85 / st)), fr = kk / n;
    return { q: T.est_q(obj, n, suc, kk), kind: "num", ans: fr, tol: 0.001, sol: T.est_s(kk, n, H.dec(fr)) };
  }
  if (k < 0.65) {   // cuántas veces se espera: probabilidad · repeticiones
    const [p, txt] = R.pick(T.probs), n = R.pick([60, 120, 300, 600, 900, 1200]), e = p[0] * n / p[1];   // n divisible entre 2, 3, 4, 5, 6 y 10
    return { q: T.esp_q(txt, H.frac(p[0], p[1]), n), kind: "int", ans: e, sol: T.esp_s(H.frac(p[0], p[1]), n, p[1], p[0], e) };
  }
  if (k < 0.85) {   // ¿parece trucado el dado? (con muchas tiradas)
    const n = R.pick([300, 600, 1200]), trucado = R.r() < 0.5, kk = trucado ? Math.round(n * R.pick([0.3, 0.35, 0.4, 0.5])) : Math.round(n / 6) + R.int(-n / 60, n / 60);
    const fr = kk / n;
    return { q: T.dado_q(n, kk), kind: "choice", opts: [S.yesno[0], S.yesno[1]], correct: trucado ? 0 : 1, shuffle: false,
      sol: T.dado_s(kk, n, H.dec(rd(fr, 2)), trucado, Math.abs(fr * 100 - Math.round(fr * 100)) < 1e-9) };
  }
  // ¿qué estimación es más fiable? la de más repeticiones
  const [a, b] = R.shuffle(T.nombres).slice(0, 2), na = R.pick([10, 20, 30]), nb = R.pick([300, 500, 1000]), first = R.r() < 0.5;
  const fa = rd(R.int(3, 8) / 10, 1), fb = rd(R.int(55, 65) / 100, 2);
  const [n1, f1, n2, f2] = first ? [na, fa, nb, fb] : [nb, fb, na, fa];
  return { q: T.fiable_q(a, n1, H.dec(f1), b, n2, H.dec(f2)), kind: "choice", opts: [a, b], correct: first ? 1 : 0, shuffle: false,
    sol: T.fiable_s(first ? b : a, Math.max(na, nb), Math.min(na, nb)) };
});
def("m7.pb.tipo", (R, S, H) => {
  const [s, k] = R.pick(S.m7.pb_tipo_items);
  return { q: S.m7.pb_tipo_q(s), kind: "choice", opts: S.m7.pb_tipos, correct: k, shuffle: false, sol: S.m7.pb_tipo_s[k] };
});
def("m7.pb.espacio", (R, S, H) => {
  const [e, n, how] = R.pick(S.m7.pb_esp_items);
  return { q: S.m7.pb_esp_q(e), kind: "int", ans: n, sol: S.m7.pb_esp_s(n, how) };
});
})();
