# AGENTS.md

Guidance for AI agents working on this site.

## What this is

A single-page personal homepage, live on [mensab.com](http://mensab.com).
Everything lives in one file, `index.html`: markup, CSS in a `<style>` block,
JS in small inline scripts. No build step, no dependencies.

## The rule

Keep it as minimal as possible: standard HTML.

- No `package.json`, npm, bundlers, frameworks, or CSS preprocessors.
- If a change seems to need a tool, do it with plain HTML/CSS/JS instead.
- Don't split `index.html` into separate CSS or JS files.
- The one exception to "no tooling" is `generate-images.sh`, a dev-only
  script for regenerating backdrop images. It never ships to visitors; the
  site itself still needs no tooling.

## When editing

- **Fonts are self-hosted on purpose** (`fonts/`) so no visitor data reaches a
  third party. Never swap in Google Fonts or a CDN. Keep the OFL license files
  alongside the fonts; the MIT license covers the site's code only.
- **The backdrop photo** is a `<picture>` with AVIF → WebP → JPG at five
  widths (960–3840). Its `sizes="max(100vw, 150vh)"` follows the photo's 3:2
  ratio, so recropping means updating `sizes`, the `srcset` widths, and the
  comment above them. The AVIF and WebP variants are regenerated with
  `./generate-images.sh`, which needs `magick`, `avifenc`, and
  `original.jpg` (the full-resolution source photo).
- **One breakpoint**, at 720px, collapses the two-column layout to one.
- **Comments** in the HTML and CSS explain the non-obvious choices. Keep them
  accurate when you change what they describe.
- The Google Analytics snippet in `<head>` is existing and intentional;
  don't add further third-party scripts.

## Verifying a change

There are no tests or linters. Open `index.html` in a browser and check the
page at desktop and narrow widths.
