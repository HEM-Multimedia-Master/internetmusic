

# CLI agents: clawdbot

- Clawdbot is an open-source personal AI assistant you run yourself, on your computer or server. 
- It connects to messaging apps you already use — like WhatsApp, Telegram, Discord, Slack, Signal, or iMessage and turns Large Language Models into a truly personal, always-available companion that can remember context and even take actions for you.

## principles

1.  **persistent memory**. Your preferences, past conversations, and ongoing tasks are stored locally as real files. This means your assistant doesn’t “reset” every day it learns how you work and adapts over time.
2. **proactive**. Instead of waiting for prompts, ClawdBot can send you morning briefings, reminders, alerts, and summaries exactly when they matter.
3. **take real actions**. With the right permissions, ClawdBot can manage emails, update calendars, perform web research, automate browser tasks, or work with developer tools like GitHub.
4.  **self-hosted**. Your data stays on your machine or server. There is no opaque cloud service, no ad-driven business model, and no hidden data collection.



# Vibecoding fundamentals


## Vibecoding and art: state of discussion (rough synthesis)

The term vibecoding is informal and extra-academic, but since late 2024 it has consolidated as a recognizable practice and discourse at the intersection of software development, generative AI, and artistic production.

---

### 1. Definition (working)

Vibecoding designates a mode of coding where:

- Code is produced through conversational, affective, or intuitive prompting
- Local coherence replaces full architectural foresight
- The programmer operates as a curator, interrupter, or redirector
- The codebase emerges incrementally from interaction rather than plan

In artistic contexts, vibecoding is not framed as “bad engineering” but as a legitimate compositional strategy.

---

### 2. Shift in authorship

One dominant discussion concerns authorship:

- The artist no longer writes code line-by-line
- The model proposes structures, idioms, and abstractions
- Agency is distributed between human intention and model inference

![](https://i.imgur.com/budbrcD.png)


This aligns vibecoding with earlier debates on algorithmic composition, generative art, and procedural authorship, but with a crucial difference: the generator is linguistic, not formal.

Key tension:
- Is the artwork authored by the human, the model, or the interaction itself?

---

### 3. Temporal compression and intuition

A recurring theme is temporal collapse:

- Idea → prototype → runnable system can occur in minutes
- Iteration speed favors intuition over reflection
- Errors are tolerated if they “feel right” perceptually or performatively

In art, this is often valued positively:
- The code functions as a sketch
- The executable becomes equivalent to a drawing or étude
- Refactoring is deferred or intentionally avoided

This is frequently contrasted with classical software engineering’s emphasis on long-term maintainability.

---

### 4. Aesthetic consequences

Several aesthetic tendencies are associated with vibecoding:

1. Glitch tolerance  
   - Partial failures, undefined states, and edge cases are accepted or aestheticized

2. Excess functionality  
   - Systems accumulate features suggested by the model
   - Complexity emerges unintentionally

3. Opacity  
   - The artist may not fully understand the generated code
   - Black-boxing is embraced rather than resolved

This produces works that are closer to ecosystems than instruments.

---

### 5. Relation to live coding and generative art

Vibecoding is often compared to live coding, but they are structurally different:

- Live coding operates on symbolic time (musical or visual execution)
- Vibecoding operates on developmental time (system formation)

However, both share:
- Improvisation
- Real-time feedback
- A tolerance for instability

Some discussions frame vibecoding as “offline live coding,” where the performance happens during system creation rather than execution.

---

### 6. Tooling as medium

Another major axis concerns the editor itself:

- The IDE becomes a co-creative medium
- Chat panels, inline suggestions, and diff previews shape thinking
- The boundary between writing, reading, and prompting dissolves

This has led to comparisons with:
- Instrumental interfaces
- Extended cognition
- Studio-as-system rather than toolset

In this view, vibecoding is less a technique than a situated practice inside a specific human–machine environment.

---

### 7. Critiques and frictions

Critical positions are also present:

- Loss of conceptual rigor
- Homogenization of style across artworks
- Hidden biases embedded in model priors
- Dependency on proprietary systems

In artistic research contexts, vibecoding is sometimes accused of producing “operational novelty without epistemic novelty.”

---

### 8. Why December 2024 matters

December 2024 marks a threshold because:

- Models crossed a usability boundary for non-trivial systems
- Context windows became large enough to sustain projects
- Editors stabilized conversational coding as a default workflow
- The cost (cognitive and economic) dropped sufficiently

Before this, AI-assisted coding existed; after this, it became viable as a primary creative modality.

---

### 9. Current status

As of now, vibecoding in art is:

- Practiced more than theorized
- Documented in blogs, talks, repos, and workshops
- Only weakly formalized in academic literature

It occupies a space similar to early net.art or early live coding: technically widespread, conceptually under-articulated.

---

### 10. Open questions

- Can vibecoding be formalized without neutralizing its value?
- How does one archive or analyze vibecoded works?
- What replaces “craft” when understanding is partial?
- Is vibecoding a transitional phase or a stable paradigm?

These questions are beginning to appear, but no consensus exists.

---



## Module 1: Fundamentals of Vibecoding

### What is Vibecoding?
Vibecoding is the practice of creating audiovisual experiences that resonate with human emotions and attention patterns. It combines:

- **Audio Processing**: Using Web Audio API to generate, manipulate, and visualize sound
- **Visual Programming**: Creating dynamic graphics with Three.js
- **Frontend Technologies**: Building responsive interfaces with modern frameworks
- **Knowledge Systems**: Managing creative processes with tools like Obsidian

### The Human Scale Approach
- Understanding attention spans and cognitive load
- Designing for sustainable engagement
- Ethical considerations in digital experience design

### Learning Objectives
By the end of this module, students will:
- Understand the core concepts of vibecoding
- Recognize the importance of human-centered design
- Identify ethical implications of attention-grabbing technologies


---

## Module 2: Technical Foundations

### Web Audio API Fundamentals

#### Basic Audio Context Setup
```javascript
// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator for basic sound generation
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
oscillator.connect(audioContext.destination);
oscillator.start();
```


#### Audio Nodes and Signal Flow
- Source nodes (oscillators, audio buffers)
- Effect nodes (filters, gain, delay)
- Destination nodes (speakers, analyzers)

#### Audio Analysis and Visualization
```javascript
// Create analyzer node for frequency data
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Get frequency data for visualization
analyser.getByteFrequencyData(dataArray);
```

### Three.js Integration

#### Basic Scene Setup
```javascript
import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Basic geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

#### Audio-reactive Visuals
```javascript
// Link audio analysis to visual properties
function animate() {
    requestAnimationFrame(animate);
    
    // Get audio data
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const avg = sum / dataArray.length;
    
    // Apply to visual properties
    cube.scale.x = cube.scale.y = cube.scale.z = 1 + avg / 256;
    
    renderer.render(scene, camera);
}
```

---

## Module 3: Frontend Frameworks

### Astro for Static Site Generation

#### Project Setup
```bash
npm create astro@latest my-vibecoding-project
cd my-vibecoding-project
npm install three @types/three
npm install web-audio-api
```

#### Component Structure
```astro
---
// src/components/AudioVisualizer.astro
import { onMount } from 'astro';
---

<div id="audio-visualizer"></div>

<script>
  onMount(async () => {
    // Initialize audio and visual components
    import('../lib/audio-visualizer.js');
  });
</script>
```

## Hydration in Astro 

In Astro, hydration refers to the process by which static HTML generated at build time becomes interactive in the browser by attaching JavaScript behavior to it.

### 1. Server-side phase (build time)

When Astro builds the project, the `.astro` file is executed on the server:

- The frontmatter (`--- ... ---`) runs at build time.
- The resulting output is plain HTML.
- No JavaScript logic from the component is active yet.

In the example:

```astro
<div id="audio-visualizer"></div>
```


