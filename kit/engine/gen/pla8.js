/* WikiAula — Educación plástica, visual y audiovisual, Grado 8: sistemas de representación, vistas, isométrica, cónica, tangencias,
   curvas técnicas, diseño, tipografía, lenguaje audiovisual, licencias y formatos. Textos y bancos en i18n/<lang>/pla8.js (S.pla8). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("pla8.sistema", (R, S) => B.mixed(S.pla8.sistema, R));
def("pla8.vista", (R, S) => B.mixed(S.pla8.vista, R));
def("pla8.iso", (R, S) => B.mixed(S.pla8.iso, R));
def("pla8.fuga", (R, S) => B.mixed(S.pla8.fuga, R));
def("pla8.tangencia", (R, S) => B.mixed(S.pla8.tangencia, R));
def("pla8.curva", (R, S) => B.mixed(S.pla8.curva, R));
def("pla8.ambito", (R, S) => B.mixed(S.pla8.ambito, R));
def("pla8.tipo", (R, S) => B.mixed(S.pla8.tipo, R));
def("pla8.camara", (R, S) => B.mixed(S.pla8.camara, R));
def("pla8.licencia", (R, S) => B.mixed(S.pla8.licencia, R));
def("pla8.formato", (R, S) => B.mixed(S.pla8.formato, R));

// Circunferencias tangentes: distancia entre centros = r1 + r2 (exteriores) o r1 − r2 (interiores).
def("pla8.centros", (R, S) => {
  const T = S.pla8, a = R.int(3, 12), b = R.int(1, a - 1), ext = R.int(0, 1) === 0;
  if (R.int(0, 2) === 0) {
    const d = ext ? a + b : a - b;
    return { q: T.ce_q2(ext, a, d), kind: "int", ans: b, sol: T.ce_s2(ext, a, d, b) };
  }
  return { q: T.ce_q(ext, a, b), kind: "int", ans: ext ? a + b : a - b, sol: T.ce_s(ext, a, b) };
});
})();
