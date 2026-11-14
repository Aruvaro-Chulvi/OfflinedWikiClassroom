/* WikiAula — texts for gen/mat7u12.js (Grade 7 · Unit 12: Statistics and Probability), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: whole numbers with the separators of the language, "1 time" / "2 times", ordinals ("3rd")
const N = n => window.WA.H.n(n);
const times = n => n === 1 ? "time" : "times";
const ord = n => window.WA.H.ord(n);
Object.assign(S, {
  es_var_q: v => `What type of statistical variable is “<b>${v}</b>”?`,
  es_vars: ["Categorical", "Discrete quantitative", "Continuous quantitative"],
  es_var_items: [
    ["hair color", 0], ["favorite sport", 0], ["cell phone brand", 0], ["country of birth", 0], ["blood type", 0],
    ["number of siblings", 1], ["number of books read in a year", 1], ["score on a multiple-choice test (from 0 to 10, whole numbers only)", 1], ["number of pets", 1], ["number of goals in a game", 1],
    ["height", 2], ["weight", 2], ["time it takes to get to school", 2], ["high temperature of the day", 2], ["length of a jump", 2],
    ["ZIP code", 0, "It is a number, but it is a label, not an amount: it makes no sense to add ZIP codes or find their mean. It is <b>categorical</b>."],
    ["a player's jersey number", 0, "It is a number, but it only tells the players apart: it makes no sense to add jersey numbers. It is <b>categorical</b>."],
    ["phone number", 0, "It is a number, but it is not an amount: it is used to make calls, and it makes no sense to add phone numbers or find their mean. It is <b>categorical</b>."],
  ],
  es_var_s: [
    "Its values are qualities, not numbers: it is <b>categorical</b>.",
    "Its values are numbers that you count (0, 1, 2…), with no values in between: it is <b>discrete quantitative</b>.",
    "Its values are numbers that you measure (with a tape measure, a clock, a scale…), and it can take any value in between: it is <b>continuous quantitative</b>.",
  ],
  es_datos: d => `Here are the data values: <b>${d}</b>.`,
  es_frec_q: v => ` What is the absolute frequency of the value <b>${v}</b>?`,
  es_frec_s: (v, n) => `The absolute frequency is the number of times the value appears: the value ${v} appears <b>${n}</b> ${times(n)}.`,
  es_frel_q: v => ` What is the relative frequency of the value <b>${v}</b>? (Write it as a fraction in simplest form.)`,
  es_frel_s: (n, N, r) => `Relative frequency = absolute frequency ÷ total number of data values = ${n}/${N} = <b>${r}</b>.`,
  // With the tally: how many times the value appears and how many data values there are; simplify the fraction only if possible
  es_frel_s2: (v, n, N, f0, r) => `Count: the value ${v} appears ${n} ${times(n)}. Total number of data values: ${N}. Relative frequency = absolute frequency ÷ total = `
    + (r ? `${f0} = <b>${r}</b> (simplifying).` : `<b>${f0}</b>, which is already in simplest form.`),
  // m7.es.frecrel
  es_fr2: {
    fa: "Absolute frequency",
    tablas: [
      ["Pet", ["dog", "cat", "fish", "none"]],
      ["Sport", ["soccer", "basketball", "swimming", "other"]],
      ["Way to school", ["walking", "bus", "car", "bike"]],
      ["Siblings", ["0", "1", "2", "3"]],
      ["Fruit", ["apple", "banana", "orange"]],
      ["Test grade", ["F", "C", "B", "A"]],
    ],
    total: (sum, N) => `Total number of data values: ${sum} = ${N}. `,
    rel_q: (tab, c) => `In this frequency table:${tab}What is the relative frequency of “${c}”? Write it as a decimal.`,
    rel_s: (n, N, d) => `Relative frequency = absolute frequency ÷ total = ${n} ÷ ${N} = <b>${d}</b>.`,
    pct_q: (tab, c) => `In this frequency table:${tab}What percent of the data values are “${c}”?`,
    pct_s: (n, N, d, p) => `Relative frequency: ${n} ÷ ${N} = ${d}. To write it as a percent, multiply by 100: <b>${p}%</b>.`,
    encuestas: [["prefer to go to the beach on vacation", "people"], ["have a pet", "people"], ["read at least one book a month", "people"], ["walk to school", "students"]],
    // "walk to school" goes with "students" (the solution says "students" too)
    inv_q: (N, p, que) => { const who = /school/.test(que) ? "students" : "people"; return `In a survey of ${N} ${who}, ${p}% ${que}. How many ${who} is that?`; },
    inv_s: (N, p, r, cosa) => `As in the unit on percents: ${p}% of ${N} is ${N} · ${p} ÷ 100 = ${window.WA.H.n(N * p)} ÷ 100 = <b>${r}</b> ${r === 1 ? (cosa === "students" ? "student" : "person") : cosa}.`
      + (p % 10 === 0 ? ` (Mental math: 10% of ${N} is ${N / 10}${p === 10 ? "" : `, and ${p}% is ${p / 10} times as much`}.)` : ""),
  },
  es_mediana_s2: (sorted, n, pos, cen, r) => `Put the data values in order: ${sorted}. There are ${n} values. `
    + (pos.length === 1 ? `The middle one is the ${ord(pos[0])}: the median is <b>${r}</b>.`
      : `Since that is an even number, there are two middle values: the ${ord(pos[0])} and the ${ord(pos[1])}, ${cen[0]} and ${cen[1]}. Median: (${cen[0]} + ${cen[1]}) ÷ 2 = ${cen[0] + cen[1]} ÷ 2 = <b>${r}</b>.`),
  es_media_q: " Find the mean (round to the nearest hundredth if needed).",
  es_media_s: (xs, sum, n, exact, r) => `Add the data values: ${xs} = ${sum}. There are ${n} values. Mean: ${sum} ÷ ${n} = ${exact ? `${exact} ≈ <b>${r}</b>` : `<b>${r}</b>`}.`,
  es_mediana_q: " Find the median.",
  es_mediana_s: (sorted, r, even) => `Put the data values in order: ${sorted}. ${even ? "Since there is an even number of values, the median is the mean of the two middle values" : "The median is the middle value"}: <b>${r}</b>.`,
  es_moda_q: " What is the mode?",
  es_moda_s: (v, n) => `The mode is the value that appears most often: <b>${v}</b> (${n} ${times(n)}).`,
  es_rango_q: " What is the range?",
  es_rango_s: (M, m, r) => `Range = greatest value − least value = ${M} − ${m} = <b>${r}</b>.`,
  es_barras_q: (cat) => `The graph shows the favorite fruit of the students in a class. How many students chose <b>${cat}</b>?`,
  es_barras_tot_q: "The graph shows the favorite fruit of the students in a class. How many students are there in all?",
  es_barras_s: (r) => `Read the height of the bar on the vertical axis: <b>${r}</b>.`,
  es_barras_tot_s: (sum, r) => `Add all the bars: ${sum} = <b>${r}</b>.`,
  es_frutas: ["apple", "banana", "orange", "strawberry", "pear", "grape"],
  es_sect_q: (n, N) => `In a survey of ${N} people, ${n === 1 ? "1 person" : n + " people"} chose option A. How many degrees should that option get in a circle graph?`,
  es_sect_s: (n, N, g, r) => `The whole circle (360°) stands for the ${N} people, so each person gets 360° ÷ ${N} = ${g}°. For ${n === 1 ? "1 person" : n + " people"}: ${n} · ${g}° = <b>${r}°</b>.`,
  pb_q: e => `${e} (Write the probability as a fraction in simplest form.)`,
  pb_dado: [
    ["You roll a number cube. What is the probability of rolling an even number?", [3, 6]],
    ["You roll a number cube. What is the probability of rolling a 5?", [1, 6]],
    ["You roll a number cube. What is the probability of rolling a number greater than 4?", [2, 6]],
    ["You roll a number cube. What is the probability of rolling a multiple of 3?", [2, 6]],
    ["You roll a number cube. What is the probability of rolling a number less than 3?", [2, 6]],
    ["You roll a number cube. What is the probability of rolling a prime number?", [3, 6]],
  ],
  pb_urna_q: (cols, pick) => `A bag has ${cols}. You draw a ball without looking. What is the probability that it is ${pick}?`,
  pb_bolas: (n, c) => `${n} ${n === 1 ? c[0] + " ball" : c[1] + " balls"}`,
  pb_lista: l => l.length === 2 ? l[0] + " and " + l[1] : l.slice(0, -1).join(", ") + ", and " + l[l.length - 1],
  pb_colores: [["red", "red"], ["blue", "blue"], ["green", "green"], ["yellow", "yellow"]],
  // m7.pb.frecrel (lesson "Chance and Frequency")
  pb_fr: {
    exps: [["a thumbtack", "point up"], ["a plastic cup", "upright"], ["a bottle cap", "open side up"], ["a bent coin", "heads up"], ["a four-sided die", "showing a 1"], ["a clothespin", "on its side"]],
    est_q: (obj, n, suc, k) => `You toss ${obj} ${N(n)} times, and it lands ${suc} in ${N(k)} of them. Estimate the probability that it lands ${suc} (as a decimal).`,
    est_s: (k, n, f) => `Estimate the probability with the relative frequency, which gets closer to the probability when there are many trials: ${N(k)} ÷ ${N(n)} = <b>${f}</b>.`,
    probs: [[[1, 6], "rolling a 5 on a number cube"], [[1, 2], "getting heads when you toss a coin"], [[1, 4], "drawing a heart from a standard deck of cards (52 cards)"], [[1, 3], "a spinner with 3 equal sections landing on red"], [[2, 5], "drawing a blue ball from a bag with 2 blue balls and 3 red balls"], [[3, 10], "winning a prize in a raffle with 3 prizes for every 10 tickets"]],
    esp_q: (txt, p, n) => `The probability of ${txt} is ${p}. If you repeat the experiment ${N(n)} times, about how many times do you expect it to happen?`,
    esp_s: (p, n, den, num, e) => `You expect it to happen ${p} of the time: ${p} of ${N(n)} = ${N(n)} ÷ ${den}${num === 1 ? "" : ` · ${num}`} = <b>${N(e)}</b> times, approximately (it doesn't have to be exact).`,
    dado_q: (n, k) => `You roll a number cube ${N(n)} times, and a 6 comes up ${N(k)} times. Does the number cube seem to be loaded?`,
    dado_s: (k, n, f, t, ex) => `Relative frequency of the 6: ${N(k)} ÷ ${N(n)} ${ex ? "=" : "≈"} ${f}. On a fair number cube, the probability is 1/6 ≈ 0.17. `
      + (t ? `With so many rolls, ${f} is very far from 0.17: <b>yes</b>, it seems to be loaded.` : `The result, ${f}, is very close to 0.17: <b>no</b>, it does not seem to be loaded.`),
    nombres: ["Anna", "Luke", "Maya", "Paul", "Iris", "Henry"],
    fiable_q: (a, na, fa, b, nb, fb) => `To estimate the probability that a thumbtack lands point up, ${a} tossed it ${N(na)} times and got a relative frequency of ${fa}; ${b} tossed it ${N(nb)} times and got ${fb}. Which estimate is more reliable?`,
    fiable_s: (w, nmax, nmin) => `The more times you repeat the experiment, the closer the relative frequency gets to the probability. <b>${w}</b>'s estimate (${N(nmax)} tosses) is more reliable than the one from only ${N(nmin)}.`,
  },
  pb_urna_s: (sum, tot, fav, col) => `Possible outcomes: all the balls, ${sum} = ${tot}. Favorable outcomes: the ${col} ${fav === 1 ? "one" : "ones"}, ${fav}.`,
  pb_s: (fav, tot, f0, r) => `Laplace's rule: favorable outcomes ÷ possible outcomes (${fav} out of ${tot}) = ${f0 === r ? `<b>${r}</b>` : `${f0} = <b>${r}</b>`}.`,
  pb_tipo_q: s => `What kind of event is this? <i>${s}</i>`,
  pb_tipos: ["Certain", "Neither certain nor impossible", "Impossible"],
  pb_tipo_items: [
    ["Rolling a number less than 7 on a number cube.", 0], ["The sun rising in the east tomorrow.", 0], ["Getting heads or tails when you toss a coin.", 0],
    ["Rolling a 6 on a number cube.", 1], ["Rain next Monday.", 1], ["Drawing a heart from a standard deck of cards.", 1],
    ["Rolling a 7 on a regular number cube.", 2], ["Drawing a green ball from a bag with only red and blue balls.", 2], ["Getting heads and tails at the same time with one coin.", 2],
  ],
  pb_tipo_s: ["It always happens: it is a <b>certain</b> event (probability 1).", "It may or may not happen: it is <b>neither certain nor impossible</b> (probability between 0 and 1).", "It can never happen: it is an <b>impossible</b> event (probability 0)."],
  pb_esp_q: e => `How many possible outcomes does this experiment have? <i>${e}</i>`,
  pb_esp_items: [["Tossing a coin.", 2, "heads and tails"], ["Rolling a number cube.", 6, "1, 2, 3, 4, 5, and 6"], ["Tossing two coins.", 4, "HH, HT, TH, and TT (H is heads and T is tails)"],
    ["Tossing three coins.", 8, "each of the 2 outcomes of the first coin combines with the 2 outcomes of the second coin and the 2 outcomes of the third: 2 · 2 · 2"],
    ["Rolling two number cubes.", 36, "each of the 6 outcomes of the first number cube combines with the 6 outcomes of the second: 6 · 6"],
    ["Tossing a coin and rolling a number cube.", 12, "each of the 2 outcomes of the coin combines with the 6 outcomes of the number cube: 2 · 6"], ["Choosing a day of the week at random.", 7, "the 7 days"]],
  pb_esp_s: (n, how) => `The possible outcomes make up the sample space: ${how}. In all, there are <b>${n}</b>.`,
});
})();
