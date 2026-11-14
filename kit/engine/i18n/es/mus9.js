/* WikiAula — textos y bancos de gen/mus9.js (Música, Grado 9), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus9 = G.mus9 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(+x.toFixed(2)).replace(".", ",");
const mil = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
Object.assign(S, {
  antigua: bank(x => `${cap(x)}: ¿de qué época es?`, ["Edad Media", "Renacimiento", "Barroco"], ["Siglos XII–XV.", "Siglos XV–XVI.", "Siglos XVII–XVIII."],
    [["el Códice Calixtino", 0], ["las Cantigas de Santa María", 0], ["el Llibre Vermell de Montserrat", 0], ["Tomás Luis de Victoria", 1], ["los vihuelistas como Luis de Milán", 1],
     ["Antonio de Cabezón", 1], ["el Cancionero de Palacio con Juan del Encina", 1], ["Gaspar Sanz y la guitarra de cinco órdenes", 2], ["el organista Juan Cabanilles", 2]]),
  moderna: bank(x => `${cap(x)}: ¿qué compositor o corriente es?`, ["Zarzuela", "Nacionalismo", "Siglo XX"],
    ["Teatro musical español del XIX.", "Folclore en la música culta.", "Generación del 27, Rodrigo, vanguardias."],
    [["La Gran Vía, de Chueca", 0], ["el género chico madrileño", 0], ["Barbieri y Chapí", 0], ["Iberia, de Albéniz", 1], ["Goyescas, de Granados", 1], ["El amor brujo, de Falla", 1],
     ["el Concierto de Aranjuez", 2], ["la Generación del 51", 2], ["los hermanos Halffter de la Generación del 27", 2]]),
  actual: bank(x => `${cap(x)}: ¿qué corriente es?`, ["Rumba catalana", "Rock andaluz", "Movida madrileña", "Nuevo flamenco", "Músicas urbanas"],
    ["Flamenco y ritmos cubanos.", "Rock con flamenco, años 70.", "Pop y punk, años 80.", "Flamenco con jazz, pop, rock.", "Rap, trap, reguetón."],
    [["flamenco mezclado con ritmos cubanos en Barcelona", 0], ["guitarras eléctricas y palos flamencos en Sevilla en los 70", 1], ["pop, punk y nueva ola en el Madrid de los 80", 2],
     ["flamenco fusionado con jazz y pop", 3], ["rap y trap en el siglo XXI", 4], ["palmas, guitarra y ritmo cubano en los años 60", 0],
     ["grupos de pop y punk que nacen en la libertad de los 80", 2], ["un cantaor que graba con un trío de jazz", 3], ["reguetón y trap escuchados por streaming", 4]]),
  estudio: bank(x => `Quieres ${x}. ¿Qué herramienta usas?`, ["Ecualizador", "Panorama", "Compresor", "Reverberación", "Masterización"],
    ["Graves, medios, agudos.", "Izquierda-derecha.", "Igualar fuertes y suaves.", "Eco de sala.", "Ajuste final."],
    [["quitar graves molestos a una voz", 0], ["dar más brillo a los platillos", 0], ["poner la guitarra a la izquierda", 1], ["colocar el piano a la derecha", 1],
     ["que la voz no tenga subidas bruscas de volumen", 2], ["que la voz suene como en una catedral", 3], ["dar el volumen final al disco antes de publicarlo", 4]]),
  formato: bank(x => `${cap(x)}: ¿qué tipo de formato es?`, ["Sin compresión", "Compresión sin pérdida", "Compresión con pérdida"],
    ["Grande, máxima calidad.", "Más pequeño, sonido exacto.", "Muy pequeño, algo menos de calidad."],
    [["WAV", 0], ["AIFF", 0], ["FLAC", 1], ["ALAC", 1], ["MP3", 2], ["AAC", 2], ["OGG", 2]]),
  salud: bank(x => `${cap(x)}: ¿cuida o perjudica?`, ["Cuida", "Perjudica"], ["Protege oído, cuerpo o mente.", "Riesgo para la salud."],
    [["usar tapones en un concierto", 0], ["calentar antes de tocar", 0], ["respirar hondo antes de salir al escenario", 0], ["cantar en grupo en una residencia", 0],
     ["auriculares al máximo durante horas", 1], ["tocar tres horas sin pausa con mala postura", 1], ["ponerse junto a los altavoces en una discoteca", 1]]),
  derechos: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["en España, los derechos duran hasta 70 años después de la muerte del autor", 0], ["los derechos morales no se pueden vender", 0], ["las obras de Beethoven están en dominio público", 0],
     ["la SGAE es una entidad de gestión", 0], ["una licencia CC BY obliga a citar al autor", 0], ["si algo está en internet, se puede usar sin permiso", 1],
     ["copiar una melodía y firmarla como tuya es legal", 1], ["los derechos de autor duran solo 5 años", 1]]),
  cancion: bank(x => `${cap(x)}: ¿qué parte de la canción es?`, ["Intro", "Estrofa", "Estribillo", "Puente"],
    ["El comienzo instrumental.", "Cuenta la historia; letra cambia.", "Se repite igual; el gancho.", "Sección distinta antes del final."],
    [["los cuatro compases instrumentales del principio", 0], ["la parte que cuenta la historia y cambia de letra", 1], ["la segunda vez que la letra avanza la historia", 1],
     ["la parte más pegadiza que se repite igual", 2], ["donde está el gancho", 2], ["una sección nueva antes del último estribillo", 3]]),
  profesion: bank(x => `${cap(x)}: ¿qué profesión es?`, ["Luthier", "Productor musical", "Técnico de sonido", "Musicoterapeuta", "Musicólogo"],
    ["Construye instrumentos.", "Dirige la grabación de un disco.", "Graba, mezcla, sonoriza.", "Usa la música para la salud.", "Investiga la historia de la música."],
    [["construye y repara guitarras", 0], ["barniza un violín nuevo", 0], ["decide cómo debe sonar el disco", 1], ["controla la mesa en un concierto", 2], ["mezcla las pistas en el estudio", 2],
     ["trabaja con personas con alzhéimer", 3], ["estudia manuscritos medievales", 4]]),
  mu_q: (fs, s, ch) => `¿Cuántas muestras hay en ${s} s de audio ${ch === 2 ? "estéreo" : "mono"} a ${mil(fs)} Hz?`,
  mu_s: (fs, s, ch, n_) => `${mil(fs)} × ${s} × ${ch} = <b>${mil(n_)}</b> muestras`,
  by_q: (fs, s, ch, b) => `¿Cuántos kilobytes ocupan ${s} s de audio ${ch === 2 ? "estéreo" : "mono"} a ${mil(fs)} Hz y ${b} bits, sin comprimir? (kB, 1 kB = 1000 bytes)`,
  by_s: (n_, b, kb) => `${mil(n_)} muestras × ${b} ÷ 8 = ${mil(n_ * b / 8)} bytes ≈ <b>${n(kb)}</b> kB`,
  bi_q: (k, s) => `¿Cuántos kB ocupa un audio de ${s} s a ${k} kbps?`,
  bi_s: (k, s) => `${k} × ${s} ÷ 8 = <b>${k * s / 8}</b> kB`,
});
})();
