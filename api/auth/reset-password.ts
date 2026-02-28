import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getSql } from '../_lib/db.js';
import { createRateLimiter, getClientIp } from '../_lib/rateLimit.js';
import { createLogger } from '../_lib/logger.js';

const log = createLogger('auth/reset-password');
const resetLimiter = createRateLimiter('reset-password', { windowMs: 15 * 60 * 1000, maxAttempts: 10 });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const clientIp = getClientIp(req);
  if (resetLimiter.isLimited(clientIp)) {
    log.warn('Rate limited', { ip: clientIp });
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  const { token, newPassword } = (req.body || {}) as any;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Token is required' });
    return;
  }
  if (!newPassword || typeof newPassword !== 'string') {
    res.status(400).json({ error: 'New password is required' });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long' });
    return;
  }

  try {
    const sql = getSql();

    // Hash the incoming token to match stored hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid, unused reset token
    const rows = await sql`
      SELECT pr.id, pr.user_id, pr.expires_at, pr.used
      FROM password_resets pr
      WHERE pr.token_hash = ${tokenHash}
        AND pr.used = false
        AND pr.expires_at > NOW()
      LIMIT 1;
    `;

    if (rows.length === 0) {
      res.status(400).json({ error: 'Invalid or expired reset token. Please request a new one.' });
      return;
    }

    const resetRecord = rows[0]!;

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password
    await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${resetRecord.user_id};`;

    // Mark token as used and delete all tokens for this user
    await sql`DELETE FROM password_resets WHERE user_id = ${resetRecord.user_id};`;

    // Invalidate all sessions for this user (force re-login)
    try {
      await sql`DELETE FROM sessions WHERE user_id = ${resetRecord.user_id};`;
    } catch {
      // sessions table may not exist — that's fine
    }

    res.status(200).json({ ok: true, message: 'Password has been reset successfully. Please log in with your new password.' });
  } catch (e: any) {
    log.error('Reset password failed', e instanceof Error ? e : new Error(String(e?.message)));
    res.status(500).json({ error: 'Failed to reset password. Please try again.' });
  }
}
