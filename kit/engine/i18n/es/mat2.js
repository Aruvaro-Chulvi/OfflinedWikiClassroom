/* WikiAula — textos de gen/mat2.js (Matemáticas, Grado 2), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m2 = G.m2 || {};
const cu = fem => fem ? "Cuántas" : "Cuántos";
const la = h => h === 1 ? "La 1" : `Las ${h}`;
Object.assign(S, {
  bloques_q: "¿Qué número forman estos bloques? (Placa = 100, barra = 10, cubito = 1.)",
  cdu_q: n => `¿Cuántas centenas, decenas y unidades tiene el número <b>${n}</b>?`,
  cdu_f: ["Centenas", "Decenas", "Unidades"],
  cdu_s: (n, c, d, u) => `${n} = ${c} ${c === 1 ? "centena" : "centenas"} + ${d} ${d === 1 ? "decena" : "decenas"} + ${u} ${u === 1 ? "unidad" : "unidades"} = ${c * 100} + ${d * 10} + ${u}.`,
  descomp_q: (c, d, u) => `¿Qué número tiene <b>${c} ${c === 1 ? "centena" : "centenas"}, ${d} ${d === 1 ? "decena" : "decenas"} y ${u} ${u === 1 ? "unidad" : "unidades"}</b>?`,
  posn: ["las centenas", "las decenas", "las unidades"],
  valor_q: (n, d) => `En el número <b>${n}</b>, ¿cuánto vale la cifra <b>${d}</b>?`,
  valor_s: (d, pos, v) => `La cifra ${d} está en ${pos}, así que vale <b>${v}</b>.`,
  letras_q: w => `Escribe con números: <b>${w}</b>.`,
  letras2_q: n => `¿Cómo se escribe con letras el número <b>${n}</b>?`,
  // los dos trozos: «ochocientos» y «setenta y dos»
  letras_s: (n, c, rest, wc, wr, w) => `Primer trozo, las centenas: ${c} ${c === 1 ? "centena" : "centenas"} → <i>${wc}</i>. `
    + (rest === 0 ? "No hay más trozo: 0 decenas y 0 unidades. " : rest < 10 ? `Segundo trozo: ${rest} → <i>${wr}</i> (0 decenas: el 0 no se lee). ` : `Segundo trozo: ${rest} → <i>${wr}</i>. `)
    + `<b>${n}</b> se escribe <b>${w}</b>.`,
  // la forma mal escrita que avisa la lección (o null si no hay ninguna para este número)
  letras_mal: (w, c, rest) => {
    const m = { 5: ["quinientos", "cincocientos"], 7: ["setecientos", "sietecientos"], 9: ["novecientos", "nuevecientos"] }[c];
    if (m) return w.replace(m[0], m[1]);
    if (c === 1 && rest) return w.replace(/^ciento /, "cien ");
    if (rest) return w.replace(/^(\S+) /, "$1 y ");
    return null;
  },
  par_o: ["Par", "Impar"],
  par_q: n => `¿El número <b>${n}</b> es par o impar?`,
  par_s: (n, u, odd, first, trap) => `Miramos solo la última cifra: ${n} termina en ${u}, que es ${odd ? "impar" : "par"}.${trap ? ` (No importa que empiece por ${first}: manda la última cifra.)` : ""} ${n} es <b>${odd ? "impar" : "par"}</b>.`,
  parcual_q: even => `¿Cuál de estos números es <b>${even ? "par" : "impar"}</b>?`,
  parcual_s: (ns, g, even) => `Miramos la última cifra de cada uno: ${ns.map(x => `${x} termina en ${x % 10}`).join(", ")}. Solo ${g} termina en una cifra ${even ? "par" : "impar"}: <b>${g}</b>.`,
  vecino_q: (n, after) => `¿Qué número va justo <b>${after ? "después" : "antes"}</b> del ${n}?`,
  vecino_s: ([c, d, u], [c2, d2, u2], after) => {
    const bl = (c, d, u) => `${c} ${c === 1 ? "placa" : "placas"}, ${d} ${d === 1 ? "barra" : "barras"} y ${u} ${u === 1 ? "cubito" : "cubitos"}`;
    const n = c * 100 + d * 10 + u, r = c2 * 100 + d2 * 10 + u2;
    if (after) return `${n} son ${bl(c, d, u)}. Añado 1 cubito: 10 cubitos forman 1 barra.${d === 9 ? " Ahora hay 10 barras: forman 1 placa." : ""} Quedan ${bl(c2, d2, u2)}: <b>${r}</b>.`;
    return `${n} son ${bl(c, d, u)}. Para quitar 1 cubito, ${d === 0 ? "rompo 1 placa en 10 barras y 1 barra en 10 cubitos" : "rompo 1 barra en 10 cubitos"}, y quito 1. Quedan ${bl(c2, d2, u2)}: <b>${r}</b>.`;
  },
  comp_q: (a, b) => `Elige el signo que va en el hueco: <b>${a} ☐ ${b}</b>`,
  // como en la lección: casilla a casilla, de izquierda a derecha, hasta la que decide
  comp_s: (a, b, k, da, db) => {
    const C = ["Centenas", "Decenas", "Unidades"], p = da.findIndex((x, i) => x !== db[i]);
    const steps = C.map((c, i) => i < p || p < 0 ? `${c}: ${da[i]} y ${db[i]}, empate.` : i === p ? `${c}: ${da[i]} y ${db[i]}, ${da[i]} es ${da[i] > db[i] ? "más" : "menos"}${p < 2 ? ", ¡ya está!" : "."}` : "").filter(Boolean);
    return k === 2 ? `${steps.join(" ")} Son iguales: <b>${a} = ${b}</b>.` : `${steps.join(" ")} Así que <b>${a} ${k ? "&lt;" : "&gt;"} ${b}</b>.`;
  },
  mayor_q: s => `¿Cuál es el número <b>mayor</b>? ${s}`,
  menor_q: s => `¿Cuál es el número <b>menor</b>? ${s}`,
  orden_s: (s, r) => `Ordenados de menor a mayor: ${s}. La respuesta es <b>${r}</b>.`,
  red_q: n => `Redondea <b>${n}</b> a la decena más cercana.`,
  red_s: (n, u, r, up) => `Miramos las unidades: ${u}. ${u} ${up ? "sube: vamos a la decena siguiente" : "baja: vamos a la decena de antes"}, <b>${r}</b>.`,
  suma_q: (a, b) => `¿Cuánto es <b>${a} + ${b}</b>?`,
  // la suma en columnas, columna a columna, como en «Sumar llevando»
  sc_col: (p, x, y, c, s, other) => {
    const col = ["Unidades", "Decenas", "Centenas"][p], lleva = c ? `, y 1 que me llevaba, ${s}` : "", fin = s >= 10 ? `. Escribo ${s % 10} y me llevo 1.` : ".";
    if (x === null || y === null) return `${col}: el ${other} no tiene; ${x === null ? y : x}${lleva}${fin}`;
    return `${col}: ${x} + ${y} = ${x + y}${lleva}${fin}`;
  },
  sc_new: p => `${["Unidades", "Decenas", "Centenas"][p]}: no hay ninguna que sumar; el 1 que me llevaba se escribe solo en las centenas.`,
  suma_s: (a, b, r, cols, mix) => (mix ? "Colocamos los números por la derecha: unidades debajo de unidades y decenas debajo de decenas.<br>" : "") + `${cols.join("<br>")}<br>${a} + ${b} = <b>${r}</b>.`,
  prop_q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  prop_s: [(a, b) => `Propiedad conmutativa: el orden de los sumandos no cambia la suma. El hueco es <b>${a}</b>.`, c => `Propiedad asociativa: da igual qué dos sumandos juntemos primero. Los sumandos son los mismos, así que el hueco es <b>${c}</b>.`, "Sumar 0 no cambia nada: el número se queda igual. El hueco es <b>0</b>."],
  ps_orden: (a, b, r) => `El orden no cambia el resultado: ${a} + ${b} = ${b} + ${a}. En los dos lados están los mismos números, así que el hueco es <b>${r}</b>.`,
  ps_amigos_q: s => `Calcula de cabeza: <b>${s}</b>. (Busca los amigos del 10.)`,
  ps_amigos_s: (p, q, r, t) => `Juntamos primero los amigos del 10: ${p} + ${q} = 10. Después, 10 + ${r} = <b>${t}</b>.`,
  ps_cero: (a, h) => h === 0 ? `El número se queda igual, así que no se añade nada: el hueco es <b>0</b>. ${a} + 0 = ${a}.` : `Sumar 0 es no añadir nada: el número se queda igual, <b>${a}</b>.`,
  ment_s: [
    (a, t, r) => `Sumar decenas enteras es rápido: solo cambian las decenas. Saltamos de 10 en 10 desde el ${a}: ${Array.from({ length: t / 10 }, (_, i) => a + 10 * (i + 1)).join(", ")}. ${a} + ${t} = <b>${r}</b>.`,
    (a, b, c, r) => `Sumar ${b} es casi como sumar ${c}: sumo ${c} y quito 1, porque he sumado uno de más. ${a} + ${c} = ${a + c}, y ${a + c} − 1 = <b>${r}</b>.`,
    (a, b, r) => { const t = Math.round(b / 10) * 10, d = t - b; return d > 0
      ? `Restar ${b} es casi como restar ${t}: resto ${t} y añado ${d}, porque he quitado uno de más. ${a} − ${t} = ${a - t}, y ${a - t} + ${d} = <b>${r}</b>.`
      : `Restar ${b} es restar ${t} y quitar ${-d} más. ${a} − ${t} = ${a - t}, y ${a - t} − ${-d} = <b>${r}</b>.`; },
    (x, y) => `Mira las decenas: ${x / 10} + ${y / 10} = 10. Así que ${x} y ${y} son «amigos del 100»: suman <b>100</b>.`],
  ser_q: s => `¿Qué número falta en la serie? <b>${s}</b>`,
  ser_s: (st, down, full, ans, cross) => `Cada número es ${st} ${down ? "menos" : "más"} que el anterior: la regla es ${down ? "restar" : "sumar"} ${st}. La serie es ${full}. Falta el <b>${ans}</b>.`
    + (cross ? " Fíjate: al pasar a otra centena cambia también la cifra de las centenas." : ""),
  torre_q: s => `Mira las torres: tienen ${s} cubitos. ¿Cuántos cubitos tendrá la torre siguiente?`,
  torre_s: (hs, g, r) => `Cada torre tiene ${g} ${g === 1 ? "cubito" : "cubitos"} más que la anterior: ${hs.join(", ")}… La siguiente tendrá ${hs[2]} + ${g} = <b>${r}</b>.`,
  ment_partir: (dx, dy, ux, uy, r) => `Partimos los números. Decenas: ${dx} + ${dy} = ${dx + dy}. Unidades: ${ux} + ${uy} = ${ux + uy}. Juntos: ${dx + dy} + ${ux + uy} = <b>${r}</b>.`,
  resta_q: (a, b) => `¿Cuánto es <b>${a} − ${b}</b>?`,
  rs_col: (p, top, b0, carry, borrow, r, zeroLast) => {
    const col = ["Unidades", "Decenas", "Centenas"][p];
    const bot = carry ? `${b0} + 1 que me llevaba = ${b0 + 1}` : "";
    if (zeroLast) return `${col}: ${bot ? bot + "; " : ""}${top} − ${top} = 0 (un 0 a la izquierda no se escribe).`;
    const btm = b0 + carry;
    if (borrow) return `${col}: ${bot ? bot + "; " : ""}a ${top} no le puedo quitar ${btm}, así que le pongo un 1 delante: ${top + 10} − ${btm} = ${r}, y me llevo una.`;
    return `${col}: ${bot ? bot + "; " : ""}${top} − ${btm} = ${r}.`;
  },
  resta_s: (a, b, r, steps) => `En columna, empezando por las unidades. Si arriba hay menos que abajo, le pongo un 1 delante y me llevo una, que se suma a la cifra de abajo de la columna siguiente.<br>${steps.join("<br>")}<br>${a} − ${b} = <b>${r}</b>.`,
  pr_q0: (a, b, d) => `Si ${a} − ${b} = ${d}, ¿cuánto es <b>${d} + ${b}</b>?`,
  pr_s0: (d, b, a) => `Es la prueba de la resta: el resultado más lo que hemos quitado da el número de arriba (diferencia + sustraendo = minuendo). ${d} + ${b} = <b>${a}</b>.`,
  hueco_q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  pr_s1: (d, b, a) => `Falta el número de arriba. Vuelvo sumando lo que queda y lo que he quitado: ${d} + ${b} = <b>${a}</b>. Prueba: ${a} − ${b} = ${d}.`,
  pr_s2: (a, d, b) => `¿Cuánto he quitado para pasar de ${a} a ${d}? Resto: ${a} − ${d} = <b>${b}</b>. Prueba: ${d} + ${b} = ${a}.`,
  dp_q: [
    (N, a, b, c) => `${N} tenía ${a} € en la hucha. Se gastó ${b} € en un libro y después le regalaron ${c} €. ¿Cuántos euros tiene ahora?`,
    (N, a, b, c) => `En un autobús van ${a} personas. En una parada suben ${b} y bajan ${c}. ¿Cuántas personas van ahora en el autobús?`,
    (N, a, b, c) => `En una granja había ${a} huevos. Vendieron ${b} por la mañana y ${c} por la tarde. ¿Cuántos huevos quedan?`,
    (N, a, b, c) => `${N} lee ${a} páginas el lunes, ${b} el martes y ${c} el miércoles. ¿Cuántas páginas ha leído en total?`],
  dp_s: [
    (a, b, c, p, r) => `Primero se gasta: ${a} − ${b} = ${p}. Después le dan: ${p} + ${c} = <b>${r}</b>.`,
    (a, b, c, p, r) => `Primero suben: ${a} + ${b} = ${p}. Después bajan: ${p} − ${c} = <b>${r}</b>.`,
    (a, b, c, p, r) => `Por la mañana: ${a} − ${b} = ${p}. Por la tarde: ${p} − ${c} = <b>${r}</b>. También puedes sumar primero lo vendido: ${b} + ${c} = ${b + c}, y ${a} − ${b + c} = ${r}. ¡Sale lo mismo!`,
    (a, b, c, p, r) => `${a} + ${b} = ${p}, y ${p} + ${c} = <b>${r}</b>.`],
  grupos_q: (k, n) => `Hay ${k} grupos iguales. ¿Cuántas figuras hay en total?`,
  grupos_s: (k, n, sum, r) => `${k} grupos de ${n}: ${sum} = ${k} × ${n} = <b>${r}</b>.`,
  rep_q: (sum, n) => `Escribe como multiplicación: <b>${sum}</b> = ☐ × ${n}`,
  rep_s: (sum, k, n, r) => `El ${n} se suma <b>${k}</b> veces: ${sum} = ${k} × ${n} = ${r}.`,
  mult_q: e => `¿Cuánto es <b>${e}</b>?`,
  // «a × b» se lee «a veces b». La solución usa el truco de la tabla (t) que enseña la lección, en el orden preguntado
  mult_s: (a, b, r, t) => {
    const head = `${a} × ${b} = <b>${r}</b>. `;
    if (a === 0 || b === 0) return head + "(Cualquier número multiplicado por 0 da 0.)";
    if (a === 1 || b === 1) return head + "(Multiplicar por 1 deja el número igual.)";
    if (t === undefined || (a !== t && b !== t)) t = b;
    let m = b === t ? a : b, second = b === t;   // second: la tabla es el segundo número (a × 6: «a veces 6»)
    if (t >= 6 && t !== 10 && (m === 2 || m === 10)) { [t, m] = [m, t]; second = !second; }   // 6 × 2, 10 × 7…: mejor con la tabla fácil
    const x = second ? `${m} × ` : "", y = second ? "" : ` × ${m}`, P = k => `${x}${k}${y}`;   // P(5) → «4 × 5» o «5 × 4», en el orden preguntado
    const sum = (n, v) => Array(n).fill(v).join(" + ");
    let w;
    if (t === 2) w = `Es el doble de ${m}: ${m} + ${m} = ${r}.`;
    else if (t === 10) w = second ? `${m} decenas son ${r}.` : `El orden no importa: es como ${m} × 10, ${m} decenas, ${r}.`;
    else if (t === 3 || t === 5) w = second ? `Contamos de ${t} en ${t}, ${m} veces: ${Array.from({ length: m }, (_, i) => t * (i + 1)).join(", ")}.` : `${t} veces ${m}: ${sum(t, m)} = ${r}.`;
    else if (t === 4) w = `${P(2)} = ${2 * m}, y el doble: ${2 * m} + ${2 * m} = ${r}.`;
    else if (t === 8) w = `${P(4)} = ${4 * m}, y el doble: ${4 * m} + ${4 * m} = ${r}.`;
    else if (t === 6) w = `${P(5)} = ${5 * m}, y ${second ? "uno más en cada grupo" : "una vez más el " + m}: ${5 * m} + ${m} = ${r}.`;
    else if (t === 9) w = `${P(10)} = ${10 * m}, y ${second ? "uno menos en cada grupo" : "una vez menos el " + m}: ${10 * m} − ${m} = ${r}.`;
    else if (t === 7) w = `${P(5)} = ${5 * m} y ${P(2)} = ${2 * m}; ${5 * m} + ${2 * m} = ${r}.`;
    else w = `Es lo mismo que sumar ${a} veces el ${b}: ${sum(a, b)}.`;
    return head + w;
  },
  multh_s: (t, m, r) => m === 0 ? `${t} × <b>0</b> = 0: cualquier número multiplicado por 0 da 0.` : `Recitamos la tabla del ${t} hasta llegar a ${r}: ${Array.from({ length: m }, (_, i) => t * (i + 1)).join(", ")}. Son ${m} ${m === 1 ? "salto" : "saltos"}: ${t} × <b>${m}</b> = ${r}.`,
  dobtri_q: (t, m) => `¿Cuál es el <b>${t === 2 ? "doble" : "triple"}</b> de ${m}?`,
  dobtri_s: (t, m) => `El ${t === 2 ? "doble" : "triple"} es ${t} veces: ${t} × ${m} = ${Array(t).fill(m).join(" + ")} = <b>${t * m}</b>.`,
  filas_q: "¿Cuántas figuras hay? (Mira cuántas filas hay y cuántas tiene cada fila.)",
  filas_s: (k, n, sum, r) => `Hay ${k} filas de ${n}: ${k} × ${n} = ${sum} = <b>${r}</b>.`,
  quesuma_q: (k, n) => `¿Qué suma es lo mismo que <b>${k} × ${n}</b>?`,
  quesuma_s: (k, n, s, r) => `${k} × ${n} quiere decir «${k} veces ${n}»: el ${n} se suma ${k} veces. <b>${s}</b> = ${r}.`,
  paquetes: [["cromos", "sobres", 0], ["lápices", "cajas", 1], ["galletas", "paquetes", 0], ["canicas", "bolsas", 1], ["fresas", "cestas", 1], ["huevos", "hueveras", 1]],
  pm_q: (m, [obj, cont, fem], t) => (m === 1 ? `Hay 1 ${cont.replace(/s$/, "")} con ${t} ${obj}.` : `Hay ${m} ${cont} con ${t} ${obj} en cada ${fem ? "una" : "uno"}.`) + ` ¿Cuántos ${obj} hay en total?`.replace("Cuántos canicas", "Cuántas canicas").replace("Cuántos galletas", "Cuántas galletas").replace("Cuántos fresas", "Cuántas fresas"),
  objs: [["caramelos", 0], ["canicas", 1], ["cromos", 0], ["galletas", 1], ["pegatinas", 1], ["lápices", 0]],
  rep2_q: (n, obj, k, fem) => `Repartimos ${n} ${obj} entre ${k} amigos, a partes iguales. ¿${cu(fem)} le tocan a cada uno?`,
  rep2_s: (n, k, r) => `¿${k} veces qué número da ${n}? Recitamos la tabla del ${k}: ${Array.from({ length: r }, (_, i) => `${k} × ${i + 1} = ${k * (i + 1)}`).join(", ")}. A cada uno le tocan <b>${r}</b> (también sale dando uno a cada amigo por vueltas: ${r} vueltas).`,
  rep3_q: (n, obj, k, fem) => `Repartimos ${n} ${obj} entre ${k} amigos, a partes iguales. ¿${cu(fem)} le tocan a cada uno? ¿${cu(fem)} sobran?`,
  rep3_f: ["A cada uno", "Sobran"],
  rep3_s: (n, k, e, r) => `Recitamos la tabla del ${k} sin pasarnos de ${n}: …, ${k} × ${e} = ${k * e}, y ${k} × ${e + 1} = ${k * (e + 1)} ya se pasa. A cada uno le tocan <b>${e}</b> y sobran ${n} − ${k * e} = <b>${r}</b>.`,
  grp_q: (n, obj, g, fem) => `Tenemos ${n} ${obj} y las ponemos en bolsas de ${g}. ¿Cuántas bolsas llenamos?`.replace(/ y las ponemos/, fem ? " y las ponemos" : " y los ponemos"),
  grp_s: (n, g, k) => `Contamos de ${g} en ${g} hasta llegar a ${n}: ${Array.from({ length: k }, (_, i) => g * (i + 1)).join(", ")}. Son <b>${k}</b> bolsas, porque ${k} × ${g} = ${n}.`,
  fr_pl: ["mitades", "tercios", "cuartos"],
  fr_igual: "Son iguales",
  friq_q: w => `¿Esta barra está partida en <b>${w}</b>?`,
  friq_s: (ok, d, w) => ok ? `Tiene ${d} partes y todas son iguales: <b>sí</b> son ${w}.` : `Tiene ${d} partes, pero no son iguales (hay una más grande): <b>no</b> son ${w}.`,
  frcmp_q: (a, b) => `Dos pizzas iguales: una se parte en ${a} trozos iguales y la otra en ${b}. ¿Qué trozo es más grande?`,
  frcmp_s: (big, small) => `Con menos partes, cada parte es más grande: <b>${big.toLowerCase()}</b> es más grande que ${small.toLowerCase()}.`,
  fr_q: "¿Qué parte de la figura está coloreada?",
  fr_o: ["Un medio", "Un tercio", "Un cuarto"],
  fr_s: (d, w) => `La figura está partida en ${d} partes iguales y hay 1 coloreada: <b>${w.toLowerCase()}</b>.`,
  frc_w: ["la mitad", "un tercio", "un cuarto"],
  frc_q: (w, n) => `¿Cuánto es <b>${w}</b> de ${n}?`,
  frc_s: (n, d, r) => `Repartimos ${n} en ${d} partes iguales: en cada parte hay <b>${r}</b>, porque ${d} × ${r} = ${n}. Así que ${S.frc_w[d - 2]} de ${n} es ${r}.`,
  regla_q: st => st ? "¿Cuántos centímetros mide la tira? (¡Cuidado: no empieza en el 0!)" : "¿Cuántos centímetros mide la tira?",
  regla_s: (a, b, r) => a ? `Empieza en el ${a} y acaba en el ${b}: ${b} − ${a} = <b>${r} cm</b>.` : `Empieza en el 0 y acaba en el ${b}: mide <b>${r} cm</b>.`,
  mcm_q: m => `¿Cuántos centímetros son <b>${m} m</b>?`,
  mcm_s: (m, r) => `1 metro = 100 centímetros, así que ${m} m = <b>${r} cm</b>.`,
  mcm2_q: (m, c) => `¿Cuántos centímetros son <b>${m} m y ${c} cm</b>?`,
  mcm2_s: (m, c, r) => `${m} m = ${m * 100} cm, y ${m * 100} + ${c} = <b>${r} cm</b>.`,
  medir_cosas: [["la altura de una puerta", 0], ["el largo de una piscina", 0], ["lo que mide un árbol", 0], ["el peso de una sandía", 1], ["el peso de un perro", 1], ["lo que pesa una bolsa de patatas", 1], ["el agua de una bañera", 2], ["la leche de una botella", 2], ["el zumo de una jarra", 2]],
  unid_q: w => `¿Qué unidad usarías para medir ${w}?`,
  unid_o: ["Metros", "Kilos", "Litros"],
  unid_s: (w, u, k) => [`Es una longitud (cuánto mide): se mide en <b>metros</b>.`, `Es un peso (cuánto pesa): se mide en <b>kilos</b>.`, `Es una capacidad (cuánto líquido cabe): se mide en <b>litros</b>.`][k],
  pesos: [["patatas"], ["naranjas"], ["manzanas"], ["arroz"]],
  kg_q: (a, b, o) => `Una bolsa de ${o} pesa ${a} kg y otra bolsa pesa ${b} kg. ¿Cuántos kilos pesan entre las dos?`,
  kg_s: (a, b, r) => `${a} kg + ${b} kg = <b>${r} kg</b>.`,
  medios_q: n => `¿Cuántas botellas de medio litro hacen falta para llenar una garrafa de ${n} litros?`,
  medios_s: (n, r) => `Con 2 botellas de medio litro se llena 1 litro. Para ${n} litros: ${n} × 2 = <b>${r}</b> botellas.`,
  litros_q: (a, b) => `En un cubo había ${a} litros de agua y se ${b === 1 ? "usa 1 litro" : `usan ${b} litros`} para regar. ¿Cuántos litros quedan?`,
  litros_s: (a, b, r) => `${a} − ${b} = <b>${r} ${r === 1 ? "litro" : "litros"}</b>.`,
  hr_punto: h => `${la(h)} en punto`,
  hr_media: h => `${la(h)} y media`,
  hr_cuarto: h => `${la(h)} y cuarto`,
  hr_menos: h => `${la(h)} menos cuarto`,
  reloj_q: "¿Qué hora marca el reloj?",
  // la aguja larga dice «en punto, y cuarto, y media o menos cuarto»; la corta, la hora
  reloj_s: [
    (r, h) => `La aguja larga está en el 12: en punto. La corta está justo en el ${h}: <b>${r.toLowerCase()}</b>.`,
    (r, h, nh) => `La aguja larga está en el 6 (media vuelta, 30 minutos): y media. La corta está entre el ${h} y el ${nh}: ya ha pasado el ${h}. ${h === 1 ? "Es" : "Son"} <b>${r.toLowerCase()}</b>.`,
    (r, h) => `La aguja larga está en el 3 (un cuarto de vuelta, 15 minutos): y cuarto. La corta está un poco pasado el ${h}: <b>${r.toLowerCase()}</b>.`,
    (r, h, nh) => `La aguja larga está en el 9 (45 minutos): menos cuarto. La corta está casi en el ${nh}: falta un cuarto de hora para ${la(nh).toLowerCase()}. <b>${r}</b>.`],
  // cada número del reloj son 5 minutos para la aguja larga: la tabla del 5
  min_q: n => `La aguja larga está en el <b>${n}</b>. ¿Cuántos minutos han pasado desde la hora en punto?`,
  min_h: "Escribe solo el número de minutos",
  min_s: n => `Cada número del reloj son 5 minutos. Contamos de 5 en 5 desde el 12 hasta el ${n}: ${Array.from({ length: n }, (_, i) => 5 * (i + 1)).join(", ")}. ${n === 1 ? "Ha pasado" : "Han pasado"} <b>${5 * n}</b> minutos: ${n} × 5 = ${5 * n}.`,
  adig_q: "¿Qué marcaría un reloj digital a esta hora?",
  adig_s: (t, h, m, n) => `La aguja larga está en el ${n}: ${m === 0 ? "en punto, 0 minutos (en digital se escriben dos ceros, 00)" : `${n} × 5 = ${m} minutos`}. La corta ${m === 0 ? `está justo en el ${h}: la hora es ${h}` : m === 45 ? `está casi en el ${h % 12 + 1}, pero aún no ha llegado: la hora todavía es ${h}` : `ya ha pasado el ${h}: la hora es ${h}`}. Primero va la hora y, después de los dos puntos, los minutos: <b>${t}</b>.`,
  digw_s: (t, h, m, r) => (m === 45 ? `«Menos cuarto» quiere decir que aún no ${h % 12 + 1 === 1 ? "es la 1" : `son las ${h % 12 + 1}`}: la hora todavía es ${h} y han pasado 45 minutos. ` : "")
    + `Primero va la hora, ${h}; después de los dos puntos, los minutos: ${["en punto son 0 minutos y se escriben dos ceros, 00", "y cuarto son 15", "y media son 30", "menos cuarto son 45"][m / 15]}. Se escribe <b>${t}</b>.`,
  desp_q: (t, d) => `Un reloj digital marca <b>${t}</b>. ¿Qué marcará dentro de ${d === 15 ? "un cuarto de hora" : "media hora"}?`,
  desp_s: (m0, d, e, t) => `${d === 15 ? "Un cuarto de hora son 15 minutos" : "Media hora son 30 minutos"}. Sumo los minutos: ${m0} + ${d} = ${e}. La hora no cambia: <b>${t}</b>.`,
  dig_q: t => `Un reloj digital marca <b>${t}</b>. ¿Qué hora es?`,
  dur_q: (w, d) => `Una película de dibujos empieza a ${w.replace(/^las? /, x => x)} y dura ${d === 15 ? "un cuarto de hora" : "media hora"}. ¿A qué hora acaba?`,
  dur_s: (w, d, m, e, end) => `${d === 15 ? "Un cuarto de hora son 15 minutos: la aguja larga avanza un cuarto de vuelta" : "Media hora son 30 minutos: la aguja larga da media vuelta"}, del ${[12, 3, 6, 9][m / 15]} al ${[12, 3, 6, 9][e / 15]}. Acaba a <b>${end.toLowerCase()}</b>.`,
  digw_q: w => `¿Cómo se escribe «<b>${w}</b>» en un reloj digital?`,
  dig_s: (t, h, m, r) => `En el reloj digital va primero la hora y, después de los dos puntos, los minutos que han pasado. En ${t}, la hora es ${h} y los minutos, ${m === 0 ? "00" : m}. `
    + [`0 minutos: en punto.`, `15 minutos son un cuarto de hora: y cuarto.`, `30 minutos son media hora: y media.`, `45 minutos: falta un cuarto de hora para ${la(h % 12 + 1).toLowerCase()}, menos cuarto.`][m / 15] + ` ${h % 12 + (m === 45 ? 1 : 0) === 1 ? "Es" : "Son"} <b>${r.toLowerCase()}</b>.`,
  cmm_q: n => `¿Cuántos metros y centímetros son <b>${n} cm</b>?`,
  cmm_s: (n, m, c) => `Cada 100 cm son 1 metro. ${n} = ${m * 100} + ${c}: ${m * 100} cm son ${m} m, y quedan ${c} cm. Son <b>${m} m y ${c} cm</b>.`,
  cal_tit: (M, y) => `${M} de ${y}`,   // título de la hoja del mes (año sin separador de miles)
  cal_l: ["L", "M", "X", "J", "V", "S", "D"],
  cal_pl: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábados", "domingos"],
  calw_q: (d, M) => `Mira la hoja de ${M}. ¿Qué día de la semana es el <b>${d}</b>?`,
  calw_s: (d, l, w) => `Busco el ${d} en la hoja y subo por su columna hasta la letra: es una ${l}. El ${d} es <b>${w}</b>.`,
  cal7_q: (w, d, M) => `Hoy es ${w} ${d} de ${M}. ¿Qué día del mes será el ${w} siguiente?`,
  cal7_s: (d, w) => `Una semana después es otra vez ${w}: 7 días más. ${d} + 7 = <b>${d + 7}</b>. En la hoja está justo debajo del ${d}, en la misma columna.`,
  caln_q: w => `Mira la hoja del mes. ¿Cuántos <b>${w}</b> tiene este mes?`,
  caln_s: (w, ds) => `Busco la columna de los ${w} y cuento sus números: ${ds.join(", ")}. Son <b>${ds.length}</b>.`,
  calf_q: (d1, M, d2) => `Hoy es ${d1} de ${M}. ¿Cuántos días faltan para el ${d2}?`,
  calf_s: (d1, d2) => `Cuento en el calendario desde el ${d1 + 1} hasta el ${d2}: ${Array.from({ length: d2 - d1 }, (_, i) => d1 + 1 + i).join(", ")}. Faltan <b>${d2 - d1}</b> días. (También: ${d2} − ${d1} = ${d2 - d1}.)`,
  din_q: "¿Cuánto dinero hay? Escribe los euros y los céntimos.",
  eur_f: "€",   // rótulo de la casilla de los euros
  cent: "céntimos",
  din_s: (e, c) => `Sumamos los billetes y las monedas de euro (${e} €) y después las de céntimo (${c} céntimos): <b>${e} € y ${c} céntimos</b>.`,
  // [cosa, precio mínimo y máximo en céntimos]
  tienda: [["Un chicle", 10, 30], ["Un caramelo", 10, 25], ["Una piruleta", 30, 60], ["Un lápiz", 40, 90], ["Una goma de borrar", 30, 80],
    ["Un sobre de cromos", 50, 100], ["Un zumo pequeño", 60, 120], ["Un helado", 120, 190], ["Un cuaderno pequeño", 110, 190], ["Una barra de pan", 60, 120]],
  precio: p => p < 100 ? `${p} céntimos` : p % 100 ? `1 € y ${p % 100} céntimos` : "1 €",
  cambio_q: (t, p, e) => `${t} cuesta ${S.precio(p)} y pagas con una moneda de ${e} €. ¿Cuántos céntimos te devuelven?`,
  cambio2_q: (t, p, e) => `${t} cuesta ${S.precio(p)} y pagas con una moneda de ${e} €. ¿Cuánto te devuelven? Escribe los euros y los céntimos.`,
  cambio_s: (pay, p, r) => `${pay / 100} € = ${pay} céntimos${p >= 100 ? ` y ${S.precio(p)} = ${p} céntimos` : ""}. ${pay} − ${p} = ${r} céntimos` + (r >= 100 ? `, es decir, <b>${S.precio(r)}</b> (100 céntimos = 1 €).` : `: te devuelven <b>${r} céntimos</b>.`),
  lin_q: "¿Qué tipo de línea es?",
  lin_o: ["Recta", "Curva", "Poligonal", "Mixta"],
  lin_s: ["No se tuerce nunca: es una línea <b>recta</b>.", "Se tuerce suavemente, sin esquinas: es una línea <b>curva</b>.", "Está formada por trozos rectos unidos: es una línea <b>poligonal</b>.", "Tiene un trozo recto y otro curvo: es una línea <b>mixta</b>."],
  lados_q: "¿Cuántos lados tiene este polígono?",
  lados_s: n => `Contamos los lados uno a uno, sin repetir ninguno: ${Array.from({ length: n }, (_, i) => i + 1).join(", ")}. Tiene <b>${n}</b>.`,
  abce_q: "¿Es una línea abierta o cerrada?",
  abce_o: ["Abierta", "Cerrada"],
  abce_s: ["Tiene un hueco: no acaba donde empieza. Es <b>abierta</b>.", "Si la recorres con el dedo, acabas en el mismo punto donde empezaste: es <b>cerrada</b>."],
  pol_q: "¿Cómo se llama este polígono?",
  pol_o: ["Triángulo", "Cuadrilátero", "Pentágono", "Hexágono", "Heptágono", "Octógono"],
  pol_s: (n, w) => `Cuento los lados: ${Array.from({ length: n }, (_, i) => i + 1).join(", ")}. Tiene ${n}: es un <b>${w.toLowerCase()}</b>.`,
  sim_q: "Si doblas el papel por la línea roja, ¿las dos mitades son iguales? (¿Es simétrico el dibujo?)",
  sim_o: ["Sí", "No"],
  sim_s: ["Si doblamos el papel por la línea roja, los dos lados coinciden: <b>sí</b> es simétrico.", "Si doblamos por la línea roja, hay algún cuadrado que no coincide con su pareja: <b>no</b> es simétrico."],
  cats: ["fútbol", "baile", "natación", "tenis", "ciclismo"],   // nombres cortos: los rótulos de SVG.bars están a 56 px
  bar_q: c => `El gráfico muestra el deporte favorito de una clase. ¿Cuántos eligieron <b>${c}</b>?`,
  bar_s: (c, n) => `La barra de ${c} llega hasta el <b>${n}</b>.`,
  barmas_q: "El gráfico muestra el deporte favorito de una clase. ¿Cuál es el deporte <b>más</b> elegido?",
  barmenos_q: "El gráfico muestra el deporte favorito de una clase. ¿Cuál es el deporte <b>menos</b> elegido?",
  barmas_s: (c, big) => `La barra ${big ? "más alta" : "más baja"} es la de <b>${c}</b>.`,
  bartot_q: "El gráfico muestra el deporte favorito de una clase. ¿Cuántos alumnos hay en total?",
  bartot_s: (sum, r) => `Sumamos todas las barras: ${sum} = <b>${r}</b>.`,
  bardif_q: (a, b) => `El gráfico muestra el deporte favorito de una clase. ¿Cuántos alumnos más eligieron <b>${a}</b> que <b>${b}</b>?`,
  bardif_s: (a, va, b, vb) => `La barra de ${a} llega al ${va} y la de ${b}, al ${vb}. Comparamos restando: ${va} − ${vb} = <b>${va - vb}</b> más.`,
  azar_mucho: (m, o, many) => many ? `Hay muchas bolas ${m}s, pero también hay una ${o} que podría salir: es <b>posible</b>, no seguro.`.replace("azuls", "azules") : `Solo hay una bola ${o}, pero está en la bolsa y podría salir: es <b>posible</b>, aunque es más fácil sacar una ${m}.`,
  colores: ["rojo", "azul", "verde", "amarillo", "naranja", "morado"],
  pal_q: "¿Cuántos votos marcan estos palotes?",
  pal_s: n => n < 5 ? `Contamos los palotes uno a uno: <b>${n}</b>.` : n < 10 ? `Hay un grupo cruzado, que vale 5.` : `Cada grupo cruzado vale 5: ${Array.from({ length: Math.floor(n / 5) }, (_, i) => 5 * (i + 1)).join(", ")}.` + (n % 5 ? ` Después, ${n % 5} ${n % 5 === 1 ? "suelto" : "sueltos"}: ${5 * Math.floor(n / 5)} + ${n % 5} = <b>${n}</b>.` : ` No hay sueltos: son <b>${n}</b>.`),
  paltot_q: "Así ha votado una clase su color favorito. ¿Cuántos niños han votado en total?",
  paltot_s: (rows, sum, r) => `Primero pasamos los palotes a números (de 5 en 5 y luego los sueltos): ${rows}. Después sumamos: ${sum} = <b>${r}</b>.`,
  paluno_q: c => `Así ha votado una clase su color favorito. ¿Cuántos votos tiene el <b>${c}</b>?`,
  paldif_q: (a, b) => `Así ha votado una clase su color favorito. ¿Cuántos votos más tiene el <b>${a}</b> que el <b>${b}</b>?`,
  paldif_s: (a, na, b, nb) => `Contamos los palotes de 5 en 5: el ${a} tiene ${na} y el ${b}, ${nb}. Comparamos restando: ${na} − ${nb} = <b>${na - nb}</b> más.`,
  bolas: ["roja", "azul", "verde", "amarilla"],
  azar_q: c => `Sin mirar, sacamos una bola de la bolsa. Sacar una bola <b>${c}</b> es…`,
  azar_o: ["Seguro", "Posible", "Imposible"],
  azar_s: [c => `Todas las bolas son de ese color: es <b>seguro</b>.`, c => `Hay bolas ${c}s y de otros colores: puede salir o no. Es <b>posible</b>.`.replace("azuls", "azules"), c => `No hay ninguna bola ${c} en la bolsa: es <b>imposible</b>.`],
});
// ═════ Textos de los generadores nuevos de la ronda de mejoras ═════
const elella = f => f ? "ella" : "él";
// m2.dospasos: nombres de los problemas
S.dp_nombres = ["Lucía", "Hugo", "Sara", "Leo", "Nora", "Mateo", "Alba", "Omar", "Irene", "Bruno", "Aisha", "Iker", "Mei", "Dani"];
// m2.dospasos, «de compras»: [cosa, precio mínimo y máximo en euros]
S.compras = [["un cuento", 6, 12], ["una pelota", 8, 15], ["un puzle", 5, 12], ["una camiseta", 8, 16], ["un estuche", 4, 9], ["un libro", 7, 14], ["una cometa", 9, 18], ["unos rotuladores", 3, 8]];
S.dp_compra_q = (N, c1, a, c2, b, p) => `${N} compra ${c1} de ${a} € y ${c2} de ${b} €. Paga con un billete de ${p} €. ¿Cuántos euros le devuelven?`;
S.dp_compra_s = (a, b, p) => `Primero, lo que cuesta todo: ${a} + ${b} = ${a + b} €. Después, la vuelta: ${p} − ${a + b} = <b>${p - a - b} €</b>.`;
// m2.prob
S.PB = {
  nombres: [["Lucía", 1], ["Hugo", 0], ["Sara", 1], ["Leo", 0], ["Nora", 1], ["Mateo", 0], ["Alba", 1], ["Omar", 0], ["Irene", 1], ["Bruno", 0], ["Aisha", 1], ["Iker", 0]],
  objs: [["cromos", 0, 600], ["pegatinas", 1, 400], ["canicas", 1, 300], ["puntos", 0, 950]],   // [cosa, femenino, máximo creíble]
  q: [
    (N, fN, M, fM, a, b, o, fo) => `${N} tiene ${a} ${o} y ${M} tiene ${b}. ¿${fo ? "Cuántas" : "Cuántos"} ${o} tienen en total?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} tenía ${a} ${o} y le regala ${b} a ${M}. ¿${fo ? "Cuántas" : "Cuántos"} le quedan?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} tiene ${a} ${o} y ${M}, ${b}. ¿${fo ? "Cuántas" : "Cuántos"} ${o} más tiene ${N}?`,
    (N, fN, M, fM, a, b, o, fo) => `Un álbum tiene ${a} huecos para ${o}. ${N} ya ha pegado ${b}. ¿${fo ? "Cuántas" : "Cuántos"} le faltan para llenarlo?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} tiene ${a} ${o} y ${M} tiene ${b} más que ${elella(fN)}. ¿${fo ? "Cuántas" : "Cuántos"} ${o} tiene ${M}?`],
  s: [
    (a, b, r, o) => `Pienso: juntamos, así que sumo. Calculo: ${a} + ${b} = ${r}. Tienen <b>${r}</b> ${o} en total.`,
    (a, b, r, o) => `Pienso: regala, así que tiene menos: resto. Calculo: ${a} − ${b} = ${r}. Compruebo: ${r} + ${b} = ${a}. Le quedan <b>${r}</b>.`,
    (a, b, r, o) => `Pienso: comparo, así que resto el pequeño al grande. Calculo: ${a} − ${b} = ${r}. Compruebo: ${r} + ${b} = ${a}. Tiene <b>${r}</b> más.`,
    (a, b, r, o) => `Pienso: ¿cuántos faltan?, así que resto. Calculo: ${a} − ${b} = ${r}. Compruebo: ${b} + ${r} = ${a}. Le faltan <b>${r}</b>.`,
    (a, b, r, o, M) => `Pienso: ${M} tiene más, así que sumo (busco el número más grande). Calculo: ${a} + ${b} = ${r}. ${M} tiene <b>${r}</b> ${o}.`],
};
// m2.cuerpo (en el orden de SOLIDS en gen/mat2.js)
S.cue_o = ["Cubo", "Prisma", "Pirámide", "Cilindro", "Cono", "Esfera"];
S.cue_why = ["tiene 6 caras cuadradas, todas iguales", "es como una caja: dos bases iguales y caras de los lados rectangulares", "tiene una base y caras en forma de triángulo que acaban en punta",
  "tiene dos bases redondas y una parte curva", "tiene una base redonda y termina en punta", "es redonda por todas partes"];
S.cue_q = "¿Qué cuerpo geométrico es?";
S.cue_s = (w, why) => `Es ${w === "pirámide" || w === "esfera" ? "una" : "un"} <b>${w}</b>: ${why}.`;
S.cue_cosas = [["un dado", 0], ["un cubito de hielo", 0], ["un ladrillo", 1], ["un brik de leche", 1], ["una caja de cereales", 1], ["una pirámide de Egipto", 2], ["una lata de tomate", 3], ["un tubo de pegamento en barra", 3], ["un cucurucho de helado", 4], ["un embudo puesto del revés", 4], ["una pelota", 5], ["una canica", 5], ["una naranja", 5]];
S.cuecosa_q = w => `¿Qué forma tiene ${w}?`;
S.cuecosa_s = (w, c, why) => `${w} tiene forma de <b>${c}</b>: ${why}.`;
S.rueda_q = "¿Puede rodar este cuerpo?";
S.rueda_s = (w, rolls, k) => rolls ? `${w === "esfera" ? "La esfera" : w === "cono" ? "El cono" : "El cilindro"} tiene una parte curva: <b>sí</b> puede rodar${k === 5 ? "" : " (si lo tumbas)"}.` : `${w === "pirámide" ? "La pirámide" : w === "prisma" ? "El prisma" : "El cubo"} solo tiene caras planas: <b>no</b> rueda, se desliza o se queda quieto.`;
// m2.simpareja
S.izq = "a la izquierda"; S.der = "a la derecha";
S.sp_q = "El cuadrado azul tiene una pareja simétrica al otro lado de la línea roja (el eje). ¿Dónde va su pareja?";
S.sp_o = (n, side) => `${n} ${n === 1 ? "cuadro" : "cuadros"} ${side} del eje`;
S.sp_s = (d, from, to) => `Contamos los cuadros desde el eje: el cuadrado azul está a ${d} ${d === 1 ? "cuadro" : "cuadros"}, ${from}. Su pareja va a los mismos cuadros, pero al otro lado: <b>${d} ${d === 1 ? "cuadro" : "cuadros"} ${to} del eje</b>.`;
// m2.camino
S.cam_h = (n, right) => `${n} ${n === 1 ? "cuadro" : "cuadros"} a la ${right ? "derecha" : "izquierda"}`;
S.cam_v = (n, up) => `${n} hacia ${up ? "arriba" : "abajo"}`;
S.cam_o = (h, v) => `${h.charAt(0).toUpperCase() + h.slice(1)} y ${v}`;
S.cam_q = "El robot verde (R) quiere llegar a la estrella. ¿Qué camino tiene que seguir?";
S.cam_s = (h, v) => `Desde el robot cuento los cuadros hasta la columna de la estrella, sin contar el de salida: ${h}. Después, hasta su fila: ${v}. El camino es <b>${h} y ${v}</b>.`;
S.camn_q = "El robot verde (R) va hasta la estrella: primero hacia los lados y después hacia arriba o hacia abajo. ¿Cuántos cuadros recorre en total?";
S.camn_s = (h, v, a, b) => `Sin contar el cuadro de salida: ${h} y ${v}. En total, ${a} + ${b} = <b>${a + b}</b> cuadros.`;
S.camlet_q = (h, v) => `El robot verde (R) va ${h} y después ${v}. ¿A qué letra llega?`;
S.camlet_s = (h, v, l) => `Desde el robot, sin contar su cuadro: ${h}, y después ${v}. Llega a la <b>${l}</b>.`;
// ═════ Ordinales del 1.º al 10.º y medir a ojo (textos de los generadores añadidos) ═════
const cap2 = s => s.charAt(0).toUpperCase() + s.slice(1);
const ela = f => f ? "la" : "el";
const de2 = s => s.startsWith("el ") ? "del " + s.slice(3) : "de " + s;
const apoc = w => w === "primero" ? "primer" : w === "tercero" ? "tercer" : w;

// m2.ordinal
S.OD = {
  ordM: ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"],
  ordF: ["primera", "segunda", "tercera", "cuarta", "quinta", "sexta", "séptima", "octava", "novena", "décima"],
  fig: [["el círculo", 0], ["el cuadrado", 0], ["el triángulo", 0], ["la estrella", 1], ["el corazón", 0], ["el rectángulo", 0]],
  col: [["rojo", "roja"], ["azul", "azul"], ["verde", "verde"], ["amarillo", "amarilla"], ["morado", "morada"]],
  nom: (fig, col) => `${fig} ${col}`,   // «el círculo rojo»
  delante: "tobogán",
  cola_q: (x, back) => `Las figuras hacen cola para tirarse por el tobogán. ¿Qué puesto tiene <b>${x}</b> contando desde <b>${back ? "detrás" : "delante"}</b>?`,
  cola_s: (x, before, pos, w, back, f) => `${back ? "Detrás" : "Delante"} ${de2(x)} ${before === 0 ? "no hay ninguna figura" : before === 1 ? "hay 1 figura" : `hay ${before} figuras`}, así que, contando desde ${back ? "detrás" : "delante"}, ${f ? "ella" : "él"} va en el puesto ${pos}: es ${ela(f)} <b>${w}</b>.`,
  lee_q: a => `¿Cómo se lee <b>${a}</b>?`,
  lee_s: (a, n, f, w) => `${a} es el puesto ${n}, y la letra «${f ? "a" : "o"}» nos dice que va con «${ela(f)}»: <b>${w}</b>.`,
  esc_q: w => `¿Cómo se escribe con número el ordinal «<b>${w}</b>»?`,
  esc_s: (w, n, f, a) => `${cap2(w)} es el puesto ${n}. Se escribe con el número, un punto y una «${f ? "a" : "o"}» pequeña, porque va con «${ela(f)}»: <b>${a}</b>.`,
  nombres: [["Pablo", 0], ["Ana", 1], ["Lucía", 1], ["Hugo", 0], ["Sara", 1], ["Leo", 0], ["Nora", 1], ["Iker", 0]],
  delante_q: (x, f, a) => `En la cola del comedor, ${x} es ${ela(f)} ${a}. ¿Cuántos niños tiene delante?`,
  delante_s: (p, f) => p === 2 ? `Delante de ${f ? "ella" : "él"} solo está el 1.º: <b>1</b> niño.` : `Delante de ${f ? "ella" : "él"} están los puestos del 1.º al ${p - 1}.º: <b>${p - 1}</b> niños.`,
  detras_q: (x, f, N, a) => `En la cola hay ${N} niños y ${x} es ${ela(f)} ${a} contando desde delante. ¿Cuántos niños tiene detrás?`,
  detras_s: (N, p, f) => `Hay ${N} en la cola: ${f ? "ella" : "él"} y ${p - 1 === 1 ? "el de delante" : `los ${p - 1} de delante`} son ${p}. Detrás quedan ${N} − ${p} = <b>${N - p}</b>.`,
  desde_q: (x, f, N, a) => `En la cola hay ${N} niños y ${x} es ${ela(f)} ${a} contando desde delante. ¿Qué puesto tiene contando desde detrás?`,
  desde_s: (x, N, p, back, w) => `Detrás de ${x} hay ${N} − ${p} = ${N - p} ${N - p === 1 ? "niño" : "niños"}. Contando desde detrás, va justo después de ${N - p === 1 ? "él" : "ellos"}: es el puesto ${back}, <b>${w}</b>.`,
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  dia_q: w => `Empezando por el lunes, ¿qué día de la semana es el <b>${w}</b>?`,
  dia_s: (list, d, w) => `Contamos desde el lunes: ${list}. El ${w} es el <b>${d}</b>.`,
  meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  mes_q: w => `¿Qué mes del año es el <b>${w}</b>?`,
  mesl_q: m => `¿Qué puesto ocupa <b>${m}</b> entre los meses del año?`,
  mes_s: (list, m, w) => `Contamos desde enero: ${list}. ${cap2(m)} es el <b>${apoc(w)}</b> mes del año.`,
  ult_q: N => `En una carrera llegan ${N} corredores. ¿Qué puesto tiene el último?`,
  ult_s: (N, w) => `Si hay ${N} corredores, el último llega en el puesto ${N}: es el <b>${w}</b>.`,
  desp_q: w => `¿Qué ordinal va justo <b>después</b> del ${w}?`,
  ant_q: w => `¿Qué ordinal va justo <b>antes</b> del ${w}?`,
  sig_s: (w, a, r, ar, after) => `${cap2(w)} es ${a}; ${after ? "después" : "antes"} va ${ar}: <b>${r}</b>.`,
};

// m2.medirojo
S.MO = {
  nombres: [["Sara", 1], ["Leo", 0], ["Ana", 1], ["Hugo", 0], ["Nora", 1], ["Omar", 0]],
  // [sitio, metros (mín., máx.)]
  sitios: [["su cuarto", 3, 5], ["el pasillo", 4, 9], ["la cocina", 3, 5], ["el salón", 4, 7], ["la clase", 6, 9]],
  pasos_q: (x, w, n) => `${x} cruza ${w} en ${n} pasos. Si 2 pasos son más o menos 1 metro, ¿cuántos metros mide ${w}, más o menos?`,
  pasos_s: (n, m, w) => `${n} pasos son ${m} parejas de pasos, y cada pareja es más o menos 1 metro: ${w} mide unos <b>${m}</b> metros.`,
  // [cosa, palmos (mín., máx.)]
  palmos: [["un cuaderno", 2, 2], ["un cojín", 2, 3], ["una mesa", 4, 6], ["una estantería", 4, 6], ["una alfombra pequeña", 5, 6], ["la ventana", 4, 6]],
  palmo_q: (w, n) => `Tu palmo mide unos 15 cm. ${cap2(w)} mide ${n} palmos de largo. ¿Cuántos centímetros mide, más o menos?`,
  palmo_s: (n, w) => `Sumamos 15 cm por cada palmo: ${Array(n).fill(15).join(" + ")} = ${15 * n}. ${cap2(w)} mide unos <b>${15 * n}</b> cm.`,
  vasos_q: l => `Un vaso de agua es más o menos un cuarto de litro. ¿Cuántos vasos llenan ${l === 1 ? "una botella de 1 litro" : `${l} botellas de 1 litro`}?`,
  vasos_s: l => `Un litro tiene cuatro cuartos: cada botella llena unos 4 vasos.${l > 1 ? ` ${Array(l).fill(4).join(" + ")} = ${4 * l}.` : ""} Hacen falta unos <b>${4 * l}</b> vasos.`,
  litros_q: v => `Un vaso de agua es más o menos un cuarto de litro. Con una jarra llenas ${v} vasos. ¿Cuántos litros caben en la jarra, más o menos?`,
  litros_s: v => `Cada 4 vasos son más o menos 1 litro, y ${v} vasos son ${v / 4} ${v / 4 === 1 ? "grupo" : "grupos"} de 4: ${v / 4 === 1 ? "más o menos <b>1</b> litro" : `unos <b>${v / 4}</b> litros`}.`,
  bank_q: [w => `¿Cuánto mide de alto, más o menos, ${w}?`, w => `¿Cuánto mide de largo, más o menos, ${w}?`, w => `¿Cuánto pesa, más o menos, ${w}?`, w => `¿Cuánta agua cabe, más o menos, en ${w}?`],
  // [qué, 0 alto · 1 largo · 2 peso · 3 capacidad, opciones (la buena primero), explicación]
  bank: [
    ["la puerta de tu clase", 0, ["Unos 2 metros", "Unos 20 centímetros", "Unos 20 metros"], "Una persona mayor pasa por la puerta sin agacharse: la puerta mide algo más que ella, <b>unos 2 metros</b>."],
    ["tu cama", 1, ["Unos 2 metros", "Unos 20 centímetros", "Unos 20 metros"], "En tu cama cabe una persona mayor tumbada: mide <b>unos 2 metros</b>, unos 4 pasos."],
    ["un lápiz nuevo", 1, ["Unos 15 centímetros", "Unos 15 metros", "Unos 2 centímetros"], "Un lápiz nuevo es más o menos como tu palmo: <b>unos 15 centímetros</b>."],
    ["un autobús", 1, ["Unos 12 metros", "Unos 12 centímetros", "Unos 120 metros"], "Para recorrer un autobús de punta a punta das unos 24 pasos, 12 parejas: <b>unos 12 metros</b>."],
    ["la mesa del cole", 1, ["Unos 60 centímetros", "Unos 6 centímetros", "Unos 6 metros"], "Mide unos 4 palmos: 15 + 15 + 15 + 15 = 60, <b>unos 60 centímetros</b>."],
    ["un libro de clase", 1, ["Unos 30 centímetros", "Unos 3 centímetros", "Unos 3 metros"], "Mide unos 2 palmos: 15 + 15 = 30, <b>unos 30 centímetros</b>."],
    ["la pizarra de tu clase", 1, ["Unos 3 metros", "Unos 30 centímetros", "Unos 30 metros"], "La recorres en unos 6 pasos, 3 parejas: <b>unos 3 metros</b>."],
    ["un gato", 2, ["Unos 4 kg", "Unos 40 kg", "Unos 400 kg"], "Un gato pesa como unos pocos paquetes de arroz de 1 kg: <b>unos 4 kg</b>. 40 kg es lo que pesa un niño mayor."],
    ["una sandía grande", 2, ["Unos 5 kg", "Unos 50 kg", "Unos 500 kg"], "Pesa como 5 paquetes de arroz: <b>unos 5 kg</b>. 50 kg pesa una persona mayor."],
    ["tu mochila del cole", 2, ["Unos 3 kg", "Unos 30 kg", "Unos 300 kg"], "Pesa como 3 paquetes de arroz de 1 kg: <b>unos 3 kg</b>. ¡Con 30 kg no podrías ni levantarla!"],
    ["un niño de 2.º de Primaria", 2, ["Unos 25 kg", "Unos 2 kg", "Unos 250 kg"], "Un niño de 7 u 8 años pesa como 25 paquetes de arroz: <b>unos 25 kg</b>. 2 kg es menos que un bebé recién nacido."],
    ["una persona mayor", 2, ["Unos 70 kg", "Unos 7 kg", "Unos 700 kg"], "Una persona mayor pesa <b>unos 70 kg</b>. 7 kg pesa un gato grande, y 700 kg, ¡un caballo!"],
    ["un cubo de fregar", 3, ["Unos 6 litros", "Unos 60 litros", "Unos 600 litros"], "Si imaginas botellas de 1 litro dentro del cubo, caben unas 6: <b>unos 6 litros</b>."],
    ["un cubo de playa", 3, ["Unos 2 litros", "Unos 20 litros", "Unos 200 litros"], "Caben como 2 botellas grandes de agua: <b>unos 2 litros</b>. ¡200 litros no caben ni en una bañera pequeña!"],
    ["una garrafa de agua", 3, ["Unos 5 litros", "Unos 50 litros", "Unos 500 litros"], "Una garrafa tiene lo mismo que 5 botellas grandes de agua: <b>unos 5 litros</b>."],
    ["una bañera", 3, ["Unos 200 litros", "Unos 2 litros", "Unos 20 litros"], "En una bañera caben muchísimas botellas de agua: <b>unos 200 litros</b>. 2 litros son solo 2 botellas."],
  ],
  pesados: ["la mochila", "la bolsa de la compra", "la caja de juguetes", "la cesta de fruta"],
  kg_q: (x, a, y, b) => `${cap2(x)} pesa como ${a === 1 ? "1 paquete" : `${a} paquetes`} de arroz de 1 kg y ${y}, como ${b === 1 ? "1 paquete" : `${b} paquetes`}. ¿Cuántos kilos pesan entre las dos, más o menos?`,
  kg_s: (a, b) => `Cada paquete de arroz pesa 1 kg: ${a} + ${b} = ${a + b}. Pesan unos <b>${a + b}</b> kg.`,
  cubos: ["un cubo de fregar", "una olla grande", "una regadera grande"],
  bot_q: (w, n, u) => `En ${w} caben unas ${n} botellas de 1 litro. Ya has echado ${u === 1 ? "1 botella" : `${u} botellas`}. ¿Cuántos litros más caben, más o menos?`,
  bot_s: (n, u) => `Cada botella es 1 litro: caben ${n} litros y ya ${u === 1 ? "hay 1" : `hay ${u}`}. ${n} − ${u} = <b>${n - u}</b> ${n - u === 1 ? "litro" : "litros"} más.`,
  quien_q: (a, e1, b, e2, w, m, cm) => `${a} dice que ${w} mide unos ${e1} metros y ${b}, unos ${e2} metros. Lo miden con la cinta métrica: mide ${m} m y ${cm} cm. ¿Quién ha estimado mejor?`,
  quien_s: (m, cm, g, b, who) => `${m} m y ${cm} cm está muy cerca de ${g} m y muy lejos de ${b} m: ha estimado mejor <b>${who}</b>. Una buena estimación se acerca a la medida de verdad.`,
};
// ── fin: ═════ Ordinales del 1.º al 10.º y medir a ojo (textos de los generadores añadidos) ═════
})();
