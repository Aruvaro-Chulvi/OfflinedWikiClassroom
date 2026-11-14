/* WikiAula — textos de gen/mat11u5.js (Grado 11 · Unidad 5: Vectores), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  ve_f: ["Primera componente", "Segunda componente"],
  ve_comp_q: (A, B) => `Calcula las componentes del vector <b>AB</b>, con A${A} y B${B}.`,
  ve_comp_s: (r) => `Se restan las coordenadas: extremo menos origen, AB = B − A = ${r.replace(/= (\([^()]*\))$/, "= <b>$1</b>")}.`,
  ve_mod_q: v => `Calcula el módulo del vector <b>v = ${v}</b> (redondea a las centésimas si hace falta).`,
  ve_mod_s: (a, b, r) => `|v| = √(${a}² + ${b}²) = <b>${r}</b>.`,
  ve_comb_q: e => `Con u y v dados, calcula <b>${e}</b>.`,
  ve_comb_s: (mul, sum) => `${mul ? `Multiplicamos cada vector por su número: ${mul}. ` : ""}Sumamos componente a componente: ${sum}.`,
  ve_pm_q: (A, B) => `Calcula el punto medio del segmento de extremos A${A} y B${B}.`,
  ve_pm_s: (e, r) => `Se hace la media de las coordenadas: M = ${e} = <b>${r}</b>.`,
  ve_esc_q: (u, v) => `Calcula el producto escalar de <b>u = ${u}</b> y <b>v = ${v}</b>.`,
  ve_esc_s: (e, r) => `u · v = u₁v₁ + u₂v₂ = ${e} = <b>${r}</b>.`,
  ve_ang_q: (u, v) => `Calcula el ángulo que forman <b>u = ${u}</b> y <b>v = ${v}</b>, en grados (redondea a las centésimas).`,
  ve_ang_s: (dot, m1, m2, c, r, ex) => `cos α = (u · v)/(|u| · |v|) = ${dot}/(${m1} · ${m2}) ${ex ? "=" : "≈"} ${c} → α ${/,/.test(r) ? "≈" : "="} <b>${r}°</b>.`,
  ve_perp_q: (u, v) => `Calcula k para que <b>u = ${u}</b> y <b>v = ${v}</b> sean perpendiculares.`,
  ve_perp_s: (eq, r) => `Dos vectores son perpendiculares si su producto escalar es 0: ${eq} → <b>k = ${r}</b>.`,
  ve_par_q: (u, v) => `Calcula k para que <b>u = ${u}</b> y <b>v = ${v}</b> sean paralelos.`,
  ve_par_s: (eq, r) => `Dos vectores son paralelos si sus componentes son proporcionales: ${eq} → <b>k = ${r}</b>.`,
  ve_proy_q: (u, v) => `Calcula la proyección (con signo) de <b>u = ${u}</b> sobre <b>v = ${v}</b> (redondea a las centésimas).`,
  ve_proy_s: (dot, m, r, ex) => `proy = (u · v)/|v| = ${dot}/${m} ${ex ? "=" : "≈"} <b>${r}</b>.`,
  ve_hint: "Ejemplo: k = −3/2 → escribe −3/2",
  ve_pf: ["Abscisa (x)", "Ordenada (y)"],
  ve_un_q: v => `Calcula el vector unitario con la dirección y el sentido de <b>v = ${v}</b> (redondea a las centésimas).`,
  ve_un_s: (a, b, h, fr, r) => `Se divide el vector entre su módulo: |v| = √(${a}² + ${b}²) = ${h}, así que v/|v| = ${fr} = <b>${r}</b> (su módulo es 1).`,
  ve_tri_q: (A, B, two) => `Divide el segmento de extremos A${A} y B${B} en tres partes iguales. ¿Cuál es el punto de división más cercano a <b>${two ? "B" : "A"}</b>?`,
  ve_tri_s: (v, fr, part, sum) => `AB = ${v}. Los puntos de división se obtienen sumando a A un tercio y dos tercios de AB; el que buscamos es A + ${fr} · AB, con ${fr} · AB = ${part}: ${sum}.`,
  ve_angt_q: (A, B, C) => `Calcula el ángulo en el vértice A del triángulo de vértices A${A}, B${B} y C${C}, en grados (redondea a las centésimas).`,
  ve_angt_s: (u, v, dot) => `El ángulo en A lo forman los vectores que salen de A: AB = ${u} y AC = ${v}. AB · AC = ${dot}.`,
  ve_al_q: (A, B, C) => `¿Están alineados los puntos A${A}, B${B} y C${C}?`,
  ve_al_opts: ["Sí", "No"],
  ve_al_s: (u, w, det, ok) => `Están alineados si AB = ${u} y AC = ${w} son paralelos, es decir, si u₁v₂ − u₂v₁ = 0: ${det}. ${ok ? "<b>Sí</b> están alineados." : "No es 0: <b>no</b> están alineados."}`,
  ve_pv_q: (u, v) => `Calcula el vector proyección de <b>u = ${u}</b> sobre <b>v = ${v}</b> (redondea a las centésimas).`,
  ve_pv_s: (dot, m2, v, r) => `El vector proyección es (u · v / |v|²) · v. Aquí u · v = ${dot} y |v|² = ${m2}: (${dot}/${m2}) · ${v} = <b>${r}</b>.`,
  vb_t: {
    ctx: ["Un balón sale lanzado a {r} m/s", "Una fuerza de {r} N tira de un objeto", "Un barco navega a {r} km/h"],
    q0: (ctx, r, th) => `${ctx.replace("{r}", r)} en una dirección que forma ${th}° con el semieje X positivo. Calcula las componentes del vector (redondea a las centésimas).`,
    s0: (r, th, vx, vy, v) => `Un vector de módulo r que forma un ángulo θ con el semieje X positivo es (r cos θ, r sen θ): ${r} · cos ${th}° ${vx} y ${r} · sen ${th}° ${vy}. Vector: <b>${v}</b>.`,
    q1: v => `¿Qué ángulo forma el vector <b>v = ${v}</b> con el semieje X positivo? (en grados, entre 0° y 360°; redondea a las centésimas)`,
    s1: (b, a, calc, add, r) => `tg θ = v₂/v₁ = ${b}/${a}; la calculadora da ${calc}°. ${add ? `Por los signos de las componentes, el vector está en otro cuadrante: ${calc}° + ${add}° = ` : "Las dos componentes son positivas (primer cuadrante): "}<b>${r}°</b>.`,
    q2: (w, u, v) => `Los vectores u = ${u} y v = ${v} forman una base. Escribe <b>w = ${w}</b> como w = a · u + b · v.`,
    s2: (u, v, e1, e2, a, b) => `a · ${u} + b · ${v} = w. Igualando componente a componente queda un sistema: ${e1} y ${e2}. Resolviéndolo: <b>a = ${a}, b = ${b}</b>.`,
  },
});
})();
