/* WikiAula — textos y bancos de gen/sal6.js (Salud y educación física, Grado 6), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal6 = G.sal6 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  fitt: bank(x => `«${x}». ¿Qué letra de FITT describe?`, ["Frecuencia", "Intensidad", "Tiempo", "Tipo"], ["Cuántas veces.", "Cuánto esfuerzo.", "Cuántos minutos.", "Qué actividad."],
    [["tres días a la semana", 0], ["todos los días", 0], ["a ritmo moderado, pudiendo hablar", 1], ["muy intenso, casi sin poder hablar", 1], ["45 minutos cada sesión", 2], ["una hora", 2],
     ["natación", 3], ["bici de montaña", 3], ["ejercicios de fuerza", 3]]),
  ejercicio: bank(x => `${cap(x)}: ¿trabaja sobre todo fuerza o flexibilidad?`, ["Fuerza", "Flexibilidad"], ["Músculos contra una resistencia.", "Amplitud de movimiento."],
    [["sentadillas", 0], ["flexiones de brazos", 0], ["plancha", 0], ["trepar por la espaldera", 0], ["saltos a pies juntos", 0], ["estirar los gemelos contra la pared", 1],
     ["tocar los pies sentado con las piernas estiradas", 1], ["estirar los cuádriceps cogiendo el pie", 1], ["la mariposa (plantas de los pies juntas)", 1]]),
  adiccion: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["la nicotina crea adicción", 0], ["los vapeadores también pueden tener nicotina", 0], ["el humo del tabaco daña también a quien está cerca", 0],
     ["el alcohol es especialmente dañino para el cerebro de los menores", 0], ["vapear es totalmente inofensivo", 1], ["probar una vez nunca tiene riesgo", 1],
     ["el alcohol se puede vender a menores de 16", 1], ["fumar mejora el rendimiento deportivo", 1]]),
  estres: bank(x => `${cap(x)}: ¿es una forma sana de manejar el estrés?`, ["Sana", "Poco sana"], ["Ayuda a calmarse.", "Empeora el problema."],
    [["respirar despacio y profundo", 0], ["salir a correr", 0], ["contarlo a alguien de confianza", 0], ["dividir una tarea en pasos", 0], ["dormir bien", 0],
     ["quedarse jugando a la consola hasta muy tarde", 1], ["guardárselo todo sin hablar con nadie", 1], ["pagarlo con los demás gritando", 1]]),
  monte: bank(x => `${cap(x)}: ¿buena práctica en la naturaleza?`, ["Sí", "No"], ["Seguro y respetuoso.", "Peligroso o dañino."],
    [["llevarse toda la basura", 0], ["avisar de la ruta antes de salir", 0], ["ir por los caminos marcados", 0], ["llevar agua y ropa de abrigo", 0], ["consultar el tiempo", 0],
     ["hacer una hoguera en verano en el bosque", 1], ["separarse del grupo", 1], ["arrancar flores para llevárselas", 1], ["salir sin agua en verano", 1]]),
  mundo: bank(x => `${cap(x)}: ¿qué juego es?`, ["Pelota vasca", "Kabaddi", "Mancala", "Sepak takraw", "Ultimate"],
    ["Frontón.", "India.", "Tablero con semillas.", "Voleibol con los pies.", "Disco volador sin árbitro."],
    [["golpear la pelota contra un frontón con la mano", 0], ["se juega con pala o cesta punta", 0], ["entrar en el campo rival diciendo una palabra sin respirar", 1],
     ["repartir semillas en hoyos de un tablero", 2], ["un voleibol en el que se usan los pies", 3], ["los jugadores arbitran el partido", 4], ["se juega con un disco volador", 4]]),
  rcp: bank(x => `${cap(x)}: ¿correcto o incorrecto en la RCP?`, ["Correcto", "Incorrecto"], ["Así se hace.", "No es así."],
    [["comprobar que no hay peligro antes de acercarse", 0], ["llamar al 112 y poner el altavoz", 0], ["comprimir en el centro del pecho", 0], ["hundir 5–6 cm", 0], ["usar el DEA siguiendo su voz", 0],
     ["comprimir solo 30 veces por minuto", 1], ["esperar 5 minutos a ver si se recupera", 1], ["parar las compresiones para buscar el móvil", 1], ["comprimir en la tripa", 1]]),
  agua: bank(x => `${cap(x)}: ¿seguro o peligroso?`, ["Seguro", "Peligroso"], ["Respeta las normas.", "Riesgo de accidente."],
    [["bañarse con bandera verde", 0], ["bañarse en zona vigilada", 0], ["entrar al agua poco a poco", 0], ["nadar en paralelo a la orilla si te arrastra la corriente", 0],
     ["bañarse con bandera roja", 1], ["tirarse de cabeza sin conocer el fondo", 1], ["bañarse solo en un pantano", 1], ["nadar contra una corriente fuerte", 1]]),
  mi_q: (s, m) => `Haces ${s} sesiones de ${m} minutos a la semana. ¿Cuántos minutos son?`,
  mi_s: (s, m, t) => `${s} × ${m} = <b>${t}</b> minutos`,
  co_q: (r, t) => `A un ritmo de ${r} compresiones por minuto, ¿cuántas se hacen en ${t} segundos?`,
  co_s: (r, t, c) => `${r} × ${t} ÷ 60 = <b>${c}</b>`,
});
})();
