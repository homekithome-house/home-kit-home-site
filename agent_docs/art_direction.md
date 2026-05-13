# Direction artistique HKH

Document de référence pour toute production visuelle (site, social, catalogue, pub). Vise à éviter le « premium générique » et à garantir la fidélité à l'ADN HKH.

**Ne traite pas** : les tokens design (couleurs, typo, breakpoints) → voir `design_system.md`. Le vocabulaire de marque → voir `brand_rules.md`. Les patterns de composants → voir `components.md`. Ce document traite uniquement de la **direction esthétique et émotionnelle**.

---

## Référence dominante : **iglucraft.com**

C'est la cible. Ce qu'on en retient précisément :

- **Silence visuel** : pas de bruit, pas de décor gratuit, pas d'emoji, pas d'icônes pour faire « tech moderne ». Une page = une intention.
- **Lenteur** : scroll calme, transitions longues, pas d'apparition saccadée. Le visiteur a le temps de regarder.
- **Noirs profonds, fonds tranchés** : sombre vrai (`#2C2C28` / `#1A1A18`) ou paper vrai (`#F9F7F2`). Jamais de gris incertain. Jamais de gradient « moderne ».
- **Photo qui parle seule** : photo plein écran, sans surcharge textuelle, sans gradient overlay, sans badge. Le produit fait le travail.
- **Typographie minimale** : serif pour les noms de produits et titres, sans-serif pour le reste. Hiérarchie par la taille et l'espace, pas par la décoration. Pas de display fonts, pas de scripts manuscrits, pas de gradients sur texte.
- **Pas d'icônes décoratives** : pas d'icônes "feature" alignées sur 3 colonnes, pas de pictos copper, pas de SVG ornementaux. Si une info mérite d'être dite, elle se dit en texte clair.
- **Prix visibles** : chaque fiche produit affiche son prix « à partir de XX XXX € » sans détour. Pas de « contactez-nous pour un devis » caché derrière un formulaire.
- **CTA clairs sans être agressifs** : libellés factuels, formes calmes (sans-serif uppercase letter-spacing modéré, copper plein ou outline sombre), pas de gradient, pas de pulse, pas d'animation pour forcer le clic.

---

## Anti-références

### **Aman** — éditorial pur sans prix
Référence interdite. Aman parle à des clients déjà acquis qui n'ont pas besoin du prix pour comprendre s'ils sont éligibles. HKH est sur un marché de **forte considération mais avec friction d'éligibilité** (Girardin, capacité d'achat 100k€+ à valider). Le visiteur HKH ne peut pas attendre 4 sections de prose italique pour comprendre s'il est dans la cible.

Détail : prose italique en pleine page, manifestos lents, captions littéraires (« A house, a moment, an eternity. »), zéro chiffre, CTA « Enquire » caché en footer — **rien de tout ça ne marche pour HKH**.

### **Sites d'agence type « creative studio »**
Référence interdite. Reconnaissables à : centered everything, gradients, animations gratuites, scroll-hijack, cursor custom, fontes display variables, sections "Awards"/"Selected work" décoratives. Tout ce qui dit « regarde-moi » au lieu de « regarde le produit ».

### **Sites immobilier ou modulaire mainstream**
Référence interdite. Carrousels rapides, badges « Nouveau », filtres en haut, prix barrés, compteurs « 1 247 maisons livrées », photos avec overlay sombre + texte centré.

---

## 3 émotions cibles

Tout choix visuel ou rédactionnel doit servir au moins une de ces trois émotions. Si un élément n'en sert aucune, il n'a pas sa place.

### 1. **Sérénité**
Le visiteur respire en arrivant. Beaucoup d'espace, peu d'éléments visibles à la fois, photos lentes, pas d'urgence. La marque dit « tu es au bon endroit, prends ton temps ».

### 2. **Désir**
Le visiteur veut habiter ce qu'il voit. La photo doit faire la projection mentale en moins de 2 secondes — un cadre d'image qui donne envie de s'asseoir dans la pièce. Pas de promesse, juste l'évidence visuelle.

### 3. **Évidence**
Le visiteur comprend le produit en 5 secondes. Il sait : ce que c'est (habitat livré clé en main), combien ça coûte (fourchette visible), comment ça arrive (grue, pieux, 1 jour), pour qui (résidentiel ou hôtelier), quel avantage clé (Girardin 39 % outre-mer). Pas besoin de chercher.

---

## Principes de composition

### Photo plein écran prioritaire
La photo est toujours le premier élément structurant. Texte par-dessus uniquement si l'image le permet (zone basse calme, ciel vide, mur uni). Sinon : texte en dessous, photo seule en haut.

### Respiration entre les blocs
Espacement vertical généreux entre sections (`padding-block: 5–8rem` selon contexte). Le scroll doit être lent — chaque section a le temps d'exister avant la suivante. Pas de section qui « termine où la suivante commence ».

### Hiérarchie par l'espace, pas par la couleur
On distingue les niveaux d'importance par la taille typographique et l'espace négatif autour, pas par des fonds de couleur ou des bordures. Le copper est une **ponctuation** (label, flèche, accent), pas une **clôture** (pas de boîtes copper, pas de fond copper plein étendu).

### Scroll calme
Animations de reveal au scroll : opacité + translation Y ≤ 20px, durée ≥ 600 ms, easing `ease-out` ou cubic-bezier douce. **Jamais** de scroll-hijack, de parallaxe agressif, de scaling au scroll, de carousel auto-play rapide.

### Une seule action par section
Chaque section a **un** CTA — pas trois. Si l'utilisateur scrolle, il continue. Si l'utilisateur clique, il sait exactement où il va. Les sections qui veulent « offrir le choix » entre 3 CTAs égaux diluent.

---

## Ce qu'on ne fait jamais

- **Carrousels rapides** (auto-play < 6 s, transitions < 500 ms)
- **Gradients** sur fonds, textes, boutons
- **Icônes décoratives** (feature icons, pictos copper, SVG ornement)
- **CTA pulsants, glow, hover-shake**
- **« Discover more »**, **« Explore our universe »**, **« Découvrir notre univers »** — libellés flous
- **Parallaxes agressifs**, scroll-hijack, scale-on-scroll
- **Animations gratuites** (animations qui ne portent aucune information)
- **Badges promo**, ribbons « Nouveau », « Best-seller »
- **Compteurs animés** (« 247 livraisons », « 12 pays »)
- **Popups** (newsletter, exit-intent, cookie en plein écran)
- **Stat strips 4 colonnes dark** comme moyen de remplir une page sans contenu réel
- **Grilles 3-equal-cards timeline** (« 01 Conception · 02 Fabrication · 03 Livraison ») décoratives
- **Prose italique en pleine page** (manifestos lents façon Aman)
- **Manifestos décoratifs** placés pour faire « marque qui pense »
- **Sections "Awards"** ou logos presse alignés
- **Avant/après sliders**, comparateurs ludiques
- **Cursor custom**, fonts display variables, lottie d'ambiance

---

## Ce qu'on fait toujours

- **Photo dominante** sur chaque section principale
- **Typographie large et calme** — H1/H2 serif `font-weight:400`, jamais bold
- **Espace négatif généreux** (padding bloc 5rem+, marges inter-sections nettes)
- **Transitions lentes** (≥ 600 ms, easing doux)
- **Prix visible** sur chaque fiche produit (fourchette ou « à partir de »)
- **CTA factuel** : « Voir la résidence », « Demander un devis », « Parler à HKH », « Voir le projet ». Jamais « Découvrir », « Explorer », « En savoir plus » sans complément.
- **Texte en français premier**, anglais en switch — la traduction n'est pas une décoration, c'est une utilité.

---

## Logique de conversion premium

### 1. Projection immédiate dans l'habitat (5 premières secondes)
Le visiteur doit pouvoir s'imaginer **dedans** dès la première section. Hero = photo qui donne envie de s'asseoir dans la pièce. Pas une vue d'ensemble paysagère à 200 m de distance, pas une grue qui pose un module — ce sont des arguments rationnels, à montrer plus bas. **La première image vend le confort, pas le procédé.**

### 2. Preuve de réel
Photos de **vraies livraisons** > rendus 3D. Si un projet partenaire est livré (Saint-François avec Jay Family, etc.), il passe devant un rendu 3D dans la hiérarchie. Les rendus 3D restent indispensables pour les modèles non encore livrés, mais ils ne sont jamais survalorisés au point de masquer ce qui est réellement construit.

### 3. Girardin visible mais factuel
L'argument fiscal (39 % outre-mer) est un **avantage fort qui doit être visible immédiatement**, pas survendu. Format validé : « Éligible Girardin · 39 % de défiscalisation outre-mer · [en savoir plus →] ». Une ligne, sans gras, sans badge, sans encadré coloré. Le lien renvoie à `investir.html` pour le détail.

### 4. Contact comme conversation
Le contact n'est pas un formulaire administratif. Libellés : « Parler à HKH », « Parlons de votre projet », « Échange avec Norman aux Antilles ». Tonalité : un interlocuteur identifié, pas un service client anonyme. Email + téléphone visibles, pas planqués derrière un formulaire de 10 champs.

---

## Règle de tension éditorial / commercial

**À chaque section, le prix et le CTA doivent être lisibles en 1 seconde.**

Test : si tu ouvres la page sur une section au hasard, tu dois pouvoir répondre à « combien ça coûte » et « comment je l'achète » en 1 seconde. Si l'éditorial empêche cette lisibilité (prose qui enterre le prix, CTA caché en bas après 3 paragraphes), **on rebascule vers commercial**.

L'éditorial chez HKH est une **arme grammaticale** :
- typographie serif large
- espace négatif généreux
- photo qui parle seule
- captions courtes et justes

Ce n'est **pas un objectif** :
- pas de prose italique en pleine page
- pas de manifestes décoratifs
- pas de captions littéraires
- pas d'enfouissement du prix sous la « narration de marque »

Détail des pages où le commercial doit dominer (habitats, contact, fiches résidence) : `brand_rules.md` et `memory/project_editorial_vs_commercial.md`. Mécanique du basculement : `memory/feedback_editorial_grammar_not_object.md`.

---

## Pour résumer en une ligne

> Iglucraft sait. Aman vend de la prose. HKH vend des habitats. Donc HKH suit iglucraft : photo dominante, prix visible, CTA factuel, éditorial dans la grammaire pas dans le discours.
