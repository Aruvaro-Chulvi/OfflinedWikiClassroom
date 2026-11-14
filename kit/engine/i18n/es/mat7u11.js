/* WikiAula — textos de gen/mat7u11.js (Grado 7 · Unidad 11: Funciones y gráficas), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  fn_coord_q: "¿Cuáles son las coordenadas del punto P?",
  fn_coord_f: ["x", "y"],
  fn_coord_s: (x, y) => `Primero la abscisa (horizontal) y después la ordenada (vertical): P = <b>(${x}, ${y})</b>.`,
  fn_cuad_q: p => `¿Dónde está el punto <b>${p}</b>?`,
  fn_cuads: ["Primer cuadrante", "Segundo cuadrante", "Tercer cuadrante", "Cuarto cuadrante", "Sobre un eje"],
  fn_cuad_s: (x, y, k) => k === 4 ? `Una de sus coordenadas es 0: está <b>sobre un eje</b> (${x === 0 ? "el de ordenadas, el vertical" : "el de abscisas, el horizontal"}).`
    : `La abscisa es ${x > 0 ? "positiva (a la derecha)" : "negativa (a la izquierda)"} y la ordenada, ${y > 0 ? "positiva (arriba)" : "negativa (abajo)"}: signos ${["(+, +)", "(−, +)", "(−, −)", "(+, −)"][k]}, <b>${["primer", "segundo", "tercer", "cuarto"][k]} cuadrante</b>.`,
  fn_img_q: (f, k) => `Dada la función <b>y = ${f}</b>, calcula el valor de y cuando <b>x = ${k}</b>.`,
  fn_img_s: (e, r) => `Sustituimos x en la fórmula: y = ${e} = <b>${r}</b>.`,
  fn_tabla_q: (f, tbl) => `Completa la tabla de valores de la función <b>y = ${f}</b>:${tbl}`,
  fn_form_q: tbl => `¿Qué fórmula corresponde a esta tabla de valores?${tbl}`,
  // Como en la lección: cuánto cambia y cuando x aumenta 1, y cuánto vale y cuando x = 0
  fn_form_s: (f, a, b, ax, y2) => `Cada vez que x aumenta 1, y ${a.startsWith("−") ? "disminuye " + a.slice(1) : "aumenta " + a}: la fórmula lleva ${ax}. Cuando x = 0, y = ${b}: ${b === "0" ? "no se suma ni se resta nada" : b.startsWith("−") ? "se resta " + b.slice(1) : "se suma " + b}. Fórmula: <b>y = ${f}</b>. Compruebo con x = 2: ${a} · 2 ${b.startsWith("−") ? "− " + b.slice(1) : "+ " + b} = ${y2} ✓`,
  fn_graf_q: k => `Mirando la gráfica, ¿cuánto vale y cuando <b>x = ${k}</b>?`,
  fn_graf_s: (k, v, r) => v === 0 ? `En x = ${k} la recta corta justo el eje horizontal: <b>y = 0</b>.` : `${v > 0 ? "Subimos" : "Bajamos"} desde x = ${k} hasta la recta y leemos la altura: <b>y = ${r}</b>.`,
  // [relación, ¿es función?, por qué (con la variable de esa relación)]
  fn_es: [
    ["A cada persona le asignamos su edad.", true, "si conoces a la persona, su edad es una sola (nadie tiene dos edades a la vez)"],
    ["A cada número le asignamos su doble.", true, "cada número tiene un solo doble: al 7, el 14"],
    ["A cada día del año le asignamos la temperatura máxima.", true, "cada día tiene una sola temperatura máxima"],
    ["A cada número le asignamos su cuadrado.", true, "cada número tiene un solo cuadrado: al −3, el 9 (aunque el 3 también tenga el 9, eso no importa)"],
    ["A cada alumno le asignamos su nota del último examen de Matemáticas.", true, "cada alumno sacó una sola nota en ese examen"],
    ["A cada número le asignamos su siguiente.", true, "cada número tiene un solo siguiente: al 8, el 9"],
    ["A cada alumno de la clase le asignamos su fecha de nacimiento.", true, "cada alumno nació en una sola fecha"],
    ["A cada número positivo le asignamos los números que, al cuadrado, dan ese número (por ejemplo, al 9 le asignamos 3 y −3).", false, "al 9 le corresponden dos números, el 3 y el −3"],
    ["A cada edad le asignamos las personas que la tienen.", false, "a la edad de 12 años le corresponden muchas personas"],
    ["A cada letra le asignamos las palabras que empiezan por ella.", false, "a la letra «m» le corresponden muchas palabras (mesa, mano, música…)"],
    ["A cada número natural le asignamos sus divisores.", false, "al 6 le corresponden varios divisores: 1, 2, 3 y 6"],
    ["A cada madre le asignamos sus hijos.", false, "una madre puede tener varios hijos"],
  ],
  fn_es_q: s => `¿Esta relación es una función? (Pista: si conoces el primer dato, ¿sabes exactamente cuál le toca?)<br><i>${s}</i>`,
  fn_es_s: (ok, why) => (ok ? `Sí: ${why}. A cada valor le corresponde <b>un único</b> valor, así que <b>es una función</b>.`
    : `No: ${why}. En una función cada valor tiene <b>una sola</b> imagen, así que <b>no es una función</b>.`),
  // m7.fn.describir: la temperatura de un día
  fn_temp_ejes: ["hora", "°C"],
  fn_temp: {
    q: [
      "La gráfica muestra la temperatura de un día. ¿A qué hora se alcanzó la temperatura máxima? (escribe solo el número de la hora)",
      "La gráfica muestra la temperatura de un día. ¿Cuál fue la temperatura mínima, en °C?",
      "La gráfica muestra la temperatura de un día. ¿Entre qué horas fue creciente?",
      "La gráfica muestra la temperatura de un día. ¿Cuántos grados subió desde el mínimo hasta el máximo?",
      h => `La gráfica muestra la temperatura de un día. ¿Qué temperatura había a las ${h} h, en °C?`,
    ],
    f: ["Desde las (h)", "Hasta las (h)"],
    s: [
      (h, M) => `El máximo es el punto más alto de la gráfica: ${M} °C. Bajamos hasta el eje horizontal: a las <b>${h}</b> h. (Ojo: la hora es el valor de x; la temperatura, el de y.)`,
      (h, m) => `El mínimo es el punto más bajo de la gráfica, a las ${h} h. Vamos en horizontal hasta el eje vertical: <b>${m}</b> °C.`,
      (a, b, m, M) => `Creciente es donde la línea sube al leerla de izquierda a derecha: desde el mínimo (${m} °C a las ${a} h) hasta el máximo (${M} °C a las ${b} h). Desde las <b>${a}</b> hasta las <b>${b}</b>.`,
      (M, mt, m, r) => `Máximo: ${M} °C. Mínimo: ${mt} °C. Variación: ${M} − ${m < 0 ? "(" + mt + ")" : mt}${m < 0 ? ` = ${M} + ${-m}` : ""} = <b>${r}</b> grados.`,
      (h, t) => `Buscamos las ${h} h en el eje horizontal y subimos (o bajamos) hasta la gráfica: <b>${t}</b> °C.`,
    ],
  },
  // m7.fn.pertenece
  fn_pert: {
    q: (x, y, f) => `¿Pertenece el punto <b>(${x}, ${y})</b> a la gráfica de <b>y = ${f}</b>?`,
    s: (x, e, y0, y, yes) => `Calculamos la y que corresponde a x = ${x}: y = ${e} = ${y0}. ` + (yes ? `Coincide con la segunda coordenada del punto: <b>sí</b> pertenece.` : `No es ${y}: el punto <b>no</b> pertenece a la gráfica.`),
    unir_q: t => `En la gráfica de esta situación, ¿se unen los puntos con una línea o se dejan sueltos?<br><i>${t}</i>`,
    unir_opts: ["Se unen con una línea", "Se dejan puntos sueltos"],
    // [situación, ¿continua?, por qué]
    sit: [
      ["El número de entradas de cine que compras y lo que pagas.", false, "solo se compran entradas enteras (1, 2, 3…): no hay «2 entradas y media»"],
      ["Los litros de agua de un depósito que se llena, minuto a minuto.", true, "el agua entra sin parar: entre el minuto 2 y el 3 también hay agua, en cualquier instante"],
      ["El número de alumnos de cada clase y las mesas que necesita.", false, "los alumnos y las mesas se cuentan con números enteros"],
      ["La temperatura de una habitación a lo largo del día.", true, "la temperatura cambia sin saltos y existe en cualquier momento, también a las 10 y cuarto"],
      ["Los kilos de fruta a granel que compras y lo que pagas.", true, "se pueden comprar 1,5 kg o 2,3 kg: cualquier cantidad intermedia tiene su precio"],
      ["El número de bolígrafos que compras y lo que pagas.", false, "no se venden trozos de bolígrafo"],
      ["La altura de una planta a lo largo de un mes.", true, "la planta crece poco a poco, sin saltos: cada instante tiene su altura"],
      ["El número de hermanos y el número de regalos que se compran en Navidad.", false, "hermanos y regalos se cuentan con números enteros"],
      ["La distancia recorrida por un tren a lo largo de un viaje.", true, "el tren pasa por todas las distancias intermedias, en cualquier instante"],
    ],
    unir_s: (cont, why) => cont ? `Se unen: ${why}. La magnitud cambia sin saltos y <b>se unen con una línea</b>.` : `Puntos sueltos: ${why}. Entre un punto y el siguiente no hay valores con sentido, así que <b>se dejan sueltos</b>.`,
  },
  fn_int_q: [
    t => `Esta gráfica muestra la distancia a casa de Leo durante un paseo. ¿Cuántos minutos estuvo parado en total?`,
    t => `Esta gráfica muestra la distancia a casa de Leo durante un paseo. ¿A qué distancia máxima de casa llegó, en metros?`,
    t => `Esta gráfica muestra la distancia a casa de Leo durante un paseo. ¿A qué distancia de casa estaba en el minuto ${t}, en metros?`,
  ],
  fn_int_s: [
    (p, st) => st.length ? `Los tramos horizontales son los momentos en que la distancia no cambia: está parado. ${st.length === 1 ? "Hay uno" : "Hay " + st.length}: ${st.map(([a, b]) => `del minuto ${a} al ${b} (${b - a} min)`).join(" y ")}. En total, <b>${p}</b> minutos.`
      : `No hay ningún tramo horizontal: Leo no se paró en ningún momento (<b>0</b> minutos).`,
    (m) => `El punto más alto de la gráfica marca la distancia máxima: <b>${m}</b> m.`,
    (t, d) => `Subimos desde el minuto ${t} hasta la gráfica: <b>${d}</b> m.`,
  ],
  fn_ejes: ["minutos", "metros"],
});
})();
