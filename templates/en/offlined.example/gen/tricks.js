/* Exercise generators of the «Mental maths tricks» course.

   Each generator is a pure function that receives
     R  randomness (R.int(a, b), R.pick(list), R.shuffle(list), R.r())
     S  engine texts (not needed in a community course)
     H  number formatting for the language (H.n(12500) → «12,500», H.dec(2.5) → «2.5»)
     L  the whole language
   and returns an exercise: { q: question (simple HTML), kind, ans, sol: solution }.
   Most used kinds: "int" (whole number), "num" (decimal; tol = tolerance), "frac" ([n, d]),
   "text" (text or list of accepted texts), "choice" (opts: [...], correct: position).

   Not allowed: network, DOM, window (except window.WA), eval, timers… (checked by
   community.py; all the code is reviewed by hand before it is published). */
"use strict";
(function () {
const WA = window.WA;

WA.def("c.offlined.example.by11", (R, S, H) => {
  const a = R.int(1, 9), b = R.int(0, 9), n = 10 * a + b, s = a + b;
  const sol = s < 10
    ? `Split the ${a} and the ${b} and put their sum, ${s}, in the middle: <b>${H.n(n * 11)}</b>.`
    : `${a} + ${b} = ${s}: write the ${s - 10} in the middle and carry 1 to the ${a}: <b>${H.n(n * 11)}</b>.`;
  return { q: `Work it out in your head: ${n} × 11.`, kind: "int", ans: n * 11, sol };
});

WA.def("c.offlined.example.by5", (R, S, H) => {
  const n = 2 * R.int(6, 99);
  return { q: `Work it out in your head: ${H.n(n)} × 5.`, kind: "int", ans: n * 5,
           sol: `Half of ${H.n(n)} is ${H.n(n / 2)}; add a zero: <b>${H.n(n * 5)}</b>.` };
});
})();
