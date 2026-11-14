/* WikiAula — textos de gen/mat11u2.js (Grado 11 · Unidad 2: Números complejos), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  cx_q: e => `Calcula y escribe el resultado en forma binómica a + bi: <b>${e}</b>`,
  cx_f: ["Parte real (a)", "Parte imaginaria (b)"],
  cx_pot_q: n => `¿Cuánto vale <b>i<sup>${n}</sup></b>?`,
  cx_pot_s: (n, r, v) => `Las potencias de i se repiten cada 4 (i, −1, −i, 1). Dividimos ${n} entre 4: resto ${r}, así que i<sup>${n}</sup> = i<sup>${r}</sup> = <b>${v}</b>.`,
  cx_ec_q: e => `Resuelve la ecuación <b>${e}</b>. Escribe la solución con parte imaginaria positiva.`,
  cx_ec_s: (D, sq, fr, pm, sol, conj) => `Con la fórmula de segundo grado: el discriminante es ${D} &lt; 0 y √(${D}) = ${sq}. Así, x = ${fr} = ${pm}. Son complejas conjugadas; la de parte imaginaria positiva es <b>x = ${sol}</b> (la otra, ${conj}).`,
  cx_ec3_s: (r, fac, c2, ci) => `Buscamos una raíz entre los divisores del término independiente (Ruffini): x = ${r} es raíz, y la ecuación queda (${fac})(x² + ${c2}) = 0. El segundo factor da x² = −${c2}, es decir, x = ±√(−${c2}) = ±${ci}. Soluciones: ${r}, ${ci} y −${ci}; la de parte imaginaria positiva es <b>${ci}</b>.`,
  cxp_t: {
    q: (e, real) => `¿Para qué valor de k es ${real ? "un número <b>real</b>" : "un <b>imaginario puro</b>"} el complejo <b>${e}</b>?`,
    sp: (re, im, real, cond, k) => `Multiplicamos como binomios (con i² = −1) hasta dejarlo como a + bi: parte real ${re}, parte imaginaria ${im}. Es ${real ? "real si su parte imaginaria vale 0" : "imaginario puro si su parte real vale 0"}: ${cond} = 0 → <b>k = ${k}</b>.`,
    sd: (conj, den, re, im, real, cond, k) => `Multiplicamos arriba y abajo por el conjugado del denominador, ${conj}: abajo queda ${den} (un número real) y arriba, parte real ${re} y parte imaginaria ${im}. Es ${real ? "real si su parte imaginaria vale 0" : "imaginario puro si su parte real vale 0"}: ${cond} = 0 → <b>k = ${k}</b>.`,
  },
  cx_sum_s: (e, r) => `Se suman (o restan) las partes reales entre sí y las imaginarias entre sí: ${e} = <b>${r}</b>.`,
  cx_mul_s: (e, e2, r) => `Multiplicamos como binomios: ${e}. Como i² = −1, el último término cambia de signo: ${e2} = <b>${r}</b>.`,
  cx_div_s: (conj, num, den, sp, r) => `Multiplicamos numerador y denominador por el conjugado del denominador, ${conj}. Numerador: ${num} (con i² = −1). Denominador: ${den}. Dividimos cada parte entre ${den.split(" = ").pop()}: ${sp} = <b>${r}</b>.`,
  cx_mod_q: z => `Calcula el módulo de <b>z = ${z}</b>.`,
  cx_mod_s: (a, b, r) => `|z| = √(a² + b²) = √(${a}² + ${b}²) = <b>${r}</b>.`,
  cx_arg_q: z => `Calcula el argumento (en grados, entre 0° y 360°) de <b>z = ${z}</b>.`,
  cx_arg_s: (q, r, ref) => `Representamos z: está en ${q}.${ref ? " Como las dos partes miden lo mismo, forma 45° con el eje real." : ""} Su argumento es <b>${r}°</b>.`,
  cx_arg_dec: " Redondea a las décimas.",
  cx_arg_calc: (b, a, calc, q, add, r) => `tg α = ${b}/${a}; la calculadora da arctg(${b}/${a}) ≈ ${calc}°. El afijo está en ${q}: ${add ? `${calc}° + ${add}° ≈ ` : "no hay que corregir, "}<b>${r}°</b>.`,
  cx_arg_s3: (t, ref, q, f, r) => `|tg α| = |b/a| = ${t}, así que el ángulo con el eje real es ${ref}°. El afijo está en ${q}: α = ${f}<b>${r}°</b>.`,
  cx_quad: ["el primer cuadrante", "el segundo cuadrante", "el tercer cuadrante", "el cuarto cuadrante", "el semieje real positivo", "el semieje imaginario positivo", "el semieje real negativo", "el semieje imaginario negativo"],
  cx_pb_q: z => `Escribe en forma binómica el complejo <b>${z}</b> (redondea a las centésimas).`,
  cx_pb_s: (r, t, a, b, ea, eb) => `a = r · cos α = ${r} · cos ${t}° ${ea ? "=" : "≈"} ${a}; b = r · sen α = ${r} · sen ${t}° ${eb ? "=" : "≈"} ${b}.`,
  cx_pp_q: e => `Calcula y da el resultado en forma polar: <b>${e}</b>`,
  cx_pp_f: ["Módulo", "Argumento (°)"],
  cx_pp_prod_s: (r1, r2, a1, a2, r, a, raw) => `En forma polar se multiplican los módulos (${r1} · ${r2} = ${r}) y se suman los argumentos (${a1}° + ${a2}° = ${raw}°${raw !== a ? `, que equivale a ${raw}° − 360° = ${a}°` : ""}): <b>${r}<sub>${a}°</sub></b>.`,
  cx_pp_coc_s: (r1, r2, a1, a2, r, a, raw) => `Se dividen los módulos (${r1} : ${r2} = ${r}) y se restan los argumentos (${a1}° − ${a2}° = ${raw < 0 ? "−" + -raw : raw}°${raw !== a ? `, que equivale a −${-raw}° + 360° = ${a}°` : ""}): <b>${r}<sub>${a}°</sub></b>.`,
  cx_pp_pot_s: (r1, a1, n, r, a, raw) => `Fórmula de De Moivre: se eleva el módulo (${r1}<sup>${n}</sup> = ${r}) y se multiplica el argumento (${n} · ${a1}° = ${raw}°${raw !== a ? `, que equivale a ${a}°` : ""}): <b>${r}<sub>${a}°</sub></b>.`,
  cx_raiz_q: (n, z) => `Calcula las raíces ${n === 2 ? "cuadradas" : n === 3 ? "cúbicas" : "cuartas"} de <b>${z}</b>. Escribe el módulo de las raíces y el argumento de la primera (la de menor argumento) y de la última.`,
  cx_raiz_f: ["Módulo", "Argumento de la primera (°)", "Argumento de la última (°)"],
  cx_raiz_pol: (z, r, a) => `Primero lo pasamos a forma polar: ${z} = ${r}<sub>${a}°</sub>. `,
  cx_raiz_s: (n, r, a, mod, a1, step, last) => `Hay ${n} raíces de módulo ${n === 2 ? "√" : n === 3 ? "∛" : "⁴√"}${r} = ${mod} y argumentos (${a}° + 360° · k)/${n}, con k = 0${n > 2 ? ", 1" : ""}${n > 3 ? ", 2" : ""} y ${n - 1}. La primera (k = 0) tiene <b>${a1}°</b>; cada k más suma 360°/${n} = ${step}°, y la última (k = ${n - 1}) tiene (${a}° + 360° · ${n - 1})/${n} = <b>${last}°</b>.`,
});
})();
