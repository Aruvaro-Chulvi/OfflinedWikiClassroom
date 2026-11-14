/* WikiAula — Matemáticas, Grado 7 · Unidad 3: Números enteros.
   Textos: i18n/<lang>/mat7u3.js (S.m7). */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz } = WA.MATH;

// Entero con signo dentro de una expresión: −3 al principio, (−3) detrás de un operador
const sn = (H, n, first) => n < 0 ? (first ? H.n(n) : `(${H.n(n)})`) : H.n(n);

// ── Expresiones con enteros, paso a paso ───────────────────────────────
// Tokens: números (pueden ser negativos), "+", "-", "*", "/", "^", "(", ")", "[", "]"
// (las potencias y los corchetes solo los usa m7.ent.combpot; sin ellos todo funciona como antes)
const OPEN = ["(", "["], CLOSE = [")", "]"];
function pows(t) {   // resuelve todas las potencias de un tramo
  t = t.slice();
  for (let i = t.length - 2; i > 0; i--) {
    if (t[i] !== "^") continue;
    const v = t[i - 1] ** t[i + 1];
    if (Math.abs(v) > 200) return null;
    t.splice(i - 1, 3, v);
  }
  return t;
}
function flat(t) {   // sin paréntesis → número entero o null
  t = t.includes("^") ? pows(t) : t.slice();
  if (!t) return null;
  for (let i = 1; i < t.length; i += 2) {
    if (t[i] === "*" || t[i] === "/") {
      const a = t[i - 1], b = t[i + 1];
      if (t[i] === "/" && (!b || a % b)) return null;
      t.splice(i - 1, 3, t[i] === "*" ? a * b : a / b); i -= 2;
    }
  }
  let v = t[0];
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + t[i + 1] : v - t[i + 1];
  return v;
}
function step(t) {
  const close = t.findIndex(x => CLOSE.includes(x));
  if (close >= 0) {
    let open = close - 1;
    while (open >= 0 && !OPEN.includes(t[open])) open--;
    const inner = t.slice(open + 1, close);
    if (inner.includes("^")) { const p = pows(inner); return p && t.slice(0, open + 1).concat(p, t.slice(close)); }
    const v = flat(inner);
    return v === null ? null : t.slice(0, open).concat([v], t.slice(close + 1));
  }
  if (t.includes("^")) return pows(t);
  if (t.some(x => x === "*" || x === "/")) {
    t = t.slice();
    for (let i = 1; i < t.length; i += 2) {
      if (t[i] === "*" || t[i] === "/") {
        const a = t[i - 1], b = t[i + 1];
        if (t[i] === "/" && (!b || a % b)) return null;
        t.splice(i - 1, 3, t[i] === "*" ? a * b : a / b); i -= 2;
      }
    }
    return t;
  }
  const v = flat(t);
  return v === null ? null : [v];
}
function show(t, H) {
  let s = "", prev = null;
  t.forEach((x, i) => {
    if (prev === "^") { prev = x; return; }                          // el exponente ya se ha escrito
    if (x === "^") s += `<sup>${t[i + 1]}</sup>`;
    else if (typeof x === "number" && x < 0 && t[i + 1] === "^") s += `(${H.n(x)})`;   // base negativa, siempre entre paréntesis
    else if (x === "(" || x === ")" || x === "[" || x === "]") s += x;
    else if (x === "*") s += ` ${H.mul} `;
    else if (x === "/") s += ` ${H.div} `;
    else if (x === "+") s += " + ";
    else if (x === "-") s += " − ";
    else s += sn(H, x, prev === null || prev === "(" || prev === "[");
    prev = x;
  });
  return s;
}
function solveSteps(toks, H, maxAbs = 200) {
  let cur = toks;
  const steps = [show(cur, H)];
  while (cur.length > 1) {
    cur = step(cur);
    if (!cur) return null;
    steps.push(show(cur, H));
  }
  if (Math.abs(cur[0]) > maxAbs) return null;
  return { res: cur[0], steps };
}
const stepsHtml = steps => steps.map((s, i) => i ? "= " + (i === steps.length - 1 ? `<b>${s}</b>` : s) : s).join("<br>");
WA.MATH.intExpr = { flat, step, show, solveSteps, stepsHtml };   // también para otros cursos

// ── Los números enteros ───────────────────────────────────────────────
def("m7.ent.comparar", (R, S, H) => {
  let a, b;
  do { a = R.int(-20, 20); b = R.int(-20, 20); } while (a === b || (a >= 0 && b >= 0));
  return { q: S.m7.comp_q(H.n(a), H.n(b)), kind: "choice", opts: ["&lt;", "&gt;"], correct: a > b ? 1 : 0, shuffle: false,
    sol: S.m7.comp_s(H.n(a), H.n(b), a > b, a < 0 && b < 0) };
});
def("m7.ent.mayor", (R, S, H) => {
  const set = new Set([R.int(-25, -1), R.int(-25, -1)]);
  while (set.size < 4) set.add(R.int(-25, 15));
  const xs = R.shuffle([...set]), big = R.r() < 0.5;
  const target = big ? Math.max(...xs) : Math.min(...xs);
  return { q: S.m7.mayor_q(big), kind: "choice", opts: xs.map(x => H.n(x)), correct: xs.indexOf(target),
    sol: S.m7.mayor_s(big, H.n(target), [...xs].sort((p, q) => p - q).map(x => H.n(x)).join(" &lt; ")) };
});
def("m7.ent.abs", (R, S, H) => {
  const a = rnz(R, -60, 40);
  if (R.r() < 0.5) return { q: S.m7.abs_q(H.n(a)), kind: "int", ans: Math.abs(a), sol: S.m7.abs_s(H.n(a), H.n(Math.abs(a))) };
  return { q: S.m7.op_q(H.n(a)), kind: "int", ans: -a, sol: S.m7.op_s(H.n(a), H.n(-a)) };
});
def("m7.ent.recta", (R, S, H) => {
  const v = rnz(R, -9, 9);
  return { q: S.m7.recta_q + "<br>" + WA.SVG.numberLine(-10, 10, 1, [{ x: v, label: "?" }], { labelEvery: 5, fmt: x => H.n(x) }),
    kind: "int", ans: v, sol: S.m7.recta_s(H.n(v)) };
});
def("m7.ent.contexto", (R, S, H) => {
  const P = R.pick(S.m7.ctx), st = P.step || 1;
  const a = R.int(P.a[0] / st, P.a[1] / st) * st, b = R.int(P.b[0] / st, P.b[1] / st) * st;
  const r = P.f(a, b);
  return { q: P.q(H.n(a), H.n(b)), kind: "int", ans: r, sol: P.s(H.n(a), H.n(b), H.n(r), H.n(-a), r < 0) };
});

// Traducir situaciones a enteros (primera lección); a veces, una diferencia de temperaturas contada en la recta
def("m7.ent.traducir", (R, S, H) => {
  if (R.r() < 0.3) {
    const a = R.int(-15, -1), b = R.int(1, 16);
    return { q: S.m7.trad_dif_q(H.n(a), H.n(b)), kind: "int", ans: b - a, sol: S.m7.trad_dif_s(H.n(a), -a, b, b - a) };
  }
  const P = R.pick(S.m7.trad);
  const n = R.int(P.n[0] / (P.st || 1), P.n[1] / (P.st || 1)) * (P.st || 1);
  const v = P.neg ? -n : n;
  return { q: S.m7.trad_q(P.q(H.n(n))), kind: "int", ans: v, sol: S.m7.trad_s(P.clave, P.neg, H.n(v)) };
});

// ── Suma y resta ──────────────────────────────────────────────────────
def("m7.ent.suma", (R, S, H) => {
  const a = rnz(R, -30, 30), b = rnz(R, -30, 30), r = a + b;
  const e = `${sn(H, a, true)} + ${sn(H, b)}`;
  const same = (a > 0) === (b > 0);
  const A = Math.abs(a), B = Math.abs(b);
  // Opuestos (17 + (−17)): no hay «mayor valor absoluto»; caso aparte. La solución hace la cuenta con los valores absolutos.
  return { q: S.m7.suma_q(e), kind: "int", ans: r,
    sol: same ? S.m7.suma_s_igual(A, B, H.n(r), a > 0) : a === -b ? S.m7.suma_s_op(H.n(a), H.n(b))
      : S.m7.suma_s_dist(Math.max(A, B), Math.min(A, B), H.n(r), H.n(A > B ? a : b), (A > B ? a : b) > 0) };
});
def("m7.ent.resta", (R, S, H) => {
  const a = rnz(R, -25, 25), b = rnz(R, -25, 25), r = a - b;
  const e = `${sn(H, a, true)} − ${sn(H, b)}`;
  return { q: S.m7.suma_q(e), kind: "int", ans: r, sol: S.m7.resta_s(e, `${sn(H, a, true)} + ${sn(H, -b)}`, H.n(r)) };
});
def("m7.ent.cadena", (R, S, H) => {
  const n = R.int(4, 6);
  let xs;
  do xs = Array.from({ length: n }, () => rnz(R, -15, 15)); while (!xs.some(x => x > 0) || !xs.some(x => x < 0));   // siempre hay positivos y negativos
  let e = H.n(xs[0]);
  for (let i = 1; i < n; i++) e += xs[i] < 0 ? ` − ${-xs[i]}` : ` + ${xs[i]}`;
  const pos = xs.filter(x => x > 0), neg = xs.filter(x => x < 0);
  const sp = pos.reduce((s, x) => s + x, 0), sneg = neg.reduce((s, x) => s + x, 0);
  return { q: S.m7.suma_q(e), kind: "int", ans: sp + sneg,
    sol: S.m7.cadena_s(pos.length > 1 ? pos.join(" + ") : H.n(sp), neg.length > 1 ? neg.map(x => `(${H.n(x)})`).join(" + ") : H.n(sneg), H.n(sp), H.n(sneg), H.n(sp + sneg), H.n(-sneg)) };
});
def("m7.ent.parentesis", (R, S, H) => {
  const T = ["a - ( b - c )", "- ( a + b ) + c", "( a - b ) - ( c - d )", "a - ( b + c ) + d", "- ( a - b ) - ( c + d )", "( a + b ) - ( c - d ) + e"];
  for (let k = 0; k < 100; k++) {
    let first = true;
    const toks = [];
    R.pick(T).split(" ").forEach((x, i, arr) => {
      if (/^[a-e]$/.test(x)) toks.push(rnz(R, -12, 12));
      else if (x === "-" && (i === 0 || arr[i - 1] === "(")) toks.push(0, "-");   // − inicial → 0 − (…)
      else toks.push(x);
    });
    const res = solveSteps(toks, H);
    if (!res || res.steps.some(x => /(^|[(\s])0 [−+]|−0(?!\d)|\(0\)/.test(x.replace(/^0 − /, "").replace(/\(0 − /g, "(")))) continue;
    const q = show(toks, H).replace(/^0 − /, "−").replace(/\(0 − /g, "(−");
    first = false;
    // Camino 2: quitar los paréntesis (un − delante cambia el signo de todos los números de dentro)
    const terms = [];
    let sign = 1, gsign = 1, lead = toks[0] === 0;
    toks.forEach((x, i) => {
      if (x === "+") sign = 1; else if (x === "-") sign = -1;
      else if (x === "(") { gsign = sign; sign = 1; } else if (x === ")") { gsign = 1; sign = 1; }
      else { if (!(lead && i === 0)) terms.push(gsign * sign * x); sign = 1; }
    });
    const flatTxt = terms.map((t, i) => i ? (t < 0 ? ` − ${-t}` : ` + ${t}`) : H.n(t)).join("");
    return { q: S.m7.suma_q(q), kind: "int", ans: res.res,
      sol: S.m7.par_s(stepsHtml(res.steps.map(s => s.replace(/^0 − /, "−").replace(/\(0 − /g, "(−"))), flatTxt, H.n(res.res)) };
  }
  return null;
});

// ── Multiplicación y división ─────────────────────────────────────────
def("m7.ent.mult", (R, S, H) => {
  const a = rnz(R, -15, 15), b = rnz(R, -12, 12), r = a * b;
  return { q: S.m7.suma_q(`${sn(H, a, true)} ${H.mul} ${sn(H, b)}`), kind: "int", ans: r,
    sol: S.m7.mult_s(Math.abs(a), Math.abs(b), Math.abs(r), H.n(r), (a > 0) === (b > 0)) };
});
def("m7.ent.div", (R, S, H) => {
  const b = rnz(R, -12, 12), q = rnz(R, -15, 15), a = b * q;
  return { q: S.m7.suma_q(`${sn(H, a, true)} ${H.div} ${sn(H, b)}`), kind: "int", ans: q,
    sol: S.m7.div_s(Math.abs(a), Math.abs(b), Math.abs(q), H.n(q), (a > 0) === (b > 0)) };
});
def("m7.ent.signo", (R, S, H) => {
  const n = R.int(3, 6), xs = Array.from({ length: n }, () => rnz(R, -9, 9));
  const ops = xs.slice(1).map(() => R.r() < 0.75 ? H.mul : H.div);
  let e = sn(H, xs[0], true);
  xs.slice(1).forEach((x, i) => { e += ` ${ops[i]} ${sn(H, x)}`; });
  const k = xs.filter(x => x < 0).length, pos = k % 2 === 0;
  return { q: S.m7.signo_q(e), kind: "choice", opts: [S.m7.sigPos, S.m7.sigNeg], correct: pos ? 0 : 1, shuffle: false, sol: S.m7.signo_s2(k, pos) };
});

// ── Operaciones combinadas ────────────────────────────────────────────
const COMB = ["a * b + c", "a - b * c", "a * ( b + c )", "( a - b ) * c", "a / b + c * d", "a * b - c * d", "( a + b ) / c - d",
  "a - ( b - c ) * d", "a * ( b - c ) + d / e", "( a * b - c ) / d", "a + b * ( c + d )", "( a - b ) * ( c + d )"];
const rn2 = (R, m) => R.pick([-1, 1]) * R.int(2, m);   // entero con |x| ≥ 2: multiplicar o dividir por ±1 no practica nada
def("m7.ent.comb", (R, S, H) => {
  for (let k = 0; k < 400; k++) {
    const toks = R.pick(COMB).split(" ").map(x => /^[a-e]$/.test(x) ? rn2(R, 9) : x);
    for (let i = 0; i < toks.length; i++) if (toks[i] === "/" && typeof toks[i - 1] === "number" && typeof toks[i + 1] === "number") toks[i - 1] = toks[i + 1] * rn2(R, 6);
    const res = solveSteps(toks, H, 150);
    if (!res || res.steps.length < 3) continue;
    return { q: S.m7.comb_q(res.steps[0]), kind: "int", ans: res.res, sol: S.m7.comb_s_intro + "<br>" + stepsHtml(res.steps) };
  }
  return null;
});
// Lo que añade 1.º ESO: corchetes y potencias de base entera dentro de una combinada
const COMBPOT = ["a ^ 2 - b * c", "a - b ^ 3 / c", "a * [ b - ( c - d ) ] + e", "[ a - ( b + c ) ] * d", "a ^ 2 + b * ( c - d )",
  "( a - b ) ^ 2 / c", "a * b ^ 2 + c", "[ a + b * ( c - d ) ] / e", "a - [ b ^ 2 - c ]", "( a + b ) ^ 3 - c"];
def("m7.ent.combpot", (R, S, H) => {
  for (let k = 0; k < 600; k++) {
    const tpl = R.pick(COMBPOT).split(" ");
    const toks = tpl.map((x, i) => {
      if (/^\d+$/.test(x)) return +x;
      if (!/^[a-e]$/.test(x)) return x;
      if (tpl[i + 1] === "^") return rn2(R, tpl[i + 2] === "3" ? 3 : 5);
      if (tpl[i - 1] === "/" && CLOSE.includes(tpl[i - 2])) return rn2(R, 4);
      return rn2(R, 9);
    });
    for (let i = 0; i < toks.length; i++) if (toks[i] === "/" && typeof toks[i - 1] === "number" && typeof toks[i + 1] === "number" && toks[i - 2] !== "^") toks[i - 1] = toks[i + 1] * rn2(R, 6);
    const res = solveSteps(toks, H, 150);
    if (!res || res.steps.length < 3) continue;
    return { q: S.m7.comb_q(res.steps[0]), kind: "int", ans: res.res, sol: S.m7.comb2_s_intro + "<br>" + stepsHtml(res.steps) };
  }
  return null;
});

// ── Potencias de base entera ──────────────────────────────────────────
def("m7.ent.pot", (R, S, H) => {
  const a = R.int(2, 6), n = a <= 3 ? R.int(2, 5) : R.int(2, 3);
  if (R.r() < 0.65) {
    const r = (-a) ** n, prod = Array(n).fill(`(−${a})`).join(` ${H.mul} `);
    return { q: S.m7.pot_q(`(−${a})<sup>${n}</sup>`), kind: "int", ans: r, sol: S.m7.pot_s_par(`−${a}`, n, prod, H.n(r)) };
  }
  const r = -(a ** n);
  return { q: S.m7.pot_q(`−${a}<sup>${n}</sup>`), kind: "int", ans: r, sol: S.m7.pot_s_sin(a, n, H.n(r)) };
});
def("m7.ent.potsigno", (R, S, H) => {
  const a = R.int(2, 15), n = R.int(2, 12), withPar = R.r() < 0.7;
  const pos = withPar ? n % 2 === 0 : false;
  return { q: S.m7.potsig_q(withPar ? `(−${a})<sup>${n}</sup>` : `−${a}<sup>${n}</sup>`), kind: "choice", opts: [S.m7.sigPos, S.m7.sigNeg], correct: pos ? 0 : 1, shuffle: false,
    sol: withPar ? S.m7.signo_s(n, pos) : S.m7.potsig_s_sin(a, n) };
});
def("m7.ent.potprop", (R, S, H) => {
  const a = R.int(2, 7), kind = R.pick(["prod", "coc", "pp"]);
  const b = `(−${a})`;
  let m = R.int(2, 6), n = R.int(2, 5), e, r;
  if (kind === "prod") { e = `${b}<sup>${m}</sup> ${H.mul} ${b}<sup>${n}</sup>`; r = m + n; }
  else if (kind === "coc") { m = n + R.int(1, 5); e = `${b}<sup>${m}</sup> ${H.div} ${b}<sup>${n}</sup>`; r = m - n; }
  else { e = `[${b}<sup>${m}</sup>]<sup>${n}</sup>`; r = m * n; }
  const wrong = new Set([r]);
  const opts = [r];
  for (const x of R.shuffle([m * n, m + n, Math.abs(m - n) || m + 1, r + 1, r + 2])) { if (!wrong.has(x) && opts.length < 4) { wrong.add(x); opts.push(x); } }
  const sh = R.shuffle(opts);
  return { q: S.m7.potprop_q(e), kind: "choice", opts: sh.map(x => `${b}<sup>${x}</sup>`), correct: sh.indexOf(r),
    sol: S.m7.potprop_s(S.m7.rules[kind], `${b}<sup>${r}</sup>`) };
});
})();
