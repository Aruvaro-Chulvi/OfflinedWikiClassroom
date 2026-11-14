/* WikiAula — textos y bancos de gen/sos8.js (Desarrollo sostenible, Grado 8), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sos8 = G.sos8 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const m = x => x.toLocaleString("es-ES").replace(/\./g, " ");
Object.assign(S, {
  tiempoclima: bank(x => `«${x}». ¿Habla del tiempo o del clima?`, ["Tiempo atmosférico", "Clima"], ["Un momento concreto.", "Media de muchos años."],
    [["Mañana nevará en Soria", 0], ["Hoy hay 35 °C en Sevilla", 0], ["Esta tarde habrá tormenta", 0], ["Ayer sopló mucho viento en Tarifa", 0], ["En Almería llueve menos de 250 mm al año", 1],
     ["Galicia tiene un clima oceánico, lluvioso", 1], ["Los veranos en Madrid son calurosos y secos", 1], ["En los últimos 30 años la temperatura media ha subido", 1]]),
  impacto: bank(x => `${cap(x)}: ¿qué impacto del cambio climático es?`, ["Deshielo", "Subida del nivel del mar", "Fenómenos extremos", "Ecosistemas", "Personas y economía"],
    ["Glaciares y polos.", "Costas.", "Calor, sequía, inundaciones.", "Especies y hábitats.", "Salud, cosechas, migraciones."],
    [["los glaciares del Pirineo casi han desaparecido", 0], ["el hielo del Ártico en verano es cada vez menor", 0], ["el delta del Ebro pierde terreno", 1], ["Tuvalu teme quedar bajo el agua", 1],
     ["olas de calor más frecuentes", 2], ["lluvias torrenciales (DANA)", 2], ["corales blanqueados", 3], ["especies de montaña que suben de altitud", 3], ["peores cosechas por la sequía", 4],
     ["familias que migran por las inundaciones", 4]]),
  mitadapt: bank(x => `${cap(x)}: ¿mitigación o adaptación?`, ["Mitigación", "Adaptación"], ["Reduce emisiones o absorbe CO₂.", "Se prepara para los efectos."],
    [["instalar placas solares", 0], ["plantar un bosque para absorber CO₂", 0], ["cambiar el coche por la bici", 0], ["comer menos carne de vaca", 0], ["poner toldos y árboles en el patio", 1],
     ["construir un dique contra el mar", 1], ["cultivar variedades resistentes a la sequía", 1], ["planes de emergencia ante olas de calor", 1]]),
  servicio: bank(x => `${cap(x)}: ¿qué tipo de servicio ecosistémico es?`, ["Abastecimiento", "Regulación", "Cultural", "Soporte"],
    ["Productos: comida, agua, madera.", "Procesos: polinizar, depurar, frenar riadas.", "Ocio, paisaje, inspiración.", "Base: suelo, fotosíntesis, nutrientes."],
    [["la madera de un bosque", 0], ["el pescado de un lago", 0], ["el agua de un manantial", 0], ["las abejas polinizan los almendros", 1], ["un humedal filtra el agua", 1],
     ["los árboles de ribera frenan una riada", 1], ["un paseo por la montaña", 2], ["un paisaje que inspira a un pintor", 2], ["la formación del suelo", 3], ["la fotosíntesis", 3]]),
  invasora: bank(x => `${cap(x)}: en España, ¿especie autóctona o invasora?`, ["Autóctona", "Invasora"], ["Propia de aquí.", "Llegada de fuera y causa daños."],
    [["el lince ibérico", 0], ["el quebrantahuesos", 0], ["la encina", 0], ["el oso pardo", 0], ["el visón europeo", 0], ["el mejillón cebra", 1], ["el visón americano", 1], ["el camalote", 1],
     ["la cotorra argentina", 1], ["el cangrejo rojo americano", 1], ["la tortuga de Florida", 1]]),
  protegido: bank(x => `${cap(x)}: ¿qué figura de protección es?`, ["Parque nacional", "Red Natura 2000", "Reserva de la biosfera", "Corredor ecológico"],
    ["Los espacios más valiosos (16 en España).", "Red europea de hábitats y especies.", "Programa de la UNESCO: naturaleza y población.", "Conecta espacios."],
    [["Doñana", 0], ["Picos de Europa", 0], ["el Teide", 0], ["una red europea que cubre el 27 % de España", 1], ["zonas para proteger hábitats de interés europeo", 1],
     ["Lanzarote entera, con su población", 2], ["un programa de la UNESCO que combina conservación y desarrollo local", 2], ["un paso de fauna bajo una autovía", 3],
     ["un río con vegetación que une dos sierras", 3]]),
  ciudad: bank(x => `${cap(x)}: ¿hace la ciudad más sostenible?`, ["Sí", "No"], ["Menos emisiones y más calidad de vida.", "Más emisiones, calor o ruido."],
    [["una zona de bajas emisiones", 0], ["cubiertas vegetales en los tejados", 0], ["un mercado a 5 minutos andando", 0], ["más líneas de autobús", 0], ["talar árboles para ampliar una avenida", 1],
     ["construir centros comerciales a las afueras accesibles solo en coche", 1], ["más plazas de aparcamiento en el centro", 1]]),
  movil: bank(x => `${cap(x)}: ¿reduce las emisiones del transporte?`, ["Sí", "No"], ["Menos CO₂ por persona.", "Más CO₂ por persona."],
    [["compartir coche con tres compañeros", 0], ["teletrabajar dos días a la semana", 0], ["ir en tren en vez de en avión a Barcelona", 0], ["usar el autobús", 0],
     ["ir solo en un todoterreno grande", 1], ["coger el avión para 300 km", 1], ["dar vueltas en coche buscando aparcamiento", 1]]),
  edificio: bank(x => `${cap(x)}: ¿mejora la eficiencia del edificio?`, ["Sí", "No"], ["Menos energía para el mismo confort.", "Pierde energía."],
    [["aislar la fachada", 0], ["ventanas de doble acristalamiento", 0], ["orientar las ventanas al sur", 0], ["instalar una bomba de calor", 0], ["poner aleros para el sol de verano", 0],
     ["ventanas con rendijas", 1], ["un tejado sin aislamiento", 1], ["calefacción con las ventanas abiertas", 1]]),
  agricultura: bank(x => `${cap(x)}: ¿práctica sostenible o no sostenible?`, ["Sostenible", "No sostenible"], ["Cuida suelo, agua y biodiversidad.", "Los agota o contamina."],
    [["dejar cubierta vegetal entre los olivos", 0], ["riego por goteo con sensores", 0], ["rotar los cultivos", 0], ["setos y flores para polinizadores", 0], ["usar mariquitas contra el pulgón", 0],
     ["abonar en exceso con nitratos", 1], ["regar a manta en pleno verano", 1], ["arar en pendiente a favor de la cuesta", 1], ["sobreexplotar el acuífero", 1]]),
  pesca: bank(x => `${cap(x)}: ¿pesca sostenible o no sostenible?`, ["Sostenible", "No sostenible"], ["Permite que los peces se recuperen.", "Agota la población o daña el mar."],
    [["respetar la talla mínima", 0], ["cumplir las vedas", 0], ["crear reservas marinas", 0], ["elegir pescado con sello sostenible", 0], ["capturar alevines (peces muy jóvenes)", 1],
     ["arrastre de fondo sobre praderas de posidonia", 1], ["superar las cuotas", 1], ["pescar en época de reproducción", 1]]),
  pp_q: (c, s, y) => `El CO₂ de la atmósfera es de ${c} ppm y sube ${n(s)} ppm al año. ¿Cuánto será dentro de ${y} años?`,
  pp_s: (c, s, y, r) => `${c} + ${n(s)} × ${y} = <b>${n(r)}</b> ppm`,
  ve_q: (h, v) => `Una ciudad de ${m(h)} habitantes tiene ${m(v)} m² de zonas verdes. ¿Cuántos m² de zona verde hay por habitante?`,
  ve_s: (h, v, k) => `${m(v)} ÷ ${m(h)} = <b>${k}</b> m²/hab ${k >= 9 ? "(supera los 9 recomendados)" : "(por debajo de 9)"}`,
  medios: [["coche", 150], ["autobús", 30], ["moto", 90], ["tren", 20]],
  an_q: (km, d, md, g) => `Alguien va ${km} km (solo ida) en ${md} (${g} g de CO₂/km), ida y vuelta, ${d} días al año. ¿Cuántos kg de CO₂ emite al año?`,
  an_s: (km, d, g, kg) => `${km} × 2 × ${d} × ${g} ÷ 1000 = <b>${n(kg)}</b> kg`,
});
})();
