'use client';
import { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import ChatLog from "./_components/chat_log";
import MessageComposerField from "./_components/message_composer";
import { getUser, useUserData } from "@/helpers/client_session";

export default function GroupPage({ params }: { params: Promise<{ group_id: string | number }> }): ReactNode {
  const [ chatLog, setChatLog ] = useState<any[]>([]);
  const [ messageCompose, setMessageCompose ] = useState("");
  const userId = useUserData('user_id');

  // We are allowing message transmission by pressing enter. Unfortunately, the event handler
  // does not propagate cross render, so we need something to make the message can be read
  // by the event handler cross render. Therefore introducing: useRef
  const messageComposeRef = useRef(messageCompose);
  useEffect(() => {
    messageComposeRef.current = messageCompose;
  }, [messageCompose])

  const { group_id } = use(params);

  useEffect(() => {
    // Register enter button listener
    const handler = (e: KeyboardEvent) => {
      if ( e.key === 'Enter' && !messageCompose ) {
        sendMessage();
      }
    }

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/groups/${ group_id }/messages`);

      setChatLog((await response.json()).messages);
    })();
  }, [])

  const sendMessage = async () => {
    const response = await fetch(`http://localhost:3000/api/groups/${ group_id }/messages`, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify({
        message: messageComposeRef.current
      })
    });

    if ( ! response.ok ) {
      // TODO: handle error properly
      console.error(response.status);
      return;
    }

    const json = await response.json();
    
    setMessageCompose("");
    setChatLog(logs => {
      return [ ...logs, ...json ]
    })
  }

  const handleComposeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageCompose(e.currentTarget.value);
  }

  const messageComposerHeight = '80px';

  return <div className="w-full h-full relative overflow-y-scroll text-[11pt]">
    <ChatLog marginBottom={messageComposerHeight} entries={chatLog} userId={userId!} />
    <MessageComposerField height={messageComposerHeight} value={messageCompose} onChange={handleComposeChange} onSend={sendMessage} />
  </div>
}