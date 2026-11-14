/* WikiAula — Física y Química, Grado 9 (3.º de ESO): problemas numéricos y bancos.
   Textos y bancos en i18n/<lang>/fq9.js (S.fq9). */
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
// superíndices con signo (10⁻⁶, S²⁻) y potencias de diez
const SUPC = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-": "⁻", "+": "⁺" };
const sup = x => String(x).split("").map(c => SUPC[c] || c).join("");
const p10 = e => "10" + sup(e);
// elección con las opciones barajadas (sin repetidas)
const choice = (R, q, good, bad, sol) => {
  const opts = R.shuffle([good, ...bad.filter((x, i, a) => x !== good && a.indexOf(x) === i)]);
  return { q, kind: "choice", opts, correct: opts.indexOf(good), shuffle: false, sol };
};
// notación científica: [mantisa, exponente]
const sci = x => {
  let e = Math.floor(Math.log10(Math.abs(x))), m = rdD(x / 10 ** e, 6);
  if (Math.abs(m) >= 10) { m = rdD(m / 10, 6); e++; }
  if (Math.abs(m) < 1) { m = rdD(m * 10, 6); e--; }
  return [m, e];
};
const sciFields = (S, H, m, e) => [{ label: S.fq9.mant, kind: "num", ans: m, tol: 0.006, ansHtml: H.dec(m) }, { label: S.fq9.expo, ans: e }];

def("fq9.cientifico", (R, S) => B.mixed(S.fq9.cientifico, R));
def("fq9.modelo", (R, S) => B.mixed(S.fq9.modelo, R));
def("fq9.radiacion", (R, S) => B.mixed(S.fq9.radiacion, R));
def("fq9.elemento", (R, S) => B.mixed(S.fq9.elemento, R));
def("fq9.enlace", (R, S) => B.mixed(S.fq9.enlace, R));
def("fq9.factor", (R, S) => B.mixed(S.fq9.factor, R));
def("fq9.leynewton", (R, S) => B.mixed(S.fq9.leynewton, R));
def("fq9.induccion", (R, S) => B.mixed(R.r() < 0.5 ? S.fq9.induccion : S.fq9.motorgen, R));

// ── Unidad 1 ──
def("fq9.unidades", (R, S, H) => {
  const T = S.fq9.un, k = R.int(0, 3);
  if (k === 0) {   // escribir en notación científica
    const m = R.pick([1.2, 1.5, 2, 2.5, 3, 3.6, 4.5, 5, 6.4, 7, 8.1, 9.3]), e = R.pick([-9, -8, -7, -6, -5, -4, -3, 3, 4, 5, 6, 7, 8, 9]);
    const [what, u] = R.pick(T.cosas);
    return { q: T.q0(what, H.dec(m * 10 ** e, 12), u), kind: "fields", fields: sciFields(S, H, m, e), sol: T.s0(H.dec(m * 10 ** e, 12), H.dec(m), e, sup(e), u) };
  }
  if (k === 1) {   // operar en notación científica
    const a = R.int(2, 9), b = R.int(2, 9), p = R.int(-8, 9), q0 = R.int(-9, 8), mul = R.r() < 0.6, q = !mul && q0 === p ? q0 - 1 : q0;   // que no salga 10⁰ al dividir
    if (mul) {
      const prod = a * b, [m, e] = sci(prod * 10 ** (p + q));
      return { q: T.q1m(a, sup(p), b, sup(q)), kind: "fields", fields: sciFields(S, H, m, e), sol: T.s1m(a, b, prod, p, q, sup(p + q), H.dec(m), sup(e), prod >= 10) };
    }
    const bd = R.pick([2, 4, 5, 8]), quo = rd(a / bd, 4), [m, e] = sci(a / bd * 10 ** (p - q));   // cocientes exactos
    return { q: T.q1d(a, sup(p), bd, sup(q)), kind: "fields", fields: sciFields(S, H, m, e), sol: T.s1d(a, bd, H.dec(quo), p, q, sup(p - q), H.dec(m), sup(e), quo < 1) };
  }
  if (k === 2) {   // prefijos: de µm, nm, km, MW, GB… a la unidad, en notación científica
    const [pre, pe, u, un, what] = R.pick(T.pref), v = R.pick([2, 3, 5, 7, 8, 12, 25, 40, 64, 120, 250, 350, 500]), [m, e] = sci(v * 10 ** pe), [vm, ve] = sci(v);
    return { q: T.q2(what, v, pre + u, un), kind: "fields", fields: sciFields(S, H, m, e), sol: T.s2(pre + u, sup(pe), v, u, un, H.dec(vm), sup(ve), ve > 0, H.dec(m), sup(e)) };
  }
  // factores dobles: km/h ↔ m/s, g/cm³ ↔ kg/m³
  const j = R.int(0, 3);
  if (j === 0) { const v = R.pick([18, 36, 54, 72, 90, 108, 126, 144]), r = rd(v / 3.6); return num(T.q3[0](v), r, T.s3[0](v, H.n(v * 1000), H.dec(r))); }
  if (j === 1) { const v = R.pick([5, 10, 15, 20, 25, 30, 35, 40]), r = rd(v * 3.6); return num(T.q3[1](v), r, T.s3[1](v, H.n(v * 3600), H.dec(r))); }
  const [mat, d] = R.pick(T.dens);
  if (j === 2) return num(T.q3[2](mat, H.dec(d)), rd(d * 1000, 3), T.s3[2](H.dec(d), H.n(rd(d * 1000, 3))));
  return num(T.q3[3](mat, H.n(rd(d * 1000, 3))), d, T.s3[3](H.n(rd(d * 1000, 3)), H.dec(d)));
});
def("fq9.error", (R, S, H) => {
  // Método de la lección: media redondeada a centésimas (como los datos); errores con esa media; E_r con un decimal.
  const f2 = x => x.toFixed(2).replace(".", WA.H.ds);
  let xs, sum, m, m2, ea;
  do {
    const base = R.int(120, 300) / 100; xs = [0, 1, 2, 3, 4].map(() => rdD(base + R.int(-4, 4) / 100, 2));
    sum = rdD(xs.reduce((a, b) => a + b, 0), 2); m = rdD(sum / 5, 3); m2 = rdD(m, 2); ea = rdD(Math.abs(xs[0] - m2), 2);
  } while (ea < 0.015);   // que la primera medida no coincida con la media
  const ex = ea / m2 * 100, er = rdD(ex, 1);   // tolerancia alrededor del valor exacto: vale redondear 1,25 a 1,2 o a 1,3
  return { q: S.fq9.er_q(xs.map(f2)), kind: "fields", fields: [{ label: S.fq9.er_f[0], kind: "num", ans: m2, tol: 0.006, ansHtml: f2(m2) }, { label: S.fq9.er_f[1], kind: "num", ans: er, tol: 0.051 + Math.abs(er - ex), ansHtml: er.toFixed(1).replace(".", WA.H.ds) }],
    sol: S.fq9.er_s(xs.map(f2), f2(sum), H.dec(m), f2(m2), m !== m2, f2(ea), er.toFixed(1).replace(".", WA.H.ds), near(ex, er)) };
});
def("fq9.cifras", (R, S) => {
  const x = R.pick(["0,0042", "1,05", "2,50", "207", "0,0350", "12,000", "0,5", "3,14", "100,0", "0,00071", "45,08", "6,02", "9,80", "0,020", "0,30", "4,000", "0,00905",
    "3,0", "50,05", "0,10", "8,314", "1,602", "0,0001", "72,40", "10,5", "0,060", "1,0", "305", "0,7070", "96,5", "2,0", "0,400"]);
  const pos = x.search(/[1-9]/), sig = x.slice(pos).replace(",", ""), lead = (x.slice(0, pos).match(/0/g) || []).length;
  const dec = x.includes(",") ? x.split(",")[1] : "", trail = dec.length - dec.replace(/0+$/, "").length, mid = (sig.match(/0/g) || []).length - trail;
  const X = WA.H.esn(x);   // el mismo número con el separador decimal del idioma (mismas posiciones)
  return { q: S.fq9.ci_q(X), kind: "int", ans: sig.length, sol: S.fq9.ci_s(X.slice(0, pos) + "<b>" + X.slice(pos) + "</b>", sig.split(""), sig.length, lead, mid, trail) };
});
def("fq9.proporcion", (R, S, H) => {
  const P = S.fq9.prop, t = R.r();
  if (t < 0.25) {   // pendiente e interpolación con dos puntos de la recta
    const C = R.pick(P.ctx), s = R.pick(C.s), x1 = R.pick(C.x1), x2 = x1 * R.int(3, 5), st = x1 >= 20 ? 10 : 1, x3 = R.int(x1 / st + 1, x2 / st - 1) * st;
    const y1 = rd(s * x1, 3), y2 = rd(s * x2, 3), y3 = rd(s * x3, 3);
    return { q: C.q(H.dec(y1), x1, H.dec(y2), x2, x3), kind: "fields",
      fields: [{ label: C.f[0], kind: "num", ans: s, tol: Math.max(0.0006, s * 0.005), ansHtml: H.dec(s) }, { label: C.f[1], kind: "num", ans: y3, tol: Math.max(0.011, y3 * 0.01), ansHtml: H.dec(y3) }],
      sol: P.sp(H.dec(y2), H.dec(y1), x2, x1, H.dec(rd(y2 - y1, 3)), x2 - x1, H.dec(s), x3, H.dec(y3), C.ux, C.uy, C.what) };
  }
  if (t < 0.4) {   // ¿interpolar o extrapolar?
    const a = R.pick([0, 10, 20, 50]), b = a + R.pick([100, 150, 200]), inside = R.r() < 0.5, x = inside ? a + R.int(1, (b - a) / 10 - 1) * 10 : b + R.pick([50, 100, 300]);
    return choice(R, P.qi(a, b, x), P.oi[inside ? 0 : 1], [P.oi[inside ? 1 : 0]], P.si(x, a, b, inside));
  }
  const step = R.pick([1, 2]), k = R.int(0, 2), xs = [1, 2, 3, 4].map(x => x * step);   // x ordenadas y equiespaciadas
  const c = R.int(2, 9), b = R.int(1, 9);
  const xv = k === 2 ? [1, 2, 4, 5] : xs, yv = k === 0 ? xs.map(x => c * x) : k === 1 ? xs.map(x => c * x + b) : [1, 2, 4, 5].map(x => rd(20 * c / x, 2));
  const opts = P.opts;
  const tbl = `x: ${xv.join(" · ")}<br>y: ${yv.map(v => H.dec(v)).join(" · ")}`;
  return { q: P.q(tbl), kind: "choice", opts, correct: k, shuffle: false, sol: P.s[k](xv, yv.map(v => H.dec(v)), H.dec(c), H.dec(c * step), H.dec(20 * c)) };
});

// ── Unidad 2 ──
def("fq9.gases", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) {
    const u = R.pick(["atm", "atm", "hPa", "mmHg"]);
    let P1, P2;
    if (u === "atm") { P1 = R.pick([1, 2, 3, 4]); P2 = R.pick([0.5, 1, 2, 3, 4, 6].filter(p => p !== P1)); }
    else if (u === "hPa") { P1 = R.pick([1013, 1000, 950]); P2 = R.pick([700, 760, 800, 850, 1200, 1500]); }
    else { P1 = R.pick([760, 750]); P2 = R.pick([380, 500, 600, 1140, 1520]); }
    const V1 = R.int(2, 24), r = rd(P1 * V1 / P2);
    return num(S.fq9.ga_q[0](H.dec(P1), V1, H.dec(P2), u), r, S.fq9.ga_s[0](H.dec(P1), V1, H.dec(P2), H.dec(r), u));
  }
  if (k === 1) { const V1 = R.int(2, 12), t1 = R.pick([0, 27, 50, 77, 127]), t2 = R.pick([-23, 27, 77, 127, 227, 327].filter(t => t !== t1)), T1 = t1 + 273, T2 = t2 + 273, r = rd(V1 * T2 / T1); return num(S.fq9.ga_q[1](V1, t1, t2 < 0 ? "−" + -t2 : t2), r, S.fq9.ga_s[1](V1, T1, T2, H.dec(r))); }
  if (k === 2) { const P1 = R.pick([1, 1.5, 2, 3]), t1 = R.pick([0, 27, 20]), t2 = R.pick([77, 127, 227, 327]), T1 = t1 + 273, T2 = t2 + 273, r = rd(P1 * T2 / T1); return num(S.fq9.ga_q[2](H.dec(P1), t1, t2), r, S.fq9.ga_s[2](H.dec(P1), T1, T2, H.dec(r))); }
  const P1 = R.pick([1, 2]), V1 = R.int(4, 20), T1 = R.pick([300, 273, 250]), P2 = R.pick([1, 2, 3, 4]), T2 = R.pick([300, 350, 400, 450, 600]), r = rd(P1 * V1 * T2 / (T1 * P2));
  return num(S.fq9.ga_q[3](P1, V1, T1, P2, T2), r, S.fq9.ga_s[3](P1, V1, T1, P2, T2, H.dec(r)));
});
def("fq9.disolucion", (R, S, H) => {
  const k = R.int(0, 4);
  if (k === 0) { const c = R.int(5, 80), V = R.pick([100, 150, 200, 250, 350, 500, 750, 1000]), r = rd(c * V / 1000); return num(S.fq9.di_q[0](c, V), r, S.fq9.di_s[0](c, V, H.dec(V / 1000), H.dec(r))); }
  if (k === 1) { const c1 = R.pick([50, 100, 200, 300]), V1 = R.pick([20, 50, 100]), V2 = V1 * R.pick([2, 4, 5, 10]), r = rd(c1 * V1 / V2); return num(S.fq9.di_q[1](c1, V1, V2), r, S.fq9.di_s[1](c1, V1, V2, H.dec(r))); }
  if (k === 2) { const c1 = R.pick([20, 40, 50, 100]), c2 = c1 / R.pick([2, 4, 5, 10]), V2 = R.pick([100, 200, 250, 500]), r = rd(c2 * V2 / c1); return num(S.fq9.di_q[2](c1, H.dec(c2), V2), r, S.fq9.di_s[2](H.dec(c2), V2, c1, H.dec(r))); }
  if (k === 3) { const L = R.pick([2, 4, 5, 10]), mg = L * R.int(2, 60), r = mg / L; return num(S.fq9.di_q[3](H.dec(mg / 1000), L), r, S.fq9.di_s[3](H.dec(mg / 1000), mg, L, r)); }
  const ms = R.int(5, 40), tot = R.pick([100, 125, 150, 200, 250].filter(t => t > ms * 2)), md = tot - ms, r = rd(ms / tot * 100, 1);
  return num(S.fq9.di_q[4](ms, md, R.pick(S.fq9.solutos)), r, S.fq9.di_s[4](ms, md, tot, H.dec(r)), Math.max(0.06, r * 0.01));
});

// ── Unidad 3 ──
const ISO = [["H", 1, 1], ["C", 6, 12], ["C", 6, 14], ["N", 7, 14], ["O", 8, 16], ["F", 9, 19], ["Na", 11, 23], ["Mg", 12, 24], ["Al", 13, 27], ["S", 16, 32], ["Cl", 17, 35], ["Cl", 17, 37], ["K", 19, 39], ["Ca", 20, 40], ["Fe", 26, 56], ["U", 92, 235], ["U", 92, 238]];
const CHG = { Na: [0, 1], Mg: [0, 2], Al: [0, 3], K: [0, 1], Ca: [0, 2], Fe: [0, 2, 3], O: [0, -2], F: [0, -1], S: [0, -2], Cl: [0, -1], H: [0, 1], C: [0], N: [0, -3], U: [0] };
def("fq9.zan", (R, S) => {
  const [sym, Z, A] = R.pick(ISO), ch = R.pick(CHG[sym]), e = Z - ch;
  const chs = ch === 0 ? "" : `<sup>${Math.abs(ch) > 1 ? Math.abs(ch) : ""}${ch > 0 ? "+" : "−"}</sup>`;
  const iso = `<sup>${A}</sup><sub>${Z}</sub>${sym}${chs}`;
  return { q: S.fq9.za_q(iso), kind: "fields", fields: [{ label: S.fq9.za_f[0], ans: Z }, { label: S.fq9.za_f[1], ans: A - Z }, { label: S.fq9.za_f[2], ans: e }], sol: S.fq9.za_s(Z, A, A - Z, e, ch) };
});
def("fq9.semivida", (R, S, H) => {
  if (R.r() < 0.6) { const T = R.pick([2, 5, 8, 10, 30]), n = R.int(1, 4), m0 = R.pick([16, 32, 64, 80, 160, 320]), r = rd(m0 / 2 ** n); return num(S.fq9.sv_q[0](m0, T, n * T), r, S.fq9.sv_s[0](n * T, T, n, [0, 1, 2, 3, 4].slice(0, n + 1).map(k => H.dec(m0 / 2 ** k)), m0, H.dec(r))); }
  const T = R.pick([5, 12, 30, 1600, 5730]), k = R.int(1, 4); return num(S.fq9.sv_q[1](T, k), k * T, S.fq9.sv_s[1](k, T, H.n(k * T)));
});

// ── Unidad 4 ──
const ELS = [["hidrógeno", 1], ["helio", 2], ["litio", 3], ["berilio", 4], ["boro", 5], ["carbono", 6], ["nitrógeno", 7], ["oxígeno", 8], ["flúor", 9], ["neón", 10], ["sodio", 11], ["magnesio", 12], ["aluminio", 13], ["silicio", 14], ["fósforo", 15], ["azufre", 16], ["cloro", 17], ["argón", 18], ["potasio", 19], ["calcio", 20]];
const SYMS = { 1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F", 10: "Ne", 11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl", 18: "Ar", 19: "K", 20: "Ca" };
const shells = Z => { const caps = []; let z = Z; for (const c of [2, 8, 8, 2]) { if (z <= 0) break; caps.push(Math.min(c, z)); z -= c; } return caps; };
const ion = (sym, c) => sym + sup((Math.abs(c) > 1 ? Math.abs(c) : "") + (c > 0 ? "+" : "-"));
def("fq9.capas", (R, S) => {
  const t = R.r();
  if (t < 0.45) { const [n, Z] = R.pick(ELS), caps = shells(Z); return { q: S.fq9.ca_q(n, Z), kind: "int", ans: caps[caps.length - 1], sol: S.fq9.ca_s(caps.join(", "), caps[caps.length - 1]) }; }
  if (t < 0.75) {   // grupo y periodo
    const [n, Z] = R.pick(ELS), caps = shells(Z), v = caps[caps.length - 1], g = Z === 2 ? 18 : v <= 2 ? v : 10 + v;
    return { q: S.fq9.ca_gp_q(n, Z), kind: "fields", fields: [{ label: S.fq9.ca_gp_f[0], ans: g }, { label: S.fq9.ca_gp_f[1], ans: caps.length }], sol: S.fq9.ca_gp_s(caps.join(", "), caps.length, v, g, Z === 2) };
  }
  // ion que tiende a formar (grupos 1, 2, 13 y 15 a 17)
  const [n, Z] = R.pick(ELS.filter(([, z]) => [3, 11, 19, 4, 12, 20, 13, 7, 8, 9, 15, 16, 17].includes(z))), caps = shells(Z), v = caps[caps.length - 1], c = v <= 3 ? v : v - 8, sym = SYMS[Z];
  const bad = [ion(sym, -c), ion(sym, c > 0 ? -(8 - v) : v), ion(sym, c > 0 ? c + 1 : c - 1)];
  return choice(R, S.fq9.ca_io_q(n, Z), ion(sym, c), bad, S.fq9.ca_io_s(caps.join(", "), v, c, ion(sym, c)));
});
const MM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5 };
const FORMS = [[["H", 2], ["O", 1]], [["C", 1], ["O", 2]], [["C", 1], ["H", 4]], [["N", 1], ["H", 3]], [["Na", 1], ["Cl", 1]], [["Ca", 1], ["C", 1], ["O", 3]], [["H", 2], ["S", 1], ["O", 4]],
  [["Mg", 1], ["O", 1]], [["Al", 2], ["O", 3]], [["Fe", 2], ["O", 3]], [["C", 6], ["H", 12], ["O", 6]], [["H", 1], ["N", 1], ["O", 3]], [["K", 1], ["Cl", 1]], [["Cu", 1], ["S", 1], ["O", 4]], [["C", 2], ["H", 6], ["O", 1]], [["Ca", 1], ["Cl", 2]]];
const fstr = f => f.map(([e, n]) => e + (n > 1 ? `<sub>${n}</sub>` : "")).join("");
def("fq9.masamol", (R, S, H) => {
  const f = R.pick(FORMS), M = f.reduce((s, [e, n]) => s + MM[e] * n, 0);
  const ionic = f.some(([e]) => ["Na", "Mg", "Al", "K", "Ca", "Fe", "Cu"].includes(e));   // con metal: iónico, sin moléculas
  return num(S.fq9.mm_q(fstr(f), ionic), M, S.fq9.mm_s(f.map(([e, n]) => (n > 1 ? `${n} · ` : "") + H.dec(MM[e])).join(" + "), H.dec(M)), 0.06);
});
def("fq9.centesimal", (R, S, H) => {
  const f = R.pick(FORMS.filter(x => x.every(([e]) => ["H", "C", "N", "O", "Na", "S", "Cl", "Ca", "Fe"].includes(e)))), M = f.reduce((s, [e, n]) => s + MM[e] * n, 0);
  const [el, n] = R.pick(f), part = MM[el] * n, r = rd(part / M * 100, 1);
  const D = H.raw, msum = f.map(([e, k]) => (k > 1 ? `${k} · ` : "") + D.dec(MM[e])).join(" + ");
  return num(S.fq9.ce_q(fstr(f), S.fq9.ce_names[el]), r, S.fq9.ce_s(msum, D.dec(M), S.fq9.ce_names[el], (n > 1 ? `${n} · ` : "") + D.dec(MM[el]), D.dec(part), H.dec(r), n > 1), 0.15);
});
def("fq9.formula", (R, S) => {
  const [f, n, how, wf, wn] = R.pick(S.fq9.NOMS);
  if (R.r() < 0.5) return choice(R, S.fq9.fo_q[0](n), sub(f), wf.map(sub), S.fq9.fo_s(sub(f), n, how));
  return choice(R, S.fq9.fo_q[1](sub(f)), n, wn, S.fq9.fo_s(sub(f), n, how));
});

// ── Unidad 5 ──
// átomos de cada elemento en una fórmula sin paréntesis (C2H6O → {C: 2, H: 6, O: 1})
const atoms = f => { const o = {}; for (const [, e, k] of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) o[e] = (o[e] || 0) + (k ? +k : 1); return o; };
def("fq9.ajuste", (R, S) => {
  const [re, pr, co, steps, name] = R.pick(S.fq9.EQS), sp = [...re, ...pr];
  const eq = re.map(sub).join(" + ") + " → " + pr.map(sub).join(" + ");
  const ok = sp.map((s, i) => (co[i] > 1 ? co[i] + " " : "") + sub(s));
  const okeq = ok.slice(0, re.length).join(" + ") + " → " + ok.slice(re.length).join(" + ");
  const count = side => { const o = {}; side.forEach(([s, c]) => { for (const [e, k] of Object.entries(atoms(s))) o[e] = (o[e] || 0) + k * c; }); return o; };
  const L = count(re.map((s, i) => [s, co[i]])), Rt = count(pr.map((s, i) => [s, co[re.length + i]]));
  const check = Object.keys(L).map(e => `${e} ${L[e]} = ${Rt[e]}`).join(" · ");
  return { q: S.fq9.aj_q(eq, name), kind: "fields", fields: sp.map((s, i) => ({ label: sub(s), ans: co[i] })), sol: S.fq9.aj_s(steps, okeq, check) };
});
def("fq9.proust", (R, S, H) => {
  const cps = [[1, 8, "hidrógeno", "oxígeno", "el agua"], [7, 4, "hierro", "azufre", "el sulfuro de hierro"], [3, 2, "magnesio", "oxígeno", "el óxido de magnesio"], [3, 8, "carbono", "oxígeno", "el dióxido de carbono"], [23, 35.5, "sodio", "cloro", "el cloruro de sodio"], [2, 1, "cobre", "azufre", "el sulfuro de cobre(II)"]];
  const [a, b, A, Bn, C] = R.pick(cps), t = R.r();
  if (t < 0.3) {   // mezclas en exceso: ¿qué sobra?
    const k1 = R.int(3, 8), k2 = R.pick([k1 - 2, k1 - 1, k1 + 1, k1 + 2]);
    const mA = a * k1, mB = b * k2, need = rd(mA * b / a), useA = rd(mB * a / b), sA = rd(mA - useA), sB = rd(mB - need);
    const so = S.fq9.pr_sobra, good = k1 > k2 ? so(H.dec(sA), A) : so(H.dec(sB), Bn);
    const bad = k1 > k2 ? [so(H.dec(sA), Bn), S.fq9.pr_nada, so(H.dec(rd(need - mB)), Bn)] : [so(H.dec(sB), A), S.fq9.pr_nada, so(H.dec(rd(useA - mA)), A)];
    return choice(R, S.fq9.pr_q[2](mA, A, H.dec(mB), Bn, C, a, H.dec(b)), good, bad, S.fq9.pr_s[2](a, H.dec(b), A, Bn, mA, H.dec(mB), H.dec(need), H.dec(useA), H.dec(sA), H.dec(sB), k1 > k2));
  }
  const m = a * R.int(2, 12), x = rd(m * b / a);
  if (t < 0.65) return num(S.fq9.pr_q[0](a, H.dec(b), A, Bn, m, C), x, S.fq9.pr_s[0](m, a, H.dec(b), H.dec(x), A, Bn));
  return num(S.fq9.pr_q[1](a, H.dec(b), A, Bn, m, C), rd(m + x), S.fq9.pr_s[1](m, a, H.dec(b), H.dec(x), H.dec(rd(m + x)), A, Bn));
});
def("fq9.ph", (R, S) => {
  const t = R.r();
  if (t < 0.55) return B.mixed(S.fq9.ph, R);
  if (t < 0.8) {   // cada unidad de pH, un factor 10
    const acid = R.r() < 0.7, d = R.int(1, 4), pa = acid ? R.int(1, 6 - d) : R.int(8 + d, 13), pb = acid ? pa + d : pa - d;
    return { q: S.fq9.ph_q(acid, pa, pb), kind: "int", ans: 10 ** d, sol: S.fq9.ph_s(acid, pa, pb, d, 10 ** d) };
  }
  // neutralización: ácido + base → sal + agua
  const [ha, X, xn] = R.pick(S.fq9.ACIDOS), [mo, M, c, mn] = R.pick(S.fq9.BASES.filter(b => !(X === "NO3" && b[1] === "Na")));   // «NaNO3» lleva «NaN» dentro: la prueba lo tomaría por un fallo
  const good = c === 1 ? M + X : M + (X.length > 2 ? `(${X})` : X) + "2";
  const withN = (x, n) => n === 1 ? x : x.length > 2 ? `(${x})${n}` : x + n;
  const bad = c === 1 ? [M + withN(X, 2), M + "2" + X, mo] : [M + X, M + "2" + X, mo];
  return choice(R, S.fq9.neu_q(sub(ha), sub(mo), c), sub(good), bad.map(sub), S.fq9.neu_s(sub(ha), sub(mo), M, c, X, sub(good), mn, xn));
});
def("fq9.emisiones", (R, S, H) => {
  const E = S.fq9.em, k = R.int(0, 3);
  if (k === 0) {   // un viaje: litros y CO₂
    const truck = R.r() < 0.2, [comb, f] = truck ? [E.comb[1], 2.6] : R.pick([[E.comb[0], 2.32], [E.comb[1], 2.6]]), L100 = truck ? R.pick([25, 30, 35]) : R.pick([4, 5, 6, 7, 8]);
    const km = R.pick([100, 200, 300, 500, 800, 1000, 15000]), L = rd(km * L100 / 100), r = rd(L * f, 1);
    return num(E.q0(L100, comb, km, H.dec(f), truck), r, E.s0(km, L100, H.dec(L), H.dec(f), H.dec(r)), Math.max(0.06, r * 0.01));
  }
  if (k === 1) {   // carbón: 12 g de C dan 44 g de CO₂
    const kg = R.pick([1, 2, 3, 5, 6, 10, 12, 30]), r = rd(kg * 44 / 12, 2);
    return num(E.q1(kg), r, E.s1(kg, H.dec(r)));
  }
  if (k === 2) {   // gas: metano (16 → 44) o butano (2·58 → 8·44)
    const [gas, a, b] = R.pick([[E.gases[0], 16, 44], [E.gases[1], 116, 352]]), kg = R.pick([2, 4, 5, 8, 10, 12, 16]), r = rd(kg * b / a, 2);
    return num(E.q2(gas, kg, a, b), r, E.s2(a, b, kg, H.dec(r)));
  }
  const D = [[1960, 317], [1970, 326], [1980, 339], [1990, 354], [2000, 370], [2010, 390], [2020, 414], [2023, 421]];
  const i = R.int(0, D.length - 2), j = R.int(i + 1, D.length - 1), [y1, p1] = D[i], [y2, p2] = D[j], r = rd((p2 - p1) / p1 * 100, 1);
  return num(E.q3(y1, p1, y2, p2), r, E.s3(p2, p1, p2 - p1, H.dec(r)), Math.max(0.06, r * 0.01));
});

// ── Unidad 6 ──
def("fq9.mrua", (R, S, H) => {
  const k = R.int(0, 7);
  if (k === 0) { const v0 = R.int(0, 15), a = R.int(1, 5), t = R.int(2, 10), r = v0 * t + a * t * t / 2; return num(S.fq9.mr_q[0](v0, a, t), r, S.fq9.mr_s[0](v0, t, a, H.dec(r))); }
  if (k === 1) { const v0 = R.pick([10, 15, 20, 25, 30]), a = R.pick([2, 4, 5, 8]), r = rd(v0 * v0 / (2 * a)); return num(S.fq9.mr_q[1](v0, a), r, S.fq9.mr_s[1](v0, a, H.dec(r), r === v0 * v0 / (2 * a))); }
  if (k === 2) { const t = R.int(1, 5), r = rd(4.9 * t * t); return num(S.fq9.mr_q[2](t), r, S.fq9.mr_s[2](t, H.dec(r))); }
  if (k === 3) { const v0 = R.int(0, 20), t = R.int(2, 10), a = R.int(1, 4), v = v0 + a * t; return num(S.fq9.mr_q[3](v0, v, t), a, S.fq9.mr_s[3](v, v0, t, a)); }
  if (k === 4) { const v0 = R.pick([10, 12, 15, 20, 24, 25, 30]), a = R.pick([2, 3, 4, 5, 6, 8]), r = rd(v0 / a); return num(S.fq9.mr_q[4](v0, a), r, S.fq9.mr_s[4](v0, a, H.dec(r), r === v0 / a)); }
  if (k === 5) { const h = R.pick([5, 10, 20, 30, 45, 50, 80, 100]), t2 = rd(h / 4.9, 2), r = rd(Math.sqrt(h / 4.9)); return num(S.fq9.mr_q[5](h), r, S.fq9.mr_s[5](h, H.dec(t2), H.dec(r)), 0.02); }
  if (k === 6) { const n = R.int(1, 5), h = rdD(4.9 * n * n, 1), v = rd(9.8 * n, 1); return num(S.fq9.mr_q[6](H.dec(h)), v, S.fq9.mr_s[6](H.dec(h), n, H.dec(v))); }
  const v0 = R.int(5, 20), r = rd(v0 * v0 / 19.6); return num(S.fq9.mr_q[7](v0), r, S.fq9.mr_s[7](v0, v0 * v0, H.dec(r), r === v0 * v0 / 19.6), Math.max(0.02, r * 0.01));
});
def("fq9.fma", (R, S, H) => {
  const k = R.int(0, 2), m = R.pick([2, 5, 10, 20, 50, 800, 1000, 1200]), a = R.pick([0.5, 1, 2, 3, 4, 5]);
  if (k === 0) return num(S.fq9.fm_q[0](m, H.dec(a)), m * a, S.fq9.fm_s[0](m, H.dec(a), H.dec(m * a)));
  if (k === 1) return num(S.fq9.fm_q[1](H.dec(m * a), m), a, S.fq9.fm_s[1](H.dec(m * a), m, H.dec(a)));
  const mm = R.pick([10, 20, 25, 50]), Rz = R.int(1, 8) * 10, F = Rz + mm * R.int(1, 4); return num(S.fq9.fm_q[2](F, Rz, mm), (F - Rz) / mm, S.fq9.fm_s[2](F, Rz, mm, H.dec((F - Rz) / mm)));
});
def("fq9.resultante", (R, S, H) => {
  const T = S.fq9.rs, k = R.int(0, 3);
  if (k === 0) {   // misma dirección: mismo sentido o sentidos opuestos
    const [ctx, same] = R.pick(T.ctx0), F1 = R.int(3, 18) * 50, F2 = (x => x === F1 ? x + 50 : x)(R.int(2, 15) * 50);
    const [Fa, Fb] = same ? [F1, F2] : [Math.max(F1, F2), Math.min(F1, F2)], r = same ? Fa + Fb : Fa - Fb;   // con sentidos opuestos, primero la mayor (el motor, el empujón)
    return num(T.q0(ctx, Fa, Fb), r, T.s0(same, Fa, Fb, r));
  }
  if (k === 1) {   // perpendiculares: Pitágoras
    const [a, b, c] = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]]), f = R.pick([1, 10, 100]);
    const F1 = a * f, F2 = b * f, sw = R.r() < 0.5;
    return num(T.q1(R.pick(T.ctx1), sw ? F2 : F1, sw ? F1 : F2), c * f, T.s1(sw ? F2 : F1, sw ? F1 : F2, H.n(F1 * F1 + F2 * F2), c * f));
  }
  const m = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 8, 10, 12]), P = rd(m * 9.8, 2);
  if (k === 2) return num(T.q2(R.pick(T.ctx2), H.dec(m)), P, T.s2(H.dec(m), H.dec(P)));
  return num(T.q3(R.pick(T.ctx3), H.dec(m)), P, T.s3(H.dec(m), H.dec(P)));
});
def("fq9.detencion", (R, S, H) => {
  // velocidades con m/s exactos: coches y motos; bicis y patinetes, más despacio y con frenadas suaves
  const [veh, vs, as] = R.pick(S.fq9.de_veh), v = R.pick(vs), ms = v / 3.6, tr = R.pick([0.5, 1, 1.5, 2, 3]), a = R.pick(as);
  const dr = rd(ms * tr), df = rd(ms * ms / (2 * a)), tot = rd(dr + df);
  return num(S.fq9.de_q(veh, v, H.dec(tr), a), tot, S.fq9.de_s(v, H.dec(ms), H.dec(tr), a, H.dec(dr), H.dec(df), H.dec(tot)), Math.max(0.2, tot * 0.01));
});

// ── Unidad 7 ──
def("fq9.gravitacion", (R, S, H) => {
  const k = R.int(0, 2);
  if (k === 0) { const F = R.pick([36, 72, 100, 144, 200, 400, 900]), q = R.pick([2, 3, 4, 5]), r = rd(F / (q * q)); return num(S.fq9.gr_q[0](F, q), r, S.fq9.gr_s[0](F, q, H.dec(r))); }
  if (k === 1) { const F = R.pick([5, 10, 12, 20, 50]), a = R.int(2, 4), b = R.int(1, 3); return num(S.fq9.gr_q[1](F, a, b), F * a * b, S.fq9.gr_s[1](F, a, b, F * a * b)); }
  const m = R.int(50, 100), g = R.pick([1.6, 3.7, 9.8, 24.8]), r = rd(m * g); return num(S.fq9.gr_q[2](m, H.dec(g)), r, S.fq9.gr_s[2](m, H.dec(g), H.dec(r)));
});
def("fq9.coulomb", (R, S, H) => {
  const C = S.fq9.co, t = R.r();
  if (t < 0.15) {   // contar electrones
    const [qv, unit, pe] = R.pick([[1.6, "nC", -9], [3.2, "nC", -9], [4.8, "nC", -9], [8, "nC", -9], [16, "nC", -9], [0.8, "nC", -9], [6.4, "nC", -9], [1, "µC", -6], [2, "µC", -6], [0.32, "µC", -6]]);
    const neg = R.r() < 0.6, quo = rd(qv / 1.6, 4), [m, e] = sci(qv / 1.6 * 10 ** (pe + 19));
    return { q: C.qe(neg, H.dec(qv), unit, sup(pe)), kind: "fields", fields: sciFields(S, H, m, e), sol: C.se(neg, H.dec(qv), unit, sup(pe), H.dec(quo), sup(pe + 19), H.dec(m), sup(e), quo >= 10 || quo < 1) };
  }
  if (t < 0.3) {   // proporciones
    const F = R.pick([2, 3, 4, 6, 8, 12]), [txt, f, why] = R.pick(C.prop);
    return num(C.qp(F, R.r() < 0.5, txt), rd(F * f, 3), C.sp(why, F, H.dec(f), H.dec(rd(F * f, 3))));
  }
  const q1 = R.int(1, 9) * R.pick([1, -1]), q2 = R.int(1, 9) * R.pick([1, -1]), dm = R.pick([0.1, 0.2, 0.3, 0.5, 1, 2]), cm = dm < 1 && R.r() < 0.5;
  const a1 = Math.abs(q1), a2 = Math.abs(q2), F = 9e9 * a1 * 1e-6 * a2 * 1e-6 / (dm * dm), r = rd(F, 4), p = 9 * a1 * a2, d2 = rd(dm * dm, 2), same = q1 * q2 > 0;
  const qs = x => (x > 0 ? "+" : "−") + Math.abs(x), dtxt = cm ? `${rd(dm * 100)} cm` : `${H.dec(dm)} m`;
  const sol = C.s(qs(q1), qs(q2), a1, a2, cm ? rd(dm * 100) : null, H.dec(dm), H.dec(r), p, H.dec(rd(p / 1000, 3)), H.dec(d2), near(sale(r), F), same);
  if (t < 0.45 && dm !== 1) {   // valor y sentido a la vez
    const w = rd(9e9 * a1 * 1e-6 * a2 * 1e-6 / dm, 4);   // error: no elevar la distancia al cuadrado
    const o = (v, s) => `${H.dec(v)} N, ${s ? C.rep : C.atr}`;
    return choice(R, C.qc(qs(q1), qs(q2), dtxt), o(r, same), [o(r, !same), o(w, same), o(w, !same)], sol);
  }
  return num(C.q(qs(q1), qs(q2), dtxt), r, sol, Math.max(1e-4, r * 0.01));
});
def("fq9.circuito", (R, S, H) => {
  const C = S.fq9.ci2, k = R.int(0, 3);
  if (k === 0) {   // serie: intensidad y tensión en cada resistencia
    // pilas y baterías reales (1,5 a 24 V) y resistencias con las que la intensidad sale con dos decimales como mucho
    const SER = []; for (const [a, b] of [[10, 20], [5, 10], [4, 8], [2, 4], [3, 6], [6, 12], [10, 40], [20, 30], [15, 45], [5, 15], [8, 12], [1, 2], [10, 50]])
      for (const v of [1.5, 3, 4.5, 6, 9, 12, 24]) if (Math.abs(v / (a + b) * 100 - Math.round(v / (a + b) * 100)) < 1e-9) SER.push([a, b, v]);
    const [R1, R2, V] = R.pick(SER), I = rd(V / (R1 + R2), 2);
    return { q: C.q0(R1, R2, H.dec(V)), kind: "fields", fields: [{ label: C.f0[0], kind: "num", ans: I, tol: 0.006, ansHtml: H.dec(I) }, { label: C.f0[1], kind: "num", ans: rd(I * R1, 2), tol: 0.011, ansHtml: H.dec(rd(I * R1, 2)) }, { label: C.f0[2], kind: "num", ans: rd(I * R2, 2), tol: 0.011, ansHtml: H.dec(rd(I * R2, 2)) }],
      sol: C.s0(R1, R2, R1 + R2, H.dec(V), H.dec(I), H.dec(rd(I * R1, 2)), H.dec(rd(I * R2, 2))) };
  }
  const pairs = [[6, 3], [10, 15], [12, 6], [20, 30], [4, 12], [10, 40], [6, 12], [30, 60], [10, 10], [20, 5], [12, 4], [18, 9], [10, 20], [3, 6], [15, 30]];
  const [R1, R2] = R.pick(pairs), L = WA.MATH.lcm(R1, R2), n1 = L / R1, n2 = L / R2, Req = rd(L / (n1 + n2), 2);
  if (k === 1) return num(C.q1(R1, R2), Req, C.s1(R1, R2, L, n1, n2, n1 + n2, H.dec(Req), Number.isInteger(L / (n1 + n2))));
  if (k === 2) {   // intensidades de cada rama y total
    const Vs = [6, 9, 12, 18, 24, 30, 36, 60].filter(v => Number.isInteger(v * 100 / R1) && Number.isInteger(v * 100 / R2)), V = Vs.length ? R.pick(Vs) : L;
    const I1 = rd(V / R1), I2 = rd(V / R2);
    return { q: C.q2(R1, R2, V), kind: "fields", fields: [{ label: C.f2[0], kind: "num", ans: I1, tol: 0.011, ansHtml: H.dec(I1) }, { label: C.f2[1], kind: "num", ans: I2, tol: 0.011, ansHtml: H.dec(I2) }, { label: C.f2[2], kind: "num", ans: rd(I1 + I2), tol: 0.011, ansHtml: H.dec(rd(I1 + I2)) }],
      sol: C.s2(V, R1, R2, H.dec(I1), H.dec(I2), H.dec(rd(I1 + I2))) };
  }
  // carga: q = I · t, con el tiempo en minutos
  const I = R.pick([0.1, 0.2, 0.5, 1, 1.5, 2, 3]), min = R.pick([1, 2, 5, 10, 15, 30]), r = rd(I * min * 60);
  return num(C.q3(H.dec(I), min), r, C.s3(min, min * 60, H.dec(I), H.dec(r)));
});
def("fq9.potencia", (R, S, H) => {
  const k = R.int(0, 4);
  if (k === 0) { const V = R.pick([4.5, 12, 230]), I = R.pick(V === 4.5 ? [0.1, 0.2, 0.3, 0.5] : [0.5, 1, 2, 4, 5, 8, 10]), r = rd(V * I); return num(S.fq9.po_q[0](H.dec(V), H.dec(I)), r, S.fq9.po_s[0](H.dec(V), H.dec(I), H.dec(r))); }
  if (k === 1) {   // energía en kWh: potencia en W y, a veces, tiempo en minutos
    const [ap, W] = R.pick(S.fq9.aparatos), big = W >= 1000, mins = R.r() < (big ? 0.7 : 0.3), t = mins ? R.pick([15, 30, 45, 90]) : R.int(1, big ? 2 : 8), h = mins ? t / 60 : t, d = R.pick([7, 30, 31]), r = rd(W / 1000 * h * d, 3);
    return num(S.fq9.po_q[1](ap, W, t, mins, d), r, S.fq9.po_s[1](W, H.dec(W / 1000), t, H.dec(h), mins, d, H.dec(r)), Math.max(0.001, r * 0.01));
  }
  if (k === 2) { const kw = R.int(10, 400), p = R.pick([0.12, 0.15, 0.18, 0.2]), r = rd(kw * p), eu = x => WA.MATH.eur(x, H, true); return exacto(Object.assign(num(S.fq9.po_q[2](kw, eu(p)), r, S.fq9.po_s[2](kw, eu(p), WA.MATH.eur(r, H))), { ansHtml: WA.MATH.eur(r, H) + " €" })); }
  if (k === 3) {   // efecto Joule, como el Ejemplo 2 de la lección
    const R0 = R.pick([23, 46, 92, 115, 230]), I = 230 / R0, r = 230 * I; return num(S.fq9.po_q[3](R0), r, S.fq9.po_s[3](R0, H.dec(I), H.dec(r)));
  }
  const R0 = R.pick([2, 5, 10, 20, 50]), I = R.pick([0.5, 1, 2, 3, 4, 5]), r = rd(I * I * R0); return num(S.fq9.po_q[4](R0, H.dec(I)), r, S.fq9.po_s[4](H.dec(I), R0, H.dec(r)));
});

// ── Unidad 8 ──
def("fq9.mecanica", (R, S, H) => {
  const k = R.int(0, 4);
  if (k === 0) { const m = R.pick([0.5, 1, 2, 5, 10, 60, 1000]), v = R.int(2, 30), r = rd(m * v * v / 2); return num(S.fq9.me_q[0](H.dec(m), v), r, S.fq9.me_s[0](H.dec(m), v, H.dec(r))); }
  if (k === 1) { const m = R.pick([0.5, 1, 2, 5, 10, 50]), h = R.int(2, 50), r = rd(m * 9.8 * h); return num(S.fq9.me_q[1](H.dec(m), h), r, S.fq9.me_s[1](H.dec(m), h, H.dec(r))); }
  if (k === 2) { const h = R.pick([5, 10, 20, 45, 80, 125]), r = rd(Math.sqrt(2 * 9.8 * h)); return num(S.fq9.me_q[2](h), r, S.fq9.me_s[2](h, H.dec(r), H.dec(rd(2 * 9.8 * h, 2)), r * r === 2 * 9.8 * h), 0.06); }
  if (k === 3) {   // de una altura a otra
    const h1 = R.pick([10, 15, 20, 25, 30, 40]), h2 = R.pick([2, 5, 10, 15].filter(x => x < h1)), half = rd(9.8 * (h1 - h2), 2), v2 = rd(2 * half, 2), r = rd(Math.sqrt(v2));
    return num(S.fq9.me_q[3](h1, h2), r, S.fq9.me_s[3](h1, h2, h1 - h2, H.dec(half), H.dec(v2), H.dec(r), r * r === v2), 0.06);
  }
  const v = R.int(2, 10), hv = rd(v * v / 2, 2), r = rd(hv / 9.8); return num(S.fq9.me_q[4](v), r, S.fq9.me_s[4](v, H.dec(hv), H.dec(r), Math.abs(r * 9.8 - hv) < 1e-9), Math.max(0.02, r * 0.01));
});
def("fq9.calor", (R, S, H) => {
  if (R.r() < 0.6) { const [sus, c] = R.pick([["agua", 4180], ["aceite", 2000], ["aluminio", 900], ["hierro", 450], ["cobre", 385]]), m = R.pick([0.2, 0.5, 1, 1.5, 2, 5]), t1 = R.pick([10, 15, 20, 25]), t2 = t1 + R.int(2, sus === "agua" ? Math.floor((100 - t1) / 5) : 16) * 5, r = rd(m * c * (t2 - t1));   // agua líquida: hasta 100 °C
    return num(S.fq9.cl_q[0](H.dec(m), sus, c, t1, t2), r, S.fq9.cl_s[0](H.dec(m), c, t2 - t1, H.dec(r))); }
  // Método de la lección: calor cedido = calor absorbido, se tacha 4180 y se resuelve la ecuación
  const m1 = R.int(1, 4), m2 = R.int(1, 4), t1 = R.pick([10, 20, 30]), t2 = R.pick([60, 70, 80, 90]), r = rd((m1 * t1 + m2 * t2) / (m1 + m2), 2);
  return num(S.fq9.cl_q[1](m1, t1, m2, t2), r, S.fq9.cl_s[1](m1, t1, m2, t2, H.dec(r), r === (m1 * t1 + m2 * t2) / (m1 + m2)));
});
def("fq9.rendimiento", (R, S, H) => {
  const k = R.int(0, 3);
  if (k === 0) { const c = R.pick([200, 400, 500, 1000, 2000]), p = R.pick([20, 25, 30, 35, 40, 60, 70, 80, 90]), u = c * p / 100; return num(S.fq9.re_q(H.n(u), H.n(c)), p, S.fq9.re_s(H.n(u), H.n(c), p)); }
  if (k === 1) {   // problema inverso: energía consumida
    const p = R.pick([20, 25, 30, 40, 50, 80]), c = R.pick([200, 400, 500, 1000, 2000, 3000]), u = c * p / 100;
    return num(S.fq9.re_q1(H.n(u), p), c, S.fq9.re_s1(H.n(u), H.dec(p / 100), H.n(c)));
  }
  if (k === 2) {   // cadena: central y red
    const p1 = R.pick([25, 30, 35, 40, 50, 60]), p2 = R.pick([5, 8, 10, 12, 20]), r = rd(p1 * (100 - p2) / 100, 2);
    return exacto(num(S.fq9.re_q2(p1, p2), r, S.fq9.re_s2(p1, 100 - p2, H.dec((100 - p2) / 100), H.dec(r)), Math.max(0.06, r * 0.005)));   // porcentaje exacto (25 · 0,95 = 23,75)
  }
  const V = R.int(1, 5), h = R.pick([50, 80, 100, 150, 200]), p = R.pick([80, 85, 90]), Ep = V * 1000 * 9.8 * h, El = Ep * p / 100, r = rd(El / 3.6e6, 3);
  return num(S.fq9.re_q3(V, h, p), r, S.fq9.re_s3(V * 1000, h, H.n(rd(Ep)), H.dec(p / 100), H.n(rd(El)), H.dec(r)), Math.max(0.002, r * 0.01));
});
def("fq9.central", (R, S) => {
  const t = R.r();
  if (t < 0.5) return B.mixed(S.fq9.central, R);
  if (t < 0.8) return B.mixed(S.fq9.renovable, R);
  const [c, good] = R.pick(S.fq9.cadenas);
  return choice(R, S.fq9.cad_q(c), good, S.fq9.cadenas.map(x => x[1]).filter(x => x !== good), S.fq9.cad_s(c, good));
});
})();
