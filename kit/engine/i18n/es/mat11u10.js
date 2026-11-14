/* WikiAula — textos de gen/mat11u10.js (Grado 11 · Unidad 10: Derivadas), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  de_hint: "Escribe la derivada en x: 6x^2 − 4, 3/(2*sqrt(x)), e^(2x), 5cos(5x), ln(x)…",
  de_vm_q: (p, t1, t2) => `Un objeto recorre s(t) = ${p}t² metros en t segundos. ¿Cuál es su velocidad media (en m/s) entre t = ${t1} y t = ${t2}?`,
  de_vm_s: (p, t1, t2, s1, s2, v) => `Velocidad media = (s(${t2}) − s(${t1}))/(${t2} − ${t1}) = (${s2} − ${s1})/${t2 - t1} = <b>${v} m/s</b>.`,
  de_tvm_q: (f, a, b) => `Calcula la tasa de variación media de f(x) = ${f} en el intervalo [${a}, ${b}].`,
  de_tvm_s: (a, b, fa, fb, d, v) => `TVM = (f(${b}) − f(${a}))/(${b} − ${a[0] === "−" ? "(" + a + ")" : a}) = (${fb} − ${fa === "0" || fa[0] !== "−" ? fa : "(" + fa + ")"})/${d} = <b>${v}</b>.`,
  de_def_q: (f, a) => `Usando la definición, calcula la derivada de f(x) = ${f} en x = ${a}.`,
  de_def_s: (a, e, v) => `f′(${a}) = lim<sub>h→0</sub> [f(${a} + h) − f(${a})]/h. Desarrollando y simplificando, el cociente queda ${e}, que tiende a <b>${v}</b> cuando h → 0.`,
  de_def_s2: (a, sub, exp, fa, dif, quo, v) => `f′(${a}) = lim<sub>h→0</sub> [f(${a} + h) − f(${a})]/h. Desarrollamos: f(${a} + h) = ${sub} = ${exp}; y f(${a}) = ${fa}. Restando y dividiendo entre h: (${dif})/h = ${quo}, que tiende a <b>${v}</b> cuando h → 0.`,
  de_set_hint: "Escribe las abscisas separadas por comas. Ejemplo: −2, 2",
  de_ch_s2: (o, od, u, du, d) => `Regla de la cadena. Fuera: ${o}, cuya derivada es ${od}; dentro: u = ${u}, con u′ = ${du}. Se deriva la de fuera dejando u igual y se multiplica por u′: f′(x) = <b>${d}</b>.`,
  dl_t: {
    q: (f, c) => `Sea ${f}. Es continua en x = ${c}. Calcula sus derivadas laterales en x = ${c}.`,
    f: ["f′ por la izquierda", "f′ por la derecha"],
    s: (c, L, d1, cuenta, dl, m, ok) => `Los dos trozos valen ${L} en x = ${c}: es continua. Por la izquierda se deriva el primer trozo: f′(x) = ${d1}, que en x = ${c} vale ${cuenta} = ${dl}. Por la derecha, el segundo es una recta de pendiente ${m}. ${ok ? "Coinciden: f es <b>derivable</b> en x = " + c + "." : "Son distintas: hay un pico y f <b>no es derivable</b> en x = " + c + "."}`,
  },
  tc_t: {
    q0: (f, r) => `¿En qué punto la tangente a la gráfica de f(x) = ${f} es paralela a la recta ${r}?`,
    s0: (fp, m, fp2, x0, y0) => `Paralela significa con la misma pendiente, ${m}. Como f′(x) = ${fp}, igualamos: ${fp2} = ${m} → x = ${x0}. El punto es (${x0}, f(${x0})) = <b>(${x0}, ${y0})</b>.`,
    q1: f => `¿En qué abscisas tiene f(x) = ${f} tangente horizontal?`,
    s1: (fp, a2, a) => `Tangente horizontal significa pendiente 0: f′(x) = ${fp} = 0 → x² = ${a2} → <b>x = −${a} y x = ${a}</b>.`,
    q2: (f, a) => `Calcula la ecuación de la recta normal a la gráfica de f(x) = ${f} en el punto de abscisa x = ${a}.`,
    s2: (a, fa, fp, m, mn, r) => `Punto: (${a}, ${fa}). Pendiente de la tangente: f′(x) = ${fp}, f′(${a}) = ${m}. La normal es perpendicular a la tangente: su pendiente es −1/${m.startsWith("−") ? `(${m})` : m} = ${mn}. Recta: <b>${r}</b>.`,
    q3: P => `¿Qué rectas tangentes a la parábola y = x² pasan por el punto exterior P${P}?`,
    s3: (p, q, eq, t1, t2, ok) => `El punto P no está en la curva: no conocemos la pendiente. La tangente en un punto (t, t²) es y − t² = 2t(x − t), es decir, y = 2tx − t². Obligamos a que pase por P(${p}, ${q}): ${q} = 2t · ${p.startsWith("−") ? `(${p})` : p} − t², es decir, ${eq} → t = ${t1} o t = ${t2}. Tangentes: <b>${ok}</b>.`,
    s4: (c, k, r) => `Punto: f(0) = e⁰ = 1. Pendiente: f′(x) = ${k}e<sup>${c}x</sup> (regla de la cadena), así que f′(0) = ${k}. Recta: <b>${r}</b>.`,
    s5: "Punto: f(1) = ln 1 = 0. Pendiente: f′(x) = 1/x, así que f′(1) = 1. Recta: y − 0 = 1 · (x − 1), es decir, <b>y = x − 1</b>.",
  },
  de_q: f => `Deriva la función <b>${f}</b>.`,
  de_poli_s: d => `Se deriva término a término: (a·xⁿ)′ = a·n·xⁿ⁻¹ y la derivada de una constante es 0. f′(x) = <b>${d}</b>.`,
  de_rg_s: (k, d, pre, st) => [
    "Regla de la potencia: (a·xⁿ)′ = a·n·xⁿ⁻¹.",
    "(√x)′ = 1/(2√x), multiplicado por el coeficiente.",
    "Se escribe como potencia de exponente negativo: a/xⁿ = a·x⁻ⁿ, y se aplica la regla de la potencia.",
    "(eˣ)′ = eˣ y (ln x)′ = 1/x.",
    "(sen x)′ = cos x y (cos x)′ = −sen x.",
    "Regla del producto: (u·v)′ = u′·v + u·v′.",
    "Regla del cociente: (u/v)′ = (u′·v − u·v′)/v².",
    "Con el cambio de base, log<sub>b</sub> x = ln x / ln b, una constante por ln x: (log<sub>b</sub> x)′ = 1/(x ln b).",
  ][k] + (st ? ` Aquí ${st}.` : "") + (pre ? ` f′(x) = ${pre} = <b>${d}</b> (simplificando).` : ` f′(x) = <b>${d}</b>.`),
  de_ch_s: (u, du, d) => `Regla de la cadena: la función de dentro es u = ${u}, con u′ = ${du}. Se deriva la de fuera dejando u igual y se multiplica por u′: f′(x) = <b>${d}</b>.`,
  de_tg_q: (f, a) => `Calcula la ecuación de la recta tangente a la gráfica de f(x) = ${f} en el punto de abscisa x = ${a}.`,
  de_tg_hint: "Escribe la recta en la forma y = mx + n, por ejemplo y = 3x − 2.",
  de_tg_s: (a, fa, d, m, ps, r) => `Punto: f(${a}) = ${fa}. Pendiente: f′(x) = ${d}, así que m = f′(${a}) = ${m}. Recta: ${ps} → <b>y = ${r}</b>.`,
});
})();
