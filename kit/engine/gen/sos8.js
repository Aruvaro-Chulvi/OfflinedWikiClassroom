/* WikiAula — Desarrollo sostenible, Grado 8: ciencia del clima, impactos, mitigación y adaptación, servicios ecosistémicos,
   invasoras, espacios protegidos, ciudades, movilidad, edificios, agricultura y pesca. Textos en i18n/<lang>/sos8.js (S.sos8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("sos8.tiempoclima", (R, S) => B.mixed(S.sos8.tiempoclima, R));
def("sos8.impacto", (R, S) => B.mixed(S.sos8.impacto, R));
def("sos8.mitadapt", (R, S) => B.mixed(S.sos8.mitadapt, R));
def("sos8.servicio", (R, S) => B.mixed(S.sos8.servicio, R));
def("sos8.invasora", (R, S) => B.mixed(S.sos8.invasora, R));
def("sos8.protegido", (R, S) => B.mixed(S.sos8.protegido, R));
def("sos8.ciudad", (R, S) => B.mixed(S.sos8.ciudad, R));
def("sos8.movil", (R, S) => B.mixed(S.sos8.movil, R));
def("sos8.edificio", (R, S) => B.mixed(S.sos8.edificio, R));
def("sos8.agricultura", (R, S) => B.mixed(S.sos8.agricultura, R));
def("sos8.pesca", (R, S) => B.mixed(S.sos8.pesca, R));

// Proyectar el CO₂: inicial + subida anual × años.
def("sos8.ppm", (R, S) => {
  const T = S.sos8, c = R.int(410, 425), s = R.pick([2, 2.5, 3]), y = R.pick([4, 5, 10, 20]), r = +(c + s * y).toFixed(1);
  return { q: T.pp_q(c, s, y), kind: "num", ans: r, tol: 0.05, sol: T.pp_s(c, s, y, r) };
});

// m² de zona verde por habitante.
def("sos8.verde", (R, S) => {
  const T = S.sos8, h = R.pick([10, 15, 20, 40, 50, 80, 100, 200]) * 1000, k = R.int(3, 20), v = h * k;
  return { q: T.ve_q(h, v), kind: "int", ans: k, sol: T.ve_s(h, v, k) };
});

// Emisiones anuales de un trayecto diario de ida y vuelta.
def("sos8.anual", (R, S) => {
  const T = S.sos8, km = R.int(2, 25), d = R.pick([200, 220, 250]), [md, g] = R.pick(T.medios), kg = km * 2 * d * g / 1000;
  return { q: T.an_q(km, d, md, g), kind: "num", ans: kg, tol: 0.05, sol: T.an_s(km, d, g, kg) };
});
})();
