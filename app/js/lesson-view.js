// Vue d'un exercice : consigne, glyphes, zone de réponse (choix, clavier, nombre, ordre), retour.
// Écoute : syllableTapped, digitTapped, keyTapped, answerChecked. Émet : answerSubmitted, speakRequested.
import { bus } from "./bus.js";
import { renderText } from "./glyphs.js";
import { mount as mountKeyboard } from "./keyboard.js";
import { byWord } from "./lexicon.js";

const $ = (id) => document.getElementById(id);
const TYPE_LABEL = {
  readSyllable: "Lire une syllabe", readWord: "Lire un mot", listen: "Écouter", number: "Nombres",
  typeWord: "Écrire", derive: "Dériver", contrary: "Contraire", order: "Remettre en ordre",
};
const KEYBOARD_TYPES = ["typeWord", "derive", "contrary"];
const isQuadra = (s) => /^[MSKLAEIO\s'-]+$/i.test(String(s));

function glyph(text, size = 44, showLatin = false) {
  try { return renderText(text, { size, showLatin }); }
  catch { const s = document.createElement("span"); s.textContent = text; return s; }
}

function choiceButton(label, onTap, asGlyph) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "choice";
  b.setAttribute("aria-pressed", "false");
  if (asGlyph) {
    b.append(glyph(label, 32));
    const m = document.createElement("span"); m.className = "mono"; m.textContent = label; b.append(m);
  } else {
    b.textContent = label;
  }
  b.addEventListener("click", () => onTap(label, b));
  return b;
}

export function mountLessonView({ onNext, onQuit }) {
  const state = { ex: null, answer: "", tokens: [], checked: false };
  let unmountKb = null;

  const paintInput = () => {
    const box = $("answer").querySelector(".input");
    if (!box) return;
    const text = state.ex.type === "order" ? state.tokens.join(" ") : state.answer;
    box.replaceChildren();
    if (text) {
      box.append(glyph(text, 40));
      const m = document.createElement("span"); m.className = "mono"; m.textContent = text; box.append(m);
    } else {
      const m = document.createElement("span"); m.className = "muted"; m.textContent = "Ta réponse"; box.append(m);
    }
    $("btn-check").disabled = !text;
  };

  const inputBox = () => { const d = document.createElement("div"); d.className = "input"; return d; };

  function buildAnswerArea(ex) {
    const area = $("answer");
    area.replaceChildren();
    $("kb").replaceChildren();
    unmountKb?.(); unmountKb = null;
    $("btn-check").disabled = true;

    if (ex.choices && ex.type !== "order") {
      const wrap = document.createElement("div"); wrap.className = "choices";
      const asGlyph = ex.type === "listen";
      for (const c of ex.choices) {
        wrap.append(choiceButton(c, (label, btn) => {
          if (state.checked) return;
          state.answer = label;
          for (const o of wrap.children) o.setAttribute("aria-pressed", String(o === btn));
          $("btn-check").disabled = false;
        }, asGlyph));
      }
      area.append(wrap);
    } else if (ex.type === "order") {
      const line = inputBox(); area.append(line);
      const pool = document.createElement("div"); pool.className = "tokens";
      for (const t of ex.choices) {
        const b = choiceButton(t, (label, btn) => {
          if (state.checked) return;
          const on = btn.getAttribute("aria-pressed") === "true";
          if (on) state.tokens.splice(state.tokens.lastIndexOf(label), 1);
          else state.tokens.push(label);
          btn.setAttribute("aria-pressed", String(!on));
          paintInput();
        }, true);
        pool.append(b);
      }
      area.append(pool);
      paintInput();
    } else if (ex.type === "number" && !/^\d+$/.test(ex.show)) {
      const inp = document.createElement("input");
      inp.type = "number"; inp.id = "num-input"; inp.inputMode = "numeric"; inp.min = "0"; inp.placeholder = "En chiffres";
      inp.addEventListener("input", () => { state.answer = inp.value; $("btn-check").disabled = !inp.value; });
      area.append(inp);
      setTimeout(() => inp.focus(), 50);
    } else {
      area.append(inputBox());
      if (ex.type === "number") {
        const hint = document.createElement("p"); hint.className = "muted";
        hint.textContent = "Consonnes nues : touche 0-3 du clavier."; area.append(hint);
      }
      unmountKb = mountKeyboard($("kb"));
      paintInput();
    }
  }

  function showExercise(ex, index, total) {
    Object.assign(state, { ex, answer: "", tokens: [], checked: false });
    $("counter").textContent = `${index + 1} / ${total}`;
    $("bar").style.width = `${(index / total) * 100}%`;
    $("ex-type").textContent = TYPE_LABEL[ex.type] ?? ex.type;
    $("prompt").textContent = ex.prompt;
    const showEl = $("show");
    showEl.className = "show";
    showEl.replaceChildren();
    if (ex.show) {
      if (isQuadra(ex.show)) showEl.append(glyph(ex.show, 56));
      else { showEl.classList.add("big"); showEl.textContent = ex.show; }
    }
    const canSpeak = ex.audio || (ex.show && isQuadra(ex.show));
    $("btn-speak").hidden = !canSpeak;
    $("btn-speak").onclick = () => bus.emit("speakRequested", { text: ex.audio ?? ex.show });
    if (ex.audio) bus.emit("speakRequested", { text: ex.audio });
    $("feedback").hidden = true;
    $("btn-check").hidden = false;
    $("btn-check").textContent = "Valider";
    buildAnswerArea(ex);
  }

  function paintFeedback({ correct, expected }) {
    const fb = $("feedback");
    fb.className = `feedback ${correct ? "ok" : "bad"}`;
    fb.replaceChildren();
    const t = document.createElement("div"); t.className = "title";
    t.textContent = correct ? "Juste" : "Raté";
    fb.append(t);
    if (!correct || state.ex.type === "listen" || state.ex.type === "typeWord") {
      const row = document.createElement("div"); row.className = "row";
      if (isQuadra(expected)) {
        row.append(glyph(expected, 36));
        const m = document.createElement("span"); m.className = "mono"; m.textContent = expected; row.append(m);
        const sense = byWord(expected)?.sense;
        if (sense) { const s = document.createElement("span"); s.className = "muted"; s.textContent = sense; row.append(s); }
        const sp = $("btn-speak").cloneNode(true); sp.hidden = false; sp.id = "";
        sp.addEventListener("click", () => bus.emit("speakRequested", { text: expected }));
        row.append(sp);
      } else {
        const m = document.createElement("span"); m.textContent = `Réponse : ${expected}`; row.append(m);
      }
      fb.append(row);
    }
    fb.hidden = false;
    for (const c of $("answer").querySelectorAll(".choice[aria-pressed='true']")) c.classList.add(correct ? "ok" : "bad");
    $("btn-check").textContent = "Continuer";
    $("btn-check").disabled = false;
  }

  $("btn-check").addEventListener("click", () => {
    if (!state.ex) return;
    if (state.checked) { onNext(); return; }
    state.checked = true;
    const answer = state.ex.type === "order" ? state.tokens.join(" ") : state.answer;
    bus.emit("answerSubmitted", { exercise: state.ex, answer });
  });
  $("btn-quit").addEventListener("click", () => { unmountKb?.(); unmountKb = null; onQuit(); });

  bus.on("answerChecked", (r) => { if (r.exercise === state.ex) paintFeedback(r); });
  bus.on("syllableTapped", ({ syllable }) => { if (!state.checked) { state.answer += syllable; paintInput(); } });
  bus.on("digitTapped", ({ digit }) => { if (!state.checked) { state.answer += digit; paintInput(); } });
  bus.on("keyTapped", ({ key }) => {
    if (state.checked) return;
    if (key === "space") state.answer = state.answer.trimEnd() + " ";
    else if (key === "hyphen") state.answer += "-";
    else {
      const m = state.answer.match(/( |-|[MSKL][AEIO]|[MSKL])$/);
      state.answer = m ? state.answer.slice(0, -m[0].length) : "";
    }
    paintInput();
  });

  return { showExercise };
}
