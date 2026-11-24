"use server";

import {revalidatePath} from "next/cache";
import { addNote } from "@/lib/notes";

export interface NoteState {
  error: string;
}

export async function addNoteAction(prevState: NoteState, formData: FormData): Promise<NoteState> {
  const value = formData.get("text");
  let text = "";
  if (typeof value === "string") {
    text = value.trim();
  }

  if (text === "") {
    return {error: "메모를 입력하세요."};
  }
  if (text.length >30) {
    return {error: "메모는 30자까지 쓸 수 있습니다."};
  }

  await addNote(text);
  revalidatePath("/toy/5-8-notes");
  return {error: ""};
}