// src/main.ts
export {};

let status: "pending" | "success" | "error" = "pending";
//status = "완료"; // 오류! 정해진 세 문자열 외엔 허용되지 않음
status = "error";

console.log(status);
