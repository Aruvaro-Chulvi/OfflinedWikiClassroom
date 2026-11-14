/* WikiAula — textos de gen/mat7u4.js (Grado 7 · Unidad 4: Fracciones), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  fr_q: e => `Calcula: <b>${e}</b>`,
  fr_hint_simp: "Simplifica el resultado todo lo posible. Ejemplo: 3/4",
  fr_comp_q: e => `Completa para que las fracciones sean equivalentes: <b>${e}</b>`,
  fr_comp_s: (k, mult, r) => `Para pasar de una fracción a la otra se han ${mult ? "multiplicado" : "dividido"} el numerador y el denominador ${mult ? "por" : "entre"} ${k}: el hueco vale <b>${r}</b>.`,
  fr_simp_q: f => `Simplifica hasta obtener la fracción irreducible: <b>${f}</b>`,
  fr_simp_s: (g, f, r) => `Dividimos numerador y denominador entre su m.c.d., ${g}: ${f} = <b>${r}</b>.`,
  fr_eq_q: (a, b) => `¿Son equivalentes <b>${a}</b> y <b>${b}</b>?`,
  fr_eq_s: (p1, p2, ok) => `Productos cruzados (el numerador de cada una por el denominador de la otra): ${p1} y ${p2}. ${ok ? "Son iguales, así que <b>sí</b> son equivalentes." : "Son distintos, así que <b>no</b> son equivalentes."}`,
  fr_graf_q: "¿Qué fracción de la figura está coloreada?",
  fr_graf_s: (n, d, r) => `Hay ${d} partes iguales y ${n} ${n === 1 ? "está coloreada" : "están coloreadas"}: <b>${r}</b>.`,
  fr_cant_u: ["€", "km", "personas", "litros", "", "gramos"],
  fr_cant_q: (f, c, u) => `Calcula ${f} de ${c}${u ? " " + u : ""}.`,
  fr_de: (a, b) => `${a} de ${b}`,
  fr_cant_s: (c, d, n, r) => `Dividimos entre el denominador y multiplicamos por el numerador: ${c} : ${d} = ${c / d}; ${c / d} · ${n} = <b>${r}</b>.`,
  fr_cmp_q: (a, b) => `¿Qué signo va en el hueco? <b>${a}</b> <span class="wa-hole">□</span> <b>${b}</b>`,
  fr_cmp_s: (a2, b2, sign) => `Las pasamos a común denominador: ${a2} y ${b2}. Comparando los numeradores: <b>${sign}</b>.`,
  fr_cmp_s1: (a, b, sign) => `Tienen el mismo denominador: comparamos los numeradores, ${a} ${a > b ? "&gt;" : "&lt;"} ${b}. Así que <b>${sign}</b>.`,
  fr_may_q: big => `¿Cuál de estas fracciones es la ${big ? "mayor" : "menor"}?`,
  fr_may_s: (list, r) => `Con común denominador: ${list}. La buscada es <b>${r}</b>.`,
  fr_sum_s: (m, e2, r0, r) => `Reducimos a común denominador (m.c.m. = ${m}): ${e2} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b> (simplificando)`}.`,
  fr_sum_s1: (e, r0, r) => `Mismo denominador: se suman o restan los numeradores. ${e} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b> (simplificando)`}.`,
  fr_mul_s: (e, r0, r) => `Se multiplican numeradores entre sí y denominadores entre sí: ${e} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b>`}.`,
  fr_cruz_par: (up, down, g) => `${up} (arriba) y ${down} (abajo) entre ${g}`,
  fr_mul_cruz: (e, pairs, mid, r) => `Antes de multiplicar simplifico un número de arriba con uno de abajo: ${pairs.join("; ")}. Después, numerador por numerador y denominador por denominador: ${e} = ${mid} = <b>${r}</b>.`,
  fr_div_s: (e, e2, r0, r) => `Dividir es multiplicar por la inversa: ${e} = ${e2} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b>`}.`,
  fr_inv_q: f => `¿Cuál es la fracción inversa de <b>${f}</b>?`,
  fr_inv_s: (f, r) => `La inversa se obtiene dando la vuelta a la fracción: ${f} → <b>${r}</b>. Su producto es 1.`,
  fr_comb_s: "Primero los paréntesis, después productos y cocientes (sin paréntesis, se empieza por la multiplicación o la división) y por último sumas y restas, con común denominador solo para sumar y restar. Antes de multiplicar, se simplifica un número de arriba con uno de abajo si se puede:",
  fr_comb_par: (p1, p2) => `Primer paréntesis: ${p1}. Segundo paréntesis: ${p2}.`,
  fr_prob: [
    { q: (f1, f2, tot) => `Lucía gasta ${f1} de su paga en libros y ${f2} en el cine. ¿Qué fracción de la paga le queda?`,
      s: (a, b, sum, rest, note) => `Gasta ${a} + ${b} = ${sum} de la paga${note}.<br>Le queda 1 − ${rest}.` },
    { q: (f1, f2, tot) => `En un grupo de alumnos, ${f1} va a clase andando y ${f2} en autobús. El resto va en bici. ¿Qué fracción va en bici?`,
      s: (a, b, sum, rest, note) => `Andando o en autobús: ${a} + ${b} = ${sum}${note}.<br>En bici: 1 − ${rest}.` },
  ],
  fr_prob_mcm: (d1, d2, m) => ` (m.c.m. de ${d1} y ${d2} = ${m})`,
  fr_prob2_q: (tot, f1, f2) => `Un depósito de ${tot} litros está lleno. Se gasta ${f1} del agua y después ${f2} de lo que quedaba. ¿Cuántos litros quedan?`,
  fr_prob2_s: (f1, tot, d1, n1, g1, q1, f2, d2, n2, g2, r) => `Primero se gasta ${f1} de ${tot}: ${tot} : ${d1} · ${n1} = ${g1} L; quedan ${tot} − ${g1} = ${q1} L.<br>` +
    `Después se gasta ${f2} <b>de lo que quedaba</b> (no del total): ${q1} : ${d2} · ${n2} = ${g2} L; quedan ${q1} − ${g2} = <b>${r}</b> litros.`,
  fr_prob3: [
    { q: (f, p) => `Los ${f} de los alumnos de un instituto van en autobús, y son ${p}. ¿Cuántos alumnos hay en el instituto?`, u: "alumnos" },
    { q: (f, p) => `Marcos ha leído ${f} de un libro, que son ${p} páginas. ¿Cuántas páginas tiene el libro?`, u: "páginas" },
    { q: (f, p) => `En una excursión ya se han recorrido ${f} del camino, que son ${p} km. ¿Cuántos km tiene el camino entero?`, u: "km" },
    { q: (f, p) => `Ana ha ahorrado ${f} del precio de una bicicleta: ${p} €. ¿Cuánto cuesta la bicicleta, en euros?`, u: "€" },
  ],
  fr_prob3_s: (f, p, n, d, k, tot, u) => `Conozco una parte y busco el total. ${f} son ${p}, así que 1/${d} es ${p} : ${n} = ${k}.<br>El total son ${d}/${d}: ${d} · ${k} = <b>${tot}</b> ${u}.<br>Compruebo: ${f} de ${tot} = ${tot} : ${d} · ${n} = ${p} ✓`,
});
})();
