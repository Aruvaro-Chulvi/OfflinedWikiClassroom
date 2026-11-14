/* WikiAula — Física, Grado 11 (1.º de Bachillerato): problemas numéricos.
   Textos en i18n/<lang>/fis11.js (S.fis11). Las soluciones sustituyen los datos con sus
   unidades y dan el resultado con 3 cifras significativas (la respuesta se acepta con un 1 %). */
"use strict";
(function () {
const WA = window.WA;
// ── Normas de ciencias (content/es/fisica-quimica/NORMAS.md): «≈» al redondear y cifras significativas ──
// Cuando rd (o sig/cs) redondea de verdad un número, lo apunta en AP: valor redondeado → { x: exacto, r, n, estricto }.
// Al escribirlo con H.dec o H.n (el H que reciben los generadores de este archivo) lleva delante una marca invisible
// (MK) y al final (fin) «= MK» pasa a «≈» y se quitan las marcas. Los pasos intermedios se escriben como los
// redondea el generador (13,86: así las cuentas siguientes cuadran), salvo que queden con menos de 3 cifras
// significativas (0,71 → 0,714; 0,00 → 0,004). La respuesta se escribe con 3 cifras significativas, con sus ceros finales
// (22,0) y sin cambiar por ceros las cifras de la parte entera (43 312,5 → 43 313); sig y cs, con las suyas.
// Una respuesta exacta con más cifras de la cuenta (37 537,5 J) también se escribe así y con «≈».
// Si la tolerancia no aceptara lo escrito, se escriben más cifras. ans y tol no cambian nunca.
// Los datos del enunciado y las cuentas que no son resultados usan rdD, que no se apunta; un número que deba
// escribirse entero y exacto (dinero, conversiones) se marca con exacto(it).
const MK = String.fromCharCode(0x2063), AP = new Map();
const marca = s => String(s).replace(/^([−-]?)/, "$1" + MK);   // detrás del signo menos: «startsWith("−")» sigue valiendo
// «=» seguido de una cuenta (números, signos, paréntesis, etiquetas) en la que hay un número redondeado
const AP_EQ = new RegExp("=(?=(?:\\s|&nbsp;|<[^>]*>|[0-9,.·×/:+−()√½π²³¹⁰⁴⁵⁶⁷⁸⁹⁻-]|" + MK + ")*?" + MK + ")", "g");
const near = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));   // para rd (decimales)
const nearR = (a, b) => a === b || Math.abs(a - b) <= 1e-9 * Math.max(Math.abs(a), Math.abs(b));   // relativo (sig, cs, 10⁻¹³…)
// Desde GRANDE (5 cifras enteras) se escriben n cifras y ceros (43 312,5 → 43 300); desde CIENTIFICA, en notación
// científica (4,33 · 10⁶). Los resultados exactos no se redondean (45 000).
const GRANDE = 1e4, CIENTIFICA = 1e6;
const cifP = (x, n) => Math.abs(x) >= GRANDE ? n : Math.min(21, Math.max(n, Math.floor(Math.log10(Math.abs(x))) + 1));
const cifras = (x, n = 3) => (!x || !isFinite(x)) ? x : +(+x).toPrecision(cifP(x, n));
// x escrito con n cifras significativas: 22,03 → «22,0»; 0,06071 → «0,0607»; 0,004 → «0,004» (sin ceros que no
// son medidos); estricto = exactamente n (las de sig y cs: 43 312 → «43 300»)
const conCifras = (H, x, n = 3, estricto) => {
  if (!x || !isFinite(x)) return H.dec(x);
  let s = Math.abs(x).toPrecision(estricto ? n : cifP(x, n));
  if (+s >= CIENTIFICA) {   // 4,33 · 10⁶
    const e = Math.floor(Math.log10(+s) + 1e-12), m = (+s / 10 ** e).toPrecision(n);   // con sus ceros: 4,00 · 10⁶
    return (x < 0 ? "−" : "") + m.replace(".", H.dec(0.5).replace(/\d/g, "")) + WA.H.sx(true) + "10<sup>" + e + "</sup>";
  }
  if (/e/.test(s)) return (x < 0 ? "−" : "") + H.dec(+s, 15);
  if (+s >= GRANDE) return (x < 0 ? "−" : "") + H.n(Math.round(+s));
  if (s.includes(".") && nearR(+s.replace(/0+$/, ""), Math.abs(x))) s = s.replace(/\.?0+$/, "");
  const [i, f] = s.split(".");
  return (x < 0 ? "−" : "") + H.n(+i) + (f ? H.dec(0.5).replace(/\d/g, "") + f : "");
};
const apunta = (x, r, base, n, estricto) => { if (typeof x === "number" && isFinite(x) && !(estricto ? nearR : near)(x, r)) AP.set(r, { x: base, r, n, estricto }); return r; };
const igual = (a, u, v) => (a.estricto ? nearR : near)(u, v);
const cifrasDe = r => { if (!r) return 0; const s = Math.abs(r).toPrecision(15).replace(/e.*$/, "").replace(".", "").replace(/^0+/, "").replace(/0+$/, ""); return Number.isInteger(r) && Math.abs(r) >= 10 ? Math.max(2, s.length) : s.length; };
const grande = a => !a.estricto && Math.abs(a.x) >= GRANDE;   // redondeado y de 5 cifras enteras o más: en la respuesta, 3 cifras significativas
const paso = (H, a) => a.estricto ? conCifras(H, a.x, a.n, true) : !a.n || cifrasDe(a.r) >= 3 ? H.dec(a.r, 12) : conCifras(H, a.x, 3);   // un paso intermedio
const pasoV = a => a.estricto ? +(+a.x).toPrecision(a.n) : !a.n || cifrasDe(a.r) >= 3 ? a.r : cifras(a.x, 3);   // su valor
// Un número grande redondeado que cierra una cuenta sin ser la respuesta ni usarse después (unos 16 500 kg; −151 000 J = −151 kJ):
// como la respuesta, con 3 cifras significativas. Exacto o pequeño, como H.n.
const cierra = (H, r) => { const a = typeof r === "number" ? AP.get(r) : null; return a && grande(a) ? marca(conCifras(H.raw || H, a.x, 3)) : H.n(r); };
const sale = r => { const a = typeof r === "number" ? AP.get(r) : null; return a ? pasoV(a) : r; };   // lo que se escribe para r (para elegir «=» o «≈» en un texto)
// Signo para las plantillas con «=»/«≈» escrito a mano: x es el valor de verdad y r lo que se escribe (con dc, H.raw
// o a mano; lo que se escribe con H.dec/H.n ya pone «≈» solo, con «=» en la plantilla): «=» si es exacto, «≈» si se redondeó
const eq = (x, r) => Math.abs(x - r) <= 1e-9 * Math.max(Math.abs(x), Math.abs(r)) + 1e-12 ? "=" : "≈";
const rd = (x, k = 2) => { const r = Math.round(x * 10 ** k) / 10 ** k; return apunta(x, r, x, k > 0 ? 3 : 0); };   // n = 0: redondeo a enteros (o más), se escribe tal cual
const rdD = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const escribe = (H, x, f) => { const a = typeof x === "number" ? AP.get(x) : null; return a ? (igual(a, pasoV(a), a.x) ? paso(H, a) : marca(paso(H, a))) : f(); };
const HS = H => Object.assign(Object.create(H), {
  dec: (x, dp) => escribe(H, x, () => typeof x === "number" && isFinite(x) && !near(x, rdD(x, dp == null ? 6 : dp))
    ? marca(dp == null ? conCifras(H, x) : H.dec(x, dp)) : H.dec(x, dp)),
  n: x => escribe(H, x, () => H.n(x)),
  raw: H,   // el H de siempre, para datos que no deben confundirse con un resultado que valga lo mismo
});
const exacto = it => Object.defineProperty(it, "_exacto", { value: true });
const REDONDEA_EXACTAS = true;   // false en FyQ 8, que aún no enseña cifras significativas: solo se redondea lo que no es exacto
function fin(it, H) {
  if (!it || typeof it !== "object") return it;
  const subs = [];
  const ajusta = (o, todo) => {   // la respuesta: cifras significativas y, si hace falta, más cifras para la tolerancia
    if (o.kind !== "num" || typeof o.ans !== "number" || !isFinite(o.ans)) return;
    const a = AP.get(o.ans);
    const tol = (o.tol || 0) + 1e-12, val = (b, n, e) => +(+b).toPrecision(e ? n : cifP(b, n));   // el valor que escribe conCifras
    if (a && !a.n && !grande(a)) return;
    if (a) {
      let n = a.n || 3;
      while (Math.abs(val(a.x, n, a.estricto) - o.ans) > tol && n < 12) n++;
      const s1 = conCifras(H, a.x, n, a.estricto), s0 = paso(H, a);
      if (!String(it.sol || "").includes(igual(a, pasoV(a), a.x) ? s0 : marca(s0))) {   // escrita con dc: el resultado en negrita, con sus cifras
        const s = typeof it.sol === "string" ? it.sol : "", s2 = igual(a, val(a.x, n, a.estricto), a.x) ? s1 : marca(s1);
        for (const t of [String(a.r).replace("-", "−").replace(".", WA.H.ds), H.dec(a.r, 12)]) {   // (sx y otras formas: no se tocan)
          let last = null; for (const m of s.matchAll(new RegExp("<b>(\\s*)" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\d,])", "g"))) last = m;
          if (!last) continue;
          const at = last.index + 3 + last[1].length;   // los usos de después (pasos) se quedan con sus cifras
          if (s1 !== t) {   // con las cifras de verdad puede salir exacto (0,9 → 0,896): entonces «=»
            const pre = s2 === s1 ? s.slice(0, at).replace(/≈((?:\s|&nbsp;|<[^>]*>)*)$/, "=$1") : s.slice(0, at);
            it.sol = pre + s2 + s.slice(at + t.length); if (o.ansHtml == null) o.ansHtml = s1;
          }
          break;
        }
        return;
      }
      if (s1 !== s0 && !igual(a, pasoV(a), a.x)) subs.push([marca(s0), igual(a, val(a.x, n, a.estricto), a.x) ? s1 : marca(s1)]);
      if (o.ansHtml == null && s1 !== H.dec(o.ans)) o.ansHtml = s1;
      return;
    }
    if (!todo || it._exacto || !near(o.ans, rdD(o.ans, 6))) return;
    const s0 = H.dec(o.ans), s = typeof it.sol === "string" ? it.sol : "";
    const re = new RegExp("(^|[^\\d,])" + s0.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\d,])", "g");
    let last = -1; for (const m of s.matchAll(re)) last = m.index + m[1].length;   // la última vez que sale en la solución
    if (last < 0) return;
    if (!REDONDEA_EXACTAS || Number.isInteger(o.ans) || nearR(cifras(o.ans), o.ans)) {
      const m = s.slice(0, last).match(/≈((?:\s|&nbsp;|<[^>]*>)*)$/);   // respuesta exacta escrita con «≈»: «=»
      if (m) it.sol = s.slice(0, m.index) + "=" + m[1] + s.slice(last);
      return;
    }
    let n = 3;   // respuesta exacta con más cifras de la cuenta
    while (Math.abs(val(o.ans, n) - o.ans) > tol && n < 12) n++;
    const s1 = conCifras(H, o.ans, n);
    if (s0 === s1) return;
    it.sol = s.slice(0, last) + marca(s1) + s.slice(last + s0.length);
    if (o.ansHtml == null) o.ansHtml = s1;
  };
  ajusta(it, true); (it.fields || []).forEach(f => ajusta(f, false));
  const fix = s => {
    if (typeof s !== "string") return s;
    for (const [a, b] of subs) s = s.split(a).join(b);
    return s.replace(AP_EQ, "≈").split(MK).join("");
  };
  for (const k of Object.keys(it)) {
    if (typeof it[k] === "string") it[k] = fix(it[k]);
    else if (Array.isArray(it[k]) && it[k].every(x => typeof x === "string")) it[k] = it[k].map(fix);
  }
  (it.fields || []).forEach(f => { for (const k of Object.keys(f)) if (typeof f[k] === "string") f[k] = fix(f[k]); });
  return it;
}
const def = (id, fn) => WA.def(id, (R, S, H, L) => { AP.clear(); return fin(fn(R, S, HS(H), L), H); });
const sig = (x, n = 3) => { const r = x === 0 ? 0 : +(+x).toPrecision(n); return apunta(x, r, x, n, true); };   // n cifras significativas
const num = (q, ans, sol, tol) => ({ q, kind: "num", ans, tol: tol != null ? tol : Math.max(0.011, Math.abs(ans) * 0.01), sol });
const rad = a => a * Math.PI / 180;
const deg = x => x * 180 / Math.PI;
const g = 9.8;
// Opción múltiple barajada (k = índice de la correcta en opts) y problema de varios apartados
const choice = (R, q, opts, k, sol) => { const o = R.shuffle(opts.map((t, i) => [t, i])); return { q, kind: "choice", opts: o.map(x => x[0]), correct: o.findIndex(x => x[1] === k), sol }; };
const fn = (label, ans) => ({ label, kind: "num", ans, tol: Math.max(0.011, Math.abs(ans) * 0.01) });
const multi = (q, fields, sol) => ({ q, kind: "fields", fields, sol });
// Formato: d = número tal cual; s = 3 cifras significativas; t = seno, coseno o tangente con 3 decimales
const fx = H => ({ d: x => H.dec(x), s: (x, n = 3) => H.dec(sig(x, n)), t: x => H.dec(rd(x, 3)) });

/* ── U1 · Cinemática vectorial ── */
def("fis11.vectorial", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5), a = R.int(1, 5), b = R.int(1, 3), d0 = R.int(-4, 4), ds = d0 < 0 ? `− ${-d0}` : `+ ${d0}`;
  const t1 = R.int(0, 2), t2 = t1 + R.int(1, 3), X = t => a * t, Y = t => b * t * t + d0;
  const dx = X(t2) - X(t1), dy = Y(t2) - Y(t1), rv = t => T.vec(X(t), Y(t));
  // aceleración: cada componente con t² es un MRUA (x puede llevar también t²)
  if (k === 3) { const c = R.pick([0, 0, 1, 2]), ax = 2 * c, ay = 2 * b, r = sig(Math.hypot(ax, ay));
    return num(T.ve_q[3](a, c, b, ds), r, T.ve_s[3](a, c, b, d0, ax, ay, T.vec(ax, ay), f.d(r))); }
  // ángulo de la velocidad con el eje x en un instante
  if (k === 4) { const t = R.int(1, 3), vy = 2 * b * t, r = sig(deg(Math.atan(vy / a)));
    return num(T.ve_q[4](a, b, ds, t), r, T.ve_s[4](a, 2 * b, d0, t, vy, f.s(vy / a), f.d(r))); }
  // forma de la trayectoria: recta, parábola o circunferencia
  if (k === 5) { const kind = R.int(0, 2), Rr = R.int(2, 6);
    return choice(R, T.ve_q[5](kind, a, b, ds, Rr), T.tray, kind, T.ve_s[5](kind, a, b, ds, Rr)); }
  if (k === 0) { const r = sig(Math.hypot(dx, dy)); return num(T.ve_q[0](a, b, 0, ds, t1, t2), r, T.ve_s[0](t1, rv(t1), t2, rv(t2), T.vec(dx, dy), dx, dy, f.d(r))); }
  if (k === 1) { const t = R.int(1, 4), vx = a, vy = 2 * b * t, r = sig(Math.hypot(vx, vy)); return num(T.ve_q[1](a, b, ds, t), r, T.ve_s[1](a, 2 * b, d0, t, vx, vy, f.d(r))); }
  const dt = t2 - t1, vx = dx / dt, vy = dy / dt, r = sig(Math.hypot(vx, vy));   // vx = a y vy = b(t1 + t2): enteros
  return num(T.ve_q[2](a, b, ds, t1, t2), r, T.ve_s[2](t1, rv(t1), t2, rv(t2), T.vec(dx, dy), dt, T.vec(vx, vy), vx, vy, f.d(r)));
});
def("fis11.intrinseca", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // coche que frena en una curva (a_t negativa) y ángulo de la aceleración con la tangente
  if (k >= 3) { const v = R.pick([10, 15, 20, 25]), Rr = R.pick([50, 80, 100, 125, 200].filter(x => v * v / x <= 8)), at = R.pick([1, 2, 3, 4]), an = v * v / Rr, frena = k === 3 || R.r() < 0.5;
    if (k === 3) { const r = sig(Math.hypot(at, an)); return num(T.it_q[3](v, Rr, at), r, T.it_s[3](v, Rr, f.s(an), at, f.d(r))); }
    const r = sig(deg(Math.atan(an / at))); return num(T.it_q[4](v, Rr, at, frena), r, T.it_s[4](v, Rr, f.s(an), at, f.s(an / at), f.d(r), frena)); }
  // coche en una curva: a_n ≤ 8 m/s² (lo que puede dar el rozamiento de los neumáticos)
  if (k === 0) { const v = R.pick([10, 15, 20, 25]), Rr = R.pick([50, 100, 125, 200].filter(x => v * v / x <= 8)), at = R.pick([1, 2, 3, 4]), an = v * v / Rr, r = sig(Math.hypot(at, an));
    return num(T.it_q[0](v, Rr, at), r, T.it_s[0](v, Rr, f.s(an), at, f.d(r))); }
  if (k === 1) { const v = R.pick([5, 10, 12, 20, 30]), Rr = R.pick([10, 25, 40, 50, 100]), r = sig(v * v / Rr); return num(T.it_q[1](v, Rr), r, T.it_s[1](v, Rr, f.d(r))); }
  const v = R.pick([20, 30, 40, 50]), an = R.pick([0.5, 1, 1.5, 2]), r = sig(v * v / an); return num(T.it_q[2](v, f.d(an)), r, T.it_s[2](v, f.d(an), f.d(r)));
});
def("fis11.relativo", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 6);
  // llegar justo enfrente: ángulo río arriba (sen θ = v_r/v_b) y tiempo de cruce (con v_b·cos θ)
  if (k === 4 || k === 5) { const [vb, vr] = R.pick([[2, 1], [3, 1], [3, 2], [4, 1], [4, 2], [4, 3], [5, 2], [5, 3], [5, 4], [2.5, 1.5], [6, 3]]), sn = vr / vb, th = Math.asin(sn), vu = vb * Math.cos(th);
    if (k === 4) { const r = sig(deg(th)); return num(T.re_q[4](f.d(vb), f.d(vr)), r, T.re_s[4](f.d(vb), f.d(vr), f.t(sn), f.d(r))); }
    const d = R.pick([40, 50, 60, 80, 100, 120]), r = sig(d / vu); return num(T.re_q[5](d, f.d(vb), f.d(vr)), r, T.re_s[5](d, f.d(vb), f.d(vr), f.t(sn), f.s(deg(th)), f.s(vu), f.d(r))); }
  // ángulo con la vertical de la lluvia vista desde el coche
  if (k === 6) { const vl = R.pick([5, 6, 8, 10, 12]), vc = R.pick([3, 4, 5, 6, 8, 10, 15]), r = sig(deg(Math.atan(vc / vl)));
    return num(T.re_q[6](vl, vc), r, T.re_s[6](vl, vc, f.s(vc / vl), f.d(r))); }
  if (k === 0) { const d = R.pick([40, 60, 80, 100, 120]), vb = R.pick([2, 2.5, 3, 4, 5]), vr = R.pick([1, 1.5, 2, 3]), r = sig(vr * d / vb); return num(T.re_q[0](d, f.d(vb), f.d(vr)), r, T.re_s[0](d, f.d(vb), f.d(vr), f.s(d / vb), f.d(r))); }
  if (k === 1) { const vb = R.pick([3, 4, 5, 6, 8]), vr = R.pick([2, 3, 4, 6]), r = sig(Math.hypot(vb, vr)); return num(T.re_q[1](vb, vr), r, T.re_s[1](vb, vr, f.d(r))); }
  // cintas de aeropuerto: 0,5–1 m/s
  if (k === 2) { const v1 = R.pick([1, 1.5, 2, 2.5]), v2 = R.pick([0.5, 0.75, 1].filter(x => x < v1)), r = rd(v1 - v2); return num(T.re_q[2](f.d(v1), f.d(v2)), r, T.re_s[2](f.d(v1), f.d(v2), f.d(r))); }
  const vl = R.pick([6, 8, 10, 12]), vc = R.pick([5, 6, 8, 15]), r = sig(Math.hypot(vl, vc)); return num(T.re_q[3](vl, vc), r, T.re_s[3](vl, vc, f.d(r)));
});

/* ── U2 · Movimientos ── */
def("fis11.grafica", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // pelota lanzada hacia arriba (g = 10): desplazamiento y distancia por áreas, después de pasar por lo alto
  if (k === 3) { const v0 = R.pick([10, 15, 20, 25, 30]), ts = v0 / 10, t = R.pick([1, 1.5, 2, 2.5, 3, 4, 5, 6].filter(x => x > ts && x <= 2 * ts)),
      up = v0 * ts / 2, vt = 10 * (t - ts), dn = vt * (t - ts) / 2, dx = up - dn, dist = up + dn;
    return multi(T.gr_q4(v0, f.d(t)), [fn(T.gr_f[0], dx), fn(T.gr_f[1], dist)], T.gr_s4(v0, f.d(ts), f.d(t), f.d(up), f.d(t - ts), f.d(vt), f.d(dn), f.d(dx), f.d(dist))); }
  // de a–t a v–t y de v–t a x–t (Ejemplo 3): área del rectángulo y del trapecio
  if (k === 4) { const x0 = R.pick([-10, -5, 0, 5, 10, 20]), v0 = R.pick([0, 0, 2, 4, 5]), a = R.pick([1, 2, 3, 4]), t = R.pick([2, 3, 4, 5, 6]), v = v0 + a * t, dx = (v0 + v) * t / 2, r = x0 + dx;
    return num(T.gr_q5(f.d(x0), v0, a, t), r, T.gr_s5(f.d(x0), v0, a, t, a * t, v, f.d(dx), f.d(r))); }
  // frenada de 4 s o más: como mucho 25/4 = 6,25 m/s², posible para un coche
  if (k === 0) { const v = R.pick([10, 12, 15, 20, 25]), t1 = R.pick([4, 5, 8, 10]), t2 = R.pick([10, 15, 20, 30]), t3 = R.pick([4, 5, 6, 8]);
    const a = v * t1 / 2, b = v * t2, c = v * t3 / 2; return num(T.gr_q(v, t1, t2, t3), a + b + c, T.gr_s(v, t1, t2, t3, f.d(a), f.d(b), f.d(c), f.d(a + b + c))); }
  if (k === 1) { const t1 = R.int(0, 3), t2 = t1 + R.pick([2, 4, 5, 6]), v = R.pick([-4, -2, 2, 3, 5, 6]), x1 = R.int(-10, 20), x2 = x1 + v * (t2 - t1);
    return num(T.gr_q2(f.d(x1), f.d(x2), t1, t2), v, T.gr_s2(x1, x2, t1, t2, x2 - x1, t2 - t1, f.d(v))); }
  const v1 = R.pick([0, 4, 10, 20, 30]), t = R.pick([2, 4, 5, 10]), a = R.pick([-3, -2, -1, 1, 2, 3]), v2 = v1 + a * t;
  return num(T.gr_q3(f.d(v1), f.d(v2), t), a, T.gr_s3(f.d(v1), f.d(v2), t, f.d(v2 - v1), f.d(a)));
});
def("fis11.horizontal", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 3), h = R.pick([1.25, 5, 10, 19.6, 20, 45, 80]), tv = Math.sqrt(2 * h / g);
  if (k === 0) { const v = R.pick([5, 10, 15, 20]), r = sig(v * tv); return num(T.ho_q[0](v, f.d(h)), r, T.ho_s[0](f.d(h), f.s(tv), v, f.d(r))); }
  if (k === 1) { const r = sig(tv); return num(T.ho_q[1](f.d(h)), r, T.ho_s[1](f.d(h), f.d(r))); }
  if (k === 2) { const v = R.pick([5, 10, 15, 20]), r = sig(Math.hypot(v, g * tv)); return num(T.ho_q[2](v, f.d(h)), r, T.ho_s[2](f.d(h), f.s(tv), f.s(g * tv), v, f.d(r))); }
  const hm = R.pick([0.8, 1, 1.2]), x = R.pick([0.5, 1, 1.2, 1.5, 2]), t = Math.sqrt(2 * hm / g), r = sig(x / t);
  return num(T.ho_q[3](f.d(hm), f.d(x)), r, T.ho_s[3](f.d(hm), f.s(t), f.d(x), f.d(r)));
});
def("fis11.parabolico", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 6), v = R.pick([10, 15, 20, 25, 30, 40]), a = R.pick([15, 30, 37, 45, 53, 60, 75]), sn = Math.sin(rad(a)), vy = v * sn;
  const c = Math.cos(rad(a)), vx = v * c, tv = 2 * vy / g;
  // altura en un instante (Ejemplo 2): t antes de caer
  if (k === 4) { const t = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4].filter(x => x < 0.9 * tv)), y = vy * t - 4.9 * t * t, r = sig(y);
    if (t !== undefined) return num(T.pa_q[4](v, a, f.d(t)), r, T.pa_s[4](v, a, f.t(sn), f.s(vy), f.d(t), f.s(vy * t), f.s(4.9 * t * t), f.d(r))); }
  // ¿a qué altura pasa por la barrera?: condición x = d → t → y (Ejemplo 3)
  if (k === 5) { const d = R.pick([5, 8, 10, 15, 20, 25, 30, 40].filter(x => x / vx < 0.85 * tv && x / vx > 0.15 * tv));
    if (d !== undefined) { const t = d / vx, y = vy * t - 4.9 * t * t, r = sig(y);
      return num(T.pa_q[5](v, a, d), r, T.pa_s[5](v, a, f.t(c), f.t(sn), f.s(vx), f.s(vy), d, f.s(t), f.s(vy * t), f.s(4.9 * t * t), f.d(r))); } }
  // salida desde una altura (Ejemplo 4): y = 0 con la ecuación de segundo grado
  if (k === 6) { const h0 = R.pick([1.5, 2, 5, 10, 20]), vv = R.pick([8, 10, 12, 15, 20]), aa = R.pick([20, 30, 37, 45, 53]), s2 = Math.sin(rad(aa)), c2 = Math.cos(rad(aa)),
      vy2 = vv * s2, vx2 = vv * c2, disc = Math.sqrt(vy2 * vy2 + 4 * 4.9 * h0), t = (vy2 + disc) / 9.8, r = sig(vx2 * t);
    return num(T.pa_q[6](vv, aa, H.raw.dec(h0)), r, T.pa_s[6](vv, aa, H.raw.dec(h0), f.s(vx2), f.s(vy2), f.s(disc), f.s(t), f.s((vy2 - disc) / 9.8), f.d(r))); }
  if (k === 0) { const r = sig(vy * vy / (2 * g)); return num(T.pa_q[0](v, a), r, T.pa_s[0](v, a, f.t(sn), f.s(vy), f.d(r))); }
  if (k === 1) { const s2 = Math.sin(rad(2 * a)), r = sig(v * v * s2 / g); return num(T.pa_q[1](v, a), r, T.pa_s[1](v, 2 * a, f.d(v * v), f.t(s2), f.d(r))); }
  if (k === 2) { const r = sig(2 * vy / g); return num(T.pa_q[2](v, a), r, T.pa_s[2](v, a, f.t(sn), f.s(vy), f.d(r))); }
  const r = sig(v * v / g); return num(T.pa_q[3](v), r, T.pa_s[3](v, f.d(r)));
});

/* ── U3 · Circular ── */
def("fis11.mcu", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // ecuación del movimiento φ = φ₀ + ωt (Ejemplo 2): φ₀ = p·π/2, ω = w·π/4 rad/s
  if (k >= 4) { const p = R.int(0, 3), w = R.pick([1, 2, 3, 4, 6]), t = R.int(2, 9), phi = p / 2 + w * t / 4, turns = w * t / 8;
    if (k === 4) return num(T.mc_q[4](T.pi(p / 2), T.pi(w / 4), t), turns, T.mc_s[4](T.pi(w / 4), t, T.pi(w * t / 4), H.dec(turns)), 0.011);
    const red = phi % 2, r = sig(red * Math.PI);
    return num(T.mc_q[5](T.pi(p / 2), T.pi(w / 4), t), r, T.mc_s[5](T.pi(p / 2), T.pi(w / 4), t, T.pi(phi), Math.floor(phi / 2), T.pi(red), f.d(r), T.dondePi(red)), 0.02); }
  if (k === 0) { const rpm = R.pick([33, 45, 300, 1200, 3000]), Rr = R.pick([0.05, 0.1, 0.15, 0.2]), w = rpm * 2 * Math.PI / 60, r = sig(w * Rr); return num(T.mc_q[0](rpm, f.d(Rr)), r, T.mc_s[0](rpm, f.s(w), f.d(Rr), f.d(r))); }
  if (k === 1) { const Tp = R.pick([0.5, 1, 2, 4, 10]), Rr = R.pick([0.5, 1, 2, 5]), w = 2 * Math.PI / Tp, r = sig(w * w * Rr); return num(T.mc_q[1](f.d(Tp), f.d(Rr)), r, T.mc_s[1](f.d(Tp), f.s(w), f.d(Rr), f.d(r))); }
  if (k === 2) { const r1 = R.pick([5, 10, 15, 20]), r2 = R.pick([10, 20, 30, 40].filter(x => x !== r1)), w1 = R.pick([6, 10, 12, 20, 30]), r = sig(w1 * r1 / r2); return num(T.mc_q[2](r1, r2, w1), r, T.mc_s[2](r1, r2, w1, f.d(r))); }
  const z1 = R.pick([36, 42, 48, 52]), z2 = R.pick([12, 14, 16, 18, 21]), r = sig(z1 / z2); return num(T.mc_q[3](z1, z2), r, T.mc_s[3](z1, z2, f.d(r)));
});
def("fis11.mcua", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // aceleraciones de un punto que arranca desde el reposo (Ejemplo 2)
  if (k === 4) { const al = R.pick([2, 4, 5, 10, 20]), t = R.pick([0.5, 1, 2, 3]), Rr = R.pick([0.1, 0.2, 0.25, 0.3, 0.5]), w = al * t, at = al * Rr, an = w * w * Rr, r = sig(Math.hypot(at, an));
    return num(T.ma_q[4](al, f.d(Rr), f.d(t)), r, T.ma_s[4](al, f.d(t), H.raw.dec(w), f.d(Rr), f.s(at), H.raw.dec(an), f.d(r))); }
  // rueda que rueda sin deslizar (Ejemplo 3): a = αR
  if (k === 5) { const v = R.pick([10, 15, 20, 25, 30]), t = R.pick([5, 8, 10, 12, 15]), Rr = R.pick([0.25, 0.3, 0.35, 0.4]), a = v / t, r = sig(a / Rr);
    return num(T.ma_q[5](v, t, f.d(Rr)), r, T.ma_s[5](v, t, f.s(a), f.d(Rr), f.d(r))); }
  if (k === 0) { const w0 = R.pick([0, 10, 20, 50]), t = R.pick([2, 4, 5, 10]), al = R.pick([-4, -2, 2, 3, 5]), w = w0 + al * t;
    if (w < 0) return num(T.ma_q[0](w0, w0 + 2 * t, t), 2, T.ma_s[0](w0, w0 + 2 * t, t, f.d(2)));
    return num(T.ma_q[0](w0, w, t), al, T.ma_s[0](w0, w, t, f.d(al))); }
  if (k === 1) { const w0 = R.pick([60, 100, 120, 150, 200]), t = R.pick([4, 5, 8, 10]), al = w0 / t, phi = w0 * t / 2, r = sig(phi / (2 * Math.PI));
    return num(T.ma_q[1](w0, t), r, T.ma_s[1](w0, t, f.s(al), f.d(phi), f.d(r)), Math.max(0.1, r * 0.01)); }
  if (k === 2) { const al = R.pick([2, 3, 4, 5]), t = R.pick([2, 3, 5, 6]), Rr = R.pick([0.25, 0.3, 0.4, 0.5]), w = al * t, r = sig(w * Rr); return num(T.ma_q[2](al, t, f.d(Rr)), r, T.ma_s[2](al, t, w, f.d(Rr), f.d(r))); }
  const rpm = R.pick([600, 1200, 3000, 6000]), t = R.pick([5, 10, 20]), w = rpm * 2 * Math.PI / 60, r = sig(w / t); return num(T.ma_q[3](rpm, t), r, T.ma_s[3](rpm, f.s(w), t, f.d(r)));
});

/* ── U4 · Dinámica ── */
def("fis11.newton", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 6), m = R.pick([2, 4, 5, 10, 20]);
  // báscula en un ascensor (Ejemplo 3): arranca hacia arriba (a hacia arriba) o hacia abajo (a hacia abajo)
  if (k === 4) { const mm = R.pick([45, 50, 60, 70, 80]), a = R.pick([1, 1.5, 2, 2.5]), sube = R.r() < 0.5, r = sig(mm * (g + (sube ? a : -a)));
    return num(T.ne_q[4](mm, f.d(a), sube), r, T.ne_s[4](mm, f.d(a), sube, f.d(r))); }
  // plano inclinado sin rozamiento (Ejemplo 2)
  if (k === 5) { const a = R.pick([10, 15, 20, 25, 30, 37, 45]), sn = Math.sin(rad(a)), r = sig(g * sn);
    return num(T.ne_q[5](m, a), r, T.ne_s[5](a, f.t(sn), f.d(r))); }
  // lámpara colgada de dos cuerdas asimétricas: sistema con los dos ejes
  if (k === 6) { const [a1, a2] = R.pick([[30, 60], [60, 30], [30, 45], [45, 30], [45, 60], [60, 45], [37, 53], [53, 37], [20, 50]]), P = R.pick([40, 50, 60, 80, 100, 120]);
    const c1 = Math.cos(rad(a1)), c2 = Math.cos(rad(a2)), s1 = Math.sin(rad(a1)), s2 = Math.sin(rad(a2)), q = c1 / c2, T1 = P / (s1 + q * s2), r = sig(T1);
    return num(T.ne_q[6](P, a1, a2), r, T.ne_s[6](a1, a2, f.t(c1), f.t(c2), f.s(q), f.t(s1), f.t(s2), P, f.s(s1 + q * s2), f.d(r))); }
  // con F·sen α ≥ mg la caja se levantaría: se usa 20 kg
  if (k === 0) { const F = R.pick([20, 40, 50, 100]), a = R.pick([30, 37, 45, 60]), mm = F * Math.sin(rad(a)) < m * g ? m : 20, c = Math.cos(rad(a)), Fx = F * c, r = sig(Fx / mm);
    return num(T.ne_q[0](mm, F, a), r, T.ne_s[0](F, f.t(c), f.s(Fx), mm, f.d(r))); }
  if (k === 1) { const F = R.pick([10, 20, 30, 40]), a = R.pick([30, 37, 45, 60]), sn = Math.sin(rad(a)), fy = F * sn, mm = fy >= m * g ? 20 : m, p = mm * g, r = sig(p - fy);
    return num(T.ne_q[1](mm, F, a), r, T.ne_s[1](mm, F, f.t(sn), f.d(rd(p)), f.s(fy), f.d(r))); }
  if (k === 2) { const [f1, f2] = R.pick([[3, 4], [6, 8], [5, 12], [8, 6], [12, 16]]), F = Math.hypot(f1, f2), r = sig(F / m); return num(T.ne_q[2](m, f1, f2), r, T.ne_s[2](f1, f2, f.d(F), m, f.d(r))); }
  const mm = R.pick([2, 3, 4, 5]), a = R.pick([20, 30, 45, 60]), sn = Math.sin(rad(a)), r = sig(mm * g / (2 * sn)); return num(T.ne_q[3](mm, a), r, T.ne_s[3](mm, f.t(sn), f.d(r)));
});
def("fis11.rozamiento", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 7);
  // ¿se mueve o no? (Ejemplo 1): la mitad de las veces F no llega a μₑN
  if (k === 4) { const m = R.pick([10, 20, 25, 30, 40]), [me, md] = R.pick([[0.3, 0.2], [0.4, 0.3], [0.5, 0.4], [0.6, 0.5]]), N = rd(m * g), Fe = rd(me * N), Fd = rd(md * N);
    const F = R.r() < 0.5 ? Math.floor(Fe * R.pick([0.4, 0.6, 0.8]) / 10) * 10 || 10 : Math.ceil(Fe * R.pick([1.2, 1.5, 2]) / 10) * 10, moves = F > Fe, r = moves ? sig((F - Fd) / m) : 0;
    return num(T.ro_q[4](m, F, f.d(me), f.d(md)), r, T.ro_s[4](m, f.d(N), f.d(me), f.d(Fe), F, moves, f.d(md), f.d(Fd), f.d(r))); }
  // lanzado plano arriba: distancia hasta pararse (Ejemplo 3)
  if (k === 5) { const a = R.pick([15, 20, 25, 30, 37]), mu = R.pick([0.1, 0.15, 0.2, 0.3]), v0 = R.pick([3, 4, 5, 6, 8]), sn = Math.sin(rad(a)), c = Math.cos(rad(a)), ac = g * (sn + mu * c), r = sig(v0 * v0 / (2 * ac));
    return num(T.ro_q[5](v0, a, f.d(mu)), r, T.ro_s[5](f.t(sn), f.d(mu), f.t(c), f.s(ac), v0, f.d(r))); }
  // bloque en un plano unido a otro que cuelga (Ejemplo 6)
  if (k === 6) { const m1 = R.pick([2, 3, 4, 5]), m2 = R.pick([2, 3, 4, 5, 6]), a = R.pick([20, 30, 37]), mu = R.pick([0.1, 0.2]), sn = Math.sin(rad(a)), c = Math.cos(rad(a));
    const P2 = m2 * g, Px = m1 * g * sn, fr = mu * m1 * g * c, net = P2 - Px - fr;
    if (net > 0.5) {   // la resta, con los términos tal como se escriben (2 decimales), y la a que sale de ella (dentro de la tolerancia)
      const r = sig(net / (m1 + m2)), ps = [P2, Px, fr].map(x => rd(x, 2)), nd = rdD(ps[0] - ps[1] - ps[2], 2), rv = sig(nd / (m1 + m2));
      const it = num(T.ro_q[6](m1, a, f.d(mu), m2), r, T.ro_s[6](m1, m2, a, f.d(mu), f.d(ps[0]), f.d(ps[1]), f.d(ps[2]), m1 + m2, H.raw.dec(nd), f.d(rv)));
      if (rv !== r) it.ansHtml = H.raw.dec(rv);
      return it;
    } }
  // en reposo en un plano: el rozamiento estático vale mg·sen α, no μₑN
  if (k === 7) { const m = R.pick([1, 2, 5, 10, 20]), a = R.pick([5, 10, 15, 20, 25]), tg = Math.tan(rad(a)), me = R.pick([0.3, 0.4, 0.5, 0.6].filter(x => x > tg + 0.04)), sn = Math.sin(rad(a)), c = Math.cos(rad(a)), r = sig(m * g * sn);
    return num(T.ro_q[7](m, a, f.d(me)), r, T.ro_s[7](a, f.t(tg), f.d(me), m, f.t(sn), f.d(r), f.s(me * m * g * c))); }
  if (k === 0) { const m = R.pick([5, 10, 20, 30]), mu = R.pick([0.1, 0.2, 0.3, 0.4]), N = rd(m * g), fr = rd(mu * N), F = Math.ceil(fr + m * R.int(1, 4)), r = sig((F - fr) / m);
    return num(T.ro_q[0](m, F, f.d(mu)), r, T.ro_s[0](m, f.d(mu), f.d(N), f.d(fr), F, f.d(r))); }
  if (k === 1) { const a = R.pick([30, 37, 45, 53, 60]), mu = R.pick([0.1, 0.15, 0.2, 0.3]), sn = Math.sin(rad(a)), c = Math.cos(rad(a)), r = sig(g * (sn - mu * c));
    return num(T.ro_q[1](a, f.d(mu)), r, T.ro_s[1](f.t(sn), f.d(mu), f.t(c), f.d(r))); }
  if (k === 2) { const a = R.pick([15, 20, 25, 30, 35]), r = rd(Math.tan(rad(a)), 3); return num(T.ro_q[2](a), r, T.ro_s[2](a, f.d(r)), 0.006); }
  const m1 = R.pick([2, 3, 4, 5]), m2 = R.pick([2, 3, 4, 6]), mu = R.pick([0.1, 0.2, 0.25]), P2 = rd(m2 * g), fr = rd(mu * m1 * g), r = sig((P2 - fr) / (m1 + m2));
  return num(T.ro_q[3](m1, m2, f.d(mu)), r, T.ro_s[3](m1, m2, f.d(mu), f.d(P2), f.d(fr), m1 + m2, f.d(r)));
});
def("fis11.circular", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // fondo del bucle (Ejemplo 4): N − mg = mv²/R
  if (k === 4) { const m = R.pick([50, 55, 60, 70, 80]), Rr = R.pick([5, 6, 8, 10]), v = R.pick([8, 10, 12, 15]), r = sig(m * (g + v * v / Rr));
    return num(T.ci_q[4](m, Rr, v), r, T.ci_s[4](m, v, Rr, f.s(v * v / Rr), f.d(r), f.s(r / (m * g)))); }
  // lo alto de un badén: mg − N = mv²/R (con v² < gR, no despega)
  if (k === 5) { const m = R.pick([800, 1000, 1200, 1500]), Rr = R.pick([20, 30, 40, 50]), v = R.pick([5, 8, 10, 12, 15].filter(x => x * x < 0.85 * g * Rr)), r = sig(m * (g - v * v / Rr));
    return num(T.ci_q[5](H.n(m), Rr, v), r, T.ci_s[5](H.n(m), v, Rr, f.s(v * v / Rr), f.d(r), f.s(Math.sqrt(g * Rr)))); }
  if (k === 0) { const mu = R.pick([0.3, 0.4, 0.5, 0.6, 0.8]), Rr = R.pick([30, 50, 80, 100, 150]), r = sig(Math.sqrt(mu * g * Rr)); return num(T.ci_q[0](f.d(mu), Rr), r, T.ci_s[0](f.d(mu), Rr, f.d(r))); }
  if (k === 1) { const Rr = R.pick([25, 50, 100, 200]), a = R.pick([10, 15, 20, 30, 42]), tg = Math.tan(rad(a)), r = sig(Math.sqrt(g * Rr * tg)); return num(T.ci_q[1](Rr, a), r, T.ci_s[1](Rr, a, f.t(tg), f.d(r))); }
  if (k === 2) { const Rr = R.pick([2.5, 4, 5, 10]), r = sig(Math.sqrt(g * Rr)); return num(T.ci_q[2](f.d(Rr)), r, T.ci_s[2](f.d(Rr), f.d(r))); }
  const m = R.pick([0.1, 0.2, 0.5]), L = R.pick([0.5, 0.8, 1]), fr = R.pick([1, 2, 3]), w = 2 * Math.PI * fr, r = sig(m * w * w * L); return num(T.ci_q[3](f.d(m), f.d(L), fr), r, T.ci_s[3](fr, f.s(w), f.d(m), f.d(L), f.d(r)));
});
def("fis11.hooke", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // dinamómetro en un ascensor (Ejemplo 4): kx − mg = ma
  if (k === 4) { const m = R.pick([0.5, 1, 2]), kk = R.pick([100, 200, 245, 490]), a = R.pick([1, 2, 3]), sube = R.r() < 0.5, F = m * (g + (sube ? a : -a)), x = F / kk, r = sig(x * 100);
    return num(T.ho2_q[4](f.d(m), kk, a, sube), r, T.ho2_s[4](f.d(m), a, sube, f.s(F), kk, f.s(x), f.d(r))); }
  if (k === 0) { const L0 = R.pick([10, 15, 20, 25]), m = R.pick([100, 200, 300, 500]), x = R.pick([2, 4, 5, 6, 10]), F = m / 1000 * g, r = sig(F / (x / 100));
    return num(T.ho2_q[0](L0, L0 + x, m), r, T.ho2_s[0](L0, L0 + x, x, f.d(x / 100), f.d(m / 1000), f.d(rd(F, 3)), f.d(r))); }
  if (k === 1) { const kk = R.pick([49, 98, 196, 245]), m = R.pick([0.2, 0.5, 1]), L0 = R.pick([10, 20, 30]), x = m * g / kk, r = rd(L0 + x * 100, 2);
    return num(T.ho2_q[1](kk, f.d(m), L0), r, T.ho2_s[1](f.d(m), kk, f.s(x), f.s(x * 100), L0, f.d(r))); }
  const k1 = R.pick([100, 200, 300, 400]), k2 = R.pick([100, 200, 300, 600]);
  if (k === 2) { const r = sig(k1 * k2 / (k1 + k2)); return num(T.ho2_q[2](k1, k2), r, T.ho2_s[2](k1, k2, f.d(r))); }
  return num(T.ho2_q[3](k1, k2), k1 + k2, T.ho2_s[3](k1, k2, k1 + k2));
});

/* ── U5 · Momento lineal ── */
def("fis11.impulso", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // rebote con fuerza media (Ejemplo 2): sale más despacio de lo que llega
  if (k === 4) { const m = R.pick([0.06, 0.2, 0.43, 0.5, 0.6]), [v1, v2] = R.pick([[5, 4], [10, 8], [10, 6], [12, 9], [15, 10], [8, 5], [20, 15]]), t = R.pick([0.005, 0.01, 0.02, 0.04]), dp = m * (v1 + v2), r = sig(dp / t);
    return num(T.im_q[4](f.d(m), v1, v2, f.d(t)), r, T.im_s[4](f.d(m), v1, v2, f.s(dp), f.d(t), f.d(r))); }
  // pelota de tenis, de fútbol, de baloncesto y de hockey, con velocidades posibles para cada una
  if (k === 0) { const [m, v] = R.pick([[0.058, 50], [0.43, 30], [0.6, 10], [0.1, 20]]), t = R.pick([0.004, 0.01, 0.02, 0.05]), p = m * v, r = sig(p / t);
    return num(T.im_q[0](f.d(m), v, f.d(t)), r, T.im_s[0](f.d(m), v, f.s(p), f.d(t), f.d(r))); }
  // rebote contra una pared: sale más despacio de lo que llega (pierde energía)
  if (k === 1) { const m = R.pick([0.2, 0.5, 1]), [v1, v2] = R.pick([[5, 4], [10, 8], [10, 6], [12, 9], [12, 6], [8, 5]]), r = rd(m * (v1 + v2));
    return num(T.im_q[1](f.d(m), v1, v2), r, T.im_s[1](f.d(m), v1, v2, f.d(r))); }
  if (k === 2) { const F = R.pick([50, 100, 200, 500]), t = R.pick([0.02, 0.05, 0.1]), m = R.pick([0.4, 0.5, 1, 2]), I = rd(F * t), r = sig(I / m); return num(T.im_q[2](F, f.d(t), f.d(m)), r, T.im_s[2](F, f.d(t), f.d(I), f.d(m), f.d(r))); }
  const m = R.pick([60, 70, 80]), v = R.pick([10, 15, 20]), t = R.pick([0.1, 0.15, 0.2]), p = m * v, r = sig(p / t); return num(T.im_q[3](m, v, f.d(t)), r, T.im_s[3](m, v, f.d(p), f.d(t), f.d(r)));
});
def("fis11.conservap", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // sentidos opuestos: dos vagones de frente que se enganchan (la respuesta lleva su signo)
  if (k === 4) { const m1 = R.pick([8, 10, 12, 15, 20]), v1 = R.pick([1, 1.5, 2, 3]), m2 = R.pick([8, 10, 12, 15, 20]), v2 = R.pick([1, 1.5, 2, 3]), p = m1 * v1 - m2 * v2;
    if (p !== 0) { const r = sig(p / (m1 + m2)); return num(T.cp_q[4](m1, f.d(v1), m2, f.d(v2)), r, T.cp_s[4](m1, f.d(v1), m2, f.d(v2), f.d(m1 * v1), f.d(m2 * v2), f.d(p), m1 + m2, f.d(r), r > 0)); } }
  // explosión en dos dimensiones (Ejemplo 3): dos trozos perpendiculares, el tercero compensa
  if (k === 5) { const m1 = R.pick([1, 2, 3]), v1 = R.pick([10, 15, 20, 30]), m2 = R.pick([1, 2, 3]), v2 = R.pick([10, 15, 20, 30]), m3 = R.pick([1, 2, 4, 5]), px = m1 * v1, py = m2 * v2, p3 = Math.hypot(px, py), r = sig(p3 / m3);
    return num(T.cp_q[5](m1 + m2 + m3, m1, v1, m2, v2, m3), r, T.cp_s[5](m1, v1, m2, v2, px, py, f.s(p3), m3, f.d(r))); }
  // con signo, como en la lección: positivo el sentido del primero (o del proyectil); el otro sale negativo
  if (k === 0) { const m1 = R.pick([40, 50, 60]), m2 = R.pick([60, 75, 80, 90]), v1 = R.pick([1.5, 2, 3, 4]), p = m1 * v1, r = sig(-p / m2);
    return num(T.cp_q[0](m1, m2, f.d(v1)), r, T.cp_s[0](m1, f.d(v1), m2, f.d(p), f.d(r))); }
  if (k === 1) { const M = R.pick([500, 1000, 2000]), m = R.pick([5, 10, 20]), v = R.pick([200, 300, 400]), p = m * v, r = sig(-p / M);
    return num(T.cp_q[1](M, m, v), r, T.cp_s[1](M, m, v, f.d(p), f.d(r))); }
  if (k === 2) { const m1 = R.pick([50, 60, 70]), v1 = R.pick([3, 4, 5]), m2 = R.pick([20, 30, 40]), p = m1 * v1, r = sig(p / (m1 + m2));
    return num(T.cp_q[2](m1, v1, m2), r, T.cp_s[2](m1, v1, m2, f.d(p), m1 + m2, f.d(r))); }
  const m1 = R.pick([8000, 10000, 12000]), v1 = R.pick([1, 2, 3]), m2 = R.pick([8000, 12000, 20000]), p = m1 * v1, r = sig(p / (m1 + m2));
  return num(T.cp_q[3](H.n(m1), v1, H.n(m2)), r, T.cp_s[3](H.n(m1), v1, H.n(m2), H.n(p), H.n(m1 + m2), f.d(r)));
});
def("fis11.choque", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 6);
  // elástico: velocidad de la PRIMERA bola, con signo (si es más ligera, rebota)
  if (k === 3) { const [m1, m2] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [2, 5], [3, 1], [2, 1], [4, 1], [3, 2], [5, 2]]), v1 = R.pick([2, 3, 4, 5, 6, 8]), r = sig((m1 - m2) / (m1 + m2) * v1);
    return num(T.ch_q[3](m1, v1, m2), r, T.ch_s[3](m1, m2, v1, m1 - m2, m1 + m2, f.d(r), r < 0, f.s(2 * m1 * v1 / (m1 + m2)))); }
  // choque frontal, sentidos opuestos, quedan unidos (Ejemplo 2): velocidad con signo
  if (k === 4) { const m1 = R.pick([800, 1000, 1200, 1500]), v1 = R.pick([10, 12, 15, 20]), m2 = R.pick([800, 1000, 1200, 1500, 2000]), v2 = R.pick([5, 8, 10, 15]), p = m1 * v1 - m2 * v2;
    if (p !== 0) { const r = sig(p / (m1 + m2)); return num(T.ch_q[4](H.n(m1), v1, H.n(m2), v2), r, T.ch_s[4](H.n(m1), v1, H.n(m2), v2, H.n(m1 * v1), H.n(m2 * v2), H.n(p), H.n(m1 + m2), f.d(r), r > 0)); } }
  // coeficiente de restitución de una pelota que bota (Ejemplo 4): e = √(h'/h)
  if (k === 5) { const h = R.pick([0.5, 1, 1.5, 2]), fr = R.pick([0.25, 0.36, 0.49, 0.5, 0.64, 0.7, 0.81]), h2 = rd(h * fr, 3), v = Math.sqrt(2 * g * h), v2 = Math.sqrt(2 * g * h2), r = sig(v2 / v);
    return num(T.ch_q[5](f.d(h), f.d(h2)), r, T.ch_s[5](f.d(h), f.s(v), f.d(h2), f.s(v2), f.d(r))); }
  // coeficiente de restitución con dos bolas que se acercan de frente y se separan
  if (k === 6) { const a = R.pick([2, 3, 4, 5, 6]), b = R.pick([1, 2, 3, 4]), e = R.pick([0.5, 0.6, 0.75, 0.8]), sep = e * (a + b), c = R.pick([0.5, 1, 1.5, 2].filter(x => x < sep - 0.4)), d = rd(sep - c, 2);
    return num(T.ch_q[6](a, b, f.d(c), f.d(d)), sig(e), T.ch_s[6](a, b, f.d(c), f.d(d), f.d(a + b), f.d(rd(sep, 2)), f.d(sig(e)))); }
  if (k === 0) { const m1 = R.pick([800, 1000, 1200, 1500]), v1 = R.pick([10, 15, 20]), m2 = R.pick([800, 1000, 1200]), M = m1 + m2, v = m1 * v1 / M, e1 = m1 * v1 * v1 / 2, e2 = M * v * v / 2, r = sig(e1 - e2);
    return num(T.ch_q[0](H.n(m1), v1, H.n(m2)), r, T.ch_s[0](H.n(m1), v1, H.n(m2), f.s(v), H.n(e1), H.n(M), f.s(e2), f.d(r)), Math.max(1, r * 0.01)); }
  if (k === 1) { const m1 = R.pick([1, 2, 3]), v1 = R.pick([3, 4, 6, 8]), m2 = R.pick([1, 2, 3, 4]), r = sig(2 * m1 * v1 / (m1 + m2)); return num(T.ch_q[1](m1, v1, m2), r, T.ch_s[1](m1, v1, m2, f.d(r))); }
  // bala de 5–10 g, bloque de 1–2 kg, subida de 5–15 cm: la bala va a 100–700 m/s
  const m = R.pick([5, 10]), M = R.pick([1, 2]), h = R.pick([5, 8, 10, 15]), V = Math.sqrt(2 * g * h / 100), r = sig((m / 1000 + M) * V / (m / 1000));
  return num(T.ch_q[2](m, M, h), r, T.ch_s[2](f.d(h / 100), f.s(V), f.d(m / 1000), M, f.d(r)), Math.max(1, r * 0.01));
});

/* ── U6 · Estática ── */
def("fis11.momento", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 3);
  if (k === 0) { const F = R.pick([20, 50, 80, 100]), d = R.pick([0.2, 0.25, 0.3, 0.5]), r = sig(F * d); return num(T.mo_q[0](F, f.d(d)), r, T.mo_s[0](F, f.d(d), f.d(r))); }
  if (k === 1) { const F = R.pick([20, 50, 80, 100]), d = R.pick([0.2, 0.25, 0.4, 0.5]), a = R.pick([30, 45, 60]), sn = Math.sin(rad(a)), r = sig(F * d * sn);
    return num(T.mo_q[1](F, f.d(d), a), r, T.mo_s[1](F, f.d(d), a, f.t(sn), f.s(d * sn), f.d(r))); }
  if (k === 2) { const M = R.pick([20, 40, 60, 90]), d = R.pick([0.2, 0.3, 0.4, 0.5]), r = sig(M / d); return num(T.mo_q[2](M, f.d(d)), r, T.mo_s[2](M, f.d(d), f.d(r))); }
  const F = R.pick([10, 15, 20, 25]), d = R.pick([0.3, 0.36, 0.4]), r = sig(F * d); return num(T.mo_q[3](F, f.d(d)), r, T.mo_s[3](F, f.d(d), f.d(r)));
});
def("fis11.palanca", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // escalera en una pared lisa (Ejemplo 4), a veces con una persona subida: fuerza de la pared
  if (k === 3) { const L = R.pick([3, 4, 5, 6]), P = R.pick([100, 150, 200, 250]), b = R.pick([53, 60, 65, 70, 75]), per = R.r() < 0.5, Pp = per ? R.pick([500, 600, 700]) : 0, s = per ? R.int(1, L - 1) : 0;
    const sn = Math.sin(rad(b)), c = Math.cos(rad(b)), Mw = P * L / 2 * c + Pp * s * c, Np = Mw / (L * sn), r = sig(Np);
    return num(T.pl_q[3](L, P, b, Pp, s), r, T.pl_s[3](L, P, b, Pp, s, f.t(sn), f.t(c), f.s(L * sn), f.s(Mw), f.d(r), f.s(Np / (P + Pp)))); }
  // barra con bisagra sujeta por un cable inclinado, con un cartel en el extremo
  if (k === 4) { const L = R.pick([1.5, 2, 3]), Pb = R.pick([40, 50, 80]), Pc = R.pick([100, 150, 200, 300]), a = R.pick([30, 37, 45, 53]), sn = Math.sin(rad(a)), Mw = Pb * L / 2 + Pc * L, r = sig(Mw / (L * sn));
    return num(T.pl_q[4](f.d(L), Pb, a, Pc), r, T.pl_s[4](f.d(L), Pb, a, Pc, f.d(L / 2), f.s(Mw), f.t(sn), f.d(r))); }
  if (k === 0) { const m1 = R.pick([20, 25, 30, 35]), d1 = R.pick([1.5, 2, 2.4]), m2 = R.pick([60, 70, 80]), r = sig(m1 * d1 / m2); return num(T.pl_q[0](m1, f.d(d1), m2), r, T.pl_s[0](m1, f.d(d1), m2, f.d(r))); }
  if (k === 1) { const Rr = R.pick([300, 600, 800]), dR = R.pick([0.3, 0.4, 0.5]), dF = R.pick([1.2, 1.5]), r = sig(Rr * dR / dF); return num(T.pl_q[1](Rr, f.d(dR), f.d(dF)), r, T.pl_s[1](Rr, f.d(dR), f.d(dF), f.d(r))); }
  const L = R.pick([3, 4, 5, 6]), P = R.pick([100, 200, 300]), Pp = R.pick([500, 600, 700]), d = R.int(1, L - 1), sum = Pp * d + P * L / 2, r = sig(sum / L);
  return num(T.pl_q[2](L, P, Pp, d), r, T.pl_s[2](L, P, Pp, d, f.d(L / 2), f.d(sum), f.d(r)));
});

/* ── U7 · Energía ── */
def("fis11.trabajo", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 3);
  // componentes no nulas (ni «0 i» ni fuerza nula)
  if (k === 0) { const fx_ = R.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]), fy = R.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]), dx = R.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), dy = R.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
    const a = fx_ * dx, b = fy * dy; return num(T.tr_q[0](T.vec(fx_, fy), T.vec(dx, dy)), a + b, T.tr_s[0](fx_, fy, dx, dy, a, b, f.d(a + b)), 0.01); }
  if (k === 1) { const kk = R.pick([100, 200, 500, 800]), x = R.pick([0.05, 0.1, 0.2, 0.3]), r = sig(kk * x * x / 2); return num(T.tr_q[1](kk, f.d(x)), r, T.tr_s[1](kk, f.d(x), f.d(r))); }
  if (k === 2) { const F = R.pick([300, 500, 600, 800]), v = R.pick([10, 20, 25, 30]); return num(T.tr_q[2](F, v), F * v, T.tr_s[2](F, v, H.n(F * v))); }
  const F = R.pick([10, 20, 30]), d1 = R.pick([2, 4, 5]), d2 = R.pick([2, 3, 4]), a = F * d1, b = F * d2 / 2; return num(T.tr_q[3](F, d1, d2), a + b, T.tr_s[3](F, d1, d2, a, f.d(b), f.d(a + b)));
});
def("fis11.conserva", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // péndulo soltado desde un ángulo: h = L(1 − cos θ)
  if (k === 4) { const L = R.pick([0.5, 0.8, 1, 1.5, 2]), a = R.pick([20, 30, 37, 45, 53, 60]), c = Math.cos(rad(a)), h = L * (1 - c), r = sig(Math.sqrt(2 * g * h));
    return num(T.co_q[4](f.d(L), a), r, T.co_s[4](f.d(L), a, f.t(c), f.s(h), f.d(r))); }
  // bola que cae sobre un muelle vertical (despreciando lo que baja al comprimirlo)
  if (k === 5) { const m = R.pick([0.1, 0.2, 0.5]), h = R.pick([0.2, 0.3, 0.5, 1]), kk = R.pick([490, 980, 1960]), e = m * g * h, x = Math.sqrt(2 * e / kk), r = sig(x * 100);
    return num(T.co_q[5](f.d(m), f.d(h), kk), r, T.co_s[5](f.d(m), f.d(h), f.s(e), kk, f.s(x), f.d(r))); }
  if (k === 0) { const h1 = R.pick([20, 30, 40, 50]), h2 = R.pick([0, 5, 10, 15]), r = sig(Math.sqrt(2 * g * (h1 - h2))); return num(T.co_q[0](h1, h2), r, T.co_s[0](h1, h2, h1 - h2, f.d(r))); }
  if (k === 1) { const L = R.pick([0.5, 1, 1.5, 2]), r = sig(Math.sqrt(2 * g * L)); return num(T.co_q[1](f.d(L)), r, T.co_s[1](f.d(L), f.d(r))); }
  if (k === 2) { const kk = R.pick([200, 400, 800, 1000]), x = R.pick([0.05, 0.1, 0.2]), m = R.pick([0.2, 0.5, 1]), e = kk * x * x / 2, r = sig(Math.sqrt(2 * e / m));
    return num(T.co_q[2](kk, f.d(x), f.d(m)), r, T.co_s[2](kk, f.d(x), f.d(rd(e, 4)), f.d(m), f.d(r))); }
  const Rr = R.pick([4, 6, 8, 10]), r = 2.5 * Rr; return num(T.co_q[3](Rr), r, T.co_s[3](Rr, 2 * Rr, f.d(Rr / 2), f.d(r)));
});
def("fis11.balance", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 3);
  if (k === 0) { const m = R.pick([60, 70, 80]), h = R.pick([30, 40, 50]), vmax = Math.sqrt(2 * g * h), v = R.int(Math.ceil(vmax * 0.5), Math.floor(vmax * 0.85)), ep = rd(m * g * h), ec = m * v * v / 2, r = rd(ep - ec);
    return num(T.ba_q[0](m, h, v), r, T.ba_s[0](m, h, v, H.dec(ep), H.dec(ec), H.dec(r)), Math.max(1, r * 0.01)); }
  const frena = (m, v, F) => { const ec = m * v * v / 2, r = sig(ec / F); return num(T.ba_q[1](H.n(m), v, H.n(F)), r, T.ba_s[1](H.n(m), v, H.n(F), H.dec(ec), f.d(r))); };
  if (k === 1) return frena(R.pick([800, 1000, 1200]), R.pick([20, 25, 30]), R.pick([6000, 8000, 10000]));
  if (k === 2) { const m = R.pick([1, 2, 5]), L = R.pick([4, 5, 8, 10]), a = R.pick([30, 37, 45]), mu = R.pick([0.1, 0.2]), sn = Math.sin(rad(a)), c = Math.cos(rad(a)), h = L * sn, ep = m * g * h, wr = mu * m * g * c * L, ec = ep - wr, r = sig(Math.sqrt(2 * ec / m));
    return num(T.ba_q[2](m, L, a, f.d(mu)), r, T.ba_s[2](L, f.t(sn), f.s(h), m, f.s(ep), f.d(mu), f.t(c), f.s(wr), f.s(ec), f.d(r))); }
  // grúa eléctrica con un rendimiento realista (60–85 %): la potencia consumida, redondeada hacia arriba a 100 W
  const m = R.pick([200, 300, 500]), h = R.pick([10, 12, 15]), t = R.pick([20, 30]), u = rd(m * g * h), P = Math.ceil(u / (R.pick([0.6, 0.65, 0.7, 0.75, 0.8, 0.85]) * t) / 100) * 100, c = P * t, r = rd(u / c * 100, 1);
  return num(T.ba_q[3](m, h, t, H.n(P)), r, T.ba_s[3](m, h, H.dec(u), H.n(P), t, H.n(c), f.d(r)), 0.2);
});

/* ── U8 · Termodinámica ── */
def("fis11.calorimetria", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // calentamiento en tres etapas (Ejemplo 1): hielo bajo cero → fusión → agua
  if (k === 4) { const m = R.pick([0.1, 0.2, 0.25, 0.5, 1]), t1 = R.pick([5, 10, 15, 20]), t2 = R.pick([10, 20, 30, 40, 50]), q1 = m * 2100 * t1, q2 = m * 334000, q3 = m * 4180 * t2, r = sig((q1 + q2 + q3) / 1000);
    return num(T.ca_q[4](f.d(m), t1, t2), r, T.ca_s[4](f.d(m), t1, t2, H.dec(rd(q1)), H.dec(rd(q2)), H.dec(rd(q3)), H.dec(rd(q1 + q2 + q3)), f.d(r))); }
  // cubito en el refresco (Ejemplo 4): fusión y calentamiento del agua del hielo; T_e > 0
  if (k === 5) { const mh = R.pick([20, 25, 30, 40, 50]), mw = R.pick([200, 250, 300, 400]), tw = R.pick([20, 25, 30]), Lq = mh / 1000 * 334000, A = mh / 1000 * 4180, B = mw / 1000 * 4180, te = (B * tw - Lq) / (A + B);
    if (te >= 2) { const r = sig(te); return num(T.ca_q[5](mh, mw, tw), r, T.ca_s[5](mh, mw, tw, H.dec(rd(Lq)), H.dec(rd(A, 1)), H.dec(rd(B, 1)), H.dec(rd(B * tw)), H.dec(rd(A + B, 1)), H.dec(rd(B * tw - Lq)), f.d(r)), 0.15); } }
  if (k === 0) { const m1 = R.pick([100, 200, 300]), t1 = R.pick([60, 70, 80, 90]), m2 = R.pick([100, 200, 300, 400]), t2 = R.pick([10, 15, 20]), r = rd((m1 * t1 + m2 * t2) / (m1 + m2), 1);
    return num(T.ca_q[0](m1, t1, m2, t2), r, T.ca_s[0](m1, t1, m2, t2, H.n(m1 * t1 + m2 * t2), m1 + m2, f.d(r)), 0.15); }
  if (k === 1) { const [c, name] = R.pick([[440, "hierro"], [900, "aluminio"], [385, "cobre"]]), m = R.pick([100, 200]), t1 = 100, mw = R.pick([200, 300, 400]), t2 = 20;
    const te = rdD((m / 1000 * c * t1 + mw / 1000 * 4180 * t2) / (m / 1000 * c + mw / 1000 * 4180), 1), q = mw / 1000 * 4180 * (te - t2), cc = sig(q / (m / 1000 * (t1 - te)));
    return num(T.ca_q[1](m, t1, mw, t2, f.d(te)), cc, T.ca_s[1](f.d(mw / 1000), f.d(te), f.s(q), f.d(m / 1000), f.d(rd(t1 - te, 1)), f.d(cc)), Math.max(5, cc * 0.03)); }
  if (k === 2) { const L0 = R.pick([10, 20, 25, 50]), dT = R.pick([20, 30, 40, 50]), dl = 1.2e-5 * L0 * dT, r = rd(dl * 1000, 2); return num(T.ca_q[2](L0, dT), r, T.ca_s[2](L0, dT, f.d(rd(dl, 6)), f.d(r))); }
  const m = R.pick([0.2, 0.5, 1]), t = R.pick([20, 25, 30, 40]), q = rd(m * 4180 * t), r = sig(q / 334000); return num(T.ca_q[3](f.d(m), t), r, T.ca_s[3](f.d(m), t, H.dec(q), f.d(r)), 0.003);
});
def("fis11.primer", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 5);
  // isotermo (gas ideal): ΔU = 0, así que Q = −W; con su signo
  if (k === 4) { const W = R.pick([150, 200, 300, 450, 600]), exp = R.r() < 0.5; return num(T.pp_q[4](W, exp), exp ? W : -W, T.pp_s[4](W, exp)); }
  // ciclo rectangular en el diagrama P–V: trabajo neto = área (P en 10⁵ Pa, V en L)
  if (k === 5) { const p2 = R.pick([1, 2]), p1 = p2 + R.pick([1, 2, 3]), v1 = R.pick([1, 2]), v2 = v1 + R.pick([1, 2, 3, 4]), wab = -p1 * (v2 - v1) * 100, wcd = p2 * (v2 - v1) * 100, r = -(wab + wcd);
    return num(T.pp_q[5](p1, p2, v1, v2), r, T.pp_s[5](p1, p2, v1, v2, v2 - v1, wab, wcd, wab + wcd, r)); }
  if (k === 0) { const Q = R.pick([300, 500, 800, 1000]), P = R.pick([100000, 200000]), v1 = R.pick([1, 2, 3]), dv = R.pick([1, 2]), v2 = v1 + dv, W = -P * dv / 1000;
    return num(T.pp_q[0](Q, H.n(P), v1, v2), Q + W, T.pp_s[0](Q, H.n(P), v1, v2, dv, f.d(W), f.d(Q + W))); }
  if (k === 1) { const Q = R.pick([200, 500, 800, 1200]); return num(T.pp_q[1](Q), Q, T.pp_s[1](Q)); }
  if (k === 2) { const P = R.pick([100000, 200000]), v1 = R.pick([4, 5, 6]), dv = R.pick([1, 2]), v2 = v1 - dv, W = P * dv / 1000, Q = R.pick([150, 350, 500]);
    return num(T.pp_q[2](H.n(P), v1, v2, Q), W - Q, T.pp_s[2](H.n(P), v1, v2, dv, W, Q, f.d(W - Q))); }
  const W = R.pick([100, 250, 400]); return num(T.pp_q[3](W), W, T.pp_s[3](W));
});
def("fis11.maquina", (R, S, H) => {
  const T = S.fis11, f = fx(H), k = R.int(0, 4);
  // con el rendimiento y el trabajo: calor absorbido y calor cedido al foco frío
  if (k === 4) { const eta = R.pick([20, 25, 40]), w = R.pick([300, 400, 500, 600, 800, 1000]), qc = Math.round(w * 100 / eta), qf = qc - w;   // Q_c entero
    return num(T.mq_q[4](eta, w), qf, T.mq_s[4](eta, w, H.n(qc), H.n(qf))); }
  if (k === 0) { const tc = R.pick([227, 327, 500, 547]), tf = R.pick([17, 20, 27]), Tc = tc + 273, Tf = tf + 273, r = rd((1 - Tf / Tc) * 100, 1); return num(T.mq_q[0](tc, tf), r, T.mq_s[0](tc, tf, Tc, Tf, f.d(r)), 0.3); }
  if (k === 1) { const qc = R.pick([1000, 2000, 2500, 4000]), fr = R.pick([0.6, 0.65, 0.7, 0.75]), qf = qc * fr, w = qc - qf, r = rd(w / qc * 100, 1); return num(T.mq_q[1](H.n(qc), H.n(qf)), r, T.mq_s[1](H.n(qc), H.n(qf), H.n(w), f.d(r)), 0.2); }
  if (k === 2) { const w = R.pick([100, 200, 250]), cop = R.pick([2, 2.5, 3, 4]), qf = w * cop; return num(T.mq_q[2](qf, w), cop, T.mq_s[2](qf, w, f.d(cop))); }
  const cop = R.pick([3, 3.5, 4, 5]), w = R.pick([1000, 2000, 3000]); return num(T.mq_q[3](f.d(cop), H.n(w)), cop * w, T.mq_s[3](f.d(cop), H.n(w), H.n(cop * w)));
});
})();
