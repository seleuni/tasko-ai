// src/main.ts
export {};

type UserRole = "admin" | "teacher" | "student" | "chairman";
type Point = { x: number; y: number };

const role: UserRole = "chairman";
const point: Point = { x: 10, y: 20 };
console.log(role, point);
