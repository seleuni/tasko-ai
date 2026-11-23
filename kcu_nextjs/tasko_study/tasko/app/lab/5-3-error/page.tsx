// app/lab/5-3-error/page.tsx
import Link from "next/link";

export default function ErrorLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">5.3 에러 화면과 없는 페이지</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/5-3-error/broken" className="hover:underline">error.tsx로 오류 받기 (broken)</Link></li>
      </ul>
    </div>
  );
}
