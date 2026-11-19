export {};

let scores: number[] = [80, 90, 100];
let total = 0;
for (const score of scores) {
  total += score;
}

console.log("합계", total);

let position: [number, number] = [3,4]

console.log(`좌표: x=${position[0]}, y=${position[1]}`)

// position = [3."4"]