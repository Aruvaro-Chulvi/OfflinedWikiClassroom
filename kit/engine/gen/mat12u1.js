/* WikiAula — Matemáticas, Grado 12 · Unidades 1–3: Matrices, Determinantes y Sistemas.
   Textos: i18n/<lang>/mat12u1.js (S.m12). Las matrices se escriben en LaTeX
   ($…$): el motor las dibuja con KaTeX. */
"use strict";
(function () {
const WA = window.WA;
const def = WA.def;
const { rnz, F, gcd } = WA.MATH;

// ── Utilidades de matrices (enteros) ──
const SUBI = ["₁", "₂", "₃", "₄"];
const tex = M => "\\begin{pmatrix}" + M.map(r => r.join(" & ")).join(" \\\\ ") + "\\end{pmatrix}";
const vtex = M => "\\begin{vmatrix}" + M.map(r => r.join(" & ")).join(" \\\\ ") + "\\end{vmatrix}";
const $ = s => `$${s}$`;
const rand = (R, m, n, lo = -5, hi = 5) => Array.from({ length: m }, () => Array.from({ length: n }, () => R.int(lo, hi)));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const T = A => A[0].map((_, j) => A.map(r => r[j]));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const det3 = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
function det(A) {
  if (A.length === 1) return A[0][0];
  if (A.length === 2) return det2(A);
  return A[0].reduce((s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map(r => r.filter((_, k) => k !== j))), 0);
}
function rank(A) {   // eliminación con fracciones exactas
  const M = A.map(r => r.map(x => F.make(x, 1)));
  let rk = 0;
  for (let c = 0; c < M[0].length && rk < M.length; c++) {
    let p = M.findIndex((r, i) => i >= rk && r[c][0] !== 0);
    if (p < 0) continue;
    [M[rk], M[p]] = [M[p], M[rk]];
    for (let i = 0; i < M.length; i++) if (i !== rk && M[i][c][0] !== 0) {
      const f = F.div(M[i][c], M[rk][c]);
      M[i] = M[i].map((x, j) => F.sub(x, F.mul(f, M[rk][j])));
    }
    rk++;
  }
  return rk;
}
// Matriz 2×2 de determinante ±1 (inversa entera)
function unimod2(R) {
  for (;;) { const A = rand(R, 2, 2, -4, 4); if (Math.abs(det2(A)) === 1) return A; }
}
// Matriz 3×3 de determinante ±1 (producto de matrices triangulares)
function unimod3(R) {
  const L = [[1, 0, 0], [R.int(-2, 2), 1, 0], [R.int(-2, 2), R.int(-2, 2), 1]];
  const U = [[R.pick([1, -1]), R.int(-2, 2), R.int(-2, 2)], [0, 1, R.int(-2, 2)], [0, 0, 1]];
  return mul(L, U);
}
const inv2 = A => { const d = det2(A); return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
function adjInv3(A) {   // inversa de una matriz con det ±1 (entera)
  const d = det3(A), C = (i, j) => { const m = A.filter((_, r) => r !== i).map(r => r.filter((_, c) => c !== j)); return ((i + j) % 2 ? -1 : 1) * det2(m); };
  return [0, 1, 2].map(i => [0, 1, 2].map(j => C(j, i) / d));
}
const fieldsOf = M => M.flatMap((r, i) => r.map((x, j) => ({ label: `x${SUBI[i]}${SUBI[j]}`, ans: x })));
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const pn = n => n < 0 ? `(${neg(n)})` : String(n);   // negativo entre paréntesis
// ── Operaciones de filas con enteros, anotadas en LaTeX (F_2\to F_2-2F_1, como en la lección) ──
const augTex = (M, n) => "\\left(\\begin{array}{" + "c".repeat(n) + "|" + "c".repeat(M[0].length - n) + "}" + M.map(r => r.join(" & ")).join(" \\\\ ") + "\\end{array}\\right)";
const coefTex = k => k === 1 ? "" : k === -1 ? "-" : String(k);
// F_i → αF_i − βF_j (α > 0); con α = 1 es la resta de un múltiplo de otra fila
function rowOp(M, i, j, alpha, beta) {
  M[i] = M[i].map((x, c) => alpha * x - beta * M[j][c]);
  return `F_{${i + 1}}\\to ${coefTex(alpha)}F_{${i + 1}}${beta < 0 ? "+" : "-"}${Math.abs(beta) === 1 ? "" : Math.abs(beta)}F_{${j + 1}}`;
}
// hace 0 el elemento (i, c) usando la fila del pivote p
function zeroOut(M, i, p, c) {
  const a = M[p][c], b = M[i][c];
  if (b % a === 0) return rowOp(M, i, p, 1, b / a);
  const g = gcd(a, b); let alpha = a / g, beta = b / g;
  if (alpha < 0) { alpha = -alpha; beta = -beta; }
  return rowOp(M, i, p, alpha, beta);
}
// Escalonado de Gauss en las n primeras columnas; devuelve las etapas [{ops, M}] y el número de pivotes
function gaussSteps(A, n = A[0].length) {
  const M = A.map(r => r.slice()), steps = [];
  let rk = 0;
  for (let c = 0; c < n && rk < M.length; c++) {
    const ops = [];
    let p = M.findIndex((r, i) => i >= rk && r[c] !== 0);
    if (p < 0) continue;
    if (p !== rk) { [M[rk], M[p]] = [M[p], M[rk]]; ops.push(`F_{${rk + 1}}\\leftrightarrow F_{${p + 1}}`); }
    for (let i = rk + 1; i < M.length; i++) if (M[i][c] !== 0) ops.push(zeroOut(M, i, rk, c));
    if (ops.length) steps.push({ ops, M: M.map(r => r.slice()) });
    rk++;
  }
  return { steps, M, rk };
}
// Gauss-Jordan sobre (A | I): ceros debajo, luego encima (de abajo arriba) y, al final, unos en la diagonal
function gaussJordanSteps(A) {
  const n = A.length, I = A.map((_, i) => A.map((_, j) => i === j ? 1 : 0));
  const { steps, M } = gaussSteps(A.map((r, i) => [...r, ...I[i]]), n);
  for (let c = n - 1; c > 0; c--) {
    const ops = [];
    for (let i = c - 1; i >= 0; i--) if (M[i][c] !== 0) ops.push(zeroOut(M, i, c, c));
    if (ops.length) steps.push({ ops, M: M.map(r => r.slice()) });
  }
  const ops = [];
  for (let i = 0; i < n; i++) {
    const d = M[i][i];
    if (d === 1) continue;
    M[i] = M[i].map(x => x / d);
    ops.push(d === -1 ? `F_{${i + 1}}\\to -F_{${i + 1}}` : `F_{${i + 1}}\\to ${d < 0 ? "-" : ""}\\tfrac{1}{${Math.abs(d)}}F_{${i + 1}}`);
  }
  if (ops.length) steps.push({ ops, M: M.map(r => r.slice()) });
  return steps;
}
const stepsTex = (steps, n) => steps.map(s => s.ops.map($).join(", ") + ": " + $(n ? augTex(s.M, n) : tex(s.M))).join(". ");

// ═════ Unidad 1 · Matrices ═════
def("m12.ma.tipo", (R, S) => {
  // 0 fila · 1 columna · 2 nula · 3 identidad · 4 diagonal · 5 triangular superior · 6 simétrica · 7 cuadrada · 8 escalar ·
  // 9 antisimétrica · 10 triangular inferior
  const k = R.int(0, 10), n = R.int(2, 3);
  let A;
  if (k === 0) A = [Array.from({ length: R.int(2, 4) }, () => rnz(R, -6, 6))];
  else if (k === 1) A = Array.from({ length: R.int(2, 4) }, () => [rnz(R, -6, 6)]);
  else if (k === 2) A = rand(R, n, n, 0, 0);
  else if (k === 3) A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  else if (k === 4) { let d; do d = Array.from({ length: n }, () => rnz(R, -6, 6)); while (new Set(d).size === 1); A = d.map((x, i) => d.map((_, j) => i === j ? x : 0)); }
  else if (k === 5 || k === 10) { do A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => j >= i ? R.int(-5, 5) : 0)); while (A.every((r, i) => r.every((x, j) => i === j || !x)) || A.some((r, i) => !r[i])); if (k === 10) A = T(A); }
  else if (k === 6) { do { A = rand(R, n, n); for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) A[i][j] = A[j][i]; } while (A.every((r, i) => r.every((x, j) => i === j || !x)) || A.some((r, i) => r.some((x, j) => j < i && !x))); }
  else if (k === 7) { do A = rand(R, n, n); while (A.some((r, i) => r.some((x, j) => i !== j && x === A[j][i])) || A.some(r => r.some(x => !x))); }
  else if (k === 8) { let d; do d = rnz(R, -6, 6); while (d === 1); A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? d : 0)); }
  else { A = rand(R, n, n, 0, 0); for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { A[i][j] = rnz(R, -6, 6); A[j][i] = -A[i][j]; } }
  // la correcta y cuatro nombres más, barajados (los otros nombres que también encajan son menos precisos)
  const others = R.shuffle(S.m12.ma_tipo_o.map((_, i) => i).filter(i => i !== k)).slice(0, 4);
  const idx = R.shuffle([k, ...others]);
  return { q: S.m12.ma_tipo_q($(tex(A))), kind: "choice", opts: idx.map(i => S.m12.ma_tipo_o[i]), correct: idx.indexOf(k), shuffle: false, sol: S.m12.ma_tipo_s[k] };
});
def("m12.ma.elem", (R, S) => {
  const m = R.int(2, 3), n = R.int(2, 4), A = rand(R, m, n, -9, 9);
  if (R.r() < 0.4) return { q: S.m12.ma_dim_q($(tex(A))), kind: "fields", fields: [{ label: S.m12.ma_dim_f[0], ans: m }, { label: S.m12.ma_dim_f[1], ans: n }], sol: S.m12.ma_dim_s(m, n) };
  const i = R.int(0, m - 1), j = R.int(0, n - 1);
  return { q: S.m12.ma_el_q($(tex(A)), `$a_{${i + 1}${j + 1}}$`), kind: "int", ans: A[i][j], sol: S.m12.ma_el_s(i + 1, j + 1, A[i][j]) };
});
def("m12.ma.suma", (R, S) => {
  const m = 2, n = R.int(2, 3), A = rand(R, m, n), B = rand(R, m, n), a = R.pick([1, 2, 3, -1, -2]), b = R.pick([1, 2, -1, -3]);
  const C = A.map((r, i) => r.map((x, j) => a * x + b * B[i][j]));
  const op = `${a === 1 ? "" : a === -1 ? "-" : a}A ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}B`;
  return { q: S.m12.ma_op_q($(`A = ${tex(A)},\\; B = ${tex(B)}`), $(op)), kind: "fields", fields: fieldsOf(C), sol: S.m12.ma_suma_s($(`${op} = ${tex(C)}`)) };
});
def("m12.ma.producto", (R, S) => {
  if (R.r() < 0.25) {
    const [m, n] = [R.int(1, 4), R.int(1, 4)], [p, q] = R.r() < 0.6 ? [n, R.int(1, 4)] : [R.int(1, 4), R.int(1, 4)];
    const ok = n === p, k = ok ? 0 : 1;
    return { q: S.m12.ma_dimp_q(`${m}×${n}`, `${p}×${q}`), kind: "choice", opts: [S.m12.ma_dimp_o(m, q), S.m12.ma_dimp_no], correct: k, shuffle: false, sol: S.m12.ma_dimp_s(n, p, ok, m, q) };
  }
  const n = R.int(2, 3), A = rand(R, 2, n, -3, 4), B = rand(R, n, 2, -3, 4), C = mul(A, B);
  return { q: S.m12.ma_op_q($(`A = ${tex(A)},\\; B = ${tex(B)}`), "$A \\cdot B$"), kind: "fields", fields: fieldsOf(C),
    sol: S.m12.ma_prod_s($(`A \\cdot B = ${tex(C)}`), `${A[0].map((x, k) => `${pn(x)}·${pn(B[k][0])}`).join(" + ")} = ${neg(C[0][0])}`) };
});
def("m12.ma.traspuesta", (R, S) => {
  const A = rand(R, 2, 3, -9, 9), At = T(A);
  return { q: S.m12.ma_op_q($(`A = ${tex(A)}`), "$A^{t}$", true), kind: "fields", fields: fieldsOf(At), sol: S.m12.ma_tr_s($(`A^{t} = ${tex(At)}`)) };
});
// Inversa por Gauss-Jordan, el método de la lección (sin determinantes, que llegan en la unidad 2)
def("m12.ma.inversa", (R, S) => {
  let A;
  if (R.r() < 0.3) {   // 3 × 3 triangular inferior con unos en la diagonal, como el «Inténtalo» de L
    do A = [[1, 0, 0], [R.int(-3, 3), 1, 0], [R.int(-3, 3), R.int(-3, 3), 1]]; while (!A[1][0] && !A[2][0] || !A[2][1]);
  } else A = unimod2(R);
  const n = A.length, I = n === 2 ? inv2(A) : adjInv3(A), steps = gaussJordanSteps(A);
  const start = A.map((r, i) => [...r, ...A.map((_, j) => i === j ? 1 : 0)]);
  return { q: S.m12.ma_op_q($(`A = ${tex(A)}`), "$A^{-1}$", true), kind: "fields", fields: fieldsOf(I),
    sol: S.m12.ma_inv_s($(augTex(start, n)), stepsTex(steps, n), $(`A^{-1} = ${tex(I)}`)) };
});
def("m12.ma.rango", (R, S) => {
  const n = R.r() < 0.5 ? 3 : 4, r = R.int(1, 3);
  let A, g;
  do {
    const base = rand(R, r, n, -3, 3);
    const rows = [...base];
    while (rows.length < 3) { const a = R.int(-2, 2), b = R.int(-2, 2); rows.push(base[0].map((x, j) => a * x + b * (base[1] ? base[1][j] : 0))); }
    A = R.shuffle(rows);
    g = gaussSteps(A);
  } while (rank(A) !== r || A.every(row => row.every(x => !x)) || g.M.some(row => row.some(x => Math.abs(x) > 40)));
  return { q: S.m12.ma_rg_q($(tex(A))), kind: "int", ans: r, sol: S.m12.ma_rg_s(r, g.steps.length ? stepsTex(g.steps, 0) : "") };
});
// Ecuaciones matriciales: AX = B, XA = B, AX + X = C, AX + B = C, XA − 2X = B y matrices que conmutan.
// La inversa se obtiene por Gauss-Jordan (como en la lección de la inversa) y se comprueba.
const addM = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
const I2 = [[1, 0], [0, 1]];
def("m12.ma.ecuacion", (R, S) => {
  const t = R.pick([0, 0, 1, 1, 2, 3, 4, 5]);
  if (t === 5) {   // matrices que conmutan: X = (x y; z t) con x, y dados
    let p, q, r, s0, m, x;
    do { p = R.int(-3, 3); q = R.pick([1, -1, 2, -2]); r = rnz(R, -3, 3); s0 = R.int(-3, 3); m = rnz(R, -2, 2); x = R.int(-3, 4); } while (p === s0);
    const y = q * m, z = r * m, tt = x + m * (s0 - p), A = [[p, q], [r, s0]];
    const Xl = `\\begin{pmatrix} ${x} & ${y} \\\\ z & t \\end{pmatrix}`;
    return { q: S.m12.ma_cm_q($(`A = ${tex(A)}`), $(`X = ${Xl}`)), kind: "fields", fields: [{ label: "z", ans: z }, { label: "t", ans: tt }],
      sol: S.m12.ma_cm_s(
        $(`AX = \\begin{pmatrix} ${pn(p)}\\cdot${pn(x)} + ${pn(q)}z & ${pn(p)}\\cdot${pn(y)} + ${pn(q)}t \\\\ \\dots & \\dots \\end{pmatrix}`),
        $(`XA = \\begin{pmatrix} ${pn(x)}\\cdot${pn(p)} + ${pn(y)}\\cdot${pn(r)} & ${pn(x)}\\cdot${pn(q)} + ${pn(y)}\\cdot${pn(s0)} \\\\ \\dots & \\dots \\end{pmatrix}`),
        $(`${q === 1 ? "" : q === -1 ? "-" : q}z = ${y * r}`), neg(z), $(`${p * y} ${q < 0 ? "-" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}t = ${x * q + y * s0}`), neg(tt),
        $(`X = ${tex([[x, y], [z, tt]])}`)) };
  }
  const U = unimod2(R), X = rand(R, 2, 2, -4, 4);
  // M es la matriz que hay que invertir; rhs, el otro miembro; left: M a la izquierda de X
  let A, M = U, rhs, left = true, q, prep = "", Bx;
  if (t === 0) { A = U; rhs = mul(U, X); q = S.m12.ma_ec_q($("A X = B"), $(`A = ${tex(A)},\\; B = ${tex(rhs)}`)); }
  else if (t === 1) { A = U; rhs = mul(X, U); left = false; q = S.m12.ma_ec_q($("X A = B"), $(`A = ${tex(A)},\\; B = ${tex(rhs)}`)); }
  else if (t === 2) { A = addM(U, I2, -1); rhs = mul(U, X); q = S.m12.ma_ec_q($("A X + X = C"), $(`A = ${tex(A)},\\; C = ${tex(rhs)}`)); prep = S.m12.ma_ec_fc($("AX + X = (A + I)X"), $(`A + I = ${tex(U)}`)); }
  else if (t === 3) { A = U; Bx = rand(R, 2, 2, -4, 4); const C = addM(mul(U, X), Bx); rhs = mul(U, X); q = S.m12.ma_ec_q($("A X + B = C"), $(`A = ${tex(A)},\\; B = ${tex(Bx)},\\; C = ${tex(C)}`)); prep = S.m12.ma_ec_resta($(`AX = C - B = ${tex(rhs)}`)); }
  else { A = addM(U, I2.map(r => r.map(v => 2 * v))); rhs = mul(X, U); left = false; q = S.m12.ma_ec_q($("X A - 2X = B"), $(`A = ${tex(A)},\\; B = ${tex(rhs)}`)); prep = S.m12.ma_ec_fc($("XA - 2X = X(A - 2I)"), $(`A - 2I = ${tex(U)}`)); }
  const name = t === 2 ? "A + I" : t === 4 ? "A - 2I" : "A", Mi = inv2(M), start = M.map((r, i) => [...r, ...I2[i]]);
  const pn_ = name === "A" ? "A" : `(${name})`, iv = `${pn_}^{-1}`;
  return { q, kind: "fields", fields: fieldsOf(X),
    sol: S.m12.ma_ec_s(prep, $(name), $(augTex(start, 2)), stepsTex(gaussJordanSteps(M), 2), $(`${iv} = ${tex(Mi)}`), $(`${tex(M)}\\cdot${tex(Mi)} = I`), left,
      $(left ? `X = ${iv}\\cdot ${tex(rhs)}` : `X = ${tex(rhs)}\\cdot ${iv}`), $(`X = ${tex(X)}`), $(left ? `${pn_}\\,X = ${tex(mul(M, X))}` : `X\\,${pn_} = ${tex(mul(X, M))}`)) };
});
// Potencias Aⁿ: se calculan A², A³ (o A⁴), se ve el patrón y se aplica
def("m12.ma.potencia", (R, S) => {
  const t = R.int(0, 4);
  let A, pw = [], n, pat, An;
  const P = k => { let M = A; for (let i = 1; i < k; i++) M = mul(M, A); return M; };
  if (t === 0) {   // (1 0; k 1) o (1 k; 0 1)
    const k = R.pick([2, 3, -2, -3, 4, 5]), low = R.r() < 0.5; n = R.int(6, 30);
    A = low ? [[1, 0], [k, 1]] : [[1, k], [0, 1]];
    pw = [2, 3]; An = low ? [[1, 0], [k * n, 1]] : [[1, k * n], [0, 1]];
    pat = S.m12.ma_pot_lin(neg(k), low ? "\\begin{pmatrix} 1 & 0 \\\\ " + (k === 1 ? "" : k) + "n & 1 \\end{pmatrix}" : "\\begin{pmatrix} 1 & " + k + "n \\\\ 0 & 1 \\end{pmatrix}");
  } else if (t === 1) {   // (1 1; 1 1)·c: A² = 2A
    A = [[1, 1], [1, 1]]; n = R.int(4, 10); pw = [2, 3];
    An = A.map(r => r.map(() => 2 ** (n - 1)));
    pat = S.m12.ma_pot_dos(n);
  } else if (t === 2) {   // involutiva: A² = I
    const a = R.pick([1, 2, 3, -2]), b = R.pick({ 1: [1, -1, 2, -3], 2: [1, -1, 3, -3], 3: [1, -1, 2, -4, 8], [-2]: [1, -1, 3, -3] }[a]);
    const c = (1 - a * a) / b;
    A = [[a, b], [c, -a]]; n = R.pick([R.int(10, 60) * 2, R.int(10, 60) * 2 + 1]); pw = [2];
    An = n % 2 ? A : I2;
    pat = S.m12.ma_pot_inv(n, n % 2);
  } else if (t === 3) {   // giro de 90°: A⁴ = I
    A = R.r() < 0.5 ? [[0, 1], [-1, 0]] : [[0, -1], [1, 0]]; n = R.int(20, 2030); pw = [2, 3, 4];
    An = P(n % 4 || 4); if (n % 4 === 0) An = I2;
    pat = S.m12.ma_pot_giro(n, Math.floor(n / 4), n % 4);
  } else {   // diagonal
    const a = R.pick([2, -2, 3, -1]), b = R.pick([2, -1, 3, -3].filter(x => x !== a)); n = R.int(3, 7);
    A = [[a, 0], [0, b]]; pw = [2]; An = [[a ** n, 0], [0, b ** n]];
    pat = S.m12.ma_pot_diag(pn(a), pn(b), n);
  }
  let i = R.int(0, 1), j = R.int(0, 1);
  if (t === 0 || t === 4) [i, j] = t === 0 ? (A[1][0] ? [1, 0] : [0, 1]) : R.pick([[0, 0], [1, 1]]);
  const powTxt = pw.map(k => $(`A^{${k}} = ${tex(P(k))}`)).join(", ");
  return { q: S.m12.ma_pot_q($(`A = ${tex(A)}`), i + 1, j + 1, $(`A^{${n}}`)), kind: "int", ans: An[i][j],
    sol: S.m12.ma_pot_s(powTxt, pat, $(`A^{${n}} = ${tex(An)}`), i + 1, j + 1, neg(An[i][j])) };
});
// Rango según un parámetro: F₃ = l₁F₁ + l₂F₂ salvo el último elemento, que es a (3 × 3 o 3 × 4)
function rangoParam(R) {
  let F1, F2, l1, l2, F3, c, ncol;
  do {
    ncol = R.r() < 0.5 ? 3 : 4;
    F1 = [1, ...Array.from({ length: ncol - 1 }, () => R.int(-3, 3))];
    F2 = Array.from({ length: ncol }, () => R.int(-3, 3));
    l1 = rnz(R, -2, 2); l2 = rnz(R, -2, 2);
    F3 = F1.map((x, j) => l1 * x + l2 * F2[j]);
    c = F2[1] - F1[1] * F2[0];
  } while (!c || F3.some(x => Math.abs(x) > 9) || Math.abs(c) > 6 || F2.slice(0, ncol - 1).every(x => !x));
  const a0 = F3[ncol - 1];
  return { F1, F2, F3, l1, l2, c, a0, ncol };
}
const aTex = o => o === 0 ? "a" : o > 0 ? `a + ${o}` : `a - ${-o}`;     // LaTeX: a + o
const pTex = (rows, last) => "\\begin{pmatrix}" + rows.map((r, i) => (i === 2 ? [...r.slice(0, -1), last] : r).join(" & ")).join(" \\\\ ") + "\\end{pmatrix}";
def("m12.ma.rangoparam", (R, S) => {
  const g = rangoParam(R), { F1, F2, F3, l2, c, a0, ncol } = g, n = ncol - 1;
  const A = [F1, F2, F3];
  // Gauss: F₂ → F₂ − sF₁, F₃ → F₃ − mF₁ (con el último de F₃ = a + o), y después F₃ → F₃ − l₂F₂
  const s = F2[0], m = F3[0], G2 = F2.map((x, j) => x - s * F1[j]);
  let o = -m * F1[n];
  const G3 = F3.map((x, j) => x - m * F1[j]);
  const ops1 = [s ? `F_{2}\\to F_{2}${s < 0 ? "+" : "-"}${Math.abs(s) === 1 ? "" : Math.abs(s)}F_{1}` : "", m ? `F_{3}\\to F_{3}${m < 0 ? "+" : "-"}${Math.abs(m) === 1 ? "" : Math.abs(m)}F_{1}` : ""].filter(Boolean).map($).join(", ");
  const st1 = pTex([F1, G2, G3], aTex(o));
  o -= l2 * G2[n];
  const H3 = G3.map((x, j) => x - l2 * G2[j]);
  const st2 = pTex([F1, G2, H3], aTex(o));
  const op2 = $(`F_{3}\\to F_{3}${l2 < 0 ? "+" : "-"}${Math.abs(l2) === 1 ? "" : Math.abs(l2)}F_{2}`);
  const Aq = $(`A = ${pTex(A, "a")}`), ask = R.r() < 0.5;
  const v = ask ? a0 : R.r() < 0.5 ? a0 : a0 + R.pick([1, -1, 2, -2]), rk = v === a0 ? 2 : 3;
  const body = S.m12.ma_rp_s(ops1 ? `${ops1}: ${$(st1)}. ` : "", op2, $(st2), $(aTex(o)), neg(a0));
  if (ask) return { q: S.m12.ma_rp_q(Aq), kind: "int", ans: a0, sol: body + S.m12.ma_rp_end(neg(a0)) };
  return { q: S.m12.ma_rp2_q(Aq, neg(v)), kind: "int", ans: rk, sol: body + S.m12.ma_rp2_end(neg(v), rk) };
});

// ═════ Unidad 2 · Determinantes ═════
def("m12.de.orden23", (R, S) => {
  if (R.r() < 0.4) { const A = rand(R, 2, 2, -9, 9); return { q: S.m12.de_q($(vtex(A))), kind: "int", ans: det2(A), sol: S.m12.de2_s(A[0][0], A[1][1], A[0][1], A[1][0], det2(A)) }; }
  const A = rand(R, 3, 3, -4, 4), d = det3(A);
  return { q: S.m12.de_q($(vtex(A))), kind: "int", ans: d, sol: S.m12.de3_s(...sarrusTxt(A), d) };
});
// Sarrus con los seis productos: [«a·b·c + … = x + y + z = P», «… = M», P, M]
function sarrusTxt(A) {
  const pl = [[0, 0, 1, 1, 2, 2], [0, 1, 1, 2, 2, 0], [0, 2, 1, 0, 2, 1]], mi = [[0, 2, 1, 1, 2, 0], [0, 0, 1, 2, 2, 1], [0, 1, 1, 0, 2, 2]];
  const one = idx => {
    const fs = idx.map(([a, b, c, e, f, g]) => [A[a][b], A[c][e], A[f][g]]), vs = fs.map(t => t[0] * t[1] * t[2]), s = vs.reduce((x, y) => x + y, 0);
    return [`${fs.map(t => t.map(pn).join("·")).join(" + ")} = ${vs.map((v, i) => i ? (v < 0 ? `− ${-v}` : `+ ${v}`) : neg(v)).join(" ")} = ${neg(s)}`, s];
  };
  const [tp, P] = one(pl), [tm, M] = one(mi);
  return [tp, tm, P, M];
}
// Determinantes con letras: |a b c; d e f; g h i| = k
const LET = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]];
const ltex = M => "\\begin{vmatrix}" + M.map(r => r.join(" & ")).join(" \\\\ ") + "\\end{vmatrix}";
def("m12.de.propiedades", (R, S) => {
  const k = rnz(R, -6, 6), n = 3, c = R.int(2, 4), v = R.int(0, 10);
  if (v >= 6) {   // el tipo de la PAU: un determinante con letras transformado
    const m = rnz(R, -3, 3), base = $(`${ltex(LET)} = ${k}`);
    const lc = (s, x) => `${s < 0 ? "-" : ""}${Math.abs(s) === 1 ? "" : Math.abs(s)}${x}`;
    const Ms = [
      [LET[0], LET[2], LET[1]],
      [LET[0], LET[1].map((x, j) => `${x} ${m < 0 ? "-" : "+"} ${lc(Math.abs(m), LET[0][j])}`), LET[2]],
      [LET[0].map(x => `${c}${x}`), LET[1], LET[2].map(x => `-${x}`)],
      T(LET),
      null];
    if (v === 10) return { q: S.m12.de_pl_q(base, $(`|-${c}A|`), true), kind: "int", ans: -(c ** 3) * k, sol: S.m12.de_pl_s[4](k, c, -(c ** 3) * k) };
    const ans = [-k, k, -c * k, k][v - 6];
    return { q: S.m12.de_pl_q(base, $(ltex(Ms[v - 6]))), kind: "int", ans, sol: S.m12.de_pl_s[v - 6](k, c, ans, neg(m)) };
  }
  const Q = [
    ["|A^{t}|", k, 0], [`|${c}A|`, c ** n * k, 1], ["|A^{-1}|", null, 2], ["|A^{2}|", k * k, 3],
    [S.m12.de_pr_swap, -k, 4], [S.m12.de_pr_row(c), c * k, 5]][v];
  if (v === 2) return { q: S.m12.de_pr_q(k, $(Q[0])), kind: "frac", ans: F.make(1, k), sol: S.m12.de_pr_s[2](k) };
  return { q: S.m12.de_pr_q(k, v >= 4 ? Q[0] : $(Q[0])), kind: "int", ans: Q[1], sol: S.m12.de_pr_s[v](k, c, Q[1]) };
});
def("m12.de.orden4", (R, S) => {
  let A;
  if (R.r() < 0.4) {
    const low = R.r() < 0.5;
    A = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => j < i ? 0 : j === i ? rnz(R, -3, 3) : R.int(-4, 4))); if (low) A = T(A);
    const dg = A.map((r, i) => r[i]);
    return { q: S.m12.de_q($(vtex(A))), kind: "int", ans: det(A), sol: S.m12.de4_tri(low, dg.map(pn).join("·"), neg(det(A))) };
  }
  A = rand(R, 4, 4, -3, 3);
  const i = R.int(0, 3), j = R.int(0, 3), byCol = R.r() < 0.4;
  if (byCol) A.forEach((r, rr) => { r[j] = rr === i ? rnz(R, -3, 3) : 0; });
  else A[i] = A[i].map((_, c) => c === j ? rnz(R, -3, 3) : 0);
  const v = A[i][j], sg = (i + j) % 2 ? -1 : 1, Mn = A.filter((_, r) => r !== i).map(r => r.filter((_, c) => c !== j)), m = det3(Mn);
  const [tp, tm, P, M] = sarrusTxt(Mn);
  return { q: S.m12.de_q($(vtex(A))), kind: "int", ans: det(A),
    sol: S.m12.de4_s(byCol ? S.m12.de_col(j + 1) : S.m12.de_fila(i + 1), i + 1, j + 1, neg(v), sg > 0 ? "+" : "−", i + j + 2, $(vtex(Mn)), tp, tm, `${neg(P)} − ${pn(M)} = ${neg(m)}`, `${sg < 0 ? "−" : ""}${pn(v)}·${pn(m)}`, neg(det(A))) };
});
def("m12.de.inversa", (R, S) => {
  const A = unimod3(R), I = adjInv3(A), i = R.int(0, 2), j = R.int(0, 2), d = det3(A);
  // (A⁻¹)ᵢⱼ = Aⱼᵢ / |A|: se tacha la fila j y la columna i
  const Mn = A.filter((_, r) => r !== j).map(r => r.filter((_, c) => c !== i)), m = det2(Mn), sg = (i + j) % 2 ? -1 : 1, adj = sg * m;
  const [tp, tm, P, M] = sarrusTxt(A);
  return { q: S.m12.de_inv_q($(`A = ${tex(A)}`), `$(A^{-1})_{${i + 1}${j + 1}}$`), kind: "int", ans: I[i][j],
    sol: S.m12.de_inv_s(neg(d), j + 1, i + 1, `${tp}; ${tm}`, `${neg(P)} − ${pn(M)}`, $(vtex(Mn)), `${pn(Mn[0][0])}·${pn(Mn[1][1])} − ${pn(Mn[0][1])}·${pn(Mn[1][0])} = ${neg(m)}`,
      sg > 0 ? "+" : "−", i + j + 2, neg(adj), `${neg(adj)}/${pn(d)}`, neg(I[i][j]), $(`A^{-1} = ${tex(I)}`)) };
});
// Rango con parámetro por menores (unidad 2): el menor de las filas y columnas 1–2 y sus orlados
def("m12.de.rangoparam", (R, S) => {
  const { F1, F2, F3, l1, l2, c, a0, ncol } = rangoParam(R);
  const Aq = $(`A = ${pTex([F1, F2, F3], "a")}`), ask = R.r() < 0.5;
  const v = ask ? a0 : R.r() < 0.5 ? a0 : a0 + R.pick([1, -1, 2, -2]), rk = v === a0 ? 2 : 3;
  const comb = `${coefTex(l1)}F_{1}${l2 < 0 ? "-" : "+"}${Math.abs(l2) === 1 ? "" : Math.abs(l2)}F_{2}`;
  const minor = $(`${vtex([[F1[0], F1[1]], [F2[0], F2[1]]])} = ${c}`);
  const orl = ncol === 3 ? S.m12.de_rp3($(comb), $(aTex(-a0)), neg(c)) : S.m12.de_rp4($(vtex([F1.slice(0, 3), F2.slice(0, 3), F3.slice(0, 3)])), $(comb), $(aTex(-a0)), neg(c));
  const body = S.m12.de_rp_s(minor, orl, neg(a0));
  if (ask) return { q: S.m12.ma_rp_q(Aq), kind: "int", ans: a0, sol: body + S.m12.ma_rp_end(neg(a0)) };
  return { q: S.m12.ma_rp2_q(Aq, neg(v)), kind: "int", ans: rk, sol: body + S.m12.ma_rp2_end(neg(v), rk) };
});

// ═════ Unidad 3 · Sistemas de ecuaciones ═════
const VARS = ["x", "y", "z"];
function eqTex(row, rhs) {
  let s = "";
  row.forEach((c, j) => {
    if (!c) return;
    const a = Math.abs(c), t = (a === 1 ? "" : a) + VARS[j];
    s += s ? (c < 0 ? " - " : " + ") + t : (c < 0 ? "-" : "") + t;
  });
  return (s || "0") + " = " + rhs;
}
// tercera ecuación con el parámetro a como coeficiente de z
function eqTexA(row, rhs) {
  const s = eqTex([row[0], row[1], 0], rhs).replace(/ = .*$/, "");
  return (s === "0" ? "az" : s + " + az") + " = " + rhs;
}
const aMinus = a0 => a0 === 0 ? "a" : a0 > 0 ? `a − ${a0}` : `a + ${-a0}`;
const detTex = (c, a0) => a0 === 0 ? (c === 1 ? "a" : c === -1 ? "−a" : `${neg(c)}a`) : c === 1 ? aMinus(a0) : `${c === -1 ? "−" : neg(c)}(${aMinus(a0)})`;
const sysTex = (A, b) => "$\\left\\{\\begin{aligned}" + A.map((r, i) => eqTex(r, b[i]).replace(" = ", " &= ")).join(" \\\\ ") + "\\end{aligned}\\right.$";
def("m12.si.ampliada", (R, S) => {
  const n = R.int(2, 3), b = Array.from({ length: n }, () => R.int(-9, 9));
  let A; do A = rand(R, n, n, -4, 4); while (A.some(r => r.every(x => !x)));   // sin ecuaciones «0 = k»
  const aug = (M, v) => "$\\left(\\begin{array}{" + "c".repeat(n) + "|c}" + M.map((r, i) => [...r, v[i]].join(" & ")).join(" \\\\ ") + "\\end{array}\\right)$";
  const ok = aug(A, b), alts = [aug(T(A), b), aug(A, b.map(x => -x)), aug(A.map(r => r.map(x => -x)), b)];
  const opts = R.shuffle([ok, ...[...new Set(alts)].filter(x => x !== ok)].slice(0, 4));
  return { q: S.m12.si_amp_q(sysTex(A, b)), kind: "choice", opts, correct: opts.indexOf(ok), sol: S.m12.si_amp_s(n) };
});
def("m12.si.rouche", (R, S) => {
  const n = 3, k = R.int(0, 2);   // 0 SCD · 1 SCI · 2 SI
  let A, b;
  for (;;) {
    A = rand(R, 3, 3, -3, 3);
    if (k > 0) { const a = rnz(R, -2, 2), c = R.int(-2, 2); A[2] = A[0].map((x, j) => a * x + c * A[1][j]); }
    const sol = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
    b = A.map(r => r.reduce((s, x, j) => s + x * sol[j], 0));
    if (k === 2) b[2] += rnz(R, -3, 3);
    const ra = rank(A), rb = rank(A.map((r, i) => [...r, b[i]]));
    const kk = ra === rb ? (ra === n ? 0 : 1) : 2;
    if (kk === k && ra >= 2) break;
  }
  const ra = rank(A), rb = rank(A.map((r, i) => [...r, b[i]]));
  // los pasos: |A| por Sarrus; si es 0, un menor de orden 2 de las filas 1 y 2 y su orlado con la columna B
  let steps;
  if (k === 0) { const [tp, tm, P, M] = sarrusTxt(A); steps = S.m12.si_rf_d(`${tp}; ${tm}`, `${neg(P)} − ${pn(M)} = ${neg(det3(A))}`); }
  else {
    const [j1, j2] = [[0, 1], [0, 2], [1, 2]].find(([p, q]) => A[0][p] * A[1][q] - A[0][q] * A[1][p] !== 0);
    const mn = [[A[0][j1], A[0][j2]], [A[1][j1], A[1][j2]]], O = A.map((r, i) => [r[j1], r[j2], b[i]]);
    const [tp, tm, P, M] = sarrusTxt(O);
    steps = S.m12.si_rf_0($(vtex(mn)), neg(det2(mn)), $(`${vtex(O)}`), `${neg(P)} − ${pn(M)} = ${neg(det3(O))}`, VARS[j1], VARS[j2]);
  }
  return { q: S.m12.si_rf_q(sysTex(A, b)), kind: "choice", opts: S.m12.si_rf_o, correct: k, shuffle: false, sol: steps + S.m12.si_rf_s(ra, rb, n, k) };
});
def("m12.si.cramer", (R, S) => {
  const n = R.int(2, 3);
  let A; do A = rand(R, n, n, -4, 4); while (!det(A) || Math.abs(det(A)) > 30);
  const sol = Array.from({ length: n }, () => R.int(-5, 5)), b = A.map(r => r.reduce((s, x, j) => s + x * sol[j], 0));
  const d = det(A), Ms = sol.map((_, j) => A.map((r, i) => r.map((x, c) => c === j ? b[i] : x))), dets = Ms.map(det);
  const sub = ["x", "y", "z"];
  return { q: S.m12.si_cr_q(sysTex(A, b)), kind: "fields", fields: sol.map((x, j) => ({ label: VARS[j], ans: x })),
    sol: S.m12.si_cr_s($(`\\Delta = ${vtex(A)} = ${d}`), Ms.map((M, j) => $(`\\Delta_${sub[j]} = ${vtex(M)} = ${dets[j]}`)).join("; "),
      dets.map((v, j) => `${VARS[j]} = Δ<sub>${sub[j]}</sub>/Δ = ${neg(v)}/${pn(d)} = <b>${neg(sol[j])}</b>`).join("; ")) };
});
// Discusión de un sistema 3 × 3 con un parámetro a en la tercera ecuación (como el Ejemplo 1 de la lección):
// F₃ = l₁F₁ + l₂F₂ salvo el coeficiente de z (a) y el término independiente (b₃ = l₁b₁ + l₂b₂ + δ).
// |A| = c·(a − a₀); para a = a₀, el orlado con la columna B vale c·δ: SCI si δ = 0, SI si δ ≠ 0.
def("m12.si.parametro", (R, S) => {
  let r1, r2, l1, l2, r3, c, b;
  do {
    r1 = [1, R.int(-3, 3), R.int(-3, 3)]; r2 = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
    l1 = rnz(R, -2, 2); l2 = rnz(R, -2, 2);
    r3 = r1.map((x, j) => l1 * x + l2 * r2[j]);
    c = r1[0] * r2[1] - r1[1] * r2[0];
    b = [R.int(-6, 6), R.int(-6, 6)];
  } while (!c || Math.abs(r3[2]) > 9 || Math.abs(l1 * b[0] + l2 * b[1]) > 12);
  const a0 = r3[2], delta = R.r() < 0.5 ? 0 : rnz(R, -4, 4);
  b.push(l1 * b[0] + l2 * b[1] + delta);
  const sys = "$\\left\\{\\begin{aligned}" + [eqTex(r1, b[0]), eqTex(r2, b[1]), eqTexA(r3, b[2])].map(e => e.replace(" = ", " &= ")).join(" \\\\ ") + "\\end{aligned}\\right.$";
  const comb = `${coefTex(l1)}F_{1}${l2 < 0 ? "-" : "+"}${Math.abs(l2) === 1 ? "" : Math.abs(l2)}F_{2}`;
  const minor = $(vtex([[r1[0], r1[1]], [r2[0], r2[1]]]));
  const t = R.r(), base = [$(comb), aMinus(a0), detTex(c, a0), neg(a0)];
  if (t < 0.3) return { q: S.m12.si_par_q(sys), kind: "int", ans: a0, sol: S.m12.si_par_s(...base) };
  if (t < 0.75) return { q: S.m12.si_par2_q(sys, neg(a0)), kind: "choice", opts: S.m12.si_rf_o, correct: delta ? 2 : 1, shuffle: false,
    sol: S.m12.si_par2_s(...base, minor, neg(c), neg(c * delta), delta) };
  const k = R.pick([1, 2, -1, -2]), v = a0 + k;
  return { q: S.m12.si_par2_q(sys, neg(v)), kind: "choice", opts: S.m12.si_rf_o, correct: 0, shuffle: false, sol: S.m12.si_par3_s(...base, neg(v), neg(k), neg(c * k)) };
});
// Discusión con |A| de segundo grado (dos valores críticos) y resolución del caso SCI:
// A = (1 1 1; 1 a r; 1 r a), |A| = a² − 2a + 2r − r² = (a − r)(a − (2 − r)).
// Para a = r, F₂ = F₃ en A (SCI si b₂ = b₃); para a = 2 − r, F₂ + F₃ = 2F₁ en A (SCI si b₂ + b₃ = 2b₁).
const lin = (c0, c1, v = "t") => c1 === 0 ? neg(c0) : (c0 ? neg(c0) + (c1 < 0 ? " − " : " + ") : (c1 < 0 ? "−" : "")) + (Math.abs(c1) === 1 ? "" : Math.abs(c1)) + v;
def("m12.si.discusion", (R, S) => {
  const r = R.pick([-3, -2, -1, 0, 2, 3, 4]), r2 = 2 - r, b1 = R.int(-4, 4), m = rnz(R, -3, 3);
  const which = R.int(0, 1);   // valor crítico en el que el sistema es SCI (el otro da SI)
  // b₂ y b₃: con which = 0 (a = r) b₂ = b₃ = b₁ + (r − 1)m; con which = 1 (a = 2 − r) b₂ = b₁ + (1 − r)m y b₃ = 2b₁ − b₂
  let b2, b3;
  if (which === 0) { b2 = b1 + (r - 1) * m; b3 = b2; if (b2 + b3 === 2 * b1) return null; }
  else { b2 = b1 + (1 - r) * m; b3 = 2 * b1 - b2; if (b2 === b3) return null; }
  const rr = String(r), eqs = [`x + y + z &= ${b1}`, `x + ay ${r < 0 ? "-" : "+"} ${Math.abs(r) === 1 ? "" : Math.abs(r)}z &= ${b2}`, `x ${r < 0 ? "-" : "+"} ${Math.abs(r) === 1 ? "" : Math.abs(r)}y + az &= ${b3}`];
  if (r === 0) { eqs[1] = `x + ay &= ${b2}`; eqs[2] = `x + az &= ${b3}`; }
  const sys = "$\\left\\{\\begin{aligned}" + eqs.join(" \\\\ ") + "\\end{aligned}\\right.$";
  const roots = [r, r2].sort((x, y) => x - y), det = S.m12.si_dis_det(pn(r), r * r, 2 * r - r * r, neg(roots[0]), neg(roots[1]));
  const cA = S.m12.si_dis_ca(neg(r), which === 0, b2, b3), cB = S.m12.si_dis_cb(neg(r2), which === 1, b1, b2, b3);
  const t = R.int(0, 3), all = det + " " + cA + " " + cB + " " + S.m12.si_dis_other(neg(roots[0]), neg(roots[1]));
  if (t === 0) return { q: S.m12.si_dis_q(sys), kind: "set", ans: roots, sol: all };
  if (t === 1) {
    const a = R.pick([r, r2]), k = a === r ? (which === 0 ? 1 : 2) : (which === 1 ? 1 : 2);
    return { q: S.m12.si_par2_q(sys, neg(a)), kind: "choice", opts: S.m12.si_rf_o, correct: k, shuffle: false, sol: all };
  }
  if (t === 2) {
    let v; do v = R.int(-5, 6); while (v === r || v === r2);
    return { q: S.m12.si_par2_q(sys, neg(v)), kind: "choice", opts: S.m12.si_rf_o, correct: 0, shuffle: false, sol: det + " " + S.m12.si_dis_v(neg(v)) };
  }
  // resolver el caso SCI con z = t
  const aS = which === 0 ? r : r2;
  const x0 = b1 - m, x1 = which === 0 ? 0 : -2, y0 = m, y1 = which === 0 ? -1 : 1;
  const tm = (c, v) => c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}${v}`;
  const first = (c, v) => (c < 0 ? "−" : "") + (Math.abs(c) === 1 ? "" : Math.abs(c)) + v;
  const e2 = `x${tm(aS, "y")}${tm(r, "z")} = ${neg(b2)}`;
  const cy = aS - 1, cz = r - 1, dif = `${first(cy, "y")}${tm(cz, "z")} = ${neg(b2 - b1)}`, red = `y ${which === 0 ? "+" : "−"} z = ${neg(m)}`;
  return { q: S.m12.si_dis_sq(sys, neg(aS)), kind: "fields",
    fields: [{ label: "x", kind: "expr", vars: ["t"], ans: `${x0}+(${x1})*t`, ansHtml: lin(x0, x1) }, { label: "y", kind: "expr", vars: ["t"], ans: `${y0}+(${y1})*t`, ansHtml: lin(y0, y1) }],
    sol: S.m12.si_dis_ss(neg(aS), which === 0, e2, neg(b1), dif, neg(cy), red, lin(y0, y1), lin(x0, x1), $(`(x, y, z) = (${lin(x0, x1).replace(/−/g, "-")},\\ ${lin(y0, y1).replace(/−/g, "-")},\\ t)`)) };
});
// Resolver (o clasificar) un sistema 3 × 3 por Gauss con la matriz ampliada
def("m12.si.gauss", (R, S) => {
  const cls = R.r() < 0.3;
  let A, b, g, sol;
  for (;;) {
    A = rand(R, 3, 3, -3, 3); A[0][0] = R.pick([1, 1, -1, 2]);
    sol = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
    if (cls) { const l1 = rnz(R, -2, 2), l2 = R.int(-2, 2); A[2] = A[0].map((x, j) => l1 * x + l2 * A[1][j]); }
    b = A.map(r => r.reduce((s, x, j) => s + x * sol[j], 0));
    if (cls && R.r() < 0.5) b[2] += rnz(R, -3, 3);
    if (A.some(r => r.every(x => !x))) continue;
    const ra = rank(A);
    if (!cls && ra !== 3) continue;
    if (cls && ra !== 2) continue;
    g = gaussSteps(A.map((r, i) => [...r, b[i]]), 3);
    if (g.M.some(r => r.some(x => Math.abs(x) > 40)) || !g.steps.length) continue;
    break;
  }
  const start = $(augTex(A.map((r, i) => [...r, b[i]]), 3)), steps = stepsTex(g.steps, 3), M = g.M;
  if (cls) {
    const last = M[2], k = last[3] ? 2 : 1;
    return { q: S.m12.si_gs_cq(sysTex(A, b)), kind: "choice", opts: S.m12.si_rf_o, correct: k, shuffle: false,
      sol: S.m12.si_gs_cs(start, steps, neg(last[3]), k) };
  }
  // sustitución hacia atrás con los números de la matriz escalonada
  const term = (c, v, val) => `${c === 1 ? "" : c === -1 ? "−" : neg(c)}${v}`;
  const z = sol[2], y = sol[1], x = sol[0];
  const sz = `${term(M[2][2], "z")} = ${neg(M[2][3])} → z = ${neg(z)}`;
  const sy = `${term(M[1][1], "y")}${M[1][2] ? ` ${M[1][2] < 0 ? "−" : "+"} ${Math.abs(M[1][2])}·${pn(z)}` : ""} = ${neg(M[1][3])} → y = ${neg(y)}`;
  const sx = `${term(M[0][0], "x")}${M[0][1] ? ` ${M[0][1] < 0 ? "−" : "+"} ${Math.abs(M[0][1])}·${pn(y)}` : ""}${M[0][2] ? ` ${M[0][2] < 0 ? "−" : "+"} ${Math.abs(M[0][2])}·${pn(z)}` : ""} = ${neg(M[0][3])} → x = ${neg(x)}`;
  return { q: S.m12.si_gs_q(sysTex(A, b)), kind: "fields", fields: sol.map((v, j) => ({ label: VARS[j], ans: v })),
    sol: S.m12.si_gs_s(start, steps, sz, sy, sx) };
});
})();
