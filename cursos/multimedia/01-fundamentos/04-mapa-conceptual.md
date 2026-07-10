---
type: app-dataviewjs
title: "04 - Application de carte conceptuelle"
status: draft
chapter: "01-fundamentos"
order: 4
slug: carte-conceptuelle
---

# Application de carte conceptuelle

Utilisez `app-dataviewjs` pour les notes interactives liées au cours.

```dataviewjs
const rows = [
  ["note de cours", "contexte pédagogique privé"],
  ["note publique", "version éditée pour une diffusion plus large"],
  ["brouillon", "incubateur ou matériau en préparation"],
];

dv.table(["noeud", "rôle"], rows);
```
