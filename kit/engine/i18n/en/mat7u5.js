/* WikiAula — texts for gen/mat7u5.js (Grade 7 · Unit 5: Decimals), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: "1 step" / "2 steps", and thousands separators for the numbers of 4 or more digits
// that the generator writes without formatting ("5832 − 58 = 5774" → "5,832 − 58 = 5,774")
const steps = n => n === 1 ? "1 step" : `${n} steps`;
const grp = s => String(s).replace(/\d{4,}/g, m => window.WA.H.n(+m));
Object.assign(S, {
  dc_q: e => `Evaluate: <b>${e}</b>`,
  dc_tipo_q: f => `Without dividing, what type of decimal is <b>${f}</b>?`,
  dc_tipos: ["Terminating decimal", "Pure repeating decimal", "Mixed repeating decimal"],
  dc_tipo_s: (f, fac, t) => `The fraction ${f} is in simplest form, and its denominator is ${fac}. ${t}`,
  dc_tipo_s2: (f, k, f1, fac, t) => `Careful! The fraction ${f} is not in simplest form: simplify it first by dividing by ${k}: ${f} = ${f1}. The denominator of the simplified fraction is ${fac}. ${t}`,
  dc_tipo_t: [
    "Its only prime factors are 2 and 5: it is a <b>terminating decimal</b>.",
    "It has no 2s and no 5s: it is a <b>pure repeating decimal</b>.",
    "It has a 2 or a 5 and other factors too: it is a <b>mixed repeating decimal</b>.",
  ],
  dc_per_q: f => `Write the repeating block of the decimal form of <b>${f}</b> (just the digits that repeat).`,
  dc_per_s: (f, dec, p, n, d, rests, r, ante) => `Divide: ${n} ÷ ${d}. The remainders are ${rests.join(", ")}… and then ${r} appears again: when a remainder repeats, the digits repeat. ` +
    `${f} = ${dec}…${ante ? (ante.length > 1 ? ` The digits ${ante} come before the repeating block (the non-repeating part).` : ` The digit ${ante} comes before the repeating block (the non-repeating part).`) : ""} The digits that repeat are <b>${p}</b>.` +
    (p[0] === "0" ? " The 0 is part of the repeating block, not of the non-repeating part." : ""),
  // Unit conversions (m7.dec.unidades)
  met_fam: [
    { u: ["km", "hm", "dam", "m", "dm", "cm", "mm"], lo: 0, hi: 6 },
    { u: ["kg", "hg", "dag", "g", "dg", "cg", "mg"], lo: 0, hi: 6 },
    { u: ["kL", "hL", "daL", "L", "dL", "cL", "mL"], lo: 1, hi: 6 },
  ],
  met_q: (v, a, b) => `Convert <b>${v} ${a}</b> to <b>${b}</b>. Use a decimal point if you need one.`,
  met_s: (v, a, b, path, st, r) => { const n = Math.abs(st), f = ["", "10", "100", "1,000"][n], w = ["", "one place", "two places", "three places"][n];
    return `From ${a} to ${b}, you go ${st > 0 ? "down" : "up"} ${steps(n)} (${(st > 0 ? path : path.slice().reverse()).join(" → ")}): ` +
      `${st > 0 ? "multiply" : "divide"} by ${f}, and the decimal point jumps ${w} to the ${st > 0 ? "right" : "left"}${st < 0 ? " (if you run out of digits, write zeros)" : ""}. ${v} ${a} = <b>${r} ${b}</b>.`; },
  met_suma_q: (a, ua, b, ub, u) => `Add ${a} ${ua} + ${b} ${ub}. Give your answer in <b>${u}</b>.`,
  met_suma_s: (a, ua, b, ub, n, toSmall, aSmall, bBig, r) => `First write both measurements in the same unit, ${toSmall ? ub : ua}. ` +
    (toSmall ? `${a} ${ua} = ${aSmall} ${ub} (${steps(n)} down: the decimal point jumps to the right). Total: ${aSmall} + ${b} = <b>${r} ${ub}</b>.`
      : `${b} ${ub} = ${bBig} ${ua} (${steps(n)} up: the decimal point jumps to the left). Total: ${a} + ${bBig} = <b>${r} ${ua}</b>.`),
  dc_hint_digits: "Write just the digits. Example: 36",
  dc_sum_s: (e, r) => `Line up the decimal points (fill in with zeros if you need to) and compute: ${e} = <b>${r}</b>.`,
  dc_mul_s: (a, b, ia, ib, p, k, r) => `Multiply without the decimal points: ${ia} · ${ib} = ${p}. The two factors have ${k} decimal ${k === 1 ? "place" : "places"} in all, so the product has ${k}: <b>${r}</b>.`,
  dc_div_s: (a, b, m, a2, b2) => `The divisor has a decimal point: multiply both numbers by ${m} to get rid of it: ${a} · ${m} = ${a2} and ${b} · ${m} = ${b2}. Now divide ${a2} by ${b2}:`,
  dc_div_s1: "The dividend has a decimal point and the divisor doesn't: divide as you do with whole numbers, and put the decimal point in the quotient when you bring down the first decimal digit.",
  dc_div_s2: "Neither number has a decimal point, but the division doesn't come out even: when you run out of digits, put a decimal point in the quotient and bring down a zero.",
  dc_ld_ent: (I, d, q, r) => `${I} ÷ ${d} = ${q}, remainder ${r}.`,
  dc_ld_cero: (I, d) => `${I} ÷ ${d}: since ${I} is less than ${d}, write 0 in the quotient (remainder ${I}).`,
  dc_ld_paso: (primero, bajo, next, num, d, c, r) => `${primero ? "Put the decimal point in the quotient and " + (bajo ? `bring down the ${next} (the first decimal digit)` : "bring down a zero") : bajo ? `Bring down the ${next}` : "Bring down a zero"}: ${num} ÷ ${d} = ${c}, remainder ${r}.`,
  dc_ld_fin: q => `Remainder 0: the quotient is <b>${q}</b>.`,
  dc_gen_den: (n9, n0, den) => n0 ? `as many 9s as there are digits in the repeating block (${n9}), followed by as many 0s as there are digits in the non-repeating part (${n0}): ${den}` : `as many 9s as there are digits in the repeating block: ${den}`,
  dc_p10_dir: ["right", "left"],
  dc_p10_s: (op, k, dir, r) => `${op === "mul" ? "Multiplying" : "Dividing"} by a 1 followed by ${k} ${k === 1 ? "zero" : "zeros"} moves the decimal point ${k} ${k === 1 ? "place" : "places"} to the ${dir}: <b>${r}</b>.`,
  dc_red_q: (x, pos) => `Round <b>${x}</b> to the nearest ${pos}.`,
  dc_trunc_q: (x, pos) => `Truncate <b>${x}</b> to the ${pos}s (cut off the extra digits without rounding).`,
  dc_pos: ["whole number", "tenth", "hundredth", "thousandth"],
  dc_red_s: (look, up, r) => `The next digit is ${look}: ${up ? "since it is 5 or more, the digit before it goes up by 1" : "since it is less than 5, the digit before it stays the same"}. Result: <b>${r}</b>.`,
  dc_trunc_s: r => `Truncating means cutting off the extra digits without looking at them: <b>${r}</b>.`,
  dc_may_q: big => `Which of these numbers is the ${big ? "greatest" : "least"}?`,
  dc_may_s: (list, r) => `Give them all the same number of decimal places and compare digit by digit: ${list}. The answer is <b>${r}</b>.`,
  dc_f2d_q: f => `Write <b>${f}</b> as a decimal.`,
  dc_f2d_s: (n, d, r) => `Divide the numerator by the denominator: ${n} ÷ ${d} = <b>${r}</b>.`,
  dc_d2f_q: x => `Write <b>${x}</b> as a fraction in simplest form.`,
  dc_d2f_s: (x, f0, r) => `Write the number without the decimal point over a 1 followed by as many zeros as there are decimal places: ${x} = ${f0 === r ? `<b>${r}</b> (it is already in simplest form)` : `${f0} = <b>${r}</b>`}.`,
  dc_gen_q: x => `Find the fraction that generates the decimal <b>${x}</b>, and simplify it.`,
  dc_gen_s: (num, den, f0, r) => `Numerator: the number without the decimal point minus the part that does not repeat, ${grp(num)}. Denominator: ${den}. Fraction: ${f0 === r ? `<b>${r}</b>` : `${f0} = <b>${r}</b>`}.`,
  dc_prob: [
    { q: (n, p, u) => `You buy ${n} ${u} for $${p} each. How much do you pay, in dollars?`, k: "mul",
      s: (n, p, r) => `Multiply: ${n} · ${p} = <b>$${r}</b>.` },
    { q: (a, b) => `Your purchase comes to $${a}, and you pay with a $${b} bill. How much change do you get, in dollars?`, k: "sub",
      s: (a, b, r) => `Subtract: ${b} − ${a} = <b>$${r}</b>.` },
    { q: (t, n) => `A ribbon ${t} m long is cut into ${n} equal pieces. How long is each piece, in meters?`, k: "div",
      s: (t, n, r) => `Divide: ${t} ÷ ${n} = <b>${r}</b> m.` },
  ],
  dc_units: ["notebooks", "pens", "tickets", "ice cream cones"],
});
})();
