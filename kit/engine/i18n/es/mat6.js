/* WikiAula — textos de gen/mat6.js (Matemáticas, Grado 6), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m6 = G.m6 || {};

// m6.series
S.SE = {
  mas: d => `Sumar ${d}`,
  menos: d => `Restar ${d}`,
  por: r => `Multiplicar por ${r}`,
  sig_q: s => `¿Qué número sigue en la serie <b>${s}, …</b>?`,
  sig_s: (r, a, b) => `Miramos cómo se pasa de cada número al siguiente: la regla es <b>${r.toLowerCase()}</b>, y se cumple en todos los saltos. Después de ${a} va <b>${b}</b>.`,
  dos_q: s => `Escribe los dos números que siguen en la serie <b>${s}, …</b>`,
  f: ["El siguiente", "El de después"],
  dos_s: (r, a, b) => `La regla es <b>${r.toLowerCase()}</b> (compruébala en todos los saltos). Siguen <b>${a}</b> y <b>${b}</b>.`,
  regla_q: s => `¿Cuál es la regla de la serie <b>${s}</b>?`,
  regla_s: (t, r, op) => `Comprobamos con todos los saltos: ${t.slice(0, 4).map((x, i) => `${x} ${op} → ${t[i + 1]}`).join("; ")}. La regla es <b>${r.toLowerCase()}</b>. Mirar solo el primer salto engaña.`,
  lejos_q: (s, n) => `En la serie <b>${s}, …</b>, ¿qué número ocupa el puesto ${n}?`,
  lejos_s: (a, d, n, r) => `Cada número es ${d} más que el anterior. Del puesto 1 al puesto ${n} hay ${n - 1} saltos de ${d}: ${a} + ${n - 1} × ${d} = <b>${r}</b>. No hace falta escribirlos todos.`,
};

// m6.palillos
S.PA = {
  que: ["triángulos", "cuadrados", "casitas"],
  fig: n => `figura ${n}`,
  intro: (q, ps) => `Con palillos se hace una fila de ${q} ${q === "casitas" ? "pegadas" : "pegados"}: con 1, 2 y 3 ${q} se usan ${ps} palillos.`,
  cuantos_q: (n, q) => `¿Cuántos palillos hacen falta para una fila de ${n} ${q}?`,
  cuantos_s: (f, p, n, r, q) => `La primera figura usa ${f} palillos y cada una nueva comparte un palillo con la anterior, así que solo añade ${p}. Regla: 1 palillo de salida y ${p} por cada figura: 1 + ${p} × ${n} = <b>${r}</b>. (También: ${f} + ${p} × ${n - 1} = ${r}).`,
  cuantas_q: (P, q) => `Con ${P} palillos, ¿${q === "casitas" ? "cuántas" : "cuántos"} ${q} se forman en la fila?`,
  cuantas_s: (p, n, P) => `Regla: palillos = 1 + ${p} × n. Deshacemos: ${P} − 1 = ${P - 1} y ${P - 1} : ${p} = <b>${n}</b>. Compruebo: 1 + ${p} × ${n} = ${P}.`,
  regla: (a, b) => a ? `${a} + ${b} × n` : `${b} × n`,
  regla_q: q => `Si n es el número de ${q}, ¿qué regla da el número de palillos?`,
  regla_s: (f, p, q) => `Cada figura nueva añade ${p} palillos, y hay 1 palillo de salida: <b>1 + ${p} × n</b>. Compruebo con n = 1: 1 + ${p} = ${f}. (${f} × n contaría dos veces los palillos que se comparten).`,
  tabla_q: (q, ps, n) => `Completa la tabla de la fila de ${q}: con 1 | 2 | 3 ${q}, los palillos son ${ps}. ¿Cuántos palillos hacen falta con ${n} ${q}?`,
};

// m6.desconocido
S.DE = {
  halla_q: (v, e) => `Halla el valor de ${v === "□" ? "□" : v}: <b>${e}</b>`,
  suma_s: (v, a, b, x) => `La resta deshace la suma: ${v} = ${b} − ${a} = <b>${x}</b>. Compruebo: ${x} + ${a} = ${b}.`,
  resta_s: (v, a, b, x) => `La suma deshace la resta: ${v} = ${b} + ${a} = <b>${x}</b>. Compruebo: ${x} − ${a} = ${b}.`,
  mult_s: (v, a, b, x) => `La división deshace la multiplicación: ${v} = ${b} : ${a} = <b>${x}</b>. Compruebo: ${a} × ${x} = ${b}.`,
  div_s: (v, a, b, x) => `La multiplicación deshace la división: ${v} = ${b} × ${a} = <b>${x}</b>. Compruebo: ${x} : ${a} = ${b}.`,
  dos_s: (v, a, b, c, x, plus) => `Se deshace en orden inverso. Primero ${plus ? "quito" : "sumo"} el ${b} (${plus ? "la resta deshace la suma" : "la suma deshace la resta"}): ${c} ${plus ? "−" : "+"} ${b} = ${plus ? c - b : c + b}. Después divido entre ${a}: ${a * x} : ${a} = <b>${x}</b>. Compruebo: ${a} × ${x} ${plus ? "+" : "−"} ${b} = ${c}.`,
  pienso1_q: (a, c) => `Pienso un número, lo multiplico por ${a} y me da ${c}. ¿Qué número he pensado?`,
  pienso1_s: (a, c, x) => `${a} × n = ${c}, así que n = ${c} : ${a} = <b>${x}</b>. Compruebo: ${a} × ${x} = ${c}.`,
  pienso_q: (a, b, plus, c) => `Pienso un número, lo multiplico por ${a} y ${plus ? "le sumo" : "le resto"} ${b}: me da ${c}. ¿Qué número he pensado?`,
  pienso_s: (a, b, plus, c, x) => `Es ${a} × n ${plus ? "+" : "−"} ${b} = ${c}. Deshago en orden inverso: ${c} ${plus ? "−" : "+"} ${b} = ${a * x}, y ${a * x} : ${a} = <b>${x}</b>. Compruebo: ${a} × ${x} ${plus ? "+" : "−"} ${b} = ${c}.`,
  balanza_q: (a, b) => `La balanza está equilibrada: la caja misteriosa y una pesa de ${a} kg pesan lo mismo que ${b} kg. ¿Cuántos kilos pesa la caja?`,
  balanza_s: (a, b, x) => `Es como la igualdad □ + ${a} = ${b}. Quito ${a} kg de los dos platillos: □ = ${b} − ${a} = <b>${x}</b> kg. Compruebo: ${x} + ${a} = ${b}.`,
};

// m6.signo
S.SG = {
  q: (a, b) => `¿Qué signo va en el hueco? <b>${a} ☐ ${b}</b>`,
  s: (a, va, b, vb, k) => `${a} = ${va} y ${b} = ${vb}. ${["Como " + va + " &gt; " + vb + ", va el signo <b>&gt;</b>.", "Como " + va + " &lt; " + vb + ", va el signo <b>&lt;</b>.", "Valen lo mismo: es una igualdad, va el signo <b>=</b>."][k]}`,
};
// ═════ Versiones de Primaria de los generadores de 1.º de ESO (gen/mat6.js) ═════
const may = s => s[0].toUpperCase() + s.slice(1);
const cu = (f, w) => (f ? "¿Cuántas " : "¿Cuántos ") + w;

// m6.raizent
S.RZ = {
  q: n => `Calcula la raíz cuadrada entera de <b>${n}</b> y su resto.`,
  f: ["Raíz entera", "Resto"],
  bald_q: n => `Con ${n} baldosas cuadradas quieres formar el cuadrado más grande posible. ¿Cuántas baldosas tendrá cada lado? ¿Cuántas sobrarán?`,
  fb: ["Baldosas por lado", "Sobran"],
  tanteo: (n, d, dd, d1, dd1) => `${n} se sale de la tabla: tanteo con las decenas. ${d} × ${d} = ${dd} y ${d1} × ${d1} = ${dd1}, así que la raíz está entre ${d} y ${d1}. `,
  s: (n, r, q, r1, q1, rest, ctx, big) => `${big ? "Pruebo" : "Busco en la tabla dos cuadrados seguidos"}: ${r} × ${r} = ${q} cabe en ${n}, y ${r1} × ${r1} = ${q1} ya se pasa. Raíz entera: <b>${r}</b>. Resto: ${n} − ${q} = <b>${rest}</b>${ctx ? " baldosas" : ""}. Compruebo: ${q} + ${rest} = ${n}.`,
};

// m6.pot10
S.P10 = {
  calc_q: e => `Calcula <b>${e}</b>.`,
  nat_s: (a, p, k, r) => `${p} es un 1 seguido de ${k} ceros: multiplicar por ${p} es añadir ${k} ceros a ${a}. Resultado: <b>${r}</b>.`,
  dec_s: (k, dd, z, r) => `La coma se mueve ${k} lugares a la derecha: ${dd.length === 1 ? "1 lugar pasa por el " + dd[0] : dd.length + " lugares pasan por el " + dd.join(" y el ")}${z ? ` y en ${z === 1 ? "el otro pongo un 0" : "los otros " + z + " pongo ceros"}` : ""} → <b>${r}</b>.`,
  abr_q: N => `¿Cómo se escribe abreviado el número <b>${N}</b>, con un número entre 1 y 10 por una potencia de 10?`,
  abr_s: (sig, m, N, k, good) => sig === 1
    ? `Delante va un número entre 1 y 10: el ${m}. Para volver a ${N} hay que añadirle ${k} ceros, es decir, multiplicar por 10<sup>${k}</sup>: <b>${good}</b>.`
    : `Delante va un número entre 1 y 10: pongo la coma detrás de la primera cifra → ${m}. Para volver a ${N}, la coma tiene que ir ${k} lugares a la derecha, es decir, multiplicar por 10<sup>${k}</sup>: <b>${good}</b>.`,
};

// m6.descomp
S.DC = {
  num_q: t => `¿Qué número es <b>${t}</b>?`,
  num_s: (terms, vals, n) => `Calculo cada término: ${terms}. Sumo: ${vals} = <b>${n}</b>.`,
  exp_q: (n, shown) => `Completa la descomposición: <b>${n} = ${shown}</b>. ¿Qué exponente va en el hueco?`,
  pos: { 2: "las centenas", 3: "las unidades de millar", 4: "las decenas de millar", 5: "las centenas de millar", 6: "las unidades de millón" },
  exp_s: (d, pos, v, p10, pw, e) => `El ${d} está en ${pos}: vale ${v} = ${d} × ${p10}, y ${p10} = ${pw}. En el hueco va el <b>${e}</b>.`,
};

// m6.combinadas y m6.parentesis
S.CB = {
  q: e => `Calcula: <b>${e}</b>`,
  s: (first, lines, v) => `Por pisos: primero lo que hay dentro de los paréntesis y corchetes (de dentro afuera), después las potencias, luego × y : y al final + y −, siempre de izquierda a derecha.<br>${first}${lines.map(l => "<br>= " + l).join("")}<br>= <b>${v}</b>`,
};
S.PA2 = {
  q: (e, t) => `¿Dónde hay que poner los paréntesis para que <b>${e}</b> dé ${t}?`,
  ninguno: "En ningún sitio",
  s: (list, good, t, e, v0) => `Calculo cada opción (primero lo de dentro del paréntesis): ${list}. Solo <b>${good}</b> da ${t}. (Sin paréntesis, ${e} = ${v0}.)`,
  cosas: [["cuadernos", "lápices"], ["bolígrafos", "gomas"], ["sobres de cromos", "chicles"], ["botellas de agua", "bocadillos"]],
  compra_q: (n1, o1, p1, n2, o2, p2, B) => `Compras ${n1} ${o1} a ${p1} € y ${n2} ${o2} a ${p2} €, y pagas con un billete de ${B} €. ¿Qué expresión calcula la vuelta?`,
  compra_s: (n1, p1, n2, p2, tot, B, v, wrong, wv, o2) => `Primero, lo que cuesta todo: ${n1} × ${p1} + ${n2} × ${p2} = ${tot} €. La vuelta es ${B} − ${tot} = ${v} €: hay que restar todo junto, con paréntesis: <b>${B} − (${n1} × ${p1} + ${n2} × ${p2})</b>. Sin paréntesis, ${wrong} = ${wv}: se sumarían los ${o2} en vez de restarse.`,
  reparto: [["cromos", "amigos"], ["canicas", "amigos"], ["caramelos", "primos"]],
  rep_q: (a, b, c, o) => `Tienes ${a} ${o[0]}, te regalan ${b} más y repartes todos a partes iguales entre ${c} ${o[1]}. ¿Qué expresión calcula cuántos recibe cada uno?`,
  rep_s: (a, b, c, s, q, o) => `Primero se juntan todos: ${a} + ${b} = ${s}; después se reparten: ${s} : ${c} = ${q} ${o[0]} cada uno. La suma va primero, entre paréntesis: <b>(${a} + ${b}) : ${c}</b>. (Sin paréntesis, solo se repartirían los ${b} del regalo.)`,
};

// m6.enteros
const UG = { u: "grados", sube: "subo", v: x => `${x} °C` }, UP = { u: "plantas", sube: "subo", v: x => String(x) === "0" ? "planta 0 (la de la calle)" : `planta ${x}` };
S.EN = {
  grados: UG, plantas: UP,
  temp_q: (s, up, c) => `A primera hora el termómetro marca ${s} °C y la temperatura ${up ? "sube" : "baja"} ${c} grados. ¿Qué temperatura hay ahora (en °C)?`,
  asc_q: (s, up, c) => `Estás en la planta ${s} de un edificio y ${up ? "subes" : "bajas"} ${c} plantas en el ascensor. ¿En qué planta estás ahora? (Los sótanos son plantas negativas.)`,
  cruza_up: (s, ds, c, r, U) => `De ${s} a 0 subo ${ds} ${U.u}; me quedan ${c} − ${ds} = ${r} por subir: <b>${U.v(r)}</b>.`,
  noCruza_up: (s, c, r, U) => r === "0" ? `Desde ${s}, subo ${c} ${U.u} y llego justo al 0: <b>${U.v(r)}</b>.` : `Desde ${s} subo ${c} ${U.u} y todavía no llego al 0: quedo ${r.slice(1)} por debajo, en <b>${U.v(r)}</b>.`,
  cruza_down: (s, c, rest, r, U) => `De ${s} a 0 bajo ${s} ${U.u}; me quedan ${c} − ${s} = ${rest} por bajar: <b>${U.v(r)}</b>.`,
  noCruza_down: (s, c, r, U) => r === 0 ? `De ${s} bajo ${c} ${U.u} y llego justo al 0: <b>${U.v(r)}</b>.` : `${s} − ${c} = ${r}: no llego a bajar del 0. <b>${U.v(r)}</b>.`,
  bajo_cero: (s, c, as, ar, r, U) => `Ya estoy por debajo del 0, en ${s}: si bajo ${c} ${U.u} más, quedo ${as} + ${c} = ${ar} por debajo del 0: <b>${U.v(r)}</b>.`,
  sitios: ["un pueblo de la montaña", "una ciudad del norte", "el patio del colegio", "un refugio de la sierra"],
  dif_q: (sitio, M, m) => `En ${sitio}, la temperatura máxima de ayer fue ${M} °C y la mínima, ${m} °C. ¿Cuántos grados de diferencia hubo?`,
  dif_s: (m, am, M, r) => `De ${m} a 0 hay ${am} grados y de 0 a ${M}, otros ${M}: ${am} + ${M} = <b>${r}</b> grados.`,
  dif2_s: (m, M, am, aM, r) => `Las dos están bajo cero: de ${m} a ${M} se sube ${am} − ${aM} = <b>${r}</b> grados.`,
  gasto_q: (a, g) => `Tienes ${a} € y compras algo que cuesta ${g} € (tu hermana te presta lo que falta). ¿Qué número entero indica ahora tu dinero? (Lo que debes es negativo.)`,
  gasto_s: (a, g, d, r) => `Con tus ${a} € llegas al 0; te faltan ${g} − ${a} = ${d} €, que debes: ${a} − ${g} = <b>${r}</b> (debes ${d} €).`,
  deuda_q: (d, g) => `Debes ${d} € a un amigo y te dan ${g} € de paga. Después de devolverle lo que puedas, ¿qué número entero indica tu dinero? (Si todavía debes, es negativo.)`,
  deuda_s: (d, g, r) => `Con ${d} € pagas la deuda y llegas al 0; te quedan ${g} − ${d} = <b>${r}</b> €.`,
  deuda2_s: (d, g, rest, r) => `Con los ${g} € pagas parte de la deuda, pero todavía debes ${d} − ${g} = ${rest} €: <b>${r}</b>.`,
  sub_q: (d, u) => `Un submarino está a ${d} m de profundidad y sube ${u} m. ¿En qué número está ahora, si el nivel del mar es el 0? (Escribe el número entero.)`,
  sub_s: (d, u, rest, r) => `Sigue bajo el agua: ${d} − ${u} = ${rest} m de profundidad, es decir, <b>${r}</b>.`,
  buzo_q: (d, b) => `Una buceadora está a ${d} m de profundidad y baja ${b} m más. ¿En qué número está ahora, si el nivel del mar es el 0?`,
  buzo_s: (d, b, t, r) => `Ya estaba por debajo del nivel del mar y baja más: ${d} + ${b} = ${t} m de profundidad, es decir, <b>${r}</b>.`,
};

// m6.opuesto y m6.entcomp
S.OP = {
  abs_q: n => `Calcula el valor absoluto: <b>|${n}|</b>`,
  abs_s: (n, a) => `El valor absoluto es la distancia al 0, sin signo: ${n} está a ${a} pasos del 0, así que |${n}| = <b>${a}</b>.`,
  op_q: n => `¿Cuál es el opuesto de <b>${n}</b>?`,
  op_s: (n, o, a) => `El opuesto tiene el mismo valor absoluto (${a}) y el signo contrario: el opuesto de ${n} es <b>${o}</b>. Juntos dan 0: si subes ${a} pisos y después bajas ${a}, vuelves a donde estabas.`,
  mas_q: (a, b) => `¿Cuál de estos dos números tiene mayor valor absoluto?`,
  mas_s: (a, aa, b, ab, w) => `|${a}| = ${aa} y |${b}| = ${ab}: está más lejos del 0 el <b>${w}</b>.`,
};
S.EC = {
  q: (a, b) => `¿Qué signo va en el hueco? <b>${a} ☐ ${b}</b>`,
  s: (big, res, both) => `En la recta numérica, ${big} está más a la derecha, así que es mayor: <b>${res}</b>.${both ? " Entre dos negativos es mayor el que está más cerca del 0." : ""}`,
  ext_q: (menor, list) => `¿Cuál es el ${menor ? "menor" : "mayor"} de estos números? <b>${list}</b>`,
  ext_s: (ord, menor, v) => `En la recta, de izquierda a derecha: ${ord}. El ${menor ? "menor es el que está más a la izquierda" : "mayor es el que está más a la derecha"}: <b>${v}</b>.`,
};

// m6.barras
S.BA = {
  nombres: ["Leo", "Marta", "Iris", "Hugo", "Sara", "Pablo", "Nora", "Bruno", "Lucía", "Mateo"],
  cosas: [["cromos", false], ["canicas", true], ["euros", false], ["pegatinas", true], ["libros", false]],
  veces: { 2: "el doble", 3: "el triple", 4: "el cuádruple", 5: "el quíntuple" },
};
Object.assign(S.BA, {
  veces_q: (p1, p2, tot, [obj, f], vez, who) => `Entre ${p1} y ${p2} tienen ${tot} ${obj}. ${p2} tiene ${vez} que ${p1}. ${cu(f, obj)} tiene ${who}?`,
  veces_s: (p1, p2, k, tot, x, kx) => `Dibujo las barras: ${p1}, 1 barra; ${p2}, ${k} barras iguales. En total, ${k + 1} barras = ${tot} → 1 barra = ${tot} : ${k + 1} = ${x}. ${p1} tiene <b>${x}</b> y ${p2}, ${k} × ${x} = <b>${kx}</b>.`,
  mas_q: (p1, p2, tot, [obj, f], d, who) => `Entre ${p1} y ${p2} tienen ${tot} ${obj}. ${p1} tiene ${d} más que ${p2}. ${cu(f, obj)} tiene ${who}?`,
  mas_s: (p1, p2, tot, d, x, xd) => `Dibujo dos barras iguales y a la de ${p1} le añado un trozo de ${d}. Si quito ese trozo, quedan ${tot} − ${d} = ${tot - d} en dos barras iguales: ${tot - d} : 2 = ${x}. ${p2} tiene <b>${x}</b> y ${p1}, ${x} + ${d} = <b>${xd}</b>.`,
  dif_q: (p1, p2, [obj, f], vez, dif) => `${p2} tiene ${vez} de ${obj} que ${p1}, y ${dif} más que ${p1}. ${cu(f, obj)} tiene ${p1}?`,
  dif_s: (p1, p2, k, dif, x, kx) => k === 2 ? `La barra de ${p2} son 2 barras como la de ${p1}: la diferencia es justo 1 barra, así que la barra de ${p1} vale ${dif}. ${p1} tiene <b>${x}</b> (y ${p2}, 2 × ${x} = ${kx}).` : `La barra de ${p2} son ${k} barras como la de ${p1}. La diferencia son ${k} − 1 = ${k - 1} barras = ${dif} → 1 barra = ${dif} : ${k - 1} = <b>${x}</b>. (${p2} tiene ${k} × ${x} = ${kx}.)`,
});

// m6.grandes (números de 9 y 10 cifras; L.words solo llega a 999 999 999)
const W6 = (L, n) => {
  if (n < 1e9) return L.words(n);
  const a = Math.floor(n / 1e9), m = Math.floor(n / 1e6) % 1000, r = n % 1e6;
  return L.words(a * 1000) + (m ? " " + L.words(m * 1e6).replace(/ millones$| millón$/, "") : "") + " millones" + (r ? " " + L.words(r) : "");
};
S.GR = {
  words: W6,
  sinMill: (L, n) => { const r = n % 1e6; return L.words(Math.floor(n / 1e9) * 1000) + (r ? " " + L.words(r) : ""); },
  cl: ["Miles de millones", "Millones", "Millares", "Unidades"],
  frag: (L, x, i) => i === 0 ? L.words(x * 1000) + " (millones)" : i === 1 ? L.words(x * 1e6) : i === 2 ? L.words(x * 1000) : L.words(x),
  escr_q: w => `Escribe con cifras: <b>${w}</b>.`,
  escr_s: (parts, n) => parts.map(([c, w, d]) => w ? `${c}: «${w}» → ${d}` : `${c}: no se nombra → ${d}`).join("<br>") + `<br>Número: <b>${n}</b>. (Cada clase, salvo la primera, lleva sus tres cifras.)`,
  val_q: (n, d) => `En el número <b>${n}</b>, ¿cuánto vale la cifra ${d}?`,
  val_s: (cl, d, pos, v) => `Separo en clases desde la derecha: ${cl}. El ${d} está en ${pos}: vale <b>${v}</b>.`,
  pos: ["las unidades", "las decenas", "las centenas", "las unidades de millar", "las decenas de millar", "las centenas de millar",
    "las unidades de millón", "las decenas de millón", "las centenas de millón", "las unidades de millar de millón"],
  lugar: { 6: "los millones", 7: "las decenas de millón", 8: "las centenas de millón", 9: "los miles de millones" },
  red_q: (n, l) => `Redondea <b>${n}</b> a ${l}.`,
  red_s: (l, pn, nd, up, pos, td, r) => `Para redondear a ${l}, miro la cifra de su derecha, la de ${pn}: es ${nd}${up ? " (5 o más)" : " (menos de 5)"}. ${up ? `La cifra de ${pos} sube uno (${td} → ${td + 1})` : `La cifra de ${pos} (${td}) no cambia`} y todas las de su derecha pasan a ser ceros: <b>${r}</b>.`,
  leer_q: n => `¿Cómo se lee el número <b>${n}</b>?`,
  leer_s: (cl, w, m0) => `Separo en clases desde la derecha: ${cl}. Leo cada grupo y añado «mil» detrás de los miles de millones, «millones» detrás de los millones y «mil» detrás de los millares (nada si el grupo es 000). Se lee: <b>${w}</b>.${m0 ? " Aunque el grupo de los millones sea 000, «millones» se dice una vez." : ""}`,
};

// m6.distancia
S.DS = {
  dist_q: (a, b) => `¿Cuántas unidades hay entre <b>${a}</b> y <b>${b}</b> en la recta numérica?`,
  dist_s: (a, da, b, d) => `${a} y ${b} están a distintos lados del 0, así que se suman sus distancias al 0: de ${a} a 0 hay ${da} y de 0 a ${b}, otras ${b}: ${da} + ${b} = <b>${d}</b> unidades.`,
  distN_s: (a, b, da, db, d) => `${a} y ${b} están los dos a la izquierda del 0, a ${da} y a ${db} de él: se restan, ${da} − ${db} = <b>${d}</b> unidades.`,
  distP_s: (a, b, d) => `${a} y ${b} están los dos a la derecha del 0: se restan, ${b} − ${a} = <b>${d}</b> unidades.`,
  rana_q: (s, c, right) => `Una rana está en el ${s} y da ${c} saltos de una unidad hacia la ${right ? "derecha" : "izquierda"}. ¿En qué número cae?`,
  der: "derecha", izq: "izquierda", sale: "sale",
  cruza: (s, z, c, r, dir) => `De ${s} al 0 hay ${z === 1 ? "1 salto" : z + " saltos"} hacia la ${dir}; le quedan ${c} − ${z} = ${c - z} más: cae en el <b>${r}</b>.`,
  acerca: (s, c, dir, ds, dr, r) => dr === 0 ? `Desde ${s}, ${c} saltos hacia la ${dir} la llevan justo al <b>0</b>.` : `Desde ${s}, ${c} saltos hacia la ${dir} la acercan al 0 sin llegar: queda a ${ds} − ${c} = ${dr} del 0, en el <b>${r}</b>.`,
  sigue: (s, c, dir, ds, d, r) => `Desde ${s}, ${c} saltos hacia la ${dir} la alejan del 0: queda a ${ds} + ${c} = ${d} unidades de él, en el <b>${r}</b>.`,
};

// m6.criterio
S.CR = {
  multi_q: n => `¿Entre cuáles de estos números es divisible <b>${n}</b>? (Marca todos los que lo sean.)`,
  q: (n, d) => `¿Es <b>${n}</b> divisible entre ${d}?`,
  sino: ["Sí", "No"],
  s: {
    2: (n, ok) => `Entre 2: acaba en ${String(n).slice(-1)}, ${ok ? "que es par → <b>sí</b>" : "que es impar → <b>no</b>"}.`,
    3: (n, ok, st, s) => `Entre 3: sus cifras suman ${st} = ${s}, ${ok ? "que es" : "que no es"} múltiplo de 3 → <b>${ok ? "sí" : "no"}</b>.`,
    5: (n, ok) => `Entre 5: acaba en ${String(n).slice(-1)} → <b>${ok ? "sí" : "no"}</b> (tiene que acabar en 0 o en 5).`,
    9: (n, ok, st, s) => `Entre 9: sus cifras suman ${st} = ${s}, ${ok ? "que es" : "que no es"} múltiplo de 9 → <b>${ok ? "sí" : "no"}</b>.`,
    10: (n, ok) => `Entre 10: acaba en ${String(n).slice(-1)} → <b>${ok ? "sí" : "no"}</b> (tiene que acabar en 0).`,
  },
  hueco_q: (x, d) => `¿Qué cifras pueden ir en el hueco para que <b>${x.replace("_", "□")}</b> sea divisible entre ${d}? (Escríbelas todas, separadas por comas.)`,
  hueco39_s: (st, s0, d, ans) => `Sumo las cifras que hay: ${st} = ${s0}. Con la cifra del hueco, la suma tiene que ser múltiplo de ${d}: valen <b>${ans}</b>.`,
  hueco_s: { 2: "Para ser divisible entre 2 tiene que acabar en cifra par: <b>0, 2, 4, 6, 8</b>.", 5: "Para ser divisible entre 5 tiene que acabar en 0 o en 5: <b>0, 5</b>.", 10: "Para ser divisible entre 10 tiene que acabar en 0: <b>0</b>." },
};

// m6.primo
S.PR = {
  q: n => `¿Es <b>${n}</b> un número primo o compuesto?`,
  opts: ["Primo", "Compuesto"],
  paso: (p, n, ok, last, s, q, r) => p === 2 ? `¿Entre 2? ${n} acaba en ${last}: ${ok ? "es par → sí" : "es impar → no"}.`
    : p === 3 ? `¿Entre 3? Sus cifras suman ${s}: ${ok ? "es" : "no es"} múltiplo de 3 → ${ok ? "sí" : "no"}.`
    : p === 5 ? `¿Entre 5? ${ok ? `Acaba en ${last} → sí` : "No acaba en 0 ni en 5 → no"}.`
    : `¿Entre ${p}? ${n} : ${p} = ${q}${ok ? ", exacta → sí" : ` y ${r === 1 ? "sobra 1" : "sobran " + r} → no`}.`,
  primo: (p, pp, n) => `El siguiente primo es el ${p}, y ${p} × ${p} = ${pp} ya se pasa de ${n}: no hace falta seguir. ${n} es <b>primo</b>.`,
  comp: (n, p, q) => `${n} = ${p} × ${q}: tiene más de dos divisores, es <b>compuesto</b>.`,
};

// m6.factoriza y m6.defact
S.FA = {
  q: n => `Descompón <b>${n}</b> en factores primos. (Escribe los factores separados por × o x, y las potencias con ^; por ejemplo, 2^3 × 5.)`,
  ch_q: n => `¿Cuál es la descomposición en factores primos de <b>${n}</b>?`,
  hint: "Escribe los factores primos con potencias. Ejemplo: 2^3 × 5",
  col: st => `En columna, dividiendo siempre entre el primo más pequeño que se pueda:<br>${st}`,
  paso: (m, p, isP, last, s, q) => `${isP ? `${m} es primo` : p === 2 ? `${m} es par` : p === 3 ? `las cifras de ${m} suman ${s}, múltiplo de 3` : p === 5 ? `${m} acaba en ${last}` : p === 7 ? `${m} no se puede dividir entre 2, 3 ni 5; pruebo con 7` : p === 11 ? `${m} no se puede dividir entre 2, 3, 5 ni 7; pruebo con 11` : `${m} no se puede dividir entre 2, 3, 5, 7 ni 11; pruebo con 13`} → ${m} : ${p} = ${q}`,
  fin: (n, list, good, grouped) => grouped ? `${n} = ${list} = <b>${good}</b>` : `${n} = <b>${list}</b>`,
  ch_no: (alt, x) => `(${alt} no vale: ${x} no es primo.)`,
  def_q: f => `¿Qué número es <b>${f}</b>?`,
  def_s: (pw, vals, n) => `${pw ? "Primero las potencias: " + pw + ". Después multiplico" : "Multiplico"}: ${vals} = <b>${n}</b>.`,
};

// m6.mcd, m6.mcdprob, m6.mcm, m6.mcmprob, m6.mcxtipo
S.MD = {
  q: (a, b) => `Calcula el máximo común divisor: <b>m.c.d.(${a}, ${b})</b>.`,
  lista_s: (a, da, b, db, c, g) => `Divisores de ${a}: ${da}. Divisores de ${b}: ${db}. Comunes: ${c}. El mayor: m.c.d. = <b>${g}</b>.`,
  fac_s: (a, fa, b, fb, ch, g) => g === 1 ? `${a} = ${fa} y ${b} = ${fb}. No tienen ningún factor primo común: m.c.d. = <b>1</b> (son primos entre sí).` : `${a} = ${fa} y ${b} = ${fb}. Factores comunes con el menor exponente: ${ch ? ch + " = " : ""}<b>${g}</b>.`,
  mq: (a, b) => `Calcula el mínimo común múltiplo: <b>m.c.m.(${a}, ${b})</b>.`,
  mlista_s: (b, list, m, a, k) => `Múltiplos de ${b}: ${list}. El primero que también es múltiplo de ${a} es el ${m} (${m} : ${a} = ${k}): m.c.m. = <b>${m}</b>.`,
  mfac_s: (a, fa, b, fb, al, m) => `${a} = ${fa} y ${b} = ${fb}. Todos los factores, comunes y no comunes, con el mayor exponente: ${al === m ? "" : al + " = "}<b>${m}</b>.`,
  por: {
    grupos: (cosa, a, b) => `El número de ${cosa} tiene que dividir a ${a} y a ${b} (para que no sobre nada) y ser el mayor posible: es el m.c.d.`,
    trozos: (cosa, a, b) => `La medida de ${cosa} tiene que dividir a ${a} y a ${b} (para que no sobre nada) y ser la mayor posible: es el m.c.d.`,
  },
  prob: [
    { tipo: "trozos", cosa: "cada trozo", q: (a, b) => `Tenemos dos cintas de ${a} cm y ${b} cm. Queremos cortarlas en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuánto medirá cada trozo (en cm)?`, s: g => `Cada trozo medirá <b>${g} cm</b>.` },
    { tipo: "trozos", cosa: "el lado de la baldosa", q: (a, b) => `Un suelo rectangular mide ${a} dm por ${b} dm. Queremos cubrirlo con baldosas cuadradas iguales, lo más grandes posible y sin cortar ninguna. ¿Cuánto medirá el lado de cada baldosa (en dm)?`, s: g => `El lado medirá <b>${g} dm</b>.` },
    { tipo: "grupos", cosa: "bolsas", q: (a, b) => `Se quieren hacer bolsas iguales con ${a} caramelos de fresa y ${b} de limón, sin que sobre ninguno y con el mayor número posible de bolsas. ¿Cuántas bolsas se pueden hacer?`, s: g => `Se pueden hacer <b>${g}</b> bolsas.`, per: true, per_q: "¿Cuántos caramelos de fresa llevará cada bolsa?", per_s: (g, a, x) => `Hay ${g} bolsas: cada una lleva ${a} : ${g} = <b>${x}</b> caramelos de fresa.` },
    { tipo: "grupos", cosa: "lotes", q: (a, b) => `En la papelería tienen ${a} lápices y ${b} gomas. Quieren hacer lotes iguales, con el mayor número de lotes posible y sin que sobre nada. ¿Cuántos lotes pueden hacer?`, s: g => `Pueden hacer <b>${g}</b> lotes.`, per: true, per_q: "¿Cuántos lápices llevará cada lote?", per_s: (g, a, x) => `Hay ${g} lotes: cada uno lleva ${a} : ${g} = <b>${x}</b> lápices.` },
    { tipo: "grupos", cosa: "equipos", q: (a, b) => `A un campamento van ${a} chicas y ${b} chicos. Se quieren formar equipos iguales (todos con las mismas chicas y los mismos chicos), con el mayor número de equipos posible. ¿Cuántos equipos se pueden formar?`, s: g => `Se pueden formar <b>${g}</b> equipos.`, per: true, per_q: "¿Cuántas chicas habrá en cada equipo?", per_s: (g, a, x) => `Hay ${g} equipos: en cada uno, ${a} : ${g} = <b>${x}</b> chicas.` },
  ],
  coinc: "Son cosas que se repiten, y buscamos cuándo vuelven a coincidir: el primer múltiplo común, el m.c.m.",
  mprob: [
    { q: (a, b) => `De una estación salen dos autobuses: uno cada ${a} minutos y otro cada ${b} minutos. Si acaban de salir juntos, ¿dentro de cuántos minutos volverán a coincidir?`, s: m => `Vuelven a coincidir dentro de <b>${m}</b> minutos.` },
    { q: (a, b) => `Un faro se enciende cada ${a} segundos y otro cada ${b} segundos. Si se acaban de encender a la vez, ¿cuántos segundos pasarán hasta que vuelvan a encenderse juntos?`, s: m => `Vuelven a encenderse juntos dentro de <b>${m}</b> segundos.` },
    { q: (a, b) => `Ana va a la piscina cada ${a} días y Marcos cada ${b} días. Hoy han coincidido. ¿Dentro de cuántos días volverán a coincidir?`, s: m => `Vuelven a coincidir dentro de <b>${m}</b> días.` },
    { q: (a, b) => `En el huerto del colegio, los tomates se riegan cada ${a} días y las lechugas cada ${b} días. Hoy se han regado los dos. ¿Dentro de cuántos días se volverán a regar el mismo día?`, s: m => `Se vuelven a regar el mismo día dentro de <b>${m}</b> días.` },
  ],
  // el enunciado sin la pregunta del final (m6.mcdprob pone otra pregunta)
  sinPreg: q => q.replace(/¿[^¿]*$/, ""),
  x_q: q => `Para resolver este problema, ¿qué hay que calcular?<br><i>${q}</i>`,
  x_opts: ["El máximo común divisor (m.c.d.)", "El mínimo común múltiplo (m.c.m.)"],
  x_s: {
    grupos: "Hay que repartir en el <b>mayor número de grupos iguales</b> sin que sobre nada: es un problema de <b>m.c.d.</b>",
    trozos: "Hay que cortar en <b>trozos iguales lo más grandes posible</b> sin que sobre nada: es un problema de <b>m.c.d.</b>",
    coinc: "Hay que saber <b>cuándo vuelven a coincidir</b> cosas que se repiten: es un problema de <b>m.c.m.</b>",
  },
};

// m6.esequiv y m6.frfr
S.EQ = {
  q: (f1, f2) => `¿Son equivalentes ${f1} y ${f2}?`,
  sino: ["Sí", "No"],
  s: (a, e, b, c, ae, bc, yes) => `Multiplico en cruz: el numerador de la primera por el denominador de la segunda, ${a} × ${e} = ${ae}, y el denominador de la primera por el numerador de la segunda, ${b} × ${c} = ${bc}. ${yes ? "Son iguales: <b>sí</b> son equivalentes." : "Son distintos: <b>no</b> son equivalentes."}`,
};
S.FF = {
  q: (f1, f2) => `Calcula ${f1} de ${f2}. (Simplifica el resultado.)`,
  prod: (f1, f2, fp, raw) => `«De» significa «por»: ${f1} de ${f2} = ${f1} × ${f2} = ${fp} = ${raw}`,
  simp: (g, f) => `; simplifico entre ${g}: <b>${f}</b>.`,
  irr: ", que ya es irreducible.",
  cant: (fr, tot, r1, each, r0, x, u) => `Y ${fr} de ${tot} = ${tot} : ${r1} × ${r0} = ${each} × ${r0} = <b>${x}</b> ${u}.`,
  ctx: [
    { q: (cd, ab) => `En una clase, ${cd} de los alumnos comen en el comedor y, de ellos, ${ab} toman fruta de postre.`, f: "¿Qué fracción de toda la clase toma fruta?",
      n: (t, cd, ab) => `En una clase de ${t} alumnos, ${cd} comen en el comedor y, de ellos, ${ab} toman fruta de postre. ¿Cuántos alumnos toman fruta?`, u: "alumnos" },
    { q: (cd, ab) => `Después de una fiesta, la parte de tarta que ha sobrado es ${cd}. Al día siguiente te comes ${ab} de lo que sobró.`, f: "¿Qué fracción de la tarta entera te has comido?",
      n: (t, cd, ab) => `Una tarta está cortada en ${t} trozos iguales. Después de una fiesta, la parte que ha sobrado es ${cd} de la tarta, y al día siguiente te comes ${ab} de lo que sobró. ¿Cuántos trozos te has comido?`, u: "trozos" },
    { q: (cd, ab) => `En un huerto, ${cd} del terreno son tomateras y ${ab} de las tomateras son de tomates cherry.`, f: "¿Qué fracción del huerto son tomates cherry?",
      n: (t, cd, ab) => `Un huerto mide ${t} m². ${may(cd)} del terreno son tomateras y ${ab} de las tomateras son de tomates cherry. ¿Cuántos m² son de tomates cherry?`, u: "m²" },
  ],
};

// m6.frcomp
S.FC = {
  q: (a, b) => `¿Qué signo va en el hueco? <b>${a} ☐ ${b}</b>`,
  den: res => `Tienen el mismo denominador (trozos iguales): es mayor la de mayor numerador. <b>${res}</b>`,
  num: res => `Tienen el mismo numerador: es mayor la de menor denominador, porque sus trozos son más grandes. <b>${res}</b>`,
  mitad: (f, h, n, menos) => `${f}: la mitad de su denominador es ${h}, y ${n} es ${menos ? "menos" : "más"}, así que ${f} es ${menos ? "menor" : "mayor"} que 1/2.`,
  mitad_fin: res => `Con el truco de la mitad, sin cuentas: <b>${res}</b>`,
  mcm: (b, d, m, f1, e1, k1, f2, e2, k2, n1, n2, res) => `Busco el mismo denominador: m.c.m.(${b}, ${d}) = ${m}. ${k1 === 1 ? `${f1} ya tiene denominador ${m}` : `${f1} = ${e1} (multiplico arriba y abajo por ${k1})`} y ${k2 === 1 ? `${f2} ya lo tiene` : `${f2} = ${e2} (${k1 === 1 ? "multiplico arriba y abajo" : ""}por ${k2})`}. Comparo los numeradores, ${n1} y ${n2}: <b>${res}</b>`,
};

// m6.frprob
const DEN6 = { 2: ["medio", "medios"], 3: ["tercio", "tercios"], 4: ["cuarto", "cuartos"], 5: ["quinto", "quintos"], 6: ["sexto", "sextos"], 7: ["séptimo", "séptimos"], 8: ["octavo", "octavos"], 9: ["noveno", "novenos"], 10: ["décimo", "décimos"] };
S.FP = {
  nom: (a, b) => `${a === 1 ? "1 " + DEN6[b][0] : a + " " + DEN6[b][1]}`,
  c1: [
    { q: (t, f1, f2) => `Una tableta de chocolate tiene ${t} onzas. Ana se come ${f1} y Leo, ${f2}.`, u: "onzas", nq: "¿Cuántas onzas quedan?", fq: "¿Qué fracción de la tableta queda?" },
    { q: (t, f1, f2) => `Tienes ${t} € de paga. Gastas ${f1} en un libro y ${f2} en el cine.`, u: "€", nq: "¿Cuántos euros te quedan?", fq: "¿Qué fracción de la paga te queda?" },
    { q: (t, f1, f2) => `Una ruta tiene ${t} km. El primer día recorres ${f1} y el segundo, ${f2}.`, u: "km", nq: "¿Cuántos kilómetros te faltan?", fq: "¿Qué fracción de la ruta te falta?" },
    { q: (t, f1, f2) => `En un álbum caben ${t} cromos. Pegas ${f1} en enero y ${f2} en febrero.`, u: "cromos", nq: "¿Cuántos cromos te faltan para llenarlo?", fq: "¿Qué fracción del álbum te falta?" },
  ],
  t1_s: (f1, t, b, a, x, f2, d, c, y, q, u) => `Las dos fracciones son del mismo total. ${f1} de ${t} = ${t} : ${b}${a > 1 ? ` × ${a}` : ""} = ${x} ${u}. ${f2} de ${t} = ${t} : ${d}${c > 1 ? ` × ${c}` : ""} = ${y} ${u}. Quedan ${t} − ${x} − ${y} = <b>${q}</b> ${u}.`,
  t1_f: (q, t, f, fs, irr) => `Quedan ${q} de ${t}: ${irr ? `<b>${f}</b>` : `${f} = <b>${fs}</b> (simplificando)`}.`,
  c2: [
    { q: (t, f1, f2) => `Tienes ${t} €. Gastas ${f1} en un cómic y ${f2} de lo que te queda en un balón. ¿Cuántos euros te quedan?`, u: "€", max: 120 },
    { q: (t, f1, f2) => `Un depósito tiene ${t} litros de agua. Se gasta ${f1} del agua y después ${f2} de lo que quedaba. ¿Cuántos litros quedan?`, u: "L", max: 900 },
    { q: (t, f1, f2) => `Un libro tiene ${t} páginas. Lees ${f1} el lunes y ${f2} de lo que te queda el martes. ¿Cuántas páginas te quedan por leer?`, u: "páginas", max: 360 },
  ],
  t2_s: (f1, t, b, a, x, r, f2, d, c, y, q, u) => `Primero, ${f1} del total: ${t} : ${b}${a > 1 ? ` × ${a}` : ""} = ${x} ${u}; quedan ${t} − ${x} = ${r} ${u}. Después, ${f2} <b>de lo que queda</b> (no del total): ${r} : ${d}${c > 1 ? ` × ${c}` : ""} = ${y} ${u}. Quedan ${r} − ${y} = <b>${q}</b> ${u}.`,
  c3: [
    { q: (f, p) => `En una ruta en bicicleta has recorrido ${f} del camino, que son ${p} km. ¿Cuántos kilómetros tiene la ruta?`, u: "km", max: 12 },
    { q: (f, p) => `Has pegado ${p} cromos, que son ${f} del álbum. ¿Cuántos cromos tiene el álbum completo?`, u: "cromos", max: 15 },
    { q: (f, p) => `Gastaste ${f} de tu paga y te quedan ${p} €. ¿Cuántos euros era la paga?`, u: "€", max: 8, queda: true },
    { q: (f, p) => `Ya has leído ${f} de un libro y te faltan ${p} páginas. ¿Cuántas páginas tiene el libro?`, u: "páginas", max: 30, queda: true },
  ],
  t3_queda: (f, fq) => `Lo que conozco es lo que queda: 1 − ${f} = ${fq} del total. `,
  t3_s: (k, b, p, u, t, un, f, nk, n1, nb) => `${nk.replace(/^./, s => s.toUpperCase())} = ${p} ${un} → ${n1} = ${p} : ${k} = ${u} ${un} (divido entre el numerador) → los ${nb} = ${b} × ${u} = <b>${t}</b> ${un} (multiplico por el denominador). Compruebo: ${f} de ${t} = ${t} : ${b} × ${k} = ${p} ✔`,
};

// m6.decdiv
S.DD = {
  q: (D, n) => `Calcula <b>${D} : ${n}</b>.`,
  vasos_q: (d, D) => `¿Cuántos vasos de ${d} litros se llenan con ${D} litros de zumo?`,
  caso: ["La división no es exacta: pongo la coma en el cociente y sigo añadiendo ceros al resto.", "El dividendo tiene coma: pongo la coma en el cociente al bajar la primera cifra decimal.", "El divisor tiene coma: multiplico los dos por 10 o por 100 hasta quitársela."],
  mult: (kd, p, D, Dp, d, n) => `El divisor tiene ${kd} ${kd === 1 ? "cifra decimal" : "cifras decimales"}: multiplico los dos por ${p}: ${D} × ${p} = ${Dp} y ${d} × ${p} = ${n}. Ahora divido ${Dp} : ${n}:`,
  ds_ent: (ip, n, q, r) => `${ip} : ${n} = ${q}, resto ${r}.`,
  ds_cero: (ip, n) => `${ip} : ${n} no cabe: escribo 0 en el cociente.`,
  ds_paso: (first, isDec, dig, cur, n, qi, r) => `${isDec ? `Bajo el ${dig}${first ? " (la primera cifra decimal) y pongo la coma en el cociente" : ""}` : `${first ? "Pongo la coma en el cociente y añado" : "Añado"} un 0 al resto`}: ${cur} : ${n} = ${qi}, resto ${r}.`,
  fin: (D, n, q) => `${D} : ${n} = <b>${q}</b>.`,
};

// m6.fdp
S.FD = {
  fd_q: f => `Escribe ${f} como número decimal.`,
  fd_s: "Una fracción es una división: divido el numerador entre el denominador.",
  df_q: x => `Escribe <b>${x}</b> como fracción irreducible.`,
  uds: { 1: "décimas", 2: "centésimas", 3: "milésimas" },
  df_s: (x, w, u, f, g, fs) => `Leo el decimal en voz alta: ${x} son «${w} ${u}» = ${f}. ${g > 1 ? `Simplifico entre ${g}: <b>${fs}</b>.` : `No se puede simplificar: <b>${fs}</b>.`}`,
  vf: (f, a, b, x) => `${f} = ${a} : ${b} = ${x}`,
  pct: p => `${p} %`,
  vp: (p, x) => `${p} % = ${x}`,
  cmp_q: (mayor, list) => `¿Cuál es ${mayor ? "mayor" : "menor"}: <b>${list}</b>?`,
  cmp_s: (conv, ord, mayor, w) => `Paso todo a decimal: ${conv}. Orden: ${ord}. El ${mayor ? "mayor" : "menor"} es <b>${w}</b>.`,
};

// m6.redondeo
S.RD = {
  lugar: ["las unidades", "las décimas", "las centésimas"],
  q: (x, l) => `Redondea <b>${x}</b> a ${l}.`,
  ctx: [(x, l) => `El cronómetro marca ${x} segundos. Redondea a ${l}.`, (x, l) => `Una botella tiene ${x} litros de agua. Redondea a ${l}.`, (x, l) => `Un paquete pesa ${x} kg. Redondea a ${l}.`],
  s: (l, td, nd, res, unid) => `La cifra de ${l} es ${td}; miro la de su derecha, ${nd}: ${nd >= 5 ? (td === 9 ? "como es 5 o más, el 9 sube: se convierte en 10 y me llevo una a la izquierda, como en las sumas" : `como es 5 o más, el ${td} sube a ${td + 1}`) : `como es menor que 5, el ${td} se queda igual`}. Las cifras de su derecha desaparecen${unid ? " (y la coma también)" : ""}: <b>${res}</b>.`,
};

// m6.razon, m6.cuarto, m6.esprop
S.RA = {
  ctx: [
    { q: (a, b) => `En una cesta hay ${a} manzanas y ${b} peras. ¿Cuál es la razón entre manzanas y peras? (Escríbela como fracción irreducible.)`, inv_q: (r, n) => `En una frutería, la razón entre manzanas y peras es ${r}. Si hay ${n} peras, ¿cuántas manzanas hay?`, u1: "manzanas", u2: "peras", u1s: "manzana", u2s: "pera" },
    { q: (a, b) => `En una clase hay ${a} chicas y ${b} chicos. ¿Cuál es la razón entre chicas y chicos? (Escríbela como fracción irreducible.)`, inv_q: (r, n) => `En un campamento, la razón entre chicas y chicos es ${r}. Si hay ${n} chicos, ¿cuántas chicas hay?`, u1: "chicas", u2: "chicos", u1s: "chica", u2s: "chico" },
    { q: (a, b) => `En un refugio de animales hay ${a} gatos y ${b} perros. ¿Cuál es la razón entre gatos y perros? (Escríbela como fracción irreducible.)`, inv_q: (r, n) => `En un refugio, la razón entre gatos y perros es ${r}. Si hay ${n} perros, ¿cuántos gatos hay?`, u1: "gatos", u2: "perros", u1s: "gato", u2s: "perro" },
    { q: (a, b) => `En un estuche hay ${a} lápices y ${b} rotuladores. ¿Cuál es la razón entre lápices y rotuladores? (Escríbela como fracción irreducible.)`, inv_q: (r, n) => `En la clase de plástica, la razón entre lápices y rotuladores es ${r}. Si hay ${n} rotuladores, ¿cuántos lápices hay?`, u1: "lápices", u2: "rotuladores", u1s: "lápiz", u2s: "rotulador" },
    { q: (a, b) => `Para una limonada se mezclan ${a} vasos de zumo y ${b} vasos de agua. ¿Cuál es la razón entre zumo y agua? (Escríbela como fracción irreducible.)`, inv_q: (r, n) => `En una limonada, la razón entre vasos de zumo y vasos de agua es ${r}. Si usas ${n} vasos de agua, ¿cuántos de zumo necesitas?`, u1: "vasos de zumo", u2: "de agua", u1s: "vaso de zumo", u2s: "de agua", max: 12 },
  ],
  s: (a, b, fab, g, fr, ra, rb, C) => (g > 1 ? `Razón = ${a} : ${b} = ${fab}. Simplifico entre ${g}: <b>${fr}</b>.` : `Razón = ${a} : ${b} = <b>${fab}</b> (ya es irreducible).`) + ` Por cada ${ra === 1 ? C.u1s : ra + " " + C.u1} hay ${rb === 1 ? "1 " + C.u2s : rb + " " + C.u2}.`,
  inv_s: (n, rb, k, ra, x, u1, u2) => `Por cada ${rb} ${u2} hay ${ra} ${u1}. ${n} es ${k} veces ${rb} (${n} : ${rb} = ${k}), así que hay ${k} × ${ra} = <b>${x}</b> ${u1}.`,
};
S.CU = {
  q: (f1, f2) => `Calcula x en la proporción ${f1} = ${f2}.`,
  s: (part, o0, o1, prod, ans, other, k, first) => `Los productos cruzados son iguales: x × ${part} = ${o0} × ${o1} = ${prod}, así que x = ${prod} : ${part} = <b>${ans}</b>. ${first ? `(También: de la primera razón a la segunda se multiplica por ${k}, así que x = ${other} : ${k} = ${ans}.)` : `(También: de la primera razón a la segunda se multiplica por ${k}: x = ${other} × ${k} = ${ans}.)`}`,
  p_q: (f1, f2) => `¿Forman proporción las razones ${f1} y ${f2}?`,
  p_s: (a, d, b, c, ad, bc, yes) => `Productos cruzados: ${a} × ${d} = ${ad} y ${b} × ${c} = ${bc}. ${yes ? "Son iguales: <b>sí</b> forman proporción." : "Son distintos: <b>no</b> forman proporción."}`,
  sino: ["Sí", "No"],
};

// m6.directa, m6.inversa, m6.prtipo, m6.prtabla
S.DI = {
  ctx: [
    { q: (a, A, b) => `${a} cuadernos iguales cuestan ${A} €. ¿Cuánto cuestan ${b} cuadernos?`, eur: true, u: [50, 300], u1: "cuaderno", uu: " €", mas: "más cuadernos → más dinero" },
    { q: (a, A, b) => `${a} kg de naranjas cuestan ${A} €. ¿Cuánto cuestan ${b} kg?`, eur: true, u: [120, 350], u1: "kilo", uu: " €", mas: "más kilos → más dinero" },
    { q: (a, A, b) => `${a} entradas de cine cuestan ${A} €. ¿Cuánto cuestan ${b} entradas?`, eur: true, u: [400, 900], u1: "entrada", uu: " €", mas: "más entradas → más dinero" },
    { q: (a, A, b) => `Una impresora imprime ${A} páginas en ${a} minutos. ¿Cuántas páginas imprime en ${b} minutos?`, u: [8, 30], u1: "minuto", uu: " páginas", mas: "más minutos → más páginas" },
    { q: (a, A, b) => `Para ${a} personas se usan ${A} g de harina. ¿Cuántos gramos hacen falta para ${b} personas?`, u: [40, 120], u1: "persona", uu: " g", mas: "más personas → más harina" },
  ],
  s: (mas, b, fA, bA, a, fr, u1, fu, uu) => `Directa: ${mas}. En cruz: x = ${b} × ${fA} : ${a} = ${bA} : ${a} = <b>${fr}${uu}</b>. (O reduciendo a la unidad: 1 ${u1} → ${fA} : ${a} = ${fu}${uu}; ${b} → ${b} × ${fu} = ${fr}${uu}.)`,
};
S.IN = {
  ctx: [
    { q: (a, A, b) => `${a} pintores tardan ${A} días en pintar un colegio. ¿Cuántos días tardarían ${b} pintores?`, a: [2, 8], A: [2, 12], mas: m => m ? "más pintores → menos días" : "menos pintores → más días", prod: "jornadas de trabajo", u: "días" },
    { q: (a, A, b) => `Con ${a} ${a === 1 ? "grifo" : "grifos iguales"} un depósito se llena en ${A} horas. ¿Cuántas horas tardaría con ${b} ${b === 1 ? "grifo" : "grifos"}?`, a: [1, 6], A: [2, 12], half: true, horas: true, mas: m => m ? "más grifos → menos tiempo" : "menos grifos → más tiempo", prod: "horas de grifo", u: "horas" },
    { q: (a, A, b) => `Yendo a ${a} km/h, un viaje dura ${A} ${A === 1 ? "hora" : "horas"}. ¿Cuántas horas duraría yendo a ${b} km/h?`, v: [40, 50, 60, 70, 80, 90, 100, 120], A: [1, 6], half: true, horas: true, mas: m => m ? "más velocidad → menos tiempo" : "menos velocidad → más tiempo", prod: "km de viaje", u: "horas" },
    { q: (a, A, b) => `Un premio se reparte a partes iguales entre ${a} amigos y cada uno recibe ${A} €. ¿Cuánto recibiría cada uno si fueran ${b} amigos?`, a: [2, 8], A: [6, 60], half: true, money: true, mas: m => m ? "más amigos → menos dinero para cada uno" : "menos amigos → más dinero para cada uno", prod: "€ del premio", u: "€" },
    { q: (a, A, b) => `En un refugio hay comida para que ${a} personas coman ${A} días. ¿Para cuántos días habría si fueran ${b} personas?`, a: [2, 10], A: [3, 20], mas: m => m ? "más personas → menos días" : "menos personas → más días", prod: "raciones de comida", u: "días" },
  ],
  hmed: (u, h) => ` ${u} (${h} h y 30 min)`,
  s: (mas, a, A, P, prod, b, r) => `Inversa: ${mas}. El producto se mantiene: ${a} × ${A} = ${P} (${prod}). Con ${b}: ${P} : ${b} = <b>${r}</b>.`,
};
S.PT = {
  q: s => `¿Qué relación hay entre estas magnitudes?<br><i>${s}</i>`,
  tipos: ["Directamente proporcionales", "Inversamente proporcionales", "No son proporcionales"],
  items: [
    ["El número de entradas compradas y el precio total", 0], ["Los kilos de pan y lo que cuestan", 0], ["El tiempo y la distancia que recorre un tren que va siempre a la misma velocidad", 0],
    ["El lado de un cuadrado y su perímetro", 0], ["Los litros de pintura y los metros cuadrados pintados", 0], ["Las personas que van a una comida y los bocadillos que hay que preparar", 0],
    ["El número de pintores y los días que tardan en pintar un colegio", 1], ["La velocidad de un coche y el tiempo que tarda en un viaje", 1],
    ["El número de personas que se reparten un premio y lo que recibe cada una", 1], ["Los litros que echa un grifo cada minuto y el tiempo que tarda en llenar una bañera", 1],
    ["La edad de una persona y su altura", 2], ["El lado de un cuadrado y su área", 2], ["El número de pie y la edad", 2], ["La temperatura y la hora del día", 2],
  ],
  s: [
    "Si una se hace el doble, la otra también se hace el doble: son <b>directamente proporcionales</b>.",
    "Si una se hace el doble, la otra se queda en la mitad: son <b>inversamente proporcionales</b>.",
    "Están relacionadas, pero al doble de una no le corresponde ni el doble ni la mitad de la otra: <b>no son proporcionales</b>.",
  ],
};
S.TB = {
  dir: [["Entradas", "Precio (€)"], ["Horas", "Kilómetros"], ["Paquetes", "Galletas"], ["Cajas", "Lápices"]],
  inv: [["Pintores", "Días"], ["Grifos", "Horas"], ["Amigos", "€ para cada uno"]],
  dir_q: "Las dos magnitudes son <b>directamente</b> proporcionales. ¿Qué número va en el hueco?",
  inv_q: "Las dos magnitudes son <b>inversamente</b> proporcionales. ¿Qué número va en el hueco?",
  dir_s: (yj, xj, k, xh, yh) => `Directa: el cociente es siempre el mismo, ${yj} : ${xj} = ${k}. El hueco vale ${xh} × ${k} = <b>${yh}</b>.`,
  inv_s: (xj, yj, P, xh, yh) => `Inversa: el producto es siempre el mismo, ${xj} × ${yj} = ${P}. El hueco vale ${P} : ${xh} = <b>${yh}</b>.`,
};

// m6.aumento y m6.original
S.AU = {
  objs: [["una mochila", 20, 60], ["unas zapatillas", 30, 90], ["un balón", 10, 40], ["una camiseta", 10, 30], ["un videojuego", 30, 70], ["unos auriculares", 20, 80], ["una bici", 100, 300], ["un patinete", 80, 250]],
  desc_q: (obj, P, p) => `${may(obj)} ${/^un(o|a)s /.test(obj) ? "cuestan" : "cuesta"} ${P} € y ${/^un(o|a)s /.test(obj) ? "tienen" : "tiene"} un ${p} % de descuento. ¿Cuánto pagas?`,
  desc_s: (p, q, pc, P, r, dsc) => `Con un ${p} % de descuento pagas el 100 − ${p} = ${q} % del precio: ${pc} × ${P} = <b>${r} €</b>. (O bien: el ${p} % de ${P} son ${dsc} €, y ${P} − ${dsc} = ${r} €.)`,
  subidas: [["el abono de la piscina", 20, 60], ["la entrada del cine", 6, 12], ["la cuota del club de fútbol", 20, 50], ["el alquiler de una bici por un día", 8, 20], ["la excursión de fin de curso", 20, 40]],
  aum_q: (obj, P, p) => `${may(obj)} costaba ${P} € y sube un ${p} %. ¿Cuánto cuesta ahora?`,
  aum_s: (p, q, pc, P, r, i) => `Si sube un ${p} %, pagas el 100 + ${p} = ${q} % de lo que costaba: ${pc} × ${P} = <b>${r} €</b>. (O bien: el ${p} % de ${P} son ${i} €, y ${P} + ${i} = ${r} €.)`,
  iva: [["una bici", 21, 120, 400], ["un patinete", 21, 80, 300], ["unos auriculares", 21, 20, 90], ["una consola", 21, 150, 400], ["una mochila", 21, 20, 60], ["un libro", 4, 10, 30], ["la comida en un restaurante", 10, 20, 80]],
  iva_no: (P, p) => (P === 150 || P === 200) && p === 21,   // los precios de la lección
  iva_q: (obj, P, p) => `${may(obj)} ${/^un(o|a)s /.test(obj) ? "cuestan" : "cuesta"} ${P} € sin IVA. Con un IVA del ${p} %, ¿cuánto se paga?`,
  iva_s: (p, pc, P, i, r, pct) => `El IVA es un aumento: el ${p} % de ${P} es ${pc} × ${P} = ${i} €. Total: ${P} + ${i} = <b>${r} €</b>. (O bien: ${pct} × ${P} = ${r} €.)`,
};
S.OR = {
  objs: ["un libro", "un juego de mesa", "una camiseta", "unas zapatillas", "una mochila", "un balón"],
  q: (pay, obj, p) => `Pagué ${pay} € por ${obj} que tenía${/^un(o|a)s /.test(obj) ? "n" : ""} un ${p} % de descuento. ¿Cuánto costaba antes de la rebaja?`,
  s10: (p, q, pay, k, d10, O, dsc) => `Pagué el 100 − ${p} = ${q} % del precio: ${pay} € son el ${q} %. El 10 % es ${pay} : ${k} = ${d10} €, y el 100 % es 10 × ${d10} = <b>${O} €</b>. Compruebo: el ${p} % de ${O} son ${dsc} €, y ${O} − ${dsc} = ${pay} € ✔`,
  s25: (pay, q4, O, dsc) => `Pagué el 100 − 25 = 75 %, es decir, tres cuartas partes del precio. Una cuarta parte (el 25 %) es ${pay} : 3 = ${q4} €, y el precio entero, 4 × ${q4} = <b>${O} €</b>. Compruebo: ${O} − ${dsc} = ${pay} € ✔`,
  s75: (pay, O, dsc) => `Pagué el 100 − 75 = 25 %, es decir, la cuarta parte del precio: el precio entero es 4 × ${pay} = <b>${O} €</b>. Compruebo: el 75 % de ${O} son ${dsc} €, y ${O} − ${dsc} = ${pay} € ✔`,
};

// m6.dinero
S.DN = {
  pc: (p, P, v, k, d) => k ? `${p} % de ${P} = ${k === 2 ? "la mitad" : k === 4 ? "la cuarta parte" : k === 5 ? "la quinta parte" : "la décima parte"}: ${P} : ${k} = ${v} €` : `${p} % de ${P} = ${d} × ${P} = ${v} €`,
  para: ["regalos", "cromos", "el cine", "chucherías"],
  aho_q: (P, a) => `Recibes ${P} € de paga al mes y decides ahorrar el ${a} % nada más recibirla. ¿Cuántos euros ahorras al mes?`,
  pre_q: (P, a, o, c) => `Tu paga es de ${P} € al mes. Primero ahorras el ${a} % y después gastas el ${o} % en ocio. ¿Cuántos euros te quedan para ${c}?`,
  pre_s: (sa, so, P, va, vo, vr, rest, a, o) => `Ahorro: ${sa}. Ocio: ${so}. Te quedan ${P} − ${va} − ${vo} = <b>${vr} €</b> (el 100 − ${a} − ${o} = ${rest} % de la paga).`,
  objs: [["un balón", 15, 35], ["unos patines", 30, 70], ["un juego de mesa", 18, 45], ["unos auriculares", 20, 60], ["un libro", 12, 25]],
  plan_q: (o, C, h, s) => `Quieres comprar ${o} de ${C} €. ${h ? `Ya tienes ${h} € en la hucha y ahorras` : "Ahorras"} ${s} € cada semana. ¿Cuántas semanas necesitas para reunir el dinero?`,
  falta: (C, h, F) => `Te faltan ${C} − ${h} = ${F} €. `,
  plan_s: (F, s, q, r, qs, q1) => `${F} : ${s} = ${q} y ${r === 1 ? "sobra 1" : `sobran ${r}`}: en ${q} semanas tendrías ${q} × ${s} = ${qs} €, y no llega. Necesitas una semana más: <b>${q1} semanas</b>.`,
  plan_ok: (F, s, q) => `${F} : ${s} = <b>${q} semanas</b> (${q} × ${s} = ${F} €, justo).`,
  envases: [["café", [250, 500], 8, 16], ["arroz", [500, 1000], 1, 3], ["galletas", [200, 400, 500], 4, 9], ["cereales", [375, 500, 750], 3, 7], ["queso", [250, 400, 500], 9, 16]],
  ab: ["A", "B"],
  uni_q: (o, ga, pa, gb, pb) => `${o.replace(/^./, s => s.toUpperCase())}: el envase A, de ${ga} g, cuesta ${pa} €, y el envase B, de ${gb} g, cuesta ${pb} €. ¿Cuál sale más barato por kilo?`,
  uni_s: (L, g, k, p, m, pm, km, u) => g === 1000 ? `${L}: 1000 g = 1 kg → <b>${u} € el kilo</b>.` : `${L}: ${g} g = ${k} kg → ${p} : ${k}; multiplico los dos por ${m}: ${pm} : ${km} = <b>${u} € el kilo</b>.`,
  uni_fin: (w, d) => `Sale más barato el <b>${w}</b>: ahorras ${d} € en cada kilo.`,
  int_q: (C, r, n) => `Guardas ${C} € en una cuenta de ahorro que da un ${r} % de interés al año. ¿Cuántos euros de intereses te da el banco en ${n === 1 ? "un año" : n + " años"}, si cada año te da lo mismo?`,
  int_s: (r, C, d, i, n, t, tot) => `Intereses de un año: ${r} % de ${C} = ${d} × ${C} = ${n > 1 ? `${i} €. En ${n} años: ${n} × ${i} = <b>${t} €</b>.` : `<b>${i} €</b>.`} Tendrás ${tot} €.`,
};

// m6.horario
S.HO = {
  f: ["Horas", "Minutos"],
  dur: (h, m) => h ? `${h} h ${m} min` : `${m} min`,
  ctx: [(s, d) => `Un tren sale a las ${s} y el viaje dura ${d}. ¿A qué hora llega?`, (s, d) => `Una película empieza a las ${s} y dura ${d}. ¿A qué hora termina?`,
    (s, d) => `Sales de casa a las ${s} y tardas ${d} en llegar a casa de tus abuelos. ¿A qué hora llegas?`, (s, d) => `Un partido empieza a las ${s} y dura ${d} con el descanso. ¿A qué hora acaba?`],
  mas_h: (s, h, r) => `${s} + ${h} h = ${r}.`,
  mas_m: (s, m, r) => `${s} + ${m} min = <b>${r}</b>.`,
  mas_m_c: (s, m, h, mm, mr, r) => `${s} + ${m} min = ${h} h ${mm} min, y ${mm} min = 1 h ${mr} min: <b>${r}</b>.`,
  dec_q: x => `¿Cuántos minutos son <b>${x} h</b>?`,
  dec_s: (x, w, wm, f, fm, r) => `${w ? `${w} h = ${w} × 60 = ${wm} min. ` : ""}${f === 0.5 ? "0,5 h es media hora" : f === 0.25 ? "0,25 h es un cuarto de hora" : "0,75 h son tres cuartos de hora"}: ${w ? `${fm} min. En total, ${wm} + ${fm} = <b>${r} min</b>.` : `<b>${r} min</b>.`}${f === 0.5 ? ` (¡No son ${w ? w + " h " : ""}50 min!)` : ""}`,
  r24_q: s => `¿Cómo se escriben ${s} en el reloj de 24 horas?`,
  dice: { m: (h, m) => `las ${h}:${m} de la mañana`, t: (h, m) => `las ${h}:${m} de la tarde`, n: (h, m) => `las ${h}:${m} de la noche`, md: (h, m) => `las 12:${m} del mediodía`, mn: (h, m) => `las 12:${m} de la noche`},
  r24_s: {
    m: g => `Por la mañana, la hora no cambia: <b>${g}</b>.`,
    t: g => `Por la tarde se suman 12 a las horas: <b>${g}</b>.`,
    n: g => `Por la noche se suman 12 a las horas: <b>${g}</b>.`,
    md: g => `Las 12 del mediodía siguen siendo las 12: <b>${g}</b>. (Solo se suma 12 desde la una de la tarde.)`,
    mn: g => `A medianoche el reloj vuelve a empezar desde 0: <b>${g}</b>. (Las «24:…» no existen.)`,
  },
};

// m6.compleja
S.CX = {
  u: { m: "metros", kg: "kilos", L: "litros" },
  q: (m, u) => `Expresa <b>${m}</b> en ${u}.`,
  p: (a, op, v, u) => `${a} = ${op} = ${v} ${u}`,
  s: (parts, vals, r, u) => `Paso cada parte a ${u}: ${parts.join("; ")}. Sumo: ${vals.join(" + ")} = <b>${r} ${u}</b>.`,
};

// m6.volumen y m6.capvol
S.VO = {
  cajas: ["una caja de zapatos", "un estuche", "una caja de galletas", "un cajón", "una caja de cereales"],
  caja_q: (o, a, b, c) => `¿Cuál es el volumen de ${o} que mide ${a} cm de largo, ${b} cm de ancho y ${c} cm de alto? (en cm³)`,
  orto_s: (m, u) => `Volumen de una caja = largo × ancho × alto = ${m} <b>${u}</b>.`,
  cubo_q: a => `¿Cuál es el volumen de un cubo de ${a} cm de arista? (en cm³)`,
  cubo_s: (a, aa, v) => `Volumen del cubo = arista × arista × arista = ${a} × ${a} × ${a} = ${aa} × ${a} = <b>${v} cm³</b>.`,
  sitios: [["una habitación", [2.5, 3, 2.4]], ["un trastero", [2, 2.5]], ["un aula pequeña", [3, 2.5]], ["una piscina", [1.5, 2]], ["una piscina hinchable", [0.5, 1]]],
  hab_q: (s, a, b, c) => `${s.replace(/^./, x => x.toUpperCase())} mide ${a} m de largo, ${b} m de ancho y ${c} m de alto. ¿Cuál es su volumen? (en m³)`,
  cv_q: (x, a, b) => `Pasa <b>${x} ${a}</b> a ${b}.`,
  cv_s: (a, b, up, x, r) => `En volumen, cada peldaño de la escalera vale × 1000 (1 dm³ = 1000 cm³, 1 m³ = 1000 dm³). De ${a} a ${b} se ${up ? "sube un peldaño: se divide entre 1000" : "baja un peldaño: se multiplica por 1000"}. ${x} ${up ? ":" : "×"} 1000 = <b>${r} ${b}</b>.`,
};
S.CV = {
  recip: ["un acuario", "una pecera", "una caja de plástico", "un cubo de fregar rectangular"],
  acu_q: (o, a, b, c) => `${o.replace(/^./, x => x.toUpperCase())} mide ${a} cm de largo, ${b} cm de ancho y ${c} cm de alto. ¿Cuántos litros de agua caben?`,
  acu_s: (a, b, c, da, db, dc, m, v) => `Como 1 dm³ = 1 L, paso las medidas a dm: ${a} cm = ${da} dm, ${b} cm = ${db} dm, ${c} cm = ${dc} dm. Volumen = ${m} dm³ = <b>${v} L</b>.`,
  peq: ["una jeringa", "un vasito dosificador", "un frasco de perfume", "un tubo de ensayo"],
  ml_q: (o, x) => `En ${o} caben ${x} cm³ de líquido. ¿Cuántos mililitros son?`,
  ml_s: x => `1 cm³ = 1 mL (mil cubitos de 1 cm³ llenan 1 dm³, que es 1 L = 1000 mL): ${x} cm³ = <b>${x} mL</b>.`,
  cml_q: x => `¿Cuántos litros son <b>${x} cm³</b>?`,
  cml_s: (x, r) => `1000 cm³ = 1 dm³ = 1 L, así que divido entre 1000: ${x} : 1000 = <b>${r} L</b>.`,
  gran: ["una piscina", "un depósito de agua", "una cisterna", "un estanque"],
  m3_q: (o, x) => `En ${o} caben ${x} m³ de agua. ¿Cuántos litros son?`,
  m3_s: (x, r) => `1 m³ = 1000 dm³ = 1000 L, así que multiplico por 1000: ${x} × 1000 = <b>${r} L</b>.`,
  dep_q: (a, b, c) => `Un depósito mide ${a} m × ${b} m × ${c} m. ¿Cuántos litros caben?`,
  dep_s: (m, v, l) => `Volumen = ${m} m³. Como 1 m³ = 1000 L: ${v} × 1000 = <b>${l} L</b>.`,
};

// m6.poligono
S.PO = {
  nom: { 4: "cuadrilátero (4 lados)", 5: "pentágono (5 lados)", 6: "hexágono (6 lados)", 7: "heptágono (7 lados)", 8: "octógono (8 lados)", 9: "polígono de 9 lados", 10: "decágono (10 lados)", 11: "polígono de 11 lados", 12: "dodecágono (12 lados)" },
  nomReg: { 3: "triángulo equilátero", 4: "cuadrado", 5: "pentágono regular (5 lados)", 6: "hexágono regular (6 lados)", 8: "octógono regular (8 lados)", 9: "polígono regular de 9 lados", 12: "dodecágono regular (12 lados)" },
  suma_q: nm => `¿Cuánto suman los ángulos de un ${nm}, en grados?`,
  suma_s: (n, t, s, bold) => `Desde un vértice, el polígono se divide en ${n} − 2 = ${t} ${t === 1 ? "triángulo" : "triángulos"}, y cada uno aporta 180°: ${t} × 180° = ${bold ? `<b>${s}°</b>` : `${s}°`}.`,
  reg_q: nm => `¿Cuánto mide cada ángulo de un ${nm}, en grados? (Todos sus ángulos son iguales.)`,
  reg_s: (n, s, a) => `Los ${n} ángulos son iguales: ${s}° : ${n} = <b>${a}°</b>.`,
  inv_q: s => `Los ángulos de un polígono suman ${s}°. ¿Cuántos lados tiene?`,
  inv_s: (s, t, n) => `Cada triángulo aporta 180°: ${s} : 180 = ${t} triángulos. El polígono tiene dos lados más que triángulos: ${t} + 2 = <b>${n}</b> lados.`,
};

// m6.romboide, m6.compuesta, m6.regular
S.AR = {
  q: f => `Calcula el área de ${f} (en cm²).`,
  fig: ["este romboide", "este rombo", "esta figura"],
  romb_s: (b, h, r, side) => `Área del romboide = base × altura = ${b} × ${h} = <b>${r} cm²</b>. (¡La altura, no el lado inclinado de ${side} cm!)`,
  rombo_s: (D, d, Dd, r) => `Área del rombo = diagonal mayor × diagonal menor : 2 = ${D} × ${d} : 2 = ${Dd} : 2 = <b>${r} cm²</b>.`,
  comp_s: (W, w1, H1, a1, w, h2, a2, r) => `La parto en dos rectángulos. El de la izquierda: ${w1} × ${H1} = ${a1} cm². El de la derecha tiene de ancho ${W} − ${w1} = ${w} cm y de alto ${h2} cm: ${w} × ${h2} = ${a2} cm². Total: ${a1} + ${a2} = <b>${r} cm²</b>.`,
  nreg: { 5: "pentágono", 6: "hexágono", 8: "octógono" },
  reg_q: nm => `Calcula el área de este ${nm} regular (en cm²).`,
  reg_s: (n, l, p, a, pa, r) => `Perímetro = ${n} × ${l} = ${p} cm. Área = perímetro × apotema : 2 = ${p} × ${a} : 2 = ${pa} : 2 = <b>${r} cm²</b>.`,
};

// m6.ciarea y m6.radio
S.CI = {
  objs: [["un plato", 9, 14], ["una pizza", 12, 20], ["una mesa redonda", 40, 70], ["un reloj de pared", 10, 20], ["una alfombra redonda", 50, 100], ["un posavasos", 4, 6]],
  area_q: (obj, v, isD) => `${may(obj)} tiene ${v} cm de ${isD ? "diámetro" : "radio"}. ¿Cuál es su área, en cm²? (Usa π = 3,14.)`,
  rad: (D, r) => `El radio es la mitad del diámetro: ${D} : 2 = ${r} cm. `,
  area_s: (r, rr, A) => `Área = π × radio × radio = 3,14 × ${r} × ${r} = 3,14 × ${rr} = <b>${A} cm²</b>.`,
  rad_q: (obj, L) => `El borde de ${obj} mide ${L} cm. ¿Cuánto mide su radio, en cm? (Usa π = 3,14.)`,
  rad_s: (L, L100, r) => `La longitud es L = 2 × 3,14 × radio = 6,28 × radio. Para hallar el radio, deshago la multiplicación: ${L} : 6,28. Multiplico los dos por 100 para quitar la coma del divisor: ${L100} : 628 = <b>${r} cm</b>.`,
  diam_q: (obj, L) => `El borde de ${obj} mide ${L} cm. ¿Cuánto mide su diámetro, en cm? (Usa π = 3,14.)`,
  diam_s: (L, L100, d) => `La longitud es L = 3,14 × diámetro. Deshago la multiplicación: ${L} : 3,14. Multiplico los dos por 100: ${L100} : 314 = <b>${d} cm</b>.`,
};

// m6.coordenadas
S.CO = {
  q: "¿Cuáles son las coordenadas del punto P? Escribe primero la x y después la y.",
  hor: x => x > 0 ? `${x} a la derecha` : x < 0 ? `${-x} a la izquierda` : "nada en horizontal",
  ver: y => y > 0 ? `${y} hacia arriba` : y < 0 ? `${-y} hacia abajo` : "nada en vertical",
  s: (x, y, hx, vy) => `Desde el origen (0, 0): primero la x (cuánto a la derecha o a la izquierda) y después la y (cuánto arriba o abajo). P = <b>(${x}, ${y})</b>: ${hx} y ${vy}.`,
};

// m6.redondos
S.RE = {
  cuerpos: ["Un cilindro", "Un cono", "Una esfera"], prisma: "Un prisma",
  figs: ["un rectángulo que gira sobre uno de sus lados", "un triángulo rectángulo que gira sobre uno de los lados del ángulo recto", "un semicírculo que gira sobre su diámetro"],
  figsC: ["Un rectángulo", "Un triángulo rectángulo", "Un semicírculo"], circ: "Un cuadrado",
  gen_q: f => `¿Qué cuerpo se forma con ${f}?`,
  fig_q: c => `¿Qué figura plana, al girar alrededor de un eje, forma ${c.toLowerCase()}?`,
  gen_s: ["Un rectángulo que gira sobre un lado forma un <b>cilindro</b>: el lado del eje es la altura y el otro lado, el radio de las bases.",
    "Un triángulo rectángulo que gira sobre un cateto (un lado del ángulo recto) forma un <b>cono</b>: ese cateto es la altura, el otro es el radio de la base y el lado inclinado, la generatriz.",
    "Un semicírculo que gira sobre su diámetro forma una <b>esfera</b>, con el mismo radio que el semicírculo."],
  f: ["Radio de la base (cm)", "Altura (cm)"],
  med_q: (tri, a, b) => tri ? `Un triángulo rectángulo tiene catetos (los lados del ángulo recto) de ${a} cm y ${b} cm. Gira sobre el cateto de ${b} cm y forma un cono. ¿Cuánto miden el radio de su base y su altura?` : `Un rectángulo de ${a} cm × ${b} cm gira sobre el lado de ${b} cm y forma un cilindro. ¿Cuánto miden el radio de sus bases y su altura?`,
  med_s: (tri, a, b) => `El lado sobre el que gira (${b} cm) es el eje: es la <b>altura</b> del ${tri ? "cono" : "cilindro"}. El otro ${tri ? "cateto" : "lado"} (${a} cm) da la vuelta alrededor y dibuja el borde de la base: es el <b>radio</b>. Radio ${a} cm, altura ${b} cm.`,
  botes: ["un bote de tomate", "una lata de refresco", "un tubo de patatas fritas", "un bote de lápices", "una vela cilíndrica"],
  eti_q: (o, x, diam) => `La etiqueta de ${o} da una vuelta completa sin solaparse. Si tiene ${x} cm de ${diam ? "diámetro" : "radio"}, ¿cuántos centímetros mide de largo la etiqueta? (π = 3,14)`,
  eti_s: (r, L) => `El largo de la etiqueta es la longitud de la circunferencia de la base: L = 2 × π × r = 2 × 3,14 × ${r} = 6,28 × ${r} = <b>${L} cm</b>.`,
  eti_d: (d, L) => `El largo de la etiqueta es la longitud de la circunferencia de la base. Con el diámetro: L = π × d = 3,14 × ${d} = <b>${L} cm</b>.`,
  nom: ["La generatriz", "La altura", "El radio", "El vértice"],
  elem: [["En un cono, ¿cómo se llama el segmento que va del vértice al centro de la base?", 1], ["En un cilindro, ¿cómo se llama la distancia del centro de una base a su borde?", 2],
    ["En un cono, ¿cómo se llama el punto de arriba, donde acaba la superficie curva?", 3], ["En una esfera, ¿cómo se llama la distancia del centro a cualquier punto de la superficie?", 2],
    ["En un cilindro, ¿cómo se llama la distancia entre sus dos bases?", 1]],
  elem_s: ["Es la <b>generatriz</b>: va por la superficie, del vértice al borde de la base.", "Es la <b>altura</b>: va recta, perpendicular a la base (no por la superficie, como la generatriz).", "Es el <b>radio</b>.", "Es el <b>vértice</b> del cono."],
};

// m6.movimientos
S.MV = {
  tras_q: (x, y, dx, der, dy, arr) => `Traslada el punto P (${x}, ${y}) ${dx} ${dx === 1 ? "casilla" : "casillas"} hacia la ${der ? "derecha" : "izquierda"} y ${dy} hacia ${arr ? "arriba" : "abajo"}. ¿Cuáles son sus nuevas coordenadas?`,
  tras_s: (x, dx, nx, y, dy, ny) => `En horizontal cambia la x: ${x} ${dx > 0 ? "+" : "−"} ${Math.abs(dx)} = ${nx}. En vertical cambia la y: ${y} ${dy > 0 ? "+" : "−"} ${Math.abs(dy)} = ${ny}. Nuevo punto: <b>(${nx}, ${ny})</b>.`,
  sim_q: (x, y, vert, e) => `¿Cuál es el simétrico del punto P (${x}, ${y}) respecto del eje ${vert ? `vertical que pasa por el ${e} del eje horizontal` : `horizontal que pasa por el ${e} del eje vertical`} (la línea azul)?`,
  sim_s: (vert, e, p, d, antes, r, res) => `El punto está ${antes ? `${e} − ${p}` : `${p} − ${e}`} = ${d} ${d === 1 ? "casilla" : "casillas"} ${vert ? (antes ? "a la izquierda" : "a la derecha") : (antes ? "por debajo" : "por encima")} del eje. Su simétrico queda a la misma distancia, al otro lado: ${antes ? `${e} + ${d}` : `${e} − ${d}`} = ${r}. ${vert ? "La y no cambia" : "La x no cambia"}: <b>${res}</b>.`,
  giro_q: m => `¿Cuántos grados gira el minutero de un reloj en ${m} minutos?`,
  giro_s: (m, g) => `En 60 minutos da una vuelta entera, 360°: cada minuto gira 360 : 60 = 6°. En ${m} minutos, ${m} × 6 = <b>${g}°</b>.`,
};

// m6.media, m6.rango, m6.tipovar
S.ME = {
  ctx: [["Goles que ha marcado el equipo en cada partido", 0, 6, " goles"], ["Notas de los exámenes de Lucía", 4, 10, ""], ["Puntos de una jugadora de baloncesto en cada partido", 2, 24, " puntos"], ["Minutos que tarda Hugo en llegar al colegio cada día", 8, 25, " minutos"], ["Libros que ha leído cada alumno del grupo este trimestre", 0, 9, " libros"]],
  q: (c, d) => `${c}: <b>${d}</b>. ¿Cuál es la media?`,
  s: (sum, s, n, m, u) => `Sumo todos los datos: ${sum} = ${s}. Divido entre cuántos hay (${n}): ${s} : ${n} = <b>${m}</b>${u}.`,
};
S.RG = {
  ctx: [["Goles marcados en cada partido del recreo", 0, 8, " goles"], ["Notas de la clase en un examen", 1, 10, ""], ["Estaturas de un grupo de amigos, en cm", 128, 165, " cm"], ["Puntos de un equipo en cada partido", 10, 60, " puntos"]],
  q: (c, d) => `${c}: <b>${d}</b>. ¿Cuál es el rango?`,
  s: (mx, mn, r, u) => `El mayor es ${mx} y el menor, ${mn}: rango = ${mx} − ${mn} = <b>${r}</b>${u}.`,
  temp_q: d => `Temperaturas mínimas de una semana en un pueblo de montaña, en °C: <b>${d}</b>. ¿Cuál es el rango?`,
  temp_s: (mx, mn, amn, r) => `La más alta es ${mx} °C y la más baja, ${mn} °C. De ${mn} a 0 hay ${amn} grados y de 0 a ${mx}, otros ${mx}: rango = ${amn} + ${mx} = <b>${r}</b> grados.`,
};
S.TV = {
  q: v => `¿De qué tipo es la variable estadística <b>${v}</b>?`,
  tipos: ["Cualitativa (palabras)", "Cuantitativa (números)"],
  items: [["el color de pelo", 0], ["el deporte favorito", 0], ["el mes de nacimiento", 0], ["el país de nacimiento", 0], ["la fruta favorita", 0], ["el medio de transporte para ir al colegio", 0],
    ["el número de hermanos", 1], ["el número de libros leídos en un año", 1], ["la estatura", 1], ["el peso", 1], ["el número de goles en un partido", 1], ["el tiempo que se tarda en llegar al colegio", 1], ["la nota de un examen", 1]],
  s: ["Sus valores son palabras, no números: es <b>cualitativa</b>.", "Sus valores son números (se cuentan o se miden): es <b>cuantitativa</b>."],
};

// m6.frecuencia y m6.esperado
S.FR = {
  ctx: [["la fruta favorita", ["manzana", "plátano", "naranja", "fresa"]], ["el deporte favorito", ["fútbol", "baloncesto", "natación", "tenis"]],
    ["el número de hermanos", ["ninguno", "uno", "dos", "tres"]], ["la mascota", ["perro", "gato", "pez", "ninguna"]], ["el color favorito", ["azul", "rojo", "verde", "amarillo"]]],
  lista: (c, l) => `Se ha preguntado por ${c}. Estas son las respuestas: ${l}.`,
  tabla: (c, n, t) => `Se ha preguntado a ${n} personas por ${c}. Recuento: ${t}.`,
  abs_q: v => `¿Cuál es la frecuencia absoluta de «${v}»?`,
  abs_s: (v, f) => `La frecuencia absoluta es cuántas veces aparece: cuento las veces que sale «${v}»: <b>${f}</b>.`,
  rel_q: v => `¿Cuál es la frecuencia relativa de «${v}», en forma decimal?`,
  rel_s: (v, f, n, r) => `«${v}» aparece ${f === 1 ? "1 vez" : f + " veces"} de ${n}. Frecuencia relativa = frecuencia absoluta : total de datos = ${f} : ${n} = <b>${r}</b>.`,
  pc_q: v => `¿Qué porcentaje de las respuestas es «${v}»? (Escribe solo el número.)`,
  pc_s: (r, p) => `En porcentaje: ${r} × 100 = <b>${p} %</b>.`,
};
S.ES = {
  exps: [[N => `Lanzas una moneda ${N} veces`, 1, 2, "cara"], [N => `Lanzas un dado ${N} veces`, 1, 6, "un 6"], [N => `Lanzas un dado ${N} veces`, 1, 2, "un número par"],
    [N => `Haces girar ${N} veces una ruleta con 4 colores iguales`, 1, 4, "el rojo"], [N => `Sacas ${N} veces una bola de una bolsa con 2 rojas y 3 azules (y la vuelves a meter cada vez)`, 2, 5, "roja"],
    [N => `Lanzas un dado ${N} veces`, 1, 3, "un 1 o un 2"]].map(([a, n, d, w]) => [{ a, w }, n, d]),
  q: (e, N) => `${e.a(N)}. ¿Cuántas veces esperas que salga ${e.w}, más o menos?`,
  s: (p, n, d, N, r) => `Con la regla de Laplace, la probabilidad es ${p}: sale ${n === 1 ? "1" : n} de cada ${d} veces. En ${N} veces: ${N} : ${d}${n > 1 ? ` × ${n}` : ""} = <b>${r}</b>, más o menos. (Puede salir alguna vez más o menos; cuantas más veces lo hagas, más se acerca la frecuencia relativa a ${p}.)`,
  fr_q: (e, M, o) => `${e.a(M)}, y ${o} de esas veces sale ${e.w}. ¿Cuál es la frecuencia relativa de ese resultado, en forma decimal?`,
  fr_s: (o, M, r, p, pd) => `Frecuencia relativa = ${o} : ${M} = <b>${r}</b>. Es un número cercano a la probabilidad de Laplace, ${p} ≈ ${pd}: con más lanzamientos se acercaría todavía más.`,
};

// m6.casos y m6.suceso
S.CA = {
  q: e => `¿Cuántos resultados posibles tiene este experimento? <i>${e}</i>`,
  items: [["Lanzar una moneda.", 2, "cara y cruz"], ["Lanzar un dado.", 6, "1, 2, 3, 4, 5 y 6"], ["Lanzar dos monedas.", 4, "cara-cara, cara-cruz, cruz-cara y cruz-cruz"],
    ["Lanzar una moneda y un dado.", 12, "T2 filas (cara, cruz) y 6 columnas (del 1 al 6): 2 × 6"], ["Lanzar dos dados.", 36, "T6 filas (dado 1) y 6 columnas (dado 2): 6 × 6"],
    ["Elegir al azar un día de la semana.", 7, "los 7 días"], ["Elegir al azar un mes del año.", 12, "los 12 meses"], ["Girar una ruleta con 8 sectores iguales numerados del 1 al 8.", 8, "los números del 1 al 8"],
    ["Sacar al azar una vocal de una bolsa con las cinco vocales.", 5, "a, e, i, o, u"]],
  s: (n, how) => how[0] === "T" ? `Hago una tabla con ${how.slice(1)} = <b>${n}</b> casillas: cada casilla es un resultado posible.` : `Los resultados posibles son ${how}: <b>${n}</b>.`,
  bolas: [n => `Sacar una bola de una bolsa con ${n} bolas numeradas del 1 al ${n}.`, n => `Elegir al azar a un alumno de una clase de ${n}.`, n => `Sacar una tarjeta de un montón de ${n} tarjetas distintas.`],
  bolas_s: n => `Puede salir cualquiera de los ${n}: hay <b>${n}</b> resultados posibles.`,
};
S.SU = {
  q: s => `¿Cómo es este suceso? <i>${s}</i>`,
  tipos: ["Seguro", "Posible", "Imposible"],
  col: [["roja", "rojas"], ["azul", "azules"], ["verde", "verdes"], ["amarilla", "amarillas"]],
  bolsa: (a, c0, b, c1) => `una bolsa con ${a} ${a === 1 ? "bola " + c0[0] : "bolas " + c0[1]} y ${b} ${b === 1 ? "bola " + c1[0] : "bolas " + c1[1]}`,
  una: c => `una bola ${c[0]}`,
  oo: (c0, c1) => `una bola ${c0[0]} o ${c1[0]}`,
  saca: (bolsa, w) => `Sacar ${w} de ${bolsa}.`,
  bs: [
    (c0, c1) => `En la bolsa hay bolas ${c0[1]}, pero también ${c1[1]}: puede salir o no. Es un suceso <b>posible</b>.`,
    (c0, c1, c2) => `En la bolsa no hay ninguna bola ${c2[0]}: no puede salir nunca. Es un suceso <b>imposible</b>.`,
    (c0, c1) => `Todas las bolas son ${c0[1]} o ${c1[1]}: sale seguro. Es un suceso <b>seguro</b>.`,
  ],
  items: [
    ["Sacar un número menor que 7 al lanzar un dado.", 0], ["Que mañana salga el sol por el este.", 0], ["Sacar cara o cruz al lanzar una moneda.", 0],
    ["Sacar un 6 al lanzar un dado.", 1], ["Que llueva el próximo lunes.", 1], ["Sacar un número par al lanzar un dado.", 1],
    ["Sacar un 7 al lanzar un dado normal.", 2], ["Sacar cara y cruz a la vez con una sola moneda.", 2], ["Que un día tenga 25 horas.", 2],
  ],
  s: ["Ocurre siempre: es un suceso <b>seguro</b> (probabilidad 1).", "Puede ocurrir o no: es un suceso <b>posible</b> (probabilidad entre 0 y 1).", "No puede ocurrir nunca: es un suceso <b>imposible</b> (probabilidad 0)."],
};
})();
