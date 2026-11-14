/* WikiAula — texts for gen/mat7.js (Mathematics, Grade 7: Units 1–2, whole numbers and divisibility), in US English. */
"use strict";
(function () {
const WA = window.WA = window.WA || {};
// Helpers: numbers with the separators of the language, "a, b, and c" / "a, b, or c" lists, last word of a noun phrase
const N = n => window.WA.H.n(n);
const andL = a => a.length > 2 ? a.slice(0, -1).join(", ") + ", and " + a[a.length - 1] : a.join(" and ");
const orL = a => a.length > 2 ? a.slice(0, -1).join(", ") + ", or " + a[a.length - 1] : a.map(String).join(" or ");
const w = s => s.split(" ").pop();
const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands",
  "hundred thousands", "millions", "ten millions", "hundred millions"];
Object.assign(WA.I18N.en.gen, {
    posNames: PLACES.slice(),
    posName1: PLACES.slice(),
    // Base-ten number system
    posicional_q: (n, d) => `In the number <b>${n}</b>, what is the value of the digit <b>${d}</b>?`,
    posicional_s: (d, pos, v) => `The digit ${d} is in the ${pos} place, so its value is <b>${v}</b>.`,
    orden_q: (n, pos) => `Which digit is in the ${pos} place in the number <b>${n}</b>?`,
    orden_s: (n, pos, d, walk) => `Count the places from the right: ${walk.map(([name, x], i) => i === walk.length - 1 ? `${name} <b>${x}</b>` : `${name} ${x}`).join(", ")}. The digit in the ${pos} place of ${n} is <b>${d}</b>.`,
    // "tens" → "the nearest ten", "ten thousands" → "the nearest ten thousand"
    redondeo_q: (n, pos) => `Round <b>${n}</b> to the nearest ${pos.replace(/s$/, "")}.`,
    redondeo_s: (look, up, r) => `Look at the next digit to the right: it is ${look}. ${up ? "Since it is 5 or more, round up: add 1 to the digit in the rounding place" : "Since it is less than 5, round down: the digit in the rounding place stays the same"}, and every digit to its right becomes 0: <b>${r}</b>.`,
    descomp_q: e => `What number is <b>${e}</b>?`,
    descomp_s: (vals, sum, r, zeros, mixed) =>
      `Find the value of each term: ${vals.join("; ")}.<br>${mixed ? "Add them, ordered from greatest to least: " : "Add them: "}${sum} = <b>${r}</b>.` +
      (zeros.length ? `<br>There are no ${orL(zeros)}: write a 0 in ${zeros.length > 1 ? "those places" : "that place"}.` : ""),
    // L.words has no commas: in the question, a comma after "million" and "thousand", as numbers are written in words
    letras_q: wd => `Write in standard form: <i>${wd.replace(/(million|thousand) (?=\S)/g, "$1, ")}</i>.`,
    letras_s: (groups, r) => `Split the number into periods: ${groups.map(x => x.w ? `“${x.w}” → ${x.g}` : `the ${["millions", "thousands", "ones"][x.cls]} period is missing → ${x.g}`).join(" | ")}. Every period except the first has three digits, so the number is <b>${r}</b>.`,
    // Operations
    division_q: (a, b) => `Find the quotient and the remainder: <b>${a} ÷ ${b}</b>.`,
    division_f: ["Quotient", "Remainder"],
    division_s: (a, b, q, r) => `Since ${a} = ${b} · ${q} + ${r}, the quotient is <b>${q}</b> and the remainder is <b>${r}</b> (the remainder is always less than the divisor).`,
    dividendo_q: (d, q, r) => `In a division problem, the divisor is <b>${d}</b>, the quotient is <b>${q}</b>, and the remainder is <b>${r}</b>. What is the dividend?`,
    dividendo_s: (d, q, r, D) => `Dividend = divisor · quotient + remainder = ${d} · ${q} + ${r} = <b>${D}</b>.`,
    distrib_q: e => `Evaluate in the quickest way: <b>${e}</b>`,
    distrib_s: (a, b, c, s, r) => `Factor out ${a}: ${a} · (${b} + ${c}) = ${a} · ${s} = <b>${r}</b>.`,
    distrib_s2: (a, b, c, s, r) => `Factor out ${a}: ${a} · (${b} − ${c}) = ${a} · ${s} = <b>${r}</b>.`,
    problemas: [
      { q: (a, b, c) => `A theater has ${a} rows of ${b} seats. If ${c} seats are empty, how many people are in the theater?`,
        s: (a, b, c, r) => `Seats: ${a} · ${b} = ${N(a * b)}. People: ${N(a * b)} − ${c} = <b>${r}</b>.`, f: (a, b, c) => a * b - c },
      { q: (a, b, c) => `A bakery makes ${a} loaves of bread a day and packs them in bags of ${b}. How many bags does it fill in ${c} days?`,
        s: (a, b, c, r) => `In one day, it fills ${a} ÷ ${b} = ${N(a / b)} bags. In ${c} days: ${N(a / b)} · ${c} = <b>${r}</b>.`, f: (a, b, c) => a / b * c, div: true },
      { q: (a, b, c) => `Lucy has $${a}. She buys ${b} notebooks for $${c} each. How much money does she have left?`,
        s: (a, b, c, r) => `She spends ${b} · $${c} = $${N(b * c)}. She has $${a} − $${N(b * c)} = <b>$${r}</b> left.`, f: (a, b, c) => a - b * c, money: true },
      { q: (a, b, c) => `A truck carries ${a} boxes of ${b} bottles each. On the way, ${c} bottles break. How many bottles arrive unbroken?`,
        s: (a, b, c, r) => `Bottles: ${a} · ${b} = ${N(a * b)}. Unbroken: ${N(a * b)} − ${c} = <b>${r}</b>.`, f: (a, b, c) => a * b - c },
    ],
    // Order of operations
    jer_q: e => `Evaluate: <b>${e}</b>`,
    jer_s_intro: "Work inside parentheses and brackets first (from the inside out), then exponents, then multiplication and division, and last addition and subtraction; at each level, go from left to right:",
    paren_q: (e, v) => `Where do the parentheses go so that <b>${e}</b> equals <b>${v}</b>?`,
    paren_none: "Nowhere: it already equals that",
    paren_s: (e, v) => `${e} = <b>${v}</b>.`,
    paren_s_none: (steps, change, other) => `Without parentheses, you already multiply first: ${steps.map((s, i) => i === steps.length - 1 ? `<b>${s}</b>` : s).join(" = ")}. You don't need any parentheses: with ${change}, you would get ${other}.`,
    // Powers
    potvalor_q: p => `Evaluate <b>${p}</b>.`,
    potvalor_s: (prod, r) => `${prod} = <b>${r}</b>.`,
    potpartes_q: (p, what) => `In the power <b>${p}</b>, what is the ${what === "b" ? "base" : "exponent"}?`,
    potpartes_s: (b, e) => `The base is the factor that repeats (${b}), and the exponent tells how many times it repeats (${e}).`,
    potprod_q: e => `Write as a single power: <b>${e}</b>`,
    potprod_s: (b, m, n, r) => `When the bases are the same, add the exponents: ${b}<sup>${m}+${n}</sup> = <b>${r}</b>.`,
    potcoc_s: (b, m, n, r) => `When the bases are the same, subtract the exponents: ${b}<sup>${m}−${n}</sup> = <b>${r}</b>.`,
    potpot_s: (b, m, n, r) => `For a power of a power, multiply the exponents: ${b}<sup>${m}·${n}</sup> = <b>${r}</b>.`,
    potdiez_q: e => `What number is <b>${e}</b>?`,
    potdiez_s: (k, r) => `The power 10<sup>${k}</sup> is a 1 followed by ${k} zeros, so the result is <b>${r}</b>.`,
    potarea_q: (l) => `A square patio is ${l} m on each side. What is its area in m²?`,
    potarea_s: (l, r) => `Area of a square = side<sup>2</sup> = ${l}<sup>2</sup> = <b>${r}</b> m².`,
    potcubo_q: (l) => `Each edge of a cube-shaped box is ${l} cm long. What is its volume in cm³?`,
    potcubo_s: (l, r) => `Volume of a cube = edge<sup>3</sup> = ${l}<sup>3</sup> = <b>${r}</b> cm³.`,
    // Square roots
    raiz_q: r => `Find <b>${r}</b>.`,
    raiz_s: (n, r) => `Since ${r}<sup>2</sup> = ${n}, the square root is <b>${r}</b>.`,
    raizent_q: r => `Find the integer square root of <b>${r}</b> and the remainder.`,
    raizent_f: ["Integer square root", "Remainder"],
    raizent_s: (n, r, s) => `Since ${r}<sup>2</sup> = ${N(r * r)} ≤ ${n} &lt; ${N((r + 1) * (r + 1))} = ${r + 1}<sup>2</sup>, the integer square root is <b>${r}</b>, and the remainder is ${n} − ${N(r * r)} = <b>${s}</b>.`,
    raizentre_q: r => `<b>${r}</b> is between two consecutive whole numbers. Which ones?`,
    raizentre_f: ["Between", "and"],
    raizentre_s: (n, a) => `Look at the squares: ${a}<sup>2</sup> = ${N(a * a)} and ${a + 1}<sup>2</sup> = ${N((a + 1) * (a + 1))}. Since ${N(a * a)} &lt; ${N(n)} &lt; ${N((a + 1) * (a + 1))}, the square root is between <b>${a}</b> and <b>${a + 1}</b>.`,
    raizlado_q: a => `A square vegetable garden has an area of ${a} m². How long is each side?`,
    raizlado_s: (a, l) => `The side length is the square root of the area: √${a} = <b>${l}</b> m, because ${l}<sup>2</sup> = ${a}.`,
    raizlado_t: (a, tant, l) => `The side length is the square root of the area, √${a}.<br>${tant}<br>Each side is <b>${l}</b> m long.`,
    raiz_tant_dec: (r, n) => `This root is beyond the table of squares, but it is a multiple of 10: ${r}<sup>2</sup> = ${r} · ${r} = ${n}, so the square root is <b>${r}</b>.`,
    raiz_tant: (k, k2, K, K2, last, ends, cands, r, n) => {
      const tries = [];
      for (const c of cands) { tries.push(c === r ? `${c}<sup>2</sup> = ${n} ✓` : `${c}<sup>2</sup> = ${N(c * c)}, no`); if (c === r) break; }
      return `This root is beyond the table of squares, so estimate with tens. Since ${k}<sup>2</sup> = ${k2} and ${K}<sup>2</sup> = ${K2}, the root is between ${k} and ${K}. ` +
        `The number ${n} ends in ${last}, and only numbers that end in ${orL(ends)} have squares that end in ${last}` +
        `${cands.length > 1 ? `: the candidates are ${andL(cands)}` : `: the only candidate is ${cands[0]}`}. Try ${tries.join("; try ")}. The square root is <b>${r}</b>.`; },
    raizent_tant: (n, k, K, r, s) => `Estimate with tens: ${k}<sup>2</sup> = ${N(k * k)} ≤ ${n} &lt; ${N(K * K)} = ${K}<sup>2</sup>, so the integer square root is between ${k} and ${K}. ` +
      `Narrow it down: ${r}<sup>2</sup> = ${N(r * r)} is not more than ${n}, but ${r + 1}<sup>2</sup> = ${N((r + 1) * (r + 1))} is too big. The integer square root is <b>${r}</b>, and the remainder is ${n} − ${N(r * r)} = <b>${s}</b>.`,
    // Problem-solving strategies (m7.heur)
    heur_pares: [
      // chico: the one with fewer legs/wheels (na); grande: the one with more (nb); fa/fb (Spanish gender) are not used in English.
      // The questions use the last word of chico/grande ("three-legged stools" → "stools").
      { lugar: "On a farm", todo: "animals", pie: "legs", chico: "chickens", grande: "rabbits", uno: "a chicken", otro: "a rabbit", fa: true, fb: false, na: 2, nb: 4 },
      { lugar: "In a barnyard", todo: "animals", pie: "legs", chico: "ducks", grande: "sheep", uno: "a duck", otro: "a sheep", fa: false, fb: true, na: 2, nb: 4 },
      { lugar: "In a parking lot", todo: "vehicles", pie: "wheels", chico: "motorcycles", grande: "cars", uno: "a motorcycle", otro: "a car", fa: true, fb: false, na: 2, nb: 4 },
      { lugar: "In a bike shop", todo: "vehicles", pie: "wheels", chico: "bicycles", grande: "tricycles", uno: "a bicycle", otro: "a tricycle", fa: true, fb: false, na: 2, nb: 3 },
      { lugar: "In a dining room", todo: "seats", pie: "legs", chico: "three-legged stools", grande: "four-legged chairs", uno: "a stool", otro: "a chair", fa: false, fb: true, na: 3, nb: 4 },
    ],
    heur_patas_q: (P, n, total, askBig) => `${P.lugar}, there are ${n} ${P.todo}, some ${P.chico} and some ${P.grande}, with ${total} ${P.pie} in all. How many ${w(askBig ? P.grande : P.chico)} are there?`,
    heur_patas_s: (P, n, total, big, small) => { const d = P.nb - P.na, base = n * P.na;
      return `Use guess, check, and revise (organized trial and error). Suppose they were all ${w(P.chico)}: ${n} · ${P.na} = ${base} ${P.pie}. That is ${total} − ${base} = ${total - base} ${P.pie} too few.<br>` +
        `Each time you swap ${P.uno} for ${P.otro}, you get ${d} more ${d === 1 ? P.pie.slice(0, -1) : P.pie}: ${d === 1 ? `you need ${big} swaps` : `${total - base} ÷ ${d} = ${big} swaps`}.<br>` +
        `There are <b>${big} ${w(P.grande)}</b> and <b>${small} ${w(P.chico)}</b>. Check: ${small} · ${P.na} + ${big} · ${P.nb} = ${small * P.na} + ${big * P.nb} = ${total} ✓`; },
    heur_num_q: (a, b, plus, c) => `I'm thinking of a number. I multiply it by ${a}, ${plus ? `add ${b}` : `subtract ${b}`}, and get ${c}. What is my number?`,
    heur_num_s: (a, b, plus, c, x) => `Work backward from the end, undoing each step with the inverse operation:<br>` +
      `${plus ? `before adding ${b}, the number was ${c} − ${b} = ${c - b}` : `before subtracting ${b}, the number was ${c} + ${b} = ${c + b}`};<br>` +
      `before multiplying by ${a}, it was ${x * a} ÷ ${a} = <b>${x}</b>.<br>Check: ${x} · ${a} ${plus ? "+" : "−"} ${b} = ${x * a} ${plus ? "+" : "−"} ${b} = ${c} ✓`,
    heur_apret_q: (n, ctx) => ctx ? `In a league with ${n} teams, each team plays every other team exactly once. How many games are played in all?`
      : `There are ${n} people at a meeting, and each person shakes hands exactly once with each of the others. How many handshakes are there?`,
    heur_apret_s: (n, ctx, terms, r) => ctx ? `Start with smaller cases and look for a pattern. The first team plays the other ${n - 1}; the second plays ${n - 2} new teams (it has already played the first one); the third, ${n - 3} new ${n - 3 === 1 ? "team" : "teams"}… and the second-to-last, 1.<br>Total: ${terms} = <b>${r}</b> games.`
      : `Start with smaller cases and look for a pattern. The first person shakes hands with the other ${n - 1}; the second, with ${n - 2} new people (they have already shaken hands with the first one); the third, with ${n - 3} new ${n - 3 === 1 ? "person" : "people"}… and the second-to-last, with 1.<br>Total: ${terms} = <b>${r}</b> handshakes.`,
    heur_animal: ["A snail", "A frog", "A lizard"],
    heur_pozo_q: (who, h, up, down) => `${who} is at the bottom of a well that is ${h} m deep. Each day it climbs ${up} m, and each night it slips back down ${down} m. On what day does it get out of the well?`,
    heur_pozo_s: (h, up, down, g, day, sPrev, s) => `Make a table. Each day and night together, it gains ${up} − ${down} = ${g} m, so each morning it starts ${g} m higher: on day 1 at 0 m, on day 2 at ${g} m, on day 3 at ${2 * g} m…<br>` +
      `On day ${day - 1}, it starts at ${sPrev} m and climbs to ${sPrev + up} m: it doesn't reach ${h} m, so it slips back.<br>` +
      `On day ${day}, it starts at ${s} m and climbs to ${s + up} m: it reaches the top and gets out without slipping back. It gets out on <b>day ${day}</b>.`,
    // Divisibility
    multiplo_q: (a, b) => `Is <b>${a}</b> a multiple of <b>${b}</b>?`,
    multiplo_s: (a, b, ok, q, r) => ok ? `Yes: ${a} ÷ ${b} = ${q} with no remainder (${a} = ${b} · ${q}).` : `No: when you divide ${a} by ${b}, the remainder is ${r}, so ${b} does not divide ${a} evenly.`,
    divisores_q: n => `Write all the factors of <b>${n}</b>.`,
    divisores_s: (n, pairs, list) => `Look for pairs of numbers whose product is ${n}: ${pairs}. Factors: <b>${list}</b>.`,
    multrango_q: (n, a, b) => `Write the multiples of <b>${n}</b> that are between <b>${a}</b> and <b>${b}</b>.`,
    multrango_s: (n, list) => `Multiply ${n} by 1, 2, 3… and keep the ones in that range: <b>${list}</b>.`,
    divde_q: n => `Which of these numbers is a factor of <b>${n}</b>?`,
    divde_s: (n, d) => `Since ${n} ÷ ${d} = ${n / d} with no remainder, ${d} is a factor of ${n}.`,
    crit_q: (n, d) => `Is <b>${n}</b> divisible by <b>${d}</b>?`,
    crit_rule: {
      2: (n, ok) => `A number is divisible by 2 if it ends in an even digit. The number ${n} ends in ${String(n).slice(-1)}, so it ${ok ? "is" : "is not"} divisible by 2.`,
      3: (n, ok, s) => `A number is divisible by 3 if the sum of its digits is a multiple of 3. The digit sum is ${s}, which ${ok ? "is" : "is not"} a multiple of 3, so the number ${ok ? "is" : "is not"} divisible by 3.`,
      4: (n, ok, s, a, b, raw) => { const dos = raw % 100;
        return `A number is divisible by 4 if the number formed by its last two digits is a multiple of 4. The number ${n} ends in ${String(dos).padStart(2, "0")}${dos < 10 ? ` (that is, ${dos})` : ""}: ${ok ? `${dos} = 4 · ${dos / 4}, so it is` : `${dos} is not a multiple of 4, so it is not`} divisible by 4.`; },
      6: (n, ok, s, a, b, raw) => { const par = raw % 2 === 0, tres = s % 3 === 0;
        return `A number is divisible by 6 if it is divisible by both 2 and 3. The number ${n} ends in ${raw % 10} (${par ? "even: divisible by 2" : "odd: not divisible by 2"}), and its digits add up to ${s} (${tres ? "a multiple of 3: divisible by 3" : "not a multiple of 3: not divisible by 3"}). So it ${ok ? "is" : "is not"} divisible by 6.`; },
      5: (n, ok) => `A number is divisible by 5 if it ends in 0 or 5. The number ${n} ends in ${String(n).slice(-1)}, so it ${ok ? "is" : "is not"} divisible by 5.`,
      9: (n, ok, s) => `A number is divisible by 9 if the sum of its digits is a multiple of 9. The digit sum is ${s}, which ${ok ? "is" : "is not"} a multiple of 9, so the number ${ok ? "is" : "is not"} divisible by 9.`,
      10: (n, ok) => `A number is divisible by 10 if it ends in 0. The number ${n} ends in ${String(n).slice(-1)}, so it ${ok ? "is" : "is not"} divisible by 10.`,
      11: (n, ok, s, a, b) => `A number is divisible by 11 if the difference between the sum of the digits in the odd places, counting from the right (${a}), and the sum of the digits in the even places (${b}) is 0 or a multiple of 11. The difference is ${Math.abs(a - b)}, so the number ${ok ? "is" : "is not"} divisible by 11.`,
    },
    critmulti_q: n => `Which of these numbers is <b>${n}</b> divisible by?`,
    critmulti_s: (n, list) => list ? `The number ${n} is divisible by <b>${andL(list.split(", "))}</b>.` : `The number ${n} is not divisible by any of them.`,
    critcifra_q: (shown, d) => `Which digits can go in the box in <b>${shown}</b> so that the number is divisible by <b>${d}</b>? Write all of them.`,
    critcifra_s: (d, sumTxt, s, sums, ok) =>
      `Sum of the known digits: ${sumTxt} = ${s}. For the sum to be a multiple of ${d} (${orL(sums)}), you have to add ${orL(ok)}. ${ok.length > 1 ? "The digits that work" : "The digit that works"}: <b>${ok.join(", ")}</b>.`,
    critcifra_s11: (odd, even, holeOdd, so, se, x, A, B) => `Counting from the right, the digits in the odd places are ${odd.concat(holeOdd ? ["□"] : []).join(" + ")}; in the even places, ${even.concat(holeOdd ? [] : ["□"]).join(" + ")}. ` +
      `Without the box, they add up to ${so} and ${se}. The difference has to be 0 or a multiple of 11: with □ = ${x}, the sums are ${A} and ${B}, and the difference is ${Math.abs(A - B)}. The digit that works: <b>${x}</b>.`,
    critcifra_none: "none",
    primo_q: n => `Is <b>${n}</b> prime or composite?`,
    primo_opts: ["Prime", "Composite"],
    primo_s_p: (n, tried, q) => `Try dividing ${n} by the primes ${andL(tried)}: none of the divisions comes out even. The next prime, ${q}, is already too big (${q} · ${q} = ${q * q}, which is more than ${n}), so you can stop: ${n} is <b>prime</b>.`,
    primo_s_c: (n, d, before) => `${before.length ? `The number ${n} is not divisible by ${orL(before)}. ` : ""}Try ${d}: ${n} ÷ ${d} = ${n / d}, with no remainder. Since ${n} = ${d} · ${n / d}, it has factors other than 1 and itself: it is <b>composite</b>.`,
    factoriza_q: n => `Write the prime factorization of <b>${n}</b>.`,
    factoriza_s: (steps, veces, f) => `Use repeated division, always by the smallest prime you can:<br>${steps}<br>Count the factors: ${andL(veces)}. So the prime factorization is <b>${f}</b>.`,
    factoriza_veces: (p, k) => `${p} appears ${["", "once", "twice", "three times", "four times", "five times", "six times", "seven times", "eight times", "nine times"][k] || k + " times"}`,
    defact_q: f => `What number has this prime factorization: <b>${f}</b>?`,
    defact_s: (f, r, pows, steps) => `${pows.length ? `First evaluate the powers: ${pows.join("; ")}. ` : ""}${steps.length ? `${pows.length ? "Then multiply" : "Multiply"} step by step: ${steps.join("; ")}. ` : ""}So ${f} = <b>${r}</b>.`,
    mcd_q: (a, b) => `Find the greatest common factor: <b>GCF(${a}, ${b})</b>.`,
    mcd_s: (fa, fb, res) => `Write the prime factorizations: ${fa} and ${fb}. Take the common prime factors, each with its smallest exponent: ${res}.`,
    mcm_q: (a, b) => `Find the least common multiple: <b>LCM(${a}, ${b})</b>.`,
    mcm_s: (fa, fb, res) => `Write the prime factorizations: ${fa} and ${fb}. Take all the prime factors, common or not, each with its greatest exponent: ${res}.`,
    nocommon: "they have no common prime factors, so the GCF is <b>1</b>",
    mcdprob: [
      { pista: "cut the two ribbons into equal pieces that are as long as possible", q: (a, b) => `You have two ribbons, one ${a} cm long and the other ${b} cm long. You want to cut them into equal pieces, as long as possible, with nothing left over. How long will each piece be (in cm)?`,
        s: (a, b, r) => `Look for the greatest number that divides both ${a} and ${b}: GCF(${a}, ${b}) = <b>${r}</b> cm.` },
      { pista: "share the candies among as many identical bags as possible", q: (a, b) => `You want to make identical bags with ${a} strawberry candies and ${b} lemon candies, with none left over and as many bags as possible. How many bags can you make?`,
        s: (a, b, r) => `The number of bags has to divide both ${a} and ${b}, and it has to be as large as possible: GCF(${a}, ${b}) = <b>${r}</b> bags.` },
      { pista: "divide the floor into equal squares that are as large as possible", q: (a, b) => `A rectangular floor measures ${a} dm by ${b} dm. You want to cover it with identical square tiles, as large as possible, without cutting any. How long will each side of a tile be (in dm)?`,
        s: (a, b, r) => `The side length has to divide both ${a} and ${b}, and it has to be as large as possible: GCF(${a}, ${b}) = <b>${r}</b> dm.` },
    ],
    mcmprob: [
      { pista: "find out when two buses that leave at regular intervals will leave together again", q: (a, b) => `Two buses leave from a station: one every ${a} minutes and the other every ${b} minutes. If they just left together, in how many minutes will they leave together again?`,
        s: (a, b, r) => `Look for the first common multiple of ${a} and ${b}: LCM(${a}, ${b}) = <b>${r}</b> minutes.` },
      { pista: "find out when two lighthouses that flash at regular intervals will flash together again", q: (a, b) => `One lighthouse flashes every ${a} seconds, and another one every ${b} seconds. If they just flashed at the same time, how many seconds will pass before they flash together again?`,
        s: (a, b, r) => `You need the least common multiple of ${a} and ${b}: LCM(${a}, ${b}) = <b>${r}</b> seconds.` },
      { pista: "find out when two people who go somewhere every so many days will be there on the same day again", q: (a, b) => `Anna goes to the pool every ${a} days, and Max every ${b} days. They were both there today. In how many days will they both be there again?`,
        s: (a, b, r) => `It is the least common multiple of ${a} and ${b}: LCM(${a}, ${b}) = <b>${r}</b> days.` },
    ],
    mcx_q: q => `To solve this problem, what do you need to find?<br><i>${q}</i>`,
    mcx_opts: ["The greatest common factor (GCF)", "The least common multiple (LCM)"],
    mcx_s_mcd: p => `You need to ${p}, with nothing left over: look for the greatest number that divides both amounts. It is a <b>GCF</b> problem (the answer is less than or equal to the given numbers).`,
    mcx_s_mcm: p => `You need to ${p}: look for the first common multiple of the two numbers. It is an <b>LCM</b> problem (the answer is greater than or equal to the given numbers).`,
    // Computational thinking (m7.algo)
    algo_euc_q: (a, b) => `Find <b>GCF(${a}, ${b})</b> with the Euclidean algorithm. How many turns does the loop take?`,
    algo_euc_f: ["GCF", "Turns"],
    algo_euc_s: rows => rows.map(([a, b, q, r], i) => `Turn ${i + 1}: a = ${a}, b = ${b}. Since ${a} = ${q} · ${b} + ${r}, ${r ? `the remainder is ${r}, not 0. Now a = ${b} and b = ${r}.` : `the remainder is 0. The algorithm writes b = <b>${b}</b>.`}`).join("<br>") +
      `<br>The GCF is <b>${rows[rows.length - 1][1]}</b>, and the loop takes <b>${rows.length} turns</b> (one for each division).`,
    algo_bucle_q: (n0, mul, k, lim, until) => `Follow this algorithm: “Start with n = ${n0}. Repeat: write n; n takes the value n ${mul ? "·" : "+"} ${k}; ${until ? `until n is greater than ${lim}` : `while n is less than ${lim}`}.” What is the last number it writes?`,
    algo_bucle_s: (out, n, lim, until) => `Trace: it writes ${andL(out.slice(0, -1).concat([`<b>${out[out.length - 1]}</b>`]))}. Then n is ${n}, which ${until ? `is already greater than ${lim}` : `is no longer less than ${lim}`}, so the loop ends. The last number it writes is <b>${out[out.length - 1]}</b>.`,
    algo_cifras_q: n => `An algorithm adds the digits of a number and repeats with the result until only one digit is left. What digit is left for <b>${n}</b>?`,
    algo_cifras_s: (steps, m) => `Add the digits: ${steps.join("; repeat: ")}. Only one digit is left: <b>${m}</b>.`,
});
})();
