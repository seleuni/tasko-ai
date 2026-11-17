<!-- CLAUDE.md -->
# Tasko 프로젝트 지침

## 프로젝트
- Tasko는 1인 사용자를 위한 모바일 웹 할 일 관리 앱이다.
- 화면: 로그인, 회원가입, 대시보드(+할 일 추가 바텀시트), 할 일 목록, 할 일 상세/수정.
- 만들지 않는 것: 알림, 팀 공유, 첨부파일, 반복 일정.

## 기술 기준 (바꾸지 않는다)
- 언어는 JavaScript(.jsx, .js). TypeScript를 쓰지 않는다.
- React 19, Vite 7, React Router 7, Tailwind CSS 4.
- 데이터베이스와 로그인은 Supabase. Firebase·Firestore를 쓰지 않는다.
- 새 패키지를 설치할 때는 설치 전에 이름과 이유를 먼저 말하고 허락을 받는다.

## 폴더 구조
- src/components: 여러 화면이 같이 쓰는 부품
- src/screens: 화면 하나 = 파일 하나
- src/context/TaskContext.jsx: 할 일 데이터와 추가·수정·삭제 함수
- src/data/tasks.js: 샘플 할 일 (Supabase 연결 전까지)

## 코드 작성 규칙 (초보자가 읽을 수 있게)
- 함수는 function 키워드로 쓴다. 화살표 함수는 짧은 콜백에만 쓴다.
- 삼항 연산자, 옵셔널 체이닝(?.), 긴 메서드 체이닝 대신 if문과 중간 변수를 쓴다.
- return을 생략하지 않는다.
- 주요 부분에 한국어 주석을 단다.
- 디자인(색, 글꼴, 간격)은 지금 화면과 같게 유지한다. 색은 아래 토큰만 쓴다.
  Primary #1EA65C, Primary-Light #E8F7EE, Background #F8F9FA, Surface #FFFFFF,
  Border #E9ECEF, Text-Primary #212529, Text-Secondary #495057,
  Text-Muted #868E96, Destructive #FA5252

## 하지 말 것
- .env, .env.local 등 비밀값 파일을 만들거나 내용을 출력·커밋하지 않는다.
- 요청하지 않은 파일·기능을 고치지 않는다. 고칠 범위가 넓어지면 먼저 묻는다.
- 커밋과 푸시는 내가 요청할 때만 한다. 하기 전에 올라갈 파일 목록을 먼저 보여 준다.

## 작업 후 확인
- 코드를 고친 뒤에는 npm run lint 와 npm run build 를 실행해 에러가 없는지 확인한다.
- 무엇을 바꿨는지 파일별로 한국어로 짧게 정리해 알려 준다.

## 대화
- 항상 한국어로 답한다.
- 내가 골라야 할 일이 있으면 선택지마다 1,2,3, 순번을 붙인다.
- 선택지마다 무엇을 하는지(대안)와 장점, 단점을 적는다.
- 마지막에 추천 번호와 추천 사유를 적는다.
