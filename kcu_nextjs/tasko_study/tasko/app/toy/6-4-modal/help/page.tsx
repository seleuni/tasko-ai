import type { Metadata } from "next";
import Link from "next/link";
import HelpContent from "@/components/HelpContent";

export const metadata: Metadata = {
  title: "도움말"
};

export default function HelpPage() {
  return(
    <>
    <Link href="/toy/6-4-modal" className="text-sm text-gray-500 hover:text-blue-600">
      ← 목록으로
    </Link>
    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
      <HelpContent/>
    </div>
      </>
  );
}