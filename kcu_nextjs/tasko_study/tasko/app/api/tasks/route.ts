// app/api/tasks/route.ts
import { getTasks } from "@/lib/data";
import { parsePage, parseStatus } from "@/lib/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = parseStatus(url.searchParams.get("status"));
  const page = parsePage(url.searchParams.get("page"));
  const result = await getTasks(status, page);
  return Response.json(result);
}