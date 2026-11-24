// app/lab/6-2-intercepting/gallery/page.tsx
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl">갤러리 목록</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/lab/6-2-intercepting/gallery/1" className="text-blue-600 underline">
            사진 1
          </Link>
        </li>
        <li>
          <Link href="/lab/6-2-intercepting/gallery/2" className="text-blue-600 underline">
            사진 2
          </Link>
        </li>
      </ul>
    </div>
  );
}