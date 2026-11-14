/* WikiAula — textos de gen/mat7u12.js (Grado 7 · Unidad 12: Estadística y probabilidad), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  es_var_q: v => `¿De qué tipo es esta variable estadística: <b>${v}</b>?`,
  es_vars: ["Cualitativa", "Cuantitativa discreta", "Cuantitativa continua"],
  es_var_items: [
    ["el color de pelo", 0], ["el deporte favorito", 0], ["la marca de móvil", 0], ["el país de nacimiento", 0], ["el grupo sanguíneo", 0],
    ["el número de hermanos", 1], ["el número de libros leídos en un año", 1], ["la nota de un examen tipo test (de 0 a 10, sin decimales)", 1], ["el número de mascotas", 1], ["el número de goles en un partido", 1],
    ["la estatura", 2], ["el peso", 2], ["el tiempo que se tarda en llegar a clase", 2], ["la temperatura máxima del día", 2], ["la longitud de un salto", 2],
    ["el código postal", 0, "Es un número, pero es una etiqueta, no una cantidad: no tiene sentido sumarlo ni hacer su media. Es <b>cualitativa</b>."],
    ["el número del dorsal de un jugador", 0, "Es un número, pero solo sirve para distinguir a cada jugador: no tiene sentido sumarlo. Es <b>cualitativa</b>."],
    ["el número de teléfono", 0, "Es un número, pero no es una cantidad: sirve para llamar, y no tiene sentido sumarlo ni hacer su media. Es <b>cualitativa</b>."],
  ],
  es_var_s: [
    "No toma valores numéricos sino cualidades: es <b>cualitativa</b>.",
    "Toma valores numéricos que se cuentan (0, 1, 2…), sin valores intermedios: es <b>cuantitativa discreta</b>.",
    "Toma valores numéricos que se miden (con una cinta, un reloj, una báscula…) y puede valer cualquier cantidad intermedia: es <b>cuantitativa continua</b>.",
  ],
  es_datos: d => `Estos son los datos: <b>${d}</b>.`,
  es_frec_q: v => ` ¿Cuál es la frecuencia absoluta del valor <b>${v}</b>?`,
  es_frec_s: (v, n) => `La frecuencia absoluta es el número de veces que aparece el valor: el ${v} aparece <b>${n}</b> ${n === 1 ? "vez" : "veces"}.`,
  es_frel_q: v => ` ¿Cuál es la frecuencia relativa del valor <b>${v}</b>? (Escríbela como fracción irreducible.)`,
  es_frel_s: (n, N, r) => `Frecuencia relativa = frecuencia absoluta : total de datos = ${n}/${N} = <b>${r}</b>.`,
  // Con el recuento: cuántas veces sale el valor y cuántos datos hay; la fracción se simplifica solo si se puede
  es_frel_s2: (v, n, N, f0, r) => `Recuento: el ${v} aparece ${n} ${n === 1 ? "vez" : "veces"}. Total de datos: ${N}. Frecuencia relativa = frecuencia absoluta : total = `
    + (r ? `${f0} = <b>${r}</b> (simplificando).` : `<b>${f0}</b>, que ya es irreducible.`),
  // m7.es.frecrel
  es_fr2: {
    fa: "Frecuencia absoluta",
    tablas: [
      ["Mascota", ["perro", "gato", "pez", "ninguna"]],
      ["Deporte", ["fútbol", "baloncesto", "natación", "otros"]],
      ["Transporte", ["a pie", "autobús", "coche", "bici"]],
      ["Hermanos", ["0", "1", "2", "3"]],
      ["Fruta", ["manzana", "plátano", "naranja"]],
      ["Nota", ["suspenso", "aprobado", "notable", "sobresaliente"]],
    ],
    total: (sum, N) => `Total de datos: ${sum} = ${N}. `,
    rel_q: (tab, c) => `En esta tabla de frecuencias:${tab}¿Cuál es la frecuencia relativa de «${c}»? Escríbela en forma decimal.`,
    rel_s: (n, N, d) => `Frecuencia relativa = frecuencia absoluta : total = ${n} : ${N} = <b>${d}</b>.`,
    pct_q: (tab, c) => `En esta tabla de frecuencias:${tab}¿Qué porcentaje de los datos es «${c}»?`,
    pct_s: (n, N, d, p) => `Frecuencia relativa: ${n} : ${N} = ${d}. En porcentaje, por 100: <b>${p} %</b>.`,
    encuestas: [["prefiere ir a la playa en vacaciones", "personas"], ["tiene mascota", "personas"], ["lee al menos un libro al mes", "personas"], ["va al instituto andando", "alumnos"]],
    inv_q: (N, p, que) => `En una encuesta a ${N} personas, el ${p} % ${que}. ¿Cuántas personas son?`,
    inv_s: (N, p, r, cosa) => `Como en la unidad de porcentajes: el ${p} % de ${N} es ${N} · ${p} : 100 = ${N * p} : 100 = <b>${r}</b> ${cosa}.`
      + (p % 10 === 0 ? ` (De cabeza: el 10 % de ${N} es ${N / 10}, y el ${p} % es ${p / 10} veces más.)` : ""),
  },
  es_mediana_s2: (sorted, n, pos, cen, r) => `Ordenamos los datos: ${sorted}. Hay ${n} datos. `
    + (pos.length === 1 ? `El del centro es el ${pos[0]}.º: la mediana es <b>${r}</b>.`
      : `Como es un número par, hay dos centrales: el ${pos[0]}.º y el ${pos[1]}.º, ${cen[0]} y ${cen[1]}. Mediana: (${cen[0]} + ${cen[1]}) : 2 = ${cen[0] + cen[1]} : 2 = <b>${r}</b>.`),
  es_media_q: " Calcula la media aritmética (redondea a las centésimas si hace falta).",
  es_media_s: (xs, sum, n, exact, r) => `Suma de los datos: ${xs} = ${sum}. Hay ${n} datos. Media: ${sum} : ${n} = ${exact ? `${exact} ≈ <b>${r}</b>` : `<b>${r}</b>`}.`,
  es_mediana_q: " Calcula la mediana.",
  es_mediana_s: (sorted, r, even) => `Ordenamos los datos: ${sorted}. ${even ? "Como hay un número par de datos, la mediana es la media de los dos centrales" : "La mediana es el valor central"}: <b>${r}</b>.`,
  es_moda_q: " ¿Cuál es la moda?",
  es_moda_s: (v, n) => `La moda es el valor que más se repite: el <b>${v}</b> (${n} ${n === 1 ? "vez" : "veces"}).`,
  es_rango_q: " ¿Cuál es el rango (recorrido)?",
  es_rango_s: (M, m, r) => `Rango = valor máximo − valor mínimo = ${M} − ${m} = <b>${r}</b>.`,
  es_barras_q: (cat) => `El gráfico muestra la fruta favorita de una clase. ¿Cuántos alumnos prefieren <b>${cat}</b>?`,
  es_barras_tot_q: "El gráfico muestra la fruta favorita de una clase. ¿Cuántos alumnos hay en total?",
  es_barras_s: (r) => `Leemos la altura de la barra en el eje vertical: <b>${r}</b>.`,
  es_barras_tot_s: (sum, r) => `Sumamos todas las barras: ${sum} = <b>${r}</b>.`,
  es_frutas: ["manzana", "plátano", "naranja", "fresa", "pera", "uva"],
  es_sect_q: (n, N) => `En una encuesta a ${N} personas, ${n === 1 ? "1 persona eligió" : n + " personas eligieron"} la opción A. ¿Cuántos grados le corresponden en un diagrama de sectores?`,
  es_sect_s: (n, N, g, r) => `El círculo completo (360°) son las ${N} personas: a cada persona le tocan 360° : ${N} = ${g}°. A ${n === 1 ? "1 persona" : n + " personas"}: ${n} · ${g}° = <b>${r}°</b>.`,
  pb_q: e => `${e} (Escribe la probabilidad como fracción irreducible.)`,
  pb_dado: [
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un número par?", [3, 6]],
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un 5?", [1, 6]],
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un número mayor que 4?", [2, 6]],
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un múltiplo de 3?", [2, 6]],
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un número menor que 3?", [2, 6]],
    ["Lanzamos un dado. ¿Cuál es la probabilidad de sacar un número primo?", [3, 6]],
  ],
  pb_urna_q: (cols, pick) => `En una bolsa hay ${cols}. Sacamos una bola sin mirar. ¿Cuál es la probabilidad de que sea ${pick}?`,
  pb_bolas: (n, c) => `${n} ${n === 1 ? "bola " + c[0] : "bolas " + c[1]}`,
  pb_lista: l => l.slice(0, -1).join(", ") + " y " + l[l.length - 1],
  pb_colores: [["roja", "rojas"], ["azul", "azules"], ["verde", "verdes"], ["amarilla", "amarillas"]],
  // m7.pb.frecrel (lección «Azar y frecuencia»)
  pb_fr: {
    exps: [["una chincheta", "de punta hacia arriba"], ["un vaso de plástico", "de pie"], ["un tapón de botella", "boca arriba"], ["una moneda doblada", "cara"], ["un dado de 4 caras", "un 1"], ["una pinza de la ropa", "de lado"]],
    est_q: (obj, n, suc, k) => `Se lanza ${obj} ${n} veces y cae ${suc} ${k} veces. Estima la probabilidad de que caiga ${suc} (en forma decimal).`,
    est_s: (k, n, f) => `La probabilidad se estima con la frecuencia relativa, que se acerca a ella cuando hay muchas repeticiones: ${k} : ${n} = <b>${f}</b>.`,
    probs: [[[1, 6], "sacar un 5 con un dado"], [[1, 2], "sacar cara con una moneda"], [[1, 4], "sacar una carta de corazones de una baraja francesa (52 cartas)"], [[1, 3], "que la ruleta (con 3 sectores iguales) caiga en rojo"], [[2, 5], "sacar una bola azul de una bolsa con 2 azules y 3 rojas"], [[3, 10], "que salga premio en una tómbola con 3 premios cada 10 papeletas"]],
    esp_q: (txt, p, n) => `La probabilidad de ${txt} es ${p}. Si se repite ${n} veces, ¿cuántas veces se espera, aproximadamente, que ocurra?`,
    esp_s: (p, n, den, num, e) => `Se espera que ocurra la fracción ${p} de las veces: ${p} de ${n} = ${n} : ${den}${num === 1 ? "" : ` · ${num}`} = <b>${e}</b> veces, aproximadamente (no tiene por qué salir exacto).`,
    dado_q: (n, k) => `Un dado se lanza ${n} veces y el 6 sale ${k} veces. ¿Parece trucado?`,
    dado_s: (k, n, f, t, ex) => `Frecuencia relativa del 6: ${k} : ${n} ${ex ? "=" : "≈"} ${f}. En un dado normal, la probabilidad es 1/6 ≈ 0,17. `
      + (t ? `Con tantas tiradas, ${f} está muy lejos de 0,17: <b>sí</b> parece trucado.` : `${f} está muy cerca de 0,17: <b>no</b> parece trucado.`),
    nombres: ["Ana", "Luis", "Marta", "Pablo", "Irene", "Hugo"],
    fiable_q: (a, na, fa, b, nb, fb) => `Para estimar la probabilidad de que una chincheta caiga de punta, ${a} la ha lanzado ${na} veces y le sale una frecuencia relativa de ${fa}; ${b}, ${nb} veces, y le sale ${fb}. ¿Qué estimación es más fiable?`,
    fiable_s: (w, nmax, nmin) => `Cuantas más veces se repite el experimento, más se acerca la frecuencia relativa a la probabilidad. La de <b>${w}</b> (${nmax} lanzamientos) es más fiable que la de solo ${nmin}.`,
  },
  pb_urna_s: (sum, tot, fav, col) => `Casos posibles: todas las bolas, ${sum} = ${tot}. Casos favorables: ${fav === 1 ? "la" : "las"} ${col}, ${fav}.`,
  pb_s: (fav, tot, f0, r) => `Regla de Laplace: casos favorables entre casos posibles (${fav} de ${tot}) = ${f0 === r ? `<b>${r}</b>` : `${f0} = <b>${r}</b>`}.`,
  pb_tipo_q: s => `¿Cómo es este suceso? <i>${s}</i>`,
  pb_tipos: ["Seguro", "Ni seguro ni imposible", "Imposible"],
  pb_tipo_items: [
    ["Sacar un número menor que 7 al lanzar un dado.", 0], ["Que mañana salga el sol por el este.", 0], ["Sacar cara o cruz al lanzar una moneda.", 0],
    ["Sacar un 6 al lanzar un dado.", 1], ["Que llueva el próximo lunes.", 1], ["Sacar una carta de oros de una baraja española.", 1],
    ["Sacar un 7 al lanzar un dado normal.", 2], ["Sacar una bola verde de una bolsa con bolas rojas y azules.", 2], ["Sacar cara y cruz a la vez con una sola moneda.", 2],
  ],
  pb_tipo_s: ["Ocurre siempre: es un suceso <b>seguro</b> (probabilidad 1).", "Puede ocurrir o no: <b>ni es seguro ni es imposible</b> (probabilidad entre 0 y 1).", "No puede ocurrir nunca: es un suceso <b>imposible</b> (probabilidad 0)."],
  pb_esp_q: e => `¿Cuántos resultados posibles tiene este experimento? <i>${e}</i>`,
  pb_esp_items: [["Lanzar una moneda.", 2, "cara y cruz"], ["Lanzar un dado.", 6, "1, 2, 3, 4, 5 y 6"], ["Lanzar dos monedas.", 4, "CC, CX, XC y XX (C es cara y X, cruz)"],
    ["Lanzar tres monedas.", 8, "cada uno de los 2 resultados de la primera moneda se combina con los 2 de la segunda y con los 2 de la tercera: 2 · 2 · 2"],
    ["Lanzar dos dados.", 36, "cada uno de los 6 resultados del primer dado se combina con los 6 del segundo: 6 · 6"],
    ["Lanzar una moneda y un dado.", 12, "cada uno de los 2 resultados de la moneda se combina con los 6 del dado: 2 · 6"], ["Elegir un día de la semana al azar.", 7, "los 7 días"]],
  pb_esp_s: (n, how) => `Los resultados posibles forman el espacio muestral: ${how}, en total <b>${n}</b>.`,
});
})();
