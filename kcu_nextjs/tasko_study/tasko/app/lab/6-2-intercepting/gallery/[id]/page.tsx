// app/lab/6-2-intercepting/gallery/[id]/page.tsx
interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl">사진 {id} 상세 페이지</h1>
      <p className="mt-2 text-gray-600">전체 화면으로 열린 원래 페이지다.</p>
    </div>
  );
}