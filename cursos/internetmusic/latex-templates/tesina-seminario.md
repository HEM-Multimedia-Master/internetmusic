---
title: tesina-seminario
type: latex-template
templateId: tesina-seminario
chapter: 90 NOTAS
status: draft
order: 9002
---
# tesina-seminario

Plantilla base para tesina de grado con estructura moderna.

```latex
\documentclass[12pt,a4paper]{report}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[spanish]{babel}
\usepackage{hyperref}
\usepackage{graphicx}
\usepackage{geometry}
\usepackage{setspace}
\usepackage{titlesec}
\usepackage{fancyhdr}
\usepackage[most]{tcolorbox}
\geometry{top=2.8cm,bottom=2.8cm,left=3.2cm,right=2.6cm}
\onehalfspacing

\title{{{title}}}
\author{{{author}}}
\date{\today}

\begin{document}
\maketitle
\tableofcontents
\clearpage

{{{body}}}

\end{document}
```
