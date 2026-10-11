import assert from "node:assert/strict";
import { bus } from "../js/bus.js";
import * as lex from "../js/lexicon.js";
import * as ex from "../js/exercises.js";
import { lexData, phrases, seeded } from "./helpers.mjs";

await lex.load(lexData);
ex.setPhrases(phrases);
const pool = lex.all();
const grid = pool.filter((e) => ["nom", "personne", "verbe", "adjectif"].includes(e.cls));

// Chaque type produit un exercice complet, avec réponse correcte parmi les choix.
for (const type of Object.keys(ex.GENERATORS)) {
  for (let seed = 1; seed <= 40; seed++) {
    const e = ex.generate(type, grid, seeded(seed));
    assert.ok(e, `${type} seed ${seed}`);
    assert.equal(e.type, type);
    assert.ok(e.prompt && e.answer !== undefined && Array.isArray(e.wordIds));
    if (e.choices && type !== "order") {
      assert.ok(e.choices.includes(e.answer), `${type}: réponse dans les choix`);
      assert.equal(new Set(e.choices).size, e.choices.length, `${type}: choix distincts`);
    }
    if (["readSyllable", "readWord", "listen"].includes(type)) assert.equal(e.choices.length, 4);
    assert.ok(ex.check(e, e.answer).correct);
  }
}

// Déterminisme.
assert.deepEqual(ex.generate("readWord", grid, seeded(7)), ex.generate("readWord", grid, seeded(7)));

// Distracteurs : les paires minimales passent en premier.
const memo = lex.byWord("MEMO");
const pairs = lex.minimalPairs("MEMO");
const l = ex.generate("listen", [memo], seeded(3));
assert.equal(l.answer, "MEMO");
assert.equal(l.audio, "MEMO");
for (const p of pairs.slice(0, 3)) assert.ok(l.choices.includes(p), `paire ${p} présente`);

// Dérivation et contraire.
const d = ex.generate("derive", [lex.byWord("KEKA")], seeded(1));
assert.equal(lex.derive("KEKA", lex.byWord(d.answer).cls), d.answer);
assert.equal(ex.generate("contrary", [memo], seeded(1)).answer, "MIMO");
assert.equal(ex.generate("contrary", [lex.byWord("LAKA")], seeded(1)), null);

// Nombres : les deux sens.
const dirs = new Set();
for (let s = 1; s < 30; s++) {
  const n = ex.generate("number", [], seeded(s));
  dirs.add(/^\d+$/.test(n.answer));
  const [arab, quad] = /^\d+$/.test(n.answer) ? [n.answer, n.show] : [n.show, n.answer];
  assert.equal(lex.quadraToNumber(quad), Number(arab));
}
assert.equal(dirs.size, 2);

// Ordre : jamais déjà dans l'ordre, mêmes jetons.
for (let s = 1; s < 30; s++) {
  const o = ex.generate("order", grid, seeded(s));
  assert.notEqual(o.choices.join(" "), o.answer);
  assert.deepEqual([...o.choices].sort(), o.answer.split(" ").sort());
}
ex.setPhrases([]);
assert.equal(ex.generate("order", grid, seeded(1)), null);
ex.setPhrases(phrases);
assert.throws(() => ex.generate("nope", grid));

// check : normalisation.
const t = { answer: "MAMA-MAKI" };
assert.ok(ex.check(t, "  mama-maki ").correct);
assert.ok(ex.check({ answer: "J-AI" }, "j'ai").correct);
assert.ok(ex.check({ answer: "A B" }, "a    b").correct);
assert.deepEqual(ex.check(t, "x"), { correct: false, expected: "MAMA-MAKI" });

// Bus.
ex.init();
let got = null;
bus.on("answerChecked", (p) => { got = p; });
const e1 = ex.generate("typeWord", [memo], seeded(1));
bus.emit("answerSubmitted", { exercise: e1, answer: "memo" });
assert.equal(got.correct, true);
assert.equal(got.expected, "MEMO");
console.log("exercises ok");
