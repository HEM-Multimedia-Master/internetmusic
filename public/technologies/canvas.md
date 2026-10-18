---
type: technology
slug: canvas
alias: canvas
aliases: [event-listener, DOM, getUserMedia, Concept - Canvas et Peripheriques]
status: published
public: true
url:
coverImage:
tags: [js, web, interface, agentic-music]
person:
parent:
project: internet music
work:
source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
definition: an HTML element that provides a 2D drawing surface, redrawn in response to peripherals such as mouse, touch, or microphone captured by event listeners.
definition_fr: élément HTML qui fournit une surface de dessin 2D, redessinée en réponse aux périphériques (souris, tactile, microphone) captés par des écouteurs d'événements.
connect:
  - "[[html]]"
  - "[[javascript]]"
  - "[[web audio API]]"
---

The `<canvas>` element is a 2D drawing surface where image regions can be clipped (`clip`), moved (`translate`), and rotated (`rotate`) in response to peripherals, captured by an event listener. In the course instrument, `canvas.addEventListener('pointerdown', ...)` listens to both mouse and finger; `g.arc(...); g.clip(); g.rotate(angle)` cuts a circle out of the console photo and spins it; `navigator.mediaDevices.getUserMedia({ audio: true })` opens the browser microphone. A canvas does not keep each shape as a separate HTML button: the `renderConsole()` loop redraws the photo and its cut-outs at every movement.

<!--lang:fr-->
L'élément `<canvas>` est une surface de dessin 2D où des fragments d'image peuvent être découpés (`clip`), déplacés (`translate`) et tournés (`rotate`) en réponse à des périphériques, captés par un écouteur d'événements. Dans l'instrument du cours, `canvas.addEventListener('pointerdown', ...)` écoute à la fois la souris et le doigt ; `g.arc(...); g.clip(); g.rotate(angle)` découpe un cercle dans la photo de la console et le fait tourner ; `navigator.mediaDevices.getUserMedia({ audio: true })` ouvre le microphone du navigateur. Un canvas ne conserve pas chaque forme comme un bouton HTML distinct : la boucle `renderConsole()` redessine la photo et ses découpes à chaque mouvement.
<!--/lang-->
