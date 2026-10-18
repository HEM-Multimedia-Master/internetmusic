---
type: technology
slug: array
alias: tableau
aliases: [loop, 2d-array, tableau, Concept - Array]
status: published
public: true
url:
coverImage:
tags: [js, data, agentic-music]
person:
parent:
project: internet music
work:
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
definition: an ordered list of items written between square brackets, usually traversed with a loop; an array of arrays forms a grid.
definition_fr: liste ordonnée d'éléments écrite entre crochets, le plus souvent parcourue avec une boucle ; un tableau de tableaux forme une grille.
connect:
  - "[[javascript]]"
  - "[[variable]]"
  - "[[function]]"
  - "[[audio matrix and feedback]]"
---

An array is an ordered list of items written between square brackets, `[a, b, c]`, usually traversed with a loop (`for` or `.forEach()`); an array of arrays forms a grid or matrix. Items are numbered from 0, so `addOscs[0]` is the first oscillator. In the course instrument, additive synthesis fills `addOscs` with six harmonic oscillators through `for (let h = 1; h <= 6; h++)`, and the audio matrix combines two `.forEach` calls to build a $7 \times 6$ grid.

<!--lang:fr-->
Un tableau (array) est une liste ordonnée d'éléments écrite entre crochets, `[a, b, c]`, que l'on parcourt le plus souvent avec une boucle (`for` ou `.forEach()`) ; un tableau de tableaux forme une grille ou une matrice. Les éléments sont numérotés à partir de 0 : `addOscs[0]` est le premier oscillateur. Dans l'instrument du cours, la synthèse additive remplit `addOscs` avec six oscillateurs harmoniques grâce à `for (let h = 1; h <= 6; h++)`, et la matrice audio combine deux appels `.forEach` pour construire une grille $7 \times 6$.
<!--/lang-->
