/* WikiAula — Matemáticas, Grado 12 · Unidades 4–6: Vectores en el espacio,
   Rectas y planos y Problemas métricos. Textos: i18n/<lang>/mat12u4.js (S.m12). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, gcd } = WA.MATH;
const rd = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const v3 = (R, lo = -5, hi = 5) => [R.int(lo, hi), R.int(lo, hi), R.int(lo, hi)];
const nz3 = R => { let v; do v = v3(R, -4, 4); while (v.every(x => !x)); return v; };
const sub = (a, b) => a.map((x, i) => x - b[i]);
const add = (a, b) => a.map((x, i) => x + b[i]);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => Math.sqrt(dot(a, a));
const isZero = a => a.every(x => !x);
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pn = n => n < 0 ? `(${neg(n)})` : String(n);   // negativo entre paréntesis
const dec = x => String(x).replace("-", "−").replace(".", WA.H.ds);
const vt = a => `(${a.map(neg).join(", ")})`;
// suma de términos con su signo: [1, 0, −6] → «1 + 0 − 6»
const sumTxt = xs => xs.map((x, i) => i ? (x < 0 ? ` − ${-x}` : ` + ${x}`) : neg(x)).join("");
const dotTxt = (a, b) => a.map((x, i) => `${pn(x)}·${pn(b[i])}`).join(" + ");
const vtexM = rows => "$\\begin{vmatrix}" + rows.map(r => r.join(" & ")).join(" \\\\ ") + "\\end{vmatrix}$";
// Sarrus de las filas u, v, w: [[productos que suman], [productos que restan]]
const sarrus = (u, v, w) => [[u[0] * v[1] * w[2], u[1] * v[2] * w[0], u[2] * v[0] * w[1]], [u[2] * v[1] * w[0], u[0] * v[2] * w[1], u[1] * v[0] * w[2]]];
const simp = v => { const g = Math.abs(v.reduce((a, b) => gcd(a, b), 0)) || 1; return v.map(x => x / g); };
const parallel = (a, b) => isZero(cross(a, b));
// sustitución de un punto en Ax + By + Cz + D: «2·(−1) − 3 + 4 − 4»
function subsTxt(n, P, D) {
  let s = "";
  n.forEach((c, i) => {
    if (!c) return;
    const a = Math.abs(c), t = a === 1 ? pn(P[i]) : `${a}·${pn(P[i])}`;
    s += s ? (c < 0 ? " − " : " + ") + t : (c < 0 ? "−" : "") + t;
  });
  if (D) s += (D < 0 ? " − " : " + ") + Math.abs(D);
  return s;
}
const sq = n => { const r = Math.round(Math.sqrt(n)); return r * r === n ? String(r) : `√${n}`; };
// Vectores de módulo entero (ternas pitagóricas en 3D)
const NICE = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [4, 4, 7], [3, 4, 12], [2, 1, 2], [0, 3, 4], [6, 2, 3]];
const niceVec = R => { const v = R.shuffle(R.pick(NICE).slice()); return v.map(x => R.r() < 0.5 ? -x : x); };
function plane(n, d) {   // "2x − y + 3z − 4 = 0"
  const V = ["x", "y", "z"];
  let s = "";
  n.forEach((c, i) => { if (!c) return; const a = Math.abs(c), t = (a === 1 ? "" : a) + V[i]; s += s ? (c < 0 ? " − " : " + ") + t : (c < 0 ? "−" : "") + t; });
  if (d) s += (d < 0 ? " − " : " + ") + Math.abs(d);
  return s + " = 0";
}

// ═════ Unidad 4 · Vectores en el espacio ═════
def("m12.ve.operaciones", (R, S) => {
  const k = R.int(0, 4);
  if (k === 3) {   // punto medio (coordenadas de la misma paridad: sale entero)
    const A = v3(R), B = A.map(x => x + 2 * R.int(-4, 4)), M = A.map((x, i) => (x + B[i]) / 2);
    return { q: S.m12.ve_pm_q(vt(A), vt(B)), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: M[i] })),
      sol: S.m12.ve_pm_s(A.map((x, i) => `(${neg(x)} + ${pn(B[i])})/2 = ${neg(M[i])}`).join("; "), vt(M)) };
  }
  if (k === 4) {   // ¿alineados? C = A + t·AB (sí) o desplazado en una coordenada (no)
    const A = v3(R, -4, 4), u = nz3(R), t = R.pick([2, 3, -1, -2]), on = R.r() < 0.5, C = add(A, u.map(x => t * x)), B = add(A, u);
    const i = u.findIndex(x => x), e = R.pick([0, 1, 2].filter(j => j !== i));
    if (!on) C[e] += rnz(R, -2, 2);
    const AB = sub(B, A), AC = sub(C, A);
    const why = on ? S.m12.ve_al_si(vt(AB), vt(AC), neg(t)) : S.m12.ve_al_no(vt(AB), vt(AC), ["x", "y", "z"][i], neg(t), ["x", "y", "z"][e], `${neg(t)}·${pn(AB[e])} = ${neg(t * AB[e])}`, neg(AC[e]));
    return { q: S.m12.ve_al_q(vt(A), vt(B), vt(C)), kind: "choice", opts: S.m12.yesno, correct: on ? 0 : 1, shuffle: false, sol: why };
  }
  if (k === 0) { const u = v3(R), v = v3(R), a = R.pick([2, 3, -1, -2]), r = add(u.map(x => a * x), v); return { q: S.m12.ve_comb_q(vt(u), vt(v), `${a === -1 ? "−" : neg(a)}u + v`), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: r[i] })), sol: S.m12.ve_comb_s(vt(r)) }; }
  if (k === 1) { const A = v3(R), B = v3(R), r = sub(B, A); return { q: S.m12.ve_ab_q(vt(A), vt(B)), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: r[i] })), sol: S.m12.ve_ab_s(vt(r)) }; }
  const u = niceVec(R); return { q: S.m12.ve_mod_q(vt(u)), kind: "num", ans: norm(u), sol: S.m12.ve_mod_s(u.map(x => x * x).join(" + "), dot(u, u), norm(u)) };
});
def("m12.ve.escalar", (R, S) => {
  if (R.r() < 0.2) {   // proyección escalar de u sobre v (|v| entero)
    const u = v3(R, -4, 4), v = niceVec(R), d = dot(u, v), m = norm(v), r = rd(d / m, 2);
    if (!d) return null;
    return { q: S.m12.ve_pr_q(vt(u), vt(v)), kind: "num", ans: r, tol: 0.011,
      sol: S.m12.ve_pr_s(`${dotTxt(u, v)} = ${neg(d)}`, `√(${v.map(x => x * x).join(" + ")}) = ${m}`, `${neg(d)}/${m}`, Number.isInteger(d / m), dec(r)) };
  }
  if (R.r() < 0.45) { const u = v3(R), v = v3(R); return { q: S.m12.ve_esc_q(vt(u), vt(v)), kind: "int", ans: dot(u, v), sol: S.m12.ve_esc_s(`${dotTxt(u, v)} = ${sumTxt(u.map((x, i) => x * v[i]))}`, dot(u, v)) }; }
  if (R.r() < 0.5) {   // valor de a para que sean perpendiculares
    let u, v0, v1, rest;
    do { u = [R.int(-4, 4), R.int(-4, 4), rnz(R, -4, 4)]; v0 = R.int(-5, 5); v1 = R.int(-5, 5); rest = u[0] * v0 + u[1] * v1; } while (rest % u[2] || Math.abs(rest / u[2]) > 9);
    return { q: S.m12.ve_perp_q(vt(u), `(${neg(v0)}, ${neg(v1)}, a)`), kind: "int", ans: -rest / u[2] || 0, sol: S.m12.ve_perp_s(rest, u[2], -rest / u[2] || 0) };
  }
  const u = niceVec(R), v = niceVec(R), c = dot(u, v) / (norm(u) * norm(v)), ang = Math.acos(c) * 180 / Math.PI;
  return { q: S.m12.ve_ang_q(vt(u), vt(v)), kind: "num", ans: rd(ang, 1), tol: 0.15, sol: S.m12.ve_ang_s(dot(u, v), norm(u), norm(v), rd(ang, 1)) };
});
def("m12.ve.vectorial", (R, S) => {
  let u, v, w;
  do { u = v3(R, -3, 3); v = v3(R, -3, 3); w = cross(u, v); } while (isZero(w));
  // los tres determinantes de orden 2 (tapando la columna de cada componente), como en la lección
  const d2 = (i, j) => `${vtexM([[u[i], u[j]], [v[i], v[j]]])} = ${pn(u[i])}·${pn(v[j])} − ${pn(u[j])}·${pn(v[i])} = ${neg(u[i] * v[j] - u[j] * v[i])}`;
  const steps = S.m12.ve_vec_steps(d2(1, 2), d2(0, 2), neg(w[1]), d2(0, 1));
  const x = R.r();
  if (x < 0.5) return { q: S.m12.ve_vec_q(vt(u), vt(v)), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: w[i] })),
    sol: S.m12.ve_vec_s(steps, vt(w), `${dotTxt(u, w)} = 0`, `${dotTxt(v, w)} = 0`) };
  const a = dot(w, w);
  if (x < 0.75) return { q: S.m12.ve_par_q(vt(u), vt(v)), kind: "num", ans: rd(Math.sqrt(a), 2), tol: 0.011, sol: steps + " " + S.m12.ve_par_s(vt(w), sq(a), rd(Math.sqrt(a), 2), Number.isInteger(Math.sqrt(a))) };
  // área del triángulo ABC: AB = u y AC = v
  const A = v3(R, -3, 3), B = add(A, u), C = add(A, v), r = rd(Math.sqrt(a) / 2, 2);
  return { q: S.m12.pm_tri_q(vt(A), vt(B), vt(C)), kind: "num", ans: r, tol: 0.011,
    sol: S.m12.ve_tri_s(vt(u), vt(v), steps, vt(w), sq(a), Number.isInteger(Math.sqrt(a) / 2) ? "=" : "≈", dec(r)) };
});
def("m12.ve.mixto", (R, S) => {
  const u = v3(R, -3, 3), v = v3(R, -3, 3);
  if (R.r() < 0.35) {   // coplanarios
    // un mismo escalar para todo el vector (antes se sorteaba uno por coordenada y casi nunca salían coplanarios)
    const cop = R.r() < 0.5, ka = R.int(-2, 2), kb = R.int(1, 2), w = cop ? add(u.map(x => ka * x), v.map(x => kb * x)) : v3(R, -3, 3);
    const m = dot(cross(u, v), w), [pl, mi] = sarrus(u, v, w);
    const body = S.m12.ve_cop_s(m, vtexM([u, v, w]), sumTxt(pl), neg(pl.reduce((a, b) => a + b)), sumTxt(mi), neg(mi.reduce((a, b) => a + b)));
    const p = R.int(0, 2);
    if (p === 1) {   // cuatro puntos: A, B = A + u, C = A + v, D = A + w
      const A = v3(R, -3, 3);
      return { q: S.m12.ve_cop4_q(vt(A), vt(add(A, u)), vt(add(A, v)), vt(add(A, w))), kind: "choice", opts: S.m12.yesno, correct: m === 0 ? 0 : 1, shuffle: false,
        sol: S.m12.ve_cop4_s(vt(u), vt(v), vt(w)) + body.replace(/<b>(sí|no)<\/b> son coplanarios[^.]*\./, m ? "los cuatro puntos <b>no</b> están en un mismo plano." : "los cuatro puntos <b>sí</b> están en un mismo plano.") };
    }
    if (p === 2) {   // ¿forman base? (al revés que coplanarios)
      return { q: S.m12.ve_base_q(vt(u), vt(v), vt(w)), kind: "choice", opts: S.m12.yesno, correct: m === 0 ? 1 : 0, shuffle: false,
        sol: body.replace(/<b>(sí|no)<\/b> son coplanarios[^.]*\./, m ? "<b>sí</b> forman base (no son coplanarios: son linealmente independientes)." : "<b>no</b> forman base (son coplanarios: uno es combinación de los otros dos).") };
    }
    return { q: S.m12.ve_cop_q(vt(u), vt(v), vt(w)), kind: "choice", opts: S.m12.ve_cop_o, correct: m === 0 ? 0 : 1, shuffle: false, sol: body };
  }
  if (!cross(u, v).some(x => x)) return null;   // u y v paralelos: el bucle de abajo no acabaría nunca
  let w, m; do { w = v3(R, -3, 3); m = dot(cross(u, v), w); } while (!m);
  const t = R.int(0, 2), vol = t > 0, [pl, mi] = sarrus(u, v, w), P = pl.reduce((a, b) => a + b), M = mi.reduce((a, b) => a + b);
  if (t === 2) {   // volumen del tetraedro ABCD: (1/6)·|[AB, AC, AD]|
    const A = v3(R, -3, 3), r = rd(Math.abs(m) / 6, 2);
    return { q: S.m12.pm_tet_q(vt(A), vt(add(A, u)), vt(add(A, v)), vt(add(A, w))), kind: "num", ans: r, tol: 0.006,
      sol: S.m12.ve_tet_s(vt(u), vt(v), vt(w), vtexM([u, v, w]), sumTxt(pl), neg(P), sumTxt(mi), neg(M), `${neg(P)} − ${pn(M)} = ${neg(m)}`, Math.abs(m), Math.abs(m) % 6 === 0 ? "=" : "≈", dec(r)) };
  }
  // [u, v, w] = u · (v × w): el determinante con u, v y w por filas (la definición de la lección)
  return { q: (vol ? S.m12.ve_vol_q : S.m12.ve_mix_q)(vt(u), vt(v), vt(w)), kind: "int", ans: vol ? Math.abs(m) : m,
    sol: S.m12.ve_mix_s(m, vol, vtexM([u, v, w]), sumTxt(pl), neg(P), sumTxt(mi), neg(M), `${neg(P)} − ${pn(M)}`) };
});

// ═════ Unidad 5 · Rectas y planos ═════
def("m12.rp.recta", (R, S) => {
  const P = v3(R), d = nz3(R), k = R.int(0, 2);
  if (k === 0) { const kq = R.int(1, 3), Q = add(P, d.map(x => x * kq)), dd = sub(Q, P), g = Math.abs(dd.reduce((a, b) => gcd(a, b), 0)) || 1; return { q: S.m12.rp_dos_q(vt(P), vt(Q)), kind: "choice", ...opts4(R, vt(dd.map(x => x / g)), [vt(add(P, Q)), vt(P), vt(dd.map(x => x / g + 1))]), sol: S.m12.rp_dos_s(vt(dd), vt(dd.map(x => x / g)), g, vt(dd.map(x => -2 * x / g))) }; }
  const t = R.int(-3, 3), on = R.r() < 0.5, Q = add(P, d.map(x => x * t)), L = ["x", "y", "z"];
  if (on) return { q: S.m12.rp_pert_q(eqParam(P, d), vt(Q)), kind: "choice", opts: S.m12.yesno, correct: 0, shuffle: false, sol: S.m12.rp_pert_s(true, t) };
  // Se desplaza el punto en una coordenada que no lo deje en la recta: una en la que el director es 0 (esa coordenada
  // es constante en la recta) o, si no hay ninguna, la z (el desplazamiento (0, 0, k) no es paralelo a d).
  const zeros = [0, 1, 2].filter(i => !d[i]), c = zeros.length ? R.pick(zeros) : 2, Qx = Q.slice();
  Qx[c] += rnz(R, -2, 2);
  let why;
  if (!d[c]) why = S.m12.rp_pert_const(L[c], neg(P[c]), neg(Qx[c]));
  else { const j = [0, 1].find(i => d[i]); why = S.m12.rp_pert_lam(L[j], neg(Qx[j]), eqParam(P, d).split("; ")[j].replace(/^. = /, ""), neg(t), L[c], neg(Q[c]), neg(Qx[c])); }
  return { q: S.m12.rp_pert_q(eqParam(P, d), vt(Qx)), kind: "choice", opts: S.m12.yesno, correct: 1, shuffle: false, sol: S.m12.rp_pert_s(false, t, why) };
});
function perpTo(R, d) {   // vector normal perpendicular a d (recta paralela o contenida)
  for (;;) { const n = nz3(R); const c = cross(d, n); if (!isZero(c)) return c.map(x => x) ; }
}
function opts4(R, ok, alts) { const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 4)); return { opts, correct: opts.indexOf(ok) }; }
function eqParam(P, d, par = "λ") {
  const L = ["x", "y", "z"];
  return L.map((l, i) => {
    const t = (Math.abs(d[i]) === 1 ? "" : Math.abs(d[i])) + par;
    if (!d[i]) return `${l} = ${neg(P[i])}`;
    return P[i] ? `${l} = ${neg(P[i])}${d[i] < 0 ? " − " : " + "}${t}` : `${l} = ${d[i] < 0 ? "−" : ""}${t}`;
  }).join("; ");
}
def("m12.rp.plano", (R, S) => {
  const P = v3(R), n = nz3(R), d = -dot(n, P);
  if (R.r() < 0.5) return { q: S.m12.rp_pn_q(vt(P), vt(n)), kind: "int", ans: d, sol: S.m12.rp_pn_s(plane(n, 0).replace(" = 0", ""), vt(P), d, plane(n, d)) };
  let u, v, nn; do { u = v3(R, -3, 3); v = v3(R, -3, 3); nn = cross(u, v); } while (isZero(nn) || nn.some(x => Math.abs(x) > 15));
  const g = Math.abs(nn.reduce((a, b) => gcd(a, b), 0)) || 1, nr = nn.map(x => x / g), D0 = -dot(nn, P);
  // la ecuación completa con n = AB × AC (o u × v) sin simplificar, para que la respuesta sea única
  const fields = S.m12.rp_coefs.map((l, i) => ({ label: l, ans: i < 3 ? nn[i] : D0 }));
  const cr = `(${pn(u[1])}·${pn(v[2])} − ${pn(u[2])}·${pn(v[1])}, −(${pn(u[0])}·${pn(v[2])} − ${pn(u[2])}·${pn(v[0])}), ${pn(u[0])}·${pn(v[1])} − ${pn(u[1])}·${pn(v[0])})`;
  const tail = S.m12.rp_simp(g, vt(nr), plane(nr, -dot(nr, P)));
  if (R.r() < 0.6) return { q: S.m12.rp_3p_q(vt(P), vt(add(P, u)), vt(add(P, v))), kind: "fields", fields,
    sol: S.m12.rp_3p_s(vt(u), vt(v), cr, vt(nn), vt(P), subsTxt(nn, P, 0), neg(D0), plane(nn, D0)) + tail };
  // plano que contiene a r (punto P, director u) y es paralelo a s (director v)
  const Q = v3(R, -3, 3);
  return { q: S.m12.rp_rs_q(eqParam(P, u), eqParam(Q, v, "μ")), kind: "fields", fields,
    sol: S.m12.rp_rs_s(vt(u), vt(v), cr, vt(nn), vt(P), subsTxt(nn, P, 0), neg(D0), plane(nn, D0)) + tail };
});
def("m12.rp.posicion", (R, S) => {
  const x = R.r(), k = x < 0.3 ? 0 : x < 0.6 ? 1 : x < 0.88 ? 2 : 3;
  if (k === 2) {   // dos rectas: coincidentes, paralelas, secantes o se cruzan
    const t = R.int(0, 3), A = v3(R, -3, 3), u = nz3(R);
    let v, B;
    if (t < 2) {
      const kv = R.pick([1, -1, 2]), kb = rnz(R, -2, 2);   // un solo escalar para todo el vector
      v = u.map(c => kv * c);
      B = add(A, u.map(c => c * kb));
      if (t === 1) { const zs = [0, 1, 2].filter(i => !u[i]); B[zs.length ? R.pick(zs) : 2] += rnz(R, -2, 2); }
    } else {
      do v = nz3(R); while (parallel(u, v));
      if (t === 2) { const s1 = R.int(-2, 2), s2 = R.int(-2, 2), X = add(A, u.map(c => c * s1)); B = sub(X, v.map(c => c * s2)); }
      else { let m; do { B = v3(R, -3, 3); m = dot(sub(B, A), cross(u, v)); } while (!m); }
    }
    const AB = sub(B, A), m = dot(AB, cross(u, v)), [pl, mi] = sarrus(AB, u, v);
    const sol = t < 2 ? S.m12.rp_rr_s(t, vt(u), vt(v), vt(AB)) : S.m12.rp_rr_s(t, vt(u), vt(v), vt(AB), vtexM([AB, u, v]), sumTxt(pl), sumTxt(mi), neg(m));
    return { q: S.m12.rp_rr_q(eqParam(A, u), eqParam(B, v, "μ")), kind: "choice", opts: S.m12.rp_rr_o, correct: t, shuffle: false, sol };
  }
  if (k === 3) {   // punto de corte de una recta y un plano
    const P = v3(R, -3, 3), d = nz3(R);
    let n; do n = simp(nz3(R)); while (!dot(n, d) || Math.abs(dot(n, d)) > 12);
    const t = rnz(R, -3, 3), X = add(P, d.map(c => c * t)), D = -dot(n, X), nd = dot(n, d), c0 = dot(n, P) + D;
    return { q: S.m12.rp_corte_q(eqParam(P, d), plane(n, D)), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: X[i] })),
      sol: S.m12.rp_corte_s(neg(nd), neg(c0), neg(t), vt(X)) };
  }
  if (k === 0) {   // dos planos
    const n = nz3(R), d = R.int(-6, 6), t = R.int(0, 2);
    let n2, d2;
    if (t === 0) { const m = R.pick([2, -1, 3]); n2 = n.map(x => m * x); d2 = m * d; }
    else if (t === 1) { const m = R.pick([2, -1, 3]); n2 = n.map(x => m * x); d2 = m * d + rnz(R, -4, 4); }
    else { do n2 = nz3(R); while (isZero(cross(n, n2))); d2 = R.int(-6, 6); }
    return { q: S.m12.rp_pp_q(plane(n, d), plane(n2, d2)), kind: "choice", opts: S.m12.rp_pp_o, correct: t, shuffle: false, sol: S.m12.rp_pp_s[t] };
  }
  const P = v3(R), d = nz3(R), n = simp(R.r() < 0.6 ? perpTo(R, d) : nz3(R));   // normal simplificado (sin «16x + 16y…»)
  const dd = -dot(n, P) + (R.r() < 0.5 ? 0 : rnz(R, -3, 3));
  const kk = dot(d, n) !== 0 ? 2 : dot(n, P) + dd === 0 ? 0 : 1;
  return { q: S.m12.rp_rp_q(eqParam(P, d), plane(n, dd)), kind: "choice", opts: S.m12.rp_rp_o, correct: kk, shuffle: false,
    sol: S.m12.rp_rp_s(vt(d), vt(n), dotTxt(d, n), neg(dot(d, n)), vt(P), subsTxt(n, P, dd), neg(dot(n, P) + dd), kk) };
});

// ═════ Unidad 6 · Problemas métricos ═════
def("m12.pm.distancia", (R, S) => {
  const x = R.r(), k = x < 0.2 ? 0 : x < 0.45 ? 1 : x < 0.65 ? 2 : x < 0.85 ? 3 : 4;
  if (k === 0) { const A = v3(R), u = niceVec(R), B = add(A, u); return { q: S.m12.pm_pp_q(vt(A), vt(B)), kind: "num", ans: norm(u), sol: S.m12.pm_pp_s(vt(u), norm(u)) }; }
  if (k === 3) {   // de un punto a una recta: |AP × d| / |d|
    const A = v3(R, -3, 3), d = niceVec(R);
    let P, c; do { P = v3(R, -4, 4); c = cross(sub(P, A), d); } while (isZero(c));
    const a = dot(c, c), m = norm(d), r = rd(Math.sqrt(a) / m, 2);
    return { q: S.m12.pm_pr_q(vt(P), eqParam(A, d)), kind: "num", ans: r, tol: 0.011,
      sol: S.m12.pm_pr_s(vt(A), vt(d), vt(sub(P, A)), vt(c), sq(a), m, Number.isInteger(Math.sqrt(a) / m), dec(r)) };
  }
  if (k === 4) {   // entre dos rectas que se cruzan: |[AB, u, v]| / |u × v|
    const A = v3(R, -3, 3); let u, v, B, w, m;
    do { u = nz3(R); v = nz3(R); w = cross(u, v); } while (isZero(w) || dot(w, w) > 120);
    do { B = v3(R, -3, 3); m = dot(sub(B, A), w); } while (!m);
    const AB = sub(B, A), [pl, mi] = sarrus(AB, u, v), a = dot(w, w), r = rd(Math.abs(m) / Math.sqrt(a), 2);
    return { q: S.m12.pm_cruz_q(eqParam(A, u), eqParam(B, v, "μ")), kind: "num", ans: r, tol: 0.011,
      sol: S.m12.pm_cruz_s(vt(A), vt(u), vt(B), vt(v), vt(AB), vtexM([AB, u, v]), sumTxt(pl), sumTxt(mi), neg(m), vt(w), sq(a), Math.abs(m), Number.isInteger(Math.sqrt(a)) && Number.isInteger(Math.abs(m) / Math.sqrt(a)), dec(r)) };
  }
  const n = niceVec(R), P = v3(R), m = norm(n);
  if (k === 1) { const val = R.int(-4, 4) * m, d = val - dot(n, P); return { q: S.m12.pm_pl_q(vt(P), plane(n, d)), kind: "num", ans: Math.abs(val) / m, sol: S.m12.pm_pl_s(subsTxt(n, P, d), Math.abs(val), n.map(c => c * c).join(" + "), m, Math.abs(val) / m) }; }
  const d1 = R.int(-9, 9), d2 = d1 + m * rnz(R, -3, 3);
  // la mitad de las veces el segundo plano viene multiplicado: primero hay que igualar los coeficientes
  const f = R.r() < 0.5 ? R.pick([2, -2, 3, -1]) : 1, pre = f === 1 ? "" : S.m12.pm_2p_pre(f, plane(n, d2));
  return { q: S.m12.pm_2p_q(plane(n, d1), plane(n.map(c => f * c), f * d2)), kind: "num", ans: Math.abs(d1 - d2) / m, sol: pre + S.m12.pm_2p_s(neg(d1), neg(d2), Math.abs(d1 - d2), n.map(c => c * c).join(" + "), m, Math.abs(d1 - d2) / m) };
});
// recta en forma continua (solo si el director no tiene ceros): (x − 1)/2 = y/(−1) = (z + 3)/3
function eqCont(P, d) {
  const L = ["x", "y", "z"];
  return "$" + L.map((l, i) => `\\frac{${P[i] ? `${l} ${P[i] < 0 ? "+" : "-"} ${Math.abs(P[i])}` : l}}{${d[i]}}`).join(" = ") + "$";
}
const recTxt = (R, P, d, par = "λ") => d.every(x => x) && R.r() < 0.6 ? eqCont(P, d) : eqParam(P, d, par);
def("m12.pm.angulo", (R, S) => {
  const u = niceVec(R), v = niceVec(R), c = Math.abs(dot(u, v)) / (norm(u) * norm(v)), t = R.int(0, 2);
  const P = v3(R, -3, 3), Q = v3(R, -3, 3), dt = `${dotTxt(u, v)} = ${neg(dot(u, v))}`;
  if (t === 0) { const ang = rd(Math.acos(c) * 180 / Math.PI, 1); return { q: S.m12.pm_rr_q(recTxt(R, P, u), recTxt(R, Q, v, "μ")), kind: "num", ans: ang, tol: 0.15, sol: S.m12.pm_rr_s(vt(u), vt(v), dt, norm(u), norm(v), Math.abs(dot(u, v)), norm(u) * norm(v), dec(ang)) }; }
  if (t === 1) { const ang = rd(Math.acos(c) * 180 / Math.PI, 1); return { q: S.m12.pm_pp_ang_q(plane(u, R.int(-5, 5)), plane(v, R.int(-5, 5))), kind: "num", ans: ang, tol: 0.15, sol: S.m12.pm_pp_ang_s(vt(u), vt(v), dt, norm(u), norm(v), Math.abs(dot(u, v)), norm(u) * norm(v), dec(ang)) }; }
  const ang = rd(Math.asin(c) * 180 / Math.PI, 1);
  return { q: S.m12.pm_rpl_q(recTxt(R, P, u), plane(v, R.int(-5, 5))), kind: "num", ans: ang, tol: 0.15, sol: S.m12.pm_rpl_s(vt(u), vt(v), dt, norm(u), norm(v), Math.abs(dot(u, v)), norm(u) * norm(v), dec(ang)) };
});
// producto vectorial con sus tres determinantes de orden 2 (texto de la solución)
const crossTxt = (u, v) => {
  const w = cross(u, v);
  return `(${pn(u[1])}·${pn(v[2])} − ${pn(u[2])}·${pn(v[1])}, −(${pn(u[0])}·${pn(v[2])} − ${pn(u[2])}·${pn(v[0])}), ${pn(u[0])}·${pn(v[1])} − ${pn(u[1])}·${pn(v[0])}) = ${vt(w)}`;
};
def("m12.pm.areavol", (R, S) => {
  const A = v3(R, -3, 3);
  let u, v, w; do { u = v3(R, -3, 3); v = v3(R, -3, 3); } while (isZero(cross(u, v)));
  const B = add(A, u), C = add(A, v);
  if (R.r() < 0.5) { const c = cross(u, v), a = dot(c, c), r = rd(Math.sqrt(a) / 2, 2);
    return { q: S.m12.pm_tri_q(vt(A), vt(B), vt(C)), kind: "num", ans: r, tol: 0.011, sol: S.m12.pm_tri_s(vt(u), vt(v), crossTxt(u, v), sq(a), Number.isInteger(Math.sqrt(a) / 2) ? "=" : "≈", dec(r)) }; }
  let m; do { w = v3(R, -3, 3); m = dot(cross(u, v), w); } while (!m);
  const [pl, mi] = sarrus(u, v, w), Pp = pl.reduce((a, b) => a + b), Mm = mi.reduce((a, b) => a + b), r = rd(Math.abs(m) / 6, 2);
  // con dos decimales: 1/6 → 0,17 (la tolerancia acepta también 0,1667)
  return { q: S.m12.pm_tet_q(vt(A), vt(B), vt(C), vt(add(A, w))), kind: "num", ans: r, tol: 0.006,
    sol: S.m12.ve_tet_s(vt(u), vt(v), vt(w), vtexM([u, v, w]), sumTxt(pl), neg(Pp), sumTxt(mi), neg(Mm), `${neg(Pp)} − ${pn(Mm)} = ${neg(m)}`, Math.abs(m), Math.abs(m) % 6 === 0 ? "=" : "≈", dec(r)) };
});
// Proyección y simétrico de un punto: sobre un plano, sobre una recta y respecto de un punto
def("m12.pm.proyeccion", (R, S) => {
  const x = R.r(), sym = R.r() < 0.5, L = ["x", "y", "z"];
  const ans = (H, P, s) => { const X = s ? sub(H.map(c => 2 * c), P) : H; return L.map((l, i) => ({ label: l, ans: X[i] })); };
  if (x < 0.6) {   // plano: n·X + D = 0, P = H + t·n
    let n; do n = simp(nz3(R)); while (dot(n, n) > 14 || n.filter(c => c).length < 2);
    const H = v3(R, -3, 3), t = R.pick([1, -1, 2, -2]), P = add(H, n.map(c => t * c)), D = -dot(n, H), nn = dot(n, n), c0 = dot(n, P) + D;
    const Ps = sub(H.map(c => 2 * c), P);
    return { q: S.m12.pm_pj_q(sym, vt(P), S.m12.pm_pl_name(plane(n, D))), kind: "fields", fields: ans(H, P, sym),
      sol: S.m12.pm_pj_s(vt(P), vt(n), eqParam(P, n), neg(nn), neg(c0), neg(-t), vt(H)) + (sym ? S.m12.pm_sym_s(vt(H), vt(P), vt(Ps)) : "") };
  }
  if (x < 0.85) {   // recta: A + λd; H = A + s₀d y P = H + w, con w ⟂ d
    let d, w; do { d = nz3(R); w = simp(cross(d, nz3(R))); } while (isZero(w) || dot(d, d) > 14 || w.some(c => Math.abs(c) > 4));
    const A = v3(R, -3, 3), s0 = R.int(-2, 2), H = add(A, d.map(c => s0 * c)), P = add(H, w), dd = dot(d, d), dP = dot(d, P), dA = dot(d, A);
    const Ps = sub(H.map(c => 2 * c), P);
    return { q: S.m12.pm_pj_q(sym, vt(P), S.m12.pm_r_name(eqParam(A, d))), kind: "fields", fields: ans(H, P, sym),
      sol: S.m12.pm_pjr_s(vt(P), vt(d), plane(d, -dP), eqParam(A, d), `${neg(dA)} ${dd > 0 ? "+" : "−"} ${dd}λ = ${neg(dP)}`, neg(s0), vt(H)) + (sym ? S.m12.pm_sym_s(vt(H), vt(P), vt(Ps)) : "") };
  }
  const P = v3(R, -4, 4), Q = v3(R, -3, 3), Ps = sub(Q.map(c => 2 * c), P);   // simétrico respecto de un punto
  return { q: S.m12.pm_sp_q(vt(P), vt(Q)), kind: "fields", fields: L.map((l, i) => ({ label: l, ans: Ps[i] })), sol: S.m12.pm_sp_s(vt(P), vt(Q), vt(Ps)) };
});
// Perpendicular común de dos rectas que se cruzan: los puntos R ∈ r y S ∈ s más próximos
def("m12.pm.perpendicular", (R, S) => {
  let u, v, w; do { u = nz3(R).map(c => Math.sign(c) * Math.min(Math.abs(c), 2)); v = nz3(R).map(c => Math.sign(c) * Math.min(Math.abs(c), 2)); w = simp(cross(u, v)); } while (isZero(w) || w.some(c => Math.abs(c) > 4));
  const R0 = v3(R, -3, 3), k = R.pick([1, -1]), S0 = add(R0, w.map(c => k * c)), l0 = R.int(-2, 2), m0 = R.int(-2, 2);
  const A = sub(R0, u.map(c => l0 * c)), B = sub(S0, v.map(c => m0 * c)), AB = sub(B, A), uu = dot(u, u), vv = dot(v, v), uv = dot(u, v), a1 = dot(AB, u), a2 = dot(AB, v);
  const lam = (c, s) => `${c === 1 ? "" : c === -1 ? "−" : neg(c)}${s}`;
  const eq1 = `${lam(uu, "λ")} ${uv < 0 ? "+" : "−"} ${Math.abs(uv) === 1 ? "" : Math.abs(uv)}μ = ${neg(a1)}`.replace(/ [+−] 0μ/, "");
  const eq2 = `${uv ? lam(uv, "λ") + " " : ""}${uv ? "− " : "−"}${vv === 1 ? "" : vv}μ = ${neg(a2)}`;
  const steps = S.m12.pm_pc_s(eqParam(A, u), eqParam(B, v, "μ"), vt(AB), eq1, eq2, neg(l0), neg(m0), vt(R0), vt(S0), vt(sub(S0, R0)));
  const t = R.int(0, 2), rq = S.m12.pm_pc_q(eqParam(A, u), eqParam(B, v, "μ"));
  if (t === 2) { const a = dot(w, w), r = rd(Math.sqrt(a), 2); return { q: rq + S.m12.pm_pc_qd, kind: "num", ans: r, tol: 0.011, sol: steps + S.m12.pm_pc_d(sq(a), Number.isInteger(Math.sqrt(a)) ? "=" : "≈", dec(r)) }; }
  const X = t === 0 ? R0 : S0;
  return { q: rq + (t === 0 ? S.m12.pm_pc_qr : S.m12.pm_pc_qs), kind: "fields", fields: ["x", "y", "z"].map((l, i) => ({ label: l, ans: X[i] })), sol: steps };
});
})();
