/* WikiAula — textos de gen/mat11u3.js (Grado 11 · Unidad 3: Álgebra), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  ec_q: e => `Resuelve: <b>${e}</b>`,
  ec_hint_set: "Escribe todas las soluciones separadas por comas. Ejemplo: −2, 3",
  bic_s: (eq, t1, t2, neg, a, sols) => `Cambio x² = t: ${eq} → t = ${t1 < 0 ? "−" + -t1 : t1} o t = ${t2}. Deshacemos el cambio, x = ±√t: ${neg < 0 ? `t = −${-neg} no da soluciones (x² no puede ser negativo); t = ${a * a} da x = ±${a}` : `t = ${t2} da x = ±${Math.sqrt(t2)}; t = ${t1} da ${t1 ? `x = ±${Math.sqrt(t1)}` : "x = 0"}`}. Soluciones: <b>${sols}</b>.`,
  rac_s: (steps, x) => `Multiplicamos por el denominador (que no puede ser 0): ${steps} → <b>x = ${x}</b>, que no anula el denominador.`,
  irr_s: (steps, checks, ok) => `La raíz ya está aislada: elevamos al cuadrado los dos miembros: ${steps}. Comprobamos sustituyendo en la ecuación original (al elevar al cuadrado pueden aparecer soluciones falsas): ${checks}. Solución: ${ok}.`,
  irr_chk: (x, lhs, rhs, ok) => `x = ${x}: ${lhs === null ? "aparece la raíz de un número negativo ✗" : `${lhs} y el otro miembro vale ${rhs} ${ok ? "✓" : "✗"}`}`,
  ef_t: {
    s0: (den, a, st, xs, bad, good) => `Multiplicamos los dos miembros por ${den} (que no puede ser 0, así que x ≠ ${a}): ${st} → x = ${xs}. Pero x = ${bad} anula el denominador (aparecería una división entre 0): no vale. Solución: <b>x = ${good}</b>.`,
    q1: " ¿Cuál es su solución?",
    none: "No tiene solución",
    s1: (den, st, a) => `Multiplicamos por ${den} (con x ≠ ${a}): ${st}. Pero x = ${a} anula el denominador: no vale. La ecuación <b>no tiene solución</b>.`,
    s2: (iso, st, chk, ok) => `Primero aislamos la raíz: ${iso}. Elevamos al cuadrado: ${st}. Comprobamos sustituyendo: ${chk}. Solución: <b>x = ${ok}</b>.`,
    s3: (iso, sq1, iso2, sq2, chk, ok) => `Hay dos raíces: aislamos una, ${iso}, y elevamos al cuadrado (el segundo miembro es el cuadrado de una suma): ${sq1}. Aislamos la raíz que queda: ${iso2}. Elevamos otra vez: ${sq2}. Comprobamos sustituyendo en la original: ${chk}. Solución: <b>x = ${ok}</b>.`,
  },
  exp_s: (k, eq, t1, t2, te, sols) => `Como ${k}<sup>2x</sup> = (${k}<sup>x</sup>)², con t = ${k}<sup>x</sup> queda ${eq} → t = ${t1 < 0 ? "−" + -t1 : t1} o t = ${t2}. Entonces ${te.map(([t, e]) => e === null ? `${k}<sup>x</sup> = −${-t} no tiene solución (una potencia de base positiva nunca es negativa)` : `${k}<sup>x</sup> = ${t} (x = ${e})`).join(" o ")}: <b>${sols}</b>.`,
  sis_q: e => `Resuelve el sistema. Tiene dos soluciones (x₁, y₁) y (x₂, y₂): escribe primero la de x menor. ${e}`,
  sis_f: ["x₁", "y₁", "x₂", "y₂"],
  sis_s: (y, sub, quad, xs, ys, pairs) => `De la primera, y = ${y}. Sustituyendo en la segunda: ${sub} → ${quad} → x = ${xs}. Cada x tiene su y: ${ys}. Las soluciones son <b>${pairs}</b>.`,
  sis_cr: (y, r2, q2, q1, ys, pairs) => `Despejamos y en la ecuación de la recta: y = ${y}. Sustituimos en la de la circunferencia: x² + (${y})² = ${r2} → ${q2} → (dividiendo entre 2) ${q1}. Cada x tiene su y: ${ys}. Son los dos puntos de corte de la recta y la circunferencia: <b>${pairs}</b>.`,
  in_q: e => `Resuelve la inecuación: <b>${e}</b>`,
  in1_s: (steps, r) => `${steps}: <b>${r}</b>.`,
  in1_flip: " (al dividir entre un número negativo, la desigualdad cambia de sentido)",
  in2_t: {
    s: (poly, fac, r1, r2, a, inside, rel, strict, ok) => `Factorizamos: ${poly} = ${fac}, con raíces ${r1} y ${r2}. Como a = ${a < 0 ? "−" + -a : a} ${a > 0 ? "&gt; 0, la parábola abre hacia arriba: es negativa entre las raíces y positiva fuera" : "&lt; 0, la parábola abre hacia abajo: es positiva entre las raíces y negativa fuera"}. Buscamos ${rel} 0: ${inside ? "entre las raíces" : "fuera de las raíces"}${strict ? "" : ", con ellas incluidas (corchetes)"}. Solución: <b>${ok}</b>.`,
    sa: (c, less, ok) => `x² nunca es negativo, así que x² + ${c} ≥ ${c} &gt; 0 para todo x (la parábola no corta al eje y está por encima). ${less ? "No se cumple nunca" : "Se cumple siempre"}: <b>${ok}</b>.`,
    sb: (poly, sq, r, rel, ok) => `${poly} = ${sq}, un cuadrado: nunca es negativo y solo vale 0 en x = ${r} (raíz doble). Buscamos ${rel} 0: <b>${ok}</b>.`,
  },
  inr_s: (a, b, r, closedA, lo, hi, pos, rel) => `Numerador y denominador se anulan en ${a} y ${b}. Tabla de signos: en (−∞, ${lo}) los dos factores son negativos (cociente +); entre ${lo} y ${hi}, uno es positivo y el otro negativo (cociente −); en (${hi}, +∞), los dos son positivos (cociente +). Buscamos ${rel} 0: ${pos ? "fuera" : "entre"}. El ${b} nunca se incluye (anula el denominador)${closedA ? `, y el ${a} sí, porque hace la fracción igual a 0` : ""}. Solución: <b>${r}</b>.`,
  ip_t: {
    fz: (e, f1, f2) => `Sacamos factor común x y factorizamos el trinomio: ${e} = ${f1} = ${f2}. `,
    s0: (how, pts, tram, rel, ok) => `${how}Los factores se anulan en ${pts}. Tabla de signos (probando un número de cada tramo): ${tram}. Buscamos ${rel} 0: <b>${ok}</b>.`,
    s1: (m, den, red, z, b, tram, rel, ok) => `No se puede multiplicar por ${den}, porque no sabemos su signo. Pasamos el ${m} al otro miembro y reducimos a una sola fracción: ${red} ${rel} 0. Puntos: ${z} (anula el numerador) y ${b} (anula el denominador, nunca se incluye). Tabla de signos: ${tram}. Solución: <b>${ok}</b>.`,
    q2: e => `Una empresa gana B(x) = ${e} miles de euros si fabrica x miles de piezas. ¿Para qué valores de x hay beneficios (B(x) &gt; 0)?`,
    s2: (e, r1, r2, ok, n1, n2) => `Raíces de ${e} = 0: x = ${r1} y x = ${r2}. Como a = −1 &lt; 0, la parábola abre hacia abajo: es positiva <b>entre</b> las raíces. Hay beneficios si se fabrican entre ${n1} y ${n2} piezas: <b>${ok}</b>.`,
    q3: (e1, e2) => `Resuelve el sistema de inecuaciones: <b>${e1}</b> ; <b>${e2}</b>`,
    s3: (e1, s1, e2, s2, frac, ok) => `Cada una por separado. ${e1}: la parábola es negativa entre sus raíces, ${s1}. ${e2}: ${frac ? "una fracción de numerador positivo es positiva si su denominador lo es, así que " : ""}${s2}. La solución del sistema es la intersección (los x que cumplen las dos): <b>${ok}</b>.`,
  },
  ga_q: e => `Resuelve el sistema por el método de Gauss:${e}`,
  ga_f: ["x", "y", "z"],
  ga_s: (ops, tri, back, x, y, z) => `Hacemos ceros debajo de la diagonal. ${ops}. Queda escalonado:${tri} De abajo arriba. En la 3.ª: ${back[0]}. En la 2.ª, con ese valor de z: ${back[1]}. En la 1.ª: ${back[2]}. Solución: <b>x = ${x}, y = ${y}, z = ${z}</b>.`,
  ga_tipo_q2: e => `Escalona el sistema y di de qué tipo es (fíjate en la tercera ecuación):${e}`,
  ga_tipo_s2: (last, k) => `La tercera ecuación es la suma de las otras dos en los coeficientes de x, y y z. Haciendo E₃ − E₁ − E₂ queda ${last}: ${k === 1 ? "una ecuación que no dice nada; quedan dos ecuaciones para tres incógnitas: <b>compatible indeterminado</b> (infinitas soluciones)" : "imposible: <b>incompatible</b> (sin solución)"}.`,
  ga_tipo_q: e => `Después de aplicar Gauss, un sistema queda así. ¿De qué tipo es?${e}`,
  ga_tipos: ["Compatible determinado (una solución)", "Compatible indeterminado (infinitas soluciones)", "Incompatible (sin solución)"],
  ga_tipo_s: [
    "La última ecuación da un valor concreto de z y las demás se despejan: <b>una única solución</b>.",
    "La última ecuación es 0 = 0: queda una incógnita libre, hay <b>infinitas soluciones</b>.",
    "La última ecuación es 0 = k con k ≠ 0, imposible: el sistema <b>no tiene solución</b>.",
  ],
});
})();
