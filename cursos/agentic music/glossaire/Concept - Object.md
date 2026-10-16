---
tags: [dictionary, agentic-music, js]
aliases: [object, JSON, mapping, state, coordinates, Concept - Object]
terme_fr: "Objet (Object), JSON & Mapping"
term_en: "Object, JSON & Mapping"
statut: rencontré
séance: 3
---
# Concept — Object, JSON & Mapping (`[[object]]`, `[[JSON]]`, `[[mapping]]`)

**FR :** Un `[[object]]` JavaScript regroupe des propriétés nommées sous la forme `{ clé: valeur }` ; `[[JSON]]` est sa représentation texte pour sauvegarder ou échanger un patch ; le `[[mapping]]` relie un geste visuel `[0..1]` à une plage sonore `[min..max]`.

**EN:** A JavaScript `[[object]]` groups named properties as `{ key: value }` pairs; `[[JSON]]` is its text format used to save or share patches; `[[mapping]]` maps a `[0..1]` visual gesture to an audio range `[min..max]`.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- Un bouton découpé sur la photo est un `[[object]]` :
  `{ id: 'K1', type: 'knob', cx: 110, cy: 130, r: 44, val: 0.35, target: 'add.freq' }`
- Formule de `[[mapping]]` linéaire : `p.val = p.min + ctrl.val * (p.max - p.min)`.
- Le bouton **Export Patch JSON** sauvegarde tous les contrôles et la matrice dans un fichier `.json`.

## Ce que ce n’est pas

Un fichier `JSON` ne contient que des données (`nombres`, `textes`, `tableaux`, `objets`), jamais de fonctions exécutables ni d'audio brut.

## Vérification de 30 secondes

Cliquer sur **Export Patch JSON**, ouvrir le fichier téléchargé et modifier la cible `target` d'un bouton.

## Liens et source

[[slides_fr]] · [[Concept - Variable]] · [MDN Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
