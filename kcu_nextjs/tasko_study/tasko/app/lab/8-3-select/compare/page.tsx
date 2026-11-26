import Database from "better-sqlite3";
import {db} from "@/lib/db";
import ResultTable from "../result-table";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  let file = "tasko.db";
  if (process.env.DATABASE_FILE) {
    file = process.env.DATABASE_FILE;
  }
  const sqlite = new Database(file);

  const allSql = "SELECT id, title, status FROM lab_tasks WHERE status = ?";
  const allRows = sqlite.prepare(allSql).all("done") as object[];

  const getSql = "SELECT id, title, assignee FROM lab_tasks WHERE id = ?";
  const oneRow = sqlite.prepare(getSql).get(2) as object | undefined; // 처음 한건
  const getRows: object[] = [];  //object의 배열값으로 초기값 []
  if (oneRow) {
    getRows.push(oneRow);
  }

  sqlite.close();

  const query = db.selectFrom("lab_tasks").select(["id", "title", "status"]).where("status", "=", "done");
  const compiled = query.compile(); //사전에 sql 문법 검사 = > ... 객체 생성
  const kyselyRows = await query.execute(); // 데이터베이스에 요청해서 결과를 받기

  return (
    <div>
      <h1 className="mb-4  text-2xl font-bold">글자 SQL과 Kysely 비교</h1>
      <ResultTable title="① better-sqlite3 prepare(...).all(): 여러 행" sql={allSql} parameters={["done"]} rows={allRows} />
      <ResultTable title="② better-sqlite3 prepare(...).get(): 첫 행 하나" sql={getSql} parameters={[2]} rows={getRows} />
      <ResultTable title="③ Kysely로 ①과 같은 조회" sql={compiled.sql} parameters={compiled.parameters} rows={kyselyRows} />
    </div>
  );
}