import { Describe } from "next/dist/compiled/superstruct";

type TaskStatus = "todo" | "doing" | "done"; //유니온으로 할일 상태(할일,진행,완료)

//할일 객체

interface Task{
  id: number; //일련번호
  title: string; //제목 
  status: TaskStatus; //상태 유니온
  assignee: string; //담당자
  memo?: string; //메모 (선택)
}

//상태 라벨명
const STATUtS_LABEL : Record<TaskStatus, string> = {
  todo: "할일",
  doing: "진행중",
  done: "완료",
}

//할일 목록
const tasks: Task[] = [
  { id: 1,   title: "넥스트js설치",  status: "done",   assignee: "김유진"},
  { id: 2,   title: "TypeScript복습하기",  status: "doing",   assignee: "김민수",  memo: "웹개발기초7장" },
  { id: 3,   title: "Tailwind CSS 복습하기 ",  status: "todo",   assignee: "이지은" }
];

function countByStatus(list: Task[], status: TaskStatus): number {
  let count = 0;
  for(const task of list){
    if(task.status === status){
      count = count +1;
    }
  }
  return count;
}

function firstItem<T>(list: T[]): T | undefined{
  return list[0];
}

function taskLine(task:Task):string{
  let line = `[${SATUTS_LABEL[task.status]}] ${task.title} (${task.assignee})`;
  if(task.memo !=undefined) 
    // 여기 못했는디

  return Line;
}

export default function TypesPracticePage(){
  const first = firstItem(tasks);
  let firstTitle = "없음";
  if( first !=undefined) {
    firstTitle = first.title;
  }
  return (
    <main style={{padding:24}}>
      <h1>TypeScript요점정리</h1>
      <p> 전체할일 {tasks.length}개</p>
      <p>완료: {countByStatus(tasks, "done")}개</p>
      <p>진행중: {countByStatus(tasks, "doing")}개</p>
      {/* <p>첫번째 할일: {tasks[0].title}</p> */}
      <p>첫번째 할일: {firstTitle}</p>
      <ul>
        {
          tasks.map ( /* 요소별로 요청가능 */
          (task) => (
            <li key={task.id}>{taskLine(task)}</li>
          )
        )
        }
      </ul>
    </main>
  )
}
