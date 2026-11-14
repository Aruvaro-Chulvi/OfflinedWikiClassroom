---
id: c.offlined.ejemplo.u1.por11
titulo: "Multiplicar por 11"
imagen: por-11.svg
pie: "Para 32 × 11 separo el 3 y el 2 y pongo en medio su suma, 5: 352."
duracion: 15
wikipedia: [Cálculo mental]
practica:
  - gen: c.offlined.ejemplo.por11     # generador propio (gen/trucos.js)
    peso: 3
  - pregunta: "Calcula de cabeza: 45 × 11."
    respuesta: 495
    explicacion: "Separo el 4 y el 5 y pongo en medio su suma, 4 + 5 = 9: 495."
  - pregunta: "¿Qué número va en medio al calcular 61 × 11?"
    opciones: ["6", "7", "1"]
    correcta: 1
    explicacion: "En medio va la suma de las dos cifras: 6 + 1 = 7. El resultado es 671."
---
Para **multiplicar por 11** un número de dos cifras basta con separar sus cifras y poner en medio **su suma**. Así, 32 × 11 = 352, porque 3 + 2 = 5.

## Por qué funciona

Multiplicar por 11 es multiplicar por 10 y sumar una vez más el número: 32 × 11 = 320 + 32. Al sumar, la cifra de las decenas de 32 cae justo encima de la de las unidades de 320, y por eso en medio aparece la suma de las dos cifras.

::: ejemplo Ejemplo: 53 × 11
::: pasos
Separo las cifras: 5 … 3
En medio, su suma: 5 + 3 = 8
Resultado: **583**
:::
:::

## Cuando la suma pasa de 9

Si las dos cifras suman 10 o más, la cifra de las decenas de la suma **se lleva** a la cifra de la izquierda. Por ejemplo, en 78 × 11 la suma es 7 + 8 = 15: pongo el 5 en medio y sumo 1 al 7, así que el resultado es **858**.

::: intenta
a) Calcula 26 × 11.
b) Calcula 69 × 11.
???
a) 2 + 6 = 8: **286**.
b) 6 + 9 = 15: pongo el 5 y llevo 1 al 6: **759**.
:::

::: resumen
- Para multiplicar por 11 un número de dos cifras, pon en medio la suma de sus cifras.
- Si la suma es 10 o más, llévate 1 a la cifra de la izquierda.
:::
