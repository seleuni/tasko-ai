// lib/data.ts
import type { Selectable } from "kysely";
import { db } from "@/lib/db";
import type { CommentTable, TaskTable } from "@/lib/db-types";
import { PAGE_SIZE, parseStatus } from "@/lib/types";
import type { Comment, CommentInput, Task, TaskInput, TaskStatus, TaskWithCount } from "@/lib/types";

function toTask(row: Selectable<TaskTable>): Task {
  let status = parseStatus(row.status);
  if (status === undefined) {
    status = "todo";
  }
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    status: status,
    assignee: row.assignee,
    createdAt: row.created_at,
  };
}

function toComment(row: Selectable<CommentTable>): Comment {
  return {
    id: row.id,
    taskId: row.task_id,
    author: row.author,
    content: row.content,
    createdAt: row.created_at,
  };
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getTasks(
  status: TaskStatus | undefined,
  page: number,
): Promise<{ tasks: TaskWithCount[]; total: number }> {
  let query = db
    .selectFrom("tasks")
    .leftJoin("comments", "comments.task_id", "tasks.id")
    .select(["tasks.id", "tasks.title", "tasks.content", "tasks.status", "tasks.assignee", "tasks.created_at"])
    .select((eb) => eb.fn.count<number>("comments.id").as("comment_count"))
    .groupBy("tasks.id")
    .orderBy("tasks.id", "desc")
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE);

  let countQuery = db.selectFrom("tasks").select((eb) => eb.fn.countAll<number>().as("total"));

  if (status !== undefined) {
    query = query.where("tasks.status", "=", status);
    countQuery = countQuery.where("status", "=", status);
  }

  console.log(query.compile().sql, query.compile().parameters);
  const rows = await query.execute();
  const countRow = await countQuery.executeTakeFirstOrThrow();


  const tasks: TaskWithCount[] = [];
  for (const row of rows) {
    const task = toTask(row);
    tasks.push({
      id: task.id,
      title: task.title,
      content: task.content,
      status: task.status,
      assignee: task.assignee,
      createdAt: task.createdAt,
      commentCount: Number(row.comment_count),
    });
  }
  return { tasks: tasks, total: Number(countRow.total) };
}

export async function getStatusCounts(): Promise<Record<TaskStatus, number>> {
  const rows = await db
    .selectFrom("tasks")
    .select(["status", (eb) => eb.fn.countAll<number>().as("count")])
    .groupBy("status")
    .execute();

  const counts: Record<TaskStatus, number> = { todo: 0, doing: 0, done: 0 };
  for (const row of rows) {
    const status = parseStatus(row.status);
    if (status !== undefined) {
      counts[status] = Number(row.count);
    }
  }
  return counts;
}

export async function getTask(id: number): Promise<Task | undefined> {
  const row = await db.selectFrom("tasks").selectAll().where("id", "=", id).executeTakeFirst();
  if (!row) {
    return undefined;
  }
  return toTask(row);
}

export async function getComments(taskId: number): Promise<Comment[]> {
  const rows = await db
    .selectFrom("comments")
    .selectAll()
    .where("task_id", "=", taskId)
    .orderBy("id", "asc")
    .execute();

  const comments: Comment[] = [];
  for (const row of rows) {
    comments.push(toComment(row));
  }
  return comments;
}

export async function createTask(input: TaskInput): Promise<Task> {
  throw new Error("8.4절에서 만든다");
}

export async function updateTask(id: number, input: TaskInput): Promise<void> {
  throw new Error("8.4절에서 만든다");
}

export async function deleteTask(id: number): Promise<void> {
  throw new Error("8.4절에서 만든다");
}

export async function addComment(input: CommentInput): Promise<void> {
  throw new Error("8.4절에서 만든다");
}
