'use client';

import { ChangeEvent, ReactNode, use, useRef, useState } from "react";
import { NoteEditor } from "../_components/dynamic_note_editor";
import { BlockNoteEditor } from "@blocknote/core";
import { useRouter } from "next/navigation";
import { useCreateBlockNote } from "@blocknote/react";

export default function NoteCreatePage({ params }: { params: Promise<{ group_id: number}> }): ReactNode {
  const [ noteTitle, setNoteTitle ] = useState("Tanpa Judul: Note Baru");
  const [ noteContent, setNoteContent ] = useState<any>();

  const blockNote = useCreateBlockNote();

  const router = useRouter();

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  }

  const handleNoteContentChange = (editor: BlockNoteEditor) => {
    setNoteContent(editor.document);
  }

  const { group_id } = use(params);

  const handleSave = async () => {
    const response = await fetch(`http://localhost:3000/api/groups/${ group_id }/notes`, {
      method: 'PUT',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify({
        title: noteTitle,
        content: blockNote.blocksToFullHTML(noteContent)
      })
    });

    if ( ! response.ok ) {
      // TODO: Properly handle error
      console.error(response.status);
      return;
    }

    router.push(`/dashboard/group/${ group_id }/notes`);
  }

  return <div className="w-full h-full flex flex-col items-center">
    <div className="w-full p-2 border-b border-[#E0E0E0] bg-[#FEFEFE] h-[50px]">
      <h1 className="text-[13pt] text-bold">Tambah Note</h1>
    </div>
    <div className="px-14 w-full h-full overflow-y-scroll self-end">
      <input type="text" className="border-0 text-[18pt] mt-4 w-full focus:outline-0" placeholder="Judul Note" value={noteTitle} onChange={handleNoteTitleChange} />
      <NoteEditor onChange={handleNoteContentChange}/>
    </div>
    <div className="w-full border-t border-[#E0E0E0] bg-[#FEFEFE] h-[90px] flex justify-end items-center">
      <button className="mr-10 rounded rounded-sm bg-blue-500 hover:bg-blue-400 cursor-pointer text-white px-4 py-3" onClick={handleSave}>Simpan</button>
    </div>
  </div>
}