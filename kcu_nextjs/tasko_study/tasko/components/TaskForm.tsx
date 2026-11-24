// components/TaskForm.tsx
"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { FormState, Task, TaskInput } from "@/lib/types";

interface TaskFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  task?: Task;
  submitLabel: string;
}

export default function TaskForm({ action, task, submitLabel }: TaskFormProps) {
  const [state, formAction] = useActionState(action, { error: "" });
  const input = "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none";

  let values: TaskInput = { title: "", content: "", status: "todo", assignee: "" };
  if (state.values) {
    values = state.values;
  } else if (task) {
    values = task;
  }

  let idInput = null;
  if (task) {
    idInput = <input type="hidden" name="id" value={task.id} />;
  }

  let errorBox = null;
  if (state.error !== "") {
    errorBox = <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>;
  }

  return (
    <form action={formAction} className="max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      {idInput}
      {errorBox}
      <label className="block">
        <span className="mb-1 block text-sm font-medium">제목</span>
        <input name="title" defaultValue={values.title} className={input} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">내용</span>
        <textarea name="content" defaultValue={values.content} rows={4} className={input} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">상태</span>
        <select name="status" defaultValue={values.status} className={input}>
          <option value="todo">할 일</option>
          <option value="doing">진행 중</option>
          <option value="done">완료</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">담당자</span>
        <input name="assignee" defaultValue={values.assignee} className={input} />
      </label>
      <SubmitButton label={submitLabel} />
    </form>
  );
}