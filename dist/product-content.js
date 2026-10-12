const PRODUCTS={
 alkaline:['bexel-alkaline.png','SM벡셀 · LR6 AA 알칼라인','한국 기업 제품 · 제조국 미확인','공식 제품 이미지','https://www.bexel.co.kr/en/html/product/battery.php','SM벡셀'],
 carbon:['bexel-carbon.png','SM벡셀 · R14 C 망간전지','한국 기업 제품 · 제조국 미확인','공식 제품 이미지','https://www.bexel.co.kr/en/html/product/battery_03.php','SM벡셀'],
 limetal:['vitzrocell-SB-AA02.jpg','비츠로셀 · Tekcell SB-AA02','한국 기업 제품 · 제품별 제조국 미확인','리튬–염화티오닐 1차전지. 리튬 1차전지의 한 종류입니다.','https://www.vitzrocell.com/en/sub/sub02_01.php?cat_no=&idx=89&mode=view&offset=','비츠로셀'],
 zincair:['icell-slide.jpg','아이셀텍 · 보청기용 아연공기전지','한국 기업 제품','10·312·13·675 제품군의 공식 사진','http://icelltech.com/home/zinc-air/','아이셀텍'],
 lead:['sebang-rocket-agm.png','세방전지 · ROCKET AGM 70','한국 제조 · 제품에 MADE IN KOREA 표기','자동차용 AGM 납축전지','https://www.sebang-europe.com/products/automotive','세방전지'],
 nimh:['bexel-nimh.png','SM벡셀 · HR6 AA Ni-MH 2000mAh','한국 기업 제품 · 제조국 미확인','공식 제품 이미지 · 1.2V 니켈수소 2차전지','https://www.bexel.co.kr/en/html/product/battery3.php','SM벡셀'],
 lto:['lto-potere.jpg','그리너지 · POTERE S2','한국 기업 제품','LTO 음극을 사용하는 배터리. LTO는 양극 계열 명칭이 아닙니다.','https://www.grinergy.tech/product','그리너지'],
 lfp:['nca-sbb.jpg','삼성SDI · SBB 2.0 (LFP)','한국 기업 제품 · 전시 사진','RE+ 2025 전시장 사진. SBB 2.0(LFP)과 SBB 1.7(NCA)이 함께 전시되어 있으며, 두 제품을 구분해야 합니다.','https://www.samsungsdi.co.kr/sdi-now/sdi-news/4521.html','삼성SDI'],
 nca:['nca-sbb.jpg','삼성SDI · SBB 1.7 (NCA)','한국 기업 제품 · 전시 사진','RE+ 2025 전시장 사진. SBB 1.7(NCA)과 SBB 2.0(LFP)이 함께 전시되어 있습니다.','https://www.samsungsdi.co.kr/sdi-now/sdi-news/4521.html','삼성SDI'],
 lco:['lco-pouch.png','LG에너지솔루션 · 소형 파우치 제품군','한국 기업 제품 · 제품군 이미지','고전압 LCO 기술을 소개하는 공식 페이지의 제품군 이미지입니다. 사진 속 개별 셀의 모델·양극 조성은 공개되지 않았습니다.','https://www.lgensol.com/kr/business/factor-pouch-small','LG에너지솔루션'],
 pemfc:['pemfc-htwo.png','현대자동차 HTWO · 수소연료전지 시스템','한국 기업 제품 · 제품별 제조국 미확인','공식 수소연료전지 시스템 제품 이미지','https://www.htwo.hyundai.com/ko/technology/hydrogen-fuel-cell-system-product','현대자동차 HTWO'],
 sofc:['sofc-tucy.png','미코파워 · TUCY-8K','한국 기업 제품','8kW급 고체산화물 연료전지 시스템','https://www.micopower.com/kr/sofc/tucy_intro.php','미코파워'],
 pafc:['pafc-product.png','두산퓨얼셀 · M400 Hydrogen','한국 기업 제품','인산형(PAFC) 수소연료전지의 공식 제품 이미지','https://www.doosanfuelcell.com/kr/prod/prod-0102/','두산퓨얼셀'],
 mcfc:['mcfc-product.png','한국퓨얼셀 · 2.5MW 발전 시스템','한국 기업의 기존 공급 제품','공식 제품 구성 이미지입니다. 현재 신규 공급·판매 여부와 구체적 제조 범위는 별도 확인이 필요합니다.','https://www.kfuelcell.com/theme/daontheme_business03/html/business/02.php','한국퓨얼셀']
};
function productEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderProduct(id,prefix=''){
 const p=PRODUCTS[id];
 const photo=p?`<figure class="product-figure"><img src="${prefix}assets/products/${p[0]}" alt="${productEscape(p[1])}" loading="lazy" decoding="async"><figcaption><strong>${productEscape(p[1])}</strong><span class="product-origin">${productEscape(p[2])}</span><p>${productEscape(p[3])}</p><a href="${p[4]}" target="_blank" rel="noopener">이미지·제품 정보 출처: ${productEscape(p[5])} ↗</a></figcaption></figure>`:`<div class="product-unavailable"><b>국내 제품 사진 확인 중</b><p>이 전지 종류의 국내 제조·판매 제품과 공식 대표사진을 함께 확인하지 못했습니다. 국내 제품이 없다는 의미는 아닙니다. 화학계가 다른 제품 사진으로 대체하지 않습니다.</p></div>`;
 return `<section class="product-section"><span class="eyebrow">국내 기업 제품 보기</span><h3>대표 제품과 제조 구분</h3>${photo}<p class="maker-note">한국 기업의 제품과 한국에서 제조한 제품은 다릅니다. 실물 사진·공식 제품 이미지·전시 사진을 구분해 표기했습니다. 확인 기준: 2026년 10월 5일.</p>${renderTopicLinks(id,prefix)}</section>`;
}
function renderTopicLinks(id,prefix=''){
 if(id==='alkaline')return `<a class="topic-link" href="${prefix}guide/alkaline-value/"><b>다이소 vs 에너자이저, 가성비 비교 →</b><span>한국소비자원 시험 · 가격 · 사용시간 · 직접 계산</span></a>`;
 if(['lfp','nmc','nca','lead','sodium','nas','vrfb','znbr'].includes(id))return `<a class="topic-link" href="${prefix}guide/ess/"><b>ESS 입찰제도와 배터리 선택의 변화 →</b><span>NCM·NCA에서 LFP가 늘어난 이유 · 2026년 국내 입찰</span></a>`;
 return '';
}
