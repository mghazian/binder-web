import getPostgreInstance from "@/data/sql";
import { decryptSessionCookie, removeSessionCookie } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  if ( await decryptSessionCookie() === undefined ) {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }

  await removeSessionCookie();

  return NextResponse.json({
    message: "Logout successful",
  }, {
    status: 200
  });
}