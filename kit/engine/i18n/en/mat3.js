/* WikiAula — texts for gen/mat3.js (Mathematics, Grade 3), in US English.
   Complete since 2026-11-11 (Grade 3 translation); the Grade 5 pilot had translated m3.simetria and m3.circulo.
   Adaptations: dollars and US coins (m3.dinero counts change up to the next quarter, then to the dollar),
   12-hour clock with a.m./p.m. (except the 24-hour clock exercise, kept with its a.m./p.m. pair),
   calendar weeks starting on Sunday and dates written month/day/year, names from nombres.json. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m3 = G.m3 || {};
const N = n => window.WA.H.n(n);
const ord = n => window.WA.H.ord(n);
const t12 = (h, m) => window.WA.H.time(h, m);   // 7:05 p.m.
const words = n => window.WA.I18N.en.words(n);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const end = s => /\.$/.test(s) ? s : s + ".";   // no second period after "p.m."
const pl = (n, one, many) => n === 1 ? one : many;
const NUM = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const DEN = ["", "", "half", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
const COL = ["Ones", "Tens", "Hundreds", "Thousands", "Ten thousands"];
const AB = ["O", "T", "H", "Th", "TTh"];
const hm = (h, m) => `${h}:${String(m).padStart(2, "0")}`;   // a time on the analog clock (no a.m./p.m.) or on the 24-hour clock
const HOURS = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const MINS = { 5: "five", 10: "ten", 15: "quarter", 20: "twenty", 25: "twenty-five", 30: "half", 35: "thirty-five", 40: "forty", 45: "forty-five", 50: "fifty", 55: "fifty-five" };
// Jumps to count time forward: first whole hours, then up to the next o'clock, then what is left
function jumps(h, m, d) {
  const out = [];
  let H = h, M = m, left = d;
  while (left >= 60) { H++; left -= 60; out.push(`Add 1 hour: ${end(t12(H, M))}`); }
  if (left && M + left >= 60 && M) { const a = 60 - M; H++; M = 0; left -= a; out.push(`Add ${a} minutes: ${end(t12(H, M))}`); }
  if (left) { M += left; out.push(`Add ${left === d ? left : `the ${left}`} minutes${left === d ? "" : " that are left"}: ${end(t12(H, M))}`); }
  return out.join(" ");
}
const ctxT = ["A cartoon episode", "Soccer practice", "The movie"];   // 0 short, 1 a while, 2 long
const durT = d => d >= 60 ? `${Math.floor(d / 60)} ${pl(Math.floor(d / 60), "hour", "hours")}${d % 60 ? ` ${d % 60} minutes` : ""}` : `${d} minutes`;
Object.assign(S, {
  // people's names (14, in this order: the generator knows from the position who is a girl: 0, 2, 4, 6, 8, 10, and 12)
  nombres: ["Lucy", "Henry", "Sarah", "Leo", "Nora", "Matt", "Abby", "Omar", "Iris", "Ben", "Aisha", "Isaac", "Mei", "Danny"],
  pos: ["ones", "tens", "hundreds", "thousands", "ten thousands"],
  um_q: n => `How many thousands, hundreds, tens, and ones are in <b>${n}</b>?`,
  um_f: ["Th", "H", "T", "O"],
  um_s: (n, d) => `${n} = ${d[0]} Th + ${d[1]} H + ${d[2]} T + ${d[3]} O = ${N(d[0] * 1000)} + ${d[1] * 100} + ${d[2] * 10} + ${d[3]}.`,
  cuantasd_q: n => `How many <b>tens</b> are in ${n}? (All the tens, not just the digit in the tens place.)`,
  cuantasd_s: (n, a, b, c, r) => `${n} is ${a} ${pl(a, "thousand", "thousands")}, ${b} ${pl(b, "hundred", "hundreds")}, and ${c} ${pl(c, "ten", "tens")}. ${a === 1 ? "1 thousand is" : `${a} thousands are`} ${a * 100} tens, and ${b === 1 ? "1 hundred is" : `${b} hundreds are`} ${b * 10} tens: ${a * 100} + ${b * 10} + ${c} = <b>${r}</b> tens (${r} rods of ten). The tens place only shows the digit ${c}.`,
  cuantasc_q: n => `How many <b>hundreds</b> are in ${n}? (All the hundreds, not just the digit in the hundreds place.)`,
  cuantasc_s: (n, a, b, r) => `${n} is ${a} ${pl(a, "thousand", "thousands")} and ${b} ${pl(b, "hundred", "hundreds")}. ${a === 1 ? "1 thousand is" : `${a} thousands are`} ${a * 10} hundreds: ${a * 10} + ${b} = <b>${r}</b> hundreds (${r} flats of a hundred). The hundreds place only shows the digit ${b}.`,
  desc_q: p => `What number is <b>${p}</b>?`,
  desc_s: (p, n) => `Add them up: ${p} = <b>${n}</b>.`,
  valor_q: (n, d) => `In the number <b>${n}</b>, what is the value of the digit <b>${d}</b>?`,
  valor_s: (d, pos, v) => `The digit ${d} is in the ${pos} place, so its value is <b>${v}</b>.`,
  letras_q: w => `Write in standard form: <b>${w}</b>.`,
  letras2_q: n => `How do you read the number <b>${n}</b>?`,
  letras_s: (w, n) => `<b>${n}</b> is read <b>${w}</b>.`,
  comp_q: (a, b) => `Choose the correct sign: <b>${a} ☐ ${b}</b>`,
  comp_s: (st, a, b, k) => `${st} So <b>${a} ${k ? "&lt;" : "&gt;"} ${b}</b>.`,
  comp_len: (a, la, b, lb) => `${a} has ${la === 5 ? "five" : "four"} digits and ${b} has ${lb === 5 ? "five" : "four"}: the one with more digits is greater.`,
  comp_eq: (p, x) => `${AB[p]}: ${x} and ${x}, the same.`,
  comp_dif: (p, x, y) => `${AB[p]}: ${x} and ${y}, different! ${x} ${x > y ? "&gt;" : "&lt;"} ${y}.`,
  ordenar_q: s => `Order from <b>least to greatest</b>: ${s}`,
  ordenar_s: (s1, s2, s3, r) => `Compare the numbers two at a time, place by place from the left.<br>${s1}<br>${s2}<br>${s3}<br>Order: <b>${r}</b>.`,
  mayor_q: s => `Which number is the <b>greatest</b>? ${s}`,
  menor_q: s => `Which number is the <b>least</b>? ${s}`,
  orden_s: (s, r) => `In order: ${s}. The answer is <b>${r}</b>.`,
  redp: ["the nearest ten", "the nearest hundred", "the nearest thousand"],
  red_q: (n, p) => `Round <b>${n}</b> to ${p}.`,
  // p: the place you round to (1 tens…); nine: the digit in that place is 9 and goes up
  red_s: (p, look, up, nine, r) => {
    const cas = ["ones", "tens", "hundreds", "thousands", "ten thousands"], one = ["", "ten", "hundred", "thousand", "ten thousand"];
    return `You are rounding to the nearest ${one[p]}, so look at the ${cas[p - 1]} digit (the one just to its right): it is ${look}. ` +
      (up ? `Since it is 5 or more, the ${cas[p]} digit goes up by 1${nine ? `. The ${cas[p]} digit was 9: going up makes 10 ${cas[p]}, and 10 ${cas[p]} make 1 more ${one[p + 1]}! That is why the digit to its left changes too` : ""}` : `Since it is less than 5, the ${cas[p]} digit stays the same`) +
      `, and the digits to its right become zeros: <b>${r}</b>.`;
  },
  ord: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
    "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"],
  ord_q: n => `How do you read <b>${ord(n)}</b>?`,
  ord_s: (n, w) => `${ord(n)} is read <b>${w}</b>.`,
  ord2_q: w => `Write the ordinal <b>${w}</b> as a number (just the number, without the letters “st”, “nd”, “rd”, or “th”).`,
  ord2_s: (n, w) => `<b>${cap(w)}</b> is place number ${n}: you write it <b>${ord(n)}</b>.` + (n > 12 && n < 20 ? ` “${cap(w)}” comes from “${words(n)}”, ${n}, with “th” at the end.` : ""),
  fila_q: (N, t, k, fem) => `There are ${t} people in a line. ${N} is ${ord(k)} from the front. What is ${fem ? "her" : "his"} place counting from the back?`,
  fila_s: (t, k, r, fem) => `Behind ${fem ? "her" : "him"} there ${t - k === 1 ? "is" : "are"} ${t} − ${k} = ${t - k} ${pl(t - k, "person", "people")}, so counting from the back, ${fem ? "she" : "he"} is number ${t - k} + 1 = <b>${r}</b>.`,
  op_q: e => `Find <b>${e}</b>.`,
  op_s: (add, r) => `Add in columns, starting with the ones and carrying when a column goes over 9. Answer: <b>${r}</b>.`,
  // column addition: x or y is null if that number has no digit in that column; last: last column (written in full)
  su_col: (p, x, y, carry, s, last) => {
    const col = COL[p];
    const terms = [x, y].filter(v => v !== null).concat(carry ? [1] : []);
    const sum = terms.length > 1 ? `${terms.join(" + ")} = ${s}` : `${s}`;
    if (terms.length === 1 && !carry) return `${col}: there is only a ${s}. Bring it down: <b>${s}</b>.`;
    if (s < 10) return `${col}: ${sum}. Write <b>${s}</b>.`;
    return last ? `${col}: ${sum}. This is the last column, so write <b>${s}</b>.` : `${col}: ${sum}. Write <b>${s % 10}</b> and carry 1.`;
  },
  suma_s: (st, r) => `Add in columns, starting with the ones. If a column adds up to 10 or more, write the ones digit and regroup: carry 1 to the next column on the left.<br>${st.join("<br>")}<br>Answer: <b>${r}</b>.`,
  // column subtraction with US regrouping (the lesson in English): when the top digit is smaller, take 1 from the
  // next place on top (one less there) and add 10 to this digit. Same answer as the Spanish method: the generator
  // passes `carry` = 1 when this column gave 1 to the column on its right, so the top digit is now top − 1.
  rs_col: (p, top, b0, has, carry, borrow, r, lead) => {
    const col = COL[p], now = top - carry;
    if (!has && !carry) return `${col}: there is nothing on the bottom. Bring down the <b>${top}</b>.`;
    if (carry && top === 0) {   // regrouping across a zero: 0 → 10 → 9
      const rest = has ? `9 − ${b0} = <b>${r}</b>.` : `Nothing on the bottom: bring down the <b>${r}</b>.`;
      return `${col}: the top digit is 0, so it first gets 1 from the next place on top: the 0 becomes 10. After giving 1 to the right, it is 9. ${rest}`;
    }
    const pre = carry ? `the ${top} on top gave 1 to the right, so it is now ${now}. ` : "", up = s => pre ? s[0].toUpperCase() + s.slice(1) : s;
    if (lead) return `${col}: ${pre}${has ? `${now} − ${b0} = 0` : "0 is left"} (a 0 on the left is not written).`;
    if (!has) return `${col}: ${pre}${up("nothing")} on the bottom: bring down the <b>${r}</b>.`;
    if (borrow) return `${col}: ${pre}${up("you")} can't take ${b0} from ${now}, so regroup: take 1 from the next place on top, and the ${now} becomes ${now + 10}. ${now + 10} − ${b0} = <b>${r}</b>.`;
    return `${col}: ${pre}${now} − ${b0} = <b>${r}</b>.`;
  },
  resta_s: (steps, a, b, r) => `Subtract in columns, starting with the ones. When the top digit is smaller, regroup: take 1 from the next place on top (cross it out and write one less), and add 10 to the top digit.<br>${steps.join("<br>")}<br>${a} − ${b} = <b>${r}</b>. Check: ${r} + ${b} = ${a}.`,
  est_q: (e, p) => `Estimate <b>${e}</b> by rounding each number to ${p}.`,
  est_s: (a, b, add, e, exact) => `Round: ${a} ${add ? "+" : "−"} ${b} = <b>${e}</b>. (The exact answer is ${exact}: the estimate is close.)`,
  pb_q: [
    (N, a, b, c) => `A library has ${a} books. It lends out ${b} on Monday and ${c} on Tuesday. How many books are left on the shelves?`,
    (N, n, p, pay) => `${N} buys ${n} movie tickets for $${p} each and pays with a $${pay} bill. How many dollars does ${N} get back?`,
    (a, b) => `A farm harvests ${a} kg of potatoes the first year and ${b} kg more the second year. How many kilograms does it harvest in the two years together?`,
    (f, m, g) => `A theater has ${f} rows of ${m} seats. If ${g} seats are taken, how many are empty?`],
  pb_s: [
    (a, b, c, p, r) => `After Monday, ${a} − ${b} = ${p} are left. After Tuesday, ${p} − ${c} = <b>${r}</b>.`,
    (n, p, t, pay, r) => `The tickets cost ${n} × ${p} = $${t}. The change is ${pay} − ${t} = <b>$${r}</b>.`,
    (a, b2, r) => `The second year it harvests ${b2} kg. Both years together: ${a} + ${b2} = <b>${r} kg</b>.`,
    (f, m, t, g, r) => `There are ${f} × ${m} = ${t} seats in all. Empty: ${t} − ${g} = <b>${r}</b>.`],
  // multiplying by a one-digit number, column by column: v = digit × b + what you carried
  mu_col: (p, x, b, carry, v, last) => {
    const col = COL[p];
    const calc = carry ? `${x} × ${b} = ${x * b}, plus the ${carry} you carried: ${v}` : `${x} × ${b} = ${v}`;
    if (last) return `${col}: ${calc}. There are no more digits, so write <b>${v}</b>.`;
    return v >= 10 ? `${col}: ${calc}. Write <b>${v % 10}</b> and carry ${Math.floor(v / 10)}.` : `${col}: ${calc}. Write <b>${v}</b>.`;
  },
  mult1_s: (st, r) => `Multiply each digit, starting with the ones. If you get 10 or more, write the ones digit and carry the tens, which you add after multiplying the next digit.<br>${st.join("<br>")}<br>Answer: <b>${r}</b>.`,
  m10_s: (z, a, r) => `When you multiply by ${N(10 ** z)}, each digit of ${a} moves ${z === 1 ? "one place" : `${z} places`} to the left, and ${z === 1 ? "the empty place is filled with a zero" : `the ${z} empty places are filled with zeros`}: you add ${z === 1 ? "one zero" : `${z} zeros`} at the end. <b>${r}</b>.`,
  m10r_s: (d, b, p, nz, a, r) => `${a} is ${d} ${nz === 1 ? "tens" : "hundreds"}. Multiply without the zeros: ${d} × ${b} = ${p}. Then add ${nz === 1 ? "the zero" : "the two zeros"} from ${a}: <b>${r}</b>.`,
  facil_q: e => `Find it the easiest way: <b>${e}</b>.`,
  facil_s: (p, q, pq, m, r) => `Look for the pair that makes a round number: ${p} × ${q} = ${pq}. Then ${pq} × ${m} = <b>${r}</b>. (The order and the grouping do not change the answer.)`,
  partir_q: (m, n) => `Find <b>${m} × ${n}</b> by breaking ${n} into 10 + ${n - 10}.`,
  partir_s: (m, c, a, b, r) => `Break ${10 + c} into 10 + ${c}. ${m} × 10 = ${a} and ${m} × ${c} = ${b}. Add: ${a} + ${b} = <b>${r}</b>.`,
  mult2_s: (a, d, u, pu, pd, r) => `Multiply by the ones: ${a} × ${u} = ${pu}. Then by the tens: ${a} × ${d}0 = ${pd}. Add: <b>${r}</b>.`,
  hueco_q: e => `What number goes in the box? <b>${e}</b>`,
  pm_dist_s: (m, c) => `Distributive property: break ${10 + c} into 10 + ${c}, multiply each part by ${m}, and add: ${m} × ${10 + c} = ${m} × 10 + ${m} × ${c}. The missing number is <b>${c}</b>.`,
  pm_s: ["Commutative property: changing the order of the factors does not change the product.", "Associative property: it does not matter how you group the factors.", "Distributive property: multiplying by a sum is the same as multiplying by each addend and adding.", "Multiplying by 1 leaves the number the same. The missing number is <b>1</b>.", "Any number times 0 is <b>0</b>."],
  // [thing, container, (unused), how many come in each one (believable amounts)]
  paq: [["pencils", "boxes", 1, [12, 24, 36, 48]], ["eggs", "cartons", 1, [6, 12]], ["eggs", "trays", 1, [30]], ["trading cards", "packs", 0, [5, 6, 8, 10]],
    ["bottles", "cases", 1, [6, 12, 24]], ["cookies", "packs", 0, [12, 16, 20, 24, 30, 36]], ["books", "shelves", 1, [15, 20, 25, 30, 35, 40]], ["seats", "rows", 1, [14, 16, 18, 20, 22, 24]]],
  pmq: (n, cont, per, obj) => `There are ${n} ${cont} with ${per} ${obj} in each one. How many ${obj} are there in all?`,
  pms: (n, cont, per, a, b, steps) => `There are ${n} equal groups (${n} ${cont}) of ${per}: it is a multiplication. In columns, put the greater number on top: ${a} × ${b}.<br>${steps}`,
  objs: [["candies", 0], ["marbles", 1], ["trading cards", 0], ["cookies", 1], ["stickers", 1], ["pencils", 0], ["strawberries", 1]],
  rep_q: (N, n, obj, k) => `${N} shares ${n} ${obj} equally among ${k} friends. How many does each friend get?`,
  rep_s: (n, k, r) => `${n} ÷ ${k} = <b>${r}</b>, because ${k} × ${r} = ${n}.`,
  agr_q: (N, n, obj, k) => `${N} has ${n} ${obj} and puts them in bags of ${k}. How many bags can ${N} fill?`,
  agr_s: (n, k, r) => `Make groups of ${k}: ${n} ÷ ${k} = <b>${r}</b> bags, because ${k} × ${r} = ${n}.`,
  ex_q: (D, d) => `Does the division <b>${D} ÷ ${d}</b> have a remainder?`,
  ex_o: ["No remainder (it divides evenly)", "It has a remainder"],
  ex_s: (D, d, q, r) => `${D} = ${d} × ${q} + ${r}. Quotient ${q} and remainder ${r}: ${r ? "since the remainder is not 0, it is a division <b>with a remainder</b>" : "since the remainder is 0, it is a division with <b>no remainder</b>"}.`,
  div_q: (D, d) => `Divide: <b>${N(D)} ÷ ${d}</b>.`,
  div_f: ["Quotient", "Remainder"],
  dv_dos: (a, d, n) => `${a} is less than ${d}: ${d} does not go into it. Take two digits: ${n}.`,
  dv_paso: (n, d, q, p, r) => `${d} goes into ${n} <b>${q}</b> ${pl(q, "time", "times")}. ${d} × ${q} = ${p}, with ${r} left over.`,
  dv_cero: (n, d) => `${d} does not go into ${n}: <b>0</b> times. Write a 0 in the quotient, with ${n} left over.`,
  dv_baja: (c, n) => `Bring down the ${c}: now you have ${n}.`,
  div1_s: (st, D, d, q, r) => `Divide digit by digit, from left to right.<br>${st.join("<br>")}<br>Quotient <b>${q}</b> and remainder <b>${r}</b>. Check: ${d} × ${q} + ${r} = ${N(D)}.`,
  pr_q: (d, q, r) => `In a division, the divisor is ${d}, the quotient is ${q}, and the remainder is ${r}. What is the dividend?`,
  pr_s: (d, q, r, D) => `Dividend = divisor × quotient + remainder = ${d} × ${q} + ${r} = <b>${D}</b>.`,
  pr2_q: (D, d, q, r) => `Someone says that ${D} ÷ ${d} gives a quotient of ${q} and a remainder of ${r}. Is that right?`,
  pr2_o: ["Yes", "No"],
  pr2_s: (d, q, r, t, D, wrong) => `Check it: ${d} × ${q} + ${r} = ${t}. ${wrong ? `It does not give ${D}: it is <b>not</b> right.` : `It gives ${D}, and the remainder (${r}) is less than the divisor (${d}): it <b>is</b> right.`}`,
  pr3_s: (d, q, r, D, q2, r2) => `Check it: ${d} × ${q} + ${r} = ${D}. It gives ${D}, but the remainder (${r}) is not less than the divisor (${d}): ${d} could go in one more time! It is <b>not</b> right. The correct answer is quotient ${q2} and remainder ${r2}.`,
  globos: ["red", "green", "yellow"],   // m3.fracdibujo: the colored balloons (fg_q, fg_s)
  fd_q: "What fraction of the shape is shaded?",
  frac_hint: "Write the fraction with a slash, for example 3/4.",
  fd_s: (n, d) => `The shape has ${d} equal parts (denominator), and ${n} ${pl(n, "is", "are")} shaded (numerator): <b>${n}/${d}</b>.`,
  fd2_q: "What fraction of the shape is <b>not</b> shaded?",
  fd2_s: (n, d) => `The shape has ${d} equal parts, and ${n === 1 ? "1 is" : `${n} are`} shaded. Not shaded: ${d} − ${n} = ${d - n}: <b>${d - n}/${d}</b>.`,
  fg_q: (d, n, c) => `There are ${d} balloons, and ${n} ${pl(n, "is", "are")} ${c}. What fraction of the balloons are ${c}?`,
  fg_s: (d, n, c) => `The whole group is ${d} balloons (denominator), and ${n} ${pl(n, "is", "are")} ${c} (numerator): <b>${n}/${d}</b>.`,
  // fraction of an amount, in a story: (numerator, denominator, total)
  fq_ctx: [
    (n, d, N) => `You have ${N} trading cards and give away ${n}/${d} of them. How many cards do you give away?`,
    (n, d, N) => `There are ${N} ripe strawberries in the garden, and you pick ${n}/${d} of them. How many strawberries do you pick?`,
    (n, d, N) => `A book has ${N} pages, and Nora has already read ${n}/${d} of it. How many pages has she read?`,
    (n, d, N) => `There are ${N} children on the bus, and ${n}/${d} of them are wearing caps. How many children are wearing caps?`,
    (n, d, N) => `A bag has ${N} candies, and you give ${n}/${d} of them to your friends. How many candies do you give away?`],
  fname: (n, d) => `${NUM[n]}-${DEN[d]}${n > 1 ? "s" : ""}`,
  fl_q: w => `Write the fraction <b>${w}</b> with numbers.`,
  fl2_q: (n, d) => `How do you read the fraction <b>${n}/${d}</b>?`,
  fl_s: (w, n, d) => `<b>${n}/${d}</b> is read <b>${w}</b>: the numerator (${n}) is read like a number, and the denominator (${d}) gives the name of the parts.`,
  fc_q: (a, c, b, d) => `Choose the correct sign: <b>${a}/${c} ☐ ${b}/${d}</b>`,
  fc_s1: (a, b, c, k) => `Both have the same denominator (${c} parts): the one with more parts is greater. <b>${a}/${c} ${k ? "&lt;" : "&gt;"} ${b}/${c}</b>.`,
  fc_s2: (a, c, d, k) => `They have the same numerator: the more parts the whole is cut into, the smaller each part is. <b>${a}/${c} ${k ? "&lt;" : "&gt;"} ${a}/${d}</b>.`,
  fq_q: (n, d, N) => `What is <b>${n}/${d} of ${N}</b>?`,
  fq_s: (N, d, p, n, r) => `First divide by the denominator: ${N} ÷ ${d} = ${p}. Then multiply by the numerator: ${p} × ${n} = <b>${r}</b>.`,
  conv_q: (v, a, b) => `How many <b>${b}</b> are in <b>${v} ${a}</b>?`,
  conv_s: (a, f, b, v, r) => `1 ${a} = ${f} ${b}, so ${v} ${a} = ${v} × ${f} = <b>${r} ${b}</b>.`,
  conv2_s: (a, f, b, v, r) => `1 ${a} = ${f} ${b}, so ${v} ${b} = ${v} ÷ ${f} = <b>${r} ${a}</b>.`,
  gr_w: ["half a kilogram", "a quarter of a kilogram", "three-quarters of a kilogram", "one and a half kilograms"],   // 500, 250, 750, and 1,500 g
  gr_q: w => `How many grams are in <b>${w}</b>?`,
  gr_s: (w, r) => `1 kg = 1,000 g, so ${w} is <b>${r} g</b>.`,
  bal_q: (a, b) => `A scale has ${a} g of flour and ${b} g of sugar on it. How many more grams do you need to get to 1 kg?`,
  bal_s: (a, b, s, r) => `There are ${a} + ${b} = ${s} g. Since 1 kg = 1,000 g, you need 1,000 − ${s} = <b>${r} g</b> more.`,
  ml_w: ["half a liter", "a quarter of a liter", "one and a half liters", "three-quarters of a liter"],   // 500, 250, 1,500, and 750 mL
  ml_q: w => `How many milliliters are in <b>${w}</b>?`,
  ml_s: (w, r) => `1 L = 1,000 mL, so ${w} is <b>${r} mL</b>.`,
  vasos_q: (L, b) => `How many ${b} mL glasses can you fill with a ${L}-liter pitcher?`,
  vasos_s: (L, ml, b, r) => `${L} L = ${ml} mL. ${ml} ÷ ${b} = <b>${r}</b> glasses.`,
  // measurements in two units, and comparing measurements in different units
  mc_q: (a, g, b, p) => `How many <b>${p}</b> are in <b>${a} ${g} and ${b} ${p}</b>?`,
  mc_s: (a, g, b, p, f, af, r) => `1 ${g} = ${N(f)} ${p}, so ${a} ${g} = ${a} × ${N(f)} = ${af} ${p}. With the ${b} ${p}: ${af} + ${b} = <b>${r} ${p}</b>.`,
  mc2_q: (v, p, g) => `Write <b>${v} ${p}</b> in ${g} and ${p}.`,
  mc2_s: (v, p, g, f, a, af, b) => `1 ${g} = ${N(f)} ${p}. ${v} ${p} has ${a} ${g} (${af} ${p}) and ${b} ${p} left over: <b>${a} ${g} and ${b} ${p}</b>.`,
  mc_w: ["is longer", "is heavier", "holds more"],
  mc_igual: "They are equal",
  mc3_q: (w, a, b) => `Which ${w}: <b>${a}</b> or <b>${b}</b>?`,
  mc3_s: (a, g, af, p, v, good) => `To compare, write both in the same unit: ${a} ${g} = ${af} ${p}, and the other one is ${v} ${p}. The greater measurement is <b>${good}</b>.`,
  hora_q: "What time does the clock show? Write the hours and the minutes.",
  hm_f: ["Hours", "Minutes"],
  hora_s: (h, m) => {
    if (!m) return `The minute hand is on the 12: 0 minutes, exactly on the hour. The hour hand is on the ${h}: it is ${HOURS[h]} o'clock, <b>${hm(h, m)}</b>.`;
    const n = Math.floor(m / 5), r = m % 5, base = n ? `is on the ${n}: ${n} × 5 = ${n * 5} minutes` : "has just passed the 12";
    const long = r ? `The minute hand ${n ? `has passed the ${n} (${n} × 5 = ${n * 5} minutes)` : "has passed the 12"} and gone ${r === 1 ? "1 more small mark" : `${r} more small marks`}: ${n * 5} + ${r} = ${m} ${pl(m, "minute", "minutes")}.` : `The minute hand ${base}.`;
    return `${long} The hour hand has passed the ${h}. It is <b>${hm(h, m)}</b>.`;
  },
  // how you say the time: "quarter past three", "ten to five"
  diceY: (h, m) => `${MINS[m]} past ${HOURS[h]}`,
  diceMenos: (h, m) => `${MINS[m]} to ${HOURS[h]}`,
  dice: (h, m) => m <= 30 ? S.diceY(h, m) : S.diceMenos(h % 12 + 1, 60 - m),
  dice_q: t => `How do you say the time <b>${t}</b> in words?`,
  dice_s: (h, m, good) => m <= 30
    ? `The ${m} minutes are on the right half of the clock: we say “past” and the minutes that have gone by. You say <b>${good}</b>.`
    : `The ${m} minutes are on the left half: we say “to” and the minutes left until the next hour, ${h % 12 + 1}: 60 − ${m} = ${60 - m}. You say <b>${good}</b>.`,
  // the 24-hour clock is kept (the lesson teaches it), always next to its a.m./p.m. time
  h24_q: (h, m) => `It is ${hm(h, m)} ${h <= 5 ? "in the afternoon" : h <= 8 ? "in the evening" : "at night"} (${t12(h + 12, m)}). What does a 24-hour digital clock show?`,
  h24_s: (h, m) => `From 1:00 in the afternoon (1:00 p.m.) on, the 24-hour clock adds 12 to the hour: ${h} + 12 = ${h + 12}. It shows <b>${hm(h + 12, m)}</b>.`,
  h12: true,   // dur_q: the end time is written with a.m./p.m., so the answer hour is 1–12
  // what lasts: 0 a short while (an episode), 1 a while (practice), 2 a long time (the movie)
  dur_q: (h, m, d, c) => `${ctxT[c ?? 2]} starts at ${t12(h, m)} and lasts ${durT(d)}. What time does it end?`,
  dur_s: (h, m, d, H2, M2) => `Count forward in jumps (60 minutes = 1 hour). ${jumps(h, m, d)} It ends at <b>${t12(H2, M2)}</b>${/\.$/.test(t12(H2, M2)) ? "" : "."}`,
  cuanto_q: (h, m, H2, M2, c) => `${ctxT[c]} starts at ${t12(h, m)} and ends at ${end(t12(H2, M2))} How long does it last? Write the hours and the minutes.`,
  cuanto_s: (h, m, H2, M2, d) => `Count forward from ${t12(h, m)} to ${end(t12(H2, M2))} ${jumps(h, m, d)} In all, <b>${d < 60 ? `${d} min` : d % 60 ? `${Math.floor(d / 60)} h ${d % 60} min` : `${d / 60} h`}</b>.`,
  // [thing, lowest and highest price in cents]
  papeleria: [["a notebook", 120, 450], ["a pen", 50, 250], ["an eraser", 30, 120], ["a pencil", 40, 150], ["a pencil case", 300, 900],
    ["a folder", 150, 400], ["a marker", 80, 250], ["a ruler", 80, 300], ["a pencil sharpener", 50, 200], ["a glue stick", 100, 300]],
  juguetes: [["A yo-yo", 150, 450], ["A ball", 300, 900], ["A puzzle", 500, 1500], ["A comic book", 300, 900], ["A kite", 600, 1600], ["A storybook", 800, 1900], ["A card game", 300, 800]],
  din_q: (x, a, y, b) => `You buy ${x} for ${a} and ${y} for ${b}. How much do you pay in all?`,
  eur_f: "Dollars",
  cent: "Cents",
  din_s: (a, b, s, t) => `Add the cents and the dollars separately (100 cents = $1): in all, <b>${t}</b>.`,
  vuelta_q: (t, a, pay) => `${t} costs ${a}, and you pay with a $${pay} bill. How much change do you get?`,
  vsalto: (x, y, d) => `from ${x} to ${y}, ${d}`,
  vuelta_s: (js, sum, e, c, t) => `Count up from the price to what you pay, in jumps: ${js.join("; ")}. Put the jumps together: ${sum}${js.length > 1 ? ` = ${e ? `$${e} and ` : ""}${c}¢` : ""}. Your change is <b>${t}</b>.`,
  ang_q: "What kind of angle is this?",
  angr_q: h => `What kind of angle do the hands of the clock make at ${h} o'clock?`,
  angr_s: (h, d, c) => `The minute hand is on the 12 and the hour hand is on the ${h}: going the short way around the clock face, they are ${d === 1 ? "1 number" : `${d} numbers`} apart. ` + ["They are closer together than the corner of a sheet of paper: <b>acute</b>.", "They make a corner like the corner of a sheet of paper (a quarter turn): <b>right</b>.", "They are wider apart than the corner of a sheet of paper: <b>obtuse</b>."][c],
  angc_q: big => `Which of these three angles is the <b>${big ? "widest" : "narrowest"}</b>?`,
  angc_s: (big, l) => `What matters is how wide the sides open, not how long they are or which way they point. The ${big ? "widest" : "narrowest"} one is <b>${l}</b>.`,
  ang_o: ["Acute", "Right", "Obtuse"],
  ang_s: ["It is smaller than the corner of a sheet of paper: <b>acute</b>.", "It is like the corner of a sheet of paper (the little square shows it): <b>right</b>.", "It is wider than the corner of a sheet of paper: <b>obtuse</b>."],
  rec_q: "What kind of lines are these?",
  rec_o: ["Parallel", "Perpendicular", "Intersecting (not perpendicular)"],
  rec_s: ["They never meet, even if we make them longer: they are <b>parallel</b>.", "They cross and make right angles: they are <b>perpendicular</b>.", "They cross, but they do not make right angles: they are <b>intersecting</b>."],
  el_w: ["sides", "vertices", "angles"],
  el_q: w => `How many <b>${w}</b> does this polygon have?`,
  el_s: (n, w) => `It has <b>${n}</b> ${w}. A polygon has as many sides as vertices and as angles.`,
  cu_q: "What kind of quadrilateral is this?",
  cu_o: ["Square", "Rectangle", "Rhombus", "Trapezoid", "Quadrilateral with no parallel sides"],
  cu_s: ["4 equal sides and 4 right angles (the little squares): <b>square</b>. Even if it is turned, it is still a square.", "4 right angles (the little squares), and the opposite sides are the same length: <b>rectangle</b>.", "4 equal sides but no right angles: <b>rhombus</b>.", "Only two sides are parallel: <b>trapezoid</b>.", "No side is parallel to another: <b>quadrilateral with no parallel sides</b>."],
  tr_q: s => `A triangle has sides of ${s.replace(/, ([^,]*)$/, ", and $1")}. What kind of triangle is it?`,
  tr_o: ["Equilateral", "Isosceles", "Scalene"],
  tr_s: ["All three sides are equal: <b>equilateral</b>.", "It has two equal sides: <b>isosceles</b>.", "All three sides are different: <b>scalene</b>."],
  per_rect_q: "What is the perimeter of this rectangle, in cm?",
  per_q: s => `A polygon has sides of ${s.replace(/, ([^,]*)$/, ", and $1")}. What is its perimeter, in cm?`,   // serial comma before the last side
  regn: ["An equilateral triangle", "A square", "A pentagon", "A hexagon"],
  per_reg_q: (w, a) => `${w} has sides that are all ${a} cm long. What is its perimeter, in cm?`,
  per_s: (sum, r) => `The perimeter is the sum of all the sides: ${sum} = <b>${r} cm</b>.`,
  diam_q: r => `A circle has a radius of ${r} cm. What is its diameter?`,
  diam_s: (r, d) => `The diameter is twice the radius: 2 × ${r} = <b>${d} cm</b>.`,
  rad_q: d => `A circle has a diameter of ${d} cm. What is its radius?`,
  rad_s: (d, r) => `The radius is half the diameter: ${d} ÷ 2 = <b>${r} cm</b>.`,
  cc_q: ["What do you call the closed curved line that forms the edge of a wheel?", "What do you call the flat surface inside a circle, like a coin?"],
  cc_o: ["Circle", "Disk"],
  cc_s: ["It is only the edge, a line: a <b>circle</b>.", "It is the surface inside: a <b>disk</b>."],
  cats: ["dogs", "cats", "fish", "birds", "rabbits"],
  gb_q: c => `The bar graph shows the pets that the children at a school have. How many <b>${c}</b> are there? (Look at the scale.)`,
  gb_s: (step, c, v) => v % step ? `The scale counts by ${step}s. The bar for ${c} ends exactly halfway between ${v - v % step} and ${v - v % step + step}: it is <b>${v}</b>.` : `The scale counts by ${step}s. The bar for ${c} goes up to <b>${v}</b>.`,
  gp_q: (c, e) => `The picture graph shows the pets that the children at a school have. Each star stands for ${e}. How many <b>${c}</b> are there?`,
  gp_s: (c, n, e, half, r) => `Row for ${c}: ${n} ${n === 1 ? "whole star" : "whole stars"}, ${half ? `${n} × ${e} = ${n * e}, and half a star, which stands for half of ${e}: ${e / 2}. In all, ${n * e} + ${e / 2} = <b>${r}</b>` : `${n} × ${e} = <b>${r}</b>`}.`,
  gd_q: (a, b) => `The bar graph shows the pets that the children at a school have. How many more ${a} than ${b} are there?`,
  gd_s: (a, b, r) => `${a} − ${b} = <b>${r}</b>.`,
  gt_q: "The bar graph shows the pets that the children at a school have. How many pets are there in all?",
  gt_s: (sum, r) => `${sum} = <b>${r}</b>.`,
  col: ["red", "blue", "green"],
  colpl: ["red", "blue", "green"],
  pb2_q: (a, b) => `Without looking, you pick a ball from the bag. Are you more likely to pick a ${a} ball or a ${b} ball?`,
  pb2_o: ["The first one is more likely", "The second one is more likely", "Equally likely"],
  pb2_s: (a, na, b, nb, k) => {
    const txt = !na && !nb ? `There are no ${a} balls and no ${b} balls. ` : !na ? `There are no ${a} balls, and there ${nb === 1 ? "is 1" : `are ${nb}`} ${b} ${pl(nb, "ball", "balls")}. `
      : `There ${na === 1 ? "is 1" : `are ${na}`} ${a} ${pl(na, "ball", "balls")} and ${nb ? `${nb} ${b} ${pl(nb, "one", "ones")}` : `no ${b} ones`}. `;
    const imp = !na && nb ? ` Picking a ${a} ball is <b>impossible</b>: there are none.` : !nb && na ? ` Picking a ${b} ball is <b>impossible</b>: there are none.` : "";
    return txt + [`You are <b>more likely</b> to pick a ${a} ball: there are more balls of that color.`, `You are <b>more likely</b> to pick a ${b} ball: there are more balls of that color.`, "There are the same number of each color: they are <b>equally likely</b>."][k] + imp;
  },
});

// m3.series, m3.patron, m3.escondido
S.SR = {
  sig_q: s => `What number comes next? <b>${s}, …</b>`,
  sig_s: (t, s, up, r) => `From ${t[0]} to ${t[1]} is ${s}; from ${t[1]} to ${t[2]}, ${s}; from ${t[2]} to ${t[3]}, ${s}. The rule is <b>${up ? "add" : "subtract"} ${s}</b>: ${t[3]} ${up ? "+" : "−"} ${s} = <b>${r}</b>.`,
  falta_q: s => `What number is missing? <b>${s}</b>`,
  falta_s: (a, s, up, r, b) => `The rule is ${up ? "add" : "subtract"} ${s}: ${a} ${up ? "+" : "−"} ${s} = <b>${r}</b>. Check: ${r} ${up ? "+" : "−"} ${s} = ${b}.`,
  regla_q: s => `What is the rule of the pattern <b>${s}</b>?`,
  sumar: s => `Add ${s}`,
  restar: s => `Subtract ${s}`,
  por2: "Multiply by 2",
  regla_s: (t, s, up) => `Each number is ${s} ${up ? "more" : "less"} than the one before: ${t[0]} ${up ? "+" : "−"} ${s} = ${t[1]}, ${t[1]} ${up ? "+" : "−"} ${s} = ${t[2]}… The rule is <b>${up ? "add" : "subtract"} ${s}</b>.`,
  doble_s: t => `${t[0]} + ${t[0]} = ${t[1]}, ${t[1]} + ${t[1]} = ${t[2]}, ${t[2]} + ${t[2]} = ${t[3]}… Each number is double the one before: <b>multiply by 2</b>. (It does not add the same amount every time: check it with all the jumps.)`,
  doble2_s: (t, r) => `Each number is double the one before: ${t[0]} + ${t[0]} = ${t[1]}, ${t[1]} + ${t[1]} = ${t[2]}, ${t[2]} + ${t[2]} = ${t[3]}. The next one is double ${t[3]}: ${t[3]} + ${t[3]} = <b>${r}</b>.`,
  cols: ["red", "blue", "green", "yellow"],
  pulsera_q: n => `Your sister is making a bracelet by repeating the same little part over and over. What color will bead number <b>${n}</b> be?`,
  pulsera_s: (core, L, ends, n, r, c) => `The core of the pattern has ${L} beads (${core}), and it repeats. ${ends ? `The cores end at beads ${ends}. ` : ""}Bead ${n} is the ${ord(r)} bead of a core: it is <b>${c}</b>.`,
  torre_q: k => `Look at how the towers grow. If they keep growing the same way, how many cubes will tower number ${k} have?`,
  torre_s: (d, list, k, r) => `Each tower has ${d} more ${pl(d, "cube", "cubes")} than the one before: ${list}. Tower ${k} has <b>${r}</b> cubes.`,
  esc_q: e => `What number goes in the box? <b>${e}</b>`,
  salto: (a, t, x, b, y, r) => `Count up from ${a} to ${b}: from ${a} to ${t} is ${x}, and from ${t} to ${b} is ${y}. In all, ${x} + ${y} = <b>${r}</b>.`,
  directo: (a, b, r) => `Find how much you add to ${a} to get to ${b}: ${b} − ${a} = <b>${r}</b>.`,
  resta_s: (a, b, r) => `If you take something away from ${b} and ${a} is left, you took away the difference from ${a} to ${b}: ${b} − ${a} = <b>${r}</b>.`,
  quita_s: (x, a, b) => `If you take ${x} away from the hidden number and ${a} is left, before taking it away there were ${a} + ${x} = <b>${b}</b>.`,
  comp: e => `Check: ${e}.`,
};

// m3.tablas
const ONE = { spiders: "A spider", tricycles: "A tricycle", cars: "A car", hands: "A hand", boxes: "A box", weeks: "A week", tables: "A table", bags: "A bag", packs: "A pack", clovers: "A clover", octopuses: "An octopus" };
S.TB = {
  hueco_q: e => `What number goes in the box? <b>${e}</b>`,
  hueco_s: (t, m, p) => `Look in the ${t} times table for the number that gives ${p}: ${t} × <b>${m}</b> = ${p}.`,
  hueco2_s: (t, m, p) => `Look in the ${t} times table: ${t} × ${m} = ${p}. Since the order does not change the answer, <b>${m}</b> × ${t} = ${p}.`,
  // [container (plural), thing, how many each one has]
  grupos: [["spiders", "legs", 8], ["tricycles", "wheels", 3], ["cars", "wheels", 4], ["hands", "fingers", 5], ["boxes", "eggs", 6], ["weeks", "days", 7],
    ["tables", "chairs", 4], ["bags", "candies", 9], ["packs", "trading cards", 5], ["clovers", "leaves", 3], ["packs", "yogurts", 4], ["octopuses", "arms", 8]],
  grupos_q: (g, cont, per, obj) => `${ONE[cont]} has ${per} ${obj}. How many ${obj} do ${g} ${cont} have in all?`,
  grupos_s: (g, per, obj) => `That is ${g} groups of ${per}: ${g} × ${per} = <b>${g * per}</b> ${obj}.`,
  noesta_q: t => `Which of these numbers is <b>not</b> in the ${t} times table?`,
  noesta_s: (t, out, k, lo, hi) => `In the ${t} times table, ${t} × ${k} = ${lo} and ${t} × ${k + 1} = ${hi}. <b>${out}</b> is in between: it is not in the table. The others are.`,
  // [thing A, thing B, short A, short B] to combine
  comb: [["T-shirts", "pairs of pants", "T-shirts", "pants"], ["ice cream flavors", "kinds of cone", "flavors", "cones"],
    ["kinds of bread", "fillings", "breads", "fillings"], ["caps", "scarves", "caps", "scarves"]],
  comb_q: (x, a, y, b) => `You have ${x} ${a} and ${y} ${b}. How many different combinations can you make by choosing one of each?`,
  comb_s: (x, a, y, b, r) => `For each of the ${x} ${a}, you can choose any of the ${y} ${b}: that is ${x} groups of ${y}. ${x} × ${y} = <b>${r}</b> combinations.`,
  veces: ["twice as many", "three times as many", "four times as many"],
  cosas: [["trading cards"], ["marbles"], ["stickers"], ["books"], ["dollars"]],
  veces_q: (N, base, obj, M, v) => `${N} has ${base} ${obj}, and ${M} has ${v}. How many ${obj} does ${M} have?`,
  veces_s: (v, k, base, obj) => `“${cap(v)}” means ${k} times the same number: ${k} × ${base} = <b>${k * base}</b> ${obj}.`,
};

// m3.mental
S.MN = {
  q: e => `Find in your head: <b>${e}</b>.`,
  nueve_s: (add, n, r10, a, mid, r) => add
    ? `Adding ${n} is adding ${r10} and taking away 1: ${a} + ${r10} = ${mid}, and ${mid} − 1 = <b>${r}</b>.`
    : `Subtracting ${n} is subtracting ${r10} and adding 1 back: ${a} − ${r10} = ${mid}, and ${mid} + 1 = <b>${r}</b>.`,
  cent_s: (A, a, b, add, r, R) => `Count in flats of a hundred: ${A} is ${a} flats. ${add ? `With ${b} more flats` : `If you take away ${b} flats`}, ${a} ${add ? "+" : "−"} ${b} = ${r} flats of a hundred: <b>${R}</b>.`,
  desc_s: (a, b, d, u, m, r) => `Break ${b} into ${d} + ${u}. First the tens: ${a} + ${d} = ${m}. Then the ones: ${m} + ${u} = <b>${r}</b>.`,
  salto: (x, y, n) => `from ${x} to ${y} is ${n}`,
  contar_s: (jumps, sum, r) => `Count up from the smaller number, jumping to round numbers: ${jumps.join("; ")}. Put the jumps together: ${sum} = <b>${r}</b>.`,
  par_s: (x, y, m, t, r) => `Look for the pair that makes ${t}: ${x} + ${y} = ${t}. Then add the one that is left: ${t} + ${m} = <b>${r}</b>.`,
};

// m3.simetria
S.SI = {
  // [name, lines of symmetry, why, drawing ("txt" = the letter, the last character of the name)]
  figs: [["a square", 4, "a vertical one, a horizontal one, and the two diagonals", "sq"], ["a rectangle", 2, "a vertical one and a horizontal one; if you fold it along a diagonal, the halves do not match", "rect"],
    ["an equilateral triangle", 3, "one from each vertex to the middle of the opposite side", "eq"], ["an isosceles triangle", 1, "only the one that goes down from the top to the middle of the side that is different", "iso"],
    ["a scalene triangle", 0, "its three sides are different, and no fold makes the two halves match", "esc"], ["a rhombus", 2, "its two diagonals", "rombo"],
    ["this trapezoid", 1, "a vertical one, through the middle", "trap"], ["the letter A", 1, "a vertical one, through the middle", "txt"], ["the letter H", 2, "a vertical one and a horizontal one", "txt"],
    ["the letter E", 1, "a horizontal one, through the middle", "txt"], ["the letter F", 0, "no fold makes its two halves match", "txt"], ["the letter T", 1, "a vertical one, through the middle", "txt"],
    ["the letter X", 2, "a vertical one and a horizontal one", "txt"], ["the letter L", 0, "no fold makes its two halves match", "txt"], ["the letter M", 1, "a vertical one, through the middle", "txt"]],
  ejes_q: n => `How many lines of symmetry does ${n} have?`,
  ejes_s: (n, a, why) => `${n.charAt(0).toUpperCase() + n.slice(1)} has <b>${a}</b> ${a === 1 ? "line" : "lines"} of symmetry: ${why}.`,
  punto_q: c => `The blue dot is in column ${c}, and the line of symmetry is the red line. In which column is its reflection?`,
  punto_s: (c, e, d, tc) => `From the dot to the line there ${d === 1 ? `is 1 square (column ${c})` : `are ${d} squares (columns ${c} to ${e})`}. Its reflection is ${d === 1 ? "1 square" : `the same ${d} squares`} away on the other side of the line, in the same row: column <b>${tc}</b>.`,
  hor_q: "Is the drawing symmetric about the red horizontal line?",
  hor_o: ["Yes", "No"],
  hor_s: ["If you fold along the red line, the top half lands exactly on the bottom half: it <b>is</b> symmetric.", "If you fold along the red line, some square has no partner on the other side: it is <b>not</b> symmetric."],
};

// m3.cuerpos
S.CU = {
  fam_q: "Is this solid a polyhedron or a curved solid?",
  fam_o: ["Polyhedron", "Curved solid"],
  nom: { cube: "a cube", prism: "a prism", pyramid: "a pyramid", cylinder: "a cylinder", cone: "a cone", sphere: "a sphere" },
  fam_s: (n, poly) => poly ? `It is ${n}: all its faces are flat. It is a <b>polyhedron</b>.` : `It is ${n}: it has a curved surface. It is a <b>curved solid</b>.`,
  // [question, 0 prism · 1 pyramid]
  pp: [["A polyhedron has two equal bases, one across from the other, and its side faces are rectangles. Is it a prism or a pyramid?", 0],
    ["A polyhedron has only one base, and its side faces are triangles that meet at a point. Is it a prism or a pyramid?", 1],
    ["What shape is a shoebox?", 0], ["What shape is a juice box?", 0], ["What shape is the pointed roof of a tower with a square base?", 1],
    ["What shape is a tent shaped like a little house, with a triangle in front and an identical one in back?", 0], ["What shape are the pyramids of Egypt?", 1],
    ["What shape is a box of chocolate with two triangular ends?", 0], ["What shape is a paperweight with a square base that ends in a point?", 1]],
  pp_q: t => t,
  pp_o: ["Prism", "Pyramid"],
  pp_s: ["It has two equal bases, one across from the other, and rectangular side faces: it is a <b>prism</b>.", "It has only one base, and triangular faces that meet at a point: it is a <b>pyramid</b>."],
  // [name, drawing (or null), is a prism, sides of the base]
  tabla: [["a cube", "cube", true, 4], ["a rectangular prism, like a shoebox", "prism", true, 4], ["a square pyramid", "pyramid", false, 4],
    ["a triangular prism", null, true, 3], ["a triangular pyramid", null, false, 3], ["a pentagonal pyramid", null, false, 5], ["a pentagonal prism", null, true, 5]],
  elem: ["faces", "edges", "vertices"],
  cuenta_q: (e, n) => `How many <b>${e}</b> does ${n}${n.includes(",") ? "," : ""} have?`,
  cuenta_s: (w, name, pri, n, r) => {
    const nm = cap(name.split(",")[0]);
    if (pri) return [`${nm}: 2 bases (top and bottom) and ${n} faces on the sides, one for each side of the base: ${n} + 2 = <b>${r}</b> faces.`,
      `${nm}: ${n} edges on the bottom, ${n} on top, and ${n} standing up: ${n} + ${n} + ${n} = <b>${r}</b> edges.`,
      `${nm}: ${n} vertices on the bottom and ${n} on top: ${n} + ${n} = <b>${r}</b> vertices.`][w];
    return [`${nm}: the base and ${n} triangles, one for each side of the base: 1 + ${n} = <b>${r}</b> faces.`,
      `${nm}: ${n} edges on the base and ${n} going up to the top point: ${n} + ${n} = <b>${r}</b> edges.`,
      `${nm}: ${n} vertices on the base and 1 at the top point: ${n} + 1 = <b>${r}</b> vertices.`][w];
  },
};

// m3.calendario (in the US, the week starts on Sunday and dates are written month/day/year)
S.CA = {
  inicio: 0,        // the first column of the calendar page is Sunday
  finde: [0, 6],    // weekend columns (in red): Sunday and Saturday
  dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  letras: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],   // three letters, as in the lesson (S and T would repeat)
  meses: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  sem_q: n => `How many days are in ${n} weeks?`,
  sem_s: n => `Each week has 7 days: ${n} × 7 = <b>${7 * n}</b> days.`,
  anos_q: n => `How many months are in ${n} years?`,
  anos_s: n => `A year has 12 months: ${n} × 12 = <b>${12 * n}</b> months.`,
  dias_q: d => `How many weeks are in ${d} days?`,
  dias_s: n => `Each week has 7 days, and ${n} × 7 = ${7 * n}: that is <b>${n}</b> weeks.`,
  medio_q: "How many months are in half a year?",
  medio_s: "Half a year is half of 12 months: <b>6</b> months.",
  dec_q: n => `How many years are in ${n} decades?`,
  dec_s: n => `A decade is 10 years: ${n} × 10 = <b>${10 * n}</b> years.`,
  sig_q: n => `How many years are in ${n} centuries?`,
  sig_s: n => `A century is 100 years: ${n} × 100 = <b>${100 * n}</b> years.`,
  mesd_q: (m, feb, bis) => `How many days are there in ${m}${feb ? (bis ? " in a leap year" : " in a year that is not a leap year") : ""}?`,
  mesd_s: (m, n, feb, bis) => feb ? `February has 28 days, and 29 in leap years. ${bis ? "This year is a leap year" : "This year is not a leap year"}: <b>${n}</b> days.` : `“Thirty days has September, April, June, and November. All the rest have thirty-one, except February alone.” ${m} has <b>${n}</b> days.`,
  semdia_q: (w, d, d2) => `If today is ${w} the ${ord(d)}, what day of the week will the ${ord(d2)} of this month be?`,
  semdia_s: (w, d, d2, add, r) => add % 7 === 0 ? `From the ${ord(d)} to the ${ord(d2)} there are ${add} days: ${add === 7 ? "exactly one week" : "exactly two weeks"}. It will be <b>${r}</b> again.` : `From the ${ord(d)} to the ${ord(d2)} there ${add === 1 ? "is 1 day" : `are ${add} days`}: count ${add === 1 ? "one day" : `${add} days`} after ${w}. It will be <b>${r}</b>.`,
  faltan_q: (d1, m1, d2, m2) => `Today is ${m1} ${d1}. How many days are left until ${m2} ${d2}?`,
  faltan1_s: (d1, d2) => `${d2} − ${d1} = <b>${d2 - d1}</b> days. (Today does not count.)`,
  faltan2_s: (m1, L, d1, d2, m2) => `${m1} has ${L} days: from the ${ord(d1)} to the ${ord(L)}, there ${L - d1 === 1 ? "is" : "are"} ${L} − ${d1} = ${L - d1} ${pl(L - d1, "day", "days")} left. Then add the ${d2} ${pl(d2, "day", "days")} in ${m2}: ${L - d1} + ${d2} = <b>${L - d1 + d2}</b> days.`,
  hoja_q: d => `Look at the calendar page. What day of the week is the <b>${ord(d)}</b>?`,
  hoja_s: (d, l, w) => `Find the ${d} and go up its column to the top: <b>${l}</b>. It is <b>${w}</b>.`,
  cuantos_q: w => `Look at the calendar page. How many ${w}s are there this month?`,
  cuantos_s: (w, list, n) => `Find the ${w} column and count its dates: ${list}. There are <b>${n}</b>.`,
  primer_q: w => `Look at the calendar page. What is the date of the first ${w}?`,
  primer_s: (w, l, d) => `The first number in the ${l} column (${w}) is <b>${d}</b>.`,
  fecha: (d, m, y) => `${m}/${d}/${y}`,   // the date in numbers, in the US order: month/day/year
  fecha_q: f => `An invitation shows the date <b>${f}</b>. In which month is the party?`,
  fecha_s: (d, m, mes, y) => `In the United States, we write the month first, then the day, and the year last: month ${m}, day ${d}, year ${y}. Month ${m} is <b>${mes}</b>.`,
};

// m3.estmedidas
S.EM = {
  bank_q: w => `Choose the measurement that makes sense for ${w}.`,
  // [what, options (the right one first), explanation]
  bank: [
    ["the height of a 5-story building", ["About 15 m", "About 15 cm", "About 15 km"], "Each story is about 3 m tall: 5 × 3 = 15. The building is <b>about 15 m</b> tall."],
    ["the distance from your town to the next town", ["About 8 km", "About 8 m", "About 8 cm"], "8 m is about the length of a classroom. Two towns are <b>about 8 km</b> apart: about two hours on foot."],
    ["the length of a new pencil", ["About 18 cm", "About 18 m", "About 18 mm"], "A pencil is a little longer than a hand span: <b>about 18 cm</b>. 18 mm is shorter than a finger, and 18 m is longer than a classroom."],
    ["the thickness of a quarter", ["About 2 mm", "About 2 cm", "About 2 m"], "A coin is very thin, like 20 sheets of paper together: <b>about 2 mm</b>."],
    ["the length of an ant", ["About 5 mm", "About 5 cm", "About 5 m"], "An ant fits several times on the nail of your little finger, which is about 1 cm: it is <b>about 5 mm</b> long."],
    ["the height of the classroom door", ["About 2 m", "About 2 cm", "About 20 m"], "A grown-up walks through it without bending down: the door is <b>about 2 m</b> tall, two big steps."],
    ["the weight of an apple", ["About 200 g", "About 200 kg", "About 2 g"], "2 g is only 2 paper clips, and 200 kg is more than two grown-ups. An apple weighs <b>about 200 g</b>: about 5 apples weigh as much as a 1 kg bag of rice."],
    ["the weight of a third grader", ["About 30 kg", "About 3 kg", "About 300 kg"], "A newborn baby weighs 3 kg, and a big motorcycle weighs 300 kg. An 8- or 9-year-old child weighs <b>about 30 kg</b>."],
    ["the weight of a pencil", ["About 5 g", "About 5 kg", "About 500 g"], "A pencil weighs about as much as a few paper clips: <b>about 5 g</b>. 5 kg would be five 1 kg bags of rice."],
    ["the weight of a big bag of rice", ["About 1 kg", "About 1 g", "About 100 kg"], "A big bag of rice weighs <b>about 1 kg</b>: it is one of our benchmarks."],
    ["the water in a mop bucket", ["About 10 L", "About 10 mL", "About 1,000 L"], "10 mL is a couple of teaspoons, and 1,000 L fills a huge tank. A bucket holds <b>about 10 L</b>, like 10 cartons of milk."],
    ["the water in a glass", ["About 250 mL", "About 250 L", "About 25 mL"], "A glass is a quarter of a liter: <b>about 250 mL</b>. 250 L would not even fit in a bathtub."],
    ["the water in a teaspoon", ["About 5 mL", "About 5 L", "About 500 mL"], "A teaspoon is very small: <b>about 5 mL</b>. 500 mL is two glasses."],
    ["the water in a bathtub", ["About 200 L", "About 200 mL", "About 2 L"], "2 L is two big bottles. A bathtub holds <b>about 200 L</b>."],
  ],
  sitios: ["the park", "your grandparents' house", "the library", "the pool"],
  km_q: (m, w) => `Walking, you go 1 km in about 15 minutes. It takes you ${m} minutes to get to ${w}. About how many kilometers away is it?`,
  km_s: (m, n) => m === 15 ? `15 minutes is just what it takes to walk 1 km: it is <b>about 1 km</b> away.` : `${m} minutes is ${n} times 15 minutes: it is about <b>${n}</b> km away.`,
  min_q: n => `Walking, you go 1 km in about 15 minutes. About how many minutes will it take you to walk ${n} km?`,
  min_s: n => `${n === 1 ? "1 km is" : `${n} km is ${n} times`} 15 minutes: ${n} × 15 = <b>${15 * n}</b> minutes.`,
  clip_q: n => `A paper clip weighs about 1 g. About how many grams do ${n} paper clips weigh?`,
  clip_s: n => `Each paper clip weighs about 1 g: ${n} paper clips weigh about <b>${n}</b> g.`,
  hojas_q: n => `Ten sheets of paper together are about 1 mm thick. About how many millimeters thick is a notebook with ${n} sheets?`,
  hojas_s: n => `Each group of 10 sheets is about 1 mm thick: ${n} sheets are ${n / 10} groups of 10. It is about <b>${n / 10}</b> mm thick.`,
  pisos_q: n => `Each story of a building is about 3 m tall. About how many meters tall is ${n === 8 || n === 11 ? "an" : "a"} ${n}-story building?`,
  pisos_s: n => `${n} × 3 = <b>${3 * n}</b>. It is about ${3 * n} m tall.`,
  largos: ["the playground", "the school hallway", "the gym", "the bridge over the river"],
  pasos_q: (w, n) => `A big step of a grown-up is about 1 m long. Your teacher crosses ${w} in ${n} big steps. About how many meters long is it?`,
  pasos_s: (w, n) => `Each big step is about 1 m: ${n} steps are about <b>${n}</b> m.`,
  nombres: ["Leo", "Nora", "Henry", "Abby", "Omar", "Iris"],
  // [what, unit, real value (min., max.)]
  medir: [["the length of the classroom table", "cm", 60, 90], ["the length of the board", "cm", 250, 350], ["the length of the playground", "m", 25, 45], ["the water in a pitcher", "mL", 1000, 2000], ["the weight of a watermelon", "g", 3000, 6000]],
  quien_q: (w, a, ea, b, eb, real, u) => `${a} estimates ${w} at about ${N(ea)} ${u}, and ${b} at about ${N(eb)} ${u}. When they measure it, they get ${N(real)} ${u}. Who made the better estimate?`,
  quien_s: (real, g, b, u, who) => `${N(g)} ${u} is only ${N(Math.abs(g - real))} ${u} away from the actual measurement (${N(real)} ${u}); ${N(b)} ${u} is ${N(Math.abs(b - real))} ${u} away. <b>${who}</b> made the better estimate: you do not have to get it exactly right, just close.`,
};

// m3.movimientos
S.MV = {
  movs: ["A translation", "A rotation", "A reflection"],
  cual_q: "Which transformation moves the blue piece onto the red one?",
  cual_s: ["The red piece faces the same way as the blue one: it has only moved to another place. It is a <b>translation</b>.", "The red piece has made a quarter turn around a point: it is lying on its side. It is a <b>rotation</b>.", "The red piece looks like the blue one in a mirror: its foot points the other way. It is a <b>reflection</b>."],
  hacia: ["to the right", "to the left", "up", "down"],
  tras_q: h => `The blue piece has been translated ${h} onto the red one. How many squares has it moved?`,
  tras_s: (n, h) => `In a translation, every point moves the same amount. Pick a corner of the blue piece and count to the same corner of the red one: <b>${n}</b> squares ${h}.`,
  vueltas: ["a quarter turn", "a half turn", "a three-quarter turn"],
  vueltasO: ["A half turn", "A three-quarter turn", "A full turn"],
  reloj_q: (h, v, cw) => `The minute hand of a clock points to the ${h} and makes ${v} ${cw ? "clockwise" : "counterclockwise"}. What number does it point to now?`,
  reloj_s: (h, q, cw, e, v) => `A quarter turn is 3 numbers on the clock face. ${cap(v)} ${q === 1 ? "is 3 numbers" : `is ${q} × 3 = ${3 * q} numbers`} ${cw ? "forward" : "backward"} from the ${h}: it gets to the <b>${e}</b>.`,
  dirs: ["up", "to the right", "down", "to the left"],
  dirsO: ["Up", "To the right", "Down", "To the left"],
  bandera_q: (d, v, cw) => `The flag points ${d} and makes ${v} around point O, ${cw ? "clockwise" : "counterclockwise"}. Which way does it point now?`,
  bandera_s: (q, cw, d) => `Make one quarter turn at a time, ${cw ? "clockwise" : "counterclockwise"}: ${q === 1 ? "one quarter" : q === 2 ? "two quarters, a half turn" : "three quarters"}. Now it points <b>${d}</b>.`,
  bank_q: w => `Think of ${w}. Is it a translation, a rotation, or a reflection?`,
  bank: [["a drawer when you open it", 0], ["an elevator going up", 0], ["a sliding window when you open it", 0], ["a train on a straight track", 0], ["a person on an escalator", 0],
    ["a Ferris wheel", 1], ["the hand of a clock", 1], ["a door when it opens", 1], ["the blade of a windmill", 1], ["the steering wheel of a car when you turn it", 1],
    ["your image in a mirror, compared with you", 2], ["the right wing of a butterfly, compared with the left one", 2]],
  bank_s: [w => `${cap(w)}: it slides in a straight line without turning. It is a <b>translation</b>.`, w => `${cap(w)}: it turns around a point that does not move. It is a <b>rotation</b>.`, w => `It is like seeing yourself in a mirror: it is a <b>reflection</b>.`],
  cuartos_q: n => `How many quarter turns does it take to make ${n} full turns?`,
  cuartos_s: n => `A full turn is 4 quarter turns: ${n} × 4 = <b>${4 * n}</b>.`,
  cuantos_q: q => `You make ${q} quarter turns in a row in the same direction. How far have you turned in all?`,
  cuantos_s: q => `Two quarter turns make a half turn${q >= 3 ? `; three quarters are a half turn and one more quarter${q === 4 ? ", and four quarters, a full turn" : ""}` : ""}. You have made <b>${["a half turn", "a three-quarter turn", "a full turn"][q - 2]}</b>.`,
};

// m3.plano
S.PL = {
  sitios: ["Mei's house", "the park", "the fountain", "the school", "the store"],
  donde_q: s => `Look at the map. Which square is ${s} in?`,
  donde_s: (s, l, n) => `Go down from ${s} along its column: it is <b>${l}</b>. Go sideways along its row: it is <b>${n}</b>. It is in square <b>${l}${n}</b> (first the letter, then the number).`,
  que_q: c => `Look at the map. What is in square <b>${c}</b>?`,
  que_s: (c, l, n, s) => `Find column ${l} and row ${n}: in ${c} you find <b>${s}</b>.`,
  mov: ["to the right", "to the left", "up", "down"],
  fila: n => `along row ${n}`,
  columna: l => `along column ${l}`,
  robot_q: (c, n, d, by) => `On a map with columns A to F and rows 1 (bottom) to 5 (top), a robot is in square ${c} and moves ${n === 1 ? "1 square" : `${n} squares`} ${d} ${by}. Which square does it end up in?`,
  robot_s: (c, n, d, c2, h) => `${h ? "The letter changes and the row stays the same" : "The number changes and the column stays the same"}. It moves ${n} ${d} without counting the square where it starts: it gets to <b>${c2}</b>.`,
  rumbo: ["up (toward row 5)", "toward the right side of the map (toward column F)", "down (toward row 1)", "toward the left side of the map (toward column A)"],
  rumboO: ["Up", "Toward the right side of the map", "Down", "Toward the left side of the map"],
  gira_q: (h, right) => `You are walking ${h}${/ map /.test(h) ? "" : " on the map"}, and you turn <b>${right ? "right" : "left"}</b>. Which way are you going now?`,
  gira_s: (h, right, h2, h0) => `Imagine you are inside the map, walking ${h}.${h0 === 2 ? " Since you are going down, your right is the left side of the map." : ""} When you turn ${right ? "right" : "left"}, you go <b>${h2}</b>.`,
  manoO: ["On my right", "On my left"],
  mano_q: (facing, r) => `Your friend is ${facing ? "facing you" : "standing with her back to you (looking the same way you are)"} and raises her <b>${r ? "right" : "left"}</b> hand. From where you are, on which side do you see that hand?`,
  mano_s: (facing, r, seen) => facing ? `When someone is facing you, their sides are the opposite of yours: her ${r ? "right" : "left"} is on <b>your ${seen ? "right" : "left"}</b>.` : `If she is looking the same way you are, her right and left are the same as yours: you see it on <b>your ${seen ? "right" : "left"}</b>.`,
  giros: { d: "a quarter turn to the right", i: "a quarter turn to the left", m: "a half turn" },
  y: " and then ",
  clase: ["the board", "the window", "the back of the classroom", "the door"],
  claseO: ["The board", "The window", "The back of the classroom", "The door"],
  clase_q: g => `The classroom robot is facing the board. The window is on its right, and the door is on its left. It makes ${g}. Which way is it facing now?`,
  // two turns: the first one and "then" the second one, with the answer in bold
  paso: (t, w, i) => i ? `Then ${{ d: "a quarter turn to the right", i: "a quarter turn to the left", m: "a half turn" }[t]}: in the end it faces <b>${w}</b>.`
    : `${{ d: "A quarter turn to the right", i: "A quarter turn to the left", m: "A half turn" }[t]}: it faces ${w}.`,
  clase_s: w => `In the end it faces <b>${w}</b>.`,
  // with only one turn, without repeating the sentence of the step
  clase1_s: (t, w) => ({ d: `A quarter turn to the right: it turns toward its right, where the window is. Now it faces <b>${w}</b>.`,
    i: `A quarter turn to the left: it turns toward its left, where the door is. Now it faces <b>${w}</b>.`,
    m: `A half turn: now it faces exactly the opposite way from the board, toward <b>${w}</b>.` })[t],
};

// m3.encuesta
S.EN = {
  // [what the survey is about, possible answers]
  temas: [["favorite fruits", ["apple", "banana", "strawberry", "orange", "pear"]], ["favorite pets", ["dog", "cat", "fish", "bird", "rabbit"]],
    ["favorite sports", ["soccer", "basketball", "swimming", "tennis", "skating"]], ["how students get to school", ["walking", "by car", "by bus", "by bike"]], ["favorite colors", ["blue", "green", "red", "yellow", "purple"]],
    ["how many siblings students have", ["0 siblings", "1 sibling", "2 siblings", "3 or more"]], ["how many pets students have at home", ["none", "1 pet", "2 pets", "3 or more"]]],   // data that are numbers
  // "Fish: 3 single marks = 3" · "Walking: 1 full group (5) and 4 single marks: 5 + 4 = 9" · "Skating: 2 full groups: 5 + 5 = 10"
  leer: (c, g, s, n) => {
    const single = `${s} ${s === 1 ? "single mark" : "single marks"}`, fives = Array(g).fill(5).join(" + ");
    if (g === 0) return `${c}: ${single} = <b>${n}</b>`;
    if (!s) return g === 1 ? `${c}: 1 full group = <b>${n}</b>` : `${c}: ${g} full groups: ${fives} = <b>${n}</b>`;
    return g === 1 ? `${c}: 1 full group (5) and ${single}: 5 + ${s} = <b>${n}</b>` : `${c}: ${g} full groups (${fives} = ${5 * g}) and ${single}: ${5 * g} + ${s} = <b>${n}</b>`;
  },
  frec_q: (t, c) => `The tally chart shows a survey about ${t}. How many children chose “<b>${c.toLowerCase()}</b>”?`,
  total_q: t => `The tally chart shows a survey about ${t}. How many children answered in all?`,
  total_s: (sum, n) => `Count the tally marks for each answer (each crossed-out group is worth 5) and add all the frequencies: ${sum} = <b>${n}</b>.`,
  mas_q: t => `The tally chart shows a survey about ${t}. Which answer got the most votes?`,
  menos_q: t => `The tally chart shows a survey about ${t}. Which answer got the fewest votes?`,
  masmenos_s: (list, c, n, more) => `Turn the tally marks into numbers: ${list}. The answer with the ${more ? "most" : "fewest"} votes is <b>${c}</b>, with ${n}.`,
  dif_q: (a, b) => `Look at the tally chart. How many more votes does “<b>${a.toLowerCase()}</b>” have than “<b>${b.toLowerCase()}</b>”?`,
  dif_s: (ra, rb, a, b) => `${ra}; ${rb}. ${a} − ${b} = <b>${a - b}</b> more ${a - b === 1 ? "vote" : "votes"}.`,
  o_q: (a, b) => `Look at the tally chart. How many children chose “<b>${a.toLowerCase()}</b>” or “<b>${b.toLowerCase()}</b>”?`,
  o_s: (a, b) => `Add the two frequencies: ${a} + ${b} = <b>${a + b}</b>.`,
  grupos_q: (g, s) => `A tally has ${g === 1 ? "1 full group" : `${g} full groups`}${s ? ` and ${s === 1 ? "1 single mark" : `${s} single marks`}` : ""}. How many answers is that?`,
  grupos_s: (g, s) => `Each full group is worth 5 (the mark across it is the fifth one): ${g} × 5 = ${s ? `${5 * g}, and ${s} more: ${5 * g} + ${s} = ` : ""}<b>${5 * g + s}</b>.`,
  cuantos_q: n => `You make a tally of ${n} answers. How many full groups (of 5) do you get?`,
  cuantos_s: n => { const g = Math.floor(n / 5), r = n % 5;
    return `${g === 1 ? "1 group of 5 is 5" : `${g} groups of 5 are ${5 * g}`}${r ? `, and ${r === 1 ? "1 single mark is left" : `${r} single marks are left`}` : ""}: you get <b>${g}</b> full ${g === 1 ? "group" : "groups"}.`; },
  preg_q: t => `We want to do a class survey about ${t}. Which question is better?`,
  preg_s: "The best question is <b>clear</b>, is about what we want to find out, and gives <b>choices</b>, so the answers can be counted with tally marks.",
  // [topic, the good one, bad ones…]
  preguntas: [
    ["favorite sports", "What is your favorite sport: soccer, basketball, swimming, or another one?", "Do you like sports?", "How tall are you?"],
    ["fruit for snack time", "Which fruit do you like best: apple, banana, strawberry, or orange?", "Do you like fruit?", "How old are you?"],
    ["favorite pets", "Which pet do you like best: dog, cat, fish, or another one?", "Do you have a pet?", "What color is your backpack?"],
    ["how we get to school", "How do you get to school: walking, by car, by bus, or by bike?", "Do you like coming to school?", "What time do you get up?"],
    ["the end-of-year field trip", "Where would you rather go: the zoo, the museum, or the farm?", "Do you like field trips?", "How many brothers and sisters do you have?"],
  ],
};
})();
