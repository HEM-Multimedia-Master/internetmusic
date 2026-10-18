"""Step 7. Speech to text with Whisper. whisper-tiny is fast but weak outside English."""
import argparse

from transformers import pipeline

from common import DEVICE, MODELS, get_audio

p = argparse.ArgumentParser()
p.add_argument("--source", default="mic")
p.add_argument("--seconds", type=float, default=10)
p.add_argument("--lang", default=None, help="for example: french, spanish, english")
p.add_argument("--model", default=MODELS["whisper"], help="try openai/whisper-base or whisper-small")
a = p.parse_args()

sr = 16000
asr = pipeline("automatic-speech-recognition", model=a.model, device=DEVICE, chunk_length_s=30)
y = get_audio(a.source, sr, a.seconds)

kwargs = {"language": a.lang} if a.lang else {}
print(asr({"raw": y, "sampling_rate": sr}, generate_kwargs=kwargs)["text"])
