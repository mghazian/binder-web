import { ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { NoteEditor } from "../_components/dynamic_note_editor";

type EditorPageParam = {
  pageTitle: string,
  noteTitle: string,
  onNoteTitleChange: ChangeEventHandler<HTMLInputElement>,
  onNoteContentChange: (e: BlockNoteEditor) => void,
  onSave: MouseEventHandler<HTMLButtonElement>
  initialContent?: PartialBlock[]
}

export default function EditorPageTemplate({ pageTitle, noteTitle, onNoteTitleChange, onSave, onNoteContentChange, initialContent }: EditorPageParam): ReactNode {
  return <div className="w-full h-full flex flex-col items-center">
    <div className="w-full p-2 border-b border-[#E0E0E0] bg-[#FEFEFE] h-[50px]">
      <h1 className="text-[13pt] text-bold">{ pageTitle }</h1>
    </div>
    <div className="px-14 w-full h-full overflow-y-scroll self-end">
      <input type="text" className="border-0 text-[18pt] mt-4 w-full focus:outline-0" placeholder="Judul Note" value={noteTitle} onChange={onNoteTitleChange} />
      <NoteEditor onChange={onNoteContentChange} initialContent={initialContent}/>
    </div>
    <div className="w-full border-t border-[#E0E0E0] bg-[#FEFEFE] h-[90px] flex justify-end items-center">
      <button className="mr-10 rounded rounded-sm bg-blue-500 hover:bg-blue-400 cursor-pointer text-white px-4 py-3" onClick={onSave}>Simpan</button>
    </div>
  </div>
}