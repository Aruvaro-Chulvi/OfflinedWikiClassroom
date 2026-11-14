/* Generadores de ejercicios del curso «Trucos de cálculo mental».

   Cada generador es una función pura: recibe
     R  azar (R.int(a, b), R.pick(lista), R.shuffle(lista), R.r())
     S  textos del motor (no hace falta en un curso de la comunidad)
     H  formato de números del idioma (H.n(12500) → «12 500», H.dec(2.5) → «2,5»)
     L  todo el idioma
   y devuelve un ejercicio: { q: enunciado (HTML sencillo), kind, ans, sol: solución }.
   Tipos más usados: "int" (entero), "num" (decimal; tol = tolerancia), "frac" ([n, d]),
   "text" (texto o lista de textos aceptados), "choice" (opts: [...], correct: posición).

   Prohibido: red, DOM, window (salvo window.WA), eval, temporizadores… (lo comprueba
   community.py; todo el código se revisa a mano antes de publicarse). */
"use strict";
(function () {
const WA = window.WA;

WA.def("c.offlined.ejemplo.por11", (R, S, H) => {
  const a = R.int(1, 9), b = R.int(0, 9), n = 10 * a + b, s = a + b;
  const sol = s < 10
    ? `Separo el ${a} y el ${b} y pongo en medio su suma, ${s}: <b>${H.n(n * 11)}</b>.`
    : `${a} + ${b} = ${s}: pongo el ${s - 10} en medio y llevo 1 al ${a}: <b>${H.n(n * 11)}</b>.`;
  return { q: `Calcula de cabeza: ${n} × 11.`, kind: "int", ans: n * 11, sol };
});

WA.def("c.offlined.ejemplo.por5", (R, S, H) => {
  const n = 2 * R.int(6, 99);
  return { q: `Calcula de cabeza: ${H.n(n)} × 5.`, kind: "int", ans: n * 5,
           sol: `La mitad de ${H.n(n)} es ${H.n(n / 2)}, y le añado un cero: <b>${H.n(n * 5)}</b>.` };
});
})();
