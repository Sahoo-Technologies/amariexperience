import { describe, it, expect, beforeEach } from 'vitest';
import { createRateLimiter, getClientIp } from '../../api/_lib/rateLimit';

describe('createRateLimiter', () => {
  it('allows requests under the limit', () => {
    const limiter = createRateLimiter('test-allow', { windowMs: 60_000, maxAttempts: 3 });
    expect(limiter.isLimited('ip1')).toBe(false);
    expect(limiter.isLimited('ip1')).toBe(false);
    expect(limiter.isLimited('ip1')).toBe(false);
  });

  it('blocks requests over the limit', () => {
    const limiter = createRateLimiter('test-block', { windowMs: 60_000, maxAttempts: 2 });
    limiter.isLimited('ip2');
    limiter.isLimited('ip2');
    expect(limiter.isLimited('ip2')).toBe(true);
  });

  it('tracks different keys independently', () => {
    const limiter = createRateLimiter('test-keys', { windowMs: 60_000, maxAttempts: 1 });
    limiter.isLimited('ip-a');
    expect(limiter.isLimited('ip-a')).toBe(true);
    expect(limiter.isLimited('ip-b')).toBe(false);
  });

  it('reports remaining attempts', () => {
    const limiter = createRateLimiter('test-remaining', { windowMs: 60_000, maxAttempts: 5 });
    expect(limiter.remaining('ip3')).toBe(5);
    limiter.isLimited('ip3');
    expect(limiter.remaining('ip3')).toBe(4);
  });

  it('can reset a key', () => {
    const limiter = createRateLimiter('test-reset', { windowMs: 60_000, maxAttempts: 1 });
    limiter.isLimited('ip4');
    expect(limiter.isLimited('ip4')).toBe(true);
    limiter.reset('ip4');
    expect(limiter.isLimited('ip4')).toBe(false);
  });
});

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for header', () => {
    expect(getClientIp({ headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } })).toBe('1.2.3.4');
  });

  it('returns unknown when no header is present', () => {
    expect(getClientIp({ headers: {} })).toBe('unknown');
  });
});
