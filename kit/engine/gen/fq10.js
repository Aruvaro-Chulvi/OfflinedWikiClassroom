/* WikiAula — Física y Química, Grado 10 (4.º de ESO): problemas numéricos y bancos.
   Textos y bancos en i18n/<lang>/fq10.js (S.fq10). */
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
const sub = f => f.replace(/(\d+)/g, "<sub>$1</sub>");
const rad = a => a * Math.PI / 180;
const choice = (R, q, ok, alts, sol) => { const opts = R.shuffle([ok, ...alts.filter((x, i, a) => x !== ok && a.indexOf(x) === i)]); return { q, kind: "choice", opts, correct: opts.indexOf(ok), sol }; };   // sin opciones repetidas

// Modelo cuántico: banco de ideas, energía de un fotón (E = h f, como el Ejemplo 1), capacidad de subniveles y niveles, y qué fotón lleva más energía
const LUZ = [400, 410, 434, 450, 486, 500, 520, 550, 589, 600, 656, 700];
def("fq10.cuantico", (R, S, H) => {
  const T = S.fq10, k = R.r();
  if (k < 0.35) return B.mixed(T.cuantico, R);
  if (k < 0.6) {   // E = h f con λ visible (3 cifras en nm): mismos pasos y redondeos que el Ejemplo 1
    const L = R.pick(LUZ), lm = L / 100, q = rd(3 / lm, 3), fm = rd(q * 10, 2), p = rd(6.63 * fm, 1), a = rd(p / 10, 2);
    return { q: T.cu_q[0](L), kind: "fields", fields: [{ label: T.mo_f[0], kind: "num", ans: a, tol: a * 0.012 }, { label: T.mo_f[1], ans: -19 }],
      sol: T.cu_s[0](L, H.dec(lm), H.dec(q), H.dec(fm), H.dec(p), H.dec(a)) };
  }
  if (k < 0.8) {   // capacidad
    if (R.r() < 0.6) { const [n, l] = R.pick([[1, "s"], [2, "s"], [2, "p"], [3, "s"], [3, "p"], [3, "d"], [4, "s"], [4, "p"], [4, "d"], [4, "f"]]), o = { s: 1, p: 3, d: 5, f: 7 }[l];
      return { q: T.cu_q[1](n + l), kind: "int", ans: 2 * o, sol: T.cu_s[1](n + l, l, o, 2 * o) }; }
    const n = R.int(1, 4), subs = ["s", "p", "d", "f"].slice(0, n), os = subs.map(l => ({ s: 1, p: 3, d: 5, f: 7 }[l])), no = os.reduce((s, x) => s + x, 0);
    return { q: T.cu_q[2](n), kind: "int", ans: 2 * no, sol: T.cu_s[2](n, subs.map(l => n + l).join(", "), os.join(" + "), no, 2 * no) };
  }
  const [l1, l2] = R.shuffle(LUZ.slice()).slice(0, 2), w = l1 < l2 ? l1 : l2;
  return { q: T.cu_q[3](l1, l2), kind: "choice", opts: [T.cu_o(l1), T.cu_o(l2), T.cu_o3], correct: l1 < l2 ? 0 : 1, shuffle: false, sol: T.cu_s[3](w, w === l1 ? l2 : l1) };
});
def("fq10.enlace", (R, S) => B.mixed(S.fq10.enlace, R));
def("fq10.intermol", (R, S) => B.mixed(S.fq10.intermol, R));
// Grupos funcionales: reconocer el grupo en la fórmula (sin la terminación a la vista), nombrar con gemelos y nombrar ésteres
// [fórmula, carbonos, familia (0 alcohol, 1 aldehído, 2 cetona, 3 ácido, 5 amina), localizador, nombre, gemelos]
const FUNC = [["CH₃–CH₂–COOH", 3, 3, 0, "ácido propanoico", ["propanal", "propanona", "propan-1-ol"]], ["CH₃–CH₂–CH₂–COOH", 4, 3, 0, "ácido butanoico", ["butanal", "butanona", "ácido propanoico"]],
  ["CH₃–CH₂–CHO", 3, 1, 0, "propanal", ["propanona", "ácido propanoico", "propan-1-ol"]], ["CH₃–CH₂–CH₂–CHO", 4, 1, 0, "butanal", ["butanona", "ácido butanoico", "propanal"]],
  ["CH₃–CO–CH₃", 3, 2, 0, "propanona", ["propanal", "propan-2-ol", "ácido propanoico"]], ["CH₃–CO–CH₂–CH₃", 4, 2, 0, "butanona", ["butanal", "butan-2-ol", "ácido butanoico"]],
  ["CH₃–CO–CH₂–CH₂–CH₃", 5, 2, 2, "pentan-2-ona", ["pentan-3-ona", "pentanal", "pentan-2-ol"]], ["CH₃–CH₂–CO–CH₂–CH₃", 5, 2, 3, "pentan-3-ona", ["pentan-2-ona", "pentanal", "pentan-3-ol"]],
  ["CH₃–CH₂–CH₂OH", 3, 0, 1, "propan-1-ol", ["propan-2-ol", "propanal", "propanona"]], ["CH₃–CHOH–CH₃", 3, 0, 2, "propan-2-ol", ["propan-1-ol", "propanona", "propanal"]],
  ["CH₃–CH₂–CH₂–CH₂OH", 4, 0, 1, "butan-1-ol", ["butan-2-ol", "butanal", "ácido butanoico"]], ["CH₃–CHOH–CH₂–CH₃", 4, 0, 2, "butan-2-ol", ["butan-1-ol", "butanona", "butanal"]],
  ["HCOOH", 1, 3, 0, "ácido metanoico", ["metanal", "ácido etanoico", "metanol"]], ["CH₃–COOH", 2, 3, 0, "ácido etanoico", ["etanal", "ácido metanoico", "etanol"]],
  ["CH₃–CH₂OH", 2, 0, 0, "etanol", ["etanal", "metanol", "ácido etanoico"]], ["HCHO", 1, 1, 0, "metanal", ["metanol", "ácido metanoico", "etanal"]],
  ["CH₃–NH₂", 1, 5, 0, "metilamina", ["etilamina", "metanol", "metanal"]], ["CH₃–CH₂–NH₂", 2, 5, 0, "etilamina", ["metilamina", "etanol", "etanal"]]];
const EST_A = ["met", "et", "prop", "but"], EST_O = [["met", "metanol"], ["et", "etanol"], ["prop", "propan-1-ol"], ["pent", "pentan-1-ol"]];
def("fq10.funcional", (R, S) => {
  const T = S.fq10, k = R.r();
  if (k < 0.4) return B.mixed(T.funcional, R);
  if (k < 0.75) { const [f, n, fam, loc, nm, tw] = R.pick(FUNC); return choice(R, T.fu_q(f), nm, tw, T.fu_s(f, n, fam, loc, nm)); }
  const a = R.pick(EST_A), [o, on] = R.pick(EST_O), ok = `${a}anoato de ${o}ilo`, alt = new Set();
  for (const z of R.shuffle([`${o}anoato de ${a}ilo`, `${R.pick(EST_A.filter(x => x !== a))}anoato de ${o}ilo`, `${a}anoato de ${R.pick(EST_O.filter(x => x[0] !== o))[0]}ilo`, `${o}anoato de ${o === a ? R.pick(EST_A.filter(x => x !== a)) : a}ilo`])) if (z !== ok) alt.add(z);
  return choice(R, T.fu_eq(a, on), ok, [...alt].slice(0, 3), T.fu_es(a, on, o, ok));
});
// Reacciones de interés: clasificar (sin «síntesis», que la lección no da) o decir qué se oxida y qué se reduce
def("fq10.tiporeac", (R, S) => {
  const T = S.fq10;
  if (R.r() < 0.55) return B.mixed(T.tiporeac, R);
  const [eq, ox, red, sx, sr, opts] = R.pick(T.redox), w = R.int(0, 1), ok = w ? red : ox;
  return choice(R, T.rx_q(eq, w), ok, opts.filter(o => o !== ok).slice(0, 2), T.rx_s(sx, sr));
});
// Combustiones: CO₂ emitido, calor desprendido o agua formada a partir de la masa de combustible (Ejemplo 1)
// [nombre, fórmula, M, ecuación ajustada, mol de CO₂ por mol, mol de H₂O por mol, ΔH (kJ/mol)]
const COMB = [["metano", "CH4", 16, "CH4 + 2 O2 → CO2 + 2 H2O", 1, 2, 890], ["propano", "C3H8", 44, "C3H8 + 5 O2 → 3 CO2 + 4 H2O", 3, 4, 2220],
  ["butano", "C4H10", 58, "2 C4H10 + 13 O2 → 8 CO2 + 10 H2O", 4, 5, 2878], ["etanol", "C2H5OH", 46, "C2H5OH + 3 O2 → 2 CO2 + 3 H2O", 2, 3, 1367],
  ["octano", "C8H18", 114, "2 C8H18 + 25 O2 → 16 CO2 + 18 H2O", 8, 9, 5470]];
def("fq10.combustion", (R, S, H) => {
  const T = S.fq10, d = H.dec, [nm, f, M, eq, cc, ch, dh] = R.pick(COMB), n = R.pick([0.5, 1, 2, 5, 10, 20, 50]), m = rd(n * M, 2), w = R.r();
  const eqs = eqH(eq), base = T.cb_mol(d(m), M, d(n), sub(f));
  if (w < 0.5) { const nC = rd(n * cc, 3), r = rd(nC * 44, 1); return num(T.cb_q[0](eqs, nm, d(m)), r, base + T.cb_s[0](d(n), cc, d(nC), d(r), sub(f), eq.startsWith("2 ")), Math.max(0.11, r * 0.01)); }
  if (w < 0.75) { const r = rd(n * dh); return num(T.cb_q[1](nm, sub(f), d(m), dh), r, base + T.cb_s[1](d(n), dh, d(r))); }
  const nW = rd(n * ch, 3), r = rd(nW * 18, 1); return num(T.cb_q[2](eqs, nm, d(m)), r, base + T.cb_s[2](d(n), ch, d(nW), d(r), sub(f), eq.startsWith("2 ")), Math.max(0.11, r * 0.01));
});

/* ── U1 · Herramientas ── */
const TRIG = { 30: [0.866, 0.5], 45: [0.707, 0.707], 60: [0.5, 0.866] };   // los valores que da el enunciado (como la lección)
def("fq10.vector", (R, S, H) => {
  const k = R.int(0, 4), T = S.fq10, d = H.dec;
  if (k === 3) {   // desplazamiento con contexto y signo (este y norte positivos)
    const [ctx, u] = R.pick(T.ve_ctx), [p, q] = R.pick([[3, 4], [6, 8], [5, 12], [8, 6], [9, 12], [12, 5], [4, 3], [8, 15]]), sx = R.pick([1, -1]), sy = R.pick([1, -1]), xf = R.r() < 0.5;
    const x = sx * p, y = sy * q, r = Math.hypot(x, y);
    return { q: T.ve_q4(ctx, u, p, sx, q, sy, xf), kind: "fields", fields: [{ label: T.ve_f4[0], ans: x }, { label: T.ve_f4[1], ans: y }, { label: T.ve_f4[2], ans: r }], sol: T.ve_s4(d(x), d(y), r, u, sx, sy) };
  }
  if (k === 4) {   // camino inverso: de las componentes al ángulo (SHIFT tan, como el Ejemplo 1)
    const [x, y] = R.pick([[3, 4], [4, 3], [1, 1], [5, 12], [12, 5], [2, 1], [1, 2], [1, 3], [3, 1], [8, 15], [10, 20], [7, 7]]), t = rd(y / x, 3), a = rd(Math.atan(y / x) * 180 / Math.PI, 1);
    return num(T.ve_q5(x, y), a, T.ve_s5(x, y, d(t), d(a), t === y / x), 0.3);
  }
  if (k === 0) { const [x, y] = R.pick([[3, 4], [6, 8], [5, 12], [8, 15], [1, 1], [2, 3], [-3, 4], [7, -24], [4, -2], [9, 12]]), r = rd(Math.hypot(x, y)); return num(T.ve_q(d(x), d(y)), r, T.ve_s(d(x), d(y), d(r))); }
  if (k === 1) { const v = R.pick([10, 20, 50, 100]), a = R.pick([30, 45, 60]), [c, s] = TRIG[a], x = rd(v * c), y = rd(v * s);
    return { q: T.ve_q2(v, a, d(c), d(s)), kind: "fields", fields: [{ label: T.ve_f[0], kind: "num", ans: x, tol: Math.max(0.06, x * 0.01) }, { label: T.ve_f[1], kind: "num", ans: y, tol: Math.max(0.06, y * 0.01) }], sol: T.ve_s2(v, a, d(c), d(s), d(x), d(y)) }; }
  const a = [R.int(-6, 9), R.int(-6, 9)], b = [R.int(-6, 9), R.int(-6, 9)];
  return { q: T.ve_q3(a.map(d), b.map(d)), kind: "fields", fields: [{ label: T.ve_f3[0], ans: a[0] + b[0] }, { label: T.ve_f3[1], ans: a[1] + b[1] }], sol: T.ve_s3(a.map(d), b.map(d), d(a[0] + b[0]), d(a[1] + b[1])) };
});
// [magnitud, dimensiones, definición (va en el enunciado), camino de la solución]
const DIMS = [["la velocidad", "L·T⁻¹", "distancia / tiempo", "L / T"], ["la aceleración", "L·T⁻²", "velocidad / tiempo", "L·T⁻¹ / T"], ["la fuerza", "M·L·T⁻²", "masa · aceleración", "M · L·T⁻²"],
  ["la energía", "M·L²·T⁻²", "fuerza · distancia", "M·L·T⁻² · L"], ["la potencia", "M·L²·T⁻³", "energía / tiempo", "M·L²·T⁻² / T"], ["la presión", "M·L⁻¹·T⁻²", "fuerza / superficie", "M·L·T⁻² / L²"],
  ["la densidad", "M·L⁻³", "masa / volumen", "M / L³"], ["el volumen", "L³", "longitud · longitud · longitud", "L · L · L"], ["la frecuencia", "T⁻¹", "1 / periodo; el periodo es un tiempo", "1 / T"],
  ["la superficie", "L²", "longitud · longitud", "L · L"]];
// ¿Es homogénea? [fórmula, sí/no, dimensiones del primer miembro, del segundo]
const HOMOG = [["x = v · t", 1, "L", "L·T⁻¹ · T = L"], ["x = v · t²", 0, "L", "L·T⁻¹ · T² = L·T"], ["v = a · t", 1, "L·T⁻¹", "L·T⁻² · T = L·T⁻¹"], ["v = a / t", 0, "L·T⁻¹", "L·T⁻² / T = L·T⁻³"],
  ["x = ½ a t²", 1, "L", "L·T⁻² · T² = L (el ½ no tiene dimensiones)"], ["x = a · t", 0, "L", "L·T⁻² · T = L·T⁻¹ (una velocidad)"], ["v² = 2 a x", 1, "L²·T⁻²", "L·T⁻² · L = L²·T⁻²"],
  ["v = 2 a x", 0, "L·T⁻¹", "L·T⁻² · L = L²·T⁻²"], ["F = m · a", 1, "M·L·T⁻²", "M · L·T⁻² = M·L·T⁻²"], ["F = m · v", 0, "M·L·T⁻²", "M · L·T⁻¹ = M·L·T⁻¹"],
  ["E = m g h", 1, "M·L²·T⁻²", "M · L·T⁻² · L = M·L²·T⁻²"], ["E = m g", 0, "M·L²·T⁻²", "M · L·T⁻² = M·L·T⁻² (una fuerza)"], ["t = d / v", 1, "T", "L / (L·T⁻¹) = T"],
  ["t = v / d", 0, "T", "L·T⁻¹ / L = T⁻¹"], ["v = √(2 g h)", 1, "L·T⁻¹", "√(L·T⁻² · L) = √(L²·T⁻²) = L·T⁻¹"], ["E = ½ m v", 0, "M·L²·T⁻²", "M · L·T⁻¹ = M·L·T⁻¹"],
  ["a = v / t", 1, "L·T⁻²", "L·T⁻¹ / T = L·T⁻²"], ["x = x₀ + v t", 1, "L", "L + L·T⁻¹ · T = L + L (cada sumando, L)"], ["x = x₀ + v", 0, "L", "L + L·T⁻¹: no se pueden sumar"],
  ["E = ½ m v²", 1, "M·L²·T⁻²", "M · (L·T⁻¹)² = M·L²·T⁻²"], ["P = F · S", 0, "M·L⁻¹·T⁻² (presión)", "M·L·T⁻² · L² = M·L³·T⁻²"]];
def("fq10.dimension", (R, S) => {
  const T = S.fq10;
  if (R.r() < 0.45) { const [f, ok, l, r] = R.pick(HOMOG); return { q: T.di_hom.q(f), kind: "choice", opts: T.di_hom.o, correct: ok ? 0 : 1, shuffle: false, sol: T.di_hom.sol(f, ok, l, r) }; }
  const pool = R.shuffle(DIMS.slice()), [x, d, def_, path] = pool[0];
  return choice(R, T.di_dim.q(x, def_), d, pool.slice(1, 4).map(p => p[1]), T.di_dim.sol(x, def_, path, d));
});

/* ── U2 · Estructura ── */
const ORD = [[1, "s"], [2, "s"], [2, "p"], [3, "s"], [3, "p"], [4, "s"], [3, "d"], [4, "p"]], CAP = { s: 2, p: 6, d: 10 };
const SUP = n => String(n).split("").map(c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");
const conf = Z => { const out = []; let z = Z; for (const [n, l] of ORD) { if (z <= 0) break; const e = Math.min(CAP[l], z); out.push([n, l, e]); z -= e; } return out; };
const cstr = c => c.map(([n, l, e]) => `${n}${l}${SUP(e)}`).join(" ");
const ELS = [["hidrógeno", 1], ["litio", 3], ["berilio", 4], ["boro", 5], ["carbono", 6], ["nitrógeno", 7], ["oxígeno", 8], ["flúor", 9], ["neón", 10], ["sodio", 11], ["magnesio", 12], ["aluminio", 13],
  ["silicio", 14], ["fósforo", 15], ["azufre", 16], ["cloro", 17], ["argón", 18], ["potasio", 19], ["calcio", 20], ["escandio", 21], ["titanio", 22], ["hierro", 26], ["níquel", 28], ["cinc", 30], ["galio", 31], ["arsénico", 33], ["selenio", 34], ["bromo", 35], ["criptón", 36]];
def("fq10.config", (R, S) => {
  // valencia, periodo y grupo: solo representativos (la lección no enseña el grupo del bloque d)
  const T = S.fq10, k = R.int(0, 2), [n, Z] = R.pick(k >= 1 ? ELS.filter(e => e[1] <= 20 || e[1] >= 31) : ELS), c = conf(Z), cs = cstr(c);
  const per = Math.max(...c.map(x => x[0])), last = c[c.length - 1];
  if (k === 0) {   // las de los vecinos; las que coinciden con la buena (más allá del 4p no hay subniveles en ORD) no valen
    const alts = new Set(); for (const d of [-1, 1, 2, -2, 3, -3]) if (Z + d > 0) { const a = cstr(conf(Z + d)); if (a !== cs) alts.add(a); }
    return choice(R, T.co_cfg(n, Z), cs, [...alts].slice(0, 3), T.co_cfg_s(cs));
  }
  const val = c.filter(x => x[0] === per).reduce((s, x) => s + x[2], 0);
  if (k === 1) return { q: T.co_val(n, Z), kind: "int", ans: val, sol: T.co_val_s(cs, val) };
  const grp = Z <= 2 ? (Z === 1 ? 1 : 18) : val <= 2 ? val : 10 + val;   // como la lección: 1 y 2, y de 3 a 8 → 13 a 18 (el helio, al 18)
  return { q: T.co_pg(n, Z), kind: "fields", fields: [{ label: T.co_pg_f[0], ans: per }, { label: T.co_pg_f[1], ans: grp }], sol: T.co_pg_s(cs, per, val, grp) };
});
const POS = { litio: [2, 1], sodio: [3, 1], potasio: [4, 1], berilio: [2, 2], magnesio: [3, 2], calcio: [4, 2], boro: [2, 13], aluminio: [3, 13], carbono: [2, 14], silicio: [3, 14],
  nitrógeno: [2, 15], fósforo: [3, 15], oxígeno: [2, 16], azufre: [3, 16], flúor: [2, 17], cloro: [3, 17], bromo: [4, 17] };
def("fq10.tendencia", (R, S) => {
  const T = S.fq10, names = Object.keys(POS); let a, b;
  const prop = R.pick(["radio", "electronegatividad", "carácter metálico", "energía de ionización"]);
  // anomalías reales de la energía de ionización (Be > B, Mg > Al, N > O, P > S; se ven en la figura): no se preguntan
  const ANOM = ["berilio|boro", "aluminio|magnesio", "nitrógeno|oxígeno", "azufre|fósforo"];
  do { [a, b] = R.shuffle(names.slice()).slice(0, 2); } while (!(POS[a][0] === POS[b][0] || POS[a][1] === POS[b][1]) || (prop === "energía de ionización" && ANOM.includes([a, b].sort().join("|"))));
  const down = (x, y) => POS[x][0] > POS[y][0] || (POS[x][0] === POS[y][0] && POS[x][1] < POS[y][1]);   // x más abajo o más a la izquierda
  const w = (prop === "radio" || prop === "carácter metálico") === down(a, b) ? a : b;
  return { q: T.te_q(prop, a, b), kind: "choice", opts: [cap1(a), cap1(b)], correct: w === a ? 0 : 1, shuffle: false, sol: T.te_s(prop, w, T.te_why[prop]) };
});
const eqH = eq => eq.replace(/([A-Z][a-z]?)(\d+)/g, "$1<sub>$2</sub>");
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
// [molécula, pares compartidos, pares libres, suma de electrones de valencia, total]; la estructura y dónde están los pares libres, en S.fq10.le_est
const LEWIS = [["H₂O", 2, 2, "1 + 1 + 6", 8], ["NH₃", 3, 1, "5 + 3 · 1", 8], ["CH₄", 4, 0, "4 + 4 · 1", 8], ["CO₂", 4, 4, "4 + 6 + 6", 16], ["N₂", 3, 2, "5 + 5", 10], ["O₂", 2, 4, "6 + 6", 12],
  ["HCl", 1, 3, "1 + 7", 8], ["Cl₂", 1, 6, "7 + 7", 14], ["HCN", 4, 1, "1 + 4 + 5", 10], ["H₂", 1, 0, "1 + 1", 2], ["F₂", 1, 6, "7 + 7", 14],
  ["CH₂O (metanal)", 4, 2, "4 + 2 · 1 + 6", 12], ["PH₃", 3, 1, "5 + 3 · 1", 8], ["H₂S", 2, 2, "1 + 1 + 6", 8], ["CCl₄", 4, 12, "4 + 4 · 7", 32], ["C₂H₂ (etino)", 5, 0, "2 · 4 + 2 · 1", 10], ["C₂H₄ (eteno)", 6, 0, "2 · 4 + 4 · 1", 12]];
def("fq10.lewis", (R, S) => {
  const [m, b, l, sum, tot] = R.pick(LEWIS), T = S.fq10, [st, wh] = T.le_est[m];
  return { q: T.le_q(m), kind: "fields", fields: [{ label: T.le_f[0], ans: b }, { label: T.le_f[1], ans: l }], sol: T.le_s(m, b, l, sum, tot, st, wh) };
});

/* ── U3 · Formulación ── */
// Formulación: hay que formular (escribir), elegir entre «gemelos» del mismo compuesto mal formulado o mal nombrado
// y calcular números de oxidación; soluciones con el método de la lección (cruce de cargas y simplificar; óxido + agua; suma cero).
// Compuestos iónicos: [símbolo del catión, carga, anión (fórmula), carga, poliatómico, nombre, ácido de origen (o ""), fórmulas gemelas, nombres gemelos (o null)]
const SALT = [
  ["Na", 1, "OH", 1, 1, "hidróxido de sodio", "", ["Na(OH)2", "NaO", "Na2OH"], null], ["K", 1, "OH", 1, 1, "hidróxido de potasio", "", ["K(OH)2", "KO", "K2OH"], null],
  ["Ca", 2, "OH", 1, 1, "hidróxido de calcio", "", ["CaOH2", "CaOH", "Ca2OH"], null], ["Mg", 2, "OH", 1, 1, "hidróxido de magnesio", "", ["MgOH2", "MgOH", "Mg2OH"], null],
  ["Al", 3, "OH", 1, 1, "hidróxido de aluminio", "", ["AlOH3", "Al3OH", "Al(OH)2"], null], ["Fe", 3, "OH", 1, 1, "hidróxido de hierro(III)", "", ["Fe(OH)2", "FeOH3", "Fe3OH"], ["hidróxido de hierro(II)", "óxido de hierro(III)", "hidruro de hierro(III)"]],
  ["Fe", 2, "OH", 1, 1, "hidróxido de hierro(II)", "", ["Fe(OH)3", "FeOH2", "Fe2OH"], ["hidróxido de hierro(III)", "óxido de hierro(II)", "hidruro de hierro(II)"]], ["Cu", 2, "OH", 1, 1, "hidróxido de cobre(II)", "", ["CuOH", "CuOH2", "Cu2OH"], ["hidróxido de cobre(I)", "óxido de cobre(II)", "hidruro de cobre(II)"]],
  ["Na", 1, "SO4", 2, 1, "sulfato de sodio", "sulfúrico", ["Na2SO3", "Na2S", "NaSO4"], ["sulfito de sodio", "sulfuro de sodio", "persulfato de sodio"]],
  ["Na", 1, "SO3", 2, 1, "sulfito de sodio", "sulfuroso", ["Na2SO4", "Na2S", "NaSO3"], ["sulfato de sodio", "sulfuro de sodio", "hiposulfito de sodio"]],
  ["Cu", 2, "SO4", 2, 1, "sulfato de cobre(II)", "sulfúrico", ["Cu2SO4", "Cu(SO4)2", "CuSO3"], ["sulfato de cobre(I)", "sulfito de cobre(II)", "sulfuro de cobre(II)"]],
  ["Al", 3, "SO4", 2, 1, "sulfato de aluminio", "sulfúrico", ["Al2SO4", "Al(SO4)3", "Al2(SO3)3"], ["sulfito de aluminio", "sulfuro de aluminio", "persulfato de aluminio"]],
  ["Fe", 3, "SO4", 2, 1, "sulfato de hierro(III)", "sulfúrico", ["FeSO4", "Fe2SO4", "Fe3(SO4)2"], ["sulfato de hierro(II)", "sulfito de hierro(III)", "sulfuro de hierro(III)"]],
  ["Fe", 2, "SO4", 2, 1, "sulfato de hierro(II)", "sulfúrico", ["Fe2(SO4)3", "Fe(SO4)2", "FeSO3"], ["sulfato de hierro(III)", "sulfito de hierro(II)", "sulfuro de hierro(II)"]],
  ["K", 1, "NO3", 1, 1, "nitrato de potasio", "nítrico", ["KNO2", "K3N", "K(NO3)2"], ["nitrito de potasio", "nitruro de potasio", "pernitrato de potasio"]],
  ["K", 1, "NO2", 1, 1, "nitrito de potasio", "nitroso", ["KNO3", "K3N", "K2NO2"], ["nitrato de potasio", "nitruro de potasio", "hiponitrito de potasio"]],
  ["Ca", 2, "NO3", 1, 1, "nitrato de calcio", "nítrico", ["CaNO3", "Ca2NO3", "Ca(NO2)2"], ["nitrito de calcio", "nitruro de calcio", "pernitrato de calcio"]],
  ["Ag", 1, "NO3", 1, 1, "nitrato de plata", "nítrico", ["AgNO2", "Ag(NO3)2", "Ag2NO3"], ["nitrito de plata", "nitruro de plata", "hiponitrito de plata"]],
  ["Ca", 2, "CO3", 2, 1, "carbonato de calcio", "carbónico", ["Ca(CO3)2", "Ca2CO3", "CaCO2"], ["carbonito de calcio", "carburo de calcio", "percarbonato de calcio"]],
  ["Na", 1, "CO3", 2, 1, "carbonato de sodio", "carbónico", ["NaCO3", "Na(CO3)2", "Na2CO2"], ["carbonito de sodio", "carburo de sodio", "percarbonato de sodio"]],
  ["Ca", 2, "PO4", 3, 1, "fosfato de calcio", "fosfórico", ["Ca2(PO4)3", "CaPO4", "Ca3PO4"], ["fosfito de calcio", "fosfuro de calcio", "perfosfato de calcio"]],
  ["Na", 1, "ClO", 1, 1, "hipoclorito de sodio", "hipocloroso", ["NaClO2", "NaCl", "NaClO4"], ["clorito de sodio", "clorato de sodio", "cloruro de sodio"]],
  ["K", 1, "ClO4", 1, 1, "perclorato de potasio", "perclórico", ["KClO3", "KCl", "K(ClO4)2"], ["clorato de potasio", "clorito de potasio", "cloruro de potasio"]],
  ["Mg", 2, "ClO3", 1, 1, "clorato de magnesio", "clórico", ["MgClO3", "Mg2ClO3", "Mg(ClO4)2"], ["clorito de magnesio", "perclorato de magnesio", "cloruro de magnesio"]],
  // binarios de repaso (de 3.º): números de oxidación cruzados
  ["Al", 3, "O", 2, 0, "óxido de aluminio", "", ["AlO", "Al3O2", "AlO3"], null], ["Fe", 3, "O", 2, 0, "óxido de hierro(III)", "", ["FeO", "Fe3O2", "FeO3"], null],
  ["Mg", 2, "O", 2, 0, "óxido de magnesio", "", ["Mg2O2", "MgO2", "Mg2O"], null], ["Pb", 4, "O", 2, 0, "óxido de plomo(IV)", "", ["Pb2O4", "PbO", "Pb4O2"], null],
  ["Ca", 2, "Cl", 1, 0, "cloruro de calcio", "", ["CaCl", "Ca2Cl", "Ca2Cl2"], null], ["Fe", 3, "Cl", 1, 0, "cloruro de hierro(III)", "", ["FeCl", "Fe3Cl", "FeCl2"], null],
  ["Na", 1, "S", 2, 0, "sulfuro de sodio", "", ["NaS", "NaS2", "Na2SO4"], null]];
// Oxoácidos: [no metal, nombre del no metal, número de oxidación, nombre del ácido, fórmulas gemelas, nombres gemelos]
const ACID = [["S", "azufre", 6, "ácido sulfúrico", ["H2SO3", "H2S", "HSO4"], ["ácido sulfuroso", "ácido hiposulfuroso", "ácido persulfúrico"]],
  ["S", "azufre", 4, "ácido sulfuroso", ["H2SO4", "H2SO2", "HSO3"], ["ácido sulfúrico", "ácido hiposulfuroso", "ácido persulfúrico"]],
  ["N", "nitrógeno", 5, "ácido nítrico", ["HNO2", "H2NO3", "NH3"], ["ácido nitroso", "ácido hiponitroso", "ácido pernítrico"]],
  ["N", "nitrógeno", 3, "ácido nitroso", ["HNO3", "H2NO2", "HNO"], ["ácido nítrico", "ácido hiponitroso", "ácido pernítrico"]],
  ["C", "carbono", 4, "ácido carbónico", ["HCO3", "H2CO2", "H2C2O3"], ["ácido carbonoso", "ácido percarbónico", "ácido hipocarbonoso"]],
  ["P", "fósforo", 5, "ácido fosfórico", ["HPO3", "H3PO3", "H2PO4"], ["ácido fosforoso", "ácido hipofosforoso", "ácido perfosfórico"]],
  ["Cl", "cloro", 7, "ácido perclórico", ["HClO3", "HClO", "H2ClO4"], ["ácido clórico", "ácido cloroso", "ácido hipocloroso"]],
  ["Cl", "cloro", 5, "ácido clórico", ["HClO4", "HClO2", "H3ClO3"], ["ácido perclórico", "ácido cloroso", "ácido hipocloroso"]],
  ["Cl", "cloro", 3, "ácido cloroso", ["HClO", "HClO3", "H2ClO2"], ["ácido clórico", "ácido hipocloroso", "ácido perclórico"]],
  ["Cl", "cloro", 1, "ácido hipocloroso", ["HClO2", "HCl", "H2ClO"], ["ácido cloroso", "ácido clorhídrico", "ácido perclórico"]],
  ["Br", "bromo", 5, "ácido brómico", ["HBrO4", "HBrO2", "H2BrO3"], ["ácido perbrómico", "ácido bromoso", "ácido hipobromoso"]]];
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const fml = (c, n, a, m, poly) => c + (n > 1 ? n : "") + (m > 1 ? (poly ? `(${a})${m}` : a + m) : a);
const ion = (s, q, neg) => sub(s) + (q > 1 ? SUP(q) : "") + (neg ? "⁻" : "⁺");
const uni = f => f.replace(/\d/g, c => "₀₁₂₃₄₅₆₇₈₉"[c]);
// ácido del no metal X con número de oxidación v: óxido + agua, contar átomos y simplificar (el fosfórico, con tres aguas)
const acidOf = (X, v) => {
  if (X === "P") return { ox: "P2O5", raw: "H6P2O8", f: "H3PO4", h: 3, o: 4, three: true };
  if (v % 2) { const o = v + 1; return { ox: fml(X, 2, "O", v, 0), raw: `H2${X}2O${o}`, f: fml("H" + X, 1, "O", o / 2, 0), h: 1, o: o / 2 }; }
  return { ox: fml(X, 1, "O", v / 2, 0), raw: "", f: `H2${X}O${v / 2 + 1}`, h: 2, o: v / 2 + 1 };
};
// sal → [fórmula sin simplificar, simplificada, factor, subíndices]
const saltF = ([c, qc, an, qa, poly]) => { const g = gcd(qc, qa), nc = qa / g, na = qc / g; return { raw: fml(c, qa, an, qc, poly), f: fml(c, nc, an, na, poly), g, nc, na }; };
const OXSALT = SALT.filter(s => s[4] && s[2] !== "OH" && saltF(s).na === 1 && !["Fe", "Cu"].includes(s[0]));   // un solo anión: la suma cero es una ecuación sencilla
def("fq10.ternario", (R, S) => {
  const T = S.fq10, k = R.r();
  const saltSol = s => { const z = saltF(s); return T.te_salt_s(s[4] ? ion(s[0], s[1]) : `${s[0]} (+${s[1]})`, s[4] ? ion(s[2], s[3], 1) : `${s[2]} (−${s[3]})`, s[6], s[4], sub(z.raw), z.g, sub(z.f), z.nc, s[1], z.na, s[3]); };
  if (k < 0.2) {   // número de oxidación del no metal: suma cero, como el Ejemplo 2
    if (R.r() < 0.6) { const [X, xn, v, n] = R.pick(ACID), a = acidOf(X, v);
      return { q: T.te_ox_q(xn, sub(a.f)), kind: "int", ans: v, sol: T.te_ox_s(xn, a.h, 1, "H", a.o, v, n) }; }
    const s = R.pick(OXSALT), z = saltF(s), X = s[2].match(/^[A-Z][a-z]?/)[0], o = +(s[2].match(/O(\d*)$/)[1] || 1);
    return { q: T.te_ox_q(T.te_el[X], sub(z.f)), kind: "int", ans: 2 * o - s[3], sol: T.te_ox_s(T.te_el[X], z.nc, s[1], s[0], o, 2 * o - s[3], s[5]) };
  }
  if (k < 0.45) {   // escribir la fórmula
    if (R.r() < 0.3) { const [X, xn, v, n] = R.pick(ACID), a = acidOf(X, v); return { q: T.te_w(n), kind: "text", ans: [a.f, uni(a.f)], sol: T.te_acid_s(n, xn, v, a, sub) }; }
    const s = R.pick(SALT), z = saltF(s); return { q: T.te_w(s[5]), kind: "text", ans: [z.f, uni(z.f)], sol: saltSol(s) };
  }
  if (k < 0.75) {   // del nombre a la fórmula, con gemelos
    if (R.r() < 0.3) { const [X, xn, v, n, tw] = R.pick(ACID), a = acidOf(X, v); return choice(R, T.te_q2(n), sub(a.f), tw.map(sub), T.te_acid_s(n, xn, v, a, sub)); }
    const s = R.pick(SALT), z = saltF(s); return choice(R, T.te_q2(s[5]), sub(z.f), s[7].map(sub), saltSol(s));
  }
  // de la fórmula al nombre, con gemelos (oxoácidos y sales de nombres parecidos)
  if (R.r() < 0.35) { const [X, xn, v, n, , tn] = R.pick(ACID), a = acidOf(X, v); return choice(R, T.te_q3(sub(a.f)), n, tn, T.te_ox_s(xn, a.h, 1, "H", a.o, v, n)); }
  const s = R.pick(SALT.filter(x => x[8])), z = saltF(s);
  return choice(R, T.te_q3(sub(z.f)), s[5], s[8], T.te_name_s(sub(z.f), ion(s[0], s[1]), ion(s[2], s[3], 1), s[6], s[5], z.nc, s[1], z.na, s[3]));
});
const PRE = ["met", "et", "prop", "but", "pent", "hex", "hept", "oct"];
// Hidrocarburos: fórmula molecular con distractores del mismo número de carbonos, nombrar fórmulas semidesarrolladas
// (localizadores y ramas, como los Ejemplos 1 y 3), de la fórmula molecular al tipo (Ejemplo 2) y contar hidrógenos
def("fq10.hidrocarburo", (R, S) => {
  const T = S.fq10, k = R.r();
  if (k < 0.2) {   // fórmula molecular: alcano, alqueno o alquino de n carbonos; distractores con los mismos C
    const t = R.int(0, 2), n = R.int(t ? 2 : 1, 8), h = 2 * n + 2 - 2 * t, nm = PRE[n - 1] + ["ano", "eno", "ino"][t];
    const F = hh => sub((n === 1 ? "C" : "C" + n) + "H" + hh), alts = [2 * n + 2, 2 * n, 2 * n - 2, 2 * n + 4].filter(x => x !== h && x > 0).slice(0, 3);
    return choice(R, T.hc_q[0](nm), F(h), alts.map(F), T.hc_s[0](nm, n, t, F(h), h));
  }
  if (k < 0.45) { const [f, nm, tw, why] = R.pick(T.hc_lin); return choice(R, T.hc_q[1](f), nm, tw, T.hc_s[1](f, why, nm)); }
  if (k < 0.65) { const [f, nm, tw, why] = R.pick(T.hc_ram); return choice(R, T.hc_q[1](f), nm, tw, T.hc_s[1](f, why, nm)); }
  if (k < 0.85) {   // de la fórmula molecular al tipo (cadena abierta)
    const t = R.int(0, 2), n = R.int(2, 8), h = 2 * n + 2 - 2 * t;
    return { q: T.hc_q[3](sub(`C${n}H${h}`)), kind: "choice", opts: T.hc_o, correct: t, shuffle: false, sol: T.hc_s[3](n, 2 * n + 2, h, t) };
  }
  const n = R.int(1, 10); return { q: T.hc_q[2](n), kind: "int", ans: 2 * n + 2, sol: T.hc_s[2](n, 2 * n + 2) };
});

/* ── U4 · Reacciones ── */
const SUBS = [["H2O", 18], ["CO2", 44], ["NaCl", 58.5], ["CH4", 16], ["O2", 32], ["NH3", 17], ["CaCO3", 100], ["C6H12O6", 180], ["H2SO4", 98], ["NaOH", 40]];
const IONIC = ["NaCl", "CaCO3", "NaOH"];   // redes de iones: no tienen «moléculas» (lo dice la lección de enlace)
def("fq10.mol", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 3), [f, M] = R.pick(k >= 2 ? SUBS.filter(s => !IONIC.includes(s[0])) : SUBS), n = R.pick([0.1, 0.25, 0.5, 1, 2, 3, 4, 5]), m = rd(n * M);
  if (k === 0) return num(T.mo_q[0](H.dec(m), sub(f), H.dec(M)), n, T.mo_s[0](H.dec(m), H.dec(M), H.dec(rd(m / M, 3))));
  if (k === 1) return num(T.mo_q[1](H.dec(n), sub(f), H.dec(M)), m, T.mo_s[1](H.dec(n), H.dec(M), H.dec(m)));
  // número de moléculas en notación científica: a · 10^b con 1 ≤ a < 10 (como la lección), en dos casillas
  const p = rd(n * 6.022, 4), e = 23 + Math.floor(Math.log10(p)), a = rd(p / 10 ** (e - 23), 3);
  const fields = [{ label: T.mo_f[0], kind: "num", ans: a, tol: a * 0.01 }, { label: T.mo_f[1], ans: e }];
  const steps = T.mo_sci(H.dec(n), H.dec(p), H.dec(a), e);
  if (k === 2) return { q: T.mo_q[2](H.dec(n), sub(f)), kind: "fields", fields, sol: steps };
  return { q: T.mo_q[3](H.dec(m), sub(f), H.dec(M)), kind: "fields", fields, sol: T.mo_s[0](H.dec(m), H.dec(M), H.dec(rd(m / M, 3))).replace(/<\/?b>/g, "") + ". " + steps };
});
const SOLU = [["NaCl", 58.5], ["NaOH", 40], ["C6H12O6", 180], ["KCl", 74.5], ["HCl", 36.5]];
def("fq10.molaridad", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 2), [f, M] = R.pick(SOLU), V = R.pick([100, 200, 250, 500, 1000]), c = R.pick([0.1, 0.2, 0.5, 1, 2]), n = rd(c * V / 1000, 4), m = rdD(n * M, 3);
  if (k === 0) return num(T.ml_q[0](H.dec(m), sub(f), H.dec(M), V), c, T.ml_s[0](H.dec(m), H.dec(M), H.dec(rd(m / M, 4)), H.dec(V / 1000), H.dec(c), V));
  if (k === 1) { const mr = rd(n * M, 3); return num(T.ml_q[1](H.dec(c), V, sub(f), H.dec(M)), mr, T.ml_s[1](H.dec(c), H.dec(V / 1000), H.dec(M), H.dec(n), H.dec(mr), V)); }
  return num(T.ml_q[2](H.dec(c), V), n, T.ml_s[2](H.dec(c), H.dec(V / 1000), H.dec(n), V), Math.max(0.0011, n * 0.01));
});
def("fq10.gasideal", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 3), n = R.pick([0.5, 1, 2, 3, 4]), Tk = R.pick([273, 300, 350, 400, 500]);
  const nrt = H.dec(rd(n * 0.082 * Tk, 3));   // se sustituye primero y se despeja después, como en la lección
  if (k === 0) { const V = R.pick([5, 10, 20, 22.4, 50]), r = rd(n * 0.082 * Tk / V); return num(T.gi_q[0](H.raw.dec(n), Tk, H.dec(V)), r, T.gi_s[0](H.raw.dec(n), Tk, H.dec(V), nrt, H.dec(r))); }
  if (k === 1) { const P = R.pick([1, 2, 3, 5]), r = rd(n * 0.082 * Tk / P); return num(T.gi_q[1](H.raw.dec(n), Tk, P), r, T.gi_s[1](H.raw.dec(n), Tk, P, nrt, H.dec(r))); }
  if (k === 2) { const r = rd(n * 22.4); return num(T.gi_q[2](H.raw.dec(n)), r, T.gi_s[2](H.raw.dec(n), H.dec(r))); }
  const P = R.pick([1, 2, 3]), V = R.pick([10, 20, 40, 50]), r = rd(P * V / (0.082 * Tk), 3);
  return num(T.gi_q[3](P, V, Tk), r, T.gi_s[3](P, V, Tk, P * V, H.dec(rd(0.082 * Tk, 3)), H.dec(r)), Math.max(0.011, r * 0.01));
});
const EST = [["2 H2 + O2 → 2 H2O", "H2", 2, 2, "H2O", 18, 2], ["CH4 + 2 O2 → CO2 + 2 H2O", "CH4", 16, 1, "CO2", 44, 1], ["CH4 + 2 O2 → CO2 + 2 H2O", "CH4", 16, 1, "O2", 32, 2],
  ["CaCO3 → CaO + CO2", "CaCO3", 100, 1, "CO2", 44, 1], ["CaCO3 → CaO + CO2", "CaCO3", 100, 1, "CaO", 56, 1], ["N2 + 3 H2 → 2 NH3", "N2", 28, 1, "NH3", 17, 2], ["N2 + 3 H2 → 2 NH3", "H2", 2, 3, "NH3", 17, 2],
  ["Zn + 2 HCl → ZnCl2 + H2", "Zn", 65.4, 1, "H2", 2, 1], ["2 Mg + O2 → 2 MgO", "Mg", 24, 2, "MgO", 40, 2], ["C3H8 + 5 O2 → 3 CO2 + 4 H2O", "C3H8", 44, 1, "CO2", 44, 3]];
const isProd = (eq, X) => eq.split("→")[1].split("+").map(s => s.trim().replace(/^\d+\s*/, "")).includes(X);   // ¿X es producto?
// limitante: [ecuación, R1, M1, c1, R2, M2, c2, producto, M, c]
const LIM = [["2 H2 + O2 → 2 H2O", "H2", 2, 2, "O2", 32, 1, "H2O", 18, 2], ["N2 + 3 H2 → 2 NH3", "N2", 28, 1, "H2", 2, 3, "NH3", 17, 2],
  ["CH4 + 2 O2 → CO2 + 2 H2O", "CH4", 16, 1, "O2", 32, 2, "CO2", 44, 1], ["2 Mg + O2 → 2 MgO", "Mg", 24, 2, "O2", 32, 1, "MgO", 40, 2],
  ["C3H8 + 5 O2 → 3 CO2 + 4 H2O", "C3H8", 44, 1, "O2", 32, 5, "CO2", 44, 3], ["Zn + 2 HCl → ZnCl2 + H2", "Zn", 65.4, 1, "HCl", 36.5, 2, "H2", 2, 1]];
// con una disolución de HCl: [ecuación, sólido, M, coeficiente del HCl]
const DIS = [["Zn + 2 HCl → ZnCl2 + H2", "Zn", 65.4, 2], ["Mg + 2 HCl → MgCl2 + H2", "Mg", 24, 2], ["CaCO3 + 2 HCl → CaCl2 + CO2 + H2O", "CaCO3", 100, 2], ["NaOH + HCl → NaCl + H2O", "NaOH", 40, 1]];
// rendimiento: [ecuación, reactivo, M, coef., producto, M, coef.]
const REND = [["CaCO3 → CaO + CO2", "CaCO3", 100, 1, "CaO", 56, 1], ["N2 + 3 H2 → 2 NH3", "N2", 28, 1, "NH3", 17, 2], ["2 Mg + O2 → 2 MgO", "Mg", 24, 2, "MgO", 40, 2], ["2 H2 + O2 → 2 H2O", "H2", 2, 2, "H2O", 18, 2]];
def("fq10.esteq", (R, S, H) => {
  const T = S.fq10, k = R.r(), d = H.dec;
  if (k < 0.35 || k >= 0.92) {   // masa → masa (o volumen de un gas en condiciones normales), con la proporción como factor de conversión
    const gasT = k >= 0.92 || R.r() < 0.3;
    const pool = gasT ? EST.filter(e => ["CO2", "H2", "O2", "NH3"].includes(e[4])) : EST;
    const [eq, A, MA, ca, Bn, MB, cb] = R.pick(pool), nA = R.pick([0.5, 1, 2, 3, 5, 10]), mA = rdD(nA * MA), nB = rd(nA * cb / ca, 3), prod = isProd(eq, Bn);
    if (gasT) { const r = rd(nB * 22.4); return num(T.es_qv(eqH(eq), d(mA), sub(A), sub(Bn), prod), r, T.es_sv(d(mA), d(MA), d(nA), ca, cb, d(nB), d(r), sub(A), sub(Bn))); }
    const r = rd(nB * MB); return num(T.es_q(eqH(eq), d(mA), sub(A), sub(Bn), prod), r, T.es_s(d(mA), d(MA), d(nA), ca, cb, d(nB), d(MB), d(r), sub(A), sub(Bn)));
  }
  if (k < 0.65) {   // reactivo limitante: cuál es o cuánto producto se forma (Ejemplo 3)
    const [eq, A, MA, ca, Bn, MB, cb, P, MP, cp] = R.pick(LIM); let nA, nB;
    do { nA = R.pick([0.5, 1, 2, 3, 4, 5, 6]); nB = R.pick([0.5, 1, 2, 3, 4, 5, 6, 9, 10]); } while (Math.abs(nA / ca - nB / cb) < 1e-9 || Math.max(nA / ca, nB / cb) / Math.min(nA / ca, nB / cb) > 6);
    const qA = rd(nA / ca, 3), qB = rd(nB / cb, 3), limA = nA / ca < nB / cb, [L, nL, cL] = limA ? [A, nA, ca] : [Bn, nB, cb], nP = rd(nL * cp / cL, 3), r = rd(nP * MP);
    const st = T.es_sl(d(rdD(nA * MA)), d(MA), d(nA), d(rdD(nB * MB)), d(MB), d(nB), ca, cb, d(qA), d(qB), sub(A), sub(Bn), sub(L));
    if (R.r() < 0.4) return { q: T.es_ql(eqH(eq), d(rdD(nA * MA)), sub(A), d(rdD(nB * MB)), sub(Bn)), kind: "choice", opts: [sub(A), sub(Bn), T.es_o3], correct: limA ? 0 : 1, shuffle: false, sol: st };
    return num(T.es_qp(eqH(eq), d(rdD(nA * MA)), sub(A), d(rdD(nB * MB)), sub(Bn), sub(P)), r, st + " " + T.es_sp(d(nL), cL, cp, d(nP), d(MP), d(r), sub(L), sub(P)));
  }
  if (k < 0.8) {   // con una disolución (Ejemplo 2): volumen de HCl
    const [eq, A, MA, ch] = R.pick(DIS), nA = R.pick([0.05, 0.1, 0.2, 0.25, 0.5]), c = R.pick([0.5, 1, 2]), nH = rd(nA * ch, 3), V = rd(nH / c, 4), mL = rd(V * 1000, 1);
    return num(T.es_qd(eqH(eq), d(rdD(nA * MA, 2)), sub(A), d(c)), mL, T.es_sd(d(rdD(nA * MA, 2)), d(MA), d(nA), ch, d(nH), d(c), d(V), d(mL), sub(A)));
  }
  // rendimiento (Ejemplo 4)
  const [eq, A, MA, ca, P, MP, cp] = R.pick(REND), nA = R.pick([0.5, 1, 2, 5, 10]), mA = rdD(nA * MA), nP = rd(nA * cp / ca, 3), teo = rd(nP * MP), y = R.pick([60, 65, 70, 75, 80, 85, 90, 95]), obt = rdD(teo * y / 100, 2);
  return num(T.es_qr(eqH(eq), d(mA), sub(A), d(obt), sub(P)), y, T.es_sr(d(mA), d(MA), d(nA), ca, cp, d(nP), d(MP), d(teo), d(obt), d(y), sub(A), sub(P)), 0.6);
});
// combustibles: [nombre, fórmula, M (g/mol), ΔH (kJ/mol), moles de CO₂ por mol]
const FUEL = [["metano", "CH4", 16, 890, 1], ["propano", "C3H8", 44, 2220, 3], ["butano", "C4H10", 58, 2878, 4], ["etanol", "C2H5OH", 46, 1367, 2], ["hidrógeno", "H2", 2, 286, 0]];
def("fq10.energiareac", (R, S, H) => {
  const T = S.fq10, k = R.r(), d = H.dec;
  if (k < 0.2) { const e = R.r() < 0.5 ? 0 : 1, dh = (e === 0 ? -1 : 1) * R.pick([92, 286, 393, 178, 52, 44, 890, 180]); const s = d(dh);
    return { q: T.er_q[0](s), kind: "choice", opts: T.er_o, correct: e, shuffle: false, sol: T.er_s[0](s, e) }; }
  if (k < 0.5) {   // diagrama de energía: los reactivos no siempre a 0; Ea directa, Ea inversa o ΔH (Ejemplo 2)
    let r0, mx, p; do { r0 = R.pick([0, 20, 50, 100, -40]); mx = r0 + R.pick([40, 60, 80, 120, 150, 200]); p = r0 + R.pick([-120, -100, -60, -30, 20, 30, 40]); } while (p >= mx - 10);
    const w = R.int(0, 2), ans = [mx - r0, mx - p, p - r0][w];
    return { q: T.er_q[1](d(r0), mx, d(p), w), kind: "int", ans, sol: T.er_s[1](d(r0), mx, d(p), w, d(ans)) };
  }
  if (k < 0.75) {   // calor de una cantidad de combustible, en gramos (Ejemplo 1)
    const [nm, f, M, dh] = R.pick(FUEL), n = R.pick([0.25, 0.5, 1, 2, 3, 5, 10]), m = rd(n * M, 2), r = rd(n * dh);
    return num(T.er_q[2](nm, sub(f), d(m), M, d(dh)), r, T.er_s[2](d(m), M, d(n), d(dh), d(r)));
  }
  // velocidad media (Ejemplo 3)
  const c1 = R.pick([0.5, 0.8, 1, 1.2, 2]), c2 = rd(c1 * R.pick([0.2, 0.4, 0.5, 0.6, 0.75]), 3), dt = R.pick([10, 20, 25, 40, 50, 100]), r = rd((c1 - c2) / dt, 5);
  return num(T.er_q[3](d(c1), d(c2), dt), r, T.er_s[3](d(c1), d(c2), dt, d(rd(c2 - c1, 3)), d(r)), Math.max(0.00005, r * 0.01));
});
def("fq10.ph", (R, S, H) => {
  const T = S.fq10, k = R.r(), d = H.dec;
  if (k < 0.15) { const e = R.int(1, 13); return { q: T.ph_q[0](e), kind: "int", ans: e, sol: T.ph_s[0](e) }; }
  if (k < 0.27) { const a = R.int(1, 5), b = a + R.int(1, 4), r = 10 ** (b - a); return { q: T.ph_q[1](a, b), kind: "int", ans: r, sol: T.ph_s[1](a, b, H.n(r)) }; }
  if (k < 0.39) { const p = R.pick([1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13]), c = p < 7 ? 0 : p === 7 ? 1 : 2;
    return { q: T.ph_q[2](p), kind: "choice", opts: T.ph_o, correct: c, shuffle: false, sol: T.ph_s[2](p, c) }; }
  if (k < 0.57) {   // pH de un ácido fuerte con su concentración en decimal (Ejemplo 1)
    const e = R.int(1, 5), ac = R.pick(["HCl", "HNO₃"]), c = d(10 ** -e, 6);
    return { q: T.ph_q[3](ac, c), kind: "int", ans: e, sol: T.ph_s[3](ac, c, e) };
  }
  // neutralización con volúmenes (Ejemplos 2 y 3): volumen de base o concentración del ácido; HCl (1 : 1) o H₂SO₄ (1 : 2)
  let ac, ca, Va, cb, na, nb, Vb;
  do { ac = R.pick([["HCl", 1], ["HCl", 1], ["H₂SO₄", 2]]); ca = R.pick([0.05, 0.1, 0.2, 0.5, 1]); Va = R.pick([10, 20, 25, 50]); cb = R.pick([0.1, 0.2, 0.5, 1]);
    na = rd(ca * Va / 1000, 5); nb = rd(na * ac[1], 5); Vb = rd(nb / cb * 1000, 2); } while (Vb > 150 || Vb < 5);
  if (k < 0.8) return num(T.ph_q[4](d(cb), Va, ac[0], d(ca)), Vb, T.ph_s[4](d(ca), d(Va / 1000), d(na), ac[0], ac[1], d(nb), d(cb), d(rd(Vb / 1000, 5)), d(Vb)));
  return num(T.ph_q[5](Va, ac[0], d(Vb), d(cb)), ca, T.ph_s[5](d(cb), d(rd(Vb / 1000, 5)), d(nb), ac[0], ac[1], d(na), d(Va / 1000), d(ca)), Math.max(0.0011, ca * 0.01));
});

/* ── U5 · Cinemática ── */
def("fq10.encuentro", (R, S, H) => {
  const T = S.fq10, d = H.dec;
  // dos casillas, como los ejemplos: cuándo y dónde
  if (R.r() < 0.5) { const v1 = R.pick([40, 50, 60, 70, 80, 90]), v2 = R.pick([50, 60, 70, 80, 100, 120]), t = R.pick([1, 1.5, 2, 2.5, 3]), D = (v1 + v2) * t, x = v1 * t;
    return { q: T.en_q[0](D, v1, v2), kind: "fields", fields: [{ label: T.en_f[0], kind: "num", ans: t, tol: 0.011 }, { label: T.en_f[1], kind: "num", ans: x, tol: Math.max(0.11, x * 0.01) }], sol: T.en_s[0](D, v1, v2, v1 + v2, d(t), d(x)) }; }
  // alcance, como el Ejemplo 4: una ciclista y una moto; el reloj se pone en marcha cuando sale la ciclista
  const v1 = R.pick([15, 20, 25]), v2 = R.pick([40, 50, 60]), h = R.pick([0.5, 1, 1.5]), tc = v2 * h / (v2 - v1), r = rd(tc - h), x = rd(v1 * tc, 2);
  return { q: T.en_q[1](d(h), v1, v2), kind: "fields", fields: [{ label: T.en_f[0], kind: "num", ans: r, tol: 0.011 }, { label: T.en_f[1], kind: "num", ans: x, tol: Math.max(0.11, x * 0.01) }],
    sol: T.en_s[1](d(h), v1, v2, d(rd(v2 * h, 2)), d(v1 - v2), d(rd(tc)), d(r), d(x)) };
});
// Velocidad media frente a rapidez media (desplazamiento y distancia), MRU y pendiente de la gráfica posición–tiempo
def("fq10.desplaz", (R, S, H) => {
  const T = S.fq10, d = H.dec, k = R.r();
  if (k < 0.4) {   // dos tramos perpendiculares: Pitágoras de la unidad 1
    let a, b, c, t, s; do { [a, b] = R.pick([[300, 400], [600, 800], [500, 1200], [900, 1200], [800, 600], [240, 320], [120, 160], [1500, 2000], [400, 300], [1200, 500]]);
      c = Math.hypot(a, b); t = R.pick([100, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500]); s = (a + b) / t; } while (s < 0.8 || s > 2.5);
    const [d1, d2] = R.pick([["este", "norte"], ["norte", "oeste"], ["oeste", "sur"], ["sur", "este"]]), rs = rd(s), rv = rd(c / t);
    return { q: T.dz_q[0](a, d1, b, d2, t), kind: "fields", fields: [{ label: T.dz_f[0], kind: "num", ans: rs, tol: 0.011 }, { label: T.dz_f[1], kind: "num", ans: rv, tol: 0.011 }], sol: T.dz_s[0](a, b, a + b, t, d(rs), c, d(rv)) };
  }
  if (k < 0.55) {   // ida y vuelta: la velocidad media es cero
    const D = R.pick([200, 300, 450, 600, 750, 900]), t = R.pick([300, 400, 500, 600, 800, 900]), rs = rd(2 * D / t);
    return { q: T.dz_q[1](D, t), kind: "fields", fields: [{ label: T.dz_f[0], kind: "num", ans: rs, tol: 0.011 }, { label: T.dz_f[1], kind: "num", ans: 0, tol: 0.011 }], sol: T.dz_s[1](D, 2 * D, t, d(rs)) };
  }
  if (k < 0.8) {   // MRU con signo
    const x0 = R.pick([-200, -50, 0, 100, 200, 500, 1000]), v = R.pick([-15, -8, -5, -3, 2, 4, 5, 10, 20]), t = R.pick([10, 20, 30, 40, 60, 100]), x = x0 + v * t;
    return num(T.dz_q[2](d(x0), d(v), t), x, T.dz_s[2](d(x0), d(v), t, d(v * t), d(x)), 0.011);
  }
  const t1 = R.pick([0, 2, 5, 10]), dt = R.pick([4, 5, 8, 10, 20]), v = R.pick([-6, -4, -3, -2, -1.5, 1.5, 2, 3, 5, 8]), x1 = R.pick([0, 10, 20, 50, 100]), x2 = rd(x1 + v * dt, 2);
  return num(T.dz_q[3](x1, d(x2), t1, t1 + dt), v, T.dz_s[3](d(x1), d(x2), t1, t1 + dt, d(rd(x2 - x1, 2)), dt, d(v)), 0.011);
});
def("fq10.vertical", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 3);
  // mismo método que la lección: eje hacia arriba, v = v₀ − 9,8 t, y = y₀ + v₀ t − 4,9 t², v² − v₀² = 2 a Δy
  if (k === 0) { const v = R.pick([5, 9.8, 10, 14.7, 15, 19.6, 20, 25, 30]), t = rd(v / 9.8), r = rd(v * v / 19.6); return num(T.vt_q[0](H.dec(v)), r, T.vt_s[0](H.dec(v), H.dec(t), H.dec(r), Math.abs(v / 9.8 - t) < 1e-9)); }
  if (k === 1) { const v = R.pick([9.8, 14.7, 19.6, 24.5, 29.4, 10, 20, 30]), r = rd(v / 9.8); return num(T.vt_q[1](H.dec(v)), r, T.vt_s[1](H.dec(v), H.dec(r))); }
  if (k === 2) { const h = R.pick([4.9, 19.6, 20, 44.1, 45, 80, 100]), t2 = rd(h / 4.9), r = rd(Math.sqrt(h / 4.9)); return num(T.vt_q[2](H.dec(h)), r, T.vt_s[2](H.dec(h), H.dec(t2), H.dec(r))); }
  const h = R.pick([1, 2, 5, 10, 20, 30]), v2 = rd(19.6 * h), r = rd(Math.sqrt(19.6 * h)); return num(T.vt_q[3](h), r, T.vt_s[3](h, H.dec(v2), H.dec(r)));
});
def("fq10.mcu", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 4);
  if (k === 0) { const t = R.pick([2, 4, 5, 10, 20, 60]), r = rd(2 * Math.PI / t, 3); return num(T.mc_q[0](t), r, T.mc_s[0](t, H.dec(r))); }
  if (k === 1) { const w = R.pick([2, 5, 10, 20, 30]), Rr = R.pick([0.2, 0.3, 0.35, 0.5, 1.5]), r = rd(w * Rr); return num(T.mc_q[1](w, H.dec(Rr)), r, T.mc_s[1](w, H.dec(Rr), H.dec(r))); }
  if (k === 2) { const rpm = R.pick([30, 33, 45, 60, 120, 300, 600, 1200]), r = rd(rpm * 2 * Math.PI / 60); return num(T.mc_q[2](rpm), r, T.mc_s[2](rpm, H.dec(rd(rpm / 60)), H.dec(r))); }
  if (k === 3) { let v, Rr; do { v = R.pick([10, 15, 20, 25, 30]); Rr = R.pick([25, 50, 80, 100, 200]); } while (v * v / Rr > 6.5);   // curvas que un coche puede tomar (la lección: 8 m/s² ya es demasiado)
    const r = rd(v * v / Rr); return num(T.mc_q[3](v, Rr), r, T.mc_s[3](v, Rr, H.dec(r))); }
  const f = R.pick([2, 4, 5, 10, 20, 25, 50]), r = rd(1 / f, 3); return num(T.mc_q[4](f), r, T.mc_s[4](f, H.dec(r)), 0.002);
});

/* ── U6 · Dinámica ── */
def("fq10.resultante", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 5), a = R.pick([3, 5, 6, 8, 10, 12, 20, 30]), b = R.pick([4, 5, 8, 12, 15, 16, 40]);
  if (k === 4) {   // ley de Hooke, con el alargamiento en cm (Ejemplo 1)
    const K = R.pick([50, 100, 200, 250, 400, 500, 1000]), cm = R.pick([2, 4, 5, 8, 10, 12, 15, 20]), F = rd(K * cm / 100), w = R.int(0, 2);
    if (w === 0) return num(T.re_q[4](K, cm), F, T.re_s[4](K, cm, H.dec(cm / 100), H.dec(F)));
    if (w === 1) return num(T.re_q[5](K, H.dec(F)), cm, T.re_s[5](K, H.dec(F), H.dec(cm / 100), cm));
    return num(T.re_q[6](H.dec(F), cm), K, T.re_s[6](H.dec(F), cm, H.dec(cm / 100), K));
  }
  if (k === 5) {   // equilibrio simétrico (Ejemplo 4): 2 T sen α = P
    const [al, s] = R.pick([[30, 0.5], [45, 0.707], [60, 0.866], [10, 0.174], [20, 0.342]]), P = R.pick([50, 80, 100, 120, 150, 200, 300]), t = rd(P / (2 * s), 1);
    return num(T.re_q[7](P, al, H.dec(s)), t, T.re_s[7](P, al, H.dec(s), H.dec(rd(2 * s, 3)), H.dec(t)));
  }
  if (k === 0) return num(T.re_q[0](a, b), a + b, T.re_s[0](a, b, a + b));
  if (k === 1) return num(T.re_q[1](a, b), Math.abs(a - b), T.re_s[1](a, b, Math.abs(a - b)));
  if (k === 2) { const r = rd(Math.hypot(a, b)); return num(T.re_q[2](a, b), r, T.re_s[2](a, b, H.dec(r))); }
  const rx = rd(a + b * 0.5), ry = rd(b * 0.866), r = rd(Math.hypot(rx, ry)); return num(T.re_q[3](a, b), r, T.re_s[3](a, b, H.dec(rx), H.dec(ry), H.dec(r)));
});
// Leyes de Newton con lo de 4.º: fuerzas en dos ejes (suma vectorial), frenazos con el cinturón, cohetes, acción y reacción, peso en otro astro
def("fq10.newton", (R, S, H) => {
  const T = S.fq10, d = H.dec, k = R.r();
  if (k < 0.3) {   // dos fuerzas perpendiculares: resultante (unidad 1) y aceleración en su dirección
    let f1, f2, m; do { [f1, f2] = R.pick([[30, 40], [60, 80], [6, 8], [50, 120], [90, 120], [120, 160], [15, 20], [80, 150]]); m = R.pick([2, 4, 5, 10, 20, 25, 40]); } while (Math.hypot(f1, f2) / m > 6 || Math.hypot(f1, f2) / m < 0.5);   // trineos que se pueden arrastrar
    const F = Math.hypot(f1, f2), a = rd(F / m);
    return { q: T.nw_q[0](m, f1, f2), kind: "fields", fields: [{ label: T.nw_f[0], ans: F }, { label: T.nw_f[1], kind: "num", ans: a, tol: Math.max(0.011, a * 0.01) }], sol: T.nw_s[0](f1, f2, F, m, d(a)) };
  }
  if (k < 0.5) {   // frenazo: la fuerza del cinturón (Ejemplo 1)
    const v = R.pick([36, 50, 54, 72, 90]), t = R.pick([0.1, 0.15, 0.2, 0.5]), m = R.pick([45, 50, 60, 70, 80]), vs = rd(v / 3.6), a = rd(vs / t, 1), F = apunta(m * v / 3.6 / t, rd(m * a), m * v / 3.6 / t, 3), n = rd(F / (m * 9.8), 1);   // F, con a redondeada: «≈»
    return num(T.nw_q[1](v, d(t), m), F, T.nw_s[1](v, d(vs), d(t), d(a), m, d(F), d(n)), Math.max(1, F * 0.01));
  }
  if (k < 0.7) {   // cohete que despega: empuje − peso
    const [nm, m] = R.pick([["Un cohete de agua", 2], ["Una maqueta de cohete", 5], ["Un cohete pequeño", 1000], ["Un cohete", 50000]]), a = R.pick([2, 5, 10, 15]), E = rd(m * (9.8 + a)), P = rd(m * 9.8);
    return num(T.nw_q[2](nm, d(m), d(E)), a, T.nw_s[2](d(m), d(E), d(P), d(rd(E - P)), d(a)), 0.011);
  }
  if (k < 0.85) {   // acción y reacción (Ejemplo 5)
    const [ma, mb] = R.pick([[75, 50], [60, 40], [80, 60], [50, 25], [90, 45], [70, 35]]), F = R.pick([60, 90, 120, 150, 180]), aa = rd(F / ma), ab = rd(F / mb);
    return { q: T.nw_q[3](ma, mb, F), kind: "fields", fields: [{ label: T.nw_f[2], kind: "num", ans: aa, tol: 0.011 }, { label: T.nw_f[3], kind: "num", ans: ab, tol: 0.011 }], sol: T.nw_s[3](ma, mb, F, d(aa), d(ab)) };
  }
  // masa y peso en otro astro
  const [as, ga] = R.pick([["la Luna", 1.62], ["Marte", 3.7], ["Júpiter", 24.8], ["Venus", 8.9]]), m = R.pick([20, 50, 120, 180, 900, 1025]), P = rd(m * 9.8), r = rd(m * ga, 1);
  return num(T.nw_q[4](d(P), as, d(ga)), r, T.nw_s[4](d(P), m, as, d(ga), d(r)), Math.max(0.11, r * 0.01));
});
def("fq10.dinamica", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 6), d = H.dec;
  if (k === 0) { const m = R.pick([5, 10, 20, 25, 50]), mu = R.pick([0.1, 0.2, 0.3, 0.4]), fr = rd(mu * m * 9.8), a = R.int(1, 4), F = rd(fr + m * a + R.int(0, 9));
    const r = rd((F - fr) / m); return num(T.di_q[0](m, d(F), d(mu)), r, T.di_s[0](m, d(F), d(mu), d(fr), d(r))); }
  if (k === 1) { const a = R.pick([10, 20, 30, 37, 45, 53, 60]), r = rd(9.8 * Math.sin(rad(a))); return num(T.di_q[1](a), r, T.di_s[1](a, d(r))); }
  if (k === 2) {   // Atwood: una ecuación por cuerpo y se suman (como el Ejemplo 3)
    const m2 = R.int(1, 5), m1 = m2 + R.int(1, 4), r = rd((m1 - m2) * 9.8 / (m1 + m2));
    return num(T.di_q[2](m1, m2), r, T.di_s[2](m1, m2, d(rd(m1 * 9.8)), d(rd(m2 * 9.8)), d(rd((m1 - m2) * 9.8)), m1 + m2, d(r))); }
  if (k === 3) { const m = R.pick([50, 60, 70, 80]), a = R.pick([1, 1.5, 2, 2.5]), r = rd(m * (9.8 + a)); return num(T.di_q[3](m, d(a)), r, T.di_s[3](m, d(a), d(rd(m * 9.8)), d(rd(m * a)), d(r))); }
  if (k === 4) { const m = R.pick([10, 20, 30, 50]), mu = R.pick([0.1, 0.2, 0.25, 0.3, 0.5]), r = rd(mu * m * 9.8); return num(T.di_q[4](m, d(mu)), r, T.di_s[4](m, d(mu), d(r))); }
  if (k === 5) {   // plano inclinado con rozamiento (Ejemplo 2), con sen y cos en el enunciado
    let m, al, s, c, mu; do { m = R.pick([2, 5, 10, 20]); [al, s, c] = R.pick([[30, 0.5, 0.866], [37, 0.6, 0.8], [45, 0.707, 0.707]]); mu = R.pick([0.1, 0.2, 0.3, 0.4, 0.5]); } while (mu >= s / c - 0.05);
    const P = rd(m * 9.8, 2), Pp = rd(P * s, 2), N = rd(P * c, 2), Fr = rd(mu * N, 2), r = rd((Pp - Fr) / m);
    return num(T.di_q[5](m, al, d(mu), d(s), d(c)), r, T.di_s[5](m, d(P), al, d(s), d(Pp), d(c), d(N), d(mu), d(Fr), d(rd(Pp - Fr, 2)), d(r)));
  }
  // curva plana: rozamiento mínimo (Ejemplo 4)
  let m, v, Rr; do { m = R.pick([800, 1000, 1200, 1500]); v = R.pick([10, 14, 15, 20, 25]); Rr = R.pick([30, 50, 80, 100, 150, 200]); } while (v * v / Rr > 8 || v * v / Rr < 1);
  const Fc = rd(m * v * v / Rr), mg = rd(m * 9.8), r = rd(Fc / mg);
  return num(T.di_q[6](m, Rr, v), r, T.di_s[6](m, v, Rr, d(Fc), d(mg), d(r)), 0.011);
});
def("fq10.gravedad", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 4);
  if (k === 0) { const n = R.int(1, 4), r = rd(9.8 / (n + 1) ** 2, 3); return num(T.gv_q[0](n), r, T.gv_s[0](n, H.dec(r))); }
  if (k === 3) {   // tercera ley de Kepler, T² = r³ (Ejemplo 1)
    const [nm, r] = R.pick([["Mercurio", 0.39], ["Venus", 0.72], ["Marte", 1.52], ["Ceres", 2.77], ["Júpiter", 5.2], ["Saturno", 9.58], ["Un asteroide", 2.5], ["Un asteroide", 3.2]]), r3 = rd(r ** 3, 2), t = rd(Math.sqrt(r3), 2);
    return num(T.gv_q[3](nm, H.dec(r)), t, T.gv_s[3](H.dec(r), H.dec(r3), H.dec(t), cierra(H, rd(t * 365, 0))), Math.max(0.011, t * 0.01));
  }
  if (k === 4) { const r = R.pick([4, 9, 16, 25]), t = r ** 1.5; return num(T.gv_q[4](t), r, T.gv_s[4](t, H.n(t * t), r), 0.011); }
  // planetas posibles: densidad entre 0,15 y 1,3 veces la de la Tierra (la Tierra es el planeta más denso del Sistema Solar)
  if (k === 1) { let a, b; do { a = R.pick([0.1, 0.5, 2, 3, 4, 8, 10, 15]); b = R.pick([0.5, 0.8, 1.5, 2, 3]); } while (a / b ** 3 < 0.15 || a / b ** 3 > 1.3);
    const r = rd(9.8 * a / (b * b)); return num(T.gv_q[1](H.dec(a), H.dec(b)), r, T.gv_s[1](H.dec(a), H.dec(b), H.dec(rd(b * b)), H.dec(r))); }
  // fuerza entre dos objetos cotidianos, en nanonewtons (1 nN = 10⁻⁹ N)
  const m1 = R.pick([50, 100, 200, 500]), m2 = R.pick([50, 100, 1000]), d = R.pick([1, 2, 5]), p = m1 * m2 / (d * d), f = rd(6.67 * p, 2), r = rd(6.67e-11 * p * 1e9);
  return num(T.gv_q[2](m1, m2, d), r, T.gv_s[2](m1, m2, d, H.dec(p), H.dec(f), H.dec(r)));
});

/* ── U7 · Fluidos ── */
def("fq10.presion", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 3);
  if (k === 0) { const F = R.pick([20, 50, 100, 600, 800, 2000]), Sm = R.pick([0.01, 0.02, 0.05, 0.1, 0.5, 2]), r = rd(F / Sm); return num(T.pr_q[0](F, H.dec(Sm)), r, T.pr_s[0](F, H.dec(Sm), H.dec(r))); }
  if (k === 1) { const F = R.pick([10000, 20000, 40000, 60000]), P = R.pick([5000, 10000, 20000]), r = rd(F / P); return num(T.pr_q[1](H.n(F), H.n(P)), r, T.pr_s[1](H.n(F), H.n(P), H.dec(r))); }
  if (k === 2) { const F = R.pick([500, 600, 700]), cm = R.pick([1, 2, 4, 5]), m2 = cm / 10000, r = F / m2; return num(T.pr_q[2](F, cm), r, T.pr_s[2](F, H.dec(m2), H.n(r))); }
  const atm = R.pick([0.5, 1.5, 2, 3, 10]), r = rd(atm * 101300); return num(T.pr_q[3](H.dec(atm)), r, T.pr_s[3](H.dec(atm), H.dec(r)));   // en ESO, 1 atm ≈ 101 300 Pa (NORMAS.md)
});
def("fq10.hidro", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 4);
  // profundidades posibles para cada líquido (nada de depósitos de mercurio de 50 m)
  if (k === 0) { const [liq, rho, hs] = R.pick([["agua dulce", 1000, [0.5, 1, 2, 5, 10, 20, 50]], ["agua de mar", 1030, [1, 2, 5, 10, 20, 50]], ["aceite", 900, [0.5, 1, 2, 5]], ["mercurio", 13600, [0.1, 0.2, 0.5, 0.76]]]), h = R.pick(hs), r = rd(rho * 9.8 * h);
    return num(T.hi_q[0](liq, H.n(rho), H.dec(h)), r, T.hi_s[0](H.n(rho), H.dec(h), H.dec(r))); }
  if (k === 3) {   // presión total de un buceador (atmosférica + agua)
    const h = R.pick([2, 5, 10, 15, 20, 30, 40]), pa = rd(1030 * 9.8 * h), r = 101300 + pa; return num(T.hi_q[3](h), r, T.hi_s[3](h, H.n(pa), H.n(r)));
  }
  const s1 = R.pick([2, 5, 10, 20]), n = R.pick([10, 20, 50, 100]), s2 = s1 * n;
  if (k === 1) { const F = R.pick([20, 50, 100, 150]); return num(T.hi_q[1](s1, s2, F), F * n, T.hi_s[1](s1, s2, n, F, H.n(F * n))); }
  if (k === 2) { const F = R.pick([5000, 10000, 15000, 20000]), r = rd(F / n); return num(T.hi_q[2](s1, s2, H.n(F)), r, T.hi_s[2](s1, s2, n, H.n(F), H.dec(r))); }
  const dd = R.pick([20, 30, 40, 50, 60, 100]), V = s1 * dd, r = rd(V / s2, 3);   // recorrido de los émbolos (Ejemplo 3)
  return num(T.hi_q[4](s1, s2, dd), r, T.hi_s[4](s1, dd, V, s2, H.dec(r)), Math.max(0.002, r * 0.01));
});
// volúmenes como los ve el alumno (cm³, L) y su paso a m³; materiales reales para el peso aparente y la densidad con dinamómetro
const VOL = [[100, "cm³", 1e-6], [250, "cm³", 1e-6], [500, "cm³", 1e-6], [800, "cm³", 1e-6], [1, "L", 1e-3], [2, "L", 1e-3], [5, "L", 1e-3], [0.05, "m³", 1], [0.1, "m³", 1]];
const MAT = [["aluminio", 2700], ["hierro", 7800], ["cobre", 8900], ["plomo", 11300], ["oro", 19300], ["vidrio", 2500], ["plata", 10500]];
def("fq10.empuje", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 4), d = H.dec;
  if (k === 0) { const [liq, rho] = R.pick([["agua", 1000], ["agua de mar", 1030], ["aceite", 900], ["alcohol", 800]]), [v, u, f] = R.pick(VOL), V = rd(v * f, 7), r = rd(rho * 9.8 * V, 3);
    return num(T.em_q[0](d(v), u, liq, rho), r, T.em_s[0](rho, T.em_v(d(v), u, d(V)), d(V), d(r))); }
  if (k === 1) { const [v, u, f] = R.pick(VOL.slice(0, 7)), V = rd(v * f, 7), [, rc] = R.pick(MAT.slice(0, 6)), P = rdD(rc * 9.8 * V, 2), E = rd(1000 * 9.8 * V, 3), r = rd(P - E, 2);
    return num(T.em_q[1](d(P), d(v), u), r, T.em_s[1](d(P), T.em_v(d(v), u, d(V)), d(V), d(E), d(r))); }
  if (k === 2) { const [rc, rl] = R.pick([[917, 1030], [917, 1000], [600, 1000], [800, 1000], [500, 1000], [700, 900], [250, 1000]]), r = rd(rc / rl * 100, 1); return num(T.em_q[2](rc, rl), r, T.em_s[2](rc, rl, d(r)), 0.2); }
  if (k === 3) { const [liq, rl] = R.pick([["agua", 1000], ["aceite", 900], ["agua de mar", 1030]]), rc = R.pick([250, 500, 700, 850, 950, 1100, 2700, 7800, 11300].filter(x => x !== rl)), c = rc > rl ? 0 : 1;
    return { q: T.em_q[3](rc, liq), kind: "choice", opts: T.em_o, correct: c, shuffle: false, sol: T.em_s[3](rc, rl, T.em_o[c]) }; }
  // densidad con dos lecturas del dinamómetro (Ejemplo 4 y la corona de Hierón)
  const [nm, rc] = R.pick(MAT), [v, , f] = R.pick(VOL.slice(0, 5)), V = v * f, P1 = rdD(rc * 9.8 * V, 2), P2 = rdD(P1 - 1000 * 9.8 * V, 2), E = rd(P1 - P2, 2), q = rd(P1 / E, 2), r = rd(q * 1000, 0);
  return num(T.em_q[4](d(P1), d(P2)), r, T.em_s[4](d(P1), d(P2), d(E), d(q), H.n(r), nm), Math.max(1, r * 0.015));
});
def("fq10.atmos", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 3);
  if (k === 0) { const mm = R.pick([700, 710, 720, 730, 740, 750, 765, 770, 780]), r = rd(mm * 101300 / 760, 0), r2 = rd(13600 * 9.8 * mm / 1000, 0);
    return num(T.at_q[0](mm), r, T.at_s[0](mm, H.n(r), H.dec(mm / 1000), H.n(r2)), Math.max(1, r * 0.005)); }
  if (k === 1) { const pa = R.pick([95000, 97000, 98000, 99000, 100000, 102000, 103000]), r = rd(pa * 760 / 101300, 1); return num(T.at_q[1](H.n(pa)), r, T.at_s[1](H.n(pa), H.dec(r)), 0.6); }
  if (k === 2) { const [liq, rho] = R.pick([["agua", 1000], ["aceite", 900], ["alcohol", 800], ["agua de mar", 1030]]), r = rd(101300 / (rho * 9.8)); return num(T.at_q[2](rho, liq), r, T.at_s[2](rho, H.dec(r))); }
  // fuerza de la atmósfera sobre una superficie (Ejemplos 1 y 2)
  const [obj, a, b2] = R.pick([["una ventana", 1, 1.2], ["una ventana", 0.8, 1], ["la tapa de una mesa", 1, 0.8], ["una puerta", 0.8, 2], ["un folio", 0.21, 0.297], ["la pantalla de un móvil", 0.07, 0.15], ["una mesa de cocina", 1.2, 0.8], ["un libro abierto", 0.3, 0.2]]), Sm = rd(a * b2, 4), r = rd(101300 * Sm, 0);
  return num(T.at_q[3](obj, H.dec(a), H.dec(b2)), r, T.at_s[3](H.dec(a), H.dec(b2), H.dec(Sm), H.n(r), cierra(H, rd(r / 9.8, 0))), Math.max(1, r * 0.01));
});

/* ── U8 · Energía ── */
// aparatos de casa: [nombre, potencia (W), horas al día]
const APAR = [["Un horno", 2000, 0.75], ["Una bombilla LED", 10, 5], ["Una bombilla incandescente", 60, 5], ["Un frigorífico", 150, 24], ["Un calefactor", 1500, 3],
  ["Una televisión", 100, 4], ["Un ordenador", 200, 3], ["Una lavadora", 2000, 1], ["Un secador de pelo", 1800, 0.25], ["Un aire acondicionado", 1200, 6]];
def("fq10.trabajo", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 5), d = H.dec;
  if (k === 0) {   // fuerza inclinada (Ejemplo 1), con el coseno en el enunciado; también 90° y 180°
    const F = R.pick([10, 20, 50, 100]), dd = R.pick([2, 5, 10, 20]), [a, c] = R.pick([[0, 1], [30, 0.866], [37, 0.8], [60, 0.5], [90, 0], [180, -1]]), r = rd(F * dd * c);
    return num(T.tr_q[0](F, dd, a, d(c)), r, T.tr_s[0](F, dd, a, d(c), d(r)), Math.max(0.011, Math.abs(r) * 0.01)); }
  if (k === 1) { const m = R.pick([50, 100, 200, 400, 500]), h = R.pick([5, 10, 15, 20]), r = rd(m * 9.8 * h); return num(T.tr_q[1](m, h), r, T.tr_s[1](m, h, d(r))); }
  if (k === 2) { const t = R.pick([5, 10, 20, 30, 60]), W = t * R.pick([50, 100, 200, 500, 1000]); return num(T.tr_q[2](H.n(W), t), W / t, T.tr_s[2](H.n(W), t, H.n(W / t))); }
  // rendimientos de motor eléctrico creíbles (la lección: más del 70–90 %), no del 5 %
  if (k === 3) { let P, t, m, h, u, c, r; do { P = R.pick([1000, 1500, 2000, 5000]); t = R.pick([20, 25, 30, 40, 50, 60]); m = R.pick([100, 200, 300, 500, 1000]); h = R.pick([10, 15, 20]);
      u = rd(m * 9.8 * h); c = P * t; r = rd(u / c * 100, 1); } while (r < 50 || r > 95);
    return num(T.tr_q[3](P, m, h, t), r, T.tr_s[3](m, h, d(u), P, t, H.n(c), d(r)), 0.2); }
  if (k === 4) {   // el trabajo del rozamiento es negativo; el de la normal y el peso, nulo
    const m = R.pick([5, 10, 20, 30]), dd = R.pick([2, 4, 5, 10]), fr = R.pick([10, 15, 20, 30, 40, 60].filter(x => x <= 0.6 * m * 9.8)), w = R.int(0, 1);
    return num(T.tr_q[4](m, dd, fr, w), w ? 0 : -fr * dd, T.tr_s[4](m, dd, fr, w, d(-fr * dd)), 0.011); }
  // consumo de energía en casa (la energía en nuestro mundo)
  const [nm, P, h] = R.pick(APAR), e = rd(P / 1000 * h * 30, 2), eur = rd(e * 0.15, 2);
  return num(T.tr_q[5](nm, P, d(h)), e, T.tr_s[5](d(P / 1000), d(h), d(e), d(eur)), Math.max(0.011, e * 0.01));
});
def("fq10.conserva", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 4);
  if (k === 0) { const h = R.pick([1, 2, 5, 10, 20, 45]), r = rd(Math.sqrt(19.6 * h)); return num(T.co_q[0](h), r, T.co_s[0](h, H.dec(rd(19.6 * h)), H.dec(r))); }
  if (k === 1) { const m = R.pick([20, 25, 30, 40]), h = R.pick([3, 4, 5, 6]), vmax = Math.sqrt(19.6 * h), v = R.int(Math.ceil(vmax * 0.5), Math.floor(vmax * 0.9)), ep = rd(m * 9.8 * h), ec = rd(m * v * v / 2), r = rd(ep - ec);
    return num(T.co_q[1](m, h, v), r, T.co_s[1](H.dec(ep), H.dec(ec), H.dec(r), m, h, v)); }
  if (k === 2) { const m = R.pick([800, 1000, 1200, 1500]), v = R.pick([10, 15, 20, 25, 30]), r = -m * v * v / 2; return num(T.co_q[2](m, v), r, T.co_s[2](m, v, H.n(r))); }
  if (k === 3) { const kk = R.pick([100, 200, 400, 500]), x = R.pick([0.05, 0.1, 0.2]), m = R.pick([0.02, 0.05, 0.1, 0.5]), e = rd(kk * x * x / 2, 4), r = rd(Math.sqrt(2 * e / m));
    return num(T.co_q[3](kk, H.dec(x), H.dec(m)), r, T.co_s[3](kk, H.dec(x), H.dec(e), H.dec(m), H.dec(rd(m / 2, 4)), H.dec(rd(2 * e / m, 3)), H.dec(r))); }
  const v = R.pick([2, 3, 4, 5, 6, 7]), r = rd(v * v / 19.6); return num(T.co_q[4](v), r, T.co_s[4](v, H.dec(r)));
});
def("fq10.latente", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 5);
  if (k === 4) {   // hielo bajo cero hasta agua líquida: tres tramos, como la curva de la figura
    const m = R.pick([0.2, 0.5, 1, 2]), t1 = R.pick([5, 10, 20]), t2 = R.pick([10, 20, 30, 50]), q1 = rd(m * 2100 * t1), q2 = rd(m * 334000), q3 = rd(m * 4180 * t2), r = q1 + q2 + q3;
    return num(T.la_q[4](H.dec(m), t1, t2), r, T.la_s[4](H.dec(m), t1, t2, H.n(q1), H.n(q2), H.n(q3), H.n(r)));
  }
  if (k === 5) {   // calor que hay que quitar para congelar agua
    const m = R.pick([0.1, 0.2, 0.5, 1]), t = R.pick([10, 15, 20, 25]), q1 = rd(m * 4180 * t), q2 = rd(m * 334000), r = q1 + q2;
    return num(T.la_q[5](H.dec(m), t), r, T.la_s[5](H.dec(m), t, H.n(q1), H.n(q2), H.n(r)));
  }
  if (k === 0) { const m = R.pick([0.1, 0.2, 0.5, 1, 2, 3]), r = rd(m * 334000); return num(T.la_q[0](H.dec(m)), r, T.la_s[0](H.dec(m), H.n(r))); }
  if (k === 1) { const m = R.pick([0.1, 0.2, 0.5, 1, 2]), r = rd(m * 2260000); return num(T.la_q[1](H.dec(m)), r, T.la_s[1](H.dec(m), H.n(r))); }
  if (k === 2) { const m = R.pick([0.5, 1, 2]), t = R.pick([10, 20, 30, 50]), q1 = rd(m * 334000), q2 = rd(m * 4180 * t), r = q1 + q2; return num(T.la_q[2](H.dec(m), t), r, T.la_s[2](H.n(q1), H.n(q2), H.n(r), H.dec(m), t)); }
  const Q = R.pick([1000, 2000, 5000, 10000]), W = rd(Q * R.pick([0.2, 0.25, 0.3, 0.35, 0.4, 0.45])), r = rd(W / Q * 100, 1); return num(T.la_q[3](H.n(Q), H.n(W)), r, T.la_s[3](H.n(Q), H.n(W), H.dec(r)), 0.2);
});
def("fq10.onda", (R, S, H) => {
  const T = S.fq10, k = R.int(0, 6);
  if (k === 5) {   // eco: el sonido va y vuelve (Ejemplo 2)
    const w = R.int(0, 1), t = w ? R.pick([0.2, 0.4, 0.6, 0.8, 1, 2]) : R.pick([0.2, 0.3, 0.4, 0.5, 1, 1.5, 2]), v = w ? 1500 : 340, r = rd(v * t / 2, 1);
    return num(T.on_q[5](w, H.dec(t)), r, T.on_s[5](v, H.dec(t), H.dec(rd(v * t, 1)), H.dec(r)), Math.max(0.11, r * 0.01));
  }
  if (k === 6) { const [x, c] = R.pick(T.on_tl); return { q: T.on_q[6](x), kind: "choice", opts: T.on_o, correct: c, shuffle: false, sol: T.on_s[6](x, c) }; }
  if (k === 0) { const f = R.pick([170, 340, 440, 680, 1000, 20]), v = R.pick([340, 1500]), r = rd(v / f, 3); return num(T.on_q[0](f, v), r, T.on_s[0](v, f, H.dec(r)), Math.max(0.002, r * 0.01)); }
  if (k === 1) { const f = R.pick([88, 90, 100, 105, 150, 300, 600]), r = rd(300 / f, 3); return num(T.on_q[1](f), r, T.on_s[1](f, H.dec(r)), Math.max(0.002, r * 0.01)); }
  if (k === 2) { const t = R.int(1, 10); return num(T.on_q[2](t), 340 * t, T.on_s[2](t, H.n(340 * t))); }
  if (k === 3) { const Tp = R.pick([0.5, 0.25, 0.2, 0.1, 0.01, 2, 4]), r = rd(1 / Tp, 3); return num(T.on_q[3](H.dec(Tp)), r, T.on_s[3](H.dec(Tp), H.dec(r))); }
  const l = R.pick([2, 5, 10, 20]), f = R.pick([0.1, 0.2, 0.25, 0.5]), r = rd(l * f); return num(T.on_q[4](l, H.dec(f)), r, T.on_s[4](l, H.dec(f), H.dec(r)));
});
})();
