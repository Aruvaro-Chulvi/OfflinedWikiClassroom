/* WikiAula — texts for gen/mat8.js (Mathematics, Grade 8), in English (US). */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m8 = G.m8 || {};
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const d = x => window.WA.H.jsn(String(x));   // decimal point (no grouping)
const nn = x => window.WA.H.n(x);   // 1,000 · 10,500
const num8 = s => +String(s).replace(/,/g, "");   // "5,000" → 5000
const pr8 = r => d(Math.round(num8(r) * 1e4) / 1e6);   // interest rate as a decimal: 2.5 → 0.025 (I = Prt)
Object.assign(S, {
  NAMES: ["Lucy", "Henry", "Sarah", "Leo", "Nora", "Matt", "Abby", "Omar", "Iris", "Ben", "Aisha", "Isaac"],
  lista: l => l.length < 3 ? l.join(" and ") : l.slice(0, -1).join(", ") + ", and " + l[l.length - 1],   // "2, 4, and 6"
  pn_q: e => `Evaluate <b>${e}</b> (write the result as a fraction).`,
  pn_s: (b, e, r) => `A negative exponent means “one over the power”: ${b}<sup>−${e}</sup> = 1/${b}<sup>${e}</sup> = <b>1/${r}</b>.`,
  pn2_q: (f, e) => `Evaluate <b>(${f})<sup>−${e}</sup></b>.`,
  pn2_s: (p, q, e, a, b) => { const r = b === 1 ? `<b>${a}</b>` : `<b>${a}/${b}</b>`, inv = p === 1 ? `${q}` : `(${q}/${p})`;
    return `Negative exponent: flip the fraction and make the exponent positive: (${p}/${q})<sup>−${e}</sup> = ${e === 1 ? r : `${inv}<sup>${e}</sup> = ${p === 1 ? "" : `${q}<sup>${e}</sup>/${p}<sup>${e}</sup> = `}${r}`}.`; },
  pnn_s: (c, f, r, par) => par
    ? `With parentheses, the base is −${c}: (−${c})<sup>−${f}</sup> = 1/(−${c})<sup>${f}</sup> = ${f % 2 ? `1/(−${r}) = ` : ""}<b>${f % 2 ? "−" : ""}1/${r}</b> (${f % 2 ? "odd exponent: negative" : "even exponent: positive"}).`
    : `Without parentheses, the exponent applies only to the ${c}, and the minus sign stays outside: −${c}<sup>−${f}</sup> = −(1/${c}<sup>${f}</sup>) = <b>−1/${r}</b>.`,
  nc_q: n => `Write <b>${n}</b> in scientific notation, a × 10<sup>n</sup> (with 1 ≤ a &lt; 10).`,
  nc_f: ["a (coefficient)", "n (exponent)"],
  nc_s: (n, m, e) => `Put the decimal point right after the first nonzero digit: the coefficient is ${m}. To get there, the decimal point moves <b>${Math.abs(e)}</b> ${Math.abs(e) === 1 ? "place" : "places"} to the ${e > 0 ? "left (a large number: positive exponent)" : "right (a small number: negative exponent)"}: <b>${m} × 10<sup>${neg(e)}</sup></b>.`,
  nc2_q: e => `Write <b>${e}</b> in standard form.`,
  nc2_s: (e, n) => `Move the decimal point ${Math.abs(e)} ${Math.abs(e) === 1 ? "place" : "places"} to the ${e > 0 ? "right" : "left"}: <b>${n}</b>.`,
  nco_q: e => `Calculate and write the result in scientific notation (the coefficient comes out exact, so you don't need to round): <b>${e}</b>`,
  nco_s: (mul, a, b, raw, e1, e2, s, adj, m, e) => {
    const op = mul ? "·" : "÷", p2 = e2 < 0 ? `(${neg(e2)})` : String(e2);
    const t = `Coefficients: ${a} ${op} ${b} = ${raw}. Powers of 10: 10<sup>${neg(e1)}</sup> ${op} 10<sup>${neg(e2)}</sup> = 10<sup>${neg(e1)} ${mul ? "+" : "−"} ${p2}</sup> = 10<sup>${neg(s)}</sup>. `;
    if (adj > 0) return t + `Adjust: ${raw} is greater than 10; ${raw} = ${m} × 10, so the coefficient becomes 10 times smaller and the exponent goes up by 1: <b>${m} × 10<sup>${neg(e)}</sup></b>.`;
    if (adj < 0) return t + `Adjust: ${raw} is less than 1; the coefficient becomes 10 times larger (${m}) and the exponent goes down by 1: <b>${m} × 10<sup>${neg(e)}</sup></b>.`;
    return t + `The coefficient is already between 1 and 10: <b>${m} × 10<sup>${neg(e)}</sup></b>.`;
  },
  // m8.compuesta: [faucets and liters, machines and parts, hostel and dollars, horses and feed]
  CP: {
    dd_q: [(a, d, m, a2, d2) => `If ${a} identical faucets pour ${nn(m)} liters of water into a tank in ${d} hours, how many liters will ${a2} faucets pour in ${d2} hours?`,
      (a, d, m, a2, d2) => `If ${a} identical machines make ${nn(m)} parts in ${d} hours, how many parts will ${a2} machines make in ${d2} hours?`,
      (a, d, m, a2, d2) => `A hostel spends $${nn(m)} on food for ${a} people for ${d} days. How many dollars will it spend for ${a2} people for ${d2} days?`,
      (a, d, m, a2, d2) => `Feeding ${a} horses for ${d} days takes ${nn(m)} kg of feed. How many kilograms are needed for ${a2} horses for ${d2} days?`],
    dd_s: [["faucet", "faucets", "hour", "hours", "L", "liters"], ["machine", "machines", "hour", "hours", "parts", "parts"], ["person", "people", "day", "days", "$", "spending"], ["horse", "horses", "day", "days", "kg", "feed"]].map(([x, xs, y, ys, u, w]) => (a, d, m, ad, k, a2, d2, r) => {
      const v = n => u === "$" ? `$${n}` : `${n} ${u}`, pre = u === "$" ? "$" : "";
      return `Both relationships are direct (more ${xs}, more ${w}; more ${ys}, more ${w} too). Use the unit rate method. For 1 ${x} in 1 ${y}: ${pre}${nn(m)} ÷ (${a} · ${d}) = ${pre}${nn(m)} ÷ ${nn(ad)} = ${v(nn(k))}. For ${a2} ${xs} in ${d2} ${ys}: ${pre}${nn(k)} · ${a2} · ${d2} = <b>${v(nn(r))}</b>.`; }),
    di_q: [(n, m, d, n2, m2) => `If ${n} workers pave ${nn(m)} m of road in ${d} days, how many days will it take ${n2} workers to pave ${nn(m2)} m?`,
      (n, m, d, n2, m2) => `If ${n} identical printers print ${nn(m)} pages in ${d} minutes, how many minutes will it take ${n2} printers to print ${nn(m2)} pages?`],
    di_s: [["meters", "workers", "days"], ["pages", "printers", "minutes"]].map(([w, x, u]) => (d, m2, m, n, n2, num, den, r) =>
      `${w[0].toUpperCase() + w.slice(1)} and ${u}: more ${w}, more ${u} → <b>direct</b>: multiply by ${nn(m2)}/${nn(m)}. ${x[0].toUpperCase() + x.slice(1)} and ${u}: more ${x}, fewer ${u} → <b>inverse</b>: multiply by the ratio flipped, ${n}/${n2}. ${u[0].toUpperCase() + u.slice(1)}: ${d} · ${nn(m2)}/${nn(m)} · ${n}/${n2} = (${d} · ${nn(m2)} · ${n})/(${nn(m)} · ${n2}) = ${nn(num)}/${nn(den)} = <b>${nn(r)} ${u}</b>.`),
    ii_q: (n, d, c, n2, c2) => `A mountain hut has enough food for ${n} hikers for ${d} days, eating ${c} meals a day. If ${n2} hikers come instead and eat ${c2} ${c2 === 1 ? "meal" : "meals"} a day, how many days will the food last?`,
    ii_s: (d, n, n2, c, c2, num, den, r) => `Hikers and days: more hikers, fewer days → <b>inverse</b>: multiply by ${n}/${n2}. Meals per day and days: more meals, fewer days → <b>inverse</b>: multiply by ${c}/${c2}. Days: ${d} · ${n}/${n2} · ${c}/${c2} = (${d} · ${n} · ${c})/(${n2} · ${c2}) = ${nn(num)}/${nn(den)} = <b>${nn(r)} ${r === 1 ? "day" : "days"}</b>.`,
  },
  // m8.reparto
  RP: {
    rp_q: (T, names, parts) => `Divide $${nn(T)} ${names.length === 2 ? "between" : "among"} ${S.lista(names)} in direct proportion to ${S.lista(parts)}. How much does each person get?`,
    rp_s: (T, p, g, q, sum, u) => `${g > 1 ? `Simplify by dividing by ${g}: dividing in proportion to ${S.lista(p)} is the same as dividing in proportion to ${S.lista(q)}. ` : ""}Add the parts: ${q.join(" + ")} = ${sum}. One part: $${nn(T)} ÷ ${sum} = $${nn(u)}. They get ${q.map(x => `${x} · $${nn(u)} = <b>$${nn(x * u)}</b>`).join("; ")}.`,
    ri_q: (T, names, a) => `A prize of $${nn(T)} is divided ${names.length === 2 ? "between" : "among"} ${S.lista(names)} in inverse proportion to the number of days each of them missed school: ${S.lista(a)}. How much does each person get?`,
    ri_s: (a, L, w, W, T, u) => `Fewer absences, more money: divide in direct proportion to the reciprocals, ${a.map(x => `1/${x}`).join(", ")}. With a denominator of ${L}: ${w.map(x => `${x}/${L}`).join(", ")}. Now divide in direct proportion to ${S.lista(w)}, which add up to ${W}. One part: $${nn(T)} ÷ ${W} = $${nn(u)}. They get ${w.map(x => `${x} · $${nn(u)} = <b>$${nn(x * u)}</b>`).join("; ")}.`,
  },
  en_q: (P, a, b) => `An item costs $${nn(P)}. Its price goes up ${a}% and then goes down ${b}%. What is its final price, in dollars?`,
  en_s: (P, fa, fb, mid, r, f) => `Chained percents: multiply by each multiplier, one after the other. Increase: $${nn(P)} · ${fa} = $${mid}. Decrease: $${mid} · ${fb} = <b>$${r}</b>. (All at once: the overall multiplier is ${fa} · ${fb} = ${f}, and $${nn(P)} · ${f} = $${r}.)`,
  en2_q: (a, b) => `A price goes up ${a}% and then goes down ${b}%. By what percent has it changed overall? (Use a negative number if it went down.)`,
  en2_s: (fa, fb, f, t) => `Overall multiplier: ${fa} · ${fb} = ${f}. Change: (${f} − 1) · 100 = <b>${t}%</b>.`,
  is_q: (C, r, t) => `How much interest does $${C} earn at ${r}% simple annual interest for ${t} ${t === 1 ? "year" : "years"}?`,
  is_s: (C, r, t, I) => `I = P · r · t, with the rate as a decimal (${r}% = ${pr8(r)}): I = ${C} · ${pr8(r)} · ${t} = <b>$${I}</b>.`,
  is2_q: (C, I, t) => `A principal of $${C} has earned $${I} in simple interest in ${t} ${t === 1 ? "year" : "years"}. What was the interest rate (annual %)?`,
  is2_s: (I, C, t, ct, r) => { const Ct = nn(num8(C) * t); return `Substitute into I = P · r · t: ${I} = ${C} · r · ${t} = ${Ct} · r. So r = ${I} ÷ ${Ct} = ${pr8(r)}, that is, <b>${r}%</b> per year.`; },
  en3_q: (a, b) => `A store marks a price down ${a}% and then takes another ${b}% off the sale price at the register. What is the overall discount, as a percent?`,
  en3_s: (fa, fb, f, p, t, s) => `Chain the multipliers: ${fa} · ${fb} = ${f}. You pay ${p}% of the price, so the overall discount is <b>${t}%</b> (not ${s}%: the second discount is taken off a price that has already been reduced).`,
  en4_q: (r, y) => `A price goes up ${r}% every year for ${y} years. By what percent has it gone up overall? (Round to the nearest hundredth if needed.)`,
  en4_s: (f, y, F, pc, pr, s, red) => `Each year, the price is multiplied by ${f}: in ${y} years, by ${f}<sup>${y}</sup> = ${F}. It has gone up ${red ? `${pc}% ≈ <b>${pr}%</b>` : `<b>${pr}%</b>`}, a little more than ${s}%, because each increase is calculated on the price that has already gone up.`,
  en5_q: (a, b, E) => `After going up ${a}% and then down ${b}%, an item costs $${E}. How many dollars did it cost at first?`,
  en5_s: (fa, fb, f, E, P0, mid) => `Overall multiplier: ${fa} · ${fb} = ${f}. Final price = original price · ${f}, so original price = $${E} ÷ ${f} = <b>$${nn(P0)}</b>. Check: $${nn(P0)} · ${fa} = $${mid}, and $${mid} · ${fb} = $${E}. ✓`,
  ism_q: (C, r, m) => `How much interest does $${C} earn at ${r}% simple annual interest for ${m} months?`,
  ism_s: (C, r, m, A, I) => `The interest rate is annual: in one year, ${C} · ${pr8(r)} = $${A}. A period of ${m} months is ${m}/12 of a year: ${A} · ${m}/12 = <b>$${I}</b>. (It is the same as putting the months into the formula and dividing by 12: I = ${C} · ${pr8(r)} · ${m} / 12.)`,
  ist_q: (C, r, I) => `How many years must a principal of $${C} be invested at ${r}% simple interest to earn $${I} in interest?`,
  ist_s: (I, C, r, A, t) => `Substitute into I = P · r · t (${r}% = ${pr8(r)}): ${I} = ${C} · ${pr8(r)} · t = ${A} · t. So t = ${I} ÷ ${A} = <b>${t} ${t === 1 ? "year" : "years"}</b>.`,
  isc_q: (r, I, t) => `What principal must you deposit at ${r}% simple interest to earn $${I} in interest in ${t} ${t === 1 ? "year" : "years"}?`,
  isc_s: (I, r, t, rt, f, C) => `Substitute into I = P · r · t (${r}% = ${pr8(r)}): ${I} = P · ${pr8(r)} · ${t} = ${f} · P. So P = ${I} ÷ ${f} = <b>$${C}</b>.`,
  pol_q: e => `Perform the operations and simplify: <b>${e}</b>`,
  pol_hint: "Write the polynomial in x, for example 3x^2 − 2x + 5.",
  nums: "constants",
  polsuma_s: (s, expr, gr, r) => `${s > 0 ? "Remove the parentheses (with a + in front, the signs stay the same)" : "Remove the parentheses, changing <b>all</b> the signs in the second one (it has a − in front)"}: ${expr}. ${gr ? `Combine like terms (same degree): ${gr}.` : "There are no like terms to combine."} Result: <b>${r}</b>.`,
  polmult_s: (prods, expr, gr, r) => `Multiply each term of the first polynomial by each term of the second (distributive property): ${prods}. Add: ${expr}${gr ? `. Like terms: ${gr}` : ""}. Result: <b>${r}</b>.`,
  not_q: e => `Expand <b>${e}</b>.`,
  not2_q: p => `Which special product expands to <b>${p}</b>?`,
  not_s: [(A, b, a2, ab2, b2, r) => `Square of a sum, with a = ${A} and b = ${b}: a² = ${a2}; 2ab = ${ab2}; b² = ${b2}. So (a + b)² = a² + 2ab + b² = <b>${r}</b>.`,
    (A, b, a2, ab2, b2, r) => `Square of a difference, with a = ${A} and b = ${b}: a² = ${a2}; 2ab = ${ab2}; b² = ${b2}. So (a − b)² = a² − 2ab + b² = <b>${r}</b> (the middle term 2ab is subtracted).`,
    (A, b, a2, ab2, b2, r) => `Sum and difference, with a = ${A} and b = ${b}: a² = ${a2}; b² = ${b2}. So (a + b)(a − b) = a² − b² = <b>${r}</b> (the middle terms cancel out).`],
  fc_q: p => `Factor out the <b>greatest</b> common factor of <b>${p}</b> (the one that leaves nothing more to factor out inside the parentheses).`,
  fce_q: (eq, what) => `The <b>greatest</b> common factor has been factored out: <b>${eq}</b>. ${what}`,
  fce_num: "What number goes in the box?",
  fce_dentro: "What number goes in the box inside the parentheses?",
  fc_s: (f, p, g, e, cs, divs) => `Number: the GCF of ${cs} is ${g}. Variable: ${e ? `the lowest power of x that appears in every term is ${e === 1 ? "x" : "x²"}` : "not every term has an x, so no x is factored out"}. The greatest common factor is ${f}. Divide each term by ${f}: ${divs}. The result is <b>${f}(${p})</b>.${e ? " (Factoring out only the number or only an x gives an expression equal to the polynomial, but there is still something left to factor out inside the parentheses: it is not the greatest common factor.)" : ""}`,
  sg_q: p => `Solve the equation <b>${p} = 0</b>.`,
  sg_hint: "Write the solutions separated by commas or spaces.",
  sg0_s: (r2, r) => `Incomplete, with no x-term: solve for x², x² = ${r2}, so x = ±√${r2}: <b>${r} and −${r}</b>.`,
  sgi0_s: (ax2, a, ar2, r2, r) => `Incomplete, with no x-term: solve for x². Move the constant to the other side: ${ax2} = ${ar2}.${a ? ` Divide by ${a}: x² = ${r2}.` : ""} Take the square root, without forgetting the ±: x = ±√${r2} = ±${r}. Solutions: <b>${r} and −${r}</b>.`,
  sg1_s: (f, r) => `Incomplete, with no constant term: factor out x: x(${f}) = 0. Either x = 0 or ${f} = 0 → x = ${r}. Solutions: <b>0 and ${r}</b>.`,
  si_q: (e1, e2) => `Solve the system: <b>${e1}</b>; <b>${e2}</b>`,
  sp_q: [
    (n, p, q, t) => `A store sold ${n} tickets of two kinds: some cost $${p}, and the others cost $${q}. It took in $${nn(t)}. How many tickets of each kind were sold?`,
    (s, d_) => `Two numbers add up to ${s}, and their difference is ${d_}. What are the numbers?`,
    (cab, pat) => `A farm has chickens and rabbits: ${cab} heads and ${pat} legs. How many animals of each kind are there?`,
    (n, k, s) => `Lucy was ${k === 2 ? "twice" : k === 3 ? "three times" : "four times"} as old as her cousin ${n} years ago. Now their ages add up to ${s} years. How old is each of them?`],
  sp_f: [[p => `$${p} tickets`, q => `$${q} tickets`], ["Larger", "Smaller"], ["Chickens", "Rabbits"], ["Lucy", "Her cousin"]],
  sp_s: [
    (x, y, p, q, n, t) => `x = number of $${p} tickets, y = number of $${q} tickets. Number of tickets: x + y = ${n}. Money: ${p}x + ${q}y = ${nn(t)}. ` + (p > q
      ? `Elimination: multiply the first equation by ${q} (${q}x + ${q}y = ${nn(q * n)}) and subtract it from the second: ${p - q === 1 ? `<b>x = ${x}</b>` : `${p - q}x = ${nn(t - q * n)}, so <b>x = ${x}</b>`}. Then y = ${n} − ${x} = <b>${y}</b>.`
      : `Elimination: multiply the first equation by ${p} (${p}x + ${p}y = ${nn(p * n)}) and subtract it from the second: ${q - p === 1 ? `<b>y = ${y}</b>` : `${q - p}y = ${nn(t - p * n)}, so <b>y = ${y}</b>`}. Then x = ${n} − ${y} = <b>${x}</b>.`)
      + ` Check: ${p} · ${x} + ${q} · ${y} = ${p * x} + ${q * y} = ${nn(t)}. ✓`,
    (x, y, s, d_) => `Call the larger number x and the smaller one y: x + y = ${s} and x − y = ${d_}. Add the two equations: 2x = ${s + d_}, so <b>x = ${x}</b>. Then y = ${s} − ${x} = <b>${y}</b>. Check: ${x} − ${y} = ${d_}. ✓`,
    (g, c, cab, pat) => `c = chickens, r = rabbits. Heads: c + r = ${cab}. Legs: 2c + 4r = ${pat}. Elimination: multiply the first equation by 2 (2c + 2r = ${2 * cab}) and subtract it from the second: 2r = ${pat - 2 * cab}, so <b>r = ${c} rabbits</b>. Then c = ${cab} − ${c} = <b>${g} chickens</b>. Check: 2 · ${g} + 4 · ${c} = ${2 * g} + ${4 * c} = ${pat}. ✓`,
    (x, y, n, k, s) => `x = Lucy's age now, y = her cousin's age now. Ages now: x + y = ${s}. Ages ${n} years ago: x − ${n} = ${k}(y − ${n}). Substitution: from the first equation, x = ${s} − y. In the second: ${s} − y − ${n} = ${k}y − ${k * n}, so ${s - n} + ${k * n} = ${k}y + y, that is, ${k + 1}y = ${s - n + k * n}; so <b>y = ${y}</b>. Then x = ${s} − ${y} = <b>${x}</b>. Check: ${n} years ago, they were ${x - n} and ${y - n}, and ${x - n} = ${k} · ${y - n}. ✓`],
  SL: {
    sino: ["Yes", "No"],
    es_q: (P, e) => `Is the point <b>${P}</b> a solution of the equation <b>${e}</b>?`,
    es_s: (x, y, expr, mid, val, c, ok) => `Substitute x = ${x} and y = ${y}: ${expr}${expr === mid ? "" : ` = ${mid}`} = ${val}. ${ok ? `It gives ${c}: it <b>is</b> a solution (the point is on the line).` : `You get ${val}, not ${c}: it is <b>not</b> a solution (the point is not on the line).`}`,
    y_q: (e, k) => `In the equation <b>${e}</b>, what is the value of y when x = ${k}?`,
    y_s: (k, expr, ak, b, c, dif, y) => `Substitute x = ${k}: ${expr} = ${c}, that is, ${ak} ${b > 0 ? "+" : "−"} y = ${c}. So y = ${dif} = <b>${y}</b>.`,
    n_q: (e1, e2) => `How many solutions does the system made up of <b>${e1}</b> and <b>${e2}</b> have?`,
    n_o: ["One", "None", "Infinitely many"],
    n_s: (caso, m, km, c2, P) => [
      `The second equation is not the first one multiplied by any number: the lines intersect at one point, ${P} (check it by substituting into both equations). <b>One</b> solution.`,
      `If you multiply the first equation by ${m}, you get ${km}; but the second equation says that the same left side equals ${c2}. It can't equal both at once: the lines are parallel, and the system has <b>no solution</b>.`,
      `The second equation is the first one multiplied by ${m} (${km}): it is the same line, so there are <b>infinitely many</b> solutions.`][caso],
  },
  pi_h_q: (a, b) => `The legs of a right triangle measure ${a} cm and ${b} cm. How long is the hypotenuse?`,
  pi_h_s: (a, b, s, c, a2, b2) => `Pythagorean Theorem: hypotenuse² = ${a}² + ${b}² = ${a2} + ${b2} = ${s}, so hypotenuse = √${s} = <b>${c} cm</b>.`,
  pi_c_q: (c, a) => `The hypotenuse of a right triangle measures ${c} cm, and one leg measures ${a} cm. How long is the other leg?`,
  pi_c_s: (c, a, s, b, c2, a2) => `You are looking for a leg, so subtract. Leg² = hypotenuse² − other leg² = ${c}² − ${a}² = ${c2} − ${a2} = ${s}, so leg = √${s} = <b>${b} cm</b>. Check: ${a}² + ${b}² = ${a2} + ${b * b} = ${c2} = ${c}². ✓`,
  pi_n_q: (a, b) => `The legs of a right triangle measure ${a} cm and ${b} cm. How long is the hypotenuse? (The square root is not exact: use a calculator and round to the nearest hundredth.)`,
  pi_n_s: (x, y, x2, y2, s, d3, r) => `Hypotenuse² = ${x}² + ${y}² = ${x2} + ${y2} = ${s}, so hypotenuse = √${s} = ${d3}… ≈ <b>${r} cm</b> (rounded to the nearest hundredth).`,
  pa_q: [(a, b) => `How long is the diagonal of ${/^(8|1[18](\D|$))/.test(String(a)) ? "an" : "a"} ${a} m × ${b} m rectangle?`, (l, base) => `An isosceles triangle has two equal sides of ${l} cm and a base of ${base} cm. What is its height?`, (c, a) => `A ${c} m ladder leans against a wall, with its foot ${a} m from the wall. How high up the wall does it reach?`],
  pa_esc: (c, a, c2, a2, d, b) => `The ladder is the hypotenuse, and the height h is a leg (subtract): h² = ${c}² − ${a}² = ${c2} − ${a2} = ${d}, so h = √${d} = <b>${b} m</b> (check: ${b} · ${b} = ${d}).`,
  pa_s: [(a, b, c) => `The diagonal is the hypotenuse: d² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}, so d = √${a * a + b * b} = <b>${c} m</b>.`, (l, m, h) => `The height cuts the base in half (${m} cm) and forms a right triangle with one of the equal sides as the hypotenuse: h² = ${l}² − ${m}² = ${l * l} − ${m * m} = ${l * l - m * m}, so h = √${l * l - m * m} = <b>${h} cm</b>.`, (c, a, b) => `The ladder is the hypotenuse: h² = ${c}² − ${a}² = ${c * c} − ${a * a} = ${c * c - a * a}, so h = √${c * c - a * a} = <b>${b} m</b>.`],
  p3_q: (a, b, c) => `How long is the diagonal of ${/^(8|1[18](\D|$))/.test(String(a)) ? "an" : "a"} ${a} cm × ${b} cm × ${c} cm box (rectangular prism)?`,
  p3_s: (a, b, c, s, r) => `Pythagorean Theorem in three dimensions: D² = ${a}² + ${b}² + ${c}² = ${a * a} + ${b * b} + ${c * c} = ${s}, so D = √${s} = <b>${r} cm</b>.`,
  ta_q: (a, b, a2) => `Two lines intersect at a point O, and two parallel lines cut across them (as in the drawing in the lesson). On one line, OA = ${a} cm and AB = ${b} cm; on the other, OA′ = ${a2} cm. How long is A′B′?`,
  ta_s: (a, b, a2, r, k) => `Intercept theorem: the segments on one line are proportional to the segments on the other. Ratio: OA′/OA = ${a2}/${a} = ${k}. So A′B′ = AB · ${k} = ${b} · ${k} = <b>${r} cm</b>.`,
  ta2_q: (h, s, S2) => `A ${h} m pole casts ${/^(8|1[18](\D|$))/.test(String(s)) ? "an" : "a"} ${s} m shadow. At the same time, a tree casts ${/^(8|1[18](\D|$))/.test(String(S2)) ? "an" : "a"} ${S2} m shadow. How tall is the tree?`,
  ta2_s: (h, s, S2, r, k) => `The two triangles (object, shadow, and sun ray) are similar, so the height/shadow ratio is the same. Pole: ${h} ÷ ${s} = ${k}. Tree: x = ${S2} · ${k} = <b>${r} m</b>.`,
  se_q: [(l, l2) => `Two figures are similar. A side of the first one measures ${l} cm, and the corresponding side of the second one measures ${l2} cm. What is the scale factor (second/first)?`, (k, A, red) => `A figure with an area of ${A} cm² is ${red ? "reduced" : "enlarged"} with a scale factor of ${k}. What is the area of the new figure?`, (k, V, red) => `A solid with a volume of ${V} cm³ is ${red ? "reduced" : "enlarged"} with a scale factor of ${k}. What is the volume of the new solid?`],
  se_s: [(l2, l, k) => `k = ${l2}/${l} = <b>${k}</b>.`, (k, A, k2, r) => `Areas are multiplied by k² = ${k}² = ${k} · ${k} = ${k2}: ${A} · ${k2} = <b>${r} cm²</b>.`, (k, V, k3, r) => `Volumes are multiplied by k³ = ${k}³ = ${k} · ${k} · ${k} = ${k3}: ${V} · ${k3} = <b>${r} cm³</b>.`],
  av_q: [(a, b, h) => `Find the volume of ${/^(8|1[18](\D|$))/.test(String(a)) ? "an" : "a"} ${a} × ${b} × ${h} cm rectangular prism (in cm³).`, (a, b, h) => `Find the surface area of ${/^(8|1[18](\D|$))/.test(String(a)) ? "an" : "a"} ${a} × ${b} × ${h} cm rectangular prism (in cm²).`, (a, h) => `Find the volume of a pyramid with a square base with ${a} cm sides and a height of ${h} cm (in cm³; if it is not exact, round to the nearest hundredth).`, (r, h) => `Find the volume of a cylinder with a radius of ${r} cm and a height of ${h} cm (in cm³; use the π key on your calculator and round to the nearest hundredth).`, (r, h) => `Find the surface area of a cylinder with a radius of ${r} cm and a height of ${h} cm (in cm²; use the π key on your calculator and round to the nearest hundredth).`, (r, h) => `Find the volume of a cone with a radius of ${r} cm and a height of ${h} cm (in cm³; use the π key on your calculator and round to the nearest hundredth).`, r => `Find the volume of a sphere with a radius of ${r} cm (in cm³; use the π key on your calculator and round to the nearest hundredth).`],
  av_s: [
    (a, b, h, V) => `V = length · width · height = ${a} · ${b} · ${h} = <b>${nn(V)} cm³</b>.`,
    (a, b, h, ab, ah, bh, A) => `Six faces, in equal pairs: 2 · (${a} · ${b}) + 2 · (${a} · ${h}) + 2 · (${b} · ${h}) = ${ab} + ${ah} + ${bh} = <b>${nn(A)} cm²</b>.`,
    (a, h, a2, a2h, eq, v) => `Base: ${a}² = ${a2} cm². V = (base area · height) ÷ 3 = ${a2} · ${h} ÷ 3 = ${nn(a2h)} ÷ 3 ${eq} <b>${v} cm³</b>.`,
    (r, h, k, v) => `V = π · r² · h = π · ${r}² · ${h} = ${nn(k)}π ≈ <b>${v} cm³</b>.`,
    (r, h, lat, bas, k, v) => `Lateral area: 2π · ${r} · ${h} = ${nn(lat)}π. The two bases: 2 · π · ${r}² = ${nn(bas)}π. Total: ${nn(lat)}π + ${nn(bas)}π = ${nn(k)}π ≈ <b>${v} cm²</b>.`,
    (r, h, k, kd, v) => `V = (π · r² · h) ÷ 3 = π · ${r}² · ${h} ÷ 3 = ${nn(k)}π ÷ 3 ${kd ? `= ${kd} ` : ""}≈ <b>${v} cm³</b>.`,
    (r, r3, k4, kd, v) => `V = (4/3) · π · r³ = 4 · π · ${r}³ ÷ 3 = ${nn(k4)}π ÷ 3 ${kd ? `= ${kd} ` : ""}≈ <b>${v} cm³</b>.`],
  AP: {
    ort_q: (a, b, c) => `Find the surface area of ${/^(8|1[18](\D|$))/.test(String(a)) ? "an" : "a"} ${a} × ${b} × ${c} cm rectangular prism (in cm²).`,
    ort_s: (a, b, c, ab, ac, bc) => `Six faces, in equal pairs: two of ${a} · ${b} = ${ab}, two of ${a} · ${c} = ${ac}, and two of ${b} · ${c} = ${bc} cm². Surface area: 2 · (${ab} + ${ac} + ${bc}) = 2 · ${ab + ac + bc} = <b>${nn(2 * (ab + ac + bc))} cm²</b>.`,
    cubo_q: l => `Find the surface area of a cube with an edge length of ${l} cm (in cm²).`,
    cubo_s: (l, l2, A) => `Six square faces of ${l} · ${l} = ${l2} cm²: 6 · ${l2} = <b>${nn(A)} cm²</b>.`,
    tri_q: (p, q, h) => `The base of a prism is a right triangle with legs of ${p} cm and ${q} cm, and the height of the prism is ${h} cm. What is its surface area (in cm²)?`,
    tri_s: (p, q, r, s, P, h, AL, b1, b2) => `Hypotenuse of the base, by the Pythagorean Theorem: √(${p}² + ${q}²) = √${s} = ${r} cm. Perimeter of the base: ${p} + ${q} + ${r} = ${P} cm. Lateral area: ${P} · ${h} = ${nn(AL)} cm². Each base: ${p} · ${q} ÷ 2 = ${b1} cm²; both bases, ${b2} cm². Surface area: ${nn(AL)} + ${b2} = <b>${nn(AL + b2)} cm²</b>.`,
    pa_q: (L, ap) => `A regular square pyramid has a base with ${L} cm sides and a slant height of ${ap} cm. What is its surface area (in cm²)?`,
    pa_s: (L, ap, c, AL, B) => `Each lateral face is a triangle: ${L} · ${ap} ÷ 2 = ${c} cm²; all four, ${nn(AL)} cm². Base: ${L}² = ${B} cm². Surface area: ${nn(AL)} + ${B} = <b>${nn(AL + B)} cm²</b>.`,
    ph_q: (L, h, lat) => `A regular square pyramid has a base with ${L} m sides and a height of ${h} m. What is its ${lat ? "lateral" : "surface"} area (in m²)?`,
    ph_s: (L, m, h, s, ap, c, AL, B, lat) => `First, find the slant height of the pyramid: the height (${h} m), half the side (${m} m), and the slant height form a right triangle. Slant height = √(${h}² + ${m}²) = √${s} = ${ap} m. Each face: ${L} · ${ap} ÷ 2 = ${c} m²; all four, ${nn(AL)} m². ` + (lat ? `Lateral area: <b>${nn(AL)} m²</b>.` : `Base: ${L}² = ${B} m². Surface area: ${nn(AL)} + ${B} = <b>${nn(AL + B)} m²</b>.`),
  },
  AR: {
    cil_q: (r, h, tot) => `Find the ${tot ? "surface" : "lateral"} area of a cylinder with a radius of ${r} cm and a height of ${h} cm.`,
    cil_s: (r, h, lat, bas, tot) => `Lateral area: 2π · ${r} · ${h} = ${lat}π cm².` + (tot ? ` The two bases: 2 · π · ${r}² = ${bas}π cm². Total: ${lat}π + ${bas}π = ${lat + bas}π cm².` : ""),
    cono_q: (r, g, tot) => `Find the ${tot ? "surface" : "lateral"} area of a cone with a radius of ${r} cm and a slant height of ${g} cm.`,
    conoh_q: (r, h, tot) => `Find the ${tot ? "surface" : "lateral"} area of a cone with a radius of ${r} cm and a height of ${h} cm.`,
    gen_s: (r, h, s, g) => `First, find the slant height with the Pythagorean Theorem: ℓ = √(${r}² + ${h}²) = √${s} = ${g} cm. `,
    cono_s: (r, g, lat, bas, tot) => `Lateral area: π · ${r} · ${g} = ${lat}π cm².` + (tot ? ` Base: π · ${r}² = ${bas}π cm². Total: ${lat}π + ${bas}π = ${lat + bas}π cm².` : ""),
    esf_q: r => `Find the surface area of a sphere with a radius of ${r} cm.`,
    esf_s: (r, r2, k) => `A = 4π · ${r}² = 4π · ${r2} = ${k}π cm².`,
    k_q: "Give the answer in terms of π: if the area is kπ cm², what is the value of k?",
    k_s: k => `The area is ${k}π cm², so <b>k = ${k}</b>.`,
    dec_q: "Round to the nearest tenth (use the π key on your calculator).",
    dec_s: (k, v) => `With the π key: ${k}π ≈ <b>${String(v).replace(/\b\d{4,}\b/g, x => nn(+x))} cm²</b>.`,
  },
  re_q: (A, B) => `Find the slope of the line that passes through A${A} and B${B}.`,
  re_s: (y2, y1, x2, x1, fr, m) => `m = (y₂ − y₁)/(x₂ − x₁) = (${y2} − ${y1})/(${x2} − ${x1}) = ${fr ? fr + " = " : ""}<b>${m}</b>.`,
  re2_q: (A, B) => `Write the equation of the line that passes through A${A} and B${B} in the form y = mx + b.`,
  re_hint: "Write the line as y = mx + b, for example y = 2x − 3 or y = x/2 + 1.",
  re2_s: (sl, y1, mp, x1, p, pp, n, E) => `First, find the slope: ${sl.replace(/<\/?b>/g, "")} Then substitute point A into y = mx + b: ${y1} = ${mp} · ${x1} + b, that is, ${y1} = ${p} + b, so b = ${y1} − ${pp} = ${n}. The line is <b>${E}</b>.`,
});
// ═════ Inequalities, the parabola y = ax², and relative frequency (texts of the added generators) ═════
const gt = s => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pt = q => /…$/.test(q) ? q : q + ".";   // no period after "…"

// m8.inecuacion
S.IN = {
  resuelve_q: e => `Solve the inequality <b>${gt(e)}</b>.`,
  pasos: (e, s1, s2, m, negM, fin, s0) => `${gt(e)} → ${gt(s1)} → ${gt(s2)}. Divide both sides by ${neg(m)}${negM ? `, which is <b>negative</b>, so the inequality sign <b>reverses direction</b>` : " (positive, so the direction stays the same)"}. Solution: <b>${gt(fin)}</b>.`,
  entero_q: (e, up) => `Solve <b>${gt(e)}</b>. What is the ${up ? "greatest" : "least"} integer that makes the inequality true?`,
  entero_s: (fin, up, r, eq) => `With ${gt(fin)}, the ${up ? "greatest" : "least"} integer is <b>${neg(r)}</b>${eq ? " (the endpoint counts, because the inequality includes “equal to”)" : " (the endpoint doesn't count, because the inequality is strict)"}.`,
  recta_q: "Which inequality does the number line show?",
  recta_s: (full, left, fin) => `The circle is ${full ? "<b>closed</b> (filled in): the endpoint is included (≤ or ≥)" : "<b>open</b>: the endpoint is not included (&lt; or &gt;)"}, and the ray points to the ${left ? "left, toward the smaller numbers" : "right, toward the greater numbers"}: <b>${gt(fin)}</b>.`,
  sala_q: (F, p, B) => `Renting a party room costs $${nn(F)} plus $${nn(p)} per guest, and you don't want to spend more than $${nn(B)}. What is the greatest number of guests you can invite?`,
  sala_s: (F, p, B, q, r) => `“No more than” means ≤: ${nn(F)} + ${p}x ≤ ${nn(B)} → ${p}x ≤ ${nn(B - F)} → x ≤ ${pt(q)} The number of guests is a whole number, so the greatest is <b>${r}</b>.`,
  asc_q: (M, m0, w) => `An elevator can carry at most ${nn(M)} kg. A worker who weighs ${m0} kg rides up with boxes that weigh ${w} kg each. What is the greatest number of boxes the worker can take up in one trip?`,
  asc_s: (m0, w, M, q, r) => `${m0} + ${w}x ≤ ${nn(M)} → ${w}x ≤ ${nn(M - m0)} → x ≤ ${pt(q)} The number of boxes is a whole number, so the greatest is <b>${r}</b>.`,
  movil_q: (b, p, B) => `Your cell phone plan costs $${b} per month, and each extra gigabyte costs $${p} more. You don't want to pay more than $${B} per month. What is the greatest number of extra gigabytes you can use?`,
  movil_s: (b, p, B, d, q, r) => `${b} + ${p}x ≤ ${B} → ${p}x ≤ ${d} → x ≤ ${pt(q)} At most, <b>${r}</b> extra gigabytes.`,
  ahorro_q: (s, a, G) => `You have $${nn(s)} saved, and each week you save $${nn(a)} more. You want to have at least $${nn(G)} to buy a bike. What is the least number of weeks you need to save?`,
  ahorro_s: (s, a, G, d, q, r) => `“At least” means ≥: ${nn(s)} + ${a}x ≥ ${nn(G)} → ${a}x ≥ ${nn(d)} → x ≥ ${pt(q)} The number of weeks is a whole number, so the least is <b>${r}</b>.`,
  essol_q: (e, x) => `Is x = ${neg(x)} a solution of the inequality <b>${gt(e)}</b>?`,
  sino: ["Yes", "No"],
  essol_s: (x, l, r, s, ok) => `Substitute x = ${neg(x)}: you get ${l} ${gt(s)} ${r}, which is <b>${ok ? "true" : "false"}</b>. ${ok ? "It is" : "It is not"} a solution.`,
  prop_q: (rel, ea, eb) => `If a ${gt(rel)} b, which sign goes in the box? <b>${ea} ☐ ${eb}</b>`,
  prop_s: (add, negM, lt, ea, eb, r, m) => {
    if (add) return `Adding or subtracting the same number on both sides doesn't change the direction of the inequality: <b>${ea} ${gt(r)} ${eb}</b>.`;
    if (!negM) return `Multiplying by a positive number doesn't change the direction: <b>${ea} ${gt(r)} ${eb}</b>.`;
    const [u, v] = lt ? [1, 2] : [2, 1], pu = m * u, pv = m * v;   // example with the same factor and the same direction as the question
    return `Multiplying both sides by a <b>negative</b> number reverses the direction: <b>${ea} ${gt(r)} ${eb}</b>. For example, ${u} ${lt ? "&lt;" : "&gt;"} ${v}, but ${neg(m)} · ${u} = ${neg(pu)} and ${neg(m)} · ${v} = ${neg(pv)}, and ${neg(pu)} ${lt ? "&gt;" : "&lt;"} ${neg(pv)}.`;
  },
};

// m8.parabola
S.PB = {
  escala_w: ["the area", "the distance"],
  valor_q: (E, x) => `For the function <b>${E}</b>, what is y when x = ${x}?`,
  valor_s: (a, x, x2, y, n) => `Square first, then multiply: y = ${a} · ${x}² = ${a} · ${x2} = <b>${y}</b>.${n ? " The square of a negative number is positive." : ""}`,
  tabla_q: E => `Complete the table of values for <b>${E}</b>.`,
  tabla_s: (list, up) => `${list}. The values come in pairs (x and −x give the same y): the y-axis is the axis of symmetry, and the vertex (0, 0) is a ${up ? "minimum" : "maximum"}.`,
  hallar_q: p => `A parabola of the form y = ax² passes through the point <b>${p}</b>. What is a?`,
  hallar_s: (y, x, x2, a, E) => x2 === 1 ? `Substitute the point: ${y} = a · ${x}² = a, so <b>a = ${a}</b>. The parabola is ${E}.` : `Substitute the point: ${y} = a · ${x}² = ${x2}a, so a = ${y} ÷ ${x2} = <b>${a}</b>. The parabola is ${E}.`,
  abre_q: E => `Which way does the parabola <b>${E}</b> open?`,
  abre_o: ["Upward, and its vertex is a minimum", "Downward, and its vertex is a maximum", "It depends on the value of x"],
  abre_s: (a, up) => up ? `a = ${a} is positive, so the values of y are positive or zero. It opens <b>upward</b>, and the vertex (0, 0) is the lowest point, a <b>minimum</b>.` : `a = ${a} is negative, so the values of y are negative or zero. It opens <b>downward</b>, and the vertex (0, 0) is the highest point, a <b>maximum</b>.`,
  cerrada_q: "Which of these parabolas is the narrowest?",
  abierta_q: "Which of these parabolas is the widest?",
  cerr_s: (abs, e, closed) => `Compare the absolute values of a (${abs}), ignoring the sign: the ${closed ? "greater" : "smaller"} it is, the ${closed ? "narrower" : "wider"} the parabola. The ${closed ? "narrowest" : "widest"} is <b>${e}</b>.`,
  sino: ["Yes", "No"],
  pasa_q: (E, p) => `Is the point <b>${p}</b> on the parabola <b>${E}</b>?`,
  pasa_s: (a, x, g, y, ok) => `For that x: y = ${a} · ${x}² = ${g}. ${ok ? `They match: the point <b>is</b> on the parabola.` : `${g} ≠ ${y}, so the point is <b>not</b> on the parabola.`}`,
  escala_q: [k => `The area of a square is y = x², where x is the side length. If the side length is multiplied by ${k}, what is the area multiplied by?`, k => `A stone dropped from rest falls d = 4.9t² meters in t seconds. If the time is multiplied by ${k}, what is the distance it falls multiplied by?`],
  escala_s: (k, v, what) => `If ${v} is multiplied by ${k}, ${v}² is multiplied by ${k}² = ${k * k}: (${k}${v})² = ${k}² · ${v}² = ${k * k}${v}². ${what[0].toUpperCase() + what.slice(1)} is multiplied by <b>${k * k}</b>. This is not a proportional relationship: ${k === 2 ? `doubling ${v}` : k === 3 ? `tripling ${v}` : `multiplying ${v} by ${k}`} makes ${what} ${k * k} times as large.`,
  graf_q: "What is the equation of the parabola in the graph (same scale on both axes)?",
  graf_s: (a, a4, up, E) => `The vertex is (0, 0). It opens ${up ? "upward" : "downward"}, so a is ${up ? "positive" : "negative"}. It passes through the point (1, ${a}) (and also through (2, ${a4})), so a = ${a}. It is <b>${E}</b>.`,
};

// m8.frecrel
const tos8 = o => /cube/.test(o) ? "roll" : "toss";   // you roll a number cube, toss a coin or a thumbtack
S.FR = {
  // [what you toss, the event, its complement]
  objs: [["a thumbtack", "lands point up", "landing on its side"], ["a bottle cap", "lands upside down", "not landing upside down"], ["a plastic cup", "lands on its side", "not landing on its side"], ["a loaded number cube", "shows a 6", "not rolling a 6"], ["a bent coin", "lands heads up", "landing tails up"]],
  h_q: (o, N, ev, f) => `You ${tos8(o)} ${o} ${nn(N)} times, and it ${ev} on ${f} of those ${tos8(o)}${/cube/.test(o) ? "s" : "es"}. Estimate the probability that it ${ev} (as a decimal; round to the nearest thousandth if needed).`,
  h_s: (f, N, h) => `The relative frequency is f/N = ${nn(f)}/${nn(N)} = ${h}. With this many trials, it is a good estimate: P ≈ <b>${h}</b>.`,
  contr_q: (o, N, ev, f, other) => `You ${tos8(o)} ${o} ${nn(N)} times, and it ${ev} on ${f} of those ${tos8(o)}${/cube/.test(o) ? "s" : "es"}. Estimate the probability of ${other} (as a decimal).`,
  contr_s: (f, N, h, r, other) => `P ≈ ${nn(f)}/${nn(N)} = ${h} for the event you observed. The probability of ${other} is the probability of the complement: 1 − ${h} = <b>${r}</b>.`,
  // [question (N), favorable outcomes, possible outcomes]
  esperado: [[N => `You roll a number cube ${nn(N)} times. How many times would you expect to roll a 4?`, 1, 6], [N => `You roll a number cube ${nn(N)} times. How many times would you expect to roll an even number?`, 1, 2],
    [N => `You roll a number cube ${nn(N)} times. How many times would you expect to roll a multiple of 3?`, 1, 3], [N => `You toss a coin ${nn(N)} times. How many heads would you expect?`, 1, 2],
    [N => `You toss two coins ${nn(N)} times. How many times would you expect to get two heads?`, 1, 4], [N => `The probability that a bottle cap lands upside down is 0.35. How many times would you expect it to land upside down in ${nn(N)} tosses?`, 7, 20]],
  esp_q: (w, N) => w(N),
  esp_s: (N, a, b, r) => `Expected number = N · P(A) = ${nn(N)} · ${b === 20 ? "0.35" : `${a}/${b}`} = <b>${nn(r)}</b>. This is an estimate: in real life, you will get a number close to it.`,
  vaso: ["on its side", "right side up", "upside down"],
  tres_q: (N, ns, j) => `You toss a plastic cup ${nn(N)} times: it lands on its side ${ns[0]} times, right side up ${ns[1]} times, and upside down ${ns[2]} times. Estimate the probability that it lands <b>${["on its side", "right side up", "upside down"][j]}</b> (as a decimal).`,
  tres_s: (w, f, N, p) => `P(${w}) ≈ ${f}/${nn(N)} = <b>${p}</b>. The three estimates add up to 1.`,
  // [question (N, f), probability, probability as text, what it would mean]
  juicio: [[(N, f) => `You toss a coin ${nn(N)} times, and it lands heads up ${nn(f)} times.`, 0.5, "0.5", "the coin is probably unfair"], [(N, f) => `You roll a number cube ${nn(N)} times, and a 6 comes up ${nn(f)} times.`, 1 / 6, "1/6 ≈ 0.167", "the number cube is probably loaded"]],
  juicio_q: (w, N, f) => `${w(N, f)} What can you conclude?`,
  juicio_o: ["Most likely, it is unfair", "With so few trials, you can't tell", "It looks normal: the relative frequency is very close to the probability"],
  juicio_s: (c, f, N, h, p, obj) => [`The relative frequency is ${nn(f)}/${nn(N)} = ${h}, very far from ${p}. With ${nn(N)} trials, a difference like that is very suspicious: <b>most likely, it is unfair</b> (${obj}).`,
    `The relative frequency is ${nn(f)}/${nn(N)} = ${h}, somewhat far from ${p}, but with so few trials it jumps around a lot, and a result like this happens often: <b>you can't tell</b>. You would need to repeat the experiment many more times.`,
    `The relative frequency is ${nn(f)}/${nn(N)} = ${h}, very close to ${p}. With ${nn(N)} trials, <b>it looks normal</b>, just as the law of large numbers says.`][c],
  falacia_q: n => `A fair coin has landed heads up ${n} times in a row. What is the probability that the next toss lands tails up?`,
  falacia_o: ["0.5", "More than 0.5", "Less than 0.5"],
  falacia_s: "Chance doesn't “even out”: the coin has no memory, and each toss is independent of the ones before it. The probability is still <b>0.5</b>.",
};
// m8.lineal
S.LI = {
  sino: ["Yes", "No"],
  m_q: P => `The line <b>y = mx</b> passes through the point <b>${P}</b>. What is m?`,
  m_s: (y, x, m, E) => `In y = mx, substitute the point: ${y} = m · ${x}, so m = y ÷ x = ${y} ÷ ${x} = <b>${m}</b>. The function is ${E}.`,
  tab_q: E => `Complete the table of values for the function <b>${E}</b>.`,
  tab_s: (m, list) => `Multiply each x by ${m}: ${list}. Notice that x = 0 would give y = 0: the line passes through the origin.`,
  es_q: (xs, ys) => `In a table, the values x = ${xs.replace(/; /g, ", ")} are paired with y = ${ys.replace(/; /g, ", ")}. Is this a direct variation function (y = mx)?`,
  inc_q: "Which of these lines is the steepest?",
  inc2_q: "Which of these lines is the least steep (the flattest)?",
  inc_s: (l, e, big) => `How steep a line is depends on the slope without its sign (the sign only tells you whether the line rises or falls): ${l}. The ${big ? "greatest" : "smallest"} belongs to <b>${e}</b>.`,
  es_s: (q, yes, E) => `Find the quotients y ÷ x: ${q}. ${yes ? `They are all equal, so it <b>is</b> a direct variation function: ${E}.` : `They are not equal, so it is <b>not</b> a direct variation function (it is a line that doesn't pass through the origin).`}`,
};
// ── end: ═════ Inequalities, the parabola y = ax², and relative frequency (texts of the added generators) ═════

// ═════ Round M (2026-11): texts of the new generators ═════
const corta = (p, q, g) => p === q ? `the ${p} on top and the ${q} on the bottom cancel` : `${p} and ${q} divided by ${g}`;
const simp = cuts => `(simplify before multiplying: ${cuts.join("; ")})`;
// m8.frpot
S.FP = {
  corta, simp,
  q: e => `Calculate, and write the answer as a fraction in simplest form: <b>${e}</b>`,
  par: even => even ? "(even exponent: positive)" : "(odd exponent: negative)",
  par_: t => `Parentheses: ${t}.`,
  pot: t => `Power (raise both the numerator and the denominator): ${t}.`,
  prod: t => `Product: ${t}.`,
  coc: t => `Quotient (multiply by the reciprocal): ${t}.`,
  resta: t => `Subtraction: ${t}.`,
  suma: t => `Addition: ${t}.`,
  fin: r => `Answer: <b>${r}</b>.`,
};
// m8.frprob
S.FB = {
  corta, simp,
  queda1: t => `After the first part, what is left is ${t} of the total.`,
  luego: t => `The second part is a fraction of what is left (not of the total): ${t} of the total.`,
  queda2: t => `What is left: ${t} of the total.`,
  fin: r => `So <b>${r}</b> of the allowance is left.`,
  frac_q: (nm, a, c) => `${nm} spends ${a} of a weekly allowance at the movies and ${c} of what is left on a book. What fraction of the allowance is left? (Write it in simplest form.)`,
  total_q: [(nm, a, c, r) => `${nm} spends ${a} of some money on sneakers and ${c} of what is left on a video game. Now ${nm} has $${nn(r)} left. How much money did ${nm} have at first?`,
    (nm, a, c, r) => `${nm} reads ${a} of a book on Saturday and ${c} of what is left on Sunday. There are still ${nn(r)} pages to go. How many pages does the book have?`],
  total_s: (Q, r, qn, qd, j, tot, ctx) => { const am = x => ctx ? `${nn(x)} ${x === 1 ? "page" : "pages"}` : `$${nn(x)}`; return `If ${Q} of the total is ${am(r)}, ${qn === 1 ? "" : `1/${qd} is ${nn(r)} ÷ ${qn} = ${am(j)}, and `}the total (${qd}/${qd}) is ${qd} · ${nn(j)} = <b>${am(tot)}</b>.`; },
  dep_q: (a, L, c) => `A tank is filled to ${a} of its capacity. If you add ${nn(L)} liters, it reaches ${c}. What is its capacity, in liters?`,
  dep_s: (dt, D, L, dn, dd, j, tot, a, va, c, vc) => `The ${nn(L)} liters are the difference: ${dt} of the tank. ${dn === 1 ? "" : `1/${dd} is ${nn(L)} ÷ ${dn} = ${nn(j)} L. `}Capacity: ${dd} · ${nn(j)} = <b>${nn(tot)} L</b>. Check: ${a} of ${nn(tot)} is ${nn(va)} L; ${nn(va)} + ${nn(L)} = ${nn(va + L)}, and ${c} of ${nn(tot)} is ${nn(vc)} L. ✓`,
  clase_q: (N, a, c) => `In a class of ${N} students, ${a} walk to school and ${c} take the bus; the rest ride their bikes. How many students bike to school?`,
  clase_s: (st, rt, r, N, ans) => `Walking or by bus: ${st}. By bike: ${rt} of the class. ${r[0]}/${r[1]} of ${N}: ${N} ÷ ${r[1]} · ${r[0]} = <b>${ans}</b> ${ans === 1 ? "student" : "students"}.`,
};
// m8.periodico
const bar8 = x => {   // «0.2727…» → 0.27 with a bar over the repeating block
  const m = /^(−?\d+)\.(\d+)…$/.exec(x); if (!m) return x;
  const s = m[2], ov = t => `<span style="text-decoration:overline">${t}</span>`;
  for (let a = 0; a < s.length; a++) for (let L = 1; 2 * L <= s.length - a; L++) {
    const t = s.slice(a); let ok = true;
    for (let i = L; i < t.length; i++) if (t[i] !== t[i - L]) { ok = false; break; }
    if (ok) return `${m[1]}.${s.slice(0, a)}${ov(t.slice(0, L))}`;
  }
  return `${m[1]}.${ov(s)}`;
};
S.PE = {
  q: x => `Write the repeating decimal <b>${bar8(x)}</b> (${x}) as a fraction in simplest form.`,
  puro_s: (x, k, p10, xb, big, E, M, diff, ans) => `Let x = ${x} The repeating block has ${k} ${k > 1 ? "digits" : "digit"}, so multiply by ${nn(p10)}: ${nn(p10)}x = ${xb} Subtract so that the endless tail cancels out: ${nn(p10)}x − x = ${E ? `${big} − ${E} = ` : ""}${diff}, that is, ${M}x = ${diff}. x = ${diff}/${M}${`${diff}/${M}` === ans ? "" : ` = ${ans}`}. Answer: <b>${ans}</b>.`,
  mixto_s: (x, x10, p, xb, k, nb, n10, M, diff, ans) => `Let x = ${x} First, move the non-repeating part to the left of the decimal point: 10x = ${x10} Now the repeating block has ${k} ${k > 1 ? "digits" : "digit"}, so multiply 10x by ${p / 10}: ${nn(p)}x = ${xb} Subtract: ${nn(p)}x − 10x = ${nb} − ${n10}, that is, ${M}x = ${diff}. x = ${diff}/${M}${`${diff}/${M}` === ans ? "" : ` = ${ans}`}. Answer: <b>${ans}</b>.`,
  tipos: ["Terminating", "Pure repeating", "Mixed repeating"],
  tipo_q: f => `Without dividing, what kind of decimal does the fraction <b>${f}</b> give?`,
  tipo_s: (f, b, k, dtxt, c, dec) => `Simplify first! ${f} = ${b} (dividing by ${k}). Now the denominator is ${dtxt}: ${["it has no prime factors other than 2 and 5 → <b>terminating</b>", "it has neither 2 nor 5 as a factor → <b>pure</b> repeating", "it has 2 or 5 and also another prime factor → <b>mixed</b> repeating"][c]} (${b} = ${bar8(dec)}). If you don't simplify, the ${k} in the denominator can fool you.`,
};
// m8.potprop
S.PP = {
  una_q: (e, b) => `Write <b>${e}</b> as a single power of ${b}. What is the exponent?`,
  una_s: (sum, t, b) => `Same base: in a product, add the exponents; in a quotient, subtract the exponent of the divisor: ${sum} = ${neg(t)}. It is ${b}<sup>${neg(t)}</sup>${t < 0 ? ` = 1/${b}${t < -1 ? `<sup>${-t}</sup>` : ""}` : ""}; the exponent is <b>${neg(t)}</b>.`,
  base_s: (b, pasos, junto, sum, t) => `First, write everything in base ${b}: ${pasos.join(" and ")} (power of a power: multiply the exponents). You get ${junto} = ${b}<sup>${sum} </sup> = ${b}<sup>${neg(t)}</sup>. The exponent is <b>${neg(t)}</b>.`,
  pot_s: (m, n, t, b) => `Power of a power: multiply the exponents, ${m} · ${n} = ${neg(t)}. It is ${b}<sup>${neg(t)}</sup>; the exponent is <b>${neg(t)}</b>.`,
  mismo_q: e => `Calculate <b>${e}</b> without working out each power separately.`,
  mismo_s: (a, c, n, mul, base, v) => `Same exponent: ${mul ? "multiply" : "divide"} the bases, ${mul ? `${a}<sup>${n}</sup> · ${c}<sup>${n}</sup> = (${a} · ${c})<sup>${n}</sup>` : `${a}<sup>${n}</sup> ÷ ${c}<sup>${n}</sup> = (${a} ÷ ${c})<sup>${n}</sup>`} = ${base}<sup>${n}</sup> = <b>${nn(v)}</b>.`,
};
// m8.raizaprox
S.RA = {
  q: n => `Use guess and check to find √${n} to one decimal place, as an <b>approximation from below</b> (the estimate just under the exact value; don't round to the nearest tenth). You may use a calculator for the squares.`,
  s: (n, a, a2, a1, a12, lo, lo2, hi, hi2) => `Whole numbers first: ${a}² = ${a2} and ${a1}² = ${a12}, so √${n} is between ${a} and ${a1}. Now the tenths: ${lo}² = ${lo2} (less than ${n}) and ${hi}² = ${hi2} (too big). Approximation from below: √${n} ≈ <b>${lo}</b> (and from above, ${hi}).`,
  ex_q: e => `Calculate <b>${e}</b>.`,
  fr_q: "(Write the answer as a fraction.)",
  dec_s: (x, x2, trap) => `Look for a number whose square is ${x2}: ${x}² = ${x} · ${x} = ${x2}, so the square root is <b>${x}</b>. (Count the decimal places: squaring doubles them. That is why √${trap} is not ${x}.)`,
  fr_s: (p, q, p2, q2) => `Take the square root of the numerator and of the denominator: √${p2} = ${p} and √${q2} = ${q}, so √(${p2}/${q2}) = <b>${p}/${q}</b>. Check: (${p}/${q})² = ${p2}/${q2}. ✓`,
  cub_s: (r, rp, c) => `Look for a number whose cube is ${c}: ${rp}³ = ${rp} · ${rp} · ${rp} = ${c}. The cube root is <b>${r}</b>${String(c).startsWith("−") ? " (negative numbers have cube roots, and they are negative)" : ""}.`,
};
// m8.polvocab
S.PV2 = {
  sino: ["Yes", "No"],
  gr_q: p => `What is the degree of the polynomial <b>${p}</b>?`,
  gr_s: (l, g) => `The degree of a polynomial is the greatest degree of its terms (even if that term is not written first): ${l}. The greatest is <b>${g}</b>.`,
  mo_q: m => `What is the degree of the monomial <b>${m}</b>?`,
  mo_s: (m, l, s, g) => `The degree of a monomial is the sum of the exponents of all its variables (${l}): ${s} = <b>${g}</b>. The coefficient doesn't count.`,
  val_q: (p, a) => `Find P(${a}) if P(x) = <b>${p}</b>.`,
  val_s: (a, s, v, r) => `Replace x with ${a} (in parentheses if it is negative) and follow the order of operations (exponents first): ${s} = ${v} = <b>${neg(r)}</b>.`,
  raiz_q: (a, p) => `Is x = ${a} a root of the polynomial <b>${p}</b>?`,
  raiz_s: (a, s, v, r) => `Find P(${a}): ${s} = ${v} = ${neg(r)}. ${r === 0 ? "It is 0, so x = " + a + " <b>is</b> a root (the polynomial equals zero at that number)." : `It is not 0, so it is <b>not</b> a root.`}`,
};
// m8.pcvar
const amt8 = (x, u) => u === "$" ? "$" + x : x;   // "The number of members of a club goes from 200 to 220" (the subject already names the unit)
S.PV = {
  // [what, unit, starting values, cents allowed?]
  ctx: [["The rent for an apartment", "$", [400, 500, 600, 750, 800, 1000, 1200], 0], ["The price of a ticket", "$", [8, 10, 12, 15, 20, 25, 40], 1], ["The population of a town", "residents", [500, 1200, 2000, 2500, 4000, 8000], 0],
    ["The number of visits to a website", "visits", [200, 500, 1200, 2000, 5000], 0], ["The price of a liter of olive oil", "$", [4, 5, 6, 8, 10], 1], ["The number of members of a club", "members", [40, 60, 80, 120, 200, 250], 0]],
  q: (o, A, B, u) => `${o} goes from ${amt8(A, u)} to ${amt8(B, u)}. By what percent did it change? (Write the number; make it negative if it went down.)`,
  s: (A, B, i, p, u) => `Multiplier: final ÷ initial = ${B} ÷ ${A} = ${i}. ${p > 0 ? `It is greater than 1, so it went up by (${i} − 1) · 100 = <b>${p}%</b>.` : `It is less than 1, so it went down by (1 − ${i}) · 100 = ${-p}%; that is, <b>${neg(p)}%</b>.`}${p >= 100 ? ` More than 100%! Doubling is a 100% increase; tripling is a 200% increase.` : ""}`,
  pp_ctx: [["The unemployment rate"], ["The percentage of students who bike to school"], ["The relative humidity"], ["A party's share of the vote"]],
  pp_q: (w, a, b) => `${w} goes from ${a}% to ${b}%. By how many percentage points did it change? And by what percent did it change? (Negative if it goes down.)`,
  pp_f: ["Percentage points", "Percent change"],
  pp_s: (a, b, d, p) => `Percentage points: subtract the two percentages, ${b} − ${a} = <b>${neg(d)}</b> ${Math.abs(d) === 1 ? "point" : "points"}. Percent change: compare that difference with the starting value, ${neg(d)} ÷ ${a} = ${window.WA.H.dec(d / a)}; that is, <b>${window.WA.H.dec(p)}%</b>. They are not the same: ${Math.abs(d)} ${Math.abs(d) === 1 ? "point" : "points"} out of ${a} is ${window.WA.H.dec(Math.abs(p))}% of the starting value.`,
};
// m8.consumo
const uw8 = U => U === "kg" ? "kilogram" : "liter";
S.CO = {
  prods: [["Coffee", "kg", "g"], ["Rice", "kg", "g"], ["Liquid laundry detergent", "L", "mL"], ["Olive oil", "L", "mL"], ["Flour", "kg", "g"], ["Juice", "L", "mL"]],
  pu_q: (p, s1, e1, s2, e2, U) => `${p} comes in two sizes: ${s1} for $${e1} and ${s2} for $${e2}. What is the price per ${uw8(U)}, in dollars, of the size that is cheaper per ${uw8(U)}?`,
  pu_s: (rows, U, win, best) => `Price per ${uw8(U)} = price ÷ amount (in ${U}). ${rows.map(([e, q, k]) => `$${e} ÷ ${q} = $${k}/${U}`).join("; ")}. The ${win} size is cheaper: <b>$${best}/${U}</b>.`,
  of_q: [p => `With the deal “second item ${p}% off” (a ${p}% discount on the second item), what percent discount do you get on the total if you buy two?`,
    (n, m) => `The deal “${n} for ${m}” (you take ${n} and pay for ${m}) is equal to what percent discount? (Round to the nearest tenth if needed.)`,
    g => `A bottle of shampoo comes with “${g}% more free” at the same price. What percent discount is that equal to? (Round to the nearest tenth if needed.)`],
  of_s: [(p, f, t, s, d) => `For 2 items, you pay 1 + ${f} = ${t} times the price of one. You save ${s} out of 2: ${s} ÷ 2 = ${window.WA.H.dec(+s.replace(/,/g, "") / 2)}; that is, <b>${d}%</b> (not ${p}%).`,
    (n, m, d) => `You take ${n} and pay for ${m}: you don't pay for ${n - m} out of every ${n}. ${n - m}/${n} = ${d}%, so the discount is <b>${d}%</b>.`,
    (g, t, d) => `For the same money, you get ${t} instead of 100: what you would pay for the free ${g} is ${g}/${t} of the total, a <b>${d}%</b> discount (not ${g}%).`],
  pl_q: (C, n, q) => `A laptop costs $${nn(C)} if you pay all at once, or ${n} payments of $${nn(q)}. What percent more do you pay with the payment plan?`,
  pl_s: (n, q, T, C, D, i, p) => `With the payment plan: ${n} · $${nn(q)} = $${nn(T)}. You pay $${nn(T)} − $${nn(C)} = $${nn(D)} more. Compared with the price when you pay all at once: ${nn(D)} ÷ ${nn(C)} = ${i}; that is, <b>${p}%</b> more.`,
  tar: [["A gym", "Another gym", "sign-up fee"], ["A cell phone company", "Another company", "activation fee"], ["A music school", "Another music school", "registration fee"], ["A swim club", "Another swim club", "registration fee"]],
  ta_q: (w, a, b, F) => `${w[0]} charges $${a} per month. ${w[1]} charges $${b} per month plus a $${F} ${w[2]} (paid only once). After how many months do they cost the same?`,
  ta_s: (a, b, F, d, m) => `For x months, the first one costs ${a}x and the second one ${b}x + ${F}. Set them equal: ${a}x = ${b}x + ${F} → ${d}x = ${F} → x = ${F} ÷ ${d} = <b>${m}</b> months. After that, the second one is cheaper, because each month costs $${d} less.`,
};
// m8.formula (and the quadratic formula steps in m8.segundo and m8.ecproblema)
const cx1 = k => k === 1 ? "" : String(k);
S.FO = {
  fs_abc: (a, b, c) => `a = ${a}, b = ${b}, c = ${c}.`,
  fs_D: (pb, pa, pc, b2, ac4, D) => `Discriminant: Δ = b² − 4ac = ${pb}² − 4 · ${pa} · ${pc} = ${nn(b2)} ${ac4 < 0 ? "+" : "−"} ${nn(Math.abs(ac4))} = ${nn(D)}.`,
  fs_doble: (nb, den, r) => `Δ = 0, so there is only one solution (a double root): x = −b/(2a) = ${nb}/${den} = <b>${r}</b>.`,
  fs_x: (nb, sD, den, f1, r1, f2, r2) => `√Δ = ${sD}. x = (−b ± √Δ)/(2a) = (${nb} ± ${sD})/${den}: x₁ = (${nb} + ${sD})/${den} = ${f1} = <b>${r1}</b>; x₂ = (${nb} − ${sD})/${den} = ${f2} = <b>${r2}</b>.`,
  fs_neg: p => `Since a is negative, multiply the whole equation by −1, which doesn't change the solutions: ${p} = 0.`,
  fs_simp: (g, p) => `All the coefficients are multiples of ${g}, so divide by ${g}: ${p} = 0.`,
  r_q: (p, dec) => `Solve the equation <b>${p} = 0</b>.${dec ? " (One solution is not a whole number: write it as a decimal, and separate the two solutions with a semicolon.)" : ""}`,
  hint_pc: "Write the solutions separated by a semicolon, for example 1.5; −3.",
  n_q: p => `How many solutions does the equation <b>${p} = 0</b> have? (Find the discriminant.)`,
  n_o: ["Two different solutions", "One solution (a double root)", "No solution"],
  n_s: (a, b, c, pb, pa, pc, b2, ac4, D, caso) => `a = ${a}, b = ${b}, c = ${c}. Δ = b² − 4ac = ${pb}² − 4 · ${pa} · ${pc} = ${nn(b2)} ${ac4 < 0 ? "+" : "−"} ${nn(Math.abs(ac4))} = ${nn(D)}. ` +
    [`Δ is positive: <b>two different solutions</b> (you can both add and subtract √Δ).`, `Δ = 0: <b>one solution</b> (a double root), because adding or subtracting √0 gives the same result.`, `Δ is negative: <b>no solution</b>, because no real number is the square root of a negative number.`][caso],
};
// m8.ecden
S.ED = {
  q: e => `Solve the equation <b>${e}</b>. (If the solution is not an integer, write it as a fraction.)`,
  hint: "Write an integer or a fraction, for example 5 or 2/5.",
  s: (dens, M, divs, mul, minus, ex, agr, X, div) => `LCM(${dens}) = ${M}. Multiply each term by ${M} (${divs}): ${mul}. Remove the parentheses${minus ? " (a minus sign in front changes both signs inside)" : ""}: ${ex}. Collect the x-terms on one side and the numbers on the other: ${agr === `x = ${X}` ? `<b>${agr}</b>.` : `${agr}. ${div ? `x = ${div} = ` : ""}<b>${div ? X : `x = ${X}`}</b>.`}`,
};
// m8.ecproblema
S.EP = {
  ed_q: (k, n, m) => `A father is ${k} times as old as his son. In ${n} years, he will be ${m === 2 ? "twice" : m === 3 ? "three times" : `${m} times`} as old as his son will be then. How old is the son now?`,
  ed_s: (k, n, m, km, d, x, kx) => `Let x = the son's age now; the father is ${k}x. In ${n} years, the son will be x + ${n} and the father ${k}x + ${n}. Equation: ${k}x + ${n} = ${m}(x + ${n}). Solve: ${k}x + ${n} = ${m}x + ${m * n} → ${cx1(km)}x = ${m * n} − ${n} = ${d} → x = <b>${x}</b> years. Check: now they are ${x} and ${kx} years old; in ${n} years, ${x + n} and ${kx + n}, and ${kx + n} = ${m} · ${x + n}. ✓`,
  re_q: (A, d) => `A rectangular garden has an area of ${nn(A)} m², and its length is ${d} m more than its width. What is its width, in meters?`,
  re_s: (d, A, D, sD, x, _n, x2, L) => `Let x = the width; the length is x + ${d}. Equation: x(x + ${d}) = ${nn(A)}, that is, x² + ${cx1(d)}x − ${nn(A)} = 0. Δ = ${d}² + 4 · ${nn(A)} = ${nn(D)}, √${nn(D)} = ${sD}. x = (−${d} ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (negative: a side can't have that length, so it doesn't work). Width: <b>${x} m</b> (and length, ${L} m). Check: ${x} · ${L} = ${nn(A)}. ✓`,
  co_q: P => `The product of two consecutive whole numbers is ${nn(P)}. What is the smaller number?`,
  co_s: (P, D, sD, x, x2) => `Let x = the smaller number; the next one is x + 1. Equation: x(x + 1) = ${nn(P)}, that is, x² + x − ${nn(P)} = 0. Δ = 1 + 4 · ${nn(P)} = ${nn(D)}, √${nn(D)} = ${sD}. x = (−1 ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (not a whole number, so it doesn't work). The smaller number is <b>${x}</b>. Check: ${x} · ${x + 1} = ${nn(P)}. ✓`,
  cu_q: (k, N) => `If you subtract ${k === 1 ? "the number itself" : k === 2 ? "twice the number" : "three times the number"} from the square of a whole number, you get ${nn(N)}. What is the number?`,
  cu_s: (k, N, D, sD, x, x2) => `Let x = the number. Equation: x² − ${cx1(k)}x = ${nn(N)}, that is, x² − ${cx1(k)}x − ${nn(N)} = 0. Δ = ${k}² + 4 · ${nn(N)} = ${nn(D)}, √${nn(D)} = ${sD}. x = (${k} ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (not a whole number, so it doesn't work). The number is <b>${x}</b>. Check: ${x}² − ${k === 1 ? "" : `${k} · `}${x} = ${x * x} − ${k * x} = ${nn(N)}. ✓`,
};
// m8.sistema, m8.sissus, m8.sisigu, m8.sisred
S.SI = {
  por: ["(Solve it by substitution.)", "(Solve it by the equal values method.)", "(Solve it by elimination.)"],
  desp: (v, k, s) => `Solve the ${k ? "second" : "first"} equation for ${v} (its coefficient is ${s < 0 ? "−1" : "1"}):`,
  sust: o => `Substitute into the ${o ? "second" : "first"} equation:`,
  vuelve: "Go back to the equation you solved for that variable:",
  comp: "Check:",
  mult: (i, m, eq) => `Multiply the ${i ? "second" : "first"} equation by ${m}: ${eq}.`,
  resta: "The coefficients are equal, so subtract (first minus second) term by term:",
  suma: "The coefficients are opposites, so add term by term:",
  esdecir: "that is,",
  en1: "Substitute into the first equation:",
  en1y: "Substitute into the first expression:",
  ya: "Both equations are already solved for y:",
  desp2: "Solve both equations for y:",
  iguala: "Set the two expressions for y equal to each other:",
};
// m8.pitplano
S.PL = {
  diag: "The diagonal is the hypotenuse:", lado: "The side is the hypotenuse:",
  hip: (t, a, b, a2, b2, c, u) => `${t} ${a}² + ${b}² = ${nn(a2)} + ${nn(b2)} = ${nn(a2 + b2)}, so the length is √${nn(a2 + b2)} = <b>${c} ${u}</b>.`,
  iso: m => `The height cuts the base in half (${m} cm). This gives a right triangle with one of the equal sides as its hypotenuse.`,
  esc: "The ladder is the hypotenuse, and the height is a leg (subtract):",
  cat: (c, a, c2, a2, b, u) => `Missing leg: leg² = ${c}² − ${a}² = ${nn(c2)} − ${nn(a2)} = ${nn(c2 - a2)}, so the leg is √${nn(c2 - a2)} = <b>${b} ${u}</b> long.`,
  rombo_q: (D, d) => `A rhombus has diagonals of ${D} cm and ${d} cm. How long is each side?`,
  rombo: (p, q) => `The diagonals of a rhombus cross at right angles and cut each other in half. With a side, they form a right triangle with legs ${p} and ${q} (half of each diagonal).`,
  dist_q: (A, B) => `What is the distance between the points A${A} and B${B}?`,
  dist: (dx, dy, a, b, s, c) => `The legs are the differences of the coordinates: in x, ${dx}; in y, ${dy} (a negative result doesn't matter, because it gets squared). Then d² = ${a}² + ${b}² = ${nn(a * a)} + ${nn(b * b)} = ${nn(s)}, so d = √${nn(s)} = <b>${c}</b>.`,
  equi_q: l => `Find the height of an equilateral triangle with ${l} cm sides. (Use a calculator for the square root and round to the nearest tenth.)`,
  hex_q: l => `Find the apothem of a regular hexagon with ${l} cm sides. (Use a calculator for the square root and round to the nearest tenth.)`,
  equi: "The height meets the base at its midpoint. This gives a right triangle with a side of the triangle as the hypotenuse and half a side as a leg.",
  hex: l => `A regular hexagon is made of 6 equilateral triangles with ${l} cm sides, and the apothem is the height of one of them: hypotenuse ${l} and leg ${l / 2} (half the side).`,
  cat2: (l, m, l2, m2, h2, d3, v) => `Then h² = ${l}² − ${m}² = ${nn(l2)} − ${nn(m2)} = ${nn(h2)}, so h = √${nn(h2)} = ${d3}… ≈ <b>${v} cm</b>.`,
};
// m8.pitesp
const slant3 = v => v === "g" ? "ℓ" : v;   // generatriz → slant height ℓ (la apotema de la pirámide sigue siendo a′, como en la lección)
S.PE3 = {
  caja: (a, b, c, a2, b2, c2, s, d) => `Use the Pythagorean Theorem in 3D: D² = ${a}² + ${b}² + ${c}² = ${nn(a2)} + ${nn(b2)} + ${nn(c2)} = ${nn(s)}, so D = √${nn(s)} = <b>${d} cm</b>.`,
  cono_g_q: (r, h) => `A cone has a radius of ${r} cm and a height of ${h} cm. What is its slant height?`,
  cono_h_q: (g, r) => `A cone has a slant height of ${g} cm and a radius of ${r} cm. What is its height?`,
  cono: "The height, the radius, and the slant height form a right triangle, and the slant height is the hypotenuse.",
  hip3: (v, a, b, a2, b2, c, u) => `Then ${slant3(v)}² = ${a}² + ${b}² = ${nn(a2)} + ${nn(b2)} = ${nn(a2 + b2)}, so ${slant3(v)} = √${nn(a2 + b2)} = <b>${c} ${u}</b>.`,
  cat3: (v, c, a, c2, a2, b) => `Then ${slant3(v)}² = ${c}² − ${a}² = ${nn(c2)} − ${nn(a2)} = ${nn(c2 - a2)}, so ${slant3(v)} = √${nn(c2 - a2)} = <b>${b} cm</b>.`,
  pir_q: (L, h) => `A square pyramid has a base side of ${L} m and a height of ${h} m. What is its slant height (the height of each lateral face)?`,
  pir: p => `The height of the pyramid, the apothem of the base (for a square, half the side: ${p} m), and the slant height of the pyramid, a′, form a right triangle; a′ is the hypotenuse.`,
  cabe_q: (L, a, b, c) => `Does a rod ${L} cm long fit inside a box measuring ${a} × ${b} × ${c} cm (it can be tilted)?`,
  cabe: (a, b, c, a2, b2, c2, s, D, L, ok) => `The longest rod that fits is the diagonal: D² = ${a}² + ${b}² + ${c}² = ${nn(a2)} + ${nn(b2)} + ${nn(c2)} = ${nn(s)}, so D = √${nn(s)} ≈ ${D} cm (with a calculator). The rod is ${L} cm long, which is ${ok ? "less" : "more"} than the diagonal, so <b>${ok ? "yes, it fits" : "no, it doesn't fit"}</b>.`,
};
// m8.trisem
const and3 = s => s.replace(/, ([^,]*)$/, ", and $1");
S.TS = {
  ang_q: (a, b, c, g) => `One triangle has two angles of ${a}° and ${b}°. Another has two angles of ${c}° and ${g}°. Are they similar?`,
  ang_s: (a, b, c, g, yes) => `The third angle of the first triangle is 180° − ${a}° − ${b}° = ${c}°, so its angles are ${a}°, ${b}°, and ${c}°. ${yes ? `The second triangle has angles of ${b}° and ${g}°, two angles equal to those of the first: <b>yes</b>, they are similar (for triangles, two pairs of equal angles are enough).` : `The second triangle has an angle of ${g}°, which is none of those: <b>no</b>, they are not similar.`}`,
  lad_q: (p, q) => `Is a triangle with sides of ${and3(p)} cm similar to a triangle with sides of ${and3(q)} cm?`,
  lad_s: (l, yes) => `Divide each side of the second triangle by the matching side of the first (largest with largest…): ${l}. ${yes ? "The three ratios are equal: the sides are proportional, so <b>yes</b>, the triangles are similar." : "The ratios are not equal: <b>no</b>, the triangles are not similar."}`,
  tal_q: (AD, DB, AE) => `In triangle ABC, a line parallel to BC crosses AB at D and AC at E. If AD = ${AD} cm, DB = ${DB} cm, and AE = ${AE} cm, what is EC?`,
  tal_s: (AD, DB, AE, k, EC) => `By the intercept theorem, AE/AD = EC/DB. Ratio: AE ÷ AD = ${AE} ÷ ${AD} = ${k}. So EC = DB · ${k} = ${DB} · ${k} = <b>${EC} cm</b>.`,
  de_q: (AD, DB, BC) => `In triangle ABC, a line parallel to BC crosses AB at D and AC at E. If AD = ${AD} cm, DB = ${DB} cm, and BC = ${BC} cm, what is DE?`,
  de_s: (AD, DB, AB, BC, DE) => `Triangles ADE and ABC are similar (one is nested inside the other, with DE parallel to BC). Careful: the side that matches AD is all of AB, AB = ${AD} + ${DB} = ${AB} cm, not DB. DE/BC = AD/AB, so DE = ${BC} · ${AD}/${AB} = <b>${DE} cm</b>.`,
};
// m8.escala
S.ES = {
  hab_q: (n, a, b) => `On a floor plan of a house at a scale of 1:${nn(n)}, a rectangular room measures ${a} cm × ${b} cm. What is its real area in square meters?`,
  hab_s: (n, a, b, A, B, Am, Bm, ar) => `To go from the plan to real life, multiply every length by ${nn(n)}: ${a} · ${nn(n)} = ${A} cm = ${Am} m and ${b} · ${nn(n)} = ${B} cm = ${Bm} m. Area: ${Am} · ${Bm} = <b>${ar} m²</b>.`,
  sup_q: (n, s) => `On a plan at a scale of 1:${nn(n)}, a garden takes up ${s} cm². What is its real area in square meters?`,
  sup_s: (n, s, n2, c, m) => `Lengths are multiplied by ${nn(n)}, so areas are multiplied by ${nn(n)}² = ${n2}: ${s} · ${n2} = ${c} cm². Since 1 m² = 10,000 cm², that is ${c} ÷ 10,000 = <b>${m} m²</b>.`,
  maq_q: (n, V) => `A 1:${nn(n)} scale model of a water tank has a volume of ${V} cm³. What is the volume of the real tank in cubic meters?`,
  maq_s: (n, V, n3, c, m) => `Lengths are multiplied by ${nn(n)}, so volumes are multiplied by ${nn(n)}³ = ${n3}: ${V} · ${n3} = ${c} cm³. Since 1 m³ = 1,000,000 cm³, that is ${c} ÷ 1,000,000 = <b>${m} m³</b>.`,
  amp_q: (n, d) => `A drawing of an insect at a scale of ${nn(n)}:1 (an enlargement) is ${d} cm long. How many millimeters long is the real insect?`,
  amp_s: (n, d, mm, r) => `A scale of ${nn(n)}:1 means the drawing is ${nn(n)} times as large as the real insect, so divide by ${nn(n)}. ${d} cm = ${mm} mm; ${mm} ÷ ${nn(n)} = <b>${r} mm</b>.`,
};
// m8.poliedros
const ELN = ["faces", "vertices", "edges"];
const an3 = w => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
S.PO = {
  el_q: (pir, n, el) => `How many ${ELN[el]} does ${pir ? "a pyramid" : "a prism"} have if its base is a polygon with ${n} sides?`,
  el_s: (pir, n, el, v) => pir
    ? [`The base and ${n} lateral faces (triangles): ${n} + 1 = <b>${v}</b>.`, `The ${n} vertices of the base and the one at the top (the apex): ${n} + 1 = <b>${v}</b>.`, `There are ${n} edges on the base and ${n} lateral edges that go up to the apex: 2 · ${n} = <b>${v}</b>.`][el]
    : [`The two bases and ${n} lateral faces (rectangles): ${n} + 2 = <b>${v}</b>.`, `Each base has ${n} vertices: 2 · ${n} = <b>${v}</b>.`, `Each base has ${n} edges, and there are ${n} lateral edges: 3 · ${n} = <b>${v}</b>.`][el],
  eu_q: (miss, C, V, A) => `A polyhedron (with no holes) has ${[`${V} vertices and ${A} edges`, `${C} faces and ${A} edges`, `${C} faces and ${V} vertices`][miss]}. By Euler's formula, how many ${ELN[[0, 1, 2][miss]]} does it have?`,
  eu_s: (miss, C, V, A) => `Euler's formula: F + V = E + 2. ` + [
    `Substitute: F + ${V} = ${A} + 2, that is, F + ${V} = ${A + 2}. Solve for F: F = ${A + 2} − ${V} = <b>${C}</b> faces.`,
    `Substitute: ${C} + V = ${A} + 2, that is, ${C} + V = ${A + 2}. Solve for V: V = ${A + 2} − ${C} = <b>${V}</b> vertices.`,
    `Substitute: ${C} + ${V} = E + 2, that is, ${C + V} = E + 2. Solve for E: E = ${C + V} − 2 = <b>${A}</b> edges.`][miss] + " (Euler's formula gives the number, but it doesn't tell you which polyhedron it is: there could be several.)",
  cil_q: (a, b) => `A rectangle measuring ${a} cm × ${b} cm is rotated around its ${a} cm side. What is the radius of the cylinder it forms?`,
  cil_s: (a, b) => `The side it rotates around (${a} cm) is the axis: it is the height of the cylinder. The other side, perpendicular to the axis, sweeps out the base: the radius is <b>${b} cm</b>.`,
  con_q: (a, b, g) => `A right triangle with legs of ${a} cm and ${b} cm is rotated around its ${a} cm leg. What is ${g ? "the slant height" : "the radius of the base"} of the cone it forms?`,
  con_s: (a, b, c, g) => `The leg it rotates around (${a} cm) is the axis: it is the height of the cone. The other leg is the radius of the base, ${b} cm.` + (g ? ` The slant height is the hypotenuse: ℓ² = ${a}² + ${b}² = ${nn(a * a)} + ${nn(b * b)} = ${nn(c * c)}, so ℓ = √${nn(c * c)} = <b>${c} cm</b>.` : ` The radius is <b>${b} cm</b>.`),
  // [name, faces at each vertex, polygon, angle]
  reg: [["tetrahedron", 3, "equilateral triangles", 60], ["cube", 3, "squares", 90], ["octahedron", 4, "equilateral triangles", 60], ["dodecahedron", 3, "regular pentagons", 108], ["icosahedron", 5, "equilateral triangles", 60]],
  reg_q: n => `How many faces meet at each vertex of ${an3(n)}?`,
  reg_s: (n, k, pol, ang, s) => `The faces of ${an3(n)} are ${pol}, with angles of ${ang}°. At each vertex, <b>${k}</b> faces meet: ${k} · ${ang}° = ${s}°, which is less than 360° (if the angles added up to 360° or more, the vertex couldn't close up).`,
};
// m8.funcar
S.FC = {
  int_q: up => `Look at the graph. On what interval is the function <b>${up ? "increasing" : "decreasing"}</b>?`,
  int_s: (up, iv, x1, y1, x2, y2) => `Reading from left to right, between x = ${x1} and x = ${x2} the graph goes ${up ? "up" : "down"} (from y = ${y1} to y = ${y2}): it is ${up ? "increasing" : "decreasing"} on <b>${iv}</b>. Intervals are given with the <b>x</b>-values, not the y-values.`,
  de: (a, b) => `From ${a} to ${b}`,
  rec_q: "Look at the graph (it is drawn in full, from x = 0 to x = 8). What is its range?",
  rec_s: (a, b) => `The range is the set of values that <b>y</b> takes: the lowest point of the graph is at height ${a}, and the highest is at ${b}. Range: <b>from ${a} to ${b}</b>. (From 0 to 8 is the domain, the x-values.)`,
  max_q: "Look at the graph. At what point does the function reach its maximum?",
  max_s: (x, y) => `The function increases up to x = ${x} and then decreases: the highest point is <b>(${x}, ${y})</b>. The maximum is a point (x, y); ${y} is only the maximum value, the y-coordinate.`,
  cx_q: e => `At what value of x does the graph of <b>y = ${e}</b> cross the x-axis?`,
  cx_s: (e, a, b, x) => `On the x-axis, the height is 0, so set y = 0 and solve ${e} = 0 → ${a === 1 ? "" : a === -1 ? "−" : neg(a)}x = ${neg(-b)} → x = ${neg(-b)} ÷ ${a < 0 ? `(${neg(a)})` : a} = <b>${neg(x)}</b>. It crosses the x-axis at (${neg(x)}, 0).`,
};
// m8.afin: [context, possible b values, possible m values]
const usd3 = x => "$" + (/\.\d$/.test(x) ? x + "0" : x);   // $2.5 → $2.50
const AFQ = [
  (n, m) => `A taxi charges a base fare of ${usd3(n)} plus ${usd3(m)} per kilometer.`,
  (n, m) => `A streaming service charges a ${usd3(n)} sign-up fee plus ${usd3(m)} per month.`,
  (n, m) => `A water tank holds ${n} liters and loses ${m} liters every hour.`,
  (n, m) => `A candle is ${n} cm tall and burns down ${m} cm every hour.`,
  (n, m) => `A plumber charges ${usd3(n)} for a house call plus ${usd3(m)} for each hour of work.`];
const AFX = [["the number of kilometers", "the price (in dollars)", "kilometer"], ["the number of months", "the total amount paid (in dollars)", "month"], ["the number of hours", "the number of liters left in the tank", "hour"], ["the number of hours", "the height of the candle (in cm)", "hour"], ["the number of hours", "the price (in dollars)", "hour"]];
S.AF = {
  mn_n: "b",   // y-intercept
  ctx: [[0, [2.5, 3, 3.5, 4], [1, 1.2, 1.5, 2]], [1, [5, 10, 15], [8, 10, 12]], [2, [100, 120, 150, 200], [-5, -8, -10]], [3, [20, 24, 30], [-1.5, -2]], [4, [20, 30, 40], [15, 20, 25]]],
  f_q: (c, n, m) => `${AFQ[c](n, m)} Let x be ${AFX[c][0]} and y ${AFX[c][1]}.`,
  f_s: (c, n, m, E) => `At the start (x = 0), y is ${n}: that is the y-intercept, b = ${n}. For each ${AFX[c][2]}, y changes by ${m.startsWith("−") ? `${m} (it goes down)` : `+${m}`}: that is the slope, m = ${m}. Equation: <b>${E}</b>.`,
  y_q: (c, x) => `What is the value of y when x = ${x}?`,
  y_s: (E, x, m, n, y, c) => `The equation is ${E}. Substitute x = ${x}: y = ${m} · ${x} + ${n} = <b>${y}</b>.`,
  x_q: (c, y) => `For what value of x is y = ${y}?`,
  x_s: (E, y, m, n, d, x, c) => `The equation is ${E}. Set y = ${y}: ${y} = ${m}x + ${n} → ${m}x = ${y} − ${n} = ${d} → x = ${d} ÷ ${m.startsWith("−") ? `(${m})` : m} = <b>${x}</b>.`,
  mn_q: e => `What are the slope (m) and the y-intercept (b) of the line <b>${e}</b>?`,
  mn_s: (e, m, n) => `First, write it in the form y = mx + b: y = ${e}. The slope is the number that multiplies x: <b>m = ${neg(m)}</b>; the y-intercept is the constant term: <b>b = ${neg(n)}</b>. (Careful: the first number you see is not always the slope.)`,
};
// m8.muestra
const yy = l => l.length < 3 ? l.join(" and ") : l.slice(0, -1).join(", ") + ", and " + l[l.length - 1];
S.MU = {
  prop_ctx: [["A school has", ["middle school students", "high school students", "vocational students"]], ["A town has", ["residents in the north district", "residents in the south district", "residents downtown"]], ["A club has", ["children", "teens", "adults"]]],
  prop_q: (ctx, nm, sz, n, j) => `${ctx} ${yy(sz.map((s, i) => `${nn(s)} ${nm[i]}`))}. You want to choose a sample of ${n} people in which each group is in the same proportion as in the whole group. How many of them must be ${nm[j]}?`,
  prop_s: (nm, s, T, p, t, n, r) => `There are ${nn(s)} ${nm} out of ${nn(T)}, that is, ${nn(s)}/${nn(T)} = ${p}/${t} of the total. The sample must have the same fraction: ${p}/${t} of ${n} = ${n} ÷ ${t} · ${p} = <b>${r}</b>.`,
  // [situation, biased?, why]
  ses: [["To find out how much exercise the residents of a town get, a researcher asks the people leaving the gym.", 1, "people leaving the gym exercise more than average: the sample favors one kind of resident"],
    ["To find out how many hours people in a country spend online, a survey is done… online.", 1, "only people who use the internet answer; people who don't use it never show up"],
    ["To find out what the whole school thinks of the cafeteria, only the 7th graders are asked.", 1, "7th graders don't represent the students in the other grades"],
    ["To find out the mean height of the students at a school, 60 names are drawn at random from all the class lists.", 0, "every student has the same chance of being chosen"],
    ["To find out which soccer team people in a city prefer, fans are asked as they leave the stadium of one of the teams.", 1, "the people leaving a stadium are mostly fans of that team"],
    ["To find out how much time students spend reading, students are asked at the library on a Saturday morning.", 1, "people at the library on a Saturday probably read more than average"],
    ["To study the weight of the oranges in an orchard, 5 oranges are picked at random from each of 20 trees chosen by drawing lots.", 0, "the trees and the oranges are chosen at random, without favoring any kind"],
    ["To find out what the children at a school eat, 3 students are chosen at random from each class, and what they eat is recorded for a week.", 0, "every class is represented, and the students are chosen at random"]],
  ses_q: t => `${t} Is the sample biased?`,
  ses_s: (s, w) => s ? `<b>Yes</b>, because ${w}. The conclusions would not hold for the whole population.` : `<b>No</b>, because ${w}. It is a representative sample.`,
  // [statement(N, n), N, n, variable]
  pm: [[(N, n) => `To find out how many hours the ${nn(N)} residents of a town sleep, a researcher asks ${nn(n)} of them.`, 1200, 150, "the number of hours each resident sleeps"],
    [(N, n) => `To find out the favorite color of the ${nn(N)} students at a school, a survey asks ${nn(n)} of them.`, 800, 80, "favorite color"],
    [(N, n) => `A factory makes ${nn(N)} light bulbs a day; to check how long they last, it tests ${nn(n)} of them.`, 5000, 100, "how long each light bulb lasts"],
    [(N, n) => `To find out how many books the ${nn(N)} members of a library read in a year, the library asks ${nn(n)} of them.`, 2000, 200, "the number of books read"]],
  pm_q: (txt, x, v, w) => `${txt} ${w === 2 ? `In this study, what is “${v}”?` : `In this study, what are the ${nn(x)}?`}`,
  pm_o: ["The population", "The sample", "An individual", "The statistical variable"],
  pm_s: (N, n, v) => `The **population** is the whole group you want to study (the ${nn(N)}); the **sample** is the part that is actually surveyed or tested (the ${nn(n)}); each one of them is an **individual**, and what is measured or asked (“${v}”) is the **statistical variable**.`.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
};
// m8.tablafrec
S.TF = {
  disc: [["the number of siblings they have", [0, 1, 2, 3, 4]], ["the number of pets they have", [0, 1, 2, 3]], ["the number of goals they score per game", [0, 1, 2, 3, 4]], ["the number of books they read this summer", [0, 1, 2, 3, 4, 5]]],
  disc_q: (ctx, N, tab, v, k) => `A survey asks ${N} students about ${ctx}. Value: number of students → ${tab}. ${[`How many students answered ${v} or less?`, `How many students answered more than ${v}?`, `What percent of the students answered ${v} or less?`][k]}`,
  disc_s: (v, sm, acc, N, k, r) => `Cumulative frequency of ${v} (the students who answered ${v} or less): ${sm} = ${acc}. ` + [`Answer: <b>${r}</b>.`, `The students who answered more than ${v} are all the others: ${N} − ${acc} = <b>${r}</b>.`, `Percent: ${acc} ÷ ${N} = ${window.WA.H.dec(acc / N)}, that is, <b>${r}%</b>.`][k],
  ag_q: tab => `Heights of a group of students, in cm (class: number of students): ${tab}.`,
  menos_q: L => `How many students are shorter than ${L} cm?`,
  menos_s: (L, cl, sm, r) => `The students shorter than ${L} cm are the ones in the classes ${cl} (${L} itself belongs to the next class): ${sm} = <b>${r}</b>.`,
  modal_q: "What is the modal class?",
  modal_s: (c, f) => `The modal class is the one with the most data values: <b>${c}</b>, with ${f} students.`,
  marca_q: c => `What is the class midpoint of ${c}?`,
  marca_s: (a, b, m) => `The class midpoint is the middle of the class: (${a} + ${b}) ÷ 2 = <b>${m}</b>.`,
  front_q: x => `A student is exactly ${x} cm tall. In which class is the student counted?`,
  front_s: (x, c) => `The classes have the form [a, b): they include the left endpoint but not the right one. A height of ${x} cm goes in <b>${c}</b>.`,
  // [situation, graph (0 bar, 1 circle, 2 histogram, 3 line), why]
  graf: [["The number of siblings of the students in a class (0, 1, 2, 3…).", 0, "it is a discrete quantitative variable: one bar for each value"],
    ["What part of a family's budget goes to housing, food, transportation, and entertainment.", 1, "you want to see what part of the total each item is"],
    ["The heights of 200 people, grouped in intervals of 5 cm.", 2, "they are continuous data grouped in intervals: bars that touch"],
    ["The temperature in a city each day of a month.", 3, "you want to see how something changes over time"],
    ["The number of goals scored in each game of a league (0, 1, 2…).", 0, "it is a discrete quantitative variable: one bar for each value"],
    ["How the votes are split among the parties in an election.", 1, "you want to see what part of the total each party gets"],
    ["The time it takes 100 students to run 1 km, grouped in intervals of 30 seconds.", 2, "it is a continuous variable grouped in intervals"],
    ["The number of visitors to a museum each month for two years.", 3, "you want to see how it changes over time"]],
  graf_q: t => `Which graph is the best choice to display this? ${t}`,
  graf_o: ["Bar graph", "Circle graph", "Histogram", "Line graph"],
  graf_s: (g, w) => `<b>${g}</b>, because ${w}.`,
};
// m8.central
S.CE = {
  med_y: (a, b) => `${a} and ${b}`,
  ctx: [["the number of siblings they have", [0, 1, 2, 3, 4]], ["their score on a test (from 4 to 9)", [4, 5, 6, 7, 8, 9]], ["the number of pets they have", [0, 1, 2, 3]], ["the number of books they read over the summer", [0, 1, 2, 3, 4, 5]]],
  media_q: (ctx, N, tab) => `A survey asks ${N} students about ${ctx}. Value: number of students → ${tab}. Find the mean (as a decimal).`,
  media_s: (pr, s, fs, N, m) => `Multiply each value by its frequency and add: ${pr} = ${nn(s)}. Total number of data values: N = ${fs} = ${N}. Mean = ${nn(s)} ÷ ${N} = <b>${m}</b>. (Divide by ${N}, the total number of data values, not by the number of different values.)`,
  med_q: (ctx, N, tab) => `A survey asks ${N} students about ${ctx}. Value: number of students → ${tab}. Find the median.`,
  med_s: (N, odd, k, acc, vals, me, o) => odd
    ? `There are ${N} data values (an odd number): the median is the value in position ${k} (it leaves ${k - 1} on each side). Cumulative frequencies: ${acc}. The ${window.WA.H.ord(k)} value is ${vals}: <b>median = ${me}</b>.`
    : `There are ${N} data values (an even number): the middle ones are the ${window.WA.H.ord(k)} and the ${window.WA.H.ord(k + 1)}. Cumulative frequencies: ${acc}. Those two values are ${vals}: <b>median = ${me}</b> (the mean of the two).`,
  nota_q: (nm, n, m, m2) => `The mean of ${nm}'s ${n} test scores is ${m} (out of 10). What score does ${nm} need on the next test to raise the mean to ${m2}?`,
  nota_s: (n, m, s, m2, n1, s2, x) => `Right now, the scores add up to ${n} · ${m} = ${s}. With ${n1} tests and a mean of ${m2}, they must add up to ${n1} · ${m2} = ${s2}. Score needed: ${s2} − ${s} = <b>${x}</b>.`,
  cual: [["The favorite color of the students in a class."], ["The brand of cell phone the teachers at a school have."], ["The favorite sport of the members of a club."]],
  datos: d => `The number of minutes it takes some friends to get to school: ${d}.`,
  el_q: t => `${t} Which measure best describes the typical value?`,
  el_o: ["The mean", "The median", "The mode"],
  el_s: (m, me, ext) => ext ? `Mean: ${m}; median: ${me}. One value is far from the others and “pulls” the mean toward it: the <b>median</b> better represents most of the data.` : `Mean: ${m}; median: ${me}. The data values are close together, with no extreme values: the <b>mean</b> represents them well and uses all the data.`,
  el_s2: "The variable is categorical (the values are not numbers): you can't find the mean or the median. Only the <b>mode</b>, the most common value, makes sense.",
};
// m8.dispersion
S.DI = {
  dm_q: d => `Find the mean absolute deviation (MAD) of the data ${d}.`,
  dm_s: (sm, s, n, m, dl, ds, sd, dm) => `Mean: (${sm}) ÷ ${n} = ${s} ÷ ${n} = ${m}. Distances from the mean (without signs): ${dl}. Their sum: ${ds} = ${sd}. Mean absolute deviation: ${sd} ÷ ${n} = <b>${dm}</b>. (If you add the differences with their signs, you always get 0: that is why distances are used.)`,
  cmp_ctx: ["Points scored by two players, A and B, in 5 games", "Waiting times, in minutes, for two buses, A and B, over 5 days", "Goals scored by two teams, A and B, in 5 games"],
  cmp_q: (c, a, b) => `${c}: A → ${a}; B → ${b}. They have the same mean. Which one is more consistent (its data are less spread out)?`,
  cmp_o: ["A", "B", "They are equally consistent, because they have the same mean"],
  cmp_s: (m, ra, rb, da, db, w) => `Both data sets have a mean of ${m}, so the mean can't tell them apart. Range: A, ${ra}; B, ${rb}. Mean absolute deviation: A, ${da}; B, ${db}. The more consistent one is the one with less spread: <b>${w}</b>.`,
};
// m8.sucesos
const EXP = [n => "You roll a number cube", n => `You spin a spinner with the numbers 1 to ${n}`, n => `You spin a spinner with the numbers 1 to ${n}`];
S.SU = {
  prop: (p, k) => ["getting an even number", "getting an odd number", "getting a multiple of 3", "getting a prime number", `getting a number greater than ${k}`, `getting a number less than ${k}`][p],
  head: (e, n, a, b) => `${EXP[e](n)}. A = “${a}” and B = “${b}.”`,
  sets: (A, B) => `Write the events as sets: A = ${A} and B = ${B}.`,
  u_q: "How many outcomes are in A ∪ B?",
  u_s: (U, n) => `A ∪ B (A <b>or</b> B) contains the outcomes that are in at least one of the two, without repeats: ${U}. It has <b>${n}</b>${n === 1 ? " outcome" : " outcomes"}.`,
  i_q: "How many outcomes are in A ∩ B?",
  i_s: (I, n) => `A ∩ B (A <b>and</b> B) contains the outcomes that are in both at the same time: ${I}. It has <b>${n}</b>${n === 1 ? " outcome" : " outcomes"}.`,
  c_q: (e, n, a) => `${EXP[e](n)}. What is the complement of A = “${a}”?`,
  c_s: (A, nA, inc) => `A = ${A}. The complement, Ā, is <b>all</b> the outcomes that are not in A: <b>${nA}</b>. (The set ${inc} has nothing in common with A, but it is missing some outcomes: it is mutually exclusive with A, not its complement.)`,
  k_q: "Can A and B happen at the same time?",
  k_s: (I, yes) => yes ? `A ∩ B = ${I}: they have outcomes in common, so they can happen at the same time: <b>yes</b>. They are not mutually exclusive.` : `A ∩ B = ∅: they have no outcomes in common. <b>No</b>, they can't happen at the same time (they are mutually exclusive).`,
};
// m8.laplace
S.LP = {
  mon_w: w => w.replace(/[CX]/g, c => c === "C" ? "H" : "T"),   // H = heads, T = tails
  dd_q: (s, no) => `You roll two number cubes. What is the probability that the sum ${no ? "is <b>not</b>" : "is"} ${s}? (Write the fraction in simplest form.)`,
  dob_q: "You roll two number cubes. What is the probability of rolling doubles (the same number on both cubes)? (Write the fraction in simplest form.)",
  dd_s: (pairs, f, r) => `Possible outcomes: 6 · 6 = 36 (as in a two-way table; (1, 2) and (2, 1) are different outcomes). Favorable outcomes: ${pairs}: ${f}. P = ${r}.`,
  no_s: (p, c) => `The question asks for the complement: 1 − ${p} = <b>${c}</b>.`,
  mon_q: k => `You toss three coins. What is the probability of getting ${k === 0 ? "no heads" : `exactly ${k === 1 ? "one head" : `${k} heads`}`}? (Write the fraction in simplest form.)`,
  mon_s: (all, fav, f, r) => `A tree diagram gives 2 · 2 · 2 = 8 equally likely outcomes: ${all}. Favorable outcomes: ${fav || "none"} (${f}). P = <b>${r}</b>.`,
  // [event, favorable outcomes, why, is the complement asked?]
  bar: [["it is an ace", 4, "there are 4 aces, one in each suit", false], ["it is a face card (jack, knight, or king)", 12, "there are 3 face cards in each of the 4 suits: 12", false],
    ["it is a coins card", 10, "each suit has 10 cards", false], ["it is an ace or a king", 8, "4 aces and 4 kings: 8", false], ["it is a face card from the coins suit", 3, "the jack, knight, and king of coins: 3", false],
    ["it is <b>not</b> a face card", 12, "there are 3 face cards in each suit: 12 face cards", true], ["it is <b>not</b> a cups card", 10, "there are 10 cups cards", true], ["it is <b>not</b> an ace", 4, "there are 4 aces", true]],
  bar_q: t => `You draw a card from a Spanish deck of 40 cards: 4 suits — coins, cups, swords, and clubs — each numbered 1–7 (the 1 is the ace) plus a jack, a knight, and a king. What is the probability that ${t}? (Write the fraction in simplest form.)`,
  bar_s: (w, f, r) => `Possible outcomes: 40. Favorable outcomes: ${w}. P = ${r}.`,
};
// Integers of 4+ digits that reach the texts unformatted (squares, products, sums…) get a thousands comma:
// 1681 − 81 = 1600 → 1,681 − 81 = 1,600; 2601.0101… → 2,601.0101…. Fractions (2575/990), decimal digits and
// exponents are left alone, and so is the repeating block under the bar (0.571428 with a bar, from bar8).
const g4 = s => typeof s === "string" ? s.replace(/(?<![\d\/]|\d[.,]|overline">)\d{4,}(?!\d|,\d|\/|<\/sup>)/g, n => nn(+n)) : s;
const wrap = o => { for (const k of Object.keys(o)) { const v = o[k]; if (typeof v === "function") o[k] = (...a) => g4(v(...a)); else if (v && typeof v === "object") wrap(v); } };
wrap(S);
})();
