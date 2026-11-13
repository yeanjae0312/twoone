---
name: 내셔널지오그래픽 트레일런
description: 검정 바탕에 노란 고도선 한 줄로 코스를 보여 주는 대회 사이트
colors:
  y: "#FFC800"
  k: "#0D0D0B"
  w: "#F0EDE3"
  dim: "#B5B09D"
  rule: "#4A4738"
typography:
  display:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(2.5rem, 5.6vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-close:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.012em"
  title:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.012em"
  body:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-lead:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.65
  note:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
  button-lg:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
  label:
    fontFamily: "LINE Seed Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1
  numeral:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "1.22em"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.02em"
  numeral-course:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "0.01em"
  numeral-value:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.01em"
  numeral-data:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  flag:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.03em"
  ruler:
    fontFamily: "Barlow Condensed, LINE Seed Sans KR, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  r: "8px"
spacing:
  g: "clamp(20px, 4.4vw, 64px)"
  col-gap: "clamp(28px, 5vw, 88px)"
  sec-top: "clamp(72px, 11vw, 150px)"
  sec-bottom: "clamp(64px, 9vw, 120px)"
  head-gap: "clamp(28px, 4vw, 52px)"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "0 28px"
    height: "60px"
  button-primary-hover:
    backgroundColor: "{colors.y}"
    textColor: "{colors.k}"
  button-primary-lg:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.r}"
    padding: "0 40px"
    height: "76px"
  picker-segment:
    backgroundColor: "transparent"
    textColor: "{colors.dim}"
    typography: "{typography.numeral-value}"
    padding: "12px 22px 10px"
    height: "48px"
  picker-segment-hover:
    textColor: "{colors.w}"
  picker-segment-pressed:
    textColor: "{colors.y}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  flag:
    backgroundColor: "{colors.k}"
    textColor: "{colors.y}"
    typography: "{typography.flag}"
    rounded: "{rounded.none}"
    padding: "8px 12px 7px"
  ruler:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    typography: "{typography.ruler}"
    height: "40px"
  trail-strip:
    backgroundColor: "{colors.k}"
    height: "56px"
  trail-apply:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    rounded: "{rounded.r}"
    padding: "0 20px"
  trail-apply-hover:
    backgroundColor: "{colors.y}"
    textColor: "{colors.k}"
  nav-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.y}"
    rounded: "{rounded.r}"
    padding: "10px 16px"
---

# Design System: 내셔널지오그래픽 트레일런

## Overview

**Creative North Star: "검정 위의 고도선 한 줄"**

이 시스템은 코스 전체를 선 하나로 보여 준다. 페이지 전체가 검정에 가까운 바탕이고, 그 위에 노란 고도선이 출발에서 결승까지 왼쪽에서 오른쪽으로 그려진다. 방문자는 그 선을 훑어 해발, 경사, 컷오프를 확인하고 코스를 골라 신청한다. 면을 채워서 만드는 것은 없다. 선, 점, 글자만으로 화면이 선다.

분위기는 조용하고 차분하다. 글자는 미색이고 굵기는 Regular이며, 숫자도 가볍다. 노랑은 선, 값으로 읽는 숫자, 주 행동에만 아껴 쓴다. 버튼은 참가 신청 버튼까지 전부 테두리만 있고 모서리가 살짝 둥글다. 사진, 그라데이션, 그림자는 없다.

첫 화면을 지나면 같은 선이 화면 맨 위의 얇은 띠로 붙고, 페이지를 내린 만큼 흰 점이 선을 따라 결승으로 간다. 확정되지 않은 값은 확정된 것처럼 보이지 않게 한다. 임시 수치와 미정 항목에는 테두리 태그를 붙이고 문장으로도 밝힌다.

**Key Characteristics:**
- 페이지 전체가 하나의 어두운 바탕. 구역은 면이 아니라 1px 선으로 나뉜다
- 고도는 매끄러운 노란 선 한 줄(2px). 선 아래를 채우지 않는다
- 미색 글자, Regular 굵기, 가벼운 숫자. 노랑은 선, 값, 주 행동에만
- 테두리만 있는 버튼, 버튼 계열에만 8px 모서리
- 숫자와 영문 토큰은 Barlow Condensed, 한글은 LINE Seed Sans KR
- 7:5 두 단 그리드, 좌우 끝까지 이어지는 고도선
- 흰 점은 언제나 "지금 위치"

## Colors

어두운 바탕 하나, 미색 글자, 노랑 하나. 나머지 둘은 같은 온기의 회색으로 보조 글자와 가는 선을 맡는다.

### Primary
- **고도선 노랑** (`y`, #FFC800): 고도선, 지점 기둥과 점, 눈금자, 값으로 읽는 숫자(조건 수치, 컷오프 시각, 코스 이름, 깃발 글자), 참가 신청 버튼의 테두리와 글자, 강조 링크, 태그 글자, 워드마크, 묶음의 시작과 끝 선, 포커스 링. 바탕 대비 12.5:1. 채움으로는 버튼 hover, 최고점 점, 건너뛰기 링크, 글자 선택 영역에만 나타난다.

### Neutral
- **바탕 검정** (`k`, #0D0D0B): 페이지 전체의 바탕. 진행 띠와 깃발의 바탕도 같은 색이라 면이 하나로 읽힌다. 노랑으로 채워진 버튼 위의 글자색.
- **미색** (`w`, #F0EDE3): 제목과 본문 글자. 고도선 위에서 선택한 지점의 세로선과 점, 진행 띠의 현재 위치 점, 읽기 줄의 값. 바탕 대비 16.6:1. 순백(#FFFFFF)은 쓰지 않는다.
- **보조 글자색** (`dim`, #B5B09D): 설명문, 표 머리글, 임시 안내, 푸터 주석, 눈금 글자, 눌리지 않은 코스 선택 칸. 바탕 대비 8.9:1.
- **눈금 선색** (`rule`, #4A4738): 구역과 행을 나누는 가는 선, 해발 점선, 태그와 깃발의 테두리, 진행 띠에서 아직 가지 않은 구간. 바탕 대비 2.1:1이라 글자에는 쓰지 않는다.
- **조작 테두리색** (`edge`, #6E6A55): 누를 수 있는 것의 테두리(코스 선택 칸의 바깥 테두리와 칸 사이 선). 바탕 대비 3:1 이상이라 조작 요소의 경계로 쓸 수 있다.

### Named Rules
**The One Ground Rule (한 바탕 규칙).** 바탕은 `k` 하나다. 구역마다 바탕색을 바꾸지 않고, 밝은 구역도 없다. 구역은 1px 선과 여백으로만 나눈다.

**The Sparing Yellow Rule (아끼는 노랑 규칙).** 노랑은 선, 값으로 읽는 숫자, 주 행동, 링크에만 쓴다. 제목과 본문 문장은 노랑으로 적지 않는다. 멈춰 있는 화면에서 노랑으로 채운 면은 점 크기를 넘지 않고, 넓은 노랑 채움은 hover 중인 버튼뿐이다.

**The White Dot Rule (흰 점 규칙).** 채워진 미색 점은 "지금 위치"만 뜻한다. 고도선 위의 선택 지점(14px)과 진행 띠의 현재 위치(10px)가 전부다. 다른 장식에 미색 점을 쓰지 않는다.

## Typography

**Display Font:** LINE Seed Sans KR (대체: Apple SD Gothic Neo, Malgun Gothic, sans-serif)
**Body Font:** LINE Seed Sans KR (같은 스택)
**Label/Mono Font:** Barlow Condensed 400, 500 (대체: LINE Seed Sans KR, sans-serif). 숫자와 영문 토큰 전용.

**Character:** 둥글고 부드러운 한글 고딕이 낮은 목소리로 말하고, 좁고 가벼운 영문 숫자체가 값을 적는다. 크기로 위계를 만들고 굵기로는 만들지 않는다.

두 서체 모두 `fonts/` 폴더에서 직접 불러온다(woff2, `font-display: swap`). LINE Seed Sans KR은 Regular와 Bold 두 파일이고, 400~600 구간은 모두 Regular 파일로 그려진다. 본문 전체에 `font-variant-numeric: tabular-nums`와 `word-break: keep-all`이, 제목(h1~h3)에는 `text-wrap: balance`가 걸려 있다.

### Hierarchy
- **Display** (400, clamp(2.5rem, 5.6vw, 5.5rem), 1.1, 자간 -0.02em): 히어로의 대회명. 마무리 구역 제목은 한 단계 작게(clamp(2.25rem, 5.2vw, 5rem), 1.12).
- **Headline** (400, clamp(2rem, 4.2vw, 3.75rem), 1.16, 자간 -0.012em): 구역 제목.
- **Title** (400, 1.5rem, 1.16): 안내 항목 제목.
- **Body** (400, 1.0625rem, 1.65): 본문. 설명문은 폭을 32~38em으로 제한하고 `dim` 색으로 둔다. 히어로 한 줄 문장은 clamp(1.0625rem, 1.3vw, 1.25rem), 최대 34em. 표 머리글과 주석은 0.9375rem.
- **Label** (400, 0.8125rem, 행간 1): 임시/미정 태그.
- **Button** (700, 1.125rem, 큰 버튼 1.5rem): 버튼 글자. 이 시스템에서 Bold 파일을 쓰는 유일한 자리다.
- **Numeral** (Barlow Condensed 500, 주변 글자의 1.22em, 자간 0.02em): 문장과 버튼 안에 끼는 영문 숫자 토큰(50K, CP1). 코스 이름 단독 표기는 clamp(3rem, 5vw, 4.5rem), 행간 0.9. 코스 선택 칸과 읽기 줄의 값은 1.75rem.
- **Numeral Data** (Barlow Condensed 400, 1.625rem, 1.1): 표의 수치. 컷오프 시각 열만 500에 노랑.
- **Ruler** (Barlow Condensed 400, 1rem, 자간 0.04em): 눈금자, 해발 눈금, 기준선 글자(눈금 글자는 0.9375rem). 깃발 글자는 500, 1.0625rem.

### Named Rules
**The Two Voices Rule (두 목소리 규칙).** 값으로 읽는 숫자와 영문 토큰(코스 이름, 체크포인트 이름, 시각, 거리, 해발, 눈금)은 Barlow Condensed로 적는다. 값은 500, 눈금과 표의 수치는 400이다. 한글 문장은 LINE Seed Sans KR로 둔다. 같은 토큰은 어느 구역에서나 같은 글자여야 한다.

**The Quiet Weight Rule (조용한 굵기 규칙).** 제목과 본문은 Regular(400)다. 위계는 크기, 색(`w`와 `dim`), 여백으로 만든다. 굵은 제목이나 대문자 영문 소제목을 섞지 않는다. 대문자는 워드마크와 깃발의 START, FINISH 같은 데이터 표기에만 나온다.

## Layout

- **좌우 여백:** 모든 구역의 좌우 안쪽 여백은 `g`(clamp(20px, 4.4vw, 64px)) 하나다. 최대 폭 컨테이너는 없다.
- **7:5 두 단:** 히어로 상단, 구역 머리, 마무리, 푸터가 모두 `minmax(0, 7fr) minmax(0, 5fr)` 그리드를 쓴다. 왼쪽 7에 제목, 오른쪽 5에 설명이나 행동. 단 사이 간격은 `col-gap`(clamp(28px, 5vw, 88px)). 안내 목록만 4:8이다.
- **고도선은 여백을 무시한다:** 히어로의 고도선, 해발 점선, 눈금자는 좌우 여백 없이 화면 끝에서 끝까지 간다. 히어로는 최소 높이 100svh이고 메뉴와 상단 두 단 아래 남는 높이를 고도선이 차지한다(최소 220px, 깃발 자리로 위쪽 64px).
- **세로 리듬:** 구역 위아래 여백은 `sec-top` / `sec-bottom`. 마무리 구역은 더 크다(clamp(80px, 12vw, 170px) / clamp(72px, 10vw, 140px)). 구역 머리와 내용 사이는 `head-gap`(clamp(28px, 4vw, 52px)).
- **900px 이하:** 두 단 그리드가 모두 한 단으로 접힌다. 히어로는 순서를 바꿔 첫 화면에 선이 들어오게 한다: 제목, 코스 선택, 조건, 신청 버튼, 고도선, 설명문 순. 고도선 높이는 230px로 고정. 메뉴는 "메뉴" 글자 버튼 뒤로 들어간다.
- **560px 이하:** 버튼과 코스 선택이 화면 폭을 채운다. 고도선 높이 210px. 눈금 단위(km)와 깃발의 시각은 숨기고 이름만 남긴다. 표는 해발 열을 숨긴다. 장비 목록은 2단에서 1단으로. 진행 띠는 48px로 낮아지고 km 표시를 숨긴다.
- 고정된 진행 띠 높이만큼 구역에 `scroll-margin-top`(56px, 560px 이하 48px)을 둔다.

## Elevation & Depth

완전히 평면이다. 그림자와 그라데이션, 반투명 겹침이 하나도 없다. 화면 위에 붙는 진행 띠도 그림자 없이 아래쪽 1px `rule` 선으로만 본문과 구분된다. 겹치는 요소(깃발)는 바탕과 같은 `k` 채움과 1px 테두리로 선 위에 놓인다.

`box-shadow`는 한 곳에서만, 흐림 없는 밑줄 대용으로 쓴다.

### Shadow Vocabulary
- **선택 칸 밑줄** (`box-shadow: inset 0 -2px 0 var(--y)`): 눌린 코스 선택 칸의 아래쪽 노랑 2px 선.

### Named Rules
**The Flat Line Rule (평면 규칙).** 오프셋이나 흐림이 있는 그림자, 그라데이션, 반투명 겹침을 쓰지 않는다. 떠 있는 요소는 1px 선으로 구분한다.

## Shapes

형태는 선과 점이다.

- **모서리:** 버튼 계열에만 살짝 둥근 모서리(`r`, 8px)를 준다. 참가 신청 버튼, 진행 띠의 신청 버튼, 코스 선택 묶음, 메뉴 버튼이 해당한다. 태그, 깃발, 표, 눈금자는 직각이다.
- **점:** 지점과 위치는 원으로 찍는다. 체크포인트는 10px 속 빈 점(`k` 채움, 노랑 2px 테), 최고점은 노랑으로 채운 점, 선택 지점은 미색 14px, 진행 띠의 현재 위치는 미색 10px.
- **고도선:** 2px, 끝과 꺾임이 둥글고(`stroke-linecap: round`, `stroke-linejoin: round`), 1km 지점들을 매끄러운 곡선으로 잇는다. 선 아래는 비운다.

선 두께는 넷이다.
- **1px:** 기본. 구역선, 행 구분선, 테두리, 지점 기둥, 눈금자와 눈금, 해발 점선.
- **2px:** 고도선, 링크 밑줄, 선택 칸 밑줄, 점의 테, 목록 표식(12px 가로선).
- **3px:** 포커스 링(노랑, 3px 띄움).
- **4px:** hover 중인 링크 밑줄.

**The Bookend Rule (시작과 끝 규칙).** 묶음의 시작과 끝 선은 노랑 1px, 묶음 안의 선은 `rule` 1px이다. 표 머리글 아래와 마지막 행 아래, 코스 비교 맨 위와 공통 눈금자 아래, 안내 목록 맨 위, 마무리 구역 맨 위가 노랑이고, 그 사이의 행 구분선과 구역 사이의 선은 `rule`이다.

## Components

### Buttons
조용하지만 분명하다. 채우지 않고 테두리로 선다.
- **Shape:** 살짝 둥근 모서리(8px), 노랑 1px 테두리, 바탕 없음. 최소 높이 60px, 좌우 여백 28px.
- **Primary:** 노랑 글자(700, 1.125rem), 코스 이름은 Barlow Condensed 500. 글자 오른쪽에 14px 띄운 선 화살표(SVG, 선 두께 2.5).
- **Large:** 마무리 구역용. 최소 높이 76px, 좌우 40px, 1.5rem.
- **Hover / Focus:** hover에서 노랑으로 채워지고 글자가 `k`로 바뀌며 화살표가 오른쪽으로 6px 간다(색 0.18초, 화살표 0.25초). 누르면 1px 내려간다. 포커스는 노랑 3px 외곽선, 3px 띄움.
- **Text link:** 보조 행동은 버튼이 아니라 노랑 밑줄 링크(400, 밑줄 2px, hover에서 4px).
- 560px 이하에서 버튼은 폭을 채우고 글자와 화살표가 양 끝으로 벌어진다.

### Course Picker (코스 선택)
- **Style:** `rule` 1px 테두리로 묶인 칸 나열(모서리 8px), 칸 사이도 `rule` 1px. 글자는 Barlow Condensed 500, 1.75rem, 칸 최소 폭 88px, 최소 높이 48px. 작은 변형은 1.375rem, 최소 폭 72px, 최소 높이 44px.
- **State:** 눌리지 않은 칸은 `dim` 글자, hover에서 `w`. 눌린 칸(`aria-pressed="true"`)은 노랑 글자에 아래쪽 노랑 2px 밑줄. 채움은 없다. 포커스 링은 칸 안쪽으로 6px 들어간다.
- **Behavior:** 한 화면의 모든 코스 선택이 같은 값을 공유한다. 하나를 바꾸면 고도선, 진행 띠, 조건 줄, 표, 버튼 글자가 함께 바뀐다.

### Tag (임시/미정 표시)
- **Style:** `rule` 1px 테두리, 바탕 없음, 직각, 노랑 글자 400, 0.8125rem, 안쪽 여백 7px 12px. 제목이나 표 제목 바로 뒤에 붙는다.
- **Use:** 확정되지 않은 내용의 제목마다 붙인다. "임시"는 시안용 값, "미정"은 아직 값이 없음.

### Tables (컷오프 표)
- **Style:** 바탕과 세로선 없음. 행마다 `rule` 1px 밑줄, 머리글 아래와 마지막 행 아래는 노랑 1px. 칸 여백 18px 16px 16px 0.
- **Type:** 머리글은 0.9375rem `dim`. 행 제목은 1.1875rem. 수치는 오른쪽 정렬 Barlow Condensed 400, 1.625rem. 가장 중요한 열(컷오프 시각)만 500에 노랑.
- 560px 이하에서는 해발 열을 숨겨 가로 스크롤을 없앤다.

### Navigation
- **Style:** 바탕 위에 바로 놓인다. 바탕, 선, 고정 없음. 왼쪽에 글자 워드마크, 오른쪽에 400, 1rem 미색 링크. hover는 노랑 글자와 밑줄.
- **Mobile:** 900px 이하에서 노랑 1px 테두리(모서리 8px)의 "메뉴" 글자 버튼. 열면 위쪽 노랑 1px, 항목마다 `rule` 1px 밑줄이 있는 세로 목록.
- **Wordmark:** 실제 로고 파일이 없어 Barlow Condensed 대문자(500 + 400, 1.375rem, 자간 0.06em) 노랑 글자로 대신한다. 로고가 오면 교체할 자리다.

### Ruled List (선으로 나눈 목록)
- 맨 위 노랑 1px, 항목마다 `rule` 1px 밑줄. 항목은 4:8 두 단으로 왼쪽에 제목(Title), 오른쪽에 내용(최대 38em, `dim`). 항목 위아래 여백 30px / 28px.
- 체크 항목은 12px 길이 노랑 2px 가로선 표식, 2단 배열.

### Elevation Line (고도선, 시그니처)
- **Line:** 선택한 코스의 출발점과 1km 지점들을 지나는 매끄러운 노란 선(2px). 세로는 그 코스의 최고점이 그림 높이 100%가 되도록 맞춘다.
- **Grid:** 해발 500m마다 `rule` 1px 점선, 왼쪽에 `dim` 눈금 글자.
- **Pins:** 출발, 체크포인트, 최고점, 결승에만 선다. 바닥에서 선까지 올라가는 노랑 1px 기둥, 선 위의 점, 점 위 14px에 깃발(`k` 바탕, `rule` 1px 테두리, 노랑 Barlow Condensed 500 글자, 이름 + 시각). 결승 깃발은 오른쪽 정렬.
- **Ruler:** 선 바로 아래 40px 눈금자. 위쪽 노랑 1px, 눈금마다 노랑 1px 세로선, 노랑 글자. 눈금 간격은 코스 길이에 따라 10, 5, 2km.
- **Readout:** 선 위 한 줄. 선택한 km, 해발, 직전 1km 경사, 다음 컷오프. 라벨은 `dim`, 값은 미색 Barlow Condensed 500, 1.75rem. 선택한 지점 위로 따라 움직인다(0.35초).
- **Interaction:** 포인터로 훑거나 좌우 화살표(Home, End, PageUp, PageDown 포함)로 1km씩 이동하면 미색 1px 세로선과 14px 점이 따라온다. 그림은 `role="slider"`이고 값이 문장으로 읽힌다. 처음에는 최고점이 선택되어 있다.
- **Motion:** 들어오면 선이 왼쪽에서 오른쪽으로 2.4초 동안 그려지고, 지점 표시는 선이 닿는 순서대로 0.5초씩 나타난다. 이징은 `cubic-bezier(.16, 1, .3, 1)` 하나. `prefers-reduced-motion`에서는 모든 전환과 애니메이션이 꺼진다.

### Comparison Rows (코스 비교)
- 맨 위 노랑 1px, 공통 눈금자(38px) 아래 노랑 1px, 행 사이는 `rule` 1px. 행은 150px / 1fr / 220~300px 세 칸(코스 이름, 고도선, 조건과 신청 링크).
- 모든 행이 같은 가로 축척(선의 길이가 거리에 비례)과 같은 세로 축척(해발 300~1,600m, 높이 132px)을 쓴다. 행마다 해발 1,000m `rule` 점선 기준선과 오른쪽 `dim` 글자를 둔다.
- 코스 이름은 노랑 Numeral Course. 조건 문장은 `dim`, 첫 수치만 미색.

### Progress Strip (진행 띠, 스크롤이 곧 코스를 달리는 것)
- 첫 화면을 지나면 화면 맨 위에 내려와 붙는 띠(0.45초). 높이 56px(560px 이하 48px), `k` 바탕, 아래 `rule` 1px.
- 띠 안에는 선택한 코스의 고도선이 다시 그려진다. 남은 구간은 `rule` 2px, 지나온 구간은 노랑 2px, 현재 위치는 미색 10px 점. 페이지를 내린 비율만큼 점이 출발에서 결승으로 간다.
- 오른쪽에 현재 km / 전체 km(Barlow Condensed, 현재 km만 노랑 500, 1.625rem. 560px 이하 숨김)와 테두리만 있는 신청 버튼(모서리 8px).
- 스크롤을 붙잡지 않는다. `prefers-reduced-motion`에서는 띠만 고정하고 점을 숨긴 채 선 전체를 노랑으로 둔다.

## Do's and Don'ts

### Do:
- **Do** 페이지 전체를 `k` 바탕 하나로 두고 구역은 1px 선과 여백으로 나눈다.
- **Do** 고도는 매끄러운 노란 선 한 줄(2px)로 그리고, 코스끼리 비교할 때는 가로와 세로 축척을 똑같이 맞춘다.
- **Do** 제목과 본문은 LINE Seed Sans KR Regular(400)와 미색(`w`)으로, 설명문은 `dim`으로 적는다.
- **Do** 값으로 읽는 숫자와 영문 토큰은 Barlow Condensed(값 500, 눈금과 표 수치 400)로 적는다.
- **Do** 버튼은 테두리만 두고 모서리를 8px로 맞춘다. 채움은 hover에서만 나타난다.
- **Do** 묶음의 시작과 끝 선은 노랑 1px, 안쪽 선은 `rule` 1px로 맞춘다.
- **Do** 확정되지 않은 내용에는 제목 옆에 "임시" 또는 "미정" 태그를 붙이고 문장으로도 밝힌다.
- **Do** 포커스 링은 노랑 3px 외곽선으로 둔다.

### Don't:
- **Don't** 밝은 바탕 구역이나 노랑 바탕 구역을 만들지 않는다. 바탕은 하나다.
- **Don't** 멈춰 있는 버튼을 색으로 채우지 않는다. 참가 신청 버튼도 테두리만이다.
- **Don't** 제목이나 본문을 굵게 하거나 노랑으로 적지 않는다. 순백(#FFFFFF) 글자도 쓰지 않는다.
- **Don't** 고도를 1km 막대나 선 아래를 채운 산 실루엣으로 그리지 않는다. 지점을 표시하는 1px 기둥은 여기에 해당하지 않는다.
- **Don't** 그라데이션, 오프셋이나 흐림이 있는 그림자를 쓰지 않는다. 흐림 없는 안쪽 밑줄(`inset 0 -2px 0`)은 이 규칙에 걸리지 않는다.
- **Don't** `rule` 색을 글자에 쓰지 않는다(대비 2.1:1).
- **Don't** 내셔널지오그래픽 로고의 노란 사각 프레임을 로고 대용이나 화면 장식 틀로 그리지 않는다. 버튼의 노랑 테두리와 눈금자의 노랑 눈금선은 조작 요소와 데이터 표식이라 여기에 해당하지 않는다.
- **Don't** 사진이 없는 자리를 스톡 사진이나 지어낸 수치, 후기로 채우지 않는다.
