/* WikiAula — texts for gen/mat7u9.js (Grade 7 · Unit 9: Polygons and Triangles), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helpers: "a"/"an" in front of a word, capital letter, and a list with the serial comma ("a, b, and c")
const art = w => /^(?:[aeiou]|8|11[^0-9]|18)/i.test(w) ? "an" : "a";
const cap = s => s[0].toUpperCase() + s.slice(1);
const andList = l => l.length < 3 ? l.join(" and ") : l.slice(0, -1).join(", ") + ", and " + l[l.length - 1];
Object.assign(S, {
  po_names: { 3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon", 11: "hendecagon", 12: "dodecagon" },
  po_diag_q: (n, name) => `How many diagonals does ${art(name)} ${name} (${n} sides) have?`,
  po_diag_s: (n, r) => `You can draw n − 3 diagonals from each vertex, but that way each diagonal gets counted twice: ${n} · (${n} − 3) ÷ 2 = <b>${r}</b>.`,
  po_lados_q: name => `How many sides does ${art(name)} <b>${name}</b> have?`,
  po_lados_s: (name, n) => `${cap(art(name))} ${name} has <b>${n}</b> sides (and ${n} vertices and ${n} angles).`,
  tr_lados_q: (a, b, c) => `A triangle has sides of ${a} cm, ${b} cm, and ${c} cm. How do you classify it by its sides?`,
  tr_lados: ["Equilateral", "Isosceles", "Scalene"],
  tr_lados_s: ["All three sides are equal: it is an <b>equilateral</b> triangle.", "Two of its sides are equal: it is an <b>isosceles</b> triangle.", "All three sides are different: it is a <b>scalene</b> triangle."],
  tr_ang_q: (a, b, c) => `A triangle has angles of ${a}°, ${b}°, and ${c}°. How do you classify it by its angles?`,
  tr_ang: ["Acute", "Right", "Obtuse"],
  tr_ang_s: ["All three angles are acute: it is an <b>acute</b> triangle.", "It has a right angle (90°): it is a <b>right</b> triangle.", "It has an obtuse angle (more than 90°): it is an <b>obtuse</b> triangle."],
  tr_des_q: (a, b, c) => `Can you make a triangle with segments of ${a} cm, ${b} cm, and ${c} cm?`,
  tr_des_s: (big, sum, ok) => `By the Triangle Inequality Theorem, each side has to be shorter than the sum of the other two. The longest side is ${big}, and the other two add up to ${sum}: ${ok ? "<b>yes</b>, you can." : "<b>no</b>, you can't (the triangle would not close)."}`,
  tr_not: [
    ["Which point is the center of the circle that passes through the three vertices of a triangle?", 0],
    ["Where do the three perpendicular bisectors of a triangle meet?", 0],
    ["Which point is the center of the inscribed circle (the circle that touches all three sides)?", 1],
    ["Where do the three angle bisectors of a triangle meet?", 1],
    ["Where do the three medians of a triangle meet?", 2],
    ["Which point is the center of gravity (the balance point) of a triangle?", 2],
    ["Where do the three altitudes of a triangle meet?", 3],
  ],
  tr_not_opts: ["Circumcenter", "Incenter", "Centroid", "Orthocenter"],
  tr_not2: {
    // situations from the lesson: 0 circumcenter, 1 incenter, 2 centroid
    sit_q: [
      R => `You want to put ${R.pick(["a well", "an antenna", "a water tank", "a streetlight", "a health clinic"])} the same distance from three ${R.pick(["towns", "houses", "park benches", "schools"])} that are not in a straight line. Which point of the triangle they form do you need to find?`,
      R => `You want to put ${R.pick(["a round fountain", "a sprinkler that waters a circle", "a round table", "a round flower bed"])}, as big as possible, touching all three sides of ${R.pick(["a garden", "a plaza", "a patio", "a plot of land"])} shaped like a triangle. Where does its center go?`,
      R => `Where do you need to ${R.pick(["push the stick through a spinning top", "rest a cardboard plate on the tip of a pencil", "tie a thread to hang a sign"])} shaped like a triangle so that it balances?`,
    ],
    sit_s: [
      "A point that is the same distance from three points (the vertices) lies on all three perpendicular bisectors: it is the <b>circumcenter</b>. You only need to draw two perpendicular bisectors and find where they cross.",
      "The largest circle that touches all three sides is the inscribed circle, and its center is the same distance from the three sides, so it lies on the angle bisectors. It is the <b>incenter</b>.",
      "The balance point of a triangle is its center of gravity, where the medians meet: the <b>centroid</b>.",
    ],
    rectas: ["The perpendicular bisectors", "The angle bisectors", "The medians", "The altitudes"],
    rectas_q: p => `Which lines of the triangle do you need to draw to find the <b>${p.toLowerCase()}</b>?`,
    tipos: ["acute", "right", "obtuse"],
    donde: ["Inside the triangle", "Exactly on a side or at a vertex", "Outside the triangle"],
    donde_q: (t, p) => `In ${art(t)} <b>${t} triangle</b>, where is the <b>${p}</b>?`,
    donde_s: (t, p) => p === 1 || p === 2
      ? `The ${p === 1 ? "incenter" : "centroid"} is <b>always inside</b> the triangle, whatever its shape.`
      : t === 0 ? `In an acute triangle, all four points of concurrency are <b>inside</b>.`
      : t === 1 ? (p === 0 ? "In a right triangle, the circumcenter is <b>exactly on a side</b>: at the midpoint of the hypotenuse." : "In a right triangle, the two legs are altitudes, and they meet at the vertex of the right angle: the orthocenter is <b>at a vertex</b>.")
      : (p === 0 ? "In an obtuse triangle, the circumcenter is <b>outside</b>, beyond the longest side." : "In an obtuse triangle, two altitudes fall on the extensions of the sides, and they meet <b>outside</b> the triangle."),
    hip_q: h => `The hypotenuse of a right triangle is ${h} cm long. What is the radius of its circumscribed circle, in cm?`,
    hip_s: (h, r) => `In a right triangle, the circumcenter is at the midpoint of the hypotenuse, and the circle passes through both ends of the hypotenuse, so the radius is half the hypotenuse: ${h} ÷ 2 = <b>${r}</b> cm.`,
    bar_q: m => `A median of a triangle is ${m} cm long. What is the distance from the vertex to the centroid, in cm?`,
    bar_s: (m, p, r) => `The centroid splits the median into two pieces, and the piece that goes to the vertex is twice as long as the other one. So the median has 3 equal parts: ${m} ÷ 3 = ${p} cm each. From the vertex to the centroid there are 2 parts: 2 · ${p} = <b>${r}</b> cm.`,
  },
  tr_not_s: [
    "The perpendicular bisectors meet at the <b>circumcenter</b>, which is the same distance from the three vertices.",
    "The angle bisectors meet at the <b>incenter</b>, which is the same distance from the three sides.",
    "The medians meet at the <b>centroid</b>, the center of gravity of the triangle.",
    "The altitudes meet at the <b>orthocenter</b>, which is outside the triangle if the triangle is obtuse.",
  ],
  // [properties, names that apply (indexes of cu_opts), reasoning with the rule from the lesson]
  cu_props: [
    ["Its four sides are equal, and its four angles are right angles.", [0, 1, 2], "Two pairs of parallel sides → parallelogram. Four right angles → it is a rectangle. Four equal sides → it is a rhombus. Both at once → it is a square"],
    ["Its opposite sides are equal and parallel, and its four angles are right angles, but its sides are not all equal.", [1], "Two pairs of parallel sides → parallelogram. Four right angles → rectangle. Its four sides are not all equal, so it is not a square or a rhombus"],
    ["Its four sides are equal, but its angles are not right angles.", [2], "Four equal sides → rhombus. It has no right angles, so it is not a square or a rectangle"],
    ["Its opposite sides are parallel and equal, but its angles are not right angles and its four sides are not all equal.", [3], "Two pairs of parallel sides → parallelogram. No right angles, and the four sides are not all equal → rhomboid"],
    ["It has only one pair of parallel sides.", [4], "Only one pair of parallel sides → trapezoid"],
    ["It has no pairs of parallel sides.", [5], "No pairs of parallel sides → quadrilateral with no parallel sides"],
  ],
  cu_q: p => `Which names describe this quadrilateral? Select all that apply.<br><i>${p}</i>`,
  cu_opts: ["Square", "Rectangle", "Rhombus", "Rhomboid", "Trapezoid", "Quadrilateral with no parallel sides"],
  cu_s: (why, names) => `${why}. ${names.length > 1 ? `It is ${andList(names.map(n => `${art(n)} <b>${n}</b>`))} (the most precise name is “${names[0]}”).` : `It is ${art(names[0])} <b>${names[0]}</b>.`}`,
  cu_ang_q: a => `One angle of a parallelogram measures <b>${a}°</b>. What is the measure of a consecutive angle (the one next to it), in degrees?`,
  cu_ang_s: (a, r) => `In a parallelogram, consecutive angles are supplementary: 180° − ${a}° = <b>${r}°</b> (and opposite angles are equal).`,
  ci_rd_q: (r, toD) => toD ? `A circle has a radius of ${r} cm. What is its diameter, in cm?` : `A circle has a diameter of ${r} cm. What is its radius, in cm?`,
  ci_rd_s: (v, r, toD) => toD ? `The diameter is twice the radius: 2 · ${v} = <b>${r}</b> cm.` : `The radius is half the diameter: ${v} ÷ 2 = <b>${r}</b> cm.`,
  ci_pos_q: (r, d) => `A circle has a radius of ${r} cm. A point is ${d} cm from the center. Where is the point?`,
  ci_pos: ["Inside the circle", "On the circle", "Outside the circle"],
  ci_pos_s: (r, d, k) => `Compare the distance to the center (${d}) with the radius (${r}): ${["it is less, so the point is <b>inside</b>", "it is equal, so the point is <b>on the circle</b>", "it is greater, so the point is <b>outside</b>"][k]}.`,
  ci_rec_q: (r, d) => `A line is ${d} cm from the center of a circle with a radius of ${r} cm. What is the position of the line relative to the circle?`,
  ci_rec: ["Secant (it cuts the circle at two points)", "Tangent (it touches the circle at one point)", "Outside the circle (it does not touch it)"],
  ci_rec_s: (r, d, k) => `If the distance is less than the radius, the line is secant; if it is equal, the line is tangent; if it is greater, the line is outside the circle. Here: <b>${["secant", "tangent", "outside the circle"][k]}</b>.`,
});
})();
