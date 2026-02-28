/**
 * Sliding-window rate limiter with automatic cleanup.
 *
 * NOTE: This uses in-memory storage. In a serverless environment each cold
 * start resets the map and different instances don't share state. For
 * production-grade rate limiting, swap this for Vercel KV / Upstash Redis.
 * The interface is kept the same so the swap is a one-line change.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  windowMs: number;
  maxAttempts: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStale() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const store of stores.values()) {
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }
}

export function createRateLimiter(name: string, options: RateLimiterOptions) {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }
  const store = stores.get(name)!;

  return {
    isLimited(key: string): boolean {
      cleanupStale();
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now > entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + options.windowMs });
        return false;
      }

      entry.count++;
      return entry.count > options.maxAttempts;
    },

    remaining(key: string): number {
      const entry = store.get(key);
      if (!entry || Date.now() > entry.resetAt) return options.maxAttempts;
      return Math.max(0, options.maxAttempts - entry.count);
    },

    reset(key: string) {
      store.delete(key);
    },
  };
}

export function getClientIp(req: { headers?: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown';
  if (Array.isArray(forwarded)) return forwarded[0]?.split(',')[0]?.trim() ?? 'unknown';
  return 'unknown';
}
