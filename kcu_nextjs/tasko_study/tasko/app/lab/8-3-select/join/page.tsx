import {db} from "@/lib/db";
import ResultTable from "../result-table";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
    const left = db
    .selectFrom("lab_tasks")
    .leftJoin("lab_comments", "lab_comments.task_id", "lab_tasks.id")
    .select(["lab_tasks.id", "lab_tasks.title", "lab_comments.id as comment_id","lab_comments.author"])
    .orderBy("lab_tasks.id", 'asc')
    .orderBy("lab_comments.id", "asc");
    const c1 = left.compile();

    const inner = db
    .selectFrom("lab_tasks")
    .innerJoin("lab_comments", "lab_comments.task_id", "lab_tasks.id")
    .select(["lab_tasks.id", "lab_tasks.title", "lab_comments.id as comment_id","lab_comments.author"])
    .orderBy("lab_tasks.id", 'asc')
    .orderBy("lab_comments.id", "asc");
    const c2 = inner.compile();

    const grouped = db
    .selectFrom("lab_tasks")
    .leftJoin("lab_comments", "lab_comments.task_id", "lab_tasks.id")
    .select(["lab_tasks.id", "lab_tasks.title"])
    .select((eb)=>eb.fn.countAll<number>().as("count_all"))
    .select((eb)=>eb.fn.count<number>("lab_comments.id").as("comment_count"))
    .groupBy("lab_tasks.id")
    .orderBy("lab_tasks.id", "asc")
    const c3 = grouped.compile();


  return (
    <div>
      <ResultTable title="1." sql={c1.sql} parameters={c1.parameters} rows={await left.execute()}/>
      <ResultTable title="2." sql={c2.sql} parameters={c2.parameters} rows={await inner.execute()}/>
      <ResultTable title="3." sql={c3.sql} parameters={c3.parameters} rows={await grouped.execute()}/>

    </div>
    
  )
}