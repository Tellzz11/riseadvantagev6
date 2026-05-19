#!/usr/bin/env bash
# scripts/post-grade.sh
#
# Closes ~70% of the "AI tell" gap per SUPERSIDE-AUDIT §3.5/§3.8.
# Single ffmpeg pipeline. Apply to every Higgsfield/Kling output before
# committing into public/.
#
# What the chain does (in order):
#   1. crop/scale to 1080×1080 square if hero; or 1920×1080 if wide
#   2. Kodak-Portra-style colour grade — warm shadows, lifted blacks,
#      rolled-off highlights. Approximated via curves + colour-channel
#      eq (no LUT file dependency)
#   3. Mid-tone lift (HDR-style)
#   4. Subtle vignette (radial darkening at edges)
#   5. Real film grain at ~250 ISO equivalent
#   6. Edge chromatic aberration (very subtle — 0.4px shift on R/B channels)
#   7. Re-encode H.264 Main yuv420p, target ~4 Mbps (clean, not aggressive)
#   8. Strip audio (hero loops are ambient — silent by design)
#
# Usage:  ./scripts/post-grade.sh <input.mp4> <output.mp4> [square|wide]
# Default is square (matches Hero). 'wide' is for the CinematicBreak.

set -euo pipefail

INPUT="${1:?usage: post-grade.sh <input> <output> [square|wide]}"
OUTPUT="${2:?missing output path}"
MODE="${3:-square}"

if [[ "$MODE" == "wide" ]]; then
  SCALE="scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080"
else
  SCALE="scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080"
fi

# Compose the filtergraph. Single pass.
FILTER="$SCALE,"\
"eq=contrast=1.06:saturation=0.92:brightness=0.01:gamma_r=0.98:gamma_b=1.04,"\
"curves=preset=lighter,"\
"vignette=PI/4.2:eval=init,"\
"noise=alls=4:allf=t,"\
"rgbashift=rh=1:bh=-1"

ffmpeg -y -i "$INPUT" \
  -vf "$FILTER" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -b:v 4M -maxrate 5M -bufsize 8M \
  -movflags +faststart \
  -an \
  -loglevel warning \
  "$OUTPUT"

echo "POST-GRADED: $INPUT -> $OUTPUT"
ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=codec_name,width,height -of default=noprint_wrappers=1 "$OUTPUT"
