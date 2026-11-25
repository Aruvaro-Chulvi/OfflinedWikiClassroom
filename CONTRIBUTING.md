# Share your course on WikiClassroom

[Español](CONTRIBUTING.es.md)

Anyone can write a WikiAula course and share it: a short course on chess openings, first aid, Latin roots,
your region's history… It is written in Markdown, built into a **ZIM** with the same engine as the official
courses, and, once the maintainer has reviewed it, it appears in **Offlined → WikiAula → Community** for
everyone to download.

- [How publishing works](#how-publishing-works)
- [Quick start](#quick-start)
- [The course folder](#the-course-folder)
- [Lessons](#lessons)
- [Exercises](#exercises)
- [Your own exercise generators](#your-own-exercise-generators)
- [Michael Knowledge and your course](#michael-knowledge-and-your-course)
- [Images](#images)
- [What gets accepted](#what-gets-accepted)
- [Licences](#licences)

## How publishing works

```
your fork ──pull request──▶ automatic check ──▶ review by the maintainer ──merge──▶ published ──▶ Offlined
              (one course)     (errors, preview ZIM)    (content and code, by hand)     (community.json)
```

1. You open a **pull request** that only adds or changes your folder `community/<lang>/<you>.<course>/`.
2. A GitHub Action checks it (structure, licence, unsafe HTML, the code of your generators), runs every
   exercise generator 400 times, builds a **preview ZIM** and posts a report on the run. Download the
   `course-preview` artifact to try it.
3. The maintainer **reviews it by hand**: content, facts, images and every line of code. They may ask for
   changes in the pull request.
4. Only when the pull request is **merged** does another Action build the final ZIM with the official engine
   and add it to `community.json` in the [`community` release](../../releases/tag/community). Offlined only
   offers what is in that file, so nothing reaches users without the maintainer's approval.
5. To **update** your course, open a new pull request: users see *Update* in Offlined after it is merged. If a
   problem shows up later, the course can be **withdrawn**: Offlined stops serving it, also to people who had
   installed it.

## Quick start

You need **Python 3.11+** and **Node.js 18+**.

```bash
git clone https://github.com/<you>/WikiClassroom      # your fork
cd WikiClassroom
python -m venv .venv
.venv/bin/pip install -r kit/requirements-build.txt  # Windows: .venv\Scripts\pip …

# 1. Copy the template (Spanish: templates/es/offlined.ejemplo)
cp -r templates/en/offlined.example community/en/jane_doe.chess_openings
#    …and set  id: c.jane_doe.chess_openings  in curso.yaml

# 2. Check it (errors and warnings)
.venv/bin/python kit/community.py check community/en/jane_doe.chess_openings

# 3. Build it: preview folder + ZIM in dist/wikiaula-community/<folder>/
.venv/bin/python kit/build.py --curso=community/en/jane_doe.chess_openings

# 4. Look at it in your browser: http://127.0.0.1:8092/
.venv/bin/python kit/preview.py en 8092 dist/wikiaula-community/jane_doe.chess_openings
```

The ZIM also opens in [Kiwix](https://kiwix.org), and in Offlined with *WikiAula → Community* once published.
If you copy the ZIM by hand into `Offlined Data/Wikis/wikiaula/community/`, Offlined opens it **without
scripts** (no exercises) as a precaution: only courses downloaded from the published list run their code. Use
`preview.py` to try the exercises.

**Names.** The folder is `<author>.<course>`, with lowercase letters, digits and `_` (2–40 characters each):
`jane_doe.chess_openings`. The course id is `c.` + the folder name, and every unit, lesson and generator id
starts with the course id and a dot. Languages with an engine translation today: `es`, `en`. The tools
print their messages in Spanish, the project's working language.

## The course folder

```
community/en/jane_doe.chess_openings/
├── curso.yaml               the course: title, author, licence, units
├── u1-basics/               one folder per unit
│   ├── unidad.md            (optional) introduction of the unit
│   ├── centre.md            one Markdown file per lesson
│   └── development.md
├── img/                     images (any img/ folder inside the course)
│   ├── board.svg
│   └── _creditos.yaml       credits of the images that are not yours
└── gen/                     (optional) your own exercise generators
    └── openings.js
```

`curso.yaml` (the keys are in Spanish, as in the official courses):

```yaml
id: c.jane_doe.chess_openings
titulo: Chess openings              # title
titulo_corto: Openings              # short title (breadcrumbs)
grado: 6                            # 1–12 (age ≈ grade + 5)
asignatura: Chess                   # subject
autor: Jane Doe                     # how you want to be credited
github: janedoe                     # your GitHub user (optional)
licencia: CC BY-SA 4.0              # CC BY-SA 4.0 · CC BY 4.0 · CC0 1.0
descripcion: >-                     # up to 400 characters: shown in Offlined
  The ideas behind the first moves…
presentacion: |                     # (optional) intro on the course page, Markdown
  …
fuentes:                            # (optional) sources, shown on «About this course»
  - "Book or website you used"
unidades:
  - titulo: The basics
    carpeta: u1-basics
    lecciones: [centre, development]   # file names without .md, in order
```

## Lessons

Each lesson is a Markdown file with a YAML header:

```markdown
---
id: c.jane_doe.chess_openings.u1.centre   # unique and stable: it keys the progress and the card
titulo: "Control the centre"
imagen: board.svg                 # (optional) figure before the first section
pie: "The four central squares."  # its caption
duracion: 20                      # minutes
requisitos: [How the pieces move] # titles of other lessons
wikipedia: [Chess opening]        # EXACT titles of Wikipedia articles («See also»)
ampliacion: true                  # (optional) enrichment lesson, can be skipped
practica:                         # exercises (see below)
  - …
---
First paragraph: a clear definition. It becomes the text of the lesson's card and what Michael Knowledge quotes.

## A section
Text, lists, tables…
```

What you can use in the text:

| Write | You get |
|---|---|
| `## Title`, `### Title` | sections (contents box from 3 sections) |
| `[[Lesson title]]`, `[[Lesson title#Section]]`, `[[Lesson title\|text]]` | link to another lesson of your course |
| `[[w:Wikipedia title\|text]]` | link to Wikipedia (the offline one in Offlined) |
| `$x^2 + 1$`, `$$\int_0^1 x\,dx$$` | formulas (LaTeX, rendered with KaTeX) |
| `{{f\|3\|4}}`, `{{raiz\|2}}`, `{{hueco}}` | fraction, square root, blank box |
| `{{figura\|board.svg\|Caption}}` (`\|derecha` to float it) | figure from `img/` |
| `::: ejemplo Title` … `:::` | worked example (also: `importante`, `recuerda`, `curiosidad`, `error`) |
| `::: pasos` … `:::` | step-by-step calculation, one line each |
| `::: intenta` … `???` … `:::` | *Try it yourself*: statement, `???`, folded solution (`a)`, `b)` for several) |
| `::: resumen` … `:::` | *Key ideas* at the end of the lesson |

HTML is not allowed beyond simple tags such as `<b>`, `<sup>`, `<sub>`, `<br>` (no scripts, styles, iframes,
forms or `on…` attributes).

## Exercises

`practica` mixes fixed questions and generators; each practice session picks from them at random.

```yaml
practica:
  - pregunta: "Which square is a central square?"      # multiple choice
    opciones: ["e4", "a1", "h8"]
    correcta: 0                                        # position of the right option (0, 1, 2…)
    explicacion: "The centre is d4, e4, d5 and e5."    # official solution
  - pregunta: "How many central squares are there?"    # whole number
    respuesta: 4
    explicacion: "d4, e4, d5 and e5."
  - pregunta: "Name the opening 1.e4 e5 2.Nf3 Nc6 3.Bb5."
    respuesta: [Ruy Lopez, Spanish opening, Spanish game]   # text: every accepted answer
    ayuda: "Write its name"                            # hint under the box
    explicacion: "It is the Ruy Lopez, also called the Spanish opening."
  - gen: c.jane_doe.chess_openings.squares             # your own generator (or one of the engine)
    peso: 2                                            # appears twice as often (default 1)
```

`respuesta` can be a whole number (`4`), a decimal (`2.5`), a fraction (`"3/4"`), a text or a list of texts.
Options are shuffled; `barajar: false` keeps the order only for Yes/No-type questions.

## Your own exercise generators

A generator makes a new exercise every time. Put them in `gen/*.js`:

```js
"use strict";
(function () {
const WA = window.WA;
WA.def("c.jane_doe.chess_openings.squares", (R, S, H) => {
  const n = R.int(2, 9);
  return { q: `How many squares does a ${n} × ${n} board have?`, kind: "int", ans: n * n,
           sol: `${n} × ${n} = <b>${n * n}</b>.` };
});
})();
```

- `R` is the random generator: `R.int(a, b)`, `R.pick(list)`, `R.shuffle(list)`, `R.r()`. Use only `R`, never
  `Math.random()`, so that worked examples are the same in every build.
- `H` formats numbers for the language: `H.n(12500)`, `H.dec(2.5)`, `H.frac(3, 4)`, `H.pow(2, 3)`.
- It returns `{ q, kind, ans, sol }`: `kind` is `int`, `num` (with `tol`), `frac` (`ans: [3, 4]`), `text`
  (`ans`: text or list), `choice` (`opts`, `correct`), `multi` (`opts`, `correct: [..]`), `set`, `expr` or
  `fields` (`fields: [{label, ans}]`). `sol` is the official solution.
- You can also use the engine's generators (`WA.MATH`, `WA.SVG` and every `gen:` of the official courses).

**Rules (checked automatically and reviewed by hand):** generators only compute. No network, no access to the
page (`document`, `window` other than `window.WA`), no `eval`/`Function`, no timers or `async`, no storage, no
encoded strings. Write plain, readable code: if the reviewer cannot understand a line, the course is not
published. Test them with:

```bash
WA_EXTRA_GEN=community/en/jane_doe.chess_openings/gen node kit/engine/samples.js en --test c.jane_doe.
```

## Michael Knowledge and your course

**There is nothing to program.** Every course built with the kit is connected to **Michael Knowledge**, the
AI teacher of Offlined, in the same way as the official ones:

- **Typed answers.** When a student types an answer that does not match yours letter by letter, Michael Knowledge
  decides whether it means the same (`2,5` = `5/2`, a synonym, a small spelling mistake…) and **its verdict
  counts**. Michael Knowledge receives the question, your official answer, the other accepted answers and your
  solution (`explicacion` or the generator's `sol`), and it is told never to contradict the official answer.
- **Mistakes.** When a student gets an exercise wrong, Michael Knowledge explains why, using your solution.
- **«Explain it with Michael Knowledge»** (in each lesson's infobox) explains the lesson in other words using **only the lesson's text**.
- **«Keep talking with Michael Knowledge»** opens a conversation in the *WikiAula* folder of the chat, with the exercise.
- Lessons become cards in **My WikiAlbum**, and progress is saved in each user's profile.

To make Michael Knowledge a good teacher of your course:

1. Write an `explicacion` for **every** fixed exercise and a `sol` in every generator: it is what Michael Knowledge
   explains from.
2. In `respuesta`, list **every** answer you accept (`[Ruy Lopez, Spanish opening]`), and use `ayuda` when the
   format matters ("in cm", "as a fraction").
3. Start each lesson with a clear **first paragraph**: it is the card text and what Michael Knowledge quotes.
4. Michael Knowledge only reads text: if a figure is essential, describe it in the caption or the text.
5. If the exercise asks for a particular form (simplified fraction, units, decimals), say so in the question:
   Michael Knowledge will then reject answers in another form.

Students can turn the AI off in Offlined; the course still works (answers are then checked letter by letter).
In Kiwix, progress is kept in the browser and Michael Knowledge is not available.

## Images

SVG, PNG, JPG or WebP, up to 2 MB each (the whole course up to 40 MB), inside an `img/` folder. SVGs must be
plain drawings: no scripts, no external images or fonts. Images that are not yours need their credits in
`_creditos.yaml` (same folder), and their licence must allow publishing them under your course's licence:

```yaml
board.jpg:
  - titulo: "File:Chess board.jpg"
    autor: "Author's name"
    licencia: "CC BY-SA 4.0"
    pagina: "https://commons.wikimedia.org/wiki/File:Chess_board.jpg"
```

## What gets accepted

Accepted: accurate, useful courses for students, written for the course's grade, with exercises, in a
neutral and respectful tone.

Not accepted: false or misleading content, jokes at the expense of people or groups, hate, violence or adult
content, advertising or spam, political or religious propaganda, personal data, content copied without
permission, links to tracking or download sites, obfuscated or unexplained code. Medical, legal or safety
content needs reliable sources in `fuentes`. The maintainer decides; a published course can be withdrawn if a
problem appears later ([report one](../../issues/new?template=community-report.yml)).

## Licences

- Your texts and images: the licence you choose in `curso.yaml` (CC BY-SA 4.0, CC BY 4.0 or CC0 1.0). They
  must allow commercial use, because Offlined and other apps distribute the courses.
- Your code in `gen/`: MIT, like the kit.
- The kit (`kit/`): MIT ([kit/LICENSE](kit/LICENSE)); KaTeX (MIT) and Patrick Hand (OFL) keep their licences.
- By opening a pull request you confirm that you have the right to publish everything in it under those
  licences.
