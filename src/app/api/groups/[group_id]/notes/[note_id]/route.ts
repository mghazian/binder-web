import getPostgreInstance from "@/data/sql";
import { decryptSessionCookie } from "@/util/session";
import { NoteSchema } from "@/validators/schema/notes";
import { formatZodError } from "@/validators/util";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ group_id: number, note_id: number }>}) {
  if ( await decryptSessionCookie() === undefined ) {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }

  const sql = getPostgreInstance();

  const { group_id, note_id } = await params;

  const selectResult = await sql`SELECT id, title, content, created_at FROM notes WHERE group_space_id = ${ group_id } AND id = ${ note_id }`;

  return NextResponse.json({
    note: {
      id: selectResult[0].id,
      title: selectResult[0].title,
      content: JSON.parse(selectResult[0].content),
      created_at: selectResult[0].created_at,
    }}, {
      status: 200
    });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ group_id: number, note_id: number }>}) {
  const jwt = await decryptSessionCookie();
  if ( jwt === undefined ) {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }

  const sql = getPostgreInstance();

  const { group_id, note_id } = await params;
  const { id } = jwt;
  const parseResult = NoteSchema.safeParse(await request.json());
  if ( ! parseResult.success ) {
    return NextResponse.json(formatZodError(parseResult.error), {
      status: 400
    });
  }

  const { title, content } = parseResult.data;

  // const insertResult = await sql`INSERT INTO notes (title, creator_id, group_space_id, content) VALUES(${ title }, ${ id as number }, ${ group_id }, ${ content })`;
  // TODO: update

  // TODO: Catch error accordingly
  return NextResponse.json({
    message: "Note saved successfully"
  }, {
    status: 200
  });
}