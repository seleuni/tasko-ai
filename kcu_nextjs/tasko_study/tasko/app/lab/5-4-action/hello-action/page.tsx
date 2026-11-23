// app/lab/5-4-actions/hello-action/page.tsx
import { sayHelloAction } from "./actions";

export default function HelloActionPage() {
  return (
    <form action={sayHelloAction} className="p-8">
      <input name="name" placeholder="이름" className="mr-2 rounded border px-3 py-2" />
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        보내기
      </button>
    </form>
  );
}