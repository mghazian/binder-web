import getPostgreInstance from "@/data/sql";
import { setSessionCookie } from "@/util/session";
import { LoginInfoSchema } from "@/validators/schema/auth_info";
import { formatZodError } from "@/validators/util";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const sql = getPostgreInstance();

  const json = await request.json();

  const parseResult = LoginInfoSchema.safeParse(json);
  if ( !parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400
    });
  }
  
  // Dangerous! Escape hatch only!
  const sqlResult = await sql.unsafe(`SELECT * FROM users WHERE phone = '${ json.phone }'`);
  
  if ( sqlResult.length === 0 ) {
    return NextResponse.json({
      "message": "Account not found. Make sure your phone and/or OTP is correct"
    }, {
      status: 404
    });
  }

  const response = NextResponse.json({
    id: sqlResult[0].id as number,
    name: sqlResult[0].name,
  }, {
    status: 200
  });

  await setSessionCookie(`${sqlResult[0].id}`);

  return response;
}