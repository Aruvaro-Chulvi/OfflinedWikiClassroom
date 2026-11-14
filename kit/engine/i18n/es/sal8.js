/* WikiAula — textos y bancos de gen/sal8.js (Salud y educación física, Grado 8), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal8 = G.sal8 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const m = x => x.toLocaleString("es-ES").replace(/\./g, " ");
Object.assign(S, {
  fuerza: bank(x => `${cap(x)}: ¿qué tipo de fuerza predomina?`, ["Fuerza máxima", "Fuerza explosiva", "Fuerza-resistencia"], ["Máxima carga una vez.", "Muy rápido.", "Muchas repeticiones."],
    [["levantar la máxima carga posible una vez", 0], ["empujar un coche parado", 0], ["un salto vertical", 1], ["lanzar un balón medicinal lejos", 1], ["la salida de un sprint", 1],
     ["remar durante 10 minutos", 2], ["hacer 30 sentadillas seguidas", 2], ["subir muchas escaleras", 2]]),
  velocidad: bank(x => `${cap(x)}: ¿qué tipo de velocidad?`, ["De reacción", "Gestual", "De desplazamiento", "Agilidad"],
    ["Responder a un estímulo.", "Un gesto rápido.", "Recorrer distancia.", "Cambiar de dirección."],
    [["salir al oír el disparo", 0], ["parar un penalti", 0], ["un golpe de tenis muy rápido", 1], ["un lanzamiento de balonmano", 1], ["correr 60 m lo más rápido posible", 2],
     ["un contraataque corriendo toda la pista", 2], ["esquivar a un defensa con un quiebro", 3], ["un circuito de conos en zigzag", 3]]),
  balance: bank(x => `${cap(x)}: ¿balance energético positivo o negativo?`, ["Positivo", "Negativo"], ["Entra más energía de la que sale.", "Sale más energía de la que entra."],
    [["comer 2800 kcal y gastar 2300", 0], ["un día de mucha comida y nada de ejercicio", 0], ["comer 2000 kcal y gastar 2600", 1], ["un día de excursión larga con poca comida", 1]]),
  tca: bank(x => `${cap(x)}: ¿factor de protección o señal de alarma?`, ["Protección", "Señal de alarma"], ["Ayuda a prevenir.", "Puede indicar un problema: pedir ayuda."],
    [["comer en familia con regularidad", 0], ["valorar el cuerpo por lo que puede hacer", 0], ["saber que las fotos de redes están retocadas", 0], ["no opinar sobre el cuerpo de los demás", 0],
     ["saltarse comidas a menudo", 1], ["obsesión por contar calorías", 1], ["hacer ejercicio a escondidas para «quemar» lo comido", 1], ["evitar siempre comer delante de otros", 1]]),
  relacion: bank(x => `${cap(x)}: ¿respeta el consentimiento y las relaciones sanas?`, ["Sí", "No"], ["Libre, informado, reversible, respetuoso.", "Presión, control o falta de respeto."],
    [["preguntar y aceptar un «no» sin enfadarse", 0], ["parar si la otra persona cambia de opinión", 0], ["hablar de lo que molesta con respeto", 0], ["respetar el tiempo de cada uno", 0],
     ["insistir hasta que diga que sí", 1], ["pedir fotos íntimas «como prueba de amor»", 1], ["revisar el móvil de la pareja", 1], ["difundir una foto privada de alguien", 1]]),
  droga: bank(x => `${cap(x)}: ¿mito o realidad?`, ["Realidad", "Mito"], ["Respaldado por la ciencia.", "Creencia falsa."],
    [["el alcohol afecta más al cerebro adolescente", 0], ["hay riesgo desde la primera borrachera", 0], ["el cannabis puede afectar a la memoria", 0], ["la mayoría de los adolescentes no bebe", 0],
     ["todo el mundo bebe en las fiestas", 1], ["el cannabis es natural y por eso inofensivo", 1], ["una ducha fría quita la borrachera", 1], ["el café cura una intoxicación etílica", 1]]),
  rcp: bank(x => `${cap(x)}: ¿correcto o incorrecto?`, ["Correcto", "Incorrecto"], ["Así se hace.", "No es así."],
    [["30 compresiones y 2 ventilaciones si se sabe ventilar", 0], ["solo compresiones si no se sabe ventilar", 0], ["encender el DEA y seguir su voz", 0], ["no tocar a la víctima durante la descarga", 0],
     ["esperar a la ambulancia sin hacer nada", 1], ["poner los dos parches en el mismo lado", 1], ["tocar a la víctima mientras el DEA analiza", 1], ["comprimir 2 cm de profundidad", 1]]),
  lesion: bank(x => `${cap(x)}: ¿qué lesión es?`, ["Esguince", "Contractura", "Calambre", "Rotura fibrilar", "Tendinitis", "Fractura"],
    ["Ligamento.", "Músculo contraído y dolorido.", "Contracción involuntaria.", "Fibras rotas.", "Tendón inflamado.", "Hueso roto."],
    [["torcedura de tobillo que afecta al ligamento", 0], ["el cuello agarrotado tras dormir mal", 1], ["un pinchazo involuntario en el gemelo al final del partido", 2],
     ["dolor repentino en el muslo en un sprint («tirón»)", 3], ["dolor en el tendón de Aquiles por correr demasiado", 4], ["un hueso de la muñeca roto tras una caída", 5]]),
  price: bank(x => `${cap(x)}: ¿qué letra de PRICE es?`, ["P: protección", "R: reposo", "I: hielo", "C: compresión", "E: elevación"],
    ["Dejar de jugar.", "Descansar.", "Frío.", "Vendaje.", "En alto."],
    [["dejar de jugar y proteger la zona", 0], ["no forzar la zona unos días", 1], ["frío envuelto en un paño 15 minutos", 2], ["un vendaje suave", 3], ["apoyar el pie en alto en una silla", 4]]),
  mapa: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["curvas de nivel juntas indican pendiente fuerte", 0], ["el rumbo se mide desde el norte", 0], ["el este es 90°", 0], ["en 1:25 000, 1 cm son 250 m", 0], ["curvas separadas indican un precipicio", 1],
     ["el sur es 90°", 1], ["el oeste es 180°", 1], ["en 1:50 000, 1 cm son 50 m", 1]]),
  ejercicios: [["sentadillas"], ["flexiones"], ["zancadas"], ["abdominales"], ["saltos"]],
  se_q: (s, r, e) => `Haces ${s} series de ${r} ${e}. ¿Cuántas repeticiones son en total?`,
  se_s: (s, r, t) => `${s} × ${r} = <b>${t}</b>`,
  ms_q: (d, t) => `Corres ${d} m en ${t} s. ¿Cuál es tu velocidad media en m/s?`,
  ms_s: (d, t, v) => `${d} ÷ ${t} = <b>${n(v)}</b> m/s`,
  actividades: [["andar", 4], ["ir en bici", 6], ["nadar", 8], ["correr", 10], ["jugar al fútbol", 8], ["bailar", 6]],
  ga_q: (a, k, mm) => `${cap(a)} gasta unas ${k} kcal por minuto. ¿Cuántas kcal en ${mm} minutos?`,
  ga_s: (k, mm, t) => `${k} × ${mm} = <b>${t}</b> kcal`,
  ri_q1: c => `En RCP con ciclos de 30 compresiones y 2 ventilaciones, ¿cuántas compresiones se hacen en ${c} ciclos?`,
  ri_s1: (c, t) => `30 × ${c} = <b>${t}</b>`,
  ri_q2: c => `En RCP con ciclos de 30:2, ¿cuántas ventilaciones se hacen en ${c} ciclos?`,
  ri_s2: (c, t) => `2 × ${c} = <b>${t}</b>`,
  es_q: (e, c) => `En un mapa a escala 1:${m(e)}, la ruta mide ${c} cm. ¿Cuántos metros son en la realidad?`,
  es_s: (e, mm, c, t) => `1 cm = ${mm} m; ${c} × ${mm} = <b>${m(t)}</b> m`,
});
})();
