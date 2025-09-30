'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useContext, useState } from "react";
import { GroupListContext } from "../_contexts/group_list";
import { getBaseUrl } from "@/helpers/base_url";

export default function GroupCreator(): ReactNode {
  const [ name, setName ] = useState("");
  const refreshGroupList = useContext(GroupListContext);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  const onSubmit = async () => {
    const response = await fetch(`${getBaseUrl()}/api/groups/`, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify({
        name: name
      })
    });

    // TODO: Handle failure properly
    if ( !response.ok ) {
      console.error(`Request failed: ${ response.status }`);
    } else {
      await refreshGroupList!();
      router.push('/dashboard');
    }
  }

  return <div className="w-full p-9">
    <h1>Create Group</h1>
    <hr />
    <div className="flex flex-col my-7">
      <label htmlFor="name" className="text-xs font-bold">Name</label>
      <input type="text" name="name" id="name" className="border rounded-xs border-[#e0e0e0] bg-white py-1 px-2" onChange={handleChange}/>
    </div>
    <button className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-8 rounded text-sm" onClick={onSubmit}>Buat</button>
  </div>
}