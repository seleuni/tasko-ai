// lib/data.ts
import { PAGE_SIZE } from "@/lib/types";
import type { Comment, CommentInput, Task, TaskInput, TaskStatus, TaskWithCount } from "@/lib/types";

let tasks: Task[] = [
  { id: 1, title: "Next.js 설치하기", content: "create-next-app@16으로 tasko 프로젝트를 만든다.", status: "done", assignee: "보그쌤", createdAt: "2026-11-15" },
  { id: 2, title: "TypeScript 복습하기", content: "웹개발기초 7장의 타입 문법을 다시 본다.", status: "doing", assignee: "김민수", createdAt: "2026-11-16" },
  { id: 3, title: "Tailwind CSS 복습하기", content: "웹개발기초 6장의 유틸리티 클래스를 다시 본다.", status: "done", assignee: "이지은", createdAt: "2026-11-16" },
  { id: 4, title: "App Router 익히기", content: "폴더 구조와 주소의 관계를 정리한다.", status: "done", assignee: "박서준", createdAt: "2026-11-17" },
  { id: 5, title: "서버 액션 만들기", content: "할 일 추가 폼을 서버 액션으로 처리한다.", status: "doing", assignee: "보그쌤", createdAt: "2026-11-18" },
  { id: 6, title: "로딩 화면 꾸미기", content: "스켈레톤 UI를 만든다.", status: "todo", assignee: "김민수", createdAt: "2026-11-18" },
  { id: 7, title: "상세 모달 만들기", content: "병렬 라우트와 인터셉팅 라우트를 쓴다.", status: "todo", assignee: "이지은", createdAt: "2026-11-19" },
  { id: 8, title: "데이터베이스 연결하기", content: "7~9장에서 반별로 데이터베이스를 붙인다.", status: "todo", assignee: "박서준", createdAt: "2026-11-20" },
];

let comments: Comment[] = [
  { id: 1, taskId: 2, author: "보그쌤", content: "제네릭 부분을 한 번 더 보자.", createdAt: "2026-11-16" },
  { id: 2, taskId: 2, author: "김민수", content: "Record 예제가 이해하기 쉬웠다.", createdAt: "2026-11-17" },
  { id: 3, taskId: 5, author: "이지은", content: "redirect는 마지막에 부르면 된다.", createdAt: "2026-11-18" },
];

let nextTaskId = 9;
let nextCommentId = 4;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function today(): string {
  //"2026-11-22T03:20:00.000Z"처럼 긴 ISO 문자열 대신
  //"2026-11-22"처럼 앞 10글자(YYYY-MM-DD)만 잘라서 깔끔하게 쓰기 위한 코드
  return new Date().toISOString().slice(0, 10);
}

function countComments(taskId: number): number {
  let count = 0;
  for (const comment of comments) {
    if (comment.taskId === taskId) {
      count = count + 1;
    }
  }
  return count;
}

function newestFirst(a: Task, b: Task): number {
  return b.id - a.id;
}

export async function getTasks(
  status: TaskStatus | undefined,
  page: number,
): Promise<{ tasks: TaskWithCount[]; total: number }> {
//  throw new Error ("데이터 저장소에 연결할 수 없습니다.");
  await wait(1000);
  const filtered: Task[] = [];
  for (const task of tasks) {
    if (status === undefined || task.status === status) {
      filtered.push(task);
    }
  }

  const sorted = filtered.slice();
  sorted.sort(newestFirst);

  const start = (page - 1) * PAGE_SIZE;
  const pageTasks = sorted.slice(start, start + PAGE_SIZE);

  const result: TaskWithCount[] = [];
  for (const task of pageTasks) {
    result.push({
      id: task.id,
      title: task.title,
      content: task.content,
      status: task.status,
      assignee: task.assignee,
      createdAt: task.createdAt,
      commentCount: countComments(task.id),
    });
  }
  return { tasks: result, total: filtered.length };
}

export async function getStatusCounts(): Promise<Record<TaskStatus, number>> {
  const counts: Record<TaskStatus, number> = { todo: 0, doing: 0, done: 0 };
  for (const task of tasks) {
    counts[task.status] = counts[task.status] + 1;
  }
  return counts;
}

export async function getTask(id: number): Promise<Task | undefined> {
  for (const task of tasks) {
    if (task.id === id) {
      return task;
    }
  }
  return undefined;
}

export async function createTask(input: TaskInput): Promise<Task> {
  const task: Task = {
    id: nextTaskId,
    title: input.title,
    content: input.content,
    status: input.status,
    assignee: input.assignee,
    createdAt: today(),
  };
  nextTaskId = nextTaskId + 1;
  tasks.push(task);
  return task;
}

export async function updateTask(id: number, input: TaskInput): Promise<void> {
  for (const task of tasks) {
    if (task.id === id) {
      task.title = input.title;
      task.content = input.content;
      task.status = input.status;
      task.assignee = input.assignee;
    }
  }
}

export async function deleteTask(id: number): Promise<void> {
  const keptTasks: Task[] = [];
  for (const task of tasks) {
    if (task.id !== id) {
      keptTasks.push(task);
    }
  }
  tasks = keptTasks;

  const keptComments: Comment[] = [];
  for (const comment of comments) {
    if (comment.taskId !== id) {
      keptComments.push(comment);
    }
  }
  comments = keptComments;
}

export async function getComments(taskId: number): Promise<Comment[]> {
  const result: Comment[] = [];
  for (const comment of comments) {
    if (comment.taskId === taskId) {
      result.push(comment);
    }
  }
  await wait(2000);
  return result;
}

export async function addComment(input: CommentInput): Promise<void> {
  const comment: Comment = {
    id: nextCommentId,
    taskId: input.taskId,
    author: input.author,
    content: input.content,
    createdAt: today(),
  };
  nextCommentId = nextCommentId + 1;
  comments.push(comment);
}
