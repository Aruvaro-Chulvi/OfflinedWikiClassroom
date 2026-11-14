/* WikiAula — textos y bancos de gen/mus8.js (Música, Grado 8), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus8 = G.mus8 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const ROM = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
Object.assign(S, {
  antiguedad: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["se han encontrado flautas de hueso de más de 40 000 años", 0], ["para los griegos la música unía sonido, poesía y danza", 0], ["Pitágoras relacionó los intervalos con proporciones", 0],
     ["el aulós era un instrumento de viento doble", 0], ["los romanos usaban un órgano hidráulico", 0], ["la lira era un instrumento de viento", 1],
     ["en Grecia no existía el coro", 1], ["la octava corresponde a la proporción 1:3", 1]]),
  medieval: bank(x => `${cap(x)}: ¿gregoriano, polifonía o música profana?`, ["Canto gregoriano", "Polifonía", "Música profana"],
    ["Monodia en latín, sin instrumentos.", "Varias voces a la vez.", "Trovadores, juglares, cantigas."],
    [["una melodía en latín cantada por monjes sin instrumentos", 0], ["neumas sobre un tetragrama para la liturgia", 0], ["obras a tres y cuatro voces de Notre Dame", 1],
     ["el Ars Nova del siglo XIV", 1], ["un trovador canta al amor en una corte", 2], ["las Cantigas de Santa María", 2], ["un juglar canta hazañas en la plaza", 2]]),
  renacimiento: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["en el Renacimiento triunfa la polifonía vocal", 0], ["la imprenta musical ayudó a difundir partituras", 0], ["Tomás Luis de Victoria compuso música religiosa", 0],
     ["la vihuela era un instrumento español de cuerda", 0], ["el madrigal era música profana", 0], ["el Renacimiento inventó la guitarra eléctrica", 1],
     ["en el Renacimiento se buscaba que el texto no se entendiera", 1], ["Juan del Encina compuso óperas barrocas", 1]]),
  genero: bank(x => `${cap(x)}: ¿qué género o forma es?`, ["Ópera", "Concierto", "Fuga", "Sinfonía", "Lied", "Poema sinfónico"],
    ["Teatro cantado.", "Solista y orquesta.", "Imitación de un sujeto.", "Orquesta, cuatro movimientos.", "Voz y piano sobre un poema.", "La orquesta cuenta una historia."],
    [["L'Orfeo de Monteverdi", 0], ["La flauta mágica", 0], ["Las cuatro estaciones de Vivaldi", 1], ["un violín solista dialoga con la orquesta", 1], ["un sujeto que imitan las voces una tras otra", 2],
     ["la especialidad de Bach al órgano", 2], ["una obra orquestal en cuatro movimientos", 3], ["la «Sorpresa» de Haydn", 3], ["El rey de los elfos, de Schubert", 4],
     ["una canción para voz y piano", 4], ["El Moldava, de Smetana", 5]]),
  compositor: bank(x => `${cap(x)}: ¿de qué época es?`, ["Barroco", "Clasicismo", "Romanticismo", "Siglo XX"],
    ["1600–1750.", "1750–1820.", "Siglo XIX.", "Vanguardias y más."],
    [["Bach", 0], ["Vivaldi", 0], ["Händel", 0], ["Haydn", 1], ["Mozart", 1], ["Boccherini", 1], ["Chopin", 2], ["Schubert", 2], ["Verdi", 2], ["Albéniz", 2], ["Schönberg", 3],
     ["Steve Reich", 3], ["Joaquín Rodrigo", 3]]),
  vanguardia: bank(x => `${cap(x)}: ¿qué corriente es?`, ["Impresionismo", "Dodecafonismo", "Música aleatoria", "Minimalismo", "Electroacústica"],
    ["Colores y atmósferas.", "Series de 12 notas.", "El azar decide.", "Patrones repetidos.", "Sonidos grabados o electrónicos."],
    [["Debussy pinta el mar con sonidos", 0], ["Ravel y sus atmósferas", 0], ["Schönberg ordena las 12 notas en una serie", 1], ["ninguna nota se repite hasta que suenan las 12", 1],
     ["John Cage y 4'33''", 2], ["tirar dados para decidir las notas", 2], ["Clapping Music, de Steve Reich", 3], ["Philip Glass repite pequeños patrones", 3],
     ["sonidos de la calle grabados y transformados", 4]]),
  urbano: bank(x => `${cap(x)}: ¿qué estilo es?`, ["Blues", "Jazz", "Rock", "Reggae", "Hip hop"],
    ["Lamento afroamericano, 12 compases.", "Improvisación, swing.", "Guitarras eléctricas, Beatles.", "Jamaica.", "Rap, DJ, breakdance, grafiti."],
    [["un lamento afroamericano sobre doce compases", 0], ["Nueva Orleans en los años 20", 1], ["improvisación y swing", 1], ["los Beatles y los Rolling Stones", 2],
     ["guitarras eléctricas distorsionadas", 2], ["ritmo nacido en Jamaica", 3], ["rap y DJ en Nueva York en los años 70", 4], ["samples y breakdance", 4]]),
  flamenco: bank(x => `${cap(x)}: ¿cante, toque o baile?`, ["Cante", "Toque", "Baile"], ["La voz.", "La guitarra.", "El movimiento: zapateado, braceo."],
    [["el cante jondo", 0], ["una voz rasgada y muy adornada", 0], ["la guitarra de Paco de Lucía", 1], ["los rasgueos y falsetas de guitarra", 1], ["el zapateado", 2],
     ["el braceo y las vueltas", 2]]),
  medios: bank(x => `${cap(x)}: ¿qué tipo de música es?`, ["Sintonía", "Banda sonora", "Jingle", "Música adaptativa"],
    ["Identifica un programa.", "La de una película.", "Melodía de un anuncio.", "Cambia según el jugador."],
    [["la música que abre cada día el informativo", 0], ["la cortinilla del programa de radio", 0], ["la música de una película de aventuras", 1], ["el tema del tiburón", 1],
     ["una melodía de cuatro notas con el nombre de la marca", 2], ["la canción pegadiza de un anuncio de yogures", 2], ["la música se acelera cuando aparece un enemigo", 3],
     ["la música cambia al entrar en otra zona del juego", 3]]),
  si_q: (w, y) => `${cap(w)}: año ${y}. ¿En qué siglo? (número)`,
  si_s: (y, c) => `${y} → siglo <b>${ROM[c]}</b> (${c})`,
});
})();
