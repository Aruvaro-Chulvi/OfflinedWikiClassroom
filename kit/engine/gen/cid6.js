/* WikiAula — Ciudadanía y ética, Grado 6: responsabilidad, valores, decisiones, diversidad, igualdad, ciudadanía digital, democracia,
   Constitución, impuestos, ODS y consumo responsable. Textos y bancos en i18n/<lang>/cid6.js (S.cid6). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid6.responsable", (R, S) => B.mixed(S.cid6.responsable, R));
def("cid6.valor", (R, S) => B.mixed(S.cid6.valor, R));
def("cid6.presion", (R, S) => B.mixed(S.cid6.presion, R));
def("cid6.cultura", (R, S) => B.mixed(S.cid6.cultura, R));
def("cid6.genero", (R, S) => B.mixed(S.cid6.genero, R));
def("cid6.digital", (R, S) => B.mixed(S.cid6.digital, R));
def("cid6.democracia", (R, S) => B.mixed(S.cid6.democracia, R));
def("cid6.institucion", (R, S) => B.mixed(S.cid6.institucion, R));
def("cid6.cderecho", (R, S) => B.mixed(S.cid6.cderecho, R));
def("cid6.servicio", (R, S) => B.mixed(S.cid6.servicio, R));
def("cid6.ods", (R, S) => B.mixed(S.cid6.ods, R));
def("cid6.consumo", (R, S) => B.mixed(S.cid6.consumo, R));

// Puntuar dos opciones: suma de ventajas − suma de inconvenientes.
def("cid6.decision", (R, S) => {
  const T = S.cid6, [a, b] = R.shuffle(T.dilemas.slice())[0];
  const mk = () => ({ p: [R.int(1, 5), R.int(1, 5), R.int(1, 5)].slice(0, R.int(2, 3)), c: [R.int(1, 5), R.int(1, 4)].slice(0, R.int(1, 2)) });
  let A = mk(), Bo = mk();
  const sc = o => o.p.reduce((x, y) => x + y, 0) - o.c.reduce((x, y) => x + y, 0);
  while (sc(A) === sc(Bo)) Bo = mk();
  if (R.int(0, 1)) return { q: T.de_q1(a, A, b, Bo), kind: "int", ans: sc(A), sol: T.de_s1(a, A, sc(A)) };
  const w = sc(A) > sc(Bo) ? 0 : 1;
  return { q: T.de_q2(a, A, b, Bo), kind: "choice", opts: [a, b], correct: w, shuffle: false, sol: T.de_s2(a, sc(A), b, sc(Bo), [a, b][w]) };
});

// Reparto de las tareas de casa.
def("cid6.reparto", (R, S) => {
  const T = S.cid6, n = R.int(2, 5), h = n * R.int(4, 9);
  return { q: T.re_q(h, n), kind: "int", ans: h / n, sol: T.re_s(h, n, h / n) };
});

// Participación electoral en %.
def("cid6.votos", (R, S) => {
  const T = S.cid6, c = R.pick([400, 500, 800, 1000, 1200, 2000, 2500]), p = R.pick([40, 50, 55, 60, 65, 70, 75, 80, 85]), v = c * p / 100;
  return { q: T.vo_q(c, v), kind: "int", ans: p, sol: T.vo_s(c, v, p) };
});

// IVA: cuota o precio final.
def("cid6.iva", (R, S) => {
  const T = S.cid6, it = R.pick(T.productos), t = it[1], p = R.int(2, 30) * 5;
  const q = +(p * t / 100).toFixed(2);
  if (R.int(0, 1)) return { q: T.iv_q1(it[0], p, t), kind: "num", ans: q, tol: 0.01, sol: T.iv_s1(p, t, q) };
  return { q: T.iv_q2(it[0], p, t), kind: "num", ans: +(p + q).toFixed(2), tol: 0.01, sol: T.iv_s2(p, t, q, +(p + q).toFixed(2)) };
});

// Precio por unidad: ¿cuál sale más barato?
def("cid6.unitario", (R, S) => {
  const T = S.cid6, it = R.pick(T.envases);
  const q1 = it[1], q2 = it[2], u1 = R.int(8, 30) / 10;
  let u2 = R.int(8, 30) / 10;
  while (Math.abs(u2 - u1) < 0.15) u2 = R.int(8, 30) / 10;
  const p1 = +(u1 * q1 / it[3]).toFixed(2), p2 = +(u2 * q2 / it[3]).toFixed(2);
  const r1 = p1 * it[3] / q1, r2 = p2 * it[3] / q2, w = r1 < r2 ? 0 : 1;
  return { q: T.un_q(it, p1, p2), kind: "choice", opts: ["A", "B"], correct: w, shuffle: false, sol: T.un_s(it, p1, p2, r1, r2, ["A", "B"][w]) };
});
})();
