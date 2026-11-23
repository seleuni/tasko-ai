// app/tasks/error.tsx
"use client";

interface TasksErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TasksError({ error, reset }: TasksErrorProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="mb-2 text-lg font-semibold text-red-700">할 일을 불러오지 못했습니다.</h2>
      <p className="mb-6 text-sm text-red-600">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
      >
        다시 시도
      </button>
    </div>
  );
}
