/* WikiAula — Desarrollo sostenible, Grado 9: transición energética, almacenamiento, autoconsumo, huella ecológica, cadenas de
   suministro, residuos, justicia climática, género, salud, acuerdos, políticas y datos. Textos en i18n/<lang>/sos9.js (S.sos9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos9.transicion", (R, S) => B.mixed(S.sos9.transicion, R));
def("sos9.almacen", (R, S) => B.mixed(S.sos9.almacen, R));
def("sos9.cadena", (R, S) => B.mixed(S.sos9.cadena, R));
def("sos9.jerarquia", (R, S) => B.mixed(S.sos9.jerarquia, R));
def("sos9.justicia", (R, S) => B.mixed(S.sos9.justicia, R));
def("sos9.genero", (R, S) => B.mixed(S.sos9.genero, R));
def("sos9.salud", (R, S) => B.mixed(S.sos9.salud, R));
def("sos9.acuerdo", (R, S) => B.mixed(S.sos9.acuerdo, R));
def("sos9.politica", (R, S) => B.mixed(S.sos9.politica, R));

// % renovable.
def("sos9.cuota", (R, S) => {
  const T = S.sos9, t = R.pick([40, 80, 100, 120, 200, 250, 400]), p = R.pick([10, 20, 25, 30, 40, 45, 50, 60, 75]), r = t * p / 100;
  return { q: T.cu_q(t, r), kind: "int", ans: p, sol: T.cu_s(t, r, p) };
});

// Producción solar: kWp × 1500.
def("sos9.solar", (R, S) => {
  const T = S.sos9, k = R.pick([1, 2, 3, 4, 5, 6, 10, 20, 50]), e = k * 1500;
  if (R.int(0, 1)) return { q: T.so_q1(k), kind: "int", ans: e, sol: T.so_s1(k, e) };
  const u = Math.round(e * R.pick([0.5, 0.6, 0.8]) / 100) * 100, a = +(u * 0.15).toFixed(2);
  return { q: T.so_q2(k, u), kind: "num", ans: a, tol: 0.01, sol: T.so_s2(u, a) };
});

// Amortización = coste ÷ ahorro anual.
def("sos9.amortizar", (R, S) => {
  const T = S.sos9, a = R.pick([300, 400, 450, 500, 600, 800]), y = R.int(5, 14);
  return { q: T.am_q(a * y, a), kind: "int", ans: y, sol: T.am_s(a * y, a, y) };
});

// ¿Cuántas Tierras? huella ÷ 1,6.
def("sos9.tierras", (R, S) => {
  const T = S.sos9, k = R.pick([0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5]), h = +(k * 1.6).toFixed(2);
  return { q: T.ti_q(h), kind: "num", ans: k, tol: 0.01, sol: T.ti_s(h, k) };
});

// Día de la deuda ecológica ≈ 365 × 1,6 ÷ huella.
def("sos9.deuda", (R, S) => {
  const T = S.sos9, h = R.pick([2, 2.4, 3.2, 4, 4.8, 5.6, 6.4, 8]), d = Math.round(365 * 1.6 / h);
  return { q: T.de_q(h), kind: "num", ans: d, tol: 1, sol: T.de_s(h, d) };
});

// Tasa de reciclaje.
def("sos9.residuo", (R, S) => {
  const T = S.sos9, t = R.pick([1000, 2000, 4000, 5000, 10000, 20000, 50000]), p = R.pick([15, 20, 25, 30, 35, 40, 45, 50, 55, 60]), r = t * p / 100;
  return { q: T.re_q(t, r), kind: "int", ans: p, sol: T.re_s(t, r, p) };
});

// ¿Cuántas veces más emite?
def("sos9.veces", (R, S) => {
  const T = S.sos9, L = T.paises, i = R.int(0, 2);
  const j = R.int(3, L.length - 1);
  const a = L[i], b = L[j], v = +(a[1] / b[1]).toFixed(1);
  return { q: T.ve_q(a, b), kind: "num", ans: v, tol: 0.1, sol: T.ve_s(a, b, v) };
});

// Tasa de variación.
def("sos9.variacion", (R, S) => {
  const T = S.sos9, a = R.pick([40, 50, 80, 100, 200, 250, 400, 500]), p = R.pick([-40, -30, -25, -20, -15, -10, 10, 20, 25, 50]), b = a * (100 + p) / 100;
  return { q: T.va_q(a, b), kind: "int", ans: p, sol: T.va_s(a, b, p) };
});

// Per cápita.
def("sos9.percapita", (R, S) => {
  const T = S.sos9, h = R.pick([2, 4, 5, 8, 10, 20, 40, 50]), t = R.pick([1, 2, 3, 4, 5, 6, 8, 10, 15]);
  return { q: T.pc_q(h * t, h), kind: "int", ans: t, sol: T.pc_s(h * t, h, t) };
});
})();
