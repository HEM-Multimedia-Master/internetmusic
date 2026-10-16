"""Step 5. Classify audio with AST (527 AudioSet classes)."""
import argparse

from transformers import pipeline

from common import DEVICE, MODELS, get_audio

p = argparse.ArgumentParser()
p.add_argument("--source", default="mic")
p.add_argument("--seconds", type=float, default=10)
a = p.parse_args()

sr = 16000
clf = pipeline("audio-classification", model=MODELS["ast"], device=DEVICE)
y = get_audio(a.source, sr, a.seconds)

for r in clf({"raw": y, "sampling_rate": sr}, top_k=5):
    print(f"{r['score']:.3f}  {r['label']}")
