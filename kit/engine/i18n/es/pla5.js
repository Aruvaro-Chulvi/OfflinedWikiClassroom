/* WikiAula — textos y bancos de gen/pla5.js (Educación plástica y visual, Grado 5), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla5 = G.pla5 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const POL = { 3: "triángulo equilátero", 4: "cuadrado", 5: "pentágono regular", 6: "hexágono regular", 8: "octógono regular", 10: "decágono regular", 12: "dodecágono regular" };
const PLU = { 3: "triángulos equiláteros", 4: "cuadrados", 6: "hexágonos regulares" };
Object.assign(S, {
  perspectiva: bank(x => `${cap(x)}: ¿qué recurso de profundidad es?`, ["Superposición", "Tamaño", "Perspectiva aérea", "Punto de fuga"],
    ["Lo de delante tapa lo de detrás.", "Lo lejano, más pequeño.", "Lo lejano, más claro y azulado.", "Las paralelas que se alejan se juntan."],
    [["un árbol tapa parte de una casa", 0], ["una persona delante de otra en una foto de grupo", 0], ["los postes lejanos de la carretera son diminutos", 1],
     ["un barco lejano dibujado muy pequeño", 1], ["las montañas del fondo, azuladas y pálidas", 2], ["la ciudad lejana, borrosa por la neblina", 2],
     ["las vías del tren se juntan en el horizonte", 3], ["los bordes de un pasillo convergen en un punto", 3]]),
  luz: bank(x => `${cap(x)}: ¿qué tipo de luz o técnica es?`, ["Contraluz", "Luz cenital", "Luz lateral", "Trama cruzada", "Difuminado"],
    ["La luz viene de detrás: silueta.", "Luz desde arriba: sombras cortas.", "Luz de un lado: marca el volumen.", "Líneas que se cruzan.", "Frotar el grafito."],
    [["la persona se ve oscura, como una silueta, ante la ventana", 0], ["el sol del atardecer detrás de un árbol", 0], ["sombras cortas justo debajo, a mediodía", 1],
     ["una lámpara justo encima de la mesa", 1], ["una ventana a la izquierda ilumina medio rostro", 2], ["sombrear con rayas cruzadas más juntas en lo oscuro", 3],
     ["pasar el dedo por el lápiz para un paso suave", 4]]),
  armonia: bank(x => `${cap(x)}: ¿armonía o contraste?`, ["Armonía", "Contraste"], ["Colores con algo en común: tranquilo.", "Colores muy diferentes: llamativo."],
    [["amarillo, amarillo verdoso y verde", 0], ["varios azules, de claro a oscuro", 0], ["rojo, naranja y amarillo", 0], ["verde claro y verde oscuro", 0],
     ["rojo y verde", 1], ["amarillo y violeta", 1], ["negro sobre amarillo", 1], ["naranja y azul", 1]]),
  significado: bank(x => `¿Qué color se asocia más a ${x} (en España)?`, ["Rojo", "Verde", "Azul", "Negro"],
    ["Amor, peligro, prohibición.", "Naturaleza, esperanza, «adelante».", "Calma, agua, frío.", "Misterio, elegancia, luto."],
    [["el peligro y la prohibición", 0], ["el amor y la pasión", 0], ["la naturaleza", 1], ["«adelante» en el semáforo", 1], ["la calma y la tranquilidad", 2],
     ["el agua y el frío", 2], ["el luto", 3], ["el misterio y la elegancia", 3]]),
  angulo: bank(x => `Quieres ${x}. ¿Qué ángulo de cámara usas?`, ["Normal", "Picado", "Contrapicado", "Cenital"],
    ["A la altura de los ojos.", "Desde arriba: pequeño, débil.", "Desde abajo: grande, poderoso.", "Justo desde arriba, en vertical."],
    [["una conversación natural entre dos amigos", 0], ["que el espectador mire al personaje de igual a igual", 0], ["que un niño perdido parezca pequeño y solo", 1],
     ["que un personaje parezca débil", 1], ["que un gigante dé miedo", 2], ["que la heroína parezca poderosa", 2], ["mostrar desde el techo una mesa con platos", 3],
     ["ver una plaza como en un mapa, desde un dron justo encima", 3]]),
  logo: bank(x => `${cap(x)}: ¿logotipo, isotipo o imagotipo?`, ["Logotipo", "Isotipo", "Imagotipo"], ["Solo letras.", "Solo símbolo.", "Símbolo y letras."],
    [["el nombre de una marca escrito con letras especiales, sin dibujo", 0], ["solo la palabra «Sol» con una tipografía redonda", 0], ["una manzana mordida sin letras", 1],
     ["un pájaro azul sin ningún texto", 1], ["un libro con alas y debajo «Club Vuela»", 2], ["una estrella junto al nombre de la empresa", 2]]),
  tesela: bank(x => `${cap(x)}: ¿tesela el plano él solo (sin huecos)?`, ["Sí", "No"], ["Sus ángulos suman 360° en un vértice.", "Quedan huecos o se solapan."],
    [["el triángulo equilátero", 0], ["el cuadrado", 0], ["el hexágono regular", 0], ["el pentágono regular", 1], ["el octógono regular", 1], ["el círculo", 1], ["el decágono regular", 1]]),
  pintor: bank(x => `${cap(x)}: ¿qué pintor es?`, ["Velázquez", "Goya", "Sorolla", "Picasso", "Dalí"],
    ["Siglo XVII, pintor de la corte.", "Siglos XVIII–XIX.", "La luz del Mediterráneo.", "Cubismo.", "Surrealismo."],
    [["pintó Las meninas", 0], ["fue pintor de la corte de Felipe IV", 0], ["pintó El 3 de mayo de 1808", 1], ["pintó las Pinturas negras", 1],
     ["pintó niños bañándose en el mar llenos de luz", 2], ["es el pintor de la luz de Valencia", 2], ["inventó el cubismo", 3], ["pintó el Guernica", 3],
     ["pintó relojes blandos", 4], ["fue el gran pintor del surrealismo", 4]]),
  an_q: n => `¿Cuánto mide cada ángulo de un ${POL[n]}? (en grados)`,
  an_s: (n, a) => `180 × (${n} − 2) ÷ ${n} = <b>${a}</b>°`,
  ve_q: n => `En un teselado de ${PLU[n]}, ¿cuántas piezas se juntan en cada vértice?`,
  ve_s: (n, a, k) => `Cada ángulo mide ${a}°: 360 ÷ ${a} = <b>${k}</b>`,
});
})();
