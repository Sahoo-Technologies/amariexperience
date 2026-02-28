import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { getSql } from '../_lib/db.js';
import { setSessionCookie } from '../_lib/auth.js';
import { createRateLimiter, getClientIp } from '../_lib/rateLimit.js';
import { createLogger } from '../_lib/logger.js';

const log = createLogger('auth/login');
const loginLimiter = createRateLimiter('login', { windowMs: 15 * 60 * 1000, maxAttempts: 10 });

export default async function handler(req: VercelRequest, res: VercelResponse) {
 try {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const clientIp = getClientIp(req);
  if (loginLimiter.isLimited(clientIp)) {
    log.warn('Rate limited', { ip: clientIp });
    res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
    return;
  }

  const { email, password } = (req.body || {}) as any;
  if (!email || !password) {
    res.status(400).json({ error: 'Missing email or password' });
    return;
  }

  try {
    const sql = getSql();

    const rows = await sql`
      SELECT id, email, first_name, last_name, phone, user_type, password_hash,
             created_at, email_verified, is_active, profile_image, last_login
      FROM users
      WHERE email = ${email.trim().toLowerCase()} AND is_active = true
      LIMIT 1;
    `;

    if (rows.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id};`;

    setSessionCookie(res, { sub: user.id, email: user.email, userType: user.user_type });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        profileImage: user.profile_image,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        isActive: user.is_active,
        emailVerified: user.email_verified
      }
    });
  } catch (e: any) {
    log.error('Login query failed', e instanceof Error ? e : new Error(String(e)));
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
 } catch (fatal: any) {
    log.error('Fatal error', fatal instanceof Error ? fatal : new Error(String(fatal)));
    res.status(500).json({ error: 'Internal server error' });
 }
}
