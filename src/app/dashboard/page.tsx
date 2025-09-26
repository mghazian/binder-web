import { randomBytes } from "crypto";
import postgres from "postgres"

export default async function Dashboard() {
  const sql = postgres('postgresql://localhost:35432/heybinder', { ssl: false, user: 'app', pass: 'app' });

  let x = await sql`create table if not exists groups (
    id bigserial primary key,
    name varchar not null
  );`

  // const names = [
  //   { name: randomBytes(12).toString('base64url') },
  //   { name: randomBytes(12).toString('base64url') },
  //   { name: randomBytes(12).toString('base64url') },
  //   { name: randomBytes(12).toString('base64url') },
  //   { name: randomBytes(12).toString('base64url') },
  // ];

  // await sql`insert into groups ${ sql(names) }`;

  const result = await sql`select * from groups`;

  return <>
    <h1>Hello, user!</h1>
    <h2>Groups</h2>
    <ul>
      <li><a href="#">Group 1</a></li>
      <li><a href="#">Group 2</a></li>
      <li><a href="#">Group 3</a></li>
      <li><a href="#">Group 4</a></li>
      <pre>Hi, this is result of query:
        {result.map((v) => `${v['id']} ${v['name']}\n`)}
      </pre>
    </ul>
  </>
}