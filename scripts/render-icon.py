"""Render the vector icon geometry as antialiased, dependency-light catalog PNGs.
Run with Python + Pillow; the coordinate system matches assets/icon.svg.
"""
from pathlib import Path
import math
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SCALE = 64
image = Image.new('RGBA', (40 * SCALE, 40 * SCALE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
cyan = '#35c8ed'

def box(x0, y0, x1, y1):
    return tuple(round(v * SCALE) for v in (x0, y0, x1, y1))

draw.rounded_rectangle(box(0, 0, 40, 40), radius=8*SCALE, fill='#151c26')
for x, y, color in [(9, 9, cyan), (17, 9, cyan), (9, 17, cyan), (17, 17, '#778596')]:
    draw.rounded_rectangle(box(x+4, y+4, x+10, y+10), radius=1.5*SCALE, fill=color)
draw.arc(box(7, 7, 33, 33), 135, 345, fill=cyan, width=round(2.4*SCALE))
for angle in [135, 345]:
    rad = math.radians(angle)
    x, y = 20+13*math.cos(rad), 20+13*math.sin(rad)
    draw.ellipse(box(x-1.2, y-1.2, x+1.2, y+1.2), fill=cyan)
draw.polygon([(round((x+4)*SCALE), round((y+4)*SCALE)) for x, y in [(24.8, 11.7), (29.1, 15.2), (30.8, 9.8)]], fill=cyan)
for size, name in [(512, 'icon.png'), (180, 'icon-180.png')]:
    image.resize((size, size), Image.Resampling.LANCZOS).save(ROOT / 'assets' / name)
    print(f'Saved assets/{name}: {size}x{size}')
