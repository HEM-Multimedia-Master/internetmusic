---
tags: [dictionary, agentic-music, js, web]
aliases: [canvas, event-listener, html, DOM, getUserMedia, Concept - Canvas et Peripheriques]
terme_fr: "Canvas, DOM & Écouteurs d'événements (Périphériques)"
term_en: "Canvas, DOM & Event Listeners (Peripherals)"
statut: rencontré
séance: 3
---
# Concept — Canvas & Périphériques (`[[canvas]]`, `[[event-listener]]`, `[[getUserMedia]]`)

**FR :** L'élément `<canvas>` est une surface de dessin 2D permettant de découper (`clip`), déplacer (`translate`) et tourner (`rotate`) des fragments d'image en réponse aux périphériques (souris, écran tactile, microphone via `[[getUserMedia]]`) captés par un `[[event-listener]]`.

**EN:** The `<canvas>` element is a 2D drawing surface where image regions can be masked (`clip`), moved (`translate`), and rotated (`rotate`) in response to peripherals (mouse, touch screen, microphone via `[[getUserMedia]]`) captured by an `[[event-listener]]`.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

- `canvas.addEventListener('pointerdown', e => { ... })` écoute à la fois la souris et le doigt sur écran tactile.
- `g.arc(cx, cy, r, 0, Math.PI * 2); g.clip(); g.rotate(angle);` découpe un cercle dans la photo de la console et le fait tourner sur lui-même.
- `navigator.mediaDevices.getUserMedia({ audio: true })` ouvre le microphone du navigateur.

## Ce que ce n’est pas

`canvas` ne garde pas automatiquement chaque forme comme un bouton HTML séparé : c'est notre boucle `renderConsole()` qui redessine la photo et ses découpes à chaque mouvement.

## Vérification de 30 secondes

Passer en mode `⭕ + Crop Rotary Knob`, découper une partie quelconque de la photo et la faire tourner en mode `Perform`.

## Liens et source

[[slides_fr]] · [[Concept - API]] · [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
