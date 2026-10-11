import assert from "node:assert/strict";
import { bus } from "../js/bus.js";
import * as srs from "../js/srs.js";
import { fakeStorage } from "./helpers.mjs";

const DAY = 86400000;
const T0 = 1_000_000_000_000;
const store = fakeStorage();
srs.setStorage(store);
srs.reset();

const events = [];
bus.on("progressUpdated", (p) => events.push(p));

// Bonnes réponses : boîte + 1, échéances 1, 3, 7, 15 jours.
let r = srs.record(5, true, T0);
assert.equal(r.box, 2);
assert.equal(r.due, T0 + 1 * DAY);
assert.equal(srs.record(5, true, T0).box, 3);
assert.equal(srs.record(5, true, T0).due, T0 + 7 * DAY);
assert.equal(srs.record(5, true, T0).due, T0 + 15 * DAY);
assert.equal(srs.record(5, true, T0).box, 5, "plafond à 5");
// Mauvaise : retour boîte 1, échéance immédiate.
r = srs.record(5, false, T0);
assert.equal(r.box, 1);
assert.equal(r.due, T0);
assert.equal(events.length, 6);
assert.deepEqual(events.at(-1), { wordId: 5, box: 1, due: T0 });

// Mots échus.
srs.reset();
srs.record(1, true, T0);   // due T0 + 1 jour
srs.record(2, false, T0);  // due T0
assert.deepEqual(srs.dueWords(T0), [2]);
assert.deepEqual(srs.dueWords(T0 + DAY), [2, 1]);
const s = srs.stats(T0);
assert.equal(s.seen, 2);
assert.equal(s.due, 1);
assert.deepEqual(s.boxes, [1, 1, 0, 0, 0]);

// Persistance sous la bonne clé.
const saved = JSON.parse(store.dump()["quadra.progress.v1"]);
assert.deepEqual(Object.keys(saved).sort(), ["1", "2"]);
assert.deepEqual(Object.keys(saved[1]).sort(), ["box", "due", "ok", "seen"]);
srs.setStorage(fakeStorage({ "quadra.progress.v1": JSON.stringify(saved) }));
assert.equal(srs.stats(T0).seen, 2, "relit le stockage");

// Stockage cassé ou absent : mémoire seule.
const broken = {
  getItem() { throw new Error("no"); }, setItem() { throw new Error("no"); },
  removeItem() { throw new Error("no"); },
};
for (const b of [broken, null]) {
  srs.setStorage(b);
  srs.reset();
  srs.record(9, true, T0);
  assert.equal(srs.stats(T0).seen, 1);
  assert.deepEqual(srs.dueWords(T0 + DAY), [9]);
}
srs.setStorage(fakeStorage({ "quadra.progress.v1": "{pas du json" }));
assert.equal(srs.stats(T0).seen, 0, "JSON corrompu ignoré");

// answerChecked enregistre chaque mot.
srs.setStorage(null);
srs.reset();
srs.init();
bus.emit("answerChecked", { exercise: { wordIds: [3, 4] }, correct: true, expected: "X" });
assert.equal(srs.stats(T0).seen, 2);
srs.reset();
assert.equal(srs.stats(T0).seen, 0);
console.log("srs ok");
