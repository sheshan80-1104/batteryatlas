(() => {
 const id=document.body.dataset.id, x=DB.find(item=>item.id===id);if(!x)return;
 const $=name=>document.getElementById(name),ns="http://www.w3.org/2000/svg";
 let mode="discharge",paused=matchMedia("(prefers-reduced-motion: reduce)").matches,elapsed=0,last=0;
 const ionNodes=[],electronNodes=[];
 function make(parent,color,text,r){const g=document.createElementNS(ns,"g"),c=document.createElementNS(ns,"circle"),t=document.createElementNS(ns,"text");c.setAttribute("r",r);c.setAttribute("fill",color);c.setAttribute("stroke","#fff");c.setAttribute("stroke-width","2");t.setAttribute("text-anchor","middle");t.setAttribute("dominant-baseline","central");t.setAttribute("fill","white");t.setAttribute("font-weight","700");t.setAttribute("font-size","11");t.textContent=text;g.append(c,t);parent.append(g);return g;}
 for(let i=0;i<3;i++){ionNodes.push(make($("ions"),"#df914a",x.carrier,17));electronNodes.push(make($("electrons"),"#257ba6","e⁻",16));}
 const charge=$("charge"),discharge=$("discharge"),pause=$("pause");
 charge.disabled=x.group==="Primary batteries"||x.group==="Fuel cells";
 function position(node,path,p,reverse){const pt=path.getPointAtLength(path.getTotalLength()*(reverse?1-p:p));node.setAttribute("transform",`translate(${pt.x} ${pt.y})`);}
 function draw(){for(let i=0;i<3;i++){const p=(elapsed/4300+i/3)%1;position(ionNodes[i],$("ionPath"),p,(x.direction==="left")!==(mode==="charge"));position(electronNodes[i],$("wire"),p,mode==="charge");}}
 function update(){charge.setAttribute("aria-pressed",String(mode==="charge"));discharge.setAttribute("aria-pressed",String(mode==="discharge"));$("loadText").textContent=mode==="charge"?"Charger":x.group==="Fuel cells"?"Power output":"Powering a load";$("simCaption").textContent=mode==="charge"?"An external source drives electrons into the cell while ions move in the reverse direction.":x.group==="Fuel cells"?"Generates while fuel and air are supplied.":x.group==="Primary batteries"?"Discharge pathway for a single-use cell.":"Ions move through the electrolyte; electrons flow through the external circuit.";draw();}
 discharge.addEventListener("click",()=>{mode="discharge";elapsed=0;update();});charge.addEventListener("click",()=>{mode="charge";elapsed=0;update();});
 pause.addEventListener("click",()=>{paused=!paused;pause.textContent=paused?"▶":"Ⅱ";pause.setAttribute("aria-pressed",String(paused));pause.setAttribute("aria-label",paused?"Play animation":"Pause animation");});
 if(paused){pause.textContent="▶";pause.setAttribute("aria-pressed","true");pause.setAttribute("aria-label","Play animation");}
 function frame(t){if(last&&!paused)elapsed+=Math.min(80,t-last);last=t;draw();requestAnimationFrame(frame);}update();requestAnimationFrame(frame);
})();
