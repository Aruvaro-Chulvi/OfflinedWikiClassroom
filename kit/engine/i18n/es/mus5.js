/* WikiAula — textos y bancos de gen/mus5.js (Música, Grado 5), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus5 = G.mus5 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const ORD = { 2: "2.ª", 3: "3.ª", 4: "4.ª", 5: "5.ª", 6: "6.ª", 7: "7.ª", 8: "8.ª (octava)" };
Object.assign(S, {
  tono: bank(x => `Entre ${x}, ¿hay un tono o un semitono?`, ["Tono", "Semitono"], ["Hay una tecla negra en medio.", "Teclas seguidas, sin negra en medio."],
    [["do y re", 0], ["re y mi", 0], ["fa y sol", 0], ["sol y la", 0], ["la y si", 0], ["mi y fa", 1], ["si y do", 1], ["fa y fa sostenido", 1], ["si bemol y si", 1]]),
  alteracion: bank(x => `${cap(x)}: ¿qué alteración es?`, ["Sostenido", "Bemol", "Becuadro"], ["Sube un semitono.", "Baja un semitono.", "Anula la alteración."],
    [["sube la nota un semitono", 0], ["el signo ♯", 0], ["convierte fa en la tecla negra de su derecha", 0], ["baja la nota un semitono", 1], ["el signo ♭", 1],
     ["convierte si en la tecla negra de su izquierda", 1], ["devuelve la nota a natural", 2], ["el signo ♮", 2]]),
  voz: bank(x => `${cap(x)}: ¿qué tipo de voz es?`, ["Soprano", "Contralto", "Tenor", "Bajo"],
    ["La más aguda de mujer.", "La más grave de mujer.", "La más aguda de hombre.", "La más grave de hombre."],
    [["la voz femenina más aguda", 0], ["la S de SATB", 0], ["la voz femenina más grave", 1], ["la A (alto) de SATB", 1], ["la voz masculina más aguda", 2],
     ["el héroe de muchas óperas", 2], ["la voz masculina más grave", 3], ["la B de SATB", 3]]),
  agrupacion: bank(x => `${cap(x)}: ¿qué agrupación es?`, ["Cuarteto de cuerda", "Banda", "Orquesta", "Coro", "Big band"],
    ["Dos violines, viola y violonchelo.", "Viento y percusión, desfila.", "Cuerda, viento y percusión.", "Voces.", "Grupo grande de jazz."],
    [["dos violines, una viola y un violonchelo", 0], ["clarinetes, trompetas, tubas y bombo desfilando en la procesión", 1], ["violines, flautas, trompas y timbales juntos", 2],
     ["sopranos, contraltos, tenores y bajos", 3], ["saxofones, trompetas, trombones, piano y batería tocando swing", 4]]),
  epoca: bank(x => `${cap(x)}: ¿Barroco o Clasicismo?`, ["Barroco", "Clasicismo"], ["1600–1750: adorno, bajo continuo, clave.", "1750–1820: equilibrio, sinfonía, piano."],
    [["el bajo continuo con clave", 0], ["Vivaldi", 0], ["Händel y su «Aleluya»", 0], ["el nacimiento de la ópera", 0], ["la sinfonía de Haydn", 1], ["Mozart", 1],
     ["el piano sustituye al clave", 1], ["melodías equilibradas y claras", 1]]),
  soporte: bank(x => `${cap(x)}: ¿soporte analógico o digital?`, ["Analógico", "Digital"], ["El sonido se graba como una forma continua.", "El sonido se guarda como números."],
    [["el cilindro del fonógrafo", 0], ["el disco de vinilo", 0], ["el casete", 0], ["el disco de gramófono", 0], ["el CD", 1], ["un archivo MP3", 1], ["el streaming", 1],
     ["la memoria de un móvil", 1]]),
  decibelio: bank(x => `${cap(x)}: ¿cómo es para el oído?`, ["Tranquilo", "Molesto", "Peligroso"], ["Menos de 60 dB.", "Entre 60 y 85 dB.", "Más de 85 dB mucho rato."],
    [["un susurro (30 dB)", 0], ["una biblioteca (40 dB)", 0], ["una conversación (60 dB)", 1], ["un comedor escolar ruidoso (80 dB)", 1], ["tráfico intenso (85 dB)", 1],
     ["un concierto de rock (110 dB)", 2], ["auriculares a tope (105 dB)", 2], ["un petardo cerca (130 dB)", 2]]),
  in_q: (a, b, up, oct) => `¿Qué intervalo hay de ${a} a ${b}${oct ? " (la siguiente con el mismo nombre)" : ""}, ${up ? "subiendo" : "bajando"}? (número)`,
  in_s: (seq, k) => `${seq.join(", ")}: ${k} notas → <b>${ORD[k]}</b>`,
  cu_q: (g, k) => `En un festival tocan ${k} grupos, cada uno es ${g}. ¿Cuántos músicos hay en total?`,
  cu_s: (m, k) => `${k} × ${m} = <b>${k * m}</b> músicos`,
});
})();
