/* WikiAula — textos y bancos de gen/mus2.js (Música, Grado 2), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus2 = G.mus2 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const SYL = ["ta", "ti-ti", "ta-a", "(silencio)"], VAL = [1, 1, 2, 1];
Object.assign(S, {
  material: bank(x => `${cap(x)}: ¿de qué material es lo que suena?`, ["Madera", "Metal", "Parche"], ["Sonido seco.", "Sonido brillante y largo.", "Piel tensa que retumba."],
    [["las claves", 0], ["la caja china", 0], ["el xilófono", 0], ["el triángulo", 1], ["los platillos", 1], ["una campana", 1], ["el tambor", 2], ["el bombo", 2], ["el pandero", 2]]),
  cualidad: bank(x => `${cap(x)}: ¿qué cualidad del sonido cambia o reconoces?`, ["Altura", "Duración", "Intensidad", "Timbre"],
    ["Agudo o grave.", "Largo o corto.", "Fuerte o suave.", "Quién suena."],
    [["una sirena que pasa de grave a aguda", 0], ["el pío del pollito frente al mugido de la vaca", 0], ["una campana que suena mucho rato", 1], ["una palmada frente a un silbido largo", 1],
     ["un tambor cada vez más fuerte", 2], ["hablar en susurros", 2], ["reconocer la voz de mamá por teléfono", 3], ["distinguir una flauta de un violín", 3]]),
  pulso: bank(x => `${cap(x)}: ¿pulso o ritmo?`, ["Pulso", "Ritmo"], ["Golpe regular, siempre igual.", "Combinación de sonidos largos y cortos."],
    [["el tic-tac de un reloj", 0], ["los pasos al marchar", 0], ["el latido del corazón", 0], ["el metrónomo", 0], ["las palmas siguiendo las sílabas de la canción", 1],
     ["«ma-ri-po-sa» dicho con palmas", 1], ["los sonidos largos y cortos de la melodía", 1], ["«pe-ra, pe-ra, kiwi, melón» con palmas", 1]]),
  figura: bank(x => `${cap(x)}: ¿qué figura es?`, ["Negra", "Dos corcheas", "Blanca", "Silencio de negra"],
    ["«ta», 1 pulso.", "«ti-ti», 1 pulso.", "«ta-a», 2 pulsos.", "1 pulso sin sonar."],
    [["dura un pulso y decimos «ta»", 0], ["un sonido de un pulso", 0], ["dos sonidos rápidos en un pulso", 1], ["decimos «ti-ti»", 1], ["un sonido de dos pulsos", 2],
     ["decimos «ta-a»", 2], ["un pulso sin sonido", 3]]),
  familia: bank(x => `${cap(x)}: ¿cuerda, viento o percusión?`, ["Cuerda", "Viento", "Percusión"], ["Vibran sus cuerdas.", "Se sopla.", "Se golpea, agita o frota."],
    [["la guitarra", 0], ["el violín", 0], ["el arpa", 0], ["el contrabajo", 0], ["la flauta", 1], ["la trompeta", 1], ["el clarinete", 1], ["el saxofón", 1], ["el tambor", 2],
     ["el xilófono", 2], ["los platillos", 2], ["las maracas", 2]]),
  pedro: bank(x => `En «Pedro y el lobo», ¿qué instrumento representa ${x}?`, ["Flauta", "Oboe", "Clarinete", "Fagot", "Trompas", "Cuerda"],
    ["Aguda y ágil.", "Nasal.", "Suave y sigiloso.", "Grave.", "Fuertes y amenazantes.", "Violines y compañía."],
    [["al pájaro", 0], ["al pato", 1], ["al gato", 2], ["al abuelo", 3], ["al lobo", 4], ["a Pedro", 5]]),
  danza: bank(x => `${cap(x)}: ¿de dónde es típica?`, ["Aragón", "Andalucía", "Galicia", "Cataluña"],
    ["La jota.", "Las sevillanas.", "La muñeira.", "La sardana."],
    [["la jota", 0], ["la danza que se baila saltando en las fiestas del Pilar", 0], ["las sevillanas", 1], ["la danza de la Feria de Abril", 1], ["la muñeira", 2],
     ["la danza con gaita y pandereta del noroeste", 2], ["la sardana", 3], ["la danza en corro cogidos de las manos", 3]]),
  uso: bank(x => `${cap(x)}: ¿para qué se usa la música?`, ["Celebrar", "Relajar", "Acompañar imágenes", "Vender", "Representar"],
    ["Fiestas.", "Calmar o dormir.", "Banda sonora.", "Anuncios.", "Himnos."],
    [["cumpleaños feliz en una fiesta", 0], ["la música de una boda", 0], ["una nana para dormir al bebé", 1], ["música suave para descansar", 1],
     ["la música de una película de miedo", 2], ["la canción de un videojuego", 2], ["una canción pegadiza en un anuncio de galletas", 3], ["el himno antes del partido", 4]]),
  co_q: toks => `¿Cuántos pulsos dura este ritmo? ${toks.map(t => SYL[t]).join(" · ")}`,
  co_s: (toks, tot) => `${toks.map(t => VAL[t]).join(" + ")} = <b>${tot}</b> pulsos`,
});
})();
