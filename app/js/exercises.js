// Exercices : un générateur par type, generate(), check().
// Écoute : answerSubmitted { exercise, answer }. Émet : answerChecked { exercise, correct, expected }.
// Un exercice : { type, prompt, show?, choices?, answer, wordIds, audio? }.
// show = texte quadra à dessiner en glyphes. audio = texte à lire. generate renvoie null si impossible.
import { bus } from "./bus.js";
import * as lex from "./lexicon.js";

const LABEL = { nom: "nom", personne: "personne", verbe: "verbe", adjectif: "adjectif" };
let phrases = [];

export const setPhrases = (list) => { phrases = list; };
export async function loadPhrases(src) {
  const url = src ?? new URL("../data/phrases.json", import.meta.url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`phrases: ${res.status}`);
  setPhrases(await res.json());
}

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];
export function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Distracteurs : paires minimales, puis même champ, puis hasard. key évite les doublons.
function distractors(entry, pool, key, rng, n = 3) {
  const seen = new Set([key(entry)]);
  const out = [];
  const tiers = [
    lex.minimalPairs(entry.word).map(lex.byWord),
    entry.field ? lex.field(entry.field) : [],
    pool,
    lex.all(),
  ];
  for (const tier of tiers) {
    for (const e of shuffle(tier, rng)) {
      if (out.length >= n) return out;
      if (e.id !== entry.id && !seen.has(key(e))) { seen.add(key(e)); out.push(e); }
    }
  }
  return out;
}

function choiceEx(type, entry, pool, rng, prompt, key, extra) {
  const wrong = distractors(entry, pool, key, rng);
  return {
    type, prompt, answer: key(entry), wordIds: [entry.id],
    choices: shuffle([entry, ...wrong].map(key), rng), ...extra,
  };
}

function readSyllable(pool, rng) {
  const w = pick(pool, rng);
  const syl = pick(w.syllables, rng);
  const near = (s) => (s[0] === syl[0] ? 1 : 0) + (s[1] === syl[1] ? 1 : 0);
  const others = shuffle(lex.SYLLABLES.filter((s) => s !== syl), rng).sort((a, b) => near(b) - near(a));
  return {
    type: "readSyllable", prompt: "Quelle syllabe ?", show: syl, answer: syl,
    wordIds: [w.id], choices: shuffle([syl, ...others.slice(0, 3)], rng),
  };
}

const readWord = (pool, rng) => {
  const w = pick(pool, rng);
  return choiceEx("readWord", w, pool, rng, "Que veut dire ce mot ?", (e) => e.sense, { show: w.word });
};

const listen = (pool, rng) => {
  const w = pick(pool, rng);
  return choiceEx("listen", w, pool, rng, "Qu'as-tu entendu ?", (e) => e.word, { audio: w.word });
};

const typeWord = (pool, rng) => {
  const w = pick(pool, rng);
  return { type: "typeWord", prompt: `Écris le mot : ${w.sense}`, answer: w.word, wordIds: [w.id] };
};

function derive(pool, rng) {
  const opts = [];
  for (const w of pool) {
    for (const cls of Object.keys(LABEL)) {
      const out = cls !== w.cls && lex.derive(w.word, cls);
      if (out) opts.push([w, lex.byWord(out)]);
    }
  }
  if (!opts.length) return null;
  const [w, t] = pick(opts, rng);
  return {
    type: "derive", show: w.word, answer: t.word, wordIds: [w.id, t.id],
    prompt: `${w.word} veut dire « ${w.sense} ». Écris le mot de classe ${LABEL[t.cls]} (« ${t.sense} »).`,
  };
}

function contrary(pool, rng) {
  const opts = pool.map((w) => [w, lex.contrary(w.word)]).filter(([, c]) => c);
  if (!opts.length) return null;
  const [w, c] = pick(opts, rng);
  const t = lex.byWord(c);
  return {
    type: "contrary", show: w.word, answer: t.word, wordIds: [w.id, t.id],
    prompt: `${w.word} veut dire « ${w.sense} ». Écris le contraire (« ${t.sense} »).`,
  };
}

function number(pool, rng, max = 15) {
  const n = Math.floor(rng() * (max + 1));
  const q = lex.numberToQuadra(n);
  if (rng() < 0.5) {
    return { type: "number", prompt: "Écris ce nombre en quadra (consonnes nues).", show: String(n), answer: q, wordIds: [] };
  }
  return { type: "number", prompt: "Quel est ce nombre ? Écris-le en chiffres.", show: q, answer: String(n), wordIds: [] };
}

function order(pool, rng) {
  const ids = new Set(pool.map((w) => w.word));
  const inPool = (p) => p.quadra.split(" ").some((t) => ids.has(t));
  const ok = phrases.filter((p) => p.quadra.split(" ").length > 1 && inPool(p));
  if (!ok.length) return null;
  const p = pick(ok, rng);
  const toks = p.quadra.split(" ");
  let choices = shuffle(toks, rng);
  if (choices.join(" ") === p.quadra) choices = [...toks.slice(1), toks[0]];
  const wordIds = [...new Set(toks.map((t) => lex.byWord(t)?.id).filter((i) => i !== undefined))];
  return { type: "order", prompt: `Remets dans l'ordre : ${p.francais}`, choices, answer: p.quadra, wordIds };
}

export const GENERATORS = { readSyllable, readWord, typeWord, derive, contrary, number, order, listen };

export function generate(type, pool, rng = Math.random) {
  const g = GENERATORS[type];
  if (!g) throw new Error(`type d'exercice inconnu: ${type}`);
  return pool.length || type === "number" ? g(pool, rng) : null;
}

// Majuscules, espaces réduits, apostrophe en tiret.
export function normalize(s) {
  const t = Array.isArray(s) ? s.join(" ") : String(s ?? "");
  return t.trim().toUpperCase().replace(/\s+/g, " ").replace(/['’‘`]/g, "-");
}

export function check(exercise, answer) {
  return { correct: normalize(answer) === normalize(exercise.answer), expected: exercise.answer };
}

let off = null;
export function init() {
  off?.();
  off = bus.on("answerSubmitted", ({ exercise, answer }) => {
    const { correct, expected } = check(exercise, answer);
    bus.emit("answerChecked", { exercise, correct, expected });
  });
}
init();
