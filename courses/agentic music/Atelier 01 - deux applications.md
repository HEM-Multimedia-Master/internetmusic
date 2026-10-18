---
type: note
title: Atelier 01 — deux applications pas à pas
tags: [atelier, agentic-music]
---
# Atelier 01 — deux applications pas à pas

Garder ce guide à côté de l’instrument. Préparer les outils selon [[Installation - Windows et macOS]]. La présentation [[classe-01-machines-qui-ecoutent]] sert à l’explication collective ; ce guide sert à refaire chaque geste.

## Avant de jouer

1. Copier **tout** `applications/` dans un dossier personnel `agentic-music-prenom`.
2. Ouvrir la copie dans VS Code, puis son `index.html` avec Live Server.
3. Dans le navigateur externe, ouvrir l’accueil. Commencer à faible volume avec un casque.
4. Créer une copie de [[Journal - modèle étudiant]] dans ses notes personnelles.
5. Écrire une intention : « Je veux que… », avec un effet audible.

## Application 1 — Écho des états

### A. Observer la politique

1. À l’accueil, cliquer **Jouer Écho**.
2. Conserver **Source : Curseur** ; cliquer **Démarrer**.
3. Régler **Énergie simulée** à 0.10 ; attendre environ deux secondes. Résultat : état calme, registre grave.
4. Passer à 0.40 ; attendre. Résultat : état actif, registre intermédiaire.
5. Passer à 0.90 ; attendre. Résultat : état dense, registre plus aigu.
6. Revenir à 0.10 ; noter le retour progressif. Le système conserve une mémoire courte ; il ne réagit pas uniquement à la dernière valeur.
7. Déplier **Comprendre la décision** : la politique écrite est visible.

### B. Jouer et reprendre la décision

1. Glisser dans la zone gestuelle : X change le panorama, Y le volume. Shift maintient le volume pendant le geste horizontal.
2. Les curseurs **Volume** et **Panorama** permettent aussi le jeu au clavier.
3. Décocher **Politique automatique** ; choisir **État manuel : Actif**. L’état manuel apparaît après le bref délai prévu entre changements.
4. Recocher l’aide ; comparer l’effet sur votre jeu.
5. Cliquer **Arrêter**. Vérifier silence, puis redémarrer une seule fois. Des clics répétés sur Démarrer ne doivent pas multiplier les voix.

### C. Essayer le microphone, facultatif

1. Arrêter ; choisir **Source : Microphone**, puis démarrer.
2. Autoriser le micro du navigateur. Si besoin, consulter les réglages système du guide d’installation.
3. Jouer un geste sonore doux puis plus énergique. Ajuster **Sensibilité du micro** selon le niveau réel.
4. Observer l’état : le système mesure le niveau, pas les mots ni les émotions.
5. Arrêter. Vérifier que l’indicateur d’utilisation du micro s’éteint. Si l’accès échoue, conserver le mode curseur et noter la panne.

### D. Transformer avec l’agent

1. Dans VS Code, ouvrir `echo/politique.js`.
2. Dans le chat, joindre ce fichier et `echo/app.js`.
3. Copier le prompt « lire avant de modifier » du [[Protocole - agentic engineering]]. Lire son explication.
4. Copier le prompt qui remplace le registre actif de 220 Hz par 165 Hz.
5. Lire la différence proposée et garder le changement si elle respecte le contrat. Sans mode agent disponible, modifier cette valeur à la main.
6. Sauvegarder, laisser Live Server recharger, puis cliquer Démarrer.
7. Refaire les trois énergies ; comparer avant/après. Noter votre choix musical, pas seulement « ça marche ».

### E. Exporter

1. Jouer 12 secondes en variant les trois états.
2. Cliquer **Exporter 12 s en WAV**.
3. Le fichier reconstruit les décisions de synthèse récentes ; il ne contient pas la voix micro. Un historique plus court est complété de silence.
4. Ouvrir le WAV dans un lecteur audio. Renommer votre copie avec une date et la version.

**Points d’acceptation :** trois registres observés ; aide désactivable ; arrêt effectif ; un changement expliqué ; WAV audible.

## Application 2 — Nuage appris

### A. Charger une matière

1. Revenir à l’accueil et cliquer **Jouer Nuage**.
2. Cliquer **Charger la démo** : un WAV original de 9 secondes apparaît.
3. Repères de la démo : 0–3 s sinus grave ; 3–6 s son harmonique ; 6–9 s bruit.
4. Choisir une position et cliquer **Écouter ce fragment**.
5. Alternative : importer le WAV d’Écho, votre WAV ou un MP3 décodable. Limites : 20 Mo et 60 secondes.
6. Alternative micro : cliquer **Capturer 4 s au micro**, autoriser l’accès, attendre la fermeture automatique. **Arrêter tout** annule immédiatement la capture ; importer un fichier si le format du navigateur ne se décode pas.

### B. Construire le petit jeu d’exemples

1. Avec la démo, régler la position vers 0.5 s ; choisir **Calme** ; cliquer **Ajouter ce fragment comme exemple**.
2. Refaire vers 1.0 et 1.5 s avec la même étiquette.
3. Vers 3.5, 4.0 et 4.5 s, choisir **Actif** et ajouter les fragments.
4. Vers 6.5, 7.0 et 7.5 s, choisir **Dense** et ajouter les fragments.
5. Pour votre propre son, choisir les catégories selon votre écoute, sans réutiliser aveuglément les positions de la démo.
6. Déplier **Centroïdes appris et limites** : les valeurs sont calculées à partir des exemples. Le mapping de catégorie vers texture reste une décision écrite dans le code.
7. Cocher **Utiliser le modèle appris**. Le programme exige au moins deux catégories ; trois sont proposées pour cette activité.

### C. Jouer et comparer

1. Cliquer **Jouer les grains**.
2. Déplacer X vers différentes matières ; Y règle le volume. Avec Shift, X conserve le volume.
3. Observer la catégorie proposée et la texture. La décision utilise deux mesures simples ; elle ne reconnaît ni genre ni émotion.
4. Décocher l’aide ; régler taille, densité et vitesse. Ces curseurs manuels servent de repli et de comparaison.
5. Recocher l’aide ; noter si elle ouvre une possibilité musicale intéressante.
6. Choisir un fragment non utilisé pour apprendre, par exemple 2.2, 5.2 ou 8.2 s sur la démo. Noter attendu/prédit.
7. En cas de désaccord, ajouter un contre-exemple et comparer. Une distance trop grande provoque un repli manuel ; ce n’est pas un score de confiance.
8. Arrêter tout, puis reprendre. Les instruments s’arrêtent aussi lorsque leur onglet est masqué.

### D. Petite édition avec l’agent, facultative

1. Joindre `nuage/app.js` et `nuage/modele.js` au chat.
2. Demander d’expliquer ce qui est appris et ce qui est fixé.
3. Demander uniquement de passer le preset calme de 160 à 200 ms.
4. Inspecter la différence, recharger, réapprendre les exemples (ils restent en mémoire de la page), puis comparer.
5. Garder ou refuser la modification dans le journal. Ne pas accepter une réécriture du moteur comme réponse à ce changement ciblé.

### E. Exporter et comprendre ce qui est conservé

1. Choisir une position et les paramètres retenus.
2. Cliquer **Exporter la scène en WAV (12 s)** : rendu de ces paramètres figés, pas enregistrement de vos gestes.
3. Cliquer **Exporter la source en WAV** pour conserver une capture ou un import décodé.
4. Cliquer **Exporter le modèle JSON** : il contient exemples, positions, centroïdes, échelles et seuil de rejet. La version actuelle ne réimporte pas ce JSON.
5. Écouter le WAV dans un autre lecteur ; ouvrir le JSON dans VS Code pour retrouver un exemple.

**Points d’acceptation :** fichier chargé ; au moins deux catégories ; fragment inédit testé ; manuel jouable ; WAV et JSON exportés.

## Publier et rendre

1. Suivre [[Publication - GitHub Pages et Vercel]], parcours A sans terminal ou parcours B avec Git.
2. Tester l’URL sur un autre appareil ; noter tout test qui reste à faire.
3. Compléter deux fiches parmi les huit du glossaire ; expliquer une fiche à un partenaire.
4. Rendre URL, deux WAV, JSON, journal et un changement expliqué.

## Pannes fréquentes

| Symptôme | Action |
|---|---|
| Aucun son | Cliquer Démarrer/Jouer, vérifier volume système et source de sortie ; tester les curseurs |
| Démo introuvable | Ouvrir par Live Server et conserver tous les sous-dossiers |
| Micro refusé | Permissions navigateur et système ; sinon curseur/démo |
| Les états ne changent pas | Attendre le lissage, vérifier aide active et sensibilité |
| Aide de Nuage impossible | Ajouter des exemples dans au moins deux catégories |
| Modèle imprécis | Comparer les exemples et les descripteurs ; conserver l’erreur puis corriger le corpus |
| Après une édition, plus de son | Lire la première erreur de console, revenir à la version précédente, demander une correction ciblée |
| Pages affiche 404 | Attendre le build, vérifier branche et index.html à la racine |

Les résultats vérifiés lors de la préparation et les limites sont documentés dans [[Audit - sources et vérification]].
