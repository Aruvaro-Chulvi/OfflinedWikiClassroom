"""WikiAula — cursos de la comunidad (WikiClassroom → community/<lang>/<carpeta>/).

Comprueba un curso enviado por pull request antes de que el autor del proyecto
lo revise a mano. No sustituye a esa revisión: la acompaña con un informe.

    python community.py check community/es/marta_lopez.ajedrez      # errores y avisos
    python community.py check … --md=informe.md                       # además, informe en Markdown

build.py --curso=CARPETA también usa estas comprobaciones (un curso con
errores no se compila).

Reglas (las mismas que explica CONTRIBUTING.md):
  · carpeta community/<lang>/<autor>.<curso> (minúsculas, cifras y _); id del curso
    «c.<autor>.<curso>»; las unidades, las lecciones y los generadores empiezan
    por ese id y un punto
  · curso.yaml con titulo, titulo_corto, grado (1–12), asignatura, autor,
    licencia (CC BY-SA 4.0, CC BY 4.0 o CC0 1.0), descripcion y unidades
  · sin HTML peligroso en el Markdown ni en el YAML (scripts, iframes,
    formularios, estilos, atributos on…, enlaces javascript:)
  · imágenes .svg/.png/.jpg/.jpeg/.webp de hasta 2 MB (SVG sin scripts ni
    recursos externos); el curso entero, hasta 40 MB
  · generadores en gen/*.js: funciones puras con WA.def("c.autor.curso.x", …);
    sin red, sin DOM, sin eval ni temporizadores (ver GEN_FORBIDDEN)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

LICENSES = {"CC BY-SA 4.0", "CC BY 4.0", "CC0 1.0"}
SEG = r"[a-z0-9_]{2,40}"
FOLDER_RX = re.compile(rf"^{SEG}\.{SEG}$")
IMG_EXT = {".svg", ".png", ".jpg", ".jpeg", ".webp"}
IMG_MAX = 2 * 1024 * 1024
COURSE_MAX = 40 * 1024 * 1024
GEN_MAX = 200 * 1024
COURSE_KEYS = {"id", "titulo", "titulo_corto", "grado", "orden", "asignatura", "autor", "github", "licencia",
               "descripcion", "presentacion", "fuentes", "unidades"}
UNIT_KEYS = {"id", "titulo", "titulo_pagina", "carpeta", "lecciones"}
LESSON_KEYS = {"id", "titulo", "imagen", "pie", "duracion", "requisitos", "wikipedia", "practica", "ampliacion"}
PRACTICE_KEYS = {"gen", "peso", "pregunta", "opciones", "correcta", "barajar", "explicacion", "respuesta", "ayuda"}
CREDIT_KEYS = {"titulo", "autor", "licencia", "pagina"}

# HTML que no puede ir en el texto de un curso (el Markdown deja pasar HTML tal cual)
HTML_FORBIDDEN = [
    (re.compile(r"<\s*/?\s*(script|iframe|frame|frameset|object|embed|applet|form|input|button|textarea|select|"
                r"link|meta|style|base|svg|math|template|audio|video|source|track|portal|noscript|dialog)\b", re.I),
     "etiqueta HTML no permitida"),
    (re.compile(r"<[^>]*\son[a-z]+\s*=", re.I), "atributo on… (JavaScript) no permitido"),
    (re.compile(r"<[^>]*\s(style|srcdoc|formaction|xlink:href)\s*=", re.I), "atributo HTML no permitido"),
    (re.compile(r"(javascript|vbscript|livescript)\s*:", re.I), "enlace javascript: no permitido"),
    (re.compile(r"data\s*:\s*(text/html|image/svg|application)", re.I), "URL data: no permitida"),
    (re.compile(r"<\s*img\b[^>]*\ssrc\s*=\s*[\"']?\s*(https?:)?//", re.I), "imagen externa (las imágenes van en img/)"),
]

# SVG: dibujos sin scripts ni nada que cargue de fuera
SVG_FORBIDDEN = [
    (re.compile(r"<\s*(script|foreignObject|iframe|object|embed|audio|video|handler|listener)\b", re.I), "etiqueta no permitida en un SVG"),
    (re.compile(r"\son[a-z]+\s*=", re.I), "atributo on… (JavaScript) en un SVG"),
    (re.compile(r"(javascript|vbscript)\s*:", re.I), "enlace javascript: en un SVG"),
    (re.compile(r"(href|src)\s*=\s*[\"']\s*(https?:)?//", re.I), "recurso externo en un SVG"),
    (re.compile(r"@import|url\(\s*[\"']?\s*(https?:)?//", re.I), "recurso externo en el estilo de un SVG"),
    (re.compile(r"<!ENTITY", re.I), "entidades XML en un SVG"),
]

# Generadores: solo cálculo. Cualquiera de estas cosas es un error (si hace falta
# de verdad, se habla en el pull request y se revisa a mano).
GEN_FORBIDDEN = [
    (r"\bfetch\b|XMLHttpRequest|WebSocket|EventSource|sendBeacon|RTCPeerConnection|importScripts|\bimport\s*\(|\brequire\s*\(",
     "red o carga de código"),
    (r"\beval\b|\bFunction\s*\(|\bconstructor\b|__proto__|\bprototype\b|\bReflect\b|\bProxy\b|\bwith\s*\(",
     "evaluación de código o acceso a prototipos"),
    (r"\bdocument\b|\bdefineProperty\b|\binnerHTML\b|\bouterHTML\b|insertAdjacent|createElement|querySelector|getElementBy",
     "acceso a la página (DOM)"),
    (r"\b(globalThis|self|top|parent|opener|frames)\b|\bwindow\s*\[|\bwindow\s*\.\s*(?!WA\b)",
     "acceso a la ventana (solo se permite window.WA)"),
    (r"\b(localStorage|sessionStorage|indexedDB|caches|cookie|location|history|navigator|postMessage|Worker|SharedWorker|ServiceWorker)\b",
     "almacenamiento, navegación o mensajes"),
    (r"\b(setTimeout|setInterval|requestAnimationFrame|queueMicrotask|Promise|async|await)\b",
     "temporizadores o código asíncrono"),
    (r"\b(atob|btoa|fromCharCode|fromCodePoint|unescape|decodeURI|decodeURIComponent)\b|\\x[0-9a-f]{2}|\\u\{?[0-9a-f]{4}",
     "texto codificado (dificulta la revisión)"),
    (r"\bWA\s*\.\s*(?!def\b|MATH\b|SVG\b|H\b|I18N\b|GEN\b)[A-Za-z_]+",
     "uso del motor fuera de WA.def, WA.MATH, WA.SVG, WA.H"),
]
GEN_FORBIDDEN = [(re.compile(rx), why) for rx, why in GEN_FORBIDDEN]
GEN_DEF_RX = re.compile(r"""\bWA\s*\.\s*def\s*\(\s*(["'`])([^"'`]+)\1""")


class Report:
    def __init__(self):
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.info: dict = {}

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)


def _strip_js_comments(src: str) -> str:
    """Quita comentarios y el contenido de las cadenas (las reglas miran el código, no los textos)."""
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if src.startswith("//", i):
            j = src.find("\n", i)
            i = n if j < 0 else j
        elif src.startswith("/*", i):
            j = src.find("*/", i + 2)
            i = n if j < 0 else j + 2
        elif c in "\"'`":
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == "\\":
                    j += 1
                elif c == "`" and src.startswith("${", j):   # ${…} de una plantilla: es código
                    k = src.find("}", j)
                    out.append(" " + src[j + 2:k if k > 0 else n] + " ")
                    j = k if k > 0 else n
                j += 1
            out.append(c + c)
            i = j + 1
        else:
            out.append(c)
            i += 1
    return "".join(out)


def check_html(text: str, where: str, rep: Report):
    for rx, why in HTML_FORBIDDEN:
        m = rx.search(text or "")
        if m:
            rep.err(f"{where}: {why} («{m.group(0)[:60]}»)")


def _walk_strings(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from _walk_strings(v)
    elif isinstance(o, list):
        for v in o:
            yield from _walk_strings(v)


def check_svg(p: Path, rep: Report, rel: str):
    t = p.read_text(encoding="utf-8", errors="replace")
    for rx, why in SVG_FORBIDDEN:
        m = rx.search(t)
        if m:
            rep.err(f"{rel}: {why} («{m.group(0)[:60]}»)")


def check_gen(p: Path, cid: str, rep: Report, rel: str) -> list[str]:
    src = p.read_text(encoding="utf-8", errors="replace")
    if p.stat().st_size > GEN_MAX:
        rep.err(f"{rel}: el generador pasa de {GEN_MAX // 1024} KB")
    code = _strip_js_comments(src)
    for ln_no, line in enumerate(code.split("\n"), 1):
        for rx, why in GEN_FORBIDDEN:
            m = rx.search(line)
            if m:
                rep.err(f"{rel}:{ln_no}: {why} («{m.group(0)}»)")
    ids = [m.group(2) for m in GEN_DEF_RX.finditer(src)]
    if not ids:
        rep.err(f"{rel}: no define ningún generador con WA.def(\"{cid}.…\", …)")
    for gid in ids:
        if not gid.startswith(cid + ".") or not re.fullmatch(r"[a-z0-9_.]+", gid):
            rep.err(f"{rel}: el generador «{gid}» debe llamarse «{cid}.<nombre>» (minúsculas, cifras, _ y .)")
    if re.search(r"\bWA\s*\.\s*def\s*\(\s*[^\"'`\s]", src):
        rep.err(f"{rel}: WA.def con un nombre que no es un texto fijo")
    return ids


def check_course(folder: Path, lang: str | None = None, engine_gens: set | None = None) -> Report:
    """Comprueba un curso de la comunidad. lang: el de la carpeta padre si no se da."""
    rep = Report()
    folder = folder.resolve()
    lang = lang or folder.parent.name
    rep.info.update(folder=folder.name, lang=lang)
    if not re.fullmatch(r"[a-z]{2,3}", lang):
        rep.err(f"la carpeta del curso debe estar en community/<idioma>/ (no en «{lang}»)")
    if not FOLDER_RX.match(folder.name):
        rep.err(f"nombre de carpeta «{folder.name}»: debe ser <autor>.<curso> (minúsculas, cifras y _; p. ej. marta_lopez.ajedrez)")
    cid = "c." + folder.name
    cy = folder / "curso.yaml"
    if not cy.exists():
        rep.err("falta curso.yaml")
        return rep
    try:
        c = yaml.safe_load(cy.read_text(encoding="utf-8")) or {}
    except yaml.YAMLError as e:
        rep.err(f"curso.yaml no se puede leer: {e}")
        return rep
    if not isinstance(c, dict):
        rep.err("curso.yaml debe ser un diccionario")
        return rep
    rep.info["course"] = c
    for k in sorted(set(c) - COURSE_KEYS):
        rep.warn(f"curso.yaml: clave desconocida «{k}» (se ignora)")
    if c.get("id") != cid:
        rep.err(f"curso.yaml: id debe ser «{cid}» (el nombre de la carpeta con «c.» delante)")
    for k in ("titulo", "titulo_corto", "asignatura", "autor", "descripcion"):
        if not str(c.get(k) or "").strip():
            rep.err(f"curso.yaml: falta «{k}»")
    if not (isinstance(c.get("grado"), int) and 1 <= c["grado"] <= 12):
        rep.err("curso.yaml: grado debe ser un número del 1 al 12 (edad aproximada: grado + 5 años)")
    if c.get("licencia") not in LICENSES:
        rep.err(f"curso.yaml: licencia debe ser una de: {', '.join(sorted(LICENSES))}")
    if len(str(c.get("descripcion") or "")) > 400:
        rep.err("curso.yaml: descripcion de más de 400 caracteres")
    if c.get("github") and not re.fullmatch(r"[A-Za-z0-9-]{1,39}", str(c["github"])):
        rep.err("curso.yaml: github debe ser tu nombre de usuario de GitHub")
    for s in _walk_strings({k: v for k, v in c.items() if k != "unidades"}):
        check_html(s, "curso.yaml", rep)

    units = c.get("unidades")
    if not isinstance(units, list) or not units:
        rep.err("curso.yaml: faltan las unidades")
        units = []
    lesson_ids: set = set()
    used_gens: set = set()
    n_lessons = n_fixed = 0
    seen_folders = set()
    for i, u in enumerate(units, 1):
        if not isinstance(u, dict):
            rep.err(f"unidad {i}: debe ser un diccionario")
            continue
        for k in sorted(set(u) - UNIT_KEYS):
            rep.warn(f"unidad {i}: clave desconocida «{k}»")
        if not str(u.get("titulo") or "").strip():
            rep.err(f"unidad {i}: falta titulo")
        for s in _walk_strings(u):
            check_html(s, f"unidad {i}", rep)
        if u.get("id") and not str(u["id"]).startswith(cid + "."):
            rep.err(f"unidad {i}: id debe empezar por «{cid}.»")
        if not u.get("carpeta"):
            rep.warn(f"unidad {i}: sin carpeta (sale como «próximamente»)")
            continue
        ud = (folder / str(u["carpeta"])).resolve()
        if folder not in ud.parents or not ud.is_dir():
            rep.err(f"unidad {i}: la carpeta «{u['carpeta']}» no existe dentro del curso")
            continue
        seen_folders.add(ud)
        um = ud / "unidad.md"
        if um.exists():
            check_html(um.read_text(encoding="utf-8", errors="replace"), str(um.relative_to(folder)), rep)
        for slug in u.get("lecciones") or []:
            f = ud / f"{slug}.md"
            rel = str(f.relative_to(folder)).replace("\\", "/")
            if not f.exists():
                rep.err(f"falta la lección {rel}")
                continue
            n_lessons += 1
            s = f.read_text(encoding="utf-8", errors="replace")
            meta, body = {}, s
            if s.startswith("---"):
                end = s.find("\n---", 3)
                if end < 0:
                    rep.err(f"{rel}: falta cerrar el bloque --- del principio")
                    continue
                try:
                    meta = yaml.safe_load(s[3:end]) or {}
                except yaml.YAMLError as e:
                    rep.err(f"{rel}: cabecera YAML no válida: {e}")
                    continue
                body = s[end + 4:]
            if not isinstance(meta, dict):
                rep.err(f"{rel}: la cabecera debe ser un diccionario")
                continue
            for k in sorted(set(meta) - LESSON_KEYS):
                rep.warn(f"{rel}: clave desconocida «{k}»")
            lid = str(meta.get("id") or "")
            if not lid.startswith(cid + ".") or not re.fullmatch(r"[a-z0-9_.\-]+", lid):
                rep.err(f"{rel}: id debe ser «{cid}.<unidad>.<lección>» (minúsculas, cifras, _, - y .)")
            elif lid in lesson_ids:
                rep.err(f"{rel}: id repetido «{lid}»")
            lesson_ids.add(lid)
            if not str(meta.get("titulo") or "").strip():
                rep.err(f"{rel}: falta titulo")
            check_html(body, rel, rep)
            for x in _walk_strings({k: v for k, v in meta.items() if k != "practica"}):
                check_html(x, rel, rep)
            prac = meta.get("practica") or []
            if not prac:
                rep.warn(f"{rel}: sin ejercicios (practica)")
            for j, q in enumerate(prac, 1):
                w = f"{rel}: ejercicio {j}"
                if not isinstance(q, dict):
                    rep.err(f"{w}: debe ser un diccionario")
                    continue
                for k in sorted(set(q) - PRACTICE_KEYS):
                    rep.warn(f"{w}: clave desconocida «{k}»")
                for x in _walk_strings(q):
                    check_html(x, w, rep)
                if "gen" in q:
                    used_gens.add(str(q["gen"]))
                    continue
                n_fixed += 1
                if not str(q.get("pregunta") or "").strip():
                    rep.err(f"{w}: falta pregunta")
                if "opciones" in q:
                    ops = q["opciones"]
                    if not isinstance(ops, list) or len(ops) < 2:
                        rep.err(f"{w}: opciones necesita al menos 2")
                    elif not (isinstance(q.get("correcta", 0), int) and 0 <= q.get("correcta", 0) < len(ops)):
                        rep.err(f"{w}: correcta debe ser la posición (0, 1, 2…) de una opción")
                    if "correcta" not in q:
                        rep.warn(f"{w}: sin «correcta»: se toma la primera opción")
                elif "respuesta" not in q:
                    rep.err(f"{w}: necesita opciones o respuesta")
                if not q.get("explicacion"):
                    rep.warn(f"{w}: sin explicacion (Encartha y el alumno la usan cuando se falla)")
    for d in sorted(p for p in folder.iterdir() if p.is_dir() and p.name not in ("img", "gen")):
        if d.resolve() not in seen_folders:
            rep.warn(f"carpeta «{d.name}» que no usa ninguna unidad")

    # Imágenes
    total = 0
    imgs, credited = [], set()
    for cf in folder.rglob("_creditos.yaml"):
        try:
            cr = yaml.safe_load(cf.read_text(encoding="utf-8")) or {}
        except yaml.YAMLError as e:
            rep.err(f"{cf.relative_to(folder)}: no se puede leer: {e}")
            continue
        for name, lst in cr.items():
            credited.add((cf.parent.resolve(), name))
            for x in (lst or []):
                if not isinstance(x, dict) or not CREDIT_KEYS <= set(x):
                    rep.err(f"{cf.relative_to(folder)}: {name}: cada crédito necesita titulo, autor, licencia y pagina")
            for s in _walk_strings(lst):
                check_html(s, str(cf.relative_to(folder)), rep)
    for p in sorted(folder.rglob("*")):
        if not p.is_file():
            continue
        rel = str(p.relative_to(folder)).replace("\\", "/")
        total += p.stat().st_size
        if p.suffix.lower() in IMG_EXT:
            if "img" not in p.relative_to(folder).parts:
                rep.err(f"{rel}: las imágenes van en una carpeta img/")
            if p.stat().st_size > IMG_MAX:
                rep.err(f"{rel}: imagen de más de 2 MB")
            if p.suffix.lower() == ".svg":
                check_svg(p, rep, rel)
            imgs.append((rel, (p.parent.resolve(), p.name) in credited))
        elif p.suffix.lower() in (".md", ".yaml", ".yml"):
            pass
        elif p.suffix.lower() == ".js" and p.parent.name == "gen" and p.parent.parent == folder:
            pass
        else:
            rep.err(f"{rel}: tipo de archivo no permitido")
    if total > COURSE_MAX:
        rep.err(f"el curso ocupa {total / 1e6:.1f} MB (máximo {COURSE_MAX // 1024 // 1024} MB)")
    for rel, ok in imgs:
        if not ok:
            rep.warn(f"{rel}: sin _creditos.yaml (se entiende que es obra tuya y va con la licencia del curso)")

    # Generadores
    gens: dict[str, str] = {}
    gdir = folder / "gen"
    gfiles = sorted(gdir.glob("*.js")) if gdir.is_dir() else []
    for g in gfiles:
        for gid in check_gen(g, cid, rep, f"gen/{g.name}"):
            if gid in gens:
                rep.err(f"generador repetido: {gid}")
            gens[gid] = g.name
    for gid in sorted(used_gens):
        if gid in gens:
            continue
        if gid.startswith("c."):
            rep.err(f"el generador «{gid}» no está en gen/")
        elif engine_gens is not None and gid not in engine_gens:
            rep.err(f"el generador «{gid}» no existe (ni en gen/ ni en el motor de WikiAula)")
    for gid in sorted(set(gens) - used_gens):
        rep.warn(f"generador «{gid}» que no usa ninguna lección")

    rep.info.update(cid=cid, lessons=n_lessons, units=len(units), fixed=n_fixed, gens=gens,
                    gen_files=[(g.name, len(g.read_text(encoding="utf-8", errors="replace").splitlines())) for g in gfiles],
                    engine_gens_used=sorted(g for g in used_gens if not g.startswith("c.")),
                    images=imgs, bytes=total)
    return rep


def report_md(rep: Report) -> str:
    """Informe para el pull request (lo escribe la comprobación automática)."""
    i, c = rep.info, rep.info.get("course") or {}
    out = [f"## {'✅' if not rep.errors else '❌'} Curso `{i.get('folder')}` ({i.get('lang')})", ""]
    if c:
        out += [f"**{c.get('titulo', '?')}** · {c.get('asignatura', '?')} · grado {c.get('grado', '?')} · "
                f"por {c.get('autor', '?')} · {c.get('licencia', '?')}", "",
                f"> {str(c.get('descripcion') or '').strip()}", ""]
    if "lessons" in i:
        out += [f"- {i['units']} unidades, {i['lessons']} lecciones, {i['fixed']} ejercicios fijos",
                f"- Generadores propios: {len(i['gens'])} en {len(i['gen_files'])} archivos "
                + ", ".join(f"`gen/{n}` ({l} líneas)" for n, l in i["gen_files"]),
                f"- Generadores del motor que usa: {', '.join(f'`{g}`' for g in i['engine_gens_used']) or 'ninguno'}",
                f"- Imágenes: {len(i['images'])} ({sum(1 for _, ok in i['images'] if ok)} con créditos) · "
                f"tamaño total {i['bytes'] / 1e6:.2f} MB", ""]
    if rep.errors:
        out += [f"### Errores ({len(rep.errors)})", ""] + [f"- {e}" for e in rep.errors] + [""]
    if rep.warnings:
        out += [f"### Avisos ({len(rep.warnings)})", ""] + [f"- {w}" for w in rep.warnings] + [""]
    return "\n".join(out)


def _engine_gens() -> set:
    gdir = Path(__file__).resolve().parent / "engine" / "gen"
    ids = set()
    for g in gdir.glob("*.js"):
        ids |= {m.group(2) for m in GEN_DEF_RX.finditer(g.read_text(encoding="utf-8"))}
        ids |= set(re.findall(r'def\("([\w.]+)"', g.read_text(encoding="utf-8")))
    return ids


if __name__ == "__main__":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
    if len(args) != 2 or args[0] != "check":
        print("Uso: python community.py check community/<lang>/<autor>.<curso> [--md=informe.md]")
        sys.exit(2)
    r = check_course(Path(args[1]), engine_gens=_engine_gens())
    md = report_md(r)
    print(md)
    if opts.get("md"):
        Path(opts["md"]).write_text(md + "\n", encoding="utf-8")
    sys.exit(1 if r.errors else 0)
