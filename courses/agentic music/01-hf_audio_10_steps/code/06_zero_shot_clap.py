"""Step 6. Zero-shot classification with CLAP: the labels are free text written by the user."""
import argparse

from transformers import pipeline

from common import DEVICE, MODELS, get_audio

p = argparse.ArgumentParser()
p.add_argument("--source", default="mic")
p.add_argument("--seconds", type=float, default=10)
p.add_argument("--labels", default="speech,music,silence,water,traffic,birds,applause")
a = p.parse_args()

clf = pipeline("zero-shot-audio-classification", model=MODELS["clap"], device=DEVICE)
sr = clf.feature_extractor.sampling_rate  # 48 kHz
y = get_audio(a.source, sr, a.seconds)

for r in clf(y, candidate_labels=a.labels.split(",")):
    print(f"{r['score']:.3f}  {r['label']}")
