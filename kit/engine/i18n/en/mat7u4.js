/* WikiAula — texts for gen/mat7u4.js (Grade 7 · Unit 4: Fractions), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: numbers with the separators of the language, and amounts with the "$" in front ("$120", "120 km")
const N = n => window.WA.H.n(n);
const U = (x, u) => !u ? String(x) : u === "$" ? "$" + x : `${x} ${u}`;
// Thousands separators for the products that the generator writes without formatting ("30 · 49 = 1470" → "1,470")
const grp = s => String(s).replace(/\d{4,}/g, m => window.WA.H.n(+m));
Object.assign(S, {
  fr_q: e => `Evaluate: <b>${e}</b>`,
  fr_hint_simp: "Write your answer in simplest form. Example: 3/4",
  fr_comp_q: e => `Fill in the box so that the fractions are equivalent: <b>${e}</b>`,
  fr_comp_s: (k, mult, r) => `To get from one fraction to the other, ${mult ? "multiply" : "divide"} the numerator and the denominator by ${k}: the missing number is <b>${r}</b>.`,
  fr_simp_q: f => `Write the fraction in simplest form: <b>${f}</b>`,
  fr_simp_s: (g, f, r) => `Divide the numerator and the denominator by their GCF, ${g}: ${f} = <b>${r}</b>.`,
  fr_eq_q: (a, b) => `Are <b>${a}</b> and <b>${b}</b> equivalent?`,
  fr_eq_s: (p1, p2, ok) => `Cross products (the numerator of each fraction times the denominator of the other): ${grp(p1)} and ${grp(p2)}. ${ok ? "They are equal, so <b>yes</b>, the fractions are equivalent." : "They are different, so <b>no</b>, the fractions are not equivalent."}`,
  fr_graf_q: "What fraction of the shape is shaded?",
  fr_graf_s: (n, d, r) => `There are ${d} equal parts, and ${n} ${n === 1 ? "is" : "are"} shaded: <b>${r}</b>.`,
  fr_cant_u: ["$", "km", "people", "liters", "", "grams"],
  fr_cant_q: (f, c, u) => `Find ${f} of ${U(c, u)}.`,
  fr_de: (a, b) => `${a} of ${b}`,
  fr_cant_s: (c, d, n, r) => `Divide by the denominator and multiply by the numerator: ${N(c)} ÷ ${d} = ${N(c / d)}; ${N(c / d)} · ${n} = <b>${r}</b>.`,
  fr_cmp_q: (a, b) => `Which sign goes in the box? <b>${a}</b> <span class="wa-hole">□</span> <b>${b}</b>`,
  fr_cmp_s: (a2, b2, sign) => `Rewrite them with a common denominator: ${a2} and ${b2}. Compare the numerators: <b>${sign}</b>.`,
  fr_cmp_s1: (a, b, sign) => `They have the same denominator, so compare the numerators: ${a} ${a > b ? "&gt;" : "&lt;"} ${b}. So <b>${sign}</b>.`,
  fr_may_q: big => `Which of these fractions is the ${big ? "greatest" : "least"}?`,
  fr_may_s: (list, r) => `With a common denominator: ${list}. The answer is <b>${r}</b>.`,
  fr_sum_s: (m, e2, r0, r) => `Rewrite them with a common denominator (LCM = ${m}): ${e2} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b> (simplified)`}.`,
  fr_sum_s1: (e, r0, r) => `Same denominator: add or subtract the numerators: ${e} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b> (simplified)`}.`,
  fr_mul_s: (e, r0, r) => `Multiply the numerators together and the denominators together: ${e} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b>`}.`,
  fr_cruz_par: (up, down, g) => `divide ${up} (top) and ${down} (bottom) by ${g}`,
  fr_mul_cruz: (e, pairs, mid, r) => `Before multiplying, simplify a number on top with a number on the bottom: ${pairs.join("; ")}. Then multiply numerator by numerator and denominator by denominator: ${e} = ${mid} = <b>${r}</b>.`,
  fr_div_s: (e, e2, r0, r) => `Dividing means multiplying by the reciprocal: ${e} = ${e2} = ${r0 === r ? `<b>${r}</b>` : `${r0} = <b>${r}</b>`}.`,
  fr_inv_q: f => `What is the reciprocal of <b>${f}</b>?`,
  fr_inv_s: (f, r) => `To get the reciprocal, flip the fraction: ${f} → <b>${r}</b>. Their product is 1.`,
  fr_comb_s: "Parentheses first, then multiplication and division (with no parentheses, start with the multiplication or the division), and finally addition and subtraction, using a common denominator only to add and subtract. Before multiplying, simplify a number on top with a number on the bottom if you can:",
  fr_comb_par: (p1, p2) => `First set of parentheses: ${p1}. Second set of parentheses: ${p2}.`,
  fr_prob: [
    { q: (f1, f2, tot) => `Lucy spends ${f1} of her allowance on books and ${f2} on the movies. What fraction of her allowance does she have left?`,
      s: (a, b, sum, rest, note) => `She spends ${a} + ${b} = ${sum} of her allowance${note}.<br>She has 1 − ${rest} left.` },
    { q: (f1, f2, tot) => `In a group of students, ${f1} walk to school and ${f2} take the bus. The rest ride their bikes. What fraction of the group rides a bike?`,
      s: (a, b, sum, rest, note) => `Walking or by bus: ${a} + ${b} = ${sum}${note}.<br>By bike: 1 − ${rest}.` },
  ],
  fr_prob_mcm: (d1, d2, m) => ` (LCM of ${d1} and ${d2} = ${m})`,
  fr_prob2_q: (tot, f1, f2) => `${/^8/.test(tot) ? "An" : "A"} ${tot}-liter tank is full. First you use ${f1} of the water, and then ${f2} of what is left. How many liters are left?`,
  fr_prob2_s: (f1, tot, d1, n1, g1, q1, f2, d2, n2, g2, r) => `First you use ${f1} of ${tot} L: ${tot} ÷ ${d1} · ${n1} = ${g1} L, so ${tot} − ${g1} = ${q1} L are left.<br>` +
    `Then you use ${f2} <b>of what was left</b> (not of the total): ${q1} ÷ ${d2} · ${n2} = ${g2} L, so ${q1} − ${g2} = <b>${r}</b> liters are left.`,
  fr_prob3: [
    { q: (f, p) => `At a school, ${f} of the students ride the bus, and that is ${p} students. How many students are there at the school?`, u: "students" },
    { q: (f, p) => `Max has read ${f} of a book, which is ${p} pages. How many pages does the book have?`, u: "pages" },
    { q: (f, p) => `On a hike, you have already covered ${f} of the trail, which is ${p} km. How long is the whole trail, in km?`, u: "km" },
    { q: (f, p) => `Anna has saved ${f} of the price of a bike: $${p}. How much does the bike cost, in dollars?`, u: "$" },
  ],
  fr_prob3_s: (f, p, n, d, k, tot, u) => `You know a part and are looking for the total: ${f} of the total is ${U(p, u)}, so 1/${d} is ${p} ÷ ${n} = ${k}.<br>The total is ${d}/${d}: ${d} · ${k} = <b>${U(tot, u)}</b>.<br>Check: ${f} of ${tot} = ${tot} ÷ ${d} · ${n} = ${p} ✓`,
});
})();
