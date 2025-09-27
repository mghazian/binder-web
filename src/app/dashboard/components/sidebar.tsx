'use client';
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useState } from "react";


export default function Sidebar(): ReactNode {
  const [ groups, setGroups ] = useState< Record<string, any> >([]);
  
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/api/groups');

      // TODO: Handle if response failed
      setGroups((await response.json()).groups);
    })();
  }, [])

  return <div className="w-[300px] bg-[#E7E9EA] border-r border-[#E3E0E0] p-3">
    <ul>
      <li className="mb-4 font-bold text-[12pt]">Home</li>
      <li className="mb-2 font-bold text-[12pt]">
        <div className="flex justify-between items-center">
          <div>Groups</div>
          <FontAwesomeIcon icon={faCirclePlus} />
        </div>
      </li>
      <ul className="ml-3">

        { groups.map((v: Record<string, any>) => <li key={v.id}>{v.name}</li>) }
      </ul>
    </ul>
  </div>
}