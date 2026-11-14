/* WikiAula — Desarrollo sostenible, Grado 5: sostenibilidad, recursos, agua, energía, residuos, compost, huerto y ecoauditoría.
   Textos y bancos en i18n/<lang>/sos5.js (S.sos5). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos5.sostenible", (R, S) => B.mixed(S.sos5.sostenible, R));
def("sos5.recurso", (R, S) => B.mixed(S.sos5.recurso, R));
def("sos5.agua", (R, S) => B.mixed(S.sos5.agua, R));
def("sos5.ciclo", (R, S) => B.mixed(S.sos5.ciclo, R));
def("sos5.fuente", (R, S) => B.mixed(S.sos5.fuente, R));
def("sos5.ahorro", (R, S) => B.mixed(S.sos5.ahorro, R));
def("sos5.contenedor", (R, S) => B.mixed(S.sos5.contenedor, R));
def("sos5.compost", (R, S) => B.mixed(S.sos5.compost, R));
def("sos5.huerto", (R, S) => B.mixed(S.sos5.huerto, R));

// Litros de agua: minutos × litros por minuto, o ahorro frente al baño.
def("sos5.litros", (R, S) => {
  const T = S.sos5, m = R.int(3, 15), l = R.pick([6, 8, 10, 12]);
  if (R.int(0, 1)) return { q: T.li_q1(m, l), kind: "int", ans: m * l, sol: T.li_s1(m, l, m * l) };
  return { q: T.li_q2(m, l), kind: "int", ans: 200 - m * l, sol: T.li_s2(m, l, m * l, 200 - m * l) };
});

// kWh = W × h ÷ 1000.
def("sos5.kwh", (R, S) => {
  const T = S.sos5, [ap, w] = R.pick(T.aparatos), h = R.int(1, 10), e = w * h / 1000;
  return { q: T.kw_q(ap, w, h), kind: "num", ans: e, tol: 0.001, sol: T.kw_s(w, h, e) };
});

// Ecoauditoría: total o media de kilos de basura de la semana.
def("sos5.auditoria", (R, S) => {
  const T = S.sos5, v = [0, 0, 0, 0, 0].map(() => R.int(1, 8));
  const tot = v.reduce((a, b) => a + b, 0);
  if (R.int(0, 1) || tot % 5) return { q: T.au_q1(v), kind: "int", ans: tot, sol: T.au_s1(v, tot) };
  return { q: T.au_q2(v), kind: "int", ans: tot / 5, sol: T.au_s2(v, tot, tot / 5) };
});
})();
