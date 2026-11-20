#!/usr/bin/env python3
"""Generate responsive WebP derivatives for every referenced catalog image.

Output: assets/webp/<stem>-480.webp, -960.webp and <stem>.webp (full width).
Idempotent: skips files whose source is older than the derivative.
"""
import json
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
OUT = os.path.join(ASSETS, "webp")
os.makedirs(OUT, exist_ok=True)

with open(os.path.join(ROOT, "website", "products_500.json"), encoding="utf-8") as fh:
    products = json.load(fh)

sources = sorted({p["Image"].replace("../assets/", "") for p in products if p.get("Image")})
# plus the curated hero/lifestyle images used in page backgrounds
extra = [f for f in os.listdir(ASSETS) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
sources = sorted(set(sources) | set(extra))

made = skipped = failed = 0
before = after = 0

for name in sources:
    src = os.path.join(ASSETS, name)
    if not os.path.exists(src):
        failed += 1
        continue
    stem = os.path.splitext(name)[0]
    full = os.path.join(OUT, f"{stem}.webp")
    try:
        src_mtime = os.path.getmtime(src)
        v480 = os.path.join(OUT, f"{stem}-480.webp")
        v960 = os.path.join(OUT, f"{stem}-960.webp")
        if os.path.exists(full) and os.path.exists(v480) and os.path.exists(v960) and os.path.getmtime(full) >= src_mtime:
            skipped += 1
            continue
        im = Image.open(src).convert("RGB")
        before += os.path.getsize(src)

        if not os.path.exists(full) or os.path.getmtime(full) < src_mtime:
            im.save(full, "WEBP", quality=80, method=6)
            after += os.path.getsize(full)

        for width in (480, 960):
            variant = os.path.join(OUT, f"{stem}-{width}.webp")
            if os.path.exists(variant) and os.path.getmtime(variant) >= src_mtime:
                continue
            if im.width <= width:
                im.save(variant, "WEBP", quality=80, method=6)
                continue
            ratio = width / im.width
            resized = im.resize((width, max(1, round(im.height * ratio))), Image.LANCZOS)
            resized.save(variant, "WEBP", quality=78, method=6)
        made += 1
    except Exception as exc:
        failed += 1
        print("FAIL", name, exc, file=sys.stderr)

print(json.dumps({
    "sources": len(sources),
    "converted": made,
    "skipped_fresh": skipped,
    "failed": failed,
    "jpeg_mb": round(before / 1048576, 1),
    "webp_mb": round(after / 1048576, 1),
    "derivatives": len(os.listdir(OUT)),
}, indent=2))
