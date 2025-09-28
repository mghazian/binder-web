'use client';

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css"
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { ChangeEvent, ReactNode, RefObject } from "react";
import './note_editor_override.css';

type NoteEditorParam = {
  onChange: (editor: BlockNoteEditor) => void,
  initialContent?: PartialBlock[]
}
export default function NoteEditor({ onChange, initialContent }: NoteEditorParam): ReactNode {
  const editor = useCreateBlockNote({ initialContent: initialContent });
  return <BlockNoteView editor={editor} className="p-3 min-h-full" onChange={onChange} theme={'light'}/>
}