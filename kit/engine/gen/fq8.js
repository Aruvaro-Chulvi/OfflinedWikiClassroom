/* WikiAula — Física y Química, Grado 8 (2.º de ESO): problemas numéricos y bancos.
   Textos y bancos en i18n/<lang>/fq8.js (S.fq8); bancos con WA.BANK (gen/_common.js). */
"use strict";
(function () {
const WA = window.WA, B = WA.BANK;
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
const REDONDEA_EXACTAS = false;   // false en FyQ 8, que aún no enseña cifras significativas: solo se redondea lo que no es exacto
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
const exact = (x, r) => Math.abs(x - r) < 1e-9;   // ¿el resultado redondeado es exacto? («=» o «≈»)
const num = (q, ans, sol, tol) => ({ q, kind: "num", ans, tol: tol != null ? tol : Math.max(0.011, Math.abs(ans) * 0.005), sol });
// elección con la buena en opts[0]: se barajan aquí (los generadores no se barajan solos)
const choice = (R, q, opts, sol) => { const sh = R.shuffle(opts.map((o, i) => [o, i])); return { q, kind: "choice", opts: sh.map(x => x[0]), correct: sh.findIndex(x => x[1] === 0), sol }; };
// elección con opciones en orden fijo (sí/no, atraen/repelen…)
const fixed = (q, opts, correct, sol) => ({ q, kind: "choice", opts, correct, shuffle: false, sol });

// ── bancos de clasificación ──
def("fq8.metodo", (R, S) => B.mixed(S.fq8.metodo, R));
def("fq8.material", (R, S) => B.mixed(S.fq8.material, R));
def("fq8.pictograma", (R, S) => B.mixed(S.fq8.pictograma, R));
def("fq8.propiedad", (R, S) => B.mixed(S.fq8.propiedad, R));
def("fq8.estado", (R, S) => B.mixed(S.fq8.estado, R));
def("fq8.tcm", (R, S) => B.mixed(S.fq8.tcm, R));
def("fq8.elemento", (R, S) => B.mixed(S.fq8.elemento, R));
def("fq8.cambioestado", (R, S) => B.mixed(S.fq8.cambioestado, R));
def("fq8.mezcla", (R, S) => B.mixed(S.fq8.mezcla, R));
def("fq8.separar", (R, S) => B.mixed(S.fq8.separar, R));
def("fq8.cambio", (R, S) => B.mixed(S.fq8.cambio, R));
def("fq8.astro", (R, S) => B.mixed(S.fq8.astro, R));
def("fq8.formaenergia", (R, S) => B.mixed(S.fq8.formaenergia, R));
def("fq8.fuente", (R, S) => B.mixed(S.fq8.fuente, R));
def("fq8.transmision", (R, S) => B.mixed(S.fq8.transmision, R));
def("fq8.electrizacion", (R, S) => B.mixed(S.fq8.electrizacion, R));

// Variables de un experimento: varios experimentos, y cada pregunta dice de cuál habla
def("fq8.variable", (R, S) => {
  const T = S.fq8.VAR, [exp, ind, dep, ctrls] = R.pick(T.exps);
  const its = [[ind, 0], [dep, 1], ...ctrls.map(c => [c, 2])];
  if (R.r() < 0.6) {
    const [x, k] = R.pick(its);
    return fixed(T.q(exp, x), T.cats, k, T.sol(x, k));
  }
  const k = R.int(0, 2), ctl = R.pick(ctrls), good = [ind, dep, ctl][k];
  return choice(R, T.find(exp, k), [good, ...[ind, dep, ctl].filter(x => x !== good)].map(T.cap), T.sol(good, k));
});

// ── problemas numéricos ──
const CONV = [ // [unidad origen, unidad destino, factor, texto del factor, rango]
  ["km", "m", 1000, "1000 m / 1 km", [1, 50, 1]], ["m", "cm", 100, "100 cm / 1 m", [1, 30, 1]], ["cm", "m", 0.01, "1 m / 100 cm", [5, 900, 5]],
  ["g", "kg", 0.001, "1 kg / 1000 g", [50, 5000, 50]], ["kg", "g", 1000, "1000 g / 1 kg", [1, 20, 0.5]], ["mg", "g", 0.001, "1 g / 1000 mg", [100, 9000, 100]],
  ["min", "s", 60, "60 s / 1 min", [1, 30, 1]], ["h", "s", 3600, "3600 s / 1 h", [1, 5, 0.5]], ["mL", "L", 0.001, "1 L / 1000 mL", [50, 5000, 50]],
  ["L", "cm³", 1000, "1000 cm³ / 1 L", [1, 10, 0.5]], ["km/h", "m/s", 1 / 3.6, "1000 m / 1 km · 1 h / 3600 s", [18, 144, 18]], ["m/s", "km/h", 3.6, "3600 s / 1 h · 1 km / 1000 m", [5, 40, 5]],
  ["m²", "cm²", 10000, "10 000 cm² / 1 m²", [1, 9, 1]],
];
def("fq8.unidades", (R, S, H) => {
  const [u1, u2, f, ft, [a, b, st]] = R.pick(CONV);
  const v = rd(a + st * R.int(0, Math.round((b - a) / st)), 2), r = rd(v * f, 4);
  return num(S.fq8.un_q(H.dec(v), u1, u2), r, S.fq8.un_s(H.dec(v), u1, H.esn(ft), H.dec(r), u2), Math.max(1e-6, Math.abs(r) * 0.002));
});
// Densidad con los valores de la tabla de la lección: tres despejes, volumen por inmersión, ¿flota? y ¿de qué es?
def("fq8.densidad", (R, S, H) => {
  const T = S.fq8.DE, k = R.int(0, 5);
  const solidos = T.mats.filter(m => m[2]);
  if (k === 0) { const [n, d] = R.pick(T.mats), V = R.int(1, 10) * 10, m = rd(d * V); return num(T.q0(H.dec(m), V), d, T.s0(H.dec(m), V, H.dec(d), n)); }
  if (k === 1) {
    const [n, d, sol] = R.pick(T.mats);
    if (!sol && R.r() < 0.5) { const L = R.pick([0.5, 1, 1.5, 2, 3, 5]), V = L * 1000, m = rd(d * V); return num(T.q1L(n, H.dec(d), H.dec(L)), m, T.s1L(H.dec(L), V, H.dec(d), H.dec(m))); }
    const V = R.int(1, 10) * 10, m = rd(d * V); return num(T.q1(n, H.dec(d), V), m, T.s1(H.dec(d), V, H.dec(m)));
  }
  if (k === 2) { const [n, d] = R.pick(T.mats), V = R.int(1, 10) * 10, m = rd(d * V); return num(T.q2(H.dec(m), n, H.dec(d)), V, T.s2(H.dec(m), H.dec(d), V)); }
  if (k === 3) {   // volumen por inmersión
    const [n, d] = R.pick(solidos.filter(m => m[1] > 1)), V0 = R.pick([20, 30, 40, 50]), dV = R.pick([5, 8, 10, 12, 15, 20]), m = rd(d * dV);
    return num(T.q3(H.dec(m), V0, V0 + dV), d, T.s3(V0 + dV, V0, dV, H.dec(m), H.dec(d), n));
  }
  if (k === 4) {   // ¿flota?
    const d = R.pick([0.24, 0.5, 0.6, 0.8, 1.2, 1.5, 2.7, 7.9]), V = R.int(1, 10) * 10, m = rd(d * V), liq = R.pick(T.liqs), fl = d < liq[1];
    return fixed(T.q4(H.dec(m), V, liq[0]), T.o4, fl ? 0 : 1, T.s4(H.dec(m), V, H.dec(d), liq[0], H.dec(liq[1]), fl));
  }
  const [n, d] = R.pick(solidos), V = R.int(1, 10) * 10, m = rd(d * V);   // ¿de qué es?
  const otros = R.shuffle(solidos.filter(x => x[0] !== n)).slice(0, 3).map(x => x[0]);
  return choice(R, T.q5(H.dec(m), V), [n, ...otros].map(T.cap), T.s5(H.dec(m), V, H.dec(d), n));
});
def("fq8.estadoT", (R, S) => {
  const subs = [["agua", 0, 100], ["etanol", -114, 78], ["mercurio", -39, 357], ["hierro", 1538, 2862], ["oxígeno", -218, -183], ["plomo", 327, 1749], ["acetona", -95, 56]];
  const [n, f, e] = R.pick(subs), k = R.int(0, 2);
  const t = k === 0 ? Math.max(f - R.int(5, 60), -270) : k === 1 ? Math.round(f + (e - f) * (0.2 + 0.6 * R.r())) : e + R.int(5, 80);
  return { q: S.fq8.et_q(n, f, e, t), kind: "choice", opts: S.fq8.et_o, correct: k, shuffle: false, sol: S.fq8.et_s(t, f, e, k) };
});
// Concentración: g/L, % en masa, m = c · V (con el paso mL → L y la suma soluto + disolvente), % vol y saturación
def("fq8.concentracion", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 4);
  if (k === 0) { const V = R.pick([100, 200, 250, 500, 750, 1000, 1500, 2000]), c = R.int(2, 60), m = rd(c * V / 1000, 2); return num(T.co_q[0](H.dec(m), V), c, T.co_s[0](H.dec(m), V, H.dec(V / 1000), c)); }
  if (k === 1) { const p = R.pick([2, 4, 5, 8, 10, 12, 15, 20, 25]), tot = R.pick([50, 100, 200, 250, 400, 500]), ms = rd(tot * p / 100, 2), md = rd(tot - ms, 2); return num(T.co_q[1](H.dec(ms), H.dec(md)), p, T.co_s[1](H.dec(ms), H.dec(md), H.dec(tot), p)); }
  if (k === 2) { const c = R.int(5, 80), V = R.pick([100, 200, 250, 400, 500, 750]), m = rd(c * V / 1000, 2); return num(T.co_q[2](c, V), m, T.co_s[2](c, V, H.dec(V / 1000), H.dec(m))); }
  if (k === 3) { const [what, ps, sol] = R.pick(T.co_vol), p = R.pick(ps), V = R.pick([100, 125, 200, 250, 330, 500, 1000]), r = rd(V * p / 100, 2); return num(T.co_q[3](what, V, p, sol), r, T.co_s[3](p, sol, V, H.dec(r))); }
  const w = R.pick([50, 100, 200, 250]), mx = 36 * w / 100, s = mx + R.int(2, 30);
  return num(T.co_q[4](s, w), s - mx, T.co_s[4](w, mx, s, s - mx));
});
// Lavoisier: sumas y restas de masas, contar átomos (coeficiente × subíndice) y recipiente abierto o cerrado
def("fq8.lavoisier", (R, S, H) => {
  const T = S.fq8, x = R.r();
  if (x < 0.5) {
    // proporciones reales en masa (Fe + S → FeS 7:4, C + O₂ → CO₂ 3:8, 2Mg + O₂ → 2MgO 3:2, Cu + S → CuS 2:1, 2H₂ + O₂ → 2H₂O 1:8, 2Na + Cl₂ → 2NaCl 46:71)
    const pairs = [["hierro", "azufre", 7, 4], ["carbono", "oxígeno", 3, 8], ["magnesio", "oxígeno", 3, 2], ["cobre", "azufre", 2, 1], ["hidrógeno", "oxígeno", 1, 8], ["sodio", "cloro", 46, 71]];
    const [A, Bn, ra, rb] = R.pick(pairs), kk = ra > 40 ? 1 : R.int(1, Math.floor(60 / Math.max(ra, rb))), a = ra * kk, b = rb * kk;
    if (R.r() < 0.5) return num(T.la_q[0](a, b, A, Bn), a + b, T.la_s[0](a, b, a + b));
    return num(T.la_q[1](a, a + b, A, Bn), b, T.la_s[1](a + b, a, b, A, Bn));
  }
  if (x < 0.8) { const [eq, els] = R.pick(T.LA_EQ), [el, n, izq, der] = R.pick(els); return num(T.la_q[2](eq, el), n, T.la_s[2](izq, der, n), 0); }
  const [q, opts, sol] = R.pick(T.LA_ABIERTO);
  return choice(R, q, opts, sol);
});
def("fq8.desplazamiento", (R, S) => {
  const x0 = R.int(0, 5) * 10, x1 = x0 + R.int(10, 60) * 10, x2 = x0 + R.int(-5, Math.round((x1 - x0) / 10) - 1) * 10;
  const d = (x1 - x0) + (x1 - x2), D = x2 - x0;
  return { q: S.fq8.dz_q(x0, x1, x2), kind: "fields", fields: [{ label: S.fq8.dz_f[0], ans: d }, { label: S.fq8.dz_f[1], ans: D }], sol: S.fq8.dz_s(x0, x1, x2, d, D) };
});
// Velocidad: v, Δx y t con la fórmula de la lección; km/h → m/s; posición x = x₀ + v · t; minutos → segundos
def("fq8.velocidad", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 5);
  if (k === 0) { const v = R.int(3, 12), t = R.int(5, 60), d = v * t; return num(T.ve_q[0](d, t), v, T.ve_s[0](d, t, v)); }
  if (k === 1) { const v = R.int(4, 24) * 5, t = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), d = rd(v * t); return num(T.ve_q[1](v, H.dec(t)), d, T.ve_s[1](v, H.dec(t), H.dec(d))); }
  if (k === 2) { const v = R.pick([60, 80, 90, 100, 120, 150, 200, 250, 300]), t = R.pick([0.5, 1, 1.5, 2, 2.5, 3]), d = rd(v * t); return num(T.ve_q[2](H.dec(d), v), t, T.ve_s[2](H.dec(d), v, H.dec(t))); }
  if (k === 3) { const v = R.int(1, 10) * 18, r = v / 3.6; return num(T.ve_q[3](v), r, T.ve_s[3](v, H.dec(r))); }
  if (k === 4) { const x0 = R.int(1, 20) * 10, v = R.pick([5, 10, 15, 20, 25, 30]), t = R.int(2, 20), x = x0 + v * t; return num(T.ve_q[4](x0, v, t), x, T.ve_s[4](x0, v, t, v * t, x)); }
  const [who, vs] = R.pick(T.ve_quien), v = R.pick(vs), min = R.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), s = min * 60, d = rd(v * s);
  return num(T.ve_q[5](who, H.dec(v), min), d, T.ve_s[5](min, s, H.dec(v), H.dec(d)));
});
// Aceleración: a y v con la fórmula; caída libre; de 0 a km/h (paso a m/s); tiempo de frenada
def("fq8.aceleracion", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 4);
  if (k === 0) { const v0 = R.int(0, 20), t = R.int(2, 10), a = R.pick([-3, -2, -1, 1, 2, 3, 4, 5]) * (R.r() < 0.5 ? 1 : 0.5), v = v0 + a * t;
    if (v < 0) return num(T.ac_q[0](v0 + t * 2, v0, t), -2, T.ac_s[0](v0, v0 + 2 * t, t, "−2"));
    return num(T.ac_q[0](v0, H.dec(v), t), a, T.ac_s[0](H.dec(v), v0, t, H.dec(a))); }
  if (k === 1) { const v0 = R.int(0, 15), a = R.int(1, 6), t = R.int(2, 8), v = v0 + a * t; return num(T.ac_q[1](v0, a, t), v, T.ac_s[1](v0, a, t, v)); }
  if (k === 2) { const t = R.pick([1, 1.5, 2, 2.5, 3, 4, 5]), v = rd(9.8 * t); return num(T.ac_q[2](H.dec(t)), v, T.ac_s[2](H.dec(t), H.dec(v))); }
  if (k === 3) { const kmh = R.pick([36, 54, 72, 90, 108]), ms = kmh / 3.6, t = R.pick([5, 10]), a = rd(ms / t); return num(T.ac_q[3](kmh, t), a, T.ac_s[3](kmh, H.dec(ms), t, H.dec(a))); }
  const a = R.pick([2, 3, 4, 5, 6]), t = R.int(2, 6), v0 = a * t;
  return num(T.ac_q[4](v0, a), t, T.ac_s[4](v0, a, t));
});
// Hooke: con el paso cm → m escrito, y el problema de proporcionalidad («con 2 N se alarga 4 cm…»)
def("fq8.hooke", (R, S, H) => {
  const T = S.fq8, k = R.pick([20, 25, 40, 50, 80, 100, 150, 200, 250, 400, 500]), cm = R.int(1, 20), m = cm / 100, F = rd(k * m, 3), q = R.int(0, 3);
  if (q === 0) return num(T.ho_q[0](k, cm), F, T.ho_s[0](k, cm, H.dec(m), H.dec(F)));
  if (q === 1) return num(T.ho_q[1](k, H.dec(F)), cm, T.ho_s[1](H.dec(F), k, H.dec(m), cm));
  if (q === 2) return num(T.ho_q[2](H.dec(F), cm), k, T.ho_s[2](H.dec(F), cm, H.dec(m), k));
  const r = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), F1 = R.int(1, 6), F2 = R.pick([1, 2, 3, 4, 5, 6, 7, 8, 10].filter(x => x !== F1)), a = rd(r * F1), b = rd(r * F2);
  return num(T.ho_q[3](H.dec(a), F1, F2), b, T.ho_s[3](H.dec(a), F1, H.dec(r), F2, H.dec(b)));
});
// Peso, masa, normal y resultante (la mitad de la lección que solo tenía preguntas fijas)
def("fq8.peso", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 4);
  if (k === 0) { const [w, g] = R.pick(T.pe_lugares), m = R.int(1, 100), P = rd(m * g); return num(T.pe_q[0](m, w, H.dec(g)), P, T.pe_s[0](m, H.dec(g), H.dec(P))); }
  if (k === 1) { const m = R.pick([2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80]), P = rd(m * 9.8); return num(T.pe_q[1](H.dec(P)), m, T.pe_s[1](H.dec(P), m)); }
  if (k === 2) { const [obj, ms] = R.pick(T.pe_objs), m = R.pick(ms), N = rd(m * 9.8); return num(T.pe_q[2](obj, H.dec(m)), N, T.pe_s[2](H.dec(m), H.dec(N))); }
  if (k === 3) { const F = R.int(4, 20) * 10, f = R.int(2, F / 10 - 1) * 10; return num(T.pe_q[3](F, f), F - f, T.pe_s[3](F, f, F - f)); }
  if (R.r() < 0.5) { const a = R.int(3, 12) * 10, b = R.int(3, 12) * 10, f = R.int(2, Math.floor((a + b) / 10) - 1) * 10; return num(T.pe_q[4](a, b, f), a + b - f, T.pe_s[4](a, b, f, a + b - f)); }
  const F = R.int(2, 15) * 10; return num(T.pe_q[5](F), F, T.pe_s[5](F));
});
// La luz: tiempos con contexto (en minutos), distancias y unidades astronómicas
def("fq8.anoluz", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 3);
  if (k === 0) {
    const [name, d] = R.pick(T.al_destinos), s = d / 300000;
    if (d < 1e6) return num(T.al_q[0](name, H.n(d)), rd(s, 2), T.al_s[0](H.n(d), H.dec(rd(s, 2))));
    const mi = rd(s / 60, 1); return num(T.al_q[1](name, H.n(d / 1e6)), mi, T.al_s[1](H.n(d), H.dec(rd(s, 1)), H.dec(mi)), 0.06);
  }
  if (k === 1) { const s = R.int(1, 60), d = 300000 * s; return num(T.al_q[2](s), d, T.al_s[2](s, H.n(d))); }
  const [p, ua] = R.pick(T.al_planetas), mk = rd(ua * 150, 1);
  if (k === 2) return num(T.al_q[3](p, H.dec(ua)), mk, T.al_s[3](H.dec(ua), H.dec(mk)));
  return num(T.al_q[4](p, H.dec(mk)), ua, T.al_s[4](H.dec(mk), H.dec(ua)));
});
// Energía: kWh y kcal a julios (con el paso intermedio), E = P · t con W → kW, coste en euros y rendimiento
def("fq8.julios", (R, S, H) => {
  const T = S.fq8, k = R.pick([0, 1, 2, 2, 3, 3, 4, 4]);
  if (k === 0) { const e = R.int(1, 10), j = e * 3600000; return num(T.ju_q[0](e), j, T.ju_s[0](e, H.n(j))); }
  if (k === 1) { const [food, ks] = R.pick(T.ju_comida), kc = R.pick(ks), j = rd(kc * 4180); return num(T.ju_q[1](food, kc), j, T.ju_s[1](kc, H.n(kc * 1000), H.n(j))); }
  const [ap, ws, hs] = R.pick(T.ju_aparatos), W = R.pick(ws), kW = W / 1000, h = R.pick(hs);
  if (k === 2) { const E = rd(kW * h, 3); return num(T.ju_q[2](ap, W, H.dec(h)), E, T.ju_s[2](W, H.dec(kW), H.dec(h), H.dec(E))); }
  if (k === 3) {
    const hh = h * 30, E = rd(kW * hh, 3), c = rdD(E * 0.15, 2);   // euros: a céntimos
    return exacto(num(T.ju_q[3](ap, W, H.dec(h)), c, T.ju_s[3](W, H.dec(kW), H.dec(h), H.dec(hh), H.dec(E), H.dec(rd(E * 0.15, 4)), H.dec(c), exact(E * 0.15, c)), 0.011));
  }
  const [maq, rs] = R.pick(T.ju_maquinas), r = R.pick(rs), Ein = R.pick([100, 200, 400, 500, 1000, 2000]), Eu = Ein * r / 100;
  return num(T.ju_q[4](maq, Ein, H.dec(Eu)), r, T.ju_s[4](H.dec(Eu), Ein, r, H.dec(Ein - Eu)));
});
// Kelvin y Celsius con temperaturas reales con nombre (y algunas sin él)
def("fq8.kelvin", (R, S) => {
  const T = S.fq8, sg = x => (x < 0 ? "−" + -x : String(x)), par = x => (x < 0 ? "(−" + -x + ")" : String(x));
  if (R.r() < 0.35) {
    if (R.r() < 0.5) { const c = R.int(-200, 400); return num(T.kv_q[0](sg(c)), c + 273, T.kv_s[0](par(c), c + 273)); }
    const k = R.int(0, 700), c = k - 273; return num(T.kv_q[1](k), c, T.kv_s[1](k, sg(c)));
  }
  if (R.r() < 0.55) { const [n, c] = R.pick(T.kv_celsius); return num(T.kv_q[2](n, sg(c)), c + 273, T.kv_s[0](par(c), c + 273)); }
  const [n, k] = R.pick(T.kv_kelvin), c = k - 273; return num(T.kv_q[3](n, k), c, T.kv_s[1](k, sg(c)));
});
// Ley de Ohm: con números amables, mA → A, «resistencia total» en serie y circuitos en paralelo
def("fq8.ohm", (R, S, H) => {
  const T = S.fq8, k = R.int(0, 4);
  if (k === 0) { const R0 = R.pick([2, 4, 5, 6, 10, 12, 20, 50, 100]), I = R.pick([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]), V = rd(I * R0); return num(T.oh_q[0](H.dec(V), R0), I, T.oh_s[0](H.dec(V), R0, H.dec(I))); }
  if (k === 1) {
    if (R.r() < 0.4) { const mA = R.pick([20, 50, 100, 200, 250, 500]), R0 = R.pick([10, 20, 40, 50, 100, 200]), I = mA / 1000, V = rd(I * R0); return num(T.oh_q[4](mA, R0), V, T.oh_s[4](mA, H.dec(I), R0, H.dec(V))); }
    const R0 = R.pick([5, 10, 15, 20, 40, 100]), I = R.pick([0.1, 0.2, 0.5, 1, 2, 3]), V = rd(I * R0); return num(T.oh_q[1](H.dec(I), R0), V, T.oh_s[1](H.dec(I), R0, H.dec(V)));
  }
  if (k === 2) { const V = R.pick([4.5, 9, 12, 24, 230]), I = R.pick([0.5, 1, 1.5, 2, 3]), r = rd(V / I); return num(T.oh_q[2](H.dec(V), H.dec(I)), r, T.oh_s[2](H.dec(V), H.dec(I), H.dec(r))); }
  if (k === 3) {   // serie: la tensión de una pila habitual y una intensidad redonda
    let R1 = 10, R2 = 20, V = 6, I = 0.2;
    for (let i = 0; i < 100; i++) {
      const a = R.pick([2, 4, 5, 10, 15, 20, 25, 30]), b = R.pick([1, 3, 5, 10, 20, 30, 40]), c = R.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 1, 1.5, 2]), v = rd(c * (a + b), 4);
      if ([1.5, 3, 4.5, 6, 9, 12, 24].includes(v)) { R1 = a; R2 = b; V = v; I = c; break; }
    }
    return num(T.oh_q[3](R1, R2, H.dec(V)), I, T.oh_s[3](R1, R2, R1 + R2, H.dec(V), H.dec(I)));
  }
  let R0 = 10, V = 6;   // paralelo: dos bombillas iguales
  for (let i = 0; i < 100; i++) { const a = R.pick([5, 10, 15, 20, 30]), v = R.pick([3, 4.5, 6, 9, 12]); if (exact(rd(v / a, 2), v / a)) { R0 = a; V = v; break; } }
  const i1 = rd(V / R0, 2), tot = rd(2 * i1, 2);
  return { q: T.oh_q[5](R0, H.dec(V)), kind: "fields", fields: [{ label: T.oh_f[0], ans: i1, kind: "num", tol: 0.011 }, { label: T.oh_f[1], ans: tot, kind: "num", tol: 0.011 }],
    sol: T.oh_s[5](H.dec(V), R0, H.dec(i1), H.dec(tot)) };
});
// Átomo: electrones de un átomo neutro, Z, qué elemento es y contar átomos en una fórmula
def("fq8.atomo", (R, S) => {
  const T = S.fq8.AT, k = R.int(0, 3);
  if (k === 0) { const [Z, n, s] = R.pick(T.els); return num(T.q0(n, s, Z), Z, T.s0(Z), 0); }
  if (k === 1) { const [Z] = R.pick(T.els), nn = Z <= 2 ? R.int(Z - 1, Z) : Z + R.int(0, 2) + (Z > 20 ? 4 : 0); return num(T.q1(Z, nn), Z, T.s1(Z), 0); }
  if (k === 2) {
    const i = R.int(0, T.els.length - 1), [Z, n, s] = T.els[i];
    const near = R.shuffle(T.els.filter((e, j) => j !== i && Math.abs(j - i) <= 3)).slice(0, 3).map(e => T.nom(e));
    return choice(R, T.q2(Z), [T.nom(T.els[i]), ...near], T.s2(Z, n, s));
  }
  const [nom, f, parts] = R.pick(T.forms);
  if (parts.length > 1 && R.r() < 0.4) { const [el, c] = R.pick(parts); return num(T.q3el(el, f, nom), c, T.s3el(el, c), 0); }
  const tot = parts.reduce((a, p) => a + p[1], 0);
  return num(T.q3(nom, f), tot, T.s3(parts, tot), 0);
});
// Química y medio ambiente: emparejar causa y problema, y las emisiones de CO₂ de un coche
def("fq8.ambiente", (R, S, H) => {
  const T = S.fq8;
  if (R.r() < 0.3) { const g = R.pick([100, 110, 120, 130, 150, 180]), km = R.pick([50, 100, 200, 250, 500, 1000, 15000]), t = g * km; return num(T.am_q(g, H.n(km)), t / 1000, T.am_s(g, H.n(km), H.n(t), H.dec(t / 1000))); }
  return B.mixed(T.ambiente, R);
});
// Cargas: atracción y repulsión, carga neta, ganar o perder electrones al frotar
def("fq8.cargas", (R, S) => {
  const T = S.fq8, k = R.pick([0, 0, 1, 2, 3]), sg = x => (x > 0 ? "+" + x : x < 0 ? "−" + -x : "0");
  if (k === 0) return B.mixed(T.cargas, R);
  if (k === 1) { const p = R.int(4, 30), e = Math.max(0, p + R.pick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])), q = p - e; return num(T.ca_q[0](p, e), q, T.ca_s[0](p, e, sg(q), q), 0); }
  if (k === 2) { const n = R.int(1, 12), gana = R.r() < 0.5, q = gana ? -n : n; return num(T.ca_q[1](gana, n), q, T.ca_s[1](gana, n, sg(q)), 0); }
  const [q, opts, sol] = R.pick(T.ca_frotar);
  return choice(R, q, opts, sol);
});
// Imanes y electroimanes: aparatos, polos, partir un imán, vueltas y clips, brújula
def("fq8.electroimanes", (R, S) => {
  const T = S.fq8, k = R.pick([0, 0, 1, 2, 3, 4]);
  if (k === 0) return B.mixed(T.electroimanes, R);
  if (k === 1) { const a = R.int(0, 1), b = R.int(0, 1); return fixed(T.im_q[0](T.polos[a], T.polos[b]), T.im_o, a === b ? 1 : 0, T.im_s[0](a === b)); }
  if (k === 2) {
    const nIzq = R.r() < 0.5, trozoIzq = R.r() < 0.5, corteN = nIzq ? !trozoIzq : trozoIzq;   // N a la izquierda: el trozo izquierdo tiene S en el corte
    return fixed(T.im_q[1](nIzq, trozoIzq), T.im_o2, corteN ? 0 : 1, T.im_s[1](nIzq, trozoIzq, corteN));
  }
  if (k === 3) { const v = R.pick([5, 10, 15, 20]), c = R.int(2, 6), m = R.pick([2, 3, 4]); return num(T.im_q[2](v, c, v * m), c * m, T.im_s[2](m, c, c * m), 0); }
  const [q, opts, sol] = R.pick(T.im_ideas);
  return choice(R, q, opts, sol);
});
// ── Las máquinas simples (generadores añadidos) ──
def("fq8.palancas", (R, S) => B.mixed(S.fq8.palancas, R));
def("fq8.maquinas", (R, S, H) => {
  const T = S.fq8.MQ, k = R.int(0, 5);
  if (k === 0) {   // el balancín: P1·b1 = P2·b2
    const P1 = R.pick([250, 300, 350, 400]), P2 = R.pick([500, 600, 700, 750, 800, 900]), b1 = R.pick([1.5, 2, 2.4, 2.5, 3]), b2 = rd(P1 * b1 / P2);
    return num(T.bal_q(P1, H.dec(b1), P2), b2, T.bal_s(P1, H.dec(b1), P2, H.dec(rd(P1 * b1)), H.dec(b2), exact(P1 * b1 / P2, sale(b2))), 0.011);
  }
  if (k === 1) {   // la carretilla (segundo género)
    const Rr = R.pick([300, 450, 600, 750, 900, 1200]), bR = R.pick([0.3, 0.4, 0.5, 0.6]), bP = R.pick([1, 1.2, 1.5]), P = rd(Rr * bR / bP, 1);
    return num(T.carr_q(Rr, H.dec(bR), H.dec(bP)), P, T.carr_s(Rr, H.dec(bR), H.dec(bP), H.dec(rd(Rr * bR, 2)), H.dec(P), exact(Rr * bR / bP, sale(P))));
  }
  if (k === 2) {   // barra de primer género: el brazo de la potencia es el resto de la barra
    const L = R.pick([1.5, 2, 2.5, 3]), d = R.pick([0.2, 0.25, 0.3, 0.5]), Rr = R.pick([600, 800, 900, 1200, 1500]), bP = rd(L - d, 2), P = rd(Rr * d / bP, 1);
    return num(T.barra_q(H.dec(L), Rr, H.dec(d)), P, T.barra_s(H.dec(L), H.dec(d), H.dec(bP), Rr, H.dec(P), H.dec(rd(Rr * d, 2)), exact(Rr * d / bP, sale(P))));
  }
  if (k === 3) {   // poleas
    const Rr = R.pick([200, 300, 400, 500, 600, 800]), movil = R.r() < 0.6;
    if (R.r() < 0.65) return num(T.polea_q(Rr, movil), movil ? Rr / 2 : Rr, T.polea_s(Rr, movil));
    const h = R.int(2, 10); return num(T.cuerda_q(Rr, movil, h), movil ? 2 * h : h, T.cuerda_s(movil, h));
  }
  if (k === 4) {   // plano inclinado: F = R·h/L
    let Rr = R.pick([400, 600, 800, 900, 1200]), h = R.pick([0.5, 0.8, 1, 1.2, 1.5]), L = R.pick([3, 4, 5, 6, 8]), F = rd(Rr * h / L, 1);
    if (R.r() < 0.7) return num(T.plano_q(R.pick(T.cargas), Rr, H.dec(h), L), F, T.plano_s(Rr, H.dec(h), L, H.dec(F), exact(Rr * h / L, sale(F))));
    // para despejar L, la fuerza del enunciado debe ser exacta (si no, L no sale entero)
    for (let i = 0; i < 50 && !exact(Rr * h / L, F); i++) { Rr = R.pick([400, 600, 800, 900, 1200]); h = R.pick([0.5, 0.8, 1, 1.2, 1.5]); L = R.pick([3, 4, 5, 6, 8]); F = rd(Rr * h / L, 1); }
    if (!exact(Rr * h / L, F)) { Rr = 600; h = 1; L = 4; F = 150; }
    return num(T.rampa_q(Rr, H.dec(h), H.dec(F)), L, T.rampa_s(Rr, H.dec(h), H.dec(F), L, H.dec(rd(Rr * h, 2))));
  }
  const [q, opts, sol] = R.pick(T.conceptos), sh = R.shuffle(opts.map((o, i) => [o, i]));   // ideas clave
  return { q, kind: "choice", opts: sh.map(x => x[0]), correct: sh.findIndex(x => x[1] === 0), sol };
});
// ── fin: ── Las máquinas simples (generadores añadidos) ──
})();
