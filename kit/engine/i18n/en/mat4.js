/* WikiAula — texts for gen/mat4.js (Mathematics, Grade 4), in US English.
   Complete (2026-11-11, Grade 4). The m4.* texts that the Grade 5 lessons use come from the Grade 5 pilot. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m4 = G.m4 || {};
// Helpers: numbers with the separators of the language, capital letter, lists with the serial comma,
// "1 day" / "2 days", clock times (7:35 a.m.), "a"/"an"
const N = n => window.WA.H.n(n);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const lst = xs => xs.length < 2 ? xs.join("") : xs.length === 2 ? `${xs[0]} and ${xs[1]}` : `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
const pl = (n, a, b) => `${n} ${n === 1 ? a : b}`;
const hm = (h, m) => window.WA.H.time(h, m);
// a sentence that ends in a clock time ("4:20 p.m."): no second period
const end = s => /\.$/.test(s) ? s : s + ".";
const art = w => /^[aeiou]|^hour/i.test(w) ? "an" : "a";
// "a"/"an" in front of a number, by how it is read: an 8° angle, an 11° angle, an 18° angle, an 80° angle (as artNum in mat5.js)
const artNum = x => { const ip = String(x).split(".")[0].replace(/\D/g, ""), g = ip.slice(0, ip.length % 3 || 3); return /^8/.test(g) || g === "11" || g === "18" ? "an" : "a"; };
const W =n => window.WA.I18N.en.words(+n);
// Division with a remainder without "=" (75 ÷ 12 is not equal to 6): "75 ÷ 12 is 6 with 3 left over"; exact: "72 ÷ 12 = 6"
const divr = (n, c, q, r) => r ? `${N(n)} ÷ ${c} is ${q} with ${r} left over` : `${N(n)} ÷ ${c} = ${q}`;
const sg = k => [">", "&lt;", "="][k];
Object.assign(S, {
  pos: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"],
  // names of the people in m4.combinados and m4.dospasos (nombres.json)
  nombres: ["Lucy", "Henry", "Sarah", "Leo", "Nora", "Matt", "Abby", "Omar", "Iris", "Ben", "Aisha", "Isaac", "Mei", "Danny"],
  valor_q: (n, d) => `In the number <b>${n}</b>, what is the value of the digit <b>${d}</b>?`,
  valor_s: (d, pos, v) => `The digit ${d} is in the ${pos} place, so its value is <b>${v}</b>.`,
  letras_q: w => `Write in standard form: <b>${w}</b>.`,
  letras2_q: n => `How do you read the number <b>${n}</b>?`,
  letras_s: (w, n) => `<b>${n}</b> is read <b>${w}</b>.`,
  desc_q: p => `What number is <b>${p}</b>?`,
  desc_s: n => `Add the values of all the digits: <b>${n}</b>.`,
  desc2_q: (n, pos) => `Which digit is in the ${pos} place in the number <b>${n}</b>?`,
  desc2_s: (n, pos, d, v) => `Counting from the right, the ${pos} digit of ${n} is <b>${d}</b> (its value is ${v}).`,
  redp: ["", "", "", "the nearest thousand", "the nearest ten thousand", "the nearest hundred thousand"],
  red_q: (n, p) => `Round <b>${n}</b> to ${p}.`,
  red_s: (pos, look, up, r) => `Look at the ${pos} digit: it is ${look}. ${up ? "Since it is 5 or more, round up" : "Since it is less than 5, the digit you are rounding to stays the same"}, and the digits to its right become zeros: <b>${r}</b>.`,
  rom_q: r => `What number does the Roman numeral <b>${r}</b> stand for?`,
  rom2_q: n => `Write <b>${N(n)}</b> in Roman numerals.`,
  rom_hint: "Use the letters I, V, X, L, C, D, and M.",
  // parts: [[value, Roman numeral, subtracts?], …] by place (thousands, hundreds, tens, ones)
  rom_s: (r, n, parts) => {
    const sub = parts.filter(p => p[2]).map(([v, ro]) => { const u = 10 ** (String(v).length - 1); return `${ro} = ${N(v / u === 4 ? 5 * u : 10 * u)} − ${N(u)} = ${N(v)}`; });
    if (parts.length === 1) return sub.length ? `A smaller letter in front of a larger one is subtracted: ${sub[0]}. <b>${r} = ${N(n)}</b>.` : `<b>${r} = ${N(n)}</b>.`;
    return `Break it apart by place value: ${parts.map(p => p[1]).join(" + ")} = ${parts.map(p => N(p[0])).join(" + ")} = <b>${N(n)}</b>.${sub.length ? ` (When a smaller letter comes in front of a larger one, it is subtracted: ${sub.join("; ")}.)` : ""}`;
  },
  rom2_s: (r, n, parts) => {
    const piece = ([v, ro, s], bold) => { const R = bold ? `<b>${ro}</b>` : ro; if (!s) return `${N(v)} = ${R}`; const u = 10 ** (String(v).length - 1); return `${N(v)} = ${N(v / u === 4 ? 5 * u : 10 * u)} − ${N(u)} = ${R}`; };
    return parts.length === 1 ? `${piece(parts[0], true)}.` : `Break it apart by place value: ${N(n)} = ${parts.map(p => N(p[0])).join(" + ")}.<br>${parts.map(p => piece(p)).join("; ")}.<br>Put the pieces together: <b>${r}</b>.`;
  },
  op_q: e => `Find <b>${e}</b>.`,
  // rows: [bottom digit, place (0 ones, 1 tens, 2 hundreds), product already in place]
  mult_s: (top, bot, rows, r, sw, Nf) => {
    const ord = ["ones", "tens", "hundreds"];
    const ln = rows.map(([c, i, p]) => !c ? `${Nf(top)} × 0 ${ord[i]} = 0: skip this row` : i === 0 ? `${Nf(top)} × ${c} = ${Nf(p)} (start writing in the ones place)` : `${Nf(top)} × ${c} = ${Nf(p / 10 ** i)} (start writing in the ${ord[i]} place: it is ${Nf(p)})`);
    const sum = rows.filter(x => x[0]).map(x => Nf(x[2]));
    return `${sw ? `Put the number with more digits on top: ${Nf(top)} × ${Nf(bot)}.<br>` : ""}${ln.join("<br>")}<br>${sum.length > 1 ? `Add: ${sum.join(" + ")} = <b>${Nf(r)}</b>.` : `Product: <b>${Nf(r)}</b>.`}`;
  },
  jer_q: e => `Find <b>${e}</b>.`,
  jer_s: (pasos, r, par) => `${par ? "Parentheses first" : "Multiplication and division first, then addition and subtraction"}: ${pasos} = <b>${r}</b>.`,
  cb_q: [
    (Nm, n, p, m, q) => `${Nm} buys ${n} books for $${p} each and ${m} notebooks for $${q} each. How much does ${Nm} pay in all?`,
    (c, per, v) => `A store gets ${c} boxes with ${per} bottles in each box and sells ${v} bottles. How many bottles does it have left?`,
    (Nm, d, s) => `${Nm} reads for ${d} minutes every day. How many minutes does ${Nm} read in ${s} weeks?`,
    (t, p, e) => `A group has $${t} for a field trip. They need tickets for ${p} people, and each ticket costs $${e}. How much money will they have left?`],
  cb_s: [
    (n, p, m, q, a, b, t) => `Books: ${n} × $${p} = $${a}. Notebooks: ${m} × $${q} = $${b}. Total: $${a} + $${b} = <b>$${t}</b>.`,
    (c, per, t, v, r) => `Bottles: ${c} × ${per} = ${t}. Left: ${t} − ${v} = <b>${r}</b>.`,
    (d, w, s, r) => `One week: ${d} × 7 = ${w} minutes. In ${s} weeks: ${w} × ${s} = <b>${r} minutes</b>.`,
    (p, e, g, t, r) => `They spend ${p} × $${e} = $${g}. Left over: $${t} − $${g} = <b>$${r}</b>.`],
  div_q: (D, d) => `Divide: <b>${D} ÷ ${d}</b>.`,
  div_f: ["Quotient", "Remainder"],
  // steps: the steps of longDiv (gen/mat4.js), with the method of the lesson (take, estimate by covering, multiply, subtract, bring down)
  div_s: (D, d, q, r, steps, Nf) => {
    const ln = steps.map((s, j) => {
      const head = s.k === "toma" ? `Take ${Nf(s.cur)}${s.short !== null ? ` (${Nf(s.short)} is not enough: it is less than ${d})` : ""}.` : `Bring down the ${steps[j - 1].next}: ${Nf(s.cur)}.`;
      if (s.cero) return `${head} Does ${d} go into ${Nf(s.cur)}? No: write <b>0</b> in the quotient.`;
      const t = `Estimate: cover the ${d % 10} and the ${s.cur % 10}: ${Nf(s.hi)} ÷ ${s.lo} gives ${s.t0}${s.t0 >= 10 ? ", which is 10 or more: start with 9" : ""}`;
      const mul = `${d} × ${s.q} = ${Nf(s.p)}; ${Nf(s.cur)} − ${Nf(s.p)} = ${s.rest}.`;
      if (s.start === s.q) return `${head} ${t}. ${mul}`;
      const over = `, but ${d} × ${s.start} = ${Nf(d * s.start)} is too much.`;
      if (s.start - s.q === 1) return `${head} ${t}${over} Try ${s.q}: ${mul}`;
      return `${head} ${t}${over} Go down to ${s.q} (with ${s.q + 1}, ${d} × ${s.q + 1} = ${Nf(d * (s.q + 1))} is still too much): ${mul}`;
    });
    return `${ln.join("<br>")}<br>Quotient <b>${q}</b>, remainder <b>${r}</b>. Check: ${d} × ${q}${r ? ` + ${r}` : ""} = ${Nf(D)}.`;
  },
  pd_q0: (D, d, q, D2, d2) => `You know that ${N(D)} ÷ ${d} = ${q}. What is <b>${N(D2)} ÷ ${d2}</b>?`,
  pd_s0: (m, q) => `The dividend and the divisor were both multiplied by ${m}, so the quotient does not change: <b>${q}</b>.`,
  pd_s1: (f, r) => `To divide by ${f}, remove ${f === 10 ? "one zero" : "two zeros"} from the end: <b>${r}</b>.`,
  pd_q2: (d, q, r) => `In a division, the divisor is ${d}, the quotient is ${q}, and the remainder is ${r}. What is the dividend?`,
  pd_s2: (d, q, r, D) => `Use the division check: dividend = divisor × quotient + remainder = ${d} × ${q} + ${r} = ${d * q} + ${r} = <b>${D}</b>.`,
  bus_q: (n, c) => `A group of ${n} students is going on a field trip in buses with ${c} seats each. What is the smallest number of buses they need?`,
  bus_s: (n, c, q, r, b) => `${divr(n, c, q, r)}. ${r ? `With ${q === 1 ? "1 bus" : `${q} buses`}, ${r === 1 ? "1 student would be" : `${r} students would be`} left behind, so they need one more bus: <b>${b}</b> buses.` : `They fit exactly: <b>${b}</b> ${b === 1 ? "bus" : "buses"}.`}`,
  cajas_q: (n, per) => `We have ${N(n)} eggs, and we put them in cartons of ${per}. How many cartons can we fill completely?`,
  cajas_s: (n, per, q, r) => `${divr(n, per, q, r)}. We fill <b>${q}</b> cartons${r ? `, and ${r === 1 ? "1 egg is" : `${r} eggs are`} left over` : ""}.`,
  precio_q: (t, p) => `With $${t}, we buy some T-shirts that cost $${p} each, and no money is left over. How many T-shirts do we buy?`,
  precio_s: (t, p, r) => `${t} ÷ ${p} = <b>${r}</b>.`,
  eq_q: e => `Fill in the box so that the fractions are equivalent: <b>${e}</b>`,
  eq_s: (a, b, k) => `Multiply the numerator and the denominator by ${k}: ${a}/${b} = ${a * k}/${b * k}.`,
  eq2_s: (a, b, k) => `Divide the numerator and the denominator by ${k}: ${a}/${b} = ${a / k}/${b / k}.`,
  eq3_q: f => `Which fraction is equivalent to <b>${f}</b>?`,
  cf_q: (a, b, c, d) => `Choose the sign: <b>${a}/${b} ☐ ${c}/${d}</b>`,
  cf_s1: (a, b, c, k) => `Same denominator: compare the numerators. <b>${a}/${b} ${sg(k)} ${c}/${b}</b>.`,
  cf_s2: (a, b, c, d, m, l, r, k) => `Rewrite them with the common denominator ${m}: ${a}/${b} = ${l}/${m} and ${c}/${d} = ${r}/${m}. Since ${l} ${sg(k)} ${r}: <b>${a}/${b} ${sg(k)} ${c}/${d}</b>.`,
  frac_hint: "Write the fraction with a slash, for example 7/5.",
  sf_s: (a, b, d, n, add) => `With the same denominator, ${add ? "add" : "subtract"} the numerators and keep the denominator: ${a} ${add ? "+" : "−"} ${b} = ${n}. Answer: <b>${n}/${d}</b>.`,
  objs: [["students"], ["books"], ["dollars"], ["kilometers"]],
  fn_q: (n, d, Nn) => `Find <b>${n}/${d} of ${Nn}</b>.`,
  fn2_q: (Nn, obj, n, d) => obj === "dollars" ? `How many dollars is ${n}/${d} of $${Nn}?` : `How many ${obj} is ${n}/${d} of ${Nn} ${obj}?`,
  fn_s: (Nn, d, p, n, r) => `${Nn} ÷ ${d} = ${p}; ${p} × ${n} = <b>${r}</b>.`,
  mx_q: (n, d) => `Write <b>${n}/${d}</b> as a mixed number (a whole number and a fraction with denominator ${d}).`,
  mx_f: ["Whole number", "Numerator"],
  mx_s: (n, d, e, r) => `${divr(n, d, e, r)}: the quotient is the whole number, and the remainder is the numerator. So ${n}/${d} = <b>${e} ${r}/${d}</b>.`,
  mx2_q: (e, r, d) => `Write the mixed number <b>${e} ${r}/${d}</b> as a fraction.`,
  mx2_s: (e, d, r, n) => `Each whole is ${d}/${d}: ${e} × ${d} + ${r} = ${n}. Answer: <b>${n}/${d}</b>.`,
  grid_q: "The grid has 100 small squares. What decimal names the shaded part?",
  grid_s: (n, x) => n === 1 ? `1 small square out of 100 is shaded: 1 hundredth = <b>${x}</b>.` : `${n} small squares out of 100 are shaded: ${n} hundredths = <b>${x}</b>.`,
  fd_q: (n, d) => `Write as a decimal: <b>${n}/${d}</b>.`,
  fd_s: (n, d, x) => `${d === 10 ? "Tenths: one digit" : "Hundredths: two digits"} after the decimal point. ${n}/${d} = <b>${x}</b>.`,
  df_q: x => `Write <b>${x}</b> as a fraction with denominator 100.`,
  df_s: (x, n) => `${x} is ${pl(n, "hundredth", "hundredths")}: <b>${n}/100</b>.`,
  decp: ["tenths", "hundredths"],
  decp_o: ["Ones", "Tenths", "Hundredths"],
  dv_q: (x, d) => `In the number <b>${x}</b>, what place is the digit <b>${d}</b> in?`,
  dv_s: (d, p) => `After the decimal point, the first digit is the tenths and the second is the hundredths. The ${d} is in the <b>${p}</b> place.`,
  dw_q: x => `Write the number <b>${x}</b> (you can use a decimal point).`,
  dw_s: x => `It is <b>${x}</b>.`,
  dw2_q: (e, c) => `Write as a decimal: <b>${e} ${e === 1 ? "one" : "ones"} and ${c} ${c === 1 ? "hundredth" : "hundredths"}</b>.`,
  dc_q: (a, b) => `Choose the sign: <b>${a} ☐ ${b}</b>`,
  dc_s: (a, b, k) => `Compare the whole-number parts first, then the tenths and the hundredths (you can add zeros: 3.5 = 3.50). <b>${a} ${sg(k)} ${b}</b>.`,
  sd_s: (add, r) => `Line up the numbers by their decimal points (ones under ones, tenths under tenths…), ${add ? "add" : "subtract"} as usual, and put the decimal point in the same place: <b>${r}</b>.`,
  ti_q: (a, b, c) => `At the school supply store, we buy a backpack for $${a}, a pencil case for $${b}, and a notebook for $${c}. How much do we pay?`,
  ti_s: t => `Add with the decimal points lined up: <b>$${t}</b>.`,
  vu_q: (p, pay) => `A game costs $${p}, and we pay with a $${pay} bill. How much change do we get?`,
  vu_s: (pay, p, r) => `${pay} − ${p} = <b>$${r}</b>.`,
  ud_q: (n, p) => `A ticket costs $${p}. How much do ${n} tickets cost?`,
  ud_s: (n, p, r) => `${n} × ${p} = <b>$${r}</b>.`,
  cv_q: (v, a, b) => `Convert <b>${v} ${a}</b> to <b>${b}</b>.`,
  cv_s: (a, b, f, mul, v, r) => `From ${a} to ${b}, you ${mul ? "multiply by" : "divide by"} ${f} (each step is × 10): ${v} ${a} = <b>${r} ${b}</b>.`,
  tmin_q: (h, m) => `How many minutes are there in <b>${h} h ${m} min</b>?`,
  tmin_s: (h, m, r) => `${h} × 60 + ${m} = <b>${r} minutes</b>.`,
  tseg_q: (m, s) => `How many seconds are there in <b>${m} min ${s} s</b>?`,
  tseg_s: (m, s, r) => `${m} × 60 + ${s} = <b>${r} seconds</b>.`,
  thm_q: t => `Write <b>${t} minutes</b> in hours and minutes.`,
  hm_f: ["Hours", "Minutes"],
  thm_s: (t, h, m) => `Each hour is 60 minutes: ${divr(t, 60, h, m)}. That is <b>${m ? `${h} h ${m} min` : `${h} h`}</b>.`,
  tdur_q: (h1, m1, h2, m2) => `${end(`A train leaves at ${hm(h1, m1)} and arrives at ${hm(h2, m2)}`)} How long is the trip?`,
  // in jumps, like the lesson: up to the hour, whole hours, and the minutes that are left
  tdur_s: (h, m, h1, m1, h2, m2) => {
    const s = m1 ? h1 + 1 : h1, a = m1 ? 60 - m1 : 0, Hh = h2 - s, L = [];
    if (a) L.push(`From ${hm(h1, m1)} to ${hm(s, 0)}: ${a} min`);
    if (Hh) L.push(`From ${hm(s, 0)} to ${hm(h2, 0)}: ${Hh} h`);
    if (m2) L.push(`From ${hm(h2, 0)} to ${hm(h2, m2)}: ${m2} min`);
    const T = (x, y) => x && y ? `${x} h ${y} min` : x ? `${x} h` : `${y} min`;   // no "0 min" or "0 h"
    if (a && m2) L.push(a + m2 >= 60 ? `Minutes: ${a} + ${m2} = ${a + m2} min = ${T(1, a + m2 - 60)}` : `Minutes: ${a} + ${m2} = ${a + m2} min`);
    const mix = a && m2 && a + m2 >= 60 && Hh ? `${Hh} h + ${T(1, a + m2 - 60)} = ` : "";
    return `${L.join("<br>")}<br>Total: ${mix}<b>${T(h, m)}</b>.`;
  },
  ang_q: d => `What kind of angle is ${artNum(d)} <b>${d}°</b> angle?`,
  ang_o: ["Acute", "Right", "Obtuse", "Straight"],
  ang_s: [d => `It measures less than 90°: <b>acute</b>.`, d => `It measures exactly 90°: <b>right</b>.`, d => `It measures more than 90° and less than 180°: <b>obtuse</b>.`, d => `It measures 180°, half a turn: <b>straight</b>.`],
  comp_q: a => `How many more degrees does ${artNum(a)} ${a}° angle need to make a right angle?`,
  comp_s: (a, r) => `A right angle measures 90°: 90 − ${a} = <b>${r}°</b>.`,
  supl_q: a => `How many more degrees does ${artNum(a)} ${a}° angle need to make a straight angle?`,
  supl_s: (a, r) => `A straight angle measures 180°: 180 − ${a} = <b>${r}°</b>.`,
  tri3_q: (a, b) => `Two angles of a triangle measure ${a}° and ${b}°. What is the measure of the third angle?`,
  tri3_s: (a, b, r) => `The three angles of a triangle add up to 180°: 180 − ${a} − ${b} = <b>${r}°</b>.`,
  tri_q: a => `The angles of a triangle measure ${lst(a.split(", "))}. What kind of triangle is it, by its angles?`,
  tri_o: ["Acute", "Right", "Obtuse"],
  tri_s: ["All three angles are acute: it is an <b>acute</b> triangle.", "It has a right angle: it is a <b>right</b> triangle.", "It has an obtuse angle: it is an <b>obtuse</b> triangle."],
  cu_q: "What is the <b>most specific</b> name for this quadrilateral?",
  // «trapezoide» (no parallel sides) has no name in the US: "general quadrilateral" (glossary)
  cu_o: ["Square", "Rectangle", "Rhombus", "Rhomboid", "Trapezoid", "General quadrilateral"],
  cu_s: ["4 equal sides and 4 right angles: it is a <b>square</b>. (It is also a rectangle and a rhombus, but “square” tells you more.)", "4 right angles, but the sides are not all equal: <b>rectangle</b>.", "4 equal sides, but its angles are not right angles: <b>rhombus</b>.", "Opposite sides are parallel and equal, but not all four sides are equal, and there are no right angles: <b>rhomboid</b>.", "Only two sides are parallel: <b>trapezoid</b>.", "No side is parallel to another: <b>general quadrilateral</b> (a quadrilateral with no parallel sides)."],
  cu2_q: "Which group does this quadrilateral belong to?",
  cu2_o: ["Parallelogram", "Trapezoid", "General quadrilateral"],
  cu2_s: ["Its opposite sides are parallel in pairs: <b>parallelogram</b>.", "It has only one pair of parallel sides: <b>trapezoid</b>.", "It has no parallel sides: <b>general quadrilateral</b>."],
  ar_q: "Each small square is 1 cm². What is the area of the shaded figure, in cm²?",
  ar_s: (n, m) => m ? `It is a rectangle: ${m} = <b>${n} cm²</b>. (You can also count the small squares.)` : `Count the shaded squares: <b>${n} cm²</b>.`,
  arr_q: (l, w) => `What is the area of a rectangle ${l} cm long and ${w} cm wide, in cm²?`,
  arr_s: (l, w, r) => `Area = length × width = ${l} × ${w} = <b>${r} cm²</b>.`,
  cp_w: ["faces", "vertices", "edges"],
  // names of the solids of m4.cuerpos (same order as BODIES in gen/mat4.js)
  cp_nom: ["a cube", "a triangular prism", "a square prism", "a square pyramid", "a triangular pyramid", "a hexagonal prism", "a hexagonal pyramid"],
  cp_q: (w, n) => `How many <b>${w}</b> does ${n} have?`,
  cp_s: (n, v) => `${cap(n)} has <b>${v[0]} faces, ${v[1]} vertices, and ${v[2]} edges</b>.`,
  cr_q: "Is it a polyhedron or a curved solid?",
  cr_o: ["Polyhedron", "Curved solid"],
  cr_s: ["All its faces are polygons (flat): it is a <b>polyhedron</b>.", "It has a curved surface: it is a <b>curved solid</b>."],
  colores: ["red", "blue", "green", "yellow", "orange"],
  fr_q: (d, c) => `These are the favorite colors of the students in a class: ${d}. What is the frequency of <b>${c}</b>?`,
  fr_s: (c, f) => `Count how many times ${c} appears: <b>${f}</b>.`,
  frt_q: d => `These are the favorite colors of the students in a class: ${d}. How many students answered?`,
  frt_s: n => `Count all the answers: <b>${n}</b>.`,
  moda_q: d => `These are the favorite colors of the students in a class: ${d}. Which color was chosen the most?`,
  moda_s: (c, f) => `The one with the highest frequency: <b>${c}</b> (${f} times).`,
  // [context, lowest value, highest value] (ranges that make sense for each quantity)
  media_ctx: [["A student's scores on several tests (out of 10) are", 3, 10], ["The goals a soccer team scored in several games are", 0, 6],
    ["The numbers of books some friends read this school year are", 1, 15], ["The high temperatures (°C) on several spring days are", 12, 28],
    ["The points a basketball team scored in several games are", 50, 95], ["The ages of some cousins are", 2, 14]],
  media_q: (c, d) => `${c}: ${d}. What is the mean?`,
  media_s: (sum, t, n, m) => `Add all the values and divide by how many there are: (${sum}) ÷ ${n} = ${t} ÷ ${n} = <b>${m}</b>.`,
  dado: [["an even number", 3], ["a 6", 1], ["a number greater than 4", 2], ["a number less than 3", 2], ["a multiple of 3", 2], ["an odd number", 3], ["a number greater than 2", 4], ["a number other than 1", 5]],
  pd_q: d => `We roll a number cube. What is the probability of rolling ${d}? (Write it as a fraction.)`,
  pb_q: (r, a, v) => { const ball = (n, c) => n === 1 ? `1 ${c} ball` : `${n} ${c} balls`; return `A bag has ${v ? `${ball(r, "red")}, ${ball(a, "blue")}, and ${ball(v, "green")}` : `${ball(r, "red")} and ${ball(a, "blue")}`}. We pick one without looking. What is the probability that it is red?`; },
  rul_q: "We spin the spinner. What is the probability that it lands on red? (All the parts are the same size.)",
  pdj_s: (f, t) => `Probability = favorable outcomes / possible outcomes = <b>${f}/${t}</b>.`,
  // m4.convlong / m4.convmasa (Grade 4: no decimals; counting steps on the staircase)
  cv4_s: (a, b, k, down, chain, f, v, r) => `From ${a} to ${b}, you go ${down ? "down" : "up"} ${k === 1 ? "one step" : `${W(k)} steps`} (${chain}): ${down ? "multiply by" : "divide by"} ${k > 1 ? `${Array(k).fill(10).join(" × ")} = ` : ""}${f}. ${v} ${down ? "×" : "÷"} ${f} = <b>${r} ${b}</b>.`,
  dos_q: (a, big, b, small) => `How many <b>${small}</b> are there in <b>${a} ${big} ${b} ${small}</b>?`,
  dos_s: (a, big, b, small, f, A, r) => `Change the larger unit to the smaller one: ${a} ${big} = ${a} × ${f} = ${A} ${small}. Add: ${A} + ${b} = <b>${r} ${small}</b>.`,
  tkg_s: (down, a, A) => down ? `1 t = ${N(1000)} kg: multiply by ${N(1000)}. ${a} × ${N(1000)} = <b>${A} kg</b>.` : `1 t = ${N(1000)} kg: divide by ${N(1000)}. ${A} ÷ ${N(1000)} = <b>${a} t</b>.`,
});
// m4.fracdec (Grade 4: fractions less than 1)
const ten = n => pl(n, "tenth", "tenths"), hun = n => pl(n, "hundredth", "hundredths");
S.FD = {
  grid_s: (n, col, su, x) => col ? `There ${col === 1 ? "is 1 full column" : `are ${col} full columns`} of 10 (${ten(col)})${su ? ` and ${su === 1 ? "1 single square (1 hundredth)" : `${su} single squares (${su} hundredths)`}` : ""}: ${hun(n)} = <b>${x}</b>.` : `There ${su === 1 ? "is only 1 single square (1 hundredth)" : `are only ${su} single squares (${su} hundredths)`} and no full columns (0 tenths): ${hun(n)} = <b>${x}</b>.`,
  dec_s: (n, x) => `${n}/10 is ${ten(n)}: the digit ${n} goes right after the decimal point. <b>${x}</b>.`,
  cent_s: (n, d, c, x) => `${n}/100 is ${hun(n)}, that is, ${ten(d)} and ${hun(c)}. After the decimal point, first the tenths (${d}) and then the hundredths (${c}): <b>${x}</b>.`,
  df_s: (x, d, c, n) => `${x} has ${ten(d)} and ${hun(c)}. Each tenth is 10 hundredths: ${d} × 10 + ${c} = ${hun(n)}. <b>${n}/100</b>.`,
};
// m4.euros (Grade 4): in dollars; counting up to the next dime, the next quarter, the next dollar, and the bill
S.EU = {
  ti_s: (a, b, c, ab, t) => `With the decimal points lined up: ${a} + ${b} = ${ab}; ${ab} + ${c} = <b>$${t}</b>.`,
  // J: jumps [from, to, cents, amount] (written like the lesson: "From 6.40 to 6.50: 10 cents")
  vu_s: (J, r, pay, p) => `Count up from the price to $${pay}:<br>${J.map(([u, v, c, e]) => `From ${u} to ${v}: ${c < 100 ? `${c} cents` : `$${e}`}`).join("<br>")}<br>Change: ${J.map(j => j[3]).join(" + ")} = <b>$${r}</b>.`,
  ud_s: (n, p, c, t, e, ct, r) => `Change to cents: $${p} = ${N(c)} cents. ${N(c)} × ${n} = ${t} cents = ${pl(e, "dollar", "dollars")}${ct ? ` and ${pl(ct, "cent", "cents")}` : ""} = <b>$${r}</b>.`,
};
// m4.probfrac (Grade 4: "favorable outcomes", saying which ones they are)
S.PF = {
  // [description, winning faces]
  dado: [["an even number", [2, 4, 6]], ["a 6", [6]], ["a number greater than 4", [5, 6]], ["a number less than 3", [1, 2]], ["a 3 or a 6", [3, 6]], ["an odd number", [1, 3, 5]], ["a number greater than 2", [3, 4, 5, 6]], ["a number other than 1", [2, 3, 4, 5, 6]]],
  dado_s: c => `Favorable outcomes: ${c.length === 1 ? `${c[0]} (1 outcome)` : `${lst(c.map(String))} (${c.length} outcomes)`}. Possible outcomes: the 6 faces of the number cube. Probability = favorable outcomes / possible outcomes = <b>${c.length}/6</b>.`,
  bolsa_s: (r, a, v, t) => `Favorable outcomes: ${r === 1 ? "the red ball (1 outcome)" : `the ${r} red balls`}. Possible outcomes: all the balls, ${v ? `${r} + ${a} + ${v}` : `${r} + ${a}`} = ${t}. Probability = <b>${r}/${t}</b>.`,
  rul_s: (c, n) => `Favorable outcomes: ${c === 1 ? "the red part (1 outcome)" : `the ${c} red parts`}. Possible outcomes: the ${n} parts of the spinner. Probability = <b>${c}/${n}</b>.`,
};
// ═════ The calendar, circles, coordinates, and scale maps ═════
// m4.calendario
S.CL = {
  dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  letras: ["M", "T", "W", "T", "F", "S", "S"],
  inicio: 6,   // the calendar page starts on Sunday, as in the US (index in «dias»)
  meses: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  dentro_q: (w, n) => `Today is ${w}. What day of the week will it be in ${n} days?`,
  dentro_s: (w, n, q, r, w2) => `${n} = ${q} × 7${r ? ` + ${r}` : ""}. In ${q === 1 ? "7 days" : `${7 * q} days (${q} weeks)`} it will be ${w} again${r ? `, and ${r === 1 ? "1 more day takes" : `${r} more days take`} you to <b>${w2}</b>` : `: it will be <b>${w2}</b>`}.`,
  entre_q: (d1, m1, d2, m2, y, feb) => `Today is ${m1} ${d1}${feb ? `, ${y}` : ""}. How many days are left until ${m2} ${d2}?`,
  // with today not counted
  entre_s: (m1, L, d1, d2, m2, bis) => `${m1} has ${L} days${m1 === "February" ? (bis ? " (it is a leap year)" : " (it is not a leap year)") : ""}: after today, ${L - d1 === 1 ? `there is 1 day left in ${m1} (${m1} ${L})` : `there are ${L} − ${d1} = ${L - d1} days left in ${m1} (${m1} ${d1 + 1} to ${L})`}. Then come ${pl(d2, "day", "days")} in ${m2}: ${L - d1} + ${d2} = <b>${L - d1 + d2}</b> days.`,
  // with a whole month in between
  entre2_s: (m1, L, d1, m2, L2, bis2, d2, m3, bis1) => `${m1} has ${L} days${bis1 === null ? "" : bis1 ? " (leap year)" : " (not a leap year)"}: after today, ${L - d1 === 1 ? "there is 1 day left" : `there are ${L} − ${d1} = ${L - d1} days left`} in ${m1}.<br>All of ${m2}: ${L2} days${bis2 === null ? "" : bis2 ? " (leap year)" : " (not a leap year)"}.<br>And ${pl(d2, "day", "days")} in ${m3}.<br>${L - d1} + ${L2} + ${d2} = <b>${L - d1 + L2 + d2}</b> days.`,
  bis_q: "Which of these years is a leap year?",
  bis_s: y => `Leap years come every 4 years: ${[y - 8, y - 4, y, y + 4].join(", ")}… In the list, only <b>${y}</b> is one.`,
  sera_q: y => `Is ${y} a leap year?`,
  sino: ["Yes", "No"],
  sera_s: (y, b, list) => b ? `Leap years come every 4 years (…, ${list}, …), and ${y} is one of them: it <b>is</b> a leap year; its February has 29 days.` : `Leap years come every 4 years (…, ${list}, …), and ${y} is not one of them: it is <b>not</b> a leap year; its February has 28 days.`,
  trim_q: n => `How many months are there in ${n} quarters of a year?`,
  trim_s: n => `A quarter of a year is 3 months: ${n} × 3 = <b>${3 * n}</b> months.`,
  sem_q: n => `How many months are there in ${n} semesters?`,
  sem_s: n => `A semester is half a year, 6 months: ${n} × 6 = <b>${6 * n}</b> months.`,
  quin_q: n => `How many days are there in ${n} half months?`,
  quin_s: n => `A half month is 15 days: ${n} × 15 = <b>${15 * n}</b> days.`,
  medio_q: n => `How many months are there in ${n} and a half years?`,
  medio_s: n => `${n} years is ${n} × 12 = ${12 * n} months, and half a year is 6 months: ${12 * n} + 6 = <b>${12 * n + 6}</b> months.`,
  dec_q: n => `How many decades are there in ${n} centuries?`,
  dec_s: n => `A century is 100 years, that is, 10 decades: ${n} × 10 = <b>${10 * n}</b> decades.`,
  sig_q: n => `How many years are there in ${n} centuries?`,
  sig_s: n => `A century is 100 years: ${n} × 100 = <b>${100 * n}</b> years.`,
  ordT: ["first", "second", "third", "fourth"],
  trimd_q: (t, y) => `How many days are there in the ${t} quarter of ${y}?`,
  trimd_s: (ms, ds, tot, bis, y) => `That quarter is ${lst(ms)}.${bis === null ? "" : ` ${y} ${bis ? "is a leap year: February has 29 days" : "is not a leap year: February has 28 days"}.`} ${ds.join(" + ")} = <b>${tot}</b> days.`,
  hoja_q: (d, w, d2, m) => `On the calendar page, ${m} ${d} (circled) is a ${w}. What day of the week is ${m} ${d2}?`,
  hoja_s: (d, d2, add, w) => `${d2} − ${d} = ${add}: ${add === 7 ? "exactly one week" : `exactly ${W(add / 7)} weeks`} later. Adding 7 takes you to the same day of the week (the square right below): it is a <b>${w}</b>.`,
  cuantos_q: (d, w, m, y) => `${m} ${d}, ${y}, is a ${w}. How many ${w}s are there in that month?`,
  cuantos_s: (w, list, n, L) => `The month has ${L} days. Adding and subtracting 7 gives you all the ${w}s: ${list}. There are <b>${n}</b>.`,
};

// m4.circulares
S.CI = {
  nombre_q: "What is the part drawn in red called?",
  lineas: ["Radius", "Diameter", "Chord", "Arc"],
  figuras: ["Semicircle", "Sector", "Arc"],
  nombre_s: ["It is a line segment that goes from the center O to the circle: it is a <b>radius</b>.", "It is a chord that passes through the center O, the longest one of all: it is a <b>diameter</b>.",
    "It is a line segment that joins two points on the circle without passing through the center: it is a <b>chord</b>.", "It is a piece of the circle, a curved line: it is an <b>arc</b>.",
    "It is half of a disk, bounded by a diameter and half of the circle: it is a <b>semicircle</b>.", "It is the part of the disk between two radii and the arc that joins them, like a slice of cake: it is a <b>sector</b>."],
  cosas: ["a pizza", "a birthday cake", "a round box of cheese wedges", "an apple pie"],
  partes_q: (w, n) => `${cap(w)} is cut from the center into ${n} equal slices. How many degrees is the angle of each slice?`,
  partes_s: (n, a) => `A full turn is 360°: 360 ÷ ${n} = <b>${a}</b>°.`,
  parte: n => ({ 2: "One-half", 3: "One-third", 4: "One-fourth", 5: "One-fifth", 6: "One-sixth", 8: "One-eighth", 10: "One-tenth", 12: "One-twelfth" })[n],
  cual_q: a => `What part of the disk is ${artNum(a)} ${a}° sector?`,
  cual_s: (a, n, p) => `${a}° goes into 360° ${n} times (360 ÷ ${a} = ${n}): the sector is <b>${p}</b> of the disk.`,
  cuerda_q: r => `A circle has a radius of ${r} cm. How many centimeters long is its longest chord?`,
  cuerda_s: r => `The longest chord is the diameter, which is two radii long: ${r} × 2 = <b>${2 * r}</b> cm.`,
  puede_q: (d, x) => `In a circle with a diameter of ${d} cm, you draw several chords. Can any of them be ${x} cm long?`,
  puede_o: ["Yes", "No"],
  puede_s: (d, x) => x < d ? `<b>Yes</b>: the longest chord is the diameter, ${d} cm, and ${x} cm is less. It will be a chord that does not pass through the center.` : `<b>No</b>: the longest chord is the diameter, which is ${d} cm long, and ${x} cm is more.`,
  cuantas_q: a => `A round cake is cut from the center into equal slices of ${a}°. How many slices are there?`,
  cuantas_s: (a, n) => `A full turn is 360°: 360 ÷ ${a} = <b>${n}</b> slices.`,
};

// m4.coordenadas
S.CO = {
  sitios: ["the fountain", "the snack stand", "the treasure", "the big tree", "the bench"],
  coord_q: s => `Look at the map of the park. What are the coordinates of ${s}?`,
  coord_s: (s, x, y) => `From (0, 0), to get to ${s} you go ${x} to the right and ${y} up: it is the point <b>(${x}, ${y})</b>. First you say how far to the right, then how far up.`,
  hay_q: p => `Look at the map of the park. What is at the point <b>${p}</b>?`,
  hay_s: (x, y, s) => `From (0, 0), go ${x} to the right and ${y} up: at (${x}, ${y}) there is <b>${s}</b>. Careful: (${y}, ${x}) is a different point!`,
  mueve_q: (x, y, p, q) => `You are at the point (${x}, ${y}). You move ${p} ${p === 1 ? "step" : "steps"} to the right and ${q} up. What point are you at now?`,
  mueve_s: (x, y, p, q, ex, ey) => `What you move to the right is added to the first number: ${x} + ${p} = ${ex}. What you move up is added to the second: ${y} + ${q} = ${ey}. You are at <b>(${ex}, ${ey})</b>.`,
};

// m4.escala
S.ES = {
  metros: "meters",
  sitios: ["home", "school", "the library", "the sports center", "the town square"],
  camino_q: (a, b) => `On the map, the red path goes from ${a} to ${b} along the streets. Use the scale bar: how many meters long is the path in real life?`,
  camino_s: (v, h, w, r) => `The scale bar shows that each square is ${v} m. The path is ${h === 1 ? "1 square" : `${h} squares`} across and ${w} up or down: ${h} + ${w} = ${h + w} squares. ${h + w} × ${v} = <b>${r}</b> m.`,
  calle_q: (v, n) => `On a map, each square stands for ${v} m. A straight street is ${n} squares long. How many meters long is it in real life?`,
  calle_s: (n, v, r) => `Real distance = number of squares × what each square stands for: ${n} × ${v} = <b>${r}</b> m.`,
  pueblos: ["Upton", "Downton", "Sunfield", "Riverdale", "Clearmont"],
  mapa_q: (e, a, b, d) => `On a map, 1 cm stands for ${e} km. With a ruler, ${a} and ${b} are ${d} cm apart. How many kilometers apart are they in real life?`,
  mapa_s: (d, e) => `Each centimeter on the map is ${e} km: ${d} × ${e} = <b>${d * e}</b> km.`,
  // [what, at most this many meters]
  largos: [["a park", 1500], ["an avenue", 3000], ["a bridge", 1000], ["the boardwalk", 3000], ["a street", 1200]],
  plano_q: (e, w, r) => `On a map, 1 cm stands for ${e} m. ${cap(w)} is ${r} m long. How many centimeters long is it on the map?`,
  plano_s: (r, e, cm) => `Every ${e} m takes up 1 cm: ${r} ÷ ${e} = <b>${cm}</b> cm.`,
  km_q: (v, n) => `On a map, each square is ${v} m. A path is ${n} squares long. How many kilometers long is it in real life?`,
  km_s: (n, v, m, k) => `${n} × ${v} = ${m} m. Since 1 km = ${N(1000)} m: ${m} ÷ ${N(1000)} = <b>${k}</b> km.`,
};
// ═════ Texts of the Grade 4 generators (improvement round) ═════
Object.assign(S, {
  // m4.jerarquia
  JE: {
    lead: { md: "Multiplication and division first; then addition and subtraction", par: "Parentheses first", lr: "There are only additions and subtractions: do them from left to right",
      mdlr: "Multiplication first; then the addition and the subtraction, from left to right", pmd: "Parentheses first; then the multiplication, and last, the subtraction", mdiz: "Division and multiplication are at the same level: do them from left to right" },
    s: (k, st) => `${S.JE.lead[k]}:<br>${st.slice(0, -1).join("<br>")}${st.length > 1 ? "<br>" : ""}${st[st.length - 1].replace(/= (\d+)$/, "= <b>$1</b>")}.`,
  },
  // m4.propdiv: crossing out zeros
  pd_s3: (z, D2, b, r, d, D) => `${D} and ${d} end in zeros: cross out ${z === 1 ? "one zero" : "two zeros"} in each (that is the same as dividing both by ${z === 1 ? 10 : 100}). That leaves ${D2} ÷ ${b} = <b>${r}</b>.`,
  // m4.probdiv
  PV: {
    precio_s: (t, p, m) => `This is making groups: how many times does $${p} go into $${t}? ${t} ÷ ${p} = <b>${m}</b> T-shirts (${p} × ${m} = ${t}).`,
    max_q: (t, p) => `You have $${t} and buy as many $${p} T-shirts as you can. How many T-shirts do you buy?`,
    max_s: (t, p, m, r) => `${divr(t, p, m, r)}. $${r} is not enough for another T-shirt, so that money is left over, and you buy <b>${m}</b>.`,
    cuerda_q: (n, t) => `We have ${n} m of rope, and we cut it into pieces ${t} m long. How many meters of rope are left over?`,
    cuerda_s: (n, t, q, r) => `${divr(n, t, q, r)}. You get ${q} pieces, but the question asks what is left over: the remainder, <b>${r} m</b>. Check: ${t} × ${q} + ${r} = ${n}.`,
    rep: [["trading cards", "friends", false], ["marbles", "children", true], ["stickers", "classmates", true], ["pieces of candy", "cousins", false]],
    rep_q: (n, c, k, w, fem) => `We share ${n} ${c} equally among ${k} ${w}. How many ${c} does each one get?`,
    rep_s: (n, k, q, r, c) => `This is sharing: find how many each one gets. ${divr(n, k, q, r)}. Each one gets <b>${q}</b> ${c}${r ? ` (and ${r === 1 ? "1 is" : `${r} are`} left over, not enough for everyone)` : ""}.`,
  },
  // m4.sumadec: written in columns, like the lesson (A, B, Rr in hundredths). Subtraction with US regrouping
  // (decision of 2026-11-12): when the top digit is smaller, take 1 from the next place on top (cross it out and
  // write 1 less) for 10 in this place, across zeros if needed. Same answers as the Spanish method.
  SD: {
    s: (add, A, B, Rr, pad) => {
      const f = v => `${Math.floor(v / 100)}.${String(v % 100).padStart(2, "0")}`, dg = (v, i) => Math.floor(v / 10 ** i) % 10;
      const nom = ["Hundredths", "Tenths", "Ones", "Tens", "Hundreds"], L = [`${pad ? "Fill in with zeros and line up" : "Line up"} the decimal points: ${f(A)} ${add ? "+" : "−"} ${f(B)}`];
      const ncol = Math.max(String(Math.max(A, B)).length, 3);
      const one = ["hundredth", "tenth", "one", "ten", "hundred"], pl = ["hundredths", "tenths", "ones", "tens", "hundreds"];
      const pv = (n, q, m) => `the ${n} ${n === 1 ? one[q] : pl[q]} ${n === 1 ? "becomes" : "become"} ${m}`;
      const top = [], chg = [], len = String(A).length;   // top digits after regrouping, and which ones changed
      for (let i = 0; i <= ncol; i++) top.push(dg(A, i));
      let c = 0;
      for (let i = 0; i < ncol; i++) {
        const a = dg(A, i), b = dg(B, i);
        if (add) { const s = a + b + c; L.push(`${nom[i]}: ${a} + ${b}${c ? " + 1" : ""} = ${s}${s >= 10 ? `: write ${s - 10} and carry 1` : ""}`); c = s >= 10 ? 1 : 0; }
        else {
          if (i >= len) break;
          const cur = top[i], pre = chg[i] ? `the top digit is now ${cur}. ` : "", up = s => pre ? s[0].toUpperCase() + s.slice(1) : s;
          if (cur < b) {
            let j = i + 1;
            while (top[j] === 0) j++;
            const st = [pv(top[j], j, top[j] - 1)];
            for (let k = j - 1; k > i; k--) st.push(pv(0, k, 10), `then ${pv(10, k, 9)}`);
            const last = pv(cur, i, cur + 10);
            const why = j === i + 1 ? "so regroup" : `and there ${j - i === 2 ? `are 0 ${pl[i + 1]}` : `are 0 ${pl[i + 1]} and 0 ${pl[i + 2]}`}, so regroup ${["", "", "twice", "three times"][j - i]}`;
            // st: [left digit, 0 → 10, 10 → 9, …]: pairs joined like the lesson ("…, and the 0 tenths become 10; then …")
            const parts = [st[0]];
            for (let k = 1; k < st.length; k += 2) parts.push(`, and ${st[k]}; ${st[k + 1]}`);
            L.push(`${nom[i]}: ${pre}${up("you")} can't take ${b} from ${cur}, ${why}: ${parts.join("")}, and ${last}. ${cur + 10} − ${b} = ${cur + 10 - b}`);
            top[j]--; chg[j] = true;
            for (let k = j - 1; k > i; k--) { top[k] = 9; chg[k] = true; }
          }
          else if (pre && i >= 3 && i === len - 1 && cur === 0 && b === 0) L.push(`${nom[i]}: ${pre}Nothing is left (a 0 on the left is not written)`);
          else L.push(`${nom[i]}: ${pre}${cur} − ${b} = ${cur - b}`);
        }
      }
      if (add && c) L.push(`${nom[ncol]}: the 1 you carried: 1`);
      return `${L.join("<br>")}<br>Bring down the decimal point: <b>${f(Rr)}</b>.`;
    },
  },
  // m4.convlong / m4.convmasa: two units, and the glasses problem
  par_q: (n, small, big) => `Write <b>${n} ${small}</b> in ${big} and ${small}.`,
  par_s: (n, small, big, f, q, qf, r) => `1 ${big} = ${f} ${small}. ${n} ${small} = ${qf} ${small} + ${r} ${small} = <b>${q} ${big} ${r} ${small}</b>.`,
  recip: [["A bottle"], ["A pitcher"], ["A water jug"]],
  vasos_q: (rec, l, v) => `${rec} holds ${l === 1 ? "1 liter" : `${l} liters`} of water. How many ${v} mL glasses can you fill?`,
  vasos_s: (l, ml, v, n) => `Change liters to milliliters: ${l} L = ${l} × ${N(1000)} = ${ml} mL. ${ml} ÷ ${v} = <b>${n}</b> glasses.`,
  // m4.triangulos: by their sides
  trl_q: l => `A triangle has sides that measure ${lst(l)}. What kind of triangle is it, by its sides?`,
  trl_o: ["Equilateral", "Isosceles", "Scalene"],
  trl_s: [L => `Compare the sides: all three measure ${L[0]} cm, so they are equal: <b>equilateral</b>.`,
    L => { const s = L.slice().sort((p, q) => p - q), eq = s[0] === s[1] ? s[0] : s[2], ot = s[0] === s[1] ? s[2] : s[0]; return `Compare the sides: two are equal (${eq} cm) and one is different (${ot} cm): <b>isosceles</b>.`; },
    L => `Compare the sides: ${lst(L.map(v => v + " cm"))}, all three different: <b>scalene</b>.`],
  // m4.cuerpos: counting like the lesson
  cp_s2: (name, k, tipo, n, v) => {
    const base = { 3: "a triangle", 4: "a square", 6: "a hexagon" }[n], pre = tipo === "cubo" ? "A cube is a prism with square bases (4 sides)." : `The base is ${base} (${n} sides).`;
    const w = ["faces", "vertices", "edges"][k], r = `<b>${v[k]} ${w}</b>`;
    const P = [`2 bases and ${n} faces around the sides: 2 + ${n} = ${r}`, `${n} vertices on each base: ${n} + ${n} = ${r}`, `${n} edges on each base and ${n} edges joining them: ${n} + ${n} + ${n} = ${r}`];
    const Y = [`1 base and ${n} triangles: 1 + ${n} = ${r}`, `${n} vertices on the base plus the apex: ${n} + 1 = ${r}`, `${n} edges on the base and ${n} going up to the apex: ${n} + ${n} = ${r}`];
    return `${pre} ${(tipo === "piramide" ? Y : P)[k]}.`;
  },
});
// m4.escala: in kilometers (above, in S.ES)

// m4.grandes
S.GR = {
  gnom: ["Millions", "Thousands", "Ones"],
  valor_s: (g, d, pos, v) => `Split it into groups: ${g}. The digit ${d} is in the ${pos} place, so its value is <b>${v}</b>.`,
  escr_s: (parts, n) => `${parts.map(([nm, w, c]) => `${nm}: ${w ? `“${w}”` : "nothing is said"} → ${c}`).join("<br>")}<br>Number: <b>${n}</b>.`,
  leer_s: (g, parts, w) => `Split it into groups of three from the right: ${g}.<br>${parts.map(([nm, ww, c]) => `${nm} (${c}): ${ww ? `“${ww}”` : "nothing is said"}`).join("<br>")}<br>It is read <b>${w}</b>.`,
  cmp_q: (a, b) => `Choose the sign: <b>${a} ☐ ${b}</b>`,
  cmp1_s: (a, la, b, lb, cr) => `${a} has ${la} digits, and ${b} has ${lb}. The one with more digits is greater: <b>${a} ${cr ? "&lt;" : ">"} ${b}</b>.`,
  cmp2_s: (len, eqs, nm, va, vb, a, b, cr) => `Both have ${len} digits. Compare group by group, starting from the left: ${eqs.map(([g, v]) => `the ${g.toLowerCase()} group is the same (${v}); `).join("")}in the ${nm.toLowerCase()} group, ${va} ${cr ? "&lt;" : ">"} ${vb}. So <b>${a} ${cr ? "&lt;" : ">"} ${b}</b>.`,
};
// m4.ordenes (abbreviations of the place-value chart: O, T, H, Th, TTh, HTh; glossary)
S.OR = {
  ordp: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"],
  ordq: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "million"],   // "in 7 million"
  ab: ["O", "T", "H", "Th", "TTh", "HTh"], ab1: ["O", "T", "H", "Th", "TTh", "HTh", "million"], abv: ["O", "T", "H", "Th", "TTh", "HTh", "million"],
  tapa: ["", "the ones", "the tens and the ones", "the hundreds, the tens, and the ones"],
  cuantas_q: (o, n) => `How many ${o} are there in all in <b>${n}</b>?`,
  bill_q: (n, b) => `You want to pay $${n} using only $${b} bills. How many bills do you need?`,
  cuantas_s: (o, tapa, q, ceros, qs, n, f, bill) => `${bill ? `Find how many ${o} there are in ${n}. ` : ""}Cover ${tapa}: ${q}|${ceros}. There are <b>${qs}</b> ${o}${bill ? `: you need ${qs} $${N(f)} bills` : ""} (${qs} × ${N(f)} = ${n}).`,
  comp_s: (lista, n) => `Put each digit in its place; the places that do not appear get a 0: ${lista} → <b>${n}</b>.`,
  cifra_s: (g, pos, d, v) => `Split it into groups: ${g}. Counting from the right (ones, tens, hundreds…), the ${pos} digit is <b>${d}</b>${d ? ` (its value is ${v})` : " (its value is 0, but it holds the place)"}.`,
  conv_q: (o, v, oq) => `How many ${o} are there in ${v} ${oq}?`,
  conv_s: (chain, v, ab, f, r, abb, saltos) => `${chain}${saltos > 1 ? " (each jump multiplies by 10)" : ""}. So ${v} ${ab} = ${v} × ${f} = <b>${r}</b> ${abb}.`,
};
// m4.redondeo ("tens" → "the nearest ten")
const one = p => p.replace(/s$/, "");
S.RD = {
  pos: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"],
  red_q: (n, p) => `Round <b>${n}</b> to the nearest ${one(p)}.`,
  // pos: names of the places; carry: [[place, digit], …] from where it goes up
  red_s: (pos, p, look, up, c, carry, r) => {
    const head = `Look at the neighbor digit, in the ${pos[p - 1]} place: it is ${look}. `;
    if (!up) return `${head}Since it is less than 5, the ${pos[p]} digit stays ${c}, and the digits to its right become zeros: <b>${r}</b>.`;
    if (c < 9) return `${head}Since it is 5 or more, the ${pos[p]} digit goes up from ${c} to ${c + 1}, and the digits to its right become zeros: <b>${r}</b>.`;
    const [q, d] = carry[carry.length - 1], mid = carry.slice(1, -1).map(([qq]) => `; the ${pos[qq]} digit is a 9 too: write 0 and carry 1 to the ${pos[qq + 1]}`).join("");
    return `${head}Since it is 5 or more, the ${pos[p]} digit goes up, but it is a 9: it becomes 10, so write 0 and carry 1 to the ${pos[p + 1]}${mid}; ${d ? `the ${pos[q]} digit goes from ${d} to ${d + 1}` : `a 1 appears in the ${pos[q]} place`}. The digits to its right become zeros: <b>${r}</b>.`;
  },
  est_q: (p, e) => `Estimate by rounding each number to the nearest ${one(p)}: <b>${e}</b>.`,
  est_s: (a, A, la, b, B, lb, add, r, ex) => `${a} ≈ ${A} (the neighbor digit is ${la}) and ${b} ≈ ${B} (the neighbor digit is ${lb}). Estimate: ${A} ${add ? "+" : "−"} ${B} = <b>${r}</b>. (The exact answer is ${ex}, so the estimate is reasonable.)`,
};
// m4.mental
S.ME = {
  q: e => `Use mental math: <b>${e}</b>.`,
  suma_s: (a, up, e, b, r) => `Add ${up} and take away ${e}: ${a} + ${up} = ${b}; that is ${e} too many: ${b} − ${e} = <b>${r}</b>.`,
  resta_s: (a, up, e, b, r) => `Subtract ${up} and give back ${e}: ${a} − ${up} = ${b}; you took away ${e} too many: ${b} + ${e} = <b>${r}</b>.`,
  por5_s: (n, t, r) => `Times 5 is times 10 and then half: ${n} × 10 = ${t}; ${t} ÷ 2 = <b>${r}</b>.`,
  por9_s: (n, t, r) => `Times 9 is times 10 minus the number once: ${n} × 10 = ${t}; ${t} − ${n} = <b>${r}</b>.`,
  parm_s: (x, y, p, m, r) => `First multiply the friendly numbers: ${x} × ${y} = ${p}. Then ${p} × ${m} = <b>${r}</b>.`,
  pars_s: (a, c, b, r) => `Look for the friendly numbers that make 100: ${a} + ${c} = 100. Add the other number: 100 + ${b} = <b>${r}</b>.`,
  desc_s: (a, n, t, u, p1, p2, r) => `Break apart ${n} = ${t} + ${u}: ${a} × ${t} + ${a} × ${u} = ${p1} + ${p2} = <b>${r}</b>.`,
};
// m4.series
S.SE = {
  sig_q: s => `What number comes next in the pattern <b>${s}, …</b>?`,
  falta_q: s => `What number is missing from the pattern <b>${s}</b>?`,
  regla_q: s => `What is the rule of the pattern <b>${s}, …</b>?`,
  ar_s: (s, d, last, r) => `From ${s[0]} to ${s[1]} the jump is ${Math.abs(d)}; from ${s[1]} to ${s[2]}, ${Math.abs(d)}; from ${s[2]} to ${s[3]}, ${Math.abs(d)}. The rule is to ${d > 0 ? "add" : "subtract"} ${Math.abs(d)}: ${last} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = <b>${r}</b>.`,
  mul_s: (s, m, last, r) => `It does not add the same amount each time. Try multiplying: ${s[0]} × ${m} = ${s[1]}, ${s[1]} × ${m} = ${s[2]}, ${s[2]} × ${m} = ${s[3]}. The rule is to multiply by ${m}: ${last} × ${m} = <b>${r}</b>.`,
  falta_s: (s, j, d) => { const ref = j === 1 ? `from ${s[2]} to ${s[3]}` : `from ${s[j - 2]} to ${s[j - 1]}`; return `${cap(ref)} the jump is ${Math.abs(d)}: the rule is to ${d > 0 ? "add" : "subtract"} ${Math.abs(d)}. ${s[j - 1]} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = <b>${s[j]}</b>. Check: ${s[j]} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${s[j + 1]}.`; },
  rsum: d => `Add ${d}`, rres: d => `Subtract ${d}`, rmul: m => `Multiply by ${m}`,
  rsum_s: (s, d) => `From ${s[0]} to ${s[1]} the jump is ${Math.abs(d)}, and from ${s[1]} to ${s[2]} it is the same: it always goes ${d > 0 ? "up" : "down"} by the same amount. The rule is <b>${d > 0 ? "add" : "subtract"} ${Math.abs(d)}</b>.`,
  rmul_s: (s, m) => `The jump from ${s[0]} to ${s[1]} is not the same as from ${s[1]} to ${s[2]}: it does not add the same amount each time. But ${s[0]} × ${m} = ${s[1]} and ${s[1]} × ${m} = ${s[2]}: the rule is <b>multiply by ${m}</b>.`,
  // [one thing, several, what is counted], first, what each one adds
  crece: [[["table", "tables", "chairs", true, true], 4, 2], [["triangle", "triangles", "toothpicks", false, false], 3, 2], [["square", "squares", "toothpicks", false, false], 4, 3], [["train car", "train cars", "wheels", false, true], 6, 4]],
  crece_q: ([u, v, c], f, s, n) => `With 1 ${u} there are ${f} ${c}, with 2 ${v} there are ${f + s}, and with 3 ${v} there are ${f + 2 * s}. If the pattern continues, how many ${c} will there be with ${n} ${v}?`,
  crece_s: ([u, v, c], f, s, n) => `Each new ${u} adds ${s} ${c}. The first one has ${f}, and the other ${n - 1} (${n} − 1) add ${s} each: ${f} + ${n - 1} × ${s} = ${f} + ${(n - 1) * s} = <b>${f + (n - 1) * s}</b> ${c}.`,
};
// m4.hueco
S.HU = {
  q: e => `What number goes in the box? <b>${e}</b>`,
  s_suma: (c, a, x, comp) => `Subtraction undoes addition: ${c} − ${a} = <b>${x}</b>. Check: ${comp}.`,
  s_ini: (a, b, c) => `I had a number, I took away ${b}, and I have ${a} left: addition undoes subtraction. ${a} + ${b} = <b>${c}</b>. Check: ${c} − ${b} = ${a}.`,
  s_quita: (c, a, x) => `The box is what is taken away! I had ${c} and I have ${a} left: what I took away is the difference from ${a} to ${c}. ${c} − ${a} = <b>${x}</b>. Check: ${c} − ${x} = ${a}.`,
  s_mul: (c, a, x, comp) => `Division undoes multiplication: ${c} ÷ ${a} = <b>${x}</b>. Check: ${comp}.`,
  s_div: (a, b, c) => `I shared a number equally among ${b} people, and each one got ${a}: multiplication undoes division. ${a} × ${b} = <b>${c}</b>. Check: ${c} ÷ ${b} = ${a}.`,
  s_entre: (c, a, x) => `Find how many people can share ${c} so that each one gets ${a}: ${c} ÷ ${a} = <b>${x}</b>. Check: ${c} ÷ ${x} = ${a}.`,
};
// m4.dospasos
S.DP = {
  objs: [["trading cards", false], ["marbles", true], ["stickers", true], ["points", false]],
  comp_q: (N1, a, o, N2, d, mas, fem) => `${N1} has ${a} ${o}, and ${N2} has ${d} ${mas ? "more" : "fewer"} than ${N1}. How many ${o} do they have in all?`,
  comp_s: (N1, N2, a, d, b, t, mas, o, fem) => `First find how many ${N2} has: ${a} ${mas ? "+" : "−"} ${d} = ${b} ${o}.<br>Then add the two: ${a} + ${b} = <b>${t}</b> ${o}.<br>(Careful: ${b} is only how many ${N2} has, not the total.)`,
  rep: [["boxes", "cookies", "friends", true], ["packs", "markers", "tables", false], ["packs", "trading cards", "children", false]],
  rep_q: (c, caja, p, cosa, n, q, fem) => `We buy ${c} ${caja} of ${p} ${cosa} and share them equally among ${n} ${q}. How many ${cosa} does each ${q === "tables" ? "table" : "one"} get?`,
  rep_s: (c, p, t, n, r, cosa, q) => `${cap(cosa)} in all: ${c} × ${p} = ${t}.<br>Each ${q === "tables" ? "table" : "one"}: ${t} ÷ ${n} = <b>${r}</b>.<br>In one expression: ${c} × ${p} ÷ ${n} = ${t} ÷ ${n} = ${r}.`,
};
// m4.fraccomp
S.FC = {
  q: (l, r) => `Choose the sign: <b>${l} ☐ ${r}</b>`,
  eq_s: (a, b, c, d, k, s1, L, Rr, s) => `From ${b} to ${d}, you multiply by ${k}: ${a}/${b} = ${a * k}/${d}. Now the pieces are the same size: ${a * k} ${s1} ${c}. So <b>${L} ${s} ${Rr}</b>.`,
  uni_s: (n, d, rel, L, Rr, s) => `${rel === 1 ? `In ${n}/${d}, the numerator is less than the denominator: it does not make a whole (it is ${d - n === 1 ? "1 piece" : `${d - n} pieces`} short).` : rel === 2 ? `In ${n}/${d}, the numerator and the denominator are equal: it is exactly one whole.` : `In ${n}/${d}, the numerator is greater than the denominator: you need pieces from another whole.`} So <b>${L} ${s} ${Rr}</b>.`,
  medio: h => `${h} and a half pieces`, trozos: h => `${h} pieces`,
  mit1_s: (n, d, h, s1, L, Rr, s) => `Half of ${d} is ${h}: 1/2 = ${h}/${d}. Since ${n} ${s1} ${h}, <b>${L} ${s} ${Rr}</b>.`,
  mit2_s: (x, d1, h1, y, d2, h2, L, Rr, s) => `Compare each one with one-half. Half of ${d1} pieces is ${h1}, and ${x} is less than that, so ${x}/${d1} is less than one-half. Half of ${d2} pieces is ${h2}, and ${y} is more than that, so ${y}/${d2} is more than one-half. That is why <b>${L} ${s} ${Rr}</b>.`,
};
// m4.equivfr
S.EQ = {
  mul_s: (a, b, k) => `From ${b} to ${b * k}, you multiply by ${k}. Do the same to the numerator: ${a} × ${k} = <b>${a * k}</b>. So ${a}/${b} = ${a * k}/${b * k}.`,
  div_s: (a, b, k) => `From ${a * k} to ${a}, you divide by ${k}. Do the same to the denominator: ${b * k} ÷ ${k} = <b>${b}</b>. So ${a * k}/${b * k} = ${a}/${b}.`,
  opt_s: (a, b, k) => `Multiply the numerator and the denominator by the same number, ${k}: ${a} × ${k} = ${a * k} and ${b} × ${k} = ${b * k}. It is <b>${a * k}/${b * k}</b>. (Adding the same number to the top and the bottom does not work.)`,
  son_q: (f, g) => `Are <b>${f}</b> and <b>${g}</b> equivalent?`,
  sino: ["Yes", "No"],
  son_s: (a, b, c, k, yes) => `From ${b} to ${b * k}, you multiply by ${k}. Do the same to the top: ${a} × ${k} = ${a * k}${yes ? `, which is exactly the other numerator: <b>yes</b>, they are equivalent.` : `, but the other numerator is ${c}: <b>no</b>, they are not equivalent.`}`,
};
// m4.sumfr
S.SF = {
  uno_s: (b, d) => `Write one whole as a fraction with the same denominator: 1 = ${d}/${d}. ${d}/${d} − ${b}/${d} = <b>${d - b}/${d}</b> (${d} − ${b} = ${d - b}).`,
  llenos: [["A bottle is full of water", "you drink"], ["A pitcher is full of juice", "you drink"], ["A cake is whole", "you eat"], ["A tank is full of water", "you use"]],
  queda_q: (c, v, b, d) => `${c}, and ${v} ${b}/${d} of it. What fraction is left?`,
  queda_s: (c, b, d) => `At the start, there was ${d}/${d}. What is left is ${d}/${d} − ${b}/${d} = <b>${d - b}/${d}</b>.`,
  obras: [["a fence", "you paint"], ["a mural", "you paint"], ["a puzzle", "you do"], ["a book", "you read"]],
  falta_q: (o, v, a, b, d) => `On Monday ${v} ${a}/${d} of ${o}, and on Tuesday, ${b}/${d}. What fraction of ${o.replace(/^an? /, "the ")} do you still have to ${v.replace(/^you /, "")}?`,
  falta_s: (o, a, b, d) => `So far: ${a}/${d} + ${b}/${d} = ${a + b}/${d}. Finishing means getting to ${d}/${d}: you still need ${d}/${d} − ${a + b}/${d} = <b>${d - a - b}/${d}</b>.`,
};
// m4.fracde
const FRN = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 7: ["seventh", "sevenths"], 8: ["eighth", "eighths"], 9: ["ninth", "ninths"], 10: ["tenth", "tenths"], 11: ["eleventh", "elevenths"], 12: ["twelfth", "twelfths"] };
const frw = (n, d, L) => n === 1 ? `One-${FRN[d][0]}` : `${cap(L.words(n))}-${FRN[d][1]}`;
const amt = (x, u) => u === "$" ? "$" + x : `${x} ${u}`;
S.FN = {
  s: (Nn, n, d, p, r, L, obj) => n === 1 ? `${frw(1, d, L)} of ${Nn}: ${Nn} ÷ ${d} = <b>${p}</b>.` : `${frw(1, d, L)} of ${Nn}: ${Nn} ÷ ${d} = ${p}. ${frw(n, d, L)}: ${p} × ${n} = <b>${r}</b>${obj ? ` ${obj}` : ""}.`,
  med: [["hour", 60, "minutes", [2, 3, 4, 5, 6, 10, 12]], ["kilogram", 1000, "grams", [2, 4, 5, 10]], ["liter", 1000, "milliliters", [2, 4, 5, 10]]],
  med_q: (u, n, d, w) => `How many ${u} are there in <b>${n}/${d} of ${art(w)} ${w}</b>?`,
  med_s: (w, tot, u, n, d, p, r, L) => { const pre = `${cap(art(w))} ${w} is ${tot} ${u}. ${frw(1, d, L)}: ${tot} ÷ ${d} = `; return n === 1 ? `${pre}<b>${p} ${u}</b>.` : `${pre}${p} ${u}. ${frw(n, d, L)}: ${p} × ${n} = <b>${r} ${u}</b>.`; },
  queda: [[(Nn, n, d) => `A book has ${Nn} pages, and you have already read ${n}/${d} of it. How many pages do you have left to read?`, "pages"],
    [(Nn, n, d) => `You have saved $${Nn}, and you spend ${n}/${d} of it on a gift. How many dollars do you have left?`, "$"],
    [(Nn, n, d) => `A hike is ${Nn} km long, and you have already walked ${n}/${d} of the way. How many kilometers do you have left?`, "km"]],
  queda_s: (Nn, n, d, p, r, u, L) => `${frw(1, d, L)}: ${Nn} ÷ ${d} = ${amt(p, u)}. If ${n}/${d} ${u === "$" ? "is spent" : u === "km" ? "is walked" : "is read"}, ${d - n}/${d} is left (${d}/${d} − ${n}/${d} = ${d - n}/${d}): ${p} × ${d - n} = <b>${amt(r, u)}</b>.`,
};
// m4.decleer (shares most of its texts with m4.leerdec)
S.DL = {
  dw_s: (e, c, d, u, x) => `The ${e === 1 ? "ones (1)" : `ones (${e})`} go before the decimal point. ${c === 1 ? "1 hundredth is" : `${c} hundredths are`} ${d === 1 ? "1 tenth" : `${d} tenths`} and ${u === 1 ? "1 hundredth" : `${u} hundredths`}: after the decimal point, first the tenths (${d}) and then the hundredths (${u}). <b>${x}</b>.`,
  igual_s: (a, b, t) => `${a} and ${b} have the same whole-number part and ${pl(t, "tenth", "tenths")}; ${t === 1 ? "1 tenth is" : `${t} tenths are`} ${t}0 hundredths. A zero at the end of the decimal part does not change the number: <b>${a} = ${b}</b>.`,
  ent_s: (a, b, ea, eb, s) => `Compare the whole-number parts first: ${ea} ${s} ${eb}. That's it, you don't need to look any further (even if one has more digits): <b>${a} ${s} ${b}</b>.`,
  dec_s: (e, da, db, a, b, s) => `The whole-number part is the same (${e}). Compare the tenths: ${da[0]} and ${db[0]}.${da[0] !== db[0] ? "" : ` They are equal, so compare the hundredths: ${da[1]} and ${db[1]}.`} So <b>${a} ${s} ${b}</b>. (If it helps, write both with two decimal places.)`,
};
// m4.medirang
S.MA = {
  tr_q: "What is the measure of the red angle? The center of the protractor is on the vertex.",
  tr_s: (th, left) => `One side is on the 0 on the ${left ? "left, the one on the inner scale (in blue)" : "right, the one on the outer scale (in black)"}. Count from that 0: the other side points to <b>${th}°</b>. (The other scale says ${180 - th}, but that one starts at the 0 on the other side.)`,
  rel_q: h => `What angle do the hands make at ${h} o'clock, on the smaller side? (In degrees.)`,
  rel_s: (h, e, r) => `A full turn is 360°, and the clock has 12 numbers: from one number to the next, there are 360 ÷ 12 = 30°. ${h <= 6 ? `From 12 to ${h}` : `On the smaller side, from ${h} to 12,`} there ${e === 1 ? "is 1 space" : `are ${e} spaces`}: ${e} × 30 = <b>${r}°</b>.`,
};
// m4.areacuad
S.AQ = {
  fil_s: (w, h, n) => `It is a rectangle: ${h} rows of ${w} small squares. ${w} × ${h} = <b>${n} cm²</b>.`,
  cnt_s: (n, w, h, c) => `If it were complete, it would have ${w} × ${h} = ${w * h} small squares, but ${c === 1 ? "1 square is" : `${c} squares are`} missing from a corner: ${w * h} − ${c} = <b>${n} cm²</b>. (You can also count them one by one.)`,
  arr_s: (l, w, r) => `${w} rows of ${l} squares with 1 cm sides fit inside: ${l} × ${w} = <b>${r} cm²</b>.`,
  med_q: "What is the area of the figure, in small squares? The yellow triangles are half squares.",
  med_s: (e, m, q, r) => `Count the whole squares (blue): ${e}. The half squares (yellow): ${m}, which make ${m} ÷ 2 = ${q} whole ${q === 1 ? "square" : "squares"}. Area: ${e} + ${q} = <b>${r}</b> small squares.`,
  ap_q: "Each small square has 1 cm sides. What are the area and the perimeter of the blue rectangle?",
  ap_f: ["Area (cm²)", "Perimeter (cm)"],
  ap_s: (l, h, A, P) => `Area (the inside): ${h} rows of ${l} small squares, ${l} × ${h} = <b>${A} cm²</b>.<br>Perimeter (the border): ${l} + ${h} + ${l} + ${h} = <b>${P} cm</b>.`,
};
// m4.simetria
S.SM = {
  // [name, lines of symmetry, drawing, why]
  figs: [["a square", 4, "sq", "folds exactly in half along the vertical middle line, the horizontal one, and the two diagonals"], ["a rectangle that is not a square", 2, "rect", "folds exactly in half along the vertical middle line and the horizontal one, but not along the diagonals"],
    ["an equilateral triangle", 3, "eq", "folds exactly in half along the line from each vertex to the middle of the opposite side"], ["an isosceles triangle", 1, "iso", "only folds exactly in half along the line from the top vertex to the middle of the base"],
    ["a scalene triangle", 0, "esc", "has three different sides, and no fold makes the halves match"], ["a rhombus that is not a square", 2, "rombo", "folds exactly in half along its two diagonals"],
    ["a trapezoid with two equal slanted sides", 1, "trap", "only folds exactly in half along the line through the middle of the two bases"], ["a regular pentagon", 5, "pent", "is a regular polygon, so it has as many lines of symmetry as it has sides"],
    ["a regular hexagon", 6, "hex", "is a regular polygon, so it has as many lines of symmetry as it has sides"], ["the letter H", 2, "H", "folds exactly in half along a vertical line and along a horizontal line"],
    ["the letter A", 1, "A", "only folds exactly in half along a vertical line"], ["the letter E", 1, "E", "only folds exactly in half along a horizontal line"], ["the letter F", 0, "F", "has no fold that makes its two halves match"],
    ["the letter X", 2, "X", "folds exactly in half along a vertical line and along a horizontal line"], ["the letter N", 0, "N", "has no fold that makes its two halves match"]],
  ejes_q: n => `How many lines of symmetry does ${n} have?`,
  ejes_s: (n, e, why) => `${cap(n)} ${why}: ${e ? `<b>${e}</b> ${e === 1 ? "line" : "lines"} of symmetry` : "<b>0</b> lines of symmetry (none)"}.`,
  pun_q: (c, e) => `The line of symmetry (red) is on vertical line ${e}, and the blue dot is on line ${c}. On which vertical line is its reflection?`,
  pun_s: (c, e, d, r, izq) => `The dot is ${d === 1 ? "1 square" : `${d} squares`} from the line of symmetry (from line ${c} to line ${e}). Its reflection is the same distance away, on the other side: ${e} ${izq ? "+" : "−"} ${d} = <b>${r}</b>.`,
  tra_q: (x, y, p, der, q, arr) => `A point is where line ${x} (counting to the right) crosses line ${y} (counting up). You translate it ${p} ${p === 1 ? "square" : "squares"} to the ${der ? "right" : "left"} and ${q} ${arr ? "up" : "down"}. Where does it end up?`,
  tra_f: ["Line (to the right)", "Line (up)"],
  tra_s: (x, y, p, der, q, arr, X, Y) => `To the right: ${x} ${der ? "+" : "−"} ${p} = <b>${X}</b>. Up: ${y} ${arr ? "+" : "−"} ${q} = <b>${Y}</b>. It ends up where line ${X} crosses line ${Y}.`,
};
// m4.recuento
const palotes = f => (`<s>||||</s> `.repeat(Math.floor(f / 5)) + "|".repeat(f % 5)).trim();
S.RC = {
  fr_s: (c, f) => f ? `Make a tally mark for each “${c}”: ${palotes(f)} → ${f > 5 ? `${Math.floor(f / 5) === 1 ? "5" : `${Math.floor(f / 5)} × 5`}${f % 5 ? ` + ${f % 5}` : ""} = ` : ""}<b>${f}</b>.` : `“${c}” does not appear at all: <b>0</b>.`,
  tot_s: (tb0, n) => { const tb = tb0.filter(p => p[1]); return `Make the frequency table: ${tb.map(([c, f]) => `${c} ${f}`).join(", ")}. Add all the frequencies: ${tb.map(p => p[1]).join(" + ")} = <b>${n}</b>.`; },
  moda_s: (tb, c, f) => `Make the frequency table: ${tb.filter(p => p[1]).map(([cc, ff]) => `${cc} ${ff}`).join(", ")}. The one that appears most often is <b>${c}</b> (${f} times): it is the mode.`,
  frutas: ["Apple", "Banana", "Orange", "Strawberry", "Pear", "Grapes"],
  ley: ["Each", v => `= ${v} votes`],
  pic_q: f => `In the picture graph, how many votes does the “${f}” row have? Look at the key.`,
  pic_s: (f, v, w, half, Nv) => `The key says each picture is worth ${v} votes. ${f}: ${w === 1 ? "1 picture" : `${w} pictures`} (${w} × ${v} = ${w * v})${half ? ` and half a picture (half of ${v} = ${v / 2}) → ${w * v} + ${v / 2} = ` : " → "}<b>${Nv}</b> votes.`,
  dib: (n, half) => half ? `${n} and a half pictures` : n === 1 ? "1 picture" : `${n} pictures`,
  con_q: (v, f, Nv) => `In a picture graph, each picture is worth ${v} votes. The “${f}” row has ${Nv} votes. How many pictures do you need to draw?`,
  con_s: (Nv, v, w, half) => half ? `${Nv} ÷ ${v} is ${w} with ${v / 2} left over, which is half a picture (half of ${v}): <b>${w} and a half pictures</b>.` : `${Nv} ÷ ${v} = ${w}: <b>${w === 1 ? "1 picture" : `${w} pictures`}</b>.`,
};
})();
