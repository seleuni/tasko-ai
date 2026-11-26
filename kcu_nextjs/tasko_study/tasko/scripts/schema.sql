-- scripts/schema.sql
DROP TABLE IF EXISTS lab_comments;
DROP TABLE IF EXISTS lab_tasks;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tasks;

-- tasko 테이블
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
  assignee TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES tasks (id),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO tasks (id, title, content, status, assignee, created_at) VALUES
  (1, 'Next.js 설치하기', 'create-next-app@16으로 tasko 프로젝트를 만든다.', 'done', '보그쌤', '2026-11-15'),
  (2, 'TypeScript 복습하기', '웹개발기초 7장의 타입 문법을 다시 본다.', 'doing', '김민수', '2026-11-16'),
  (3, 'Tailwind CSS 복습하기', '웹개발기초 6장의 유틸리티 클래스를 다시 본다.', 'done', '이지은', '2026-11-16'),
  (4, 'App Router 익히기', '폴더 구조와 주소의 관계를 정리한다.', 'done', '박서준', '2026-11-17'),
  (5, '서버 액션 만들기', '할 일 추가 폼을 서버 액션으로 처리한다.', 'doing', '보그쌤', '2026-11-18'),
  (6, '로딩 화면 꾸미기', '스켈레톤 UI를 만든다.', 'todo', '김민수', '2026-11-18'),
  (7, '상세 모달 만들기', '병렬 라우트와 인터셉팅 라우트를 쓴다.', 'todo', '이지은', '2026-11-19'),
  (8, '데이터베이스 연결하기', 'SQL과 SQLite로 데이터를 저장한다.', 'todo', '박서준', '2026-11-20');

INSERT INTO comments (task_id, author, content, created_at) VALUES
  (2, '보그쌤', '제네릭 부분을 한 번 더 보자.', '2026-11-16'),
  (2, '김민수', 'Record 예제가 이해하기 쉬웠다.', '2026-11-17'),
  (5, '이지은', 'redirect는 마지막에 부르면 된다.', '2026-11-18');

-- 연습용 테이블(8.3절, 8.4절 연습예제에서 쓴다)
CREATE TABLE lab_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
  assignee TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE lab_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES lab_tasks (id),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO lab_tasks (id, title, content, status, assignee, created_at) VALUES
  (1, 'Next.js 설치하기', 'create-next-app@16으로 tasko 프로젝트를 만든다.', 'done', '보그쌤', '2026-11-15'),
  (2, 'TypeScript 복습하기', '웹개발기초 7장의 타입 문법을 다시 본다.', 'doing', '김민수', '2026-11-16'),
  (3, 'Tailwind CSS 복습하기', '웹개발기초 6장의 유틸리티 클래스를 다시 본다.', 'done', '이지은', '2026-11-16'),
  (4, 'App Router 익히기', '폴더 구조와 주소의 관계를 정리한다.', 'done', '박서준', '2026-11-17'),
  (5, '서버 액션 만들기', '할 일 추가 폼을 서버 액션으로 처리한다.', 'doing', '보그쌤', '2026-11-18'),
  (6, '로딩 화면 꾸미기', '스켈레톤 UI를 만든다.', 'todo', '김민수', '2026-11-18'),
  (7, '상세 모달 만들기', '병렬 라우트와 인터셉팅 라우트를 쓴다.', 'todo', '이지은', '2026-11-19'),
  (8, '데이터베이스 연결하기', 'SQL과 SQLite로 데이터를 저장한다.', 'todo', '박서준', '2026-11-20');

INSERT INTO lab_comments (task_id, author, content, created_at) VALUES
  (2, '보그쌤', '제네릭 부분을 한 번 더 보자.', '2026-11-16'),
  (2, '김민수', 'Record 예제가 이해하기 쉬웠다.', '2026-11-17'),
  (5, '이지은', 'redirect는 마지막에 부르면 된다.', '2026-11-18');
