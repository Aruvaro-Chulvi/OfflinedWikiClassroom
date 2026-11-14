/* WikiAula — Matemáticas, Grado 11 · Unidad 5: Vectores en el plano.
   Textos: i18n/<lang>/mat11u5.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F } = WA.MATH;
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const vec = (a, b) => `(${neg(a)}, ${neg(b)})`;
const vF = (H, a, b) => `(${H.dec(a)}; ${H.dec(b)})`;
const fields2 = (S, a, b, kind) => [{ label: S.m11.ve_f[0], kind: kind || "int", ans: a }, { label: S.m11.ve_f[1], kind: kind || "int", ans: b }];
const sq = (a, b) => { const m2 = a * a + b * b, r = Math.sqrt(m2); return Number.isInteger(r) ? String(r) : `√${m2}`; };
const f2 = x => (x < 0 ? "−" : "") + Math.abs(x).toFixed(2).replace(".", WA.H.ds);   // siempre dos decimales: 5,10
const pn = n => n < 0 ? `(${neg(n)})` : String(n);                                // (−4) entre paréntesis
const add = (a, b) => `${neg(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)}`;            // 4 − 9, −10 + 12

def("m11.ve.componentes", (R, S, H) => {
  const A = [R.int(-6, 6), R.int(-6, 6)], B = [R.int(-6, 6), R.int(-6, 6)];
  const v = [B[0] - A[0], B[1] - A[1]];
  return { q: S.m11.ve_comp_q(vec(...A), vec(...B)), kind: "fields", fields: fields2(S, ...v), sol: S.m11.ve_comp_s(`(${neg(B[0])} − ${pn(A[0])}, ${neg(B[1])} − ${pn(A[1])}) = ${vec(...v)}`) };
});
def("m11.ve.modulo", (R, S, H) => {
  if (R.r() < 0.25) {   // vector unitario en la dirección de v (módulo entero)
    const [p, q, h] = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5], [12, 5, 13], [9, 12, 15]]);
    const a = R.r() < 0.5 ? -p : p, b = R.r() < 0.5 ? -q : q, ua = rd(a / h, 2), ub = rd(b / h, 2);
    return { q: S.m11.ve_un_q(vec(a, b)), kind: "fields", fields: fields2(S, ua, ub, "num").map(f => Object.assign(f, { tol: 0.006 })),
      sol: S.m11.ve_un_s(pn(a), pn(b), h, `(${neg(a)}/${h}, ${neg(b)}/${h})`, vF(H, rd(a / h, 2), rd(b / h, 2))) };
  }
  let a = R.int(-9, 9), b = R.int(-9, 9);
  if (!a && !b) a = 3;
  const m = rd(Math.sqrt(a * a + b * b), 2), ex = Number.isInteger(Math.sqrt(a * a + b * b));
  return { q: S.m11.ve_mod_q(vec(a, b)), kind: "num", ans: m, tol: 0.006, sol: S.m11.ve_mod_s(a < 0 ? `(${neg(a)})` : a, b < 0 ? `(${neg(b)})` : b, ex ? m : `√${a * a + b * b} ≈ ${f2(m)}`) };
});
def("m11.ve.combinacion", (R, S, H) => {
  let u, v;   // ni u ni v son el vector nulo
  do { u = [R.int(-5, 5), R.int(-5, 5)]; v = [R.int(-5, 5), R.int(-5, 5)]; } while (!(u[0] || u[1]) || !(v[0] || v[1]));
  const p = rnz(R, -3, 3), q = rnz(R, -3, 3);
  const r = [p * u[0] + q * v[0], p * u[1] + q * v[1]], pu = [p * u[0], p * u[1]], qv = [q * v[0], q * v[1]];
  const e = `${p === 1 ? "" : p === -1 ? "−" : neg(p)}u ${q < 0 ? "−" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}v`;
  const mul = (c, n, w) => c === 1 ? null : c === -1 ? `−${n} = ${vec(-w[0], -w[1])}` : `${neg(c)}${n} = ${neg(c)} · ${vec(...w)} = ${vec(c * w[0], c * w[1])}`;
  const steps = [mul(p, "u", u), mul(q, "v", v)].filter(Boolean);
  return { q: S.m11.ve_comb_q(`${e}, con u = ${vec(...u)} y v = ${vec(...v)}`), kind: "fields", fields: fields2(S, ...r),
    sol: S.m11.ve_comb_s(steps.join("; "), `${vec(...pu)} + ${vec(...qv)} = (${add(pu[0], qv[0])}, ${add(pu[1], qv[1])}) = <b>${vec(...r)}</b>`) };
});
def("m11.ve.puntomedio", (R, S, H) => {
  const fP = (x, y, kind) => [{ label: S.m11.ve_pf[0], kind: kind || "int", ans: x }, { label: S.m11.ve_pf[1], kind: kind || "int", ans: y }];   // un punto: coordenadas, no componentes
  if (R.r() < 0.3) {   // dividir AB en tres partes iguales: P = A + ⅓·AB (o ⅔·AB)
    const A = [R.int(-6, 6), R.int(-6, 6)], v = [3 * rnz(R, -3, 3), 3 * R.int(-3, 3)], two = R.r() < 0.5, k = two ? 2 : 1;
    const B = [A[0] + v[0], A[1] + v[1]], P = [A[0] + k * v[0] / 3, A[1] + k * v[1] / 3];
    return { q: S.m11.ve_tri_q(vec(...A), vec(...B), two), kind: "fields", fields: fP(...P),
      sol: S.m11.ve_tri_s(vec(...v), two ? "⅔" : "⅓", vec(k * v[0] / 3, k * v[1] / 3), `${vec(...A)} + ${vec(k * v[0] / 3, k * v[1] / 3)} = <b>${vec(...P)}</b>`) };
  }
  const A = [R.int(-8, 8), R.int(-8, 8)], B = [R.int(-8, 8), R.int(-8, 8)], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const dec = !Number.isInteger(M[0]) || !Number.isInteger(M[1]);   // punto y coma solo si hay decimales
  return { q: S.m11.ve_pm_q(vec(...A), vec(...B)), kind: "fields", fields: fP(M[0], M[1], "num"),
    sol: S.m11.ve_pm_s(`((${add(A[0], B[0])})/2, (${add(A[1], B[1])})/2)`, dec ? vF(H, ...M) : vec(...M)) };
});
def("m11.ve.escalar", (R, S, H) => {
  let u, v;   // sin el vector nulo
  do { u = [R.int(-7, 7), R.int(-7, 7)]; v = [R.int(-7, 7), R.int(-7, 7)]; } while (!(u[0] || u[1]) || !(v[0] || v[1]));
  const r = u[0] * v[0] + u[1] * v[1];
  return { q: S.m11.ve_esc_q(vec(...u), vec(...v)), kind: "int", ans: r, sol: S.m11.ve_esc_s(`${neg(u[0])} · ${v[0] < 0 ? "(" + neg(v[0]) + ")" : v[0]} + ${u[1] < 0 ? "(" + neg(u[1]) + ")" : u[1]} · ${v[1] < 0 ? "(" + neg(v[1]) + ")" : v[1]}`, neg(r)) };
});
def("m11.ve.angulo", (R, S, H) => {
  if (R.r() < 0.35) {   // el ángulo en A de un triángulo dado por sus vértices
    const A = [R.int(-4, 4), R.int(-4, 4)];
    let B, C; do { B = [R.int(-5, 6), R.int(-5, 6)]; C = [R.int(-5, 6), R.int(-5, 6)]; } while ((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) === 0);
    const u = [B[0] - A[0], B[1] - A[1]], v = [C[0] - A[0], C[1] - A[1]];
    const dot = u[0] * v[0] + u[1] * v[1], c = dot / (Math.hypot(...u) * Math.hypot(...v)), a = rd(Math.acos(c) * 180 / Math.PI, 2);
    const ex = Math.abs(c - rd(c, 4)) < 1e-12;
    return { q: S.m11.ve_angt_q(vec(...A), vec(...B), vec(...C)), kind: "num", ans: a, tol: 0.02,
      sol: S.m11.ve_angt_s(vec(...u), vec(...v), `${neg(u[0])} · ${pn(v[0])} + ${pn(u[1])} · ${pn(v[1])} = ${neg(dot)}`) + " " + S.m11.ve_ang_s(neg(dot), sq(...u), sq(...v), ex ? H.dec(c) : (c < 0 ? "−" : "") + Math.abs(rd(c, 4)).toFixed(4).replace(".", WA.H.ds), Number.isInteger(a) ? String(a) : f2(a), ex) };
  }
  let u, v;
  do { u = [R.int(-6, 6), R.int(-6, 6)]; v = [R.int(-6, 6), R.int(-6, 6)]; } while (!(u[0] || u[1]) || !(v[0] || v[1]));
  const dot = u[0] * v[0] + u[1] * v[1], m1 = Math.hypot(...u), m2 = Math.hypot(...v), c = dot / (m1 * m2), a = rd(Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI, 2);
  return { q: S.m11.ve_ang_q(vec(...u), vec(...v)), kind: "num", ans: a, tol: 0.02, sol: S.m11.ve_ang_s(neg(dot), sq(...u), sq(...v), Math.abs(c - rd(c, 4)) < 1e-12 ? H.dec(c) : (c < 0 ? "−" : "") + Math.abs(rd(c, 4)).toFixed(4).replace(".", WA.H.ds), Number.isInteger(a) ? String(a) : f2(a), Math.abs(c - rd(c, 4)) < 1e-12) };
});
def("m11.ve.perpendicular", (R, S, H) => {
  // u = (a, k), v = (b, c): a·b + k·c = 0 → k = −ab/c
  const a = rnz(R, -6, 6), b = rnz(R, -6, 6), c = rnz(R, -6, 6), k = F.make(-a * b, c);
  return { q: S.m11.ve_perp_q(`(${neg(a)}, k)`, vec(b, c)), kind: "frac", ans: k, hint: S.m11.ve_hint, sol: S.m11.ve_perp_s(`${neg(a * b)} ${c < 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}k = 0`, F.html(k, H)) };
});
def("m11.ve.paralelo", (R, S, H) => {
  if (R.r() < 0.3) {   // ¿están alineados A, B y C?
    const A = [R.int(-5, 5), R.int(-5, 5)], u = [rnz(R, -3, 3), R.int(-3, 3)], al = R.r() < 0.5;
    const t = R.pick([2, 3, -1, -2]), C = al ? [A[0] + t * u[0], A[1] + t * u[1]] : [A[0] + t * u[0] + rnz(R, -1, 1), A[1] + t * u[1]];
    const B = [A[0] + u[0], A[1] + u[1]], w = [C[0] - A[0], C[1] - A[1]], det = u[0] * w[1] - u[1] * w[0];
    if (!al && det === 0) return null;
    return { q: S.m11.ve_al_q(vec(...A), vec(...B), vec(...C)), kind: "choice", opts: S.m11.ve_al_opts, correct: det === 0 ? 0 : 1, shuffle: false,
      sol: S.m11.ve_al_s(vec(...u), vec(...w), `${neg(u[0])} · ${pn(w[1])} − ${pn(u[1])} · ${pn(w[0])} = ${neg(det)}`, det === 0) };
  }
  // u = (a, b), v = (c, k): a/c = b/k → k = bc/a
  const a = rnz(R, -6, 6), b = rnz(R, -6, 6), c = rnz(R, -6, 6), k = F.make(b * c, a);
  const ak = a === 1 ? "k" : a === -1 ? "−k" : `${neg(a)}k`;
  return { q: S.m11.ve_par_q(vec(a, b), `(${neg(c)}, k)`), kind: "frac", ans: k, hint: S.m11.ve_hint, sol: S.m11.ve_par_s(`${neg(a)}/${pn(c)} = ${neg(b)}/k → ${a === 1 ? `k = ${neg(b)} · ${pn(c)}` : `${ak} = ${neg(b * c)}`}`, F.html(k, H)) };
});
def("m11.ve.proyeccion", (R, S, H) => {
  if (R.r() < 0.3) {   // el vector proyección, con |v| entero
    const [p, q, h] = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]]);
    const v = [R.r() < 0.5 ? -p : p, R.r() < 0.5 ? -q : q];
    let u; do u = [R.int(-6, 6), R.int(-6, 6)]; while (!(u[0] || u[1]) || u[0] * v[0] + u[1] * v[1] === 0);
    const dot = u[0] * v[0] + u[1] * v[1], P = [dot * v[0] / (h * h), dot * v[1] / (h * h)];
    return { q: S.m11.ve_pv_q(vec(...u), vec(...v)), kind: "fields", fields: fields2(S, rd(P[0], 2), rd(P[1], 2), "num").map(f => Object.assign(f, { tol: 0.006 })),
      sol: S.m11.ve_pv_s(neg(dot), h * h, vec(...v), vF(H, rd(P[0], 2), rd(P[1], 2))) };
  }
  let u, v;
  do { u = [R.int(-6, 6), R.int(-6, 6)]; v = [R.int(-6, 6), R.int(-6, 6)]; } while (!(u[0] || u[1]) || !(v[0] || v[1]));
  const dot = u[0] * v[0] + u[1] * v[1], m = Math.hypot(...v), r = rd(dot / m, 2);
  return { q: S.m11.ve_proy_q(vec(...u), vec(...v)), kind: "num", ans: r, tol: 0.011, sol: S.m11.ve_proy_s(neg(dot), sq(...v), Number.isInteger(r) ? neg(r) : f2(r), Number.isInteger(dot / m)) };
});
// Lo nuevo de 1.º: del módulo y el ángulo a las componentes (lo usa Física), la dirección de un vector y las bases.
def("m11.ve.base", (R, S, H) => {
  const T = S.m11.vb_t, k = R.pick([0, 0, 1, 2, 2]);
  if (k === 0) {   // v de módulo r y ángulo θ con el eje X → (r cos θ, r sen θ)
    const r = R.pick([5, 8, 10, 12, 15, 20, 25, 30, 40, 50]), th = R.pick([20, 25, 30, 35, 40, 45, 50, 53, 60, 65, 70, 120, 135, 150, 210, 300]);
    const vx = rd(r * Math.cos(th * Math.PI / 180), 2), vy = rd(r * Math.sin(th * Math.PI / 180), 2);
    const ctx = R.pick(T.ctx);
    return { q: T.q0(ctx, r, th), kind: "fields", fields: fields2(S, vx, vy, "num").map(f => Object.assign(f, { tol: 0.011 })),
      sol: T.s0(r, th, (Number.isInteger(vx) ? "= " : "≈ ") + H.dec(vx, 2), (Number.isInteger(vy) ? "= " : "≈ ") + H.dec(vy, 2), vF(H, vx, vy)) };
  }
  if (k === 1) {   // dirección: ángulo con el semieje X positivo
    let a, b; do { a = rnz(R, -9, 9); b = rnz(R, -9, 9); } while (Math.abs(a) === Math.abs(b));
    const calc = Math.atan(b / a) * 180 / Math.PI, add = a < 0 ? 180 : b < 0 ? 360 : 0, ang = Math.round((calc + add) * 100) / 100;
    return { q: T.q1(vec(a, b)), kind: "num", ans: ang, tol: 0.02, sol: T.s1(neg(b), pn(a), H.dec(rd(calc, 2), 2), add, H.dec(ang, 2)) };
  }
  // base: w = a·u + b·v con u, v no paralelos
  let u, v; do { u = [rnz(R, -3, 3), R.int(-3, 3)]; v = [R.int(-3, 3), rnz(R, -3, 3)]; } while (u[0] * v[1] - u[1] * v[0] === 0);
  const a = rnz(R, -3, 3), b = rnz(R, -3, 3), w = [a * u[0] + b * v[0], a * u[1] + b * v[1]];
  const ab = (p, q, r) => { let t = p ? (p === 1 ? "a" : p === -1 ? "−a" : `${neg(p)}a`) : ""; if (q) t += t ? ` ${q < 0 ? "−" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}b` : (q === 1 ? "b" : q === -1 ? "−b" : `${neg(q)}b`); return `${t} = ${neg(r)}`; };
  const e1 = ab(u[0], v[0], w[0]), e2 = ab(u[1], v[1], w[1]);
  return { q: T.q2(vec(...w), vec(...u), vec(...v)), kind: "fields", fields: [{ label: "a", ans: a }, { label: "b", ans: b }],
    sol: T.s2(vec(...u), vec(...v), e1, e2, neg(a), neg(b)) };
});
})();
