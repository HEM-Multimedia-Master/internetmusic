---
type: technology
slug: object
alias: objet
aliases: [JSON, mapping, state, coordinates, Concept - Object]
status: published
public: true
url:
coverImage:
tags: [js, data, agentic-music]
person:
parent:
project: internet music
work:
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
definition: a structure that groups named properties as key-value pairs; JSON is its text form for saving or exchanging data, and mapping links a gesture to a sound range.
definition_fr: structure qui regroupe des propriétés nommées sous forme de paires clé-valeur ; JSON en est la forme texte pour sauvegarder ou échanger des données, et le mapping relie un geste à une plage sonore.
connect:
  - "[[javascript]]"
  - "[[variable]]"
  - "[[array]]"
---

A JavaScript object groups named properties as `{ key: value }` pairs. JSON is its text representation for saving or exchanging data, such as a patch, and contains only data (numbers, text, arrays, objects), never executable functions or raw audio. Mapping connects a visual gesture in $[0, 1]$ to a sound range $[\min, \max]$ by linear interpolation, $p = p_{\min} + v\,(p_{\max} - p_{\min})$. In the course instrument, a knob cut out of the photo is an object, `{ id: 'K1', type: 'knob', cx: 110, cy: 130, r: 44, val: 0.35, target: 'add.freq' }`, and the Export Patch JSON button saves all controls and the matrix in a `.json` file.

<!--lang:fr-->
Un objet JavaScript regroupe des propriétés nommées sous la forme de paires `{ clé: valeur }`. JSON en est la représentation texte pour sauvegarder ou échanger des données, comme un patch, et ne contient que des données (nombres, textes, tableaux, objets), jamais de fonctions exécutables ni d'audio brut. Le mapping relie un geste visuel dans $[0, 1]$ à une plage sonore $[\min, \max]$ par interpolation linéaire, $p = p_{\min} + v\,(p_{\max} - p_{\min})$. Dans l'instrument du cours, un bouton découpé sur la photo est un objet, `{ id: 'K1', type: 'knob', cx: 110, cy: 130, r: 44, val: 0.35, target: 'add.freq' }`, et le bouton Export Patch JSON sauvegarde tous les contrôles et la matrice dans un fichier `.json`.
<!--/lang-->
