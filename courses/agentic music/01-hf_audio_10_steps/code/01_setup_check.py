"""Step 1. Check Python, libraries, device, ffmpeg and audio input devices."""
import platform
import shutil
import sys

import sounddevice as sd
import torch
import transformers

print("python      :", sys.version.split()[0], platform.platform())
print("torch       :", torch.__version__, "| cuda:", torch.cuda.is_available())
print("transformers:", transformers.__version__)
print("ffmpeg      :", shutil.which("ffmpeg") or "not found (optional, fallback for some mp3)")
print("default I/O :", sd.default.device)
print(sd.query_devices())
