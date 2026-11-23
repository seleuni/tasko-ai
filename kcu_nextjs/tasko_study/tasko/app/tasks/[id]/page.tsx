// app/tasks/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
// [추가]
import CommentForm from "@/components/CommentForm";
import CommentsSkeleton from "@/components/CommentsSkeleton";
import TaskCard from "@/components/TaskCard";
import TaskComments from "@/components/TaskComments";
// [추가]
import { deleteTaskAction } from "@/lib/actions";
import { getTask } from "@/lib/data";

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const task = await getTask(Number(id));
  if (!task) {
    return { title: "할 일 없음" };
  }
  return { title: task.title };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  const task = await getTask(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link href="/tasks" className="mb-4 inline-block text-sm text-gray-500 hover:text-blue-600">
        ← 목록으로
      </Link>
      <TaskCard task={task} />
      {/* [추가 시작] */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100"
        >
          수정
        </Link>
        <form action={deleteTaskAction}>
          <input type="hidden" name="id" value={task.id} />
          <button
            type="submit"
            className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            삭제
          </button>
        </form>
      </div>
      {/* [추가 끝] */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">댓글</h2>
        <Suspense fallback={<CommentsSkeleton />}>
          <TaskComments taskId={task.id} />
        </Suspense>
        {/* [추가] */}
        <CommentForm taskId={task.id} />
      </section>
    </div>
  );
}