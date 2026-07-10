progressive disclosure # Computational Cognition in Music: Syllabus Proposal

Luciano Azzigotti | HEM Genève — Multimedia Master | Draft February 2026

---

## 0. Ten name proposals for the new skill subject

1. Computational Cognition in Music
2. Systemic Music: Computation, Perception, Generativity
3. Hybrid Musicking: Human–Machine Cognitive Systems
4. Computational Organology
5. Algorithmic Sensibility: Art, Code, Cognition
6. Music Systems Thinking
7. Generative Architectures for Music
8. Cognitive Instruments: Computation and Musical Agency
9. Speculative Computation in Music
10. Distributed Musical Cognition

Each name foregrounds a different axis. Names 1 and 6 emphasize cognitive science and systems theory. Names 2, 7, and 8 emphasize the structural-architectural dimension. Names 3 and 10 place distributed agency at the center. Names 4 and 9 link directly to the speculative organology research program. Name 5 frames the aesthetic-perceptual question.

---

## 1. Rationale

The epistemological shift described in the vibecoding critique (see Section 7 of that document) can be restated as follows: the central object of instruction is no longer how to write code, but how to structure, direct, verify, and critically audit generative processes in musical contexts. This syllabus operationalizes that shift through an integrative pedagogical model — one that introduces generative tools from the outset while demanding structural analysis, manual reconstruction, and formal specification at every stage.

The course is conceived as a complement or successor to Internet Music, expanding the scope from browser-based instrument making toward a general framework for computational cognition in musical creation: the capacity to think in states, flows, dependencies, networks, and mediations, whether the medium is WebAudio, physical computing, machine learning, or networked performance.

---

## 2. Pedagogical model: integrative cycle

Each unit follows a four-phase cycle derived from the integrative model:

Phase A — Construct with assistance. Build a working system using generative tools (LLM-assisted coding, vibecoding). The emphasis is on specifying intent, formulating prompts as technical specifications, and obtaining a functional prototype.

Phase B — Dismantle. Analyze the generated system: dependency graph, state diagram, signal flow, data structures, latency profile. Identify what the student does and does not understand. This phase produces a structural document, not code.

Phase C — Reconstruct without assistance. Rewrite the core logic manually, from the structural analysis. Reduce to minimal implementation. Confront gaps in understanding.

Phase D — Reintroduce with formal specification. Re-engage the generative tool, but now with a formal brief: architecture diagram, interface contract, test criteria. Compare the new output with the manual reconstruction. Audit discrepancies.

The cycle produces simultaneously: technical competence, structural awareness, algorithmic literacy, and expanded computational cognition (Greher and Heines 2014; Brennan and Resnick 2012).

---

## 3. Course structure (one academic year, 28 sessions)

### Block I — Foundations of computational cognition (sessions 1–7)

Session 1. What is computational cognition? Thinking in states, flows, and processes. Relation to extended cognition (Clark and Chalmers 1998), distributed cognition (Hutchins 1995), and enactivism (Varela, Thompson, and Rosch 1991). Listening exercise: analyze a musical work as a state machine.

Session 2. Integrative cycle, first pass. Build a browser-based sound instrument using vibecoding (Phase A). Document the process: prompts, model responses, decisions, rejections. Tools: Web Audio API, basic HTML/JS.

Session 3. Dismantle (Phase B). Map the audio graph: source nodes, processing nodes, destination. Identify state variables, event listeners, timing mechanisms. Produce a node-flow diagram and a dependency list. Reference: Farnell 2010 (Designing Sound).

Session 4. Reconstruct (Phase C). Rewrite the instrument from the structural analysis, without LLM assistance. Minimal viable implementation. Identify what required lookup, what was understood, what was opaque.

Session 5. Reintroduce with specification (Phase D). Write a formal brief for the instrument: input/output contract, state transitions, performance constraints. Use the LLM to generate a second version. Compare architectures. Discussion: when does the model deviate from the specification, and why?

Session 6. Design patterns for interactive music I. Observer, Mediator, Strategy patterns applied to musical contexts. How patterns structure agency in human-machine systems. Reference: Gamma et al. 1995; Roberts, Wakefield, and Wright 2013.

Session 7. Critical reading of generated code. Workshop: given a vibecoded system by another student, perform a structural audit. Identify hidden assumptions, redundant dependencies, unhandled states, performance risks. This is treated as an organological analysis — the code is a material to be examined, not a solution to be accepted.

### Block II — Signal, perception, and generativity (sessions 8–14)

Session 8. Audio signal processing as cognitive model. The FFT as a model of spectral decomposition. Windowing, overlap, latency. Relation to auditory scene analysis (Bregman 1990). Build an analyser-visualiser system (vibecoding + analysis cycle).

Session 9. Synthesis architectures. Subtractive, FM, granular, physical modeling. Each architecture implies a different cognitive model of sound. Integrative cycle: build an FM synth, dismantle, reconstruct the modulation index logic manually.

Session 10. Generativity I: rule systems. Cellular automata, L-systems, Markov chains applied to musical parameters. Reference: Nierhaus 2009; Roads 1996. Build a generative sequencer. Dismantle: trace probability matrices, state transitions.

Session 11. Generativity II: machine learning for sound. Introduction to neural audio synthesis (RAVE, NSynth). Distinction between training, inference, and latent space navigation. The model as instrument: what does it mean to "play" a latent space?

Session 12. Perception and illusion. Auditory illusions (Shepard tones, phantom fundamentals, streaming effects) as entry points to computational models of perception. Build a perceptual illusion instrument. Reference: Deutsch 2013.

Session 13. Multimodal binding. Audio-visual coupling, cross-modal correspondences, McGurk effect. Build a Three.js + WebAudio system where visual and sonic parameters are structurally coupled. Integrative cycle: dismantle the mapping logic, reconstruct manually, specify formally.

Session 14. Mid-course review. Portfolio presentation: each student presents two instruments with full structural documentation. Peer audit session.

### Block III — Networks, distribution, agency (sessions 15–21)

Session 15. Distributed musical cognition. Cognition as distributed across brains, bodies, instruments, and networks (Hutchins 1995; Borgo 2005). Case studies: network music performance, telematic concerts, CCRMA laptop orchestras.

Session 16. Protocols and real-time communication. WebSockets, WebRTC, OSC. Build a networked instrument (two or more nodes). Integrative cycle applied to network code: dismantle the protocol layer, reconstruct handshake logic manually.

Session 17. Latency as compositional parameter. Measured and perceived latency. Networked performance under delay: Chafe 2009, Rottondi et al. 2016. Design an instrument where latency is a structural feature, not a defect.

Session 18. Agency and automation. Degrees of agency in human-machine systems. Autonomous agents, reactive agents, hybrid control. Reference: Rowe 1993 (Interactive Music Systems), Lewis 2000 (Voyager). Build an agent that listens and responds.

Session 19. Live coding as structural practice. Live coding (Aaron 2016; McLean and Dean 2018) compared with vibecoding. Both involve real-time system formation; they differ in audience, temporality, and opacity. Workshop: live-code a musical system, then vibecode the same system. Compare.

Session 20. Data, APIs, and the world as input. Sonification, data-driven composition, sensor integration (MediaPipe, accelerometer, camera). Build a system that takes environmental data as musical input.

Session 21. Gamification and interaction design. Player typologies (Bartle 1996), flow states (Csikszentmihalyi 1990), agonistic and cooperative structures in musical interaction. Build a gamified musical interface.

### Block IV — Integration, speculation, critique (sessions 22–28)

Session 22. Architecture of a complete system. How to design a multi-component musical system: module decomposition, state management, event bus, rendering pipeline. Reference: Roberts, Wakefield, and Wright 2013.

Session 23. Speculative organology I. The instrument as epistemological object. New organology (De Souza 2017; Hardjowirogo 2017; Tresch and Dolan 2013). How computational instruments produce new modes of knowing.

Session 24. Speculative organology II. Parametric design, digital fabrication, hybrid material-digital instruments. Relation to speculative design (Dunne and Raby 2013). Prototype a speculative instrument (vibecoding + physical model or 3D sketch).

Session 25. Prompt engineering as compositional specification. Treating prompts as scores, specifications, or constraint systems. Systematic comparison: the same musical intention expressed as (a) natural language prompt, (b) pseudocode, (c) formal specification, (d) graphical score. Which produces the most interesting divergence?

Session 26. Ethics, opacity, and critical practice. Cognitive offloading, illusion of comprehension, model bias, proprietary dependency. How to maintain critical agency when the tool exceeds your understanding. Reference: Dourish 2017; Agre 1997.

Session 27. Final project workshop. Guided studio session. Each student develops a final project that demonstrates: architectural thinking, structural documentation, critical audit of generated components, aesthetic intention.

Session 28. Final presentation and collective audit. Public presentation. Each project is accompanied by: (a) the working system, (b) a structural analysis document, (c) a critical reflection on what was understood, what remained opaque, and what the generative process revealed.

---

## 4. Assessment

Assessment is continuous and portfolio-based. Each unit produces a deliverable pair: a working system and a structural document. The final grade weights:

Structural documentation and analysis — 30 percent. Clarity of dependency graphs, state diagrams, signal flow charts, and audit reports.

Technical competence — 25 percent. Quality of manual reconstructions, evidence of understanding in code.

Architectural thinking — 25 percent. Quality of formal specifications, system design, prompt-as-specification exercises.

Aesthetic and conceptual contribution — 20 percent. Originality of the instruments and systems, depth of the critical reflection, engagement with the speculative dimension.

---

## 5. Tools and environment

Primary: Web Audio API, Three.js, JavaScript/TypeScript, HTML/CSS. LLM-assisted coding environment (Claude Code, Cursor, or equivalent). Git/GitHub for versioning and portfolio.

Secondary: SuperCollider or Pure Data for synthesis comparison. MediaPipe for gestural input. Node.js / Express for server-side logic. WebSocket / WebRTC libraries. Obsidian for documentation and knowledge management.

Optional: Max/MSP, Sonic Pi, p5.js, TensorFlow.js, ONNX Runtime Web.

---

## 6. Relation to existing programs and state of the art

This syllabus draws on and positions itself in dialogue with:

Stanford CCRMA — the laptop orchestra model and the emphasis on composition-coding-performance as a unified practice (Wang 2008).

MIT Media Lab — AI-music collaboration, creative coding as research method (Maes 2016).

Georgia Tech EarSketch — the integration of music production with programming pedagogy, though here the direction is reversed: computation serves musical cognition, not the other way around (Freeman et al. 2014).

IRCAM Cursus — the tradition of training composers in computational tools with the principle that technology serves musical thought.

Aalto University — creative computation and AI literacy at the intersection of art and computer science.

Goldsmiths Computational Arts — historical and critical frameworks for computational creativity.

Berklee Creative Coding — the minor program integrating live coding, DSP, and interactive design.

ZHdK — media arts pedagogy and practice-based research traditions in the Swiss context.

University of Virginia TuneScope — the synthesis of music and computational thinking through block-based and hybrid environments (Padhye et al. 2023).

The specificity of this proposal lies in three axes absent from most existing programs: (a) the integrative cycle as a systematic pedagogical method, (b) the explicit connection to speculative organology and new instrument design, and (c) the treatment of generative AI not as a tool to be permitted or prohibited, but as a material to be analyzed, audited, and critically composed with.

---

## 7. References

```bibtex
@article{aaron2016,
  author    = {Aaron, Samuel},
  title     = {The Development of {Sonic Pi} and Its Use in Educational Partnerships},
  journal   = {Journal of Music, Technology \& Education},
  volume    = {9},
  number    = {1},
  pages     = {75--94},
  year      = {2016},
  doi       = {10.1386/jmte.9.1.75_1}
}

@book{agre1997,
  author    = {Agre, Philip E.},
  title     = {Computation and Human Experience},
  publisher = {Cambridge University Press},
  year      = {1997},
  address   = {Cambridge}
}

@article{bartle1996,
  author    = {Bartle, Richard},
  title     = {Hearts, Clubs, Diamonds, Spades: Players Who Suit {MUDs}},
  journal   = {Journal of MUD Research},
  volume    = {1},
  number    = {1},
  year      = {1996}
}

@article{borgo2005,
  author    = {Borgo, David},
  title     = {Sync or Swarm: Improvising Music in a Complex Age},
  publisher = {Continuum},
  year      = {2005},
  address   = {New York}
}

@book{bregman1990,
  author    = {Bregman, Albert S.},
  title     = {Auditory Scene Analysis: The Perceptual Organization of Sound},
  publisher = {MIT Press},
  year      = {1990},
  address   = {Cambridge, MA}
}

@inproceedings{brennan2012,
  author    = {Brennan, Karen and Resnick, Mitchel},
  title     = {New Frameworks for Studying and Assessing the Development of Computational Thinking},
  booktitle = {Proceedings of the 2012 Annual Meeting of the {American Educational Research Association}},
  year      = {2012},
  address   = {Vancouver, Canada}
}

@article{chafe2009,
  author    = {Chafe, Chris},
  title     = {Tapping into the Internet as an Acoustical/Musical Medium},
  journal   = {Contemporary Music Review},
  volume    = {28},
  number    = {4--5},
  pages     = {413--420},
  year      = {2009},
  doi       = {10.1080/07494460903422362}
}

@article{clark1998,
  author    = {Clark, Andy and Chalmers, David J.},
  title     = {The Extended Mind},
  journal   = {Analysis},
  volume    = {58},
  number    = {1},
  pages     = {7--19},
  year      = {1998}
}

@book{csikszentmihalyi1990,
  author    = {Csikszentmihalyi, Mihaly},
  title     = {Flow: The Psychology of Optimal Experience},
  publisher = {Harper \& Row},
  year      = {1990},
  address   = {New York}
}

@book{desouza2017,
  author    = {De Souza, Jonathan},
  title     = {Music at Hand: Instruments, Bodies, and Cognition},
  publisher = {Oxford University Press},
  year      = {2017},
  address   = {New York}
}

@book{deutsch2013,
  author    = {Deutsch, Diana},
  title     = {The Psychology of Music},
  edition   = {3},
  publisher = {Academic Press},
  year      = {2013},
  address   = {San Diego}
}

@book{dourish2017,
  author    = {Dourish, Paul},
  title     = {The Stuff of Bits: An Essay on the Materialities of Information},
  publisher = {MIT Press},
  year      = {2017},
  address   = {Cambridge, MA}
}

@book{dunne2013,
  author    = {Dunne, Anthony and Raby, Fiona},
  title     = {Speculative Everything: Design, Fiction, and Social Dreaming},
  publisher = {MIT Press},
  year      = {2013},
  address   = {Cambridge, MA}
}

@book{farnell2010,
  author    = {Farnell, Andy},
  title     = {Designing Sound},
  publisher = {MIT Press},
  year      = {2010},
  address   = {Cambridge, MA}
}

@inproceedings{freeman2014,
  author    = {Freeman, Jason and Magerko, Brian and McKlin, Tom and Reilly, Mike and Permar, Justin and Summers, Cameron and Fruchter, Eric},
  title     = {{EarSketch}: A {STEAM}-Based Approach for Underrepresented Populations in Computing Education},
  booktitle = {Proceedings of the 45th ACM Technical Symposium on Computer Science Education},
  pages     = {446--451},
  year      = {2014},
  doi       = {10.1145/2538862.2538906}
}

@book{gamma1995,
  author    = {Gamma, Erich and Helm, Richard and Johnson, Ralph and Vlissides, John},
  title     = {Design Patterns: Elements of Reusable Object-Oriented Software},
  publisher = {Addison-Wesley},
  year      = {1995},
  address   = {Reading, MA}
}

@book{greher2014,
  author    = {Greher, Gena R. and Heines, Jesse M.},
  title     = {Computational Thinking in Sound: Teaching the Art and Science of Music and Technology},
  publisher = {Oxford University Press},
  year      = {2014},
  address   = {New York}
}

@incollection{hardjowirogo2017,
  author    = {Hardjowirogo, Sarah-Indriyati},
  title     = {Instrumentality: On the Construction of Instrumental Identity},
  booktitle = {Musical Instruments in the 21st Century: Identities, Configurations, Practices},
  editor    = {Bovermann, Till and de Campo, Alberto and Egermann, Hauke and Hardjowirogo, Sarah-Indriyati and Weinzierl, Stefan},
  publisher = {Springer},
  pages     = {9--24},
  year      = {2017},
  address   = {Singapore}
}

@book{hutchins1995,
  author    = {Hutchins, Edwin},
  title     = {Cognition in the Wild},
  publisher = {MIT Press},
  year      = {1995},
  address   = {Cambridge, MA}
}

@article{lewis2000,
  author    = {Lewis, George E.},
  title     = {Too Many Notes: Computers, Complexity and Culture in {Voyager}},
  journal   = {Leonardo Music Journal},
  volume    = {10},
  pages     = {33--39},
  year      = {2000}
}

@phdthesis{maes2016,
  author    = {Maes, Pieter-Jan},
  title     = {Sensorimotor Grounding of Musical Embodiment},
  school    = {Ghent University},
  year      = {2016}
}

@book{mclean2018,
  author    = {McLean, Alex and Dean, Roger T.},
  title     = {The {Oxford} Handbook of Algorithmic Music},
  publisher = {Oxford University Press},
  year      = {2018},
  address   = {New York}
}

@book{nierhaus2009,
  author    = {Nierhaus, Gerhard},
  title     = {Algorithmic Composition: Paradigms of Automated Music Generation},
  publisher = {Springer},
  year      = {2009},
  address   = {Vienna}
}

@inproceedings{padhye2023,
  author    = {Padhye, Harsh and Repenning, Alexander and Basawapatna, Ashok},
  title     = {{TuneScope}: Synthesizing Music and Computational Thinking},
  booktitle = {Proceedings of the 54th ACM Technical Symposium on Computer Science Education},
  year      = {2023},
  doi       = {10.1145/3545945.3569768}
}

@book{roads1996,
  author    = {Roads, Curtis},
  title     = {The Computer Music Tutorial},
  publisher = {MIT Press},
  year      = {1996},
  address   = {Cambridge, MA}
}

@inproceedings{roberts2013,
  author    = {Roberts, Charles and Wakefield, Graham and Wright, Matthew},
  title     = {The Web Browser as Synthesizer and Interface},
  booktitle = {Proceedings of the International Conference on New Interfaces for Musical Expression},
  year      = {2013},
  pages     = {313--318}
}

@article{rottondi2016,
  author    = {Rottondi, Cristina and Chafe, Chris and Allocchio, Claudio and Sarti, Augusto},
  title     = {An Overview on Networked Music Performance Technologies},
  journal   = {IEEE Access},
  volume    = {4},
  pages     = {8823--8843},
  year      = {2016},
  doi       = {10.1109/ACCESS.2016.2628440}
}

@book{rowe1993,
  author    = {Rowe, Robert},
  title     = {Interactive Music Systems: Machine Listening and Composing},
  publisher = {MIT Press},
  year      = {1993},
  address   = {Cambridge, MA}
}

@incollection{tresch2013,
  author    = {Tresch, John and Dolan, Emily I.},
  title     = {Toward a New Organology: Instruments of Music and Science},
  booktitle = {Osiris},
  volume    = {28},
  pages     = {278--298},
  year      = {2013},
  doi       = {10.1086/671381}
}

@book{varela1991,
  author    = {Varela, Francisco J. and Thompson, Evan and Rosch, Eleanor},
  title     = {The Embodied Mind: Cognitive Science and Human Experience},
  publisher = {MIT Press},
  year      = {1991},
  address   = {Cambridge, MA}
}

@inproceedings{wang2008,
  author    = {Wang, Ge and Bryan, Nicholas J. and Oh, Jieun and Hamilton, Robert},
  title     = {Stanford Laptop Orchestra: Pieces for Ensemble},
  booktitle = {Proceedings of the International Computer Music Conference},
  year      = {2008}
}
```

---

## 8. Notes on implementation

This syllabus assumes 28 sessions of 2 hours each (56 contact hours over one academic year). It can be compressed to a single semester by merging Blocks I–II and III–IV, or expanded to four semesters by dedicating one semester per block with additional project time.

The integrative cycle (A–B–C–D) can be applied at different scales: within a single session, across a unit of two to three sessions, or across an entire block. The key invariant is that no generated system is accepted without structural analysis and partial manual reconstruction.

The course does not presuppose prior programming experience, but it does presuppose willingness to engage with formal structures. Students with prior coding skills will be challenged at the specification and audit levels; students without coding skills will be challenged at the reconstruction level. Both trajectories converge on the same goal: computational cognition as a mode of musical thinking.
