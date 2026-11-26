import {db} from "@/lib/db";
import ResultTable from "../result-table";

export const dynamic = "force-dynamic";

export default async function  TakePage() {
  const listRows = await db.selectFrom("lab_tasks").select(["id", "title"]).
  where("id","<=", 2).execute(); //1,2번의 할 일 구하기

  const firstRow = await db.selectFrom("lab_tasks").select(["id","title"]).
  where("id","=", 2).executeTakeFirst(); //2번 할 일 얻기

  const missingRow = await db.selectFrom("lab_tasks").select(["id","title"]).
  where("id","=", 999).executeTakeFirst(); //999번 할 일 얻기, 결론: 없음

  let throwMessage = "";
  try {
    await db.selectFrom("lab_tasks").select(["id", "title"]).where("id","=",999).executeTakeFirstOrThrow(); //999번 할 일 얻기 , 결론: 없음 =>throw 발생(예외발생)
  } catch(error) {
    if (error instanceof Error) {
      throwMessage = `오류 ${error.name} : ${error.message}`;
    }
  }

  const results = [
    {method: "execute() => id <=2", value: JSON.stringify(listRows)},
    {method: "executeTakeFirst() => id =2", value: JSON.stringify(firstRow)},
    {method: "executeTakeFirst() => id =999", value: JSON.stringify(missingRow)},
    {method: "executeTakeFirstOrThrow() => id =999", value: throwMessage},
  ];

  const forgot = db.selectFrom("lab_tasks").select(["id","title"]);
  forgot.where("status", "=", "done");

  let saved = db.selectFrom("lab_tasks").select(["id","title"]);
  saved = saved.where("status", "=", "done");

  return (
    <div>
      <h1>실행메서드와 쿼리 다시담기</h1>

      <table className="mb-8 w-full border-collapse text-sm">
        <tbody>
          {
            results.map(
              (result)=>(
                <tr key={result.method}>
                  <td className="border">
                    {result.method}
                  </td>
                  <td className="border">
                    {result.value}
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>

      <ResultTable title="다시 안담기" sql={forgot.compile().sql} parameters = {forgot.compile().parameters} rows={await forgot.execute()}/>

      <ResultTable title="다시 담기" sql={saved.compile().sql} parameters = {saved.compile().parameters} rows={await saved.execute()}/>
    </div>
  )
  
}