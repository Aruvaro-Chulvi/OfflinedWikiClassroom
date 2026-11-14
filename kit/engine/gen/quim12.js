/* WikiAula — Química, Grado 12 (2.º de Bachillerato): problemas y bancos.
   Textos y bancos en i18n/<lang>/quim12.js (S.quim12). */
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
const num = (q, ans, sol, tol) => ({ q, kind: "num", ans, tol: tol != null ? tol : Math.max(0.011, Math.abs(ans) * 0.01), sol });
const sci = (m, e) => `${String(m).replace(".", WA.H.ds)}${WA.H.sx()}10<sup>${e < 0 ? "−" + -e : e}</sup>`;
const log10 = Math.log10;
// k cifras significativas (para respuestas y pasos intermedios)
const cs = (x, k = 3) => { const r = +(+x).toPrecision(k); return apunta(x, r, x, k, true); };
// x en notación científica con k cifras: 2,06·10⁶
const sx = (x, k = 3) => { if (!x) return "0"; const e = Math.floor(log10(Math.abs(x))), m = cs(x / 10 ** e, k), mk = nearR(+(+x).toPrecision(k), x) ? String : marca; return mk(Math.abs(m) >= 10 ? sci(cs(m / 10, k), e + 1) : sci(m, e)); };   // mk: redondeado, «≈» (ver fin)
// signo menos tipográfico en números ya escritos con coma
const ms = s => String(s).replace(/-/g, "−");
// pH y pOH con dos decimales fijos (2,70, no 2,7), como en las lecciones
// números «normales» en decimal y los muy grandes o pequeños en notación científica
const nx = (H, x, k = 3) => (Math.abs(x) >= 0.01 && Math.abs(x) < 1e4) ? H.dec(cs(x, k)) : sx(x, k);
const f2 = x => (x < 0 ? "−" : "") + Math.abs(x).toFixed(2).replace(".", WA.H.ds);

def("quim12.bandas", (R, S) => B.mixed(S.quim12.bandas, R));
// 60 % qué fuerza tiene; 40 % cuál hierve antes (la pregunta de examen), con el paso que decide
def("quim12.fuerzas", (R, S) => {
  const T = S.quim12;
  if (R.r() < 0.6) return B.mixed(T.fuerzas, R);
  const [a, b, w, why] = R.pick(T.fu_par), o = R.r() < 0.5 ? [a, b] : [b, a], ok = w === 0 ? a : b;
  return { q: T.fu_q(o[0], o[1]), kind: "choice", opts: o.map(x => x.charAt(0).toUpperCase() + x.slice(1)), correct: o.indexOf(ok), shuffle: false, sol: T.fu_s(ok, why) };
});
def("quim12.chatelier", (R, S) => B.mixed(S.quim12.chatelier, R));
// 60 % isomería espacial; 40 % estructural (cadena, posición, función)
def("quim12.isomeria", (R, S) => B.mixed(R.r() < 0.6 ? S.quim12.isomeria : S.quim12.isomeria_est, R));
// 50 % clasificar una reacción escrita; 50 % completarla (el tipo de examen): producto mayoritario, con distractores del mismo tipo
def("quim12.reacorg", (R, S) => {
  const T = S.quim12;
  if (R.r() < 0.5) return B.mixed(T.reacorg, R);
  const [re, ok, d1, d2, why] = R.pick(T.re_pr);
  return { q: T.re_q(re), kind: "choice", opts: [ok, d1, d2], correct: 0, sol: T.re_s(re, ok, why) };
});
// dos preguntas separadas: cómo se forma (adición / condensación) y de dónde viene (natural / sintético)
// y, además, la pregunta inversa: ¿de qué monómero(s) procede este polímero?
def("quim12.polimero", (R, S) => {
  const T = S.quim12, u = R.r();
  if (u < 0.3) { const [pol, ok, d1, d2, why] = R.pick(T.po_mon);
    return { q: T.po_q(pol), kind: "choice", opts: [ok, d1, d2], correct: 0, sol: T.po_s(pol, ok, why) }; }
  return B.mixed(u < 0.8 ? T.polimero : T.polimero_origen, R);
});

/* ── U1 · Estructura ── */
def("quim12.bohr", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 2);
  if (k < 2) { const n1 = R.pick([1, 2, 2, 3]), n2 = n1 + R.int(1, 3), d = 1 / n1 ** 2 - 1 / n2 ** 2;
    if (k === 0) { const inv = 1.097e7 * d, lnm = 1e9 / inv, r = lnm >= 1000 ? rd(lnm, 0) : cs(lnm, 3);
      return num(T.bo_q[0](n2, n1), r, T.bo_s[0](n2, n1, sx(inv, 4), sx(1 / inv, 4), H.dec(r)), Math.max(1, r * 0.01)); }
    const r = cs(13.6 * d, 3); return num(T.bo_q[1](n2, n1), r, T.bo_s[1](n2, n1, H.dec(rd(d, 4)), H.dec(r)), 0.02); }
  const n = R.int(1, 4), r = cs(13.6 / n ** 2, 3); return num(T.bo_q[2](n), r, T.bo_s[2](n, H.dec(r)), 0.02);
});
def("quim12.cuanticos", (R, S) => {
  const T = S.quim12, k = R.int(0, 2);
  if (k === 0) { const [q, ok, why] = R.pick([["2, 1, −1, +½", true, "l < n y |m<sub>l</sub>| ≤ l."], ["3, 3, 0, +½", false, "l debe ser menor que n."], ["4, 2, −3, −½", false, "con l = 2, m<sub>l</sub> va de −2 a +2."],
      ["5, 0, 0, −½", true, "orbital 5s."], ["3, 2, 2, +½", true, "orbital 3d."], ["2, 0, 0, 1", false, "m<sub>s</sub> solo puede ser ±½."], ["4, 3, 3, −½", true, "orbital 4f."]]);
    return { q: T.cu_q[0](q), kind: "choice", opts: T.cu_o, correct: ok ? 0 : 1, shuffle: false, sol: T.cu_s[0](ok, why) }; }
  if (k === 1) { const n = R.int(1, 5); return { q: T.cu_q[1](n), kind: "int", ans: 2 * n * n, sol: T.cu_s[1](n, 2 * n * n) }; }
  // [ion, Z, átomo, configuración del átomo, electrones 4s del átomo, electrones 3d que pierde, configuración del ion, electrones d del ion, desapareados]
  const [ion, Z, at, ca, s4, lost, c, dk, r] = R.pick([["Fe³⁺", 26, "Fe", "[Ar] 3d⁶ 4s²", 2, 1, "[Ar] 3d⁵", 5, 5], ["Fe²⁺", 26, "Fe", "[Ar] 3d⁶ 4s²", 2, 0, "[Ar] 3d⁶", 6, 4], ["Mn²⁺", 25, "Mn", "[Ar] 3d⁵ 4s²", 2, 0, "[Ar] 3d⁵", 5, 5],
    ["Cu²⁺", 29, "Cu", "[Ar] 3d¹⁰ 4s¹", 1, 1, "[Ar] 3d⁹", 9, 1], ["Zn²⁺", 30, "Zn", "[Ar] 3d¹⁰ 4s²", 2, 0, "[Ar] 3d¹⁰", 10, 0], ["Cr³⁺", 24, "Cr", "[Ar] 3d⁵ 4s¹", 1, 2, "[Ar] 3d³", 3, 3],
    ["Co²⁺", 27, "Co", "[Ar] 3d⁷ 4s²", 2, 0, "[Ar] 3d⁷", 7, 3], ["Ni²⁺", 28, "Ni", "[Ar] 3d⁸ 4s²", 2, 0, "[Ar] 3d⁸", 8, 2]]);
  return { q: T.cu_q[2](ion, Z), kind: "int", ans: r, sol: T.cu_s[2](at, Z, ca, ion, s4, lost, c, dk, r) };
});
def("quim12.periodica", (R, S, H) => {
  const T = S.quim12, u = R.r();
  // radios de especies isoelectrónicas (la lista del enunciado, barajada: la respuesta no está siempre en un extremo)
  if (u < 0.35) { const sets = [[["O²⁻", 8], ["F⁻", 9], ["Na⁺", 11], ["Mg²⁺", 12]], [["S²⁻", 16], ["Cl⁻", 17], ["K⁺", 19], ["Ca²⁺", 20]], [["N³⁻", 7], ["O²⁻", 8], ["F⁻", 9], ["Na⁺", 11]], [["P³⁻", 15], ["Cl⁻", 17], ["K⁺", 19], ["Ca²⁺", 20]]];
    const s = R.pick(sets), big = R.r() < 0.5, ok = big ? s[0][0] : s[3][0], opts = R.shuffle(s.map(x => x[0]));
    return { q: T.pe_q(R.shuffle(s.map(x => x[0])).join(", "), big ? "mayor" : "menor"), kind: "choice", opts, correct: opts.indexOf(ok), sol: T.pe_s(s, ok, big) }; }
  // primera energía de ionización de dos elementos, con las anomalías de la lección
  if (u < 0.6) { const [a, b, w, why] = R.pick(T.pe_ei), o = R.r() < 0.5 ? [a, b] : [b, a], ok = w === 0 ? a : b;
    return { q: T.pe_q2(o[0], o[1]), kind: "choice", opts: o, correct: o.indexOf(ok), shuffle: false, sol: T.pe_s2(ok, why) }; }
  // energías de ionización sucesivas (kJ/mol, datos reales): [elemento, lista, electrones de valencia, grupo]
  if (u < 0.82) { const [el, ei, v, g] = R.pick([["Li", [520, 7298, 11815], 1, 1], ["Be", [900, 1757, 14849], 2, 2], ["B", [801, 2427, 3660, 25026], 3, 13], ["C", [1086, 2353, 4621, 6223, 37831], 4, 14],
      ["Mg", [738, 1451, 7733, 10543], 2, 2], ["Al", [578, 1817, 2745, 11577], 3, 13], ["Si", [786, 1577, 3232, 4356, 16091], 4, 14], ["P", [1012, 1907, 2914, 4964, 6274, 21267], 5, 15],
      ["K", [419, 3052, 4420], 1, 1], ["Ca", [590, 1145, 4912], 2, 2]]);
    return { q: T.pe_q3(ei.map(x => H.n(x)).join("; ")), kind: "int", ans: v,
      sol: T.pe_s3(v, H.n(ei[v - 1]), H.n(ei[v]), cs(ei[v] / ei[v - 1], 2), g, el) }; }
  // grupo a partir de la configuración: [configuración, periodo, bloque, electrones de valencia (texto), grupo]
  const [c, p, bl, val, g] = R.pick([["[Ne] 3s² 3p³", 3, "p", "3s² 3p³", 15], ["[Ar] 4s² 3d⁵", 4, "d", "4s² 3d⁵", 7], ["[Kr] 5s¹", 5, "s", "5s¹", 1], ["[Ar] 3d¹⁰ 4s² 4p²", 4, "p", "4s² 4p²", 14],
    ["[Ne] 3s²", 3, "s", "3s²", 2], ["[Ar] 4s² 3d⁸", 4, "d", "4s² 3d⁸", 10], ["[He] 2s² 2p⁴", 2, "p", "2s² 2p⁴", 16], ["[Ar] 3d¹⁰ 4s² 4p⁵", 4, "p", "4s² 4p⁵", 17],
    ["[Kr] 4d¹⁰ 5s²", 5, "d", "5s² 4d¹⁰", 12], ["[Ar] 4s² 3d¹", 4, "d", "4s² 3d¹", 3], ["[Ne] 3s² 3p¹", 3, "p", "3s² 3p¹", 13], ["[Xe] 6s²", 6, "s", "6s²", 2], ["[Ar] 4s² 3d⁶", 4, "d", "4s² 3d⁶", 8]]);
  return { q: T.pe_q4(c), kind: "int", ans: g, sol: T.pe_s4(p, bl, val, g) };
});

/* ── U2 · Enlace ── */
def("quim12.bornhaber", (R, S, H) => {
  // sales con iones de carga 2 (dos ionizaciones; dos aniones o la segunda afinidad del O): datos y rótulos en el i18n
  if (R.r() < 0.35) { const T = S.quim12, [s, met, hf, sub_, dl, dis, e1, e2, al, ae, aes] = R.pick(T.bh_x), sum = sub_ + dis + e1 + e2 + ae, U = hf - sum;
    return num(T.bh_q(s, T.bh_d2(H.dec(hf), met, sub_, dl, dis, H.n(e1), H.n(e2), al)), U, T.bh_s2(sub_, dis, H.n(e1), H.n(e2), aes, H.dec(hf), H.n(sum), H.dec(U)), 1); }
  // [sal, ΔHf, sublimación, ½ disociación (Br₂: ½ vaporización + ½ disociación), Ei, AE, ¿halógeno líquido?] — datos de la lección (Na 107)
  const T = S.quim12, [s, hf, sub_, dis, ei, ae, liq] = R.pick([["NaCl", -411, 107, 122, 496, -349, 0], ["KBr", -394, 89, 112, 419, -325, 1], ["LiF", -617, 161, 79, 520, -328, 0], ["KCl", -437, 89, 122, 419, -349, 0], ["NaF", -574, 107, 79, 496, -328, 0]]);
  const sum = sub_ + dis + ei + ae, U = hf - sum, d = T.bh_d(H.dec(hf), sub_, dis, ei, H.dec(ae), liq);
  return num(T.bh_q(s, d), U, T.bh_s(sub_, dis, ei, H.dec(ae), H.dec(hf), sum, H.dec(U)), 1);
});
// [molécula, σ, π, desglose]
const SP = [["CH₄", 4, 0, 0], ["C₂H₄ (eteno)", 5, 1, 1], ["C₂H₂ (etino)", 3, 2, 2], ["CO₂", 2, 2, 3], ["N₂", 1, 2, 4], ["HCN", 2, 2, 5], ["H₂O", 2, 0, 6], ["CH₂O (metanal)", 3, 1, 7], ["C₃H₆ (propeno)", 8, 1, 8], ["O₂", 1, 1, 9]];
def("quim12.hibrido", (R, S) => {
  const T = S.quim12;
  const u = R.r();
  if (u < 0.3) return B.mixed(T.hibrido, R);
  // la pregunta PAU encadenada: geometría molecular (RPECV) y polaridad
  if (u < 0.55) return B.mixed(T.geometria, R);
  if (u < 0.75) return B.mixed(T.polaridad, R);
  const [m, a, b, w] = R.pick(SP); return { q: T.hi_q(m), kind: "fields", fields: [{ label: T.hi_f[0], ans: a }, { label: T.hi_f[1], ans: b }], sol: T.hi_s(T.hi_w[w], a, b) };
});

/* ── U3 · Termoquímica ── */
def("quim12.entalpia", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 2);
  if (k === 0) { const [f, M, dh] = R.pick([["metano", 16, -890], ["propano", 44, -2220], ["etanol", 46, -1367], ["butano", 58, -2878], ["glucosa", 180, -2803]]), m = M * R.pick([0.5, 1, 2, 5]), n = m / M, r = rd(-n * dh, 1);
    return num(T.en_q[0](H.dec(m), f, M, H.dec(dh)), r, T.en_s[0](H.dec(m), M, H.dec(n), H.dec(-dh), H.dec(r))); }
  if (k === 1) { const dh = R.pick([-890, -566, -92, 178]), dn = R.pick([-2, -1, 1, 2]), Tk = 298, x = rd(dn * 8.314e-3 * Tk, 2), r = rd(dh - x, 1);
    return num(T.en_q[1](H.dec(dh), H.dec(dn), Tk), r, T.en_s[1](H.dec(dn), Tk, H.dec(x), H.dec(dh), H.dec(r)), 0.1); }
  const n = R.pick([0.05, 0.1, 0.2]), m = R.pick([100, 150, 200]), dT = R.pick([2.5, 4, 6, 10.6]), q = rd(m * 4.18 * dT, 1), r = cs(-q / 1000 / n, 3);
  return num(T.en_q[2](m, H.dec(dT), H.dec(n)), r, T.en_s[2](m, H.dec(dT), H.dec(q), H.dec(q / 1000), H.dec(n), H.dec(r)), Math.max(0.1, Math.abs(r) * 0.01));
});
// entalpías de combustión (kJ/mol), coherentes con la tabla de formación de la lección
const HC = { "C(grafito)": -393.5, "H₂": -285.8, "CO": -283.0, "CH₄": -890.3, "C₂H₂": -1299.6, "C₂H₄": -1410.9, "C₂H₆": -1560.0, "C₃H₈": -2219.9, "C₂H₅OH(l)": -1366.7, "C₆H₆(l)": -3267.4, "C₆H₁₂O₆(s)": -2803.0 };
def("quim12.hess", (R, S, H) => {
  const T = S.quim12;
  // combinar ecuaciones (el tipo de la lección): reacción buscada a partir de entalpías de combustión.
  // [reacción, reactivos que arden [coef, especie], productos [coef, especie], ¿es una formación?]
  if (R.r() < 0.45) { const [eq, re, pr, form] = R.pick([["C(grafito) + 2 H₂ → CH₄", [[1, "C(grafito)"], [2, "H₂"]], [[1, "CH₄"]], 1],
      ["2 C(grafito) + 3 H₂ + ½ O₂ → C₂H₅OH(l)", [[2, "C(grafito)"], [3, "H₂"]], [[1, "C₂H₅OH(l)"]], 1], ["2 C(grafito) + H₂ → C₂H₂", [[2, "C(grafito)"], [1, "H₂"]], [[1, "C₂H₂"]], 1],
      ["6 C(grafito) + 3 H₂ → C₆H₆(l)", [[6, "C(grafito)"], [3, "H₂"]], [[1, "C₆H₆(l)"]], 1], ["2 C(grafito) + 2 H₂ → C₂H₄", [[2, "C(grafito)"], [2, "H₂"]], [[1, "C₂H₄"]], 1],
      ["2 C(grafito) + 3 H₂ → C₂H₆", [[2, "C(grafito)"], [3, "H₂"]], [[1, "C₂H₆"]], 1], ["3 C(grafito) + 4 H₂ → C₃H₈", [[3, "C(grafito)"], [4, "H₂"]], [[1, "C₃H₈"]], 1],
      ["6 C(grafito) + 6 H₂ + 3 O₂ → C₆H₁₂O₆(s)", [[6, "C(grafito)"], [6, "H₂"]], [[1, "C₆H₁₂O₆(s)"]], 1], ["C(grafito) + ½ O₂ → CO", [[1, "C(grafito)"]], [[1, "CO"]], 1],
      ["C₂H₂ + 2 H₂ → C₂H₆", [[1, "C₂H₂"], [2, "H₂"]], [[1, "C₂H₆"]], 0], ["C₂H₂ + H₂ → C₂H₄", [[1, "C₂H₂"], [1, "H₂"]], [[1, "C₂H₄"]], 0],
      ["3 C₂H₂ → C₆H₆(l)", [[3, "C₂H₂"]], [[1, "C₆H₆(l)"]], 0]]);
    const sp = [...re, ...pr].map(x => x[1]), num_ = (n, x) => n === 1 ? `(${H.dec(HC[x])})` : `${n}·(${H.dec(HC[x])})`, lab = x => `(${sp.indexOf(x) + 1})`;
    const r = rd(re.reduce((a, [n, x]) => a + n * HC[x], 0) - pr.reduce((a, [n, x]) => a + n * HC[x], 0), 1);
    const comb = re.map(([n, x]) => (n === 1 ? "" : n + "·") + lab(x)).join(" + ") + " − " + pr.map(([n, x]) => (n === 1 ? "" : n + "·") + lab(x)).join(" − ");
    const subs = re.map(([n, x]) => num_(n, x)).join(" + ") + " − " + pr.map(([n, x]) => num_(n, x)).join(" − ");
    return num(T.he_q[2](eq, sp.map((x, i) => `(${i + 1}) ${x} ${H.dec(HC[x])}`).join("; "), form), r, T.he_s[2](re.map(([n, x]) => (n === 1 ? "" : n + " ") + x).join(" y "), pr.map(x => x[1]).join(", "), comb, subs, H.dec(r)), 1); }
  // datos de las tablas de la lección; [ecuación, datos, Σ productos (texto), Σ productos, Σ reactivos (texto), Σ reactivos, ΔH]
  if (R.r() < 0.55) { const [eq, d, sp, P, sr, Rr, r] = R.pick([["CH₄ + 2 O₂ → CO₂ + 2 H₂O(l)", "CH₄ −74,8; CO₂ −393,5; H₂O(l) −285,8", "(−393,5) + 2·(−285,8)", -965.1, "(−74,8) + 2·0", -74.8, -890.3],
      ["C₂H₅OH(l) + 3 O₂ → 2 CO₂ + 3 H₂O(l)", "etanol −277,7; CO₂ −393,5; H₂O(l) −285,8", "2·(−393,5) + 3·(−285,8)", -1644.4, "(−277,7) + 3·0", -277.7, -1366.7],
      ["CaCO₃ → CaO + CO₂", "CaCO₃ −1206,9; CaO −635,1; CO₂ −393,5", "(−635,1) + (−393,5)", -1028.6, "(−1206,9)", -1206.9, 178.3],
      ["C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O(l)", "C₃H₈ −103,8; CO₂ −393,5; H₂O(l) −285,8", "3·(−393,5) + 4·(−285,8)", -2323.7, "(−103,8) + 5·0", -103.8, -2219.9],
      ["2 CO + O₂ → 2 CO₂", "CO −110,5; CO₂ −393,5", "2·(−393,5)", -787, "2·(−110,5) + 0", -221, -566]]);
    return num(T.he_q[0](eq, H.esn(d)), r, T.he_s[0](H.esn(sp), H.dec(P), H.esn(sr), H.dec(Rr), H.dec(r)), 1); }
  // entalpías de enlace de la tabla de la lección (C=C 614, C–C 347); [ecuación, datos, rotos (texto), rotos, formados (texto), formados, ΔH]
  const [eq, d, ro, Ro, fo, Fo, r] = R.pick([["H₂ + Cl₂ → 2 HCl", "H–H 436; Cl–Cl 243; H–Cl 432", "H–H + Cl–Cl = 436 + 243", 679, "2 H–Cl = 2·432", 864, -185],
    ["CH₂=CH₂ + H₂ → CH₃–CH₃", "C=C 614; H–H 436; C–C 347; C–H 413", "C=C + H–H = 614 + 436", 1050, "C–C + 2 C–H = 347 + 2·413", 1173, -123],
    ["N₂ + 3 H₂ → 2 NH₃", "N≡N 945; H–H 436; N–H 391", "N≡N + 3 H–H = 945 + 3·436", 2253, "6 N–H = 6·391", 2346, -93],
    ["CH₄ + Cl₂ → CH₃Cl + HCl", "C–H 413; Cl–Cl 243; C–Cl 328; H–Cl 432", "C–H + Cl–Cl = 413 + 243", 656, "C–Cl + H–Cl = 328 + 432", 760, -104]]);
  return num(T.he_q[1](eq, d), r, T.he_s[1](ro, Ro, fo, Fo, H.dec(r)), 1);
});
def("quim12.gibbs", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 2);
  if (k === 0) { const dh = R.pick([-92, -200, 178, 50]), ds = R.pick([-199, -100, 161, 120]), Tk = R.pick([298, 500, 1000]), tds = rd(Tk * ds / 1000, 2), r = rd(dh - tds, 1);
    return num(T.gi_q[0](H.dec(dh), H.dec(ds), Tk), r, T.gi_s[0](H.dec(ds), H.dec(ds / 1000), H.dec(dh), Tk, H.dec(tds), r, H.dec(r)), 0.1); }
  if (k === 1) { const [dh, ds] = R.pick([[178, 161], [-92, -199], [44, 118], [131, 134], [-176, -284]]), r = rd(dh * 1000 / ds, 0); return num(T.gi_q[1](H.dec(dh), H.dec(ds)), r, T.gi_s[1](H.n(dh * 1000), H.dec(ds), H.n(r), dh < 0), Math.max(2, r * 0.01)); }
  const c = R.int(0, 3), [hs, ss] = [["<", ">"], [">", "<"], ["<", "<"], [">", ">"]][c]; return { q: T.gi_q[2](hs, ss), kind: "choice", opts: T.gi_o, correct: c, shuffle: false, sol: T.gi_s[2](c, T.gi_o) };
});

/* ── U4 · Cinética ── */
def("quim12.orden", (R, S, H) => {
  const T = S.quim12, u = R.r();
  if (u < 0.75) { const m = R.int(0, 2), n = R.int(0, 2), k = R.pick([0.5, 1, 2, 4]), fa = R.pick([2, 2, 3]), v = (a, b) => k * a ** m * b ** n;
    // la concentración se duplica o se triplica (en general, factorᵐ = factor de la velocidad)
    const rows = [[0.1, 0.1], [rd(0.1 * fa, 1), 0.1], [0.1, rd(0.1 * fa, 1)]], small = Math.min(...rows.map(([a, b]) => v(a, b))) < 0.01;
    const fm = x => small ? sx(x, 2) : H.dec(cs(x, 2));   // toda la columna igual; sin «1·10⁰»: notación científica solo si hay números pequeños
    const c = 'style="padding:2px 10px;border:1px solid #c8ccd1"';
    const tab = `<table style="border-collapse:collapse;margin:6px 0"><tr><th ${c}>${T.or_h[0]}</th><th ${c}>[A] (mol/L)</th><th ${c}>[B] (mol/L)</th><th ${c}>v₀ (mol·L⁻¹·s⁻¹)</th></tr>` +
      rows.map(([a, b], i) => `<tr><td ${c}>${i + 1}</td><td ${c}>${H.dec(a)}</td><td ${c}>${H.dec(b)}</td><td ${c}>${fm(v(a, b))}</td></tr>`).join("") + "</table>";
    const v1 = fm(v(0.1, 0.1)), v2 = fm(v(rows[1][0], 0.1)), v3 = fm(v(0.1, rows[2][1]));
    // 25 %: el problema completo de examen, con órdenes, k y sus unidades (k con el experimento 1)
    if (u < 0.25) { const g = m + n, un = T.or_u[g];
      return { q: T.or_q3(tab), kind: "fields", fields: [{ label: T.or_f[0], ans: m }, { label: T.or_f[1], ans: n }, { label: T.or_f[2], kind: "num", ans: k, tol: k * 0.02 }],
        sol: T.or_s(T.or_x[fa], "A", 2, v1, v2, fa ** m, m, "m") + ". " + T.or_s(T.or_x[fa], "B", 3, v1, v3, fa ** n, n, "n") + ". " + T.or_s3(m, n, g, v1, H.dec(k), un) }; }
    const which = R.r() < 0.5 ? "A" : "B", r = which === "A" ? m : n, e2 = which === "A" ? 2 : 3, f = fa ** r;
    return { q: T.or_q(tab, which), kind: "int", ans: r, sol: T.or_s(T.or_x[fa], which, e2, v1, which === "A" ? v2 : v3, f, r, which === "A" ? "m" : "n", fa) }; }
  const k = R.pick([0.5, 2, 5]), m = R.int(1, 2), n = R.int(0, 1), A = R.pick([0.1, 0.2, 0.3]), Bc = R.pick([0.1, 0.5]), r = rd(k * A ** m * Bc ** n, 5);
  return num(T.or_q2(H.dec(k), H.dec(A), m, H.dec(Bc), n, H.dec(A), H.dec(Bc)), r, T.or_s2(H.dec(k), H.dec(A), m, H.dec(Bc), n, H.dec(r)), Math.max(1e-5, r * 0.01));
});
def("quim12.arrhenius", (R, S, H) => {
  const T = S.quim12, ea = R.pick([30, 50, 75, 100]), t1 = R.pick([298, 300, 310]), t2 = t1 + R.pick([10, 20, 30]), dT = 1 / t1 - 1 / t2, l = ea * 1000 / 8.314 * dT, r = cs(Math.exp(rd(l, 3)), 3);
  return num(T.ar_q(ea, t1, t2), r, T.ar_s(t1, t2, sx(dT, 4), H.n(ea * 1000), H.dec(rd(l, 3)), H.dec(r)), Math.max(0.03, r * 0.02));
});

/* ── U5 · Equilibrio ── */
def("quim12.kc", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 4);
  // PCl₅ con volumen distinto de 1 L: grado de disociación con la ecuación de segundo grado (Ejemplo 4)
  if (k === 3) { const n0 = R.pick([0.1, 0.2, 0.4, 0.5, 1]), V = R.pick([0.5, 2, 4, 5]), K = R.pick([0.042, 0.1, 0.5]), c0 = n0 / V, disc = K * K + 4 * c0 * K, al = (-K + Math.sqrt(disc)) / (2 * c0), r = cs(al * 100, 3);
    return num(T.kc_q[3](H.dec(n0), H.dec(V), H.dec(K)), r, T.kc_s[3](H.dec(n0), H.dec(V), H.dec(cs(c0, 3)), H.dec(K), H.dec(cs(disc, 4)), H.dec(cs(Math.sqrt(disc), 4)), H.dec(cs(2 * c0, 3)), H.dec(cs(al, 3)), H.dec(r)), Math.max(0.3, r * 0.01)); }
  // Kp a partir del grado de disociación y la presión total (fracciones molares y presiones parciales, Ejemplo 5)
  if (k === 4) { const two = R.r() < 0.6, a = R.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]), P = R.pick([0.5, 1, 2, 5]), tot = 1 + a;
    const xr = (1 - a) / tot, xp = (two ? 2 * a : a) / tot, pr = xr * P, pp = xp * P, kp = two ? pp * pp / pr : pp * pp / pr, r = cs(kp, 3);
    return num(T.kc_q[4](two, H.dec(P), H.n(Math.round(a * 100))), r, T.kc_s[4](two, H.dec(a), H.dec(1 - a), H.dec(two ? 2 * a : a), H.dec(tot), H.dec(cs(xr, 3)), H.dec(cs(xp, 3)), H.dec(P), H.dec(cs(pr, 3)), H.dec(cs(pp, 3)), H.dec(r)), Math.max(1e-4, r * 0.02)); }
  // [ecuación, concentraciones, Kc sustituida, Kc]
  if (k === 0) { const [eq, conc, sub, val] = R.pick([["N₂O₄ ⇌ 2 NO₂", "[N₂O₄] = 0,08 M y [NO₂] = 0,04 M", "[NO₂]²/[N₂O₄] = 0,04²/0,08", 0.02], ["H₂ + I₂ ⇌ 2 HI", "[H₂] = [I₂] = 0,2 M y [HI] = 1,4 M", "[HI]²/([H₂]·[I₂]) = 1,4²/(0,2·0,2)", 49],
      ["PCl₅ ⇌ PCl₃ + Cl₂", "[PCl₅] = 0,5 M, [PCl₃] = [Cl₂] = 0,1 M", "[PCl₃]·[Cl₂]/[PCl₅] = 0,1·0,1/0,5", 0.02],
      ["2 SO₂ + O₂ ⇌ 2 SO₃", "[SO₂] = 0,2 M, [O₂] = 0,1 M y [SO₃] = 0,4 M", "[SO₃]²/([SO₂]²·[O₂]) = 0,4²/(0,2²·0,1)", 40], ["CaCO₃(s) ⇌ CaO(s) + CO₂(g)", "[CO₂] = 0,01 M", "[CO₂] (los sólidos no aparecen)", 0.01]]);
    return num(T.kc_q[0](eq, H.esn(conc)), val, T.kc_s[0](H.esn(sub), H.dec(val)), Math.max(0.0011, val * 0.01)); }
  if (k === 1) { const [eq, dn] = R.pick([["N₂ + 3 H₂ ⇌ 2 NH₃", -2], ["N₂O₄ ⇌ 2 NO₂", 1], ["PCl₅ ⇌ PCl₃ + Cl₂", 1], ["2 SO₂ + O₂ ⇌ 2 SO₃", -1]]), kc = R.pick([0.5, 2, 10]), Tk = R.pick([400, 500, 600]), kp = kc * (0.082 * Tk) ** dn;
    // los Kp pequeños se piden «en unidades de 10⁻ᵗ», como en quim12.ks
    const t = kp < 0.01 ? -Math.floor(log10(kp)) : 0, r = cs(kp * 10 ** t, 3), rt = H.dec(cs(0.082 * Tk, 4));
    return Object.assign(num(T.kc_q[1](eq, H.dec(kc), Tk, H.dec(dn)) + (t ? T.kc_u(t) : ""), r, T.kc_s[1](H.dec(kc), Tk, rt, H.dec(dn), t ? sx(kp, 3) : H.dec(r), t ? H.dec(r) : ""), Math.max(Math.abs(r) * 0.02, 1e-9)), t ? { hint: T.kc_h(t) } : {}); }
  const kk = R.pick([4, 9, 16, 25, 36, 49, 64]), n0 = R.pick([0.5, 1, 2]), sq = Math.sqrt(kk), x = sq * n0 / (2 + sq), r = rd(2 * x, 3);
  return num(T.kc_q[2](kk, H.dec(n0)), r, T.kc_s[2](H.dec(n0), sq, H.dec(rd(x, 3)), H.dec(r)), Math.max(0.005, r * 0.01));
});
def("quim12.ks", (R, S, H) => {
  const T = S.quim12;
  // Ks de la tabla de la lección (AgBr, que no está en la tabla, va en el enunciado)
  if (R.r() < 0.6) { const [f, m, e, kind] = R.pick([["AgCl", 1.8, -10, 2], ["BaSO₄", 1.1, -10, 2], ["CaF₂", 3.5, -11, 3], ["Mg(OH)₂", 5.6, -12, 3], ["AgBr", 5, -13, 2], ["PbI₂", 9.8, -9, 3]]);
    const ks = m * 10 ** e, s = kind === 2 ? Math.sqrt(ks) : Math.cbrt(ks / 4), t = -Math.floor(log10(s)), r = rd(s * 10 ** t, 2);
    return Object.assign(num(T.ks_q[0](f, sci(m, e), t), r, T.ks_s[0](kind, sci(m, e), kind === 2 ? "" : sx(ks / 4, 3), H.dec(r), t), 0.03), { hint: T.kc_h(t) }); }
  // ¿precipita al mezclar? Con la dilución, como en el Ejemplo 3: [sal, Ks, exponente del anión, reactivo del catión, catión, reactivo del anión, anión, concentraciones posibles]
  const [f, km, ke, n, r1, i1, r2, i2, cl] = R.pick([["AgCl", 1.8, -10, 1, "AgNO₃", "Ag⁺", "NaCl", "Cl⁻", [1e-3, 5e-4, 2e-4, 1e-4, 5e-5, 2e-5, 1e-5]],
    ["BaSO₄", 1.1, -10, 1, "BaCl₂", "Ba²⁺", "Na₂SO₄", "SO₄²⁻", [1e-3, 5e-4, 2e-4, 1e-4, 5e-5, 2e-5, 1e-5]],
    ["PbI₂", 9.8, -9, 2, "Pb(NO₃)₂", "Pb²⁺", "KI", "I⁻", [1e-2, 5e-3, 2e-3, 1e-3, 5e-4]], ["CaF₂", 3.5, -11, 2, "Ca(NO₃)₂", "Ca²⁺", "NaF", "F⁻", [1e-3, 5e-4, 2e-4, 1e-4]]]);
  const ks = km * 10 ** ke, fc = x => x >= 0.001 ? H.dec(x) : sx(x, 2);
  let V1, V2, c1, c2, a, b, q;
  do { V1 = R.pick([10, 20, 25, 50, 100]); V2 = R.pick([10, 20, 25, 50, 100]); c1 = R.pick(cl); c2 = R.pick(cl);
    a = cs(c1 * V1 / (V1 + V2), 3); b = cs(c2 * V2 / (V1 + V2), 3); q = a * b ** n; } while (Math.abs(log10(q / ks)) < 0.3);
  const ok = q > ks;
  return { q: T.ks_q[1](f, sci(km, ke), V1, r1, fc(c1), V2, r2, fc(c2)), kind: "choice", opts: T.ks_o, correct: ok ? 0 : 1, shuffle: false,
    sol: T.ks_s[1](V1, V2, V1 + V2, i1, fc(c1), fc(a), i2, fc(c2), fc(b), n, sx(q, 2), sci(km, ke), ok) };
});

/* ── U6 · Ácido-base ── */
def("quim12.ph", (R, S, H) => {
  const T = S.quim12;
  if (R.r() < 0.6) { const [f, kind, z] = R.pick([["HCl", "a", 1], ["HNO₃", "a", 1], ["NaOH", "b", 1], ["KOH", "b", 1], ["Ca(OH)₂", "b", 2], ["Ba(OH)₂", "b", 2]]);
    // el Ca(OH)₂ es poco soluble (saturado ≈ 0,02 M): nunca 0,1 M
    const c = f.startsWith("Ca") ? R.pick([0.01, 0.005, 0.002, 0.001]) : R.pick([0.1, 0.01, 0.005, 0.002, 0.001]), x = c * z, p = rd(-log10(x), 2);
    const r = kind === "a" ? p : rd(14 - p, 2);
    return num(T.ph_q[0](f, H.dec(c)), r, T.ph_s[0](kind, f, z, H.dec(c), H.dec(x), f2(p), f2(r)), 0.02); }
  // en milimoles, como la lección: mL · mol/L = mmol
  const va = R.pick([50, 100]), ca = R.pick([0.1, 0.2]), vb = R.pick([50, 100]), cb = R.pick([0.05, 0.1, 0.3]), na = rd(va * ca, 2), nb = rd(vb * cb, 2), V = va + vb;
  const q = T.ph_q[1](va, H.dec(ca), vb, H.dec(cb)), base = [va, H.dec(ca), H.dec(na), vb, H.dec(cb), H.dec(nb)];
  if (Math.abs(na - nb) < 1e-9) return num(q, 7, T.ph_s[1](...base, 0, "", V, "", "", f2(7)), 0.02);
  const d = rd(Math.abs(na - nb), 2), conc = d / V, p = rd(-log10(conc), 2), r = na > nb ? p : rd(14 - p, 2);
  return num(q, r, T.ph_s[1](...base, H.dec(d), na > nb ? "H₃O⁺" : "OH⁻", V, conc >= 0.01 ? H.dec(cs(conc, 3)) : sx(conc, 3), f2(p), f2(r)), 0.02);
});
def("quim12.debil", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 3);
  // Ka a partir del pH medido (el problema al revés, Ejemplo 2); sin repetir la pregunta fija (0,050 M y pH 3,00)
  if (k === 3) { let c, ph, x, ka;
    do { c = R.pick([0.01, 0.05, 0.1, 0.2]); ph = R.pick([2.5, 2.8, 3, 3.2, 3.5, 4]); x = 10 ** -ph; ka = x * x / (c - x); } while (x / c > 0.2 || ka < 1e-8 || (c === 0.05 && ph === 3));
    const t = -Math.floor(log10(ka)), r = rd(ka * 10 ** t, 2);
    return Object.assign(num(T.db_q[3](H.raw.dec(c), f2(ph), t), r, T.db_s[3](f2(ph), sx(x, 3), H.raw.dec(c), H.dec(cs(c - x, 3)), sx(ka, 3), H.dec(r), t, H.dec(cs(x / c * 100, 2))), Math.max(0.02, r * 0.02)), { hint: T.kc_h(t) }); }
  // Ka de la tabla de la lección; la solución sigue el método de la lección: aproximación y comprobación del 5 %
  if (k === 0) { const [f, m, e] = R.pick([["ácido acético", 1.8, -5], ["ácido fluorhídrico", 6.8, -4], ["ácido hipocloroso", 3, -8], ["ácido benzoico", 6.3, -5]]), ka = m * 10 ** e, c = R.pick([0.1, 0.05, 0.2]);
    const xa = Math.sqrt(ka * c), pc = xa / c * 100, ok = pc < 5, x = ok ? xa : (-ka + Math.sqrt(ka * ka + 4 * ka * c)) / 2, r = rd(-log10(x), 2);
    return num(T.db_q[0](f, sci(m, e), H.raw.dec(c)), r, T.db_s[0](sci(m, e), H.raw.dec(c), sx(xa, 2), H.dec(cs(pc, 2)), ok, sx(x, 2), f2(r)), 0.03); }
  if (k === 1) { const c = R.pick([0.1, 0.2, 0.05]), ph = R.pick([2.5, 3, 3.5, 4]), x = 10 ** -ph, r = cs(x / c * 100, 3); return num(T.db_q[1](H.raw.dec(c), H.dec(ph)), r, T.db_s[1](H.dec(ph), sx(x, 3), H.raw.dec(c), H.dec(r)), Math.max(0.005, r * 0.02)); }
  const c = R.pick([0.1, 0.05, 0.2]), kb = 1.8e-5, x = Math.sqrt(kb * c), p = rd(-log10(x), 2), r = rd(14 - p, 2);
  return num(T.db_q[2](H.raw.dec(c), sci(1.8, -5)), r, T.db_s[2](H.raw.dec(c), sx(x, 3), f2(p), f2(r)), 0.03);
});
// Hidrólisis y tampones (lección hidrolisis-reguladoras): carácter de la sal, pH de la sal y pH del tampón
def("quim12.hidrolisis", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 2);
  if (k === 0) { const [s, c, why] = R.pick(T.hi_sal);
    return { q: T.va_q[1](s), kind: "choice", opts: T.va_o, correct: c, shuffle: false, sol: T.va_s[1](c, why) }; }
  // pH de una sal: [sal, ion que se hidroliza, ion espectador, ¿anión básico?, K de la pareja (mantisa, exponente), nombre de la pareja]
  if (k === 1) { const [s, ion, esp, bas, m, e, par_] = R.pick([["CH₃COONa", "CH₃COO⁻", "Na⁺", 1, 1.8, -5, "CH₃COOH"], ["NaClO", "ClO⁻", "Na⁺", 1, 3.0, -8, "HClO"], ["NaF", "F⁻", "Na⁺", 1, 6.8, -4, "HF"],
      ["NaCN", "CN⁻", "Na⁺", 1, 6.2, -10, "HCN"], ["HCOONa", "HCOO⁻", "Na⁺", 1, 1.8, -4, "HCOOH"], ["NH₄Cl", "NH₄⁺", "Cl⁻", 0, 1.8, -5, "NH₃"], ["NH₄NO₃", "NH₄⁺", "NO₃⁻", 0, 1.8, -5, "NH₃"]]);
    const c = R.pick([0.01, 0.05, 0.1, 0.2]), K = 1e-14 / (m * 10 ** e), x = Math.sqrt(K * c), p = rd(-log10(x), 2), r = bas ? rd(14 - p, 2) : p;
    return num(T.hl_q(s, H.dec(c), par_, sci(m, e), bas), r, T.hl_s(ion, esp, bas, par_, sci(m, e), sx(K, 2), H.dec(c), sx(x, 2), f2(p), f2(r)), 0.03); }
  const pka = R.pick([4.74, 3.17, 9.25, 7.2]), b = R.pick([0.1, 0.2, 0.05]), a = R.pick([0.1, 0.2, 0.05]), lg = rd(log10(b / a), 2), r = rd(pka + lg, 2);
  return num(T.va_q[2](H.dec(pka), H.dec(b), H.dec(a)), r, T.va_s[2](H.dec(pka), H.dec(b), H.dec(a), f2(lg), f2(r)), 0.02);
});
// Valoraciones (lección hidrolisis-valoraciones): concentración del ácido, pH en un punto de la curva y riqueza
def("quim12.valoracion", (R, S, H) => {
  const T = S.quim12, u = R.r();
  if (u < 0.5) { const [f, p] = R.pick([["HCl", 1], ["H₂SO₄", 2], ["HNO₃", 1]]), va = R.pick([10, 20, 25]), cb = R.pick([0.1, 0.2]), vb = R.pick([10, 15, 20, 25]), nb = cb * vb / 1000, r = cs(nb / p / (va / 1000), 3);
    return num(T.va_q[0](va, H.dec(cb), vb, f, p), r, T.va_s[0](f, p, H.dec(cb), H.dec(vb / 1000), sx(nb, 3), sx(nb / p, 3), H.dec(va / 1000), H.dec(r)), Math.max(0.0011, r * 0.01)); }
  // pH en un punto de la curva de HCl con NaOH (en mmol, como el Ejemplo 3)
  if (u < 0.8) { const va = R.pick([20, 25]), ca = R.pick([0.1, 0.2]), cb = R.pick([0.1, 0.2]), ve = va * ca / cb, vb = rd(ve * (1 + R.pick([-0.4, -0.2, -0.08, -0.04, 0, 0.04, 0.08, 0.2, 0.4])), 1);
    const na = rd(va * ca, 2), nb = rd(vb * cb, 3), V = rd(va + vb, 1), d = rd(Math.abs(na - nb), 3);
    if (d < 1e-9) return num(T.va_q[3](va, H.dec(ca), H.dec(cb), H.dec(vb)), 7, T.va_s[3](va, H.dec(ca), H.dec(na), H.dec(vb), H.dec(cb), H.dec(nb), 0, "", H.dec(V), "", "", f2(7)), 0.02);
    const conc = d / V, p = rd(-log10(conc), 2), r = na > nb ? p : rd(14 - p, 2);
    return num(T.va_q[3](va, H.dec(ca), H.dec(cb), H.dec(vb)), r, T.va_s[3](va, H.dec(ca), H.dec(na), H.dec(vb), H.dec(cb), H.dec(nb), H.dec(d), na > nb ? "H₃O⁺" : "OH⁻", H.dec(V), sx(conc, 3), f2(p), f2(r)), 0.02); }
  // riqueza de una sosa comercial; la bureta, entre 20 y 50 mL
  const c = R.pick([0.1, 0.2, 0.5]), m = R.pick({ 0.1: [0.1, 0.15], 0.2: [0.2, 0.25, 0.3], 0.5: [0.5, 0.6, 0.8, 1] }[c]), w = R.pick([85, 88, 90, 92, 95, 97]);
  const v = rd(m * w / 100 / 40 / c * 1000, 1), n = c * v / 1000, mm = n * 40, r = cs(mm / m * 100, 3);
  return num(T.va_q[4](H.dec(m), H.dec(c), H.dec(v)), r, T.va_s[4](H.dec(c), H.dec(rd(v / 1000, 4)), sx(n, 3), H.dec(cs(mm, 3)), H.dec(m), H.dec(r)), Math.max(0.3, r * 0.005));
});

/* ── U7 · Redox ── */
def("quim12.redox", (R, S, H) => {
  const T = S.quim12, u = R.r();
  // el tipo de examen: ajustar por ion-electrón y dar un coeficiente de la ecuación iónica ajustada (banco en el i18n)
  if (u < 0.3) { const [sk, med, red, ox, eq, asks] = R.pick(T.rx_aj), [sp, n] = R.pick(asks);
    return { q: T.rx_q[2](sk, med, sp), kind: "int", ans: n, sol: T.rx_s[2](red, ox, eq, sp, n) }; }
  // valoración redox: [valorante, ion o sustancia valorada, moles de valorada por mol de valorante (texto y número), ecuación]
  if (u < 0.45) { const [vt, vd, rt, f, eq] = R.pick([["KMnO₄", "Fe²⁺", "5", 5, "MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O"], ["K₂Cr₂O₇", "Fe²⁺", "6", 6, "Cr₂O₇²⁻ + 6 Fe²⁺ + 14 H⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O"],
      ["KMnO₄", "H₂O₂", "5/2", 2.5, "2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O"], ["KMnO₄", "C₂O₄²⁻ (oxalato)", "5/2", 2.5, "2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺ → 2 Mn²⁺ + 10 CO₂ + 8 H₂O"]]);
    const V = R.pick([10, 20, 25]), c = R.pick([0.01, 0.02, 0.05]), v = R.pick([8, 10, 12.5, 15, 16, 20]), nt = c * v / 1000, nd = nt * f, r = cs(nd / (V / 1000), 3);
    return num(T.rx_q[3](V, vd, vt, H.dec(c), H.dec(v)), r, T.rx_s[3](eq, vt, vd, rt, H.dec(c), H.dec(v / 1000), sx(nt, 3), sx(nd, 3), H.dec(V / 1000), H.dec(r)), Math.max(1e-4, r * 0.01)); }
  // [elemento, especie, número de oxidación, suma de la lección con x]
  if (u < 0.75) { const [el, sp, r, eq] = R.pick([["manganeso", "KMnO₄", 7, "(+1) + x + 4·(−2) = 0"], ["cromo", "K₂Cr₂O₇", 6, "2·(+1) + 2x + 7·(−2) = 0; 2x = 12"], ["azufre", "H₂SO₄", 6, "2·(+1) + x + 4·(−2) = 0"],
      ["azufre", "H₂S", -2, "2·(+1) + x = 0"], ["nitrógeno", "HNO₃", 5, "(+1) + x + 3·(−2) = 0"], ["nitrógeno", "NH₃", -3, "x + 3·(+1) = 0"], ["cloro", "NaClO", 1, "(+1) + x + (−2) = 0"],
      ["cloro", "KClO₃", 5, "(+1) + x + 3·(−2) = 0"], ["oxígeno", "H₂O₂", -1, "2·(+1) + 2x = 0 (es un peróxido); 2x = −2"], ["carbono", "CO", 2, "x + (−2) = 0"], ["hierro", "Fe₂O₃", 3, "2x + 3·(−2) = 0; 2x = 6"]]);
    return num(T.rx_q[0](el, sp), r, T.rx_s[0](sp, eq, r), 0.01); }
  // [semirreacción: de, a, electrones, elemento, n.º de oxidación inicial y final]
  const [a, b, r, el, o1, o2] = R.pick([["MnO₄⁻", "Mn²⁺", 5, "Mn", 7, 2], ["Cr₂O₇²⁻", "Cr³⁺", 3, "Cr", 6, 3], ["Fe²⁺", "Fe³⁺", 1, "Fe", 2, 3], ["Cu", "Cu²⁺", 2, "Cu", 0, 2], ["NO₃⁻", "NO", 3, "N", 5, 2], ["Cl₂", "Cl⁻", 1, "Cl", 0, -1], ["MnO₄⁻", "MnO₂", 3, "Mn", 7, 4]]);
  return { q: T.rx_q[1](a, b), kind: "int", ans: r, sol: T.rx_s[1](a, b, el, o1, o2, r) };
});
const EP = { "Ag⁺/Ag": 0.8, "Cu²⁺/Cu": 0.34, "H⁺/H₂": 0, "Pb²⁺/Pb": -0.13, "Fe²⁺/Fe": -0.44, "Zn²⁺/Zn": -0.76, "Al³⁺/Al": -1.66, "Mg²⁺/Mg": -2.37 };
// potenciales con signo menos tipográfico y dos decimales, como en la lección (+0,80; −0,13)
const pv = v => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(2).replace(".", WA.H.ds);
const potList = () => Object.entries(EP).map(([k, v]) => `${k} ${pv(v)} V`).join("; ");
// semirreacciones y notación de la pila a partir de los pares («Cu²⁺/Cu»)
const ZC = { "⁺": 1, "²⁺": 2, "³⁺": 3 };
const half = k => { const [ion, met] = k.split("/"), z = met === "H₂" ? 2 : ZC[ion.replace(/^[A-Za-z]+/, "")];
  return { ion, met, z, ox: met === "H₂" ? "H₂ → 2 H⁺ + 2 e⁻" : `${met} → ${ion} + ${z > 1 ? z + " " : ""}e⁻`, red: met === "H₂" ? "2 H⁺ + 2 e⁻ → H₂" : `${ion} + ${z > 1 ? z + " " : ""}e⁻ → ${met}`,
    L: met === "H₂" ? "Pt | H₂ | H⁺" : `${met} | ${ion}`, Rt: met === "H₂" ? "H⁺ | H₂ | Pt" : `${ion} | ${met}` }; };
const nota = (c, a) => `${half(a).L} ‖ ${half(c).Rt}`;
def("quim12.pila", (R, S, H) => {
  const T = S.quim12, k = R.int(0, 3), keys = Object.keys(EP);
  if (k === 0) { let [c, a] = R.shuffle(keys.slice()).slice(0, 2); if (EP[c] < EP[a]) [c, a] = [a, c]; const r = rd(EP[c] - EP[a], 2);
    return num(T.pi_q[0](c, a) + ` (E°: ${potList()})`, r, T.pi_s[0](c, pv(EP[c]), a, pv(EP[a]), pv(r)) + T.pi_n(half(c).red, half(a).ox, nota(c, a)), 0.011); }
  // notación de la pila (con sus semirreacciones), sin el electrodo de hidrógeno
  if (k === 3) { let [c, a] = R.shuffle(keys.filter(x => x !== "H⁺/H₂")).slice(0, 2); if (EP[c] < EP[a]) [c, a] = [a, c];
    const hc = half(c), ha = half(a), ok = nota(c, a), opts = [ok, nota(a, c), `${ha.met} | ${hc.ion} ‖ ${ha.ion} | ${hc.met}`];
    return { q: T.pi_q[3](c, pv(EP[c]), a, pv(EP[a])), kind: "choice", opts, correct: 0, sol: T.pi_s[3](a, pv(EP[a]), c, pv(EP[c]), ha.ox, hc.red, ok) }; }
  // [metal, ion, par del ion (se reduciría), par del metal (se oxidaría)]
  if (k === 1) { const [m, ion, pc, pa] = R.pick([["cinc", "Cu²⁺", "Cu²⁺/Cu", "Zn²⁺/Zn"], ["cobre", "H⁺ (ácido clorhídrico)", "H⁺/H₂", "Cu²⁺/Cu"], ["hierro", "Cu²⁺", "Cu²⁺/Cu", "Fe²⁺/Fe"], ["cobre", "Ag⁺", "Ag⁺/Ag", "Cu²⁺/Cu"],
      ["plata", "H⁺", "H⁺/H₂", "Ag⁺/Ag"], ["magnesio", "H⁺", "H⁺/H₂", "Mg²⁺/Mg"], ["plomo", "Zn²⁺", "Zn²⁺/Zn", "Pb²⁺/Pb"]]), e = rd(EP[pc] - EP[pa], 2), ok = e > 0;
    return { q: T.pi_q[1](m, ion) + ` (E°: ${potList()})`, kind: "choice", opts: T.pi_o, correct: ok ? 0 : 1, shuffle: false, sol: T.pi_s[1](pc, pv(EP[pc]), pa, pv(EP[pa]), pv(e), ok) }; }
  // pilas reales: [reacción, electrones por mol de reacción, E°]
  const [rx, n, e] = R.pick([["Zn + Cu²⁺ → Zn²⁺ + Cu (pila Daniell)", 2, 1.1], ["Fe + Cu²⁺ → Fe²⁺ + Cu", 2, 0.78], ["Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag", 2, 0.46], ["Zn + 2 Ag⁺ → Zn²⁺ + 2 Ag", 2, 1.56],
    ["Mg + 2 Ag⁺ → Mg²⁺ + 2 Ag", 2, 3.17], ["2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu", 6, 2.0]]), j = rd(-n * 96485 * e, 0), r = rd(j / 1000, 1);
  return num(T.pi_q[2](rx, n, pv(e)), r, T.pi_s[2](n, H.dec(e), cierra(H, j), H.dec(r)), Math.max(0.5, Math.abs(r) * 0.01));
});
def("quim12.faraday", (R, S, H) => {
  // el aluminio solo se obtiene de la sal fundida (en agua se desprendería H₂)
  const T = S.quim12, k = R.int(0, 4), [m, M, z] = R.pick([["cobre", 63.5, 2], ["plata", 107.9, 1], ["níquel", 58.7, 2], ["oro", 197, 3], ["cinc", 65.4, 2], ["aluminio", 27, 3]]), fund = m === "aluminio";
  // volumen de gas en la electrólisis del agua (Ejemplo 5): H₂, 2 e⁻ por molécula; O₂, 4 e⁻
  if (k === 3) { const h2 = R.r() < 0.6, I = R.pick([0.5, 1, 2, 5]), t = R.pick([10, 30, 60, 120]), ts = t * 60, Q = I * ts, ne = Q / 96485, e = h2 ? 2 : 4, ng = ne / e, r = cs(ng * 0.082 * 298, 3);
    return num(T.fa_q[3](h2, H.dec(I), t), r, T.fa_s[3](h2, t, H.n(ts), H.dec(I), H.n(Q), nx(H, ne), e, nx(H, ng), H.dec(r)), Math.max(0.002, r * 0.01)); }
  // cubas en serie: la misma carga pasa por las dos
  if (k === 4) { const ms = [["plata", 107.9, 1, "Ag⁺"], ["cobre", 63.5, 2, "Cu²⁺"], ["níquel", 58.7, 2, "Ni²⁺"], ["oro", 197, 3, "Au³⁺"], ["cinc", 65.4, 2, "Zn²⁺"]], [a1, a2] = R.shuffle(ms.slice()).slice(0, 2);
    const g = R.pick([0.5, 1, 1.5, 2, 3, 5]), n1 = g / a1[1], ne = n1 * a1[2], n2 = ne / a2[2], r = cs(n2 * a2[1], 3);
    return num(T.fa_q[4](a1[3], a2[3], H.dec(g), a1[0], a2[0], H.dec(a1[1]), H.dec(a2[1])), r, T.fa_s[4](H.dec(g), H.dec(a1[1]), nx(H, n1), a1[2], nx(H, ne), a2[2], nx(H, n2), H.dec(a2[1]), H.dec(r)), Math.max(0.002, r * 0.01)); }
  if (k === 0) { const I = R.pick([0.5, 1, 2, 5]), t = R.pick([10, 30, 60, 120]), ts = t * 60, Q = I * ts, ne = Q / 96485, r = cs(ne / z * M, 3);
    return num(T.fa_q[0](m, z, H.dec(I), t, fund), r, T.fa_s[0](t, H.n(ts), H.dec(I), H.n(Q), nx(H, ne), z, nx(H, ne / z), H.dec(M), H.dec(r)), Math.max(0.002, r * 0.01)); }
  if (k === 1) { const g = R.pick([0.5, 1, 2, 5]), I = R.pick([0.5, 1, 2]), nm = g / M, ne = nm * z, Q = ne * 96485, ts = Q / I, r = rd(ts / 60, 1);
    return num(T.fa_q[1](m, z, H.dec(g), H.dec(I), fund), r, T.fa_s[1](H.dec(g), H.dec(M), nx(H, nm), z, nx(H, ne), H.n(rd(Q, 0)), H.dec(I), H.n(rd(ts, 0)), H.dec(r)), Math.max(0.2, r * 0.01)); }
  const n = R.pick([0.05, 0.1, 0.5, 1]), r = rd(2 * n * 96485, 0); return num(T.fa_q[2](H.dec(n)), r, T.fa_s[2](H.dec(n), H.dec(2 * n), H.n(r)), Math.max(10, r * 0.01));
});
})();
