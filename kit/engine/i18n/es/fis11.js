/* WikiAula — textos de gen/fis11.js (Física, Grado 11), en español. */
"use strict";
(function () {
const G = window.WA.I18N.es.gen;
const S = G.fis11 = G.fis11 || {};
// r(t) = a·t i + (b·t² + d) j sin coeficientes 1 ni término «+ 0»
const k1 = n => (n === 1 ? "" : n);
const rt = (a, b, d) => `${k1(a)}t i + ${d === "+ 0" ? `${k1(b)}t² j` : `(${k1(b)}t² ${d}) j`}`;
// Números con signo menos tipográfico; entre paréntesis si son negativos (para sustituir en una cuenta)
const nf = n => String(Math.abs(n)).replace(".", ",");
const sn = n => (n < 0 ? "−" : "") + nf(n);
const pn = n => (n < 0 ? `(−${nf(n)})` : nf(n));
// Vector «x i + y j» sin componentes nulas ni «+ −»
const vec = (x, y) => {
  if (!x && !y) return "0";
  if (!x) return `${sn(y)} j`;
  return y ? `${sn(x)} i ${y < 0 ? "−" : "+"} ${nf(y)} j` : `${sn(x)} i`;
};
// y(t) = d0 + ½·a·t² escrito como MRUA
const mrua = (d0, a2) => (d0 ? `${sn(d0)} + ½·${a2}·t²` : `½·${a2}·t²`);
Object.assign(S, {
  vec,
  ve_q: [(a, b, c, d, t1, t2) => `Un móvil sigue r(t) = ${rt(a, b, d)} (SI). Calcula el módulo del desplazamiento (m) entre t = ${t1} s y t = ${t2} s.`,
    (a, b, d, t) => `Un móvil sigue r(t) = ${rt(a, b, d)} (SI). ¿Cuál es su rapidez (m/s) en t = ${t} s?`,
    (a, b, d, t1, t2) => `Un móvil sigue r(t) = ${rt(a, b, d)} (SI). ¿Cuál es el módulo de su velocidad media (m/s) entre t = ${t1} s y t = ${t2} s?`],
  ve_s: [(t1, r1, t2, r2, dr, dx, dy, r) => `Sustituimos el tiempo: r(${t1}) = ${r1} m; r(${t2}) = ${r2} m. Δr = r(${t2}) − r(${t1}) = ${dr} m; |Δr| = √(${pn(dx)}² + ${pn(dy)}²) = <b>${r} m</b>`,
    (a, a2, d0, t, vx, vy, r) => `x = ${k1(a)}t es un MRU: v<sub>x</sub> = ${a} m/s. y = ${mrua(d0, a2)} es un MRUA con v<sub>0y</sub> = 0 y a<sub>y</sub> = ${a2} m/s², así que v<sub>y</sub> = ${a2}t = ${a2} · ${t} = ${vy} m/s. |v| = √(${vx}² + ${vy}²) = <b>${r} m/s</b>`,
    (t1, r1, t2, r2, dr, dt, vm, vx, vy, r) => `r(${t1}) = ${r1} m; r(${t2}) = ${r2} m; Δr = ${dr} m. v<sub>m</sub> = Δr/Δt = (${dr}) / ${dt} = ${vm} m/s; |v<sub>m</sub>| = √(${vx}² + ${vy}²) = <b>${r} m/s</b>`],
  it_q: [(v, R, at) => `Un coche toma una curva de ${R} m de radio a ${v} m/s con una aceleración tangencial de ${at} m/s². ¿Cuánto vale su aceleración total (m/s²)?`,
    (v, R) => `¿Qué aceleración normal (m/s²) tiene un móvil que va a ${v} m/s por una curva de ${R} m de radio?`,
    (v, an) => `Un tren a ${v} m/s no debe superar una aceleración normal de ${an} m/s². ¿Qué radio mínimo (m) deben tener las curvas?`],
  it_s: [(v, R, an, at, r) => `a<sub>n</sub> = v²/R = ${v}² / ${R} = ${an} m/s²; son perpendiculares: |a| = √(a<sub>t</sub>² + a<sub>n</sub>²) = √(${at}² + ${an}²) = <b>${r} m/s²</b>`,
    (v, R, r) => `a<sub>n</sub> = v²/R = ${v}² / ${R} = <b>${r} m/s²</b>`,
    (v, an, r) => `a<sub>n</sub> = v²/R ⇒ R = v²/a<sub>n</sub> = ${v}² / ${an} = <b>${r} m</b>`],
  re_q: [(d, vb, vr) => `Una barca cruza un río de ${d} m de ancho remando perpendicular a la orilla a ${vb} m/s; la corriente va a ${vr} m/s. ¿Cuántos metros la arrastra río abajo?`,
    (vb, vr) => `Una barca va a ${vb} m/s respecto al agua, perpendicular a la orilla, y el río corre a ${vr} m/s. ¿Cuál es su velocidad respecto a la orilla (m/s)?`,
    (v1, v2) => `Caminas a ${v1} m/s sobre una cinta que avanza a ${v2} m/s en sentido contrario al tuyo. ¿A qué velocidad (m/s) te mueves respecto al suelo? (positivo en tu sentido)`,
    (vl, vc) => `La lluvia cae vertical a ${vl} m/s y un coche avanza a ${vc} m/s. ¿Con qué velocidad (m/s) ve el conductor llegar la lluvia?`],
  re_s: [(d, vb, vr, t, r) => `Solo cuenta la velocidad hacia la otra orilla: t = d/v<sub>b</sub> = ${d} / ${vb} = ${t} s. Deriva = v<sub>r</sub>·t = ${vr} · ${t} = <b>${r} m</b>`,
    (vb, vr, r) => `Son perpendiculares: v = √(v<sub>b</sub>² + v<sub>r</sub>²) = √(${vb}² + ${vr}²) = <b>${r} m/s</b>`,
    (v1, v2, r) => `Positivo en tu sentido; la cinta va en contra (−${v2} m/s): v = ${v1} + (−${v2}) = <b>${r} m/s</b>`,
    (vl, vc, r) => `Respecto al coche, la lluvia baja a ${vl} m/s y además va hacia atrás a ${vc} m/s, perpendiculares: v' = √(${vl}² + ${vc}²) = <b>${r} m/s</b>`],
  gr_q: (v, t1, t2, t3) => `Un coche acelera de 0 a ${v} m/s en ${t1} s, mantiene esa velocidad ${t2} s y frena hasta pararse en ${t3} s. ¿Qué distancia recorre (m)?`,
  gr_s: (v, t1, t2, t3, a, b, c, r) => `Área bajo v–t: triángulo ½ · ${t1} · ${v} = ${a} m; rectángulo ${t2} · ${v} = ${b} m; triángulo ½ · ${t3} · ${v} = ${c} m. Total: ${a} + ${b} + ${c} = <b>${r} m</b>`,
  gr_q2: (x1, x2, t1, t2) => `En una gráfica x–t recta, la posición pasa de ${x1} m a ${x2} m entre t = ${t1} s y t = ${t2} s. ¿Qué velocidad tiene (m/s)?`,
  gr_s2: (x1, x2, t1, t2, dx, dt, r) => `Pendiente: v = Δx/Δt = (${sn(x2)} − ${pn(x1)}) / (${t2} − ${t1}) = ${sn(dx)} / ${dt} = <b>${r} m/s</b>`,
  gr_q3: (v1, v2, t) => `En una gráfica v–t recta, la velocidad pasa de ${v1} m/s a ${v2} m/s en ${t} s. ¿Cuánto vale la aceleración (m/s²)?`,
  gr_s3: (v1, v2, t, dv, r) => `Pendiente: a = Δv/Δt = (${v2} − ${v1}) / ${t} = ${dv} / ${t} = <b>${r} m/s²</b>`,
  ho_q: [(v, h) => `Se lanza una piedra horizontalmente a ${v} m/s desde ${h} m de altura. ¿A qué distancia (m) del pie toca el suelo? (g = 9,8)`,
    (h) => `Se lanza un objeto horizontalmente desde ${h} m de altura. ¿Cuánto tarda (s) en llegar al suelo? (g = 9,8)`,
    (v, h) => `Se lanza una pelota horizontalmente a ${v} m/s desde ${h} m. ¿Con qué velocidad (m/s) llega al suelo? (g = 9,8)`,
    (h, x) => `¿A qué velocidad (m/s) debe salir una canica de una mesa de ${h} m para caer a ${x} m del borde? (g = 9,8)`],
  ho_s: [(h, t, v, r) => `Llega al suelo cuando y = 0: t = √(2h/g) = √(2 · ${h} / 9,8) = ${t} s. x = v₀·t = ${v} · ${t} = <b>${r} m</b>`,
    (h, r) => `Llega al suelo cuando y = 0: h = ½gt² ⇒ t = √(2h/g) = √(2 · ${h} / 9,8) = <b>${r} s</b>`,
    (h, t, vy, v, r) => `t = √(2 · ${h} / 9,8) = ${t} s; v<sub>y</sub> = g·t = 9,8 · ${t} = ${vy} m/s (hacia abajo). v = √(v₀² + v<sub>y</sub>²) = √(${v}² + ${vy}²) = <b>${r} m/s</b>`,
    (h, t, x, r) => `Tiempo de caída: t = √(2 · ${h} / 9,8) = ${t} s. En ese tiempo avanza x = v₀·t ⇒ v₀ = x/t = ${x} / ${t} = <b>${r} m/s</b>`],
  pa_q: [(v, a) => `Un proyectil sale a ${v} m/s formando ${a}° con el suelo. ¿Qué altura máxima (m) alcanza? (g = 9,8)`,
    (v, a) => `Un proyectil sale a ${v} m/s formando ${a}° con el suelo. ¿Cuál es su alcance (m) en terreno llano? (g = 9,8)`,
    (v, a) => `Un proyectil sale a ${v} m/s formando ${a}° con el suelo. ¿Cuánto tiempo (s) está en el aire? (g = 9,8)`,
    (v) => `¿Qué alcance máximo (m) puede lograr un proyectil lanzado a ${v} m/s en terreno llano? (g = 9,8)`],
  pa_s: [(v, a, s, vy, r) => `v<sub>0y</sub> = v₀·sen θ = ${v} · sen ${a}° = ${v} · ${s} = ${vy} m/s. En lo más alto v<sub>y</sub> = 0: h = v<sub>0y</sub>²/(2g) = ${vy}² / 19,6 = <b>${r} m</b>`,
    (v, a2, v2, s2, r) => `Sale y cae a la misma altura: x = v₀²·sen 2θ / g = ${v}² · sen ${a2}° / 9,8 = ${v2} · ${s2} / 9,8 = <b>${r} m</b>`,
    (v, a, s, vy, r) => `v<sub>0y</sub> = ${v} · sen ${a}° = ${v} · ${s} = ${vy} m/s. Sube y baja en el mismo tiempo: t = 2v<sub>0y</sub>/g = 2 · ${vy} / 9,8 = <b>${r} s</b>`,
    (v, r) => `El alcance es máximo con 45° (sen 90° = 1): x = v₀²/g = ${v}² / 9,8 = <b>${r} m</b>`],
  mc_q: [(rpm, R) => `Un disco gira a ${rpm} rpm. ¿Qué velocidad lineal (m/s) tiene un punto a ${R} m del eje?`,
    (T, R) => `Un punto gira en una circunferencia de ${R} m de radio con un periodo de ${T} s. ¿Cuál es su aceleración normal (m/s²)?`,
    (r1, r2, w1) => `Dos ruedas de ${r1} cm y ${r2} cm de radio están unidas por una correa. Si la primera gira a ${w1} rad/s, ¿a cuántos rad/s gira la segunda?`,
    (z1, z2) => `El plato de una bici tiene ${z1} dientes y el piñón ${z2}. ¿Cuántas vueltas da la rueda por cada pedalada?`],
  mc_s: [(rpm, w, R, r) => `En rad/s: ω = ${rpm} · 2π/60 = ${w} rad/s. v = ω·R = ${w} · ${R} = <b>${r} m/s</b>`,
    (T, w, R, r) => `ω = 2π/T = 2π / ${T} = ${w} rad/s; a<sub>n</sub> = ω²·R = ${w}² · ${R} = <b>${r} m/s²</b>`,
    (r1, r2, w1, r) => `La correa no resbala: ω₁R₁ = ω₂R₂ ⇒ ω₂ = ω₁R₁/R₂ = ${w1} · ${r1} / ${r2} = <b>${r} rad/s</b> (los cm se cancelan)`,
    (z1, z2, r) => `El radio es proporcional al número de dientes: el piñón, y con él la rueda, da ${z1} / ${z2} = <b>${r}</b> vueltas por pedalada`],
  ma_q: [(w0, w, t) => `Una rueda pasa de ${w0} rad/s a ${w} rad/s en ${t} s. ¿Cuál es su aceleración angular (rad/s²)?`,
    (w0, t) => `Un ventilador a ${w0} rad/s se para uniformemente en ${t} s. ¿Cuántas vueltas da hasta pararse?`,
    (a, t, R) => `Una rueda de ${R} m de radio arranca con α = ${a} rad/s². ¿Qué velocidad lineal (m/s) tiene el borde a los ${t} s?`,
    (rpm, t) => `Una centrifugadora pasa del reposo a ${rpm} rpm en ${t} s. ¿Cuál es su aceleración angular (rad/s²)?`],
  ma_s: [(w0, w, t, r) => `α = Δω/Δt = (${w} − ${w0}) / ${t} = <b>${r} rad/s²</b>`,
    (w0, t, al, phi, r) => `α = (0 − ${w0}) / ${t} = −${al} rad/s². Sin el tiempo: ω² − ω₀² = 2αΔφ ⇒ Δφ = (0 − ${w0}²) / (2 · (−${al})) = ${phi} rad (es el área del triángulo de la gráfica ω–t, ½ · ${w0} · ${t}). Vueltas = Δφ/2π = ${phi} / 2π = <b>${r}</b>`,
    (a, t, w, R, r) => `ω = ω₀ + α·t = 0 + ${a} · ${t} = ${w} rad/s; v = ω·R = ${w} · ${R} = <b>${r} m/s</b>`,
    (rpm, w, t, r) => `ω = ${rpm} · 2π/60 = ${w} rad/s; α = Δω/Δt = ${w} / ${t} = <b>${r} rad/s²</b>`],
  ne_q: [(m, F, a) => `Tiras de una caja de ${m} kg (sin rozamiento) con ${F} N formando ${a}° con la horizontal. ¿Qué aceleración (m/s²) adquiere?`,
    (m, F, a) => `Tiras de una caja de ${m} kg con ${F} N formando ${a}° con la horizontal. ¿Cuánto vale la normal (N)? (g = 9,8)`,
    (m, f1, f2) => `Sobre un cuerpo de ${m} kg actúan F₁ = ${f1} i N y F₂ = ${f2} j N. ¿Cuál es el módulo de su aceleración (m/s²)?`,
    (m, a) => `Un cuadro de ${m} kg cuelga de dos cuerdas simétricas que forman ${a}° con la horizontal. ¿Qué tensión (N) soporta cada una? (g = 9,8)`],
  ne_s: [(F, c, fx, m, r) => `Eje x: F<sub>x</sub> = F·cos α = ${F} · ${c} = ${fx} N. ΣF<sub>x</sub> = m·a ⇒ a = ${fx} / ${m} = <b>${r} m/s²</b>`,
    (m, F, s, p, fy, r) => `En vertical no hay aceleración: N + F·sen α − mg = 0 ⇒ N = mg − F·sen α = ${m} · 9,8 − ${F} · ${s} = ${p} − ${fy} = <b>${r} N</b>`,
    (f1, f2, F, m, r) => `ΣF = ${f1} i + ${f2} j N; |ΣF| = √(${f1}² + ${f2}²) = ${F} N; a = |ΣF|/m = ${F} / ${m} = <b>${r} m/s²</b>`,
    (m, s, r) => `En horizontal, las componentes T·cos α se anulan. En vertical: 2T·sen α = mg ⇒ T = ${m} · 9,8 / (2 · ${s}) = <b>${r} N</b>`],
  ro_q: [(m, F, mu) => `Arrastras una caja de ${m} kg con una fuerza horizontal de ${F} N; μ = ${mu}. ¿Qué aceleración (m/s²) tiene? (g = 9,8)`,
    (a, mu) => `Un bloque baja por un plano inclinado ${a}° con μ = ${mu}. ¿Qué aceleración (m/s²) tiene? (g = 9,8)`,
    (a) => `Un libro empieza a deslizar cuando la tabla se inclina ${a}°. ¿Cuánto vale μₑ?`,
    (m1, m2, mu) => `Un bloque de ${m1} kg sobre una mesa (μ = ${mu}) está unido por una cuerda y una polea a otro de ${m2} kg que cuelga. ¿Qué aceleración (m/s²) tiene el sistema? (g = 9,8)`],
  ro_s: [(m, mu, N, fr, F, r) => `N = mg = ${m} · 9,8 = ${N} N; F<sub>r</sub> = μN = ${mu} · ${N} = ${fr} N. a = (F − F<sub>r</sub>)/m = (${F} − ${fr}) / ${m} = <b>${r} m/s²</b>`,
    (s, mu, c, r) => `Positivo plano abajo: mg·sen α − μmg·cos α = ma ⇒ a = g(sen α − μ·cos α) = 9,8 · (${s} − ${mu} · ${c}) = <b>${r} m/s²</b>`,
    (a, r) => `A punto de deslizar: mg·sen α = μₑmg·cos α ⇒ μₑ = tg α = tg ${a}° = <b>${r}</b>`,
    (m1, m2, mu, P2, fr, M, r) => `Positivo en el sentido del movimiento. Bloque que cuelga: ${m2} · 9,8 − T = ${m2}a. Bloque de la mesa: T − ${mu} · ${m1} · 9,8 = ${m1}a. Sumando: ${P2} − ${fr} = ${M}a ⇒ a = <b>${r} m/s²</b>`],
  ci_q: [(mu, R) => `¿A qué velocidad máxima (m/s) puede tomarse una curva plana de ${R} m de radio si μ = ${mu}? (g = 9,8)`,
    (R, a) => `¿A qué velocidad (m/s) hay que tomar una curva de ${R} m con un peralte de ${a}° para no depender del rozamiento? (g = 9,8)`,
    (R) => `¿Qué velocidad mínima (m/s) necesita un vagón en lo alto de un bucle de ${R} m de radio? (g = 9,8)`,
    (m, L, f) => `Una piedra de ${m} kg gira atada a una cuerda de ${L} m dando ${f} ${f === 1 ? "vuelta" : "vueltas"} por segundo (plano horizontal, sin contar el peso). ¿Qué tensión (N) soporta la cuerda?`],
  ci_s: [(mu, R, r) => `El rozamiento lateral es la fuerza hacia el centro: μmg = mv²/R ⇒ v = √(μgR) = √(${mu} · 9,8 · ${R}) = <b>${r} m/s</b>`,
    (R, a, t, r) => `N·cos θ = mg y N·sen θ = mv²/R; dividiendo, tg θ = v²/(gR) ⇒ v = √(gR·tg θ) = √(9,8 · ${R} · tg ${a}°) = √(9,8 · ${R} · ${t}) = <b>${r} m/s</b>`,
    (R, r) => `En lo alto, con la velocidad mínima la normal se anula: mg = mv²/R ⇒ v = √(gR) = √(9,8 · ${R}) = <b>${r} m/s</b>`,
    (f, w, m, L, r) => `ω = 2πf = 2π · ${f} = ${w} rad/s. La tensión es la fuerza hacia el centro: T = mω²L = ${m} · ${w}² · ${L} = <b>${r} N</b>`],
  ho2_q: [(L0, L, m) => `Un muelle de ${L0} cm mide ${L} cm al colgarle ${m} g. ¿Cuánto vale su constante k (N/m)? (g = 9,8)`,
    (k, m, L0) => `Un muelle de k = ${k} N/m y ${L0} cm de longitud natural. ¿Cuánto medirá (cm) al colgarle ${m} kg? (g = 9,8)`,
    (k1, k2) => `Dos muelles de ${k1} N/m y ${k2} N/m se colocan en serie. ¿Cuál es la constante equivalente (N/m)?`,
    (k1, k2) => `Dos muelles de ${k1} N/m y ${k2} N/m se colocan en paralelo. ¿Cuál es la constante equivalente (N/m)?`],
  ho2_s: [(L0, L, x, xm, m, F, r) => `Alargamiento desde la longitud natural: x = ${L} − ${L0} = ${x} cm = ${xm} m. En equilibrio, kx = mg = ${m} · 9,8 = ${F} N ⇒ k = ${F} / ${xm} = <b>${r} N/m</b>`,
    (m, k, x, xc, L0, r) => `En equilibrio kx = mg ⇒ x = ${m} · 9,8 / ${k} = ${x} m = ${xc} cm. L = L₀ + x = ${L0} + ${xc} = <b>${r} cm</b>`,
    (k1, k2, r) => `En serie: 1/k = 1/k₁ + 1/k₂ ⇒ k = k₁k₂/(k₁ + k₂) = ${k1} · ${k2} / (${k1} + ${k2}) = <b>${r} N/m</b>`,
    (k1, k2, r) => `En paralelo: k = k₁ + k₂ = ${k1} + ${k2} = <b>${r} N/m</b>`],
  im_q: [(m, v, t) => `Una pelota de ${m} kg, inicialmente en reposo, sale a ${v} m/s tras un golpe que dura ${t} s. ¿Qué fuerza media (N) recibe?`,
    (m, v1, v2) => `Una pelota de ${m} kg choca contra una pared a ${v1} m/s y rebota a ${v2} m/s. ¿Cuánto vale el módulo del cambio de momento lineal (kg·m/s)?`,
    (F, t, m) => `Una fuerza de ${F} N actúa ${t} s sobre un cuerpo de ${m} kg en reposo. ¿Con qué velocidad (m/s) sale?`,
    (m, v, t) => `Un pasajero de ${m} kg que va a ${v} m/s se detiene en ${t} s gracias al airbag. ¿Qué fuerza media (N) soporta?`],
  im_s: [(m, v, p, t, r) => `Δp = m·v − 0 = ${m} · ${v} = ${p} kg·m/s; F = Δp/Δt = ${p} / ${t} = <b>${r} N</b>`,
    (m, v1, v2, r) => `Positivo hacia la pared: llega a +${v1} m/s y sale a −${v2} m/s. Δp = m·v₂ − m·v₁ = ${m} · (−${v2}) − ${m} · ${v1} = −${r} kg·m/s; su módulo es <b>${r} kg·m/s</b>`,
    (F, t, I, m, r) => `I = F·Δt = ${F} · ${t} = ${I} N·s = Δp. Parte del reposo: v = Δp/m = ${I} / ${m} = <b>${r} m/s</b>`,
    (m, v, p, t, r) => `Pasa de ${v} m/s a 0: |Δp| = m·v = ${m} · ${v} = ${p} kg·m/s; F = |Δp|/Δt = ${p} / ${t} = <b>${r} N</b>`],
  cp_q: [(m1, m2, v1) => `Dos patinadores de ${m1} kg y ${m2} kg, en reposo, se empujan. El primero sale a ${v1} m/s. Tomando positivo el sentido del primero, ¿qué velocidad (m/s, con su signo) lleva el segundo?`,
    (M, m, v) => `Un cañón de ${M} kg, en reposo, dispara un proyectil de ${m} kg a ${v} m/s. Tomando positivo el sentido del proyectil, ¿qué velocidad (m/s, con su signo) tiene el cañón al retroceder?`,
    (m1, v1, m2) => `Una persona de ${m1} kg corre a ${v1} m/s y salta sobre un carrito de ${m2} kg en reposo. ¿A qué velocidad (m/s) siguen juntos?`,
    (m1, v1, m2) => `Un vagón de ${m1} kg a ${v1} m/s engancha otro de ${m2} kg parado. ¿A qué velocidad (m/s) siguen?`],
  cp_s: [(m1, v1, m2, p, r) => `Antes, el momento total es 0. Después: 0 = m₁v₁ + m₂v₂ = ${m1} · ${v1} + ${m2} · v₂ ⇒ v₂ = −${p} / ${m2} = <b>${r} m/s</b> (el signo menos: sale en sentido contrario)`,
    (M, m, v, p, r) => `Antes, el momento total es 0. Después: 0 = m·v + M·V = ${m} · ${v} + ${M} · V ⇒ V = −${p} / ${M} = <b>${r} m/s</b> (retrocede)`,
    (m1, v1, m2, p, M, r) => `Antes: ${m1} · ${v1} = ${p} kg·m/s (el carrito, parado, no aporta). Después, juntos: (${m1} + ${m2})·v = ${p} ⇒ v = ${p} / ${M} = <b>${r} m/s</b>`,
    (m1, v1, m2, p, M, r) => `Antes: ${m1} · ${v1} = ${p} kg·m/s. Después, enganchados: (${m1} + ${m2})·v = ${p} ⇒ v = ${p} / ${M} = <b>${r} m/s</b>`],
  ch_q: [(m1, v1, m2) => `Un coche de ${m1} kg a ${v1} m/s choca con otro de ${m2} kg parado y quedan unidos. ¿Qué energía cinética (J) se pierde?`,
    (m1, v1, m2) => `Una bola de ${m1} kg a ${v1} m/s choca elásticamente con otra de ${m2} kg en reposo. ¿Con qué velocidad (m/s) sale la segunda?`,
    (m, M, h) => `Una bala de ${m} g se incrusta en un bloque de ${M} kg colgado que sube ${h} cm. ¿Qué velocidad (m/s) llevaba la bala? (g = 9,8)`],
  ch_s: [(m1, v1, m2, v, e1, M, e2, r) => `Momento: ${m1} · ${v1} = (${m1} + ${m2})·v' ⇒ v' = ${v} m/s. E<sub>c</sub> antes = ½ · ${m1} · ${v1}² = ${e1} J; después = ½ · ${M} · ${v}² = ${e2} J. Se pierden ≈ <b>${r} J</b>`,
    (m1, v1, m2, r) => `Choque elástico con la segunda en reposo: v₂' = 2m₁v₁/(m₁ + m₂) = 2 · ${m1} · ${v1} / (${m1} + ${m2}) = <b>${r} m/s</b>`,
    (h, V, m, M, r) => `Subida (se conserva la energía): V = √(2gh) = √(2 · 9,8 · ${h}) = ${V} m/s. Choque (se conserva el momento): m·v = (m + M)·V ⇒ v = (${m} + ${M}) · ${V} / ${m} = <b>${r} m/s</b>`],
  mo_q: [(F, d) => `Aplicas ${F} N perpendicularmente a ${d} m del eje de giro. ¿Qué momento (N·m) produces?`,
    (F, d, a) => `Aplicas ${F} N a ${d} m del eje formando ${a}° con la barra. ¿Qué momento (N·m) produces?`,
    (M, d) => `¿Qué fuerza (N) hay que aplicar perpendicularmente a ${d} m del eje para conseguir ${M} N·m?`,
    (F, d) => `Giras un volante de ${d} m de diámetro aplicando ${F} N con cada mano en sentidos opuestos. ¿Qué momento (N·m) ejerces?`],
  mo_s: [(F, d, r) => `Perpendicular: el brazo es la distancia al eje. M = F·d = ${F} · ${d} = <b>${r} N·m</b>`,
    (F, rr, a, s, br, r) => `M = F·r·sen θ = ${F} · ${rr} · sen ${a}° = ${F} · ${rr} · ${s} = <b>${r} N·m</b> (el brazo es d = r·sen θ = ${br} m)`,
    (M, d, r) => `M = F·d ⇒ F = M/d = ${M} / ${d} = <b>${r} N</b>`,
    (F, d, r) => `Par de fuerzas: M = F·d, con d la distancia entre las dos fuerzas (el diámetro). M = ${F} · ${d} = <b>${r} N·m</b>`],
  pl_q: [(m1, d1, m2) => `En un balancín, un niño de ${m1} kg se sienta a ${d1} m del eje. ¿A qué distancia (m) debe sentarse al otro lado un adulto de ${m2} kg?`,
    (R, dR, dF) => `Una carretilla lleva ${R} N a ${dR} m de la rueda; las manos están a ${dF} m de la rueda. ¿Qué fuerza (N) hay que hacer?`,
    (L, P, W, d) => `Un tablón de ${L} m y ${P} N se apoya en sus extremos A y B. Una persona de ${W} N está a ${d} m de A. ¿Qué fuerza (N) soporta el apoyo B?`],
  pl_s: [(m1, d1, m2, r) => `Momentos respecto al eje: ${m1} · g · ${d1} = ${m2} · g · d (la g se simplifica) ⇒ d = ${m1} · ${d1} / ${m2} = <b>${r} m</b>`,
    (R, dR, dF, r) => `Momentos respecto a la rueda: F · ${dF} = ${R} · ${dR} ⇒ F = ${R} · ${dR} / ${dF} = <b>${r} N</b>`,
    (L, P, Pp, d, L2, sum, r) => `Momentos respecto a A (así R<sub>A</sub> desaparece): R<sub>B</sub> · ${L} = ${Pp} · ${d} + ${P} · ${L2} = ${sum} ⇒ R<sub>B</sub> = ${sum} / ${L} = <b>${r} N</b>`],
  tr_q: [(F, dr) => `Una fuerza F = ${F} N desplaza un cuerpo Δr = ${dr} m. ¿Qué trabajo (J) realiza?`,
    (k, x) => `¿Qué trabajo (J) hay que hacer para estirar ${x} m un muelle de k = ${k} N/m?`,
    (F, v) => `Un coche avanza a ${v} m/s venciendo una resistencia de ${F} N. ¿Qué potencia (W) desarrolla el motor?`,
    (F, d1, d2) => `Una fuerza vale ${F} N durante ${d1} m y luego baja linealmente hasta 0 en ${d2} m. ¿Qué trabajo (J) realiza?`],
  tr_s: [(fx, fy, dx, dy, a, b, r) => `W = F·Δr = F<sub>x</sub>Δx + F<sub>y</sub>Δy = ${pn(fx)} · ${pn(dx)} + ${pn(fy)} · ${pn(dy)} = ${sn(a)} + ${pn(b)} = <b>${r} J</b>`,
    (k, x, r) => `W = ½kx² = ½ · ${k} · ${x}² = <b>${r} J</b>`,
    (F, v, r) => `A velocidad constante, el motor empuja con una fuerza igual a la resistencia: P = F·v = ${F} · ${v} = <b>${r} W</b>`,
    (F, d1, d2, a, b, r) => `Área bajo F–x: rectángulo ${F} · ${d1} = ${a} J; triángulo ½ · ${d2} · ${F} = ${b} J. Total: <b>${r} J</b>`],
  co_q: [(h1, h2) => `Un vagón parte del reposo a ${h1} m de altura. ¿Qué velocidad (m/s) lleva a ${h2} m de altura, sin rozamiento? (g = 9,8)`,
    (L) => `Un péndulo de ${L} m se suelta desde la horizontal. ¿Qué velocidad (m/s) lleva en el punto más bajo? (g = 9,8)`,
    (k, x, m) => `Un bloque de ${m} kg comprime ${x} m un muelle de ${k} N/m. Al soltarlo, ¿con qué velocidad (m/s) sale? (sin rozamiento)`,
    (R) => `¿Desde qué altura mínima (m) hay que soltar un vagón para que pase por lo alto de un bucle de ${R} m de radio? (sin rozamiento)`],
  co_s: [(h1, h2, dh, r) => `Sin rozamiento, E<sub>A</sub> = E<sub>B</sub>: mg·${h1} = mg·${h2} + ½mv² (la m se va) ⇒ v = √(2g(h₁ − h₂)) = √(2 · 9,8 · ${dh}) = <b>${r} m/s</b>`,
    (L, r) => `Desde la horizontal baja una altura h = L = ${L} m: mgL = ½mv² ⇒ v = √(2gL) = √(2 · 9,8 · ${L}) = <b>${r} m/s</b>`,
    (k, x, e, m, r) => `½kx² = ½ · ${k} · ${x}² = ${e} J, que pasa a cinética: ½mv² = ${e} ⇒ v = √(2 · ${e} / ${m}) = <b>${r} m/s</b>`,
    (R, R2, R5, r) => `Arriba (altura 2R = ${R2} m) la velocidad mínima cumple v² = gR. Energía abajo = energía arriba: mgh = mg · ${R2} + ½m·g·${R} ⇒ h = ${R2} + ${R5} = <b>${r} m</b> (2,5R)`],
  ba_q: [(m, h, v) => `Un esquiador de ${m} kg baja ${h} m de desnivel desde el reposo y llega a ${v} m/s. ¿Cuánta energía (J) se ha perdido por rozamiento? (g = 9,8)`,
    (m, v, F) => `Un coche de ${m} kg a ${v} m/s frena con una fuerza de ${F} N. ¿En qué distancia (m) se para?`,
    (m, L, a, mu) => `Un bloque de ${m} kg baja desde el reposo un plano de ${L} m inclinado ${a}° con μ = ${mu}. ¿Con qué velocidad (m/s) llega abajo? (g = 9,8)`,
    (m, h, t, P) => `Una grúa sube ${m} kg a ${h} m en ${t} s consumiendo ${P} W. ¿Cuál es su rendimiento (%)? (g = 9,8)`],
  ba_s: [(m, h, v, ep, ec, r) => `Arriba: E<sub>p</sub> = mgh = ${m} · 9,8 · ${h} = ${ep} J. Abajo: E<sub>c</sub> = ½mv² = ½ · ${m} · ${v}² = ${ec} J. Perdidos: ${ep} − ${ec} = <b>${r} J</b>`,
    (m, v, F, ec, r) => `Teorema de la energía cinética: −F·d = 0 − ½mv² ⇒ d = ½ · ${m} · ${v}² / ${F} = ${ec} / ${F} = <b>${r} m</b>`,
    (L, s, h, m, ep, mu, c, wr, ec, r) => `h = L·sen α = ${L} · ${s} = ${h} m; E<sub>p</sub> = ${m} · 9,8 · ${h} = ${ep} J. W<sub>r</sub> = −μ·mg·cos α·L = −${mu} · ${m} · 9,8 · ${c} · ${L} = −${wr} J. E<sub>c</sub> = ${ep} − ${wr} = ${ec} J ⇒ v = √(2 · ${ec} / ${m}) = <b>${r} m/s</b>`,
    (m, h, u, P, t, c, r) => `Útil: mgh = ${m} · 9,8 · ${h} = ${u} J. Consumida: P·t = ${P} · ${t} = ${c} J. η = ${u} / ${c} · 100 = <b>${r} %</b>`],
  ca_q: [(m1, t1, m2, t2) => `Mezclamos ${m1} g de agua a ${t1} °C con ${m2} g de agua a ${t2} °C. ¿Cuál es la temperatura de equilibrio (°C)?`,
    (m, t1, mw, t2, te) => `Un metal de ${m} g a ${t1} °C se echa en ${mw} g de agua a ${t2} °C y el equilibrio es ${te} °C. ¿Cuál es el calor específico del metal (J/(kg·K))? (c<sub>agua</sub> = 4180)`,
    (L0, dT) => `Un raíl de acero de ${L0} m se calienta ${dT} °C. ¿Cuánto se alarga (mm)? (α = 1,2·10⁻⁵ K⁻¹)`,
    (m, t) => `¿Cuánto hielo (kg) a 0 °C hace falta para enfriar ${m} kg de agua de ${t} °C a 0 °C? (L<sub>f</sub> = 334 000 J/kg)`],
  ca_s: [(m1, t1, m2, t2, s, M, r) => `ΣQ = 0: ${m1}·(T<sub>e</sub> − ${t1}) + ${m2}·(T<sub>e</sub> − ${t2}) = 0 (el calor específico, el mismo, se va). Quitando paréntesis: ${M}·T<sub>e</sub> = ${m1} · ${t1} + ${m2} · ${t2} = ${s} ⇒ T<sub>e</sub> = ${s} / ${M} = <b>${r} °C</b>`,
    (mw, te, q, m, dt, r) => `El agua gana Q = m·c·ΔT = ${mw} · 4180 · (${te} − 20) = ${q} J. El metal cede lo mismo: ${m} · c · (100 − ${te}) = ${q} ⇒ c = ${q} / (${m} · ${dt}) = <b>${r} J/(kg·K)</b>`,
    (L0, dT, m, r) => `ΔL = α·L₀·ΔT = 1,2·10⁻⁵ · ${L0} · ${dT} = ${m} m = <b>${r} mm</b>`,
    (m, t, q, r) => `El agua cede Q = m·c·ΔT = ${m} · 4180 · ${t} = ${q} J. Ese calor funde el hielo: Q = m<sub>h</sub>·L<sub>f</sub> ⇒ m<sub>h</sub> = ${q} / 334 000 = <b>${r} kg</b>`],
  pp_q: [(Q, P, v1, v2) => `Un gas recibe ${Q} J de calor y se expande a ${P} Pa de ${v1} L a ${v2} L. ¿Cuánto vale ΔU (J)?`,
    (Q) => `Un gas en un recipiente rígido recibe ${Q} J de calor. ¿Cuánto vale ΔU (J)?`,
    (P, v1, v2, Q) => `Un gas se comprime a ${P} Pa de ${v1} L a ${v2} L y cede ${Q} J de calor. ¿Cuánto vale ΔU (J)?`,
    (W) => `En una compresión adiabática se hacen ${W} J de trabajo sobre un gas. ¿Cuánto vale ΔU (J)?`],
  pp_s: [(Q, P, v1, v2, dv, W, r) => `Recibe calor: Q = +${Q} J. Se expande: ΔV = ${v2} − ${v1} = ${dv} L = ${dv}·10⁻³ m³; W = −P·ΔV = −${P} · ${dv}·10⁻³ = ${W} J. ΔU = Q + W = ${Q} + (${W}) = <b>${r} J</b>`,
    (r) => `Recipiente rígido (isocórico): ΔV = 0, así que W = 0 y ΔU = Q = <b>${r} J</b>`,
    (P, v1, v2, dv, W, Q, r) => `Se comprime: ΔV = ${v2} − ${v1} = −${dv} L = −${dv}·10⁻³ m³; W = −P·ΔV = −${P} · (−${dv}·10⁻³) = +${W} J. Cede calor: Q = −${Q} J. ΔU = Q + W = −${Q} + ${W} = <b>${r} J</b>`,
    (r) => `Adiabático: Q = 0. El trabajo se hace sobre el gas, W = +${r} J. ΔU = Q + W = <b>${r} J</b>`],
  mq_q: [(tc, tf) => `¿Cuál es el rendimiento máximo (%) de una máquina que trabaja entre ${tc} °C y ${tf} °C?`,
    (qc, qf) => `Un motor recibe ${qc} J por ciclo y cede ${qf} J. ¿Cuál es su rendimiento (%)?`,
    (qf, w) => `Un frigorífico extrae ${qf} J del interior por cada ${w} J eléctricos. ¿Cuál es su COP?`,
    (cop, w) => `Una bomba de calor con COP = ${cop} consume ${w} J. ¿Cuánto calor (J) da a la casa?`],
  mq_s: [(tc, tf, Tc, Tf, r) => `En kelvin: T<sub>c</sub> = ${tc} + 273 = ${Tc} K; T<sub>f</sub> = ${tf} + 273 = ${Tf} K. η = 1 − T<sub>f</sub>/T<sub>c</sub> = 1 − ${Tf}/${Tc} = <b>${r} %</b>`,
    (qc, qf, w, r) => `W = Q<sub>c</sub> − Q<sub>f</sub> = ${qc} − ${qf} = ${w} J; η = W/Q<sub>c</sub> = ${w} / ${qc} · 100 = <b>${r} %</b>`,
    (qf, w, r) => `COP = Q<sub>f</sub>/W = ${qf} / ${w} = <b>${r}</b>`,
    (cop, w, r) => `Q<sub>c</sub> = COP · W = ${cop} · ${w} = <b>${r} J</b>`],
});

/* ── Tipos de varios pasos (ronda M): se añaden al final de cada lista, en el orden de los índices de gen/fis11.js ── */
// Múltiplos de π: 0,5 → «π/2», 1,5 → «3π/2», 0,75 → «3π/4»
const pi = x => { for (const d of [1, 2, 4]) { const n = Math.round(x * d); if (Math.abs(x * d - n) < 1e-9) { if (!n) return "0"; const t = (n === 1 ? "" : n) + "π"; return d === 1 ? t : `${t}/${d}`; } } return nf(x) + "π"; };
const yLin = (b, ds) => (ds === "+ 0" ? `${k1(b)}t j` : `(${k1(b)}t ${ds}) j`);
const tx = a => (a === 1 ? "x" : `x/${a}`);
const dsx = ds => (ds === "+ 0" ? "" : ` ${ds}`);
// Fracción simplificada n/d como coeficiente: 2/4 → «(1/2)», 4/4 → «» (es 1), 8/4 → «2»
const gcd = (x, y) => (y ? gcd(y, x % y) : x);
const fr2 = (n, d) => { const m = gcd(n, d), p = n / m, q = d / m; return q === 1 ? k1(p) : `(${p}/${q})`; };
Object.assign(S, {
  pi,
  dondePi: red => ({ 0: " (a la derecha del centro)", 0.5: " (arriba)", 1: " (a la izquierda)", 1.5: " (abajo)" })[red] || "",
  tray: ["Una recta", "Una parábola", "Una circunferencia"],
  gr_f: ["Desplazamiento (m)", "Distancia recorrida (m)"],
  gr_q4: (v0, t) => `Se lanza una pelota hacia arriba a ${v0} m/s (g = 10 m/s²). Con la gráfica v–t, calcula su desplazamiento y la distancia que recorre (m) en los primeros ${t} s.`,
  gr_s4: (v0, ts, t, up, tb, vt, dn, dx, dist) => `La v–t es una recta que sale de ${v0} m/s con pendiente −10 y corta el eje en t = ${v0}/10 = ${ts} s (lo más alto). Subida: triángulo ½ · ${ts} · ${v0} = ${up} m, encima del eje. Bajada: en ${tb} s llega a −${vt} m/s; triángulo ½ · ${tb} · ${vt} = ${dn} m, debajo del eje. Desplazamiento = ${up} − ${dn} = <b>${dx} m</b>; distancia = ${up} + ${dn} = <b>${dist} m</b>`,
  gr_q5: (x0, v0, a, t) => `Un móvil está en x₀ = ${x0} m ${v0 ? `con v₀ = ${v0} m/s` : "en reposo"} y acelera a ${a} m/s² durante ${t} s. Con las áreas de las gráficas a–t y v–t, ¿en qué posición (m) acaba?`,
  gr_s5: (x0, v0, a, t, dv, v, dx, r) => `Área bajo a–t: ${a} · ${t} = ${dv} m/s, así que acaba a v = ${v0} + ${dv} = ${v} m/s. Área bajo v–t (${v0 ? "trapecio" : "triángulo"}): (${v0} + ${v}) / 2 · ${t} = ${dx} m. x = x₀ + Δx = ${x0} + ${dx} = <b>${r} m</b>`,
});
S.ve_q.push(
  (a, c, b, d) => `Un móvil sigue r(t) = ${c ? `(${k1(a)}t + ${k1(c)}t²) i` : `${k1(a)}t i`} + ${d === "+ 0" ? `${k1(b)}t² j` : `(${k1(b)}t² ${d}) j`} (SI). ¿Cuál es el módulo de su aceleración (m/s²)?`,
  (a, b, d, t) => `Un móvil sigue r(t) = ${rt(a, b, d)} (SI). ¿Qué ángulo (°) forma su velocidad con el eje x en t = ${t} s?`,
  (kind, a, b, d, R) => `Un móvil sigue r(t) = ${kind === 2 ? `${R} cos t i + ${R} sen t j` : `${k1(a)}t i + ${kind === 0 ? yLin(b, d) : (d === "+ 0" ? `${k1(b)}t² j` : `(${k1(b)}t² ${d}) j`)}`} (SI). ¿Qué forma tiene su trayectoria?`);
S.ve_s.push(
  (a, c, b, d0, ax, ay, va, r) => `${c ? `x = ${k1(a)}t + ½·${ax}·t² es un MRUA: a<sub>x</sub> = ${ax} m/s²` : `x = ${k1(a)}t es un MRU: a<sub>x</sub> = 0`}. y = ${mrua(d0, ay)} es un MRUA: a<sub>y</sub> = ${ay} m/s². a = ${va} m/s² (constante); |a| = √(${ax}² + ${ay}²) = <b>${r} m/s²</b>`,
  (a, a2, d0, t, vy, tg, r) => `x = ${k1(a)}t es un MRU: v<sub>x</sub> = ${a} m/s. y = ${mrua(d0, a2)} es un MRUA: v<sub>y</sub> = ${a2}t = ${a2} · ${t} = ${vy} m/s. tg α = v<sub>y</sub>/v<sub>x</sub> = ${vy} / ${a} = ${tg} ⇒ α = arctan ${tg} = <b>${r}°</b>`,
  (kind, a, b, ds, R) => kind === 2 ? `x² + y² = ${R}²·cos² t + ${R}²·sen² t = ${R}²·(cos² t + sen² t) = ${R * R}: es una <b>circunferencia</b> de radio ${R} m centrada en el origen`
    : kind === 0 ? `De x = ${k1(a)}t sale t = ${tx(a)}; sustituyendo, y = ${b}·${tx(a)}${dsx(ds)}: y depende de x en primer grado, es una <b>recta</b>`
    : `De x = ${k1(a)}t sale t = ${tx(a)}; sustituyendo, y = ${a === 1 ? `${k1(b)}x²${dsx(ds)}` : `${b}·(x/${a})²${dsx(ds)} = ${fr2(b, a * a)}x²${dsx(ds)}`}: x aparece al cuadrado, es una <b>parábola</b>`);
S.it_q.push(
  (v, R, at) => `Un coche toma una curva de ${R} m de radio a ${v} m/s mientras frena a razón de ${at} m/s². ¿Cuánto vale su aceleración total (m/s²)?`,
  (v, R, at, frena) => `Un coche toma una curva de ${R} m de radio a ${v} m/s mientras ${frena ? "frena" : "acelera"} a razón de ${at} m/s². ¿Qué ángulo (°) forma su aceleración con la tangente a la curva?`);
S.it_s.push(
  (v, R, an, at, r) => `Frena: a<sub>t</sub> = −${at} m/s². a<sub>n</sub> = v²/R = ${v}² / ${R} = ${an} m/s². Son perpendiculares: |a| = √((−${at})² + ${an}²) = <b>${r} m/s²</b> (al elevar al cuadrado, el signo desaparece)`,
  (v, R, an, at, tg, r, frena) => `a<sub>n</sub> = v²/R = ${v}² / ${R} = ${an} m/s²; |a<sub>t</sub>| = ${at} m/s². tg φ = a<sub>n</sub>/|a<sub>t</sub>| = ${an} / ${at} = ${tg} ⇒ φ = <b>${r}°</b>, hacia el interior de la curva y hacia ${frena ? "atrás (frena)" : "delante (acelera)"}`);
S.re_q.push(
  (vb, vr) => `Una barca va a ${vb} m/s respecto al agua y el río corre a ${vr} m/s. ¿Qué ángulo (°) con la perpendicular a la orilla debe apuntar río arriba para llegar justo enfrente?`,
  (d, vb, vr) => `Una barca va a ${vb} m/s respecto al agua en un río de ${d} m de ancho que corre a ${vr} m/s. Si apunta río arriba para llegar justo enfrente, ¿cuánto tarda (s) en cruzar?`,
  (vl, vc) => `La lluvia cae vertical a ${vl} m/s y un coche avanza a ${vc} m/s. ¿Qué ángulo (°) con la vertical forman las gotas que ve llegar el conductor?`);
S.re_s.push(
  (vb, vr, s, r) => `La parte de la velocidad de la barca a lo largo del río debe anular la corriente: v<sub>b</sub>·sen θ = v<sub>r</sub> ⇒ sen θ = ${vr} / ${vb} = ${s} ⇒ θ = <b>${r}°</b>`,
  (d, vb, vr, s, th, vu, r) => `Para no derivar: sen θ = v<sub>r</sub>/v<sub>b</sub> = ${vr} / ${vb} = ${s} ⇒ θ = ${th}°. Solo cruza la parte v<sub>b</sub>·cos θ = ${vb} · cos ${th}° = ${vu} m/s. t = ${d} / ${vu} = <b>${r} s</b>`,
  (vl, vc, tg, r) => `Respecto al coche, la lluvia baja a ${vl} m/s y además va hacia atrás a ${vc} m/s: tg α = ${vc} / ${vl} = ${tg} ⇒ α = <b>${r}°</b> con la vertical`);
S.pa_q.push(
  (v, a, t) => `Un proyectil sale a ${v} m/s formando ${a}° con el suelo. ¿A qué altura (m) está a los ${t} s? (g = 9,8)`,
  (v, a, d) => `Un balón sale a ${v} m/s formando ${a}° con el suelo. ¿A qué altura (m) pasa cuando ha avanzado ${d} m en horizontal? (g = 9,8)`,
  (v, a, h0) => `Desde ${h0} m de altura se lanza una piedra a ${v} m/s formando ${a}° con la horizontal. ¿A qué distancia horizontal (m) cae? (g = 9,8)`);
S.pa_s.push(
  (v, a, s, vy, t, p1, p2, r) => `v<sub>0y</sub> = ${v} · sen ${a}° = ${v} · ${s} = ${vy} m/s. y = v<sub>0y</sub>·t − ½gt² = ${vy} · ${t} − 4,9 · ${t}² = ${p1} − ${p2} = <b>${r} m</b>`,
  (v, a, c, s, vx, vy, d, t, p1, p2, r) => `v<sub>0x</sub> = ${v} · cos ${a}° = ${v} · ${c} = ${vx} m/s; v<sub>0y</sub> = ${v} · sen ${a}° = ${v} · ${s} = ${vy} m/s. Condición x = ${d}: t = ${d} / ${vx} = ${t} s. En ese instante y = ${vy} · ${t} − 4,9 · ${t}² = ${p1} − ${p2} = <b>${r} m</b>`,
  (v, a, h0, vx, vy, disc, t, tn, r) => `v<sub>0x</sub> = ${v} · cos ${a}° = ${vx} m/s; v<sub>0y</sub> = ${v} · sen ${a}° = ${vy} m/s. Llega al suelo cuando y = 0: 0 = ${h0} + ${vy}t − 4,9t², es decir, 4,9t² − ${vy}t − ${h0} = 0. t = (${vy} ± √(${vy}² + 4 · 4,9 · ${h0})) / 9,8 = (${vy} ± ${disc}) / 9,8; la raíz negativa (${tn} s) no vale: t = ${t} s. x = ${vx} · ${t} = <b>${r} m</b>`);
S.mc_q.push(
  (p0, w, t) => `Un punto parte de φ₀ = ${p0} rad y gira a ω = ${w} rad/s. ¿Cuántas vueltas ha dado a los ${t} s?`,
  (p0, w, t) => `Un punto parte de φ₀ = ${p0} rad y gira a ω = ${w} rad/s (ángulos desde el eje x positivo, en sentido antihorario). ¿Qué ángulo (rad, entre 0 y 2π) indica su posición a los ${t} s?`);
S.mc_s.push(
  (w, t, dphi, turns) => `Ángulo girado: Δφ = ω·t = ${w} · ${t} = ${dphi} rad. Vueltas = Δφ/2π = <b>${turns}</b> (φ₀ no cuenta: solo dice dónde empieza)`,
  (p0, w, t, phi, n, red, r, donde) => `φ = φ₀ + ω·t = ${p0} + ${w} · ${t} = ${phi} rad. ${n ? `Quitamos ${n} vuelta${n > 1 ? "s" : ""} completa${n > 1 ? "s" : ""} (2π cada una): ` : "Ya está entre 0 y 2π: "}φ = ${red} rad ≈ <b>${r} rad</b>${donde}`);
S.ma_q.push(
  (al, R, t) => `Una centrifugadora arranca desde el reposo con α = ${al} rad/s². ¿Cuál es la aceleración total (m/s²) de un punto a ${R} m del eje a los ${t} s?`,
  (v, t, R) => `Un coche pasa de 0 a ${v} m/s en ${t} s con ruedas de ${R} m de radio que ruedan sin deslizar. ¿Cuál es la aceleración angular (rad/s²) de las ruedas?`);
S.ma_s.push(
  (al, t, w, R, at, an, r) => `ω = α·t = ${al} · ${t} = ${w} rad/s. a<sub>t</sub> = α·R = ${al} · ${R} = ${at} m/s²; a<sub>n</sub> = ω²·R = ${w}² · ${R} = ${an} m/s². |a| = √(${at}² + ${an}²) = <b>${r} m/s²</b>`,
  (v, t, a, R, r) => `Aceleración del coche: a = Δv/Δt = ${v} / ${t} = ${a} m/s². Rueda sin deslizar: a = α·R ⇒ α = a/R = ${a} / ${R} = <b>${r} rad/s²</b>`);
S.ne_q.push(
  (m, a, sube) => `Una persona de ${m} kg está sobre una báscula en un ascensor que arranca hacia ${sube ? "arriba" : "abajo"} con ${a} m/s². ¿Qué fuerza (N) marca la báscula? (g = 9,8)`,
  (m, a) => `Un bloque de ${m} kg baja sin rozamiento por un plano inclinado ${a}°. ¿Qué aceleración (m/s²) tiene? (g = 9,8)`,
  (P, a1, a2) => `Una lámpara de ${P} N cuelga de dos cuerdas que forman ${a1}° y ${a2}° con el techo. ¿Qué tensión (N) soporta la cuerda de ${a1}°?`);
S.ne_s.push(
  (m, a, sube, r) => sube ? `Positivo hacia arriba; la aceleración va hacia arriba: N − mg = m·a ⇒ N = m(g + a) = ${m} · (9,8 + ${a}) = <b>${r} N</b> (más que su peso)`
    : `Positivo hacia arriba; la aceleración va hacia abajo (−${a} m/s²): N − mg = m·(−a) ⇒ N = m(g − a) = ${m} · (9,8 − ${a}) = <b>${r} N</b> (menos que su peso)`,
  (a, s, r) => `Ejes paralelo y perpendicular al plano. A lo largo del plano solo actúa mg·sen α: mg·sen α = m·a ⇒ a = g·sen α = 9,8 · sen ${a}° = 9,8 · ${s} = <b>${r} m/s²</b> (la masa se va)`,
  (a1, a2, c1, c2, q, s1, s2, P, den, r) => `No son simétricas: hay que usar los dos ejes. En x: T₁·cos ${a1}° = T₂·cos ${a2}° ⇒ T₂ = T₁ · ${c1} / ${c2} = ${q}·T₁. En y: T₁·sen ${a1}° + T₂·sen ${a2}° = ${P} ⇒ T₁·(${s1} + ${q} · ${s2}) = ${P} ⇒ T₁ = ${P} / ${den} = <b>${r} N</b>`);
S.ro_q.push(
  (m, F, me, md) => `Empujas una caja de ${m} kg con una fuerza horizontal de ${F} N; μₑ = ${me} y μ<sub>d</sub> = ${md}. ¿Qué aceleración (m/s²) adquiere? (escribe 0 si no se mueve; g = 9,8)`,
  (v0, a, mu) => `Lanzamos un bloque a ${v0} m/s plano arriba por un plano de ${a}° con μ = ${mu}. ¿Qué distancia (m) recorre hasta pararse? (g = 9,8)`,
  (m1, a, mu, m2) => `Un bloque de ${m1} kg en un plano de ${a}° (μ = ${mu}) está unido por una cuerda, que pasa por una polea en lo alto del plano, a otro de ${m2} kg que cuelga. ¿Qué aceleración (m/s²) tiene el sistema? (g = 9,8)`,
  (m, a, me) => `Un bloque de ${m} kg está parado en un plano inclinado ${a}°, con μₑ = ${me}. ¿Cuánto vale la fuerza de rozamiento (N)? (g = 9,8)`);
S.ro_s.push(
  (m, N, me, Fe, F, moves, md, Fd, r) => `N = mg = ${m} · 9,8 = ${N} N. Rozamiento estático máximo: μₑN = ${me} · ${N} = ${Fe} N. ` + (moves
    ? `${F} N &gt; ${Fe} N: se mueve, y desde ese momento actúa el dinámico, μ<sub>d</sub>N = ${md} · ${N} = ${Fd} N. a = (${F} − ${Fd}) / ${m} = <b>${r} m/s²</b>`
    : `${F} N &lt; ${Fe} N: <b>no se mueve</b> (a = 0). El rozamiento vale ${F} N, justo lo que hace falta, no ${Fe} N`),
  (s, mu, c, ac, v0, r) => `Al subir, la componente del peso (mg·sen α) y el rozamiento (μmg·cos α) van los dos plano abajo. Positivo plano arriba: a = −g(sen α + μ·cos α) = −9,8 · (${s} + ${mu} · ${c}) = −${ac} m/s². Se para cuando v = 0: 0 − ${v0}² = 2 · (−${ac}) · d ⇒ d = <b>${r} m</b>`,
  (m1, m2, a, mu, P2, Px, fr, M, net, r) => `El de ${m2} kg baja (positivo hacia abajo): ${m2} · 9,8 − T = ${m2}a. El del plano sube (positivo plano arriba): T − ${m1} · 9,8 · sen ${a}° − ${mu} · ${m1} · 9,8 · cos ${a}° = ${m1}a. Sumando, la T se va: ${P2} − ${Px} − ${fr} = ${M}a ⇒ ${net} = ${M}a ⇒ a = <b>${r} m/s²</b>`,
  (a, tg, me, m, s, r, max) => `tg ${a}° = ${tg} &lt; μₑ = ${me}: no desliza. El rozamiento estático vale lo que hace falta para sujetarlo: F<sub>r</sub> = mg·sen α = ${m} · 9,8 · ${s} = <b>${r} N</b> (no el máximo μₑmg·cos α = ${max} N)`);
S.ci_q.push(
  (m, R, v) => `Una persona de ${m} kg pasa por el punto más bajo de un bucle de ${R} m de radio a ${v} m/s. ¿Qué fuerza (N) le hace el asiento? (g = 9,8)`,
  (m, R, v) => `Un coche de ${m} kg pasa a ${v} m/s por lo alto de un badén de ${R} m de radio. ¿Qué normal (N) le hace la carretera? (g = 9,8)`);
S.ci_s.push(
  (m, v, R, vr, r, k) => `Abajo, el centro está encima: positivo hacia arriba, N − mg = mv²/R ⇒ N = m(g + v²/R) = ${m} · (9,8 + ${v}²/${R}) = ${m} · (9,8 + ${vr}) = <b>${r} N</b>, unas ${k} veces su peso`,
  (m, v, R, vr, r, vmax) => `Arriba, el centro está debajo: positivo hacia abajo, mg − N = mv²/R ⇒ N = m(g − v²/R) = ${m} · (9,8 − ${v}²/${R}) = ${m} · (9,8 − ${vr}) = <b>${r} N</b>, menos que su peso (despegaría a √(gR) = ${vmax} m/s)`);
S.ho2_q.push((m, k, a, sube) => `De un dinamómetro (un muelle de k = ${k} N/m) cuelga una masa de ${m} kg dentro de un ascensor que arranca hacia ${sube ? "arriba" : "abajo"} con ${a} m/s². ¿Cuánto se alarga el muelle (cm)? (g = 9,8)`);
S.ho2_s.push((m, a, sube, F, k, x, r) => `Positivo hacia arriba: kx − mg = m·(${sube ? a : `−${a}`}) ⇒ kx = m(g ${sube ? "+" : "−"} a) = ${m} · (9,8 ${sube ? "+" : "−"} ${a}) = ${F} N. x = ${F} / ${k} = ${x} m = <b>${r} cm</b>`);
S.im_q.push((m, v1, v2, t) => `Una pelota de ${m} kg choca contra una pared a ${v1} m/s y rebota a ${v2} m/s; el contacto dura ${t} s. ¿Qué fuerza media (N, en módulo) le hace la pared?`);
S.im_s.push((m, v1, v2, dp, t, r) => `Positivo hacia la pared: llega a +${v1} m/s y sale a −${v2} m/s. Δp = ${m} · (−${v2}) − ${m} · ${v1} = −${dp} kg·m/s. F = Δp/Δt = −${dp} / ${t}: su módulo es <b>${r} N</b>, alejándose de la pared`);
S.cp_q.push(
  (m1, v1, m2, v2) => `Un vagón de ${m1} t a ${v1} m/s choca con otro de ${m2} t que viene de frente a ${v2} m/s y se enganchan. Tomando positivo el sentido del primero, ¿qué velocidad (m/s, con su signo) llevan después?`,
  (M, m1, v1, m2, v2, m3) => `Un objeto de ${M} kg en reposo estalla en tres trozos. Uno de ${m1} kg sale a ${v1} m/s hacia el este y otro de ${m2} kg a ${v2} m/s hacia el norte. ¿Con qué rapidez (m/s) sale el tercero, de ${m3} kg?`);
S.cp_s.push(
  (m1, v1, m2, v2, p1, p2, p, M, r, pos) => `El segundo va en sentido contrario: −${v2} m/s. Antes: ${m1} · ${v1} + ${m2} · (−${v2}) = ${p1} − ${p2} = ${p} t·m/s (las toneladas se simplifican al final). Después, enganchados: (${m1} + ${m2})·v' = ${p} ⇒ v' = ${p} / ${M} = <b>${r} m/s</b> (${pos ? "siguen en el sentido del primero" : "el signo menos: siguen en el sentido del segundo"})`,
  (m1, v1, m2, v2, px, py, p3, m3, r) => `Antes, p = 0. Eje x (este): 0 = ${m1} · ${v1} + p<sub>3x</sub> ⇒ p<sub>3x</sub> = −${px} kg·m/s. Eje y (norte): 0 = ${m2} · ${v2} + p<sub>3y</sub> ⇒ p<sub>3y</sub> = −${py} kg·m/s. |p₃| = √(${px}² + ${py}²) = ${p3} kg·m/s ⇒ v₃ = ${p3} / ${m3} = <b>${r} m/s</b>, hacia el suroeste`);
S.ch_q.push(
  (m1, v1, m2) => `Una bola de ${m1} kg a ${v1} m/s choca elásticamente con otra de ${m2} kg en reposo. Tomando positivo el sentido inicial, ¿qué velocidad (m/s, con su signo) lleva después la primera?`,
  (m1, v1, m2, v2) => `Un coche de ${m1} kg a ${v1} m/s choca de frente con otro de ${m2} kg que va a ${v2} m/s en sentido contrario, y quedan enganchados. Tomando positivo el sentido del primero, ¿qué velocidad (m/s, con su signo) llevan después?`,
  (h, h2) => `Una pelota cae desde ${h} m y rebota hasta ${h2} m. ¿Cuánto vale el coeficiente de restitución del choque con el suelo? (g = 9,8)`,
  (a, b, c, d) => `Dos bolas se acercan de frente: la primera a ${a} m/s y la segunda a ${b} m/s. Tras el choque se separan: la primera rebota a ${c} m/s y la segunda a ${d} m/s. ¿Cuánto vale el coeficiente de restitución?`);
S.ch_s.push(
  (m1, m2, v1, dm, M, r, neg, v2) => `v₁' = (m₁ − m₂)/(m₁ + m₂) · v₁ = (${m1} − ${m2}) / (${m1} + ${m2}) · ${v1} = ${sn(dm)} / ${M} · ${v1} = <b>${r} m/s</b>${neg ? " (negativa: rebota hacia atrás, porque es más ligera)" : " (sigue hacia delante, más despacio)"}. La segunda sale a v₂' = 2m₁v₁/(m₁ + m₂) = ${v2} m/s`,
  (m1, v1, m2, v2, p1, p2, p, M, r, pos) => `El segundo va en sentido contrario: −${v2} m/s. ${m1} · ${v1} + ${m2} · (−${v2}) = ${p1} − ${p2} = ${p} kg·m/s = (${m1} + ${m2})·v' ⇒ v' = ${p} / ${M} = <b>${r} m/s</b> (${pos ? "siguen en el sentido del primero" : "el signo menos: siguen en el sentido del segundo"})`,
  (h, v, h2, v2, r) => `Llega a v = √(2gh) = √(2 · 9,8 · ${h}) = ${v} m/s; sale con v' = √(2 · 9,8 · ${h2}) = ${v2} m/s. El suelo no se mueve: e = ${v2} / ${v} = <b>${r}</b> (es √(h'/h))`,
  (a, b, c, d, ab, cd, r) => `Se acercaban a ${a} + ${b} = ${ab} m/s; se separan a ${c} + ${d} = ${cd} m/s. e = rapidez con que se separan / rapidez con que se acercaban = ${cd} / ${ab} = <b>${r}</b>`);
S.co_q.push(
  (L, a) => `Un péndulo de ${L} m se suelta formando ${a}° con la vertical. ¿Qué velocidad (m/s) lleva al pasar por el punto más bajo? (g = 9,8)`,
  (m, h, k) => `Una bola de ${m} kg cae desde ${h} m sobre un muelle vertical de ${k} N/m. ¿Cuánto lo comprime como máximo (cm)? (Desprecia lo que baja mientras lo comprime; g = 9,8)`);
S.co_s.push(
  (L, a, c, h, r) => `Baja una altura h = L − L·cos θ = ${L} · (1 − cos ${a}°) = ${L} · (1 − ${c}) = ${h} m. mgh = ½mv² ⇒ v = √(2gh) = √(2 · 9,8 · ${h}) = <b>${r} m/s</b>`,
  (m, h, e, k, x, r) => `La energía potencial que pierde, mgh = ${m} · 9,8 · ${h} = ${e} J, acaba en el muelle: ½kx² = ${e} ⇒ x = √(2 · ${e} / ${k}) = ${x} m = <b>${r} cm</b>`);
S.ca_q.push(
  (m, t1, t2) => `¿Cuánto calor (kJ) hace falta para pasar ${m} kg de hielo a −${t1} °C a agua a ${t2} °C? (c<sub>hielo</sub> = 2100 y c<sub>agua</sub> = 4180 J/(kg·K); L<sub>f</sub> = 334 000 J/kg)`,
  (mh, mw, tw) => `Echamos un cubito de ${mh} g de hielo a 0 °C en ${mw} g de agua a ${tw} °C. ¿A qué temperatura (°C) queda la mezcla? (c<sub>agua</sub> = 4180 J/(kg·K); L<sub>f</sub> = 334 000 J/kg)`);
S.ca_s.push(
  (m, t1, t2, q1, q2, q3, q, r) => `Tres etapas. Hielo de −${t1} °C a 0 °C: Q₁ = ${m} · 2100 · ${t1} = ${q1} J. Fusión a 0 °C: Q₂ = ${m} · 334 000 = ${q2} J. Agua de 0 °C a ${t2} °C: Q₃ = ${m} · 4180 · ${t2} = ${q3} J. Total: ${q} J ≈ <b>${r} kJ</b>`,
  (mh, mw, tw, Lq, A, B, Btw, AB, n, r) => `ΣQ = 0. El hielo se funde: ${nf(mh / 1000)} · 334 000 = ${Lq} J. Su agua se calienta de 0 °C a T<sub>e</sub>: ${nf(mh / 1000)} · 4180 · T<sub>e</sub> = ${A}·T<sub>e</sub>. El agua del vaso se enfría: ${nf(mw / 1000)} · 4180 · (T<sub>e</sub> − ${tw}) = ${B}·T<sub>e</sub> − ${Btw}. Sumando: ${Lq} + ${AB}·T<sub>e</sub> − ${Btw} = 0 ⇒ T<sub>e</sub> = ${n} / ${AB} = <b>${r} °C</b> (entre 0 y ${tw} °C)`);
S.pp_q.push(
  (W, exp) => exp ? `Un gas ideal se expande a temperatura constante y hace ${W} J de trabajo sobre el entorno. ¿Qué calor (J, con su signo) intercambia?`
    : `Un gas ideal se comprime a temperatura constante y se hacen ${W} J de trabajo sobre él. ¿Qué calor (J, con su signo) intercambia?`,
  (p1, p2, v1, v2) => `Un gas recorre el ciclo A (${v1} L; ${p1}·10⁵ Pa) → B (${v2} L; ${p1}·10⁵ Pa) → C (${v2} L; ${p2}·10⁵ Pa) → D (${v1} L; ${p2}·10⁵ Pa) → A. ¿Qué trabajo neto (J) da el gas en cada ciclo?`);
S.pp_s.push(
  (W, exp) => exp ? `Isotermo (gas ideal): ΔU = 0. El gas hace trabajo: W = −${W} J. ΔU = Q + W = 0 ⇒ Q = −W = <b>+${W} J</b> (recibe ese calor y lo da todo como trabajo)`
    : `Isotermo (gas ideal): ΔU = 0. Trabajo sobre el gas: W = +${W} J. ΔU = Q + W = 0 ⇒ Q = −W = <b>−${W} J</b> (cede ese calor)`,
  (p1, p2, v1, v2, dv, wab, wcd, w, r) => `AB, expansión: W = −${p1}·10⁵ · ${dv}·10⁻³ = ${sn(wab)} J. BC y DA, volumen constante: W = 0. CD, compresión: W = −${p2}·10⁵ · (−${dv}·10⁻³) = +${wcd} J. Trabajo neto sobre el gas: ${sn(wab)} + ${wcd} = ${sn(w)} J: el gas da <b>${r} J</b> por ciclo (el área del rectángulo, (${p1} − ${p2})·10⁵ · ${dv}·10⁻³)`);
S.mq_q.push((eta, w) => `Un motor de rendimiento ${eta} % da ${w} J de trabajo por ciclo. ¿Cuánto calor (J) cede al foco frío en cada ciclo?`);
S.mq_s.push((eta, w, qc, qf) => `η = |W|/|Q<sub>c</sub>| ⇒ |Q<sub>c</sub>| = ${w} / ${nf(eta / 100)} = ${qc} J absorbidos. Lo que entra = lo que sale: |Q<sub>f</sub>| = |Q<sub>c</sub>| − |W| = ${qc} − ${w} = <b>${qf} J</b>`);
S.pl_q.push(
  (L, P, b, Pp, s) => `Una escalera de ${L} m y ${P} N se apoya en una pared lisa formando ${b}° con el suelo${Pp ? `, y una persona de ${Pp} N está subida a ${s} m del pie (medidos a lo largo de la escalera)` : ""}. ¿Qué fuerza (N) le hace la pared?`,
  (L, Pb, a, Pc) => `Una barra horizontal de ${L} m y ${Pb} N está sujeta a la pared por una bisagra y, en el otro extremo, por un cable que forma ${a}° con la barra. Del extremo cuelga un cartel de ${Pc} N. ¿Qué tensión (N) soporta el cable?`);
S.pl_s.push(
  (L, P, b, Pp, s, sn_, c, h, Mw, r, mu) => `Momentos respecto al pie (así N<sub>s</sub> y F<sub>r</sub> desaparecen). Brazo de la pared (altura del apoyo): ${L} · sen ${b}° = ${L} · ${sn_} = ${h} m. Brazos de los pesos (distancias horizontales): ${nf(L / 2)} · cos ${b}°${Pp ? ` y ${s} · cos ${b}°` : ""}, con cos ${b}° = ${c}. N<sub>p</sub> · ${h} = ${P} · ${nf(L / 2)} · ${c}${Pp ? ` + ${Pp} · ${s} · ${c}` : ""} = ${Mw} ⇒ N<sub>p</sub> = <b>${r} N</b> (el suelo necesita μₑ ≥ ${mu})`,
  (L, Pb, a, Pc, L2, Mw, s, r) => `Momentos respecto a la bisagra (así su fuerza desaparece). Solo la componente vertical del cable, T·sen ${a}°, hace girar, con brazo ${L} m: T · ${s} · ${L} = ${Pb} · ${L2} + ${Pc} · ${L} = ${Mw} ⇒ T = <b>${r} N</b>`);
})();
