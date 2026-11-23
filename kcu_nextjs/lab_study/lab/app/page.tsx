// app/page.tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-brand">tasko</h1>
      <p className="mb-8 text-lg text-gray-600">
        할 일을 만들고, 진행 상태를 바꾸고, 댓글로 이야기하는 할 일 관리 앱
      </p>
      <a
        href="/tasks"
        className="inline-block rounded-md bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-dark"
      >
        할 일 보러 가기
      </a>
    </main>
  );
}
