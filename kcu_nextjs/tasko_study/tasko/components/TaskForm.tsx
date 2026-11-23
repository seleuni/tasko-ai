// components/TaskForm.tsx
import type { Task } from "@/lib/types";

interface TaskFormProps {
  action: (formData: FormData) => Promise<void>;
  task?: Task;
  submitLabel: string;
}

export default function TaskForm({ action, task, submitLabel }: TaskFormProps) {
  const input = "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none";

  let idInput = null;
  let title = "";
  let content = "";
  let status = "todo";
  let assignee = "";
  if (task) {
    idInput = <input type="hidden" name="id" value={task.id} />;
    title = task.title;
    content = task.content;
    status = task.status;
    assignee = task.assignee;
  }

  return (
    <form action={action} className="max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      {idInput}
      <label className="block">
        <span className="mb-1 block text-sm font-medium">제목</span>
        <input name="title" defaultValue={title} className={input} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">내용</span>
        <textarea name="content" defaultValue={content} rows={4} className={input} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">상태</span>
        <select name="status" defaultValue={status} className={input}>
          <option value="todo">할 일</option>
          <option value="doing">진행 중</option>
          <option value="done">완료</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">담당자</span>
        <input name="assignee" defaultValue={assignee} className={input} />
      </label>
      <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
        {submitLabel}
      </button>
    </form>
  );
}