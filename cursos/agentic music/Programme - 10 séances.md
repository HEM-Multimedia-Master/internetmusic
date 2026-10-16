---
type: note
title: Programme — dix séances
tags: [programme, agentic-music]
---
# Programme — dix séances

**Hypothèse pédagogique : dix séances de 180 minutes**, avec préparation de 30–45 minutes avant la première. Pour le créneau Internet Music de deux heures, suivre la variante indiquée dans [[Organisation - conduite et évaluation]] : installation en amont, une transformation en classe, approfondissement à domicile.

L’objectif final est un hyperphone : un instrument web accessible par URL, qui écoute, conserve un état et propose des actions musicales dans des limites que l’interprète peut comprendre et modifier. L’IA intervient à deux endroits distincts : **pour fabriquer le code** et, lorsque cela sert l’œuvre, **dans les décisions de l’instrument**. Un navigateur sonore n’est pas automatiquement un système appris ; nous préciserons les règles et les apprentissages.

## Vue d’ensemble

| Séance | Objet de création | Production d’impact | Technique principale | Lecture courte |
|---|---|---|---|---|
| 1 | Machines qui écoutent | Deux instruments + 2 WAV + une URL | Web Audio, mic, règles, apprentissage par exemples | A, p. 20–24, 72–74, 131–137 ; JS, p. 12–16 |
| 2 | Portrait sonore et sampling | Autoportrait de 45 s, 8 samples documentés | Capture, découpe, fichiers, mini-corpus JSON | JS, p. 23–42 ; A, p. 25–30 |
| 3 | Grains et apprentissage | Paysage jouable dont le modèle est corrigé en public | Granulaire, centroïdes, RMS/ZCR | A, p. 71–80 ; JS, p. 187–204 |
| 4 | Gestes et ubiquité | Hyperphone joué sur téléphone et ordinateur | Gyroscope, accéléromètre, touch, synthèse | A, p. 131–139 ; JS, p. 146–155 |
| 5 | Paroles et bots | Partition vocale de 8 lignes + version rejetée | Grammaire JSON, LLM facultatif, prosodie | JS, p. 164–178, 220–227 ; A, p. 128–134 |
| 6 | Partitions en circulation | Partition web + PDF gravé + WAV | VexFlow, événements JSON, LilyPond | JS, p. 113–132 ; A, p. 73–74 |
| 7 | Jouer à distance | Duo de navigateurs + chat de consignes | WebRTC, canal de données, signalisation | JS, p. 231–245 ; A, p. 135–139 |
| 8 | Dataset et composition contrôlée | Mini « DIY Suno » : forme, stems, provenance | Corpus, Markov, séquenceur, recherche de samples | A, p. 73–80, 162–165 ; JS, p. 187–204 |
| 9 | Modèle préentraîné comme partenaire | Un module HF comparé à une règle simple | Whisper ou CLAP ; MusicGen facultatif hors temps réel | A, p. 121–139, 175–183 ; JS, p. 209–227 |
| 10 | Concert et fabrication critique | Hyperphone publié, performance de 3 min, dossier | Intégration, déploiement, répétition | A, p. 185–188 ; JS, p. 237–247 |

A = Ackerman ; JS = Johnson et Salter. Pages **imprimées** ; la bibliographie précise leur correspondance avec les fichiers PDF. Les productions et durées ci-dessous sont des adaptations du cours.

## 1 — Machines qui écoutent

**Question :** où l’interprète conserve-t-il le pouvoir de décision ? Jouer d’abord les deux références, expliquer ce qu’elles font, puis modifier une seule décision avec l’agent. L’application 1 utilise une politique écrite ; l’application 2 apprend des centroïdes à partir d’exemples locaux. La génération de code par un LLM reste une troisième activité, distincte.

**Déroulement :** écoute 15 min ; contrat et lectures 20 ; ouverture des outils 25 ; Écho 35 ; pause 10 ; Nuage 35 ; agent et tests 25 ; publication et journal 15. Voir les slides et [[Atelier 01 - deux applications]].

**Preuve :** arrêt effectif, comparaison A/B, WAV de chaque instrument, URL et note sur une proposition refusée. **Notions :** agent, prompt, token, paramètre, modèle, API, dépôt, inférence.

## 2 — Portrait sonore et sampling

**Question :** un portrait sonore peut-il montrer ce qu’un modèle de représentation oublie ? Adapter le patron *Selfie* de JS en un autoportrait fait de gestes, lieux ou objets plutôt que d’une image.

**Pas à pas :** 1. Dessiner le portrait sur papier (20 min). 2. Enregistrer huit sons personnels de 2–5 s, sans personnes non consentantes (30). 3. Découper dans Audacity ou le sampler de référence (35). 4. Renseigner auteur, date, source, licence, description dans `samples.json` (25). 5. Demander à l’agent une interface à huit touches qui lit ce manifeste (35). 6. Jouer 45 s et expliquer deux absences du portrait (35).

**Acceptation :** les huit touches marchent ; un fichier manquant affiche un message ; le corpus est exportable. **Repli :** les sons de démonstration fournis, accompagnés d’un portrait fictif déclaré. **Notions :** sample, format, PCM, fréquence d’échantillonnage, canal, métadonnée, licence, manifeste.

## 3 — Grains et apprentissage

**Question :** nos noms « calme » et « dense » décrivent-ils les sons ou nos habitudes d’écoute ?

**Pas à pas :** 1. Comparer trois durées de grains (20). 2. Collecter trois exemples par classe dans Nuage appris (30). 3. Réserver trois fragments inédits pour le test (25). 4. Observer la distance aux centroïdes et les erreurs (25). 5. Ajouter des contre-exemples, tester de nouveau, noter les changements (35). 6. Demander à l’agent un seul paramètre musical supplémentaire (25). 7. Jouer et exporter une scène de 12 s puis deux scènes contrastées (20).

**Acceptation :** tableau attendu/prédit avant et après correction ; aucune « précision » calculée sur les seules données d’apprentissage. **Repli :** politique manuelle pour montrer exactement ce que l’apprentissage apporte. **Notions :** descripteur, RMS, ZCR, étiquette, apprentissage supervisé, centroïde, distance, jeu de test.

## 4 — Gestes et ubiquité

**Question :** le même instrument reste-t-il musical lorsque le corps et l’écran changent ?

**Pas à pas :** 1. Choisir deux gestes (15). 2. Vérifier l’URL HTTPS sur téléphone (20). 3. Ajouter un bouton d’autorisation du capteur, demandé à la suite d’un geste explicite (30). 4. Mapper inclinaison → hauteur ; accélération → déclenchement, avec lissage et limites (35). 5. Prévoir curseurs et toucher si aucun capteur n’est disponible (25). 6. Tester portrait, paysage et fenêtre redimensionnée (25). 7. Faire jouer l’instrument par un partenaire et documenter les difficultés (30).

**Acceptation :** instrument utilisable avec et sans capteur ; arrêt accessible ; aucune activation automatique du micro. Plein écran lorsque le navigateur le permet. **Notions :** capteur, gyroscope, accéléromètre, mapping, calibration, lissage, événement, interface adaptative.

## 5 — Paroles et bots

**Question :** peut-on écrire une forme vocale en composant ses possibilités ? Adapter le patron Tracery de JS, p. 175–178, avec au moins trois règles et un vocabulaire choisi.

**Pas à pas :** 1. Écrire huit lignes humaines et une contrainte prosodique (25). 2. Construire trois listes JSON : sujet, verbe, image (25). 3. Générer trois versions avec une grammaire locale (25). 4. Comparer facultativement avec un LLM dans un chat gratuit disponible ou Copilot (25). 5. Mesurer syllabes à la voix, réécrire et consigner les rejets (35). 6. Jouer les syllabes avec un sampler ou une synthèse vocale disponible (25). 7. Exporter texte, règles et interprétation (20).

**Acceptation :** texte modifiable avant jeu ; distinction entre génération grammaticale et modèle de langue ; note sur les clichés et langues minorées. **Repli :** grammaire locale intégrale. **Notions :** grammaire générative, JSON, variable, contrainte, prosodie, contexte, température, hallucination.

## 6 — Partitions en circulation

**Question :** comment une même décision devient-elle son, écran et papier ?

**Pas à pas :** 1. Décrire quatre mesures sous forme d’événements JSON : hauteur MIDI, durée en temps, vélocité (25). 2. Les jouer avec Web Audio (25). 3. Demander un convertisseur vers VexFlow, version explicitement fixée (35). 4. Afficher le curseur de jeu et permettre une correction de note (25). 5. Exporter un fichier `.ly` simple (25). 6. Installer LilyPond Windows/macOS selon la page officielle ; rendre le PDF **sur l’ordinateur**, pas sur Pages (25). 7. Comparer durée, hauteur et silence dans les trois formats (20).

**Acceptation :** une même note corrigée apparaît dans l’audio, VexFlow et le PDF. **Repli :** l’enseignant rend les fichiers `.ly` sur sa machine. **Notions :** MIDI, événement musical, durée, SVG, gravure, compilation, fichier source, rendu.

## 7 — Jouer à distance

**Question :** la latence devient-elle une contrainte de composition ? Commencer avec des messages de contrôle ; le son est synthétisé localement sur chaque machine.

**Pas à pas :** 1. Faire un protocole de duo sur papier (20). 2. Créer deux pairs WebRTC et échanger manuellement les offres/réponses après la collecte des candidats ICE (40). 3. Ajouter un canal de données et un chat limité aux consignes musicales (30). 4. Envoyer note, durée et numéro de séquence ; borner les valeurs reçues (25). 5. Tester deux réseaux et noter les échecs (20). 6. Introduire retard et pertes simulés pour composer une réponse (25). 7. Enregistrer les deux sorties et rédiger le protocole (20).

**Acceptation :** un message provoque un son sur l’autre ordinateur ; affichage « déconnecté » ; pas de supposition de synchronie parfaite. STUN ne suffit pas sur tous les réseaux : TURN peut nécessiter un service ; repli local/deux onglets et simulation, sans promesse de gratuité universelle. Vercel peut traiter la signalisation HTTP ; une fonction ordinaire n’est pas un serveur WebSocket permanent. **Notions :** pair, WebRTC, signalisation, ICE, STUN, TURN, latence, canal de données.

## 8 — Dataset et composition contrôlée

**Question :** quels éléments d’une chanson voulons-nous réellement déléguer ? Le « DIY Suno » désigne ici un assemblage pédagogique contrôlable ; sa qualité et sa portée ne sont pas celles d’un générateur commercial de chansons.

**Pas à pas :** 1. Choisir une forme A–B–A, 60–90 s (20). 2. Constituer 12 samples originaux et quatre cellules mélodiques (30). 3. Stocker tags, provenance et événements dans des JSON, sans serveur (25). 4. Apprendre une table de transitions Markov sur les cellules, examiner les probabilités (30). 5. Composer un arrangeur : choisir un sample par tag et une cellule compatible avec la section (30). 6. Ajouter verrouillage de section et bouton « proposer trois variantes » (25). 7. Exporter stems WAV, arrangement JSON et attribution (20).

**Acceptation :** un stem peut être remplacé sans régénérer le reste ; graine aléatoire enregistrée ; corpus inspectable. **Repli :** table écrite à la main, annoncée comme telle. MAESTRO/ESC-50 servent à l’étude et à une sélection préparée, pas à un téléchargement massif en classe. **Notions :** corpus, dataset, chaîne de Markov, transition, probabilité, graine, stem, provenance.

## 9 — Modèle préentraîné comme partenaire

**Question :** le modèle améliore-t-il notre pratique par rapport à une solution lisible ? Choisir **un** parcours selon les machines, pas trois installations.

**Pas à pas :** 1. Lire la fiche du modèle, licence, entrées/sorties et limites (25). 2. Utiliser Whisper tiny pour transcrire une phrase ou CLAP pour suggérer trois descriptions de samples (35). 3. Charger le modèle navigateur dans un Worker ; afficher progression et annulation (30). 4. Mettre en cache les résultats avant le concert : aucun appel LLM par grain (25). 5. Comparer trois résultats aux annotations humaines (25). 6. Demander une correction au code puis vérifier les trois cas (20). 7. Exporter résultats, version et commentaire critique (20).

**Extension facultative :** MusicGen small dans une démonstration HF disponible ou une machine préparée par l’enseignant ; créer un fragment bref, le télécharger, le jouer ensuite avec le sampler. Ce modèle n’est pas un synthétiseur temps réel léger pour tous les portables. **Repli :** résultats JSON précalculés et clairement identifiés. **Notions :** modèle préentraîné, poids, tokenizer, quantification, Worker, cache, coût d’inférence, biais.

## 10 — Concert et fabrication critique

**Question :** l’œuvre permet-elle de comprendre ce qu’elle délègue ?

**Pas à pas :** 1. Choisir une intention et deux critères audibles (20). 2. Geler une version jouable et vérifier tous les chemins essentiels (30). 3. Relire journal, licences et sources (20). 4. Répéter avec une panne de réseau et un capteur refusé (30). 5. Publier et tester l’URL sur un autre appareil (20). 6. Présenter une performance de 3 minutes et une décision de l’agent refusée (40, adapter à l’effectif). 7. Échanger une critique et archiver les sources/stems (20).

**Acceptation :** URL, sources, audio, notice d’utilisation, bibliographie et journal. **Notions :** version, régression, robustesse, reproductibilité, attribution, accessibilité, autonomie, maintenance.

## Évaluation continue

L’effet spectaculaire est un point d’entrée, pas le critère unique. On évalue aussi les décisions musicales, la capacité à expliquer les actions du système, les transformations du patron initial et la possibilité de rejouer le projet. Grille détaillée dans [[Organisation - conduite et évaluation]].
