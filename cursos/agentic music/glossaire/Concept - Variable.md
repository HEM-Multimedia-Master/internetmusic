---
tags: [dictionary, agentic-music, js]
aliases: [variable, Concept - Variable, const, let]
terme_fr: "Variable (const / let)"
term_en: "Variable (const / let)"
statut: rencontré
séance: 3
---
# Concept — Variable (`[[variable]]`)

**FR :** Une boîte nommée dans la mémoire du programme qui garde une valeur (un nombre, un texte, un nœud audio) pour pouvoir la lire ou la modifier plus tard.

**EN:** A named box in the program's memory that stores a value (a number, text, or audio node) so it can be read or changed later.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- `const ctx = new AudioContext();` : `const` crée une référence fixe vers le moteur audio.
- `let uiMode = 'play';` : `let` crée une variable qui peut changer d'état (`'play'`, `'knob'`, `'slider'`).

## Ce que ce n’est pas

Une variable informatique n'est pas une inconnue algébrique figée : avec `let`, sa valeur change au fil du jeu musical.

## Vérification de 30 secondes

Chercher `let ` et `const ` dans `index.html` et expliquer pourquoi `uiMode` utilise `let` tandis que `canvas` utilise `const`.

## Liens et source

[[slides_fr]] · [[Glossaire - protocole pédagogique]] · [MDN Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables)
