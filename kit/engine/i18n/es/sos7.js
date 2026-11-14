/* WikiAula — textos y bancos de gen/sos7.js (Desarrollo sostenible, Grado 7), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sos7 = G.sos7 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const m = x => x.toLocaleString("es-ES").replace(/\./g, " ");
const ODS = ["1 Fin de la pobreza", "2 Hambre cero", "3 Salud y bienestar", "4 Educación de calidad", "5 Igualdad de género", "6 Agua limpia", "7 Energía limpia",
             "8 Trabajo decente", "9 Industria e innovación", "10 Menos desigualdades", "11 Ciudades sostenibles", "12 Consumo responsable", "13 Acción por el clima",
             "14 Vida submarina", "15 Vida terrestre", "16 Paz y justicia", "17 Alianzas"];
Object.assign(S, {
  esfera: bank(x => `${cap(x)}: ¿a qué esfera de la Tierra pertenece?`, ["Geosfera", "Hidrosfera", "Atmósfera", "Biosfera", "Antroposfera"],
    ["Rocas y suelo.", "Agua.", "Gases.", "Seres vivos.", "Lo humano."],
    [["una montaña", 0], ["el suelo de un campo", 0], ["un volcán", 0], ["un glaciar", 1], ["un acuífero", 1], ["el océano", 1], ["el ozono", 2], ["el viento", 2], ["un bosque de hayas", 3],
     ["los corales", 3], ["una autopista", 4], ["una ciudad", 4], ["una fábrica", 4]]),
  limite: bank(x => `${cap(x)}: ¿con qué límite planetario se relaciona sobre todo?`, ["Cambio climático", "Biodiversidad", "Nitrógeno y fósforo", "Uso del suelo", "Agua dulce",
    "Acidificación del océano", "Capa de ozono", "Nuevas entidades"],
    ["CO₂ y temperatura.", "Extinción de especies.", "Abonos.", "Deforestación.", "Ríos y acuíferos.", "CO₂ disuelto en el mar.", "CFC.", "Plásticos y químicos."],
    [["las emisiones de CO₂ de los coches", 0], ["la extinción de anfibios", 1], ["exceso de abonos que llega a una laguna", 2], ["talar la Amazonía para pastos", 3],
     ["secar acuíferos para regar", 4], ["corales que no pueden formar su esqueleto", 5], ["los antiguos aerosoles con CFC", 6], ["microplásticos en todos los océanos", 7],
     ["miles de sustancias químicas nuevas sin estudiar", 7]]),
  aguacons: bank(x => `${cap(x)}: ¿huella hídrica alta o baja?`, ["Alta", "Baja"], ["Mucha agua virtual.", "Poca agua virtual."],
    [["un filete de vaca", 0], ["unos vaqueros", 0], ["una camiseta de algodón", 0], ["un kilo de arroz", 0], ["un tomate", 1], ["una manzana", 1], ["un vaso de agua del grifo", 1],
     ["una lechuga", 1]]),
  suelo: bank(x => `${cap(x)}: ¿protege el suelo o lo degrada?`, ["Protege", "Degrada"], ["Evita la erosión y mantiene la fertilidad.", "Favorece la erosión o la pérdida de fertilidad."],
    [["reforestar con especies autóctonas", 0], ["construir terrazas en una ladera", 0], ["no arar y dejar los restos vegetales", 0], ["hacer compost", 0], ["el sobrepastoreo", 1],
     ["un incendio forestal", 1], ["dejar el suelo desnudo en pendiente", 1], ["sobreexplotar los acuíferos", 1]]),
  mineral: bank(x => `${cap(x)}: ¿para qué se usa sobre todo?`, ["Baterías", "Cables eléctricos", "Chips y placas solares", "Condensadores de móviles", "Contactos electrónicos"],
    ["Litio y cobalto.", "Cobre.", "Silicio.", "Tantalio (coltán).", "Oro."],
    [["el litio", 0], ["el cobalto", 0], ["el cobre", 1], ["el silicio", 2], ["el coltán", 3], ["el oro", 4]]),
  renovable: bank(x => `${cap(x)}: ¿qué fuente renovable es?`, ["Solar", "Eólica", "Hidráulica", "Biomasa", "Geotérmica"],
    ["Luz del sol.", "Viento.", "Agua embalsada.", "Restos vegetales.", "Calor de la Tierra."],
    [["placas en el tejado que solo producen de día", 0], ["paneles que convierten la luz en electricidad", 0], ["aerogeneradores en una sierra", 1], ["molinos en el mar", 1],
     ["una presa con turbinas", 2], ["centrales de bombeo que almacenan energía", 2], ["una caldera de restos de poda", 3], ["quemar huesos de aceituna", 3],
     ["aprovechar el calor del subsuelo en Islandia", 4]]),
  etiqueta: bank(x => `${cap(x)}: ¿es más o menos eficiente?`, ["Más eficiente", "Menos eficiente"], ["Gasta menos energía.", "Gasta más energía."],
    [["un frigorífico de clase A", 0], ["una bombilla LED", 0], ["una lavadora de clase B", 0], ["un frigorífico de clase F", 1], ["una bombilla incandescente", 1], ["un horno de clase G", 1]]),
  circular: bank(x => `${cap(x)}: ¿economía lineal o circular?`, ["Lineal", "Circular"], ["Usar y tirar.", "Mantener productos y materiales en uso."],
    [["comprar, usar una vez y tirar", 0], ["un móvil imposible de abrir y reparar", 0], ["ropa de mala calidad que dura una temporada", 0], ["tirar un aparato que tenía arreglo", 0],
     ["un móvil con batería que se cambia fácil", 1], ["alquilar herramientas en vez de comprarlas", 1], ["usar el calor sobrante de una fábrica para un invernadero", 1],
     ["vender ropa de segunda mano", 1], ["fabricar botellas nuevas con PET reciclado", 1]]),
  plastico: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Coincide con los datos.", "No es correcto."],
    [["casi la mitad del plástico se usa para envases", 0], ["solo una pequeña parte del plástico fabricado se ha reciclado", 0], ["hay muchos tipos de plástico que no se pueden mezclar", 0],
     ["todo el plástico se recicla fácilmente", 1], ["los bioplásticos siempre se degradan en el campo", 1], ["reciclar es mejor que reducir", 1]]),
  ods: bank(x => `${cap(x)}: ¿con qué ODS se relaciona más?`, ODS, ODS.map(o => o.replace(/^\d+ /, "") + "."),
    [["acabar con la pobreza extrema", 0], ["comedores para quien no tiene qué comer", 1], ["vacunas para todos", 2], ["becas para estudiar", 3], ["igual sueldo para mujeres y hombres", 4],
     ["depurar las aguas residuales", 5], ["placas solares en una escuela rural", 6], ["contratos dignos y sin explotación", 7], ["internet de alta velocidad en zonas rurales", 8],
     ["reducir la diferencia entre ricos y pobres", 9], ["un carril bici en la ciudad", 10], ["comprar menos y reparar más", 11], ["reducir las emisiones de CO₂", 12],
     ["limpiar plásticos del mar", 13], ["proteger los bosques", 14], ["tribunales justos y sin corrupción", 15], ["países que cooperan para financiar proyectos", 16]]),
  campana: bank(x => `«${x}». ¿Qué elemento de la campaña es?`, ["Objetivo", "Público", "Mensaje", "Canal", "Evaluación"],
    ["Qué queremos conseguir, medible.", "A quién va dirigida.", "Lo que decimos: eslogan y dato.", "Por dónde lo difundimos.", "Medir antes y después."],
    [["Reducir un 30 % el papel tirado en dos meses", 0], ["Que la mitad de la clase venga andando", 0], ["Alumnos de 1.º de ESO", 1], ["Las familias del centro", 1],
     ["Apaga la luz, enciende el futuro", 2], ["El 80 % ya trae botella reutilizable, ¿y tú?", 2], ["Carteles en los pasillos", 3], ["La radio del instituto", 3],
     ["Pesar el papel antes y después de la campaña", 4]]),
  productos: [["carne de vaca", 15000, "kg"], ["pollo", 4300, "kg"], ["arroz", 2500, "kg"], ["trigo", 1500, "kg"], ["tomates", 200, "kg"], ["camisetas de algodón", 2700, "unidad"],
              ["tazas de café", 140, "unidad"], ["vaqueros", 8000, "unidad"]],
  hh_q: (p, l, u, q) => u === "kg" ? `Producir 1 kg de ${p} requiere unos ${m(l)} L de agua. ¿Cuántos litros hay en ${n(q)} kg?` :
    `${cap(p)}: producir cada unidad requiere unos ${m(l)} L de agua. ¿Cuántos litros hacen falta para ${q} ${q === 1 ? "unidad" : "unidades"}?`,
  hh_s: (q, l, t) => `${n(q)} × ${m(l)} = <b>${m(t)}</b> L`,
  aparatos: [["una estufa", 1500], ["un secador", 2000], ["un ordenador", 200], ["un televisor", 120], ["un horno", 2500], ["una consola", 150], ["un aire acondicionado", 1000]],
  co_q1: (a, w, h) => `${cap(a)} de ${w} W funciona ${h} ${h === 1 ? "hora" : "horas"}. ¿Cuántos kWh gasta?`,
  co_s1: (w, h, e) => `${w} × ${h} ÷ 1000 = <b>${n(e)}</b> kWh`,
  co_q2: (a, w, h) => `${cap(a)} de ${w} W funciona ${h} ${h === 1 ? "hora" : "horas"}. Si el kWh cuesta 0,15 €, ¿cuántos euros cuesta?`,
  co_s2: (w, h, e, c) => `${w} × ${h} ÷ 1000 = ${n(e)} kWh; ${n(e)} × 0,15 = <b>${window.WA.MATH.eur(c, window.WA.H)}</b> €`,
  pc_q: (t, r) => `De ${m(t)} kg de plástico recogido se reciclan ${m(r)} kg. ¿Qué porcentaje se recicla?`,
  pc_s: (t, r, p) => `${m(r)} ÷ ${m(t)} × 100 = <b>${p} %</b>`,
});
})();
