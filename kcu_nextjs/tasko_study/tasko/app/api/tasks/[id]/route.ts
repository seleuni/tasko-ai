// app/api/tasks/[id]/route.ts
import { getTask } from "@/lib/data";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const task = await getTask(Number(id));

  if (!task) {
    return Response.json({ error: "할 일을 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json(task);
}