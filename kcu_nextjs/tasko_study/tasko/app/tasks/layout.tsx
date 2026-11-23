// app/tasks/layout.tsx
import type { ReactNode } from "react";

interface TasksLayoutProps {
  children: ReactNode;
}

export default function TasksLayout({ children }: TasksLayoutProps) {
  return <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>;
}