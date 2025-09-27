import { ReactNode } from "react";


export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex justify-center h-screen bg-gray-100">
    <div className="flex flex-col min-w-[800px] h-full justify-center">
      <h1 className="text-[2.4rem] font-bold text-center mb-8">Binder</h1>
      <div className="flex flex-col h-1/2 bg-white px-12 pt-6 border border-gray-200">
        {children}
      </div>
    </div>
  </div>
}