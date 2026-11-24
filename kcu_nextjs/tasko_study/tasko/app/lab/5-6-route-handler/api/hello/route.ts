// app/lab/5-6-route-handler/api/hello/route.ts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");

  let userName = "아무개";
  if (name !== null && name !== "") {
    userName = name;
  }

  return Response.json({ message: `안녕하세요, ${userName}님!` });
}