// lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addComment, createTask, deleteTask, updateTask } from "@/lib/data";
import { parseStatus } from "@/lib/types";
import type { FormState, TaskInput } from "@/lib/types";

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


function validateTaskInput(input: TaskInput): string {
  if (input.title === "") {
    return "제목을 입력하세요.";
  }
  if (input.title.length > 50) {
    return "제목은 50자 이하로 입력하세요.";
  }
  if (input.assignee === "") {
    return "담당자를 입력하세요.";
  }
  return "";
}

export async function createTaskAction(prevState: FormState, formData: FormData) {
  const input = readTaskInput(formData);
  const error = validateTaskInput(input);
  if (error !== "") {
    return { error: error, values: input };
  }
  const task = await createTask(input);
  revalidatePath("/tasks");
  redirect(`/tasks/${task.id}`);
}

//  const task = await createTask(readTaskInput(formData));
//  revalidatePath("/tasks");
//  redirect(`/tasks/${task.id}`);
//}

export async function updateTaskAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = Number(readText(formData, "id"));
  const input = readTaskInput(formData);
  const error = validateTaskInput(input);
  if (error !== "") {
    return { error: error, values: input };
  }
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