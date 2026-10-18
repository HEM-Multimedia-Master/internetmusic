---
type: note
title: Hyperphones — contrat de conception
tags: [hyperphones, conception, agentic-music]
---
# Hyperphones — contrat de conception

**Définition de travail du cours :** un hyperphone est un instrument musical web jouable par une URL, adaptable à différents appareils et extensible par des entrées, des états ou des échanges en réseau. L’accès par Internet ne signifie pas que chaque calcul sonore doive être réalisé à distance.

## Consignes retrouvées dans le vault

La note `HEM-INTERNET MUSIC NOTES 260918.md` demande : plein écran, fenêtre redimensionnable et adaptation desktop/mobile/tablette ; mentionne console, curseur en croix, interface sombre/HUD, Shift, Y → volume et X → panorama. La classe `legacy/1-classes/05-im coding/05-im1-fmsynth.md` prolonge cette conception avec Web Audio et des mappings explicites.

Ces exigences ont été reprises dans les références de la séance 1 : interfaces adaptatives, zones gestuelles, retour d’état, commandes d’arrêt, bouton plein écran avec message si indisponible. Écho utilise X → panorama et Y → volume. Nuage utilise X → position dans le sample et Y → volume ; cette adaptation de X est annoncée à l’écran. Shift conserve le volume pendant le déplacement horizontal. Les curseurs permettent aussi le jeu au clavier.

Aucun fichier autonome nommé « instructions hyperphones » n’a été retrouvé dans l’arborescence examinée. Ce contrat documente les consignes effectivement présentes, puis nos ajouts pédagogiques.

## Contrat minimum pour chaque production

1. **Accès :** une URL HTTPS, sans obligation de compte pour jouer.
2. **Ubiquité :** boutons visibles sur ordinateur et téléphone ; pas d’action réservée au survol de souris.
3. **Geste :** au moins deux commandes musicales identifiables ; alternative par curseur pour un capteur absent.
4. **Retour :** afficher l’état courant, le mode manuel/appris et une erreur compréhensible.
5. **Contrôle :** le son démarre par un geste ; arrêt coupe le son et les pistes du micro ; volume accessible.
6. **Décision :** dire ce qui est choisi par l’humain, écrit comme règle ou appris.
7. **Trace :** export audio et notice permettant de rejouer une scène.
8. **Maintenance :** sources lisibles et version conservée ; fonctionnement de base lorsque l’API externe manque.

## Temps réel : trois sens à distinguer

- **Paramètres pendant le jeu :** volume, position, taille des grains et choix du mode changent immédiatement dans l’instrument.
- **Édition du code :** sauvegarde dans VS Code, rechargement du navigateur puis redémarrage volontaire. Les références n’appliquent pas du nouveau code à un graphe sonore déjà actif ; Live Server recharge la page.
- **Décision d’un modèle distant :** délai variable ; la calculer en amont ou entre sections, puis transmettre des paramètres au moteur audio local. Ne pas attendre une réponse réseau à chaque grain.

Cette distinction évite de présenter une réponse d’un chat comme un moteur audio continu.
