import assert from "node:assert/strict";
import { bus } from "../js/bus.js";
import * as lex from "../js/lexicon.js";
import { lexData } from "./helpers.mjs";

let emitted = null;
bus.on("lexiconLoaded", (p) => { emitted = p; });
await lex.load(lexData);
assert.equal(emitted.words.length, 196, "lexiconLoaded émis avec 196 mots");

assert.equal(lex.byWord("memo").sense.includes("grand"), true);
assert.equal(lex.byWord("ZZZZ"), null);
assert.equal(lex.derive("KEKA", "verbe"), "KEKI");
assert.equal(lex.derive("KEKA", "personne"), "KEKE");
assert.equal(lex.derive("MAMA-MAKI", "nom"), null);
assert.equal(lex.contrary("MEMO"), "MIMO");
assert.equal(lex.contrary("SEKI"), "SIKI");
assert.equal(lex.contrary("KEKA"), "KIKA");
assert.equal(lex.contrary("LAKA"), null, "voyelle A sans contraire");
assert.ok(lex.field("MM").every((e) => e.field === "MM") && lex.field("MM").length > 0);
assert.ok(lex.byClass("verbe").every((e) => e.word.endsWith("I")));

const pairs = lex.minimalPairs("MEMO");
assert.ok(lex.all().some((e) => lex.minimalPairs(e.word).length > 0), "il existe des paires minimales");
for (const w of ["MEMO", "SEKI", "KEKA", "LAKA"]) {
  const e = lex.byWord(w);
  for (const p of lex.minimalPairs(w)) {
    const o = lex.byWord(p);
    assert.equal(o.field, e.field);
    assert.equal(o.cls, e.cls);
    const diff = [...w].filter((c, i) => c !== p[i]);
    assert.equal(diff.length, 1);
    assert.ok("AEIO".includes(diff[0]));
  }
}
assert.deepEqual(lex.minimalPairs("MA"), []);

const nums = { 0: "M", 1: "S", 2: "K", 3: "L", 4: "SM", 5: "SS", 10: "KK", 16: "SMM", 255: "LLLL" };
for (const [n, q] of Object.entries(nums)) {
  assert.equal(lex.numberToQuadra(Number(n)), q);
  assert.equal(lex.quadraToNumber(q), Number(n));
}
for (let n = 0; n < 300; n++) assert.equal(lex.quadraToNumber(lex.numberToQuadra(n)), n);
assert.throws(() => lex.quadraToNumber("MA"));
assert.throws(() => lex.numberToQuadra(-1));
console.log("lexicon ok");
