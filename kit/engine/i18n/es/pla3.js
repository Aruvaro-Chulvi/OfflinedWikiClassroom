/* WikiAula — textos y bancos de gen/pla3.js (Educación plástica y visual, Grado 3), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla3 = G.pla3 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  elemento: bank(x => `En un dibujo, ${x}. ¿Qué elemento visual es sobre todo?`, ["Punto", "Línea", "Plano"],
    ["Marca pequeña.", "Un punto en movimiento: contornos y direcciones.", "Superficie de color con largo y ancho."],
    [["las estrellas del cielo", 0], ["los botones de un abrigo", 0], ["las ciudades en un mapa", 0], ["las carreteras de un mapa", 1], ["el contorno de una cara", 1],
     ["los cables de la luz", 1], ["un país pintado en un mapa", 2], ["una montaña oscura pintada", 2], ["una pared de color rellena", 2]]),
  textura: bank(x => `${cap(x)}: ¿textura táctil o visual?`, ["Táctil", "Visual"], ["Se puede tocar.", "Solo se ve: al tocarlo es liso."],
    [["la corteza de un árbol", 0], ["un mural con arena y lentejas pegadas", 0], ["un papel de lija", 0], ["una tela de saco", 0],
     ["la foto de una piedra en un libro", 1], ["rayas dibujadas que imitan madera", 1], ["un erizo dibujado con rayitas", 1], ["la imagen de una alfombra en una revista", 1]]),
  terciario: bank(x => `¿Qué color sale al mezclar ${x}?`, ["Amarillo anaranjado", "Rojo violeta", "Azul verdoso", "Verde amarillento"],
    ["Amarillo + naranja.", "Rojo + violeta.", "Azul + verde.", "Verde + amarillo."],
    [["amarillo y naranja", 0], ["naranja y amarillo", 0], ["rojo y violeta", 1], ["violeta y rojo", 1], ["azul y verde", 2], ["verde y azul", 2], ["verde y amarillo", 3],
     ["amarillo y verde", 3]]),
  luz: bank(x => `La luz viene de la izquierda. ${cap(x)}: ¿qué es?`, ["Luz", "Sombra propia", "Sombra arrojada"],
    ["Parte iluminada, más clara.", "Parte del objeto sin luz, más oscura.", "Mancha que el objeto deja en el suelo."],
    [["la parte izquierda de la pelota, la más clara", 0], ["el brillo blanco de la manzana", 0], ["la parte derecha de la pelota, más oscura", 1],
     ["el lado de la caja que no mira a la lámpara", 1], ["la mancha oscura en la mesa, a la derecha del vaso", 2], ["la silueta oscura del árbol en el suelo", 2]]),
  comic: bank(x => `${cap(x)}: ¿qué parte del cómic es?`, ["Viñeta", "Bocadillo", "Cartela", "Onomatopeya"],
    ["Recuadro con un momento de la historia.", "Lo que dice o piensa un personaje.", "La voz del narrador.", "Palabra que imita un sonido."],
    [["el recuadro donde se dibuja cada momento", 0], ["cada uno de los cuadros de la página", 0], ["un globo con lo que dice el pirata", 1],
     ["una nube con burbujitas con lo que piensa la niña", 1], ["un recuadro arriba que dice «Mientras tanto…»", 2], ["«Al día siguiente…» en un rectángulo", 2],
     ["¡PUM!", 3], ["¡ZAS!", 3], ["¡RIIING!", 3]]),
  plano: bank(x => `Quieres mostrar ${x}. ¿Qué plano usas?`, ["Plano general", "Plano medio", "Primer plano", "Plano detalle"],
    ["Persona entera y el lugar.", "De cintura para arriba.", "La cara.", "Una parte pequeña."],
    [["dónde está el personaje: en un bosque enorme", 0], ["a toda la clase delante del castillo", 0], ["qué está haciendo un cocinero con las manos y la cara", 1],
     ["a dos amigos conversando sentados", 1], ["la cara de sorpresa de Lucía", 2], ["que alguien está triste", 2], ["un anillo en una mano", 3], ["la gota que cae de un grifo", 3]]),
  genero: bank(x => `Un cuadro muestra ${x}. ¿Qué género es?`, ["Retrato", "Paisaje", "Bodegón", "Escena"],
    ["Una o varias personas posando.", "La naturaleza o la ciudad.", "Objetos quietos.", "Personas haciendo algo."],
    [["la cara de una reina", 0], ["al propio pintor mirándose al espejo", 0], ["unas montañas nevadas y un lago", 1], ["barcas en el mar", 1],
     ["un plato de limones y una jarra sobre una mesa", 2], ["un jarrón con flores y unos libros", 2], ["unos niños jugando en la calle", 3], ["una fiesta en un pueblo", 3]]),
  rupestre: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["en Altamira hay bisontes pintados", 0], ["el negro se hacía con carbón", 0], ["el ocre daba colores rojos y amarillos", 0], ["a veces soplaban pintura alrededor de la mano", 0],
     ["aprovechaban los bultos de la roca para dar volumen", 0], ["las pinturas rupestres tienen unos 100 años", 1], ["pintaban con témperas de tubo", 1],
     ["Altamira está en Andalucía", 1]]),
});
})();
