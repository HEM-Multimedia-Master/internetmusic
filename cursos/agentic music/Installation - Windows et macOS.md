---
type: note
title: Installation — Windows et macOS
tags: [organisation, installation, agentic-music]
---
# Installation — Windows et macOS

Préparer 30–45 minutes avant la séance. Le parcours principal évite Node.js, Python et tout GPU dédié. Apporter un casque, un ordinateur, et facultativement un téléphone.

## 1. Obsidian et le cours

1. Installer [Obsidian](https://obsidian.md/download) pour votre système.
2. Ouvrir le vault fourni avec **Open folder as vault**. Le dossier du cours est `cursos/agentic music`.
3. Ouvrir [[agentic music MOC]], puis [[classe-01-machines-qui-ecoutent]].
4. Dans **Settings → Community plugins**, rechercher **Advanced Slides**, installer et activer si nécessaire. Dans le vault de référence, il est déjà présent, version 1.20.0.
5. Ouvrir la palette de commandes : `Ctrl+P` sur Windows ; `Cmd+P` sur Mac. Rechercher la commande **Advanced Slides: Show slide preview** (ou la commande d’aperçu équivalente de la version installée).
6. Pour le mode présentateur, ouvrir la présentation dans le navigateur puis appuyer sur `S`. Autoriser la fenêtre secondaire si demandée. Les lignes placées après `notes:` appartiennent aux notes du présentateur.
7. Si Mermaid ne s’affiche pas, lire le texte explicatif adjacent. Aucun diagramme ne doit être nécessaire pour comprendre une consigne.

## 2. GitHub et Education

1. Créer un compte gratuit sur [GitHub](https://github.com), vérifier votre adresse courriel.
2. Si vous êtes étudiant, demander la vérification sur [GitHub Education](https://education.github.com/pack) avec les justificatifs demandés. Cette validation peut prendre du temps ; elle n’est pas nécessaire pour la séance 1.
3. Consulter **Settings → Copilot** pour connaître le plan accessible. Au contrôle du 2 octobre 2026, les étudiants vérifiés peuvent accéder au plan **Copilot Student** ; les comptes non vérifiés peuvent utiliser **Copilot Free**, avec limites. Ne pas supposer un choix illimité de modèles : les plans Free et Student indiquent la sélection automatique. [Documentation des plans](https://docs.github.com/en/copilot/get-started/plans).
4. Si les crédits sont épuisés, suivre les modifications guidées à la main, ou travailler en binôme avec un compte disponible. Aucun paiement n’est requis pour les applications livrées.

> [!important] GitHub n’est pas un GPU gratuit
> **GitHub Models a été retiré le 30 juillet 2026.** Le catalogue, le playground et l’API de ce service ont fermé. Copilot est un service distinct. Un compte Education ne transforme pas GitHub Pages en serveur de modèles. [Annonce dans la documentation officielle](https://docs.github.com/en/github-models).

## 3. VS Code et l’agent

1. Installer [Visual Studio Code](https://code.visualstudio.com/download) : Windows Installer ou application macOS.
2. Dans VS Code, **File → Open Folder…**, ouvrir une copie du dossier `applications/`, nommée `agentic-music-prenom`. Garder ensemble tous ses sous-dossiers.
3. Accepter la confiance du dossier uniquement pour cette copie de cours que vous inspectez.
4. Activer les fonctions de chat/Copilot proposées par VS Code et se connecter au compte GitHub. Selon la version, l’interface peut proposer des extensions Copilot ou l’intégration native.
5. Ouvrir la vue Chat. Utiliser **Ask** pour expliquer, puis **Agent** pour une modification de fichiers si ce mode est accessible dans le compte. Choisir le modèle automatique des plans gratuits.
6. Ajouter le fichier pertinent au contexte avec **Add Context** / sélection d’un fichier. Pour Écho : `echo/politique.js`. Demander un plan court avant toute édition.
7. Lire les changements proposés. Garder ou annuler les modifications via la vue des différences. [Chat VS Code](https://code.visualstudio.com/docs/chat/chat-overview).

**GitHub dans le navigateur :** presser `.` dans un dépôt ouvre un éditeur web pratique pour les petits fichiers, mais ce n’est pas un serveur local et il n’offre pas nécessairement tous les outils d’un agent. Pour le micro et les imports, utiliser VS Code desktop + navigateur externe. Codespaces est une option à quotas, pas une exigence.

## 4. Ouvrir les deux instruments

1. Dans VS Code, ouvrir Extensions et chercher **Live Server**, éditeur Ritwick Dey. Installer.
2. Clic droit sur `index.html` à la racine de la copie → **Open with Live Server**.
3. Ouvrir l’URL affichée, typiquement `http://127.0.0.1:5500/`, dans Chrome ou Edge récent, ou Safari récent sur Mac. Le port peut varier.
4. Choisir Écho ; cliquer **Démarrer** ; bouger **Énergie simulée**. Le premier son ne démarre qu’après le clic.
5. Arrêter ; revenir à l’accueil ; ouvrir Nuage et cliquer **Charger la démo**.
6. Si la démo ne charge pas, vérifier que `assets/demo-originale.wav` existe et que la page est ouverte via localhost, pas simplement par double-clic sur un HTML.

> [!tip] Variante terminal, facultative
> Si Node.js est déjà installé, ouvrir le terminal **dans le dossier des applications** :
> ```bash
> npx --yes serve .
> ```
> Première exécution : téléchargement du petit serveur `serve`. Ouvrir l’URL locale affichée. `Ctrl+C` arrête le serveur. Node.js n’est pas requis avec Live Server.

## 5. Microphone : différence entre systèmes

| Système | Si le micro est refusé |
|---|---|
| Windows | **Settings → Privacy & security → Microphone** : autoriser l’accès et les applications desktop ; vérifier ensuite la permission du site dans le navigateur |
| macOS | **System Settings → Privacy & Security → Microphone** : autoriser le navigateur ; le relancer si demandé ; vérifier aussi la permission du site |
| Navigateur | Cliquer l’icône des permissions à gauche de l’URL ; choisir le bon micro ; fermer les autres applications qui le monopolisent |

Les libellés système varient selon version. Le micro web demande un contexte sécurisé : HTTPS ou localhost. Sur un téléphone, `http://192.168…` n’est généralement pas un contexte sécurisé ; utiliser l’URL HTTPS publiée. Source : [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

Si l’accès reste impossible, Écho possède un curseur de repli et Nuage une démo locale. La participation ne dépend pas du microphone.

## 6. Git local, facultatif pour le premier rendu

Pour versionner avec les commandes du cours, installer [Git](https://git-scm.com/downloads) sur Windows. Sur Mac, utiliser un installateur proposé ou les outils en ligne de commande Apple lorsque le système le demande. GitHub Desktop constitue une alternative graphique sur les deux systèmes. L’upload par navigateur reste possible.

> [!info] Vérifier Git dans le terminal intégré
> ```bash
> git --version
> ```
> Résultat attendu : un numéro de version. « Command not found » indique que Git manque ou que VS Code doit être relancé.

Pour publier, suivre [[Publication - GitHub Pages et Vercel]]. L’enseignant n’a pas à installer LilyPond, un moteur GPU ou une API payante avant la séance 1.
