#!/usr/bin/env python3
"""Turn a photo into public/portrait.bin, the dot data behind the hero portrait.

Only the dots are published, so the original photo and its metadata stay off the site.
macOS only, because it uses sips to crop and decode:

    python3 scripts/bake-portrait.py path/to/photo.jpg

Each dot is three bytes: column, row, and size in the low 7 bits with the high bit
marking the blue sweater. The file starts with two bytes for the grid size.
"""
import os
import struct
import subprocess
import sys
import tempfile

CROP_X, CROP_Y, CROP_W, CROP_H = 70, 20, 521, 620
COLS, ROWS = 104, 124


def read_bmp(path):
    data = open(path, "rb").read()
    offset, width, height, bits = (
        struct.unpack_from("<I", data, 10)[0],
        struct.unpack_from("<i", data, 18)[0],
        struct.unpack_from("<i", data, 22)[0],
        struct.unpack_from("<H", data, 28)[0],
    )
    size = bits // 8
    stride = (width * size + 3) // 4 * 4
    bottom_up = height > 0
    height = abs(height)
    rows = []
    for j in range(height):
        start = offset + (height - 1 - j if bottom_up else j) * stride
        rows.append([(data[start + i * size + 2], data[start + i * size + 1], data[start + i * size]) for i in range(width)])
    return rows


def main(photo):
    with tempfile.TemporaryDirectory() as tmp:
        cropped = os.path.join(tmp, "crop.png")
        bmp = os.path.join(tmp, "p.bmp")
        # Separate passes, because sips resizes before it crops when given both at once.
        for args in (
            ["-s", "format", "png", "-c", str(CROP_H), str(CROP_W), "--cropOffset", str(CROP_Y), str(CROP_X), photo, "--out", cropped],
            ["-s", "format", "bmp", "-z", str(ROWS), str(COLS), cropped, "--out", bmp],
        ):
            subprocess.run(["sips", *args], check=True, stdout=subprocess.DEVNULL)
        pixels = read_bmp(bmp)

    out = bytearray([COLS, ROWS])
    count = 0
    for j, row in enumerate(pixels):
        for i, (r, g, b) in enumerate(row):
            lum = r * 0.3 + g * 0.59 + b * 0.11
            if r - b < 26 and lum > 118:  # the plain wall behind me
                continue
            dark = max(0.0, min(1.0, (186 - lum) / 142))
            size = 0.66 * dark ** 0.72
            if size < 0.1:
                continue
            u, v = (i + 0.5) / COLS, (j + 0.5) / ROWS
            blue = lum < 62 and (v > 0.7 or (v > 0.62 and abs(u - 0.5) > 0.19))
            out += bytes([i, j, min(127, round(size * 190)) | (128 if blue else 0)])
            count += 1

    target = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "portrait.bin")
    with open(target, "wb") as f:
        f.write(out)
    print(f"{count} dots, {len(out)} bytes")


if __name__ == "__main__":
    main(sys.argv[1])
