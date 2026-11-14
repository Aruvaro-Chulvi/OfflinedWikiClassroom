/* WikiAula — textos de gen/mat7u9.js (Grado 7 · Unidad 9: Polígonos y triángulos), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  po_names: { 3: "triángulo", 4: "cuadrilátero", 5: "pentágono", 6: "hexágono", 7: "heptágono", 8: "octógono", 9: "eneágono", 10: "decágono", 11: "endecágono", 12: "dodecágono" },
  po_diag_q: (n, name) => `¿Cuántas diagonales tiene un ${name} (${n} lados)?`,
  po_diag_s: (n, r) => `Desde cada vértice salen n − 3 diagonales, y cada una se cuenta dos veces: ${n} · (${n} − 3) : 2 = <b>${r}</b>.`,
  po_lados_q: name => `¿Cuántos lados tiene un <b>${name}</b>?`,
  po_lados_s: (name, n) => `Un ${name} tiene <b>${n}</b> lados (y ${n} vértices y ${n} ángulos).`,
  tr_lados_q: (a, b, c) => `Un triángulo tiene lados de ${a} cm, ${b} cm y ${c} cm. ¿Cómo se clasifica según sus lados?`,
  tr_lados: ["Equilátero", "Isósceles", "Escaleno"],
  tr_lados_s: ["Tiene los tres lados iguales: <b>equilátero</b>.", "Tiene dos lados iguales: <b>isósceles</b>.", "Tiene los tres lados distintos: <b>escaleno</b>."],
  tr_ang_q: (a, b, c) => `Un triángulo tiene ángulos de ${a}°, ${b}° y ${c}°. ¿Cómo se clasifica según sus ángulos?`,
  tr_ang: ["Acutángulo", "Rectángulo", "Obtusángulo"],
  tr_ang_s: ["Los tres ángulos son agudos: <b>acutángulo</b>.", "Tiene un ángulo recto (90°): <b>rectángulo</b>.", "Tiene un ángulo obtuso (más de 90°): <b>obtusángulo</b>."],
  tr_des_q: (a, b, c) => `¿Se puede construir un triángulo con segmentos de ${a} cm, ${b} cm y ${c} cm?`,
  tr_des_s: (big, sum, ok) => `Cada lado tiene que ser menor que la suma de los otros dos. El mayor mide ${big} y los otros suman ${sum}: ${ok ? "<b>sí</b> se puede." : "<b>no</b> se puede (no se cerraría)."}`,
  tr_not: [
    ["¿Qué punto es el centro de la circunferencia que pasa por los tres vértices de un triángulo?", 0],
    ["¿En qué punto se cortan las tres mediatrices de un triángulo?", 0],
    ["¿Qué punto es el centro de la circunferencia inscrita (que toca los tres lados)?", 1],
    ["¿En qué punto se cortan las tres bisectrices de un triángulo?", 1],
    ["¿En qué punto se cortan las tres medianas de un triángulo?", 2],
    ["¿Qué punto es el centro de gravedad (de equilibrio) de un triángulo?", 2],
    ["¿En qué punto se cortan las tres alturas de un triángulo?", 3],
  ],
  tr_not_opts: ["Circuncentro", "Incentro", "Baricentro", "Ortocentro"],
  tr_not2: {
    // situaciones de la lección: 0 circuncentro, 1 incentro, 2 baricentro
    sit_q: [
      R => `Se quiere colocar ${R.pick(["un pozo", "una antena", "un depósito de agua", "una farola", "un centro de salud"])} a la misma distancia de tres ${R.pick(["pueblos", "casas", "bancos de un parque", "colegios"])} que no están en línea recta. ¿Qué punto del triángulo que forman hay que buscar?`,
      R => `Se quiere poner ${R.pick(["una fuente redonda", "un aspersor que riegue un círculo", "una mesa redonda", "un macizo de flores redondo"])}, lo más grande posible, que toque los tres lados de ${R.pick(["un jardín", "una plaza", "un patio", "una parcela"])} con forma de triángulo. ¿Dónde va su centro?`,
      R => `¿En qué punto hay que ${R.pick(["clavar el palillo de una peonza", "apoyar con la punta de un lápiz una placa", "colgar de un hilo una señal"])} con forma de triángulo para que quede en equilibrio?`,
    ],
    sit_s: [
      "Un punto a la misma distancia de tres puntos (los vértices) está en las tres mediatrices: es el <b>circuncentro</b>. Basta con trazar dos mediatrices y buscar su corte.",
      "Lo más grande que toca los tres lados es la circunferencia inscrita, y su centro está a la misma distancia de los tres lados: en las bisectrices. Es el <b>incentro</b>.",
      "El punto de equilibrio de un triángulo es su centro de gravedad, donde se cortan las medianas: el <b>baricentro</b>.",
    ],
    rectas: ["Las mediatrices", "Las bisectrices", "Las medianas", "Las alturas"],
    rectas_q: p => `¿Qué rectas del triángulo hay que trazar para encontrar el <b>${p.toLowerCase()}</b>?`,
    tipos: ["acutángulo", "rectángulo", "obtusángulo"],
    donde: ["Dentro del triángulo", "Justo en un lado o en un vértice", "Fuera del triángulo"],
    donde_q: (t, p) => `En un triángulo <b>${t}</b>, ¿dónde está el <b>${p}</b>?`,
    donde_s: (t, p) => p === 1 || p === 2
      ? `El ${p === 1 ? "incentro" : "baricentro"} está <b>siempre dentro</b> del triángulo, sea como sea.`
      : t === 0 ? `En un triángulo acutángulo, los cuatro puntos notables están <b>dentro</b>.`
      : t === 1 ? (p === 0 ? "En un triángulo rectángulo, el circuncentro está <b>justo en un lado</b>: en el punto medio de la hipotenusa." : "En un triángulo rectángulo, los dos catetos son alturas, y se cortan en el vértice del ángulo recto: el ortocentro está <b>en un vértice</b>.")
      : (p === 0 ? "En un triángulo obtusángulo, el circuncentro queda <b>fuera</b>, al otro lado del lado más largo." : "En un triángulo obtusángulo, dos alturas caen sobre la prolongación de los lados y se cortan <b>fuera</b> del triángulo."),
    hip_q: h => `La hipotenusa de un triángulo rectángulo mide ${h} cm. ¿Cuántos cm mide el radio de su circunferencia circunscrita?`,
    hip_s: (h, r) => `En un triángulo rectángulo, el circuncentro está en el punto medio de la hipotenusa, y la circunferencia pasa por sus dos extremos: el radio es la mitad de la hipotenusa. ${h} : 2 = <b>${r}</b> cm.`,
    bar_q: m => `Una mediana de un triángulo mide ${m} cm. ¿Cuántos cm hay desde el vértice hasta el baricentro?`,
    bar_s: (m, p, r) => `El baricentro parte la mediana en dos trozos, y el que va hasta el vértice mide el doble que el otro: la mediana tiene 3 partes iguales, ${m} : 3 = ${p} cm cada una. Del vértice al baricentro hay 2 partes: 2 · ${p} = <b>${r}</b> cm.`,
  },
  tr_not_s: [
    "Las mediatrices se cortan en el <b>circuncentro</b>, que está a la misma distancia de los tres vértices.",
    "Las bisectrices se cortan en el <b>incentro</b>, que está a la misma distancia de los tres lados.",
    "Las medianas se cortan en el <b>baricentro</b>, el centro de gravedad del triángulo.",
    "Las alturas se cortan en el <b>ortocentro</b>, que queda fuera del triángulo si es obtusángulo.",
  ],
  // [propiedades, nombres que le corresponden (índices de cu_opts), razonamiento con el criterio de la lección]
  cu_props: [
    ["Tiene los cuatro lados iguales y los cuatro ángulos rectos.", [0, 1, 2], "Dos pares de lados paralelos → paralelogramo. Cuatro ángulos rectos → es un rectángulo. Cuatro lados iguales → es un rombo. Las dos cosas a la vez → es un cuadrado"],
    ["Tiene los lados opuestos iguales y paralelos, y los cuatro ángulos rectos, pero no todos los lados iguales.", [1], "Dos pares de lados paralelos → paralelogramo. Cuatro ángulos rectos → rectángulo. Como no tiene los cuatro lados iguales, no es un cuadrado ni un rombo"],
    ["Tiene los cuatro lados iguales, pero sus ángulos no son rectos.", [2], "Cuatro lados iguales → rombo. Como no tiene ángulos rectos, no es un cuadrado ni un rectángulo"],
    ["Tiene los lados opuestos paralelos e iguales, pero ni los ángulos son rectos ni los cuatro lados iguales.", [3], "Dos pares de lados paralelos → paralelogramo. Sin ángulos rectos ni los cuatro lados iguales → romboide"],
    ["Solo tiene un par de lados paralelos.", [4], "Un solo par de lados paralelos → trapecio"],
    ["No tiene ningún par de lados paralelos.", [5], "Ningún par de lados paralelos → trapezoide"],
  ],
  cu_q: p => `¿Qué nombres le corresponden a este cuadrilátero? Marca todos los que valgan.<br><i>${p}</i>`,
  cu_opts: ["Cuadrado", "Rectángulo", "Rombo", "Romboide", "Trapecio", "Trapezoide"],
  cu_s: (why, names) => `${why}. ${names.length > 1 ? `Le corresponden <b>${names.slice(0, -1).join("</b>, <b>")}</b> y <b>${names[names.length - 1]}</b> (el nombre más preciso es «${names[0]}»).` : `Es un <b>${names[0]}</b>.`}`,
  cu_ang_q: a => `Un ángulo de un paralelogramo mide <b>${a}°</b>. ¿Cuánto mide el ángulo contiguo (el de al lado), en grados?`,
  cu_ang_s: (a, r) => `En un paralelogramo, los ángulos contiguos son suplementarios: 180° − ${a}° = <b>${r}°</b> (y los opuestos son iguales).`,
  ci_rd_q: (r, toD) => toD ? `Una circunferencia tiene ${r} cm de radio. ¿Cuánto mide su diámetro, en cm?` : `Una circunferencia tiene ${r} cm de diámetro. ¿Cuánto mide su radio, en cm?`,
  ci_rd_s: (v, r, toD) => toD ? `El diámetro es el doble del radio: 2 · ${v} = <b>${r}</b> cm.` : `El radio es la mitad del diámetro: ${v} : 2 = <b>${r}</b> cm.`,
  ci_pos_q: (r, d) => `Una circunferencia tiene ${r} cm de radio. Un punto está a ${d} cm del centro. ¿Dónde está el punto?`,
  ci_pos: ["Dentro del círculo", "En la circunferencia", "Fuera del círculo"],
  ci_pos_s: (r, d, k) => `Comparamos la distancia al centro (${d}) con el radio (${r}): ${["es menor, así que está <b>dentro</b>", "es igual, así que está <b>en la circunferencia</b>", "es mayor, así que está <b>fuera</b>"][k]}.`,
  ci_rec_q: (r, d) => `Una recta está a ${d} cm del centro de una circunferencia de ${r} cm de radio. ¿Qué posición tienen?`,
  ci_rec: ["Secante (la corta en dos puntos)", "Tangente (la toca en un punto)", "Exterior (no la toca)"],
  ci_rec_s: (r, d, k) => `Si la distancia es menor que el radio, son secantes; si es igual, tangentes; si es mayor, exteriores. Aquí: <b>${["secante", "tangente", "exterior"][k]}</b>.`,
});
})();
