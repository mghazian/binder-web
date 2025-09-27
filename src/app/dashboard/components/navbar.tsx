import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";


export default function Navbar(): ReactNode {
  return <div id="dashboard-header" className="w-full h-[50px] bg-blue-500 text-white p-5 flex justify-between items-center">
    <div><h1 className="font-bold text-[13pt]">Binder</h1></div>
    <div className="flex gap-3 text-sm items-center">
      <div>Logout</div>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </div>
  </div>
}