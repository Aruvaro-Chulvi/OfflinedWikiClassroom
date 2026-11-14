/* WikiAula — Informática, Grado 3: hardware y software, almacenamiento, archivos, bloques, internet y ciudadanía digital.
   Textos y bancos en i18n/<lang>/inf3.js (S.inf3). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;
const choice = (R, right, wrong) => { const opts = R.shuffle([right, ...wrong]); return { opts, correct: opts.indexOf(right) }; };

def("inf3.hwsw", (R, S) => B.mixed(S.inf3.hwsw, R));
def("inf3.mem", (R, S) => B.mixed(S.inf3.mem, R));
def("inf3.ext", (R, S) => B.mixed(S.inf3.ext, R));
def("inf3.accion", (R, S) => B.mixed(S.inf3.accion, R));
def("inf3.bloque", (R, S) => B.mixed(S.inf3.bloque, R));
def("inf3.bug", (R, S) => B.mixed(S.inf3.bug, R));
def("inf3.servicio", (R, S) => B.mixed(S.inf3.servicio, R));
def("inf3.fiable", (R, S) => B.mixed(S.inf3.fiable, R));
def("inf3.huella", (R, S) => B.mixed(S.inf3.huella, R));
def("inf3.acoso", (R, S) => B.mixed(S.inf3.acoso, R));
def("inf3.publi", (R, S) => B.mixed(S.inf3.publi, R));

def("inf3.cabe", (R, S) => {
  const T = S.inf3, c = R.pick(T.cosas), size = c[1], n = R.int(3, 12), free = size * n;
  return { q: T.cb_q(free, c), kind: "int", ans: n, sol: T.cb_s(free, size, n) };
});
def("inf3.giro", (R, S) => {
  const T = S.inf3, k = R.int(0, 2);
  if (k === 0) { const a = R.pick([90, 180, 120, 60, 45, 30]); return { q: T.gi_q1(a), kind: "int", ans: 360 / a, sol: T.gi_s1(a) }; }
  if (k === 1) { const [t, a] = R.pick(T.vueltas); return { q: T.gi_q2(t), kind: "int", ans: a, sol: T.gi_s2(t, a) }; }
  const n = R.int(2, 4), a = R.pick([90, 45, 30]);
  return { q: T.gi_q3(n, a), kind: "int", ans: n * a, sol: T.gi_s3(n, a) };
});
def("inf3.pasos", (R, S) => {
  const T = S.inf3, p = R.pick([5, 10, 20, 25, 50]), n = R.int(2, 8);
  return { q: T.pa_q(p, n), kind: "int", ans: p * n, sol: T.pa_s(p, n) };
});
def("inf3.poligono", (R, S) => {
  const T = S.inf3, [name, n] = R.pick(T.polis);
  if (R.int(0, 1)) return { q: T.po_q1(name), kind: "int", ans: 360 / n, sol: T.po_s1(n) };
  return { q: T.po_q2(360 / n), kind: "int", ans: n, sol: T.po_s2(360 / n, n, name) };
});
def("inf3.repite", (R, S) => {
  const T = S.inf3, n = R.int(2, 6), k = R.int(1, 3), [snd, verb] = R.pick(T.sonidos);
  return { q: T.re_q(n, Array(k).fill(snd).join(", ")), kind: "int", ans: n * k, sol: T.re_s(n, k, verb) };
});
def("inf3.clave", (R, S) => {
  const T = S.inf3, [good, bads, topic] = R.pick(T.busq), c = choice(R, good, bads);
  return { q: T.cl_q(topic), kind: "choice", opts: c.opts, correct: c.correct, shuffle: false, sol: T.cl_s(good) };
});
})();
