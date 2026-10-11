// Répétition espacée, 5 boîtes de Leitner.
// Écoute : answerChecked. Émet : progressUpdated { wordId, box, due }.
// Stockage : localStorage quadra.progress.v1, sinon mémoire seule.
import { bus } from "./bus.js";

export const KEY = "quadra.progress.v1";
export const DAYS = [0, 1, 3, 7, 15];
const DAY_MS = 86400000;

let store = null;     // { wordId: { box, due, seen, ok } }
let backend;          // undefined = pas encore cherché

function storage() {
  if (backend === undefined) {
    try { backend = globalThis.localStorage ?? null; } catch { backend = null; }
  }
  return backend;
}

// Pour les tests : injecte un stockage (ou null) et vide la mémoire.
export function setStorage(s) { backend = s; store = null; }

function data() {
  if (store) return store;
  store = {};
  try {
    const raw = storage()?.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") store = parsed;
  } catch { store = {}; }
  return store;
}

function save() {
  try { storage()?.setItem(KEY, JSON.stringify(store)); } catch { /* mémoire seule */ }
}

export function record(wordId, correct, now = Date.now()) {
  const s = data();
  const cur = s[wordId] ?? { box: 1, due: now, seen: 0, ok: 0 };
  cur.box = correct ? Math.min(cur.box + 1, 5) : 1;
  cur.due = now + DAYS[cur.box - 1] * DAY_MS;
  cur.seen += 1;
  if (correct) cur.ok += 1;
  s[wordId] = cur;
  save();
  bus.emit("progressUpdated", { wordId, box: cur.box, due: cur.due });
  return cur;
}

export function dueWords(now = Date.now()) {
  return Object.entries(data())
    .filter(([, v]) => v.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => Number(id));
}

// seen : mots déjà vus. known : mots en boîte 3 ou plus.
export function stats(now = Date.now()) {
  const vals = Object.values(data());
  const boxes = [0, 0, 0, 0, 0];
  vals.forEach((v) => { boxes[v.box - 1] += 1; });
  return {
    seen: vals.length,
    known: vals.filter((v) => v.box >= 3).length,
    due: vals.filter((v) => v.due <= now).length,
    boxes,
  };
}

export function reset() {
  store = {};
  try { storage()?.removeItem(KEY); } catch { /* mémoire seule */ }
}

let off = null;
export function init() {
  off?.();
  off = bus.on("answerChecked", ({ exercise, correct }) => {
    for (const id of exercise?.wordIds ?? []) record(id, correct);
  });
}
init();
