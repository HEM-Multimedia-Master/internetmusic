# 01 Hugging Face audio models in 10 steps / en 10 étapes

Slides (Obsidian Advanced Slides): slides_en.md, slides_fr.md
Code: code/01 to code/10, shared helpers in code/common.py
References: refs.bib

Setup / Installation

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd code
python 01_setup_check.py
python 02_download_models.py
```

Run order / Ordre d'exécution

| Step | Script | Input |
| --- | --- | --- |
| 1 | 01_setup_check.py | none |
| 2 | 02_download_models.py | none |
| 3 | 03_record_mic.py | microphone |
| 4 | 04_inspect_audio.py | mic or mp3 |
| 5 | 05_classify_ast.py | mic or mp3 |
| 6 | 06_zero_shot_clap.py | mic or mp3, free-text labels |
| 7 | 07_transcribe_whisper.py | mic or mp3 |
| 8 | 08_text_to_music.py | text |
| 9 | 09_audio_to_music.py | mic or mp3, text |
| 10 | 10_agent_loop.py | mic or mp3 |

Option --source takes "mic" or a file path (mp3, wav, flac). Outputs go to code/out/.
