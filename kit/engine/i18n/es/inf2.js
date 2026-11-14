/* WikiAula — textos y bancos de gen/inf2.js (Informática, Grado 2), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.inf2 = G.inf2 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  es: bank(x => `${cap(x)}: ¿es de entrada o de salida?`, ["Entrada", "Salida", "Entrada y salida"],
    ["Damos información al ordenador.", "El ordenador nos da el resultado.", "Las dos cosas a la vez."],
    [["teclado", 0], ["ratón", 0], ["micrófono", 0], ["cámara", 0], ["escáner", 0], ["pantalla del ordenador", 1], ["altavoces", 1], ["impresora", 1], ["auriculares", 1],
     ["pantalla táctil de la tableta", 2]]),
  app: bank(x => `Quiero ${x}. ¿Qué aplicación uso?`, ["Dibujo", "Procesador de texto", "Cámara", "Calculadora", "Música"],
    ["Para pintar.", "Para escribir.", "Para hacer fotos y vídeos.", "Para hacer cuentas.", "Para escuchar canciones."],
    [["pintar un dragón", 0], ["colorear un mandala", 0], ["escribir un cuento", 1], ["hacer una lista de la compra", 1], ["hacer una foto a mi perro", 2], ["grabar un vídeo", 2],
     ["sumar 35 + 48", 3], ["escuchar una canción", 4]]),
  archivo: bank(x => `${cap(x)}: ¿es un archivo o una carpeta?`, ["Archivo", "Carpeta"], ["Un trabajo guardado.", "Una caja para ordenar archivos."],
    [["dibujo-gato", 0], ["cuento-dragon", 0], ["foto-playa", 0], ["cancion-cumple", 0], ["Dibujos", 1], ["Fotos del viaje", 1], ["Cuentos", 1], ["Deberes de mates", 1]]),
  seqs: [["llenar la maceta de tierra", "hacer un agujero", "poner la semilla", "taparla y regar"], ["coger el pijama", "quitarse la ropa", "ponerse el pijama", "meterse en la cama"],
         ["abrir el programa de dibujo", "dibujar", "guardar el dibujo", "cerrar el programa"], ["ir al paso de peatones", "pararse en el bordillo", "mirar a los dos lados", "cruzar"],
         ["sacar el libro", "buscar la página", "leer el cuento", "guardar el libro"]],
  goal: ["plantar una semilla", "irse a dormir", "hacer un dibujo en el ordenador", "cruzar la calle", "leer un cuento"],
  al_q1: g => `Algoritmo para ${g}. ¿Cuál es el primer paso?`,
  al_q2: g => `Algoritmo para ${g}. ¿Cuál es el último paso?`,
  al_s: seq => `El orden es: ${seq.map((x, i) => `${i + 1}. ${x}`).join(" → ")}.`,
  ro_q1: (dx, dy) => `El robot tiene que ir ${dx} ${dx === 1 ? "casilla" : "casillas"} a la derecha y ${dy} hacia abajo, sin obstáculos. ¿Cuántas flechas necesita como mínimo?`,
  ro_s1: (dx, dy) => `${dx} + ${dy} = <b>${dx + dy}</b> flechas`,
  ro_q2: p => `Programa del robot: ${p}. ¿Cuántas casillas avanza hacia la derecha?`,
  ro_s2: (p, n) => `Contamos las flechas →: <b>${n}</b>`,
  re_q1: (n, g) => `«Repite ${n} veces: ${g}». ¿Cuántas casillas se mueve el robot?`,
  re_s1: (n, k) => `${n} · ${k} = <b>${n * k}</b>`,
  re_q2: p => `Quieres escribir ${p} con un bucle: «repite ? veces». ¿Qué número va en lugar de «?»?`,
  re_s2: (m, a) => `Hay ${m} flechas iguales → «repite <b>${m}</b> veces: ${a}»`,
  ord: ["1.ª", "2.ª", "3.ª", "4.ª", "5.ª"],
  er_q: (dx, dy, p) => `La meta está ${dx} ${dx === 1 ? "casilla" : "casillas"} a la derecha y ${dy} abajo. El programa es ${p}. ¿Qué flecha está mal?`,
  er_s: (o, a, p) => `La <b>${o}</b> flecha debería ser ${a}. Programa correcto: ${p}.`,
  pintar: bank(x => `Quiero ${x}. ¿Qué herramienta uso?`, ["Lápiz", "Pincel", "Bote de pintura", "Goma", "Formas", "Deshacer"],
    ["Líneas finas.", "Trazos gruesos.", "Rellena una zona cerrada.", "Borra.", "Círculos, rectángulos, rectas.", "Quita lo último."],
    [["hacer un contorno fino", 0], ["pintar un trazo gordo", 1], ["rellenar de azul el cielo", 2], ["borrar una mancha", 3], ["hacer un círculo perfecto", 4],
     ["dibujar un rectángulo", 4], ["quitar lo último que hice", 5]]),
  texto: bank(x => `Quiero ${x}. ¿Qué uso?`, ["Mayúsculas", "Espacio", "Intro", "Borrar", "Formato"],
    ["Letra grande.", "Hueco entre palabras.", "Línea nueva.", "Quitar una letra.", "Tamaño, color, negrita."],
    [["escribir la primera letra de mi nombre", 0], ["separar dos palabras", 1], ["empezar una línea nueva", 2], ["quitar una letra equivocada", 3], ["poner el título más grande", 4],
     ["escribir en rojo", 4], ["poner una palabra en negrita", 4]]),
  clave: bank(x => `${cap(x)}: ¿está bien o mal?`, ["Está bien", "Está mal"], ["Así la contraseña es segura.", "Así alguien podría entrar en tu cuenta."],
    [["contársela solo a mis padres", 0], ["usar una contraseña larga con palabras raras y números", 0], ["usar «Pato7Luna!Rio»", 0], ["usar «1234»", 1], ["usar mi nombre", 1],
     ["contársela a un amigo del cole", 1], ["escribirla en un papel pegado a la pantalla", 1]]),
  amable: bank(x => `«${x}»: ¿es amable?`, ["Sí, es amable", "No es amable"], ["Hace sentir bien a los demás.", "Puede hacer daño."],
    [["¡Qué dibujo tan bonito!", 0], ["Gracias por ayudarme", 0], ["¿Puedo usar tu foto?", 0], ["Buen partido, ¡enhorabuena!", 0], ["Eres un pringado", 1],
     ["Nadie quiere jugar contigo", 1], ["Voy a enseñar a todos tu foto", 1]]),
});
})();
