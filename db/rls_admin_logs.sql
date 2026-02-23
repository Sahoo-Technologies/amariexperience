-- RLS and restrictive policies for public.admin_logs
-- Safe default: enable RLS, revoke broad grants, allow SELECT only for admins
-- Server/service role allowed to INSERT/UPDATE/DELETE. Adjust role names to match your setup.

BEGIN;

-- 1) Enable Row Level Security
ALTER TABLE public."admin_logs" ENABLE ROW LEVEL SECURITY;

-- 2) Revoke broad grants from PUBLIC/anon
REVOKE ALL ON public."admin_logs" FROM PUBLIC;
REVOKE ALL ON public."admin_logs" FROM anon;

-- 3) Allow SELECT only for application admins (JWT claim role = 'admin')
--    Adjust claim key/path if your JWT uses a different claim.
CREATE POLICY "admin_logs_select_admins" ON public."admin_logs"
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'admin');

-- 4) Allow server/service role to INSERT/UPDATE/DELETE
--    If your environment uses a dedicated DB role for server processes (e.g., "service_role"), keep these.
--    Service roles often bypass RLS; explicit policies add clarity.
CREATE POLICY "admin_logs_insert_service" ON public."admin_logs"
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "admin_logs_update_service" ON public."admin_logs"
  FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "admin_logs_delete_service" ON public."admin_logs"
  FOR DELETE
  TO service_role
  USING (true);

-- 5) OPTIONAL: allow authenticated users to insert their own log entries (commented out)
--    Uncomment and adjust if you want users to append logs tied to their own uid only.
-- CREATE POLICY "admin_logs_insert_self" ON public."admin_logs"
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- 6) Index common policy columns to avoid perf regressions
CREATE INDEX IF NOT EXISTS idx_admin_logs_user_id ON public."admin_logs" (user_id);

COMMIT;
