---
tags: dictionary 
definition:
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