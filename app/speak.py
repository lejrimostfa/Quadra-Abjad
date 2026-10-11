#!/usr/bin/env python3
"""Assemble les clips de audio/ pour prononcer une phrase Quadra.

python3 speak.py "KALE LASI" [--out fichier.wav] [--play]
Mot : syllabes enchaînées, silence coupé aux bords, fondu de 10 ms.
Espace : pause de 180 ms. Tiret : pause de 60 ms. Nombre : consonnes nues.
"""
import sys, wave, array
from pathlib import Path

AUDIO = Path(__file__).with_name("audio")
RATE = 22050
PAUSE_WORD, PAUSE_JOIN, PAUSE_SYL = 0.18, 0.06, 0.02
FADE = int(0.010 * RATE)
THRESH = 400  # seuil de silence sur 16 bits


def load(name):
    with wave.open(str(AUDIO / f"{name}.wav"), "rb") as w:
        assert w.getframerate() == RATE and w.getnchannels() == 1 and w.getsampwidth() == 2
        a = array.array("h", w.readframes(w.getnframes()))
    i, j = 0, len(a)
    while i < j and abs(a[i]) < THRESH: i += 1
    while j > i and abs(a[j - 1]) < THRESH: j -= 1
    a = a[max(0, i - FADE):min(len(a), j + FADE)]
    for k in range(min(FADE, len(a))):
        a[k] = int(a[k] * k / FADE)
        a[-1 - k] = int(a[-1 - k] * k / FADE)
    return a


def silence(sec):
    return array.array("h", [0] * int(sec * RATE))


def units(token):
    t = token.upper()
    if all(c in "MSKL" for c in t):
        return list(t)
    return [t[i:i + 2] for i in range(0, len(t), 2)]


def speak(sentence):
    out = array.array("h")
    for w_i, word in enumerate(sentence.split()):
        if w_i: out += silence(PAUSE_WORD)
        for p_i, part in enumerate(word.replace("'", "-").split("-")):
            if p_i: out += silence(PAUSE_JOIN)
            for u_i, u in enumerate(units(part)):
                if u_i: out += silence(PAUSE_SYL)
                out += load(u)
    return out


def write(samples, path):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
        w.writeframes(samples.tobytes())


if __name__ == "__main__":
    args = sys.argv[1:]
    play = "--play" in args
    out = Path(args[args.index("--out") + 1]) if "--out" in args else Path("/tmp/quadra_say.wav")
    phrase = [a for a in args if not a.startswith("--") and a != str(out)][0]
    s = speak(phrase)
    write(s, out)
    print(f"{out}  {len(s) / RATE:.2f} s")
    if play:
        import subprocess; subprocess.run(["afplay", str(out)])
