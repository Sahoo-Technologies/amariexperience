import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection URL'),
  SUPABASE_DB_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  GEMINI_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERCEL_URL: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let _validated: ServerEnv | null = null;

export function getEnv(): ServerEnv {
  if (_validated) return _validated;

  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    console.error(`[env] Invalid environment variables:\n${formatted}`);
    throw new Error(`Missing or invalid environment variables:\n${formatted}`);
  }

  _validated = result.data;
  return _validated;
}
