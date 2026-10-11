// Écran principal : accueil, navigation, score, fin de leçon.
// Écoute : lessonStarted, progressUpdated, answerChecked. Émet : lessonFinished, speakRequested.
// La vue d'exercice est dans lesson-view.js. La logique métier reste dans les modules.
import { bus } from "./bus.js";
import * as lex from "./lexicon.js";
import { loadPhrases } from "./exercises.js";
import * as srs from "./srs.js";
import { units, buildLesson, buildReview } from "./lessons.js";
import { renderText } from "./glyphs.js";
import { mountLessonView } from "./lesson-view.js";
import "./audio.js";

const UNITS_KEY = "quadra.units.v1";
const PASS = 7;
const $ = (id) => document.getElementById(id);

function unitScores() {
  try { return JSON.parse(localStorage.getItem(UNITS_KEY) ?? "{}"); } catch { return {}; }
}
function saveUnitScore(id, score) {
  const s = unitScores();
  s[id] = Math.max(s[id] ?? 0, score);
  try { localStorage.setItem(UNITS_KEY, JSON.stringify(s)); } catch { /* mémoire seule */ }
}
function nextUnitId() {
  const s = unitScores();
  const u = units().find((x) => (s[x.id] ?? 0) < PASS);
  return u ? u.id : units().at(-1).id;
}

function show(screen) {
  for (const id of ["home", "lesson", "end"]) $(id).hidden = id !== screen;
  window.scrollTo(0, 0);
}

function renderHome() {
  const st = srs.stats();
  $("st-seen").textContent = st.seen ?? 0;
  $("st-known").textContent = st.known ?? 0;
  $("st-due").textContent = st.due ?? srs.dueWords().length;
  const due = srs.dueWords().length;
  $("btn-review").textContent = due ? `Réviser (${due})` : "Réviser";
  $("btn-review").disabled = !due;
  const next = units().find((u) => u.id === nextUnitId());
  $("btn-next").textContent = `Leçon : ${next.title}`;
  const scores = unitScores();
  const ul = $("units");
  ul.replaceChildren(...units().map((u) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    const sc = scores[u.id];
    b.className = "unit" + (sc >= PASS ? " done" : "");
    b.innerHTML = `<span class="n">${String(u.id).padStart(2, "0")}</span><span>${u.title}` +
      `<br><small class="muted">${u.words.length} mots</small></span>` +
      `<span class="score">${sc === undefined ? "" : `${sc} / 10`}</span>`;
    b.addEventListener("click", () => startLesson(u.id));
    li.append(b);
    return li;
  }));
}

// État de la leçon en cours.
const lesson = { unitId: null, exercises: [], index: 0, score: 0 };
let view = null;

function startLesson(unitId) {
  const exercises = unitId === "review" ? buildReview() : buildLesson(unitId);
  if (!exercises.length) { $("home-note").textContent = "Rien à réviser pour le moment."; return; }
  Object.assign(lesson, { unitId, exercises, index: 0, score: 0 });
  show("lesson");
  view.showExercise(exercises[0], 0, exercises.length);
}

function nextExercise() {
  lesson.index += 1;
  if (lesson.index < lesson.exercises.length) {
    view.showExercise(lesson.exercises[lesson.index], lesson.index, lesson.exercises.length);
    return;
  }
  bus.emit("lessonFinished", { unitId: lesson.unitId, score: lesson.score });
  if (lesson.unitId !== "review") saveUnitScore(lesson.unitId, lesson.score);
  $("end-score").textContent = `${lesson.score} / ${lesson.exercises.length}`;
  $("end-text").textContent = lesson.score >= PASS
    ? "Unité acquise. Les mots reviendront en révision dans quelques jours."
    : "Refais cette unité pour la valider, il faut 7 bonnes réponses.";
  show("end");
}

bus.on("answerChecked", ({ correct }) => { if (correct) lesson.score += 1; });

function heroGlyph() {
  try {
    const svg = renderText("KALE LASI LOLA", { size: 56 });
    $("hero-glyph").replaceChildren(svg);
  } catch (e) { console.error(e); }
}

async function boot() {
  await lex.load();
  await loadPhrases().catch((e) => console.error("phrases:", e));
  view = mountLessonView({ onNext: nextExercise, onQuit: () => { show("home"); renderHome(); } });
  heroGlyph();
  renderHome();
  $("btn-next").addEventListener("click", () => startLesson(nextUnitId()));
  $("btn-review").addEventListener("click", () => startLesson("review"));
  $("btn-home").addEventListener("click", () => { show("home"); renderHome(); });
  bus.on("progressUpdated", () => { if (!$("home").hidden) renderHome(); });
  if (location.hash === "#demo") startLesson(0);
}

boot().catch((e) => {
  console.error(e);
  $("home-note").textContent = "Le lexique n'a pas pu se charger. Recharge la page.";
});
