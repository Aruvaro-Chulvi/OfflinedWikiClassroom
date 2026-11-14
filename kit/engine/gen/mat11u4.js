/* WikiAula — Matemáticas, Grado 11 · Unidad 4: Trigonometría.
   Textos: i18n/<lang>/mat11u4.js (S.m11). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { F, gcd } = WA.MATH;
const rd = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const RAD = Math.PI / 180;

// Valores exactos de los ángulos notables (texto)
const EX = { sin: { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" }, cos: { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0" }, tan: { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: null } };
const ALL = ["0", "1/2", "−1/2", "√2/2", "−√2/2", "√3/2", "−√3/2", "1", "−1", "√3", "−√3", "√3/3", "−√3/3"];
function refAngle(a) { a = ((a % 360) + 360) % 360; if (a <= 90) return [a, a === 90 || a === 0 ? 4 : 0]; if (a < 180) return [180 - a, 1]; if (a === 180) return [0, 4]; if (a < 270) return [a - 180, 2]; if (a === 270) return [90, 4]; return [360 - a, a === 360 ? 4 : 3]; }
function exact(f, a) {
  const v = Math.round((f === "sin" ? Math.sin(a * RAD) : f === "cos" ? Math.cos(a * RAD) : Math.tan(a * RAD)) * 1e9) / 1e9;
  if (f === "tan" && Math.abs(Math.cos(a * RAD)) < 1e-9) return null;
  const [ref] = refAngle(a);
  const base = EX[f][ref];
  if (base === null) return null;
  if (base === "0") return "0";
  return v < 0 ? "−" + base : base;
}
const quadOf = a => { a = ((a % 360) + 360) % 360; return a > 0 && a < 90 ? 0 : a > 90 && a < 180 ? 1 : a > 180 && a < 270 ? 2 : a > 270 ? 3 : 4; };

def("m11.tr.exacto", (R, S, H) => {
  const f = R.pick(["sin", "cos", "tan"]), a = R.pick([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330, 90, 180, 270]);
  const ok = exact(f, a) ?? S.m11.tr_noex;
  const pool = ALL.filter(x => x !== ok);
  const opts = R.shuffle([ok, ...R.shuffle(pool).slice(0, 3)]);
  const [ref, q] = refAngle(a);
  const ax = { 90: ["el semieje positivo de ordenadas", "(0, 1)"], 180: ["el semieje negativo de abscisas", "(−1, 0)"], 270: ["el semieje negativo de ordenadas", "(0, −1)"] }[a];
  return { q: S.m11.tr_ex_q(S.m11.tr_fn[f], a), kind: "choice", opts, correct: opts.indexOf(ok),
    sol: ax ? S.m11.tr_ex_eje(S.m11.tr_fn[f], a, ax[0], ax[1], f, ok) : S.m11.tr_ex_s(S.m11.tr_fn[f], a, ref, S.m11.tr_cuad[quadOf(a)], ok) };
});
def("m11.tr.signo", (R, S, H) => {
  const f = R.pick(["sin", "cos", "tan"]);
  let a; do a = R.int(1, 359); while (a % 90 === 0);
  const v = f === "sin" ? Math.sin(a * RAD) : f === "cos" ? Math.cos(a * RAD) : Math.tan(a * RAD);
  return { q: S.m11.tr_sig_q(S.m11.tr_fn[f], a), kind: "choice", opts: S.m11.tr_sig_opts, correct: v > 0 ? 0 : 1, shuffle: false, sol: S.m11.tr_sig_s(S.m11.tr_cuad[quadOf(a)], S.m11.tr_fn[f], v > 0) };
});
def("m11.tr.radianes", (R, S, H) => {
  if (R.r() < 0.3) {   // ángulos no notables: 1 rad ≈ 57,3°
    if (R.r() < 0.5) { const r = R.pick([0.5, 1, 1.2, 1.5, 2, 2.5, 3, 4, 5]), d2 = Math.round(r * 18000 / Math.PI) / 100;
      return { q: S.m11.tr_deg_q(H.dec(r)) + S.m11.tr_round, kind: "num", ans: d2, tol: 0.011, sol: S.m11.tr_deg_s2(H.dec(r), H.dec(d2, 2)) }; }
    const g = R.pick([10, 20, 40, 50, 70, 80, 100, 110, 130, 140, 160, 200, 250]), r2 = Math.round(g * Math.PI / 180 * 100) / 100;
    return { q: S.m11.tr_rad_q2(g), kind: "num", ans: r2, tol: 0.011, sol: S.m11.tr_rad_s2(g, H.dec(r2, 2)) };
  }
  const d = R.pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360, 720]);
  const [n, den] = F.make(d, 180), txt = `${n === 1 ? "" : n}π${den === 1 ? "" : "/" + den}`;
  if (R.r() < 0.5) return { q: S.m11.tr_rad_q(d), kind: "expr", ans: `${n}*pi/${den}`, ansHtml: txt, hint: S.m11.tr_hint_pi, sol: S.m11.tr_rad_s(d, txt) };
  return { q: S.m11.tr_deg_q(txt), kind: "num", ans: d, sol: S.m11.tr_deg_s(txt, d) };
});
const TRIP = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
def("m11.tr.pitagorica", (R, S, H) => {
  const [p, q, h] = R.pick(TRIP), quad = R.int(0, 3);
  const s = [1, 1, -1, -1][quad] * p, c = [1, -1, -1, 1][quad] * q;
  const giveSin = R.r() < 0.5;
  const given = giveSin ? [s, h] : [c, h], want = giveSin ? [c, h] : [s, h];
  const fg = giveSin ? "sen" : "cos", fw = giveSin ? "cos" : "sen";
  const rel = `${fw}²α = 1 − (${given[0] < 0 ? "−" + -given[0] : given[0]}/${h})² = ${h * h - given[0] ** 2}/${h * h} → ${fw} α = ±${Math.abs(want[0])}/${h}`;
  return { q: S.m11.tr_pit_q(fg, F.html(F.make(given[0], given[1]), H), S.m11.tr_cuad[quad], fw), kind: "frac", ans: F.make(want[0], want[1]),
    sol: S.m11.tr_pit_s(rel, S.m11.tr_cuad[quad], fw === "sen" ? "seno" : "coseno", want[0] > 0, F.html(F.make(want[0], want[1]), H)) };
});
def("m11.tr.doble", (R, S, H) => {
  // α en el 1.º cuadrante la mitad de las veces; si no, en otro (el signo del coseno importa)
  const [p0, q0, h] = R.pick(TRIP), sw = R.r() < 0.5, p = sw ? q0 : p0, q = sw ? p0 : q0, k = R.int(0, 1);
  const quad = R.r() < 0.5 ? 0 : R.int(1, 3), sp = quad >= 2 ? -p : p, c = quad === 1 || quad === 2 ? -q : q;
  const fs = (n, d) => n < 0 ? `(−${-n}/${d})` : `${n}/${d}`, step = S.m11.tr_dob_cos(`${sp < 0 ? "−" : ""}${p}/${h}`, q, h, S.m11.tr_cuad[quad], c < 0);
  const sv = F.html(F.make(sp, h), H);
  if (k === 0) { const r = F.make(2 * sp * c, h * h); return { q: S.m11.tr_dob_q(sv, "sen 2α", S.m11.tr_cuad[quad]), kind: "frac", ans: r, sol: S.m11.tr_dob_s(step, `sen 2α = 2 sen α cos α = 2 · ${fs(sp, h)} · ${fs(c, h)}`, F.html(r, H)) }; }
  const r = F.make(q * q - p * p, h * h);
  return { q: S.m11.tr_dob_q(sv, "cos 2α", S.m11.tr_cuad[quad]), kind: "frac", ans: r, sol: S.m11.tr_dob_s(step, `cos 2α = cos²α − sen²α = ${q * q}/${h * h} − ${p * p}/${h * h}`, F.html(r, H)) };
});
// Suma, diferencia y ángulo mitad (lo que la lección enseña y la práctica no tenía): valores exactos de 15°, 75°, 105°…
// con la fórmula escrita y sustituida; sen/cos(α ± β) con ternas y cuadrantes; sen/cos(α/2) conocido cos α.
const VAL = { "1/2": [1, 0], "−1/2": [-1, 0], "√3/2": [0, 1], "−√3/2": [0, -1] };   // en mitades: [enteros, √3]
def("m11.tr.suma", (R, S, H) => {
  const T = S.m11.su_t, k = R.pick([0, 0, 1, 2]);
  if (k === 0) {
    const [th, al, plus] = R.pick([[15, 60, false], [75, 30, true], [105, 60, true], [165, 120, true], [195, 150, true], [255, 210, true], [285, 240, true], [345, 300, true]]);
    const f = R.r() < 0.5 ? "sin" : "cos";
    const sa = exact("sin", al), ca = exact("cos", al), sq = VAL[sa], cq = VAL[ca];
    // sen(α ± 45°) = (√2/2)(sen α ± cos α); cos(α ± 45°) = (√2/2)(cos α ∓ sen α); con valores en mitades
    const s = plus ? 1 : -1;
    const u = f === "sin" ? [sq, cq.map(v => s * v)] : [cq, sq.map(v => -s * v)];   // dos sumandos (antes de multiplicar por √2/2)
    const term = ([e, r3]) => e ? `${e < 0 ? "−" : ""}√2/4` : `${r3 < 0 ? "−" : ""}√6/4`;
    const n6 = u[0][1] + u[1][1], n2 = u[0][0] + u[1][0];   // coeficiente de √6/4 y de √2/4
    const ok = n6 > 0 && n2 > 0 ? "(√6 + √2)/4" : n6 > 0 ? "(√6 − √2)/4" : n2 > 0 ? "(√2 − √6)/4" : "−(√6 + √2)/4";
    const fn = S.m11.tr_fn[f], sg = plus ? "+" : "−";
    const formula = f === "sin" ? `sen ${al}° cos 45° ${sg} cos ${al}° sen 45°` : `cos ${al}° cos 45° ${plus ? "−" : "+"} sen ${al}° sen 45°`;
    const subs = f === "sin" ? `(${sa})(√2/2) ${sg} (${ca})(√2/2)` : `(${ca})(√2/2) ${plus ? "−" : "+"} (${sa})(√2/2)`;
    const terms = `${term(u[0])} ${term(u[1]).startsWith("−") ? "− " + term(u[1]).slice(1) : "+ " + term(u[1])}`;
    const opts = R.shuffle(["(√6 + √2)/4", "(√6 − √2)/4", "(√2 − √6)/4", "−(√6 + √2)/4"]);
    return { q: S.m11.tr_ex_q(fn, th), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s0(fn, th, al, sg, formula, subs, terms, ok) };
  }
  if (k === 1) {   // sen(α ± β) o cos(α ± β) con sen α, cos β y sus cuadrantes
    const [p1, q1, h1] = R.pick(TRIP), [p2, q2, h2] = R.pick(TRIP);
    const qa = R.int(0, 1), qb = R.pick([0, 3]);   // α en el 1.º o el 2.º; β en el 1.º o el 4.º
    const sa = p1, ca = qa ? -q1 : q1, cb = q2, sb = qb ? -p2 : p2;
    const f = R.r() < 0.5 ? "sin" : "cos", plus = R.r() < 0.6, s = plus ? 1 : -1;
    const num = f === "sin" ? sa * cb + s * ca * sb : ca * cb - s * sa * sb, r = F.make(num, h1 * h2);
    const fr = (n, d) => `${n < 0 ? "(−" : ""}${Math.abs(n)}/${d}${n < 0 ? ")" : ""}`;
    const fn = S.m11.tr_fn[f], sg = plus ? "+" : "−";
    const formula = f === "sin" ? `sen α cos β ${sg} cos α sen β` : `cos α cos β ${plus ? "−" : "+"} sen α sen β`;
    const subs = f === "sin" ? `${fr(sa, h1)} · ${fr(cb, h2)} ${sg} ${fr(ca, h1)} · ${fr(sb, h2)}` : `${fr(ca, h1)} · ${fr(cb, h2)} ${plus ? "−" : "+"} ${fr(sa, h1)} · ${fr(sb, h2)}`;
    const p1s = f === "sin" ? [sa * cb, s * ca * sb] : [ca * cb, -s * sa * sb];
    return { q: T.q1(F.html(F.make(sa, h1), H), S.m11.tr_cuad[qa], F.html(F.make(cb, h2), H), S.m11.tr_cuad[qb], `${fn}(α ${sg} β)`), kind: "frac", ans: r,
      sol: T.s1(`cos α = ${qa ? "−" : ""}${q1}/${h1}`, S.m11.tr_cuad[qa], `sen β = ${qb ? "−" : ""}${p2}/${h2}`, S.m11.tr_cuad[qb], `${fn}(α ${sg} β) = ${formula} = ${subs} = ${p1s[0] < 0 ? "−" : ""}${Math.abs(p1s[0])}/${h1 * h2} ${p1s[1] < 0 ? "−" : "+"} ${Math.abs(p1s[1])}/${h1 * h2}`, F.html(r, H)) };
  }
  // ángulo mitad: cos α = (h² − 2p²)/h², sen(α/2) = p/h, cos(α/2) = ±q/h
  const [p0, q0, h] = R.pick(TRIP), swap = R.r() < 0.5, p = swap ? q0 : p0, q = swap ? p0 : q0;
  const cn = h * h - 2 * p * p, cosA = F.make(cn, h * h);
  const quads = cn > 0 ? [0, 3] : [1, 2], qa = R.pick(quads), half = qa >= 2 ? 1 : 0;   // α/2 en el 1.º o en el 2.º
  const f = R.r() < 0.5 ? "sin" : "cos", val = f === "sin" ? F.make(p, h) : F.make(half ? -q : q, h);
  const cA = `${Math.abs(cn)}/${h * h}`, minus = (f === "sin") === (cn > 0);   // 1 − cos α o 1 + cos α, con el signo ya resuelto
  const inside = `(1 ${minus ? "−" : "+"} ${cA})/2) = ±√(${f === "sin" ? p * p : q * q}/${h * h}`;
  return { q: T.q2(F.html(cosA, H), S.m11.tr_cuad[qa], f === "sin" ? "sen(α/2)" : "cos(α/2)"), kind: "frac", ans: val,
    sol: T.s2(S.m11.tr_cuad[qa], half, f === "sin" ? "sen" : "cos", inside, f === "sin" ? `${p}/${h}` : `${q}/${h}`, F.html(val, H)) };
});
// Las dos soluciones en [0°, 360°) de f(x) = m a partir del ángulo de referencia α (con el valor positivo)
function twoSols(f, neg, al, A) {   // A: el ángulo de referencia ya escrito (30 o 17,46)
  if (f === "sin") return neg ? [[180 + al, `180° + ${A}°`], [360 - al, `360° − ${A}°`]] : [[al, ""], [180 - al, `180° − ${A}°`]];
  if (f === "cos") return neg ? [[180 - al, `180° − ${A}°`], [180 + al, `180° + ${A}°`]] : [[al, ""], [360 - al, `360° − ${A}°`]];
  return neg ? [[180 - al, `180° − ${A}°`], [360 - al, `360° − ${A}°`]] : [[al, ""], [180 + al, `180° + ${A}°`]];
}
const QUADS = { sin: [[0, 1], [2, 3]], cos: [[0, 3], [1, 2]], tan: [[0, 2], [1, 3]] };   // [positiva, negativa]
function solveElem(S, f, v) {   // v texto de un valor notable; devuelve [soluciones, explicación]
  const fn = S.m11.tr_fn[f], sols = [];
  for (let a = 0; a < 360; a += 15) if (exact(f, a) === v) sols.push(a);
  if (v === "0" || v === "1" || v === "−1") return [sols, S.m11.tr_ec_axis(fn, v, sols.map(x => x + "°").join(" y "))];
  const neg = v.startsWith("−"), pos = neg ? v.slice(1) : v;
  let al = 0; for (let a = 1; a < 90; a++) if (exact(f, a) === pos) al = a;
  const q = QUADS[f][neg ? 1 : 0].map(i => S.m11.tr_ord[i]).join(" y el ");
  const two = twoSols(f, neg, al, String(al));
  return [sols, S.m11.tr_ec_ref(fn, pos, al, neg, q, two.map(([x, t]) => t ? `${t} = ${x}°` : `${x}°`).join(" y "))];
}
def("m11.tr.ecuacion", (R, S, H) => {
  const f = R.pick(["sin", "cos", "tan"]), fn = S.m11.tr_fn[f], t = R.r();
  if (t < 0.1 && f !== "tan") {   // |m| > 1: ninguna solución
    const m = WA.H.esn(R.pick(["1,5", "−2", "2", "−1,2", "3"]));
    const opts = S.m11.tr_ec_n;
    return { q: S.m11.tr_ec_nq(`${fn} x = ${m}`), kind: "choice", opts, correct: 0, shuffle: false, sol: S.m11.tr_ec_none(fn, m) };
  }
  if (t < 0.4) {   // valor decimal: la calculadora da el ángulo de referencia
    let m; do m = R.int(-95, 95) / 100; while (Math.abs(m) < 0.1 || [0.5, 0.71, 0.87].includes(Math.abs(Math.round(m * 100) / 100)));
    if (f === "tan") m = Math.round(m * 300) / 100 || 1.5;
    const neg = m < 0, mm = Math.abs(m);
    const al = Math.round((f === "sin" ? Math.asin(mm) : f === "cos" ? Math.acos(mm) : Math.atan(mm)) / RAD * 100) / 100;
    const two = twoSols(f, neg, al, H.dec(al, 2)).map(([x, tt]) => [Math.round(x * 100) / 100, tt]);
    const q = QUADS[f][neg ? 1 : 0].map(i => S.m11.tr_ord[i]).join(" y el ");
    const key = { sin: "sen⁻¹", cos: "cos⁻¹", tan: "tg⁻¹" }[f];
    return { q: S.m11.tr_ec_q(`${fn} x = ${H.dec(m)}`) + S.m11.tr_ec_dec, kind: "set", sep: ";", ans: two.map(([x]) => x), tol: 0.02, hint: S.m11.tr_ec_hint2,
      sol: S.m11.tr_ec_calc(fn, H.dec(mm), key, H.dec(al, 2), neg, q, two.map(([x, tt]) => tt ? `${tt} = ${H.dec(x, 2)}°` : `${H.dec(x, 2)}°`).join(" y "), two.map(([x]) => H.dec(x, 2) + "°").join(", ")) };
  }
  const vals = f === "tan" ? ["0", "1", "−1", "√3", "−√3", "√3/3", "−√3/3"] : ["0", "1/2", "−1/2", "√2/2", "−√2/2", "√3/2", "−√3/2", "1", "−1"];
  const v = R.pick(vals), [sols, expl] = solveElem(S, f, v);
  return { q: S.m11.tr_ec_q(`${fn} x = ${v}`), kind: "set", ans: sols, hint: S.m11.tr_ec_hint, sol: S.m11.tr_ec_s(expl, sols.map(x => x + "°").join(", ")) };
});
// Ecuaciones que se reducen a elementales: de segundo grado en sen x o cos x (con raíces que pueden salir de [−1, 1]),
// con factor común, con el ángulo doble (sen 2x = k · cos x) y con cos 2x.
const RT = [[-1, 1], [-1, 2], [0, 1], [1, 2], [1, 1], [2, 1], [-2, 1], [3, 2]];   // raíz p/q
const RTXT = ([p, q]) => q === 1 ? (p < 0 ? "−" + -p : String(p)) : `${p < 0 ? "−" : ""}${Math.abs(p)}/${q}`;
def("m11.tr.ecuacion2", (R, S, H) => {
  const T = S.m11.e2_t, k = R.pick([0, 0, 0, 1, 1, 2]);
  const solveList = (f, vs) => {   // resuelve f(x) = v para cada v; devuelve [soluciones, textos]
    const all = [], txt = [];
    for (const v of vs) {
      if (Math.abs(v[0] / v[1]) > 1) { txt.push(T.out(S.m11.tr_fn[f], RTXT(v))); continue; }
      const [sols, e] = solveElem(S, f, RTXT(v));
      all.push(...sols); txt.push(e);
    }
    return [[...new Set(all)].sort((a, b) => a - b), txt];
  };
  if (k === 0) {   // a t² + b t + c = 0 con t = sen x o cos x
    let r1, r2; do { r1 = R.pick(RT); r2 = R.pick(RT); } while (r1 === r2 || (Math.abs(r1[0] / r1[1]) > 1 && Math.abs(r2[0] / r2[1]) > 1));
    const f = R.r() < 0.5 ? "sin" : "cos", fn = S.m11.tr_fn[f];
    // (q1 t − p1)(q2 t − p2) = a t² + b t + c
    const a = r1[1] * r2[1], b = -(r1[1] * r2[0] + r2[1] * r1[0]), c = r1[0] * r2[0];
    const tt = `${fn} x`, sg = (n, s2) => n ? `${n < 0 ? " − " : " + "}${Math.abs(n) === 1 && s2 ? "" : Math.abs(n) + (s2 ? " " : "")}${s2}` : "";
    const e = `${a === 1 ? "" : a + " "}${fn}²x${sg(b, tt)}${sg(c, "")} = 0`;
    const [sols, txt] = solveList(f, [r1, r2]);
    const how = c === 0 ? T.fc(tt) : T.t2(tt);
    return { q: S.m11.tr_ec_q(e), kind: "set", ans: sols, hint: S.m11.tr_ec_hint, sol: T.s(how, `${tt} = ${RTXT(r1)} o ${tt} = ${RTXT(r2)}`, txt.join(" "), sols.map(x => x + "°").join(", ")) };
  }
  if (k === 1) {   // sen 2x = k · cos x  →  cos x (2 sen x − k) = 0 ; o sen 2x = k · sen x → sen x (2 cos x − k) = 0
    const kk = R.pick([["1", "1/2"], ["−1", "−1/2"], ["√2", "√2/2"], ["−√2", "−√2/2"], ["√3", "√3/2"], ["−√3", "−√3/2"]]);
    const g = R.r() < 0.5 ? "cos" : "sin", o = g === "cos" ? "sin" : "cos", gn = S.m11.tr_fn[g], on = S.m11.tr_fn[o];
    const coef = kk[0] === "1" ? "" : kk[0] === "−1" ? "−" : kk[0] + " · ";
    const [s1, t1] = solveElem(S, g, "0"), [s2, t2] = solveElem(S, o, kk[1]);
    const sols = [...new Set([...s1, ...s2])].sort((a, b) => a - b);
    return { q: S.m11.tr_ec_q(`sen 2x = ${coef}${gn} x`), kind: "set", ans: sols, hint: S.m11.tr_ec_hint,
      sol: T.d(`2 sen x cos x = ${coef}${gn} x`, `${gn} x · (2 ${on} x ${kk[0].startsWith("−") ? "+ " + kk[0].slice(1) : "− " + kk[0]}) = 0`, `${gn} x = 0`, `${on} x = ${kk[1]}`, `${t1} ${t2}`, sols.map(x => x + "°").join(", ")) };
  }
  // con cos 2x: se escribe con una sola razón y queda de segundo grado
  const [e, how, eq, f, r1, r2] = R.pick([["cos 2x = cos x", "hc", "2 cos²x − 1 = cos x → 2 cos²x − cos x − 1 = 0", "cos", [1, 1], [-1, 2]],
    ["cos 2x + cos x = 0", "hc", "2 cos²x − 1 + cos x = 0 → 2 cos²x + cos x − 1 = 0", "cos", [1, 2], [-1, 1]],
    ["cos 2x = sen x", "hs", "1 − 2 sen²x = sen x → 2 sen²x + sen x − 1 = 0", "sin", [1, 2], [-1, 1]],
    ["cos 2x + sen x = 0", "hs", "1 − 2 sen²x + sen x = 0 → 2 sen²x − sen x − 1 = 0", "sin", [1, 1], [-1, 2]],
    ["2 sen²x + cos x = 1", "hp", "2(1 − cos²x) + cos x = 1 → 2 cos²x − cos x − 1 = 0", "cos", [1, 1], [-1, 2]],
    ["cos 2x = 3 sen x + 2", "hs", "1 − 2 sen²x = 3 sen x + 2 → 2 sen²x + 3 sen x + 1 = 0", "sin", [-1, 2], [-1, 1]]]);
  const [sols, txt] = solveList(f, [r1, r2]), tt = `${S.m11.tr_fn[f]} x`;
  return { q: S.m11.tr_ec_q(e), kind: "set", ans: sols, hint: S.m11.tr_ec_hint, sol: T.c2(T[how], eq, `${tt} = ${RTXT(r1)} o ${tt} = ${RTXT(r2)}`, txt.join(" "), sols.map(x => x + "°").join(", ")) };
});

// ── Triángulos ────────────────────────────────────────────────────────
def("m11.tr.seno", (R, S, H) => {
  if (R.r() < 0.4) {   // dos lados y un ángulo no comprendido: ¿cuántos triángulos? (o el ángulo B, cuando es único)
    const T = S.m11.amb_t, A = R.int(25, 65), b = R.int(6, 16), t = R.pick(["one", "two", "two", "none", "angle"]);
    const hgt = b * Math.sin(A * RAD);
    let a;
    if (t === "one" || t === "angle") a = b + R.int(1, 5);
    else if (t === "two") { const lo = Math.floor(hgt) + 1; if (lo >= b) return null; a = R.int(lo, b - 1); if (Math.abs(a - hgt) < 0.3) return null; }
    else { if (hgt < 3) return null; a = R.int(2, Math.ceil(hgt) - 1); if (hgt - a < 0.3) return null; }
    const sB = b * Math.sin(A * RAD) / a, data = `a = ${a}, b = ${b} y A = ${A}°`;
    const eq = `sen B = b · sen A / a = ${b} · sen ${A}° / ${a} ≈ ${H.dec(sB, 4)}`;
    if (sB > 1) return { q: T.q(data), kind: "choice", opts: T.opts, correct: 0, shuffle: false, sol: T.none(eq) };
    const B1 = rd(Math.asin(sB) / RAD, 2), B2 = rd(180 - Math.asin(sB) / RAD, 2), two = A + B2 < 180;
    if (t === "angle") return { q: S.m11.tr_tri_q(data, "el ángulo B, en grados"), kind: "num", ans: B1, tol: 0.02,
      sol: T.ang(eq, H.dec(B1), H.dec(B2), A, H.dec(rd(A + B2, 2))) };
    return { q: T.q(data), kind: "choice", opts: T.opts, correct: two ? 2 : 1, shuffle: false,
      sol: T.sol(eq, H.dec(B1), H.dec(B2), A, H.dec(rd(A + B1, 2)), H.dec(rd(A + B2, 2)), two) };
  }
  const A = R.int(25, 80), B = R.int(25, 100), C = 180 - A - B;
  if (C < 15) return null;
  const a = R.int(4, 20), b = rd(a * Math.sin(B * RAD) / Math.sin(A * RAD), 2);
  return { q: S.m11.tr_tri_q(`a = ${a}, A = ${A}° y B = ${B}°`, "el lado b"), kind: "num", ans: b, tol: 0.02,
    sol: S.m11.tr_seno_s(`b = a · sen B / sen A = ${a} · sen ${B}° / sen ${A}°`, H.dec(b)) };
});
def("m11.tr.coseno", (R, S, H) => {
  const a = R.int(4, 20), b = R.int(4, 20), C = R.int(20, 140);
  if (R.r() < 0.6) {
    const c2 = a * a + b * b - 2 * a * b * Math.cos(C * RAD), c = rd(Math.sqrt(c2), 2), pr = rd(2 * a * b * Math.cos(C * RAD), 2);
    return { q: S.m11.tr_tri_q(`a = ${a}, b = ${b} y C = ${C}°`, "el lado c"), kind: "num", ans: c, tol: 0.02,
      sol: S.m11.tr_cos_s(`c² = a² + b² − 2ab · cos C = ${a}² + ${b}² − 2 · ${a} · ${b} · cos ${C}° = ${a * a + b * b} − ${2 * a * b} · cos ${C}° ≈ ${a * a + b * b} ${pr < 0 ? "+" : "−"} ${H.dec(Math.abs(pr))} = ${H.dec(rd(a * a + b * b - pr, 2))}. Entonces c ≈ √${H.dec(rd(a * a + b * b - pr, 2))}`, H.dec(c)) };
  }
  const c = R.int(Math.abs(a - b) + 1, a + b - 1), ang = rd(Math.acos((a * a + b * b - c * c) / (2 * a * b)) / RAD, 2);
  return { q: S.m11.tr_tri_q(`a = ${a}, b = ${b} y c = ${c}`, "el ángulo C, en grados"), kind: "num", ans: ang, tol: 0.02,
    sol: S.m11.tr_cos_s(`cos C = (a² + b² − c²)/(2ab) = (${a * a} + ${b * b} − ${c * c})/${2 * a * b} ≈ ${H.dec((a * a + b * b - c * c) / (2 * a * b), 4)} → C = arccos(${H.dec((a * a + b * b - c * c) / (2 * a * b), 4)})`, H.dec(ang) + "°") };
});
def("m11.tr.area", (R, S, H) => {
  const a = R.int(3, 20), b = R.int(3, 20), C = R.int(15, 165), A = rd(0.5 * a * b * Math.sin(C * RAD), 2);
  return { q: S.m11.tr_tri_q(`a = ${a}, b = ${b} y el ángulo que forman, C = ${C}°`, "su área"), kind: "num", ans: A, tol: 0.02,
    // Con C obtuso, el paso de la lección de 4.º: el seno del exterior, sen C = sen(180° − C)
    sol: (C > 90 ? S.m11.tr_area_obt(C, 180 - C) : "") + S.m11.tr_area_s(`½ · ${a} · ${b} · sen ${C > 90 ? 180 - C : C}°`, H.dec(A)) };
});
def("m11.tr.problema", (R, S, H) => {
  const k = R.pick([0, 1, 2, 3, 3, 4, 4]), P = S.m11.tr_prob[k];
  if (k <= 2) {   // torre (10–60 m, 25°–70°), escalera (3–12 m, 50°–80°), cometa (20–100 m, 25°–70°)
    const d = [R.int(10, 60), R.int(3, 12), R.int(20, 100)][k], a = k === 1 ? R.int(50, 80) : R.int(25, 70);
    const r = rd(k === 0 ? d * Math.tan(a * RAD) : d * Math.sin(a * RAD), 2);
    return { q: P.q(d, a), kind: "num", ans: r, tol: 0.02, sol: P.s(d, a, H.dec(r)) };
  }
  if (k === 3) {   // doble observación: desde lejos α, nos acercamos d y vemos β
    const al = R.int(20, 45), be = al + R.int(10, 30), d = R.pick([10, 15, 20, 25, 30, 40, 50]);
    const ta = Math.tan(al * RAD), tb = Math.tan(be * RAD), x = d * ta / (tb - ta), h = rd(x * tb, 2);
    return { q: P.q(d, al, be), kind: "num", ans: h, tol: 0.05,
      sol: P.s(d, al, be, H.dec(ta, 4), H.dec(tb, 4), H.dec(rd(x, 2)), H.dec(h)) };
  }
  // dos observadores A y B separados d ven un barco C con ángulos α y β: distancia AC (teorema del seno)
  const al = R.int(40, 80), be = R.int(40, 80), d = R.pick([100, 120, 150, 200, 250, 300]), C = 180 - al - be;
  if (C < 20) return null;
  const AC = rd(d * Math.sin(be * RAD) / Math.sin(C * RAD), 2);
  return { q: P.q(d, al, be), kind: "num", ans: AC, tol: 0.05, sol: P.s(d, al, be, C, H.dec(AC)) };
});
// Funciones trigonométricas: periodo de sen(kx), cos(kx) y tg(kx), y recorrido de a · sen x + b
def("m11.tr.funcion", (R, S, H) => {
  const T = S.m11.fn_t;
  if (R.r() < 0.55) {
    const f = R.pick(["sin", "cos", "tan"]), k = R.pick([2, 3, 4, 1, 0.5]), base = f === "tan" ? 1 : 2;   // periodo = base·π/k
    const per = F.make(base * 2, k === 0.5 ? 1 : 2 * k), show = ([n, dd]) => `${n === 1 ? "" : n}π${dd === 1 ? "" : "/" + dd}`;
    const ok = show(per);
    const kx = k === 1 ? "x" : k === 0.5 ? "x/2" : `${k}x`;
    const alts = [show(F.make(Math.round(base * 2 * k), 2)), show(F.make((3 - base) * 2, k === 0.5 ? 1 : 2 * k)), show(F.make(base, 1)), "π/2", "4π", "π", "2π"];
    const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 4));
    if (opts.length < 3) return null;
    return { q: T.q0(`y = ${S.m11.tr_fn[f]} ${k === 1 ? "x" : `(${kx})`}`), kind: "choice", opts, correct: opts.indexOf(ok),
      sol: T.s0(S.m11.tr_fn[f], base === 2 ? "2π" : "π", kx, ok, k === 1) };
  }
  const a = R.pick([1, 2, 3, 4, -2, -3]), b = R.int(-4, 4), f = R.pick(["sin", "cos"]);
  const lo = b - Math.abs(a), hi = b + Math.abs(a), ok = `[${lo < 0 ? "−" + -lo : lo}, ${hi < 0 ? "−" + -hi : hi}]`;
  const iv = (u, v) => `[${u < 0 ? "−" + -u : u}, ${v < 0 ? "−" + -v : v}]`;
  const opts = R.shuffle([ok, ...[...new Set([iv(-1, 1), iv(b - 1, b + 1), iv(Math.min(a + b, b), Math.max(a + b, b)), iv(-Math.abs(a), Math.abs(a))])].filter(x => x !== ok)].slice(0, 4));
  const ax = a === 1 ? "" : a === -1 ? "−" : `${a < 0 ? "−" + -a : a} `;
  const e = `y = ${ax}${S.m11.tr_fn[f]} x${b ? ` ${b < 0 ? "−" : "+"} ${Math.abs(b)}` : ""}`;
  return { q: T.q1(e), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.s1(S.m11.tr_fn[f], a, b, lo, hi, ok) };
});
})();
