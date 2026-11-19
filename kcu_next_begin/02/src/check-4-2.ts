export {};

function describe(value: unknown): string {
  if (typeof value === "string"){
    return `문자열: ${value}`;
  }
  if (typeof value === "number"){
    return `숫자: ${value}`;
  }
  return "알 수 없는 값";
} 

console.log(describe("hello"));
console.log(describe(42));
console.log(describe(true));