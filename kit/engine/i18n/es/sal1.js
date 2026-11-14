/* WikiAula — textos y bancos de gen/sal1.js (Salud y educación física, Grado 1), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal1 = G.sal1 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  parte: bank(x => `${cap(x)}: ¿en qué parte del cuerpo está?`, ["Cabeza", "Tronco", "Extremidades"], ["Arriba.", "En el centro.", "Brazos y piernas."],
    [["los ojos", 0], ["la nariz", 0], ["las orejas", 0], ["la boca", 0], ["la tripa", 1], ["el pecho", 1], ["la espalda", 1], ["el codo", 2], ["la rodilla", 2], ["la mano", 2], ["el pie", 2],
     ["el tobillo", 2]]),
  activo: bank(x => `${cap(x)}: ¿es moverse o estar quieto?`, ["Moverse", "Estar quieto"], ["Actividad física.", "Sentado o tumbado mucho rato."],
    [["jugar a pillar", 0], ["saltar a la comba", 0], ["montar en bici", 0], ["bailar", 0], ["ir andando al cole", 0], ["ver la tele toda la tarde", 1], ["jugar a la consola horas", 1],
     ["estar sentado en el sofá", 1]]),
  higiene: bank(x => `${cap(x)}: ¿es un buen hábito de higiene?`, ["Sí", "No"], ["Nos mantiene limpios y sanos.", "Deja que los microbios entren."],
    [["lavarse las manos antes de comer", 0], ["cepillarse los dientes antes de dormir", 0], ["ducharse después de hacer deporte", 0], ["cortarse las uñas", 0], ["cambiarse la camiseta sudada", 0],
     ["comer sin lavarse las manos después del parque", 1], ["no cepillarse los dientes", 1], ["morderse las uñas", 1], ["llevar la misma ropa sucia muchos días", 1]]),
  alimento: bank(x => `${cap(x)}: ¿para todos los días o de vez en cuando?`, ["Todos los días", "De vez en cuando"], ["Alimentos sanos.", "Mucho azúcar, grasa o sal."],
    [["una manzana", 0], ["verduras", 0], ["pan", 0], ["leche", 0], ["lentejas", 0], ["agua", 0], ["chucherías", 1], ["un bollo", 1], ["patatas fritas de bolsa", 1], ["un refresco", 1],
     ["un helado", 1]]),
  juego: bank(x => `${cap(x)}: ¿es juego limpio?`, ["Sí", "No"], ["Respeta normas y compañeros.", "Trampas o falta de respeto."],
    [["respetar el turno", 0], ["ayudar a quien se cae", 0], ["felicitar al otro equipo", 0], ["dejar jugar a todos", 0], ["hacer trampas", 1], ["burlarse del que pierde", 1],
     ["enfadarse y dejar de jugar al perder", 1], ["no dejar jugar a un compañero", 1]]),
  seguridad: bank(x => `${cap(x)}: ¿seguro o peligroso?`, ["Seguro", "Peligroso"], ["Evita accidentes.", "Puede causar un accidente."],
    [["cruzar por el paso de peatones en verde", 0], ["ir en la silla del coche con el cinturón", 0], ["ir de la mano de un adulto por la calle", 0], ["andar por la acera", 0],
     ["meter un dedo en el enchufe", 1], ["tocar los productos de limpieza", 1], ["asomarse a la ventana", 1], ["cruzar corriendo sin mirar", 1], ["jugar con cuchillos", 1]]),
  secreto: bank(x => `${cap(x)}: ¿secreto bueno o secreto malo?`, ["Secreto bueno", "Secreto malo"], ["Una sorpresa que se contará pronto.", "Te hace sentir mal: cuéntaselo a un adulto."],
    [["el regalo sorpresa para mamá", 0], ["la fiesta sorpresa del abuelo", 0], ["el dibujo para el cumpleaños de la profe", 0], ["alguien te pide que no cuentes que te ha hecho daño", 1],
     ["un secreto que te da miedo", 1], ["un secreto que te hace sentir vergüenza", 1]]),
  su_q: (a, b) => `Te acuestas a las ${a} de la noche y te levantas a las ${b} de la mañana. ¿Cuántas horas duermes?`,
  su_s: (a, b, h) => `De las ${a} a las 12 son ${12 - a} h, y de las 12 a las ${b}, ${b} h: <b>${h}</b> horas`,
});
})();
