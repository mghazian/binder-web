'use client';

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css"
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { ChangeEvent, ReactNode, RefObject } from "react";
import './note_editor_override.css';

export default function NoteEditor({ onChange }: { onChange?: (editor: BlockNoteEditor) => void }): ReactNode {
  const editor = useCreateBlockNote();
  return <BlockNoteView editor={editor} className="p-3 min-h-full" onChange={onChange} theme={'light'}/>
}