/* WikiAula — textos y bancos de gen/sal7.js (Salud y educación física, Grado 7), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal7 = G.sal7 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const hh = x => { const h = Math.floor(x) % 24, m = Math.round((x - Math.floor(x)) * 60); return `${h}:${String(m).padStart(2, "0")}`; };
Object.assign(S, {
  componente: bank(x => `${cap(x)}: ¿qué componente de la condición física saludable es?`, ["Cardiorrespiratorio", "Musculoesquelético", "Motor", "Composición corporal"],
    ["Corazón y pulmones.", "Fuerza y flexibilidad.", "Coordinación, equilibrio, agilidad.", "Músculo, grasa y hueso."],
    [["correr 20 minutos sin parar", 0], ["subir muchas escaleras sin ahogarse", 0], ["hacer 20 sentadillas", 1], ["tocar el suelo con las manos sin doblar las rodillas", 1],
     ["llevar una mochila pesada", 1], ["botar un balón mientras corres", 2], ["mantener el equilibrio sobre una pierna", 2], ["esquivar rápido a un rival", 2],
     ["la proporción de grasa y músculo del cuerpo", 3]]),
  calentar: bank(x => `${cap(x)}: ¿calentamiento general o específico?`, ["General", "Específico"], ["Sirve para cualquier actividad.", "Gestos del deporte concreto."],
    [["carrera suave", 0], ["movilidad articular", 0], ["desplazamientos variados", 0], ["estiramientos dinámicos", 0], ["toques de voleibol por parejas", 1], ["tiros a canasta", 1],
     ["salidas de velocidad antes de un 60 m", 1], ["brazadas suaves antes de nadar", 1]]),
  sistema: bank(x => `${cap(x)}: ¿esfuerzo aeróbico o anaeróbico?`, ["Aeróbico", "Anaeróbico"], ["Largo y moderado.", "Corto e intenso."],
    [["correr 30 minutos a ritmo cómodo", 0], ["una ruta en bici de una hora", 0], ["nadar 20 minutos sin parar", 0], ["un sprint de 100 m", 1], ["subir una cuesta a tope 20 segundos", 1],
     ["levantar un peso muy grande", 1], ["un salto de longitud", 1]]),
  adolescente: bank(x => `${cap(x)}: ¿hábito saludable o poco saludable?`, ["Saludable", "Poco saludable"], ["Ayuda a crecer y rendir.", "Perjudica la salud."],
    [["desayunar antes de clase", 0], ["beber agua en el recreo", 0], ["comer legumbres dos veces por semana", 0], ["tomar lácteos para el calcio", 0], ["saltarse el desayuno", 1],
     ["tomar bebidas energéticas para estudiar", 1], ["seguir una dieta milagro de internet", 1], ["comer bollería todos los días", 1]]),
  higiene: bank(x => `${cap(x)}: ¿ayuda a dormir mejor?`, ["Sí", "No"], ["Buena higiene del sueño.", "Dificulta el sueño."],
    [["acostarse a la misma hora cada día", 0], ["dejar el móvil fuera del dormitorio", 0], ["cuarto oscuro y fresco", 0], ["hacer ejercicio por la tarde", 0],
     ["ver vídeos en la cama", 1], ["tomar refresco de cola por la noche", 1], ["acostarse a las 3 el sábado y a las 22 el domingo", 1], ["hacer deporte intenso justo antes de dormir", 1]]),
  digital: bank(x => `${cap(x)}: ¿favorece el bienestar digital?`, ["Sí", "No"], ["Uso consciente.", "Uso excesivo o de riesgo."],
    [["desactivar las notificaciones de juegos", 0], ["comer sin móvil", 0], ["poner un límite diario a las redes", 0], ["subir el móvil a la altura de los ojos", 0],
     ["mirar el móvil cada 5 minutos", 1], ["compararse con fotos retocadas", 1], ["aceptar a desconocidos", 1], ["usar el móvil en la cama hasta tarde", 1]]),
  tabaco: bank(x => `${cap(x)}: ¿qué sustancia del tabaco es?`, ["Nicotina", "Alquitrán", "Monóxido de carbono"], ["Adicción.", "Cáncer, se pega a los pulmones.", "Quita sitio al oxígeno."],
    [["crea adicción", 0], ["está también en la mayoría de vapeadores", 0], ["se pega a los pulmones", 1], ["es la principal causa del cáncer de pulmón del fumador", 1],
     ["reduce el oxígeno de la sangre", 2], ["hace que un fumador se canse antes al correr", 2]]),
  pls: bank(x => `${cap(x)}: ¿qué hay que hacer?`, ["Posición lateral de seguridad", "112 y RCP", "No moverla (salvo peligro)"],
    ["Inconsciente que respira.", "No responde y no respira.", "Posible lesión de columna."],
    [["no responde pero respira con normalidad", 0], ["se ha desmayado y respira", 0], ["no responde y no respira", 1], ["no respira y no tiene pulso aparente", 1],
     ["se ha caído de un andamio, no responde y respira", 2], ["motorista caído tras un accidente", 2]]),
  inclusivo: bank(x => `${cap(x)}: ¿qué deporte es?`, ["Goalball", "Baloncesto en silla de ruedas", "Boccia", "Natación paralímpica"],
    ["Antifaz y balón con cascabeles.", "En silla.", "Lanzar bolas cerca de una diana.", "En la piscina."],
    [["todos llevan antifaz y el balón suena", 0], ["se juega en silla, con canasta a la altura normal", 1], ["se lanzan bolas de cuero para acercarlas a una bola blanca", 2],
     ["pruebas en la piscina según el tipo de discapacidad", 3], ["se lanza el balón rodando a ras de suelo hacia una portería ancha", 0], ["se puede empujar la silla dos veces antes de botar", 1], ["se puede jugar con una canaleta y un asistente", 2], ["a los nadadores ciegos les avisan con un toque al llegar a la pared", 3]]),
  zo_q: (e, p) => `Para alguien de ${e} años, ¿cuántas pulsaciones son el ${p} % de su FC máxima (220 − edad)? (redondea)`,
  zo_s: (e, f, p, z) => `220 − ${e} = ${f}; ${f} × ${n(p / 100)} ≈ <b>${z}</b>`,
  alimentos: [["Una ración de pasta"], ["Un bocadillo"], ["Un yogur"], ["Un batido"], ["Una ración de lentejas"], ["Una barrita de cereales"]],
  kc_q: (a, h, p, g) => `${a} tiene ${h} g de hidratos, ${p} g de proteínas y ${g} g de grasas. ¿Cuántas kcal aporta? (4, 4 y 9 kcal/g)`,
  kc_s: (h, p, g, k) => `4 × ${h} + 4 × ${p} + 9 × ${g} = ${4 * h} + ${4 * p} + ${9 * g} = <b>${k}</b> kcal`,
  ho_q: (a, b) => `Te acuestas a las ${hh(a)} y te levantas a las ${hh(b)}. ¿Cuántas horas duermes?`,
  ho_s: (a, b, h) => `Hasta medianoche: ${n(24 - a)} h; después: ${n(b)} h. Total: <b>${n(h)}</b> h`,
});
})();
