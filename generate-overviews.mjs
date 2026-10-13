import { applyPageDefaults } from './page-common.mjs';
import fs from 'node:fs';
import vm from 'node:vm';
const DB=vm.runInNewContext(fs.readFileSync('dist/data.js','utf8')+'\nDB');
const table=(heads,rows)=>`<div class="table-scroll" tabindex="0" role="region" aria-label="${heads.join(' · ')}"><table class="maker-table"><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const source=(url,name)=>`<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
const tech=id=>`<a href="../../technology/${id}/">${DB.find(x=>x.id===id).name}</a>`;
const note=s=>`<aside class="overview-note">${s}</aside>`;
const section=(id,title,body)=>`<section id="${id}" class="overview-section"><h2>${title}</h2>${body}</section>`;
const pages=[
{slug:'primary',group:'1차전지',title:'1차전지 개요',lead:'한 번 쓰고 교체하는 전지. 충전보다 보관성과 편리함이 중요한 곳에서 쓰입니다.',toc:[['basics','기본 원리'],['types','종류와 특징'],['names','이름 읽는 법'],['choose','선택 기준']],body:
section('basics','1차전지는 무엇인가요?',`<p>내부에 저장된 반응물의 화학에너지를 전기로 바꾸는 전지입니다. 일반적인 제품은 충전을 전제로 설계하지 않아, 사용 후 반응물을 전기적으로 되돌려 반복 사용하는 용도로 적합하지 않습니다.</p><div class="concept-strip"><div><b>화학 반응</b><span>전극에서 전자를 내놓거나 받음</span></div><div><b>전기 사용</b><span>전자는 외부 회로를 지나감</span></div><div><b>교체</b><span>반응물이 소모되면 새 전지 사용</span></div></div><p>전해질은 이온이 움직이는 통로이고, 전자는 기기를 연결한 외부 회로로 흐릅니다. 전극·전해질의 조합에 따라 전압, 전류를 내는 능력, 보관 수명과 가격이 달라집니다.</p>`)+
section('types','대표적인 종류와 특징',table(['종류','반응계·특징','대표 사용처'],[
[tech('carbon'),'아연과 이산화망간을 사용하고 염화물 계열 전해질을 씁니다. 저렴하지만 큰 전류를 오래 요구하는 기기에는 불리합니다.','시계·저전력 리모컨'],
[tech('alkaline'),'아연·이산화망간 전극과 알칼리 전해질을 사용합니다. 망간 건전지보다 보통 사용 가능한 용량과 전류 특성이 좋습니다.','생활용품·장난감·손전등'],
[tech('limetal'),'금속 리튬 음극을 사용합니다. 양극에 따라 리튬–이산화망간, 리튬–염화티오닐 등으로 다시 나뉩니다. 높은 에너지 밀도와 긴 보관성이 장점입니다.','코인전지·계량기·센서'],
[tech('silver'),'산화은 양극과 아연 음극. 소형으로 만들기 좋고 방전 전압이 비교적 안정적이지만 은 원료 가격의 영향을 받습니다.','시계·소형 정밀기기'],
[tech('zincair'),'아연과 공기 중 산소를 반응시킵니다. 공기 구멍을 열어 활성화하며, 활성화 후에는 사용하지 않아도 수명이 줄어듭니다.','보청기']]))+
section('names','이름과 크기는 서로 다른 분류입니다',`<p>‘알칼라인’은 전해질의 성질, ‘산화은’은 양극 물질, ‘리튬 1차전지’는 주로 음극의 금속 리튬을 가리킵니다. 따라서 1차전지의 이름도 한 가지 기준만으로 정해지지 않습니다.</p>${note('<strong>AA·AAA·코인형은 크기와 모양입니다.</strong> 같은 AA라도 알칼라인 1차전지와 니켈수소 2차전지가 있으며 전압과 사용 조건이 다릅니다. 리튬 1차전지와 리튬이온 2차전지도 구분해야 합니다.')}`)+
section('choose','어떤 기준으로 고르나요?',`<p>전압과 크기가 기기에 맞는지 먼저 확인하고, 필요한 전류·온도 범위·보관 기간·교체 주기를 비교하세요. 자주 교체하는 기기는 2차전지의 반복 사용 비용도 함께 고려할 수 있습니다. 일반 1차전지는 충전하지 않고, 사용한 전지는 분리 수거합니다.</p><div class="sources">${source('https://data.energizer.com/battery-glossary-faq/','Energizer · 전지 용어')}${source('https://energizer.com/batteries/battery-comparison-chart/','Energizer · 1차전지 종류 비교')}${source('https://data.energizer.com/','Energizer · 종류별 기술 자료')}</div>`)
},
{slug:'secondary',group:'2차전지',title:'2차전지 개요',lead:'충전으로 화학 반응을 되돌려 반복 사용하는 전지. 이름마다 분류 기준이 다릅니다.',toc:[['basics','충전과 방전'],['names','명칭의 분류 기준'],['cathode','리튬이온 양극 계열'],['families','다른 2차전지']],body:
section('basics','충전할 때 무엇이 되돌아가나요?',`<p>방전에서는 전극의 화학 반응이 외부 회로로 전자를 보내 전기를 공급합니다. 충전에서는 외부 전원으로 반응을 반대 방향으로 진행시켜 에너지를 다시 저장합니다. 이온은 전해질 안에서 이동해 전하 균형을 맞춥니다.</p><div class="concept-strip"><div><b>방전</b><span>화학에너지 → 전기에너지</span></div><div><b>충전</b><span>전기에너지 → 화학에너지</span></div><div><b>반복 사용</b><span>반복 중 손실·열화가 누적됨</span></div></div><p>충전 가능하다는 뜻이지 무한히 사용할 수 있다는 뜻은 아닙니다. 전극·전해질의 부반응, 구조 변화, 온도와 사용 조건에 따라 용량과 출력이 줄어듭니다.</p>`)+
section('names','2차전지 이름은 모두 양극재 기준인가요?',`<p><strong>LFP·NMC(NCM)·NCA·LCO·LMO는 리튬이온전지의 양극 활물질을 기준으로 한 이름입니다.</strong> 다만 이 규칙을 2차전지 전체에 적용할 수는 없습니다. ‘양극재’는 양극을 구성하는 소재를 뜻하며, 이 약어들은 특히 전기를 저장하는 반응에 참여하는 양극 활물질을 가리킵니다.</p>${table(['분류 축','이름의 예','무엇이 달라지나요?'],[
['양극 활물질','LFP·NMC/NCM·NCA·LCO·LMO','리튬이온전지의 에너지 밀도·전압·안정성·원료 구성'],
['음극 활물질','LTO(티탄산리튬)','흑연 대신 LTO 음극을 사용. 양극은 NMC·LMO 등과 조합 가능'],
['이동 이온·반응계','리튬이온·나트륨이온·납축·니켈수소','에너지를 저장하는 기본 화학 체계'],
['전해질 상태·구성','전고체·리튬폴리머','전고체는 고체 전해질. 리튬폴리머는 전해질·셀 구성과 관련된 명칭'],
['저장·순환 구조','흐름전지','전해액을 외부 탱크에 저장하고 반응부로 순환'],
['셀 형태','원통형·각형·파우치형','모양·포장 구조. 양극 화학계열과 별개의 기준']])}${note('<strong>여러 이름은 동시에 성립할 수 있습니다.</strong> 예를 들어 ‘LFP 양극 + 흑연 음극 + 액체 전해질 + 각형 셀’은 각각 다른 요소를 설명합니다. 전고체도 양극을 LFP 또는 NMC 등으로 구성할 수 있습니다. 흐름전지는 충전할 수 있으므로 2차전지에 속합니다.')}`)+
section('cathode','리튬이온전지의 대표 양극 계열',table(['계열','양극 활물질','주요 특징·과제'],[
[tech('lfp'),'인산철리튬 · LiFePO₄','안정성과 긴 수명, 니켈·코발트 미사용. 일반적으로 NMC보다 무게당 에너지 밀도가 낮음'],
[tech('nmc'),'니켈·망간·코발트 산화물','높은 에너지 밀도. 조성에 따라 특성이 달라지며 니켈·코발트 수급과 열 관리가 중요'],
[tech('nca'),'니켈·코발트·알루미늄 산화물','높은 에너지 밀도. 열 관리와 충전 제어, 원료 수급이 중요'],
[tech('lco'),'코발트산리튬 · LiCoO₂','소형 전자기기에 널리 사용. 코발트 원료 비용·안전 관리가 과제'],
[tech('lmo'),'망간산리튬 · 대표적으로 LiMn₂O₄','출력 특성과 망간 기반 소재가 장점. 수명·고온 성능 등의 과제']])+`<p>NMC와 NCM은 같은 니켈·망간·코발트 계열을 가리키는 표기입니다. NMC811의 8:1:1은 니켈·망간·코발트의 상대 몰비를 뜻합니다. 양극 이름만으로 제품의 수명·가격·안전성을 확정할 수 없으며 음극, 전해질, 설계와 사용 조건을 함께 봐야 합니다.</p>`)+
section('families','리튬이온 이외의 2차전지도 있습니다',table(['계열','주요 특징','주요 사용 분야'],[
[tech('lead'),'가격 경쟁력과 성숙한 회수 체계. 무겁고 에너지 밀도가 낮음','차량 시동·비상 전원'],
[tech('nimh'),'니켈계 양극과 수소 저장 합금 음극. 비교적 성숙한 기술','하이브리드차·생활용 충전지'],
[tech('nicd'),'내구성과 온도 대응이 장점. 카드뮴 유해성과 규제 고려','산업용 비상 전원'],
[tech('sodium'),'나트륨 이온을 사용. 원료 선택 폭과 자원 접근성에 장점','ESS·일부 차량용 개발·상용화'],
[tech('nas'),'나트륨·황 반응계. 고온 운전과 보온·안전 관리가 필요','대규모 전력 저장'],
[tech('vrfb'),'바나듐 전해액을 탱크에서 순환. 출력과 저장 용량을 비교적 독립적으로 설계','장시간 ESS'],
[tech('znbr'),'아연·브롬 반응계, 순환형은 흐름전지. 아연 석출과 브롬 관리가 중요','정지형 ESS']])+`<div class="sources">${source('https://www.energy.gov/sites/default/files/2023-07/Technology%20Strategy%20Assessment%20-%20Lithium-ion_0.pdf','미국 DOE · 리튬이온 양극·음극 분류')}${source('https://www.energy.gov/cmei/ammto/breaking-it-down-next-generation-batteries','미국 DOE · 차세대·흐름전지')}${source('https://www.energy.gov/science/doe-explainsbatteries','미국 DOE · 충전·방전 원리')}</div>`)
},
{slug:'fuel-cells',group:'연료전지',title:'연료전지 개요',lead:'연료를 계속 공급해 전기와 열을 생산하는 장치. 기술 종류와 연료의 청정성, 전력 판매 제도를 함께 살펴봅니다.',toc:[['basics','작동 원리'],['types','종류의 분류 기준'],['hydrogen','수소와 청정수소'],['markets','HPS·CHPS'],['business','사업 판단 기준']],body:
section('basics','연료전지는 저장장치인가요, 발전장치인가요?',`<p>연료전지는 연료와 산화제의 화학에너지를 전기화학 반응으로 직접 전기로 바꾸는 발전장치입니다. 연료와 공기를 계속 공급하면 발전하며, 2차전지처럼 내부 반응물을 충전해 재사용하는 방식과 다릅니다.</p><div class="concept-strip"><div><b>연료 공급</b><span>수소 또는 변환 가능한 연료</span></div><div><b>전기화학 반응</b><span>전자와 이온은 다른 경로로 이동</span></div><div><b>전기·열 생산</b><span>반응 생성물은 연료에 따라 달라짐</span></div></div><p>수소를 직접 쓰는 기본 반응은 <strong>2H₂ + O₂ → 2H₂O + 전기 + 열</strong>입니다. 천연가스 등에서 수소를 만드는 개질 과정이 포함된 시스템이나 탄소를 포함한 연료를 쓰는 시스템에서는 CO₂도 발생할 수 있습니다.</p>`)+
section('types','PEMFC·SOFC 등의 이름은 전해질 기준입니다',`<p>연료전지는 주로 전해질의 종류에 따라 나눕니다. 전해질이 이동 가능한 이온과 작동 온도, 연료 선택을 좌우합니다. DMFC는 전해질보다 ‘메탄올을 직접 사용한다’는 연료·반응 방식을 강조한 이름입니다.</p>${table(['종류','전해질·이온','특징·대표 사용처'],[
[tech('pemfc'),'고분자 막 · H⁺','상대적으로 저온에서 작동하고 출력 변화에 대응하기 좋음. 차량·이동형·분산 전원'],
[tech('sofc'),'고체 산화물 · 보통 O²⁻','고온 운전, 연료 선택의 폭과 열 활용에 장점. 정지형 발전'],
[tech('pafc'),'인산 · H⁺','정지형 열병합 발전에 활용. 열 회수와 시스템 운전이 중요'],
[tech('mcfc'),'용융탄산염 · CO₃²⁻','고온 운전, 대규모 정지형 발전과 열 활용'],
[tech('afc'),'알칼리 용액 · OH⁻','CO₂ 오염에 민감한 전통적 계열. 우주용 등에 활용'],
[tech('dmfc'),'주로 고분자 막 · H⁺ / 메탄올 직접 공급','액체 연료 취급이 편리. 휴대형·원격 전원, 반응에서 CO₂ 발생']])}`)+
section('hydrogen','수소연료전지와 청정수소연료전지는 같은 분류인가요?',`<p>‘수소연료전지’는 수소를 연료로 쓰는 장치를 뜻하고, ‘청정수소’는 그 수소의 생산 과정 등에서 나온 온실가스 배출량에 대한 인증 개념입니다. 청정수소연료전지는 별도의 전해질 종류가 아니라, 청정수소를 연료로 사용하는 연료전지를 가리킵니다.</p>${note('<strong>장치의 배출과 연료의 배출을 따로 봅니다.</strong> 직접 수소를 쓰는 연료전지에서 물이 나오더라도, 수소 생산에 화석연료를 사용했다면 전체 온실가스 배출이 0이라고 할 수 없습니다. 수소의 색상 이름보다 실제 인증 결과와 산정 범위가 중요합니다.')}<p>국내 청정수소 기준은 수소 1 kg당 온실가스 배출량 <strong>4 kg CO₂e 이하</strong>입니다. CO₂e는 여러 온실가스를 CO₂와 같은 기준으로 환산한 값입니다. 인증의 산정 범위·등급·운송 적용 특례는 해당 시점의 고시와 인증 기준을 확인해야 합니다.</p><div class="sources">${source('https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000237332','국가법령정보센터 · 청정수소 인증 고시')}${source('https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/170506/view','산업부 · 국내 인증기준 안내')}</div>`)+
section('markets','HPS·CHPS는 어떤 제도인가요?',`<p>HPS(Hydrogen Portfolio Standard)는 수소발전 의무화 제도를, CHPS(Clean Hydrogen Portfolio Standard)는 청정수소발전 의무화 제도를 설명할 때 쓰이는 약어입니다. 실제 시장을 찾을 때는 공식 명칭인 <strong>‘일반수소발전 입찰시장’과 ‘청정수소발전 입찰시장’</strong>을 확인하는 것이 정확합니다. HPS를 수소발전 제도 전체를 뜻하는 표현으로 쓰기도 하므로 문맥을 구분해야 합니다.</p><p>이 시장은 수소 또는 수소화합물로 생산한 <strong>전력</strong>을 경쟁입찰로 구매하는 구조입니다. 수소 자체를 구매하는 입찰이나 연료전지 장비를 조달하는 입찰과 구분됩니다. 전력거래소가 입찰시장을 운영하고, 발전사업자는 가격과 사업계획을 제출해 평가받습니다.</p>${table(['구분','일반수소발전 입찰시장','청정수소발전 입찰시장'],[
['목적','분산형 수소발전 보급·경쟁 유도','청정수소 활용과 온실가스 감축'],
['연료','청정수소 인증을 필수로 요구하지 않는 일반수소 발전. 구체적 적격 연료는 공고 확인','국내 청정수소 인증기준을 충족하는 연료'],
['평가','입찰가격 + 계통 영향·산업·경제 기여 등','입찰가격 + 청정수소 등급·연료 공급 안정성·산업·경제 기여 등'],
['2025년 개설 발표 예시','연간 1,300 GWh / 거래기간 20년','연간 3,000 GWh / 거래기간 15년'],
['연료전지와의 관계','연료전지 발전사업에서 확인할 전력 판매 경로','청정수소 사용·인증 등 입찰 요건을 충족하는지 별도 검토']])}${note('<strong>CHPS는 연료전지만을 위한 시장이 아닙니다.</strong> 청정수소·수소화합물을 사용하는 발전을 대상으로 하므로, 연료전지 외 발전기술도 공고상 요건에 따라 검토됩니다. ‘연료전지이기 때문에 CHPS 대상’ 또는 ‘수소를 쓰기 때문에 자동 낙찰’은 성립하지 않습니다.')}<p><strong>2026년 변경안도 구분해서 봐야 합니다.</strong> 기후에너지환경부의 2026년 6월 8일 행정예고 발표에서는 청정수소 연간 500 GWh, 일반수소 연간 930 GWh를 제시하고 석탄–암모니아 혼소의 지원 제외와 일반수소 환경성 평가 강화 방향을 안내했습니다. 이는 해당 발표 당시의 개정안 설명이며, 실제 참여에는 이후 확정 고시와 입찰공고가 우선합니다.</p><div class="sources">${source('https://eiec.kdi.re.kr/policy/materialView.do?num=282365','기후부 · 2026년 행정예고 발표 (KDI 수록)')}${source('https://new.kpx.or.kr/boardDownload.es?bid=0042&list_no=74835&seq=8','전력거래소 · 2025년 일반수소 시장 운영 설명자료')}</div><ol class="market-steps"><li><b>시장 공고</b><span>구매량·참가 요건 공개</span></li><li><b>입찰</b><span>가격·연료·사업계획 제출</span></li><li><b>평가·선정</b><span>가격·비가격 지표 평가</span></li><li><b>계약·사업 준비</b><span>인허가·연료 조달·건설</span></li><li><b>발전·정산</b><span>계약과 규칙에 따라 이행</span></li></ol><p class="maker-note">수치 예시는 2025년 5월 9일 시장 개설 발표 기준이며 낙찰 실적이나 2026년 모집 물량이 아닙니다. 연도별 물량·거래기간·참가 요건·평가·정산 방식은 변경될 수 있습니다. 여기서는 제도 구조를 설명하며 현재 모집 여부를 확정하지 않습니다.</p><div class="sources">${source('https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/170506/view','산업부 · 2025년 일반·청정수소 시장 개설')}${source('https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/166907/view','산업부 · 수소발전 입찰시장 설계 취지')}${source('https://kchps.kmos.kr','전력거래소 · 입찰시장 공고·플랫폼')}</div>`)+
section('business','발전사업은 어떤 비용을 비교해야 하나요?',`<p>연료전지의 사업성을 판단하려면 설비비(원/kW), 연료비, 발전 효율, 가동률, 스택 교체·정비비, 열 판매 가능성과 전력 판매 조건을 함께 비교해야 합니다. 배터리의 저장 용량당 가격(원/kWh)과 발전설비의 출력당 가격(원/kW)은 같은 지표가 아닙니다.</p><p>개별 사업에서는 입찰 수입과 연료비·정비비·금융비용을 연결해 발전단가와 현금흐름을 계산해야 합니다. 이것은 위 제도 설명을 사업 검토에 적용할 때 필요한 판단 기준이며, 연료전지가 항상 화력발전보다 싸다는 의미는 아닙니다.</p><div class="sources">${source('https://www.energy.gov/cmei/fuels/fuel-cell-basics','미국 DOE · 연료전지 기본 원리')}${source('https://www.energy.gov/cmei/fuels/types-fuel-cells','미국 DOE · 연료전지 종류')}${source('https://www.hydrogen.energy.gov/program-areas/fuel-cells','미국 DOE · 연료전지 용도·연료')}</div>`)
}];
for(const p of pages){
const nav=`<nav class="overview-nav" aria-label="개요 페이지">${pages.map(q=>`<a href="../${q.slug}/" ${q.slug===p.slug?'aria-current="page"':''}>${q.group} 개요</a>`).join('')}</nav>`;
const links=DB.filter(x=>x.group===p.group).map(x=>`<a href="../../technology/${x.id}/">${x.name}<span>원리·애니메이션·제조사</span></a>`).join('');
p.body+=(p.slug==='primary'?section('value','생활 건전지 가격과 성능',`<a class="topic-link" href="../../guide/alkaline-value/">다이소·에너자이저·듀라셀·벡셀 비교 →</a>`):p.slug==='secondary'?section('ess','ESS 시장과 배터리 선택',`<a class="topic-link" href="../../guide/ess/">ESS 입찰제도와 LFP 비중이 높아진 이유 →</a>`):'');
const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${p.lead}"><meta name="theme-color" content="#092736"><title>${p.title} | 배터리 아틀라스</title><link rel="icon" href="../../favicon.svg"><link rel="stylesheet" href="../../style.css"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9806292747404740" crossorigin="anonymous"></script></head><body><header class="site-head"><a class="brand" href="../../"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></a><a href="../../">전지별 탐색</a></header><main class="overview-page">${nav}<div class="overview-hero"><span class="eyebrow">분류부터 이해하는 전기화학</span><h1>${p.title}</h1><p>${p.lead}</p></div><nav class="overview-toc" aria-label="이 페이지 목차">${p.toc.map(([id,t])=>`<a href="#${id}">${t}</a>`).join('')}</nav><article>${p.body}</article><section class="overview-section"><h2>전지별 작동 원리 살펴보기</h2><div class="technology-links">${links}</div></section><p class="method-foot">자료 확인일: 2026년 10월 5일. 종류별 표는 대표적인 경향을 설명하며 실제 제품 사양과 다를 수 있습니다.</p></main><footer><div class="footer-brand"><div class="brand"><span class="brand-mark">↯</span><span>배터리 아틀라스</span></div><span class="site-credit">by Halmen 2026</span></div><p>전기화학을 이해하기 위한 교육용 자료</p></footer><div class="privacy-link"><a href="/privacy/">개인정보·쿠키 안내</a></div></body></html>`;
fs.mkdirSync(`dist/overview/${p.slug}`,{recursive:true});fs.writeFileSync(`dist/overview/${p.slug}/index.html`,applyPageDefaults(html, `/overview/${p.slug}/`));
}
console.log('Generated 3 overview pages');
