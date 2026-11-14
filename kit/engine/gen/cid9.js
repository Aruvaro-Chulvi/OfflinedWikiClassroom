/* WikiAula — Ciudadanía y ética, Grado 9: Estado, democracia, separación de poderes, Constitución, instituciones, ley D'Hondt,
   autonomías, participación, medios, corrupción, UE y ONU. Textos y bancos en i18n/<lang>/cid9.js (S.cid9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("cid9.forma", (R, S) => B.mixed(S.cid9.forma, R));
def("cid9.democracia", (R, S) => B.mixed(S.cid9.democracia, R));
def("cid9.poder", (R, S) => B.mixed(S.cid9.poder, R));
def("cid9.titulo", (R, S) => B.mixed(S.cid9.titulo, R));
def("cid9.institucion", (R, S) => B.mixed(S.cid9.institucion, R));
def("cid9.competencia", (R, S) => B.mixed(S.cid9.competencia, R));
def("cid9.participa", (R, S) => B.mixed(S.cid9.participa, R));
def("cid9.medio", (R, S) => B.mixed(S.cid9.medio, R));
def("cid9.corrupcion", (R, S) => B.mixed(S.cid9.corrupcion, R));
def("cid9.ue", (R, S) => B.mixed(S.cid9.ue, R));
def("cid9.onu", (R, S) => B.mixed(S.cid9.onu, R));

// Mayoría absoluta en el Congreso (176 de 350).
def("cid9.mayoria", (R, S) => {
  const T = S.cid9, a = R.int(60, 160), b = R.int(10, 60), s = a + b;
  if (s === 176) return null;
  if (R.int(0, 1) || s >= 176) return { q: T.ma_q1(a, b), kind: "choice", opts: T.sino, correct: s >= 176 ? 0 : 1, shuffle: false, sol: T.ma_s1(a, b, s) };
  return { q: T.ma_q2(a, b), kind: "int", ans: 176 - s, sol: T.ma_s2(a, b, s, 176 - s) };
});

// Reparto de escaños con la ley D'Hondt (sin empates en el corte).
def("cid9.dhondt", (R, S) => {
  const T = S.cid9, n = R.int(3, 4), seats = R.int(3, 7), names = ["A", "B", "C", "D"].slice(0, n);
  const votes = names.map(() => R.int(10, 120) * 10).sort((x, y) => y - x);
  if (new Set(votes).size < n) return null;
  const q = [];
  names.forEach((p, i) => { for (let d = 1; d <= seats; d++) q.push({ p, i, d, v: votes[i] / d }); });
  q.sort((x, y) => y.v - x.v);
  if (Math.abs(q[seats - 1].v - q[seats].v) < 1e-9) return null;
  const won = names.map((p, i) => q.slice(0, seats).filter(x => x.i === i).length);
  const k = R.int(0, n - 1);
  return { q: T.dh_q(names, votes, seats, names[k]), kind: "int", ans: won[k], sol: T.dh_s(q.slice(0, seats), names, won) };
});
})();
