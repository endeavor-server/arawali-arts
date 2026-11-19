#!/usr/bin/env python3
"""Build the 1200x630 Open Graph card from the workshop hero image."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "hero_jodhpur_workshop.jpg")
OUT = os.path.join(ROOT, "assets", "og", "arawali-og.jpg")
W, H = 1200, 630

im = Image.open(SRC).convert("RGB")
# cover-crop
ratio = max(W / im.width, H / im.height)
im = im.resize((int(im.width * ratio) + 1, int(im.height * ratio) + 1), Image.LANCZOS)
left = (im.width - W) // 2
top = (im.height - H) // 2
im = im.crop((left, top, left + W, top + H))

# darken for legibility
overlay = Image.new("RGB", (W, H), (12, 9, 7))
im = Image.blend(im, overlay, 0.58)

draw = ImageDraw.Draw(im)
gold = (197, 160, 89)
cream = (245, 240, 232)
muted = (214, 204, 190)

def font(path, size):
    return ImageFont.truetype(path, size)

georgia = "/System/Library/Fonts/Supplemental/Georgia.ttf"
georgia_bold = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
helv = "/System/Library/Fonts/Supplemental/Arial.ttf"
helv_bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

draw.line([(72, 88), (1128, 88)], fill=(120, 98, 60), width=1)
draw.text((72, 106), "J O D H P U R   •   E S T .   2 0 1 1", font=font(helv, 18), fill=gold)
draw.text((70, 150), "Arawali Arts", font=font(georgia_bold, 78), fill=cream)
draw.text((72, 258), "Handcrafted furniture, lighting and ironwork", font=font(georgia, 34), fill=(232, 223, 211))
draw.text((72, 300), "for the world's wholesale importers.", font=font(georgia, 34), fill=(232, 223, 211))

# stat strip
stats = [("500", "export SKUs"), ("50", "product lines"), ("4", "master divisions")]
x = 72
for value, label in stats:
    draw.text((x, 408), value, font=font(georgia_bold, 46), fill=gold)
    draw.text((x, 466), label, font=font(helv, 17), fill=muted)
    x += 240

draw.line([(72, 536), (1128, 536)], fill=(90, 74, 48), width=1)
draw.text((72, 556), "FOB MUNDRA  ·  VRIKSH / LACEY / EUDR  ·  KILN-DRIED 8–10%", font=font(helv_bold, 17), fill=(206, 193, 172))
draw.text((936, 556), "arawaliarts.com", font=font(helv_bold, 17), fill=gold)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
im.save(OUT, "JPEG", quality=86, optimize=True, progressive=True)
print(OUT, os.path.getsize(OUT) // 1024, "KB")
