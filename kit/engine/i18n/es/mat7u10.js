/* WikiAula — textos de gen/mat7u10.js (Grado 7 · Unidad 10: Perímetros y áreas), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  ar_per_q: f => `Calcula el perímetro de ${f} (en cm).`,
  ar_area_q: f => `Calcula el área de ${f} (en cm²).`,
  ar_fig: { rect: "este rectángulo", cuad: "este cuadrado", tri: "este triángulo", para: "este paralelogramo", rombo: "este rombo", trap: "este trapecio", hex: "este hexágono regular", pent: "este pentágono regular", comp: "esta figura" },
  ar_per_s: (sum, r) => `El perímetro es la suma de todos los lados: ${sum} = <b>${r}</b> cm.`,
  ar_rect_s: (b, h, r) => `Área del rectángulo = base · altura = ${b} · ${h} = <b>${r}</b> cm².`,
  ar_cuad_s: (l, r) => `Área del cuadrado = lado² = ${l}² = <b>${r}</b> cm².`,
  ar_tri_s: (b, h, r) => `Área del triángulo = base · altura : 2 = ${b} · ${h} : 2 = <b>${r}</b> cm².`,
  ar_para_s: (b, h, r) => `Área del paralelogramo = base · altura = ${b} · ${h} = <b>${r}</b> cm². (¡La altura, no el lado inclinado!)`,
  ar_rombo_s: (D, d, r) => `Área del rombo = diagonal mayor · diagonal menor : 2 = ${D} · ${d} : 2 = <b>${r}</b> cm².`,
  ar_trap_s: (B, b, h, r) => `Área del trapecio = (base mayor + base menor) · altura : 2 = (${B} + ${b}) · ${h} : 2 = <b>${r}</b> cm².`,
  ar_reg_s: (n, l, a, p, r) => `Perímetro = ${n} · ${l} = ${p}. Área del polígono regular = perímetro · apotema : 2 = ${p} · ${a} : 2 = <b>${r}</b> cm².`,
  // Figura en L: rectángulo de la izquierda (ancho de arriba × alto total) y de la derecha (el ancho sale de restar)
  ar_comp_s: (W, Hh, top, right, w, h, A1, A2, r) => `Partimos la figura en dos rectángulos con una línea vertical.<br>`
    + `Izquierda: ${top} cm de ancho y ${Hh} cm de alto: ${top} · ${Hh} = ${A1} cm².<br>`
    + `Derecha: ${right} cm de alto; su ancho no viene en el dibujo y sale de restar: ${W} − ${top} = ${w} cm. Área: ${w} · ${right} = ${A2} cm².<br>`
    + `Total: ${A1} + ${A2} = <b>${r}</b> cm². (Comprobación: ${W} · ${Hh} − ${w} · ${h} = ${W * Hh} − ${w * h} = ${r} ✓)`,
  ar_lado_q: (A) => `Un cuadrado tiene un área de ${A} cm². ¿Cuánto mide su lado, en cm?`,
  ar_lado_s: (A, l) => `El lado es la raíz cuadrada del área: √${A} = <b>${l}</b> cm, porque ${l} · ${l} = ${A}.`,
  ar_lado_t: (A, l, d) => `El lado es la raíz cuadrada del área, √${A}. Tanteamos con las decenas: `
    + (l === d ? `${d}² = ${A} ✓.` : `${d}² = ${d * d} se queda corto y ${d + 10}² = ${(d + 10) * (d + 10)} se pasa, así que el lado está entre ${d} y ${d + 10}. Probando: ${l} · ${l} = ${A} ✓.`)
    + ` El lado mide <b>${l}</b> cm.`,
  ar_alt_q: (A, b) => `Un triángulo tiene ${A} cm² de área y ${b} cm de base. ¿Cuánto mide su altura, en cm?`,
  ar_alt_s: (A, b, r) => `Área = b · h : 2 → h = 2 · área : base = 2 · ${A} : ${b} = <b>${r}</b> cm.`,
  ci_hint: "Usa π ≈ 3,14 o la tecla π. Redondea a las centésimas.",
  ci_long_q: (v, isD) => `Calcula la longitud de una circunferencia de ${v} cm de ${isD ? "diámetro" : "radio"} (en cm).`,
  ci_ans: (a314, api) => `${a314} (con π ≈ 3,14) · ${api} (con la tecla π)`,
  ci_long_s: (v, isD, res, r314) => (isD ? `Con el diámetro: L = π · d. Con π ≈ 3,14: L = 3,14 · ${v} = <b>${r314}</b> cm.` : `Con el radio: L = 2 · π · r. Con π ≈ 3,14: L = 2 · 3,14 · ${v} = <b>${r314}</b> cm.`)
    + ` (Con la tecla π de la calculadora sale ${res} cm; las dos respuestas valen.)`,
  ci_area_q: (v, isD) => `Calcula el área de un círculo de ${v} cm de ${isD ? "diámetro" : "radio"} (en cm²).`,
  ci_area_s: (r, res, r314) => `A = π · r². Con π ≈ 3,14: A = 3,14 · ${r}² = <b>${r314}</b> cm². (Con la tecla π de la calculadora sale ${res} cm²; las dos respuestas valen.)`,
  ci_rdesde_q: L => `Una circunferencia mide ${L} cm de longitud. ¿Cuánto mide su radio (en cm)?`,
  ci_rdesde_s: (L, r) => `L = 2 · π · r, así que el radio es la longitud entre 2 · π. Con π ≈ 3,14: 2 · 3,14 = 6,28, y r = ${L} : 6,28 = <b>${r}</b> cm. Comprobación: 6,28 · ${r} = ${L} ✓`,
  ci_corona_q: (R, r) => `Calcula el área de una corona circular de radios ${R} cm y ${r} cm (en cm²).`,
  ci_corona_s: (R, r, g, p, c, res) => `La corona es el círculo grande menos el pequeño. Con π ≈ 3,14: círculo grande, 3,14 · ${R}² = 3,14 · ${R * R} = ${g} cm²; círculo pequeño, 3,14 · ${r}² = 3,14 · ${r * r} = ${p} cm². Corona: ${g} − ${p} = <b>${c}</b> cm². (Con la tecla π sale ${res}; las dos valen.)`,
  ci_sector_q: (r, a) => `Calcula el área de un sector circular de ${r} cm de radio y ${a}° de amplitud (en cm²).`,
  ci_sector_s: (r, a, C0, p, q, s, aprox, res) => `Círculo entero, con π ≈ 3,14: 3,14 · ${r}² = 3,14 · ${r * r} = ${C0} cm². `
    + `El sector es ${a}/360 del círculo, que simplificado es ${p === 1 ? `1/${q}` : `${p}/${q}`}: `
    + (p === 1 ? `${C0} : ${q}` : `${C0} · ${p} : ${q}`) + ` ${aprox ? "≈" : "="} <b>${s}</b> cm². (Con la tecla π sale ${res}; las dos valen.)`,
  // Unidades agrarias: 1 ha = 1 hm² = 10 000 m²; 1 a = 1 dam² = 100 m²; 1 ha = 100 a
  un_agr_s: (a, b, k, mult, v, r) => ({ "ha|m²": "1 ha = 1 hm² = 10 000 m²", "a|m²": "1 a = 1 dam² = 100 m²", "ha|a": "1 ha = 100 a", "m²|ha": "1 ha = 1 hm² = 10 000 m²" })[a + "|" + b]
    + `. ` + (mult ? `Se multiplica: ${v} · ${k}` : `Se divide: ${v} : ${k}`) + ` = <b>${r} ${b}</b>.`,
  un_q: (v, a, b) => `Expresa <b>${v} ${a}</b> en ${b}.`,
  // Escalera de unidades: cada peldaño, por 100 o entre 100 (la coma salta dos lugares)
  un_s: (a, b, p, baja, k, v, r) => `De ${a} a ${b} se ${baja ? "baja" : "sube"}${p === 1 ? " 1 peldaño" : `n ${p} peldaños`}: `
    + (baja ? `se multiplica por ${p === 1 ? "100" : "100 · 100 = " + k}, y la coma salta ${2 * p} lugares a la derecha` : `se divide entre ${p === 1 ? "100" : "100 · 100 = " + k}, y la coma salta ${2 * p} lugares a la izquierda`)
    + `: ${v} → <b>${r} ${b}</b>.`,
});
})();
