# 01 Hugging Face audio models in 10 steps / en 10 étapes (Google Colab)

Slides (Obsidian Advanced Slides): `slides_en.md`, `slides_fr.md`
Google Colab Notebook (100% Cloud GPU, zero local install): `hf_audio_10_steps_colab.ipynb`
Reference scripts: `code/01` to `code/10`, shared helpers in `code/common.py`
References: `refs.bib`

## Cloud Setup / Exécution sur Google Colab (Recommandé — Zéro Installation)

1. Ouvrir `hf_audio_10_steps_colab.ipynb` dans **Google Colab** (`File → Upload notebook` ou depuis GitHub).
2. Activer le GPU gratuit : **Runtime → Change runtime type → T4 GPU** (*Exécution → Modifier le type d'exécution → GPU T4*).
3. Exécuter les cellules 1 à 10 directement dans le navigateur (microphone navigateur, AST, CLAP, Whisper, MusicGen et boucle agentique). Aucun Python ni modèle lourd n'est installé sur votre ordinateur.


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
