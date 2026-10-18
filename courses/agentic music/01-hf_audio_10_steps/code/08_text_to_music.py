"""Step 8. Text to music with MusicGen small."""
import argparse

import soundfile as sf

from common import OUT, generate_music, load_musicgen

p = argparse.ArgumentParser()
p.add_argument("--prompt", default="slow ambient drone with bowed metal textures")
p.add_argument("--seconds", type=float, default=8)
a = p.parse_args()

processor, model = load_musicgen()
y, sr = generate_music(processor, model, a.prompt, a.seconds)

path = OUT / "musicgen_text.wav"
sf.write(path, y, sr)
print("saved", path)
