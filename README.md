# 새 잎 (Saeip)

KAIST 테크포임팩트 2026 가을 · 파트너: 그린테라피

> 지금 이 저장소는 **뼈대**다. "클릭하면 전체 흐름이 끝까지 이어지는, 못생긴 동작 프로토타입"까지만 만들었고, 디자인·세부 기능은 비워뒀다.

## 프로젝트 소개

그린테라피의 식물 기반 마음돌봄 워크숍은 참여자에게 좋은 경험을 주지만, 그 경험이 워크숍 당일로 끝나고 일상으로 이어지지 않는다는 문제가 있다. "새 잎"은 워크숍 이후에도 참여자가 매일 자기 마음 상태를 가볍게 확인하고, 식물·산책·감각 활동 같은 작은 주간 미션을 해보며, 활동 전후 감정 변화를 기록하도록 돕는 모바일 웹앱이다. 미션을 할 때마다 앱 속 식물이 자라고, 원하면 기록을 다른 참여자와 나눌 수 있다. 참여자가 동의한 데이터는 그린테라피가 프로그램 효과를 확인하는 데 쓰인다.

## 데모 링크

TBD (Vercel 배포 후 추가)

## 설치 및 실행

Node 20 이상 필요.

```bash
npm install     # 처음 한 번
npm run dev     # 개발 서버 (터미널에 나오는 주소를 브라우저·폰에서 열기)
npm run build   # 배포용 빌드 (타입 검사 포함)
```

폰으로 보려면 `npm run dev -- --host` 로 켜고, 같은 와이파이에서 터미널에 나온 Network 주소로 접속.

데이터는 브라우저 localStorage 에만 저장된다. 처음 상태로 돌리려면 마이 탭의 "데이터 초기화".

## 사용자 흐름

처음 접속하면 `/onboarding` (닉네임·선호 활동·워크숍 코드) 을 거친 뒤 아래 흐름이 이어진다.

| 단계 | 화면 | 경로 |
|---|---|---|
| 1. 오늘의 상태 확인 | 감정 5단계 + 한 줄 메모 | `/checkin` (홈의 "오늘의 상태 확인하기") |
| 2. 미션 추천 | 이번 주 미션, 선호 활동 먼저 | `/missions` |
| 3. 활동 수행 | 미션 설명 + 시작/완료 | `/missions/:id` |
| 4. 인증·감정 기록 | 사진, 활동 후 감정, 메모, 공유 여부 | `/missions/:id/done` |
| 5. 식물 성장 | 포인트 +1, 씨앗 → 새싹 → 잎 → 꽃 | `/` (홈) |
| 6. 커뮤니티 공유 | 공유한 기록 피드 + 공감 버튼 | `/community` |

그 밖에: 기록 모아보기 `/journal`, 마이/설정 `/me`, 운영자(사회혁신가) 화면 `/admin` (마이 탭 하단 링크, 탭바에는 없음).

## 폴더 구조 지도

```
src/
  main.tsx            앱 시작점 (라우터 감싸기)
  App.tsx             모든 경로(라우트) 정의, 온보딩 리다이렉트
  index.css           Tailwind 불러오기 + 토큰을 Tailwind 클래스로 연결
  styles/
    tokens.css        색·모서리·폰트 변수 (디자인은 여기만 바꾸면 전체 반영)
  components/         여러 화면에서 쓰는 조각
    Layout.tsx          모바일 틀 (최대 폭 430px) + 하단 탭
    BottomTabBar.tsx    홈/미션/기록/커뮤니티/마이
    EmotionPicker.tsx   감정 5단계 선택
    PlantView.tsx       식물 단계 표시 (지금은 이모지)
    Card.tsx, Button.tsx, PageHeader.tsx
  pages/              화면 하나당 파일 하나 (각 파일 맨 위 TODO 에 남은 일)
    Onboarding, Home, CheckIn, Missions, MissionDetail, MissionDone,
    Community, Journal, Me, Admin
  data/
    types.ts          데이터 모델 (User, CheckIn, Mission, MissionLog, Plant, Post)
    mockData.ts       이번 주 미션, 가짜 커뮤니티 글, 선호 활동 목록
    emotions.ts       감정 5단계 이모지·문구
    plant.ts          포인트 → 식물 단계 계산 (0/2/5/9)
    store.ts          저장 계층. localStorage 를 만지는 유일한 파일
```

## 역할별 시작 지점

- **디자인 (최유리)**: `src/styles/tokens.css` 에서 색·폰트·모서리 값부터 바꾸고, `src/components/` 의 공통 조각을 다듬는다. 식물 단계 그림은 `PlantView.tsx`, 감정 아이콘은 `src/data/emotions.ts`.
- **프론트 (천희영)**: `src/pages/` 각 파일 맨 위 TODO 부터. 데이터 모양은 `src/data/types.ts`, 미션 내용은 `src/data/mockData.ts`.
- **백엔드·데이터 (윤종훈)**: `src/data/store.ts`. 화면은 이 파일의 함수만 부르므로, Supabase 등으로 바꿀 때 이 파일만 교체하면 된다.

## 새 화면/미션 추가하는 법

**미션 추가**: `src/data/mockData.ts` 의 `MISSIONS` 배열에 한 줄 추가.

```ts
{ id: 'm7', title: '잎 만져보기', category: '감각', week: 1, description: '...해볼까요?' },
```

`week` 가 `CURRENT_WEEK` 와 같아야 미션 탭에 보인다. 문구는 명령이 아니라 제안("해볼까요?") 톤으로.

**화면 추가**:
1. `src/pages/새화면.tsx` 만들기 (다른 페이지 파일을 복사해서 시작하면 편함)
2. `src/App.tsx` 에 `<Route path="/새경로" element={<새화면 />} />` 추가
3. 하단 탭에 넣을 거면 `src/components/BottomTabBar.tsx` 의 `TABS` 에 추가

**색 바꾸기**: 컴포넌트에 색 코드를 직접 쓰지 말고 `bg-primary`, `text-muted` 같은 토큰 클래스를 쓴다. 새 토큰이 필요하면 `tokens.css` 에 변수를 만들고 `index.css` 의 `@theme inline` 에 연결.

## 뼈대에서 일부러 비워둔 것

(GitHub Issue 초안은 `ISSUES.md`)

- 실제 디자인: 색·폰트·일러스트·애니메이션, 식물 단계 그림 (지금은 이모지)
- 각 화면 세부 UI·문구
- 미션 추천 로직 고도화 (지금은 선호 카테고리 먼저 정렬만), 주차 전환
- 실제 DB·로그인 연결 (Supabase 등), 기기 간 동기화
- 사진 원본 업로드 (지금은 작게 줄인 사진만 로컬 저장, 크면 저장 안 함)
- 워크숍 코드 검증
- 게임 요소 (보상·배지 등), 성장 연출
- 커뮤니티 안전장치 (신고·숨김), 공유 범위 선택. 댓글은 "개입 최소" 원칙으로 일부러 없음
- 기록 화면의 감정 변화 시각화 (달력·그래프)
- 운영자 화면 실제 집계 (지금은 이 기기 데이터만)
- PWA 설치(홈 화면 추가), 배포

## 팀 소개

| 이름 | 역할 |
|---|---|
| 전재민 | 팀장 · 대외 |
| 윤종훈 | PM · 개발 |
| 최유리 | 디자인 |
| 천희영 | 개발 |
