from pathlib import Path
from PIL import Image

src_dir = Path(r"D:\work\logic\space\daisySpaceSdk\public\models\fallback")
out_dir = Path(r"D:\work\logic\space\daisySpace\website\docs\public\images\models")
out_dir.mkdir(parents=True, exist_ok=True)

bg = (42, 42, 42, 255)
canvas = 640
inner = 400

for path in sorted(src_dir.glob("daisy-*.png")):
    im = Image.open(path).convert("RGBA")
    im = im.resize((inner, inner), Image.Resampling.LANCZOS)
    card = Image.new("RGBA", (canvas, canvas), bg)
    offset = ((canvas - inner) // 2, (canvas - inner) // 2)
    card.alpha_composite(im, offset)
    out = out_dir / path.name
    card.convert("RGB").save(out, "PNG", optimize=True)
    print(f"{out.name}: {out.stat().st_size} bytes")

print("done", out_dir)
