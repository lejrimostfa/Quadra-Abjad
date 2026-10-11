# Correction de la copie de l'étudiant

Autorité : SPEC.md v0.2. Toutes les phrases ont été relancées avec `quadra.py gloss`. Aucun mot INVALIDE. Les nombres sont bien en consonnes nues (9 = `KS`, vérifié avec `quadra.py num 9`).

Légende des verdicts :
- **juste** : la phrase est correcte telle quelle.
- **corrigée** : une forme correcte existe avec les mots et règles actuels.
- **impossible en l'état** : il manque un mot ou une règle. Une forme partielle est donnée.

## 1. Les 30 phrases corrigées

| N | Français | Quadra corrigé | Verdict | Commentaire |
|---|---|---|---|---|
| 1 | Je me lève le matin. | `MI SAKE LE MOSA` (+ "matin" manquant) | impossible | "Se lever" = sortir du lit, valable (erreur de l'étudiant : périphrase non vue). "Matin" manque vraiment. Place de l'adverbe de temps non fixée (trou). |
| 2 | Je sors du lit. | `MI SAKE LE MOSA` | juste | |
| 3 | Je mange le repas. | `MI [manger] MOKA` | impossible | `MI KASA MOKA` est valide mais veut dire cuisiner ou manger. Pas clair. Manque confirmé : manger. |
| 4 | Le repas est sur la table. | `MOKA MA [sur] MALA` | impossible | Pas de préposition de lieu "sur". `KI` ne convient pas. |
| 5 | J'ouvre la porte et je sors de la maison. | `MI KASA MELE SOLA SI MI SAKE LE MALO` | corrigée | "Ouvrir la porte" = faire l'ouverture de la porte (MELE = l'ouverture). Sujet répété : sûr, la spec ne dit rien sur l'omission (trou mineur). |
| 6 | Je vais au travail. | `MI SAKE KA KAMA` | juste | |
| 7 | Le chemin est long. | `SALA MA [long]` | impossible | Manque "long" et règle de l'adjectif attribut. Aucune périphrase claire. |
| 8 | Le travail commence à 9 heures. | `KAMA [commencer] KA SIME KS` (partiel) | impossible | Manquent "commencer" et "heure". Le nombre `KS` après la tête suit l'exemple `KAMO KK`. Repli sans "commencer" : `KAMA MA KI SIME KS`, mais le sens change (le travail est à 9). |
| 9 | Je travaille dans la maison du chef. | `MI KASA KAMA KI MALO MISE` | juste | "Faire le travail" est une périphrase claire. `MALO MISE` = la maison du chef, c'est la règle 2 (`LOMA KAMA` = l'idée du projet). Le doute de l'étudiant ("maison principale") n'est pas un trou : la règle 2 tranche. |
| 10 | Le chef explique l'objectif à l'équipe. | `MISE KELI KOLE KA MAMA` | juste | La polysémie de MAMA est dans le lexique, pas dans la grammaire. |
| 11 | Liste des tâches de demain. | `LAKA KAMA SE [demain]` (partiel) | impossible | "Liste" = `LAKA KAMA` (document de tâches), valable. "Demain" manque. `SE` suit le nom qu'il marque (règle 4), donc ici KAMA. Cas du groupe entier non couvert (trou mineur). |
| 12 | Un : lire le document d'étude. | `S KIMA LAKA KILO` | corrigée | "Lire" = `KIMA LAKA`, valable. Pas d'impératif ni d'ordinal dans la spec : `S` peut se lire "un" ou "numéro un" (trou). Variante sans ambiguïté : `MI KE KIMA LAKA KILO`. |
| 13 | Deux : voir le chef. | `K KIMA MISE` | juste | Valide. Lecture "deux personnes voient le chef" possible (trou : ordinal, impératif). |
| 14 | Trois : apporter l'argent à l'école. | `L SAKE SA KESO KA LEKI` | corrigée | "Apporter" = aller avec (SA) + objet. Clair. Sans sujet : même trou que 12. |
| 15 | Bonjour collègue. | `[bonjour] MAMA KAMA` (partiel) | impossible | "Collègue" = `MAMA KAMA` (personne du travail), valable. "Bonjour" manque (formule). |
| 16 | Le document est dans ton bureau. | `LAKA MA KI MALO KAMA MO` | corrigée | "Bureau" = `MALO KAMA` (la maison du travail). "Ton" = MO en modifieur (règle 2). Deux modifieurs en chaîne : l'ordre d'attache n'est pas écrit (trou mineur). |
| 17 | Je te parlerai demain. | `MI KE KELI KA MO [demain]` (partiel) | impossible | Le futur est déjà porté par KE. "Demain" manque, et sa place aussi. |
| 18 | Le livre que tu vois est à moi. | `MO KIMA LAKA SI LAKA MA KA MI` | corrigée | Pas de relatif : on coupe en deux propositions reliées par `SI`. Perte de la subordination. "Être à moi" = `MA KA MI`, KA = datif (règle 6), valable. |
| 19 | Tu vois le document ? | `SO MO KIMA LAKA` | juste | |
| 20 | Où est le livre ? | `SO LAKA MA [où]` | impossible | SO ne fait que oui/non. Pas de mot interrogatif. Reformulation oui/non seulement : `SO LAKA MA KI MALO` (le livre est-il dans la maison ?). |
| 21 | Je ne vois pas la clé. | `MI KO KIMA SOLA` | juste | |
| 22 | Le projet n'est pas fini. | `KAMA KO MA [fini]` | impossible | `ME` est un passé simple, pas un accompli. `MI KO ME KASA KAMA` (je n'ai pas fait le projet) change le sujet et le sens. L'ordre `KO MA` est conforme à la règle 3. |
| 23 | Hier, le chef a parlé à l'équipe. | `MISE ME KELI KA MAMA` (partiel, sans "hier") | impossible | Le passé est déjà porté par ME. "Hier" manque. |
| 24 | Je ne suis pas allé à l'école. | `MI KO ME SAKE KA LEKI` | juste | Conforme à la règle 3. |
| 25 | Nous ferons le projet ensemble. | `MI SE KE KASA KAMA SA` | juste | `SA` est défini comme "avec, ensemble". SA sans complément n'est pas interdit. Place de l'adverbe non fixée (trou mineur). |
| 26 | Les gens voient les livres. | `MAMA SE KIMA LAKA SE` | juste | |
| 27 | J'ai trois livres. | `LAKA L MA KA MI` | corrigée | "Avoir" = être à (datif). Nombre après le nom, comme `KAMO KK`. |
| 28 | Dix personnes sont dans la maison. | `MAMA KK MA KI MALO` | juste | La forme de l'étudiant `MAMA SE KK ...` ne viole aucune règle. Mais l'exemple `KAMO KK` = dix outils n'a pas de SE. Je recommande la forme sans SE (trou : SE avec un nombre). |
| 29 | Mon livre est sur ma table. | `LAKA MI MA [sur] MALA MI` | impossible | Manque "sur". La lecture "le livre, moi, je suis" est écartée par la règle 1 (sujet puis verbe). |
| 30 | Si tu vas à l'école, je vais avec toi. | `MI SAKE SA MO SO MO SAKE KA LEKI` | corrigée | Erreur de l'étudiant : il met SO en tête, donc question (règle 5). SO ailleurs dans la phrase reste "si". On pose la condition après la principale. |

## 2. Bilan chiffré

Verdicts sur 30 :
- Justes : 11 (2, 6, 9, 10, 13, 19, 21, 24, 25, 26, 28).
- Corrigées : 7 (5, 12, 14, 16, 18, 27, 30).
- Impossibles en l'état : 12 (1, 3, 4, 7, 8, 11, 15, 17, 20, 22, 23, 29).

Erreurs de l'étudiant (la spec permettait de faire juste) : 9 occurrences.
- Périphrase non vue : 8 (se lever en 1, ouvrir en 5, liste en 11, lire en 12, apporter en 14, collègue en 15, bureau en 16, avoir en 27).
- Mauvais emploi de SO en tête pour "si" : 1 (phrase 30).
- Erreurs d'ordre ou de particules : 0. KO, ME, KE, SE, SO question, KA datif et les nombres sont tous bien placés.
- Remarque : le doute sur la possession (9, 16, 29) est à moitié infondé. La règle 2 donne déjà "X de Y". Seul le pronom possessif n'est pas montré en exemple.

Trous de la spec (aucune règle ne permettait de faire juste) :
- Lexique, mots absents : 12 mots (voir partie 3).
  - Verbes : manger, commencer.
  - Temps : matin, demain, hier, heure.
  - Lieu : sur.
  - Adjectifs : long, fini.
  - Formule : bonjour.
  - Interrogatif : où.
  - Relatif : que.
- Grammaire, règles absentes :
  - Interrogatifs (où, quand, qui) : phrase 20.
  - Relative : 18.
  - Adjectif attribut : 7, 22.
  - Accompli : 22.
  - Impératif, infinitif, ordinal : 12, 13, 14.
  - Place de l'adverbe de temps : 1, 11, 17, 23, 25.
  - SO "si" contre question : 30 (contournable, voir verdict).
  - SE avec un nombre : 28.
  - Portée de SE et chaîne de modifieurs : 11, 16.
  - Sujet omis après SI : 5.

## 3. Manques

### Confirmés (aucune périphrase claire)

1. manger (3). `KASA MOKA` est ambigu.
2. sur (4, 29).
3. long (7).
4. commencer (8).
5. heure (8). `SIME` + nombre ne dit pas l'unité.
6. matin (1). SELO est le jour entier.
7. demain (11, 17).
8. hier (23).
9. fini (22).
10. bonjour (15).
11. où (20). Mot grammatical.
12. que, relatif (18). Mot grammatical.

### Résolubles avec les mots existants

| Manque | Périphrase | Jugement |
|---|---|---|
| lire | `KIMA LAKA` | clair |
| se lever | `SAKE LE MOSA` | clair (sortir du lit) |
| ouvrir (porte) | `KASA MELE SOLA` | acceptable, un peu lourd |
| apporter | `SAKE SA` + objet | clair |
| avoir | `MA KA` (être à) | clair, lié à KA datif |
| collègue | `MAMA KAMA` | clair |
| bureau | `MALO KAMA` | acceptable, lu aussi "maison du projet" |
| liste | `LAKA KAMA` | acceptable, document de tâches |

Écarté : "fini" par `ME KASA`, car le passé simple n'est pas un accompli.

## 4. Lignes TSV prêtes à ajouter

Toutes les formes sont à 2 syllabes. Chacune sort INCONNU avec `quadra.py gloss`. Consonne initiale choisie d'après le domaine (M matière/humain, S lien/mouvement/temps, K action, L esprit/lieu/savoir). Chaque ligne est une **proposition**, le propriétaire décide.

```
KEMO	verbe	manger (proposition)
SOKA	verbe	commencer, débuter (proposition)
LISA	espace	sur, au-dessus de (proposition)
LESA	espace	long, étendu (proposition)
SELI	temps	le matin (proposition)
SIMO	temps	l'heure (proposition)
SIKE	temps	demain (proposition)
SEME	temps	hier (proposition)
KOSI	verbe	fini, achevé (proposition)
SILE	grammaire	bonjour, salutation (proposition)
LOKI	grammaire	où, quel lieu (proposition)
```

Choix de formes :
- SIKE et SEME reprennent KE (futur) et ME (passé).
- SELI est proche de SELO (jour, lumière), c'est voulu.
- KEMO garde K (action) et M (matière).

Pour le relatif "que", les mots grammaticaux sont à 1 syllabe, et LA est la seule syllabe réservée libre. Proposition à part, hors format 2 syllabes :
```
LA	grammaire	que, qui (relatif) (proposition)
```

Sans changement de grammaire, "adjectif" reste un nom en modifieur : `LESA` et `KOSI` ne règlent pas l'attribut tant que la règle `X MA ADJ` n'est pas écrite.

## 5. Avis sur les 3 trous jugés les plus bloquants par l'étudiant

L'étudiant cite le lexique trop court (4 verbes), l'absence de mots de temps et de lieu, et la double fonction de SO plus l'absence de relatif.
1. Lexique de verbes : d'accord, c'est le premier blocage, mais 8 manques sur 20 se résolvent déjà par périphrase. Il faut surtout manger et commencer.
2. Temps et lieu (demain, hier, matin, sur) : d'accord, ces mots font 6 des 12 phrases impossibles. Ils se règlent par du vocabulaire, sans changer la grammaire.
3. SO et relatif : d'accord pour le relatif (aucune contournement propre), pas pour SO. SO "si" se contourne en le plaçant après la principale. Je classerais plutôt l'adjectif attribut (7, 22) et les interrogatifs (20) avant SO.
Classement final conseillé : verbes, temps et lieu, adjectif attribut et interrogatifs, relatif, SO.
