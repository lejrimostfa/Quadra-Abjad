# Carnet d'étudiant : 30 phrases en Quadra Abjad

Sources : SPEC.md v0.2 et lexique.tsv (40 mots). Chaque phrase a été vérifiée avec `python3 quadra.py gloss` (sans les crochets). Aucun mot INVALIDE ou INCONNU.

## 1. Les 30 phrases

### Une journée ordinaire

**1.** Je me lève le matin.
Quadra : `MI [MANQUE: se lever] KI [MANQUE: matin]`
Glose : je / (se lever) / dans / (matin)
note : SELO (jour, lumière) pourrait servir pour "matin", mais ce serait une approximation. Pas de mot pour une partie de la journée.

**2.** Je sors du lit.
Quadra : `MI SAKE LE MOSA`
Glose : je / aller / hors de / lit

**3.** Je mange le repas.
Quadra : `MI [MANQUE: manger] MOKA`
Glose : je / (manger) / repas
note : `MI KASA MOKA` est valide mais ambigu : faire le repas = cuisiner ou manger ?

**4.** Le repas est sur la table.
Quadra : `MOKA MA [MANQUE: sur] MALA`
Glose : repas / est / (sur) / table
note : pas de préposition "sur". KI (dans) ne convient pas.

**5.** J'ouvre la porte et je sors de la maison.
Quadra : `MI [MANQUE: ouvrir] SOLA SI MI SAKE LE MALO`
Glose : je / (ouvrir) / porte / et / je / aller / hors de / maison
note : SI relie deux propositions. La spec ne dit pas si le sujet répété est obligatoire.

**6.** Je vais au travail.
Quadra : `MI SAKE KA KAMA`
Glose : je / aller / vers / travail

**7.** Le chemin est long.
Quadra : `SALA MA [MANQUE: long]`
Glose : chemin / est / (long)
note : adjectif attribut. La spec dit "un nom en position de modifieur". Il faudrait un nom "longueur", absent. Et on ne sait pas si `SALA MA X` marche avec un nom-adjectif.

**8.** Le travail commence à 9 heures.
Quadra : `KAMA [MANQUE: commencer] KA SIME KS`
Glose : travail / (commencer) / à / temps / 9
note : pas de mot "heure". SIME (instant) + nombre est une approximation. La place du nombre (avant ou après le nom) n'est pas fixée.

**9.** Je travaille dans la maison du chef.
Quadra : `MI KASA KAMA KI MALO MISE`
Glose : je / faire / travail / dans / maison / chef
note : pas de verbe "travailler", donc "faire le travail". Possession rendue par la règle du modifieur (MALO MISE). Ambigu : maison du chef ou maison-chef (maison principale) ?

**10.** Le chef explique l'objectif à l'équipe.
Quadra : `MISE KELI KOLE KA MAMA`
Glose : chef / expliquer / objectif / à / équipe
note : MAMA veut dire personne, corps ou équipe. Le singulier "à la personne" est aussi possible.

### Une liste de tâches

**11.** Liste des tâches de demain.
Quadra : `[MANQUE: liste] KAMA SE [MANQUE: demain]`
Glose : (liste) / tâche / pluriel / (demain)
note : SE est placé après KAMA. Mais un modifieur après KAMA SE : il porte sur KAMA ou sur le groupe ? Ordre nom, modifieur, pluriel non défini.

**12.** Un : lire le document d'étude.
Quadra : `S [MANQUE: lire] LAKA KILO`
Glose : 1 / (lire) / document / étude
note : pas d'impératif ni d'infinitif. Pas d'ordinal. `S` en tête peut se lire "un document" (quantité) et non "numéro un".

**13.** Deux : voir le chef.
Quadra : `K KIMA MISE`
Glose : 2 / voir / chef
note : valide, mais même problème : sans sujet, est-ce un ordre ? Et "K KIMA" peut se lire "deux (personnes) voient le chef".

**14.** Trois : apporter l'argent à l'école.
Quadra : `L [MANQUE: apporter] KESO KA LEKI`
Glose : 3 / (apporter) / argent / à / école
note : SAKE SA (aller avec) pourrait approcher "apporter", mais l'ordre avec un objet n'est pas défini.

### Un message à un collègue

**15.** Bonjour collègue.
Quadra : `[MANQUE: bonjour] [MANQUE: collègue]`
Glose : (bonjour) / (collègue)
note : aucune formule de politesse. "Collègue" pourrait être MAMA KAMA (personne du travail), mais c'est une construction non validée.

**16.** Le document est dans ton bureau.
Quadra : `LAKA MA KI [MANQUE: bureau] MO`
Glose : document / est / dans / (bureau) / toi
note : possession "ton" rendue par MO en modifieur. Non écrit dans la spec.

**17.** Je te parlerai demain.
Quadra : `MI KE KELI KA MO [MANQUE: demain]`
Glose : je / futur / parler / à / toi / (demain)
note : place des adverbes de temps non définie (tête ou fin de phrase).

**18.** Le livre que tu vois est à moi.
Quadra : `LAKA [MANQUE: que] MO KIMA MA KA MI`
Glose : livre / (que) / tu / voir / est / pour / moi
note : pas de pronom relatif. Sans lui, `LAKA MO KIMA` se lit "ton livre voit". "Être à moi" rendu par MA KA MI (est pour moi), approximation.

### Questions

**19.** Tu vois le document ?
Quadra : `SO MO KIMA LAKA`
Glose : question / tu / voir / document

**20.** Où est le livre ?
Quadra : `SO LAKA MA [MANQUE: où]`
Glose : question / livre / est / (où)
note : aucun mot interrogatif (où, quand, qui, quoi, combien). SO ne fait que des questions oui/non.

### Négation

**21.** Je ne vois pas la clé.
Quadra : `MI KO KIMA SOLA`
Glose : je / négation / voir / clé
note : SOLA = porte ou clé. Le contexte seul tranche.

**22.** Le projet n'est pas fini.
Quadra : `KAMA KO MA [MANQUE: fini]`
Glose : projet / négation / est / (fini)
note : pas de participe ni d'aspect accompli. KO devant MA est déduit de la règle 3, pas montré dans un exemple.

### Passé

**23.** Hier, le chef a parlé à l'équipe.
Quadra : `[MANQUE: hier] MISE ME KELI KA MAMA`
Glose : (hier) / chef / passé / parler / à / équipe

**24.** Je ne suis pas allé à l'école.
Quadra : `MI KO ME SAKE KA LEKI`
Glose : je / négation / passé / aller / vers / école

### Futur

**25.** Nous ferons le projet ensemble.
Quadra : `MI SE KE KASA KAMA SA`
Glose : je / pluriel / futur / faire / projet / avec
note : SA seul en fin de phrase, sans complément. Adverbe "ensemble" ou préposition orpheline ?

### Pluriel et nombres

**26.** Les gens voient les livres.
Quadra : `MAMA SE KIMA LAKA SE`
Glose : personne / pluriel / voir / livre / pluriel

**27.** J'ai trois livres.
Quadra : `MI [MANQUE: avoir] LAKA L`
Glose : je / (avoir) / livre / 3
note : pas de verbe "avoir". Nombre placé après le nom, comme `KAMO KK` de la spec.

**28.** Dix personnes sont dans la maison.
Quadra : `MAMA SE KK MA KI MALO`
Glose : personne / pluriel / 10 / est / dans / maison
note : faut-il SE quand il y a un nombre ? Ordre SE puis nombre, ou l'inverse ? Pas de "il y a". `MA KI` (est dans) sert de locatif.

### Possession

**29.** Mon livre est sur ma table.
Quadra : `LAKA MI MA [MANQUE: sur] MALA MI`
Glose : livre / moi / est / (sur) / table / moi
note : possessif par pronom modifieur. `LAKA MI MA` peut aussi se lire "le livre, moi, je suis..." Ambigu.

### Subordonnée

**30.** Si tu vas à l'école, je vais avec toi.
Quadra : `SO MO SAKE KA LEKI MI SAKE SA MO`
Glose : si / tu / aller / vers / école / je / aller / avec / toi
note : SO en tête = question selon la règle 5. La phrase se lit aussi "Vas-tu à l'école ? Je vais avec toi." Pas de marque de fin de subordonnée.

## 2. Mots manquants

| Sens | Fois | Phrases |
|---|---|---|
| demain | 2 | 11, 17 |
| sur | 2 | 4, 29 |
| se lever | 1 | 1 |
| matin | 1 | 1 |
| manger | 1 | 3 |
| ouvrir | 1 | 5 |
| long | 1 | 7 |
| commencer | 1 | 8 |
| liste | 1 | 11 |
| lire | 1 | 12 |
| apporter | 1 | 14 |
| bonjour | 1 | 15 |
| collègue | 1 | 15 |
| bureau | 1 | 16 |
| que (relatif) | 1 | 18 |
| où (interrogatif) | 1 | 20 |
| fini | 1 | 22 |
| hier | 1 | 23 |
| avoir | 1 | 27 |

Approximations faites avec des mots existants (à valider) : heure = SIME (8), travailler = KASA KAMA (9), être à moi = MA KA MI (18).

## 3. Trous grammaticaux

- **Possession** : aucune règle. J'ai utilisé le modifieur (nom ou pronom après la tête). Phrases 9, 16, 18, 29.
- **Adjectifs** : pas de mots adjectifs. "Nom en modifieur" ne marche pas en attribut (X MA adj). Phrases 7, 22.
- **Relative** : pas de pronom relatif, pas de frontière de proposition. Phrase 18.
- **Subordonnée conditionnelle** : SO sert à la fois de "si" et de question. Phrase 30.
- **Mots interrogatifs** : seule la question oui/non existe. Phrase 20.
- **Impératif et infinitif** : impossible d'écrire un ordre ou une tâche sans sujet. Phrases 12, 13, 14.
- **Nombres dans la phrase** : place du nombre, combinaison avec SE, ordinal absent. Phrases 8, 12, 13, 27, 28.
- **Ordre nom, modifieur, pluriel** : SE porte sur quoi dans `NOM SE MODIF` ou `NOM MODIF SE` ? Phrase 11.
- **"Il y a" / existence** : rien. Contourné par `MA KI`. Phrase 28.
- **Avoir** : ni verbe ni structure de possession prédicative. Phrase 27.
- **Adverbes de temps** : place libre ou fixe ? Aucun mot (hier, demain). Phrases 17, 23.
- **Coordination** : SI entre propositions, sujet répété ou non. Phrase 5.
- **SA sans complément** (ensemble, adverbe). Phrase 25.
- **Aspect accompli** (fini, déjà) absent. Phrase 22.

## 4. Ambiguïtés

- **30** `SO MO SAKE KA LEKI ...` : "si tu vas à l'école" ou "vas-tu à l'école ?".
- **18** `LAKA MO KIMA` : "le livre (que) tu vois" ou "ton livre voit".
- **9** `MALO MISE` : "la maison du chef" ou "la maison principale".
- **12 et 13** `S ...`, `K KIMA MISE` : "numéro deux : voir le chef" ou "deux (personnes) voient le chef".
- **3** `MI KASA MOKA` : "je cuisine" ou "je mange".
- **10** `KA MAMA` : "à l'équipe" ou "à la personne".
- **21** `SOLA` : "la clé" ou "la porte".
- **29** `LAKA MI MA ...` : "mon livre est..." ou "le livre, moi, je suis...".
- **25** `KAMA SA` : "le projet ensemble" ou "le projet avec (quelqu'un d'omis)".

## 5. Ressenti d'apprenant

Facile : l'ordre SVO, les particules KO, ME, KE avant le verbe, le pluriel SE. On les retient en une lecture.
Les nombres en consonnes nues sont clairs et le script les vérifie bien.
Bloquant : le lexique n'a que 4 verbes. Presque chaque phrase de la vie courante bute sur un verbe (manger, lire, ouvrir, avoir).
Pas de mots de temps (hier, demain, matin) ni de prépositions de lieu (sur, sous).
La double fonction de SO (si et question) et l'absence de relatif rendent toute phrase complexe ambiguë.
