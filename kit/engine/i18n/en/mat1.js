/* WikiAula — texts for gen/mat1.js (Mathematics, Grade 1), in US English.
   Complete since 2026-11-11 (Grade 1). Same keys as i18n/es/mat1.js. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m1 = G.m1 || {};
// Helpers: capital letter, the numbers said when counting on from a to c ("3, 4, 5"), the equation of a word
// problem (with the steps p, if any), lists with the serial comma, ordinals (1st, 2nd…), money and cents
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const desde = (a, c) => Array.from({ length: c - a }, (_, i) => a + 1 + i).join(", ");
const cuenta = (a, b, r, plus, p) => `${p ? `${a} ${plus ? "+" : "−"} ${b}. ${p} ` : ""}${a} ${plus ? "+" : "−"} ${b} = <b>${r}</b>.`;
const lst = a => a.length === 1 ? a[0] : a.length === 2 ? `${a[0]} and ${a[1]}` : a.slice(0, -1).join(", ") + ", and " + a[a.length - 1];
const ord = n => window.WA.H.ord(n);
const usd = x => window.WA.H.money(x);
const ct = x => window.WA.H.cents(x);
const is = n => n === 1 ? "is" : "are";
// he/she for the names of the generators (nombres.json)
const SHE = new Set(["Lucy", "Sarah", "Nora", "Abby", "Iris", "Anna", "Aisha", "Mei"]);
const he = n => SHE.has(n) ? "she" : "he";
const his = n => SHE.has(n) ? "her" : "his";
// the counting of a purse ("Start with… Add the rest: 10 + 5 = 15; 15 + 1 = 16.")
const purse = (parts, f, what) => {
  let s = parts[0];
  const steps = parts.slice(1).map(v => { const t = `${s} + ${v} = ${s + v}`; s += v; return t; });
  return `Start with the ${what} worth the most: ${f(parts[0])}. Add the rest: ${steps.join("; ")}. That is <b>${f(s)}</b> in all.`;
};
Object.assign(S, {
  cosas: { circle: ["circles", 0], square: ["squares", 0], triangle: ["triangles", 0], star: ["stars", 1], heart: ["hearts", 0], rect: ["rectangles", 0] },
  cuantos: ([w]) => `How many ${w} are there?`,
  contar_q: "How many pictures are there? Count them.",
  contar_s: n => `Point to each picture and say one number. Don't skip any: ${desde(0, n)}. The last number is ${n}: there ${is(n)} <b>${n}</b>.`,
  letras_q: w => `Write the number <b>${w}</b> using digits.`,
  letras2_q: n => `How do you write the number <b>${n}</b> in words?`,
  letras_s: (w, n) => `<b>${cap(w)}</b> is written <b>${n}</b>.`,
  letras2_s: (w, n) => `We read <b>${n}</b> as <b>${w}</b>.`,
  comp_q: (a, b) => `Choose the sign that goes in the box: <b>${a} ☐ ${b}</b>`,
  comp_s: (a, b, k) => [`${a} is greater than ${b}: <b>${a} &gt; ${b}</b>. The open side of the sign faces the greater number.`,
    `${a} is less than ${b}: <b>${a} &lt; ${b}</b>. The open side of the sign faces the greater number.`,
    `The two numbers are equal: <b>${a} = ${b}</b>.`][k],
  desp_q: n => `What number comes just <b>after</b> ${n}?`,
  // when the tens change (39 → 40, 60 → 59), the solution says what happens to the tens
  desp_s: (n, r) => r >= 20 && r % 10 === 0 ? `${n} has 9 ones. One more makes 10 ones: a new ten! The number after ${n} is <b>${r}</b>: ${r / 10} tens and 0 ones.`
    : `The number after ${n} is one more: <b>${r}</b>.`,
  antes_q: n => `What number comes just <b>before</b> ${n}?`,
  antes_s: (n, r) => n >= 20 && n % 10 === 0 ? `Count back: ${n}, ${r}. The number before ${n} is <b>${r}</b>: ${Math.floor(r / 10)} ${Math.floor(r / 10) === 1 ? "ten" : "tens"} and 9 ones.`
    : `The number before ${n} is one less: <b>${r}</b>.`,
  entre_q: (a, b) => `What number is between ${a} and ${b}?`,
  entre_s: (a, n, b) => `Count: ${a}, <b>${n}</b>, ${b}.`,
  suma_q: (a, b) => `What is <b>${a} + ${b}</b>?`,
  // as in "Putting Together: Addition": start at the greater number and count on, without counting the start
  suma_s: (a, b, s) => { const g = Math.max(a, b), p = Math.min(a, b); return `Start with the greater number, ${g}, and count on ${p} more: ${desde(g, s)}. ${a} + ${b} = <b>${s}</b>.`; },
  // as in "Adding by Making a Ten": make a ten from the greater number
  suma20_s: (a, b, s) => {
    const p = Math.max(a, b), q = Math.min(a, b), c = 10 - p, d = q - c;
    return `I start with the greater number, ${p}. It needs ${c} more to make 10. I take ${c} from the ${q}: ${p} + ${c} = 10. ${d === 1 ? "There is 1 left" : `There are ${d} left`}: 10 + ${d} = <b>${s}</b>.`;
  },
  resta_q: (a, b) => `What is <b>${a} − ${b}</b>?`,
  resta_s: (a, b, r) => `You start with ${a} and take away ${b} (they are crossed out). There ${is(r)} <b>${r}</b> left. ${a} − ${b} = ${r}.`,
  resta20_s: (a, b, c, d, r) => `First take away ${c} to get to 10. Then take away ${d} more: 10 − ${d} = <b>${r}</b>.`,
  hueco_q: e => `What number is missing? <b>${e}</b>`,
  // as in "Composing and Decomposing Numbers": a and how many make c? Count on from a, one finger for each number
  hueco_s: (a, c, r) => `${a} and how many make ${c}? Count on from ${a} and hold up one finger for each number: ${desde(a, c)}. ${r === 1 ? "One finger" : `${r} fingers`}: the missing number is <b>${r}</b>. ${a} + ${r} = ${c}.`,
  hueco2_s: (c, a, r) => `${a} and how many make ${c}? Count on from ${a} and hold up one finger for each number: ${desde(a, c)}. ${r === 1 ? "One finger" : `${r} fingers`}. If you take ${r} away from ${c}, ${a} ${is(a)} left: the missing number is <b>${r}</b>.`,
  // names of the people in the word problems (m1.prob10, prob20, prob99), from nombres.json
  nombres: ["Lucy", "Henry", "Sarah", "Leo", "Nora", "Matt", "Abby", "Omar", "Iris", "Ben", "Anna", "Paul", "Aisha", "Isaac", "Mei", "Danny"],
  // [thing, (unused), how many a child can believably have or a box can hold]
  objs: [["balloons", 0, 15], ["marbles", 1, 99], ["trading cards", 0, 99], ["candies", 0, 60], ["pencils", 0, 30], ["stickers", 1, 99], ["storybooks", 0, 30], ["apples", 1, 40], ["toy cars", 0, 25], ["flowers", 1, 40], ["building blocks", 1, 99], ["cards", 1, 60]],
  prob_q: [
    (N, M, a, b, o) => `${N} has ${a} ${o}. ${cap(he(N))} gets ${b} more as a present. How many ${o} does ${he(N)} have now?`,
    (N, M, a, b, o) => `There are ${a} ${o} in one box and ${b} in another box. How many ${o} are there in all?`,
    (N, M, a, b, o) => `${N} has ${a} ${o} and ${M} has ${b}. How many ${o} do they have together?`,
    (N, M, a, b, o) => `${N} has ${a} ${o} and gives ${b} away. How many does ${he(N)} have left?`,
    (N, M, a, b, o) => `There are ${a} ${o} on the table. ${N} takes ${b}. How many are left on the table?`,
    (N, M, a, b, o) => `${N} has ${a} ${o}, and ${M} has ${b}. How many more ${o} does ${N} have than ${M}?`,
  ],
  // the clue of each problem, the equation and its steps (p: steps of the equation, or "")
  prob_s: [
    (a, b, r, p) => `Getting ${b} more means having more at the end: it's an addition problem. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Put the two boxes together: it's an addition problem. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Put together what they both have: it's an addition problem. ${cuenta(a, b, r, true, p)}`,
    (a, b, r, p) => `Giving ${b} away means having fewer at the end: it's a subtraction problem. ${cuenta(a, b, r, false, p)}`,
    (a, b, r, p) => `Taking ${b} away leaves fewer on the table: it's a subtraction problem. ${cuenta(a, b, r, false, p)}`,
    (a, b, r, p) => `Make pairs and count how many are left over: it's a subtraction problem. ${cuenta(a, b, r, false, p)}`,
  ],
  diez_s: (g, c, d, r) => `First make 10: ${g} + ${c} = 10 and 10 + ${d} = ${r}.`,
  bajar_s: (a, c, d, r) => `First go back to 10: ${a} − ${c} = 10 and 10 − ${d} = ${r}.`,
  uni20_s: (u, b, r, plus) => plus && u + b === 10 ? `Ones: ${u} + ${b} = 10, another ten. With the ten you already had, that makes 2 tens.`
    : `Only the ones change: ${u} ${plus ? "+" : "−"} ${b} = ${plus ? u + b : u - b}. The ten stays the same.`,
  cols_s: (a, b, plus) => {
    const op = plus ? "+" : "−", ua = a % 10, ub = b % 10, da = Math.floor(a / 10), db = Math.floor(b / 10);
    const u = plus ? ua + ub : ua - ub, d = plus ? da + db : da - db;
    return b < 10 ? `Ones: ${ua} ${op} ${ub} = ${u}. ${da === 1 ? "The ten does not change" : `The ${da} tens do not change`}.`
      : `Ones: ${ua} ${op} ${ub} = ${u}. Tens: ${da} ${op} ${db} = ${d}.`;
  },
  bloques_q: "What number is this? Each train of 10 cubes is a ten, and each loose cube is a one.",
  du_q: n => `How many tens and how many ones are in the number <b>${n}</b>?`,
  du_f: ["Tens", "Ones"],
  du_s: (n, d, u) => `${n} has <b>${d}</b> ${d === 1 ? "ten" : "tens"} (${d * 10}) and <b>${u}</b> ${u === 1 ? "one" : "ones"}: ${d * 10} + ${u} = ${n}.`,
  falta_q: s => `What number is missing in the pattern? <b>${s}</b>`,
  falta1_q: s => `What number is missing? <b>${s}</b>`,
  falta_s: (st, down, r, full) => `The numbers go ${down ? "down" : "up"} by ${st} each time${st === 10 ? `: one ten ${down ? "less" : "more"}, and the ones stay the same` : ""}. ${full}. The missing number is <b>${r}</b>.`,
  mayor_q: s => `Which number is the <b>greatest</b>? ${s}`,
  menor_q: s => `Which number is the <b>least</b>? ${s}`,
  orden_s: (s, r) => `In order from least to greatest: ${s}. The answer is <b>${r}</b>.`,
  doble_q: n => `What is <b>double</b> ${n}?`,
  doble_s: (n, r) => `Double means adding the number to itself: ${n} + ${n} = <b>${r}</b>.`,
  mitad_q: n => `What is <b>half</b> of ${n}?`,
  mitad_s: (n, r) => `Half means two equal parts: ${r} + ${r} = ${n}, so half of ${n} is <b>${r}</b>.`,
  par_q: n => `Is the number <b>${n}</b> even or odd?`,
  par_o: ["Even", "Odd"],
  // with a picture (up to 12), the first method of the lesson: make pairs; with big numbers, the last digit
  par_s: (n, u, k) => n <= 12 ? `Make pairs: ${n < 2 ? "you can't make any" : `you get ${Math.floor(n / 2)} ${n < 4 ? "pair" : "pairs"}`}, and ${k ? "1 is left over" : "none are left over"}. ${n} is <b>${k ? "odd" : "even"}</b>.`
    : k ? `${n} ends in ${u}: it is <b>odd</b> (if you make pairs, 1 is left over).` : `${n} ends in ${u}: it is <b>even</b> (you can make pairs with none left over).`,
  col_s: (a, b, d, u, r, plus) => `First the ones, then the tens. ${S.cols_s(a, b, plus)} ${a} ${plus ? "+" : "−"} ${b} = <b>${r}</b>.`,
  colq_q: (a, b, plus) => `Find <b>${a} ${plus ? "+" : "−"} ${b}</b> in columns. Start with the ones.`,
  // labels of the columns in the picture: tens and ones
  col_h: ["T", "O"],
  figura_q: "What shape is this?",
  girada_s: "Even when it is turned, it is still the same shape.",
  figuras: ["Circle", "Square", "Triangle", "Rectangle"],
  figura_s: ["It is round, with no sides and no corners: it is a <b>circle</b>.", "It has 4 sides that are all the same length: it is a <b>square</b>.", "It has 3 sides: it is a <b>triangle</b>.", "It has 4 sides, two long ones and two short ones: it is a <b>rectangle</b>."],
  lados_q: "How many <b>sides</b> does this shape have?",
  vertices_q: "How many <b>vertices</b> (corners) does this shape have?",
  lados_s: (n, v) => `Count ${v ? "the corners one by one" : "the sides one by one"}: it has <b>${n}</b>.${v ? "" : " (A shape always has as many sides as vertices.)"}`,
  cuerpo_q: "What three-dimensional shape is this?",
  cuerpos: ["Cube", "Sphere", "Cylinder", "Cone"],
  cuerpo_s: ["It has 6 square faces, like a number cube: it is a <b>cube</b>.", "It is round all over, like a ball: it is a <b>sphere</b>.", "It has two circles and it rolls, like a can: it is a <b>cylinder</b>.", "It has a circle and a point, like an ice cream cone: it is a <b>cone</b>."],
  pos_q: ["Where is the ball?", "Where is the ball?", "Which side of the tree is the ball on?"],
  pos_o: [["On top of the table", "Under the table"], ["Inside the box", "Outside the box"], ["On the left", "On the right"]],
  pos_s: ["The ball is on the table: <b>on top</b>.", "The ball is on the floor, under the table: <b>under</b>.", "The ball is in the box: <b>inside</b>.", "The ball is not in the box: <b>outside</b>.", "Look at the picture: the ball is on the same side as <b>your</b> left hand. It is <b>to the left</b> of the tree.", "Look at the picture: the ball is on the same side as <b>your</b> right hand. It is <b>to the right</b> of the tree."],
  serie_q: "Which shape goes in the empty box?",
  serie_s: n => `The pattern repeats the same group of ${n} shapes over and over. This one comes next:`,
  medir_q: "How many little squares long is the strip?",
  medir_s: n => `Count the little squares: the strip is <b>${n}</b> squares long.`,
  largo_q: "Which ribbon is <b>longer</b>?",
  corto_q: "Which ribbon is <b>shorter</b>?",
  cintas: ["The blue one", "The red one"],
  largo_s: (c, l) => `They start at the same place, so just look at where they end: <b>${c.toLowerCase()}</b> is ${l ? "longer" : "shorter"}.`,
  cuadros_q: "(Count the squares: they don't start at the same place!)",
  largo2_s: (a, b, c, l) => `They don't start at the same place, so looking at where they end is not enough: count the squares. The blue one is ${a} squares long and the red one is ${b}: <b>${c.toLowerCase()}</b> is ${l ? "longer" : "shorter"}.`,
  larga3_q: "Which ribbon is the <b>longest</b>?",
  corta3_q: "Which ribbon is the <b>shortest</b>?",
  cintas3: ["The blue one", "The red one", "The green one"],
  largo3_s: (c, l) => `They start at the same place: look at where each one ends. <b>${c}</b> is the ${l ? "longest" : "shortest"}.`,
  // the clock face, as in the lesson: "3 o'clock" and "half past 3" (no a.m./p.m.: a clock face does not show them)
  reloj_q: "What time is it? (Write only the number.)",
  reloj_s: h => `The short hand points to ${h} and the long hand points to 12: it is <b>${h} o'clock</b>.`,
  reloj2_q: "What time is it?",
  ymedia: h => `Half past ${h}`,
  enpunto: h => `${h} o'clock`,
  reloj2_s: (h, n) => `The long hand is at the bottom, on the 6: it is “half past.” The short hand has passed ${h}, but it has not reached ${n} yet: it is <b>half past ${h}</b>.`,
  // the US week starts on Sunday
  dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  meses: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  despues_q: (x, m) => `What ${m ? "month" : "day"} comes just <b>after</b> ${x}?`,
  antesde_q: (x, m) => `What ${m ? "month" : "day"} comes just <b>before</b> ${x}?`,
  dias_s: (x, r, after, m) => `${after ? "After" : "Before"} ${x} comes <b>${r}</b>.`,
  // dollars: bills of $1, $5, $10 and $20 (there is no $2 piece: see m1.dinero)
  dinero_q: "How many dollars are there in all?",
  dinero_s: (e, parts) => parts.length === 1 ? `There is one ${usd(parts[0])} bill: <b>${usd(e)}</b>.` : purse(parts, usd, "bill"),
  llega_q: p => `A toy costs <b>${usd(p)}</b>. Do you have enough money to buy it?`,
  llega_o: ["Yes", "No"],
  llega_s: (cuenta, e, p) => `${cuenta.replace(/<\/?b>/g, "")} ${e === p ? `It costs exactly ${usd(p)}: <b>yes</b>, you have enough.` : e > p ? `${e} is more than ${p}: <b>yes</b>, you have enough (and some money left over).` : `${e} is less than ${p}: <b>no</b>, you don't have enough.`}`,
  // US coins in cents: 25¢, 10¢, 5¢ and 1¢ (see m1.dinero)
  dineroc_q: "How many cents are there in all?",
  dineroc_s: (e, parts) => purse(parts, ct, "coin"),
  llegac_q: p => `A sticker costs <b>${ct(p)}</b>. Do you have enough money to buy it?`,
  llegac_s: (cuenta, e, p) => `${cuenta.replace(/<\/?b>/g, "")} ${e === p ? `It costs exactly ${ct(p)}: <b>yes</b>, you have enough.` : e > p ? `${e} is more than ${p}: <b>yes</b>, you have enough (and some money left over).` : `${e} is less than ${p}: <b>no</b>, you don't have enough.`}`,
  colores: ["blue", "red", "yellow"],
  coloresM: ["blue", "red", "yellow"],
  dos_q: w => `How many <b>${w}</b> are there?`,
  // shape and color together: "red triangles"
  dos_w: (cosa, color) => `${color} ${cosa}`,
  palotes_q: "What number do these tally marks show?",
  palotes_s: n => {
    const g = Math.floor(n / 5), r = n % 5, fives = Array.from({ length: g }, (_, i) => 5 * (i + 1)).join(", ");
    if (!g) return `There is no group of 5. Count the tally marks: ${desde(0, n)}. That is <b>${n}</b>.`;
    return `${g === 1 ? "There is one group of 5: 5" : `Count the groups of 5: ${fives}`}.${r ? ` Then count the other marks: ${desde(5 * g, n)}.` : ""} That is <b>${n}</b>.`;
  },
  color_q: c => `How many <b>${c}</b> shapes are there?`,
  figuras_de: c => `${c} shapes`,
  clas_s: (n, [w]) => n === 0 ? `Look for the ${w}: there aren't any. There are <b>0</b>.` : `Count only the ${w}, one by one: there ${is(n)} <b>${n}</b>.`,
  frutas: ["apples", "pears", "bananas", "oranges"],
  picto_q: f => `Look at the picture graph. How many pictures of <b>${f}</b> are there?`,
  picto_s: (f, n) => `In the row for ${f}, there ${is(n)} <b>${n}</b> ${n === 1 ? "picture" : "pictures"}.`,
  pmas_q: "Look at the picture graph. Which fruit has the <b>most</b> pictures?",
  pmenos_q: "Look at the picture graph. Which fruit has the <b>fewest</b> pictures?",
  pmas_s: (f, n, big) => `The ${big ? "longest" : "shortest"} row is the one for <b>${f}</b>, with ${n}.`,
  pdif_q: (a, b) => `Look at the picture graph. How many more pictures of ${a} are there than pictures of ${b}?`,
  ptot_q: "Look at the picture graph. How many pictures are there <b>in all</b>?",
  ptot_s: (rows, t) => `Count each row: ${rows.map(([f, n]) => `${f}, ${n}`).join("; ")}. Put them together: ${rows.map(r => r[1]).join(" + ")} = <b>${t}</b>.`,
  pdif_s: (a, b, r, la, lb) => `${cap(la)}: ${a}. ${cap(lb)}: ${b}. Make pairs and count how many are left over: ${a} − ${b} = <b>${r}</b> more.`,
});

const cuadros = n => n === 1 ? "1 square" : `${n} squares`;

// Math in Your Head (m1.mental)
S.mental_q = (a, b, plus) => `What is <b>${a} ${plus ? "+" : "−"} ${b}</b>? Do it in your head.`;
S.MT = {
  dec_s: (a, b, r, plus) => `Tens work just like ones: ${a} ${plus ? "+" : "−"} ${b} = ${r}, so ${a * 10} ${plus ? "+" : "−"} ${b * 10} = <b>${r * 10}</b>.`,
  uno_s: (n, r, plus) => plus ? `Plus 1 is the next number: ${n} + 1 = <b>${r}</b>.` : `Minus 1 is the number just before: ${n} − 1 = <b>${r}</b>.`,
  diez_s: (n, r, plus) => `${plus ? "Plus 10 is one more ten (on the hundred chart, one row down)" : "Minus 10 is one less ten (on the hundred chart, one row up)"}; the ones do not change: ${n} ${plus ? "+" : "−"} 10 = <b>${r}</b>.`,
  du_s: (d, u) => `Put the tens and the ones together: ${d / 10} ${d === 10 ? "ten" : "tens"} and ${u} ${u === 1 ? "one" : "ones"} make <b>${d + u}</b>.`,
  quitau_s: (n, u, r) => `Take away ${u === 1 ? "the 1 one" : `the ${u} ones`}, and only the tens are left: ${n} − ${u} = <b>${r}</b>.`,
  quitad_s: (n, d, r) => `Take away ${d === 10 ? "the ten" : `the ${d / 10} tens`}, and ${r === 1 ? "the 1 one is left" : "the ones are left"}: ${n} − ${d} = <b>${r}</b>.`,
};

// Above, Below, Inside, Outside (m1.posicion1): on top/under · inside/outside · in front/behind · near/far · top/bottom
S.P1 = {
  q: ["Where is the ball?", "Where is the ball?", "Where is the ball?", "Where is the ball?", "Where is the ball?"],
  o: [["On top of the table", "Under the table"], ["Inside the box", "Outside the box"], ["In front of the car", "Behind the car"],
    ["Near the house", "Far from the house"], ["On the top shelf", "On the bottom shelf"]],
  s: [["The ball is on the table: <b>on top</b>.", "The ball is on the floor, under the table: <b>under</b>."],
    ["The ball is in the box: <b>inside</b>.", "The ball is not in the box: <b>outside</b>."],
    ["The car is facing the ball (its headlights point that way): the ball is <b>in front</b>.", "The ball is at the back of the car, away from the headlights: <b>behind</b>."],
    ["The ball is almost touching the house: <b>near</b>.", "There is a lot of space between the ball and the house: <b>far</b>."],
    ["The ball is on the high shelf: <b>at the top</b>.", "The ball is on the shelf near the floor: <b>at the bottom</b>."]],
};

// Right and Left (m1.lado)
S.LD = {
  fr: ["the apple", "the pear", "the banana", "the orange"],
  fila_q: (f, right) => `In this row, which fruit is just to the <b>${right ? "right" : "left"}</b> of ${f}?`,
  fila_s: (f, r, right) => `Look at the row the way you read: you start on the left and finish on the right. Just ${right ? "after" : "before"} ${f} is <b>${r}</b>.`,
  nombres: ["Anna", "Leo", "Sarah", "Omar", "Mei", "Henry", "Nora", "Isaac"],
  frente_q: (n, right) => `${n} is facing you and raises ${his(n)} <b>${right ? "right" : "left"}</b> hand. On which side do you see it?`,
  frente_o: ["On my left", "On my right"],
  frente_s: (n, right) => `When someone is facing you, the sides switch, like in a mirror: ${his(n)} ${right ? "right" : "left"} hand is on your <b>${right ? "left" : "right"}</b>.`,
};

// First, Second, Third (m1.ordinal)
S.OC = {
  ord: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"],
  col: ["red", "blue", "green", "yellow", "purple", "orange"],
  meta: "FINISH",
  paso: (c, o) => `${c}, ${o}`,
  carrera_s: (steps, c, o) => `Count from the finish line: ${steps}. The ${c} car finishes <b>${o}</b>.`,
  lugar_q: c => `Car race! The finish line is the checkered flag. In what place does the <b>${c}</b> car finish?`,
  color_q: o => `Car race! The finish line is the checkered flag. What color is the car that finishes <b>${o}</b>?`,
  lee_q: n => `How do you read <b>${ord(n)}</b>?`,
  lee_s: (n, o, w) => `${ord(n)} is the one in place number ${n}: you read it “<b>${o}</b>.” “${cap(w)}” tells how many there are, not the place.`,
  esc_q: o => `How do you write “<b>${o}</b>” with a number?`,
  esc_s: (o, n) => `${cap(o)} is the one in place number ${n}: you write it <b>${ord(n)}</b>, with the number and two small letters.`,
  desp_q: o => `Which ordinal number comes just <b>after</b> “${o}”?`,
  ant_q: o => `Which ordinal number comes just <b>before</b> “${o}”?`,
  sig_s: (seq, o, r, after) => `Count: ${seq}. ${after ? "After" : "Before"} ${o} comes <b>${r}</b>.`,
  ult_q: n => `There are ${n} children in a line. In what place is the last child?`,
  ult_s: (n, o) => `If there are ${n}, the last one is in place number ${n}: <b>${o}</b>.`,
  // the US week starts on Sunday
  dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  dia_q: o => `The week goes: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday. Which day is the <b>${o}</b> day?`,
  dial_q: d => `The week goes: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday. In what place is <b>${d}</b>?`,
  dia_s: (list, d, o) => `Count from Sunday: ${list}. The ${o} day is <b>${d}</b>.`,
};

// Open and Closed Lines (m1.lineas)
S.LN = {
  ac_q: "What kind of line is this?",
  ac_o: ["Open", "Closed"],
  abie_s: "It has two ends: it starts in one place and stops in another. It is an <b>open</b> line.",
  hueco_s: "It almost closes, but it leaves a tiny gap! The ends don't touch: it is an <b>open</b> line.",
  cerr_s: "It has no ends: it goes all the way around and comes back to the same point. It is a <b>closed</b> line.",
  rc_q: "Is this line straight or curved?",
  rc_o: ["Straight", "Curved"],
  rc_s: ["It always goes the same way and does not bend, like the edge of a ruler: it is a <b>straight</b> line.", "It keeps bending, like the path of a snail: it is a <b>curved</b> line."],
  corral_q: ["The fence around the pen is a closed line. How many sheep are <b>inside</b>?", "The fence around the pen is a closed line. How many sheep are <b>outside</b>?", "How many sheep are there <b>in all</b>, inside and outside the fence?"],
  corral_s: [(a, o, r) => `Count the sheep inside the fence: there ${is(r)} <b>${r}</b>.`, (a, o, r) => `Count the sheep outside the fence: there ${is(r)} <b>${r}</b>.`, (a, o, r) => `There ${is(a)} ${a} inside and ${o} outside: ${a} + ${o} = <b>${r}</b>.`],
  let_q: "Which one of these is written with a <b>closed</b> line?",
  let_s: g => `The ${g === "O" ? "letter O" : "number 0"} goes all the way around and closes: it is a <b>closed</b> line. The others have ends: they are open lines.`,
  bank_q: w => `What kind of line is ${w}?`,
  bank_o: [["A straight line", "A curved line"], ["An open line", "A closed line"]],
  bank_s: [[w => `${cap(w)} does not bend: it is a <b>straight</b> line.`, w => `${cap(w)} keeps bending: it is a <b>curved</b> line.`],
    [w => `${cap(w)} starts in one place and stops in another, with two ends: it is an <b>open</b> line.`, w => `${cap(w)} goes all the way around and comes back to the same point, with no ends: it is a <b>closed</b> line.`]],
  // [thing, 0 straight/curved · 1 open/closed, answer]
  // (a 4th element, if there is one, is the solution for that thing)
  bank: [["the edge of a ruler", 0, 0], ["one side of a sheet of paper", 0, 0], ["a thread pulled tight between two nails", 0, 0], ["the trail of a snail that goes around and around", 0, 1], ["a rainbow", 0, 1],
    ["the path of a bouncing ball", 0, 1], ["the path you draw from your house to school", 1, 0], ["an untied shoelace", 1, 0], ["the letter C", 1, 0], ["the number 2", 1, 0],
    ["the edge of a coin", 1, 1], ["a hoop", 1, 1], ["the fence of a pen with no gaps", 1, 1], ["the path of your pencil when you trace around your hand and end where you started", 1, 1, "You go around your hand and come back to where you started: there are no ends. It is a <b>closed</b> line."], ["the letter O", 1, 1]],
};

// Yesterday, Today, and Tomorrow (m1.ayerhoy)
S.AH = {
  // the US week starts on Sunday
  dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  q: [x => `If today is <b>${x}</b>, what day will it be tomorrow?`, x => `If today is <b>${x}</b>, what day was it yesterday?`, x => `Yesterday was <b>${x}</b>. What day is it today?`, x => `Tomorrow will be <b>${x}</b>. What day is it today?`],
  s: [(x, r) => `Tomorrow is the next day. After ${x} comes <b>${r}</b>.`, (x, r) => `Yesterday is the day before. Before ${x} comes <b>${r}</b>.`,
    (x, r) => `Today is the day after yesterday. After ${x} comes <b>${r}</b>.`, (x, r) => `Today is the day before tomorrow. Before ${x} comes <b>${r}</b>.`],
  partes: ["morning", "afternoon", "night"],
  partes_o: ["Morning", "Afternoon", "Night"],
  parte_q: (p, after) => `What part of the day comes just <b>${after ? "after" : "before"}</b> ${p}?`,
  parte_s: (p, r, after) => `The day goes like this: morning, afternoon, and night. ${after ? "After" : "Before"} ${p} comes <b>${r}</b>.`,
  // [what we do, 0 morning · 1 afternoon · 2 night]
  act: [["eat breakfast", 0], ["wake up to go to school", 0], ["have an after-school snack", 1], ["eat dinner", 2], ["see the moon and the stars", 2], ["put on our pajamas to go to sleep", 2]],
  act_q: w => `When do we ${w}?`,
  act_o: ["In the morning", "In the afternoon", "At night"],
  act_s: (w, r) => `We ${w} <b>${r}</b>. The day goes like this: morning, afternoon, and night.`,
  orden: [["putting on your socks", "putting on your shoes"], ["planting the seed", "seeing the flower"], ["waking up", "getting out of bed"], ["getting wet in the shower", "drying off with the towel"],
    ["putting toothpaste on the toothbrush", "brushing your teeth"], ["eating breakfast", "eating dinner"], ["opening the present", "playing with the new toy"], ["putting on your pajamas", "falling asleep"], ["filling the glass", "drinking the water"], ["cracking the egg", "making the omelet"]],
  orden_q: (first, x, y) => `Which happens <b>${first ? "first" : "later"}</b>: ${x} or ${y}?`,
  orden_s: (a, b) => `<b>First</b> comes ${a}, and <b>then</b> ${b}. It can't happen the other way around!`,
};

// Holds More, Holds Less (m1.capacidad)
S.CP = {
  vaso_q: "How full is this glass?",
  vaso_o: ["Full", "Half full", "Empty"],
  vaso_s: ["It has water all the way to the top: it is <b>full</b>.", "It has water up to the middle: it is <b>half full</b>.", "It has no water at all: it is <b>empty</b>."],
  recs: ["the pitcher", "the bottle", "the bucket", "the watering can", "the pot", "the saucepan"],
  jarras: ["the red pitcher", "the blue pitcher", "the green pitcher"],
  // [container, smallest and largest number of glasses it can believably hold]
  quedan_r: [["the bottle", 3, 6], ["the pitcher", 3, 8], ["the saucepan", 5, 10], ["the pot", 6, 10], ["the watering can", 6, 10], ["the bucket", 8, 10]],
  en: r => cap(r),
  medir_q: r => `You fill ${r} with water and pour it into glasses that are all the same size. These are the full glasses. How many glasses of water does ${r} hold?`,
  medir_s: n => `Count the full glasses: it holds <b>${n}</b> glasses.`,
  comp_q: (rs, ns, more) => `${cap(rs[0])} holds ${ns[0]} glasses of water${rs.length > 2 ? `, ${rs[1]} holds ${ns[1]}, and ${rs[2]} holds ${ns[2]}` : `, and ${rs[1]} holds ${ns[1]}`}. Which one holds <b>${rs.length > 2 ? (more ? "the most" : "the least") : (more ? "more" : "less")}</b> water?`,
  comp_s: (rs, ns, j, more) => `${ns[j]} is the ${rs.length > 2 ? (more ? "greatest" : "smallest") : (more ? "greater" : "smaller")} number: <b>${rs[j]}</b> holds ${rs.length > 2 ? (more ? "the most" : "the least") : (more ? "more" : "less")} water.`,
  dif_q: (r1, a, r2, b) => `${cap(r1)} holds ${a} glasses of water, and ${r2} holds ${b}. How many more glasses does ${r1} hold?`,
  dif_s: (r1, a, r2, b) => `${a} − ${b} = <b>${a - b}</b>. ${cap(r1)} holds ${a - b === 1 ? "1 more glass" : `${a - b} more glasses`}.`,
  quedan_q: (r, n, u) => `${cap(r)} holds ${n} glasses of water. You fill ${r} and pour its water into glasses. You have already filled ${u === 1 ? "1 glass" : `${u} glasses`}. How many more glasses will you fill?`,
  quedan_s: (n, u) => `The water fills ${n} glasses in all, and you have already filled ${u}: ${n} − ${u} = <b>${n - u}</b> more ${n - u === 1 ? "glass" : "glasses"}.`,
  pares: [["a bathtub", "a cup"], ["a bucket", "a glass"], ["a swimming pool", "a bathtub"], ["a soup bowl", "a spoon"], ["a pitcher", "a glass"], ["a pot", "a cup"], ["a watering can", "a glass"], ["a big bottle", "a spoon"]],
  pares_q: (a, b, more) => `Which holds <b>${more ? "more" : "less"}</b> water: ${a} or ${b}?`,
  pares_s: (big, small) => `${cap(big)} holds much more water than ${small}.`,
};

// Heavier and Lighter (m1.pesar)
S.PS = {
  nom: { sandia: "watermelon", melon: "melon", botella: "water bottle", piedra: "rock", libro: "book", manzana: "apple", naranja: "orange", fresa: "strawberry", lapiz: "pencil", pluma: "feather", hoja: "leaf", globo: "balloon", pelota: "beach ball" },
  art: { sandia: "the watermelon", melon: "the melon", botella: "the water bottle", piedra: "the rock", libro: "the book", manzana: "the apple", naranja: "the orange", fresa: "the strawberry", lapiz: "the pencil", pluma: "the feather", hoja: "the leaf", globo: "the balloon", pelota: "the beach ball" },
  mas_q: "Look at the scale. Which one is <b>heavier</b>?",
  menos_q: "Look at the scale. Which one is <b>lighter</b>?",
  bal_s: (h, l, big) => `The pan that goes down is the one with ${h}: ${h} is <b>heavier</b> and ${l} is <b>lighter</b>.${big ? ` But ${l} is bigger! Big things are not always heavier.` : ""}`,
  // [with "the", for the picture, with "a"]
  toys: [["the robot", "robot", "a robot"], ["the toy car", "car", "a toy car"], ["the teddy bear", "teddy bear", "a teddy bear"], ["the ball", "ball", "a ball"], ["the truck", "truck", "a truck"], ["the doll", "doll", "a doll"]],
  cubos_q: t => `The scale is balanced. How many cubes weigh the same as ${t}?`,
  cubos_s: (t, n) => `Balanced means that both pans weigh the same: ${t} weighs the same as <b>${n}</b> cubes.`,
  cmp_q: (a, x, b, y, more) => `${cap(a)} balances with ${x} cubes, and ${b} balances with ${y} cubes. Which one is <b>${more ? "heavier" : "lighter"}</b>?`,
  cmp_s: (t, mx, mn, more) => `${mx} cubes is more than ${mn}. <b>${cap(t)}</b> is ${more ? "heavier" : "lighter"}.`,
  dif_q: (a, x, b, y, h, l) => `${cap(a)} balances with ${x} cubes, and ${b} balances with ${y} cubes. ${cap(h)} is heavier than ${l}. How many cubes heavier is it?`,
  dif_s: (mx, mn, h, l) => `${cap(h)}: ${mx} cubes. ${cap(l)}: ${mn} cubes. ${mx} − ${mn} = <b>${mx - mn}</b> ${mx - mn === 1 ? "cube" : "cubes"} heavier.`,
  sin_q: (a, b, more) => `Which is <b>${more ? "heavier" : "lighter"}</b>: ${a} or ${b}?`,
  sin_s: (h, l, big) => `${cap(h)} is heavier than ${l}: if you put them both on a scale, the pan with ${h} goes down.${big ? ` But ${l} is bigger!` : ""}`,
};

// Turns and Routes (m1.giros)
const HACIA = { R: "to the right", L: "to the left", U: "up", D: "down" };
S.GR = {
  gira: ["She turns right", "She turns left", "She makes a half turn", "She makes a full turn"],
  otra: "she makes another half turn",
  // "She turns left and then turns right" (the second "she" is dropped)
  y: (a, b) => `${a} and then ${b.replace(/^she /, "")}`,
  paso: (t, d) => `${cap(t)}: now she is facing ${d}.`,
  dirs: ["Up", "Right", "Down", "Left"],
  giro_q: i => `In the picture, Mica is facing up. ${i}. Which way is she facing now?`,
  giro_s: (steps, d) => `${steps} In the end, Mica is facing <b>${d}</b>.`,
  hacia: HACIA,
  // 3 squares to the right and 2 up
  cuenta: seq => {
    const g = [];
    seq.forEach(m => { if (g.length && g[g.length - 1][0] === m) g[g.length - 1][1]++; else g.push([m, 1]); });
    return lst(g.map(([m, n], i) => `${i ? n : cuadros(n)} ${HACIA[m]}`));
  },
  flechas_q: "Mica is in the pink square. Which arrows take her to the flower? (Each arrow is one square.)",
  flechas_s: c => `From the start, Mica has to move ${c}. Each arrow is one square.`,
  llega_q: a => `Mica starts in the pink square and follows these arrows: <b>${a}</b>. Where does she end up?`,
  premios: ["the flower", "the leaf", "the mushroom"],
  premios_o: ["At the flower", "At the leaf", "At the mushroom"],
  llega_s: (c, p) => `Mica moves ${c}: she ends up at <b>${p}</b>.`,
  cuantos_q: (a, h) => `A robot follows these arrows: <b>${a}</b>. How many squares does it move ${h}?`,
  cuantos_s: (f, n, h) => `Count the ${f} arrows: there ${is(n)} ${n}. It moves <b>${n}</b> ${n === 1 ? "square" : "squares"} ${h}.`,
  total_q: a => `A robot follows these arrows: <b>${a}</b>. How many squares does it move in all?`,
  total_s: n => `Each arrow is one square. Count all the arrows: <b>${n}</b>.`,
};

// Estimating How Many (m1.estimar)
S.ES = {
  objs: [["buttons", 0], ["marbles", 1], ["clothespins", 1], ["chickpeas", 0], ["macaroni", 0]],
  nombres: ["Mei", "Henry", "Leo", "Anna", "Sarah", "Omar", "Isaac", "Lucy"],
  canicas: "marbles",
  unos: t => `About ${t}`,
  mont_q: (o) => `The circled group has 10 ${o}. About how many ${o} are in the big pile?`,
  mont_s: (g, seq, t, n) => `The pile is like ${g} groups of 10: ${seq}. There are <b>about ${t}</b>. (If you count them, there are ${n}: very close!)`,
  pun_q: (o, f, p) => `One handful holds about 10 ${o}. About how many ${o} are in ${p} handfuls?`,
  pun_s: (seq, t, o) => `Count by tens: ${seq}. There are about <b>${t}</b> ${o}.`,
  grup_q: (o, f, g, s) => `You have a pile of ${o}. You make groups of 10: you get ${g} groups, and ${s === 1 ? "1 is left over" : `${s} are left over`}. Exactly how many ${o} are there?`,
  grup_s: (g, s, t) => `${g} groups of 10 make ${g * 10}, and ${s} more: ${g * 10} + ${s} = <b>${t}</b>.`,
  quien_q: (o, f, a, e1, b, e2, n) => `${a} says there are about ${e1} ${o} in the jar, and ${b} says about ${e2}. They count them, and there are ${n}. Who made the better estimate?`,
  quien_s: (n, g, b, who) => `${n} is much closer to ${g} than to ${b}: <b>${who}</b> made the better estimate.`,
  bien_q: (o, f, a, e, n) => `${a} says there are about ${e === 1000 ? "a thousand" : e} ${o} in the box. Then ${he(a)} counts them, and there are ${n}. Is that a good estimate?`,
  bien_o: ["Yes: it is very close", "No: it is very far off"],
  bien_s: (e, n, ok) => ok ? `Estimating means saying a number that is close. ${n} is very close to ${e}: it is a <b>very good</b> estimate!` : `${e === 1000 ? "A thousand" : e} is very far from ${n}: it is <b>not</b> a good estimate. Look carefully and compare with a group of 10.`,
};
})();
