/* WikiAula — textos y bancos de gen/sal3.js (Salud y educación física, Grado 3), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal3 = G.sal3 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
Object.assign(S, {
  locomotor: bank(x => `${cap(x)}: ¿hueso, músculo o articulación?`, ["Hueso", "Músculo", "Articulación"], ["Duro, forma el esqueleto.", "Se contrae y tira.", "Une huesos y permite doblar."],
    [["el fémur", 0], ["el cráneo", 0], ["las costillas", 0], ["la columna vertebral", 0], ["el bíceps", 1], ["el tríceps", 1], ["los gemelos", 1], ["los abdominales", 1], ["la rodilla", 2],
     ["el codo", 2], ["el hombro", 2], ["el tobillo", 2]]),
  postura: bank(x => `${cap(x)}: ¿buena o mala postura?`, ["Buena", "Mala"], ["Cuida la espalda.", "Daña la espalda."],
    [["sentarse con la espalda apoyada", 0], ["doblar las rodillas para coger peso", 0], ["llevar la mochila con las dos asas", 0], ["pantalla a la altura de los ojos", 0],
     ["leer tumbado boca abajo mucho rato", 1], ["llevar la mochila colgada de un hombro", 1], ["coger peso doblando la espalda", 1], ["sentarse en el borde de la silla encorvado", 1]]),
  piramide: bank(x => `${cap(x)}: ¿en qué nivel de la pirámide de actividad está?`, ["Todos los días", "Tres veces por semana", "De vez en cuando"],
    ["Actividad diaria.", "Intensa o de fuerza.", "Sedentaria."],
    [["ir andando al cole", 0], ["subir escaleras", 0], ["jugar en el parque", 0], ["ayudar en casa", 0], ["un partido de baloncesto", 1], ["nadar", 1], ["correr", 1], ["trepar en el parque", 1],
     ["jugar a la consola", 2], ["ver la tele", 2], ["estar sentado mucho rato", 2]]),
  plato: bank(x => `${cap(x)}: ¿en qué parte del plato saludable va?`, ["Verduras (½)", "Proteínas (¼)", "Cereales (¼)"], ["Mitad del plato.", "Un cuarto.", "Un cuarto."],
    [["ensalada", 0], ["brócoli", 0], ["pimientos asados", 0], ["judías verdes", 0], ["lentejas", 1], ["pescado", 1], ["huevo", 1], ["pollo", 1], ["arroz integral", 2], ["pan integral", 2],
     ["pasta", 2], ["patata", 2]]),
  coop: bank(x => `${cap(x)}: ¿juego cooperativo o competitivo?`, ["Cooperativo", "Competitivo"], ["Objetivo común.", "Unos ganan y otros pierden."],
    [["el paracaídas con la pelota", 0], ["pasar un aro sin soltarse de las manos", 0], ["el nudo humano", 0], ["construir una torre humana entre todos", 0], ["un partido de fútbol", 1],
     ["una carrera de relevos entre equipos", 1], ["el balón prisionero", 1], ["las sillas musicales", 1]]),
  bici: bank(x => `${cap(x)}: ¿lo hace un ciclista seguro?`, ["Sí", "No"], ["Cumple las normas.", "Se pone en peligro."],
    [["llevar el casco abrochado", 0], ["señalar con el brazo antes de girar", 0], ["llevar luz delante y detrás", 0], ["bajarse en una acera con gente", 0], ["revisar los frenos", 0],
     ["ir con auriculares", 1], ["llevar a un amigo de paquete", 1], ["saltarse un semáforo", 1], ["ir sin casco", 1]]),
  lesion: bank(x => `${cap(x)}: ¿previene lesiones o las provoca?`, ["Previene", "Provoca"], ["Prepara o protege el cuerpo.", "Aumenta el riesgo."],
    [["calentar antes de jugar", 0], ["estirar suave al acabar", 0], ["usar zapatillas bien atadas", 0], ["beber agua", 0], ["parar si algo duele", 0], ["empezar a correr a tope sin calentar", 1],
     ["jugar con chanclas", 1], ["seguir jugando con dolor", 1], ["empujar a un compañero", 1]]),
  mo_q: p => `Si pesas ${p} kg, ¿cuánto debería pesar como máximo tu mochila (10 % de tu peso)?`,
  mo_s: (p, m) => `${p} ÷ 10 = <b>${n(m)}</b> kg`,
  pu_q: (l, s) => `Cuentas ${l} latidos en ${s} segundos. ¿Cuántas pulsaciones por minuto son?`,
  pu_s: (l, k, t) => `${l} × ${k} = <b>${t}</b> pulsaciones por minuto`,
});
})();
