import { neon } from '@neondatabase/serverless';

export type SqlParams = unknown[];

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL');
  }

  return neon(databaseUrl);
}

/**
 * Run a parameterized query string (not a tagged template).
 * Uses sql.query("SELECT $1", [value]) for conventional function calls
 * as required by @neondatabase/serverless.
 */
export async function runQuery(query: string, params: unknown[] = []): Promise<any[]> {
  const sql = getSql() as any;
  const result = await sql.query(query, params);
  return result.rows ?? result;
}
