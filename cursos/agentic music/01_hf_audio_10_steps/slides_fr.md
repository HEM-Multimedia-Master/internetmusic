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

#   modèles audio libres de Hugging Face

Dix étapes : microphone, mp3, texte et audio comme entrées

Cours : Internet et musique agentique

note: Le dossier code/ contient un script par étape. Diapositives et code sont synchronisés : l'étape N correspond au fichier 0N_*.py.

---

## Cadre

- Exécution locale, modèles publics, sans compte ni clé d'API
- Entrées : microphone, fichiers mp3, textes (prompts)
- Modèles : AST, CLAP, Whisper, MusicGen
- Sortie : fichiers wav dans code/out/

--

### Agentique, au sens minimal

Une boucle en trois gestes :

1. Percevoir : un modèle décrit le son entrant
2. Décider : une politique transforme la description en action
3. Agir : un modèle génératif produit du son, qui est perçu à nouveau

note: L'étape 10 réalise la boucle avec une table de règles. La politique est la partie à remplacer plus tard par un modèle de langage.

---

## Modèles

| Tâche | Modèle | Rôle |
| --- | --- | --- |
| Classification à étiquettes fixes | MIT/ast-finetuned-audioset-10-10-0.4593 | Percevoir |
| Classification en texte libre | laion/clap-htsat-unfused | Percevoir |
| Parole vers texte | openai/whisper-tiny | Percevoir |
| Texte ou audio vers musique | facebook/musicgen-small | Agir |

Vérifier la licence sur chaque fiche de modèle. Les poids de MusicGen sont non commerciaux (CC-BY-NC 4.0, à vérifier sur la fiche).

---

## Étape 1. Environnement

```bash
cd "agentic music/01_hf_audio_10_steps"
python3 -m venv .venv
source .venv/bin/activate          # Windows : .venv\Scripts\activate
pip install -r requirements.txt
cd code
python 01_setup_check.py
```

note: ffmpeg est facultatif. L'installer (brew install ffmpeg, ou winget install ffmpeg sous Windows) seulement si un mp3 ne se charge pas.

---

## Étape 2. Télécharger les modèles

```bash
python 02_download_models.py
```

```python
path = snapshot_download(repo, ignore_patterns=["*.msgpack", "*.h5", "*.onnx", "*.bin"])
```

- Les fichiers vont dans le cache Hugging Face, une seule fois
- HF_HOME déplace le cache vers un autre disque
- Prévoir plusieurs Go au total, MusicGen étant le plus lourd

---

## Étape 3. Microphone

```bash
python 03_record_mic.py --seconds 5
```

```python
y = sd.rec(int(seconds * sr), samplerate=sr, channels=1, dtype="float32")
sd.wait()
```

- Résultat : out/mic.wav
- macOS : autoriser le terminal dans Réglages Système, Confidentialité, Microphone
- Un pic inférieur à 0,01 indique le silence ou une autorisation bloquée

---

## Étape 4. Lire un mp3

```bash
python 04_inspect_audio.py --source ../song.mp3 --seconds 10
```

```python
y, _ = librosa.load(path, sr=22050, mono=True, duration=10)
S = librosa.power_to_db(librosa.feature.melspectrogram(y=y, sr=22050), ref=np.max)
```

- Chaque modèle attend sa propre fréquence d'échantillonnage : 16 kHz, 32 kHz, 48 kHz
- Le rééchantillonnage revient dans tout pipeline audio

---

## Étape 5. Classer avec AST

```bash
python 05_classify_ast.py --source mic
```

```python
clf = pipeline("audio-classification", model="MIT/ast-finetuned-audioset-10-10-0.4593")
clf({"raw": y, "sampling_rate": 16000}, top_k=5)
```

- 527 classes fixes issues de l'ontologie AudioSet (Gemmeke et al., 2017)
- La musique se réduit à quelques étiquettes de genre et d'instrument

---

## Étape 6. Zero-shot avec CLAP

```bash
python 06_zero_shot_clap.py --labels "speech,rain,a cello,noise,silence"
```

```python
clf = pipeline("zero-shot-audio-classification", model="laion/clap-htsat-unfused")
clf(y, candidate_labels=labels)
```

- Les étiquettes sont du texte libre : le vocabulaire appartient à l'utilisateur
- Les scores sont relatifs à la liste de candidats, non absolus

---

## Étape 7. Parole vers texte

```bash
python 07_transcribe_whisper.py --lang french --model openai/whisper-base
```

```python
asr = pipeline("automatic-speech-recognition", model="openai/whisper-tiny", chunk_length_s=30)
asr({"raw": y, "sampling_rate": 16000})["text"]
```

- whisper-tiny est rapide et faible hors de l'anglais
- Comparer tiny, base, small sur le même enregistrement

---

## Étape 8. Texte vers musique

```bash
python 08_text_to_music.py --prompt "slow ambient drone with bowed metal textures"
```

```python
out = model.generate(**inputs, do_sample=True, guidance_scale=3.0, max_new_tokens=seconds * 50)
```

- Cinquante jetons par seconde d'audio
- Sur CPU, 8 secondes d'audio prennent environ une minute (indicatif)
- Sortie : out/musicgen_text.wav

---

## Étape 9. Texte et audio vers musique

```bash
python 09_audio_to_music.py --source mic --prompt "sparse piano and granular noise"
python 09_audio_to_music.py --source ../song.mp3 --prompt-seconds 5
```

```python
inputs = processor(text=[prompt], audio=prompt_audio, sampling_rate=32000,
                   padding=True, return_tensors="pt")
```

- Le modèle prolonge l'audio d'amorce sous la conduite du texte
- Il ne transforme pas l'amorce : il la prolonge

---

## Étape 10. Boucle d'agent

```bash
python 10_agent_loop.py --source mic --rounds 3
```

```python
label, score = perceive(clap, y)          # CLAP écoute
prompt = decide(label, history)           # la table de règles décide
out, sr = generate_music(processor, model, prompt, seconds, audio=context)  # MusicGen agit
y = resample(out, sr, CLAP_SR)            # la sortie est entendue au tour suivant
```

note: La sortie du tour i est l'entrée du tour i+1. Essayer le silence, la parole et une suite d'applaudissements comme points de départ.

---

## Limites et critique

- La politique est une table fixe : la boucle est agentique par sa structure, non par son autonomie
- AST et CLAP imposent un vocabulaire ; ce qui en sort est rendu par l'étiquette la plus proche
- MusicGen est entraîné sur de la musique de catalogue : la sortie tend vers cet idiome
- La formulation du prompt change fortement les résultats, sans règle stable
- Coût : calcul local, temps d'attente, licence non commerciale des poids

---

## Variations

1. Remplacer decide() par un appel à un modèle de langage qui reçoit l'historique des étiquettes
2. Remplacer les classes d'AST par des étiquettes CLAP écrites par l'étudiant
3. Enchaîner Whisper dans le prompt : les mots prononcés deviennent le texte d'amorce
4. Sauvegarder chaque tour et assembler la séquence en pièce
5. Comparer musicgen-small avec un point de contrôle plus grand

---

## Références

```bibtex
@inproceedings{copet2023musicgen, author={Copet, Jade and others}, title={Simple and Controllable Music Generation}, booktitle={NeurIPS 36}, year={2023}, pages={47704--47720}}
@inproceedings{gong2021ast, author={Gong, Yuan and Chung, Yu-An and Glass, James}, title={AST: Audio Spectrogram Transformer}, booktitle={Interspeech 2021}, year={2021}, pages={571--575}}
@inproceedings{wu2023clap, author={Wu, Yusong and others}, title={Large-Scale Contrastive Language-Audio Pretraining}, booktitle={ICASSP 2023}, year={2023}, pages={1--5}}
@inproceedings{radford2023whisper, author={Radford, Alec and others}, title={Robust Speech Recognition via Large-Scale Weak Supervision}, booktitle={ICML 2023, PMLR 202}, year={2023}, pages={28492--28518}}
```

Entrées complètes dans refs.bib
