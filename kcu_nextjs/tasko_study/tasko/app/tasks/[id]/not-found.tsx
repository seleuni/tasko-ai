// app/tasks/[id]/not-found.tsx
import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="py-12 text-center">
      <h2 className="mb-2 text-xl font-semibold">할 일을 찾을 수 없습니다.</h2>
      <p className="mb-6 text-gray-500">지워졌거나 잘못된 번호입니다.</p>
      <Link href="/tasks" className="text-blue-600 hover:underline">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
