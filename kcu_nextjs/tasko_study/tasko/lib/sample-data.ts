// lib/sample-data.ts
import type { Task } from "@/lib/types";

export const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Next.js 설치하기",
    content: "create-next-app@16으로 tasko 프로젝트를 만든다.",
    status: "done",
    assignee: "보그쌤",
    createdAt: "2026-11-15",
  },
  {
    id: 2,
    title: "TypeScript 복습하기",
    content: "웹개발기초 7장의 타입 문법을 다시 본다.",
    status: "doing",
    assignee: "김민수",
    createdAt: "2026-11-16",
  },
  {
    id: 3,
    title: "Tailwind CSS 복습하기",
    content: "웹개발기초 6장의 유틸리티 클래스를 다시 본다.",
    status: "todo",
    assignee: "이지은",
    createdAt: "2026-11-17",
  },
];
