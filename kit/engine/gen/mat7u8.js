/* WikiAula — Matemáticas, Grado 7 · Unidad 8: Rectas y ángulos.
   Textos: i18n/<lang>/mat7u8.js (S.m7). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const SV = WA.SVG;

// Ángulo sexagesimal en segundos ↔ texto
const toDMS = t => [Math.floor(t / 3600), Math.floor(t % 3600 / 60), t % 60];
const dms = (d, m, s) => `${d}° ${m}′ ${s}″`;
const dmsT = t => dms(...toDMS(t));
const fieldsDMS = (S, t) => toDMS(t).map((v, i) => ({ label: S.m7.an_sx_f[i], ans: v }));

def("m7.an.tipo", (R, S, H) => {
  const k = R.int(0, 3);
  const a = k === 0 ? R.int(5, 89) : k === 1 ? 90 : k === 2 ? R.int(91, 179) : 180;
  return { q: S.m7.an_tipo_q(`${a}°`), kind: "choice", opts: S.m7.an_tipos, correct: k, shuffle: false, sol: S.m7.an_tipo_s[k] };
});
def("m7.an.complementario", (R, S, H) => {
  const c = R.r() < 0.5, a = c ? R.int(5, 85) : R.int(5, 175);
  return { q: S.m7.an_comp_q(a, c), kind: "int", ans: (c ? 90 : 180) - a, sol: S.m7.an_comp_s(a, c, (c ? 90 : 180) - a) };
});

// Dos paralelas cortadas por una secante; posiciones 0..7 (TR, TL, BL, BR en cada corte)
def("m7.an.paralelas", (R, S, H) => {
  const th = R.int(35, 75), rad = th * Math.PI / 180;
  const y1 = 60, y2 = 150, cx = 210, dx = (y2 - y1) / 2 / Math.tan(rad);
  const P = [[cx + dx, y1], [cx - dx, y2]];
  const ang = [th, 180 - th, th, 180 - th];       // TR, TL, BL, BR
  const dirs = [th / 2, 90 + th / 2 + (90 - th) / 2, 180 + th / 2, 270 + (180 - th) / 2 + th / 2 - 90]; // aproximadas
  const mid = k => { // dirección central de cada sector
    const start = [0, th, 180, 180 + th][k], width = ang[k];
    return (start + width / 2) * Math.PI / 180;
  };
  const g = R.int(0, 7);
  let a;
  do a = R.int(0, 7); while (a === g);
  const val = ang[g % 4], ans = ang[a % 4];
  const C = SV.C;
  let b = `<line x1="20" y1="${y1}" x2="400" y2="${y1}" stroke="${C.dark}" stroke-width="2"/><line x1="20" y1="${y2}" x2="400" y2="${y2}" stroke="${C.dark}" stroke-width="2"/>`;
  const ex = 70 / Math.tan(rad);
  // La secante pasa por los dos cruces P[0] y P[1]: x(y) = P[0].x + (y1 − y) / tan
  b += `<line x1="${P[0][0] + (y1 - 200) / Math.tan(rad)}" y1="200" x2="${P[0][0] + (y1 - 10) / Math.tan(rad)}" y2="10" stroke="${C.blue}" stroke-width="2"/>`;
  const lab = (k, txt, col) => {
    const p = P[k > 3 ? 1 : 0], m = mid(k % 4), r = 26;
    return SV.txt(p[0] + r * Math.cos(m), p[1] - r * Math.sin(m) + 5, txt, 15, col, "middle", "bold");
  };
  b += lab(g, `${val}°`, C.green) + lab(a, "?", C.red);
  b += `<text x="395" y="${y1 - 6}" font-size="12" fill="${C.dark}" text-anchor="end" font-family="sans-serif">r</text><text x="395" y="${y2 - 6}" font-size="12" fill="${C.dark}" text-anchor="end" font-family="sans-serif">s</text>`;
  const pic = SV.svg(420, 200, b);
  // Pareja: mismo cruce (opuestos o adyacentes) o distinto cruce (correspondientes, alternos internos, alternos externos o
  // uno agudo y otro obtuso). Sectores: 0 arriba-dcha, 1 arriba-izda, 2 abajo-izda, 3 abajo-dcha (+4 en el cruce de abajo).
  const lo = Math.min(g, a), hi = Math.max(g, a), same = (g < 4) === (a < 4);
  const rel = same ? (Math.abs(g - a) === 2 ? "opuestos" : "adyacentes")
    : lo % 4 === hi % 4 ? "correspondientes"
    : (lo === 2 && hi === 4) || (lo === 3 && hi === 5) ? "alt_int"
    : (lo === 0 && hi === 6) || (lo === 1 && hi === 7) ? "alt_ext" : "distintos";
  return { q: S.m7.an_par_q + "<br>" + pic, kind: "int", ans, sol: S.m7.an_par_s(rel, val, ans) };
});

// ── Sistema sexagesimal ───────────────────────────────────────────────
// Uno de cada tres ejercicios, solo con grados y minutos (como los ejemplos de la lección); el resto, con segundos.
// Las soluciones escriben cada «llevada» y cada préstamo de 60 por separado.
const randDMS = (R, maxD, sec = true) => R.int(1, maxD) * 3600 + R.int(0, 59) * 60 + (sec ? R.int(0, 59) : 0);
const dm = (d, m) => `${d}° ${m}′`;
const dmsS = (t, sec) => sec ? dmsT(t) : dm(...toDMS(t));
const fieldsS = (S, t, sec) => sec ? fieldsDMS(S, t) : fieldsDMS(S, t).slice(0, 2);
// Pasa los excesos de 60: devuelve los pasos (″ → ′ y ′ → °) y el resultado
function carry(S, d, m, s, sec) {
  const st = [];
  if (sec && s >= 60) { const q = Math.floor(s / 60); st.push(S.m7.an_sx_carry(`${s}″`, `${q}′ ${s % 60}″`, `${q}′`, `${m}′ + ${q}′ = ${m + q}′`)); m += q; s %= 60; }
  if (m >= 60) { const q = Math.floor(m / 60); st.push(S.m7.an_sx_carry(`${m}′`, `${q}° ${m % 60}′`, `${q}°`, `${d}° + ${q}° = ${d + q}°`)); d += q; m %= 60; }
  return st;
}
def("m7.an.sxsuma", (R, S, H) => {
  const sec = R.r() < 0.67, a = randDMS(R, 120, sec), b = randDMS(R, 90, sec), t = a + b;
  const [ad, am, as] = toDMS(a), [bd, bm, bs] = toDMS(b);
  const raw = sec ? dms(ad + bd, am + bm, as + bs) : dm(ad + bd, am + bm);
  return { q: S.m7.an_sx_q(`${dmsS(a, sec)} + ${dmsS(b, sec)}`), kind: "fields", fields: fieldsS(S, t, sec),
    sol: S.m7.an_sx_sum_s(raw, carry(S, ad + bd, am + bm, as + bs, sec), dmsS(t, sec)) };
});
def("m7.an.sxresta", (R, S, H) => {
  const sec = R.r() < 0.67;
  let a = randDMS(R, 150, sec), b = randDMS(R, 90, sec);
  if (b > a) [a, b] = [b, a];
  if (a - b < 3600) a += R.int(5, 40) * 3600;
  const t = a - b;
  let [ad, am, as] = toDMS(a);
  const [bd, bm, bs] = toDMS(b);
  const prep = [];
  if (sec && as < bs) { as += 60; am -= 1; prep.push(S.m7.an_sx_borrow("″", `${bs}″`, `${as - 60}″`, "1′ = 60″", dms(ad, am, as))); }
  if (am < bm) { am += 60; ad -= 1; prep.push(S.m7.an_sx_borrow("′", `${bm}′`, `${am - 60}′`, "1° = 60′", sec ? dms(ad, am, as) : dm(ad, am))); }
  return { q: S.m7.an_sx_q(`${dmsS(a, sec)} − ${dmsS(b, sec)}`), kind: "fields", fields: fieldsS(S, t, sec),
    sol: S.m7.an_sx_res_s(prep, `${sec ? dms(ad, am, as) : dm(ad, am)} − ${dmsS(b, sec)}`, dmsS(t, sec)) };
});
def("m7.an.sxmult", (R, S, H) => {
  if (R.r() < 0.4) {   // dividir: grados, lo que sobra a minutos (y a segundos)
    const sec = R.r() < 0.5, q = randDMS(R, 40, sec), n = R.int(2, 6), t = q * n;
    const [D, M, Sg] = toDMS(t), d = Math.floor(D / n), r1 = D % n, mt = 60 * r1 + M, m = Math.floor(mt / n), r2 = mt % n, st = 60 * r2 + Sg;
    const steps = [S.m7.an_sx_div_g(D, n, d, r1)];
    steps.push(S.m7.an_sx_div_m(r1, M, mt, n, m, sec ? r2 : -1));
    if (sec) steps.push(S.m7.an_sx_div_s(r2, Sg, st, n, st / n));
    return { q: S.m7.an_sx_q(`(${dmsS(t, sec)}) ${WA.H.div} ${n}`), kind: "fields", fields: fieldsS(S, q, sec),
      sol: steps.join("<br>") + `<br>${S.m7.an_sx_res}: <b>${dmsS(q, sec)}</b>.` };
  }
  const sec = R.r() < 0.67, a = randDMS(R, 40, sec), n = R.int(2, 6), t = a * n;
  const [d, m, s] = toDMS(a);
  return { q: S.m7.an_sx_q(`${dmsS(a, sec)} ${H.mul} ${n}`), kind: "fields", fields: fieldsS(S, t, sec),
    sol: S.m7.an_sx_mul_s(sec ? dms(d * n, m * n, s * n) : dm(d * n, m * n), carry(S, d * n, m * n, s * n, sec), dmsS(t, sec)) };
});
def("m7.an.sxconv", (R, S, H) => {
  if (R.r() < 0.5) {
    // Decimales de una o dos cifras, como en la lección (47,25°; 12,6°; 5,31°): siempre salen exactos
    const d = R.int(1, 90), k = R.r() < 0.3 ? R.int(1, 9) * 10 : R.int(1, 99), t = d * 3600 + 36 * k;   // 0,01° = 36″
    const [, m, s] = toDMS(t);
    const fr = k % 10 ? H.dec(k / 100, 2) : H.dec(k / 100, 1), decStr = `${d}${H.ds}${k % 10 ? String(k).padStart(2, "0") : k / 10}`;
    const minsTxt = (6 * k) % 10 ? `${Math.floor(6 * k / 10)}${H.ds}${(6 * k) % 10}` : String(6 * k / 10);
    return { q: S.m7.an_sx_conv_q(decStr), kind: "fields", fields: fieldsDMS(S, t), sol: S.m7.an_sx_conv_s(d, fr, minsTxt, m, s ? `0${H.ds}${(6 * k) % 10}` : "", s, dmsT(t)) };
  }
  const t = randDMS(R, 5);
  const [d, m, s] = toDMS(t);
  return { q: S.m7.an_sx_seg_q(dmsT(t)), kind: "int", ans: t, sol: S.m7.an_sx_seg_s(d, H.n(d * 3600), m, H.n(m * 60), s, H.n(t)) };
});

// ── Mediatriz y bisectriz con algo que pensar (m7.an.notables queda para repasar) ──
def("m7.an.medbis", (R, S, H) => {
  const k = R.r();
  if (k < 0.35) {   // bisectriz de un ángulo con minutos impares o grados impares: en grados y minutos
    let D, M;
    do { D = R.int(21, 179); M = R.r() < 0.5 ? 0 : R.int(1, 29) * 2; } while (D % 2 === 0 && M === 0);
    const A = D * 60 + M, h = A / 2, d = Math.floor(D / 2), r1 = D % 2, mt = 60 * r1 + M;
    const ang = M ? dm(D, M) : `${D}°`;
    return { q: S.m7.mb_bis_q(ang), kind: "fields", fields: fieldsDMS(S, h * 60).slice(0, 2),
      sol: S.m7.mb_bis_s(ang, D, d, r1, M, mt, mt / 2, dm(...toDMS(h * 60))) };
  }
  if (k < 0.6) {    // al revés: la mitad es dato, el ángulo es el doble
    const h = R.int(10, 89) * 60 + R.int(1, 59), [d, m] = toDMS(h * 60), A = 2 * h, [D2, M2] = [2 * d, 2 * m];
    return { q: S.m7.mb_inv_q(dm(d, m)), kind: "fields", fields: fieldsDMS(S, A * 60).slice(0, 2),
      sol: S.m7.mb_inv_s(dm(d, m), dm(D2, M2), M2 >= 60 ? S.m7.an_sx_carry(`${M2}′`, `1° ${M2 - 60}′`, "1°", `${D2}° + 1° = ${D2 + 1}°`) : "", dm(...toDMS(A * 60))) };
  }
  // con una ecuación (unidad 7): PA = PB en la mediatriz, o AM = la mitad de AB
  const c = R.int(2, 5), x = R.int(2, 12), b = R.int(1, 9);
  if (R.r() < 0.5) {
    const v = c * x + b;
    return { q: S.m7.mb_ec_q(c, b, v), kind: "int", ans: x, sol: S.m7.mb_ec_s(c, b, v, v - b, x) };
  }
  const v = x + b, AB = 2 * v;
  return { q: S.m7.mb_ec2_q(b, AB), kind: "int", ans: x, sol: S.m7.mb_ec2_s(b, AB, v, x) };
});

// ── Rectas, semirrectas y segmentos (lo nuevo de 1.º ESO; m3.rectas queda para repasar) ──
def("m7.geo.rectas", (R, S, H) => {
  const k = R.r();
  if (k < 0.4) {   // contar segmentos (o rectas por puntos sin tres alineados)
    const n = R.int(4, 9), recta = n <= 6 && R.r() < 0.3, sum = Array.from({ length: n - 1 }, (_, i) => n - 1 - i);
    return { q: S.m7.gr_seg_q(n, recta), kind: "int", ans: n * (n - 1) / 2,
      sol: S.m7.gr_seg_s(n, recta, sum.join(" + "), n * (n - 1) / 2) };
  }
  if (k < 0.7) {   // ¿recta, semirrecta o segmento?
    const [t, c, why] = R.pick(S.m7.gr_fig);
    return { q: S.m7.gr_fig_q(t), kind: "choice", opts: S.m7.gr_figs, correct: c, shuffle: false, sol: S.m7.gr_fig_s(why, S.m7.gr_figs[c]) };
  }
  // posiciones: r ∥ s o r ⊥ s, y s ∥ t o s ⊥ t
  const [r, s, t] = R.pick([["r", "s", "t"], ["a", "b", "c"], ["m", "n", "p"]]), p1 = R.r() < 0.5, p2 = R.r() < 0.5;
  const par = p1 === p2;   // dos veces lo mismo → paralelas; una de cada → perpendiculares
  return { q: S.m7.gr_pos_q(r, s, t, p1, p2), kind: "choice", opts: S.m7.gr_poss, correct: par ? 0 : 1, shuffle: false,
    sol: S.m7.gr_pos_s(r, s, t, p1, p2, par) };
});

// ── Ángulos en los polígonos ──────────────────────────────────────────
def("m7.an.triangulo", (R, S, H) => {
  const a = R.int(20, 110), b = R.int(15, 160 - a), c = 180 - a - b;
  return { q: S.m7.an_tri_q(a, b), kind: "int", ans: c, sol: S.m7.an_tri_s(a, b, c) };
});
def("m7.an.cuadrilatero", (R, S, H) => {
  const a = R.int(50, 130), b = R.int(50, 130), c = R.int(40, 130), d = 360 - a - b - c;
  if (d < 20 || d > 170) return null;   // sin cóncavos (ángulo de más de 180°): se ven en la unidad 9
  return { q: S.m7.an_cua_q(a, b, c), kind: "int", ans: d, sol: S.m7.an_cua_s(a, b, c, d) };
});
def("m7.an.poligono", (R, S, H) => {
  const n = R.pick([5, 6, 7, 8, 9, 10, 12]), name = S.m7.an_pols[n], sum = 180 * (n - 2);
  if (R.r() < 0.5 || n === 7) return { q: S.m7.an_pol_q(n, name), kind: "int", ans: sum, sol: S.m7.an_pol_s(n, sum) };
  const r = sum / n;   // sin el heptágono: siempre exacto (108°, 120°, 135°, 140°, 144°, 150°)
  return { q: S.m7.an_reg_q(n, name), kind: "num", ans: r, tol: 0.01, sol: S.m7.an_reg_s(n, sum, H.dec(r, 2)) };
});
def("m7.an.notables", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const d = R.int(3, 25); return { q: S.m7.an_med_q(d), kind: "int", ans: d, sol: S.m7.an_med_s(d) }; }
  if (k === 1) { const l = R.int(4, 40), r = l / 2; return { q: S.m7.an_med2_q(l), kind: "num", ans: r, sol: S.m7.an_med2_s(l, H.dec(r)) }; }
  const a = R.int(10, 179), r = a / 2;
  return { q: S.m7.an_bis_q(a), kind: "num", ans: r, sol: S.m7.an_bis_s(a, H.dec(r), a % 2 ? `${(a - 1) / 2}° 30′` : "") };
});
def("m7.an.reloj", (R, S, H) => {
  const h = R.int(1, 12), m = R.pick([0, 0, 30, 15, 45, 20, 10]);
  const ah = (h % 12) * 30 + m * 0.5, am = m * 6;
  const diff = Math.abs(ah - am), d = diff > 180 ? 360 - diff : diff;
  const big = Math.max(ah, am), small = Math.min(ah, am);
  return { q: S.m7.an_reloj_q(h, String(m).padStart(2, "0")) + "<br>" + SV.clock(h, m, 120), kind: "num", ans: d, tol: 0.01,
    sol: S.m7.an_reloj_s(h, m, H.dec(ah, 1), am, H.dec(big, 1), H.dec(small, 1), H.dec(diff, 1), diff > 180, H.dec(d, 1), d % 1 ? `${Math.floor(d)}° 30′` : "") };
});
})();
