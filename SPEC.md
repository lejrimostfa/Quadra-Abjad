# Quadra Abjad, spécification v0.4

Langue construite à 4 consonnes et 4 voyelles. Ce document fixe les règles.
Les points marqués **[proposition]** sont des choix faits pour débloquer le
système. Ils se changent en une ligne.

## 1. Alphabet

| Consonne | Domaine | Valeur |
|---|---|---|
| M | matière, humain, corps | 0 |
| S | lien, mouvement, temps | 1 |
| K | action, création, travail | 2 |
| L | esprit, lieu, savoir | 3 |

| Voyelle | Sens | Valeur | Diacritique |
|---|---|---|---|
| A | neutre, présent, affirmation | 0 | point |
| E | passé, ouverture, extérieur | 1 | aigu |
| I | intérieur, profondeur, étude | 2 | grave |
| O | idée, condition, nuance | 3 | rond |

## 2. Phonotactique

- Une **syllabe** est une consonne suivie d'une voyelle. 16 syllabes.
- Un **mot** est une suite de 1 à 4 syllabes. Pas de consonne nue dans un mot.
- Une syllabe = mot grammatical (GRAMMAIRE.md). Deux syllabes = mot de la grille (section 5).
  Trois ou quatre = racine de deux syllabes plus précision, ou nom propre.
- Une **consonne nue** est un chiffre, jamais une lettre de mot. **[proposition]**

Conséquence : un mot et un nombre ne peuvent jamais se confondre.
L'ancienne règle "pas plus de deux consonnes nues de suite" tombe, elle ne
servait qu'à séparer mots et nombres.

## 3. Nombres (base 4)

Un nombre s'écrit avec des consonnes nues, poids fort à gauche.

| Nombre | Écriture |
|---|---|
| 0 | M |
| 1 | S |
| 2 | K |
| 3 | L |
| 4 | SM |
| 5 | SS |
| 10 | KK |
| 16 | SMM |
| 255 | LLLL |

En écriture développée, une consonne nue se lit avec un schwa bref
(M "me", S "se"). En écriture diacritique, c'est la consonne sans signe.

## 4. Encodage machine

Chaque lettre vaut 2 bits (M 00, S 01, K 10, L 11 ; A 00, E 01, I 10, O 11).
Une syllabe vaut donc 4 bits, soit un chiffre hexadécimal. Deux syllabes font
un octet.

| Mot | Base 4 | Hex |
|---|---|---|
| MA | 00 | 0 |
| MISE | 0211 | 25 |
| KAMA | 2000 | 80 |

### Flux binaire

Les 16 syllabes occupent tout le demi-octet, il n'y a pas de code pour
l'espace. Un flux porte donc la longueur de chaque jeton en tête.

```
flux   = bourrage (3 bits) + jetons + zéros de bourrage, aligné sur l'octet
mot    = 0 + (nb syllabes - 1, 2 bits) + 4 bits par syllabe
nombre = 1 + (nb chiffres - 1, 3 bits) + 2 bits par chiffre
```

Le tiret d'un composé est le jeton nombre MM (zéro en tête, jamais produit
par un nombre), 8 bits.
Le bourrage en tête dit combien de zéros ignorer à la fin. Un nombre va de
1 à 8 chiffres, donc de 0 à 65535. Un mot va de 1 à 4 syllabes.

| Phrase | Octets | ASCII |
|---|---|---|
| MISE | 2 | 4 |
| KAMO KK | 3 | 7 |
| MISE KELI LOMA KAMA KA MAMA KILO | 10 | 32 |

C'est un encodage compact, pas une compression. Le gain vient de la petitesse
de l'alphabet.

## 5. Grille sémantique des mots de deux syllabes

Un mot de deux syllabes se lit `C1 V1 C2 V2` : domaine, nuance, angle, classe.
Les quatre sens des consonnes servent aux deux positions.

| C1 \ C2 | M chose, corps | S lien, mouvement, temps | K action, outil | L esprit, lieu, savoir |
|---|---|---|---|---|
| **M** | MM corps, personne, quantité | MS vie, âge, mort | MK nourriture, vêtement, soin | ML tête, sens, sensation |
| **S** | SM famille, groupe, ami | SS moment, jour, nuit, année | SK voyage, départ, arrivée, don | SL chemin, loin, près, porte |
| **K** | KM outil, table, lit, produit | KS argent, prix, commerce | KK acte, travail, tâche, projet | KL décision, plan, étude, objectif |
| **L** | LM maison, ville, pièce, monde | LS parole, langue, nom, sens | LK livre, école, leçon, règle | LL pensée, savoir, mémoire, idée |

| V1 | Nuance dans la case | Exemple |
|---|---|---|
| A | la chose de base | MAMA personne, LAKA livre |
| E | le dehors, le grand, le collectif, l'ancien | SEMA groupe, SESA jour |
| I | le dedans, la partie, le petit, le profond | MIMA partie, SISA nuit |
| O | l'abstrait, l'état, l'idée | KOKA projet, LOLA idée |

| V2 | Classe | Exemple |
|---|---|---|
| A | nom | KEKA travail |
| E | personne, celui qui | KEKE travailleur, KALE chef |
| I | verbe | KEKI travailler, LAKI écrire |
| O | adjectif | KAKO actif, MEMO grand |

Les paires E/I donnent les contraires : MEMO grand, MIMO petit. SEKI partir,
SIKI arriver. Chaque nom a sa personne, son verbe et son adjectif.
Le lien E = personne, I = verbe est une convention à apprendre.

**Bloc O-O réservé.** Les 16 cases à deux voyelles O (MOMO, SOSO, KOKO, ...)
sont les mots outils de deux syllabes : ou, parce que, pouvoir, devoir, passif,
etc. Double abstraction = grammaire. Liste dans `GRAMMAIRE.md`.

**Mots de trois syllabes.** Syllabes 1 et 2 = racine de la grille. Syllabe 3 =
précision : sa consonne est un angle, sa voyelle est la classe du mot. Un mot
en I est toujours un verbe, quelle que soit sa longueur. MAMAKA main (corps,
angle action, nom), SESAKA matin (jour, angle action), SESALA soir (jour,
angle lieu), SOLAKA clé (porte, angle outil). Noms propres : trois ou quatre
syllabes choisies par le porteur, par exemple MOSEKA.

**La grille est un moyen mnémotechnique, pas une dérivation.** Elle garantit
le champ d'un mot, jamais son sens exact. Au-delà du noyau, un mot s'apprend.

**Distance entre les mots.** Quatre voyelles donnent des paires à une lettre
d'écart en série (KIKA, KIMA, KILA). Règle : deux mots fréquents de la même
classe ne doivent pas différer d'une seule lettre si leurs sens peuvent se
confondre dans une phrase. `python3 quadra.py pairs` liste les paires.

Le lexique complet vit dans `lexique.tsv`. Les 16 tableaux 4 x 4 remplis sont
dans `travail/chercheur.md`, section A.5.

## 6. Exemple

La grammaire complète (particules, syntaxe, locutions) est dans `GRAMMAIRE.md`.

`KALE LASI LOLA KOKA KA SEMA KILA`
Le responsable explique l'idée du projet à l'équipe de recherche.
KALE action-esprit-personne, LASI esprit-lien-verbe, LOLA esprit-esprit-abstrait.

## 7. Écriture diacritique

Consonne en minuscule, voyelle en signe combinant, texte stocké en NFD.

| Voyelle | Signe | Unicode |
|---|---|---|
| A | point suscrit | U+0307 |
| E | accent aigu | U+0301 |
| I | accent grave | U+0300 |
| O | rond suscrit | U+030A |

Chiffre = consonne nue. Polices vérifiées : SF, Arial, Times New Roman,
Courier New, Helvetica, Menlo. Verdana manque le point et le rond.
Exemple : m̀ś ḱl̀ l̊ṁ k̇ṁ k̇ ṁṁ k̀l̊ (ancienne phrase MISE KELI ...).

## 8. Points ouverts

- `KI MALA MAMA` se lit sur la personne ou dans sa tête. Le nom relationnel
  est ambigu quand X a un corps.
- `SO MO MILI LI` vaut que vois-tu, jamais le vois-tu. À retenir.
- SA vaut avec et et. `MI SAKI SA MO` se lit je vais avec toi ou je vais et
  toi. Les deux sens restent proches, à surveiller.
- Paires minimales : règle posée (section 5), à appliquer au fil du lexique.
- Mots étrangers : pas de transcription possible avec 4 consonnes. Les noms
  propres se choisissent.
- SEKI vaut partir et commencer, SIKI arriver et finir. Polysémie assumée.
- Nombres au-dessus de 65535 : pas prévus dans le flux binaire.
- Historique : la v0.2 avait un lexique arbitraire de 25 mots. 21 ont
  changé de forme en v0.3 (voir travail/chercheur.md, A.6).

## 9. Outils

```
python3 quadra.py check                # vérifie le lexique
python3 quadra.py free                 # cases libres de la grille
python3 quadra.py pairs                # paires minimales du lexique
python3 quadra.py encode KALE          # base 4, hex, octets
python3 quadra.py num 10               # 10 -> KK
python3 quadra.py parse KK             # KK -> 10
python3 quadra.py gloss "KALE LASI LOLA KOKA KA SEMA KILA"
python3 quadra.py gloss "MI MILI-LAKA"  # composé
python3 quadra.py bits "KAMA KK"       # flux binaire, hex, taille
python3 quadra.py unbits 460e68        # retour vers la phrase
python3 tests.py
```
