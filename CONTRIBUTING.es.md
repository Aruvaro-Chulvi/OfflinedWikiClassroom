# Comparte tu curso en WikiAula (WikiClassroom)

[English](CONTRIBUTING.md)

Cualquiera puede escribir un curso de WikiAula y compartirlo: un curso corto de aperturas de ajedrez, de
primeros auxilios, de raíces latinas, de la historia de tu comarca… Se escribe en Markdown, se compila en un
**ZIM** con el mismo motor que los cursos oficiales y, cuando el responsable del proyecto lo ha revisado,
aparece en **Offlined → WikiAula → Comunidad** para que cualquiera lo descargue.

- [Cómo se publica](#cómo-se-publica)
- [Empezar en cinco minutos](#empezar-en-cinco-minutos)
- [La carpeta del curso](#la-carpeta-del-curso)
- [Las lecciones](#las-lecciones)
- [Los ejercicios](#los-ejercicios)
- [Tus propios generadores de ejercicios](#tus-propios-generadores-de-ejercicios)
- [Michael Knowledge y tu curso](#michael-knowledge-y-tu-curso)
- [Imágenes](#imágenes)
- [Qué se acepta](#qué-se-acepta)
- [Licencias](#licencias)

## Cómo se publica

```
tu fork ──pull request──▶ comprobación automática ──▶ revisión a mano ──aceptado──▶ publicado ──▶ Offlined
           (un curso)       (errores, ZIM de prueba)    (contenido y código)          (community.json)
```

1. Abres un **pull request** que solo añade o cambia tu carpeta `community/<idioma>/<tú>.<curso>/`.
2. Una GitHub Action lo comprueba (estructura, licencia, HTML peligroso, el código de tus generadores),
   ejecuta cada generador de ejercicios 400 veces, compila un **ZIM de prueba** y deja un informe. Descarga el
   artefacto `course-preview` para probarlo.
3. El responsable lo **revisa a mano**: contenido, datos, imágenes y cada línea de código. Puede pedirte
   cambios en el propio pull request.
4. Solo cuando el pull request se **acepta** (merge), otra Action compila el ZIM definitivo con el motor
   oficial y lo añade a `community.json` en la [release `community`](../../releases/tag/community). Offlined
   solo ofrece lo que está en ese archivo: nada llega a nadie sin la aprobación del responsable.
5. Para **actualizar** tu curso, abre otro pull request: tras aceptarlo, en Offlined sale *Actualizar*. Si más
   adelante aparece un problema, el curso se puede **retirar**: Offlined deja de servirlo, también a quien ya lo
   tenía instalado.

## Empezar en cinco minutos

Necesitas **Python 3.11 o posterior** y **Node.js 18 o posterior**.

```bash
git clone https://github.com/<tú>/WikiClassroom      # tu fork
cd WikiClassroom
python -m venv .venv
.venv/bin/pip install -r kit/requirements-build.txt  # Windows: .venv\Scripts\pip …

# 1. Copia la plantilla (en inglés: templates/en/offlined.example)
cp -r templates/es/offlined.ejemplo community/es/marta_lopez.ajedrez
#    …y pon  id: c.marta_lopez.ajedrez  en curso.yaml

# 2. Compruébalo (errores y avisos)
.venv/bin/python kit/community.py check community/es/marta_lopez.ajedrez

# 3. Compílalo: carpeta de vista previa + ZIM en dist/wikiaula-community/<carpeta>/
.venv/bin/python kit/build.py --curso=community/es/marta_lopez.ajedrez

# 4. Míralo en el navegador: http://127.0.0.1:8092/
.venv/bin/python kit/preview.py es 8092 dist/wikiaula-community/marta_lopez.ajedrez
```

El ZIM también se abre en [Kiwix](https://kiwix.org), y en Offlined desde *WikiAula → Comunidad* cuando se
publica. Si copias el ZIM a mano en `Offlined Data/Wikis/wikiaula/community/`, Offlined lo abre **sin scripts** (sin
ejercicios) por precaución: solo ejecutan su código los cursos descargados de la lista publicada. Para probar
los ejercicios, usa `preview.py`.

**Nombres.** La carpeta es `<autor>.<curso>`, con minúsculas, cifras y `_` (de 2 a 40 caracteres cada parte):
`marta_lopez.ajedrez`. El id del curso es `c.` + el nombre de la carpeta, y los ids de las unidades, lecciones y
generadores empiezan por el id del curso y un punto. Idiomas con el motor traducido hoy: `es`, `en`.

## La carpeta del curso

```
community/es/marta_lopez.ajedrez/
├── curso.yaml               el curso: título, autor, licencia, unidades
├── u1-centro/               una carpeta por unidad
│   ├── unidad.md            (opcional) introducción de la unidad
│   ├── el-centro.md         un archivo Markdown por lección
│   └── desarrollo.md
├── img/                     imágenes (cualquier carpeta img/ dentro del curso)
│   ├── tablero.svg
│   └── _creditos.yaml       créditos de las imágenes que no son tuyas
└── gen/                     (opcional) tus generadores de ejercicios
    └── aperturas.js
```

`curso.yaml`:

```yaml
id: c.marta_lopez.ajedrez
titulo: Aperturas de ajedrez
titulo_corto: Aperturas             # para la ruta de navegación
grado: 6                            # 1–12 (edad aproximada: grado + 5)
asignatura: Ajedrez
autor: Marta López                  # cómo quieres firmar
github: martalopez                  # tu usuario de GitHub (opcional)
licencia: CC BY-SA 4.0              # CC BY-SA 4.0 · CC BY 4.0 · CC0 1.0
descripcion: >-                     # hasta 400 caracteres: se ve en Offlined
  Las ideas que hay detrás de las primeras jugadas…
presentacion: |                     # (opcional) presentación en la página del curso, en Markdown
  …
fuentes:                            # (opcional) fuentes, en «Acerca de este curso»
  - "Libro o web que has usado"
unidades:
  - titulo: El centro
    carpeta: u1-centro
    lecciones: [el-centro, desarrollo]   # nombres de archivo sin .md, en orden
```

## Las lecciones

Cada lección es un archivo Markdown con una cabecera YAML:

```markdown
---
id: c.marta_lopez.ajedrez.u1.centro   # único y estable: es la clave del progreso y de la tarjeta
titulo: "Dominar el centro"
imagen: tablero.svg               # (opcional) figura antes del primer apartado
pie: "Las cuatro casillas centrales."
duracion: 20                      # minutos
requisitos: [Cómo se mueven las piezas]   # títulos de otras lecciones
wikipedia: [Apertura (ajedrez)]   # títulos EXACTOS de artículos de Wikipedia («Véase también»)
ampliacion: true                  # (opcional) lección de ampliación, se puede saltar
practica:                         # ejercicios (ver abajo)
  - …
---
Primer párrafo: una definición clara. Es el texto de la tarjeta de la lección y lo que cita Michael Knowledge.

## Un apartado
Texto, listas, tablas…
```

Lo que puedes usar en el texto:

| Escribes | Sale |
|---|---|
| `## Título`, `### Título` | apartados (índice a partir de 3) |
| `[[Título de lección]]`, `[[Título#Apartado]]`, `[[Título\|texto]]` | enlace a otra lección de tu curso |
| `[[w:Título en Wikipedia\|texto]]` | enlace a Wikipedia (la de sin conexión, en Offlined) |
| `$x^2 + 1$`, `$$\int_0^1 x\,dx$$` | fórmulas (LaTeX, con KaTeX) |
| `{{f\|3\|4}}`, `{{raiz\|2}}`, `{{hueco}}` | fracción, raíz cuadrada, casilla vacía |
| `{{figura\|tablero.svg\|Pie}}` (`\|derecha` para ponerla a un lado) | figura de `img/` |
| `::: ejemplo Título` … `:::` | ejemplo resuelto (también: `importante`, `recuerda`, `curiosidad`, `error`) |
| `::: pasos` … `:::` | cálculo paso a paso, una línea cada paso |
| `::: intenta` … `???` … `:::` | *Inténtalo tú*: enunciado, `???` y la solución plegada (`a)`, `b)` para varios) |
| `::: resumen` … `:::` | *Lo importante*, al final de la lección |

No se admite HTML salvo etiquetas sencillas como `<b>`, `<sup>`, `<sub>`, `<br>` (nada de scripts, estilos,
iframes, formularios ni atributos `on…`).

## Los ejercicios

`practica` mezcla preguntas fijas y generadores; cada sesión de práctica elige entre ellos al azar.

```yaml
practica:
  - pregunta: "¿Cuál es una casilla central?"         # elegir opción
    opciones: ["e4", "a1", "h8"]
    correcta: 0                                       # posición de la buena (0, 1, 2…)
    explicacion: "El centro son d4, e4, d5 y e5."     # solución oficial
  - pregunta: "¿Cuántas casillas centrales hay?"      # número entero
    respuesta: 4
    explicacion: "d4, e4, d5 y e5."
  - pregunta: "¿Cómo se llama la apertura 1.e4 e5 2.Cf3 Cc6 3.Ab5?"
    respuesta: [Apertura española, Ruy López, española]   # texto: todas las respuestas que aceptas
    ayuda: "Escribe su nombre"                        # pista bajo la casilla
    explicacion: "Es la apertura española, o Ruy López."
  - gen: c.marta_lopez.ajedrez.casillas               # tu generador (o uno del motor)
    peso: 2                                           # sale el doble (por defecto 1)
```

`respuesta` puede ser un entero (`4`), un decimal (`2.5`), una fracción (`"3/4"`), un texto o una lista de
textos. Las opciones se barajan; `barajar: false` solo mantiene el orden en preguntas de tipo Sí/No.

## Tus propios generadores de ejercicios

Un generador crea un ejercicio nuevo cada vez. Van en `gen/*.js`:

```js
"use strict";
(function () {
const WA = window.WA;
WA.def("c.marta_lopez.ajedrez.casillas", (R, S, H) => {
  const n = R.int(2, 9);
  return { q: `¿Cuántas casillas tiene un tablero de ${n} × ${n}?`, kind: "int", ans: n * n,
           sol: `${n} × ${n} = <b>${n * n}</b>.` };
});
})();
```

- `R` es el azar: `R.int(a, b)`, `R.pick(lista)`, `R.shuffle(lista)`, `R.r()`. Usa solo `R`, nunca
  `Math.random()`, para que los ejemplos resueltos salgan iguales en cada compilación.
- `H` escribe los números como en el idioma: `H.n(12500)`, `H.dec(2.5)`, `H.frac(3, 4)`, `H.pow(2, 3)`.
- Devuelve `{ q, kind, ans, sol }`: `kind` es `int`, `num` (con `tol`), `frac` (`ans: [3, 4]`), `text` (`ans`:
  texto o lista), `choice` (`opts`, `correct`), `multi` (`opts`, `correct: [..]`), `set`, `expr` o `fields`
  (`fields: [{label, ans}]`). `sol` es la solución oficial.
- También puedes usar los generadores del motor (`WA.MATH`, `WA.SVG` y cualquier `gen:` de los cursos oficiales).

**Reglas (se comprueban solas y se revisan a mano):** los generadores solo calculan. Nada de red, de acceso a
la página (`document`, `window` salvo `window.WA`), de `eval`/`Function`, de temporizadores o `async`, de
almacenamiento ni de textos codificados. Escribe código sencillo y legible: si quien revisa no entiende una
línea, el curso no se publica. Pruébalos con:

```bash
WA_EXTRA_GEN=community/es/marta_lopez.ajedrez/gen node kit/engine/samples.js es --test c.marta_lopez.
```

## Michael Knowledge y tu curso

**No hay que programar nada.** Todo curso compilado con el kit está conectado con **Michael Knowledge**, el
profesor de IA de Offlined, igual que los oficiales:

- **Respuestas escritas.** Cuando un alumno escribe una respuesta que no coincide letra a letra con la tuya,
  Michael Knowledge decide si dice lo mismo (`2,5` = `5/2`, un sinónimo, una falta pequeña…) y **su veredicto cuenta**.
  Michael Knowledge recibe la pregunta, tu respuesta oficial, las otras respuestas aceptadas y tu solución
  (`explicacion` o el `sol` del generador), y nunca contradice la respuesta oficial.
- **Fallos.** Cuando un alumno falla, Michael Knowledge le explica por qué con tu solución.
- **«Explícamelo con Michael Knowledge»** (en la ficha de cada lección) explica la lección con otras palabras usando **solo su texto**.
- **«Seguir hablando con Michael Knowledge»** abre una conversación en la carpeta *WikiAula* del chat, con el ejercicio.
- Las lecciones son tarjetas de **Mi WikiÁlbum** y el progreso se guarda en el perfil de cada usuario.

Para que Michael Knowledge enseñe bien tu curso:

1. Escribe una `explicacion` en **cada** ejercicio fijo y un `sol` en cada generador: es de donde Michael Knowledge
   explica.
2. En `respuesta`, pon **todas** las respuestas que aceptas (`[Apertura española, Ruy López]`), y usa `ayuda`
   cuando importe el formato («en cm», «en forma de fracción»).
3. Empieza cada lección con un **primer párrafo** claro: es el texto de la tarjeta y lo que cita Michael Knowledge.
4. Michael Knowledge solo lee texto: si una figura es imprescindible, descríbela en el pie o en el texto.
5. Si el ejercicio pide una forma concreta (fracción simplificada, unidades, decimales), dilo en el enunciado:
   así Michael Knowledge rechaza las respuestas escritas de otra forma.

El alumno puede apagar la IA en Offlined y el curso sigue funcionando (las respuestas se comprueban letra a
letra). En Kiwix, el progreso se guarda en el navegador y no hay Michael Knowledge.

## Imágenes

SVG, PNG, JPG o WebP, de hasta 2 MB cada una (el curso entero, hasta 40 MB), dentro de una carpeta `img/`. Los
SVG tienen que ser dibujos sin más: sin scripts ni imágenes o letras de fuera. Las imágenes que no son tuyas
llevan sus créditos en `_creditos.yaml` (en la misma carpeta), y su licencia tiene que permitir publicarlas con
la de tu curso:

```yaml
tablero.jpg:
  - titulo: "File:Chess board.jpg"
    autor: "Nombre del autor"
    licencia: "CC BY-SA 4.0"
    pagina: "https://commons.wikimedia.org/wiki/File:Chess_board.jpg"
```

## Qué se acepta

Se aceptan cursos rigurosos y útiles para estudiantes, escritos para el grado del curso, con ejercicios y con
un tono neutral y respetuoso.

No se aceptan: contenido falso o engañoso, bromas a costa de personas o grupos, odio, violencia o contenido
adulto, publicidad o spam, propaganda política o religiosa, datos personales, contenido copiado sin permiso,
enlaces a webs de rastreo o de descargas, ni código ofuscado o sin explicar. Lo médico, legal o de seguridad
necesita fuentes fiables en `fuentes`. Decide el responsable del proyecto; un curso publicado se puede retirar
si después aparece un problema ([avisar de uno](../../issues/new?template=community-report.yml)).

## Licencias

- Tus textos e imágenes: la licencia que elijas en `curso.yaml` (CC BY-SA 4.0, CC BY 4.0 o CC0 1.0). Tienen
  que permitir el uso comercial, porque Offlined y otras aplicaciones distribuyen los cursos.
- Tu código de `gen/`: MIT, como el kit.
- El kit (`kit/`): MIT ([kit/LICENSE](kit/LICENSE)); KaTeX (MIT) y Patrick Hand (OFL) conservan las suyas.
- Al abrir un pull request confirmas que tienes derecho a publicar todo lo que contiene con esas licencias.
