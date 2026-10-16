---
tags: [dictionary, agentic-music, web-audio, synthesis]
aliases: [additive-synthesis, subtractive-synthesis, fm-synthesis, granular-synthesis, Concept - Synthese Audio]
terme_fr: "Modules de synthèse : Additive, Soustractive, FM, Granulaire"
term_en: "Synthesis Modules: Additive, Subtractive, FM, Granular"
statut: rencontré
séance: 3
---
# Concept — Synthèse Audio (`[[additive-synthesis]]`, `[[subtractive-synthesis]]`, `[[fm-synthesis]]`, `[[granular-synthesis]]`)

**FR :** Quatre paradigmes complémentaires pour fabriquer un timbre dans `[[webaudioapi]]` : additionner des sinus, filtrer une onde riche, moduler la fréquence à vitesse audio, ou projeter un nuage de micro-grains.

**EN:** Four complementary paradigms to build timbre in `[[webaudioapi]]`: summing sine partials, filtering a harmonic-rich wave, modulating frequency at audio rate, or scheduling a cloud of micro-grains.

## Dans mon instrument (`03_photo_console_webaudio_matrix/index.html`)

1. **`[[additive-synthesis]]` (Synthèse additive)** : additionne 6 `[[OscillatorNode]]` harmoniques ($f_0, 2f_0, \dots, 6f_0$) avec un contrôle de brillance et de désaccordage (`spread`).
2. **`[[subtractive-synthesis]]` (Synthèse soustractive)** : part d'une dent de scie (`sawtooth`) riche en harmoniques et sculpte le spectre avec un `[[BiquadFilterNode]]` passe-bas résonant (`cutoff`, `Q`).
3. **`[[fm-synthesis]]` (Synthèse FM)** : un oscillateur *modulateur* fait vibrer la fréquence d'un oscillateur *porteur* (`fmMod.connect(fmIndexGain).connect(fmCarrier.frequency)`), créant des bandes latérales métalliques ou boisées.
4. **`[[granular-synthesis]]` (Synthèse granulaire)** : découpe un `[[AudioBuffer]]` en grains de 20 à 350 ms enveloppés par une fenêtre de gain, déclenchés entre 2 et 35 fois par seconde.

## Ce que ce n’est pas

Ces modules ne sont pas isolés : dans notre console, la sortie du module Granulaire ou du Delay peut moduler l'entrée FM ou traverser le filtre soustractif via la matrice.

## Vérification de 30 secondes

Mettre uniquement un module à la fois vers `Master Out` dans la matrice pour comparer leurs 4 signatures spectrales.

## Liens et source

[[slides_fr]] · [[Concept - Web Audio API]] · Chowning (1973), Roads (2001)
