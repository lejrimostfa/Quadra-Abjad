import assert from "node:assert/strict";
import { bus } from "../js/bus.js";
import * as lex from "../js/lexicon.js";
import * as exo from "../js/exercises.js";
import * as srs from "../js/srs.js";
import { units, buildLesson, buildReview, FIELDS } from "../js/lessons.js";
import { lexData, phrases, seeded } from "./helpers.mjs";

await lex.load(lexData);
exo.setPhrases(phrases);
srs.setStorage(null);
srs.reset();

const list = units();
assert.equal(list.length, 18);
assert.deepEqual(list.map((u) => u.id), [...Array(18).keys()]);
assert.deepEqual(list.slice(1, 17).map((u) => u.field), FIELDS);
assert.equal(list[0].words.length, 16);
assert.ok(list[17].words.length >= 17);
assert.ok(list.slice(1, 17).every((u) => u.words.length > 0));

const RANK = { readSyllable: 0, readWord: 1, listen: 2, number: 3, typeWord: 4, derive: 5, contrary: 6, order: 7 };
let started = [];
bus.on("lessonStarted", (p) => started.push(p));
for (const u of list) {
  for (const seed of [1, 2, 3]) {
    const lesson = buildLesson(u.id, seeded(seed));
    assert.equal(lesson.length, 10, `unité ${u.id}`);
    const ranks = lesson.map((e) => RANK[e.type]);
    assert.deepEqual(ranks, [...ranks].sort((a, b) => a - b), "du plus facile au plus dur");
    // Les mots visés viennent de l'unité (ou de ses dérivés pour derive et contrary).
    for (const e of lesson.filter((x) => ["readWord", "typeWord", "listen"].includes(x.type))) {
      assert.ok(u.words.some((w) => w.id === e.wordIds[0]), `unité ${u.id}: mot hors unité`);
    }
  }
}
assert.equal(started.at(-1).unitId, 17);
assert.equal(started.at(-1).exercises.length, 10);
assert.deepEqual(buildLesson(3, seeded(9)), buildLesson(3, seeded(9)), "déterministe");
assert.throws(() => buildLesson(99));
assert.ok(buildLesson(0, seeded(1)).some((e) => e.type === "number"));

// Révision.
const T0 = 1_000_000_000_000;
assert.deepEqual(buildReview(T0, seeded(1)), [], "rien d'échu");
for (const id of [10, 20, 30]) srs.record(id, false, T0);
const rev = buildReview(T0, seeded(1));
assert.ok(rev.length > 0 && rev.length <= 10);
const dueIds = new Set([10, 20, 30]);
assert.ok(rev.every((e) => e.wordIds.some((id) => dueIds.has(id)) || e.type === "derive" || e.type === "contrary"));
assert.equal(started.at(-1).unitId, "review");
console.log("lessons ok");
