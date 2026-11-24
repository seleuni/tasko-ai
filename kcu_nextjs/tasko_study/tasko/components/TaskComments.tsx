// components/TaskComments.tsx
// import CommentList from "@/components/CommentList";
import CommentSection from "@/components/CommentSection";
import { getComments } from "@/lib/data";

interface TaskCommentsProps {
  taskId: number;
}

export default async function TaskComments({ taskId }: TaskCommentsProps) {
  const comments = await getComments(taskId);
//  return <CommentList comments={comments} />;
return <CommentSection taskId={taskId} comments={comments} />;
}