# Architecture — organisation du projet

Source : observation directe du dépôt au 2026-05-13.

## Pages HTML (racine du projet)

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil |
| `habitats.html` | Gamme complète, registre commercial |
| `modeles.html` | Vue alternative de la gamme |
| `residence-essence.html` | Master des fiches résidence (namespace `.mp-*`) |
| `residence-essence-plus.html`, `residence-horizon.html`, `residence-horizon-t.html`, `residence-signature.html`, `residence-signature-duo.html` | 5 dérivés du master |
| `partenaires.html` | Agences partenaires |
| `projets.html` | "Le Cahier" — inventaire des projets par territoire |
| `blog.html` | "Le Journal" — articles éditoriaux, 5 rubriques |
| `blog-jay-family-saint-francois.html` | Article dossier (template pour les futurs `projet-*.html`) |
| `financer.html` | Mécanique d'achat (France + outre-mer) |
| `investir.html` | Optimisation fiscale locatif outre-mer |
| `faq.html` | Questions fréquentes |
| `histoire.html` | Notre histoire (refonte en attente) |
| `visite-virtuelle.html` | Lightbox 360 Kuula |
| `contact.html` | Page de conversion directe |
| `nav-snippet.html` | Snippet de référence (ne pas modifier en parallèle de `nav.js`) |

## Composants globaux

### `assets/js/nav.js` — injecteur unique du nav et du mob-nav
Le nav et le mob-nav sont injectés dans chaque page via `document.body.insertAdjacentHTML`. **Toute évolution de la nav = modifier ce fichier seul.** Le HTML inline est désormais minimal sur les pages (`<body data-nav="...">` suffit à indiquer l'état).

Fonction `ac()` interne : détection de page active. `habitats.html` actif sur toutes les `residence-*.html`, `blog.html` actif sur toutes les `blog-*.html`.

### `partials/footer-full.html` et `partials/footer-simple.html`
Chargés via `fetch()` — c'est pourquoi un serveur HTTP est obligatoire (pas de `file://`). Footer full = 4 colonnes (Brand · Habitats · Explorer · Contact). Footer simple = variante allégée.

## Feuilles de style

| Fichier | Rôle |
|---|---|
| `style.css` | Global, tokens CSS, nav, hero, layouts homepage, footer |
| `style.min.css` | Version minifiée (à régénérer après modif si utilisée en prod) |
| `assets/css/animations.css` | Reveal animations (intersection observer) |
| `assets/css/components.css` | Composants UI réutilisables |
| `assets/css/forms.css` | Inputs, boutons de formulaire |
| `assets/css/product.css` | Fiches résidence (namespace `.mp-*`) |
| `.impeccable.md` | Brief design contextuel du projet (généré par skill `impeccable`) |

## Scripts JS

| Fichier | Rôle |
|---|---|
| `assets/js/i18n.js` | Switcher FR/EN — applique `data-fr`/`data-en` au DOM, fonction `window.applyLang()` |
| `assets/js/nav.js` | Voir ci-dessus |
| `assets/js/prices.js` | Charge `data/prices.json` (fetch `no-cache`), dispatch `hkh:prices-loaded` |
| `assets/js/interactive-plan.js` | Plan SVG cliquable des fiches résidence |

## Données

| Fichier | Rôle |
|---|---|
| `data/models.json` | Source unique des 6 modèles (specs, photos, URLs, taglines FR/EN) |
| `data/prices.json` | 30 prix (6 modèles × 5 territoires : france, guadeloupe, martinique, saint-martin, guyane). Placeholder actuel : `"à partir de —"` |

## Pipeline d'images

| Chemin | Rôle |
|---|---|
| `images/` | Sources PNG/JPG (originaux) |
| `dist/images/` | Sortie AVIF + WebP (miroir de `/images/`, max 1200px). Généré, ne pas committer manuellement |
| `Convertir images/convert-images.js` | Script `sharp`, AVIF q65 + WebP q80, incrémental |
| `scripts/convert-img-to-picture.mjs` | Utilitaire one-shot pour wrapper `<img>` legacy en `<picture>` |
| `fichiers/graphify-out/` | Sortie d'un outil tiers (non touché par le build site) |

## Documents annexes

- `fichiers/Home Kit Home - Collection 2026.pdf` — catalogue commercial PDF (source matière pour les specs, déjà transcrit dans `data/models.json`)
- `favicon.svg` — favicon temporaire (à remplacer avant prod, voir mémoire `project_o2switch_deploy.md`)

## Validation systématique

À appliquer à chaque modification :
- **Image ajoutée** → passer par `Convertir images/convert-images.js` puis insérer en `<picture>` AVIF/WebP/fallback (voir `memory/project_image_pipeline.md`)
- **Texte visible** → traductions `data-fr` + `data-en` (voir `assets/js/i18n.js`)
- **Page nouvelle ou refondue verrouillée** par Benjamin → audit Lighthouse 100/100/100/100 obligatoire (voir `memory/feedback_lighthouse.md`). Pas d'audit pendant l'itération design.

## Pages à créer (référence)

- `mentions-legales.html` — lien dans `footer__bottom`
- `projet-sainte-anne.html`, `projet-le-gosier.html`, `projet-marigot.html`, `projet-cayenne.html`, `projet-petit-bourg.html` — pages dossiers individuelles, pattern `blog-jay-family-saint-francois.html`
