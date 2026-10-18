# 03 Photo-Console & Audio Multiplexer Matrix / Console Photo & Matrice Audio

Class 03 — Special Project: Image-cropped Rotary Knobs & Vector Sliders mapped to Web Audio API Synthesis Modules & an $N \times M$ Feedback Matrix.

## Files / Fichiers
- `index.html`: Complete interactive instrument & visual cropper (Ableton Live dark aesthetic, fullscreen Perform view + lower-left `L` backdoor, zero dependencies).
- `photo-console-step01.html` to `photo-console-step10.html`: **10 minimal, heavily commented (EN) incremental HTML files** (~90 lines each) that build the entire project step by step, each with 2–3 audible Web Audio connections.
- `slides_fr.md`, `slides_en.md`: Obsidian Advanced Slides presentations (FR / EN) with `[[ ]]` glossary links.
- `refs.bib`: Bibliography.

## The 10 Incremental Didactic Steps / Les 10 étapes progressives (`photo-console-step01..10.html`)

| Step | File | Core Concept & Audible Connection |
|---|---|---|
| 01 | `photo-console-step01.html` | **Canvas & First Tone**: `<canvas>` X/Y crosshair mapped to `OscillatorNode` frequency & `GainNode` volume (`[[variable]]`, `[[AudioContext]]`, `[[event-listener]]`) |
| 02 | `photo-console-step02.html` | **Circular Image Crop (Rotary Knob)**: `ctx.arc()` + `ctx.clip()` + `ctx.rotate()` spinning a circular cutout on its axis, sweeping a resonant `BiquadFilterNode` (`[[function]]`, `[[canvas]]`) |
| 03 | `photo-console-step03.html` | **Polygon Crop & Vector Arrow Slider**: 4-point polygon `[[array]]` + vector dot-product projection sliding a cropped fader cap to detune two oscillators (`[[object]]`, `[[arrow-function]]`, `[[normalization]]`) |
| 04 | `photo-console-step04.html` | **Additive Synthesis**: `for` `[[loop]]` summing 6 harmonic sine `OscillatorNode` partials ($f .. 6f$) with brightness tilt & detune spread (`[[additive-synthesis]]`) |
| 05 | `photo-console-step05.html` | **Subtractive Synthesis**: Harmonic-rich `sawtooth` wave sculpted by a resonant low-pass `BiquadFilterNode` + slow LFO (`[[subtractive-synthesis]]`) |
| 06 | `photo-console-step06.html` | **FM Synthesis**: Audio-rate frequency modulation (`modulator -> GainNode -> carrier.frequency` `[[AudioParam]]`) with carrier, ratio & index controls (`[[fm-synthesis]]`) |
| 07 | `photo-console-step07.html` | **Granular Synthesis**: Microsound cloud scheduler (`setInterval` `[[callback]]`) slicing an in-memory `[[AudioBuffer]]` into 20–350ms enveloped grains (`[[granular-synthesis]]`) |
| 08 | `photo-console-step08.html` | **Peripherals & Space (Mic, Delay, Reverb)**: Live microphone (`[[getUserMedia]]`) + synth pulse routed into a feedback `[[DelayNode]]` and synthetic-IR `[[ConvolverNode]]` |
| 09 | `photo-console-step09.html` | **Multiplexer Audio Matrix & Safe Feedback**: $3 \times 4$ 2D `[[array]]` of `GainNode` crosspoints with `WaveShaperNode` ($\tanh$) soft-clipping for self-oscillating `[[feedback]]` (`[[multiplexer]]`) |
| 10 | `photo-console-step10.html` | **Complete Mini-Console**: Fullscreen Perform view, lower-left `L` corner / `[L]` key Setup Backdoor, control `[[mapping]]` & `[[JSON]]` patch export |

## How It Works / Fonctionnement (Perform Mode vs. Backdoor Setup)

1. **Default View = Fullscreen Performance Screen**:
   - Opening `index.html` shows only the photograph and its interactive cropped controls (rotary knobs & vector sliders).
   - Clicking anywhere on the console starts the Web Audio engine.
2. **Accessing the Setup / Construction Backdoor**:
   - Click the discrete **`L` bracket / dot marker** in the **lower-left corner** of the screen, OR press the **`L` key** (or `` ` `` key) on the keyboard.
   - The screen flips into the **Setup Backdoor** (Ableton Live style rack) where you can crop new circular knobs, crop polygonal sliders with directional vector arrows, tweak synthesis modules, route the $7 \times 6$ feedback matrix, and copy didactic prompts.
   - Press **`L`** or click the lower-left corner again to return to fullscreen Performance View.

## How to Save the Photo & Patch for GitHub Pages / Vercel

Since static hosts (GitHub Pages / Vercel) do not have a backend database to store user uploads on the fly, the Setup Backdoor (`02. IMAGE & DEFAULT PATCH PERSISTENCE`) provides three built-in solutions:

1. **Export Standalone HTML (`EXPORT STANDALONE HTML (WITH PHOTO)`) — Recommended**:
   - Upload any photo from your computer (`UPLOAD FILE`), crop your knobs/sliders, and configure the matrix.
   - The canvas automatically compresses the photo into a compact JPEG Data-URL (`data:image/jpeg;base64,...`).
   - Click **`EXPORT STANDALONE HTML (WITH PHOTO)`**: it downloads a new single-file `index.html` with your photo, cropped controls, and matrix patch baked directly into `window.__BAKED_STATE__`.
   - Upload/commit that `index.html` to GitHub Pages or Vercel: your custom photo and controls load automatically on any device!
2. **External Image URL (`IMGUR / GITHUB RAW / HTTPS`)**:
   - Paste a direct image link (e.g. `https://i.imgur.com/xxxx.jpg` or `./my-console.jpg` committed in the same GitHub repository folder) into the URL field and click **`LOAD URL`**, then export the standalone HTML or JSON.
3. **Browser Auto-Save (`localStorage`)**:
   - Every edit in the Setup Backdoor is automatically saved in the browser's `localStorage` so refreshing the page locally never loses your work.
