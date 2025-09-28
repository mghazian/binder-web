import { ReactNode } from "react";


export default function MessageEntry({ children, name, time, isSpeaker }: { children: ReactNode, name: string, time: string, isSpeaker: "true" | "false" }): ReactNode {
  const styles = {
    true: {
      align: 'items-end self-end',
      bg: 'bg-blue-500',
      color: 'text-white',
      border: 'border-blue-700',
    },
    false: {
      align: 'items-start self-start',
      bg: 'bg-white',
      color: 'text-black',
      border: 'border-[#F0F0F0]'
    }
  };

  return <div className={`mb-4 max-w-4/5 flex flex-col ${ styles[isSpeaker].align } ${ styles[isSpeaker].color }`}>
    { isSpeaker === "false" &&
      <div className="font-sm text-[#666666]">
        {name}
      </div>
    }
    <div className={`rounded ${ styles[isSpeaker].bg } border ${ styles[isSpeaker].border } ${ styles[isSpeaker].color } p-3`}>
      {children}
    </div>
    <div className="font-sm text-[#666666]">
      {time}
    </div>
  </div>
}