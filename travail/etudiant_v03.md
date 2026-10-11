# Carnet d'étudiant v0.3 : les 30 phrases réécrites

Sources : SPEC.md v0.3 et lexique.tsv (180 mots). Mêmes phrases et même numérotation que etudiant.md. Chaque phrase a été vérifiée avec `python3 quadra.py gloss` (sans les crochets). Aucun mot INVALIDE ou INCONNU.

## 1. Les 30 phrases

### Une journée ordinaire

**1.** Je me lève le matin.
Quadra : `SESAKA MI [MANQUE: se lever]`
Glose : matin / je / (se lever)
note : le temps passe en tête (règle 12). "Matin" existe. "Se lever" manque : MEMI veut dire grandir, SEKI partir.

**2.** Je sors du lit.
Quadra : `MI SAKI LE KIMA`
Glose : je / aller / hors de / lit

**3.** Je mange le repas.
Quadra : `MI MAKI MAKA`
Glose : je / manger / repas
note : l'ambiguïté cuisiner/manger de la v0.2 disparaît.

**4.** Le repas est sur la table.
Quadra : `MAKA MA KI MALA KEMA`
Glose : repas / est / dans / tête / table
note : idiome "à tester" de la section 10. Valide, mais un apprenant lit d'abord "dans la tête de la table".

**5.** J'ouvre la porte et je sors de la maison.
Quadra : `MI SOLI SOLA SI MI SAKI LE LAMA`
Glose : je / passer, ouvrir / porte / et / je / aller / hors de / maison
note : SOLI = "passer, ouvrir un passage". On peut aussi lire "je passe la porte". Le sujet répété après SI n'est toujours pas réglé.

**6.** Je vais au travail.
Quadra : `MI SAKI KA KEKA`
Glose : je / aller / vers / travail

**7.** Le chemin est long.
Quadra : `SALA MA SELO`
Glose : chemin / est / loin, long
note : la règle 8 (adjectif après MA) règle le trou de la v0.2. SELO veut dire à la fois loin et long.

**8.** Le travail commence à 9 heures.
Quadra : `KS SASA KEKA SEKI`
Glose : 9 / heure / travail / commencer
note : nombre avant le nom = ordinal, donc "la 9e heure". Temps en tête. `SASA KS` voudrait dire "neuf heures" de durée. SEKI veut dire partir ou commencer.

**9.** Je travaille dans la maison du chef.
Quadra : `MI KEKI KI LAMA KALE`
Glose : je / travailler / dans / maison / chef
note : possession par modifieur (règle 2). Plus d'ambiguïté "maison principale", car KALE est une personne.

**10.** Le chef explique l'objectif à l'équipe.
Quadra : `KALE LASI KOLA KA SEMA`
Glose : chef / expliquer / objectif / à / équipe
note : SEMA (équipe) est distinct de MAMA (personne). L'ambiguïté de la v0.2 disparaît.

### Une liste de tâches

**11.** Liste des tâches de demain.
Quadra : `[MANQUE: liste] KIKA SE SESA KE`
Glose : (liste) / tâche / pluriel / jour / futur
note : "demain" = SESA KE. Mais en modifieur après un nom, KE peut se lire comme particule de futur d'un verbe absent. La règle 12 ne prévoit "demain" qu'en tête de phrase.

**12.** Un : lire le document d'étude.
Quadra : `S KIKA [MANQUE: lire] LAKA KILA`
Glose : 1 / tâche / (lire) / document / étude
note : l'ordinal (S KIKA = première tâche) règle la numérotation. "Lire" manque : LIKI apprendre, LAKI écrire, MILI voir.

**13.** Deux : voir le chef.
Quadra : `K KIKA MILI KALE`
Glose : 2 / tâche / voir / chef
note : l'impératif veut le verbe en tête. Ici un titre (K KIKA) précède. On peut lire "la deuxième tâche voit le chef". Pas de séparateur titre/phrase.

**14.** Trois : apporter l'argent à l'école.
Quadra : `L KIKA SOKI KASA KA LEKA`
Glose : 3 / tâche / donner, apporter / argent / à / école
note : même problème de titre que la phrase 13.

### Un message à un collègue

**15.** Bonjour collègue.
Quadra : `[MANQUE: bonjour] SEME`
Glose : (bonjour) / membre, collègue
note : toujours aucune salutation. La section 7.13 ne couvre que la demande polie.

**16.** Le document est dans ton bureau.
Quadra : `LAKA MA KI LIMA MO`
Glose : document / est / dans / pièce / toi
note : "bureau" approché par LIMA (pièce). `LIMA KEKA MO` serait plus précis, mais l'ordre de deux modifieurs n'est pas défini.

**17.** Je te parlerai demain.
Quadra : `SESA KE MI KE LASI KA MO`
Glose : jour / futur / je / futur / parler / à / toi
note : deux KE de suite à des rôles différents. Le premier fait partie de "demain", le second marque le verbe. Lourd à lire.

**18.** Le livre que tu vois est à moi.
Quadra : `LAKA LA MO MILI MA KA MI`
Glose : livre / relatif / tu / voir / est / à / moi
note : c'est l'exemple de la règle 11. Mais où finit la relative ? MA sert de frontière ici, mais une relative avec objet serait moins claire.

### Questions

**19.** Tu vois le document ?
Quadra : `SO MO MILI LAKA`
Glose : question / tu / voir / document

**20.** Où est le livre ?
Quadra : `SO LAKA MA KI [MANQUE: où]`
Glose : question / livre / est / dans / (où)
note : piste "SO + nom" en point ouvert, pas encore fixée. Aucun interrogatif.

### Négation

**21.** Je ne vois pas la clé.
Quadra : `MI KO MILI [MANQUE: clé]`
Glose : je / négation / voir / (clé)
note : nouveau manque. En v0.2 SOLA voulait dire porte et clé. En v0.3 SOLA = porte, passage. La clé a disparu.

**22.** Le projet n'est pas fini.
Quadra : `KOKA MA KO SIKO`
Glose : projet / est / négation / fini
note : KO va "avant le verbe ou l'adjectif". Donc `KOKA KO MA SIKO` est aussi correct. Deux formes possibles, rien ne dit laquelle préférer.

### Passé

**23.** Hier, le chef a parlé à l'équipe.
Quadra : `SESA ME KALE ME LASI KA SEMA`
Glose : jour / passé / chef / passé / parler / à / équipe
note : exemple exact de la règle 12. Même double ME que le double KE de la phrase 17.

**24.** Je ne suis pas allé à l'école.
Quadra : `MI KO ME SAKI KA LEKA`
Glose : je / négation / passé / aller / vers / école

### Futur

**25.** Nous ferons le projet ensemble.
Quadra : `MI SE KE KAKI KOKA SA`
Glose : je / pluriel / futur / faire / projet / avec
note : SA seul en fin de phrase reste non défini comme adverbe.

### Pluriel et nombres

**26.** Les gens voient les livres.
Quadra : `MAMA SE MILI LAKA SE`
Glose : personne / pluriel / voir / livre / pluriel

**27.** J'ai trois livres.
Quadra : `LAKA L MA KA MI`
Glose : livre / 3 / est / à / moi
note : règle 7. Mais `LAKA MA KA MI` veut dire "le livre est à moi" ou "j'ai un livre". Défini ou indéfini, rien ne tranche.

**28.** Dix personnes sont dans la maison.
Quadra : `MAMA KK MA KI LAMA`
Glose : personne / 10 / est / dans / maison
note : règles 9 et 10. Pas de SE avec un cardinal, d'après l'exemple `LAKA L`. Mais la spec ne l'interdit pas.

### Possession

**29.** Mon livre est sur ma table.
Quadra : `LAKA MI MA KI MALA KEMA MI`
Glose : livre / moi / est / dans / tête / table / moi
note : MI final porte sur KEMA ou sur MALA ? "Ma table" ou "le dessus à moi de la table". L'idiome "sur" se combine mal avec le possessif.

### Subordonnée

**30.** Si tu vas à l'école, je vais avec toi.
Quadra : `SO MO SAKI KA LEKA MI SAKI SA MO`
Glose : si / tu / aller / vers / école / je / aller / avec / toi
note : pire qu'en v0.2. SO en tête a maintenant trois lectures : "si", question, ou demande polie ("vas-tu à l'école, s'il te plaît ?").

## 2. Mots manquants restants

| Sens | Fois | Phrases |
|---|---|---|
| se lever | 1 | 1 |
| liste | 1 | 11 |
| lire | 1 | 12 |
| bonjour | 1 | 15 |
| où (interrogatif) | 1 | 20 |
| clé | 1 | 21 |

Approximations faites avec des mots existants : bureau = LIMA (16), sur = KI MALA (4, 29), 9 heures = KS SASA (8).

## 3. Trous grammaticaux restants

- **SO polysémique** : si, question, demande polie. Phrase 30.
- **Interrogatifs** (où, quand, qui) : piste seulement. Phrase 20.
- **"Sur", "sous"** : idiome KI MALA à tester, lourd avec un possessif. Phrases 4, 29.
- **Temps en position de modifieur** (SESA KE après un nom). Phrase 11.
- **Double particule** SESA KE ... KE, SESA ME ... ME. Phrases 17, 23.
- **Titre ou étiquette devant un impératif** : pas de séparateur. Phrases 12, 13, 14.
- **Plusieurs modifieurs à la suite** : lequel porte sur quoi. Phrases 16, 29.
- **Place de KO avec MA + adjectif** : deux formes. Phrase 22.
- **Défini et indéfini** : "le livre est à moi" ou "j'ai un livre". Phrase 27.
- **Fin de relative** non marquée. Phrase 18.
- **Coordination** avec sujet répété ou non. Phrase 5.
- **SA sans complément**. Phrase 25.
- **Salutations**. Phrase 15.

## 4. Comparaison avec la v0.2

Avant : 12 phrases complètes sur 30, 19 mots manquants. Après : 24 sur 30, 6 mots manquants.
La section 7 a réglé possession, avoir, attribut, existence, ordinal, relative et impératif d'un coup.
La grille aide : une fois KEKA appris, KEKE et KEKI se devinent. Les paires E/I (SEKI, SIKI) se retiennent vite.
Plus dur : beaucoup de mots se ressemblent (KIKA, KIMA, KILA, KEKA, KOKA). Une seule voyelle change le sens, donc les erreurs de lecture sont faciles.
Plus dur aussi : il faut retenir E = personne et I = verbe, et accepter des sens larges (SELO loin et long, SEKI partir et commencer).
