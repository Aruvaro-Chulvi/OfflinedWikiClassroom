/* WikiAula — textos y bancos de gen/mus3.js (Música, Grado 3), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus3 = G.mus3 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const FIG = ["redonda", "blanca", "negra", "corchea", "silencio de negra", "silencio de blanca"], VAL = ["4", "2", "1", "½", "1", "2"];
Object.assign(S, {
  pentagrama: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["el pentagrama tiene cinco líneas", 0], ["las líneas se cuentan de abajo arriba", 0], ["la clave de sol empieza en la segunda línea", 0],
     ["cuanto más arriba, más aguda es la nota", 0], ["las líneas adicionales sirven para notas que no caben", 0], ["el pentagrama tiene cinco espacios", 1],
     ["las líneas se cuentan de arriba abajo", 1], ["la clave de sol empieza en la cuarta línea", 1]]),
  nota: bank(x => `En clave de sol, ¿qué nota se escribe ${x}?`, ["do", "re", "mi", "fa", "sol", "la", "si"],
    ["Línea adicional abajo (o tercer espacio, el agudo).", "Debajo de la primera línea.", "Primera línea (o cuarto espacio).", "Primer espacio (o quinta línea).",
     "Segunda línea.", "Segundo espacio.", "Tercera línea."],
    [["en una línea adicional debajo del pentagrama", 0], ["en el tercer espacio", 0], ["justo debajo de la primera línea", 1], ["en la cuarta línea", 1],
     ["en la primera línea", 2], ["en el cuarto espacio", 2], ["en el primer espacio", 3], ["en la quinta línea", 3], ["en la segunda línea", 4], ["en el segundo espacio", 5],
     ["en la tercera línea", 6]]),
  flauta: bank(x => `Al tocar la flauta, ${x}: ¿bien o mal?`, ["Bien", "Mal"], ["Así suena bien.", "Así chilla o no suena."],
    [["poner la mano izquierda arriba", 0], ["tapar con la yema de los dedos", 0], ["soplar suave, como diciendo «tu»", 0], ["sujetarla con los labios sin morder", 0],
     ["soplar muy fuerte", 1], ["dejar un agujero medio destapado", 1], ["poner la mano derecha arriba", 1], ["morder la boquilla", 1]]),
  orquesta: bank(x => `${cap(x)}: ¿a qué sección de la orquesta pertenece?`, ["Cuerda frotada", "Viento madera", "Viento metal", "Percusión"],
    ["Con arco.", "Flautas, oboes, clarinetes, fagotes.", "Trompas, trompetas, trombones, tuba.", "Se golpea."],
    [["el violín", 0], ["la viola", 0], ["el violonchelo", 0], ["el contrabajo", 0], ["la flauta", 1], ["el oboe", 1], ["el clarinete", 1], ["el fagot", 1], ["la trompeta", 2],
     ["el trombón", 2], ["la trompa", 2], ["la tuba", 2], ["los timbales", 3], ["el bombo", 3], ["los platillos", 3]]),
  matiz: bank(x => `${cap(x)}: ¿qué significa?`, ["Muy suave", "Suave", "Fuerte", "Muy fuerte", "Cada vez más fuerte", "Cada vez más suave"],
    ["pp (pianissimo).", "p (piano).", "f (forte).", "ff (fortissimo).", "Crescendo.", "Diminuendo."],
    [["pp", 0], ["pianissimo", 0], ["p", 1], ["piano", 1], ["f", 2], ["forte", 2], ["ff", 3], ["fortissimo", 3], ["crescendo", 4], ["el signo que se abre (<)", 4],
     ["diminuendo", 5], ["el signo que se cierra (>)", 5]]),
  compositor: bank(x => `${cap(x)}: ¿qué compositor es?`, ["Bach", "Vivaldi", "Mozart", "Beethoven", "Chaikovski"],
    ["Alemania, órgano.", "Italia, Las cuatro estaciones.", "Austria, niño prodigio.", "Alemania, sordo, Novena.", "Rusia, ballets."],
    [["compuso mucha música para órgano", 0], ["compuso Las cuatro estaciones", 1], ["era un niño prodigio y compuso La flauta mágica", 2], ["compuso Pequeña serenata nocturna", 2],
     ["siguió componiendo aunque se quedó sordo", 3], ["compuso la Novena sinfonía", 3], ["compuso Para Elisa", 3], ["compuso El cascanueces", 4], ["compuso El lago de los cisnes", 4]]),
  cp_q: t => `¿Cuántos tiempos tiene un compás de ${t}/4?`,
  cp_s: t => `El número de arriba indica los tiempos: <b>${t}</b>`,
  cn_q: (tot, t) => `Una canción tiene ${tot} tiempos en compás de ${t}/4. ¿Cuántos compases tiene?`,
  cn_s: (tot, t, k) => `${tot} ÷ ${t} = <b>${k}</b> compases`,
  fi_q: idx => `¿Cuántos tiempos suman? ${idx.map(i => FIG[i]).join(" + ")}`,
  fi_s: (idx, tot) => `${idx.map(i => VAL[i]).join(" + ")} = <b>${n(tot)}</b> tiempos`,
});
})();
