/* WikiAula — Biología, Geología y Ciencias Ambientales, Grado 11 (1.º de Bachillerato): bancos y problemas.
   Textos y bancos en i18n/<lang>/bg11.js (S.bg11). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("bg11.ciclo", (R, S) => B.mixed(S.bg11.ciclo, R));
def("bg11.clima", (R, S) => B.mixed(S.bg11.clima, R));
def("bg11.biodiv", (R, S) => B.mixed(S.bg11.biodiv, R));
def("bg11.sost", (R, S) => B.mixed(S.bg11.sost, R));
def("bg11.datacion", (R, S) => B.mixed(S.bg11.datacion, R));
def("bg11.evento", (R, S) => B.mixed(S.bg11.evento, R));
def("bg11.hito", (R, S) => B.mixed(S.bg11.hito, R));
def("bg11.taxon", (R, S) => B.mixed(S.bg11.taxon, R));
def("bg11.dinamica", (R, S) => B.mixed(S.bg11.dinamica, R));
def("bg11.metodo", (R, S) => B.mixed(S.bg11.metodo, R));
def("bg11.borde", (R, S) => B.mixed(S.bg11.borde, R));
def("bg11.forma", (R, S) => B.mixed(S.bg11.forma, R));
def("bg11.edafo", (R, S) => B.mixed(S.bg11.edafo, R));
def("bg11.medida", (R, S) => B.mixed(S.bg11.medida, R));
def("bg11.mineral", (R, S) => B.mixed(S.bg11.mineral, R));
def("bg11.roca", (R, S) => B.mixed(S.bg11.roca, R));
def("bg11.nutanimal", (R, S) => B.mixed(S.bg11.nutanimal, R));
def("bg11.relanimal", (R, S) => B.mixed(S.bg11.relanimal, R));
def("bg11.repanimal", (R, S) => B.mixed(S.bg11.repanimal, R));
def("bg11.nutveg", (R, S) => B.mixed(S.bg11.nutveg, R));
def("bg11.hormona", (R, S) => B.mixed(S.bg11.hormona, R));
def("bg11.repveg", (R, S) => B.mixed(S.bg11.repveg, R));
def("bg11.adapveg", (R, S) => B.mixed(S.bg11.adapveg, R));
def("bg11.micro", (R, S) => B.mixed(S.bg11.micro, R));
def("bg11.acelular", (R, S) => B.mixed(S.bg11.acelular, R));
def("bg11.transfer", (R, S) => B.mixed(S.bg11.transfer, R));

const r1 = x => Math.round(x * 10) / 10;

def("bg11.eficiencia", (R, S, H) => {
  const T = S.bg11, [na, nb] = R.pick(T.ef_lv), a = R.pick([2000, 5000, 8000, 10000, 20000, 40000]), pct = R.pick([4, 5, 7.5, 8, 10, 12, 15]), b = a * pct / 100;
  return { q: T.ef_q(H.n(a), na, H.n(b), nb), kind: "num", ans: pct, tol: 0.05, sol: T.ef_s(H.n(a), H.n(b), H.dec(pct)) };
});
def("bg11.produccion", (R, S, H) => {
  const T = S.bg11;
  if (R.r() < 0.6) {
    const b = R.pick([10000, 20000, 25000, 30000, 40000]), r = b * R.pick([0.4, 0.5, 0.6, 0.7]), n = b - r;
    return { q: T.pr_q(H.n(b), H.n(r)), kind: "int", ans: n, sol: T.pr_s(H.n(b), H.n(r), H.n(n)) };
  }
  const bio = R.pick([20, 30, 40, 60]), p = R.pick([1, 2, 4, 5]), t = bio / p;
  return { q: T.pr_q2(bio, p), kind: "num", ans: t, tol: 0.05, sol: T.pr_s2(bio, p, H.dec(t)) };
});
def("bg11.co2", (R, S, H) => {
  const T = S.bg11, pts = [[1960, 317], [1970, 326], [1980, 339], [1990, 354], [2000, 369], [2010, 390], [2020, 414], [2024, 422]];
  const i = R.int(0, pts.length - 2), j = R.int(i + 1, pts.length - 1), [y1, c1] = pts[i], [y2, c2] = pts[j], n = y2 - y1, r = Math.round((c2 - c1) / n * 100) / 100;
  return { q: T.co_q(y1, c1, y2, c2), kind: "num", ans: r, tol: 0.02, sol: T.co_s(c1, c2, n, H.dec(r)) };
});
def("bg11.magnif", (R, S, H) => {
  const T = S.bg11, c0 = R.pick([0.0001, 0.001, 0.00005]), f = R.pick([5, 10]), n = R.int(2, 4), r = c0 * f ** n;
  return { q: T.mg_q(H.dec(c0), f, n), kind: "num", ans: r, tol: r * 0.01, sol: T.mg_s(H.dec(c0), f, n, H.dec(r)) };
});
def("bg11.huella", (R, S, H) => {
  const T = S.bg11, b = 1.6, h = R.pick([0.8, 1.6, 2.4, 3.2, 4.8, 6.4, 8]), r = r1(h / b);
  return { q: T.hu_q(H.dec(h), H.dec(b)), kind: "num", ans: r, tol: 0.05, sol: T.hu_s(H.dec(h), H.dec(b), H.dec(r)) };
});
def("bg11.semivida", (R, S, H) => {
  const T = S.bg11, [iso, t] = R.pick([["carbono-14", 5730], ["potasio-40", 1300000000], ["uranio-238", 4500000000]]);
  const [p, n] = R.pick([[50, 1], [25, 2], [12.5, 3], [6.25, 4]]), r = t * n;
  return { q: T.sv_q(iso, H.n(t), H.dec(p)), kind: "int", ans: r, sol: T.sv_s(H.n(t), n, H.n(r)) };
});
def("bg11.sismo", (R, S, H) => {
  const T = S.bg11, dt = R.int(5, 90), r = dt * 8;
  return { q: T.sis_q(dt), kind: "int", ans: r, sol: T.sis_s(dt, H.n(r)) };
});
def("bg11.textura", (R, S) => {
  const T = S.bg11;
  const cases = [[[80, 12, 8], 0], [[85, 10, 5], 0], [[40, 40, 20], 1], [[42, 38, 20], 1], [[20, 20, 60], 2], [[15, 25, 60], 2], [[10, 80, 10], 3], [[15, 75, 10], 3]];
  const [[a, l, c], k] = R.pick(cases);
  return { q: T.tex_q(a, l, c), kind: "choice", opts: T.tex_ops.slice(), correct: k, sol: T.tex_s };
});
def("bg11.riesgo", (R, S, H) => {
  const T = S.bg11, Tr = R.pick([10, 25, 50, 100, 500]), n = R.pick([10, 30, 50]), r = Math.round((1 - (1 - 1 / Tr) ** n) * 1000) / 10;
  return { q: T.ri_q(Tr, n), kind: "num", ans: r, tol: 0.5, sol: T.ri_s(Tr, n, H.dec(r)) };
});
def("bg11.fotosint", (R, S, H) => {
  const T = S.bg11, n = R.int(2, 50), r = n * 6;
  return { q: T.fo_q(n), kind: "int", ans: r, sol: T.fo_s(n, H.n(r)) };
});
def("bg11.crecimiento", (R, S, H) => {
  const T = S.bg11, min = R.pick([20, 30, 60]), h = R.int(1, 5), n = h * 60 / min, r = 2 ** n;
  return { q: T.cr_q(min, h), kind: "int", ans: r, sol: T.cr_s(n, H.n(r)) };
});
})();
