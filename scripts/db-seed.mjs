/**
 * Seed script — run with: node scripts/db-seed.mjs
 * Creates admin user, test vendors, and sample vendor applications.
 */
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

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

// ── Admin user ──────────────────────────────────────────────────
const ADMIN_EMAIL = 'sahoot3ch@gmail.com';
const ADMIN_PASSWORD = 'sahoo@2025';

// ── Test vendors with real Unsplash photos ──────────────────────
const VENDORS = [
  {
    name: 'Diani Reef Beach Resort & Spa',
    category: 'Venues',
    rating: 4.9,
    price_range: '$$$$',
    description: 'Award-winning beachfront resort offering stunning ocean-view ceremony spaces, lush tropical gardens, and a dedicated wedding team. Capacity for up to 300 guests with all-inclusive packages.',
    image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format',
    location: 'Diani Beach Road, Kwale County',
  },
  {
    name: 'Coastal Dreams Wedding Planners',
    category: 'Planning & Coordination',
    rating: 4.8,
    price_range: '$$$',
    description: 'Full-service destination wedding planning team with 10+ years of experience on the Kenyan coast. Specializing in multicultural ceremonies, vendor negotiation, and stress-free coordination.',
    image_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format',
    location: 'Diani Beach',
  },
  {
    name: 'Swahili Spice Catering',
    category: 'Catering & Bar Services',
    rating: 4.7,
    price_range: '$$',
    description: 'Authentic coastal cuisine blending traditional Swahili flavors with modern culinary artistry. Farm-to-table ingredients, custom menus, and full bar service for up to 500 guests.',
    image_url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format',
    location: 'Diani Coast',
  },
  {
    name: 'Ocean Lens Studios',
    category: 'Photography, Videography & Content',
    rating: 5.0,
    price_range: '$$$',
    description: 'Professional wedding photography and cinematic film. Drone aerial coverage, underwater shoots, and same-day highlight reels. International award-winning team based in Diani.',
    image_url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format',
    location: 'Diani Beach',
  },
  {
    name: 'Bahari Guest Transfers',
    category: 'Transport & Travel',
    rating: 4.6,
    price_range: '$$',
    description: 'Luxury fleet of vehicles for guest airport transfers, bridal car service, and group shuttles. Safari-converted Land Cruisers and classic vintage cars available.',
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&auto=format',
    location: 'Ukunda Airstrip',
  },
  {
    name: 'Paradise Sands Resort',
    category: 'Venues',
    rating: 4.8,
    price_range: '$$$$',
    description: 'Exclusive boutique resort with private beach, infinity pool ceremonies, and colonial-style ballroom. Intimate settings for 50-200 guests with luxury accommodation.',
    image_url: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&auto=format',
    location: 'Diani Beach South',
  },
  {
    name: 'Bloom & Petal Décor',
    category: 'Décor, Styling & Rentals',
    rating: 4.9,
    price_range: '$$$',
    description: 'Bespoke floral design and event styling. Tropical arrangements, arch installations, table settings, and full venue transformation. Sustainable and locally sourced materials.',
    image_url: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800&auto=format',
    location: 'Diani Beach',
  },
  {
    name: 'DJ Mziki Entertainment',
    category: 'Entertainment & Sound',
    rating: 4.7,
    price_range: '$$',
    description: 'Professional DJ and live music entertainment. Full sound system, lighting rigs, and cultural performance coordination. Specializing in multicultural wedding receptions.',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format',
    location: 'Mombasa / Diani',
  },
  {
    name: 'Pwani Beauty Studio',
    category: 'Beauty & Grooming',
    rating: 4.8,
    price_range: '$$',
    description: 'Bridal makeup, hair styling, and grooming services. Experienced with all skin tones and hair types. On-location services for the entire bridal party.',
    image_url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format',
    location: 'Diani Beach',
  },
  {
    name: 'Tides Cake Studio',
    category: 'Cakes & Desserts',
    rating: 4.9,
    price_range: '$$$',
    description: 'Custom wedding cakes and dessert tables. From classic tiered cakes to modern fondant art. Tropical flavor profiles and stunning beach-themed designs.',
    image_url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&auto=format',
    location: 'Diani Beach',
  },
  {
    name: 'Kazi Tents & Marquees',
    category: 'Tents, Structures & Event Infrastructure',
    rating: 4.5,
    price_range: '$$',
    description: 'Premium tent and marquee rentals for outdoor weddings. Clear-span structures, draped canopies, dance floors, and full event infrastructure solutions.',
    image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format',
    location: 'Kwale County',
  },
  {
    name: 'Coral Cove Villas',
    category: 'Accommodation & Guest Services',
    rating: 4.7,
    price_range: '$$$',
    description: 'Luxury private villas with pools overlooking the Indian Ocean. Perfect for bridal parties, honeymoon suites, and wedding guest accommodation blocks.',
    image_url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format',
    location: 'Galu Beach, Diani',
  },
];

// ── Sample vendor applications ──────────────────────────────────
const APPLICATIONS = [
  {
    business_name: 'Savanna Lights Events',
    vendor_category: 'Lighting, AV & Special Effects',
    business_description: 'Specialist event lighting and AV hire for outdoor beach weddings. LED dance floors, fairy lights, uplighting, and projection mapping.',
    primary_location: 'Mombasa & Diani',
    contact_phone: '+254 722 111 222',
    contact_email: 'info@savannalights.co.ke',
    status: 'Pending',
    terms_accepted: true,
  },
  {
    business_name: 'Diani Safari Experiences',
    vendor_category: 'Experiences & Activities',
    business_description: 'Curated safari day-trips, snorkelling excursions, and cultural tours for wedding guests visiting the coast.',
    primary_location: 'Diani Beach',
    contact_phone: '+254 733 222 333',
    contact_email: 'bookings@dianisafari.com',
    status: 'Pending',
    terms_accepted: true,
  },
  {
    business_name: 'Mombasa Calligraphy Co.',
    vendor_category: 'Stationery, Signage & Personalisation',
    business_description: 'Hand-lettered wedding invitations, signage, seating charts, and custom stationery. Modern and Arabic calligraphy styles.',
    primary_location: 'Mombasa',
    contact_phone: '+254 711 333 444',
    contact_email: 'hello@mombasacalligraphy.com',
    status: 'Pending',
    terms_accepted: true,
  },
  {
    business_name: 'Pwani Bridal Boutique',
    vendor_category: 'Fashion & Attire',
    business_description: 'Designer bridal gowns, bridesmaid dresses, and traditional Kenyan wedding attire. Custom fittings and alterations available.',
    primary_location: 'Diani Beach',
    contact_phone: '+254 700 444 555',
    contact_email: 'appointments@pwanibridals.com',
    status: 'Pending',
    terms_accepted: true,
  },
];

async function run() {
  // ── 1. Create admin user ──
  console.log('Creating admin user...');
  const existing = await sql`SELECT id FROM users WHERE email = ${ADMIN_EMAIL} LIMIT 1;`;
  if (existing.length > 0) {
    // Update to admin type + new password
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await sql`UPDATE users SET user_type = 'admin', password_hash = ${hash}, first_name = 'Sahoo', last_name = 'Admin' WHERE email = ${ADMIN_EMAIL};`;
    console.log('  Admin user updated (existing account promoted).');
  } else {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await sql`
      INSERT INTO users (email, first_name, last_name, phone, user_type, password_hash, email_verified, is_active)
      VALUES (${ADMIN_EMAIL}, 'Sahoo', 'Admin', '+254700000000', 'admin', ${hash}, true, true);
    `;
    console.log('  Admin user created.');
  }

  // ── 2. Seed approved vendors ──
  console.log('Seeding approved vendors...');
  for (const v of VENDORS) {
    const exists = await sql`SELECT id FROM vendors WHERE name = ${v.name} LIMIT 1;`;
    if (exists.length > 0) {
      console.log(`  Skipping "${v.name}" (already exists).`);
      continue;
    }
    const id = crypto.randomUUID();
    await sql`
      INSERT INTO vendors (id, name, category, rating, price_range, description, image_url, location, approved_at, created_at)
      VALUES (${id}, ${v.name}, ${v.category}, ${v.rating}, ${v.price_range}, ${v.description}, ${v.image_url}, ${v.location}, NOW(), NOW());
    `;
    console.log(`  Added vendor: ${v.name}`);
  }

  // ── 3. Seed vendor applications ──
  console.log('Seeding vendor applications...');
  for (const a of APPLICATIONS) {
    const exists = await sql`SELECT id FROM vendor_applications WHERE business_name = ${a.business_name} LIMIT 1;`;
    if (exists.length > 0) {
      console.log(`  Skipping application "${a.business_name}" (already exists).`);
      continue;
    }
    const id = crypto.randomUUID();
    await sql`
      INSERT INTO vendor_applications (
        id, business_name, vendor_type, vendor_category, business_description,
        primary_location, location, contact_person_name, contact_phone, contact_email,
        email, phone, status, terms_accepted, terms_accepted_at, submitted_at
      ) VALUES (
        ${id}, ${a.business_name}, ${a.vendor_category}, ${a.vendor_category}, ${a.business_description},
        ${a.primary_location}, ${a.primary_location}, ${a.business_name}, ${a.contact_phone}, ${a.contact_email},
        ${a.contact_email}, ${a.contact_phone}, ${a.status}, ${a.terms_accepted}, NOW(), NOW()
      );
    `;
    console.log(`  Added application: ${a.business_name}`);
  }

  // ── 4. Verify counts ──
  const userCount = await sql`SELECT COUNT(*) as c FROM users;`;
  const vendorCount = await sql`SELECT COUNT(*) as c FROM vendors;`;
  const appCount = await sql`SELECT COUNT(*) as c FROM vendor_applications;`;

  console.log('\n=== Database Summary ===');
  console.log(`  Users: ${userCount[0].c}`);
  console.log(`  Approved vendors: ${vendorCount[0].c}`);
  console.log(`  Vendor applications: ${appCount[0].c}`);
  console.log('\nSeed completed!');
}

run().catch((e) => { console.error('Seed failed:', e.message); process.exit(1); });
