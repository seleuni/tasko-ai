export {};

type TaskId = number;

interface Task {
  id: number;
  title: string;
  done: boolean;
  memo?: string;
}

const task: Task = {id:1, title:'타입 공부하기', done:false}
console.log(task);
