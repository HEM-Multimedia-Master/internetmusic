---
type: note
title: Audit — sources et vérification
tags: [organisation, vérification, agentic-music]
status: nonshown
---
# Audit — sources et vérification

Préparation du 2 octobre 2026. Ce document distingue ce qui a été lu, produit et testé de ce qui reste à vérifier sur les appareils de classe.

## Périmètre du vaultttt

Le parcours global a inventorié **501 notes Markdown**, soit environ 1,030,708 caractères, hors plugins, dépendances et données de configuration privées. Les textes ont été parcourus pour repérer titres, conventions de classe, références hyperphones, blocs Mermaid et format de notes. Ce travail n’est pas une lecture critique ligne à ligne de chaque note historique.

Lecture détaillée des fichiers structurants : `MANUAL.md`, `README.md`, `assets/tpl/t-class.md`, `assets/tpl/t-dict.md`, `cursos/internetmusic/_index.md`, `cursos/internetmusic/agentic-music-class.md`, la classe modèle `legacy/1-classes/02-setup/class-02-25-setup.md`, les repères de FM/vibecoding et `HEM-INTERNET MUSIC NOTES 260918.md`. Les paramètres utiles d’Advanced Slides ont été examinés sans modifier sa configuration.

Aucun fichier autonome nommé « instructions hyperphones » n’a été retrouvé. Le contrat reprend les consignes effectivement présentes dans la note HEM et la classe FM, avec des adaptations annoncées dans [[Hyperphones - contrat de conception]].

Les dossiers complémentaires `01_hf_audio_10_steps/` et `02_llm_webaudio_vexflow/` sont apparus pendant le travail. Ils ont été laissés intacts, ne sont pas présentés comme des livrables de cette préparation et ne sont pas inclus dans la copie de livraison. Les liens et essais de cet audit concernent les nouveaux guides et `applications/`.

## Livres

Extraction du texte des deux PDF fournis, lecture des tables des matières et des passages pertinents. Lecture détaillée des pages sur créativité, divergence/convergence, systèmes experts, machines humbles et cocréation chez Ackerman ; introduction et patrons de fabrication critique, Tracery et génération chez Johnson/Salter. Les synthèses et exercices distinguent propositions des auteurs, patron effectivement décrit et transposition musicale du cours.

Les numéros cités sont ceux des pages imprimées : +12 pour le PDF Ackerman, +15 pour Johnson/Salter. Les PDF et leurs images ne sont pas copiés dans le cours ou les applications. Voir [[Lectures - concepts et exercices]].

## Vérifications des applications

Navigateur : **Chrome en mode de test sur macOS**. Microphone : **source synthétique**, sans capture du matériel réel de l’utilisateur. Les essais incluent les pistes libérées (`readyState: ended`) après arrêt/capture. Nombre de cas vérifiés : **14**. Aucune erreur JavaScript d’application recueillie.

| Essai | Résultat |
|---|---|
| Écho : énergie faible, forte, arrêt et reprise | OK |
| Écho : export WAV | OK |
| Écho : micro synthétique et libération des pistes | OK |
| Nuage : chargement démo, apprentissage et inférence sur fragment inédit | OK |
| Nuage : export modèle et scène WAV | OK |
| Nuage : jeu, modification live, manuel, arrêt et reprise | OK |
| Nuage : import WAV et remise à zéro des exemples | OK |
| Nuage : capture micro synthétique de quatre secondes | OK |
| Nuage : capture annulée et reprise disponible | OK |
| echo : largeur mobile sans dépassement | OK |
| nuage : largeur mobile sans dépassement | OK |
| Modèle : distance excessive renvoie au manuel | OK |
| Écho : refus du micro et retour au curseur | OK |
| Nuage : import MP3 | OK |

Les exports produits par les essais ont été ouverts comme WAV PCM : scène Écho 12 s/stéréo, scène Nuage 12 s/stéréo, source de démonstration 9 s/mono. Leurs échantillons sont non nuls et sous le seuil de saturation. Cette vérification numérique ne remplace pas l’écoute artistique sur le système de diffusion de la classe.

Le MP3 d’essai a été encodé à partir du WAV original du cours, puis importé avec le navigateur. Le JSON exporté contient les exemples, les centres, les échelles et le seuil de rejet. Un cas inédit de la démo a été classé comme attendu ; ce n’est pas une mesure de précision générale.

Les interfaces ont été contrôlées à 390 px de largeur en émulation, sans dépassement horizontal, et sur une fenêtre desktop. Un débordement de bouton mobile a été corrigé avant le dernier contrôle. La simulation mobile n’est pas un essai sur téléphone physique.

## Présentation

La classe a été rendue par le **serveur local du plugin Advanced Slides 1.20.0 du vault**, puis inspectée dans un navigateur de test. Résultats : **39 slides, 39 notes de présentation, 3 diagrammes Mermaid et 12 callouts**. Les notes sont retirées du contenu étudiant des slides. Contrôle des limites de contenu sur chaque slide et inspection visuelle de la couverture, des concepts, des prompts et du pas à pas ; pas de débordement détecté après ajustement de la typographie et retour à la ligne des commandes.

Le rendu autonome dans un navigateur produit des messages du pont `postMessage` du plugin vers Obsidian. Ils concernent le lien avec l’application hôte ; le corps des slides, les notes et les diagrammes ont été rendus. Le plugin n’a pas été modifié. Le lien Imgur de la classe ancienne ne chargeait pas ; la nouvelle couverture évite l’image cassée et conserve des diagrammes locaux.

## Contrôles documentaires

- Liens Obsidian des nouveaux fichiers vérifiés hors exemples de code : toutes les notes ciblées existent.
- Métadonnées de cours et de classe alignées sur le MANUAL du vault.
- Français pour les supports ; définitions françaises et anglaises dans les callouts et fiches.
- Pas de nouvelle dépendance nécessaire au jeu des deux instruments.
- Sources techniques officielles contrôlées : GitHub/Copilot/Pages, VS Code, Hugging Face, MDN, VexFlow, LilyPond et Vercel. Les liens et conditions utiles se trouvent dans [[Ressources - modèles et datasets]].
- Correction temporelle : GitHub Models est retiré depuis le 30 juillet 2026 ; Education/Copilot restent distincts de ce service.

## Vérifications encore nécessaires

1. Lecture et permissions du microphone matériel sur les ordinateurs Windows/macOS des étudiants.
2. Safari, Firefox et appareils mobiles physiques ; comportement du plein écran selon navigateur.
3. Déploiement réel dans les dépôts étudiants et contrôle des URLs HTTPS publiées.
4. Disponibilité/performances et quotas du modèle HF choisi avant la séance 9.
5. Signalisation/TURN et réseaux de l’établissement avant le duo WebRTC.
6. Compilation LilyPond au moment de préparer la séance 6.
7. Retour pédagogique après un essai : durée effective, rythme d’installation et difficulté du glossaire.

Ces limites ne sont pas des tâches prétendument accomplies. La première séance et ses deux applications sont livrées ; les séances 2–10 disposent d’un plan, pas encore de présentations complètes.
