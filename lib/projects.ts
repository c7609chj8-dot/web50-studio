export type Status = "planned" | "building" | "review" | "done";
export type CategoryId = "education" | "safety" | "ai" | "local" | "commerce" | "finance" | "travel" | "wellness" | "media" | "platform";
export type Project = { id: number; name: string; slug: string; category: CategoryId; description: string; features: string[]; difficulty: "쉬움" | "보통" | "어려움" | "매우 어려움"; type: "소개형" | "예약·관리형" | "AI·서비스형" | "플랫폼형"; accent: string; icon: string; recommended?: boolean };
export const categories: { id: CategoryId; name: string; en: string; color: string; icon: string }[] = [
  {id:"education",name:"교육·학습",en:"Education",color:"#517BEA",icon:"GraduationCap"},
  {id:"safety",name:"안전·산업",en:"Safety",color:"#F29850",icon:"ShieldCheck"},
  {id:"ai",name:"AI·자동화",en:"AI & Automation",color:"#9D77E8",icon:"BrainCircuit"},
  {id:"local",name:"지역사업",en:"Local Business",color:"#E77BA8",icon:"Store"},
  {id:"commerce",name:"쇼핑·판매",en:"Commerce",color:"#D8A449",icon:"ShoppingBag"},
  {id:"finance",name:"금융·데이터",en:"Finance",color:"#58B8A6",icon:"ChartNoAxesCombined"},
  {id:"travel",name:"여행·여가",en:"Travel & Leisure",color:"#5B9CD5",icon:"Plane"},
  {id:"wellness",name:"건강·생활",en:"Lifestyle",color:"#80B76D",icon:"HeartPulse"},
  {id:"media",name:"브랜드·미디어",en:"Brand & Media",color:"#D282BD",icon:"Palette"},
  {id:"platform",name:"플랫폼",en:"Platforms",color:"#73849F",icon:"Layers3"},
];
const raw: [CategoryId,string,string,string,string,string][] = [
  ["education","AI 융합대학","ai-university","AI 기반 미래교육 과정과 수강신청을 통합한 교육 포털","과정 소개, 수강신청, 학사 안내","보통"],
  ["education","현주에듀랩","hyunju-edulab","교육 전문 브랜드의 강의 및 활동 포트폴리오","강사 소개, 강의 포트폴리오, 문의","보통"],
  ["education","온라인 강의 아카데미","online-academy","동영상 수업과 학습 진행률을 확인하는 플랫폼","강의 목록, 학습 진도, 수강생 계정","어려움"],
  ["education","어린이 체험교육센터","kids-experience","아이들이 즐겁게 참여하는 체험학습 프로그램","프로그램 소개, 일정, 체험 예약","보통"],
  ["education","시니어 디지털 배움터","senior-digital","시니어를 위한 쉽고 편안한 디지털 학습 서비스","큰 글씨 UI, 과정 안내, 신청","쉬움"],
  ["safety","건설안전교육센터","construction-safety","현장 근로자를 위한 건설안전교육 예약 사이트","교육일정, 예약, 출석관리","보통"],
  ["safety","산업안전 전문교육원","industrial-safety","기업과 산업현장을 위한 맞춤형 안전교육 기관","교육과정, 기업 견적, 교육 문의","보통"],
  ["safety","재난안전 체험관","disaster-experience","체험 중심으로 안전 행동을 배우는 공간","VR 체험 안내, 프로그램 예약","보통"],
  ["safety","건설현장 안전점검","site-safety-check","현장에서 바로 쓰는 안전점검과 보고서 서비스","점검표, 사진 첨부, 점검 보고서","어려움"],
  ["safety","안전교육 퀴즈 플랫폼","safety-quiz","누구나 쉽게 참여하는 체험형 안전 퀴즈","OX 퀴즈, 객관식, 결과 분석","보통"],
  ["ai","AI TEAM OFFICE","ai-team-office","가상 AI 조직으로 일을 지시하고 검수하는 워크스페이스","가상 팀장, 업무 배정, AI 직원","매우 어려움"],
  ["ai","AI 강의교안 제작소","ai-lesson-studio","교육대상과 시간을 입력하면 교안을 설계하는 AI 도구","교안 설계, PPT 생성 연동, 검수","어려움"],
  ["ai","AI 홈페이지 제작소","ai-website-builder","템플릿을 선택해 웹사이트 초안을 제작하는 서비스","템플릿, 사이트 생성, 미리보기","매우 어려움"],
  ["ai","AI 업무자동화 허브","automation-hub","반복되는 업무를 하나의 흐름으로 정리하는 도구","자동화 작업, 실행 기록, 알림","어려움"],
  ["ai","AI 문서작성 스튜디오","ai-document-studio","업무용 문서와 양식 초안을 만드는 스튜디오","문서 초안, 서식, 파일 내보내기","어려움"],
  ["local","프리미엄 카페","premium-cafe","감성적인 사진과 메뉴로 공간을 소개하는 카페 사이트","메뉴, 사진 갤러리, 오시는 길","쉬움"],
  ["local","음식점 예약 사이트","restaurant-booking","메뉴 소개부터 테이블 예약까지 연결되는 사이트","메뉴, 예약, 매장 안내","보통"],
  ["local","미용실·뷰티숍","beauty-salon","디자이너와 시술 프로그램을 예약하는 뷰티 사이트","시술 안내, 디자이너, 예약","보통"],
  ["local","자동차 정비센터","auto-service","자동차 정비 서비스의 신뢰도를 높이는 홈페이지","정비 예약, 정비 항목, 문의","보통"],
  ["local","인테리어 시공업체","interior-studio","시공 성과와 견적 상담을 강조한 인테리어 사이트","시공 사례, 사진, 견적 상담","쉬움"],
  ["commerce","교육자료 디지털마켓","education-market","강사와 교사를 위한 수업자료 판매 사이트","디지털 상품, 구매, 다운로드","어려움"],
  ["commerce","프리미엄 생활용품몰","lifestyle-store","깔끔한 상품 탐색과 구매 경험을 제공하는 쇼핑몰","상품 목록, 장바구니, 주문","어려움"],
  ["commerce","지역 농산물 직거래몰","local-farm-market","산지 생산자와 고객을 연결하는 직거래몰","생산자 소개, 상품, 주문","어려움"],
  ["commerce","중고제품 거래 플랫폼","secondhand-market","사용자끼리 물건을 판매하고 문의하는 거래 플랫폼","상품 등록, 검색, 문의","매우 어려움"],
  ["commerce","주문제작 굿즈몰","custom-goods","내 취향대로 디자인하는 맞춤형 굿즈 쇼핑몰","상품 옵션, 제작 요청, 주문","어려움"],
  ["finance","AI 주식매매일지","stock-trading-journal","투자 기록을 시각적으로 분석하는 매매일지","매매 기록, 손익 분석, 차트","어려움"],
  ["finance","ETF 포트폴리오 분석기","etf-portfolio","ETF 자산배분 비중을 한눈에 보는 분석 도구","종목 구성, 자산배분, 비중 비교","어려움"],
  ["finance","개인 자산관리 대시보드","personal-finance","내 자산과 지출을 하나의 화면에서 관리","자산 현황, 지출 내역, 목표","어려움"],
  ["finance","사업 수익성 분석기","business-profit","사업 운영에 필요한 비용과 이익을 계산하는 도구","매출, 비용, 순이익 분석","보통"],
  ["finance","경제지표 모니터","economic-monitor","경제 흐름에 필요한 주요 지표를 모아보는 대시보드","금리, 환율, 경제지표 차트","어려움"],
  ["travel","국내여행 큐레이션","korea-travel","계절과 취향에 맞는 국내 여행지를 소개","여행지 추천, 여행 코스, 검색","쉬움"],
  ["travel","펜션·숙박예약","stay-booking","객실과 요금을 쉽게 비교하는 숙박예약 사이트","객실 소개, 요금, 예약","보통"],
  ["travel","골프 동호회","golf-community","함께 라운딩을 계획하는 골프 커뮤니티","라운딩 일정, 참가 신청, 모임","보통"],
  ["travel","캠핑장 예약 사이트","camping-booking","캠핑 시설과 구역을 선택해 예약하는 사이트","사이트 안내, 시설, 구역 예약","보통"],
  ["travel","지역 관광 가이드","local-tour-guide","지역의 매력적인 여행 콘텐츠를 소개","명소 안내, 지도, 축제 정보","쉬움"],
  ["wellness","건강검진 예약안내","health-checkup","검진 과정과 예약 정보를 보기 쉽게 정리","검진 과정, 문의, 예약 안내","보통"],
  ["wellness","피트니스 트레이닝","fitness-studio","목표와 수준에 맞춘 운동수업 예약 서비스","프로그램, 수업 예약, 운동 기록","보통"],
  ["wellness","반려동물 케어센터","pet-care","사랑하는 반려동물을 위한 관리 및 돌봄 사이트","미용, 돌봄 프로그램, 예약","보통"],
  ["wellness","실버케어 정보센터","senior-care","어르신 돌봄 서비스와 상담을 안내하는 정보센터","서비스 안내, 상담, 시설 소개","쉬움"],
  ["wellness","식단·생활습관 관리","meal-wellness","생활습관을 기록하고 목표를 관리하는 웹앱","식단 기록, 목표, 변화 분석","어려움"],
  ["media","강사 개인 브랜딩","instructor-portfolio","전문성과 경험을 인상적으로 소개하는 개인 사이트","이력, 강의 실적, 문의","쉬움"],
  ["media","디자이너 포트폴리오","designer-portfolio","프로젝트를 중심으로 보여주는 디자이너 웹사이트","작업물, 이미지 갤러리, 소개","쉬움"],
  ["media","AI 기술 블로그","ai-tech-blog","AI 활용법과 개발 노하우를 공유하는 블로그","글 목록, 검색, 카테고리","쉬움"],
  ["media","온라인 매거진","online-magazine","읽기 좋은 에디토리얼 디자인의 웹 매거진","기사, 기획 콘텐츠, 검색","보통"],
  ["media","유튜브 크리에이터 허브","creator-hub","영상과 팬을 연결하는 크리에이터 사이트","영상 목록, 자료, 소식","쉬움"],
  ["platform","전문가 강사 매칭","instructor-marketplace","교육기관과 전문가 강사를 연결하는 플랫폼","강사 검색, 프로필, 견적 문의","매우 어려움"],
  ["platform","지역생활 커뮤니티","local-community","지역 주민이 소통하는 생활정보 플랫폼","회원, 게시판, 알림","매우 어려움"],
  ["platform","행사·세미나 플랫폼","event-seminar","세미나와 이벤트 신청을 관리하는 플랫폼","행사 등록, 참가 신청, 관리","어려움"],
  ["platform","온라인 학습관리시스템","learning-management","온라인 교육을 운영하는 통합 LMS","수업, 과제, 평가, 진도","매우 어려움"],
  ["platform","50개 홈페이지 쇼케이스","website-showcase","50개 홈페이지 프로젝트를 선보이는 포트폴리오","작품 목록, 분야 검색, 데모, 문의","보통"],
];
const kinds: Project["type"][] = ["소개형","예약·관리형","AI·서비스형","플랫폼형"];
const priority = new Set([1,2,6,12,13,16,20,21,26,41]);
export const projects: Project[] = raw.map((x,i)=>{
  const id=i+1;
  const type = id===50||[24,46,47,48,49].includes(id)?kinds[3]:[11,12,13,14,15,26,27,28,29,30].includes(id)?kinds[2]:[1,3,4,6,7,8,9,10,17,18,19,21,22,23,25,32,33,34,36,37,38].includes(id)?kinds[1]:kinds[0];
  const category=categories.find(c=>c.id===x[0])!;
  return {id,name:x[1],slug:x[2],category:x[0],description:x[3],features:x[4].split(", "),difficulty:x[5] as Project["difficulty"],type,accent:category.color,icon:category.icon,recommended:priority.has(id)};
});
export const statusNames: Record<Status,string> = {planned:"기획",building:"개발 중",review:"검수 중",done:"완료"};
export const stages = [
 {title:"기반 구축",range:"1–2개월",count:8,desc:"브랜드·소개형 홈페이지와 공통 UI 시스템"},
 {title:"기능 확장",range:"3–4개월",count:10,desc:"예약, 검색, 교육 관련 기능 구현"},
 {title:"데이터 연결",range:"5–6개월",count:10,desc:"회원 관리, 데이터베이스, 대시보드"},
 {title:"서비스 고도화",range:"7–9개월",count:12,desc:"AI 도구, 쇼핑몰, 외부 데이터 연결"},
 {title:"출시 및 쇼케이스",range:"10–12개월",count:10,desc:"플랫폼 완성, 테스트, 포트폴리오 공개"},
];
