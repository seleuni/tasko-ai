// src/main.ts
export {};

function greet(name: string, greeting?: string) { // ?로 선택적 매개변수
  return `${greeting ?? "안녕"}, ${name}!`;
}
function greet2(name: string, greeting = "안녕") { // 기본값(4.4절과 동일 문법)
  return `${greeting}, ${name}!`;
}

console.log(greet("홍길동"));
console.log(greet("홍길동", "반갑습니다"));
console.log(greet2("김철수"));
console.log(greet2("김철수", "반갑습니다"));
