// lib/db-types.ts
import type { Generated } from "kysely";

export interface TaskTable {
  id: Generated<number>;
  title: string;
  content: string;
  status: string;
  assignee: string;
  created_at: string;
}

export interface CommentTable {
  id: Generated<number>;
  task_id: number;
  author: string;
  content: string;
  created_at: string;
}

export interface DB {
  tasks: TaskTable;
  comments: CommentTable;
  lab_tasks: TaskTable;
  lab_comments: CommentTable;
}
