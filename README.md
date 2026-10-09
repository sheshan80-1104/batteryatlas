# Battery Atlas

배터리 아틀라스 — by Halmen 2026

Website: https://batteryatlas.kr

## Source

- `dist/`: published Korean and English static pages, scripts, styles, and product images
- `generate-*.mjs`, `generate-english.py`: page generators
- `translations-*`: Korean and English translation data
- `site-archive.zip`: committed Site deployment archive

## Preview

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000/ (Korean) or http://localhost:8000/en/ (English).

## History backup

`history/battery-atlas.bundle` contains the original complete Git history (10 commits), through `cf84630d45c96feb6b722148b9d0fac9e0397aaf`.

Restore it to a separate folder:

```sh
git clone history/battery-atlas.bundle battery-atlas-original
```

This repository stores a source snapshot and original history backup. Production hosting and domain settings remain managed by ChatGPT Sites; GitHub pushes do not automatically deploy the website.
