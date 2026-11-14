/* WikiAula — textos de gen/mat1.js (Matemáticas, Grado 1), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m1 = G.m1 || {};
const cu = (fem) => fem ? "Cuántas" : "Cuántos";
// los números que se dicen al contar desde a hasta c: «3, 4, 5»
const desde = (a, c) => Array.from({ length: c - a }, (_, i) => a + 1 + i).join(", ");
// la cuenta de un problema; con pasos (p), los pasos y después el resultado
const cuenta = (a, b, r, plus, p) => `${p ? `${a} ${plus ? "+" : "−"} ${b}. ${p} ` : ""}${a} ${plus ? "+" : "−"} ${b} = <b>${r}</b>.`;
Object.assign(S, {
  cosas: { circle: ["círculos", 0], square: ["cuadrados", 0], triangle: ["triángulos", 0], star: ["estrellas", 1], heart: ["corazones", 0], rect: ["rectángulos", 0] },
  cuantos: ([w, fem]) => `¿${cu(fem)} ${w} hay?`,
  contar_q: "¿Cuántos dibujos hay? Cuéntalos.",
  contar_s: n => `Señalamos cada dibujo y decimos un número, sin saltarnos ninguno: ${desde(0, n)}. El último número es el ${n}: hay <b>${n}</b>.`,
  letras_q: w => `Escribe con cifras: <b>${w}</b>.`,
  letras2_q: n => `¿Cómo se escribe con letras el número <b>${n}</b>?`,
  letras_s: (w, n) => `<b>${cap(w)}</b> se escribe <b>${n}</b>.`,
  letras2_s: (w, n) => `<b>${n}</b> se lee <b>${w}</b>.`,
  comp_q: (a, b) => `Elige el signo que va en el hueco: <b>${a} ☐ ${b}</b>`,
  comp_s: (a, b, k) => [`${a} es mayor que ${b}: <b>${a} &gt; ${b}</b>. La boca del signo se abre hacia el número mayor.`,
    `${a} es menor que ${b}: <b>${a} &lt; ${b}</b>. La boca del signo se abre hacia el número mayor.`,
    `Los dos números son iguales: <b>${a} = ${b}</b>.`][k],
  desp_q: n => `¿Qué número va justo <b>después</b> del ${n}?`,
  // al cambiar de decena (39 → 40, 60 → 59), la solución dice qué pasa con las decenas
  desp_s: (n, r) => r >= 20 && r % 10 === 0 ? `${n} tiene 9 unidades. Una más son 10 unidades: ¡una decena nueva! El posterior del ${n} es <b>${r}</b>: ${r / 10} decenas y 0 unidades.`
    : `El posterior del ${n} es uno más: <b>${r}</b>.`,
  antes_q: n => `¿Qué número va justo <b>antes</b> del ${n}?`,
  antes_s: (n, r) => n >= 20 && n % 10 === 0 ? `Contamos hacia atrás: ${n}, ${r}. El anterior del ${n} es <b>${r}</b>: ${Math.floor(r / 10)} ${Math.floor(r / 10) === 1 ? "decena" : "decenas"} y 9 unidades.`
    : `El anterior del ${n} es uno menos: <b>${r}</b>.`,
  entre_q: (a, b) => `¿Qué número está entre el ${a} y el ${b}?`,
  entre_s: (a, n, b) => `Contando: ${a}, <b>${n}</b>, ${b}.`,
  suma_q: (a, b) => `¿Cuánto es <b>${a} + ${b}</b>?`,
  // como en «Juntar: la suma»: se empieza en el mayor y se cuenta hacia delante, sin contar el de salida
  suma_s: (a, b, s) => { const g = Math.max(a, b), p = Math.min(a, b); return `Empezamos en el mayor, el ${g}, y contamos ${p} más: ${desde(g, s)}. ${a} + ${b} = <b>${s}</b>.`; },
  // como en «Sumar pasando de la decena»: se completa el 10 desde el mayor
  suma20_s: (a, b, s) => {
    const p = Math.max(a, b), q = Math.min(a, b), c = 10 - p, d = q - c;
    return `Empiezo por el mayor, el ${p}: le ${c === 1 ? "falta 1" : `faltan ${c}`} para llegar a 10. De los ${q}, uso ${c}: ${p} + ${c} = 10. Me ${d === 1 ? "queda 1" : `quedan ${d}`}: 10 + ${d} = <b>${s}</b>.`;
  },
  resta_q: (a, b) => `¿Cuánto es <b>${a} − ${b}</b>?`,
  resta_s: (a, b, r) => `Teníamos ${a} y quitamos ${b} (las tachadas). ${r === 1 ? "Queda" : "Quedan"} <b>${r}</b>. ${a} − ${b} = ${r}.`,
  resta20_s: (a, b, c, d, r) => `Primero quitamos ${c} para llegar a 10, y después ${d} más: 10 − ${d} = <b>${r}</b>.`,
  hueco_q: e => `¿Qué número falta? <b>${e}</b>`,
  // como en «Formar y descomponer»: ¿a y cuánto son c? Se cuenta desde a con un dedo por número
  hueco_s: (a, c, r) => `¿${a} y cuánto son ${c}? Contamos desde el ${a} y levantamos un dedo por cada número: ${desde(a, c)}. ${r === 1 ? "Un dedo" : `${r} dedos`}: falta el <b>${r}</b>. ${a} + ${r} = ${c}.`,
  hueco2_s: (c, a, r) => `¿${a} y cuánto son ${c}? Contamos desde el ${a} y levantamos un dedo por cada número: ${desde(a, c)}. ${r === 1 ? "Un dedo" : `${r} dedos`}. Si de ${c} quitamos ${r}, ${a === 1 ? "queda" : "quedan"} ${a}: falta el <b>${r}</b>.`,
  // nombres de las personas de los problemas (m1.prob10, prob20, prob99)
  nombres: ["Lucía", "Hugo", "Sara", "Leo", "Nora", "Mateo", "Alba", "Omar", "Irene", "Bruno", "Ana", "Pablo", "Aisha", "Iker", "Mei", "Dani"],
  // [cosa, femenino, cuántas es creíble que tenga un niño o haya en una caja]
  objs: [["globos", 0, 15], ["canicas", 1, 99], ["cromos", 0, 99], ["caramelos", 0, 60], ["lápices", 0, 30], ["pegatinas", 1, 99], ["cuentos", 0, 30], ["manzanas", 1, 40], ["coches de juguete", 0, 25], ["flores", 1, 40], ["piezas de construcción", 1, 99], ["cartas", 1, 60]],
  prob_q: [
    (N, M, a, b, o, f) => `${N} tiene ${a} ${o}. Le regalan ${b} más. ¿${cu(f)} ${o} tiene ahora?`,
    (N, M, a, b, o, f) => `En una caja hay ${a} ${o} y en otra caja hay ${b}. ¿${cu(f)} ${o} hay en total?`,
    (N, M, a, b, o, f) => `${N} tiene ${a} ${o} y ${M} tiene ${b}. ¿${cu(f)} ${o} tienen los dos juntos?`,
    (N, M, a, b, o, f) => `${N} tiene ${a} ${o} y regala ${b}. ¿${cu(f)} le quedan?`,
    (N, M, a, b, o, f) => `Había ${a} ${o} en la mesa y ${N} se lleva ${b}. ¿${cu(f)} quedan en la mesa?`,
    (N, M, a, b, o, f) => `${N} tiene ${a} ${o} y ${M} tiene ${b}. ${N} tiene más ${o} que ${M}. ¿${cu(f)} más?`,
  ],
  // la pista de cada problema, la cuenta y sus pasos (p: pasos de la cuenta, o "")
  prob_s: [
    (a, b, r, p) => `Le regalan ${b}: al final tiene más. Es una suma. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Juntamos las dos cajas: es una suma. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Juntamos lo que tienen los dos: es una suma. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Regala ${b}: al final le quedan menos. Es una resta. ${cuenta(a, b, r, false, p)}`,
    (a, b, r, p) => `Se lleva ${b}: en la mesa quedan menos. Es una resta. ${cuenta(a, b, r, false, p)}`,
    (a, b, r, p) => `Hacemos parejas y contamos cuántos sobran: es una resta. ${cuenta(a, b, r, false, p)}`,
  ],
  diez_s: (g, c, d, r) => `Llegamos primero al 10: ${g} + ${c} = 10 y 10 + ${d} = ${r}.`,
  bajar_s: (a, c, d, r) => `Bajamos primero al 10: ${a} − ${c} = 10 y 10 − ${d} = ${r}.`,
  uni20_s: (u, b, r, plus) => plus && u + b === 10 ? `Unidades: ${u} + ${b} = 10, otra decena. Con la que había, son 2 decenas.`
    : `Solo cambian las unidades: ${u} ${plus ? "+" : "−"} ${b} = ${plus ? u + b : u - b}. La decena sigue ahí.`,
  cols_s: (a, b, plus) => {
    const op = plus ? "+" : "−", ua = a % 10, ub = b % 10, da = Math.floor(a / 10), db = Math.floor(b / 10);
    const u = plus ? ua + ub : ua - ub, d = plus ? da + db : da - db;
    return b < 10 ? `Unidades: ${ua} ${op} ${ub} = ${u}. ${da === 1 ? "La decena no cambia" : `Las ${da} decenas no cambian`}.`
      : `Unidades: ${ua} ${op} ${ub} = ${u}. Decenas: ${da} ${op} ${db} = ${d}.`;
  },
  bloques_q: "¿Qué número es? Cada tren es una decena; cada cubo suelto, una unidad.",
  du_q: n => `¿Cuántas decenas y cuántas unidades tiene el número <b>${n}</b>?`,
  du_f: ["Decenas", "Unidades"],
  du_s: (n, d, u) => `${n} tiene <b>${d}</b> ${d === 1 ? "decena" : "decenas"} (${d * 10}) y <b>${u}</b> ${u === 1 ? "unidad" : "unidades"}: ${d * 10} + ${u} = ${n}.`,
  falta_q: s => `¿Qué número falta en la serie? <b>${s}</b>`,
  falta1_q: s => `¿Qué número falta? <b>${s}</b>`,
  falta_s: (st, down, r, full) => `${st === 1 ? "Van de uno en uno" : `Van de ${st} en ${st}`} ${down ? "hacia atrás" : "hacia delante"}${st === 10 ? `: cada vez una decena ${down ? "menos" : "más"} y las unidades no cambian` : ""}. ${full}. Falta el <b>${r}</b>.`,
  mayor_q: s => `¿Cuál es el número <b>mayor</b>? ${s}`,
  menor_q: s => `¿Cuál es el número <b>menor</b>? ${s}`,
  orden_s: (s, r) => `Ordenados de menor a mayor: ${s}. La respuesta es <b>${r}</b>.`,
  doble_q: n => `¿Cuál es el <b>doble</b> de ${n}?`,
  doble_s: (n, r) => `El doble es sumar el número dos veces: ${n} + ${n} = <b>${r}</b>.`,
  mitad_q: n => `¿Cuál es la <b>mitad</b> de ${n}?`,
  mitad_s: (n, r) => `La mitad es repartir en dos partes iguales: ${r} + ${r} = ${n}, así que la mitad es <b>${r}</b>.`,
  par_q: n => `¿El número <b>${n}</b> es par o impar?`,
  par_o: ["Par", "Impar"],
  // con dibujo (hasta 12), el método primero de la lección: hacer parejas; con números grandes, la última cifra
  par_s: (n, u, k) => n <= 12 ? `Hacemos parejas: ${n < 2 ? "no sale ninguna" : `salen ${Math.floor(n / 2)} ${n < 4 ? "pareja" : "parejas"}`} y ${k ? "sobra 1" : "no sobra ninguno"}. ${n} es <b>${k ? "impar" : "par"}</b>.`
    : k ? `${n} termina en ${u}: es <b>impar</b> (si hacemos parejas, sobra uno).` : `${n} termina en ${u}: es <b>par</b> (se pueden hacer parejas sin que sobre ninguno).`,
  col_s: (a, b, d, u, r, plus) => `Primero las unidades y después las decenas. ${S.cols_s(a, b, plus)} ${a} ${plus ? "+" : "−"} ${b} = <b>${r}</b>.`,
  colq_q: (a, b, plus) => `Calcula <b>${a} ${plus ? "+" : "−"} ${b}</b> en columnas. Empieza por las unidades.`,
  // rótulos de las columnas en el dibujo de la cuenta: decenas y unidades
  col_h: ["D", "U"],
  figura_q: "¿Qué figura es?",
  girada_s: "Aunque esté girada, sigue siendo la misma figura.",
  figuras: ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"],
  figura_s: ["Es redonda, no tiene lados ni esquinas: es un <b>círculo</b>.", "Tiene 4 lados iguales: es un <b>cuadrado</b>.", "Tiene 3 lados: es un <b>triángulo</b>.", "Tiene 4 lados, dos largos y dos cortos: es un <b>rectángulo</b>."],
  lados_q: "¿Cuántos <b>lados</b> tiene esta figura?",
  vertices_q: "¿Cuántos <b>vértices</b> (esquinas) tiene esta figura?",
  lados_s: (n, v) => `Contamos ${v ? "las esquinas una a una" : "los lados uno a uno"}: tiene <b>${n}</b>.${v ? "" : " (Siempre tiene tantos lados como vértices.)"}`,
  cuerpo_q: "¿Qué cuerpo geométrico es?",
  cuerpos: ["Cubo", "Esfera", "Cilindro", "Cono"],
  cuerpo_s: ["Tiene 6 caras cuadradas, como un dado: es un <b>cubo</b>.", "Es redonda por todas partes, como una pelota: es una <b>esfera</b>.", "Tiene dos círculos y rueda, como una lata: es un <b>cilindro</b>.", "Tiene un círculo y una punta, como un cucurucho: es un <b>cono</b>."],
  pos_q: ["¿Dónde está la pelota?", "¿Dónde está la pelota?", "¿A qué lado del árbol está la pelota?"],
  pos_o: [["Encima de la mesa", "Debajo de la mesa"], ["Dentro de la caja", "Fuera de la caja"], ["A la izquierda", "A la derecha"]],
  pos_s: ["La pelota está sobre la mesa: <b>encima</b>.", "La pelota está en el suelo, bajo la mesa: <b>debajo</b>.", "La pelota está en la caja: <b>dentro</b>.", "La pelota no está en la caja: <b>fuera</b>.", "Mirando el dibujo, la pelota está del lado de <b>tu</b> mano izquierda: está <b>a la izquierda</b> del árbol.", "Mirando el dibujo, la pelota está del lado de <b>tu</b> mano derecha: está <b>a la derecha</b> del árbol."],
  serie_q: "¿Qué figura va en el hueco?",
  serie_s: n => `La serie repite siempre el mismo grupo de ${n} figuras. Va esta:`,
  medir_q: "¿Cuántos cuadraditos mide la tira?",
  medir_s: n => `Contamos los cuadraditos: mide <b>${n}</b>.`,
  largo_q: "¿Qué cinta es <b>más larga</b>?",
  corto_q: "¿Qué cinta es <b>más corta</b>?",
  cintas: ["La azul", "La roja"],
  largo_s: (c, l) => `Empiezan en el mismo sitio, así que basta con mirar dónde acaban: <b>${c.toLowerCase()}</b> es más ${l ? "larga" : "corta"}.`,
  cuadros_q: "(Cuenta los cuadros: ¡no empiezan en el mismo sitio!)",
  largo2_s: (a, b, c, l) => `No empiezan en el mismo sitio, así que no basta con mirar dónde acaban: contamos los cuadros. La azul mide ${a} y la roja, ${b}: <b>${c.toLowerCase()}</b> es más ${l ? "larga" : "corta"}.`,
  larga3_q: "¿Qué cinta es <b>la más larga</b>?",
  corta3_q: "¿Qué cinta es <b>la más corta</b>?",
  cintas3: ["La azul", "La roja", "La verde"],
  largo3_s: (c, l) => `Empiezan en el mismo sitio: miramos dónde acaba cada una. <b>${c}</b> es la más ${l ? "larga" : "corta"}.`,
  reloj_q: "¿Qué hora es? (Escribe solo el número.)",
  reloj_s: h => `La aguja corta señala el ${h} y la larga el 12: son <b>las ${h} en punto</b>.`,
  reloj2_q: "¿Qué hora es?",
  ymedia: h => `Las ${h} y media`,
  enpunto: h => `Las ${h} en punto`,
  reloj2_s: (h, n) => `La aguja larga está abajo, en el 6: es «y media». La corta ya ha pasado el ${h}, pero no ha llegado al ${n}: son <b>las ${h} y media</b>.`,
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  despues_q: (x, m) => `¿Qué ${m ? "mes" : "día"} va justo <b>después</b> ${m ? "de " : "del "}${x}?`,
  antesde_q: (x, m) => `¿Qué ${m ? "mes" : "día"} va justo <b>antes</b> ${m ? "de " : "del "}${x}?`,
  dias_s: (x, r, after, m) => m ? `${after ? "Después" : "Antes"} de ${x} va <b>${r}</b>.` : `${after ? "Después" : "Antes"} del ${x} va el <b>${r}</b>.`,
  dinero_q: "¿Cuántos euros hay en total?",
  dinero_s: (e, parts) => {
    if (parts.length === 1) return `Hay ${parts[0] >= 5 ? "un billete" : "una moneda"} de ${parts[0]} €: <b>${e} €</b>.`;
    let s = parts[0];
    const steps = parts.slice(1).map(v => { const t = `${s} + ${v} = ${s + v}`; s += v; return t; });
    return `Empezamos por lo que vale más: ${parts[0]}. Sumamos lo demás: ${steps.join("; ")}. Hay <b>${e} €</b>.`;
  },
  llega_q: p => `Un juguete cuesta <b>${p} €</b>. ¿Te llega este dinero para comprarlo?`,
  llega_o: ["Sí", "No"],
  llega_s: (cuenta, e, p) => `${cuenta.replace(/<\/?b>/g, "")} ${e === p ? `Cuesta justo ${p} €: <b>sí</b> te llega.` : e > p ? `${e} es más que ${p}: <b>sí</b> te llega (y te sobra dinero).` : `${e} es menos que ${p}: <b>no</b> te llega.`}`,
  // monedero con monedas de céntimos (solo en las monedas sin moneda de 1 unidad, como el dólar: ver m1.dinero); en euros no sale
  dineroc_q: "¿Cuántos céntimos hay en total?",
  dineroc_s: (e, parts) => {
    let s = parts[0];
    const steps = parts.slice(1).map(v => { const t = `${s} + ${v} = ${s + v}`; s += v; return t; });
    return `Empezamos por la moneda que vale más: ${parts[0]}. Sumamos lo demás: ${steps.join("; ")}. Hay <b>${e} céntimos</b>.`;
  },
  llegac_q: p => `Una pegatina cuesta <b>${p} céntimos</b>. ¿Te llega este dinero para comprarla?`,
  llegac_s: (cuenta, e, p) => `${cuenta.replace(/<\/?b>/g, "")} ${e === p ? `Cuesta justo ${p} céntimos: <b>sí</b> te llega.` : e > p ? `${e} es más que ${p}: <b>sí</b> te llega (y te sobra dinero).` : `${e} es menos que ${p}: <b>no</b> te llega.`}`,
  colores: ["azules", "rojas", "amarillas"],
  coloresM: ["azules", "rojos", "amarillos"],
  dos_q: w => `¿Cuántos <b>${w}</b> hay?`,
  // figura y color juntos: «triángulos rojos»
  dos_w: (cosa, color) => `${cosa} ${color}`,
  palotes_q: "¿Qué número marcan estos palotes?",
  palotes_s: n => {
    const g = Math.floor(n / 5), r = n % 5, fives = Array.from({ length: g }, (_, i) => 5 * (i + 1)).join(", ");
    if (!g) return `No hay ningún grupo cerrado. Contamos los palotes: ${desde(0, n)}. Son <b>${n}</b>.`;
    return `${g === 1 ? "Hay un grupo cerrado: 5" : `Cada grupo cerrado son 5: ${fives}`}.${r ? ` Seguimos con los sueltos: ${desde(5 * g, n)}.` : ""} Son <b>${n}</b>.`;
  },
  color_q: c => `¿Cuántas figuras <b>${c}</b> hay?`,
  figuras_de: c => `figuras ${c}`,
  clas_s: (n, [w, fem]) => n === 0 ? `Buscamos ${fem ? "las" : "los"} ${w}: no hay ${fem ? "ninguna" : "ninguno"}. Hay <b>0</b>.` : `Contamos solo ${fem ? "las" : "los"} ${w}, ${fem ? "una a una" : "uno a uno"}: hay <b>${n}</b>.`,
  frutas: ["manzanas", "peras", "plátanos", "naranjas"],
  picto_q: f => `Mira el pictograma. ¿Cuántos dibujos hay de <b>${f}</b>?`,
  picto_s: (f, n) => `En la fila de ${f} hay <b>${n}</b> ${n === 1 ? "dibujo" : "dibujos"}.`,
  pmas_q: "Mira el pictograma. ¿De qué fruta hay <b>más</b>?",
  pmenos_q: "Mira el pictograma. ¿De qué fruta hay <b>menos</b>?",
  pmas_s: (f, n, big) => `La fila ${big ? "más larga" : "más corta"} es la de <b>${f}</b>, con ${n}.`,
  pdif_q: (a, b) => `Mira el pictograma. Hay más dibujos de ${a} que de ${b}. ¿Cuántos más?`,
  ptot_q: "Mira el pictograma. ¿Cuántos dibujos hay <b>en total</b>?",
  ptot_s: (rows, t) => `Contamos cada fila: ${rows.map(([f, n]) => `${f}, ${n}`).join("; ")}. Juntamos: ${rows.map(r => r[1]).join(" + ")} = <b>${t}</b>.`,
  pdif_s: (a, b, r, la, lb) => `${cap(la)}: ${a}. ${cap(lb)}: ${b}. Hacemos parejas y contamos los que sobran: ${a} − ${b} = <b>${r}</b> más.`,
});

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const cu2 = fem => fem ? "cuántas" : "cuántos";
const de = s => s.startsWith("el ") ? "del " + s.slice(3) : "de " + s;
const uu = f => f ? "unas" : "unos";
const cuadros = n => n === 1 ? "1 cuadro" : `${n} cuadros`;

// Calcular de cabeza (m1.mental)
S.mental_q = (a, b, plus) => `¿Cuánto es <b>${a} ${plus ? "+" : "−"} ${b}</b>? Hazlo de cabeza.`;
S.MT = {
  dec_s: (a, b, r, plus) => `Las decenas son como unidades: ${a} ${plus ? "+" : "−"} ${b} = ${r}, así que ${a * 10} ${plus ? "+" : "−"} ${b * 10} = <b>${r * 10}</b>.`,
  uno_s: (n, r, plus) => plus ? `Más 1 es el número que sigue: ${n} + 1 = <b>${r}</b>.` : `Menos 1 es el número de antes: ${n} − 1 = <b>${r}</b>.`,
  diez_s: (n, r, plus) => `${plus ? "Más 10 es una decena más (en la tabla, una fila abajo)" : "Menos 10 es una decena menos (en la tabla, una fila arriba)"}; las unidades no cambian: ${n} ${plus ? "+" : "−"} 10 = <b>${r}</b>.`,
  du_s: (d, u) => `Ponemos juntas las decenas y las unidades: ${d / 10} decenas y ${u} ${u === 1 ? "unidad" : "unidades"} son <b>${d + u}</b>.`,
  quitau_s: (n, u, r) => `Quitamos ${u === 1 ? "la unidad" : `las ${u} unidades`} y quedan las decenas justas: ${n} − ${u} = <b>${r}</b>.`,
  quitad_s: (n, d, r) => `Quitamos ${d === 10 ? "la decena" : `las ${d / 10} decenas`} y ${r === 1 ? "queda la unidad" : "quedan las unidades"}: ${n} − ${d} = <b>${r}</b>.`,
};

// Arriba, abajo, dentro, fuera (m1.posicion1): encima/debajo · dentro/fuera · delante/detrás · cerca/lejos · arriba/abajo
S.P1 = {
  q: ["¿Dónde está la pelota?", "¿Dónde está la pelota?", "¿Dónde está la pelota?", "¿Dónde está la pelota?", "¿Dónde está la pelota?"],
  o: [["Encima de la mesa", "Debajo de la mesa"], ["Dentro de la caja", "Fuera de la caja"], ["Delante del coche", "Detrás del coche"],
    ["Cerca de la casa", "Lejos de la casa"], ["En el estante de arriba", "En el estante de abajo"]],
  s: [["La pelota está sobre la mesa: <b>encima</b>.", "La pelota está en el suelo, bajo la mesa: <b>debajo</b>."],
    ["La pelota está metida en la caja: <b>dentro</b>.", "La pelota no está metida en la caja: <b>fuera</b>."],
    ["El coche mira hacia la pelota (por ahí van sus faros): la pelota está <b>delante</b>.", "La pelota está en la parte de atrás del coche, la contraria a los faros: <b>detrás</b>."],
    ["La pelota está casi tocando la casa: <b>cerca</b>.", "Entre la pelota y la casa hay mucho espacio: <b>lejos</b>."],
    ["La pelota está en el estante alto: <b>arriba</b>.", "La pelota está en el estante que está cerca del suelo: <b>abajo</b>."]],
};

// Derecha e izquierda (m1.lado)
S.LD = {
  fr: ["la manzana", "la pera", "el plátano", "la naranja"],
  fila_q: (f, right) => `En esta fila, ¿qué fruta está justo a la <b>${right ? "derecha" : "izquierda"}</b> ${de(f)}?`,
  fila_s: (f, r, right) => `Miramos la fila como cuando leemos: la izquierda es el lado por el que empezamos y la derecha, el lado por el que terminamos. ${right ? "Después" : "Antes"} ${de(f)} está <b>${r}</b>.`,
  nombres: ["Ana", "Leo", "Sara", "Omar", "Mei", "Hugo", "Nora", "Iker"],
  frente_q: (n, right) => `${n} te mira de frente y levanta su mano <b>${right ? "derecha" : "izquierda"}</b>. ¿De qué lado la ves tú?`,
  frente_o: ["A mi izquierda", "A mi derecha"],
  frente_s: (n, right) => `Cuando alguien te mira de frente, los lados se cambian, como en un espejo: su ${right ? "derecha" : "izquierda"} queda a tu <b>${right ? "izquierda" : "derecha"}</b>.`,
};

// Primero, segundo, tercero (m1.ordinal)
S.OC = {
  ord: ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"],
  col: ["rojo", "azul", "verde", "amarillo", "morado", "naranja"],
  meta: "META",
  paso: (c, o) => `el ${c}, el ${o}`,
  carrera_s: (steps, c, o) => `Contamos desde la meta: ${steps}. El coche ${c} llega el <b>${o}</b>.`,
  lugar_q: c => `¡Carrera de coches! La meta es la bandera de cuadros. ¿En qué lugar llega el coche <b>${c}</b>?`,
  color_q: o => `¡Carrera de coches! La meta es la bandera de cuadros. ¿De qué color es el coche que llega el <b>${o}</b>?`,
  lee_q: n => `¿Cómo se lee <b>${n}.º</b>?`,
  lee_s: (n, o, w) => `${n}.º es el que ocupa el lugar ${n}: se lee «<b>${o}</b>». «${cap(w)}» dice cuántos hay, no el lugar.`,
  esc_q: o => `¿Cómo se escribe con cifras «<b>${o}</b>»?`,
  esc_s: (o, n) => `${cap(o)} es el que ocupa el lugar ${n}: se escribe <b>${n}.º</b>, con el número, un punto y una «o» pequeñita.`,
  desp_q: o => `¿Qué ordinal va justo <b>después</b> de «${o}»?`,
  ant_q: o => `¿Qué ordinal va justo <b>antes</b> de «${o}»?`,
  sig_s: (seq, o, r, after) => `Contamos: ${seq}. ${after ? "Después" : "Antes"} del ${o} va el <b>${r}</b>.`,
  ult_q: n => `En una fila hay ${n} niños. ¿Qué lugar tiene el último?`,
  ult_s: (n, o) => `Si hay ${n}, el último ocupa el lugar ${n}: es el <b>${o}</b>.`,
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  dia_q: o => `La semana es: lunes, martes, miércoles, jueves, viernes, sábado y domingo. ¿Qué día es el <b>${o}</b>?`,
  dial_q: d => `La semana es: lunes, martes, miércoles, jueves, viernes, sábado y domingo. ¿Qué lugar ocupa el <b>${d}</b>?`,
  dia_s: (list, d, o) => `Contamos desde el lunes: ${list}. El ${o} es el <b>${d}</b>.`,
};

// Líneas abiertas y cerradas (m1.lineas)
S.LN = {
  ac_q: "¿Cómo es esta línea?",
  ac_o: ["Abierta", "Cerrada"],
  abie_s: "Tiene dos puntas: empieza en un sitio y termina en otro. Es una línea <b>abierta</b>.",
  hueco_s: "¡Casi se cierra, pero deja un huequito! Las puntas no se tocan: es una línea <b>abierta</b>.",
  cerr_s: "No tiene puntas: da la vuelta y vuelve al mismo punto. Es una línea <b>cerrada</b>.",
  rc_q: "¿Esta línea es recta o curva?",
  rc_o: ["Recta", "Curva"],
  rc_s: ["Va siempre en la misma dirección, sin torcerse, como el borde de una regla: es una línea <b>recta</b>.", "Se va doblando, como el camino de un caracol: es una línea <b>curva</b>."],
  corral_q: ["La valla del corral es una línea cerrada. ¿Cuántas ovejas hay <b>dentro</b>?", "La valla del corral es una línea cerrada. ¿Cuántas ovejas hay <b>fuera</b>?", "¿Cuántas ovejas hay <b>en total</b>, dentro y fuera de la valla?"],
  corral_s: [(a, o, r) => `Contamos las ovejas que están dentro de la valla: hay <b>${r}</b>.`, (a, o, r) => `Contamos las ovejas que están fuera de la valla: hay <b>${r}</b>.`, (a, o, r) => `Dentro hay ${a} y fuera hay ${o}: ${a} + ${o} = <b>${r}</b>.`],
  let_q: "¿Cuál de estas se escribe con una línea <b>cerrada</b>?",
  let_s: g => `La ${g === "O" ? "letra O" : "cifra 0"} da toda la vuelta y se cierra: es una línea <b>cerrada</b>. Las otras tienen puntas: son líneas abiertas.`,
  bank_q: w => `¿Cómo es ${w}?`,
  bank_o: [["Una línea recta", "Una línea curva"], ["Una línea abierta", "Una línea cerrada"]],
  bank_s: [[w => `${cap(w)} no se tuerce: es una línea <b>recta</b>.`, w => `${cap(w)} se va doblando: es una línea <b>curva</b>.`],
    [w => `${cap(w)} empieza en un sitio y termina en otro, con dos puntas: es una línea <b>abierta</b>.`, w => `${cap(w)} da la vuelta y vuelve al mismo punto, sin puntas: es una línea <b>cerrada</b>.`]],
  // [cosa, 0 recta/curva · 1 abierta/cerrada, respuesta]
  // (un 4.º elemento, si lo hay, es la solución propia de esa cosa)
  bank: [["el borde de una regla", 0, 0], ["un lado de una hoja de papel", 0, 0], ["un hilo bien estirado entre dos clavos", 0, 0], ["el rastro de un caracol que da vueltas", 0, 1], ["un arcoíris", 0, 1],
    ["el camino de una pelota que bota", 0, 1], ["el camino que dibujas de tu casa al cole", 1, 0], ["un cordón de zapato suelto", 1, 0], ["la letra C", 1, 0], ["el número 2", 1, 0],
    ["el borde de una moneda", 1, 1], ["un aro", 1, 1], ["la valla de un corral sin ningún hueco", 1, 1], ["la línea que dibujas alrededor de tu mano hasta volver al punto de salida", 1, 1, "Rodeas la mano y vuelves al punto de salida: no quedan puntas. Es una línea <b>cerrada</b>."], ["la letra O", 1, 1]],
};

// Ayer, hoy y mañana (m1.ayerhoy)
S.AH = {
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  q: [x => `Si hoy es <b>${x}</b>, ¿qué día será mañana?`, x => `Si hoy es <b>${x}</b>, ¿qué día fue ayer?`, x => `Ayer fue <b>${x}</b>. ¿Qué día es hoy?`, x => `Mañana será <b>${x}</b>. ¿Qué día es hoy?`],
  s: [(x, r) => `Mañana es el día siguiente. Después del ${x} viene el <b>${r}</b>.`, (x, r) => `Ayer es el día anterior. Antes del ${x} va el <b>${r}</b>.`,
    (x, r) => `Hoy es el día siguiente a ayer. Después del ${x} viene el <b>${r}</b>.`, (x, r) => `Hoy es el día anterior a mañana. Antes del ${x} va el <b>${r}</b>.`],
  partes: ["mañana", "tarde", "noche"],
  partes_o: ["La mañana", "La tarde", "La noche"],
  parte_q: (p, after) => `¿Qué parte del día va justo <b>${after ? "después" : "antes"}</b> de la ${p}?`,
  parte_s: (p, r, after) => `El día va así: mañana, tarde y noche. ${after ? "Después" : "Antes"} de la ${p} va la <b>${r}</b>.`,
  act: [["desayunamos", 0], ["nos despertamos para ir al cole", 0], ["merendamos", 1], ["cenamos", 2], ["vemos la luna y las estrellas", 2], ["nos ponemos el pijama para dormir", 2]],
  act_q: w => `¿Cuándo ${w}?`,
  act_o: ["Por la mañana", "Por la tarde", "Por la noche"],
  act_s: (w, r) => `${cap(w)} <b>${r}</b>. El día va así: mañana, tarde y noche.`,
  orden: [["ponerte los calcetines", "ponerte los zapatos"], ["plantar la semilla", "ver la flor"], ["despertarte", "levantarte de la cama"], ["mojarte en la ducha", "secarte con la toalla"],
    ["poner la pasta en el cepillo", "lavarte los dientes"], ["desayunar", "cenar"], ["abrir el regalo", "jugar con el juguete nuevo"], ["ponerte el pijama", "dormirte"], ["llenar el vaso", "beberte el agua"], ["romper el huevo", "hacer la tortilla"]],
  orden_q: (first, x, y) => `¿Qué va <b>${first ? "antes" : "después"}</b>: ${x} o ${y}?`,
  orden_s: (a, b) => `<b>Primero</b>, ${a}, y <b>después</b>, ${b}. ¡Al revés no puede ser!`,
};

// Cabe más, cabe menos (m1.capacidad)
S.CP = {
  vaso_q: "¿Cómo está este vaso?",
  vaso_o: ["Lleno", "Por la mitad", "Vacío"],
  vaso_s: ["Tiene agua hasta arriba: está <b>lleno</b>.", "Tiene agua hasta la mitad: está <b>por la mitad</b>.", "No tiene nada de agua: está <b>vacío</b>."],
  recs: ["la jarra", "la botella", "el cubo", "la regadera", "la olla", "la cazuela"],
  jarras: ["la jarra roja", "la jarra azul", "la jarra verde"],
  // [recipiente, mínimo y máximo de vasos que es creíble que quepan]
  quedan_r: [["la botella", 3, 6], ["la jarra", 3, 8], ["la cazuela", 5, 10], ["la olla", 6, 10], ["la regadera", 6, 10], ["el cubo", 8, 10]],
  en: r => `En ${r}`,
  medir_q: r => `Llenamos ${r} de agua y la echamos en vasos iguales. Salen estos vasos llenos. ¿Cuántos vasos de agua caben en ${r}?`,
  medir_s: n => `Contamos los vasos llenos: caben <b>${n}</b> vasos.`,
  comp_q: (rs, ns, more) => `En ${rs[0]} caben ${ns[0]} vasos de agua${rs.length > 2 ? `; en ${rs[1]}, ${ns[1]}, y en ${rs[2]}, ${ns[2]}` : ` y en ${rs[1]}, ${ns[1]}`}. ¿Dónde cabe <b>${more ? "más" : "menos"}</b> agua?`,
  comp_s: (rs, ns, j, more) => `${ns[j]} es el número ${more ? "más grande" : "más pequeño"}: en <b>${rs[j]}</b> cabe ${more ? "más" : "menos"} agua.`,
  dif_q: (r1, a, r2, b) => `En ${r1} caben ${a} vasos de agua y en ${r2}, ${b}. ¿Cuántos vasos más caben en ${r1}?`,
  dif_s: (r1, a, r2, b) => `${a} − ${b} = <b>${a - b}</b>. En ${r1} cabe${a - b === 1 ? " 1 vaso" : `n ${a - b} vasos`} más.`,
  quedan_q: (r, n, u) => `En ${r} caben ${n} vasos de agua. Llenas ${r} y echas su agua en vasos. Ya has llenado ${u === 1 ? "1 vaso" : `${u} vasos`}. ¿Cuántos vasos más vas a llenar?`,
  quedan_s: (n, u) => `Con su agua se llenan ${n} vasos y ya ${u === 1 ? "llevas 1" : `llevas ${u}`}: ${n} − ${u} = <b>${n - u}</b> ${n - u === 1 ? "vaso" : "vasos"} más.`,
  pares: [["una bañera", "una taza"], ["un cubo", "un vaso"], ["una piscina", "una bañera"], ["un plato hondo", "una cuchara"], ["una jarra", "un vaso"], ["una cazuela", "una taza"], ["una regadera", "un vaso"], ["una botella grande", "una cuchara"]],
  pares_q: (a, b, more) => `¿Dónde cabe <b>${more ? "más" : "menos"}</b> agua: en ${a} o en ${b}?`,
  pares_s: (big, small) => `En ${big} cabe mucha más agua que en ${small}.`,
};

// Pesa más, pesa menos (m1.pesar)
S.PS = {
  nom: { sandia: "sandía", melon: "melón", botella: "botella de agua", piedra: "piedra", libro: "libro", manzana: "manzana", naranja: "naranja", fresa: "fresa", lapiz: "lápiz", pluma: "pluma", hoja: "hoja", globo: "globo", pelota: "pelota de playa" },
  art: { sandia: "la sandía", melon: "el melón", botella: "la botella de agua", piedra: "la piedra", libro: "el libro", manzana: "la manzana", naranja: "la naranja", fresa: "la fresa", lapiz: "el lápiz", pluma: "la pluma", hoja: "la hoja", globo: "el globo", pelota: "la pelota de playa" },
  mas_q: "Mira la balanza. ¿Qué pesa <b>más</b>?",
  menos_q: "Mira la balanza. ¿Qué pesa <b>menos</b>?",
  bal_s: (h, l, big) => `El platillo que baja es el ${de(h)}: ${h} pesa <b>más</b> y ${l} pesa <b>menos</b>.${big ? ` ¡Aunque ${l} es más grande! Lo grande no siempre pesa más.` : ""}`,
  // [con artículo, para el dibujo, «un…»]
  toys: [["el robot", "robot", "un robot"], ["el coche de juguete", "coche", "un coche de juguete"], ["el osito", "osito", "un osito"], ["la pelota", "pelota", "una pelota"], ["el camión", "camión", "un camión"], ["la muñeca", "muñeca", "una muñeca"]],
  cubos_q: t => `La balanza está equilibrada. ¿Cuántos cubos pesa ${t}?`,
  cubos_s: (t, n) => `Equilibrada quiere decir que los dos platillos pesan lo mismo: ${t} pesa lo mismo que <b>${n}</b> cubos.`,
  cmp_q: (a, x, b, y, more) => `${cap(a)} se equilibra con ${x} cubos y ${b}, con ${y} cubos. ¿Cuál pesa <b>${more ? "más" : "menos"}</b>?`,
  cmp_s: (t, mx, mn, more) => `${mx} cubos es más que ${mn}. Pesa ${more ? "más" : "menos"} <b>${t}</b>.`,
  dif_q: (a, x, b, y, h, l) => `${cap(a)} se equilibra con ${x} cubos y ${b}, con ${y} cubos. ${cap(h)} pesa más que ${l}. ¿Cuántos cubos más pesa?`,
  dif_s: (mx, mn, h, l) => `${cap(h)}: ${mx} cubos. ${cap(l)}: ${mn} cubos. ${mx} − ${mn} = <b>${mx - mn}</b> ${mx - mn === 1 ? "cubo" : "cubos"} más.`,
  sin_q: (a, b, more) => `¿Qué pesa <b>${more ? "más" : "menos"}</b>: ${a} o ${b}?`,
  sin_s: (h, l, big) => `${cap(h)} pesa más que ${l}: si pones los dos en una balanza, baja el platillo ${de(h)}.${big ? ` ¡Aunque ${l} es más grande!` : ""}`,
};

// Giros y recorridos (m1.giros)
const HACIA = { R: "hacia la derecha", L: "hacia la izquierda", U: "hacia arriba", D: "hacia abajo" };
S.GR = {
  gira: ["Gira a la derecha", "Gira a la izquierda", "Da media vuelta", "Da una vuelta entera"],
  otra: "da otra media vuelta",
  y: (a, b) => `${a} y después ${b}`,
  paso: (t, d) => `${cap(t)}: ahora mira ${d}.`,
  dirs: ["Hacia arriba", "Hacia la derecha", "Hacia abajo", "Hacia la izquierda"],
  giro_q: i => `Mica mira hacia arriba en el dibujo. ${i}. ¿Hacia dónde mira ahora?`,
  giro_s: (steps, d) => `${steps} Al final, Mica mira <b>${d}</b>.`,
  hacia: HACIA,
  // 3 cuadros hacia la derecha y 2 hacia arriba
  cuenta: seq => {
    const g = [];
    seq.forEach(m => { if (g.length && g[g.length - 1][0] === m) g[g.length - 1][1]++; else g.push([m, 1]); });
    const parts = g.map(([m, n], i) => `${i ? n : cuadros(n)} ${HACIA[m]}`);
    return parts.length > 1 ? parts.slice(0, -1).join(", ") + " y " + parts[parts.length - 1] : parts[0];
  },
  flechas_q: "Mica está en el cuadro rosa. ¿Qué flechas la llevan hasta la flor? (Cada flecha es un cuadro).",
  flechas_s: c => `Desde la salida, Mica tiene que avanzar ${c}. Cada flecha es un cuadro.`,
  llega_q: a => `Mica sale del cuadro rosa y sigue estas flechas: <b>${a}</b>. ¿A dónde llega?`,
  premios: ["la flor", "la hoja", "la seta"],
  premios_o: ["A la flor", "A la hoja", "A la seta"],
  llega_s: (c, p) => `Mica avanza ${c}: llega a <b>${p}</b>.`,
  cuantos_q: (a, h) => `Un robot sigue estas flechas: <b>${a}</b>. ¿Cuántos cuadros avanza ${h}?`,
  cuantos_s: (f, n, h) => `Contamos las flechas ${f}: hay ${n}. Avanza <b>${n}</b> ${n === 1 ? "cuadro" : "cuadros"} ${h}.`,
  total_q: a => `Un robot sigue estas flechas: <b>${a}</b>. ¿Cuántos cuadros avanza en total?`,
  total_s: n => `Cada flecha es un cuadro. Contamos todas las flechas: <b>${n}</b>.`,
};

// Estimar cantidades (m1.estimar)
S.ES = {
  objs: [["botones", 0], ["canicas", 1], ["pinzas", 1], ["garbanzos", 0], ["macarrones", 0]],
  nombres: ["Mei", "Hugo", "Leo", "Ana", "Sara", "Omar", "Iker", "Lucía"],
  canicas: "canicas",
  unos: t => `Unas ${t}`,
  mont_q: (o, f) => `El grupo rodeado tiene 10 ${o}. ¿${cap(cu2(f))} ${o} hay en el montón grande, más o menos?`,
  mont_s: (g, seq, t, n) => `El montón es como ${g} grupos de 10: ${seq}. Hay <b>unas ${t}</b>. (Si las contamos, hay ${n}: ¡muy cerca!)`,
  pun_q: (o, f, p) => `En un puñado caben ${uu(f)} 10 ${o}. ¿${cap(cu2(f))} ${o} hay, más o menos, en ${p} puñados?`,
  pun_s: (seq, t, o, f) => `Contamos de 10 en 10: ${seq}. Hay ${uu(f)} <b>${t}</b> ${o}.`,
  grup_q: (o, f, g, s) => `Tienes un montón de ${o}. Haces grupos de 10: salen ${g} grupos y ${s === 1 ? `sobra 1 suelt${f ? "a" : "o"}` : `sobran ${s} suelt${f ? "as" : "os"}`}. ¿${cap(cu2(f))} ${o} hay just${f ? "as" : "os"}?`,
  grup_s: (g, s, t) => `${g} grupos de 10 son ${g * 10}, y ${s} más: ${g * 10} + ${s} = <b>${t}</b>.`,
  quien_q: (o, f, a, e1, b, e2, n) => `${a} dice que en el tarro hay ${f ? "unas" : "unos"} ${e1} ${o} y ${b} dice que ${f ? "unas" : "unos"} ${e2}. ${f ? "Las" : "Los"} cuentan y hay ${n}. ¿Quién ha estimado mejor?`,
  quien_s: (n, g, b, who) => `${n} está mucho más cerca de ${g} que de ${b}: ha estimado mejor <b>${who}</b>.`,
  bien_q: (o, f, a, e, n) => `${a} dice que en la caja hay ${f ? "unas" : "unos"} ${e === 1000 ? "mil" : e} ${o}. ${f ? "Las" : "Los"} cuenta y hay ${n}. ¿Ha estimado bien?`,
  bien_o: ["Sí: está muy cerca", "No: está muy lejos"],
  bien_s: (e, n, ok) => ok ? `Estimar es decir un número cercano. ${n} está muy cerca de ${e}: ¡ha estimado <b>muy bien</b>!` : `${e === 1000 ? "Mil" : e} está muy lejos de ${n}: <b>no</b> ha estimado bien. Hay que mirar bien y compararlo con un grupo de 10.`,
};
})();
