// components/CommentForm.tsx
import { addCommentAction } from "@/lib/actions";

interface CommentFormProps {
  taskId: number;
}

export default function CommentForm({ taskId }: CommentFormProps) {
  const input = "rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none";

  return (
    <form action={addCommentAction} className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input type="hidden" name="taskId" value={taskId} />
      <input name="author" placeholder="이름" className={`${input} sm:w-32`} />
      <input name="content" placeholder="댓글을 입력하세요" className={`${input} flex-1`} />
      <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        등록
      </button>
    </form>
  );
}