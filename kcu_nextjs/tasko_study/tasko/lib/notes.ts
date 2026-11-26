export interface Note {
  id: number;
  text: string;
}

let notes: Note[] = [
  { id: 1, text: "5장 실습 끝!"},
  { id: 2, text: "서버 액션 복습하기"},
];
let nextNoteId = 3;

export async function getNotes(): Promise<Note[]> {
  return notes;
}

export async function addNote(text:string): Promise<void> {
  const note: Note = {id : nextNoteId, text: text};
  nextNoteId = nextNoteId +1;
  const next = notes.slice();
  next.push(note);
  notes = next;
}