// Clavier 4 x 4 (lignes M S K L, colonnes A E I O), touche chiffres, effacer, espace, tiret.
// Événements émis : syllableTapped { syllable }, digitTapped { digit, value },
// keyTapped { key: "backspace" | "space" | "hyphen" }.
// Événements écoutés : aucun. Le clavier ne garde aucun texte, l'écran le tient.
// digit est la consonne nue ("M".."L"), value est sa valeur (0 à 3).
import { bus } from "./bus.js";
import { renderSyllable } from "./glyphs.js";

const ROWS = ["M", "S", "K", "L"];
const COLS = ["A", "E", "I", "O"];
const STYLE_ID = "quadra-keyboard-style";

const CSS = `
.qk { --qk-bg: #f4f1ea; --qk-key: #fff; --qk-fg: #1d1d1f; --qk-border: #cfc9bb;
  --qk-active: #e3dccb; --qk-accent: #2f6f4f; --qk-muted: #6b665a;
  display: grid; gap: 6px; padding: 8px; background: var(--qk-bg); color: var(--qk-fg);
  border-radius: 12px; user-select: none; -webkit-user-select: none; }
@media (prefers-color-scheme: dark) { .qk { --qk-bg: #1e1e20; --qk-key: #2b2b2e;
  --qk-fg: #f2efe8; --qk-border: #444448; --qk-active: #3b3b40; --qk-accent: #6fcf97;
  --qk-muted: #a09b8f; } }
.qk-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.qk-key { min-width: 44px; min-height: 44px; padding: 4px 2px; display: flex;
  flex-direction: column; align-items: center; justify-content: center; gap: 0;
  background: var(--qk-key); color: var(--qk-fg); border: 1px solid var(--qk-border);
  border-radius: 8px; font: 600 14px/1.1 sans-serif; touch-action: manipulation;
  cursor: pointer; -webkit-tap-highlight-color: transparent; }
.qk-key:active { background: var(--qk-active); }
.qk-key[aria-pressed="true"] { border-color: var(--qk-accent); color: var(--qk-accent); }
.qk-key small { font-size: 11px; font-weight: 500; color: var(--qk-muted); }
.qk-key svg { display: block; }
.qk[data-mode="digits"] .qk-syl { display: none; }
.qk:not([data-mode="digits"]) .qk-digit { display: none; }
`;

function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.append(s);
}

function key(cls, label, onTap, glyph, small) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = `qk-key ${cls}`;
  b.setAttribute("aria-label", label);
  if (glyph) b.append(glyph);
  if (small) {
    const t = document.createElement("small");
    t.textContent = small;
    b.append(t);
  }
  b.addEventListener("click", onTap);
  return b;
}

function textKey(cls, label, symbol, onTap) {
  const b = key(cls, label, onTap);
  b.append(document.createTextNode(symbol));
  return b;
}

// Dessine le clavier dans root. Renvoie une fonction qui le retire.
export function mount(root) {
  injectStyle();
  const kb = document.createElement("div");
  kb.className = "qk";
  kb.dataset.mode = "syllables";

  const grid = document.createElement("div");
  grid.className = "qk-grid qk-syl";
  for (const c of ROWS) {
    for (const v of COLS) {
      const syl = c + v;
      grid.append(key("", syl, () => bus.emit("syllableTapped", { syllable: syl }),
        renderSyllable(syl, { size: 30 }), syl));
    }
  }

  const digits = document.createElement("div");
  digits.className = "qk-grid qk-digit";
  ROWS.forEach((c, value) => {
    digits.append(key("", `${c} ${value}`, () => bus.emit("digitTapped", { digit: c, value }),
      renderSyllable(c, { size: 30 }), `${c} = ${value}`));
  });

  const bottom = document.createElement("div");
  bottom.className = "qk-grid";
  const toggle = textKey("", "Chiffres", "0-3", () => {
    const on = kb.dataset.mode !== "digits";
    kb.dataset.mode = on ? "digits" : "syllables";
    toggle.setAttribute("aria-pressed", String(on));
  });
  toggle.setAttribute("aria-pressed", "false");
  bottom.append(
    toggle,
    textKey("", "Espace", "espace", () => bus.emit("keyTapped", { key: "space" })),
    textKey("", "Tiret", "-", () => bus.emit("keyTapped", { key: "hyphen" })),
    textKey("", "Effacer", "⌫", () => bus.emit("keyTapped", { key: "backspace" })),
  );

  kb.append(grid, digits, bottom);
  root.append(kb);
  return () => kb.remove();
}
