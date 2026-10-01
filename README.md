# twoone

웹 퍼블리싱 템플릿 모음.

## 구성

| 폴더 | 내용 |
|---|---|
| [krds-senior-templates/](krds-senior-templates/) | 70대 이상 이용자를 위한 공공 민원 포털 템플릿. [KRDS](https://www.krds.go.kr) 1.1.0 기반, 디자인 4종 |

각 템플릿의 사용법은 폴더 안 README를 본다. 다른 프로젝트로 옮겨 붙이는 방법은 [MIGRATION.md](krds-senior-templates/MIGRATION.md)에 있다.

## 보기

빌드 없이 정적 파일이라 `pages/*.html`을 브라우저로 바로 열면 된다.

## 검증

```
cd krds-senior-templates
node checks/check.mjs
```
