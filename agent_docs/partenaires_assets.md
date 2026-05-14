# Assets partenaires — dette photos + brief swap A → B

## Contexte

Section **Le Cercle** (home, `.founders` / namespace `.cercle-*`) implémentée actuellement en **Option A** (taste-skill) : nom monumental serif italique + filet copper + logo en accent + facts dl. La signature visuelle repose sur la typographie.

**Option B** (cible finale) : remplacer le bloc visuel par une vraie photo emblématique par partenaire. La typographie monumentale cède la place à la photo, le reste de la fiche (tag, desc, facts, link) reste intact.

## Photos manquantes à fournir

### Jay Family Properties (Agence immobilière · Antilles)

**Ce qu'on cherche** :
- Photo qui dit en 1 seconde "agence enracinée aux Antilles, pas n'importe où en France"
- Contexte antillais reconnaissable (palmiers, mer turquoise, lumière tropicale, terrain volcanique, bardage caraïbe)

**Options acceptables** (par ordre de préférence) :
1. **Équipe sur terrain** — dirigeant + collaborateur en visite/présentation sur un site, vue antillaise visible en fond
2. **Vue d'un projet emblématique** réalisé par l'agence avec mer/palmiers visibles
3. **Dirigeant en portrait** dans un cadre antillais reconnaissable (devant un projet, sur un terrain Saint-François, sur vue Caraïbe)
4. **Intérieur d'agence à fort cachet** — uniquement si grande baie vitrée sur palmiers/mer + maquette HKH ou plans sur table (intérieur qui montre le contexte)

**Ce qu'on évite** :
- Façade d'agence générique (ressemble à n'importe quelle agence Century 21)
- Intérieur sans contexte (bureau blanc + canapé = slop "About Us")
- Photo studio sans contexte territorial

**Source du site Jay Family (audité, à ne PAS utiliser)** : leur site `jayfamilyproperties.com` n'a pas de matière exploitable. Portraits userupload "vacances Miami" personnels, photos biens inaccessibles hors contexte CDN. Demander une photo dédiée.

### Charlemagne Investissement (Conseil en investissement)

**Ce qu'on cherche** :
- Photo qui implique le contexte outre-mer ou la dimension humaine du conseil financier
- Évite le pattern "salle de réunion / costume / documents" = slop financial services

**Options acceptables** (par ordre de préférence) :
1. **Boris Milnes en portrait** dans un cadre professionnel mais avec personnalité (pas studio fond gris générique)
2. **Boris Milnes en situation conseil** — face à face avec un client, signature de contrat dans contexte tropical
3. **Bureau conseil avec cachet** — éléments territoriaux visibles, documents Girardin, contexte signature
4. **Photo concept** — vue d'une île HKH-territory + détail business (mains, contrat, stylo)

## Brief de swap A → B (instructions techniques pour l'agent qui fera la bascule)

Le code Option A est structuré pour permettre un swap **sans toucher au reste**. Procédure :

1. **Déposer les photos** dans `/images/partenaires/` (sources lourdes, gitignored) :
   - `jay-family-properties-photo.png` (ou `.jpg` — pas le logo, la photo dédiée)
   - `charlemagne-investissement-photo.png` (ou `.jpg`)

2. **Lancer la conversion** :
   ```
   rtk node "Convertir images/convert-images.js"
   ```
   Génère AVIF + WebP dans `/dist/images/partenaires/`.

3. **Remplacer dans `index.html`** les blocs `<div class="cercle-founder__nameplate">...</div>` par :
   ```html
   <figure class="cercle-founder__photo">
     <picture>
       <source srcset="dist/images/partenaires/jay-family-properties-photo.avif" type="image/avif">
       <source srcset="dist/images/partenaires/jay-family-properties-photo.webp" type="image/webp">
       <img src="dist/images/partenaires/jay-family-properties-photo.avif" alt="..." loading="lazy" decoding="async"/>
     </picture>
     <figcaption class="cercle-founder__photo-caption">...</figcaption>
   </figure>
   ```
   Le wrapper `.cercle-founder__visual` reste, c'est le slot qui change.

4. **Ajouter CSS** pour `.cercle-founder__photo` (équivalent fp-featured pattern : aspect-ratio, object-fit cover, éventuellement Ken Burns au reveal).

5. **Bumper cache-buster** style.css → `v=cercle-B`.

6. **Conserver intact** : `.cercle-founder__text` (tag, desc, dl facts, link), reveal scope JS, alternance nth-child(2n).

## Statut

| Partenaire | Logo | Photo | Statut UI |
|---|---|---|---|
| Jay Family Properties | ✓ `dist/images/partenaires/jay-family-properties.{avif,webp}` (utilisé en accent A) | ✗ à fournir | Option A |
| Charlemagne Investissement | ✓ `dist/images/partenaires/charlemagne-investissement.{avif,webp}` (utilisé en accent A) | ✗ à fournir | Option A |

## Exclusion

Norman (Antilles-Guyane, associé HKH) est **interne** au périmètre HKH — pas un partenaire externe. Il n'apparaît pas dans Le Cercle.
