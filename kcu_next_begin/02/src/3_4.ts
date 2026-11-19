export {};

type Result =
  | { status: "성공"; data: string }
  | { status: "오류"; message: string };

function handle(result: Result) {
  if (result.status === "성공") {
    console.log(result.status, ":", result.data);
  } else {
    console.log(result.status, ":", result.message);
  }
}

handle({ status: "성공", data: "저장이 완료되었습니다." });
handle({ status: "오류", message: "카드 비밀번호가 일치하지 않습니다." });
