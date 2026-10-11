// Programme : unité 0, unités 1 à 16 (un champ chacune), unité 17 (outils, composés).
// Émet : lessonStarted { unitId, exercises }. Écoute : rien.
// La révision tire les mots échus de srs.js.
import { bus } from "./bus.js";
import * as lex from "./lexicon.js";
import { generate } from "./exercises.js";
import { dueWords } from "./srs.js";

export const FIELDS = ["MM", "MS", "MK", "ML", "SM", "SS", "SK", "SL", "KM", "KS", "KK", "KL", "LM", "LS", "LK", "LL"];
const SIZE = 10;
// Rang de difficulté : du plus facile au plus dur.
const RANK = { readSyllable: 0, readWord: 1, listen: 2, number: 3, typeWord: 4, derive: 5, contrary: 6, order: 7 };
const PLAN = {
  intro: { readSyllable: 3, number: 3, readWord: 2, listen: 1, typeWord: 1 },
  field: { readWord: 3, listen: 2, typeWord: 2, derive: 1, contrary: 1, order: 1 },
  tools: { readWord: 3, listen: 2, typeWord: 3, order: 2 },
};
const FILL = ["readWord", "listen", "typeWord"];

const GRID = ["nom", "personne", "verbe", "adjectif"];
const inGrid = (e) => GRID.includes(e.cls);

export function units() {
  const list = [{
    id: 0, kind: "intro", title: "Syllabes, particules et nombres",
    words: lex.byClass("particule"),
  }];
  FIELDS.forEach((f, i) => list.push({
    id: i + 1, kind: "field", field: f, title: `Champ ${f}`,
    words: lex.field(f).filter(inGrid),
  }));
  list.push({
    id: 17, kind: "tools", title: "Mots outils et composés",
    words: [...lex.byClass("outil"), ...lex.byClass("compose")],
  });
  return list;
}

const key = (ex) => `${ex.type}|${ex.prompt}|${ex.show ?? ""}`;

function fillUp(slots, pool, rng) {
  const out = [];
  const seen = new Set();
  const queue = [...slots];
  let tries = 0;
  while (out.length < SIZE && tries < 200) {
    const type = queue.length ? queue.shift() : FILL[tries % FILL.length];
    const ex = generate(type, pool, rng) ?? generate(FILL[tries % FILL.length], pool, rng);
    tries += 1;
    if (!ex || (seen.has(key(ex)) && tries < 150)) continue;
    seen.add(key(ex));
    out.push(ex);
  }
  // Tri stable : du plus facile au plus dur.
  return out.map((ex, i) => [ex, i]).sort((a, b) => RANK[a[0].type] - RANK[b[0].type] || a[1] - b[1]).map(([ex]) => ex);
}

export function buildLesson(unitId, rng = Math.random) {
  const unit = units().find((u) => u.id === unitId);
  if (!unit) throw new Error(`unité inconnue: ${unitId}`);
  const slots = Object.entries(PLAN[unit.kind]).flatMap(([t, n]) => Array(n).fill(t));
  const exercises = fillUp(slots, unit.words, rng);
  bus.emit("lessonStarted", { unitId, exercises });
  return exercises;
}

const REVIEW_TYPES = ["readWord", "typeWord", "listen", "derive", "contrary"];

export function buildReview(now = Date.now(), rng = Math.random) {
  const due = dueWords(now).map(lex.byId).filter(Boolean).slice(0, SIZE);
  const exercises = [];
  const seen = new Set();
  for (let i = 0; due.length && i < SIZE * 6 && exercises.length < SIZE; i++) {
    const w = due[i % due.length];
    const type = REVIEW_TYPES[Math.floor(i / due.length) % REVIEW_TYPES.length];
    const ex = generate(type, [w], rng) ?? generate("readWord", [w], rng);
    if (ex && !seen.has(key(ex))) { seen.add(key(ex)); exercises.push(ex); }
  }
  exercises.sort((a, b) => RANK[a.type] - RANK[b.type]);
  bus.emit("lessonStarted", { unitId: "review", exercises });
  return exercises;
}
