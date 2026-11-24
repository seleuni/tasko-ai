import Link from "next/link";

export default function HelpListPage() {
  return(
    <>
      <h1 className="mb-4 text-2xl font-bold">도움말 모달 연습</h1>
      <Link href="/toy/6-4-modal/help" className="text-blue-600 hover:underline">
      도움말 열기
      </Link>
    </>
  );
}