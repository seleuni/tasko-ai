export {};

type Result =
  | { status: "success"; message: string }
  | { status: "error"; code: number };

function showResult(result: Result): void {
  if (result.status === "success") {
    console.log("성공:", result.message);
  } else {
    console.log("오류 코드:", result.code);
  }
}

showResult({ status: "success", message: "저장 완료" });
showResult({ status: "error", code: 404 });
