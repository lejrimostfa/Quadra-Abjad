// Prononciation : clips assemblés avec Web Audio, repli sur speechSynthesis.
// Même algorithme que speak.py : coupe du silence (seuil 400 sur 16 bits),
// fondu de 10 ms, pauses 20 ms (syllabes), 60 ms (tiret), 180 ms (mots).
// Événements émis : spoke { text, source: "clips" | "synth" }.
// Événements écoutés : speakRequested { text }.
import { bus } from "./bus.js";

const RATE = 22050;
const THRESH = 400;
const FADE = Math.round(0.010 * RATE);
const PAUSE = { word: 0.18, join: 0.06, syl: 0.02 };
const CLIPS_URL = new URL("../audio/", import.meta.url);
const hasDoc = typeof document !== "undefined";

let ctx = null;
const clipCache = new Map(); // nom -> Promise<Float32Array>

// Le contexte naît au premier geste, puis se réveille à chaque speak (iOS).
function ensureCtx() {
  if (!ctx) {
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch { return null; }
    try { // tampon muet : iOS exige une lecture dans le geste
      const s = ctx.createBufferSource();
      s.buffer = ctx.createBuffer(1, 1, RATE);
      s.connect(ctx.destination);
      s.start(0);
    } catch { /* sans effet */ }
  }
  if (ctx.state !== "running") ctx.resume?.().catch?.(() => {});
  return ctx;
}

if (hasDoc) {
  const unlock = () => ensureCtx();
  for (const ev of ["pointerdown", "touchend", "keydown", "click"]) {
    document.addEventListener(ev, unlock, { once: true, passive: true });
  }
}

// Lit un WAV PCM 16 bits mono. Renvoie des Int16.
function parseWav(buf) {
  const dv = new DataView(buf);
  const tag = (o) => String.fromCharCode(dv.getUint8(o), dv.getUint8(o + 1), dv.getUint8(o + 2), dv.getUint8(o + 3));
  if (tag(0) !== "RIFF" || tag(8) !== "WAVE") throw new Error("WAV invalide");
  let o = 12;
  while (o + 8 <= dv.byteLength) {
    const size = dv.getUint32(o + 4, true);
    if (tag(o) === "data") {
      const n = Math.min(size, dv.byteLength - o - 8) >> 1;
      const out = new Int16Array(n);
      for (let i = 0; i < n; i++) out[i] = dv.getInt16(o + 8 + 2 * i, true);
      return out;
    }
    o += 8 + size + (size & 1);
  }
  throw new Error("Pas de bloc data");
}

// Coupe le silence aux bords, garde un fondu de marge, applique les rampes.
function prepare(a) {
  let i = 0, j = a.length;
  while (i < j && Math.abs(a[i]) < THRESH) i++;
  while (j > i && Math.abs(a[j - 1]) < THRESH) j--;
  const s = a.subarray(Math.max(0, i - FADE), Math.min(a.length, j + FADE));
  const f = new Float32Array(s.length);
  for (let k = 0; k < s.length; k++) f[k] = s[k] / 32768;
  for (let k = 0; k < Math.min(FADE, f.length); k++) {
    f[k] *= k / FADE;
    f[f.length - 1 - k] *= k / FADE;
  }
  return f;
}

function loadClip(name) {
  if (!clipCache.has(name)) {
    const p = fetch(new URL(`${name}.wav`, CLIPS_URL))
      .then((r) => { if (!r.ok) throw new Error(`${name}.wav : ${r.status}`); return r.arrayBuffer(); })
      .then((b) => prepare(parseWav(b)));
    p.catch(() => clipCache.delete(name)); // on réessaiera à la demande suivante
    clipCache.set(name, p);
  }
  return clipCache.get(name);
}

// Texte -> mots -> parties (tiret) -> unités (syllabes ou consonnes nues).
function plan(text) {
  const words = String(text).toUpperCase().trim().split(/\s+/).filter(Boolean);
  return words.map((w) => w.replace(/'/g, "-").split("-").map((part) => {
    if (!/^[MSKL]+$|^([MSKL][AEIO])+$/.test(part)) throw new Error(`Texte invalide : "${part}"`);
    return /^[MSKL]+$/.test(part) ? [...part] : part.match(/../g);
  }));
}

async function assemble(words) {
  const names = new Set(words.flat(2));
  const clips = new Map(await Promise.all([...names].map(async (n) => [n, await loadClip(n)])));
  const gap = (sec) => Math.round(sec * RATE);
  const chunks = [];
  words.forEach((parts, wi) => {
    if (wi) chunks.push(gap(PAUSE.word));
    parts.forEach((units, pi) => {
      if (pi) chunks.push(gap(PAUSE.join));
      units.forEach((u, ui) => {
        if (ui) chunks.push(gap(PAUSE.syl));
        chunks.push(clips.get(u));
      });
    });
  });
  const total = chunks.reduce((n, c) => n + (typeof c === "number" ? c : c.length), 0);
  const out = new Float32Array(total);
  let at = 0;
  for (const c of chunks) {
    if (typeof c === "number") at += c; else { out.set(c, at); at += c.length; }
  }
  return out;
}

async function playClips(words) {
  const ac = ensureCtx();
  if (!ac) throw new Error("Web Audio absent");
  const data = await assemble(words);
  await ac.resume?.();
  const buf = ac.createBuffer(1, data.length, RATE);
  buf.copyToChannel(data, 0);
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.connect(ac.destination);
  await new Promise((resolve) => { src.onended = resolve; src.start(); });
}

// Graphie phonétique française : E -> è, O -> o, consonne nue -> consonne + e.
function phonetic(words) {
  return words.map((parts) => parts.map((units) => units.map((u) => {
    const c = u[0].toLowerCase();
    if (u.length === 1) return `${c}e`;
    return c + (u[1] === "E" ? "è" : u[1].toLowerCase());
  }).join(units[0].length === 1 ? " " : "")).join(", ")).join(". ");
}

function playSynth(words) {
  const ss = globalThis.speechSynthesis;
  if (!ss || typeof SpeechSynthesisUtterance === "undefined") return Promise.reject(new Error("Synthèse absente"));
  const u = new SpeechSynthesisUtterance(phonetic(words));
  u.lang = "fr-FR";
  u.voice = ss.getVoices().find((v) => v.lang?.toLowerCase().startsWith("fr")) ?? null;
  return new Promise((resolve) => {
    u.onend = u.onerror = resolve;
    ss.cancel();
    ss.speak(u);
  });
}

// Prononce text. Renvoie "clips", "synth" ou null si rien n'a marché.
export async function speak(text) {
  const words = plan(text); // lève une erreur sur un caractère hors alphabet
  if (!words.length) return null;
  ensureCtx(); // synchrone, dans le geste de l'utilisateur
  let source = "clips";
  try { await playClips(words); }
  catch {
    source = "synth";
    try { await playSynth(words); } catch { return null; }
  }
  bus.emit("spoke", { text, source });
  return source;
}

bus.on("speakRequested", ({ text }) => {
  speak(text).catch((e) => console.error("audio:", e));
});
