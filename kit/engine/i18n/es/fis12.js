/* WikiAula — textos y bancos de gen/fis12.js (Física, Grado 12), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.fis12 = G.fis12 || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const G11 = "6,67·10<sup>−11</sup>", K9 = "9·10<sup>9</sup>", MU0 = "4π·10<sup>−7</sup>", QE = "1,6·10<sup>−19</sup>";
Object.assign(S, {
  cg_q: [(n, M, R) => `Calcula la intensidad del campo gravitatorio (N/kg) en la superficie de ${n} (M = ${M} kg; R = ${R} m; G = 6,67·10<sup>−11</sup>).`,
    (k) => `¿Cuánto vale g (N/kg) a una altura igual a ${k} radio${k > 1 ? "s" : ""} terrestre${k > 1 ? "s" : ""} sobre la superficie? (g₀ = 9,8 N/kg)`,
    (m1, m2, d) => `Dos masas de ${m1} kg y ${m2} kg están separadas ${d} m. ¿A qué distancia (m) de la primera se anula el campo entre ellas?`],
  cg_s: [(M, R, r) => `g = GM/R² = ${G11} · ${M} / (${R})² ≈ <b>${r} N/kg</b>`,
    (k, r) => `r = R + ${k}R = ${k + 1}R ⇒ g = g₀R²/r² = 9,8/${(k + 1) ** 2} ${Math.abs(9.8 / (k + 1) ** 2 - parseFloat(r.replace(",", "."))) > 1e-9 ? "≈" : "="} <b>${r} N/kg</b>`,
    (m1, m2, s, d, s1, r) => `A una distancia x de la primera, los dos campos valen lo mismo y G se simplifica: ${m1}/x² = ${m2}/(d − x)². Sacamos la raíz (todo es positivo): (d − x)/x = √(${m2}/${m1}) = ${s}, así que d − x = ${s}·x y x = d/(1 + ${s}) = ${d}/${s1} = <b>${r} m</b>. Más cerca de la masa pequeña.`],
  eg_q: [(n, M, R) => `Calcula la velocidad de escape (km/s) de ${n} (M = ${M} kg; R = ${R} m).`,
    (n, M, R) => `Calcula el potencial gravitatorio (MJ/kg) en la superficie de ${n} (M = ${M} kg; R = ${R} m). Escribe el signo.`],
  eg_s: [(M, R, vms, v) => `v<sub>e</sub> = √(2GM/R) = √(2 · ${G11} · ${M} / ${R}) ≈ ${vms} m/s = <b>${v} km/s</b>`,
    (M, R, V, r) => `V = −GM/R = −${G11} · ${M} / ${R} = ${V} J/kg = <b>${r} MJ/kg</b> (negativo: cero en el infinito)`],
  sa_q: [(h) => `¿A qué velocidad (km/s) gira un satélite en órbita circular a ${h} km de altura sobre la Tierra? (GM = 3,98·10<sup>14</sup> m³/s²; R = 6370 km)`,
    (h) => `¿Cuál es el periodo (min) de un satélite en órbita circular a ${h} km de altura? (GM = 3,98·10<sup>14</sup> m³/s²; R = 6370 km)`,
    (rp, vp, ra) => `Un cometa pasa a ${rp} UA del Sol a ${vp} km/s. ¿A qué velocidad (km/s) pasa por su afelio, a ${ra} UA?`],
  sa_s: [(h, r, vms, v) => `r = R + h = 6370 km + ${h} km = ${r} m (al <b>centro</b> de la Tierra y en metros). v = √(GM/r) = √(3,98·10<sup>14</sup> / ${r}) ≈ ${vms} m/s = <b>${v} km/s</b>`,
    (h, r, ts, t) => `r = R + h = 6370 km + ${h} km = ${r} m. T = 2π√(r³/GM) = 2π√((${r})³ / 3,98·10<sup>14</sup>) ≈ ${ts} s; ${ts} / 60 = <b>${t} min</b>`,
    (rp, vp, ra, r) => `En el perihelio y el afelio la velocidad es perpendicular al radio y se conserva el momento angular: r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub> ⇒ v<sub>a</sub> = r<sub>p</sub>v<sub>p</sub>/r<sub>a</sub> = ${rp} · ${vp} / ${ra} = <b>${r} km/s</b> (las UA se simplifican).`],
  hu_q: [(d, h) => `Con H₀ = ${h} (km/s)/Mpc, ¿a qué velocidad (km/s) se aleja una galaxia situada a ${d} Mpc?`, (v) => `Con H₀ = 70 (km/s)/Mpc, ¿a qué distancia (Mpc) está una galaxia que se aleja a ${v} km/s?`],
  hu_s: [(h, d, r) => `v = H₀·d = ${h} · ${d} = <b>${r} km/s</b>`, (v, r) => `d = v/H₀ = ${v} / 70 ≈ <b>${r} Mpc</b>`],
  rayas: [["Hα del hidrógeno", 656.3], ["Hβ del hidrógeno", 486.1], ["K del calcio", 393.4], ["H del calcio", 396.8]],
  hu_zq: (raya, l0, l) => `La raya ${raya}, de ${l0} nm en el laboratorio, aparece a ${l} nm en el espectro de una galaxia. Calcula su corrimiento al rojo z, la velocidad con que se aleja (km/s) y su distancia (Mpc). (c = 3·10<sup>5</sup> km/s; H₀ = 70 (km/s)/Mpc)`,
  hu_fv: "v (km/s)", hu_fd: "d (Mpc)",
  hu_zs: (l, l0, z, v, d) => `z = (λ<sub>obs</sub> − λ<sub>emit</sub>)/λ<sub>emit</sub> = (${l} − ${l0}) / ${l0} = <b>${z}</b>. v = z·c = ${z} · 300 000 = <b>${v} km/s</b>. d = v/H₀ = ${v} / 70 = <b>${d} Mpc</b>.`,
  hu_eq: h => `Si H₀ = ${h} (km/s)/Mpc, ¿qué edad aproximada (en miles de millones de años) da 1/H₀? (1 Mpc = 3,09·10<sup>19</sup> km; 1 año = 3,16·10<sup>7</sup> s)`,
  hu_es: (h, s, y) => `Los km se simplifican: 1/H₀ = 3,09·10<sup>19</sup> km / ${h} km/s ≈ ${s} s. Entre los segundos de un año: ${s} / 3,16·10<sup>7</sup> ≈ <b>${y}</b> miles de millones de años.`,
  ce_q: [(q, r) => `¿Qué campo eléctrico (kN/C) crea una carga de ${q} μC a ${r} m? (K = 9·10⁹)`,
    (q1, q2, r) => `¿Con qué fuerza (N) se repelen dos cargas de ${q1} μC y ${q2} μC separadas ${r} m? (K = 9·10⁹)`,
    (q, d) => `Una carga de +${q} μC y otra de −${q} μC están separadas ${d} m. ¿Cuánto vale el campo (kN/C) en el punto medio?`,
    (q1, q2, d) => `Dos cargas de +${q1} μC y +${q2} μC están separadas ${d} m. ¿A qué distancia (m) de la primera se anula el campo?`,
    (m, q, th) => `Una bolita de ${m} g con +${q} μC cuelga de un hilo en un campo eléctrico horizontal, y el hilo se desvía ${th}° de la vertical. ¿Cuánto vale el campo (N/C)? (g = 9,8 m/s²)`],
  ce_s: [(q, r, e) => `E = K|Q|/r² = ${K9} · ${q}·10<sup>−6</sup> / ${r}² = <b>${e} kN/C</b>`,
    (q1, q2, r, F) => `F = Kq₁q₂/r² = ${K9} · ${q1}·10<sup>−6</sup> · ${q2}·10<sup>−6</sup> / ${r}² ≈ <b>${F} N</b>`,
    (q, r, e1, e) => `Cada carga está a ${r} m: E₁ = E₂ = ${K9} · ${q}·10<sup>−6</sup> / ${r}² = ${e1} kN/C. Los dos campos apuntan hacia la carga negativa y se suman: <b>${e} kN/C</b>`,
    (q1, q2, s, d, s1, r) => `Las dos cargas son positivas: entre ellas sus campos tienen sentidos opuestos. A una distancia x de la primera: ${q1}/x² = ${q2}/(d − x)². Sacamos la raíz: (d − x)/x = √(${q2}/${q1}) = ${s}, así que x = d/(1 + ${s}) = ${d}/${s1} = <b>${r} m</b>, más cerca de la carga pequeña.`,
    (th, m, t, q, e) => `En equilibrio, T·cos ${th}° = mg y T·sen ${th}° = qE. Dividiendo: tg ${th}° = qE/mg ⇒ E = mg·tg ${th}°/q = ${m}·10<sup>−3</sup> · 9,8 · ${t} / ${q}·10<sup>−6</sup> ≈ <b>${e} N/C</b>`],
  po_q: [(q, r) => `¿Qué potencial (kV) crea una carga de ${q} μC a ${r} m? (K = 9·10⁹)`,
    (V) => `Un electrón parte del reposo y se acelera con ${V} V. ¿Qué velocidad alcanza (en 10⁶ m/s)? (e = 1,6·10<sup>−19</sup> C; m = 9,1·10<sup>−31</sup> kg)`,
    (V, d) => `Dos placas separadas ${d} cm tienen ${V} V de diferencia de potencial. ¿Cuánto vale el campo (V/m)?`,
    (Q, q, r1, r2) => `¿Qué trabajo (mJ) hace el campo de una carga de ${Q} μC al llevar una carga de ${q} μC desde ${r1} m hasta ${r2} m?`],
  po_s: [(q, r, v) => `V = KQ/r = ${K9} · ${q}·10<sup>−6</sup> / ${r} = <b>${v} kV</b>`,
    (V, r) => `½mv² = eΔV ⇒ v = √(2eΔV/m) = √(2 · ${QE} · ${V} / 9,1·10<sup>−31</sup>) ≈ <b>${r}·10⁶ m/s</b>`,
    (V, d, r, aprox) => `E = ΔV/d = ${V} V / ${d} m ${aprox ? "≈" : "="} <b>${r} V/m</b>`,
    (Q, r1, r2, va, vb, q, dv, r) => `V<sub>A</sub> = ${K9} · ${Q}·10<sup>−6</sup> / ${r1} = ${va} kV; V<sub>B</sub> = ${K9} · ${Q}·10<sup>−6</sup> / ${r2} = ${vb} kV. W = q(V<sub>A</sub> − V<sub>B</sub>) = ${q}·10<sup>−6</sup> C · ${dv}·10³ V = <b>${r} mJ</b> (positivo: la carga se aleja sola).`],
  ga_q: [(q) => `¿Qué flujo eléctrico (en 10⁵ N·m²/C) atraviesa una superficie cerrada que encierra ${q} μC? (ε₀ = 8,85·10<sup>−12</sup>)`,
    (R, q, r) => `Una esfera conductora de ${R} cm de radio tiene ${q} nC. ¿Cuánto vale el campo (N/C) a ${r} cm del centro?`,
    (l, r) => `Un hilo muy largo tiene una carga de ${l} nC por metro. ¿Qué campo (N/C) crea a ${r} cm de él? (ε₀ = 8,85·10<sup>−12</sup>)`],
  ga_s: [(q, F, r) => `Teorema de Gauss: Φ = Q/ε₀ = ${q}·10<sup>−6</sup> / 8,85·10<sup>−12</sup> ≈ ${F} N·m²/C = <b>${r}·10⁵ N·m²/C</b>, sea cual sea la forma de la superficie.`,
    (inside, q, r, e) => inside ? `Dentro de un conductor en equilibrio el campo es <b>0</b>: la carga está en la superficie.` : `Fuera, la esfera actúa como una carga puntual en su centro: E = KQ/r² = ${K9} · ${q}·10<sup>−9</sup> / ${r}² ≈ <b>${e} N/C</b>`,
    (l, r, e) => `Con un cilindro coaxial (Gauss): E = λ/(2πε₀r) = ${l}·10<sup>−9</sup> / (2π · 8,85·10<sup>−12</sup> · ${r}) ≈ <b>${e} N/C</b>, perpendicular al hilo.`],
  lo_q: [(p, v, B) => `Un ${p} entra a ${v}·10⁶ m/s perpendicular a un campo de ${B} T. ¿Qué radio (cm) describe?`,
    (E, B) => `En un selector de velocidades, E = ${E} N/C y B = ${B} T. ¿Qué velocidad (km/s) tienen las partículas que no se desvían?`,
    (v, B) => `¿Qué fuerza (en fN; 1 fN = 1 femtonewton = 10<sup>−15</sup> N) sufre un protón que se mueve a ${v}·10⁵ m/s perpendicular a un campo de ${B} T?`],
  lo_s: [(m, v, B, Rm, r) => `|q|vB = mv²/R ⇒ R = mv/(|q|B) = ${m} · ${v}·10<sup>6</sup> / (${QE} · ${B}) ≈ ${Rm} m = <b>${r} cm</b>`,
    (E, B, v, r) => `No se desvían si qE = qvB: v = E/B = ${E} / ${B} = ${v} m/s = <b>${r} km/s</b>`,
    (v, B, F, r) => `F = qvB·sen 90° = ${QE} · ${v}·10<sup>5</sup> · ${B} = ${F} N = <b>${r} fN</b> (1 fN = 10<sup>−15</sup> N)`],
  co_q: [(I, d) => `¿Qué campo magnético (μT) crea un hilo con ${I} A a ${d} cm? (μ₀ = 4π·10⁻⁷)`,
    (N, L, I) => `¿Qué campo (mT) hay dentro de un solenoide de ${L} cm con ${N} espiras y ${I} A?`,
    (I, R) => `¿Qué campo (μT) crea en su centro una espira de ${R} cm de radio con ${I} A?`,
    (I1, I2, d) => `Dos hilos paralelos separados ${d} cm llevan ${I1} A y ${I2} A. ¿Qué fuerza por metro (mN/m) se ejercen?`,
    (N, I, r) => `Un toroide de ${N} espiras lleva ${I} A. ¿Qué campo (mT) hay dentro, a ${r} cm de su centro? (μ₀ = 4π·10⁻⁷)`],
  co_s: [(I, d, r) => `B = μ₀I/(2πd) = ${MU0} · ${I} / (2π · ${d}) = <b>${r} μT</b> (d en metros)`,
    (N, I, L, r) => `B = μ₀NI/L = ${MU0} · ${N} · ${I} / ${L} = <b>${r} mT</b> (L en metros)`,
    (I, R, r) => `B = μ₀I/(2R) = ${MU0} · ${I} / (2 · ${R}) = <b>${r} μT</b> (R en metros)`,
    (I1, I2, d, r) => `F/L = μ₀I₁I₂/(2πd) = ${MU0} · ${I1} · ${I2} / (2π · ${d}) = <b>${r} mN/m</b>`,
    (N, I, r, b) => `Ley de Ampère con una circunferencia de radio r dentro del toroide: B·2πr = μ₀NI ⇒ B = μ₀NI/(2πr) = ${MU0} · ${N} · ${I} / (2π · ${r}) = <b>${b} mT</b>`],
  fa_q: [(N, S, B, t) => `Una bobina de ${N} espiras y ${S} cm² está en un campo perpendicular que pasa de ${B} T a 0 en ${t} s. ¿Qué fem (V) se induce?`,
    (B, L, v) => `Una varilla de ${L} m se mueve a ${v} m/s perpendicular a un campo de ${B} T. ¿Qué fem (V) se induce?`,
    (B, L, v, R) => `Una varilla de ${L} m se mueve a ${v} m/s sobre raíles en un campo de ${B} T; el circuito tiene ${R} Ω. ¿Qué intensidad (A) circula?`],
  fa_s: [(B, S, dphi, N, t, r) => `Flujo inicial por espira: Φ = BS = ${B} · ${S} = ${dphi} Wb (S en m²); al final, 0. |ε| = N·|ΔΦ|/Δt = ${N} · ${dphi} / ${t} = <b>${r} V</b>`,
    (B, L, v, r) => `|ε| = BLv = ${B} · ${L} · ${v} = <b>${r} V</b>`,
    (B, L, v, e, R, r) => `ε = BLv = ${B} · ${L} · ${v} = ${e} V; I = ε/R = ${e} / ${R} = <b>${r} A</b>`],
  tr_q: [(N1, N2, V1) => `Un transformador tiene ${N1} espiras en el primario y ${N2} en el secundario. Si entran ${V1} V, ¿qué tensión (V) sale?`,
    (V1, V2, N1) => `Un transformador baja de ${V1} V a ${V2} V y su primario tiene ${N1} espiras. ¿Cuántas tiene el secundario?`,
    (V1, V2, I2) => `Un transformador ideal pasa de ${V1} V a ${V2} V y el secundario da ${I2} A. ¿Qué intensidad (A) consume el primario?`,
    (N, S, B, f) => `Una bobina de ${N} espiras y ${S} m² gira a ${f} Hz en un campo de ${B} T. ¿Cuál es la fem máxima (V)?`],
  tr_s: [(V1, N2, N1, r) => `V₂/V₁ = N₂/N₁ ⇒ V₂ = V₁·N₂/N₁ = ${V1} · ${N2} / ${N1} = <b>${r} V</b>`,
    (N1, V2, V1, r) => `N₂ = N₁·V₂/V₁ = ${N1} · ${V2} / ${V1} = <b>${r}</b> espiras`,
    (V2, I2, V1, r) => `La potencia se conserva: V₁I₁ = V₂I₂ ⇒ I₁ = V₂I₂/V₁ = ${V2} · ${I2} / ${V1} ≈ <b>${r} A</b>`,
    (N, B, S, r) => `ω = 2πf = 2π · 50 ≈ 314,2 rad/s; ε₀ = NBSω = ${N} · ${B} · ${S} · 314,2 ≈ <b>${r} V</b>`],
  ma_q: [(A, w) => `Un oscilador sigue x = ${A}·sen(${w}t) (SI). ¿Cuál es su velocidad máxima (m/s)?`,
    (A, w) => `Un oscilador sigue x = ${A}·sen(${w}t) (SI). ¿Cuál es su aceleración máxima (m/s²)?`,
    (m, k) => `¿Cuál es el periodo (s) de una masa de ${m} kg colgada de un muelle de ${k} N/m?`,
    (L) => `¿Cuál es el periodo (s) de un péndulo simple de ${L} m? (g = 9,8)`,
    (k, A, x) => `Un oscilador de k = ${k} N/m y amplitud ${A} m. ¿Qué energía cinética (J) tiene en x = ${x} m?`],
  ma_s: [(w, A, r) => `ω = ${w} rad/s; v<sub>máx</sub> = Aω = ${A} · ${w} ≈ <b>${r} m/s</b>`,
    (w, A, r) => `ω = ${w} rad/s; a<sub>máx</sub> = Aω² = ${A} · (${w})² ≈ <b>${r} m/s²</b>`,
    (m, k, r) => `T = 2π√(m/k) = 2π√(${m} / ${k}) ≈ <b>${r} s</b>`,
    (L, r) => `T = 2π√(L/g) = 2π√(${L} / 9,8) ≈ <b>${r} s</b>`,
    (k, A, e, x, ep, r) => `E = ½kA² = ½ · ${k} · ${A}² = ${e} J; E<sub>p</sub> = ½kx² = ½ · ${k} · ${x}² = ${ep} J; E<sub>c</sub> = E − E<sub>p</sub> = <b>${r} J</b>`],
  on_q: (eq, what) => `Una onda sigue ${eq} (SI). ¿Cuánto vale ${what}?`,
  on_w: ["su longitud de onda (m)", "su frecuencia (Hz)", "su velocidad de propagación (m/s)", "la velocidad máxima de vibración de un punto (m/s)"],
  on_s: [(o) => `Comparando con y = A·sen(ωt ∓ kx): k = ${o.k} rad/m ⇒ λ = 2π/k = <b>${o.l} m</b>`,
    (o) => `Comparando con y = A·sen(ωt ∓ kx): ω = ${o.w} rad/s ⇒ f = ω/2π = <b>${o.f} Hz</b>`,
    (o) => `ω = ${o.w} rad/s ⇒ f = ω/2π = ${o.f} Hz; k = ${o.k} rad/m ⇒ λ = 2π/k = ${o.l} m. v = λf = ${o.l} · ${o.f} = <b>${o.v} m/s</b> (es lo mismo que ω/k).`,
    (o) => `Cada punto vibra con v<sub>y</sub> = Aω·cos(ωt ∓ kx), que es máxima cuando el coseno vale 1: v<sub>y,máx</sub> = Aω = ${o.A} · ${o.w} ≈ <b>${o.r} m/s</b>. No es la velocidad de propagación de la onda (v = λf = ${o.v} m/s).`],
  fe_q: [(x1, x2, l) => `Dos focos coherentes emiten en fase con λ = ${l} m. En un punto a ${x1} m de uno y ${x2} m del otro, ¿qué interferencia hay?`,
    (L, v, n) => `Una cuerda de ${L} m, fija por los extremos, transmite ondas a ${v} m/s. ¿Cuál es la frecuencia (Hz) del armónico ${n}?`,
    (l) => `¿Qué distancia (m) hay entre dos nodos consecutivos de una onda estacionaria de λ = ${l} m?`],
  fe_o: ["Constructiva", "Destructiva"],
  fe_s: [(d, l, k, n) => `Diferencia de caminos: Δx = ${d} m = ${n}·λ (λ = ${l} m). ${k === 0 ? "Es un número entero de longitudes de onda: llegan en fase, interferencia <b>constructiva</b>." : "Es un número impar de medias longitudes de onda, (2n + 1)·λ/2: llegan en oposición, interferencia <b>destructiva</b>."}`,
    (n, v, L, r) => `f<sub>n</sub> = n·v/2L = ${n} · ${v} / (2 · ${L}) = <b>${r} Hz</b>`,
    (l, r) => `Entre dos nodos hay media longitud de onda: λ/2 = ${l}/2 = <b>${r} m</b>`],
  so_q: [(e) => `¿Qué nivel (dB) tiene un sonido de 10<sup>−${e}</sup> W/m²? (I₀ = 10<sup>−12</sup> W/m²)`,
    (b, r1, r2) => `Un altavoz da ${b} dB a ${r1} m. ¿Cuántos dB se miden a ${r2} m?`,
    (f, v) => `Una ambulancia emite ${f} Hz y se acerca a ${v} m/s a un peatón quieto. ¿Qué frecuencia (Hz) oye? (v<sub>sonido</sub> = 340 m/s)`,
    (f, v) => `Una ambulancia emite ${f} Hz y se aleja a ${v} m/s de un peatón quieto. ¿Qué frecuencia (Hz) oye? (v<sub>sonido</sub> = 340 m/s)`,
    (f, v, a) => `Un coche que va a ${v} m/s ${a ? "se acerca a" : "se aleja de"} una sirena fija de ${f} Hz. ¿Qué frecuencia (Hz) oye el conductor? (v<sub>sonido</sub> = 340 m/s)`],
  so_s: [(e, n, r) => `β = 10·log(I/I₀) = 10·log(10<sup>−${e}</sup> / 10<sup>−12</sup>) = 10·log 10<sup>${n}</sup> = <b>${r} dB</b>`,
    (s, m, b, baja, r, aprox) => `La distancia se multiplica por ${s}; como I ∝ 1/r², la intensidad se divide entre ${s}² = ${m}. β baja 10·log ${m} ${aprox ? "≈" : "="} ${baja} dB: ${b} − ${baja} = <b>${r} dB</b>`,
    (f, v, r) => `f' = f·(v + v<sub>o</sub>)/(v − v<sub>f</sub>), con v<sub>o</sub> = 0 y v<sub>f</sub> = +${v} m/s (se acerca): f' = ${f} · 340 / (340 − ${v}) ≈ <b>${r} Hz</b>`,
    (f, v, r) => `f' = f·(v + v<sub>o</sub>)/(v − v<sub>f</sub>), con v<sub>o</sub> = 0 y v<sub>f</sub> = −${v} m/s (se aleja): f' = ${f} · 340 / (340 − (−${v})) = ${f} · 340 / ${340 + v} ≈ <b>${r} Hz</b>`,
    (f, v, a, r) => `f' = f·(v + v<sub>o</sub>)/(v − v<sub>f</sub>), con v<sub>f</sub> = 0 y v<sub>o</sub> = ${a ? "+" : "−"}${v} m/s (${a ? "se acerca" : "se aleja"}): f' = ${f} · (340 ${a ? "+" : "−"} ${v}) / 340 ≈ <b>${r} Hz</b>`],
  sn_q: [(i, n) => `Un rayo pasa del aire a un medio de n = ${n} con un ángulo de incidencia de ${i}°. ¿Cuál es el ángulo de refracción (°)?`,
    (n) => `¿Cuál es el ángulo límite (°) entre un medio de n = ${n} y el aire?`,
    (n) => `¿A qué velocidad (en 10⁸ m/s) viaja la luz en un medio de n = ${n}?`],
  sn_s: [(i, n, s, r) => `n₁·sen i = n₂·sen r ⇒ sen r = 1 · sen ${i}° / ${n} = ${s} ⇒ r = <b>${r}°</b> (calculadora en grados)`,
    (n, s, r) => `sen L = n₂/n₁ = 1/${n} = ${s} ⇒ L = <b>${r}°</b>`,
    (n, r) => `v = c/n = 3·10<sup>8</sup> / ${n} = <b>${r}·10⁸ m/s</b>`],
  es_q: [(tipo, f, s, d) => `Un objeto está ${d} cm delante de un espejo ${tipo} de distancia focal f = ${f} cm (criterio DIN: s = ${s} cm). ¿Dónde se forma la imagen? Escribe s' (cm) con su signo.`,
    (tipo, f, s, d) => `Un objeto está ${d} cm delante de un espejo ${tipo} de distancia focal f = ${f} cm (criterio DIN: s = ${s} cm). ¿Cuál es el aumento lateral? (con signo)`],
  es_s: [(f, s, r, real) => `1/s' = 1/f − 1/s = 1/(${f}) − 1/(${s}) ⇒ s' = <b>${r} cm</b>. ${real ? "s' < 0: la imagen está delante del espejo, es real." : "s' > 0: la imagen está detrás del espejo, es virtual."}`,
    (f, s, sp, r, real, inv, mayor) => `1/s' = 1/(${f}) − 1/(${s}) ⇒ s' = ${sp} cm; A = −s'/s = −(${sp})/(${s}) = <b>${r}</b>: imagen ${real ? "real" : "virtual"}, ${inv ? "invertida" : "derecha"} ${mayor > 0 ? "y mayor que" : mayor < 0 ? "y menor que" : "y del mismo tamaño que"} el objeto.`],
  le_q: [(f, s, d) => `Un objeto está ${d} cm delante de una lente de f' = ${f} cm (criterio DIN: s = ${s} cm). ¿Dónde se forma la imagen? Escribe s' (cm) con su signo.`,
    (f, s, d) => `Un objeto está ${d} cm delante de una lente de f' = ${f} cm (criterio DIN: s = ${s} cm). ¿Cuál es el aumento lateral? (con signo)`,
    (f) => `¿Qué potencia (dioptrías) tiene una lente de distancia focal ${f} cm? (con signo)`],
  le_s: [(f, s, r, real) => `1/s' = 1/f' + 1/s = 1/(${f}) + 1/(${s}) ⇒ s' = <b>${r} cm</b>. ${real ? "s' > 0: la imagen se forma al otro lado de la lente, es real." : "s' < 0: la imagen está del mismo lado que el objeto, es virtual."}`,
    (f, s, sp, r, real, inv, mayor) => `1/s' = 1/(${f}) + 1/(${s}) ⇒ s' = ${sp} cm; A = s'/s = ${sp}/(${s}) = <b>${r}</b>: imagen ${real ? "real" : "virtual"}, ${inv ? "invertida" : "derecha"} ${mayor > 0 ? "y mayor que" : mayor < 0 ? "y menor que" : "y del mismo tamaño que"} el objeto.`, (f, fm, r) => `f' = ${f} cm = ${fm} m; P = 1/f' = 1/${fm} = <b>${r} D</b>`],
  re_q: [(b) => `¿Cuánto vale el factor de Lorentz γ para una velocidad de ${b}c?`,
    (b, t) => `Un reloj viaja a ${b}c. Si en la nave pasan ${t} s, ¿cuántos segundos pasan para un observador en tierra?`,
    (b, L) => `Una nave de ${L} m pasa a ${b}c. ¿Qué longitud (m) mide un observador en tierra?`,
    (m) => `¿Qué energía en reposo (en 10¹³ J) tiene una masa de ${m} g? (c = 3·10⁸ m/s)`],
  re_s: [(b, b2, r) => `γ = 1/√(1 − v²/c²) = 1/√(1 − ${b}²) = 1/√(1 − ${b2}) ≈ <b>${r}</b>`,
    (g, t, r) => `Los ${t} s de la nave son tiempo propio (el reloj está quieto en ella). γ = ${g}; Δt = γΔt₀ = ${g} · ${t} ≈ <b>${r} s</b>`,
    (g, L, r) => `${L} m es la longitud propia (la de la nave en reposo). γ = ${g}; L = L₀/γ = ${L} / ${g} ≈ <b>${r} m</b>`,
    (m, r) => `E₀ = mc² = ${m} kg · (3·10<sup>8</sup>)² = <b>${r}·10¹³ J</b>`],
  cu_q: [(l) => `¿Qué energía (eV) tiene un fotón de ${l} nm? (hc = 1240 eV·nm)`,
    (l, W) => `Luz de ${l} nm ilumina un metal de trabajo de extracción ${W} eV. ¿Cuál es la energía cinética máxima (eV) de los electrones? (hc = 1240 eV·nm)`,
    (W) => `¿Cuál es la longitud de onda umbral (nm) de un metal con W₀ = ${W} eV? (hc = 1240 eV·nm)`,
    (l, W) => `Luz de ${l} nm ilumina un metal de trabajo de extracción ${W} eV. ¿Qué potencial de frenado (V) detiene a todos los electrones? (hc = 1240 eV·nm)`,
    (P, l) => `Un puntero láser de ${l} nm tiene una potencia de ${P} mW. ¿Cuántos fotones emite por segundo (en 10<sup>15</sup> fotones/s)? (h = 6,63·10<sup>−34</sup> J·s; c = 3·10<sup>8</sup> m/s)`],
  cu_s: [(l, r) => `E = hc/λ = 1240 / ${l} ≈ <b>${r} eV</b>`, (l, e, W, r) => `E<sub>fotón</sub> = 1240 / ${l} = ${e} eV; E<sub>c,máx</sub> = E − W₀ = ${e} − ${W} = <b>${r} eV</b>`, (W, r) => `En el umbral, hc/λ₀ = W₀: λ₀ = 1240 / ${W} ≈ <b>${r} nm</b>`,
    (e, W, r) => `E<sub>fotón</sub> = 1240/λ = ${e} eV; E<sub>c,máx</sub> = E − W₀ = ${e} − ${W} = ${r} eV. Como eV<sub>f</sub> = E<sub>c,máx</sub>, en voltios sale el mismo número: V<sub>f</sub> = <b>${r} V</b>`,
    (l, e, P, r) => `E<sub>fotón</sub> = hc/λ = 6,63·10<sup>−34</sup> · 3·10<sup>8</sup> / ${l}·10<sup>−7</sup> ≈ ${e}·10<sup>−19</sup> J. N = P/E = ${P}·10<sup>−3</sup> / ${e}·10<sup>−19</sup> ≈ <b>${r}·10<sup>15</sup> fotones/s</b>`],
  en_q: [(dm) => `Un núcleo tiene un defecto de masa de ${dm} u. ¿Cuál es su energía de enlace (MeV)? (1 u ≡ 931,5 MeV)`,
    (dm, A) => `Un núcleo de A = ${A} tiene un defecto de masa de ${dm} u. ¿Cuál es su energía de enlace por nucleón (MeV)? (1 u ≡ 931,5 MeV)`],
  en_s: [(dm, r) => `E<sub>e</sub> = Δm · 931,5 = ${dm} · 931,5 ≈ <b>${r} MeV</b>`, (dm, e, A, r) => `E<sub>e</sub> = ${dm} · 931,5 = ${e} MeV; E<sub>e</sub>/A = ${e} / ${A} ≈ <b>${r} MeV/nucleón</b>`],
  de_q: [(n) => `¿Qué porcentaje de una muestra radiactiva queda al cabo de ${n} periodos de semidesintegración?`,
    (T, p) => `Un isótopo tiene T½ = ${T} años. ¿Cuántos años tardará en quedar el ${p} % de la muestra?`,
    (A, T, t) => `Una muestra tiene ${A} Bq. Si T½ = ${T} días, ¿qué actividad (Bq) tendrá a los ${t} días?`,
    (iso, tipo) => `${iso} emite una partícula ${tipo}. Escribe el número másico A y el atómico Z del núcleo resultante.`],
  de_f: ["A", "Z"],
  de_tipo: ["alfa", "beta menos", "beta más (un positrón)"],
  de_s: [(n, p, r) => `Cada periodo queda la mitad: (1/2)<sup>${n}</sup> = 1/${p} ⇒ <b>${r} %</b>`,
    (T, p, ln, r) => `N/N₀ = e<sup>−λt</sup> con λ = ln 2/T½. Tomando logaritmos: t = T½·ln(N₀/N)/ln 2 = ${T} · ln(100/${p}) / 0,693 = ${T} · ${ln} / 0,693 ≈ <b>${r} años</b>`,
    (t, T, n, A, p, r) => `${t} días son ${t}/${T} = ${n} periodo${n > 1 ? "s" : ""}: A = A₀/2<sup>${n}</sup> = ${A} / ${p} = <b>${r} Bq</b>`,
    (m, A, Z, A2, Z2, hijo) => [`Emisión α: el núcleo pierde 2 protones y 2 neutrones. A = ${A} − 4 = <b>${A2}</b>; Z = ${Z} − 2 = <b>${Z2}</b>`,
      `Emisión β⁻: un neutrón pasa a protón. A no cambia, <b>${A2}</b>; Z = ${Z} + 1 = <b>${Z2}</b>`,
      `Emisión β⁺: un protón pasa a neutrón. A no cambia, <b>${A2}</b>; Z = ${Z} − 1 = <b>${Z2}</b>`][m] + `. Es el ${hijo}-${A2}.`],
  particulas: {
    q: x => `${cap(x)}: ¿qué tipo de partícula es?`,
    cats: ["Quark", "Leptón", "Bosón", "Hadrón (partícula compuesta)"],
    why: ["Partícula elemental con carga fraccionaria; los quarks se agrupan formando hadrones.", "Partícula elemental sin interacción fuerte.", "Partícula mediadora de una interacción.", "Formada por quarks."],
    items: [["el quark up", 0, "Partícula elemental de carga +2/3; dos up y un down forman el protón (uud)."],
      ["el quark down", 0, "Partícula elemental de carga −1/3; un up y dos down forman el neutrón (udd)."],
      ["el quark top", 0, "Partícula elemental de carga +2/3, la más pesada conocida. No forma parte de protones ni neutrones (que son uud y udd): se desintegra casi al instante."],
      ["el quark strange", 0, "Partícula elemental de carga −1/3. No forma parte de protones ni neutrones (que son uud y udd), pero sí de otros hadrones."],
      ["el electrón", 1], ["el neutrino electrónico", 1], ["el muon", 1], ["el positrón", 1],
      ["el fotón", 2], ["el gluon", 2], ["el bosón W", 2], ["el bosón de Higgs", 2, "Es un bosón, pero no transmite ninguna interacción: es la partícula del campo de Higgs, que da masa a las demás."],
      ["el protón", 3], ["el neutrón", 3], ["el pion", 3]],
    find: null,
  },
});

// fis12.particulas: carga de un hadrón y umbral de creación de pares
S.PA = {
  carga: { "u": 2 / 3, "d": -1 / 3, "s": -1 / 3, "c": 2 / 3, "ū": -2 / 3, "d̄": 1 / 3, "s̄": 1 / 3, "c̄": -2 / 3 },
  cargaTxt: { "u": "+2/3", "d": "−1/3", "s": "−1/3", "c": "+2/3", "ū": "−2/3", "d̄": "+1/3", "s̄": "+1/3", "c̄": "−2/3" },
  // [quarks, nombre]
  hadrones: [["u u d", "el protón"], ["u d d", "el neutrón"], ["u u u", "la partícula Δ⁺⁺"], ["d d d", "la partícula Δ⁻"], ["u d s", "la lambda, Λ⁰"], ["u u s", "la sigma, Σ⁺"],
    ["d d s", "la sigma, Σ⁻"], ["u s s", "la xi, Ξ⁰"], ["d s s", "la xi, Ξ⁻"], ["s s s", "la omega, Ω⁻"], ["u d̄", "el pion π⁺"], ["d ū", "el pion π⁻"], ["u s̄", "el kaón K⁺"],
    ["s ū", "el kaón K⁻"], ["d s̄", "el kaón K⁰"], ["c c̄", "la J/ψ"], ["u d c", "la lambda encantada, Λc⁺"], ["c s̄", "el mesón Ds⁺"]],
  carga_q: qs => `¿Qué carga (en unidades de e, con signo) tiene un hadrón formado por los quarks ${qs}? (Una barra encima indica un antiquark, de carga opuesta.)`,
  carga_s: (sum, r, name) => `Se suman las cargas de los quarks: ${sum} = <b>${r}</b>. Es ${name}.`,
  pares: [["un par electrón-positrón", 0.511], ["un par muon-antimuon", 105.7], ["un par protón-antiprotón", 938.3], ["un par tau-antitau", 1777]],
  par_q: p => `¿Qué energía mínima (MeV) debe tener un fotón para crear ${p}? (cerca de un núcleo, que se lleva el momento)`,
  par_s: (p, m, r) => `Hay que crear dos partículas de masa m, cada una con mc² = ${m} MeV: E<sub>mín</sub> = 2mc² = 2 · ${m} = <b>${r} MeV</b>. Lo que sobre se convierte en energía cinética.`,
};

// fis12.dosmasas (campo de dos masas en un punto fuera de la recta que las une)
S.DM = {
  q: (m1, m2, a, px, py) => `Una masa de ${m1} kg está en A(0, 0) m y otra de ${m2} kg en B(${a}, 0) m. Calcula las componentes del campo gravitatorio en P(${px}, ${py}) m, en 10<sup>−9</sup> N/kg. (G = 6,67·10<sup>−11</sup>)`,
  fx: "g_x (10⁻⁹ N/kg)", fy: "g_y (10⁻⁹ N/kg)",
  paso: (i, m, r, g, dx, dy, ux, uy) => `Masa ${i}: r<sub>${i}</sub> = ${r} m; g<sub>${i}</sub> = Gm/r² = ${G11} · ${m} / ${r}² = ${g}·10<sup>−9</sup> N/kg, de P hacia la masa: vector (${dx}, ${dy}), unitario (${ux}; ${uy}).`,
  suma: (gx, gy, ex, ey) => `Sumando componentes (módulo por unitario): g<sub>x</sub> ${ex} <b>${gx}</b> y g<sub>y</sub> ${ey} <b>${gy}</b> (en 10<sup>−9</sup> N/kg).`,
};

// fis12.trabajog (potencial de dos masas y trabajo del campo)
S.TG = {
  q: (m1, m2, a, P, Q, m) => `Una masa de ${m1} kg está en A(0, 0) m y otra de ${m2} kg en B(${a}, 0) m. Calcula el potencial gravitatorio en P(${P[0]}, ${P[1]}) m y en Q(${Q[0]}, ${Q[1]}) m (en 10<sup>−8</sup> J/kg, con signo) y el trabajo (en 10<sup>−8</sup> J) que hace el campo al llevar una masa de ${m} kg de P a Q. (G = 6,67·10<sup>−11</sup>)`,
  fp: "V_P (10⁻⁸ J/kg)", fq: "V_Q (10⁻⁸ J/kg)", fw: "W (10⁻⁸ J)",
  s: (m1, m2, p1, p2, q1, q2, vp, vq, m, w, e) => `El potencial es un escalar: se suman los de las dos masas, V = −Gm₁/r₁ − Gm₂/r₂. En P (r₁ = ${p1} m, r₂ = ${p2} m): V<sub>P</sub> = −${G11} · (${m1}/${p1} + ${m2}/${p2}) ${e[0]} <b>${vp}</b>·10<sup>−8</sup> J/kg. En Q (r₁ = ${q1} m, r₂ = ${q2} m): V<sub>Q</sub> ${e[1]} <b>${vq}</b>·10<sup>−8</sup> J/kg. Trabajo del campo: W = −m(V<sub>Q</sub> − V<sub>P</sub>) = ${m} · (${vp} − (${vq})) ${e[2]} <b>${w}</b>·10<sup>−8</sup> J (si es positivo, la masa va sola hacia potenciales menores).`,
};

// fis12.orbita (problema encadenado de órbitas)
S.OR = {
  q0: (m, h) => `Un satélite de ${m} kg gira en órbita circular a ${h} km de altura. Calcula su velocidad (km/s), su periodo (min) y su energía mecánica (en 10<sup>9</sup> J). (GM = 3,98·10<sup>14</sup> m³/s²; R = 6370 km)`,
  fv: "v (km/s)", ft: "T (min)", fe: "Eₘ (10⁹ J)",
  s0: (h, r, v, av, t, at, m, e, ae) => `r = R + h = 6370 + ${h} km = ${r} m. v = √(GM/r) ≈ ${v} m/s = <b>${av} km/s</b>. T = 2πr/v ≈ ${t} s = <b>${at} min</b>. E<sub>m</sub> = −GMm/2r = −3,98·10<sup>14</sup> · ${m} / (2 · ${r}) ≈ ${e} J = <b>${ae}·10⁹ J</b> (negativa: está ligado).`,
  q1: (m, h1, h2) => `Un satélite de ${m} kg pasa de una órbita circular a ${h1} km de altura a otra a ${h2} km. Calcula su energía mecánica en cada órbita y la energía que hay que aportarle (en 10<sup>9</sup> J). (GM = 3,98·10<sup>14</sup> m³/s²; R = 6370 km)`,
  fe1: "Eₘ inicial (10⁹ J)", fe2: "Eₘ final (10⁹ J)", fde: "ΔE (10⁹ J)",
  s1: (m, r1, r2, e1, e2, d) => `Radios (al centro, en m): r₁ = ${r1}, r₂ = ${r2}. E<sub>m</sub> = −GMm/2r: E₁ ≈ <b>${e1}·10⁹ J</b>, E₂ ≈ <b>${e2}·10⁹ J</b>. Energía aportada: ΔE = E₂ − E₁ = ${e2} − (${e1}) ≈ <b>${d}·10⁹ J</b>. Es positiva: subir de órbita cuesta energía, aunque el satélite acabe yendo más despacio.`,
  q2: (m, h) => `Se lanza desde el suelo un satélite de ${m} kg hasta una órbita circular a ${h} km de altura. ¿Qué energía mínima (en 10<sup>9</sup> J) hay que darle (sin contar el giro de la Tierra)? Una vez en órbita, ¿con qué velocidad (km/s) tendría que salir para escapar? (GM = 3,98·10<sup>14</sup> m³/s²; R = 6370 km)`,
  fsu: "ΔE (10⁹ J)", fve: "vₑ (km/s)",
  s2: (m, r, d, vo, ve) => `En el suelo solo hay energía potencial, −GMm/R; en la órbita (r = ${r} m), la mecánica, −GMm/2r. ΔE = GMm(1/R − 1/2r) = 3,98·10<sup>14</sup> · ${m} · (1/6,37·10<sup>6</sup> − 1/(2 · ${r})) ≈ <b>${d}·10⁹ J</b>. En la órbita v<sub>o</sub> = √(GM/r) ≈ ${vo} km/s, y para escapar hay que llevar E<sub>m</sub> a cero: v<sub>e</sub> = √2·v<sub>o</sub> ≈ <b>${ve} km/s</b>.`,
};

// fis12.doscargas (campo de dos cargas en un punto fuera de la recta que las une)
S.DC = {
  q: (q1, q2, a, px, py) => `Una carga de ${q1} μC está en el origen y otra de ${q2} μC en (${a}; 0) m. Calcula las componentes del campo eléctrico en P(${px}; ${py}) m, en kN/C. (K = 9·10<sup>9</sup> N·m²/C²)`,
  fx: "E_x (kN/C)", fy: "E_y (kN/C)",
  paso: (i, q, r, e, posi, ux, uy, eq) => `Carga ${i} (${q} μC): r<sub>${i}</sub> = ${r} m; E<sub>${i}</sub> = K|q|/r² = ${K9} · ${q.replace(/^[+−]/, "")}·10<sup>−6</sup> / ${r}² ${eq} ${e} kN/C, ${posi ? "alejándose de la carga (es positiva)" : "hacia la carga (es negativa)"}: unitario (${ux}; ${uy}).`,
  suma: (ex, ey, sx, sy) => `Sumando componentes: E<sub>x</sub> ${sx} <b>${ex} kN/C</b> y E<sub>y</sub> ${sy} <b>${ey} kN/C</b>.`,
};

// fis12.energiae (energía potencial eléctrica: dos cargas, distancia mínima, tres cargas, velocidad)
S.EE = {
  q0: (q1, q2, a, h, q3) => `Una carga de ${q1} μC está en el origen y otra de ${q2} μC en (${a}; 0) m. Calcula el potencial (kV) en P(0; ${h}) m y el trabajo exterior (mJ) necesario para traer una carga de +${q3} μC desde el infinito hasta P. (K = 9·10<sup>9</sup>)`,
  fv: "V_P (kV)", fw: "W_ext (mJ)",
  s0: (q1, r1, v1, q2, r2, v2, v, q3, w, e) => `El potencial se suma con signo: V₁ = K·q₁/r₁ = ${K9} · (${q1}·10<sup>−6</sup>) / ${r1} = ${v1} kV; V₂ = K·q₂/r₂, con r₂ = ${r2} m: ${K9} · (${q2}·10<sup>−6</sup>) / ${r2} = ${v2} kV. V<sub>P</sub> ${e[0]} <b>${v} kV</b>. En el infinito V = 0, así que W<sub>ext</sub> = q·V<sub>P</sub> = ${q3}·10<sup>−6</sup> C · ${v}·10³ V ${e[1]} <b>${w} mJ</b> (si sale negativo, la carga llega sola y el campo hace el trabajo).`,
  proy: [["Una partícula alfa", 2], ["Un protón", 1]],
  nucleos: [["oro", 79], ["plata", 47], ["cobre", 29], ["aluminio", 13], ["plomo", 82]],
  q1: (p, Ec, nuc, Z) => `${p} con ${Ec} MeV de energía cinética se lanza de frente contra un núcleo de ${nuc} (Z = ${Z}), que no se mueve. ¿A qué distancia mínima (en 10<sup>−14</sup> m) llega? (K = 9·10<sup>9</sup>; e = 1,6·10<sup>−19</sup> C; 1 MeV = 1,6·10<sup>−13</sup> J)`,
  s1: (zp, Z, Ec, r, e) => `Se conserva E<sub>c</sub> + E<sub>p</sub>. Lejos, E<sub>p</sub> = 0; en el punto más cercano se para: E<sub>c</sub> = K(${zp}e)(${Z}e)/d ⇒ d = ${K9} · ${zp * Z} · (1,6·10<sup>−19</sup>)² / (${Ec} · 1,6·10<sup>−13</sup>) ${e} <b>${r}·10<sup>−14</sup> m</b>`,
  q2: (q, L) => `Tres cargas de ${q[0]} μC, ${q[1]} μC y ${q[2]} μC están en los vértices de un triángulo equilátero de ${L} cm de lado. ¿Cuál es la energía potencial del sistema (J)? (K = 9·10<sup>9</sup>)`,
  s2: (q, sum, L, e, eq) => `Se suman las energías de las tres parejas: E<sub>p</sub> = K(q₁q₂ + q₁q₃ + q₂q₃)/L = ${K9} · [${q[0]}·${q[1]} + ${q[0]}·${q[2]} + ${q[1]}·${q[2]}]·10<sup>−12</sup> / ${L} = ${K9} · ${sum}·10<sup>−12</sup> / ${L} ${eq} <b>${e} J</b>`,
  q3: (ra, Q, rb) => `Un protón parte del reposo a ${ra} cm de una carga fija de +${Q} nC y se aleja. ¿Qué velocidad (en 10<sup>5</sup> m/s) tiene a ${rb} cm? (K = 9·10<sup>9</sup>; e = 1,6·10<sup>−19</sup> C; m<sub>p</sub> = 1,67·10<sup>−27</sup> kg)`,
  s3: (Q, ra, va, rb, vb, dv, r) => `V<sub>A</sub> = KQ/r<sub>A</sub> = ${K9} · ${Q}·10<sup>−9</sup> / ${ra}·10<sup>−2</sup> = ${va} V; V<sub>B</sub> = ${K9} · ${Q}·10<sup>−9</sup> / ${rb}·10<sup>−2</sup> = ${vb} V. El campo hace W = e(V<sub>A</sub> − V<sub>B</sub>) = e · ${dv} V, que se convierte en energía cinética: v = √(2e·${dv} / m<sub>p</sub>) ≈ <b>${r}·10⁵ m/s</b>`,
};

// fis12.lorentz: sentido de la fuerza y del giro
S.LO = {
  dirs: ["Hacia la derecha (+x)", "Hacia la izquierda (−x)", "Hacia arriba (+y)", "Hacia abajo (−y)", "Saliendo del papel (⊙)", "Entrando en el papel (⊗)"],
  dirTxt: ["hacia la derecha", "hacia la izquierda", "hacia arriba", "hacia abajo", "saliendo del papel (⊙)", "entrando en el papel (⊗)"],
  vec: ["+i", "−i", "+j", "−j", "+k", "−k"],
  bTxt: ["dirigido hacia la derecha", "dirigido hacia la izquierda", "dirigido hacia arriba", "dirigido hacia abajo", "que sale del papel (⊙)", "que entra en el papel (⊗)"],
  dir_q: (pos, v, b) => `En un dibujo con x hacia la derecha e y hacia arriba, ${pos ? "un protón" : "un electrón"} se mueve ${v} en un campo magnético ${b}. ¿Hacia dónde apunta la fuerza magnética?`,
  dir_s: (v, b, c, pos, r) => `v = ${v}, B = ${b} (en unidades), así que v × B = (${v}) × (${b}) = ${c} (regla cíclica i → j → k).${pos ? "" : " La carga es negativa: se invierte el sentido."} Fuerza: <b>${r.toLowerCase()}</b>.`,
  giros: ["Horario", "Antihorario"],
  giro_q: (pos, sale) => `${pos ? "Un protón" : "Un electrón"} entra perpendicular a un campo magnético uniforme que ${sale ? "sale del papel (⊙)" : "entra en el papel (⊗)"}. Visto desde delante del papel, ¿en qué sentido gira?`,
  giro_s: (pos, sale, anti) => `Por ejemplo, si va hacia la derecha (v = +i) con B = ${sale ? "+k" : "−k"}: v × B = ${sale ? "−j" : "+j"}${pos ? "" : ", y al ser negativa la fuerza apunta al revés, " + (sale ? "+j" : "−j")}. El centro del giro queda ${(sale === pos) ? "debajo" : "encima"} de la partícula: gira en sentido <b>${anti ? "antihorario" : "horario"}</b>.`,
};

// fis12.doshilos (dos hilos: campo en un punto y fuerza sobre una carga que pasa)
S.DH = {
  q: (d, I1, I2, sale2, p1, p2, lugar, pos, v) => `Dos hilos largos y paralelos, perpendiculares al papel, están separados ${d} cm: el 1, a la izquierda, lleva ${I1} A saliendo del papel (⊙), y el 2, a la derecha, ${I2} A ${sale2 ? "saliendo del papel (⊙)" : "entrando en el papel (⊗)"}. El punto P está en la recta que los une, a ${p1} cm del hilo 1 y a ${p2} cm del 2 (${["entre los dos", "a la izquierda del hilo 1", "a la derecha del hilo 2"][lugar]}). Con x hacia la derecha e y hacia arriba: a) ¿cuánto vale B<sub>y</sub> en P (μT, con signo)? b) ${pos ? "Un protón" : "Un electrón"} pasa por P a ${v}·10<sup>5</sup> m/s paralelo a los hilos, saliendo del papel. ¿Qué fuerza F<sub>x</sub> sufre (en 10<sup>−18</sup> N, con signo)? (μ₀ = 4π·10<sup>−7</sup>)`,
  fb: "B_y (μT)", ff: "F_x (10⁻¹⁸ N)",
  paso: (i, I, r, b, der, sale, arriba, eq) => `Hilo ${i}: B = μ₀I/2πr = 2·10<sup>−7</sup> · ${I} / ${r} ${eq} ${b} μT. Su corriente ${sale ? "sale: los dedos giran en sentido antihorario" : "entra: los dedos giran en sentido horario"} y P está a su ${der ? "derecha" : "izquierda"}, así que su campo apunta hacia ${arriba ? "arriba (+)" : "abajo (−)"}.`,
  suma: (by, pos, v, fx, e) => `a) B<sub>y</sub> ${e[0]} <b>${by} μT</b>. b) v = v·k y B = B<sub>y</sub>·j: v × B = v·B<sub>y</sub>·(k × j) = −v·B<sub>y</sub>·i, así que F<sub>x</sub> = −q·v·B<sub>y</sub> = −(${pos ? "+" : "−"}1,6·10<sup>−19</sup>) · ${v}·10<sup>5</sup> · (${by}·10<sup>−6</sup>) ${e[1]} <b>${fx}·10<sup>−18</sup> N</b> : ${fx.startsWith("−") ? "hacia la izquierda" : "hacia la derecha"}.`,
};

// fis12.faraday: sentido, campo variable, campo sinusoidal y espira que gira
S.FA = {
  sentidos: ["Horario", "Antihorario", "No circula corriente"],
  // [causa, cambio del flujo: +1 aumenta, −1 disminuye, 0 no cambia]
  causas: [["el campo aumenta", 1], ["el campo disminuye", -1], ["se estira la espira y su área aumenta", 1], ["se aplasta la espira y su área disminuye", -1],
    ["la espira entra en la región donde está el campo", 1], ["la espira sale de la región donde está el campo", -1], ["el campo es constante y la espira está quieta", 0],
    ["la espira se desplaza sin girar dentro de un campo uniforme, sin salir de él", 0]],
  sen_q: (hacia, c) => `Una espira está en el plano del papel, en un campo magnético perpendicular que ${hacia ? "sale del papel (apunta hacia ti, ⊙)" : "entra en el papel (se aleja de ti, ⊗)"}, y ${c}. Visto desde delante del papel, ¿en qué sentido circula la corriente inducida?`,
  sen_s: (hacia, cambio, k) => cambio === 0 ? `El flujo no cambia, así que no se induce fem: <b>no circula corriente</b>.` :
    `El flujo ${hacia ? "hacia ti" : "que entra"} ${cambio > 0 ? "aumenta" : "disminuye"}. Por Lenz, el campo inducido ${cambio > 0 ? "se opone: apunta al revés" : "lo compensa: apunta igual"}, ${(cambio > 0) === hacia ? "entrando en el papel" : "hacia ti"}. Con el pulgar en ese sentido, los dedos giran en sentido <b>${k === 0 ? "horario" : "antihorario"}</b>.`,
  bt_q: (N, S, a, sg, b) => `Una bobina de ${N} espiras y ${S} cm² está perpendicular a un campo B(t) = ${a} ${sg} ${b}t (SI). ¿Qué fem (V, en valor absoluto) se induce?`,
  bt_s: (a, sg, b, S, N, sube, r) => `Φ = N·B·S, con S = ${S} m². dB/dt = ${sube ? "+" : "−"}${b} T/s (la derivada de ${a} ${sg} ${b}t). ε = −N·S·dB/dt = ${sube ? "−" : "+"}${N} · ${S} · ${b}: |ε| = <b>${r} V</b>, constante.`,
  sin_q: (N, S, B0, f) => `Una bobina fija de ${N} espiras y ${S} cm² está perpendicular a un campo que varía como B = ${B0}·sen(2π·${f}·t) T. ¿Cuál es la fem máxima (V)?`,
  sin_s: (f, w, N, S, B0, r) => `ω = 2π·${f} ≈ ${w} rad/s. ε = −N·S·dB/dt = −N·S·B₀·ω·cos(ωt) (regla de la cadena), con valor máximo ε<sub>máx</sub> = N·S·B₀·ω = ${N} · ${S} · ${B0} · ${w} ≈ <b>${r} V</b>`,
  giro_q: (N, S, B, t) => `Una bobina de ${N} espiras y ${S} cm² está perpendicular a un campo de ${B} T y en ${t} s gira hasta quedar paralela a él. ¿Qué fem media (V) se induce?`,
  giro_s: (B, S, phi, N, t, r) => `Al principio el flujo por espira es BS = ${B} · ${S} = ${phi} Wb (normal paralela al campo); al final, 0 (cos 90° = 0). |ε<sub>media</sub>| = N·|ΔΦ|/Δt = ${N} · ${phi} / ${t} = <b>${r} V</b>`,
};

// fis12.varilla (varilla sobre raíles)
S.VA = {
  q: (L, v, B, R) => `Una varilla de ${L} m se desliza a ${v} m/s sobre dos raíles unidos por una resistencia de ${R} Ω, en un campo de ${B} T perpendicular al circuito. Calcula la fem (V), la corriente (A), la fuerza magnética que frena la varilla (N) y la potencia (W) necesaria para mantener su velocidad.`,
  fe: "ε (V)", fi: "I (A)", ff: "F (N)", fp: "P (W)",
  s: (B, L, v, e, R, I, F, P) => `ε = BLv = ${B} · ${L} · ${v} = <b>${e} V</b>. I = ε/R = ${e} / ${R} = <b>${I} A</b>. F = ILB = ${I} · ${L} · ${B} = <b>${F} N</b>, opuesta a la velocidad (Lenz). P = F·v = <b>${P} W</b>, la misma que se disipa en la resistencia (ε·I): conservación de la energía.`,
};

// fis12.transformador: fem en un instante, valor eficaz y pérdidas en la línea
S.TR = {
  inst_q: (N, S, B, t) => `Una bobina de ${N} espiras y ${S} m² gira a 50 Hz en un campo de ${B} T, y en t = 0 su plano es perpendicular al campo. ¿Qué fem (V) hay en t = ${t} ms?`,
  inst_s: (e0, t, ph, s, r) => `ε = ε₀·sen ωt, con ε₀ = NBSω ≈ ${e0} V y ω = 100π rad/s. En t = ${t} ms: ωt = 100π · ${t}·10<sup>−3</sup> ≈ ${ph} rad (¡calculadora en radianes!), sen ωt ≈ ${s}; ε ≈ ${e0} · ${s} ≈ <b>${r} V</b>`,
  ef_q: (N, S, B) => `Una bobina de ${N} espiras y ${S} m² gira a 50 Hz en un campo de ${B} T. ¿Cuál es el valor eficaz (V) de la fem?`,
  ef_s: (N, B, S, e0, r) => `ε₀ = NBSω = ${N} · ${B} · ${S} · 100π ≈ ${e0} V; ε<sub>ef</sub> = ε₀/√2 = ${e0} / 1,414 ≈ <b>${r} V</b>`,
  lin_q: (P, V, R) => `Una línea de ${R} Ω transporta ${P} MW a ${V} kV. Calcula la intensidad (A) y la potencia que se pierde en los cables (kW).`,
  fi: "I (A)", fp: "P pérdidas (kW)",
  lin_s: (P, V, I, R, pp, pc) => `I = P/V = ${P}·10<sup>6</sup> / ${V}·10<sup>3</sup> = <b>${I} A</b>. P<sub>pérd</sub> = I²R = ${I}² · ${R} = <b>${pp} kW</b>, un ${pc} % de la potencia transportada. A más tensión, menos intensidad y muchas menos pérdidas.`,
};

// fis12.mas: amplitud y fase inicial a partir de x₀ y v₀
S.MA = {
  q: (m, k, x0, v0) => `Una masa de ${m} kg está unida a un muelle de ${k} N/m. En t = 0 está en x = ${x0} cm y su velocidad es ${v0} m/s. Escribe x = A·sen(ωt + φ₀): calcula A (cm) y φ₀ (rad, entre 0 y 2π).`,
  fa: "A (cm)", ff: "φ₀ (rad)",
  s: (m, k, w, x0, v0, A, sn, cs, xpos, vpos, f) => `ω = √(k/m) = √(${k}/${m}) = ${w} rad/s. Por la energía, A = √(x₀² + v₀²/ω²) = √((${x0})² + (${v0}/${w})²) m = <b>${A} cm</b>. En t = 0: sen φ₀ = x₀/A = ${sn} y cos φ₀ = v₀/(Aω) = ${cs}; seno ${xpos ? "positivo" : "negativo"} y coseno ${vpos ? "positivo" : "negativo"}: ${xpos ? (vpos ? "primer" : "segundo") : (vpos ? "cuarto" : "tercer")} cuadrante. φ₀ ≈ <b>${f} rad</b>.`,
};

// fis12.ondas: un punto en un instante, diferencia de fase y fase inicial
S.ON = {
  fy: "y (cm)", fv: "v_y (m/s)",
  pt_q: (eq, x, t) => `Una onda sigue ${eq} (SI). Calcula la elongación (cm) y la velocidad de vibración (m/s) del punto x = ${x} m en el instante t = ${t} s.`,
  pt_s: (w, t, sg, k, x, ph, A, y, v, e) => `Fase: ${w}·${t} ${sg} ${k}·${x} ${e[0]} ${ph} rad (calculadora en radianes). y = ${A}·sen(${ph}) m ${e[1]} <b>${y} cm</b>. v<sub>y</sub> = Aω·cos(fase) = ${A} · ${w} · cos(${ph}) ≈ <b>${v} m/s</b>.`,
  dx_q: (eq, dx) => `Una onda sigue ${eq} (SI). ¿Qué diferencia de fase (rad) hay entre dos puntos separados ${dx} m?`,
  dx_s: (k, dx, c, r) => `Δφ = k·Δx = ${k} · ${dx} = ${c}π ≈ <b>${r} rad</b>`,
  dt_q: (eq, dt) => `Una onda sigue ${eq} (SI). ¿Qué diferencia de fase (rad) hay en un mismo punto entre dos instantes separados ${dt} s?`,
  dt_s: (w, dt, c, r) => `Δφ = ω·Δt = ${w} · ${dt} = ${c}π ≈ <b>${r} rad</b>`,
  estados: ["está en y = 0 subiendo", "está en lo más alto (y = A)", "está en y = 0 bajando", "está en lo más bajo (y = −A)"],
  fases: ["0", "π/2", "π", "3π/2"],
  f0_q: (A, f, v, menos, e) => `Una onda de ${A} m de amplitud y ${f} Hz avanza a ${v} m/s hacia ${menos ? "+x" : "−x"}. En x = 0 y t = 0, el punto ${e}. Si se escribe y = A·sen(ωt ${menos ? "−" : "+"} kx + φ₀), ¿cuánto vale φ₀?`,
  f0_s: (w, k, sg, A, c) => `ω = ${w} rad/s y k = ${k} rad/m (signo ${sg} porque avanza hacia ${sg === "−" ? "+x" : "−x"}). En x = 0, t = 0: y = ${A}·sen φ₀ y v<sub>y</sub> = Aω·cos φ₀. ${["y = 0 ⇒ φ₀ = 0 o π; sube (v<sub>y</sub> > 0, cos φ₀ > 0) ⇒ φ₀ = <b>0</b>.", "y = A ⇒ sen φ₀ = 1 ⇒ φ₀ = <b>π/2</b>.", "y = 0 ⇒ φ₀ = 0 o π; baja (v<sub>y</sub> < 0, cos φ₀ < 0) ⇒ φ₀ = <b>π</b>.", "y = −A ⇒ sen φ₀ = −1 ⇒ φ₀ = <b>3π/2</b> (o −π/2)."][c]}`,
};

// fis12.fenomenos: tubos sonoros
S.FE = {
  tubo_q: (cerrado, L, sig) => `Un tubo de ${L} m, ${cerrado ? "cerrado por un extremo" : "abierto por los dos extremos"}, está lleno de aire (v = 340 m/s). ¿Cuál es ${sig ? "la frecuencia (Hz) del primer armónico posible por encima de la fundamental" : "su frecuencia fundamental (Hz)"}?`,
  tubo_s: (cerrado, n, L, r) => cerrado ? `Cerrado por un extremo: nodo en el cerrado y vientre en el abierto; solo armónicos impares, f = (2n − 1)·v/4L. ${n === 1 ? "Fundamental" : "El siguiente posible es el tercero"}: f = ${n} · 340 / (4 · ${L}) ≈ <b>${r} Hz</b>` :
    `Abierto por los dos extremos: vientres en los dos, como la cuerda: f<sub>n</sub> = n·v/2L. ${n === 1 ? "Fundamental" : "Segundo armónico"}: f = ${n} · 340 / (2 · ${L}) ≈ <b>${r} Hz</b>`,
};

// fis12.snell: dos medios, longitud de onda en el medio y lámina
S.SN = {
  dos_q: (m1, n1, m2, n2, i) => `Un rayo pasa del ${m1} (n = ${n1}) al ${m2} (n = ${n2}) con un ángulo de incidencia de ${i}°. ¿Con qué ángulo (°) se refracta?`,
  dos_s: (n1, i, n2, s, r, aleja) => `n₁·sen i = n₂·sen r ⇒ sen r = ${n1} · sen ${i}° / ${n2} ≈ ${s} ⇒ r ≈ <b>${r}°</b>: ${aleja ? "se aleja de la normal (pasa a un medio de menor índice)" : "se acerca a la normal (pasa a un medio de mayor índice)"}.`,
  lam_q: (l, n) => `Una luz de ${l} nm en el vacío entra en un medio de n = ${n}. ¿Qué longitud de onda (nm) tiene dentro?`,
  lam_s: (l, n, r) => `La frecuencia no cambia y la velocidad se divide entre n, así que λ = λ₀/n = ${l} / ${n} ≈ <b>${r} nm</b> (y el color sigue siendo el mismo).`,
  lam2_q: (e, i, n) => `Un rayo incide con ${i}° sobre una lámina de vidrio de caras paralelas de ${e} cm de grosor (n = ${n}). ¿Cuánto se desplaza lateralmente (cm) el rayo que sale?`,
  lam2_s: (i, n, r, e, dif, d) => `Dentro: sen r = sen ${i}°/${n} ⇒ r ≈ ${r}°. Sale paralelo al de entrada, desplazado d = e·sen(i − r)/cos r = ${e} · sen ${dif}° / cos ${r}° ≈ <b>${d} cm</b>`,
};

// fis12.doslentes (sistema de dos lentes)
S.DL = {
  q: (s, f1, D, f2) => `Un objeto está ${s} cm delante de una lente convergente de f'₁ = ${f1} cm. A ${D} cm detrás de ella hay otra lente de f'₂ = ${f2} cm. Calcula la posición de la imagen de la primera lente (s'₁, cm), la de la imagen final medida desde la segunda (s'₂, cm) y el aumento total (criterio DIN).`,
  f1: "s'₁ (cm)", f2: "s'₂ (cm)", fa: "A total",
  s: (f1, s1, sp1, A1, D, s2, f2, sp2, A2, A, e) => `Lente 1: 1/s'₁ = 1/${f1} + 1/(${s1}) ⇒ s'₁ ${e[0]} <b>${sp1} cm</b>; A₁ = s'₁/s₁ ${e[1]} ${A1}. Esa imagen hace de objeto para la lente 2, que está a ${D} cm: s₂ = s'₁ − ${D} ${e[2]} ${s2} cm (delante de ella). Lente 2: 1/s'₂ = 1/(${f2}) + 1/(${s2}) ⇒ s'₂ ${e[3]} <b>${sp2} cm</b>; A₂ ${e[4]} ${A2}. Aumento total: A = A₁·A₂ ${e[5]} <b>${A}</b>.`,
};

// fis12.relatividad: energía cinética relativista y velocidad para E = n·E₀
S.RE = {
  parts: [["un electrón", 0.511], ["un protón", 938.3]],
  ec_q: (p, b) => `¿Qué energía cinética (MeV) tiene ${p} que va a ${b}c? (Energías en reposo: electrón 0,511 MeV; protón 938,3 MeV)`,
  ec_s: (b, g, e0, r) => `γ = 1/√(1 − ${b}²) = ${g}; E<sub>c</sub> = (γ − 1)·mc² = (${g} − 1) · ${e0} ≈ <b>${r} MeV</b>`,
  v_q: n => `¿A qué fracción de la velocidad de la luz (v/c) debe ir una partícula para que su energía total sea ${n} veces su energía en reposo?`,
  v_s: (n, inv, r) => `E = γmc² = ${n}·mc² ⇒ γ = ${n} ⇒ 1 − v²/c² = 1/${n}² = ${inv} ⇒ v/c = √(1 − ${inv}) ≈ <b>${r}</b>`,
};

// fis12.frenado (h y W₀ a partir de dos medidas)
S.FR = {
  metales: [["el sodio", 2.3], ["el potasio", 2.3], ["el cesio", 2.1], ["el litio", 2.9], ["el calcio", 2.9], ["el cinc", 4.3], ["el cobre", 4.7]],
  q: (f1, V1, f2, V2) => `Al iluminar un metal con luz de ${f1}·10<sup>15</sup> Hz, el potencial de frenado es ${V1} V; con ${f2}·10<sup>15</sup> Hz, ${V2} V. Calcula h (en 10<sup>−34</sup> J·s), el trabajo de extracción (eV) y la frecuencia umbral (en 10<sup>15</sup> Hz). (e = 1,6·10<sup>−19</sup> C)`,
  fh: "h (10⁻³⁴ J·s)", fw: "W₀ (eV)", ff: "f₀ (10¹⁵ Hz)",
  s: (V2, V1, f2, f1, s, h, hf, W, f0, met, e) => `eV<sub>f</sub> = hf − W₀, así que V<sub>f</sub> = (h/e)·f − W₀/e: una recta de pendiente h/e. Pendiente = (${V2} − ${V1}) / ((${f2} − ${f1})·10<sup>15</sup>) ${e[0]} ${s}·10<sup>−15</sup> V·s, y h = e · pendiente = 1,6·10<sup>−19</sup> · ${s}·10<sup>−15</sup> ${e[1]} <b>${h}·10<sup>−34</sup> J·s</b>. Con la primera medida, en eV: hf = ${s}·10<sup>−15</sup> · ${f1}·10<sup>15</sup> ${e[2]} ${hf} eV y W₀ = hf − eV<sub>f</sub> = ${hf} − ${V1} ${e[3]} <b>${W} eV</b> (es ${met}). f₀ = W₀/h ${e[4]} <b>${f0}·10<sup>15</sup> Hz</b>.`,
};

// fis12.enlace: defecto de masa a partir de las masas (masas nucleares)
S.EN = {
  // [núcleo, Z, A, masa nuclear (u)]
  nucleos: [["helio-4", 2, 4, 4.00151], ["litio-7", 3, 7, 7.01436], ["carbono-12", 6, 12, 11.99671], ["nitrógeno-14", 7, 14, 13.99923], ["oxígeno-16", 8, 16, 15.99052], ["hierro-56", 26, 56, 55.92068], ["uranio-235", 92, 235, 234.99342]],
  q: (name, Z, A, m) => `La masa del núcleo de ${name} (Z = ${Z}, A = ${A}) es ${m} u. Con m<sub>p</sub> = 1,00728 u y m<sub>n</sub> = 1,00866 u, calcula su defecto de masa (u) y su energía de enlace por nucleón (MeV). (1 u ≡ 931,5 MeV)`,
  fm: "Δm (u)", fe: "Eₑ/A (MeV)",
  s: (Z, N, m, dm, e, A, ea) => `Δm = Z·m<sub>p</sub> + N·m<sub>n</sub> − m = ${Z} · 1,00728 + ${N} · 1,00866 − ${m} = <b>${dm} u</b>. E<sub>e</sub> = Δm · 931,5 = ${e} MeV; E<sub>e</sub>/A = ${e} / ${A} = <b>${ea} MeV/nucleón</b>.`,
};
/* ── Textos de los generadores añadidos: fuerza sobre corrientes, el ojo y los instrumentos,
   ondas electromagnéticas, dualidad e incertidumbre, reacciones nucleares ── */
const e10 = (m, e) => `${m}·10<sup>${e < 0 ? "−" + -e : e}</sup>`;

// fis12.laplace
S.LP = {
  f_q: (L, I, B, a) => `¿Qué fuerza (en N) actúa sobre ${L} cm de hilo por el que circulan ${I} A, ${a === 90 ? "perpendicular a" : `formando ${a}° con`} un campo magnético de ${B} T?`,
  f_s: (I, L, B, a, r) => `Ley de Laplace: F = I·L·B·sen α = ${I} · ${L} · ${B} · sen ${a}° = <b>${r} N</b>.${a === 90 ? "" : " Si el hilo fuera paralelo al campo, la fuerza sería cero."}`,
  i_q: (L, B, F) => `¿Qué intensidad (en A) debe circular por un hilo de ${L} cm, perpendicular a un campo de ${B} T, para que la fuerza sobre él sea de ${F} N?`,
  i_s: (F, L, B, r) => `De F = I·L·B (sen 90° = 1): I = F / (L·B) = ${F} / (${L} · ${B}) = <b>${r} A</b>.`,
  bal_q: (L, m, B) => `Un tramo horizontal de ${L} cm de un hilo de ${m} g cuelga de dos muelles en un campo horizontal de ${B} T, perpendicular al hilo. ¿Qué corriente (en A) hace que los muelles no soporten ningún peso? (g = 9,8 m/s²)`,
  bal_s: (m, L, B, r) => `La fuerza magnética debe equilibrar el peso: I·L·B = m·g, así que I = m·g / (L·B) = ${m} · 9,8 / (${L} · ${B}) ≈ <b>${r} A</b> (con el sentido que haga que la fuerza apunte hacia arriba).`,
  m_q: (N, S, I, B, th) => `Una bobina de ${N} espiras de ${S} cm² lleva ${I} A en un campo uniforme de ${B} T. ${th === 90 ? "Su plano es paralelo al campo." : `Su normal forma ${th}° con el campo.`} ¿Qué momento (en N·m) actúa sobre ella?`,
  m_s: (N, I, S, B, th, r) => `M = N·I·S·B·sen θ, con θ el ángulo entre la <b>normal</b> y el campo${th === 90 ? " (plano paralelo al campo: θ = 90°, par máximo)" : ""}. S = ${S} m². M = ${N} · ${I} · ${S} · ${B} · sen ${th}° = <b>${r} N·m</b>.`,
  im_q: (N, S, B, M) => `Una bobina de ${N} espiras y ${S} cm² tiene su plano paralelo a un campo de ${B} T. ¿Qué corriente (en A) produce un par de ${M} N·m?`,
  im_s: (M, N, S, B, r) => `Plano paralelo al campo: θ = 90°. I = M / (N·S·B) = ${M} / (${N} · ${S} · ${B}) = <b>${r} A</b> (S en m²).`,
  cambio: (i, x) => `${{ 2: "se duplica", 3: "se triplica", 0.5: "se reduce a la mitad" }[x]} ${["la intensidad", "la longitud del hilo dentro del campo", "el campo magnético"][i]}`,
  prop_q: c => `Un hilo con corriente está dentro de un campo magnético. Si ${c}, ¿por cuánto se multiplica la fuerza sobre el hilo?`,
  prop_s: (fs, r, many) => `F = I·L·B·sen α es proporcional a I, a L y a B: se multiplica por ${many ? `${fs} = ` : ""}<b>${r}</b>.`,
};

// fis12.ojo
S.OJ = {
  miope_q: r => `¿Qué potencia (en dioptrías) necesitan las gafas de un miope cuyo punto remoto está a ${r} cm? (Desprecia la distancia entre las gafas y el ojo).`,
  miope_s: (r, P) => `La lente debe dar, de los objetos lejanos (s = −∞), una imagen virtual en el punto remoto (s′ = −${r} m): P = 1/s′ − 1/s = 1/(−${r}) = <b>${P} D</b>. Lente divergente.`,
  lejos_q: pp => `Una persona tiene el punto próximo a ${pp} cm y quiere leer a 25 cm. ¿Qué potencia (en dioptrías) deben tener sus gafas?`,
  lejos_s: (pp, inv, P) => `La lente debe formar del libro (s = −0,25 m) una imagen virtual en el punto próximo (s′ = −${pp} m): P = 1/s′ − 1/s = −${inv} + 4 = <b>${P} D</b>. Lente convergente.`,
  lupa_q: f => `¿Cuántos aumentos da una lupa de ${f} cm de distancia focal, con la imagen en el infinito (ojo relajado)?`,
  lupa_s: (f, M) => `M = 25 cm / f′ = 25 / ${f} = <b>${M}</b>.`,
  lupaf_q: M => `¿Qué distancia focal (en cm) debe tener una lupa para dar ${M} aumentos con el ojo relajado?`,
  lupaf_s: (M, f) => `De M = 25 cm / f′: f′ = 25 / ${M} = <b>${f} cm</b>.`,
  micro_q: (fo, fc, L) => `¿Cuántos aumentos (en valor absoluto) da un microscopio con un objetivo de ${fo} mm, un ocular de ${fc} mm y una longitud de tubo de ${L} mm?`,
  micro_s: (L, fo, fc, a, b, M) => `|M| = (L / f′<sub>ob</sub>) · (250 mm / f′<sub>oc</sub>) = (${L} / ${fo}) · (250 / ${fc}) = ${a} · ${b} = <b>${M}</b>. La imagen final está invertida.`,
  tele_q: (fo, fc) => `¿Cuántos aumentos da un telescopio con un objetivo de ${fo} m de focal y un ocular de ${fc} cm?`,
  tele_s: (fo, fc, M) => `|M| = f′<sub>ob</sub> / f′<sub>oc</sub>, con las dos focales en la misma unidad: ${fo} cm / ${fc} cm = <b>${M}</b>.`,
  tubo_q: (fo, fc) => `Un telescopio de Kepler tiene un objetivo de ${fo} m de focal y un ocular de ${fc} cm. ¿Qué longitud aproximada (en m) tiene el tubo?`,
  tubo_s: (fo, fc, L) => `Los focos del objetivo y del ocular coinciden, así que el tubo mide la suma de las focales: ${fo} + ${fc} = <b>${L} m</b>.`,
  acom_q: s => `En un ojo sencillo, la lente está a ${s} mm de la retina. ¿Qué potencia (en dioptrías) tiene cuando mira al infinito?`,
  acom_s: (s, P) => `Mirando al infinito, la imagen se forma en la retina: P = 1/s′ − 1/s = 1/${s} − 0 ≈ <b>${P} D</b>. Para enfocar a 25 cm, el cristalino tiene que ganar unas 4 D más (acomodación).`,
  // [pregunta, opciones (la buena primero), explicación]
  conceptos: [
    ["¿Qué tipo de lente corrige la miopía?", ["Divergente", "Convergente", "Cilíndrica"], "El ojo miope es demasiado convergente y enfoca delante de la retina: hace falta una lente <b>divergente</b>."],
    ["¿Qué tipo de lente corrige la hipermetropía?", ["Convergente", "Divergente", "Cilíndrica"], "El ojo hipermétrope es poco convergente y enfoca detrás de la retina: hace falta una lente <b>convergente</b>."],
    ["¿Qué tipo de lente corrige el astigmatismo?", ["Cilíndrica", "Convergente", "Divergente"], "La córnea tiene distinta curvatura en cada dirección: se corrige con una lente <b>cilíndrica</b>."],
    ["Una persona miope, ¿qué ve mal?", ["De lejos", "De cerca", "Los colores"], "El miope enfoca delante de la retina los objetos lejanos: ve mal <b>de lejos</b>."],
    ["La presbicia (vista cansada) aparece con la edad porque…", ["El cristalino pierde flexibilidad y el ojo no puede acomodar para ver de cerca", "El ojo se alarga", "La córnea se curva demasiado"], "Al perder flexibilidad, el cristalino no acomoda: el punto próximo se aleja. Se corrige con lentes convergentes para leer."],
    ["La imagen que forma el ojo sobre la retina es…", ["Real, invertida y menor", "Virtual y derecha", "Real, derecha y mayor"], "El ojo es un sistema convergente, como una cámara: la imagen es <b>real, invertida y menor</b>; el cerebro le da la vuelta."],
    ["Lo más importante de un telescopio astronómico es…", ["El diámetro del objetivo, que recoge más luz", "El número de aumentos", "La longitud del tubo"], "Cuanto mayor es el objetivo, <b>más luz recoge</b>: se ven astros más débiles y detalles más finos."],
    ["¿Cómo enfoca el ojo objetos a distintas distancias?", ["Los músculos ciliares cambian la curvatura del cristalino", "La lente se acerca o se aleja de la retina", "La pupila cambia de tamaño"], "Es la <b>acomodación</b>: cambia la potencia del cristalino. Las cámaras, en cambio, mueven el objetivo."],
  ],
};

// fis12.ondasem
S.OE = {
  fm_q: f => `¿Qué longitud de onda (en m) tiene una emisora de FM de ${f} MHz? (c = 3·10<sup>8</sup> m/s)`,
  fm_s: (f, l) => `λ = c / f = 3·10<sup>8</sup> / (${f}·10<sup>6</sup>) ≈ <b>${l} m</b>.`,
  ghz: [["el wifi", 2.4], ["el wifi de 5 GHz", 5], ["un horno de microondas", 2.45], ["el bluetooth", 2.4], ["un radar de tráfico", 24]],
  ghz_q: (w, f) => `${w.charAt(0).toUpperCase() + w.slice(1)} funciona a ${f} GHz. ¿Qué longitud de onda (en cm) tiene esa radiación? (c = 3·10<sup>8</sup> m/s)`,
  ghz_s: (f, l) => `λ = c / f = 3·10<sup>8</sup> / (${f}·10<sup>9</sup>) m = 30 / ${f} cm ≈ <b>${l} cm</b>.`,
  luz_q: l => `¿Qué frecuencia tiene la luz de ${l} nm? Da el resultado en unidades de 10<sup>14</sup> Hz.`,
  luz_s: (l, f) => `f = c / λ = 3·10<sup>8</sup> / (${l}·10<sup>−9</sup>) ≈ <b>${f}·10<sup>14</sup> Hz</b>.`,
  b_q: E => `El campo eléctrico de una onda electromagnética en el vacío tiene una amplitud de ${E} V/m. ¿Qué amplitud tiene el campo magnético? Da el resultado en unidades de 10<sup>−8</sup> T.`,
  b_s: (E, b) => `En una onda electromagnética, E = c·B: B₀ = E₀ / c = ${E} / 3·10<sup>8</sup> ≈ <b>${b}·10<sup>−8</sup> T</b>. Es diminuto: las antenas detectan sobre todo el campo eléctrico.`,
  // [trayecto, distancia (mantisa, exponente), en minutos]
  viajes: [["del Sol a la Tierra", 1.5, 11, true], ["de la Luna a la Tierra", 3.84, 8, false], ["de Júpiter a la Tierra, cuando están más cerca", 6.3, 11, true], ["de un satélite GPS a la Tierra", 2.02, 7, false]],
  t_q: (w, d, min) => `¿Cuánto tarda la luz en llegar ${w} (distancia ${d} m)? Da el resultado en ${min ? "minutos, con una cifra decimal" : "segundos"}.`,
  t_s: (d, t, min, r) => `t = d / c = ${d} / 3·10<sup>8</sup> ≈ ${t} s${min ? ` = <b>${r} min</b>` : `: <b>${r} s</b>`}.`,
  int_q: (P, r) => `Una bombilla emite ${P} W de luz por igual en todas las direcciones. ¿Qué intensidad (en W/m²) llega a ${r} m de ella?`,
  int_s: (P, r, I) => `La potencia se reparte sobre una esfera de radio ${r} m: I = P / (4πr²) = ${P} / (4π · ${r * r}) ≈ <b>${I} W/m²</b>. Disminuye con el cuadrado de la distancia.`,
  // [radiación, longitudes de onda de ejemplo, intervalo, sujeto, nombre en la frase]
  espectro: [["Ondas de radio", ["3 m", "300 m", "10 m"], "de más de 1 m", "Las ondas de radio tienen", "ondas de radio"], ["Microondas", ["12 cm", "1 cm", "5 mm"], "de entre 1 mm y 1 m", "Las microondas tienen", "microondas"],
    ["Infrarrojo", ["10 μm", "2 μm", "900 nm"], "de entre 700 nm y 1 mm", "El infrarrojo tiene", "radiación infrarroja"], ["Luz visible", ["500 nm", "650 nm", "450 nm"], "de entre 400 y 700 nm", "La luz visible tiene", "luz visible"],
    ["Ultravioleta", ["250 nm", "300 nm", "100 nm"], "de entre 10 y 400 nm", "El ultravioleta tiene", "radiación ultravioleta"], ["Rayos X", ["0,1 nm", "1 nm", "0,05 nm"], "de entre 0,01 y 10 nm", "Los rayos X tienen", "rayos X"],
    ["Rayos gamma", ["0,001 nm", "0,0005 nm", "0,002 nm"], "de menos de 0,01 nm", "Los rayos gamma tienen", "rayos gamma"]],
  tipo_q: l => `¿Qué tipo de radiación electromagnética tiene una longitud de onda de ${l}?`,
  tipo_s: (l, e) => `${e[3]} longitudes de onda ${e[2]}. Una radiación de ${l} es <b>${e[4]}</b>.`,
  masf_q: "¿Cuál de estas radiaciones tiene mayor frecuencia?",
  menf_q: "¿Cuál de estas radiaciones tiene menor frecuencia?",
  orden_s: (e, hi) => `De menor a mayor frecuencia: radio, microondas, infrarrojo, visible, ultravioleta, rayos X y gamma (la longitud de onda va al revés). Tiene ${hi ? "mayor" : "menor"} frecuencia: <b>${e[4]}</b>.`,
};

// fis12.debroglie
S.DB = {
  v_q: v => `¿Qué longitud de onda de De Broglie (en nm) tiene un electrón que se mueve a ${v}·10<sup>6</sup> m/s? (h = 6,63·10<sup>−34</sup> J·s; m = 9,1·10<sup>−31</sup> kg)`,
  v_s: (v, l) => `λ = h / (m·v) = 6,63·10<sup>−34</sup> / (9,1·10<sup>−31</sup> · ${v}·10<sup>6</sup>) ≈ <b>${l} nm</b>, del tamaño de un átomo.`,
  V_q: V => `¿Qué longitud de onda (en nm) tiene un electrón acelerado desde el reposo por ${V} V? (h = 6,63·10<sup>−34</sup> J·s; m = 9,1·10<sup>−31</sup> kg; e = 1,6·10<sup>−19</sup> C)`,
  V_s: (V, l) => `De ½mv² = eV sale p = √(2meV): λ = h / √(2meV) = 6,63·10<sup>−34</sup> / √(2 · 9,1·10<sup>−31</sup> · 1,6·10<sup>−19</sup> · ${V}) ≈ <b>${l} nm</b>.`,
  ep_q: "Un electrón y un protón se mueven a la misma velocidad. ¿Cuántas veces mayor es la longitud de onda de De Broglie del electrón? (m<sub>p</sub> = 1,67·10<sup>−27</sup> kg; m<sub>e</sub> = 9,1·10<sup>−31</sup> kg)",
  ep_s: r => `λ = h / (m·v): a igual velocidad, λ es inversamente proporcional a la masa. λ<sub>e</sub> / λ<sub>p</sub> = m<sub>p</sub> / m<sub>e</sub> ≈ <b>${r}</b>.`,
  dxe_q: dx => `La posición de un electrón se conoce con una incertidumbre de ${dx} m. ¿Qué incertidumbre mínima tiene su velocidad? Da el resultado en unidades de 10<sup>5</sup> m/s. (h = 6,63·10<sup>−34</sup> J·s; m = 9,1·10<sup>−31</sup> kg)`,
  dxe_s: (dx, r) => `De Δx·Δp ≥ h/4π: Δv ≥ h / (4π·m·Δx) = 6,63·10<sup>−34</sup> / (4π · 9,1·10<sup>−31</sup> · ${dx}) ≈ <b>${r}·10<sup>5</sup> m/s</b>. Por eso en el átomo se habla de orbitales, no de órbitas.`,
  dxp_q: "Un protón está confinado en un núcleo, con Δx ≈ 10<sup>−14</sup> m. ¿Qué incertidumbre mínima tiene su velocidad? Da el resultado en unidades de 10<sup>6</sup> m/s. (h = 6,63·10<sup>−34</sup> J·s; m<sub>p</sub> = 1,67·10<sup>−27</sup> kg)",
  dxp_s: r => `Δv ≥ h / (4π·m·Δx) = 6,63·10<sup>−34</sup> / (4π · 1,67·10<sup>−27</sup> · 10<sup>−14</sup>) ≈ <b>${r}·10<sup>6</sup> m/s</b>: los nucleones se mueven muy deprisa dentro del núcleo.`,
  dE_q: t => `Un átomo permanece en un estado excitado unos ${t} s. ¿Cuál es la indeterminación mínima de la energía de ese estado? Da el resultado en unidades de 10<sup>−8</sup> eV. (h = 6,63·10<sup>−34</sup> J·s; 1 eV = 1,6·10<sup>−19</sup> J)`,
  dE_s: (t, r) => `ΔE ≥ h / (4π·Δt) = 6,63·10<sup>−34</sup> / (4π · ${t}) J; dividiendo entre 1,6·10<sup>−19</sup>: ≈ <b>${r}·10<sup>−8</sup> eV</b>. Por eso las rayas espectrales tienen una anchura natural.`,
  p_q: l => `¿Qué momento lineal tiene un fotón de luz de ${l} nm? Da el resultado en unidades de 10<sup>−27</sup> kg·m/s. (h = 6,63·10<sup>−34</sup> J·s)`,
  p_s: (l, r) => `Para un fotón, p = h / λ = 6,63·10<sup>−34</sup> / (${l}·10<sup>−9</sup>) ≈ <b>${r}·10<sup>−27</sup> kg·m/s</b>. (No se usa m·v: el fotón no tiene masa).`,
};

// fis12.reacciones
S.RN = {
  elem: { Kr: "criptón", Sr: "estroncio", Rb: "rubidio", Zr: "circonio", Y: "itrio", Mo: "molibdeno" },
  fisn_q: (x, y) => `Completa la fisión ²³⁵U + n → ${x} + ${y} + x n. ¿Cuánto vale x?`,
  fisn_s: (ax, ay, n) => `Se conserva el número másico: 235 + 1 = ${ax} + ${ay} + x, así que x = 236 − ${ax + ay} = <b>${n}</b> neutrones.`,
  fisx_q: (x, n) => `Completa la fisión <sup>235</sup><sub>92</sub>U + <sup>1</sup><sub>0</sub>n → ${x} + <sup>A</sup><sub>Z</sub>X + ${n} <sup>1</sup><sub>0</sub>n. ¿Cuánto valen A y Z?`,
  fisx_s: (ax, n, A, zx, Z, el) => `Se conservan los nucleones y la carga. A = 236 − ${ax} − ${n} = <b>${A}</b>; Z = 92 − ${zx} = <b>${Z}</b>: es el ${el}-${A}.`,
  // [reacción, masa de los reactivos, masa de los productos] (u)
  reac: [["D + T → ⁴He + n (masas en u: D 2,014102; T 3,016049; ⁴He 4,002603; n 1,008665)", 5.030151, 5.011268],
    ["D + D → ³He + n (masas en u: D 2,014102; ³He 3,016029; n 1,008665)", 4.028204, 4.024694],
    ["D + D → T + p (masas en u: D 2,014102; T 3,016049; p 1,007825)", 4.028204, 4.023874],
    ["D + ³He → ⁴He + p (masas en u: D 2,014102; ³He 3,016029; ⁴He 4,002603; p 1,007825)", 5.030131, 5.010428],
    ["⁶Li + n → ⁴He + T (masas en u: ⁶Li 6,015123; n 1,008665; ⁴He 4,002603; T 3,016049)", 7.023788, 7.018652],
    ["²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3 n (masas en u: ²³⁵U 235,043930; n 1,008665; ¹⁴¹Ba 140,914411; ⁹²Kr 91,926156)", 236.052595, 235.866562]],
  q_q: r => `¿Qué energía (en MeV) libera la reacción ${r}? (1 u ≡ 931,5 MeV)`,
  q_s: (mr, mp, dm, Q) => `Reactivos: ${mr} u; productos: ${mp} u. Δm = ${dm} u, y Q = Δm · 931,5 ≈ <b>${Q} MeV</b>. Los productos pesan algo menos porque están más ligados.`,
  fps_q: P => `Un reactor produce ${P} MW térmicos. Si cada fisión libera unos 200 MeV, ¿cuántas fisiones se producen cada segundo? Da el resultado en unidades de 10<sup>19</sup>. (1 MeV = 1,6·10<sup>−13</sup> J)`,
  fps_s: (P, n) => `Cada fisión: 200 · 1,6·10<sup>−13</sup> = 3,2·10<sup>−11</sup> J. Fisiones por segundo = ${P}·10<sup>6</sup> / 3,2·10<sup>−11</sup> ≈ <b>${n}·10<sup>19</sup></b>.`,
  // [reacción, A, Z, partícula]
  trans: [["<sup>14</sup><sub>7</sub>N + <sup>4</sup><sub>2</sub>He → <sup>17</sup><sub>8</sub>O + <sup>A</sup><sub>Z</sub>X", 1, 1, "un protón (la reacción de Rutherford, 1919)"],
    ["<sup>9</sup><sub>4</sub>Be + <sup>4</sup><sub>2</sub>He → <sup>12</sup><sub>6</sub>C + <sup>A</sup><sub>Z</sub>X", 1, 0, "un neutrón (así lo descubrió Chadwick en 1932)"],
    ["<sup>27</sup><sub>13</sub>Al + <sup>4</sup><sub>2</sub>He → <sup>30</sup><sub>15</sub>P + <sup>A</sup><sub>Z</sub>X", 1, 0, "un neutrón (el primer isótopo radiactivo artificial, 1934)"],
    ["<sup>7</sup><sub>3</sub>Li + <sup>1</sup><sub>1</sub>H → 2 <sup>A</sup><sub>Z</sub>X", 4, 2, "helio-4: dos partículas alfa"],
    ["<sup>2</sup><sub>1</sub>H + <sup>3</sup><sub>1</sub>H → <sup>A</sup><sub>Z</sub>X + <sup>1</sup><sub>0</sub>n", 4, 2, "helio-4 (la fusión de deuterio y tritio)"],
    ["<sup>6</sup><sub>3</sub>Li + <sup>1</sup><sub>0</sub>n → <sup>4</sup><sub>2</sub>He + <sup>A</sup><sub>Z</sub>X", 3, 1, "tritio (así se fabricará el tritio en los reactores de fusión)"]],
  trans_q: r => `Completa la reacción nuclear ${r}. ¿Cuánto valen A y Z?`,
  trans_s: (A, Z, name) => `Se conservan el número másico y la carga a los dos lados: A = <b>${A}</b> y Z = <b>${Z}</b>. Es ${name}.`,
  // [pregunta, opciones (la buena primero), explicación]
  conceptos: [
    ["En un reactor nuclear, el moderador sirve para…", ["Frenar los neutrones para que provoquen más fisiones del uranio-235", "Absorber neutrones y parar el reactor", "Enfriar el combustible"], "El U-235 se fisiona mucho mejor con neutrones <b>lentos</b>. Las barras de control son las que absorben neutrones."],
    ["En un reactor nuclear, las barras de control sirven para…", ["Absorber neutrones y regular la reacción en cadena", "Frenar los neutrones", "Producir vapor"], "Son de boro o cadmio y <b>absorben neutrones</b>; si se introducen del todo, detienen la reacción."],
    ["¿Qué necesita la fusión nuclear para producirse?", ["Temperaturas de más de cien millones de grados, para vencer la repulsión eléctrica", "Uranio enriquecido", "Neutrones lentos"], "Los núcleos, con carga positiva, se repelen: solo se acercan lo suficiente si chocan a velocidades enormes, a <b>temperaturas altísimas</b> (un plasma)."],
    ["La masa de los productos de una fisión o una fusión, comparada con la de los reactivos, es…", ["Algo menor; la diferencia se libera como energía", "Exactamente igual", "Mayor"], "Los nucleones se conservan, pero quedan más ligados: la masa disminuye un poco y se libera Q = Δm·c²."],
    ["¿Para qué se usa el flúor-18 en medicina?", ["Como emisor de positrones en la tomografía PET", "Como fuente de neutrones", "Para esterilizar instrumental"], "Se une a glucosa: las células que más glucosa consumen, como las tumorales, se ven en la imagen <b>PET</b>."],
    ["¿Puede una central nuclear explotar como una bomba atómica?", ["No: su combustible no está lo bastante enriquecido", "Sí, si falla la refrigeración", "Sí, si se sacan las barras de control"], "El uranio de una central tiene solo un 3–5 % de U-235. Puede haber explosiones de vapor o de hidrógeno, pero <b>no una explosión nuclear</b>."],
    ["¿De dónde sale la energía del Sol?", ["De la fusión de hidrógeno en helio", "De la fisión del uranio", "De la combustión del hidrógeno"], "En su centro, a 15 millones de grados, la cadena protón-protón convierte hidrógeno en <b>helio</b>."],
    ["¿Qué porcentaje de U-235 tiene el combustible de una central nuclear?", ["Un 3–5 %", "Un 0,7 %, como el uranio natural", "Más del 90 %"], "Se enriquece del 0,7 % natural a un <b>3–5 %</b>."],
  ],
};
// ── fin: * ── Textos de los generadores añadidos: fuerza sobre corrientes, el ojo y los instrumentos,
})();
