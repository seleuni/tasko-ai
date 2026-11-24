// app/lab/5-6-route-handler/api/fruits/[id]/route.ts
const fruits = ["사과", "바나나", "포도"];

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const index = Number(id) - 1;

  if (index < 0 || index >= fruits.length) {
    return Response.json({ error: "과일을 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json({ id: Number(id), name: fruits[index] });
}