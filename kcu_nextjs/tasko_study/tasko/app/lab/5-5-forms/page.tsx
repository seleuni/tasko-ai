import Link from "next/link";

export default function FormsLabPage() {
  return (
    <div>
      <h1>5.5 폼상태 다루기</h1>
      <ul>
        <li><Link href="/lab/5-5-forms/hello-form">useActionState/useFromStatus</Link></li>
        <li><Link href="/lab/5-5-forms/hello-optimistic">usePotimstic</Link></li>
      </ul>
    </div>
  );
}