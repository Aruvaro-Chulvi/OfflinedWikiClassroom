/* WikiAula — Biología y Geología, Grado 10 (4.º de ESO): bancos y problemas de genética y geología.
   Textos y bancos en i18n/<lang>/bg10.js (S.bg10). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg10.variable", (R, S) => B.mixed(S.bg10.variable, R));
def("bg10.fuente", (R, S) => B.mixed(S.bg10.fuente, R));
def("bg10.origen", (R, S) => B.mixed(S.bg10.origen, R));
def("bg10.vida", (R, S) => B.mixed(S.bg10.vida, R));
def("bg10.capa", (R, S) => B.mixed(S.bg10.capa, R));
def("bg10.borde", (R, S) => B.mixed(S.bg10.borde, R));
def("bg10.interno", (R, S) => B.mixed(S.bg10.interno, R));
def("bg10.riesgo", (R, S) => B.mixed(S.bg10.riesgo, R));
def("bg10.paisaje", (R, S) => B.mixed(S.bg10.paisaje, R));
def("bg10.era", (R, S) => B.mixed(S.bg10.era, R));
def("bg10.principio", (R, S) => B.mixed(S.bg10.principio, R));
def("bg10.fase", (R, S) => B.mixed(S.bg10.fase, R));
def("bg10.mitmei", (R, S) => B.mixed(S.bg10.mitmei, R));
def("bg10.mutacion", (R, S) => B.mixed(S.bg10.mutacion, R));
def("bg10.teoria", (R, S) => B.mixed(S.bg10.teoria, R));
def("bg10.prueba", (R, S) => B.mixed(S.bg10.prueba, R));

const PAIR = { A: "T", T: "A", C: "G", G: "C" }, RNA = { A: "U", T: "A", C: "G", G: "C" };
const strand = (R, n) => Array.from({ length: n }, () => R.pick(["A", "T", "C", "G"])).join("");
const choiceOf = (R, right, wrongs) => {
  const opts = [right, ...wrongs.filter((w, i, a) => w !== right && a.indexOf(w) === i)].slice(0, 4);
  return { opts, correct: 0 };
};

def("bg10.magnitud", (R, S, H) => {
  const T = S.bg10, a = R.int(3, 6), d = R.int(1, 2), r = 32 ** d;
  return { q: T.mag_q(a, a + d), kind: "int", ans: r, tol: 0, sol: T.mag_s(d, H.n(r)) };
});
def("bg10.semivida", (R, S, H) => {
  const T = S.bg10, [iso, t] = R.pick([["carbono-14", 5730], ["potasio-40", 1300000000], ["uranio-235", 704000000]]), n = R.int(1, 4), r = n * t;
  return { q: T.sv_q(iso, H.n(t), T.sv_frac[n - 1]), kind: "int", ans: r, sol: T.sv_s(n, H.n(t), H.n(r)) };
});
def("bg10.cromosomas", (R, S) => {
  const T = S.bg10, [sp, n] = R.pick(T.cr_sp), [what, f] = R.pick(T.cr_what), r = n * f;
  return { q: T.cr_q(n, sp, what), kind: "int", ans: r, sol: T.cr_s(r) };
});
def("bg10.complementaria", (R, S) => {
  const T = S.bg10, s = strand(R, R.int(6, 8)), right = [...s].map(b => PAIR[b]).join("");
  const rev = [...right].reverse().join(""), same = s, rna = [...s].map(b => RNA[b]).join("");
  const c = choiceOf(R, right, [rev, same, rna]);
  return { q: T.comp_q(s), kind: "choice", opts: c.opts, correct: c.correct, sol: T.comp_s(right) };
});
def("bg10.transcribe", (R, S) => {
  const T = S.bg10, s = strand(R, R.int(6, 9)), right = [...s].map(b => RNA[b]).join("");
  const dna = [...s].map(b => PAIR[b]).join(""), same = s.replace(/T/g, "U"), rev = [...right].reverse().join("");
  const c = choiceOf(R, right, [dna, same, rev]);
  return { q: T.tr_q(s), kind: "choice", opts: c.opts, correct: c.correct, sol: T.tr_s(right) };
});
def("bg10.chargaff", (R, S) => {
  const T = S.bg10;
  if (R.r() < 0.5) {
    const p = R.pick([10, 15, 20, 25, 30, 35, 40]), b = R.pick(["adenina", "timina"]), r = (100 - 2 * p) / 2;
    return { q: T.ch_q(b, p), kind: "num", ans: r, tol: 0.01, sol: T.ch_s(p, r) };
  }
  const p = R.pick([10, 15, 20, 25, 30, 35, 40]), r = (100 - 2 * p) / 2;
  return { q: T.ch_q2(p), kind: "num", ans: r, tol: 0.01, sol: T.ch_s2(p, r) };
});
def("bg10.codon", (R, S) => {
  const T = S.bg10, [c, a] = R.pick(T.cod_tab), others = T.cod_tab.map(x => x[1]).filter(x => x !== a);
  const opts = [a, ...R.shuffle([...new Set(others)]).slice(0, 3)];
  return { q: T.cod_q(c), kind: "choice", opts, correct: 0, sol: T.cod_s(c, a) };
});
def("bg10.punnett", (R, S) => {
  const T = S.bg10;
  const crosses = [["Aa", "Aa"], ["Aa", "aa"], ["AA", "aa"], ["AA", "Aa"]];
  const [g1, g2] = R.pick(crosses);
  const kids = [];
  for (const x of g1) for (const y of g2) kids.push(x + y);
  const recessive = kids.filter(k => k === "aa").length / 4;
  const ask = R.pick(["verde", "amarilla", "heterocigota"]);
  const p = ask === "verde" ? recessive : ask === "amarilla" ? 1 - recessive : kids.filter(k => k[0] !== k[1]).length / 4;
  const lab = v => ({ 0: "0 % (ninguna)", 0.25: "25 % (1/4)", 0.5: "50 % (1/2)", 0.75: "75 % (3/4)", 1: "100 % (todas)" })[v];
  const all = [0, 0.25, 0.5, 0.75, 1];
  const opts = [lab(p), ...R.shuffle(all.filter(v => v !== p)).slice(0, 3).map(lab)];
  return { q: T.pun_q(g1, g2, ask), kind: "choice", opts, correct: 0, sol: T.pun_s(lab(p)) };
});
def("bg10.genotipo", (R, S) => {
  const T = S.bg10, [d, opts] = R.pick(T.gen_items);
  return { q: T.gen_q(d), kind: "choice", opts, correct: 0, sol: T.gen_s };
});
def("bg10.grupo", (R, S) => {
  const T = S.bg10;
  const gen = { "A (AA)": ["A", "A"], "A (A0)": ["A", "0"], "B (BB)": ["B", "B"], "B (B0)": ["B", "0"], "AB": ["A", "B"], "0": ["0", "0"] };
  const names = Object.keys(gen);
  const pheno = (x, y) => { const s = [x, y].sort().join(""); return s === "00" ? "0" : s === "AB" ? "AB" : s.includes("A") ? "A" : "B"; };
  for (let k = 0; k < 20; k++) {
    const a = R.pick(names), b = R.pick(names), got = new Set();
    for (const x of gen[a]) for (const y of gen[b]) got.add(pheno(x, y));
    const missing = ["A", "B", "AB", "0"].filter(g => !got.has(g));
    if (!missing.length) continue;
    const right = R.pick(missing), wrong = [...got];
    return { q: T.gr_q(a, b), kind: "choice", opts: [right, ...R.shuffle(wrong).slice(0, 3)], correct: 0, sol: T.gr_s };
  }
  return { q: T.gr_q("AB", "0"), kind: "choice", opts: ["AB", "A", "B"], correct: 0, sol: T.gr_s };
});
def("bg10.ligada", (R, S) => {
  const T = S.bg10;
  const cases = [["portadora (XᴰXᵈ)", "sano (XᴰY)", "un hijo varón", "50 %"], ["portadora (XᴰXᵈ)", "sano (XᴰY)", "una hija", "0 %"],
                 ["sana no portadora (XᴰXᴰ)", "daltónico (XᵈY)", "un hijo varón", "0 %"], ["sana no portadora (XᴰXᴰ)", "daltónico (XᵈY)", "una hija", "0 % (pero será portadora)"],
                 ["portadora (XᴰXᵈ)", "daltónico (XᵈY)", "una hija", "50 %"], ["daltónica (XᵈXᵈ)", "sano (XᴰY)", "un hijo varón", "100 %"]];
  const [m, p, who, r] = R.pick(cases), all = ["0 %", "25 %", "50 %", "100 %", "0 % (pero será portadora)"];
  const opts = [r, ...R.shuffle(all.filter(x => x !== r && !(r.startsWith("0 %") && x.startsWith("0 %")))).slice(0, 3)];
  return { q: T.lig_q(m, p, who), kind: "choice", opts, correct: 0, sol: T.lig_s(r) };
});
})();
