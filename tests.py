#!/usr/bin/env python3
"""Tests de quadra.py et quadra_bits.py. Lancer : python3 tests.py"""
from quadra import (syllables, encode, decode_hex, is_word, num_to_quadra,
                    quadra_to_num, check, gloss)
from quadra_bits import bits, to_bytes, unbits, token_bits
from quadra_lex import free_cells, minimal_pairs


def test_mots():
    assert syllables("MISE") == ["MI", "SE"]
    assert encode("MISE") == ("0211", "25", b"\x25")
    assert encode("MA") == ("00", "0", b"\x00")
    assert decode_hex("25") == "MISE"
    for w in ("MAS", "MASII", "XA", "", "MAMAMAMAMA"):
        assert not is_word(w), w


def test_nombres():
    assert num_to_quadra(0) == "M" and num_to_quadra(10) == "KK"
    assert num_to_quadra(255) == "LLLL" and quadra_to_num("SMM") == 16
    for n in (0, 1, 4, 5, 63, 1000):
        assert quadra_to_num(num_to_quadra(n)) == n


def test_lexique():
    assert check() == []
    g = gloss("KALE LASI KK")
    assert "chef" in g[0][1] and g[2][1] == "nombre 10"


def test_bits():
    assert token_bits("MA") == "0" + "00" + "0000"
    assert token_bits("MISE") == "0" + "01" + "0010" + "0101"
    assert token_bits("KK") == "1" + "001" + "10" + "10"
    assert len(bits("MA")) == 16 and len(to_bytes("MISE")) == 2
    phrases = ["MA", "MISE KELI LOMA KAMA KA MAMA KILO", "KAMO KK", "M",
               "MI KO ME SAKE KA LEKI", "MAMAMAMA LLLLLLLL SA"]
    for p in phrases:
        assert unbits(bits(p)) == p, p
        assert unbits(to_bytes(p).hex()) == p, p
    assert unbits(bits("KAMO " + num_to_quadra(2026))) == "KAMO " + num_to_quadra(2026)
    assert unbits(bits("MAMA-MAKI SE")) == "MAMA-MAKI SE"
    assert unbits(bits("MI MILI-LAKA")) == "MI MILI-LAKA"


def test_composes():
    assert is_word("MAMA-MAKI") and is_word("MAMA'MAKI") and not is_word("MAMA-")
    g = gloss("MAMA-MAKI MAMA'MAKI")
    assert g[0][0] == "MAMA-MAKI" and g[1][0] == "MAMA-MAKI"


def test_lex():
    assert all(c[3] != "A" for c in free_cells())
    assert all(len(a) == 4 for a, _, b, _ in minimal_pairs())


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
            print(f"{name} ok")
