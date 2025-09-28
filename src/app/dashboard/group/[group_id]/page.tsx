'use client';
import { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import ChatLog from "./_components/chat_log";
import MessageComposerField from "./_components/message_composer";
import { getUser, useUserData } from "@/helpers/client_session";
import Link from "next/link";

export default function GroupPage({ params }: { params: Promise<{ group_id: string | number }> }): ReactNode {
  const [ chatLog, setChatLog ] = useState<any[]>([]);
  const [ messageCompose, setMessageCompose ] = useState("");
  const [ groupData, setGroupData ] = useState<any>(null);
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
      const [ chatResponse, groupDetailResponse ] = await Promise.all([
        fetch(`http://localhost:3000/api/groups/${ group_id }/messages`),
        fetch(`http://localhost:3000/api/groups/${ group_id }`)
      ]);

      setChatLog((await chatResponse.json()).messages);
      setGroupData((await groupDetailResponse.json()));
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

  return <>
    <ChatLog marginBottom={messageComposerHeight} entries={chatLog} userId={userId!} />
    <MessageComposerField height={messageComposerHeight} value={messageCompose} onChange={handleComposeChange} onSend={sendMessage} />
  </>
}