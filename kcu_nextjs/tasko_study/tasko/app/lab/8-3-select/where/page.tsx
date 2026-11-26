import { db } from  "@/lib/db";
import ResultTable from "../result-table";

export const dynamic = "force-dynamic";

export default async function WherePage() {
  const q1 = db.selectFrom("lab_tasks").select(["id", "title", "status"]).where("status", "!=", "done");

  const q2 = db.selectFrom("lab_tasks").select(["id", "title", "assignee"]).where("assignee", "in", ["김민수", "이지은"]);

  const q3 = db.selectFrom("lab_tasks").select(["id", "title"]).where("title", "like", "%복습%");

  const q4 = db
  .selectFrom("lab_tasks")
  .select(["id", "title", "status","assignee"])
  .where("status","=", "doing")
  .where("assignee","=","보그쌤")  

  const q5 = db
  .selectFrom("lab_tasks")
  .select(["id", "title", "created_at"])
  .orderBy("created_at","desc")
  .orderBy("id", "asc")
  .limit(3);

  const c1 = q1.compile();
  const c2 = q2.compile();
  const c3 = q3.compile();
  const c4 = q4.compile();
  const c5 = q5.compile();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">조건, 정렬, 개수 제한</h1>
      <ResultTable title="① ! = : 완료가 아닌 것" sql={c1.sql} parameters={c1.parameters} rows={await q1.execute()}/>
      <ResultTable title="② in : 목록 안에 있는 것" sql={c2.sql} parameters={c2.parameters} rows={await q2.execute()}/>
      <ResultTable title="③ like : 글자가 들어 있는 것" sql={c3.sql} parameters={c3.parameters} rows={await q3.execute()}/>
      <ResultTable title="④ where 두 번 : 두 조건 모드(and)" sql={c4.sql} parameters={c4.parameters} rows={await q4.execute()}/>
      <ResultTable title="⑤ orderBy, limit : 최근 날짜 3개" sql={c5.sql} parameters={c5.parameters} rows={await q5.execute()}/>
    </div>
  );
}