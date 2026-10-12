from pathlib import Path
import hashlib
root = Path(__file__).resolve().parent
parts = sorted(root.glob("battery-atlas.bundle.part[0-9][0-9]"))
if len(parts) != 10:
    raise SystemExit("Expected all 10 bundle parts")
output = root / "battery-atlas.bundle"
with output.open("wb") as f:
    for part in parts:
        f.write(part.read_bytes())
if hashlib.sha256(output.read_bytes()).hexdigest() != "5d62cc42d782adbfcb5dad4bca9632e9b92d083382d1da3e7a405de6f8dc72b8":
    raise SystemExit("Backup checksum mismatch")
print(f"Restored {output} ({output.stat().st_size:,} bytes)")
print("Verify: git bundle verify history/battery-atlas.bundle")
