---
type: note
title: Publication — une URL jouable
tags: [publication, git, agentic-music]
---
# Publication — GitHub Pages et Vercel

Publier **la copie du dossier `applications/`**, pas le vault entier, les PDF ou les notes personnelles. À la racine du dépôt étudiant, on doit trouver `index.html`, `echo/`, `nuage/`, `commun/`, `assets/` et `.nojekyll`.

## A. GitHub Pages — parcours principal sans terminal

1. Sur GitHub : **New repository** → nom `agentic-music-prenom` → **Public** → cocher l’ajout d’un README → **Create repository**.
2. Choisir **Add file → Upload files**. Glisser le **contenu** du dossier d’applications, avec ses sous-dossiers. Ne pas glisser un dossier parent supplémentaire.
3. Écrire un message de version, par exemple « Deux instruments et première décision musicale ». Cliquer **Commit changes**.
4. Si `.nojekyll` n’a pas été inclus parce qu’il est caché : **Add file → Create new file**, nom `.nojekyll`, saisir une ligne vide et valider.
5. **Settings → Pages → Build and deployment → Source : Deploy from a branch**.
6. Choisir **main** et **/(root)**, puis **Save**.
7. Attendre la fin de la publication ; consulter **Actions** en cas de problème. Pages affiche l’URL, généralement `https://PSEUDO.github.io/agentic-music-prenom/`.
8. Ouvrir cette URL dans un autre navigateur puis sur téléphone. Le son demande toujours un clic ; le micro demande une autorisation.
9. Coller l’URL dans le journal Obsidian, avec la date, les appareils testés et les éventuels échecs.

Tous les chemins de ces applications sont relatifs ; ils supportent le sous-dossier du dépôt. La présence d’un dépôt privé ne garantit pas un site privé. [Configurer Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## B. Éditer et publier directement depuis `github.dev` (VS Code dans le navigateur — sans terminal)

1. Ouvrir votre dépôt sur GitHub (`https://github.com/PSEUDO/agentic-music-prenom`).
2. **Appuyer sur la touche `.` (point) du clavier** : l'éditeur **VS Code pour le Web (`[[github-dev]]`)** s'ouvre instantanément dans l'onglet du navigateur.
3. Ouvrir le fichier souhaité (`index.html`, `echo/politique.js`, ou `03_photo_console_webaudio_matrix/index.html`) et effectuer la modification avec l'aide du panneau **[[copilot]] Chat**.
4. Cliquer sur l'icône **Source Control** dans la barre latérale gauche (trois cercles reliés par une branche) :
   - Cliquer sur le fichier modifié pour inspecter les différences ligne par ligne (équivalent visuel de `git diff`).
   - Écrire un court message expliquant la décision musicale (ex. *« Ajout d'un knob rotatif assigné au feedback Delay → FM »*).
   - Cliquer sur **Commit & Push**.
5. GitHub Pages (ou Vercel) redéploie automatiquement la nouvelle version en quelques secondes sur l'URL HTTPS publique. Aucun `git` local ni terminal n'est nécessaire.

## C. Vercel — alternative pour un projet personnel

1. Créer un compte sur [Vercel](https://vercel.com) et le relier à GitHub.
2. **Add New → Project → Import Git Repository**, choisir le dépôt étudiant.
3. **Framework Preset : Other**. Choisir la racine du dépôt comme **Root Directory**. Pour ces fichiers statiques : pas de commande de build ; **Output Directory : `.`** si le formulaire demande une valeur explicite. Vérifier le résumé avant **Deploy**.
4. Ouvrir l’URL de production HTTPS et refaire les essais des deux applications.
5. Une nouvelle version poussée à la branche de production déclenche normalement une nouvelle publication.

Documentation : [déploiements](https://vercel.com/docs/deployments), [plan Hobby](https://vercel.com/docs/plans/hobby). Le plan Hobby est destiné à un usage personnel non commercial et a des quotas ; l’hébergement institutionnel se décide séparément. Pages reste la voie principale du cours.

## D. Plus tard : modèles et clés

GitHub Pages sert des fichiers statiques et n’exécute pas LilyPond ni des appels secrets à un modèle. Une intégration à une API payante nécessite un petit serveur ou une fonction, avec secret côté serveur, validation des entrées et limite de requêtes. Le cours 1 n’en utilise aucun. Déployer un frontend sur Vercel ne rend pas automatiquement l’inférence gratuite.

## Vérification de l’URL

- Écho démarre, les états changent, l’arrêt coupe le son et le micro.
- Nuage charge la démo et un WAV, apprend deux catégories et joue des grains.
- Les WAV téléchargés sont audibles ; le JSON contient exemples et centroïdes.
- La fenêtre se redimensionne ; les boutons sont accessibles sur téléphone.
- Le refus du micro laisse un parcours jouable.
- Aucun secret ni fichier de bibliothèque personnelle ne figure dans le dépôt.
