# Conventions de code — HTML / CSS / JS

Observé sur l'ensemble du dépôt au 2026-05-13. Documente ce qui est en place, ne propose pas de nouvelles règles.

## Naming CSS — BEM avec namespace par section

Le projet utilise un BEM léger, avec un namespace court par section/composant pour éviter les collisions.

| Namespace | Périmètre |
|---|---|
| `.nav__*` | Nav globale (injectée par `nav.js`) |
| `.footer__*` | Footer global (partial) |
| `.hero__*`, `.manifesto__*`, `.collection`, `.editorial__*`, `.stat-strip__*`, `.terrain-banner__*`, `.partners__*`, `.proof-feature__*` | Sections homepage |
| `.mp-*` | Fiches résidence (master `residence-essence.html`) — `.mp-mast`, `.mp-show`, `.mp-plan`, `.mp-inclus`, `.mp-visit`, `.mp-price`, `.mp-show__tag` |
| `.fin-*` | Système de swatches de finitions |
| `.doss-*` | Pages dossier projet (`blog-*.html`, futurs `projet-*.html`) |
| `.fin-bridge` | Pont éditorial financer → investir |

Modifieurs en double-tiret : `.finance-card--outremer`, `.nav--anim`, `.m-hero--signature`, `.nav__drop--journal`.

## Pattern `<picture>` AVIF / WebP / fallback

Toute image insérée sur le site doit suivre ce pattern (sources AVIF → WebP → `<img>` fallback PNG/JPG), avec `width` et `height` explicites (anti-CLS) et `alt` rempli. `loading="lazy"` par défaut, `loading="eager" fetchpriority="high"` pour les images hero uniquement.

Détail et utilitaires : `memory/project_image_pipeline.md` + script `scripts/convert-img-to-picture.mjs` pour wrapper le legacy.

Swap dynamique (ex. changement de finition sur fiche résidence) : passer par une fonction `setPictureSources(pictureEl, srcPath)` qui met à jour les deux `<source>` ET la balise `<img>` fallback en parallèle.

## Internationalisation — `data-fr` / `data-en`

Tout texte visible porte les deux attributs :
- `data-fr="Texte français"`
- `data-en="English text"`

`assets/js/i18n.js` applique la langue active. Fonction publique : `window.applyLang(lang)`. Toujours l'appeler après une mise à jour DOM (ex. après `applyX(cat)` qui change la couverture du blog).

Variante pour contenus structurés (HTML inline) : les attributs peuvent contenir du HTML encodé (`&quot;`, `&lt;`). Voir `hero__title` de `index.html` pour un exemple avec spans imbriqués.

Variante pour bascules dynamiques (manifeste finitions résidence) : suffixes par slug `data-fr-{slug}` / `data-en-{slug}` lus par le JS local de la page.

## Attributs `data-*` métier

| Attribut | Sur quoi | Rôle |
|---|---|---|
| `data-nav` | `<body>` | État du nav (`hero` = sombre, sinon light) |
| `data-territory` | `<body>` | Territoire actif (`france`, `guadeloupe`, `martinique`, `saint-martin`, `guyane`) — pilote du masquage CSS (ex. `body[data-territory="france"] .mp-price__note-girardin { display: none }`) |
| `data-model` | Slot prix | Modèle ciblé pour `prices.js` (`essence`, `essence-plus`, `horizon`, `horizon-t`, `signature`, `signature-duo`) |
| `data-price-{territory}` | Slot prix | Valeur de fallback inline (reste visible si fetch échoue) |
| `data-fin` | Bouton swatch finition | Slug finition (`zenith`, `pinede`, `pure`, `linea`, `pano`) |
| `data-img` | Bouton swatch finition | Path image associé |
| `data-mhero` | Hero modèle homepage | Slug modèle |
| `data-fr-{slug}` / `data-en-{slug}` | Manifeste finitions | Texte par finition |

## Custom events

| Event | Émis par | Écouté pour |
|---|---|---|
| `hkh:prices-loaded` | `prices.js` après fetch réussi | IIFE territory-switch des pages avec slot prix, ré-applique les valeurs |
| `hkh:territory-changed` | Dropdown territoire global (nav) | Toute page qui doit réagir au changement de territoire (eyebrow, prix, notes Girardin) |

Pattern réutilisable : `window.addEventListener('hkh:prices-loaded', function(){ apply(get()); });`

## JS — style général

- Vanilla JS, pas de transpilation.
- IIFE par page pour le territory-switch et autres logiques locales.
- Pas de modules ES, balises `<script src="..." defer>` dans le `<head>`.
- Pas de framework, pas de bundler. Tout est versionné par query-string sur les CSS si besoin (`style.css?v=5`).

## HTML — règles

- Toujours valider FR + EN sur les nouveaux contenus.
- Ne pas ajouter de `<picture>` sans avoir d'abord généré les variantes AVIF/WebP (sinon broken sources).
- `<body data-nav="hero">` uniquement sur pages avec hero sombre plein écran ; sinon nav reste light dès le scroll 0.
- Préserver l'encodage URI exact dans les paths d'images (espaces et accents conservés `Top%20Photos/`).

## CSS — règles

- `calc()` exige des espaces autour des opérateurs (`calc(var(--x) + 1rem)`, jamais `calc(var(--x)+1rem)`) — voir `memory/feedback_calc_spaces.md`.
- Sur class toggle avec animation width/height/transform, **inliner les styles via JS** en parallèle du class toggle (bug Chrome) — voir `memory/feedback_chrome_style_invalidation.md`.
- Opacités texte minimum `.45` pour rester lisible. `.28` et `.38` sont à proscrire pour du contenu.

## Convention images

- **`/images/`** : sources locales lourdes (PNG/JPG haute résolution, photos drone, exports SketchUp, rendus Gemini/fal.ai). **Gitignored**, jamais commitées sur le repo. Les noms peuvent garder leurs caractères originaux (espaces, accents, majuscules) pour compatibilité SketchUp / InDesign / pipelines externes. Jamais référencées dans le code servi sur le web.
- **`/dist/images/`** : versions web optimisées (AVIF q65 + WebP q80, max 1200px largeur). **Seul dossier servi en prod**, référencé partout dans HTML/CSS/JS/JSON. **Convention de nommage stricte : kebab-case ASCII, aucun espace, aucun accent, aucune parenthèse, aucune majuscule.**
- Génération : `rtk node "Convertir images/convert-images.js"` (incrémental) ou `--force`. Le script applique automatiquement un slugify sur les paths output (les sources `/images/` gardent leurs noms originaux).
- Pattern HTML obligatoire : `<picture>` avec sources AVIF + WebP + fallback `<img>` pointant vers `dist/images/X.avif` (AVIF supporté par tous navigateurs actuels).
- Hook pre-commit versionné dans `scripts/git-hooks/pre-commit` bloque tout commit avec `src="images/` ou `url(images/` dans HTML/CSS staged. Active via `git config core.hooksPath scripts/git-hooks` après clone.
