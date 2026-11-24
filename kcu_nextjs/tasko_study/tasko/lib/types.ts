// lib/types.ts
export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: number;
  title: string;
  content: string;
  status: TaskStatus;
  assignee: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  taskId: number;
  author: string;
  content: string;
  createdAt: string;
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "할 일",
  doing: "진행 중",
  done: "완료",
};

export interface TaskWithCount extends Task {
  commentCount: number;
}

export type TaskInput = Omit<Task, "id" | "createdAt">;
export type CommentInput = Omit<Comment, "id" | "createdAt">;

export const TASK_STATUSES: TaskStatus[] = ["todo", "doing", "done"];
export const PAGE_SIZE = 6;

export function parseStatus(value: string | null | undefined): TaskStatus | undefined {
  if (value === "todo" || value === "doing" || value === "done") {
    return value;
  }
  return undefined;
}

export function parsePage(value: string | null | undefined): number {
  const page = Number(value);
  if (Number.isInteger(page) && page >= 1) {
    return page;
  }
  return 1;
}

//폼 상태 타입 추가하기
export interface FormState {
  error: string;
  values?:TaskInput;
}