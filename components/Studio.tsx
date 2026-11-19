"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowDownToLine, ArrowRight, BookOpen, BrainCircuit, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardCheck, Code2, Compass, ExternalLink, Filter, FolderKanban, GraduationCap, Grid2X2, HeartPulse, LayoutDashboard, Layers3, Menu, Palette, Plane, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Store, Target, TrendingUp, X, ChartNoAxesCombined } from "lucide-react";
import { categories, projects, stages, statusNames, type CategoryId, type Project, type Status } from "@/lib/projects";

type RecordEntry = { status: Status; repo: string; demo: string; memo: string };
type Records = Record<string, RecordEntry>;
const storageKey = "website50-project-records-v1";
const emptyRecord: RecordEntry = { status:"planned", repo:"", demo:"", memo:"" };
const categoryIcons = {GraduationCap,ShieldCheck,BrainCircuit,Store,ShoppingBag,ChartNoAxesCombined,Plane,HeartPulse,Palette,Layers3};
const phases = ["전체 프로젝트","우선 제작","개발 중","완료된 프로젝트"] as const;
function badgeColor(status: Status) { return `status status-${status}`; }
function categoryIcon(icon: string, size=20) { const Icon = categoryIcons[icon as keyof typeof categoryIcons] ?? Grid2X2; return <Icon size={size} strokeWidth={1.8}/>; }
function downloadFile(filename: string, content: string, type: string) { const blob = new Blob([content], {type}); const href=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=href;a.download=filename;a.click();URL.revokeObjectURL(href); }
function csvValue(v: string) { return `"${v.replaceAll('"','""')}"`; }

export default function Studio() {
  const [view,setView] = useState<"overview"|"projects"|"roadmap">("overview");
  const [category,setCategory] = useState<CategoryId|"all">("all");
  const [query,setQuery] = useState("");
  const [phase,setPhase] = useState<typeof phases[number]>("전체 프로젝트");
  const [type,setType] = useState("전체 유형");
  const [records,setRecords] = useState<Records>({});
  const [selected,setSelected] = useState<Project|null>(null);
  const [mobileNav,setMobileNav] = useState(false);
  const [showHelp,setShowHelp] = useState(false);
  const [ready,setReady] = useState(false);
  useEffect(()=>{
    try { const v=localStorage.getItem(storageKey); if(v) { const parsed=JSON.parse(v); if(parsed && typeof parsed === "object" && !Array.isArray(parsed)) setRecords(parsed); } } catch { /* invalid or blocked local storage */ }
    setReady(true);
  },[]);
  useEffect(()=>{ if(ready) try { localStorage.setItem(storageKey,JSON.stringify(records)); } catch { /* storage unavailable */ } },[records,ready]);
  const getRecord=(id:number):RecordEntry=>records[String(id)]??emptyRecord;
  const updateRecord=(id:number,patch:Partial<RecordEntry>)=>setRecords(p=>({...p,[String(id)]:{...(p[String(id)]??emptyRecord),...patch}}));
  const completed=projects.filter(p=>getRecord(p.id).status==="done").length;
  const active=projects.filter(p=>["building","review"].includes(getRecord(p.id).status)).length;
  const planned=projects.length-completed-active;
  const filtered=useMemo(()=>projects.filter(p=>{
    const text=`${p.name} ${p.description} ${p.features.join(" ")} ${p.slug}`.toLowerCase();
    const matchesCategory=category==="all"||p.category===category;
    const matchesQuery=text.includes(query.toLowerCase().trim())||String(p.id).includes(query.trim());
    const matchesPhase=phase==="전체 프로젝트"||(phase==="우선 제작"&&p.recommended)||(phase==="개발 중"&&["building","review"].includes(getRecord(p.id).status))||(phase==="완료된 프로젝트"&&getRecord(p.id).status==="done");
    return matchesCategory&&matchesQuery&&matchesPhase&&(type==="전체 유형"||p.type===type);
  }),[category,query,phase,type,records]);
  const goToProjects=(cat:CategoryId|"all"="all")=>{setCategory(cat);setView("projects");setMobileNav(false);};
  const exportCSV=()=>{
    const head=["번호","프로젝트","분야","유형","난이도","상태","GitHub","배포주소","메모"];
    const rows=projects.map(p=>{const r=getRecord(p.id);return [String(p.id).padStart(2,"0"),p.name,categories.find(c=>c.id===p.category)?.name??"",p.type,p.difficulty,statusNames[r.status],r.repo,r.demo,r.memo]});
    const csv="\uFEFF"+[head,...rows].map(r=>r.map(csvValue).join(",")).join("\r\n");downloadFile("website-50-projects.csv",csv,"text/csv;charset=utf-8");
  };
  const nav=(target:typeof view)=>{setView(target);setMobileNav(false);if(target==="projects"){setCategory("all");setPhase("전체 프로젝트");}};
  return <div className="app-shell">
    {mobileNav&&<button className="mobile-shade" onClick={()=>setMobileNav(false)} aria-label="메뉴 닫기"/>}
    <aside className={`sidebar ${mobileNav?"sidebar-open":""}`}>
      <button className="brand" onClick={()=>nav("overview")} aria-label="대시보드 홈">
        <span className="brand-mark"><Layers3 size={23}/></span><span><b>PROJECT <em>50</em></b><small>WEBSITE STUDIO</small></span>
      </button>
      <div className="sidebar-section-label">WORKSPACE</div>
      <div className="sidebar-nav">
        <button className={view==="overview"?"nav-item active":"nav-item"} onClick={()=>nav("overview")}><LayoutDashboard size={19}/> 대시보드</button>
        <button className={view==="projects"&&category==="all"?"nav-item active":"nav-item"} onClick={()=>nav("projects")}><Grid2X2 size={19}/> 전체 프로젝트 <span className="nav-count">50</span></button>
        <button className={view==="roadmap"?"nav-item active":"nav-item"} onClick={()=>nav("roadmap")}><CalendarDays size={19}/> 제작 로드맵</button>
      </div>
      <div className="sidebar-section-label category-label">CATEGORIES <span>10</span></div>
      <div className="sidebar-nav categories-nav">
        {categories.map(c=><button key={c.id} className={view==="projects"&&category===c.id?"nav-item active":"nav-item"} onClick={()=>goToProjects(c.id)}><span className="nav-category-symbol" style={{color:c.color}}>{categoryIcon(c.icon,18)}</span>{c.name}<span className="nav-count">05</span></button>)}
      </div>
      <div className="sidebar-bottom"><div className="goal-card"><span className="goal-icon"><Target size={19}/></span><p>우리의 목표</p><strong>50개의 아이디어,<br/>50개의 가능성.</strong><span className="mini-progress"><span style={{width:`${completed*2}%`}}/></span><small>{completed} / 50 프로젝트 완료</small></div><button className="sidebar-help" onClick={()=>setShowHelp(true)}><CircleHelp size={17}/> 이용 가이드</button></div>
    </aside>
    <div className="main-wrapper">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="메뉴 열기" onClick={()=>setMobileNav(true)}><Menu size={23}/></button><span className="breadcrumb">WORKSPACE</span><ChevronRight size={14}/><strong>{view==="overview"?"대시보드":view==="roadmap"?"제작 로드맵":"전체 프로젝트"}</strong></div><div className="topbar-right"><span className="topbar-dot"/> <span className="topbar-status">로컬 관리 모드</span><span className="user-avatar">P50</span></div></header>
      <main className="main-content">
        {view==="overview"&&<>
          <section className="page-heading"><div><span className="eyebrow"><span className="eyebrow-line"/> YOUR CREATIVE WORKSPACE</span><h1>가능성을 웹으로 만드는 공간<span className="heading-dot">.</span></h1><p>50개의 아이디어를 하나씩 현실로. 기획부터 개발, 배포까지 모든 여정을 함께 관리합니다.</p></div><button className="outline-button export-button" onClick={exportCSV}><ArrowDownToLine size={17}/> 프로젝트 CSV</button></section>
          <section className="hero"><div className="hero-content"><span className="hero-pill"><Sparkles size={14}/> THE 50 WEBSITE CHALLENGE</span><h2>아이디어는 50개.<br/><span>가능성은 무한대.</span></h2><p>10개 분야, 50개의 프로젝트.<br/>당신만의 디지털 포트폴리오를 완성하세요.</p><button className="hero-button" onClick={()=>goToProjects()}>50개 프로젝트 둘러보기 <ArrowRight size={17}/></button></div><div className="hero-art" aria-hidden="true"><div className="art-glow"/><div className="floating-ui ui-back"><span className="ui-dots"><i/><i/><i/></span><div className="ui-bars"><i/><i/><i/></div></div><div className="floating-ui ui-main"><span className="ui-dots"><i/><i/><i/></span><div className="ui-line-long"/><div className="ui-preview"><div/><div/></div><div className="ui-lines"><i/><i/><i/></div></div><div className="floating-badge"><Check size={16}/> BUILD YOUR NEXT IDEA</div><span className="art-star art-star-1">✦</span><span className="art-star art-star-2">✳</span></div></section>
          <section className="stats-grid" aria-label="프로젝트 현황"><Stat icon={<FolderKanban size={22}/>} value="50" label="전체 프로젝트" text="10개 카테고리" tone="blue"/><Stat icon={<Activity size={22}/>} value={String(active).padStart(2,"0")} label="진행 중" text="개발 및 검수" tone="purple"/><Stat icon={<CheckCircle2 size={22}/>} value={String(completed).padStart(2,"0")} label="완료한 프로젝트" text="배포까지 완료" tone="green"/><Stat icon={<Target size={22}/>} value={`${completed*2}%`} label="전체 달성률" text={`${planned}개 프로젝트 대기 중`} tone="orange"/></section>
          <div className="section-heading"><div><span className="section-eyebrow">EXPLORE BY CATEGORY</span><h2>분야별 프로젝트 <span>10</span></h2><p>관심 있는 분야에서 새로운 프로젝트를 발견해 보세요.</p></div><button className="text-link" onClick={()=>goToProjects()}>전체 보기 <ArrowRight size={16}/></button></div>
          <section className="category-grid">{categories.map((c,i)=><button key={c.id} className="category-card" onClick={()=>goToProjects(c.id)}><span className="category-card-icon" style={{color:c.color,background:`${c.color}18`}}>{categoryIcon(c.icon,24)}</span><span className="category-card-name">{c.name}</span><span className="category-card-meta">{String(i+1).padStart(2,"0")} / 05 PROJECTS</span><ArrowRight className="category-card-arrow" size={16}/></button>)}</section>
          <div className="section-heading featured-heading"><div><span className="section-eyebrow">EDITOR&apos;S PICK</span><h2>먼저 시작하면 좋은 프로젝트 <span>03</span></h2><p>실무 활용성과 학습 효과를 고려해 골랐습니다.</p></div><button className="text-link" onClick={()=>{setPhase("우선 제작");goToProjects();setPhase("우선 제작")}}>추천 프로젝트 보기 <ArrowRight size={16}/></button></div>
          <section className="featured-grid">{[41,16,12].map((id,i)=>{const p=projects[id-1];return <button className={`featured-card feature-${i}`} key={id} onClick={()=>setSelected(p)}><div className="featured-visual"><span className="featured-big-icon">{categoryIcon(p.icon,54)}</span><span className="featured-visual-overlay"/><span className="featured-index">0{i+1} / RECOMMENDED</span></div><div className="featured-body"><span className="featured-type">{categories.find(c=>c.id===p.category)?.name} · {p.difficulty}</span><h3>{p.name}</h3><p>{p.description}</p><span className="featured-more">프로젝트 자세히 보기 <ArrowRight size={15}/></span></div></button>})}</section>
          <div className="bottom-banner"><div className="banner-icon"><Compass size={24}/></div><div><strong>명확한 로드맵으로, 끝까지 완성해 보세요.</strong><p>12개월 · 5단계 제작 계획으로 차근차근 성장하는 프로젝트</p></div><button onClick={()=>nav("roadmap")}>로드맵 확인 <ArrowRight size={16}/></button></div>
        </>}
        {view==="projects"&&<>
          <section className="page-heading"><div><span className="eyebrow"><span className="eyebrow-line"/> PROJECT LIBRARY</span><h1>프로젝트 라이브러리<span className="heading-dot">.</span></h1><p>50개 아이디어를 탐색하고 개발 상태와 배포 링크를 관리합니다.</p></div><button className="outline-button export-button" onClick={exportCSV}><ArrowDownToLine size={17}/> CSV 내보내기</button></section>
          <div className="library-overview"><div><span>전체 프로젝트</span><strong>50</strong></div><div><span>개발 진행</span><strong>{active}</strong></div><div><span>검수 및 완료</span><strong>{projects.filter(p=>["review","done"].includes(getRecord(p.id).status)).length}</strong></div><div><span>달성률</span><strong>{completed*2}%</strong></div></div>
          <section className="filter-panel"><div className="filter-top"><div className="search-box"><Search size={19}/><input aria-label="프로젝트 검색" placeholder="프로젝트명, 기능, 키워드 검색..." value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="검색 초기화" onClick={()=>setQuery("")}><X size={15}/></button>}</div><div className="select-wrapper"><Filter size={16}/><select aria-label="프로젝트 유형" value={type} onChange={e=>setType(e.target.value)}>{["전체 유형","소개형","예약·관리형","AI·서비스형","플랫폼형"].map(t=><option key={t}>{t}</option>)}</select><ChevronDown size={15}/></div></div><div className="filter-bottom"><div className="filter-tabs">{phases.map(p=><button key={p} className={phase===p?"tab current":"tab"} onClick={()=>setPhase(p)}>{p}</button>)}</div></div></section>
          <div className="project-list-heading"><strong>{category==="all"?"모든 분야":categories.find(c=>c.id===category)?.name} <span>{filtered.length}개 프로젝트</span></strong><div className="list-select"><select aria-label="분야 선택" value={category} onChange={e=>setCategory(e.target.value as CategoryId|"all")}><option value="all">전체 카테고리</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><ChevronDown size={15}/></div></div>
          {filtered.length?<div className="projects-grid">{filtered.map(p=>{const c=categories.find(c=>c.id===p.category)!;const r=getRecord(p.id);return <button className="project-card" key={p.id} onClick={()=>setSelected(p)}><div className="project-card-top"><span className="project-icon" style={{color:c.color,background:`${c.color}18`}}>{categoryIcon(p.icon,23)}</span><span className={badgeColor(r.status)}>{statusNames[r.status]}</span></div><div className="project-no">PROJECT {String(p.id).padStart(2,"0")} <span>· {c.name}</span></div><h3>{p.name}</h3><p>{p.description}</p><div className="project-tags"><span>{p.type}</span><span>{p.difficulty}</span></div><div className="project-card-footer"><span>{r.demo?"배포 링크 등록됨":r.repo?"GitHub 연결됨":"상세 내용 보기"}</span><ArrowRight size={17}/></div></button>})}</div>:<div className="empty-state"><Search size={35}/><h3>검색 결과가 없습니다</h3><p>필터나 검색어를 바꾸어 다시 확인해 보세요.</p><button className="outline-button" onClick={()=>{setQuery("");setCategory("all");setPhase("전체 프로젝트");setType("전체 유형")}}>필터 초기화</button></div>}
        </>}
        {view==="roadmap"&&<>
          <section className="page-heading"><div><span className="eyebrow"><span className="eyebrow-line"/> OUR DEVELOPMENT JOURNEY</span><h1>12개월 제작 로드맵<span className="heading-dot">.</span></h1><p>작은 프로젝트부터 복잡한 플랫폼까지, 단계별로 실력을 쌓아갑니다.</p></div><button className="outline-button" onClick={exportCSV}><ArrowDownToLine size={17}/> 계획표 CSV</button></section>
          <div className="roadmap-hero"><span><CalendarDays size={17}/> MASTER PLAN 2026–2027</span><h2>50개의 프로젝트를 완성하는<br/><em>5단계 여정</em></h2><div className="roadmap-metrics"><strong>12 <small>개월</small></strong><strong>5 <small>단계</small></strong><strong>50 <small>프로젝트</small></strong></div></div>
          <div className="roadmap-list">{stages.map((s,i)=><div className="roadmap-item" key={s.title}><div className="roadmap-line"><span>{String(i+1).padStart(2,"0")}</span></div><div className="roadmap-detail"><div className="roadmap-item-top"><div><span className="roadmap-stage">PHASE {String(i+1).padStart(2,"0")} · {s.range}</span><h3>{s.title}</h3></div><span className="roadmap-number">{s.count} PROJECTS</span></div><p>{s.desc}</p><div className="roadmap-progress"><span style={{width:`${Math.round(s.count/50*100)}%`}}/></div></div></div>)}</div><div className="roadmap-note"><ClipboardCheck size={21}/><p><strong>완료 기준</strong> — 페이지 작동, 모바일 표시, 접근성, 오류 검토, GitHub 저장, 공개 배포를 확인합니다. 이 로드맵은 계획안이며 실제 완료 일정을 의미하지 않습니다.</p></div>
        </>}
      </main><footer className="footer"><span>© 2026 PROJECT 50 STUDIO. Build one idea at a time.</span><span>Made with Next.js · <span className="footer-heart">♥</span> Creative Learning</span></footer>
    </div>
    {selected&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-heading"><div className="detail-header"><span>PROJECT DETAILS / {String(selected.id).padStart(2,"0")}</span><button aria-label="상세 창 닫기" onClick={()=>setSelected(null)}><X size={21}/></button></div><div className="detail-body"><div className="detail-icon" style={{color:selected.accent,background:`${selected.accent}18`}}>{categoryIcon(selected.icon,29)}</div><span className="detail-category">{categories.find(c=>c.id===selected.category)?.name} · {selected.type}</span><h2 id="detail-heading">{selected.name}</h2><p className="detail-description">{selected.description}</p><div className="detail-facts"><span>프로젝트 번호 <b>{String(selected.id).padStart(2,"0")}</b></span><span>개발 난이도 <b>{selected.difficulty}</b></span></div><h3 className="detail-subheading">핵심 기능</h3><div className="feature-list">{selected.features.map(f=><span key={f}><CheckCircle2 size={16}/>{f}</span>)}</div><h3 className="detail-subheading">프로젝트 진행 상태</h3><div className="status-picker">{(Object.keys(statusNames) as Status[]).map(st=><button key={st} className={getRecord(selected.id).status===st?"picked":""} onClick={()=>updateRecord(selected.id,{status:st})}>{getRecord(selected.id).status===st&&<Check size={14}/>} {statusNames[st]}</button>)}</div><label className="detail-label">GitHub 저장소 URL<input type="url" placeholder="https://github.com/username/repository" value={getRecord(selected.id).repo} onChange={e=>updateRecord(selected.id,{repo:e.target.value})}/></label><label className="detail-label">배포 사이트 URL<input type="url" placeholder="https://example.vercel.app" value={getRecord(selected.id).demo} onChange={e=>updateRecord(selected.id,{demo:e.target.value})}/></label><label className="detail-label">메모<textarea rows={3} placeholder="다음 작업이나 참고할 내용을 적어두세요." value={getRecord(selected.id).memo} onChange={e=>updateRecord(selected.id,{memo:e.target.value})}/></label><p className="storage-note">저장 내용은 현재 브라우저에만 보관됩니다. 공유하거나 다른 기기에서 동기화하려면 백엔드가 필요합니다.</p><div className="modal-actions">{getRecord(selected.id).repo&&<a href={getRecord(selected.id).repo} target="_blank" rel="noopener noreferrer">GitHub <ExternalLink size={15}/></a>}{getRecord(selected.id).demo&&<a href={getRecord(selected.id).demo} target="_blank" rel="noopener noreferrer">사이트 열기 <ExternalLink size={15}/></a>}<button onClick={()=>setSelected(null)}>저장하고 닫기 <Check size={16}/></button></div></div></section></div>}
    {showHelp&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setShowHelp(false)}}><section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-heading"><div className="detail-header"><span>QUICK GUIDE</span><button aria-label="안내 닫기" onClick={()=>setShowHelp(false)}><X size={20}/></button></div><div className="detail-body"><h2 id="help-heading">PROJECT 50 이용 가이드</h2><p>50개 홈페이지의 기획과 제작 현황을 관리하는 스튜디오입니다.</p><ol><li>전체 프로젝트에서 원하는 사이트를 찾습니다.</li><li>카드를 열어 핵심 기능과 개발 난이도를 확인합니다.</li><li>상태·GitHub·배포 주소·메모를 기록합니다.</li><li>CSV 버튼으로 전체 프로젝트 현황을 내려받습니다.</li></ol><p className="storage-note">데모 버전에서는 계정 로그인과 서버 저장이 없으며, 브라우저 데이터를 삭제하면 기록도 사라질 수 있습니다.</p><button className="full-close" onClick={()=>setShowHelp(false)}>확인</button></div></section></div>}
  </div>;
}
function Stat({icon,value,label,text,tone}:{icon:React.ReactNode;value:string;label:string;text:string;tone:string}){return <div className="stat-card"><span className={`stat-icon ${tone}`}>{icon}</span><div><strong>{value}</strong><span>{label}</span><small>{text}</small></div></div>}
