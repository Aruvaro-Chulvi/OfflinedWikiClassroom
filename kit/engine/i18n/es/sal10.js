/* WikiAula — textos y bancos de gen/sal10.js (Salud y educación física, Grado 10), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal10 = G.sal10 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const mil = x => x >= 10000 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(x);
Object.assign(S, {
  plan: bank(x => `${cap(x)}: ¿qué parte de un plan personal equilibrado es?`, ["Aeróbica", "Fuerza", "Flexibilidad", "Menos sedentarismo"],
    ["Mejora corazón y pulmones.", "Músculos y huesos, 2–3 días.", "Movilidad tras la sesión.", "Romper el tiempo sentado."],
    [["correr 35 minutos", 0], ["ir en bici a buen ritmo", 0], ["una clase de baile intensa", 0], ["gimnasio con pesas", 1], ["flexiones y sentadillas", 1], ["escalada", 1],
     ["estiramientos al terminar", 2], ["yoga", 2], ["levantarse cada hora de la silla", 3], ["ir andando al instituto en vez de en coche", 3]]),
  test: bank(x => `${cap(x)}: ¿qué capacidad mide?`, ["Resistencia", "Fuerza", "Velocidad-agilidad", "Flexibilidad"],
    ["Prueba aeróbica.", "Prueba de fuerza.", "Prueba de rapidez y cambios de dirección.", "Prueba de amplitud de movimiento."],
    [["Course Navette", 0], ["test de Cooper (12 minutos)", 0], ["salto horizontal a pies juntos", 1], ["dinamometría manual", 1], ["flexiones de brazos", 1], ["4 × 10 m", 2],
     ["sprint de 30 m", 2], ["sit and reach", 3]]),
  nivel: bank(x => `${cap(x)}: ¿qué nivel de atención es?`, ["Atención primaria", "Atención especializada", "Urgencias y emergencias"],
    ["Centro de salud.", "Hospital y especialistas.", "112 o servicio de urgencias."],
    [["el médico de familia", 0], ["la enfermera del centro de salud", 0], ["el pediatra del barrio", 0], ["la consulta de cardiología del hospital", 1],
     ["una operación de rodilla en el hospital", 1], ["el traumatólogo", 1], ["la ambulancia tras un accidente", 2], ["llamar al 112 por un desmayo", 2]]),
  prevencion: bank(x => `${cap(x)}: ¿qué nivel de prevención es?`, ["Primaria", "Secundaria", "Terciaria"],
    ["Evitar que aparezca la enfermedad.", "Detectarla pronto.", "Reducir sus consecuencias."],
    [["vacunarse", 0], ["campaña para no empezar a fumar", 0], ["hacer ejercicio a diario", 0], ["usar casco", 0], ["medir la tensión arterial a adultos", 1],
     ["una mamografía de cribado", 1], ["revisión de la vista en el colegio", 1], ["rehabilitación tras un infarto", 2], ["fisioterapia tras una lesión", 2]]),
  vacuna: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "Es un mito o un error."],
    [["las vacunas entrenan al sistema inmunitario", 0], ["la viruela fue erradicada gracias a las vacunas", 0], ["vacunarse protege también a quien no puede vacunarse", 0],
     ["Edward Jenner creó la primera vacuna", 0], ["las vacunas causan la enfermedad que previenen", 1], ["si casi nadie enferma, ya no hace falta vacunar", 1],
     ["para el sarampión basta con vacunar al 50 %", 1], ["las vacunas solo son para bebés", 1]]),
  determinante: bank(x => `${cap(x)}: ¿qué determinante de la salud es?`, ["Biología", "Medio ambiente", "Estilo de vida", "Sistema sanitario"],
    ["Genética, edad, sexo.", "Entorno físico y social.", "Hábitos personales.", "Acceso y calidad de la atención."],
    [["tener antecedentes familiares de diabetes", 0], ["la edad", 0], ["vivir junto a una autopista contaminada", 1], ["tener zonas verdes en el barrio", 1],
     ["una vivienda húmeda y fría", 1], ["fumar", 2], ["dormir poco", 2], ["hacer deporte", 2], ["tener un centro de salud cerca", 3], ["las listas de espera", 3]]),
  sociedad: bank(x => `${cap(x)}: ¿valor o problema del deporte?`, ["Valor", "Problema"], ["Aporta algo positivo.", "Perjudica al deporte o a las personas."],
    [["respetar al rival", 0], ["esfuerzo y constancia", 0], ["cooperar con el equipo", 0], ["aceptar la derrota", 0], ["tomar sustancias prohibidas para rendir más", 1],
     ["insultos racistas en la grada", 1], ["peleas entre aficionados", 1], ["presionar a niños para que ganen a toda costa", 1]]),
  publi: bank(x => `${cap(x)}: ¿truco publicitario o buena estrategia del consumidor?`, ["Truco publicitario", "Estrategia del consumidor"],
    ["Busca vender, no informar.", "Ayuda a elegir bien."],
    [["un futbolista famoso anuncia bollería", 0], ["un dibujo animado y un regalo en la caja de cereales", 0], ["«casero» en un producto industrial", 0],
     ["la tabla por una ración diminuta", 0], ["«fuente de fibra» en unas galletas con mucho azúcar", 0], ["leer la lista de ingredientes", 1],
     ["comparar la tabla por 100 g", 1], ["elegir fruta fresca", 1], ["desconfiar de las promesas milagro", 1]]),
  triaje: bank(x => `${cap(x)}: ¿qué color de triaje le corresponde?`, ["Rojo", "Amarillo", "Verde"],
    ["Atención inmediata.", "Grave, puede esperar un poco.", "Leve, puede andar."],
    [["no respira bien", 0], ["hemorragia grave que no para", 0], ["inconsciente pero respira", 0], ["fractura de pierna, consciente, no puede andar", 1],
     ["herida profunda que ya no sangra, consciente", 1], ["camina con un pequeño corte en el brazo", 2], ["anda y solo tiene arañazos", 2], ["se torció el tobillo pero camina", 2]]),
  natural: bank(x => `${cap(x)}: ¿qué hay que hacer?`, ["Sombra y enfriar", "Abrigar y quitar ropa mojada", "Agua de mar y frío", "Inmóvil y 112"],
    ["Golpe de calor.", "Hipotermia.", "Picadura de medusa.", "Mordedura de víbora."],
    [["piel caliente y roja, confusión, a 38 °C", 0], ["mareo y calor extremo tras correr al sol", 0], ["temblores y torpeza tras caer a un río frío", 1],
     ["somnolencia y frío en la montaña con la ropa empapada", 1], ["picadura de medusa en la playa", 2], ["mordedura de víbora en el tobillo", 3]]),
  pa_q: (p, z) => `Das ${mil(p)} pasos con una zancada de ${n(z)} m. ¿Cuántos kilómetros recorres?`,
  pa_s: (p, z, d) => `${mil(p)} × ${n(z)} = ${mil(Math.round(p * z))} m = <b>${n(d)}</b> km`,
  co_q: d => `Recorres ${d} m en el test de Cooper. ¿Cuál es tu VO₂ máx aproximado? (mL/kg/min, una cifra decimal)`,
  co_s: (d, v) => `(${d} − 504,9) ÷ 44,73 ≈ <b>${n(v)}</b> mL/kg/min`,
  gr_q: (p, c) => `En una población de ${mil(p)} personas, la cobertura de vacunación es del ${c} %. ¿Cuántas están vacunadas?`,
  gr_s: (p, c, v) => `${mil(p)} × ${c} ÷ 100 = <b>${n(v)}</b>${c > 95 ? " (supera el 95 % del sarampión)" : " (no llega al 95 % del sarampión)"}`,
});
})();
