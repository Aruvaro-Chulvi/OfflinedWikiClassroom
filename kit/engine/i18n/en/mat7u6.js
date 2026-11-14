/* WikiAula — texts for gen/mat7u6.js (Grade 7 · Unit 6: Proportional Relationships and Percents), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: "a"/"an" before a percent, thousands separators in the steps that the generator writes as plain text
const anP = p => /^8/.test(String(p)) || p === 11 || p === 18 ? "an" : "a";
const grp = s => String(s).replace(/\b\d{4,}\b/g, n => window.WA.H.n(+n));
const usd = (x, m) => m ? "$" + x : x;
Object.assign(S, {
  pr_razon_q: (a, A, b, B, L) => `In ${L}, there are ${a} ${A} and ${b} ${B}. What is the ratio of ${A} to ${B}? (Write it as a fraction in simplest form.)`,
  pr_razon_s: (a, b, r, irred) => irred ? `The ratio is ${a} to ${b} = <b>${r}</b> (it is already in simplest form).` : `The ratio is ${a} to ${b} = ${a}/${b} = <b>${r}</b>.`,
  pr_pares: [["girls", "boys", "a class"], ["cats", "dogs", "an animal shelter"], ["books", "magazines", "a bookcase"], ["apples", "pears", "a fruit bowl"], ["red T-shirts", "blue T-shirts", "a drawer"]],
  pr_cuarto_q: e => `Find the missing term in the proportion: <b>${e}</b>`,
  pr_cuarto_s: (cross, r) => `In a proportion, the cross products are equal: ${grp(cross)} = <b>${r}</b>.`,
  pr_esprop_q: (a, b) => `Do <b>${a}</b> and <b>${b}</b> form a proportion?`,
  pr_esprop_s: (p1, p2, ok) => `Cross products: ${grp(p1)} and ${grp(p2)}. ${ok ? "They are equal, so <b>yes</b>, they form a proportion." : "They are different, so <b>no</b>, they don't form a proportion."}`,
  // Each story with believable data: a and b = values of the first quantity ([min, max]),
  // unit = the value for one unit (picked from the list), eur = an amount of money
  pr_dir: [
    { q: (a, A, b) => `Oranges cost $${A} for ${a} kg. How much do ${b} kg cost, in dollars?`, u: "$", a: [2, 6], b: [2, 10], unit: [0.9, 1.2, 1.5, 1.8, 2, 2.5], eur: true, per: "per kilogram", d: "kg" },
    { q: (a, A, b) => `A car travels ${A} km on ${a} liters of gas. How many kilometers does it travel on ${b} liters?`, u: "km", a: [5, 40], b: [5, 50], unit: [12, 14, 15, 16, 18, 20], per: "km per liter", d: "liters" },
    { q: (a, A, b) => `You need ${A} g of rice for ${a} people. How many grams do you need for ${b} people?`, u: "g", a: [2, 8], b: [2, 12], unit: [60, 70, 75, 80, 90, 100], per: "g per person", d: "people" },
    { q: (a, A, b) => `A printer prints ${A} pages in ${a} minutes. How many pages does it print in ${b} minutes?`, u: "pages", a: [2, 8], b: [2, 15], unit: [10, 12, 15, 20, 24, 30], per: "pages per minute", d: "minutes" },
    { q: (a, A, b) => `If ${a} identical notebooks cost $${A}, how much do ${b} notebooks cost, in dollars?`, u: "$", a: [2, 6], b: [3, 12], unit: [1.2, 1.5, 1.8, 2, 2.5, 3], eur: true, per: "per notebook", d: "notebooks" },
    { q: (a, A, b) => `A faucet pours ${A} liters of water in ${a} minutes. How many liters does it pour in ${b} minutes?`, u: "L", a: [2, 6], b: [3, 20], unit: [6, 8, 10, 12, 15], per: "L per minute", d: "minutes" },
    { q: (a, A, b) => `Maya earns $${A} for ${a} hours of work. How much does she earn for ${b} hours, in dollars?`, u: "$", a: [2, 8], b: [3, 40], unit: [9, 10, 12, 15, 18, 20], eur: true, per: "per hour", d: "hours" },
  ],
  pr_dir_s: (a, A, b, r) => `The quantities are directly proportional (if one doubles, the other doubles too). Find the unit rate: ${usd(A, r.m)} ÷ ${a} = ${usd(r.unit, r.m)} ${r.per}; for ${b} ${r.d}, ${usd(r.unit, r.m)} · ${b} = <b>${r.v}</b>.`,
  pr_inv: [
    { q: (a, A, b) => `It takes ${a} painters ${A} days to paint a building. How many days would it take ${b} painters?` },
    { q: (a, A, b) => `With ${a} identical faucets, a tank fills up in ${A} hours. How many hours would it take with ${b} faucets?` },
    { q: (a, A, b) => `At ${a} km/h, a trip takes ${A} hours. How many hours would it take at ${b} km/h?` },
    { q: (a, A, b) => `At a shelter, the food will last ${A} days for ${a} people. How many days would it last for ${b} people?` },
  ],
  pr_inv_s: (a, A, b, p, r) => `The quantities are inversely proportional (if one doubles, the other is cut in half): the product stays the same, ${a} · ${A} = ${p}. So ${p} ÷ ${b} = <b>${r}</b>.`,
  pr_tabla_q: (inv, t) => `${inv ? "Quantities A and B are inversely proportional." : "Quantities A and B are directly proportional."} Complete the table:${t}`,
  pr_tabla_s: (inv, x0, y0, p, k, xh, yh) => inv ? `The product A · B stays the same: ${x0} · ${y0} = ${p}. The missing value is ${p} ÷ ${xh} = <b>${yh}</b>.` : `The quotient B ÷ A stays the same: ${y0} ÷ ${x0} = ${k}. The missing value is ${xh} · ${k} = <b>${yh}</b>.`,
  pr_tipo_q: s => `How are these two quantities related?<br><i>${s}</i>`,
  pr_tipos: ["Directly proportional", "Inversely proportional", "Not proportional"],
  pr_tipo_items: [
    ["The number of tickets you buy and the total price", 0], ["The kilograms of bread you buy and what they cost", 0], ["The time and the distance traveled at a constant speed", 0],
    ["The side length of a square and its perimeter", 0], ["The liters of paint and the square meters painted", 0],
    ["The number of painters and the time it takes them to paint a house", 1], ["The speed of a car and the time a trip takes", 1],
    ["The number of people who share a prize and the amount each one gets", 1], ["The liters per minute that a faucet pours and the time it takes to fill a bathtub", 1],
    ["A person's age and their height", 2], ["The side length of a square and its area", 2], ["A person's shoe size and their age", 2], ["The temperature and the time of day", 2],
  ],
  pr_tipo_s: [
    "If one doubles, the other doubles too: they are <b>directly proportional</b>.",
    "If one doubles, the other is cut in half: they are <b>inversely proportional</b>.",
    "They are related, but not proportionally (neither the quotient nor the product stays the same): they are <b>not proportional</b>.",
  ],
  pc_q: e => `Calculate: <b>${e}</b>`,
  pc_de_e: (p, c) => `${p}% of ${c}`,
  pc_de_s: (p, c, r) => `${p}% of ${c} = ${c} · ${p} ÷ 100 = <b>${r}</b>.`,
  pc_que_q: (a, b) => `What percent of ${b} is ${a}?`,
  pc_que_s: (a, b, r) => `Divide the part by the whole and multiply by 100: ${a} ÷ ${b} · 100 = <b>${r}%</b>.`,
  pc_tot_q: (p, a) => `If ${p}% of a number is ${a}, what is the number?`,
  pc_tot_s: (p, a, r) => `If ${p}% is ${a}, then 1% is ${a} ÷ ${p}, and 100% is ${a} ÷ ${p} · 100 = <b>${r}</b>.`,
  pc_hint_pct: "Type just the number, without the % sign",
  pc_aum_q: (x, p, up) => up ? `A price of $${x} goes up ${p}%. What is the new price, in dollars?` : `An item that costs $${x} is ${p}% off. How much does it cost now, in dollars?`,
  pc_aum_s: (x, i, r, up) => `To ${up ? "increase" : "decrease"} an amount by a percent, multiply it by the multiplier ${i}: $${x} · ${i} = <b>$${r}</b>.`,
  pc_orig_q: (y, p) => `After ${anP(p)} ${p}% markdown, a jacket costs $${y}. How much did it cost before the sale, in dollars?`,
  pc_orig_s: (y, i, r) => `Sale price = original price · ${i}, so original price = $${y} ÷ ${i} = <b>$${r}</b>.`,
  pc_conv_q1: p => `Write <b>${p}%</b> as a fraction in simplest form.`,
  pc_conv_s1: (p, r) => `${p}% = ${p}/100 = <b>${r}</b>.`,
  pc_conv_q2: x => `Write <b>${x}</b> as a percent.`,
  pc_conv_s2: (x, r) => `Multiply by 100: ${x} · 100 = <b>${r}%</b>.`,
  pc_conv_q3: f => `Write <b>${f}</b> as a percent.`,
  pc_conv_s3: (n, d, x, r) => `Fraction → percent: write it as a decimal and multiply by 100: ${n} ÷ ${d} = ${x}; ${x} · 100 = <b>${r}%</b>.`,
  // sales tax rate in m7.pc.iva (US: one rate; it depends on the state)
  pc_iva_p: [8],
  // amounts before tax that m7.pc.iva avoids: the lesson uses $300 → $324 and a $108 bill ($100 + $8)
  pc_iva_no: [100, 300, 80, 120, 250],
  pc_iva_q: (x, p) => `A bill comes to $${x} before tax. How much is it with ${anP(p)} ${p}% sales tax, in dollars?`,
});
})();
