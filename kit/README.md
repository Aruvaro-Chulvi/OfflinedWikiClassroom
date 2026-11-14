# WikiAula kit

The engine and the compiler of WikiAula, the same ones that build the official courses. Use them to write,
check and try a community course (see [CONTRIBUTING.md](../CONTRIBUTING.md) ·
[CONTRIBUTING.es.md](../CONTRIBUTING.es.md)).

| File | What it does |
|---|---|
| `community.py check <folder>` | checks a course: structure, ids, licence, unsafe HTML, SVGs, the code of `gen/` |
| `build.py --curso=<folder>` | builds the course: `site_<lang>/` preview and the ZIM (`--no-zim`: preview only; `--out=dir`) |
| `preview.py <lang> <port> <out dir>` | serves the preview like kiwix-serve: http://127.0.0.1:&lt;port&gt;/ |
| `verify_wikipedia.py <lang> --online --out=<out dir>` | checks that every Wikipedia title exists and is not a redirect or a disambiguation page |
| `engine/samples.js <lang> --test <prefix>` | runs exercise generators 400 times each (`WA_EXTRA_GEN=<course>/gen` for yours) |
| `engine/` | what goes inside the ZIM: `wikiaula.js`, `wikiaula.css`, interface texts (`i18n/`), generators (`gen/`), KaTeX |
| `content/<lang>/site.yaml` | general texts of each language |

Requirements: Python 3.11+ (`pip install -r requirements-build.txt`: libzim, Markdown, PyYAML) and Node.js 18+.
The tools print their messages in Spanish, the project's working language.

This folder is a copy of the original in the Offlined project; changes to it are made there and copied here,
so please don't send pull requests that change `kit/` together with a course.

Licence: MIT ([LICENSE](LICENSE)); KaTeX (MIT) and the Patrick Hand fonts (OFL) keep their own.
