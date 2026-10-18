# 02 Free language models, Web Audio, VexFlow / Modèles de langage gratuits, Web Audio, VexFlow

Class 02, part 2. Same cover as part 1 (slides_fr.md of 01_hf_audio_10_steps).

Files
- index.html: the whole exercise in one page (open it in Chrome, Firefox or Safari)
- slides_en.md, slides_fr.md: Obsidian Advanced Slides
- refs.bib

Use / Utilisation
1. Open index.html.
2. Write a brief, copy the prompt, paste it in a free chat (ChatGPT, DeepSeek, Claude).
3. Paste the JSON reply in the matching tab, press "Parse and notate", then Play.

Score format / Format de partition

```json
{"title": "demo", "tempo": 92, "key": "Dm",
 "melody": [["d4",1],["f4",0.5],["a4",0.5],["g4",2]],
 "drums": {"kick": "X...x..x..X.x...", "snare": "....X.......X...", "hat": "x.x.x.x.x.x.x.x."}}
```

Limits: 4/4, one voice, durations 4, 3, 2, 1.5, 1, 0.75, 0.5, 0.25, no ties, no triplets.
VexFlow 4.2.2 is loaded from jsdelivr: an internet connection is required.
