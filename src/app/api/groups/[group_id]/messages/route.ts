import getPostgreInstance from "@/data/sql";
import { decryptSessionCookie } from "@/util/session";
import { ChatRequestSchema, SendChatRequestSchema } from "@/validators/schema/message_request";
import { formatZodError } from "@/validators/util";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ group_id: number }> }) {
  if ( await decryptSessionCookie() === undefined ) {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }

  const sql = getPostgreInstance();

  // Transform search param to object
  const json: Record<string, string> = {}
  request.nextUrl.searchParams.forEach((value, key) => {
    json[key] = value;
  });

  const parseResult = ChatRequestSchema.safeParse(json);
  if ( !parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400
    });
  }
  
  const { group_id } = await params;
  const { type, id, limit } = parseResult.data;

  // TODO: Clean up - SQL construction is hard to read
  let cursorClause = sql``;
  
  if ( id !== undefined ) {
    if ( type === 'after' ) {
      cursorClause = sql`and id > ${ id }`;
    } else {
      cursorClause = sql`and id < ${ id }`;
    }
  }
  
  let orderDirection = sql`ASC`; // Default
  if ( type === 'before' ) {
    orderDirection = sql`DESC`;
  }

  const selectResult = await sql`SELECT * FROM messages WHERE group_space_id = ${ group_id } ${ cursorClause } ORDER BY id ${ orderDirection } LIMIT ${ limit }`;

  return NextResponse.json({
    messages: (type === 'before') ? selectResult.reverse() : selectResult // Make sure message is returned ascendingly
  }, {
    status: 200
  });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ group_id: number }> }) {
  const jwt = await decryptSessionCookie();
  if ( jwt === undefined ) {
      return NextResponse.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

  const sql = getPostgreInstance();

  const json = await request.json();

  const parseResult = SendChatRequestSchema.safeParse(json);
  if ( ! parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400
    });
  }

  const { group_id } = await params;
  const { message } = parseResult.data;

  // TODO: Catch for error
  const insertResult = await sql`INSERT INTO messages (group_space_id, content, user_id) VALUES(${ group_id }, ${ message }, ${ jwt['id'] as number }) RETURNING *`;

  return NextResponse.json(insertResult, {
    status: 200
  });
}