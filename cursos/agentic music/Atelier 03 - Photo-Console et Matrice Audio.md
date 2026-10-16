---
type: note
title: "Atelier 03 — Photo-Console & Matrice Audio (Pas à pas)"
tags: [atelier, web-audio, canvas, multiplexer, agentic-music]
---
# Atelier 03 — Photo-Console & Matrice Audio (`[[webaudioapi]]`)

Ce document résume les **12 étapes** permettant de transformer une photographie (console de mixage, synthétiseur, objet ou architecture) en un instrument modulaire doté d'une matrice de routage et de [[feedback]], entièrement dans le navigateur ([[github-dev]] + [[github-pages]] / [[vercel]]).

- **Application complète (Perform + Backdoor `[L]`) :** `03_photo_console_webaudio_matrix/index.html`
- **10 fichiers HTML progressifs (code minimal commenté en anglais) :**
  - `03_photo_console_webaudio_matrix/photo-console-step01.html` — Canvas & 1er son Web Audio
  - `03_photo_console_webaudio_matrix/photo-console-step02.html` — Découpe circulaire & Knob rotatif
  - `03_photo_console_webaudio_matrix/photo-console-step03.html` — Découpe polygonale & Slider à vecteur fléché
  - `03_photo_console_webaudio_matrix/photo-console-step04.html` — Synthèse Additive (boucle `for` de 6 harmoniques)
  - `03_photo_console_webaudio_matrix/photo-console-step05.html` — Synthèse Soustractive (`sawtooth` + `BiquadFilterNode` + LFO)
  - `03_photo_console_webaudio_matrix/photo-console-step06.html` — Synthèse FM (Modulateur → `carrier.frequency`)
  - `03_photo_console_webaudio_matrix/photo-console-step07.html` — Synthèse Granulaire (`AudioBuffer` + enveloppe de grain)
  - `03_photo_console_webaudio_matrix/photo-console-step08.html` — Périphériques & Espace (Mic In, `DelayNode`, `ConvolverNode`)
  - `03_photo_console_webaudio_matrix/photo-console-step09.html` — Matrice Multiplexer $3 \times 4$ & Feedback $\tanh$
  - `03_photo_console_webaudio_matrix/photo-console-step10.html` — Mini-Console complète (Perform View, Backdoor `[L]`, Mapping & JSON)
- **Présentations Advanced Slides :** [[03_photo_console_webaudio_matrix/slides_fr|Slides FR]] · [[03_photo_console_webaudio_matrix/slides_en|Slides EN]]

---

## Liste synthétique des 12 étapes et liens Obsidian

### Phase A — Interface photographique et découpe géométrique (DOM & Canvas)

1. **`[[01-image-loader]]` — Chargement de la photographie de base**
   - Charger une image via `<input type="file">` et `FileReader`, ou générer la console de démonstration sur le `<canvas>`.
   - **Concepts :** [[Concept - Canvas et Peripheriques|html]], [[Concept - Canvas et Peripheriques|DOM]], [[Concept - Variable|variable]] (`const`, `let`), [[Concept - Canvas et Peripheriques|event-listener]].
2. **`[[02-circular-knob-crop]]` — Découpe circulaire rotative (Rotary Knob)**
   - Sélectionner un centre `(cx, cy)` et un rayon `r` sur la photo, appliquer un masque circulaire `ctx.arc(...)` + `ctx.clip()`, puis tourner l'image sur son propre axe avec `ctx.translate(cx, cy)` et `ctx.rotate(angle)`.
   - **Concepts :** [[Concept - Canvas et Peripheriques|canvas]], [[Concept - Function|function]], [[Concept - Function|parameter]].
3. **`[[03-polygon-slider-crop]]` — Découpe polygonale/rectangulaire + Flèche vectorielle (Slider)**
   - Définir un polygone à 4 sommets (`poly`) et tracer une flèche de direction $\vec{v} = (vx_1 - vx_0, vy_1 - vy_0)$. Projeter le mouvement de la souris sur la flèche (produit scalaire) pour obtenir une valeur normalisée entre `0.0` et `1.0`.
   - **Concepts :** [[Concept - Array|array]], [[Concept - Object|object]], [[Concept - Function|arrow-function]], [[Concept - Function|normalization]].

### Phase B — Modules de génération et traitement (`[[webaudioapi]]`)

4. **`[[04-audio-context-init]]` — Démarrage du moteur audio et limiteur de sécurité**
   - Instancier `new AudioContext()` sur clic utilisateur et protéger la sortie maître avec `DynamicsCompressorNode`.
   - **Concepts :** [[Concept - Web Audio API|webaudioapi]], [[Concept - Web Audio API|AudioContext]], [[Concept - Web Audio API|AudioNode]], [[Concept - Web Audio API|GainNode]].
5. **`[[05-additive-synth]]` — Module 1 : Synthèse Additive**
   - Additionner 6 `OscillatorNode` harmoniques ($f_0, 2f_0, \dots, 6f_0$) créés dans une boucle `for`.
   - **Concepts :** [[Concept - Synthese Audio|additive-synthesis]], [[Concept - Array|loop]], [[Concept - Web Audio API|OscillatorNode]].
6. **`[[06-subtractive-synth]]` — Module 2 : Synthèse Soustractive**
   - Filtrer une onde dent de scie (`sawtooth`) avec un `BiquadFilterNode` passe-bas résonant (`cutoff`, `Q`).
   - **Concepts :** [[Concept - Synthese Audio|subtractive-synthesis]], [[Concept - Web Audio API|BiquadFilterNode]].
7. **`[[07-fm-synth]]` — Module 3 : Synthèse FM (Modulation de Fréquence)**
   - Connecter un oscillateur modulateur à travers un `GainNode` (index de modulation) directement sur l'`AudioParam` `carrier.frequency`.
   - **Concepts :** [[Concept - Synthese Audio|fm-synthesis]], [[Concept - Web Audio API|AudioParam]].
8. **`[[08-granular-engine]]` — Module 4 : Synthèse Granulaire**
   - Planifier avec `setInterval` une pluie de micro-grains (`20–350 ms`) extraits d'un `AudioBuffer`, chacun façonné par une enveloppe de gain.
   - **Concepts :** [[Concept - Synthese Audio|granular-synthesis]], [[Concept - Web Audio API|AudioBuffer]], [[Concept - Function|callback]].
9. **`[[09-mic-delay-reverb]]` — Module 5 : Microphone, Delay et Reverb**
   - Entrée micro (`getUserMedia`), ligne à retard (`DelayNode` + filtre d'amortissement) et réverbération à convolution (`ConvolverNode` avec réponse impulsionnelle synthétique).
   - **Concepts :** [[Concept - Canvas et Peripheriques|getUserMedia]], [[Concept - Web Audio API|DelayNode]], [[Concept - Web Audio API|ConvolverNode]].

### Phase C — Matrice Audio Multiplexer & Feedback

10. **`[[10-audio-matrix-multiplexer]]` — Matrice de routage $7 \times 6$ et boucles de rétroaction**
    - Relier les **7 sorties** (`Additive`, `Subtractive`, `FM`, `Granular`, `Mic`, `Delay`, `Reverb`) aux **6 entrées** (`FM Mod In`, `Sub Filter In`, `Gran PitchMod`, `Delay In`, `Reverb In`, `Master Out`) via une grille 2D de `GainNode`.
    - Insérer un micro-délai (`12–15 ms`) et un `WaveShaperNode` de saturation douce $\tanh(2.2x)$ pour stabiliser le [[Concept - Matrice et Feedback|feedback]].
    - **Concepts :** [[Concept - Matrice et Feedback|multiplexer]], [[Concept - Array|2d-array]], [[Concept - Matrice et Feedback|feedback]], [[Concept - Matrice et Feedback|soft-clipping]].

### Phase D — Mapping & Publication Cloud Zéro-Installation

11. **`[[11-control-mapping]]` — Assignation des découpes photo aux modules et à la matrice**
    - Associer chaque Knob ou Slider découpé à n'importe quelle clé du dictionnaire `PARAMS` (synthèse ou cellule de la matrice) et exporter le patch en `JSON`.
    - **Concepts :** [[Concept - Object|mapping]], [[Concept - Object|JSON]], [[Concept - Object|state]].
12. **`[[12-cloud-deploy]]` — Édition dans `github.dev` et déploiement sur GitHub Pages / Vercel**
    - Appuyer sur `.` dans GitHub pour ouvrir `github.dev`, utiliser **Copilot Chat**, commiter dans le navigateur et publier l'URL HTTPS.
    - **Concepts :** [[Concept - Cloud Workflow|github-dev]], [[Concept - Cloud Workflow|copilot]], [[Concept - Cloud Workflow|github-pages]], [[Concept - Cloud Workflow|vercel]].

---

## Prompts Agentiques Didactiques (Copier-coller dans Copilot Chat / Agent)

Ces prompts sont conçus pour étudier chaque module avec un agent IA dans `[[github-dev]]` tout en reliant le code aux concepts fondamentaux du [[Glossaire - protocole pédagogique|glossaire]].

### Prompt 01 — Découpe circulaire, rotation & angle de référence (`Knob`)
- **Concepts liés :** [[Concept - Variable|variable]], [[Concept - Function|function]], [[Concept - Function|parameter]], [[Concept - Canvas et Peripheriques|canvas]], [[Concept - Canvas et Peripheriques|event-listener]], [[Concept - Function|normalization]]

```text
Act as a didactic JavaScript & Web Audio teacher for musicians.
Explain how our circular rotary knob works in index.html (and photo-console-step02.html):
1. How a [[variable]] and an [[object]] store the knob center (cx, cy), radius (r), reference angle (baseAngleDeg), sweep arc (sweepDeg), and normalized value (0.0 to 1.0).
2. How the HTML5 [[canvas]] uses ctx.arc(), ctx.clip(), ctx.translate(), and ctx.rotate() inside a [[function]] to cut a circle from the photograph and spin it around its own axis.
3. How the edit handles ('knob-move', 'knob-radius', 'knob-angle') let us reposition the crop and set its angle on the photo.
4. Propose a 5-line modification to add double-click reset to 0.5.
```

### Prompt 02 — Découpe rectangulaire orientée & projection vectorielle (`Slider`)
- **Concepts liés :** [[Concept - Array|array]], [[Concept - Object|object]], [[Concept - Function|arrow-function]], [[Concept - Canvas et Peripheriques|coordinates]], [[Concept - Function|normalization]]

```text
Act as a didactic JavaScript teacher for beginner musicians.
Explain how the oriented rectangular/polygonal slider with a directional vector arrow works in index.html (and photo-console-step03.html):
1. How rebuildSliderPolyFromAngle() rotates the 4 corners [{x, y}, ...] stored in an [[array]] around (cx, cy) by angleDeg using Math.cos() and Math.sin().
2. How we can align the rectangle crop angle directly from a knob's reference angle or align the rectangle to the arrow angle.
3. How an [[arrow-function]] projects the mouse [[coordinates]] onto the displacement vector (vx0, vy0 -> vx1, vy1) using the dot product to return a normalized value between 0.0 and 1.0.
```

### Prompt 03 — Moteurs de synthèse Web Audio (Additive, Soustractive, FM, Granulaire)
- **Concepts liés :** [[Concept - Web Audio API|webaudioapi]], [[Concept - Web Audio API|AudioContext]], [[Concept - Web Audio API|OscillatorNode]], [[Concept - Web Audio API|BiquadFilterNode]], [[Concept - Web Audio API|GainNode]], [[Concept - Synthese Audio|additive-synthesis]], [[Concept - Synthese Audio|subtractive-synthesis]], [[Concept - Synthese Audio|fm-synthesis]], [[Concept - Synthese Audio|granular-synthesis]]

```text
Act as a Web Audio API mentor for musicians.
Compare the 4 synthesis engines in our console (photo-console-step04.html to photo-console-step07.html):
1. [[additive-synthesis]]: a [[loop]] summing 6 harmonic [[OscillatorNode]] partials (f, 2f, 3f...).
2. [[subtractive-synthesis]]: a rich sawtooth waveform sculpted by a resonant lowpass [[BiquadFilterNode]].
3. [[fm-synthesis]]: audio-rate frequency modulation (Modulator -> [[GainNode]] -> Carrier.frequency [[AudioParam]]).
4. [[granular-synthesis]]: scheduling overlapping micro-grains (20-350ms) from an [[AudioBuffer]] with a window envelope.
```

### Prompt 04 — Périphériques, Matrice Multiplexer $N \times M$ & Feedback sécurisé
- **Concepts liés :** [[Concept - Matrice et Feedback|multiplexer]], [[Concept - Matrice et Feedback|feedback]], [[Concept - Array|2d-array]], [[Concept - Web Audio API|GainNode]], [[Concept - Web Audio API|DelayNode]], [[Concept - Web Audio API|ConvolverNode]], [[Concept - Canvas et Peripheriques|getUserMedia]]

```text
Act as a cybernetics and Web Audio instrument designer.
Explain the N×M [[multiplexer]] audio matrix in index.html (and photo-console-step09.html):
1. How a [[2d-array]] / dictionary of [[GainNode]] crosspoints connects any module output (Additive, Subtractive, FM, Granular, Mic, Delay, Reverb) to any module input (FM Mod, Sub Filter, Granular Mod, Delay In, Reverb In, Master).
2. Why routing Delay Out -> FM Mod In -> Reverb In -> Delay In creates a self-oscillating cybernetic [[feedback]] loop.
3. How the WaveShaperNode with Math.tanh() soft-clipping and aDynamicsCompressorNode limiter protect our ears from runaway digital distortion.
```

