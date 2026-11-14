"""Pies de figura en MAYÚSCULAS sin estropear los símbolos.

El pie de arriba de cada figura se escribe en mayúsculas (CSS text-transform), pero hay símbolos
que cambian de significado si cambian de caja: variables (x, n, f′ ≠ F′), unidades (cm, kg, mL),
fórmulas químicas (NaCl, pH, Kw), funciones (log, sen)… `caps_safe()` los envuelve en
<span class="nc"> para que conserven su forma (minúsculas de verdad con Patrick Hand normal)."""
import re

# unidades (del SI y de uso escolar)
UNITS = set("""km/h m/s² m/s mol/L g/mol g/L g/mL g/cm³ kg/m³ kg/L N/m J/s m³/s L/min L/h km/L
kWh kJ kcal cal hPa kPa Pa atm mmHg mol mmol mL ml cL cl dL dl L l km² km hm² hm dam dm³ dm² dm
cm³ cm² cm mm² mm mm³ nm μm µm m² m³ m kg mg g t h min ms s °C ºC °F K J W kW MW N kN V mV mA A Ω Hz kHz
MHz eV keV MeV GeV ha € ct cts ppm""".split())
# …las que también son palabras solo cuentan como unidad detrás de un número
UNIT_WORDS = {"ha", "cal", "min", "ct", "Pa", "t", "h", "s", "m", "g", "l", "L", "N", "K", "J", "W", "V", "A"}
# palabras de una letra del castellano (las demás letras sueltas son variables o puntos)
WORD1 = set("aeouyAEOUY")
# nombres de funciones y símbolos con minúsculas que importan
NAMES = {"log", "ln", "sen", "cos", "tan", "tg", "lim", "pH", "pOH", "pKa", "Kw", "Ka", "Kb", "Kc", "Kp", "Ks",
         "Kps", "Ksp", "máx", "mín", "dx", "dt", "dy", "dv", "du", "ab", "bd", "mx", "sp", "udd", "uud", "fem"}
# símbolos químicos de dos letras (sin los que también son palabras al empezar una frase)
ELEMENTS = set("""He Li Be Ne Na Mg Cl Ar Ca Sc Ti Cr Mn Fe Co Cu Zn Ga Ge Br Kr Rb Sr Zr Nb Mo Tc Ru Rh Pd
Ag Cd In Sn Sb Xe Cs Ba Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta Pt Au Hg Tl Pb Bi Po At Rn Fr Ra
Ac Th Pu Am Cm Bk Cf Fm Md""".split())
OPS = set("=+−-·×/<>≤≥±→⇌≈≠∶:")
SPECIAL = re.compile(r"[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿⁱ⁻⁺₀₁₂₃₄₅₆₇₈₉₊₋ₐ-ₜʰ-˿ᴬ-ᵪ′″√∫∑∞∆Ͱ-Ͽ]")
EDGE = "¿?¡!«»\"“”'‘’.,;:()[]…"
_SPLIT = re.compile(r"(\x01M\d+\x01|<[^>]+>|\[\[.*?\]\]|&#?\w+;)")
_PROB = re.compile(r"^([A-Za-z])\(([a-záéíóúñ]{3,})\)$")     # P(azul): solo la P


def _op(w: str, end: bool) -> bool:
    """¿Hay un operador junto a la palabra? («y = 2x», «a + b»; el guion de «cis-» no cuenta)"""
    if not w:
        return False
    if w in OPS:
        return True
    c = w[-1] if end else w[0]
    return c in OPS - {"-"}


def _protect(core: str, prev: str, nxt: str) -> bool:
    if not core or not re.search(r"[A-Za-zÀ-ÿͰ-Ͽ]", core):
        return False
    if core in NAMES or core.split("(")[0] in NAMES or core in ELEMENTS:
        return True
    if SPECIAL.search(core):
        return True
    if re.search(r"\d", core) and re.search(r"[A-Za-z]", core):        # 2x, H2, but-2-eno, x1
        return True
    if re.search(r"[A-Za-z]\(", core):                                 # f(x), P(A)
        return True
    if any(re.search(r".[A-Z]", p) and re.search(r"[a-z]", p) for p in core.split("-")):
        return True                                                     # NaCl, HCl (no «Born-Haber»)
    if re.search(r"[A-Za-z][–·_][A-Za-z]", core):                      # v–t, F·v, v_p
        return True
    if re.match(r"^[−+][A-Za-z]{1,3}$", core):                         # −x, −bd, +x
        return True
    if core in UNITS and (core not in UNIT_WORDS or re.search(r"\d[.,]?$", prev) or prev in ("½", "¼", "¾")):
        return True
    if "/" in core and all(p in UNITS or p.rstrip("²³") in UNITS for p in core.split("/") if p):
        return True                                                     # m/s, km/h
    if len(core) == 1:
        if core not in WORD1:
            return True                                                 # x, n, f, P, b…
        return _op(prev, True) or _op(nxt, False)
    return False


def _text(seg: str) -> str:
    toks = re.split(r"(\s+)", seg)
    words = [i for i, t in enumerate(toks) if t and not t.isspace()]
    out = list(toks)
    for k, i in enumerate(words):
        t = toks[i]
        lead = len(t) - len(t.lstrip(EDGE))
        trail = len(t) - len(t.rstrip(EDGE))
        core = t[lead:len(t) - trail] if trail else t[lead:]
        # «f(x)» o «P(A)»: el paréntesis final es parte del símbolo
        if trail and core and re.search(r"[A-Za-z]\([^()]*$", core) and t[len(t) - trail] == ")":
            core += ")"
            trail -= 1
        prev = toks[words[k - 1]].rstrip(EDGE) if k else ""
        nxt = toks[words[k + 1]].lstrip(EDGE) if k + 1 < len(words) else ""
        m = _PROB.match(core)
        if m:      # en P(azul) la palabra va en mayúsculas como el resto: solo se protege la P
            out[i] = t[:lead] + f'<span class="nc">{m.group(1)}</span>' + t[lead + 1:]
        elif _protect(core, prev, nxt):
            out[i] = t[:lead] + f'<span class="nc">{core}</span>' + t[lead + len(core):]
    return "".join(out)


def caps_safe(html: str) -> str:
    parts = _SPLIT.split(html)
    return "".join(p if i % 2 else _text(p) for i, p in enumerate(parts))


if __name__ == "__main__":
    for s in ["Triángulo de Pascal: la fila n contiene los números combinatorios de n sobre 0 a n sobre n.",
              "Ejemplo 2 a escala: objeto de 4 cm a 30 cm de una lente convergente de f′ = 10 cm.",
              "La gráfica de y = x⁴ − 5x² + 4 tiene forma de W y corta al eje.",
              "Escala de pH con valores típicos. H₂ + I₂ ⇌ 2 HI a 448 °C, 1 mol/L.",
              "El gato está encima de la mesa y la pelota, debajo.",
              "La recta que pasa por P con dirección d: λ = 0 da P, λ = 1 da P + d.",
              "cis- y trans-but-2-eno. y = 2ˣ e y = log₂ x; f(x) crece; 1 m y 30 cm.",
              "Ciclo de Born-Haber del NaCl; de km a hm; la gráfica v–t; P(azul) = 3/8; −x y vₒ; Na y Ar.",
              "Si no hay sal, la cal ha subido 3 ha. La ley de Gay-Lussac."]:
        print(caps_safe(s))
