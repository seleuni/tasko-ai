// app/tasks/@modal/(.)[id]/page.tsx
import { notFound } from "next/navigation";
import Modal from "@/components/Modal";
import TaskCard from "@/components/TaskCard";
import { getTask } from "@/lib/data";

interface TaskModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskModalPage({ params }: TaskModalPageProps) {
  const { id } = await params;
  const task = await getTask(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <Modal>
      <TaskCard task={task} />
      <a href={`/tasks/${task.id}`} className="mt-4 inline-block text-sm text-blue-600 hover:underline">
        전체 화면으로 보기 (댓글, 수정, 삭제)
      </a>
    </Modal>
  );
}