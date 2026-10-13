# Projet Bingo

## Contexte

Le fichier `~/Downloads/Bingo BTB#9.svg` (1080×1080, ~1 Mo) est une grille de bingo 5×5 destinée aux
fanfares (« On a fait pleurer une mamie », « On joue un tube de Johnny »…, case libre centrale
« on veut venir à BTB#9 »). Objectif : une nouvelle page du site qui l'affiche, où l'on peut cocher les
cases, puis (étape 2) envoyer sa grille via le formulaire de contact existant, comme une candidature
ludique de fanfare.

**C'est jouable** : le texte des cases est vectorisé (des `<path>`, pas du `<text>`), donc on ne
modifie pas le SVG, on pose par-dessus une grille 5×5 de boutons transparents alignée sur les cases.
Le SVG reste l'illustration, les boutons portent l'interaction et l'accessibilité.

## Étape 1 : la page interactive

1. **Asset** : copier le SVG dans `src/lib/assets/bingo-btb9.svg` (nom sans `#`), l'alléger avec
   `npx svgo` (sans ajouter de dépendance), et vérifier visuellement qu'il est inchangé.
2. **Données** : `src/lib/data/bingo.ts` : les 25 intitulés dans l'ordre (ligne par ligne), la case libre
   en index 12. Ils servent d'`aria-label` (le texte du SVG n'est pas lisible par un lecteur d'écran),
   au calcul du bingo et, à l'étape 2, au contenu de l'e-mail.
3. **Route** `src/routes/bingo/+page.svelte` (sur le modèle de `src/routes/editions/[slug]/+page.svelte`) :
   `Navbar`, `SectionHeading`, le bingo, `Footer`, `<svelte:head>` (title/description).
4. **Composant** `src/lib/components/Bingo.svelte` (runes Svelte 5) :
   - conteneur `relative` carré : `<img src={bingoSvg}>` + une grille CSS 5×5 en `absolute`, positionnée
     en % sur le plateau vert (rect du SVG : x 89.67→977.32, y 222.14→916.13 sur 1080).
   - chaque case = `<button aria-pressed>` ; cochée → un « tampon » par-dessus (rond/croix aux couleurs
     du site, petite rotation aléatoire pour l'effet feutre), case libre cochée d'office.
   - état `let checked = $state(...)` ; `$derived` pour détecter ligne / colonne / diagonale complète →
     message « BINGO ! » (animation coupée sous `prefers-reduced-motion`).
   - bouton « Recommencer ».
5. **Accès** : lien vers `/bingo` depuis la Navbar (`src/lib/components/Navbar.svelte`, tableau de liens)
   et/ou un bouton dans `AnnouncementBanner`/`Hero`. Ajouter la route au paragraphe Architecture du
   `CLAUDE.md`.

## Étape 2 : envoyer sa grille avec le formulaire de contact

Réutiliser `ContactForm.svelte` et l'action `contact` de `src/routes/+page.server.ts`, sans nouveau
backend :

- `ContactForm.svelte` : prop optionnelle `bingo?: string[]` → un `<input type="hidden" name="bingo">`
  par case cochée, type pré-sélectionné « Fanfaron » ; `action="/?/contact"` pour pouvoir l'utiliser hors
  de la page d'accueil (vérifier que `use:enhance` et l'affichage succès/erreur suivent).
- `src/lib/server/contact.ts` : `validateContact` lit `formData.getAll('bingo')`, **ne garde que les
  intitulés présents dans `bingo.ts`** (frontière de confiance), et `sendContactEmail` ajoute
  « Grille bingo (n/25) : … » au texte de l'e-mail et « [Bingo] » au sujet.
- Ajouter un cas au test `src/lib/server/contact.test.ts` (intitulé inconnu filtré).
- Sur `/bingo` : sous la grille, le formulaire apparaît (ou se déplie) avec le message pré-rempli.

## Hors périmètre (à ajouter plus tard si besoin)

- Sauvegarde de la grille entre deux visites (localStorage).
- Image PNG de la grille cochée à partager sur Instagram.

## Vérification

- `npm run check`, `npm run lint`, `npm run test`.
- `npm run dev` → `/bingo` : alignement des boutons sur les cases au téléphone et sur ordinateur,
  cocher/décocher, bingo en ligne/colonne/diagonale, navigation clavier (Tab + Entrée), VoiceOver lit
  les intitulés.
- Étape 2 : envoi réel avec `.env` local → e-mail reçu avec la liste des cases ; envoi sans JS ; cas
  d'échec → lien `mailto:`.
- Puis commit sur `dev` et test sur la preview Vercel (sur demande seulement).
