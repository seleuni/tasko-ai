// app/tasks/[id]/edit/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { updateTaskAction } from "@/lib/actions";
import { getTask } from "@/lib/data";

export const metadata: Metadata = {
  title: "할 일 수정",
};

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const task = await getTask(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">할 일 수정</h1>
      <TaskForm action={updateTaskAction} task={task} submitLabel="저장" />
    </>
  );
}