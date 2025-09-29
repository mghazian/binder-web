import { ReactNode } from "react";


export default function MessageEntry({ children, name, time, isSpeaker }: { children: ReactNode, name: string, time: string, isSpeaker: boolean }): ReactNode {
  const className = isSpeaker ? "speaker" : 'others';
  const styles = {
    speaker: {
      align: 'items-end self-end',
      bg: 'bg-blue-500',
      color: 'text-white',
      border: 'border-blue-700',
    },
    others: {
      align: 'items-start self-start',
      bg: 'bg-white',
      color: 'text-black',
      border: 'border-[#F0F0F0]'
    }
  };

  return <div className={`mb-4 max-w-4/5 flex flex-col ${ styles[className].align } ${ styles[className].color }`}>
    { !isSpeaker &&
      <div className="font-sm text-[#666666]">
        {name}
      </div>
    }
    <div className={`rounded ${ styles[className].bg } border ${ styles[className].border } ${ styles[className].color } p-3`}>
      {children}
    </div>
    <div className="font-sm text-[#666666]">
      {time}
    </div>
  </div>
}