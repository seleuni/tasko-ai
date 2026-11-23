// app/lab/5-2-streaming/slow/page.tsx
async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function SlowPage() {
  await wait(2000);
  return <h1 className="p-8 text-2xl">2초 뒤에 나온 화면</h1>;
}