/* WikiAula — ejecuta los generadores en Node (lo usa build.py).
     node samples.js <lang> <entrada.json> <salida.json>
       entrada: {lessonId: spec[]} → salida: {lessonId: [{q, a, sol}]}
       (ejercicios resueltos de muestra, con semilla fija por lección: el
       HTML sale igual en cada compilación y sirve sin JavaScript)
     node samples.js <lang> --test [prefijo]
       prueba cada generador 400 veces (que no falle y que su propia
       respuesta se dé por buena, también escrita con los separadores del
       idioma); con prefijo, solo esos (p. ej. m5). En un idioma que no es
       el español solo se prueban los generadores cuyos textos ya existen
       (i18n/<lang>/<archivo>.js) y se avisa de las claves que faltan.
     WA_EXTRA_GEN=<carpeta>: carga también los generadores de esa carpeta
       (los de un curso de la comunidad, community/<lang>/<curso>/gen):
       WA_EXTRA_GEN=…/gen node samples.js es --test c.autor.curso.
     node samples.js <lang> --ui
       textos de la interfaz (JSON), para build.py
     node samples.js --parse
       casos de lectura de respuestas (números, listas…) en cada idioma con
       casos en PARSE_CASES (ver auditoria/wikiaula/traduccion/MOTOR.md) */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = __dirname;
const noop = () => {};
const el = () => ({ classList: { add: noop }, dataset: {}, setAttribute: noop, appendChild: noop, innerHTML: "", textContent: "" });

// Motor completo en un contexto aislado: textos del idioma, generadores y wikiaula.js.
// genOf: generador → archivo de gen/ que lo define. withEs: carga también el español (para comparar claves).
let lastWarn = "";   // último aviso del motor (en --test: por qué un generador no ha dado ejercicio)
function loadEngine(lang, { quiet = false, withEs = false } = {}) {
  const ctx = {
    console: quiet ? Object.assign(Object.create(console), { warn: (...a) => { lastWarn = a.map(String).join(" "); } }) : console, setTimeout, clearTimeout, setInterval, clearInterval, URLSearchParams, Blob: function () {},
    navigator: {}, location: { origin: "", pathname: "" },
    localStorage: { getItem: () => null, setItem: noop },
    document: { documentElement: Object.assign(el(), { lang }), body: Object.assign(el(), { dataset: {} }), readyState: "loading",
      addEventListener: noop, querySelectorAll: () => [], querySelector: () => null, createElement: el },
  };
  ctx.window = ctx; ctx.addEventListener = noop;
  vm.createContext(ctx);
  const load = f => {
    try { vm.runInContext(fs.readFileSync(path.isAbsolute(f) ? f : path.join(dir, f), "utf8"), ctx, { filename: f }); }
    catch (e) { console.error(`AVISO: no se pudo cargar ${f}: ${e.message}`); if (f === `i18n/${lang}.js` || f === "wikiaula.js" || f === "gen/_common.js") throw e; }
  };
  const textFiles = l => fs.existsSync(path.join(dir, "i18n", l)) ? fs.readdirSync(path.join(dir, "i18n", l)).filter(f => f.endsWith(".js")).sort() : [];
  if (withEs && lang !== "es") { load("i18n/es.js"); textFiles("es").forEach(f => load(`i18n/es/${f}`)); }
  load(`i18n/${lang}.js`);
  const texts = textFiles(lang);
  texts.forEach(f => load(`i18n/${lang}/${f}`));
  const genOf = {};
  fs.readdirSync(path.join(dir, "gen")).filter(f => f.endsWith(".js")).sort().forEach(f => {   // _common.js primero
    const before = new Set(Object.keys((ctx.WA && ctx.WA.GEN) || {}));
    load("gen/" + f);
    Object.keys(ctx.WA.GEN).forEach(id => { if (!before.has(id)) genOf[id] = f; });
  });
  // Generadores propios de un curso de la comunidad (build.py --curso): WA_EXTRA_GEN=<carpeta gen/ del curso>
  const extra = process.env.WA_EXTRA_GEN;
  if (extra && fs.existsSync(extra)) fs.readdirSync(extra).filter(f => f.endsWith(".js")).sort().forEach(f => {
    const before = new Set(Object.keys(ctx.WA.GEN));
    load(path.resolve(extra, f));
    Object.keys(ctx.WA.GEN).forEach(id => { if (!before.has(id)) genOf[id] = "com-" + f; });
  });
  ctx.WA.DATA = { courses: {}, pages: {} };
  load("wikiaula.js");
  return { WA: ctx.WA, genOf, texts: new Set(texts) };
}

function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// ── Casos de lectura de respuestas: [idioma, tipo, lo que escribe el alumno, respuesta, ¿vale?, extra] ──
// es: nada debe cambiar (coma decimal, miles con espacio o punto). en: punto decimal, miles con coma.
const PARSE_CASES = [
  ["es", "num", "2,5", 2.5, true], ["es", "num", "2.5", 2.5, true], ["es", "num", "−0,125", -0.125, true],
  ["es", "num", "12 500,75", 12500.75, true], ["es", "num", "12 500,75", 12500.75, true], ["es", "num", "1.234,5", 1234.5, true],
  ["es", "num", "12,500", 12.5, true], ["es", "num", "3/4", 0.75, true], ["es", "num", "1 1/2", 1.5, true],
  ["es", "int", "12 500", 12500, true], ["es", "int", "12.500", 12500, true], ["es", "int", "20,00", 20, true], ["es", "int", "20.0", 20, true],
  ["es", "int", "12,500", 12500, false], ["es", "int", "+7", 7, true],
  ["es", "set", "1, 2, 4", [1, 2, 4], true], ["es", "set", "1 2 4", [1, 2, 4], true], ["es", "set", "0,5; 2; −3", [0.5, 2, -3], true, { sep: ";" }],
  ["es", "set", "0.5, 2, −3", [0.5, 2, -3], false, { sep: ";" }],
  ["en", "num", "2.5", 2.5, true], ["en", "num", "−0.125", -0.125, true], ["en", "num", ".5", 0.5, true],
  ["en", "num", "12,500", 12500, true], ["en", "num", "12 500", 12500, true], ["en", "num", "1,234.5", 1234.5, true],
  ["en", "num", "12,500.75", 12500.75, true], ["en", "num", "1,000,000", 1e6, true], ["en", "num", "1,00,000", 1e5, true],
  ["en", "num", "2,5", 2.5, true], ["en", "num", "0,125", 0.125, true], ["en", "num", "12.500", 12500, false], ["en", "num", "12.500", 12.5, true],
  ["en", "num", "3/4", 0.75, true], ["en", "num", "2 1/2", 2.5, true], ["en", "num", "1.5/3", 0.5, true],
  ["en", "int", "12,500", 12500, true], ["en", "int", "12 500", 12500, true], ["en", "int", "1,000", 1000, true], ["en", "int", "20.0", 20, true],
  ["en", "int", "20,00", 20, true], ["en", "int", "12.500", 12500, false], ["en", "int", "1,234.0", 1234, true],
  ["en", "set", "1, 2, 4", [1, 2, 4], true], ["en", "set", "1,2,4", [1, 2, 4], true], ["en", "set", "0.5; 2; −3", [0.5, 2, -3], true, { sep: ";" }],
  ["en", "set", "0.5, 2, −3", [0.5, 2, -3], true, { sep: ";" }], ["en", "set", "1,250, 3", [1250, 3], false],
  ["en", "frac", "3/4", [3, 4], true], ["en", "expr", "3x^2 − 2.5x", "3*x^2-2.5*x", true],
];
function testParse() {
  let bad = 0, n = 0;
  for (const lang of [...new Set(PARSE_CASES.map(c => c[0]))]) {
    if (!fs.existsSync(path.join(dir, "i18n", lang + ".js"))) { console.log(`(sin i18n/${lang}.js: se omiten sus casos)`); continue; }
    const { WA } = loadEngine(lang, { quiet: true });
    for (const [l, kind, input, ans, want, extra] of PARSE_CASES.filter(c => c[0] === lang)) {
      const ok = WA.check(Object.assign({ kind, ans }, extra || {}), input) === want;
      n++; if (!ok) bad++;
      console.log(`${ok ? "ok   " : "FALLO"} ${l} ${kind.padEnd(4)} «${input}» ${want ? "=" : "≠"} ${JSON.stringify(ans)}`);
    }
  }
  console.log(`${n} casos, ${bad} FALLO`);
  process.exit(bad ? 1 : 0);
}

if (process.argv[2] === "--parse") testParse();

const lang = process.argv[2] || "es";
const mode = process.argv[3];
const E = loadEngine(lang, { quiet: mode === "--test", withEs: mode === "--test" && lang !== "es" });
const WA = E.WA;

if (mode === "--ui") { process.stdout.write(JSON.stringify(WA.I18N[lang].ui)); process.exit(0); }

// Respuesta "tecleada" a partir de la correcta (para la prueba de ida y vuelta),
// con el separador decimal del idioma
function typed(it) {
  const ds = WA.H.ds;
  switch (it.kind) {
    case "int": return String(it.ans);
    case "fields": return it.fields.map(f => typed(Object.assign({ kind: "int" }, f)));
    case "choice": return it.correct;
    case "multi": return it.correct.slice();
    case "set": return it.ans.map(x => String(x).replace(".", ds)).join(it.sep === ";" ? "; " : ", ");
    case "factors": { const f = WA.MATH.factorize(it.ans); return Object.keys(f).map(p => f[p] > 1 ? `${p}^${f[p]}` : p).join(" · "); }
    case "num": return String(it.ans).replace(".", ds);
    case "frac": return `${it.ans[0]}/${it.ans[1]}`;
    case "expr": return it.ans;
    case "text": return [].concat(it.ans)[0];
  }
}
// La misma respuesta escrita como la enseña el motor (con separador de miles: 12 500 · 12,500)
function typedGrouped(it) {
  if (it.kind === "int" && Math.abs(it.ans) >= 1000) return WA.H.n(it.ans);
  if (it.kind === "num" && Math.abs(it.ans) >= 1000 && Math.abs(it.ans * 1e6 - Math.round(it.ans * 1e6)) < 1e-6) return WA.H.dec(it.ans);
  return null;
}

// Claves de un idioma que no es el español: lo que falta respecto a es.js y a cada i18n/es/<archivo>.js
function checkKeys() {
  const es = WA.I18N.es, L = WA.I18N[lang];
  if (!es) return;
  const warn = [];
  const cmp = (a, b, where) => Object.keys(a || {}).forEach(k => {
    if (!(b && k in b)) warn.push(`${where}.${k}: falta`);
    else if (typeof a[k] !== typeof b[k]) warn.push(`${where}.${k}: tipo ${typeof b[k]} (en es, ${typeof a[k]})`);
    else if (Array.isArray(a[k]) !== Array.isArray(b[k]) || (Array.isArray(a[k]) && a[k].length !== b[k].length && typeof a[k][0] !== "string")) warn.push(`${where}.${k}: lista distinta`);
  });
  ["ui", "ach"].forEach(k => cmp(es[k], L[k], k));
  ["words", "num", "sym", "ordAbbr", "wordsBefore", "money", "time"].forEach(k => { if (!(k in L)) warn.push(`${k}: falta en i18n/${lang}.js`); });
  for (const sec of Object.keys(L.gen || {})) if (es.gen && es.gen[sec] && typeof es.gen[sec] === "object") cmp(es.gen[sec], L.gen[sec], `gen.${sec}`);
  // las claves que faltan, agrupadas por apartado (un archivo a medio traducir no llena la pantalla)
  const miss = {};
  warn.forEach(w => { const m = /^(.*)\.([^.]+): falta$/.exec(w); if (m) (miss[m[1]] = miss[m[1]] || []).push(m[2]); else console.log("AVISO " + w); });
  for (const [where, ks] of Object.entries(miss))
    console.log(`AVISO ${where}: falta${ks.length > 1 ? "n" : ""} ${ks.length} clave${ks.length > 1 ? "s" : ""}: ${ks.slice(0, 8).join(", ")}${ks.length > 8 ? "…" : ""}`);
  return warn.length;
}

if (mode === "--test") {
  let bad = 0, skipped = 0, missingText = 0;
  const prefix = process.argv[4] || "";   // node samples.js es --test m5  → solo los generadores m5.*
  if (lang !== "es") checkKeys();
  for (const id of Object.keys(WA.GEN).sort().filter(x => x.startsWith(prefix))) {
    const file = E.genOf[id];
    if (lang !== "es" && file !== "_common.js" && !file.startsWith("com-") && !E.texts.has(file)) { skipped++; continue; }
    const R = WA.makeRng(hash(id));
    let fails = 0, nulls = 0, err = "";
    lastWarn = "";
    const qs = new Set();
    for (let k = 0; k < 400; k++) {
      let it;
      try { it = WA.makeItem({ gen: id }, R); } catch (e) { fails++; err = String(e); continue; }
      if (!it) { nulls++; continue; }
      qs.add(it.q);
      if (!it.q || !WA.check(it, typed(it))) { fails++; err = JSON.stringify(it).slice(0, 300); }
      const g = typedGrouped(it);
      if (g !== null && !WA.check(it, g)) { fails++; err = `no se acepta «${g}»: ` + JSON.stringify(it).slice(0, 240); }
      if (/undefined|NaN/.test(it.q + (it.sol || "") + WA.answerHtml(it))) { fails++; err = "undefined/NaN: " + (it.q + " | " + it.sol).slice(0, 300); }
    }
    // en un idioma a medio traducir, un generador que nunca da ejercicio porque le faltan textos no es un fallo del motor
    const noText = lang !== "es" && nulls === 400 && /is not a function|Cannot read propert|is not iterable|of undefined/.test(lastWarn);
    const status = noText ? "TEXTO" : fails || nulls > 40 ? "FALLO" : "ok";
    if (status === "FALLO") bad++;
    if (noText) { missingText++; err = "faltan textos: " + lastWarn.slice(0, 160); }
    console.log(`${status.padEnd(5)} ${id.padEnd(18)} distintos=${qs.size} nulos=${nulls} fallos=${fails} ${err}`);
  }
  if (missingText) console.log(`(${missingText} generadores con estado TEXTO: les faltan claves en i18n/${lang}/; no cuentan como FALLO)`);
  if (skipped) console.log(`(${skipped} generadores sin textos en «${lang}» (falta su i18n/${lang}/<archivo>.js): no se prueban)`);
  process.exit(bad ? 1 : 0);
}

const input = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
const out = {};
for (const [lid, spec] of Object.entries(input)) {
  const R = WA.makeRng(hash(lid));
  const items = [], seenGen = new Set();
  // un ejercicio de cada generador/pregunta, hasta 6
  for (const s of spec) {
    if (items.length >= 6) break;
    const key = s.gen || JSON.stringify(s.fixed).slice(0, 80);
    if (seenGen.has(key)) continue;
    seenGen.add(key);
    const it = WA.makeItem(Object.assign({}, s, s.fixed ? { fixed: Object.assign({}, s.fixed, { shuffle: false }) } : {}), R);
    if (!it) continue;
    let q = it.q;
    if (it.kind === "choice" || it.kind === "multi") q += "<br>" + it.opts.map((o, i) => `${String.fromCharCode(97 + i)}) ${o}`).join(" &nbsp; ");
    items.push({ q, a: WA.answerHtml(it), sol: it.sol || "" });
  }
  out[lid] = items;
}
fs.writeFileSync(process.argv[4], JSON.stringify(out), "utf8");
