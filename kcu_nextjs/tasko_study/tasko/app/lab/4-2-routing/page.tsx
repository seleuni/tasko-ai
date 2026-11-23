// app/lab/4-2-routing/page.tsx
import Link from "next/link";

export default function RoutingLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">4.2 라우팅과 레이아웃</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/4-2-routing/hello" className="hover:underline">폴더가 주소가 된다 (hello)</Link></li>
        <li><Link href="/lab/4-2-routing/users/alice" className="hover:underline">동적 세그먼트 (users/alice)</Link></li>
        <li><Link href="/lab/4-2-routing/search?status=done&page=2" className="hover:underline">주소 쿼리 (search)</Link></li>
        <li><Link href="/lab/4-2-routing/intro" className="hover:underline">라우트 그룹 (intro)</Link></li>
      </ul>
    </div>
  );
}