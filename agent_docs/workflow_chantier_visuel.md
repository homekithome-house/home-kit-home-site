# Workflow chantier visuel/UX — méthode HKH

À appliquer systématiquement sur chaque refonte de section ou ajout d'interactivité.

## Étapes

1. **Cadrage besoin** : Benjamin décrit l'effet voulu en 1-2 phrases. Claude pose max 3 questions ciblées si ambigu.

2. **Génération options taste-skill** : brief court pour design-taste-frontend, 3 options distinctes max, verdict + justification par option.

3. **Choix option** : Benjamin tranche (ou demande hybride/ajustement). Claude ne tranche jamais sur une question de direction visuelle.

4. **Brief technique court** : Claude rédige brief < 30 lignes (objectif, contraintes critiques, valeurs précises, tâches). Pas de justification, pas de pédagogie.

5. **Plan d'exécution** : Claude Code propose plan en 5-8 lignes + risque slop principal. Attend validation.

6. **Validation plan** : Benjamin valide / ajuste / refait.

7. **Livraison + test** : push avec cache-buster, Benjamin teste visuellement.

8. **Validation finale ou itération** : si OK chantier suivant, sinon brief ciblé sur le problème.

## Règles fixes

- Toujours passer par taste-skill sur décisions visuelles importantes
- Jamais brief Claude Code > 40 lignes (sinon découper en sous-chantiers)
- Toujours découper un gros chantier en sous-étapes validables séparément
- Toujours attendre GO Benjamin entre 2 étapes
- Toujours utiliser Claude in Chrome MCP pour diagnostic visuel (jamais demander DevTools à Benjamin)
