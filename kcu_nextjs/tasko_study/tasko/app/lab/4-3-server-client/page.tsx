// app/lab/4-3-server-client/page.tsx
import Link from "next/link";

export default function ServerClientLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">4.3 서버 컴포넌트와 클라이언트 컴포넌트</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/4-3-server-client/counter" className="hover:underline">use client 붙이기 (counter)</Link></li>
        <li><Link href="/lab/4-3-server-client/mix" className="hover:underline">둘을 섞어 쓰기 (mix)</Link></li>
      </ul>
    </div>
  );
}