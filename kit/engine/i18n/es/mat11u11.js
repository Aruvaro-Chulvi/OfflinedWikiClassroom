/* WikiAula — textos de gen/mat11u11.js (Grado 11 · Unidad 11: Aplicaciones de la derivada), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  ap_ex_q: f => `Halla los extremos relativos de <b>f(x) = ${f}</b>: escribe la abscisa del máximo y la del mínimo.`,
  ap_ex_f: ["Máximo en x =", "Mínimo en x ="],
  ap_ex_s: (d, fac, p, q, tv, mx, fmx, mn, fmn) => `f′(x) = ${d} = ${fac}, que se anula en x = ${p} y x = ${q}. Probamos un valor en cada tramo: ${tv}. En x = ${mx}, f′ pasa de + a −: <b>máximo en x = ${mx}</b>, de valor f(${mx}) = ${fmx}; en x = ${mn} pasa de − a +: <b>mínimo en x = ${mn}</b>, de valor f(${mn}) = ${fmn}.`,
  ap_pa_q: (f, P) => `Halla a y b para que <b>f(x) = ${f}</b> tenga un extremo relativo en el punto ${P}.`,
  ap_pa_s: (p, y, d, e1, P, e2, d2, v2, max) => `Extremo en x = ${p}: f′(${p}) = 0. Como f′(x) = ${d}, queda ${e1}. Pasa por ${P}: f(${p}) = ${y}, es decir, ${e2}. Comprobación con la segunda derivada: f″(x) = ${d2}, así que f″(${p}) = ${v2} ${max ? "&lt;" : "&gt;"} 0: es un <b>${max ? "máximo" : "mínimo"}</b>.`,
  ap_cr_q: f => `¿Cuáles son los intervalos de crecimiento y decrecimiento de <b>f(x) = ${f}</b>?`,
  ap_cr_o: (c, d) => `Crece en ${c} y decrece en ${d}`,
  ap_cr_s: (d, p, q, tv, inc, dec) => `f′(x) = ${d} se anula en x = ${p} y x = ${q}, que parten la recta en tres tramos. Probamos un valor en cada uno: ${tv}. <b>Crece en ${inc} y decrece en ${dec}</b>.`,
  ap_in_q: f => `Halla el punto de inflexión de <b>f(x) = ${f}</b>.`,
  ap_in_s: (d2, k, y) => `f″(x) = ${d2}, que se anula y cambia de signo en x = ${k}. Punto de inflexión: <b>(${k}, ${y})</b>.`,
  ap_cv_q: f => `¿Cómo es la curvatura de <b>f(x) = ${f}</b>? (∪: cóncava hacia arriba; ∩: cóncava hacia abajo.)`,
  ap_cv_o: k => [`∩ en (−∞, ${k}) y ∪ en (${k}, +∞)`, `∪ en (−∞, ${k}) y ∩ en (${k}, +∞)`, "∪ en todo ℝ", "∩ en todo ℝ"],
  ap_cv_s: (d2, k, up) => `f″(x) = ${d2} se anula en x = ${k}. ` + (up
    ? `A la izquierda f″ &lt; 0 (∩) y a la derecha f″ &gt; 0 (∪): <b>∩ en (−∞, ${k}) y ∪ en (${k}, +∞)</b>.`
    : `A la izquierda f″ &gt; 0 (∪) y a la derecha f″ &lt; 0 (∩): <b>∪ en (−∞, ${k}) y ∩ en (${k}, +∞)</b>.`),
  ap_cv4_s: (d2, up) => `f″(x) = ${d2}: como x² ≥ 0, f″ tiene siempre el mismo signo (se anula en 0 pero no cambia de signo, así que no hay punto de inflexión). ` +
    (up ? "<b>∪ en todo ℝ</b>." : "<b>∩ en todo ℝ</b>."),
  ap_le_q: (c, x) => `De una función derivable f se sabe que ${c}. ¿Qué tiene f en x = ${x}?`,
  ap_le_c: [
    c => `f′(${c}) = 0 y f″(${c}) &lt; 0`,
    c => `f′(${c}) = 0 y f″(${c}) &gt; 0`,
    c => `f′(x) &gt; 0 si x &lt; ${c} y f′(x) &lt; 0 si x &gt; ${c}`,
    c => `f′(x) &lt; 0 si x &lt; ${c} y f′(x) &gt; 0 si x &gt; ${c}`,
    c => `f″(x) &lt; 0 si x &lt; ${c} y f″(x) &gt; 0 si x &gt; ${c}`,
    c => `f″(x) &gt; 0 si x &lt; ${c} y f″(x) &lt; 0 si x &gt; ${c}`,
  ],
  ap_le_o: ["Un máximo relativo", "Un mínimo relativo", "Un punto de inflexión"],
  ap_le_s: [
    "Tangente horizontal y curvatura ∩ (f″ &lt; 0): <b>máximo relativo</b>.",
    "Tangente horizontal y curvatura ∪ (f″ &gt; 0): <b>mínimo relativo</b>.",
    "La función pasa de crecer a decrecer: <b>máximo relativo</b>.",
    "La función pasa de decrecer a crecer: <b>mínimo relativo</b>.",
    "La curvatura cambia de ∩ a ∪: <b>punto de inflexión</b>.",
    "La curvatura cambia de ∪ a ∩: <b>punto de inflexión</b>.",
  ],
  ap_op_q: [
    s => `Dos números positivos suman ${s}. ¿Qué valor debe tener cada uno para que su producto sea el mayor posible?`,
    p => `Con ${p} m de valla se quiere cercar un terreno rectangular. ¿Cuál es el área máxima (en m²) que se puede cercar?`,
    l => `Se quiere cercar un terreno rectangular junto a un río con ${l} m de valla (el lado del río no se valla). ¿Cuánto deben medir los lados perpendiculares al río para que el área sea máxima (en m)?`,
    a => `De una chapa cuadrada de ${a} cm de lado se cortan cuatro cuadrados iguales en las esquinas y se doblan los bordes para hacer una caja sin tapa. ¿Cuánto debe medir el lado de los cuadrados cortados (en cm) para que el volumen sea máximo?`,
    p => `El producto de dos números positivos es ${p}. ¿Cuál es el menor valor posible de su suma?`,
    b => `El beneficio de una empresa al fabricar x unidades es B(x) = ${b} euros. ¿Cuántas unidades debe fabricar para que el beneficio sea máximo?`,
  ],
  ap_op_s: [
    (s, x) => `Si los números son x y ${s} − x, el producto es P(x) = x(${s} − x) = ${s}x − x². P′(x) = ${s} − 2x = 0 → x = ${x}. Como P″ = −2 &lt; 0, es un máximo: los dos números valen <b>${x}</b>.`,
    (p, l, a) => `Lados x y ${p / 2} − x: A(x) = x(${p / 2} − x). A′(x) = ${p / 2} − 2x = 0 → x = ${l}. Es un cuadrado de lado ${l} m y área <b>${a} m²</b>.`,
    (l, x, y, a) => `Lados perpendiculares x, lado paralelo ${l} − 2x: A(x) = x(${l} − 2x) = ${l}x − 2x². A′(x) = ${l} − 4x = 0 → x = <b>${x} m</b> (el otro lado mide ${y} m y el área es ${a} m²).`,
    (a, x, v) => `Si se cortan cuadrados de lado x, la caja mide (${a} − 2x) × (${a} − 2x) × x: V(x) = x(${a} − 2x)². V′(x) = (${a} − 2x)(${a} − 6x) = 0 → x = ${x} (la otra solución da volumen 0). Lado de los cuadrados: <b>${x} cm</b> (volumen ${v} cm³).`,
    (p, r, s) => `Si los números son x y ${p}/x, la suma es S(x) = x + ${p}/x. S′(x) = 1 − ${p}/x² = 0 → x = ${r}. Los dos números valen ${r} y la suma mínima es <b>${s}</b>.`,
    (d, x, b) => `B′(x) = ${d} = 0 → x = ${x}. Como B″ &lt; 0, es un máximo: <b>${x} unidades</b> (beneficio de ${b} euros).`,
  ],
});
})();
