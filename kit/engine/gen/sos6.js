/* WikiAula — Desarrollo sostenible, Grado 6: efecto invernadero, cambio climático, huella de carbono, movilidad, biodiversidad,
   plásticos, alimentación, desperdicio, barrio y proyecto. Textos y bancos en i18n/<lang>/sos6.js (S.sos6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos6.gei", (R, S) => B.mixed(S.sos6.gei, R));
def("sos6.clima", (R, S) => B.mixed(S.sos6.clima, R));
def("sos6.reducir", (R, S) => B.mixed(S.sos6.reducir, R));
def("sos6.amenaza", (R, S) => B.mixed(S.sos6.amenaza, R));
def("sos6.plastico", (R, S) => B.mixed(S.sos6.plastico, R));
def("sos6.temporada", (R, S) => B.mixed(S.sos6.temporada, R));
def("sos6.fecha", (R, S) => B.mixed(S.sos6.fecha, R));
def("sos6.barrio", (R, S) => B.mixed(S.sos6.barrio, R));
def("sos6.alternativa", (R, S) => B.mixed(S.sos6.alternativa, R));

// Huella de un alimento: cantidad × kg de CO₂ por kg.
def("sos6.huella", (R, S) => {
  const T = S.sos6, [al, e] = R.pick(T.alimentos), q = R.pick([0.5, 1, 2, 3, 4, 5]), t = +(q * e).toFixed(2);
  return { q: T.hu_q(al, e, q), kind: "num", ans: t, tol: 0.01, sol: T.hu_s(q, e, t) };
});

// kg de CO₂ = km × g/km ÷ 1000.
def("sos6.co2km", (R, S) => {
  const T = S.sos6, [m, g] = R.pick(T.medios.slice(1)), km = R.pick([2, 4, 5, 8, 10, 20, 50, 100, 300, 600]), kg = km * g / 1000;
  return { q: T.ck_q(m, g, km), kind: "num", ans: kg, tol: 0.01, sol: T.ck_s(km, g, kg) };
});

// ¿Qué medio emite menos? (dos medios distintos).
def("sos6.medio", (R, S) => {
  const T = S.sos6, L = R.shuffle(T.medios.slice()).slice(0, 2), w = L[0][1] < L[1][1] ? 0 : 1;
  return { q: T.me_q(L[0][0], L[1][0]), kind: "choice", opts: [L[0][0], L[1][0]], correct: w, shuffle: false, sol: T.me_s(L) };
});

// ¿Qué tarda más en degradarse?
def("sos6.dura", (R, S) => {
  const T = S.sos6, L = R.shuffle(T.residuos.slice()).slice(0, 2), w = L[0][1] > L[1][1] ? 0 : 1;
  return { q: T.du_q(L[0][0], L[1][0]), kind: "choice", opts: [L[0][0], L[1][0]], correct: w, shuffle: false, sol: T.du_s(L) };
});

// Kilómetros de los alimentos: diferencia.
def("sos6.km", (R, S) => {
  const T = S.sos6, al = R.pick(T.productos), a = R.int(1, 9) * 10, b = R.int(5, 120) * 100;
  return { q: T.km_q(al, a, b), kind: "int", ans: b - a, sol: T.km_s(a, b, b - a) };
});

// Desperdicio: kg por periodo.
def("sos6.desperdicio", (R, S) => {
  const T = S.sos6, k = R.int(1, 20), [u, p, n, x] = R.pick(T.periodos);
  return { q: T.de_q(k, u, p, n, x), kind: "int", ans: k * n, sol: T.de_s(k, n, k * n) };
});

// Reducción en %.
def("sos6.porcentaje", (R, S) => {
  const T = S.sos6, a = R.pick([20, 40, 50, 60, 80, 100, 120, 200]), p = R.pick([10, 20, 25, 30, 40, 50, 60, 75, 80]), d = a * (100 - p) / 100;
  if (!Number.isInteger(d)) return { q: T.po_q(100, 100 - p), kind: "int", ans: p, sol: T.po_s(100, 100 - p, p) };
  return { q: T.po_q(a, d), kind: "int", ans: p, sol: T.po_s(a, d, p) };
});
})();
