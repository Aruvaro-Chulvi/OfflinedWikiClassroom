/* WikiAula — motor de las páginas (va dentro del ZIM).

   Funciona en cualquier lector de Kiwix: el progreso se guarda en el
   localStorage del navegador. Dentro de Offlined, el proxy inyecta
   window.OFFLINED_AULA ({storage, tutor, theme}) y el progreso se guarda en
   el perfil del usuario (/api/learn/aula/storage); además avisa a la app
   (postMessage {type:"ofl:aula", ev, …}) para Mi WikiÁlbum y Michael Knowledge.

   Necesita antes: i18n/<lang>.js, gen/*.js y data.js (WA.DATA, lo genera
   build.py). Puntos de montaje que pone build.py en el HTML:
     .wa-stats            barra superior (nivel, racha, meta)
     .wa-mastery[data-lesson]   nivel de dominio en la ficha
     .wa-practice[data-mode=lesson|unit|review]
     .wa-path[data-course]      mapa del curso (portal)
     .wa-unit[data-unit]        lecciones de la unidad
     .wa-review / .wa-progress / .wa-home */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
const D = document, W = window;
const LANG = (D.documentElement.lang || "es").slice(0, 2);
const L = (WA.I18N && (WA.I18N[LANG] || WA.I18N.es)) || {};
const UI = L.ui || {};
const BR = W.OFFLINED_AULA || null;          // puente con Offlined (o null)
D.documentElement.classList.add("wa-js");

// ── Textos ──────────────────────────────────────────────────────────────
function t(key, vars) {
  let s = UI[key];
  if (s == null) return key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => vars[k] != null ? vars[k] : m);
  return s;
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ── Formato matemático ──────────────────────────────────────────────────
// Lo que cambia con el idioma lo fija i18n/<lang>.js (ver auditoria/wikiaula/traduccion/MOTOR.md):
//   L.num = { group, decimal, groupMin }   separadores: 12 500,75 (es) · 12,500.75 (en); groupMin = cifras
//                                          desde las que se agrupa (es 5: 2026 y 46 378; en 4: 1,000)
//   L.sym = { mul, times, div, sci,        · del álgebra · × de Primaria · «:» o «÷» · «·» o «×» en 6,02·10²³
//             sciSpace }                   (sciSpace: siempre con espacios alrededor del signo científico)
//   L.ordAbbr(n, fem)                      3.º / 3.ª · 3rd
//   L.genText(texto)                       notación que cambia en los ejercicios generados (sen → sin…)
const NUM = Object.assign({ group: " ", decimal: ",", groupMin: 5 }, L.num || {});
const NUM_ES = NUM.decimal === "," && /^[ \u00a0\u202f]$/.test(NUM.group);   // ¿números como en español?
const SYM = Object.assign({ mul: "·", times: "×", div: ":", sci: "·" }, L.ops || {}, L.sym || {});
//   L.money = { code, sym, before, cent, coins, bills }   moneda: «2,50 €» (es) · «$2.50» (en); monedas y billetes
//                                          que existen, en céntimos (los usan SVG.money y los generadores de dinero)
//   L.time(h, m)                           hora del reloj: 19:05 (es) · 7:05 p.m. (en)
const MONEY = Object.assign({ code: "EUR", sym: "€", before: false, cent: " c", coins: [1, 2, 5, 10, 20, 50, 100, 200], bills: [500, 1000, 2000, 5000, 10000, 20000, 50000] }, L.money || {});
const H = {
  mul: SYM.mul, times: SYM.times, div: SYM.div, sci: SYM.sci,
  ds: NUM.decimal, gs: NUM.group,
  // Signo de la notación científica: 6,02·10²³ (es: «·», pegado o con espacios, como esté en el generador)
  // · 6.02 × 10²³ (en: L.sym.sciSpace = true, siempre con espacios)
  sx: spaced => spaced || SYM.sciSpace ? ` ${SYM.sci} ` : SYM.sci,
  n(x) { // agrupa de tres en tres a partir de NUM.groupMin cifras (es: 5, norma RAE/ISO)
    const s = String(Math.abs(x)), neg = x < 0 ? "−" : "";
    if (s.length < NUM.groupMin) return neg + s;
    return neg + s.replace(/\B(?=(\d{3})+(?!\d))/g, NUM.group);
  },
  dec(x, dp = 6) {   // 2,5 · −0,125 · 12 500,75 (sin ceros sobrantes)
    if (!isFinite(x)) return String(x);
    const r = Math.round(Math.abs(x) * 10 ** dp) / 10 ** dp;
    const [ip, fp] = r.toFixed(dp).replace(/0+$/, "").replace(/\.$/, "").split(".");
    return (x < 0 && r ? "−" : "") + H.n(+ip) + (fp ? NUM.decimal + fp : "");
  },
  // Texto de un número de JavaScript («2.50», «-0.5»: de toFixed o String) con el separador decimal
  // del idioma; no agrupa ni cambia el signo (lo mismo que el antiguo .replace(".", ","))
  jsn: s => String(s).replace(".", NUM.decimal),
  // Números escritos a la española en los datos de un generador («0,301», «−393,5», «10 000», «4562»)
  // → formato del idioma («0.301», «10,000», «4,562» en inglés). Con el formato español (coma decimal y
  // espacio de miles: es, fr, pt, ru) devuelve el texto tal cual.
  esn: s => NUM_ES ? String(s) : String(s).replace(/\d{1,3}(?:[ \u00a0\u202f]\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g, m => {
    const [i, d] = m.replace(/[ \u00a0\u202f]/g, "").split(",");
    return (i.length > 1 && i[0] === "0" ? i : H.n(+i)) + (d ? NUM.decimal + d : "");
  }),
  // Ordinal abreviado: 3.º, 3.ª (es) · 3rd (en)
  ord: (n, fem) => L.ordAbbr ? L.ordAbbr(n, fem) : `${n}.${fem ? "ª" : "º"}`,
  pow: (b, e) => `${b}<sup>${e}</sup>`,
  frac: (a, b) => `<span class="wa-fr"><span>${a}</span><span class="wa-frs">/</span><span>${b}</span></span>`,
  // Raíz escrita con símbolos: la página la convierte en fórmula (KaTeX)
  sqrt: x => /</.test(String(x)) ? `<span class="wa-sqrt">√<span>${x}</span></span>` : /^[\w.,]+$/.test(String(x)) ? `√${x}` : `√(${x})`,
  // Dinero según L.money: H.money(2.5, true) → «2,50 €» (es) · «$2.50» (en); sin always, las cantidades
  // enteras van sin decimales («12 €», «$12»). H.cents(46) → «46 c» · «46¢». H.moneyCfg: la configuración.
  moneyCfg: MONEY,
  money(x, always) {
    const s = WA.MATH.eur(x, H, always), neg = s[0] === "−", a = neg ? s.slice(1) : s;
    return (neg ? "−" : "") + (MONEY.before ? MONEY.sym + a : a + " " + MONEY.sym);
  },
  cents: c => `${c}${MONEY.cent}`,
  // Hora del reloj según L.time: 19:05 (es) · 7:05 p.m. (en)
  time: (h, m) => L.time ? L.time(h, m) : `${h}:${String(m).padStart(2, "0")}`,
};
WA.H = H;

// ═════════════════ Fórmulas (KaTeX, MIT, va dentro del ZIM) ═════════════════
// Las raíces escritas con símbolos en los ejercicios (√2, √(x + 4), ∛(x²), ⁿ√a)
// se dibujan con KaTeX. Mismas reglas que mathtex.py (lecciones, al compilar).
const MATH = (() => {
  const SUP = {}, SUB = {};
  [..."⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣᵐᵏ"].forEach((c, i) => { SUP[c] = "0123456789+-=()nixmk"[i]; });
  [..."₀₁₂₃₄₅₆₇₈₉₊₋ₙₓᵢₖₘ"].forEach((c, i) => { SUB[c] = "0123456789+-nxikm"[i]; });
  const SYM = { "−": "-", "–": "-", "·": "\\cdot ", "×": "\\times ", "÷": "\\div ", "π": "\\pi ", "σ": "\\sigma ", "α": "\\alpha ",
    "β": "\\beta ", "θ": "\\theta ", "μ": "\\mu ", "λ": "\\lambda ", "φ": "\\varphi ", "Δ": "\\Delta ", "≤": "\\le ", "≥": "\\ge ",
    "≠": "\\ne ", "≈": "\\approx ", "∞": "\\infty ", "±": "\\pm ", "∓": "\\mp ", "′": "'", "″": "''", "°": "^{\\circ}", "%": "\\%", "#": "\\#", "&": "\\&" };
  const ROOT = "√∛∜", SUPS = Object.keys(SUP).join(""), SUBS = Object.keys(SUB).join("");
  const ARG = new RegExp(`^[0-9A-Za-zÀ-ÿα-ωΑ-Ω,'′${SUPS}${SUBS}]+`);
  function balanced(s, i) { let d = 0; for (let j = i; j < s.length; j++) { if (s[j] === "(") d++; else if (s[j] === ")" && --d === 0) return j; } return -1; }
  function findRoots(s) {
    const out = [];
    for (let i = 0; i < s.length;) {
      if (!ROOT.includes(s[i])) { i++; continue; }
      let start = i, idx = { "∛": "3", "∜": "4" }[s[i]] || "", k = i;
      while (k > 0 && SUP[s[k - 1]]) k--;
      if (k < i && !idx) { idx = [...s.slice(k, i)].map(c => SUP[c]).join(""); start = k; }
      const j = i + 1;
      if (s[j] === "(") {
        const e = balanced(s, j);
        if (e < 0) { i++; continue; }
        out.push([start, e + 1, idx, s.slice(j + 1, e)]); i = e + 1;
      } else {
        const m = ARG.exec(s.slice(j));
        if (!m || !/[0-9A-Za-zα-ω]/.test(m[0])) { i++; continue; }
        const arg = m[0].replace(/[,'′]+$/, "");
        out.push([start, j + arg.length, idx, arg]); i = j + arg.length;
      }
    }
    return out;
  }
  function plain(s) {
    s = s.replace(new RegExp(`[${SUPS}]+`, "g"), m => "^{" + [...m].map(c => SUP[c]).join("") + "}");
    s = s.replace(new RegExp(`[${SUBS}]+`, "g"), m => "_{" + [...m].map(c => SUB[c]).join("") + "}");
    s = [...s].map(c => SYM[c] || c).join("");
    s = s.replace(/(\d),(\d)/g, "$1{,}$2");
    s = s.replace(/(^|[^\\A-Za-z])(sen|sin|cos|tg|tan|cot|csc|sec|ln|log|arcsen|arcsin|arccos|arctg|arctan|lim)(?![A-Za-z])/g, "$1\\operatorname{$2}");
    s = s.replace(/(^|[^\\{A-Za-z])([A-Za-zÁÉÍÓÚáéíóúñÑ]{3,})/g, "$1\\text{$2}");
    return s;
  }
  function toTex(s) {
    let out = "", last = 0;
    for (const [a, b, idx, arg] of findRoots(s)) { out += plain(s.slice(last, a)) + (idx ? `\\sqrt[${idx}]` : "\\sqrt") + "{" + toTex(arg) + "}"; last = b; }
    return out + plain(s.slice(last));
  }
  // (un «$» de dinero seguido de número y palabra, «$40, so $\frac25$», no abre fórmula)
  const DOLLAR = /\$\$([\s\S]+?)\$\$|\$(?!\d[\d.,{}]*[,;:.]?\s+[A-Za-zÀ-ÿ]{2,})([^$\n]+?)\$/g;
  // Trozos de un texto: [inicio, fin, LaTeX, en bloque] de cada $…$, $$…$$ y raíz con símbolos
  function pieces(s) {
    const out = [];
    let last = 0;
    const roots = (a, b) => findRoots(s.slice(a, b)).forEach(([x, y, idx, arg]) =>
      out.push([a + x, a + y, (idx ? `\\sqrt[${idx}]` : "\\sqrt") + "{" + toTex(arg) + "}", false]));
    if (s.includes("$")) {
      // Como build.py: un $…$ en línea no empieza tras «\» ni acaba delante de una letra/cifra (p$K_a$ sí),
      // así «$45. You have $15» (dinero) no es una fórmula. (Sin «lookbehind» para lectores antiguos.)
      DOLLAR.lastIndex = 0;
      let m;
      while ((m = DOLLAR.exec(s))) {
        if (m[1] == null && (s[m.index - 1] === "\\" || /\w/.test(s[m.index + m[0].length] || ""))) { DOLLAR.lastIndex = m.index + 1; continue; }
        roots(last, m.index); out.push([m.index, m.index + m[0].length, m[1] != null ? m[1] : m[2], m[1] != null]); last = m.index + m[0].length;
      }
    }
    roots(last, s.length);
    return out;
  }
  // Convierte las fórmulas de los textos de un elemento (no toca lo ya convertido)
  function typeset(root) {
    const K = W.katex;
    if (!K || !root) return;
    const walk = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => /[√∛∜$]/.test(n.nodeValue) && !(n.parentElement && n.parentElement.closest(".katex, script, style, textarea, code, input"))
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    const nodes = [];
    while (walk.nextNode()) nodes.push(walk.currentNode);
    for (const n of nodes) {
      const s = n.nodeValue, found = pieces(s);
      if (!found.length) continue;
      const frag = D.createDocumentFragment();
      let last = 0;
      for (const [a, b, tex, disp] of found) {
        if (a > last) frag.appendChild(D.createTextNode(s.slice(last, a)));
        const span = D.createElement(disp ? "div" : "span");
        if (disp) span.className = "wa-math";
        try { K.render(tex, span, { throwOnError: false, strict: "ignore", displayMode: disp, output: "html" }); }
        catch (e) { span.textContent = s.slice(a, b); }
        frag.appendChild(span);
        last = b;
      }
      if (last < s.length) frag.appendChild(D.createTextNode(s.slice(last)));
      n.parentNode.replaceChild(frag, n);
    }
  }
  // Todo lo que el motor pinta después (ejercicios, soluciones…) se convierte solo
  function watch() {
    if (!W.katex || !W.MutationObserver) return;
    let queued = new Set(), timer = 0;
    new MutationObserver(list => {
      for (const m of list) m.addedNodes.forEach(n => { const el = n.nodeType === 1 ? n : n.parentElement; if (el) queued.add(el); });
      // setTimeout y no requestAnimationFrame: este no corre con la pestaña oculta
      if (!timer) timer = setTimeout(() => { timer = 0; const q = queued; queued = new Set(); q.forEach(el => el.isConnected && typeset(el)); }, 0);
    }).observe(D.body, { childList: true, subtree: true });
    typeset(D.body);
  }
  return { toTex, findRoots, typeset, watch };
})();
WA.MATH_TEX = MATH;

// ── Azar con semilla (mulberry32) ───────────────────────────────────────
function makeRng(seed) {
  let a = (seed >>> 0) || 1;
  const r = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t2 = Math.imul(a ^ a >>> 15, 1 | a); t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2; return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296; };
  const R = {
    r, int: (lo, hi) => lo + Math.floor(r() * (hi - lo + 1)),
    pick: arr => arr[Math.floor(r() * arr.length)],
    shuffle: arr => { const a2 = arr.slice(); for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; } return a2; },
  };
  return R;
}
WA.makeRng = makeRng;
let RNG = makeRng(Date.now() ^ Math.floor(Math.random() * 1e9));

// Notación que los generadores escriben a la española y que algún idioma cambia (sen → sin,
// tg → tan…): L.genText(texto) se aplica a todo lo que se enseña de un ejercicio generado.
function genText(it) {
  const f = L.genText;
  if (!f || !it) return it;
  const s = x => typeof x === "string" ? f(x) : x;
  ["q", "sol", "ansHtml", "hint"].forEach(k => { if (typeof it[k] === "string") it[k] = f(it[k]); });
  if (Array.isArray(it.opts)) it.opts = it.opts.map(s);
  if (Array.isArray(it.fields)) it.fields = it.fields.map(x => Object.assign({}, x, { label: s(x.label) }, x.ansHtml ? { ansHtml: s(x.ansHtml) } : {}));
  return it;
}
// Ejercicio a partir de una entrada de la especificación de una lección
function makeItem(spec, R) {
  if (spec.gen) {
    const g = WA.GEN && WA.GEN[spec.gen];
    if (!g) return null;
    if (spec.gen === "nat.letras" && !L.words) return null;
    try { return genText(g(R, L.gen || {}, H, L)); } catch (e) { console.warn("[WikiAula] gen", spec.gen, e); return null; }
  }
  if (spec.fixed) {
    const it = Object.assign({}, spec.fixed);
    if (it.kind === "choice" && it.shuffle !== false) { // barajamos las opciones
      const order = R.shuffle(it.opts.map((_, i) => i));
      it.opts = order.map(i => spec.fixed.opts[i]);
      it.correct = order.indexOf(spec.fixed.correct);
    }
    return it;
  }
  return null;
}
WA.makeItem = makeItem;

// ── Datos del ZIM ───────────────────────────────────────────────────────
const DATA = WA.DATA || { courses: {}, pages: {} };
const LESSONS = {}, UNITS = {};
Object.values(DATA.courses).forEach(c => c.units.forEach((u, ui) => {
  UNITS[u.id] = Object.assign(u, { course: c.id, index: ui });
  (u.lessons || []).forEach((l, li) => { LESSONS[l.id] = Object.assign(l, { unit: u.id, course: c.id, index: li }); });
}));
// Ejercicios de una lección: _aula/spec/<curso>.js (solo en las páginas que practican)
const specOf = lid => { const l = LESSONS[lid]; return (l && ((WA.SPEC || {})[l.course] || {})[lid]) || (l && l.spec) || []; };
const href = p => "./" + encodeURIComponent(p).replace(/%2F/g, "/");
WA.href = href;

// ── Fechas ──────────────────────────────────────────────────────────────
const dayStr = (d = new Date()) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const addDays = (s, n) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return dayStr(d); };
const today = () => dayStr();

// ── Guardado ────────────────────────────────────────────────────────────
const LS_KEY = "wikiaula.v1";
const fresh = () => ({ v: 1, xp: 0, days: {}, streak: { cur: 0, best: 0, last: "" }, lessons: {}, units: {}, ach: [],
  stats: { answers: 0, correct: 0, sessions: 0, perfect: 0, reviews: 0, bestCombo: 0, goals: 0 }, settings: { goal: 50 }, last: "" });
let S = fresh();
let saveTimer = null;
function normalize(d) {
  const f = fresh();
  if (!d || d.v !== 1) return f;
  const out = Object.assign(f, d);
  out.stats = Object.assign(fresh().stats, d.stats || {});
  out.settings = Object.assign(fresh().settings, d.settings || {});
  out.streak = Object.assign(fresh().streak, d.streak || {});
  return out;
}
async function load() {
  if (BR && BR.storage) {
    try { const r = await fetch(BR.storage, { cache: "no-store" }); const j = r.ok ? await r.json() : {}; S = normalize(j && j.data); return; }
    catch (e) { S = fresh(); return; }
  }
  try { S = normalize(JSON.parse(localStorage.getItem(LS_KEY) || "null")); } catch (e) { S = fresh(); }
}
function saveNow() {
  if (BR && BR.storage) {
    try { navigator.sendBeacon(BR.storage, new Blob([JSON.stringify({ data: S })], { type: "application/json" })); } catch (e) {}
    return;
  }
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
}
function save() {
  clearTimeout(saveTimer);
  if (BR && BR.storage) {
    saveTimer = setTimeout(() => {
      saveTimer = null;   // ya guardado: al salir de la página no hace falta otra copia
      fetch(BR.storage, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: S }) }).catch(() => {});
    }, 300);
  } else saveNow();
}
W.addEventListener("pagehide", () => { if (saveTimer) { clearTimeout(saveTimer); saveNow(); } });

// Avisos a Offlined (solo si estamos dentro de la app)
function post(ev, extra) {
  if (!BR || W.top === W) return;
  try { W.top.postMessage(Object.assign({ type: "ofl:aula", ev, path: location.pathname }, extra || {}), location.origin); } catch (e) {}
}

// ── Lecciones: registro y dominio ──────────────────────────────────────
const BOX_DAYS = [1, 3, 7, 16, 35, 80];
const lrec = id => S.lessons[id] || (S.lessons[id] = { lv: 0, seen: "", best: 0, n: 0, b: 0, due: "", comp: "" });
const lv = id => (S.lessons[id] && S.lessons[id].lv) || 0;
function setLevel(id, newLv) {
  const r = lrec(id), old = r.lv;
  if (newLv === old) return false;
  r.lv = newLv;
  if (newLv >= 3 && !r.comp) r.comp = today();
  if (newLv >= 2 && !r.due) { r.b = 0; r.due = addDays(today(), BOX_DAYS[0]); }
  const l = LESSONS[id];
  post("mastery", Object.assign({ lesson: id, level: newLv, old, title: l && l.title, course: l && l.course }, cardInfo(id)));
  return newLv > old;
}
function badge(level) {
  const m = UI.mastery || [];
  return `<span class="wa-badge lv-${level}">${esc(m[level] || "")}</span>`;
}
function meter(level) {
  let s = '<span class="wa-meter" aria-hidden="true">';
  for (let i = 1; i <= 4; i++) s += `<i class="${i <= level ? "on lv-" + level : ""}"></i>`;
  return s + "</span>";
}
const dueLessons = () => Object.keys(S.lessons).filter(id => LESSONS[id] && S.lessons[id].lv >= 2 && S.lessons[id].due && S.lessons[id].due <= today());

// ── XP, racha, meta, nivel ──────────────────────────────────────────────
const levelOf = xp => { let n = 1; while (50 * (n + 1) * n <= xp) n++; return n; }; // nivel n desde 50·n·(n−1) XP
const levelStart = n => 50 * n * (n - 1);
function addXp(n) {
  if (!n) return;
  const d = today(), before = S.days[d] || 0;
  S.xp += n;
  S.days[d] = before + n;
  const goal = S.settings.goal || 50;
  if (before < goal && S.days[d] >= goal) { S.stats.goals++; toast(t("goalDone"), "goal"); }
}
function touchStreak() {
  const d = today();
  if (S.streak.last === d) return;
  S.streak.cur = S.streak.last === addDays(d, -1) ? S.streak.cur + 1 : 1;
  S.streak.last = d;
  S.streak.best = Math.max(S.streak.best, S.streak.cur);
}
const streakNow = () => (S.streak.last === today() || S.streak.last === addDays(today(), -1)) ? S.streak.cur : 0;

// ── Logros ──────────────────────────────────────────────────────────────
const ACH = [
  ["first", () => S.stats.sessions >= 1],
  ["perfect", () => S.stats.perfect >= 1],
  ["combo10", () => S.stats.bestCombo >= 10],
  ["streak3", () => S.streak.best >= 3],
  ["streak7", () => S.streak.best >= 7],
  ["streak30", () => S.streak.best >= 30],
  ["reader10", () => Object.values(S.lessons).filter(r => r.seen).length >= 10],
  ["master1", () => Object.values(S.lessons).some(r => r.lv >= 4)],
  ["master10", () => Object.values(S.lessons).filter(r => r.lv >= 4).length >= 10],
  ["unit1", () => Object.values(S.units).some(u => u.passed)],
  ["review1", () => S.stats.reviews >= 1],
  ["answers100", () => S.stats.answers >= 100],
  ["answers1000", () => S.stats.answers >= 1000],
  ["goal7", () => S.stats.goals >= 7],
  ["course", () => Object.values(DATA.courses).some(c => { const ids = courseLessonIds(c.id); return ids.length && ids.every(id => lv(id) >= 4); })],
];
function checkAch() {
  let got = false;
  ACH.forEach(([id, ok]) => {
    if (S.ach.includes(id) || !ok()) return;
    S.ach.push(id);
    got = true;
    const a = (L.ach || {})[id] || [id, ""];
    toast(`<b>${esc(t("toastAch"))}</b><br>${esc(a[0])}`, "ach");
    post("achievement", { id, name: a[0], desc: a[1] });
  });
  if (got) save();
}
const courseLessonIds = cid => (DATA.courses[cid] ? DATA.courses[cid].units.flatMap(u => (u.lessons || []).map(l => l.id)) : []);

// ── Avisos flotantes ────────────────────────────────────────────────────
function toast(html, kind) {
  let box = D.querySelector(".wa-toasts");
  if (!box) { box = D.createElement("div"); box.className = "wa-toasts"; box.setAttribute("aria-live", "polite"); D.body.appendChild(box); }
  const el = D.createElement("div");
  el.className = "wa-toast " + (kind || "");
  el.innerHTML = html;
  box.appendChild(el);
  setTimeout(() => el.classList.add("out"), 3600);
  setTimeout(() => el.remove(), 4200);
}

// ── Barra superior ──────────────────────────────────────────────────────
const ICON = {
  flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-6 1-9.5z"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.3l6.6-.8z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v3h3v2a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V6h3zm0 5V6H6v2a2 2 0 0 0 1 1.7zm10 0a2 2 0 0 0 1-1.7V6h-1z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3h1v11H6V10zm2 0h6V7a3 3 0 0 0-6 0z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
};
WA.ICON = ICON;
function renderStats() {
  const goal = S.settings.goal || 50, done = S.days[today()] || 0, pct = Math.min(1, done / goal);
  const lvl = levelOf(S.xp), st = streakNow();
  const ring = `<svg class="wa-ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" class="bg"/><circle cx="18" cy="18" r="15" class="fg" stroke-dasharray="${(pct * 94.25).toFixed(1)} 94.25" transform="rotate(-90 18 18)"/></svg>`;
  D.querySelectorAll(".wa-stats").forEach(el => {
    el.innerHTML =
      `<a class="wa-chip" href="${href(DATA.pages.progress || "Mi_progreso")}" title="${esc(t("xp", { n: S.xp }))}">${ICON.star}<span>${esc(t("level", { n: lvl }))}</span></a>` +
      `<span class="wa-chip ${st ? "hot" : ""}" title="${esc(st === 1 ? t("streak1") : t("streak", { n: st }))}">${ICON.flame}<span>${st}</span></span>` +
      `<span class="wa-chip ${pct >= 1 ? "done" : ""}" title="${esc(t("goal", { a: done, b: goal }))}">${ring}<span>${done}/${goal}</span></span>`;
  });
}

// ── Lección leída (como "Visto" en Mi WikiÁlbum) ────────────────────────
function seenProbe(id) {
  if (!id || (S.lessons[id] && S.lessons[id].seen)) return;
  let vis = 0, sent = false;
  const mark = () => {
    if (sent) return; sent = true; clearInterval(tm);
    lrec(id).seen = today();
    S.last = id;
    save(); checkAch();
    const l = LESSONS[id];
    post("seen", Object.assign({ lesson: id, title: l && l.title, course: l && l.course, level: lv(id) }, cardInfo(id)));
  };
  const tm = setInterval(() => { if (D.visibilityState !== "hidden" && ++vis >= 15) mark(); }, 1000);
  W.addEventListener("scroll", () => {
    const s = D.scrollingElement || D.documentElement;
    if (s.scrollTop > 0 && s.scrollTop + W.innerHeight >= s.scrollHeight * 0.5) mark();
  }, { passive: true });
}

// Imagen de la tarjeta (la primera figura de la lección) y su primer párrafo (solo en su propia página)
function cardInfo(id) {
  if (D.body.dataset.lesson !== id) return {};
  const im = D.querySelector(".mw-parser-output figure.wa-fig img");
  let lead = "";
  for (const p of D.querySelectorAll(".mw-parser-output > p")) {
    const txt = (p.textContent || "").replace(/\s+/g, " ").trim();
    if (txt.length > 60) { lead = txt.slice(0, 600); break; }
  }
  let img = "";
  try { if (im) img = new URL(im.getAttribute("src"), location.href).pathname; } catch (e) {}
  return { img, lead };
}

function renderMastery() {
  D.querySelectorAll(".wa-mastery[data-lesson]").forEach(el => {
    const l = lv(el.dataset.lesson);
    el.innerHTML = meter(l) + badge(l);
    el.title = t("masteryHelp");
  });
}

// ═════════════════ Comprobación de respuestas ═════════════════
// Tipos: int · num (decimal, fracción o entero; tol) · frac (fracción exacta
// [n, d]; simplest = irreducible) · expr (expresión algebraica: se compara
// evaluándola en varios puntos; vars) · text (alternativas) · fields (varias
// casillas, cada una de cualquier tipo de los anteriores; por defecto int) ·
// choice · multi · set (lista de números) · factors (producto de primos).
const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
const supToCaret = s => s.replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => "^" + (m.length > 1 || m === "⁻" ? "(" : "") + m.split("").map(c => SUP[c]).join("") + (m.length > 1 || m === "⁻" ? ")" : ""));
function parseNat(s) {
  s = String(s || "").trim().replace(/[\s  .,'’]/g, "").replace(/^[−–]/, "-").replace(/^\+(?=\d)/, "");   // «+7» = 7 (cargas, números de oxidación)
  return /^-?\d+$/.test(s) ? parseInt(s, 10) : null;
}
// Separadores al leer lo que escribe el alumno (según L.num). DEC es el decimal del idioma entre «,» y «.»;
// OTH, el otro. Si OTH es además el separador de miles (en: «,»), «12,500» es 12500 cuando los grupos están
// bien formados (1–3 cifras y luego grupos de 3, o a la india 1,00,000); si no, se toma como decimal («2,5»
// en inglés = 2.5, por si el alumno usa la coma). En es (miles con espacio) todo queda como antes: una coma
// o un punto sueltos son decimales y, con los dos, el primero que aparece es el de los miles.
const DEC = NUM.decimal === "." ? "." : ",", OTH = DEC === "," ? "." : ",";
const GROUPED = NUM.group === OTH ? new RegExp(`^-?(?:[1-9]\\d{0,2}(?:\\${OTH}\\d{3})+|[1-9]\\d?(?:\\${OTH}\\d{2})*\\${OTH}\\d{3})$`) : null;
// Número escrito por el alumno: 3 · −2,5 · 2.5 · 3/4 · 1 1/2 · 12 500,75 (es) · 12,500.75 (en)
function parseNum(s) {
  s = String(s || "").trim().replace(/[−–]/g, "-").replace(/[  ]/g, " ").replace(/^\+\s*(?=[\d.,])/, "");
  if (!s) return null;
  let m = /^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(s);               // número mixto
  if (m) { const d = +m[4]; return d ? (m[1] ? -1 : 1) * (+m[2] + +m[3] / d) : null; }
  m = /^(-?[\d.,]+)\s*\/\s*(-?[\d.,]+)$/.exec(s);                   // fracción
  if (m) { const a = parseDec(m[1]), b = parseDec(m[2]); return a === null || b === null || !b ? null : a / b; }
  return parseDec(s);
}
function parseDec(s) {
  s = String(s).replace(/\s+/g, "");
  if (s.includes(",") && s.includes(".")) s = s.indexOf(",") < s.indexOf(".") ? s.replace(/,/g, "") : s.replace(/\./g, "").replace(",", ".");
  else if (GROUPED && GROUPED.test(s)) s = s.split(OTH).join("");
  else s = s.replace(",", ".");
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? parseFloat(s) : null;
}
function gcdI(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
function parseFrac(s) {   // → [n, d] con d > 0, o null
  s = String(s || "").trim().replace(/[−–]/g, "-").replace(/\s+/g, "").replace(/^\+(?=\d)/, "");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) { let n = +m[1], d = +m[2]; if (!d) return null; if (d < 0) { n = -n; d = -d; } return [n, d]; }
  m = /^-?\d+$/.exec(s);
  return m ? [+s, 1] : null;
}
// Lista: «1, 2, 4» o «1 2 4»; con punto y coma si hay decimales con coma (sep: ";"). Si el idioma usa el punto
// decimal, «0.5, 2, −3» también vale aunque el ejercicio pida punto y coma. (Los números de una lista separada
// por comas no pueden llevar separador de miles «,»: «1,250, 3» se lee 1, 250 y 3.)
function parseList(s, sep) {
  const str = String(s || ""), semi = str.includes(";") || (sep === ";" && DEC === ",");
  const parts = str.split(semi ? /\s*;\s*/ : /[,\s]+/).filter(Boolean);
  const out = parts.map(parseNum);
  return out.some(x => x === null) ? null : out;
}
function parseFactors(s) {
  s = String(s || "").trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => "^" + m.split("").map(c => SUP[c]).join(""))
    .replace(/\*\*/g, "^").replace(/[x×X*·•.]/g, " ");
  const toks = s.split(/\s+/).filter(Boolean);
  if (!toks.length) return null;
  const f = {};
  for (const tk of toks) {
    const m = /^(\d+)(?:\^(\d+))?$/.exec(tk);
    if (!m) return null;
    const p = +m[1], e = m[2] ? +m[2] : 1;
    f[p] = (f[p] || 0) + e;
  }
  return f;
}

// ── Expresiones: 3x^2 − 2x + 1 · 2(x+1)(x−3) · sqrt(x)/2 · sen(2x) · e^x · ln(x) ──
const FN = { sqrt: Math.sqrt, raiz: Math.sqrt, sin: Math.sin, sen: Math.sin, cos: Math.cos, tan: Math.tan, tg: Math.tan,
  ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs, arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan, arctg: Math.atan };
const CONST = { pi: Math.PI, e: Math.E };
function parseExpr(src, vars) {
  let s = supToCaret(String(src || "")).trim().toLowerCase()
    .replace(/[−–]/g, "-").replace(/[·×]/g, "*").replace(/÷/g, "/").replace(/\*\*/g, "^").replace(/π/g, "pi").replace(/√/g, "sqrt")
    .replace(/(\d),(\d)/g, "$1.$2").replace(/[\[{]/g, "(").replace(/[\]}]/g, ")")
    .replace(/\|([^|]+)\|/g, "abs($1)");                 // |x − 3| → abs(x − 3)
  s = s.replace(/^\s*[a-z](\([a-z]\))?\s*=\s*/, "");   // "y = …", "f(x) = …"
  const V = new Set(vars && vars.length ? vars : ["x"]);
  const toks = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    let m = /^\d+\.?\d*|^\.\d+/.exec(s.slice(i));
    if (m) { toks.push({ t: "n", v: parseFloat(m[0]) }); i += m[0].length; continue; }
    m = /^[a-z]+/.exec(s.slice(i));
    if (m) {
      let w = m[0];
      i += w.length;
      while (w) {   // "xy" → x·y; "sen" → función; "2pi" → 2·π
        const f = Object.keys(FN).concat(Object.keys(CONST)).filter(k => w.startsWith(k)).sort((a, b) => b.length - a.length)[0];
        if (f && !(f.length === 1 && V.has(f))) { toks.push(FN[f] ? { t: "f", v: FN[f] } : { t: "n", v: CONST[f] }); w = w.slice(f.length); continue; }
        if (V.has(w[0])) { toks.push({ t: "v", v: w[0] }); w = w.slice(1); continue; }
        return null;
      }
      continue;
    }
    if ("+-*/^()".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (c === ":") { toks.push({ t: "/" }); i++; continue; }
    return null;
  }
  // multiplicación implícita: 2x · 3( · )( · x( · )x · 2sqrt
  const T = [];
  toks.forEach((tk, k) => {
    const p = T[T.length - 1];
    if (p && (p.t === "n" || p.t === "v" || p.t === ")") && (tk.t === "n" || tk.t === "v" || tk.t === "(" || tk.t === "f")) T.push({ t: "*" });
    T.push(tk);
  });
  let pos = 0;
  const peek = () => T[pos], eat = t => (T[pos] && T[pos].t === t ? T[pos++] : null);
  function expr() { let a = term(); if (!a) return null; for (;;) { if (eat("+")) { const b = term(), x = a; if (!b) return null; a = e => x(e) + b(e); } else if (eat("-")) { const b = term(), x = a; if (!b) return null; a = e => x(e) - b(e); } else return a; } }
  function term() { let a = unary(); if (!a) return null; for (;;) { if (eat("*")) { const b = unary(), x = a; if (!b) return null; a = e => x(e) * b(e); } else if (eat("/")) { const b = unary(), x = a; if (!b) return null; a = e => x(e) / b(e); } else return a; } }
  function unary() { if (eat("-")) { const a = unary(); return a && (e => -a(e)); } if (eat("+")) return unary(); return power(); }
  function power() { const a = primary(); if (!a) return null; if (eat("^")) { const b = unary(); return b && (e => Math.pow(a(e), b(e))); } return a; }
  function primary() {
    const tk = peek();
    if (!tk) return null;
    if (tk.t === "n") { pos++; const v = tk.v; return () => v; }
    if (tk.t === "v") { pos++; const v = tk.v; return e => e[v]; }
    if (tk.t === "f") { pos++; const f = tk.v; const a = eat("(") ? (() => { const x = expr(); return x && eat(")") ? x : null; })() : power(); return a && (e => f(a(e))); }
    if (eat("(")) { const a = expr(); return a && eat(")") ? a : null; }
    return null;
  }
  const f = expr();
  return f && pos === T.length ? f : null;
}
// upToConst: primitivas (F + C): vale cualquier constante y se puede escribir «+ C»
function exprEqual(a, b, vars, upToConst) {
  if (upToConst) a = String(a || "").replace(/\+\s*[ck]\s*$/i, "");
  const fa = parseExpr(a, vars), fb = parseExpr(b, vars);
  if (!fa || !fb) return false;
  const vs = vars && vars.length ? vars : ["x"];
  let n = 0, c = null;
  for (let k = 0; k < 14 && n < 6; k++) {
    const env = {};
    vs.forEach((v, j) => { env[v] = 0.37 + 0.71 * k - 2.9 + 0.13 * j * (k % 3); });
    const x = fa(env), y = fb(env);
    if (!isFinite(y)) continue;
    if (!isFinite(x)) return false;
    let d = x - y;
    if (upToConst) { if (c === null) c = d; d -= c; }
    if (Math.abs(d) > 1e-7 * Math.max(1, Math.abs(y))) return false;
    n++;
  }
  return n >= 3;
}
const normText = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.¡!¿?]/g, "").replace(/\s+/g, " ").trim();
const near = (a, b, tol) => Math.abs(a - b) <= (tol != null ? tol : 1e-9 * Math.max(1, Math.abs(b)));

const INT_DEC = new RegExp(`^\\s*[−–+-]?\\d+\\${OTH}\\d{1,2}\\s*$`);
function check(item, val) {
  switch (item.kind) {
    case "int": {
      // «20», pero también «20,00» o «20.0»: si es exactamente ese entero, vale.
      // El decimal del idioma (es «,»), o el otro signo con 1–2 cifras detrás = decimal; si no, puntos,
      // comas y espacios son de millares (es 12.500 · en 12,500).
      const s = String(val || "");
      let v;
      if (s.includes(DEC) || INT_DEC.test(s)) { const x = parseNum(s); v = x !== null && Number.isInteger(x) ? x : null; }
      else v = parseNat(s);
      return v !== null && v === item.ans;
    }
    case "num": { const v = parseNum(val); return v !== null && near(v, item.ans, item.tol); }
    case "frac": {
      const f = parseFrac(val);
      if (!f) return false;
      const [n, d] = item.ans;
      if (f[0] * d !== n * f[1]) return false;
      return !item.simplest || gcdI(f[0], f[1]) === 1;
    }
    case "expr": return exprEqual(val, item.ans, item.vars, item.upToConst);
    case "text": return [].concat(item.ans).some(a => normText(a) === normText(val));
    case "fields": return item.fields.every((f, i) => check(Object.assign({ kind: "int" }, f), val[i]));
    case "choice": return val === item.correct;
    case "multi": { const a = (val || []).slice().sort().join(","), b = item.correct.slice().sort().join(","); return a === b; }
    case "set": {
      const v = parseList(val, item.sep); if (!v) return false;
      const a = [...new Set(v.map(x => +x.toFixed(9)))].sort((x, y) => x - y), b = [...new Set(item.ans.map(x => +(+x).toFixed(9)))].sort((x, y) => x - y);
      return a.length === b.length && a.every((x, k) => near(x, b[k], item.tol));
    }
    case "factors": {
      const f = parseFactors(val); if (!f) return false;
      let prod = 1;
      for (const p in f) { if (!WA.MATH.isPrime(+p)) return false; prod *= (+p) ** f[p]; }
      return prod === item.ans;
    }
  }
  return false;
}
function answerHtml(item) {
  if (item.ansHtml) return item.ansHtml;
  switch (item.kind) {
    case "int": return H.n(item.ans);
    case "num": return H.dec(item.ans);
    case "frac": return item.ans[1] === 1 ? H.n(item.ans[0]) : (item.ans[0] < 0 ? "−" : "") + H.frac(Math.abs(item.ans[0]), item.ans[1]);
    case "expr": return esc(item.ans);
    case "text": return esc([].concat(item.ans)[0]);
    case "fields": return item.fields.map(f => `${esc(f.label)}: ${answerHtml(Object.assign({ kind: "int" }, f))}`).join(" · ");
    case "choice": return item.opts[item.correct];
    case "multi": return item.correct.length ? item.correct.map(i => item.opts[i]).join(", ") : "—";
    case "set": return item.ans.length ? item.ans.map(x => Number.isInteger(x) ? H.n(x) : H.dec(x)).join(item.sep === ";" ? "; " : ", ") : "—";
    case "factors": { const f = WA.MATH.factorize(item.ans); return Object.keys(f).map(Number).sort((a, b) => a - b).map(p => f[p] > 1 ? H.pow(p, f[p]) : p).join(" " + H.mul + " "); }
  }
  return "";
}
function userHtml(item, val) {
  if (item.kind === "choice") return val == null ? "—" : item.opts[val];
  if (item.kind === "multi") return (val || []).length ? val.map(i => item.opts[i]).join(", ") : "—";
  if (item.kind === "fields") return item.fields.map((f, i) => `${esc(f.label)}: ${esc(val[i] || "—")}`).join(" · ");
  return esc(val || "—");
}
WA.check = check; WA.answerHtml = answerHtml; WA.parseExpr = parseExpr; WA.parseNum = parseNum;

// ═════════════════ Michael Knowledge dentro de la práctica (solo en Offlined) ═════════════════
// Las respuestas escritas que no coinciden letra a letra las revisa Michael Knowledge y
// su veredicto es el que cuenta; en los fallos explica por qué. Offlined hace
// la consulta (/api/wikiaula/grade) y devuelve el texto a trozos con
// postMessage {type: "ofl:aula-grade", id, kind: waiting|delta|done}.
const CHOICE = k => k === "choice" || k === "multi";
const aiOn = () => !!(BR && BR.tutor && BR.grade && W.top !== W);
const AI_CB = {};
let aiSeq = 0;
// Texto plano con potencias, fracciones y subíndices legibles para el modelo
function plainM(html) {
  const d = D.createElement("div");
  d.innerHTML = html;
  const wrap = s => /^[\w.,√]+$/.test(s) ? s : `(${s})`;
  d.querySelectorAll(".wa-fr").forEach(f => { const c = f.children; if (c.length === 3) f.textContent = wrap(c[0].textContent.trim()) + "/" + wrap(c[2].textContent.trim()); });
  d.querySelectorAll("sup").forEach(s => { const x = s.textContent.trim(); s.textContent = "^" + (x.length > 1 ? `(${x})` : x); });
  d.querySelectorAll("sub").forEach(s => { const x = s.textContent.trim(); s.textContent = /^\d+$/.test(x) ? x : "_" + x; });   // Na2SO4, pero a_n
  d.querySelectorAll("br, p, li, div").forEach(b => b.insertAdjacentText("afterend", " "));
  return (d.textContent || "").replace(/\s+/g, " ").trim();
}
// Markdown mínimo (negrita, cursiva, listas, párrafos) ya escapado
function mdLite(s) {
  let h = esc(String(s || "").trim());
  h = h.replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, "$1<i>$2</i>");
  if (!h.includes("$")) h = h.replace(/\^(\d+|\([^)\n]{1,12}\))/g, (m, e) => `<sup>${e.replace(/^\(|\)$/g, "")}</sup>`);
  return h.split(/\n{2,}/).map(p => `<p>${p.replace(/^\s*[-*•]\s+/gm, "• ").replace(/\n/g, "<br>")}</p>`).join("");
}
// La primera línea del veredicto (CORRECT / INCORRECT) no se enseña
const VERDICT_RX = /^[\W_]*(incorrect[oa]?|wrong|correct[oa]?|right)\b[\s:.,;!*_\-–—]*/i;
function stripVerdict(s) {
  s = String(s || "").replace(/^\s+/, "");
  const m = VERDICT_RX.exec(s);
  if (m) return s.slice(m[0].length);
  return /^[\W_]*[a-z]{0,9}$/i.test(s) ? "" : s;   // aún está escribiendo la palabra
}
function aiBoxHtml(inner) {
  const av = BR && BR.avatar ? `<img class="wa-ai-av" src="${esc(BR.avatar)}" alt="">` : "";
  return `<div class="wa-ai">${av}<div class="wa-ai-main"><div class="wa-ai-name">${esc(t("aiName"))}</div><div class="wa-ai-body">${inner || ""}</div></div></div>`;
}
// Recuadro de Michael Knowledge con su estado (revisando… 5 s) y el texto según llega
function aiBox(fb, key, append) {
  const tmp = D.createElement("div");
  tmp.innerHTML = aiBoxHtml("");
  const box = tmp.firstElementChild;
  if (!append) fb.innerHTML = "";
  fb.appendChild(box);
  const name = box.querySelector(".wa-ai-name"), body = box.querySelector(".wa-ai-body");
  const st = D.createElement("span");
  st.className = "wa-ai-st";
  name.appendChild(st);
  const B = {
    key,
    status(k, s) { st.innerHTML = `${esc(t(k))}<i class="wa-dots" aria-hidden="true"><b></b><b></b><b></b></i>${s ? `<em>${esc(t("aiSecs", { n: s }))}</em>` : ""}`; },
    text(s) { body.innerHTML = mdLite(s); },
    done(s) { st.remove(); body.innerHTML = mdLite(s); },
    fail() { st.remove(); body.innerHTML = `<span class="wa-ai-failtxt">${esc(t("aiFailedExplain"))}</span>`; },
    remove() { box.remove(); },
  };
  B.status(key, 0);
  box.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return B;
}
// Pide a Michael Knowledge que corrija ("grade") o explique ("explain"). Devuelve la
// función para cancelarlo. onDone(veredicto, texto, error).
function aiGrade(mode, data, box, onDone) {
  const id = "g" + Date.now().toString(36) + "-" + (++aiSeq), t0 = Date.now();
  let key = box.key;
  const secs = () => Math.floor((Date.now() - t0) / 1000);
  const tick = setInterval(() => box.status(key, secs()), 1000);
  const fin = () => { clearInterval(tick); delete AI_CB[id]; };
  AI_CB[id] = d => {
    if (d.kind === "waiting") {
      key = d.reason === "loading" ? "aiWaking" : d.reason === "queued" ? "aiQueued" : box.key;
      box.status(key, secs());
    } else if (d.kind === "delta") {
      const s = mode === "grade" ? stripVerdict(d.text) : d.text;
      if (s) { key = box.key; box.text(s); }
    } else if (d.kind === "done") {
      fin();
      const text = String(d.text || "").trim();
      if (mode === "explain") { if (text) box.done(text); else box.fail(); }
      onDone(d.verdict, text, d.error || (text ? "" : "empty"));
    }
  };
  post("grade", Object.assign({ id, mode, lang: LANG }, data));
  return () => { if (!AI_CB[id]) return; fin(); post("gradeStop", { id }); box.remove(); };
}

// ═════════════════ Sesión de práctica ═════════════════
const SIZES = { lesson: 8, unit: 12, review: 10 };
function buildQueue(lessonIds, n) {
  // Variedad: no repite el mismo tipo de ejercicio dos veces seguidas y cada
  // vez que sale uno baja su probabilidad; las preguntas fijas, una vez como mucho.
  const out = [], seen = new Set(), usedFixed = new Set(), uses = new Map();
  const order = RNG.shuffle(lessonIds);
  let guard = 0, prev = null;
  while (out.length < n && guard++ < n * 30) {
    const lid = order[out.length % order.length];
    const spec = specOf(lid);
    let pool = spec.filter((s, i) => !(s.fixed && usedFixed.has(lid + "#" + i)));
    if (pool.length > 1) pool = pool.filter(s => s !== prev);
    if (!pool.length) continue;
    const wOf = s => (s.w || (s.fixed ? 0.6 : 1)) * Math.pow(0.4, uses.get(s) || 0);
    const tot = pool.reduce((a, s) => a + wOf(s), 0);
    let r = RNG.r() * tot, pickS = pool[0];
    for (const s of pool) { r -= wOf(s); if (r <= 0) { pickS = s; break; } }
    const it = makeItem(pickS, RNG);
    if (!it || seen.has(it.q)) continue;
    if (pickS.fixed) usedFixed.add(lid + "#" + spec.indexOf(pickS));
    uses.set(pickS, (uses.get(pickS) || 0) + 1);
    prev = pickS;
    seen.add(it.q);
    it.lesson = lid;
    out.push(it);
  }
  return out;
}

function mountPractice(el) {
  const mode = el.dataset.mode || "lesson";
  const ids = () => mode === "lesson" ? [el.dataset.lesson]
    : mode === "unit" ? ((UNITS[el.dataset.unit] && UNITS[el.dataset.unit].lessons) || []).map(l => l.id)
    : (el._ids || []);
  let q = [], i = 0, results = [], combo = 0, xpGain = 0, answered = false, sel = null, warmed = false;

  function intro() {
    if (mode === "lesson") {
      const l = lv(el.dataset.lesson);
      el.innerHTML = `<div class="wa-card"><div class="wa-card-head"><span class="wa-card-title">${esc(t("practice"))}</span>${meter(l)}${badge(l)}</div>
        <p class="wa-muted">${esc(t("practiceIntro", { n: SIZES.lesson }))}</p>
        <button class="wa-btn primary wa-go">${ICON.play}<span>${esc(t(l ? "practiceAgain" : "practiceStart"))}</span></button></div>`;
    } else if (mode === "unit") {
      const u = UNITS[el.dataset.unit], rec = S.units[el.dataset.unit] || {};
      el.innerHTML = `<div class="wa-card boss"><div class="wa-card-head"><span class="wa-card-title">${ICON.trophy}${esc(t("unitTest"))}</span>${rec.passed ? `<span class="wa-badge lv-4">${esc(t("unitMedal"))}</span>` : ""}</div>
        <p class="wa-muted">${esc(t("unitTestIntro", { n: SIZES.unit }))}</p>
        <button class="wa-btn primary wa-go">${ICON.play}<span>${esc(t("unitTestStart"))}</span></button></div>`;
    } else return; // el repaso lo arranca renderReview
    el.querySelector(".wa-go").onclick = start;
  }
  function start() {
    const list = ids().filter(id => LESSONS[id]);
    if (!list.length) return;
    q = buildQueue(list, SIZES[mode]);
    i = 0; results = []; combo = 0; xpGain = 0;
    el._lessonIds = list;
    show();
  }
  el._start = start;

  function bar() {
    return `<div class="wa-steps">${q.map((_, k) => `<i class="${k < results.length ? (results[k].ok ? "ok" : "ko") : k === i ? "cur" : ""}"></i>`).join("")}</div>`;
  }
  function hint(it, def) {
    const h = it.hint || (def ? t(def) : "");
    return h ? `<div class="wa-hint">${esc(h)}</div>` : "";
  }
  function inputHtml(it) {
    switch (it.kind) {
      case "int": return `<input class="wa-in" inputmode="numeric" autocomplete="off" aria-label="${esc(t("empty"))}">${hint(it)}`;
      case "num": return `<input class="wa-in" inputmode="decimal" autocomplete="off" aria-label="${esc(t("empty"))}">${hint(it, "hintNum")}`;
      case "frac": return `<input class="wa-in" autocomplete="off" aria-label="${esc(t("empty"))}">${hint(it, "hintFrac")}`;
      case "expr": return `<input class="wa-in wide" autocomplete="off" spellcheck="false" aria-label="${esc(t("empty"))}">${hint(it, "hintExpr")}`;
      case "text": return `<input class="wa-in wide" autocomplete="off" aria-label="${esc(t("empty"))}">${hint(it)}`;
      case "fields": return `<div class="wa-fields">${it.fields.map(f => `<label><span>${esc(f.label)}</span><input class="wa-in${f.kind === "expr" ? " wide" : ""}" ${!f.kind || f.kind === "int" ? 'inputmode="numeric"' : f.kind === "num" ? 'inputmode="decimal"' : ""} autocomplete="off"></label>`).join("")}</div>${hint(it)}`;
      case "choice": return `<div class="wa-opts">${it.opts.map((o, k) => `<button type="button" class="wa-opt" data-k="${k}">${o}</button>`).join("")}</div>`;
      case "multi": return `<div class="wa-opts multi">${it.opts.map((o, k) => `<button type="button" class="wa-opt" data-k="${k}" aria-pressed="false">${o}</button>`).join("")}</div><div class="wa-hint">${esc(t("hintMulti"))}</div>`;
      case "set": return `<input class="wa-in wide" autocomplete="off">${hint(it, it.sep === ";" ? "hintListSemi" : "hintList")}`;
      case "factors": return `<input class="wa-in wide" autocomplete="off">${hint(it, "hintFactors")}`;
    }
    return "";
  }
  function show() {
    const it = q[i];
    answered = false; sel = it.kind === "multi" ? [] : null;
    const l = LESSONS[it.lesson];
    const from = mode !== "lesson" && l ? `<div class="wa-from">${esc(l.title)}</div>` : "";
    el.innerHTML = `<div class="wa-card${mode === "unit" ? " boss" : ""}">
      <div class="wa-card-head"><span class="wa-card-title">${esc(t("questionOf", { a: i + 1, b: q.length }))}</span>${combo >= 3 ? `<span class="wa-combo">${ICON.flame}${esc(t("combo", { n: combo }))}</span>` : ""}</div>
      ${bar()}${from}
      <div class="wa-q">${it.q}</div>
      <div class="wa-a">${inputHtml(it)}</div>
      <div class="wa-actions"><button class="wa-btn primary wa-check">${esc(t("check"))}</button></div>
      <div class="wa-fb" aria-live="polite"></div></div>`;
    el.querySelectorAll(".wa-opt").forEach(b => b.onclick = () => {
      if (answered) return;
      const k = +b.dataset.k;
      if (it.kind === "multi") {
        const j = sel.indexOf(k);
        if (j >= 0) sel.splice(j, 1); else sel.push(k);
        b.classList.toggle("sel"); b.setAttribute("aria-pressed", b.classList.contains("sel"));
      } else {
        sel = k;
        el.querySelectorAll(".wa-opt").forEach(x => x.classList.toggle("sel", x === b));
      }
    });
    el.querySelectorAll(".wa-in").forEach((inp, k, all) => inp.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (k < all.length - 1 && !all[k + 1].value) all[k + 1].focus(); else doCheck();
    }));
    el.querySelector(".wa-check").onclick = doCheck;
    // Hay ejercicios escritos: que el modelo vaya cargando por si hay que corregir
    if (!CHOICE(it.kind) && aiOn() && !warmed) { warmed = true; post("warm"); }
    const first = el.querySelector(".wa-in");
    if (first) first.focus({ preventScroll: true });
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function value(it) {
    const ins = [...el.querySelectorAll(".wa-in")].map(x => x.value);
    if (it.kind === "fields") return ins;
    if (it.kind === "choice" || it.kind === "multi") return sel;
    return ins[0];
  }
  function isEmpty(it, v) {
    if (it.kind === "choice") return v == null;
    if (it.kind === "multi") return false; // "ninguna" es una respuesta válida
    if (it.kind === "fields") return v.some(x => !String(x).trim());
    return !String(v || "").trim();
  }
  function doCheck() {
    if (answered) return;
    const it = q[i], v = value(it);
    const fb = el.querySelector(".wa-fb");
    if (isEmpty(it, v)) { fb.innerHTML = `<div class="wa-warn">${esc(t("empty"))}</div>`; return; }
    answered = true;
    const ok = check(it, v);
    el.querySelectorAll(".wa-in").forEach(x => x.disabled = true);
    // Respuesta escrita que no coincide letra a letra: decide Michael Knowledge
    if (!ok && !CHOICE(it.kind) && aiOn()) review(it, v);
    else settle(it, v, ok, null);
  }
  // Datos del ejercicio para Michael Knowledge (texto plano, con potencias legibles)
  function aiData(it, v) {
    const l = LESSONS[it.lesson];
    const note = [];
    if (it.kind === "frac" && it.simplest) note.push("The answer must be a fully simplified fraction.");
    if (it.kind === "num" && it.tol) note.push(`Answers within ±${it.tol} of the official value are accepted (rounding).`);
    if (it.kind === "set") note.push("The order of the numbers does not matter.");
    return { lesson: it.lesson, title: l && l.title, course: l && l.course,
      question: plainM(it.q), answer: plainM(userHtml(it, v)), right: plainM(answerHtml(it)),
      alts: it.kind === "text" ? [].concat(it.ans).slice(1).join(" | ") : "",
      solution: plainM(it.sol || ""), note: note.join(" ") };
  }
  // Michael Knowledge revisa la respuesta: el veredicto que cuenta es el suyo
  function review(it, v) {
    const fb = el.querySelector(".wa-fb"), act = el.querySelector(".wa-actions");
    const box = aiBox(fb, "aiChecking");
    act.innerHTML = `<button class="wa-btn ghost wa-skip">${esc(t("aiSkip"))}</button>`;
    let live = true;
    const end = aiGrade("grade", aiData(it, v), box, (verdict, text, err) => {
      if (!live || q[i] !== it || results.length !== i) return;
      live = false;
      if (verdict === true || verdict === false) settle(it, v, verdict, { text, mode: "grade" });
      else settle(it, v, false, { error: err || "unparseable" });
    });
    act.querySelector(".wa-skip").onclick = () => { if (!live) return; live = false; end(); settle(it, v, false, null); };
  }
  function settle(it, v, ok, ai) {
    const fb = el.querySelector(".wa-fb");
    results.push({ ok, lesson: it.lesson });
    S.stats.answers++;
    if (ok) { S.stats.correct++; combo++; S.stats.bestCombo = Math.max(S.stats.bestCombo, combo); xpGain += 10; addXp(10); }
    else combo = 0;
    el.querySelectorAll(".wa-opt").forEach(x => {
      x.disabled = true;
      const k = +x.dataset.k;
      const good = it.kind === "multi" ? it.correct.includes(k) : k === it.correct;
      if (good) x.classList.add("good");
      else if (x.classList.contains("sel")) x.classList.add("bad");
    });
    const last = i === q.length - 1;
    const aiText = ai && ai.text ? ai.text : "";
    // Con Michael Knowledge dentro de la práctica: su respuesta va en la tarjeta y se
    // puede seguir hablando con él; sin ella (Offlined antiguo), al chat.
    const tutor = aiText ? `<button class="wa-btn ghost wa-ai-chat">${esc(t("aiContinue"))}</button>`
      : !ok && aiOn() ? `<button class="wa-btn ghost wa-tutor">${esc(t("askTutor"))}</button>`
      : !ok && BR && BR.tutor && !BR.grade ? `<button class="wa-btn ghost wa-tutor-old">${esc(t("askTutor"))}</button>` : "";
    fb.innerHTML = (ok
      ? `<div class="wa-ok"><b>${ICON.check}${esc(t("correct"))}</b> <span class="wa-xp">${esc(t("xpEarned", { n: 10 }))}</span>
          ${ai ? `<div class="wa-official">${t("rightAnswer", { a: answerHtml(it) })}</div>` : ""}
          ${it.sol ? `<details class="wa-sol"><summary>${esc(t("showSolution"))}</summary><div>${it.sol}</div></details>` : ""}</div>`
      : `<div class="wa-ko"><b>${esc(t("wrong"))}</b> ${t("rightAnswer", { a: answerHtml(it) })}
          ${it.sol ? `<div class="wa-sol open"><div class="wa-sol-t">${esc(t("solution"))}</div><div>${it.sol}</div></div>` : ""}</div>`)
      + (aiText ? aiBoxHtml(mdLite(aiText)) : ai && ai.error ? `<div class="wa-ai-fail">${esc(t("aiFailed"))}</div>` : "");
    const act = el.querySelector(".wa-actions");
    act.innerHTML = `${tutor}<button class="wa-btn primary wa-next">${esc(t(last ? "finish" : "next"))}</button>`;
    let stopAi = null;
    const nx = act.querySelector(".wa-next");
    nx.onclick = () => { if (stopAi) stopAi(); if (last) finish(); else { i++; show(); } };
    nx.focus({ preventScroll: true });
    const verdictLine = ok ? "✅ **" + t("correct") + "**" : "❌ **" + t("wrong") + "**";
    const chatBtn = (mode, text) => {
      const b = D.createElement("button");
      b.className = "wa-btn ghost wa-ai-chat";
      b.textContent = t("aiContinue");
      b.onclick = () => post("chat", Object.assign(aiData(it, v), { mode, reply: mode === "grade" ? verdictLine + "\n\n" + text : text }));
      return b;
    };
    const cb = act.querySelector(".wa-ai-chat");
    if (cb) cb.replaceWith(chatBtn("grade", aiText));
    // Fallo: Michael Knowledge explica por qué, aquí mismo
    const tb = act.querySelector(".wa-tutor");
    if (tb) tb.onclick = () => {
      tb.remove();
      const box = aiBox(fb, "aiThinking", true);
      stopAi = aiGrade("explain", aiData(it, v), box, (verdict, text, err) => {
        stopAi = null;
        if (text) act.insertBefore(chatBtn("explain", text), act.querySelector(".wa-next"));
      });
    };
    const to = act.querySelector(".wa-tutor-old");
    if (to) to.onclick = () => {
      const d = aiData(it, v);
      post("tutor", { lesson: d.lesson, title: d.title, course: d.course, question: d.question, answer: d.answer, right: d.right, solution: d.solution });
    };
    el.querySelector(".wa-steps").outerHTML = bar();
    save(); renderStats();
  }
  function finish() {
    const n = results.length, good = results.filter(r => r.ok).length, pct = n ? good / n : 0;
    const perfect = good === n;
    const per = {};
    results.forEach(r => { const p = per[r.lesson] || (per[r.lesson] = { n: 0, ok: 0 }); p.n++; if (r.ok) p.ok++; });
    let bonus = 20 + (perfect ? 30 : 0);
    let ups = [];
    S.stats.sessions++;
    if (perfect) S.stats.perfect++;
    touchStreak();
    let extra = "";
    if (mode === "lesson") {
      const id = el.dataset.lesson, r = lrec(id), old = r.lv;
      r.n++; r.best = Math.max(r.best, pct); S.last = id;
      let nl = old;
      if (pct >= 0.8) nl = old === 3 && r.comp && r.comp !== today() ? 4 : Math.max(old, 3);
      else if (pct >= 0.5) nl = Math.max(old, 2);
      else nl = Math.max(old, 1);
      if (old >= 4 && pct >= 0.8) { r.b = Math.min(r.b + 1, BOX_DAYS.length - 1); r.due = addDays(today(), BOX_DAYS[r.b]); }
      if (setLevel(id, nl)) ups.push([id, nl]);
    } else {
      Object.keys(per).forEach(id => {
        const p = per[id], r = lrec(id), old = r.lv, allOk = p.ok === p.n, lp = p.ok / p.n;
        let nl = old;
        if (mode === "unit") nl = allOk ? (old >= 3 ? 4 : Math.max(old + 1, 2)) : (old === 4 ? 3 : Math.max(old, 1));
        else { // repaso
          if (lp >= 0.8) { r.b = Math.min(r.b + 1, BOX_DAYS.length - 1); if (old === 3) nl = 4; }
          else if (lp < 0.5) { r.b = 0; if (old === 4) nl = 3; }
          r.due = addDays(today(), BOX_DAYS[r.b]);
        }
        if (setLevel(id, nl)) ups.push([id, nl]);
      });
      if (mode === "unit") {
        const uid = el.dataset.unit, u = S.units[uid] || (S.units[uid] = { passed: "", best: 0 });
        u.best = Math.max(u.best, pct);
        if (pct >= 0.75) {
          if (!u.passed) { u.passed = today(); bonus += 100; post("unitPassed", { unit: uid, title: UNITS[uid] && UNITS[uid].title, course: UNITS[uid] && UNITS[uid].course }); }
          extra = `<p class="wa-ok-t">${ICON.trophy}${esc(t("unitPassed"))}</p>`;
        } else extra = `<p class="wa-muted">${esc(t("unitFailed"))}</p>`;
      } else { S.stats.reviews++; extra = `<p class="wa-ok-t">${esc(t("reviewDone"))}</p>`; }
    }
    addXp(bonus); xpGain += bonus;
    save(); checkAch(); renderStats(); renderMastery();
    post("session", { mode, pct, xp: xpGain, lessons: Object.keys(per) });

    const nextL = mode === "lesson" ? nextLessonAfter(el.dataset.lesson) : null;
    const lvNow = mode === "lesson" ? lv(el.dataset.lesson) : null;
    el.innerHTML = `<div class="wa-card${mode === "unit" ? " boss" : ""} wa-result">
      <div class="wa-card-head"><span class="wa-card-title">${esc(t("result"))}</span></div>
      ${bar()}
      <div class="wa-score"><b>${esc(t("score", { a: good, b: n }))}</b><span class="wa-xp big">${esc(t("xpEarned", { n: xpGain }))}</span></div>
      ${perfect ? `<p class="wa-ok-t">${ICON.star}${esc(t("perfect"))}</p>` : ""}
      ${ups.map(([id, nl]) => `<p class="wa-up">${meter(nl)} ${esc(t("masteryUp", { m: (UI.mastery || [])[nl] }))}${mode !== "lesson" ? " · " + esc(LESSONS[id].title) : ""}</p>`).join("")}
      ${mode === "lesson" && !ups.length ? `<p class="wa-muted">${meter(lvNow)} ${esc(t("masteryKeep", { m: (UI.mastery || [])[lvNow] }))}</p>` : ""}
      ${extra}
      <div class="wa-actions">
        ${mode !== "review" ? `<button class="wa-btn wa-again">${esc(t(mode === "unit" ? "unitTestStart" : "practiceAgain"))}</button>` : ""}
        ${nextL ? `<a class="wa-btn primary" href="${href(nextL.path)}">${esc(t("nextLesson"))}: ${esc(nextL.title)}</a>` : ""}
        ${!nextL && mode !== "review" ? `<a class="wa-btn primary" href="${href(DATA.courses[(LESSONS[ids()[0]] || {}).course]?.path || DATA.pages.home)}">${esc(t("backPortal"))}</a>` : ""}
        ${mode === "review" ? `<button class="wa-btn primary wa-rv-more">${esc(t("review"))}</button>` : ""}
      </div></div>`;
    const ag = el.querySelector(".wa-again");
    if (ag) ag.onclick = start;
    const rv = el.querySelector(".wa-rv-more");
    if (rv) rv.onclick = renderReview;
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  intro();
}
function nextLessonAfter(id) {
  const l = LESSONS[id]; if (!l) return null;
  const u = UNITS[l.unit];
  if (u.lessons[l.index + 1]) return u.lessons[l.index + 1];
  const c = DATA.courses[l.course], nu = c.units[u.index + 1];
  return nu && nu.lessons && nu.lessons[0] ? nu.lessons[0] : null;
}

// ═════════════════ Mapa del curso (portal) ═════════════════
function recommended(cid) {
  const c = DATA.courses[cid]; if (!c) return null;
  for (const u of c.units) for (const l of (u.lessons || [])) if (lv(l.id) < 3) return l.id;
  for (const u of c.units) if ((u.lessons || []).length && !(S.units[u.id] && S.units[u.id].passed)) return "unit:" + u.id;
  return null;
}
function renderPath(el) {
  const c = DATA.courses[el.dataset.course]; if (!c) return;
  const rec = recommended(c.id);
  let html = "";
  c.units.forEach((u, ui) => {
    const ls = u.lessons || [];
    const mastered = ls.filter(l => lv(l.id) >= 4).length;
    const passed = S.units[u.id] && S.units[u.id].passed;
    if (!ls.length) {
      html += `<section class="wa-u soon"><header><span class="wa-u-n">${esc(t("unitN", { n: ui + 1 }))}</span><span class="wa-u-t">${esc(u.title)}</span><span class="wa-u-s">${ICON.lock}${esc(t("soon"))}</span></header></section>`;
      return;
    }
    html += `<section class="wa-u"><header><span class="wa-u-n">${esc(t("unitN", { n: ui + 1 }))}</span><a class="wa-u-t" href="${href(u.path)}">${esc(u.title)}</a><span class="wa-u-s">${passed ? ICON.trophy : ""}${esc(t("mastered", { a: mastered, b: ls.length }))}</span></header><div class="wa-cards">`;
    ls.forEach((l, li) => {
      const lvl = lv(l.id), here = rec === l.id, r = S.lessons[l.id] || {};
      const due = lvl >= 2 && r.due && r.due <= today();
      const info = here ? `<em>${esc(t("continueHere"))}</em>`
        : due ? `<em class="due">${esc(t("cardReview"))}</em>`
        : r.n ? esc(t("cardBest", { n: r.best || 0 })) + " · " + esc(r.n === 1 ? t("cardSessions1") : t("cardSessions", { n: r.n }))
        : "";
      html += `<a class="wa-lc lv-${lvl}${here ? " here" : ""}" href="${href(l.path)}">
        <span class="wa-lc-b"><span class="wa-lc-k"><span class="wa-dot sm lv-${lvl}">${lvl >= 4 ? ICON.star : li + 1}</span>${esc(t("cardLesson", { n: li + 1 }))}${l.min ? " · " + esc(t("cardMin", { n: l.min })) : ""}${l.ext ? `<span class="wa-ext">${esc(t("cardExt"))}</span>` : ""}</span>
        <b>${esc(l.title)}</b>
        <span class="wa-lc-p">${meter(lvl)}${badge(lvl)}</span>
        <span class="wa-lc-x">${info}</span></span></a>`;
    });
    const here = rec === "unit:" + u.id, ur = S.units[u.id] || {};
    html += `<a class="wa-lc boss${passed ? " lv-4" : ""}${here ? " here" : ""}" href="${href(u.path)}#${encodeURIComponent(t("unitTest").replace(/ /g, "_"))}">
      <span class="wa-lc-b"><span class="wa-lc-k"><span class="wa-dot sm">${ICON.trophy}</span>${esc(t("unitN", { n: ui + 1 }))}</span><b>${esc(t("unitTest"))}</b>
      <span class="wa-lc-x">${here ? `<em>${esc(t("continueHere"))}</em>` : passed ? esc(t("unitMedal")) : ur.best ? esc(t("cardBest", { n: ur.best })) : esc(t("cardUnitTodo"))}</span></span></a>`;
    html += "</div></section>";
  });
  el.innerHTML = html;
}

// ── Página de unidad: lecciones con su nivel ────────────────────────────
function renderUnit(el) {
  const u = UNITS[el.dataset.unit]; if (!u) return;
  el.innerHTML = `<ol class="wa-list">${(u.lessons || []).map((l, k) => {
    const lvl = lv(l.id);
    return `<li><a href="${href(l.path)}"><span class="wa-dot sm lv-${lvl}">${lvl >= 4 ? ICON.star : k + 1}</span><span class="wa-lt">${esc(l.title)}</span>${meter(lvl)}${badge(lvl)}</a></li>`;
  }).join("")}</ol>`;
}

// ── Repaso ──────────────────────────────────────────────────────────────
function renderReview() {
  D.querySelectorAll(".wa-review").forEach(el => {
    const due = dueLessons();
    const practiced = Object.keys(S.lessons).filter(id => LESSONS[id] && S.lessons[id].lv >= 1);
    const box = el.querySelector(".wa-practice") || (() => { const d = D.createElement("div"); d.className = "wa-practice"; d.dataset.mode = "review"; return d; })();
    let head = "";
    if (due.length) head = `<p>${esc(due.length === 1 ? t("reviewDue1") : t("reviewDue", { n: due.length }))}</p>
      <ul class="wa-list plain">${due.map(id => `<li><a href="${href(LESSONS[id].path)}">${esc(LESSONS[id].title)}</a> ${badge(lv(id))}</li>`).join("")}</ul>
      <button class="wa-btn primary wa-rv">${ICON.play}<span>${esc(t("reviewStart"))}</span></button>`;
    else if (practiced.length) head = `<p>${esc(t("reviewNone"))}</p><p class="wa-muted">${esc(t("reviewFreeIntro"))}</p>
      <button class="wa-btn wa-rv">${ICON.play}<span>${esc(t("reviewFree"))}</span></button>`;
    else head = `<p class="wa-muted">${esc(t("reviewEmpty"))}</p>`;
    el.innerHTML = `<div class="wa-card"><div class="wa-card-head"><span class="wa-card-title">${esc(t("review"))}</span></div>${head}</div>`;
    el.appendChild(box);
    box.innerHTML = "";
    const b = el.querySelector(".wa-rv");
    if (b) b.onclick = () => {
      box._ids = RNG.shuffle(due.length ? due : practiced).slice(0, 4);
      if (!box._start) mountPractice(box);
      el.querySelector(".wa-card").remove();
      box._start();
    };
  });
}

// ── Mi progreso ─────────────────────────────────────────────────────────
function renderProgress() {
  D.querySelectorAll(".wa-progress").forEach(el => {
    const lvl = levelOf(S.xp), a = levelStart(lvl), b = levelStart(lvl + 1);
    const acc = S.stats.answers ? Math.round(100 * S.stats.correct / S.stats.answers) : 0;
    // actividad: 12 semanas
    const end = new Date(); end.setHours(12);
    const start = new Date(end); start.setDate(start.getDate() - 7 * 12 + 1 - ((start.getDay() + 6) % 7));
    let cells = "";
    const goal = S.settings.goal || 50;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const k = dayStr(d), x = S.days[k] || 0;
      const lev = !x ? 0 : x < goal / 2 ? 1 : x < goal ? 2 : x < goal * 2 ? 3 : 4;
      cells += `<i class="h${lev}" title="${k}: ${x} XP"></i>`;
    }
    const courses = Object.values(DATA.courses).filter(c => courseLessonIds(c.id).length).map(c => {
      const ids = courseLessonIds(c.id), cnt = [0, 0, 0, 0, 0];
      ids.forEach(id => cnt[lv(id)]++);
      const seg = [4, 3, 2, 1].map(k => cnt[k] ? `<i class="lv-${k}" style="flex:${cnt[k]}" title="${esc((UI.mastery || [])[k])}: ${cnt[k]}"></i>` : "").join("") + (cnt[0] ? `<i class="lv-0" style="flex:${cnt[0]}"></i>` : "");
      return `<li><a href="${href(c.path)}">${esc(c.title)}</a><span class="wa-muted">${esc(t("mastered", { a: cnt[4], b: ids.length }))}</span><div class="wa-stack">${seg}</div></li>`;
    }).join("");
    const achs = Object.keys(L.ach || {}).map(id => {
      const got = S.ach.includes(id), x = L.ach[id];
      return `<li class="${got ? "got" : ""}">${got ? ICON.trophy : ICON.lock}<b>${esc(x[0])}</b><span>${esc(x[1])}</span></li>`;
    }).join("");
    const goals = Object.entries(UI.goalOpts || {}).map(([v, lab]) => `<button class="wa-btn seg${+v === goal ? " sel" : ""}" data-g="${v}">${esc(lab)}</button>`).join("");
    el.innerHTML = `
      <div class="wa-tiles">
        <div class="wa-tile"><span>${esc(t("level", { n: lvl }))}</span><b>${S.xp} XP</b><div class="wa-lbar"><i style="width:${Math.round(100 * (S.xp - a) / (b - a))}%"></i></div></div>
        <div class="wa-tile"><span>${esc(t("bestStreak"))}</span><b>${esc(S.streak.best === 1 ? t("days1") : t("days", { n: S.streak.best }))}</b><small>${ICON.flame}${streakNow()}</small></div>
        <div class="wa-tile"><span>${esc(t("answers"))}</span><b>${S.stats.answers}</b></div>
        <div class="wa-tile"><span>${esc(t("accuracy"))}</span><b>${acc} %</b></div>
      </div>
      <h2>${esc(t("dailyGoal"))}</h2><div class="wa-seg">${goals}</div>
      <h2>${esc(t("activity"))}</h2><div class="wa-heat">${cells}</div>
      <h2>${esc(t("courses"))}</h2><ul class="wa-courses">${courses}</ul>
      <h2>${esc(t("achievements"))}</h2><ul class="wa-ach">${achs}</ul>
      <p class="wa-muted">${esc(BR ? t("savedOfflined") : t("savedLocal"))}</p>
      <div class="wa-actions"><button class="wa-btn wa-exp">${esc(t("exportBtn"))}</button><button class="wa-btn wa-imp">${esc(t("importBtn"))}</button><button class="wa-btn danger wa-rst">${esc(t("resetBtn"))}</button></div>`;
    el.querySelectorAll("[data-g]").forEach(bt => bt.onclick = () => { S.settings.goal = +bt.dataset.g; save(); renderProgress(); renderStats(); });
    el.querySelector(".wa-exp").onclick = () => {
      const blob = new Blob([JSON.stringify({ wikiaula: 1, data: S }, null, 1)], { type: "application/json" });
      const a2 = D.createElement("a"); a2.href = URL.createObjectURL(blob); a2.download = `wikiaula-${today()}.json`; a2.click();
      setTimeout(() => URL.revokeObjectURL(a2.href), 2000);
    };
    el.querySelector(".wa-imp").onclick = () => {
      const inp = D.createElement("input"); inp.type = "file"; inp.accept = ".json,application/json";
      inp.onchange = () => { const f = inp.files[0]; if (!f) return; f.text().then(txt => {
        try { const j = JSON.parse(txt); if (!j || j.wikiaula !== 1 || !j.data) throw 0; S = normalize(j.data); save(); toast(esc(t("importOk"))); renderAll(); }
        catch (e) { toast(esc(t("importBad")), "bad"); }
      }); };
      inp.click();
    };
    el.querySelector(".wa-rst").onclick = () => { if (confirm(t("resetAsk"))) { S = fresh(); save(); renderAll(); } };
  });
}

// ── Portada: tu aula ────────────────────────────────────────────────────
function renderHome() {
  D.querySelectorAll(".wa-home").forEach(el => {
    const last = S.last && LESSONS[S.last] ? LESSONS[S.last] : null;
    const firstCourse = Object.values(DATA.courses).find(c => courseLessonIds(c.id).length);
    let target = null;
    if (last) { const rid = recommended(last.course); target = rid && !rid.startsWith("unit:") ? LESSONS[rid] : last; }
    const due = dueLessons().length;
    const lvl = levelOf(S.xp);
    el.innerHTML = `<div class="wa-card"><div class="wa-card-head"><span class="wa-card-title">${esc(t("level", { n: lvl }))} · ${S.xp} XP</span><span class="wa-chip">${ICON.flame}${streakNow()}</span></div>
      <div class="wa-actions">
        ${target ? `<a class="wa-btn primary" href="${href(target.path)}">${ICON.play}<span>${esc(t("continueLast", { t: target.title }))}</span></a>`
          : firstCourse ? `<a class="wa-btn primary" href="${href(firstCourse.path)}">${ICON.play}<span>${esc(t("startCourse"))}: ${esc(firstCourse.title)}</span></a>` : ""}
        ${due ? `<a class="wa-btn" href="${href(DATA.pages.review || "Repaso")}">${esc(due === 1 ? t("reviewDue1") : t("reviewDue", { n: due }))}</a>` : ""}
        <a class="wa-btn ghost" href="${href(DATA.pages.progress || "Mi_progreso")}">${esc(t("myProgress"))}</a>
      </div></div>`;
  });
}

// ── Tema (Offlined manda {type:"theme"}) ────────────────────────────────
function setTheme(th) { if (th === "dark" || th === "light") D.documentElement.dataset.theme = th; }
if (BR && BR.theme) setTheme(BR.theme);
W.addEventListener("message", e => {
  if (e.origin !== location.origin) return;
  const d = e.data || {};
  if (d.type === "theme") setTheme(d.theme || d.value || (d.dark ? "dark" : "light"));
  else if (d.type === "ofl:aula-grade" && AI_CB[d.id]) AI_CB[d.id](d);
});

// Botón "Explícamelo con Michael Knowledge" de la ficha (solo dentro de Offlined)
function mountTutorLesson() {
  D.querySelectorAll(".wa-tutor-lesson").forEach(b => {
    if (!(BR && BR.tutor)) { b.remove(); return; }
    b.hidden = false;
    b.onclick = () => { const l = LESSONS[b.dataset.lesson]; post("explain", { lesson: b.dataset.lesson, title: l && l.title, course: l && l.course }); };
  });
}

function bindWikiLinks() {
  if (!BR) return;
  D.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest("a.wa-wp");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    post("wiki", { title: a.dataset.wp || a.textContent, lang: LANG });
  });
}

// ── Portada: progreso de cada asignatura y pestañas por etapa ───────────
function renderSubjects() {
  D.querySelectorAll(".wa-sc-bar[data-course]").forEach(el => {
    const ids = courseLessonIds(el.dataset.course);
    const done = ids.filter(id => lv(id) >= 4).length, started = ids.some(id => lv(id) >= 1);
    el.innerHTML = started
      ? `<span class="wa-sc-track"><i style="width:${Math.round(100 * done / Math.max(ids.length, 1))}%"></i></span><em>${esc(t("scMastered", { a: done, b: ids.length }))}</em>`
      : `<em class="none">${esc(t("scNone"))}</em>`;
  });
}
const STAGE_KEY = "wikiaula.etapa";
function initStageTabs() {
  const bar = D.querySelector(".wa-stagetabs"); if (!bar) return;
  const tabs = [...bar.querySelectorAll(".wa-stagetab")], panels = [...D.querySelectorAll(".wa-stagepanel")];
  let cur = null;
  try { cur = localStorage.getItem(STAGE_KEY); } catch (e) {}
  if (!panels.some(p => p.dataset.stage === cur)) {   // la etapa de la última lección estudiada, si la hay
    const l = S.last && LESSONS[S.last], c = l && DATA.courses[l.course];
    const p = c && panels.find(x => c.grade >= +x.dataset.from && c.grade <= +x.dataset.to);
    cur = p ? p.dataset.stage : "0";
  }
  const show = st => {
    tabs.forEach(b => { const on = b.dataset.stage === st; b.setAttribute("aria-selected", on); b.classList.toggle("sel", on); });
    panels.forEach(x => { x.hidden = x.dataset.stage !== st; });
    try { localStorage.setItem(STAGE_KEY, st); } catch (e) {}
  };
  tabs.forEach(b => b.addEventListener("click", () => show(b.dataset.stage)));
  bar.hidden = false;
  D.documentElement.classList.add("wa-tabs-on");
  show(cur);
}

function renderAll() {
  renderStats(); renderMastery();
  D.querySelectorAll(".wa-path").forEach(renderPath);
  D.querySelectorAll(".wa-unit").forEach(renderUnit);
  renderReview(); renderProgress(); renderHome(); renderSubjects();
}

// Tocar una figura la abre a su tamaño real (en el móvil, las figuras se encogen y los rótulos no se leen)
function bindFigureZoom() {
  D.addEventListener("click", e => {
    const img = e.target.closest && e.target.closest("figure.wa-fig img");
    if (!img) return;
    e.preventDefault();
    const box = D.createElement("div");
    box.className = "wa-zoom";
    box.setAttribute("role", "dialog");
    const big = img.cloneNode();
    big.removeAttribute("loading");
    // al menos su tamaño natural; en pantallas grandes, hasta llenar el ancho (se recalcula al cargar:
    // con carga diferida, el tamaño natural puede no conocerse todavía)
    const fit = () => {
      const n = big.naturalWidth || img.naturalWidth || 0;
      big.style.width = (n ? Math.max(n, Math.min(innerWidth - 24, n * 1.6)) : innerWidth - 24) + "px";
    };
    big.addEventListener("load", fit);
    fit();
    const x = D.createElement("button");
    x.className = "wa-zoom-x"; x.type = "button"; x.setAttribute("aria-label", UI.close || "Cerrar"); x.textContent = "×";
    box.append(big, x);
    const close = () => { box.remove(); D.removeEventListener("keydown", onKey); };
    const onKey = ev => { if (ev.key === "Escape") close(); };
    box.addEventListener("click", ev => { if (ev.target === box || ev.target === x) close(); });
    D.addEventListener("keydown", onKey);
    D.body.appendChild(box);
  });
}

async function init() {
  bindFigureZoom();
  MATH.watch();
  await load();
  renderAll();
  initStageTabs();
  checkAch(); // logros que ya se cumplían (p. ej. de una copia cargada)
  D.querySelectorAll('.wa-practice[data-mode="lesson"], .wa-practice[data-mode="unit"]').forEach(mountPractice);
  mountTutorLesson();
  bindWikiLinks();
  const lid = D.body.dataset.lesson;
  if (lid) { seenProbe(lid); S.last = lid; }
  post("page", { lesson: lid || null, unit: D.body.dataset.unit || null, course: D.body.dataset.course || null });
}
WA.state = () => S;
if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", init); else init();
})();
