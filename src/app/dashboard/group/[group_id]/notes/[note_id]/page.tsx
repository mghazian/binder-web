'use client';

import { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { getBaseUrl } from "@/helpers/base_url";

export default function NoteViewerPage({ params }: { params: Promise<{ group_id: string, note_id: string }> }): ReactNode {
  const [ note, setNote ] = useState<any>(null);

  const blockNote = useCreateBlockNote();
  // try {
  //   // TODO: Need relook: using `useCreateBlockNote` caused error under the hood. Is
  //   // it better to not convert block document on the fly?
  //   blockNote = useCreateBlockNote();
  // } catch (err) {
  //   // Swallow the error
  // }

  const { group_id, note_id } = use(params);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${getBaseUrl()}/api/groups/${ group_id }/notes/${ note_id }`)
      if ( ! response.ok ) {
        // TODO: properly handle the error
        console.error(response.status);
        return;
      }

      setNote((await response.json()).note);
    })();
  }, [ group_id, note_id ]);

  return <div className="w-full h-full flex flex-col items-center">
    <div className="w-full p-2 border-b border-[#E0E0E0] bg-[#FEFEFE] h-[50px]">
      <h1 className="text-[13pt] text-bold">{ note?.title }</h1>
    </div>
    <div className="px-14 w-full h-full overflow-y-scroll self-end">
      {/* Probably better to use library that safely parse HTML, but for now this suffices */}
      <div dangerouslySetInnerHTML={{ __html: note?.content && blockNote ? blockNote!.blocksToHTMLLossy(note?.content) : "" }} />
    </div>
  </div>
}