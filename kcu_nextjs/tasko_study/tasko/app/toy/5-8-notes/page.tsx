import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "한 줆 메모",
};

export default async function NotesPage(){
  const notes = await getNotes();

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">한 줄 메모</h1>
      <NoteForm/>
      <ul className="mt-6 space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="rounded-lg bg-white px-4 py-3 shadow-sm">
            {note.text}
          </li>
        ))}
      </ul>
    </main>
  );
}