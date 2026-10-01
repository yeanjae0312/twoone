# 초고령층 웹 템플릿

70대 이상 이용자를 위한 공공 민원 포털 퍼블리싱 템플릿.
정적 HTML + CSS + vanilla JS라 JSP, Thymeleaf, React, Vue 어디서든 그대로 옮겨 쓸 수 있다.

같은 내용을 네 가지 디자인으로 만들어 두었다. 고를 수 있게 하려는 것이므로 하나를 정하고 나머지는 지워도 된다.

| 파일 | 이름 | KRDS | 성격 |
|---|---|---|---|
| `pages/main.html` | 표준 포털형 | 준수 | 검색을 맨 위에 두고 카드 그리드로 훑게 한다. 가장 무난하고 심사에 안전하다. |
| `pages/main-b.html` | 큰글씨 안내형 | 준수 | 순서(3단계)를 먼저 보여 주고 세로 대형 블록을 따라가게 한다. 검색은 맨 아래 보조. |
| `pages/main-c.html` | 자립형 | 미준수 | 따뜻한 미색과 갈색. 비대칭 배치에 편집물 같은 짜임. |
| `pages/main-d.html` | 몰입형 | 미준수 | 애플 사이트 짜임. 구획마다 한 문장을 아주 크게. 흑·백·회색에 파랑 하나. |

넷 다 고령층 규격(20px, 48px, 4.5:1, 3px 포커스)과 모바일 대응은 동일하게 지킨다.

**다른 프로젝트에 옮겨 붙이려면 [MIGRATION.md](MIGRATION.md)를 본다.** 복사할 파일, 배치, 주의점, 증상별 원인이 거기에 있다.

## 구성

```
vendor/krds/        KRDS 1.1.0 원본 (수정 금지, VERSION 파일 참고)
  css/token/krds_tokens.css    디자인 토큰
  css/component/output.css     공통 + 컴포넌트 통합 CSS (이미지 상대경로)
  js/krds.js                   KRDS 컴포넌트 동작
  fonts/, img/
css/senior.css      A·B 공용 고령층 오버라이드 (snr-* 블록)
css/main-b.css      B 전용 블록 (snb-* 블록)
css/standalone.css  C 전용. KRDS를 쓰지 않는 자립형 전체 CSS
css/immersive.css   D 전용. KRDS를 쓰지 않는 자립형 전체 CSS
js/senior.js        A·B 공용. 화면크기·고대비 저장/복원, 메뉴 보조
js/standalone.js    C 전용. 글자크기·고대비·전체메뉴
js/immersive.js     D 전용. 글자크기·고대비·전체메뉴
pages/              완성 페이지 템플릿 4종
checks/             검증 스크립트
```

C와 D는 각자 CSS 한 장 + JS 한 장만 쓴다. `vendor/krds/`에서 가져오는 것은 글꼴 파일과 파비콘뿐이고, 그것도 경로만 바꾸면 떼어낼 수 있다.

## 고령층 규격

| 항목 | 값 |
|---|---|
| 본문 글자 | 최소 20px (KRDS 기본 17px 토큰 덮어쓰기) |
| 명도 대비 | 4.5:1 이상, KRDS 색상 토큰만 사용 |
| 터치·클릭 영역 | 48px 이상 |
| 포커스 | 3px 실선 + 2px 여백 |
| 화면크기 | 보통 / 크게(125%) / 가장 크게(150%), 새로고침 후에도 유지 |
| 고대비 | 헤더 버튼으로 켜고 끔, 새로고침 후에도 유지 |
| 모바일 | 360px 기준, 150% 확대 상태에서도 가로 넘침 없음 |

## 모바일 (767px 이하)

모바일을 주 사용 환경으로 본다. 767px 이하에서는 다음이 달라진다.

- 하단 고정 바 `.snr-bottom-bar`가 나타난다. 민원신청, 처리조회, 전화, 전체메뉴 4개. 한 손 도달 범위에 주요 동작을 둔다.
- 헤더 우측은 로그인만 남긴다. 검색은 본문 대형 검색창이, 전체메뉴는 하단 바가 맡는다.
- 화면크기·고대비 버튼은 KRDS가 헤더 유틸을 숨기므로 전체메뉴 상단(`.gnb-utils`)에 같은 버튼을 둔다. 두 곳의 버튼은 senior.js가 함께 동기화한다.
- 본문 하단에 고정 바 높이만큼 여백을 준다. 아이폰 하단 안전영역(`safe-area-inset-bottom`)을 포함한다.

모바일 메뉴 `#mobile-nav`는 반드시 `<header>` 직속, `.header-in` 바깥에 둔다. `.header-in`에는 KRDS가 `transform`을 걸어 두어서 그 안에 넣으면 `position: fixed`가 뷰포트가 아닌 헤더 기준이 되어 메뉴가 헤더 높이만큼만 열린다.
메뉴가 열리면 KRDS가 `body`에 `is-gnb-mobile`을 붙이고, 그동안 하단 바는 숨긴다. 메뉴는 `#krds-header` 스택 안에 있어 z-index로는 위아래를 정리할 수 없다.

메뉴를 닫는 길은 세 가지다. 오른쪽 위 "닫기"(글자 포함, `#close-nav`), 메뉴 맨 아래 전체 폭 "메뉴 닫기"(`data-snr-close-menu`), 바깥 어두운 영역 터치. KRDS는 `#close-nav`에만 닫기를 바인딩하므로 나머지 둘은 senior.js가 그 버튼을 대신 누른다.

하단 바의 전체메뉴 버튼은 `data-snr-open-menu` 속성만 있으면 된다. KRDS는 `[aria-controls="mobile-nav"]` 첫 요소(헤더 버튼)에만 열기 동작을 붙이므로 senior.js가 그 버튼을 대신 눌러 준다.

QA용 URL 파라미터: `?snr-mode=high-contrast`, `?snr-scale=lg|xlg`. 저장값보다 우선 적용되고 저장도 갱신한다.

### B(큰글씨 안내형)에서 더한 것

KRDS 단계 표시는 좁은 화면에서 단계 이름을 숨기고 점만 남긴다. 이 템플릿은 단계 안내가 핵심이라
`main-b.css`가 모바일에서 점 대신 이름을 세로로 되살린다.

## C·D(자립형 둘)는 어떻게 다른가

KRDS CSS·JS를 전혀 불러오지 않는다. 그래서 KRDS 규칙을 우회할 필요 없이 처음부터 고령층 기준으로 짤 수 있었다.
아래 내용은 C와 D에 모두 해당한다. 둘은 저장 열쇠와 URL 파라미터까지 같아서 서로 바꿔 끼워도 설정이 이어진다.

- **확대 방식이 다르다.** KRDS판은 `body`에 `zoom`을 걸어 화면 전체를 배로 키운다. 자립형은 루트 글꼴 크기(20 / 25 / 30px)를 바꾼다.
  글자만 커지고 레이아웃은 다시 배치되므로 가로 스크롤이 생기지 않는다.
- **글자크기가 드롭다운이 아니다.** 항상 보이는 버튼 세 개다. 한 번에 고를 수 있다. 좁은 화면에서는 크기가 다른 `가` 세 개로 줄이고, 읽어 주는 내용은 `aria-label`로 남긴다.
- **아이콘이 이미지가 아니다.** 인라인 SVG 한 벌을 문서 안에 두고 `<use>`로 꺼내 쓴다. 파일 요청이 없고 색은 글자색을 따라간다.
- **고대비를 CSS 변수로 갈아 끼운다.** `<html data-contrast="on">` 하나에 토큰 값만 바뀐다. 선택자를 따로 쓰지 않아 규칙이 늘지 않는다.
- **좁은 화면에서 머리말을 고정하지 않는다.** 늘 보여야 하는 기능은 하단 고정 바가 맡는다.

상태 속성은 `data-text-size`(`lg`/`xlg`)와 `data-contrast`(`on`)이고 둘 다 `<html>`에만 붙는다.
QA용 URL 파라미터는 `?ui-size=lg|xlg`, `?ui-contrast=on`.

자립형 스크립트는 `<head>`에서 `defer` 없이 불러야 한다. 첫 화면이 그려지기 전에 저장된 설정을 적용해야 깜빡이지 않는다.

한글 낱말은 `word-break: keep-all`로 붙여 두었다. 대신 격자·가로배치 칸에는 `min-width: 0`을 줘야 한다.
이게 없으면 글자를 키웠을 때 칸이 낱말 최소 너비에 밀려 화면보다 넓어진다.

### D(몰입형)만의 것

- **구획마다 배경색이 바뀐다.** 흰색, 연회색, 검정을 번갈아 두어 경계를 만든다.
  검은 구획 안에는 `on-dark`를 붙인다. 그 안의 단추·링크·포커스 테두리 색이 바뀐다.
- **제목이 아주 크다.** 첫 화면 제목은 기본 크기에서 80px이다.
  좁은 화면에서는 제목에만 `min(<rem>, <vw>)`로 상한을 뒀다. 기본 크기에는 영향이 없고 글자를 키웠을 때만 걸린다.
  이게 없으면 '도와드릴까요.' 같은 긴 낱말이 칸을 넘어 마침표만 다음 줄로 떨어진다.
- **떠오르는 움직임은 CSS만으로 한다.** `animation-timeline: view()`를 쓴다.
  크롬·엣지에서는 구획이 올라올 때 살짝 떠오르고, 사파리·파이어폭스에서는 규칙이 통째로 무시되어 그냥 보인다.
  스크립트로 미리 감추지 않는 것이 핵심이다. 감췄다가 되살리는 방식은 어쩌다 되살리지 못하면 내용이 영영 안 보인다.
- **길잡이 띠에 뒤가 비치는 효과가 있다.** 그래서 전체메뉴를 그 안에 넣으면 화면 전체를 덮지 못한다. 반드시 바깥에 둔다.

## 페이지 붙이는 법

`<head>`에 CSS 3개를 이 순서로, `</body>` 직전에 JS 2개를 이 순서로 넣는다. 순서를 바꾸면 오버라이드와 저장값 복원이 깨진다.

```html
<link rel="stylesheet" href="/static/krds/css/token/krds_tokens.css">
<link rel="stylesheet" href="/static/krds/css/component/output.css">
<link rel="stylesheet" href="/static/css/senior.css">
...
<script src="/static/krds/js/krds.js"></script>
<script src="/static/js/senior.js"></script>
```

B는 여기에 `css/main-b.css`를 `senior.css` 다음에 한 줄 더 넣는다.

C와 D는 이 대신 두 줄이면 끝난다. 스크립트는 `<head>`에 두고 `defer`를 붙이지 않는다.

```html
<!-- C(자립형) -->
<link rel="stylesheet" href="/static/css/standalone.css">
<script src="/static/js/standalone.js"></script>

<!-- D(몰입형) -->
<link rel="stylesheet" href="/static/css/immersive.css">
<script src="/static/js/immersive.js"></script>
```

경로만 서버 정적 경로로 바꾼다. `output.css`는 `../../img/`로 이미지를 찾으므로 `vendor/krds` 폴더 구조를 유지한 채 통째로 옮긴다.
`senior.css`, `standalone.css`, `immersive.css`는 `../vendor/krds/fonts/`로 폰트를 찾으므로 `css/`와 `vendor/`가 같은 부모 아래에 있어야 한다. 구조를 바꾸면 각 파일 상단 `@font-face` 경로만 고친다.

### JSP / Thymeleaf
`pages/main.html`의 `<body>` 내용을 그대로 붙이고 `href="#"`와 텍스트를 서버 값으로 바꾼다. 헤더·푸터는 include 조각으로 잘라 쓴다.

### React / Vue
마크업을 JSX/SFC로 옮길 때 `class` → `className`(React), `for` → `htmlFor`(React)만 바꾼다.
`krds.js`와 `senior.js`는 `index.html`에서 전역 스크립트로 로드한다. 두 스크립트는 `DOMContentLoaded`에 초기화하므로 SPA 라우팅으로 헤더가 다시 마운트되면 `krds_dropEvent.init()`, `krds_mainMenuPC.init()` 등을 다시 호출한다.

### 서버 렌더링에서 고대비 미리 적용
`senior.js`는 `localStorage`에 `snr-mode=high-contrast`를 저장한다. 첫 화면 깜빡임까지 없애려면 쿠키에도 같은 값을 저장하고 서버에서 `<html data-krds-mode="high-contrast">`를 찍어 주면 된다.

## 규약

- 커스텀 클래스 접두어는 A·B 공용이 `snr-`, B 전용이 `snb-`다. KRDS 클래스와 충돌하지 않는다. C와 D는 자립형이라 충돌 대상이 없어 접두어를 쓰지 않는다.
- `vendor/krds/` 파일은 고치지 않는다. 바꿀 것은 전부 `senior.css`나 `main-b.css`에서 덮어쓴다.
- 고대비 속성은 `<html>`에만 둔다. A·B는 `data-krds-mode`, C·D는 `data-contrast`.
- A·B의 화면크기 메뉴 각 항목에는 빈 `<span class="sr-only"></span>`가 있어야 한다. KRDS 스크립트가 이 요소에 "선택됨"을 써넣는다.
- A·B의 `senior.js`는 `window`의 `DOMContentLoaded`에 붙인다. `document`에 붙이면 KRDS보다 먼저 실행되어 저장값 복원이 깨진다.

## 검증

```
node checks/check.mjs
```

검사하는 것은 네 가지다.

1. 페이지와 CSS가 가리키는 로컬 파일이 실제로 있는지
2. 필수 접근성 마크업(`lang`, `h1`, 건너뛰기 링크)이 있는지
3. 자립형 페이지가 KRDS CSS·JS를 몰래 끌어오지 않는지
4. vendor CSS에 외부 절대 URL이 남지 않았는지

Edge 또는 Chrome이 있으면 페이지마다 스크린샷 5장을 `checks/out/`에 만든다.
1280px 기본·고대비, 360px 기본·150% 확대·고대비. 페이지 4종이므로 모두 20장이고 3~4분 걸린다.
모바일 스크린샷 상단에는 가로 넘침 측정 결과(`OK` 또는 `OVERFLOW`)가 찍힌다.
헤드리스 창 최소 폭이 약 492px이라 모바일은 iframe 래퍼로 감싸서 찍는다.
확대·고대비는 URL 파라미터로 켠다. 템플릿마다 이름이 다르므로 스크립트가 페이지를 보고 골라 쓴다.

## KRDS 업데이트

```
npm pack krds-uiux@<버전>
```

압축을 풀어 `resources/css`, `resources/fonts`, `resources/img`, `resources/js/component/ui-script.js`(→ `js/krds.js`)를 `vendor/krds/`에 덮어쓰고 `VERSION`을 갱신한다. `css/plugin`(swiper)과 `css/common`, `css/component/component.css`는 `output.css`에 포함되어 있어 복사하지 않는다.
