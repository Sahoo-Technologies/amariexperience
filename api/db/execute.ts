import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runQuery } from '../_lib/db.js';
import { getSession } from '../_lib/auth.js';

function isQueryAllowed(query: string) {
  const q = query.trim().replace(/;+\s*$/, '').toLowerCase();

  // Block destructive DDL and system catalog access
  const forbidden = ['drop ', 'truncate ', 'grant ', 'revoke ', 'alter role', 'create role', 'pg_', 'information_schema', 'create table', 'alter table'];
  if (forbidden.some((k) => q.includes(k))) return false;

  // Block access to sensitive tables — prevent reading password hashes, sessions, reset tokens
  const sensitivePatterns = ['password_hash', 'password_resets', 'from sessions', 'into sessions', 'from users'];
  if (sensitivePatterns.some((k) => q.includes(k))) return false;

  // Only allow standard CRUD
  return q.startsWith('select') || q.startsWith('insert') || q.startsWith('update') || q.startsWith('delete');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Auth: require a valid session
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  // Restrict raw query execution to admin users only
  if (session.userType !== 'admin') {
    res.status(403).json({ error: 'Forbidden — admin access required' });
    return;
  }

  const { query, params } = (req.body || {}) as any;
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Missing query' });
    return;
  }

  if (!isQueryAllowed(query)) {
    res.status(400).json({ error: 'Query not allowed' });
    return;
  }

  try {
    const values = Array.isArray(params) ? params : [];

    const result = await runQuery(query, values);

    res.status(200).json({ rows: result });
  } catch (e: any) {
    console.error('[DB Execute] Query error:', e?.message);
    res.status(500).json({ error: 'Query execution failed' });
  }
}
