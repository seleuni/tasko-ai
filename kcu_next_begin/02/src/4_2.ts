export{};

type Fn = (a:number, b:number) => number;
const add: Fn = (a,b) => a+b;
const sub: Fn = (a,b) => a-b;
const mul: Fn = (a,b) => a*b;
const div: Fn = (a,b) => a/b;

console.log(add(1,2));
console.log(sub(1,2));

function doItems(items:string[], callback:(item:string)=>void) {//문자열의 배열 stiring[], 값이 x
  for(const item of items) {
    callback(item);
}
}

console.log("1************")
doItems(["a", "b", "c"], (item)=> {console.log("문자:", item)});
console.log("2************")
doItems(["a", "b", "c"], (item)=> {console.log("letter:", item)});