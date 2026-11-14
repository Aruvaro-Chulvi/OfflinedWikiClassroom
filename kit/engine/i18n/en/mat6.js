/* WikiAula — texts for gen/mat6.js (Mathematics, Grade 6), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m6 = G.m6 || {};
// Helpers: numbers with the separators of the language, capital letter, "a"/"an", "1 degree" / "2 degrees",
// amounts with the "$" in front, and a sentence that ends in a clock time ("7:05 p.m."): no second period
const N = n => window.WA.H.n(n);
const cap = s => s[0].toUpperCase() + s.slice(1);
const art = w => /^(?:[aeiou]|8|11[^0-9])/i.test(w) ? "an" : "a";
const anP = p => /^8/.test(String(p)) || p === 11 || p === 18 ? "an" : "a";
const one = (v, u) => String(v) === "1" ? u.replace(/^glasses/, "glass").replace(/^cups/, "cup").replace(/(hour|day|degree|level|unit|step|square|week)s\b/, "$1").replace(/^(apple|pear|girl|boy|cat|dog|pencil|marker)s$/, "$1") : u;
const amt = (x, u) => u === "$" ? "$" + x : x + u;
const U = (x, u) => u === "$" ? "$" + x : `${x} ${u}`;
const W = n => window.WA.I18N.en.words(+n);

// m6.series
S.SE = {
  mas: d => `Add ${d}`,
  menos: d => `Subtract ${d}`,
  por: r => `Multiply by ${r}`,
  sig_q: s => `What number comes next in the pattern <b>${s}, …</b>?`,
  sig_s: (r, a, b) => `Look at how you get from each number to the next one: the rule is <b>${r.toLowerCase()}</b>, and it works for every jump. After ${a} comes <b>${b}</b>.`,
  dos_q: s => `Write the next two numbers in the pattern <b>${s}, …</b>`,
  f: ["Next number", "The one after that"],
  dos_s: (r, a, b) => `The rule is <b>${r.toLowerCase()}</b> (check it for every jump). Next come <b>${a}</b> and <b>${b}</b>.`,
  regla_q: s => `What is the rule of the pattern <b>${s}</b>?`,
  regla_s: (t, r, op) => `Check every jump: ${t.slice(0, 4).map((x, i) => `${x} ${op} → ${t[i + 1]}`).join("; ")}. The rule is <b>${r.toLowerCase()}</b>. Looking only at the first jump can fool you.`,
  lejos_q: (s, n) => `In the pattern <b>${s}, …</b>, what is the ${window.WA.H.ord(n)} number?`,
  lejos_s: (a, d, n, r) => `Each number is ${d} more than the one before it. From the 1st number to the ${window.WA.H.ord(n)} there are ${n - 1} jumps of ${d}: ${a} + ${n - 1} × ${d} = <b>${r}</b>. You don't need to write them all.`,
};

// m6.palillos
const andList = s => s.replace(/, ([^,]*)$/, ", and $1");
S.PA = {
  que: ["triangles", "squares", "houses"],
  fig: n => `figure ${n}`,
  intro: (q, ps) => `You make a row of ${q} with toothpicks, each one joined to the next: with 1, 2, and 3 ${q} you use ${andList(ps)} toothpicks.`,
  cuantos_q: (n, q) => `How many toothpicks do you need for a row of ${n} ${q}?`,
  cuantos_s: (f, p, n, r, q) => `The first figure uses ${f} toothpicks, and each new one shares a toothpick with the one before it, so it only adds ${p}. Rule: 1 starting toothpick and ${p} for each figure: 1 + ${p} × ${n} = <b>${r}</b>. (Or: ${f} + ${p} × ${n - 1} = ${r}.)`,
  cuantas_q: (P, q) => `With ${P} toothpicks, how many ${q} can you make in the row?`,
  cuantas_s: (p, n, P) => `Rule: toothpicks = 1 + ${p} × n. Work backward: ${P} − 1 = ${P - 1} and ${P - 1} ÷ ${p} = <b>${n}</b>. Check: 1 + ${p} × ${n} = ${P}.`,
  regla: (a, b) => a ? `${a} + ${b} × n` : `${b} × n`,
  regla_q: q => `If n is the number of ${q}, which rule gives the number of toothpicks?`,
  regla_s: (f, p, q) => `Each new figure adds ${p} toothpicks, and there is 1 starting toothpick: <b>1 + ${p} × n</b>. Check with n = 1: 1 + ${p} = ${f}. (${f} × n would count the shared toothpicks twice.)`,
  tabla_q: (q, ps, n) => `Complete the table for the row of ${q}: with 1 | 2 | 3 ${q}, the toothpicks are ${ps}. How many toothpicks do you need for ${n} ${q}?`,
};

// m6.desconocido
S.DE = {
  halla_q: (v, e) => `Find the value of ${v}: <b>${e}</b>`,
  suma_s: (v, a, b, x) => `Subtraction undoes addition: ${v} = ${b} − ${a} = <b>${x}</b>. Check: ${x} + ${a} = ${b}.`,
  resta_s: (v, a, b, x) => `Addition undoes subtraction: ${v} = ${b} + ${a} = <b>${x}</b>. Check: ${x} − ${a} = ${b}.`,
  mult_s: (v, a, b, x) => `Division undoes multiplication: ${v} = ${b} ÷ ${a} = <b>${x}</b>. Check: ${a} × ${x} = ${b}.`,
  div_s: (v, a, b, x) => `Multiplication undoes division: ${v} = ${b} × ${a} = <b>${x}</b>. Check: ${x} ÷ ${a} = ${b}.`,
  dos_s: (v, a, b, c, x, plus) => `Undo the steps in reverse order. First ${plus ? "take away" : "add back"} the ${b} (${plus ? "subtraction undoes addition" : "addition undoes subtraction"}): ${c} ${plus ? "−" : "+"} ${b} = ${plus ? c - b : c + b}. Then divide by ${a}: ${a * x} ÷ ${a} = <b>${x}</b>. Check: ${a} × ${x} ${plus ? "+" : "−"} ${b} = ${c}.`,
  pienso1_q: (a, c) => `I think of a number, multiply it by ${a}, and get ${c}. What number did I think of?`,
  pienso1_s: (a, c, x) => `${a} × n = ${c}, so n = ${c} ÷ ${a} = <b>${x}</b>. Check: ${a} × ${x} = ${c}.`,
  pienso_q: (a, b, plus, c) => `I think of a number, multiply it by ${a}, and ${plus ? "add" : "subtract"} ${b}: I get ${c}. What number did I think of?`,
  pienso_s: (a, b, plus, c, x) => `It is ${a} × n ${plus ? "+" : "−"} ${b} = ${c}. Work backward: ${c} ${plus ? "−" : "+"} ${b} = ${a * x}, and ${a * x} ÷ ${a} = <b>${x}</b>. Check: ${a} × ${x} ${plus ? "+" : "−"} ${b} = ${c}.`,
  balanza_q: (a, b) => `The balance scale is level: the mystery box and ${anP(a)} ${a} kg weight weigh the same as ${b} kg. How many kilograms does the box weigh?`,
  balanza_s: (a, b, x) => `It is like the equation □ + ${a} = ${b}. Take ${a} kg off both pans: □ = ${b} − ${a} = <b>${x}</b> kg. Check: ${x} + ${a} = ${b}.`,
};

// m6.signo
S.SG = {
  q: (a, b) => `Which sign goes in the box? <b>${a} ☐ ${b}</b>`,
  s: (a, va, b, vb, k) => `${a} = ${va} and ${b} = ${vb}. ${["Since " + va + " &gt; " + vb + ", the sign is <b>&gt;</b>.", "Since " + va + " &lt; " + vb + ", the sign is <b>&lt;</b>.", "They have the same value, so the sign is <b>=</b>."][k]}`,
};
// ═════ Elementary versions of the Grade 7 generators (gen/mat6.js) ═════

// m6.raizent
S.RZ = {
  q: n => `Find the integer square root of <b>${N(n)}</b> and its remainder.`,
  f: ["Integer square root", "Remainder"],
  bald_q: n => `You want to make the biggest square you can with ${N(n)} square tiles. How many tiles will each side have? How many will be left over?`,
  fb: ["Tiles per side", "Left over"],
  tanteo: (n, d, dd, d1, dd1) => `${N(n)} is beyond the table, so try the tens: ${d} × ${d} = ${N(dd)} and ${d1} × ${d1} = ${N(dd1)}, so the root is between ${d} and ${d1}. `,
  s: (n, r, q, r1, q1, rest, ctx, big) => `${big ? "Try" : "Look in the table for two squares in a row"}: ${r} × ${r} = ${N(q)} is not more than ${N(n)}, and ${r1} × ${r1} = ${N(q1)} is already too big. Integer square root: <b>${r}</b>. Remainder: ${N(n)} − ${N(q)} = <b>${rest}</b>${ctx ? (rest === 1 ? " tile" : " tiles") : ""}. Check: ${N(q)} + ${rest} = ${N(n)}.`,
};

// m6.pot10
S.P10 = {
  calc_q: e => `Find <b>${e}</b>.`,
  nat_s: (a, p, k, r) => `${p} is a 1 followed by ${k} zeros: multiplying by ${p} means writing ${k} zeros after ${a}. Result: <b>${r}</b>.`,
  dec_s: (k, dd, z, r) => `The decimal point moves ${k} ${k === 1 ? "place" : "places"} to the right: ${dd.length === 1 ? "one place goes past the " + dd[0] : W(dd.length) + " places go past the " + dd.join(" and the ")}${z ? `, and in ${z === 1 ? "the other one you write a 0" : "the other " + W(z) + " you write zeros"}` : ""} → <b>${r}</b>.`,
  abr_q: n => `How do you write <b>${n}</b> in short form, as a number between 1 and 10 times a power of 10?`,
  abr_s: (sig, m, n, k, good) => sig === 1
    ? `The number in front is between 1 and 10: ${m}. To get back to ${n}, you write ${k} zeros after it, that is, you multiply by 10<sup>${k}</sup>: <b>${good}</b>.`
    : `The number in front is between 1 and 10: put the decimal point after the first digit → ${m}. To get back to ${n}, the decimal point moves ${k} places to the right, that is, you multiply by 10<sup>${k}</sup>: <b>${good}</b>.`,
};

// m6.descomp
S.DC = {
  num_q: t => `What number is <b>${t}</b>?`,
  num_s: (terms, vals, n) => `Find each term: ${terms}. Add: ${vals} = <b>${n}</b>.`,
  exp_q: (n, shown) => `Complete the expanded form: <b>${n} = ${shown}</b>. What exponent goes in the box?`,
  pos: { 2: "the hundreds place", 3: "the thousands place", 4: "the ten thousands place", 5: "the hundred thousands place", 6: "the millions place" },
  exp_s: (d, pos, v, p10, pw, e) => `The ${d} is in ${pos}: its value is ${v} = ${d} × ${p10}, and ${p10} = ${pw}. The exponent in the box is <b>${e}</b>.`,
};

// m6.combinadas and m6.parentesis
S.CB = {
  q: e => `Evaluate: <b>${e}</b>`,
  s: (first, lines, v) => `Go down the staircase step by step: first what is inside the parentheses and brackets (from the inside out), then the powers, then × and ÷, and finally + and −, always from left to right.<br>${first}${lines.map(l => "<br>= " + l).join("")}<br>= <b>${v}</b>`,
};
S.PA2 = {
  q: (e, t) => `Where do the parentheses go so that <b>${e}</b> equals ${t}?`,
  ninguno: "Nowhere",
  s: (list, good, t, e, v0) => `Work out each option (what is inside the parentheses first): ${list}. Only <b>${good}</b> gives ${t}. (Without parentheses, ${e} = ${v0}.)`,
  cosas: [["notebooks", "pencils"], ["pens", "erasers"], ["packs of trading cards", "packs of gum"], ["bottles of water", "sandwiches"]],
  compra_q: (n1, o1, p1, n2, o2, p2, B) => `You buy ${n1} ${o1} at $${p1} each and ${n2} ${o2} at $${p2} each, and you pay with a $${B} bill. Which expression gives your change?`,
  compra_s: (n1, p1, n2, p2, tot, B, v, wrong, wv, o2) => `First, the total cost: ${n1} × ${p1} + ${n2} × ${p2} = $${tot}. The change is ${B} − ${tot} = $${v}: you have to subtract the whole total, so it goes in parentheses: <b>${B} − (${n1} × ${p1} + ${n2} × ${p2})</b>. Without parentheses, ${wrong} = ${wv}: the ${o2} would be added instead of subtracted.`,
  reparto: [["trading cards", "friends"], ["marbles", "friends"], ["candies", "cousins"]],
  rep_q: (a, b, c, o) => `You have ${a} ${o[0]}, someone gives you ${b} more, and you share all of them equally among ${c} ${o[1]}. Which expression gives how many each one gets?`,
  rep_s: (a, b, c, s, q, o) => `First you put them all together: ${a} + ${b} = ${s}; then you share them: ${s} ÷ ${c} = ${q} ${o[0]} each. The addition goes first, in parentheses: <b>(${a} + ${b}) ÷ ${c}</b>. (Without parentheses, only the ${b} you were given would be shared.)`,
};

// m6.enteros
// In the US the street floor is the 1st floor and there is no floor 0, so the elevator counts "levels" (level 0 = street level)
const UG = { u: "degrees", sube: "go up", v: x => `${x} °C` }, UP = { u: "levels", sube: "go up", v: x => String(x) === "0" ? "level 0 (street level)" : `level ${x}` };
S.EN = {
  grados: UG, plantas: UP,
  temp_q: (s, up, c) => `Early in the morning, the thermometer reads ${s} °C, and then the temperature ${up ? "rises" : "drops"} ${c} ${one(c, "degrees")}. What is the temperature now (in °C)?`,
  asc_q: (s, up, c) => `You are on level ${s} of a building and you go ${up ? "up" : "down"} ${c} ${one(c, "levels")} in the elevator. What level are you on now? (Levels below the street are negative.)`,
  cruza_up: (s, ds, c, r, U) => `Count up from ${s} to 0: that is ${ds} ${one(ds, U.u)}. Then count up ${c} − ${ds} = ${r} more: <b>${U.v(r)}</b>.`,
  noCruza_up: (s, c, r, U) => r === "0" ? `Count up ${c} ${one(c, U.u)} from ${s}: you land right on 0: <b>${U.v(r)}</b>.` : `Count up ${c} ${one(c, U.u)} from ${s}: you don't reach 0, and you end up ${r.slice(1)} below it, at <b>${U.v(r)}</b>.`,
  cruza_down: (s, c, rest, r, U) => `Count down from ${s} to 0: that is ${s} ${one(s, U.u)}. Then count down ${c} − ${s} = ${rest} more: <b>${U.v(r)}</b>.`,
  noCruza_down: (s, c, r, U) => r === 0 ? `Count down ${c} ${one(c, U.u)} from ${s}: you land right on 0: <b>${U.v(r)}</b>.` : `${s} − ${c} = ${r}: you don't go below 0, so the answer is <b>${U.v(r)}</b>.`,
  bajo_cero: (s, c, as, ar, r, U) => `The starting point, ${s}, is already below 0: going down ${c} more ${one(c, U.u)} takes you to ${as} + ${c} = ${ar} below 0: <b>${U.v(r)}</b>.`,
  sitios: ["a mountain town", "a city in the north", "the schoolyard", "a mountain cabin"],
  dif_q: (sitio, M, m) => `In ${sitio}, yesterday's high was ${M} °C and the low was ${m} °C. What was the difference in degrees?`,
  dif_s: (m, am, M, r) => `From ${m} to 0 there ${String(am) === "1" ? "is" : "are"} ${am} ${one(am, "degrees")}, and from 0 to ${M}, ${M} more: ${am} + ${M} = <b>${r}</b> degrees.`,
  dif2_s: (m, M, am, aM, r) => `Both are below zero: from ${m} to ${M}, it goes up ${am} − ${aM} = <b>${r}</b> ${one(r, "degrees")}.`,
  gasto_q: (a, g) => `You have $${a} and you buy something that costs $${g} (your sister lends you the rest). What integer shows your money now? (What you owe is negative.)`,
  gasto_s: (a, g, d, r) => `Your $${a} gets you to 0; you are still short ${g} − ${a} = $${d}, which you owe: ${a} − ${g} = <b>${r}</b> (you owe $${d}).`,
  deuda_q: (d, g) => `You owe a friend $${d}, and then you get your allowance of $${g}. After you pay back as much as you can, what integer shows your money? (If you still owe money, it is negative.)`,
  deuda_s: (d, g, r) => `$${d} pays off the debt and gets you to 0; you have ${g} − ${d} = <b>${r}</b> ${r === 1 ? "dollar" : "dollars"} left.`,
  deuda2_s: (d, g, rest, r) => `With the $${g} you pay part of the debt, but you still owe ${d} − ${g} = $${rest}: <b>${r}</b>.`,
  sub_q: (d, u) => `A submarine is ${d} m below sea level and goes up ${u} m. What number is it at now, if sea level is 0? (Write the integer.)`,
  sub_s: (d, u, rest, r) => `It is still underwater: ${d} − ${u} = ${rest} m deep, that is, <b>${r}</b>.`,
  buzo_q: (d, b) => `A diver is ${d} m below sea level and goes down ${b} m more. What number is she at now, if sea level is 0?`,
  buzo_s: (d, b, t, r) => `She was already below sea level and goes deeper: ${d} + ${b} = ${t} m deep, that is, <b>${r}</b>.`,
};

// m6.opuesto and m6.entcomp
S.OP = {
  abs_q: n => `Find the absolute value: <b>|${n}|</b>`,
  abs_s: (n, a) => `The absolute value is the distance from 0, without the sign: ${n} is ${a} ${one(a, "steps")} from 0, so |${n}| = <b>${a}</b>.`,
  op_q: n => `What is the opposite of <b>${n}</b>?`,
  op_s: (n, o, a) => `The opposite has the same absolute value (${a}) and the opposite sign: the opposite of ${n} is <b>${o}</b>. Together they make 0: if you go up ${a} ${a === 1 ? "level" : "levels"} and then go down ${a}, you are back where you started.`,
  mas_q: (a, b) => `Which of these two numbers has the greater absolute value?`,
  mas_s: (a, aa, b, ab, w) => `|${a}| = ${aa} and |${b}| = ${ab}: the one farther from 0 is <b>${w}</b>.`,
};
S.EC = {
  q: (a, b) => `Which sign goes in the box? <b>${a} ☐ ${b}</b>`,
  s: (big, res, both) => `On the number line, ${big} is farther to the right, so it is greater: <b>${res}</b>.${both ? " Between two negative numbers, the greater one is the one closer to 0." : ""}`,
  ext_q: (menor, list) => `Which is the ${menor ? "least" : "greatest"} of these numbers? <b>${list}</b>`,
  ext_s: (ord, menor, v) => `On the number line, from left to right: ${ord}. The ${menor ? "least is the one farthest to the left" : "greatest is the one farthest to the right"}: <b>${v}</b>.`,
};

// m6.barras
S.BA = {
  nombres: ["Leo", "Maya", "Iris", "Henry", "Sarah", "Paul", "Nora", "Ben", "Lucy", "Matt"],
  cosas: [["trading cards", false], ["marbles", true], ["dollars", false], ["stickers", true], ["books", false]],
  veces: { 2: "twice", 3: "three times", 4: "four times", 5: "five times" },
};
Object.assign(S.BA, {
  veces_q: (p1, p2, tot, [obj], vez, who) => `${p1} and ${p2} have ${tot} ${obj} in all. ${p2} has ${vez} as many as ${p1}. How many ${obj} does ${who} have?`,
  veces_s: (p1, p2, k, tot, x, kx) => `Draw the bars: ${p1}, 1 bar; ${p2}, ${k} equal bars. In all, ${k + 1} bars = ${tot} → 1 bar = ${tot} ÷ ${k + 1} = ${x}. ${p1} has <b>${x}</b>, and ${p2} has ${k} × ${x} = <b>${kx}</b>.`,
  mas_q: (p1, p2, tot, [obj], d, who) => `${p1} and ${p2} have ${tot} ${obj} in all. ${p1} has ${d} more than ${p2}. How many ${obj} does ${who} have?`,
  mas_s: (p1, p2, tot, d, x, xd) => `Draw two equal bars and add a piece of ${d} to ${p1}'s bar. If you take that piece away, ${tot} − ${d} = ${tot - d} is left in two equal bars: ${tot - d} ÷ 2 = ${x}. ${p2} has <b>${x}</b>, and ${p1} has ${x} + ${d} = <b>${xd}</b>.`,
  dif_q: (p1, p2, [obj], vez, dif) => `${p2} has ${vez} as many ${obj} as ${p1}, and ${dif} more than ${p1}. How many ${obj} does ${p1} have?`,
  dif_s: (p1, p2, k, dif, x, kx) => k === 2 ? `${p2}'s bar is 2 bars like ${p1}'s: the difference is exactly 1 bar, so ${p1}'s bar is ${dif}. ${p1} has <b>${x}</b> (and ${p2} has 2 × ${x} = ${kx}).` : `${p2}'s bar is ${k} bars like ${p1}'s. The difference is ${k} − 1 = ${k - 1} bars = ${dif} → 1 bar = ${dif} ÷ ${k - 1} = <b>${x}</b>. (${p2} has ${k} × ${x} = ${kx}.)`,
});

// m6.grandes (9- and 10-digit numbers; L.words only goes up to 999,999,999): read period by period, with commas
const PER6 = ["billion", "million", "thousand", ""];
const W6 = (L, n) => [Math.floor(n / 1e9), Math.floor(n / 1e6) % 1000, Math.floor(n / 1000) % 1000, n % 1000]
  .map((x, i) => x ? L.words(x) + (PER6[i] ? " " + PER6[i] : "") : "").filter(Boolean).join(", ");
S.GR = {
  words: W6,
  // typical mistake when the millions period is 000: dropping it and reading the billions as millions
  sinMill: (L, n) => W6(L, Math.floor(n / 1e9) * 1e6 + n % 1e6),
  cl: ["Billions", "Millions", "Thousands", "Ones"],
  frag: (L, x, i) => L.words(x) + (PER6[i] ? " " + PER6[i] : ""),
  escr_q: w => `Write this number in digits: <b>${w}</b>.`,
  escr_s: (parts, n) => parts.map(([c, w, d]) => w ? `${c}: “${w}” → ${d}` : `${c}: not said → ${d}`).join("<br>") + `<br>Number: <b>${n}</b>. (Every period except the first has all three digits.)`,
  val_q: (n, d) => `In the number <b>${n}</b>, what is the value of the digit ${d}?`,
  val_s: (cl, d, pos, v) => `Split the number into periods from the right: ${cl}. The ${d} is in the ${pos} place: its value is <b>${v}</b>.`,
  pos: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands",
    "millions", "ten millions", "hundred millions", "billions"],
  lugar: { 6: "the nearest million", 7: "the nearest ten million", 8: "the nearest hundred million", 9: "the nearest billion" },
  red_q: (n, l) => `Round <b>${n}</b> to ${l}.`,
  red_s: (l, pn, nd, up, pos, td, r) => `To round to ${l}, look at the next digit to the right, in the ${pn} place: it is ${nd}${up ? " (5 or more)" : " (less than 5)"}. ${up ? `The ${pos} digit goes up by one (${td} → ${td + 1})` : `The ${pos} digit (${td}) stays the same`}, and all the digits to its right become zeros: <b>${r}</b>.`,
  leer_q: n => `How do you read the number <b>${n}</b>?`,
  leer_s: (cl, w, m0) => `Split the number into periods from the right: ${cl}. Read each group and add its name: “billion” after the billions, “million” after the millions, and “thousand” after the thousands (skip any group that is 000). It is read: <b>${w}</b>.${m0 ? " The millions period is 000, so you don't say “million” at all." : ""}`,
};

// m6.distancia
S.DS = {
  dist_q: (a, b) => `How many units apart are <b>${a}</b> and <b>${b}</b> on the number line?`,
  dist_s: (a, da, b, d) => `${a} and ${b} are on different sides of 0, so you add their distances to 0: from ${a} to 0 is ${da}, and from 0 to ${b} is ${b} more: ${da} + ${b} = <b>${d}</b> units.`,
  distN_s: (a, b, da, db, d) => `${a} and ${b} are both to the left of 0, ${da} and ${db} away from it: subtract, ${da} − ${db} = <b>${d}</b> ${one(d, "units")}.`,
  distP_s: (a, b, d) => `${a} and ${b} are both to the right of 0: subtract, ${b} − ${a} = <b>${d}</b> ${one(d, "units")}.`,
  rana_q: (s, c, right) => `A frog is on ${s} and makes ${c} jumps of one unit to the ${right ? "right" : "left"}. What number does it land on?`,
  der: "right", izq: "left", sale: "start",
  cruza: (s, z, c, r, dir) => `From ${s} to 0 there ${z === 1 ? "is 1 jump" : "are " + z + " jumps"} to the ${dir}; it still has ${c} − ${z} = ${c - z} more: it lands on <b>${r}</b>.`,
  acerca: (s, c, dir, ds, dr, r) => dr === 0 ? `From ${s}, ${c} jumps to the ${dir} take it right to <b>0</b>.` : `From ${s}, ${c} jumps to the ${dir} bring it closer to 0 without reaching it: it ends up ${ds} − ${c} = ${dr} from 0, on <b>${r}</b>.`,
  sigue: (s, c, dir, ds, d, r) => `From ${s}, ${c} jumps to the ${dir} take it farther from 0: it ends up ${ds} + ${c} = ${d} units from it, on <b>${r}</b>.`,
};

// m6.criterio
S.CR = {
  multi_q: n => `Which of these numbers is <b>${N(n)}</b> divisible by? (Mark all that apply.)`,
  q: (n, d) => `Is <b>${N(n)}</b> divisible by ${d}?`,
  sino: ["Yes", "No"],
  s: {
    2: (n, ok) => `By 2: it ends in ${String(n).slice(-1)}, ${ok ? "which is even → <b>yes</b>" : "which is odd → <b>no</b>"}.`,
    3: (n, ok, st, s) => `By 3: its digits add up to ${st} = ${s}, which ${ok ? "is" : "is not"} a multiple of 3 → <b>${ok ? "yes" : "no"}</b>.`,
    5: (n, ok) => `By 5: it ends in ${String(n).slice(-1)} → <b>${ok ? "yes" : "no"}</b> (it must end in 0 or 5).`,
    9: (n, ok, st, s) => `By 9: its digits add up to ${st} = ${s}, which ${ok ? "is" : "is not"} a multiple of 9 → <b>${ok ? "yes" : "no"}</b>.`,
    10: (n, ok) => `By 10: it ends in ${String(n).slice(-1)} → <b>${ok ? "yes" : "no"}</b> (it must end in 0).`,
  },
  hueco_q: (x, d) => `Which digits can go in the box so that <b>${x.replace("_", "□")}</b> is divisible by ${d}? (Write all of them, separated by commas.)`,
  hueco39_s: (st, s0, d, ans) => `Add the digits you already have: ${st} = ${s0}. With the digit in the box, the sum must be a multiple of ${d}: the digits that work are <b>${ans}</b>.`,
  hueco_s: { 2: "To be divisible by 2, it must end in an even digit: <b>0, 2, 4, 6, 8</b>.", 5: "To be divisible by 5, it must end in 0 or 5: <b>0, 5</b>.", 10: "To be divisible by 10, it must end in 0: <b>0</b>." },
};

// m6.primo
S.PR = {
  q: n => `Is <b>${N(n)}</b> a prime number or a composite number?`,
  opts: ["Prime", "Composite"],
  paso: (p, n, ok, last, s, q, r) => p === 2 ? `Divisible by 2? ${N(n)} ends in ${last}: ${ok ? "it's even → yes" : "it's odd → no"}.`
    : p === 3 ? `Divisible by 3? Its digits add up to ${s}: ${ok ? "that is" : "that is not"} a multiple of 3 → ${ok ? "yes" : "no"}.`
    : p === 5 ? `Divisible by 5? ${ok ? `It ends in ${last} → yes` : "It doesn't end in 0 or 5 → no"}.`
    : `Divisible by ${p}? ${N(n)} ÷ ${p} = ${q}${ok ? ", with no remainder → yes" : `, remainder ${r} → no`}.`,
  primo: (p, pp, n) => `The next prime is ${p}, and ${p} × ${p} = ${N(pp)} is already greater than ${N(n)}: there's no need to keep going. ${N(n)} is <b>prime</b>.`,
  comp: (n, p, q) => `${N(n)} = ${p} × ${q}: it has more than two factors, so it is <b>composite</b>.`,
};

// m6.factoriza and m6.defact
S.FA = {
  q: n => `Write the prime factorization of <b>${N(n)}</b>. (Separate the factors with × or x, and write powers with ^; for example, 2^3 × 5.)`,
  ch_q: n => `What is the prime factorization of <b>${N(n)}</b>?`,
  hint: "Write the prime factors with exponents. Example: 2^3 × 5",
  col: st => `By repeated division, always dividing by the smallest prime you can:<br>${st}`,
  paso: (m, p, isP, last, s, q) => `${isP ? `${N(m)} is prime` : p === 2 ? `${N(m)} is even` : p === 3 ? `the digits of ${N(m)} add up to ${s}, a multiple of 3` : p === 5 ? `${N(m)} ends in ${last}` : p === 7 ? `${N(m)} can't be divided by 2, 3, or 5; try 7` : p === 11 ? `${N(m)} can't be divided by 2, 3, 5, or 7; try 11` : `${N(m)} can't be divided by 2, 3, 5, 7, or 11; try 13`} → ${N(m)} ÷ ${p} = ${N(q)}`,
  fin: (n, list, good, grouped) => grouped ? `${N(n)} = ${list} = <b>${good}</b>` : `${N(n)} = <b>${list}</b>`,
  ch_no: (alt, x) => `(${alt} is wrong: ${x} is not prime.)`,
  def_q: f => `What number is <b>${f}</b>?`,
  def_s: (pw, vals, n) => `${pw ? "Powers first: " + pw + ". Then multiply" : "Multiply"}: ${vals} = <b>${n}</b>.`,
};

// m6.mcd, m6.mcdprob, m6.mcm, m6.mcmprob, m6.mcxtipo
S.MD = {
  q: (a, b) => `Find the greatest common factor: <b>GCF(${a}, ${b})</b>.`,
  lista_s: (a, da, b, db, c, g) => `Factors of ${a}: ${da}. Factors of ${b}: ${db}. Common factors: ${c}. The greatest: GCF = <b>${g}</b>.`,
  fac_s: (a, fa, b, fb, ch, g) => g === 1 ? `${a} = ${fa} and ${b} = ${fb}. They have no prime factor in common: GCF = <b>1</b> (they are relatively prime).` : `${a} = ${fa} and ${b} = ${fb}. Take the common prime factors, each with its smaller exponent: ${ch ? ch + " = " : ""}<b>${g}</b>.`,
  mq: (a, b) => `Find the least common multiple: <b>LCM(${a}, ${b})</b>.`,
  mlista_s: (b, list, m, a, k) => `Multiples of ${b}: ${list}. The first one that is also a multiple of ${a} is ${m} (${m} ÷ ${a} = ${k}): LCM = <b>${m}</b>.`,
  mfac_s: (a, fa, b, fb, al, m) => `${a} = ${fa} and ${b} = ${fb}. Take all the prime factors, common or not, each with its greater exponent: ${al === m ? "" : al + " = "}<b>${m}</b>.`,
  por: {
    grupos: (cosa, a, b) => `The number of ${cosa} must divide both ${a} and ${b} (so nothing is left over) and be as large as possible: it is the GCF.`,
    trozos: (cosa, a, b) => `The ${cosa} must divide both ${a} and ${b} (so nothing is left over) and be as large as possible: it is the GCF.`,
  },
  prob: [
    { tipo: "trozos", cosa: "length of each piece", q: (a, b) => `You have two ribbons, one ${a} cm long and one ${b} cm long. You want to cut them into equal pieces, as long as possible, with nothing left over. How long will each piece be (in cm)?`, s: g => `Each piece will be <b>${g} cm</b> long.` },
    { tipo: "trozos", cosa: "side length of the tile", q: (a, b) => `A rectangular floor measures ${a} dm by ${b} dm. You want to cover it with equal square tiles, as large as possible, without cutting any. What will the side length of each tile be (in dm)?`, s: g => `The side length will be <b>${g} dm</b>.` },
    { tipo: "grupos", cosa: "bags", q: (a, b) => `You want to make identical bags with ${a} strawberry candies and ${b} lemon candies, with none left over and as many bags as possible. How many bags can you make?`, s: g => `You can make <b>${g}</b> bags.`, per: true, per_q: "How many strawberry candies will each bag have?", per_s: (g, a, x) => `There are ${g} bags: each one has ${a} ÷ ${g} = <b>${x}</b> strawberry ${x === 1 ? "candy" : "candies"}.` },
    { tipo: "grupos", cosa: "sets", q: (a, b) => `The school supply store has ${a} pencils and ${b} erasers. They want to make identical sets, as many as possible, with nothing left over. How many sets can they make?`, s: g => `They can make <b>${g}</b> sets.`, per: true, per_q: "How many pencils will each set have?", per_s: (g, a, x) => `There are ${g} sets: each one has ${a} ÷ ${g} = <b>${x}</b> ${x === 1 ? "pencil" : "pencils"}.` },
    { tipo: "grupos", cosa: "teams", q: (a, b) => `A summer camp has ${a} girls and ${b} boys. They want to form identical teams (all with the same number of girls and the same number of boys), with as many teams as possible. How many teams can they form?`, s: g => `They can form <b>${g}</b> teams.`, per: true, per_q: "How many girls will be on each team?", per_s: (g, a, x) => `There are ${g} teams: each one has ${a} ÷ ${g} = <b>${x}</b> ${x === 1 ? "girl" : "girls"}.` },
  ],
  coinc: "These are things that repeat, and you want to know when they happen together again: the first common multiple, the LCM.",
  mprob: [
    { q: (a, b) => `Two buses leave from a station: one every ${a} minutes and the other every ${b} minutes. If they have just left together, in how many minutes will they leave together again?`, s: m => `They leave together again in <b>${m}</b> minutes.` },
    { q: (a, b) => `One lighthouse flashes every ${a} seconds and another every ${b} seconds. If they have just flashed at the same time, how many seconds will pass until they flash together again?`, s: m => `They flash together again in <b>${m}</b> seconds.` },
    { q: (a, b) => `Anna goes to the pool every ${a} days and Max every ${b} days. They were both there today. In how many days will they both be there on the same day again?`, s: m => `They will both be there on the same day again in <b>${m}</b> days.` },
    { q: (a, b) => `In the school garden, the tomatoes are watered every ${a} days and the lettuce every ${b} days. Both were watered today. In how many days will they be watered on the same day again?`, s: m => `They will be watered on the same day again in <b>${m}</b> days.` },
  ],
  // the problem without its final question (m6.mcdprob asks a different one)
  sinPreg: q => q.replace(/\s*[^.]*\?$/, " "),
  x_q: q => `To solve this problem, what do you need to find?<br><i>${q}</i>`,
  x_opts: ["The greatest common factor (GCF)", "The least common multiple (LCM)"],
  x_s: {
    grupos: "You have to split things into the <b>greatest number of equal groups</b> with nothing left over: it is a <b>GCF</b> problem.",
    trozos: "You have to cut things into <b>equal pieces, as large as possible</b>, with nothing left over: it is a <b>GCF</b> problem.",
    coinc: "You have to find out <b>when things that repeat happen together again</b>: it is an <b>LCM</b> problem.",
  },
};

// m6.esequiv and m6.frfr
S.EQ = {
  q: (f1, f2) => `Are ${f1} and ${f2} equivalent?`,
  sino: ["Yes", "No"],
  s: (a, e, b, c, ae, bc, yes) => `Cross-multiply: the numerator of the first times the denominator of the second, ${a} × ${e} = ${N(ae)}, and the denominator of the first times the numerator of the second, ${b} × ${c} = ${N(bc)}. ${yes ? "They are equal: <b>yes</b>, they are equivalent." : "They are different: <b>no</b>, they are not equivalent."}`,
};
S.FF = {
  q: (f1, f2) => `Find ${f1} of ${f2}. (Simplify the result.)`,
  prod: (f1, f2, fp, raw) => `“Of” means “times”: ${f1} of ${f2} = ${f1} × ${f2} = ${fp} = ${raw}`,
  simp: (g, f) => `; simplify by dividing by ${g}: <b>${f}</b>.`,
  irr: ", which is already in simplest form.",
  cant: (fr, tot, r1, each, r0, x, u) => `And ${fr} of ${tot} = ${tot} ÷ ${r1} × ${r0} = ${each} × ${r0} = <b>${x}</b> ${u}.`,
  ctx: [
    { q: (cd, ab) => `In a class, ${cd} of the students eat in the cafeteria, and ${ab} of them have fruit for dessert.`, f: "What fraction of the whole class has fruit?",
      n: (t, cd, ab) => `In a class of ${t} students, ${cd} eat in the cafeteria, and ${ab} of them have fruit for dessert. How many students have fruit?`, u: "students" },
    { q: (cd, ab) => `After a party, ${cd} of the cake is left. The next day, you eat ${ab} of what was left.`, f: "What fraction of the whole cake did you eat?",
      n: (t, cd, ab) => `A cake is cut into ${t} equal pieces. After a party, ${cd} of the cake is left, and the next day you eat ${ab} of what was left. How many pieces did you eat?`, u: "pieces" },
    { q: (cd, ab) => `In a vegetable garden, ${cd} of the land has tomato plants, and ${ab} of the tomato plants are cherry tomatoes.`, f: "What fraction of the garden is cherry tomatoes?",
      n: (t, cd, ab) => `A vegetable garden measures ${t} m². Tomato plants cover ${cd} of the land, and ${ab} of the tomato plants are cherry tomatoes. How many m² are cherry tomatoes?`, u: "m²" },
  ],
};

// m6.frcomp
S.FC = {
  q: (a, b) => `Which sign goes in the box? <b>${a} ☐ ${b}</b>`,
  den: res => `They have the same denominator (equal-size pieces): the one with the greater numerator is greater. <b>${res}</b>`,
  num: res => `They have the same numerator: the one with the smaller denominator is greater, because its pieces are bigger. <b>${res}</b>`,
  mitad: (f, h, n, menos) => `${f}: half of its denominator is ${h}, and ${n} is ${menos ? "less" : "more"}, so ${f} is ${menos ? "less" : "greater"} than 1/2.`,
  mitad_fin: res => `With the half trick, and no calculations: <b>${res}</b>`,
  mcm: (b, d, m, f1, e1, k1, f2, e2, k2, n1, n2, res) => `Find a common denominator: LCM(${b}, ${d}) = ${m}. ${k1 === 1 ? `${f1} already has the denominator ${m}` : `${f1} = ${e1} (multiply the top and bottom by ${k1})`}, and ${k2 === 1 ? `${f2} already has it` : `${f2} = ${e2} (${k1 === 1 ? "multiply the top and bottom " : ""}by ${k2})`}. Compare the numerators, ${n1} and ${n2}: <b>${res}</b>`,
};

// m6.frprob
const DEN6 = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 7: ["seventh", "sevenths"], 8: ["eighth", "eighths"], 9: ["ninth", "ninths"], 10: ["tenth", "tenths"] };
S.FP = {
  nom: (a, b) => `${a === 1 ? "1 " + DEN6[b][0] : a + " " + DEN6[b][1]}`,
  c1: [
    { q: (t, f1, f2) => `A chocolate bar has ${t} squares. Anna eats ${f1} of the bar and Leo eats ${f2}.`, u: "squares", nq: "How many squares are left?", fq: "What fraction of the bar is left?" },
    { q: (t, f1, f2) => `Your allowance is $${t}. You spend ${f1} of it on a book and ${f2} on the movies.`, u: "$", nq: "How many dollars do you have left?", fq: "What fraction of your allowance do you have left?" },
    { q: (t, f1, f2) => `A trail is ${t} km long. On the first day you hike ${f1} of it, and on the second day, ${f2}.`, u: "km", nq: "How many kilometers do you still have to go?", fq: "What fraction of the trail do you still have to go?" },
    { q: (t, f1, f2) => `An album holds ${t} trading cards. You put in ${f1} of them in January and ${f2} in February.`, u: "trading cards", nq: "How many more cards do you need to fill it?", fq: "What fraction of the album is still empty?" },
  ],
  t1_s: (f1, t, b, a, x, f2, d, c, y, q, u) => `Both fractions are of the same whole. ${f1} of ${t} = ${t} ÷ ${b}${a > 1 ? ` × ${a}` : ""} = ${U(x, u)}. ${f2} of ${t} = ${t} ÷ ${d}${c > 1 ? ` × ${c}` : ""} = ${U(y, u)}. That leaves ${t} − ${x} − ${y} = <b>${U(q, u)}</b>.`,
  t1_f: (q, t, f, fs, irr) => `${q} out of ${t} are left: ${irr ? `<b>${f}</b>` : `${f} = <b>${fs}</b> (simplified)`}.`,
  c2: [
    { q: (t, f1, f2) => `You have $${t}. You spend ${f1} of it on a comic book and ${f2} of what is left on a ball. How many dollars do you have left?`, u: "$", max: 120 },
    { q: (t, f1, f2) => `A tank has ${t} liters of water. First ${f1} of the water is used, and then ${f2} of what was left. How many liters are left?`, u: "L", max: 900 },
    { q: (t, f1, f2) => `A book has ${t} pages. You read ${f1} of it on Monday and ${f2} of what is left on Tuesday. How many pages do you still have to read?`, u: "pages", max: 360 },
  ],
  t2_s: (f1, t, b, a, x, r, f2, d, c, y, q, u) => `First, ${f1} of the total: ${t} ÷ ${b}${a > 1 ? ` × ${a}` : ""} = ${U(x, u)}; that leaves ${t} − ${x} = ${U(r, u)}. Then ${f2} <b>of what is left</b> (not of the total): ${r} ÷ ${d}${c > 1 ? ` × ${c}` : ""} = ${U(y, u)}. That leaves ${r} − ${y} = <b>${U(q, u)}</b>.`,
  c3: [
    { q: (f, p) => `On a bike ride, you have gone ${f} of the way, which is ${p} km. How many kilometers long is the ride?`, u: "km", max: 12 },
    { q: (f, p) => `You have put ${p} trading cards in your album, which is ${f} of the album. How many cards does the full album hold?`, u: "trading cards", max: 15 },
    { q: (f, p) => `You spent ${f} of your allowance and you have $${p} left. How many dollars was your allowance?`, u: "$", max: 8, queda: true },
    { q: (f, p) => `You have read ${f} of a book and you have ${p} pages left. How many pages does the book have?`, u: "pages", max: 30, queda: true },
  ],
  t3_queda: (f, fq) => `What you know is the part that is left: 1 − ${f} = ${fq} of the total. `,
  t3_s: (k, b, p, u, t, un, f, nk, n1, nb) => `${cap(nk)} = ${U(p, un)} → ${n1} = ${p} ÷ ${k} = ${U(u, un)} (divide by the numerator) → ${nb} = ${b} × ${u} = <b>${U(t, un)}</b> (multiply by the denominator). Check: ${f} of ${t} = ${t} ÷ ${b} × ${k} = ${p} ✔`,
};

// m6.decdiv
S.DD = {
  q: (D, n) => `Find <b>${D} ÷ ${n}</b>.`,
  vasos_q: (d, D) => `How many ${d}-liter cups can you fill with ${D} liters of juice?`,
  caso: ["The division doesn't come out even: put the decimal point in the quotient and keep adding zeros to the remainder.", "The dividend has a decimal point: put the decimal point in the quotient when you bring down the first decimal digit.", "The divisor has a decimal point: multiply both numbers by 10 or by 100 until it goes away."],
  mult: (kd, p, D, Dp, d, n) => `The divisor has ${kd} ${kd === 1 ? "decimal place" : "decimal places"}: multiply both numbers by ${p}: ${D} × ${p} = ${Dp} and ${d} × ${p} = ${N(n)}. Now divide ${Dp} ÷ ${N(n)}:`,
  ds_ent: (ip, n, q, r) => `${ip} ÷ ${N(n)} = ${q}, remainder ${N(r)}.`,
  ds_cero: (ip, n) => `${N(n)} doesn't go into ${ip}: write 0 in the quotient.`,
  ds_paso: (first, isDec, dig, cur, n, qi, r) => `${isDec ? `Bring down the ${dig}${first ? " (the first decimal digit) and put the decimal point in the quotient" : ""}` : `${first ? "Put the decimal point in the quotient and add" : "Add"} a 0 to the remainder`}: ${N(cur)} ÷ ${N(n)} = ${qi}, remainder ${N(r)}.`,
  fin: (D, n, q) => `${D} ÷ ${N(n)} = <b>${q}</b>.`,
};

// m6.fdp
S.FD = {
  fd_q: f => `Write ${f} as a decimal.`,
  fd_s: "A fraction is a division: divide the numerator by the denominator.",
  df_q: x => `Write <b>${x}</b> as a fraction in simplest form.`,
  uds: { 1: "tenths", 2: "hundredths", 3: "thousandths" },
  df_s: (x, w, u, f, g, fs) => `Read the decimal aloud: ${x} is “${w} ${w === "one" ? u.slice(0, -1) : u}” = ${f}. ${g > 1 ? `Simplify by dividing by ${g}: <b>${fs}</b>.` : `It can't be simplified: <b>${fs}</b>.`}`,
  vf: (f, a, b, x) => `${f} = ${a} ÷ ${b} = ${x}`,
  pct: p => `${p}%`,
  vp: (p, x) => `${p}% = ${x}`,
  cmp_q: (mayor, list) => `Which is the ${mayor ? "greatest" : "least"}: <b>${list}</b>?`,
  cmp_s: (conv, ord, mayor, w) => `Change everything to decimals: ${conv}. In order: ${ord}. The ${mayor ? "greatest" : "least"} is <b>${w}</b>.`,
};

// m6.redondeo
const PLC6 = { "the nearest whole number": "ones", "the nearest tenth": "tenths", "the nearest hundredth": "hundredths" };
S.RD = {
  lugar: ["the nearest whole number", "the nearest tenth", "the nearest hundredth"],
  q: (x, l) => `Round <b>${x}</b> to ${l}.`,
  ctx: [(x, l) => `The stopwatch shows ${x} seconds. Round to ${l}.`, (x, l) => `A container holds ${x} liters of water. Round to ${l}.`, (x, l) => `A package weighs ${x} kg. Round to ${l}.`],
  s: (l, td, nd, res, unid) => `The ${PLC6[l]} digit is ${td}; look at the digit to its right, ${nd}: ${nd >= 5 ? (td === 9 ? "since it is 5 or more, the 9 goes up: it becomes 10, and you regroup 1 to the left, as in addition" : `since it is 5 or more, the ${td} goes up to ${td + 1}`) : `since it is less than 5, the ${td} stays the same`}. The digits to its right are dropped${unid ? " (and so is the decimal point)" : ""}: <b>${res}</b>.`,
};

// m6.razon, m6.cuarto, m6.esprop
S.RA = {
  ctx: [
    { q: (a, b) => `A basket has ${a} apples and ${b} pears. What is the ratio of apples to pears? (Write it as a fraction in simplest form.)`, inv_q: (r, n) => `At a fruit stand, the ratio of apples to pears is ${r}. If there are ${n} pears, how many apples are there?`, u1: "apples", u2: "pears", u1s: "apple", u2s: "pear" },
    { q: (a, b) => `A class has ${a} girls and ${b} boys. What is the ratio of girls to boys? (Write it as a fraction in simplest form.)`, inv_q: (r, n) => `At a summer camp, the ratio of girls to boys is ${r}. If there are ${n} boys, how many girls are there?`, u1: "girls", u2: "boys", u1s: "girl", u2s: "boy" },
    { q: (a, b) => `An animal shelter has ${a} cats and ${b} dogs. What is the ratio of cats to dogs? (Write it as a fraction in simplest form.)`, inv_q: (r, n) => `At a shelter, the ratio of cats to dogs is ${r}. If there are ${n} dogs, how many cats are there?`, u1: "cats", u2: "dogs", u1s: "cat", u2s: "dog" },
    { q: (a, b) => `A pencil case has ${a} pencils and ${b} markers. What is the ratio of pencils to markers? (Write it as a fraction in simplest form.)`, inv_q: (r, n) => `In art class, the ratio of pencils to markers is ${r}. If there are ${n} markers, how many pencils are there?`, u1: "pencils", u2: "markers", u1s: "pencil", u2s: "marker" },
    { q: (a, b) => `To make lemonade, you mix ${a} cups of juice and ${b} cups of water. What is the ratio of juice to water? (Write it as a fraction in simplest form.)`, inv_q: (r, n) => `In a lemonade recipe, the ratio of cups of juice to cups of water is ${r}. If you use ${n} cups of water, how many cups of juice do you need?`, u1: "cups of juice", u2: "cups of water", u1s: "cup of juice", u2s: "cup of water", max: 12 },
  ],
  s: (a, b, fab, g, fr, ra, rb, C) => (g > 1 ? `The ratio is ${a} to ${b} = ${fab}. Simplify by dividing by ${g}: <b>${fr}</b>.` : `The ratio is ${a} to ${b} = <b>${fab}</b> (already in simplest form).`) + ` For every ${ra === 1 ? C.u1s : ra + " " + C.u1}, there ${rb === 1 ? "is 1 " + C.u2s : "are " + rb + " " + C.u2}.`,
  inv_s: (n, rb, k, ra, x, u1, u2) => `For every ${rb} ${one(rb, u2)}, there ${ra === 1 ? "is" : "are"} ${ra} ${one(ra, u1)}. ${n} is ${k} times ${rb} (${n} ÷ ${rb} = ${k}), so there are ${k} × ${ra} = <b>${x}</b> ${u1}.`,
};
S.CU = {
  q: (f1, f2) => `Find x in the proportion ${f1} = ${f2}.`,
  s: (part, o0, o1, prod, ans, other, k, first) => `The cross products are equal: x × ${part} = ${o0} × ${o1} = ${N(prod)}, so x = ${N(prod)} ÷ ${part} = <b>${ans}</b>. ${first ? `(Or: from the first ratio to the second, you multiply by ${k}, so x = ${other} ÷ ${k} = ${ans}.)` : `(Or: from the first ratio to the second, you multiply by ${k}: x = ${other} × ${k} = ${ans}.)`}`,
  p_q: (f1, f2) => `Do the ratios ${f1} and ${f2} form a proportion?`,
  p_s: (a, d, b, c, ad, bc, yes) => `Cross products: ${a} × ${d} = ${N(ad)} and ${b} × ${c} = ${N(bc)}. ${yes ? "They are equal: <b>yes</b>, they form a proportion." : "They are different: <b>no</b>, they don't form a proportion."}`,
  sino: ["Yes", "No"],
};

// m6.directa, m6.inversa, m6.prtipo, m6.prtabla
S.DI = {
  ctx: [
    { q: (a, A, b) => `${a} identical notebooks cost $${A}. How much do ${b} notebooks cost?`, eur: true, u: [50, 300], u1: "notebook", uu: "$", mas: "more notebooks → more money" },
    { q: (a, A, b) => `${a} kg of oranges cost $${A}. How much do ${b} kg cost?`, eur: true, u: [120, 350], u1: "kilogram", uu: "$", mas: "more kilograms → more money" },
    { q: (a, A, b) => `${a} movie tickets cost $${A}. How much do ${b} tickets cost?`, eur: true, u: [400, 900], u1: "ticket", uu: "$", mas: "more tickets → more money" },
    { q: (a, A, b) => `A printer prints ${A} pages in ${a} minutes. How many pages does it print in ${b} minutes?`, u: [8, 30], u1: "minute", uu: " pages", mas: "more minutes → more pages" },
    { q: (a, A, b) => `For ${a} people, you use ${A} g of flour. How many grams do you need for ${b} people?`, u: [40, 120], u1: "person", uu: " g", mas: "more people → more flour" },
  ],
  s: (mas, b, fA, bA, a, fr, u1, fu, uu) => `Direct: ${mas}. Cross-multiply: x = ${b} × ${fA} ÷ ${a} = ${bA} ÷ ${a} = <b>${amt(fr, uu)}</b>. (Or using the unit rate: 1 ${u1} → ${fA} ÷ ${a} = ${amt(fu, uu)}; ${b} → ${b} × ${fu} = ${amt(fr, uu)}.)`,
};
S.IN = {
  ctx: [
    { q: (a, A, b) => `${a} painters take ${A} days to paint a school. How many days would ${b} painters take?`, a: [2, 8], A: [2, 12], mas: m => m ? "more painters → fewer days" : "fewer painters → more days", prod: "days of work", u: "days" },
    { q: (a, A, b) => `With ${a} ${a === 1 ? "faucet" : "identical faucets"}, a tank fills up in ${A} hours. How many hours would it take with ${b} ${b === 1 ? "faucet" : "faucets"}?`, a: [1, 6], A: [2, 12], half: true, horas: true, mas: m => m ? "more faucets → less time" : "fewer faucets → more time", prod: "faucet-hours", u: "hours" },
    { q: (a, A, b) => `At ${a} km/h, a trip takes ${A} ${A === 1 ? "hour" : "hours"}. How many hours would it take at ${b} km/h?`, v: [40, 50, 60, 70, 80, 90, 100, 120], A: [1, 6], half: true, horas: true, mas: m => m ? "higher speed → less time" : "lower speed → more time", prod: "km of the trip", u: "hours" },
    { q: (a, A, b) => `A prize is shared equally among ${a} friends, and each one gets $${A}. How much would each one get if there were ${b} friends?`, a: [2, 8], A: [6, 60], half: true, money: true, mas: m => m ? "more friends → less money for each one" : "fewer friends → more money for each one", prod: "dollars in the prize", u: "$" },
    { q: (a, A, b) => `A shelter has enough food for ${a} people for ${A} days. How many days would it last for ${b} people?`, a: [2, 10], A: [3, 20], mas: m => m ? "more people → fewer days" : "fewer people → more days", prod: "daily rations of food", u: "days" },
  ],
  hmed: (u, h) => ` ${u} (${h} h 30 min)`,
  s: (mas, a, A, P, prod, b, r) => `Inverse: ${mas}. The product stays the same: ${a} × ${A} = ${P} (${prod}). With ${b}: ${P} ÷ ${b} = <b>${String(r).replace(/^1 (hour|day)s\b/, "1 $1")}</b>.`,
};
S.PT = {
  q: s => `How are these quantities related?<br><i>${s}</i>`,
  tipos: ["Directly proportional", "Inversely proportional", "Not proportional"],
  items: [
    ["The number of tickets you buy and the total price", 0], ["The kilograms of bread and what they cost", 0], ["The time and the distance traveled by a train that always goes at the same speed", 0],
    ["The side length of a square and its perimeter", 0], ["The liters of paint and the square meters painted", 0], ["The number of people coming to lunch and the sandwiches you need to make", 0],
    ["The number of painters and the days it takes them to paint a school", 1], ["The speed of a car and the time a trip takes", 1],
    ["The number of people sharing a prize and the amount each one gets", 1], ["The liters a faucet pours each minute and the time it takes to fill a bathtub", 1],
    ["A person's age and their height", 2], ["The side length of a square and its area", 2], ["Shoe size and age", 2], ["The temperature and the time of day", 2],
  ],
  s: [
    "If one doubles, the other doubles too: they are <b>directly proportional</b>.",
    "If one doubles, the other is cut in half: they are <b>inversely proportional</b>.",
    "They are related, but when one doubles, the other neither doubles nor is cut in half: they are <b>not proportional</b>.",
  ],
};
S.TB = {
  dir: [["Tickets", "Price ($)"], ["Hours", "Kilometers"], ["Packages", "Cookies"], ["Boxes", "Pencils"]],
  inv: [["Painters", "Days"], ["Faucets", "Hours"], ["Friends", "$ each"]],
  dir_q: "The two quantities are <b>directly</b> proportional. What number goes in the blank?",
  inv_q: "The two quantities are <b>inversely</b> proportional. What number goes in the blank?",
  dir_s: (yj, xj, k, xh, yh) => `Direct: the quotient is always the same, ${yj} ÷ ${xj} = ${k}. The blank is ${xh} × ${k} = <b>${yh}</b>.`,
  inv_s: (xj, yj, P, xh, yh) => `Inverse: the product is always the same, ${xj} × ${yj} = ${P}. The blank is ${P} ÷ ${xh} = <b>${yh}</b>.`,
};

// m6.aumento and m6.original
// Sales tax instead of VAT (IVA): 8% for everything (in the US there are no reduced rates by product; the rate depends on the state)
S.AU = {
  objs: [["a backpack", 20, 60], ["a pair of sneakers", 30, 90], ["a ball", 10, 40], ["a T-shirt", 10, 30], ["a video game", 30, 70], ["a pair of headphones", 20, 80], ["a bike", 100, 300], ["a scooter", 80, 250]],
  desc_q: (obj, P, p) => `${cap(obj)} costs $${P}, and it is ${p}% off. How much do you pay?`,
  desc_s: (p, q, pc, P, r, dsc) => `With ${anP(p)} ${p}% discount, you pay 100 − ${p} = ${q}% of the price: ${pc} × ${P} = <b>$${r}</b>. (Or: ${p}% of ${P} is $${dsc}, and ${P} − ${dsc} = $${r}.)`,
  subidas: [["the pool membership", 20, 60], ["the movie ticket", 6, 12], ["the soccer club fee", 20, 50], ["the one-day bike rental", 8, 20], ["the end-of-year field trip", 20, 40]],
  aum_q: (obj, P, p) => `${cap(obj)} was $${P}, and the price goes up ${p}%. How much does it cost now?`,
  aum_s: (p, q, pc, P, r, i) => `If the price goes up ${p}%, you pay 100 + ${p} = ${q}% of what it cost before: ${pc} × ${P} = <b>$${r}</b>. (Or: ${p}% of ${P} is $${i}, and ${P} + ${i} = $${r}.)`,
  iva: [["a bike", 8, 120, 400], ["a scooter", 8, 80, 300], ["a pair of headphones", 8, 20, 90], ["a game console", 8, 150, 400], ["a backpack", 8, 20, 60], ["a book", 8, 10, 30], ["a meal at a restaurant", 8, 20, 80]],
  iva_no: (P, p) => (P === 150 || P === 200) && p === 8,   // the prices in the lesson
  iva_q: (obj, P, p) => `${cap(obj)} costs $${P} before sales tax. With ${anP(p)} ${p}% sales tax, how much do you pay?`,
  iva_s: (p, pc, P, i, r, pct) => `Sales tax is an increase: ${p}% of ${P} is ${pc} × ${P} = $${i}. Total: ${P} + ${i} = <b>$${r}</b>. (Or: ${pct} × ${P} = $${r}.)`,
};
S.OR = {
  objs: ["a book", "a board game", "a T-shirt", "a pair of sneakers", "a backpack", "a ball"],
  q: (pay, obj, p) => `I paid $${pay} for ${obj} that was ${p}% off. How much did it cost before the sale?`,
  s10: (p, q, pay, k, d10, O, dsc) => `I paid 100 − ${p} = ${q}% of the price: $${pay} is ${q}%. 10% is ${pay} ÷ ${k} = $${d10}, and 100% is 10 × ${d10} = <b>$${O}</b>. Check: ${p}% of ${O} is $${dsc}, and ${O} − ${dsc} = $${pay} ✔`,
  s25: (pay, q4, O, dsc) => `I paid 100 − 25 = 75%, that is, three-fourths of the price. One-fourth (25%) is ${pay} ÷ 3 = $${q4}, and the whole price is 4 × ${q4} = <b>$${O}</b>. Check: ${O} − ${dsc} = $${pay} ✔`,
  s75: (pay, O, dsc) => `I paid 100 − 75 = 25%, that is, one-fourth of the price: the whole price is 4 × ${pay} = <b>$${O}</b>. Check: 75% of ${O} is $${dsc}, and ${O} − ${dsc} = $${pay} ✔`,
};

// m6.dinero
S.DN = {
  pc: (p, P, v, k, d) => k ? `${p}% of ${P} = ${k === 2 ? "half" : k === 4 ? "one-fourth" : k === 5 ? "one-fifth" : "one-tenth"}: ${P} ÷ ${k} = $${v}` : `${p}% of ${P} = ${d} × ${P} = $${v}`,
  para: ["gifts", "trading cards", "the movies", "snacks"],
  aho_q: (P, a) => `Your allowance is $${P} a month, and you decide to save ${a}% as soon as you get it. How many dollars do you save each month?`,
  pre_q: (P, a, o, c) => `Your allowance is $${P} a month. First you save ${a}%, and then you spend ${o}% on fun. How many dollars do you have left for ${c}?`,
  pre_s: (sa, so, P, va, vo, vr, rest, a, o) => `Savings: ${sa}. Fun: ${so}. You have ${P} − ${va} − ${vo} = <b>$${vr}</b> left (100 − ${a} − ${o} = ${rest}% of your allowance).`,
  objs: [["a ball", 15, 35], ["a pair of skates", 30, 70], ["a board game", 18, 45], ["a pair of headphones", 20, 60], ["a book", 12, 25]],
  plan_q: (o, C, h, s) => `You want to buy ${o} that costs $${C}. ${h ? `You already have $${h} in your piggy bank, and you save` : "You save"} $${s} every week. How many weeks do you need to have enough money?`,
  falta: (C, h, F) => `You still need ${C} − ${h} = $${F}. `,
  plan_s: (F, s, q, r, qs, q1) => `${F} ÷ ${s} = ${q}, remainder ${r}: in ${q} weeks you would have ${q} × ${s} = $${qs}, which is not enough. You need one more week: <b>${q1} weeks</b>.`,
  plan_ok: (F, s, q) => `${F} ÷ ${s} = <b>${q} weeks</b> (${q} × ${s} = $${F}, exactly).`,
  envases: [["coffee", [250, 500], 8, 16], ["rice", [500, 1000], 1, 3], ["cookies", [200, 400, 500], 4, 9], ["cereal", [375, 500, 750], 3, 7], ["cheese", [250, 400, 500], 9, 16]],
  ab: ["A", "B"],
  uni_q: (o, ga, pa, gb, pb) => `${cap(o)}: package A, ${N(ga)} g, costs $${pa}, and package B, ${N(gb)} g, costs $${pb}. Which one is cheaper per kilogram?`,
  uni_s: (L, g, k, p, m, pm, km, u) => g === 1000 ? `${L}: ${N(1000)} g = 1 kg → <b>$${u} per kilogram</b>.` : `${L}: ${g} g = ${k} kg → ${p} ÷ ${k}; multiply both numbers by ${m}: ${pm} ÷ ${km} = <b>$${u} per kilogram</b>.`,
  uni_fin: (w, d) => `Package <b>${w}</b> is cheaper: you save $${d} on each kilogram.`,
  int_q: (C, r, n) => `You put $${C} in a savings account that pays ${r}% interest a year. How many dollars of interest does the bank pay you in ${n === 1 ? "one year" : n + " years"}, if it pays the same amount each year?`,
  int_s: (r, C, d, i, n, t, tot) => `Interest for one year: ${r}% of ${C} = ${d} × ${C} = ${n > 1 ? `$${i}. In ${n} years: ${n} × ${i} = <b>$${t}</b>.` : `<b>$${i}</b>.`} You will have $${tot}.`,
};

// m6.horario (12-hour clock with a.m./p.m.; the 24-hour clock exercise is kept, with its a.m./p.m. pair)
S.HO = {
  h12: true,
  f: ["Hour", "Minutes"],
  dur: (h, m) => h ? `${h} h ${m} min` : `${m} min`,
  ctx: [(s, d) => `A train leaves at ${s}, and the trip takes ${d}. What time does it arrive?`, (s, d) => `A movie starts at ${s} and lasts ${d}. What time does it end?`,
    (s, d) => `You leave home at ${s}, and it takes you ${d} to get to your grandparents' house. What time do you get there?`, (s, d) => `A game starts at ${s} and lasts ${d}, including halftime. What time does it end?`],
  mas_h: (s, h, r) => `${s} + ${h} h = ${/\.$/.test(r) ? r : r + "."}`,
  mas_m: (s, m, r) => `${s} + ${m} min = <b>${r}</b>`,
  mas_m_c: (s, m, h, mm, mr, r) => `${s} + ${m} min: ${mm - m} + ${m} = ${mm} min, and ${mm} min = 1 h ${mr} min: <b>${r}</b>`,
  dec_q: x => `How many minutes are in <b>${x} h</b>?`,
  dec_s: (x, w, wm, f, fm, r) => `${w ? `${w} h = ${w} × 60 = ${wm} min. ` : ""}${f === 0.5 ? "0.5 h is half an hour" : f === 0.25 ? "0.25 h is a quarter of an hour" : "0.75 h is three quarters of an hour"}: ${w ? `${fm} min. In all, ${wm} + ${fm} = <b>${r} min</b>.` : `<b>${r} min</b>.`}${f === 0.5 ? ` (It's not ${w ? w + " h " : ""}50 min!)` : ""}`,
  r24_q: s => `How do you write ${s} on the 24-hour clock?`,
  dice: { m: (h, m) => `${h}:${m} a.m.`, t: (h, m) => `${h}:${m} p.m.`, n: (h, m) => `${h}:${m} p.m. (at night)`, md: (h, m) => `12:${m} p.m. (${m === "00" ? "noon" : "just after noon"})`, mn: (h, m) => `12:${m} a.m. (${m === "00" ? "midnight" : "just after midnight"})` },
  r24_s: {
    m: g => `In the morning (a.m.), the hour doesn't change: <b>${g}</b>.`,
    t: g => `For p.m. times, add 12 to the hour: <b>${g}</b>.`,
    n: g => `At night it is also p.m., so add 12 to the hour: <b>${g}</b>.`,
    md: g => `12 noon is still 12: <b>${g}</b>. (You only add 12 starting at 1 p.m.)`,
    mn: g => `At midnight, the clock starts again from 0: <b>${g}</b>. (There is no “24:…”.)`,
  },
};

// m6.compleja
S.CX = {
  u: { m: "meters", kg: "kilograms", L: "liters" },
  q: (m, u) => `Write <b>${m}</b> in ${u}.`,
  p: (a, op, v, u) => `${a} = ${op} = ${v} ${u}`,
  s: (parts, vals, r, u) => `Change each part to ${u}: ${parts.join("; ")}. Add: ${vals.join(" + ")} = <b>${r} ${u}</b>.`,
};

// m6.volumen and m6.capvol
S.VO = {
  cajas: ["a shoebox", "a pencil case", "a cookie box", "a drawer", "a cereal box"],
  caja_q: (o, a, b, c) => `What is the volume of ${o} that is ${a} cm long, ${b} cm wide, and ${c} cm high? (in cm³)`,
  orto_s: (m, u) => `Volume of a box = length × width × height = ${m} <b>${u}</b>.`,
  cubo_q: a => `What is the volume of a cube with ${a} cm edges? (in cm³)`,
  cubo_s: (a, aa, v) => `Volume of a cube = edge × edge × edge = ${a} × ${a} × ${a} = ${aa} × ${a} = <b>${v} cm³</b>.`,
  sitios: [["a bedroom", [2.5, 3, 2.4]], ["a storage room", [2, 2.5]], ["a small classroom", [3, 2.5]], ["a swimming pool", [1.5, 2]], ["an inflatable pool", [0.5, 1]]],
  hab_q: (s, a, b, c) => `${cap(s)} is ${a} m long, ${b} m wide, and ${c} m high. What is its volume? (in m³)`,
  cv_q: (x, a, b) => `Convert <b>${x} ${a}</b> to ${b}.`,
  cv_s: (a, b, up, x, r) => `For volume, each step of the staircase is worth × 1,000 (1 dm³ = 1,000 cm³, 1 m³ = 1,000 dm³). From ${a} to ${b}, you go ${up ? "up one step: divide by 1,000" : "down one step: multiply by 1,000"}. ${x} ${up ? "÷" : "×"} 1,000 = <b>${r} ${b}</b>.`,
};
S.CV = {
  recip: ["an aquarium", "a fishbowl", "a plastic box", "a rectangular mop bucket"],
  acu_q: (o, a, b, c) => `${cap(o)} is ${a} cm long, ${b} cm wide, and ${c} cm high. How many liters of water does it hold?`,
  acu_s: (a, b, c, da, db, dc, m, v) => `Since 1 dm³ = 1 L, change the measurements to dm: ${a} cm = ${da} dm, ${b} cm = ${db} dm, ${c} cm = ${dc} dm. Volume = ${m} dm³ = <b>${v} L</b>.`,
  peq: ["a syringe", "a medicine cup", "a perfume bottle", "a test tube"],
  ml_q: (o, x) => `${cap(o)} holds ${x} cm³ of liquid. How many milliliters is that?`,
  ml_s: x => `1 cm³ = 1 mL (a thousand 1 cm³ cubes fill 1 dm³, which is 1 L = 1,000 mL): ${x} cm³ = <b>${x} mL</b>.`,
  cml_q: x => `How many liters is <b>${x} cm³</b>?`,
  cml_s: (x, r) => `1,000 cm³ = 1 dm³ = 1 L, so divide by 1,000: ${x} ÷ 1,000 = <b>${r} L</b>.`,
  gran: ["a swimming pool", "a water tank", "a cistern", "a pond"],
  m3_q: (o, x) => `${cap(o)} holds ${x} m³ of water. How many liters is that?`,
  m3_s: (x, r) => `1 m³ = 1,000 dm³ = 1,000 L, so multiply by 1,000: ${x} × 1,000 = <b>${r} L</b>.`,
  dep_q: (a, b, c) => `A tank measures ${a} m × ${b} m × ${c} m. How many liters does it hold?`,
  dep_s: (m, v, l) => `Volume = ${m} m³. Since 1 m³ = 1,000 L: ${v} × 1,000 = <b>${l} L</b>.`,
};

// m6.poligono
S.PO = {
  nom: { 4: "quadrilateral (4 sides)", 5: "pentagon (5 sides)", 6: "hexagon (6 sides)", 7: "heptagon (7 sides)", 8: "octagon (8 sides)", 9: "9-sided polygon", 10: "decagon (10 sides)", 11: "11-sided polygon", 12: "dodecagon (12 sides)" },
  nomReg: { 3: "equilateral triangle", 4: "square", 5: "regular pentagon (5 sides)", 6: "regular hexagon (6 sides)", 8: "regular octagon (8 sides)", 9: "regular 9-sided polygon", 12: "regular dodecagon (12 sides)" },
  suma_q: nm => `What is the sum of the angles of ${art(nm)} ${nm}, in degrees?`,
  suma_s: (n, t, s, bold) => `From one vertex, the polygon splits into ${n} − 2 = ${t} ${t === 1 ? "triangle" : "triangles"}, and each one adds 180°: ${t} × 180° = ${bold ? `<b>${s}°</b>` : `${s}°`}.`,
  reg_q: nm => `How many degrees is each angle of ${art(nm)} ${nm}? (All its angles are equal.)`,
  reg_s: (n, s, a) => `The ${n} angles are equal: ${s}° ÷ ${n} = <b>${a}°</b>.`,
  inv_q: s => `The angles of a polygon add up to ${s}°. How many sides does it have?`,
  inv_s: (s, t, n) => `Each triangle adds 180°: ${s} ÷ 180 = ${t} triangles. The polygon has two more sides than triangles: ${t} + 2 = <b>${n}</b> sides.`,
};

// m6.romboide, m6.compuesta, m6.regular
S.AR = {
  q: f => `Find the area of ${f} (in cm²).`,
  fig: ["this rhomboid", "this rhombus", "this figure"],
  romb_s: (b, h, r, side) => `Area of the rhomboid = base × height = ${b} × ${h} = <b>${r} cm²</b>. (The height, not the slanted side of ${side} cm!)`,
  rombo_s: (D, d, Dd, r) => `Area of the rhombus = longer diagonal × shorter diagonal ÷ 2 = ${D} × ${d} ÷ 2 = ${Dd} ÷ 2 = <b>${r} cm²</b>.`,
  comp_s: (W, w1, H1, a1, w, h2, a2, r) => `Split it into two rectangles. The one on the left: ${w1} × ${H1} = ${a1} cm². The one on the right is ${W} − ${w1} = ${w} cm wide and ${h2} cm high: ${w} × ${h2} = ${a2} cm². Total: ${a1} + ${a2} = <b>${r} cm²</b>.`,
  nreg: { 5: "pentagon", 6: "hexagon", 8: "octagon" },
  reg_q: nm => `Find the area of this regular ${nm} (in cm²).`,
  reg_s: (n, l, p, a, pa, r) => `Perimeter = ${n} × ${l} = ${p} cm. Area = perimeter × apothem ÷ 2 = ${p} × ${a} ÷ 2 = ${pa} ÷ 2 = <b>${r} cm²</b>.`,
};

// m6.ciarea and m6.radio
S.CI = {
  objs: [["a plate", 9, 14], ["a pizza", 12, 20], ["a round table", 40, 70], ["a wall clock", 10, 20], ["a round rug", 50, 100], ["a coaster", 4, 6]],
  area_q: (obj, v, isD) => `${cap(obj)} has a ${isD ? "diameter" : "radius"} of ${v} cm. What is its area, in cm²? (Use π = 3.14.)`,
  rad: (D, r) => `The radius is half the diameter: ${D} ÷ 2 = ${r} cm. `,
  area_s: (r, rr, A) => `Area = π × radius × radius = 3.14 × ${r} × ${r} = 3.14 × ${rr} = <b>${A} cm²</b>.`,
  rad_q: (obj, L) => `The circumference of ${obj} is ${L} cm. What is its radius, in cm? (Use π = 3.14.)`,
  rad_s: (L, L100, r) => `The circumference is C = 2 × 3.14 × radius = 6.28 × radius. To find the radius, undo the multiplication: ${L} ÷ 6.28. Multiply both numbers by 100 to get rid of the decimal point in the divisor: ${L100} ÷ 628 = <b>${r} cm</b>.`,
  diam_q: (obj, L) => `The circumference of ${obj} is ${L} cm. What is its diameter, in cm? (Use π = 3.14.)`,
  diam_s: (L, L100, d) => `The circumference is C = 3.14 × diameter. Undo the multiplication: ${L} ÷ 3.14. Multiply both numbers by 100: ${L100} ÷ 314 = <b>${d} cm</b>.`,
};

// m6.coordenadas
S.CO = {
  q: "What are the coordinates of point P? Write the x first and then the y.",
  hor: x => x > 0 ? `${x} to the right` : x < 0 ? `${-x} to the left` : "no movement left or right",
  ver: y => y > 0 ? `${y} up` : y < 0 ? `${-y} down` : "no movement up or down",
  s: (x, y, hx, vy) => `From the origin (0, 0): first the x (how far right or left) and then the y (how far up or down). P = <b>(${x}, ${y})</b>: ${hx} and ${vy}.`,
};

// m6.redondos
S.RE = {
  cuerpos: ["A cylinder", "A cone", "A sphere"], prisma: "A prism",
  figs: ["a rectangle that turns around one of its sides", "a right triangle that turns around one of the sides of its right angle", "a semicircle that turns around its diameter"],
  figsC: ["A rectangle", "A right triangle", "A semicircle"], circ: "A square",
  gen_q: f => `What solid is formed by ${f}?`,
  fig_q: c => `Which flat shape forms ${c.toLowerCase()} when it turns around an axis?`,
  gen_s: ["A rectangle that turns around one side forms a <b>cylinder</b>: the side on the axis is the height, and the other side is the radius of the bases.",
    "A right triangle that turns around a leg (a side of the right angle) forms a <b>cone</b>: that leg is the height, the other leg is the radius of the base, and the slanted side is the slant height.",
    "A semicircle that turns around its diameter forms a <b>sphere</b> with the same radius as the semicircle."],
  f: ["Radius of the base (cm)", "Height (cm)"],
  med_q: (tri, a, b) => tri ? `A right triangle has legs (the sides of the right angle) of ${a} cm and ${b} cm. It turns around the ${b} cm leg and forms a cone. What are the radius of its base and its height?` : `A ${a} cm × ${b} cm rectangle turns around its ${b} cm side and forms a cylinder. What are the radius of its bases and its height?`,
  med_s: (tri, a, b) => `The side it turns around (${b} cm) is the axis: it is the <b>height</b> of the ${tri ? "cone" : "cylinder"}. The other ${tri ? "leg" : "side"} (${a} cm) goes around and draws the edge of the base: it is the <b>radius</b>. Radius ${a} cm, height ${b} cm.`,
  botes: ["a can of tomatoes", "a soda can", "a tube of potato chips", "a pencil cup", "a pillar candle"],
  eti_q: (o, x, diam) => `The label on ${o} goes all the way around once without overlapping. If it has a ${diam ? "diameter" : "radius"} of ${x} cm, how many centimeters long is the label? (π = 3.14)`,
  eti_s: (r, L) => `The length of the label is the circumference of the base: C = 2 × π × r = 2 × 3.14 × ${r} = 6.28 × ${r} = <b>${L} cm</b>.`,
  eti_d: (d, L) => `The length of the label is the circumference of the base. With the diameter: C = π × d = 3.14 × ${d} = <b>${L} cm</b>.`,
  nom: ["The slant height", "The height", "The radius", "The vertex"],
  elem: [["In a cone, what do you call the segment that goes from the vertex to the center of the base?", 1], ["In a cylinder, what do you call the distance from the center of a base to its edge?", 2],
    ["In a cone, what do you call the point at the top, where the curved surface ends?", 3], ["In a sphere, what do you call the distance from the center to any point on the surface?", 2],
    ["In a cylinder, what do you call the distance between its two bases?", 1]],
  elem_s: ["It is the <b>slant height</b>: it runs along the surface, from the vertex to the edge of the base.", "It is the <b>height</b>: it goes straight, perpendicular to the base (not along the surface, like the slant height).", "It is the <b>radius</b>.", "It is the <b>vertex</b> of the cone."],
};

// m6.movimientos
S.MV = {
  tras_q: (x, y, dx, der, dy, arr) => `Translate point P (${x}, ${y}) ${dx} ${dx === 1 ? "square" : "squares"} to the ${der ? "right" : "left"} and ${dy} ${arr ? "up" : "down"}. What are its new coordinates?`,
  tras_s: (x, dx, nx, y, dy, ny) => `Moving left or right changes the x: ${x} ${dx > 0 ? "+" : "−"} ${Math.abs(dx)} = ${nx}. Moving up or down changes the y: ${y} ${dy > 0 ? "+" : "−"} ${Math.abs(dy)} = ${ny}. New point: <b>(${nx}, ${ny})</b>.`,
  sim_q: (x, y, vert, e) => `What is the reflection of point P (${x}, ${y}) across the ${vert ? `vertical line that goes through ${e} on the horizontal axis` : `horizontal line that goes through ${e} on the vertical axis`} (the blue line of reflection)?`,
  sim_s: (vert, e, p, d, antes, r, res) => `The point is ${antes ? `${e} − ${p}` : `${p} − ${e}`} = ${d} ${d === 1 ? "square" : "squares"} ${vert ? (antes ? "to the left of" : "to the right of") : (antes ? "below" : "above")} the line of reflection. Its reflection is the same distance away, on the other side: ${antes ? `${e} + ${d}` : `${e} − ${d}`} = ${r}. ${vert ? "The y doesn't change" : "The x doesn't change"}: <b>${res}</b>.`,
  giro_q: m => `How many degrees does the minute hand of a clock turn in ${m} minutes?`,
  giro_s: (m, g) => `In 60 minutes it makes a full turn, 360°: each minute it turns 360 ÷ 60 = 6°. In ${m} minutes, ${m} × 6 = <b>${g}°</b>.`,
};

// m6.media, m6.rango, m6.tipovar
S.ME = {
  ctx: [["Goals the team scored in each game", 0, 6, " goals"], ["Lucy's test scores (out of 10)", 4, 10, ""], ["Points a basketball player scored in each game", 2, 24, " points"], ["Minutes it takes Henry to get to school each day", 8, 25, " minutes"], ["Books each student in the group read this term", 0, 9, " books"]],
  q: (c, d) => `${c}: <b>${d}</b>. What is the mean?`,
  s: (sum, s, n, m, u) => `Add all the values: ${sum} = ${s}. Divide by how many there are (${n}): ${s} ÷ ${n} = <b>${m}</b>${u}.`,
};
S.RG = {
  ctx: [["Goals scored in each game at recess", 0, 8, " goals"], ["The class's scores on a test (out of 10)", 1, 10, ""], ["Heights of a group of friends, in cm", 128, 165, " cm"], ["A team's points in each game", 10, 60, " points"]],
  q: (c, d) => `${c}: <b>${d}</b>. What is the range?`,
  s: (mx, mn, r, u) => `The greatest value is ${mx} and the least is ${mn}: range = ${mx} − ${mn} = <b>${r}</b>${u}.`,
  temp_q: d => `Low temperatures for one week in a mountain town, in °C: <b>${d}</b>. What is the range?`,
  temp_s: (mx, mn, amn, r) => `The highest is ${mx} °C and the lowest is ${mn} °C. From ${mn} to 0 there ${String(amn) === "1" ? "is" : "are"} ${amn} ${one(amn, "degrees")}, and from 0 to ${mx}, ${mx} more: range = ${amn} + ${mx} = <b>${r}</b> degrees.`,
};
S.TV = {
  q: v => `What type of statistical variable is “<b>${v}</b>”?`,
  tipos: ["Categorical (words)", "Quantitative (numbers)"],
  items: [["hair color", 0], ["favorite sport", 0], ["month of birth", 0], ["country of birth", 0], ["favorite fruit", 0], ["way of getting to school", 0],
    ["number of siblings", 1], ["number of books read in a year", 1], ["height", 1], ["weight", 1], ["number of goals in a game", 1], ["time it takes to get to school", 1], ["test score", 1]],
  s: ["Its values are words, not numbers: it is <b>categorical</b> (qualitative).", "Its values are numbers (you count them or measure them): it is <b>quantitative</b>."],
};

// m6.frecuencia and m6.esperado
S.FR = {
  ctx: [["favorite fruit", ["apple", "banana", "orange", "strawberry"]], ["favorite sport", ["soccer", "basketball", "swimming", "tennis"]],
    ["number of siblings", ["none", "one", "two", "three"]], ["pet", ["dog", "cat", "fish", "none"]], ["favorite color", ["blue", "red", "green", "yellow"]]],
  lista: (c, l) => `Some people were asked about their ${c}. These are the answers: ${l}.`,
  tabla: (c, n, t) => `We asked ${n} people about their ${c}. Tally: ${t}.`,
  abs_q: v => `What is the absolute frequency of “${v}”?`,
  abs_s: (v, f) => `The absolute frequency is how many times a value appears: count how many times “${v}” comes up: <b>${f}</b>.`,
  rel_q: v => `What is the relative frequency of “${v}”, as a decimal?`,
  rel_s: (v, f, n, r) => `The answer “${v}” appears ${f === 1 ? "1 time" : f + " times"} out of ${n}. Relative frequency = absolute frequency ÷ total number of data values = ${f} ÷ ${n} = <b>${r}</b>.`,
  pc_q: v => `What percent of the answers are “${v}”? (Write only the number.)`,
  pc_s: (r, p) => `As a percent: ${r} × 100 = <b>${p}%</b>.`,
};
S.ES = {
  exps: [[N => `You toss a coin ${N} times`, 1, 2, "to get heads", o => `you get heads ${o} times`],
    [N => `You roll a number cube ${N} times`, 1, 6, "to roll a 6", o => `a 6 comes up ${o} times`],
    [N => `You roll a number cube ${N} times`, 1, 2, "to roll an even number", o => `an even number comes up ${o} times`],
    [N => `You spin a spinner with 4 equal sections of different colors ${N} times`, 1, 4, "it to land on red", o => `it lands on red ${o} times`],
    [N => `You draw a ball ${N} times from a bag with 2 red balls and 3 blue balls (and put it back each time)`, 2, 5, "to draw a red ball", o => `you draw a red ball ${o} times`],
    [N => `You roll a number cube ${N} times`, 1, 3, "to roll a 1 or a 2", o => `a 1 or a 2 comes up ${o} times`]].map(([a, n, d, w, g]) => [{ a, w, g }, n, d]),
  q: (e, N) => `${e.a(N)}. About how many times do you expect ${e.w}?`,
  s: (p, n, d, N, r) => `By Laplace's rule, the probability is ${p}: it comes up ${n === 1 ? "1" : n} out of every ${d} times. In ${N} tries: ${N} ÷ ${d}${n > 1 ? ` × ${n}` : ""} = <b>${r}</b>, approximately. (It may come up a few more or a few fewer times; the more times you do it, the closer the relative frequency gets to ${p}.)`,
  fr_q: (e, M, o) => `${e.a(M)}, and ${e.g(o)}. What is the relative frequency of that outcome, as a decimal?`,
  fr_s: (o, M, r, p, pd) => `Relative frequency = ${o} ÷ ${M} = <b>${r}</b>. It is close to the probability given by Laplace's rule, ${p} ≈ ${pd}: with more tries, it would get even closer.`,
};

// m6.casos and m6.suceso
S.CA = {
  q: e => `How many possible outcomes does this experiment have? <i>${e}</i>`,
  items: [["Tossing a coin.", 2, "heads and tails"], ["Rolling a number cube.", 6, "1, 2, 3, 4, 5, and 6"], ["Tossing two coins.", 4, "heads-heads, heads-tails, tails-heads, and tails-tails"],
    ["Tossing a coin and rolling a number cube.", 12, "T2 rows (heads, tails) and 6 columns (1 to 6): 2 × 6"], ["Rolling two number cubes.", 36, "T6 rows (cube 1) and 6 columns (cube 2): 6 × 6"],
    ["Choosing a day of the week at random.", 7, "the 7 days"], ["Choosing a month of the year at random.", 12, "the 12 months"], ["Spinning a spinner with 8 equal sections numbered 1 to 8.", 8, "the numbers 1 to 8"],
    ["Drawing a vowel at random from a bag with the five vowels.", 5, "a, e, i, o, and u"]],
  s: (n, how) => how[0] === "T" ? `Make a table with ${how.slice(1)} = <b>${n}</b> cells: each cell is a possible outcome.` : `The possible outcomes are ${how}: <b>${n}</b>.`,
  bolas: [n => `Drawing a ball from a bag with ${n} balls numbered 1 to ${n}.`, n => `Choosing a student at random from a class of ${n}.`, n => `Drawing a card from a pile of ${n} different cards.`],
  bolas_s: n => `Any of the ${n} could be picked: there are <b>${n}</b> possible outcomes.`,
};
S.SU = {
  q: s => `What kind of event is this? <i>${s}</i>`,
  tipos: ["Certain", "Possible", "Impossible"],
  col: [["red", "red"], ["blue", "blue"], ["green", "green"], ["yellow", "yellow"]],
  bolsa: (a, c0, b, c1) => `a bag with ${a} ${c0[0]} ${a === 1 ? "ball" : "balls"} and ${b} ${c1[0]} ${b === 1 ? "ball" : "balls"}`,
  una: c => `a ${c[0]} ball`,
  oo: (c0, c1) => `a ${c0[0]} or ${c1[0]} ball`,
  saca: (bolsa, w) => `Drawing ${w} from ${bolsa}.`,
  bs: [
    (c0, c1) => `The bag has ${c0[1]} balls, but also ${c1[1]} ones: you may or may not get one. It is a <b>possible</b> event.`,
    (c0, c1, c2) => `There are no ${c2[0]} balls in the bag: you can never get one. It is an <b>impossible</b> event.`,
    (c0, c1) => `All the balls are ${c0[1]} or ${c1[1]}: you are sure to get one. It is a <b>certain</b> event.`,
  ],
  items: [
    ["Rolling a number less than 7 on a number cube.", 0], ["The sun rising in the east tomorrow.", 0], ["Getting heads or tails when you toss a coin.", 0],
    ["Rolling a 6 on a number cube.", 1], ["Rain next Monday.", 1], ["Rolling an even number on a number cube.", 1],
    ["Rolling a 7 on a regular number cube.", 2], ["Getting heads and tails at the same time with one coin.", 2], ["A day having 25 hours.", 2],
  ],
  s: ["It always happens: it is a <b>certain</b> event (probability 1).", "It may or may not happen: it is a <b>possible</b> event (probability between 0 and 1).", "It can never happen: it is an <b>impossible</b> event (probability 0)."],
};
})();
