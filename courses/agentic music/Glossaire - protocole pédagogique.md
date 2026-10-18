---
type: note
title: Glossaire — protocole pédagogique FR/EN
tags: [glossaire, protocole, agentic-music]
---
# Glossaire — protocole pédagogique FR/EN

**Huit concepts nouveaux au maximum par séance ; quatre explicités en profondeur.** Les noms rencontrés dans une interface peuvent être repérés sans devenir immédiatement un cours de vocabulaire. En séance 1, travailler surtout agent, prompt, paramètre et modèle ; token, API, dépôt et inférence servent de repères. Les détails RMS/ZCR restent dans les notes enseignantes jusqu’à la séance 3.

## Une fiche = une notion que l’on peut employer

1. Lorsque la notion bloque une action, créer `Concept - Nom.md` dans le dossier personnel `glossaire/`.
2. Ajouter le terme français et l’équivalent anglais.
3. Écrire une phrase de définition **en français** et une phrase **en anglais**. Le reste de la fiche est en français.
4. Ajouter un exemple tiré de son instrument, puis un contre-exemple.
5. Relier à la classe et au fichier concerné avec un lien Obsidian.
6. Ajouter une vérification de 30 secondes : montrer, modifier ou expliquer quelque chose.
7. Citer une source et la date. Une définition suggérée par l’agent doit être relue et corrigée.
8. Marquer `statut: rencontré`, puis `testé`, puis `expliqué` après explication à un partenaire.

## Modèle à copier

```markdown
---
tags: [dictionary, agentic-music]
terme_fr: ""
term_en: ""
statut: rencontré
séance: 1
---
# Concept — Nom
**FR :** Une phrase, sans jargon nouveau.
**EN:** One sentence, with no new jargon.
## Dans mon instrument
Un exemple local et le fichier où je le retrouve.
## Ce que ce n’est pas
Un contre-exemple précis.
## Vérification de 30 secondes
Une action observable.
## Liens et source
[[classe-01-machines-qui-ecoutent]]
Source, lien, date et éventuelle correction de la proposition de l’agent.
```

## Huit fiches de départ (IA & Agentique)

- [[agent]]
- [[prompt]]
- [[token]]
- [[parameter]]
- [[model]]
- [[APIs]]
- [[repository]]
- [[inference]]

## Fiches de programmation initiale & Web Audio (Atelier 03 — Photo-Console)

- [[variable]] (`[[variable]]`, `const`, `let`)
- [[array]] (`[[array]]`, `[[2d-array]]`, `[[loop]]`)
- [[function]] (`[[function]]`, `[[arrow-function]]`, `[[callback]]`, `[[normalization]]`)
- [[object]] (`[[object]]`, `[[JSON]]`, `[[mapping]]`)
- [[canvas]] (`[[canvas]]`, `[[event-listener]]`, `[[getUserMedia]]`)
- [[web audio API]] (`[[webaudioapi]]`, `[[AudioContext]]`, `[[AudioNode]]`, `[[GainNode]]`)
- [[sound synthesis]] (`[[additive-synthesis]]`, `[[subtractive-synthesis]]`, `[[fm-synthesis]]`, `[[granular-synthesis]]`)
- [[audio matrix and feedback]] (`[[multiplexer]]`, `[[feedback]]`, `[[soft-clipping]]`)
- [[cloud workflow]] (`[[github-dev]]`, `[[copilot]]`, `[[colab]]`, `[[github-pages]]`, `[[vercel]]`)

## Rituel de classe

**Début, 3 minutes :** rappeler une notion précédente en montrant son usage dans un instrument. **Pendant :** noter un terme qui bloque, sans interrompre chaque manipulation pour le définir. **Fin, 5 minutes :** compléter deux fiches, une définition et une preuve chacune ; expliquer une fiche au partenaire. L’enseignant vérifie l’exemple plutôt que la mémorisation d’une formule.

Un token de texte, un token d’accès secret et un token audio sont des usages différents du même mot. Un paramètre d’interface et un poids appris du modèle sont aussi différents. On ajoute ces distinctions lorsqu’elles deviennent utiles, sans exiger toute la théorie dès la première séance.
