/* WikiAula — textos y bancos de gen/sal9.js (Salud y educación física, Grado 9), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal9 = G.sal9 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const eu = x => window.WA.MATH.eur(x, window.WA.H);   // importe en euros: 6,10 · 12
Object.assign(S, {
  principio: bank(x => `${cap(x)}: ¿qué principio del entrenamiento se aplica o se incumple?`, ["Sobrecarga", "Progresión", "Continuidad", "Especificidad", "Individualidad", "Recuperación"],
    ["Estímulo suficiente.", "Aumentar poco a poco.", "Regularidad.", "Mejora lo que entrenas.", "Cada persona es distinta.", "Descansar para mejorar."],
    [["entrenar tan suave que no hay ninguna mejora", 0], ["pasar de 15 a 18 minutos de carrera la semana siguiente", 1], ["subir de golpe de 2 a 10 km", 1],
     ["dejar de entrenar dos meses y perder forma", 2], ["un nadador entrena sobre todo nadando", 3], ["dos amigos con el mismo plan mejoran distinto", 4],
     ["entrenar intenso todos los días sin descanso y rendir peor", 5], ["dormir bien para asimilar el entrenamiento", 5]]),
  sesion: bank(x => `${cap(x)}: ¿qué parte de la sesión es?`, ["Calentamiento", "Parte principal", "Vuelta a la calma"], ["Preparar.", "El trabajo del día.", "Volver al reposo."],
    [["trote suave y movilidad articular", 0], ["ejercicios específicos ligeros antes de jugar", 0], ["series de carrera al 75 %", 1], ["el partido de baloncesto", 1], ["circuito de fuerza", 1],
     ["andar despacio y estirar", 2], ["respiraciones profundas al terminar", 2]]),
  mental: bank(x => `${cap(x)}: ¿cuida la salud mental o la perjudica?`, ["La cuida", "La perjudica"], ["Hábito protector.", "Factor de riesgo."],
    [["dormir 8–10 horas", 0], ["hacer deporte con amigos", 0], ["hablar de cómo te sientes con alguien de confianza", 0], ["pedir ayuda si el malestar dura semanas", 0],
     ["aislarse durante semanas", 1], ["compararse todo el día en redes", 1], ["burlarse de quien va al psicólogo", 1], ["no dormir por estar con el móvil", 1]]),
  ludopatia: bank(x => `${cap(x)}: ¿señal de adicción o uso controlado?`, ["Señal de adicción", "Uso controlado"], ["Pérdida de control.", "Sin consecuencias negativas."],
    [["mentir sobre el dinero gastado en apuestas", 0], ["dejar de quedar con amigos para jugar", 0], ["necesitar jugar cada vez más horas", 0], ["ponerse muy irritable si no puede jugar", 0],
     ["jugar un rato el fin de semana y dejarlo sin problema", 1], ["respetar el tiempo de juego acordado", 1]]),
  sexual: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "Es un mito."],
    [["el preservativo protege de las ITS", 0], ["algunas ITS no dan síntomas", 0], ["la vacuna del VPH previene varios cánceres", 0], ["el consentimiento se puede retirar", 0],
     ["la primera vez no hay riesgo de embarazo", 1], ["la marcha atrás es un método fiable", 1], ["la píldora protege de las ITS", 1], ["si te quiere, no hace falta preguntar", 1]]),
  vmp: bank(x => `${cap(x)}: ¿está permitido o es correcto?`, ["Correcto", "Incorrecto"], ["Cumple la norma.", "Está prohibido o es peligroso."],
    [["circular a 20 km/h por el carril bici", 0], ["llevar casco y luces", 0], ["respetar los semáforos", 0], ["ir por la acera entre peatones", 1], ["ir dos personas en un patinete", 1],
     ["ir con auriculares", 1], ["circular a 40 km/h", 1], ["conducir un ciclomotor con 14 años", 1]]),
  atragante: bank(x => `${cap(x)}: ¿qué hay que hacer?`, ["Animar a toser", "Golpes en la espalda y Heimlich", "112 y RCP"],
    ["Obstrucción parcial.", "Obstrucción completa, consciente.", "Inconsciente."],
    [["tose con fuerza y puede hablar", 0], ["tose y se pone roja, pero respira", 0], ["se lleva las manos al cuello y no puede toser ni hablar", 1], ["no le sale ningún sonido", 1],
     ["ha perdido el conocimiento tras atragantarse", 2], ["tose débilmente y ya no puede hablar", 1], ["habla entrecortado pero tose con fuerza", 0], ["deja de responder y no respira", 2]]),
  ergo: bank(x => `${cap(x)}: ¿buena o mala ergonomía?`, ["Buena", "Mala"], ["Protege la espalda y los ojos.", "Carga el cuerpo."],
    [["pantalla a la altura de los ojos", 0], ["pies apoyados en el suelo", 0], ["pausa activa cada hora", 0], ["luz natural lateral", 0], ["estudiar en la cama con el portátil", 1],
     ["pantalla muy baja que obliga a mirar hacia abajo", 1], ["tres horas sin levantarse", 1], ["sentarse en el borde de la silla encorvado", 1]]),
  ka_q: (e, r, p) => `Edad ${e} años, FC en reposo ${r}. Con Karvonen, ¿cuál es la FC de entrenamiento al ${p} %? (redondea)`,
  ka_s: (e, f, r, res, p, z) => `FC máx = 220 − ${e} = ${f}; reserva = ${f} − ${r} = ${res}; ${r} + ${n(p / 100)} × ${res} ≈ <b>${z}</b>`,
  vo_q: (a, mm, b, m2) => `Planificas ${a} sesiones de ${mm} minutos${b ? ` y 1 de ${m2}` : ""} a la semana. ¿Cuál es el volumen semanal en minutos?`,
  vo_s: (a, mm, b, m2, v) => `${a} × ${mm}${b ? ` + ${m2}` : ""} = <b>${v}</b> minutos`,
  es_q: (pr, num, den, a) => `Un juego cuesta ${a} € y paga ${pr} € con una probabilidad de ${num} entre ${den}. ¿Cuál es la ganancia esperada por partida? (en €)`,
  es_s: (pr, num, den, a, g) => `${pr} × ${num}/${den} − ${a} = <b>${eu(g)}</b> €: de media, pierdes`,
});
})();
