// app/lab/4-3-server-client/mix/Counter.tsx
"use client";

import { useState } from "react";

interface CounterProps {
  start: number;
}

export default function Counter({ start }: CounterProps) {
  const [count, setCount] = useState(start);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      횟수: {count}
    </button>
  );
}