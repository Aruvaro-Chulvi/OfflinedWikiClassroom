/* WikiAula — textos y bancos de gen/mus7.js (Música, Grado 7), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus7 = G.mus7 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(+x.toPrecision(6)).replace(".", ",");
Object.assign(S, {
  parametro: bank(x => `${cap(x)}: ¿qué cualidad del sonido cambia?`, ["Altura", "Intensidad", "Duración", "Timbre"],
    ["Frecuencia (Hz).", "Amplitud (dB).", "Tiempo.", "Armónicos."],
    [["la frecuencia pasa de 440 a 880 Hz", 0], ["el afinador marca 445 Hz en lugar de 440", 0], ["la amplitud de la onda se duplica", 1], ["el sonómetro pasa de 60 a 80 dB", 1],
     ["la nota se mantiene 4 segundos en vez de 1", 2], ["una flauta y un oboe tocan el mismo la", 3], ["cambian los armónicos aunque la nota es la misma", 3]]),
  ritmo: bank(x => `${cap(x)}: ¿qué recurso rítmico es?`, ["Anacrusa", "Síncopa", "Contratiempo", "Compás compuesto"],
    ["Empieza antes del primer tiempo fuerte.", "De parte débil a fuerte, prolongada.", "Silencio en la fuerte, nota en la débil.", "Tiempo dividido en tres."],
    [["la melodía empieza con dos notas antes del primer compás completo", 0], ["un compás incompleto al principio", 0], ["corchea-negra-corchea: la negra desplaza el acento", 1],
     ["una nota empieza en parte débil y se alarga a la fuerte", 1], ["silencio de corchea y corchea en cada tiempo", 2], ["el 6/8", 3], ["el 12/8 del blues lento", 3]]),
  escala: bank(x => `${cap(x)}: ¿qué escala es?`, ["Mayor", "Menor natural", "Pentatónica"], ["T T S T T T S.", "T S T T S T T.", "Cinco notas, sin semitonos."],
    [["do-re-mi-fa-sol-la-si-do", 0], ["el patrón T T S T T T S", 0], ["la-si-do-re-mi-fa-sol-la", 1], ["el patrón T S T T S T T", 1], ["do-re-mi-sol-la", 2],
     ["las cinco teclas negras del piano", 2]]),
  textura: bank(x => `${cap(x)}: ¿qué textura es?`, ["Monodia", "Homofonía", "Polifonía", "Melodía acompañada"],
    ["Una sola melodía.", "Voces con el mismo ritmo, en acordes.", "Melodías independientes.", "Melodía principal y acompañamiento."],
    [["canto gregoriano", 0], ["todo el estadio canta la misma melodía", 0], ["un coral: las cuatro voces cantan acordes con el mismo ritmo", 1], ["un himno cantado en bloque a cuatro voces", 1],
     ["un canon a tres voces", 2], ["una fuga de Bach", 2], ["una cantante con su guitarra", 3], ["una canción pop con banda", 3]]),
  forma: bank(x => `${cap(x)}: ¿qué forma o principio es?`, ["Repetición", "Contraste", "Variación", "Forma sonata"],
    ["A A: unidad.", "A B: variedad.", "A A' A'': cambiado.", "Exposición, desarrollo, reexposición."],
    [["volver a tocar el estribillo igual", 0], ["la sección A suena dos veces seguidas", 0], ["aparece un tema nuevo, B, muy diferente", 1], ["tras una parte lenta llega una rápida", 1],
     ["el tema vuelve con otro ritmo y otra armonía", 2], ["doce versiones distintas de la misma canción infantil", 2], ["dos temas que se exponen, se desarrollan y vuelven", 3]]),
  organologia: bank(x => `${cap(x)}: ¿qué tipo de instrumento es?`, ["Idiófono", "Membranófono", "Cordófono", "Aerófono", "Electrófono"],
    ["Vibra el cuerpo.", "Vibra una membrana.", "Vibra una cuerda.", "Vibra el aire.", "Sonido electrónico."],
    [["las castañuelas", 0], ["el xilófono", 0], ["los platillos", 0], ["el timbal", 1], ["el pandero", 1], ["el piano", 2], ["el violín", 2], ["el sitar", 2], ["el órgano de tubos", 3],
     ["la gaita", 3], ["el didgeridoo", 3], ["el sintetizador", 4], ["el theremín", 4]]),
  voz: bank(x => `${cap(x)}: ¿qué parte del aparato fonador interviene sobre todo?`, ["Respiración", "Fonación", "Resonancia y articulación"],
    ["Pulmones y diafragma.", "Cuerdas vocales en la laringe.", "Boca, nariz, lengua y labios."],
    [["el diafragma empuja el aire", 0], ["los pulmones se llenan de aire", 0], ["vibran las cuerdas vocales", 1], ["la laringe produce el sonido", 1], ["la lengua forma las palabras", 2],
     ["la nariz y la boca amplifican el sonido", 2], ["los labios articulan la «p»", 2]]),
  audicion: bank(x => `«${x}»: ¿qué apartado de la ficha de audición es?`, ["Timbre", "Textura", "Dinámica", "Forma", "Tempo"],
    ["Qué instrumentos o voces.", "Cómo se combinan las líneas.", "Fuerte o suave.", "Secciones.", "Velocidad."],
    [["suenan un violín solista y una orquesta de cuerda", 0], ["canta un coro de voces mixtas", 0], ["una melodía con acompañamiento de acordes", 1], ["varias melodías independientes a la vez", 1],
     ["empieza piano y crece hasta fortissimo", 2], ["A B A con una coda", 3], ["estrofa, estribillo, estrofa, estribillo", 3], ["allegro, unos 130 ppm", 4]]),
  crear: bank(x => `Para ${x}, ¿qué herramienta usas?`, ["Editor de partituras", "DAW", "Teclado MIDI", "Bucles"],
    ["Escribir notas en pentagrama.", "Grabar, editar y mezclar pistas.", "Controlar instrumentos virtuales.", "Bases rítmicas que se repiten."],
    [["escribir la partitura de tu melodía", 0], ["imprimir las partes de cada instrumento", 0], ["grabar tu voz y mezclarla con la guitarra", 1], ["cortar y ajustar pistas de audio", 1],
     ["tocar notas que suenan con un piano virtual", 2], ["enviar «qué nota y con qué fuerza» al ordenador", 2], ["crear una base de batería que se repite", 3]]),
  oc_q: (f0, o, up) => `Un sonido vibra a ${f0} Hz. ¿A qué frecuencia vibra la misma nota ${o === 1 ? "una octava" : "dos octavas"} más ${up ? "aguda" : "grave"}? (Hz)`,
  oc_s: (f0, o, up, a) => `${up ? "Se multiplica" : "Se divide"} por ${2 ** o}: ${f0} ${up ? "×" : "÷"} ${2 ** o} = <b>${n(a)}</b> Hz`,
  pe_q: f0 => `¿Cuál es el periodo de una onda de ${f0} Hz? (en segundos)`,
  pe_s: f0 => `T = 1 ÷ ${f0} = <b>${n(1 / f0)}</b> s`,
  ar_q: (f0, h) => `La fundamental de una nota es ${f0} Hz. ¿A qué frecuencia está su armónico número ${h}? (Hz)`,
  ar_s: (f0, h) => `${h} × ${f0} = <b>${h * f0}</b> Hz`,
  tr_q: t => `Ves un rayo y oyes el trueno ${t} s después. ¿A cuántos metros está la tormenta? (sonido: 340 m/s)`,
  tr_s: t => `340 × ${t} = <b>${340 * t}</b> m`,
  in_q: (a, b) => `¿Qué intervalo hay de ${a} a ${b}, subiendo? (número)`,
  in_s: (seq, k) => `${seq.join(", ")}: <b>${k}</b> notas`,
});
})();
