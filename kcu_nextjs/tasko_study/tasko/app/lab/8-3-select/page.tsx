import Link from "next/link";

export default function SelectLabPag() {
  return (
    <div>
    <h1 className="mb-4 text-2xl font-bold"> 8.3 SQL 실행과 Kysely 조회</h1>
    <ul className="space-y-2 text-blue-600">
    <li><Link href="/lab/8-3-select/compare" className="hover:underline">글자 SQL과 Kysely 비교(compare)</Link></li>
     <li><Link href="/lab/8-3-select/compare" className="hover:underline">조건, 정렬, 개수 제한(where)</Link></li>
      <li><Link href="/lab/8-3-select/compare" className="hover:underline">실행 메서드와 쿼리 다시 담기</Link></li>
       <li><Link href="/lab/8-3-select/compare" className="hover:underline">JOIN과 GROUP BY 단계별로 보기</Link></li>
    </ul>
    </div>
  );
}