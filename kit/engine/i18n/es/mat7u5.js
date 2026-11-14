/* WikiAula — textos de gen/mat7u5.js (Grado 7 · Unidad 5: Números decimales), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  dc_q: e => `Calcula: <b>${e}</b>`,
  dc_tipo_q: f => `Sin hacer la división, ¿qué tipo de número decimal es <b>${f}</b>?`,
  dc_tipos: ["Decimal exacto", "Periódico puro", "Periódico mixto"],
  dc_tipo_s: (f, fac, t) => `La fracción ${f} es irreducible y su denominador es ${fac}. ${t}`,
  dc_tipo_s2: (f, k, f1, fac, t) => `¡Cuidado! ${f} no es irreducible: primero se simplifica, dividiendo entre ${k}: ${f} = ${f1}. El denominador de la irreducible es ${fac}. ${t}`,
  dc_tipo_t: [
    "Solo tiene los factores 2 y 5: es un <b>decimal exacto</b>.",
    "No tiene ni 2 ni 5: es <b>periódico puro</b>.",
    "Tiene 2 o 5 y también otros factores: es <b>periódico mixto</b>.",
  ],
  dc_per_q: f => `Escribe el periodo de la expresión decimal de <b>${f}</b> (solo las cifras que se repiten).`,
  dc_per_s: (f, dec, p, n, d, rests, r, ante) => `Hago la división ${n} : ${d}. Los restos van saliendo así: ${rests.join(", ")}… y vuelve a salir el ${r}: al repetirse un resto, se repiten las cifras. ` +
    `${f} = ${dec}…${ante ? (ante.length > 1 ? ` Las cifras ${ante} van antes del periodo (anteperiodo).` : ` La cifra ${ante} va antes del periodo (anteperiodo).`) : ""} Las cifras que se repiten son <b>${p}</b>.` +
    (p[0] === "0" ? " El 0 forma parte del periodo: no es anteperiodo." : ""),
  // Cambios de unidad (m7.dec.unidades)
  met_fam: [
    { u: ["km", "hm", "dam", "m", "dm", "cm", "mm"], lo: 0, hi: 6 },
    { u: ["kg", "hg", "dag", "g", "dg", "cg", "mg"], lo: 0, hi: 6 },
    { u: ["kL", "hL", "daL", "L", "dL", "cL", "mL"], lo: 1, hi: 6 },
  ],
  met_q: (v, a, b) => `Pasa <b>${v} ${a}</b> a <b>${b}</b>. Escribe el número con coma decimal si hace falta.`,
  met_s: (v, a, b, path, steps, r) => { const n = Math.abs(steps), f = ["", "10", "100", "1000"][n], w = ["", "un lugar", "dos lugares", "tres lugares"][n];
    return `De ${a} a ${b} se ${steps > 0 ? "baja" : "sube"}${n > 1 ? "n" : ""} ${n} peldaño${n > 1 ? "s" : ""} (${(steps > 0 ? path : path.slice().reverse()).join(" → ")}): ` +
      `se ${steps > 0 ? "multiplica por" : "divide entre"} ${f} y la coma salta ${w} a la ${steps > 0 ? "derecha" : "izquierda"}${steps < 0 ? " (si faltan cifras, se añaden ceros)" : ""}. ${v} ${a} = <b>${r} ${b}</b>.`; },
  met_suma_q: (a, ua, b, ub, u) => `Suma ${a} ${ua} + ${b} ${ub}. Da el resultado en <b>${u}</b>.`,
  met_suma_s: (a, ua, b, ub, n, toSmall, aSmall, bBig, r) => `Primero pasamos las dos medidas a la misma unidad, ${toSmall ? ub : ua}. ` +
    (toSmall ? `${a} ${ua} = ${aSmall} ${ub} (se baja${n > 1 ? "n" : ""} ${n} peldaño${n > 1 ? "s" : ""}: la coma salta a la derecha). Total: ${aSmall} + ${b} = <b>${r} ${ub}</b>.`
      : `${b} ${ub} = ${bBig} ${ua} (se sube${n > 1 ? "n" : ""} ${n} peldaño${n > 1 ? "s" : ""}: la coma salta a la izquierda). Total: ${a} + ${bBig} = <b>${r} ${ua}</b>.`),
  dc_hint_digits: "Escribe solo las cifras. Ejemplo: 36",
  dc_sum_s: (e, r) => `Colocamos las comas una debajo de otra (completando con ceros) y operamos: ${e} = <b>${r}</b>.`,
  dc_mul_s: (a, b, ia, ib, p, k, r) => `Multiplicamos sin comas: ${ia} · ${ib} = ${p}. Entre los dos factores hay ${k} cifra${k === 1 ? "" : "s"} decimal${k === 1 ? "" : "es"}, así que el resultado tiene ${k}: <b>${r}</b>.`,
  dc_div_s: (a, b, m, a2, b2) => `El divisor tiene coma: multiplico los dos por ${m} para quitarla: ${a} · ${m} = ${a2} y ${b} · ${m} = ${b2}. Ahora divido ${a2} : ${b2}:`,
  dc_div_s1: "El dividendo tiene coma y el divisor no: divido como con naturales y pongo la coma en el cociente al bajar la primera cifra decimal.",
  dc_div_s2: "Ninguno tiene coma, pero la división no es exacta: cuando se acaban las cifras, pongo la coma en el cociente y añado un 0 al resto.",
  dc_ld_ent: (I, d, q, r) => `${I} : ${d} = ${q}, resto ${r}.`,
  dc_ld_cero: (I, d) => `${I} : ${d} no cabe: escribo 0 en el cociente (resto ${I}).`,
  dc_ld_paso: (primero, bajo, next, num, d, c, r) => `${primero ? "Pongo la coma en el cociente y " + (bajo ? `bajo el ${next} (la primera cifra decimal)` : "añado un 0 al resto") : bajo ? `Bajo el ${next}` : "Añado un 0 al resto"}: ${num} : ${d} = ${c}, resto ${r}.`,
  dc_ld_fin: q => `Resto 0: el cociente es <b>${q}</b>.`,
  dc_gen_den: (n9, n0, den) => n0 ? `tantos 9 como cifras tiene el periodo (${n9}) seguidos de tantos 0 como cifras del anteperiodo (${n0}): ${den}` : `tantos 9 como cifras tiene el periodo: ${den}`,
  dc_p10_dir: ["derecha", "izquierda"],
  dc_p10_s: (op, k, dir, r) => `${op === "mul" ? "Multiplicar por" : "Dividir entre"} un 1 seguido de ${k} cero${k === 1 ? "" : "s"} es mover la coma ${k} lugar${k === 1 ? "" : "es"} hacia la ${dir}: <b>${r}</b>.`,
  dc_red_q: (x, pos) => `Redondea <b>${x}</b> a las ${pos}.`,
  dc_trunc_q: (x, pos) => `Trunca <b>${x}</b> a las ${pos} (corta sin redondear).`,
  dc_pos: ["unidades", "décimas", "centésimas", "milésimas"],
  dc_red_s: (look, up, r) => `La cifra siguiente es ${look}: ${up ? "como es 5 o más, la anterior sube una unidad" : "como es menor que 5, la anterior se queda igual"}. Resultado: <b>${r}</b>.`,
  dc_trunc_s: r => `Truncar es cortar las cifras sobrantes, sin mirar las demás: <b>${r}</b>.`,
  dc_may_q: big => `¿Cuál de estos números es el ${big ? "mayor" : "menor"}?`,
  dc_may_s: (list, r) => `Igualamos el número de decimales y comparamos cifra a cifra: ${list}. Es <b>${r}</b>.`,
  dc_f2d_q: f => `Escribe <b>${f}</b> como número decimal.`,
  dc_f2d_s: (n, d, r) => `Dividimos el numerador entre el denominador: ${n} : ${d} = <b>${r}</b>.`,
  dc_d2f_q: x => `Escribe <b>${x}</b> como fracción irreducible.`,
  dc_d2f_s: (x, f0, r) => `Ponemos en el denominador un 1 seguido de tantos ceros como decimales: ${x} = ${f0 === r ? `<b>${r}</b> (ya es irreducible)` : `${f0} = <b>${r}</b>`}.`,
  dc_gen_q: x => `Calcula la fracción generatriz de <b>${x}</b> y simplifícala.`,
  dc_gen_s: (num, den, f0, r) => `Numerador: el número sin coma menos la parte que no se repite, ${num}. Denominador: ${den}. Fracción: ${f0 === r ? `<b>${r}</b>` : `${f0} = <b>${r}</b>`}.`,
  dc_prob: [
    { q: (n, p, u) => `Compras ${n} ${u} a ${p} € la unidad. ¿Cuánto pagas, en euros?`, k: "mul",
      s: (n, p, r) => `Multiplicamos: ${n} · ${p} = <b>${r}</b> €.` },
    { q: (a, b) => `Pagas una compra de ${a} € con un billete de ${b} €. ¿Cuánto te devuelven, en euros?`, k: "sub",
      s: (a, b, r) => `Restamos: ${b} − ${a} = <b>${r}</b> €.` },
    { q: (t, n) => `Una cinta de ${t} m se corta en ${n} trozos iguales. ¿Cuánto mide cada trozo, en metros?`, k: "div",
      s: (t, n, r) => `Dividimos: ${t} : ${n} = <b>${r}</b> m.` },
  ],
  dc_units: ["cuadernos", "bolígrafos", "entradas", "helados"],
});
})();
