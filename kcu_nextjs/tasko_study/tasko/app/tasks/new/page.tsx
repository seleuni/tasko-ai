// app/tasks/new/page.tsx
import type { Metadata } from "next";
import TaskForm from "@/components/TaskForm";
import { createTaskAction } from "@/lib/actions";

export const metadata: Metadata = {
  title: "새 할 일",
};

export default function NewTaskPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">새 할 일</h1>
      <TaskForm action={createTaskAction} submitLabel="추가" />
    </>
  );
}