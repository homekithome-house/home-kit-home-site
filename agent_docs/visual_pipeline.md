# Pipeline visuel — état actuel

## Script Ruby SketchUp — maintenu hors repo

`hkh_export_scenes.rb` est **maintenu hors repo, dans le dossier SketchUp local de Benjamin** (Plugins SketchUp sur sa machine). Il n'est pas versionné ici et ne le sera pas — le site est un livrable distinct du pipeline 3D. Si une coordination est nécessaire (chemin d'export, nommage des scènes, format de sortie consommé par fal.ai), demander à Benjamin.

## Pipeline cible (vision Benjamin, ton CLAUDE.md global)

Workflow visé : **SketchUp → fal.ai (Flux Kontext) → cohérence verrouillée par seed → publication automatique Instagram / TikTok**.

Statut : "en cours d'intégration" selon ton CLAUDE.md. L'objectif est de passer de "1 carrousel = 1 journée de travail" à une publication quotidienne automatisée.

Problème principal non résolu (1 mois de R&D) : **cohérence spatiale et matérielle** entre plusieurs images d'un même habitat. Gemini conversationnel atteint 7/9 cohérence dans une grille mais n'est pas automatisable tel quel. Le pipeline fal.ai + seed verrouillé vise à répliquer ça programmatiquement.

## Outils en place

| Outil | Usage actuel |
|---|---|
| **SketchUp** | Modélisation 3D du terrain et implantation des habitats |
| **fal.ai (Flux Kontext)** | Génération d'images IA, cible du pipeline automatisé |
| **Gemini** | Génération conversationnelle multi-shots (validée pour cohérence partielle, non automatisable) |
| **Nano Banana MCP** | Publication automatisée réseaux sociaux (en cours d'intégration selon CLAUDE.md global) |
| **Géoportail WFS/WMS** | Données cadastrales |
| **InDesign** | Production catalogues et présentations commerciales |

## Pipeline d'images du site (observé, documenté)

Indépendant de la génération IA — il s'agit du post-processing pour le site.

### Script : `Convertir images/convert-images.js`

- Dépendance : `sharp` (Node.js)
- Entrée : `/images/` (PNG, JPG, JPEG, WebP)
- Sortie : `/dist/images/` (miroir de l'arborescence, AVIF q65 + WebP q80)
- Paramètre : `MAX_WIDTH = 1200`
- Mode incrémental : ne convertit que les fichiers dont la source est plus récente que la sortie

### Options CLI
```
rtk node "Convertir images/convert-images.js"                         # incrémental sur tout /images
rtk node "Convertir images/convert-images.js" --force                  # reconvertit tout
rtk node "Convertir images/convert-images.js" "blog/Saint François"   # cible un sous-chemin (relatif à /images)
rtk node "Convertir images/convert-images.js" --force "blog/X"        # reconvertit la cible
```

### Utilitaire one-shot : `scripts/convert-img-to-picture.mjs`

Wrappe les `<img>` legacy en `<picture>` AVIF/WebP/fallback en analysant les sources et le `/dist/images/` correspondant. À utiliser pour rattraper du HTML écrit avant la mise en place du pipeline.

## Anomalie connue

Un dossier de sources historiques porte un nom encodé différemment (`Photos%20originales` vs `Photos_drone`). Le pipeline gère l'encodage URI mais l'incohérence de nommage doit être nettoyée séparément. Voir `memory/project_image_pipeline.md`.

## Sortie tierce non touchée par le build

`fichiers/graphify-out/` — sortie d'un outil tiers (graphify). Pas dans le périmètre du build site, ne pas inclure dans les conversions.
