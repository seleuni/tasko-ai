// app/lab/5-3-error/broken/page.tsx
export const dynamic = "force-dynamic";

export default function BrokenPage() {
  const ok = false;

  if (!ok) {
    throw new Error("일부러 낸 오류");
  }

  return <h1 className="p-8 text-2xl">정상 화면</h1>;
}
