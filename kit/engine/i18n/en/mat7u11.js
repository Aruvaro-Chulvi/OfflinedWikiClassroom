/* WikiAula — texts for gen/mat7u11.js (Grade 7 · Unit 11: Functions and Graphs), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helper: a list with the serial comma ("a, b, and c"; "a and b")
// The temperature graphs have a 0–24 hour axis: "hour 15 (3 p.m.)"
const hr = h => `hour ${h} (${h % 24 === 0 ? "midnight" : h === 12 ? "noon" : window.WA.H.time(h, 0).replace(":00", "")})`;
const andList = l => l.length < 3 ? l.join(" and ") : l.slice(0, -1).join(", ") + ", and " + l[l.length - 1];
Object.assign(S, {
  fn_coord_q: "What are the coordinates of point P?",
  fn_coord_f: ["x", "y"],
  fn_coord_s: (x, y) => `First the x-coordinate (horizontal), then the y-coordinate (vertical): P = <b>(${x}, ${y})</b>.`,
  fn_cuad_q: p => `Where is the point <b>${p}</b>?`,
  fn_cuads: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV", "On an axis"],
  fn_cuad_s: (x, y, k) => k === 4 ? `One of its coordinates is 0, so it is <b>on an axis</b> (${x === 0 ? "the y-axis, the vertical one" : "the x-axis, the horizontal one"}).`
    : `The x-coordinate is ${x > 0 ? "positive (to the right)" : "negative (to the left)"}, and the y-coordinate is ${y > 0 ? "positive (up)" : "negative (down)"}: signs ${["(+, +)", "(−, +)", "(−, −)", "(+, −)"][k]}, so the point is in <b>Quadrant ${["I", "II", "III", "IV"][k]}</b>.`,
  fn_img_q: (f, k) => `For the function <b>y = ${f}</b>, find the value of y when <b>x = ${k}</b>.`,
  fn_img_s: (e, r) => `Substitute the value of x into the equation: y = ${e} = <b>${r}</b>.`,
  fn_tabla_q: (f, tbl) => `Complete the table of values for the function <b>y = ${f}</b>:${tbl}`,
  fn_form_q: tbl => `Which equation matches this table of values?${tbl}`,
  // As in the lesson: how much y changes when x increases by 1, and the value of y when x = 0
  fn_form_s: (f, a, b, ax, y2) => `Each time x increases by 1, y ${a.startsWith("−") ? "decreases by " + a.slice(1) : "increases by " + a}, so the equation has ${ax}. When x = 0, y = ${b}, so ${b === "0" ? "you don't add or subtract anything" : b.startsWith("−") ? "you subtract " + b.slice(1) : "you add " + b}. Equation: <b>y = ${f}</b>. Check with x = 2: ${a} · 2 ${b.startsWith("−") ? "− " + b.slice(1) : "+ " + b} = ${y2} ✓`,
  fn_graf_q: k => `Looking at the graph, what is the value of y when <b>x = ${k}</b>?`,
  fn_graf_s: (k, v, r) => v === 0 ? `At x = ${k}, the line crosses the horizontal axis exactly: <b>y = 0</b>.` : `Go ${v > 0 ? "up" : "down"} from x = ${k} to the line and read the height: <b>y = ${r}</b>.`,
  // [relationship, is it a function?, why (with the variable of that relationship)]
  fn_es: [
    ["Each person is matched with their age.", true, "if you know the person, they have only one age (nobody is two ages at the same time)"],
    ["Each number is matched with its double.", true, "each number has only one double: 7 goes with 14"],
    ["Each day of the year is matched with its high temperature.", true, "each day has only one high temperature"],
    ["Each number is matched with its square.", true, "each number has only one square: −3 goes with 9 (it doesn't matter that 3 also goes with 9)"],
    ["Each student is matched with their score on the last math test.", true, "each student got only one score on that test"],
    ["Each number is matched with the number that comes next.", true, "each number has only one number that comes next: 8 goes with 9"],
    ["Each student in the class is matched with their date of birth.", true, "each student was born on only one date"],
    ["Each positive number is matched with the numbers whose square is that number (for example, 9 is matched with 3 and −3).", false, "9 goes with two numbers, 3 and −3"],
    ["Each age is matched with the people who are that age.", false, "the age of 12 goes with many people"],
    ["Each letter is matched with the words that start with it.", false, "the letter “m” goes with many words (map, man, music…)"],
    ["Each whole number is matched with its factors.", false, "6 goes with several factors: 1, 2, 3, and 6"],
    ["Each mother is matched with her children.", false, "a mother can have several children"],
  ],
  fn_es_q: s => `Is this relationship a function? (Hint: if you know the first value, do you know exactly which value goes with it?)<br><i>${s}</i>`,
  fn_es_s: (ok, why) => (ok ? `Yes: ${why}. Each input goes with <b>exactly one</b> output, so it <b>is a function</b>.`
    : `No: ${why}. In a function, each input has <b>exactly one</b> output, so it <b>is not a function</b>.`),
  // m7.fn.describir: the temperature during one day
  fn_temp_ejes: ["hour", "°C"],
  fn_temp: {
    q: [
      "The graph shows the temperature during one day. At what hour was the temperature highest? (Write only the hour on the axis, as a number from 0 to 24.)",
      "The graph shows the temperature during one day. What was the lowest temperature, in °C?",
      "The graph shows the temperature during one day. Between which hours was the temperature increasing?",
      "The graph shows the temperature during one day. How many degrees did the temperature rise from the minimum to the maximum?",
      h => `The graph shows the temperature during one day. What was the temperature at ${hr(h)}, in °C?`,
    ],
    f: ["From hour", "To hour"],
    s: [
      (h, M) => `The maximum is the highest point of the graph: ${M} °C. Go straight down to the horizontal axis: hour <b>${h}</b> (${hr(h).replace(/^hour \d+ \(|\)$/g, "")}). (Careful: the hour is the x-value; the temperature is the y-value.)`,
      (h, m) => `The minimum is the lowest point of the graph, at ${hr(h)}. Go straight across to the vertical axis: <b>${m}</b> °C.`,
      (a, b, m, M) => `The graph is increasing where the line goes up as you read it from left to right: from the minimum (${m} °C, at hour ${a}) to the maximum (${M} °C, at hour ${b}). From hour <b>${a}</b> to hour <b>${b}</b> (${hr(a).replace(/^hour \d+ \(|\)$/g, "")} to ${hr(b).replace(/^hour \d+ \(|\)$/g, "")}).`,
      (M, mt, m, r) => `Maximum: ${M} °C. Minimum: ${mt} °C. Change: ${M} − ${m < 0 ? "(" + mt + ")" : mt}${m < 0 ? ` = ${M} + ${-m}` : ""} = <b>${r}</b> ${r === 1 ? "degree" : "degrees"}.`,
      (h, t) => `Find ${hr(h)} on the horizontal axis and go up (or down) to the graph: <b>${t}</b> °C.`,
    ],
  },
  // m7.fn.pertenece
  fn_pert: {
    q: (x, y, f) => `Is the point <b>(${x}, ${y})</b> on the graph of <b>y = ${f}</b>?`,
    s: (x, e, y0, y, yes) => `Find the y-value that goes with x = ${x}: y = ${e} = ${y0}. ` + (yes ? `It matches the second coordinate of the point: <b>yes</b>, the point is on the graph.` : `That is not ${y}, so the point is <b>not</b> on the graph.`),
    unir_q: t => `In the graph of this situation, do you connect the points with a line or leave them as separate points?<br><i>${t}</i>`,
    unir_opts: ["Connect them with a line", "Leave them as separate points"],
    // [situation, continuous?, why]
    sit: [
      ["The number of movie tickets you buy and the amount you pay.", false, "you can only buy whole tickets (1, 2, 3…): there is no such thing as “2 and a half tickets”"],
      ["The liters of water in a tank that is filling up, minute by minute.", true, "the water keeps flowing in: between minute 2 and minute 3 there is also water, at every instant"],
      ["The number of students in each class and the number of desks the class needs.", false, "students and desks are counted with whole numbers"],
      ["The temperature of a room throughout the day.", true, "the temperature changes without jumps and has a value at every moment, at a quarter past 10 too"],
      ["The kilograms of fruit you buy by weight and the amount you pay.", true, "you can buy 1.5 kg or 2.3 kg: every amount in between has a price"],
      ["The number of pens you buy and the amount you pay.", false, "nobody sells pieces of a pen"],
      ["The height of a plant over a month.", true, "the plant grows little by little, without jumps: it has a height at every instant"],
      ["The number of siblings and the number of holiday gifts you buy for them.", false, "siblings and gifts are counted with whole numbers"],
      ["The distance a train has traveled during a trip.", true, "the train passes through every distance in between, at every instant"],
    ],
    unir_s: (cont, why) => cont ? `Connect them: ${why}. The quantity changes without jumps, so <b>you connect the points with a line</b>.` : `Separate points: ${why}. There are no meaningful values between one point and the next, so <b>you leave them as separate points</b>.`,
  },
  fn_int_q: [
    t => `This graph shows how far Leo is from home during a walk. In all, how many minutes was he standing still?`,
    t => `This graph shows how far Leo is from home during a walk. What was the greatest distance from home that he reached, in meters?`,
    t => `This graph shows how far Leo is from home during a walk. How far from home was he at minute ${t}, in meters?`,
  ],
  fn_int_s: [
    (p, st) => st.length ? `The horizontal segments are the times when the distance does not change: Leo is standing still. ${st.length === 1 ? "There is one" : "There are " + st.length}: ${andList(st.map(([a, b]) => `from minute ${a} to minute ${b} (${b - a} min)`))}. In all, <b>${p}</b> minutes.`
      : `There are no horizontal segments: Leo never stopped (<b>0</b> minutes).`,
    (m) => `The highest point of the graph shows the greatest distance: <b>${m}</b> m.`,
    (t, d) => `Go up from minute ${t} to the graph: <b>${d}</b> m.`,
  ],
  fn_ejes: ["minutes", "meters"],
});
})();
