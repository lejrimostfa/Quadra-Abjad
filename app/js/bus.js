// Bus d'événements. Toute communication UI et état passe ici.
// Usage : bus.on("answerChecked", fn) ; bus.emit("answerChecked", { correct: true })
// Un abonnement renvoie une fonction de désabonnement.

const listeners = new Map();

export const bus = {
  on(name, fn) {
    if (!listeners.has(name)) listeners.set(name, new Set());
    listeners.get(name).add(fn);
    return () => listeners.get(name)?.delete(fn);
  },
  once(name, fn) {
    const off = this.on(name, (payload) => { off(); fn(payload); });
    return off;
  },
  emit(name, payload = {}) {
    for (const fn of listeners.get(name) ?? []) {
      try { fn(payload); } catch (e) { console.error(`bus: ${name}`, e); }
    }
  },
  clear() { listeners.clear(); },
};
