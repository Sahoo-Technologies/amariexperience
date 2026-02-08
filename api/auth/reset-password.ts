import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getSql } from '../_lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { token, newPassword } = (req.body || {}) as any;
  if (!token || !newPassword) {
    res.status(400).json({ error: 'Token and new password are required' });
    return;
  }

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
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

    const resetRecord = rows[0];

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password
    await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${resetRecord.user_id};`;

    // Mark token as used
    await sql`UPDATE password_resets SET used = true WHERE id = ${resetRecord.id};`;

    // Invalidate all sessions for this user (force re-login)
    try {
      await sql`DELETE FROM sessions WHERE user_id = ${resetRecord.user_id};`;
    } catch {
      // sessions table may not exist — that's fine
    }

    res.status(200).json({ ok: true, message: 'Password has been reset successfully. Please log in with your new password.' });
  } catch (e: any) {
    console.error('Reset password error:', e?.message);
    res.status(500).json({ error: 'Failed to reset password. Please try again.' });
  }
}
