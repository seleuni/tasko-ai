// app/tasks/loading.tsx
import TaskListSkeleton from "@/components/TaskListSkeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />
      <TaskListSkeleton />
    </>
  );
}