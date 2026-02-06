import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const content = readFileSync(resolve(__dirname, '..', '.env'), 'utf-8');
    for (const line of content.split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq < 0) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
}

loadEnv();
const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Migrating users table to expected schema...\n');

  // Add missing columns
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(255);`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(255);`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) NOT NULL DEFAULT 'couple';`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;`;

  // If id column is text, change to UUID with default
  const idCol = await sql`
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'id';
  `;
  if (idCol.length && idCol[0].data_type === 'text') {
    console.log('  Converting id column from text to uuid...');
    await sql`ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();`;
  }

  // Backfill: copy old 'name' column into first_name if first_name is null
  await sql`
    UPDATE users
    SET first_name = COALESCE(first_name, split_part(name, ' ', 1), 'User'),
        last_name  = COALESCE(last_name, NULLIF(substring(name from position(' ' in name) + 1), ''), 'Unknown')
    WHERE first_name IS NULL;
  `;

  // Make first_name and last_name NOT NULL with defaults for future rows
  await sql`ALTER TABLE users ALTER COLUMN first_name SET DEFAULT '';`;
  await sql`ALTER TABLE users ALTER COLUMN last_name SET DEFAULT '';`;

  // Verify
  const cols = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'users'
    ORDER BY ordinal_position;
  `;
  console.log('=== users table columns (after migration) ===');
  for (const c of cols) {
    console.log(`  ${c.column_name}  (${c.data_type}, nullable: ${c.is_nullable})`);
  }

  console.log('\nMigration complete!');
}

run().catch(e => { console.error(e.message); process.exit(1); });
