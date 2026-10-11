# Quadra Abjad : grille sémantique, grammaire manquante, écriture diacritique

Rôle : chercheur. Base : SPEC.md v0.2, lexique.tsv (40 mots), quadra.py.
Ce document prépare une décision. Il ne modifie rien. Tout mot nouveau est une proposition.
Toutes les phrases d'exemple ont été passées par `python3 quadra.py gloss`. Aucun mot INVALIDE.

Le problème en une ligne : la spec promet "chaque lettre a un sens", mais MASE (tête), MISE (chef) et MOSA (lit) partagent M+S sans lien. Il faut soit rendre la promesse vraie, soit la retirer.

---

## A. Grille sémantique des mots à deux syllabes

### A.1 La règle (à retenir en trois lignes)

1. **Les deux consonnes disent de quoi on parle.** La première donne le domaine, la seconde l'angle. Les 4 sens sont les mêmes aux deux positions : M chose et corps, S lien et mouvement et temps, K action et outil, L esprit et lieu et savoir.
2. **La première voyelle dit lequel.** A la chose de base, E le dehors (grand, ouvert, passé), I le dedans (petit, profond, à venir), O l'abstrait (idée, état, condition).
3. **La deuxième voyelle dit quelle sorte de mot.** A nom, E personne (celui qui), I verbe, O adjectif.

Un mot de deux syllabes se lit donc `C1 V1 C2 V2` = domaine, nuance, angle, classe.
Exemple : **KALE** = K action, A de base, L esprit, E personne = la personne de la décision = le chef.
Exemple : **LAKI** = L savoir, A de base, K outil, I verbe = l'action de l'outil du savoir = écrire.

Une seule table de 4 sens, lue deux fois. Une seule table de 4 nuances, lue deux fois. Pas d'exception.
Le mot exact de chaque case s'apprend (comme dans toute langue). Mais la règle garantit qu'un mot inconnu tombe toujours dans son champ : un lecteur qui voit `KI..` sait qu'il s'agit d'action profonde ou de tâche, et un mot en `..I` est toujours un verbe.

### A.2 Sens des 16 paires de consonnes

Lecture : ligne = C1 (domaine), colonne = C2 (angle).

| C1 \ C2 | M (chose, corps) | S (lien, mouvement, temps) | K (action, outil) | L (esprit, lieu, savoir) |
|---|---|---|---|---|
| **M** matière, humain | **MM** le corps, la personne, la quantité de matière | **MS** la vie du corps : vie, âge, mort | **MK** ce qui sert au corps : nourriture, vêtement, soin | **ML** la tête et les sens : tête, bouche, oeil, sensation |
| **S** lien, mouvement, temps | **SM** les liens entre personnes : famille, groupe, ami | **SS** le temps pur : moment, jour, nuit, année | **SK** le mouvement et l'échange : voyage, départ, arrivée, don | **SL** l'espace parcouru : chemin, loin, près, porte |
| **K** action, création | **KM** les objets fabriqués : outil, table, lit, produit | **KS** la valeur échangée : argent, prix, service, commerce | **KK** le travail pur : acte, travail, tâche, projet | **KL** l'action pensée : décision, plan, étude, objectif |
| **L** esprit, lieu, savoir | **LM** les lieux habités : maison, ville, pièce, monde | **LS** le langage : parole, langue, nom, sens | **LK** les outils du savoir : livre, école, leçon, règle | **LL** l'esprit pur : pensée, savoir, mémoire, idée |

Moyen mnémotechnique : la colonne M donne "la chose elle-même", la colonne S "ce qui la relie ou la fait durer", la colonne K "ce qu'elle fait ou ce qui la sert", la colonne L "où elle est ou ce qu'on en sait".

### A.3 Rôle des voyelles

**Voyelle 1 (nuance dans la case).** Elle choisit une des 4 choses de la case.

| V1 | Sens de la spec | Lecture dans la grille | Exemples |
|---|---|---|---|
| A | neutre, présent | la chose type de la case | MAMA personne, LAKA livre, SASA temps |
| E | passé, ouverture, extérieur | le dehors, le grand, le collectif, l'ancien | MEMA quantité, SEMA groupe, MESA âge, SESA jour |
| I | intérieur, profondeur | le dedans, la partie, le petit, le profond | MIMA partie, SISA nuit, KILA étude, LIMA pièce |
| O | idée, condition, nuance | l'abstrait, l'état, la version idée | SOMA lien, KOKA projet, KOLA objectif, LOLA idée |

Les paires E/I donnent les contraires gratuitement : MEMO grand / MIMO petit, SELO loin / SILO proche, SESO clair / SISO sombre, MESO vieux / MISO jeune, SEKI partir / SIKI arriver.

**Voyelle 2 (classe du mot).** Elle dit ce que le mot fait dans la phrase.

| V2 | Classe | Pourquoi cette voyelle | Exemples |
|---|---|---|---|
| A | nom | A est neutre, le nom est la forme de base | KEKA travail, LAKA livre |
| E | personne, celui qui | E est l'ouverture vers l'extérieur : celui qui agit sur le monde | KEKE travailleur, LAKE auteur, KALE chef |
| I | verbe | I est la profondeur : le procès, ce qui se passe à l'intérieur | KEKI travailler, LAKI écrire |
| O | adjectif, qualité | O est la nuance, la condition | KAKO actif, LAKO écrit, MEMO grand |

Le lien E = personne et I = verbe est une convention avec un moyen mnémotechnique, pas une déduction. C'est le point le plus faible de la règle. Il est quand même simple : une seule table, quatre lignes.

Conséquence utile : chaque nom a sa personne, son verbe et son adjectif sans mot nouveau. KEKA travail, KEKE travailleur, KEKI travailler, KEKO (libre, "laborieux"). LEKA école, LEKE enseignant, LEKI enseigner.

### A.4 Mots de plus de deux syllabes

La grille a 256 cases. Une langue a besoin de plus. Règle proposée : un mot de 3 syllabes = racine de 2 syllabes + une syllabe de précision, lue avec la même table (consonne = angle, voyelle = nuance).
- MAMAKA = corps + angle action = la main.
- MAMASA = corps + angle mouvement = le pied.
- LAMALE = maison + dehors (LE) = la fenêtre.
- SESAKA = jour + vers (KA) = le matin. SESALE = jour + hors (LE) = le soir.

Les noms propres sont des mots de 3 ou 4 syllabes choisis par leur porteur (Mostfa = MOSEKA, par exemple). Ils se comportent comme des noms.

### A.5 La grille complète : 16 tableaux de 4 x 4

Chaque tableau est une paire de consonnes. Ligne = V1, colonne = V2. Un point = case libre.
159 mots placés : 64 noms (toutes les cases nom sont prises), 26 personnes, 44 verbes, 25 adjectifs. Les 25 mots de contenu actuels y sont, plus les mots demandés (pronoms déjà en une syllabe, corps, nourriture, maison, ville, travail, temps, verbes et adjectifs de base) et les 12 manques relevés par le correcteur (manger, commencer, finir, matin, hier, demain, heure, long, relatif, etc.).

#### MM : corps, matière, quantité

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **MAMA** personne, corps | **MAME** quelqu'un, individu | . | **MAMO** entier, tout |
| E | **MEMA** quantité, masse (beaucoup) | **MEME** adulte | **MEMI** grandir | **MEMO** grand |
| I | **MIMA** partie, morceau (peu) | **MIME** enfant | . | **MIMO** petit |
| O | **MOMA** forme, figure | . | **MOMI** former, façonner | **MOMO** beau |

#### MS : vie du corps, âge

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **MASA** vie | **MASE** être vivant | **MASI** vivre | **MASO** vivant |
| E | **MESA** âge, vieillesse | **MESE** ancien, vieillard | **MESI** vieillir | **MESO** vieux, ancien |
| I | **MISA** jeunesse, force | **MISE** jeune (personne) | . | **MISO** jeune, nouveau |
| O | **MOSA** mort | **MOSE** défunt | **MOSI** mourir | **MOSO** mort (adj) |

#### MK : ce qui sert au corps

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **MAKA** nourriture, repas | **MAKE** cuisinier | **MAKI** manger | . |
| E | **MEKA** vêtement | . | **MEKI** s'habiller | . |
| I | **MIKA** eau, boisson | . | **MIKI** boire | . |
| O | **MOKA** remède, soin | **MOKE** médecin | **MOKI** soigner | **MOKO** sain |

#### ML : tête et sens

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **MALA** tête, visage | . | . | . |
| E | **MELA** bouche | . | . | . |
| I | **MILA** oeil, regard | . | **MILI** voir, regarder | . |
| O | **MOLA** sens, sensation | . | **MOLI** sentir, ressentir | . |

#### SM : liens entre personnes

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **SAMA** famille | **SAME** parent (père, mère) | . | **SAMO** familial |
| E | **SEMA** groupe, équipe, société | **SEME** membre, collègue | **SEMI** se réunir | **SEMO** collectif |
| I | **SIMA** amitié, amour | **SIME** ami | **SIMI** aimer | **SIMO** cher (aimé) |
| O | **SOMA** lien, relation | . | **SOMI** lier, relier | **SOMO** commun |

#### SS : temps

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **SASA** temps, moment, heure | . | **SASI** durer | . |
| E | **SESA** jour, lumière | . | . | **SESO** clair |
| I | **SISA** nuit | . | . | **SISO** sombre |
| O | **SOSA** année, époque | . | . | . |

#### SK : mouvement, échange

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **SAKA** voyage, déplacement | **SAKE** voyageur | **SAKI** aller, bouger | **SAKO** rapide |
| E | **SEKA** départ, début | . | **SEKI** partir, commencer | . |
| I | **SIKA** arrivée, fin | . | **SIKI** arriver, venir, finir | **SIKO** fini, arrivé |
| O | **SOKA** don, échange | . | **SOKI** donner, apporter | . |

#### SL : espace parcouru, position

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **SALA** chemin, rue | . | **SALI** marcher, suivre | . |
| E | **SELA** le dehors, le lointain | . | . | **SELO** loin, long |
| I | **SILA** le dedans, le voisinage | **SILE** voisin | . | **SILO** proche, court |
| O | **SOLA** porte, passage | . | **SOLI** passer, ouvrir (un passage) | . |

#### KM : objets fabriqués

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **KAMA** outil, objet, chose | **KAME** artisan | **KAMI** fabriquer, construire | **KAMO** fabriqué |
| E | **KEMA** table, meuble | . | . | . |
| I | **KIMA** lit, siège | . | . | . |
| O | **KOMA** produit, marchandise | . | . | . |

#### KS : valeur, commerce, service

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **KASA** argent, valeur | **KASE** marchand | **KASI** acheter, payer | **KASO** cher (coûteux) |
| E | **KESA** prix | . | **KESI** vendre | . |
| I | **KISA** service, aide | . | **KISI** aider, servir | . |
| O | **KOSA** commerce, marché | . | **KOSI** échanger, commercer | . |

#### KK : travail, action

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **KAKA** acte, action | . | **KAKI** faire, agir | **KAKO** actif |
| E | **KEKA** travail, métier | **KEKE** travailleur | **KEKI** travailler | . |
| I | **KIKA** tâche, détail | . | . | . |
| O | **KOKA** projet | . | **KOKI** prévoir, projeter | . |

#### KL : décision, plan, étude

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **KALA** décision, direction | **KALE** chef, responsable | **KALI** décider, diriger | . |
| E | **KELA** plan, méthode | . | **KELI** planifier | . |
| I | **KILA** étude, recherche | **KILE** chercheur | **KILI** étudier, chercher | . |
| O | **KOLA** objectif, but | . | **KOLI** vouloir, viser | **KOLO** bon |

#### LM : lieux habités

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **LAMA** maison, bâtiment | **LAME** habitant | **LAMI** habiter | . |
| E | **LEMA** ville | **LEME** citoyen | . | . |
| I | **LIMA** pièce, chambre | . | . | . |
| O | **LOMA** monde, pays, terre | . | . | . |

#### LS : langage

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **LASA** parole, mot | . | **LASI** parler, dire, expliquer | . |
| E | **LESA** langue, langage | . | . | . |
| I | **LISA** nom | . | **LISI** nommer, appeler | . |
| O | **LOSA** sens, signification | . | **LOSI** signifier | . |

#### LK : écrits, école

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **LAKA** livre, document | **LAKE** auteur | **LAKI** écrire | **LAKO** écrit |
| E | **LEKA** école | **LEKE** maître, enseignant | **LEKI** enseigner | . |
| I | **LIKA** leçon | **LIKE** élève | **LIKI** apprendre | . |
| O | **LOKA** règle, loi | . | . | . |

#### LL : esprit, savoir

| V1 \ V2 | A nom | E personne | I verbe | O adjectif |
|---|---|---|---|---|
| A | **LALA** pensée, esprit | **LALE** sage | **LALI** penser | . |
| E | **LELA** savoir, connaissance | **LELE** savant | **LELI** savoir, connaître | **LELO** vrai, connu |
| I | **LILA** mémoire, souvenir | . | **LILI** se souvenir | . |
| O | **LOLA** idée, concept | . | **LOLI** imaginer, concevoir | . |
Mots courants hors grille (3 syllabes ou expressions) : MAMAKA main, MAMASA pied, LAMALE fenêtre, SESAKA matin, SESALE soir, `SESA ME` hier (jour passé), `SESA KE` demain (jour futur), `SESA LI` aujourd'hui (ce jour), `SASA KS` 9 heures (temps 9), `LIMA KEKA` bureau (pièce de travail), `MILI LAKA` lire (voir le livre), `SESA` seul = bonjour.

### A.6 Les 25 mots de contenu actuels : qui reste, qui déménage

| Mot actuel | Sens | Verdict | Nouvelle forme | Ce que la forme actuelle veut dire dans la grille |
|---|---|---|---|---|
| MAMA | la personne, le corps, l'équipe | reste | MAMA | personne, corps |
| MASE | la tête, l'esprit | déménage | MALA | être vivant |
| MILA | la main, le travail manuel | déménage | MAMAKA | oeil, regard |
| MOKA | la nourriture, le repas | déménage | MAKA | remède, soin |
| MALO | la maison, l'abri | déménage | LAMA | (libre) |
| KAMO | la chose, l'outil | déménage | KAMA | fabriqué |
| SALA | le chemin, le lieu | reste | SALA | chemin, rue |
| SELO | le jour, la lumière | déménage | SESA | loin, long |
| SIME | le temps, l'instant | déménage | SASA | ami |
| MALA | la table, la surface | déménage | KEMA | tête, visage |
| MOSA | le lit, le repos | déménage | KIMA | mort |
| SOLA | la porte, la clé | reste | SOLA | porte, passage |
| MELE | la fenêtre, l'ouverture | déménage | LAMALE | (libre) |
| KAMA | le travail, la tâche, le projet | déménage | KEKA | outil, objet, chose |
| KESO | l'argent, la valeur | déménage | KASA | (libre) |
| MISE | le chef, le guide, le responsable | déménage | KALE | jeune (personne) |
| KOLE | l'objectif, le but | déménage | KOLA | (libre) |
| LAKA | le livre, le document | reste | LAKA | livre, document |
| LEKI | l'école, le lieu d'apprentissage | déménage | LEKA | enseigner |
| LOMA | l'idée, le concept | déménage | LOLA | monde, pays, terre |
| KILO | l'étude, l'analyse, la recherche | déménage | KILA | (libre) |
| KASA | faire, agir | déménage | KAKI | argent, valeur |
| KELI | parler, dire, expliquer | déménage | LASI | planifier |
| KIMA | voir, regarder | déménage | MILI | lit, siège |
| SAKE | aller, bouger | déménage | SAKI | voyageur |

**Bilan : 4 restent (MAMA, SALA, SOLA, LAKA), 21 déménagent sur 25.** Les 15 mots grammaticaux à une syllabe ne bougent pas.

La phrase d'exemple de la spec devient :
`KALE LASI LOLA KOKA KA SEMA KILA`
chef / explique / idée / projet / à / équipe / recherche. Chaque mot y est lisible lettre par lettre : KALE (action-esprit, personne), LASI (esprit-lien, verbe), LOLA (esprit-esprit, abstrait, nom).

Les 11 lignes TSV proposées par le correcteur (KEMO manger, SOKA commencer, LISA sur, etc.) ont été faites sous l'hypothèse "lexique arbitraire". Sous la grille elles deviennent : manger MAKI, commencer SEKI, finir SIKI, fini SIKO, long SELO, matin SESAKA, heure SASA + nombre, demain SESA KE, hier SESA ME, bonjour SESA. "Sur" et "où" restent ouverts (voir B.6 et Décisions).

### A.7 L'alternative honnête : garder le lexique arbitraire

On retire la phrase "chaque lettre a un sens" de la spec, on garde les 40 mots, on ajoute les 11 lignes du correcteur. Comparaison en 10 lignes :

1. Coût d'apprentissage, arbitraire : chaque mot s'apprend seul. 200 mots = 200 faits. Pas de dérivation : travailleur, travailler et travail sont trois mots sans lien garanti.
2. Coût d'apprentissage, grille : on apprend 4 sens, 4 nuances, 4 classes et 16 champs. Ensuite un mot inconnu se devine à moitié, et chaque nom donne 3 dérivés gratuits.
3. Coût de migration, arbitraire : zéro. La spec, le correcteur et l'étudiant restent valables.
4. Coût de migration, grille : 21 mots sur 25 changent de forme, la phrase d'exemple de la spec change, tests.py et les deux copies de travail sont à relire. Une demi-journée aujourd'hui.
5. Le coût de migration de la grille croît avec le lexique. À 25 mots il est faible. À 300 mots il devient prohibitif. Si on choisit la grille, c'est maintenant ou jamais.
6. Ce qu'on gagne avec la grille : la promesse de la spec devient vraie et vérifiable par script (un mot en I qui n'est pas un verbe est une erreur de lexique).
7. Ce qu'on gagne avec l'arbitraire : des mots libres, plus euphoniques, et aucun débat sur "est-ce que lit est vraiment un objet fabriqué".
8. Ce qu'on perd avec la grille : 256 cases seulement en 2 syllabes, 64 noms. Au-delà, 3 syllabes obligatoires. Et quelques placements forcés (lit en KM, bouche en ML).
9. Ce qu'on perd avec l'arbitraire : le seul argument de vente de la langue à 8 lettres. Sans sémantique, Quadra est un code compact, pas une langue "qui se lit".
10. Verdict : la grille coûte une demi-journée maintenant et rapporte sur chaque mot futur. L'arbitraire ne coûte rien maintenant et coûte sur chaque mot futur.

---

## B. Grammaire manquante

Principe : réutiliser les 15 particules d'abord. Une seule nouvelle : **LA** = relatif (que, qui). C'était la syllabe libre, et aucun autre point ne peut s'en passer.
Rappel des règles de la spec qui restent : SVO, modifieur après la tête, négation puis temps devant le verbe, SE après le mot qu'il pluralise, SO en tête = question, KA = datif.
Les mots de la grille sont utilisés dans les exemples. Ils sortent INCONNU dans `gloss`, jamais INVALIDE. Glose sous chaque phrase.

### B.1 Possession

Règle : le possesseur suit la tête, comme tout modifieur (règle 2 de la spec). Pronom ou nom, même place. Possession prédicative ("être à") = `MA KA` (être pour), KA datif.
- `LAKA MI` : livre / moi = mon livre.
- `LAKA MOSEKA` : livre / Moseka = le livre de Mostfa (nom propre transcrit).
- `LAKA MA KA MI` : livre / est / pour / moi = le livre est à moi. J'ai un livre = `LAKA MA KA MI` aussi (pas de verbe avoir).
- `LAKA SE MI` : livre / pluriel / moi = mes livres. `LAKA MI SE` : livre / je / pluriel = notre livre. SE colle au mot qu'il pluralise.

### B.2 Adjectif et comparaison

Règle : l'adjectif (mot en O) suit le nom. En attribut, il suit MA. Comparatif : `ADJ LE X` = ADJ au-delà de X. Égalité : `ADJ SA X` = ADJ avec X. Superlatif : `ADJ LE MAMO` = ADJ au-delà de tout. Le contraire se dit par l'adjectif inverse (MIMO petit), ou par KO devant l'adjectif.
- `LAMA MEMO` : maison / grand = une grande maison.
- `MAKA KOLO` : repas / bon = un bon repas.
- `LAMA MA MEMO` : maison / est / grand = la maison est grande.
- `LAMA MI MA MEMO LE LAMA MO` : maison / moi / est / grand / hors de / maison / toi = ma maison est plus grande que la tienne.
- `LAKA MI MA MEMO SA LAKA MO` : livre / moi / est / grand / avec / livre / toi = mon livre est aussi grand que le tien.
- `LAMA MI MA MEMO LE MAMO` : maison / moi / est / grand / hors de / tout = ma maison est la plus grande.

### B.3 Existence

Règle : pas de construction nouvelle. "Il y a X" = `X MA` (X est), avec ou sans lieu. "Il n'y a pas" = `X KO MA`. L'ordre SVO est gardé, KO reste devant le verbe.
- `LAKA MA KI LAMA` : livre / est / dans / maison = il y a un livre dans la maison.
- `LAKA KO MA KI LAMA` : livre / nég / est / dans / maison = il n'y a pas de livre dans la maison.
- `MAME MA KI LEKA` : quelqu'un / est / dans / école = il y a quelqu'un à l'école.

Sans article, "le livre est dans la maison" et "il y a un livre dans la maison" sont la même phrase. C'est accepté.

### B.4 Quantité et nombres dans la phrase

Règle : le nombre ou le quantifieur se place en fin de groupe nominal, après SE s'il y a SE. SE est facultatif devant un nombre (la spec écrit `KAMO KK`). Quantifieurs : MEMA beaucoup (la masse), MIMA peu (la partie), MAMO tous (entier). Ils se distinguent des adjectifs MEMO grand et MIMO petit par leur voyelle finale.
Ordinal : le nombre **avant** le nom. Nombre après = combien, nombre avant = lequel.
- `MI MILI LAKA L` : je / vois / livre / 3 = je vois trois livres.
- `LAKA SE MEMA` : livre / pl / masse = beaucoup de livres. `LAKA SE MIMA` = peu de livres. `LAKA SE MAMO` = tous les livres.
- `MAMA KK MA KI LAMA` : personne / 10 / est / dans / maison = dix personnes sont dans la maison.
- `MI MILI K LAKA` : je / vois / 2 / livre = je vois le deuxième livre.
- `L KIKA MA KILA` : 3 / tâche / est / étude = la troisième tâche est l'étude.

Un nombre seul en tête de phrase, devant un verbe, numérote une liste : `S MILI LAKA` = un : lire le livre.

### B.5 Subordonnée relative

Règle : **LA** (nouvelle particule, syllabe libre) ouvre la relative, juste après le nom. Relative sujet : `LA + verbe`. Relative objet : `LA + sujet + verbe`. La relative se termine à son verbe ou à l'objet de son verbe. La principale reprend au mot suivant (MA, KO, ME, KE ou un verbe).
- `LAKA LA MO MILI MA KA MI` : livre / que / tu / vois / est / pour / moi = le livre que tu vois est à moi.
- `MAMA LA LASI MA KALE` : personne / qui / parle / est / chef = la personne qui parle est le chef.

Sans LA, `LAKA MO MILI` se lit "ton livre voit". LA lève l'ambiguïté (phrase 18 du correcteur).

### B.6 Compléments de temps et de lieu

Règle : le complément de temps va **en tête de phrase**, sans particule. Le complément de lieu va **en fin de phrase**, avec KI (dans, à), KA (vers), LE (hors de). Le démonstratif "ce" = LI après le nom. Hier, demain, aujourd'hui = SESA + ME, KE, LI (jour passé, futur, ce jour).
- `SESAKA LI MI SAKI KA LEKA` : matin / ce / je / vais / vers / école = ce matin je vais à l'école.
- `SESA ME KALE ME LASI KA SEMA` : jour / passé / chef / passé / parle / à / équipe = hier le chef a parlé à l'équipe.
- `MI KEKI KI LAMA` : je / travaille / dans / maison = je travaille à la maison.
- `LAKA MA KI LIMA KEKA MO` : livre / est / dans / pièce / travail / toi = le document est dans ton bureau.

Point ouvert : "sur" et "sous". KI ne les couvre pas. Idiome possible : `KI MALA KEMA` (dans la tête de la table = sur la table). À valider.

### B.7 Impératif et politesse

Règle : impératif = verbe en tête, sans sujet. Interdiction = KO + verbe, sans sujet. Politesse = tourner l'ordre en question avec SO en tête et le pronom MO (ou MO SE pour vous). La question vaut demande polie, comme "peux-tu".
- `SAKI KA LEKA` : va / vers / école = va à l'école.
- `KO MILI LAKA` : nég / regarde / livre = ne regarde pas le livre.
- `SO MO SOKI LAKA KA MI` : question / tu / donnes / livre / à / moi = donne-moi le livre, s'il te plaît.
- `SO MO SE SIKI KA LAMA MI` : question / vous / venez / vers / maison / moi = venez chez moi, s'il vous plaît.

Vérification : les 35 phrases de cette section et de la section A ont été passées par `quadra.py gloss`. Zéro INVALIDE. Les mots de la grille sortent INCONNU, c'est attendu.

---

## C. Écriture diacritique

Spec : A = point, E = aigu, I = grave, O = rond, portés par la consonne. Consonne nue = chiffre.

### C.1 Choix des caractères

Quatre signes combinants, tous au-dessus de la lettre pour que la ligne reste régulière :

| Voyelle | Signe | Code | Nom Unicode |
|---|---|---|---|
| A | point | U+0307 | COMBINING DOT ABOVE |
| E | aigu | U+0301 | COMBINING ACUTE ACCENT |
| I | grave | U+0300 | COMBINING GRAVE ACCENT |
| O | rond | U+030A | COMBINING RING ABOVE |

Lettres de base en minuscules : m U+006D, s U+0073, k U+006B, l U+006C. Les minuscules se recommandent : les signes se posent mieux sur m, s que sur les capitales M, S où ils touchent le haut de la lettre dans plusieurs polices. La forme majuscule reste possible (début de phrase, titres).

### C.2 Les 16 syllabes et les 4 chiffres

| Syllabe | Rendu | Séquence | Précomposé NFC |
|---|---|---|---|
| MA | ṁ | m U+006D + U+0307 | U+1E41 |
| ME | ḿ | m U+006D + U+0301 | U+1E3F |
| MI | m̀ | m U+006D + U+0300 | aucun |
| MO | m̊ | m U+006D + U+030A | aucun |
| SA | ṡ | s U+0073 + U+0307 | U+1E61 |
| SE | ś | s U+0073 + U+0301 | U+015B |
| SI | s̀ | s U+0073 + U+0300 | aucun |
| SO | s̊ | s U+0073 + U+030A | aucun |
| KA | k̇ | k U+006B + U+0307 | aucun |
| KE | ḱ | k U+006B + U+0301 | U+1E31 |
| KI | k̀ | k U+006B + U+0300 | aucun |
| KO | k̊ | k U+006B + U+030A | aucun |
| LA | l̇ | l U+006C + U+0307 | aucun |
| LE | ĺ | l U+006C + U+0301 | U+013A |
| LI | l̀ | l U+006C + U+0300 | aucun |
| LO | l̊ | l U+006C + U+030A | aucun |

Chiffres nus : m = 0, s = 1, k = 2, l = 3. Exemples : `kk` = 10, `llll` = 255.

Six syllabes ont un caractère précomposé (ṁ ḿ ṡ ś ḱ ĺ), les dix autres non. Recommandation : stocker en NFD (lettre + signe, toujours deux points de code par syllabe). Une seule règle pour le parseur : lettre, puis signe. Un texte reçu en NFC se ramène en NFD par `unicodedata.normalize("NFD", s)`.

### C.3 Vérification d'affichage

Polices système macOS, table cmap lue directement (sans fontTools) :

| Police | Point U+0307 | Aigu U+0301 | Grave U+0300 | Rond U+030A | Positionnement (GPOS) |
|---|---|---|---|---|---|
| SF (San Francisco, police système) | oui | oui | oui | oui | oui |
| Arial | oui | oui | oui | oui | oui |
| Arial Unicode | oui | oui | oui | oui | oui |
| Times New Roman | oui | oui | oui | oui | oui |
| Courier New (mono) | oui | oui | oui | oui | oui |
| Helvetica | oui | oui | oui | oui | non, CoreText place les signes lui-même |
| Menlo (mono) | oui | oui | oui | oui | non, idem |
| Verdana | **non** | oui | oui | **non** | oui |

Conclusion : Arial, Times New Roman, Courier New et la police système affichent les 16 syllabes. Éviter Verdana (point et rond absents, la police de secours prend le relais et la ligne devient inégale). Sur le web et ailleurs : Noto Sans, DejaVu Sans et Liberation Sans ont les quatre signes avec positionnement.

### C.4 Phrase d'exemple

`MISE KELI LOMA KAMA KA MAMA KILO`

Minuscules (NFD, forme recommandée) :

m̀ś ḱl̀ l̊ṁ k̇ṁ k̇ ṁṁ k̀l̊

Majuscules :

M̀Ś ḰL̀ L̊Ṁ K̇Ṁ K̇ ṀṀ K̀L̊

Lecture : m̀ = MI, ś = SE, ḱ = KE, l̀ = LI, l̊ = LO, ṁ = MA, k̇ = KA, k̀ = KI.
Sept mots, 32 lettres latines deviennent 14 lettres portant 14 signes. Un chiffre dans la phrase se reconnaît à sa lettre sans signe : `k̇ṁ kk` = dix outils.

Même phrase dans la grille de la section A : `KALE LASI LOLA KOKA KA SEMA KILA` = k̇ĺ l̇s̀ l̊l̇ k̊k̇ k̇ śṁ k̀l̇.

---

## Décisions pour Mostfa

1. **Grille ou lexique arbitraire ?** Recommandation : la grille, maintenant. 21 mots déménagent aujourd'hui, à 300 mots ce serait impossible, et c'est la seule façon de tenir la promesse de la spec.
2. **Voyelle 2 = classe (A nom, E personne, I verbe, O adjectif) ?** Oui. C'est ce qui donne 3 dérivés gratuits par nom et rend tout verbe reconnaissable à sa dernière lettre.
3. **Voyelle 1 = nuance (A base, E dehors, I dedans, O abstrait) ?** Oui. Elle donne les contraires par paire E/I sans mot nouveau.
4. **Mots de 3 syllabes = racine + syllabe de précision ?** Oui, sinon 64 noms ne suffisent pas. À écrire dans la spec en une ligne.
5. **LA = relatif (que, qui) ?** Oui. C'est le seul trou sans contournement propre, et LA est la seule syllabe libre.
6. **Existence sans construction nouvelle (`X MA`, `X KO MA`) ?** Oui. SVO reste intact et rien n'est à apprendre.
7. **Nombre avant le nom = ordinal, après = cardinal ?** Oui. Zéro particule, zéro ambiguïté, la position de nombre nu est déjà non confondable.
8. **Quantifieurs MEMA, MIMA, MAMO après SE ?** Oui. Ils se distinguent des adjectifs par la voyelle finale, ce qui montre que la règle 3 sert vraiment.
9. **LI après un nom = démonstratif, SESA + ME/KE/LI = hier, demain, aujourd'hui ?** Oui. Réemploi de particules existantes, trois mots gagnés.
10. **Impératif = verbe sans sujet, politesse = SO en tête ?** Oui. Aucun mot nouveau, et la question comme demande polie est courante dans les langues naturelles.
11. **Comparatif avec LE, égalité avec SA ?** Oui. Réemploi de deux particules spatiales, lisible après un exemple.
12. **Diacritiques : minuscules, signes combinants U+0307, U+0301, U+0300, U+030A, stockage NFD ?** Oui. Vérifié dans six polices courantes, une règle unique pour le parseur.
13. **Noms propres : mot de 3 ou 4 syllabes choisi par le porteur ?** Oui. Sinon tout nom étranger sort INVALIDE.
14. **Reste ouvert : "sur", "sous", "où", "quand".** Pas de recommandation ferme. Piste : interrogatifs par SO + nom de la grille (`SO ... KI LOMA` = en quel lieu), à tester sur dix phrases avant de trancher.

Si la décision 1 est "grille", la suite est : mettre à jour lexique.tsv avec les 159 mots de la section A.5, changer la phrase d'exemple de la spec, ajouter LA, relancer tests.py et faire relire les 30 phrases de l'étudiant avec le nouveau lexique.
