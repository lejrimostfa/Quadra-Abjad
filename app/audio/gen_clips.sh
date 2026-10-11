#!/bin/zsh
# Génère les 20 clips de référence avec la voix française de macOS.
# Usage : ./gen_clips.sh [voix]   (défaut : Thomas, sinon Jacques)
VOICE="${1:-Thomas}"
say -v "$VOICE" "test" -o /tmp/_q.aiff 2>/dev/null || VOICE="Jacques"
typeset -A SPELL
SPELL=(MA ma ME mè MI mi MO mo SA sa SE sè SI si SO so KA ka KE kè KI ki KO ko LA la LE lè LI li LO lo M me S se K ke L le)
for syl in ${(k)SPELL}; do
  say -v "$VOICE" -r 150 --data-format=LEI16@22050 -o "$syl.wav" "${SPELL[$syl]}"
done
echo "voix : $VOICE, $(ls *.wav | wc -l | tr -d ' ') clips"
