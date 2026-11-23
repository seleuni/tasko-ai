// components/StatusSelect.tsx
"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

interface StatusSelectProps {
  current?: string;
}

export default function StatusSelect({ current }: StatusSelectProps) {
  const router = useRouter();
  // [추가]
  console.log("클라이언트 컴포넌트 StatusSelect 실행, current:", current);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "") {
      router.push("/tasks");
    } else {
      router.push(`/tasks?status=${value}`);
    }
  }

  let selected = "";
  if (current !== undefined) {
    selected = current;
  }

  return (
    <select value={selected} onChange={handleChange} className="mb-6 rounded-md border border-gray-300 px-3 py-2">
      <option value="">전체</option>
      <option value="todo">할 일</option>
      <option value="doing">진행 중</option>
      <option value="done">완료</option>
    </select>
  );
}