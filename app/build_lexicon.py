#!/usr/bin/env python3
"""Génère data/lexique.json depuis ../lexique.tsv."""
import json, csv
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "lexique.tsv"
OUT = Path(__file__).resolve().parent / "data" / "lexique.json"
CLS = {"A": "nom", "E": "personne", "I": "verbe", "O": "adjectif"}

def classify(word, domain):
    if "-" in word: return "compose", ""
    if domain == "grammaire": return "particule", ""
    if domain == "outil": return "outil", word[0] + word[2]
    if len(word) >= 4: return CLS[word[-1]], word[0] + word[2]
    return "particule", ""

rows = []
with SRC.open(encoding="utf-8") as f:
    for i, r in enumerate(csv.DictReader(f, delimiter="\t")):
        w = r["mot"].strip()
        cls, field = classify(w, r["domaine"].strip())
        parts = w.replace("'", "-").split("-")
        syl = [p[j:j + 2] for p in parts for j in range(0, len(p), 2)]
        rows.append({"id": i, "word": w, "domain": r["domaine"].strip(), "sense": r["sens"].strip(),
                     "cls": cls, "field": field, "syllables": syl})
OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=0), encoding="utf-8")
from collections import Counter
print(len(rows), "entrées", dict(Counter(r["cls"] for r in rows)))
