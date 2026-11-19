export {};

function log(message: string): void {console.log(message);}
function fail(): never {throw new Error("수업 중 예외 발생");}

try{
  log("void 함수는 리턴하지 않습니다.")
  fail(); //에러 발생
} catch(error) {
  console.error(`에러 발생: ${error}`);
} finally {
  console.log("무조건 실행되는 코드");
}