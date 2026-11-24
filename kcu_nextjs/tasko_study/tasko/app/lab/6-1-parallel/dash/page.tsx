// app/lab/6-1-parallel/dash/page.tsx
import Link from "next/link";

export default function DashPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl">메인 영역 (children)</h1>
      <Link href="/lab/6-1-parallel/dash/detail" className="text-blue-600 underline">
        상세로 가기
      </Link>
    </div>
  );
}