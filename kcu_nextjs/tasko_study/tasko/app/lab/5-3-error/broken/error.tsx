// app/lab/5-3-error/broken/error.tsx
"use client";

interface BrokenErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BrokenError({ error, reset }: BrokenErrorProps) {
  return (
    <div className="m-8 rounded border border-red-200 bg-red-50 p-6">
      <h2 className="mb-2 font-semibold text-red-700">문제가 생겼습니다</h2>
      <p className="mb-4 text-sm text-red-600">{error.message}</p>
      <button onClick={reset} className="rounded bg-red-600 px-4 py-2 text-white">
        다시 시도
      </button>
    </div>
  );
}
