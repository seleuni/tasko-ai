// components/SiteHeader.tsx
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          tasko
        </Link>
        <nav className="flex gap-6 text-gray-700">
          <Link href="/tasks" className="hover:text-blue-600">
            할 일
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}