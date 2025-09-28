import dynamic from "next/dynamic";

// BlockNote requires the library to be loaded for client side and not server side.
// To do that we make use next/dynamic, following BlockNote walkthrough
// Reference: www.blocknotejs.org/docs/getting-started/nextjs
export const NoteEditor = dynamic(() => import('./note_editor'), { ssr: false });