/* WikiAula — textos y bancos de gen/cid5.js (Ciudadanía y ética, Grado 5), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.cid5 = G.cid5 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  identidad: bank(x => `«${x}»: ¿muestra una autoestima sana o poco sana?`, ["Sana", "Poco sana"], ["Se acepta y quiere mejorar.", "Se desprecia o depende solo de los demás."],
    [["No me ha salido, lo intentaré otra vez", 0], ["Soy bueno dibujando y quiero mejorar en mates", 0], ["Me equivoqué y he aprendido algo", 0], ["Soy un desastre, no sirvo para nada", 1],
     ["Si no me dan muchos «me gusta», no valgo", 1], ["Nunca voy a aprender a nadar", 1]]),
  emocion: bank(x => `${cap(x)}: ¿qué emoción es?`, ["Alegría", "Tristeza", "Miedo", "Ira", "Asco", "Sorpresa"],
    ["Algo bueno.", "Una pérdida.", "Un peligro.", "Una injusticia.", "Algo desagradable.", "Algo inesperado."],
    [["marcas un gol en la final", 0], ["se muda tu mejor amiga", 1], ["oyes un ruido extraño de noche", 2], ["te acusan de algo que no has hecho", 3], ["la leche huele a podrido", 4],
     ["te organizan una fiesta sin que lo sepas", 5]]),
  empatia: bank(x => `${cap(x)}: ¿es empático o no?`, ["Empático", "Poco empático"], ["Se pone en el lugar del otro.", "No piensa en cómo se siente el otro."],
    [["preguntar a un compañero triste qué le pasa", 0], ["escuchar sin interrumpir", 0], ["ayudar al nuevo a conocer el colegio", 0], ["reírse de quien se ha caído", 1],
     ["mirar el móvil mientras alguien te cuenta un problema", 1], ["decir «no es para tanto» a quien llora", 1]]),
  norma: bank(x => `${cap(x)}: ¿es un derecho o un deber?`, ["Derecho", "Deber"], ["Lo que me corresponde.", "Lo que debo cumplir."],
    [["aprender en clase", 0], ["jugar en el recreo", 0], ["que me respeten", 0], ["dejar aprender a los demás", 1], ["cuidar el material común", 1], ["respetar a los compañeros", 1],
     ["respetar el turno de palabra", 1]]),
  conflicto: bank(x => `${cap(x)}: ¿ayuda a resolver el conflicto o lo empeora?`, ["Lo resuelve", "Lo empeora"], ["Diálogo y respeto.", "Agresividad o huida."],
    [["respirar y calmarse antes de hablar", 0], ["escuchar a la otra persona", 0], ["buscar una solución buena para los dos", 0], ["pedir ayuda a un mediador", 0], ["gritar más fuerte", 1],
     ["insultar", 1], ["contarlo a todos para que se pongan de tu lado", 1]]),
  acoso: bank(x => `${cap(x)}: ¿es acoso escolar?`, ["Sí, es acoso", "No, es un conflicto puntual"], ["Daño repetido e intencionado.", "Un desacuerdo de un día."],
    [["llamar a alguien con un mote cruel todos los días", 0], ["no dejar jugar nunca a una compañera", 0], ["enviar mensajes humillantes cada semana", 0], ["discutir un día por quién empieza el juego", 1],
     ["un empujón sin querer en la fila", 1], ["enfadarse una vez con un amigo y hacer las paces", 1]]),
  derecho: bank(x => `${cap(x)}: ¿qué derecho de la infancia protege?`, ["Educación", "Salud", "Juego y descanso", "Opinión", "Protección", "No discriminación"],
    ["Ir a la escuela.", "Médicos y alimentación.", "Jugar.", "Ser escuchado.", "Frente a violencia y explotación.", "Igual trato."],
    [["escuela gratuita para todos", 0], ["vacunas y comedor escolar", 1], ["parques y tiempo libre", 2], ["el consejo escucha a los alumnos", 3], ["prohibir el trabajo infantil", 4],
     ["mismo trato a todos sin importar su origen", 5]]),
  igualdad: bank(x => `«${x}»: ¿es un estereotipo o una idea igualitaria?`, ["Estereotipo", "Igualitaria"], ["Encasilla a las personas.", "Mismas oportunidades para todos."],
    [["Las niñas no juegan al fútbol", 0], ["Los chicos no lloran", 0], ["Las tareas de casa son de las madres", 0], ["Todos pueden elegir su deporte", 1], ["Las tareas de casa se comparten", 1],
     ["Cualquiera puede ser ingeniera o enfermero", 1]]),
  planeta: bank(x => `${cap(x)}: ¿qué R es?`, ["Reducir", "Reutilizar", "Reciclar"], ["Consumir menos.", "Dar otra vida.", "Separar residuos."],
    [["llevar una botella propia en vez de comprar agua", 0], ["apagar las luces que no se usan", 0], ["usar el bote de cristal como lapicero", 1], ["dar tu ropa pequeña a tu primo", 1],
     ["echar el envase al contenedor amarillo", 2], ["llevar el papel al contenedor azul", 2]]),
  opciones: ["museo", "granja escuela", "parque de las ciencias", "zoo", "teatro"],
  vo_q1: (o, v) => `Votación de clase: ${o.map((x, i) => `${x} ${v[i]} votos`).join(", ")}. ¿Qué opción gana?`,
  vo_s1: (o, n) => `Gana la que tiene más votos: <b>${o}</b> (${n}).`,
  vo_q2: (o, v) => `Votación de clase: ${o.map((x, i) => `${x} ${v[i]} votos`).join(", ")}. ¿Cuántas personas votaron?`,
  vo_s2: (v, t) => `${v.join(" + ")} = <b>${t}</b>`,
  participar: bank(x => `${cap(x)}: ¿es participación democrática?`, ["Sí", "No"], ["Todos pueden opinar y decidir.", "Decide uno solo o se excluye a alguien."],
    [["votar en la asamblea de clase", 0], ["dar tu opinión con respeto", 0], ["elegir al delegado", 0], ["el delegado decide solo sin preguntar a nadie", 1], ["no dejar hablar a quien piensa distinto", 1],
     ["decidir siempre lo que quiere el más fuerte", 1]]),
});
})();
