/* WikiAula — Desarrollo sostenible, Grado 10: sistemas, crecimiento exponencial, presupuesto de carbono, derecho ambiental,
   bienes comunes, participación, empleo verde, finanzas, desacoplamiento, tecnología, ACV y proyectos. Textos en i18n/<lang>/sos10.js. */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos10.bucle", (R, S) => B.mixed(S.sos10.bucle, R));
def("sos10.crecer", (R, S) => B.mixed(S.sos10.crecer, R));
def("sos10.escenario", (R, S) => B.mixed(S.sos10.escenario, R));
def("sos10.aarhus", (R, S) => B.mixed(S.sos10.aarhus, R));
def("sos10.principio", (R, S) => B.mixed(S.sos10.principio, R));
def("sos10.comunes", (R, S) => B.mixed(S.sos10.comunes, R));
def("sos10.participa", (R, S) => B.mixed(S.sos10.participa, R));
def("sos10.empleo", (R, S) => B.mixed(S.sos10.empleo, R));
def("sos10.esg", (R, S) => B.mixed(S.sos10.esg, R));
def("sos10.debate", (R, S) => B.mixed(S.sos10.debate, R));
def("sos10.rebote", (R, S) => B.mixed(S.sos10.rebote, R));
def("sos10.etapa", (R, S) => B.mixed(S.sos10.etapa, R));
def("sos10.smart", (R, S) => B.mixed(S.sos10.smart, R));

// Regla del 70.
def("sos10.duplicar", (R, S) => {
  const T = S.sos10, [w] = R.pick(T.magnitudes), t = R.pick([1, 2, 3.5, 5, 7, 10, 14]), y = +(70 / t).toFixed(1);
  return { q: T.du_q(w, t), kind: "num", ans: y, tol: 0.1, sol: T.du_s(t, y) };
});

// Años de presupuesto de carbono.
def("sos10.presupuesto", (R, S) => {
  const T = S.sos10, b = R.pick([100, 200, 250, 300, 400, 500, 800, 1000, 1150]), e = R.pick([20, 25, 30, 40, 50]), y = +(b / e).toFixed(1);
  return { q: T.pr_q(b, e), kind: "num", ans: y, tol: 0.1, sol: T.pr_s(b, e, y) };
});

// Interés de un bono verde.
def("sos10.bono", (R, S, H) => {
  const T = S.sos10, c = R.pick([500, 1000, 2000, 5000, 10000]), t = R.pick([1, 2, 2.5, 3, 4, 5]), a = +(c * t / 100).toFixed(2);
  return { q: T.bo_q(c, t), kind: "num", ans: a, tol: 0.01, ansHtml: WA.MATH.eur(a, H) + " €", sol: T.bo_s(c, t, a) };
});

// Tipo de desacoplamiento.
def("sos10.desacople", (R, S) => {
  const T = S.sos10, g = R.int(2, 12), k = R.int(0, 2);
  const e = k === 0 ? -R.int(1, 8) : k === 1 ? R.int(1, g - 1) : g + R.int(0, 4);
  return { q: T.de_q(g, e), kind: "choice", opts: T.tipos, correct: k, shuffle: false, sol: T.de_s(g, e, k) };
});

// ACV: total o porcentaje de una etapa.
def("sos10.acv", (R, S) => {
  const T = S.sos10, [p] = R.pick(T.productos), v = [R.int(2, 15), R.int(2, 15), R.int(1, 5), R.int(2, 20), R.int(1, 4)].map(x => x * 10);
  const tot = v.reduce((a, b) => a + b, 0), k = R.int(0, 4), pc = +(v[k] / tot * 100).toFixed(1);
  if (R.int(0, 1)) return { q: T.ac_q1(p, v), kind: "int", ans: tot, sol: T.ac_s1(v, tot) };
  return { q: T.ac_q2(p, v, k), kind: "num", ans: pc, tol: 0.1, sol: T.ac_s2(v, tot, k, pc) };
});
})();
