/* WikiAula — textos y bancos de gen/inf1.js (Informática, Grado 1), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.inf1 = G.inf1 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
Object.assign(S, {
  aparato: bank(x => `${cap(x)}: ¿es un aparato digital?`, ["Sí, es digital", "No es digital"], ["Funciona con electricidad y sigue instrucciones.", "No tiene un «cerebro» que siga instrucciones."],
    [["ordenador", 0], ["tableta", 0], ["teléfono móvil", 0], ["consola de videojuegos", 0], ["reloj inteligente", 0], ["portátil", 0], ["bicicleta", 1], ["libro de cuentos", 1],
     ["lápiz", 1], ["pelota", 1], ["cuchara", 1]]),
  parte: bank(x => `${cap(x)}: ¿para qué sirve?`, ["Para ver", "Para escribir", "Para señalar", "Para oír"], ["Pantalla.", "Teclado.", "Ratón o panel táctil.", "Altavoces o auriculares."],
    [["la pantalla", 0], ["el monitor", 0], ["el teclado", 1], ["las teclas con letras", 1], ["el ratón", 2], ["el panel táctil del portátil", 2], ["los altavoces", 3], ["los auriculares", 3]]),
  raton: bank(x => `Quiero ${x}. ¿Qué hago?`, ["Clic", "Doble clic", "Arrastrar", "Tecla espacio", "Tecla borrar"],
    ["Pulsar una vez: elegir.", "Pulsar dos veces rápido: abrir.", "Pulsar, mantener y mover.", "Hueco entre palabras.", "Quita la última letra."],
    [["elegir un color para pintar", 0], ["pulsar un botón de la pantalla", 0], ["abrir un juego", 1], ["abrir una carpeta", 1], ["llevar una pieza del puzle a su sitio", 2],
     ["mover un dibujo a otro lugar", 2], ["separar dos palabras", 3], ["quitar una letra equivocada", 4]]),
  cuidado: bank(x => `${cap(x)}: ¿está bien o mal?`, ["Está bien", "Está mal"], ["Así cuidamos el aparato.", "Así se puede estropear."],
    [["usar la tableta con las manos limpias", 0], ["guardar el portátil en su funda", 0], ["cogerlo con las dos manos", 0], ["usarlo sobre la mesa", 0], ["comer un bocadillo junto al teclado", 1],
     ["dejar el móvil al sol", 1], ["tirar del cable para desenchufar", 1], ["golpear la pantalla", 1], ["dejar la tableta en el suelo", 1]]),
  seqs: [["coger el cepillo", "poner la pasta", "cepillar los dientes", "enjuagarse la boca"], ["abrir el pan", "poner el queso", "cerrar el pan", "comer el bocadillo"],
         ["ponerse los calcetines", "ponerse los zapatos", "atarse los cordones", "salir a jugar"], ["lavar la fruta", "pelar la fruta", "cortar la fruta", "comer la fruta"],
         ["encender la tableta", "abrir el cuento", "leer el cuento", "apagar la tableta"], ["hacer un agujero en la tierra", "poner la semilla", "taparla con tierra", "regarla"]],
  sq_q: x => `¿Qué paso va justo después de «${x}»?`,
  sq_s: seq => `El orden es: ${seq.map((x, i) => `${i + 1}. ${x}`).join(" → ")}.`,
  ca_q1: (a, n) => `El robot está en la casilla ${a} de una fila. Avanza ${n} ${n === 1 ? "flecha" : "flechas"} →. ¿En qué casilla termina?`,
  ca_s1: (a, n, r) => `${a} + ${n} = <b>${r}</b>`,
  ca_q2: (a, b) => `El robot está en la casilla ${a} y la manzana en la casilla ${b}, en la misma fila. ¿Cuántas flechas → necesita?`,
  ca_s2: (a, b, r) => `De ${a} a ${b} hay <b>${r}</b> casillas.`,
  ca_q3: (a, n, m) => `El robot empieza en la casilla ${a}. Hace ${n} flechas → y después ${m} ${m === 1 ? "flecha" : "flechas"} ←. ¿En qué casilla termina?`,
  ca_s3: (a, n, m, r) => `${a} + ${n} − ${m} = <b>${r}</b>`,
  sets: [["rojo", "azul", "amarillo", "verde"], ["círculo", "cuadrado", "triángulo", "estrella"], ["sol", "luna", "nube", "estrella"], ["perro", "gato", "pez", "pájaro"],
         ["palmada", "salto", "giro", "pisotón"]],
  pa_q: shown => `¿Qué sigue? ${shown.join(", ")}, …`,
  pa_s: (unit, r) => `Se repite «${unit.join(", ")}». Sigue: <b>${r}</b>.`,
  clasifica: bank(x => `${cap(x)}: ¿en qué grupo va?`, ["Animales", "Frutas", "Juguetes"], ["Seres vivos que se mueven.", "Se comen; tienen semillas.", "Sirven para jugar."],
    [["perro", 0], ["gato", 0], ["pez", 0], ["caracol", 0], ["manzana", 1], ["plátano", 1], ["pera", 1], ["fresa", 1], ["pelota", 2], ["muñeca", 2], ["cometa", 2], ["peonza", 2]]),
  ta_q: xs => `Ordena de menor a mayor: ${xs.join(", ")}. ¿Cuál va primero?`,
  ta_s: xs => `${xs.join(" < ")} → primero va el <b>${xs[0]}</b>.`,
  seguro: bank(x => `${cap(x)}: ¿qué hago?`, ["Puedo hacerlo", "Pregunto a un adulto", "No lo hago y aviso a un adulto"],
    ["Es seguro.", "Es nuevo o no lo entiendo.", "Puede ser peligroso."],
    [["jugar a un juego para niños con mamá cerca", 0], ["dibujar con la tableta", 0], ["leer un cuento digital", 0], ["descargar una aplicación nueva", 1], ["abrir una página que no conozco", 1],
     ["una ventana dice «¡has ganado un premio!»", 2], ["veo un vídeo que me da miedo", 2], ["un desconocido me escribe en un juego", 2]]),
  datos: bank(x => `${cap(x)}: ¿lo puedo contar en internet?`, ["Sí, no es privado", "No, es privado"], ["No dice quién soy ni dónde estoy.", "Es información personal."],
    [["mi color favorito", 0], ["que me gustan los dinosaurios", 0], ["mi animal preferido", 0], ["mi dirección", 1], ["mi nombre y apellidos", 1], ["el nombre de mi colegio", 1],
     ["mi número de teléfono", 1], ["una foto mía", 1], ["mi contraseña", 1]]),
});
})();
