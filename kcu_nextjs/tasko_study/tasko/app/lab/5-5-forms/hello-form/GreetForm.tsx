// app/lab/5-5-forms/hello-form/GreetForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { greetAction } from "./actions";
import type { GreetState } from "./types";

const initialState: GreetState = { message: "", error:"" };


function SubmitButton(){
  const {pending} = useFormStatus();
  let text = "인사하기";
  if(pending){
    text="보내는 중...";
  }
  return (
    <button type="submit" disabled={pending} className="bg-blue-500 text-white px-4 py-2 rounded">
      {text}
    </button>
  )

}

export default function GreetForm() {
  const [state, formAction] = useActionState(greetAction, initialState);

  let resultBox = null;

  
  if(state.error !== ""){
    //에러가 존재하면
    resultBox = <p className="mt-4 text-red-600">{state.error}</p>
  }
  if(state.message !== ""){
    //성공시
    resultBox = <p className="mt-4 text-green-600">{state.message}</p>
  }
  //resultBox <p


  return (
    <form action={formAction} className="p-8">
      <input name="name" placeholder="이름을 입력하세요" className="mr-2 rounded border px-3 py-2"/>
      <SubmitButton/>
      {resultBox}
    </form>
  );
}

