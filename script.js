const data=window.PORTFOLIO||{projects:[],awards:[],skills:[]};
const esc=value=>String(value??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const empty=(node,label)=>{node.innerHTML=`<div class="empty"><span>EMPTY</span><h2>${label}</h2><p>자료를 추가하면 이 페이지에 자동으로 표시됩니다.</p></div>`};
const projects=document.querySelector("#project-list");
if(projects){if(!data.projects.length)empty(projects,"등록된 프로젝트가 없습니다.");else projects.innerHTML=data.projects.map((p,i)=>`<article class="record"><div class="record-no">${String(i+1).padStart(2,"0")}</div><div class="record-main"><div class="record-meta"><span>PROJECT</span><time>${esc(p.period)}</time></div><h2>${esc(p.title)}</h2><p>${esc(p.summary)}</p><div class="chips">${(p.skills||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</div>${(p.details||[]).length?`<details><summary>담당 업무와 결과</summary><ul>${p.details.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`:""}</div></article>`).join("")}
const awards=document.querySelector("#award-list");
if(awards){if(!data.awards.length)empty(awards,"등록된 수상 내역이 없습니다.");else awards.innerHTML=data.awards.map((a,i)=>`<article class="record"><div class="record-no">${String(i+1).padStart(2,"0")}</div><div class="record-main"><div class="record-meta"><span>AWARD</span><time>${esc(a.date)}</time></div><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p></div></article>`).join("")}
const skills=document.querySelector("#skill-list");
if(skills){if(!data.skills.length)empty(skills,"등록된 기술이 없습니다.");else skills.innerHTML=data.skills.map((s,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><strong>${esc(s)}</strong></article>`).join("")}
