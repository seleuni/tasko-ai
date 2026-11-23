// app/lab/5-4-actions/hello-action/actions.ts
"use server";

export async function sayHelloAction(formData: FormData) {
  const value = formData.get("name");
  let userName = "";
  if (typeof value === "string") {
    userName = value.trim();
  }
  console.log("서버 액션 실행됨. 이름:", userName);
}