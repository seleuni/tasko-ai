import Link from "next/link";
import { PAGE_SIZE } from "@/lib/types";

interface PaginationProps {
  total: number;
  page: number;
  status?: string;
}

function pageHref(page: number, status?: string): string {
  if (status) {
    return `/tasks?status=${status}&page=${page}`;
  }
  return `/tasks?page=${page}`;
}

export default function Pagination({ total, page, status }: PaginationProps) {
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const linkClass = "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100";
  const disabledClass = "rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-300";

  let preButton = <span className={disabledClass}>이전</span>
  if (page>1) {
    preButton = (
      <Link href={pageHref(page - 1,  status)} className={linkClass}> 
      이전
       </Link>
    );
  }

  let nextButton = <span className={disabledClass}>다음</span>;
  if (page< lastPage) {
    nextButton = (
      <Link href={pageHref(page + 1, status)} className={linkClass}> 
      다음
      </Link>
    );
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {preButton}
      <span className="text-sm text-gray-600">
        {page}/{lastPage}
      </span>
      {nextButton}
    </div>
  );
}