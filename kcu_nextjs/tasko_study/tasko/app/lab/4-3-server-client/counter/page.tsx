// app/lab/4-3-server-client/counter/page.tsx
"use client"; 
import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <p className="mb-4">횟수: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        +1
      </button>
    </div>
  );
}