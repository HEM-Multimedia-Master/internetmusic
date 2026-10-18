"""Step 10. Perceive, decide, act. The generated audio becomes the next input (feedback loop).

decide() is a fixed rule table. Replace it with a call to a language model to obtain
a more agentic policy: the loop structure stays the same.
"""
import argparse

import soundfile as sf
from transformers import pipeline

from common import DEVICE, MODELS, OUT, generate_music, get_audio, load_musicgen, resample

CLAP_SR, MUSICGEN_SR = 48000, 32000

STYLES = {
    "speech": "sparse ambient pads with soft granular textures",
    "applause": "dry polyrhythmic percussion, close microphone",
    "water": "slow harp arpeggios in a long reverb",
    "traffic": "industrial drones with metallic resonances",
    "birds": "pointillist piano in the high register",
    "silence": "low sustained drone, very slow evolution",
    "music": "contrasting counterpoint in a different timbre",
}


def perceive(clap, y):
    best = clap(y, candidate_labels=list(STYLES))[0]
    return best["label"], best["score"]


def decide(label, history):
    prompt = STYLES[label]
    if history and history[-1] == label:
        prompt += ", with an abrupt change of register"
    return prompt


p = argparse.ArgumentParser()
p.add_argument("--source", default="mic")
p.add_argument("--seconds", type=float, default=8)
p.add_argument("--rounds", type=int, default=3)
a = p.parse_args()

clap = pipeline("zero-shot-audio-classification", model=MODELS["clap"], device=DEVICE)
processor, model = load_musicgen()

history = []
y = get_audio(a.source, CLAP_SR, a.seconds)

for i in range(a.rounds):
    label, score = perceive(clap, y)
    prompt = decide(label, history)
    history.append(label)
    print(f"round {i}: heard '{label}' ({score:.2f}) -> prompt '{prompt}'")

    context = resample(y, CLAP_SR, MUSICGEN_SR)[-5 * MUSICGEN_SR:]
    out, sr = generate_music(processor, model, prompt, a.seconds, audio=context)
    sf.write(OUT / f"agent_round_{i}.wav", out, sr)

    y = resample(out, sr, CLAP_SR)

print("history:", history)
