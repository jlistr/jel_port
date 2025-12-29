import type { Context } from "@netlify/functions";
import { neon } from "@netlify/neon";

export default async (req: Request, context: Context) => {
  const sql = neon();

  // Example: Query all users
  const users = await sql("SELECT * FROM users");

  return new Response(JSON.stringify({ users }), {
    headers: { "Content-Type": "application/json" },
  });
};
