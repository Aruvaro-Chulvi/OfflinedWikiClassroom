/* WikiAula — textos y bancos de gen/mus10.js (Música, Grado 10), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.mus10 = G.mus10 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(+(+x).toFixed(3)).replace(".", ",");
const mil = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
Object.assign(S, {
  funcion: bank(x => `En do mayor, ${x}: ¿qué función tiene?`, ["Tónica", "Subdominante", "Dominante"], ["Reposo: I, vi, iii.", "Alejamiento: IV, ii.", "Tensión: V, vii°."],
    [["el acorde de do (I)", 0], ["el acorde de la menor (vi)", 0], ["el acorde de mi menor (iii)", 0], ["el acorde de fa (IV)", 1], ["el acorde de re menor (ii)", 1],
     ["el acorde de sol (V)", 2], ["el acorde de si disminuido (vii°)", 2], ["el acorde que pide volver al reposo", 2]]),
  forma: bank(x => `${cap(x)}: ¿qué forma o género es?`, ["Suite", "Sonata", "Sinfonía", "Concierto"],
    ["Sucesión de danzas.", "Uno o dos instrumentos, varios movimientos.", "Orquesta, cuatro movimientos.", "Solista y orquesta, con cadencia."],
    [["allemande, courante, sarabande y gigue", 0], ["una sucesión de danzas barrocas", 0], ["una obra para piano en tres movimientos", 1], ["violín y piano en varios movimientos", 1],
     ["orquesta en cuatro movimientos con un scherzo", 2], ["la Quinta de Beethoven", 2], ["un violinista solista dialoga con la orquesta", 3], ["la orquesta calla y el solista toca la cadencia", 3]]),
  cine: bank(x => `${cap(x)}: ¿qué función cumple la música?`, ["Ambientar", "Expresar", "Crear suspense", "Identificar", "Contradecir"],
    ["Época o lugar.", "Sentimientos.", "Tensión, anticipar.", "Leitmotiv de un personaje.", "Opuesta a la imagen."],
    [["una gaita para una película ambientada en Galicia", 0], ["un clavecín en una película del siglo XVIII", 0], ["violines tristes cuando el protagonista se despide", 1],
     ["notas graves repetidas antes del ataque", 2], ["el tema del villano cada vez que aparece", 3], ["una canción alegre sobre una escena violenta", 4], ["un sitar para una escena en la India", 0], ["metales triunfales cuando la heroína gana", 1]]),
  videojuego: bank(x => `${cap(x)}: ¿qué recurso es?`, ["Bucle", "Capas", "Estinger", "Chiptune"],
    ["Se repite sin corte.", "Se añaden instrumentos según la tensión.", "Fragmento corto que avisa o celebra.", "Sonido de 8 bits."],
    [["la música del mapa se repite sin que se note el final", 0], ["un fragmento que vuelve a empezar sin pausa", 0], ["al llegar un enemigo se suma la percusión", 1],
     ["en combate entran los metales sobre la misma base", 1], ["un arpegio al conseguir una llave", 2], ["un acorde cuando pierdes una vida", 2], ["melodías con ondas simples de consolas antiguas", 3]]),
  identidad: bank(x => `${cap(x)}: ¿qué tipo de identidad refuerza la música?`, ["Personal", "De grupo", "Nacional o regional", "Política y social"],
    ["Gustos propios.", "Subculturas y aficiones.", "Himnos y folclore.", "Canción protesta."],
    [["tu lista de reproducción favorita", 0], ["la canción que te recuerda tu infancia", 0], ["el punk y su estética", 1], ["el himno de tu club de fútbol", 1],
     ["el himno de un país", 2], ["una jota en las fiestas del pueblo", 2], ["We Shall Overcome en una marcha", 3], ["canciones por la paz en una manifestación", 3]]),
  compositora: bank(x => `${cap(x)}: ¿qué compositora es?`, ["Hildegarda de Bingen", "Barbara Strozzi", "Fanny Mendelssohn", "Clara Schumann", "Lili Boulanger", "María Rodrigo"],
    ["Abadesa, siglo XII.", "Venecia, siglo XVII.", "Publicó con el nombre de su hermano.", "Gran pianista del XIX.", "Premio de Roma 1913.", "Ópera en el Teatro Real, 1915."],
    [["abadesa medieval que compuso cantos religiosos", 0], ["veneciana que publicó ocho libros de canciones", 1], ["algunas obras suyas se publicaron como de su hermano Felix", 2],
     ["pianista virtuosa, esposa de Robert Schumann", 3], ["primera mujer con el Premio de Roma de composición", 4], ["estrenó Becqueriana en el Teatro Real", 5], ["compuso el drama musical Ordo Virtutum en el siglo XII", 0], ["amiga de Brahms, compuso un trío con piano", 3]]),
  produccion: bank(x => `${cap(x)}: ¿en qué fase de la producción estás?`, ["Preproducción", "Grabación", "Mezcla", "Masterización", "Distribución"],
    ["Maqueta y arreglos.", "Captar las pistas.", "Equilibrar y efectos.", "Volumen final.", "Publicar."],
    [["decidir la tonalidad y el tempo", 0], ["escribir qué instrumento toca cada parte", 0], ["registrar la voz en el estudio", 1], ["programar la batería con MIDI", 1],
     ["ecualizar la guitarra y añadir reverb a la voz", 2], ["igualar el volumen final de las canciones del disco", 3], ["subir el tema a las plataformas", 4]]),
  directo: bank(x => `${cap(x)}: ¿qué elemento del directo es?`, ["PA", "Monitores", "Backline", "Rider técnico", "Acople"],
    ["Altavoces para el público.", "Para que los músicos se oigan.", "Equipo de la banda.", "Documento de necesidades.", "Pitido por bucle."],
    [["los grandes altavoces que apuntan al público", 0], ["los altavoces de cuña que miran a la cantante", 1], ["los auriculares in-ear del batería", 1], ["los amplificadores y la batería del grupo", 2],
     ["el documento que lista micrófonos y canales", 3], ["un pitido creciente al acercar el micro al altavoz", 4], ["los altavoces que se pone el teclista para oírse", 1], ["la hoja que pide un micrófono dinámico para la voz", 3]]),
  en_q: (n_, p) => `Se venden ${n_} entradas a ${p} €. ¿Cuánto se recauda? (€)`,
  en_s: (n_, p) => `${n_} × ${p} = <b>${n_ * p}</b> €`,
  re_q: (n_, p, g1, g2) => `Un concierto vende ${n_} entradas a ${p} €. Gastos: ${g1} € de sonido y ${g2} € de carteles. ¿Cuál es el resultado? (€; negativo si hay pérdidas)`,
  re_s: (n_, p, g1, g2) => `${n_} × ${p} − ${g1} − ${g2} = <b>${n_ * p - g1 - g2}</b> €`,
  st_q: (r, p) => `Una canción tiene ${mil(r)} reproducciones y la plataforma paga ${n(p)} € por reproducción. ¿Cuánto genera? (€)`,
  st_s: (r, p) => `${mil(r)} × ${n(p)} = <b>${n(r * p)}</b> €`,
  ob_q: (o, p) => `¿Cuántas reproducciones hacen falta para ganar ${o} € si se pagan ${n(p)} € por reproducción?`,
  ob_s: (o, p, k) => `${o} ÷ ${n(p)} = <b>${mil(k)}</b> reproducciones`,
});
})();
