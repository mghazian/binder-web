import { hash } from "crypto";
import { NextResponse } from "next/server";
import { decryptJwt, encryptJwt } from "./jwt";
import { cookies, headers } from "next/headers";

const SESSION_KEY: string = "heybinder-session";

export async function setSessionCookie(userId: string) {
  const sessionToken = await encryptJwt({ id: userId });
  (await cookies()).set(SESSION_KEY, sessionToken, {
    httpOnly: true,
    secure: false, // TODO: Should make it secure
    sameSite: 'strict',
    path: '/',
    maxAge: 3600
  });
}

export async function decryptSessionCookie() {
  const sessionToken = (await cookies()).get(SESSION_KEY);
  if ( ! sessionToken ) {
    return undefined;
  }
  
  return await decryptJwt(sessionToken.value);
}