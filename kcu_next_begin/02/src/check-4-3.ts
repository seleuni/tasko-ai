export{};

function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(1);
}

console.log(format("abc"));
console.log(format(3));
