// app/tasks/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import StatusFilter from "@/components/StatusFilter";
import TaskList from "@/components/TaskList";
import Pagination from "@/components/Pagination";
import { getTasks } from "@/lib/data";
import { parseStatus } from "@/lib/types";

interface TasksPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;
  const status = parseStatus(params.status);
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  const result = await getTasks(status, page);

  return (
    <>
      {/* [수정 시작] 이전: <h1 className="mb-6 text-2xl font-bold">할 일 목록</h1> */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">할 일 목록</h1>
        <Link href="/tasks/new" className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          새 할 일
        </Link>
      </div>
      {/* [수정 끝] */}
      <StatusFilter current={status} />
      <Section title={`${result.total}개`}>
        <TaskList tasks={result.tasks} />
      </Section>
      <Pagination total={result.total} page={page} status={status} />
    </>
  );
}