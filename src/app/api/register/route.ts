import getPostgreInstance from "@/data/sql";
import { setSessionCookie } from "@/util/session";
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

  // TODO: Adjust. No need to set the user detail for security reason
  const response = NextResponse.json({
    name: json.name,
    id: insertResult[0].id,
  }, {
    status: 200,
  });

  await setSessionCookie(`${insertResult[0].id}`);

  return response;
}