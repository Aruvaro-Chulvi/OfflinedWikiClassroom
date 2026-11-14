/* WikiAula — texts for gen/mat9.js (Mathematics, Grade 9), in English (US).
   PARTIAL (2026-11-14, Grade 8): only the texts of m9.mov.traslacion, m9.mov.giro and m9.mov.simetria,
   which the Grade 8 lessons use. The rest is added when Grade 9 is translated. */
"use strict";
(function () {
const G = window.WA.I18N.en.gen;
const S = G.m9 = G.m9 || {};
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const P_ = s => String(s).startsWith("−") ? `(${s})` : String(s);   // negatives in parentheses
Object.assign(S, {
  // m9.mov.traslacion
  tr_q: (P, v) => `Translate the point P${P} by the vector v = ${v}. What are the coordinates of the image P′?`,
  tr_s: (P, v, r, x, y, u, w) => `Add the coordinates of the vector to the coordinates of the point: P′ = (${x} + ${P_(u)}, ${y} + ${P_(w)}) = <b>${r}</b>.`,
  tr2_q: (P, Q) => `A translation maps the point P${P} to the point P′${Q}. What is the translation vector?`,
  tr2_s: (v, x, y, x2, y2) => `v = P′ − P = (${x2} − ${P_(x)}, ${y2} − ${P_(y)}) = <b>${v}</b>.`,
  // m9.mov.giro
  gi_q: (P, g) => `Rotate the point P${P} by ${neg(g)}° about the origin (${g > 0 ? "counterclockwise" : "clockwise"}). Where does it end up?`,
  gi_s: (g, r, x, y) => {
    const m = v => v.startsWith("−") ? `−(${v})` : `−${v}`;   // opposite, written with the substitution: −(−4)
    const sub = g === 90 ? `(${m(y)}, ${x})` : g === 180 ? `(${m(x)}, ${m(y)})` : `(${y}, ${m(x)})`;
    return `${g === 90 ? "A 90° rotation: (x, y) → (−y, x)" : g === 180 ? "A 180° rotation: (x, y) → (−x, −y)" : "A −90° (or 270°) rotation: (x, y) → (y, −x)"}. With x = ${x} and y = ${y}: P′ = ${sub === r ? "" : sub + " = "}<b>${r}</b>.`;
  },
  // m9.mov.simetria
  si_q: (P, t) => `Find the reflection of the point P${P} ${t}.`,
  si_t: ["across the x-axis", "across the y-axis", "through the origin"],
  si_s: [
    r => `In a reflection across the x-axis, the y-coordinate changes sign: P′ = <b>${r}</b>.`,
    r => `In a reflection across the y-axis, the x-coordinate changes sign: P′ = <b>${r}</b>.`,
    r => `In a reflection through the origin, both coordinates change sign: P′ = <b>${r}</b>.`,
  ],
});
})();
