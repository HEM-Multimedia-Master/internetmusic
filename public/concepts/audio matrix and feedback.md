---
type: concept
slug: audio-matrix-and-feedback
alias: matrice audio et rétroaction
aliases: [multiplexer, feedback, audio-matrix, soft-clipping, Concept - Matrice et Feedback]
status: published
public: true
url:
coverImage:
tags: [web-audio, cybernetics, routing, agentic-music]
person:
parent:
project: internet music
work:
source:
definition: a routing grid where every module output can be sent to any input at an independent gain, allowing feedback loops that need a safeguard.
definition_fr: grille de routage où chaque sortie de module peut être envoyée vers n'importe quelle entrée avec un gain indépendant, ce qui permet des boucles de rétroaction à protéger.
connect:
  - "[[cybernetics]]"
  - "[[web audio API]]"
  - "[[sound synthesis]]"
---

An audio matrix (multiplexer) is an $N \times M$ routing grid in which each module output, in rows, can be sent to any input, in columns, at its own gain. This allows signal loops to be closed, and a feedback loop can self-oscillate, so it needs a safeguard. In the course console (seven outputs, six inputs), each return passes through a short delay (12–15 ms) and a $\tanh(2.2\,x)$ waveshaper, which imitates the saturation of an analog no-input mixing board without clipping digitally. A direct loop without delay and saturation is either blocked by the browser or produces digital noise harmful to hearing.

<!--lang:fr-->
Une matrice audio (multiplexeur) est une grille de routage $N \times M$ où chaque sortie de module, en ligne, peut être envoyée vers n'importe quelle entrée, en colonne, avec son propre gain. Elle permet de refermer des boucles de signal, et une boucle de rétroaction peut s'auto-osciller : elle exige donc une protection. Dans la console du cours (sept sorties, six entrées), chaque retour traverse un micro-délai (12–15 ms) et un waveshaper $\tanh(2.2\,x)$, qui imite la saturation d'une console analogique no-input mixing board sans saturer numériquement. Une boucle directe sans délai ni saturation est soit bloquée par le navigateur, soit génère un bruit numérique dangereux pour l'audition.
<!--/lang-->
