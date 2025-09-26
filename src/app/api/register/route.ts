import getPostgreInstance from "@/data/sql";
import { RegisterInfoSchema } from "@/validators/schema/auth_info";
import { formatZodError } from "@/validators/util";
import { hash } from "crypto";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const sql = getPostgreInstance();

  const json = await request.json();
  
  const parseResult = RegisterInfoSchema.safeParse(json);
  if ( !parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400
    });
  }

  const insertResult = await sql`INSERT INTO users (phone, name) VALUES (${ json.phone }, ${ json.name }) RETURNING ID`;

  const response = NextResponse.json({
    name: json.name,
    phone: json.phone,
    id: insertResult[0].id,
  }, {
    status: 200,
  });

  const sessionToken = hash('sha384', `${insertResult[0].id}${Date.now()}`, 'base64url');

  response.cookies.set('heybinder-session', sessionToken, {
    httpOnly: true,
    secure: false, // TODO: Should make it secure
    sameSite: 'strict',
    path: '/',
    maxAge: 3600
  });

  return response;
}