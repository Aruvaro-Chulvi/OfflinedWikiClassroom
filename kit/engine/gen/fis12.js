/* WikiAula — Física, Grado 12 (2.º de Bachillerato): problemas numéricos y bancos.
   Textos en i18n/<lang>/fis12.js (S.fis12). */
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
const sig = (x, n = 3) => { const r = +(+x).toPrecision(n); return apunta(x, r, x, n, true); };   // n cifras significativas
const num = (q, ans, sol, tol) => ({ q, kind: "num", ans, tol: tol != null ? tol : Math.max(0.011, Math.abs(ans) * 0.01), sol });
const sci = (m, e) => `${String(m).replace(".", WA.H.ds)}${WA.H.sx()}10<sup>${e < 0 ? "−" + -e : e}</sup>`;
const rad = a => a * Math.PI / 180, deg = r => r * 180 / Math.PI;
const G0 = 6.67e-11, K = 9e9, MU = 4 * Math.PI * 1e-7, E = 1.6e-19, ME = 9.1e-31, MP = 1.67e-27, GM = 3.98e14, RT = 6.37e6;
const PL = [["la Tierra", 5.97, 24, 6.37, 6], ["Marte", 6.42, 23, 3.39, 6], ["la Luna", 7.35, 22, 1.74, 6], ["Júpiter", 1.9, 27, 6.99, 7], ["Venus", 4.87, 24, 6.05, 6]];
// Números intermedios de las soluciones: coma decimal, signo menos «−» y notación científica fuera de 0,01–9999
const dc = x => String(x).replace("-", "−").replace(".", WA.H.ds);
const sx = (x, n = 3) => {
  if (!x) return "0";
  const mk = nearR(+(+x).toPrecision(n), x) ? String : marca;   // redondeado: «≈» (ver fin)
  const e = Math.floor(Math.log10(Math.abs(x)) + 1e-9);
  if (e >= -2 && e <= 3) return mk(dc(+x.toPrecision(n)));
  let m = +(x / 10 ** e).toPrecision(n), k = e;
  if (Math.abs(m) >= 10) { m = +(m / 10).toPrecision(n); k++; }
  return mk(`${dc(m)}${WA.H.sx()}10<sup>${k < 0 ? "−" + -k : k}</sup>`);
};
const pin = c => (c === 1 ? "" : dc(c)) + "π";   // 1π → π
// Apartado numérico de un problema de varios apartados (kind: "fields")
const fn = (label, ans, rel = 0.02, abs = 0.011) => ({ label, kind: "num", ans, tol: Math.max(abs, Math.abs(ans) * rel) });
const multi = (q, fields, sol) => ({ q, kind: "fields", fields, sol });
const mix = (R, opts, k) => { const o = R.shuffle(opts.map((t, i) => [t, i])); return { opts: o.map(x => x[0]), correct: o.findIndex(x => x[1] === k) }; };
const choice = (R, q, opts, k, sol) => { const m = mix(R, opts, k); return { q, kind: "choice", opts: m.opts, correct: m.correct, sol }; };

/* ── U8 · Partículas: banco de tipos + carga de un hadrón + umbral de creación de pares ── */
def("fis12.particulas", (R, S, H) => {
  const T = S.fis12.PA, k = R.r();
  if (k < 0.55) return B.mixed(S.fis12.particulas, R);
  if (k < 0.85) {   // carga de un hadrón a partir de sus quarks
    const [qs, name] = R.pick(T.hadrones), parts = qs.split(" "), Q = parts.reduce((s, x) => s + T.carga[x], 0), r = Math.round(Q * 3) / 3;
    return num(T.carga_q(qs), r, T.carga_s(parts.map(x => T.cargaTxt[x]).join(" "), r === 0 ? "0" : (r > 0 ? "+" : "−") + Math.abs(r), name), 0.01);
  }
  const [p, m] = R.pick(T.pares), r = rd(2 * m, 1);   // umbral: energía mínima del fotón = 2mc²
  return num(T.par_q(p), r, T.par_s(p, dc(m), H.dec(r)), Math.max(0.05, r * 0.01));
});

/* ── U1 · Gravitación ── */
def("fis12.campog", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 2);
  if (k === 0) { const [n, m, me, r, re] = R.pick(PL), M = m * 10 ** me, Rr = r * 10 ** re, g = sig(G0 * M / (Rr * Rr)); return num(T.cg_q[0](n, sci(m, me), sci(r, re)), g, T.cg_s[0](sci(m, me), sci(r, re), H.dec(g))); }
  if (k === 1) { const n = R.int(1, 4), g = sig(9.8 / (n + 1) ** 2); return num(T.cg_q[1](n), g, T.cg_s[1](n, H.dec(g))); }
  const m1 = R.pick([100, 400, 900]), m2 = R.pick([100, 400, 900, 1600].filter(x => x !== m1)), d = R.pick([1, 2, 3, 4, 6]), s = Math.sqrt(m2 / m1), x = sig(d / (1 + s));
  return num(T.cg_q[2](m1, m2, d), x, T.cg_s[2](m1, m2, H.dec(rd(s, 3)), d, H.dec(rd(1 + s, 3)), H.dec(x)), 0.01);
});
// Dos masas en A(0, 0) y B(a, 0) m y un punto P encima de una de ellas: distancias de un triángulo 3-4-5, 6-8-10, 5-12-13
const TRI = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]];
const dosPuntos = R => { const [a, h] = R.pick(TRI), sobreA = R.r() < 0.5; return { a, h, P: sobreA ? [0, h] : [a, h], sobreA }; };
def("fis12.dosmasas", (R, S, H) => {
  const T = S.fis12.DM, m1 = R.pick([500, 1000, 2000, 3000, 4000]), m2 = R.pick([500, 1000, 2000, 3000, 4000]), { a, h, P, sobreA } = dosPuntos(R);
  const Q = [[0, 0], [a, 0]], ms = [m1, m2], steps = [];
  let gx = 0, gy = 0;
  Q.forEach((q, i) => {
    const dx = q[0] - P[0], dy = q[1] - P[1], r = Math.hypot(dx, dy), g = G0 * ms[i] / (r * r), ux = dx / r, uy = dy / r;
    gx += g * ux; gy += g * uy;
    steps.push(T.paso(i + 1, ms[i], dc(r), sx(g / 1e-9), dc(dx), dc(dy), dc(rd(ux, 3)), dc(rd(uy, 3))));
  });
  const ax = rd(gx / 1e-9, 2), ay = rd(gy / 1e-9, 2);
  return multi(T.q(m1, m2, a, P[0], P[1]), [fn(T.fx, ax, 0.02, 0.02), fn(T.fy, ay, 0.02, 0.02)], steps.join(" ") + " " + T.suma(dc(ax), dc(ay), eq(gx / 1e-9, ax), eq(gy / 1e-9, ay)));
});
def("fis12.energiag", (R, S, H) => {
  const T = S.fis12, [n, m, me, r, re] = R.pick(PL), M = m * 10 ** me, Rr = r * 10 ** re;
  if (R.r() < 0.6) { const vms = Math.sqrt(2 * G0 * M / Rr), v = sig(vms / 1000); return num(T.eg_q[0](n, sci(m, me), sci(r, re)), v, T.eg_s[0](sci(m, me), sci(r, re), cierra(H, rd(vms, 0)), H.dec(v))); }
  const V = sig(-G0 * M / Rr / 1e6); return num(T.eg_q[1](n, sci(m, me), sci(r, re)), V, T.eg_s[1](sci(m, me), sci(r, re), sx(-G0 * M / Rr), Math.abs(V) >= 1000 ? `${dc(sig(V / 1000))}${WA.H.sx()}10<sup>3</sup>` : H.dec(V)));
});
def("fis12.trabajog", (R, S, H) => {   // potencial de dos masas en dos puntos y trabajo del campo entre ellos
  const T = S.fis12.TG, m1 = R.pick([500, 1000, 2000, 3000]), m2 = R.pick([500, 1000, 2000, 3000]), { a, h, P, sobreA } = dosPuntos(R), m = R.pick([1, 2, 5, 10]);
  const Qp = R.r() < 0.5 ? [a / 2, 0] : (sobreA ? [a, h] : [0, h]), pts = [[0, 0], [a, 0]], ms = [m1, m2];
  const pot = X => pts.reduce((s, q, i) => s - G0 * ms[i] / Math.hypot(q[0] - X[0], q[1] - X[1]), 0);
  const dist = X => pts.map(q => dc(rd(Math.hypot(q[0] - X[0], q[1] - X[1]), 3)));
  const vp = rd(pot(P) / 1e-8, 3), vq = rd(pot(Qp) / 1e-8, 3), we = m * (pot(P) - pot(Qp)) / 1e-8, w = apunta(we, rd(m * (vp - vq), 3), we, 3);   // w, de V redondeados: apuntado respecto al de verdad (resultado con 3 cifras)
  const [p1, p2] = dist(P), [q1, q2] = dist(Qp);
  return multi(T.q(m1, m2, a, P.map(dc), Qp.map(dc), m), [fn(T.fp, vp, 0.02, 0.01), fn(T.fq, vq, 0.02, 0.01), fn(T.fw, w, 0.03, 0.02)],
    T.s(m1, m2, p1, p2, q1, q2, dc(vp), dc(vq), m, dc(w), [eq(pot(P) / 1e-8, vp), eq(pot(Qp) / 1e-8, vq), eq(we, w)]));
});
def("fis12.satelite", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 2);
  if (k < 2) { const h = R.pick([300, 400, 600, 800, 1000, 2000, 20200]), r = RT + h * 1000;
    const rs = sci(rd(r / 1e6, 3), 6);
    if (k === 0) { const vms = rd(Math.sqrt(GM / r), 0), v = rd(vms / 1000); return num(T.sa_q[0](H.n(h)), v, T.sa_s[0](H.n(h), rs, H.n(vms), H.dec(v))); }
    const ts = rd(2 * Math.PI * Math.sqrt(r ** 3 / GM), 0), t = rd(ts / 60, 1); return num(T.sa_q[1](H.n(h)), t, T.sa_s[1](H.n(h), rs, H.n(ts), H.dec(t)), Math.max(0.5, t * 0.01)); }
  // v_p no se elige al azar: la fijan r_p y r_a (energía + momento angular): v_p = 29,78·√(2r_a / (r_p(r_p + r_a))) km/s, r en UA
  const rp = R.pick([0.5, 0.6, 1]), ra = R.pick([5, 10, 20, 30]), vp = rd(29.78 * Math.sqrt(2 * ra / (rp * (rp + ra))), 1), r = rd(rp * vp / ra, 3);
  return num(T.sa_q[2](H.dec(rp), H.dec(vp), ra), r, T.sa_s[2](H.dec(rp), H.dec(vp), ra, H.dec(r)), Math.max(0.011, r * 0.01));
});
def("fis12.orbita", (R, S, H) => {   // problema encadenado de órbitas: velocidad, periodo y energías
  const T = S.fis12.OR, k = R.int(0, 2), m = R.pick([100, 200, 500, 1000, 2000]), hs = [300, 500, 800, 1000, 2000, 5000, 20200, 35800];
  const rOf = h => RT + h * 1000, Em = r => -GM * m / (2 * r);
  if (k === 0) {
    const h = R.pick(hs), r = rOf(h), v = Math.sqrt(GM / r), t = 2 * Math.PI * r / v, e = Em(r);
    const av = rd(v / 1000, 2), at = rd(t / 60, 1), ae = rd(e / 1e9, 2);
    return multi(T.q0(m, H.n(h)), [fn(T.fv, av, 0.01), fn(T.ft, at, 0.01, 0.5), fn(T.fe, ae, 0.02)],
      T.s0(H.n(h), sx(r), H.n(rd(v, 0)), H.dec(av), H.n(rd(t, 0)), H.dec(at), m, sx(e), H.dec(ae)));
  }
  if (k === 1) {
    const i = R.int(0, hs.length - 2), h1 = hs[i], h2 = R.pick(hs.slice(i + 1)), e1 = Em(rOf(h1)), e2 = Em(rOf(h2));
    const a1 = rd(e1 / 1e9, 2), a2 = rd(e2 / 1e9, 2), d = rd((e2 - e1) / 1e9, 2);
    return multi(T.q1(m, H.n(h1), H.n(h2)), [fn(T.fe1, a1, 0.02), fn(T.fe2, a2, 0.02), fn(T.fde, d, 0.03, 0.02)],
      T.s1(m, sx(rOf(h1)), sx(rOf(h2)), dc(a1), dc(a2), dc(d)));
  }
  const h = R.pick(hs.slice(0, 6)), r = rOf(h), de = GM * m * (1 / RT - 1 / (2 * r)), vo = Math.sqrt(GM / r), ve = Math.SQRT2 * vo;
  const ad = rd(de / 1e9, 1), av = rd(ve / 1000, 2);
  return multi(T.q2(m, H.n(h)), [fn(T.fsu, ad, 0.02, 0.1), fn(T.fve, av, 0.01)], T.s2(m, sx(r), dc(ad), dc(rd(vo / 1000, 2)), dc(av)));
});
def("fis12.hubble", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 3);
  if (k === 0) { const d = R.pick([10, 20, 50, 80, 100, 150, 200, 300, 500, 1000]), h0 = R.pick([68, 70, 72]); return num(T.hu_q[0](d, h0), h0 * d, T.hu_s[0](h0, d, H.n(h0 * d))); }
  if (k === 1) { const v = R.pick([700, 1400, 3500, 5600, 7000, 14000, 21000, 28000]), r = rd(v / 70, 1); return num(T.hu_q[1](H.n(v)), r, T.hu_s[1](H.n(v), H.dec(r))); }
  if (k === 2) {   // corrimiento al rojo → velocidad → distancia
    const [raya, l0] = R.pick(T.rayas), z0 = R.pick([0.01, 0.015, 0.02, 0.025, 0.03, 0.04, 0.05]), l = rd(l0 * (1 + z0), 1);
    const z = (l - l0) / l0, v = z * 3e5, d = v / 70, az = rd(z, 4), avv = apunta(v, Math.round(v / 10) * 10, v, 0), ad = rd(d, 0);
    return multi(T.hu_zq(raya, dc(l0), dc(l)), [fn("z", az, 0.03, 0.0005), fn(T.hu_fv, avv, 0.02), fn(T.hu_fd, ad, 0.02, 1)], T.hu_zs(dc(l), dc(l0), H.dec(az), H.n(avv), H.n(ad)));
  }
  const h0 = R.pick([67, 68, 69, 70, 71, 72, 73, 74]), s = 3.09e19 / h0, y = rd(s / 3.16e7 / 1e9, 1);   // edad 1/H₀
  return num(T.hu_eq(h0), y, T.hu_es(h0, sx(s), dc(y)), 0.15);
});

/* ── U2 · Campo eléctrico ── */
def("fis12.campoe", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 4);
  if (k === 0) { const q = R.pick([1, 2, 3, 4, 5, 8]), r = R.pick([0.1, 0.2, 0.3, 0.5]), e = rd(K * q * 1e-6 / (r * r) / 1000); return num(T.ce_q[0](q, H.dec(r)), e, T.ce_s[0](q, H.dec(r), H.dec(e))); }
  if (k === 1) { const q1 = R.pick([1, 2, 3, 5]), q2 = R.pick([2, 4, 5, 6]), r = R.pick([0.1, 0.2, 0.3, 0.5]), F = rd(K * q1 * q2 * 1e-12 / (r * r), 3); return num(T.ce_q[1](q1, q2, H.dec(r)), F, T.ce_s[1](q1, q2, H.dec(r), H.dec(F)), Math.max(0.002, F * 0.01)); }
  if (k === 2) { const q = R.pick([1, 2, 4, 5]), d = R.pick([0.2, 0.4, 0.6]), e1 = rd(K * q * 1e-6 / (d * d / 4) / 1000), r = rd(2 * e1); return num(T.ce_q[2](q, H.dec(d)), r, T.ce_s[2](q, H.dec(d / 2), H.dec(e1), H.dec(r))); }
  if (k === 3) {   // punto de campo nulo entre dos cargas del mismo signo
    const [q1, q2] = R.pick([[1, 4], [1, 9], [4, 9], [2, 8], [1, 16], [3, 12], [9, 16], [4, 25], [2, 18], [5, 20]]), d = R.pick([0.2, 0.3, 0.4, 0.6, 1]), s = Math.sqrt(q2 / q1), x = rd(d / (1 + s), 3);
    return num(T.ce_q[3](q1, q2, H.dec(d)), x, T.ce_s[3](q1, q2, H.dec(rd(s, 3)), H.dec(d), H.dec(rd(1 + s, 3)), H.dec(x)), 0.005);
  }
  const m = R.pick([1, 2, 5]), q = R.pick([1, 2, 4, 5]), th = R.pick([5, 10, 15, 20, 30]), t = Math.tan(rad(th)), e = rd(m * 1e-3 * 9.8 * t / (q * 1e-6), 0);   // péndulo eléctrico
  return num(T.ce_q[4](m, q, th), e, T.ce_s[4](th, m, dc(rd(t, 3)), q, H.n(e)), Math.max(1, e * 0.01));
});
def("fis12.doscargas", (R, S, H) => {   // campo de dos cargas en un punto fuera de la recta que las une
  const T = S.fis12.DC, sg = () => (R.r() < 0.5 ? -1 : 1), q1 = sg() * R.pick([1, 2, 3, 4, 5]), q2 = sg() * R.pick([1, 2, 3, 4, 5]);
  const [a0, h0] = R.pick(TRI), f = R.pick([5, 10]), a = a0 * f / 100, h = h0 * f / 100, sobre1 = R.r() < 0.5, P = sobre1 ? [0, h] : [a, h];
  const Q = [[0, 0], [a, 0]], qs = [q1, q2], steps = [];
  let ex = 0, ey = 0;
  Q.forEach((c, i) => {
    const dx = P[0] - c[0], dy = P[1] - c[1], r = Math.hypot(dx, dy), e = K * Math.abs(qs[i]) * 1e-6 / (r * r), sgn = Math.sign(qs[i]), ux = sgn * dx / r, uy = sgn * dy / r;
    ex += e * ux; ey += e * uy;
    steps.push(T.paso(i + 1, dc(qs[i]).replace(/^(\d)/, "+$1"), dc(rd(r, 3)), dc(rd(e / 1000, 1)), qs[i] > 0, dc(rd(ux, 3)), dc(rd(uy, 3)), eq(e / 1000, rd(e / 1000, 1))));
  });
  const ax = rd(ex / 1000, 1), ay = rd(ey / 1000, 1);
  return multi(T.q(dc(q1).replace(/^(\d)/, "+$1"), dc(q2).replace(/^(\d)/, "+$1"), dc(a), dc(P[0]), dc(P[1])), [fn(T.fx, ax, 0.02, 0.15), fn(T.fy, ay, 0.02, 0.15)], steps.join(" ") + " " + T.suma(dc(ax), dc(ay), eq(ex / 1000, ax), eq(ey / 1000, ay)));
});
def("fis12.potencial", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 3);
  if (k === 0) { const q = R.pick([1, 2, 3, 5]), r = R.pick([0.1, 0.2, 0.3, 0.5]), v = rd(K * q * 1e-6 / r / 1000); return num(T.po_q[0](q, H.dec(r)), v, T.po_s[0](q, H.dec(r), H.dec(v))); }
  if (k === 1) { const V = R.pick([10, 100, 500, 1000, 2000]), v = rd(Math.sqrt(2 * E * V / ME) / 1e6); return num(T.po_q[1](V), v, T.po_s[1](V, H.dec(v))); }
  if (k === 2) { const V = R.pick([100, 200, 300, 600]), d = R.pick([1, 2, 3, 5]), ex = V / (d / 100), e = Math.round(ex); return num(T.po_q[2](V, d), e, T.po_s[2](V, H.dec(d / 100), H.n(e), e !== ex)); }
  const Q = R.pick([2, 5, 10]), q = R.pick([1, 2, 3]), r1 = R.pick([0.1, 0.2]), r2 = R.pick([0.5, 1]), va = K * Q * 1e-6 / r1, vb = K * Q * 1e-6 / r2, w = rd(q * 1e-6 * (va - vb) * 1000, 3);
  return num(T.po_q[3](Q, q, H.dec(r1), H.dec(r2)), w, T.po_s[3](Q, H.dec(r1), H.dec(r2), H.dec(rd(va / 1000)), H.dec(rd(vb / 1000)), q, H.dec(rd((va - vb) / 1000, 1)), H.dec(w)));
});
def("fis12.energiae", (R, S, H) => {   // potencial de dos cargas y trabajo; distancia mínima; energía de tres cargas; velocidad
  const T = S.fis12.EE, k = R.int(0, 3), sg = () => (R.r() < 0.5 ? -1 : 1), pm = x => dc(x).replace(/^(\d)/, "+$1");
  if (k === 0) {
    const q1 = sg() * R.pick([1, 2, 3, 4]), q2 = sg() * R.pick([1, 2, 3, 4]), q3 = R.pick([1, 2, 5]), [a0, h0] = R.pick(TRI), a = a0 / 10, h = h0 / 10, r2 = Math.hypot(a, h);
    const v1 = K * q1 * 1e-6 / h, v2 = K * q2 * 1e-6 / r2, v = rd((v1 + v2) / 1000, 1), w = rd(q3 * 1e-6 * (v1 + v2) * 1000, 2);
    return multi(T.q0(pm(q1), pm(q2), dc(a), dc(h), q3), [fn(T.fv, v, 0.02, 0.15), fn(T.fw, w, 0.02, 0.02)], T.s0(pm(q1), dc(h), sx(v1 / 1000), pm(q2), dc(rd(r2, 3)), sx(v2 / 1000), dc(v), q3, dc(w), [eq((v1 + v2) / 1000, v), eq(q3 * 1e-6 * (v1 + v2) * 1000, w)]));
  }
  if (k === 1) {   // distancia mínima de aproximación (choque de frente contra un núcleo que no se mueve)
    const [p, zp] = R.pick(T.proy), [nuc, Z] = R.pick(T.nucleos), Ec = R.pick([1, 2, 4, 5, 6, 8]), d = K * zp * Z * E * E / (Ec * 1.6e-13), r = rd(d / 1e-14, 2);
    return num(T.q1(p, Ec, nuc, Z), r, T.s1(zp, Z, Ec, dc(r), eq(d / 1e-14, r)), Math.max(0.02, r * 0.02));
  }
  if (k === 2) {   // energía de tres cargas en un triángulo equilátero
    let q;
    do q = [sg() * R.pick([1, 2, 3]), sg() * R.pick([1, 2, 3]), sg() * R.pick([1, 2, 3])]; while (q[0] * q[1] + q[0] * q[2] + q[1] * q[2] === 0);
    const L = R.pick([5, 10, 20, 30]), sum = q[0] * q[1] + q[0] * q[2] + q[1] * q[2], e = rd(K * sum * 1e-12 / (L / 100), 3);
    return num(T.q2(q.map(pm), L), e, T.s2(q.map(x => `(${pm(x)})`), dc(sum), dc(L / 100), dc(e), eq(K * sum * 1e-12 / (L / 100), e)), Math.max(0.002, Math.abs(e) * 0.02));
  }
  const Q = R.pick([1, 2, 5, 10]), ra = R.pick([1, 2, 5]), f = R.pick([2, 3, 4, 5]), rb = ra * f, va = K * Q * 1e-9 / (ra / 100), vb = K * Q * 1e-9 / (rb / 100), v = Math.sqrt(2 * E * (va - vb) / MP), r = rd(v / 1e5, 2);
  return num(T.q3(ra, Q, rb), r, T.s3(Q, ra, H.dec(rd(va, 1)), rb, H.dec(rd(vb, 1)), H.dec(rd(va - vb, 1)), dc(r)), Math.max(0.02, r * 0.01));
});
def("fis12.gauss", (R, S, H) => {
  const T = S.fis12, k = R.r();
  if (k < 0.3) { const q = R.pick([1, 2, 5, 10]), F = q * 1e-6 / 8.85e-12, r = sig(F / 1e5); return num(T.ga_q[0](q), r, T.ga_s[0](q, sx(F), H.dec(r))); }
  if (k < 0.7) { const Rr = R.pick([5, 10, 20]), q = R.pick([2, 5, 10]), r = R.pick([Rr / 2, 2 * Rr, 3 * Rr]), inside = r < Rr, e = inside ? 0 : rd(K * q * 1e-9 / (r / 100) ** 2, 1);
    return num(T.ga_q[1](Rr, q, H.dec(r)), e, T.ga_s[1](inside, q, H.dec(r / 100), H.dec(e)), inside ? 0.5 : Math.max(0.5, e * 0.01)); }
  const l = R.pick([1, 2, 5, 10]), r = R.pick([1, 2, 5, 10, 20]), e = rd(l * 1e-9 / (2 * Math.PI * 8.85e-12 * r / 100), 0);   // hilo infinito
  return num(T.ga_q[2](l, r), e, T.ga_s[2](l, H.dec(r / 100), H.n(e)), Math.max(1, e * 0.01));
});

/* ── U3 · Campo magnético ── */
// Direcciones en el dibujo: 0 +x, 1 −x, 2 +y, 3 −y, 4 sale (⊙, +z), 5 entra (⊗, −z)
const DIRV = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dirOf = v => DIRV.findIndex(d => d[0] === Math.sign(v[0]) && d[1] === Math.sign(v[1]) && d[2] === Math.sign(v[2]));
def("fis12.lorentz", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 4);
  if (k === 0) { const [p, m] = R.pick([["protón", MP], ["electrón", ME]]), v = R.pick([1, 2, 3, 5]), Bb = R.pick(p === "protón" ? [0.1, 0.2, 0.5] : [0.001, 0.002, 0.005]), r = rd(m * v * 1e6 / (E * Bb) * 100, 2);
    return num(T.lo_q[0](p, v, H.dec(Bb)), r, T.lo_s[0](sx(m), v, H.dec(Bb), sx(r / 100), H.dec(r))); }
  if (k === 1) { const Ee = R.pick([1e4, 2e4, 5e4]), Bb = R.pick([0.05, 0.1, 0.2]), r = rd(Ee / Bb / 1000); return num(T.lo_q[1](H.n(Ee), H.dec(Bb)), r, T.lo_s[1](H.n(Ee), H.dec(Bb), H.n(Ee / Bb), H.n(r))); }
  if (k === 2) { const v = R.pick([1, 2, 5]), Bb = R.pick([0.1, 0.5, 1]), F = E * v * 1e5 * Bb, r = rd(F / 1e-15, 2); return num(T.lo_q[2](v, H.dec(Bb)), r, T.lo_s[2](v, H.dec(Bb), sx(F), H.dec(r))); }   // en fN
  const L = T.LO, pos = R.r() < 0.5;
  if (k === 3) {   // ¿hacia dónde apunta la fuerza?
    const plano = R.r() < 0.6, iv = plano ? R.int(0, 3) : R.int(4, 5), ib = plano ? R.int(4, 5) : R.int(0, 3);
    const c = cross(DIRV[iv], DIRV[ib]), f = pos ? c : c.map(x => -x), jf = dirOf(f);
    return { q: L.dir_q(pos, L.dirTxt[iv], L.bTxt[ib]), kind: "choice", opts: L.dirs, correct: jf, shuffle: false,
      sol: L.dir_s(L.vec[iv], L.vec[ib], L.vec[dirOf(c)], pos, L.dirs[jf]) };
  }
  const sale = R.r() < 0.5, anti = pos ? !sale : sale;   // sentido de giro: q > 0 en un campo que entra gira en sentido antihorario
  return { q: L.giro_q(pos, sale), kind: "choice", opts: L.giros, correct: anti ? 1 : 0, shuffle: false, sol: L.giro_s(pos, sale, anti) };
});
def("fis12.corrientes", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 4);
  if (k === 0) { const I = R.pick([2, 5, 10, 20]), d = R.pick([1, 2, 5, 10]), b = rd(MU * I / (2 * Math.PI * d / 100) * 1e6, 3); return num(T.co_q[0](I, d), b, T.co_s[0](I, H.dec(d / 100), H.dec(b))); }
  if (k === 1) { const N = R.pick([500, 1000, 2000]), L = R.pick([10, 20, 50]), I = R.pick([1, 2, 3]), b = rd(MU * N / (L / 100) * I * 1000, 3); return num(T.co_q[1](N, L, I), b, T.co_s[1](N, I, H.dec(L / 100), H.dec(b))); }
  if (k === 2) { const I = R.pick([1, 2, 5, 10]), Rr = R.pick([2, 5, 10]), b = rd(MU * I / (2 * Rr / 100) * 1e6, 2); return num(T.co_q[2](I, Rr), b, T.co_s[2](I, H.dec(Rr / 100), H.dec(b))); }
  if (k === 3) { const I1 = R.pick([5, 10, 20]), I2 = R.pick([5, 10, 20]), d = R.pick([1, 2, 5]), r = rd(MU * I1 * I2 / (2 * Math.PI * d / 100) * 1000, 3); return num(T.co_q[3](I1, I2, d), r, T.co_s[3](I1, I2, H.dec(d / 100), H.dec(r))); }
  const N = R.pick([200, 500, 1000, 2000]), I = R.pick([0.5, 1, 2, 5]), r = R.pick([5, 8, 10, 20]), b = rd(MU * N * I / (2 * Math.PI * r / 100) * 1000, 3);   // toroide
  return num(T.co_q[4](N, H.dec(I), r), b, T.co_s[4](N, H.dec(I), H.dec(r / 100), H.dec(b)));
});
def("fis12.doshilos", (R, S, H) => {   // campo de dos hilos en un punto de la recta que los une y fuerza sobre una carga que pasa
  const T = S.fis12.DH, d = R.pick([4, 6, 10, 20]), I1 = R.pick([2, 5, 10, 20]), I2 = R.pick([2, 5, 10, 20]), s2 = R.r() < 0.5 ? 1 : -1;
  const p = R.pick([d / 2, d / 4, 3 * d / 4, -d / 2, 3 * d / 2]), pos = R.r() < 0.5, v = R.pick([1, 2, 5]);
  const hilos = [[0, I1, 1], [d, I2, s2]], parts = [];
  let by = 0;
  hilos.forEach(([x, I, s], i) => {
    const dx = p - x, b = 2e-7 * I / (Math.abs(dx) / 100) * 1e6, sy = s * Math.sign(dx);
    by += sy * b;
    parts.push(T.paso(i + 1, I, dc(Math.abs(dx) / 100), dc(rd(b, 2)), dx > 0, s > 0, sy > 0, eq(b, rd(b, 2))));
  });
  const ab = rd(by, 2), fxe = -(pos ? 1 : -1) * E * v * 1e5 * by * 1e-6 / 1e-18, fx = rd(fxe, 2);
  const lugar = p > 0 && p < d ? 0 : p < 0 ? 1 : 2;
  return multi(T.q(d, I1, I2, s2 > 0, dc(Math.abs(p)), dc(Math.abs(d - p)), lugar, pos, v), [fn(T.fb, ab, 0.02, 0.1), fn(T.ff, fx, 0.02, 0.05)],
    parts.join(" ") + " " + T.suma(dc(ab), pos, v, dc(fx), [eq(by, ab), eq(fxe, fx)]));
});

/* ── U4 · Inducción ── */
def("fis12.faraday", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 6);
  if (k === 0) { const N = R.pick([50, 100, 200, 500]), Sc = R.pick([10, 20, 50]), Bb = R.pick([0.1, 0.2, 0.5]), t = R.pick([0.05, 0.1, 0.2]), r = rd(N * Bb * Sc * 1e-4 / t, 3);
    return num(T.fa_q[0](N, Sc, H.dec(Bb), H.dec(t)), r, T.fa_s[0](H.dec(Bb), dc(Sc * 1e-4), sx(Bb * Sc * 1e-4), N, H.dec(t), H.dec(r))); }
  if (k < 3) { const Bb = R.pick([0.2, 0.4, 0.5, 1]), L = R.pick([0.2, 0.5, 1]), v = R.pick([2, 3, 5, 10]), e = rd(Bb * L * v, 3);
    if (k === 1) return num(T.fa_q[1](H.dec(Bb), H.dec(L), v), e, T.fa_s[1](H.dec(Bb), H.dec(L), v, H.dec(e)));
    const Rr = R.pick([1, 2, 5]), r = rd(e / Rr, 3); return num(T.fa_q[2](H.dec(Bb), H.dec(L), v, Rr), r, T.fa_s[2](H.dec(Bb), H.dec(L), v, H.dec(e), Rr, H.dec(r))); }
  const F = T.FA;
  if (k === 3) {   // sentido de la corriente inducida (Lenz)
    const hacia = R.r() < 0.5, c = R.int(0, F.causas.length - 1), [txt, cambio] = F.causas[c];   // cambio: +1 aumenta, −1 disminuye, 0 no cambia
    const correct = cambio === 0 ? 2 : (cambio > 0) === hacia ? 0 : 1;   // flujo hacia ti que aumenta ⇒ campo inducido se aleja ⇒ horario
    return { q: F.sen_q(hacia, txt), kind: "choice", opts: F.sentidos, correct, shuffle: false, sol: F.sen_s(hacia, cambio, correct) };
  }
  const N = R.pick([10, 50, 100, 200]), Sc = R.pick([20, 50, 100, 200]), Sm = Sc * 1e-4;
  if (k === 4) {   // B(t) = a ± bt
    const a = R.pick([0.2, 0.5, 0.8, 1]), b = R.pick([0.02, 0.05, 0.1, 0.2]), sube = R.r() < 0.5, r = rd(N * Sm * b, 4);
    return num(F.bt_q(N, Sc, H.dec(a), sube ? "+" : "−", H.dec(b)), r, F.bt_s(H.dec(a), sube ? "+" : "−", H.dec(b), dc(Sm), N, sube, H.dec(r)), Math.max(0.0005, r * 0.01));
  }
  if (k === 5) {   // campo sinusoidal: fem máxima N·S·B₀·ω
    const b0 = R.pick([0.01, 0.02, 0.05, 0.1]), f = R.pick([50, 60, 100]), w = 2 * Math.PI * f, r = rd(N * Sm * b0 * w, 3);
    return num(F.sin_q(N, Sc, H.dec(b0), f), r, F.sin_s(f, H.dec(rd(w, 1)), N, dc(Sm), H.dec(b0), H.dec(r)), Math.max(0.005, r * 0.01));
  }
  const Bb = R.pick([0.1, 0.2, 0.5]), t = R.pick([0.01, 0.02, 0.05, 0.1]), r = rd(N * Bb * Sm / t, 3);   // la espira gira 90° (de perpendicular a paralela)
  return num(F.giro_q(N, Sc, H.dec(Bb), H.dec(t)), r, F.giro_s(H.dec(Bb), dc(Sm), sx(Bb * Sm), N, H.dec(t), H.dec(r)), Math.max(0.005, r * 0.01));
});
def("fis12.varilla", (R, S, H) => {   // varilla sobre raíles: fem, corriente, fuerza que la frena y potencia
  const T = S.fis12.VA, Bb = R.pick([0.2, 0.4, 0.5, 0.8, 1]), L = R.pick([0.2, 0.25, 0.5, 1]), v = R.pick([2, 3, 4, 5, 10]), Rr = R.pick([0.5, 1, 2, 4, 5]);
  const e = Bb * L * v, I = e / Rr, F = I * L * Bb, P = F * v;
  const ae = rd(e, 3), ai = rd(I, 3), af = rd(F, 4), ap = rd(P, 3);
  return multi(T.q(H.dec(L), v, H.dec(Bb), H.dec(Rr)), [fn(T.fe, ae, 0.01, 0.002), fn(T.fi, ai, 0.01, 0.002), fn(T.ff, af, 0.02, 0.0005), fn(T.fp, ap, 0.02, 0.002)],
    T.s(H.dec(Bb), H.dec(L), v, H.dec(ae), H.dec(Rr), H.dec(ai), H.dec(af), H.dec(ap)));
});
def("fis12.transformador", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 6);
  if (k === 0) { const N1 = R.pick([200, 500, 1000]), N2 = R.pick([50, 100, 2000, 5000]), V1 = R.pick([120, 230, 400]), r = rd(V1 * N2 / N1); return num(T.tr_q[0](N1, H.n(N2), V1), r, T.tr_s[0](V1, H.n(N2), N1, H.dec(r))); }
  if (k === 1) { const V1 = 230, V2 = R.pick([5, 12, 23, 46]), N1 = R.pick([460, 920, 2300]), r = rd(N1 * V2 / V1); return num(T.tr_q[1](V1, V2, N1), r, T.tr_s[1](N1, V2, V1, H.n(r)), 0.6); }
  if (k === 2) { const V1 = 230, V2 = R.pick([5, 12, 24]), I2 = R.pick([1, 2, 3, 5]), r = rd(V2 * I2 / V1, 3); return num(T.tr_q[2](V1, V2, I2), r, T.tr_s[2](V2, I2, V1, H.dec(r)), 0.002); }
  const N = R.pick([50, 100, 200]), Sm = R.pick([0.01, 0.02, 0.05]), Bb = R.pick([0.1, 0.2, 0.5]), f = 50, w = 2 * Math.PI * f, e0 = N * Bb * Sm * w;
  if (k === 3) { const r = rd(e0, 1); return num(T.tr_q[3](N, H.dec(Sm), H.dec(Bb), f), r, T.tr_s[3](N, H.dec(Bb), H.dec(Sm), H.dec(r))); }
  const X = T.TR;
  if (k === 4) {   // valor de la fem en un instante
    const tm = R.pick([1, 2, 3, 4, 6, 7]), ph = w * tm / 1000, r = rd(e0 * Math.sin(ph), 1);
    return num(X.inst_q(N, H.dec(Sm), H.dec(Bb), tm), r, X.inst_s(H.dec(rd(e0, 1)), tm, H.dec(rd(ph, 3)), H.dec(rd(Math.sin(ph), 3)), H.dec(r)), Math.max(0.2, Math.abs(r) * 0.01));
  }
  if (k === 5) { const r = rd(e0 / Math.SQRT2, 1); return num(X.ef_q(N, H.dec(Sm), H.dec(Bb)), r, X.ef_s(N, H.dec(Bb), H.dec(Sm), H.dec(rd(e0, 1)), H.dec(r)), Math.max(0.2, r * 0.01)); }   // valor eficaz
  const P = R.pick([5, 10, 20, 50]), V = R.pick([10, 20, 66, 132, 220, 400]), Rl = R.pick([2, 5, 10]), I = P * 1e3 / V, pp = I * I * Rl / 1000, pc = pp / (P * 10);   // pérdidas en la línea
  return multi(X.lin_q(P, V, Rl), [fn(X.fi, rd(I, 1), 0.01, 0.1), fn(X.fp, rd(pp, 2), 0.02, 0.01)], X.lin_s(P, V, H.dec(rd(I, 1)), Rl, H.dec(rd(pp, 2)), H.dec(rd(pc, 3))));
});

/* ── U5 · Ondas ── */
def("fis12.mas", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 5);
  if (k < 2) { const A = R.pick([0.02, 0.05, 0.1, 0.2]), w = R.pick([1, 2, 4, 10]), om = w * Math.PI, ws = pin(w);
    return k === 0 ? num(T.ma_q[0](H.dec(A), ws), rd(A * om), T.ma_s[0](ws, H.dec(A), H.dec(rd(A * om)))) : num(T.ma_q[1](H.dec(A), ws), rd(A * om * om), T.ma_s[1](ws, H.dec(A), H.dec(rd(A * om * om)))); }
  if (k === 2) { const m = R.pick([0.1, 0.25, 0.5, 1, 2]), kk = R.pick([10, 40, 100, 200]), r = rd(2 * Math.PI * Math.sqrt(m / kk), 3); return num(T.ma_q[2](H.dec(m), kk), r, T.ma_s[2](H.dec(m), kk, H.dec(r))); }
  if (k === 3) { const L = R.pick([0.25, 0.5, 1, 2, 4]), r = rd(2 * Math.PI * Math.sqrt(L / 9.8), 3); return num(T.ma_q[3](H.dec(L)), r, T.ma_s[3](H.dec(L), H.dec(r))); }
  if (k === 4) { const kk = R.pick([50, 100, 200]), A = R.pick([0.1, 0.2]), x = rd(A * R.pick([0.3, 0.5, 0.6, 0.8]), 3), e = rd(kk * A * A / 2, 3), ep = rd(kk * x * x / 2, 4), r = rd(e - ep, 3);
    return num(T.ma_q[4](kk, H.dec(A), H.dec(x)), r, T.ma_s[4](kk, H.dec(A), H.dec(e), H.dec(x), H.dec(ep), H.dec(r))); }
  // amplitud y fase inicial a partir de x₀ y v₀
  const [m, kk, w] = R.pick([[0.5, 50, 10], [2, 50, 5], [0.2, 80, 20], [1, 100, 10], [0.25, 100, 20], [4, 100, 5]]), [p, q] = R.pick([[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]]);
  const sx0 = R.r() < 0.5 ? 1 : -1, sv0 = R.r() < 0.5 ? 1 : -1, x0 = sx0 * p, v0 = rd(sv0 * q * w / 100, 2), A = Math.hypot(p, q);   // x₀ y A en cm; v₀ en m/s
  let ph = Math.atan2(x0 / A, (v0 * 100 / w) / A); if (ph < 0) ph += 2 * Math.PI;
  const af = rd(ph, 2);
  return multi(T.MA.q(H.dec(m), kk, dc(x0), dc(v0)), [fn(T.MA.fa, A, 0.01, 0.05), fn(T.MA.ff, af, 0, 0.02)],
    T.MA.s(H.dec(m), kk, w, dc(x0 / 100), dc(v0), dc(A), H.dec(rd(x0 / A, 3)), H.dec(rd(v0 * 100 / w / A, 3)), sx0 > 0, sv0 > 0, dc(af)));
});
def("fis12.ondas", (R, S, H) => {
  const T = S.fis12, A = R.pick([0.01, 0.02, 0.05, 0.1]), f = R.pick([2, 5, 10, 50]), lam = R.pick([0.5, 1, 2, 4]), kk = rd(2 / lam, 3), v = rd(lam * f, 3), w = 2 * f;
  const ws = pin(w), ks = pin(kk), menos = R.r() < 0.5, sg = menos ? "−" : "+", ecu = `y = ${H.dec(A)}·sen(${ws}t ${sg} ${ks}x)`, k = R.int(0, 6);
  if (k <= 3) {
    const ans = [lam, f, v, rd(A * 2 * Math.PI * f, 3)][k];
    return num(T.on_q(ecu, T.on_w[k]), ans, T.on_s[k]({ A: H.dec(A), w: ws, k: ks, f: H.dec(f), l: H.dec(lam), v: H.dec(v), r: H.dec(ans) }));
  }
  const O = T.ON;
  if (k === 4) {   // elongación y velocidad de vibración de un punto en un instante
    const x = R.pick([0.1, 0.125, 0.25, 0.3, 0.5]), t = R.pick([0.01, 0.02, 0.025, 0.05, 0.1]), ph = Math.PI * (w * t + (menos ? -1 : 1) * kk * x);
    const y = rd(A * Math.sin(ph) * 100, 2), vy = rd(A * w * Math.PI * Math.cos(ph), 3);
    return multi(O.pt_q(ecu, H.dec(x), H.dec(t)), [fn(O.fy, y, 0.02, 0.03), fn(O.fv, vy, 0.02, 0.005)],
      O.pt_s(ws, H.dec(t), sg, ks, H.dec(x), dc(rd(ph, 3)), H.dec(A), dc(y), dc(vy), [eq(Math.abs(ph) < 1e-9 ? 0 : ph, rd(ph, 3)), eq(Math.abs(ph) < 1e-9 ? 0 : A * Math.sin(ph) * 100, y)]));
  }
  if (k === 5) {   // diferencia de fase entre dos puntos o entre dos instantes
    if (R.r() < 0.5) { const dx = R.pick([0.05, 0.1, 0.125, 0.25, 0.5, 0.75]), r = rd(kk * Math.PI * dx, 3); return num(O.dx_q(ecu, H.dec(dx)), r, O.dx_s(ks, H.dec(dx), H.dec(rd(kk * dx, 3)), H.dec(r)), Math.max(0.005, r * 0.02)); }
    const dt = R.pick([0.005, 0.01, 0.02, 0.025]), r = rd(w * Math.PI * dt, 3); return num(O.dt_q(ecu, H.dec(dt)), r, O.dt_s(ws, H.dec(dt), dc(rd(w * dt, 3)), H.dec(r)), Math.max(0.005, r * 0.02));
  }
  const c = R.int(0, 3);   // fase inicial: 0 sube, 1 en lo más alto, 2 baja, 3 en lo más bajo → φ₀ = 0, π/2, π, 3π/2
  return { q: O.f0_q(H.dec(A), H.dec(f), H.dec(v), menos, O.estados[c]), kind: "choice", opts: O.fases, correct: c, shuffle: false, sol: O.f0_s(ws, ks, sg, H.dec(A), c) };
});
def("fis12.fenomenos", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 3);
  if (k === 0) { const l = R.pick([0.5, 1, 2]), x1 = R.pick([2, 3, 4]), c = R.int(0, 1), n = R.int(1, 3), d = c === 0 ? n * l : (2 * n + 1) * l / 2, x2 = rd(x1 + d, 2);
    return { q: T.fe_q[0](x1, H.dec(x2), H.dec(l)), kind: "choice", opts: T.fe_o, correct: c, shuffle: false, sol: T.fe_s[0](H.dec(d), H.dec(l), c, H.dec(rd(d / l, 2))) }; }
  if (k === 1) { const L = R.pick([0.5, 0.65, 1, 2]), v = R.pick([100, 200, 286, 340]), n = R.int(1, 4), r = rd(n * v / (2 * L), 1); return num(T.fe_q[1](H.dec(L), v, n), r, T.fe_s[1](n, v, H.dec(L), H.dec(r))); }
  if (k === 2) { const l = R.pick([0.4, 0.8, 1.2, 2]); return num(T.fe_q[2](H.dec(l)), l / 2, T.fe_s[2](H.dec(l), H.dec(l / 2))); }
  const L = R.pick([0.3, 0.5, 0.6, 0.85, 1, 1.7]), cerrado = R.r() < 0.5, sig2 = R.r() < 0.5, n = cerrado ? (sig2 ? 3 : 1) : (sig2 ? 2 : 1), r = rd(n * 340 / ((cerrado ? 4 : 2) * L), 1);   // tubos sonoros
  return num(T.FE.tubo_q(cerrado, H.dec(L), sig2), r, T.FE.tubo_s(cerrado, n, H.dec(L), H.dec(r)), Math.max(0.5, r * 0.01));
});
def("fis12.sonido", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 4);
  if (k === 0) { const e = R.int(2, 11); return num(T.so_q[0](e), 10 * (12 - e), T.so_s[0](e, 12 - e, 10 * (12 - e))); }
  if (k === 1) { const b = R.pick([80, 90, 100]), r1 = R.pick([1, 2, 5]), fac = R.pick([2, 10, 100]), m = fac * fac, baja = rd(10 * Math.log10(m), 1), r = rd(b - baja, 1);   // distancia ×2, ×10 o ×100
    return num(T.so_q[1](b, r1, r1 * fac), r, T.so_s[1](fac, H.n(m), b, H.dec(baja), H.dec(r), fac === 2), 0.2); }
  const f = R.pick([500, 700, 800, 1000]), v = R.pick([20, 25, 30]);
  if (k === 2) { const r = rd(f * 340 / (340 - v), 1); return num(T.so_q[2](f, v), r, T.so_s[2](f, v, H.dec(r)), 1); }
  if (k === 3) { const r = rd(f * 340 / (340 + v), 1); return num(T.so_q[3](f, v), r, T.so_s[3](f, v, H.dec(r)), 1); }
  const vo = R.pick([10, 15, 20, 25, 30]), acerca = R.r() < 0.5, r = rd(f * (340 + (acerca ? vo : -vo)) / 340, 1);   // observador en movimiento
  return num(T.so_q[4](f, vo, acerca), r, T.so_s[4](f, vo, acerca, H.dec(r)), 1);
});

/* ── U6 · Óptica ── */
def("fis12.snell", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 5), n = R.pick([1.33, 1.5, 1.6, 2.42]);
  if (k === 0) { const i = R.pick([20, 30, 45, 60]), s = Math.sin(rad(i)) / n, r = rd(deg(Math.asin(s)), 1); return num(T.sn_q[0](i, H.dec(n)), r, T.sn_s[0](i, H.dec(n), H.dec(rd(s, 3)), H.dec(r)), 0.3); }
  if (k === 1) { const s = 1 / n, r = rd(deg(Math.asin(s)), 1); return num(T.sn_q[1](H.dec(n)), r, T.sn_s[1](H.dec(n), H.dec(rd(s, 3)), H.dec(r)), 0.3); }
  if (k === 2) { const r = rd(3 / n, 3); return num(T.sn_q[2](H.dec(n)), r, T.sn_s[2](H.dec(n), H.dec(r)), 0.006); }
  const X = T.SN;
  if (k === 3) {   // entre dos medios
    const [[m1, n1], [m2, n2]] = R.pick([[["vidrio", 1.5], ["agua", 1.33]], [["agua", 1.33], ["vidrio", 1.5]], [["diamante", 2.42], ["agua", 1.33]], [["vidrio", 1.5], ["aceite", 1.47]], [["agua", 1.33], ["diamante", 2.42]]]);
    const i = R.pick([20, 25, 30, 40]), s = n1 * Math.sin(rad(i)) / n2;
    if (s >= 1) return num(X.dos_q(m1, H.dec(n1), m2, H.dec(n2), 15), rd(deg(Math.asin(n1 * Math.sin(rad(15)) / n2)), 1), X.dos_s(H.dec(n1), 15, H.dec(n2), H.dec(rd(n1 * Math.sin(rad(15)) / n2, 3)), H.dec(rd(deg(Math.asin(n1 * Math.sin(rad(15)) / n2)), 1)), n2 < n1), 0.3);
    const r = rd(deg(Math.asin(s)), 1); return num(X.dos_q(m1, H.dec(n1), m2, H.dec(n2), i), r, X.dos_s(H.dec(n1), i, H.dec(n2), H.dec(rd(s, 3)), H.dec(r), n2 < n1), 0.3);
  }
  if (k === 4) { const l0 = R.pick([400, 450, 500, 550, 600, 650, 700]), r = rd(l0 / n, 0); return num(X.lam_q(l0, H.dec(n)), r, X.lam_s(l0, H.dec(n), H.n(r)), Math.max(1, r * 0.01)); }   // λ en el medio
  const e = R.pick([1, 2, 3, 5]), i = R.pick([30, 45, 60]), nl = R.pick([1.5, 1.6]), rr = Math.asin(Math.sin(rad(i)) / nl), d = rd(e * Math.sin(rad(i) - rr) / Math.cos(rr), 2);   // lámina
  return num(X.lam2_q(e, i, H.dec(nl)), d, X.lam2_s(i, H.dec(nl), H.dec(rd(deg(rr), 1)), e, H.dec(rd(i - deg(rr), 1)), H.dec(d)), Math.max(0.01, d * 0.02));
});
def("fis12.espejo", (R, S, H) => {
  const T = S.fis12, conc = R.r() < 0.6, f = conc ? -R.pick([10, 15, 20]) : R.pick([10, 20, 50]);
  const s = -R.pick(conc ? [5, 30, 40, 45, 60] : [10, 20, 30, 50]);
  if (s === f) return num(T.es_q[0]("cóncavo", "−10", "−30", 30), -15, T.es_s[0]("−10", "−30", "−15", true));
  const spx = 1 / (1 / f - 1 / s), sp = rd(spx, 2), A = rd(-spx / s, 3), tipo = conc ? "cóncavo" : "convexo";   // A con s' sin redondear
  if (R.r() < 0.6) return num(T.es_q[0](tipo, dc(f), dc(s), -s), sp, T.es_s[0](dc(f), dc(s), H.dec(sp), sp < 0), Math.max(0.1, Math.abs(sp) * 0.01));
  return num(T.es_q[1](tipo, dc(f), dc(s), -s), A, T.es_s[1](dc(f), dc(s), H.dec(sp), H.dec(A), sp < 0, A < 0, Math.sign(Math.abs(A) - 1)), 0.02);
});
def("fis12.lente", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 2);
  if (k === 2) { const f = R.pick([-50, -25, 10, 20, 25, 50, 100]), r = rd(100 / f, 2); return num(T.le_q[2](dc(f)), r, T.le_s[2](dc(f), dc(f / 100), H.dec(r)), 0.02); }
  const f = R.pick([10, 20, -10, -20]), s = -R.pick([4, 5, 15, 30, 40, 60].filter(x => x !== f)), spx = 1 / (1 / f + 1 / s), sp = rd(spx, 2), A = rd(spx / s, 3);   // A con s' sin redondear
  if (k === 0) return num(T.le_q[0](dc(f), dc(s), -s), sp, T.le_s[0](dc(f), dc(s), H.dec(sp), sp > 0), Math.max(0.1, Math.abs(sp) * 0.01));
  return num(T.le_q[1](dc(f), dc(s), -s), A, T.le_s[1](dc(f), dc(s), H.dec(sp), H.dec(A), sp > 0, A < 0, Math.sign(Math.abs(A) - 1)), 0.02);
});
def("fis12.doslentes", (R, S, H) => {   // dos lentes separadas: la imagen de la primera hace de objeto para la segunda
  const T = S.fis12.DL;
  let f1, f2, s1, D, sp1, s2, sp2;
  for (let n = 0; n < 50; n++) {
    f1 = R.pick([10, 15, 20]); f2 = R.pick([10, 15, 20, -10, -20]); s1 = -R.pick([30, 40, 60]);
    sp1 = 1 / (1 / f1 + 1 / s1); D = Math.round(sp1) + R.pick([5, 10, 15, 20, 30]); s2 = sp1 - D;
    if (Math.abs(1 / f2 + 1 / s2) > 0.004) break;
  }
  sp2 = 1 / (1 / f2 + 1 / s2);
  const A1 = sp1 / s1, A2 = sp2 / s2, A = rd(A1 * A2, 3), a1 = rd(sp1, 1), a2 = rd(sp2, 1);
  return multi(T.q(-s1, f1, D, dc(f2)), [fn(T.f1, a1, 0.01, 0.15), fn(T.f2, a2, 0.02, 0.2), fn(T.fa, A, 0.03, 0.02)],
    T.s(dc(f1), dc(s1), dc(a1), dc(rd(A1, 3)), D, dc(rd(s2, 1)), dc(f2), dc(a2), dc(rd(A2, 3)), dc(A),
      [eq(sp1, a1), eq(A1, rd(A1, 3)), eq(s2, rd(s2, 1)), eq(sp2, a2), eq(A2, rd(A2, 3)), eq(A1 * A2, A)]));
});

/* ── U7 · Moderna ── */
def("fis12.relatividad", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 5), b = R.pick([0.6, 0.8, 0.866, 0.9, 0.99]), bx = b === 0.866 ? Math.sqrt(3) / 2 : b, g = 1 / Math.sqrt(1 - bx * bx), gs = H.dec(rd(g, 3));   // 0,866c = (√3/2)c: γ = 2 exacto
  if (k === 0) return num(T.re_q[0](H.dec(b)), rd(g, 3), T.re_s[0](H.dec(b), H.dec(rd(b * b, 4)), gs), 0.01);
  if (k === 1) { const t = R.pick([1, 2, 10, 60]), r = rd(g * t, 2); return num(T.re_q[1](H.dec(b), t), r, T.re_s[1](gs, t, H.dec(r)), Math.max(0.011, r * 0.01)); }
  if (k === 2) { const L = R.pick([50, 100, 200]), r = rd(L / g, 2); return num(T.re_q[2](H.dec(b), L), r, T.re_s[2](gs, L, H.dec(r))); }
  if (k === 3) { const m = R.pick([0.1, 0.5, 1, 2]), r = rd(m * 1e-3 * 9e16 / 1e13, 3); return num(T.re_q[3](H.dec(m)), r, T.re_s[3](dc(m * 1e-3), H.dec(r))); }
  const X = T.RE;
  if (k === 4) { const [p, e0] = R.pick(X.parts), r = rd((g - 1) * e0, 3); return num(X.ec_q(p, H.dec(b)), r, X.ec_s(H.dec(b), gs, dc(e0), H.dec(r)), Math.max(0.002, r * 0.01)); }   // energía cinética relativista
  const n = R.pick([1.25, 1.5, 2, 3, 4, 5, 10]), r = rd(Math.sqrt(1 - 1 / (n * n)), 3);   // velocidad para que E = n·E₀
  return num(X.v_q(H.dec(n)), r, X.v_s(H.dec(n), H.dec(rd(1 / (n * n), 4)), H.dec(r)), 0.003);
});
def("fis12.cuantica", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 4);
  if (k === 0) { const l = R.pick([200, 400, 500, 620, 700]), r = rd(1240 / l, 3); return num(T.cu_q[0](l), r, T.cu_s[0](l, H.dec(r))); }
  if (k === 1) { const l = R.pick([200, 250, 300, 400]), W = R.pick([2.3, 2.1, 4.3, 4.7].filter(w => 1240 / l > w)), e = rd(1240 / l, 3), r = rd(e - W, 3); return num(T.cu_q[1](l, H.dec(W)), r, T.cu_s[1](l, H.dec(e), H.dec(W), H.dec(r))); }
  if (k === 2) { const W = R.pick([2.3, 2.1, 4.3, 4.7, 5.1]), r = rd(1240 / W, 1); return num(T.cu_q[2](H.dec(W)), r, T.cu_s[2](H.dec(W), H.dec(r)), 1); }
  if (k === 3) { const l = R.pick([200, 250, 300, 400]), W = R.pick([2.3, 2.1, 4.3, 4.7].filter(w => 1240 / l > w)), e = rd(1240 / l, 3), r = rd(e - W, 3); return num(T.cu_q[3](l, H.dec(W)), r, T.cu_s[3](H.dec(e), H.dec(W), H.dec(r))); }   // potencial de frenado
  const P = R.pick([1, 2, 5]), l = R.pick([405, 532, 650]), Ef = 6.63e-34 * 3e8 / (l * 1e-9), ef = rd(Ef / 1e-19, 2), r = rd(P * 1e-3 / (ef * 1e-19) / 1e15, 2);   // fotones por segundo de un láser
  return num(T.cu_q[4](P, l), r, T.cu_s[4](String(l / 100).replace(".", WA.H.ds), H.dec(ef), P, H.dec(r)), Math.max(0.02, r * 0.01));
});
def("fis12.frenado", (R, S, H) => {   // h y W₀ a partir de dos medidas del potencial de frenado
  const T = S.fis12.FR, [met, W0] = R.pick(T.metales), he = 6.63e-34 / 1.6e-19 / 1e-15, f0 = W0 / he;   // h/e en 10⁻¹⁵ V·s; f en 10¹⁵ Hz
  const fs = [0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.5].filter(f => f > f0 + 0.1), i = R.int(0, fs.length - 2), f1 = fs[i], f2 = R.pick(fs.slice(i + 1));
  const V1 = rd(he * f1 - W0, 2), V2 = rd(he * f2 - W0, 2), s = (V2 - V1) / (f2 - f1), h = rd(1.6 * s, 2), W = rd(s * f1 - V1, 2), fo = rd(W / s, 2);
  const we = s * f1 - V1;   // W₀ sin redondear
  return multi(T.q(dc(f1), dc(V1), dc(f2), dc(V2)), [fn(T.fh, h, 0.02, 0.05), fn(T.fw, W, 0.03, 0.05), fn(T.ff, fo, 0.03, 0.02)],
    T.s(dc(V2), dc(V1), dc(f2), dc(f1), dc(rd(s, 3)), dc(h), dc(rd(s * f1, 2)), dc(W), dc(fo), met,
      [eq(s, rd(s, 3)), eq(1.6 * s, h), eq(s * f1, rd(s * f1, 2)), eq(we, W), eq(we / s, fo)]));
});

/* ── U8 · Nuclear ── */
def("fis12.enlace", (R, S, H) => {
  const T = S.fis12, k = R.r();
  if (k < 0.6) {
    const [dm, A] = R.pick([[0.00239, 2], [0.03037, 4], [0.0989, 12], [0.1369, 16], [0.5285, 56], [1.9342, 238]]), e = rd(dm * 931.5, 2);
    if (k < 0.3) return num(T.en_q[0](H.dec(dm)), e, T.en_s[0](H.dec(dm), H.dec(e)));
    const r = rd(e / A, 3); return num(T.en_q[1](H.dec(dm), A), r, T.en_s[1](H.dec(dm), H.dec(e), A, H.dec(r)), 0.02);
  }
  const [name, Z, A, mn] = R.pick(T.EN.nucleos), dm = rd(Z * 1.00728 + (A - Z) * 1.00866 - mn, 5), e = dm * 931.5, ea = rd(e / A, 2);   // defecto de masa a partir de las masas
  return multi(T.EN.q(name, Z, A, H.dec(mn)), [fn(T.EN.fm, dm, 0.01, 0.0003), fn(T.EN.fe, ea, 0.01, 0.03)], T.EN.s(Z, A - Z, H.dec(mn), H.dec(dm), H.dec(rd(e, 1)), A, H.dec(ea)));
});
// [nombre, A, Z, emisión real (0 = α, 1 = β⁻, 2 = β⁺), nombre del núcleo hijo]
const ISOS = [["uranio-238", 238, 92, 0, "torio"], ["radio-226", 226, 88, 0, "radón"], ["polonio-210", 210, 84, 0, "plomo"], ["radón-222", 222, 86, 0, "polonio"],
  ["carbono-14", 14, 6, 1, "nitrógeno"], ["cobalto-60", 60, 27, 1, "níquel"], ["torio-234", 234, 90, 1, "protactinio"], ["estroncio-90", 90, 38, 1, "itrio"],
  ["yodo-131", 131, 53, 1, "xenón"], ["flúor-18", 18, 9, 2, "oxígeno"]];
def("fis12.desintegracion", (R, S, H) => {
  const T = S.fis12, k = R.int(0, 3);
  if (k === 0) { const n = R.int(1, 5), r = rd(100 / 2 ** n, 3); return num(T.de_q[0](n), r, T.de_s[0](n, 2 ** n, H.dec(r)), 0.01); }
  if (k === 1) { const Tm = R.pick([5730, 30, 1600, 8]), p = R.pick([10, 20, 40, 60, 80]), r = rd(Tm * Math.log(100 / p) / Math.log(2), 1); return num(T.de_q[1](H.n(Tm), p), r, T.de_s[1](H.n(Tm), p, H.dec(rd(Math.log(100 / p), 3)), H.dec(r)), Math.max(0.1, r * 0.01)); }
  if (k === 2) { const A = R.pick([1600, 8000, 6400, 12800]), Tm = R.pick([2, 5, 8]), n = R.int(1, 4), r = A / 2 ** n; return num(T.de_q[2](H.n(A), Tm, n * Tm), r, T.de_s[2](n * Tm, Tm, n, H.n(A), 2 ** n, H.n(r))); }
  const [iso, A, Z, m, hijo] = R.pick(ISOS), A2 = m === 0 ? A - 4 : A, Z2 = Z + [-2, 1, -1][m];
  return { q: T.de_q[3](`El ${iso} (Z = ${Z})`, T.de_tipo[m]), kind: "fields", fields: [{ label: T.de_f[0], ans: A2 }, { label: T.de_f[1], ans: Z2 }], sol: T.de_s[3](m, A, Z, A2, Z2, hijo) };
});
/* ── Generadores añadidos: fuerza sobre corrientes, el ojo y los instrumentos, ondas
   electromagnéticas, dualidad e incertidumbre, reacciones nucleares ── */
const HP = 6.63e-34, CL = 3e8, MEV = 1.6e-13;
// Respuesta con tolerancia relativa (para valores pequeños, la absoluta de num() sería demasiado grande)
const numr = (q, ans, sol, rel = 0.015) => ({ q, kind: "num", ans, tol: Math.abs(ans) * rel + 1e-12, sol });
const shuf = (R, opts) => { const o = R.shuffle(opts.map((t, i) => [t, i])); return { opts: o.map(x => x[0]), correct: o.findIndex(x => x[1] === 0) }; };
const SIN = { 90: 1, 60: Math.sqrt(3) / 2, 45: Math.SQRT1_2, 30: 0.5 };

/* ── U3 · Fuerza magnética sobre corrientes ── */
def("fis12.laplace", (R, S, H) => {
  const T = S.fis12.LP, k = R.int(0, 5);
  if (k === 0) {   // F = I·L·B·sen α
    const I = R.pick([1, 2, 3, 5, 10]), L = R.pick([10, 20, 25, 50]), Bb = R.pick([0.02, 0.05, 0.1, 0.2, 0.4, 0.5]), a = R.pick([90, 90, 30, 60]), F = sig(I * L / 100 * Bb * SIN[a]);
    return numr(T.f_q(L, I, H.dec(Bb), a), F, T.f_s(I, H.dec(L / 100), H.dec(Bb), a, H.dec(F)));
  }
  if (k === 1) {   // I = F / (L·B)
    const L = R.pick([20, 25, 40, 50, 100]), Bb = R.pick([0.02, 0.05, 0.1, 0.2]), I = R.pick([0.5, 1, 2, 4, 5, 8]), F = sig(I * L / 100 * Bb);
    return numr(T.i_q(L, H.dec(Bb), H.dec(F)), I, T.i_s(H.dec(F), H.dec(L / 100), H.dec(Bb), H.dec(I)));
  }
  if (k === 2) {   // balanza de corriente: I·L·B = m·g
    const m = R.pick([2, 4, 5, 8, 10]), L = R.pick([5, 10, 20]), Bb = R.pick([0.1, 0.2, 0.25, 0.5]), I = sig(m / 1000 * 9.8 / (L / 100 * Bb));
    return numr(T.bal_q(L, m, H.dec(Bb)), I, T.bal_s(H.dec(m / 1000), H.dec(L / 100), H.dec(Bb), H.dec(I)));
  }
  if (k === 3) {   // par sobre una bobina
    const N = R.pick([50, 100, 200, 500]), Sc = R.pick([4, 10, 20, 25, 50]), I = R.pick([0.5, 1, 2, 3]), Bb = R.pick([0.05, 0.1, 0.2, 0.3]), th = R.pick([90, 90, 30, 60]), M = sig(N * I * Sc * 1e-4 * Bb * SIN[th]);
    return numr(T.m_q(N, Sc, H.dec(I), H.dec(Bb), th), M, T.m_s(N, H.dec(I), H.dec(Sc * 1e-4), H.dec(Bb), th, H.dec(M)));
  }
  if (k === 4) {   // la intensidad que da un par
    const N = R.pick([100, 200, 500]), Sc = R.pick([5, 10, 20]), Bb = R.pick([0.02, 0.05, 0.1]), I = R.pick([0.1, 0.2, 0.5, 1]), M = sig(N * I * Sc * 1e-4 * Bb);
    return numr(T.im_q(N, Sc, H.dec(Bb), H.dec(M)), I, T.im_s(H.dec(M), N, H.dec(Sc * 1e-4), H.dec(Bb), H.dec(I)));
  }
  const fs = [[R.pick([2, 3]), 0], [R.pick([2, 0.5]), 1], [R.pick([2, 3, 0.5]), 2]].filter(() => R.r() < 0.7);   // proporcionalidad
  const ch = fs.length ? fs : [[2, 0]], f = ch.reduce((p, [x]) => p * x, 1);
  const cs = ch.map(([x, i]) => T.cambio(i, x)), txt = cs.length > 1 ? cs.slice(0, -1).join(", ") + " y " + cs[cs.length - 1] : cs[0];
  return numr(T.prop_q(txt), f, T.prop_s(ch.map(([x]) => H.dec(x)).join(" · "), H.dec(f), ch.length > 1), 0.001);
});

/* ── U6 · El ojo y los instrumentos ópticos ── */
def("fis12.ojo", (R, S, H) => {
  const T = S.fis12.OJ, k = R.int(0, 6);
  if (k === 0) { const r = R.pick([25, 40, 50, 80, 100, 200]), P = rd(-100 / r, 2); return num(T.miope_q(r), P, T.miope_s(H.dec(r / 100), H.dec(P)), 0.02); }   // miopía
  if (k === 1) { const pp = R.pick([50, 75, 100, 200]), P = rd(4 - 100 / pp, 2); return num(T.lejos_q(pp), P, T.lejos_s(H.dec(pp / 100), H.dec(rd(100 / pp, 2)), H.dec(P)), 0.02); }   // vista cansada
  if (k === 2) {   // lupa
    const f = R.pick([2.5, 5, 10, 12.5]), M = rd(25 / f, 2);
    return R.r() < 0.6 ? num(T.lupa_q(H.dec(f)), M, T.lupa_s(H.dec(f), H.dec(M))) : num(T.lupaf_q(H.dec(M)), f, T.lupaf_s(H.dec(M), H.dec(f)), 0.02);
  }
  if (k === 3) { const fo = R.pick([2, 4, 5, 8, 16]), fc = R.pick([10, 25, 50]), L = 160, M = rd(L / fo * 250 / fc, 1); return num(T.micro_q(fo, fc, L), M, T.micro_s(L, fo, fc, H.dec(L / fo), H.dec(250 / fc), H.dec(M)), 0.5); }   // microscopio
  if (k === 4) {   // telescopio
    const fo = R.pick([0.6, 0.9, 1, 1.2, 1.5, 2]), fc = R.pick([1, 1.5, 2, 2.5, 3]), M = rd(fo * 100 / fc, 1);
    if (R.r() < 0.65) return num(T.tele_q(H.dec(fo), H.dec(fc)), M, T.tele_s(H.dec(fo * 100), H.dec(fc), H.dec(M)), 0.2);
    const Lt = rd(fo + fc / 100, 3); return num(T.tubo_q(H.dec(fo), H.dec(fc)), Lt, T.tubo_s(H.dec(fo), H.dec(fc / 100), H.dec(Lt)), 0.006);
  }
  if (k === 5) { const s2 = R.pick([17, 18, 20]), P = rd(1000 / s2, 1); return num(T.acom_q(s2), P, T.acom_s(H.dec(s2 / 1000), H.dec(P)), 0.15); }   // potencia del ojo
  const [q, opts, sol] = R.pick(T.conceptos), sh = shuf(R, opts);   // defectos e instrumentos
  return { q, kind: "choice", opts: sh.opts, correct: sh.correct, sol };
});

/* ── U6 · La luz, una onda electromagnética ── */
def("fis12.ondasem", (R, S, H) => {
  const T = S.fis12.OE, k = R.int(0, 6);
  if (k === 0) {   // λ = c / f
    if (R.r() < 0.5) { const f = R.pick([88, 90, 95, 100, 104, 107]), l = rd(300 / f, 2); return num(T.fm_q(f), l, T.fm_s(f, H.dec(l)), 0.011); }
    const [w, f] = R.pick(T.ghz), l = rd(30 / f, 2); return num(T.ghz_q(w, H.dec(f)), l, T.ghz_s(H.dec(f), H.dec(l)), 0.05);
  }
  if (k === 1) { const l = R.pick([400, 450, 500, 550, 600, 650, 700]), f = rd(3e8 / (l * 1e-9) / 1e14, 2); return num(T.luz_q(l), f, T.luz_s(l, H.dec(f)), 0.02); }   // f = c / λ
  if (k === 2) { const E0 = R.pick([3, 6, 15, 20, 30, 60, 90]), b = rd(E0 / 3, 2); return num(T.b_q(E0), b, T.b_s(E0, H.dec(b)), 0.02); }   // B₀ = E₀ / c
  if (k === 3) { const [w, d, de, inMin] = R.pick(T.viajes), t = d * 10 ** de / CL, r = inMin ? rd(t / 60, 1) : rd(t, 2); return num(T.t_q(w, sci(d, de), inMin), r, T.t_s(sci(d, de), H.dec(sig(t, 3)), inMin, H.dec(r)), inMin ? 0.06 : Math.max(0.006, r * 0.01)); }   // tiempo de viaje
  if (k === 4) { const P = R.pick([40, 60, 100]), r = R.pick([1, 2, 3, 4, 5]), I = sig(P / (4 * Math.PI * r * r)); return numr(T.int_q(P, r), I, T.int_s(P, r, H.dec(I))); }   // intensidad
  if (k === 5) { const j = R.int(0, 6), lt = R.pick(T.espectro[j][1]); return { q: T.tipo_q(lt), kind: "choice", opts: T.espectro.map(x => x[0]), correct: j, shuffle: false, sol: T.tipo_s(lt, T.espectro[j]) }; }   // ¿qué radiación es?
  const idx = R.shuffle([0, 1, 2, 3, 4, 5, 6]).slice(0, 3), hi = R.r() < 0.5, j = hi ? Math.max(...idx) : Math.min(...idx);   // ¿cuál tiene más frecuencia?
  return { q: (hi ? T.masf_q : T.menf_q), kind: "choice", opts: idx.map(i => T.espectro[i][0]), correct: idx.indexOf(j), shuffle: false, sol: T.orden_s(T.espectro[j], hi) };
});

/* ── U7 · Dualidad onda-corpúsculo e incertidumbre ── */
def("fis12.debroglie", (R, S, H) => {
  const T = S.fis12.DB, k = R.int(0, 5);
  if (k === 0) { const v = R.pick([0.5, 1, 2, 3, 5]), l = sig(HP / (ME * v * 1e6) * 1e9); return numr(T.v_q(H.dec(v)), l, T.v_s(H.dec(v), H.dec(l))); }   // λ = h / mv
  if (k === 1) { const V = R.pick([50, 100, 150, 200, 500, 1000]), l = sig(HP / Math.sqrt(2 * ME * E * V) * 1e9); return numr(T.V_q(V), l, T.V_s(V, H.dec(l))); }   // electrón acelerado
  if (k === 2) { const r = sig(MP / ME, 4); return numr(T.ep_q, r, T.ep_s(H.dec(r)), 0.01); }   // electrón y protón
  if (k === 3) {   // Δx·Δp ≥ h/4π
    if (R.r() < 0.6) { const [dx, de] = R.pick([[1, -10], [5, -11], [1, -9], [2, -10]]), dv = sig(HP / (4 * Math.PI * ME * dx * 10 ** de) / 1e5); return numr(T.dxe_q(sci(dx, de)), dv, T.dxe_s(sci(dx, de), H.dec(dv))); }
    const dv = sig(HP / (4 * Math.PI * MP * 1e-14) / 1e6); return numr(T.dxp_q, dv, T.dxp_s(H.dec(dv)));
  }
  if (k === 4) { const e = R.pick([-8, -9, -10]), dE = sig(HP / (4 * Math.PI * 10 ** e) / E / 1e-8); return numr(T.dE_q(sci(1, e)), dE, T.dE_s(sci(1, e), H.dec(dE))); }   // ΔE·Δt ≥ h/4π
  const l = R.pick([400, 450, 500, 600, 700]), p = sig(HP / (l * 1e-9) / 1e-27); return numr(T.p_q(l), p, T.p_s(l, H.dec(p)));   // momento de un fotón
});

/* ── U8 · Reacciones nucleares: fisión y fusión ── */
const FIS = [["Ba", 56, 141, "Kr", 36, 92, 3], ["Ba", 56, 144, "Kr", 36, 89, 3], ["Xe", 54, 140, "Sr", 38, 94, 2], ["Cs", 55, 137, "Rb", 37, 96, 3], ["Te", 52, 134, "Zr", 40, 99, 3], ["I", 53, 131, "Y", 39, 102, 3], ["Sn", 50, 132, "Mo", 42, 101, 3]];
def("fis12.reacciones", (R, S, H) => {
  const T = S.fis12.RN, k = R.int(0, 5);
  if (k === 0) {   // ajustar una fisión: cuántos neutrones
    const [x, zx, ax, y, zy, ay, n] = R.pick(FIS);
    return { q: T.fisn_q(`<sup>${ax}</sup>${x}`, `<sup>${ay}</sup>${y}`), kind: "int", ans: n, sol: T.fisn_s(ax, ay, n) };
  }
  if (k === 1) {   // ajustar una fisión: el fragmento que falta
    const [x, zx, ax, y, zy, ay, n] = R.pick(FIS);
    return { q: T.fisx_q(`<sup>${ax}</sup><sub>${zx}</sub>${x}`, n), kind: "fields", fields: [{ label: "A", ans: ay }, { label: "Z", ans: zy }], sol: T.fisx_s(ax, n, ay, zx, zy, T.elem[y]) };
  }
  if (k === 2) {   // la energía liberada, con las masas
    const [txt, mr, mp] = R.pick(T.reac), dm = rd(mr - mp, 6), Q = rd(dm * 931.5, 2);
    return num(T.q_q(txt), Q, T.q_s(H.dec(rd(mr, 6)), H.dec(rd(mp, 6)), H.dec(dm), H.dec(Q)), Math.max(0.06, Q * 0.005));
  }
  if (k === 3) {   // fisiones por segundo en un reactor
    const P = R.pick([1000, 2000, 3000]), n = sig(P * 1e6 / (200 * MEV) / 1e19);
    return numr(T.fps_q(P), n, T.fps_s(P, H.dec(n)), 0.01);
  }
  if (k === 4) {   // reacciones con partículas: la que falta
    const [txt, A, Z, name] = R.pick(T.trans);
    return { q: T.trans_q(txt), kind: "fields", fields: [{ label: "A", ans: A }, { label: "Z", ans: Z }], sol: T.trans_s(A, Z, name) };
  }
  const [q, opts, sol] = R.pick(T.conceptos), sh = shuf(R, opts);
  return { q, kind: "choice", opts: sh.opts, correct: sh.correct, sol };
});
// ── fin: * ── Generadores añadidos: fuerza sobre corrientes, el ojo y los instrumentos, ondas
})();
