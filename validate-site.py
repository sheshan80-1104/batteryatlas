from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import hashlib
import json
import re
import xml.etree.ElementTree as ET

config = json.loads(Path('site-config.json').read_text())
root = Path('dist')
AD_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9806292747404740'
ADS_HASH = '3f5e70f62fd8b50a0f8b4351b2fbf26a9b6afd84c9d6ce55cd1aa13af4b9834f'


class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


files = sorted(root.rglob('index.html'))
assert len(files) == 68, f'Expected 34 Korean and 34 English pages, got {len(files)}'
paths = set()
for file in files:
    relative = file.parent.relative_to(root).as_posix()
    path = '/' if relative == '.' else '/' + relative + '/'
    paths.add(path)
    english = path.startswith('/en/')
    ko = path[3:] if english else path
    tags = Tags()
    html = file.read_text()
    tags.feed(html)
    ads = [a for t, a in tags.tags if t == 'script' and a.get('src') == AD_URL]
    assert len(ads) == 1 and ads[0].get('crossorigin') == 'anonymous' and 'async' in ads[0], (file, 'AdSense')
    canonical = [a for t, a in tags.tags if t == 'link' and a.get('rel') == 'canonical']
    assert len(canonical) == 1 and canonical[0]['href'] == config['origin'] + path, (file, 'canonical')
    alternatives = {a['hreflang']: a['href'] for t, a in tags.tags if t == 'link' and a.get('rel') == 'alternate' and 'hreflang' in a}
    assert alternatives == {'ko': config['origin'] + ko, 'en': config['origin'] + '/en' + ko, 'x-default': config['origin'] + ko}, (file, 'hreflang')
    schema_blocks = re.findall(r'<script type="application/ld\+json" data-batteryatlas-seo>(.*?)</script>', html)
    assert len(schema_blocks) == 1, (file, 'structured data')
    schema = json.loads(schema_blocks[0])
    assert schema['url'] == config['origin'] + path and schema['inLanguage'] == ('en' if english else 'ko'), (file, 'structured data URL and language')
    assert html.count('name="naver-site-verification"') == int(path == '/'), (file, 'Naver verification')
    title = re.search(r'<title>(.*?)</title>', html).group(1)
    if english:
        assert not re.search(r'[가-힣]', title), (file, 'English title')
    og = {a['property']: a['content'] for t, a in tags.tags if t == 'meta' and a.get('property', '').startswith('og:')}
    assert set(og) == {'og:title', 'og:description', 'og:url', 'og:type', 'og:locale'} and all(og.values()), (file, 'Open Graph')
    assert og['og:url'] == config['origin'] + path and og['og:locale'] == ('en_US' if english else 'ko_KR'), (file, 'Open Graph locale/URL')
    prefix = '/en' if english else ''
    footer = html.split('<footer>', 1)[1].split('</footer>', 1)[0]
    for slug in ['about', 'contact', 'privacy']:
        assert f'href="{prefix}/{slug}/"' in footer, (file, 'footer')
    ko_switch = f'href="{ko}" lang="ko" hreflang="ko"'
    assert ko_switch in html, (file, 'Korean language switch')
    if ko == '/':
        directory = html.split('id="technology-directory"', 1)[1].split('id="manufacturerRanking"', 1)[0]
        directory_links = re.findall(r'href="technology/([^/"]+)/"', directory)
        expected_technologies = {page.parent.name for page in (root / prefix.lstrip('/') / 'technology').glob('*/index.html')}
        assert len(directory_links) == len(expected_technologies) and set(directory_links) == expected_technologies, (file, 'technology directory')
        assert 'href="guide/ess/#duration-calculator"' in html, (file, 'ESS calculator link')
    if ko == '/guide/ess/':
        assert 'id="duration-calculator"' in html and 'src="/ess-duration.js"' in html, (file, 'ESS calculator')

assert (root / 'ess-duration.js').read_bytes() == Path('templates/ess-duration.js').read_bytes(), 'ESS calculator build does not match its source'

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
sitemap = ET.parse(root / 'sitemap.xml').getroot()
urls = sitemap.findall('s:url', ns)
assert len(urls) == len(files)
assert {urlsplit(u.find('s:loc', ns).text).path for u in urls} == paths
for url in urls:
    loc = url.find('s:loc', ns).text
    assert loc.startswith(config['origin'] + '/')
    alt = {a.attrib['hreflang']: a.attrib['href'] for a in url.findall('x:link', ns)}
    path = urlsplit(loc).path
    ko = path[3:] if path.startswith('/en/') else path
    assert url.find('s:lastmod', ns).text == config.get('pageModifiedDates', {}).get(ko, config['modifiedDate'])
    assert alt == {'ko': config['origin'] + ko, 'en': config['origin'] + '/en' + ko, 'x-default': config['origin'] + ko}
robots = (root / 'robots.txt').read_text()
assert robots.splitlines()[-1] == 'Sitemap: ' + config['origin'] + '/sitemap.xml'
assert 'User-agent: *' in robots and 'Allow: /' in robots and 'Disallow:' not in robots
assert hashlib.sha256((root / 'ads.txt').read_bytes()).hexdigest() == ADS_HASH, 'ads.txt changed'
print('PASS: 68 pages; AdSense and ads.txt preserved; canonical/hreflang/Open Graph/footer; 68 sitemap URLs; robots.txt')
