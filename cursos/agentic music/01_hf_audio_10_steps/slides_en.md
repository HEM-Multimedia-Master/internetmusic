---
theme: black
highlightTheme: monokai
transition: slide
slideNumber: true
controls: true
---

# Agentic music with free Hugging Face audio models

Ten steps: microphone, mp3, text and audio as inputs

Course: Internet and Agentic Music

note: Folder code/ holds one script per step. Slides and code are in sync: step N is the file 0N_*.py.

---

## Scope

- Local execution, public models, no account, no API key
- Inputs: microphone, mp3 files, text prompts
- Models: AST, CLAP, Whisper, MusicGen
- Output: wav files in code/out/

--

### Agentic, in a minimal sense

A loop of three moves:

1. Perceive: a model describes the incoming sound
2. Decide: a policy turns the description into an action
3. Act: a generative model produces sound, which is perceived again

note: Step 10 implements the loop with a rule table. The policy is the part to replace by a language model later.

---

## Models

| Task | Model | Role |
| --- | --- | --- |
| Fixed-label classification | MIT/ast-finetuned-audioset-10-10-0.4593 | Perceive |
| Free-text classification | laion/clap-htsat-unfused | Perceive |
| Speech to text | openai/whisper-tiny | Perceive |
| Text or audio to music | facebook/musicgen-small | Act |

Check the licence on each model card. The MusicGen weights are non-commercial (CC-BY-NC 4.0, to verify on the card).

---

## Step 1. Environment

```bash
cd "agentic music/01_hf_audio_10_steps"
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd code
python 01_setup_check.py
```

note: ffmpeg is optional. Install it (brew install ffmpeg, or winget install ffmpeg on Windows) only if an mp3 fails to load.

---

## Step 2. Download the models

```bash
python 02_download_models.py
```

```python
path = snapshot_download(repo, ignore_patterns=["*.msgpack", "*.h5", "*.onnx", "*.bin"])
```

- Files go to the Hugging Face cache, once
- HF_HOME moves the cache to another disk
- Expect several GB in total, MusicGen being the largest

---

## Step 3. Microphone

```bash
python 03_record_mic.py --seconds 5
```

```python
y = sd.rec(int(seconds * sr), samplerate=sr, channels=1, dtype="float32")
sd.wait()
```

- Result: out/mic.wav
- macOS: allow the terminal under System Settings, Privacy, Microphone
- Peak below 0.01 means silence or a blocked permission

---

## Step 4. Read an mp3

```bash
python 04_inspect_audio.py --source ../song.mp3 --seconds 10
```

```python
y, _ = librosa.load(path, sr=22050, mono=True, duration=10)
S = librosa.power_to_db(librosa.feature.melspectrogram(y=y, sr=22050), ref=np.max)
```

- Every model expects its own sample rate: 16 kHz, 32 kHz, 48 kHz
- Resampling is a recurring step in any audio pipeline

---

## Step 5. Classify with AST

```bash
python 05_classify_ast.py --source mic
```

```python
clf = pipeline("audio-classification", model="MIT/ast-finetuned-audioset-10-10-0.4593")
clf({"raw": y, "sampling_rate": 16000}, top_k=5)
```

- 527 fixed classes from the AudioSet ontology (Gemmeke et al., 2017)
- Music is described by a few genre and instrument labels

---

## Step 6. Zero-shot with CLAP

```bash
python 06_zero_shot_clap.py --labels "speech,rain,a cello,noise,silence"
```

```python
clf = pipeline("zero-shot-audio-classification", model="laion/clap-htsat-unfused")
clf(y, candidate_labels=labels)
```

- The labels are free text: the vocabulary belongs to the user
- Scores are relative to the candidate list, not absolute

---

## Step 7. Speech to text

```bash
python 07_transcribe_whisper.py --lang french --model openai/whisper-base
```

```python
asr = pipeline("automatic-speech-recognition", model="openai/whisper-tiny", chunk_length_s=30)
asr({"raw": y, "sampling_rate": 16000})["text"]
```

- whisper-tiny is quick and weak outside English
- Compare tiny, base, small on the same recording

---

## Step 8. Text to music

```bash
python 08_text_to_music.py --prompt "slow ambient drone with bowed metal textures"
```

```python
out = model.generate(**inputs, do_sample=True, guidance_scale=3.0, max_new_tokens=seconds * 50)
```

- Fifty tokens per second of audio
- On CPU, 8 seconds of audio take about a minute (indicative)
- Output: out/musicgen_text.wav

---

## Step 9. Text and audio to music

```bash
python 09_audio_to_music.py --source mic --prompt "sparse piano and granular noise"
python 09_audio_to_music.py --source ../song.mp3 --prompt-seconds 5
```

```python
inputs = processor(text=[prompt], audio=prompt_audio, sampling_rate=32000,
                   padding=True, return_tensors="pt")
```

- The model continues the audio prompt under the guidance of the text
- It does not transform the prompt: it extends it

---

## Step 10. Agent loop

```bash
python 10_agent_loop.py --source mic --rounds 3
```

```python
label, score = perceive(clap, y)          # CLAP hears
prompt = decide(label, history)           # rule table decides
out, sr = generate_music(processor, model, prompt, seconds, audio=context)  # MusicGen acts
y = resample(out, sr, CLAP_SR)            # the output is heard in the next round
```

note: The output of round i is the input of round i+1. Try silence, speech and a clapping sequence as starting points.

---

## Limits and critique

- The policy is a fixed table: the loop is agentic in structure, not in autonomy
- AST and CLAP impose a vocabulary; what falls outside it is rendered as the nearest label
- MusicGen is trained on stock music: the output leans toward that idiom
- Prompt wording changes results strongly and without a stable rule
- Cost: local compute, wait time, and non-commercial licence of the weights

---

## Variations

1. Replace decide() by a call to a language model that receives the label history
2. Swap AST for CLAP labels written by the student
3. Chain Whisper into the prompt: spoken words become the text prompt
4. Save every round and assemble the sequence as a piece
5. Compare musicgen-small with a larger checkpoint

---

## References

```bibtex
@inproceedings{copet2023musicgen, author={Copet, Jade and others}, title={Simple and Controllable Music Generation}, booktitle={NeurIPS 36}, year={2023}, pages={47704--47720}}
@inproceedings{gong2021ast, author={Gong, Yuan and Chung, Yu-An and Glass, James}, title={AST: Audio Spectrogram Transformer}, booktitle={Interspeech 2021}, year={2021}, pages={571--575}}
@inproceedings{wu2023clap, author={Wu, Yusong and others}, title={Large-Scale Contrastive Language-Audio Pretraining}, booktitle={ICASSP 2023}, year={2023}, pages={1--5}}
@inproceedings{radford2023whisper, author={Radford, Alec and others}, title={Robust Speech Recognition via Large-Scale Weak Supervision}, booktitle={ICML 2023, PMLR 202}, year={2023}, pages={28492--28518}}
```

Full entries in refs.bib
