/* WikiAula — Química, Grado 11 (1.º de Bachillerato): problemas y bancos.
   Textos y bancos en i18n/<lang>/quim11.js (S.quim11). */
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
const uni = f => f.replace(/\d/g, c => "₀₁₂₃₄₅₆₇₈₉"[c]);
const choice = (R, q, ok, alts, sol) => { const opts = R.shuffle([ok, ...alts]); return { q, kind: "choice", opts, correct: opts.indexOf(ok), sol }; };

def("quim11.geometria", (R, S) => B.mixed(S.quim11.geometria, R));
def("quim11.sustancia", (R, S) => B.mixed(S.quim11.sustancia, R));
def("quim11.tiporeac", (R, S) => B.mixed(S.quim11.tiporeac, R));

/* ── U1 · Estructura ── */
// Familias (banco), triadas de Döbereiner y las «inversiones» de la tabla, que es lo que enseña la lección
const TRIADA = [["litio", 6.9, "sodio", 23.0, "potasio", 39.1], ["calcio", 40.1, "estroncio", 87.6, "bario", 137.3], ["azufre", 32.1, "selenio", 79.0, "teluro", 127.6]];
const INV = [["cobalto", 58.9, 27, "níquel", 58.7, 28], ["teluro", 127.6, 52, "yodo", 126.9, 53], ["torio", 232.0, 90, "protactinio", 231.0, 91], ["uranio", 238.0, 92, "neptunio", 237.0, 93]];
def("quim11.tabla", (R, S, H) => {
  const T = S.quim11, r = R.r();
  if (r < 0.4) return B.mixed(T.familia, R);
  if (r < 0.7) { const [a, ma, b, mb, c, mc] = R.pick(TRIADA), x = rd((ma + mc) / 2, 2);
    return num(T.tb_q(a, H.dec(ma), b, c, H.dec(mc)), x, T.tb_s(H.dec(ma), H.dec(mc), H.dec(x), b, H.dec(mb)), Math.max(0.2, x * 0.01)); }
  const [a, ma, za, b, mb, zb] = R.pick(INV);
  return choice(R, T.tb_q2(a, H.dec(ma), b, H.dec(mb)), T.tb_o(a)[0], T.tb_o(a).slice(1), T.tb_s2(a, za, b, zb));
});

const ORD = [[1, "s"], [2, "s"], [2, "p"], [3, "s"], [3, "p"], [4, "s"], [3, "d"], [4, "p"], [5, "s"], [4, "d"], [5, "p"]], CAP = { s: 2, p: 6, d: 10 };
const SUPN = n => String(n).split("").map(c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");
const conf = Z => { const o = []; let z = Z; for (const [n, l] of ORD) { if (z <= 0) break; const e = Math.min(CAP[l], z); o.push([n, l, e]); z -= e; } return o; };
const cstr = c => c.map(([n, l, e]) => `${n}${l}${SUPN(e)}`).join(" ");
const unp = c => { const [, l, e] = c[c.length - 1], orb = (CAP[l]) / 2; return e <= orb ? e : CAP[l] - e; };
// Distractor con los mismos electrones y el error frecuente de la lección: en los metales de transición,
// todo en el 3d sin llenar el 4s; en los demás, un electrón del penúltimo subnivel pasado al último
const trap = Z => {
  if (Z >= 21 && Z <= 30) { const d = Z - 18; return cstr(conf(18)) + " 3d" + SUPN(Math.min(10, d)) + (d > 10 ? " 4p" + SUPN(d - 10) : ""); }
  const c = conf(Z).map(x => x.slice()), n = c.length; c[n - 1][2] += 1; c[n - 2][2] -= 1; if (c[n - 2][2] === 0) c.splice(n - 2, 1); return cstr(c);
};
const ELS = [["carbono", 6], ["nitrógeno", 7], ["oxígeno", 8], ["flúor", 9], ["sodio", 11], ["fósforo", 15], ["azufre", 16], ["cloro", 17], ["potasio", 19], ["calcio", 20], ["titanio", 22], ["manganeso", 25], ["hierro", 26], ["níquel", 28], ["cinc", 30], ["arsénico", 33], ["bromo", 35], ["estroncio", 38]];
def("quim11.config", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 2);
  if (k === 0) { const [n, Z] = R.pick(ELS), cc = conf(Z), c = cstr(cc), alts = [cstr(conf(Z - 1)), cstr(conf(Z + 1)), trap(Z)];
    // pasos: seguir Moeller restando los electrones que se colocan
    let rem = Z; const steps = cc.map(([nn, l, e], i) => { rem -= e; return `${nn}${l}${SUPN(e)} (${i === 0 ? T.co_left(rem) : rem})`; }).join(" → ");
    return choice(R, T.co_q(`${n} (Z = ${Z})`), c, alts, T.co_s(c, steps, cc.map(x => x[2]).join(" + "), Z)); }
  if (k === 1) { const [n, Z] = R.pick(ELS.filter(e => ![26, 28, 22, 25].includes(e[1]))), c = conf(Z), r = unp(c);
    // casillas del último subnivel: una por orbital, primero una flecha ↑ en cada una y luego se emparejan (Hund)
    const [ln, ll, le] = c[c.length - 1], no = CAP[ll] / 2, box = Array.from({ length: no }, (_, i) => "[" + (i < le ? "↑" : " ") + (i + no < le ? "↓" : " ") + "]").join(" ");
    return { q: T.co_q2(n, Z), kind: "int", ans: r, sol: T.co_s2(cstr(c), r, `${ln}${ll}${SUPN(le)}`, box) }; }
  const cases = [["2, 1, 0, +½", true, "n = 2 vale; l = 1 está entre 0 y n − 1 = 1; mₗ = 0 está entre −1 y +1; mₛ = +½ vale."], ["3, 2, −2, −½", true, "l = 2 (un orbital d) está entre 0 y 2; mₗ va de −2 a +2; mₛ = −½ vale."], ["2, 2, 0, +½", false, "con n = 2, l solo puede ser 0 o 1."],
    ["1, 0, 1, +½", false, "con l = 0, mₗ solo puede ser 0."], ["4, 3, −3, +½", true, "l = 3 (un orbital 4f) está entre 0 y 3; mₗ = −3 está entre −3 y +3; mₛ = +½ vale."], ["3, 1, 2, −½", false, "con l = 1, mₗ va de −1 a +1."], ["0, 0, 0, +½", false, "n empieza en 1."]];
  const [q, ok, why] = R.pick(cases);
  return { q: T.co_q3(q), kind: "choice", opts: T.co_o, correct: ok ? 0 : 1, shuffle: false, sol: T.co_s3(ok, why) };
});
const POS = { litio: [2, 1], sodio: [3, 1], potasio: [4, 1], rubidio: [5, 1], berilio: [2, 2], magnesio: [3, 2], calcio: [4, 2], aluminio: [3, 13], carbono: [2, 14], silicio: [3, 14],
  nitrógeno: [2, 15], fósforo: [3, 15], oxígeno: [2, 16], azufre: [3, 16], flúor: [2, 17], cloro: [3, 17], bromo: [4, 17], yodo: [5, 17] };
def("quim11.periodica", (R, S) => {
  const T = S.quim11;
  if (R.r() < 0.75) { const names = Object.keys(POS); let a, b;
    do { [a, b] = R.shuffle(names.slice()).slice(0, 2); } while (!(POS[a][0] === POS[b][0] || POS[a][1] === POS[b][1]));
    const prop = R.pick(["radio atómico", "energía de ionización", "electronegatividad"]);
    const downLeft = (x, y) => POS[x][0] > POS[y][0] || (POS[x][0] === POS[y][0] && POS[x][1] < POS[y][1]);
    let w = (prop === "radio atómico") === downLeft(a, b) ? a : b, why = T.pe_why[prop];
    // Excepciones reales de la energía de ionización que enseña la lección (Mg > Al, N > O, P > S)
    const an = prop === "energía de ionización" && T.pe_anom[[a, b].sort().join("|")];
    if (an) [w, why] = an;
    const c1 = s => s.charAt(0).toUpperCase() + s.slice(1);
    const where = POS[a][0] === POS[b][0] ? T.pe_per(POS[a][0], c1(downLeft(a, b) ? b : a)) : T.pe_gru(c1(downLeft(a, b) ? b : a));
    return { q: T.pe_q(prop, a, b), kind: "choice", opts: [c1(a), c1(b)], correct: w === a ? 0 : 1, shuffle: false, sol: T.pe_s(c1(w), (an ? "" : where + " ") + why) }; }
  const [ei, k] = R.pick([["496, 4562, 6912, 9543", 1], ["738, 1451, 7733, 10 543", 2], ["578, 1817, 2745, 11 577", 3], ["787, 1577, 3232, 4356, 16 091", 4], ["520, 7298, 11 815", 1], ["590, 1145, 4912, 6491", 2]]);
  const vals = ei.split(", ");
  return { q: T.pe_q2(WA.H.esn(ei)), kind: "int", ans: k, sol: T.pe_s2(k, WA.H.esn(vals[k - 1]), WA.H.esn(vals[k])) };
});

/* ── U2 · Enlace ── */
const CAT = [["litio", "Li", 1], ["sodio", "Na", 1], ["potasio", "K", 1], ["magnesio", "Mg", 2], ["calcio", "Ca", 2], ["aluminio", "Al", 3], ["bario", "Ba", 2]];
const AN = [["cloro", "Cl", 1], ["bromo", "Br", 1], ["oxígeno", "O", 2], ["azufre", "S", 2], ["flúor", "F", 1], ["nitrógeno", "N", 3]];
const NITR = ["litio", "magnesio", "calcio", "aluminio"];   // nitruros iónicos que existen (Na₃N y K₃N casi no)
const GRP = { c: { 1: 1, 2: 2, 3: 13 }, a: { 1: 17, 2: 16, 3: 15 } };
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const ionSup = (s, q, sign) => s + (q > 1 ? SUPN(q) : "") + sign;
def("quim11.ionico", (R, S) => {
  const T = S.quim11;
  if (R.r() < 0.6) { const a = R.pick(AN), c = R.pick(a[1] === "N" ? CAT.filter(x => NITR.includes(x[0])) : CAT);
    const [, cs, qc] = c, [, as, qa] = a, g = gcd(qc, qa), nc = qa / g, na = qc / g;
    const plain = cs + (nc > 1 ? nc : "") + as + (na > 1 ? na : ""), ok = sub(plain);
    const sol = T.io_s(c[0], GRP.c[qc], ionSup(cs, qc, "⁺"), a[0], GRP.a[qa], ionSup(as, qa, "⁻"), nc, na, nc * qc, ok, g > 1 ? sub(cs + qa + as + qc) : null);
    if (R.r() < 0.35) return { q: T.io_w(c[0], a[0]), kind: "text", ans: [plain, uni(plain)], sol };
    const alts = new Set(); if (g > 1) alts.add(sub(cs + qa + as + qc));   // cruzar sin simplificar
    for (const [x, y] of R.shuffle([[1, 1], [1, 2], [2, 1], [2, 3], [3, 2], [1, 3], [3, 1]])) { const f = sub(cs + (x > 1 ? x : "") + as + (y > 1 ? y : "")); if (f !== ok) alts.add(f); }
    return choice(R, T.io_q(c[0], a[0]), ok, [...alts].slice(0, 3), sol); }
  const [a, b, w, why] = R.pick([["NaF", "NaI", "NaF", "el F⁻ es más pequeño que el I⁻."], ["MgO", "NaCl", "MgO", "sus iones tienen carga doble."], ["CaO", "KCl", "CaO", "cargas 2+ y 2− frente a 1+ y 1−."], ["LiF", "CsF", "LiF", "el Li⁺ es mucho más pequeño que el Cs⁺."], ["Al₂O₃", "Na₂O", "Al₂O₃", "el Al³⁺ tiene más carga y menor radio."]]);
  return { q: T.io_q2(a, b), kind: "choice", opts: [a, b], correct: w === a ? 0 : 1, shuffle: false, sol: T.io_s2(w, why) };
});

/* ── U3 · Formulación ── */
// Cada compuesto trae su razonamiento y sus distractores «casi buenos» (el mismo compuesto mal
// formulado o mal nombrado). Tres formas: nombre → fórmula, fórmula → nombre y escribir la fórmula.
const formulate = (R, S, list) => {
  const T = S.quim11, [f, n, why, wf, wn] = R.pick(list), F = sub(f), sol = T.fo_s(F, n, why), r = R.r();
  if (r < 0.35) return choice(R, T.fo_q(n), F, wf.map(sub), sol);
  if (r < 0.7) return choice(R, T.fo_q2(F), n, wn, sol);
  return { q: T.fo_w(n), kind: "text", ans: [f, uni(f)], sol };
};
def("quim11.binario", (R, S) => formulate(R, S, S.quim11.bin));
def("quim11.ternario", (R, S) => formulate(R, S, S.quim11.ter));

/* ── U4 · Cantidades ── */
def("quim11.leyes", (R, S, H) => {
  const T = S.quim11;
  if (R.r() < 0.6) { const [a, b, A, Bn] = R.pick([[3, 2, "magnesio", "oxígeno"], [5, 2, "calcio", "oxígeno"], [1, 8, "hidrógeno", "oxígeno"], [3, 8, "carbono", "oxígeno"], [23, 35.5, "sodio", "cloro"]]), m = a * R.int(2, 10), r = rd(m * b / a);
    return num(T.le_q[0](a, H.dec(b), A, Bn, m), r, T.le_s[0](m, H.dec(b), a, A, Bn, H.dec(r))); }
  const [eq, ca, cb, A, Bn] = R.pick([["N₂ + 3 H₂ → 2 NH₃", 3, 2, "H₂", "NH₃"], ["2 H₂ + O₂ → 2 H₂O (vapor)", 1, 2, "O₂", "H₂O"], ["H₂ + Cl₂ → 2 HCl", 1, 2, "Cl₂", "HCl"], ["2 CO + O₂ → 2 CO₂", 2, 2, "CO", "CO₂"]]), v = R.pick([3, 6, 9, 12]);
  return num(T.le_q[1](eq, v, A, Bn), rd(v * cb / ca), T.le_s[1](v, ca, cb, A, Bn, H.dec(rd(v * cb / ca))));
});
const SUBS = [["H2O", 18, [["H", 2, 1], ["O", 1, 16]]], ["CO2", 44, [["C", 1, 12], ["O", 2, 16]]], ["NH3", 17, [["N", 1, 14], ["H", 3, 1]]], ["CH4", 16, [["C", 1, 12], ["H", 4, 1]]],
  ["H2SO4", 98, [["H", 2, 1], ["S", 1, 32], ["O", 4, 16]]], ["CaCO3", 100, [["Ca", 1, 40], ["C", 1, 12], ["O", 3, 16]]], ["C6H12O6", 180, [["C", 6, 12], ["H", 12, 1], ["O", 6, 16]]], ["NaCl", 58.5, [["Na", 1, 23], ["Cl", 1, 35.5]]]];
const EN = { H: "hidrógeno", O: "oxígeno", C: "carbono", N: "nitrógeno", S: "azufre", Ca: "calcio", Na: "sodio", Cl: "cloro" };
def("quim11.mol", (R, S, H) => {
  const T = S.quim11, [f, M, els] = R.pick(SUBS), k = R.int(0, 2), n = R.pick([0.5, 1, 2, 3]), m = rd(n * M);
  if (k === 0) return num(T.mo_q[0](H.dec(m), sub(f), H.dec(M)), n, T.mo_s[0](H.dec(n)));
  const [el, cnt, ma] = R.pick(els);
  // En las sustancias iónicas (NaCl, CaCO₃) el Na, el Cl y el Ca están como iones, no como átomos
  if (k === 1) { const r = rd(n * cnt * 6.022, 3), ion = ["Na", "Cl", "Ca"].includes(el); return num(T.mo_q[1](H.dec(m), sub(f), H.dec(M), EN[el], cnt, ion), r, T.mo_s[1](H.dec(m), H.dec(M), H.dec(n), cnt, H.dec(r), ion)); }
  const part = rd(cnt * ma, 1), r = rd(part / M * 100, 1); return num(T.mo_q[2](sub(f), H.dec(M), EN[el], part), r, T.mo_s[2](H.raw.dec(part), H.raw.dec(M), H.dec(r)), 0.2);
});
// Fórmula empírica desde los porcentajes: [fórmula, [[elemento, %, masa atómica]…], factor para tener enteros, distractores]
const EMP = [["CH₂O", [["C", 40, 12], ["H", 6.7, 1], ["O", 53.3, 16]], 1, ["CHO", "CH₂O₂", "C₂HO"]], ["CH₂", [["C", 85.7, 12], ["H", 14.3, 1]], 1, ["CH", "CH₃", "C₂H"]],
  ["NO₂", [["N", 30.4, 14], ["O", 69.6, 16]], 1, ["NO", "N₂O", "N₂O₃"]], ["C₂H₅", [["C", 82.8, 12], ["H", 17.2, 1]], 2, ["CH₃", "C₂H₆", "CH₂"]],
  ["SO₃", [["S", 40, 32], ["O", 60, 16]], 1, ["SO₂", "SO", "S₂O₃"]], ["CH", [["C", 92.3, 12], ["H", 7.7, 1]], 1, ["CH₂", "C₂H", "CH₄"]],
  ["CCl₂", [["C", 14.5, 12], ["Cl", 85.5, 35.5]], 1, ["CCl", "CCl₄", "C₂Cl"]], ["C₃H₈", [["C", 81.8, 12], ["H", 18.2, 1]], 3, ["CH₃", "C₂H₅", "CH₂"]],
  ["C₄H₅", [["C", 90.6, 12], ["H", 9.4, 1]], 4, ["CH", "C₂H₃", "CH₂"]]];
def("quim11.empirica", (R, S, H) => {
  const T = S.quim11;
  if (R.r() < 0.6) { const [f, els, mult, alts] = R.pick(EMP), mol = els.map(([e, p, A]) => [e, p, A, p / A]), mn = Math.min(...mol.map(x => x[3]));
    const rows = mol.map(([e, p, A, n]) => [e, H.raw.dec(p), H.raw.dec(A), H.dec(rd(n, 2)), H.dec(rd(n / mn, 2)), Math.round(n / mn * mult)]);
    return choice(R, T.em_q(T.em_pc(els.map(([e, p]) => [e, H.raw.dec(p)]))), f, alts, T.em_s(rows, H.dec(rd(mn, 2)), mult, f)); }
  // Solo múltiplos que dan moléculas que existen (un hidrocarburo CnHm tiene m par y m ≤ 2n + 2)
  const [fe, Me, mols] = R.pick([["CH₂O", 30, [[2, "C₂H₄O₂", "ácido etanoico"], [3, "C₃H₆O₃", "ácido láctico"], [6, "C₆H₁₂O₆", "glucosa"]]],
    ["CH₂", 14, [[2, "C₂H₄", "eteno"], [3, "C₃H₆", "propeno"], [4, "C₄H₈", "buteno"], [5, "C₅H₁₀", "penteno"], [6, "C₆H₁₂", "ciclohexano"]]],
    ["CH", 13, [[2, "C₂H₂", "etino"], [6, "C₆H₆", "benceno"], [8, "C₈H₈", "estireno"]]], ["C₂H₅", 29, [[2, "C₄H₁₀", "butano"]]],
    ["NO₂", 46, [[2, "N₂O₄", "tetraóxido de dinitrógeno"]]], ["C₂H₄O", 44, [[2, "C₄H₈O₂", "ácido butanoico"]]]]), [k, fm, name] = R.pick(mols);
  return { q: T.em_q2(fe, Me, Me * k), kind: "int", ans: k, sol: T.em_s2(k, Me * k, Me, fe, fm, name) };
});

/* ── U5 · Gases y disoluciones ── */
def("quim11.gas", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 3);
  if (k === 0) { const [f, M] = R.pick([["O₂", 32], ["CO₂", 44], ["N₂", 28], ["CH₄", 16], ["NH₃", 17]]), n = R.pick([0.25, 0.5, 1, 2]), t = R.pick([0, 27, 127]), P = R.pick([1, 2, 0.5]), r = rd(n * 0.082 * (t + 273) / P);
    return num(T.ga_q[0](H.dec(rd(n * M)), f, M, t, H.dec(P)), r, T.ga_s[0](H.dec(n), H.dec(r))); }
  if (k === 1) { const [d, M] = R.pick([[1.25, 28], [1.43, 32], [1.96, 44], [0.714, 16], [0.759, 17]]), r = rd(d * 0.082 * 273, 1); return num(T.ga_q[1](H.dec(d)), r, T.ga_s[1](H.dec(r)), 0.4); }
  if (k === 2) { const M = R.pick([16, 28, 32, 44, 64]), t = R.pick([0, 25, 100]), P = R.pick([1, 2]), r = rd(P * M / (0.082 * (t + 273)), 3); return num(T.ga_q[2](M, t, P), r, T.ga_s[2](H.dec(r)), Math.max(0.005, r * 0.01)); }
  const na = R.pick([0.2, 0.4, 0.6]), nb = R.pick([0.1, 0.2, 0.4]), V = R.pick([5, 10, 20]), Tk = R.pick([273, 300, 400]), pt = rd((na + nb) * 0.082 * Tk / V, 3), x = rd(nb / (na + nb), 3), r = rd(pt * nb / (na + nb), 3);
  return num(T.ga_q[3](H.dec(na), H.dec(nb), V, Tk), r, T.ga_s[3](H.dec(pt), H.dec(x), H.dec(r)), Math.max(0.005, r * 0.01));
});
def("quim11.concentracion", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 3);
  if (k === 0) { const [f, M, p, d] = R.pick([["ácido sulfúrico", 98, 96, 1.84], ["ácido clorhídrico", 36.5, 37, 1.19], ["ácido nítrico", 63, 65, 1.4], ["amoniaco", 17, 28, 0.9]]), g = rd(1000 * d * p / 100, 1), r = rd(g / M, 2);
    return num(T.cn_q[0](p, H.dec(d), f, H.dec(M)), r, T.cn_s[0](H.dec(d), H.dec(rd(1000 * d, 1)), p, H.dec(g), H.dec(M), H.dec(r))); }
  if (k === 1) { const [f, M] = R.pick([["NaOH", 40], ["NaCl", 58.5], ["KCl", 74.5], ["glucosa", 180]]), V = R.pick([100, 250, 500]), c = R.pick([0.1, 0.2, 0.5, 1]), n = rd(c * V / 1000, 4), r = rd(n * M, 3);
    return num(T.cn_q[1](V, H.dec(c), f, H.dec(M)), r, T.cn_s[1](V, H.dec(V / 1000), H.dec(c), H.dec(n), H.dec(M), H.dec(r))); }
  if (k === 2) { const c1 = R.pick([2, 6, 12, 18]), c2 = R.pick([0.1, 0.5, 1]), V2 = R.pick([250, 500, 1000]), r = rd(c2 * V2 / c1, 2); return num(T.cn_q[2](c1, H.dec(c2), V2), r, T.cn_s[2](c1, H.dec(c2), V2, H.dec(rd(c2 * V2, 2)), H.dec(r))); }
  // sin pasar de la solubilidad: el NaCl y la glucosa no llegan a 8 mol/kg (la urea sí)
  const [f, M] = R.pick([["NaCl", 58.5], ["glucosa", 180], ["urea", 60]]), n = R.pick([0.5, 1, 2]), kg = R.pick([0.25, 0.5, 1].filter(x => f === "urea" || n / x <= 4)), r = rd(n / kg, 3); return num(T.cn_q[3](H.dec(rd(n * M)), f, H.dec(M), H.dec(kg)), r, T.cn_s[3](H.dec(rd(n * M)), H.dec(M), H.dec(n), H.dec(kg), H.dec(r)));
});
def("quim11.coligativa", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 2), [f, i] = R.pick([["glucosa", 1], ["urea", 1], ["NaCl", 2], ["CaCl₂", 3], ["etilenglicol", 1]]), m = R.pick([0.5, 1, 2, 3]);
  if (k === 0) { const dt = rd(1.86 * m * i, 3), r = rd(-dt, 2); return num(T.cl_q[0](H.dec(m), f, i), r, T.cl_s[0](H.dec(m), i, H.dec(dt), H.dec(r)), 0.02); }
  if (k === 1) { const dt = rd(0.52 * m * i, 3), r = rd(100 + dt, 2); return num(T.cl_q[1](H.dec(m), f, i), r, T.cl_s[1](H.dec(m), i, H.dec(dt), H.dec(r)), 0.02); }
  const c = R.pick([0.1, 0.2, 0.3, 0.5]), t = R.pick([25, 37]), r = rd(c * 0.082 * (t + 273), 2); return num(T.cl_q[2](H.dec(c), t), r, T.cl_s[2](H.dec(c), t + 273, H.dec(r)));
});

/* ── U6 · Reacciones ── */
// Ajuste: se cuentan los átomos de cada lado para la comprobación de la solución
const plainF = f => f.replace(/[₀-₉]/g, c => String(c.charCodeAt(0) - 0x2080));
const atoms = f => {   // «Ca(NO3)2» → {Ca: 1, N: 2, O: 6}
  const st = [{}], s = plainF(f); let i = 0;
  const add = (o, e, n) => { o[e] = (o[e] || 0) + n; };
  while (i < s.length) {
    if (s[i] === "(") { st.push({}); i++; continue; }
    if (s[i] === ")") { i++; let d = ""; while (/\d/.test(s[i] || "")) d += s[i++]; const g = st.pop(), k = +d || 1; for (const e in g) add(st[st.length - 1], e, g[e] * k); continue; }
    const m = /^([A-Z][a-z]?)(\d*)/.exec(s.slice(i)); if (!m) { i++; continue; }
    add(st[st.length - 1], m[1], +m[2] || 1); i += m[0].length;
  }
  return st[0];
};
def("quim11.ajuste", (R, S) => {
  const T = S.quim11, [eq, co, steps] = R.pick(T.ajuste), [L, Rt] = eq.split(" → ").map(x => x.split(" + ")), sp = [...L, ...Rt];
  const big = sp.map((_, i) => i).filter(i => co[i] > 1), j = big.length && R.r() < 0.85 ? R.pick(big) : R.int(0, sp.length - 1);
  const side = (fs, off) => fs.map((f, i) => (co[off + i] > 1 ? co[off + i] + " " : "") + f).join(" + ");
  const count = (fs, off) => { const t = {}; fs.forEach((f, i) => { const a = atoms(f); for (const e in a) t[e] = (t[e] || 0) + a[e] * co[off + i]; }); return t; };
  const cl = count(L, 0), cr = count(Rt, L.length), check = Object.keys(cl).map(e => `${e} ${cl[e]} = ${cr[e]}`).join("; ");
  return { q: T.aj_q(eq, sp[j]), kind: "int", ans: co[j], sol: T.aj_s(steps, `${side(L, 0)} → ${side(Rt, L.length)}`, check, sp[j], co[j]) };
});
def("quim11.esteq", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 3);
  if (k === 0) { const [eq, A, MA, ca, Bn, MB, cb, Pn, MP, cp] = R.pick([["2 H₂ + O₂ → 2 H₂O", "H₂", 2, 2, "O₂", 32, 1, "H₂O", 18, 2], ["N₂ + 3 H₂ → 2 NH₃", "N₂", 28, 1, "H₂", 2, 3, "NH₃", 17, 2], ["CH₄ + 2 O₂ → CO₂ + 2 H₂O", "CH₄", 16, 1, "O₂", 32, 2, "CO₂", 44, 1], ["2 Al + 3 Cl₂ → 2 AlCl₃", "Al", 27, 2, "Cl₂", 71, 3, "AlCl₃", 133.5, 2]]);
    const na = R.pick([1, 2, 3, 4, 5]), nb = R.pick([1, 2, 3, 4, 6]), ma = rd(na * MA, 1), mb = rd(nb * MB, 1), qa = na / ca, qb = nb / cb, tie = Math.abs(qa - qb) < 1e-9,
      lim = qa < qb ? A : Bn, ext = Math.min(qa, qb), np = rd(ext * cp, 3), r = rd(ext * cp * MP, 2);
    // la solución sigue el método de la lección: moles de cada reactivo, cociente moles/coeficiente, el menor manda
    return num(T.es_q[0](eq, H.dec(ma), A, H.dec(mb), Bn, Pn, H.dec(MA), H.dec(MB), H.dec(MP)), r,
      T.es_s[0]([A, H.dec(ma), H.dec(MA), na, ca, H.dec(rd(qa, 3))], [Bn, H.dec(mb), H.dec(MB), nb, cb, H.dec(rd(qb, 3))], tie ? null : lim, Pn, (tie ? A : lim) === A ? [na, ca] : [nb, cb], cp, H.dec(np), H.dec(MP), H.dec(r))); }
  if (k === 1) { const m = R.pick([200, 500, 1000]), p = R.pick([70, 80, 90]), mp = rd(m * p / 100, 1), n = rd(m * p / 100 / 100, 3), [Pn, MP] = R.pick([["CaO", 56], ["CO₂", 44]]), r = rd(n * MP, 1);
    return num(T.es_q[1](m, p, "CaCO₃ → CaO + CO₂", Pn, MP), r, T.es_s[1](m, p, H.dec(mp), H.dec(n), Pn, MP, H.dec(r))); }
  if (k === 2) { const teo = R.pick([50, 80, 120, 200]), real = rd(teo * R.pick([0.6, 0.72, 0.85, 0.9]), 1), r = rd(real / teo * 100, 1); return num(T.es_q[2](H.dec(real), teo), r, T.es_s[2](H.dec(real), teo, H.dec(r)), 0.2); }
  // datos que llegan como volumen de disolución o masa, y resultado como volumen de gas (n = c·V, V = nRT/P)
  if (R.r() < 0.6) { const V = R.pick([100, 200, 250, 500]), c = R.pick([0.5, 1, 2]), t = R.pick([0, 20, 27]), VL = V / 1000, n = rd(c * VL, 4), n2 = rd(n / 2, 4), Tk = t + 273, r = rd(n2 * 0.082 * Tk, 3);
    return num(T.es_q[3](V, H.dec(c), t), r, T.es_s[3](V, H.dec(VL), H.dec(c), H.dec(n), H.dec(n2), t, Tk, H.dec(r))); }
  const m = R.pick([10, 20, 25, 50]), n = rd(m / 100, 3), r = rd(n * 0.082 * 273, 3);
  return num(T.es_q[4](m), r, T.es_s[4](m, H.dec(n), H.dec(r)));
});
def("quim11.industria", (R, S, H) => {
  const T = S.quim11, k = R.int(0, 2);
  if (k === 0) { const m = R.pick([100, 500, 1000, 2000]), p = R.pick([60, 70, 80, 90]), mox = rd(m * p / 100, 1), r = rd(m * p / 100 * 112 / 160, 1); return num(T.in_q[0](H.n(m), p), r, T.in_s[0](H.n(m), p, H.dec(mox), H.dec(r))); }
  if (k === 1) { const m = R.pick([28, 56, 140, 280]), n = m * 1000 / 28, r = rd(m / 28 * 2 * 17, 1); return num(T.in_q[1](m), r, T.in_s[1](m, H.n(m * 1000), H.n(n), H.n(2 * n), H.n(2 * n * 17), H.dec(r))); }
  const [desc, mp, mr] = R.pick([["En CaCO₃ → CaO + CO₂ solo interesa la cal (CaO).", 56, 100], ["En N₂ + 3 H₂ → 2 NH₃ todo acaba en amoniaco.", 34, 34], ["En C₂H₄ + H₂O → C₂H₅OH se obtiene etanol.", 46, 46], ["En 2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂ interesa el NaOH.", 80, 153]]);
  const r = rd(mp / mr * 100, 1); return num(T.in_q[2](desc, mp, mr), r, T.in_s[2](H.dec(r)), 0.3);
});

/* ── U7 · Orgánica ── */
// Como en la U3: distractores del mismo compuesto mal nombrado o mal formulado, y nombres escritos
// (con las variantes aceptadas: butanona o butan-2-ona…)
const orgq = (R, T, list) => {
  const [f, n, why, wf, wn, alt] = R.pick(list), sol = T.or_s(f, n, why), r = R.r();
  if (r < 0.4) return choice(R, T.or_q(f), n, wn, sol);
  if (r < 0.75) return choice(R, T.or_q2(n), f, wf, sol);
  return { q: T.or_w(f), kind: "text", ans: [n, ...(alt || [])], sol };
};
def("quim11.hidrocarburo", (R, S) => orgq(R, S.quim11, S.quim11.hc));
def("quim11.funcion", (R, S) => orgq(R, S.quim11, S.quim11.fu));
def("quim11.isomero", (R, S) => {
  const T = S.quim11;
  if (R.r() < 0.2) { const [q, k, list] = R.pick(T.is_cnt); return { q: T.is_q(q), kind: "int", ans: k, sol: T.is_s(k, list) }; }
  return B.mixed(T.isomero, R);
});
})();
