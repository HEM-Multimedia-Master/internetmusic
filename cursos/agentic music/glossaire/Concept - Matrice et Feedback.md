---
tags: [dictionary, agentic-music, web-audio, cybernetics]
aliases: [multiplexer, feedback, audio-matrix, soft-clipping, Concept - Matrice et Feedback]
terme_fr: "Matrice Audio (Multiplexer) & Boucle de rétroaction (Feedback)"
term_en: "Audio Matrix (Multiplexer) & Feedback Loop"
statut: rencontré
séance: 3
---
# Concept — Matrice Audio & Feedback (`[[multiplexer]]`, `[[feedback]]`)

**FR :** Une grille de routage $N \times M$ (`[[multiplexer]]`) où chaque sortie de module (ligne) peut être envoyée vers n'importe quelle entrée (colonne) avec un volume indépendant (`[[GainNode]]`), permettant de refermer des boucles de rétroaction (`[[feedback]]`) contrôlées par écrêtage doux ($\tanh$).

**EN:** An $N \times M$ routing grid (`[[multiplexer]]`) where every module output (row) can be sent to any input (column) with an independent volume (`[[GainNode]]`), enabling self-oscillating `[[feedback]]` loops tamed by $\tanh$ soft-clipping.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- **7 sorties (lignes)** : `Additive`, `Subtractive`, `FM`, `Granular`, `Mic In`, `Delay Out`, `Reverb Out`.
- **6 entrées (colonnes)** : `FM Mod In`, `Sub Filter In`, `Gran PitchMod`, `Delay In`, `Reverb In`, `Master Out`.
- **Protection de `[[feedback]]`** : chaque retour traverse un micro-délai (`12–15 ms`) et un `WaveShaperNode` appliquant $\tanh(2.2 \cdot x)$, imitant la saturation analogique d'une console *no-input mixing board* sans saturer numériquement.

## Ce que ce n’est pas

Sans `DelayNode` ni saturation $\tanh$, une boucle directe dans Web Audio API est soit bloquée par le navigateur, soit produit un bruit numérique dangereux pour l'audition.

## Vérification de 30 secondes

Dans la matrice, monter `Delay Out → FM Mod In` et `FM Out → Delay In` puis assigner ce croisement à un bouton découpé sur la photo.

## Liens et source

[[slides_fr]] · [[cybernetics]] · [[Concept - Web Audio API]]
