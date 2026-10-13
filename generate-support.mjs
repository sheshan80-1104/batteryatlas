import fs from 'node:fs';
import { applyPageDefaults, config, escapeHtml } from './page-common.mjs';

const mail = `<a href="mailto:${config.contactEmail}">${config.contactEmail}</a>`;
const section = (title, body) => `<section class="overview-section"><h2>${title}</h2>${body}</section>`;
const supportPage = (slug, title, description, body) => {
  const ad = fs.readFileSync('templates/index.html', 'utf8').match(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-9806292747404740"[^>]*><\/script>/)?.[0];
  if (!ad) throw new Error('Original AdSense script missing from homepage template');
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | 배터리 아틀라스</title><meta name="description" content="${escapeHtml(description)}"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/style.css">${ad}</head><body><header class="site-head"><a class="brand" href="/"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></a><a href="/#method">자료 기준</a></header><main class="overview-page support-page"><a class="back-link" href="/">← 전체 전지 보기</a><div class="overview-hero"><span class="eyebrow">사이트 안내</span><h1>${title}</h1><p>${description}</p></div>${body}</main><footer><div class="footer-brand"><div class="brand"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></div><span class="site-credit">by Halmen 2026</span></div></footer></body></html>`;
  fs.mkdirSync(`dist/${slug}`, {recursive:true});
  fs.writeFileSync(`dist/${slug}/index.html`, applyPageDefaults(html, `/${slug}/`));
};

export function generateSupportPages() {
  fs.writeFileSync('dist/index.html', applyPageDefaults(fs.readFileSync('templates/index.html', 'utf8'), '/'));
  fs.mkdirSync('dist/privacy', {recursive:true});
  fs.writeFileSync('dist/privacy/index.html', applyPageDefaults(fs.readFileSync('templates/privacy.html', 'utf8'), '/privacy/'));
  supportPage('about', '소개', '전지 기술을 쉽게 이해하고 비교하기 위한 배터리 아틀라스를 소개합니다.',
    section('사이트 목적', '<p>배터리 아틀라스는 1차전지·2차전지·연료전지의 작동 원리와 특징을 설명하는 교육용 자료입니다. 이온과 전자의 이동을 보여주는 개념도, 기술별 장단점, 시장 자료를 통해 전기화학을 이해하도록 돕습니다.</p>')
    + section('운영자', '<p>운영자: Halmen. 기술과 시장 정보를 읽기 쉬운 비교 자료로 정리하고, 출처와 해석의 한계를 함께 표시합니다.</p>')
    + section('자료 수집 기준', '<p>IEA(국제에너지기구), BloombergNEF, USGS(미국 지질조사국), 공공기관 및 제조사가 공개한 자료를 사용합니다. BloombergNEF 자료는 공개 요약과 발표 자료의 범위에서 참고합니다. 보고서의 대상 연도, 수치의 단위·대상 범위, 자료 기준일을 구분합니다. 같은 조건으로 비교할 수 없는 수치나 확인되지 않은 정보는 그 한계를 표시합니다.</p><div class="sources"><a href="https://www.iea.org/" target="_blank" rel="noopener">IEA</a><a href="https://about.bnef.com/insights/" target="_blank" rel="noopener">BloombergNEF</a><a href="https://www.usgs.gov/" target="_blank" rel="noopener">USGS</a></div>')
    + section('정보 갱신 방식', '<p>운영자는 새로운 공개 자료와 오류 제보를 검토해 필요한 내용을 수정합니다. 수치가 바뀌면 대상 기간과 출처를 함께 확인합니다. 페이지나 자료에 표시한 기준일은 실제 자료의 확인 시점이며, 사이트 수정일이 모든 통계의 최신성을 뜻하지는 않습니다. 한국어와 영어 페이지는 같은 원본 자료를 기준으로 함께 갱신합니다.</p>')
    + section('이용 시 확인 사항', '<p>이 사이트는 교육용 정보이며 개별 제품의 성능·안전성이나 사업 수익을 보증하지 않습니다. 실제 제품을 선정할 때는 제조사의 최신 사양, 사용 조건, 인증과 안전 기준을 직접 확인하세요.</p>'));
  supportPage('contact', '문의', '오류 제보, 자료 수정 요청, 제휴 문의를 이메일로 받습니다.',
    section('연락처', `<p>운영자: Halmen</p><p>문의 이메일: ${mail}</p>`)
    + section('문의할 수 있는 내용', '<ul><li>기술 설명, 수치, 번역 또는 링크의 오류 제보</li><li>공개 자료의 추가·수정 요청과 출처 안내</li><li>교육 자료 활용 및 제휴 문의</li></ul>')
    + section('제보 방법', '<p>해당 페이지 주소, 수정이 필요한 내용, 확인 가능한 원문 링크를 함께 보내 주시면 검토에 도움이 됩니다. 불필요한 개인정보나 민감한 정보는 보내지 마세요. 모든 요청의 반영이나 특정 기간 내 답변을 보장하지는 않습니다.</p>')
    + section('문의 정보 처리', '<p>이메일로 받은 정보는 문의 확인·답변과 자료 수정 검토에 사용합니다. 자세한 이용 목적과 보관 기간은 개인정보·쿠키 안내에서 확인할 수 있습니다.</p><a href="/privacy/">개인정보·쿠키 안내</a>'));
}
