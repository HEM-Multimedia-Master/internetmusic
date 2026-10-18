"""Step 3. Record from the microphone and save out/mic.wav."""
import argparse

import numpy as np

from common import OUT, record

p = argparse.ArgumentParser()
p.add_argument("--seconds", type=float, default=5)
p.add_argument("--sr", type=int, default=16000)
a = p.parse_args()

y = record(a.seconds, a.sr, OUT / "mic.wav")
peak = float(np.abs(y).max())
print(f"saved {OUT / 'mic.wav'} | peak {peak:.3f}")
if peak < 0.01:
    print("Signal almost silent: check the system microphone permission for the terminal.")
