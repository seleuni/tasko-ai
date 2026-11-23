// components/CommentList.tsx
import type { Comment } from "@/lib/types";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-1 flex justify-between text-xs text-gray-400">
            <span className="font-medium text-gray-700">{comment.author}</span>
            <span>{comment.createdAt}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
