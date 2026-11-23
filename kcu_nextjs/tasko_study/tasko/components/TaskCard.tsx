import Link from "next/link";
import { STATUS_LABEL } from "@/lib/types";
import type {Task, TaskStatus} from "@/lib/types";


const STATUS_BADGE:Record<TaskStatus,string> ={
  todo: "bg-slate-500",
  doing: "bg-amber-600",
  done: "bg-green-600"
};

interface TaskCardProps {
  task: Task;
   commentCount?: number;
}

//export default function TaskCard({task}:TaskCardProps){
export default function TaskCard({ task, commentCount }: TaskCardProps) {
  let commentText = null;
  if (commentCount !== undefined) {
    commentText = <span>댓글 {commentCount}</span>;
  }
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${STATUS_BADGE[task.status]}`}>
          {STATUS_LABEL[task.status]}
        </span>
        <span className="text-xs text-gray-400">{task.createdAt}</span>
      </div>
      <h2 className="mb-1 text-lg font-semibold">
        <Link href={`/tasks/${task.id}`} className="hover:text-blue-600">
          {task.title}
        </Link>
      </h2>
      <p className="mb-4 text-sm text-gray-600">{task.content}</p>
      {/* [수정 시작] 이전: <p className="text-sm text-gray-500">담당: {task.assignee}</p> */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>담당: {task.assignee}</span>
        {commentText}
      </div>
    </article>
  );
}

