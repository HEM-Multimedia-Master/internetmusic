---
highlightTheme: monokai
transition: slide
slideNumber: true
controls: true
---

| ![\|50](https://i.imgur.com/N8z2xP4.png) |                |                        |
| ---------------------------------------- |:-------------- | ----------------------:|
| **class 02**                             | Oct 02th, 2026 | *internet et agentic music 26/27* |

# Free language models, Web Audio and VexFlow

Part 2: a score written by a chat model, heard and read in one HTML page

note: Part 1 used local audio models. Part 2 uses language models through their free web chats and one self-contained page, index.html.

---

## Scope

- Language models: ChatGPT, DeepSeek, Claude, free web chats only
- No API key, no server, no installation
- One file: index.html (Web Audio for sound, VexFlow for notation)
- Pipeline: prompt, JSON, parse, sequence, synthesize, notate

--

### The agentic loop, human in the loop

1. Perceive: you read the score and listen to it
2. Decide: you edit the brief or the JSON
3. Act: the model rewrites the score, the page renders it again

note: The model is not listening. The human closes the loop. Part 1, step 10 closed it with a classifier.

---

## Why JSON

- A shared format between a text model and an instrument
- Models write valid JSON far more reliably than audio
- Symbolic output is editable, diffable, notatable

```json
{"title": "demo", "tempo": 92, "key": "Dm",
 "melody": [["d4",1],["f4",0.5],["a4",0.5],["g4",2]],
 "drums": {"kick": "X...x..x..X.x...", "snare": "....X.......X...", "hat": "x.x.x.x.x.x.x.x."}}
```

- melody: pairs of pitch name and beats
- drums: sixteen characters per bar, x soft, X accent, dot silence

---

## Prompt design

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

- The page builds this prompt from three fields: brief, bars, key
- The rules exist because the page accepts a small grammar

---

## Free chats, practical points

- Same prompt, three models: ChatGPT, DeepSeek, Claude
- Copy the reply, paste it in the matching tab of the page
- Text around the JSON is ignored; the first and last brace delimit it
- Free plans, limits and model versions change: check them on the day
- Do not paste personal data into any chat

note: The page stores nothing. Replies live in the browser tab until it is closed.

---

## Page tour

1. Prompt: brief, bars, key, copy
2. Reply: three tabs, parse and notate, demo score, random baseline
3. Synthesis: waveform, ADSR, filter, delay, swing, tempo
4. Notation: treble staff for the melody, percussion staff for the rhythm

Open index.html in a recent Chrome, Firefox or Safari. VexFlow loads from a CDN.

---

## Synthesis

Chain per note: oscillator, low-pass filter, gain envelope, delay send.

```javascript
o.type = P.wave; o.frequency.setValueAtTime(freq, t);
g.gain.linearRampToValueAtTime(peak, t + P.att);          // attack
g.gain.linearRampToValueAtTime(sus, t + P.att + P.dec);   // decay to sustain
g.gain.linearRampToValueAtTime(0.0001, t + hold + P.rel); // release
```

Pitch name to frequency, with $m$ the MIDI number:

$$f = 440 \cdot 2^{(m-69)/12}$$

---

## Drums are synthesized too

- Kick: sine, 150 Hz falling to 45 Hz in 0.12 s
- Snare: high-passed noise plus a short triangle
- Hi-hat: noise high-passed at 7 kHz, 50 ms

```javascript
o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
```

- No samples are loaded: everything is computed

---

## Sequencing

Two clocks: the JavaScript timer is imprecise, the audio clock is exact (Wilson, 2013).

```javascript
timer = setInterval(tick, 25);      // wakes up every 25 ms
// tick(): schedule every event whose time falls within the next 0.2 s
if (t > ctx.currentTime + AHEAD) break;
fire(e, t);                         // start oscillators at the exact time t
```

- Tempo changes apply at each loop boundary
- Swing delays every second sixteenth by up to 0.1 beat

---

## Rhythm as a string

- One character per sixteenth: 16 per bar
- Patterns repeat cyclically until the loop ends
- The random baseline uses Euclidean rhythms (Toussaint, 2005)

```javascript
const euclid = (k, n) =>
  Array.from({length: n}, (_, i) => ((i * k) % n) < k ? 'x' : '.').join('');
```

$E(5,16)$ spreads five onsets as evenly as possible over sixteen steps.

---

## Notation with VexFlow

```javascript
const r = new Renderer(host, Renderer.Backends.SVG);
const st = new Stave(x, y, w); st.addClef('treble'); st.draw();
const voice = new Voice({num_beats: 4, beat_value: 4}).setStrict(false);
Accidental.applyAccidentals([voice], 'Dm');
new Formatter().joinVoices([voice]).format([voice], width);
```

- The page splits the melody into 4/4 bars before drawing
- A red playhead follows the sound on both staves
- Limits: 4/4 only, no ties, no triplets, one voice

---

## Experiment protocol

1. Write one brief, keep it unchanged
2. Send the same prompt to the three free chats
3. Load each reply in its tab; listen, then read the score
4. Load the random baseline and compare
5. Change the synthesis: same notes, three timbres
6. Ask a chat for a revision: "make bar 3 more syncopated" and reload

---

## Limits and critique

- Models miscount beats: the page truncates and pads silently, and says so in the status line
- The normalizer is an editor: part of the result is the page, not the model
- Typical output sits in a stock idiom: stepwise motion, tonic returns
- A model does not hear: it predicts text about sound
- Is the model output better than the random baseline? Define better before listening

---

## Variations

1. Add a bass voice or chords to the schema
2. Add velocity and per-note articulation
3. Send the same brief to MusicGen (part 1, step 8) and compare symbolic and audio generation
4. Replace the chat by an API call later; the page needs a fetch and a key
5. Export the notation as SVG and the sound as wav

---

## References

```bibtex
@misc{wilson2013clocks, author={Wilson, Chris}, title={A Tale of Two Clocks: Scheduling Web Audio with Precision}, howpublished={HTML5 Rocks}, year={2013}, note={no page numbers}}
@inproceedings{toussaint2005euclid, author={Toussaint, Godfried}, title={The Euclidean Algorithm Generates Traditional Musical Rhythms}, booktitle={Proceedings of BRIDGES 2005}, year={2005}, pages={47--56}}
@misc{vexflow2024, author={{VexFlow contributors}}, title={VexFlow 4.2.2}, howpublished={https://github.com/0xfe/vexflow}, year={2024}, note={no page numbers}}
```

Full entries in refs.bib
