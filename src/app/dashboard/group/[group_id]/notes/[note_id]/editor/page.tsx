'use client';

import { BlockNoteEditor } from "@blocknote/core";
import { ChangeEvent, ReactNode, use, useEffect, useState } from "react";
import EditorPageTemplate from "../../_templates/editor_page";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/helpers/base_url";

export default function EditorPage({ params }: { params: Promise<{ group_id: string, note_id: string }>}): ReactNode {
  const [ noteTitle, setNoteTitle ] = useState("");
  const [ noteContent, setNoteContent ] = useState<any>();
  const [ isLoading, setIsLoading ] = useState(true);

  const router = useRouter();

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  }

  const handleNoteContentChange = (editor: BlockNoteEditor) => {
    setNoteContent(editor.document);
  }

  const { group_id, note_id } = use(params);

  const handleSave = async () => {
    const response = await fetch(`${getBaseUrl()}/api/groups/${ group_id }/notes/${ note_id }`, {
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

  useEffect(() => {
    (async () => {
      const response = await fetch(`${getBaseUrl()}/api/groups/${ group_id }/notes/${ note_id }`);
      if ( !response.ok ) {
        // TODO: handle error properly
        console.error(response.status);
        return;
      }

      const { note } = await response.json();

      setNoteTitle(note.title);
      setNoteContent(note.content);
      setIsLoading(false);
    })()
  }, [ group_id, note_id ])

  return <>
    {isLoading ? "" : <EditorPageTemplate
      pageTitle='Ubah Note'
      noteTitle={noteTitle}
      initialContent={noteContent}
      onNoteContentChange={handleNoteContentChange}
      onNoteTitleChange={handleNoteTitleChange}
      onSave={handleSave}
    />}</>
}