// src/main.ts
export {};

function add(a: number, b: number): number { return a + b; }
console.log(add(1, 2));


const button = document.querySelector("button"); // 타입: HTMLButtonElement | null
const el = document.querySelector("#box");        // 타입: Element | null (더 구체적으로 모름)

console.log(button, el);

// src/main.ts (아래에 이어서 추가)
// 방법 1: 타입 단언(확실할 때만)
const input = document.querySelector("#email") as HTMLInputElement;

// 방법 2: null 검사(더 안전)
const btn = document.querySelector("#submitBtn");
if (btn) {
  btn.addEventListener("click", (event: Event) => {
    event.preventDefault();
    console.log("btn:제출 버튼을 눌렀다"); // 이 블록 안에서는 null이 아님이 보장됨\
    console.log(input.value);
    input.value = "abc@kingdom.com";
    alert('');
  });
}

// src/main.ts (아래에 이어서 추가)
button?.addEventListener("click", (event: MouseEvent) => { // button은 null일 수 있어 ?.로 호출(4.6절 옵셔널 체이닝)
  console.log(event.target);
});

input.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
});
