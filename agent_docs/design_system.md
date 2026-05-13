# Design System — valeurs réelles depuis `style.css`

Toutes les valeurs ci-dessous proviennent du fichier `style.css` racine, en l'état au 2026-05-13. Ne pas modifier ce document sans modifier la source — il documente l'existant.

## Tokens CSS (`:root` dans `style.css`)

### Couleurs
```
--copper            : #B87333   (accent principal, règle des 10 %)
--copper-lt         : #C98A4B
--copper-text-light : #9A5A1E   (texte copper sur fond clair, contraste Lighthouse)
--copper-text-dark  : #BA8D4A   (texte copper sur fond sombre, contraste Lighthouse)
--cream             : #F2EDE4   (fond warm neutral)
--cream-dk          : #E5DDD0   (bordures claires, fonds secondaires)
--paper             : #F9F7F2   (fond principal de la page)
--dark              : #2C2C28   (texte sombre, sections sombres)
--dark2             : #3A3A34   (variante dark)
--mid               : #6A645B   (texte secondaire)
--mid-dk            : #555550   (variante mid)
--accent            : #E3925A   (orange secondaire, peu utilisé)
--white             : #FEFCF9   (blanc cassé, pas pur)
--light-border      : var(--cream-dk)
```

Note : le commentaire d'en-tête de `style.css` mentionne `Cream #F5F0E8 | Dark #1A1A18` — ce sont d'anciennes valeurs. La source de vérité est `:root`.

### Typographie
```
--serif : 'Old Standard TT', Georgia, serif
--sans  : 'Jost', system-ui, sans-serif
```

### Layout
```
--nav-h : 72px    (hauteur du nav fixe en haut, déduire en padding-top sur les pages avec hero sombre)
```

## Fonts self-hostées (WOFF2)

Déclarées dans `style.css` lignes 8–11. Fichiers attendus dans `assets/fonts/` :
- `old-standard-tt-400.woff2` — serif regular
- `old-standard-tt-400i.woff2` — serif italic
- `old-standard-tt-700.woff2` — serif bold (rarement utilisé, headings doivent rester en weight 400)
- `jost-variable.woff2` — variable axis 200–500

Tous en `font-display: swap` avec `unicode-range` latin étendu. Élimine le render-blocking Google Fonts (voir mémoire `project_lighthouse_global_fixes.md`).

Certaines pages chargent encore Google Fonts en parallèle (`fonts.googleapis.com` dans `<head>`) — c'est un legacy à nettoyer progressivement, les WOFF2 locales gagnent toujours.

## Typographie — usages

| Famille | Usage |
|---|---|
| `var(--serif)` (Old Standard TT) | Headings (H1/H2/H3), pull-quotes, noms de famille modèle, captions italic |
| `var(--sans)` (Jost weights 200–500) | Corps de texte, navigation, labels, CTAs, méta |

**Règle absolue** : `font-weight: 400` sur tous les headings serif — jamais de bold. Le poids 700 est chargé pour de rares cas (ex. nav logo HKH initial) mais ne doit pas s'étendre aux H1/H2.

`letter-spacing: -.02em` sur les grands headings serif (≥ 2rem).

## Breakpoints responsive

```
@media (max-width: 1024px)   /* tablette */
@media (max-width: 768px)    /* mobile — burger menu apparaît */
```

Mobile-first non strict : la base est desktop, les media queries adaptent vers le bas. Grids 55/45 → `1fr` sur mobile.

## Patterns design détaillés

Les patterns CSS du projet (Ruling Line copper sur labels, Stat Strip, Terrain Banner, Editorial Layout 55/45, 3 patterns de caption photo, Swatches finitions, Formulaire underline-only, etc.) sont décrits dans la mémoire long-terme :

- `memory/project_design_system.md` — masthead unifié, folio, passe-partout, pagineurs
- `memory/project_photo_captions.md` — 3 patterns A / B / B-bis
- `memory/project_residence_master_template.md` — namespace `.mp-*` des fiches résidence
- `memory/project_fullwidth_vs_cadre.md` — rythme encart cadré vs full-width

**Toujours consulter la mémoire avant de réinventer un pattern.**
