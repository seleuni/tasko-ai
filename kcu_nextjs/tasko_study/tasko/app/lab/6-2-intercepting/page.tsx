// app/lab/6-2-intercepting/page.tsx
import Link from "next/link";

export default function InterceptingLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">6.2 인터셉팅 라우트</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/6-2-intercepting/gallery" className="hover:underline">주소 가로채기 (gallery)</Link></li>
      </ul>
    </div>
  );
}