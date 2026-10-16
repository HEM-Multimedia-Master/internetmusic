"""Step 2. Download the four public models into the local Hugging Face cache.

No account or token is needed. Use the HF_HOME environment variable to move the cache.
"""
from pathlib import Path

from huggingface_hub import snapshot_download

from common import MODELS

SKIP = ["*.msgpack", "*.h5", "*.onnx", "*.ot"]


def fetch(repo):
    # Prefer safetensors only; fall back to every weight format if the repo has none.
    path = Path(snapshot_download(repo, ignore_patterns=SKIP + ["*.bin"]))
    if not list(path.glob("*.safetensors")):
        path = Path(snapshot_download(repo, ignore_patterns=SKIP))
    return path


for key, repo in MODELS.items():
    path = fetch(repo)
    size = sum(f.stat().st_size for f in path.rglob("*") if f.is_file())
    print(f"{key:9s} {repo:40s} {size / 1e6:8.0f} MB  {path}")
