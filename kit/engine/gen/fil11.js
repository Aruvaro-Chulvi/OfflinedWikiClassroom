/* WikiAula — Filosofía, Grado 11: ramas, mito y logos, ser humano, lógica (tablas de verdad, formas de razonamiento), conocimiento,
   verdad, ciencia, metafísica, libertad, ética, política, estética y tecnología. Textos y bancos en i18n/<lang>/fil11.js (S.fil11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("fil11.rama", (R, S) => B.mixed(S.fil11.rama, R));
def("fil11.mito", (R, S) => B.mixed(S.fil11.mito, R));
def("fil11.cultura", (R, S) => B.mixed(S.fil11.cultura, R));
def("fil11.mente", (R, S) => B.mixed(S.fil11.mente, R));
def("fil11.sentido", (R, S) => B.mixed(S.fil11.sentido, R));
def("fil11.formalizar", (R, S) => B.mixed(S.fil11.formalizar, R));
def("fil11.induccion", (R, S) => B.mixed(S.fil11.induccion, R));
def("fil11.corriente", (R, S) => B.mixed(S.fil11.corriente, R));
def("fil11.verdadteoria", (R, S) => B.mixed(S.fil11.verdadteoria, R));
def("fil11.falsable", (R, S) => B.mixed(S.fil11.falsable, R));
def("fil11.metafisica", (R, S) => B.mixed(S.fil11.metafisica, R));
def("fil11.libertad", (R, S) => B.mixed(S.fil11.libertad, R));
def("fil11.nivel", (R, S) => B.mixed(S.fil11.nivel, R));
def("fil11.etica", (R, S) => B.mixed(S.fil11.etica, R));
def("fil11.contrato", (R, S) => B.mixed(S.fil11.contrato, R));
def("fil11.arte", (R, S) => B.mixed(S.fil11.arte, R));
def("fil11.tecno", (R, S) => B.mixed(S.fil11.tecno, R));

// Tablas de verdad: valor de una fórmula para unos valores de p, q, r.
const IMP = (a, b) => !a || b;
const FORMULAS = [
  ["¬p", (p) => !p], ["p ∧ q", (p, q) => p && q], ["p ∨ q", (p, q) => p || q], ["p → q", (p, q) => IMP(p, q)], ["p ↔ q", (p, q) => p === q],
  ["¬p ∨ q", (p, q) => !p || q], ["¬(p ∧ q)", (p, q) => !(p && q)], ["p ∧ ¬q", (p, q) => p && !q], ["(p → q) ∧ q", (p, q) => IMP(p, q) && q],
  ["¬p → ¬q", (p, q) => IMP(!p, !q)], ["(p ∨ q) → r", (p, q, r) => IMP(p || q, r)], ["p ∧ (q ∨ r)", (p, q, r) => p && (q || r)],
  ["¬(p ∨ q)", (p, q) => !(p || q)], ["(p ∧ q) → r", (p, q, r) => IMP(p && q, r)],
];
def("fil11.verdad", (R, S) => {
  const T = S.fil11, [f, fn] = R.pick(FORMULAS), p = R.int(0, 1) === 1, q = R.int(0, 1) === 1, r = R.int(0, 1) === 1, v = fn(p, q, r);
  return { q: T.ve_q(f, p, q, r), kind: "choice", opts: ["V", "F"], correct: v ? 0 : 1, shuffle: false, sol: T.ve_s(f, p, q, r, v) };
});

// Formas de razonamiento con el condicional.
def("fil11.forma", (R, S) => {
  const T = S.fil11, [p, q, np, nq] = R.pick(T.pares), k = R.int(0, 3);
  const premisa = [p, nq, q, np][k], concl = [q, np, p, nq][k];
  return { q: T.fo_q(p, q, premisa, concl), kind: "choice", opts: T.formas, correct: k, shuffle: false, sol: T.fo_s(k) };
});
})();
