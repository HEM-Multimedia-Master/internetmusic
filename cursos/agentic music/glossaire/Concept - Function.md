---
tags: [dictionary, agentic-music, js]
aliases: [function, arrow-function, callback, parameter, normalization, Concept - Function]
terme_fr: "Fonction (Function) & Fonction fléchée (Arrow Function)"
term_en: "Function & Arrow Function"
statut: rencontré
séance: 3
---
# Concept — Function & Arrow Function (`[[function]]`, `[[arrow-function]]`)

**FR :** Une `[[function]]` est une recette réutilisable qui reçoit des entrées (`[[parameter]]`), exécute des instructions et renvoie éventuellement un résultat ; une `[[arrow-function]]` `(x) => { ... }` est son écriture courte moderne, très utilisée comme `[[callback]]` (fonction appelée lors d'un événement ou d'un minuteur).

**EN:** A `[[function]]` is a reusable recipe that takes inputs (`[[parameter]]`), runs instructions, and optionally returns a result; an `[[arrow-function]]` `(x) => { ... }` is its compact modern syntax, widely used as a `[[callback]]`.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- Fonction classique : `function spawnGrain() { ... }` déclenche un grain sonore.
- Fonction fléchée (`[[arrow-function]]`) : `controls.forEach(c => applyControlToParam(c))` applique chaque contrôle découpé à son paramètre.
- `[[normalization]]` : la fonction `updateSliderByVectorProjection` ramène la position de la souris sur la flèche à un nombre compris entre `0.0` et `1.0`.

## Ce que ce n’est pas

Définir une fonction (`function initAudio() {...}`) ne produit aucun son tant qu'on ne l'appelle pas avec des parenthèses (`initAudio()`).

## Vérification de 30 secondes

Repérer une `[[arrow-function]]` `=>` dans `index.html` et identifier ses paramètres d'entrée.

## Liens et source

[[slides_fr]] · [[Concept - Paramètre]] · [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
