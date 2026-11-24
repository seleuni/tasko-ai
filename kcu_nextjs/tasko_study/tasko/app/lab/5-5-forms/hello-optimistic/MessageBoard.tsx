"use client";

import { useOptimistic } from "react";
import { addMessageAction } from "./actions";

interface MessageBoardProps {
  messages: string[];
}

export default function MessageBoard({messages}: MessageBoardProps) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, addToList);

  function addToList(current: string[], newMessage:string): string[] {
    const next = current.slice();
    next.push(newMessage + "(저장 중...)");
    return next;
  }

  async function handleAdd(formData: FormData) {
    const value = formData.get("message");
    if (typeof value === "string" && value.trim() !== "") {
      // 서버 응답 전에 화면에 먼저 반영 (낙관적 업데이트)
      addOptimisticMessage(value.trim());
    }
    await addMessageAction(formData);
  }

  return (
    <div className="p-8">
      <form className="mb-4" action={handleAdd}>
        <input
          name="message"
          placeholder="메시지"
          className="mr-2 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </form>
      <ul className="list-disc pl-6">
        {optimisticMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
