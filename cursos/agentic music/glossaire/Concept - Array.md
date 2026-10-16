---
tags: [dictionary, agentic-music, js]
aliases: [array, 2d-array, loop, Concept - Array, tableau]
terme_fr: "Tableau (Array) & Boucle (Loop)"
term_en: "Array & Loop"
statut: rencontré
séance: 3
---
# Concept — Array & Loop (`[[array]]`, `[[2d-array]]`, `[[loop]]`)

**FR :** Un `[[array]]` est une liste ordonnée d'éléments écrite entre crochets `[a, b, c]`, que l'on parcourt souvent avec une boucle (`for` ou `.forEach()`) ; un tableau de tableaux forme une grille ou matrice (`[[2d-array]]`).

**EN:** An `[[array]]` is an ordered list of items written inside square brackets `[a, b, c]`, often traversed with a `[[loop]]` (`for` or `.forEach()`); an array of arrays forms a 2D grid or matrix (`[[2d-array]]`).

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- Les 4 sommets d'un fader découpé : `poly = [{x: 206, y: 347}, {x: 254, y: 347}, ...]`.
- La synthèse additive utilise une boucle `for (let h = 1; h <= 6; h++)` pour remplir le tableau `addOscs` de 6 oscillateurs harmoniques.
- La matrice audio combine `MATRIX_SOURCES.forEach(...)` et `MATRIX_DESTS.forEach(...)` pour créer une grille 2D ($7 \times 6$).

## Ce que ce n’est pas

Un `array` numérote ses éléments à partir de `0` (`addOscs[0]` est le 1er oscillateur), pas à partir de `1`.

## Vérification de 30 secondes

Modifier `h <= 6` en `h <= 10` dans la boucle de synthèse additive pour entendre 10 harmoniques au lieu de 6.

## Liens et source

[[slides_fr]] · [[Concept - Variable]] · [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
