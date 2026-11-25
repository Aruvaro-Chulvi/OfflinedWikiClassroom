/* WikiAula — interface texts in US English (EN-US).
   Same structure as es.js (the original):
   ui: interface · ach: achievements · gen: exercise generator texts (each course
   adds its own section from i18n/en/<file>.js) · words: number written in words
   · num: digit separators · sym: operation signs · ordAbbr: 1st, 2nd…
   See auditoria/wikiaula/traduccion/MOTOR.md. */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
WA.I18N = WA.I18N || {};

// ── Numbers in words (up to 999,999,999), American style: no "and" ───────
const U = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const T = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function below100(n) {
  if (n < 20) return U[n];
  const t = Math.floor(n / 10), u = n % 10;
  return T[t] + (u ? "-" + U[u] : "");
}
function below1000(n) {
  const c = Math.floor(n / 100), r = n % 100;
  const parts = [];
  if (c) parts.push(U[c] + " hundred");
  if (r) parts.push(below100(r));
  return parts.join(" ");
}
function words(n) {
  if (n === 0) return "zero";
  const mill = Math.floor(n / 1e6), th = Math.floor((n % 1e6) / 1000), r = n % 1000;
  const out = [];
  if (mill) out.push(below1000(mill) + " million");
  if (th) out.push(below1000(th) + " thousand");
  if (r) out.push(below1000(r));
  return out.join(" ");
}
// Trigonometric function names: Spanish → US
const FN = { sen: "sin", tg: "tan", arcsen: "arcsin", arctg: "arctan", arccotg: "arccot", cotg: "cot", cosec: "csc" };
// 1st, 2nd, 3rd, 4th… 11th, 12th, 13th, 21st
const ordAbbr = n => { const m = n % 100, u = n % 10; return n + (m >= 11 && m <= 13 ? "th" : u === 1 ? "st" : u === 2 ? "nd" : u === 3 ? "rd" : "th"); };

WA.I18N.en = {
  words,
  // How the hundreds are read when more digits follow (300 + 45 → "three hundred" … "forty-five")
  wordsBefore: n => words(n),
  ordAbbr,
  // Digit separators: 12,500.75. Grouping from 4 digits (1,000), as in US schools.
  num: { group: ",", decimal: ".", groupMin: 4 },
  // Signs: × in elementary arithmetic, · in algebra; ÷ for division (US elementary and middle school);
  // × in scientific notation (6.02 × 10²³)
  sym: { mul: "·", times: "×", div: "÷", sci: "×", sciSpace: true },
  // Money (H.money, H.cents, SVG.money; see MOTOR.md): US dollars, sign in front ($2.50, 46¢).
  // Coins and bills in circulation, in cents: 1¢, 5¢, 10¢, 25¢; $1, $5, $10, $20, $50, $100
  money: { code: "USD", sym: "$", before: true, cent: "¢", coins: [1, 5, 10, 25], bills: [100, 500, 1000, 2000, 5000, 10000] },
  // Clock times (H.time): 12-hour clock with a.m./p.m. (7:05 p.m.; 12:00 p.m. = noon)
  time: (h, m) => `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h % 24 < 12 ? "a.m." : "p.m."}`,
  // The generators write Spanish function names (sen, tg…): US notation
  genText: s => s
    .replace(/\\operatorname\{(arcsen|arctg|arccotg|cotg|cosec|sen|tg)\}/g, (m, f) => f === "arccotg" ? "\\operatorname{arccot}" : "\\" + FN[f] + " ")
    .replace(/(^|[^\\A-Za-zÀ-ÿ])(arcsen|arctg|arccotg|cotg|cosec|sen|tg)(?![A-Za-zÀ-ÿ])/g, (m, a, f) => a + FN[f]),
  stage: g => `Grade ${g}`,
  ui: {
    site: "Offlined WikiAula",
    tagline: "The free classroom",
    grade: "Grade {g}",
    mastery: ["Not started", "Attempted", "Familiar", "Proficient", "Mastered"],
    masteryHelp: "Practice to level up: Familiar (50%), Proficient (80%), and Mastered (80% again on another day, in review or in the unit test).",
    level: "Level {n}",
    xp: "{n} XP",
    streak: "{n}-day streak",
    streak1: "1-day streak",
    goal: "Today's goal: {a}/{b} XP",
    goalDone: "Today's goal reached!",
    practice: "Practice",
    practiceStart: "Start practicing",
    practiceAgain: "Practice again",
    practiceIntro: "{n} different exercises every time. The ones you miss come back later in review.",
    check: "Check",
    next: "Continue",
    finish: "See results",
    correct: "Correct!",
    wrong: "Not quite.",
    rightAnswer: "Correct answer: {a}",
    yourAnswer: "Your answer: {a}",
    showSolution: "Show the solution",
    solution: "Solution",
    empty: "Type an answer",
    combo: "{n} in a row",
    questionOf: "Exercise {a} of {b}",
    result: "Results",
    score: "{a} of {b} correct",
    xpEarned: "+{n} XP",
    masteryUp: "You moved up to {m}!",
    masteryKeep: "Level: {m}",
    perfect: "Perfect session!",
    nextLesson: "Next lesson",
    backPortal: "Back to the course",
    askTutor: "Ask Michael Knowledge",
    askTutorLesson: "Explain it with Michael Knowledge",
    aiName: "Michael Knowledge",
    aiChecking: "Checking your answer",
    aiThinking: "Thinking",
    aiWaking: "Getting ready",
    aiQueued: "Finishing another answer",
    aiSecs: "{n} s",
    aiSkip: "Skip",
    aiContinue: "Keep talking with Michael Knowledge",
    aiFailed: "Michael Knowledge couldn't check your answer.",
    aiFailedExplain: "Michael Knowledge couldn't answer right now.",
    yes: "Yes", no: "No",
    close: "Close",
    hintList: "Separate the numbers with commas. Example: 1, 2, 4",
    hintListSemi: "Separate the numbers with semicolons. Example: 0.5; 2; −3",
    hintNum: "Use a decimal point. Example: 2.5",
    hintFrac: "Write the fraction with a slash. Example: 3/4",
    hintExpr: "Example: 3x^2 − 2x + 1 (use ^ for powers)",
    hintFactors: "Write the prime factors with exponents. Example: 2^3 · 5",
    hintMulti: "Select all the correct answers",
    unitTest: "Unit test",
    unitTestIntro: "{n} exercises from every lesson in the unit. Score 75% to earn the medal.",
    unitTestStart: "Start the test",
    unitPassed: "Test passed! You earned the unit medal.",
    unitFailed: "You need 75% to pass the test. Review and try again!",
    unitMedal: "Medal earned",
    lessons: "Lessons",
    lessonN: "Lesson {a} of {b}",
    unitN: "Unit {n}",
    continueHere: "Continue here",
    soon: "Coming soon",
    mastered: "{a} of {b} mastered",
    cardLesson: "Lesson {n}",
    cardMin: "{n} min",
    cardExt: "Enrichment",
    cardBest: "Best score: {n}%",
    cardSessions: "{n} practice sessions",
    cardSessions1: "1 practice session",
    cardReview: "Time to review",
    cardUnitTodo: "Finish the lessons and earn the medal",
    scNone: "Not started",
    scMastered: "{a} of {b} mastered",
    review: "Review",
    reviewDue: "You have {n} lessons to review today.",
    reviewDue1: "You have 1 lesson to review today.",
    reviewNone: "Nothing to review right now. Come back tomorrow!",
    reviewStart: "Start reviewing",
    reviewFree: "Free review",
    reviewFreeIntro: "A mix of exercises from the lessons you've already practiced.",
    reviewEmpty: "Once you practice a lesson, its reviews will show up here.",
    reviewDone: "Review complete!",
    toastAch: "Achievement unlocked!",
    toastXp: "+{n} XP",
    myProgress: "My progress",
    totalXp: "Experience",
    answers: "Answers",
    accuracy: "Accuracy",
    bestStreak: "Best streak",
    days: "{n} days",
    days1: "1 day",
    achievements: "Achievements",
    courses: "Courses",
    activity: "Activity in the last few weeks",
    dailyGoal: "Daily goal",
    goalOpts: { 20: "Easy · 20 XP", 50: "Regular · 50 XP", 100: "Intense · 100 XP" },
    exportBtn: "Save a copy of my progress",
    importBtn: "Load a copy of my progress",
    importOk: "Progress loaded.",
    importBad: "That file isn't an Offlined WikiAula progress copy.",
    resetBtn: "Delete all my progress",
    resetAsk: "Are you sure you want to delete all your Offlined WikiAula progress? This can't be undone.",
    savedLocal: "Your progress is saved in this browser. Save a copy now and then so you don't lose it.",
    savedOfflined: "Your progress is saved in your Offlined profile.",
    continueLast: "Continue: {t}",
    startCourse: "Start the course",
    seenOk: "Lesson read",
    noJs: "Turn on JavaScript to practice with new exercises every time.",
  },
  ach: {
    first: ["First step", "Finish your first practice session"],
    perfect: ["Flawless", "Get a practice session with no mistakes"],
    combo10: ["Unstoppable", "Get 10 answers right in a row"],
    streak3: ["Steady", "Practice 3 days in a row"],
    streak7: ["One week", "Practice 7 days in a row"],
    streak30: ["One month", "Practice 30 days in a row"],
    master1: ["Mastery", "Master your first lesson"],
    master10: ["Expert", "Master 10 lessons"],
    unit1: ["Medal", "Pass your first unit test"],
    answers100: ["One hundred", "Answer 100 exercises"],
    answers1000: ["One thousand", "Answer 1,000 exercises"],
    review1: ["Memory", "Finish a review"],
    reader10: ["Reader", "Read 10 lessons"],
    goal7: ["Goal getter", "Reach your daily goal on 7 days"],
    course: ["Course complete", "Master every lesson in a course"],
  },

  // ── Exercise generators ───────────────────────────────────────────────
  gen: {
    yesno: ["Yes", "No"],
  },
};
})();
