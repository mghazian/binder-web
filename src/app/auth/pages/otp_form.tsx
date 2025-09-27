import { ChangeEvent } from "react";


export default function OtpForm({ onAdvance, onOtpChange }: { onAdvance?: Function, onOtpChange?: Function }) {
  const handleClick = () => {
    if ( onAdvance ) {
      onAdvance();
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ( onOtpChange ) {
      onOtpChange(e.currentTarget.value);
    }
  }

  return <>
    <div className="flex flex-col my-7">
      <label htmlFor="otp" className="text-xs font-bold">OTP</label>
      <input type="text" name="otp" id="otp" className="border rounded-xs border-[#e0e0e0] bg-white py-1 px-2" onChange={handleChange}/>
    </div>
    
    <div className="flex flex-col">
      <button onClick={handleClick} className="rounded-md bg-blue-500 hover:bg-blue-400 w-[150px] h-[40px] text-white">Masuk</button>
    </div>
  </>
}