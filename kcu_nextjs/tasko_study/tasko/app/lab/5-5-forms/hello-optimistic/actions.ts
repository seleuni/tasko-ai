"use server";

import { revalidatePath } from "next/cache";
import { messages } from "./store";


export async function addMessageAction(formData:FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1500)); //1.5초 대기(테스트용)  

  const value = formData.get( "message");
  let text = "";
  if(typeof value === "string"){
    text = value.trim();
  }
  if(text === ""){
    return;
  }
  
  messages.push(text);
  revalidatePath("/lab/5-5-forms/hello-optimistic");
}
