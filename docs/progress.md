# 진행 상황

## 완료
- 2026-11-12 저장소 용도 정함: 다른 프로젝트용 디자인 시안 보관. 디자인 규칙은 스킬에 둔다.
- 2026-11-12 CLAUDE.md, docs/progress.md 생성

- 2026-11-12 디자인 스킬 2종 프로젝트에 설치 (Impeccable, Taste Skill). 사용법: docs/design-skills.md
- 첫 작업: 네셔널지오그래픽 트레일런 대회 참가 신청 사이트 (노션 페이지 참고). 11/15까지 메인 + 대회 설명 페이지 참고 디자인

- 2026-11-13 `/impeccable init` 완료 → `natgeo-trailrun/PRODUCT.md` (하위 폴더에 PRODUCT.md를 두면 Impeccable이 그 폴더를 프로젝트 루트로 인식함)
- 2026-11-13 Impeccable 메인 페이지 시안 완료 → `natgeo-trailrun/impeccable/index.html`. 방향: 고도 프로파일을 1km 기둥으로(노랑·검정·흰색). 디자인 규칙은 `natgeo-trailrun/DESIGN.md`, 방향 기록은 `natgeo-trailrun/.impeccable/surfaces/`. 코스·일정 수치는 전부 임시 값(`impeccable/main.js` 상단)
- 2026-11-13 메인 시안에 스크롤 진행 띠 추가: 첫 화면을 지나면 기둥이 위에 붙고, 내린 만큼 현재 km가 이동 (`impeccable/main.js`의 `runTrail`)
- 2026-11-13 사용자 결정으로 메인 시안 방향 변경: 페이지 전체 다크 배경 + 고도를 매끄러운 노란 선으로(들어올 때 그려짐). 노랑 바탕 + 1km 기둥 버전은 폐기. 이후 글꼴을 LINE Seed Sans KR로, 굵기를 Regular로, 버튼을 테두리만(모서리 8px) 남기게 바꿈. `natgeo-trailrun/DESIGN.md`는 이 상태 기준으로 다시 씀. 이 변경분은 리뷰어 검토 전

## 다음 할 일
- Impeccable로 대회 설명 페이지 시안 (메인과 같은 DESIGN.md 기준)
- Taste Skill로 같은 브리프 메인 페이지 시안 → `natgeo-trailrun/taste/`
- 미검증: 고도선 hover·키보드 이동, 모바일 메뉴 열림, 선 그리기·진행 띠 모션, 버튼 hover (직접 확인 필요)
- 미푸시: 로컬 커밋들 (사용자가 말할 때만 푸시)
- 시안 폴더 구조 확정 (현재 기본값: `{프로젝트명}/`)
