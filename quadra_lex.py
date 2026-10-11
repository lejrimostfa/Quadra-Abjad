#!/usr/bin/env python3
"""Quadra Abjad, analyse du lexique : cases libres, paires minimales, ancien schéma."""
import sys
from quadra import CONS, VOW, load_lexique, syllables, is_word, quadra_to_num

CLASSES = {"A": "nom", "E": "personne", "I": "verbe", "O": "adjectif"}


def free_cells(path=None):
    """Cases libres de la grille 2 syllabes, hors bloc O-O (mots outils)."""
    lex = {w for w, _, _ in load_lexique(*(p for p in [path] if p))}
    cells = [c1 + v1 + c2 + v2 for c1 in CONS for c2 in CONS for v1 in VOW for v2 in VOW]
    return [c for c in cells if c not in lex]


def minimal_pairs(path=None, length=2):
    """Paires de mots de même longueur qui ne diffèrent que d'une lettre."""
    words = [w for w, _, _ in load_lexique(*(p for p in [path] if p))
             if "-" not in w and len(w) == 2 * length]
    sens = {w: s for w, _, s in load_lexique(*(p for p in [path] if p))}
    out = []
    for i, a in enumerate(words):
        for b in words[i + 1:]:
            diff = [k for k in range(len(a)) if a[k] != b[k]]
            if len(diff) == 1:
                out.append((a, sens[a], b, sens[b]))
    return out


def legacy_collisions(path=None):
    """Mots qui liraient comme un nombre si les nombres s'écrivaient en syllabes A."""
    out = []
    for word, _, sens in load_lexique(*(p for p in [path] if p)):
        if is_word(word) and "-" not in word and all(s[1] == "A" for s in syllables(word)):
            out.append((word, quadra_to_num("".join(s[0] for s in syllables(word))), sens))
    return out


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    if cmd == "free":
        free = free_cells()
        for cls_v in VOW:
            cells = [c for c in free if c[3] == cls_v and not (c[1] == "O" and c[3] == "O")]
            print(f"{CLASSES[cls_v]:<9} {len(cells):>3} libres : {' '.join(cells)}")
        oo = [c for c in free if c[1] == "O" and c[3] == "O"]
        print(f"outils O-O {len(oo):>3} libres : {' '.join(oo)}")
    elif cmd == "pairs":
        pairs = minimal_pairs()
        for a, sa, b, sb in pairs:
            print(f"{a} ({sa})  /  {b} ({sb})")
        print(f"{len(pairs)} paires minimales entre mots de 2 syllabes")
    elif cmd == "legacy":
        for w, n, s in legacy_collisions():
            print(f"{w} = {n} en ancien schéma ({s})")
    else:
        print(__doc__)
        print("commandes : free | pairs | legacy")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
