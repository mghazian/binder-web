'use client';

import { faBook, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode, use, useEffect, useState } from "react";


export default function NotePage({ params }: { params: Promise<{ group_id: string }> }): ReactNode {
  const [ notes, setNotes ] = useState<any[]>([]);
  const { group_id } = use(params);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/groups/${group_id}/notes`);
      if ( ! response.ok ) {
        // TODO: Handle error properly
        console.error(response.status);
        return;
      }

      setNotes((await response.json()).notes);
    })();
  }, [ group_id ]);


  return <div className="w-full h-full p-9">
    <div className="flex justify-between ">
      <h1 className="text-[13pt] font-bold block">Notes group</h1>
      <Link href={`/dashboard/group/${group_id}/notes/create`} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
        <div>Tambah</div>
        <FontAwesomeIcon icon={faCirclePlus} />
      </Link>
    </div>
    <hr />
    <div className="flex flex-col">
      { notes.map(v => <div key={v.id} className="flex justify-between h-[50px] items-center">
          <Link className="flex block gap-3 items-center h-full px-6 hover:text-blue-500" href={`/dashboard/group/${group_id}/notes/${v.id}`}>
            <FontAwesomeIcon icon={faBook} />
            {v.title}
          </Link>
          <Link className="mr-5 bg-blue-500 hover:bg-blue-400 text-white rounded-sm px-3 py-1" href={`/dashboard/group/${group_id}/notes/${v.id}/editor`}>
            Ubah
          </Link>
        </div>
      ) }
    </div>
  </div>
}