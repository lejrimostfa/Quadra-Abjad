#!/usr/bin/env python3
"""Quadra Abjad, flux binaire (option 1 de SPEC.md, section 4).

flux   = bourrage(3 bits) + jetons + zéros de bourrage (aligné sur l'octet)
mot    = 0 + (nb syllabes - 1 sur 2 bits) + 4 bits par syllabe
nombre = 1 + (nb chiffres - 1 sur 3 bits) + 2 bits par chiffre
"""
import sys
from quadra import CONS, VOW, MAX_SYL, QuadraError, syllables, num_to_quadra

MAX_DIGITS = 8  # 3 bits de longueur, donc 1 à 8 chiffres, 0 à 65535


def _is_number(tok):
    return all(ch in CONS for ch in tok)


def token_bits(tok):
    """Jeton (mot ou nombre) vers chaîne de bits, sans bourrage."""
    t = tok.upper()
    if _is_number(t):
        if len(t) > MAX_DIGITS:
            raise QuadraError(f"{t}: {len(t)} chiffres, maximum {MAX_DIGITS}")
        return "1" + f"{len(t) - 1:03b}" + "".join(f"{CONS.index(c):02b}" for c in t)
    syls = syllables(t)
    body = "".join(f"{CONS.index(s[0]):02b}{VOW.index(s[1]):02b}" for s in syls)
    return "0" + f"{len(syls) - 1:02b}" + body


def bits(sentence):
    """Phrase vers chaîne de bits alignée sur l'octet."""
    body = "".join(token_bits(t) for t in sentence.split())
    pad = (-(3 + len(body))) % 8
    return f"{pad:03b}" + body + "0" * pad


def to_bytes(sentence):
    b = bits(sentence)
    return bytes(int(b[i:i + 8], 2) for i in range(0, len(b), 8))


def unbits(stream):
    """Chaîne de bits ou hex vers phrase."""
    s = stream.strip().replace(" ", "")
    if not set(s) <= {"0", "1"}:
        s = "".join(f"{int(h, 16):04b}" for h in s)
    if len(s) < 3:
        raise QuadraError("flux trop court")
    pad = int(s[:3], 2)
    body = s[3:len(s) - pad] if pad else s[3:]
    out, i = [], 0
    while i < len(body):
        if body[i] == "0":
            n = int(body[i + 1:i + 3], 2) + 1
            payload, i = body[i + 3:i + 3 + 4 * n], i + 3 + 4 * n
            if len(payload) != 4 * n:
                raise QuadraError("flux tronqué dans un mot")
            out.append("".join(CONS[int(payload[j:j + 2], 2)] + VOW[int(payload[j + 2:j + 4], 2)]
                               for j in range(0, len(payload), 4)))
        else:
            n = int(body[i + 1:i + 4], 2) + 1
            payload, i = body[i + 4:i + 4 + 2 * n], i + 4 + 2 * n
            if len(payload) != 2 * n:
                raise QuadraError("flux tronqué dans un nombre")
            out.append("".join(CONS[int(payload[j:j + 2], 2)] for j in range(0, len(payload), 2)))
    return " ".join(out)


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    arg = " ".join(argv[2:])
    if cmd == "bits":
        b, data = bits(arg), to_bytes(arg)
        print("bits  ", " ".join(b[i:i + 8] for i in range(0, len(b), 8)))
        print("hex   ", data.hex(" "))
        print(f"taille {len(data)} octets, contre {len(arg.encode())} en ASCII")
    elif cmd == "unbits":
        print(unbits(arg))
    else:
        print(__doc__)
        print("commandes : bits PHRASE | unbits HEX_OU_BITS")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv))
    except QuadraError as e:
        print(f"erreur : {e}", file=sys.stderr)
        sys.exit(2)
