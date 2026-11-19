// src/main.ts
export {};

function identity<T>(value: T): T {
  console.log("타입 =>", typeof value)
  return value;
}

console.log(identity<number>(100)); // T가 number로 고정
console.log(identity("문자열"));     // T가 string으로 자동 추론
