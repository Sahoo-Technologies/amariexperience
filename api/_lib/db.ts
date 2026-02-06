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
 * The neon() driver supports sql(queryString, params) at runtime
 * but the TypeScript types only declare the tagged-template overload.
 */
export function runQuery(query: string, params: unknown[] = []): Promise<any[]> {
  const sql = getSql() as any;
  return sql(query, params);
}
