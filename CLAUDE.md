# Home Kit Home (HKH) — Claude Code Guide

## Préférences de communication

- Skip pleasantries, no preambles. Go straight to the action or the answer.
- Push back on weak ideas. No flattery. Tell Benjamin directly if his approach is flawed.
- One line of explanation max after work done. No code shown in responses (cf. règle absolue ci-dessous).
- If uncertain, say `Unsure because X` in one line, then answer anyway.

## Règles absolues

**Ne jamais afficher de code dans les réponses.** Utiliser les outils pour modifier les fichiers, puis confirmer en une phrase. Aucune exception.

**Avant toute création de page, refonte de section, ou choix de composition visuelle, lis `agent_docs/art_direction.md`.** ADN visuel HKH (référence iglucraft, anti-références, émotions cibles). Pas de production visuelle sans ce passage préalable.

**Avant tout chantier visuel/UX au niveau SECTION, lis et applique `agent_docs/workflow_chantier_visuel.md`.** Méthode HKH en 8 étapes (cadrage → taste-skill → choix → brief court → plan → validation → livraison → itération) + règles fixes (jamais trancher sur direction visuelle, jamais brief > 40 lignes, toujours diagnostic via Claude in Chrome MCP).

**Avant toute création/refonte/audit d'une PAGE entière, lis et applique OBLIGATOIREMENT `agent_docs/methode_niveau_method.md`.** Méthode HKH "Niveau Method" en 4 phases (récit global → audit checklist 5/5 → production section par section → cohérence inter-sections → polish technique). **5 ingrédients obligatoires par section** (signature visuelle distinctive · narrativité · reveal one-shot puissant · structure visuelle forte · closure narrative). **5 critères inter-sections** (récit global · rythme paper/dark narratif · signatures uniques · densité émotionnelle homogène · transitions soignées). **Règle absolue Benjamin : on ne déroge JAMAIS de cette méthode.** Le polish technique (smooth scroll, parallax, sticky) vient TOUJOURS en dernier (Phase 4) — il ne sauve jamais une page sage.

**Avant toute animation, reveal, parallax, sticky, hover ou trait décoratif, lis et applique OBLIGATOIREMENT `agent_docs/animations_system.md`.** Système Pass 4.5 livré (2026-05-14) : pattern `data-reveal-item` + IO par élément, traits closure animés (width 0→X), parallax wrappers enlarged, sticky magazine spread, hover trail underline, smooth scroll lerp. Pattern visuel **répété par section** (pas scroll-driven global = AI tell). Snippets copy-paste ready dans le doc.

**Vocabulaire de marque** : voir `agent_docs/brand_rules.md` (interdits, em-dash vs middot, ton éditorial vs commercial, ton catalogue 2026).

**Validation systématique** (images, i18n, Lighthouse) : voir `agent_docs/architecture.md` § Validation systématique.

---

## WHAT
Site vitrine HTML/CSS/JS statique pour **Home Kit Home** — habitats architecturaux haut de gamme livrés clés en main (France métropole, Antilles françaises, Guyane, Caraïbe).

Stack : HTML statique · CSS pur (`style.css` + 4 modules dans `assets/css/`) · JS vanilla (`assets/js/`) · données JSON (`data/`) · pas de framework, pas de build CSS, pas de bundler JS. Fonts WOFF2 self-hostées.

Référence design : iglucraft.com. Positionnement : galerie d'architecture haut de gamme, magazine éditorial. 70–80 % fonds clairs, 20–30 % accents sombres.

---

## HOW

**Lancer le site en local** :
```
npx serve .
```
Le site utilise `fetch()` pour charger les partials nav/footer — ne jamais ouvrir `index.html` en `file://`. Accessible sur `http://localhost:5500` ou le port retourné par `serve`.

**Convertir les images** :
```
rtk node "Convertir images/convert-images.js"
```
Lit `/images/`, écrit AVIF q65 + WebP q80 dans `/dist/images/` (miroir, max 1200px). Incrémental. Options : `--force`, `"sous-chemin"`.

**Avant toute modif CSS ou layout** : `/chrome` sur `localhost:5500` → inspecter le DOM → localiser la règle source → corriger et vérifier visuellement. Jamais de modif CSS à l'aveugle.

---

## Pour aller plus loin — `agent_docs/`

- `animations_system.md` — **lecture obligatoire avant toute animation** (data-reveal-item, traits closure, parallax, sticky, hover trail, smooth scroll lerp, snippets copy-paste)
- `art_direction.md` — **lecture obligatoire avant toute production visuelle** (référence iglucraft, anti-Aman, émotions cibles, anti-patterns)
- `architecture.md` — organisation des pages, partials, `nav.js` injecteur unique, assets/data, validation systématique
- `components.md` — inventaire des composants réutilisables (nav, footer, hero, cartes produit, fiches résidence)
- `design_system.md` — CSS variables réelles depuis `style.css` (couleurs, typo, breakpoints), fonts WOFF2
- `code_conventions.md` — BEM, pattern `<picture>`, i18n `data-fr`/`data-en`, attributs `data-*`, custom events `hkh:*`
- `brand_rules.md` — vocabulaire interdit/autorisé, règles em-dash, ton éditorial vs commercial, ton catalogue 2026
- `visual_pipeline.md` — SketchUp (script Ruby hors repo) → fal.ai → publication
- `product_catalog.md` — 6 modèles, configuration produit, options incluses, engagements, ambiances (catalogue 2026)

**Mémoire long terme** : `~/.claude/projects/-Users-benjamindupouy-Claude-Projets-Site/memory/` (indexé dans `MEMORY.md`). Patterns CSS validés, master template résidence, leçons Lighthouse, split Financer/Investir, dropdown territoire, etc. **Toujours vérifier la mémoire** avant de redécider quelque chose.

---

## Contact
contact@home-kit-home.com · +33 (0)7 82 57 75 28 · @home.kit.home
© Home Kit Home Solutions, EURL — RCS Pointe-à-Pitre 994 786 614 — Sainte-Anne, Guadeloupe
