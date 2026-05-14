# Workflow chantier visuel/UX — méthode HKH (NIVEAU SECTION)

À appliquer systématiquement sur chaque refonte de section ou ajout d'interactivité.

> **Articulation** : ce document décrit la méthode au niveau **SECTION individuelle** (8 étapes).
> Pour la méthode au niveau **PAGE entière** (récit global, cohérence inter-sections), voir `methode_niveau_method.md`.
> Pendant la Phase 2 de `methode_niveau_method.md` (production section par section), on applique systématiquement ces 8 étapes.

## Étapes

1. **Cadrage besoin** : Benjamin décrit l'effet voulu en 1-2 phrases. Claude pose max 3 questions ciblées si ambigu.

2. **Génération options taste-skill** : brief court pour design-taste-frontend, 3 options distinctes max, verdict + justification par option.

3. **Choix option** : Benjamin tranche (ou demande hybride/ajustement). Claude ne tranche jamais sur une question de direction visuelle.

4. **Brief technique court** : Claude rédige brief < 30 lignes (objectif, contraintes critiques, valeurs précises, tâches). Pas de justification, pas de pédagogie.

5. **Plan d'exécution** : Claude Code propose plan en 5-8 lignes + risque slop principal. Attend validation.

6. **Validation plan** : Benjamin valide / ajuste / refait.

7. **Livraison + test** : push avec cache-buster, Benjamin teste visuellement.

8. **Validation finale ou itération** : si OK chantier suivant, sinon brief ciblé sur le problème.

9. **Validation perception visuelle (Pass 4.7+)** : après livraison technique, vérifier que CHAQUE dispositif est *senti*, pas juste présent. Score 5/5 technique ≠ 5/5 ressenti.
   - Lisibilité minimale : font ≥ 13px sur fond image dark
   - Opacity minimale copper sur dark : ≥ .55
   - Delta perceptuel d'animation : ≥ 15% (ex. opacity scroll 1→.75 perceptible, 1→.88 trop subtil)
   - Test : ouvrir la page, scroller normalement, identifier en 3 secondes chaque dispositif sans chercher
   - Si un dispositif n'est pas senti → amplifier (taille, opacity, contraste, delta)

## Règles fixes

- Toujours passer par taste-skill sur décisions visuelles importantes
- Jamais brief Claude Code > 40 lignes (sinon découper en sous-chantiers)
- Toujours découper un gros chantier en sous-étapes validables séparément
- Toujours attendre GO Benjamin entre 2 étapes
- Toujours utiliser Claude in Chrome MCP pour diagnostic visuel (jamais demander DevTools à Benjamin)
