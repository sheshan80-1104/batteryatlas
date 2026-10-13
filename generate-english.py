from pathlib import Path
import json,re,subprocess,os
from html import escape
from urllib.parse import urlsplit
root=Path('dist')
ko=json.loads(Path('translations-ko.json').read_text())
en={int(l.split('\t',1)[0]):l.split('\t',1)[1] for l in Path('translations-en.tsv').read_text().splitlines() if l}
if set(en) != set(range(len(ko))):
 raise ValueError('Each Korean translation entry requires an English entry')
m={ko[i]:v for i,v in en.items()}
m['이미지·제품 정보 출처:']='Image and product source:'
m['원리·장단점·2025 가격']='Principles, Pros & Cons, 2025 Prices'
pattern=re.compile('|'.join(re.escape(k) for k in sorted(m,key=len,reverse=True)))
def translate(s):return pattern.sub(lambda x:m[x[0]],s)
def switch(path,is_en):
 tail=str(path.parent).replace('\\','/')
 tail='' if tail=='.' else tail+'/'
 kr='/'+tail;eng='/en/'+tail
 return f'<nav class="language-switch" aria-label="Language"><a href="{kr}" lang="ko" hreflang="ko"'+(' aria-current="page"' if not is_en else '')+'>한국어</a><a href="'+eng+'" lang="en" hreflang="en"'+(' aria-current="page"' if is_en else '')+'>English</a></nav>'
pages=[p for p in root.rglob('*.html') if 'en' not in p.relative_to(root).parts]
public_paths={'/' + str(p.relative_to(root).parent).replace('\\','/').strip('.') .strip('/') + '/' for p in pages}
public_paths.discard('//'); public_paths.add('/')
def english_href(match):
 value=match[1]
 return 'href="/en'+value+'"' if urlsplit(value).path in public_paths else match[0]
for p in pages:
 rel=p.relative_to(root)
 source=p.read_text()
 source=re.sub(r'<nav class="language-switch"[\s\S]*?</nav>','',source)
 source=re.sub(r'<link rel="alternate"[^>]*>','',source)
 source=re.sub(r'<script src="/language-switch.js" defer></script>','',source)
 tail=str(rel.parent).replace('\\','/');tail='' if tail=='.' else tail+'/'
 alt=f'<link rel="alternate" hreflang="ko" href="https://batteryatlas.kr/{tail}"><link rel="alternate" hreflang="en" href="https://batteryatlas.kr/en/{tail}">'
 english=translate(source).replace('lang="ko"','lang="en"')
 english=re.sub(r'href="(/[^"]*)"',english_href,english)
 english=english.replace('</header>',switch(rel,True)+'</header>',1)
 english=english.replace('</head>',alt+'<script src="/language-switch.js" defer></script></head>')
 english=re.sub(r'(</(?:a|strong|b|em)>)(?=[A-Za-z])',r'\1 ',english)
 english=re.sub(r'([^>\s])(<(?:a|strong|b|em)(?:\s[^>]*|)>)',r'\1 \2',english)
 english=re.sub(r'((?:src|href)=")(?:\.\./)*((?:style\.css|favicon\.svg|assets/)[^\"]*)(")',r'\1/\2\3',english)
 dest=root/'en'/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(english)
 source=source.replace('</header>',switch(rel,False)+'</header>',1).replace('</head>',alt+'<script src="/language-switch.js" defer></script></head>')
 p.write_text(source)
for p in root.glob('*.js'):
 if p.name=='language-switch.js':continue
 s=translate(p.read_text())
 if p.name=='product-content.js':s=s.replace('${prefix}assets/products/','/assets/products/')
 if p.name=='main.js':s=s.replace('results.length+" technologies"','results.length+" technologies"')
 if p.name=='value-calculator.js':
  s=s.replace("'ko-KR'","'en-US'").replace('개당 ${','Per cell: KRW ${').replace('}원 · 시간당 ${','} · KRW/hour: ${').replace('}원 · 100원당 ${','} · Hours per KRW 100: ${').replace('}시간','}')
 (root/'en'/p.name).write_text(s)
# Source references remain the original official pages; no externally hosted translation service.
print(f'Generated {len(pages)} English pages and matching language links')

# Apply canonical, hreflang, Open Graph, menus, robots and sitemap to BOTH languages.
subprocess.run([os.environ.get('BATTERY_NODE', 'node'), 'generate-seo.mjs'], check=True)
