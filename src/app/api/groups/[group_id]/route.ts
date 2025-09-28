import getPostgreInstance from "@/data/sql";
import { decryptSessionCookie } from "@/util/session";
import GroupSpaceSchema from "@/validators/schema/group_space";
import { formatZodError } from "@/validators/util";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ group_id: number }>} ) {
  if ( await decryptSessionCookie() === undefined ) {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }

  const sql = getPostgreInstance();
  const { group_id } = await params;

  const selectResult = await sql`SELECT * FROM group_spaces WHERE id = ${ group_id }`;

  return NextResponse.json(selectResult[0], {
    status: 200
  });
}