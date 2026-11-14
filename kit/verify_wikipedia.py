"""Offlined WikiAula — comprueba los enlaces a Wikipedia.

build.py ya comprueba cada título en la Wikipedia sin conexión del idioma
(Offlined Data/Wikis/content/wikipedia_<lang>_*.zim): enlaza al artículo de
destino si es una redirección y quita los que no existen. Este script hace la
comprobación extra que el ZIM no permite: con --online pregunta a
<lang>.wikipedia.org si algún título es una página de DESAMBIGUACIÓN (o de un
espacio que no va en los ZIM, como «Anexo:»). Sin --online solo repasa la lista
contra el ZIM local. build.py deja la lista en dist/wikiaula/wikipedia_titles_<lang>.txt.

    wikiaula/.venv/Scripts/python wikiaula/verify_wikipedia.py es [--online]
"""
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
lang = args[0] if args else "es"
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
out = Path(opts["out"]).resolve() if opts.get("out") else Path(__file__).resolve().parent.parent / "dist" / "wikiaula"
src = out / f"wikipedia_titles_{lang}.txt"
titles = [t for t in src.read_text(encoding="utf-8").splitlines() if t.strip()]
bad = 0
if "--online" not in sys.argv:
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from build import WikiIndex, WIKIS
    w = WikiIndex(lang, Path(opts["wikis"]).resolve() if opts.get("wikis") else WIKIS)
    if not w.file:
        print(f"No hay Wikipedia «{lang}» sin conexión en {WIKIS}"); sys.exit(1)
    for t in titles:
        c = w.canonical(t)
        if c is None:
            print(f"NO EXISTE      {t}"); bad += 1
        elif c != t:
            print(f"REDIRECCIÓN    {t} → {c}"); bad += 1
    print(f"{len(titles)} títulos, {bad} con problemas (comprobados en {w.file})")
    sys.exit(1 if bad else 0)
for i in range(0, len(titles), 50):
    chunk = titles[i:i + 50]
    q = urllib.parse.urlencode({"action": "query", "format": "json", "formatversion": "2", "prop": "info|pageprops",
                                "ppprop": "disambiguation", "titles": "|".join(chunk)})
    req = urllib.request.Request(f"https://{lang}.wikipedia.org/w/api.php?{q}", headers={"User-Agent": "WikiAula-build/1.0 (https://www.offlined.org/)"})
    data = json.loads(urllib.request.urlopen(req, timeout=30).read().decode("utf-8"))
    norm = {n["from"]: n["to"] for n in data["query"].get("normalized", [])}
    pages = {p["title"]: p for p in data["query"]["pages"]}
    for t in chunk:
        p = pages.get(norm.get(t, t), {})
        if re.match(r"^(Anexo|Categoría|Portal|Wikipedia|Ayuda|Plantilla|Category|Appendix|Help|Template):", t):
            print(f"FUERA DEL ZIM  {t} (los ZIM de Wikipedia solo llevan artículos)"); bad += 1
        elif p.get("missing"):
            print(f"NO EXISTE      {t}"); bad += 1
        elif p.get("redirect"):
            print(f"REDIRECCIÓN    {t}"); bad += 1
        elif "pageprops" in p and "disambiguation" in p["pageprops"]:
            print(f"DESAMBIGUACIÓN {t}"); bad += 1
        elif norm.get(t, t) != t:
            print(f"NORMALIZADO    {t} → {norm[t]}"); bad += 1
print(f"{len(titles)} títulos, {bad} con problemas")
sys.exit(1 if bad else 0)
