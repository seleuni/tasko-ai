// app/lab/6-2-intercepting/gallery/@modal/(.)[id]/page.tsx
interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: PhotoModalProps) {
  const { id } = await params;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="rounded bg-white p-8">
        <h2 className="text-xl">사진 {id} (가로챈 화면)</h2>
        <p className="mt-2 text-sm text-gray-500">브라우저의 뒤로 가기로 닫는다.</p>
      </div>
    </div>
  );
}