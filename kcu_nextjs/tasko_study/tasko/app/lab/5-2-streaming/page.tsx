// app/lab/5-2-streaming/page.tsx
import Link from "next/link";

export default function StreamingLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">5.2 로딩 화면과 스트리밍</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/5-2-streaming/slow" className="hover:underline">loading.tsx로 기다리기 (slow)</Link></li>
        <li><Link href="/lab/5-2-streaming/partial" className="hover:underline">Suspense로 일부만 기다리기 (partial)</Link></li>
      </ul>
    </div>
  );
}