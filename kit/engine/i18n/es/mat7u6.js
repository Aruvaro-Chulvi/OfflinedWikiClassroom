/* WikiAula — textos de gen/mat7u6.js (Grado 7 · Unidad 6: Proporcionalidad y porcentajes), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m7 = G.m7 || {};
Object.assign(S, {
  pr_razon_q: (a, A, b, B, L) => `En ${L} hay ${a} ${A} y ${b} ${B}. ¿Cuál es la razón entre ${A} y ${B}? (Escríbela como fracción irreducible.)`,
  pr_razon_s: (a, b, r, irred) => irred ? `Razón = ${a} : ${b} = <b>${r}</b> (ya es irreducible).` : `Razón = ${a} : ${b} = ${a}/${b} = <b>${r}</b>.`,
  pr_pares: [["chicas", "chicos", "una clase"], ["gatos", "perros", "un refugio de animales"], ["libros", "revistas", "una estantería"], ["manzanas", "peras", "un frutero"], ["camisetas rojas", "camisetas azules", "un cajón"]],
  pr_cuarto_q: e => `Calcula el término desconocido de la proporción: <b>${e}</b>`,
  pr_cuarto_s: (cross, r) => `En una proporción los productos cruzados son iguales: ${cross} = <b>${r}</b>.`,
  pr_esprop_q: (a, b) => `¿Forman una proporción <b>${a}</b> y <b>${b}</b>?`,
  pr_esprop_s: (p1, p2, ok) => `Productos cruzados: ${p1} y ${p2}. ${ok ? "Son iguales: <b>sí</b> forman proporción." : "Son distintos: <b>no</b> forman proporción."}`,
  // Cada historia con datos creíbles: a y b = valores de la primera magnitud ([mín, máx]),
  // unit = lo que corresponde a una unidad (se elige de la lista), eur = importe en euros
  pr_dir: [
    { q: (a, A, b) => `${a} kg de naranjas cuestan ${A} €. ¿Cuánto cuestan ${b} kg, en euros?`, u: "€", a: [2, 6], b: [2, 10], unit: [0.9, 1.2, 1.5, 1.8, 2, 2.5], eur: true, per: "€ por kilo", d: "kilos" },
    { q: (a, A, b) => `Un coche recorre ${A} km con ${a} litros de gasolina. ¿Cuántos kilómetros recorre con ${b} litros?`, u: "km", a: [5, 40], b: [5, 50], unit: [12, 14, 15, 16, 18, 20], per: "km por litro", d: "litros" },
    { q: (a, A, b) => `Para ${a} personas se necesitan ${A} g de arroz. ¿Cuántos gramos hacen falta para ${b} personas?`, u: "g", a: [2, 8], b: [2, 12], unit: [60, 70, 75, 80, 90, 100], per: "g por persona", d: "personas" },
    { q: (a, A, b) => `Una impresora imprime ${A} páginas en ${a} minutos. ¿Cuántas páginas imprime en ${b} minutos?`, u: "páginas", a: [2, 8], b: [2, 15], unit: [10, 12, 15, 20, 24, 30], per: "páginas por minuto", d: "minutos" },
    { q: (a, A, b) => `${a} cuadernos iguales cuestan ${A} €. ¿Cuánto cuestan ${b} cuadernos, en euros?`, u: "€", a: [2, 6], b: [3, 12], unit: [1.2, 1.5, 1.8, 2, 2.5, 3], eur: true, per: "€ por cuaderno", d: "cuadernos" },
    { q: (a, A, b) => `Un grifo echa ${A} litros de agua en ${a} minutos. ¿Cuántos litros echa en ${b} minutos?`, u: "L", a: [2, 6], b: [3, 20], unit: [6, 8, 10, 12, 15], per: "L por minuto", d: "minutos" },
    { q: (a, A, b) => `Por ${a} horas de trabajo, Marta cobra ${A} €. ¿Cuánto cobra por ${b} horas, en euros?`, u: "€", a: [2, 8], b: [3, 40], unit: [9, 10, 12, 15, 18, 20], eur: true, per: "€ por hora", d: "horas" },
  ],
  pr_dir_s: (a, A, b, r) => `Son magnitudes directamente proporcionales (el doble de una, el doble de la otra). Reducción a la unidad: ${A} : ${a} = ${r.unit} ${r.per}; con ${b} ${r.d}, ${r.unit} · ${b} = <b>${r.v}</b>.`,
  pr_inv: [
    { q: (a, A, b) => `${a} pintores tardan ${A} días en pintar un edificio. ¿Cuántos días tardarían ${b} pintores?` },
    { q: (a, A, b) => `Con ${a} grifos iguales un depósito se llena en ${A} horas. ¿Cuántas horas tardaría con ${b} grifos?` },
    { q: (a, A, b) => `Yendo a ${a} km/h un viaje dura ${A} horas. ¿Cuántas horas duraría yendo a ${b} km/h?` },
    { q: (a, A, b) => `Con la comida de un refugio, ${a} personas tienen para ${A} días. ¿Para cuántos días tendrían ${b} personas?` },
  ],
  pr_inv_s: (a, A, b, p, r) => `Son inversamente proporcionales (el doble de una, la mitad de la otra): el producto es constante, ${a} · ${A} = ${p}. Entonces ${p} : ${b} = <b>${r}</b>.`,
  pr_tabla_q: (inv, t) => `${inv ? "Las magnitudes A y B son inversamente proporcionales." : "Las magnitudes A y B son directamente proporcionales."} Completa la tabla:${t}`,
  pr_tabla_s: (inv, x0, y0, p, k, xh, yh) => inv ? `El producto A · B es constante: ${x0} · ${y0} = ${p}. El hueco vale ${p} ${window.WA.H.div} ${xh} = <b>${yh}</b>.` : `El cociente B ${window.WA.H.div} A es constante: ${y0} ${window.WA.H.div} ${x0} = ${k}. El hueco vale ${xh} · ${k} = <b>${yh}</b>.`,
  pr_tipo_q: s => `¿Qué relación hay entre estas magnitudes?<br><i>${s}</i>`,
  pr_tipos: ["Directamente proporcionales", "Inversamente proporcionales", "No son proporcionales"],
  pr_tipo_items: [
    ["El número de entradas compradas y el precio total", 0], ["Los kilos de pan y lo que cuestan", 0], ["El tiempo y la distancia recorrida a velocidad constante", 0],
    ["El lado de un cuadrado y su perímetro", 0], ["Los litros de pintura y los metros cuadrados pintados", 0],
    ["El número de pintores y el tiempo que tardan en pintar una casa", 1], ["La velocidad de un coche y el tiempo de un viaje", 1],
    ["El número de personas que se reparten un premio y lo que recibe cada una", 1], ["Los litros por minuto que echa un grifo y el tiempo que tarda en llenar una bañera", 1],
    ["La edad de una persona y su altura", 2], ["El lado de un cuadrado y su área", 2], ["El número de un pie y la edad", 2], ["La temperatura y la hora del día", 2],
  ],
  pr_tipo_s: [
    "Si una se duplica, la otra también se duplica: son <b>directamente proporcionales</b>.",
    "Si una se duplica, la otra se reduce a la mitad: son <b>inversamente proporcionales</b>.",
    "Están relacionadas, pero no de forma proporcional (no se mantiene ni el cociente ni el producto): <b>no son proporcionales</b>.",
  ],
  pc_q: e => `Calcula: <b>${e}</b>`,
  pc_de_e: (p, c) => `${p} % de ${c}`,
  pc_de_s: (p, c, r) => `${p} % de ${c} = ${c} · ${p} : 100 = <b>${r}</b>.`,
  pc_que_q: (a, b) => `¿Qué porcentaje es ${a} de ${b}?`,
  pc_que_s: (a, b, r) => `Dividimos la parte entre el total y multiplicamos por 100: ${a} : ${b} · 100 = <b>${r} %</b>.`,
  pc_tot_q: (p, a) => `El ${p} % de una cantidad es ${a}. ¿Cuál es la cantidad?`,
  pc_tot_s: (p, a, r) => `Si el ${p} % es ${a}, el 1 % es ${a} : ${p} y el 100 %: ${a} : ${p} · 100 = <b>${r}</b>.`,
  pc_hint_pct: "Escribe solo el número, sin el símbolo %",
  pc_aum_q: (x, p, up) => up ? `Un precio de ${x} € sube un ${p} %. ¿Cuál es el precio nuevo, en euros?` : `Un artículo de ${x} € tiene un descuento del ${p} %. ¿Cuánto cuesta ahora, en euros?`,
  pc_aum_s: (x, i, r, up) => `${up ? "Aumentar" : "Disminuir"} un porcentaje es multiplicar por el índice de variación ${i}: ${x} · ${i} = <b>${r}</b> €.`,
  pc_orig_q: (y, p) => `Después de una rebaja del ${p} %, una chaqueta cuesta ${y} €. ¿Cuánto costaba antes de la rebaja, en euros?`,
  pc_orig_s: (y, i, r) => `Precio rebajado = precio inicial · ${i}, así que precio inicial = ${y} : ${i} = <b>${r}</b> €.`,
  pc_conv_q1: p => `Escribe el <b>${p} %</b> como fracción irreducible.`,
  pc_conv_s1: (p, r) => `${p} % = ${p}/100 = <b>${r}</b>.`,
  pc_conv_q2: x => `Escribe <b>${x}</b> en forma de porcentaje.`,
  pc_conv_s2: (x, r) => `Multiplicamos por 100: ${x} · 100 = <b>${r} %</b>.`,
  pc_conv_q3: f => `Escribe <b>${f}</b> en forma de porcentaje.`,
  pc_conv_s3: (n, d, x, r) => `Fracción → porcentaje: se pasa a decimal y se multiplica por 100. ${n} : ${d} = ${x}; ${x} · 100 = <b>${r} %</b>.`,
  // tipos de IVA que salen en m7.pc.iva
  pc_iva_p: [21, 10, 4],
  // importes sin impuesto que no saca m7.pc.iva (los de la lección); en español, ninguno
  pc_iva_no: [],
  pc_iva_q: (x, p) => `Una factura cuesta ${x} € sin impuestos. ¿Cuánto cuesta con un ${p} % de IVA, en euros?`,
});
})();
