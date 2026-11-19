// src/main.ts
export {};

let fixedList: readonly number[] = [1, 2, 3];
// fixedList.push(4); // 오류! readonly라 수정 메서드 자체가 막힌다

console.log(fixedList);
