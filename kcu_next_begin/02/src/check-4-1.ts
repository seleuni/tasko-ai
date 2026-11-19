export{};

function greet (userName: string, greeting: string="안녕하세요") : string{
  return `${greeting}, ${userName}!`;
}

console.log(greet("홍길동"));
console.log(greet("김철수", "반갑습니다"));
// console.log(greet(123));