import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";


export default function MessageComposerField({ height, onChange, onSend, value }: { height: string, onChange?: ChangeEventHandler<HTMLInputElement>, onSend?: MouseEventHandler<HTMLButtonElement>, value: string }): ReactNode {
  return <div className={`sticky bottom-0 bg-[#EEEEEE] border-[#D0D0D0] border-t p-5 h-[${ height }] w-full flex gap-4 flex items-center`} style={{ height: height }}>
    <input type="text" name="message" id="message" className="bg-white border border-[#E0E0E0] h-full grow" onChange={onChange} value={value} placeholder="Ketik pesan di sini" />
    <button className="w-[2lh] text-center" onClick={onSend}>
      <FontAwesomeIcon icon={faPaperPlane} fontSize={20} className="hover:text-blue-500 cursor-pointer" />
    </button>
  </div>
}