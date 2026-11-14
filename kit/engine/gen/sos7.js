/* WikiAula — Desarrollo sostenible, Grado 7: sistema Tierra, límites planetarios, huella hídrica, suelo, materias primas,
   renovables, consumo eléctrico, economía circular, plástico, Agenda 2030 y campañas. Textos en i18n/<lang>/sos7.js (S.sos7). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos7.esfera", (R, S) => B.mixed(S.sos7.esfera, R));
def("sos7.limite", (R, S) => B.mixed(S.sos7.limite, R));
def("sos7.aguacons", (R, S) => B.mixed(S.sos7.aguacons, R));
def("sos7.suelo", (R, S) => B.mixed(S.sos7.suelo, R));
def("sos7.mineral", (R, S) => B.mixed(S.sos7.mineral, R));
def("sos7.renovable", (R, S) => B.mixed(S.sos7.renovable, R));
def("sos7.etiqueta", (R, S) => B.mixed(S.sos7.etiqueta, R));
def("sos7.circular", (R, S) => B.mixed(S.sos7.circular, R));
def("sos7.plastico", (R, S) => B.mixed(S.sos7.plastico, R));
def("sos7.ods", (R, S) => B.mixed(S.sos7.ods, R));
def("sos7.campana", (R, S) => B.mixed(S.sos7.campana, R));

// Huella hídrica: cantidad × litros por unidad.
def("sos7.huellah", (R, S) => {
  const T = S.sos7, [p, l, u] = R.pick(T.productos), q = u === "kg" ? R.pick([0.2, 0.5, 1, 2, 3]) : R.int(1, 5), t = Math.round(q * l);
  return { q: T.hh_q(p, l, u, q), kind: "int", ans: t, sol: T.hh_s(q, l, t) };
});

// Coste eléctrico: W × h ÷ 1000 × €/kWh.
def("sos7.coste", (R, S, H) => {
  const T = S.sos7, [a, w] = R.pick(T.aparatos), h = R.int(1, 8), e = w * h / 1000, c = +(e * 0.15).toFixed(2);
  if (R.int(0, 1)) return { q: T.co_q1(a, w, h), kind: "num", ans: e, tol: 0.001, sol: T.co_s1(w, h, e) };
  return { q: T.co_q2(a, w, h), kind: "num", ans: c, tol: 0.01, ansHtml: WA.MATH.eur(c, H) + " €", sol: T.co_s2(w, h, e, c) };
});

// Porcentaje reciclado.
def("sos7.porc", (R, S) => {
  const T = S.sos7, tot = R.pick([200, 400, 500, 800, 1000, 2000, 5000, 12000]), p = R.pick([5, 10, 15, 20, 25, 30, 40, 45, 50, 60]), r = tot * p / 100;
  return { q: T.pc_q(tot, r), kind: "int", ans: p, sol: T.pc_s(tot, r, p) };
});
})();
