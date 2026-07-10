---
type: concept
slug: progressive-disclosure
alias: divulgation progressive
status: published
public: true
url:
coverImage:
tags: [interface, design, dictionary]
person:
parent: "[[internet music-concert dictionary]]"
project: internet music
work:
source:
definition: a design principle that structures information and functionality in layers, revealing complexity only as needed.
connect:
  - "[[modes of interactions]]"
  - "[[easter egg]]"
---

Progressive disclosure is a design principle that structures information and functionality in layers, revealing complexity only as the user needs it: a minimal interface first, extended features on demand, full functionality last. Advanced-settings panels, accordions, and unlockable course modules all follow this logic. It reduces cognitive load and scaffolds learning, at the risk of hiding capability from experts. Crucially, it does not remove complexity but distributes it in time and context — which makes it also a dramaturgical device for interactive works that unfold by degrees.

<!--lang:fr-->
La divulgation progressive est un principe de design qui structure l'information et les fonctionnalités en couches, ne révélant la complexité qu'à mesure que l'utilisateur en a besoin : d'abord une interface minimale, puis des fonctions étendues à la demande, enfin la fonctionnalité complète. Panneaux de réglages avancés, accordéons et modules de cours déverrouillables suivent cette logique. Elle réduit la charge cognitive et échafaude l'apprentissage, au risque de cacher des capacités aux experts. Surtout, elle ne supprime pas la complexité mais la distribue dans le temps et le contexte — ce qui en fait aussi un dispositif dramaturgique pour les œuvres interactives qui se déploient par degrés.
<!--/lang-->

---

## Progressive Disclosure

**Progressive disclosure** is a design principle in web development, interfaces, and LMS (Learning Management Systems) that structures information and functionality in layers, revealing complexity only as needed.

### Definition

Progressive disclosure organizes interaction such that:

$$
I = I_{base} \subset I_{extended} \subset I_{full}
$$

where:
- $I_{base}$ = minimal, essential interface
- $I_{extended}$ = context-dependent features
- $I_{full}$ = complete system functionality

### In Web Interfaces

- Hide advanced options behind toggles, menus, or modals  
- Reduce cognitive load for first-time users  
- Reveal functionality based on user actions or state  

Example:
- “Advanced settings” panels
- Expandable sections (accordions)
- Contextual tooltips

### In LMS (Learning Management Systems)

- Gradual exposure to content and tasks  
- Unlock modules based on progression  
- Scaffold complexity in learning paths  

$$
C_{t+1} = f(C_t, \text{user progress})
$$


### In Programming Contexts

- APIs exposing simple interfaces first, advanced configuration later  
- CLI tools with basic commands and optional flags  
- UI frameworks that abstract complexity but allow deeper control  

### Benefits

- Reduces initial cognitive overload  
- Supports onboarding and accessibility  
- Enables layered interaction and expertise development  

### Limitations

- Can obscure available functionality  
- May frustrate expert users if access is too hidden  
- Requires careful design of transition between layers  

### Summary

Progressive disclosure is not the removal of complexity, but its **temporal and contextual distribution** across interaction.