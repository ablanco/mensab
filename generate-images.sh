#!/usr/bin/env bash
#
# Rebuild the backdrop's WebP and AVIF variants from original.jpg.
# The JPGs in assets/ are the reference sizes and are left untouched.

set -euo pipefail
cd "$(dirname "$0")"

for tool in magick avifenc; do
  command -v "$tool" >/dev/null ||
    { echo "error: $tool is required" >&2; exit 1; }
done

src=original.jpg
widths="960 1440 1920 2560 3840"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for w in $widths; do
  magick "$src" -resize "${w}x" -quality 65 "assets/back_${w}.webp"
  magick "$src" -resize "${w}x" "$tmp/back_${w}.png"
  # 420 chroma + q65
  # raise -q for more fidelity at the cost of weight.
  avifenc -y 420 --sharpyuv -q 65 "$tmp/back_${w}.png" "assets/back_${w}.avif" \
    >/dev/null
  echo "back_${w}: webp + avif written"
done
