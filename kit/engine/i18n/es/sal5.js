/* WikiAula — textos y bancos de gen/sal5.js (Salud y educación física, Grado 5), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal5 = G.sal5 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const m = x => x.toLocaleString("es-ES").replace(/\./g, " ");
Object.assign(S, {
  circula: bank(x => `${cap(x)}: ¿qué parte del sistema cardiorrespiratorio lo hace?`, ["Pulmones", "Corazón", "Sangre (glóbulos rojos)", "Músculos"],
    ["Captan oxígeno del aire.", "Bombea la sangre.", "Transporta el oxígeno.", "Lo usan para moverse."],
    [["toman el oxígeno del aire", 0], ["expulsan el dióxido de carbono", 0], ["bombea la sangre a todo el cuerpo", 1], ["late más rápido al correr", 1], ["transporta el oxígeno", 2],
     ["los glóbulos rojos llevan oxígeno", 2], ["usan el oxígeno para producir energía y moverse", 3]]),
  habla: bank(x => `${cap(x)}: ¿en qué zona de esfuerzo estás?`, ["Suave", "Moderada", "Intensa"], ["Hablas y cantas.", "Hablas, no cantas.", "Casi no puedes hablar."],
    [["paseas charlando y hasta cantas", 0], ["calientas trotando muy despacio", 0], ["trotas conversando sin problema", 1], ["nadas tranquilo y puedes hablar", 1],
     ["haces un sprint y solo puedes decir una palabra", 2], ["en los últimos minutos del partido no puedes hablar", 2]]),
  racion: bank(x => `${cap(x)}: ¿cuántas raciones al día se recomiendan (orientativo)?`, ["5", "2–3", "4–6", "1–2"],
    ["Fruta y verdura.", "Lácteos.", "Cereales.", "Alimentos proteicos."],
    [["fruta y verdura en total", 0], ["fruta y verdura («… al día»)", 0], ["lácteos (leche, yogur, queso)", 1], ["cereales (pan, arroz, pasta)", 2],
     ["alimentos proteicos (legumbres, pescado, huevos, carne)", 3]]),
  agua: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["sudar sirve para refrescar el cuerpo", 0], ["1 kg perdido al hacer deporte es aproximadamente 1 L de sudor", 0], ["hay que beber pequeños sorbos durante el ejercicio", 0],
     ["el agua es la mejor bebida en esfuerzos cortos", 0], ["solo hay que beber cuando ya tienes mucha sed", 1], ["las bebidas deportivas son necesarias en un partido de 30 minutos", 1],
     ["sudar mucho no hace perder agua", 1]]),
  juego: bank(x => `${cap(x)}: ¿es juego limpio?`, ["Sí", "No"], ["Respeto a reglas, árbitro y rivales.", "Trampa o falta de respeto."],
    [["dar la mano al rival al acabar", 0], ["echar el balón fuera si un rival se lesiona", 0], ["reconocer una mano que el árbitro no ha visto", 0], ["aplaudir una buena jugada del rival", 0],
     ["fingir una falta", 1], ["insultar al árbitro", 1], ["burlarse del equipo que pierde", 1], ["presionar a los niños desde la grada", 1]]),
  cardinal: bank(x => `${cap(x)}: ¿qué punto cardinal?`, ["Norte", "Sur", "Este", "Oeste"], ["Señala la brújula.", "Donde está el Sol a mediodía (España).", "Por donde sale el Sol.", "Por donde se pone."],
    [["hacia donde señala la aguja de la brújula", 0], ["la estrella Polar indica el…", 0], ["donde está el Sol a mediodía en España", 1], ["por donde sale el Sol", 2],
     ["por donde se pone el Sol", 3], ["hacia donde miras al ver la puesta de sol", 3]]),
  pubertad: bank(x => `${cap(x)}: ¿es un cambio de la pubertad?`, ["Sí", "No"], ["Cambio normal de la pubertad.", "No es un cambio propio de esta etapa."],
    [["el estirón", 0], ["la aparición de vello en las axilas", 0], ["la voz se hace más grave en los chicos", 0], ["la menstruación en las chicas", 0], ["más sudor", 0], ["cambios de humor", 0],
     ["se caen los dientes de leche por primera vez a los 2 años", 1], ["dejar de crecer a los 6 años", 1]]),
  auxilio: bank(x => `${cap(x)}: ¿qué hay que hacer?`, ["Proteger primero", "Posición lateral de seguridad", "Apretar y elevar", "Animar a toser", "No moverla"],
    ["Evitar más peligros.", "Inconsciente que respira.", "Hemorragia.", "Atragantamiento con tos.", "Caída fuerte."],
    [["un ciclista caído en mitad de la carretera", 0], ["un cable eléctrico suelto junto a la víctima", 0], ["una persona desmayada que respira", 1], ["una herida que sangra mucho en el brazo", 2],
     ["alguien se atraganta pero tose con fuerza", 3], ["una persona que se ha caído de una escalera y le duele la espalda", 4]]),
  fc_q: e => `¿Cuál es la frecuencia cardiaca máxima aproximada de una persona de ${e} años? (220 − edad)`,
  fc_s: (e, r) => `220 − ${e} = <b>${r}</b> latidos por minuto`,
  zo_q: (f, p) => `Si tu FC máxima es ${f}, ¿cuántas pulsaciones son el ${p} %?`,
  zo_s: (f, p, z) => `${f} × ${p} ÷ 100 = <b>${n(z)}</b>`,
  su_q: (a, b) => `Antes del entrenamiento pesas ${n(a)} kg y después ${n(b)} kg. ¿Cuántos litros deberías beber para reponer (1,5 veces lo perdido)?`,
  su_s: (a, b, d, w) => `Pérdida: ${n(a)} − ${n(b)} = ${n(d)} kg ≈ ${n(d)} L; beber ${n(d)} × 1,5 = <b>${n(w)}</b> L`,
  es_q: (e, c) => `En un mapa a escala 1:${m(e)}, dos balizas están separadas ${c} cm. ¿A cuántos metros están en la realidad?`,
  es_s: (e, mm, c, t) => `1 cm = ${mm} m; ${c} × ${mm} = <b>${m(t)}</b> m`,
});
})();
