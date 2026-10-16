"""Step 4. Read an mp3 (or the microphone), print basic measures, save a mel spectrogram."""
import argparse

import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

from common import OUT, get_audio

p = argparse.ArgumentParser()
p.add_argument("--source", default="mic", help="'mic' or a path such as song.mp3")
p.add_argument("--seconds", type=float, default=10)
a = p.parse_args()

sr = 22050
y = get_audio(a.source, sr, a.seconds)
print(f"duration {len(y) / sr:.2f} s | rms {np.sqrt(np.mean(y ** 2)):.4f} | peak {np.abs(y).max():.3f}")

S = librosa.power_to_db(librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128), ref=np.max)
fig, ax = plt.subplots(figsize=(10, 4))
img = librosa.display.specshow(S, sr=sr, x_axis="time", y_axis="mel", ax=ax)
fig.colorbar(img, ax=ax, format="%+2.0f dB")
fig.savefig(OUT / "spectrogram.png", dpi=150, bbox_inches="tight")
print("saved", OUT / "spectrogram.png")
