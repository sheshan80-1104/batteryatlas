(() => {
 const $=id=>document.getElementById(id), svgNS="http://www.w3.org/2000/svg";
 const categories=["전체","1차전지","2차전지","연료전지","기타·특수전지"];
 let group="전체",query="",active=DB.find(x=>x.id===location.hash.slice(1))||DB[0],mode="discharge",paused=matchMedia("(prefers-reduced-motion: reduce)").matches,elapsed=0,last=0;
 const wire=$("wire"),ionPath=$("ionPath"),ions=[],electrons=[];
 function particle(parent,color,label,r){const g=document.createElementNS(svgNS,"g"),c=document.createElementNS(svgNS,"circle"),t=document.createElementNS(svgNS,"text");c.setAttribute("r",r);c.setAttribute("fill",color);c.setAttribute("stroke","#fff");c.setAttribute("stroke-width","2");t.setAttribute("text-anchor","middle");t.setAttribute("dominant-baseline","central");t.setAttribute("fill","#fff");t.setAttribute("font-size",label==="e⁻"?"13":"11");t.setAttribute("font-weight","700");t.textContent=label;g.append(c,t);parent.append(g);return {g,t};}
 for(let i=0;i<3;i++){ions.push(particle($("ions"),"#df914a","Li⁺",17));electrons.push(particle($("electrons"),"#257ba6","e⁻",16));}
 function setText(id,value){$(id).textContent=value;}
 function filtered(){return DB.filter(x=>(group==="전체"||x.group===group)&&[x.name,x.uses,x.materials,x.carrier,...MAKERS[x.id].map(m=>m[0])].join(" ").toLocaleLowerCase().includes(query));}
 function drawFilters(){const container=$("filters");container.replaceChildren();categories.forEach(c=>{const b=document.createElement("button");b.type="button";b.textContent=c;b.setAttribute("aria-pressed",String(group===c));b.addEventListener("click",()=>{group=c;drawFilters();renderList();});container.append(b);});}
 function renderList(){const list=$("items"),results=filtered();list.replaceChildren();setText("count",results.length+"종");if(!results.length){const e=document.createElement("p");e.className="empty";e.textContent=group==="기타·특수전지"&&!query?"현재 수록된 25종은 모두 1차전지·2차전지·연료전지에 해당합니다. 흐름전지는 충전 가능한 2차전지에 포함됩니다.":"검색 결과가 없습니다. 다른 소재나 기술 이름을 입력해 보세요.";list.append(e);return;}results.forEach(x=>{const b=document.createElement("button");b.type="button";b.className="item";b.setAttribute("role","option");b.setAttribute("aria-selected",String(active.id===x.id));const n=document.createElement("span"),s=document.createElement("small");n.textContent=x.name;s.textContent=x.group;b.append(n,s);b.addEventListener("click",()=>select(x));list.append(b);});}
 function select(x){active=x;mode="discharge";elapsed=0;history.replaceState(null,"","#"+x.id);renderList();renderDetail();}
 function renderDetail(){const x=active;$("productDetail").innerHTML=renderProduct(x.id);$("manufacturerDetail").innerHTML=renderMakers(x.id);setText("category",x.group+" / "+x.stage);setText("name",x.name);setText("stage",x.stage);setText("principle",x.principle);$("detailLink").href="technology/"+x.id+"/";setText("leftLabel",x.left);setText("rightLabel",x.right);setText("electrolyte",x.electrolyte);setText("reaction",x.reaction);setText("pros",x.pros);setText("cons",x.cons);setText("materials",x.materials);setText("uses",x.uses);setText("sales",x.sales);setText("price",x.price);setText("priceNote",x.priceNote||"");setText("ionLegend",x.carrier);setText("electrolyteLabel",x.group==="연료전지"?"전해질 막":x.subtype==="흐름전지"?"전해액·분리막":"전해질·분리막");setText("leftFoot",x.group==="연료전지"?"연료극":"음극 · 방전 기준");setText("rightFoot",x.group==="연료전지"?"공기극":"양극 · 방전 기준");
  $("charge").disabled=x.group==="1차전지"||x.group==="연료전지";const src=$("sources");src.replaceChildren();x.sources.forEach(key=>{const a=document.createElement("a");a.href=SOURCES[key].url;a.target="_blank";a.rel="noopener";a.textContent=SOURCES[key].name+" ↗";src.append(a);});updateMode();
 }
 function updateMode(){const x=active,charging=mode==="charge";$("discharge").setAttribute("aria-pressed",String(!charging));$("charge").setAttribute("aria-pressed",String(charging));setText("loadText",charging?"충전기":x.group==="연료전지"?"전력 공급":"전기 사용");
  setText("simCaption",x.group==="연료전지"?"연료와 산소를 계속 공급하면 발전합니다. 충전식 배터리처럼 내부에 전기를 저장하지 않습니다.":x.group==="1차전지"?"일회용 전지의 방전 경로입니다. 일반적인 제품은 충전하지 않습니다.":charging?"외부 전원으로 전자를 밀어 넣습니다. 이온 이동도 방전과 반대입니다.":"이온은 전해질 안으로, 전자는 외부 회로로 흐릅니다.");
  ions.forEach(p=>p.t.textContent=x.carrier);draw();
 }
 function position(g,path,p,reverse){const point=path.getPointAtLength(path.getTotalLength()*(reverse?1-p:p));g.setAttribute("transform",`translate(${point.x} ${point.y})`);}
 function draw(){if(!active)return;const ionReverse=(active.direction==="left")!==(mode==="charge"),electronReverse=mode==="charge";for(let i=0;i<3;i++){const p=(elapsed/4300+i/3)%1;position(ions[i].g,ionPath,p,ionReverse);position(electrons[i].g,wire,p,electronReverse);}}
 function frame(t){if(last&&!paused)elapsed+=Math.min(80,t-last);last=t;draw();requestAnimationFrame(frame);}
 $("search").addEventListener("input",e=>{query=e.target.value.trim().toLocaleLowerCase();renderList();});
 $("discharge").addEventListener("click",()=>{mode="discharge";elapsed=0;updateMode();});
 $("charge").addEventListener("click",()=>{if($("charge").disabled)return;mode="charge";elapsed=0;updateMode();});
 $("pause").addEventListener("click",()=>{paused=!paused;$("pause").textContent=paused?"▶":"Ⅱ";$("pause").setAttribute("aria-pressed",String(paused));$("pause").setAttribute("aria-label",paused?"애니메이션 재생":"애니메이션 일시정지");});
 if(paused){$("pause").textContent="▶";$("pause").setAttribute("aria-pressed","true");$("pause").setAttribute("aria-label","애니메이션 재생");}
 $("evShareReference").innerHTML=renderEVShare();drawFilters();renderList();renderDetail();requestAnimationFrame(frame);
})();
