import getPostgreInstance from "@/data/sql";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

// Development use only
export async function POST() {
  const sql = await getPostgreInstance();

  const migration = await readFile('./src/data/migrations/migration.sql', 'utf8');
  await sql.unsafe(migration);

  const seed = await readFile('./src/data/migrations/seeds/abstract-algebra.sql', 'utf8');
  await sql.unsafe(seed);

  return NextResponse.json({
    message: 'Migration ran successfully'
  }, {
    status: 200
  })
}