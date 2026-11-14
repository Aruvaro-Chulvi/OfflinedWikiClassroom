/* WikiAula — textos de gen/mat11u1.js (Grado 11 · Unidad 1: Números reales), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  int_q: d => `¿Qué intervalo corresponde a <b>${d}</b>?`,
  int_s: (r, why) => `${why} Es el intervalo <b>${r}</b>.`,
  iv_t: {
    ext: (v, inc) => `El ${v} ${inc ? "se incluye: corchete." : "no se incluye: paréntesis."}`,
    inf: "Por el otro lado no tiene fin: en el infinito siempre va paréntesis.",
    q1: (a, b, op) => `Si A = ${a} y B = ${b}, ¿cuánto vale <b>A ${op} B</b>?`,
    s1: (lo, loI, hi, hiI, ok) => `Lo común empieza en el mayor de los extremos izquierdos, ${lo}, ${loI ? "que está en los dos (corchete)" : "que no está en alguno de los dos (paréntesis)"}, y acaba en el menor de los derechos, ${hi}, ${hiI ? "que está en los dos (corchete)" : "que no está en alguno de los dos (paréntesis)"}. Dibújalos uno encima de otro para comprobarlo: <b>${ok}</b>.`,
    s1v: (X, e, s) => `${X} acaba en ${e} y el otro empieza en ${s}: no tienen ningún número en común. La intersección es el <b>conjunto vacío, ∅</b>.`,
    s2: (L, LI, U, UI, ok) => `Se solapan, así que la unión es un solo intervalo, sin huecos. Empieza en el menor de los extremos izquierdos, ${L}, ${LI ? "que entra (corchete)" : "que no entra (paréntesis)"}, y acaba en el mayor de los derechos, ${U}, ${UI ? "que entra (corchete)" : "que no entra (paréntesis)"}: <b>${ok}</b>.`,
    q3: e => `Escribe como intervalo (o unión de intervalos) el entorno <b>${e}</b>.`,
    s3: (c, r, lo, hi, ok) => `Son los números a menos de ${r} del ${c}, sin los extremos: de ${c} − ${r} = ${lo} a ${c} + ${r} = ${hi}. Resultado: <b>${ok}</b>.`,
    s3r: (c, r, lo, hi, ok) => `Es el entorno E(${c}, ${r}) = (${lo}, ${hi}) sin el centro: se quita el ${c}, que parte el intervalo en dos trozos. Resultado: <b>${ok}</b>.`,
  },
  abs_q: e => `Resuelve: <b>${e}</b>`,
  abs_hint: "Escribe las dos soluciones separadas por una coma, de menor a mayor.",
  abs_eq_s: (sa, a, r, x1, x2) => `|${sa}| = ${r} significa que x está a distancia ${r} de ${a}: x = ${x1} o x = ${x2}.`,
  abs_in_s: (sa, a, r, lo, hi, res, lt, eq) => lt
    ? `|${sa}| ${eq ? "≤" : "&lt;"} ${r}: los puntos que están a ${eq ? `${r} o menos` : `menos de ${r}`} de ${a}, es decir, ${lo} ${eq ? "≤" : "&lt;"} x ${eq ? "≤" : "&lt;"} ${hi}${eq ? " (con los extremos: corchetes)" : ""}: <b>${res}</b>.`
    : `|${sa}| ${eq ? "≥" : "&gt;"} ${r}: los puntos que están a ${eq ? `${r} o más` : `más de ${r}`} de ${a}, es decir, x ${eq ? "≤" : "&lt;"} ${lo} o x ${eq ? "≥" : "&gt;"} ${hi}${eq ? " (con los extremos: corchetes)" : ""}: <b>${res}</b>.`,
  ia_t: {
    q: e => `Resuelve: <b>${e}</b>`,
    none: r => `Un valor absoluto nunca es negativo, así que no puede ser menor que ${r}: no hay ninguna solución. Resultado: <b>∅</b>.`,
    all: r => `Un valor absoluto nunca es negativo, así que siempre es mayor que ${r}: vale cualquier número. Resultado: <b>(−∞, +∞)</b>.`,
    minus: b => `Restamos ${b}`, plus: b => `Sumamos ${b}`, es: "es decir,",
    slt: (A, op, r, mid, sub, m, negm, after, ok) => `|${A}| ${op} ${r} equivale a −${r} ${op} ${A} ${op} ${r}. ${sub} en los tres miembros: ${mid}. Dividimos entre ${m}${negm ? ", que es negativo, así que las desigualdades cambian de sentido" : ""}: ${after}. Resultado: <b>${ok}</b>.`,
    sgt: (A, op, oL, r, p1, p2, negm, ok) => `|${A}| ${op} ${r} se parte en dos: ${A} ${oL} −${r} o ${A} ${op} ${r}. Primera: ${p1}. Segunda: ${p2}${negm ? " (al dividir entre un número negativo, la desigualdad cambia de sentido)" : ""}. Resultado: <b>${ok}</b>.`,
  },
  rad_q: (e, cube) => `Extrae factores del radical y escríbelo como ${cube ? "a∛b" : "a√b"}, con b lo más pequeño posible: <b>${e}</b>`,
  rad_f: ["a (fuera)", "b (dentro)"],
  rad_s: (r, n, fs, grp, cube, out, a, ins, b) => `Descomponemos ${n} = ${fs}${grp ? " = " + grp : ""}. Por cada grupo de ${cube ? "tres" : "dos"} factores iguales sale uno fuera de la raíz: fuera queda ${out}${out === String(a) ? "" : " = " + a} y dentro, ${ins}${ins === String(b) ? "" : " = " + b}. Así, ${r}${n} = <b>${a}${r}${b}</b>.`,
  radsum_q: e => `Calcula y expresa el resultado como un múltiplo de un radical: <b>${e}</b>`,
  radsum_f: (r) => [`Coeficiente de √${r}`],
  radsum_s: (ext, sub, sum, k, res) => `Extraemos factores: ${ext}. Sustituimos: ${sub}. Son semejantes, así que se suman los coeficientes: ${sum} = ${k}. Resultado: <b>${res}</b>.`,
  racio_q: e => `Racionaliza: <b>${e}</b>`,
  racio_s: [
    (b, st, g, r) => `Multiplicamos numerador y denominador por √${b}: ${st}${g ? ` = <b>${r}</b> (simplificando entre ${g})` : ""}.${g ? "" : ` Resultado: <b>${r}</b>.`}`,
    (conj, st, d, r) => `El denominador es un binomio: multiplicamos numerador y denominador por su conjugado, ${conj}. Así, ${st}${d === 1 ? ` = <b>${r}</b>.` : d === -1 ? `. Dividir entre −1 es cambiar el signo: <b>${r}</b>.` : d < 0 ? `. Como el denominador es negativo, pasamos el signo arriba: <b>${r}</b>.` : `. Resultado: <b>${r}</b>.`}`,
  ],
  log_q: e => `Calcula: <b>${e}</b>`,
  log_s: (b, x, r) => `El logaritmo es el exponente: ${b}<sup>${r}</sup> = ${x}, así que el resultado es <b>${r}</b>.`,
  logp_q: (e, vals) => `Sabiendo que ${vals}, calcula <b>${e}</b> (redondea a las milésimas).`,
  logp_s: (dec, sub, r) => `Descomponemos con las propiedades de los logaritmos y sustituimos: ${dec} ≈ ${sub}${/=/.test(sub) ? " ≈ " : " = "}<b>${r}</b>.`,
  logeq_q: e => `Resuelve la ecuación: <b>${e}</b>`,
  logeq_s: s => `${s}`,
  logeq_disc: (st, o, x) => `${st}. Con x = −${o} aparece log(−${o}), que no existe (solo hay logaritmos de positivos): la descartamos. Solución: <b>x = ${x}</b>.`,
  lf_t: {
    s0: (b, p, m, a, n, r) => `${b} = ${p}${m === 1 ? "" : "<sup>" + m + "</sup>"} y ${a} = ${p}${n}. Buscamos el exponente y con (${p}<sup>${m}</sup>)<sup>y</sup> = ${p}${n}: ${m}y = ${n.replace("⁻", "−").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c))}, así que y = <b>${r}</b>.`,
    s1: (p, a, n, nn, r) => `1/${p} = ${p}⁻¹ y ${a} = ${p}${n}. Buscamos y con (${p}⁻¹)<sup>y</sup> = ${p}<sup>−y</sup> = ${p}${n}: −y = ${nn < 0 ? "−" + -nn : nn}, así que y = <b>${r}</b>.`,
    s2: (rad, x, n, p, e, inv, r, nm) => `Pasamos la raíz a potencia: ${rad} = ${x === String(p) ? "" : `${x}<sup>1/${n}</sup> = `}${p}<sup>${e}</sup>${inv ? `, y al estar en el denominador, 1/${rad} = ${p}<sup>−${e}</sup>` : ""}. El logaritmo es el exponente: ${nm} = <b>${r}</b>.`,
    s3: (a, pw, r) => `ln es el logaritmo en base e. ${a === pw ? `${a} ya es una potencia de e.` : `Escribimos ${a} como potencia de e: ${a} = ${pw}.`} El logaritmo es el exponente: <b>${r}</b>.`,
  },
  xl_t: {
    q0: e => `Resuelve la ecuación <b>${e}</b> (redondea a las centésimas).`,
    s0: (a, b, lhs, xe, lb, la, v, end) => `${b} no es una potencia exacta de ${a}: tomamos logaritmos en los dos miembros y bajamos el exponente. ${lhs} · log ${a} = log ${b}, así que ${xe} = log ${b} / log ${a} ≈ ${lb} / ${la} ≈ ${v}.${end ? " Despejamos: " + end + "." : ""} Solución: <b>x ≈ ${end ? end.split(" = ").pop() : v}</b>.`,
    s1: (n, nm, N, st, o, x) => `Hay un número suelto: lo escribimos como logaritmo, ${n} = ${nm} ${N}. Juntamos los logaritmos con la propiedad del producto: ${st}. Con x = −${o} aparece ${nm}(−${o}), que no existe: la descartamos. Solución: <b>x = ${x}</b>.`,
    s2: (a, b, ab, x, p1, p2) => `Escribimos 1 = log 10 y juntamos con la propiedad del cociente: log[(x + ${a})/(x − ${b})] = log 10 → (x + ${a})/(x − ${b}) = 10 → x + ${a} = 10x − ${10 * b} → 9x = ${ab} → x = ${x}. Comprobamos: x + ${a} = ${p1} y x − ${b} = ${p2} son positivos, así que vale. Solución: <b>x = ${x}</b>.`,
    q3: (e1, e2) => `Resuelve el sistema: <b>${e1}</b> ; <b>${e2}</b>`,
    s3: (n, N, d, y, x) => `La primera es log(xy) = ${n} = log ${N}, así que xy = ${N}. De la segunda, x = y + ${d}. Sustituimos: (y + ${d}) · y = ${N} → y² + ${d}y − ${N} = 0 → y = ${y} o y = −${x}. Con y negativo no existe log y, así que y = ${y} y x = ${y} + ${d} = ${x}. Solución: <b>x = ${x}, y = ${y}</b>.`,
    s3b: (s, y, x) => `La primera es log(x/y) = 1 = log 10, así que x/y = 10 y x = 10y. Sustituimos en la segunda: 10y + y = ${s} → 11y = ${s} → y = ${y}, y x = 10 · ${y} = ${x}. Los dos son positivos: vale. Solución: <b>x = ${x}, y = ${y}</b>.`,
  },
  ix_t: {
    q0: e => `Escribe como un solo radical: <b>${e}</b>`,
    s0: (n1, n2, L, r1, r2, res) => `Las bases son distintas: hay que pasar a índice común, el m.c.m. de ${n1} y ${n2}, que es ${L}. Multiplicamos índice y exponente por el mismo número: ${r1} y ${r2}. Con el mismo índice se multiplican los radicandos: ${res}.`,
    q1: e => `Simplifica el índice del radical <b>${e}</b>.`,
    s1: (rad, x, pw, e, e2, r) => `Pasamos a potencia: ${x} = ${pw}, así que ${rad} = ${pw.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/, "")}<sup>${e}</sup>. Simplificamos la fracción del exponente: ${e} = ${e2}. Volvemos a radical: <b>${r}</b>.`,
    q2: (p, e) => `Escribe como una potencia de ${p} y da el exponente: <b>${e}</b>`,
    s2: (each, sum, com, raw, r, p) => `Pasamos cada radical a potencia: ${each}. Al multiplicar se suman los exponentes y al dividir se restan: ${sum} = ${com}${raw ? " = " + raw : ""} = ${r}. Resultado: <b>${p}<sup>${r}</sup></b>, así que el exponente es <b>${r}</b>.`,
  },
});
})();
