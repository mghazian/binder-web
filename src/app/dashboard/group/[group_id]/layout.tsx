'use client';
import { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import { getUser, useUserData } from "@/helpers/client_session";
import Link from "next/link";

export default function GroupLayout({ children, params }: { children: ReactNode, params: Promise<{ group_id: number }> }): ReactNode {
  const [ groupData, setGroupData ] = useState<any>(null);
  const userId = useUserData('user_id');

  const { group_id } = use(params);

  useEffect(() => {
    (async () => {
      const groupDetailResponse = await fetch(`http://localhost:3000/api/groups/${ group_id }`);

      setGroupData((await groupDetailResponse.json()));
    })();
  }, [])

  return <div className="w-full h-full text-[11pt] flex flex-col">
    <div className="w-full p-2 border-b border-[#E0E0E0] bg-[#FEFEFE] h-[50px] flex justify-between items-center">
      <h1 className="text-[13pt] text-bold">{ groupData?.name }</h1>
      <Link href={`/dashboard/group/${ group_id }/notes`} className="px-3 py-2 hover:text-blue-500">Notes</Link>
    </div>
    { children }
  </div>
}