---
type: technology
slug: variable
alias: variable
aliases: [const, let, Concept - Variable]
status: published
public: true
url:
coverImage:
tags: [js, agentic-music]
person:
parent:
project: internet music
work:
source: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables
definition: a named container in a program's memory that stores a value so it can be read or changed later.
definition_fr: boîte nommée dans la mémoire du programme qui garde une valeur pour pouvoir la lire ou la modifier plus tard.
connect:
  - "[[javascript]]"
  - "[[object]]"
  - "[[array]]"
order: 1
use:
connections:
---

A variable is a named container in a program's memory that holds a value (a number, a text, an audio node) so that it can be read or changed later. In the course instrument, `const ctx = new AudioContext();` creates a fixed reference to the audio engine, while `let uiMode = 'play';` creates a variable whose state can change between `'play'`, `'knob'`, and `'slider'`. A programming variable is not a fixed algebraic unknown: with `let`, its value changes during the musical performance.

<!--lang:fr-->
Une variable est une boîte nommée dans la mémoire du programme qui garde une valeur (un nombre, un texte, un nœud audio) pour pouvoir la lire ou la modifier plus tard. Dans l'instrument du cours, `const ctx = new AudioContext();` crée une référence fixe vers le moteur audio, tandis que `let uiMode = 'play';` crée une variable dont l'état peut passer de `'play'` à `'knob'` ou `'slider'`. Une variable informatique n'est pas une inconnue algébrique figée : avec `let`, sa valeur change au fil du jeu musical.
<!--/lang-->
