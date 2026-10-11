// Lexique : chargement, grille, dérivations, contraires, nombres.
// Émet : lexiconLoaded { words }. Écoute : rien.
// Les mots sont des chaînes. field() et byClass() renvoient des entrées.
import { bus } from "./bus.js";

export const CONS = "MSKL";
export const VOWELS = "AEIO";
export const SYLLABLES = [...CONS].flatMap((c) => [...VOWELS].map((v) => c + v));
const CLASS_VOWEL = { nom: "A", personne: "E", verbe: "I", adjectif: "O" };

let entries = [];
let words = new Map();
let ids = new Map();

// src : tableau déjà prêt (tests), url (texte), ou rien (data/lexique.json).
export async function load(src) {
  let data = src;
  if (!Array.isArray(data)) {
    const url = src ?? new URL("../data/lexique.json", import.meta.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`lexique: ${res.status}`);
    data = await res.json();
  }
  entries = data;
  words = new Map(data.map((e) => [e.word, e]));
  ids = new Map(data.map((e) => [e.id, e]));
  bus.emit("lexiconLoaded", { words: entries });
  return entries;
}

export const all = () => entries;
export const byWord = (w) => words.get(String(w).toUpperCase()) ?? null;
export const byId = (id) => ids.get(id) ?? null;
export const byClass = (cls) => entries.filter((e) => e.cls === cls);
export const field = (f) => entries.filter((e) => e.field === f);

// Change la dernière voyelle selon la classe. KEKA + verbe = KEKI.
export function derive(word, cls) {
  const v = CLASS_VOWEL[cls];
  const e = byWord(word);
  if (!v || !e || !CLASS_VOWEL[e.cls]) return null;
  const out = e.word.slice(0, -1) + v;
  return words.has(out) ? out : null;
}

// Échange E et I dans la première voyelle. MEMO devient MIMO.
export function contrary(word) {
  const e = byWord(word);
  if (!e || e.cls === "compose" || e.cls === "particule") return null;
  const swap = { E: "I", I: "E" }[e.word[1]];
  if (!swap) return null;
  const out = e.word[0] + swap + e.word.slice(2);
  return words.has(out) ? out : null;
}

// Même champ, même classe, une seule voyelle de différence.
export function minimalPairs(word) {
  const e = byWord(word);
  if (!e || !e.field || e.cls === "compose") return [];
  return field(e.field)
    .filter((o) => o !== e && o.cls === e.cls && o.word.length === e.word.length)
    .filter((o) => {
      const d = [...e.word].map((c, i) => (c === o.word[i] ? -1 : i)).filter((i) => i >= 0);
      return d.length === 1 && d[0] % 2 === 1;
    })
    .map((o) => o.word);
}

export function numberToQuadra(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`nombre invalide: ${n}`);
  let out = "";
  do { out = CONS[n % 4] + out; n = Math.floor(n / 4); } while (n > 0);
  return out;
}

export function quadraToNumber(s) {
  const t = String(s).trim().toUpperCase();
  if (!/^[MSKL]+$/.test(t)) throw new RangeError(`nombre quadra invalide: ${s}`);
  return [...t].reduce((n, c) => n * 4 + CONS.indexOf(c), 0);
}
