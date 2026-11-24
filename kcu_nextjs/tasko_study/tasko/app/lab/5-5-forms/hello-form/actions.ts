"use server";

import type { GreetState } from "./types";

export async function greetAction(prevState: GreetState, formData: FormData): Promise<GreetState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const value = formData.get("name");
  let userName="";
  if(typeof value === "string") {
    userName = value.trim();
  }

  if(userName === "") {
    return {message:"", error: "이름을 입력해주세요"};
  }

  if(userName.length > 10) {
    return {message: "", error: "이름은 10글자 이하이어야 합니다."};
  }

  return {message: `안녕하세요, ${userName}님!`, error: ""};
}