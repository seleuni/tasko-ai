// app/lab/6-1-parallel/page.tsx
import Link from "next/link";

export default function ParallelLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">6.1 병렬 라우트</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/6-1-parallel/dash" className="hover:underline">두 화면을 한 레이아웃에 (dash)</Link></li>
      </ul>
    </div>
  );
}