// app/lab/5-2-streaming/partial/page.tsx
import { Suspense } from "react";

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function SlowPart() {
  await wait(2000);
  return <p className="text-green-700">느린 부분이 도착했다</p>;
}

export default function PartialPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl">제목은 바로 보인다</h1>
      <Suspense fallback={<p className="text-gray-500">느린 부분 불러오는 중...</p>}>
        <SlowPart />
      </Suspense>
    </div>
  );
}