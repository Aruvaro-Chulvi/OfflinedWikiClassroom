/* WikiAula — textos de gen/mat7u8.js (Grado 7 · Unidad 8: Rectas y ángulos), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  an_tipo_q: a => `¿Cómo se llama un ángulo de <b>${a}</b>?`,
  an_tipos: ["Agudo", "Recto", "Obtuso", "Llano"],
  an_tipo_s: [
    "Mide menos de 90°: es <b>agudo</b>.",
    "Mide exactamente 90°: es <b>recto</b>.",
    "Mide más de 90° y menos de 180°: es <b>obtuso</b>.",
    "Mide exactamente 180°: es <b>llano</b>.",
  ],
  an_comp_q: (a, c) => `¿Cuánto mide el ángulo ${c ? "complementario" : "suplementario"} de un ángulo de <b>${a}°</b>? (en grados)`,
  an_comp_s: (a, c, r) => `${c ? "Dos ángulos complementarios suman 90°" : "Dos ángulos suplementarios suman 180°"}: ${c ? 90 : 180}° − ${a}° = <b>${r}°</b>.`,
  an_par_q: "Las rectas horizontales son paralelas. ¿Cuánto mide el ángulo marcado con ?, en grados?",
  an_par_s_eq: (a) => `Los dos ángulos están en la misma posición respecto a las paralelas (correspondientes, alternos u opuestos por el vértice): son iguales, <b>${a}°</b>.`,
  an_par_s_sup: (a, r) => `Los dos ángulos son suplementarios: uno es igual al ángulo contiguo del otro, y dos ángulos contiguos sobre una recta suman 180°. 180° − ${a}° = <b>${r}°</b>.`,
  // Solución con el nombre de la pareja (lección «Ángulos»): rel = opuestos, adyacentes, correspondientes, alt_int, alt_ext, distintos
  an_par_s: (rel, a, r) => ({
    opuestos: `Están en el mismo cruce, uno enfrente del otro: son <b>opuestos por el vértice</b> y miden lo mismo, <b>${r}°</b>.`,
    adyacentes: `Están en el mismo cruce, uno al lado del otro (<b>adyacentes</b>): juntos forman una recta y suman 180°. 180° − ${a}° = <b>${r}°</b>.`,
    correspondientes: `Están en el mismo sitio de cada cruce: son <b>correspondientes</b> y miden lo mismo, <b>${r}°</b>.`,
    alt_int: `Están entre las paralelas y a lados distintos de la secante (dibujan una «Z»): son <b>alternos internos</b> y miden lo mismo, <b>${r}°</b>.`,
    alt_ext: `Están fuera de las paralelas y a lados distintos de la secante: son <b>alternos externos</b> y miden lo mismo, <b>${r}°</b>.`,
    distintos: `En cada cruce solo hay dos medidas, una aguda y otra obtusa, que suman 180°. El de ${a}° es ${a < 90 ? "agudo" : "obtuso"} y el marcado es ${a < 90 ? "obtuso" : "agudo"}: 180° − ${a}° = <b>${r}°</b>.`,
  })[rel],
  an_sx_q: e => `Calcula: <b>${e}</b>`,
  an_sx_f: ["Grados (°)", "Minutos (′)", "Segundos (″)"],
  // Una «llevada»: 76″ = 1′ 16″ → me llevo 1′: 63′ + 1′ = 64′
  an_sx_carry: (exc, conv, q, sum) => `${exc} = ${conv} → me llevo ${q}: ${sum}.`,
  an_sx_sum_s: (raw, steps, r) => `Sumamos por separado cada unidad: ${raw}.` + (steps.length ? "<br>" + steps.join("<br>") : " Ninguna columna llega a 60.") + `<br>Resultado: <b>${r}</b>.`,
  // Un préstamo: no se pueden restar 40″ de 15″ → pido 1′ = 60″
  an_sx_borrow: (u, b, a, pide, res) => `No se pueden restar ${b} de ${a}: pido ${pide} a la columna de la izquierda → ${res}.`,
  an_sx_res_s: (prep, op, r) => (prep.length ? prep.join("<br>") + "<br>" : "Se puede restar cada columna sin pedir prestado.<br>") + `Restamos por separado cada unidad: ${op} = <b>${r}</b>.`,
  // División (Ejemplo 6): grados, lo que sobra pasa a minutos (y a segundos)
  an_sx_div_g: (D, n, d, r) => `Grados: ${D} : ${n} = ${d}°` + (r ? ` y ${r === 1 ? "sobra" : "sobran"} ${r}° = ${60 * r}′.` : " y no sobra nada."),
  an_sx_div_m: (r1, M, mt, n, m, r2) => `Minutos: ${r1 ? `${60 * r1}′ + ${M}′ = ${mt}′, y ` : ""}${mt}′ : ${n} = ${m}′`
    + (r2 < 0 ? "." : r2 ? ` y ${r2 === 1 ? "sobra" : "sobran"} ${r2}′ = ${60 * r2}″.` : " y no sobra nada."),
  an_sx_div_s: (r2, sg, st, n, s) => `Segundos: ${r2 ? `${60 * r2}″ + ${sg}″ = ${st}″, y ` : ""}${st}″ : ${n} = ${s}″.`,
  an_sx_res: "Resultado",
  an_sx_mul_s: (raw, steps, r) => `Multiplicamos cada unidad por separado: ${raw}.` + (steps.length ? "<br>" + steps.join("<br>") : " Ninguna columna llega a 60.") + `<br>Resultado: <b>${r}</b>.`,
  an_sx_conv_q: a => `Expresa <b>${a}°</b> en grados, minutos y segundos.`,
  an_sx_conv_s: (d, fr, mins, m, rest, s, r) => `Grados: la parte entera, ${d}°.<br>Minutos: ${fr} · 60 = ${mins}′.`
    + (rest ? `<br>Nos quedamos con ${m}′ y sobra ${rest}′. Segundos: ${rest} · 60 = ${s}″.` : "") + `<br>Resultado: <b>${r}</b>.`,
  an_sx_seg_q: a => `¿Cuántos segundos son <b>${a}</b>?`,
  an_sx_seg_s: (d, ds, m, ms, s, r) => `${d}° = ${d} · 3600 = ${ds}″; ${m}′ = ${m} · 60 = ${ms}″; y ${s}″. Total: ${ds} + ${ms} + ${s} = <b>${r}″</b>.`,
  an_tri_q: (a, b) => `Dos ángulos de un triángulo miden <b>${a}°</b> y <b>${b}°</b>. ¿Cuánto mide el tercero, en grados?`,
  an_tri_s: (a, b, r) => `Los ángulos de un triángulo suman 180°: 180° − ${a}° − ${b}° = <b>${r}°</b>.`,
  an_cua_q: (a, b, c) => `Tres ángulos de un cuadrilátero miden ${a}°, ${b}° y ${c}°. ¿Cuánto mide el cuarto, en grados?`,
  an_cua_s: (a, b, c, r) => `Los ángulos de un cuadrilátero suman 360°: 360° − ${a}° − ${b}° − ${c}° = <b>${r}°</b>.`,
  an_pol_q: (n, name) => `¿Cuánto suman los ángulos interiores de un ${name} (${n} lados), en grados?`,
  an_pol_s: (n, r) => `Un polígono de n lados se divide en n − 2 triángulos desde un vértice: 180° · (${n} − 2) = <b>${r}°</b>.`,
  an_reg_q: (n, name) => `¿Cuánto mide cada ángulo interior de un ${name} regular (${n} lados), en grados?`,
  an_reg_s: (n, sum, r) => `Suma de ángulos: 180° · (${n} − 2) = ${sum}°. Como todos son iguales: ${sum}° : ${n} = <b>${r}°</b>.`,
  an_pols: { 5: "pentágono", 6: "hexágono", 7: "heptágono", 8: "octógono", 9: "eneágono", 10: "decágono", 12: "dodecágono", 4: "cuadrilátero", 3: "triángulo" },
  an_med_q: (d, l) => `Un punto P está en la mediatriz del segmento AB y su distancia a A es ${d} cm. ¿A qué distancia está de B, en cm?`,
  an_med_s: d => `Todos los puntos de la mediatriz están a la misma distancia de los extremos del segmento: PB = PA = <b>${d}</b> cm.`,
  an_med2_q: l => `Un segmento AB mide ${l} cm. La mediatriz lo corta en el punto M. ¿Cuánto mide AM, en cm?`,
  an_med2_s: (l, r) => `La mediatriz pasa por el punto medio: AM = ${l} : 2 = <b>${r}</b> cm.`,
  // m7.an.medbis
  mb_bis_q: a => `La bisectriz de un ángulo de <b>${a}</b> lo divide en dos ángulos iguales. ¿Cuánto mide cada uno, en grados y minutos?`,
  mb_bis_s: (a, D, d, r, M, mt, m, res) => `La bisectriz lo parte por la mitad: ${a} : 2.<br>Grados: ${D} : 2 = ${d}°`
    + (r ? ` y sobra 1° = 60′.<br>Minutos: 60′${M ? ` + ${M}′ = ${mt}′` : ""}, y ${mt}′ : 2 = ${m}′.` : ` y no sobra nada.<br>Minutos: ${M}′ : 2 = ${m}′.`)
    + `<br>Cada ángulo mide <b>${res}</b>.`,
  mb_inv_q: h => `La bisectriz de un ángulo forma con uno de sus lados un ángulo de <b>${h}</b>. ¿Cuánto mide el ángulo entero, en grados y minutos?`,
  mb_inv_s: (h, raw, carry, res) => `La bisectriz parte el ángulo en dos mitades iguales, así que el ángulo es el doble: ${h} · 2 = ${raw}.`
    + (carry ? "<br>" + carry : "") + `<br>El ángulo mide <b>${res}</b>.`,
  mb_ec_q: (c, b, v) => `El punto P está en la mediatriz del segmento AB. La distancia PA mide (${c}x + ${b}) cm y la distancia PB, ${v} cm. ¿Cuánto vale x?`,
  mb_ec_s: (c, b, v, d, x) => `Los puntos de la mediatriz están a la misma distancia de A y de B: PA = PB.<br>${c}x + ${b} = ${v} → ${c}x = ${v} − ${b} = ${d} → x = ${d} : ${c} = <b>${x}</b>.<br>Comprobación: ${c} · ${x} + ${b} = ${v} cm ✓`,
  mb_ec2_q: (b, AB) => `El segmento AB mide ${AB} cm y su mediatriz lo corta en M. Si AM mide (x + ${b}) cm, ¿cuánto vale x?`,
  mb_ec2_s: (b, AB, v, x) => `La mediatriz pasa por el punto medio: AM = ${AB} : 2 = ${v} cm.<br>x + ${b} = ${v} → x = ${v} − ${b} = <b>${x}</b>.`,
  // m7.geo.rectas
  gr_seg_q: (n, recta) => recta
    ? `Hay ${n} puntos en un plano y no hay tres en la misma recta. ¿Cuántas rectas distintas pasan por ellos, tomados de dos en dos?`
    : `¿Cuántos segmentos distintos quedan determinados por <b>${n} puntos alineados</b>?`,
  gr_seg_s: (n, recta, sum, r) => `Desde el primer punto salen ${n - 1} ${recta ? "rectas (una" : "segmentos (uno"} a cada uno de los otros). Desde el segundo, ${n - 2} ${recta ? "nuevas (la" : "nuevos (el"} que lo une con el primero ya está ${recta ? "contada" : "contado"}), y así hasta el penúltimo, que solo ${recta ? "añade una" : "añade uno"}.<br>Total: ${sum} = <b>${r}</b>.`,
  gr_fig_q: t => `¿Qué figura ${t}?`,
  gr_figs: ["Recta", "Semirrecta", "Segmento"],
  // [descripción, índice de la respuesta, por qué]
  gr_fig: [
    ["tiene un origen y no tiene fin", 1, "Tiene principio (el origen) pero no final"],
    ["tiene dos extremos", 2, "Está limitada por dos puntos, sus extremos"],
    ["no tiene principio ni fin", 0, "Sigue sin fin hacia los dos lados"],
    ["tiene una longitud que se puede medir con la regla", 2, "Solo lo que tiene dos extremos se puede medir: las otras dos no terminan"],
    ["se parece más al rayo de luz que sale de una linterna", 1, "La luz empieza en la linterna (el origen) y sigue sin fin"],
    ["se parece más al borde de una mesa", 2, "El borde empieza y acaba: tiene dos extremos"],
    ["queda a cada lado al marcar un punto sobre una recta", 1, "Un punto parte la recta en dos trozos que empiezan en él y no terminan"],
    ["queda entre dos puntos marcados sobre una recta", 2, "El trozo entre dos puntos tiene esos dos puntos como extremos"],
    ["se dibuja con flechas en los dos lados para indicar que sigue", 0, "Las flechas en los dos lados dicen que no tiene principio ni fin"],
  ],
  gr_fig_s: (why, r) => `${why}: es ${r === "Segmento" ? "un" : "una"} <b>${r.toLowerCase()}</b>.`,
  gr_poss: ["Paralelas", "Perpendiculares", "Secantes, pero no perpendiculares"],
  gr_pos_q: (r, s, t, p1, p2) => `En un plano, ${r} ${p1 ? "∥" : "⊥"} ${s} y ${s} ${p2 ? "∥" : "⊥"} ${t} (∥: paralelas; ⊥: perpendiculares). ¿Cómo son ${r} y ${t}?`,
  gr_pos_s: (r, s, t, p1, p2, par) => p1 && p2
    ? `${r} y ${t} son las dos paralelas a ${s}: van en la misma dirección que ${s}, así que no se cortan nunca. Son <b>paralelas</b>.`
    : !p1 && !p2
    ? `${r} y ${t} son las dos perpendiculares a ${s}, como los peldaños de una escalera respecto a la barra larga: son <b>paralelas</b>.`
    : `${p1 ? r : t} va en la misma dirección que ${s}, y ${p1 ? t : r} corta a ${s} formando ángulos rectos; por eso corta igual a ${p1 ? r : t}. Son <b>perpendiculares</b>.`,
  an_bis_q: a => `La bisectriz de un ángulo de ${a}° lo divide en dos ángulos iguales. ¿Cuánto mide cada uno, en grados?`,
  an_bis_s: (a, r, sx) => `La bisectriz lo parte por la mitad: ${a}° : 2 = <b>${r}°</b>${sx ? ` (en grados y minutos, ${sx}, porque 0,5° = 30′)` : ""}.`,
  an_reloj_q: (h, m) => `¿Qué ángulo forman las agujas del reloj a las <b>${h}:${m}</b>? (el menor de los dos, en grados)`,
  // Posición de cada aguja medida desde las 12; si la diferencia pasa de 180°, el ángulo menor es 360° menos ella
  an_reloj_s: (h, m, ah, am, big, small, diff, over, r, sx) => `Aguja grande: ${m} · 6° = ${am}°. `
    + `Aguja pequeña: ${h % 12 ? h + " · 30°" : "0° (el 12)"} + ${m} · 0,5° = ${ah}° (avanza 0,5° cada minuto). `
    + `Diferencia: ${big}° − ${small}° = ${diff}°. `
    + (over ? `Pasa de 180°, así que el ángulo menor es 360° − ${diff}° = <b>${r}°</b>` : `Es el ángulo menor: <b>${r}°</b>`)
    + (sx ? ` (es decir, ${sx}).` : "."),
});
})();
