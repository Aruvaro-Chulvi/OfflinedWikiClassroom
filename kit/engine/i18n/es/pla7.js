/* WikiAula — textos y bancos de gen/pla7.js (Educación plástica, visual y audiovisual, Grado 7), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.pla7 = G.pla7 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const POL = { 3: "triángulo equilátero", 4: "cuadrado", 5: "pentágono regular", 6: "hexágono regular", 8: "octógono regular", 9: "eneágono regular", 10: "decágono regular", 12: "dodecágono regular" };
Object.assign(S, {
  funcion: bank(x => `${cap(x)}: ¿qué función tiene sobre todo?`, ["Informativa", "Expresiva", "Estética", "Exhortativa"],
    ["Da datos.", "Transmite emociones del autor.", "Busca la belleza.", "Quiere que hagamos algo."],
    [["el plano del metro", 0], ["un mapa del tiempo", 0], ["el plano de evacuación del instituto", 0], ["un cuadro expresionista lleno de angustia", 1],
     ["un dibujo hecho para desahogar la tristeza", 1], ["un estampado decorativo en una tela", 2], ["la cenefa de azulejos de una cocina", 2],
     ["un anuncio de zapatillas", 3], ["una campaña para que recicles", 3], ["un cartel electoral", 3]]),
  gestalt: bank(x => `${cap(x)}: ¿qué ley de la Gestalt actúa?`, ["Proximidad", "Semejanza", "Cierre", "Continuidad", "Figura y fondo"],
    ["Lo cercano se agrupa.", "Lo parecido se agrupa.", "Completamos lo incompleto.", "Seguimos la dirección de las líneas.", "Separamos lo que destaca de lo de detrás."],
    [["ves dos grupos de puntos porque están separados por un hueco", 0], ["agrupas a los jugadores por el color de la camiseta", 1],
     ["filas de círculos y cuadrados alternos se ven como filas de cada forma", 1], ["un círculo dibujado a trozos se ve completo", 2],
     ["un logotipo con huecos que formamos mentalmente", 2], ["dos líneas que se cruzan se ven como dos rectas, no cuatro trozos", 3],
     ["el jarrón de Rubin: jarrón o dos perfiles", 4], ["una silueta negra sobre fondo blanco", 4]]),
  sintesis: bank(x => `¿Qué color se obtiene con ${x}?`, ["Amarillo", "Cian", "Magenta", "Blanco", "Verde", "Rojo"],
    ["Luz roja + luz verde.", "Luz verde + luz azul.", "Luz azul + luz roja.", "Las tres luces.", "Pigmento cian + amarillo.", "Pigmento amarillo + magenta."],
    [["luz roja + luz verde", 0], ["luz verde + luz azul", 1], ["luz azul + luz roja", 2], ["luz roja + verde + azul", 3], ["pigmento cian + pigmento amarillo", 4],
     ["pigmento amarillo + pigmento magenta", 5]]),
  propiedad: bank(x => `${cap(x)}: ¿qué propiedad del color cambia?`, ["Tono", "Saturación", "Luminosidad"],
    ["Cambia el color en sí.", "Cambia la pureza o intensidad.", "Cambia lo claro u oscuro."],
    [["pasar de rojo a azul", 0], ["girar el selector de 0° a 120°", 0], ["mezclar un azul con gris para apagarlo", 1], ["convertir un verde vivo en caqui", 1],
     ["pasar de azul celeste a azul marino", 2], ["añadir blanco a un rojo para obtener rosa", 2], ["añadir negro a un verde", 2], ["un amarillo chillón que se vuelve pardo", 1]]),
  elemento: bank(x => `${cap(x)}: ¿qué elemento expresivo destaca?`, ["Punto", "Línea", "Plano", "Textura"],
    ["Puntos de color.", "Trazos y contornos.", "Manchas de color con forma.", "Calidad de la superficie."],
    [["Seurat pinta con miles de puntos de colores puros", 0], ["una trama de puntos que oscurece una zona", 0], ["los remolinos de Van Gogh en el cielo", 1],
     ["un contorno que dibuja un perfil", 1], ["manchas recortadas de color superpuestas", 2], ["siluetas planas en un cartel", 2], ["el aspecto rugoso de la corteza", 3],
     ["una rejilla dibujada que imita un tejido", 3]]),
  trazado: bank(x => `Para ${x}, ¿qué trazado usas?`, ["Mediatriz", "Bisectriz", "Teorema de Tales", "Paralela"],
    ["Perpendicular por el punto medio.", "Divide el ángulo en dos iguales.", "Divide un segmento en partes iguales.", "Recta que no corta a otra."],
    [["hallar el punto medio de un segmento", 0], ["encontrar puntos a igual distancia de A y B", 0], ["dividir un ángulo en dos iguales", 1], ["obtener un ángulo de 45° desde uno de 90°", 1],
     ["dividir un segmento de 7 cm en 3 partes iguales", 2], ["repartir 5 baldas iguales en una altura de 73 cm", 2], ["trazar la otra orilla de una carretera recta", 3]]),
  poligono: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["el lado del hexágono inscrito mide igual que el radio", 0], ["uniendo vértices alternos del hexágono sale un triángulo equilátero", 0],
     ["dos diámetros perpendiculares dan los vértices del cuadrado inscrito", 0], ["el ángulo central del octógono mide 45°", 0], ["el lado del cuadrado inscrito mide igual que el radio", 1],
     ["el ángulo central del pentágono mide 60°", 1], ["un polígono inscrito tiene sus lados tangentes a la circunferencia", 1]]),
  transformacion: bank(x => `${cap(x)}: ¿qué transformación es?`, ["Traslación", "Giro", "Simetría"], ["Desplazar sin girar.", "Girar alrededor de un punto.", "Reflejar respecto a un eje."],
    [["repetir un módulo hacia la derecha sin girarlo", 0], ["una greca que se repite a lo largo de un borde", 0], ["un cuarto de círculo girado 90° cuatro veces", 1],
     ["las aspas de un molino a partir de una sola", 1], ["reflejar un módulo como en un espejo", 2], ["las dos mitades de una mariposa", 2]]),
  lectura: bank(x => `«${x}»: ¿lectura denotativa o connotativa?`, ["Denotativa", "Connotativa"], ["Describe lo que se ve.", "Interpreta lo que sugiere."],
    [["Hay un coche rojo en una carretera de montaña", 0], ["La foto está tomada en contrapicado", 0], ["Aparecen tres personas y un perro", 0], ["El fondo es azul y el texto blanco", 0],
     ["El anuncio transmite libertad y aventura", 1], ["El verde sugiere que el producto es natural", 1], ["La familia parece feliz y exitosa", 1], ["El color oscuro da sensación de misterio", 1]]),
  tecnica: bank(x => `${cap(x)}: ¿técnica seca, húmeda o mixta?`, ["Seca", "Húmeda", "Mixta"], ["Sin agua ni disolvente.", "Pigmento disuelto.", "Combina varias."],
    [["el carboncillo", 0], ["los lápices de colores", 0], ["las ceras", 0], ["el pastel", 0], ["la acuarela", 1], ["la témpera", 1], ["el acrílico", 1], ["la tinta china", 1],
     ["acuarela con detalles en rotulador", 2], ["un collage con partes pintadas", 2]]),
  ce_q: n => `¿Cuánto mide el ángulo central de un ${POL[n]} inscrito? (grados)`,
  ce_s: (n, a) => `360 ÷ ${n} = <b>${a}</b>°`,
  ce_q2: a => `El ángulo central de un polígono regular inscrito mide ${a}°. ¿Cuántos lados tiene?`,
  ce_s2: (a, n) => `360 ÷ ${a} = <b>${n}</b> lados`,
  hx_q: r => `Una circunferencia tiene ${r} cm de radio. ¿Cuánto mide el lado del hexágono regular inscrito? (cm)`,
  hx_s: r => `En el hexágono inscrito, lado = radio = <b>${r}</b> cm`,
});
})();
