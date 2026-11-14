/* WikiAula — texts for gen/mat7u10.js (Grade 7 · Unit 10: Perimeter and Area), in US English. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m7 = G.m7 || {};
// Helper: whole numbers with the separators of the language
const N = n => window.WA.H.n(n);
Object.assign(S, {
  ar_per_q: f => `Find the perimeter of ${f} (in cm).`,
  ar_area_q: f => `Find the area of ${f} (in cm²).`,
  ar_fig: { rect: "this rectangle", cuad: "this square", tri: "this triangle", para: "this parallelogram", rombo: "this rhombus", trap: "this trapezoid", hex: "this regular hexagon", pent: "this regular pentagon", comp: "this shape" },
  ar_per_s: (sum, r) => `The perimeter is the sum of all the sides: ${sum} = <b>${r}</b> cm.`,
  ar_rect_s: (b, h, r) => `Area of a rectangle = base · height = ${b} · ${h} = <b>${r}</b> cm².`,
  ar_cuad_s: (l, r) => `Area of a square = side² = ${l}² = <b>${r}</b> cm².`,
  ar_tri_s: (b, h, r) => `Area of a triangle = base · height ÷ 2 = ${b} · ${h} ÷ 2 = <b>${r}</b> cm².`,
  ar_para_s: (b, h, r) => `Area of a parallelogram = base · height = ${b} · ${h} = <b>${r}</b> cm². (Use the height, not the slanted side!)`,
  ar_rombo_s: (D, d, r) => `Area of a rhombus = longer diagonal · shorter diagonal ÷ 2 = ${D} · ${d} ÷ 2 = <b>${r}</b> cm².`,
  ar_trap_s: (B, b, h, r) => `Area of a trapezoid = (longer base + shorter base) · height ÷ 2 = (${B} + ${b}) · ${h} ÷ 2 = <b>${r}</b> cm².`,
  ar_reg_s: (n, l, a, p, r) => `Perimeter = ${n} · ${l} = ${p}. Area of a regular polygon = perimeter · apothem ÷ 2 = ${p} · ${a} ÷ 2 = <b>${r}</b> cm².`,
  // L-shaped figure: rectangle on the left (top width × total height) and on the right (its width comes from subtracting)
  ar_comp_s: (W, Hh, top, right, w, h, A1, A2, r) => `Split the shape into two rectangles with a vertical line.<br>`
    + `Left: ${top} cm wide and ${Hh} cm tall: ${top} · ${Hh} = ${N(A1)} cm².<br>`
    + `Right: ${right} cm tall. Its width is not shown in the drawing, so find it by subtracting: ${W} − ${top} = ${w} cm. Area: ${w} · ${right} = ${N(A2)} cm².<br>`
    + `Total: ${N(A1)} + ${N(A2)} = <b>${N(r)}</b> cm². (Check: ${W} · ${Hh} − ${w} · ${h} = ${N(W * Hh)} − ${N(w * h)} = ${N(r)} ✓)`,
  ar_lado_q: (A) => `A square has an area of ${N(A)} cm². What is the length of its side, in cm?`,
  ar_lado_s: (A, l) => `The side length is the square root of the area: √${N(A)} = <b>${l}</b> cm, because ${l} · ${l} = ${N(A)}.`,
  ar_lado_t: (A, l, d) => `The side length is the square root of the area, √${N(A)}. Start by trying tens: `
    + (l === d ? `${d}² = ${N(A)} ✓.` : `${d}² = ${N(d * d)} is too small and ${d + 10}² = ${N((d + 10) * (d + 10))} is too big, so the side is between ${d} and ${d + 10}. Try the numbers in between: ${l} · ${l} = ${N(A)} ✓.`)
    + ` The side is <b>${l}</b> cm long.`,
  ar_alt_q: (A, b) => `A triangle has an area of ${A} cm² and a base of ${b} cm. What is its height, in cm?`,
  ar_alt_s: (A, b, r) => `Area = b · h ÷ 2 → h = 2 · area ÷ base = 2 · ${A} ÷ ${b} = <b>${r}</b> cm.`,
  ci_hint: "Use π ≈ 3.14 or the π key. Round to the nearest hundredth.",
  ci_long_q: (v, isD) => `Find the circumference of a circle with a ${isD ? "diameter" : "radius"} of ${v} cm (in cm).`,
  ci_ans: (a314, api) => `${a314} (with π ≈ 3.14) · ${api} (with the π key)`,
  ci_long_s: (v, isD, res, r314) => (isD ? `With the diameter: C = π · d. With π ≈ 3.14: C = 3.14 · ${v} = <b>${r314}</b> cm.` : `With the radius: C = 2 · π · r. With π ≈ 3.14: C = 2 · 3.14 · ${v} = <b>${r314}</b> cm.`)
    + ` (With the π key on a calculator, you get ${res} cm. Both answers are correct.)`,
  ci_area_q: (v, isD) => `Find the area of a circle with a ${isD ? "diameter" : "radius"} of ${v} cm (in cm²).`,
  ci_area_s: (r, res, r314) => `A = π · r². With π ≈ 3.14: A = 3.14 · ${r}² = <b>${r314}</b> cm². (With the π key on a calculator, you get ${res} cm². Both answers are correct.)`,
  ci_rdesde_q: L => `A circle has a circumference of ${L} cm. What is its radius (in cm)?`,
  ci_rdesde_s: (L, r) => `C = 2 · π · r, so the radius is the circumference divided by 2 · π. With π ≈ 3.14: 2 · 3.14 = 6.28, and r = ${L} ÷ 6.28 = <b>${r}</b> cm. Check: 6.28 · ${r} = ${L} ✓`,
  ci_corona_q: (R, r) => `Find the area of an annulus (a ring) with radii of ${R} cm and ${r} cm (in cm²).`,
  ci_corona_s: (R, r, g, p, c, res) => `The annulus is the large disk minus the small one. With π ≈ 3.14: large disk, 3.14 · ${R}² = 3.14 · ${N(R * R)} = ${g} cm²; small disk, 3.14 · ${r}² = 3.14 · ${N(r * r)} = ${p} cm². Annulus: ${g} − ${p} = <b>${c}</b> cm². (With the π key, you get ${res}. Both answers are correct.)`,
  ci_sector_q: (r, a) => `Find the area of a sector with a radius of ${r} cm and a central angle of ${a}° (in cm²).`,
  ci_sector_s: (r, a, C0, p, q, s, aprox, res) => `Whole disk, with π ≈ 3.14: 3.14 · ${r}² = 3.14 · ${N(r * r)} = ${C0} cm². `
    + `The sector is ${a}/360 of the disk, which simplifies to ${p === 1 ? `1/${q}` : `${p}/${q}`}: `
    + (p === 1 ? `${C0} ÷ ${q}` : `${C0} · ${p} ÷ ${q}`) + ` ${aprox ? "≈" : "="} <b>${s}</b> cm². (With the π key, you get ${res}. Both answers are correct.)`,
  // Land-area units: 1 ha = 1 hm² = 10,000 m²; 1 a = 1 dam² = 100 m²; 1 ha = 100 a
  un_agr_s: (a, b, k, mult, v, r) => ({ "ha|m²": "1 ha = 1 hm² = 10,000 m²", "a|m²": "1 a = 1 dam² = 100 m²", "ha|a": "1 ha = 100 a", "m²|ha": "1 ha = 1 hm² = 10,000 m²" })[a + "|" + b]
    + `. ` + (mult ? `Multiply: ${v} · ${k}` : `Divide: ${v} ÷ ${k}`) + ` = <b>${r} ${b}</b>.`,
  un_q: (v, a, b) => `Convert <b>${v} ${a}</b> to ${b === "a" ? "ares (a)" : b}.`,
  // Unit staircase: each step, times 100 or divided by 100 (the decimal point moves two places)
  un_s: (a, b, p, baja, k, v, r) => `From ${a} to ${b}, you go ${baja ? "down" : "up"} ${p === 1 ? "1 step" : `${p} steps`}: `
    + (baja ? `multiply by ${p === 1 ? "100" : "100 · 100 = " + k}, so the decimal point moves ${2 * p} places to the right` : `divide by ${p === 1 ? "100" : "100 · 100 = " + k}, so the decimal point moves ${2 * p} places to the left`)
    + `: ${v} → <b>${r} ${b}</b>.`,
});
})();
