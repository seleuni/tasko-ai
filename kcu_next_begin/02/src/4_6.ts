export {};

function format(value: string | number) {
  console.log("타입", typeof value);
  
  if(typeof value === "number") {return value.toFixed(2); }
    return value.trim();
}

function hasEmail(obj: object): boolean {
  return "email" in obj; // in으로 속성 존재 확인
}

console.log(format(3.14159));
console.log("[",format("       안녕   "), "]");
console.log(hasEmail({ email: "a@b.com" }));
console.log(hasEmail({ name: "홍길동" }));