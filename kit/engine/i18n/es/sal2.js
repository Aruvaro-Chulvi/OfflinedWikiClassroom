/* WikiAula — textos y bancos de gen/sal2.js (Salud y educación física, Grado 2), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal2 = G.sal2 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  sentido: bank(x => `${cap(x)}: ¿qué sentido usas sobre todo?`, ["Vista", "Oído", "Olfato", "Gusto", "Tacto"], ["Ojos.", "Orejas.", "Nariz.", "Lengua.", "Piel."],
    [["ver venir la pelota", 0], ["mirar dónde está la portería", 0], ["oír el silbato", 1], ["escuchar tu número en el pañuelo", 1], ["notar el olor del césped recién cortado", 2],
     ["saborear la fruta del almuerzo", 3], ["notar si el suelo está mojado al pisar descalzo", 4], ["sentir la cuerda de la comba en la mano", 4]]),
  posicion: bank(x => `${cap(x)}: ¿qué palabra de posición es la correcta?`, ["Delante", "Detrás", "Arriba", "Abajo"], ["Enfrente.", "A la espalda.", "Encima.", "Debajo."],
    [["la portería que tienes enfrente está…", 0], ["en la fila, quien va primero está… de ti si tú vas segundo", 0], ["el que va tras de ti en la fila está…", 1],
     ["tu sombra al atardecer, con el sol de frente, queda…", 1], ["la canasta de baloncesto está… de tu cabeza", 2], ["el techo del gimnasio está…", 2],
     ["la colchoneta está… de tus pies al tumbarte", 3], ["el suelo está…", 3]]),
  grupo: bank(x => `${cap(x)}: ¿qué parte de un desayuno completo es?`, ["Lácteo", "Cereal", "Fruta"], ["Leche y derivados.", "Pan, avena, tostadas.", "Fruta o zumo natural."],
    [["un vaso de leche", 0], ["un yogur", 0], ["un trozo de queso", 0], ["una tostada", 1], ["pan con tomate", 1], ["copos de avena", 1], ["un plátano", 2], ["una naranja", 2],
     ["un zumo natural de naranja", 2]]),
  diente: bank(x => `${cap(x)}: ¿es bueno o malo para tus dientes?`, ["Bueno", "Malo"], ["Los protege.", "Favorece la caries."],
    [["cepillarse 2 minutos antes de dormir", 0], ["ir al dentista una vez al año", 0], ["beber agua", 0], ["comer fruta en vez de chucherías", 0], ["picar golosinas todo el día", 1],
     ["acostarse sin cepillarse", 1], ["beber refrescos con azúcar a menudo", 1], ["abrir botellas con los dientes", 1]]),
  sol: bank(x => `${cap(x)}: ¿te protege del sol o no?`, ["Protege", "No protege"], ["Evita quemaduras.", "Aumenta el riesgo."],
    [["ponerse crema solar", 0], ["llevar gorra", 0], ["usar gafas de sol", 0], ["jugar a la sombra", 0], ["tumbarse al sol a mediodía", 1], ["no repetir la crema después del baño", 1],
     ["salir sin gorra en verano a las 2 de la tarde", 1]]),
  habilidad: bank(x => `${cap(x)}: ¿qué habilidad es?`, ["Desplazamiento", "Salto", "Giro", "Lanzamiento o recepción", "Equilibrio"],
    ["Ir de un sitio a otro.", "Despegar del suelo.", "Rotar el cuerpo.", "Pelota.", "Mantenerse estable."],
    [["reptar por debajo de la mesa", 0], ["correr de un lado a otro de la pista", 0], ["andar a cuatro patas", 0], ["saltar a la pata coja", 1], ["saltar a la comba", 1],
     ["hacer una voltereta", 2], ["girar sobre uno mismo", 2], ["lanzar la pelota a un compañero", 3], ["atrapar un balón", 3], ["andar sobre un banco con los brazos abiertos", 4],
     ["mantenerse a la pata coja 10 segundos", 4]]),
  vial: bank(x => `${cap(x)}: ¿lo hace un peatón seguro?`, ["Sí", "No"], ["Respeta las normas.", "Se pone en peligro."],
    [["esperar si el muñeco está rojo", 0], ["cruzar por el paso de cebra", 0], ["andar lejos del bordillo", 0], ["llevar chaleco reflectante de noche en carretera", 0], ["bajar del coche por el lado de la acera", 0],
     ["cruzar entre coches aparcados", 1], ["empezar a cruzar con el verde parpadeando", 1], ["jugar con la pelota junto a la calzada", 1], ["ir por la derecha en una carretera sin acera", 1]]),
  auxilio: bank(x => `${cap(x)}: ¿qué hay que hacer?`, ["Lavar y poner tirita", "Cabeza hacia delante y apretar la nariz", "Poner frío", "Llamar al 112 o avisar ya a un adulto"],
    ["Herida pequeña.", "Sangrado de nariz.", "Golpe o picadura.", "Emergencia grave."],
    [["un rasguño en la rodilla", 0], ["un pequeño corte en el dedo", 0], ["sangra la nariz", 1], ["un golpe en el brazo", 2], ["la picadura de un mosquito", 2],
     ["una persona no responde", 3], ["alguien no puede respirar", 3]]),
  va_q: (v, ml) => `Bebes ${v} vasos de agua de ${ml} mL. ¿Cuántos mililitros has bebido?`,
  va_s: (v, ml, t) => `${v} × ${ml} = <b>${t}</b> mL`,
});
})();
