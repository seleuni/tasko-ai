"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { addNoteAction } from "@/lib/note-actions";

export default function NoteForm() {
  const [state, formAction] = useActionState(addNoteAction, {error: ""});

  let errorBox = null;
  if (state.error !=="") {
    errorBox = <p className="mb-3 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>;
  }

  return (
    <form action={formAction} className="rounded-xl border border-gray-200 bg-white p-5">
      {errorBox}
      <div className="flex gap-2">
        <input 
        name="text"
        placeholder="한 줄 메모(30자까지)"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
        />
        <SubmitButton label="남기기"/>
      </div>
    </form>
  );
}