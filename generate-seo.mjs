import fs from 'node:fs';
import path from 'node:path';
import { applyPageDefaults, config, escapeHtml } from './page-common.mjs';

function pages(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? pages(file) : entry.name === 'index.html' ? [file] : [];
  });
}
const files = pages('dist').sort();
const paths = files.map(file => '/' + path.relative('dist', path.dirname(file)).replaceAll('\\', '/') + '/').map(p => p === '//' ? '/' : p);
for (let i = 0; i < files.length; i++) fs.writeFileSync(files[i], applyPageDefaults(fs.readFileSync(files[i], 'utf8'), paths[i]));
const pathSet = new Set(paths);
const urls = paths.map(p => {
  const ko = p.startsWith('/en/') ? p.slice(3) : p;
  const en = '/en' + ko;
  if (!pathSet.has(ko) || !pathSet.has(en)) throw new Error('Missing bilingual pair: ' + p);
  return `  <url><loc>${escapeHtml(config.origin + p)}</loc><lastmod>${config.modifiedDate}</lastmod>`
    + `<xhtml:link rel="alternate" hreflang="ko" href="${config.origin}${ko}"/>`
    + `<xhtml:link rel="alternate" hreflang="en" href="${config.origin}${en}"/>`
    + `<xhtml:link rel="alternate" hreflang="x-default" href="${config.origin}${ko}"/></url>`;
}).join('\n');
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${config.origin}/sitemap.xml\n`);
console.log(`Updated SEO, footer navigation and sitemap for ${files.length} bilingual public pages`);
