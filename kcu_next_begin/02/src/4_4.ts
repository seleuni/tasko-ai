export {};

let a: any = "hello";
console.log(a.toUpperCase()); //허용(어떤 검사도 안 함, 위험)
a=123; //허용
console.log(a.toUpperCase());