import fs from 'node:fs';

export const config = JSON.parse(fs.readFileSync(new URL('./site-config.json', import.meta.url), 'utf8'));
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Shared by every generator and the final bilingual pass. Does not alter ad scripts.
export function applyPageDefaults(html, pathname) {
  const english = pathname.startsWith('/en/');
  const koPath = english ? pathname.slice(3) : pathname;
  const enPath = '/en' + koPath;
  const canonical = config.origin + pathname;
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || (english ? 'Battery Atlas' : '배터리 아틀라스'));
  let description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
  if (!description) {
    description = escapeHtml(english ? 'Educational resources about battery and fuel cell technologies.' : '전지와 연료전지 기술을 이해하기 위한 교육용 자료.');
    html = html.replace('</head>', `<meta name="description" content="${description}"></head>`);
  }
  html = html.replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property="og:[^"]*"[^>]*>/gi, '');
  const meta = `<link rel="canonical" href="${canonical}">`
    + `<link rel="alternate" hreflang="ko" href="${config.origin}${koPath}">`
    + `<link rel="alternate" hreflang="en" href="${config.origin}${enPath}">`
    + `<link rel="alternate" hreflang="x-default" href="${config.origin}${koPath}">`
    + `<meta property="og:title" content="${escapeHtml(title)}">`
    + `<meta property="og:description" content="${description}">`
    + `<meta property="og:url" content="${canonical}">`
    + `<meta property="og:type" content="website">`
    + `<meta property="og:locale" content="${english ? 'en_US' : 'ko_KR'}">`;
  const brand = english ? 'Battery Atlas' : '배터리 아틀라스 (BatteryAtlas)';
  const schema = pathname === '/' || pathname === '/en/'
    ? { '@context': 'https://schema.org', '@type': 'WebSite', name: brand, alternateName: english ? ['BatteryAtlas', '배터리 아틀라스', '배터리아틀라스'] : ['배터리아틀라스', 'BatteryAtlas', 'Battery Atlas'], url: config.origin + pathname, inLanguage: english ? 'en' : 'ko', description: decode(description) }
    : { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, inLanguage: english ? 'en' : 'ko', description: decode(description), isPartOf: { '@type': 'WebSite', name: brand, url: config.origin + (english ? '/en/' : '/') } };
  html = html.replace('</head>', meta + '<script type="application/ld+json" data-batteryatlas-seo>' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script></head>');
  html = html.replace(/<div class="privacy-link">[\s\S]*?<\/div>/g, '')
    .replace(/<nav class="footer-nav"[\s\S]*?<\/nav>/g, '');
  const prefix = english ? '/en' : '';
  const labels = english ? ['About', 'Contact', 'Privacy & cookies'] : ['소개', '문의', '개인정보·쿠키 안내'];
  const footer = `<nav class="footer-nav" aria-label="${english ? 'Site information' : '사이트 안내'}">`
    + ['about', 'contact', 'privacy'].map((slug, i) => `<a href="${prefix}/${slug}/">${labels[i]}</a>`).join('<span aria-hidden="true">·</span>') + '</nav>';
  return html.replace('</footer>', footer + '</footer>');
}
