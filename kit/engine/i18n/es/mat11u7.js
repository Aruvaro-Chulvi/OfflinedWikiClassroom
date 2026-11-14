/* WikiAula — textos de gen/mat11u7.js (Grado 11 · Unidad 7: Cónicas), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  co_cr_q: e => `Calcula el centro y el radio de la circunferencia <b>${e}</b>.`,
  co_cr_f: ["Centro: x", "Centro: y", "Radio"],
  co_cr_s: (g, c, red, a, b, r2, r) => `Agrupamos: ${g}. Completamos cuadrados (la mitad del coeficiente, al cuadrado, y la restamos): ${c}. Pasando los números a la derecha: ${red}. Centro <b>(${a}, ${b})</b> y r = √${r2} = <b>${r}</b>.`,
  co_es_q: e => `¿Qué representa la ecuación <b>${e}</b>?`,
  co_es_opts: ["Una circunferencia", "Un solo punto", "Ningún punto"],
  co_es_s: (g, c, red, t, C) => `Agrupamos y completamos cuadrados: ${g} → ${c} → ${red}. ${t === 0 ? "El segundo miembro es positivo: es una <b>circunferencia</b>." : t === 1 ? `Una suma de cuadrados vale 0 solo si los dos son 0: es <b>un solo punto</b>, ${C}.` : "Una suma de cuadrados no puede ser negativa: <b>ningún punto</b> cumple la ecuación."}`,
  co_ce_q: (C, r) => `¿Cuál es la ecuación de la circunferencia de centro C${C} y radio ${r}?`,
  co_ce_s: (red, dev, e) => `Ecuación reducida: ${red}. Desarrollamos los cuadrados: ${dev}. Pasando todo a un miembro: <b>${e}</b>.`,
  cp_t: {
    q0: (l, C, r) => `¿Qué posición tiene la recta <b>${l}</b> respecto a la circunferencia de centro ${C} y radio ${r}?`,
    opts: ["Secante", "Tangente", "Exterior"],
    s0: (num, d, r, t) => `Comparamos la distancia del centro a la recta con el radio: d = ${num}. ${t === 0 ? `d = ${d} &lt; r = ${r}: la recta corta a la circunferencia en dos puntos, es <b>secante</b>.` : t === 1 ? `d = r = ${r}: la toca en un solo punto, es <b>tangente</b>.` : `d = ${d} &gt; r = ${r}: no la toca, es <b>exterior</b>.`}`,
    q1: (C, l) => `Halla el radio de la circunferencia de centro ${C} que es tangente a la recta <b>${l}</b>.`,
    f1: "Radio",
    s1: (num, eq, r) => `Si es tangente, el radio es la distancia del centro a la recta: r = ${num}. La circunferencia es ${eq}. Radio: <b>${r}</b>.`,
    q2: (P, r2) => `¿Cuáles son las rectas tangentes a la circunferencia <b>x² + y² = ${r2}</b> que pasan por el punto exterior P${P}?`,
    s2: (l, eq, quad, m1, m2, ok) => `Las rectas por P son ${l}. Son tangentes si su distancia al centro (0, 0) es igual al radio: ${eq}. Elevando al cuadrado y agrupando: ${quad}, que da m = ${m1} o m = ${m2}. Tangentes: <b>${ok}</b>.`,
  },
  co_fo_q: e => `¿Dónde están los focos de la elipse <b>${e}</b>?`,
  co_fo_s: (a2, v, a, b, c, ok) => `El denominador mayor, ${a2}, está bajo ${v}: el eje mayor es el ${v === "y²" ? "vertical (eje Y)" : "horizontal (eje X)"}. a = ${a}, b = ${b} y c = √(a² − b²) = √(${a * a} − ${b * b}) = ${c}. Focos: <b>${ok}</b>.`,
  co_ee_q: (F, a) => `Escribe la ecuación de la elipse de centro el origen con focos ${F} y semieje mayor ${a}.`,
  co_ee_s: (a, c, b2, vert, ok) => `En la elipse b² = a² − c² = ${a * a} − ${c * c} = ${b2}. Los focos están en el eje ${vert ? "Y: el denominador mayor va bajo y²" : "X: el denominador mayor va bajo x²"}: <b>${ok}</b>.`,
  co_he_q: (a, c) => `Escribe la ecuación de la hipérbola de centro el origen con vértices (±${a}, 0) y focos (±${c}, 0).`,
  co_he_s: (a, c, b2, ok) => `En la hipérbola c² = a² + b², así que b² = c² − a² = ${c * c} − ${a * a} = ${b2}. Vértices y focos en el eje X: el término positivo es el de x². <b>${ok}</b>.`,
  co_el_q: e => `Para la elipse <b>${e}</b>, calcula el semieje mayor a, el semieje menor b y la semidistancia focal c.`,
  co_el_f: ["a", "b", "c"],
  co_el_s: (a, b, c) => `a² y b² son los denominadores (a el mayor): a = ${a}, b = ${b}. En la elipse, a² = b² + c², así que c = √(a² − b²) = <b>${c}</b>.`,
  co_ex_q: e => `Calcula la excentricidad de la elipse <b>${e}</b> (redondea a las centésimas).`,
  co_ex_s: (c, a, r, ex) => `e = c/a = ${c}/${a} ${ex ? "=" : "≈"} <b>${r}</b> (siempre entre 0 y 1 en la elipse).`,
  co_hi_q: e => `Para la hipérbola <b>${e}</b>, calcula c (la semidistancia focal) y la pendiente positiva de sus asíntotas.`,
  co_hi_f: ["c", "Pendiente de la asíntota"],
  co_hi_s: (a, b, c, m, vert) => `${vert ? "El término positivo es el de y²: el eje es vertical (no manda el denominador mayor, sino el signo). " : ""}En la hipérbola c² = a² + b²: c = √(${a * a} + ${b * b}) = <b>${c}</b>. Para las asíntotas, igualamos a 0 el primer miembro y despejamos y: y = ±${vert ? "(a/b)" : "(b/a)"}x, con pendiente positiva <b>${m}</b>.`,
  co_pa_q: e => `Calcula las coordenadas del foco de la parábola <b>${e}</b>.`,
  co_pa_f: ["Foco: x", "Foco: y"],
  co_pa_s: (eq, p, V, v, F, d, open, disp) => `Comparamos con ${v === "x" ? "y² = 2px" : "x² = 2py"}: ${eq}, así que p = ${p}. ${disp ? `El vértice está desplazado a ${V}; ` : "El vértice es el origen; "}el foco está a p/2 del vértice, hacia ${open === "derecha" || open === "izquierda" ? `la ${open}` : open}: <b>${F}</b>. La directriz es ${d}.`,
  co_tipo_q: e => `¿Qué cónica representa la ecuación <b>${e}</b>?`,
  co_tipos: ["Circunferencia", "Elipse", "Hipérbola", "Parábola"],
  co_tipo_g: "Para reconocer la cónica basta mirar los términos en x² e y² (los demás solo la trasladan). ",
  co_tipo_s: ["x² e y² con el mismo coeficiente y el mismo signo: <b>circunferencia</b>.", "x² e y² con coeficientes distintos pero del mismo signo: <b>elipse</b>.", "x² e y² con signos opuestos: <b>hipérbola</b>.", "Solo una de las variables está al cuadrado: <b>parábola</b>."],
});
})();
