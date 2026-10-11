#!/usr/bin/env python3
"""Extrait de ../GRAMMAIRE.md les phrases en code inline avec leur traduction.
Garde celles dont tous les mots sont dans data/lexique.json et les écrit
dans data/phrases.json. Usage : python3 build_phrases.py"""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
GRAMMAIRE = HERE.parent / "GRAMMAIRE.md"
LEXIQUE = HERE / "data" / "lexique.json"
OUT = HERE / "data" / "phrases.json"

SPAN = re.compile(r"`([^`]+)`([^`]*)")


def translation(tail):
    """Texte après le code, jusqu'à la fin de la phrase française."""
    tail = tail.split("\n")[0]
    t = re.split(r"\.(?:\s|$)", tail.strip(), maxsplit=1)[0]
    t = re.sub(r"\s+", " ", t).strip(" ,;:")
    return "" if re.search(r"\b[A-Z]{2,}\b", t) else t


def main():
    words = {e["word"] for e in json.loads(LEXIQUE.read_text(encoding="utf-8"))}
    # Un bloc = un paragraphe ou un point de liste, lignes jointes.
    text = re.sub(r"\n(?!\s*\n|\d+\. |\|)", " ", GRAMMAIRE.read_text(encoding="utf-8"))
    seen, out = set(), []
    for quadra, tail in SPAN.findall(text):
        fr = translation(tail)
        toks = quadra.split()
        if not fr or quadra in seen:
            continue
        if not all(t in words for t in toks):
            continue
        seen.add(quadra)
        out.append({"quadra": quadra, "francais": fr})
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{len(out)} phrases -> {OUT}")


if __name__ == "__main__":
    main()
