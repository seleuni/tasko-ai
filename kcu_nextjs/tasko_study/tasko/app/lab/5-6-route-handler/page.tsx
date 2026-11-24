// app/lab/5-6-route-handler/page.tsx
export default function RouteHandlerLabPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">5.6 Route Handler</h1>
      <p className="mb-2 text-sm text-gray-600">API 주소는 브라우저 주소창에 직접 입력해 연다.</p>
      <ul className="space-y-2 font-mono text-sm">
        <li>/lab/5-6-route-handler/api/hello</li>
        <li>/lab/5-6-route-handler/api/fruits/1</li>
      </ul>
    </div>
  );
}