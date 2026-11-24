// app/tasks/layout.tsx
import type { ReactNode } from "react";

interface TasksLayoutProps {
  children: ReactNode;
  stats: ReactNode;
  modal: ReactNode;
}

export default function TasksLayout({ children,stats, modal }: TasksLayoutProps) {
  // return <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>;
  return (
  <main className="mx-auto max-w-5xl px-4 py-8">
    {stats}
    {children}
    {modal}
  </main>
  );
}