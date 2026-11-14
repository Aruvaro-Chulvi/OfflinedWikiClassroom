/* WikiAula — texts for gen/mat7u8.js (Grade 7 · Unit 8: Lines and Angles), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: numbers with the separators of the language, "a"/"an" before a polygon name or an angle
// ("an octagon", "an 80° angle", "an 18° 30′ angle"), and "1 is" / "2 are"
const N = n => window.WA.H.n(n);
const art = w => /^[aeiou]/i.test(w) ? "an" : "a";
const anA = a => /^8|^1[18](?!\d)/.test(String(a)) ? "an" : "a";
Object.assign(S, {
  an_tipo_q: a => `What type of angle measures <b>${a}</b>?`,
  an_tipos: ["Acute", "Right", "Obtuse", "Straight"],
  an_tipo_s: [
    "It measures less than 90°: it is an <b>acute</b> angle.",
    "It measures exactly 90°: it is a <b>right</b> angle.",
    "It measures more than 90° and less than 180°: it is an <b>obtuse</b> angle.",
    "It measures exactly 180°: it is a <b>straight</b> angle.",
  ],
  an_comp_q: (a, c) => `What is the measure of the ${c ? "complement" : "supplement"} of ${/^8/.test(String(a)) || a === 11 || a === 18 ? "an" : "a"} <b>${a}°</b> angle? (in degrees)`,
  an_comp_s: (a, c, r) => `${c ? "Two complementary angles add up to 90°" : "Two supplementary angles add up to 180°"}: ${c ? 90 : 180}° − ${a}° = <b>${r}°</b>.`,
  an_par_q: "The horizontal lines are parallel. What is the measure of the angle marked “?”, in degrees?",
  an_par_s_eq: (a) => `The two angles are in the same position with respect to the parallel lines (corresponding, alternate, or vertical angles): they are equal, <b>${a}°</b>.`,
  an_par_s_sup: (a, r) => `The two angles are supplementary: one of them is equal to the angle next to the other, and two angles next to each other on a line add up to 180°. 180° − ${a}° = <b>${r}°</b>.`,
  // Solution with the name of the pair (lesson "Angles"): rel = opuestos, adyacentes, correspondientes, alt_int, alt_ext, distintos
  an_par_s: (rel, a, r) => ({
    opuestos: `They are at the same intersection, across from each other: they are <b>vertical angles</b>, and they have the same measure, <b>${r}°</b>.`,
    adyacentes: `They are at the same intersection, side by side (a <b>linear pair</b>): together they form a straight line and add up to 180°. 180° − ${a}° = <b>${r}°</b>.`,
    correspondientes: `They are in the same position at each intersection: they are <b>corresponding angles</b>, and they have the same measure, <b>${r}°</b>.`,
    alt_int: `They are between the parallel lines and on opposite sides of the transversal (they form a “Z”): they are <b>alternate interior angles</b>, and they have the same measure, <b>${r}°</b>.`,
    alt_ext: `They are outside the parallel lines and on opposite sides of the transversal: they are <b>alternate exterior angles</b>, and they have the same measure, <b>${r}°</b>.`,
    distintos: `At each intersection, there are only two measures, an acute one and an obtuse one, and they add up to 180°. The ${a}° angle is ${a < 90 ? "acute" : "obtuse"}, and the marked angle is ${a < 90 ? "obtuse" : "acute"}: 180° − ${a}° = <b>${r}°</b>.`,
  })[rel],
  an_sx_q: e => `Compute: <b>${e}</b>`,
  an_sx_f: ["Degrees (°)", "Minutes (′)", "Seconds (″)"],
  // One carry: 76″ = 1′ 16″ → carry the 1′: 63′ + 1′ = 64′
  an_sx_carry: (exc, conv, q, sum) => `${exc} = ${conv} → carry the ${q}: ${sum}.`,
  an_sx_sum_s: (raw, steps, r) => `Add each unit separately: ${raw}.` + (steps.length ? "<br>" + steps.join("<br>") : " No column reaches 60.") + `<br>Result: <b>${r}</b>.`,
  // Regrouping: you can't take 40″ from 15″ → take 1′ = 60″
  an_sx_borrow: (u, b, a, pide, res) => `You can't take ${b} from ${a}, so regroup: take ${pide} from the column on the left → ${res}.`,
  an_sx_res_s: (prep, op, r) => (prep.length ? prep.join("<br>") + "<br>" : "You can subtract each column without regrouping.<br>") + `Subtract each unit separately: ${op} = <b>${r}</b>.`,
  // Division (Example 6): degrees, and what is left over becomes minutes (and seconds)
  an_sx_div_g: (D, n, d, r) => `Degrees: ${D} ÷ ${n} = ${d}°` + (r ? `, remainder ${r}° = ${60 * r}′.` : ", with no remainder."),
  an_sx_div_m: (r1, M, mt, n, m, r2) => `Minutes: ${r1 ? `${60 * r1}′ + ${M}′ = ${mt}′, and ` : ""}${mt}′ ÷ ${n} = ${m}′`
    + (r2 < 0 ? "." : r2 ? `, remainder ${r2}′ = ${60 * r2}″.` : ", with no remainder."),
  an_sx_div_s: (r2, sg, st, n, s) => `Seconds: ${r2 ? `${60 * r2}″ + ${sg}″ = ${st}″, and ` : ""}${st}″ ÷ ${n} = ${s}″.`,
  an_sx_res: "Result",
  an_sx_mul_s: (raw, steps, r) => `Multiply each unit separately: ${raw}.` + (steps.length ? "<br>" + steps.join("<br>") : " No column reaches 60.") + `<br>Result: <b>${r}</b>.`,
  an_sx_conv_q: a => `Write <b>${a}°</b> in degrees, minutes, and seconds.`,
  an_sx_conv_s: (d, fr, mins, m, rest, s, r) => `Degrees: the whole-number part, ${d}°.<br>Minutes: ${fr} · 60 = ${mins}′.`
    + (rest ? `<br>Keep the ${m}′; ${rest}′ is left over. Seconds: ${rest} · 60 = ${s}″.` : "") + `<br>Result: <b>${r}</b>.`,
  an_sx_seg_q: a => `How many seconds are in <b>${a}</b>?`,
  an_sx_seg_s: (d, ds, m, ms, s, r) => `${d}° = ${d} · ${N(3600)} = ${ds}″; ${m}′ = ${m} · 60 = ${ms}″; and ${s}″. Total: ${ds} + ${ms} + ${s} = <b>${r}″</b>.`,
  an_tri_q: (a, b) => `Two angles of a triangle measure <b>${a}°</b> and <b>${b}°</b>. What is the measure of the third angle, in degrees?`,
  an_tri_s: (a, b, r) => `The angles of a triangle add up to 180°: 180° − ${a}° − ${b}° = <b>${r}°</b>.`,
  an_cua_q: (a, b, c) => `Three angles of a quadrilateral measure ${a}°, ${b}°, and ${c}°. What is the measure of the fourth angle, in degrees?`,
  an_cua_s: (a, b, c, r) => `The angles of a quadrilateral add up to 360°: 360° − ${a}° − ${b}° − ${c}° = <b>${r}°</b>.`,
  an_pol_q: (n, name) => `What is the sum of the interior angles of ${art(name)} ${name} (${n} sides), in degrees?`,
  an_pol_s: (n, r) => `From one vertex, you can divide a polygon with n sides into n − 2 triangles: 180° · (${n} − 2) = <b>${N(r)}°</b>.`,
  an_reg_q: (n, name) => `What is the measure of each interior angle of a regular ${name} (${n} sides), in degrees?`,
  an_reg_s: (n, sum, r) => `Sum of the angles: 180° · (${n} − 2) = ${N(sum)}°. Since they are all equal: ${N(sum)}° ÷ ${n} = <b>${r}°</b>.`,
  an_pols: { 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon", 12: "dodecagon", 4: "quadrilateral", 3: "triangle" },
  an_med_q: (d, l) => `Point P is on the perpendicular bisector of segment AB, and its distance from A is ${d} cm. How far is it from B, in cm?`,
  an_med_s: d => `Every point on the perpendicular bisector is the same distance from both endpoints of the segment: PB = PA = <b>${d}</b> cm.`,
  an_med2_q: l => `Segment AB is ${l} cm long. Its perpendicular bisector crosses it at point M. How long is AM, in cm?`,
  an_med2_s: (l, r) => `The perpendicular bisector passes through the midpoint: AM = ${l} ÷ 2 = <b>${r}</b> cm.`,
  // m7.an.medbis
  mb_bis_q: a => `The angle bisector of ${anA(a)} <b>${a}</b> angle divides it into two equal angles. What is the measure of each one, in degrees and minutes?`,
  mb_bis_s: (a, D, d, r, M, mt, m, res) => `The angle bisector cuts the angle in half: ${a} ÷ 2.<br>Degrees: ${D} ÷ 2 = ${d}°`
    + (r ? `, remainder 1° = 60′.<br>Minutes: 60′${M ? ` + ${M}′ = ${mt}′` : ""}, and ${mt}′ ÷ 2 = ${m}′.` : `, with no remainder.<br>Minutes: ${M}′ ÷ 2 = ${m}′.`)
    + `<br>Each angle measures <b>${res}</b>.`,
  mb_inv_q: h => `The angle bisector of an angle forms ${anA(h)} <b>${h}</b> angle with one of its sides. What is the measure of the whole angle, in degrees and minutes?`,
  mb_inv_s: (h, raw, carry, res) => `The angle bisector splits the angle into two equal halves, so the angle is twice as big: ${h} · 2 = ${raw}.`
    + (carry ? "<br>" + carry : "") + `<br>The angle measures <b>${res}</b>.`,
  mb_ec_q: (c, b, v) => `Point P is on the perpendicular bisector of segment AB. The distance PA is (${c}x + ${b}) cm, and the distance PB is ${v} cm. What is the value of x?`,
  mb_ec_s: (c, b, v, d, x) => `The points on the perpendicular bisector are the same distance from A and from B: PA = PB.<br>${c}x + ${b} = ${v} → ${c}x = ${v} − ${b} = ${d} → x = ${d} ÷ ${c} = <b>${x}</b>.<br>Check: ${c} · ${x} + ${b} = ${v} cm ✓`,
  mb_ec2_q: (b, AB) => `Segment AB is ${AB} cm long, and its perpendicular bisector crosses it at M. If AM is (x + ${b}) cm, what is the value of x?`,
  mb_ec2_s: (b, AB, v, x) => `The perpendicular bisector passes through the midpoint: AM = ${AB} ÷ 2 = ${v} cm.<br>x + ${b} = ${v} → x = ${v} − ${b} = <b>${x}</b>.`,
  // m7.geo.rectas
  gr_seg_q: (n, recta) => recta
    ? `There are ${n} points on a plane, and no three of them are on the same line. How many different lines pass through two of these points?`
    : `You mark <b>${n} points</b> on a line. How many different line segments have two of these points as endpoints?`,
  gr_seg_s: (n, recta, sum, r) => `From the first point, you can draw ${n - 1} ${recta ? "lines" : "segments"} (one to each of the other points). From the second point, ${n - 2} new ones (the one that joins it to the first point is already counted), and so on up to the next-to-last point, which adds only one.<br>Total: ${sum} = <b>${r}</b>.`,
  gr_fig_q: t => `Which figure ${t}?`,
  gr_figs: ["Line", "Ray", "Line segment"],
  // [description, index of the answer, why]
  gr_fig: [
    ["has a starting point but no end", 1, "It has a beginning (its endpoint) but no end"],
    ["has two endpoints", 2, "It is bounded by two points, its endpoints"],
    ["has no beginning and no end", 0, "It goes on forever in both directions"],
    ["has a length that you can measure with a ruler", 2, "Only a figure with two endpoints has a length you can measure (the other two never end)"],
    ["is most like the beam of light from a flashlight", 1, "The light starts at the flashlight (the endpoint) and goes on forever"],
    ["is most like the edge of a table", 2, "The edge starts and ends (it has two endpoints)"],
    ["lies on each side of a point that you mark on a line", 1, "A point splits the line into two pieces that start at the point and never end"],
    ["lies between two points that you mark on a line", 2, "The piece between two points has those two points as its endpoints"],
    ["is drawn with arrows on both ends to show that it keeps going", 0, "The arrows on both ends mean that it has no beginning and no end"],
  ],
  gr_fig_s: (why, r) => `${why}, so it is a <b>${r.toLowerCase()}</b>.`,
  gr_poss: ["Parallel", "Perpendicular", "Intersecting, but not perpendicular"],
  gr_pos_q: (r, s, t, p1, p2) => `In a plane, ${r}, ${s}, and ${t} are lines, with ${r} ${p1 ? "∥" : "⊥"} ${s} and ${s} ${p2 ? "∥" : "⊥"} ${t} (∥: parallel; ⊥: perpendicular). How are lines ${r} and ${t} related?`,
  gr_pos_s: (r, s, t, p1, p2, par) => p1 && p2
    ? `Lines ${r} and ${t} are both parallel to line ${s}: they go in the same direction as ${s}, so they never meet. They are <b>parallel</b>.`
    : !p1 && !p2
    ? `Lines ${r} and ${t} are both perpendicular to line ${s}, like the rungs of a ladder and one of its side rails: they are <b>parallel</b>.`
    : `Line ${p1 ? r : t} goes in the same direction as line ${s}, and line ${p1 ? t : r} crosses ${s} at right angles, so it crosses line ${p1 ? r : t} the same way. They are <b>perpendicular</b>.`,
  an_bis_q: a => `The angle bisector of ${anA(a)} ${a}° angle divides it into two equal angles. What is the measure of each one, in degrees?`,
  an_bis_s: (a, r, sx) => `The angle bisector cuts the angle in half: ${a}° ÷ 2 = <b>${r}°</b>${sx ? ` (in degrees and minutes, ${sx}, because 0.5° = 30′)` : ""}.`,
  an_reloj_q: (h, m) => `What angle do the hands of a clock form at <b>${h}:${m}</b>? (the smaller of the two angles, in degrees)`,
  // Position of each hand measured from the 12; if the difference is more than 180°, the smaller angle is 360° minus it
  an_reloj_s: (h, m, ah, am, big, small, diff, over, r, sx) => `Minute hand: ${m} · 6° = ${am}°. `
    + `Hour hand: ${h % 12 ? h + " · 30°" : "0° (at the 12)"} + ${m} · 0.5° = ${ah}° (it moves 0.5° every minute). `
    + `Difference: ${big}° − ${small}° = ${diff}°. `
    + (over ? `That is more than 180°, so the smaller angle is 360° − ${diff}° = <b>${r}°</b>` : `This is the smaller angle: <b>${r}°</b>`)
    + (sx ? ` (that is, ${sx}).` : "."),
});
})();
