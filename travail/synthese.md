# Synthèse du cycle 1 (étudiant, correcteur, chercheur)

Date : 2026-10-11. Fichiers : etudiant.md, correcteur.md, chercheur.md.
Rien dans le noyau (SPEC.md, lexique.tsv, quadra*.py) n'a été modifié.

## Résultat du test d'usage (étudiant Opus, correcteur Sonnet)

| Mesure | Valeur |
|---|---|
| Phrases tentées | 30 |
| Justes du premier coup | 11 |
| Corrigées (erreur de l'étudiant) | 7 |
| Impossibles avec la spec v0.2 | 12 |
| Mots manquants confirmés | 12 |
| Manques résolubles par périphrase | 8 |

Erreurs de l'étudiant : 8 périphrases non vues (lire = KIMA LAKA, avoir = MA KA,
collègue = MAMA KAMA), 1 SO mal placé. Aucune erreur d'ordre des mots, de
particules ni de nombres. La syntaxe de la v0.2 tient.

Trous de la spec, par ordre de blocage (classement du correcteur) :
1. Lexique de verbes : 4 verbes, c'est le frein principal.
2. Temps et lieu : hier, demain, matin, heure, sur, sous.
3. Adjectif attribut et interrogatifs (où, quand, qui).
4. Relatif (que, qui) : LAKA MO KIMA se lit "le livre que tu vois" ou "ton livre voit".
5. SO ambigu entre "si" et question. Contournable en mettant la condition après.

## Proposition du chercheur (Fable)

Grille sémantique pour les mots de 2 syllabes, règle en 3 lignes :
1. C1 = domaine, C2 = angle, mêmes 4 sens aux deux positions. 16 champs.
2. V1 = nuance : A base, E dehors/grand/ancien, I dedans/petit, O abstrait.
   Les paires E/I donnent les contraires (MEMO grand, MIMO petit).
3. V2 = classe : A nom, E personne, I verbe, O adjectif.
   Chaque nom donne 3 dérivés gratuits (KEKA travail, KEKE travailleur, KEKI travailler).

Grille remplie : 159 mots, 64 cases nom toutes prises. 21 des 25 mots de
contenu actuels déménagent, 4 restent (MAMA, SALA, SOLA, LAKA).
La phrase de la spec devient KALE LASI LOLA KOKA KA SEMA KILA.

Grammaire : une seule particule nouvelle, LA = relatif. Le reste réemploie
les particules existantes (voir chercheur.md section B). 35 exemples passés au
gloss, zéro INVALIDE.

Écriture : minuscules m s k l plus signes combinants U+0307 U+0301 U+0300
U+030A, stockage NFD. Phrase d'exemple : m̀ś ḱl̀ l̊ṁ k̇ṁ k̇ ṁṁ k̀l̊.

## Frictions relevées à la relecture

- Les 11 mots TSV du correcteur (KEMO manger, SOKA commencer, ...) supposent un
  lexique arbitraire. Sous la grille ils sont remplacés (MAKI manger, SEKI
  commencer). Les deux listes s'excluent.
- Dans chercheur.md, SEKI vaut à la fois "partir" et "commencer", SIKI
  "arriver" et "finir". Polysémie acceptable ou collision, à trancher.
- Le lien E = personne, I = verbe est une convention, pas une déduction. Le
  chercheur le dit lui-même. C'est le point à mémoriser par coeur.

## Décision bloquante

Grille ou lexique arbitraire. Tout le reste en dépend : les 12 mots à ajouter,
la phrase d'exemple, la migration des 21 mots. Les 13 autres décisions sont
listées en fin de chercheur.md avec une recommandation chacune.

Si "grille" : importer les 159 mots dans lexique.tsv, ajouter LA, réécrire
SPEC.md sections 5 à 9, relancer tests.py, refaire passer les 30 phrases.
Si "arbitraire" : ajouter les 11 mots TSV du correcteur et LA, retirer la
promesse "chaque lettre a un sens" de la spec.

## Cycle 2 : grille appliquée (v0.3)

Décision de Mostfa : grille. Fait le 2026-10-11.
- lexique.tsv : 180 mots (16 particules dont LA, 159 mots de grille, 5 mots de 3 syllabes).
- SPEC.md v0.3 : sections 5 à 11 réécrites. Phrase d'exemple KALE LASI LOLA KOKA KA SEMA KILA.
- tests.py : passe. 36 vraies phrases de la grammaire du chercheur glosées sans mot inconnu.

Les 30 phrases de l'étudiant, réécrites en v0.3 (etudiant_v03.md), vérifiées par script :

| Mesure | v0.2 | v0.3 |
|---|---|---|
| Phrases complètes | 12 | 24 |
| Avec [MANQUE] | 18 | 6 |
| Mots inconnus ou invalides | 0 | 0 |

Manques restants, une fois chacun : se lever, liste, lire, bonjour, où, clé.
Clé est un manque nouveau : SOLA ne veut plus dire que porte.
Trois approximations à valider : "sur" par KI MALA, "bureau" par LIMA, "à 9 heures" par KS SASA.

Retours de l'apprenant sur la grille :
- Facile : un nom appris donne sa personne et son verbe (KEKA, KEKE, KEKI).
- Dur : les mots à une voyelle d'écart se confondent à la lecture (KIKA, KIMA, KILA, KEKA, KOKA).
- SO a trois lectures en tête de phrase : si, question, demande polie.
- SESA KE ... KE répète la particule, la phrase est lourde.

Prochaines pistes : trancher sur/sous/où, décider pour "si" (particule distincte ou condition en fin de phrase), ajouter clé, lire, se lever dans leurs cases.

## Cycle 3 : SI redevient "si"

Décision de Mostfa, 2026-10-11. SI = si (condition, en tête de la subordonnée).
SO ne garde que question et demande polie. "Et" rejoint SA (avec, ensemble, et).
Ripple : une phrase de l'étudiant utilisait SI comme et (n° 5), une autre SO
comme si (n° 30). Les fichiers etudiant*.md sont gardés tels quels, en archive.

## Cycle 4 : points ouverts fermés

2026-10-11. Sur et sous par nom relationnel du corps (KI MALA X, KI MAMASA X).
Interrogatifs par LI dans une question SO (KI LI où, SASA LI quand). Clé =
SOLAKA. Lire, se lever, liste, bonjour, bonsoir en locutions (GRAMMAIRE.md).
Zéro particule nouvelle. Reste ouvert : l'ambiguïté KI MALA sur un être vivant.

## Cycle 5 : les quatre décisions de structure, v0.4

2026-10-11. Décidées par Mostfa après jugement de constructibilité.
1. Bloc O-O (16 cases à deux voyelles O) réservé aux mots outils de deux
   syllabes. 13 placés : SOSO ou, LOKO parce que, KOLO donc, KOKO pouvoir,
   KOSO devoir, KOMO passif, LOSO que, SOMO comme, SOLO aussi, LOLO peut-être,
   MOMO très, MOSO chaque, MOLO autre. Cinq adjectifs ont déménagé : beau MALO,
   sain MAKO, bon KALO. Mort (adj) = KO MASO. Commun fusionne dans SEMO.
2. Mot de trois syllabes : racine + syllabe de précision dont la voyelle est la
   classe. LAMALE devient LAMALA, SESALE devient SESALA.
3. La grille est déclarée mnémotechnique, pas dérivation.
4. Règle des paires minimales, outil `pairs`. Outil `free` pour les cases.
Plus, à la demande de Mostfa : composés par tiret (MAMA-MAKI), classe du
premier mot, tiret = jeton nombre MM (8 bits) dans le flux binaire. Les
locutions deviennent des composés : MILI-LAKA lire, SEKI-KIMA se lever,
LAKA-KEKA liste.
Grammaire : règles 16 à 21 (modaux, passif, complétive, cause, ou, intensif).

## Cycle 6 : paires minimales mesurées

`pairs` classe les 748 paires : 195 risque fort (même champ, même classe),
385 moyen (même classe, champ différent), 168 faible (classe différente).
Le risque fort est structurel : chaque ligne de la grille (MAKA, MEKA, MIKA,
MOKA) est une série de paires minimales dans le même emplacement de phrase.
Prononciation fixée dans la spec (A, E ouvert, I, O fermé).
Question de Mostfa : 350 mots suffisent pour parler ? Oui avec composition.
Décision en attente : comment traiter les paires fortes à l'oral.

## Cycle 7 : application d'apprentissage, v1

2026-10-11. Dossier app/. Page publiée : https://claude.ai/artifact/DzkpjmXtMmQSLgFdXY2kG8
- Spec : app/SPEC_APP.md. Bus d'événements : js/bus.js.
- Builder A (Sonnet) : glyphs.js, glyph-marks.js (SVG, I sous la consonne),
  keyboard.js (4 x 4 plus chiffres), audio.js (clips assemblés, repli synthèse).
- Builder B (Sonnet) : lexicon.js, exercises.js (8 types), srs.js (Leitner 5
  boîtes), lessons.js (unité 0, 16 champs, unité 17), data/phrases.json (34).
- Intégration : index.html, js/app.js, js/lesson-view.js. 6 fichiers de tests
  Node passent (node tests/run.mjs).
- Son : 20 clips WAV générés par la voix Thomas de macOS (app/audio/gen_clips.sh),
  assemblage de référence app/speak.py, démos dans app/demo/.
Non vérifié : le son dans le navigateur, le toucher sur téléphone.
