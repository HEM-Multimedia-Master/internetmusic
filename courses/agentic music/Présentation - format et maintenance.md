---
type: note
title: Présentation — format et maintenance
tags: [organisation, advanced-slides, agentic-music]
status: nonshown
---
# Présentation — format et maintenance

## Conventions reprises du vault

Le `MANUAL.md` définit `type: course`, `title`, `id` pour l’index ; `type: lesson`, `title`, `chapter`, `order` pour une classe. La classe modèle `legacy/1-classes/02-setup/class-02-25-setup.md` utilise `theme: moon`, une en-tête de cours avec image Imgur, des séparateurs `---`, des blocs de code et des exemples Web Audio.

Le fichier `presentation.css` règle la taille des titres et le retour à la ligne du code ; il est chargé par le frontmatter de la classe. Conserver le chemin du cours dans le vault, ou adapter cette référence si le dossier est déplacé. `notesSeparator: "^notes:"` rend explicite le séparateur demandé.

La nouvelle classe combine ces métadonnées avec une slide courte par action, des callouts standard Obsidian, des diagrammes Mermaid et **39 blocs `notes:`**, un par slide. Le thème moon évite de dépendre du CSS personnel zztt pour le partage. Les notes d’organisation n’utilisent pas `type: lesson` pour éviter de les compter comme classes.

## Patron de slide

````markdown
## Une action musicale

Une consigne courte et un résultat observable.

> [!example] Prompt ou commande
> ```text
> Une consigne précise à donner à l’agent.
> ```

notes:
Explication à l’enseignant : objectif, geste, résultat attendu,
limite et solution de repli. Pages de lecture quand pertinentes.

---
````

Le séparateur `---` n’est pas placé dans une note enseignante ; il crée une nouvelle slide. Les notes commencent par `notes:` seul sur sa ligne. La documentation confirme cette syntaxe : [Speaker Notes](https://mszturc.github.io/obsidian-advanced-slides/extend-syntax/speakernotes/).

## Aperçu et partage

1. Ouvrir la classe dans le vault et lancer l’aperçu Advanced Slides.
2. Vérifier deux slides denses, les callouts et les diagrammes.
3. Ouvrir la présentation dans le navigateur et utiliser `S` pour les notes.
4. Si les liens Obsidian ne suivent pas dans un export HTML, conserver le guide de pratique comme note séparée accessible depuis le MOC.
5. Ne pas intégrer les instruments via un iframe pour les essais micro : ouvrir le navigateur externe avec l’URL du site.

Le lien Imgur de la classe de référence n’a pas chargé lors du contrôle. La nouvelle présentation conserve l’en-tête de cours, sans image cassée, et utilise des diagrammes Mermaid pour les visuels explicatifs. Aucun nouveau lien d’image fictif n’a été inventé.

## Entretien des contenus

Avant chaque semestre : recontrôler les plans gratuits, les modèles disponibles et les chemins d’installation. Indiquer la date de vérification. Préserver une référence locale des instruments et un repli sans API. Ne pas recopier les anciennes promesses GitHub Models ni « Spaces GPU gratuits illimités ».
