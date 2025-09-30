'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { GroupListContext } from "./_contexts/group_list";
import { getBaseUrl } from "@/helpers/base_url";

export default function DashboardLayout({ children }: { children: ReactNode }): ReactNode {

  const [ groupList, setGroupList ] = useState<any[]>([]);
  const refreshGroupList = async () => {
    const response = await fetch(`${getBaseUrl()}/api/groups`);

    const json = await response.json();

    // TODO: Handle if response failed
    setGroupList(json.groups);
  }

  useEffect(() => {
    refreshGroupList();
  }, [])

  const navbarHeight = '50px';

  return <div className="flex flex-col h-screen">
    <Navbar height={navbarHeight} />
    <GroupListContext.Provider value={ refreshGroupList }>
      <div id="dashboard-body" className={`flex w-full grow bg-[#F8F9FA]`} style={{ height: `calc(100vh - ${ navbarHeight })`, minHeight: `calc(100vh - ${ navbarHeight })` }}>
        <Sidebar groups={groupList} />
        {children}
      </div>
    </GroupListContext.Provider>
  </div>
}