# Home Kit Home — Site web

## Lancer le site en local

Ce site utilise `fetch()` pour charger les partials nav et footer.  
Il doit être servi depuis un serveur HTTP — ne pas ouvrir directement en `file://`.

```bash
# Option 1 — extension VS Code
# Utiliser Live Server (clic droit sur index.html → Open with Live Server)

# Option 2 — Node.js
npx serve .

# Option 3 — Python
python3 -m http.server 5500
```

Le site sera accessible sur `http://localhost:5500`.

## Structure

```
/Site/
├── index.html              Page d'accueil
├── modeles.html            Gamme complète
├── residence-*.html        Pages individuelles par modèle
├── partenaires.html        Agences partenaires
├── projets.html            Projets réalisés
├── blog.html               Actualités
├── faq.html                Questions fréquentes
├── histoire.html           Notre histoire
├── visite-virtuelle.html   Visite virtuelle
├── contact.html            Contact
├── style.css               Feuille de styles globale
├── partials/               Composants partagés (nav, footer)
└── images/                 Visuels
```
