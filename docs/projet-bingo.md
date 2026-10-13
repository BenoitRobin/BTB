# Projet Bingo

**Statut : terminé et en ligne depuis le 13/10/2026** — https://festivalbougetonbouble.vercel.app/bingo
(lien « Bonus » dans la navbar). Testé sur iPhone (partage Instagram, envoi à Bob) et sur ordinateur.

## Contexte

Le fichier `~/Downloads/Bingo BTB#9.svg` (1080×1080, ~1 Mo) est une grille de bingo 5×5 destinée aux
fanfares (« On a fait pleurer une mamie », « On joue un tube de Johnny »…, case libre centrale
« on veut venir à BTB#9 »). Objectif : une page du site où l'on coche les cases, puis où l'on partage
ou envoie sa grille, comme une candidature ludique de fanfare.

Le texte des cases est vectorisé (des `<path>`, pas du `<text>`) : on ne modifie pas le SVG, on pose
par-dessus une grille 5×5 de boutons transparents alignée sur les cases. Le SVG reste l'illustration,
les boutons portent l'interaction et l'accessibilité.

## Ce qui a été fait

### La grille

- **Asset** `src/lib/assets/bingo-btb9.svg` (optimisé avec `npx svgo`, 966 Ko). Le « #9 » du logo avait
  perdu sa couleur à l'export Illustrator (`fill: none`, invisible) : rendu en **noir** dans notre copie.
- **Données** `src/lib/data/bingo.ts` : les 25 intitulés (ligne par ligne, case libre en index 12), qui
  servent d'`aria-label`, au calcul du bingo et à l'e-mail ; et le contour exact de chaque case
  (`BINGO_SQUARE_SHAPES`, extrait du SVG, colonne par colonne dans le fichier).
- **Route** `src/routes/bingo/+page.svelte` : `Navbar`, `SectionHeading`, `Bingo`, `Footer`. La phrase
  d'intro tient sur une ligne : les deux questions ne s'affichent qu'à partir de `lg`.
- **Composant** `src/lib/components/Bingo.svelte` :
  - boutons `aria-pressed` en grille CSS 5×5 posée en % sur le plateau vert ;
  - case cochée = **tampon « bouble »** (`TamponBTB.svg` → `tampon-btb.svg`, et `tampon-btb-blanc.svg`
    à traits blancs), un peu penché (angle fixe par case) ;
  - case cochée **inversée** (fond noir, texte blanc) : la forme exacte de la case, en blanc, posée en
    `mix-blend-mode: difference` ; la case libre orange reste orange (cochée d'office) ;
  - bingo (ligne, colonne, diagonale) détecté par `$derived`, annoncé aux lecteurs d'écran.

### Le BINGO

- **Explosion façon BD** `src/lib/components/BingoBurst.svelte` (dessin original dans l'esprit de la
  capture de référence, aux couleurs du site) : bulle rose, « BINGO » jaune, trame de points, traits de
  vitesse, étoiles qui tournent chacune dans un sens et à une vitesse aléatoires.
- Un appui à côté des boutons **réinitialise la grille**. Trois choix :
  - **Rejouer** ;
  - **Poste sur ton insta** : `src/lib/bingoImage.ts` redessine la grille cochée dans un PNG 1080×1080
    (préparé dès l'apparition de l'explosion) ; sur téléphone, menu de partage (Instagram y apparaît),
    sur ordinateur, téléchargement de l'image ;
  - **Envoyer à Bob** : ferme l'explosion et affiche `ContactForm` sous la grille (« Envoie ta grille à
    Bob ! », « Fanfaron » pré-coché).

### Envoi de la grille avec le formulaire de contact

- `contactAction` (`src/lib/server/contact.ts`) est partagée par l'accueil et `/bingo`.
- `validateContact` lit `formData.getAll('bingo')` et **ne garde que les intitulés de `bingo.ts`**
  (frontière de confiance, test dans `contact.test.ts`) ; l'e-mail ajoute « [Bingo] » au sujet et la
  liste « Grille bingo (n/25) ».

### Navbar

- Le lien s'appelle **« Bonus »** : au survol, au focus clavier et sur la page `/bingo`, le mot s'affiche
  dans une petite explosion rose (même forme que le BINGO, exportée par `BingoBurst.svelte`).

## Pistes non faites

- Sauvegarde de la grille entre deux visites (localStorage).
- Ajouter l'explosion « BINGO » sur l'image partagée sur Instagram.
