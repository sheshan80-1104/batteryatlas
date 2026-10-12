import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve('dist'), data=fs.readFileSync(path.join(root,'data.js'),'utf8');
const DB=vm.runInNewContext(data+'\nDB'),SOURCES=vm.runInNewContext(data+'\nSOURCES');
const makerCode=fs.readFileSync(path.join(root,'manufacturers.js'),'utf8');
const makerContext=vm.createContext({});vm.runInContext(makerCode,makerContext);
const renderMakers=id=>vm.runInContext('renderMakers('+JSON.stringify(id)+')',makerContext);
const renderEVShare=()=>vm.runInContext('renderEVShare()',makerContext);
const productContext=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'product-content.js'),'utf8'),productContext);
const renderProduct=id=>vm.runInContext('renderProduct('+JSON.stringify(id)+',"../../")',productContext);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),diagram=html.match(/<svg id="diagram"[\s\S]*?<\/svg>/)[0];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const x of DB){
 const overviewSlug={'1차전지':'primary','2차전지':'secondary','연료전지':'fuel-cells'}[x.group];
 const similar=DB.filter(y=>y.group===x.group&&y.id!==x.id).slice(0,4);
 const refs=x.sources.map(k=>'<a href="'+esc(SOURCES[k].url)+'" target="_blank" rel="noopener">'+esc(SOURCES[k].name)+' ↗</a>').join('');
 let svg=diagram.replace('<text id="leftLabel" x="149" y="212" text-anchor="middle" class="svg-label"></text>',`<text id="leftLabel" x="149" y="212" text-anchor="middle" class="svg-label">${esc(x.left)}</text>`).replace('<text id="rightLabel" x="631" y="212" text-anchor="middle" class="svg-label"></text>',`<text id="rightLabel" x="631" y="212" text-anchor="middle" class="svg-label">${esc(x.right)}</text>`);
 svg=svg.replace('>전해질·막</text>',`>${x.group==='연료전지'?'전해질 막':x.subtype==='흐름전지'?'전해액·분리막':'전해질·분리막'}</text>`);
 const page=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#092736"><meta name="description" content="${esc(x.principle)}"><title>${esc(x.name)} · 원리·장단점·2025 가격 | 배터리 아틀라스</title><link rel="icon" href="../../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../../style.css"><script src="../../data.js" defer></script><script src="../../technology.js" defer></script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9806292747404740" crossorigin="anonymous"></script></head>
<body data-id="${esc(x.id)}"><header class="site-head"><div class="brand"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></div><a href="../../#method">자료 기준</a></header><main class="technology-page"><a class="back-link" href="../../#${esc(x.id)}">← 전체 기술 비교</a><a class="category-back" href="../../overview/${overviewSlug}/">${esc(x.group)} 개요 읽기</a><div class="tech-hero"><span class="eyebrow">${esc(x.group)} · ${esc(x.stage)}</span><h1>${esc(x.name)}</h1><p>${esc(x.principle)}</p></div><article class="tech-main"><div class="sim-wrap"><div class="sim-head"><div><span class="eyebrow">움직이는 작동 원리</span><p id="simCaption">이온과 전자의 이동 경로</p></div><div class="sim-controls"><button id="discharge" type="button" aria-pressed="true">방전·발전</button><button id="charge" type="button" aria-pressed="false">충전</button><button id="pause" type="button" aria-pressed="false" aria-label="애니메이션 일시정지">Ⅱ</button></div></div>${svg}<div class="legend"><span><b class="swatch ion"></b>${esc(x.carrier)} · 전해질/막</span><span><b class="swatch electron"></b>전자 e⁻ · 외부 회로</span></div><p class="diagram-note">반응 방향과 이동 경로를 단순화한 개념도입니다. 실제 입자 수와 이동 속도는 다릅니다.</p></div>
<div class="detail-grid"><section class="block wide"><h3>전극·전해질의 작동 원리</h3><p>${esc(x.electrolyte)}</p><p class="reaction">${esc(x.reaction)}</p></section><section class="block"><h3>장점</h3><p>${esc(x.pros)}</p></section><section class="block"><h3>단점과 과제</h3><p>${esc(x.cons)}</p></section><section class="block"><h3>원료·공급 제약</h3><p>${esc(x.materials)}</p></section><section class="block"><h3>주요 사용 분야</h3><p>${esc(x.uses)}</p></section></div>
${renderProduct(x.id)}
${renderMakers(x.id)}
<div class="market"><span class="eyebrow">2025 시장 자료</span><div class="market-grid"><div><small>판매량·순위</small><strong>${esc(x.sales)}</strong></div><div><small>가격</small><strong>${esc(x.price)}</strong><span>${esc(x.priceNote||'')}</span></div></div><div class="sources">${refs}</div></div></article>${["lfp","nmc","nca","lco","lmo","lto","sodium","solid"].includes(x.id)?renderEVShare():""}<section class="related"><h2>같은 분류의 기술</h2>${similar.map(y=>'<a href="../'+esc(y.id)+'/">'+esc(y.name)+'</a>').join('')}</section><p class="method-foot">가격·판매량은 공표된 동일 조건 자료가 있는 경우만 기재합니다. 연료전지의 비용은 저장 용량당 가격보다 출력당 설비비와 연료비가 중요합니다. 자료 기준일: 2026년 10월 5일.</p></main><footer><div class="footer-brand"><div class="brand"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></div><span class="site-credit">by Halmen 2026</span></div><p>전기화학을 이해하기 위한 교육용 자료. 실제 제품 선정에는 제조사 사양과 안전 기준을 확인하세요.</p></footer><div class="privacy-link"><a href="/privacy/">개인정보·쿠키 안내</a></div></body></html>`;
 const dir=path.join(root,'technology',x.id);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),page);
}
console.log('Generated',DB.length,'technology pages');
