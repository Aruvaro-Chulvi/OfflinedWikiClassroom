/* WikiAula — textos y bancos de gen/pla6.js (Educación plástica y visual, Grado 6), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla6 = G.pla6 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const mil = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
Object.assign(S, {
  composicion: bank(x => `${cap(x)}: ¿qué concepto de composición es?`, ["Regla de los tercios", "Equilibrio simétrico", "Equilibrio asimétrico", "Ritmo"],
    ["Lo importante en las líneas o cruces de 3 × 3.", "Dos mitades iguales: calma.", "Elementos distintos que se compensan.", "Repetición de formas o colores."],
    [["el horizonte en la línea del tercio inferior", 0], ["la persona en la línea vertical derecha de una cuadrícula 3 × 3", 0], ["una fachada con una torre igual a cada lado", 1],
     ["un retrato de frente perfectamente centrado y ordenado", 1], ["un árbol grande cerca del centro y un pájaro pequeño en la esquina", 2],
     ["una mancha oscura pequeña compensa una clara grande", 2], ["una fila de farolas iguales que se repite", 3], ["ventanas iguales repetidas a lo largo de un edificio", 3]]),
  digital: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["una foto digital está hecha de píxeles", 0], ["un megapíxel es un millón de píxeles", 0], ["las pantallas mezclan luz roja, verde y azul", 0],
     ["una imagen vectorial se amplía sin perder calidad", 0], ["al ampliar mucho una foto se ven los píxeles", 0], ["una imagen vectorial está hecha de píxeles", 1],
     ["menos píxeles significa más detalle", 1], ["RGB significa rojo, gris y blanco", 1]]),
  edicion: bank(x => `Quieres ${x}. ¿Qué ajuste usas?`, ["Recortar", "Brillo", "Contraste", "Saturación", "Enderezar"],
    ["Quitar lo que sobra.", "Más clara u oscura.", "Más diferencia entre claros y oscuros.", "Colores más o menos intensos.", "Corregir lo torcido."],
    [["quitar a un desconocido que aparece en el borde", 0], ["mejorar el encuadre", 0], ["aclarar una foto demasiado oscura", 1], ["oscurecer una foto quemada", 1],
     ["que los blancos y negros destaquen más", 2], ["que una foto apagada tenga más fuerza", 2], ["pasar la foto a blanco y negro", 3], ["colores más vivos", 3],
     ["poner recto el horizonte del mar", 4]]),
  movimiento: bank(x => `${cap(x)}: ¿qué movimiento artístico es?`, ["Impresionismo", "Cubismo", "Surrealismo", "Arte pop", "Abstracción"],
    ["La luz de un momento.", "Formas geométricas, varios puntos de vista.", "Los sueños.", "Consumo, cómic y famosos.", "Solo formas y colores."],
    [["pinceladas sueltas al aire libre para captar la luz", 0], ["Monet y sus nenúfares", 0], ["una guitarra descompuesta en planos geométricos", 1], ["Picasso y Braque", 1],
     ["relojes que se derriten en un paisaje de sueño", 2], ["Dalí", 2], ["latas de sopa repetidas con colores planos", 3], ["Andy Warhol", 3],
     ["rectángulos rojos, amarillos y azules entre líneas negras", 4], ["Kandinsky y Mondrian", 4]]),
  patrimonio: bank(x => `${cap(x)}: ¿patrimonio material o inmaterial?`, ["Material", "Inmaterial"], ["Se puede tocar: edificios, obras.", "Tradiciones, fiestas, saberes."],
    [["la Alhambra", 0], ["el acueducto de Segovia", 0], ["las pinturas de Altamira", 0], ["un cuadro de Velázquez", 0], ["el flamenco", 1], ["los castells", 1],
     ["la dieta mediterránea", 1], ["una fiesta tradicional del pueblo", 1]]),
  diseno: bank(x => `${cap(x)}: ¿qué aspecto del diseño se cuida sobre todo?`, ["Función", "Ergonomía", "Ecodiseño"],
    ["Que sirva bien.", "Que se adapte al cuerpo.", "Que sea sostenible."],
    [["un paraguas que no se da la vuelta con el viento", 0], ["una botella que no gotea al servir", 0], ["una taza con asas grandes para la abuela", 1],
     ["una silla con la altura adecuada para la espalda", 1], ["el mango de unas tijeras adaptado a la mano", 1], ["un envase rellenable de un solo plástico", 2],
     ["un mueble que se desmonta y se repara", 2], ["usar madera certificada y reciclable", 2]]),
  fase: bank(x => `${cap(x)}: ¿en qué fase del proyecto estás?`, ["Idea", "Investigación", "Bocetos", "Realización", "Presentación", "Evaluación"],
    ["Qué quiero contar.", "Buscar referencias.", "Probar con dibujos rápidos.", "Hacer la obra.", "Exponerla.", "Pensar qué mejorar."],
    [["hacer una lluvia de ideas", 0], ["buscar cuadros de otros artistas sobre el tema", 1], ["mirar libros y fotos de referencia", 1],
     ["dibujar tres composiciones rápidas para elegir", 2], ["pintar el cuadro definitivo con acuarela", 3], ["colgar la obra con su título y una explicación", 4],
     ["pensar qué saldría mejor la próxima vez", 5]]),
  es_q: (E, d) => `En un plano a escala 1:${E}, una medida es de ${d} cm. ¿Cuánto mide en la realidad? (en metros)`,
  es_s: (E, d, r) => `${d} × ${E} = ${r} cm = <b>${n(r / 100)}</b> m`,
  es_q2: (E, r) => `Un objeto mide ${r} cm. ¿Cuántos centímetros mide dibujado a escala 1:${E}?`,
  es_s2: (E, r, d) => `${r} ÷ ${E} = <b>${d}</b> cm`,
  cu_q: (a, b) => `Copias un dibujo con cuadros de ${a} cm en una cuadrícula de ${b} cm. ¿Cuántas veces más grande será?`,
  cu_s: (a, b, k) => `${b} ÷ ${a} = <b>${k}</b> veces`,
  cu_q2: (w, k) => `Un dibujo mide ${w} cm de ancho y lo amplías ${k} veces con una cuadrícula. ¿Cuánto medirá de ancho? (cm)`,
  cu_s2: (w, k, r) => `${w} × ${k} = <b>${r}</b> cm`,
  px_q: (w, h) => `¿Cuántos píxeles tiene una imagen de ${w} × ${h}?`,
  px_s: (w, h, p) => `${w} × ${h} = <b>${mil(p)}</b> píxeles`,
  mp_q: (w, h) => `¿Cuántos megapíxeles tiene una foto de ${w} × ${h}? (una cifra decimal)`,
  mp_s: (w, h, p) => `${w} × ${h} = ${mil(p)} píxeles ≈ <b>${n(+(p / 1e6).toFixed(1))}</b> megapíxeles`,
});
})();
