import TaskCard from "@/components/TaskCard";
//import type { Task } from "@/lib/types";
import type { Task } from "@/lib/types";

interface TaskListProps {
  // commentCount가 없는 Task[]와 있는 TaskWithCount[] 모두 받는다
  tasks: (Task & { commentCount?: number })[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks. length === 0) {
    return <p className="py-12 text-center text-gray-500">할 일이 없습니다.</p>;
}

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
       // <TaskCard key={task.id} task={task} />
       <TaskCard key={task.id} task={task} commentCount={task.commentCount}/>
      ))}
    </div>
  );
}
