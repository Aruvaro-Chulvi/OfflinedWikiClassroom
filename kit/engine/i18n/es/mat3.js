/* WikiAula — textos de gen/mat3.js (Matemáticas, Grado 3), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m3 = G.m3 || {};
const cu = fem => fem ? "Cuántas" : "Cuántos";
const NUM = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const DEN = ["", "", "medio", "tercio", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"];
const hm = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
const HORAS = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const MINS = { 5: "cinco", 10: "diez", 15: "cuarto", 20: "veinte", 25: "veinticinco", 30: "media", 35: "treinta y cinco", 40: "cuarenta", 45: "cuarenta y cinco", 50: "cincuenta", 55: "cincuenta y cinco" };
// Saltos para contar el tiempo hacia delante: primero las horas enteras, luego hasta la hora en punto y lo que falta
function saltos(h, m, d) {
  const out = [];
  let H = h, M = m, left = d;
  while (left >= 60) { H++; left -= 60; out.push(`Sumo 1 hora: ${hm(H, M)}.`); }
  if (left && M + left >= 60 && M) { const a = 60 - M; H++; M = 0; left -= a; out.push(`Sumo ${a} minutos: ${hm(H, M)}.`); }
  if (left) { M += left; out.push(`Sumo ${left === d ? left : `los ${left}`} minutos${left === d ? "" : " que faltan"}: ${hm(H, M)}.`); }
  return out.join(" ");
}
Object.assign(S, {
  // nombres de personas (14, en este orden: el generador sabe por la posición quién es chica: 0, 2, 4, 6, 8, 10 y 12)
  nombres: ["Lucía", "Hugo", "Sara", "Leo", "Nora", "Mateo", "Alba", "Omar", "Irene", "Bruno", "Aisha", "Iker", "Mei", "Dani"],
  // casillas de la tabla de valores (m3.decmillar: «la cifra 4 está en las centenas»)
  pos: ["las unidades", "las decenas", "las centenas", "las unidades de millar", "las decenas de millar"],
  um_q: n => `¿Cuántas unidades de millar, centenas, decenas y unidades tiene <b>${n}</b>?`,
  um_f: ["UM", "C", "D", "U"],
  um_s: (n, d) => `${n} = ${d[0]} UM + ${d[1]} C + ${d[2]} D + ${d[3]} U = ${d[0] * 1000} + ${d[1] * 100} + ${d[2] * 10} + ${d[3]}.`,
  cuantasd_q: n => `¿Cuántas <b>decenas</b> hay en ${n}? (Todas las decenas, no solo la cifra de su casilla.)`,
  cuantasd_s: (n, a, b, c, r) => `${n} son ${a} ${a === 1 ? "millar" : "millares"}, ${b} ${b === 1 ? "centena" : "centenas"} y ${c} ${c === 1 ? "decena" : "decenas"}. ${a === 1 ? "1 millar son" : `${a} millares son`} ${a * 100} decenas y ${b === 1 ? "1 centena es" : `${b} centenas son`} ${b * 10}: ${a * 100} + ${b * 10} + ${c} = <b>${r}</b> decenas (${r} barras de diez). En la casilla de las decenas solo está la cifra ${c}.`,
  cuantasc_q: n => `¿Cuántas <b>centenas</b> hay en ${n}? (Todas las centenas, no solo la cifra de su casilla.)`,
  cuantasc_s: (n, a, b, r) => `${n} son ${a} ${a === 1 ? "millar" : "millares"} y ${b} ${b === 1 ? "centena" : "centenas"}. ${a === 1 ? "1 millar son" : `${a} millares son`} ${a * 10} centenas: ${a * 10} + ${b} = <b>${r}</b> centenas (${r} placas de cien). En la casilla de las centenas solo está la cifra ${b}.`,
  desc_q: p => `¿Qué número es <b>${p}</b>?`,
  desc_s: (p, n) => `Sumamos: ${p} = <b>${n}</b>.`,
  valor_q: (n, d) => `En el número <b>${n}</b>, ¿cuánto vale la cifra <b>${d}</b>?`,
  valor_s: (d, pos, v) => `La cifra ${d} está en ${pos}, así que vale <b>${v}</b>.`,
  letras_q: w => `Escribe con cifras: <b>${w}</b>.`,
  letras2_q: n => `¿Cómo se lee el número <b>${n}</b>?`,
  letras_s: (w, n) => `<b>${n}</b> se lee <b>${w}</b>.`,
  comp_q: (a, b) => `Elige el signo: <b>${a} ☐ ${b}</b>`,
  comp_s: (st, a, b, k) => `${st} Así que <b>${a} ${k ? "&lt;" : "&gt;"} ${b}</b>.`,
  comp_len: (a, la, b, lb) => `${a} tiene ${la === 5 ? "cinco" : "cuatro"} cifras y ${b} tiene ${lb === 5 ? "cinco" : "cuatro"}: el que tiene más cifras es el mayor.`,
  comp_eq: (p, x) => `${["U", "D", "C", "UM", "DM"][p]}: ${x} y ${x}, iguales.`,
  comp_dif: (p, x, y) => `${["U", "D", "C", "UM", "DM"][p]}: ${x} y ${y}, ¡distintas! ${x} ${x > y ? "&gt;" : "&lt;"} ${y}.`,
  ordenar_q: s => `Ordena de <b>menor a mayor</b>: ${s}`,
  ordenar_s: (s1, s2, s3, r) => `Comparo los números de dos en dos, desde la izquierda.<br>${s1}<br>${s2}<br>${s3}<br>Orden: <b>${r}</b>.`,
  mayor_q: s => `¿Cuál es el número <b>mayor</b>? ${s}`,
  menor_q: s => `¿Cuál es el número <b>menor</b>? ${s}`,
  orden_s: (s, r) => `Ordenados: ${s}. La respuesta es <b>${r}</b>.`,
  redp: ["las decenas", "las centenas", "los millares"],
  red_q: (n, p) => `Redondea <b>${n}</b> a ${p}.`,
  // p: casilla a la que se redondea (1 decenas…); nine: la cifra de esa casilla es 9 y sube
  red_s: (p, look, up, nine, r) => {
    const cas = ["las unidades", "las decenas", "las centenas", "los millares", "las decenas de millar"], uno = ["", "decena", "centena", "millar", "decena de millar"];
    return `Redondeamos a ${cas[p]}, así que miramos la cifra de ${cas[p - 1]} (la que está justo a su derecha): es ${look}. ` +
      (up ? `Como es 5 o más, ${cas[p]} suben 1${nine ? `. Eran 9: al subir pasan a 10, ¡y 10 de ${p === 3 ? "ellos" : "ellas"} son 1 ${uno[p + 1]} más! Por eso cambia también la cifra de su izquierda` : ""}` : `Como es menor que 5, ${cas[p]} no cambian`) +
      `, y lo que hay a su derecha pasa a ceros: <b>${r}</b>.`;
  },
  ord: ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo", "undécimo", "duodécimo",
    "decimotercero", "decimocuarto", "decimoquinto", "decimosexto", "decimoséptimo", "decimoctavo", "decimonoveno", "vigésimo"],
  ord_q: n => `¿Cómo se lee <b>${n}.º</b>?`,
  ord_s: (n, w) => `${n}.º se lee <b>${w}</b>.`,
  ord2_q: w => `Escribe con número el ordinal <b>${w}</b> (solo el número, sin el «.º»).`,
  ord2_s: (n, w) => `<b>${w.charAt(0).toUpperCase() + w.slice(1)}</b> es el puesto ${n}: se escribe <b>${n}.º</b>.` + (n > 12 && n < 20 ? ` «Decimo» es el 10 y «${S.ord[n - 11]}», el ${n - 10}: 10 + ${n - 10} = ${n}.` : ""),
  fila_q: (N, t, k, fem) => `En una fila hay ${t} personas. ${N} es ${fem ? `la ${k}.ª` : `el ${k}.º`} empezando por delante. ¿Qué puesto ocupa contando desde atrás?`,
  fila_s: (t, k, r, fem) => `Detrás de ${fem ? "ella" : "él"} hay ${t} − ${k} = ${t - k} ${t - k === 1 ? "persona" : "personas"}, así que contando desde atrás ocupa el puesto ${t - k} + 1 = <b>${r}</b>.`,
  op_q: e => `Calcula <b>${e}</b>.`,
  op_s: (add, r) => `Sumamos en columna, empezando por las unidades y llevando cuando una columna pasa de 9. Resultado: <b>${r}</b>.`,
  // suma en columna: x o y son null si ese número ya no tiene cifra en esa columna; last: última columna (se escribe entero)
  su_col: (p, x, y, carry, s, last) => {
    const col = ["Unidades", "Decenas", "Centenas", "Unidades de millar", "Decenas de millar"][p];
    const terms = [x, y].filter(v => v !== null).concat(carry ? [1] : []);
    const cuenta = terms.length > 1 ? `${terms.join(" + ")} = ${s}` : `${s}`;
    if (terms.length === 1 && !carry) return `${col}: solo hay un ${s}. Lo bajo: <b>${s}</b>.`;
    if (s < 10) return `${col}: ${cuenta}. Escribo <b>${s}</b>.`;
    return last ? `${col}: ${cuenta}. Como es la última columna, escribo <b>${s}</b>.` : `${col}: ${cuenta}. Escribo <b>${s % 10}</b> y me llevo 1.`;
  },
  suma_s: (st, r) => `Sumamos en columna, empezando por las unidades. Si una columna llega a 10 o más, escribo las unidades y me llevo una a la columna de la izquierda.<br>${st.join("<br>")}<br>Resultado: <b>${r}</b>.`,
  // resta en columna, como en la lección: «le pongo un 1 delante y me llevo una» a la cifra de abajo de la columna siguiente
  rs_col: (p, top, b0, has, carry, borrow, r, lead) => {
    const col = ["Unidades", "Decenas", "Centenas", "Unidades de millar", "Decenas de millar"][p], btm = b0 + carry;
    const bot = carry ? (has ? `abajo, ${b0} + 1 = ${btm}. ` : "abajo, solo la que me llevo: 1. ") : "";
    if (!has && !carry) return `${col}: abajo no hay nada. Bajo el <b>${top}</b>.`;
    if (lead) return `${col}: ${bot}${top} − ${btm} = 0 (un 0 a la izquierda no se escribe).`;
    if (borrow) return `${col}: ${bot}${top} − ${btm} no se puede: le pongo un 1 delante, ${top + 10} − ${btm} = <b>${r}</b>, y me llevo 1.`;
    return `${col}: ${bot}${top} − ${btm} = <b>${r}</b>.`;
  },
  resta_s: (steps, a, b, r) => `Restamos en columna, empezando por las unidades. Cuando arriba hay menos, le ponemos un 1 delante y nos llevamos una, que se suma a la cifra de abajo de la columna siguiente.<br>${steps.join("<br>")}<br>${a} − ${b} = <b>${r}</b>. Prueba: ${r} + ${b} = ${a}.`,
  est_q: (e, p) => `Estima <b>${e}</b> redondeando cada número a ${p}.`,
  est_s: (a, b, add, e, exact) => `Redondeamos: ${a} ${add ? "+" : "−"} ${b} = <b>${e}</b>. (El resultado exacto es ${exact}: la estimación está cerca.)`,
  pb_q: [
    (N, a, b, c) => `Una biblioteca tiene ${a} libros. Presta ${b} el lunes y ${c} el martes. ¿Cuántos libros quedan en las estanterías?`,
    (N, n, p, pay) => `${N} compra ${n} entradas de cine a ${p} € cada una y paga con ${pay} €. ¿Cuántos euros le devuelven?`,
    (a, b) => `Una granja recoge ${a} kg de patatas el primer año y ${b} kg más el segundo año. ¿Cuántos kilos recoge entre los dos años?`,
    (f, m, g) => `En un teatro hay ${f} filas de ${m} butacas. Si hay ${g} butacas ocupadas, ¿cuántas quedan libres?`],
  pb_s: [
    (a, b, c, p, r) => `Después del lunes quedan ${a} − ${b} = ${p}. Después del martes, ${p} − ${c} = <b>${r}</b>.`,
    (n, p, t, pay, r) => `Las entradas cuestan ${n} × ${p} = ${t} €. Le devuelven ${pay} − ${t} = <b>${r} €</b>.`,
    (a, b2, r) => `El segundo año recoge ${b2} kg. Entre los dos: ${a} + ${b2} = <b>${r} kg</b>.`,
    (f, m, t, g, r) => `En total hay ${f} × ${m} = ${t} butacas. Libres: ${t} − ${g} = <b>${r}</b>.`],
  // multiplicar por una cifra, columna a columna: v = cifra × b + lo que me llevaba
  mu_col: (p, x, b, carry, v, last) => {
    const col = ["Unidades", "Decenas", "Centenas", "Unidades de millar", "Decenas de millar"][p];
    const cuenta = carry ? `${x} × ${b} = ${x * b}, más ${carry} que me llevaba: ${v}` : `${x} × ${b} = ${v}`;
    if (last) return `${col}: ${cuenta}. Como ya no hay más cifras, escribo <b>${v}</b>.`;
    return v >= 10 ? `${col}: ${cuenta}. Escribo <b>${v % 10}</b> y me llevo ${Math.floor(v / 10)}.` : `${col}: ${cuenta}. Escribo <b>${v}</b>.`;
  },
  mult1_s: (st, r) => `Multiplicamos cada cifra, empezando por las unidades. Si sale 10 o más, escribo las unidades y me llevo las decenas, que se suman después de multiplicar la cifra siguiente.<br>${st.join("<br>")}<br>Resultado: <b>${r}</b>.`,
  m10_s: (z, a, r) => `Al multiplicar por 1${"0".repeat(z)}, cada cifra de ${a} salta ${z === 1 ? "un lugar" : `${z} lugares`} a la izquierda y ${z === 1 ? "el hueco se llena con un cero" : `los ${z} huecos se llenan con ceros`}: se ${z === 1 ? "añade un cero" : `añaden ${z} ceros`} al final. <b>${r}</b>.`,
  m10r_s: (d, b, p, nz, a, r) => `${a} son ${d} ${nz === 1 ? "decenas" : "centenas"}. Multiplico sin los ceros: ${d} × ${b} = ${p}. Añado ${nz === 1 ? "el cero" : "los dos ceros"} del ${a}: <b>${r}</b>.`,
  facil_q: e => `Calcula de la forma más fácil: <b>${e}</b>.`,
  facil_s: (p, q, pq, m, r) => `Busco la pareja que da un número redondo: ${p} × ${q} = ${pq}. Después, ${pq} × ${m} = <b>${r}</b>. (El orden y la forma de agrupar no cambian el resultado.)`,
  partir_q: (m, n) => `Calcula <b>${m} × ${n}</b> partiendo el ${n} en 10 + ${n - 10}.`,
  partir_s: (m, c, a, b, r) => `Parto el ${10 + c} en 10 + ${c}. ${m} × 10 = ${a} y ${m} × ${c} = ${b}. Sumo: ${a} + ${b} = <b>${r}</b>.`,
  mult2_s: (a, d, u, pu, pd, r) => `Multiplicamos por las unidades: ${a} × ${u} = ${pu}. Después por las decenas: ${a} × ${d}0 = ${pd}. Sumamos: <b>${r}</b>.`,
  hueco_q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  pm_dist_s: (m, c) => `Propiedad distributiva: parto el ${10 + c} en 10 + ${c}, multiplico cada trozo por ${m} y sumo: ${m} × ${10 + c} = ${m} × 10 + ${m} × ${c}. El hueco es <b>${c}</b>.`,
  pm_s: ["Propiedad conmutativa: el orden de los factores no cambia el producto.", "Propiedad asociativa: da igual cómo agrupemos los factores.", "Propiedad distributiva: multiplicar por una suma es multiplicar por cada sumando y sumar.", "Multiplicar por 1 deja el número igual. El hueco es <b>1</b>.", "Cualquier número multiplicado por 0 da <b>0</b>."],
  // [cosa, recipiente, femenino, cuántas trae cada uno (cantidades creíbles)]
  paq: [["lápices", "cajas", 1, [12, 24, 36, 48]], ["huevos", "hueveras", 1, [6, 12]], ["huevos", "bandejas", 1, [30]], ["cromos", "sobres", 0, [5, 6, 8, 10]],
    ["botellas", "cajas", 1, [6, 12, 24]], ["galletas", "paquetes", 0, [12, 16, 20, 24, 30, 36]], ["libros", "estanterías", 1, [15, 20, 25, 30, 35, 40]], ["butacas", "filas", 1, [14, 16, 18, 20, 22, 24]]],
  pmq: (n, cont, per, obj, fem) => `Hay ${n} ${cont} con ${per} ${obj} en cada una${fem ? "" : ""}. ¿Cuántos ${obj} hay en total?`.replace("en cada una", fem ? "en cada una" : "en cada uno").replace(/Cuántos (galletas|botellas|butacas)/, "Cuántas $1"),
  pms: (n, cont, per, a, b, steps) => `Hay ${n} grupos iguales (${n} ${cont}) de ${per}: es una multiplicación. En columna pongo arriba el número más largo: ${a} × ${b}.<br>${steps}`,
  objs: [["caramelos", 0], ["canicas", 1], ["cromos", 0], ["galletas", 1], ["pegatinas", 1], ["lápices", 0], ["fresas", 1]],
  rep_q: (N, n, obj, k, fem) => `${N} reparte ${n} ${obj} entre ${k} amigos a partes iguales. ¿${cu(fem)} le tocan a cada uno?`,
  rep_s: (n, k, r) => `${n} : ${k} = <b>${r}</b>, porque ${k} × ${r} = ${n}.`,
  agr_q: (N, n, obj, k, fem) => `${N} tiene ${n} ${obj} y ${fem ? "las" : "los"} mete en bolsas de ${k}. ¿Cuántas bolsas llena?`,
  agr_s: (n, k, r) => `Hacemos grupos de ${k}: ${n} : ${k} = <b>${r}</b> bolsas, porque ${k} × ${r} = ${n}.`,
  ex_q: (D, d) => `¿La división <b>${D} : ${d}</b> es exacta o entera?`,
  ex_o: ["Exacta", "Entera"],
  ex_s: (D, d, q, r) => `${D} = ${d} × ${q} + ${r}. Cociente ${q} y resto ${r}: ${r ? "como el resto no es 0, es <b>entera</b>" : "como el resto es 0, es <b>exacta</b>"}.`,
  div_q: (D, d) => `Haz la división <b>${D} : ${d}</b>.`,
  div_f: ["Cociente", "Resto"],
  dv_dos: (a, d, n) => `${a} es menor que ${d}: no llega. Tomo dos cifras: ${n}.`,
  dv_paso: (n, d, q, p, r) => `${n} entre ${d} toca a <b>${q}</b>. ${d} × ${q} = ${p}, ${r === 1 ? "sobra 1" : `sobran ${r}`}.`,
  dv_cero: (n, d) => `${n} entre ${d} no llega: toca a <b>0</b>. Escribo un 0 en el cociente y ${n === 1 ? "sobra 1" : `sobran ${n}`}.`,
  dv_baja: (c, n) => `Bajo el ${c}: tengo ${n}.`,
  div1_s: (st, D, d, q, r) => `Dividimos cifra a cifra, de izquierda a derecha.<br>${st.join("<br>")}<br>Cociente <b>${q}</b> y resto <b>${r}</b>. Prueba: ${d} × ${q} + ${r} = ${D}.`,
  pr_q: (d, q, r) => `En una división, el divisor es ${d}, el cociente ${q} y el resto ${r}. ¿Cuál es el dividendo?`,
  pr_s: (d, q, r, D) => `Dividendo = divisor × cociente + resto = ${d} × ${q} + ${r} = <b>${D}</b>.`,
  pr2_q: (D, d, q, r) => `Alguien dice que ${D} : ${d} da cociente ${q} y resto ${r}. ¿Es correcto?`,
  pr2_o: ["Sí", "No"],
  pr2_s: (d, q, r, t, D, wrong) => `Hacemos la prueba: ${d} × ${q} + ${r} = ${t}. ${wrong ? `No da ${D}: <b>no</b> es correcto.` : `Da ${D}, y el resto (${r}) es menor que el divisor (${d}): <b>sí</b> es correcto.`}`,
  pr3_s: (d, q, r, D, q2, r2) => `Hacemos la prueba: ${d} × ${q} + ${r} = ${D}. Da ${D}, pero el resto (${r}) no es menor que el divisor (${d}): ¡cabía otra vez! <b>No</b> es correcto. Lo bueno es cociente ${q2} y resto ${r2}.`,
  globos: ["rojos", "verdes", "amarillos"],   // m3.fracdibujo: los globos de color (fg_q, fg_s)
  fd_q: "¿Qué fracción de la figura está coloreada?",
  frac_hint: "Escribe la fracción con una barra, por ejemplo 3/4.",
  fd_s: (n, d) => `La figura tiene ${d} partes iguales (denominador) y hay ${n} ${n === 1 ? "coloreada" : "coloreadas"} (numerador): <b>${n}/${d}</b>.`,
  fd2_q: "¿Qué fracción de la figura <b>no</b> está coloreada?",
  fd2_s: (n, d) => `La figura tiene ${d} partes iguales y ${n === 1 ? "hay 1 coloreada" : `hay ${n} coloreadas`}. Quedan sin colorear ${d} − ${n} = ${d - n}: <b>${d - n}/${d}</b>.`,
  fg_q: (d, n, c) => `Hay ${d} globos y ${n} ${n === 1 ? "es " + c.replace(/s$/, "") : "son " + c}. ¿Qué fracción de los globos son ${c}?`,
  fg_s: (d, n, c) => `El grupo entero son ${d} globos (denominador) y ${n} ${n === 1 ? "es " + c.replace(/s$/, "") : "son " + c} (numerador): <b>${n}/${d}</b>.`,
  // fracción de una cantidad con historia: (numerador, denominador, total)
  fq_ctx: [
    (n, d, N) => `Tienes ${N} cromos y regalas ${n}/${d} de ellos. ¿Cuántos cromos regalas?`,
    (n, d, N) => `En el huerto hay ${N} fresas maduras y recogéis ${n}/${d}. ¿Cuántas fresas recogéis?`,
    (n, d, N) => `Un libro tiene ${N} páginas y Nora ya ha leído ${n}/${d}. ¿Cuántas páginas ha leído?`,
    (n, d, N) => `En el autobús van ${N} niños y ${n}/${d} llevan gorra. ¿Cuántos niños llevan gorra?`,
    (n, d, N) => `Una bolsa trae ${N} caramelos y das ${n}/${d} a tus amigos. ¿Cuántos caramelos das?`],
  fname: (n, d) => `${NUM[n]} ${DEN[d]}${n > 1 ? "s" : ""}`.replace("un medios", "un medio"),
  fl_q: w => `Escribe con números la fracción <b>${w}</b>.`,
  fl2_q: (n, d) => `¿Cómo se lee la fracción <b>${n}/${d}</b>?`,
  fl_s: (w, n, d) => `<b>${n}/${d}</b> se lee <b>${w}</b>: el numerador (${n}) se lee como un número y el denominador (${d}) da el nombre de las partes.`,
  fc_q: (a, c, b, d) => `Elige el signo: <b>${a}/${c} ☐ ${b}/${d}</b>`,
  fc_s1: (a, b, c, k) => `Las dos tienen el mismo denominador (${c} partes): es mayor la que tiene más partes. <b>${a}/${c} ${k ? "&lt;" : "&gt;"} ${b}/${c}</b>.`,
  fc_s2: (a, c, d, k) => `Tienen el mismo numerador: cuantas más partes tenga el entero, más pequeña es cada una. <b>${a}/${c} ${k ? "&lt;" : "&gt;"} ${a}/${d}</b>.`,
  fq_q: (n, d, N) => `¿Cuánto es <b>${n}/${d} de ${N}</b>?`,
  fq_s: (N, d, p, n, r) => `Primero dividimos entre el denominador: ${N} : ${d} = ${p}. Después multiplicamos por el numerador: ${p} × ${n} = <b>${r}</b>.`,
  conv_q: (v, a, b) => `¿Cuántos <b>${b}</b> son <b>${v} ${a}</b>?`,
  conv_s: (a, f, b, v, r) => `1 ${a} = ${f} ${b}, así que ${v} ${a} = ${v} × ${f} = <b>${r} ${b}</b>.`,
  conv2_s: (a, f, b, v, r) => `1 ${a} = ${f} ${b}, así que ${v} ${b} = ${v} : ${f} = <b>${r} ${a}</b>.`,
  gr_w: ["medio kilo", "un cuarto de kilo", "tres cuartos de kilo", "kilo y medio"],   // 500, 250, 750 y 1500 g
  gr_q: w => `¿Cuántos gramos son <b>${w}</b>?`,
  gr_s: (w, r) => `1 kg = 1000 g, así que ${w} son <b>${r} g</b>.`,
  bal_q: (a, b) => `En una balanza hay ${a} g de harina y ${b} g de azúcar. ¿Cuántos gramos faltan para llegar a 1 kg?`,
  bal_s: (a, b, s, r) => `Hay ${a} + ${b} = ${s} g. Como 1 kg = 1000 g, faltan 1000 − ${s} = <b>${r} g</b>.`,
  ml_w: ["medio litro", "un cuarto de litro", "litro y medio", "tres cuartos de litro"],   // 500, 250, 1500 y 750 mL
  ml_q: w => `¿Cuántos mililitros son <b>${w}</b>?`,
  ml_s: (w, r) => `1 L = 1000 mL, así que ${w} son <b>${r} mL</b>.`,
  vasos_q: (L, b) => `¿Cuántos vasos de ${b} mL se pueden llenar con una jarra de ${L} ${L === 1 ? "litro" : "litros"}?`,
  vasos_s: (L, ml, b, r) => `${L} L = ${ml} mL. ${ml} : ${b} = <b>${r}</b> vasos.`,
  // medidas con dos unidades y comparar medidas en unidades distintas
  mc_q: (a, g, b, p) => `¿Cuántos <b>${p}</b> son <b>${a} ${g} y ${b} ${p}</b>?`,
  mc_s: (a, g, b, p, f, af, r) => `1 ${g} = ${f} ${p}, así que ${a} ${g} = ${a} × ${f} = ${af} ${p}. Con los ${b} ${p}: ${af} + ${b} = <b>${r} ${p}</b>.`,
  mc2_q: (v, p, g) => `Escribe <b>${v} ${p}</b> en ${g} y ${p}.`,
  mc2_s: (v, p, g, f, a, af, b) => `1 ${g} = ${f} ${p}. En ${v} ${p} caben ${a} ${g} (${af} ${p}) y sobran ${b} ${p}: <b>${a} ${g} y ${b} ${p}</b>.`,
  mc_w: ["es más largo", "pesa más", "tiene más capacidad"],
  mc_igual: "Son iguales",
  mc3_q: (w, a, b) => `¿Qué ${w}: <b>${a}</b> o <b>${b}</b>?`,
  mc3_s: (a, g, af, p, v, good) => `Para comparar, pongo las dos en la misma unidad: ${a} ${g} = ${af} ${p}, y la otra es ${v} ${p}. Gana la que tiene más: <b>${good}</b>.`,
  hora_q: "¿Qué hora marca el reloj? Escribe las horas y los minutos.",
  hm_f: ["Horas", "Minutos"],
  hora_s: (h, m) => {
    if (!m) return `La aguja larga está en el 12: es en punto, 0 minutos. La aguja corta está en el ${h}. ${h === 1 ? "Es la" : "Son las"} <b>${hm(h, m)}</b>.`;
    const n = Math.floor(m / 5), r = m % 5, base = n ? `está en el ${n}: ${n} × 5 = ${n * 5} minutos` : "acaba de pasar el 12";
    const larga = r ? `La aguja larga ${n ? `ha pasado el ${n} (${n} × 5 = ${n * 5} minutos)` : "ha pasado el 12"} y ${r === 1 ? "1 rayita más" : `${r} rayitas más`}: ${n * 5} + ${r} = ${m} minutos.` : `La aguja larga ${base}.`;
    return `${larga} La aguja corta ha pasado el ${h}. ${h === 1 ? "Es la" : "Son las"} <b>${hm(h, m)}</b>.`;
  },
  // cómo se dice la hora: «las tres y cuarto», «las cinco menos diez»
  diceY: (h, m) => `${h === 1 ? "la una" : `las ${HORAS[h]}`} y ${MINS[m]}`,
  diceMenos: (h, m) => `${h === 1 ? "la una" : `las ${HORAS[h]}`} menos ${MINS[m]}`,
  dice: (h, m) => m <= 30 ? S.diceY(h, m) : S.diceMenos(h % 12 + 1, 60 - m),
  dice_q: t => `¿Cómo se dice la hora <b>${t}</b>?`,
  dice_s: (h, m, good) => m <= 30
    ? `Los ${m} minutos están en la mitad de la derecha del reloj: decimos «y» y los minutos que han pasado. Se dice <b>${good}</b>.`
    : `Los ${m} minutos están en la mitad de la izquierda: decimos «menos» y los minutos que faltan para la hora siguiente, ${h % 12 + 1 === 1 ? "la" : "las"} ${h % 12 + 1}: 60 − ${m} = ${60 - m}. Se dice <b>${good}</b>.`,
  h24_q: (h, m) => `${h === 1 ? "Es la" : "Son las"} ${hm(h, m)} de la ${h <= 7 ? "tarde" : "noche"}. ¿Qué marca un reloj digital de 24 horas?`,
  h24_s: (h, m) => `Desde la una de la tarde, la hora se escribe sumando 12: ${h} + 12 = ${h + 12}. Marca las <b>${hm(h + 12, m)}</b>.`,
  // qué dura: 0 poco (un capítulo), 1 un rato (el entrenamiento), 2 mucho (la película)
  dur_q: (h, m, d, c) => `${["Un capítulo de dibujos", "El entrenamiento", "La película"][c ?? 2]} empieza a las ${hm(h, m)} y dura ${d >= 60 ? `${Math.floor(d / 60)} h${d % 60 ? ` y ${d % 60} min` : ""}` : `${d} minutos`}. ¿A qué hora termina?`,
  dur_s: (h, m, d, H2, M2) => `Cuento hacia delante a saltos (60 minutos = 1 hora). ${saltos(h, m, d)} Termina a las <b>${hm(H2, M2)}</b>.`,
  cuanto_q: (h, m, H2, M2, c) => `${["Un capítulo de dibujos", "El entrenamiento", "La película"][c]} empieza a las ${hm(h, m)} y termina a las ${hm(H2, M2)}. ¿Cuánto dura? Escribe las horas y los minutos.`,
  cuanto_s: (h, m, H2, M2, d) => `Cuento hacia delante desde las ${hm(h, m)} hasta las ${hm(H2, M2)}. ${saltos(h, m, d)} En total, <b>${Math.floor(d / 60)} h y ${d % 60} min</b>.`,
  // [cosa, precio mínimo y máximo en céntimos]
  papeleria: [["un cuaderno", 120, 450], ["un bolígrafo", 50, 250], ["una goma de borrar", 30, 120], ["un lápiz", 40, 150], ["un estuche", 300, 900],
    ["una carpeta", 150, 400], ["un rotulador", 80, 250], ["una regla", 80, 300], ["un sacapuntas", 50, 200], ["un pegamento de barra", 100, 300]],
  juguetes: [["Un yoyó", 150, 450], ["Una pelota", 300, 900], ["Un puzle", 500, 1500], ["Un cómic", 300, 900], ["Una cometa", 600, 1600], ["Un libro de cuentos", 800, 1900], ["Un juego de cartas", 300, 800]],
  din_q: (x, a, y, b) => `Compras ${x} de ${a} y ${y} de ${b}. ¿Cuánto pagas en total?`,
  eur_f: "€",   // casilla de los euros (la de los céntimos es «cent»)
  cent: "Céntimos",
  din_s: (a, b, s, t) => `Sumamos los céntimos y los euros por separado (100 céntimos = 1 €): en total, <b>${t}</b>.`,
  vuelta_q: (t, a, pay) => `${t} cuesta ${a} y pagas con un billete de ${pay} €. ¿Cuánto te devuelven?`,
  vsalto: (x, y, d) => `de ${x} a ${y}, ${d}`,
  vuelta_s: (js, sum, e, c, t) => `Cuento desde el precio hasta lo que pago, a saltos: ${js.join("; ")}. Junto los saltos: ${sum}${js.length > 1 ? ` = ${e ? `${e} € y ` : ""}${c} c` : ""}. Te devuelven <b>${t}</b>.`,
  ang_q: "¿Qué tipo de ángulo es?",
  angr_q: h => `¿Qué ángulo forman las agujas del reloj a ${h === 1 ? "la una" : `las ${h}`} en punto?`,
  angr_s: (h, d, c) => `La aguja larga está en el 12 y la corta en el ${h}: entre las dos hay ${d === 1 ? "1 número" : `${d} números`} de la esfera (por el lado más corto). ` + ["Están juntas, más que la esquina de un folio: <b>agudo</b>.", "Forman una esquina como la de un folio (un cuarto de vuelta): <b>recto</b>.", "Están más abiertas que la esquina de un folio: <b>obtuso</b>."][c],
  angc_q: big => `¿Cuál de estos tres ángulos es el más <b>${big ? "abierto" : "cerrado"}</b>?`,
  angc_s: (big, l) => `Lo que importa es cuánto se abren los lados, no lo largos que sean ni hacia dónde miren. El más ${big ? "abierto" : "cerrado"} es el <b>${l}</b>.`,
  ang_o: ["Agudo", "Recto", "Obtuso"],
  ang_s: ["Es más pequeño que la esquina de un folio: <b>agudo</b>.", "Es como la esquina de un folio (lo marca el cuadradito): <b>recto</b>.", "Es más abierto que la esquina de un folio: <b>obtuso</b>."],
  rec_q: "¿Cómo son estas dos rectas?",
  rec_o: ["Paralelas", "Perpendiculares", "Secantes (no perpendiculares)"],
  rec_s: ["Nunca se cortan, aunque las alarguemos: son <b>paralelas</b>.", "Se cortan formando ángulos rectos: son <b>perpendiculares</b>.", "Se cortan, pero sin formar ángulos rectos: son <b>secantes</b>."],
  el_w: ["lados", "vértices", "ángulos"],
  el_q: w => `¿Cuántos <b>${w}</b> tiene este polígono?`,
  el_s: (n, w) => `Tiene <b>${n}</b> ${w}. En un polígono hay tantos lados como vértices y como ángulos.`,
  cu_q: "¿Qué cuadrilátero es?",
  cu_o: ["Cuadrado", "Rectángulo", "Rombo", "Trapecio", "Trapezoide"],
  cu_s: ["4 lados iguales y 4 ángulos rectos (los cuadraditos): <b>cuadrado</b>. Aunque esté girado, sigue siendo un cuadrado.", "4 ángulos rectos (los cuadraditos) y los lados de enfrente miden lo mismo: <b>rectángulo</b>.", "4 lados iguales pero sin ángulos rectos: <b>rombo</b>.", "Solo dos lados paralelos: <b>trapecio</b>.", "Ningún lado es paralelo a otro: <b>trapezoide</b>."],
  tr_q: s => `Un triángulo tiene lados de ${s}. ¿Cómo es?`,
  tr_o: ["Equilátero", "Isósceles", "Escaleno"],
  tr_s: ["Los tres lados son iguales: <b>equilátero</b>.", "Tiene dos lados iguales: <b>isósceles</b>.", "Los tres lados son distintos: <b>escaleno</b>."],
  per_rect_q: "¿Cuál es el perímetro de este rectángulo, en cm?",
  per_q: s => `Un polígono tiene lados de ${s}. ¿Cuál es su perímetro, en cm?`,
  regn: ["Un triángulo equilátero", "Un cuadrado", "Un pentágono", "Un hexágono"],
  per_reg_q: (w, a) => `${w} tiene todos sus lados iguales, de ${a} cm cada uno. ¿Cuál es su perímetro, en cm?`,
  per_s: (sum, r) => `El perímetro es la suma de todos los lados: ${sum} = <b>${r} cm</b>.`,
  diam_q: r => `Una circunferencia tiene ${r} cm de radio. ¿Cuánto mide su diámetro?`,
  diam_s: (r, d) => `El diámetro es el doble del radio: 2 × ${r} = <b>${d} cm</b>.`,
  rad_q: d => `Una circunferencia tiene ${d} cm de diámetro. ¿Cuánto mide su radio?`,
  rad_s: (d, r) => `El radio es la mitad del diámetro: ${d} : 2 = <b>${r} cm</b>.`,
  cc_q: ["¿Cómo se llama la línea curva cerrada que forma el borde de una rueda?", "¿Cómo se llama la superficie plana que queda dentro de una circunferencia, como una moneda?"],
  cc_o: ["Circunferencia", "Círculo"],
  cc_s: ["Es solo el borde, una línea: <b>circunferencia</b>.", "Es la superficie de dentro: <b>círculo</b>."],
  cats: ["perros", "gatos", "peces", "pájaros", "conejos"],
  gb_q: c => `El gráfico muestra las mascotas de un colegio. ¿Cuántos <b>${c}</b> hay? (Fíjate en la escala.)`,
  gb_s: (step, c, v) => v % step ? `Cada línea del gráfico vale ${step}. La barra de ${c} llega justo a la mitad entre el ${v - v % step} y el ${v - v % step + step}: es el <b>${v}</b>.` : `Cada línea del gráfico vale ${step}. La barra de ${c} llega hasta el <b>${v}</b>.`,
  gp_q: (c, e) => `El pictograma muestra las mascotas de un colegio. Cada estrella vale ${e}. ¿Cuántos <b>${c}</b> hay?`,
  gp_s: (c, n, e, half, r) => `Fila de ${c}: ${n} ${n === 1 ? "estrella entera" : "estrellas enteras"}, ${half ? `${n} × ${e} = ${n * e}, y media estrella, que vale la mitad de ${e}: ${e / 2}. En total, ${n * e} + ${e / 2} = <b>${r}</b>` : `${n} × ${e} = <b>${r}</b>`}.`,
  gd_q: (a, b) => `El gráfico muestra las mascotas de un colegio. ¿Cuántos ${a} más que ${b} hay?`,
  gd_s: (a, b, r) => `${a} − ${b} = <b>${r}</b>.`,
  gt_q: "El gráfico muestra las mascotas de un colegio. ¿Cuántas mascotas hay en total?",
  gt_s: (sum, r) => `${sum} = <b>${r}</b>.`,
  col: ["roja", "azul", "verde"],
  colpl: ["rojas", "azules", "verdes"],
  pb2_q: (a, b) => `Sacamos una bola sin mirar. ¿Es más probable sacar una bola ${a} o una ${b}?`,
  pb2_o: ["Más probable la primera", "Más probable la segunda", "Igual de probables"],
  pb2_s: (a, na, b, nb, k) => {
    const many = (n, c) => `${n} ${n === 1 ? c : S.colpl[S.col.indexOf(c)]}`;
    const txt = !na && !nb ? `No hay ninguna bola ${a} ni ninguna ${b}. ` : !na ? `No hay ninguna bola ${a} y hay ${many(nb, b)}. `
      : `Hay ${na} ${na === 1 ? "bola" : "bolas"} ${many(na, a).replace(/^\d+ /, "")} y ${nb ? many(nb, b) : "ninguna " + b}. `;
    const imp = !na && nb ? ` Sacar una bola ${a} es <b>imposible</b>: no hay ninguna.` : !nb && na ? ` Sacar una bola ${b} es <b>imposible</b>: no hay ninguna.` : "";
    return txt + [`Es <b>más probable</b> sacar una bola ${a}: hay más bolas de ese color.`, `Es <b>más probable</b> sacar una bola ${b}: hay más bolas de ese color.`, "Hay las mismas de cada color: son <b>igual de probables</b>."][k] + imp;
  },
});
// ═════ Series, calendario, estimar medidas, movimientos, planos y encuestas (textos de los generadores añadidos) ═════
const cap3 = s => s.charAt(0).toUpperCase() + s.slice(1);
const ord3 = n => `${n}.ª`;

// m3.series, m3.patron, m3.escondido
S.SR = {
  sig_q: s => `¿Qué número sigue? <b>${s}, …</b>`,
  sig_s: (t, s, up, r) => `De ${t[0]} a ${t[1]} hay ${s}; de ${t[1]} a ${t[2]}, ${s}; de ${t[2]} a ${t[3]}, ${s}. La regla es <b>${up ? "sumar" : "restar"} ${s}</b>: ${t[3]} ${up ? "+" : "−"} ${s} = <b>${r}</b>.`,
  falta_q: s => `¿Qué número falta? <b>${s}</b>`,
  falta_s: (a, s, up, r, b) => `La regla es ${up ? "sumar" : "restar"} ${s}: ${a} ${up ? "+" : "−"} ${s} = <b>${r}</b>. Compruebo: ${r} ${up ? "+" : "−"} ${s} = ${b}.`,
  regla_q: s => `¿Cuál es la regla de la serie <b>${s}</b>?`,
  sumar: s => `Sumar ${s}`,
  restar: s => `Restar ${s}`,
  por2: "Multiplicar por 2",
  regla_s: (t, s, up) => `Cada número tiene ${s} ${up ? "más" : "menos"} que el anterior: ${t[0]} ${up ? "+" : "−"} ${s} = ${t[1]}, ${t[1]} ${up ? "+" : "−"} ${s} = ${t[2]}… La regla es <b>${up ? "sumar" : "restar"} ${s}</b>.`,
  doble_s: t => `${t[0]} + ${t[0]} = ${t[1]}, ${t[1]} + ${t[1]} = ${t[2]}, ${t[2]} + ${t[2]} = ${t[3]}… Cada número es el doble del anterior: <b>multiplicar por 2</b>. (No se suma siempre lo mismo: compruébalo con todos los saltos).`,
  doble2_s: (t, r) => `Cada número es el doble del anterior: ${t[0]} + ${t[0]} = ${t[1]}, ${t[1]} + ${t[1]} = ${t[2]}, ${t[2]} + ${t[2]} = ${t[3]}. El siguiente es el doble de ${t[3]}: ${t[3]} + ${t[3]} = <b>${r}</b>.`,
  cols: ["roja", "azul", "verde", "amarilla"],
  pulsera_q: n => `Tu hermana hace una pulsera repitiendo siempre el mismo trocito. ¿De qué color será la cuenta número <b>${n}</b>?`,
  pulsera_s: (nuc, L, ends, n, r, c) => `El núcleo tiene ${L} cuentas (${nuc}) y se repite. ${ends ? `Los núcleos terminan en las cuentas ${ends}. ` : ""}La cuenta ${n} es la ${ord3(r)} de un núcleo: es <b>${c}</b>.`,
  torre_q: k => `Mira cómo crecen las torres. Si siguen igual, ¿cuántos cubos tendrá la torre número ${k}?`,
  torre_s: (d, list, k, r) => `Cada torre tiene ${d} ${d === 1 ? "cubo" : "cubos"} más que la anterior: ${list}. La torre ${k} tiene <b>${r}</b> cubos.`,
  esc_q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  salto: (a, t, x, b, y, r) => `Busco lo que le falta a ${a} para llegar a ${b}: del ${a} al ${t} van ${x}, y del ${t} al ${b}, ${y}. En total, ${x} + ${y} = <b>${r}</b>.`,
  directo: (a, b, r) => `Busco lo que le falta a ${a} para llegar a ${b}: ${b} − ${a} = <b>${r}</b>.`,
  resta_s: (a, b, r) => `Si a ${b} le quito algo y quedan ${a}, he quitado lo que va de ${a} a ${b}: ${b} − ${a} = <b>${r}</b>.`,
  quita_s: (x, a, b) => `Si al número escondido le quito ${x} y quedan ${a}, antes de quitar había ${a} + ${x} = <b>${b}</b>.`,
  comp: e => `Compruebo: ${e}.`,
};

// m3.tablas
S.TB = {
  hueco_q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  hueco_s: (t, m, p) => `Busco en la tabla del ${t} el número que da ${p}: ${t} × <b>${m}</b> = ${p}.`,
  hueco2_s: (t, m, p) => `Busco en la tabla del ${t}: ${t} × ${m} = ${p}. Como el orden no cambia el resultado, <b>${m}</b> × ${t} = ${p}.`,
  // [recipiente (plural), cosa, cuántas trae cada uno]
  grupos: [["arañas", "patas", 8], ["triciclos", "ruedas", 3], ["coches", "ruedas", 4], ["manos", "dedos", 5], ["cajas", "huevos", 6], ["semanas", "días", 7],
    ["mesas", "sillas", 4], ["bolsas", "caramelos", 9], ["sobres", "cromos", 5], ["tréboles", "hojas", 3], ["paquetes", "yogures", 4], ["pulpos", "brazos", 8]],
  grupos_q: (g, cont, per, obj) => `Cada uno de estos ${cont} tiene ${per} ${obj}. ¿Cuántos ${obj} hay en ${g} ${cont}?`.replace(/Cuántos (patas|ruedas|manos|sillas|hojas)/, "Cuántas $1").replace(/Cada uno de estos (arañas|manos|semanas|mesas|bolsas|cajas)/, "Cada una de estas $1"),
  grupos_s: (g, per, obj) => `Son ${g} grupos de ${per}: ${g} × ${per} = <b>${g * per}</b> ${obj}.`,
  noesta_q: t => `¿Cuál de estos números <b>no</b> está en la tabla del ${t}?`,
  noesta_s: (t, out, k, lo, hi) => `En la tabla del ${t}, ${t} × ${k} = ${lo} y ${t} × ${k + 1} = ${hi}. El <b>${out}</b> queda en medio: no está en la tabla. Los demás sí.`,
  // [cosa A, cosa B, «camisetas», «pantalones»] para combinar
  comb: [["camisetas", "pantalones", "camisetas", "pantalones"], ["sabores de helado", "tipos de cucurucho", "sabores", "cucuruchos"],
    ["tipos de pan", "rellenos", "panes", "rellenos"], ["gorras", "bufandas", "gorras", "bufandas"]],
  comb_q: (x, a, y, b) => `Tienes ${x} ${a} y ${y} ${b}. ¿Cuántas combinaciones distintas puedes hacer cogiendo una cosa de cada?`,
  comb_s: (x, a, y, b, r) => `Con cada una de las ${x} primeras puedes elegir ${y} distintas: son ${x} grupos de ${y}. ${x} × ${y} = <b>${r}</b> combinaciones.`,
  veces: ["el doble", "el triple", "el cuádruple"],
  cosas: [["cromos"], ["canicas"], ["pegatinas"], ["libros"], ["euros"]],
  veces_q: (N, base, obj, M, v) => `${N} tiene ${base} ${obj} y ${M} tiene ${v}. ¿Cuántos ${obj} tiene ${M}?`.replace(/Cuántos (canicas|pegatinas)/, "Cuántas $1"),
  veces_s: (v, k, base, obj) => `${v.charAt(0).toUpperCase() + v.slice(1)} es ${k} veces lo mismo: ${k} × ${base} = <b>${k * base}</b> ${obj}.`,
};

// m3.mental
S.MN = {
  q: e => `Calcula de cabeza: <b>${e}</b>.`,
  nueve_s: (add, n, r10, a, mid, r) => add
    ? `Sumar ${n} es sumar ${r10} y quitar 1: ${a} + ${r10} = ${mid}, y ${mid} − 1 = <b>${r}</b>.`
    : `Restar ${n} es restar ${r10} y devolver 1: ${a} − ${r10} = ${mid}, y ${mid} + 1 = <b>${r}</b>.`,
  cent_s: (A, a, b, add, r, R) => `Cuento en placas de cien: ${A} son ${a} placas. ${add ? `Con ${b} placas más` : `Si quito ${b} placas`}, ${a} ${add ? "+" : "−"} ${b} = ${r} placas de cien: <b>${R}</b>.`,
  desc_s: (a, b, d, u, m, r) => `Descompongo el ${b} en ${d} + ${u}. Primero las decenas: ${a} + ${d} = ${m}. Después las unidades: ${m} + ${u} = <b>${r}</b>.`,
  salto: (x, y, n) => `del ${x} al ${y} van ${n}`,
  contar_s: (jumps, sum, r) => `Cuento hacia delante desde el pequeño, saltando a números redondos: ${jumps.join("; ")}. Junto los saltos: ${sum} = <b>${r}</b>.`,
  par_s: (x, y, m, t, r) => `Busco la pareja que suma ${t}: ${x} + ${y} = ${t}. Después sumo el que queda: ${t} + ${m} = <b>${r}</b>.`,
};

// m3.simetria
S.SI = {
  // [nombre, ejes, por qué, dibujo («txt» = la letra)]
  figs: [["un cuadrado", 4, "uno de pie, uno tumbado y las dos diagonales", "sq"], ["un rectángulo", 2, "uno de pie y uno tumbado; si lo doblas por una diagonal, no coincide", "rect"],
    ["un triángulo equilátero", 3, "uno desde cada vértice hasta la mitad del lado de enfrente", "eq"], ["un triángulo isósceles", 1, "solo el que baja desde la punta hasta la mitad del lado distinto", "iso"],
    ["un triángulo escaleno", 0, "sus tres lados son distintos y ningún doblez hace coincidir las dos mitades", "esc"], ["un rombo", 2, "sus dos diagonales", "rombo"],
    ["este trapecio", 1, "uno de pie, por el centro", "trap"], ["la letra A", 1, "uno de pie, por el centro", "txt"], ["la letra H", 2, "uno de pie y uno tumbado", "txt"],
    ["la letra E", 1, "uno tumbado, por el centro", "txt"], ["la letra F", 0, "ningún doblez hace coincidir sus dos mitades", "txt"], ["la letra T", 1, "uno de pie, por el centro", "txt"],
    ["la letra X", 2, "uno de pie y uno tumbado", "txt"], ["la letra L", 0, "ningún doblez hace coincidir sus dos mitades", "txt"], ["la letra M", 1, "uno de pie, por el centro", "txt"]],
  ejes_q: n => `¿Cuántos ejes de simetría tiene ${n}?`,
  ejes_s: (n, a, why) => `${n.charAt(0).toUpperCase() + n.slice(1)} tiene <b>${a}</b> ${a === 1 ? "eje" : "ejes"} de simetría: ${why}.`,
  punto_q: c => `El punto azul está en la columna ${c} y el eje de simetría es la línea roja. ¿En qué columna está su punto simétrico?`,
  punto_s: (c, e, d, tc) => `Del punto al eje hay ${d} ${d === 1 ? "cuadrito" : "cuadritos"} (de la columna ${c} a la ${e}). Su simétrico está a ${d === 1 ? "1 cuadrito" : `los mismos ${d} cuadritos`} al otro lado del eje, en la misma fila: columna <b>${tc}</b>.`,
  hor_q: "¿Es simétrico el dibujo respecto a la línea roja tumbada (horizontal)?",
  hor_o: ["Sí", "No"],
  hor_s: ["Si doblas por la línea roja, la mitad de arriba cae justo encima de la de abajo: <b>sí</b> es simétrico.", "Si doblas por la línea roja, hay algún cuadrito que no tiene su pareja al otro lado: <b>no</b> es simétrico."],
};

// m3.cuerpos
S.CU = {
  fam_q: "¿Este cuerpo es un poliedro o un cuerpo redondo?",
  fam_o: ["Poliedro", "Cuerpo redondo"],
  nom: { cube: "un cubo", prism: "un prisma", pyramid: "una pirámide", cylinder: "un cilindro", cone: "un cono", sphere: "una esfera" },
  fam_s: (n, poly) => poly ? `Es ${n}: todas sus caras son planas. Es un <b>poliedro</b>.` : `Es ${n}: tiene una superficie curva. Es un <b>cuerpo redondo</b>.`,
  // [pregunta, 0 prisma · 1 pirámide]
  pp: [["Un poliedro tiene dos bases iguales, una enfrente de la otra, y sus caras de los lados son rectángulos. ¿Es un prisma o una pirámide?", 0],
    ["Un poliedro tiene una sola base y sus caras de los lados son triángulos que se juntan en una punta. ¿Es un prisma o una pirámide?", 1],
    ["¿Qué forma tiene una caja de zapatos?", 0], ["¿Qué forma tiene un brik de leche?", 0], ["¿Qué forma tiene el tejado puntiagudo de una torre, con base cuadrada?", 1],
    ["¿Qué forma tiene una tienda de campaña como una casita, con un triángulo delante y otro igual detrás?", 0], ["¿Qué forma tienen las pirámides de Egipto?", 1],
    ["¿Qué forma tiene una barrita de turrón con dos bases triangulares?", 0], ["¿Qué forma tiene un pisapapeles de base cuadrada que acaba en punta?", 1]],
  pp_q: t => t,
  pp_o: ["Prisma", "Pirámide"],
  pp_s: ["Tiene dos bases iguales, una enfrente de la otra, y caras de los lados rectangulares: es un <b>prisma</b>.", "Tiene una sola base y caras triangulares que se juntan en una punta: es una <b>pirámide</b>."],
  // [nombre, dibujo (o null), es prisma, lados de la base]
  tabla: [["un cubo", "cube", true, 4], ["un prisma de base rectangular, como una caja de zapatos", "prism", true, 4], ["una pirámide de base cuadrada", "pyramid", false, 4],
    ["un prisma de base triangular", null, true, 3], ["una pirámide de base triangular", null, false, 3], ["una pirámide de base pentagonal", null, false, 5], ["un prisma de base pentagonal", null, true, 5]],
  elem: ["caras", "aristas", "vértices"],
  cuenta_q: (e, n) => `¿Cuántas <b>${e}</b> tiene ${n}?`.replace("Cuántas <b>vértices", "Cuántos <b>vértices"),
  cuenta_s: (w, name, pri, n, r) => {
    const nm = name.split(",")[0];
    if (pri) return [`${nm.charAt(0).toUpperCase() + nm.slice(1)}: 2 bases (arriba y abajo) y ${n} caras en los lados, una por cada lado de la base: ${n} + 2 = <b>${r}</b> caras.`,
      `${nm.charAt(0).toUpperCase() + nm.slice(1)}: ${n} aristas abajo, ${n} arriba y ${n} de pie: ${n} + ${n} + ${n} = <b>${r}</b> aristas.`,
      `${nm.charAt(0).toUpperCase() + nm.slice(1)}: ${n} vértices abajo y ${n} arriba: ${n} + ${n} = <b>${r}</b> vértices.`][w];
    return [`${nm.charAt(0).toUpperCase() + nm.slice(1)}: la base y ${n} triángulos, uno por cada lado de la base: 1 + ${n} = <b>${r}</b> caras.`,
      `${nm.charAt(0).toUpperCase() + nm.slice(1)}: ${n} aristas en la base y ${n} que suben hasta la punta: ${n} + ${n} = <b>${r}</b> aristas.`,
      `${nm.charAt(0).toUpperCase() + nm.slice(1)}: ${n} vértices en la base y 1 en la punta: ${n} + 1 = <b>${r}</b> vértices.`][w];
  },
};

// m3.calendario
S.CA = {
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  letras: ["L", "M", "X", "J", "V", "S", "D"],
  meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  sem_q: n => `¿Cuántos días hay en ${n} semanas?`,
  sem_s: n => `Cada semana tiene 7 días: ${n} × 7 = <b>${7 * n}</b> días.`,
  anos_q: n => `¿Cuántos meses hay en ${n} años?`,
  anos_s: n => `Un año tiene 12 meses: ${n} × 12 = <b>${12 * n}</b> meses.`,
  dias_q: d => `¿Cuántas semanas son ${d} días?`,
  dias_s: n => `Cada semana tiene 7 días, y ${n} × 7 = ${7 * n}: son <b>${n}</b> semanas.`,
  medio_q: "¿Cuántos meses hay en medio año?",
  medio_s: "Medio año es la mitad de 12 meses: <b>6</b> meses.",
  dec_q: n => `¿Cuántos años son ${n} décadas?`,
  dec_s: n => `Una década son 10 años: ${n} × 10 = <b>${10 * n}</b> años.`,
  sig_q: n => `¿Cuántos años son ${n} siglos?`,
  sig_s: n => `Un siglo son 100 años: ${n} × 100 = <b>${100 * n}</b> años.`,
  mesd_q: (m, feb, bis) => `¿Cuántos días tiene el mes de ${m}${feb ? (bis ? " en un año bisiesto" : " en un año que no es bisiesto") : ""}?`,
  mesd_s: (m, n, feb, bis) => feb ? `Febrero tiene 28 días, y 29 en los años bisiestos. ${bis ? "Este año es bisiesto" : "Este año no es bisiesto"}: <b>${n}</b> días.` : `«Treinta días trae noviembre, con abril, junio y septiembre; de veintiocho solo hay uno, y los demás, treinta y uno». ${cap3(m)} tiene <b>${n}</b> días.`,
  semdia_q: (w, d, d2) => `Si hoy es ${w}, día ${d}, ¿qué día de la semana será el día ${d2} del mismo mes?`,
  semdia_s: (w, d, d2, add, r) => add % 7 === 0 ? `Del ${d} al ${d2} hay ${add} días: ${add === 7 ? "una semana justa" : "dos semanas justas"}. Vuelve a ser <b>${r}</b>.` : `Del ${d} al ${d2} ${add === 1 ? "hay 1 día" : `hay ${add} días`}: contamos ${add === 1 ? "un día" : `${add} días`} después del ${w}. Será <b>${r}</b>.`,
  faltan_q: (d1, m1, d2, m2) => `Hoy es ${d1} de ${m1}. ¿Cuántos días faltan para el ${d2} de ${m2}?`,
  faltan1_s: (d1, d2) => `${d2} − ${d1} = <b>${d2 - d1}</b> días. (El día de hoy no se cuenta).`,
  faltan2_s: (m1, L, d1, d2, m2) => `${cap3(m1)} tiene ${L} días: del ${d1} al ${L} ${L - d1 === 1 ? "falta" : "faltan"} ${L} − ${d1} = ${L - d1} ${L - d1 === 1 ? "día" : "días"}. Después vienen ${d2} días de ${m2}: ${L - d1} + ${d2} = <b>${L - d1 + d2}</b> días.`,
  hoja_q: d => `Mira la hoja del calendario. ¿Qué día de la semana es el <b>${d}</b>?`,
  hoja_s: (d, l, w) => `Busco el ${d} y subo por su columna hasta la letra: <b>${l}</b>. Es <b>${w}</b>.`,
  cuantos_q: w => `Mira la hoja del calendario. ¿Cuántos ${w === "sábado" || w === "domingo" ? w + "s" : w} tiene este mes?`,
  cuantos_s: (w, list, n) => `Busco la columna del ${w} y cuento sus fechas: ${list}. Hay <b>${n}</b>.`,
  primer_q: w => `Mira la hoja del calendario. ¿Qué día del mes es el primer ${w}?`,
  primer_s: (w, l, d) => `El primer número de la columna ${l} (${w}) es el <b>${d}</b>.`,
  fecha: (d, m, y) => `${d}/${m}/${y}`,   // la fecha en números, en el orden del país (aquí, día/mes/año)
  fecha_q: f => `En una invitación pone la fecha <b>${f}</b>. ¿En qué mes es la fiesta?`,
  fecha_s: (d, m, mes, y) => `En España se escribe primero el día, después el mes y al final el año: día ${d}, mes ${m}, año ${y}. El mes ${m} es <b>${mes}</b>.`,
};

// m3.estmedidas
S.EM = {
  bank_q: w => `Elige la medida que tiene sentido para ${w}.`,
  // [qué, opciones (la buena primero), explicación]
  bank: [
    ["la altura de un edificio de 5 pisos", ["Unos 15 m", "Unos 15 cm", "Unos 15 km"], "Cada piso mide unos 3 m: 5 × 3 = 15. El edificio mide <b>unos 15 m</b>."],
    ["la distancia de tu pueblo al pueblo de al lado", ["Unos 8 km", "Unos 8 m", "Unos 8 cm"], "8 m es lo que mide una clase. Entre dos pueblos hay <b>unos 8 km</b>: unas dos horas andando."],
    ["el largo de un lápiz nuevo", ["Unos 18 cm", "Unos 18 m", "Unos 18 mm"], "Un lápiz es un poco más largo que un palmo: <b>unos 18 cm</b>. 18 mm es menos que un dedo y 18 m, más que una clase."],
    ["el grosor de una moneda de 1 euro", ["Unos 2 mm", "Unos 2 cm", "Unos 2 m"], "Una moneda es muy finita, como 20 hojas de papel juntas: <b>unos 2 mm</b>."],
    ["el largo de una hormiga", ["Unos 5 mm", "Unos 5 cm", "Unos 5 m"], "Una hormiga cabe varias veces en la uña del meñique, que mide 1 cm: mide <b>unos 5 mm</b>."],
    ["la altura de la puerta de clase", ["Unos 2 m", "Unos 2 cm", "Unos 20 m"], "Una persona adulta pasa sin agacharse: la puerta mide <b>unos 2 m</b>, dos pasos grandes."],
    ["el peso de una manzana", ["Unos 200 g", "Unos 200 kg", "Unos 2 g"], "2 g son solo 2 clips, y 200 kg, más que dos personas adultas. Una manzana pesa <b>unos 200 g</b>: unas 5 manzanas pesan como un paquete de arroz de 1 kg."],
    ["el peso de un niño de 3.º de Primaria", ["Unos 30 kg", "Unos 3 kg", "Unos 300 kg"], "3 kg pesa un bebé recién nacido y 300 kg, una moto grande. Un niño de 8 o 9 años pesa <b>unos 30 kg</b>."],
    ["el peso de un lápiz", ["Unos 5 g", "Unos 5 kg", "Unos 500 g"], "Un lápiz pesa como unos pocos clips: <b>unos 5 g</b>. 5 kg serían 5 paquetes de arroz de 1 kg."],
    ["el peso de un paquete grande de arroz", ["Más o menos 1 kg", "Más o menos 1 g", "Más o menos 100 kg"], "Un paquete grande de arroz pesa <b>más o menos 1 kg</b>: es uno de nuestros referentes."],
    ["el agua que cabe en un cubo de fregar", ["Unos 10 L", "Unos 10 mL", "Unos 1000 L"], "10 mL son un par de cucharillas y 1000 L llenan un depósito enorme. En un cubo caben <b>unos 10 L</b>, como 10 briks de leche."],
    ["el agua que cabe en un vaso", ["Unos 250 mL", "Unos 250 L", "Unos 25 mL"], "Un vaso es un cuarto de litro: <b>unos 250 mL</b>. 250 L no caben ni en una bañera."],
    ["el agua que cabe en una cucharilla", ["Unos 5 mL", "Unos 5 L", "Unos 500 mL"], "Una cucharilla es muy pequeña: <b>unos 5 mL</b>. 500 mL son dos vasos."],
    ["el agua que cabe en una bañera", ["Unos 200 L", "Unos 200 mL", "Unos 2 L"], "2 L son dos botellas grandes. En una bañera caben <b>unos 200 L</b>."],
  ],
  sitios: ["el parque", "casa de tus abuelos", "la biblioteca", "la piscina"],
  km_q: (m, w) => `Andando, recorres 1 km en unos 15 minutos. Tardas ${m} minutos en llegar a ${w}. ¿A cuántos kilómetros está, más o menos?`,
  km_s: (m, n) => m === 15 ? `15 minutos es justo lo que se tarda en recorrer 1 km: está a <b>unos 1 km</b>.`.replace("unos 1 km", "1 km, más o menos") : `${m} minutos son ${n} veces 15 minutos: está a unos <b>${n}</b> km.`,
  min_q: n => `Andando, recorres 1 km en unos 15 minutos. ¿Cuántos minutos tardarás, más o menos, en recorrer ${n} km?`,
  min_s: n => `${n === 1 ? "1 km son" : `${n} km son ${n} veces`} 15 minutos: ${n} × 15 = <b>${15 * n}</b> minutos.`,
  clip_q: n => `Un clip pesa más o menos 1 g. ¿Cuántos gramos pesan, más o menos, ${n} clips?`,
  clip_s: n => `Cada clip pesa unos 1 g: ${n} clips pesan unos <b>${n}</b> g.`,
  hojas_q: n => `10 hojas de papel juntas miden más o menos 1 mm de grosor. ¿Cuántos milímetros mide de grosor, más o menos, un cuaderno de ${n} hojas?`,
  hojas_s: n => `Cada 10 hojas, 1 mm: ${n} hojas son ${n / 10} grupos de 10. Mide unos <b>${n / 10}</b> mm.`,
  pisos_q: n => `Cada piso de un edificio mide unos 3 m de alto. ¿Cuántos metros mide, más o menos, un edificio de ${n} pisos?`,
  pisos_s: n => `${n} × 3 = <b>${3 * n}</b>. Mide unos ${3 * n} m.`,
  largos: ["el patio", "el pasillo del cole", "el gimnasio", "el puente del río"],
  pasos_q: (w, n) => `Un paso grande de una persona adulta mide más o menos 1 m. Tu profe cruza ${w} dando ${n} pasos grandes. ¿Cuántos metros mide, más o menos?`,
  pasos_s: (w, n) => `Cada paso grande es más o menos 1 m: ${n} pasos son unos <b>${n}</b> m.`,
  nombres: ["Leo", "Nora", "Hugo", "Alba", "Omar", "Irene"],
  // [qué, unidad, valor real (mín., máx.)]
  medir: [["el largo de la mesa del cole", "cm", 60, 90], ["el largo de la pizarra", "cm", 250, 350], ["el largo del patio", "m", 25, 45], ["el agua de una jarra", "mL", 1000, 2000], ["el peso de una sandía", "g", 3000, 6000]],
  quien_q: (w, a, ea, b, eb, real, u) => `${a} estima ${w} en unos ${ea} ${u} y ${b}, en unos ${eb} ${u}. Al medirlo, salen ${real} ${u}. ¿Quién ha hecho la mejor estimación?`,
  quien_s: (real, g, b, u, who) => `${g} ${u} está a solo ${Math.abs(g - real)} ${u} de la medida real (${real} ${u}); ${b} ${u} está a ${Math.abs(b - real)} ${u}. La mejor estimación es la de <b>${who}</b>: no hace falta acertar justo, sino acercarse.`,
};

// m3.movimientos
S.MV = {
  movs: ["Una traslación", "Un giro", "Una simetría"],
  cual_q: "¿Qué movimiento lleva la pieza azul hasta la roja?",
  cual_s: ["La pieza roja mira igual que la azul: solo ha cambiado de sitio. Es una <b>traslación</b>.", "La pieza roja ha dado un cuarto de vuelta alrededor de un punto: está tumbada. Es un <b>giro</b>.", "La pieza roja se ve como en un espejo: tiene el pie hacia el otro lado. Es una <b>simetría</b>."],
  hacia: ["hacia la derecha", "hacia la izquierda", "hacia arriba", "hacia abajo"],
  tras_q: h => `La pieza azul se ha trasladado ${h} hasta la roja. ¿Cuántos cuadritos se ha movido?`,
  tras_s: (n, h) => `En una traslación todos los puntos se mueven lo mismo. Elige un vértice de la pieza azul y cuenta hasta el mismo vértice de la roja: <b>${n}</b> cuadritos ${h}.`,
  vueltas: ["un cuarto de vuelta", "media vuelta", "tres cuartos de vuelta"],
  vueltasO: ["Media vuelta", "Tres cuartos de vuelta", "Una vuelta entera"],
  reloj_q: (h, v, cw) => `La aguja larga de un reloj apunta al ${h} y gira ${v} en el sentido ${cw ? "de las agujas del reloj" : "contrario a las agujas del reloj"}. ¿A qué número apunta ahora?`,
  reloj_s: (h, q, cw, e, v) => `Un cuarto de vuelta son 3 números de la esfera. ${cap3(v)} ${q === 1 ? "son 3 números" : `son ${q} × 3 = ${3 * q} números`} ${cw ? "hacia delante" : "hacia atrás"} desde el ${h}: llega al <b>${e}</b>.`,
  dirs: ["hacia arriba", "hacia la derecha", "hacia abajo", "hacia la izquierda"],
  dirsO: ["Hacia arriba", "Hacia la derecha", "Hacia abajo", "Hacia la izquierda"],
  bandera_q: (d, v, cw) => `La bandera apunta ${d} y gira ${v} alrededor del punto O, en el sentido ${cw ? "de las agujas del reloj" : "contrario a las agujas del reloj"}. ¿Hacia dónde apunta ahora?`,
  bandera_s: (q, cw, d) => `Giramos de cuarto en cuarto de vuelta ${cw ? "como las agujas del reloj" : "al revés que las agujas del reloj"}: ${q === 1 ? "un cuarto" : q === 2 ? "dos cuartos, media vuelta" : "tres cuartos"}. Ahora apunta <b>${d}</b>.`,
  bank_q: w => `¿Qué movimiento hace ${w}?`,
  bank: [["un cajón cuando lo abres", 0], ["un ascensor que sube", 0], ["una ventana corredera al abrirla", 0], ["un tren en una vía recta", 0], ["una persona en una escalera mecánica", 0],
    ["una noria", 1], ["la aguja de un reloj", 1], ["una puerta al abrirse", 1], ["el aspa de un molino de viento", 1], ["el volante de un coche al girarlo", 1],
    ["tu imagen en el espejo, comparada contigo", 2], ["el ala derecha de una mariposa, comparada con la izquierda", 2]],
  bank_s: [w => `${cap3(w)} se desliza en línea recta, sin girar: es una <b>traslación</b>.`, w => `${cap3(w)} da vueltas alrededor de un punto que no se mueve: es un <b>giro</b>.`, w => `Es como verse en un espejo: es una <b>simetría</b>.`],
  cuartos_q: n => `¿Cuántos cuartos de vuelta hacen falta para dar ${n} vueltas enteras?`,
  cuartos_s: n => `Una vuelta entera son 4 cuartos de vuelta: ${n} × 4 = <b>${4 * n}</b>.`,
  cuantos_q: q => `Das ${q} cuartos de vuelta seguidos hacia el mismo lado. ¿Cuánto has girado en total?`,
  cuantos_s: q => `Dos cuartos de vuelta son media vuelta${q >= 3 ? `; tres cuartos son media vuelta y un cuarto más${q === 4 ? ", y cuatro cuartos, una vuelta entera" : ""}` : ""}. Has girado <b>${["media vuelta", "tres cuartos de vuelta", "una vuelta entera"][q - 2]}</b>.`,
};

// m3.plano
S.PL = {
  sitios: ["la casa de Mei", "el parque", "la fuente", "el cole", "la tienda"],
  donde_q: s => `Mira el plano. ¿En qué casilla está ${s}?`,
  donde_s: (s, l, n) => `Bajo desde ${s} por su columna: es la <b>${l}</b>. Voy hacia un lado por su fila: es la <b>${n}</b>. Está en la casilla <b>${l}${n}</b> (primero la letra y después el número).`,
  que_q: c => `Mira el plano. ¿Qué hay en la casilla <b>${c}</b>?`,
  que_s: (c, l, n, s) => `Busco la columna ${l} y la fila ${n}: en ${c} está <b>${s}</b>.`,
  mov: ["hacia la derecha", "hacia la izquierda", "hacia arriba", "hacia abajo"],
  fila: n => `por la fila ${n}`,
  columna: l => `por la columna ${l}`,
  robot_q: (c, n, d, by) => `En un plano con columnas de la A a la F y filas del 1 (abajo) al 5 (arriba), un robot está en la casilla ${c} y avanza ${n === 1 ? "1 casilla" : `${n} casillas`} ${d} ${by}. ¿En qué casilla termina?`,
  robot_s: (c, n, d, c2, h) => `${h ? "Cambia la letra y la fila sigue igual" : "Cambia el número y la columna sigue igual"}. Avanza ${n} ${d} sin contar la casilla de salida: llega a <b>${c2}</b>.`,
  rumbo: ["hacia arriba (hacia la fila 5)", "hacia la derecha del plano (hacia la columna F)", "hacia abajo (hacia la fila 1)", "hacia la izquierda del plano (hacia la columna A)"],
  rumboO: ["Hacia arriba", "Hacia la derecha del plano", "Hacia abajo", "Hacia la izquierda del plano"],
  gira_q: (h, right) => `Vas caminando por el plano ${h} y giras a la <b>${right ? "derecha" : "izquierda"}</b>. ¿Hacia dónde vas ahora?`,
  gira_s: (h, right, h2, h0) => `Imagínate dentro del plano, caminando ${h}.${h0 === 2 ? " Como vas hacia abajo, tu derecha es la izquierda del plano." : ""} Al girar a la ${right ? "derecha" : "izquierda"}, vas <b>${h2}</b>.`,
  manoO: ["A mi derecha", "A mi izquierda"],
  mano_q: (facing, r) => `Tu amiga está ${facing ? "de cara a ti" : "de espaldas a ti (mira hacia donde miras tú)"} y levanta su mano <b>${r ? "derecha" : "izquierda"}</b>. Desde donde estás tú, ¿a qué lado ves esa mano?`,
  mano_s: (facing, r, seen) => facing ? `Si alguien está de cara a ti, sus lados quedan al revés que los tuyos: su ${r ? "derecha" : "izquierda"} está a <b>tu ${seen ? "derecha" : "izquierda"}</b>.` : `Si mira hacia donde miras tú, su derecha y su izquierda son las mismas que las tuyas: la ves a <b>tu ${seen ? "derecha" : "izquierda"}</b>.`,
  giros: { d: "un cuarto de vuelta a la derecha", i: "un cuarto de vuelta a la izquierda", m: "media vuelta" },
  y: " y, después, ",
  clase: ["la pizarra", "la ventana", "el fondo de la clase", "la puerta"],
  claseO: ["La pizarra", "La ventana", "El fondo de la clase", "La puerta"],
  clase_q: g => `El robot del aula mira hacia la pizarra. La ventana está a su derecha y la puerta, a su izquierda. Gira ${g}. ¿Hacia dónde mira ahora?`,
  // dos giros: el primero y, «después», el segundo con la respuesta en negrita
  paso: (t, w, i) => i ? `Después, ${{ d: "un cuarto de vuelta a la derecha", i: "un cuarto de vuelta a la izquierda", m: "media vuelta" }[t]}: al final mira hacia <b>${w}</b>.`
    : `${{ d: "Un cuarto de vuelta a la derecha", i: "Un cuarto de vuelta a la izquierda", m: "Media vuelta" }[t]}: mira hacia ${w}.`,
  clase_s: w => `Al final mira hacia <b>${w}</b>.`,
  // con un solo giro, sin repetir la frase del paso
  clase1_s: (t, w) => ({ d: `Un cuarto de vuelta a la derecha: gira hacia su derecha, donde está la ventana. Ahora mira hacia <b>${w}</b>.`,
    i: `Un cuarto de vuelta a la izquierda: gira hacia su izquierda, donde está la puerta. Ahora mira hacia <b>${w}</b>.`,
    m: `Media vuelta: ahora mira justo al lado contrario de la pizarra, hacia <b>${w}</b>.` })[t],
};

// m3.encuesta
S.EN = {
  // [cómo se nombra la encuesta, respuestas posibles]
  temas: [["la fruta favorita", ["manzana", "plátano", "fresa", "naranja", "pera"]], ["la mascota favorita", ["perro", "gato", "pez", "pájaro", "conejo"]],
    ["el deporte favorito", ["fútbol", "baloncesto", "natación", "tenis", "patinaje"]], ["cómo vienen al cole", ["andando", "en coche", "en autobús", "en bici"]], ["el color favorito", ["azul", "verde", "rojo", "amarillo", "morado"]],
    ["cuántos hermanos tienen", ["0 hermanos", "1 hermano", "2 hermanos", "3 o más"]], ["cuántas mascotas tienen en casa", ["ninguna", "1 mascota", "2 mascotas", "3 o más"]]],   // datos que son números
  // «Pez: 3 palotes sueltos = 3» · «Andando: 1 grupo completo (5) y 4 palotes sueltos: 5 + 4 = 9» · «Patinaje: 2 grupos completos: 5 + 5 = 10»
  leer: (c, g, s, n) => {
    const sueltos = `${s} ${s === 1 ? "palote suelto" : "palotes sueltos"}`, fives = Array(g).fill(5).join(" + ");
    if (g === 0) return `${c}: ${sueltos} = <b>${n}</b>`;
    if (!s) return g === 1 ? `${c}: 1 grupo completo = <b>${n}</b>` : `${c}: ${g} grupos completos: ${fives} = <b>${n}</b>`;
    return g === 1 ? `${c}: 1 grupo completo (5) y ${sueltos}: 5 + ${s} = <b>${n}</b>` : `${c}: ${g} grupos completos (${fives} = ${5 * g}) y ${sueltos}: ${5 * g} + ${s} = <b>${n}</b>`;
  },
  frec_q: (t, c) => `Recuento de una encuesta sobre ${t}. ¿Cuántos niños han elegido <b>${c.toLowerCase()}</b>?`,
  total_q: t => `Recuento de una encuesta sobre ${t}. ¿Cuántos niños han contestado en total?`,
  total_s: (sum, n) => `Contamos los palotes de cada respuesta (cada grupo cruzado vale 5) y sumamos todas las frecuencias: ${sum} = <b>${n}</b>.`,
  mas_q: t => `Recuento de una encuesta sobre ${t}. ¿Qué respuesta es la más votada?`,
  menos_q: t => `Recuento de una encuesta sobre ${t}. ¿Qué respuesta es la menos votada?`,
  masmenos_s: (list, c, n, more) => `Pasamos los palotes a números: ${list}. La ${more ? "más" : "menos"} votada es <b>${c}</b>, con ${n}.`,
  dif_q: (a, b) => `Mira el recuento. ¿Cuántos votos más tiene <b>${a.toLowerCase()}</b> que <b>${b.toLowerCase()}</b>?`,
  dif_s: (ra, rb, a, b) => `${ra}; ${rb}. ${a} − ${b} = <b>${a - b}</b> ${a - b === 1 ? "voto" : "votos"} más.`,
  o_q: (a, b) => `Mira el recuento. ¿Cuántos niños han elegido <b>${a.toLowerCase()}</b> o <b>${b.toLowerCase()}</b>?`,
  o_s: (a, b) => `Sumamos las dos frecuencias: ${a} + ${b} = <b>${a + b}</b>.`,
  grupos_q: (g, s) => `En un recuento con palotes hay ${g === 1 ? "1 grupo completo" : `${g} grupos completos`}${s ? ` y ${s === 1 ? "1 palote suelto" : `${s} palotes sueltos`}` : ""}. ¿Cuántas respuestas son?`,
  grupos_s: (g, s) => `Cada grupo completo vale 5 (el palote cruzado es el quinto): ${g} × 5 = ${s ? `${5 * g}, y ${s} más: ${5 * g} + ${s} = ` : ""}<b>${5 * g + s}</b>.`,
  cuantos_q: n => `Haces con palotes el recuento de ${n} respuestas. ¿Cuántos grupos completos (de 5) te salen?`,
  cuantos_s: n => { const g = Math.floor(n / 5), r = n % 5;
    return `${g === 1 ? "1 grupo de 5 es 5" : `${g} grupos de 5 son ${5 * g}`}${r ? `, y ${r === 1 ? "queda 1 palote suelto" : `quedan ${r} palotes sueltos`}` : ""}: ${g === 1 ? "sale <b>1</b> grupo completo" : `salen <b>${g}</b> grupos completos`}.`; },
  preg_q: t => `Queremos hacer una encuesta en clase sobre ${t}. ¿Qué pregunta es mejor?`,
  preg_s: "La mejor pregunta es <b>clara</b>, trata de lo que queremos saber y da <b>opciones</b>, para que las respuestas se puedan contar con palotes.",
  // [tema, la buena, malas…]
  preguntas: [
    ["el deporte favorito", "¿Cuál es tu deporte favorito: fútbol, baloncesto, natación u otro?", "¿Te gusta el deporte?", "¿Cuánto mides?"],
    ["la fruta para el almuerzo", "¿Qué fruta prefieres: manzana, plátano, fresa o naranja?", "¿Te gusta la fruta?", "¿Cuántos años tienes?"],
    ["la mascota favorita", "¿Qué mascota prefieres: perro, gato, pez u otra?", "¿Tienes mascota?", "¿De qué color es tu mochila?"],
    ["cómo venimos al cole", "¿Cómo vienes al cole: andando, en coche, en autobús o en bici?", "¿Te gusta venir al cole?", "¿A qué hora te levantas?"],
    ["la excursión de fin de curso", "¿Adónde prefieres ir: al zoo, al museo o a la granja?", "¿Te gustan las excursiones?", "¿Cuántos hermanos tienes?"],
  ],
};
// ── fin: ═════ Series, calendario, estimar medidas, movimientos, planos y encuestas (textos de los generadores añadidos) ═════
})();
