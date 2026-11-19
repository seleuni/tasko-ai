// src/main.ts
export {};

interface User {
  id: number;
  name: string;
  nickname?: string; // 선택적 속성(7.2절)
}

const user: User = { id: 1, name: "홍길동" };
console.log(user);
