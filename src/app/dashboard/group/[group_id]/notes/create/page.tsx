'use client';

import { ChangeEvent, ReactNode, use, useRef, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useRouter } from "next/navigation";
import EditorPageTemplate from "../_templates/editor_page";

export default function NoteCreatePage({ params }: { params: Promise<{ group_id: string }> }): ReactNode {
  const [ noteTitle, setNoteTitle ] = useState("Tanpa Judul: Note Baru");
  const [ noteContent, setNoteContent ] = useState<any>();

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
        content: JSON.stringify(noteContent)
      })
    });

    if ( ! response.ok ) {
      // TODO: Properly handle error
      console.error(response.status);
      return;
    }

    router.push(`/dashboard/group/${ group_id }/notes`);
  }

  return <EditorPageTemplate
    pageTitle='Tambah Note'
    noteTitle={noteTitle}
    onNoteContentChange={handleNoteContentChange}
    onNoteTitleChange={handleNoteTitleChange}
    onSave={handleSave}
  />
}