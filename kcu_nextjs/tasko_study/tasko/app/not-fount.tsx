// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="mb-2 text-2xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <p className="mb-6 text-gray-500">주소를 다시 확인해 주세요.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        첫 화면으로
      </Link>
    </main>
  );
}
