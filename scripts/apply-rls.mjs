import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (err) {
    // ignore
  }
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set. Add it to .env or set it in the environment.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function run() {
  console.log('Applying RLS migration for public.admin_logs...');

  await sql`BEGIN;`;

  await sql`ALTER TABLE public."admin_logs" ENABLE ROW LEVEL SECURITY;`;

  await sql`REVOKE ALL ON public."admin_logs" FROM PUBLIC;`;
  await sql`REVOKE ALL ON public."admin_logs" FROM anon;`;

  await sql`
    CREATE POLICY "admin_logs_select_admins" ON public."admin_logs"
      FOR SELECT
      TO authenticated
      USING ((auth.jwt() ->> 'role') = 'admin');
  `;

  await sql`
    CREATE POLICY "admin_logs_insert_service" ON public."admin_logs"
      FOR INSERT
      TO service_role
      WITH CHECK (true);
  `;

  await sql`
    CREATE POLICY "admin_logs_update_service" ON public."admin_logs"
      FOR UPDATE
      TO service_role
      USING (true);
  `;

  await sql`
    CREATE POLICY "admin_logs_delete_service" ON public."admin_logs"
      FOR DELETE
      TO service_role
      USING (true);
  `;

  // optional self-insert policy not applied by default (left commented in SQL file)

  await sql`CREATE INDEX IF NOT EXISTS idx_admin_logs_user_id ON public."admin_logs" (user_id);`;

  await sql`COMMIT;`;

  console.log('RLS migration applied successfully.');
}

run().catch((err) => {
  console.error('RLS migration failed:', err.message || err);
  process.exit(1);
});
