/*
  # Add Admin Role and Policies

  1. Changes to `profiles` table
    - Add admin check function `is_admin()` that verifies current user has role='admin'

  2. New Policies
    - Admins can read ALL profiles (for user management)
    - Admins can update ALL profiles (for role changes, etc.)
    - Admins can read ALL section_progress (for analytics)
    - Admins can read ALL bookmarks (for analytics)
    - Admins can read ALL notes (for analytics)

  3. Security
    - Admin access is determined by the `role` column in `profiles`
    - Only existing admin users can perform admin operations
    - Regular user policies remain unchanged
*/

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can read all section_progress"
  ON public.section_progress
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can read all bookmarks"
  ON public.bookmarks
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can read all notes"
  ON public.notes
  FOR SELECT
  TO authenticated
  USING (public.is_admin());
