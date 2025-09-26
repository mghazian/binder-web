import getPostgreInstance from "@/data/sql";
import GroupSpaceSchema from "@/validators/schema/group_space";
import { formatZodError } from "@/validators/util";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const sql = getPostgreInstance();

  const { name, imageFile }: {name: string, imageFile?: Blob} = await request.json();

  // TODO: Set middleware to check for authentication/authorization

  const parseResult = GroupSpaceSchema.safeParse({ name: name, imageFile: imageFile });
  if ( !parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400,
    })
  }

  const result = await sql`INSERT INTO group_spaces (name) VALUES (${ name }) RETURNING ID;`;
  console.log(result);
  
  return NextResponse.json({
    group: {
      id: result[0].id,
      name: name
    }
  }, {
    status: 200
  });
}