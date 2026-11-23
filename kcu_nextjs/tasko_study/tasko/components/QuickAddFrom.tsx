"use client";

import {useState} from "react";
import type { ChangeEvent, SubmitEvent} from "react";
import { STATUS_LABEL } from "@/lib/types";
import type {Task, TaskStatus} from "@/lib/types";

export default function QuickAddForm(){
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleTitleChange (e: ChangeEvent<HTMLInputElement>){
  setTitle(e.target.value);
}

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>){
    setStatus(e.target.value as TaskStatus);
  }
  
  function handleSubmit(e: SubmitEvent){
    e.preventDefault();
    //빈입력값 분리하기
    const trimmed = title.trim();
    if(trimmed.length === 0) {
      return
    } 

    //새로운 할일 추가하기
    const newTask: Task = {
      id: tasks.length+1,
      title: trimmed,
      content: "",
      status: status,
      assignee: "홍길동",
      createdAt: "2026-11-20",
    }
      const nextTasks = tasks.slice();
      nextTasks.push(newTask);

      setTasks(nextTasks);
      setTitle("");
      setStatus("todo");

  }
  
  
  return(
    <div style={{padding:24}}>
      <form onSubmit={handleSubmit}>
        <p>QuickAddFrom</p>
        <input type="text" placeholder="할일을 입력하세요" 
        value={title} 
        onChange={handleTitleChange}/> 
        <select value={status} onChange={handleStatusChange}>
          <option value="todo">할일</option>
          <option value="doing">진행중</option>
          <option value="done">완료</option>
        </select>
        <button type="submit">추가</button>
      </form>
      <p>전체 할 일: {tasks.length}개</p>
      <ul>
        {
          tasks.map(
            (task)=>(
              <li key ={task.id}>
                [{STATUS_LABEL[task.status]}]
                {task.title}
              </li>
            )
          )
        }
      </ul>
    </div>
  );
}