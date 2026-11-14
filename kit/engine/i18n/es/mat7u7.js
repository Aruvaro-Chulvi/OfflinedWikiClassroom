/* WikiAula — textos de gen/mat7u7.js (Grado 7 · Unidad 7: Expresiones algebraicas y ecuaciones), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  al_trad_q: t => `¿Qué expresión algebraica corresponde a «${t}»?`,
  // [frase, correcta, distractores, por qué]. La coma marca el orden, como en la lección:
  // «el doble de un número, más tres» (primero se dobla) frente a «el doble de la suma…».
  al_trad: [
    ["el doble de un número, más tres", "2x + 3", ["2(x + 3)", "x² + 3", "2 + 3x"], "Primero se dobla el número (2x) y después se suma 3: 2x + 3. En 2(x + 3) se sumaría antes de doblar."],
    ["el doble de la suma de un número y tres", "2(x + 3)", ["2x + 3", "x + 6", "2 + x + 3"], "Primero se suma (x + 3) y después se dobla todo: hace falta el paréntesis, 2(x + 3)."],
    ["el cuadrado de un número, menos cinco", "x² − 5", ["(x − 5)²", "2x − 5", "5 − x²"], "Primero se eleva el número al cuadrado (x²) y después se resta 5: x² − 5."],
    ["el cuadrado de la diferencia entre un número y cinco", "(x − 5)²", ["x² − 5", "x² − 25", "2(x − 5)"], "Primero se resta (x − 5) y después se eleva al cuadrado todo: hace falta el paréntesis, (x − 5)²."],
    ["la mitad de un número", "x/2", ["2x", "x − 2", "x²"], "La mitad es dividir entre 2: x/2."],
    ["un número más su siguiente", "x + (x + 1)", ["x + 1", "2x", "x(x + 1)"], "El siguiente de x es x + 1, y se suman los dos: x + (x + 1)."],
    ["el triple de un número, menos su mitad", "3x − x/2", ["3(x − x/2)", "3x − 2x", "x/2 − 3x"], "El triple es 3x y la mitad, x/2; al triple se le resta la mitad: 3x − x/2."],
    ["la tercera parte de un número, más uno", "x/3 + 1", ["(x + 1)/3", "3x + 1", "x + 1/3"], "Primero se divide el número entre 3 (x/3) y después se suma 1: x/3 + 1."],
    ["la tercera parte de la suma de un número y uno", "(x + 1)/3", ["x/3 + 1", "3(x + 1)", "x + 1/3"], "Primero se suma (x + 1) y después se divide todo entre 3: (x + 1)/3."],
    ["el producto de dos números consecutivos", "x(x + 1)", ["x + (x + 1)", "2x + 1", "x · 2"], "Dos números consecutivos son x y x + 1, y el producto es multiplicarlos: x(x + 1)."],
    ["un número par cualquiera", "2x", ["x + 2", "x²", "2x + 1"], "Todos los pares son el doble de otro número (8 = 2 · 4, 14 = 2 · 7): 2x. En cambio, 2x + 1 es impar."],
    ["el perímetro de un cuadrado de lado x", "4x", ["x²", "x + 4", "2x"], "El cuadrado tiene 4 lados de x: 4 veces x, 4x. (x² sería su área.)"],
    ["el área de un rectángulo de base x y altura 3", "3x", ["x + 3", "2x + 6", "x³"], "Área = base · altura = x · 3, que se escribe 3x (el número, delante). (2x + 6 sería su perímetro.)"],
  ],
  al_trad_s: (r, why) => `La expresión correcta es <b>${r}</b>. ${why}`,
  al_val_q: (e, v) => `Calcula el valor numérico de <b>${e}</b> para <b>${v}</b>.`,
  al_val_s: (e2, r) => `Sustituimos la letra por su valor (entre paréntesis si es negativo) y operamos: ${e2} = <b>${r}</b>.`,
  // m7.al.valor por pisos (Ejemplo 2 de la lección)
  al_val_l: {
    sust: (t, negativo) => `Sustituimos la x por su valor${negativo ? ", entre paréntesis porque es negativo" : ""}: ${t}`,
    par: t => `Primero, el paréntesis: ${t}`,
    pot: (p, t) => `Potencia: ${p} → ${t}`,
    prod: t => `Multiplicamos: ${t}`,
    fin: t => `Sumamos y restamos: ${t}`,
    y: "; ",
  },
  al_mono_q: m => `En el monomio <b>${m}</b>, ¿cuál es el coeficiente y cuál el grado?`,
  al_mono_f: ["Coeficiente", "Grado"],
  al_mono_s: (c, ex, ey) => `El coeficiente es el número, <b>${c}</b>. ` + (ey
    ? `El grado es la suma de los exponentes de las letras: ${ex} + ${ey} = <b>${ex + ey}</b>.`
    : ex === 1 ? "Solo hay una letra, x, y sin exponente lleva un 1 escondido (x = x¹): el grado es <b>1</b>."
    : `Solo hay una letra, con exponente ${ex}: el grado es <b>${ex}</b>.`),
  al_q: e => `Simplifica: <b>${e}</b>`,
  al_hint: "Ejemplo: 3x^2 − 2x + 1 (^ para los exponentes)",
  al_sem_s: (sum, r) => r === "0"
    ? `Son monomios semejantes (misma parte literal): se suman los coeficientes, ${sum}. Suman 0: los términos se anulan y queda <b>0</b>.`
    : `Son monomios semejantes (misma parte literal): se suman los coeficientes, ${sum}, y se deja la parte literal: <b>${r}</b>.`,
  al_prod_s: (c, e, r) => `Se multiplican los coeficientes (${c}) y se suman los exponentes de la misma letra (${e}): <b>${r}</b>.`,
  al_coc_s: (c, e, r, cero) => cero
    ? `Se dividen los coeficientes (${c}) y se restan los exponentes (${e}): x⁰ = 1, así que la letra desaparece y queda solo el número: <b>${r}</b>.`
    : `Se dividen los coeficientes (${c}) y se restan los exponentes (${e}): <b>${r}</b>.`,
  al_red_s: (groups, r) => `Agrupamos los términos semejantes: ${groups} = <b>${r}</b>.`,
  // a = número que hay delante del paréntesis; reduce = queda algo que juntar después
  al_par_s: (a, step, r, reduce) => (a === 1
    ? `Un paréntesis sin ningún número delante se quita sin cambiar nada: ${reduce ? step : `<b>${r}</b>`}`
    : a === -1
    ? `Un menos delante del paréntesis es multiplicar por −1: cambian de signo todos los términos de dentro: ${reduce ? step : `<b>${r}</b>`}`
    : `Quitamos el paréntesis multiplicando el ${a < 0 ? "(−" + Math.abs(a) + ")" : a} por cada término de dentro (propiedad distributiva): ${reduce ? step : `<b>${r}</b>`}`)
    + (reduce ? `, y reducimos los términos semejantes: <b>${r}</b>.` : "."),
  ec_q: e => `Resuelve la ecuación: <b>${e}</b>`,
  ec_hint: "Escribe el valor de x. Ejemplo: −3",
  ec_steps: "Pasamos los términos con x a un lado y los números al otro (lo que suma pasa restando y lo que multiplica pasa dividiendo):",
  ec_den_steps: (a, pasa) => pasa
    ? `Primero dejamos sola la fracción (lo que suma pasa restando, y lo que resta, sumando). Después, el ${a} que divide a la x pasa multiplicando:`
    : `El ${a} que divide a la x pasa al otro miembro multiplicando:`,
  // Patrones (m7.pat.regla)
  pat_q0: seq => `Escribe la regla del término que ocupa el lugar n en la secuencia <b>${seq}, …</b>`,
  pat_hint: "Escribe la regla con la letra n. Ejemplo: 3n + 2",
  pat_s0: (d, tabla, b, regla, c3) => `Crece de ${d} en ${d}: se parece a la tabla del ${d} (${tabla}…). `
    + (b === 0 ? "Cada término es justo la tabla del " + d : `Cada término es ${Math.abs(b)} ${b > 0 ? "más" : "menos"} que la tabla del ${d}`)
    + `: la regla es <b>${regla}</b>. Compruebo con n = 3: ${d} · 3${b ? (b > 0 ? " + " : " − ") + Math.abs(b) : ""} = ${c3} ✓`,
  pat_ctx: [
    { desc: "Con palillos se forma una fila de cuadrados pegados", u1: "cuadrado", u: "cuadrados", uq: "cuántos", obj: "palillos", oq: "Cuántos", todos: "todos los", d: 3, a1: 4 },
    { desc: "Con palillos se forma una fila de triángulos pegados", u1: "triángulo", u: "triángulos", uq: "cuántos", obj: "palillos", oq: "Cuántos", todos: "todos los", d: 2, a1: 3 },
    { desc: "Se juntan mesas cuadradas en fila, con una silla en cada lado libre", u1: "mesa", u: "mesas", uq: "cuántas", obj: "sillas", oq: "Cuántas", todos: "todas las", d: 2, a1: 4 },
    { desc: "Con palillos se forma una fila de pentágonos pegados", u1: "pentágono", u: "pentágonos", uq: "cuántos", obj: "palillos", oq: "Cuántos", todos: "todos los", d: 4, a1: 5 },
    { desc: "Con palillos se forma una fila de hexágonos pegados", u1: "hexágono", u: "hexágonos", uq: "cuántos", obj: "palillos", oq: "Cuántos", todos: "todos los", d: 5, a1: 6 },
    { desc: "Con palillos se forma una fila de casitas pegadas (un cuadrado con un tejado de dos palillos)", u1: "casita", u: "casitas", uq: "cuántas", obj: "palillos", oq: "Cuántos", todos: "todos los", d: 5, a1: 6 },
  ],
  pat_q1: (c, t, N) => `${c.desc}: para 1 ${c.u1} hacen falta ${t[0]} ${c.obj}; para 2, ${t[1]}; para 3, ${t[2]}. ¿${c.oq} ${c.obj} hacen falta para <b>${N} ${c.u}</b>?`,
  pat_s1: (c, b, regla, N, r) => `Cada ${c.u1} nuev${c.u1.endsWith("a") ? "a" : "o"} añade ${c.d} ${c.obj}, y ${b === 1 ? "hay 1 más que está" : "hay " + b + " más que están"} siempre: la regla es ${regla} (para n = 1: ${c.d} + ${b} = ${c.d + b} ✓). Para ${N} ${c.u}: ${c.d} · ${N} + ${b} = <b>${r}</b> ${c.obj}.`,
  pat_q2: (c, t, T) => `${c.desc}: para 1 ${c.u1} hacen falta ${t[0]} ${c.obj}; para 2, ${t[1]}; para 3, ${t[2]}. Si se usan ${c.todos} ${c.obj} de un montón de <b>${T}</b>, ¿${c.uq} ${c.u} hay en la fila?`,
  pat_s2: (c, b, regla, T, N) => `La regla es ${regla}: cada ${c.u1} añade ${c.d} ${c.obj} y ${b === 1 ? "hay 1 que está" : "hay " + b + " que están"} siempre. Quito ${b === 1 ? "ese 1" : "esos " + b}: ${T} − ${b} = ${T - b}. Cada ${c.u1} aporta ${c.d}: ${T - b} : ${c.d} = <b>${N}</b>. Compruebo: ${c.d} · ${N} + ${b} = ${T} ✓`,
  // m7.ec.plantea: edades (con la tabla de la lección) y «dos cosas con un total»
  plant: {
    parejas: [
      { may: "Una madre", men: "su hijo", el: "la madre", dm: "del hijo", M: "Madre", m: "Hijo" },
      { may: "Un padre", men: "su hija", el: "el padre", dm: "de la hija", M: "Padre", m: "Hija" },
      { may: "Una madre", men: "su hija", el: "la madre", dm: "de la hija", M: "Madre", m: "Hija" },
      { may: "Un padre", men: "su hijo", el: "el padre", dm: "del hijo", M: "Padre", m: "Hijo" },
    ],
    veces: { 2: "el doble", 3: "el triple", 4: "el cuádruple" },
    edad_q(p, M, h, k) { return `${p.may} tiene ${M} años y ${p.men}, ${h}. ¿Dentro de cuántos años ${p.el} tendrá ${this.veces[k]} de la edad ${p.dm}?`; },
    edad_s(p, M, h, k, x, D, k1) {
      const td = v => `<td style="border:1px solid #a2a9b1;padding:3px 10px;text-align:center">${v}</td>`;
      const tab = `<table style="border-collapse:collapse;margin:6px 0"><tr>${td("")}${td("Ahora")}${td("Dentro de x años")}</tr>`
        + `<tr>${td(p.M)}${td(M)}${td(M + " + x")}</tr><tr>${td(p.m)}${td(h)}${td(h + " + x")}</tr></table>`;
      return `x = años que pasan. Tabla (los dos cumplen x años a la vez):${tab}`
        + `Ecuación: ${M} + x = ${k}(${h} + x) → ${M} + x = ${k * h} + ${k}x<br>`
        + `Juntamos las x a la derecha, donde hay más: ${M} − ${k * h} = ${k}x − x → `
        + (k1 === 1 ? `<b>x = ${D}</b>` : `${D} = ${k1}x → x = ${D} : ${k1} = <b>${x}</b>`)
        + `<br>Comprobación: dentro de ${x} años tendrán ${M + x} y ${h + x}, y ${k} · ${h + x} = ${M + x} ✓`;
    },
    // A y B: lo que vale cada cosa grande y pequeña; n: [mín, máx] del total de cosas
    ctx: [
      { lugar: "En un corral hay gallinas y conejos", cosas: "animales", big: "conejos", small: "gallinas", fb: false, fs: true, A: 4, B: 2, que: "patas", n: [12, 40] },
      { lugar: "En un aparcamiento hay coches y motos", cosas: "vehículos", big: "coches", small: "motos", fb: false, fs: true, A: 4, B: 2, que: "ruedas", n: [12, 40] },
      { lugar: "En una tienda de alquiler hay bicicletas y triciclos", cosas: "vehículos", big: "triciclos", small: "bicicletas", fb: false, fs: true, A: 3, B: 2, que: "ruedas", n: [10, 35] },
      { lugar: "En una excursión, la entrada de adulto cuesta 7 € y la de niño, 4 €. Se venden entradas de los dos tipos", cosas: "entradas", big: "entradas de adulto", small: "entradas de niño", fb: true, fs: true, A: 7, B: 4, que: "euros", n: [10, 40] },
      { lugar: "En un restaurante hay mesas de 6 sillas y mesas de 4 sillas", cosas: "mesas", big: "mesas de 6", small: "mesas de 4", fb: true, fs: true, A: 6, B: 4, que: "sillas", n: [8, 25] },
    ],
    dos_q: (c, n, tot, big) => `${c.lugar}. En total son ${n} ${c.cosas} y ${tot} ${c.que}. ¿${(big ? c.fb : c.fs) ? "Cuántas" : "Cuántos"} ${big ? c.big : c.small} hay?`,
    dos_s: (c, n, tot, x, big) => {
      const k = c.A - c.B, kx = k === 1 ? "x" : k + "x";
      return `x = número de ${c.big}. ${c.fs ? "Las" : "Los"} ${c.small} son <b>${c.fs ? "las" : "los"} que faltan hasta ${n}</b>: ${n} − x.`
        + `<br>${c.que[0].toUpperCase() + c.que.slice(1)}: ${c.A}x + ${c.B}(${n} − x) = ${tot} → ${c.A}x + ${c.B * n} − ${c.B}x = ${tot} → ${kx} + ${c.B * n} = ${tot} → ${kx} = ${tot - c.B * n}`
        + (k === 1 ? "" : ` → x = ${tot - c.B * n} : ${k} = ${x}`)
        + `<br>Hay ${x} ${c.big} y ${n} − ${x} = ${n - x} ${c.small}: <b>${big ? x : n - x}</b>. Comprobación: ${c.A} · ${x} + ${c.B} · ${n - x} = ${c.A * x} + ${c.B * (n - x)} = ${tot} ✓`;
    },
  },
  ec_check: (x, l, r) => `Comprobación: para x = ${x}, el primer miembro vale ${l} y el segundo ${r}.`,
  ec_sol_q: (e, v) => `¿Es <b>x = ${v}</b> solución de la ecuación <b>${e}</b>?`,
  ec_sol_s: (v, l, r, ok) => `Sustituimos x = ${v}: el primer miembro vale ${l} y el segundo ${r}. ${ok ? "Coinciden: <b>sí</b> es solución." : "No coinciden: <b>no</b> es solución."}`,
  ec_prob: [
    { q: (s) => `La suma de tres números consecutivos es ${s}. ¿Cuál es el menor de ellos?`,
      e: "x + (x + 1) + (x + 2) = S", s: (s, x) => `Llamamos x al menor: x + (x + 1) + (x + 2) = ${s} → 3x + 3 = ${s} → 3x = ${s - 3} → x = <b>${x}</b>.` },
    { q: (a, d, y) => `Ana tiene ${a} años más que su hermano. Entre los dos suman ${y} años. ¿Cuántos años tiene el hermano?`,
      s: (a, y, x) => `Hermano: x; Ana: x + ${a}. x + x + ${a} = ${y} → 2x = ${y - a} → x = <b>${x}</b> años.` },
    { q: (p, k) => `El largo de un rectángulo mide ${k} cm más que el ancho y su perímetro es ${p} cm. ¿Cuánto mide el ancho?`,
      s: (p, k, x) => `Ancho: x; largo: x + ${k}. 2x + 2(x + ${k}) = ${p} → 4x + ${2 * k} = ${p} → 4x = ${p - 2 * k} → x = <b>${x}</b> cm.` },
    { q: (t, k) => `Reparte ${t} € entre dos personas de forma que una reciba el triple que la otra${k ? ` más ${k} €` : ""}. ¿Cuánto recibe la que menos?`,
      s: (t, k, x) => `Una recibe x y la otra 3x${k ? ` + ${k}` : ""}: x + 3x${k ? ` + ${k}` : ""} = ${t} → 4x = ${t - k} → x = <b>${x}</b> €.` },
    { q: (n, r) => `Si a un número le sumas su doble obtienes ${r}. ¿Qué número es?`,
      s: (r, x) => `x + 2x = ${r} → 3x = ${r} → x = <b>${x}</b>.` },
  ],
});
})();
