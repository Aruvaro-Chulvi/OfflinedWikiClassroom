"""WikiAula — vista previa local de las páginas compiladas (sin ZIM).

    python wikiaula/preview.py [lang] [puerto] [carpeta de salida de build.py]   → http://127.0.0.1:8092/Portada
    (la portada de cada idioma: Portada, Main_Page…)

Sirve dist/wikiaula/site_<lang>/ igual que kiwix-serve: las rutas no llevan
extensión (Portada → Portada.html).
"""
import http.server
import re
import sys
import urllib.parse
from pathlib import Path

lang = sys.argv[1] if len(sys.argv) > 1 else "es"
port = int(sys.argv[2]) if len(sys.argv) > 2 else 8092
ROOT = (Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else Path(__file__).resolve().parent.parent / "dist" / "wikiaula") / f"site_{lang}"


def home_page() -> str:
    """Portada del idioma (Portada, Main_Page…): la que build.py puso en _aula/data.js."""
    try:
        m = re.search(r'"home":"([^"]+)"', (ROOT / "_aula" / "data.js").read_text(encoding="utf-8"))
        return m.group(1) if m else "Portada"
    except OSError:
        return "Portada"


HOME = home_page()


class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def send_head(self):
        p = urllib.parse.unquote(urllib.parse.urlsplit(self.path).path).lstrip("/")
        if not p:
            self.send_response(302)
            self.send_header("Location", "/" + urllib.parse.quote(HOME))
            self.end_headers()
            return None
        f = ROOT / p
        if not f.is_file() and (ROOT / (p + ".html")).is_file():
            self.path = "/" + urllib.parse.quote(p + ".html")
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


print(f"WikiAula ({lang}) en http://127.0.0.1:{port}/{urllib.parse.quote(HOME)}")
http.server.ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
