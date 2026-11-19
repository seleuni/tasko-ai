// src/main.ts
export {};

interface User {
  id: number;
  name: string;
  nickname?: string;
}

type ID = string | number;         // 유니온: 둘 중 하나


const id: ID = 1234; //"abc-123";
const hgd : User = {id: 1, name: "홍길동"};

type AdminUser = User & { role: "admin" }; // 교차: 둘 다 만족
const admin: AdminUser = { id: 1, name: "관리자", role: "admin" };
console.log(id, admin);
