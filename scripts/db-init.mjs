/**
 * Standalone DB init script — run with: node scripts/db-init.mjs
 * Reads DATABASE_URL from .env and creates all required tables.
 */
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env manually (no dotenv dependency needed)
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
  } catch { /* ignore */ }
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set. Add it to .env');
  process.exit(1);
}

console.log('Connecting to Neon database...');
const sql = neon(DATABASE_URL);

async function run() {
  console.log('Creating extension pgcrypto...');
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;

  console.log('Creating users table...');
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      user_type VARCHAR(20) NOT NULL DEFAULT 'couple',
      password_hash TEXT NOT NULL,
      profile_image TEXT,
      email_verified BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Creating vendor_applications table...');
  await sql`
    CREATE TABLE IF NOT EXISTS vendor_applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID,
      business_name VARCHAR(255) NOT NULL,
      vendor_type VARCHAR(255),
      location VARCHAR(255),
      business_registration_url TEXT,
      contact_person_name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      portfolio_photos TEXT[],
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'Pending',
      approved_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Adding vendor_applications columns...');
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS user_id UUID;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS vendor_category VARCHAR(255);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS vendor_subcategories TEXT[];`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS business_description TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS primary_location VARCHAR(255);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS areas_served TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS website VARCHAR(500);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS social_links TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS real_work_images TEXT[];`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS starting_price TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS pricing_model VARCHAR(50);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS starting_price_includes TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS minimum_booking_requirement TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS advance_booking_notice TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS setup_time_required TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS breakdown_time_required TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS outdoor_experience VARCHAR(10);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS destination_wedding_experience VARCHAR(10);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS special_requirements TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS category_specific JSONB;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS verification_document_type VARCHAR(255);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS verification_document_url TEXT;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS verification_document_uploaded BOOLEAN DEFAULT false;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255);`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS date_verified TIMESTAMP;`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS approval_status VARCHAR(50) DEFAULT 'Pending';`;
  await sql`ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;`;

  console.log('Creating vendors table...');
  await sql`
    CREATE TABLE IF NOT EXISTS vendors (
      id UUID PRIMARY KEY,
      user_id UUID,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      rating DECIMAL(2,1) DEFAULT 0.0,
      price_range VARCHAR(10),
      description TEXT,
      image_url VARCHAR(500),
      location VARCHAR(255) NOT NULL,
      contact_email VARCHAR(255),
      contact_phone VARCHAR(50),
      approved_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await sql`ALTER TABLE vendors ADD COLUMN IF NOT EXISTS user_id UUID;`;

  // Verify tables were created
  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;
  console.log('\n=== Tables in database ===');
  for (const t of tables) {
    console.log(`  - ${t.table_name}`);
  }

  console.log('\nDB init completed successfully!');
}

run().catch((err) => {
  console.error('DB init failed:', err.message || err);
  process.exit(1);
});
