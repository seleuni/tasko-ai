export default function HelpContent() {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">tasko 사용법</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
        <li>목록 위의 상태 필터로 할 일을 골라 본다.</li>
        <li>할 일 제목을 누르면 상세 내용이 모달로 열린다.</li>
        <li>새 할 일 버튼으로 할 일을 추가한다.</li>
        <li>상세 화면에서 댓글을 달고, 수정하거나 삭제한다.</li>
      </ul>
    </div>
  );
}