(() => {
  const data = window.TIL_DATA || [];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  const inline = s => esc(s).replace(/**(.+?)**/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>");
  const markdown = source => {
    const lines=String(source||"").split("\n"); let out="",code=false,list=null;
    const close=()=>{if(list){out+=`</${list}>`;list=null}};
    for(const raw of lines){const line=raw.trimEnd(),t=line.trim();
      if(t.startsWith("```")){close();code=!code;out+=code?"<pre><code>":"</code></pre>";continue}
      if(code){out+=esc(line)+"\n";continue}
      if(!t){close();continue}
      const h=t.match(/^(#{2,4})\s+(.+)/); if(h){close();out+=`<h4>${inline(h[2])}</h4>`;continue}
      const ul=t.match(/^[-*]\s+(.+)/); if(ul){if(list!=="ul"){close();list="ul";out+="<ul>"}out+=`<li>${inline(ul[1])}</li>`;continue}
      const ol=t.match(/^\d+[.)]\s+(.+)/); if(ol){if(list!=="ol"){close();list="ol";out+="<ol>"}out+=`<li>${inline(ol[1])}</li>`;continue}
      if(t==="---"){close();out+="<hr>";continue}
      close();out+=`<p>${inline(t)}</p>`;
    } close(); if(code)out+="</code></pre>"; return out;
  };
  const categoryLabels={"IT 인프라의 이해":"IT 인프라의 이해","보안 인프라 운영 관리":"보안 인프라 운영 관리","기업 정보 보호 관리":"기업 정보 보호 관리"};
  const root=document.querySelector("#til-archive"); if(!root)return;
  const groups=Object.entries(categoryLabels).map(([key,label])=>({key,label,items:data.filter(x=>x.category===key)}));
  root.innerHTML=groups.map((g,gi)=>`<section class="til-category" id="til-${gi+1}"><div class="til-category-title"><span>0${gi+1}</span><div><p class="kicker">날짜별 학습 기록</p><h2>${esc(g.label)}</h2><p>${g.items.length}개의 기록</p></div></div><div class="til-timeline">${g.items.map((x,i)=>`<details class="til-entry"><summary><time>${esc(x.date)}${x.end?" – "+esc(x.end):""}</time><strong>${esc(x.title)}</strong><span>내용 보기</span></summary><div class="til-entry-body">${markdown(x.content)}</div></details>`).join("")}</div></section>`).join("");
})();
