/* WikiAula — textos de gen/mat11u8.js (Grado 11 · Unidad 8: Funciones), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m11 = G.m11 || {};
Object.assign(S, {
  fu_hint: "Escribe la expresión en x, por ejemplo 3x^2 − 2x + 1, (x − 4)/2, ln(x + 1) o e^(x − 2).",
  fu_dom_q: f => `¿Cuál es el dominio de la función <b>f(x) = ${f}</b>?`,
  fu_dom_s: (k, a, ok) => [
    `Una fracción no existe cuando su denominador vale 0: x = ${a} queda fuera. Dominio: <b>${ok}</b>.`,
    `La raíz cuadrada necesita un radicando ≥ 0: x ≥ ${a}. Dominio: <b>${ok}</b>.`,
    `La raíz cuadrada necesita un radicando ≥ 0: x ≤ ${a}. Dominio: <b>${ok}</b>.`,
    `El logaritmo solo existe para valores positivos: x &gt; ${a}. Dominio: <b>${ok}</b>.`,
    `El denominador se anula cuando x² = ${ok.replace(/.*\{−(\d+).*/, (m, b) => b * b)}, es decir, en x = ±${ok.replace(/.*\{−(\d+).*/, "$1")}. Dominio: <b>${ok}</b>.`,
    `El denominador x² + … es siempre positivo, nunca vale 0. Dominio: <b>ℝ</b>.`,
    `Un polinomio se puede calcular para cualquier número real. Dominio: <b>ℝ</b>.`,
  ][k],
  fd_t: {
    s0: (fr, a, b, lo, hi, ok) => `La raíz necesita ${fr} ≥ 0. Puntos: ${a} (anula el numerador: ahí la fracción vale 0 y entra) y ${b} (anula el denominador: nunca entra). Tabla de signos: el cociente es positivo fuera de ${lo} y ${hi} y negativo entre ellos. Dominio: <b>${ok}</b>.`,
    s1: (b2, b, ok) => `El logaritmo necesita x² − ${b2} &gt; 0, es decir, x² &gt; ${b2}. La parábola x² − ${b2} es positiva fuera de sus raíces, −${b} y ${b} (que no entran: el logaritmo de 0 no existe). Dominio: <b>${ok}</b>.`,
    s2: (e, f, lo, hi, ok) => `La raíz necesita ${e} ≥ 0. Factorizamos: ${e} = ${f}, con raíces ${lo} y ${hi}; la parábola es positiva fuera de ellas y vale 0 en ellas (entran). Dominio: <b>${ok}</b>.`,
    s3: (a, b, ok) => `Dos condiciones: el radicando, x ≥ ${a}, y el denominador, x ≠ ${b}. El dominio es la intersección: <b>${ok}</b>.`,
  },
  fu_rec_d: (eq, s1, s2, s3, a, ok) => `Despejamos x: ${eq} → ${s1} → (agrupando las x) ${s2} → ${s3}. Esa x existe para cualquier y salvo y = ${a}, que anula el denominador. Recorrido: <b>${ok}</b>.`,
  fu_rec_q: f => `¿Cuál es el recorrido (imagen) de la función <b>f(x) = ${f}</b>?`,
  fu_rec_s: (k, v, z, s) => [
    `Un cuadrado nunca es negativo: ${s}² ≥ 0, así que f(x) ≥ ${z}, y alcanza ese valor en el vértice. Recorrido: <b>[${v}, +∞)</b>.`,
    `−(…)² nunca es positivo, así que f(x) ≤ ${v}: el vértice es un máximo. Recorrido: <b>(−∞, ${v}]</b>.`,
    `La raíz toma todos los valores ≥ 0; al sumar ${v}, f(x) ≥ ${v}. Recorrido: <b>[${v}, +∞)</b>.`,
    `eˣ toma todos los valores positivos, pero nunca 0; al sumar ${v}, f(x) &gt; ${v}. Recorrido: <b>(${v}, +∞)</b>.`,
    `1/(…) toma todos los valores salvo 0 (la asíntota horizontal); al sumar ${v}, nunca vale ${v}. Recorrido: <b>ℝ − {${v}}</b>.`,
  ][k],
  fu_sim_q: f => `¿Qué simetría tiene la función <b>f(x) = ${f}</b>?`,
  fu_sim_o: ["Es par (simétrica respecto al eje Y)", "Es impar (simétrica respecto al origen)", "No es par ni impar"],
  fu_sim_s: (k, m) => `Calculamos f(−x) = ${m}. ` + [
    "Es igual a f(x): la función es <b>par</b> (solo tiene potencias pares de x).",
    "Es igual a −f(x): la función es <b>impar</b> (solo tiene potencias impares de x).",
    "No es ni f(x) ni −f(x): <b>no es par ni impar</b> (mezcla potencias pares e impares).",
  ][k],
  fu_sim_s2: (m, k) => `Calculamos f(−x) = ${m}. ` + ["Es igual a f(x): la función es <b>par</b>.", "Es igual a −f(x): la función es <b>impar</b>.", "No es ni f(x) ni −f(x): <b>no es par ni impar</b>."][k],
  fc_t: {
    pair: (f, g) => `f(x) = ${f} y g(x) = ${g}`,
    q0: h => `Queremos escribir h(x) = ${h} como g(f(x)). ¿Cuáles son f (la de dentro, la que se aplica primero) y g?`,
    s0: (inn, n) => `Lo primero que se hace con x es calcular ${inn}: es la función de dentro, <b>f(x) = ${inn}</b>. Después se eleva a ${n}: <b>g(x) = x<sup>${n}</sup></b>. Comprobación: g(f(x)) = (${inn})<sup>${n}</sup> ✓.`,
    q1: f => `Si f(x) = ${f} y g(x) = √x, ¿cuál es el dominio de g ∘ f?`,
    s1: (f, a, ok) => `(g ∘ f)(x) = √(${f}). f existe siempre, pero g necesita que lo que le llega, ${f}, sea ≥ 0: x ≥ ${a}. Dominio: <b>${ok}</b>.`,
  },
  fu_cn_q: (op, f, g, t) => `Si f(x) = ${f} y g(x) = ${g}, calcula <b>(${op})(${t})</b>.`,
  fu_cn_s: (p, t, pt, q, r) => `Primero se aplica ${p}: ${p}(${t}) = ${pt}. Después ${q}: ${q}(${pt}) = <b>${r}</b>.`,
  fu_cx_q: (op, f, g) => `Si f(x) = ${f} y g(x) = ${g}, calcula la expresión de <b>(${op})(x)</b>.`,
  fu_cx_s: (paso, r) => `${paso} = <b>${r}</b>.`,
  fu_inv_q: f => `Calcula la función inversa de <b>f(x) = ${f}</b>.`,
  fu_inv_s: (k, r) => [
    `Escribimos y = f(x), despejamos x y cambiamos los nombres de las variables: <b>f⁻¹(x) = ${r}</b>.`,
    `Escribimos y = f(x), despejamos x (multiplicando y luego restando) y cambiamos los nombres: <b>f⁻¹(x) = ${r}</b>.`,
    `y = eˣ + c → eˣ = y − c → x = ln(y − c). Cambiando los nombres: <b>f⁻¹(x) = ${r}</b> (la exponencial y el logaritmo son inversos).`,
    `y = ln x + c → ln x = y − c → x = e^(y − c). Cambiando los nombres: <b>f⁻¹(x) = ${r}</b>.`,
    `y = a/(x − b) → x − b = a/y → x = a/y + b. Cambiando los nombres: <b>f⁻¹(x) = ${r}</b>.`,
  ][k],
  fu_inv_s2: (st, r) => `Escribimos y = f(x) y despejamos x: ${st}. Cambiamos los nombres (por costumbre, la variable de entrada se llama x): <b>f⁻¹(x) = ${r}</b>.`,
  fu_inv_v_q: (f, y) => `Si f(x) = ${f}, calcula <b>f⁻¹(${y})</b>.`,
  fu_inv_v_s: (f, y, t) => `f⁻¹(${y}) es el número x tal que f(x) = ${y}: ${f} = ${y} → x = <b>${t}</b>.`,
  fu_tr_q: (b, g) => `La gráfica de <b>y = ${g}</b> se obtiene trasladando la de y = ${b}. ¿Cuántas unidades se desplaza? (Positivo: derecha o arriba; negativo: izquierda o abajo.)`,
  fu_tr_f: ["Horizontal", "Vertical"],
  fu_tr_s: (h, v) => `y = f(x − h) + v es la gráfica de f desplazada h unidades en horizontal y v en vertical. Ojo con el signo de dentro: «x − 3» va a la derecha (h = 3) y «x + 3» a la izquierda (h = −3). Horizontal: <b>${h}</b>; vertical: <b>${v}</b>.`,
  fu_tr2_q: (b, g) => `¿Cómo se obtiene la gráfica de <b>y = ${g}</b> a partir de la de y = ${b}?`,
  ft_t: {
    d: (c, h, v) => `${c === -1 ? "Simetría respecto al eje X" : c === 1 ? "Sin estiramiento" : c < 0 ? `Estiramiento vertical de factor ${-c} y simetría respecto al eje X` : `Estiramiento vertical de factor ${c}`}; ${Math.abs(h)} ${h > 0 ? "a la derecha" : "a la izquierda"} y ${Math.abs(v)} ${v > 0 ? "hacia arriba" : "hacia abajo"}`,
    s: (c, h, v) => `En y = c · f(x − h) + v, el número que multiplica por fuera, c = ${c < 0 ? "−" + -c : c}, ${c === -1 ? "solo cambia el signo de las alturas (simetría respecto al eje X)" : c < 0 ? `estira las alturas (factor ${-c}) y su signo las refleja en el eje X` : `estira las alturas (factor ${c})`}. Dentro aparece x ${h > 0 ? "−" : "+"} ${Math.abs(h)}: h = ${h < 0 ? "−" + -h : h}, ${Math.abs(h)} unidades a la ${h > 0 ? "derecha" : "izquierda"}. El ${v > 0 ? "+" : "−"} ${Math.abs(v)} de fuera lo mueve ${Math.abs(v)} hacia ${v > 0 ? "arriba" : "abajo"}.`,
  },
  fu_tr2_o: c => ["Simetría respecto al eje X", "Simetría respecto al eje Y", `Estiramiento vertical de factor ${c}`, `Compresión horizontal de factor ${c}`],
  fu_tr2_s: [
    "−f(x) cambia el signo de cada altura: <b>simetría respecto al eje X</b>.",
    "f(−x) cambia el signo de cada abscisa: <b>simetría respecto al eje Y</b>.",
    "c · f(x) multiplica cada altura por c: <b>estiramiento vertical</b>.",
    "f(c · x) toma en cada x el valor que f tomaba en c · x: la gráfica se encoge hacia el eje Y (<b>compresión horizontal</b> de factor c).",
  ],
  fu_tipo_q: f => `¿De qué tipo es la función <b>f(x) = ${f}</b>?`,
  fu_tipo_o: ["Lineal (afín)", "Cuadrática", "Exponencial", "Logarítmica", "De proporcionalidad inversa", "Radical"],
  fu_tipo_s: [
    "x aparece elevada a 1: función <b>lineal (afín)</b>, su gráfica es una recta.",
    "El mayor exponente de x es 2: función <b>cuadrática</b>, su gráfica es una parábola.",
    "La x está en el exponente: función <b>exponencial</b>.",
    "Es un logaritmo de x: función <b>logarítmica</b>.",
    "Es k/x (o una traslación suya): <b>proporcionalidad inversa</b>, su gráfica es una hipérbola.",
    "La x está dentro de una raíz: función <b>radical</b>.",
  ],
});
})();
