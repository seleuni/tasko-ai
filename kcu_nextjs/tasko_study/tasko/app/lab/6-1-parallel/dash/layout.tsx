// app/lab/6-1-parallel/dash/layout.tsx
import type { ReactNode } from "react";

interface DashLayoutProps {
  children: ReactNode;
  side: ReactNode;
}

export default function DashLayout({ children, side }: DashLayoutProps) {
  return (
    <div className="flex gap-8 p-8">
      <aside className="w-48 rounded bg-gray-100 p-4">{side}</aside>
      <main>{children}</main>
    </div>
  );
}