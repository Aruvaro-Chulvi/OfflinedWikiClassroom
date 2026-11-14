/* WikiAula — texts for gen/mat7u7.js (Grade 7 · Unit 7: Algebraic Expressions and Equations), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: numbers with the separators of the language, capital letter, and "1 year" / "2 years"
const N = n => window.WA.H.n(n);
const cap = s => s[0].toUpperCase() + s.slice(1);
const yrs = n => n === 1 ? "1 year" : `${n} years`;
Object.assign(S, {
  al_trad_q: t => `Which algebraic expression matches “${t}”?`,
  // [phrase, correct answer, distractors, why]. The comma shows the order, as in the lesson:
  // "twice a number, plus three" (double first) versus "twice the sum…".
  al_trad: [
    ["twice a number, plus three", "2x + 3", ["2(x + 3)", "x² + 3", "2 + 3x"], "First double the number (2x), and then add 3: 2x + 3. In 2(x + 3), you would add before doubling."],
    ["twice the sum of a number and three", "2(x + 3)", ["2x + 3", "x + 6", "2 + x + 3"], "First add (x + 3), and then double the whole sum: you need the parentheses, 2(x + 3)."],
    ["the square of a number, minus five", "x² − 5", ["(x − 5)²", "2x − 5", "5 − x²"], "First square the number (x²), and then subtract 5: x² − 5."],
    ["the square of the difference of a number and five", "(x − 5)²", ["x² − 5", "x² − 25", "2(x − 5)"], "First subtract (x − 5), and then square the whole difference: you need the parentheses, (x − 5)²."],
    ["half of a number", "x/2", ["2x", "x − 2", "x²"], "Taking half means dividing by 2: x/2."],
    ["a number plus the number after it", "x + (x + 1)", ["x + 1", "2x", "x(x + 1)"], "The number after x is x + 1, and you add the two: x + (x + 1)."],
    ["three times a number, minus half of the number", "3x − x/2", ["3(x − x/2)", "3x − 2x", "x/2 − 3x"], "Three times the number is 3x, and half of it is x/2; subtract the half from 3x: 3x − x/2."],
    ["one-third of a number, plus one", "x/3 + 1", ["(x + 1)/3", "3x + 1", "x + 1/3"], "First divide the number by 3 (x/3), and then add 1: x/3 + 1."],
    ["one-third of the sum of a number and one", "(x + 1)/3", ["x/3 + 1", "3(x + 1)", "x + 1/3"], "First add (x + 1), and then divide the whole sum by 3: (x + 1)/3."],
    ["the product of two consecutive numbers", "x(x + 1)", ["x + (x + 1)", "2x + 1", "x · 2"], "Two consecutive numbers are x and x + 1, and their product means multiplying them: x(x + 1)."],
    ["any even number", "2x", ["x + 2", "x²", "2x + 1"], "Every even number is twice another number (8 = 2 · 4, 14 = 2 · 7): 2x. On the other hand, 2x + 1 is odd."],
    ["the perimeter of a square with side length x", "4x", ["x²", "x + 4", "2x"], "A square has 4 sides of length x: 4 times x, or 4x. (x² would be its area.)"],
    ["the area of a rectangle with base x and height 3", "3x", ["x + 3", "2x + 6", "x³"], "Area = base · height = x · 3, which you write as 3x (the number goes first). (2x + 6 would be its perimeter.)"],
  ],
  al_trad_s: (r, why) => `The correct expression is <b>${r}</b>. ${why}`,
  al_val_q: (e, v) => `Evaluate <b>${e}</b> for <b>${v}</b>.`,
  al_val_s: (e2, r) => `Replace the variable with its value (in parentheses if it is negative) and compute: ${e2} = <b>${r}</b>.`,
  // m7.al.valor, one step at a time (Example 2 in the lesson)
  al_val_l: {
    sust: (t, negativo) => `Replace x with its value${negativo ? ", in parentheses because it is negative" : ""}: ${t}`,
    par: t => `Parentheses first: ${t}`,
    pot: (p, t) => `Power: ${p} → ${t}`,
    prod: t => `Multiply: ${t}`,
    fin: t => `Add and subtract: ${t}`,
    y: "; ",
  },
  al_mono_q: m => `In the monomial <b>${m}</b>, what are the coefficient and the degree?`,
  al_mono_f: ["Coefficient", "Degree"],
  al_mono_s: (c, ex, ey) => `The coefficient is the number, <b>${c}</b>. ` + (ey
    ? `The degree is the sum of the exponents of the variables: ${ex} + ${ey} = <b>${ex + ey}</b>.`
    : ex === 1 ? "There is only one variable, x, and with no exponent written it has a hidden 1 (x = x¹): the degree is <b>1</b>."
    : `There is only one variable, with exponent ${ex}: the degree is <b>${ex}</b>.`),
  al_q: e => `Simplify: <b>${e}</b>`,
  al_hint: "Example: 3x^2 − 2x + 1 (use ^ for exponents)",
  al_sem_s: (sum, r) => r === "0"
    ? `They are like terms (same variable part): add the coefficients, ${sum}. The sum is 0: the terms cancel out, and you are left with <b>0</b>.`
    : `They are like terms (same variable part): add the coefficients, ${sum}, and keep the variable part: <b>${r}</b>.`,
  al_prod_s: (c, e, r) => `Multiply the coefficients (${c}) and add the exponents of the same variable (${e}): <b>${r}</b>.`,
  al_coc_s: (c, e, r, cero) => cero
    ? `Divide the coefficients (${c}) and subtract the exponents (${e}): x⁰ = 1, so the variable disappears and only the number is left: <b>${r}</b>.`
    : `Divide the coefficients (${c}) and subtract the exponents (${e}): <b>${r}</b>.`,
  al_red_s: (groups, r) => `Group the like terms: ${groups} = <b>${r}</b>.`,
  // a = the number in front of the parentheses; reduce = there is something left to combine afterward
  al_par_s: (a, step, r, reduce) => (a === 1
    ? `With no number in front, you can remove the parentheses without changing anything: ${reduce ? step : `<b>${r}</b>`}`
    : a === -1
    ? `A minus sign in front of the parentheses means multiplying by −1, so every term inside changes sign: ${reduce ? step : `<b>${r}</b>`}`
    : `Remove the parentheses by multiplying each term inside by ${a < 0 ? "(−" + Math.abs(a) + ")" : a} (distributive property): ${reduce ? step : `<b>${r}</b>`}`)
    + (reduce ? `, and combine like terms: <b>${r}</b>.` : "."),
  ec_q: e => `Solve the equation: <b>${e}</b>`,
  ec_hint: "Write the value of x. Example: −3",
  ec_steps: "Move the x terms to one side and the numbers to the other (a term that is added on one side moves to the other side subtracted, and a factor that multiplies moves to the other side dividing):",
  ec_den_steps: (a, pasa) => pasa
    ? `First get the fraction by itself (a number that is added moves to the other side subtracted, and one that is subtracted moves to the other side added). Then the ${a} that divides x moves to the other side multiplying:`
    : `The ${a} that divides x moves to the other side multiplying:`,
  // Patterns (m7.pat.regla)
  pat_q0: seq => `Write the rule for the term in position n of the pattern <b>${seq}, …</b>`,
  pat_hint: "Write the rule using the letter n. Example: 3n + 2",
  pat_s0: (d, tabla, b, regla, c3) => `It goes up by ${d} each time, like the multiples of ${d} (${tabla}…). `
    + (b === 0 ? "Each term is exactly the matching multiple of " + d : `Each term is ${Math.abs(b)} ${b > 0 ? "more" : "less"} than the matching multiple of ${d}`)
    + `: the rule is <b>${regla}</b>. Check with n = 3: ${d} · 3${b ? (b > 0 ? " + " : " − ") + Math.abs(b) : ""} = ${c3} ✓`,
  pat_ctx: [
    { desc: "You make a row of squares with toothpicks, each square sharing a side with the next", u1: "square", u: "squares", uq: "how many", obj: "toothpicks", oq: "How many", todos: "all the", d: 3, a1: 4 },
    { desc: "You make a row of triangles with toothpicks, each triangle sharing a side with the next", u1: "triangle", u: "triangles", uq: "how many", obj: "toothpicks", oq: "How many", todos: "all the", d: 2, a1: 3 },
    { desc: "Square tables are pushed together in a row, with a chair on each free side", u1: "table", u: "tables", uq: "how many", obj: "chairs", oq: "How many", todos: "all the", d: 2, a1: 4 },
    { desc: "You make a row of pentagons with toothpicks, each pentagon sharing a side with the next", u1: "pentagon", u: "pentagons", uq: "how many", obj: "toothpicks", oq: "How many", todos: "all the", d: 4, a1: 5 },
    { desc: "You make a row of hexagons with toothpicks, each hexagon sharing a side with the next", u1: "hexagon", u: "hexagons", uq: "how many", obj: "toothpicks", oq: "How many", todos: "all the", d: 5, a1: 6 },
    { desc: "You make a row of little houses with toothpicks, each house sharing a wall with the next (a square with a roof made of two toothpicks)", u1: "house", u: "houses", uq: "how many", obj: "toothpicks", oq: "How many", todos: "all the", d: 5, a1: 6 },
  ],
  pat_q1: (c, t, N) => `${c.desc}: for 1 ${c.u1}, you need ${t[0]} ${c.obj}; for 2, ${t[1]}; for 3, ${t[2]}. ${c.oq} ${c.obj} do you need for <b>${N} ${c.u}</b>?`,
  pat_s1: (c, b, regla, N, r) => `Each new ${c.u1} adds ${c.d} ${c.obj}, and there ${b === 1 ? "is always 1 extra" : `are always ${b} extra`}: the rule is ${regla} (for n = 1: ${c.d} + ${b} = ${c.d + b} ✓). For ${N} ${c.u}: ${c.d} · ${N} + ${b} = <b>${r}</b> ${c.obj}.`,
  pat_q2: (c, t, T) => `${c.desc}: for 1 ${c.u1}, you need ${t[0]} ${c.obj}; for 2, ${t[1]}; for 3, ${t[2]}. If you use exactly <b>${T}</b> ${c.obj}, ${c.uq} ${c.u} are in the row?`,
  pat_s2: (c, b, regla, T, N) => `The rule is ${regla}: each ${c.u1} adds ${c.d} ${c.obj}, and there ${b === 1 ? "is always 1 extra" : `are always ${b} extra`}. Take ${b === 1 ? "that 1" : "those " + b} away: ${T} − ${b} = ${T - b}. Each ${c.u1} adds ${c.d}: ${T - b} ÷ ${c.d} = <b>${N}</b>. Check: ${c.d} · ${N} + ${b} = ${T} ✓`,
  // m7.ec.plantea: ages (with the table from the lesson) and "two kinds of things with a total"
  plant: {
    parejas: [
      { may: "A mother", men: "her son", el: "the mother", dm: "her son", M: "Mother", m: "Son" },
      { may: "A father", men: "his daughter", el: "the father", dm: "his daughter", M: "Father", m: "Daughter" },
      { may: "A mother", men: "her daughter", el: "the mother", dm: "her daughter", M: "Mother", m: "Daughter" },
      { may: "A father", men: "his son", el: "the father", dm: "his son", M: "Father", m: "Son" },
    ],
    veces: { 2: "twice", 3: "three times", 4: "four times" },
    edad_q(p, M, h, k) { return `${p.may} is ${M} years old, and ${p.men} is ${h}. In how many years will ${p.el} be ${this.veces[k]} as old as ${p.dm}?`; },
    edad_s(p, M, h, k, x, D, k1) {
      const td = v => `<td style="border:1px solid #a2a9b1;padding:3px 10px;text-align:center">${v}</td>`;
      const tab = `<table style="border-collapse:collapse;margin:6px 0"><tr>${td("")}${td("Now")}${td("In x years")}</tr>`
        + `<tr>${td(p.M)}${td(M)}${td(M + " + x")}</tr><tr>${td(p.m)}${td(h)}${td(h + " + x")}</tr></table>`;
      return `x = the number of years that go by. Table (both of them get x years older at the same time):${tab}`
        + `Equation: ${M} + x = ${k}(${h} + x) → ${M} + x = ${k * h} + ${k}x<br>`
        + `Get the x terms together on the right, where there are more: ${M} − ${k * h} = ${k}x − x → `
        + (k1 === 1 ? `<b>x = ${D}</b>` : `${D} = ${k1}x → x = ${D} ÷ ${k1} = <b>${x}</b>`)
        + `<br>Check: in ${yrs(x)}, they will be ${M + x} and ${h + x}, and ${k} · ${h + x} = ${M + x} ✓`;
    },
    // A and B: what each big and small thing counts; n: [min, max] of the total number of things
    ctx: [
      { lugar: "On a farm, there are chickens and rabbits", cosas: "animals", big: "rabbits", small: "chickens", fb: false, fs: true, A: 4, B: 2, que: "legs", n: [12, 40] },
      { lugar: "In a parking lot, there are cars and motorcycles", cosas: "vehicles", big: "cars", small: "motorcycles", fb: false, fs: true, A: 4, B: 2, que: "wheels", n: [12, 40] },
      { lugar: "At a rental shop, there are bicycles and tricycles", cosas: "vehicles", big: "tricycles", small: "bicycles", fb: false, fs: true, A: 3, B: 2, que: "wheels", n: [10, 35] },
      { lugar: "For a field trip, adult tickets cost $7 and child tickets cost $4", cosas: "tickets", big: "adult tickets", small: "child tickets", fb: true, fs: true, A: 7, B: 4, que: "dollars", n: [10, 40] },
      { lugar: "A restaurant has tables with 6 chairs and tables with 4 chairs", cosas: "tables", big: "tables for 6", small: "tables for 4", fb: true, fs: true, A: 6, B: 4, que: "chairs", n: [8, 25] },
    ],
    dos_q: (c, n, tot, big) => `${c.lugar}. ${c.que === "dollars" ? `In all, ${n} ${c.cosas} were sold for $${tot}` : `In all, there are ${n} ${c.cosas} and ${tot} ${c.que}`}. How many ${big ? c.big : c.small} ${c.que === "dollars" ? "were sold" : "are there"}?`,
    dos_s: (c, n, tot, x, big) => {
      const k = c.A - c.B, kx = k === 1 ? "x" : k + "x";
      return `x = the number of ${c.big}. The ${c.small} are <b>the rest of the ${n}</b>: ${n} − x.`
        + `<br>${cap(c.que)}: ${c.A}x + ${c.B}(${n} − x) = ${tot} → ${c.A}x + ${c.B * n} − ${c.B}x = ${tot} → ${kx} + ${c.B * n} = ${tot} → ${kx} = ${tot - c.B * n}`
        + (k === 1 ? "" : ` → x = ${tot - c.B * n} ÷ ${k} = ${x}`)
        + `<br>There are ${x} ${c.big} and ${n} − ${x} = ${n - x} ${c.small}: <b>${big ? x : n - x}</b>. Check: ${c.A} · ${x} + ${c.B} · ${n - x} = ${c.A * x} + ${c.B * (n - x)} = ${tot} ✓`;
    },
  },
  ec_check: (x, l, r) => `Check: for x = ${x}, the left side is ${l} and the right side is ${r}.`,
  ec_sol_q: (e, v) => `Is <b>x = ${v}</b> a solution of the equation <b>${e}</b>?`,
  ec_sol_s: (v, l, r, ok) => `Substitute x = ${v}: the left side is ${l} and the right side is ${r}. ${ok ? "They are equal: <b>yes</b>, it is a solution." : "They are not equal: <b>no</b>, it is not a solution."}`,
  ec_prob: [
    { q: (s) => `The sum of three consecutive numbers is ${s}. What is the least of the three?`,
      e: "x + (x + 1) + (x + 2) = S", s: (s, x) => `Let x be the least number: x + (x + 1) + (x + 2) = ${s} → 3x + 3 = ${s} → 3x = ${s - 3} → x = <b>${x}</b>.` },
    { q: (a, d, y) => `Anna is ${a} years older than her brother. The sum of their ages is ${y}. How old is her brother?`,
      s: (a, y, x) => `Brother: x; Anna: x + ${a}. Sum of their ages: x + x + ${a} = ${y} → 2x = ${y - a} → x = <b>${x}</b> years.` },
    { q: (p, k) => `The length of a rectangle is ${k} cm more than its width, and its perimeter is ${p} cm. What is its width?`,
      s: (p, k, x) => `Width: x; length: x + ${k}. Perimeter: 2x + 2(x + ${k}) = ${p} → 4x + ${2 * k} = ${p} → 4x = ${p - 2 * k} → x = <b>${x}</b> cm.` },
    { q: (t, k) => `Split $${N(t)} between two people so that one of them gets three times as much as the other${k ? ` plus $${k}` : ""}. How much does the person who gets less receive?`,
      s: (t, k, x) => `One person gets x and the other gets 3x${k ? ` + ${k}` : ""}: x + 3x${k ? ` + ${k}` : ""} = ${N(t)} → 4x = ${N(t - k)} → x = ${N(x)}. The person who gets less receives <b>$${N(x)}</b>.` },
    { q: (n, r) => `If you add a number and twice that number, you get ${r}. What is the number?`,
      s: (r, x) => `x + 2x = ${r} → 3x = ${r} → x = <b>${x}</b>.` },
  ],
});
})();
