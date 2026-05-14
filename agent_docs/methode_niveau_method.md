# Méthode HKH "Niveau Method" — production de pages éditoriales premium

> **Règle absolue (Benjamin)** : on ne déroge JAMAIS de cette méthode.
> Pas d'exception, pas de "pour cette fois on saute la phase X".
> Si une page semble sortir du cadre, c'est qu'elle a un problème, pas la méthode.

---

## Principe fondamental

**Une page atteint le "niveau Method" quand CHAQUE section combine 5 ingrédients cumulés ET que les sections forment un RÉCIT cohérent (pas un empilement).**

Référence : la section Method "Du terrain à la pose, en quelques mois." sur la home. Elle a 5/5 ingrédients. Les autres sections de la home en avaient 1-2/5 avant application de cette méthode = "sage attendu".

**L'accumulation des 5 ingrédients fait la différence, pas un seul truc.** Polisher avec smooth scroll/parallax/sticky sur des sections 2/5 ne sauvera rien — ces effets sont SECONDAIRES.

---

## Les 5 ingrédients OBLIGATOIRES par section

Chaque section doit cumuler les 5. Si une section a moins de 5, elle est "sage" (correcte mais oubliable) — à refondre.

### Ingrédient 1 — Signature visuelle distinctive UNIQUE

Un dispositif visuel qui n'existe nulle part ailleurs sur la page.

**Exemples valides** :
- SVG dessiné narratif (cables crane Method sur le 03)
- Photomontage signature (Premiers projets featured)
- Dispositif typographique cinétique
- Carte SVG, chemin animé, compteur typo, etc.

**Anti-pattern (interdit)** :
- Trait copper accent générique (présent partout)
- Numéros monumentaux dupliqués entre sections
- Cartouche paper/dark sur photo répété
- Backdrop-blur générique

### Ingrédient 2 — Narrativité (pas description)

La section doit RACONTER quelque chose, pas DÉCRIRE.

**Test** : si la copy commence par "Voici nos…" / "Nos…" / "Découvrez nos…" → c'est de la description = à reformuler en narration.

**Anti-pattern** :
- "Voici nos partenaires"
- "Nos habitats"
- "Découvrez notre méthode"

**Oui** :
- "D'abord X, ensuite Y, et c'est pourquoi Z"
- "Method : Du terrain à la pose, en quelques mois."
- Chronologie / récit / argumentation / témoignage

### Ingrédient 3 — Reveal one-shot puissant

IntersectionObserver one-shot + transition forte + contraste actif/passif marqué.

**Spec technique** :
- threshold 0.3-0.4 + rootMargin négatif (-8% bottom typique)
- transition 1200-1600ms cubic-bezier(.16,1,.3,1)
- opacity 0→1 + translateY 24-48px OU scale 0.96→1
- Stagger 220-280ms entre sous-éléments
- `prefers-reduced-motion` respecté (transform:none, transition:none)

**Anti-pattern** :
- `.reveal` basic avec `reveal-delay-X` (pattern legacy)
- Opacity-only sans translation (trop subtile)
- Animation hover-only (le visiteur ne hover pas forcément)

### Ingrédient 4 — Structure visuelle forte

Au choix mais **présente** :
- Typographie monumentale (clamp 4-8rem)
- Asymétrie marquée (jamais 50/50 symétrique centré)
- Dispositif visuel structurant (numéros, SVG, photo dominante)

**Anti-pattern** :
- H2 standard + texte + lien (pattern wireframe)
- Layout centré everything (banni si LAYOUT_VARIANCE > 4)
- Grid 3 cards égales horizontalement (banni)
- 2 cards égales 50/50 (anti-pattern e-commerce)

### Ingrédient 5 — Closure narrative

Phrase, citation, dispositif qui FERME la section sur un moment fort.

**Exemples valides** :
- "5 à 6 mois entre la commande et la remise des clés." (Method)
- Quote signée d'un partenaire en charnière
- Dispositif visuel qui se complète au reveal (trait copper qui s'étend, compteur qui atteint sa valeur)
- Phrase signature avec em italic copper

**Anti-pattern** :
- La section se termine sur un lien CTA générique ("Voir plus →")
- La section se termine sur un texte descriptif neutre
- Aucune phrase mémorable, juste un padding qui finit

---

## Les 5 critères INTER-sections (cohérence page)

### Critère 1 — Récit global en 1 phrase

Avant de coder, on doit pouvoir résumer la page en UNE phrase.

**Exemple home HKH** : "HKH livre des habitats premium clé-en-main aux investisseurs Girardin via un réseau de partenaires éprouvés."

**Règle** : si on n'arrive pas à formuler cette phrase, le récit n'existe pas → arrêter et redéfinir, ne pas commencer à coder.

### Critère 2 — Rythme paper/dark narratif

Les bascules paper/dark doivent SERVIR le récit, pas être esthétiques.

- **DARK** = moments d'immersion, intensité, preuve forte, closing
- **PAPER** = moments de respiration, pédagogie, accueil, transition

**Règles** :
- Pas plus de 2 sections paper consécutives
- Pas plus de 3 sections dark consécutives
- Chaque bascule paper↔dark doit avoir une raison narrative (pas "pour la variance esthétique")

### Critère 3 — Signatures visuelles uniques (jamais répétées)

Chaque section a SA signature exclusive. **Si un dispositif est utilisé deux fois sur la page, c'est de la répétition mécanique** = perte d'effet.

**Test** : pour chaque dispositif visuel (numéros monumentaux, cartouche, SVG signature, layout particulier), il doit apparaître **UNE SEULE FOIS** sur la page.

### Critère 4 — Densité émotionnelle homogène

Toutes les sections doivent avoir un POIDS émotionnel comparable.

**Test** : si une section écrase visuellement les autres (effet "wow" suivi de "ah ok"), c'est que les autres ne sont pas au niveau. **Niveler vers le haut, jamais vers le bas.**

### Critère 5 — Transitions inter-sections soignées

- Padding cohérent entre sections (pas de "grosse bande blanche" non intentionnelle)
- Charnière narrative entre sections (la section N+1 doit reprendre implicitement quelque chose de la section N)
- Pas de "rupture sèche" sans logique

---

## Workflow opérationnel (4 phases — JAMAIS sauter)

### Phase 0 — Récit global (AVANT tout code, durée 30 min - 2h)

1. Écrire le récit de la page en 1-3 phrases
2. Lister les sections nécessaires pour porter ce récit
3. Définir l'ordre narratif (qu'est-ce qui doit être lu avant quoi ?)
4. Définir le rythme paper/dark qui SERT ce récit
5. Identifier la section "moment fort" (l'équivalent Method)
6. **Valider avec Benjamin AVANT de passer à Phase 1**

**Output** : un mini-document narratif de 5-10 lignes décrivant le récit, l'ordre, le rythme, et le moment fort.

### Phase 1 — Audit checklist 5/5 sections existantes (30 min)

Pour chaque section existante, scorer la checklist 5 ingrédients (voir ci-dessous).

**Output** : tableau des sections avec score X/5, classification "5/5 OK · 3-4/5 upgrade · 0-2/5 refonte".

### Phase 2 — Production section par section (1-2h par section)

Pour chaque section sous 5/5, appliquer la méthode `workflow_chantier_visuel.md` (cadrage → taste-skill 3 options → choix Benjamin → brief court → plan + risque slop → code → test) en intégrant les 5 ingrédients.

**Règle stricte** : ne pas passer à la section suivante tant que la section courante n'est pas validée 5/5 par Benjamin.

### Phase 3 — Audit cohérence inter-sections (1h)

Une fois toutes les sections en 5/5, vérifier les 5 critères inter-sections :
1. Récit global lisible ?
2. Rythme paper/dark narratif ?
3. Signatures uniques (pas de répétition) ?
4. Densité émotionnelle homogène ?
5. Transitions soignées ?

**Output** : checklist 5 critères inter-sections validés. Si critère non-validé → retour Phase 2 sur la section incriminée.

### Phase 4 — Polish technique (1-2h, EN DERNIER)

**Règle absolue** : Phase 4 ne commence JAMAIS si Phase 0-3 ne sont pas validées. Le polish technique ne sauve pas une page sage.

**5 dispositifs obligatoires Phase 4** (issus de la home HKH 2026-05-14) :

**A. Reveals amplifiés** — translateY 36px (pas 16px) + transition 1400ms cubic-bezier(.16,1,.3,1) (pas 1100ms) sur toutes les sections refondues. Le 16px/1100ms = sage AI ; le 36px/1400ms = cinétique perceptible. Respect `prefers-reduced-motion`.

**B. Parallax universel sections dark BG** — wrapper enlarged top/bottom -12 à -14% sur `.method__bg`, `.newsletter__bg` ou équivalents. JS IIFE qui calcule ratio (centre section vs centre viewport), applique translate3d ±70-80px. Ken Burns CSS reste sur l'img (sans conflit). Throttled via requestAnimationFrame.

**C. Sticky scroll magazine spread** — sur la section "preuves sociales" (ex. Premiers projets) : 1er article sticky `top:8vh; z-index:0`, articles/quotes/archives suivants `position:relative; z-index:1+; background:var(--dark)` pour couvrir au passage. Désactiver sticky en mobile (`@media max-width:900px → position:relative`).

**D. Hover trail underline copper** — sur CTAs premium (`.duo__voie-cta`, `.terrain__closure-link`, etc.) : `::before` base `width:100%; opacity:.3` (visible au repos) + `::after` trail `transform:scaleX(0)` `transform-origin:left center` → `scaleX(1)` au hover, transition 600ms cubic-bezier(.16,1,.3,1). Aligner `transform-origin:right` quand le bloc est aligné à droite.

**E. Smooth scroll JS lerp** — remplacer `html{scroll-behavior:smooth}` (CSS natif rigide) par un Lenis-light vanilla : lerp 0.085-0.095, intercept wheel/keyboard/anchor clicks, `requestAnimationFrame` loop, `window.scrollTo(0, current)`. Skip si `prefers-reduced-motion` ou `pointer:coarse` (mobile = scroll natif). Force `scrollBehavior='auto'` pendant activation pour ne pas doubler le smoothing.

**Anti-patterns Phase 4 à BANNIR** :
- Polish > 5 dispositifs distincts (sur-engineering)
- Parallax > 100px (sensation lag)
- Sticky > 1 section (cumul = chaos vertical)
- Hover scale > 1.03 (AI tell générique)
- Lerp < 0.05 ou > 0.15 (trop lent ou trop sec)
- Smooth scroll JS sur mobile/touch (casse pull-to-refresh, sensation native)

**Validation Phase 4 livrée** : Benjamin scroll la page et VOIT la différence vs Phase 3. Si Benjamin dit "je vois pas trop le changement", c'est qu'on est resté en sobre — relancer A→E intégral.

---

## Checklist d'auto-évaluation par section (OBLIGATOIRE)

À utiliser à chaque section produite, en début (audit existant) et en fin (validation production).

```
Section : [nom]
Date : [date]

[ ] Ingrédient 1 — Signature visuelle distinctive UNIQUE (1pt)
[ ] Ingrédient 2 — Narrativité (pas description) (1pt)
[ ] Ingrédient 3 — Reveal one-shot puissant avec contraste actif/passif (1pt)
[ ] Ingrédient 4 — Structure visuelle forte (typo OU asymétrie OU dispositif) (1pt)
[ ] Ingrédient 5 — Closure narrative (phrase, citation, dispositif fermant) (1pt)

Score : __/5
```

**Décision selon score** :
- **5/5** = niveau Method ✓ — section validée, prête pour Phase 3 cohérence
- **3-4/5** = correct mais perfectible — identifier l'ingrédient manquant, upgrader
- **0-2/5** = sage attendu — refondre intégralement, ne pas tenter de "patcher"

---

## Anti-patterns à BANNIR systématiquement

1. **"AI Aman fallback"** : cartouche dark/paper sur photo + trait copper top-left + backdrop-blur → devient slop si répété
2. **Numéros monumentaux dupliqués** entre sections (ex. Method + Cercle)
3. **2 sections paper consécutives** sans signature distinctive
4. **Reveal basic** `.reveal` `.reveal-delay-X` (pattern legacy à éliminer)
5. **Sections "déclaratives"** ("Voici nos X", "Nos Y") sans narrativité
6. **CTA "Étude personnalisée" / "Découvrir" / "En savoir plus"** bouton générique
7. **Cards cream avec containers** (pattern e-commerce/SaaS)
8. **Layout symétrique 50/50 strict centré** (anti-LAYOUT_VARIANCE > 4)
9. **Trait copper accent décoratif** sans valeur narrative (juste pour "faire premium")
10. **Grid 3 cards égales horizontalement** (banni absolument)
11. **Hover scale > 1.03** sur cards (pattern hover lift slop)
12. **Backdrop-blur générique** (glassmorphism AI tell)
13. **Box-shadow soft** sans tint de fond (AI tell)
14. **Bouton "En savoir plus" / "Découvrir"** sans complément précis (filler word)
15. **Photo en fond avec gradient overlay** sans signature visuelle ajoutée

---

## Articulation avec workflow_chantier_visuel.md

- **`methode_niveau_method.md` (ce document)** = méthode au niveau **PAGE entière** (4 phases, récit global, cohérence inter-sections)
- **`workflow_chantier_visuel.md`** = méthode au niveau **SECTION individuelle** (8 étapes : cadrage → taste-skill → choix → brief → plan → validation → livraison → itération)

**Articulation** : pendant la Phase 2 (production section par section) de `methode_niveau_method.md`, on applique systématiquement les 8 étapes de `workflow_chantier_visuel.md` à chaque section.

---

## Quand appliquer cette méthode

**Toujours**, pour :
- Création d'une nouvelle page (home, fiche résidence, page éditoriale, page commerciale)
- Refonte d'une page existante (audit → réorganisation → upgrade sections)
- Audit qualitatif d'une page existante (validation 5/5 ou identification dette)

**Cette méthode est obligatoire avant tout polish technique** (smooth scroll, parallax, sticky scroll, micro-interactions). Le polish vient TOUJOURS en dernier (Phase 4).

---

## Mémoire des audits par page

Chaque audit de page doit être consigné dans `memory/` sous le format :
`memory/audit_[nom-page].md`

Contenu attendu :
- Date audit
- Récit global formulé
- Score 5/5 par section (avant et après refonte)
- Décisions clés
- Sections refondues vs conservées
