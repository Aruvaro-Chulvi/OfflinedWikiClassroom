/* WikiAula — textos y bancos de gen/sos5.js (Desarrollo sostenible, Grado 5), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sos5 = G.sos5 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes"];
Object.assign(S, {
  sostenible: bank(x => `${cap(x)}: ¿es sostenible o no sostenible?`, ["Sostenible", "No sostenible"], ["Cubre lo de hoy sin quitar lo de mañana.", "Agota o daña lo que necesitarán otros."],
    [["talar algunos árboles y plantar otros nuevos", 0], ["pescar solo peces grandes", 0], ["regar por goteo", 0], ["usar energía solar", 0], ["talar un bosque entero sin replantar", 1],
     ["pescar peces que aún no han tenido crías", 1], ["sacar del pozo más agua de la que entra con la lluvia", 1], ["tirar basura al río", 1]]),
  recurso: bank(x => `${cap(x)}: ¿recurso renovable o no renovable?`, ["Renovable", "No renovable"], ["Se regenera si no se abusa.", "Cantidad limitada; tarda millones de años."],
    [["el agua", 0], ["la madera", 0], ["el viento", 0], ["la luz del sol", 0], ["los peces", 0], ["el petróleo", 1], ["el carbón", 1], ["el gas natural", 1], ["el cobre", 1], ["el hierro", 1]]),
  agua: bank(x => `${cap(x)}: ¿ahorra agua o la desperdicia?`, ["Ahorra", "Desperdicia"], ["Usa solo la necesaria.", "Gasta agua sin necesidad."],
    [["ducharse en 5 minutos", 0], ["cerrar el grifo mientras te cepillas", 0], ["poner la lavadora llena", 0], ["regar las plantas al atardecer", 0], ["bañarse en la bañera cada día", 1],
     ["dejar un grifo goteando", 1], ["lavar el coche con la manguera abierta", 1], ["usar el váter como papelera", 1]]),
  ciclo: bank(x => `${cap(x)}: ¿en qué paso del ciclo urbano del agua ocurre?`, ["Captación", "Potabilización", "Distribución", "Alcantarillado", "Depuración"],
    ["Se toma del río o embalse.", "Se hace potable.", "Llega a las casas.", "Se lleva el agua sucia.", "Se limpia antes de devolverla."],
    [["se toma agua del embalse", 0], ["se bombea agua de un acuífero", 0], ["se filtra y se desinfecta con cloro", 1], ["las tuberías llevan el agua a los grifos", 2],
     ["el agua del fregadero baja por las cañerías de la calle", 3], ["se eliminan la suciedad y los microbios del agua usada", 4], ["el agua limpia vuelve al río", 4]]),
  fuente: bank(x => `${cap(x)}: ¿fuente de energía renovable o no renovable?`, ["Renovable", "No renovable"], ["No se agota.", "Se agota y contamina más."],
    [["la energía solar", 0], ["la energía eólica", 0], ["la energía hidráulica", 0], ["la biomasa", 0], ["la geotérmica", 0], ["el petróleo", 1], ["el carbón", 1], ["el gas natural", 1],
     ["la nuclear (uranio)", 1]]),
  ahorro: bank(x => `${cap(x)}: ¿ahorra energía o la desperdicia?`, ["Ahorra", "Desperdicia"], ["Usa menos energía.", "Gasta energía sin necesidad."],
    [["apagar la luz al salir", 0], ["cambiar a bombillas LED", 0], ["ponerse un jersey en vez de subir la calefacción", 0], ["aprovechar la luz del sol", 0],
     ["dejar la tele en modo espera toda la noche", 1], ["abrir la nevera cada poco", 1], ["calefacción a 25 °C con la ventana abierta", 1], ["cargar el móvil toda la noche sin necesidad", 1]]),
  contenedor: bank(x => `${cap(x)}: ¿a qué contenedor va?`, ["Amarillo", "Azul", "Verde", "Marrón", "Gris", "Punto limpio"],
    ["Envases.", "Papel y cartón.", "Vidrio.", "Orgánico.", "Resto.", "Residuos especiales."],
    [["una lata de refresco", 0], ["un brik de leche", 0], ["una botella de plástico", 0], ["una caja de cereales", 1], ["un periódico", 1], ["una botella de vidrio", 2], ["un tarro de cristal", 2],
     ["una piel de plátano", 3], ["restos de comida", 3], ["un pañal", 4], ["polvo de barrer", 4], ["pilas usadas", 5], ["aceite de cocina usado", 5], ["un móvil roto", 5]]),
  compost: bank(x => `${cap(x)}: ¿se puede echar al compost casero?`, ["Sí", "No"], ["Restos vegetales y secos.", "Atrae animales, huele o no se descompone."],
    [["cáscaras de fruta", 0], ["posos de café", 0], ["hojas secas", 0], ["cáscaras de huevo", 0], ["restos de verdura", 0], ["huesos de pollo", 1], ["restos de pescado", 1], ["queso", 1],
     ["aceite", 1], ["una bolsa de plástico", 1]]),
  huerto: bank(x => `${cap(x)}: ¿es una buena práctica en un huerto ecológico?`, ["Sí", "No"], ["Cuida la tierra y los seres vivos.", "Daña la tierra, el agua o los animales útiles."],
    [["abonar con compost", 0], ["regar por goteo", 0], ["dejar que las mariquitas se coman los pulgones", 0], ["cambiar cada año lo que se planta en cada parcela", 0], ["plantar flores para atraer abejas", 0],
     ["echar insecticida químico", 1], ["regar a mediodía en verano con manguera", 1], ["plantar siempre lo mismo en el mismo sitio", 1], ["usar abonos químicos", 1]]),
  li_q1: (m, l) => `Una ducha de ${m} minutos con un grifo que echa ${l} litros por minuto, ¿cuántos litros gasta?`,
  li_s1: (m, l, t) => `${m} × ${l} = <b>${t}</b> L`,
  li_q2: (m, l) => `Un baño gasta 200 L. ¿Cuántos litros se ahorran con una ducha de ${m} minutos a ${l} L por minuto?`,
  li_s2: (m, l, d, a) => `Ducha: ${m} × ${l} = ${d} L; ahorro: 200 − ${d} = <b>${a}</b> L`,
  aparatos: [["una bombilla LED", 10], ["una bombilla antigua", 60], ["un televisor", 100], ["un ordenador", 200], ["una consola", 150], ["un secador de pelo", 1000], ["una estufa eléctrica", 2000]],
  kw_q: (a, w, h) => `${cap(a)} de ${w} W funciona durante ${h} ${h === 1 ? "hora" : "horas"}. ¿Cuántos kWh gasta?`,
  kw_s: (w, h, e) => `${w} × ${h} ÷ 1000 = <b>${n(e)}</b> kWh`,
  au_q1: v => `Kilos de basura de la clase: ${v.map((x, i) => `${DIAS[i]} ${x}`).join(", ")}. ¿Cuántos kilos en total?`,
  au_s1: (v, t) => `${v.join(" + ")} = <b>${t}</b> kg`,
  au_q2: v => `Kilos de basura de la clase: ${v.map((x, i) => `${DIAS[i]} ${x}`).join(", ")}. ¿Cuál es la media diaria?`,
  au_s2: (v, t, m) => `Total ${v.join(" + ")} = ${t}; media ${t} ÷ 5 = <b>${m}</b> kg`,
});
})();
