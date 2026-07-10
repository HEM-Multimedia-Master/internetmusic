# Musique et Technologie

Ce dépôt est la source de référence du vault Obsidian et des contenus LMS pour `Musique et Technologie`.

## Structure

- `cursos/` contient les supports privés utilisés par le LMS.
- `public/` contient les notes publiques soumises à pull request et revue éditoriale.
- `draft/` sert d'incubateur pour matériaux, rendus étudiants et ressources de soutien.
- `.github/workflows/notify-platform-on-content-change.yml` notifie le webhook content-bus du framework.

## Collaboration rules

- `public/**` uniquement via pull requests.
- `cursos/**` peut recevoir des pushes directs pour le travail pédagogique quotidien.
- `draft/**` est une zone de préparation et ne publie pas directement.
- les contributions étudiantes doivent arriver par PR et rester dans `draft/estudiantes/**` jusqu'à revue enseignante.
- Les changements du framework se font dans `HEM-Multimedia-Master/framework`, pas ici.

## GitHub setup

Ajoutez ce secret au dépôt :

- `CONTENT_BUS_SECRET`: secret bearer partagé pour `https://hem.zztt.org/api/webhook/content-update`.

Optionnel seulement si vous conservez aussi un workflow legacy `repository_dispatch` :

- `PLATFORM_DISPATCH_TOKEN`: token allowed to trigger `repository_dispatch` on `HEM-Multimedia-Master/framework`.

## Équipes

- Équipe pédagogique : `@HEM-Multimedia-Master/docentes-multimedia`
- Équipe éditoriale : `@HEM-Multimedia-Master/editorial`
- Développement : `@HEM-Multimedia-Master/devs`

## Premières tâches après le scaffold

1. Remplacer les notes d'exemple sous `cursos/multimedia/`.
2. Confirmer que `CODEOWNERS` correspond aux vraies équipes GitHub.
3. Protéger `main` avec revues obligatoires pour `public/**`.
4. Enregistrer ce dépôt comme source dans le manifest du framework.
