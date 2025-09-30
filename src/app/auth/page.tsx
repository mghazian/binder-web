'use client';
import { ChangeEvent, ReactNode, useState } from "react";
import OtpForm from "./pages/otp_form";
import LoginForm from "./pages/login_form";
import { SubmissionLoading } from "./pages/submission_loading";
import { useRouter } from "next/navigation";
import { setUser } from "@/helpers/client_session";
import { getBaseUrl } from "@/helpers/base_url";


export default function AuthPage(): ReactNode {
  const [ step, setStep ] = useState(0);
  const [ phone, setPhone ] = useState("");
  const [ otp, setOtp ] = useState("");
  const router = useRouter();

  const submitLogin = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/login`, {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json']
        ],
        body: JSON.stringify({
          phone: phone,
          otp: otp
        })
      });
      
      if ( response.ok ) {
        const json = await response.json();
        setUser(json.id);
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // TODO: Rethink how to handle failure? Show error message?
        console.error(response.status);

        setStep(0);
      }
    } catch (err) {
      // TODO: Rethink how to handle error? Show error message?
      console.error(err);

      setStep(0);
    }
  }

  return <>
    {step === 0 && <LoginForm onPhoneChange={setPhone} onAdvance={() => { setStep(1); }} />}
    {step === 1 && <OtpForm onOtpChange={setOtp} onAdvance={() => { setStep(2); submitLogin(); }} />}
    {step === 2 && <SubmissionLoading />}
  </>
}