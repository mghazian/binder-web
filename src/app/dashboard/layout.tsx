import { ReactNode } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";


export default function DashboardLayout({ children }: { children: ReactNode }): ReactNode {

  return <div className="flex flex-col h-screen">
    <Navbar />
    <div id="dashboard-body" className="flex w-full grow bg-[#F8F9FA]">
      <Sidebar />
      <div className="w-full">
        {children}
      </div>
    </div>
  </div>
}