// lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addComment, createTask, deleteTask, updateTask } from "@/lib/data";
import { parseStatus } from "@/lib/types";
import type { TaskInput } from "@/lib/types";

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function readTaskInput(formData: FormData): TaskInput {
  let status = parseStatus(readText(formData, "status"));
  if (status === undefined) {
    status = "todo";
  }
  return {
    title: readText(formData, "title"),
    content: readText(formData, "content"),
    status: status,
    assignee: readText(formData, "assignee"),
  };
}

export async function createTaskAction(formData: FormData) {
  const task = await createTask(readTaskInput(formData));
  revalidatePath("/tasks");
  redirect(`/tasks/${task.id}`);
}

export async function updateTaskAction(formData: FormData) {
  const id = Number(readText(formData, "id"));
  await updateTask(id, readTaskInput(formData));
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks/${id}`);
}

export async function deleteTaskAction(formData: FormData) {
  const id = Number(readText(formData, "id"));
  await deleteTask(id);
  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function addCommentAction(formData: FormData) {
  const taskId = Number(readText(formData, "taskId"));
  await addComment({
    taskId: taskId,
    author: readText(formData, "author"),
    content: readText(formData, "content"),
  });
  revalidatePath(`/tasks/${taskId}`);
}