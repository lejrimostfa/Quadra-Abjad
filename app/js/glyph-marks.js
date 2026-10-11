// Mesures des lettres et formes des signes de voyelle. Aucun DOM au chargement.
// Repère de dessin : lettre de 80 unités, ligne de base à y = 108.
// Événements : aucun.

export const NS = "http://www.w3.org/2000/svg";
export const FONT = 80;
export const BASE = 108;
export const HEIGHT = 142;
export const LABEL_H = 26;
export const SPACE_W = 40;
export const HYPHEN_W = 40;
// w = largeur de la cellule, top = haut de la lettre (k et l ont une hampe).
export const LETTERS = {
  M: { w: 84, top: BASE - 42 },
  S: { w: 60, top: BASE - 42 },
  K: { w: 60, top: BASE - 60 },
  L: { w: 44, top: BASE - 60 },
};

// Crée un élément SVG. Appelé seulement au rendu.
export function el(tag, attrs = {}, ...kids) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const k of kids) e.append(k);
  return e;
}

// Signe de la voyelle, placé par rapport à la boîte de la lettre.
export function vowelMark(vowel, letter, color) {
  const cx = LETTERS[letter].w / 2;
  const up = LETTERS[letter].top - 16;
  const down = BASE + 18;
  switch (vowel) {
    case "A": return el("circle", { cx, cy: up, r: 7, fill: color });
    case "I": return el("circle", { cx, cy: down, r: 7, fill: color });
    case "O": return el("circle", { cx, cy: up, r: 6.5, fill: "none", stroke: color, "stroke-width": 4.5 });
    case "E": return el("line", {
      x1: cx - 6, y1: up + 8, x2: cx + 6, y2: up - 8,
      stroke: color, "stroke-width": 6, "stroke-linecap": "round",
    });
    default: throw new Error(`Voyelle inconnue : ${vowel}`);
  }
}

// Tiret de composé : trait court à mi-hauteur de la lettre.
export function hyphenMark(color) {
  return el("line", {
    x1: 8, y1: BASE - 21, x2: HYPHEN_W - 8, y2: BASE - 21,
    stroke: color, "stroke-width": 6, "stroke-linecap": "round",
  });
}
