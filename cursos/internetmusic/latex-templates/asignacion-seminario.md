---
title: asignación-seminario
type: latex-template
templateId: asignacion-seminario
chapter: 90 NOTAS
status: draft
order: 9001
---
# asignación-seminario

Plantilla base para trabajos breves del seminario.

```latex
\documentclass[sigconf]{acmart}
\settopmatter{printacmref=false}
\renewcommand\footnotetextcopyrightpermission[1]{}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{hyperref}
\usepackage{graphicx}
\usepackage[most]{tcolorbox}

\title{{{title}}}
\author{{{author}}}
\date{}

\begin{document}
\maketitle

{{{body}}}

\end{document}
```
