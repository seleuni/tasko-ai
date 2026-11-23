// app/page.tsx
// [추가]
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">tasko</h1>
      <p className="mb-8 text-lg text-gray-600">
        할 일을 만들고, 진행 상태를 바꾸고, 댓글로 이야기하는 할 일 관리 앱
      </p>
      {/* [수정] 이전: <a */}
      <Link
        href="/tasks"
        className="inline-block rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        할 일 보러 가기
      {/* [수정] 이전: </a> */}
      </Link>
    </main>
  );
}