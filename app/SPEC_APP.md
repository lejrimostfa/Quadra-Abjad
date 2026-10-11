# Quadra, application d'apprentissage. Spécification v1

Une page web seule, téléphone d'abord, sans framework ni étape de build.
Modules ES natifs dans `js/`, données dans `data/`, sons dans `audio/`.
Langue de l'interface : français. Noms de code et d'événements : anglais.

## 1. Architecture

- `index.html` : coquille, charge les modules, trois écrans (accueil, leçon, révision).
- `js/bus.js` : bus d'événements. Toute communication UI et état passe par lui.
  L'UI réagit aux événements, elle n'est jamais pilotée directement par la logique.
- `js/glyphs.js` : rendu SVG des syllabes, mots, phrases et nombres.
- `js/keyboard.js` : clavier 4 x 4 plus chiffres, émet des événements.
- `js/audio.js` : prononciation par clips assemblés, repli sur la synthèse du navigateur.
- `js/lexicon.js` : chargement du lexique, grille, dérivations, contraires.
- `js/exercises.js` : générateurs d'exercices, à partir du lexique seulement.
- `js/srs.js` : répétition espacée, progression dans localStorage.
- `js/lessons.js` : programme : unité 0 puis une unité par champ de la grille.

Chaque module exporte des fonctions pures quand c'est possible, et un `mount(root)`
quand il dessine. Pas d'état global hors du bus et du module `srs`.

## 2. Événements du bus (`bus.emit(name, payload)`, `bus.on(name, fn)`)

| Événement | Payload | Émis par | Écouté par |
|---|---|---|---|
| `lexiconLoaded` | `{ words }` | lexicon | lessons, exercises |
| `lessonStarted` | `{ unitId, exercises }` | lessons | index (écran leçon) |
| `exerciseShown` | `{ exercise, index, total }` | index | glyphs, keyboard, audio |
| `syllableTapped` | `{ syllable }` | keyboard | index (zone de saisie) |
| `digitTapped` | `{ digit }` | keyboard | index |
| `inputChanged` | `{ text }` | index | glyphs (aperçu) |
| `answerSubmitted` | `{ exercise, answer }` | index | exercises |
| `answerChecked` | `{ exercise, correct, expected }` | exercises | index, srs, audio |
| `speakRequested` | `{ text }` | index, exercises | audio |
| `spoke` | `{ text, source }` | audio | index |
| `progressUpdated` | `{ wordId, box, due }` | srs | index (accueil) |
| `lessonFinished` | `{ unitId, score }` | index | srs, lessons |

## 3. Écriture et rendu (`glyphs.js`)

Alphabet : consonnes M S K L, voyelles A E I O. Syllabe = consonne + voyelle.
Consonne nue = chiffre (M 0, S 1, K 2, L 3). Composé = mots reliés par un tiret.

Rendu : chaque syllabe est un glyphe SVG dessiné par le module, jamais un
caractère combinant Unicode (rendu instable sur téléphone). La consonne est la
lettre minuscule m, s, k, l dans une police sans empattement. Le signe de
voyelle est un trait SVG placé par rapport à la boîte de la lettre :

| Voyelle | Signe | Place |
|---|---|---|
| A | point plein | au-dessus, centré |
| E | trait court incliné vers la droite (accent aigu) | au-dessus, centré |
| I | point plein | **sous** la consonne, centré (comme la kasra) |
| O | petit cercle vide | au-dessus, centré |

Consonne nue (chiffre) : la lettre sans signe. Tiret de composé : trait court
entre les deux mots, à mi-hauteur. Espace : blanc d'une demi-lettre.

API :
- `renderSyllable(syl, opts) -> SVGElement`
- `renderText(text, opts) -> SVGElement` (mots, espaces, tirets, nombres)
- `toUnicode(text) -> string` : forme NFD (m + U+0307, U+0301, U+0323 pour I sous, U+030A) pour copier-coller
- `opts = { size: px, color, showLatin: bool }` ; `showLatin` écrit MA SE sous le glyphe en petit.

Une syllabe inconnue (lettre hors alphabet) lève une erreur, jamais de rendu silencieux.

## 4. Clavier (`keyboard.js`)

Grille 4 x 4 : lignes M S K L, colonnes A E I O. Chaque touche montre le glyphe
SVG et, en petit, la forme latine. Une touche bascule "chiffres" : les 4 touches
M S K L nues. Touches effacer, espace, tiret.
`mount(root)` dessine. Émet `syllableTapped`, `digitTapped`, et `inputChanged`
est émis par l'écran, pas par le clavier. Cibles tactiles de 44 px minimum.

## 5. Son (`audio.js`)

Clips de référence dans `audio/` : `MA.wav` ... `LO.wav` (16) et `M.wav`, `S.wav`,
`K.wav`, `L.wav` (4 consonnes nues, lues avec un schwa). 22 050 Hz, mono, 16 bits.
Assemblage avec Web Audio : silence coupé aux bords (seuil 400 sur 16 bits),
fondu de 10 ms, pause de 20 ms entre syllabes, 60 ms sur un tiret, 180 ms entre
mots. Référence : `speak.py` à la racine de `app/`, même algorithme.
Repli : `speechSynthesis` avec une voix fr, graphie phonétique (mè, sè, kè, lè
pour E ; mo so ko lo pour O ; me se ke le pour les consonnes nues).
`speak(text)` émet `spoke` avec `source: "clips" | "synth"`. Les clips se
chargent une fois, à la première demande, pas au démarrage.

## 6. Lexique (`lexicon.js`, `data/lexique.json`)

Généré depuis `../lexique.tsv` par `build_lexicon.py`. Chaque entrée :
`{ id, word, domain, sense, cls, field, syllables }`.
- `cls` : `particule` (1 syllabe), `outil` (bloc O-O), `nom`, `personne`,
  `verbe`, `adjectif` (par la dernière voyelle), `compose` (tiret).
- `field` : les deux consonnes d'un mot de la grille (MM, MS, ...), vide sinon.
Fonctions : `load()`, `byWord(w)`, `derive(word, cls)` (KEKA + verbe = KEKI),
`contrary(word)` (E et I échangés, si le résultat existe), `field(f)`,
`numberToQuadra(n)`, `quadraToNumber(s)` (base 4, consonnes nues).

## 7. Exercices (`exercises.js`)

Un exercice : `{ type, prompt, choices?, answer, wordIds, audio? }`.
Tous générés depuis le lexique, aucun contenu écrit à la main sauf les phrases.

| Type | Consigne | Réponse |
|---|---|---|
| `readSyllable` | glyphe affiché, "quelle syllabe ?" | choix parmi 4 formes latines |
| `readWord` | glyphe du mot, "que veut dire ce mot ?" | choix parmi 4 sens |
| `typeWord` | sens affiché, "écris le mot" | saisie au clavier 4 x 4 |
| `derive` | "KEKA est le travail. Le travailleur ?" | saisie au clavier |
| `contrary` | "MEMO est grand. Le contraire ?" | saisie au clavier |
| `number` | nombre en chiffres arabes | saisie en consonnes nues, ou l'inverse |
| `order` | mots d'une phrase mélangés | remettre dans l'ordre |
| `listen` | son joué, "qu'as-tu entendu ?" | choix parmi 4, dont la paire minimale |

Les distracteurs d'un `readWord` ou `listen` viennent d'abord des paires
minimales du mot (même champ, autre voyelle), puis du même champ, puis au hasard.
Phrases pour `order` : `data/phrases.json`, extraites de `../GRAMMAIRE.md`
(`{ quadra, francais }`).

## 8. Répétition espacée (`srs.js`)

Boîtes de Leitner, 5 boîtes. Bonne réponse : boîte + 1. Mauvaise : boîte 1.
Échéance : 0, 1, 3, 7, 15 jours. Clé localStorage `quadra.progress.v1`,
`{ wordId: { box, due, seen, ok } }`. Toute lecture et écriture dans try/catch,
l'app marche sans stockage. `dueWords(now)`, `record(wordId, correct)`,
`stats()`.

## 9. Programme (`lessons.js`)

- Unité 0 : les 16 syllabes, les 16 particules, les nombres 0 à 15.
- Unités 1 à 16 : un champ de la grille chacune, dans l'ordre MM, MS, MK, ML,
  SM, SS, SK, SL, KM, KS, KK, KL, LM, LS, LK, LL. Les mots du champ, leurs
  dérivations, leurs contraires, puis deux phrases.
- Unité 17 : les 13 mots outils et les composés.
Une leçon = 10 exercices mélangés, du plus facile au plus dur. La révision
tire les mots échus du `srs` et génère 10 exercices dessus.

## 10. Écrans (`index.html`)

- Accueil : titre, progression (mots vus, mots sus), bouton "Leçon suivante",
  bouton "Réviser" avec le nombre de mots échus, liste des unités.
- Leçon : barre de progression, consigne, zone de glyphes, zone de réponse
  (choix ou clavier), bouton "Valider", retour vert ou rouge avec la bonne
  réponse et un bouton haut-parleur.
- Fin de leçon : score, mots appris, retour accueil.
Largeur téléphone, marges de 16 px, pas de défilement horizontal. Thème clair
et sombre par `prefers-color-scheme`.

## 11. Qualité

- Pas de dépendance externe. Pas d'étape de build.
- Chaque module a un test dans `tests/` lancé par `node tests/run.mjs`.
  Les tests des modules purs (lexicon, exercises, srs, glyphs `toUnicode`)
  tournent en Node sans navigateur.
- Style : phrases courtes, pas de tiret cadratin, pas de point médian.
- Fichier de plus de 200 lignes : à découper.
