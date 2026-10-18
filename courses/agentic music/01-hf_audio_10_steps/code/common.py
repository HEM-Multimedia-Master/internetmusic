"""Shared helpers for the agentic music exercise."""
from pathlib import Path

import librosa
import numpy as np
import soundfile as sf
import torch
from transformers import AutoProcessor, MusicgenForConditionalGeneration

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "out"
OUT.mkdir(exist_ok=True)

# MPS is avoided on purpose: MusicGen has unsupported operators there.
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

MODELS = {
    "ast": "MIT/ast-finetuned-audioset-10-10-0.4593",
    "clap": "laion/clap-htsat-unfused",
    "whisper": "openai/whisper-tiny",
    "musicgen": "facebook/musicgen-small",
}


def record(seconds, sr, path=None):
    import sounddevice as sd

    print(f"Recording {seconds} s at {sr} Hz ...")
    y = sd.rec(int(seconds * sr), samplerate=sr, channels=1, dtype="float32")
    sd.wait()
    y = y[:, 0]
    if path is not None:
        sf.write(path, y, sr)
    return y


def load_audio(path, sr, seconds=None):
    y, _ = librosa.load(path, sr=sr, mono=True, duration=seconds)
    return y


def get_audio(source, sr, seconds):
    """source is either 'mic' or the path of an audio file (mp3, wav, flac)."""
    if source == "mic":
        return record(seconds, sr, OUT / "mic.wav")
    return load_audio(source, sr, seconds)


def resample(y, orig_sr, target_sr):
    return librosa.resample(y, orig_sr=orig_sr, target_sr=target_sr)


def load_musicgen():
    name = MODELS["musicgen"]
    processor = AutoProcessor.from_pretrained(name)
    model = MusicgenForConditionalGeneration.from_pretrained(name).to(DEVICE)
    return processor, model


def generate_music(processor, model, prompt, seconds=5, audio=None):
    """Text-to-music, or text plus audio prompt (continuation) when audio is given.

    audio must be a mono float32 array sampled at the model rate (32 kHz).
    The model produces 50 tokens per second of audio.
    """
    sr = model.config.audio_encoder.sampling_rate
    kwargs = dict(text=[prompt], padding=True, return_tensors="pt")
    if audio is not None:
        kwargs.update(audio=np.asarray(audio, dtype=np.float32), sampling_rate=sr)
    inputs = processor(**kwargs).to(DEVICE)
    with torch.no_grad():
        out = model.generate(
            **inputs,
            do_sample=True,
            guidance_scale=3.0,
            max_new_tokens=int(seconds * 50),
        )
    return out[0, 0].cpu().numpy(), sr
