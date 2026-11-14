/* WikiAula — textos de los generadores de Matemáticas, Grado 7 (gen/mat7.js), en español. */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
Object.assign(WA.I18N.es.gen, {
    posNames: ["unidades", "decenas", "centenas", "unidades de millar", "decenas de millar",
      "centenas de millar", "unidades de millón", "decenas de millón", "centenas de millón"],
    posName1: ["las unidades", "las decenas", "las centenas", "las unidades de millar",
      "las decenas de millar", "las centenas de millar", "las unidades de millón",
      "las decenas de millón", "las centenas de millón"],
    // Sistema decimal
    posicional_q: (n, d) => `En el número <b>${n}</b>, ¿qué valor tiene la cifra <b>${d}</b>?`,
    posicional_s: (d, pos, v) => `La cifra ${d} está en ${pos}, así que vale <b>${v}</b>.`,
    orden_q: (n, pos) => `¿Qué cifra ocupa el lugar de ${pos} en el número <b>${n}</b>?`,
    orden_s: (n, pos, d, walk) => `Contando desde la derecha: ${walk.map(([name, x], i) => i === walk.length - 1 ? `${name} <b>${x}</b>` : `${name} ${x}`).join(", ")}. La cifra de ${pos} de ${n} es el <b>${d}</b>.`,
    redondeo_q: (n, pos) => `Redondea <b>${n}</b> a ${pos}.`,
    redondeo_s: (look, up, r) => `Miramos la cifra siguiente a la derecha: es ${look}. ${up ? "Como es 5 o más, sumamos uno a la cifra que redondeamos" : "Como es menor que 5, la dejamos igual"} y las de su derecha pasan a ser ceros: <b>${r}</b>.`,
    descomp_q: e => `¿Qué número es <b>${e}</b>?`,
    descomp_s: (vals, sum, r, zeros, mixed) => {
      const y = a => a.length > 1 ? a.slice(0, -1).join(", ") + " ni " + a[a.length - 1] : a[0];
      return `Calculamos cada término: ${vals.join("; ")}.<br>${mixed ? "Los sumamos (ordenados de mayor a menor): " : "Los sumamos: "}${sum} = <b>${r}</b>.` +
        (zeros.length ? `<br>No hay ${y(zeros)}: en ${zeros.length > 1 ? "esos lugares" : "ese lugar"} va un 0.` : ""); },
    letras_q: w => `Escribe con cifras: <i>${w}</i>.`,
    letras_s: (groups, r) => `Separamos por clases: ${groups.map(x => x.w ? `«${x.w}» → ${x.g}` : `no se nombran ${["los millones", "los millares", "las unidades"][x.cls]} → ${x.g}`).join(" | ")}. Cada clase, salvo la primera, lleva tres cifras: se escribe <b>${r}</b>.`,
    // Operaciones
    division_q: (a, b) => `Haz la división <b>${a} : ${b}</b>.`,
    division_f: ["Cociente", "Resto"],
    division_s: (a, b, q, r) => `${a} = ${b} · ${q} + ${r}. El cociente es <b>${q}</b> y el resto <b>${r}</b> (el resto siempre es menor que el divisor).`,
    dividendo_q: (d, q, r) => `En una división el divisor es <b>${d}</b>, el cociente <b>${q}</b> y el resto <b>${r}</b>. ¿Cuál es el dividendo?`,
    dividendo_s: (d, q, r, D) => `Dividendo = divisor · cociente + resto = ${d} · ${q} + ${r} = <b>${D}</b>.`,
    distrib_q: e => `Calcula de la forma más rápida: <b>${e}</b>`,
    distrib_s: (a, b, c, s, r) => `Sacamos factor común ${a}: ${a} · (${b} + ${c}) = ${a} · ${s} = <b>${r}</b>.`,
    distrib_s2: (a, b, c, s, r) => `Sacamos factor común ${a}: ${a} · (${b} − ${c}) = ${a} · ${s} = <b>${r}</b>.`,
    problemas: [
      { q: (a, b, c) => `Un teatro tiene ${a} filas de ${b} butacas. Si quedan ${c} butacas vacías, ¿cuántas personas hay en el teatro?`,
        s: (a, b, c, r) => `Butacas: ${a} · ${b} = ${a * b}. Personas: ${a * b} − ${c} = <b>${r}</b>.`, f: (a, b, c) => a * b - c },
      { q: (a, b, c) => `Una panadería hace ${a} barras de pan al día y las reparte en bolsas de ${b}. ¿Cuántas bolsas llena en ${c} días?`,
        s: (a, b, c, r) => `En un día llena ${a} : ${b} = ${a / b} bolsas. En ${c} días: ${a / b} · ${c} = <b>${r}</b>.`, f: (a, b, c) => a / b * c, div: true },
      { q: (a, b, c) => `Lucía tiene ${a} €. Compra ${b} cuadernos de ${c} € cada uno. ¿Cuánto dinero le queda?`,
        s: (a, b, c, r) => `Gasta ${b} · ${c} = ${b * c} €. Le quedan ${a} − ${b * c} = <b>${r}</b> €.`, f: (a, b, c) => a - b * c, money: true },
      { q: (a, b, c) => `Un camión transporta ${a} cajas de ${b} botellas. En el camino se rompen ${c} botellas. ¿Cuántas botellas llegan enteras?`,
        s: (a, b, c, r) => `Botellas: ${a} · ${b} = ${a * b}. Enteras: ${a * b} − ${c} = <b>${r}</b>.`, f: (a, b, c) => a * b - c },
    ],
    // Jerarquía
    jer_q: e => `Calcula: <b>${e}</b>`,
    jer_s_intro: "Primero paréntesis y corchetes (de dentro hacia fuera), después potencias, luego multiplicaciones y divisiones y por último sumas y restas, cada piso de izquierda a derecha:",
    paren_q: (e, v) => `¿Dónde hay que poner los paréntesis para que <b>${e}</b> dé <b>${v}</b>?`,
    paren_none: "En ningún sitio: ya da ese resultado",
    paren_s: (e, v) => `${e} = <b>${v}</b>.`,
    paren_s_none: (steps, change, other) => `Sin paréntesis ya se multiplica primero: ${steps.map((s, i) => i === steps.length - 1 ? `<b>${s}</b>` : s).join(" = ")}. No hace falta ningún paréntesis: con ${change} saldría ${other}.`,
    // Potencias
    potvalor_q: p => `Calcula <b>${p}</b>.`,
    potvalor_s: (prod, r) => `${prod} = <b>${r}</b>.`,
    potpartes_q: (p, what) => `En la potencia <b>${p}</b>, ¿cuál es ${what === "b" ? "la base" : "el exponente"}?`,
    potpartes_s: (b, e) => `La base es el número que se repite como factor (${b}) y el exponente, cuántas veces se repite (${e}).`,
    potprod_q: e => `Escribe como una sola potencia: <b>${e}</b>`,
    potprod_s: (b, m, n, r) => `Con la misma base se suman los exponentes: ${b}<sup>${m}+${n}</sup> = <b>${r}</b>.`,
    potcoc_s: (b, m, n, r) => `Con la misma base se restan los exponentes: ${b}<sup>${m}−${n}</sup> = <b>${r}</b>.`,
    potpot_s: (b, m, n, r) => `En una potencia de una potencia se multiplican los exponentes: ${b}<sup>${m}·${n}</sup> = <b>${r}</b>.`,
    potdiez_q: e => `¿Qué número es <b>${e}</b>?`,
    potdiez_s: (k, r) => `10<sup>${k}</sup> es un 1 seguido de ${k} ceros, así que el resultado es <b>${r}</b>.`,
    potarea_q: (l) => `Un patio cuadrado mide ${l} m de lado. ¿Cuál es su área en m²?`,
    potarea_s: (l, r) => `Área del cuadrado = lado<sup>2</sup> = ${l}<sup>2</sup> = <b>${r}</b> m².`,
    potcubo_q: (l) => `Una caja con forma de cubo mide ${l} cm de arista. ¿Cuál es su volumen en cm³?`,
    potcubo_s: (l, r) => `Volumen del cubo = arista<sup>3</sup> = ${l}<sup>3</sup> = <b>${r}</b> cm³.`,
    // Raíces
    raiz_q: r => `Calcula <b>${r}</b>.`,
    raiz_s: (n, r) => `${r}<sup>2</sup> = ${n}, así que la raíz es <b>${r}</b>.`,
    raizent_q: r => `Calcula la raíz cuadrada entera de <b>${r}</b> y su resto.`,
    raizent_f: ["Raíz entera", "Resto"],
    raizent_s: (n, r, s) => `${r}<sup>2</sup> = ${r * r} ≤ ${n} &lt; ${(r + 1) * (r + 1)} = ${r + 1}<sup>2</sup>. La raíz entera es <b>${r}</b> y el resto ${n} − ${r * r} = <b>${s}</b>.`,
    raizentre_q: r => `<b>${r}</b> está entre dos números naturales consecutivos. ¿Cuáles?`,
    raizentre_f: ["Entre", "y"],
    raizentre_s: (n, a) => `${a}<sup>2</sup> = ${a * a} y ${a + 1}<sup>2</sup> = ${(a + 1) * (a + 1)}; como ${a * a} &lt; ${n} &lt; ${(a + 1) * (a + 1)}, la raíz está entre <b>${a}</b> y <b>${a + 1}</b>.`,
    raizlado_q: a => `Un huerto cuadrado tiene ${a} m² de área. ¿Cuánto mide su lado?`,
    raizlado_s: (a, l) => `El lado es la raíz cuadrada del área: √${a} = <b>${l}</b> m, porque ${l}<sup>2</sup> = ${a}.`,
    raizlado_t: (a, tant, l) => `El lado es la raíz cuadrada del área, √${a}.<br>${tant}<br>El lado mide <b>${l}</b> m.`,
    raiz_tant_dec: (r, n) => `Se sale de la tabla de cuadrados, pero es una decena justa: ${r}<sup>2</sup> = ${r} · ${r} = ${n}, así que la raíz es <b>${r}</b>.`,
    raiz_tant: (k, k2, K, K2, last, ends, cands, r, n) => {
      const tries = [];
      for (const c of cands) { tries.push(c === r ? `${c}<sup>2</sup> = ${n} ✓` : `${c}<sup>2</sup> = ${c * c}, no`); if (c === r) break; }
      return `Se sale de la tabla: tanteo con las decenas. ${k}<sup>2</sup> = ${k2} y ${K}<sup>2</sup> = ${K2}, así que la raíz está entre ${k} y ${K}. ` +
        `${n} acaba en ${last}, y solo dan cuadrados acabados en ${last} los números acabados en ${ends.join(" o en ")}` +
        `${cands.length > 1 ? `: candidatos ${cands.join(" y ")}` : `: el candidato es ${cands[0]}`}. Pruebo ${tries.join("; pruebo ")}. La raíz es <b>${r}</b>.`; },
    raizent_tant: (n, k, K, r, s) => `Tanteo con las decenas: ${k}<sup>2</sup> = ${k * k} ≤ ${n} &lt; ${K * K} = ${K}<sup>2</sup>, así que la raíz entera está entre ${k} y ${K}. ` +
      `Afino: ${r}<sup>2</sup> = ${r * r} cabe y ${r + 1}<sup>2</sup> = ${(r + 1) * (r + 1)} se pasa. La raíz entera es <b>${r}</b> y el resto ${n} − ${r * r} = <b>${s}</b>.`,
    // Estrategias para resolver problemas (m7.heur)
    heur_pares: [
      // chico: el de menos patas/ruedas (na); grande: el de más (nb); fa/fb: femenino
      { lugar: "En una granja", todo: "animales", pie: "patas", chico: "gallinas", grande: "conejos", uno: "una gallina", otro: "un conejo", fa: true, fb: false, na: 2, nb: 4 },
      { lugar: "En un corral", todo: "animales", pie: "patas", chico: "patos", grande: "ovejas", uno: "un pato", otro: "una oveja", fa: false, fb: true, na: 2, nb: 4 },
      { lugar: "En un aparcamiento", todo: "vehículos", pie: "ruedas", chico: "motos", grande: "coches", uno: "una moto", otro: "un coche", fa: true, fb: false, na: 2, nb: 4 },
      { lugar: "En una tienda de bicis", todo: "vehículos", pie: "ruedas", chico: "bicicletas", grande: "triciclos", uno: "una bicicleta", otro: "un triciclo", fa: true, fb: false, na: 2, nb: 3 },
      { lugar: "En un comedor", todo: "asientos", pie: "patas", chico: "taburetes de 3 patas", grande: "sillas de 4 patas", uno: "un taburete", otro: "una silla", fa: false, fb: true, na: 3, nb: 4 },
    ],
    heur_patas_q: (P, n, total, askBig) => `${P.lugar} hay ${n} ${P.todo} entre ${P.chico} y ${P.grande}, y en total tienen ${total} ${P.pie}. ¿${(askBig ? P.fb : P.fa) ? "Cuántas" : "Cuántos"} ${(askBig ? P.grande : P.chico).split(" ")[0]} hay?`,
    heur_patas_s: (P, n, total, big, small) => { const d = P.nb - P.na, base = n * P.na, w = s => s.split(" ")[0];
      return `Ensayo y error organizado. Si ${P.fa ? "todas fueran" : "todos fueran"} ${w(P.chico)}: ${n} · ${P.na} = ${base} ${P.pie}. Faltan ${total} − ${base} = ${total - base}.<br>` +
        `Cada vez que cambio ${P.uno} por ${P.otro} hay ${d} ${d === 1 ? P.pie.slice(0, -1) : P.pie} más: ${d === 1 ? `hay que hacer ${big} cambios` : `${total - base} : ${d} = ${big} cambios`}.<br>` +
        `Hay <b>${big} ${w(P.grande)}</b> y <b>${small} ${w(P.chico)}</b>. Compruebo: ${small} · ${P.na} + ${big} · ${P.nb} = ${small * P.na} + ${big * P.nb} = ${total} ✓`; },
    heur_num_q: (a, b, plus, c) => `Pienso un número, lo multiplico por ${a}, ${plus ? `le sumo ${b}` : `le resto ${b}`} y obtengo ${c}. ¿Qué número pensé?`,
    heur_num_s: (a, b, plus, c, x) => `Empiezo por el final y deshago cada paso con la operación contraria:<br>` +
      `${plus ? `antes de sumar ${b} tenía ${c} − ${b} = ${c - b}` : `antes de restar ${b} tenía ${c} + ${b} = ${c + b}`};<br>` +
      `antes de multiplicar por ${a} tenía ${x * a} : ${a} = <b>${x}</b>.<br>Compruebo: ${x} · ${a} ${plus ? "+" : "−"} ${b} = ${x * a} ${plus ? "+" : "−"} ${b} = ${c} ✓`,
    heur_apret_q: (n, ctx) => ctx ? `En una liga de ${n} equipos, cada equipo juega una sola vez contra cada uno de los demás. ¿Cuántos partidos se juegan en total?`
      : `En una reunión hay ${n} personas y cada una da la mano una sola vez a cada una de las demás. ¿Cuántos apretones de manos hay?`,
    heur_apret_s: (n, ctx, terms, r) => ctx ? `Empiezo por casos pequeños y busco una regla. El primer equipo juega contra los otros ${n - 1}; el segundo, contra ${n - 2} nuevos (con el primero ya ha jugado); el tercero, contra ${n - 3} nuevos… y el penúltimo, contra 1.<br>Total: ${terms} = <b>${r}</b> partidos.`
      : `Empiezo por casos pequeños y busco una regla. La primera persona saluda a las otras ${n - 1}; la segunda, a ${n - 2} nuevas (a la primera ya la ha saludado); la tercera, a ${n - 3} nuevas… y la penúltima, a 1.<br>Total: ${terms} = <b>${r}</b> apretones.`,
    heur_animal: ["Un caracol", "Una rana", "Una lagartija"],
    heur_pozo_q: (who, h, up, down) => `${who} está en el fondo de un pozo de ${h} m. Cada día sube ${up} m y cada noche resbala ${down} m. ¿Qué día sale del pozo?`,
    heur_pozo_s: (h, up, down, g, day, sPrev, s) => `Hago una tabla. Cada día y su noche gana ${up} − ${down} = ${g} m, así que cada mañana empieza ${g} m más arriba: día 1 a 0 m, día 2 a ${g} m, día 3 a ${2 * g} m…<br>` +
      `El día ${day - 1} empieza a ${sPrev} m y sube hasta ${sPrev + up} m: no llega a ${h} m y resbala.<br>` +
      `El día ${day} empieza a ${s} m y sube hasta ${s + up} m: llega al borde y sale sin volver a resbalar. Sale el <b>día ${day}</b>.`,
    // Divisibilidad
    multiplo_q: (a, b) => `¿Es <b>${a}</b> múltiplo de <b>${b}</b>?`,
    multiplo_s: (a, b, ok, q, r) => ok ? `Sí: ${a} : ${b} = ${q} exacto (${a} = ${b} · ${q}).` : `No: al dividir ${a} entre ${b} el resto es ${r}, no es una división exacta.`,
    divisores_q: n => `Escribe todos los divisores de <b>${n}</b>.`,
    divisores_s: (n, pairs, list) => `Buscamos parejas que multiplicadas dan ${n}: ${pairs}. Divisores: <b>${list}</b>.`,
    multrango_q: (n, a, b) => `Escribe los múltiplos de <b>${n}</b> que hay entre <b>${a}</b> y <b>${b}</b>.`,
    multrango_s: (n, list) => `Multiplicamos ${n} por 1, 2, 3… y nos quedamos con los del intervalo: <b>${list}</b>.`,
    divde_q: n => `¿Cuál de estos números es divisor de <b>${n}</b>?`,
    divde_s: (n, d) => `${n} : ${d} = ${n / d} es exacta, así que ${d} es divisor de ${n}.`,
    crit_q: (n, d) => `¿Es <b>${n}</b> divisible entre <b>${d}</b>?`,
    crit_rule: {
      2: (n, ok) => `Un número es divisible entre 2 si acaba en cifra par. ${n} acaba en ${String(n).slice(-1)}: ${ok ? "sí" : "no"} lo es.`,
      3: (n, ok, s) => `Un número es divisible entre 3 si la suma de sus cifras es múltiplo de 3. Suma: ${s}. ${ok ? "Sí" : "No"} es múltiplo de 3.`,
      4: (n, ok, s, a, b, raw) => { const dos = raw % 100;
        return `Un número es divisible entre 4 si el número que forman sus dos últimas cifras es múltiplo de 4. ${n} acaba en ${String(dos).padStart(2, "0")}${dos < 10 ? ` (es decir, ${dos})` : ""}: ${ok ? `${dos} = 4 · ${dos / 4}, sí` : `${dos} no es múltiplo de 4, no`} lo es.`; },
      6: (n, ok, s, a, b, raw) => { const par = raw % 2 === 0, tres = s % 3 === 0;
        return `Un número es divisible entre 6 si lo es entre 2 y entre 3 a la vez. ${n} acaba en ${raw % 10} (${par ? "par: sí entre 2" : "impar: no entre 2"}) y sus cifras suman ${s} (${tres ? "múltiplo de 3: sí entre 3" : "no es múltiplo de 3: no entre 3"}). ${ok ? "Sí" : "No"} lo es.`; },
      5: (n, ok) => `Un número es divisible entre 5 si acaba en 0 o en 5. ${n} acaba en ${String(n).slice(-1)}: ${ok ? "sí" : "no"} lo es.`,
      9: (n, ok, s) => `Un número es divisible entre 9 si la suma de sus cifras es múltiplo de 9. Suma: ${s}. ${ok ? "Sí" : "No"} es múltiplo de 9.`,
      10: (n, ok) => `Un número es divisible entre 10 si acaba en 0. ${n} acaba en ${String(n).slice(-1)}: ${ok ? "sí" : "no"} lo es.`,
      11: (n, ok, s, a, b) => `Un número es divisible entre 11 si la diferencia entre la suma de las cifras de lugar impar (${a}) y la de lugar par (${b}) es 0 o múltiplo de 11. Diferencia: ${Math.abs(a - b)}. ${ok ? "Sí" : "No"} lo es.`,
    },
    critmulti_q: n => `¿Entre cuáles de estos números es divisible <b>${n}</b>?`,
    critmulti_s: (n, list) => list ? `${n} es divisible entre <b>${list}</b>.` : `${n} no es divisible entre ninguno de ellos.`,
    critcifra_q: (shown, d) => `¿Qué cifras pueden ir en el hueco de <b>${shown}</b> para que el número sea divisible entre <b>${d}</b>? Escríbelas todas.`,
    critcifra_s: (d, sumTxt, s, sums, ok) => { const y = a => a.length > 1 ? a.slice(0, -1).join(", ") + " o " + a[a.length - 1] : String(a[0]);
      return `Suma de las cifras conocidas: ${sumTxt} = ${s}. Para que la suma sea múltiplo de ${d} (${y(sums)}) hay que añadir ${y(ok)}. Sirven: <b>${ok.join(", ")}</b>.`; },
    critcifra_s11: (odd, even, holeOdd, so, se, x, A, B) => `Desde la derecha, cifras de lugar impar: ${odd.concat(holeOdd ? ["□"] : []).join(" + ")}; de lugar par: ${even.concat(holeOdd ? [] : ["□"]).join(" + ")}. ` +
      `Sin el hueco suman ${so} y ${se}. La diferencia tiene que ser 0 o múltiplo de 11: con □ = ${x}, las sumas son ${A} y ${B} y la diferencia es ${Math.abs(A - B)}. Sirve: <b>${x}</b>.`,
    critcifra_none: "ninguna",
    primo_q: n => `¿El número <b>${n}</b> es primo o compuesto?`,
    primo_opts: ["Primo", "Compuesto"],
    primo_s_p: (n, tried, q) => `Probamos a dividir ${n} entre los primos ${tried.length > 1 ? tried.slice(0, -1).join(", ") + " y " + tried[tried.length - 1] : tried[0]}: ninguna división es exacta. El siguiente primo, ${q}, ya se pasa (${q} · ${q} = ${q * q}, más que ${n}): podemos parar. ${n} es <b>primo</b>.`,
    primo_s_c: (n, d, before) => `${before.length ? `${n} no es divisible entre ${before.length > 1 ? before.slice(0, -1).join(", ") + " ni " + before[before.length - 1] : before[0]}. ` : ""}Probamos con ${d}: ${n} : ${d} = ${n / d}, exacta. Como ${n} = ${d} · ${n / d}, tiene más divisores que 1 y él mismo: es <b>compuesto</b>.`,
    factoriza_q: n => `Descompón <b>${n}</b> en factores primos.`,
    factoriza_s: (steps, veces, f) => { const v = veces.length > 1 ? veces.slice(0, -1).join(", ") + " y " + veces[veces.length - 1] : veces[0];
      return `Divisiones sucesivas, entre el primo más pequeño posible:<br>${steps}<br>${v[0].toUpperCase() + v.slice(1)}: <b>${f}</b>.`; },
    factoriza_veces: (p, k) => `el ${p} sale ${["", "una vez", "dos veces", "tres veces", "cuatro veces", "cinco veces", "seis veces", "siete veces", "ocho veces", "nueve veces"][k] || k + " veces"}`,
    defact_q: f => `¿Qué número tiene esta descomposición en factores primos: <b>${f}</b>?`,
    defact_s: (f, r, pows, steps) => `${pows.length ? `Primero las potencias: ${pows.join("; ")}. ` : ""}${steps.length ? `Después multiplicamos paso a paso: ${steps.join("; ")}. ` : ""}${f} = <b>${r}</b>.`,
    mcd_q: (a, b) => `Calcula el máximo común divisor: <b>m.c.d.(${a}, ${b})</b>.`,
    mcd_s: (fa, fb, res) => `Descomponemos: ${fa} y ${fb}. Tomamos los factores comunes con el menor exponente: ${res}.`,
    mcm_q: (a, b) => `Calcula el mínimo común múltiplo: <b>m.c.m.(${a}, ${b})</b>.`,
    mcm_s: (fa, fb, res) => `Descomponemos: ${fa} y ${fb}. Tomamos los factores comunes y no comunes con el mayor exponente: ${res}.`,
    nocommon: "no tienen factores primos comunes, así que el m.c.d. es <b>1</b>",
    mcdprob: [
      { pista: "cortar las dos cintas en trozos iguales lo más largos posible", q: (a, b) => `Tenemos dos cintas de ${a} cm y ${b} cm. Queremos cortarlas en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuánto medirá cada trozo (en cm)?`,
        s: (a, b, r) => `Buscamos el mayor número que divide a ${a} y a ${b}: m.c.d.(${a}, ${b}) = <b>${r}</b> cm.` },
      { pista: "repartir los caramelos en el mayor número posible de bolsas iguales", q: (a, b) => `Se quieren hacer bolsas iguales con ${a} caramelos de fresa y ${b} de limón, sin que sobre ninguno y con el mayor número posible de bolsas. ¿Cuántas bolsas se pueden hacer?`,
        s: (a, b, r) => `El número de bolsas tiene que dividir a ${a} y a ${b}, y ser el mayor posible: m.c.d.(${a}, ${b}) = <b>${r}</b> bolsas.` },
      { pista: "partir el suelo en cuadrados iguales lo más grandes posible", q: (a, b) => `Un suelo rectangular mide ${a} dm por ${b} dm. Queremos cubrirlo con baldosas cuadradas iguales, lo más grandes posible y sin cortar ninguna. ¿Cuánto medirá el lado de cada baldosa (en dm)?`,
        s: (a, b, r) => `El lado tiene que dividir a ${a} y a ${b} y ser el mayor posible: m.c.d.(${a}, ${b}) = <b>${r}</b> dm.` },
    ],
    mcmprob: [
      { pista: "saber cuándo vuelven a salir juntos dos autobuses que se repiten cada cierto tiempo", q: (a, b) => `De una estación salen dos autobuses: uno cada ${a} minutos y otro cada ${b} minutos. Si acaban de salir juntos, ¿dentro de cuántos minutos volverán a coincidir?`,
        s: (a, b, r) => `Buscamos el primer múltiplo común de ${a} y ${b}: m.c.m.(${a}, ${b}) = <b>${r}</b> minutos.` },
      { pista: "saber cuándo vuelven a encenderse juntos dos faros que se repiten cada cierto tiempo", q: (a, b) => `Un faro se enciende cada ${a} segundos y otro cada ${b} segundos. Si se acaban de encender a la vez, ¿cuántos segundos pasarán hasta que vuelvan a encenderse juntos?`,
        s: (a, b, r) => `Necesitamos el menor múltiplo común de ${a} y ${b}: m.c.m.(${a}, ${b}) = <b>${r}</b> segundos.` },
      { pista: "saber cuándo vuelven a coincidir dos personas que van cada cierto número de días", q: (a, b) => `Ana va a la piscina cada ${a} días y Marcos cada ${b} días. Hoy han coincidido. ¿Dentro de cuántos días volverán a coincidir?`,
        s: (a, b, r) => `Es el menor múltiplo común de ${a} y ${b}: m.c.m.(${a}, ${b}) = <b>${r}</b> días.` },
    ],
    mcx_q: q => `Para resolver este problema, ¿qué hay que calcular?<br><i>${q}</i>`,
    mcx_opts: ["El máximo común divisor (m.c.d.)", "El mínimo común múltiplo (m.c.m.)"],
    mcx_s_mcd: p => `Hay que ${p}, sin que sobre nada: buscamos el mayor número que divide a las dos cantidades. Es un problema de <b>m.c.d.</b> (el resultado es menor o igual que los datos).`,
    mcx_s_mcm: p => `Hay que ${p}: buscamos el primer múltiplo común de los dos números. Es un problema de <b>m.c.m.</b> (el resultado es mayor o igual que los datos).`,
    // Pensamiento computacional (m7.algo)
    algo_euc_q: (a, b) => `Calcula <b>m.c.d.(${a}, ${b})</b> con el algoritmo de Euclides. ¿Cuántas vueltas da el bucle?`,
    algo_euc_f: ["m.c.d.", "Vueltas"],
    algo_euc_s: rows => rows.map(([a, b, q, r], i) => `Vuelta ${i + 1}: a = ${a}, b = ${b}. ${a} = ${q} · ${b} + ${r}: ${r ? `resto ${r}, no es 0. Ahora a = ${b}, b = ${r}.` : `resto 0. El algoritmo escribe b = <b>${b}</b>.`}`).join("<br>") +
      `<br>El m.c.d. es <b>${rows[rows.length - 1][1]}</b> y el bucle da <b>${rows.length} vueltas</b> (una por cada división).`,
    algo_bucle_q: (n0, mul, k, lim, until) => `Sigue este algoritmo: «Empieza con n = ${n0}. Repite: escribe n; n pasa a valer n ${mul ? "·" : "+"} ${k}; ${until ? `hasta que n sea mayor que ${lim}` : `mientras n sea menor que ${lim}`}.» ¿Cuál es el último número que escribe?`,
    algo_bucle_s: (out, n, lim, until) => `Traza: escribe ${out.slice(0, -1).join(", ")} y <b>${out[out.length - 1]}</b>. Después n vale ${n}, que ${until ? `ya es mayor que ${lim}` : `ya no es menor que ${lim}`}, y el bucle termina. El último número escrito es <b>${out[out.length - 1]}</b>.`,
    algo_cifras_q: n => `Un algoritmo suma las cifras de un número y repite con el resultado hasta que queda una sola cifra. ¿Qué cifra queda para <b>${n}</b>?`,
    algo_cifras_s: (steps, m) => `${steps.join("; repetimos: ")}. Queda una sola cifra: <b>${m}</b>.`,
});
})();
