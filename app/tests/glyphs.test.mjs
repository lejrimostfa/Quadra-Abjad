// Tests de glyphs.js en Node : toUnicode, parseText, erreurs, rendu avec faux DOM.
import assert from "node:assert/strict";
import { toUnicode, parseText, renderText, renderSyllable } from "../js/glyphs.js";

const T = { A: "̇", E: "́", I: "̣", O: "̊" };
for (const c of "mskl".replace(" ", "")) {
  for (const v of "AEIO") assert.equal(toUnicode(c + v.toLowerCase()), c + T[v]);
}
assert.equal(toUnicode("MA"), "ṁ");
assert.equal(toUnicode("mi"), "ṃ");
assert.equal(toUnicode("KK"), "kk");
assert.equal(toUnicode("MAMA-MAKI"), "ṁṁ-ṁḳ");
assert.equal(toUnicode("KALE LASI"), toUnicode("kale lasi"));
assert.equal(toUnicode("KALE LASI").split(" ").length, 2);

const count = (t, type) => parseText(t).filter((u) => u.type === type).length;
assert.equal(count("KALE LASI", "syl"), 4);
assert.equal(count("KALE LASI", "space"), 1);
assert.equal(count("MAMA-MAKI", "syl"), 4);
assert.equal(count("MAMA-MAKI", "hyphen"), 1);
assert.equal(count("KK", "bare"), 2);
assert.equal(count("KALE LASI LOLA KOKA KA SEMA KILA", "syl"), 13);
assert.equal(parseText("").length, 0);

for (const bad of ["KAX", "KA1", "K A?", "KAL", "AK", "KALE.", "É"]) {
  assert.throws(() => parseText(bad), Error, bad);
}
assert.throws(() => toUnicode("XA"), Error);

// Faux DOM minimal pour compter les formes dessinées.
const mk = (tag) => ({ tag, attrs: {}, kids: [], style: {},
  setAttribute(k, v) { this.attrs[k] = v; }, append(...c) { this.kids.push(...c); } });
globalThis.document = { createElementNS: (_, t) => mk(t), createTextNode: (t) => ({ text: t }) };
const all = (n) => (n.kids ?? []).flatMap((k) => [k, ...all(k)]);
const shapes = (svg, tag) => all(svg).filter((n) => n.tag === tag);

const ma = renderSyllable("MA", { size: 40 });
assert.equal(shapes(ma, "circle").length, 1);
assert.equal(shapes(renderSyllable("KE"), "line").length, 1);
const o = shapes(renderSyllable("LO"), "circle")[0];
assert.equal(o.attrs.fill, "none");
const iy = shapes(renderSyllable("SI"), "circle")[0].attrs.cy;
const ay = shapes(renderSyllable("SA"), "circle")[0].attrs.cy;
assert.ok(iy > ay, "I sous la consonne, A au-dessus");
assert.equal(shapes(renderSyllable("M"), "circle").length, 0);
assert.equal(shapes(renderText("MAMA-MAKI"), "line").length, 1);
assert.equal(shapes(renderText("KALE LASI", { showLatin: true }), "text").length, 8);
assert.equal(renderText("ka").attrs["aria-label"], "KA");
assert.throws(() => renderSyllable("KALE"), Error);
assert.equal(ma.attrs.height, +(142 * 40 / 80).toFixed(1));

console.log("glyphs.test.mjs : ok");
