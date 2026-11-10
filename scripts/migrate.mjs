// Applies db/migrations/*.sql in name order, skipping ones already applied.
// Run with: npm run db:migrate
import { readdir, readFile } from "node:fs/promises";
import { Client } from "@neondatabase/serverless";

const dir = new URL("../db/migrations/", import.meta.url);
const client = new Client(process.env.DATABASE_URL_UNPOOLED);
await client.connect();

try {
  await client.query(`create table if not exists schema_migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )`);
  const { rows } = await client.query("select name from schema_migrations");
  const applied = new Set(rows.map((r) => r.name));

  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(new URL(file, dir), "utf8");
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  }
  console.log("Migrations up to date.");
} finally {
  await client.end();
}
