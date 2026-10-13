# Rebuilding Battery Atlas

Run from the repository root with Node.js and Python 3:

```sh
node generate-pages.mjs
node generate-guides.mjs
node generate-overviews.mjs
python generate-english.py
python validate-site.py
```

`generate-pages.mjs` also recreates the Korean homepage, privacy notice, About and Contact pages. Homepage and privacy sources are in `templates/`; About and Contact sources are in `generate-support.mjs`. All three JavaScript page generators use `page-common.mjs` for shared SEO metadata and footer links.

English strings are maintained in `translations-ko.json` and `translations-en.tsv`, with matching numeric indices. `generate-english.py` translates the Korean pages, preserves the language switch links, routes internal page links to `/en/`, and runs `generate-seo.mjs` for both languages. That final pass generates `robots.txt` and a sitemap with self-referencing canonical URLs, reciprocal language alternatives and Korean x-default URLs.

The modification date for sitemap entries is maintained in `site-config.json`. Update it when publishing substantive page changes; do not treat it as the reference year of statistics. The privacy notice's effective date is maintained in its source template.

Do not alter the existing AdSense script (`ca-pub-9806292747404740`) or `dist/ads.txt`. The validator checks their presence and the original ads.txt checksum. The privacy and support pages also include the original ad script.

## CMP configuration

The notice describes the intended use of a Google-certified CMP and clearly states that setup and regional verification must be completed before ad serving. Writing this notice does not activate consent collection. In AdSense, open **Privacy & messaging → European regulations**, create and publish a consent message for `batteryatlas.kr`, select languages as appropriate, and verify the consent choices for EEA, UK and Swiss traffic.

## www canonical host

All page canonical URLs and sitemap URLs use `https://batteryatlas.kr`. DNS records have not been changed. A hostname-level 301 rule requires the hosting/edge administrator to configure: when the request hostname is `www.batteryatlas.kr`, redirect to `https://batteryatlas.kr` with the original path and query string, status **301**. This must be an HTTP redirect, not only a DNS CNAME or client-side JavaScript. If the current hosting panel does not expose redirect rules, request this rule from the hosting provider before changing DNS.
