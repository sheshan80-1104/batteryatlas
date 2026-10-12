/* Official product sources; company lists are examples, not a market ranking. */
const MAKERS = {
 alkaline: [['Duracell','제조·판매 / Optimum 알칼라인','https://duracell.com/products/duracell-optimum-battery'],['Energizer','제조·판매 / 알칼라인 제품군','https://data.energizer.com/ais-sds/']],
 carbon: [['Energizer / Eveready','제조·판매 / 탄소아연 전지','https://data.energizer.com/pdfs/carbonzinc_appman.pdf']],
 limetal: [['Maxell','제조·판매 / CR 리튬 1차전지','https://biz.maxell.com/en/primary_batteries/'],['Panasonic','제조·판매 / 리튬 1차전지','https://industrial.panasonic.com/kr/products']],
 silver: [['Maxell','제조·판매 / SR 산화은 코인전지','https://biz.maxell.com/en/primary_batteries/sr_coin.html']],
 zincair: [['VARTA Microbattery / power one','제조·브랜드 판매 / 보청기용 아연공기 전지','https://www.powerone-batteries.com/know-how']],
 lfp: [['CATL','제조·공급 / Shenxing LFP','https://www.catl.com/en/news/6401.html'],['BYD','제조·공급 / Blade Battery LFP','https://media.byd.com/section/technology/blade-battery/?lang=eng'],['LG에너지솔루션','제조·공급 / LFP 제품군','https://www.lgensol.com/mobile/en/business/subject-lfp']],
 nmc: [['LG에너지솔루션','제조·공급 / NCM 제품군','https://www.lgensol.com/kr/business/subject-ncm'],['삼성SDI','제조·개발 / NCM 제품군','https://news.samsungsdi.com/ko/articleView?seq=329']],
 nca: [['Panasonic Energy','제조·공급 / 차량용 NCA 리튬이온','https://news.panasonic.com/global/stories/993'],['삼성SDI','제조·공급 / 고니켈 NCA 제품군','https://news.samsungsdi.com/ko/articleView?seq=329']],
 lco: [['ATL (TDK 그룹)','제조·공급 / 소형 리튬이온, LCO 소재 사용 확인','https://www.tdk.com/system/files/sustainability/tdk_sustainability_2024_en.pdf']],
 lmo: [['삼성SDI','과거 LMO 생산 확인 / 현재 해당 계열 공급 여부 미확인','https://news.samsungsdi.com/ko/articleView?seq=265']],
 lto: [['Toshiba','제조·판매 / SCiB, 티탄산리튬 음극','https://www.global.toshiba/ww/sustainability/corporate/related-information/case/e10.html']],
 sodium: [['CATL','개발·상용화 추진 / Naxtra 나트륨이온','https://www.catl.com/en/news/6811.html']],
 solid: [['Maxell','제조·판매 / 소형 전고체 전지','https://biz.maxell.com/en/batteries/']],
 lead: [['Clarios','제조·공급 / 차량용 AGM 납축전지','https://www.clarios.com/insights/news/news-details/clarios-secures-second-order-for-new-hagm-batteries-from-major-u.s.-automaker-for-model-year-2028-full-size-suv'],['GS Yuasa','제조·판매 / 산업용 납축전지','https://www.gs-yuasa.com/en/products/industrial_batteries/']],
 nicd: [['Saft','제조·판매 / Uptimax 니켈카드뮴','https://saft.com/en/market-sectors/industry/electricity-infrastructure'],['Alcad','제조·판매 / 산업용 Ni-Cd','https://www.alcad.com/ni-cd-nickel-cadmium']],
 nimh: [['Toyota Battery','제조·판매 / 하이브리드차용 NiMH','https://note.toyota-battery.com/n/n1b518648a8a5?hl=en'],['Panasonic','제조·판매 / 니켈수소 전지','https://industrial.panasonic.com/kr/products']],
 nas: [['NGK','기존 제조사 / 2025년 10월 생산·신규 프로젝트 판매 중단 결정, 재고 출하·지원','https://www.ngk-insulators.com/en/news/2025/20251031_1.pdf']],
 vrfb: [['Sumitomo Electric','제조·시스템 공급 / 바나듐 흐름전지','https://sumitomoelectric.com/products/flow-batteries'],['Invinity Energy Systems','제조·시스템 공급 / 바나듐 흐름전지','https://invinity.com/vanadium-flow-batteries/']],
 znbr: [['JUNAN Energy','개발·시스템 공급 / 아연브롬 흐름전지','https://en.junanes.com/product/zinc-bromine-flow-battery-large-scale-energy-storage-system/']],
 pemfc: [['Ballard Power Systems','제조·공급 / PEM 연료전지 스택·모듈','https://www.ballard.com/fcmove/']],
 sofc: [['Bloom Energy','제조·시스템 공급 / SOFC Energy Server','https://www.bloomenergy.com/technology/']],
 pafc: [['두산퓨얼셀','제조·시스템 공급 / PAFC 인산형 연료전지','https://www.doosanfuelcell.com/kr/tech/tech-0102/']],
 mcfc: [['FuelCell Energy','제조·시스템 공급 / MCFC 용융탄산염 연료전지','https://www.fuelcellenergy.com/fuelcell-energy-block-system']],
 afc: [['AFC Energy','기존 알칼리 연료전지 개발 업체 / 액체 전해질 AFC의 현재 공급 여부 미확인','https://www.afcenergy.com/media/teklol1s/afc-energy-annual-report-2020.pdf']],
 dmfc: [['SFC Energy / EFOY','제조·브랜드 판매 / 직접메탄올 연료전지','https://www.sfc.com/technology/direct-methanol/']]
};
const EV_SHARE_2025 = [
 ['CATL',39.2,464.7],['BYD',16.4,194.8],['LG에너지솔루션',9.2,108.8],['CALB',5.3,62.8],['Gotion',4.5,53.5],['SK On',3.7,44.5],['Panasonic',3.7,44.2],['EVE',2.6,31.3],['삼성SDI',2.4,28.9],['SVOLT',2.4,28.5]
];
function makerEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderMakers(id){return `<section class="maker-section"><span class="eyebrow">제조사·판매사와 점유율</span><h3>주요 업체</h3><p class="maker-note">공식 제품·기술 자료로 확인한 대표 업체입니다. 목록 순서는 시장 순위가 아닙니다. 업체·제품 상태 확인: 2026년 10월 5일.</p><div class="table-scroll" tabindex="0" role="region" aria-label="제조사와 전지별 시장점유율"><table class="maker-table"><thead><tr><th scope="col">업체 · 공식 자료</th><th scope="col">역할·제품·공급 상태</th><th scope="col">2025년 해당 전지 종류 점유율</th></tr></thead><tbody>${MAKERS[id].map(m=>`<tr><th scope="row"><a href="${makerEscape(m[2])}" target="_blank" rel="noopener">${makerEscape(m[0])} ↗</a></th><td>${makerEscape(m[1])}</td><td><span class="unknown-share">공개 수치 미확인</span></td></tr>`).join('')}</tbody></table></div><p class="maker-note">해당 전지 종류만 분리한 2025년 세계 시장의 업체별 점유율을 동일 기준으로 확인하지 못했습니다. ‘미확인’은 0%를 뜻하지 않습니다. 제조사 전체 매출, 생산능력, 누적 설치량은 점유율로 환산하지 않았습니다.</p></section>`;}
function renderEVShare(){return `<section class="maker-section ev-reference"><span class="eyebrow">참고 · 전기차 배터리 전체 시장</span><h3>2025년 세계 전기차 배터리 업체 순위</h3><p class="maker-note">세계 80개국에서 2025년 1~12월 등록된 전기차(EV·PHEV·HEV)에 탑재된 배터리 용량 기준, 총 1,187 GWh. LFP·NMC·NCA 등 화학계열을 합산한 수치로, 개별 전지 종류의 점유율과는 집계 범위가 다릅니다.</p><div class="table-scroll" tabindex="0" role="region" aria-label="2025년 전기차 배터리 업체 순위"><table class="maker-table"><thead><tr><th scope="col">순위</th><th scope="col">업체</th><th scope="col">탑재 용량</th><th scope="col">전체 시장 점유율</th></tr></thead><tbody>${EV_SHARE_2025.map((r,i)=>`<tr><td>${i+1}</td><th scope="row">${r[0]}</th><td>${r[2].toFixed(1)} GWh</td><td><span class="share-value">${r[1].toFixed(1)}%</span><span class="share-bar" style="--share:${r[1]}%"></span></td></tr>`).join('')}<tr><td>—</td><th scope="row">기타 업체</th><td>124.9 GWh</td><td>10.5%</td></tr></tbody></table></div><p class="maker-note">소수점 반올림으로 점유율 합계가 100%와 다를 수 있습니다. 순위는 탑재 용량 기준이며 3.7%, 2.4%처럼 표시 비율이 같아도 순위는 다릅니다. 소비자 소매 판매액·전체 전지 판매량 순위가 아닙니다.</p><div class="sources"><a href="https://www.sneresearch.com/kr/insight/release_view/584/page/0?s_cat=%7C&s_keyword=" target="_blank" rel="noopener">SNE Research · 2025년 연간 집계 (2026.02.04) ↗</a></div></section>`;}
