# Inventaire des composants réutilisables

Source : observation directe de `style.css`, `assets/css/components.css`, `assets/css/product.css`, `partials/`, `assets/js/nav.js`. Documente l'existant au 2026-05-13.

Pour chaque composant : namespace CSS, fichier de définition, pages où il apparaît, particularités d'usage. **Ne pas confondre composants jumeaux** : plusieurs paires (`.nav` / `.hkh-nav`, `.footer` / `.footer-w`, `.lbl` / `.label`) coexistent — voir notes finales.

---

## 1. Navigation

### `.nav` — Nav principale (homepage + pages avec hero sombre)
- **Définition** : `style.css`
- **Injecté par** : `assets/js/nav.js` via `document.body.insertAdjacentHTML` — **source unique**
- **Sous-éléments** : `.nav__logo`, `.nav__center`, `.nav__right`, `.nav__cta`, `.nav__burger`, `.nav__has-drop`, `.nav__drop`, `.nav__lang`
- **États** : `.scrolled` ou `.nav-solid` ajoutent fond `rgba(249,247,242,.97)` + `backdrop-filter:blur(20px)` et basculent les textes en sombre. Par défaut transparent sur hero.
- **Détection page active** : fonction `ac()` interne à `nav.js` — `habitats.html` actif aussi sur `residence-*.html`, `blog.html` actif aussi sur `blog-*.html`.

### `.hkh-nav` — Nav alternative (pages intérieures sans nav.js)
- **Définition** : `assets/css/components.css`
- **Sous-éléments** : `.hkh-nav__logo`, `.nav-links`, `.nav-right`, `.nav-cta`, `.burger`, `.nav-lang`
- **Style** : nav directement solide (`rgba(249,247,242,.97)` + bordure cream-dk), pas d'état transparent
- **Note** : variante héritée. Les pages récentes utilisent `.nav` injecté.

### `.nav__drop` — Dropdown desktop
- **Définition** : `style.css` + dupliqué dans `components.css`
- **Variantes** : `.nav__drop--journal` (1 colonne, min-width 240px, en-tête "Le Journal" + 6 liens rubriques)
- **Pattern** : 3 colonnes par défaut (drop Habitats : 3 familles × 2 modèles)
- **Comportement** : `opacity:0` + `pointer-events:none` au repos, `:hover` parent → opacity 1

### `.mob-ov` — Mobile overlay (burger menu)
- **Définition** : `style.css` et `components.css`
- **Sous-éléments** : `.mob-hdr`, `.mob-x`, `.mob-prod`, `.res-sc`, `.rt` (mini-cartes produits scrollables horizontalement), `.mob-nav`, `.mob-bot`, `.mob-lang`, `.mob-cta`
- **Comportement** : `display:none` → `.open` ajoute `display:flex`, plein écran, scroll vertical
- **Particularité** : contient un mini-carrousel produit horizontal (`.res-sc` avec `scrollbar-width:none`)

---

## 2. Footer

### `.footer` — Footer principal (partial `footer-full.html`)
- **Définition** : `style.css` + HTML dans `partials/footer-full.html` (chargé via `fetch()`)
- **Sous-éléments** : `.footer__main` (4 colonnes), `.footer__brand`, `.footer__logo-wrap`, `.footer__logo`, `.footer__logo-sub`, `.footer__brand-geo`, `.footer__social`, `.footer__col`, `.footer__col-title`, `.footer__col--models`, `.footer__bottom`
- **Layout** : grid `2fr 1fr 1fr 1fr` (brand · habitats · explorer · contact)
- **Variante partial** : `footer-simple.html` — version allégée

### `.footer-w` — Footer alternatif (pages avec components.css)
- **Définition** : `assets/css/components.css`
- **Sous-éléments** : `.footer-w__main`, `.footer-w__logo`, `.footer-w__logo-sub`, `.footer-w__brand`, `.footer-w__col-t`, `.footer-w__col`, `.footer-w__social`, `.footer-w__bottom`
- **Note** : variante héritée, utilisée par certaines pages intérieures qui n'injectent pas le partial.

---

## 3. Hero / Page hero

### `.hero` — Hero homepage
- **Sous-éléments** : `.hero__bg` (image plein écran), `.hero__content`, `.hero__title` (mots animés via spans `.hero__word`), `.hero__girardin`, `.hero__girardin-link`, `.hero__actions`, `.hero__cta`
- **Particularité** : titre découpé en `<span class="hero__word" style="--i:N">` pour stagger d'apparition. `data-fr` / `data-en` contiennent du HTML encodé (`&quot;`, `&lt;`).

### `.m-hero` — Hero modèle (sections collection homepage et masthead modèle)
- **Variantes** : `.m-hero--essence`, `.m-hero--horizon`, `.m-hero--signature`
- **Sous-éléments** : `.m-hero__bg`, `.m-hero__collection`, `.m-hero__title` (`--mono` variant), `.m-hero__tagline`, `.m-hero__facts`, `.m-hero__facts-link`, `.m-hero__price`, `.m-hero__cta`
- **Positionnements** : `.m-hero__content--bl`, `--br`, `--ml`, `--mono`
- **Reveal** : classe `.m-hero-reveal` pour l'animation d'apparition

### `.page-hero` — Hero des pages intérieures
- **Sous-éléments** : `.page-hero__bg`, `.page-hero__content`, `.page-hero__grad`

### `.ph-hero` — Hero alternatif (composants.css, héritage)
- **Sous-éléments** : `.ph-hero h1`, `.ph-hero p`, `.ph-hero hr`
- **Note** : variante centrée plus simple. `histoire.html` est encore sur ce pattern (refonte à venir).

---

## 4. Cartes produit (3 variantes différentes coexistent)

### `.col-model` — Carte produit grille Collection homepage
- **Sous-éléments** : `.col-model__img`, `.col-model__info`, `.col-model__name`, `.col-model__sub`, `.col-model__price`, `.col-model__fins`, `.col-model__cta`
- **Particularité** : intègre les swatches `.fin-btn` pour bascule de finition + `data-price-{territory}` pour prix multi-territoire

### `.model-card` — Variante carte produit (utilisée sur autres pages)
- **Sous-éléments** : `.model-card__img`, `.model-card__overlay`, `.model-card__body`, `.model-card__family`, `.model-card__name`, `.model-card__tag`, `.model-card__spec`, `.model-card__cta`

### `.collection-family` — Bloc "famille" (introduction d'une famille de modèles)
- **Sous-éléments** : `.collection-family__hdr`, `.collection-family__lbl`, `.collection-family__stage`, `.collection-family__desc`
- **Conteneurs** : `.collection`, `.collection-grid`, `.collection-footer`

---

## 5. Sections récurrentes

### `.editorial` — Section éditoriale photo + texte (split 55/45)
- **Sous-éléments** : `.editorial__link` (lien éditorial avec flèche copper)

### `.stat-strip` — Bandeau sombre 4 chiffres
- **Sous-éléments** : `.stat-strip__inner`, `.stat-strip__item`, `.stat-strip__val`, `.stat-strip__num`, `.stat-strip__lbl`, `.stat-strip__sep`, `.stat-strip__star`, `.stat-strip__note`

### `.terrain-banner` — Bannière cream bicolonne + image pleine largeur
- **Sous-éléments** : `.terrain-banner__col`, `.terrain-banner__lbl`, `.terrain-banner__content`, `.terrain-banner__sub`, `.terrain-banner__divider`, `.terrain-banner__visual`, `.terrain-banner__cta`, `.terrain-banner__link`

### `.process` — Bloc étapes numérotées (00 → 05)
- **Sous-éléments** : `.process__steps`, `.process__step`, `.process__step-duration`, `.process__note`, `.process__sub-note`, `.process__footer`, `.process__link`

### `.proof-section` — Bloc preuve (photos + témoignage)
- **Sous-éléments** : `.proof-section__hdr`, `.proof-section__grid`, `.proof-section__quote`, `.proof-feature`, `.proof-feature__cap`, `.proof-feature__loc`, `.proof-feature__meta`, `.proof-feature__status`

### `.manifesto` — Bloc manifeste textuel (homepage, après hero)
- **Sous-éléments** : `.manifesto__inner`, `.manifesto__text`
- **Conteneur** : `.pullquote`, `.pullquote__inner` (pour pull-quotes éditoriaux)

### `.engagements` — Grille des 4 engagements HKH
- **Sous-éléments** : `.engagements__grid`, `.engagement`, `.engagement__icon`

### `.founders` / `.founder-card` — Bloc fondateurs (réservé `histoire.html` à venir)
- **Sous-éléments** : `.founders__inner`, `.founders__head`, `.founders__lbl`, `.founders__sub`, `.founders__grid`, `.founders__col-text`, `.founder-card__num`, `.founder-card__name`, `.founder-card__tag`, `.founder-card__body`, `.founder-card__desc`, `.founder-card__arrow`

### `.finance` / `.finance-card` — Blocs Financer / Investir sur homepage
- **Sous-éléments** : `.finance__inner`, `.finance__head`, `.finance__lbl`, `.finance__sub`, `.finance__grid`, `.finance__col-text`, `.finance__footer`, `.finance__note`, `.finance-card__num`, `.finance-card__name`, `.finance-card__tag`, `.finance-card__desc`, `.finance-card__arrow`
- **Note** : depuis le split 2026-05-12, plus de `.finance-card--outremer` masqué — 2 cartes Financer + Investir toujours visibles

### `.territories` — Grille des 5 territoires
- **Sous-éléments** : `.territories__grid`, `.territory`, `.territory__img`, `.territory__body`

### `.home-cta` — CTA triple final homepage
- **Sous-éléments** : `.home-cta__bg`, `.home-cta__inner`, `.home-cta__eyebrow`, `.home-cta__lead`, `.home-cta__side`, `.home-cta__blocks`, `.home-cta-block`, `.home-cta-block__n`, `.home-cta-block__label`, `.home-cta-block__title`, `.home-cta-block__body`, `.home-cta-block__arrow`
- **Note** : aussi utilisé en bas des fiches résidence (CTA Habiter / Investir)

### `.model-cta` — CTA final pages modèles
- **Sous-éléments** : `.model-cta__inner`

### `.newsletter` — Formulaire inscription
- **Sous-éléments** : `.newsletter__inner`, `.newsletter__desc`, `.newsletter__form`, `.newsletter__msg`
- **Style** : input underline-only + bouton arrow (pas de form boxé)

### `.story-intro` — Bloc intro narratif (legacy)
- **Sous-éléments** : `.story-intro__img`, `.story-intro__text`

### Contact (composants spécifiques `contact.html`)
- `.contact-layout`, `.contact-form-side`, `.contact-info-side`, `.contact-detail-block`, `.contact-agent-block`, `.investor-block`

---

## 6. Fiches résidence (namespace `.mp-*`)

Tous définis dans `assets/css/product.css`. Détail complet : `memory/project_residence_master_template.md`.

| Composant | Rôle |
|---|---|
| `.mp-mast` | Masthead — eyebrow + folio Nº XX/06 + H1 serif + lead + meta `<dl>` + numeral monumental |
| `.mp-show` | Showcase finitions — rendus 3D détourés transparent (Pattern B-bis) + swatches 72px + manifeste |
| `.mp-show__tag` | Caption overlay sans fond (Pattern B-bis), pour image détourée sur conteneur clair |
| `.mp-plan` | Plan SVG cliquable + photo de la pièce active (JS dans `assets/js/interactive-plan.js`) |
| `.mp-inclus` | Grille 2 colonnes — 10 catégories d'éléments inclus à la livraison |
| `.mp-visit` | Teaser visite 360° → lightbox Kuula (`.mp-player`) |
| `.mp-price` | Pricing — eyebrow dynamique `Tarification · Depuis [Territoire]`, note Girardin masquée sur France via `body[data-territory="france"]` |
| `.mp-next` | (legacy, ne plus reproduire) |

Lightbox 360 : `.mp-player`. Toujours via teaser cliquable, jamais d'iframe Kuula inline (voir `memory/feedback_kuula_limitations.md`).

---

## 7. Pages éditoriales — pattern folio/numéro/cover

Pattern partagé entre `blog.html` (cover par rubrique) et `projets.html` (projet phare par pays). Composants signature documentés dans `memory/project_design_system.md` :

- Folio typographique en tête : "LE JOURNAL · Nº 04 · [RUBRIQUE] · [MOIS ANNÉE]"
- Numéro monumental serif italic copper, opacity .11–.13, débordant en bas
- Passe-partout cream autour de la photo hero
- Caption italique copper avec trait 1.4rem × 1px (Pattern A)
- Pagineur de traits 60×2px sous la cover

Pour la grille de feed : pas de namespace global unique. Chaque page implémente ses cartes (ex. `blog-jay-family-saint-francois.html` utilise `.doss-*` pour les pages dossier).

---

## 8. Système de finitions

### `.fin-btn` — Swatch circulaire de finition
- **Sous-éléments** : `.fin-active-label` (label dynamique à côté des swatches)
- **Attributs** : `data-fin` (slug), `data-img` (path image)
- **Active state** : `box-shadow: 0 0 0 2px var(--paper), 0 0 0 3.5px var(--copper)`

---

## 9. Boutons & liens

### Famille `.btn-*` (génériques, components.css)
- **`.btn-dk`** — fond sombre, bordure sombre, hover transparent
- **`.btn-cu`** — fond copper, hover transparent (CTA principal)
- **`.btn-ol`** — outline sombre transparent, hover plein

### Famille `.btn-*` (style.css)
- `.btn`, `.btn-copper`, `.btn-outline`, `.btn-outline-light`, `.btn-light`, `.btn-full` — variantes utilitaires

### `.editorial__link` — Lien éditorial avec flèche copper
- **Pattern** : texte sans-serif uppercase + flèche `::after { content:'→'; color: var(--copper); }`
- **Hover** : translation `translateX(.4rem)` sur la flèche
- **Usage** : remplace les boutons outline génériques pour les CTAs texte de section

### `.nav__cta` / `.nav-cta` / `.mob-cta`
- CTA copper plein dans les barres de navigation desktop et overlay mobile

---

## 10. Labels et headers

### `.lbl` (components.css)
- Label copper sans-serif `.7rem` uppercase letter-spacing `.22em`, display block, margin-bottom `.75rem`

### `.label` (style.css)
- Variante similaire avec ruling line copper au-dessus (pattern documenté dans CLAUDE.md ancien)

### `.section-header`
- Wrapper de header de section générique

### `.sec` / `.sec-inner` / `.sec-hdr` (components.css)
- Section générique 5rem 2.5rem · max-width 1100px · header centré max-width 680px

### `.divider`
- Trait fin séparateur (variantes selon contexte)

---

## Notes importantes

### Composants jumeaux à connaître
Plusieurs paires héritées coexistent. Si tu modifies l'un, **vérifier l'autre** :
- `.nav` (avec nav.js) ↔ `.hkh-nav` (sans nav.js, components.css)
- `.footer` (partial fetché) ↔ `.footer-w` (intégré directement, components.css)
- `.lbl` (components.css) ↔ `.label` (style.css, ruling line)
- `.hero` (homepage) ↔ `.page-hero` ↔ `.ph-hero` (legacy)
- `.col-model` ↔ `.model-card` ↔ `.collection-family`

### Composants à privilégier sur nouveaux blocs
- Carte produit : `.col-model` (intègre prix multi-territoire)
- CTA texte : `.editorial__link`
- CTA bouton : `.nav__cta` style (copper plein avec hover transparent)
- Nav globale : injection via `nav.js` uniquement, ne plus écrire de HTML inline

### Animations
- Classes `.reveal`, `.m-hero-reveal` déclenchent les animations définies dans `assets/css/animations.css` (intersection observer)
