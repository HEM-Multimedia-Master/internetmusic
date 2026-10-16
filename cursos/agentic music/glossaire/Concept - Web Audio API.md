---
tags: [dictionary, agentic-music, web-audio]
aliases: [webaudioapi, AudioContext, AudioNode, GainNode, OscillatorNode, BiquadFilterNode, DelayNode, ConvolverNode, AudioBuffer, AudioParam, Concept - Web Audio API]
terme_fr: "Web Audio API & Graphe de nœuds (AudioNodes)"
term_en: "Web Audio API & AudioNode Graph"
statut: rencontré
séance: 3
---
# Concept — Web Audio API (`[[webaudioapi]]`, `[[AudioContext]]`, `[[AudioNode]]`)

**FR :** Moteur audio temps réel intégré au navigateur où des modules (`[[AudioNode]]` : oscillateurs, filtres, délais, gains) sont câblés entre eux par `.connect()` à l'intérieur d'un `[[AudioContext]]`.

**EN:** Real-time audio engine built into the browser where sound modules (`[[AudioNode]]`: oscillators, filters, delays, gains) are wired together via `.connect()` inside an `[[AudioContext]]`.

## Nœuds principaux utilisés dans la Photo-Console (`index.html`)

- `[[OscillatorNode]]` : génère une onde périodique (`sine`, `sawtooth`, `square`, `triangle`).
- `[[GainNode]]` : multiplie le signal (contrôle de volume ou index de modulation FM).
- `[[BiquadFilterNode]]` : filtre les fréquences (`lowpass`, fréquence de coupure `frequency` et résonance `Q`).
- `[[DelayNode]]` : retarde le son de quelques millisecondes à plusieurs secondes.
- `[[ConvolverNode]]` : applique une réverbération par convolution avec une réponse impulsionnelle (`[[AudioBuffer]]`).
- `[[AudioParam]]` : paramètre modulable à fréquence audio (ex. `fmCarrier.frequency` reçoit directement la sortie d'un autre oscillateur).

## Ce que ce n’est pas

Un `AudioContext` ne démarre jamais le son tout seul au chargement d'une page : le navigateur exige toujours un geste explicite de l'utilisateur (clic sur **Start Audio Engine**).

## Vérification de 30 secondes

Dans `index.html`, repérer une chaîne `.connect(...).connect(...)` et dessiner son parcours du générateur jusqu'à `ctx.destination`.

## Liens et source

[[slides_fr]] · [[web audio API]] · [[Concept - API]] · [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
