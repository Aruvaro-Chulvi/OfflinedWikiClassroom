"""WikiAula — compila el contenido (Markdown + YAML) en un ZIM.

Uso (con el entorno de compilación, ver README.md):
    wikiaula/.venv/Scripts/python wikiaula/build.py es            # ZIM + carpeta de vista previa
    wikiaula/.venv/Scripts/python wikiaula/build.py es --no-zim   # solo la carpeta (más rápido)
    … --only=grado-5,grado-6     solo esos cursos (carpetas); los demás no se leen
    … --out=dist/wikiaula-g5     otra carpeta de salida (para trabajar varios a la vez)
    … --wikis=CARPETA            dónde buscar wikipedia_<lang>_*.zim (por defecto,
                                 Offlined Data/Wikis/content del proyecto)
    … --content=CARPETA          otra carpeta de contenido (con <lang>/site.yaml), p. ej. para pruebas
    … --instalar                copia el ZIM a Offlined Data/Wikis/wikiaula (lo que
                                 abre Offlined), quita las versiones viejas del mismo
                                 idioma y, si el Kiwix de WikiAula lo tiene abierto, lo
                                 para (Offlined lo vuelve a arrancar al abrir la pestaña)
    … --curso=CARPETA            un curso de la comunidad (WikiClassroom:
                                 community/<lang>/<autor>.<curso>): se comprueba con
                                 community.py y sale en su propio ZIM,
                                 wikiaula-community_<lang>_<autor>.<curso>_<AAAA-MM-DD>.zim
                                 (salida por defecto: dist/wikiaula-community/<carpeta>;
                                 con --instalar va a Offlined Data/Wikis/wikiaula/community)

Enlaces a Wikipedia: cada título se busca en la Wikipedia sin conexión del mismo
idioma. Si es una redirección se enlaza al artículo de destino; si no existe en
esa Wikipedia, el enlace se quita (queda el texto) y se avisa al final.

Salida en dist/wikiaula/:
    site_<lang>/                 las mismas páginas que van en el ZIM (para preview.py)
    wikiaula_<lang>_all_<AAAA-MM>.zim

Las páginas imitan la estructura del HTML de Wikipedia que generan los ZIM
de Kiwix (mwoffliner): #content, h1.firstHeading, #mw-content-text >
.mw-parser-output, table.infobox, .toc, .navbox… Así Offlined (Mi WikiÁlbum,
Michael Knowledge, el visor) y cualquier lector de Kiwix las entienden igual que un
artículo de Wikipedia. Todas las rutas son planas (sin carpetas), como en
Wikipedia: "Portada", "Potencias_de_números_naturales"…

Formato de las lecciones: ver content/README.md.
"""
from __future__ import annotations

import datetime as _dt
import html
import io
import json
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.parse
from pathlib import Path

import markdown
import yaml

from capsafe import caps_safe
from mathtex import Math, to_tex, KATEX_DIR

ROOT = Path(__file__).resolve().parent
ENGINE = ROOT / "engine"
CONTENT = ROOT / "content"
DIST = ROOT.parent / "dist" / "wikiaula"

ISO3 = {"es": "spa", "en": "eng", "fr": "fra", "pt": "por", "it": "ita", "de": "deu", "zh": "zho", "hi": "hin", "ar": "ara", "ru": "rus"}


def die(msg: str):
    print(f"ERROR: {msg}")
    sys.exit(1)


# ── Utilidades ──────────────────────────────────────────────────────────
def esc(s) -> str:
    return html.escape(str(s), quote=True)


def wiki_path(title: str) -> str:
    """Ruta de un artículo de Wikipedia a partir de su título (espacios → _)."""
    return re.sub(r"\s+", "_", title.strip())


def path_of(title: str) -> str:
    """Ruta de una página propia: como en Wikipedia, sin los caracteres que Windows no
    admite en nombres de archivo («Calor: conductores…» → Calor_conductores…; «TCP/IP» → TCPIP)."""
    return re.sub(r'[:?*"<>|/\\]', "", wiki_path(title))


def href(path: str) -> str:
    return "./" + urllib.parse.quote(path, safe="/()_,-.~!*'")


def anchor(text: str) -> str:
    t = re.sub(r"<[^>]+>", "", text)
    t = html.unescape(t).strip()
    return re.sub(r"\s+", "_", t)


def svg_size(p: Path) -> tuple[int, int]:
    s = p.read_text(encoding="utf-8")[:2000]
    root = re.search(r"<svg\b[^>]*>", s)
    if root:   # tamaño de presentación (puede ser mayor que el viewBox para que la letra se lea)
        mw = re.search(r'\swidth="([\d.]+)"', root.group(0))
        mh = re.search(r'\sheight="([\d.]+)"', root.group(0))
        if mw and mh:
            return int(float(mw.group(1))), int(float(mh.group(1)))
    m = re.search(r'viewBox="\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)', s)
    if m:
        return int(float(m.group(1))), int(float(m.group(2)))
    return 300, 200


def read_md(p: Path) -> tuple[dict, str]:
    s = p.read_text(encoding="utf-8")
    if s.startswith("---"):
        end = s.find("\n---", 3)
        if end < 0:
            die(f"{p}: falta cerrar el bloque --- del principio")
        meta = yaml.safe_load(s[3:end]) or {}
        body = s[end + 4:].lstrip("\n")
        return meta, body
    return {}, s


# ── Wikipedia sin conexión del idioma (para comprobar los enlaces) ──────
WIKIS = ROOT.parent / "Offlined Data" / "Wikis" / "content"


class WikiIndex:
    """Busca títulos en el ZIM de Wikipedia del idioma (el que tenga más
    artículos de la carpeta). Sin ZIM, no comprueba nada (y lo avisa)."""

    def __init__(self, lang: str, folder: Path):
        self.lang, self.archive, self.file = lang, None, None
        self.cache: dict[str, str | None] = {}
        self.dropped: dict[str, list[str]] = {}
        files = sorted(folder.glob(f"wikipedia_{lang}_*.zim")) if folder.is_dir() else []
        if not files:
            return
        try:
            from libzim.reader import Archive
        except ImportError:
            return
        best = max(files, key=lambda f: (Archive(str(f)).article_count, f.name))
        self.archive, self.file = Archive(str(best)), best.name

    def canonical(self, title: str):
        """Título del artículo al que lleva «title», o None si no está."""
        if self.archive is None:
            return title
        if title in self.cache:
            return self.cache[title]
        res = None
        path = title.replace(" ", "_")
        for cand in (path, path[:1].upper() + path[1:]):
            try:
                e = self.archive.get_entry_by_path(cand)
            except KeyError:
                continue
            for _ in range(5):
                if not e.is_redirect:
                    break
                e = e.get_redirect_entry()
            if not e.is_redirect:
                res = e.title or e.path.replace("_", " ")
                break
        self.cache[title] = res
        return res

    def drop(self, title: str, ctx: str):
        self.dropped.setdefault(title, []).append(ctx)


# ── Markdown → HTML "de wiki" ───────────────────────────────────────────
class Renderer:
    """Convierte el Markdown de una página. Conoce todos los títulos del ZIM
    para resolver [[enlaces internos]] y avisa de los que no existen."""

    def __init__(self, site: dict, titles: dict, images: dict):
        self.site = site
        self.titles = titles          # título → [(curso o None, ruta)]
        self.images = images          # {"": comunes, id del curso: …}: nombre → (ruta en el ZIM, ancho, alto, archivo)
        self.course = None            # curso de la página que se está generando
        self.missing: list[str] = []
        self.wp_used: set[str] = set()
        self.wp_lang = site["lang"]
        self.wiki = WikiIndex(site["lang"], WIKIS)
        self.math = Math()            # fórmulas: se convierten con KaTeX al final
        self.credits: dict = {}       # ruta de la imagen → créditos de las fotos de Commons
        # Pie ARRIBA de la figura, como título en un recuadro (se lee antes de mirar el dibujo):
        # lecciones de site.yaml → pies_en_figura (lista de ids, o «todas»)
        pf = site.get("pies_en_figura") or []
        self.cap_top_all = pf == "todas" or pf == ["todas"]
        self.cap_top = set(pf) if isinstance(pf, list) else set()
        self.lesson_title = ""        # título de la lección que se está generando (concepto de sus figuras)
        self.generic_heads = {x.lower() for x in (site.get("encabezados_genericos") or GENERIC_HEADS)}

    def img(self, name: str):
        """Imagen del curso actual o, si no, de las comunes."""
        return (self.images.get(self.course) or {}).get(name) or self.images[""].get(name)

    def fig_concepts(self, s: str) -> dict:
        """Concepto de cada {{figura}} del texto (posición → texto), para «Figura N. Concepto»:
        el apartado (## …) en el que está; antes del primer apartado, el tema de la lección; un
        apartado genérico («Definición», «El método»…) se completa con él («Logaritmos: definición»).
        Si varias figuras comparten apartado, cada una se distingue por el ejemplo que la acompaña
        («Trazado de rayos: la lupa»): el primero que la sigue o, si no, el que la precede."""
        def clean(t):
            t = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", r"\1", t)
            return t.replace("**", "").replace("*", "").strip()

        heads = [(h.start(), clean(h.group(1))) for h in re.finditer(r"^##\s+(.+?)\s*$", s, flags=re.M)]
        ex_rx = self.site.get("prefijo_ejemplo") or EXAMPLE_PREFIX
        exs = [(e.start(), clean(re.sub(ex_rx, "", e.group(1), flags=re.I)))
               for e in re.finditer(r"^:::\s*ejemplo\s+(.+?)\s*$", s, flags=re.M)]
        figs = [f.start() for f in re.finditer(r"\{\{([^{}]+)\}\}", s)
                if f.group(1).split("|")[0].strip().lower() == "figura"]
        title = self.lesson_title
        sec = {}
        for p in figs:
            h = next(((hp, t) for hp, t in reversed(heads) if hp < p), (0, ""))
            sec[p] = h
        out = {}
        for p in figs:
            hp, t = sec[p]
            if not t:
                c = title
            elif t.lower() in self.generic_heads and title:
                c = f"{title.split(':')[0]}: {t[0].lower()}{t[1:]}"
            else:
                c = t
            same = [q for q in figs if sec[q] == sec[p]]
            if len(same) > 1 and t:
                i = same.index(p)
                end = min([hq for hq, _ in heads if hq > p] + [len(s)])
                nxt = same[i + 1] if i + 1 < len(same) else end
                prv = same[i - 1] if i else hp
                ex = (next((e for ep, e in exs if p < ep < min(nxt, end) and e), None)
                      or next((e for ep, e in reversed(exs) if prv < ep < p and e), None))
                if ex:
                    c = f"{t}: {ex[0].lower() + ex[1:] if ex[1:2].islower() else ex}"
            out[p] = c
        return out

    @staticmethod
    def is_paper(f: Path) -> bool:
        """¿Dibujo de acuarela de diagramas/base.py (fondo de papel #fbf8ef a sangre y grano)?"""
        if f.suffix.lower() != ".svg":
            return False
        t = f.read_text(encoding="utf-8", errors="ignore")
        return bool(re.search(r'<rect width="[\d.]+" height="[\d.]+" fill="#fbf8ef"/>', t)) and 'filter="url(#grain)"' in t

    @staticmethod
    def top_wash(f: Path):
        """Aguada que llega al borde de arriba del dibujo (un cielo, una orilla…), o None.

        La franja del pie de arriba se pinta con esa misma aguada para que el dibujo siga por detrás
        del recuadro y quede enmarcado entero por el contorno a mano alzada del filtro «wg» (el del
        propio dibujo, diagramas/base.py). Devuelve las variables CSS de la franja (wikiaula.css):
          --sky       color de reserva;
          --sky-body  la aguada con sus bordes laterales, anclada ABAJO: sus coordenadas siguen las
                      del dibujo (y = 0 es el borde de arriba del dibujo), así que el ruido del filtro,
                      las manchas y el contorno de los lados continúan sin salto en la unión;
          --sky-top   anclada ARRIBA: el papel por encima de un borde irregular y el contorno de ese
                      borde, que cierra el marco por encima del recuadro sea cual sea la altura del pie.
        Las dos capas miden lo mismo que el dibujo (ancho 100 %), así que escalan con la lámina."""
        t = f.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r'<path d="M0,(?:0|-\d+) H([\d.]+) V[^"]*" fill="#([0-9a-fA-F]{6})" opacity="([\d.]+)" filter="url\(#wg\)"/>', t)
        wg = re.search(r'<filter id="wg".*?</filter>', t, re.S)
        grain = re.search(r'<filter id="grain".*?</filter>', t, re.S)
        if not (m and wg and grain):
            return None
        w, col, op = float(m.group(1)), m.group(2), m.group(3)
        r, g, b = (int(col[i:i + 2], 16) for i in (0, 2, 4))
        wg, grain = wg.group(0), grain.group(0)
        merge = re.compile(r"<feMerge>.*?</feMerge>", re.S)
        # el mismo filtro, pero dando solo la forma desplazada (para la máscara) o solo el contorno
        wd = merge.sub('<feMerge><feMergeNode in="d"/></feMerge>', wg.replace('id="wg"', 'id="wd"'))
        wr = merge.sub('<feMerge><feMergeNode in="edge"/></feMerge>', wg.replace('id="wg"', 'id="wr"'))
        W, K, T = f"{w:g}", 600, 40          # K: alto de la capa de abajo; T: de la de arriba (unidades del dibujo)
        paper, svg = "#fbf8ef", 'xmlns="http://www.w3.org/2000/svg"'
        body = (f'<svg {svg} viewBox="0 -{K} {W} {K}" width="{W}" height="{K}"><defs>{wg}{grain}</defs>'
                f'<rect y="-{K}" width="{W}" height="{K}" fill="{paper}"/>'
                f'<path d="M0,-{K + 40} H{W} V14 H0 Z" fill="#{col}" opacity="{op}" filter="url(#wg)"/>'
                f'<rect y="-{K}" width="{W}" height="{K}" fill="#000" filter="url(#grain)"/></svg>')
        # borde de arriba algo ondulado, como trazado a pulso; se sale por los lados para que solo
        # se vea su contorno de arriba (los de los lados son los de la capa de abajo)
        top = f"M-30,3.5 C{w * .3:.0f},2 {w * .62:.0f},5.5 {w + 30:.0f},3 V{T + 30} H-30 Z"
        head = (f'<svg {svg} viewBox="0 0 {W} {T}" width="{W}" height="{T}"><defs>{wd}{wr}{grain}'
                f'<mask id="m"><rect width="{W}" height="{T}" fill="#fff"/><path d="{top}" filter="url(#wd)"/></mask></defs>'
                f'<g mask="url(#m)"><rect width="{W}" height="{T}" fill="{paper}"/>'
                f'<rect width="{W}" height="{T}" fill="#000" filter="url(#grain)"/></g>'
                f'<path d="{top}" fill="#{col}" opacity="{op}" filter="url(#wr)"/></svg>')

        def uri(s):
            s = re.sub(r">\s+<", "><", s.replace("\n", " "))
            return "url('data:image/svg+xml," + urllib.parse.quote(s, safe=" =:/,.-;()") + "')"
        return f"rgba({r},{g},{b},{float(op) * 0.95:.2f});--sky-top:{uri(head)};--sky-body:{uri(body)}"

    def resolve(self, title: str):
        """Ruta de un título: si varios cursos lo usan, el del curso actual;
        si no es de este curso y hay varios, hay que escribir «Título (Grado N)»."""
        c = self.titles.get(title) or []
        mine = [p for cid, p in c if cid == self.course]
        if mine:
            return mine[0]
        if len({p for _, p in c}) == 1:
            return c[0][1]
        if c:
            self.missing.append(f"enlace ambiguo [[{title}]]: escribe [[{title} (Grado N)]]")
        return None

    # Plantillas {{…}} y enlaces [[…]] (antes de Markdown: salen como HTML en línea)
    def inline(self, s: str, ctx: str = "") -> str:
        # Fórmulas en LaTeX: $$…$$ (en bloque, sola en su línea) y $…$ (en línea)
        s = re.sub(r"\$\$(.+?)\$\$", lambda m: "\n\n" + self.math.mark(m.group(1), True) + "\n\n", s, flags=re.S)
        # (no es fórmula un «$» de dinero: «$40, so $\frac25$…» — número seguido de una palabra)
        s = re.sub(r"(?<![\\\w])\$(?!\d[\d.,{}]*[,;:.]?\s+[^\W\d_]{2,})([^$\n]+?)\$(?!\w)", lambda m: self.math.mark(m.group(1)), s)

        # Figuras numeradas (con el pie arriba): «Figura N. Concepto», donde el concepto es el título
        # de la sección (## …) en la que está la figura, o el «concepto=…» que se le dé a la figura
        auto = self.fig_concepts(s)
        nfig = [0]

        def tpl(m):
            parts = [x.strip() for x in m.group(1).split("|")]
            name = parts[0].lower()
            plain = all(not re.search(r"[<>*_`\[]", x) for x in parts[1:])
            if name == "f" and len(parts) == 3:
                if plain:
                    return self.math.mark(r"\frac{" + to_tex(parts[1]) + "}{" + to_tex(parts[2]) + "}")
                return f'<span class="wa-fr"><span>{parts[1]}</span><span class="wa-frs">/</span><span>{parts[2]}</span></span>'
            if name == "raiz" and len(parts) == 2:
                if plain:
                    return self.math.mark(r"\sqrt{" + to_tex(parts[1]) + "}")
                return f'<span class="wa-sqrt">√<span>{parts[1]}</span></span>'
            if name == "hueco":
                return '<span class="wa-hole">□</span>'
            if name == "figura" and len(parts) >= 2:
                concept = next((x.split("=", 1)[1].strip() for x in parts[3:] if x.startswith("concepto=")), None)
                parts = [x for x in parts if not x.startswith("concepto=")]
                img = self.img(parts[1])
                if not img:
                    self.missing.append(f"imagen {parts[1]} ({ctx})")
                    return ""
                cap = parts[2] if len(parts) > 2 else ""
                cr = self.credit_html(img[0])
                cap = (cap + (" " if cap else "") + cr) if cr else cap
                w, h = img[1], img[2]
                # a un lado solo si cabe a tamaño natural; si es ancha, centrada y grande para que se lea
                side = " right" if len(parts) > 3 and parts[3] in ("derecha", "right") and 0 < w <= 440 else ""
                pie = parts[2] if len(parts) > 2 else ""
                if pie and (self.cap_top_all or ctx in self.cap_top) and w:
                    # el pie se lee ANTES que la figura: pintado arriba, en la misma lámina que el dibujo.
                    # Si el dibujo es de acuarela (papel #fbf8ef con grano), la franja del pie lleva ese
                    # mismo papel y no se nota la unión; si no, la lámina es blanca.
                    nfig[0] += 1
                    if concept is None:
                        concept = auto.get(m.start(), "")
                    lab = f'{esc(self.site["ui_build"]["figure"])} {nfig[0]}'
                    capt = (f'<figcaption class="wa-fig-num"><b>{lab}.</b>{" " + concept if concept else ""}'
                            f'{" " + cr if cr else ""}</figcaption>')
                    paper = " paper" if self.is_paper(img[3]) else ""
                    sky = self.top_wash(img[3]) if paper else None
                    if sky:
                        paper += " sky"
                    sky = f";--sky:{sky}" if sky else ""
                    return (f'<figure class="wa-fig cap-top{side}" id="fig-{nfig[0]}"><div class="wa-sheet{paper}" style="--w:{w}{sky}">'
                            f'<div class="wa-fig-band"><div class="wa-fig-cap">{caps_safe(pie)}</div></div>'
                            f'<img src="{img[0]}" width="{w}" height="{h}" alt="{lab}. {esc(re.sub("<[^>]+>", "", pie))}" loading="lazy">'
                            f'</div>{capt}</figure>')
                return (f'<figure class="wa-fig{side}"><img src="{img[0]}" width="{w}" height="{h}" alt="{esc(re.sub("<[^>]+>", "", cap))}" loading="lazy">'
                        f'{f"<figcaption>{cap}</figcaption>" if cap else ""}</figure>')
            self.missing.append(f"plantilla desconocida {{{{{m.group(1)}}}}} ({ctx})")
            return m.group(0)

        s = re.sub(r"\{\{([^{}]+)\}\}", tpl, s)

        def link(m):
            target, _, label = m.group(1).partition("|")
            target = target.strip()
            if target.lower().startswith("w:"):
                t = target[2:].strip()
                c = self.wiki.canonical(t)
                if not c:
                    self.wiki.drop(t, ctx)
                    return label or t
                self.wp_used.add(c)
                return self.wp_link(c, label or t)
            frag = ""
            if "#" in target:
                target, frag = target.split("#", 1)
                frag = "#" + anchor(frag)
            p = self.resolve(target)
            if not p:
                pend = "" if self.site["lang"] == "es" else " — ¿lección aún sin traducir?"
                self.missing.append(f"enlace [[{target}]] ({ctx}){pend}")
                return esc(label or target)
            return f'<a href="{href(p)}{frag}" title="{esc(target)}">{label or target}</a>'

        return re.sub(r"\[\[([^\[\]]+)\]\]", link, s)

    def credit_html(self, path: str) -> str:
        """«Foto: autor, licencia» (con enlace a la página de Commons) de una imagen hecha con fotos reales."""
        cr = self.credits.get(path) or []
        if not cr:
            return ""
        ub = self.site["ui_build"]
        who = "; ".join(f'<a class="external" rel="noopener" href="{esc(c["pagina"])}">{esc(c["autor"])}</a>, {esc(c["licencia"])}' for c in cr)
        return f'<small class="wa-credit">{esc(ub["photo"] if len(cr) == 1 else ub["photos"])}: {who} ({esc(ub["commons"])})</small>'

    def wp_link(self, title: str, label: str) -> str:
        url = f"https://{self.wp_lang}.wikipedia.org/wiki/" + urllib.parse.quote(wiki_path(title))
        return f'<a class="external wa-wp" href="{url}" data-wp="{esc(title)}" title="Wikipedia: {esc(title)}">{label}</a>'

    def blocks(self, s: str) -> str:
        # ::: tipo Título opcional  …  :::   →  caja de contenido
        # ::: intenta — ejercicio dentro de la lectura: la línea «???» separa el
        #     enunciado de la solución, que queda plegada.
        # ::: resumen — «Lo importante» al final de la lección (título por defecto).
        # En «intenta», varios ejercicios van en líneas «a) …», «b) …» (enunciado y
        # solución con las mismas letras): cada uno en su renglón, con la letra
        # destacada. Una línea que no empieza por letra sigue al apartado anterior;
        # una línea en blanco, «???» o «:::» lo cierran.
        ub = self.site["ui_build"]
        out, stack = [], []
        item = [False]

        def close_item():
            if item[0]:
                out.append("\n</div>\n")
                item[0] = False

        for line in s.split("\n"):
            in_try = bool(stack) and stack[-1][0] == "intenta"
            mi = re.match(r"^([a-h])\)\s+(.*)$", line) if in_try else None
            if mi:
                close_item()
                out.append(f'\n<div class="wa-item" markdown="1">\n<span class="wa-item-l">{mi.group(1)})</span> {mi.group(2)}')
                item[0] = True
                continue
            if item[0] and (not line.strip() or line.strip() == "???" or re.match(r"^:::", line)):
                close_item()
            m = re.match(r"^:::\s*(\w+)\s*(.*)$", line)
            if m:
                kind, title = m.group(1).lower(), m.group(2).strip()
                if kind == "intenta":
                    title = f'{esc(ub["tryIt"])}{": " + title if title else ""}'
                elif kind == "resumen" and not title:
                    title = esc(ub["summary"])
                stack.append([kind, False])
                t = f'<div class="wa-box-t">{title}</div>\n' if title else ""
                out.append(f'\n<div class="wa-box {kind}" markdown="1">\n{t}\n')
                continue
            if re.match(r"^:::\s*$", line):
                if not stack:
                    self.missing.append("::: de cierre sin abrir")
                    continue
                kind, sol = stack.pop()
                out.append(("\n</details>" if sol else "") + "\n</div>\n")
                continue
            if stack and stack[-1][0] == "intenta" and line.strip() == "???":
                stack[-1][1] = True
                out.append(f'\n<details class="wa-sol" markdown="1"><summary>{esc(ub["seeSolution"])}</summary>\n')
                continue
            # ::: pasos — cálculo paso a paso: cada línea en su propia línea
            out.append(line + ("  " if stack and stack[-1][0] == "pasos" and line.strip() else ""))
        if stack:
            self.missing.append("bloque ::: sin cerrar")
        return "\n".join(out)

    def md(self, s: str, ctx: str = "") -> str:
        s = self.blocks(self.inline(s, ctx))
        # Cálculos paso a paso: cada línea que empieza por "= " va en su propia línea
        s = re.sub(r"(?<=\S)\n(?==\s)", "  \n", s)
        h = markdown.markdown(s, extensions=["tables", "md_in_html", "attr_list", "sane_lists", "fenced_code"], output_format="html5")
        h = h.replace("<table>", '<table class="wikitable">')
        h = re.sub(r'<a href="(https?://)', r'<a class="external" rel="noopener" href="\1', h)
        return h

    def md_inline(self, s, ctx: str = "") -> str:
        h = self.md(str(s), ctx).strip()
        if h.startswith("<p>") and h.endswith("</p>") and h.count("<p>") == 1:
            h = h[3:-4]
        return h


def add_heading_ids(h: str) -> tuple[str, list[tuple[int, str, str]]]:
    """Pone id de estilo wiki a h2/h3 y devuelve la lista para el índice."""
    toc, used = [], set()

    def rep(m):
        lvl, inner = int(m.group(1)), m.group(2)
        a = anchor(inner)
        base, n = a, 2
        while a in used:
            a = f"{base}_{n}"
            n += 1
        used.add(a)
        toc.append((lvl, a, re.sub(r"<[^>]+>", "", inner)))
        return f'<h{lvl} id="{a}">{inner}</h{lvl}>'

    return re.sub(r"<h([23])>(.*?)</h\1>", rep, h), toc


def toc_html(toc, title: str) -> str:
    if len([t for t in toc if t[0] == 2]) < 3:
        return ""
    out, n2, n3, open3 = [], 0, 0, False
    out.append(f'<div id="toc" class="toc" role="navigation"><div class="toctitle">{esc(title)}</div><ul>')
    for lvl, a, text in toc:
        if lvl == 2:
            if open3:
                out.append("</ul>")
                open3 = False
            if n2:
                out.append("</li>")
            n2 += 1
            n3 = 0
            out.append(f'<li class="toclevel-1"><a href="#{a}"><span class="tocnumber">{n2}</span><span class="toctext">{esc(text)}</span></a>')
        else:
            if not open3:
                out.append("<ul>")
                open3 = True
            n3 += 1
            out.append(f'<li class="toclevel-2"><a href="#{a}"><span class="tocnumber">{n2}.{n3}</span><span class="toctext">{esc(text)}</span></a></li>')
    if open3:
        out.append("</ul>")
    if n2:
        out.append("</li>")
    out.append("</ul></div>")
    return "".join(out)


def text_before_wide_figures(body: str, R) -> str:
    """Una figura ancha (centrada, no flotante) que abre un apartado pasa detrás del primer párrafo, lista o tabla,
    para que el texto ocupe el hueco junto a la ficha en lugar de dejarlo en blanco."""
    blocks = re.split(r"\n\s*\n", body)
    for i in range(len(blocks) - 1):
        m = re.fullmatch(r"\s*\{\{figura\|([^|}]+)[^}]*\}\}\s*", blocks[i])
        nxt = blocks[i + 1].lstrip()
        if not m or not nxt or nxt[0] in ":#{>":
            continue
        img = R.img(m.group(1).strip())
        if img and img[1] > 440:
            blocks[i], blocks[i + 1] = blocks[i + 1], blocks[i]
    return "\n\n".join(blocks)


def split_lead(h: str) -> tuple[str, str]:
    i = h.find("<h2")
    return (h, "") if i < 0 else (h[:i], h[i:])


def lesson_nav(u: dict, ls: list, m: dict, ui: dict) -> str:
    """Caja de navegación al pie de una lección: lecciones de la unidad y anterior/siguiente."""
    unit_t = esc(ui["unitN"].replace("{n}", str(u["n"]))) + " · " + esc(u["titulo"])
    items = []
    for x in ls:
        if x is m:
            items.append('<li class="cur">' + esc(x["titulo"]) + "</li>")
        else:
            items.append('<li><a href="' + href(x["path"]) + '">' + esc(x["titulo"]) + "</a></li>")
    i = ls.index(m)
    prev_l = ls[i - 1] if i > 0 else None
    next_l = ls[i + 1] if i + 1 < len(ls) else None
    left = ('← <a href="' + href(prev_l["path"]) + '">' + esc(prev_l["titulo"]) + "</a>") if prev_l else ""
    if next_l:
        right = '<a href="' + href(next_l["path"]) + '">' + esc(next_l["titulo"]) + "</a> →"
    else:
        right = '<a href="' + href(u["path"]) + "#" + anchor(ui["unitTest"]) + '">' + esc(ui["unitTest"]) + "</a> →"
    return ('<table class="navbox"><tbody><tr><th colspan="2"><a href="' + href(u["path"]) + '">' + unit_t + "</a></th></tr>"
            '<tr><td colspan="2"><ol class="inline">' + "".join(items) + "</ol></td></tr>"
            '<tr><td colspan="2"><div class="wa-prevnext"><span>' + left + "</span><span>" + right + "</span></div></td></tr></tbody></table>")


# ── Página ──────────────────────────────────────────────────────────────
# apartados que solos no dicen de qué trata la figura (se completan con el título de la lección).
# Son los del español: cada idioma pone los suyos en site.yaml → encabezados_genericos.
GENERIC_HEADS = {"definición", "definiciones", "el método", "método", "la fórmula", "fórmula", "aplicaciones",
                 "ejemplo", "ejemplos", "ejemplos resueltos", "la idea", "idea", "propiedades", "procedimiento",
                 "cómo se hace", "paso a paso", "los cuatro pasos", "en la vida real", "para qué sirve", "repaso"}
# Comienzo del título de una caja «::: ejemplo» que no dice nada («Ejemplo resuelto: …»); site.yaml → prefijo_ejemplo
EXAMPLE_PREFIX = r"^Ejemplo(?:\s+(?:resuelto|\d+))?\s*[:.—–-]?\s*"
# Opciones de las preguntas fijas cuyo orden se respeta (Sí/No; «Ninguna», «Todas»…); site.yaml → orden_opciones
KEEP_ORDER = {"si_no": ["sí", "si", "no", "verdadero", "falso", "cierto"],
              "primeras": ["ninguna", "ninguno", "todas", "todos", "las dos", "los dos", "ambas", "ambos", "depende", "no se puede", "no hay"]}


def page(site: dict, *, title: str, body: str, crumbs: list = (), sub: str = "", body_attrs: str = "",
         meta_id: str = "", desc: str = "", scripts: bool = True, h1: bool = True, js: tuple = ((), ())) -> str:
    """js = (scripts antes de data.js, scripts después): textos y generadores de
    ejercicios / ejercicios del curso, solo en las páginas que los usan."""
    ui = site["ui"]
    crumbs_html = "".join(f'<span><a href="{href(p)}">{esc(t)}</a></span>' if p else f"<span>{esc(t)}</span>" for t, p in crumbs)
    extra_js, js = js, ""
    if scripts:
        lst = [f"_aula/i18n/{site['lang']}.js", *extra_js[0], "_aula/data.js", *extra_js[1]]
        js = ("".join(f'<script src="{s}"></script>' for s in lst) + '<script src="_aula/katex/katex.min.js" defer></script>'
              + '<script src="_aula/wikiaula.js" defer></script>')
    return f"""<!DOCTYPE html>
<html lang="{site['lang']}" dir="{site.get('dir', 'ltr')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
{f'<meta name="wikiaula:id" content="{esc(meta_id)}">' if meta_id else ''}
{f'<meta name="description" content="{esc(desc)}">' if desc else ''}
<link rel="icon" href="_aula/logo.svg" type="image/svg+xml">
<link rel="stylesheet" href="_aula/katex/katex.min.css">
<link rel="stylesheet" href="_aula/wikiaula.css">
{js}
</head>
<body class="mediawiki {site.get('dir', 'ltr')} sitedir-{site.get('dir', 'ltr')} ns-0 skin-wikiaula"{body_attrs}>
<div id="content" class="mw-body" role="main">
<div class="wa-bar"><a class="wa-logo" href="{href(site['pages']['home'])}"><img src="_aula/logo.svg" alt="" width="30" height="30">{esc(site['zim']['title'])}<small>{esc(ui['tagline'])}</small></a><nav class="wa-crumbs">{crumbs_html}</nav><div class="wa-stats"></div></div>
{f'<h1 id="firstHeading" class="firstHeading"><span class="mw-page-title-main">{esc(title)}</span></h1>' if h1 else ''}
{f'<div id="siteSub">{sub}</div>' if sub else ''}
<div id="mw-content-text" class="mw-body-content"><div class="mw-content-{site.get('dir', 'ltr')} mw-parser-output" lang="{site['lang']}" dir="{site.get('dir', 'ltr')}">
{body}
</div></div>
<div id="footer" role="contentinfo">{site['_footer']}</div>
</div>
</body>
</html>
"""


# ── Compilación ─────────────────────────────────────────────────────────
def build(lang: str, make_zim: bool = True, only: tuple = (), install: bool = False, community: Path | None = None):
    """community: carpeta de un curso de la comunidad (ver community.py). Sale un ZIM
    con solo ese curso: su portal es la página principal y no hay Portada."""
    cdir = CONTENT / lang
    if not (cdir / "site.yaml").is_file():
        die(f"no hay contenido en {cdir}" + (" (los cursos de la comunidad pueden estar en: "
            + ", ".join(sorted(p.parent.name for p in CONTENT.glob("*/site.yaml"))) + ")" if community else ""))
    site = yaml.safe_load((cdir / "site.yaml").read_text(encoding="utf-8"))
    site["lang"] = lang
    if community:
        import community as _com
        engine_ids = set()
        for g in (ENGINE / "gen").glob("*.js"):
            engine_ids |= set(re.findall(r'def\("([\w.]+)"', g.read_text(encoding="utf-8")))
        rep = _com.check_course(community, lang, engine_ids)
        for w in rep.warnings:
            print(f"AVISO: {w}")
        if rep.errors:
            for e in rep.errors:
                print(f"ERROR: {e}")
            die(f"el curso tiene {len(rep.errors)} errores (python community.py check {community})")
    # Textos de la interfaz: los mismos que usa el motor (engine/i18n/<lang>.js)
    try:
        site["ui"] = json.loads(subprocess.run(["node", str(ENGINE / "samples.js"), lang, "--ui"], check=True,
                                               capture_output=True).stdout.decode("utf-8"))
    except (OSError, subprocess.CalledProcessError, ValueError) as e:
        die(f"no se pudieron leer los textos de engine/i18n/{lang}.js con Node.js: {e}")
    ui = site["ui"]
    about_orig = site["pages_titles"]["about"]   # el pie y los textos enlazan [[Acerca de Offlined WikiAula]]
    if community:
        site["pages_titles"] = dict(site["pages_titles"], about=site["ui_build"]["communityAbout"])
        site["ui_build"]["siteSub"] = site["ui_build"]["communitySub"]
    site["pages"] = {k: path_of(v) for k, v in site["pages_titles"].items()}
    year_month = _dt.date.today().strftime("%Y-%m")

    credits: dict[str, list] = {}   # ruta de la imagen en el ZIM → [{titulo, autor, licencia, pagina}]

    def scan_images(dirs, prefix):
        out = {}
        for d in dirs:
            if not d.is_dir():
                continue
            cf = d / "_creditos.yaml"
            cred = (yaml.safe_load(cf.read_text(encoding="utf-8")) or {}) if cf.exists() else {}
            for f in sorted(d.iterdir()):
                if f.suffix.lower() not in (".svg", ".png", ".jpg", ".jpeg", ".webp"):
                    continue
                if f.name in out:
                    die(f"imagen repetida en el mismo curso: {f}")
                w, h = svg_size(f) if f.suffix.lower() == ".svg" else (0, 0)
                if not w:
                    try:
                        from PIL import Image  # opcional
                        with Image.open(f) as im:
                            w, h = im.size
                    except Exception:
                        w, h = 300, 200
                out[f.name] = (prefix + f.name, w, h, f)
                if cred.get(f.name):
                    credits[prefix + f.name] = cred[f.name]
        return out

    # Cursos
    courses = []
    # Asignaturas activas (carpetas de content/<lang>): las demás no entran en el ZIM, pero se conservan
    active = set(site.get("asignaturas_activas") or [])
    for cy in ([community / "curso.yaml"] if community else sorted(cdir.rglob("curso.yaml"))):
        if not community and only and cy.parent.name not in only:
            continue
        if not community and active and cy.relative_to(cdir).parts[0] not in active:
            continue
        c = yaml.safe_load(cy.read_text(encoding="utf-8"))
        c["_dir"] = cy.parent
        courses.append(c)
    courses.sort(key=lambda c: (c["grado"], c.get("orden", 50), c["asignatura"]))
    if len({c["id"] for c in courses}) != len(courses):
        die("dos cursos con el mismo id")

    # Imágenes: comunes (content/common/img, content/<lang>/img) y de cada curso (cualquier img/ de su carpeta)
    images = {"": scan_images([CONTENT / "common" / "img", cdir / "img"], "_img/")}
    for c in courses:
        images[c["id"]] = scan_images(sorted(c["_dir"].rglob("img")), f"_img/{c['id']}/")

    stage = site["etapas"]

    def stage_course(e, g):
        """Nombre local del curso: {n} = año dentro de la etapa (es: «3.º de ESO»), {g} = grado (en: «Grade 9»)."""
        return e["curso"].replace("{n}", str(g - e["desde"] + 1)).replace("{g}", str(g))

    def grade_label(g):
        for e in stage:
            if e["desde"] <= g <= e["hasta"]:
                return stage_course(e, g)
        return ""

    def grade_full(g):
        gr, lb = ui['grade'].replace('{g}', str(g)), grade_label(g)
        return gr if lb == gr else f"{gr} ({lb})"   # «Grado 9 (3.º de ESO)»; en inglés, solo «Grade 9»

    # Títulos (para los enlaces internos). Una lección cuyo título se repite en
    # otro curso se publica como «Título (Grado N)»; [[Título]] desde su propio
    # curso sigue funcionando y «Título (Grado N)» vale siempre.
    titles: dict[str, list] = {}
    paths: set = set()

    def reg(title, cid=None, path=None):
        p = path or path_of(title)
        if p in paths:
            die(f"ruta repetida: {p} ({title})")
        paths.add(p)
        titles.setdefault(title, []).append((cid, p))
        return p

    for k, t in site["pages_titles"].items():
        reg(t)
    if about_orig != site["pages_titles"]["about"]:
        titles.setdefault(about_orig, []).append((None, site["pages"]["about"]))
    lessons_meta = {}
    early_warn: list[str] = []
    for c in courses:
        c["path"] = reg(c["titulo"], c["id"])
        for ui_, u in enumerate(c["unidades"]):
            u["n"] = ui_ + 1
            u["id"] = u.get("id") or f"{c['id']}.u{ui_ + 1}"
            u["search"] = u.get("titulo_pagina") or f"{u['titulo']} ({c['titulo_corto']})"
            u["path"] = reg(u["search"], c["id"])
            u["_lessons"] = []
            if not u.get("carpeta"):
                continue
            udir = c["_dir"] / u["carpeta"]
            u["_dir"] = udir
            for slug in u.get("lecciones", []):
                f = udir / f"{slug}.md"
                if not f.exists():
                    if lang == "es":
                        die(f"falta la lección {f}")
                    early_warn.append(f"falta la lección {f.relative_to(cdir)} (aún sin traducir): no se incluye")
                    continue
                meta, body = read_md(f)
                for k in ("id", "titulo"):
                    if k not in meta:
                        die(f"{f}: falta '{k}'")
                if meta["id"] in lessons_meta:
                    die(f"id de lección repetido: {meta['id']}")
                meta["_body"], meta["_file"], meta["_course"] = body, f, c
                lessons_meta[meta["id"]] = meta
                u["_lessons"].append(meta)
    count: dict[str, int] = {}
    for m in lessons_meta.values():
        count[m["titulo"]] = count.get(m["titulo"], 0) + 1
    for m in lessons_meta.values():
        c = m["_course"]
        tagged = f"{m['titulo']} ({ui['grade'].replace('{g}', str(c['grado']))})"
        dup = count[m["titulo"]] > 1 or m["titulo"] in titles
        m["search"] = tagged if dup else m["titulo"]
        m["path"] = reg(m["search"], c["id"])
        if dup:
            titles.setdefault(m["titulo"], []).append((c["id"], m["path"]))
        else:
            titles.setdefault(tagged, []).append((c["id"], m["path"]))

    if community:
        # Un curso de la comunidad: su portal hace de portada (el logo de la barra lleva a él)
        site["pages"]["home"] = courses[0]["path"]
        site["zim"] = dict(site["zim"], title=site["ui_build"]["communityBar"])
    R = Renderer(site, titles, images)
    R.credits = credits
    R.missing.extend(early_warn)

    ko = dict(KEEP_ORDER, **(site.get("orden_opciones") or {}))
    ORDERED = re.compile(r"^(" + "|".join(re.escape(x) for x in ko["primeras"]) + r")\b", re.I)

    def keep_order(opts):
        yes_no = {x.lower() for x in ko["si_no"]}
        return (len(opts) == 2 and {o.strip().lower() for o in opts} <= yes_no) or any(ORDERED.match(o.strip()) for o in opts)

    # Ejercicios fijos del YAML → formato del motor
    def fixed_item(q, ctx):
        it = {"q": R.md_inline(q["pregunta"], ctx), "sol": R.md_inline(q.get("explicacion", ""), ctx) if q.get("explicacion") else ""}
        if "opciones" in q:
            it.update(kind="choice", opts=[R.md_inline(o, ctx) for o in q["opciones"]], correct=int(q.get("correcta", 0)))
            # «barajar: false» solo se respeta si el orden importa (Sí/No, o una opción tipo «Ninguna»/«Todas»):
            # en el resto la buena solía quedar la primera y se delataba.
            if q.get("barajar") is False and keep_order([str(o) for o in q["opciones"]]):
                it["shuffle"] = False
        elif "respuesta" in q:
            a = q["respuesta"]
            if isinstance(a, bool):
                die(f"{ctx}: respuesta no válida")
            if isinstance(a, int):
                it.update(kind="int", ans=a)
            elif isinstance(a, float):
                it.update(kind="num", ans=a)
            elif isinstance(a, str) and re.fullmatch(r"-?\d+/\d+", a.strip()):
                n_, d_ = a.strip().split("/")
                it.update(kind="frac", ans=[int(n_), int(d_)])
            else:
                it.update(kind="text", ans=[str(x) for x in (a if isinstance(a, list) else [a])])
            if q.get("ayuda"):
                it["hint"] = str(q["ayuda"])
        else:
            die(f"{ctx}: la pregunta necesita 'opciones' o 'respuesta'")
        return {"fixed": it}

    def spec_of(meta):
        out = []
        for s in meta.get("practica", []) or []:
            if "gen" in s:
                e = {"gen": s["gen"]}
                if "peso" in s:
                    e["w"] = float(s["peso"])
                out.append(e)
            else:
                out.append(fixed_item(s, meta["id"]))
        return out

    def lesson_data(c, m):
        d = {"id": m["id"], "title": m["titulo"], "path": m["path"]}
        if m.get("duracion"):
            d["min"] = m["duracion"]
        if m.get("ampliacion"):
            d["ext"] = 1
        return d

    # Datos para el motor (WA.DATA)
    data = {"lang": lang, "pages": site["pages"], "courses": {}}
    for c in courses:
        dc = {"id": c["id"], "title": c["titulo"], "grade": c["grado"], "subject": c["asignatura"], "path": c["path"], "units": []}
        for u in c["unidades"]:
            dc["units"].append({"id": u["id"], "title": u["titulo"], "path": u["path"],
                                "lessons": [lesson_data(c, m) for m in u["_lessons"]]})
        data["courses"][c["id"]] = dc

    # Generadores que existen (para avisar de los que no)
    gen_files = sorted((ENGINE / "gen").glob("*.js"))
    # Generadores propios de un curso de la comunidad (su carpeta gen/): en el ZIM, _aula/gen/com-<archivo>
    com_gens = {f"com-{g.name}": g for g in sorted((community / "gen").glob("*.js"))} if community else {}
    gen_of: dict[str, str] = {}
    for name, g in [(g.name, g) for g in gen_files] + list(com_gens.items()):
        for gid in re.findall(r"""\bdef\s*\(\s*["'`]([\w.]+)["'`]""", g.read_text(encoding="utf-8")):
            if gid in gen_of:
                die(f"generador repetido: {gid} ({gen_of[gid]} y {name})")
            gen_of[gid] = name
    gen_ids = set(gen_of)
    gen_i18n = {g.name: f"_aula/i18n/{lang}/{g.name}" for g in gen_files if (ENGINE / "i18n" / lang / g.name).exists()}

    def course_js(cids):
        """Scripts de las páginas que practican con esos cursos."""
        need = set()
        for cid in cids:
            for m in lessons_meta.values():
                if m["_course"]["id"] == cid:
                    need |= {gen_of[s_["gen"]] for s_ in m.get("practica") or [] if "gen" in s_ and s_["gen"] in gen_of}
        files = sorted(need)
        common = ["_aula/gen/_common.js"] if (ENGINE / "gen" / "_common.js").exists() else []
        before = [gen_i18n[f] for f in files if f in gen_i18n] + common + [f"_aula/gen/{f}" for f in files if f != "_common.js"]
        return before, [f"_aula/spec/{cid}.js" for cid in cids]
    no_text: dict[str, set] = {}
    for m in lessons_meta.values():
        for s in m.get("practica", []) or []:
            if "gen" in s and s["gen"] not in gen_ids:
                R.missing.append(f"generador {s['gen']} ({m['id']})")
            elif "gen" in s and gen_of[s["gen"]] != "_common.js" and gen_of[s["gen"]] not in gen_i18n and (ENGINE / "i18n" / "es" / gen_of[s["gen"]]).exists():
                no_text.setdefault(gen_of[s["gen"]], set()).add(m["id"])
    for f, ids in sorted(no_text.items()):
        R.missing.append(f"generadores de {f} sin textos en «{lang}» (falta engine/i18n/{lang}/{f}): {len(ids)} lecciones, p. ej. {sorted(ids)[0]}")

    # Ejercicios resueltos de muestra (Node ejecuta los mismos generadores)
    samples = {}
    specs = {lid: spec_of(m) for lid, m in lessons_meta.items()}
    if specs:
        DIST.mkdir(parents=True, exist_ok=True)
        fin, fout = DIST / f"_specs_{lang}.json", DIST / f"_samples_{lang}.json"
        fin.write_text(json.dumps(specs, ensure_ascii=False), encoding="utf-8")
        try:
            import os
            env = dict(os.environ, WA_EXTRA_GEN=str(community / "gen")) if com_gens else None
            subprocess.run(["node", str(ENGINE / "samples.js"), lang, str(fin), str(fout)], check=True, env=env)
            samples = json.loads(fout.read_text(encoding="utf-8"))
        except (OSError, subprocess.CalledProcessError) as e:
            print(f"AVISO: sin ejercicios de muestra (¿falta Node.js?): {e}")
        for f in (fin, fout):
            f.unlink(missing_ok=True)

    site["_footer"] = R.md(site["pie"], "pie")

    pages: dict[str, tuple[str, str, bool]] = {}   # ruta → (título, html, front)

    def infobox(caption, img=None, img_cap="", rows=(), extra=""):
        h = f'<table class="infobox"><caption>{esc(caption)}</caption><tbody>'
        if img and R.img(img):
            p, w, hh, _ = R.img(img)
            sc = min(1.0, 250 / max(w, 1))
            h += f'<tr><td colspan="2" class="infobox-image"><img src="{p}" width="{int(w * sc)}" height="{int(hh * sc)}" alt=""></td></tr>'
            cr = R.credit_html(p)
            if img_cap or cr:
                h += f'<tr><td colspan="2" class="infobox-caption">{img_cap}{"<br>" if img_cap and cr else ""}{cr}</td></tr>'
        elif img:
            R.missing.append(f"imagen {img} (ficha {caption})")
        for k, v in rows:
            h += f"<tr><th scope=\"row\">{esc(k)}</th><td>{v}</td></tr>"
        h += extra + "</tbody></table>"
        return h

    # ── Lecciones ──
    for c in courses:
        R.course = c["id"]
        cjs = course_js([c["id"]])
        for u in c["unidades"]:
            ls = u["_lessons"]
            for li, m in enumerate(ls):
                ctx = m["id"]
                R.lesson_title = m.get("titulo", "")
                body = m["_body"]
                if m.get("imagen") and "{{figura|" + m["imagen"] not in body:
                    # las imágenes solo van dentro del artículo: la de la lección, antes del primer apartado
                    i = body.find("\n## ")
                    fig = "{{figura|" + m["imagen"] + "|" + m.get("pie", "") + "}}\n\n"
                    body = fig + body if i < 0 else body[:i + 1] + fig + body[i + 1:]
                body = text_before_wide_figures(body, R)
                content = R.md(body, ctx)
                content, toc = add_heading_ids(content)
                lead, rest = split_lead(content)
                ib = infobox(m["titulo"], None, "", [
                    (site["ui_build"]["course"], f'<a href="{href(c["path"])}">{esc(c["titulo"])}</a>'),
                    (site["ui_build"]["stage"], esc(grade_label(c["grado"]))),
                    (site["ui_build"]["unit"], f'<a href="{href(u["path"])}">{esc(u["titulo"])}</a>'),
                    (site["ui_build"]["lesson"], esc(ui["lessonN"].replace("{a}", str(li + 1)).replace("{b}", str(len(ls))))),
                    *([(site["ui_build"]["kind"], f'<span class="wa-ext">{esc(site["ui_build"]["extension"])}</span>')] if m.get("ampliacion") else []),
                    *([(site["ui_build"]["time"], esc(site["ui_build"]["minutes"].replace("{n}", str(m["duracion"]))))] if m.get("duracion") else []),
                    *([(site["ui_build"]["needs"], ", ".join(R.inline(f"[[{x}]]", ctx) for x in m["requisitos"]))] if m.get("requisitos") else []),
                    (site["ui_build"]["mastery"], f'<span class="wa-mastery" data-lesson="{esc(m["id"])}">—</span>'),
                ], extra=f'<tr><td colspan="2"><button type="button" class="wa-btn ghost wa-tutor-lesson" data-lesson="{esc(m["id"])}" hidden>{esc(ui["askTutorLesson"])}</button></td></tr>')
                prac_id = anchor(ui["practice"])
                sm = samples.get(m["id"], [])
                static = ""
                if sm:
                    items = "".join(f'<li><div>{x["q"]}</div><details class="wa-st-a"><summary>{esc(site["ui_build"]["seeAnswer"])}</summary><div><b>{x["a"]}</b>{("<br>" + x["sol"]) if x["sol"] else ""}</div></details></li>' for x in sm)
                    static = f'<details class="wa-static"><summary>{esc(site["ui_build"]["worked"])}</summary><ol>{items}</ol></details>'
                wp = []
                for t in m.get("wikipedia") or []:
                    cw = R.wiki.canonical(t)
                    if cw is None:
                        R.wiki.drop(t, m["id"])
                    elif cw not in wp:
                        wp.append(cw)
                see = ""
                if wp:
                    for t in wp:
                        R.wp_used.add(t)
                    see_id = anchor(site["ui_build"]["seeAlso"])
                    see = (f'<h2 id="{see_id}">{esc(site["ui_build"]["seeAlso"])}</h2><ul>'
                           + "".join(f"<li>{R.wp_link(t, esc(t))} <span class=\"wa-muted\">({esc(site['ui_build']['inWikipedia'])})</span></li>" for t in wp) + "</ul>")
                    toc.append((2, see_id, site["ui_build"]["seeAlso"]))
                toc.insert(len(toc) - (1 if wp else 0), (2, prac_id, ui["practice"]))
                nav = lesson_nav(u, ls, m, ui)
                ext_note = f'<p class="wa-ext-note">{R.md_inline(site["ui_build"]["extNote"], ctx)}</p>' if m.get("ampliacion") else ""
                body = (ib + ext_note + lead + toc_html(toc, site["ui_build"]["contents"]) + rest
                        + f'<h2 id="{prac_id}">{esc(ui["practice"])}</h2>'
                        + f'<div class="wa-practice" data-mode="lesson" data-lesson="{esc(m["id"])}"></div>'
                        + f'<p class="wa-nojs">{esc(ui["noJs"])}</p>' + static + see + nav)
                desc = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", lead)).strip()[:300]
                pages[m["path"]] = (m["search"], page(site, title=m["titulo"], body=body, meta_id=m["id"], desc=desc, js=cjs,
                    sub=esc(site["ui_build"]["siteSub"]) + " · " + f'<a href="{href(c["path"])}">{esc(c["titulo"])}</a>',
                    crumbs=[(c["titulo_corto"], c["path"]), (ui["unitN"].replace("{n}", str(u["n"])), u["path"])],
                    body_attrs=f' data-lesson="{esc(m["id"])}" data-unit="{esc(u["id"])}" data-course="{esc(c["id"])}"'), True)

            # ── Unidad ──
            intro = ""
            uf = u.get("_dir") and (u["_dir"] / "unidad.md")
            if uf and uf.exists():
                _, ub = read_md(uf)
                intro = R.md(ub, u["id"])
            static_list = "<ol>" + "".join(f'<li><a href="{href(m["path"])}">{esc(m["titulo"])}</a></li>' for m in ls) + "</ol>"
            test_id = anchor(ui["unitTest"])
            ib = infobox(u["titulo"], None, "", [
                (site["ui_build"]["course"], f'<a href="{href(c["path"])}">{esc(c["titulo"])}</a>'),
                (site["ui_build"]["stage"], esc(grade_label(c["grado"]))),
                (site["ui_build"]["lessons"], str(len(ls)) if ls else esc(ui["soon"])),
            ])
            other = "".join(f'<li class="{"cur" if x is u else ""}">' + (esc(x["titulo"]) if x is u else f'<a href="{href(x["path"])}">{esc(x["titulo"])}</a>') + "</li>" for x in c["unidades"])
            nav = f'<table class="navbox"><tbody><tr><th><a href="{href(c["path"])}">{esc(c["titulo"])}</a></th></tr><tr><td><ol class="inline">{other}</ol></td></tr></tbody></table>'
            if ls:
                body = (ib + intro + f'<h2 id="{anchor(ui["lessons"])}">{esc(ui["lessons"])}</h2>'
                        + f'<div class="wa-unit" data-unit="{esc(u["id"])}">{static_list}</div>'
                        + f'<h2 id="{test_id}">{esc(ui["unitTest"])}</h2>'
                        + f'<div class="wa-practice" data-mode="unit" data-unit="{esc(u["id"])}"></div><p class="wa-nojs">{esc(ui["noJs"])}</p>' + nav)
            else:
                body = ib + intro + f'<p class="wa-muted">{esc(ui["soon"])}.</p>' + nav
            ut = ui["unitN"].replace("{n}", str(u["n"])) + " · " + u["titulo"]
            pages[u["path"]] = (u["search"], page(site, title=ut, body=body, meta_id=u["id"], js=cjs,
                sub=esc(site["ui_build"]["siteSub"]) + " · " + f'<a href="{href(c["path"])}">{esc(c["titulo"])}</a>',
                crumbs=[(c["titulo_corto"], c["path"])], body_attrs=f' data-unit="{esc(u["id"])}" data-course="{esc(c["id"])}"'), bool(ls))

        # ── Portal del curso ──
        intro = R.md(c.get("presentacion", ""), c["id"])
        n_less = sum(len(u["_lessons"]) for u in c["unidades"])
        ib = infobox(c["titulo"], None, "", [
            (site["ui_build"]["subject"], esc(c["asignatura"])),
            (site["ui_build"]["grade"], esc(grade_full(c["grado"]))),
            (site["ui_build"]["units"], str(len(c["unidades"]))),
            (site["ui_build"]["lessons"], str(n_less)),
            *([(site["ui_build"]["communityAuthor"], esc(c["autor"])),
               (site["ui_build"]["communityLicense"], esc(c["licencia"]))] if community else []),
        ])
        if community:   # aviso de curso de la comunidad, con el enlace para contar un problema
            ib += f'<div class="wa-box curiosidad wa-community">{R.md(site["ui_build"]["communityBy"].replace("{autor}", c["autor"]), c["id"])}</div>'
        def static_card(li, m):
            mins = (" · " + esc(ui["cardMin"].replace("{n}", str(m["duracion"])))) if m.get("duracion") else ""
            ext = f'<span class="wa-ext">{esc(ui["cardExt"])}</span>' if m.get("ampliacion") else ""
            return (f'<a class="wa-lc" href="{href(m["path"])}"><span class="wa-lc-b"><span class="wa-lc-k"><span class="wa-dot sm">{li + 1}</span>'
                    f'{esc(ui["cardLesson"].replace("{n}", str(li + 1)))}{mins}{ext}</span><b>{esc(m["titulo"])}</b></span></a>')
        static = "".join(f'<section class="wa-u"><header><span class="wa-u-n">{esc(ui["unitN"].replace("{n}", str(u["n"])))}</span><a class="wa-u-t" href="{href(u["path"])}">{esc(u["titulo"])}</a></header>'
                         + ('<div class="wa-cards">' + "".join(static_card(li, m) for li, m in enumerate(u["_lessons"])) + "</div>" if u["_lessons"] else f'<p class="wa-muted">{esc(ui["soon"])}</p>')
                         + "</section>" for u in c["unidades"])
        body = ib + intro + f'<h2 id="{anchor(site["ui_build"]["path"])}">{esc(site["ui_build"]["path"])}</h2><div class="wa-path" data-course="{esc(c["id"])}">{static}</div>'
        pages[c["path"]] = (c["titulo"], page(site, title=c["titulo"], body=body, meta_id=c["id"],
            sub=esc(site["ui_build"]["siteSub"]) + " · " + esc(grade_full(c["grado"])),
            crumbs=[(c["titulo_corto"], None)], body_attrs=f' data-course="{esc(c["id"])}"'), True)

    R.course = None
    # ── Portada ──
    home = site["portada"]

    def norm_key(t):
        return re.sub(r"[^a-z]+", "-", unicodedata.normalize("NFKD", t.lower()).encode("ascii", "ignore").decode()).strip("-")
    ub = site["ui_build"]
    ICONS = {   # trazos de 24 × 24 (estilo Lucide), sin relleno
        "wifi-off": '<path d="M2 2l20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 12.9a10 10 0 0 1 5-2.7"/><path d="M19 12.9a10 10 0 0 0-2.2-1.6"/><path d="M2 8.8a15 15 0 0 1 4.2-2.6"/><path d="M22 8.8A15 15 0 0 0 11 5"/><path d="M12 20h.01"/>',
        "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
        "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        "lock": '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    }
    feats = "".join(
        f'<div class="wa-feat"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS.get(f.get("icono"), "")}</svg>'
        f'<b>{esc(f["titulo"])}</b><p>{R.md_inline(f["texto"], "portada")}</p></div>' for f in home["rasgos"])
    steps = "".join(f'<li><span class="wa-step-n">{i + 1}</span><b>{esc(x["titulo"])}</b><p>{R.md_inline(x["texto"], "portada")}</p></li>'
                    for i, x in enumerate(home["pasos"]))
    by_grade: dict[int, list] = {}
    for c in courses:
        by_grade.setdefault(c["grado"], []).append(c)

    def subject_card(c):
        n_l = sum(len(u["_lessons"]) for u in c["unidades"])
        stats = ub["subjectStats"].replace("{u}", str(len(c["unidades"]))).replace("{l}", str(n_l))
        return (f'<a class="wa-sc" href="{href(c["path"])}" data-subject="{esc(norm_key(c["asignatura"]))}"><span class="wa-sc-b"><b>{esc(c["asignatura"])}</b>'
                f'<small>{esc(stats)}</small><span class="wa-sc-bar" data-course="{esc(c["id"])}"></span></span></a>')
    tabs, panels = [], []
    for si, e in enumerate(stage):
        tabs.append(f'<button type="button" class="wa-stagetab" role="tab" data-stage="{si}">{esc(e["nombre"])}</button>')
        grades = ""
        for g in range(e["desde"], e["hasta"] + 1):
            cs = by_grade.get(g, [])
            cards = "".join(subject_card(c) for c in cs) or f'<p class="wa-muted">{esc(ui["soon"])}</p>'
            lb, gr = stage_course(e, g), ui["grade"].replace("{g}", str(g))
            grades += (f'<div class="wa-grade" data-grade="{g}"><h4>{esc(lb)}'
                       + (f' <small>{esc(gr)}</small>' if gr != lb else "") + f'</h4><div class="wa-scs">{cards}</div></div>')
        panels.append(f'<section class="wa-stagepanel" role="tabpanel" data-stage="{si}" data-from="{e["desde"]}" data-to="{e["hasta"]}">'
                      f'<h3 class="wa-stage-h">{esc(e["nombre"])}</h3>{grades}</section>')
    body = (f'<div class="wa-hero"><img src="_aula/logo.svg" alt="" width="96" height="96"><div><h1>{esc(site["zim"]["title"])}</h1><p>{R.md_inline(home["lema"])}</p></div></div>'
            + '<div class="wa-home"></div>'
            + f'<h2 id="{anchor(home["que_es_titulo"])}">{esc(home["que_es_titulo"])}</h2>' + R.md(home["que_es"], "portada")
            + f'<div class="wa-feats">{feats}</div>'
            + f'<h2 id="{anchor(home["como_titulo"])}">{esc(home["como_titulo"])}</h2><ol class="wa-steps">{steps}</ol>'
            + f'<h2 id="{anchor(home["cursos"])}">{esc(home["cursos"])}</h2><p class="wa-muted">{R.md_inline(home["cursos_intro"], "portada")}</p>'
            + f'<div class="wa-stagetabs" role="tablist" hidden>{"".join(tabs)}</div><div class="wa-stagepanels">{"".join(panels)}</div>'
            + f'<div class="wa-offlined">{R.md_inline(site["offlined"])}</div>'
            + f'<h2 id="{anchor(home["familias_titulo"])}">{esc(home["familias_titulo"])}</h2>' + R.md(home["familias"], "portada"))
    hp = site["pages"]["home"]
    if not community:   # en un curso de la comunidad, la portada es el portal del curso
      pages[hp] = (site["pages_titles"]["home"], page(site, title=site["pages_titles"]["home"], body=body, h1=False, desc=re.sub(r"<[^>]+>", "", R.md_inline(home["lema"]))), True)

    # ── Repaso, Mi progreso, Acerca de ──
    for key, cls in (("review", "wa-review"), ("progress", "wa-progress")):
        t = site["pages_titles"][key]
        txt = R.md(site["textos"].get(key, ""), key)
        pages[site["pages"][key]] = (t, page(site, title=t, body=txt + f'<div class="{cls}"></div><p class="wa-nojs">{esc(ui["noJs"])}</p>', crumbs=[(t, None)],
                                          js=course_js([c["id"] for c in courses]) if key == "review" else ((), ())), False)
    t = site["pages_titles"]["about"]
    cred_html = ""
    if credits:
        ub = site["ui_build"]
        rows = []
        for c in courses:
            mine = sorted((name, p_[0]) for name, p_ in images[c["id"]].items() if p_[0] in credits)
            if mine:
                rows.append(f'<h3>{esc(c["titulo"])}</h3><ul class="wa-credits">' + "".join(
                    f'<li><code>{esc(name)}</code> — ' + "; ".join(
                        f'«{esc(x["titulo"])}», {esc(x["autor"])}, {esc(x["licencia"])} (<a class="external" rel="noopener" href="{esc(x["pagina"])}">{esc(ub["commons"])}</a>)'
                        for x in credits[path]) + "</li>" for name, path in mine) + "</ul>")
        cred_html = f'<h2 id="{anchor(ub["photoCredits"])}">{esc(ub["photoCredits"])}</h2>' + R.md(ub["photoCreditsIntro"], "about") + "".join(rows)
    about = R.md(site["textos"]["about"], "about")
    if community:   # «Acerca de este curso»: autor, licencia, fuentes y cómo contar un problema
        c, ub = courses[0], site["ui_build"]
        about = R.md(c["descripcion"], "about") + "<ul>" + "".join(
            f"<li><b>{esc(k)}:</b> {v}</li>" for k, v in (
                (ub["communityAuthor"], esc(c["autor"]) + (f' (<a class="external" rel="noopener" href="https://github.com/{esc(c["github"])}">GitHub</a>)' if c.get("github") else "")),
                (ub["communityLicense"], esc(c["licencia"])))) + "</ul>"
        if c.get("fuentes"):
            about += f'<h2 id="{anchor(ub["communitySources"])}">{esc(ub["communitySources"])}</h2><ul>' + "".join(
                f"<li>{R.md_inline(str(x), 'about')}</li>" for x in c["fuentes"]) + "</ul>"
        about += R.md(ub["communityBy"].replace("{autor}", c["autor"]), "about") + R.md(ub["communityShare"], "about")
    pages[site["pages"]["about"]] = (t, page(site, title=t, body=about + cred_html + f'<div class="wa-offlined">{R.md_inline(site["offlined"])}</div>', crumbs=[(t, None)]), True)

    if R.missing:
        print("\nAVISOS:")
        for x in sorted(set(R.missing)):
            print("  -", x)

    # ── Escribir la carpeta de vista previa ──
    out = DIST / f"site_{lang}"
    if out.exists():
        shutil.rmtree(out)
    (out / "_aula" / "i18n").mkdir(parents=True)
    (out / "_aula" / "gen").mkdir()
    (out / "_img").mkdir()
    assets: dict[str, tuple[bytes, str]] = {}

    def asset(p, data_, mime):
        assets[p] = (data_, mime)

    # Fórmulas: las raíces escritas con símbolos (√2, √(x + 4)…) también pasan a KaTeX
    for p_ in list(pages):
        t_, h_, *r_ = pages[p_]
        pages[p_] = (t_, R.math.roots_in_html(h_), *r_)
    rendered = R.math.render_all()
    for p_ in list(pages):
        t_, h_, *r_ = pages[p_]
        pages[p_] = (R.math.plain(t_), R.math.fill(h_, rendered), *r_)

    def fill_obj(o):
        if isinstance(o, str):
            return R.math.fill(o, rendered)
        if isinstance(o, list):
            return [fill_obj(x) for x in o]
        if isinstance(o, dict):
            return {k: fill_obj(v) for k, v in o.items()}
        return o
    print(f"Fórmulas con KaTeX: {len(R.math.items)}")

    asset("_aula/wikiaula.css", (ENGINE / "wikiaula.css").read_bytes(), "text/css")
    asset("_aula/wikiaula.js", (ENGINE / "wikiaula.js").read_bytes(), "application/javascript")
    asset(f"_aula/i18n/{lang}.js", (ENGINE / "i18n" / f"{lang}.js").read_bytes(), "application/javascript")
    # Un curso de la comunidad solo lleva los generadores del motor que usa (y los suyos)
    need_gen = None
    if community:
        need_gen = {"_common.js"} | {gen_of[s_["gen"]] for m in lessons_meta.values()
                                     for s_ in m.get("practica") or [] if "gen" in s_ and s_["gen"] in gen_of}
    for g in gen_files:
        if need_gen is not None and g.name not in need_gen:
            continue
        asset(f"_aula/gen/{g.name}", g.read_bytes(), "application/javascript")
        if g.name in gen_i18n:
            asset(gen_i18n[g.name], (ENGINE / "i18n" / lang / g.name).read_bytes(), "application/javascript")
    for name, g in com_gens.items():
        asset(f"_aula/gen/{name}", g.read_bytes(), "application/javascript")
    for c in courses:
        spec = fill_obj({m["id"]: spec_of(m) for u in c["unidades"] for m in u["_lessons"]})
        asset(f"_aula/spec/{c['id']}.js", ("/* generado por build.py */\n\"use strict\";\n((window.WA = window.WA || {}).SPEC = WA.SPEC || {})["
                                           + json.dumps(c["id"]) + "] = " + json.dumps(spec, ensure_ascii=False, separators=(",", ":")) + ";\n").encode("utf-8"), "application/javascript")
    asset("_aula/data.js", ("/* generado por build.py */\n\"use strict\";\n(window.WA = window.WA || {}).DATA = "
                            + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n").encode("utf-8"), "application/javascript")
    asset("_aula/logo.svg", (ENGINE / "logo.svg").read_bytes(), "image/svg+xml")
    # Patrick Hand SC (SIL OFL 1.1): la letra de los rótulos de las figuras, para los pies de arriba
    fonts = ROOT / "ilustraciones" / "fotos" / "fuentes"
    if not fonts.is_dir():
        fonts = ROOT / "fonts"   # kit público de WikiClassroom
    asset("_aula/fonts/PatrickHandSC-Regular.ttf", (fonts / "PatrickHandSC-Regular.ttf").read_bytes(), "font/ttf")
    asset("_aula/fonts/PatrickHand-Regular.ttf", (fonts / "PatrickHand-Regular.ttf").read_bytes(), "font/ttf")
    asset("_aula/fonts/OFL.txt", (fonts / "OFL.txt").read_bytes(), "text/plain")
    # KaTeX (MIT): fórmulas en las páginas y en los ejercicios
    asset("_aula/katex/katex.min.js", (KATEX_DIR / "katex.min.js").read_bytes(), "application/javascript")
    asset("_aula/katex/katex.min.css", (KATEX_DIR / "katex.min.css").read_bytes(), "text/css")
    asset("_aula/katex/LICENSE.txt", (KATEX_DIR / "LICENSE.txt").read_bytes(), "text/plain")
    for f in sorted((KATEX_DIR / "fonts").glob("*.woff2")):
        asset(f"_aula/katex/fonts/{f.name}", f.read_bytes(), "font/woff2")
    mimes = {".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"}
    used_imgs = set()
    for _, h_, *_r in pages.values():
        used_imgs |= set(re.findall(r'_img/[^"\'\s)<>]+', h_))
    skipped = 0
    for group in images.values():
        for name, (p, _, _, f) in group.items():
            if p not in used_imgs:   # portadas y dibujos que ya no se muestran: no van al ZIM
                skipped += 1
                continue
            asset(p, f.read_bytes(), mimes[f.suffix.lower()])
    print(f"Imágenes: {len(used_imgs)} usadas · {skipped} sin usar (no se incluyen)")
    for p, (d, _) in assets.items():
        (out / p).parent.mkdir(parents=True, exist_ok=True)
        (out / p).write_bytes(d)
    for p, (_, h, _) in pages.items():
        (out / (p + ".html")).write_text(h, encoding="utf-8")
    print(f"\n{len(pages)} páginas, {len(assets)} recursos → {out}")
    for c in courses:
        nl = sum(len(u["_lessons"]) for u in c["unidades"])
        print(f"  {c['titulo']}: {sum(1 for u in c['unidades'] if u['_lessons'])}/{len(c['unidades'])} unidades, {nl} lecciones")
    print(f"Lecciones: {len(lessons_meta)} · Enlaces a Wikipedia: {len(R.wp_used)}"
          + (f" (comprobados en {R.wiki.file})" if R.wiki.file else " (SIN COMPROBAR: no hay Wikipedia de este idioma en " + str(WIKIS) + ")"))
    if R.wiki.dropped:
        print(f"Enlaces quitados (no están en la Wikipedia «{lang}»): {len(R.wiki.dropped)}")
        for t, ctx in sorted(R.wiki.dropped.items()):
            print(f"  - {t}  ({', '.join(sorted(set(ctx))[:3])})")
    (DIST / f"wikipedia_titles_{lang}.txt").write_text("\n".join(sorted(R.wp_used)), encoding="utf-8")

    if community:
        c = courses[0]
        info = {"id": c["id"], "lang": lang, "title": c["titulo"], "short": c["titulo_corto"], "subject": c["asignatura"],
                "grade": c["grado"], "author": c["autor"], "github": c.get("github") or "", "license": c["licencia"],
                "description": re.sub(r"\s+", " ", str(c["descripcion"])).strip(),
                "units": sum(1 for u in c["unidades"] if u["_lessons"]), "lessons": len(lessons_meta),
                "folder": community.name}
        (DIST / "course.json").write_text(json.dumps(info, ensure_ascii=False, indent=2), encoding="utf-8")
    if not make_zim:
        return
    if community:
        zim_path = DIST / f"wikiaula-community_{lang}_{community.name}_{_dt.date.today().isoformat()}.zim"
        make_zim_file(zim_path, site, pages, assets, lang, community=info)
        if install:
            install_community(zim_path, lang, community.name)
        return
    zim_path = DIST / f"wikiaula_{lang}_all_{year_month}.zim"
    make_zim_file(zim_path, site, pages, assets, lang)
    if install:
        install_zim(zim_path, lang)


AULA_DIR = ROOT.parent / "Offlined Data" / "Wikis" / "wikiaula"
KIWIX_AULA_PORT = 17886


def _stop_aula_kiwix() -> bool:
    """Para el kiwix-serve de WikiAula (puerto 17886) para poder reemplazar el
    ZIM en Windows. Solo si el proceso que escucha ahí es kiwix-serve."""
    if sys.platform != "win32":
        return False
    out = subprocess.run(["netstat", "-ano", "-p", "TCP"], capture_output=True, text=True).stdout
    pids = {l.split()[-1] for l in out.splitlines() if f":{KIWIX_AULA_PORT} " in l and "LISTEN" in l.upper()}
    stopped = False
    for pid in pids:
        info = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"], capture_output=True, text=True).stdout
        if "kiwix-serve" in info.lower():
            subprocess.run(["taskkill", "/PID", pid, "/F"], capture_output=True)
            stopped = True
    return stopped


def install_zim(zim_path: Path, lang: str):
    import os
    import time
    AULA_DIR.mkdir(parents=True, exist_ok=True)
    dest = AULA_DIR / zim_path.name
    olds = [f for f in AULA_DIR.glob(f"wikiaula_{lang}_all_*.zim") if f.name != dest.name]
    tmp = AULA_DIR / (zim_path.name + ".tmp")
    shutil.copyfile(zim_path, tmp)
    for attempt in range(2):
        try:
            os.replace(tmp, dest)
            for f in olds:
                f.unlink()
            break
        except PermissionError:
            if attempt or not _stop_aula_kiwix():
                tmp.unlink(missing_ok=True)
                die(f"no se pudo reemplazar {dest}: ciérralo en Offlined (o cierra Offlined) y repite")
            time.sleep(1)
    print(f"Instalado en Offlined: {dest}" + (f" (quitados: {', '.join(f.name for f in olds)})" if olds else ""))


def install_community(zim_path: Path, lang: str, folder: str):
    """Copia un curso de la comunidad a Offlined Data/Wikis/wikiaula/community (para probarlo
    en Offlined) y quita sus versiones anteriores."""
    import os
    dest_dir = AULA_DIR / "community"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / zim_path.name
    olds = [f for f in dest_dir.glob(f"wikiaula-community_{lang}_{folder}_*.zim") if f.name != dest.name]
    tmp = dest_dir / (zim_path.name + ".tmp")
    shutil.copyfile(zim_path, tmp)
    try:
        os.replace(tmp, dest)
        for f in olds:
            f.unlink()
    except PermissionError:
        tmp.unlink(missing_ok=True)
        if not _stop_aula_kiwix():
            die(f"no se pudo copiar a {dest}: cierra WikiAula en Offlined y repite")
        shutil.copyfile(zim_path, dest)
        for f in olds:
            f.unlink(missing_ok=True)
    # Compilado aquí: Offlined lo abre con el motor completo (los copiados a mano van sin scripts;
    # ver backend/features/wikiaula.py, _verified.json)
    import hashlib
    import json as _json
    vf = dest_dir / "_verified.json"
    try:
        ver = _json.loads(vf.read_text(encoding="utf-8"))
    except Exception:
        ver = {}
    ver = {k: v for k, v in ver.items() if (dest_dir / k).is_file()}
    ver[dest.name] = hashlib.sha256(dest.read_bytes()).hexdigest()
    vf.write_text(_json.dumps(ver, ensure_ascii=False), encoding="utf-8")
    print(f"Instalado en Offlined: {dest}")


def make_zim_file(zim_path: Path, site: dict, pages: dict, assets: dict, lang: str, community: dict | None = None):
    from libzim.writer import Creator, Item, StringProvider, Hint

    class _Item(Item):
        def __init__(self, path, title, mime, content: bytes, front: bool):
            super().__init__()
            self._p, self._t, self._m, self._c, self._f = path, title, mime, content, front

        def get_path(self): return self._p
        def get_title(self): return self._t
        def get_mimetype(self): return self._m
        def get_contentprovider(self): return StringProvider(self._c)
        def get_hints(self): return {Hint.FRONT_ARTICLE: self._f, Hint.COMPRESS: not self._m.startswith("image/") or self._m == "image/svg+xml"}

    if zim_path.exists():
        zim_path.unlink()
    meta = site["zim"]
    icon = (ENGINE / "logo-48.png").read_bytes()
    with Creator(str(zim_path)).config_indexing(True, ISO3.get(lang, "eng")) as cr:
        cr.set_mainpath(site["pages"]["home"])
        cr.add_illustration(48, icon)
        md = [("Name", f"wikiaula_{lang}_all"), ("Title", meta["title"]), ("Description", meta["description"]),
              ("LongDescription", meta["long_description"].strip()), ("Language", ISO3.get(lang, "eng")),
              ("Creator", meta["creator"]), ("Publisher", meta["publisher"]), ("Date", _dt.date.today().isoformat()),
              ("Tags", meta["tags"]), ("Source", meta["source"]), ("License", meta["license"]), ("Flavour", "")]
        if community:   # curso de la comunidad: sus propios metadatos (Description: 80 caracteres como mucho)
            d = community["description"]
            md = [("Name", f"wikiaula-community_{lang}_{community['folder']}"), ("Title", community["title"][:30]),
                  ("Description", d if len(d) <= 80 else d[:79].rstrip() + "…"), ("LongDescription", d[:4000]),
                  ("Language", ISO3.get(lang, "eng")), ("Creator", community["author"]),
                  ("Publisher", "Offlined WikiAula (community)"), ("Date", _dt.date.today().isoformat()),
                  ("Tags", "_category:other;education;wikiaula-community;_pictures:yes;_videos:no;_details:yes;_ftindex:yes"),
                  ("Source", "https://github.com/Aruvaro-Chulvi/OfflinedWikiClassroom"), ("License", community["license"]), ("Flavour", "")]
        for k, v in md:
            if v:
                cr.add_metadata(k, v)
        for p, (d, mime) in assets.items():
            cr.add_item(_Item(p, "", mime, d, False))
        for p, (t, h, front) in pages.items():
            cr.add_item(_Item(p, t, "text/html", h.encode("utf-8"), front))
    # libzim deja en Windows los índices temporales junto al ZIM
    for tmp in zim_path.parent.glob(zim_path.name + "_*"):
        shutil.rmtree(tmp, ignore_errors=True) if tmp.is_dir() else tmp.unlink(missing_ok=True)
    print(f"ZIM: {zim_path} ({zim_path.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    _flags = {"--no-zim", "--instalar"}
    _keys = {"out", "wikis", "content", "only", "curso"}
    _bad = [a for a in sys.argv[1:] if a.startswith("-") and a not in _flags
            and not (a.startswith("--") and "=" in a and a[2:].split("=", 1)[0] in _keys)]
    if _bad:
        print(f"Opción desconocida: {' '.join(_bad)}\n"
              "Uso: build.py [lang] [--no-zim] [--instalar] [--only=grado-N,…] [--out=dir] [--wikis=dir] [--content=dir] [--curso=dir]")
        sys.exit(2)
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
    _com = Path(opts["curso"]).resolve() if opts.get("curso") else None
    if _com and not (_com / "curso.yaml").is_file():
        die(f"no hay curso.yaml en {_com}")
    if _com and not args:
        args = [_com.parent.name]   # community/<lang>/<carpeta>: el idioma es la carpeta de arriba
    if opts.get("out"):
        DIST = Path(opts["out"]).resolve()
    elif _com:
        DIST = ROOT.parent / "dist" / "wikiaula-community" / _com.name
    if opts.get("wikis"):
        WIKIS = Path(opts["wikis"]).resolve()
    if opts.get("content"):   # otra carpeta de contenido (con <lang>/site.yaml): pruebas fuera de content/
        CONTENT = Path(opts["content"]).resolve()
    build(args[0] if args else "es", make_zim="--no-zim" not in sys.argv, install="--instalar" in sys.argv,
          only=tuple(x.strip() for x in opts.get("only", "").split(",") if x.strip()), community=_com)
