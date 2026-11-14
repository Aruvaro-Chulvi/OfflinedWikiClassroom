/* WikiAula — textos y bancos de gen/sos6.js (Desarrollo sostenible, Grado 6), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sos6 = G.sos6 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const m = x => x.toLocaleString("es-ES").replace(/\./g, " ");
Object.assign(S, {
  gei: bank(x => `${cap(x)}: ¿aumenta o reduce los gases de efecto invernadero?`, ["Aumenta", "Reduce"], ["Emite CO₂ o metano.", "Evita emisiones o absorbe CO₂."],
    [["quemar carbón en una central", 0], ["talar un bosque", 0], ["un vertedero de basura", 0], ["muchas vacas en granjas intensivas", 0], ["un coche de gasolina", 0],
     ["plantar árboles", 1], ["usar energía solar", 1], ["ir en bici", 1], ["hacer compost en vez de tirar los restos al vertedero", 1]]),
  clima: bank(x => `${cap(x)}: ¿es una causa o una consecuencia del cambio climático?`, ["Causa", "Consecuencia"], ["Lo provoca.", "Lo produce el calentamiento."],
    [["quemar petróleo", 0], ["la deforestación", 0], ["la ganadería intensiva", 0], ["el transporte por carretera", 0], ["el deshielo de los glaciares", 1], ["la subida del nivel del mar", 1],
     ["más olas de calor", 1], ["el blanqueamiento de los corales", 1], ["sequías más largas", 1]]),
  reducir: bank(x => `${cap(x)}: ¿reduce la huella de carbono?`, ["Sí", "No"], ["Menos emisiones.", "Más emisiones."],
    [["ir al cole andando", 0], ["comer legumbres en vez de carne de vaca", 0], ["bajar 1 °C la calefacción", 0], ["comprar fruta de temporada y local", 0], ["viajar en avión para un trayecto corto", 1],
     ["comprar ropa nueva cada mes", 1], ["dejar la luz encendida", 1], ["ir en coche a una tienda a 300 m", 1]]),
  amenaza: bank(x => `${cap(x)}: ¿qué causa de pérdida de biodiversidad es?`, ["Destrucción del hábitat", "Sobreexplotación", "Contaminación", "Especie invasora", "Cambio climático"],
    ["Se destruye el lugar donde viven.", "Se caza o pesca de más.", "Se ensucia el medio.", "Una especie de fuera desplaza a las nativas.", "El calentamiento las afecta."],
    [["secar un humedal para construir", 0], ["talar la selva para plantar soja", 0], ["pescar atunes más rápido de lo que se reproducen", 1], ["cazar elefantes por su marfil", 1],
     ["un vertido de petróleo en el mar", 2], ["pesticidas que matan abejas", 2], ["cotorras argentinas que desplazan a aves nativas", 3], ["el cangrejo rojo americano en los ríos", 3],
     ["corales que se blanquean por el agua caliente", 4], ["especies de montaña que suben porque abajo hace calor", 4]]),
  plastico: bank(x => `${cap(x)}: ¿ayuda a reducir el plástico en el mar?`, ["Sí", "No"], ["Evita que llegue plástico al mar.", "Genera o deja plástico en el entorno."],
    [["recoger basura en la playa", 0], ["usar una botella reutilizable", 0], ["llevar bolsa de tela", 0], ["tirar los envases al contenedor amarillo", 0], ["soltar globos de helio", 1],
     ["tirar colillas al suelo", 1], ["tirar toallitas por el váter", 1], ["usar pajitas de plástico", 1]]),
  temporada: bank(x => `${cap(x)}: ¿es de temporada en invierno o en verano?`, ["Invierno", "Verano"], ["Otoño-invierno.", "Primavera-verano."],
    [["la naranja", 0], ["la mandarina", 0], ["el kiwi", 0], ["la coliflor", 0], ["la alcachofa", 0], ["la sandía", 1], ["el melón", 1], ["el melocotón", 1], ["el tomate", 1], ["el calabacín", 1]]),
  fecha: bank(x => `${cap(x)}: ¿qué tipo de fecha lleva normalmente?`, ["Fecha de caducidad", "Consumo preferente"], ["Perecedero: no comer después.", "Seguro después, pierde calidad."],
    [["carne picada", 0], ["pescado fresco", 0], ["yogures", 0], ["leche fresca", 0], ["galletas", 1], ["arroz", 1], ["pasta seca", 1], ["latas de conserva", 1], ["cereales del desayuno", 1]]),
  barrio: bank(x => `${cap(x)}: ¿hace el barrio más sostenible?`, ["Sí", "No"], ["Personas, verde, transporte limpio.", "Más coches, calor o residuos."],
    [["plantar árboles en las calles", 0], ["crear un carril bici", 0], ["poner un mercado cerca", 0], ["peatonalizar la calle del colegio", 0], ["placas solares en los tejados", 0],
     ["convertir un parque en aparcamiento", 1], ["quitar los autobuses de línea", 1], ["construir una autopista junto al colegio", 1]]),
  alternativa: bank(x => `${cap(x)}: ¿es reutilizable o de un solo uso?`, ["Reutilizable", "Un solo uso"], ["Se usa muchas veces.", "Se tira tras usarlo una vez."],
    [["una fiambrera", 0], ["una botella de acero", 0], ["una bolsa de tela", 0], ["un envoltorio de cera", 0], ["una botella de agua de plástico", 1], ["papel de aluminio", 1],
     ["un vaso de plástico", 1], ["una pajita de plástico", 1]]),
  alimentos: [["carne de vaca", 60], ["carne de cerdo", 7], ["pollo", 6], ["queso", 21], ["arroz", 4], ["legumbres", 0.9], ["tomates", 1.4], ["patatas", 0.5]],
  hu_q: (a, e, q) => `Producir 1 kg de ${a} emite unos ${n(e)} kg de CO₂. ¿Cuántos kg de CO₂ emiten ${n(q)} kg?`,
  hu_s: (q, e, t) => `${n(q)} × ${n(e)} = <b>${n(t)}</b> kg de CO₂`,
  medios: [["la bici", 0], ["el tren", 20], ["el autobús", 30], ["el coche con una persona", 150], ["el avión", 250]],
  ck_q: (md, g, km) => `Un viaje de ${km} km en ${md} (${g} g de CO₂ por km y persona). ¿Cuántos kg de CO₂ emite?`,
  ck_s: (km, g, kg) => `${km} × ${g} ÷ 1000 = <b>${n(kg)}</b> kg`,
  me_q: (a, b) => `¿Qué emite menos CO₂ por kilómetro y persona: ${a} o ${b}?`,
  me_s: L => `${cap(L[0][0])}: ${L[0][1]} g/km; ${L[1][0]}: ${L[1][1]} g/km. Emite menos <b>${L[0][1] < L[1][1] ? L[0][0] : L[1][0]}</b>.`,
  residuos: [["una piel de plátano", 0.5], ["un chicle", 5], ["una colilla", 10], ["una bolsa de plástico", 150], ["una lata", 200], ["una botella de plástico", 450], ["una botella de vidrio", 4000]],
  du_q: (a, b) => `¿Qué tarda más en degradarse en la naturaleza: ${a} o ${b}?`,
  du_s: L => `${cap(L[0][0])}: unos ${n(L[0][1])} años; ${L[1][0]}: unos ${n(L[1][1])} años. Dura más <b>${L[0][1] > L[1][1] ? L[0][0] : L[1][0]}</b>.`,
  productos: ["tomates", "melocotones", "pimientos", "kiwis", "espárragos", "garbanzos"],
  km_q: (a, l, f) => `Los ${a} de un pueblo cercano recorren ${l} km; los de otro país, ${m(f)} km. ¿Cuántos km menos recorren los cercanos?`,
  km_s: (l, f, d) => `${m(f)} − ${l} = <b>${m(d)}</b> km`,
  periodos: [["día de clase", "días de clase", 5, "una semana"], ["semana", "semanas", 52, "un año"], ["semana", "semanas", 4, "un mes"], ["día", "días", 30, "un mes"]],
  de_q: (k, u, p, nn, x) => `Una familia tira ${k} kg de comida por ${u}. ¿Cuántos kg tira en ${nn} ${p} (${x})?`,
  de_s: (k, nn, t) => `${k} × ${nn} = <b>${t}</b> kg`,
  po_q: (a, d) => `Antes se tiraban ${a} envases de plástico al día; después del proyecto, ${d}. ¿Cuál es la reducción en %?`,
  po_s: (a, d, p) => `(${a} − ${d}) ÷ ${a} × 100 = <b>${p} %</b>`,
});
})();
