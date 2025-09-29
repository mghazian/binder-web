'use client';
import { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import MessageComposerField from "./_components/message_composer";
import { getUser, useUserData } from "@/helpers/client_session";
import MessageEntry from "./_components/message_entry";

export default function GroupPage({ params }: { params: Promise<{ group_id: string | number }> }): ReactNode {
  const [ chatLog, setChatLog ] = useState<any[]>([]);
  const [ messageCompose, setMessageCompose ] = useState("");
  const [ groupData, setGroupData ] = useState<any>(null);
  const userId = useUserData('user_id');

  const MESSAGE_BATCH_SIZE = 12;

  // Feature: Send message by pressing enter
  //
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
  // ------

  // Initialization - Load all data at first render
  useEffect(() => {
    (async () => {
      const [ chatResponse, groupDetailResponse ] = await Promise.all([
        fetch(`http://localhost:3000/api/groups/${ group_id }/messages?limit=${ MESSAGE_BATCH_SIZE }`),
        fetch(`http://localhost:3000/api/groups/${ group_id }`)
      ]);

      setChatLog((await chatResponse.json()).messages);
      setGroupData((await groupDetailResponse.json()));
    })();
  }, [])
  // -----

  // Method and helper definitions
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
  // ------

  // Feature: Load message when user scrolled to top
  //
  // Long code ahead: TLDR - We want to load when user scrolled to the first message
  // in chat but event listener require latest first message of the chat to get the
  // next batch. Make the latest first message available by registering it to a ref
  const scrollAwareElement = useRef<HTMLDivElement>(null);
  const chatLogRef = useRef<any[]>([]);
  useEffect(() => {
    const previousFirstMessage = chatLogRef.current[0] ?? {};
    chatLogRef.current = chatLog;

    window.scrollTo(previousFirstMessage)
  }, [chatLog]);

  const loadMessage = async (type: "after" | "before", count: number = MESSAGE_BATCH_SIZE, chatLog: any[]) => {
    const url = new URL(`http://localhost:3000/api/groups/${ group_id }/messages`);

    let chatEntryIndex = undefined
    if ( type === 'before' ) {
      chatEntryIndex = 0;
    }
    else {
      chatEntryIndex = chatLog.length - 1;
    }
    url.searchParams.set('id', chatLog.length > 0 ? chatLog[ chatEntryIndex ].id.toString() : "");
    url.searchParams.set('type', type);
    url.searchParams.set('limit', count.toString());

    const response = await fetch(url);
    const json = await response.json();

    setChatLog(logs => {
      if ( type === 'before' ) {
        return [ ...json.messages, ...logs ];
      } else {
        return [ ...logs, ...json.messages ];
      }
    });
  }

  useEffect(() => {
    const handler = () => {
      if ( scrollAwareElement.current?.scrollTop === 0 ) {
        loadMessage("before", MESSAGE_BATCH_SIZE, chatLogRef.current);
      }
    }
    scrollAwareElement.current?.addEventListener('scroll', handler);

    return () => {
      scrollAwareElement.current?.removeEventListener('scroll', handler);
    }
  }, [scrollAwareElement]);
  // -------

  const POLL_INTERVAL = 5000;
  useEffect(() => {
    let id = setInterval(() => {
      (async () => {
        loadMessage('after', MESSAGE_BATCH_SIZE, chatLogRef.current)
      })();
    }, POLL_INTERVAL);

    return () => clearInterval(id);
  }, [])

  // TODO: Format chat date and time
  return <>
    <div ref={scrollAwareElement} className={`p-9 flex flex-col pb-[${ messageComposerHeight }] h-full overflow-y-scroll`}>
      {chatLog.map(v => <MessageEntry
        key={v.id}
        time={v.created_at}
        name={v.name}
        isSpeaker={v.user_id === userId ? "true" : "false"}
      >
        {v.content}
      </MessageEntry>)}
    </div>
    <MessageComposerField height={messageComposerHeight} value={messageCompose} onChange={handleComposeChange} onSend={sendMessage} />
  </>
}