"""Offlined WikiAula — fórmulas con KaTeX (MIT) en las páginas del ZIM.

Al compilar, las fórmulas se convierten en HTML de KaTeX (no hace falta
JavaScript para verlas, así que funcionan en cualquier lector de Kiwix):

  · $…$ (en línea) y $$…$$ (en bloque): LaTeX escrito en la lección.
  · {{raiz|x}} y {{f|a|b}}: raíz y fracción.
  · Las raíces escritas con símbolos, √2, √(x + 4), ∛(x²), ⁿ√a…, en cualquier
    texto de la página (también los ejercicios resueltos de muestra).

El motor (engine/wikiaula.js) hace lo mismo con las raíces de los ejercicios
que genera en el navegador, con el KaTeX que va dentro del ZIM. Las dos
conversiones (to_tex aquí y toTex allí) siguen las mismas reglas.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

KATEX_DIR = Path(__file__).resolve().parent / "engine" / "vendor" / "katex"
MARK = "\x01"                       # marcador: \x01M<n>\x01 → fórmula n

SUP = dict(zip("⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣᵐᵏ", "0123456789+-=()nixmk"))
SUB = dict(zip("₀₁₂₃₄₅₆₇₈₉₊₋ₙₓᵢₖₘ", "0123456789+-nxikm"))
SYM = {"−": "-", "–": "-", "·": r"\cdot ", "×": r"\times ", "÷": r"\div ", "π": r"\pi ", "σ": r"\sigma ",
       "α": r"\alpha ", "β": r"\beta ", "θ": r"\theta ", "μ": r"\mu ", "λ": r"\lambda ", "φ": r"\varphi ",
       "Δ": r"\Delta ", "≤": r"\le ", "≥": r"\ge ", "≠": r"\ne ", "≈": r"\approx ", "∞": r"\infty ",
       "±": r"\pm ", "∓": r"\mp ", "′": "'", "″": "''", "°": r"^{\circ}", "%": r"\%", "#": r"\#", "&": r"\&"}
ROOT_CH = "√∛∜"
ARG_CH = r"0-9A-Za-zÀ-ÿα-ωΑ-Ω,'′" + "".join(SUP) + "".join(SUB)
_ARG_RE = re.compile(f"[{ARG_CH}]+")
DOLLAR_RE = re.compile(r"\$\$(.+?)\$\$|(?<!\\)\$(?!\d[\d.,{}]*[,;:.]?\s+[^\W\d_]{2,})([^$\n]+?)\$(?!\w)", re.S)   # $$…$$ en bloque, $…$ en línea; no cierra delante de letra/cifra: «$45. You have $15» (dinero) no es fórmula, «p$K_a$» sí


def _balanced(s: str, i: int) -> int:
    """Índice del paréntesis que cierra el abierto en s[i], o -1."""
    depth = 0
    for j in range(i, len(s)):
        if s[j] == "(":
            depth += 1
        elif s[j] == ")":
            depth -= 1
            if depth == 0:
                return j
    return -1


def find_roots(s: str):
    """(inicio, fin, índice, argumento) de cada raíz escrita con símbolos."""
    out, i = [], 0
    while i < len(s):
        if s[i] not in ROOT_CH:
            i += 1
            continue
        start, idx = i, {"∛": "3", "∜": "4"}.get(s[i], "")
        k = i
        while k > 0 and s[k - 1] in SUP:       # ⁿ√a: índice escrito delante
            k -= 1
        if k < i and not idx:
            idx, start = "".join(SUP[c] for c in s[k:i]), k
        j = i + 1
        if j < len(s) and s[j] == "(":
            e = _balanced(s, j)
            if e < 0:
                i += 1
                continue
            out.append((start, e + 1, idx, s[j + 1:e]))
            i = e + 1
        else:
            m = _ARG_RE.match(s, j)
            if not m or not re.search(r"[0-9A-Za-zα-ω]", m.group(0)):
                i += 1
                continue
            arg = m.group(0).rstrip(",'")
            out.append((start, j + len(arg), idx, arg))
            i = j + len(arg)
    return out


def to_tex(s: str) -> str:
    """Texto matemático con símbolos Unicode → LaTeX."""
    parts, last = [], 0
    for a, b, idx, arg in find_roots(s):
        parts.append(_plain_tex(s[last:a]))
        parts.append((rf"\sqrt[{idx}]" if idx else r"\sqrt") + "{" + to_tex(arg) + "}")
        last = b
    parts.append(_plain_tex(s[last:]))
    return "".join(parts)


def _plain_tex(s: str) -> str:
    s = re.sub(f"[{''.join(SUP)}]+", lambda m: "^{" + "".join(SUP[c] for c in m.group(0)) + "}", s)
    s = re.sub(f"[{''.join(SUB)}]+", lambda m: "_{" + "".join(SUB[c] for c in m.group(0)) + "}", s)
    s = "".join(SYM.get(c, c) for c in s)
    s = re.sub(r"(\d),(\d)", r"\1{,}\2", s)                       # 2,5: coma decimal
    s = re.sub(r"(?<![\\A-Za-z])(sen|cos|tg|tan|ln|log|arcsen|arccos|arctg|lim)(?![A-Za-z])", r"\\operatorname{\1}", s)
    s = re.sub(r"(?<![\\{A-Za-z])([A-Za-zÁÉÍÓÚáéíóúñÑ]{3,})", r"\\text{\1}", s)
    return s


class Math:
    """Recoge fórmulas (LaTeX) mientras se generan las páginas y al final las
    convierte todas de una vez con KaTeX (Node.js)."""

    def __init__(self):
        self.items: list[tuple[str, bool]] = []
        self.index: dict[tuple[str, bool], int] = {}

    def mark(self, tex: str, display: bool = False) -> str:
        # KaTeX no admite «·» en modo texto (\text{N·m} sale como «N\cdotpm»): se saca fuera
        tex = re.sub(r"\\text\{([^{}]*·[^{}]*)\}", lambda m: r"\text{" + m.group(1).replace("·", r"}\cdot\text{") + "}", tex)
        key = (tex.strip(), display)
        if key not in self.index:
            self.index[key] = len(self.items)
            self.items.append(key)
        return f"{MARK}M{self.index[key]}{MARK}"

    # Raíces con símbolos en el texto visible de una página ya en HTML
    _SKIP = re.compile(r"^<(script|style|code|pre|title|textarea)\b", re.I)

    def roots_in_html(self, html: str) -> str:
        """Raíces con símbolos y $…$ / $$…$$ en el texto visible (p. ej. los
        ejercicios resueltos de muestra, que salen de los generadores)."""
        if not any(c in html for c in ROOT_CH + "$"):
            return html
        out, skip = [], None
        for tok in re.split(r"(<[^>]+>)", html):
            if tok.startswith("<"):
                m = self._SKIP.match(tok)
                if m and skip is None:
                    skip = m.group(1).lower()
                elif skip and re.match(rf"^</{skip}\b", tok, re.I):
                    skip = None
                out.append(tok)
            elif skip or not any(c in tok for c in ROOT_CH + "$"):
                out.append(tok)
            else:
                out.append(self._roots_text(tok))
        return "".join(out)

    def _roots_text(self, t: str) -> str:
        import html as _h
        raw = _h.unescape(t)
        if "$" in raw:
            out, last = [], 0
            for m in DOLLAR_RE.finditer(raw):
                out.append(self._roots_text(_h.escape(raw[last:m.start()], quote=False)))
                out.append(self.mark(m.group(1), True) if m.group(1) is not None else self.mark(m.group(2)))
                last = m.end()
            if last:
                out.append(self._roots_text(_h.escape(raw[last:], quote=False)))
                return "".join(out)
        found = find_roots(raw)
        if not found:
            return t
        parts, last = [], 0
        for a, b, idx, arg in found:
            parts.append(_h.escape(raw[last:a], quote=False))
            parts.append(self.mark((rf"\sqrt[{idx}]" if idx else r"\sqrt") + "{" + to_tex(arg) + "}"))
            last = b
        parts.append(_h.escape(raw[last:], quote=False))
        return "".join(parts)

    def render_all(self) -> list[str]:
        """HTML de KaTeX de cada fórmula, en orden."""
        if not self.items:
            return []
        js = (f"const k=require({json.dumps(str(KATEX_DIR / 'katex.min.js'))});"
              "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{"
              "const out=JSON.parse(d).map(([t,disp])=>{try{return k.renderToString(t,{displayMode:disp,throwOnError:false,strict:'ignore',output:'html'})}"
              "catch(e){return null}});process.stdout.write(JSON.stringify(out))});")
        r = subprocess.run(["node", "-e", js], input=json.dumps(self.items), capture_output=True, text=True, encoding="utf-8")
        if r.returncode:
            raise RuntimeError("KaTeX (Node.js): " + r.stderr[-2000:])
        return json.loads(r.stdout)

    def fill(self, html: str, rendered: list[str]) -> str:
        def rep(m):
            n = int(m.group(1))
            h = rendered[n] if n < len(rendered) else None
            tex, disp = self.items[n]
            if not h:
                import html as _h
                return f'<code class="wa-tex">{_h.escape(tex)}</code>'
            return f'<div class="wa-math">{h}</div>' if disp else h
        html = re.sub(f"<p>\\s*({MARK}M\\d+{MARK})\\s*</p>", r"\1", html)   # $$…$$ sola en su párrafo
        # Dentro de etiquetas (atributos como content="…" o title="…"), texto plano
        out = []
        for tok in re.split(r"(<[^>]*>)", html):
            if tok.startswith("<"):
                out.append(re.sub(f"{MARK}M(\\d+){MARK}", lambda m: self.plain_tex(int(m.group(1)), attr=True), tok))
            else:
                out.append(re.sub(f"{MARK}M(\\d+){MARK}", rep, tok))
        return "".join(out)

    def plain_tex(self, n: int, attr: bool = False) -> str:
        """Una fórmula como texto legible (para atributos, búsqueda y resúmenes)."""
        import html as _h
        t = self.items[n][0]
        t = re.sub(r"\\(?:operatorname|text|mathrm)\{([^}]*)\}", r"\1", t)
        t = re.sub(r"\\(?:left|right|,|;|!|quad|qquad)", " ", t)
        t = t.replace("\\cdot", "·").replace("\\times", "×").replace("\\le", "≤").replace("\\ge", "≥").replace("\\infty", "∞").replace("\\pi", "π")
        t = re.sub(r"\\[a-zA-Z]+", "", t).replace("{", "").replace("}", "")
        t = re.sub(r"\s+", " ", t).strip()
        return _h.escape(t, quote=True) if attr else t

    def plain(self, s: str) -> str:
        """Quita los marcadores de un texto que no es HTML (búsqueda, resúmenes)."""
        return re.sub(f"{MARK}M(\\d+){MARK}", lambda m: self.plain_tex(int(m.group(1))), s) if isinstance(s, str) else s
