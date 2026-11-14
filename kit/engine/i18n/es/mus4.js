/* WikiAula — textos y bancos de gen/mus4.js (Música, Grado 4), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus4 = G.mus4 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(+x.toFixed(2)).replace(".", ",");
Object.assign(S, {
  nota: bank(x => `En clave de sol, ¿qué nota está ${x}?`, ["do", "re", "mi", "fa", "sol", "la", "si"],
    ["Línea adicional abajo o tercer espacio.", "Bajo la 1.ª línea o 4.ª línea.", "1.ª línea o 4.º espacio.", "1.er espacio o 5.ª línea.", "2.ª línea o encima de la 5.ª.",
     "2.º espacio.", "3.ª línea."],
    [["en la cuarta línea", 1], ["en el cuarto espacio", 2], ["en la quinta línea", 3], ["justo encima de la quinta línea", 4], ["en el tercer espacio", 0],
     ["en la tercera línea", 6], ["en el segundo espacio", 5], ["en la segunda línea", 4], ["en la primera línea", 2], ["en el primer espacio", 3],
     ["en la línea adicional de abajo", 0], ["justo debajo de la primera línea", 1]]),
  tempo: bank(x => `«${cap(x)}»: ¿rápido o lento?`, ["Rápido", "Lento"], ["Allegro, presto, accelerando.", "Lento, largo, adagio, ritardando."],
    [["allegro", 0], ["presto", 0], ["vivace", 0], ["accelerando", 0], ["lento", 1], ["largo", 1], ["adagio", 1], ["ritardando", 1]]),
  forma: bank(x => `Una obra tiene las partes ${x}. ¿Qué forma es?`, ["Binaria", "Ternaria", "Rondó"], ["AB.", "ABA.", "Un estribillo que vuelve: ABACA…"],
    [["A B", 0], ["A A B B (cada parte repetida)", 0], ["A B A", 1], ["A B A (con la última A un poco más corta)", 1], ["A B A C A", 2], ["A B A C A D A", 2],
     ["estribillo, estrofa, estribillo, estrofa, estribillo", 2]]),
  cuerda: bank(x => `${cap(x)}: ¿cuerda frotada, pulsada o percutida?`, ["Frotada", "Pulsada", "Percutida"], ["Con arco.", "Con dedos o púa.", "Con macillos."],
    [["el violín", 0], ["la viola", 0], ["el violonchelo", 0], ["el contrabajo tocado con arco", 0], ["la guitarra", 1], ["el arpa", 1], ["el laúd", 1], ["la bandurria", 1],
     ["el piano", 2]]),
  viento: bank(x => `${cap(x)}: ¿viento madera o viento metal?`, ["Viento madera", "Viento metal"], ["Bisel o lengüeta.", "Labios en boquilla."],
    [["la flauta travesera", 0], ["el clarinete", 0], ["el oboe", 0], ["el fagot", 0], ["el saxofón", 0], ["la trompeta", 1], ["la trompa", 1], ["el trombón", 1], ["la tuba", 1]]),
  medieval: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["el canto gregoriano se cantaba en latín", 0], ["el canto gregoriano no llevaba instrumentos", 0], ["los juglares iban de pueblo en pueblo", 0],
     ["Alfonso X reunió las Cantigas de Santa María", 0], ["los neumas eran signos para escribir la música", 0], ["el canto gregoriano llevaba guitarras eléctricas", 1],
     ["los trovadores cantaban solo en las iglesias", 1], ["las Cantigas son del siglo XX", 1]]),
  escena: bank(x => `${cap(x)}: ¿ópera, zarzuela o ballet?`, ["Ópera", "Zarzuela", "Ballet"], ["Todo cantado.", "Canto y partes habladas, española.", "Danza sin palabras."],
    [["teatro cantado de principio a fin", 0], ["La flauta mágica, de Mozart", 0], ["teatro musical español con partes habladas", 1], ["La verbena de la Paloma", 1],
     ["una historia contada solo con danza", 2], ["El cascanueces", 2], ["El lago de los cisnes", 2]]),
  pu_q: nm => `¿Cuántos tiempos dura una ${nm} con puntillo?`,
  pu_s: v => `${n(v)} + ${n(v / 2)} = <b>${n(v * 1.5)}</b> tiempos`,
  li_q: (a, b) => `Una ${a} ligada a una ${b}: ¿cuántos tiempos suena?`,
  li_s: (a, b) => `${n(a)} + ${n(b)} = <b>${n(a + b)}</b> tiempos`,
  bp_q: (p, m) => `A ${p} pulsos por minuto, ¿cuántos pulsos hay en ${m} minuto${m > 1 ? "s" : ""}?`,
  bp_s: (p, m) => `${p} × ${m} = <b>${p * m}</b> pulsos`,
  bs_q: (p, s) => `A ${p} pulsos por minuto, ¿cuántos pulsos hay en ${s} segundos?`,
  bs_s: (p, s) => `${p} × ${s} ÷ 60 = <b>${p * s / 60}</b> pulsos`,
  bt_q: p => `A ${p} pulsos por minuto, ¿cuántos segundos pasan entre un pulso y el siguiente? (dos decimales)`,
  bt_s: p => `60 ÷ ${p} ≈ <b>${n(60 / p)}</b> s`,
});
})();
