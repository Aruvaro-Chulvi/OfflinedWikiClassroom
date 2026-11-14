/* WikiAula — Biología, Grado 12 (2.º de Bachillerato): bancos y problemas.
   Textos y bancos en i18n/<lang>/bg12.js (S.bg12). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg12.bioelemento", (R, S) => B.mixed(S.bg12.bioelemento, R));
def("bg12.glucido", (R, S) => B.mixed(S.bg12.glucido, R));
def("bg12.lipido", (R, S) => B.mixed(S.bg12.lipido, R));
def("bg12.proteina", (R, S) => B.mixed(S.bg12.proteina, R));
def("bg12.nucleico", (R, S) => B.mixed(S.bg12.nucleico, R));
def("bg12.vitamina", (R, S) => B.mixed(S.bg12.vitamina, R));
def("bg12.microscopio", (R, S) => B.mixed(S.bg12.microscopio, R));
def("bg12.transporte", (R, S) => B.mixed(S.bg12.transporte, R));
def("bg12.organulo", (R, S) => B.mixed(S.bg12.organulo, R));
def("bg12.ciclo", (R, S) => B.mixed(S.bg12.ciclo, R));
def("bg12.metab", (R, S) => B.mixed(S.bg12.metab, R));
def("bg12.respira", (R, S) => B.mixed(S.bg12.respira, R));
def("bg12.fotosint", (R, S) => B.mixed(S.bg12.fotosint, R));
def("bg12.replica", (R, S) => B.mixed(S.bg12.replica, R));
def("bg12.mutacion", (R, S) => B.mixed(S.bg12.mutacion, R));
def("bg12.tecnica", (R, S) => B.mixed(S.bg12.tecnica, R));
def("bg12.aplicacion", (R, S) => B.mixed(S.bg12.aplicacion, R));
def("bg12.inmune", (R, S) => B.mixed(S.bg12.inmune, R));
def("bg12.tipoinmun", (R, S) => B.mixed(S.bg12.tipoinmun, R));
def("bg12.patologia", (R, S) => B.mixed(S.bg12.patologia, R));

def("bg12.osmosis", (R, S) => {
  const T = S.bg12, [cell, medio, right] = R.pick(T.os_cases), others = T.os_cases.map(c => c[2]).filter(t => t !== right);
  return { q: T.os_q(cell, medio), kind: "choice", opts: [right, ...R.shuffle(others).slice(0, 3)], correct: 0, sol: T.os_s };
});
def("bg12.carbonos", (R, S, H) => {
  const T = S.bg12, n = R.int(3, 600), what = R.pick(T.ca_what);
  return { q: T.ca_q(n, what), kind: "int", ans: n - 1, sol: T.ca_s(n) };
});
def("bg12.peptido", (R, S, H) => {
  const T = S.bg12, n = R.int(2, 4), r = 20 ** n;
  return { q: T.pe_q(n), kind: "int", ans: r, sol: T.pe_s(n, H.n(r)) };
});
def("bg12.escala", (R, S, H) => {
  const T = S.bg12, x = R.pick([1000, 5000, 10000, 20000, 50000]), mm = R.pick([5, 10, 20, 30, 40, 60]), r = Math.round(mm * 1000 / x * 1000) / 1000;
  return { q: T.esc_q(mm, H.n(x)), kind: "num", ans: r, tol: r * 0.01, sol: T.esc_s(mm, H.n(x), H.dec(r)) };
});
def("bg12.atp", (R, S, H) => {
  const T = S.bg12, n = R.int(2, 20), aer = R.r() < 0.5, each = aer ? 30 : 2, r = n * each;
  return { q: T.atp_q(n, aer ? "respiración aeróbica" : "fermentación", each), kind: "int", ans: r, sol: T.atp_s(n, each, H.n(r)) };
});
def("bg12.meselson", (R, S, H) => {
  const T = S.bg12, n = R.int(1, 5), r = Math.round(2 / 2 ** n * 100 * 100) / 100;
  return { q: T.me_q(n), kind: "num", ans: r, tol: 0.01, sol: T.me_s(n, H.dec(r)) };
});
def("bg12.traduce", (R, S) => {
  const T = S.bg12, keys = Object.keys(T.tr_tab).filter(k => k !== "AUG"), n = R.int(2, 3);
  const cods = ["AUG", ...Array.from({ length: n }, () => R.pick(keys)), R.pick(["UAA", "UGA", "UAG"])];
  const right = cods.slice(0, -1).map(c => T.tr_tab[c]).join("–");
  const wrong1 = cods.slice(1, -1).map(c => T.tr_tab[c]).join("–");
  const wrong2 = [...cods.slice(0, -1)].reverse().map(c => T.tr_tab[c]).join("–");
  const wrong3 = right + "–Stop";
  const opts = [right, wrong1, wrong2, wrong3].filter((v, i, a) => a.indexOf(v) === i);
  return { q: T.tr_q(cods.join("")), kind: "choice", opts, correct: 0, sol: T.tr_s(right) };
});
def("bg12.operon", (R, S) => {
  const T = S.bg12, [s, right] = R.pick(T.op_cases), others = T.op_cases.map(c => c[1]).filter(t => t !== right);
  return { q: T.op_q(s), kind: "choice", opts: [right, ...others], correct: 0, sol: T.op_s };
});
def("bg12.pcr", (R, S, H) => {
  const T = S.bg12, n0 = R.pick([1, 2, 5, 10]), c = R.int(5, 20), r = n0 * 2 ** c;
  return { q: T.pcr_q(n0, c), kind: "int", ans: r, sol: T.pcr_s(n0, c, H.n(r)) };
});
})();
