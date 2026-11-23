// app/lab/4-3-server-client/mix/page.tsx
import Counter from "./Counter";

export default function MixPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">서버가 그린 제목</h1>
      <Counter start={10} />
    </div>
  );
}