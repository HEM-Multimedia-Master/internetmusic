---
type: concept
slug: sound-synthesis
alias: synthèse sonore
aliases: [additive-synthesis, subtractive-synthesis, fm-synthesis, granular-synthesis, Concept - Synthese Audio]
status: published
public: true
url:
coverImage:
tags: [web-audio, synthesis, timbre, agentic-music]
person:
parent:
project: internet music
work:
source: John Chowning, The Synthesis of Complex Audio Spectra by Means of Frequency Modulation (1973); Curtis Roads, Microsound (2001)
definition: "four complementary paradigms for building a timbre: summing sine partials, filtering a rich wave, modulating frequency at audio rate, or scheduling a cloud of micro-grains."
definition_fr: "quatre paradigmes complémentaires pour fabriquer un timbre : additionner des sinus, filtrer une onde riche, moduler la fréquence à vitesse audio, ou projeter un nuage de micro-grains."
connect:
  - "[[audio matrix and feedback]]"
  - "[[web audio API]]"
  - "[[tonejs]]"
---

Four complementary paradigms build a timbre. Additive synthesis sums sine partials (here six harmonic oscillators, $f_0, 2f_0, \dots, 6f_0$); subtractive synthesis starts from a harmonic-rich sawtooth and sculpts its spectrum with a resonant low-pass filter; FM synthesis lets a modulator oscillator vibrate the frequency of a carrier, creating metallic or woody sidebands; granular synthesis cuts a buffer into grains of 20 to 350 ms under a gain window, triggered 2 to 35 times per second. In a patchable matrix the modules are not isolated: the output of the granular module or of a delay can modulate the FM input or pass through the subtractive filter.

<!--lang:fr-->
Quatre paradigmes complémentaires fabriquent un timbre. La synthèse additive additionne des sinus partiels (ici six oscillateurs harmoniques, $f_0, 2f_0, \dots, 6f_0$) ; la synthèse soustractive part d'une dent de scie riche en harmoniques et sculpte son spectre avec un filtre passe-bas résonant ; la synthèse FM fait vibrer la fréquence d'une porteuse par un oscillateur modulateur, créant des bandes latérales métalliques ou boisées ; la synthèse granulaire découpe un buffer en grains de 20 à 350 ms sous une fenêtre de gain, déclenchés de 2 à 35 fois par seconde. Dans une matrice patchable, les modules ne sont pas isolés : la sortie du module granulaire ou d'un délai peut moduler l'entrée FM ou traverser le filtre soustractif.
<!--/lang-->
