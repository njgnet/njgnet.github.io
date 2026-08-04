const data = window.PORTFOLIO || { profile: {}, projects: [], awards: [], skills: [] };
const $ = (selector) => document.querySelector(selector);

function text(selector, value, fallback) {
  $(selector).textContent = value || fallback;
}

text("#profile-name", data.profile.name, "포트폴리오");
text("#profile-headline", data.profile.headline, "소개 문장을 입력해주세요.");
text("#profile-intro", data.profile.intro, "웹사이트 기본 틀입니다.");
text("#about-content", data.profile.about, "소개 내용이 아직 등록되지 않았습니다.");

function renderEmpty(container, message) {
  container.innerHTML = `<article class="empty-panel">${message}</article>`;
}

function renderProjects() {
  const container = $("#project-list");
  if (!data.projects.length) return renderEmpty(container, "등록된 프로젝트가 없습니다.");
  container.innerHTML = data.projects.map((item, index) => `
    <article class="card">
      <div class="card-meta"><span>PROJECT ${String(index + 1).padStart(2, "0")}</span><time>${item.period || ""}</time></div>
      <h3>${item.title}</h3><p>${item.summary || ""}</p>
      <div class="tags">${(item.skills || []).map(skill => `<span>${skill}</span>`).join("")}</div>
      ${(item.details || []).length ? `<details><summary>담당 업무와 결과 보기</summary><ul>${item.details.map(line => `<li>${line}</li>`).join("")}</ul></details>` : ""}
    </article>`).join("");
}

function renderAwards() {
  const container = $("#award-list");
  if (!data.awards.length) return renderEmpty(container, "등록된 수상 내역이 없습니다.");
  container.innerHTML = data.awards.map(item => `<article class="card"><div class="card-meta"><span>AWARD</span><time>${item.date || ""}</time></div><h3>${item.title}</h3><p>${item.description || ""}</p></article>`).join("");
}

function renderSkills() {
  const container = $("#skill-list");
  if (!data.skills.length) return renderEmpty(container, "등록된 기술이 없습니다.");
  container.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join("");
}

renderProjects(); renderAwards(); renderSkills();
