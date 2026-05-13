# Règles éditoriales et de marque HKH

Source : règles validées par Benjamin sur l'ensemble du projet. Ces règles s'appliquent à tout texte écrit dans les pages, partials, métadonnées, alt, taglines, contenus i18n.

## Règle absolue : le site fait foi

**En cas de divergence entre le site et le catalogue PDF 2026 (ou tout autre document marketing daté), le site fait foi.** Le catalogue est un livrable figé à un instant T ; le site est la source vivante de la marque. Toute divergence catalogue/site doit être notée dans `agent_docs/product_catalog.md` (section « Divergences identifiées ») pour correction lors de la prochaine édition du catalogue. **Ne jamais aligner le site sur le catalogue** sans validation explicite de Benjamin.

## Vocabulaire

### ❌ Interdits absolus
- **modulaire** · **kit** · **container** · **préfabriqué** — registre bas de gamme, anti-marque
- **"Famille ESSENCE"** / **"Famille HORIZON"** / **"Famille SIGNATURE"** — utiliser uniquement le nom : ESSENCE, HORIZON, SIGNATURE
- **"premium"** comme adjectif générique — filler d'agence. Préférer concret : architectural · complet · soigné · intégré
- **"résidence"** seul comme synonyme générique de logement — remplacer par "habitat"
- **"Bureau de Sainte-Anne"** / **"Showroom"** / **"Visitez-nous"** — Sainte-Anne est le siège, pas un lieu d'accueil. Benjamin opère depuis Málaga. Voir `memory/project_hkh_implantation.md`.

### ✅ Vocabulaire de marque à privilégier
- **habitat** · **résidence architecturale** · **prêt à vivre** · **clé en main**
- Pour le caractère du produit : **architectural** · **complet** · **soigné** · **intégré** · **harmonieux**

### Cas particulier "résidence"
- Dans un nom propre ou un titre éditorial : "Notre résidence phare", "La résidence d'exception" → OK
- En générique sans qualificatif : "une résidence" → remplacer par "un habitat"

## Typographie et ponctuation

### Em-dash (—)
- **✅ Autorisé et encouragé** comme respiration de phrase dans les leads, sub-paragraphes, descriptions narratives. Remplace une virgule là où la pause est plus marquée, ou ouvre une appositive.
  Exemple : *"Le studio architectural de 20 m² — livré en un seul bloc, posé par grue, prêt à vivre."*
- **❌ Interdit comme séparateur visuel de liste ou d'items courts** (ex. "20 m² — 5 × 4 m — CE")

### Middot (·)
- Utiliser pour les listes inline d'items courts : "20 m² · 5 × 4 m · CE"
- Utiliser comme séparateur dans les folio typographiques : "LE JOURNAL · Nº 04 · ARCHITECTURE · AVRIL 2026"

### Virgules et middot dans les captions photo
- Ville séparée de la région par virgule : "Petit-Bourg, Guadeloupe"
- Info supplémentaire après middot : "Petit-Bourg, Guadeloupe · Terrain de 778 m² à l'étude"

## Listes et structure

### ❌ Interdits dans les textes commerciaux
- Listes à puces et listes numérotées
- Headers en gras répétés
- Tirets em-dash comme séparateurs d'items courts

### ✅ Préférer
- Phrases continues, structure narrative
- Middot inline pour les caractéristiques rapides
- Hiérarchie typographique (taille + serif/sans) plutôt que gras

## Tons par type de page

### Registre éditorial
Pages d'attraction, positionnement, narratif : `index.html`, `blog.html`, `partenaires.html`, `projets.html`, `histoire.html`, `financer.html`, `investir.html`.

Phrases longues respirantes, em-dash autorisé, pull-quotes serif. Pas de prix affichés en gros, pas de CTAs "Acheter".

### Registre commercial obligatoire
Pages de conversion directe — l'éditorial attire mais **ne doit jamais ensevelir** la bascule commerciale :
- `habitats.html` — specs techniques, prix/fourchette, CTA "Demander un devis"
- `contact.html` — formulaire direct, téléphone, email visible
- `residence-*.html` — specs détaillées, pricing, simulateur Girardin, CTA "Commander"

Détail : `memory/project_editorial_vs_commercial.md` et `memory/feedback_editorial_grammar_not_object.md`.

**Règle Aman** : éditorial dehors, commercial dedans. Au-dessus de la ligne de flottaison, prix et CTA doivent être atteignables en moins d'une seconde sinon rebasculer commercial.

## Anti-patterns visuels (lien direct à l'éditorial)

- **Rectangle blanc opaque avec bordure copper** sur caption photo → "étiquette de musée" / "carte postale Shutterstock". Utiliser un des 3 patterns A / B / B-bis (voir `memory/project_photo_captions.md`).
- **Caption en uppercase letter-spacing serré** → registre "tag/étiquette" et non "magazine éditorial".
- **Boutons outline génériques** → préférer `.editorial__link` (lien texte avec flèche copper).
- **Formulaires boxés** → underline-only + bouton arrow.
- **Placeholder honnête** : rendu manquant = jamais "rendu en production" ou "photo à venir". Fallback silencieux.

## Partenaires nommables / non-nommables

- **Charlemagne Investissement** : nommable sur les pages Financer + Investir (description adaptée selon page).
- **Jay Family Properties** : partenaire phare Saint-François, nommable en éditorial.
- **jpocean** (partenaire fiscal) : ❌ jamais nommé. Utiliser "partenaire fiscal spécialisé".

Voir `memory/project_financer_vs_investir_split.md`.

## Chiffres business

- ❌ Jamais de rendements locatifs / ROI / projections business affichés publiquement
- ✅ Chiffres sourcés publics OK (Girardin 39 %, taux CGI/BOFiP/DGFiP, surfaces, masses, normes CE)

---

## Ton éditorial du catalogue 2026 (référence)

Source : `fichiers/Home Kit Home - Collection 2026.pdf` (18 pages). Le ton du catalogue commercial est la référence à respecter pour toute production écrite — site, social, mails, presse. **À reprendre tel quel, ne pas reformuler en "AI-speak".**

### Caractéristiques du registre catalogue
- Phrases longues, structure narrative, **pas de listes commerciales en plein paragraphe**.
- Vocabulaire élégant et précis : architecture · raffinée · durable · exigence · fiabilité · pérennité · cohérence · constance · suivi · maîtrisé · harmonieux.
- Mention récurrente du **"chaque détail"**, **"chaque projet"**, **"chaque étape"** — registre du soin systématique.
- **Pas de prix dans le catalogue**. Pas de promesse chiffrée. Pas de "à partir de X €" en éditorial — réservé aux fiches produit du site.
- Promesses concrètes uniquement : normes CE, conformité, contrôle qualité à chaque étape, interlocuteur unique.

### Formulations signature à réutiliser
- « habitats clés en main, livrés prêts à vivre »
- « habitat esthétique, prêt à vivre et conforme »
- « une architecture raffinée, livrée clé en main, où chaque détail est pensé pour durer »
- « du premier plan à la remise des clés »
- « la rigueur et la précision au service de chaque projet »
- « un interlocuteur unique, du premier échange à la remise des clés »
- « conçu pour offrir le confort essentiel dans un format élégant »
- « volumes harmonieux, baigné de lumière naturelle »
- « vivre dedans-dehors »
- « ouvert et raffiné » · « compact et fonctionnel » · « élégant et lumineux » · « spacieux et résidentiel »

### Phrases manifeste validées
- **Tagline principale** : « DES HABITATS CLÉS EN MAIN POUR UN MONDE SANS LIMITES »
- **Sous-titre vision** : « L'architecture au service de votre liberté. »
- **Closing** : « HABITATS CLÉS EN MAIN, LIVRÉS PRÊTS À VIVRE. »
- **Manifeste long** (page 4 du catalogue, à utiliser comme pull-quote sur le site uniquement après accord) :
  > « Être bien chez soi, c'est bien plus qu'un confort. C'est la base de chaque projet, le point d'ancrage d'une vie apaisée. C'est là que commence l'équilibre, la liberté et la vraie réussite. »

### Vocabulaire technique du catalogue (à privilégier sur les fiches produit)
- **Structure** : « acier galvanisé à chaud anti-sismique », « isolation thermique multicouche », « ossature acier haute durabilité »
- **Enveloppe** : « revêtement extérieur en aluminium », « enveloppe extérieure protectrice », « baies vitrées panoramiques du sol au plafond, offrant une vue de 180° à 360° »
- **Confort** : « confort thermique optimisé », « isolation thermique et acoustique renforcée », « adaptation climatique »
- **Conformité** : « conformité CE garantie », « normes européennes », « contrôle qualité à chaque étape »
- **Approche** : « approche intégrale — de la conception à la livraison »

### 4 engagements (à reprendre intacts dans toute communication)
1. **QUALITÉ CERTIFIÉE** — Conception et fabrication selon les normes européennes, avec contrôle qualité à chaque étape.
2. **ADAPTATION CLIMATIQUE** — Confort thermique optimisé et résistance éprouvée pour les environnements tropicaux et insulaires.
3. **CLÉ EN MAIN** — Livraison complète, installation simplifiée, conformité CE garantie.
4. **ACCOMPAGNEMENT SUR MESURE** — Un interlocuteur unique, du premier échange à la remise des clés.

### 3 ambiances intérieures (vocabulaire de personnalisation)
- **Contemporain clair**
- **Atmosphère naturelle**
- **Bois profond**

Détail complet (textes longs, configuration produit, options incluses) : `agent_docs/product_catalog.md`.
