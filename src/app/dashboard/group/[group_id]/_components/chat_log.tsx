'use client';
import { ReactNode } from "react";
import MessageEntry from "./message_entry";


// TODO: entries save user id as string. Better use type to enforce object's key type
export default function ChatLog({ marginBottom, entries, userId }: { marginBottom: string, entries: any[], userId: string }): ReactNode {
  // TODO: Format chat date and time
  return <div className={`p-9 flex flex-col pb-[${ marginBottom }] h-full overflow-y-scroll`}>
    {entries.map(v => <MessageEntry
      key={v.id}
      time={v.created_at}
      name={v.name}
      isSpeaker={v.user_id === userId ? "true" : "false"}
    >
      {v.content}
    </MessageEntry>)}
  </div>
}