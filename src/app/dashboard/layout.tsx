'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { GroupListContext } from "./_contexts/group_list";

export default function DashboardLayout({ children }: { children: ReactNode }): ReactNode {

  const [ groupList, setGroupList ] = useState<any[]>([]);
  const refreshGroupList = async () => {
    const response = await fetch('http://localhost:3000/api/groups');

    const json = await response.json();

    // TODO: Handle if response failed
    setGroupList(json.groups);
  }

  useEffect(() => {
    refreshGroupList();
  }, [])

  return <div className="flex flex-col h-screen">
    <Navbar />
    <GroupListContext.Provider value={ refreshGroupList }>
      <div id="dashboard-body" className="flex w-full grow bg-[#F8F9FA]">
        <Sidebar groups={groupList} />
        <div className="w-full">
          {children}
        </div>
      </div>
    </GroupListContext.Provider>
  </div>
}