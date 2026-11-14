# 디자인 스킬 사용법

이 저장소에는 디자인 스킬 두 개가 `.claude/skills/`에 들어 있다. pull 받고 이 폴더에서 Claude Code를 열면 바로 쓸 수 있다.

| | Impeccable | Taste Skill |
|---|---|---|
| 버전 | 4.8.2 (엔진 0.1.21) | 2.5.1 |
| 부르는 법 | `/impeccable` | `/design-taste-frontend` |
| 잘하는 것 | 화면 전반. 랜딩부터 폼, 대시보드, 관리자 화면까지 | 회사·브랜드 랜딩 페이지 |
| 프로젝트 맥락 | `PRODUCT.md`, `DESIGN.md`에 저장하고 계속 재사용 | 페이지마다 브리프를 새로 읽음 |
| 검사 | 파일을 고칠 때마다 디자인 검사 훅 실행 (아래 주의 참고) | 끝낼 때 실제 브라우저로 검사 (gate) |
| 필요한 것 | 없음 (실행 파일 포함) | Node 22 이상, Chrome·Edge·Chromium |

## Impeccable

### 처음 한 번
```
/impeccable init
```
타겟 사용자, 브랜드 톤, 제약사항을 질문하고 답을 `PRODUCT.md`에 저장한다. 이후 모든 작업은 이 파일을 기준으로 한다. 이 파일을 커밋하면 다른 PC에서도 같은 기준으로 작업한다.

### 새 화면 만들기
명령 없이 요청하면 된다.
```
/impeccable 트레일런 대회 메인 페이지를 만들어줘. 결과는 natgeo-trailrun/01-elevation-line/ 에.
```
- 먼저 화면 구성부터 잡고 싶으면 `/impeccable shape 메인 페이지`
- 화면 성격(mode)에 따라 접근이 달라진다. 메인·대회 소개는 Persuade(설득), 신청·회원·결제 화면은 Operate(작업 완료)로 다룬다.

### 만든 뒤 다듬기
`/impeccable <명령> <대상>` 형식이다. 대상은 파일 경로.

| 하고 싶은 것 | 명령 |
|---|---|
| 디자인 리뷰 (점수 포함) | `critique` |
| 접근성·성능·반응형 점검 | `audit` |
| 출시 전 마무리 | `polish` |
| 너무 밋밋함 / 너무 요란함 | `bolder` / `quieter` |
| 단순하게 덜어내기 | `distill` |
| 색, 글꼴, 간격 개선 | `colorize`, `typeset`, `layout` |
| 애니메이션 추가 | `animate` |
| 문구, 라벨, 에러 메시지 | `clarify` |
| 모바일 대응 | `adapt` |
| 에러·빈 상태·예외 처리 | `harden` |
| 요소 시안 여러 개 비교 | `generate 3 <요소>` |
| 브라우저에서 요소 골라 반복 수정 | `live` |
| 기존 코드에서 디자인 시스템 문서화 | `document` (`DESIGN.md` 생성) |

뭘 써야 할지 모르면 `/impeccable`만 입력한다. 상황에 맞는 메뉴를 보여 준다.

### 기타
- `/impeccable hooks status|on|off`: 디자인 검사 훅 관리
- `/impeccable doctor`: 설정 파일이 버전과 어긋났는지 점검

## Taste Skill

### 만들기
```
/design-taste-frontend 트레일런 대회 브랜드 사이트 메인 페이지. 결과는 natgeo-trailrun/02-ridge-photo/ 에.
```
스킬이 정해진 순서대로 진행한다.
1. 브리프 읽기: 사업 종류, 무엇을 파는지, 핵심 행동(예: 대회 참가 신청)을 정한다
2. 문구 먼저 작성
3. 화면 단위로 페이지 계획 (한 섹션 = 한 화면)
4. 팔레트·폰트·히어로를 스크립트가 무작위로 고른다 (취향으로 고르지 않음)
5. 정적 HTML로 제작
6. 1440 / 1024 / 768 / 390 폭에서 스크린샷과 검사
7. gate가 `GATE: PASS`가 될 때까지 최대 3회 수정 후 보고

### 알아둘 규칙
- 이미지 아래 캡션을 넣지 않는다. 사진 출처는 푸터 한 줄로 모은다.
- 고객 사진이 없으면 라이선스 있는 대체 사진을 쓰고, 보고서에 대체 사진이라고 표시한다.
- 보라색 계열은 쓰지 않는다.
- 셰이더 효과 같은 화려한 연출은 테크·게임 사이트에만 쓴다. 대회 사이트는 사진 중심이 된다.
- 작업 폴더에 `.taste-skill/`(이력, 검사 결과)과 `shots/`(스크린샷)가 생긴다.

## 두 스킬 비교하는 법
같은 브리프를 두 스킬에 각각 주고, 결과를 시안별 폴더로 나눈다. 폴더 이름은 스킬 이름이 아니라 `{번호}-{시안 특징}`으로 짓는다.
```
natgeo-trailrun/
  01-elevation-line/   고도를 노란 선으로 그린 시안 (Impeccable로 제작)
  02-ridge-photo/      능선 사진 히어로 시안 (Taste Skill로 제작)
```
브리프는 [노션 페이지](https://app.notion.com/p/yeoonzai/4161da7c454080bca016d114c3bfab62)의 요건과 참고 사이트를 그대로 쓴다.

## 주의
- **Windows와 Mac 모두 쓴다.** Impeccable 실행 파일(`scripts/bin/`)은 OS마다 다르기 때문에 커밋하지 않는다(`.gitignore`). 실행 파일이 없으면 Impeccable이 처음 실행될 때 그 OS에 맞는 파일을 GitHub 릴리스에서 받아 체크섬을 확인한 뒤 사용자 캐시에 저장한다.
- **Impeccable 훅은 PC마다 설치한다.** 훅은 `.claude/settings.local.json`에 들어가서 커밋되지 않는다. 새 PC에서 pull 받은 뒤 `npx impeccable install --project --providers=claude -y`를 한 번 실행한다. 훅이 없어도 스킬 자체는 동작한다.
- **업데이트:** Impeccable은 `npx impeccable update`. Taste Skill은 [GitHub](https://github.com/Leonxlnx/taste-skill)의 `skills/taste-skill` 폴더를 다시 복사해 `.claude/skills/taste-skill`을 교체한다.
