import { hash } from "crypto";
import { NextResponse } from "next/server";


export function setSessionCookie(response: NextResponse, salt: String) {
  // TODO: Too simplistic. Maybe better to use JWT
  const sessionToken = hash('sha384', `${salt}${Date.now()}`, 'base64url');
  
  response.cookies.set('heybinder-session', sessionToken, {
    httpOnly: true,
    secure: false, // TODO: Should make it secure
    sameSite: 'strict',
    path: '/',
    maxAge: 3600
  });

  return response;
}