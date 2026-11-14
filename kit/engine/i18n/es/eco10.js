/* WikiAula — textos y bancos de gen/eco10.js (Economía y emprendimiento, Grado 10), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.eco10 = G.eco10 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const bank = (q, cats, why, items) => ({ q, cats, why, items, find: null });
const n = x => String(x).replace(".", ",");
const eu = x => window.WA.MATH.eur(x, window.WA.H);   // importe en euros: 6,10 · 12
Object.assign(S, {
  cualidad: bank(x => `${cap(x)}: ¿qué cualidad emprendedora?`, ["Creatividad", "Perseverancia", "Liderazgo", "Gestión del riesgo", "Ética"],
    ["Ideas nuevas.", "No rendirse.", "Guiar al equipo.", "Valorar lo que se puede perder.", "Actuar con honradez."],
    [["inventa una forma nueva de reciclar envases", 0], ["tras dos intentos fallidos, lo vuelve a intentar", 1], ["motiva al equipo y reparte tareas", 2],
     ["no invierte todos sus ahorros en un solo proyecto", 3], ["paga sueldos justos aunque gane algo menos", 4], ["no engaña en la publicidad", 4]]),
  canvas: bank(x => `${cap(x)}: ¿qué bloque del lienzo Canvas?`, ["Segmentos de clientes", "Propuesta de valor", "Canales", "Fuentes de ingresos", "Recursos clave", "Socios clave", "Estructura de costes"],
    ["Para quién.", "Por qué nos eligen.", "Cómo llegamos.", "Cómo ganamos dinero.", "Qué necesitamos.", "Quién nos ayuda.", "En qué gastamos."],
    [["familias con niños de 8 a 12 años", 0], ["aprender robótica en casa de forma divertida", 1], ["redes sociales y colegios", 2], ["15 € por clase", 3], ["kits de robots", 4],
     ["la tienda de electrónica que nos hace descuento", 5], ["kits, transporte y publicidad", 6]]),
  dafo: bank(x => `${cap(x)}: ¿qué parte del DAFO?`, ["Debilidad", "Amenaza", "Fortaleza", "Oportunidad"], ["Interna y negativa.", "Externa y negativa.", "Interna y positiva.", "Externa y positiva."],
    [["no tenemos experiencia en ventas", 0], ["local pequeño", 0], ["una gran cadena abre al lado", 1], ["sube el precio de la materia prima", 1], ["el dueño es un gran mecánico", 2],
     ["equipo muy motivado", 2], ["la ciudad construye carriles bici", 3], ["hay ayudas para negocios sostenibles", 3]]),
  forma: bank(x => `${cap(x)}: ¿qué forma jurídica?`, ["Autónomo", "Sociedad limitada", "Sociedad anónima", "Cooperativa"],
    ["Una persona, responsabilidad ilimitada.", "Responsabilidad limitada, pequeña o mediana.", "60 000 € de capital, acciones.", "Democrática: un socio, un voto."],
    [["una fontanera que trabaja por su cuenta", 0], ["responde de las deudas con su casa", 0], ["tres amigos que montan una tienda y limitan su riesgo", 1], ["empresa que cotiza en bolsa", 2],
     ["capital mínimo de 60 000 €", 2], ["agricultores que se unen para vender su aceite", 3], ["cada socio un voto, sea cual sea su aportación", 3]]),
  p4: bank(x => `${cap(x)}: ¿qué P del marketing?`, ["Producto", "Precio", "Distribución", "Promoción"], ["Qué vendemos.", "Cuánto cuesta.", "Dónde llega.", "Cómo se da a conocer."],
    [["botella reutilizable de diseño", 0], ["la marca y el logotipo", 0], ["1,50 €, como la competencia", 1], ["descuento por pronto pago", 1], ["venta en gimnasios y en internet", 2],
     ["acuerdo con un distribuidor", 2], ["anuncio en redes sociales", 3], ["patrocinio de una carrera", 3]]),
  co_q: (cf, cv, p, q) => `Costes fijos ${cf} €, coste variable ${cv} € por unidad, precio ${p} €. Si se venden ${q} unidades, ¿cuál es el beneficio (€)? (negativo si hay pérdidas)`,
  co_s: (cf, cv, p, q, b) => `${p} · ${q} − (${cf} + ${cv} · ${q}) = ${p * q} − ${cf + cv * q} = <b>${b}</b> €`,
  um_q: (cf, p, cv) => `Costes fijos ${cf} €, precio ${p} €, coste variable ${cv} € por unidad. ¿Cuál es el umbral de rentabilidad (unidades)?`,
  um_s: (cf, p, cv, q) => `${cf} : (${p} − ${cv}) = <b>${q}</b> unidades`,
  cp_q1: (C, r, t) => `¿Cuánto tendrás con ${C} € al ${r} % de interés compuesto durante ${t} años (€)?`,
  cp_s1: (C, r, t, V) => `${C} · ${n(1 + r / 100)}<sup>${t}</sup> = <b>${eu(V)}</b> €`,
  cp_q2: r => `Con la regla del 72, ¿en cuántos años se duplica un ahorro al ${r} % anual?`,
  cp_s2: r => `72 : ${r} = <b>${72 / r}</b> años`,
  pr_q1: (C, n, c) => `Pides ${C} € y devuelves ${n} cuotas de ${c} €. ¿Cuánto te cuesta el préstamo (intereses y comisiones, €)?`,
  pr_s1: (n, c, t, C) => `${n} · ${c} = ${t}; ${t} − ${C} = <b>${t - C}</b> €`,
  pr_q2: (C, n, c) => `Un préstamo de ${C} € se devuelve en ${n} cuotas de ${c} €. ¿Cuánto pagas en total (€)?`,
  pr_s2: (n, c, t) => `${n} · ${c} = <b>${t}</b> €`,
  financiero: bank(x => `${cap(x)}: ¿qué es?`, ["Depósito", "Bono", "Acción", "Fondo de inversión", "Diversificar", "Señal de estafa"],
    ["Ahorro seguro, poca rentabilidad.", "Prestar con interés (renta fija).", "Ser dueño de una parte (renta variable).", "Dinero de muchos invertido en muchos activos.", "Repartir el riesgo.", "Desconfía."],
    [["dejar el dinero en el banco a plazo fijo", 0], ["prestar al Estado a 10 años con interés", 1], ["comprar una parte de una empresa", 2], ["cobrar dividendos", 2],
     ["invertir junto a otros en 200 empresas", 3], ["repartir el ahorro entre varios productos", 4], ["«rentabilidad garantizada del 20 % al mes»", 5]]),
  contrato: bank(x => `${cap(x)}: ¿qué es?`, ["Contrato indefinido", "Contrato temporal", "Contrato formativo", "Derecho", "Deber"],
    ["Sin fecha de fin.", "Por una causa concreta.", "Para aprender un oficio.", "Lo que te corresponde.", "Lo que debes cumplir."],
    [["trabajo fijo sin fecha de finalización", 0], ["sustituir a una persona de baja", 1], ["campaña de Navidad", 1], ["aprender cocina en un restaurante mientras estudias", 2],
     ["30 días de vacaciones al año", 3], ["cobrar al menos el salario mínimo", 3], ["afiliarse a un sindicato", 3], ["cumplir las normas de seguridad", 4], ["hacer el trabajo con diligencia", 4]]),
  no_q: (b, ss, i) => `Salario bruto ${b} €. Seguridad Social ${n(ss)} % e IRPF ${i} %. ¿Cuál es el salario neto (€)?`,
  no_s: (b, ss, i, d, net) => `Deducciones ${n(ss + i)} % de ${b} = ${eu(d)} €; ${b} − ${eu(d)} = <b>${eu(net)}</b> €`,
  pu_q: (i, g) => `Un Estado ingresa ${i} y gasta ${g} (miles de millones). ¿De cuánto es su déficit o su superávit?`,
  pu_s: (i, g, d) => `${g} − ${i} = ${d} → ${d > 0 ? "déficit" : "superávit"} de <b>${Math.abs(d)}</b>`,
  sostenible: bank(x => `${cap(x)}: ¿qué es?`, ["Economía lineal", "Economía circular", "Externalidad negativa", "Externalidad positiva", "RSC"],
    ["Usar y tirar.", "Reparar, reutilizar, reciclar.", "Daño a otros que no se paga.", "Beneficio a otros que no se cobra.", "Compromiso voluntario de la empresa."],
    [["fabricar, usar una vez y tirar", 0], ["recoger envases para rellenarlos", 1], ["reparar en lugar de sustituir", 1], ["el humo de una fábrica", 2], ["el ruido de un aeropuerto", 2],
     ["las colmenas de un vecino polinizan tus frutales", 3], ["un parque bonito que revaloriza el barrio", 3], ["la empresa financia becas en su ciudad", 4]]),
});
})();
