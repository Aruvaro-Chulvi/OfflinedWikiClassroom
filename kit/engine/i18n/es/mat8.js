/* WikiAula — textos de gen/mat8.js (Matemáticas, Grado 8), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.m8 = G.m8 || {};
const neg = n => n < 0 ? "−" + Math.abs(n) : String(n);
const d = x => String(x).replace(".", ",");
const nn = x => Math.abs(x) >= 10000 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(x);   // 10 500
Object.assign(S, {
  NAMES: ["Lucía", "Hugo", "Sara", "Leo", "Nora", "Mateo", "Alba", "Omar", "Irene", "Bruno", "Aisha", "Iker"],
  lista: l => l.join(", ").replace(/, ([^,]*)$/, " y $1"),   // «2, 4 y 6»
  pn_q: e => `Calcula <b>${e}</b> (escribe el resultado como fracción).`,
  pn_s: (b, e, r) => `Un exponente negativo significa «uno partido por la potencia»: ${b}<sup>−${e}</sup> = 1/${b}<sup>${e}</sup> = <b>1/${r}</b>.`,
  pn2_q: (f, e) => `Calcula <b>(${f})<sup>−${e}</sup></b>.`,
  pn2_s: (p, q, e, a, b) => { const r = b === 1 ? `<b>${a}</b>` : `<b>${a}/${b}</b>`, inv = p === 1 ? `${q}` : `(${q}/${p})`;
    return `Exponente negativo: se invierte la fracción y el exponente pasa a positivo: (${p}/${q})<sup>−${e}</sup> = ${e === 1 ? r : `${inv}<sup>${e}</sup> = ${p === 1 ? "" : `${q}<sup>${e}</sup>/${p}<sup>${e}</sup> = `}${r}`}.`; },
  pnn_s: (c, f, r, par) => par
    ? `Con paréntesis, la base es −${c}: (−${c})<sup>−${f}</sup> = 1/(−${c})<sup>${f}</sup> = ${f % 2 ? `1/(−${r}) = ` : ""}<b>${f % 2 ? "−" : ""}1/${r}</b> (exponente ${f % 2 ? "impar: negativo" : "par: positivo"}).`
    : `Sin paréntesis, el exponente solo afecta al ${c} y el menos queda fuera: −${c}<sup>−${f}</sup> = −(1/${c}<sup>${f}</sup>) = <b>−1/${r}</b>.`,
  nc_q: n => `Escribe <b>${n}</b> en notación científica, a · 10<sup>n</sup> (con 1 ≤ a &lt; 10).`,
  nc_f: ["a (mantisa)", "n (exponente)"],
  nc_s: (n, m, e) => `Se coloca la coma detrás de la primera cifra distinta de 0: la mantisa es ${m}. Para llegar ahí, la coma se mueve <b>${Math.abs(e)}</b> ${Math.abs(e) === 1 ? "lugar" : "lugares"} hacia la ${e > 0 ? "izquierda (número grande: exponente positivo)" : "derecha (número pequeño: exponente negativo)"}: <b>${m} · 10<sup>${neg(e)}</sup></b>.`,
  nc2_q: e => `¿Qué número es <b>${e}</b>?`,
  nc2_s: (e, n) => `Se mueve la coma ${Math.abs(e)} lugares hacia la ${e > 0 ? "derecha" : "izquierda"}: <b>${n}</b>.`,
  nco_q: e => `Calcula y escribe en notación científica (la mantisa sale exacta: no hace falta redondear): <b>${e}</b>`,
  nco_s: (mul, a, b, raw, e1, e2, s, adj, m, e) => {
    const op = mul ? "·" : ":", p2 = e2 < 0 ? `(${neg(e2)})` : String(e2);
    const t = `Mantisas: ${a} ${op} ${b} = ${raw}. Potencias: 10<sup>${neg(e1)}</sup> ${op} 10<sup>${neg(e2)}</sup> = 10<sup>${neg(e1)} ${mul ? "+" : "−"} ${p2}</sup> = 10<sup>${neg(s)}</sup>. `;
    if (adj > 0) return t + `Ajuste: ${raw} pasa de 10; ${raw} = ${m} · 10, así que la mantisa se hace 10 veces más pequeña y el exponente sube 1: <b>${m} · 10<sup>${neg(e)}</sup></b>.`;
    if (adj < 0) return t + `Ajuste: ${raw} es menor que 1; la mantisa se hace 10 veces más grande (${m}) y el exponente baja 1: <b>${m} · 10<sup>${neg(e)}</sup></b>.`;
    return t + `La mantisa ya está entre 1 y 10: <b>${m} · 10<sup>${neg(e)}</sup></b>.`;
  },
  // m8.compuesta: [grifos y litros, máquinas y piezas, albergue y euros, caballos y pienso]
  CP: {
    dd_q: [(a, d, m, a2, d2) => `${a} grifos iguales llenan un depósito de ${nn(m)} litros en ${d} horas. ¿Cuántos litros llenarán ${a2} grifos en ${d2} horas?`,
      (a, d, m, a2, d2) => `${a} máquinas iguales fabrican ${nn(m)} piezas en ${d} horas. ¿Cuántas piezas fabricarán ${a2} máquinas en ${d2} horas?`,
      (a, d, m, a2, d2) => `Un albergue gasta ${nn(m)} € en comida para ${a} personas durante ${d} días. ¿Cuántos euros gastará con ${a2} personas durante ${d2} días?`,
      (a, d, m, a2, d2) => `Para alimentar a ${a} caballos durante ${d} días hacen falta ${nn(m)} kg de pienso. ¿Cuántos kilos hacen falta para ${a2} caballos durante ${d2} días?`],
    dd_s: [["grifo", "hora", "L"], ["máquina", "hora", "piezas"], ["persona", "día", "€"], ["caballo", "día", "kg"]].map(([x, y, u]) => (a, d, m, ad, k, a2, d2, r) =>
      `Las dos relaciones son directas (más ${x}s, más ${u === "L" ? "litros" : u === "€" ? "gasto" : u === "kg" ? "pienso" : "piezas"}; más ${y}s, también). Reducción a la unidad: 1 ${x} en 1 ${y}: ${nn(m)} : (${a} · ${d}) = ${nn(m)} : ${nn(ad)} = ${nn(k)} ${u}. ${a2} ${x}s en ${d2} ${y}s: ${nn(k)} · ${a2} · ${d2} = <b>${nn(r)} ${u}</b>.`),
    di_q: [(n, m, d, n2, m2) => `${n} obreros asfaltan ${nn(m)} m de carretera en ${d} días. ¿Cuántos días tardarán ${n2} obreros en asfaltar ${nn(m2)} m?`,
      (n, m, d, n2, m2) => `${n} impresoras iguales imprimen ${nn(m)} páginas en ${d} minutos. ¿Cuántos minutos tardarán ${n2} impresoras en imprimir ${nn(m2)} páginas?`],
    di_s: [["metros", "obreros", "días"], ["páginas", "impresoras", "minutos"]].map(([w, x, u]) => (d, m2, m, n, n2, num, den, r) =>
      `${w[0].toUpperCase() + w.slice(1)} y ${u}: más ${w}, más ${u} → <b>directa</b>: factor ${nn(m2)}/${nn(m)}. ${x[0].toUpperCase() + x.slice(1)} y ${u}: más ${x}, menos ${u} → <b>inversa</b>: factor al revés, ${n}/${n2}. ${u[0].toUpperCase() + u.slice(1)}: ${d} · ${nn(m2)}/${nn(m)} · ${n}/${n2} = (${d} · ${nn(m2)} · ${n})/(${nn(m)} · ${n2}) = ${nn(num)}/${nn(den)} = <b>${nn(r)} ${u}</b>.`),
    ii_q: (n, d, c, n2, c2) => `Un refugio tiene comida para ${n} montañeros durante ${d} días, comiendo ${c} veces al día. Llegan ${n2} montañeros que comen ${c2} ${c2 === 1 ? "vez" : "veces"} al día. ¿Cuántos días les durará la comida?`,
    ii_s: (d, n, n2, c, c2, num, den, r) => `Montañeros y días: más montañeros, menos días → <b>inversa</b>: factor ${n}/${n2}. Comidas al día y días: más comidas, menos días → <b>inversa</b>: factor ${c}/${c2}. Días: ${d} · ${n}/${n2} · ${c}/${c2} = (${d} · ${n} · ${c})/(${n2} · ${c2}) = ${nn(num)}/${nn(den)} = <b>${nn(r)} días</b>.`,
  },
  // m8.reparto
  RP: {
    rp_q: (T, names, parts) => `Se reparten ${T} € entre ${names.join(", ").replace(/, ([^,]*)$/, " y $1")} de forma directamente proporcional a ${parts.join(", ").replace(/, ([^,]*)$/, " y $1")}. ¿Cuánto recibe cada persona?`,
    rp_s: (T, p, g, q, sum, u) => `${g > 1 ? `Simplificamos entre ${g}: repartir a ${p.join(", ").replace(/, ([^,]*)$/, " y $1")} es lo mismo que repartir a ${q.join(", ").replace(/, ([^,]*)$/, " y $1")}. ` : ""}Se suman las partes: ${q.join(" + ")} = ${sum}. Una parte vale ${T} : ${sum} = ${u} €. Reciben ${q.map(x => `${x} · ${u} = <b>${x * u} €</b>`).join("; ")}.`,
    ri_q: (T, names, a) => `Un premio de ${T} € se reparte entre ${names.join(", ").replace(/, ([^,]*)$/, " y $1")} de forma inversamente proporcional a los días que faltaron a clase: ${a.join(", ").replace(/, ([^,]*)$/, " y $1")}. ¿Cuánto recibe cada persona?`,
    ri_s: (a, L, w, W, T, u) => `A menos faltas, más dinero: se reparte de forma directa a los inversos, ${a.map(x => `1/${x}`).join(", ")}. Con denominador ${L}: ${w.map(x => `${x}/${L}`).join(", ")}. Repartimos de forma directa a ${w.join(", ").replace(/, ([^,]*)$/, " y $1")}, que suman ${W}. Una parte: ${T} : ${W} = ${u} €. Reciben ${w.map(x => `${x} · ${u} = <b>${x * u} €</b>`).join("; ")}.`,
  },
  en_q: (P, a, b) => `Un artículo de ${P} € sube un ${a} % y después baja un ${b} %. ¿Cuál es su precio final, en euros?`,
  en_s: (P, fa, fb, mid, r, f) => `Porcentajes encadenados: se multiplica por cada índice de variación, uno detrás de otro. Subida: ${P} · ${fa} = ${mid} €. Bajada: ${mid} · ${fb} = <b>${r} €</b>. (De una vez: índice total ${fa} · ${fb} = ${f}, y ${P} · ${f} = ${r} €.)`,
  en2_q: (a, b) => `Un precio sube un ${a} % y luego baja un ${b} %. ¿Qué porcentaje ha variado en total? (Negativo si ha bajado.)`,
  en2_s: (fa, fb, f, t) => `Índice total: ${fa} · ${fb} = ${f}. Variación: (${f} − 1) · 100 = <b>${t} %</b>.`,
  is_q: (C, r, t) => `¿Qué interés producen ${C} € al ${r} % de interés simple anual durante ${t} ${t === 1 ? "año" : "años"}?`,
  is_s: (C, r, t, I) => `I = C · r · t / 100 = ${C} · ${r} · ${t} / 100 = <b>${I} €</b>.`,
  is2_q: (C, I, t) => `Un capital de ${C} € ha producido ${I} € de interés simple en ${t} ${t === 1 ? "año" : "años"}. ¿A qué rédito (% anual) estaba?`,
  is2_s: (I, C, t, ct, r) => `Sustituimos en I = C · r · t / 100: ${I} = ${C} · r · ${t} / 100 = ${ct} · r. Así que r = ${I} : ${ct} = <b>${r} %</b> anual.`,
  en3_q: (a, b) => `Una tienda rebaja un ${a} % y, sobre el precio rebajado, aplica otro ${b} % de descuento en caja. ¿Qué porcentaje de descuento total supone?`,
  en3_s: (fa, fb, f, p, t, s) => `Se encadenan los índices: ${fa} · ${fb} = ${f}. Se paga el ${p} % del precio, así que el descuento total es del <b>${t} %</b> (no del ${s} %: el segundo descuento se calcula sobre un precio ya rebajado).`,
  en4_q: (r, y) => `Un precio sube un ${r} % cada año durante ${y} años. ¿Qué porcentaje ha subido en total? (Redondea a las centésimas si hace falta.)`,
  en4_s: (f, y, F, pc, pr, s, red) => `Cada año se multiplica por ${f}: en ${y} años, por ${f}<sup>${y}</sup> = ${F}. Ha subido un ${red ? `${pc} % ≈ <b>${pr} %</b>` : `<b>${pr} %</b>`}, algo más que ${s} %, porque cada subida se calcula sobre el precio ya subido.`,
  en5_q: (a, b, E) => `Tras subir un ${a} % y después bajar un ${b} %, un producto cuesta ${E} €. ¿Cuántos euros costaba al principio?`,
  en5_s: (fa, fb, f, E, P0, mid) => `Índice total: ${fa} · ${fb} = ${f}. Final = inicial · ${f}, así que inicial = ${E} : ${f} = <b>${P0} €</b>. Comprobación: ${P0} · ${fa} = ${mid} € y ${mid} · ${fb} = ${E} €. ✓`,
  ism_q: (C, r, m) => `¿Qué interés producen ${C} € al ${r} % de interés simple anual durante ${m} meses?`,
  ism_s: (C, r, m, A, I) => `El rédito es anual: en un año, ${C} · ${r} / 100 = ${A} €. ${m} meses son ${m}/12 de año: ${A} · ${m}/12 = <b>${I} €</b>. (Es lo mismo que dividir entre 1200: I = ${C} · ${r} · ${m} / 1200.)`,
  ist_q: (C, r, I) => `¿Cuántos años tiene que estar un capital de ${C} € al ${r} % de interés simple para producir ${I} € de interés?`,
  ist_s: (I, C, r, A, t) => `Sustituimos en I = C · r · t / 100: ${I} = ${C} · ${r} · t / 100 = ${A} · t. Así que t = ${I} : ${A} = <b>${t} ${t === 1 ? "año" : "años"}</b>.`,
  isc_q: (r, I, t) => `¿Qué capital hay que depositar al ${r} % de interés simple para obtener ${I} € de interés en ${t} ${t === 1 ? "año" : "años"}?`,
  isc_s: (I, r, t, rt, f, C) => `Sustituimos en I = C · r · t / 100: ${I} = C · ${r} · ${t} / 100 = C · ${rt} / 100 = ${f} · C. Así que C = ${I} : ${f} = <b>${C} €</b>.`,
  pol_q: e => `Calcula y simplifica: <b>${e}</b>`,
  pol_hint: "Escribe el polinomio en x, por ejemplo 3x^2 − 2x + 5.",
  nums: "números",
  polsuma_s: (s, expr, gr, r) => `${s > 0 ? "Quitamos los paréntesis (con un + delante, los signos no cambian)" : "Quitamos los paréntesis cambiando <b>todos</b> los signos del segundo (tiene un − delante)"}: ${expr}. ${gr ? `Juntamos los términos semejantes (mismo grado): ${gr}.` : "No hay términos del mismo grado que juntar."} Resultado: <b>${r}</b>.`,
  polmult_s: (prods, expr, gr, r) => `Cada término del primero por cada término del segundo (propiedad distributiva): ${prods}. Sumamos: ${expr}${gr ? `. Semejantes: ${gr}` : ""}. Resultado: <b>${r}</b>.`,
  not_q: e => `Desarrolla <b>${e}</b>.`,
  not2_q: p => `¿De qué identidad notable es el desarrollo <b>${p}</b>?`,
  not_s: [(A, b, a2, ab2, b2, r) => `Cuadrado de una suma, con a = ${A} y b = ${b}: a² = ${a2}; 2ab = ${ab2}; b² = ${b2}. (a + b)² = a² + 2ab + b² = <b>${r}</b>.`,
    (A, b, a2, ab2, b2, r) => `Cuadrado de una diferencia, con a = ${A} y b = ${b}: a² = ${a2}; 2ab = ${ab2}; b² = ${b2}. (a − b)² = a² − 2ab + b² = <b>${r}</b> (el doble producto, con −).`,
    (A, b, a2, ab2, b2, r) => `Suma por diferencia, con a = ${A} y b = ${b}: a² = ${a2}; b² = ${b2}. (a + b)(a − b) = a² − b² = <b>${r}</b> (los productos cruzados se anulan).`],
  fc_q: p => `Saca el <b>mayor</b> factor común en <b>${p}</b> (el que ya no deja nada que sacar dentro del paréntesis).`,
  fce_q: (eq, what) => `Se ha sacado el <b>mayor</b> factor común: <b>${eq}</b>. ${what}`,
  fce_num: "¿Qué número va en el hueco?",
  fce_dentro: "¿Qué número va en el hueco, dentro del paréntesis?",
  fc_s: (f, p, g, e, cs, divs) => `Número: el m.c.d. de ${cs} es ${g}. Letra: ${e ? `la menor potencia de x que hay en todos los términos es ${e === 1 ? "x" : "x²"}` : "no todos los términos tienen x, así que no sale ninguna x"}. El mayor factor común es ${f}. Dividimos cada término entre ${f}: ${divs}. Queda <b>${f}(${p})</b>.${e ? " (Sacar solo el número o solo una x da una expresión igual al polinomio, pero dentro del paréntesis aún queda algo que sacar: no es el mayor factor común.)" : ""}`,
  sg_q: p => `Resuelve la ecuación <b>${p} = 0</b>.`,
  sg_hint: "Escribe las soluciones separadas por comas o espacios.",
  sg0_s: (r2, r) => `Incompleta sin término en x: se despeja x² = ${r2}, así que x = ±√${r2}: <b>${r} y −${r}</b>.`,
  sgi0_s: (ax2, a, ar2, r2, r) => `Incompleta sin término en x: se despeja x². Pasamos el número al otro lado: ${ax2} = ${ar2}.${a ? ` Dividimos entre ${a}: x² = ${r2}.` : ""} Raíz cuadrada, sin olvidar el ±: x = ±√${r2} = ±${r}. Soluciones: <b>${r} y −${r}</b>.`,
  sg1_s: (f, r) => `Incompleta sin término independiente: se saca x factor común: x(${f}) = 0. O x = 0, o ${f} = 0 → x = ${r}. Soluciones: <b>0 y ${r}</b>.`,
  si_q: (e1, e2) => `Resuelve el sistema: <b>${e1}</b> ; <b>${e2}</b>`,
  sp_q: [
    (n, p, q, t) => `En una tienda se venden ${n} entradas de dos tipos: unas a ${p} € y otras a ${q} €. Se recaudan ${t} €. ¿Cuántas entradas de cada tipo se vendieron?`,
    (s, d_) => `Dos números suman ${s} y su diferencia es ${d_}. ¿Qué números son?`,
    (cab, pat) => `En una granja hay gallinas y conejos: ${cab} cabezas y ${pat} patas. ¿Cuántos animales hay de cada clase?`,
    (n, k, s) => `Hace ${n} años, la edad de Lucía era ${k === 2 ? "el doble" : k === 3 ? "el triple" : "el cuádruple"} que la de su prima. Ahora, entre las dos suman ${s} años. ¿Cuántos años tiene cada una?`],
  sp_f: [[p => `Entradas de ${p} €`, q => `Entradas de ${q} €`], ["Mayor", "Menor"], ["Gallinas", "Conejos"], ["Lucía", "Su prima"]],
  sp_s: [
    (x, y, p, q, n, t) => `x = entradas de ${p} €, y = entradas de ${q} €. Número de entradas: x + y = ${n}. Dinero: ${p}x + ${q}y = ${t}. ` + (p > q
      ? `Reducción: multiplicamos la primera por ${q} (${q}x + ${q}y = ${q * n}) y la restamos de la segunda: ${p - q === 1 ? `<b>x = ${x}</b>` : `${p - q}x = ${t - q * n}, así que <b>x = ${x}</b>`}. Entonces y = ${n} − ${x} = <b>${y}</b>.`
      : `Reducción: multiplicamos la primera por ${p} (${p}x + ${p}y = ${p * n}) y la restamos de la segunda: ${q - p === 1 ? `<b>y = ${y}</b>` : `${q - p}y = ${t - p * n}, así que <b>y = ${y}</b>`}. Entonces x = ${n} − ${y} = <b>${x}</b>.`)
      + ` Comprobación: ${p} · ${x} + ${q} · ${y} = ${p * x} + ${q * y} = ${t}. ✓`,
    (x, y, s, d_) => `Mayor x, menor y: x + y = ${s} y x − y = ${d_}. Sumando las dos ecuaciones: 2x = ${s + d_}, así que <b>x = ${x}</b>. Entonces y = ${s} − ${x} = <b>${y}</b>. Comprobación: ${x} − ${y} = ${d_}. ✓`,
    (g, c, cab, pat) => `g = gallinas, c = conejos. Cabezas: g + c = ${cab}. Patas: 2g + 4c = ${pat}. Reducción: multiplicamos la primera por 2 (2g + 2c = ${2 * cab}) y la restamos de la segunda: 2c = ${pat - 2 * cab}, así que <b>c = ${c} conejos</b>. Entonces g = ${cab} − ${c} = <b>${g} gallinas</b>. Comprobación: 2 · ${g} + 4 · ${c} = ${2 * g} + ${4 * c} = ${pat}. ✓`,
    (x, y, n, k, s) => `x = edad de Lucía ahora, y = edad de su prima ahora. Ahora: x + y = ${s}. Hace ${n} años: x − ${n} = ${k}(y − ${n}). Sustitución: de la primera, x = ${s} − y. En la segunda: ${s} − y − ${n} = ${k}y − ${k * n}, así que ${s - n} + ${k * n} = ${k}y + y, es decir, ${k + 1}y = ${s - n + k * n}; así que <b>y = ${y}</b>. Entonces x = ${s} − ${y} = <b>${x}</b>. Comprobación: hace ${n} años tenían ${x - n} y ${y - n}, y ${x - n} = ${k} · ${y - n}. ✓`],
  SL: {
    sino: ["Sí", "No"],
    es_q: (P, e) => `¿Es el punto <b>${P}</b> una solución de la ecuación <b>${e}</b>?`,
    es_s: (x, y, expr, mid, val, c, ok) => `Sustituimos x = ${x} e y = ${y}: ${expr}${expr === mid ? "" : ` = ${mid}`} = ${val}. ${ok ? `Da ${c}: <b>sí</b> es solución (el punto está en la recta).` : `${val} no es ${c}: <b>no</b> es solución (el punto no está en la recta).`}`,
    y_q: (e, k) => `En la ecuación <b>${e}</b>, ¿cuánto vale y si x = ${k}?`,
    y_s: (k, expr, ak, b, c, dif, y) => `Sustituimos x = ${k}: ${expr} = ${c}, es decir, ${ak} ${b > 0 ? "+" : "−"} y = ${c}. Así que y = ${dif} = <b>${y}</b>.`,
    n_q: (e1, e2) => `¿Cuántas soluciones tiene el sistema formado por <b>${e1}</b> y <b>${e2}</b>?`,
    n_o: ["Una", "Ninguna", "Infinitas"],
    n_s: (caso, m, km, c2, P) => [
      `La segunda ecuación no es la primera multiplicada por ningún número: las rectas se cortan en un punto, ${P} (compruébalo sustituyendo en las dos). <b>Una</b> solución.`,
      `Si multiplicamos la primera por ${m}, queda ${km}; pero la segunda dice que eso mismo vale ${c2}. No puede valer las dos cosas a la vez: las rectas son paralelas y el sistema <b>no tiene solución</b>.`,
      `La segunda ecuación es la primera multiplicada por ${m} (${km}): es la misma recta, así que hay <b>infinitas</b> soluciones.`][caso],
  },
  pi_h_q: (a, b) => `Los catetos de un triángulo rectángulo miden ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa?`,
  pi_h_s: (a, b, s, c, a2, b2) => `Teorema de Pitágoras: hipotenusa² = ${a}² + ${b}² = ${a2} + ${b2} = ${s}, así que hipotenusa = √${s} = <b>${c} cm</b>.`,
  pi_c_q: (c, a) => `La hipotenusa de un triángulo rectángulo mide ${c} cm y un cateto ${a} cm. ¿Cuánto mide el otro cateto?`,
  pi_c_s: (c, a, s, b, c2, a2) => `Buscamos un cateto: se resta. Cateto² = hipotenusa² − otro cateto² = ${c}² − ${a}² = ${c2} − ${a2} = ${s}, así que cateto = √${s} = <b>${b} cm</b>. Comprobación: ${a}² + ${b}² = ${a2} + ${b * b} = ${c2} = ${c}². ✓`,
  pi_n_q: (a, b) => `Los catetos de un triángulo rectángulo miden ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa? (La raíz no es exacta: usa la calculadora y redondea a las centésimas.)`,
  pi_n_s: (x, y, x2, y2, s, d3, r) => `Hipotenusa² = ${x}² + ${y}² = ${x2} + ${y2} = ${s}, así que hipotenusa = √${s} = ${d3}… ≈ <b>${r} cm</b> (redondeado a las centésimas).`,
  pa_q: [(a, b) => `¿Cuánto mide la diagonal de un rectángulo de ${a} m × ${b} m?`, (l, base) => `Un triángulo isósceles tiene lados iguales de ${l} cm y una base de ${base} cm. ¿Cuánto mide su altura?`, (c, a) => `Una escalera de ${c} m está apoyada en una pared, con el pie a ${a} m de la pared. ¿A qué altura llega?`],
  pa_esc: (c, a, c2, a2, d, b) => `La escalera es la hipotenusa y la altura h, un cateto (se resta): h² = ${c}² − ${a}² = ${c2} − ${a2} = ${d}, así que h = √${d} = <b>${b} m</b> (compruébalo: ${b} · ${b} = ${d}).`,
  pa_s: [(a, b, c) => `La diagonal es la hipotenusa: d² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}, así que d = √${a * a + b * b} = <b>${c} m</b>.`, (l, m, h) => `La altura divide la base por la mitad (${m} cm) y forma un triángulo rectángulo con el lado igual como hipotenusa: h² = ${l}² − ${m}² = ${l * l} − ${m * m} = ${l * l - m * m}, así que h = √${l * l - m * m} = <b>${h} cm</b>.`, (c, a, b) => `La escalera es la hipotenusa: h² = ${c}² − ${a}² = ${c * c} − ${a * a} = ${c * c - a * a}, así que h = √${c * c - a * a} = <b>${b} m</b>.`],
  p3_q: (a, b, c) => `¿Cuánto mide la diagonal de una caja (ortoedro) de ${a} cm × ${b} cm × ${c} cm?`,
  p3_s: (a, b, c, s, r) => `Pitágoras en el espacio: D² = ${a}² + ${b}² + ${c}² = ${a * a} + ${b * b} + ${c * c} = ${s}, así que D = √${s} = <b>${r} cm</b>.`,
  ta_q: (a, b, a2) => `Dos rectas se cortan en un punto O y dos paralelas las cortan (como en el dibujo de la lección). En una recta, OA = ${a} cm y AB = ${b} cm; en la otra, OA′ = ${a2} cm. ¿Cuánto mide A′B′?`,
  ta_s: (a, b, a2, r, k) => `Teorema de Tales: los segmentos de una recta son proporcionales a los de la otra. Razón: OA′ : OA = ${a2} : ${a} = ${k}. Así que A′B′ = AB · ${k} = ${b} · ${k} = <b>${r} cm</b>.`,
  ta2_q: (h, s, S2) => `Un palo de ${h} m da una sombra de ${s} m. A la misma hora, un árbol da una sombra de ${S2} m. ¿Cuánto mide el árbol?`,
  ta2_s: (h, s, S2, r, k) => `Los dos triángulos (objeto, sombra y rayo de sol) son semejantes: la razón altura/sombra es la misma. Palo: ${h} : ${s} = ${k}. Árbol: x = ${S2} · ${k} = <b>${r} m</b>.`,
  se_q: [(l, l2) => `Dos figuras son semejantes. Un lado de la primera mide ${l} cm y el correspondiente de la segunda, ${l2} cm. ¿Cuál es la razón de semejanza (segunda/primera)?`, (k, A, red) => `Una figura de ${A} cm² de área se ${red ? "reduce" : "amplía"} con razón de semejanza ${k}. ¿Qué área tiene la nueva figura?`, (k, V, red) => `Un cuerpo de ${V} cm³ de volumen se ${red ? "reduce" : "amplía"} con razón ${k}. ¿Qué volumen tiene el nuevo cuerpo?`],
  se_s: [(l2, l, k) => `k = ${l2}/${l} = <b>${k}</b>.`, (k, A, k2, r) => `Las áreas se multiplican por k² = ${k}² = ${k} · ${k} = ${k2}: ${A} · ${k2} = <b>${r} cm²</b>.`, (k, V, k3, r) => `Los volúmenes se multiplican por k³ = ${k}³ = ${k} · ${k} · ${k} = ${k3}: ${V} · ${k3} = <b>${r} cm³</b>.`],
  av_q: [(a, b, h) => `Calcula el volumen de un ortoedro de ${a} × ${b} × ${h} cm (en cm³).`, (a, b, h) => `Calcula el área total de un ortoedro de ${a} × ${b} × ${h} cm (en cm²).`, (a, h) => `Calcula el volumen de una pirámide de base cuadrada de ${a} cm de lado y ${h} cm de altura (en cm³; si no sale exacto, redondea a las centésimas).`, (r, h) => `Calcula el volumen de un cilindro de radio ${r} cm y altura ${h} cm (en cm³; usa la tecla π de la calculadora y redondea a las centésimas).`, (r, h) => `Calcula el área total de un cilindro de radio ${r} cm y altura ${h} cm (en cm²; usa la tecla π de la calculadora y redondea a las centésimas).`, (r, h) => `Calcula el volumen de un cono de radio ${r} cm y altura ${h} cm (en cm³; usa la tecla π de la calculadora y redondea a las centésimas).`, r => `Calcula el volumen de una esfera de radio ${r} cm (en cm³; usa la tecla π de la calculadora y redondea a las centésimas).`],
  av_s: [
    (a, b, h, V) => `V = largo · ancho · alto = ${a} · ${b} · ${h} = <b>${V} cm³</b>.`,
    (a, b, h, ab, ah, bh, A) => `Seis caras, iguales dos a dos: 2 · (${a} · ${b}) + 2 · (${a} · ${h}) + 2 · (${b} · ${h}) = ${ab} + ${ah} + ${bh} = <b>${A} cm²</b>.`,
    (a, h, a2, a2h, eq, v) => `Base: ${a}² = ${a2} cm². V = (área de la base · altura) : 3 = ${a2} · ${h} : 3 = ${a2h} : 3 ${eq} <b>${v} cm³</b>.`,
    (r, h, k, v) => `V = π · r² · h = π · ${r}² · ${h} = ${k}π ≈ <b>${v} cm³</b>.`,
    (r, h, lat, bas, k, v) => `Lateral: 2π · ${r} · ${h} = ${lat}π. Las dos bases: 2 · π · ${r}² = ${bas}π. Total: ${lat}π + ${bas}π = ${k}π ≈ <b>${v} cm²</b>.`,
    (r, h, k, kd, v) => `V = (π · r² · h) : 3 = π · ${r}² · ${h} : 3 = ${k}π : 3 ${kd ? `= ${kd} ` : ""}≈ <b>${v} cm³</b>.`,
    (r, r3, k4, kd, v) => `V = (4/3) · π · r³ = 4 · π · ${r}³ : 3 = ${k4}π : 3 ${kd ? `= ${kd} ` : ""}≈ <b>${v} cm³</b>.`],
  AP: {
    ort_q: (a, b, c) => `Calcula el área total de un ortoedro de ${a} × ${b} × ${c} cm (en cm²).`,
    ort_s: (a, b, c, ab, ac, bc) => `Seis caras, iguales dos a dos: dos de ${a} · ${b} = ${ab}, dos de ${a} · ${c} = ${ac} y dos de ${b} · ${c} = ${bc} cm². Área total: 2 · (${ab} + ${ac} + ${bc}) = 2 · ${ab + ac + bc} = <b>${2 * (ab + ac + bc)} cm²</b>.`,
    cubo_q: l => `Calcula el área total de un cubo de ${l} cm de arista (en cm²).`,
    cubo_s: (l, l2, A) => `Seis caras cuadradas de ${l} · ${l} = ${l2} cm²: 6 · ${l2} = <b>${A} cm²</b>.`,
    tri_q: (p, q, h) => `Un prisma tiene por base un triángulo rectángulo de catetos ${p} cm y ${q} cm, y su altura es ${h} cm. ¿Cuál es su área total (en cm²)?`,
    tri_s: (p, q, r, s, P, h, AL, b1, b2) => `Hipotenusa de la base, por Pitágoras: √(${p}² + ${q}²) = √${s} = ${r} cm. Perímetro de la base: ${p} + ${q} + ${r} = ${P} cm. Área lateral: ${P} · ${h} = ${AL} cm². Cada base: ${p} · ${q} : 2 = ${b1} cm²; las dos, ${b2} cm². Área total: ${AL} + ${b2} = <b>${AL + b2} cm²</b>.`,
    pa_q: (L, ap) => `Una pirámide cuadrangular regular tiene base de ${L} cm de lado y apotema de ${ap} cm. ¿Cuál es su área total (en cm²)?`,
    pa_s: (L, ap, c, AL, B) => `Cada cara lateral es un triángulo: ${L} · ${ap} : 2 = ${c} cm²; las cuatro, ${AL} cm². Base: ${L}² = ${B} cm². Área total: ${AL} + ${B} = <b>${AL + B} cm²</b>.`,
    ph_q: (L, h, lat) => `Una pirámide cuadrangular regular tiene base de ${L} m de lado y ${h} m de altura. ¿Cuánto mide su área ${lat ? "lateral" : "total"} (en m²)?`,
    ph_s: (L, m, h, s, ap, c, AL, B, lat) => `Primero, la apotema de la pirámide: la altura (${h} m), la mitad del lado (${m} m) y la apotema forman un triángulo rectángulo. Apotema = √(${h}² + ${m}²) = √${s} = ${ap} m. Cada cara: ${L} · ${ap} : 2 = ${c} m²; las cuatro, ${AL} m². ` + (lat ? `Área lateral: <b>${AL} m²</b>.` : `Base: ${L}² = ${B} m². Área total: ${AL} + ${B} = <b>${AL + B} m²</b>.`),
  },
  AR: {
    cil_q: (r, h, tot) => `Calcula el área ${tot ? "total" : "lateral"} de un cilindro de radio ${r} cm y altura ${h} cm.`,
    cil_s: (r, h, lat, bas, tot) => `Lateral: 2π · ${r} · ${h} = ${lat}π cm².` + (tot ? ` Las dos bases: 2 · π · ${r}² = ${bas}π cm². Total: ${lat}π + ${bas}π = ${lat + bas}π cm².` : ""),
    cono_q: (r, g, tot) => `Calcula el área ${tot ? "total" : "lateral"} de un cono de radio ${r} cm y generatriz ${g} cm.`,
    conoh_q: (r, h, tot) => `Calcula el área ${tot ? "total" : "lateral"} de un cono de radio ${r} cm y altura ${h} cm.`,
    gen_s: (r, h, s, g) => `Primero la generatriz, por Pitágoras: g = √(${r}² + ${h}²) = √${s} = ${g} cm. `,
    cono_s: (r, g, lat, bas, tot) => `Lateral: π · ${r} · ${g} = ${lat}π cm².` + (tot ? ` Base: π · ${r}² = ${bas}π cm². Total: ${lat}π + ${bas}π = ${lat + bas}π cm².` : ""),
    esf_q: r => `Calcula el área de una esfera de radio ${r} cm.`,
    esf_s: (r, r2, k) => `A = 4π · ${r}² = 4π · ${r2} = ${k}π cm².`,
    k_q: "Da el resultado en función de π: si el área es k · π cm², ¿cuánto vale k?",
    k_s: k => `El área es ${k}π cm², así que <b>k = ${k}</b>.`,
    dec_q: "Redondea a las décimas (usa la tecla π de la calculadora).",
    dec_s: (k, v) => `Con la tecla π: ${k}π ≈ <b>${v} cm²</b>.`,
  },
  re_q: (A, B) => `Calcula la pendiente de la recta que pasa por A${A} y B${B}.`,
  re_s: (y2, y1, x2, x1, fr, m) => `m = (y₂ − y₁)/(x₂ − x₁) = (${y2} − ${y1})/(${x2} − ${x1}) = ${fr ? fr + " = " : ""}<b>${m}</b>.`,
  re2_q: (A, B) => `Escribe la ecuación de la recta que pasa por A${A} y B${B}, en la forma y = mx + n.`,
  re_hint: "Escribe la recta como y = mx + n, por ejemplo y = 2x − 3 o y = x/2 + 1.",
  re2_s: (sl, y1, mp, x1, p, pp, n, E) => `Primero la pendiente: ${sl.replace(/<\/?b>/g, "")} Después sustituimos el punto A en y = mx + n: ${y1} = ${mp} · ${x1} + n, es decir, ${y1} = ${p} + n, así que n = ${y1} − ${pp} = ${n}. Recta: <b>${E}</b>.`,
});
// ═════ Inecuaciones, la parábola y = ax² y frecuencia relativa (textos de los generadores añadidos) ═════
const gt = s => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pt = q => /…$/.test(q) ? q : q + ".";   // sin punto detrás de «…»

// m8.inecuacion
S.IN = {
  resuelve_q: e => `Resuelve la inecuación <b>${gt(e)}</b>.`,
  pasos: (e, s1, s2, m, negM, fin, s0) => `${gt(e)} → ${gt(s1)} → ${gt(s2)}. Dividimos entre ${neg(m)}${negM ? `, que es <b>negativo</b>: el signo de la desigualdad <b>cambia de sentido</b>` : " (positivo: el sentido no cambia)"}. Solución: <b>${gt(fin)}</b>.`,
  entero_q: (e, up) => `Resuelve <b>${gt(e)}</b>. ¿Cuál es el ${up ? "mayor" : "menor"} número entero que cumple la inecuación?`,
  entero_s: (fin, up, r, eq) => `Con ${gt(fin)}, el ${up ? "mayor" : "menor"} entero es <b>${neg(r)}</b>${eq ? " (el extremo sí vale, porque la desigualdad incluye el igual)" : " (el extremo no vale, porque la desigualdad es estricta)"}.`,
  recta_q: "¿Qué desigualdad representa la recta numérica?",
  recta_s: (full, left, fin) => `El punto es ${full ? "<b>lleno</b>: el extremo está incluido (≤ o ≥)" : "<b>hueco</b>: el extremo no está incluido (&lt; o &gt;)"}, y la semirrecta va hacia la ${left ? "izquierda, los números menores" : "derecha, los números mayores"}: <b>${gt(fin)}</b>.`,
  sala_q: (F, p, B) => `Alquilar una sala cuesta ${F} € más ${p} € por invitado, y no se quiere gastar más de ${B} €. ¿Cuántos invitados puede haber como máximo?`,
  sala_s: (F, p, B, q, r) => `«No más de» se traduce por ≤: ${F} + ${p}x ≤ ${B} → ${p}x ≤ ${B - F} → x ≤ ${pt(q)} Como los invitados son enteros, como máximo <b>${r}</b>.`,
  asc_q: (M, m0, w) => `Un ascensor admite como máximo ${M} kg. Sube un operario de ${m0} kg con cajas de ${w} kg cada una. ¿Cuántas cajas puede subir, como mucho, en un viaje?`,
  asc_s: (m0, w, M, q, r) => `${m0} + ${w}x ≤ ${M} → ${w}x ≤ ${M - m0} → x ≤ ${pt(q)} Las cajas son enteras: como máximo <b>${r}</b>.`,
  movil_q: (b, p, B) => `Tu tarifa de móvil cuesta ${b} € al mes, y cada gigabyte extra, ${p} € más. No quieres pagar más de ${B} € al mes. ¿Cuántos gigas extra puedes gastar como máximo?`,
  movil_s: (b, p, B, d, q, r) => `${b} + ${p}x ≤ ${B} → ${p}x ≤ ${d} → x ≤ ${pt(q)} Como mucho, <b>${r}</b> gigas extra.`,
  ahorro_q: (s, a, G) => `Tienes ${s} € ahorrados y cada semana guardas ${a} € más. Quieres tener al menos ${G} € para comprarte una bici. ¿Cuántas semanas tendrás que ahorrar como mínimo?`,
  ahorro_s: (s, a, G, d, q, r) => `«Al menos» se traduce por ≥: ${s} + ${a}x ≥ ${G} → ${a}x ≥ ${d} → x ≥ ${pt(q)} Las semanas son enteras: como mínimo <b>${r}</b>.`,
  essol_q: (e, x) => `¿Es x = ${neg(x)} una solución de la inecuación <b>${gt(e)}</b>?`,
  sino: ["Sí", "No"],
  essol_s: (x, l, r, s, ok) => `Sustituimos x = ${neg(x)}: queda ${l} ${gt(s)} ${r}, que es <b>${ok ? "verdadero" : "falso"}</b>. ${ok ? "Sí" : "No"} es solución.`,
  prop_q: (rel, ea, eb) => `Si a ${gt(rel)} b, ¿qué signo va en el hueco? <b>${ea} ☐ ${eb}</b>`,
  prop_s: (add, negM, lt, ea, eb, r, m) => {
    if (add) return `Sumar o restar el mismo número a los dos lados no cambia el sentido de la desigualdad: <b>${ea} ${gt(r)} ${eb}</b>.`;
    if (!negM) return `Multiplicar por un número positivo no cambia el sentido: <b>${ea} ${gt(r)} ${eb}</b>.`;
    const [u, v] = lt ? [1, 2] : [2, 1], pu = m * u, pv = m * v;   // ejemplo con el mismo factor y el mismo sentido que el enunciado
    return `Multiplicar los dos lados por un número <b>negativo</b> invierte el sentido: <b>${ea} ${gt(r)} ${eb}</b>. Por ejemplo, ${u} ${lt ? "&lt;" : "&gt;"} ${v}, pero ${neg(m)} · ${u} = ${neg(pu)} y ${neg(m)} · ${v} = ${neg(pv)}, y ${neg(pu)} ${lt ? "&gt;" : "&lt;"} ${neg(pv)}.`;
  },
};

// m8.parabola
S.PB = {
  escala_w: ["el área", "la distancia"],
  valor_q: (E, x) => `En la función <b>${E}</b>, ¿cuánto vale y cuando x = ${x}?`,
  valor_s: (a, x, x2, y, n) => `Primero se eleva al cuadrado y después se multiplica: y = ${a} · ${x}² = ${a} · ${x2} = <b>${y}</b>.${n ? " El cuadrado de un número negativo es positivo." : ""}`,
  tabla_q: E => `Completa la tabla de valores de <b>${E}</b>.`,
  tabla_s: (list, up) => `${list}. Los valores van por parejas (x y −x dan la misma y): el eje Y es el eje de simetría, y el vértice (0, 0) es un ${up ? "mínimo" : "máximo"}.`,
  hallar_q: p => `Una parábola de la forma y = ax² pasa por el punto <b>${p}</b>. ¿Cuánto vale a?`,
  hallar_s: (y, x, x2, a, E) => x2 === 1 ? `Sustituimos el punto: ${y} = a · ${x}² = a, así que <b>a = ${a}</b>. La parábola es ${E}.` : `Sustituimos el punto: ${y} = a · ${x}² = ${x2}a, así que a = ${y} : ${x2} = <b>${a}</b>. La parábola es ${E}.`,
  abre_q: E => `¿Hacia dónde se abre la parábola <b>${E}</b>?`,
  abre_o: ["Hacia arriba, y su vértice es un mínimo", "Hacia abajo, y su vértice es un máximo", "Depende del valor de x"],
  abre_s: (a, up) => up ? `a = ${a} es positivo: los valores de y son positivos o cero. Se abre <b>hacia arriba</b> y el vértice (0, 0) es el punto más bajo, un <b>mínimo</b>.` : `a = ${a} es negativo: los valores de y son negativos o cero. Se abre <b>hacia abajo</b> y el vértice (0, 0) es el punto más alto, un <b>máximo</b>.`,
  cerrada_q: "¿Cuál de estas parábolas es la más cerrada (la más estrecha)?",
  abierta_q: "¿Cuál de estas parábolas es la más abierta (la más ancha)?",
  cerr_s: (abs, e, closed) => `Se compara el valor absoluto de a (${abs}), sin mirar el signo: cuanto ${closed ? "mayor" : "menor"} es, más ${closed ? "cerrada" : "abierta"} es la parábola. La más ${closed ? "cerrada" : "abierta"} es <b>${e}</b>.`,
  sino: ["Sí", "No"],
  pasa_q: (E, p) =>`¿Está el punto <b>${p}</b> en la parábola <b>${E}</b>?`,
  pasa_s: (a, x, g, y, ok) => `Para esa x: y = ${a} · ${x}² = ${g}. ${ok ? `Coincide: el punto <b>sí</b> está en la parábola.` : `${g} ≠ ${y}: el punto <b>no</b> está en la parábola.`}`,
  escala_q: [k => `El área de un cuadrado es y = x², donde x es el lado. Si el lado se multiplica por ${k}, ¿por cuánto se multiplica el área?`, k => `Una piedra que se deja caer recorre d = 4,9t² metros en t segundos. Si el tiempo se multiplica por ${k}, ¿por cuánto se multiplica la distancia recorrida?`],
  escala_s: (k, v, what) => `Si ${v} se multiplica por ${k}, ${v}² se multiplica por ${k}² = ${k * k}: (${k}${v})² = ${k}² · ${v}² = ${k * k}${v}². ${what[0].toUpperCase() + what.slice(1)} se multiplica por <b>${k * k}</b>. No es una relación proporcional: al ${k === 2 ? "doble" : k === 3 ? "triple" : `multiplicar por ${k}`}, le corresponde ${k * k} veces más.`,
  graf_q: "¿Cuál es la ecuación de la parábola dibujada (misma escala en los dos ejes)?",
  graf_s: (a, a4, up, E) => `El vértice es (0, 0). Se abre hacia ${up ? "arriba" : "abajo"}, así que a es ${up ? "positivo" : "negativo"}. Pasa por el punto (1, ${a}) (y también por (2, ${a4})): a = ${a}. Es <b>${E}</b>.`,
};

// m8.frecrel
S.FR = {
  // [qué se lanza, el suceso, el contrario]
  objs: [["una chincheta", "cae con la punta hacia arriba", "caer de lado"], ["un tapón", "cae boca abajo", "no caer boca abajo"], ["un vaso de plástico", "cae de lado", "no caer de lado"], ["un dado trucado", "sale el 6", "no salir el 6"], ["una moneda doblada", "sale cara", "salir cruz"]],
  h_q: (o, N, ev, f) => `Se lanza ${o} ${N} veces y ${f} veces ${ev}. Estima la probabilidad de que ${ev.replace(/^cae/, "caiga").replace(/^sale/, "salga")} (en decimal; redondea a las milésimas si hace falta).`,
  h_s: (f, N, h) => `La frecuencia relativa es f/N = ${f}/${N} = ${h}. Con tantos lanzamientos, es una buena estimación: P ≈ <b>${h}</b>.`,
  contr_q: (o, N, ev, f, other) => `Se lanza ${o} ${N} veces y ${f} veces ${ev}. Estima la probabilidad de ${other} (en decimal).`,
  contr_s: (f, N, h, r, other) => `P ≈ ${f}/${N} = ${h} para el suceso observado. La de ${other} es la del contrario: 1 − ${h} = <b>${r}</b>.`,
  // [enunciado (N), casos favorables, casos posibles]
  esperado: [[N => `Se lanza un dado ${N} veces. ¿Cuántas veces se espera que salga el 4?`, 1, 6], [N => `Se lanza un dado ${N} veces. ¿Cuántas veces se espera sacar un número par?`, 1, 2],
    [N => `Se lanza un dado ${N} veces. ¿Cuántas veces se espera sacar un múltiplo de 3?`, 1, 3], [N => `Se lanza una moneda ${N} veces. ¿Cuántas caras se esperan?`, 1, 2],
    [N => `Se lanzan dos monedas ${N} veces. ¿Cuántas veces se espera obtener dos caras?`, 1, 4], [N => `La probabilidad de que un tapón caiga boca abajo es 0,35. ¿Cuántas veces se espera que caiga boca abajo en ${N} lanzamientos?`, 7, 20]],
  esp_q: (w, N) => w(N),
  esp_s: (N, a, b, r) => `Número esperado = N · P(A) = ${N} · ${b === 20 ? "0,35" : `${a}/${b}`} = <b>${r}</b>. Es un valor aproximado: en la realidad saldrá un número cercano.`,
  vaso: ["de lado", "boca arriba", "boca abajo"],
  tres_q: (N, ns, j) => `Se lanza un vaso de plástico ${N} veces: cae de lado ${ns[0]} veces, boca arriba ${ns[1]} y boca abajo ${ns[2]}. Estima la probabilidad de que caiga <b>${["de lado", "boca arriba", "boca abajo"][j]}</b> (en decimal).`,
  tres_s: (w, f, N, p) => `P(${w}) ≈ ${f}/${N} = <b>${p}</b>. Las tres estimaciones suman 1.`,
  // [enunciado (N, f), probabilidad, probabilidad escrita]
  juicio: [[(N, f) => `Una moneda se lanza ${N} veces y salen ${f} caras.`, 0.5, "0,5", "la moneda estaría trucada"], [(N, f) => `Un dado se lanza ${N} veces y el 6 sale ${f} veces.`, 1 / 6, "1/6 ≈ 0,167", "el dado estaría trucado"]],
  juicio_q: (w, N, f) => `${w(N, f)} ¿Qué podemos decir?`,
  juicio_o: ["Lo más probable es que haya trampa", "Con tan pocas tiradas no se puede saber", "Parece normal: la frecuencia relativa está muy cerca de la probabilidad"],
  juicio_s: (c, f, N, h, p, obj) => [`La frecuencia relativa es ${f}/${N} = ${h}, muy lejos de ${p}. Con ${N} lanzamientos, una diferencia así es muy sospechosa: <b>lo más probable es que haya trampa</b> (${obj}).`,
    `La frecuencia relativa es ${f}/${N} = ${h}, algo lejos de ${p}, pero con tan pocas repeticiones salta mucho y un resultado así pasa a menudo: <b>no se puede saber</b>. Habría que repetir el experimento muchas más veces.`,
    `La frecuencia relativa es ${f}/${N} = ${h}, muy cerca de ${p}: con ${N} lanzamientos, <b>parece normal</b>, como dice la ley de los grandes números.`][c],
  falacia_q: n => `Una moneda equilibrada ha salido cara ${n} veces seguidas. ¿Qué probabilidad hay de que en el siguiente lanzamiento salga cruz?`,
  falacia_o: ["0,5", "Más de 0,5", "Menos de 0,5"],
  falacia_s: "El azar no «compensa»: la moneda no tiene memoria y cada lanzamiento es independiente de los anteriores. La probabilidad sigue siendo <b>0,5</b>.",
};
// m8.lineal
S.LI = {
  sino: ["Sí", "No"],
  m_q: P => `La recta <b>y = mx</b> pasa por el punto <b>${P}</b>. ¿Cuánto vale m?`,
  m_s: (y, x, m, E) => `En y = mx, sustituimos el punto: ${y} = m · ${x}, así que m = y : x = ${y} : ${x} = <b>${m}</b>. La función es ${E}.`,
  tab_q: E => `Completa la tabla de valores de la función <b>${E}</b>.`,
  tab_s: (m, list) => `Se multiplica cada x por ${m}: ${list}. Fíjate en que para x = 0 saldría y = 0: la recta pasa por el origen.`,
  es_q: (xs, ys) => `En una tabla, a los valores x = ${xs} les corresponden y = ${ys}. ¿Es una función de proporcionalidad directa (y = mx)?`,
  inc_q: "¿Cuál de estas rectas es la más inclinada (la más empinada)?",
  inc2_q: "¿Cuál de estas rectas es la menos inclinada (la más «tumbada»)?",
  inc_s: (l, e, big) => `La inclinación depende de la pendiente sin mirar el signo (el signo solo dice si sube o baja): ${l}. La ${big ? "mayor" : "menor"} es la de <b>${e}</b>.`,
  es_s: (q, yes, E) => `Calculamos los cocientes y : x: ${q}. ${yes ? `Son todos iguales: <b>sí</b> es de proporcionalidad directa, ${E}.` : `No son iguales: <b>no</b> es de proporcionalidad directa (es una recta que no pasa por el origen).`}`,
};
// ── fin: ═════ Inecuaciones, la parábola y = ax² y frecuencia relativa (textos de los generadores añadidos) ═════

// ═════ Ronda M (2026-11): textos de los generadores nuevos ═════
const corta = (p, q, g) => p === q ? `el ${p} de arriba y el ${q} de abajo se van` : `${p} y ${q} entre ${g}`;
const simp = cuts => `(simplificamos antes de multiplicar: ${cuts.join("; ")})`;
// m8.frpot
S.FP = {
  corta, simp,
  q: e => `Calcula y da el resultado como fracción irreducible: <b>${e}</b>`,
  par: even => even ? "(exponente par: positivo)" : "(exponente impar: negativo)",
  par_: t => `Paréntesis: ${t}.`,
  pot: t => `Potencia (se elevan el numerador y el denominador): ${t}.`,
  prod: t => `Producto: ${t}.`,
  coc: t => `Cociente (por la inversa): ${t}.`,
  resta: t => `Resta: ${t}.`,
  suma: t => `Suma: ${t}.`,
  fin: r => `Resultado: <b>${r}</b>.`,
};
// m8.frprob
S.FB = {
  corta, simp,
  queda1: t => `Tras la primera parte queda ${t} del total.`,
  luego: t => `La segunda parte es una fracción de lo que queda (no del total): ${t} del total.`,
  queda2: t => `Queda ${t} del total.`,
  fin: r => `Le queda <b>${r}</b> de la paga.`,
  frac_q: (nm, a, c) => `${nm} gasta ${a} de su paga en el cine y ${c} de lo que le queda en un libro. ¿Qué fracción de la paga le queda? (Fracción irreducible.)`,
  total_q: [(nm, a, c, r) => `${nm} gasta ${a} de su dinero en unas zapatillas y ${c} de lo que le queda en un videojuego. Aún le quedan ${r} €. ¿Cuánto dinero tenía al principio?`,
    (nm, a, c, r) => `${nm} lee ${a} de un libro el sábado y ${c} de lo que le queda el domingo. Aún le faltan ${r} páginas. ¿Cuántas páginas tiene el libro?`],
  total_s: (Q, r, qn, qd, j, tot, ctx) => { const u = ctx ? "páginas" : "€"; return `Si ${Q} del total son ${r} ${u}, ${qn === 1 ? "" : `1/${qd} es ${r} : ${qn} = ${j} ${u}, y `}el total (${qd}/${qd}) es ${qd} · ${j} = <b>${tot} ${u}</b>.`; },
  dep_q: (a, L, c) => `Un depósito está lleno hasta ${a} de su capacidad. Si se añaden ${L} litros, llega a ${c}. ¿Cuál es su capacidad, en litros?`,
  dep_s: (dt, D, L, dn, dd, j, tot, a, va, c, vc) => `Los ${L} litros son la diferencia: ${dt} del depósito. ${dn === 1 ? "" : `1/${dd} son ${L} : ${dn} = ${j} L. `}Capacidad: ${dd} · ${j} = <b>${tot} L</b>. Comprobación: ${a} de ${tot} son ${va} L; ${va} + ${L} = ${va + L}, y ${c} de ${tot} son ${vc} L. ✓`,
  clase_q: (N, a, c) => `En una clase de ${N} alumnos, ${a} van al instituto andando y ${c} en autobús; el resto, en bici. ¿Cuántos van en bici?`,
  clase_s: (st, rt, r, N, ans) => `Andando o en autobús: ${st}. En bici: ${rt} de la clase. ${r[0]}/${r[1]} de ${N}: ${N} : ${r[1]} · ${r[0]} = <b>${ans}</b> alumnos.`,
};
// m8.periodico
S.PE = {
  q: x => `Escribe el decimal periódico <b>${x}</b> como fracción irreducible.`,
  puro_s: (x, k, p10, xb, big, E, M, diff, ans) => `Llamamos x = ${x} El periodo tiene ${k} cifra${k > 1 ? "s" : ""}: multiplicamos por ${p10}: ${p10}x = ${xb} Restamos para que la cola infinita desaparezca: ${p10}x − x = ${E ? `${big} − ${E} = ` : ""}${diff}, es decir, ${M}x = ${diff}. x = ${diff}/${M}${`${diff}/${M}` === ans ? "" : ` = ${ans}`}. Resultado: <b>${ans}</b>.`,
  mixto_s: (x, x10, p, xb, k, nb, n10, M, diff, ans) => `Llamamos x = ${x} Primero llevamos el anteperiodo a la izquierda de la coma: 10x = ${x10} Ahora el periodo tiene ${k} cifra${k > 1 ? "s" : ""}: multiplicamos 10x por ${p / 10}: ${p}x = ${xb} Restamos: ${p}x − 10x = ${nb} − ${n10}, es decir, ${M}x = ${diff}. x = ${diff}/${M}${`${diff}/${M}` === ans ? "" : ` = ${ans}`}. Resultado: <b>${ans}</b>.`,
  tipos: ["Exacto", "Periódico puro", "Periódico mixto"],
  tipo_q: f => `Sin hacer la división, ¿qué tipo de decimal da la fracción <b>${f}</b>?`,
  tipo_s: (f, b, k, dtxt, c, dec) => `¡Primero simplifica! ${f} = ${b} (dividiendo entre ${k}). Ahora el denominador es ${dtxt}: ${["solo tiene los factores 2 y 5 → <b>exacto</b>", "no tiene ni 2 ni 5 → periódico <b>puro</b>", "tiene 2 o 5 y además otro primo → periódico <b>mixto</b>"][c]} (${b} = ${dec}). Si no simplificas, el ${k} del denominador te engaña.`,
};
// m8.potprop
S.PP = {
  una_q: (e, b) => `Escribe <b>${e}</b> como una sola potencia de ${b}. ¿Cuál es el exponente?`,
  una_s: (sum, t, b) => `Misma base: en el producto se suman los exponentes y en el cociente se resta el del divisor: ${sum} = ${neg(t)}. Es ${b}<sup>${neg(t)}</sup>${t < 0 ? ` = 1/${b}${t < -1 ? `<sup>${-t}</sup>` : ""}` : ""}; el exponente es <b>${neg(t)}</b>.`,
  base_s: (b, pasos, junto, sum, t) => `Primero todo en base ${b}: ${pasos.join(" y ")} (potencia de una potencia: se multiplican los exponentes). Queda ${junto} = ${b}<sup>${sum} </sup> = ${b}<sup>${neg(t)}</sup>. El exponente es <b>${neg(t)}</b>.`,
  pot_s: (m, n, t, b) => `Potencia de una potencia: se multiplican los exponentes, ${m} · ${n} = ${neg(t)}. Es ${b}<sup>${neg(t)}</sup>; el exponente es <b>${neg(t)}</b>.`,
  mismo_q: e => `Calcula <b>${e}</b> sin calcular cada potencia por separado.`,
  mismo_s: (a, c, n, mul, base, v) => `Mismo exponente: se ${mul ? "multiplican" : "dividen"} las bases, ${mul ? `${a}<sup>${n}</sup> · ${c}<sup>${n}</sup> = (${a} · ${c})<sup>${n}</sup>` : `${a}<sup>${n}</sup> : ${c}<sup>${n}</sup> = (${a} : ${c})<sup>${n}</sup>`} = ${base}<sup>${n}</sup> = <b>${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</b>.`,
};
// m8.raizaprox
S.RA = {
  q: n => `Calcula √${n} por tanteo con una cifra decimal <b>por defecto</b> (la que se queda corta, sin redondear). Puedes usar la calculadora para los cuadrados.`,
  s: (n, a, a2, a1, a12, lo, lo2, hi, hi2) => `Primero los enteros: ${a}² = ${a2} y ${a1}² = ${a12}, así que √${n} está entre ${a} y ${a1}. Ahora las décimas: ${lo}² = ${lo2} (no llega a ${n}) y ${hi}² = ${hi2} (se pasa). Por defecto, √${n} ≈ <b>${lo}</b> (y por exceso, ${hi}).`,
  ex_q: e => `Calcula <b>${e}</b>.`,
  fr_q: "(Escribe el resultado como fracción.)",
  dec_s: (x, x2, trap) => `Buscamos un número que al cuadrado dé ${x2}: ${x}² = ${x} · ${x} = ${x2}, así que la raíz es <b>${x}</b>. (Cuenta las cifras decimales: al elevar al cuadrado se duplican. Por eso √${trap} no es ${x}.)`,
  fr_s: (p, q, p2, q2) => `Raíz del numerador y del denominador: √${p2} = ${p} y √${q2} = ${q}, así que √(${p2}/${q2}) = <b>${p}/${q}</b>. Comprobación: (${p}/${q})² = ${p2}/${q2}. ✓`,
  cub_s: (r, rp, c) => `Buscamos un número que elevado al cubo dé ${c}: ${rp}³ = ${rp} · ${rp} · ${rp} = ${c}. La raíz cúbica es <b>${r}</b>${String(c).startsWith("−") ? " (las raíces cúbicas de los negativos existen y son negativas)" : ""}.`,
};
// m8.polvocab
S.PV2 = {
  sino: ["Sí", "No"],
  gr_q: p => `¿Cuál es el grado del polinomio <b>${p}</b>?`,
  gr_s: (l, g) => `El grado de un polinomio es el mayor de los grados de sus términos (aunque no esté escrito el primero): ${l}. El mayor es <b>${g}</b>.`,
  mo_q: m => `¿Cuál es el grado del monomio <b>${m}</b>?`,
  mo_s: (m, l, s, g) => `El grado de un monomio es la suma de los exponentes de todas sus letras (${l}): ${s} = <b>${g}</b>. El coeficiente no cuenta.`,
  val_q: (p, a) => `Calcula P(${a}) si P(x) = <b>${p}</b>.`,
  val_s: (a, s, v, r) => `Sustituimos x por ${a}, con paréntesis si es negativo, y respetamos la jerarquía (primero las potencias): ${s} = ${v} = <b>${neg(r)}</b>.`,
  raiz_q: (a, p) => `¿Es x = ${a} una raíz del polinomio <b>${p}</b>?`,
  raiz_s: (a, s, v, r) => `Calculamos P(${a}): ${s} = ${v} = ${neg(r)}. ${r === 0 ? "Da 0: <b>sí</b> es raíz (el polinomio se anula en ese número)." : `No da 0: <b>no</b> es raíz.`}`,
};
// m8.pcvar
S.PV = {
  // [qué, unidad, valores iniciales, ¿admite céntimos?]
  ctx: [["El alquiler de un piso", "€", [400, 500, 600, 750, 800, 1000, 1200], 0], ["El precio de una entrada", "€", [8, 10, 12, 15, 20, 25, 40], 1], ["La población de un pueblo", "habitantes", [500, 1200, 2000, 2500, 4000, 8000], 0],
    ["El número de visitas de una web", "visitas", [200, 500, 1200, 2000, 5000], 0], ["El precio de un kilo de aceite", "€", [4, 5, 6, 8, 10], 1], ["El número de socios de un club", "socios", [40, 60, 80, 120, 200, 250], 0]],
  q: (o, A, B, u) => `${o} pasa de ${A} a ${B} ${u}. ¿Qué porcentaje ha variado? (Escribe el número; negativo si ha bajado.)`,
  s: (A, B, i, p, u) => `Índice de variación: final : inicial = ${B} : ${A} = ${i}. ${p > 0 ? `Es mayor que 1: ha subido (${i} − 1) · 100 = <b>${p} %</b>.` : `Es menor que 1: ha bajado (1 − ${i}) · 100 = ${-p} %, es decir, <b>${neg(p)} %</b>.`}${p >= 100 ? ` ¡Más del 100 %! Doblarse es subir un 100 %; triplicarse, un 200 %.` : ""}`,
  pp_ctx: [["El paro"], ["El porcentaje de alumnos que van en bici"], ["La humedad del aire"], ["El porcentaje de votos de un partido"]],
  pp_q: (w, a, b) => `${w} pasa del ${a} % al ${b} %. ¿Cuántos puntos porcentuales ha variado? ¿Y qué porcentaje ha variado? (Negativo si baja.)`,
  pp_f: ["Puntos porcentuales", "Porcentaje de variación"],
  pp_s: (a, b, d, p) => `Puntos porcentuales: la resta de los dos porcentajes, ${b} − ${a} = <b>${neg(d)}</b> puntos. Porcentaje de variación: esa diferencia comparada con el valor inicial, ${neg(d)} : ${a} = ${String(d / a).replace(".", ",").replace("-", "−")}, es decir, <b>${String(p).replace(".", ",").replace("-", "−")} %</b>. No es lo mismo: ${Math.abs(d)} puntos de ${a} son ${String(Math.abs(p)).replace(".", ",")} % de lo que había.`,
};
// m8.consumo
S.CO = {
  prods: [["El café", "kg", "g"], ["El arroz", "kg", "g"], ["El detergente líquido", "L", "mL"], ["El aceite", "L", "mL"], ["La harina", "kg", "g"], ["El zumo", "L", "mL"]],
  pu_q: (p, s1, e1, s2, e2, U) => `${p} se vende en dos formatos: ${s1} a ${e1} € y ${s2} a ${e2} €. ¿A cuántos euros sale el ${U === "kg" ? "kilo" : "litro"} del formato más barato por ${U === "kg" ? "kilo" : "litro"}?`,
  pu_s: (rows, U, win, best) => `Precio por ${U === "kg" ? "kilo" : "litro"} = precio : cantidad (en ${U}). ${rows.map(([e, q, k]) => `${e} : ${q} = ${k} €/${U}`).join("; ")}. Sale más barato el formato de ${win}: <b>${best} €/${U}</b>.`,
  of_q: [p => `Con la oferta «2.ª unidad al ${p} %» (un ${p} % de descuento en la segunda unidad), ¿qué porcentaje de descuento consigues sobre el total si compras dos?`,
    (n, m) => `La oferta «${n}x${m}» (te llevas ${n} y pagas ${m}), ¿a qué porcentaje de descuento equivale? (Redondea a las décimas si hace falta.)`,
    g => `Un champú trae un «${g} % gratis» al mismo precio. ¿A qué porcentaje de descuento equivale? (Redondea a las décimas si hace falta.)`],
  of_s: [(p, f, t, s, d) => `Por 2 unidades pagas 1 + ${f} = ${t}. Te ahorras ${s} de 2: ${s} : 2 = ${String(+s.replace(",", ".") / 2).replace(".", ",")}, es decir, un <b>${d} %</b> (no un ${p} %).`,
    (n, m, d) => `Te llevas ${n} y pagas ${m}: no pagas ${n - m} de cada ${n}. ${n - m}/${n} = ${d} %, así que el descuento es de un <b>${d} %</b>.`,
    (g, t, d) => `Por el mismo dinero te llevas ${t} en vez de 100: lo que pagarías por los ${g} de regalo es ${g}/${t} del total, un <b>${d} %</b> de descuento (no un ${g} %).`],
  pl_q: (C, n, q) => `Un ordenador cuesta ${C} € al contado o ${n} cuotas de ${q} €. ¿Qué porcentaje más se paga a plazos?`,
  pl_s: (n, q, T, C, D, i, p) => `A plazos: ${n} · ${q} = ${T} €. Pagas ${T} − ${C} = ${D} € más. Comparado con el precio al contado: ${D} : ${C} = ${i}, es decir, un <b>${p} %</b> más.`,
  tar: [["Un gimnasio", "Otro", "matrícula"], ["Una compañía de móvil", "Otra", "alta"], ["Una academia de música", "Otra", "matrícula"], ["Un club de natación", "Otro", "matrícula"]],
  ta_q: (w, a, b, F) => `${w[0]} cobra ${a} € al mes. ${w[1]} cobra ${b} € al mes más ${F} € de ${w[2]} (se paga una sola vez). ¿Con cuántos meses cuestan lo mismo?`,
  ta_s: (a, b, F, d, m) => `Con x meses, el primero cuesta ${a}x y el segundo ${b}x + ${F}. Igualamos: ${a}x = ${b}x + ${F} → ${d}x = ${F} → x = ${F} : ${d} = <b>${m}</b> meses. A partir de ahí sale más barato el segundo, porque cada mes cuesta ${d} € menos.`,
};
// m8.formula (y los pasos de la fórmula en m8.segundo y m8.ecproblema)
const cx1 = k => k === 1 ? "" : String(k);
S.FO = {
  fs_abc: (a, b, c) => `a = ${a}, b = ${b}, c = ${c}.`,
  fs_D: (pb, pa, pc, b2, ac4, D) => `Discriminante: Δ = b² − 4ac = ${pb}² − 4 · ${pa} · ${pc} = ${b2} ${ac4 < 0 ? "+" : "−"} ${Math.abs(ac4)} = ${neg(D)}.`,
  fs_doble: (nb, den, r) => `Δ = 0: hay una sola solución (doble), x = −b/(2a) = ${nb}/${den} = <b>${r}</b>.`,
  fs_x: (nb, sD, den, f1, r1, f2, r2) => `√Δ = ${sD}. x = (−b ± √Δ)/(2a) = (${nb} ± ${sD})/${den}: x₁ = (${nb} + ${sD})/${den} = ${f1} = <b>${r1}</b>; x₂ = (${nb} − ${sD})/${den} = ${f2} = <b>${r2}</b>.`,
  fs_neg: p => `a es negativo: multiplicamos toda la ecuación por −1, que no cambia las soluciones: ${p} = 0.`,
  fs_simp: (g, p) => `Todos los coeficientes son múltiplos de ${g}: dividimos entre ${g}: ${p} = 0.`,
  r_q: (p, dec) => `Resuelve la ecuación <b>${p} = 0</b>.${dec ? " (Una solución no es entera: escríbela con decimales y separa las dos soluciones con punto y coma.)" : ""}`,
  hint_pc: "Escribe las soluciones separadas por punto y coma, por ejemplo 1,5; −3.",
  n_q: p => `¿Cuántas soluciones tiene la ecuación <b>${p} = 0</b>? (Calcula el discriminante.)`,
  n_o: ["Dos soluciones distintas", "Una solución (doble)", "Ninguna solución"],
  n_s: (a, b, c, pb, pa, pc, b2, ac4, D, caso) => `a = ${a}, b = ${b}, c = ${c}. Δ = b² − 4ac = ${pb}² − 4 · ${pa} · ${pc} = ${b2} ${ac4 < 0 ? "+" : "−"} ${Math.abs(ac4)} = ${neg(D)}. ` +
    [`Δ es positivo: <b>dos soluciones distintas</b> (√Δ se puede sumar y restar).`, `Δ = 0: <b>una solución</b> (doble), porque sumar o restar √0 da lo mismo.`, `Δ es negativo: <b>ninguna solución</b>, porque no existe la raíz cuadrada de un número negativo.`][caso],
};
// m8.ecden
S.ED = {
  q: e => `Resuelve la ecuación <b>${e}</b>. (Si la solución no es entera, escríbela como fracción.)`,
  hint: "Escribe un número entero o una fracción, por ejemplo 5 o 2/5.",
  s: (dens, M, divs, mul, minus, ex, agr, X, div) => `m.c.m.(${dens}) = ${M}. Multiplicamos cada término por ${M} (${divs}): ${mul}. Quitamos paréntesis${minus ? " (un menos delante cambia los dos signos de dentro)" : ""}: ${ex}. Agrupamos las x a un lado y los números al otro: ${agr === `x = ${X}` ? `<b>${agr}</b>.` : `${agr}. ${div ? `x = ${div} = ` : ""}<b>${div ? X : `x = ${X}`}</b>.`}`,
};
// m8.ecproblema
S.EP = {
  ed_q: (k, n, m) => `Un padre tiene ${k} veces la edad de su hijo. Dentro de ${n} años tendrá ${m === 2 ? "el doble" : m === 3 ? "el triple" : `${m} veces`} de la edad que tenga entonces su hijo. ¿Cuántos años tiene ahora el hijo?`,
  ed_s: (k, n, m, km, d, x, kx) => `Incógnita: x = edad del hijo ahora; el padre tiene ${k}x. Dentro de ${n} años: el hijo, x + ${n}; el padre, ${k}x + ${n}. Ecuación: ${k}x + ${n} = ${m}(x + ${n}). Resolvemos: ${k}x + ${n} = ${m}x + ${m * n} → ${cx1(km)}x = ${m * n} − ${n} = ${d} → x = <b>${x}</b> años. Comprobación: ahora, ${x} y ${kx} años; dentro de ${n}, ${x + n} y ${kx + n}, y ${kx + n} = ${m} · ${x + n}. ✓`,
  re_q: (A, d) => `Un huerto rectangular tiene ${A} m² de área y su largo mide ${d} m más que su ancho. ¿Cuántos metros mide el ancho?`,
  re_s: (d, A, D, sD, x, nn, x2, L) => `Incógnita: x = ancho; el largo, x + ${d}. Ecuación: x(x + ${d}) = ${A}, es decir, x² + ${cx1(d)}x − ${A} = 0. Δ = ${d}² + 4 · ${A} = ${D}, √${D} = ${sD}. x = (−${d} ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (negativa: un lado no puede medir eso, no sirve). Ancho: <b>${x} m</b> (y largo, ${L} m). Comprobación: ${x} · ${L} = ${A}. ✓`,
  co_q: P => `El producto de dos números naturales consecutivos es ${P}. ¿Cuál es el menor?`,
  co_s: (P, D, sD, x, x2) => `Incógnita: x = el menor; el siguiente, x + 1. Ecuación: x(x + 1) = ${P}, es decir, x² + x − ${P} = 0. Δ = 1 + 4 · ${P} = ${D}, √${D} = ${sD}. x = (−1 ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (no es natural, no sirve). El menor es <b>${x}</b>. Comprobación: ${x} · ${x + 1} = ${P}. ✓`,
  cu_q: (k, N) => `Si al cuadrado de un número natural le restas ${k === 1 ? "el propio número" : k === 2 ? "su doble" : "su triple"}, obtienes ${N}. ¿Qué número es?`,
  cu_s: (k, N, D, sD, x, x2) => `Incógnita: x. Ecuación: x² − ${cx1(k)}x = ${N}, es decir, x² − ${cx1(k)}x − ${N} = 0. Δ = ${k}² + 4 · ${N} = ${D}, √${D} = ${sD}. x = (${k} ± ${sD})/2: x₁ = ${x}, x₂ = ${neg(x2)} (no es natural, no sirve). El número es <b>${x}</b>. Comprobación: ${x}² − ${k === 1 ? "" : `${k} · `}${x} = ${x * x} − ${k * x} = ${N}. ✓`,
};
// m8.sistema, m8.sissus, m8.sisigu, m8.sisred
S.SI = {
  por: ["(Resuélvelo por sustitución.)", "(Resuélvelo por igualación.)", "(Resuélvelo por reducción.)"],
  desp: (v, k, s) => `Despejamos ${v} en la ${k ? "segunda" : "primera"} ecuación (su coeficiente es ${s < 0 ? "−1" : "1"}):`,
  sust: o => `Sustituimos en la ${o ? "segunda" : "primera"}:`,
  vuelve: "Volvemos a la ecuación despejada:",
  comp: "Comprobación:",
  mult: (i, m, eq) => `Multiplicamos la ${i ? "segunda" : "primera"} ecuación por ${m}: ${eq}.`,
  resta: "Los coeficientes son iguales: restamos (primera menos segunda) término a término:",
  suma: "Los coeficientes son opuestos: sumamos término a término:",
  esdecir: "es decir,",
  en1: "Sustituimos en la primera ecuación:",
  en1y: "Sustituimos en la primera expresión:",
  ya: "Las dos ecuaciones ya tienen la y despejada:",
  desp2: "Despejamos y en las dos ecuaciones:",
  iguala: "Igualamos las dos expresiones de y:",
};
// m8.pitplano
S.PL = {
  diag: "La diagonal es la hipotenusa:", lado: "El lado es la hipotenusa:",
  hip: (t, a, b, a2, b2, c, u) => `${t} ${a}² + ${b}² = ${a2} + ${b2} = ${a2 + b2}, así que mide √${a2 + b2} = <b>${c} ${u}</b>.`,
  iso: m => `La altura divide la base por la mitad (${m} cm): sale un triángulo rectángulo con el lado igual como hipotenusa.`,
  esc: "La escalera es la hipotenusa y la altura, un cateto (se resta):",
  cat: (c, a, c2, a2, b, u) => `cateto² = ${c}² − ${a}² = ${c2} − ${a2} = ${c2 - a2}, así que el cateto mide √${c2 - a2} = <b>${b} ${u}</b>.`,
  rombo_q: (D, d) => `Un rombo tiene diagonales de ${D} cm y ${d} cm. ¿Cuánto mide su lado?`,
  rombo: (p, q) => `Las diagonales de un rombo se cortan en ángulo recto y por la mitad: con el lado forman un triángulo rectángulo de catetos ${p} y ${q} (las mitades de las diagonales).`,
  dist_q: (A, B) => `¿Cuál es la distancia entre los puntos A${A} y B${B}?`,
  dist: (dx, dy, a, b, s, c) => `Los catetos son las diferencias de las coordenadas: en x, ${dx}; en y, ${dy} (si sale negativo no importa, porque se eleva al cuadrado). d² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${s}, así que d = √${s} = <b>${c}</b>.`,
  equi_q: l => `Calcula la altura de un triángulo equilátero de ${l} cm de lado. (Usa la calculadora para la raíz y redondea a las décimas.)`,
  hex_q: l => `Calcula la apotema de un hexágono regular de ${l} cm de lado. (Usa la calculadora para la raíz y redondea a las décimas.)`,
  equi: "La altura cae en el punto medio de la base: sale un triángulo rectángulo con el lado como hipotenusa y la mitad del lado como cateto.",
  hex: l => `Un hexágono regular son 6 triángulos equiláteros de ${l} cm de lado, y la apotema es la altura de uno de ellos: hipotenusa ${l} y cateto ${l / 2} (la mitad del lado).`,
  cat2: (l, m, l2, m2, h2, d3, v) => `h² = ${l}² − ${m}² = ${l2} − ${m2} = ${h2}, así que h = √${h2} = ${d3}… ≈ <b>${v} cm</b>.`,
};
// m8.pitesp
S.PE3 = {
  caja: (a, b, c, a2, b2, c2, s, d) => `Pitágoras en el espacio: D² = ${a}² + ${b}² + ${c}² = ${a2} + ${b2} + ${c2} = ${s}, así que D = √${s} = <b>${d} cm</b>.`,
  cono_g_q: (r, h) => `Un cono tiene ${r} cm de radio y ${h} cm de altura. ¿Cuánto mide su generatriz?`,
  cono_h_q: (g, r) => `Un cono tiene una generatriz de ${g} cm y un radio de ${r} cm. ¿Cuánto mide su altura?`,
  cono: "La altura, el radio y la generatriz forman un triángulo rectángulo, y la generatriz es la hipotenusa.",
  hip3: (v, a, b, a2, b2, c, u) => `${v}² = ${a}² + ${b}² = ${a2} + ${b2} = ${a2 + b2}, así que ${v} = √${a2 + b2} = <b>${c} ${u}</b>.`,
  cat3: (v, c, a, c2, a2, b) => `${v}² = ${c}² − ${a}² = ${c2} − ${a2} = ${c2 - a2}, así que ${v} = √${c2 - a2} = <b>${b} cm</b>.`,
  pir_q: (L, h) => `Una pirámide de base cuadrada tiene ${L} m de lado y ${h} m de altura. ¿Cuánto mide su apotema (la altura de cada cara lateral)?`,
  pir: p => `La altura de la pirámide, la apotema de la base (en un cuadrado es la mitad del lado: ${p} m) y la apotema de la pirámide, a′, forman un triángulo rectángulo; a′ es la hipotenusa.`,
  cabe_q: (L, a, b, c) => `¿Cabe una varilla de ${L} cm dentro de una caja de ${a} × ${b} × ${c} cm (puede ir inclinada)?`,
  cabe: (a, b, c, a2, b2, c2, s, D, L, ok) => `Lo más largo que cabe es la diagonal: D² = ${a}² + ${b}² + ${c}² = ${a2} + ${b2} + ${c2} = ${s}, así que D = √${s} ≈ ${D} cm (con la calculadora). La varilla mide ${L} cm, ${ok ? "menos" : "más"} que la diagonal: <b>${ok ? "sí" : "no"} cabe</b>.`,
};
// m8.trisem
S.TS = {
  ang_q: (a, b, c, g) => `Un triángulo tiene dos ángulos de ${a}° y ${b}°. Otro tiene dos ángulos de ${c}° y ${g}°. ¿Son semejantes?`,
  ang_s: (a, b, c, g, yes) => `El tercer ángulo del primero mide 180° − ${a}° − ${b}° = ${c}°: sus ángulos son ${a}°, ${b}° y ${c}°. ${yes ? `El segundo tiene ${b}° y ${g}°, dos ángulos iguales a los del primero: <b>sí</b> son semejantes (en los triángulos basta con dos ángulos iguales).` : `El segundo tiene ${g}°, que no es ninguno de esos: <b>no</b> son semejantes.`}`,
  lad_q: (p, q) => `¿Son semejantes un triángulo de lados ${p} cm y otro de lados ${q} cm?`,
  lad_s: (l, yes) => `Dividimos cada lado del segundo entre su correspondiente del primero (el mayor con el mayor…): ${l}. ${yes ? "Las tres razones son iguales: los lados son proporcionales y <b>sí</b> son semejantes." : "Las razones no son iguales: <b>no</b> son semejantes."}`,
  tal_q: (AD, DB, AE) => `En un triángulo ABC, una paralela a BC corta AB en D y AC en E. Si AD = ${AD} cm, DB = ${DB} cm y AE = ${AE} cm, ¿cuánto mide EC?`,
  tal_s: (AD, DB, AE, k, EC) => `Tales: AE/AD = EC/DB. Razón: AE : AD = ${AE} : ${AD} = ${k}. Así que EC = DB · ${k} = ${DB} · ${k} = <b>${EC} cm</b>.`,
  de_q: (AD, DB, BC) => `En un triángulo ABC, una paralela a BC corta AB en D y AC en E. Si AD = ${AD} cm, DB = ${DB} cm y BC = ${BC} cm, ¿cuánto mide DE?`,
  de_s: (AD, DB, AB, BC, DE) => `Los triángulos ADE y ABC son semejantes (están en posición de Tales). Cuidado: el lado que corresponde a AD es AB entero, AB = ${AD} + ${DB} = ${AB} cm, no DB. DE/BC = AD/AB: DE = ${BC} · ${AD}/${AB} = <b>${DE} cm</b>.`,
};
// m8.escala
S.ES = {
  hab_q: (n, a, b) => `En el plano de una casa a escala 1 : ${n}, una habitación rectangular mide ${a} cm × ${b} cm. ¿Cuántos metros cuadrados tiene en la realidad?`,
  hab_s: (n, a, b, A, B, Am, Bm, ar) => `Del plano a la realidad, cada longitud se multiplica por ${n}: ${a} · ${n} = ${A} cm = ${Am} m y ${b} · ${n} = ${B} cm = ${Bm} m. Área: ${Am} · ${Bm} = <b>${ar} m²</b>.`,
  sup_q: (n, s) => `En un plano a escala 1 : ${n}, un jardín ocupa ${s} cm². ¿Cuántos metros cuadrados tiene en la realidad?`,
  sup_s: (n, s, n2, c, m) => `Las longitudes se multiplican por ${n}, así que las áreas se multiplican por ${n}² = ${n2}: ${s} · ${n2} = ${c} cm². Como 1 m² = 10 000 cm², son ${c} : 10 000 = <b>${m} m²</b>.`,
  maq_q: (n, V) => `Una maqueta de un depósito a escala 1 : ${n} tiene un volumen de ${V} cm³. ¿Cuántos metros cúbicos tiene el depósito real?`,
  maq_s: (n, V, n3, c, m) => `Las longitudes se multiplican por ${n}, así que los volúmenes se multiplican por ${n}³ = ${n3}: ${V} · ${n3} = ${c} cm³. Como 1 m³ = 1 000 000 cm³, son ${c} : 1 000 000 = <b>${m} m³</b>.`,
  amp_q: (n, d) => `Un dibujo de un insecto a escala ${n} : 1 (de ampliación) mide ${d} cm. ¿Cuántos milímetros mide el insecto de verdad?`,
  amp_s: (n, d, mm, r) => `Escala ${n} : 1: el dibujo es ${n} veces más grande que la realidad, así que se divide entre ${n}. ${d} cm = ${mm} mm; ${mm} : ${n} = <b>${r} mm</b>.`,
};
// m8.poliedros
const ELN = ["caras", "vértices", "aristas"];
S.PO = {
  el_q: (pir, n, el) => `¿Cuántas ${ELN[el]} tiene ${pir ? "una pirámide" : "un prisma"} cuya base es un polígono de ${n} lados?`,
  el_s: (pir, n, el, v) => pir
    ? [`La base y ${n} caras laterales (triángulos): ${n} + 1 = <b>${v}</b>.`, `Los ${n} de la base y el vértice de arriba (la cúspide): ${n} + 1 = <b>${v}</b>.`, `${n} aristas en la base y ${n} laterales, que suben hasta la cúspide: 2 · ${n} = <b>${v}</b>.`][el]
    : [`Las dos bases y ${n} caras laterales (rectángulos): ${n} + 2 = <b>${v}</b>.`, `${n} vértices en cada base: 2 · ${n} = <b>${v}</b>.`, `${n} aristas en cada base y ${n} laterales: 3 · ${n} = <b>${v}</b>.`][el],
  eu_q: (miss, C, V, A) => `Un poliedro (sin agujeros) tiene ${[`${V} vértices y ${A} aristas`, `${C} caras y ${A} aristas`, `${C} caras y ${V} vértices`][miss]}. ¿Cuántas ${ELN[[0, 1, 2][miss]]} tiene, según la fórmula de Euler?`,
  eu_s: (miss, C, V, A) => `Fórmula de Euler: C + V = A + 2. ` + [
    `Sustituimos: C + ${V} = ${A} + 2, es decir, C + ${V} = ${A + 2}. Despejamos: C = ${A + 2} − ${V} = <b>${C}</b> caras.`,
    `Sustituimos: ${C} + V = ${A} + 2, es decir, ${C} + V = ${A + 2}. Despejamos: V = ${A + 2} − ${C} = <b>${V}</b> vértices.`,
    `Sustituimos: ${C} + ${V} = A + 2, es decir, ${C + V} = A + 2. Despejamos: A = ${C + V} − 2 = <b>${A}</b> aristas.`][miss] + " (Euler da el número, pero no dice qué poliedro es: puede haber varios.)",
  cil_q: (a, b) => `Un rectángulo de ${a} cm × ${b} cm gira alrededor de su lado de ${a} cm. ¿Cuánto mide el radio del cilindro que se forma?`,
  cil_s: (a, b) => `El lado sobre el que gira (${a} cm) es el eje: es la altura del cilindro. El otro lado, perpendicular al eje, describe la base: el radio mide <b>${b} cm</b>.`,
  con_q: (a, b, g) => `Un triángulo rectángulo de catetos ${a} cm y ${b} cm gira alrededor del cateto de ${a} cm. ¿Cuánto mide ${g ? "la generatriz" : "el radio de la base"} del cono que se forma?`,
  con_s: (a, b, c, g) => `El cateto sobre el que gira (${a} cm) es el eje: es la altura del cono. El otro cateto es el radio de la base, ${b} cm.` + (g ? ` La generatriz es la hipotenusa: g² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, así que g = √${c * c} = <b>${c} cm</b>.` : ` El radio mide <b>${b} cm</b>.`),
  // [nombre, caras en cada vértice, polígono, ángulo]
  reg: [["tetraedro", 3, "triángulos equiláteros", 60], ["cubo", 3, "cuadrados", 90], ["octaedro", 4, "triángulos equiláteros", 60], ["dodecaedro", 3, "pentágonos regulares", 108], ["icosaedro", 5, "triángulos equiláteros", 60]],
  reg_q: n => `¿Cuántas caras se juntan en cada vértice de un ${n}?`,
  reg_s: (n, k, pol, ang, s) => `El ${n} tiene caras que son ${pol}, con ángulos de ${ang}°. En cada vértice se juntan <b>${k}</b>: ${k} · ${ang}° = ${s}°, menos de 360° (si sumaran 360° o más, no se podría cerrar el vértice).`,
};
// m8.funcar
S.FC = {
  int_q: up => `Mira la gráfica. ¿En qué intervalo es <b>${up ? "creciente" : "decreciente"}</b> la función?`,
  int_s: (up, iv, x1, y1, x2, y2) => `Leyendo de izquierda a derecha, entre x = ${x1} y x = ${x2} la gráfica ${up ? "sube" : "baja"} (de y = ${y1} a y = ${y2}): es ${up ? "creciente" : "decreciente"} en <b>${iv}</b>. Los intervalos se dan con los valores de la <b>x</b>, no de la y.`,
  de: (a, b) => `De ${a} a ${b}`,
  rec_q: "Mira la gráfica (está dibujada entera, de x = 0 a x = 8). ¿Cuál es su recorrido?",
  rec_s: (a, b) => `El recorrido son los valores que toma la <b>y</b>: el punto más bajo de la gráfica está a altura ${a} y el más alto, a ${b}. Recorrido: <b>de ${a} a ${b}</b>. (De 0 a 8 es el dominio, los valores de la x.)`,
  max_q: "Mira la gráfica. ¿En qué punto tiene la función su máximo?",
  max_s: (x, y) => `La función crece hasta x = ${x} y después decrece: el punto más alto es <b>(${x}, ${y})</b>. El máximo es un punto (x, y); ${y} es solo el valor máximo, la y.`,
  cx_q: e => `¿En qué valor de x corta al eje X la gráfica de <b>y = ${e}</b>?`,
  cx_s: (e, a, b, x) => `En el eje X la altura es 0: hacemos y = 0. ${e} = 0 → ${a === 1 ? "" : a === -1 ? "−" : neg(a)}x = ${neg(-b)} → x = ${neg(-b)} : ${a < 0 ? `(${neg(a)})` : a} = <b>${neg(x)}</b>. Corta al eje X en (${neg(x)}, 0).`,
};
// m8.afin: [contexto, n posibles, m posibles]
const AFQ = [
  (n, m) => `Un taxi cobra ${n} € de bajada de bandera y ${m} € por kilómetro.`,
  (n, m) => `Una plataforma de vídeo cobra ${n} € de alta y ${m} € al mes.`,
  (n, m) => `Un depósito tiene ${n} litros y pierde ${m} litros cada hora.`,
  (n, m) => `Una vela mide ${n} cm y se consume ${m} cm cada hora.`,
  (n, m) => `Un fontanero cobra ${n} € por ir a casa y ${m} € por cada hora de trabajo.`];
const AFX = [["a los kilómetros", "al precio (en €)", "kilómetro"], ["a los meses", "a lo que se ha pagado (en €)", "mes"], ["a las horas", "a los litros que quedan", "hora"], ["a las horas", "a lo que mide la vela (en cm)", "hora"], ["a las horas", "al precio (en €)", "hora"]];
S.AF = {
  mn_n: "n",   // ordenada en el origen (en: b)
  ctx: [[0, [2.5, 3, 3.5, 4], [1, 1.2, 1.5, 2]], [1, [5, 10, 15], [8, 10, 12]], [2, [100, 120, 150, 200], [-5, -8, -10]], [3, [20, 24, 30], [-1.5, -2]], [4, [20, 30, 40], [15, 20, 25]]],
  f_q: (c, n, m) => `${AFQ[c](n, m)} Llamamos x ${AFX[c][0]} e y ${AFX[c][1]}.`,
  f_s: (c, n, m, E) => `Al principio (x = 0), y vale ${n}: es la ordenada en el origen, n = ${n}. Cada ${AFX[c][2]}, y cambia ${m.startsWith("−") ? `${m} (baja)` : `+${m}`}: es la pendiente, m = ${m}. Fórmula: <b>${E}</b>.`,
  y_q: (c, x) => `¿Cuánto vale y cuando x = ${x}?`,
  y_s: (E, x, m, n, y, c) => `La fórmula es ${E}. Sustituimos x = ${x}: y = ${m} · ${x} + ${n} = <b>${y}</b>.`,
  x_q: (c, y) => `¿Para qué valor de x se cumple y = ${y}?`,
  x_s: (E, y, m, n, d, x, c) => `La fórmula es ${E}. Hacemos y = ${y}: ${y} = ${m}x + ${n} → ${m}x = ${y} − ${n} = ${d} → x = ${d} : ${m.startsWith("−") ? `(${m})` : m} = <b>${x}</b>.`,
  mn_q: e => `¿Cuáles son la pendiente (m) y la ordenada en el origen (n) de la recta <b>${e}</b>?`,
  mn_s: (e, m, n) => `Primero se ordena: y = ${e}. La pendiente es el número que multiplica a la x: <b>m = ${neg(m)}</b>; la ordenada en el origen es el número suelto: <b>n = ${neg(n)}</b>. (Cuidado: el primer número que se ve no es siempre la pendiente.)`,
};
// m8.muestra
const yy = l => l.join(", ").replace(/, ([^,]*)$/, " y $1");
S.MU = {
  prop_ctx: [["En un instituto hay", ["de ESO", "de Bachillerato", "de FP"]], ["En un pueblo viven", ["en el barrio Norte", "en el barrio Sur", "en el centro"]], ["Un club tiene", ["infantiles", "juveniles", "adultos"]]],
  prop_q: (ctx, nm, sz, n, j) => `${ctx} ${yy(sz.map((s, i) => `${s} ${nm[i]}`))}. Se quiere elegir una muestra de ${n} personas en la que cada grupo esté en la misma proporción que en el total. ¿Cuántas tienen que ser ${nm[j]}?`,
  prop_s: (nm, s, T, p, t, n, r) => `Los ${nm} son ${s} de ${T}, es decir, ${s}/${T} = ${p}/${t} del total. En la muestra tiene que haber la misma fracción: ${p}/${t} de ${n} = ${n} : ${t} · ${p} = <b>${r}</b>.`,
  // [situación, ¿sesgada?, por qué]
  ses: [["Para saber cuánto deporte hacen los vecinos de un pueblo, se pregunta a las personas que salen del gimnasio.", 1, "los que salen del gimnasio hacen más deporte que la media: la muestra favorece a un tipo de vecinos"],
    ["Para saber cuántas horas usan internet los españoles, se hace una encuesta… por internet.", 1, "solo contesta quien usa internet; los que no lo usan no aparecen nunca"],
    ["Para conocer la opinión de todo el instituto sobre el comedor, se pregunta solo a los alumnos de 1.º.", 1, "los de 1.º no representan a los de los demás cursos"],
    ["Para conocer la estatura media de los alumnos de un instituto, se sortean 60 nombres entre todas las listas de clase.", 0, "todos los alumnos tienen la misma posibilidad de salir"],
    ["Para saber qué equipo de fútbol prefieren en una ciudad, se pregunta a la salida del estadio de uno de los equipos.", 1, "a la salida de un estadio hay sobre todo aficionados de ese equipo"],
    ["Para saber cuánto tiempo leen los alumnos, se pregunta en la biblioteca un sábado por la mañana.", 1, "quien está en la biblioteca un sábado seguramente lee más que la media"],
    ["Para estudiar el peso de las naranjas de una finca, se cogen al azar 5 naranjas de cada uno de 20 árboles elegidos por sorteo.", 0, "los árboles y las naranjas se eligen al azar, sin preferir ningún tipo"],
    ["Para saber qué comen los niños de un colegio, se sortean 3 alumnos de cada clase y se apunta lo que comen durante una semana.", 0, "todas las clases están representadas y los alumnos se eligen al azar"]],
  ses_q: t => `${t} ¿Está sesgada la muestra?`,
  ses_s: (s, w) => s ? `<b>Sí</b>: ${w}. Las conclusiones no valdrían para toda la población.` : `<b>No</b>: ${w}. Es una muestra representativa.`,
  // [enunciado(N, n), N, n, variable]
  pm: [[(N, n) => `Para saber cuántas horas duermen los ${N} vecinos de un pueblo, se pregunta a ${n} de ellos.`, 1200, 150, "las horas que duerme cada vecino"],
    [(N, n) => `Para conocer el color favorito de los ${N} alumnos de un instituto, se pregunta a ${n}.`, 800, 80, "el color favorito"],
    [(N, n) => `Una fábrica produce ${N} bombillas al día; para comprobar cuánto duran, se prueban ${n}.`, 5000, 100, "lo que dura cada bombilla"],
    [(N, n) => `Para saber cuántos libros leen al año los ${N} socios de una biblioteca, se pregunta a ${n}.`, 2000, 200, "el número de libros leídos"]],
  pm_q: (txt, x, v, w) => `${txt} ${w === 2 ? `¿Qué es «${v}»?` : `¿Qué son los ${x}?`}`,
  pm_o: ["La población", "La muestra", "Un individuo", "La variable estadística"],
  pm_s: (N, n, v) => `La **población** es el grupo entero que se quiere estudiar (los ${N}); la **muestra**, la parte a la que se pregunta de verdad (los ${n}); cada uno de ellos es un **individuo**, y lo que se mide o se pregunta («${v}») es la **variable estadística**.`.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
};
// m8.tablafrec
S.TF = {
  disc: [["el número de hermanos", [0, 1, 2, 3, 4]], ["el número de mascotas", [0, 1, 2, 3]], ["los goles marcados por partido", [0, 1, 2, 3, 4]], ["el número de libros leídos este verano", [0, 1, 2, 3, 4, 5]]],
  disc_q: (ctx, N, tab, v, k) => `Se pregunta a ${N} alumnos por ${ctx}. Valor: número de alumnos → ${tab}. ${[`¿Cuántos tienen ${v} o menos?`, `¿Cuántos tienen más de ${v}?`, `¿Qué porcentaje tiene ${v} o menos?`][k]}`,
  disc_s: (v, sm, acc, N, k, r) => `Frecuencia acumulada de ${v} (los que tienen ${v} o menos): ${sm} = ${acc}. ` + [`Respuesta: <b>${r}</b>.`, `Más de ${v} son los demás: ${N} − ${acc} = <b>${r}</b>.`, `Porcentaje: ${acc} : ${N} = ${String(acc / N).replace(".", ",")}, es decir, <b>${r} %</b>.`][k],
  ag_q: tab => `Estaturas de un grupo de alumnos, en cm (clase: número de alumnos): ${tab}.`,
  menos_q: L => `¿Cuántos alumnos miden menos de ${L} cm?`,
  menos_s: (L, cl, sm, r) => `Miden menos de ${L} cm los de las clases ${cl} (el ${L} ya va en la clase siguiente): ${sm} = <b>${r}</b>.`,
  modal_q: "¿Cuál es la clase modal?",
  modal_s: (c, f) => `La clase modal es la que tiene más datos: <b>${c}</b>, con ${f} alumnos.`,
  marca_q: c => `¿Cuál es la marca de clase de ${c}?`,
  marca_s: (a, b, m) => `La marca de clase es el punto medio de la clase: (${a} + ${b}) : 2 = <b>${m}</b>.`,
  front_q: x => `Un alumno mide exactamente ${x} cm. ¿En qué clase se cuenta?`,
  front_s: (x, c) => `Las clases son de la forma [a, b): incluyen el extremo de la izquierda y no el de la derecha. ${x} cm va en <b>${c}</b>.`,
  // [situación, gráfico (0 barras, 1 sectores, 2 histograma, 3 líneas), por qué]
  graf: [["El número de hermanos de los alumnos de una clase (0, 1, 2, 3…).", 0, "es una variable cuantitativa discreta: una barra para cada valor"],
    ["Qué parte del presupuesto de una familia se gasta en vivienda, comida, transporte y ocio.", 1, "se quiere ver qué parte del total es cada cosa"],
    ["Las estaturas de 200 personas, agrupadas en intervalos de 5 cm.", 2, "son datos continuos agrupados en intervalos: rectángulos pegados"],
    ["La temperatura de una ciudad cada día de un mes.", 3, "se quiere ver cómo cambia algo a lo largo del tiempo"],
    ["El número de goles marcados en cada partido de una liga (0, 1, 2…).", 0, "es una variable cuantitativa discreta: una barra para cada valor"],
    ["El reparto de los votos entre los partidos en unas elecciones.", 1, "se quiere ver qué parte del total se lleva cada partido"],
    ["El tiempo que tardan 100 alumnos en correr 1 km, agrupado en intervalos de 30 segundos.", 2, "es una variable continua agrupada en intervalos"],
    ["El número de visitantes de un museo cada mes durante dos años.", 3, "se quiere ver la evolución en el tiempo"]],
  graf_q: t => `¿Qué gráfico es el más adecuado para representar esto? ${t}`,
  graf_o: ["Diagrama de barras", "Diagrama de sectores", "Histograma", "Gráfico de líneas"],
  graf_s: (g, w) => `<b>${g}</b>: ${w}.`,
};
// m8.central
S.CE = {
  med_y: (a, b) => `${a} y ${b}`,
  ctx: [["el número de hermanos", [0, 1, 2, 3, 4]], ["la nota de un examen (de 4 a 9)", [4, 5, 6, 7, 8, 9]], ["el número de mascotas", [0, 1, 2, 3]], ["los libros leídos en verano", [0, 1, 2, 3, 4, 5]]],
  media_q: (ctx, N, tab) => `Se pregunta a ${N} alumnos por ${ctx}. Valor: número de alumnos → ${tab}. Calcula la media (en decimal).`,
  media_s: (pr, s, fs, N, m) => `Se multiplica cada valor por su frecuencia y se suma: ${pr} = ${s}. Total de datos: N = ${fs} = ${N}. Media = ${s} : ${N} = <b>${m}</b>. (Se divide entre ${N}, el total de datos, no entre el número de valores distintos.)`,
  med_q: (ctx, N, tab) => `Se pregunta a ${N} alumnos por ${ctx}. Valor: número de alumnos → ${tab}. Calcula la mediana.`,
  med_s: (N, odd, k, acc, vals, me, o) => odd
    ? `Hay ${N} datos (impar): la mediana es el dato que ocupa el lugar ${k} (deja ${k - 1} a cada lado). Frecuencias acumuladas: ${acc}. El dato ${k}.º vale ${vals}: <b>Me = ${me}</b>.`
    : `Hay ${N} datos (par): los centrales son el ${k}.º y el ${k + 1}.º. Frecuencias acumuladas: ${acc}. Esos dos datos valen ${vals}: <b>Me = ${me}</b> (la media de los dos).`,
  nota_q: (nm, n, m, m2) => `La media de los ${n} exámenes de ${nm} es un ${m}. ¿Qué nota necesita en el siguiente para que la media pase a ser un ${m2}?`,
  nota_s: (n, m, s, m2, n1, s2, x) => `Ahora sus notas suman ${n} · ${m} = ${s}. Con ${n1} exámenes y media ${m2}, tienen que sumar ${n1} · ${m2} = ${s2}. Le falta: ${s2} − ${s} = <b>${x}</b>.`,
  cual: [["El color favorito de los alumnos de una clase."], ["La marca de móvil que tienen los profesores de un instituto."], ["El deporte favorito de los socios de un club."]],
  datos: d => `Los minutos que tardan unos amigos en llegar al instituto: ${d}.`,
  el_q: t => `${t} ¿Qué medida describe mejor el valor típico?`,
  el_o: ["La media", "La mediana", "La moda"],
  el_s: (m, me, ext) => ext ? `Media: ${m}; mediana: ${me}. Hay un dato muy alejado de los demás que «tira» de la media hacia él: la <b>mediana</b> representa mejor a la mayoría.` : `Media: ${m}; mediana: ${me}. Los datos son parecidos, sin valores extremos: la <b>media</b> los representa bien y usa todos los datos.`,
  el_s2: "La variable es cualitativa (no son números): no se pueden calcular ni la media ni la mediana. Solo tiene sentido la <b>moda</b>, el valor más repetido.",
};
// m8.dispersion
S.DI = {
  dm_q: d => `Calcula la desviación media de los datos ${d}.`,
  dm_s: (sm, s, n, m, dl, ds, sd, dm) => `Media: (${sm}) : ${n} = ${s} : ${n} = ${m}. Distancias a la media (sin signo): ${dl}. Su suma: ${ds} = ${sd}. Desviación media: ${sd} : ${n} = <b>${dm}</b>. (Si sumas las diferencias con su signo, siempre te da 0: por eso se usan las distancias.)`,
  cmp_ctx: ["Puntos de dos jugadoras, A y B, en 5 partidos", "Minutos de espera de dos autobuses, A y B, durante 5 días", "Goles de dos equipos, A y B, en 5 jornadas"],
  cmp_q: (c, a, b) => `${c}: A → ${a}; B → ${b}. Tienen la misma media. ¿Cuál es más regular (sus datos están menos dispersos)?`,
  cmp_o: ["A", "B", "Son igual de regulares, porque tienen la misma media"],
  cmp_s: (m, ra, rb, da, db, w) => `Las dos series tienen media ${m}, así que la media no sirve para distinguirlos. Rango: A, ${ra}; B, ${rb}. Desviación media: A, ${da}; B, ${db}. El más regular es el de menor dispersión: <b>${w}</b>.`,
};
// m8.sucesos
const EXP = [n => "Se lanza un dado", n => `Se hace girar una ruleta con los números del 1 al ${n}`, n => `Se hace girar una ruleta con los números del 1 al ${n}`];
S.SU = {
  prop: (p, k) => ["sacar un número par", "sacar un número impar", "sacar un múltiplo de 3", "sacar un número primo", `sacar más de ${k}`, `sacar menos de ${k}`][p],
  head: (e, n, a, b) => `${EXP[e](n)}. A = «${a}» y B = «${b}».`,
  sets: (A, B) => `Escribimos los sucesos como conjuntos: A = ${A} y B = ${B}.`,
  u_q: "¿Cuántos resultados tiene A ∪ B?",
  u_s: (U, n) => `A ∪ B (A <b>o</b> B) reúne los resultados que están en alguno de los dos, sin repetir: ${U}. Tiene <b>${n}</b> resultados.`,
  i_q: "¿Cuántos resultados tiene A ∩ B?",
  i_s: (I, n) => `A ∩ B (A <b>y</b> B) son los resultados que están en los dos a la vez: ${I}. Tiene <b>${n}</b>${n === 1 ? " resultado" : " resultados"}.`,
  c_q: (e, n, a) => `${EXP[e](n)}. ¿Cuál es el suceso contrario de A = «${a}»?`,
  c_s: (A, nA, inc) => `A = ${A}. El contrario, Ā, son <b>todos</b> los resultados que no están en A: <b>${nA}</b>. (${inc} no tiene nada en común con A, pero le faltan resultados: es incompatible con A, no su contrario.)`,
  k_q: "¿Son A y B compatibles (pueden ocurrir a la vez)?",
  k_s: (I, yes) => yes ? `A ∩ B = ${I}: tienen resultados en común, así que pueden ocurrir a la vez: <b>sí</b> son compatibles.` : `A ∩ B = ∅: no tienen ningún resultado en común. <b>No</b> son compatibles (son incompatibles).`,
};
// m8.laplace
S.LP = {
  mon_w: w => w,   // C = cara, X = cruz
  dd_q: (s, no) => `Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma ${no ? "<b>no</b> sea" : "sea"} ${s}? (Fracción irreducible.)`,
  dob_q: "Se lanzan dos dados. ¿Cuál es la probabilidad de sacar dobles (los dos dados con el mismo número)? (Fracción irreducible.)",
  dd_s: (pairs, f, r) => `Casos posibles: 6 · 6 = 36 (como en la tabla de doble entrada; (1, 2) y (2, 1) son casos distintos). Favorables: ${pairs}: ${f}. P = ${r}.`,
  no_s: (p, c) => `Lo que se pide es el contrario: 1 − ${p} = <b>${c}</b>.`,
  mon_q: k => `Se lanzan tres monedas. ¿Cuál es la probabilidad de sacar ${k === 0 ? "ninguna cara" : `exactamente ${k === 1 ? "una cara" : `${k} caras`}`}? (Fracción irreducible.)`,
  mon_s: (all, fav, f, r) => `Con un árbol salen 2 · 2 · 2 = 8 resultados igual de probables: ${all}. Favorables: ${fav || "ninguno"} (${f}). P = <b>${r}</b>.`,
  // [suceso, casos favorables, por qué, ¿se pide el contrario?]
  bar: [["sea un as", 4, "hay 4 ases, uno por palo", false], ["sea una figura (sota, caballo o rey)", 12, "hay 3 figuras en cada uno de los 4 palos: 12", false],
    ["sea de oros", 10, "cada palo tiene 10 cartas", false], ["sea un as o un rey", 8, "4 ases y 4 reyes: 8", false], ["sea una figura de oros", 3, "sota, caballo y rey de oros: 3", false],
    ["<b>no</b> sea una figura", 12, "hay 3 figuras en cada palo: 12 figuras", true], ["<b>no</b> sea de copas", 10, "hay 10 cartas de copas", true], ["<b>no</b> sea un as", 4, "hay 4 ases", true]],
  bar_q: t => `Se saca una carta de una baraja española de 40 cartas (4 palos: oros, copas, espadas y bastos; en cada uno, del 1 al 7, sota, caballo y rey). ¿Cuál es la probabilidad de que ${t}? (Fracción irreducible.)`,
  bar_s: (w, f, r) => `Casos posibles: 40. Favorables: ${w}. P = ${r}.`,
};
})();
