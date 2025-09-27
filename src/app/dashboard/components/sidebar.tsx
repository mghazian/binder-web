'use client';
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

// TODO: Use proper typing
export default function Sidebar({ groups }: { groups: any[] }): ReactNode {
  return <div className="w-[300px] bg-[#E7E9EA] border-r border-[#E3E0E0] p-3">
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
        { groups.map((v: Record<string, any>) => <li key={v.id}>{v.name}</li>) }
      </ul>
    </ul>
  </div>
}