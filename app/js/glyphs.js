// Rendu SVG des syllabes, mots, phrases et nombres.
// Événements émis : aucun. Événements écoutés : aucun (l'écran appelle le rendu).
// Le DOM n'est touché que dans les fonctions de rendu.
import {
  FONT, BASE, HEIGHT, LABEL_H, SPACE_W, HYPHEN_W, LETTERS, el, vowelMark, hyphenMark,
} from "./glyph-marks.js";

const CONS = "MSKL";
const VOW = "AEIO";
const FAMILY = "Helvetica, Arial, sans-serif";
const COMBINING = { A: "̇", E: "́", I: "̣", O: "̊" };

// Découpe un texte en unités : { type: "syl"|"bare"|"space"|"hyphen", v }.
// Un mot sans voyelle est un nombre : consonnes nues. Sinon paires C + V.
export function parseText(text) {
  const out = [];
  const src = String(text).toUpperCase().trim();
  const parts = src.split(/(\s+|-)/).filter((p) => p !== "");
  for (const p of parts) {
    if (/^\s+$/.test(p)) { out.push({ type: "space", v: " " }); continue; }
    if (p === "-") { out.push({ type: "hyphen", v: "-" }); continue; }
    for (const c of p) {
      if (!CONS.includes(c) && !VOW.includes(c)) throw new Error(`Caractère hors alphabet : "${c}"`);
    }
    if ([...p].every((c) => CONS.includes(c))) {
      for (const c of p) out.push({ type: "bare", v: c });
      continue;
    }
    if (p.length % 2) throw new Error(`Syllabe incomplète dans "${p}"`);
    for (let i = 0; i < p.length; i += 2) {
      const s = p.slice(i, i + 2);
      if (!CONS.includes(s[0]) || !VOW.includes(s[1])) throw new Error(`Syllabe invalide : "${s}"`);
      out.push({ type: "syl", v: s });
    }
  }
  return out;
}

// Forme NFD pour copier-coller : consonne minuscule + signe combinant.
export function toUnicode(text) {
  return parseText(text).map((u) => {
    if (u.type === "space") return " ";
    if (u.type === "hyphen") return "-";
    const c = u.v[0].toLowerCase();
    return u.type === "bare" ? c : c + COMBINING[u.v[1]];
  }).join("");
}

function width(u) {
  if (u.type === "space") return SPACE_W;
  if (u.type === "hyphen") return HYPHEN_W;
  return LETTERS[u.v[0]].w;
}

// Dessine une unité dans un groupe placé en x.
function drawUnit(u, x, color, showLatin) {
  const g = el("g", { transform: `translate(${x} 0)` });
  if (u.type === "space") return g;
  if (u.type === "hyphen") { g.append(hyphenMark(color)); return g; }
  const L = u.v[0];
  g.append(el("text", {
    x: LETTERS[L].w / 2, y: BASE, "text-anchor": "middle", fill: color,
    "font-family": FAMILY, "font-weight": 500, "font-size": FONT,
  }, document.createTextNode(L.toLowerCase())));
  if (u.type === "syl") g.append(vowelMark(u.v[1], L, color));
  if (showLatin) {
    g.append(el("text", {
      x: LETTERS[L].w / 2, y: HEIGHT + 18, "text-anchor": "middle", fill: color,
      "font-family": FAMILY, "font-size": 20, opacity: 0.6,
    }, document.createTextNode(u.v)));
  }
  return g;
}

function build(units, opts, label) {
  const { size = 48, color = "currentColor", showLatin = false } = opts;
  const h = HEIGHT + (showLatin ? LABEL_H : 0);
  let x = 0;
  const groups = units.map((u) => {
    const g = drawUnit(u, x, color, showLatin);
    x += width(u);
    return g;
  });
  const k = size / FONT;
  const svg = el("svg", {
    xmlns: "http://www.w3.org/2000/svg", viewBox: `0 0 ${x} ${h}`,
    width: +(x * k).toFixed(1), height: +(h * k).toFixed(1),
    role: "img", "aria-label": label,
  }, ...groups);
  svg.style.verticalAlign = "middle";
  return svg;
}

// Une syllabe ("MA") ou une consonne nue ("M").
export function renderSyllable(syl, opts = {}) {
  const units = parseText(syl);
  if (units.length !== 1 || !["syl", "bare"].includes(units[0].type)) {
    throw new Error(`Une syllabe attendue : "${syl}"`);
  }
  return build(units, opts, units[0].v);
}

// Mots, espaces, tirets, nombres.
export function renderText(text, opts = {}) {
  return build(parseText(text), opts, String(text).toUpperCase());
}
