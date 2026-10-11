#!/usr/bin/env python3
"""Quadra Abjad: validation, encodage base 4, nombres, glose.

Règles (voir SPEC.md) :
- syllabe = consonne + voyelle, valeur 4*c + v (0..15)
- mot = 1 à 4 syllabes, jamais de consonne nue
- nombre = consonnes nues, base 4, poids fort à gauche
"""
import sys
from pathlib import Path

CONS = "MSKL"
VOW = "AEIO"
MAX_SYL = 4
LEXIQUE = Path(__file__).with_name("lexique.tsv")


class QuadraError(ValueError):
    pass


# ---------- mots ----------

def syllables(word):
    """Découpe un mot en syllabes CV. Lève QuadraError si invalide."""
    w = word.upper()
    if not w:
        raise QuadraError("mot vide")
    if len(w) % 2:
        raise QuadraError(f"{w}: consonne nue dans un mot (longueur impaire)")
    out = []
    for i in range(0, len(w), 2):
        c, v = w[i], w[i + 1]
        if c not in CONS or v not in VOW:
            raise QuadraError(f"{w}: syllabe invalide '{c}{v}' en position {i // 2 + 1}")
        out.append(c + v)
    if len(out) > MAX_SYL:
        raise QuadraError(f"{w}: {len(out)} syllabes, maximum {MAX_SYL}")
    return out


def is_word(word):
    try:
        syllables(word)
        return True
    except QuadraError:
        return False


def encode(word):
    """Retourne (chiffres base 4, chaîne hex, octets)."""
    syls = syllables(word)
    vals = [4 * CONS.index(s[0]) + VOW.index(s[1]) for s in syls]
    base4 = "".join(f"{CONS.index(s[0])}{VOW.index(s[1])}" for s in syls)
    hexs = "".join(f"{v:x}" for v in vals)
    padded = vals + [0] * (len(vals) % 2)
    data = bytes(16 * padded[i] + padded[i + 1] for i in range(0, len(padded), 2))
    return base4, hexs, data


def decode_hex(hexs):
    """Hex -> mot. Chaque chiffre hex est une syllabe."""
    return "".join(CONS[int(h, 16) // 4] + VOW[int(h, 16) % 4] for h in hexs)


# ---------- nombres ----------

def num_to_quadra(n):
    if n < 0:
        raise QuadraError("pas de nombres négatifs")
    if n == 0:
        return CONS[0]
    digits = []
    while n:
        digits.append(CONS[n % 4])
        n //= 4
    return "".join(reversed(digits))


def quadra_to_num(s):
    s = s.upper()
    if not s or any(ch not in CONS for ch in s):
        raise QuadraError(f"{s}: un nombre n'a que des consonnes nues")
    n = 0
    for ch in s:
        n = 4 * n + CONS.index(ch)
    return n


def legacy_number_value(word):
    """Valeur du mot si les nombres s'écrivaient en syllabes (ancien schéma).
    Sert à montrer les collisions évitées."""
    return quadra_to_num("".join(s[0] for s in syllables(word)))


# ---------- lexique ----------

def load_lexique(path=LEXIQUE):
    rows = []
    for ln, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if ln == 1 or not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) != 3:
            raise QuadraError(f"{path.name}:{ln}: attendu 3 colonnes, trouvé {len(parts)}")
        rows.append((parts[0].strip().upper(), parts[1].strip(), parts[2].strip()))
    return rows


def check(path=LEXIQUE):
    """Retourne la liste des problèmes. Vide = lexique sain."""
    problems, seen = [], {}
    for word, dom, sens in load_lexique(path):
        try:
            syllables(word)
        except QuadraError as e:
            problems.append(str(e))
            continue
        if word in seen:
            problems.append(f"{word}: doublon ({seen[word]} / {sens})")
        seen[word] = sens
    return problems


def legacy_collisions(path=LEXIQUE):
    """Mots qui liraient comme un nombre si les nombres étaient en syllabes A."""
    out = []
    for word, _, sens in load_lexique(path):
        if is_word(word) and all(s[1] == "A" for s in syllables(word)):
            out.append((word, legacy_number_value(word), sens))
    return out


def gloss(sentence, path=LEXIQUE):
    lex = {w: s for w, _, s in load_lexique(path)}
    out = []
    for tok in sentence.split():
        t = tok.upper()
        if all(ch in CONS for ch in t):
            out.append((t, f"nombre {quadra_to_num(t)}"))
        elif not is_word(t):
            out.append((t, "INVALIDE"))
        else:
            out.append((t, lex.get(t, "INCONNU")))
    return out



# ---------- cli ----------

def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    arg = " ".join(argv[2:])
    if cmd == "check":
        pb = check()
        print("\n".join(pb) if pb else "lexique ok")
        col = legacy_collisions()
        if col:
            print("\ncollisions évitées par la règle des consonnes nues :")
            for w, n, s in col:
                print(f"  {w} = {n} en ancien schéma ({s})")
        return 1 if pb else 0
    if cmd == "encode":
        b4, hx, data = encode(arg)
        print(f"base4 {b4}  hex {hx}  octets {data.hex(' ')}")
    elif cmd == "decode":
        print(decode_hex(arg))
    elif cmd == "num":
        print(num_to_quadra(int(arg)))
    elif cmd == "parse":
        print(quadra_to_num(arg))
    elif cmd == "gloss":
        for tok, sens in gloss(arg):
            print(f"{tok:<8} {sens}")
    elif cmd in ("bits", "unbits"):
        import quadra_bits
        return quadra_bits.main(argv)
    else:
        print(__doc__)
        print("commandes : check | encode MOT | decode HEX | num N | parse CHIFFRES | gloss PHRASE | bits PHRASE | unbits HEX")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv))
    except QuadraError as e:
        print(f"erreur : {e}", file=sys.stderr)
        sys.exit(2)
