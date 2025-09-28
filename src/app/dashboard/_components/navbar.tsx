'use client';
import { unsetUser } from "@/helpers/client_session";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Navbar(): ReactNode {
  const router = useRouter();

  const onLogout = async () => {
    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST'
    });

    if ( ! response.ok ) {
      // TODO: Handle error properly
      console.error(response.status);
    } else {
      unsetUser();
      router.push('/auth');
    }
  }

  return <div id="dashboard-header" className="w-full h-[50px] bg-blue-500 text-white p-5 flex justify-between items-center">
    <div><h1 className="font-bold text-[13pt]">Binder</h1></div>
    <button className="flex cursor-pointer gap-3 text-sm items-center" onClick={onLogout}>
      <div>Logout</div>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  </div>
}