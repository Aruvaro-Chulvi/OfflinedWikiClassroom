/* WikiAula — textos y bancos de gen/mus6.js (Música, Grado 6), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus6 = G.mus6 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const FIG = ["blanca", "negra", "corchea", "semicorchea"], VAL = ["2", "1", "½", "¼"];
Object.assign(S, {
  acorde: bank(x => `Las notas ${x}: ¿qué acorde forman?`, ["Do mayor", "Fa mayor", "Sol mayor", "La menor", "Re menor", "Mi menor"],
    ["do-mi-sol.", "fa-la-do.", "sol-si-re.", "la-do-mi.", "re-fa-la.", "mi-sol-si."],
    [["do, mi, sol", 0], ["C en cifrado americano", 0], ["fa, la, do", 1], ["F en cifrado americano", 1], ["sol, si, re", 2], ["G en cifrado americano", 2], ["la, do, mi", 3],
     ["re, fa, la", 4], ["mi, sol, si", 5]]),
  modo: bank(x => `${cap(x)}: ¿mayor o menor?`, ["Mayor", "Menor"], ["Luminoso; tercera de dos tonos.", "Más oscuro; tercera de tono y medio."],
    [["el acorde do-mi-sol", 0], ["la canción de cumpleaños", 0], ["una tercera de dos tonos", 0], ["el acorde fa-la-do", 0], ["el acorde la-do-mi", 1],
     ["una tercera de tono y medio", 1], ["la escala de teclas blancas que empieza en la", 1], ["el acorde re-fa-la", 1]]),
  compas: bank(x => `${cap(x)}: ¿compás simple o compuesto?`, ["Simple", "Compuesto"], ["El tiempo se divide en dos.", "El tiempo se divide en tres."],
    [["el 2/4", 0], ["el 3/4", 0], ["el 4/4", 0], ["una marcha con corcheas de dos en dos", 0], ["el 6/8", 1], ["una tarantela", 1], ["una barcarola que se balancea", 1],
     ["tiempos de tres corcheas", 1]]),
  epoca: bank(x => `${cap(x)}: ¿a qué corriente pertenece?`, ["Romanticismo", "Nacionalismo", "Impresionismo", "Vanguardias del siglo XX"],
    ["Sentimientos, gran orquesta, piano.", "Folclore del propio país.", "Sonidos como manchas de color.", "Ritmos y sonidos nuevos."],
    [["Chopin y sus nocturnos para piano", 0], ["las óperas de Verdi", 0], ["Albéniz y su Iberia", 1], ["Falla y El amor brujo", 1], ["Debussy", 2],
     ["una música que pinta el mar como un cuadro", 2], ["La consagración de la primavera, de Stravinski", 3], ["la música electrónica de los años 50", 3]]),
  estilo: bank(x => `${cap(x)}: ¿qué estilo es?`, ["Jazz", "Rock and roll", "Pop", "Hip hop"],
    ["Improvisación, swing.", "Guitarra eléctrica, años 50.", "Canciones pegadizas.", "Rap sobre bases."],
    [["improvisar solos sobre los acordes", 0], ["Louis Armstrong", 0], ["Elvis Presley", 1], ["guitarras eléctricas y baile en los años 50", 1],
     ["una canción pegadiza con estribillo para la radio", 2], ["un éxito comercial de estrofa y estribillo", 2], ["letras recitadas con ritmo", 3], ["el rap", 3]]),
  cine: bank(x => `${cap(x)}: ¿qué recurso es?`, ["Leitmotiv", "Música diegética", "Música incidental", "Efecto de sonido"],
    ["Tema de un personaje.", "La oyen los personajes.", "Solo la oye el espectador.", "Pasos, puertas, golpes."],
    [["el tema que suena siempre que aparece el villano", 0], ["dos notas graves que anuncian al tiburón", 0], ["una banda toca en la boda de la película", 1],
     ["la canción de la radio que escucha el protagonista", 1], ["violines tristes mientras llueve, sin músicos en la escena", 2], ["música de tensión en una persecución", 2],
     ["el ruido de pasos grabado en un estudio", 3], ["un portazo", 3]]),
  mundo: bank(x => `${cap(x)}: ¿de dónde es?`, ["India", "África occidental", "Australia", "Japón", "Andes", "Caribe"],
    ["Sitar.", "Yembé.", "Didgeridoo.", "Koto.", "Charango.", "Steelpan."],
    [["el sitar", 0], ["el yembé", 1], ["el didgeridoo", 2], ["el koto", 3], ["el charango", 4], ["el steelpan", 5]]),
  fi_q: idx => `¿Cuántos tiempos suman? ${idx.map(i => FIG[i]).join(" + ")}`,
  fi_s: (idx, tot) => `${idx.map(i => VAL[i]).join(" + ")} = <b>${n(tot)}</b> tiempos`,
});
})();
