'use client';
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

// TODO: Use proper typing
export default function Sidebar({ groups }: { groups: any[] }): ReactNode {
  return <div className="cursor-default w-[300px] bg-[#E7E9EA] border-r border-[#E3E0E0] p-3">
    <ul>
      <li className="mb-4 font-bold text-[12pt]">Home</li>
      <li className="mb-2 font-bold text-[12pt]">
        <div className="flex justify-between items-center">
          <div>Groups</div>
          <Link href={'/dashboard/create_group'}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
        </div>
      </li>
      <ul className="ml-3">
        { groups.map((v: Record<string, any>) =>
          <li className="hover:bg-blue-500/25 rounded-md px-3 py-1" key={v.id}>
            <Link href={`/dashboard/group/${v.id}`}>{v.name}</Link>
          </li>
        )}
      </ul>
    </ul>
  </div>
}