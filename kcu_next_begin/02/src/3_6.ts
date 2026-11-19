// src/main.ts
export {};

interface Animal { name: string; age:number; color?:string }
interface Dog extends Animal { breed: string; } // interface는 extends로 확장

const dog: Dog = { name: "초코", breed: "푸들", age:24 };
console.log(dog);
