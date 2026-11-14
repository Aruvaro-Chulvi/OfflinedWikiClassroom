/* WikiAula — Música, Grado 9: música en España, grabación y muestreo, estudio, formatos y bitrate, música y salud, derechos de autor,
   composición de canciones y profesiones. Textos y bancos en i18n/<lang>/mus9.js (S.mus9). */
"use strict";
(function () {
const WA = window.WA, def = WA.def, B = WA.BANK;

def("mus9.antigua", (R, S) => B.mixed(S.mus9.antigua, R));
def("mus9.moderna", (R, S) => B.mixed(S.mus9.moderna, R));
def("mus9.actual", (R, S) => B.mixed(S.mus9.actual, R));
def("mus9.estudio", (R, S) => B.mixed(S.mus9.estudio, R));
def("mus9.formato", (R, S) => B.mixed(S.mus9.formato, R));
def("mus9.salud", (R, S) => B.mixed(S.mus9.salud, R));
def("mus9.derechos", (R, S) => B.mixed(S.mus9.derechos, R));
def("mus9.cancion", (R, S) => B.mixed(S.mus9.cancion, R));
def("mus9.profesion", (R, S) => B.mixed(S.mus9.profesion, R));

// Muestras = frecuencia × segundos × canales (o bytes con la profundidad de bits).
def("mus9.muestreo", (R, S) => {
  const T = S.mus9, fs = R.pick([8000, 22050, 44100, 48000]), s = R.pick([1, 2, 5, 10, 30, 60]), ch = R.pick([1, 2]);
  const n = fs * s * ch;
  if (R.int(0, 1) === 0) return { q: T.mu_q(fs, s, ch), kind: "int", ans: n, sol: T.mu_s(fs, s, ch, n) };
  const bits = R.pick([8, 16, 24]), kb = n * bits / 8 / 1000;
  return { q: T.by_q(fs, s, ch, bits), kind: "num", ans: kb, tol: 0.5, sol: T.by_s(n, bits, kb) };
});

// Tamaño (kB) = kbps × segundos ÷ 8.
def("mus9.bitrate", (R, S) => {
  const T = S.mus9, k = R.pick([64, 96, 128, 192, 256, 320]), s = R.pick([30, 60, 120, 180, 200, 240]);
  return { q: T.bi_q(k, s), kind: "int", ans: k * s / 8, sol: T.bi_s(k, s) };
});
})();
