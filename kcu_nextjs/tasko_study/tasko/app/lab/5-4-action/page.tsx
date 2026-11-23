import Link from "next/link";

export default function ActionsLabPAage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">5.4 서버 액션</h1>
      <ul className="space-y-2 text-blue-600">
        <li><Link href="/lab/5-4-actions/hello-action" className="hover:underline">폼에 서버 액션 연결하기 (hello-action)</Link></li>
      </ul>
    </div>
  );
}