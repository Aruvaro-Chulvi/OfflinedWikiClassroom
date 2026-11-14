/* WikiAula — texts for gen/mat2.js (Mathematics, Grade 2), in US English.
   Complete since 2026-11-11 (Grade 2). Adaptations to the US (see traduccion/en/incidencias_mat2.md):
   US dollars in m2.euros and m2.dospasos; digital clock with a.m./p.m. (S.m2.ampm: 7–11 a.m., 12–6 p.m.);
   calendar page from Sunday to Saturday (S.m2.CA); subtraction with regrouping (rs_col, resta_s). */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m2 = G.m2 || {};
const H = () => window.WA.H;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const COL = ["Ones", "Tens", "Hundreds"];
const end = s => /\.$/.test(s) ? "" : ".";   // no second period after "p.m."
// "a"/"an" in front of a number, by how it is read: an 8-liter jug, an 11-liter jug (as artNum in mat4.js and mat5.js)
const artNum = x => { const ip = String(x).split(".")[0].replace(/\D/g, ""), g = ip.slice(0, ip.length % 3 || 3); return /^8/.test(g) || g === "11" || g === "18" ? "an" : "a"; };
// digital clock (S.m2.ampm): hours 7–11 are in the morning (a.m.); 12 and 1–6, in the afternoon (p.m.).
// AMPM = true, as in the lesson "The Digital Clock" and its figures (CCSS 2.MD.C.7; revision_mat2.md); false: no a.m./p.m.
const AMPM = true;
const am = h => h >= 7 && h <= 11;
const when = (h, m) => am(h) ? "in the morning (a.m.)" : h === 12 && m === 0 ? "noon (p.m.)" : "in the afternoon (p.m.)";
// the hour of a clock phrase: "quarter to 5" is still 4
const hourOf = w => { const n = +w.match(/\d+/)[0]; return /^quarter to/i.test(w) ? (n === 1 ? 12 : n - 1) : n; };
Object.assign(S, {
  bloques_q: "What number do these blocks make? (Flat = 100, rod = 10, small cube = 1.)",
  cdu_q: n => `How many hundreds, tens, and ones are in the number <b>${n}</b>?`,
  cdu_f: ["Hundreds", "Tens", "Ones"],
  cdu_s: (n, c, d, u) => `${n} = ${pl(c, "hundred", "hundreds")} + ${pl(d, "ten", "tens")} + ${pl(u, "one", "ones")} = ${c * 100} + ${d * 10} + ${u}.`,
  descomp_q: (c, d, u) => `What number has <b>${pl(c, "hundred", "hundreds")}, ${pl(d, "ten", "tens")}, and ${pl(u, "one", "ones")}</b>?`,
  posn: ["the hundreds place", "the tens place", "the ones place"],
  valor_q: (n, d) => `In the number <b>${n}</b>, what is the value of the digit <b>${d}</b>?`,
  valor_s: (d, pos, v) => `The digit ${d} is in ${pos}, so its value is <b>${v}</b>.`,
  letras_q: w => `How do you write “<b>${w}</b>” using digits?`,
  letras2_q: n => `How do you write the number <b>${n}</b> in words?`,
  // the two parts: "eight hundred" and "seventy-two"
  letras_s: (n, c, rest, wc, wr, w) => `First part, the hundreds: ${pl(c, "hundred", "hundreds")} → <i>${wc}</i>. `
    + (rest === 0 ? "There is no second part: 0 tens and 0 ones. " : rest < 10 ? `Second part: ${rest} → <i>${wr}</i> (0 tens: you don't say the 0). ` : `Second part: ${rest} → <i>${wr}</i>. `)
    + `<b>${n}</b> is written <b>${w}</b>.`,
  // the mistakes of the lesson (or null): "nine hundreds" (the red cards 500, 700, 900 of the lesson) and an "and"
  // after the hundreds ("one hundred and five")
  letras_mal: (w, c, rest) => {
    if (c === 5 || c === 7 || c === 9) return w.replace(" hundred", " hundreds");
    if (rest) return w.replace(" hundred ", " hundred and ");
    return null;
  },
  par_o: ["Even", "Odd"],
  par_q: n => `Is the number <b>${n}</b> even or odd?`,
  par_s: (n, u, odd, first, trap) => `Look only at the last digit: ${n} ends in ${u}, which is ${odd ? "odd" : "even"}.${trap ? ` (It doesn't matter that it starts with ${first}: the last digit decides.)` : ""} ${n} is <b>${odd ? "odd" : "even"}</b>.`,
  parcual_q: even => `Which of these numbers is <b>${even ? "even" : "odd"}</b>?`,
  parcual_s: (ns, g, even) => `Look at the last digit of each one: ${ns.map(x => `${x} ends in ${x % 10}`).join(", ")}. Only ${g} ends in an ${even ? "even" : "odd"} digit: <b>${g}</b>.`,
  vecino_q: (n, after) => `What number comes just <b>${after ? "after" : "before"}</b> ${n}?`,
  vecino_s: ([c, d, u], [c2, d2, u2], after) => {
    const bl = (c, d, u) => `${pl(c, "flat", "flats")}, ${pl(d, "rod", "rods")}, and ${pl(u, "small cube", "small cubes")}`;
    const n = c * 100 + d * 10 + u, r = c2 * 100 + d2 * 10 + u2;
    if (after) return `${n} is ${bl(c, d, u)}. Add 1 small cube: 10 small cubes make 1 rod.${d === 9 ? " Now there are 10 rods: they make 1 flat." : ""} Now you have ${bl(c2, d2, u2)}: <b>${r}</b>.`;
    return `${n} is ${bl(c, d, u)}. To take away 1 small cube, ${d === 0 ? "break 1 flat into 10 rods and 1 rod into 10 small cubes" : "break 1 rod into 10 small cubes"}, and take away 1. That leaves ${bl(c2, d2, u2)}: <b>${r}</b>.`;
  },
  comp_q: (a, b) => `Choose the sign that goes in the box: <b>${a} ☐ ${b}</b>`,
  // as in the lesson: place by place, from left to right, until one place decides
  comp_s: (a, b, k, da, db) => {
    const C = ["Hundreds", "Tens", "Ones"], p = da.findIndex((x, i) => x !== db[i]);
    const steps = C.map((c, i) => i < p || p < 0 ? `${c}: ${da[i]} and ${db[i]}, a tie.` : i === p ? `${c}: ${da[i]} and ${db[i]}; ${da[i]} is ${da[i] > db[i] ? "greater" : "less"}${p < 2 ? ", and that decides it!" : "."}` : "").filter(Boolean);
    return k === 2 ? `${steps.join(" ")} They are equal: <b>${a} = ${b}</b>.` : `${steps.join(" ")} So <b>${a} ${k ? "&lt;" : "&gt;"} ${b}</b>.`;
  },
  mayor_q: s => `Which number is the <b>greatest</b>? ${s}`,
  menor_q: s => `Which number is the <b>least</b>? ${s}`,
  orden_s: (s, r) => `In order from least to greatest: ${s}. The answer is <b>${r}</b>.`,
  red_q: n => `Round <b>${n}</b> to the nearest ten.`,
  // as in the lesson: "The ones digit is 4, less than 5: we round down to 80."
  red_s: (n, u, r, up) => `Look at the ones digit: ${u}. ${up ? "It is 5 or more, so the number rounds up to the next ten" : "It is less than 5, so the number rounds down to the ten before"}: <b>${r}</b>.`,
  suma_q: (a, b) => `What is <b>${a} + ${b}</b>?`,
  // column addition, column by column, as in "Adding with Regrouping"
  sc_col: (p, x, y, c, s, other) => {
    const col = COL[p], lleva = c ? `, plus the 1 I carried, ${s}` : "", fin = s >= 10 ? `. I write ${s % 10} and carry 1.` : ".";
    if (x === null || y === null) return `${col}: ${other} has no ${col.toLowerCase()}, so ` + (c ? `${x === null ? y : x} plus the 1 I carried is ${s}${fin}` : `I just write ${x === null ? y : x}${fin}`);
    return `${col}: ${x} + ${y} = ${x + y}${lleva}${fin}`;
  },
  sc_new: p => `${COL[p]}: there is nothing to add, so I write the 1 I carried by itself in the hundreds place.`,
  suma_s: (a, b, r, cols, mix) => (mix ? "Line up the numbers on the right: ones under ones and tens under tens.<br>" : "") + `${cols.join("<br>")}<br>${a} + ${b} = <b>${r}</b>.`,
  prop_q: e => `What number goes in the box? <b>${e}</b>`,
  prop_s: [(a, b) => `Commutative property: changing the order of the addends does not change the sum. So <b>${a}</b> goes in the box.`, c => `Associative property: it doesn't matter which two addends you add first. The addends are the same, so <b>${c}</b> goes in the box.`, "Adding 0 does not change anything: the number stays the same. So <b>0</b> goes in the box."],
  ps_orden: (a, b, r) => `The order does not change the answer: ${a} + ${b} = ${b} + ${a}. Both sides have the same numbers, so <b>${r}</b> goes in the box.`,
  ps_amigos_q: s => `Add in your head: <b>${s}</b>. (Look for the pair that makes 10.)`,
  ps_amigos_s: (p, q, r, t) => `First add the pair that makes 10: ${p} + ${q} = 10. Then 10 + ${r} = <b>${t}</b>.`,
  ps_cero: (a, h) => h === 0 ? `The number stays the same, so nothing is added: <b>0</b> goes in the box. ${a} + 0 = ${a}.` : `Adding 0 means adding nothing: the number stays the same, <b>${a}</b>.`,
  ser_q: s => `What number is missing in the pattern? <b>${s}</b>`,
  ser_s: (st, down, full, ans, cross) => `Each number is ${st} ${down ? "less" : "more"} than the one before: the rule is ${down ? "subtract" : "add"} ${st}. The pattern is ${full}. The missing number is <b>${ans}</b>.`
    + (cross ? " Careful: when the pattern crosses a hundred, the hundreds digit changes too." : ""),
  torre_q: s => `Look at the towers: they have ${s.replace(/, (?=[^,]*$)/, ", and ")} cubes. How many cubes will the next tower have?`,
  torre_s: (hs, g, r) => `Each tower has ${g} more ${g === 1 ? "cube" : "cubes"} than the one before: ${hs.join(", ")}… The next one will have ${hs[2]} + ${g} = <b>${r}</b>.`,
  resta_q: (a, b) => `What is <b>${a} − ${b}</b>?`,
  // column subtraction with regrouping (US): when the top digit is smaller, trade 1 from the next place on the left
  // for 10 in this place. a: the top number (to see the digits on the left); the result digits are the same as
  // in the Spanish method ("le pongo un 1 delante y me llevo una").
  rs_col: (p, top, b0, carry, borrow, r, zeroLast, a) => {
    const col = COL[p], dg = q => Math.floor(a / 10 ** q) % 10, PL = ["ones", "tens", "hundreds"], ONE = ["one", "ten", "hundred"];
    const across = carry && top === 0;   // it was 0: it became 10 and then 9 when the column on its right regrouped
    const cur = carry ? (across ? 9 : top - 1) : top;   // the top digit after the regrouping on its right
    const pv = (n, q) => `the ${n} ${n === 1 ? ONE[q] : PL[q]} ${n === 1 ? "becomes" : "become"} ${n - 1}`;
    if (zeroLast) return `${col}: ${cur} − ${b0} = 0 (I don't write a 0 at the front of the answer).`;
    if (!borrow || across) return `${col}: ${cur} − ${b0} = ${r}.`;
    const nx = dg(p + 1);
    if (nx > 0) return `${col}: ${cur} is less than ${b0}, so I regroup: ${pv(nx, p + 1)}, and the ${cur} becomes ${cur + 10}. ${cur + 10} − ${b0} = ${r}.`;
    const nn = dg(p + 2);
    return `${col}: ${cur} is less than ${b0}, and there are 0 ${PL[p + 1]}, so I regroup twice: ${pv(nn, p + 2)}, and the 0 ${PL[p + 1]} become 10; then the 10 ${PL[p + 1]} become 9, and the ${cur} becomes ${cur + 10}. ${cur + 10} − ${b0} = ${r}.`;
  },
  resta_s: (a, b, r, steps) => `I subtract in columns, starting with the ones. If the top digit is smaller than the bottom digit, I regroup: I cross out the digit on its left and write 1 less, and the top digit gets 10 more.<br>${steps.join("<br>")}<br>${a} − ${b} = <b>${r}</b>.`,
  pr_q0: (a, b, d) => `If ${a} − ${b} = ${d}, what is <b>${d} + ${b}</b>?`,
  pr_s0: (d, b, a) => `This is how you check a subtraction: the answer plus the number you took away gives the top number (difference + subtrahend = minuend). ${d} + ${b} = <b>${a}</b>.`,
  pr_s1: (d, b, a) => `The top number is missing. Go back by adding what is left and what was taken away: ${d} + ${b} = <b>${a}</b>. Check: ${a} − ${b} = ${d}.`,
  pr_s2: (a, d, b) => `How much was taken away to go from ${a} to ${d}? Subtract: ${a} − ${d} = <b>${b}</b>. Check: ${d} + ${b} = ${a}.`,
  dp_q: [
    (N, a, b, c) => `${N} had $${a} in a piggy bank, spent $${b} on a book, and then got $${c} as a gift. How many dollars does ${N} have now?`,
    (N, a, b, c) => `There are ${a} people on a bus. At a stop, ${b} people get on and ${c} get off. How many people are on the bus now?`,
    (N, a, b, c) => `A farm had ${a} eggs. They sold ${b} in the morning and ${c} in the afternoon. How many eggs are left?`,
    (N, a, b, c) => `${N} read ${a} pages on Monday, ${b} on Tuesday, and ${c} on Wednesday. How many pages did ${N} read in all?`],
  dp_s: [
    (a, b, c, p, r) => `First, take away the money spent: $${a} − $${b} = $${p}. Then, add the gift: $${p} + $${c} = <b>$${r}</b>.`,
    (a, b, c, p, r) => `First, people get on: ${a} + ${b} = ${p}. Then, people get off: ${p} − ${c} = <b>${r}</b>.`,
    (a, b, c, p, r) => `In the morning: ${a} − ${b} = ${p}. In the afternoon: ${p} − ${c} = <b>${r}</b>. You can also add up the eggs sold first: ${b} + ${c} = ${b + c}, and ${a} − ${b + c} = ${r}. You get the same answer!`,
    (a, b, c, p, r) => `${a} + ${b} = ${p}, and ${p} + ${c} = <b>${r}</b>.`],
  grupos_q: (k, n) => `There are ${k} equal groups. How many shapes are there in all?`,
  grupos_s: (k, n, sum, r) => `${k} groups of ${n}: ${sum} = ${k} × ${n} = <b>${r}</b>.`,
  rep_q: (sum, n) => `Write it as a multiplication: <b>${sum}</b> = ☐ × ${n}`,
  rep_s: (sum, k, n, r) => `${n} is added <b>${k}</b> times: ${sum} = ${k} × ${n} = ${r}.`,
  dobtri_q: (t, m) => `What is <b>${t === 2 ? "double" : "triple"}</b> ${m}?`,
  dobtri_s: (t, m) => `${t === 2 ? "Double" : "Triple"} means ${t} times: ${t} × ${m} = ${Array(t).fill(m).join(" + ")} = <b>${t * m}</b>.`,
  filas_q: "How many shapes are there? (Look at how many rows there are and how many shapes are in each row.)",
  filas_s: (k, n, sum, r) => `There are ${k} rows of ${n}: ${k} × ${n} = ${sum} = <b>${r}</b>.`,
  quesuma_q: (k, n) => `Which addition is the same as <b>${k} × ${n}</b>?`,
  quesuma_s: (k, n, s, r) => `${k} × ${n} means “${k} groups of ${n}”: ${n} is added ${k} times. <b>${s}</b> = ${r}.`,
  objs: [["candies", 0], ["marbles", 1], ["trading cards", 0], ["cookies", 1], ["stickers", 1], ["pencils", 0]],
  rep2_q: (n, obj, k, fem) => `We share ${n} ${obj} equally among ${k} friends. How many does each friend get?`,
  rep2_s: (n, k, r) => `${k} times what number makes ${n}? Say the ${k}s table: ${Array.from({ length: r }, (_, i) => `${k} × ${i + 1} = ${k * (i + 1)}`).join(", ")}. Each friend gets <b>${r}</b>. (You can also hand them out one at a time to each friend, round after round: ${r} rounds.)`,
  rep3_q: (n, obj, k, fem) => `We share ${n} ${obj} equally among ${k} friends. How many does each friend get? How many are left over?`,
  rep3_f: ["Each friend", "Left over"],
  rep3_s: (n, k, e, r) => `Say the ${k}s table without going past ${n}: …, ${k} × ${e} = ${k * e}, and ${k} × ${e + 1} = ${k * (e + 1)} is already too much. Each friend gets <b>${e}</b>, and ${n} − ${k * e} = <b>${r}</b> ${r === 1 ? "is" : "are"} left over.`,
  grp_q: (n, obj, g, fem) => `We have ${n} ${obj} and put them in bags of ${g}. How many bags do we fill?`,
  grp_s: (n, g, k) => `Count by ${g}s up to ${n}: ${Array.from({ length: k }, (_, i) => g * (i + 1)).join(", ")}. That is <b>${k}</b> bags, because ${k} × ${g} = ${n}.`,
  fr_pl: ["halves", "thirds", "fourths"],
  fr_igual: "They are the same size",
  friq_q: w => `Is this bar divided into <b>${w}</b>?`,
  friq_s: (ok, d, w) => ok ? `It has ${d} parts, and they are all the same size: <b>yes</b>, they are ${w}.` : `It has ${d} parts, but they are not the same size (one is bigger): they are <b>not</b> ${w}.`,
  frcmp_q: (a, b) => `Two pizzas are the same size: one is cut into ${a} equal slices and the other into ${b}. Which slice is bigger?`,
  frcmp_s: (big, small) => `With fewer parts, each part is bigger: <b>${big.toLowerCase()}</b> is bigger than ${small.toLowerCase()}.`,
  fr_q: "What part of the shape is shaded?",
  fr_o: ["One-half", "One-third", "One-fourth"],
  fr_s: (d, w) => `The shape is divided into ${d} equal parts, and 1 is shaded: <b>${w.toLowerCase()}</b>.`,
  frc_w: ["half", "one-third", "one-fourth"],
  frc_q: (w, n) => `What is <b>${w}</b> of ${n}?`,
  frc_s: (n, d, r) => `Split ${n} into ${d} equal parts: each part has <b>${r}</b>, because ${d} × ${r} = ${n}. So ${S.frc_w[d - 2]} of ${n} is ${r}.`,
  regla_q: st => st ? "How many centimeters long is the strip? (Careful: it doesn't start at 0!)" : "How many centimeters long is the strip?",
  regla_s: (a, b, r) => a ? `It starts at ${a} and ends at ${b}: ${b} − ${a} = <b>${r} cm</b>.` : `It starts at 0 and ends at ${b}: it is <b>${r} cm</b> long.`,
  mcm_q: m => `How many centimeters are in <b>${m} m</b>?`,
  mcm_s: (m, r) => `1 meter = 100 centimeters, so ${m} m = <b>${r} cm</b>.`,
  mcm2_q: (m, c) => `How many centimeters are in <b>${m} m and ${c} cm</b>?`,
  mcm2_s: (m, c, r) => `${m} m = ${m * 100} cm, and ${m * 100} + ${c} = <b>${r} cm</b>.`,
  medir_cosas: [["the height of a door", 0], ["the length of a swimming pool", 0], ["how tall a tree is", 0], ["the weight of a watermelon", 1], ["the weight of a dog", 1], ["how much a bag of potatoes weighs", 1], ["the water in a bathtub", 2], ["the milk in a bottle", 2], ["the juice in a pitcher", 2]],
  unid_q: w => `What unit would you use to measure ${w}?`,
  unid_o: ["Meters", "Kilograms", "Liters"],
  unid_s: (w, u, k) => [`It is a length (how long or tall something is): it is measured in <b>meters</b>.`, `It is a weight (how heavy something is): it is measured in <b>kilograms</b>.`, `It is a capacity (how much liquid something holds): it is measured in <b>liters</b>.`][k],
  pesos: [["potatoes"], ["oranges"], ["apples"], ["rice"]],
  kg_q: (a, b, o) => `A bag of ${o} weighs ${a} kg and another bag weighs ${b} kg. How many kilograms do the two bags weigh together?`,
  kg_s: (a, b, r) => `${a} kg + ${b} kg = <b>${r} kg</b>.`,
  medios_q: n => `How many half-liter bottles does it take to fill ${artNum(n)} ${n}-liter jug?`,
  medios_s: (n, r) => `2 half-liter bottles fill 1 liter. For ${n} liters: ${n} × 2 = <b>${r}</b> bottles.`,
  litros_q: (a, b) => `A bucket has ${a} liters of water. You use ${b === 1 ? "1 liter" : `${b} liters`} to water the plants. How many liters are left in the bucket?`,
  litros_s: (a, b, r) => `${a} − ${b} = <b>${r} ${r === 1 ? "liter" : "liters"}</b>.`,
  hr_punto: h => `${h} o'clock`,
  hr_media: h => `Half past ${h}`,
  hr_cuarto: h => `Quarter past ${h}`,
  hr_menos: h => `Quarter to ${h}`,
  reloj_q: "What time does the clock show?",
  // the long hand says "o'clock, quarter past, half past, or quarter to"; the short hand, the hour
  reloj_s: [
    (r, h) => `The long hand is on the 12: o'clock. The short hand is right on the ${h}: <b>${r.toLowerCase()}</b>.`,
    (r, h, nh) => `The long hand is on the 6 (half a turn, 30 minutes): half past. The short hand is between the ${h} and the ${nh}: it has already passed the ${h}. It is <b>${r.toLowerCase()}</b>.`,
    (r, h) => `The long hand is on the 3 (a quarter turn, 15 minutes): quarter past. The short hand is a little past the ${h}: <b>${r.toLowerCase()}</b>.`,
    (r, h, nh) => `The long hand is on the 9 (45 minutes): quarter to. The short hand is almost on the ${nh}: there is a quarter of an hour left until ${nh} o'clock. <b>${r}</b>.`],
  // each number on the clock is 5 minutes for the long hand: the 5s table
  min_q: n => `The long hand is on the <b>${n}</b>. How many minutes past the hour is it?`,
  min_h: "Write only the number of minutes",
  min_s: n => `Each number on the clock is 5 minutes. Count by 5s from the 12 to the ${n}: ${Array.from({ length: n }, (_, i) => 5 * (i + 1)).join(", ")}. It is <b>${5 * n}</b> minutes past the hour: ${n} × 5 = ${5 * n}.`,
  // digital clock: the hours are written with a.m./p.m. (see clk in gen/mat2.js)
  ampm: AMPM,
  adig_q: (AMPM ? "It is daytime. " : "") + "What would a digital clock show at this time?",
  adig_s: (t, h, m, n) => `The long hand is on the ${n}: ${m === 0 ? "o'clock, 0 minutes (a digital clock writes two zeros, 00)" : `${n} × 5 = ${m} minutes`}. The short hand ${m === 0 ? `is right on the ${h}: the hour is ${h}` : m === 45 ? `is almost on the ${h % 12 + 1}, but it hasn't gotten there yet: the hour is still ${h}` : `has already passed the ${h}: the hour is ${h}`}. First the hour, then the colon and the minutes${AMPM ? `. In the daytime, ${h === 12 ? (m === 0 ? "12 o'clock is noon" : `12:${m} is just after noon`) : `${h} o'clock is ${am(h) ? "in the morning" : "in the afternoon"}`}, so write ${am(h) ? "a.m." : "p.m."}` : ""}: <b>${t}</b>${end(t)}`,
  digw_s: (t, h, m, r) => (m === 45 ? `“Quarter to” means it is not ${h % 12 + 1} o'clock yet: the hour is still ${h}, and 45 minutes have passed. ` : "")
    + `First the hour, ${h}; after the colon, the minutes: ${["o'clock is 0 minutes, written with two zeros, 00", "quarter past is 15", "half past is 30", "quarter to is 45"][m / 15]}. ${AMPM ? `It is ${when(h, m)}: ` : "It is written "}<b>${t}</b>${end(t)}`,
  desp_q: (t, d) => `A digital clock shows <b>${t}</b> now. What will it show in ${d === 15 ? "a quarter of an hour" : "half an hour"}?`,
  desp_s: (m0, d, e, t) => `${d === 15 ? "A quarter of an hour is 15 minutes" : "Half an hour is 30 minutes"}. Add the minutes: ${m0} + ${d} = ${e}. The hour does not change: <b>${t}</b>${end(t)}`,
  dig_q: t => `What time is it when a digital clock shows <b>${t}</b>?`,
  dur_q: (w, d) => `A cartoon starts at ${w} and lasts ${d === 15 ? "a quarter of an hour" : "half an hour"}. What time does it end?`,
  dur_s: (w, d, m, e, end) => `${d === 15 ? "A quarter of an hour is 15 minutes: the long hand moves a quarter turn" : "Half an hour is 30 minutes: the long hand makes half a turn"}, from the ${[12, 3, 6, 9][m / 15]} to the ${[12, 3, 6, 9][e / 15]}. It ends at <b>${end.toLowerCase()}</b>.`,
  digw_q: w => { const h = hourOf(w); return AMPM ? `It is ${w} ${w === "12 o'clock" ? "noon" : am(h) ? "in the morning" : "in the afternoon"}. How do you write this time on a digital clock?` : `How do you write “<b>${w}</b>” on a digital clock?`; },
  dig_s: (t, h, m, r) => `On a digital clock, the hour comes first and, after the colon, the minutes that have passed. In ${t}, the hour is ${h} and the minutes are ${m === 0 ? "00" : m}. `
    + [`0 minutes: o'clock.`, `15 minutes is a quarter of an hour: quarter past.`, `30 minutes is half an hour: half past.`, `45 minutes: there is a quarter of an hour left until ${h % 12 + 1} o'clock, quarter to.`][m / 15] + ` It is <b>${r.toLowerCase()}</b>${AMPM ? `${h === 12 && m === 0 ? ", " : " "}${when(h, m)}` : ""}.`,
  cmm_q: n => `How many meters and centimeters are in <b>${n} cm</b>?`,
  cmm_s: (n, m, c) => `Every 100 cm is 1 meter. ${n} = ${m * 100} + ${c}: ${m * 100} cm is ${m} m, and ${c} cm are left. That is <b>${m} m and ${c} cm</b>.`,
  cal_tit: (M, y) => `${M} ${y}`,
  // the calendar page starts on Sunday, as in the US; weekend columns (in red): Sunday and Saturday
  CA: { inicio: 0, finde: [0, 6] },
  cal_l: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  cal_pl: ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"],
  calw_q: (d, M) => `Look at the ${M} page. What day of the week is <b>${M} ${d}</b>?`,
  calw_s: (d, l, w) => `Find ${d} on the page and go up its column to the name at the top: it's ${l}. The ${H().ord(d)} is a <b>${w}</b>.`,
  cal7_q: (w, d, M) => `Today is ${w}, ${M} ${d}. What date in ${M} is the next ${w}?`,
  cal7_s: (d, w) => `One week later, it is ${w} again: 7 more days. ${d} + 7 = <b>${d + 7}</b>. On the page, it is right below the ${d}, in the same column.`,
  caln_q: w => `Look at the month page. How many <b>${w}</b> are there in this month?`,
  caln_s: (w, ds) => `Find the column for ${w} and count its numbers: ${ds.join(", ")}. There are <b>${ds.length}</b>.`,
  calf_q: (d1, M, d2) => `Today is ${M} ${d1}. How many days are there until ${M} ${d2}?`,
  calf_s: (d1, d2) => `Count on the calendar from ${d1 + 1} to ${d2}: ${Array.from({ length: d2 - d1 }, (_, i) => d1 + 1 + i).join(", ")}. There are <b>${d2 - d1}</b> days to go. (Or: ${d2} − ${d1} = ${d2 - d1}.)`,
  din_q: "How much money is there? Write the dollars and the cents.",
  eur_f: "dollars",   // label of the dollars box
  cent: "cents",
  din_s: (e, c) => `First add up the bills (${pl(e, "dollar", "dollars")}) and then the coins (${c} cents): <b>${pl(e, "dollar", "dollars")} and ${c} cents</b>.`,
  // [thing, lowest and highest price in cents]
  tienda: [["A piece of gum", 10, 30], ["A piece of candy", 10, 25], ["A lollipop", 30, 60], ["A pencil", 40, 90], ["An eraser", 30, 80],
    ["A pack of trading cards", 50, 100], ["A small juice box", 60, 120], ["An ice cream cone", 120, 190], ["A small notebook", 110, 190], ["An apple", 60, 120]],
  // amounts as in the Grade 2 lesson: "70 cents", "1 dollar and 20 cents", "$1" (no decimal point yet)
  precio: p => p < 100 ? `${p} cents` : p % 100 ? `${pl(Math.floor(p / 100), "dollar", "dollars")} and ${p % 100} cents` : `$${p / 100}`,
  // e: you pay with one or two $1 bills (the same amounts as the 1 € and 2 € coins of the Spanish course)
  cambio_q: (t, p, e) => `${t} costs ${S.precio(p)}, and you pay with ${e === 1 ? "a $1 bill" : "two $1 bills"}. How many cents do you get back in change?`,
  cambio2_q: (t, p, e) => `${t} costs ${S.precio(p)}, and you pay with ${e === 1 ? "a $1 bill" : "two $1 bills"}. How much change do you get back? Write the dollars and the cents.`,
  cambio_s: (pay, p, r) => `$${pay / 100} = ${pay} cents${p >= 100 ? `, and ${S.precio(p)} = ${p} cents` : ""}. ${pay} − ${p} = ${r} cents`
    + (r === 100 ? `, that is, <b>$1</b>.` : r >= 100 ? `, that is, <b>${S.precio(r)}</b> (100 cents = $1).` : `: you get back <b>${r} cents</b>.`),
  lin_q: "What kind of line is it?",
  lin_o: ["Straight", "Curved", "Broken", "Mixed"],
  lin_s: ["It never bends: it is a <b>straight</b> line.", "It bends smoothly, with no corners: it is a <b>curved</b> line.", "It is made of straight pieces joined together: it is a <b>broken</b> line.", "It has a straight part and a curved part: it is a <b>mixed</b> line."],
  lados_q: "How many sides does this polygon have?",
  lados_s: n => `Count the sides one by one, without counting any twice: ${Array.from({ length: n }, (_, i) => i + 1).join(", ")}. It has <b>${n}</b>.`,
  abce_q: "Is it an open line or a closed line?",
  abce_o: ["Open", "Closed"],
  abce_s: ["It has a gap: it doesn't end where it starts. It is <b>open</b>.", "If you trace it with your finger, you end at the same point where you started: it is <b>closed</b>."],
  pol_q: "What is the name of this polygon?",
  pol_o: ["Triangle", "Quadrilateral", "Pentagon", "Hexagon", "Heptagon", "Octagon"],
  pol_s: (n, w) => `Count the sides: ${Array.from({ length: n }, (_, i) => i + 1).join(", ")}. It has ${n}: it is ${/^[aeiou]/i.test(w) ? "an" : "a"} <b>${w.toLowerCase()}</b>.`,
  sim_q: "If you fold the paper along the red line, do the two halves match? (Is the drawing symmetrical?)",
  sim_o: ["Yes", "No"],
  sim_s: ["If you fold the paper along the red line, the two sides match: the drawing <b>is</b> symmetrical.", "If you fold along the red line, at least one square does not match its partner: the drawing is <b>not</b> symmetrical."],
  cats: ["soccer", "dance", "swimming", "tennis", "cycling"],   // short names: the labels of SVG.bars are 56 px wide
  bar_q: c => `The bar graph shows the favorite sports of the students in a class. How many students chose <b>${c}</b>?`,
  bar_s: (c, n) => `The ${c} bar goes up to <b>${n}</b>.`,
  barmas_q: "The bar graph shows the favorite sports of the students in a class. Which sport did the <b>most</b> students choose?",
  barmenos_q: "The bar graph shows the favorite sports of the students in a class. Which sport did the <b>fewest</b> students choose?",
  barmas_s: (c, big) => `The ${big ? "tallest" : "shortest"} bar is the one for <b>${c}</b>.`,
  bartot_q: "The bar graph shows the favorite sports of the students in a class. How many students are there in all?",
  bartot_s: (sum, r) => `Add the numbers of all the bars: ${sum} = <b>${r}</b>.`,
  bardif_q: (a, b) => `The bar graph shows the favorite sports of the students in a class. How many more students chose <b>${a}</b> than <b>${b}</b>?`,
  bardif_s: (a, va, b, vb) => `The ${a} bar goes up to ${va}, and the ${b} bar goes up to ${vb}. Compare by subtracting: ${va} − ${vb} = <b>${va - vb}</b> more.`,
  azar_mucho: (m, o, many) => many ? `There are lots of ${m} balls, but there is also one ${o} ball that you could pick: it is <b>possible</b>, not certain.` : `There is only one ${o} ball, but it is in the bag and you could pick it: it is <b>possible</b>, but you are more likely to pick a ${m} one.`,
  colores: ["red", "blue", "green", "yellow", "orange", "purple"],
  pal_q: "How many votes do these tally marks show?",
  // 5–9 marks: the Spanish solution stops after the group of 5 (see traduccion/errores_originales.md); here it gives the total
  pal_s: n => n < 5 ? `Count the tally marks one by one: <b>${n}</b>.` : n < 10 ? `There is one crossed-out group, which is 5.` + (n % 5 ? ` Then ${n % 5} single ${n % 5 === 1 ? "mark" : "marks"}: 5 + ${n % 5} = <b>${n}</b>.` : ` There are no single marks: <b>${n}</b>.`) : `Each crossed-out group is 5: ${Array.from({ length: Math.floor(n / 5) }, (_, i) => 5 * (i + 1)).join(", ")}.` + (n % 5 ? ` Then ${n % 5} single ${n % 5 === 1 ? "mark" : "marks"}: ${5 * Math.floor(n / 5)} + ${n % 5} = <b>${n}</b>.` : ` There are no single marks: <b>${n}</b>.`),
  paltot_q: "This is how a class voted for its favorite color. How many children voted in all?",
  paltot_s: (rows, sum, r) => `First turn the tally marks into numbers (by 5s and then the single marks): ${rows}. Then add: ${sum} = <b>${r}</b>.`,
  paluno_q: c => `This is how a class voted for its favorite color. How many votes does <b>${c}</b> have?`,
  paldif_q: (a, b) => `This is how a class voted for its favorite color. How many more votes does <b>${a}</b> have than <b>${b}</b>?`,
  paldif_s: (a, na, b, nb) => `Count the tally marks by 5s: ${a} has ${na} and ${b} has ${nb}. Compare by subtracting: ${na} − ${nb} = <b>${na - nb}</b> more.`,
  bolas: ["red", "blue", "green", "yellow"],
  azar_q: c => `Without looking, you pick a ball from the bag. Picking a <b>${c}</b> ball is…`,
  azar_o: ["Certain", "Possible", "Impossible"],
  azar_s: [c => `All the balls are ${c}: it is <b>certain</b>.`, c => `There are ${c} balls and balls of other colors: you might pick one, or you might not. It is <b>possible</b>.`, c => `There are no ${c} balls in the bag: it is <b>impossible</b>.`],
});
// m2.mental and m2.tablas (added for Grade 3)
Object.assign(S, {
  ment_s: [
    (a, t, r) => `Adding whole tens is quick: only the tens change. Count by tens from ${a}: ${Array.from({ length: t / 10 }, (_, i) => a + 10 * (i + 1)).join(", ")}. ${a} + ${t} = <b>${r}</b>.`,
    (a, b, c, r) => `Adding ${b} is almost like adding ${c}: add ${c} and take away 1, because you added one too many. ${a} + ${c} = ${a + c}, and ${a + c} − 1 = <b>${r}</b>.`,
    (a, b, r) => { const t = Math.round(b / 10) * 10, d = t - b; return d > 0
      ? `Subtracting ${b} is almost like subtracting ${t}: subtract ${t} and add ${d} back, because you took away one too many. ${a} − ${t} = ${a - t}, and ${a - t} + ${d} = <b>${r}</b>.`
      : `Subtracting ${b} is the same as subtracting ${t} and then ${-d} more. ${a} − ${t} = ${a - t}, and ${a - t} − ${-d} = <b>${r}</b>.`; },
    (x, y) => `Look at the tens: ${x / 10} + ${y / 10} = 10. So ${x} and ${y} are a pair that makes 100: they add up to <b>100</b>.`],
  ment_partir: (dx, dy, ux, uy, r) => `Break the numbers into tens and ones. Tens: ${dx} + ${dy} = ${dx + dy}. Ones: ${ux} + ${uy} = ${ux + uy}. Together: ${dx + dy} + ${ux + uy} = <b>${r}</b>.`,
  hueco_q: e => `What number goes in the box? <b>${e}</b>`,
  mult_q: e => `What is <b>${e}</b>?`,
  // "a × b" means "a groups of b". The solution uses the times-table trick (t) that the lesson teaches, in the order asked
  mult_s: (a, b, r, t) => {
    const head = `${a} × ${b} = <b>${r}</b>. `;
    if (a === 0 || b === 0) return head + "(Any number times 0 is 0.)";
    if (a === 1 || b === 1) return head + "(Multiplying by 1 leaves the number the same.)";
    if (t === undefined || (a !== t && b !== t)) t = b;
    let m = b === t ? a : b, second = b === t;   // second: the table is the second number (a × 6: "a groups of 6")
    if (t >= 6 && t !== 10 && (m === 2 || m === 10)) { [t, m] = [m, t]; second = !second; }   // 6 × 2, 10 × 7…: easier with the easy table
    const x = second ? `${m} × ` : "", y = second ? "" : ` × ${m}`, P = k => `${x}${k}${y}`;   // P(5) → "4 × 5" or "5 × 4", in the order asked
    const sum = (n, v) => Array(n).fill(v).join(" + ");
    let w;
    if (t === 2) w = `It is double ${m}: ${m} + ${m} = ${r}.`;
    else if (t === 10) w = second ? `${m} tens are ${r}.` : `The order does not matter: it is like ${m} × 10, ${m} tens, ${r}.`;
    else if (t === 3 || t === 5) w = second ? `Count by ${t}s, ${m} times: ${Array.from({ length: m }, (_, i) => t * (i + 1)).join(", ")}.` : `${t} groups of ${m}: ${sum(t, m)} = ${r}.`;
    else if (t === 4) w = `${P(2)} = ${2 * m}, and double it: ${2 * m} + ${2 * m} = ${r}.`;
    else if (t === 8) w = `${P(4)} = ${4 * m}, and double it: ${4 * m} + ${4 * m} = ${r}.`;
    else if (t === 6) w = `${P(5)} = ${5 * m}, and ${second ? "one more in each group" : `one more ${m}`}: ${5 * m} + ${m} = ${r}.`;
    else if (t === 9) w = `${P(10)} = ${10 * m}, and ${second ? "one less in each group" : `take away one ${m}`}: ${10 * m} − ${m} = ${r}.`;
    else if (t === 7) w = `${P(5)} = ${5 * m} and ${P(2)} = ${2 * m}; ${5 * m} + ${2 * m} = ${r}.`;
    else w = `It is the same as adding ${b}, ${a} times: ${sum(a, b)}.`;
    return head + w;
  },
  multh_s: (t, m, r) => m === 0 ? `${t} × <b>0</b> = 0: any number times 0 is 0.` : `Skip-count by ${t}s until you get to ${r}: ${Array.from({ length: m }, (_, i) => t * (i + 1)).join(", ")}. That is ${m} ${m === 1 ? "jump" : "jumps"}: ${t} × <b>${m}</b> = ${r}.`,
  // [thing, container (plural), (unused), container (singular)]
  paquetes: [["trading cards", "packs", 0, "pack"], ["pencils", "boxes", 1, "box"], ["cookies", "packs", 0, "pack"], ["marbles", "bags", 1, "bag"], ["strawberries", "baskets", 1, "basket"], ["eggs", "cartons", 1, "carton"]],
  pm_q: (m, [obj, cont, , one], t) => (m === 1 ? `There is 1 ${one} with ${t} ${obj}.` : `There are ${m} ${cont} with ${t} ${obj} in each one.`) + ` How many ${obj} are there in all?`,
});
// ═════ Texts of the new generators of the improvement round ═════
const heshe = f => f ? "she" : "he", himher = f => f ? "her" : "him";
// m2.dospasos: names in the word problems (nombres.json)
S.dp_nombres = ["Lucy", "Henry", "Sarah", "Leo", "Nora", "Matt", "Abby", "Omar", "Iris", "Ben", "Aisha", "Isaac", "Mei", "Danny"];
// m2.dospasos, "shopping": [thing, lowest and highest price in dollars]
S.compras = [["a storybook", 6, 12], ["a ball", 8, 15], ["a puzzle", 5, 12], ["a T-shirt", 8, 16], ["a pencil case", 4, 9], ["a board game", 7, 14], ["a kite", 9, 18], ["a pack of markers", 3, 8]];
S.dp_compra_q = (N, c1, a, c2, b, p) => `${N} buys ${c1} for $${a} and ${c2} for $${b}, and pays with a $${p} bill. How many dollars does ${N} get back?`;
S.dp_compra_s = (a, b, p) => `First, find the total cost: $${a} + $${b} = $${a + b}. Then, the change: $${p} − $${a + b} = <b>$${p - a - b}</b>.`;
// m2.prob
S.PB = {
  nombres: [["Lucy", 1], ["Henry", 0], ["Sarah", 1], ["Leo", 0], ["Nora", 1], ["Matt", 0], ["Abby", 1], ["Omar", 0], ["Iris", 1], ["Ben", 0], ["Aisha", 1], ["Isaac", 0]],
  objs: [["trading cards", 0, 600], ["stickers", 1, 400], ["marbles", 1, 300], ["points", 0, 950]],   // [thing, (unused), highest believable number]
  q: [
    (N, fN, M, fM, a, b, o, fo) => `${N} has ${a} ${o}, and ${M} has ${b}. How many ${o} do they have in all?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} has ${a} ${o} and gives ${b} to ${M}. How many does ${heshe(fN)} have left?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} has ${a} ${o}, and ${M} has ${b}. How many more ${o} does ${N} have than ${M}?`,
    // the container goes with the thing (in Spanish, always "un álbum", also for marbles: see errores_originales.md)
    (N, fN, M, fM, a, b, o, fo) => `${o === "marbles" ? "A marble case" : o === "stickers" ? "A sticker book" : "An album"} has ${a} spaces for ${o}. ${N} has already put in ${b}. How many more does ${heshe(fN)} need to fill it?`,
    (N, fN, M, fM, a, b, o, fo) => `${N} has ${a} ${o}, and ${M} has ${b} more than ${himher(fN)}. How many ${o} does ${M} have?`],
  s: [
    (a, b, r, o) => `Plan: you are putting them together, so add. Solve: ${a} + ${b} = ${r}. They have <b>${r}</b> ${o} in all.`,
    (a, b, r, o) => `Plan: giving some away leaves fewer, so subtract. Solve: ${a} − ${b} = ${r}. Check: ${r} + ${b} = ${a}. There are <b>${r}</b> left.`,
    (a, b, r, o) => `Plan: you are comparing, so subtract the smaller number from the bigger one. Solve: ${a} − ${b} = ${r}. Check: ${r} + ${b} = ${a}. That is <b>${r}</b> more.`,
    (a, b, r, o) => `Plan: “How many more are needed?” means subtract. Solve: ${a} − ${b} = ${r}. Check: ${b} + ${r} = ${a}. So <b>${r}</b> more are needed.`,
    (a, b, r, o, M) => `Plan: ${M} has more, so add (you are looking for the bigger number). Solve: ${a} + ${b} = ${r}. ${M} has <b>${r}</b> ${o}.`],
};
// m2.cuerpo (in the order of SOLIDS in gen/mat2.js)
S.cue_o = ["Cube", "Prism", "Pyramid", "Cylinder", "Cone", "Sphere"];
S.cue_why = ["it has 6 square faces, all the same", "it is like a box, with two matching bases and rectangular faces on the sides", "it has one base and triangle-shaped faces that meet at a point",
  "it has two round bases and a curved part", "it has one round base and ends in a point", "it is round all over"];
S.cue_q = "What three-dimensional shape is this?";
S.cue_s = (w, why) => `It is a <b>${w}</b>: ${why}.`;
S.cue_cosas = [["a number cube", 0], ["an ice cube", 0], ["a brick", 1], ["a juice box", 1], ["a cereal box", 1], ["a pyramid in Egypt", 2], ["a can of tomatoes", 3], ["a glue stick", 3], ["an ice cream cone", 4], ["an upside-down funnel", 4], ["a ball", 5], ["a marble", 5], ["an orange", 5]];
S.cuecosa_q = w => `What shape is ${w}?`;
S.cuecosa_s = (w, c, why) => `${w} is shaped like a <b>${c}</b>: ${why}.`;
S.rueda_q = "Can this shape roll?";
S.rueda_s = (w, rolls, k) => rolls ? `The ${w} has a curved part: <b>yes</b>, it can roll${k === 5 ? "" : " (if you lay it on its side)"}.` : `The ${w} only has flat faces: it does <b>not</b> roll; it slides or stays still.`;
// m2.simpareja
S.izq = "to the left"; S.der = "to the right";
S.sp_q = "The blue square has a reflection on the other side of the red line (the line of symmetry). Where does its reflection go?";
S.sp_o = (n, side) => `${n} ${n === 1 ? "square" : "squares"} ${side} of the line`;
S.sp_s = (d, from, to) => `Count the squares from the line: the blue square is ${d} ${d === 1 ? "square" : "squares"} ${from}. Its reflection is the same number of squares away, but on the other side: <b>${d} ${d === 1 ? "square" : "squares"} ${to} of the line</b>.`;
// m2.camino
S.cam_h = (n, right) => `${n} ${n === 1 ? "square" : "squares"} to the ${right ? "right" : "left"}`;
S.cam_v = (n, up) => `${n} ${up ? "up" : "down"}`;
S.cam_o = (h, v) => `${cap(h)} and ${v}`;
S.cam_q = "The green robot (R) wants to get to the star. Which path does it have to follow?";
S.cam_s = (h, v) => `From the robot, count the squares to the star's column, without counting the starting square: ${h}. Then count to its row: ${v}. The path is <b>${h} and ${v}</b>.`;
S.camn_q = "The green robot (R) goes to the star: first sideways and then up or down. How many squares does it move in all?";
S.camn_s = (h, v, a, b) => `Without counting the starting square: ${h} and ${v}. In all, ${a} + ${b} = <b>${a + b}</b> squares.`;
S.camlet_q = (h, v) => `The green robot (R) goes ${h} and then ${v}. Which letter does it get to?`;
S.camlet_s = (h, v, l) => `From the robot, without counting its square: ${h}, and then ${v}. It gets to <b>${l}</b>.`;
// ═════ Ordinals from 1st to 10th and estimating measurements (texts of the added generators) ═════
// m2.ordinal (ordinals have no gender in English: ordF = ordM and both abbreviations are the same, 3rd)
const ORD = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
S.OD = {
  ordM: ORD,
  ordF: ORD.slice(),
  fig: [["circle", 0], ["square", 0], ["triangle", 0], ["star", 1], ["heart", 0], ["rectangle", 0]],
  col: [["red", "red"], ["blue", "blue"], ["green", "green"], ["yellow", "yellow"], ["purple", "purple"]],
  nom: (fig, col) => `the ${col} ${fig}`,   // "the red circle"
  delante: "slide",
  cola_q: (x, back) => `The shapes are lined up to go down the slide. What place is <b>${x}</b> in, counting from the <b>${back ? "back" : "front"}</b>?`,
  cola_s: (x, before, pos, w, back, f) => `${before === 0 ? "There are no shapes" : before === 1 ? "There is 1 shape" : `There are ${before} shapes`} ${back ? "behind" : "in front of"} ${x}, so, counting from the ${back ? "back" : "front"}, it is in place ${pos}: it is <b>${w}</b>.`,
  lee_q: a => `How do you read <b>${a}</b>?`,
  lee_s: (a, n, f, w) => `${a} is place ${n}. The letters after the number are the end of the word: <b>${w}</b>.`,
  esc_q: w => `How do you write the ordinal “<b>${w}</b>” with a number?`,
  esc_s: (w, n, f, a) => `${cap(w)} is place ${n}. Write the number and the last two letters of the word: <b>${a}</b>.`,
  nombres: [["Paul", 0], ["Anna", 1], ["Lucy", 1], ["Henry", 0], ["Sarah", 1], ["Leo", 0], ["Nora", 1], ["Isaac", 0]],
  delante_q: (x, f, a) => `In the lunch line, ${x} is ${a}. How many children are in front of ${himher(f)}?`,
  delante_s: (p, f) => p === 2 ? `Only the 1st child is in front of ${himher(f)}: <b>1</b> child.` : p === 3 ? `The 1st and 2nd children are in front of ${himher(f)}: <b>2</b> children.` : `The children in 1st through ${H().ord(p - 1)} place are in front of ${himher(f)}: <b>${p - 1}</b> children.`,
  detras_q: (x, f, N, a) => `There are ${N} children in the line, and ${x} is ${a} counting from the front. How many children are behind ${himher(f)}?`,
  detras_s: (N, p, f) => `There are ${N} children in the line. ${cap(heshe(f))} and ${p - 1 === 1 ? `the child in front of ${himher(f)}` : `the ${p - 1} children in front of ${himher(f)}`} make ${p}. Behind ${himher(f)} there are ${N} − ${p} = <b>${N - p}</b>.`,
  desde_q: (x, f, N, a) => `There are ${N} children in the line, and ${x} is ${a} counting from the front. What place is ${heshe(f)} in, counting from the back?`,
  desde_s: (x, N, p, back, w) => `Behind ${x} there ${N - p === 1 ? "is" : "are"} ${N} − ${p} = ${N - p} ${N - p === 1 ? "child" : "children"}. Counting from the back, ${x} comes right after ${N - p === 1 ? "that child" : "them"}: place ${back}, <b>${w}</b>.`,
  dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],   // the week starts on Sunday (also on the calendar page)
  dia_q: w => `Starting with Sunday, what is the <b>${w}</b> day of the week?`,
  dia_s: (list, d, w) => `Count from Sunday: ${list}. The ${w} day is <b>${d}</b>.`,
  meses: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  mes_q: w => `What is the <b>${w}</b> month of the year?`,
  mesl_q: m => `Counting from January, which month of the year is <b>${m}</b>?`,
  mes_s: (list, m, w) => `Count from January: ${list}. ${m} is the <b>${w}</b> month of the year.`,
  ult_q: N => `In a race, ${N} runners cross the finish line. What place does the last runner finish in?`,
  ult_s: (N, w) => `If there are ${N} runners, the last one finishes in place ${N}: <b>${w}</b>.`,
  desp_q: w => `Which ordinal comes right <b>after</b> “${w}”?`,
  ant_q: w => `Which ordinal comes right <b>before</b> “${w}”?`,
  sig_s: (w, a, r, ar, after) => `${cap(w)} is ${a}; ${after ? "after" : "before"} it comes ${ar}: <b>${r}</b>.`,
};

// m2.medirojo
S.MO = {
  nombres: [["Sarah", 1], ["Leo", 0], ["Anna", 1], ["Henry", 0], ["Nora", 1], ["Omar", 0]],
  // [place, meters (lowest, highest)]
  sitios: [["the bedroom", 3, 5], ["the hallway", 4, 9], ["the kitchen", 3, 5], ["the living room", 4, 7], ["the classroom", 6, 9]],
  pasos_q: (x, w, n) => `${x} walks across ${w} in ${n} paces. If 2 paces are about 1 meter, about how many meters long is ${w}?`,
  pasos_s: (n, m, w) => `${n} paces make ${m} pairs of paces, and each pair is about 1 meter: ${w} is about <b>${m}</b> meters long.`,
  // [thing, hand spans (lowest, highest)]
  palmos: [["a notebook", 2, 2], ["a cushion", 2, 3], ["a table", 4, 6], ["a bookshelf", 4, 6], ["a small rug", 5, 6], ["the window", 4, 6]],
  palmo_q: (w, n) => `Your hand span is about 15 cm. ${cap(w)} is ${n} hand spans long. About how many centimeters long is it?`,
  palmo_s: (n, w) => `Add 15 cm for each hand span: ${Array(n).fill(15).join(" + ")} = ${15 * n}. ${cap(w.replace(/^an? /, "the "))} is about <b>${15 * n}</b> cm long.`,
  vasos_q: l => `A glass of water is about a quarter of a liter. About how many glasses does it take to fill ${l === 1 ? "a 1-liter bottle" : `${l} bottles (1 liter each)`}?`,
  vasos_s: l => `A liter has four quarters: each bottle fills about 4 glasses.${l > 1 ? ` ${Array(l).fill(4).join(" + ")} = ${4 * l}.` : ""} You need about <b>${4 * l}</b> glasses.`,
  litros_q: v => `A glass of water is about a quarter of a liter. A pitcher fills ${v} glasses. About how many liters does the pitcher hold?`,
  litros_s: v => `Every 4 glasses are about 1 liter, and ${v} glasses are ${v / 4} ${v / 4 === 1 ? "group" : "groups"} of 4: ${v / 4 === 1 ? "about <b>1</b> liter" : `about <b>${v / 4}</b> liters`}.`,
  bank_q: [w => `About how tall is ${w}?`, w => `About how long is ${w}?`, w => `About how much does ${w} weigh?`, w => `About how much water does ${w} hold?`],
  // [what, 0 tall · 1 long · 2 weight · 3 capacity, options (the right one first), explanation]
  bank: [
    ["the door of your classroom", 0, ["About 2 meters", "About 20 centimeters", "About 20 meters"], "A grown-up can walk through the door without bending down: the door is a little taller than a grown-up, <b>about 2 meters</b>."],
    ["your bed", 1, ["About 2 meters", "About 20 centimeters", "About 20 meters"], "A grown-up can lie down on your bed: it is <b>about 2 meters</b> long, about 4 paces."],
    ["a new pencil", 1, ["About 15 centimeters", "About 15 meters", "About 2 centimeters"], "A new pencil is about as long as your hand span: <b>about 15 centimeters</b>."],
    ["a bus", 1, ["About 12 meters", "About 12 centimeters", "About 120 meters"], "To walk from one end of a bus to the other, you take about 24 paces, 12 pairs: <b>about 12 meters</b>."],
    ["your school desk", 1, ["About 60 centimeters", "About 6 centimeters", "About 6 meters"], "It is about 4 hand spans: 15 + 15 + 15 + 15 = 60, <b>about 60 centimeters</b>."],
    ["a textbook", 1, ["About 30 centimeters", "About 3 centimeters", "About 3 meters"], "It is about 2 hand spans: 15 + 15 = 30, <b>about 30 centimeters</b>."],
    ["the board in your classroom", 1, ["About 3 meters", "About 30 centimeters", "About 30 meters"], "You can walk along it in about 6 paces, 3 pairs: <b>about 3 meters</b>."],
    ["a cat", 2, ["About 4 kg", "About 40 kg", "About 400 kg"], "A cat weighs about as much as a few 1-kg bags of rice: <b>about 4 kg</b>. 40 kg is what an older child weighs."],
    ["a big watermelon", 2, ["About 5 kg", "About 50 kg", "About 500 kg"], "It weighs as much as 5 bags of rice: <b>about 5 kg</b>. A grown-up can weigh 50 kg!"],
    ["your school backpack", 2, ["About 3 kg", "About 30 kg", "About 300 kg"], "It weighs as much as 3 bags of rice (1 kg each): <b>about 3 kg</b>. With 30 kg, you couldn't even lift it!"],
    ["a second grader", 2, ["About 25 kg", "About 2 kg", "About 250 kg"], "A 7- or 8-year-old child weighs as much as 25 bags of rice: <b>about 25 kg</b>. 2 kg is less than a newborn baby weighs."],
    ["a grown-up", 2, ["About 70 kg", "About 7 kg", "About 700 kg"], "A grown-up weighs <b>about 70 kg</b>. A big cat weighs 7 kg, and a horse, 700 kg!"],
    ["a mop bucket", 3, ["About 6 liters", "About 60 liters", "About 600 liters"], "If you imagine 1-liter bottles inside the bucket, about 6 fit: <b>about 6 liters</b>."],
    ["a sand pail", 3, ["About 2 liters", "About 20 liters", "About 200 liters"], "About 2 big bottles of water fit: <b>about 2 liters</b>. 200 liters wouldn't even fit in a small bathtub!"],
    ["a big water jug", 3, ["About 5 liters", "About 50 liters", "About 500 liters"], "A big water jug holds as much as 5 big bottles of water: <b>about 5 liters</b>."],
    ["a bathtub", 3, ["About 200 liters", "About 2 liters", "About 20 liters"], "A bathtub holds lots and lots of bottles of water: <b>about 200 liters</b>. 2 liters is just 2 bottles."],
  ],
  pesados: ["the backpack", "the grocery bag", "the toy box", "the fruit basket"],
  kg_q: (x, a, y, b) => `Each bag of rice weighs 1 kg. ${cap(x)} weighs as much as ${a === 1 ? "1 bag" : `${a} bags`}, and ${y} weighs as much as ${b === 1 ? "1 bag" : `${b} bags`}. About how many kilograms do the two weigh together?`,
  kg_s: (a, b) => `Each bag of rice weighs 1 kg: ${a} + ${b} = ${a + b}. Together they weigh about <b>${a + b}</b> kg.`,
  cubos: ["a mop bucket", "a big pot", "a big watering can"],
  bot_q: (w, n, u) => `${cap(w)} holds about ${n} bottles of water (1 liter each). You have already poured in ${u === 1 ? "1 bottle" : `${u} bottles`}. About how many more liters will fit?`,
  bot_s: (n, u) => `Each bottle is 1 liter: ${n} liters fit, and ${u === 1 ? "1 is" : `${u} are`} already in it. ${n} − ${u} = <b>${n - u}</b> more ${n - u === 1 ? "liter" : "liters"}.`,
  quien_q: (a, e1, b, e2, w, m, cm) => `${a} says that ${w} is about ${e1} meters long, and ${b} says about ${e2} meters. They measure it with a tape measure: it is ${m} m ${cm} cm long. Who made the better estimate?`,
  quien_s: (m, cm, g, b, who) => `${m} m ${cm} cm is very close to ${g} m and very far from ${b} m: <b>${who}</b> made the better estimate. A good estimate is close to the real measurement.`,
};
// ── end: ═════ Ordinals from 1st to 10th and estimating measurements ═════
})();
