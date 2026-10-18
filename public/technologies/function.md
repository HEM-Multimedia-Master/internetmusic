---
type: technology
slug: function
alias: fonction
aliases: [arrow-function, callback, normalization, Concept - Function]
status: published
public: true
url:
coverImage:
tags: [js, agentic-music]
person:
parent:
project: internet music
work:
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
definition: a reusable procedure that takes inputs, runs instructions, and optionally returns a result; an arrow function is its compact syntax, often used as a callback.
definition_fr: procédure réutilisable qui reçoit des entrées, exécute des instructions et renvoie éventuellement un résultat ; la fonction fléchée en est l'écriture courte, souvent utilisée comme callback.
connect:
  - "[[javascript]]"
  - "[[parameter]]"
  - "[[array]]"
---

A function is a reusable procedure that receives inputs (parameters), runs instructions, and may return a result. An arrow function, `(x) => { ... }`, is its compact modern syntax, widely used as a callback, a function called when an event or a timer fires. Defining a function produces no sound until it is called with parentheses, as in `initAudio()`. In the course instrument, `spawnGrain()` triggers a sound grain, and `controls.forEach(c => applyControlToParam(c))` applies each cut-out control to its parameter; normalization maps the mouse position along an arrow to a number between 0.0 and 1.0.

<!--lang:fr-->
Une fonction est une procédure réutilisable qui reçoit des entrées (paramètres), exécute des instructions et renvoie éventuellement un résultat. Une fonction fléchée, `(x) => { ... }`, en est l'écriture courte moderne, très utilisée comme callback, c'est-à-dire une fonction appelée lors d'un événement ou d'un minuteur. Définir une fonction ne produit aucun son tant qu'on ne l'appelle pas avec des parenthèses, comme dans `initAudio()`. Dans l'instrument du cours, `spawnGrain()` déclenche un grain sonore, et `controls.forEach(c => applyControlToParam(c))` applique chaque contrôle découpé à son paramètre ; la normalisation ramène la position de la souris le long d'une flèche à un nombre compris entre 0.0 et 1.0.
<!--/lang-->
