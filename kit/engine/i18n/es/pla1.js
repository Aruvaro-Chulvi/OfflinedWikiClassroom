/* WikiAula — textos y bancos de gen/pla1.js (Educación plástica y visual, Grado 1), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla1 = G.pla1 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  linea: bank(x => `¿Qué línea usarías para dibujar ${x}?`, ["Recta", "Ondulada", "En zigzag", "Espiral"],
    ["No se tuerce.", "Sube y baja como las olas.", "Sube y baja con picos.", "Da vueltas como un caracol."],
    [["el borde de una mesa", 0], ["un palo", 0], ["las olas del mar", 1], ["una serpiente que se arrastra", 1], ["un rayo", 2], ["los dientes de una sierra", 2],
     ["la concha de un caracol", 3], ["un remolino", 3], ["un lápiz", 0], ["el pelo rizado de una oveja", 3]]),
  forma: bank(x => `¿Qué forma tiene ${x}?`, ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"],
    ["Es redondo.", "Cuatro lados iguales.", "Tres lados.", "Dos lados largos y dos cortos."],
    [["una rueda", 0], ["una moneda", 0], ["el sol en un dibujo", 0], ["un cuadro de un tablero de ajedrez", 1], ["la cara de un dado", 1], ["un trozo de pizza", 2],
     ["el tejado de una casa dibujada", 2], ["una señal de ceda el paso", 2], ["una puerta", 3], ["un libro cerrado", 3]]),
  color: bank(x => `¿De qué color es ${x}?`, ["Rojo", "Amarillo", "Azul", "Verde"],
    ["Como el tomate.", "Como el plátano.", "Como el cielo.", "Como la hierba."],
    [["un tomate maduro", 0], ["una fresa", 0], ["un plátano", 1], ["un limón", 1], ["el sol en un dibujo", 1], ["el cielo de un día despejado", 2], ["el mar en un dibujo", 2],
     ["la hierba", 3], ["una lechuga", 3], ["una rana", 3]]),
  mezcla: bank(x => `¿Qué color sale si mezclas ${x}?`, ["Naranja", "Verde", "Violeta", "Rosa"],
    ["Rojo + amarillo.", "Amarillo + azul.", "Rojo + azul.", "Rojo + blanco."],
    [["rojo y amarillo", 0], ["amarillo y rojo", 0], ["amarillo y azul", 1], ["azul y amarillo", 1], ["rojo y azul", 2], ["azul y rojo", 2], ["rojo y blanco", 3], ["blanco y rojo", 3]]),
  textura: bank(x => `¿Qué textura tiene ${x}?`, ["Lisa", "Rugosa", "Suave"], ["Sin bultos, resbala.", "Áspera, con bultos.", "Blandita y agradable."],
    [["un espejo", 0], ["un plato", 0], ["una piedra pulida del río", 0], ["la corteza de un árbol", 1], ["una lija", 1], ["una piña", 1], ["un peluche", 2],
     ["el algodón", 2], ["la lana de un jersey", 2]]),
  material: bank(x => `Para ${x}, ¿qué usas?`, ["Tijeras", "Pegamento", "Pincel y témperas", "Plastilina"],
    ["Para recortar.", "Para pegar.", "Para pintar.", "Para modelar."],
    [["recortar un círculo de papel", 0], ["cortar una tira de cartulina", 0], ["pegar una estrella en la cartulina", 1], ["unir dos papeles", 1],
     ["pintar un mural grande", 2], ["pintar un cielo azul", 2], ["hacer una figura de un perro", 3], ["modelar una tortuga", 3]]),
  emocion: bank(x => `Una cara con ${x}: ¿qué emoción muestra?`, ["Alegría", "Tristeza", "Enfado", "Miedo"],
    ["Sonrisa.", "Boca hacia abajo.", "Cejas juntas y hacia abajo.", "Ojos muy abiertos."],
    [["una gran sonrisa", 0], ["la boca hacia arriba y los ojos brillantes", 0], ["la boca hacia abajo y una lágrima", 1], ["las cejas caídas y la boca hacia abajo", 1],
     ["las cejas juntas y hacia abajo", 2], ["el ceño fruncido y los dientes apretados", 2], ["los ojos muy abiertos y la boca abierta", 3], ["los ojos muy abiertos y temblando", 3]]),
  cuadro: bank(x => `Un cuadro muestra ${x}: ¿es un retrato o un paisaje?`, ["Retrato", "Paisaje"], ["Muestra a una persona.", "Muestra el campo, el mar o una ciudad."],
    [["a una niña sonriendo", 0], ["la cara de un rey", 0], ["a una señora con un sombrero", 0], ["a un pintor dibujándose a sí mismo", 0],
     ["unas montañas y un río", 1], ["el mar con un barco", 1], ["una ciudad con muchas casas", 1], ["un campo de trigo y el cielo", 1]]),
});
})();
