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

## B. Même publication depuis VS Code et Git

**Choisir B au lieu de l’upload A pour le contenu initial.** Créer cette fois un dépôt GitHub **vide**, sans README ni licence. Dans VS Code, ouvrir la copie des applications, puis **Terminal → New Terminal**.

> [!info] Enregistrer une première version
> Remplacer l’adresse du dépôt. Ces commandes sont les mêmes dans PowerShell et le terminal macOS.
> ```bash
> git init
> git branch -M main
> git add .
> git commit -m "Premiers hyperphones"
> git remote add origin https://github.com/PSEUDO/agentic-music-prenom.git
> git push -u origin main
> ```

Si Git demande une identité, configurer **dans ce dépôt** :

> [!info] Identité de version
> ```bash
> git config user.name "Votre nom"
> git config user.email "Votre adresse GitHub ou adresse noreply GitHub"
> ```
> Relancer ensuite `git commit`, puis `git push`. L’authentification peut ouvrir un navigateur ou le gestionnaire d’identifiants ; utiliser le parcours de connexion proposé. Le mot de passe GitHub ordinaire n’est pas une authentification Git HTTPS.

Ensuite suivre les étapes 5–9 du parcours A. Pour une modification :

> [!info] Inspecter puis publier la modification
> ```bash
> git diff
> git add echo/politique.js
> git commit -m "Registre actif abaissé après écoute"
> git push
> ```
> `git diff` montre ce qui a changé. `git add` sélectionne le fichier. `commit` garde une version. `push` la partage et déclenche la publication configurée.

Si le dépôt distant contient déjà des fichiers, le cloner d’abord avec VS Code ou GitHub Desktop ; ne pas forcer le push pour effacer son historique. La voie graphique **Source Control → Stage → Commit → Sync** convient aussi.

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
