# Catalogue produit HKH

Sources : `data/models.json` (specs structurées) + `data/prices.json` (placeholder) + `fichiers/Home Kit Home - Collection 2026.pdf` (catalogue commercial 18 pages, source matière pour la ligne éditoriale et la configuration produit).

## Règle absolue : le site fait foi

**En cas de divergence entre le site et le catalogue PDF 2026, le site fait foi.** Le catalogue est un document marketing daté ; le site est la source vivante. Toute divergence identifiée doit être notée dans ce document pour correction lors de la prochaine édition du catalogue.

### Divergences identifiées au 2026-05-13 (catalogue à corriger lors de la prochaine édition)

1. **Finition Zénith vs « Finition Essence »** — le catalogue 2026 nomme « Finition Essence » l'univers bois clair (claire-voie bois clair + toit 2 pans anthracite, dispo Métropole & Guyane). Le site nomme cet univers **Zénith** (cf. `.fin-btn[data-fin="zenith"]`). **Le site fait foi : la finition s'appelle Zénith.** Catalogue à corriger.
2. **Tagline famille ESSENCE** — le catalogue 2026 dit « Le Compact Élégant ». Le site dit **« Le compact d'excellence »** (validé : « excellence » porte mieux le positionnement premium HKH que « élégant », plus consensuel et moins distinctif). **Le site fait foi.** Catalogue à corriger.
3. **SIGNATURE vs SIGNATURE DUO** — le catalogue 2026 présente SIGNATURE comme un seul modèle avec deux plans (1 ch / 2 ch). Le site sépare en deux fiches distinctes : `residence-signature.html` et `residence-signature-duo.html`. **Le site fait foi : on conserve les deux fiches.** Aucune correction à apporter au catalogue sur ce point — la séparation est une décision de site (deux URLs SEO, deux pages indexables, deux CTAs spécifiques) qui n'oblige pas à séparer en deux modèles dans le catalogue papier.
4. **ESSENCE vs ESSENCE +** — équivalent du point 3. Le catalogue présente ESSENCE comme un modèle unique avec deux plans (avec/sans cuisine). Le site les distingue en deux fiches. **Le site fait foi : deux fiches conservées.**

---

## Tagline et mission (catalogue 2026)

**Tagline principale** : DES HABITATS CLÉS EN MAIN POUR UN MONDE SANS LIMITES

**Sous-titre** : Collection HKH – Conception, design et savoir-faire pour des habitats durables. L'architecture au service de votre liberté.

**Closing** : HABITATS CLÉS EN MAIN, LIVRÉS PRÊTS À VIVRE.

**Mission (page À propos)** :
> HKH – Home Kit Home est une société spécialisée dans la conception et la fourniture d'habitats haut de gamme clés en main, pensés pour les climats tropicaux et les besoins d'un habitat contemporain, durable et confortable.
>
> Nos réalisations allient design, technicité et exigence, avec une attention particulière portée aux normes européennes et aux attentes spécifiques des marchés insulaires et ultramarins.
>
> Notre mission : rendre accessible un habitat esthétique, prêt à vivre et conforme, sans compromis sur la qualité, la durabilité ni la facilité d'installation.
>
> Chaque projet est accompagné avec soin, depuis le choix du modèle jusqu'à la livraison et la conformité CE, pour garantir une expérience fluide et maîtrisée à chaque étape.

**Manifeste (page 4 du catalogue)** :
> « Être bien chez soi, c'est bien plus qu'un confort. C'est la base de chaque projet, le point d'ancrage d'une vie apaisée. C'est là que commence l'équilibre, la liberté et la vraie réussite. »

**Vision (page Collection)** :
> HKH incarne une nouvelle vision de l'habitat : une architecture raffinée, livrée clé en main, où chaque détail est pensé pour durer.

---

## 6 modèles, 3 familles

### Famille ESSENCE — *Le compact d'excellence* (version site, fait foi)

**Sous-titre catalogue** : COMPACT & FONCTIONNEL
**Tagline catalogue 2026 à corriger** : « Le Compact Élégant » → remplacer par « Le compact d'excellence »

**Description catalogue** :
> Conçu pour offrir le confort essentiel dans un format élégant, le modèle HKH 20 s'adapte à tous les environnements et à toutes les envies.

**Cible** : projets touristiques, éco-lodges, suites indépendantes.

#### ESSENCE — 20 m²
- **Tagline FR (site)** : « Le compact d'excellence · Sans cuisine »
- **Dimensions** : 5L × 4l × 3,3h m
- **Surface totale** : 20 m²
- **Capacité** : 2 personnes
- **Poids total** : 4,5 tonnes
- **URL** : `residence-essence.html` (master du template fiche résidence)

#### ESSENCE + — 20 m²
- **Tagline FR (site)** : « Le compact d'excellence · Avec kitchenette intégrée »
- **Variante** : kitchenette intégrée (plaque vitrocéramique, évier, rangements)
- **Dimensions** : 5L × 4l × 3,3h m
- **URL** : `residence-essence-plus.html`

> **Décision validée** : le site distingue ESSENCE et ESSENCE + en deux fiches séparées (deux URLs SEO, deux pages indexables). Le catalogue 2026 les présentait comme un seul modèle avec deux plans — c'est le format catalogue, pas le format site. Le site fait foi.

### Famille HORIZON — *L'Essentiel Contemporain*

**Sous-titre catalogue** : ÉLÉGANT & LUMINEUX

**Description catalogue** :
> Un modèle aux volumes harmonieux, baigné de lumière naturelle, conçu pour conjuguer confort, style et modernité.

#### HORIZON — 36 m²
- **Tagline FR (site)** : « L'essentiel contemporain · Entièrement équipé »
- **Dimensions** : 9L × 4l × 2,9h à 3,3h m
- **Surface totale** : 36 m²
- **Capacité** : 2 personnes
- **Poids total** : 8 tonnes
- **URL** : `residence-horizon.html`

#### HORIZON T — 46 m² — *L'Ouverture Nature*

**Sous-titre catalogue** : OUVERT & RAFFINÉ

**Description catalogue** :
> Un modèle pensé pour vivre dedans-dehors, alliant élégance, confort et authenticité dans un format idéal pour les sites naturels ou hôteliers.

- **Tagline FR (site)** : « L'ouverture sur la nature · Avec terrasse intégrée »
- **Dimensions** : 11,5L × 4l × 2,9h à 3,3h m + terrasse
- **Surface totale** : 46 m² (terrasse comprise)
- **Capacité** : 2 personnes
- **Poids total** : 10,5 tonnes
- **URL** : `residence-horizon-t.html`

### Famille SIGNATURE — *L'Habitat Signature*

**Sous-titre catalogue** : SPACIEUX & RÉSIDENTIEL

**Description catalogue** :
> Un habitat raffiné et évolutif, conçu pour conjuguer confort, élégance et praticité dans un format familial ou hôtelier.

> **Décision validée** : le site sépare SIGNATURE et SIGNATURE DUO en deux fiches distinctes (deux URLs SEO, deux pages indexables, deux CTAs spécifiques). Le catalogue 2026 les présentait comme un seul modèle avec deux plans d'aménagement — c'est le format catalogue, pas le format site. Le site fait foi.

#### SIGNATURE — 46 m² — *1 chambre*
- **Tagline FR (site)** : « La résidence d'exception · 1 chambre »
- **Dimensions** : 11,5L × 4l × 2,9h à 3,3h m
- **Surface totale** : 46 m²
- **Capacité** : 2 personnes
- **Poids total** : 10,5 tonnes
- **URL** : `residence-signature.html`

#### SIGNATURE DUO — 46 m² — *2 chambres*
- **Tagline FR (site)** : « La résidence familiale ou hôtelière · 2 chambres »
- **Dimensions** : 11,5L × 4l × 2,9h à 3,3h m
- **URL** : `residence-signature-duo.html`

---

## Finitions extérieures & univers esthétiques (catalogue 2026)

**Texte commun (répété pages 7, 9, 11, 13)** :
> Chaque modèle HKH se décline selon plusieurs ambiances architecturales alliant matériaux durables et design contemporain.
>
> Bois naturel, teinte blanche ou combinaison mixte : chaque finition reflète une identité propre, adaptée aux environnements tropicaux comme aux usages résidentiels ou hôteliers.
>
> Choisissez l'univers qui correspond à votre style et à l'intégration souhaitée de votre habitat dans son paysage.

### Système finitions HKH (le site fait foi)

| Finition | Bardage | Toit | Swatch CSS | Indicateur |
|---|---|---|---|---|
| **Zénith** | Aluminium claire-voie bois clair | 2 pans anthracite | `#C8A878` | Triangle |
| **Pinède** | Aluminium claire-voie bois clair | Plat | `#C8A878` | Barre |
| **Pure** | Plaque aluminium blanche | 2 pans blanche | `#EFEDE6` | Triangle |
| **Linéa** | Plaque aluminium blanche | Plat | `#EFEDE6` | Barre |

**Variants Pano** (Pinède Pano / Linéa Pano) : toit plat + vitre panoramique. Disponibles uniquement sur **SIGNATURE** et **SIGNATURE DUO**. Pas d'équivalent Zénith ni Pure (incompatibles avec toit 2 pans).

> **Note catalogue à corriger** : le catalogue 2026 nomme la finition bois clair « Essence » (avec la mention « Disponible : Métropole & Guyane »). C'est une erreur du catalogue — la finition s'appelle **Zénith**. À corriger lors de la prochaine édition.

---

## Configuration produit (catalogue, page 14)

**Texte d'introduction** :
> La série entière est équipée de baies vitrées panoramiques du sol au plafond, offrant une vue de 180° à 360°.
>
> Laissez-vous réveiller par le chant des insectes et des oiseaux, ouvrez les rideaux et admirez la nature. Une expérience unique.

### CONFIGURATION (équipements de base)

1. Système structurel en acier galvanisé à chaud anti-sismique
2. Système de structure à isolation thermique multicouche
3. Revêtement extérieur en aluminium, couleur standard personnalisée
4. Panneaux de plafond en aluminium personnalisés, couleur standard
5. Panneaux décoratifs mur/plafond intérieurs, couleur standard personnalisée
6. Système principal de plomberie et d'électricité

### OPTIONS INCLUSES

1. Système de commande intelligente
2. Système de ventilation d'air frais
3. Plan d'agencement personnalisé
4. Meubles de rangement intérieurs, couleur personnalisable
5. Équipements sanitaires haut de gamme
6. Chauffage, ventilation et climatisation (CVC)
7. Chauffe-eau pour l'ensemble du module
8. Éclairage complet intérieur et extérieur avec ambiance lumineuse
9. Menuiserie en alliage d'aluminium + vitrage polycarbonate
10. Porte d'entrée isolée, coupe-feu, avec contrôle d'accès intelligent

### Détails complémentaires (textes catalogue)

**Éclairage et ambiance** :
> L'espace intérieur est doté d'un éclairage ambiant simulant la lumière naturelle. Des lumières aux températures de couleur variées permettent de s'adapter à différents usages. Associé à la lumière du soleil ou au ciel étoilé visible depuis le puits de lumière panoramique, il crée une ambiance chaleureuse et naturelle.

**Toiture technique** :
> La partie supérieure peut accueillir des systèmes de climatisation, chauffe-eau de salle de bain et dispositifs d'extraction. L'installation est dissimulée avec des accès de maintenance prévus, facilitant les interventions techniques sans nuire à l'esthétique générale.

**Commande intelligente** :
> Panneaux intelligents personnalisés avec double commande pour l'éclairage et les rideaux. Toutes les fonctions sont accessibles d'un simple geste.

**Salles de bain** :
> Tous les modèles disposent de salles de bain haut de gamme avec équipements de marque. Conception avec séparation des zones sèches et humides, aménagement confortable. Une invitation à profiter du confort d'un habitat de qualité.

**Modularité intérieure** :
> Espace ouvert modulable avec ameublement personnalisable. Organisation libre des espaces selon les besoins. Exploration de différentes configurations et évolutivité assurée.

**Balcon** :
> Lors des moments de détente, le balcon est l'endroit idéal pour se relaxer. Proposé dans certaines versions avec ou sans balcon pour répondre à toutes les attentes.

**Personnalisation** :
> L'agencement intérieur est entièrement personnalisable.

---

## Architecture conçue pour durer (catalogue, page 15)

10 piliers techniques (titres + descriptifs catalogue, reproduits tels quels) :

**ACIER GALVANISÉ — Ossature acier haute durabilité**
> Structure conçue pour la stabilité, la longévité et la résistance aux contraintes climatiques, développée avec une ingénierie spécialisée.

**ISOLATION THERMIQUE ET ACOUSTIQUE RENFORCÉE**
> Système d'isolation multicouche à haute performance, pensé pour assurer un confort thermique et acoustique durable, adapté aux usages résidentiels exigeants.

**FINITIONS INTÉRIEURES DE QUALITÉ**
> Matériaux intérieurs choisis pour leur résistance à l'usage, leur facilité d'entretien et leur contribution au confort et à la pérennité des espaces.

**DURABILITÉ DES MATÉRIAUX**
> Sélection rigoureuse de matériaux reconnus pour leur longévité, leur stabilité dans le temps et leur faible sensibilité aux conditions climatiques.

**ENVELOPPE EXTÉRIEURE PROTECTRICE**
> Parois extérieures conçues pour assurer une protection durable contre les agressions extérieures, la corrosion et le vieillissement, tout en garantissant une finition architecturale soignée.

**PROTECTION INCENDIE INTÉGRÉE**
> Dispositifs et matériaux sélectionnés pour renforcer la sécurité incendie de l'ensemble, intégrés dès la conception dans une logique de performance globale.

**CONFORT ET QUALITÉ DE VIE**
> Conception globale pensée pour offrir un environnement intérieur sain, confortable et équilibré, répondant aux attentes d'un habitat durable et haut de gamme.

**PROCESS DE FABRICATION MAÎTRISÉ**
> Fabrication reposant sur un processus structuré, contrôlé à chaque étape, garantissant constance, fiabilité et qualité d'exécution.

**STRUCTURE INTÉRIEURE TECHNIQUE**
> Parois intérieures conçues pour offrir rigidité, stabilité et durabilité, tout en facilitant l'intégration discrète des équipements techniques.

**ARCHITECTURE CONÇUE POUR DURER**
> Une approche globale qui privilégie la robustesse, la cohérence constructive et la valeur à long terme, au service d'un habitat pensé pour traverser le temps.

---

## Personnalisation intérieure & finitions (catalogue, page 16)

> Chaque projet Home Kit Home peut être personnalisé dans ses finitions intérieures.
>
> Sols, revêtements muraux, teintes, mobiliers intégrés et plans de travail sont sélectionnés parmi une gamme de matériaux durables et haut de gamme, afin de créer un espace en parfaite harmonie avec votre style et votre environnement.
>
> Un catalogue de finitions détaillé est disponible sur demande.

### 3 ambiances intérieures
- **Contemporain clair**
- **Atmosphère naturelle**
- **Bois profond**

---

## Engagements HKH (catalogue, page 17)

**Notre approche** :
> Du premier plan à la remise des clés, Home Kit Home incarne une exigence constante de qualité et de précision.
>
> Chez Home Kit Home, chaque réalisation est conçue avec la même exigence de qualité, de durabilité et d'élégance.
>
> Notre engagement se traduit par une approche intégrale — de la conception à la livraison —, fondée sur la fiabilité, le suivi et la satisfaction totale de nos clients.

### 4 engagements

**QUALITÉ CERTIFIÉE**
> Conception et fabrication selon les normes européennes, avec contrôle qualité à chaque étape.

**ADAPTATION CLIMATIQUE**
> Confort thermique optimisé et résistance éprouvée pour les environnements tropicaux et insulaires.

**CLÉ EN MAIN**
> Livraison complète, installation simplifiée, conformité CE garantie.

**ACCOMPAGNEMENT SUR MESURE**
> Un interlocuteur unique, du premier échange à la remise des clés.

---

## Coordonnées catalogue

**Home Kit Home Solutions**
Rue de l'Anse à la Barque
Sainte-Anne 97180 — Guadeloupe
contact@home-kit-home.com · www.home-kit-home.com

- France Métropolitaine : +33 (0)7 82 57 75 28
- Antilles - Guyane : +590 (0)6 91 27 00 91

Société : EURL — RCS Pointe-à-Pitre 994 786 614

---

## Tarification — 5 territoires

Source : `data/prices.json`. 30 cellules (6 modèles × 5 territoires `france`, `guadeloupe`, `martinique`, `saint-martin`, `guyane`).

**Statut au 2026-05-13** : tous les prix sont en placeholder `"à partir de —"`. Les fourchettes réelles seront fournies par Benjamin prochainement.

### Modifier un prix
Ouvrir `data/prices.json`, changer la valeur, recharger la page. Pas de cache busting (fetch `no-cache` côté `prices.js`). Format attendu : `"à partir de XX XXX €"`.

### Câblage d'une nouvelle page
Voir `memory/project_centralized_prices.md`. Résumé : sur le slot prix, ajouter `data-model="<slug>"` + `data-price-{territory}`, charger `prices.js`, écouter `hkh:prices-loaded` dans l'IIFE territory-switch.

---

## Trajectoire produit (vision)

Le catalogue actuel (20 à 46 m²) a vocation à s'étendre par **assemblage de modules** jusqu'à des villas de 300 m². Cette extension n'est pas encore documentée publiquement — ne pas l'évoquer sur le site.

---

## Dette visuelle à corriger

### Rendus extérieurs manquants

**ESSENCE** : aucun rendu extérieur architectural 3/4 en contexte tropical disponible dans `/dist/images/habitats/essence/`. Actuellement remplacé par l'intérieur `unwatermarked_gemini_generated_image_8xoavn8xoavn8xoa` sur la home (section Collections). La description du bloc ESSENCE a été adaptée pour assumer narrativement l'angle intérieur.

À regénérer en priorité depuis SketchUp + Nano Banana Pro avec ce brief :

- Vue 3/4 face d'ESSENCE finition Zénith
- Contexte tropical Caraïbes (palmiers, végétation, sol terrain visible)
- Heure dorée (lumière chaude rasante, ombres longues)
- Format cohérent avec les 2 photos voisines sur la home : `esp0jdesp0jdesp0` (HORIZON Pure tropical) et `aiows5aiows5aiow` (SIGNATURE Pinède tropical)
- Caption-ready : "Projection architecturale"

Une fois le rendu généré, le push dans `/images/habitats/Essence/`, lancer `convert-images.js`, et remplacer le `<picture>` du bloc ESSENCE dans `index.html` par le nouveau path kebab-case dans `dist/images/`.

## Délais HKH (référence officielle)

Version officielle — toute mention de délai sur le site doit utiliser cette référence.

| Étape | Durée |
|---|---|
| Cadrage | 1 à 2 semaines |
| Atelier (fabrication) | 4 à 6 semaines |
| Pose + remise des clés | 1 journée |
| Raccordement | environ 1 semaine (selon prestataires locaux) |
| **Total commande → habitable** | **5 à 6 mois** |

**Règle absolue** :
- Sur la home et toutes pages commerciales : "5 à 6 mois" (synthétique)
- Sur faq.html et pages détaillées : décomposition par étape autorisée
- NE JAMAIS utiliser : "≤ 20 semaines", "20 semaines", "≈ 6 mois", "12 à 20 semaines" — tous remplacés
- Délais de shipping territoire (habitats.html, label "Transport") : sémantique distincte, ne pas confondre avec le total projet
