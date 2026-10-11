#!/usr/bin/env python3
"""Quadra Abjad, analyse du lexique : cases libres, paires minimales, ancien schéma."""
import sys
from quadra import CONS, VOW, QuadraError, load_lexique, syllables, is_word, quadra_to_num

CLASSES = {"A": "nom", "E": "personne", "I": "verbe", "O": "adjectif"}


def free_cells(path=None):
    """Cases libres de la grille 2 syllabes, hors bloc O-O (mots outils)."""
    lex = {w for w, _, _ in load_lexique(*(p for p in [path] if p))}
    cells = [c1 + v1 + c2 + v2 for c1 in CONS for c2 in CONS for v1 in VOW for v2 in VOW]
    return [c for c in cells if c not in lex]


RISK = {3: "classe differente, la syntaxe separe",
        2: "meme classe, champ different, le contexte separe",
        1: "meme champ, meme classe, meme place dans la phrase"}


def pair_risk(a, b):
    """1 = fort (même champ, même classe), 2 = moyen (même classe), 3 = faible."""
    if a[3] != b[3]:
        return 3
    return 1 if a[0] + a[2] == b[0] + b[2] else 2


def minimal_pairs(path=None, length=2):
    """Paires de mots de même longueur qui ne diffèrent que d'une lettre, avec risque."""
    rows = load_lexique(*(p for p in [path] if p))
    words = [w for w, _, _ in rows if "-" not in w and len(w) == 2 * length]
    sens = {w: s for w, _, s in rows}
    out = []
    for i, a in enumerate(words):
        for b in words[i + 1:]:
            diff = [k for k in range(len(a)) if a[k] != b[k]]
            if len(diff) == 1:
                out.append((a, sens[a], b, sens[b], pair_risk(a, b)))
    return sorted(out, key=lambda r: r[4])


def legacy_collisions(path=None):
    """Mots qui liraient comme un nombre si les nombres s'écrivaient en syllabes A."""
    out = []
    for word, _, sens in load_lexique(*(p for p in [path] if p)):
        if is_word(word) and "-" not in word and all(s[1] == "A" for s in syllables(word)):
            out.append((word, quadra_to_num("".join(s[0] for s in syllables(word))), sens))
    return out


def propose(root, cls, angle=None, path=None):
    """Formes libres pour un nouveau mot : cases de 2 syllabes du champ de la
    racine, puis racine + angle + voyelle de classe (3 syllabes)."""
    root = root.upper()
    if len(syllables(root)) != 2:
        raise QuadraError(f"{root}: la racine doit avoir 2 syllabes")
    v = {c: vv for vv, c in CLASSES.items()}.get(cls.lower(), cls.upper())
    if v not in VOW:
        raise QuadraError(f"{cls}: classe attendue nom, personne, verbe ou adjectif")
    rows = load_lexique(*(p for p in [path] if p))
    sens = {w: s for w, _, s in rows}
    short = [root[0] + v1 + root[2] + v for v1 in VOW if not (v1 == "O" and v == "O")]
    long_ = [root + c + v for c in (angle.upper() if angle else CONS)]
    return [(f, sens.get(f)) for f in short], [(f, sens.get(f)) for f in long_]


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    if cmd == "propose":
        if len(argv) < 4:
            print("usage : propose RACINE CLASSE [ANGLE]   ex. propose SOLA nom K")
            return 1
        short, long_ = propose(argv[2], argv[3], argv[4] if len(argv) > 4 else None)
        print("2 syllabes, même champ :")
        for f, s_ in short:
            print(f"  {f}  {'libre' if s_ is None else 'pris : ' + s_}")
        print("3 syllabes, racine + angle + classe :")
        for f, s_ in long_:
            print(f"  {f}  {'libre' if s_ is None else 'pris : ' + s_}")
        return 0
    if cmd == "free":
        free = free_cells()
        for cls_v in VOW:
            cells = [c for c in free if c[3] == cls_v and not (c[1] == "O" and c[3] == "O")]
            print(f"{CLASSES[cls_v]:<9} {len(cells):>3} libres : {' '.join(cells)}")
        oo = [c for c in free if c[1] == "O" and c[3] == "O"]
        print(f"outils O-O {len(oo):>3} libres : {' '.join(oo)}")
    elif cmd == "pairs":
        pairs = minimal_pairs()
        level = int(argv[2]) if len(argv) > 2 else 1
        for a, sa, b, sb, r in pairs:
            if r <= level:
                print(f"risque {r}  {a} ({sa})  /  {b} ({sb})")
        for r in (1, 2, 3):
            print(f"risque {r} : {sum(1 for x in pairs if x[4] == r):>3}  {RISK[r]}")
        print(f"{len(pairs)} paires minimales. 'pairs 2' ou 'pairs 3' pour tout voir.")
    elif cmd == "legacy":
        for w, n, s in legacy_collisions():
            print(f"{w} = {n} en ancien schéma ({s})")
    else:
        print(__doc__)
        print("commandes : free | pairs | legacy | propose RACINE CLASSE [ANGLE]")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
