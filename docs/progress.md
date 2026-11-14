# 진행 상황

## 완료
- 2026-11-12 저장소 용도 정함: 다른 프로젝트용 디자인 시안 보관. 디자인 규칙은 스킬에 둔다.
- 2026-11-12 CLAUDE.md, docs/progress.md 생성

- 2026-11-12 디자인 스킬 2종 프로젝트에 설치 (Impeccable, Taste Skill). 사용법: docs/design-skills.md
- 첫 작업: 네셔널지오그래픽 트레일런 대회 참가 신청 사이트 (노션 페이지 참고). 11/15까지 메인 + 대회 설명 페이지 참고 디자인

- 2026-11-13 `/impeccable init` 완료 → `natgeo-trailrun/PRODUCT.md` (하위 폴더에 PRODUCT.md를 두면 Impeccable이 그 폴더를 프로젝트 루트로 인식함)
- 2026-11-13 Impeccable 메인 페이지 시안 완료 → `natgeo-trailrun/01-elevation-line/index.html`. 방향: 고도 프로파일을 1km 기둥으로(노랑·검정·흰색). 디자인 규칙은 `natgeo-trailrun/DESIGN.md`, 방향 기록은 `natgeo-trailrun/.impeccable/surfaces/`. 코스·일정 수치는 전부 임시 값(`01-elevation-line/main.js` 상단)
- 2026-11-13 메인 시안에 스크롤 진행 띠 추가: 첫 화면을 지나면 기둥이 위에 붙고, 내린 만큼 현재 km가 이동 (`01-elevation-line/main.js`의 `runTrail`)
- 2026-11-13 사용자 결정으로 메인 시안 방향 변경: 페이지 전체 다크 배경 + 고도를 매끄러운 노란 선으로(들어올 때 그려짐). 노랑 바탕 + 1km 기둥 버전은 폐기. 이후 글꼴을 LINE Seed Sans KR로, 굵기를 Regular로, 버튼을 테두리만(모서리 8px) 남기게 바꿈. `natgeo-trailrun/DESIGN.md`는 이 상태 기준으로 다시 씀. 이 변경분은 리뷰어 검토 전

- 2026-11-14 Taste Skill 메인 시안 시작. 방향 미리보기 3개를 만듦 → `natgeo-trailrun/02-ridge-photo/directions/` (`a.html` 능선: 사진 전면, `b.html` 타일: 애플식 둥근 타일, `c.html` 프레임: 제목 줄 + 사진 틀 + 표). 첫 화면과 코스 화면만 있는 미리보기이고 스킬 검사(gate)는 아직 안 돌림. 사용자 선택 대기 중
  - 사진은 전부 Wikimedia Commons에서 찾은 임시 사진(`02-ridge-photo/assets/img/`, 출처는 `credits.json`). 실제 대회 사진으로 교체 대상
  - 글꼴은 Impeccable 시안의 LINE Seed Sans KR을 그대로 씀. 출발 시각·제한 시간은 Impeccable 시안의 임시 값
  - Taste Skill 스크립트는 Node 22가 필요함. Node가 없는 PC에서는 설치하거나 휴대용 Node를 받아 PATH에 넣어야 함

- 2026-11-14 타 대회 사이트 조사(UTMB 몽블랑, 트랜스제주, 서울100K, 코리아50K, TNF100 코리아, 웨스턴 스테이츠, 브로큰 애로, 골든 트레일 시리즈). 결과 문서: `docs/trailrun-site-research.md`. 핵심 결론: 접수 상태(예정·접수 중·마감)에 따라 메인의 주 버튼이 바뀌어야 하고, 코스 수치·필수 장비·컷오프는 이미지가 아닌 글자로 넣고, 연도별 기록·사진 보관함을 처음부터 둔다. 접수·결제와 기록 조회는 조사한 국내 대회 모두 외부 서비스로 연결함

- 2026-11-14 사용자가 A(능선) 방향 선택. Taste Skill 키트 위에 세 페이지 작성 → `natgeo-trailrun/02-ridge-photo/` (`index.html` 메인, `info.html` 대회 안내, `register.html` 참가 신청, 공통 스타일 `site.css`)
  - 메인: 사진 히어로 → 코스 세 가지(스크롤하면 사진이 넘어감) → 일정 → 주최 소개 → 신청 3단계 → 닫는 화면. 1440에서 8화면
  - 참가 신청: 코스 선택·참가자 정보·동의와 결제를 한 화면에. 휴대전화에서는 선택한 코스와 결제 버튼이 아래에 붙음. 실제 결제·전송은 연결 안 됨
  - 메인은 스킬 최종 검사 `GATE: PASS` (예외 2건: 제목 32자 가정 시험, 사유는 `02-ridge-photo/.taste-skill/waivers.json`). 안내·신청 페이지는 gate 대상이 아니고 빠른 검사만 돌림. 신청 페이지는 "한 화면에 한 섹션" 규칙을 일부러 따르지 않음
  - 스킬 규칙과 다르게 간 것(사용자 요청): 다크 페이지, 글꼴 LINE Seed Sans KR, 푸터의 "시안" 안내 문구
  - `02-ridge-photo/shots/`와 `.taste-skill`의 검사 산출물은 `02-ridge-photo/.gitignore`로 제외

- 2026-11-14 Taste 시안 보는 법: 파일을 더블클릭(file://)하면 브라우저가 모듈 스크립트를 막아 모션·메뉴·하단 버튼이 동작하지 않는다. `natgeo-trailrun/02-ridge-photo/`에서 `python3 -m http.server 5510` 실행 후 `http://127.0.0.1:5510/`로 본다(VSCode Live Server도 됨). file://로 열어도 글자가 늦게 뜨거나 섹션이 겹치지 않게는 고쳐 둠

- 2026-11-14 Taste 시안 모바일 수정: 휴대전화(639px 이하)에서 섹션을 화면 높이에 맞추지 않고 내용만큼만 잡게 함(`site.css` 끝부분, 스킬의 "한 화면에 한 섹션" 규칙을 사용자 요청으로 휴대전화에서만 풂). file://로 열어도 햄버거 메뉴와 하단 신청 버튼이 동작하도록 `02-ridge-photo/site.js` 추가. 390 폭에서 메뉴 버튼을 실제로 눌러 세 페이지 모두 열리는 것 확인

- 2026-11-14 사용자 요청으로 Taste 시안의 모바일 하단 고정 버튼 제거(메인·안내의 "참가 신청하기" 막대, 신청 페이지의 결제 막대). 신청 페이지는 맨 아래 신청 내용 카드의 "결제하기" 버튼으로 제출

- 2026-11-14 사용자 요청으로 신청 버튼 위치 정리(메인·안내): PC는 상단 메뉴의 "참가 신청하기"만 두고 히어로 안 버튼 제거. 휴대전화는 헤더와 히어로의 버튼을 없애고 화면 아래에 항상 떠 있는 테두리형 버튼(`.floatbar`, `site.css`)으로. 키트의 `.actionbar`는 첫 화면에서 숨는 동작 때문에 쓰지 않음

- 2026-11-14 시안 폴더 이름을 스킬 이름에서 시안 특징으로 바꿈: `natgeo-trailrun/impeccable/` → `01-elevation-line/`, `natgeo-trailrun/taste/` → `02-ridge-photo/`. 앞으로 시안 폴더는 `{프로젝트명}/{번호}-{시안 특징}/`으로 만든다. `PRODUCT.md`, `DESIGN.md`, `.impeccable/`은 `natgeo-trailrun/` 바로 아래에 그대로 둠(Impeccable이 이 위치를 프로젝트 루트로 인식). `DESIGN.md`는 01 시안 기준 문서

## 다음 할 일
- Taste 시안 미검증: 실제 휴대전화에서의 터치·키보드 입력, 메뉴 열림, hover·스크롤 모션, 태블릿 폭(768·820), 신청 폼 오류 표시 동작
- Taste 시안에 접수 상태(예정·접수 중·마감)별 주 버튼 반영 여부 결정 (타 대회 조사 결론)
- Impeccable로 대회 설명 페이지 시안 (메인과 같은 DESIGN.md 기준)
- 미검증: 고도선 hover·키보드 이동, 모바일 메뉴 열림, 선 그리기·진행 띠 모션, 버튼 hover (직접 확인 필요)
- 미푸시: 로컬 커밋들 (사용자가 말할 때만 푸시)
