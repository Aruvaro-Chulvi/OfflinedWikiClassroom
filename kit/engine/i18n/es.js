/* WikiAula — textos en español (idioma original).
   ui: interfaz · gen: enunciados y soluciones de los generadores de ejercicios
   (funciones, para que cada idioma construya la frase con su propia gramática)
   · words: número escrito con letras. */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
WA.I18N = WA.I18N || {};

// ── Números con letras (hasta 999 999 999) ──────────────────────────────
const U = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
  "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
  "veintiocho", "veintinueve"];
const T = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const C = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos",
  "setecientos", "ochocientos", "novecientos"];
// apoc: "un"/"veintiún"/"treinta y un" delante de "mil" o "millones"
function below100(n, apoc) {
  if (n < 30) {
    if (apoc && n === 1) return "un";
    if (apoc && n === 21) return "veintiún";
    return U[n];
  }
  const t = Math.floor(n / 10), u = n % 10;
  if (!u) return T[t];
  return T[t] + " y " + (apoc && u === 1 ? "un" : U[u]);
}
function below1000(n, apoc) {
  if (n === 100) return "cien";
  const c = Math.floor(n / 100), r = n % 100;
  const parts = [];
  if (c) parts.push(C[c]);
  if (r) parts.push(below100(r, apoc));
  return parts.join(" ");
}
function words(n) {
  if (n === 0) return "cero";
  const mill = Math.floor(n / 1e6), th = Math.floor((n % 1e6) / 1000), r = n % 1000;
  const out = [];
  if (mill) out.push(mill === 1 ? "un millón" : below1000(mill, true) + " millones");
  if (th) out.push(th === 1 ? "mil" : below1000(th, true) + " mil");
  if (r) out.push(below1000(r, false));
  return out.join(" ");
}

const ORD = ["", "primera", "segunda", "tercera", "cuarta", "quinta", "sexta", "séptima", "octava"];

WA.I18N.es = {
  words,
  // Separadores: 12 500,75 (espacio fino de miles desde 5 cifras: 2026, 46 378)
  num: { group: " ", decimal: ",", groupMin: 5 },
  // Cómo se lee la centena cuando detrás van más cifras: 100 → «ciento» (ciento cinco), 500 → «quinientos»
  wordsBefore: n => words(n + 1).split(" ")[0],
  ordAbbr: (n, fem) => `${n}.${fem ? "ª" : "º"}`,   // 3.º · 3.ª
  // Signos: · del álgebra, × de Primaria, «:» para dividir, «·» en la notación científica (6,02·10²³)
  sym: { mul: "·", times: "×", div: ":", sci: "·" },
  // Dinero (H.money, H.cents, SVG.money; ver MOTOR.md): euros con el símbolo detrás (2,50 €, 46 c);
  // monedas y billetes que existen, en céntimos
  money: { code: "EUR", sym: "€", before: false, cent: " c", coins: [1, 2, 5, 10, 20, 50, 100, 200], bills: [500, 1000, 2000, 5000, 10000, 20000, 50000] },
  // Horas (H.time): reloj de 24 horas (19:05)
  time: (h, m) => `${h}:${String(m).padStart(2, "0")}`,
  stage: g => g <= 6 ? `${g}.º de Primaria` : g <= 10 ? `${g - 6}.º de ESO` : `${g - 10}.º de Bachillerato`,
  ui: {
    site: "Offlined WikiAula",
    tagline: "El aula libre",
    grade: "Grado {g}",
    mastery: ["Sin empezar", "Intentado", "Familiar", "Competente", "Dominado"],
    masteryHelp: "Practica para subir de nivel: Familiar (50 %), Competente (80 %) y Dominado (80 % otro día, en el repaso o en la prueba de la unidad).",
    level: "Nivel {n}",
    xp: "{n} XP",
    streak: "{n} días seguidos",
    streak1: "1 día seguido",
    goal: "Meta de hoy: {a}/{b} XP",
    goalDone: "¡Meta de hoy cumplida!",
    practice: "Práctica",
    practiceStart: "Empezar a practicar",
    practiceAgain: "Practicar otra vez",
    practiceIntro: "{n} ejercicios distintos cada vez. Los fallos vuelven más tarde en el repaso.",
    check: "Comprobar",
    next: "Continuar",
    finish: "Ver resultado",
    correct: "¡Correcto!",
    wrong: "No es correcto.",
    rightAnswer: "Respuesta correcta: {a}",
    yourAnswer: "Tu respuesta: {a}",
    showSolution: "Ver la solución",
    solution: "Solución",
    empty: "Escribe una respuesta",
    combo: "{n} aciertos seguidos",
    questionOf: "Ejercicio {a} de {b}",
    result: "Resultado",
    score: "{a} de {b} correctas",
    xpEarned: "+{n} XP",
    masteryUp: "¡Has subido a {m}!",
    masteryKeep: "Nivel: {m}",
    perfect: "¡Sesión perfecta!",
    nextLesson: "Siguiente lección",
    backPortal: "Volver al curso",
    askTutor: "Pregúntale a Michael Knowledge",
    askTutorLesson: "Explícamelo con Michael Knowledge",
    aiName: "Michael Knowledge",
    aiChecking: "Revisando tu respuesta",
    aiThinking: "Pensando",
    aiWaking: "Preparándose",
    aiQueued: "Terminando otra respuesta",
    aiSecs: "{n} s",
    aiSkip: "Saltar",
    aiContinue: "Seguir hablando con Michael Knowledge",
    aiFailed: "Michael Knowledge no ha podido revisar tu respuesta.",
    aiFailedExplain: "Michael Knowledge no ha podido responder ahora.",
    yes: "Sí", no: "No",
    close: "Cerrar",
    hintList: "Separa los números con comas. Ejemplo: 1, 2, 4",
    hintListSemi: "Separa los números con punto y coma. Ejemplo: 0,5; 2; −3",
    hintNum: "Usa la coma para los decimales. Ejemplo: 2,5",
    hintFrac: "Escribe la fracción con una barra. Ejemplo: 3/4",
    hintExpr: "Ejemplo: 3x^2 − 2x + 1 (^ para las potencias)",
    hintFactors: "Escribe los factores primos con potencias. Ejemplo: 2^3 · 5",
    hintMulti: "Marca todas las que sean correctas",
    unitTest: "Prueba de la unidad",
    unitTestIntro: "{n} ejercicios de todas las lecciones de la unidad. Aprueba con un 75 % para ganar la medalla.",
    unitTestStart: "Empezar la prueba",
    unitPassed: "¡Prueba superada! Medalla de la unidad conseguida.",
    unitFailed: "Necesitas un 75 % para superar la prueba. ¡Repasa e inténtalo de nuevo!",
    unitMedal: "Medalla conseguida",
    lessons: "Lecciones",
    lessonN: "Lección {a} de {b}",
    unitN: "Unidad {n}",
    continueHere: "Continúa aquí",
    soon: "En preparación",
    mastered: "{a} de {b} dominadas",
    cardLesson: "Lección {n}",
    cardMin: "{n} min",
    cardExt: "Ampliación",
    cardBest: "Mejor resultado: {n} %",
    cardSessions: "{n} prácticas",
    cardSessions1: "1 práctica",
    cardReview: "Toca repasar",
    cardUnitTodo: "Supera las lecciones y gana la medalla",
    scNone: "Sin empezar",
    scMastered: "{a} de {b} dominadas",
    review: "Repaso",
    reviewDue: "Tienes {n} lecciones para repasar hoy.",
    reviewDue1: "Tienes 1 lección para repasar hoy.",
    reviewNone: "No tienes nada pendiente de repaso. ¡Vuelve mañana!",
    reviewStart: "Empezar el repaso",
    reviewFree: "Repaso libre",
    reviewFreeIntro: "Ejercicios mezclados de las lecciones que ya has practicado.",
    reviewEmpty: "Cuando practiques alguna lección, aquí aparecerán sus repasos.",
    reviewDone: "¡Repaso completado!",
    toastAch: "¡Logro desbloqueado!",
    toastXp: "+{n} XP",
    myProgress: "Mi progreso",
    totalXp: "Experiencia",
    answers: "Respuestas",
    accuracy: "Aciertos",
    bestStreak: "Mejor racha",
    days: "{n} días",
    days1: "1 día",
    achievements: "Logros",
    courses: "Cursos",
    activity: "Actividad de las últimas semanas",
    dailyGoal: "Meta diaria",
    goalOpts: { 20: "Tranquila · 20 XP", 50: "Normal · 50 XP", 100: "Intensa · 100 XP" },
    exportBtn: "Guardar copia del progreso",
    importBtn: "Cargar copia del progreso",
    importOk: "Progreso cargado.",
    importBad: "Ese archivo no es una copia de Offlined WikiAula.",
    resetBtn: "Borrar todo mi progreso",
    resetAsk: "¿Seguro que quieres borrar todo tu progreso de Offlined WikiAula? No se puede deshacer.",
    savedLocal: "Tu progreso se guarda en este navegador. Guarda una copia de vez en cuando para no perderlo.",
    savedOfflined: "Tu progreso se guarda en tu perfil de Offlined.",
    continueLast: "Continuar: {t}",
    startCourse: "Empezar el curso",
    seenOk: "Lección leída",
    noJs: "Activa JavaScript para practicar con ejercicios nuevos cada vez.",
  },
  ach: {
    first: ["Primer paso", "Completa tu primera práctica"],
    perfect: ["Impecable", "Haz una práctica sin fallos"],
    combo10: ["Imparable", "Encadena 10 aciertos seguidos"],
    streak3: ["Constancia", "Practica 3 días seguidos"],
    streak7: ["Una semana", "Practica 7 días seguidos"],
    streak30: ["Un mes", "Practica 30 días seguidos"],
    master1: ["Dominio", "Domina tu primera lección"],
    master10: ["Experto", "Domina 10 lecciones"],
    unit1: ["Medalla", "Supera tu primera prueba de unidad"],
    answers100: ["Cien", "Responde 100 ejercicios"],
    answers1000: ["Mil", "Responde 1000 ejercicios"],
    review1: ["Memoria", "Completa un repaso"],
    reader10: ["Lector", "Lee 10 lecciones"],
    goal7: ["Meta cumplida", "Cumple tu meta diaria 7 días"],
    course: ["Curso completo", "Domina todas las lecciones de un curso"],
  },

  // ── Generadores de ejercicios ─────────────────────────────────────────
  gen: {
    yesno: ["Sí", "No"],
  },
};
})();
