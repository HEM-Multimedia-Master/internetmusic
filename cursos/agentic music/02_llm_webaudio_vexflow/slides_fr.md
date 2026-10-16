---
theme: black
highlightTheme: monokai
transition: slide
slideNumber: true
controls: true
---

| ![\|50](https://i.imgur.com/N8z2xP4.png) |                |                        |
| ---------------------------------------- |:-------------- | ----------------------:|
| **class 02**                             | Oct 02th, 2026 | *internet et agentic music 26/27* |

# Modèles de langage gratuits, Web Audio et VexFlow

Partie 2 : une partition écrite par un modèle de chat, entendue et lue dans une seule page HTML

note: La partie 1 utilisait des modèles audio locaux. La partie 2 utilise des modèles de langage via leurs chats web gratuits et une page autonome, index.html.

---

## Cadre

- Modèles de langage : ChatGPT, DeepSeek, Claude, chats web gratuits uniquement
- Sans clé d'API, sans serveur, sans installation
- Un seul fichier : index.html (Web Audio pour le son, VexFlow pour la notation)
- Chaîne : prompt, JSON, analyse, séquençage, synthèse, notation

--

### La boucle agentique, avec l'humain dans la boucle

1. Percevoir : vous lisez la partition et vous l'écoutez
2. Décider : vous modifiez la consigne ou le JSON
3. Agir : le modèle réécrit la partition, la page la restitue de nouveau

note: Le modèle n'écoute pas. L'humain ferme la boucle. Dans la partie 1, étape 10, c'était un classifieur.

---

## Pourquoi du JSON

- Un format commun entre un modèle de texte et un instrument
- Les modèles écrivent du JSON valide bien plus sûrement que de l'audio
- Une sortie symbolique se modifie, se compare, se note

```json
{"title": "demo", "tempo": 92, "key": "Dm",
 "melody": [["d4",1],["f4",0.5],["a4",0.5],["g4",2]],
 "drums": {"kick": "X...x..x..X.x...", "snare": "....X.......X...", "hat": "x.x.x.x.x.x.x.x."}}
```

- melody : paires nom de hauteur et durée en temps
- drums : seize caractères par mesure, x faible, X accent, point silence

---

## Conception du prompt

```text
Write a short musical idea as ONE JSON object and nothing else.
Brief: a slow, slightly unstable melody that rises and never resolves
Length: 4 bars in 4/4. Key: Dm.
Rules:
- pitch is a note name such as c4, f#4, bb3, or "r" for a rest
- beats is one of 4, 3, 2, 1.5, 1, 0.75, 0.5, 0.25
- each bar adds up to exactly 4 beats
- each drum string has exactly 64 characters
```

- La page construit ce prompt à partir de trois champs : consigne, mesures, tonalité
- Les règles existent parce que la page accepte une petite grammaire

---

## Chats gratuits, points pratiques

- Même prompt, trois modèles : ChatGPT, DeepSeek, Claude
- Copier la réponse, la coller dans l'onglet correspondant de la page
- Le texte autour du JSON est ignoré ; la première et la dernière accolade le délimitent
- Offres gratuites, limites et versions de modèles changent : vérifier le jour même
- Ne coller aucune donnée personnelle dans un chat

note: La page ne stocke rien. Les réponses restent dans l'onglet du navigateur jusqu'à sa fermeture.

---

## Visite de la page

1. Prompt : consigne, mesures, tonalité, copie
2. Réponse : trois onglets, analyse et notation, partition de démonstration, référence aléatoire
3. Synthèse : forme d'onde, ADSR, filtre, delay, swing, tempo
4. Notation : portée de sol pour la mélodie, portée de percussion pour le rythme

Ouvrir index.html dans un Chrome, Firefox ou Safari récent. VexFlow se charge depuis un CDN.

---

## Synthèse

Chaîne par note : oscillateur, filtre passe-bas, enveloppe de gain, envoi vers le delay.

```javascript
o.type = P.wave; o.frequency.setValueAtTime(freq, t);
g.gain.linearRampToValueAtTime(peak, t + P.att);          // attaque
g.gain.linearRampToValueAtTime(sus, t + P.att + P.dec);   // chute vers le sustain
g.gain.linearRampToValueAtTime(0.0001, t + hold + P.rel); // relâchement
```

Nom de hauteur vers fréquence, avec $m$ le numéro MIDI :

$$f = 440 \cdot 2^{(m-69)/12}$$

---

## La batterie est synthétisée aussi

- Grosse caisse : sinus, de 150 Hz à 45 Hz en 0,12 s
- Caisse claire : bruit filtré passe-haut plus un triangle court
- Charleston : bruit filtré passe-haut à 7 kHz, 50 ms

```javascript
o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
```

- Aucun échantillon n'est chargé : tout est calculé

---

## Séquençage

Deux horloges : le minuteur JavaScript est imprécis, l'horloge audio est exacte (Wilson, 2013).

```javascript
timer = setInterval(tick, 25);      // se réveille toutes les 25 ms
// tick() : planifie chaque événement situé dans les 0,2 s à venir
if (t > ctx.currentTime + AHEAD) break;
fire(e, t);                         // démarre les oscillateurs à l'instant exact t
```

- Le tempo change à chaque début de boucle
- Le swing retarde une double croche sur deux, jusqu'à 0,1 temps

---

## Le rythme comme chaîne de caractères

- Un caractère par double croche : 16 par mesure
- Les motifs se répètent cycliquement jusqu'à la fin de la boucle
- La référence aléatoire utilise des rythmes euclidiens (Toussaint, 2005)

```javascript
const euclid = (k, n) =>
  Array.from({length: n}, (_, i) => ((i * k) % n) < k ? 'x' : '.').join('');
```

$E(5,16)$ répartit cinq attaques aussi régulièrement que possible sur seize pas.

---

## Notation avec VexFlow

```javascript
const r = new Renderer(host, Renderer.Backends.SVG);
const st = new Stave(x, y, w); st.addClef('treble'); st.draw();
const voice = new Voice({num_beats: 4, beat_value: 4}).setStrict(false);
Accidental.applyAccidentals([voice], 'Dm');
new Formatter().joinVoices([voice]).format([voice], width);
```

- La page découpe la mélodie en mesures à 4/4 avant de dessiner
- Une tête de lecture rouge suit le son sur les deux portées
- Limites : 4/4 seulement, pas de liaisons, pas de triolets, une seule voix

---

## Protocole d'expérience

1. Écrire une consigne, ne pas la modifier
2. Envoyer le même prompt aux trois chats gratuits
3. Charger chaque réponse dans son onglet ; écouter, puis lire la partition
4. Charger la référence aléatoire et comparer
5. Changer la synthèse : mêmes notes, trois timbres
6. Demander une révision à un chat : « rends la mesure 3 plus syncopée », puis recharger

---

## Limites et critique

- Les modèles comptent mal les temps : la page tronque et complète en silence, et le signale dans la ligne d'état
- Le normaliseur est un éditeur : une part du résultat vient de la page, non du modèle
- La sortie typique reste dans un idiome de catalogue : mouvement conjoint, retours à la tonique
- Un modèle n'entend pas : il prédit du texte sur le son
- La sortie du modèle vaut-elle mieux que la référence aléatoire ? Définir « mieux » avant d'écouter

---

## Variations

1. Ajouter une voix de basse ou des accords au schéma
2. Ajouter la vélocité et l'articulation par note
3. Envoyer la même consigne à MusicGen (partie 1, étape 8) et comparer génération symbolique et audio
4. Remplacer le chat par un appel d'API plus tard ; la page demande un fetch et une clé
5. Exporter la notation en SVG et le son en wav

---

## Références

```bibtex
@misc{wilson2013clocks, author={Wilson, Chris}, title={A Tale of Two Clocks: Scheduling Web Audio with Precision}, howpublished={HTML5 Rocks}, year={2013}, note={no page numbers}}
@inproceedings{toussaint2005euclid, author={Toussaint, Godfried}, title={The Euclidean Algorithm Generates Traditional Musical Rhythms}, booktitle={Proceedings of BRIDGES 2005}, year={2005}, pages={47--56}}
@misc{vexflow2024, author={{VexFlow contributors}}, title={VexFlow 4.2.2}, howpublished={https://github.com/0xfe/vexflow}, year={2024}, note={no page numbers}}
```

Entrées complètes dans refs.bib
