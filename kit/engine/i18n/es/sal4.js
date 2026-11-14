/* WikiAula — textos y bancos de gen/sal4.js (Salud y educación física, Grado 4), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.sal4 = G.sal4 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
Object.assign(S, {
  capacidad: bank(x => `${cap(x)}: ¿qué capacidad física trabaja sobre todo?`, ["Resistencia", "Fuerza", "Velocidad", "Flexibilidad"],
    ["Aguantar mucho tiempo.", "Vencer un peso o resistencia.", "Moverse muy rápido.", "Amplitud de movimiento."],
    [["correr 12 minutos sin parar", 0], ["nadar muchos largos", 0], ["una excursión larga en bici", 0], ["trepar por una cuerda", 1], ["empujar un carro pesado", 1], ["hacer flexiones", 1],
     ["un sprint de 30 metros", 2], ["salir rápido al oír el silbato", 2], ["tocar los pies con las manos sin doblar las rodillas", 3], ["hacer el puente", 3], ["abrirse de piernas", 3]]),
  calentar: bank(x => `${cap(x)}: ¿qué parte del calentamiento es?`, ["Activación", "Movilidad articular", "Estiramientos", "Parte específica"],
    ["Trotar, subir pulsaciones.", "Girar articulaciones.", "Estirar suave.", "Gestos del deporte."],
    [["trotar suave alrededor de la pista", 0], ["saltitos y desplazamientos variados", 0], ["girar tobillos y rodillas", 1], ["círculos con los hombros", 1], ["mover el cuello despacio", 1],
     ["estirar suavemente los gemelos", 2], ["estirar los brazos hacia arriba", 2], ["tirar a canasta antes del partido", 3], ["hacer pases con el balón", 3]]),
  respira: bank(x => `${cap(x)}: ¿verdadero o falso?`, ["Verdadero", "Falso"], ["Es correcto.", "No es correcto."],
    [["al inspirar entra oxígeno", 0], ["al espirar sale dióxido de carbono", 0], ["el diafragma ayuda a respirar", 0], ["al hacer ejercicio respiramos más deprisa", 0],
     ["hay que aguantar la respiración al correr", 1], ["los pulmones están en la tripa", 1], ["en reposo respiramos 100 veces por minuto", 1]]),
  ocio: bank(x => `${cap(x)}: ¿ocio activo o sedentario?`, ["Activo", "Sedentario"], ["Te mueves.", "Sentado o tumbado."],
    [["patinar", 0], ["una excursión al monte", 0], ["bailar", 0], ["jugar al escondite", 0], ["ver series", 1], ["jugar a la consola", 1], ["ver vídeos en la tableta", 1]]),
  nutriente: bank(x => `${cap(x)}: ¿qué nutriente predomina?`, ["Hidratos de carbono", "Proteínas", "Grasas", "Vitaminas y minerales"],
    ["Energía.", "Construir.", "Reserva.", "Regular."],
    [["el pan", 0], ["la pasta", 0], ["el arroz", 0], ["la patata", 0], ["el pollo", 1], ["el huevo", 1], ["las lentejas", 1], ["el pescado", 1], ["el aceite", 2], ["la mantequilla", 2],
     ["la naranja", 3], ["la zanahoria", 3], ["las espinacas", 3]]),
  nutriscore: bank(x => `${cap(x)}: ¿qué Nutri-Score suele tener?`, ["A o B (mejor)", "D o E (peor)"], ["Saludable.", "Mucho azúcar, sal o grasa."],
    [["legumbres cocidas", 0], ["copos de avena", 0], ["verduras congeladas", 0], ["yogur natural", 0], ["bollos rellenos de chocolate", 1], ["patatas fritas de bolsa", 1],
     ["un refresco azucarado", 1], ["galletas con crema", 1]]),
  deporte: bank(x => `${cap(x)}: ¿qué tipo de deporte es?`, ["Individual", "De adversario", "Colectivo"], ["Compites solo.", "Uno contra uno.", "En equipo."],
    [["el atletismo", 0], ["la natación", 0], ["la gimnasia", 0], ["el tenis", 1], ["el bádminton", 1], ["el judo", 1], ["el ajedrez", 1], ["el fútbol", 2], ["el baloncesto", 2],
     ["el balonmano", 2], ["el voleibol", 2]]),
  auxilio: bank(x => `${cap(x)}: ¿es correcto?`, ["Correcto", "Incorrecto"], ["Así se hace.", "Puede empeorarlo."],
    [["poner una quemadura bajo agua fría 15 minutos", 0], ["lavar una herida con agua y jabón", 0], ["apretar con una gasa si sangra mucho", 0], ["lavarse las manos antes de curar", 0],
     ["poner hielo directamente en una quemadura", 1], ["poner pasta de dientes en una quemadura", 1], ["reventar una ampolla", 1], ["echar alcohol en una herida abierta", 1]]),
  re_q: r => `Cuentas ${r} respiraciones en 15 segundos. ¿Cuántas respiraciones por minuto son?`,
  re_s: (r, t) => `${r} × 4 = <b>${t}</b>`,
  ho_q: h => `Si ves pantallas ${n(h)} ${h === 1 ? "hora" : "horas"} cada día, ¿cuántas horas son a la semana?`,
  ho_s: (h, t) => `${n(h)} × 7 = <b>${n(t)}</b> horas`,
  productos: [["Unos cereales", 30], ["Unas galletas", 25], ["Unos bollos", 35], ["Unas magdalenas", 28], ["Unos yogures de sabores", 12], ["Unas natillas", 15]],
  az_q1: (p, c, g) => `${p} tienen ${c} g de azúcar por 100 g. ¿Cuántos gramos de azúcar hay en una ración de ${g} g?`,
  az_s1: (c, g, a) => `${c} × ${g} ÷ 100 = <b>${n(a)}</b> g`,
  az_q2: (p, c, g) => `${p} tienen ${c} g de azúcar por 100 g. ¿A cuántos terrones (4 g) equivale una ración de ${g} g?`,
  az_s2: (c, g, a, t) => `${c} × ${g} ÷ 100 = ${n(a)} g; ${n(a)} ÷ 4 = <b>${n(t)}</b> terrones`,
});
})();
