'use client';

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode, use, useEffect, useState } from "react";


export default function NotePage({ params }: { params: Promise<{ group_id: number }> }): ReactNode {
  const [ notes, setNotes ] = useState<any[]>([]);
  const { group_id } = use(params);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/group/${group_id}/notes`);
      if ( ! response.ok ) {
        // TODO: Handle error properly
        console.error(response.status);
        return;
      }

      setNotes(await response.json());
    })();
  }, []);


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
      { notes.map(v => <Link href={`/dashboard/group/${group_id}/notes/${v.id}`}>{v.name}</Link>)}
    </div>
  </div>
}