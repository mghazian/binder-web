'use client';
import { ChangeEvent, ReactNode, useState } from "react";


export default function LoginForm({ onAdvance, onPhoneChange }: { onAdvance?: Function, onPhoneChange?: Function }): ReactNode {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ( onPhoneChange ) {
      onPhoneChange(e.currentTarget.value);
    }
  }

  const handleClick = () => {
    if ( onAdvance ) {
      onAdvance();
    }
  }

  return <>
    <div className="flex flex-col my-7">
      <label htmlFor="phone" className="text-xs font-bold">Phone</label>
      <input type="text" name="phone" id="phone" className="border rounded-xs border-[#e0e0e0] bg-white py-1 px-2" onChange={handleChange}/>
    </div>
    
    <div className="flex flex-col">
      <button onClick={handleClick} className="rounded-md bg-blue-500 hover:bg-blue-400 w-[150px] h-[40px] text-white">Masuk</button>
      <div className="text-sm mt-5 text-black-700">
        Belum punya akun? Buat <a href="#" className="text-blue-500 hover:text-blue-600 font-bold">di sini</a>
      </div>
    </div>
  </>
}