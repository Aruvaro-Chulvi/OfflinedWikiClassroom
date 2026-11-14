/* WikiAula — textos y bancos de gen/pla4.js (Educación plástica y visual, Grado 4), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla4 = G.pla4 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  cara: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["los ojos están a la mitad de la altura de la cabeza", 0], ["entre los dos ojos cabe otro ojo", 0], ["un adulto mide unas 7 u 8 cabezas", 0],
     ["los codos llegan más o menos a la cintura", 0], ["los ojos están muy cerca de la parte de arriba de la cabeza", 1], ["un bebé mide unas 8 cabezas", 1],
     ["los brazos estirados llegan a los tobillos", 1]]),
  movimiento: bank(x => `${cap(x)}: ¿qué recurso se usa para mostrar movimiento?`, ["Postura inclinada", "Líneas cinéticas", "Secuencia", "Repetición de contornos"],
    ["Cuerpo en diagonal.", "Rayitas detrás.", "Varias posiciones seguidas.", "Varias piernas o brazos a la vez."],
    [["un corredor dibujado en diagonal", 0], ["un esquiador inclinado hacia delante", 0], ["rayitas detrás de una pelota", 1], ["rayas detrás de un coche de carreras", 1],
     ["las fotos de Muybridge de un caballo al galope", 2], ["tres viñetas: preparado, en el aire, aterrizando", 2], ["un perro futurista con muchas patas", 3],
     ["una mano dibujada varias veces al saludar", 3]]),
  complementario: bank(x => `¿Cuál es el complementario ${x}?`, ["Violeta", "Verde", "Naranja", "Amarillo", "Rojo", "Azul"],
    ["Opuesto al amarillo.", "Opuesto al rojo.", "Opuesto al azul.", "Opuesto al violeta.", "Opuesto al verde.", "Opuesto al naranja."],
    [["del amarillo", 0], ["del rojo", 1], ["del azul", 2], ["del violeta", 3], ["del verde", 4], ["del naranja", 5]]),
  tinte: bank(x => `¿Qué añades para conseguir ${x}?`, ["Blanco", "Negro"], ["El blanco aclara.", "El negro oscurece."],
    [["rosa a partir de rojo", 0], ["azul celeste a partir de azul", 0], ["un verde claro para unos brotes", 0], ["un lila suave a partir de violeta", 0],
     ["granate a partir de rojo", 1], ["azul marino a partir de azul", 1], ["un verde oscuro para un pino en sombra", 1], ["un marrón más oscuro", 1]]),
  cartel: bank(x => `En un cartel, ${x}: ¿acierto o error?`, ["Acierto", "Error"], ["Ayuda a que se vea y se entienda.", "Dificulta leerlo o entenderlo."],
    [["el título con letras grandes", 0], ["una imagen grande y llamativa", 0], ["texto oscuro sobre fondo claro", 0], ["indicar qué, cuándo y dónde", 0], ["un eslogan corto", 0],
     ["letras amarillas sobre fondo blanco", 1], ["diez dibujos pequeños sin orden", 1], ["olvidar la fecha del evento", 1], ["un párrafo larguísimo en letra pequeña", 1]]),
  juguete: bank(x => `${cap(x)}: ¿qué técnica o juguete óptico es?`, ["Taumatropo", "Zoótropo", "Folioscopio", "Stop motion"],
    ["Disco con un dibujo por cada cara.", "Tambor con rendijas que gira.", "Librito que se pasa rápido.", "Fotos de muñecos movidos poco a poco."],
    [["un disco con un pájaro en una cara y una jaula en la otra", 0], ["un disco que se gira con dos cuerdas", 0], ["un tambor con rendijas y una tira de dibujos dentro", 1],
     ["un cilindro que gira y se mira por las ranuras", 1], ["un librito con un dibujo en cada página", 2], ["pasar páginas con el dedo y ver moverse un monigote", 2],
     ["fotografiar un muñeco de plastilina moviéndolo un poquito cada vez", 3], ["animar figuras de juguete foto a foto", 3]]),
  instrumento: bank(x => `Para ${x}, ¿qué instrumento usas?`, ["Regla", "Escuadra y cartabón", "Compás"],
    ["Rectas y medidas.", "Paralelas, perpendiculares y ángulos.", "Circunferencias y arcos."],
    [["medir un segmento de 7 cm", 0], ["unir dos puntos con una recta", 0], ["trazar paralelas", 1], ["trazar una perpendicular", 1], ["dibujar un ángulo de 45°", 1],
     ["dibujar un ángulo de 30°", 1], ["trazar una circunferencia", 2], ["dibujar un arco", 2], ["trasladar una medida", 2]]),
  relieve: bank(x => `${cap(x)}: ¿bulto redondo o relieve?`, ["Bulto redondo", "Relieve"], ["Exento: se puede rodear.", "Sale de un fondo: se ve de frente."],
    [["una estatua de un caballo en una plaza", 0], ["una figura de plastilina sobre la mesa", 0], ["un busto en un museo", 0], ["la cara de una moneda", 1],
     ["figuras de piedra que salen de la pared de una iglesia", 1], ["un dibujo grabado en una plancha de arcilla", 1], ["las figuras de una medalla", 1]]),
  pr_q: (w, n, c) => `Un ${w} mide unas ${n} cabezas y su cabeza mide ${c} cm. ¿Cuánto mide aproximadamente? (en cm)`,
  pr_s: (n, c, h) => `${n} × ${c} = <b>${h}</b> cm`,
  pr_q2: (w, h, c) => `Un ${w} mide ${h} cm y su cabeza ${c} cm. ¿Cuántas cabezas mide?`,
  pr_s2: (h, c, n) => `${h} ÷ ${c} = <b>${n}</b> cabezas`,
  an_q: (s, f) => `¿Cuántos fotogramas necesita una animación de ${s} segundos a ${f} fotogramas por segundo?`,
  an_s: (s, f, t) => `${s} × ${f} = <b>${t}</b> fotogramas`,
  an_q2: (t, f) => `Tienes ${t} fotogramas y los proyectas a ${f} por segundo. ¿Cuántos segundos dura la animación?`,
  an_s2: (t, f, s) => `${t} ÷ ${f} = <b>${s}</b> segundos`,
});
})();
