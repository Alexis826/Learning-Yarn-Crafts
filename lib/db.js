import { neon } from "@neondatabase/serverless";

// Query the Neon database: await sql`select ...`
export const sql = neon(process.env.DATABASE_URL);
