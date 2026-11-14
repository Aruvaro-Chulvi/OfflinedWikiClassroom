/* WikiAula — Ciencias sociales, Grado 1 (1.º de Primaria): bancos de clasificación.
   Textos y bancos en i18n/<lang>/cs1.js (S.cs1). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cs1.familiar", (R, S) => B.mixed(S.cs1.familiar, R));
def("cs1.tarea", (R, S) => B.mixed(S.cs1.tarea, R));
def("cs1.etapa", (R, S) => B.mixed(S.cs1.etapa, R));
def("cs1.fuente", (R, S) => B.mixed(S.cs1.fuente, R));
def("cs1.escuela", (R, S) => B.mixed(S.cs1.escuela, R));
def("cs1.norma", (R, S) => B.mixed(S.cs1.norma, R));
def("cs1.igualdad", (R, S) => B.mixed(S.cs1.igualdad, R));
def("cs1.calendario", (R, S) => B.mixed(S.cs1.calendario, R));
def("cs1.antesahora", (R, S) => B.mixed(S.cs1.antesahora, R));
def("cs1.lugar", (R, S) => B.mixed(S.cs1.lugar, R));
def("cs1.oficio", (R, S) => B.mixed(S.cs1.oficio, R));
def("cs1.vial", (R, S) => B.mixed(S.cs1.vial, R));
def("cs1.paisaje", (R, S) => B.mixed(S.cs1.paisaje, R));
def("cs1.cuidar", (R, S) => B.mixed(S.cs1.cuidar, R));
def("cs1.animales", (R, S) => B.mixed(S.cs1.animales, R));
def("cs1.posicion", (R, S) => B.mixed(S.cs1.posicion, R));
def("cs1.camino", (R, S) => B.mixed(S.cs1.camino, R));

def("cs1.diasem", (R, S) => {
  const T = S.cs1, i = R.int(0, 6), k = R.pick([["será mañana", 1], ["fue ayer", -1], ["será pasado mañana", 2]]), r = T.ds_days[(i + k[1] + 7) % 7];
  const opts = [r, ...R.shuffle(T.ds_days.filter(d => d !== r)).slice(0, 3)];
  return { q: T.ds_q(T.ds_days[i], k[0]), kind: "choice", opts, correct: 0, sol: T.ds_s(r) };
});
})();
