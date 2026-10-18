"""Step 9. Text plus audio to music: MusicGen continues an audio prompt (mic or mp3)."""
import argparse

import soundfile as sf

from common import OUT, generate_music, get_audio, load_musicgen

p = argparse.ArgumentParser()
p.add_argument("--source", default="mic")
p.add_argument("--prompt", default="sparse piano and granular noise")
p.add_argument("--prompt-seconds", type=float, default=5, help="length of the audio prompt")
p.add_argument("--seconds", type=float, default=8, help="length of the generated continuation")
a = p.parse_args()

processor, model = load_musicgen()
sr = model.config.audio_encoder.sampling_rate  # 32 kHz
prompt_audio = get_audio(a.source, sr, a.prompt_seconds)

y, sr = generate_music(processor, model, a.prompt, a.seconds, audio=prompt_audio)

path = OUT / "musicgen_audio.wav"
sf.write(path, y, sr)
print("saved", path)
