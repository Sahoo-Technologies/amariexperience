export default function handler(_req: any, res: any) {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV || 'not set'
    }
  });
}
