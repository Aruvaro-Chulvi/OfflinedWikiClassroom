/* WikiAula — textos y bancos de gen/pla2.js (Educación plástica y visual, Grado 2), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla2 = G.pla2 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  expresa: bank(x => `Quieres que tu dibujo transmita ${x}. ¿Qué línea usas sobre todo?`, ["Horizontal", "Vertical", "Diagonal", "Quebrada"],
    ["Calma y reposo.", "Fuerza y altura.", "Movimiento.", "Nervios o energía."],
    [["calma, como un mar en reposo", 0], ["tranquilidad, como alguien tumbado", 0], ["fuerza, como una torre", 1], ["altura, como un rascacielos", 1],
     ["velocidad, como un corredor", 2], ["movimiento, como un tobogán", 2], ["nervios, como una tormenta", 3], ["energía, como un rayo", 3]]),
  forma: bank(x => `${cap(x)}: ¿forma geométrica u orgánica?`, ["Geométrica", "Orgánica"], ["Regular, se traza con regla o compás.", "Irregular, como en la naturaleza."],
    [["una ventana cuadrada", 0], ["una rueda", 0], ["una señal triangular", 0], ["un edificio rectangular", 0], ["una nube", 1], ["una hoja de árbol", 1],
     ["un charco", 1], ["una piedra del campo", 1], ["la silueta de un gato", 1], ["un plato redondo", 0]]),
  secundario: bank(x => `¿Qué color sale al mezclar ${x}?`, ["Naranja", "Verde", "Violeta"], ["Rojo + amarillo.", "Amarillo + azul.", "Azul + rojo."],
    [["rojo y amarillo a partes iguales", 0], ["amarillo con un poco de rojo", 0], ["amarillo y azul a partes iguales", 1], ["azul con un poco de amarillo", 1],
     ["azul y rojo a partes iguales", 2], ["rojo con un poco de azul", 2]]),
  temperatura: bank(x => `${cap(x)}: ¿color cálido o frío?`, ["Cálido", "Frío"], ["Recuerda al sol y al fuego.", "Recuerda al agua y al hielo."],
    [["el rojo", 0], ["el naranja", 0], ["el amarillo", 0], ["el color del fuego", 0], ["el azul", 1], ["el verde", 1], ["el violeta", 1], ["el color del hielo", 1]]),
  simetria: bank(x => `${cap(x)}: ¿es simétrico (dos mitades iguales)?`, ["Sí", "No"], ["Al doblarlo, las mitades coinciden.", "Las mitades no coinciden."],
    [["una mariposa con las alas abiertas", 0], ["un corazón", 0], ["la letra A", 0], ["una mancha de témpera hecha doblando el papel", 0], ["un mandala", 0],
     ["la letra F", 1], ["una nube cualquiera", 1], ["un charco", 1], ["un zapato", 1]]),
  tecnica: bank(x => `${cap(x)}: ¿qué técnica es?`, ["Collage", "Pintura", "Modelado"], ["Recortar y pegar.", "Pincel y témperas.", "Dar forma con las manos."],
    [["pegar recortes de revistas sobre una cartulina", 0], ["hacer un árbol con hojas secas pegadas", 0], ["rasgar papeles de colores y pegarlos", 0],
     ["pintar un cielo con témperas", 1], ["hacer un retrato con acuarelas", 1], ["hacer una tortuga de plastilina", 2], ["dar forma a un cuenco de arcilla", 2]]),
  paisaje: bank(x => `En tu paisaje, ${x}. ¿Cómo la dibujas?`, ["Grande y abajo", "Pequeña y cerca del horizonte"], ["Está cerca.", "Está lejos."],
    [["hay una flor justo delante de ti", 0], ["hay una roca a tus pies", 0], ["hay una casa al lado del camino, cerca", 0], ["hay una casa muy lejos", 1],
     ["hay una montaña lejana", 1], ["se ve una torre a lo lejos", 1], ["hay una vaca pastando muy lejos", 1], ["hay una valla justo delante", 0]]),
  escultura: bank(x => `${cap(x)}: ¿modelar, tallar o construir?`, ["Modelar", "Tallar", "Construir"], ["Material blando con las manos.", "Quitar trozos a un material duro.", "Unir piezas."],
    [["dar forma a la arcilla", 0], ["hacer un perro de plastilina", 0], ["quitar trozos a un bloque de piedra", 1], ["hacer una figura de madera con gubias", 1],
     ["un robot con cajas y latas", 2], ["una figura de alambre doblado y unido", 2], ["una torre de tapones pegados", 2], ["un busto de mármol con cincel", 1]]),
});
})();
