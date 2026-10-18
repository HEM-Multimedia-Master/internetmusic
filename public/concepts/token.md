---
type: concept
slug: token
alias: token
aliases: [Concept - Token]
status: published
public: true
url:
coverImage:
tags: [ai, agentic-music, language]
person:
parent:
project: internet music
work:
source: https://huggingface.co/docs/transformers/main/en/tokenizer_summary
definition: a unit of text processed by a model, often a word fragment, a punctuation mark, or a space.
definition_fr: unité de texte traitée par un modèle, souvent un fragment de mot, un signe de ponctuation ou un espace.
connect:
  - "[[prompt]]"
  - "[[model]]"
---

A token is the unit of text that a model reads and writes: often a word fragment, a punctuation mark, or a space, depending on the tokenizer. The prompt, the attached files, and the reply all consume a token budget, which is why attaching one targeted file can save context. The term is distinct from an access token, a secret credential such as the one GitHub issues.

<!--lang:fr-->
Un token est l'unité de texte qu'un modèle lit et écrit : souvent un fragment de mot, un signe de ponctuation ou un espace, selon le tokenizer. Le prompt, les fichiers joints et la réponse consomment tous un budget de tokens, d'où l'intérêt de joindre un seul fichier ciblé pour économiser du contexte. Le terme est distinct d'un jeton d'accès, identifiant secret tel que celui que délivre GitHub.
<!--/lang-->
