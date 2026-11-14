/* WikiAula — textos y bancos de gen/mus1.js (Música, Grado 1), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus1 = G.mus1 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  sonido: bank(x => `${cap(x)}: ¿sonido agradable o ruido molesto?`, ["Sonido agradable", "Ruido molesto"], ["Gusta escucharlo.", "Molesta o hace daño."],
    [["el canto de un pájaro", 0], ["una canción tranquila", 0], ["la lluvia suave en la ventana", 0], ["una nana", 0], ["un taladro en la pared", 1],
     ["un claxon que no para", 1], ["unos petardos al lado del oído", 1], ["gritos en el comedor", 1]]),
  duracion: bank(x => `${cap(x)}: ¿sonido largo o corto?`, ["Largo", "Corto"], ["Dura mucho.", "Dura poco."],
    [["una campana que se queda vibrando", 0], ["la sirena de una ambulancia", 0], ["el aullido de un lobo", 0], ["un «¡piiiii!» de tren", 0], ["una palmada", 1],
     ["un golpe en el tambor", 1], ["dos claves que chocan", 1], ["una gota que cae", 1]]),
  intensidad: bank(x => `${cap(x)}: ¿sonido fuerte o suave?`, ["Fuerte", "Suave"], ["Se oye mucho.", "Se oye poco."],
    [["un trueno", 0], ["un grito", 0], ["un camión que pasa", 0], ["un tambor golpeado con fuerza", 0], ["un susurro", 1], ["un gato que ronronea", 1], ["la lluvia fina", 1],
     ["una nana cantada bajito", 1]]),
  altura: bank(x => `${cap(x)}: ¿sonido agudo o grave?`, ["Agudo", "Grave"], ["Fino, alto.", "Gordo, bajo."],
    [["el pío de un pollito", 0], ["un silbato", 0], ["la lámina pequeña del xilófono", 0], ["la voz de un ratón de dibujos", 0], ["el rugido de un oso", 1], ["una tuba", 1],
     ["la sirena de un barco grande", 1], ["el mugido de una vaca", 1], ["la lámina grande del xilófono", 1]]),
  cuerpo: bank(x => `Para hacer ${x}, ¿qué usas?`, ["Las manos", "Los dedos", "Los pies", "La voz"], ["Palmas.", "Pitos.", "Pisotones.", "Cantar o silbar."],
    [["palmas", 0], ["golpes en las rodillas", 0], ["pitos (chasquidos)", 1], ["pisotones en el suelo", 2], ["claqué", 2], ["una canción", 3], ["un silbido", 3]]),
  instrumento: bank(x => `${cap(x)}: ¿cómo se toca?`, ["Se golpea", "Se agita"], ["Con la mano, una baqueta u otra pieza.", "Moviéndolo para que suene."],
    [["el tambor", 0], ["el triángulo", 0], ["las claves", 0], ["el xilófono", 0], ["las maracas", 1], ["un sonajero", 1], ["los cascabeles", 1]]),
  voz: bank(x => `Al cantar, ${x}: ¿está bien o mal?`, ["Bien", "Mal"], ["Cuida la voz y suena mejor.", "Daña la voz o desafina el grupo."],
    [["estar con la espalda recta", 0], ["respirar tranquilos", 0], ["escuchar a los compañeros", 0], ["coger aire por la nariz", 0], ["gritar para que se oiga más", 1],
     ["cantar encorvado", 1], ["cantar más rápido que los demás", 1], ["forzar la voz hasta que duela", 1]]),
  pulso: bank(x => `${cap(x)}: ¿pulso rápido o lento?`, ["Rápido", "Lento"], ["Como corriendo.", "Como andando despacio."],
    [["una música para correr", 0], ["el corazón después de saltar mucho", 0], ["una canción para saltar a la comba", 0], ["una nana para dormir", 1],
     ["el tic-tac de un reloj grande y antiguo", 1], ["una música para estirarse despacio", 1]]),
});
})();
