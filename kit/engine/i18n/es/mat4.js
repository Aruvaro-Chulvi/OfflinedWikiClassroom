/* WikiAula — textos de gen/mat4.js (Matemáticas, Grado 4), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m4 = G.m4 || {};
const hm = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
// División con resto sin «=» (75 : 12 no es igual a 6): «75 : 12 da 6 y sobran 3»; si es exacta, «72 : 12 = 6»
const divr = (n, c, q, r) => r ? `${n} : ${c} da ${q} y ${r === 1 ? "sobra 1" : `sobran ${r}`}` : `${n} : ${c} = ${q}`;
Object.assign(S, {
  pos: ["las unidades", "las decenas", "las centenas", "las unidades de millar", "las decenas de millar", "las centenas de millar", "las unidades de millón"],
  // nombres de personas de m4.combinados y m4.dospasos
  nombres: ["Lucía", "Hugo", "Sara", "Leo", "Nora", "Mateo", "Alba", "Omar", "Irene", "Bruno", "Aisha", "Iker", "Mei", "Dani"],
  valor_q: (n, d) => `En el número <b>${n}</b>, ¿cuánto vale la cifra <b>${d}</b>?`,
  valor_s: (d, pos, v) => `La cifra ${d} está en ${pos}, así que vale <b>${v}</b>.`,
  letras_q: w => `Escribe con cifras: <b>${w}</b>.`,
  letras2_q: n => `¿Cómo se lee el número <b>${n}</b>?`,
  letras_s: (w, n) => `<b>${n}</b> se lee <b>${w}</b>.`,
  desc_q: p => `¿Qué número es <b>${p}</b>?`,
  desc_s: n => `Sumamos los valores de cada cifra: <b>${n}</b>.`,
  desc2_q: (n, pos) => `¿Qué cifra ocupa ${pos} en el número <b>${n}</b>?`,
  desc2_s: (n, pos, d, v) => `Contando desde la derecha, en ${pos} de ${n} está el <b>${d}</b> (vale ${v}).`,
  redp: ["", "", "", "los millares", "las decenas de millar", "las centenas de millar"],
  red_q: (n, p) => `Aproxima <b>${n}</b> a ${p} (redondeando).`,
  red_s: (pos, look, up, r) => `Miramos la cifra de ${pos}: es ${look}. ${up ? "Como es 5 o más, subimos una unidad" : "Como es menor que 5, se queda igual"} y las cifras de la derecha pasan a ser ceros: <b>${r}</b>.`,
  rom_q: r => `¿Qué número es <b>${r}</b> en números romanos?`,
  rom2_q: n => `Escribe <b>${n}</b> con números romanos.`,
  rom_hint: "Usa las letras I, V, X, L, C, D y M.",
  // parts: [[valor, romano, ¿resta?], …] por órdenes (millares, centenas, decenas, unidades)
  rom_s: (r, n, parts) => {
    const sub = parts.filter(p => p[2]).map(([v, ro]) => { const u = 10 ** (String(v).length - 1); return `${ro} = ${v / u === 4 ? 5 * u : 10 * u} − ${u} = ${v}`; });
    if (parts.length === 1) return sub.length ? `Una letra menor delante de una mayor resta: ${sub[0]}. <b>${r} = ${n}</b>.` : `<b>${r} = ${n}</b>.`;
    return `Separo por órdenes: ${parts.map(p => p[1]).join(" + ")} = ${parts.map(p => p[0]).join(" + ")} = <b>${n}</b>.${sub.length ? ` (Si una letra menor va delante de una mayor, se resta: ${sub.join("; ")}.)` : ""}`;
  },
  rom2_s: (r, n, parts) => {
    const piece = ([v, ro, s]) => { if (!s) return `${v} = ${ro}`; const u = 10 ** (String(v).length - 1); return `${v} = ${v / u === 4 ? 5 * u : 10 * u} − ${u} = ${ro}`; };
    return parts.length === 1 ? `${piece(parts[0]).slice(0, -r.length)}<b>${r}</b>.` : `Separo por órdenes: ${n} = ${parts.map(p => p[0]).join(" + ")}.<br>${parts.map(piece).join("; ")}.<br>Junto los trozos: <b>${r}</b>.`;
  },
  op_q: e => `Calcula <b>${e}</b>.`,
  // rows: [cifra de abajo, lugar (0 unidades, 1 decenas, 2 centenas), producto ya colocado]
  mult_s: (top, bot, rows, r, sw, N) => {
    const ord = ["unidades", "decenas", "centenas"];
    const ln = rows.map(([c, i, p]) => !c ? `${N(top)} × 0 ${ord[i]} = 0: me salto la fila` : i === 0 ? `${N(top)} × ${c} = ${N(p)} (empiezo en las unidades)` : `${N(top)} × ${c} = ${N(p / 10 ** i)} (empiezo en las ${ord[i]}: son ${N(p)})`);
    const sum = rows.filter(x => x[0]).map(x => N(x[2]));
    return `${sw ? `Pongo arriba el número de más cifras: ${N(top)} × ${N(bot)}.<br>` : ""}${ln.join("<br>")}<br>${sum.length > 1 ? `Sumo: ${sum.join(" + ")} = <b>${N(r)}</b>.` : `Resultado: <b>${N(r)}</b>.`}`;
  },
  jer_q: e => `Calcula <b>${e}</b>.`,
  jer_s: (pasos, r, par) => `${par ? "Primero el paréntesis" : "Primero las multiplicaciones y divisiones, después las sumas y restas"}: ${pasos} = <b>${r}</b>.`,
  cb_q: [
    (N, n, p, m, q) => `${N} compra ${n} libros a ${p} € cada uno y ${m} cuadernos a ${q} € cada uno. ¿Cuánto paga en total?`,
    (c, per, v) => `Una tienda recibe ${c} cajas con ${per} botellas cada una y vende ${v} botellas. ¿Cuántas botellas le quedan?`,
    (N, d, s) => `${N} lee ${d} minutos cada día. ¿Cuántos minutos lee en ${s} semanas?`,
    (t, p, e) => `Un grupo tiene ${t} € para una excursión. Las entradas de ${p} personas cuestan ${e} € cada una. ¿Cuánto dinero les sobra?`],
  cb_s: [
    (n, p, m, q, a, b, t) => `Libros: ${n} × ${p} = ${a} €. Cuadernos: ${m} × ${q} = ${b} €. Total: ${a} + ${b} = <b>${t} €</b>.`,
    (c, per, t, v, r) => `Botellas: ${c} × ${per} = ${t}. Quedan ${t} − ${v} = <b>${r}</b>.`,
    (d, w, s, r) => `Una semana: ${d} × 7 = ${w} minutos. En ${s} semanas: ${w} × ${s} = <b>${r} minutos</b>.`,
    (p, e, g, t, r) => `Gastan ${p} × ${e} = ${g} €. Sobran ${t} − ${g} = <b>${r} €</b>.`],
  div_q: (D, d) => `Haz la división <b>${D} : ${d}</b>.`,
  div_f: ["Cociente", "Resto"],
  // steps: los pasos de longDiv (gen/mat4.js), con el método de la lección (tomo, tanteo tapando, multiplico, resto, bajo)
  div_s: (D, d, q, r, steps, N) => {
    const ln = steps.map((s, j) => {
      const head = s.k === "toma" ? `Tomo ${N(s.cur)}${s.short !== null ? ` (con ${N(s.short)} no basta, es menor que ${d})` : ""}.` : `Bajo el ${steps[j - 1].next}: ${N(s.cur)}.`;
      if (s.cero) return `${head} ¿Cabe ${d} en ${N(s.cur)}? No: escribo <b>0</b> en el cociente.`;
      const t = `Tanteo: tapo el ${d % 10} y el ${s.cur % 10}: ${N(s.hi)} : ${s.lo} da ${s.t0}${s.t0 >= 10 ? ", que es 10 o más: empiezo por 9" : ""}`;
      const mul = `${d} × ${s.q} = ${N(s.p)}; ${N(s.cur)} − ${N(s.p)} = ${s.rest}.`;
      if (s.start === s.q) return `${head} ${t}. ${mul}`;
      const over = `, pero ${d} × ${s.start} = ${N(d * s.start)} se pasa.`;
      if (s.start - s.q === 1) return `${head} ${t}${over} Pruebo ${s.q}: ${mul}`;
      return `${head} ${t}${over} Bajo hasta ${s.q} (con ${s.q + 1}, ${d} × ${s.q + 1} = ${N(d * (s.q + 1))}, aún me paso): ${mul}`;
    });
    return `${ln.join("<br>")}<br>Cociente <b>${q}</b>, resto <b>${r}</b>. Compruebo: ${d} × ${q}${r ? ` + ${r}` : ""} = ${N(D)}.`;
  },
  pd_q0: (D, d, q, D2, d2) => `Sabiendo que ${D} : ${d} = ${q}, ¿cuánto es <b>${D2} : ${d2}</b>?`,
  pd_s0: (m, q) => `Hemos multiplicado el dividendo y el divisor por ${m}: el cociente no cambia. <b>${q}</b>.`,
  pd_s1: (f, r) => `Para dividir entre ${f} se ${f === 10 ? "quita un cero" : "quitan dos ceros"} del final: <b>${r}</b>.`,
  pd_q2: (d, q, r) => `¿Cuál es el dividendo de una división con divisor ${d}, cociente ${q} y resto ${r}?`,
  pd_s2: (d, q, r, D) => `Con la prueba de la división: dividendo = divisor × cociente + resto = ${d} × ${q} + ${r} = ${d * q} + ${r} = <b>${D}</b>.`,
  bus_q: (n, c) => `${n} alumnos van de excursión en autobuses de ${c} plazas. ¿Cuántos autobuses hacen falta como mínimo?`,
  bus_s: (n, c, q, r, b) => `${divr(n, c, q, r)}. ${r ? `Con ${q === 1 ? "1 autobús" : `${q} autobuses`} se ${r === 1 ? "quedaría 1 alumno" : `quedarían ${r} alumnos`} en tierra: hace falta uno más, <b>${b}</b>.` : `Caben justos: <b>${b}</b>.`}`,
  cajas_q: (n, per) => `Tenemos ${n} huevos y los metemos en cajas de ${per}. ¿Cuántas cajas se llenan completas?`,
  cajas_s: (n, per, q, r) => `${divr(n, per, q, r)}. Se llenan <b>${q}</b> cajas${r ? ` y ${r === 1 ? "sobra 1 huevo" : `sobran ${r} huevos`}` : ""}.`,
  precio_q: (t, p) => `Con ${t} € compramos varias camisetas de ${p} € cada una sin que sobre dinero. ¿Cuántas camisetas compramos?`,
  precio_s: (t, p, r) => `${t} : ${p} = <b>${r}</b>.`,
  eq_q: e => `Completa para que las fracciones sean equivalentes: <b>${e}</b>`,
  eq_s: (a, b, k) => `Multiplicamos numerador y denominador por ${k}: ${a}/${b} = ${a * k}/${b * k}.`,
  eq2_s: (a, b, k) => `Dividimos numerador y denominador entre ${k}: ${a}/${b} = ${a / k}/${b / k}.`,
  eq3_q: f => `¿Qué fracción es equivalente a <b>${f}</b>?`,
  cf_q: (a, b, c, d) => `Elige el signo: <b>${a}/${b} ☐ ${c}/${d}</b>`,
  cf_s1: (a, b, c, k) => `Mismo denominador: compara los numeradores. <b>${a}/${b} ${[">", "&lt;", "="][k]} ${c}/${b}</b>.`,
  cf_s2: (a, b, c, d, m, l, r, k) => `Las pasamos a denominador común ${m}: ${a}/${b} = ${l}/${m} y ${c}/${d} = ${r}/${m}. Como ${l} ${[">", "&lt;", "="][k]} ${r}: <b>${a}/${b} ${[">", "&lt;", "="][k]} ${c}/${d}</b>.`,
  frac_hint: "Escribe la fracción con una barra, por ejemplo 7/5.",
  sf_s: (a, b, d, n, add) => `Con el mismo denominador, se ${add ? "suman" : "restan"} los numeradores y se deja el denominador: ${a} ${add ? "+" : "−"} ${b} = ${n}. Resultado: <b>${n}/${d}</b>.`,
  objs: [["alumnos"], ["libros"], ["euros"], ["kilómetros"]],
  fn_q: (n, d, N) => `Calcula <b>${n}/${d} de ${N}</b>.`,
  fn2_q: (N, obj, n, d) => `¿Cuántos ${obj} son ${n}/${d} de ${N} ${obj}?`,
  fn_s: (N, d, p, n, r) => `${N} : ${d} = ${p}; ${p} × ${n} = <b>${r}</b>.`,
  mx_q: (n, d) => `Escribe <b>${n}/${d}</b> como número mixto (entero y fracción con denominador ${d}).`,
  mx_f: ["Entero", "Numerador"],
  mx_s: (n, d, e, r) => `${divr(n, d, e, r)}: el cociente son los enteros y el resto, el numerador. Así que ${n}/${d} = <b>${e} y ${r}/${d}</b>.`,
  mx2_q: (e, r, d) => `Escribe el número mixto <b>${e} y ${r}/${d}</b> como una fracción.`,
  mx2_s: (e, d, r, n) => `Cada entero son ${d}/${d}: ${e} × ${d} + ${r} = ${n}. Resultado: <b>${n}/${d}</b>.`,
  grid_q: "La cuadrícula tiene 100 cuadraditos. ¿Qué número decimal representa la parte coloreada?",
  grid_s: (n, x) => n === 1 ? `Hay 1 cuadradito de 100: 1 centésima = <b>${x}</b>.` : `Hay ${n} cuadraditos de 100: ${n} centésimas = <b>${x}</b>.`,
  fd_q: (n, d) => `Escribe como número decimal: <b>${n}/${d}</b>.`,
  fd_s: (n, d, x) => `${d === 10 ? "Décimas: una cifra" : "Centésimas: dos cifras"} detrás de la coma. ${n}/${d} = <b>${x}</b>.`,
  df_q: x => `Escribe <b>${x}</b> como fracción de denominador 100.`,
  df_s: (x, n) => `${x} son ${n} centésimas: <b>${n}/100</b>.`,
  decp: ["las décimas", "las centésimas"],
  decp_o: ["Unidades", "Décimas", "Centésimas"],
  dv_q: (x, d) => `En el número <b>${x}</b>, ¿qué lugar ocupa la cifra <b>${d}</b>?`,
  dv_s: (d, p) => `Detrás de la coma, la primera cifra son las décimas y la segunda las centésimas. El ${d} está en <b>${p}</b>.`,
  dw_q: x => `Escribe el número <b>${x}</b> (puedes usar coma).`,
  dw_s: x => `Es <b>${x}</b>.`,
  dw2_q: (e, c) => `Escribe con cifras: <b>${e} ${e === 1 ? "unidad" : "unidades"} y ${c} ${c === 1 ? "centésima" : "centésimas"}</b>.`,
  dc_q: (a, b) => `Elige el signo: <b>${a} ☐ ${b}</b>`,
  dc_s: (a, b, k) => `Comparamos primero la parte entera y después las décimas y las centésimas (puedes añadir ceros: 3,5 = 3,50). <b>${a} ${[">", "&lt;", "="][k]} ${b}</b>.`,
  sd_s: (add, r) => `Colocamos los números con las comas alineadas (unidades bajo unidades, décimas bajo décimas…), ${add ? "sumamos" : "restamos"} como siempre y ponemos la coma en el mismo sitio: <b>${r}</b>.`,
  ti_q: (a, b, c) => `En la papelería compramos una mochila de ${a} €, un estuche de ${b} € y un cuaderno de ${c} €. ¿Cuánto pagamos?`,
  ti_s: t => `Sumamos con las comas alineadas: <b>${t} €</b>.`,
  vu_q: (p, pay) => `Un juego cuesta ${p} € y pagamos con un billete de ${pay} €. ¿Cuánto nos devuelven?`,
  vu_s: (pay, p, r) => `${pay} − ${p} = <b>${r} €</b>.`,
  ud_q: (n, p) => `Una entrada cuesta ${p} €. ¿Cuánto cuestan ${n} entradas?`,
  ud_s: (n, p, r) => `${n} × ${p} = <b>${r} €</b>.`,
  cv_q: (v, a, b) => `Pasa <b>${v} ${a}</b> a <b>${b}</b>.`,
  cv_s: (a, b, f, mul, v, r) => `De ${a} a ${b} hay que ${mul ? "multiplicar por" : "dividir entre"} ${f} (cada escalón es × 10): ${v} ${a} = <b>${r} ${b}</b>.`,
  tmin_q: (h, m) => `¿Cuántos minutos son <b>${h} h y ${m} min</b>?`,
  tmin_s: (h, m, r) => `${h} × 60 + ${m} = <b>${r} minutos</b>.`,
  tseg_q: (m, s) => `¿Cuántos segundos son <b>${m} min y ${s} s</b>?`,
  tseg_s: (m, s, r) => `${m} × 60 + ${s} = <b>${r} segundos</b>.`,
  thm_q: t => `Expresa <b>${t} minutos</b> en horas y minutos.`,
  hm_f: ["Horas", "Minutos"],
  thm_s: (t, h, m) => `Cada hora son 60 minutos: ${divr(t, 60, h, m)}. Son <b>${m ? `${h} h y ${m} min` : `${h} h`}</b>.`,
  tdur_q: (h1, m1, h2, m2) => `Un tren sale a las ${hm(h1, m1)} y llega a las ${hm(h2, m2)}. ¿Cuánto dura el viaje?`,
  // a saltos, como la lección: hasta la hora en punto, horas enteras y los minutos que faltan
  tdur_s: (h, m, h1, m1, h2, m2) => {
    const s = m1 ? h1 + 1 : h1, a = m1 ? 60 - m1 : 0, H = h2 - s, L = [];
    if (a) L.push(`De ${hm(h1, m1)} a ${hm(s, 0)}: ${a} min`);
    if (H) L.push(`De ${hm(s, 0)} a ${hm(h2, 0)}: ${H} h`);
    if (m2) L.push(`De ${hm(h2, 0)} a ${hm(h2, m2)}: ${m2} min`);
    const T = (x, y) => x && y ? `${x} h y ${y} min` : x ? `${x} h` : `${y} min`;   // sin «y 0 min» ni «0 h y»
    if (a && m2) L.push(a + m2 >= 60 ? `Minutos: ${a} + ${m2} = ${a + m2} min = ${T(1, a + m2 - 60)}` : `Minutos: ${a} + ${m2} = ${a + m2} min`);
    const mix = a && m2 && a + m2 >= 60 && H ? `${H} h + ${T(1, a + m2 - 60)} = ` : "";
    return `${L.join("<br>")}<br>Total: ${mix}<b>${T(h, m)}</b>.`;
  },
  ang_q: d => `¿Cómo es un ángulo de <b>${d}°</b>?`,
  ang_o: ["Agudo", "Recto", "Obtuso", "Llano"],
  ang_s: [d => `Mide menos de 90°: <b>agudo</b>.`, d => `Mide exactamente 90°: <b>recto</b>.`, d => `Mide más de 90° y menos de 180°: <b>obtuso</b>.`, d => `Mide 180°, media vuelta: <b>llano</b>.`],
  comp_q: a => `¿Cuántos grados le faltan a un ángulo de ${a}° para llegar a un ángulo recto?`,
  comp_s: (a, r) => `Un ángulo recto mide 90°: 90 − ${a} = <b>${r}°</b>.`,
  supl_q: a => `¿Cuántos grados le faltan a un ángulo de ${a}° para llegar a un ángulo llano?`,
  supl_s: (a, r) => `Un ángulo llano mide 180°: 180 − ${a} = <b>${r}°</b>.`,
  tri3_q: (a, b) => `Dos ángulos de un triángulo miden ${a}° y ${b}°. ¿Cuánto mide el tercero?`,
  tri3_s: (a, b, r) => `Los tres ángulos de un triángulo suman 180°: 180 − ${a} − ${b} = <b>${r}°</b>.`,
  tri_q: a => `Los ángulos de un triángulo miden ${a}. ¿Cómo es según sus ángulos?`,
  tri_o: ["Acutángulo", "Rectángulo", "Obtusángulo"],
  tri_s: ["Los tres ángulos son agudos: <b>acutángulo</b>.", "Tiene un ángulo recto: <b>rectángulo</b>.", "Tiene un ángulo obtuso: <b>obtusángulo</b>."],
  cu_q: "¿Cuál es el nombre <b>más preciso</b> de este cuadrilátero?",
  cu_o: ["Cuadrado", "Rectángulo", "Rombo", "Romboide", "Trapecio", "Trapezoide"],
  cu_s: ["4 lados iguales y 4 ángulos rectos: es un <b>cuadrado</b>. (También es un rectángulo y un rombo, pero «cuadrado» dice más.)", "4 ángulos rectos, pero los lados no son todos iguales: <b>rectángulo</b>.", "4 lados iguales, pero sus ángulos no son rectos: <b>rombo</b>.", "Lados de enfrente paralelos e iguales, pero no los cuatro, y sin ángulos rectos: <b>romboide</b>.", "Solo dos lados paralelos: <b>trapecio</b>.", "Ningún lado paralelo a otro: <b>trapezoide</b>."],
  cu2_q: "¿A qué grupo pertenece este cuadrilátero?",
  cu2_o: ["Paralelogramo", "Trapecio", "Trapezoide"],
  cu2_s: ["Sus lados opuestos son paralelos dos a dos: <b>paralelogramo</b>.", "Solo tiene un par de lados paralelos: <b>trapecio</b>.", "No tiene lados paralelos: <b>trapezoide</b>."],
  ar_q: "Cada cuadradito mide 1 cm². ¿Cuál es el área de la figura coloreada, en cm²?",
  ar_s: (n, m) => m ? `Es un rectángulo: ${m} = <b>${n} cm²</b>. (También se pueden contar los cuadraditos.)` : `Contamos los cuadraditos coloreados: <b>${n} cm²</b>.`,
  arr_q: (l, w) => `¿Cuál es el área de un rectángulo de ${l} cm de largo y ${w} cm de ancho, en cm²?`,
  arr_s: (l, w, r) => `Área = largo × ancho = ${l} × ${w} = <b>${r} cm²</b>.`,
  cp_w: ["caras", "vértices", "aristas"],
  // nombres de los cuerpos de m4.cuerpos (mismo orden que BODIES en gen/mat4.js)
  cp_nom: ["un cubo", "un prisma triangular", "un prisma cuadrangular", "una pirámide cuadrangular", "una pirámide triangular", "un prisma hexagonal", "una pirámide hexagonal"],
  cp_q: (w, n) => `¿Cuánt${w === "vértices" ? "os" : "as"} <b>${w}</b> tiene ${n}?`,
  cp_s: (n, v) => `${n[0].toUpperCase() + n.slice(1)} tiene <b>${v[0]} caras, ${v[1]} vértices y ${v[2]} aristas</b>.`,
  cr_q: "¿Es un poliedro o un cuerpo redondo?",
  cr_o: ["Poliedro", "Cuerpo redondo"],
  cr_s: ["Todas sus caras son polígonos (planas): es un <b>poliedro</b>.", "Tiene alguna superficie curva: es un <b>cuerpo redondo</b>."],
  colores: ["rojo", "azul", "verde", "amarillo", "naranja"],
  fr_q: (d, c) => `Estos son los colores favoritos de una clase: ${d}. ¿Cuál es la frecuencia de <b>${c}</b>?`,
  fr_s: (c, f) => `Contamos cuántas veces aparece ${c}: <b>${f}</b>.`,
  frt_q: d => `Estos son los colores favoritos de una clase: ${d}. ¿Cuántos alumnos han respondido?`,
  frt_s: n => `Contamos todos los datos: <b>${n}</b>.`,
  moda_q: d => `Estos son los colores favoritos de una clase: ${d}. ¿Qué color es el más elegido?`,
  moda_s: (c, f) => `El que tiene la frecuencia más alta: <b>${c}</b> (${f} veces).`,
  // [contexto, valor mínimo, valor máximo] (rangos según la magnitud)
  media_ctx: [["Las notas de un alumno en varios exámenes (sobre 10) son", 3, 10], ["Los goles que ha marcado un equipo de fútbol en varios partidos son", 0, 6],
    ["Los libros que han leído este curso varios amigos son", 1, 15], ["Las temperaturas máximas (°C) de varios días de primavera son", 12, 28],
    ["Los puntos de un equipo de baloncesto en varios partidos son", 50, 95], ["Las edades de unos primos son", 2, 14]],
  media_q: (c, d) => `${c}: ${d}. ¿Cuál es la media?`,
  media_s: (sum, t, n, m) => `Sumamos todos los datos y dividimos entre cuántos hay: (${sum}) : ${n} = ${t} : ${n} = <b>${m}</b>.`,
  dado: [["un número par", 3], ["un 6", 1], ["un número mayor que 4", 2], ["un número menor que 3", 2], ["un múltiplo de 3", 2], ["un número impar", 3], ["un número mayor que 2", 4], ["un número distinto de 1", 5]],
  pd_q: d => `Lanzamos un dado. ¿Qué probabilidad hay de sacar ${d}? (Escríbela como fracción.)`,
  pb_q: (r, a, v) => `En una bolsa hay ${r === 1 ? "1 bola roja" : `${r} bolas rojas`}${v ? ", " : " y "}${a === 1 ? "1 azul" : `${a} azules`}${v ? ` y ${v === 1 ? "1 verde" : `${v} verdes`}` : ""}. Sacamos una sin mirar. ¿Qué probabilidad hay de que sea roja?`,
  rul_q: "Giramos la ruleta. ¿Qué probabilidad hay de que caiga en rojo? (Todas las partes son iguales.)",
  pdj_s: (f, t) => `Probabilidad = casos favorables / casos posibles = <b>${f}/${t}</b>.`,
  // m4.convlong / m4.convmasa (Mates 4: sin decimales; contando peldaños)
  cv4_s: (a, b, k, down, chain, f, v, r) => `De ${a} a ${b} ${down ? "bajo" : "subo"} ${k === 1 ? "1 peldaño" : `${k} peldaños`} (${chain}): ${down ? "multiplico por" : "divido entre"} ${k > 1 ? `${Array(k).fill(10).join(" × ")} = ` : ""}${f}. ${v} ${down ? "×" : ":"} ${f} = <b>${r} ${b}</b>.`,
  dos_q: (a, big, b, small) => `¿Cuántos <b>${small}</b> son <b>${a} ${big} y ${b} ${small}</b>?`,
  dos_s: (a, big, b, small, f, A, r) => `Paso la unidad grande a la pequeña: ${a} ${big} = ${a} × ${f} = ${A} ${small}. Sumo: ${A} + ${b} = <b>${r} ${small}</b>.`,
  tkg_s: (down, a, A) => down ? `1 t = 1000 kg: multiplico por 1000. ${a} × 1000 = <b>${A} kg</b>.` : `1 t = 1000 kg: divido entre 1000. ${A} : 1000 = <b>${a} t</b>.`,
});
// m4.fracdec (Mates 4: fracciones menores que 1)
S.FD = {
  grid_s: (n, col, su, x) => col ? `Hay ${col === 1 ? "1 columna" : `${col} columnas`} de 10 (${col === 1 ? "1 décima" : `${col} décimas`})${su ? ` y ${su === 1 ? "1 cuadradito suelto (1 centésima)" : `${su} cuadraditos sueltos (${su} centésimas)`}` : ""}: ${n} ${n === 1 ? "centésima" : "centésimas"} = <b>${x}</b>.` : `Hay ${su === 1 ? "1 cuadradito suelto: 1 centésima" : `${su} cuadraditos sueltos: ${su} centésimas`}, y ninguna columna entera (0 décimas) = <b>${x}</b>.`,
  dec_s: (n, x) => `${n}/10 son ${n === 1 ? "1 décima" : `${n} décimas`}: la cifra ${n} va justo detrás de la coma. <b>${x}</b>.`,
  cent_s: (n, d, c, x) => `${n}/100 son ${n === 1 ? "1 centésima" : `${n} centésimas`}, es decir, ${d === 1 ? "1 décima" : `${d} décimas`} y ${c === 1 ? "1 centésima" : `${c} centésimas`}. Detrás de la coma, primero las décimas (${d}) y luego las centésimas (${c}): <b>${x}</b>.`,
  df_s: (x, d, c, n) => `En ${x} hay ${d === 1 ? "1 décima" : `${d} décimas`} y ${c === 1 ? "1 centésima" : `${c} centésimas`}. Cada décima son 10 centésimas: ${d} × 10 + ${c} = ${n} ${n === 1 ? "centésima" : "centésimas"}. <b>${n}/100</b>.`,
};
// m4.euros (Mates 4)
S.EU = {
  ti_s: (a, b, c, ab, t) => `Con las comas en columna: ${a} + ${b} = ${ab}; ${ab} + ${c} = <b>${t} €</b>.`,
  // J: saltos [desde, hasta, céntimos, importe]
  vu_s: (J, r, pay, p) => `Cuento desde el precio hasta ${pay} €:<br>${J.map(([u, v, c, e]) => `De ${u} a ${v}: ${c < 100 ? `${c} céntimos` : `${e} €`}`).join("<br>")}<br>Me devuelven ${J.map(j => j[3]).join(" + ")} = <b>${r} €</b>.`,
  ud_s: (n, p, c, t, e, ct, r) => `Paso a céntimos: ${p} € = ${c} céntimos. ${c} × ${n} = ${t} céntimos = ${e} ${e === 1 ? "euro" : "euros"}${ct ? ` y ${ct} céntimos` : ""} = <b>${r} €</b>.`,
};
// m4.probfrac (Mates 4: «casos a favor», diciendo cuáles son)
S.PF = {
  // [descripción, caras que ganan]
  dado: [["un número par", [2, 4, 6]], ["un 6", [6]], ["un número mayor que 4", [5, 6]], ["un número menor que 3", [1, 2]], ["un 3 o un 6", [3, 6]], ["un número impar", [1, 3, 5]], ["un número mayor que 2", [3, 4, 5, 6]], ["un número distinto de 1", [2, 3, 4, 5, 6]]],
  dado_s: c => `Casos a favor: ${c.length === 1 ? `el ${c[0]}, 1 caso` : `${c.slice(0, -1).map(x => "el " + x).join(", ")} y el ${c[c.length - 1]}, ${c.length} casos`}. Casos posibles: las 6 caras del dado. Probabilidad = casos a favor / casos posibles = <b>${c.length}/6</b>.`,
  bolsa_s: (r, a, v, t) => `Casos a favor: ${r === 1 ? "la bola roja, 1 caso" : `las ${r} bolas rojas`}. Casos posibles: todas las bolas, ${v ? `${r} + ${a} + ${v}` : `${r} + ${a}`} = ${t}. Probabilidad = <b>${r}/${t}</b>.`,
  rul_s: (c, n) => `Casos a favor: ${c === 1 ? "la parte roja, 1 caso" : `las ${c} partes rojas`}. Casos posibles: las ${n} partes de la ruleta. Probabilidad = <b>${c}/${n}</b>.`,
};
// ═════ El calendario, figuras circulares, coordenadas y escalas (textos de los generadores añadidos) ═════
const cap4 = s => s.charAt(0).toUpperCase() + s.slice(1);
const de4 = s => s.startsWith("el ") ? "del " + s.slice(3) : "de " + s;
const plw = (n, a, b) => `${n} ${n === 1 ? a : b}`;

// m4.calendario
S.CL = {
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  letras: ["L", "M", "X", "J", "V", "S", "D"],
  inicio: 0,   // la hoja del calendario empieza en lunes (índice de «dias»)
  meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  dentro_q: (w, n) => `Hoy es ${w}. ¿Qué día de la semana será dentro de ${n} días?`,
  dentro_s: (w, n, q, r, w2) => `${n} = ${q} × 7${r ? ` + ${r}` : ""}. Dentro de ${q === 1 ? "7 días" : `${7 * q} días (${q} semanas)`} volverá a ser ${w}${r ? `, y ${r === 1 ? "1 día más lleva" : `${r} días más llevan`} al <b>${w2}</b>` : `: será <b>${w2}</b>`}.`,
  entre_q: (d1, m1, d2, m2, y, feb) => `Hoy es ${d1} de ${m1}${feb ? ` de ${y}` : ""}. ¿Cuántos días faltan para el ${d2} de ${m2}?`,
  entre_s: (m1, L, d1, d2, m2, bis) => `${cap4(m1)} tiene ${L} días${m1 === "febrero" ? (bis ? " (es año bisiesto)" : " (no es año bisiesto)") : ""}: del ${d1} al ${L} ${L - d1 === 1 ? "queda 1 día" : `quedan ${L} − ${d1} = ${L - d1} días`}. Después, ${plw(d2, "día", "días")} de ${m2}: ${L - d1} + ${d2} = <b>${L - d1 + d2}</b> días.`,
  bis_q: "¿Cuál de estos años es bisiesto?",
  bis_s: y => `Los años bisiestos llegan cada 4 años: ${[y - 8, y - 4, y, y + 4].join(", ")}… De la lista, solo <b>${y}</b>.`,
  sera_q: y => `¿Es ${y} un año bisiesto?`,
  sino: ["Sí", "No"],
  sera_s: (y, b, list) => b ? `Los bisiestos van de 4 en 4 (…, ${list}, …) y ${y} es uno de ellos: <b>sí</b> es bisiesto; su febrero tiene 29 días.` : `Los bisiestos van de 4 en 4 (…, ${list}, …) y ${y} no es uno de ellos: <b>no</b> es bisiesto; su febrero tiene 28 días.`,
  trim_q: n => `¿Cuántos meses son ${n} trimestres?`,
  trim_s: n => `Un trimestre son 3 meses: ${n} × 3 = <b>${3 * n}</b> meses.`,
  sem_q: n => `¿Cuántos meses son ${n} semestres?`,
  sem_s: n => `Un semestre es medio año, 6 meses: ${n} × 6 = <b>${6 * n}</b> meses.`,
  quin_q: n => `¿Cuántos días son ${n} quincenas?`,
  quin_s: n => `Una quincena son 15 días: ${n} × 15 = <b>${15 * n}</b> días.`,
  medio_q: n => `¿Cuántos meses son ${n} años y medio?`,
  medio_s: n => `${n} años son ${n} × 12 = ${12 * n} meses, y medio año son 6 meses: ${12 * n} + 6 = <b>${12 * n + 6}</b> meses.`,
  dec_q: n => `¿Cuántas décadas son ${n} siglos?`,
  dec_s: n => `Un siglo son 100 años, es decir, 10 décadas: ${n} × 10 = <b>${10 * n}</b> décadas.`,
  sig_q: n => `¿Cuántos años son ${n} siglos?`,
  sig_s: n => `Un siglo son 100 años: ${n} × 100 = <b>${100 * n}</b> años.`,
  ordT: ["primer", "segundo", "tercer", "cuarto"],
  trimd_q: (t, y) => `¿Cuántos días tiene el ${t} trimestre de ${y}?`,
  trimd_s: (ms, ds, tot, bis, y) => `El trimestre son ${ms[0]}, ${ms[1]} y ${ms[2]}.${bis === null ? "" : ` ${y} ${bis ? "es bisiesto: febrero tiene 29 días" : "no es bisiesto: febrero tiene 28 días"}.`} ${ds.join(" + ")} = <b>${tot}</b> días.`,
  hoja_q: (d, w, d2, m) => `En la hoja del calendario, el ${d} de ${m} (rodeado) es ${w}. ¿Qué día de la semana es el ${d2}?`,
  hoja_s: (d, d2, add, w) => `${d2} − ${d} = ${add}: ${add === 7 ? "justo una semana" : `justo ${add / 7} semanas`} después. Sumar 7 lleva al mismo día de la semana (la casilla de justo debajo): es <b>${w}</b>.`,
  cuantos_q: (d, w, m, y) => `El ${d} de ${m} de ${y} es ${w}. ¿Cuántos ${w === "sábado" || w === "domingo" ? w + "s" : w} tiene ese mes?`,
  cuantos_s: (w, list, n, L) => `El mes tiene ${L} días. Sumando y restando 7 salen todos los ${w === "sábado" || w === "domingo" ? w + "s" : w}: ${list}. Son <b>${n}</b>.`,
};

// m4.circulares
S.CI = {
  nombre_q: "¿Cómo se llama lo que está dibujado en rojo?",
  lineas: ["Radio", "Diámetro", "Cuerda", "Arco"],
  figuras: ["Semicírculo", "Sector circular", "Arco"],
  nombre_s: ["Es un segmento que va del centro O a la circunferencia: es un <b>radio</b>.", "Es una cuerda que pasa por el centro O, la más larga de todas: es un <b>diámetro</b>.",
    "Es un segmento que une dos puntos de la circunferencia sin pasar por el centro: es una <b>cuerda</b>.", "Es un trozo de la circunferencia, una línea curva: es un <b>arco</b>.",
    "Es medio círculo, limitado por un diámetro y la mitad de la circunferencia: es un <b>semicírculo</b>.", "Es la parte del círculo entre dos radios y el arco que los une, como una porción de tarta: es un <b>sector circular</b>."],
  cosas: ["una pizza", "una tarta de cumpleaños", "una caja redonda de quesitos", "una tortilla"],
  partes_q: (w, n) => `Se corta ${w} en ${n} porciones iguales desde el centro. ¿Cuántos grados mide el ángulo de cada porción?`,
  partes_s: (n, a) => `La vuelta entera son 360°: 360 : ${n} = <b>${a}</b>°.`,
  parte: n => ({ 2: "La mitad", 3: "Un tercio", 4: "Un cuarto", 5: "Un quinto", 6: "Un sexto", 8: "Un octavo", 10: "Un décimo", 12: "Un doceavo" })[n],
  cual_q: a => `¿Qué parte del círculo es un sector de ${a}°?`,
  cual_s: (a, n, p) => `${a}° cabe ${n} veces en 360° (360 : ${a} = ${n}): el sector es <b>${p}</b> del círculo.`,
  cuerda_q: r => `Una circunferencia tiene ${r} cm de radio. ¿Cuántos centímetros mide su cuerda más larga?`,
  cuerda_s: r => `La cuerda más larga es el diámetro, que mide dos radios: ${r} × 2 = <b>${2 * r}</b> cm.`,
  puede_q: (d, x) => `En una circunferencia de ${d} cm de diámetro trazas varias cuerdas. ¿Puede alguna medir ${x} cm?`,
  puede_o: ["Sí", "No"],
  puede_s: (d, x) => x < d ? `<b>Sí</b>: la cuerda más larga es el diámetro, ${d} cm, y ${x} cm es menos. Será una cuerda que no pasa por el centro.` : `<b>No</b>: la cuerda más larga es el diámetro, que mide ${d} cm, y ${x} cm es más.`,
  cuantas_q: a => `Una tarta redonda se corta desde el centro en porciones iguales de ${a}°. ¿Cuántas porciones salen?`,
  cuantas_s: (a, n) => `La vuelta entera son 360°: 360 : ${a} = <b>${n}</b> porciones.`,
};

// m4.coordenadas
S.CO = {
  sitios: ["la fuente", "el quiosco", "el tesoro", "el árbol grande", "el banco"],
  coord_q: s => `Mira el plano del parque. ¿Cuáles son las coordenadas ${de4(s)}?`,
  coord_s: (s, x, y) => `Desde el (0, 0), para llegar ${s.startsWith("el ") ? "al " + s.slice(3) : "a " + s} avanzo ${x} hacia la derecha y subo ${y}: es el punto <b>(${x}, ${y})</b>. Primero se dice lo que se avanza hacia la derecha y después lo que se sube.`,
  hay_q: p => `Mira el plano del parque. ¿Qué hay en el punto <b>${p}</b>?`,
  hay_s: (x, y, s) => `Desde el (0, 0) avanzo ${x} hacia la derecha y subo ${y}: en el (${x}, ${y}) está <b>${s}</b>. ¡Cuidado: (${y}, ${x}) es otro punto!`,
  mueve_q: (x, y, p, q) => `Estás en el punto (${x}, ${y}). Avanzas ${p} ${p === 1 ? "paso" : "pasos"} hacia la derecha y subes ${q}. ¿En qué punto estás ahora?`,
  mueve_s: (x, y, p, q, ex, ey) => `Lo que avanzas hacia la derecha se suma al primer número: ${x} + ${p} = ${ex}. Lo que subes se suma al segundo: ${y} + ${q} = ${ey}. Estás en <b>(${ex}, ${ey})</b>.`,
};

// m4.escala
S.ES = {
  metros: "metros",
  sitios: ["casa", "el cole", "la biblioteca", "el polideportivo", "la plaza"],
  camino_q: (a, b) => `En el plano, el camino rojo va de ${a} a ${b} por las calles. Usa la escala gráfica: ¿cuántos metros mide el camino en la realidad?`.replace(/\bde el /g, "del ").replace(/\ba el /g, "al "),
  camino_s: (v, h, w, r) => `La escala gráfica dice que cada cuadrito son ${v} m. El camino ocupa ${h === 1 ? "1 cuadrito" : `${h} cuadritos`} en horizontal y ${w} en vertical: ${h} + ${w} = ${h + w} cuadritos. ${h + w} × ${v} = <b>${r}</b> m.`,
  calle_q: (v, n) => `En un plano, cada cuadrito representa ${v} m. Una calle recta ocupa ${n} cuadritos. ¿Cuántos metros mide en la realidad?`,
  calle_s: (n, v, r) => `Distancia real = cuadritos × lo que vale cada uno: ${n} × ${v} = <b>${r}</b> m.`,
  pueblos: ["Pueblo Alto", "Pueblo Bajo", "Fuentesol", "Valdemoro del Río", "Monteclaro"],
  mapa_q: (e, a, b, d) => `En un mapa, 1 cm representa ${e} km. Con la regla, entre ${a} y ${b} hay ${d} cm. ¿A cuántos kilómetros están en la realidad?`,
  mapa_s: (d, e) => `Cada centímetro del mapa son ${e} km: ${d} × ${e} = <b>${d * e}</b> km.`,
  // [qué, metros como mucho]
  largos: [["un parque", 1500], ["una avenida", 3000], ["un puente", 1000], ["el paseo marítimo", 3000], ["una calle", 1200]],
  plano_q: (e, w, r) => `En un plano, 1 cm representa ${e} m. ${cap4(w)} mide ${r} m de largo. ¿Cuántos centímetros ocupa en el plano?`,
  plano_s: (r, e, cm) => `Cada ${e} m ocupan 1 cm: ${r} : ${e} = <b>${cm}</b> cm.`,
};
// ── fin: ═════ El calendario, figuras circulares, coordenadas y escalas (textos de los generadores añadidos) ═════
// ═════ Textos de la ronda de mejoras (generadores propios de 4.º y soluciones con pasos) ═════
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const pl4 = (n, a, b) => `${n} ${n === 1 ? a : b}`;
const lst = xs => xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`;
Object.assign(S, {
  // m4.jerarquia
  JE: {
    lead: { md: "Primero las multiplicaciones y divisiones; después, las sumas y restas", par: "Primero el paréntesis", lr: "Solo hay sumas y restas: se hacen de izquierda a derecha",
      mdlr: "Primero la multiplicación; después, la suma y la resta, de izquierda a derecha", pmd: "Primero el paréntesis; después, la multiplicación, y al final, la resta", mdiz: "La división y la multiplicación son del mismo nivel: se hacen de izquierda a derecha" },
    s: (k, st) => `${S.JE.lead[k]}:<br>${st.slice(0, -1).join("<br>")}${st.length > 1 ? "<br>" : ""}${st[st.length - 1].replace(/= (\d+)$/, "= <b>$1</b>")}.`,
  },
  // m4.propdiv: tachar ceros
  pd_s3: (z, D2, b, r, d, D) => `${D} y ${d} acaban en ceros: tacho ${z === 1 ? "un cero" : "dos ceros"} en cada uno (es dividir los dos entre ${z === 1 ? 10 : 100}). Queda ${D2} : ${b} = <b>${r}</b>.`,
  // m4.probdiv
  PV: {
    precio_s: (t, p, m) => `Es agrupar: cuántas veces caben ${p} € en ${t} €. ${t} : ${p} = <b>${m}</b> camisetas (${p} × ${m} = ${t}).`,
    max_q: (t, p) => `Tienes ${t} € y compras todas las camisetas de ${p} € que puedas. ¿Cuántas camisetas compras?`,
    max_s: (t, p, m, r) => `${divr(t, p, m, r)} €. Con ${r === 1 ? "1 €" : `${r} €`} no llega para otra camiseta: el resto sobra y compras <b>${m}</b>.`,
    cuerda_q: (n, t) => `Tenemos ${n} m de cuerda y cortamos trozos de ${t} m. ¿Cuántos metros de cuerda sobran?`,
    cuerda_s: (n, t, q, r) => `${divr(n, t, q, r)}. Salen ${q} trozos, pero lo que preguntan es lo que sobra: el resto, <b>${r} m</b>. Compruebo: ${t} × ${q} + ${r} = ${n}.`,
    rep: [["cromos", "amigos", false], ["canicas", "niños", true], ["pegatinas", "compañeros", true], ["caramelos", "primos", false]],
    rep_q: (n, c, k, w, fem) => `${n} ${c} se reparten a partes iguales entre ${k} ${w}. ¿Cuánt${fem ? "as" : "os"} ${c} recibe cada uno?`,
    rep_s: (n, k, q, r, c) => `Es un reparto: busco cuánto toca a cada uno. ${divr(n, k, q, r)}. Cada uno recibe <b>${q}</b> ${c}${r ? ` (y ${r === 1 ? "sobra 1, que no alcanza" : `sobran ${r}, que no alcanzan`} para todos)` : ""}.`,
  },
  // m4.sumadec: la cuenta en columnas, como la lección (A, B, Rr en centésimas)
  SD: {
    s: (add, A, B, Rr, pad) => {
      const f = v => `${Math.floor(v / 100)},${String(v % 100).padStart(2, "0")}`, dg = (v, i) => Math.floor(v / 10 ** i) % 10;
      const nom = ["Centésimas", "Décimas", "Unidades", "Decenas", "Centenas"], L = [`${pad ? "Relleno con ceros y pongo" : "Pongo"} las comas en columna: ${f(A)} ${add ? "+" : "−"} ${f(B)}`];
      const ncol = Math.max(String(Math.max(A, B)).length, 3);
      let c = 0;
      for (let i = 0; i < ncol; i++) {
        const a = dg(A, i), b = dg(B, i);
        if (add) { const s = a + b + c; L.push(`${nom[i]}: ${a} + ${b}${c ? " + 1" : ""} = ${s}${s >= 10 ? `: pongo ${s - 10} y me llevo 1` : ""}`); c = s >= 10 ? 1 : 0; }
        else {
          if (i >= String(A).length && !c) break;
          const bb = b + c, pre = c ? `abajo, ${b} + 1 = ${bb}. ` : "";
          if (a < bb) { L.push(`${nom[i]}: ${pre}${a} − ${bb} no se puede: ${a + 10} − ${bb} = ${a + 10 - bb} y me llevo 1`); c = 1; }
          else { L.push(`${nom[i]}: ${pre}${a} − ${bb} = ${a - bb}`); c = 0; }
        }
      }
      if (add && c) L.push(`${nom[ncol]}: me llevaba 1: 1`);
      return `${L.join("<br>")}<br>Bajo la coma: <b>${f(Rr)}</b>.`;
    },
  },
  // m4.convlong / m4.convmasa: partir en dos unidades y el problema de los vasos
  par_q: (n, small, big) => `Escribe <b>${n} ${small}</b> en ${big} y ${small}.`,
  par_s: (n, small, big, f, q, qf, r) => `1 ${big} = ${f} ${small}. ${n} ${small} = ${qf} ${small} + ${r} ${small} = <b>${q} ${big} y ${r} ${small}</b>.`,
  recip: [["Una botella"], ["Una jarra"], ["Un bidón"]],
  vasos_q: (rec, l, v) => `${rec} tiene ${l === 1 ? "1 litro" : `${l} litros`} de agua. ¿Cuántos vasos de ${v} mL se llenan?`,
  vasos_s: (l, ml, v, n) => `Paso los litros a mililitros: ${l} L = ${l} × 1000 = ${ml} mL. ${ml} : ${v} = <b>${n}</b> vasos.`,
  // m4.triangulos: según sus lados
  trl_q: l => `Un triángulo tiene lados de ${lst(l)}. ¿Cómo es según sus lados?`,
  trl_o: ["Equilátero", "Isósceles", "Escaleno"],
  trl_s: [L => `Comparo los lados: los tres miden ${L[0]} cm, son iguales: <b>equilátero</b>.`,
    L => { const s = L.slice().sort((p, q) => p - q), eq = s[0] === s[1] ? s[0] : s[2], ot = s[0] === s[1] ? s[2] : s[0]; return `Comparo los lados: hay dos iguales (${eq} cm) y uno distinto (${ot} cm): <b>isósceles</b>.`; },
    L => `Comparo los lados: ${lst(L.map(v => v + " cm"))}, los tres distintos: <b>escaleno</b>.`],
  // m4.cuerpos: contar como en la lección
  cp_s2: (name, k, tipo, n, v) => {
    const base = { 3: "un triángulo", 4: "un cuadrado", 6: "un hexágono" }[n], pre = tipo === "cubo" ? "El cubo es un prisma con bases cuadradas (4 lados)." : `La base es ${base} (${n} lados).`;
    const w = ["caras", "vértices", "aristas"][k], r = `<b>${v[k]} ${w}</b>`;
    const P = [`2 bases y ${n} caras a los lados: 2 + ${n} = ${r}`, `${n} vértices en cada base: ${n} + ${n} = ${r}`, `${n} aristas en cada base y ${n} que las unen: ${n} + ${n} + ${n} = ${r}`];
    const Y = [`1 base y ${n} triángulos: 1 + ${n} = ${r}`, `${n} vértices en la base y la cúspide: ${n} + 1 = ${r}`, `${n} aristas en la base y ${n} que suben a la cúspide: ${n} + ${n} = ${r}`];
    return `${pre} ${(tipo === "piramide" ? Y : P)[k]}.`;
  },
});
// m4.calendario: con un mes entero en medio (y «hoy no se cuenta»)
S.CL.entre_s = (m1, L, d1, d2, m2, bis) => `${cap(m1)} tiene ${L} días${m1 === "febrero" ? (bis ? " (es año bisiesto)" : " (no es año bisiesto)") : ""}: después de hoy ${L - d1 === 1 ? `queda 1 día de ${m1} (el ${L})` : `quedan ${L} − ${d1} = ${L - d1} días de ${m1} (del ${d1 + 1} al ${L})`}. Después, ${pl4(d2, "día", "días")} de ${m2}: ${L - d1} + ${d2} = <b>${L - d1 + d2}</b> días.`;
S.CL.entre2_s = (m1, L, d1, m2, L2, bis2, d2, m3, bis1) => `${cap(m1)} tiene ${L} días${bis1 === null ? "" : bis1 ? " (año bisiesto)" : " (no es bisiesto)"}: después de hoy ${L - d1 === 1 ? "queda 1 día" : `quedan ${L} − ${d1} = ${L - d1} días`} de ${m1}.<br>${cap(m2)} entero: ${L2} días${bis2 === null ? "" : bis2 ? " (año bisiesto)" : " (no es bisiesto)"}.<br>Y ${pl4(d2, "día", "días")} de ${m3}.<br>${L - d1} + ${L2} + ${d2} = <b>${L - d1 + L2 + d2}</b> días.`;
// m4.escala: en kilómetros
S.ES.km_q = (v, n) => `En un plano, cada cuadrito son ${v} m. Un camino ocupa ${n} cuadritos. ¿Cuántos kilómetros mide en la realidad?`;
S.ES.km_s = (n, v, m, k) => `${n} × ${v} = ${m} m. Como 1 km = 1000 m: ${m} : 1000 = <b>${k}</b> km.`;

// m4.grandes
const GA = g => g === "Unidades" ? "de las unidades" : `de los ${g.toLowerCase()}`;
S.GR = {
  gnom: ["Millones", "Millares", "Unidades"],
  valor_s: (g, d, pos, v) => `Separo por grupos: ${g}. La cifra ${d} está en ${pos}, así que vale <b>${v}</b>.`,
  escr_s: (parts, n) => `${parts.map(([nm, w, c]) => `${nm}: ${w ? `«${w}»` : "no se dice nada"} → ${c}`).join("<br>")}<br>Número: <b>${n}</b>.`,
  leer_s: (g, parts, w) => `Separo de tres en tres desde la derecha: ${g}.<br>${parts.map(([nm, ww, c]) => `${nm} (${c}): ${ww ? `«${ww}»` : "no se dice nada"}`).join("<br>")}<br>Se lee <b>${w}</b>.`,
  cmp_q: (a, b) => `Elige el signo: <b>${a} ☐ ${b}</b>`,
  cmp1_s: (a, la, b, lb, cr) => `${a} tiene ${la} cifras y ${b}, ${lb}. El que tiene más cifras es mayor: <b>${a} ${cr ? "&lt;" : ">"} ${b}</b>.`,
  cmp2_s: (len, eqs, nm, va, vb, a, b, cr) => `Los dos tienen ${len} cifras. Comparo grupo a grupo desde la izquierda: ${eqs.map(([g, v]) => `el grupo ${GA(g)} es igual (${v}); `).join("")}en el ${GA(nm)}, ${va} ${cr ? "&lt;" : ">"} ${vb}. Así que <b>${a} ${cr ? "&lt;" : ">"} ${b}</b>.`,
};
// m4.ordenes
S.OR = {
  ordp: ["unidades", "decenas", "centenas", "unidades de millar", "decenas de millar", "centenas de millar", "unidades de millón"],
  ordq: ["unidades", "decenas", "centenas", "unidades de millar", "decenas de millar", "centenas de millar", "millones"],
  ab: ["U", "D", "C", "UM", "DM", "CM"], ab1: ["U", "D", "C", "UM", "DM", "CM", "millón"], abv: ["U", "D", "C", "UM", "DM", "CM", "millones"],
  tapa: ["", "las unidades", "las decenas y las unidades", "las centenas, las decenas y las unidades"],
  cuantas_q: (o, n) => `¿Cuántas ${o} hay en total en <b>${n}</b>?`,
  bill_q: (n, b) => `Quieres pagar ${n} € solo con billetes de ${b} €. ¿Cuántos billetes necesitas?`,
  cuantas_s: (o, tapa, q, ceros, qs, n, f, bill) => `${bill ? `Busco cuántas ${o} hay en ${n}. ` : ""}Tapo ${tapa}: ${q}|${ceros}. Hay <b>${qs}</b> ${o}${bill ? `: hacen falta ${qs} billetes de ${f} €` : ""} (${qs} × ${f} = ${n}).`,
  comp_s: (lista, n) => `Pongo cada cifra en su orden; los órdenes que no aparecen llevan un 0: ${lista} → <b>${n}</b>.`,
  cifra_s: (g, pos, d, v) => `Separo por grupos: ${g}. Contando desde la derecha (unidades, decenas, centenas…), en ${pos} está el <b>${d}</b>${d ? ` (vale ${v})` : " (no vale nada, pero guarda el sitio)"}.`,
  conv_q: (o, v, oq) => `¿Cuántas ${o} son ${v} ${oq}?`,
  conv_s: (chain, v, ab, f, r, abb, saltos) => `${chain}${saltos > 1 ? ` (cada salto multiplica por 10)` : ""}. Así que ${v} ${ab} = ${v} × ${f} = <b>${r}</b> ${abb}.`,
};
// m4.redondeo
S.RD = {
  pos: ["las unidades", "las decenas", "las centenas", "los millares", "las decenas de millar", "las centenas de millar", "las unidades de millón"],
  red_q: (n, p) => `Redondea <b>${n}</b> a ${p}.`,
  // pos: nombres de los órdenes; carry: [[orden, cifra], …] desde el que sube
  red_s: (pos, p, look, up, c, carry, r) => {
    const head = `Miro la cifra vecina, la de ${pos[p - 1]}: es ${look}. `;
    if (!up) return `${head}Como es menor que 5, la cifra de ${pos[p]} se queda en ${c} y las de la derecha pasan a ser ceros: <b>${r}</b>.`;
    if (c < 9) return `${head}Como es 5 o más, la cifra de ${pos[p]} sube de ${c} a ${c + 1} y las de la derecha pasan a ser ceros: <b>${r}</b>.`;
    const [q, d] = carry[carry.length - 1], mid = carry.slice(1, -1).map(([qq]) => `; la cifra de ${pos[qq]} también es un 9: escribo 0 y llevo 1 a ${pos[qq + 1]}`).join("");
    return `${head}Como es 5 o más, la cifra de ${pos[p]} sube, pero es un 9: pasa a 10, así que escribo 0 y llevo 1 a ${pos[p + 1]}${mid}; ${d ? `la cifra de ${pos[q]} pasa de ${d} a ${d + 1}` : `en ${pos[q]} aparece un 1`}. Las de la derecha pasan a ser ceros: <b>${r}</b>.`;
  },
  est_q: (p, e) => `Estima redondeando cada número a ${p}: <b>${e}</b>.`,
  est_s: (a, A, la, b, B, lb, add, r, ex) => `${a} ≈ ${A} (la cifra vecina es ${la}) y ${b} ≈ ${B} (la cifra vecina es ${lb}). Estimación: ${A} ${add ? "+" : "−"} ${B} = <b>${r}</b>. (La cuenta exacta da ${ex}: muy cerca.)`,
};
// m4.mental
S.ME = {
  q: e => `Calcula de cabeza: <b>${e}</b>.`,
  suma_s: (a, up, e, b, r) => `Sumo ${up} y quito ${e}: ${a} + ${up} = ${b}; me he pasado ${e}: ${b} − ${e} = <b>${r}</b>.`,
  resta_s: (a, up, e, b, r) => `Resto ${up} y devuelvo ${e}: ${a} − ${up} = ${b}; he quitado ${e} de más: ${b} + ${e} = <b>${r}</b>.`,
  por5_s: (n, t, r) => `Por 5 es por 10 y entre 2: ${n} × 10 = ${t}; ${t} : 2 = <b>${r}</b>.`,
  por9_s: (n, t, r) => `Por 9 es por 10 y quitar el número una vez: ${n} × 10 = ${t}; ${t} − ${n} = <b>${r}</b>.`,
  parm_s: (x, y, p, m, r) => `Junto primero la pareja amiga: ${x} × ${y} = ${p}. Después, ${p} × ${m} = <b>${r}</b>.`,
  pars_s: (a, c, b, r) => `Busco la pareja amiga: ${a} + ${c} = 100. Sumo el que queda: 100 + ${b} = <b>${r}</b>.`,
  desc_s: (a, n, t, u, p1, p2, r) => `Descompongo ${n} = ${t} + ${u}: ${a} × ${t} + ${a} × ${u} = ${p1} + ${p2} = <b>${r}</b>.`,
};
// m4.series
S.SE = {
  sig_q: s => `¿Qué número sigue en la serie <b>${s}, …</b>?`,
  falta_q: s => `¿Qué número falta en la serie <b>${s}</b>?`,
  regla_q: s => `¿Cuál es la regla de la serie <b>${s}, …</b>?`,
  ar_s: (s, d, last, r) => `De ${s[0]} a ${s[1]} hay ${Math.abs(d)}; de ${s[1]} a ${s[2]}, ${Math.abs(d)}; de ${s[2]} a ${s[3]}, ${Math.abs(d)}. La regla es ${d > 0 ? "sumar" : "restar"} ${Math.abs(d)}: ${last} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = <b>${r}</b>.`,
  mul_s: (s, m, last, r) => `No suma siempre lo mismo. Pruebo a multiplicar: ${s[0]} × ${m} = ${s[1]}, ${s[1]} × ${m} = ${s[2]}, ${s[2]} × ${m} = ${s[3]}. La regla es multiplicar por ${m}: ${last} × ${m} = <b>${r}</b>.`,
  falta_s: (s, j, d) => { const ref = j === 1 ? `de ${s[2]} a ${s[3]}` : `de ${s[j - 2]} a ${s[j - 1]}`; return `${cap(ref)} hay ${Math.abs(d)}: la regla es ${d > 0 ? "sumar" : "restar"} ${Math.abs(d)}. ${s[j - 1]} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = <b>${s[j]}</b>. Compruebo: ${s[j]} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${s[j + 1]}.`; },
  rsum: d => `Sumar ${d}`, rres: d => `Restar ${d}`, rmul: m => `Multiplicar por ${m}`,
  rsum_s: (s, d) => `De ${s[0]} a ${s[1]} hay ${Math.abs(d)}, y de ${s[1]} a ${s[2]}, también: siempre ${d > 0 ? "sube" : "baja"} lo mismo. La regla es <b>${d > 0 ? "sumar" : "restar"} ${Math.abs(d)}</b>.`,
  rmul_s: (s, m) => `De ${s[0]} a ${s[1]} no hay lo mismo que de ${s[1]} a ${s[2]}: no suma siempre lo mismo. Pero ${s[0]} × ${m} = ${s[1]} y ${s[1]} × ${m} = ${s[2]}: la regla es <b>multiplicar por ${m}</b>.`,
  // [una cosa, varias, lo que se cuenta], primero, lo que añade cada una
  crece: [[["mesa", "mesas", "sillas", true, true], 4, 2], [["triángulo", "triángulos", "palillos", false, false], 3, 2], [["cuadrado", "cuadrados", "palillos", false, false], 4, 3], [["vagón", "vagones", "ruedas", false, true], 6, 4]],
  crece_q: ([u, v, c, , fc], f, s, n) => `Con 1 ${u} hay ${f} ${c}, con 2 ${v} hay ${f + s} y con 3 ${v} hay ${f + 2 * s}. Si seguimos igual, ¿cuánt${fc ? "as" : "os"} ${c} habrá con ${n} ${v}?`,
  crece_s: ([u, v, c, fem], f, s, n) => `Cada ${u} ${fem ? "nueva" : "nuevo"} añade ${s} ${c}. ${fem ? "La primera" : "El primero"} tiene ${f}, y ${fem ? "las otras" : "los otros"} ${n - 1} (${n} − 1) añaden ${s} cada ${fem ? "una" : "uno"}: ${f} + ${n - 1} × ${s} = ${f} + ${(n - 1) * s} = <b>${f + (n - 1) * s}</b> ${c}.`,
};
// m4.hueco
S.HU = {
  q: e => `¿Qué número va en el hueco? <b>${e}</b>`,
  s_suma: (c, a, x, comp) => `La resta deshace la suma: ${c} − ${a} = <b>${x}</b>. Compruebo: ${comp}.`,
  s_ini: (a, b, c) => `Tenía un número, le quité ${b} y me quedan ${a}: la suma deshace la resta. ${a} + ${b} = <b>${c}</b>. Compruebo: ${c} − ${b} = ${a}.`,
  s_quita: (c, a, x) => `¡El hueco es lo que se quita! Tenía ${c} y me quedan ${a}: lo que quité es lo que va de ${a} a ${c}. ${c} − ${a} = <b>${x}</b>. Compruebo: ${c} − ${x} = ${a}.`,
  s_mul: (c, a, x, comp) => `La división deshace la multiplicación: ${c} : ${a} = <b>${x}</b>. Compruebo: ${comp}.`,
  s_div: (a, b, c) => `Repartí un número entre ${b} y tocaron a ${a}: la multiplicación deshace la división. ${a} × ${b} = <b>${c}</b>. Compruebo: ${c} : ${b} = ${a}.`,
  s_entre: (c, a, x) => `Busco entre cuántos reparto ${c} para que toquen a ${a}: ${c} : ${a} = <b>${x}</b>. Compruebo: ${c} : ${x} = ${a}.`,
};
// m4.dospasos
S.DP = {
  objs: [["cromos", false], ["canicas", true], ["pegatinas", true], ["puntos", false]],
  comp_q: (N1, a, o, N2, d, mas, fem) => `${N1} tiene ${a} ${o} y ${N2} tiene ${d} ${mas ? "más" : "menos"} que ${N1}. ¿Cuánt${fem ? "as" : "os"} ${o} tienen entre los dos?`,
  comp_s: (N1, N2, a, d, b, t, mas, o, fem) => `Primero averiguo ${fem ? "las" : "los"} de ${N2}: ${a} ${mas ? "+" : "−"} ${d} = ${b} ${o}.<br>Después sumo los dos: ${a} + ${b} = <b>${t}</b> ${o}.<br>(Ojo: ${b} solo son ${fem ? "las" : "los"} de ${N2}.)`,
  rep: [["cajas", "galletas", "amigos", true], ["paquetes", "rotuladores", "mesas", false], ["sobres", "cromos", "niños", false]],
  rep_q: (c, caja, p, cosa, n, q, fem) => `Compramos ${c} ${caja} de ${p} ${cosa} y ${fem ? "las" : "los"} repartimos a partes iguales entre ${n} ${q}. ¿Cuánt${fem ? "as" : "os"} ${cosa} recibe cada ${q === "mesas" ? "mesa" : "uno"}?`,
  rep_s: (c, p, t, n, r, cosa, q) => `${cap(cosa)} en total: ${c} × ${p} = ${t}.<br>Cada ${q === "mesas" ? "mesa" : "uno"}: ${t} : ${n} = <b>${r}</b>.<br>En una expresión: ${c} × ${p} : ${n} = ${t} : ${n} = ${r}.`,
};
// m4.fraccomp
S.FC = {
  q: (l, r) => `Elige el signo: <b>${l} ☐ ${r}</b>`,
  eq_s: (a, b, c, d, k, s1, L, Rr, s) => `De ${b} a ${d} se multiplica por ${k}: ${a}/${b} = ${a * k}/${d}. Ahora los trozos son iguales: ${a * k} ${s1} ${c}. Así que <b>${L} ${s} ${Rr}</b>.`,
  uni_s: (n, d, rel, L, Rr, s) => `${rel === 1 ? `En ${n}/${d} el numerador es menor que el denominador: no llega a completar la unidad (le ${d - n === 1 ? "falta 1 trozo" : `faltan ${d - n} trozos`}).` : rel === 2 ? `En ${n}/${d} el numerador y el denominador son iguales: es justo una unidad.` : `En ${n}/${d} el numerador es mayor que el denominador: hacen falta trozos de otra unidad.`} Así que <b>${L} ${s} ${Rr}</b>.`,
  medio: h => `${h} trozos y medio`, trozos: h => `${h} trozos`,
  mit1_s: (n, d, h, s1, L, Rr, s) => `La mitad de ${d} es ${h}: 1/2 = ${h}/${d}. Como ${n} ${s1} ${h}, <b>${L} ${s} ${Rr}</b>.`,
  mit2_s: (x, d1, h1, y, d2, h2, L, Rr, s) => `Comparo cada una con la mitad. La mitad de ${d1} trozos son ${h1}: ${x === 1 ? "1 no llega" : `${x} no llegan`}, ${x}/${d1} es menos de la mitad. La mitad de ${d2} son ${h2}: ${y} la pasan, ${y}/${d2} es más de la mitad. Por eso <b>${L} ${s} ${Rr}</b>.`,
};
// m4.equivfr
S.EQ = {
  mul_s: (a, b, k) => `De ${b} a ${b * k} se multiplica por ${k}. El numerador también: ${a} × ${k} = <b>${a * k}</b>. Así, ${a}/${b} = ${a * k}/${b * k}.`,
  div_s: (a, b, k) => `De ${a * k} a ${a} se divide entre ${k}. El denominador también: ${b * k} : ${k} = <b>${b}</b>. Así, ${a * k}/${b * k} = ${a}/${b}.`,
  opt_s: (a, b, k) => `Multiplico el numerador y el denominador por el mismo número, ${k}: ${a} × ${k} = ${a * k} y ${b} × ${k} = ${b * k}. Es <b>${a * k}/${b * k}</b>. (Sumar el mismo número arriba y abajo no vale.)`,
  son_q: (f, g) => `¿Son equivalentes <b>${f}</b> y <b>${g}</b>?`,
  sino: ["Sí", "No"],
  son_s: (a, b, c, k, yes) => `De ${b} a ${b * k} se multiplica por ${k}. Hago lo mismo arriba: ${a} × ${k} = ${a * k}${yes ? `, justo el otro numerador: <b>sí</b> son equivalentes.` : `, pero el otro numerador es ${c}: <b>no</b> son equivalentes.`}`,
};
// m4.sumfr
S.SF = {
  uno_s: (b, d) => `Escribo la unidad con el mismo denominador: 1 = ${d}/${d}. ${d}/${d} − ${b}/${d} = <b>${d - b}/${d}</b> (${d} − ${b} = ${d - b}).`,
  llenos: [["Una botella está llena de agua", "bebemos"], ["Una jarra está llena de zumo", "bebéis"], ["Una tarta está entera", "nos comemos"], ["Un depósito está lleno de agua", "gastamos"]],
  queda_q: (c, v, b, d) => `${c} y ${v} ${b}/${d}. ¿Qué fracción queda?`,
  queda_s: (c, b, d) => `Al principio había ${d}/${d}. Queda ${d}/${d} − ${b}/${d} = <b>${d - b}/${d}</b>.`,
  obras: [["una valla", "pintas"], ["un mural", "pintas"], ["un puzle", "haces"], ["un libro", "lees"]],
  falta_q: (o, v, a, b, d) => `El lunes ${v} ${a}/${d} de ${o} y el martes, ${b}/${d}. ¿Qué fracción te falta para terminar?`,
  falta_s: (o, a, b, d) => `Llevo ${a}/${d} + ${b}/${d} = ${a + b}/${d}. Terminar es llegar a ${d}/${d}: me falta ${d}/${d} − ${a + b}/${d} = <b>${d - a - b}/${d}</b>.`,
};
// m4.fracde
const FRN = { 2: ["medio", "medios"], 3: ["tercio", "tercios"], 4: ["cuarto", "cuartos"], 5: ["quinto", "quintos"], 6: ["sexto", "sextos"], 7: ["séptimo", "séptimos"], 8: ["octavo", "octavos"], 9: ["noveno", "novenos"], 10: ["décimo", "décimos"], 11: ["onceavo", "onceavos"], 12: ["doceavo", "doceavos"] };
const frw = (n, d, L) => n === 1 ? (d === 2 ? "La mitad" : `Un ${FRN[d][0]}`) : `${cap(L.words(n))} ${FRN[d][1]}`;
S.FN = {
  s: (N, n, d, p, r, L, obj) => n === 1 ? `${frw(1, d, L)} de ${N}: ${N} : ${d} = <b>${p}</b>.` : `${frw(1, d, L)} de ${N}: ${N} : ${d} = ${p}. ${frw(n, d, L)}: ${p} × ${n} = <b>${r}</b>${obj ? ` ${obj}` : ""}.`,
  med: [["hora", 60, "minutos", [2, 3, 4, 5, 6, 10, 12]], ["kilo", 1000, "gramos", [2, 4, 5, 10]], ["litro", 1000, "mililitros", [2, 4, 5, 10]]],
  med_q: (u, n, d, w) => `¿Cuántos ${u} son <b>${n}/${d} de ${w}</b>?`,
  med_s: (w, tot, u, n, d, p, r, L) => { const pre = `Un${w === "hora" ? "a" : ""} ${w} son ${tot} ${u}. ${frw(1, d, L)}: ${tot} : ${d} = `; return n === 1 ? `${pre}<b>${p} ${u}</b>.` : `${pre}${p} ${u}. ${frw(n, d, L)}: ${p} × ${n} = <b>${r} ${u}</b>.`; },
  queda: [[(N, n, d) => `Un libro tiene ${N} páginas y ya has leído ${n}/${d}. ¿Cuántas páginas te quedan por leer?`, "páginas"],
    [(N, n, d) => `Tienes ${N} € ahorrados y gastas ${n}/${d} en un regalo. ¿Cuántos euros te quedan?`, "€"],
    [(N, n, d) => `Una excursión tiene ${N} km y ya habéis recorrido ${n}/${d} del camino. ¿Cuántos kilómetros os quedan?`, "km"]],
  queda_s: (N, n, d, p, r, u, L) => `${frw(1, d, L)}: ${N} : ${d} = ${p} ${u}. Si ya van ${n}/${d}, ${d - n === 1 ? "queda" : "quedan"} ${d - n}/${d} (lo que falta hasta ${d}/${d}): ${p} × ${d - n} = <b>${r} ${u}</b>.`,
};
// m4.decleer
S.DL = {
  dw_s: (e, c, d, u, x) => `Las ${e === 1 ? "unidades (1)" : `unidades (${e})`} van delante de la coma. ${c === 1 ? "1 centésima es" : `${c} centésimas son`} ${d === 1 ? "1 décima" : `${d} décimas`} y ${u === 1 ? "1 centésima" : `${u} centésimas`}: detrás de la coma, primero las décimas (${d}) y luego las centésimas (${u}). <b>${x}</b>.`,
  igual_s: (a, b, t) => `${a} y ${b} tienen la misma parte entera y ${t} décimas; las ${t} décimas son ${t}0 centésimas. Un cero al final de la parte decimal no cambia el número: <b>${a} = ${b}</b>.`,
  ent_s: (a, b, ea, eb, s) => `Comparo primero la parte entera: ${ea} ${s} ${eb}. Ya está, no hace falta mirar más (aunque uno tenga más cifras): <b>${a} ${s} ${b}</b>.`,
  dec_s: (e, da, db, a, b, s) => `La parte entera es igual (${e}). Comparo las décimas: ${da[0]} y ${db[0]}.${da[0] !== db[0] ? "" : ` Son iguales: comparo las centésimas, ${da[1]} y ${db[1]}.`} Así que <b>${a} ${s} ${b}</b>. (Si te ayuda, escribe los dos con dos decimales.)`,
};
// m4.medirang
S.MA = {
  tr_q: "¿Cuánto mide el ángulo rojo? El centro del transportador está en el vértice.",
  tr_s: (th, left) => `Un lado está sobre el 0 de la ${left ? "izquierda, el de la fila de dentro (en azul)" : "derecha, el de la fila de fuera (en negro)"}. Cuento desde ese 0: el otro lado marca <b>${th}°</b>. (En la otra fila pone ${180 - th}, pero esa empieza en el 0 del otro lado.)`,
  rel_q: h => `¿Qué ángulo forman las agujas ${h === 1 ? "a la 1" : `a las ${h}`} en punto, por el lado más pequeño? (En grados.)`,
  rel_s: (h, e, r) => `La vuelta entera son 360° y el reloj tiene 12 números: entre cada dos hay 360 : 12 = 30°. ${h <= 6 ? `De las 12 ${h === 1 ? "a la 1" : `a las ${h}`}` : `Por el lado más pequeño, de las ${h} a las 12`} hay ${e === 1 ? "1 espacio" : `${e} espacios`}: ${e} × 30 = <b>${r}°</b>.`,
};
// m4.areacuad
S.AQ = {
  fil_s: (w, h, n) => `Es un rectángulo: ${h} filas de ${w} cuadraditos. ${w} × ${h} = <b>${n} cm²</b>.`,
  cnt_s: (n, w, h, c) => `Si estuviera completo serían ${w} × ${h} = ${w * h} cuadraditos, pero falta una esquina de ${c}: ${w * h} − ${c} = <b>${n} cm²</b>. (También se pueden contar uno a uno.)`,
  arr_s: (l, w, r) => `Caben ${w} filas de ${l} cuadrados de 1 cm de lado: ${l} × ${w} = <b>${r} cm²</b>.`,
  med_q: "¿Cuál es el área de la figura, en cuadraditos? Los triángulos amarillos son medios cuadraditos.",
  med_s: (e, m, q, r) => `Cuento los cuadraditos enteros (azules): ${e}. Los medios (amarillos): ${m}, que forman ${m} : 2 = ${q} ${q === 1 ? "entero" : "enteros"}. Área: ${e} + ${q} = <b>${r}</b> cuadraditos.`,
  ap_q: "Cada cuadradito mide 1 cm de lado. ¿Cuál es el área y cuál el perímetro del rectángulo azul?",
  ap_f: ["Área (cm²)", "Perímetro (cm)"],
  ap_s: (l, h, A, P) => `Área (lo de dentro): ${h} filas de ${l} cuadraditos, ${l} × ${h} = <b>${A} cm²</b>.<br>Perímetro (el borde): ${l} + ${h} + ${l} + ${h} = <b>${P} cm</b>.`,
};
// m4.simetria
S.SM = {
  // [nombre, ejes, dibujo, por qué]
  figs: [["un cuadrado", 4, "sq", "se dobla bien por la mitad vertical, por la horizontal y por las dos diagonales"], ["un rectángulo que no es cuadrado", 2, "rect", "se dobla bien por la mitad vertical y por la horizontal; por las diagonales, no"],
    ["un triángulo equilátero", 3, "eq", "se dobla bien por la recta que va de cada vértice al centro del lado de enfrente"], ["un triángulo isósceles", 1, "iso", "solo se dobla bien por la recta que va del vértice de arriba al centro de la base"],
    ["un triángulo escaleno", 0, "esc", "tiene los tres lados distintos y ningún doblez hace coincidir las mitades"], ["un rombo que no es cuadrado", 2, "rombo", "se dobla bien por sus dos diagonales"],
    ["un trapecio con los dos lados inclinados iguales", 1, "trap", "solo se dobla bien por la recta que pasa por el centro de las dos bases"], ["un pentágono regular", 5, "pent", "es un polígono regular: tiene tantos ejes como lados"],
    ["un hexágono regular", 6, "hex", "es un polígono regular: tiene tantos ejes como lados"], ["la letra H", 2, "H", "se dobla bien por una línea vertical y por una horizontal"],
    ["la letra A", 1, "A", "solo se dobla bien por una línea vertical"], ["la letra E", 1, "E", "solo se dobla bien por una línea horizontal"], ["la letra F", 0, "F", "no se dobla bien por ninguna línea: ningún doblez hace coincidir sus dos mitades"],
    ["la letra X", 2, "X", "se dobla bien por una línea vertical y por una horizontal"], ["la letra N", 0, "N", "no se dobla bien por ninguna línea: ningún doblez hace coincidir sus dos mitades"]],
  ejes_q: n => `¿Cuántos ejes de simetría tiene ${n}?`,
  ejes_s: (n, e, why) => `${cap(n)} ${why}: ${e ? `<b>${e}</b> ${e === 1 ? "eje" : "ejes"}` : "<b>0</b> ejes (ninguno)"}.`,
  pun_q: (c, e) => `El eje de simetría (rojo) está en la línea vertical ${e} y el punto azul, en la línea ${c}. ¿En qué línea vertical está su punto simétrico?`,
  pun_s: (c, e, d, r, izq) => `El punto está a ${d === 1 ? "1 cuadradito" : `${d} cuadraditos`} del eje (de la línea ${c} a la ${e}). Su simétrico está a la misma distancia, al otro lado: ${e} ${izq ? "+" : "−"} ${d} = <b>${r}</b>.`,
  tra_q: (x, y, p, der, q, arr) => `Un punto está en el cruce de la línea ${x} (contando hacia la derecha) y la línea ${y} (contando hacia arriba). Lo trasladas ${p} ${p === 1 ? "cuadradito" : "cuadraditos"} hacia la ${der ? "derecha" : "izquierda"} y ${q} hacia ${arr ? "arriba" : "abajo"}. ¿Dónde queda?`,
  tra_f: ["Línea (hacia la derecha)", "Línea (hacia arriba)"],
  tra_s: (x, y, p, der, q, arr, X, Y) => `Hacia la derecha: ${x} ${der ? "+" : "−"} ${p} = <b>${X}</b>. Hacia arriba: ${y} ${arr ? "+" : "−"} ${q} = <b>${Y}</b>. Queda en el cruce de la línea ${X} y la línea ${Y}.`,
};
// m4.recuento
const palotes = f => (`<s>||||</s> `.repeat(Math.floor(f / 5)) + "|".repeat(f % 5)).trim();
S.RC = {
  fr_s: (c, f) => f ? `Hago un palote por cada «${c}»: ${palotes(f)} → ${f > 5 ? `${Math.floor(f / 5) === 1 ? "5" : `${Math.floor(f / 5)} × 5`}${f % 5 ? ` + ${f % 5}` : ""} = ` : ""}<b>${f}</b>.` : `«${c}» no aparece ninguna vez: <b>0</b>.`,
  tot_s: (tb0, n) => { const tb = tb0.filter(p => p[1]); return `Hago la tabla de frecuencias: ${tb.map(([c, f]) => `${c} ${f}`).join(", ")}. Sumo todas las frecuencias: ${tb.map(p => p[1]).join(" + ")} = <b>${n}</b>.`; },
  moda_s: (tb, c, f) => `Hago la tabla de frecuencias: ${tb.filter(p => p[1]).map(([cc, ff]) => `${cc} ${ff}`).join(", ")}. El que más se repite es <b>${c}</b> (${f} veces): es la moda.`,
  frutas: ["Manzana", "Plátano", "Naranja", "Fresa", "Pera", "Uvas"],
  ley: ["Cada", v => `= ${v} votos`],
  pic_q: f => `En el pictograma, ¿cuántos votos tiene la fila «${f}»? Fíjate en la leyenda.`,
  pic_s: (f, v, w, half, N) => `La leyenda dice que cada dibujo vale ${v} votos. ${f}: ${w === 1 ? "1 dibujo" : `${w} dibujos`} (${w} × ${v} = ${w * v})${half ? ` y medio dibujo (la mitad de ${v} = ${v / 2}) → ${w * v} + ${v / 2} = ` : " → "}<b>${N}</b> votos.`,
  dib: (n, half) => `${n === 1 ? "1 dibujo" : `${n} dibujos`}${half ? " y medio" : ""}`,
  con_q: (v, f, N) => `En un pictograma, cada dibujo vale ${v} votos. La fila «${f}» tiene ${N} votos. ¿Cuántos dibujos hay que poner?`,
  con_s: (N, v, w, half) => half ? `${N} : ${v} da ${w} y ${v / 2 === 1 ? "sobra 1" : `sobran ${v / 2}`}, que es medio dibujo (la mitad de ${v}): <b>${w} dibujos y medio</b>.` : `${N} : ${v} = ${w}: <b>${w === 1 ? "1 dibujo" : `${w} dibujos`}</b>.`,
};
})();
