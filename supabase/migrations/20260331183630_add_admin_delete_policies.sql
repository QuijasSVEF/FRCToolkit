/*
  # Add Admin Delete Policies

  1. Security
    - Allow admins to delete section_progress for user cleanup
    - Allow admins to delete bookmarks for user cleanup
    - Allow admins to delete notes for user cleanup
    - Allow admins to delete profiles for user cleanup
*/

CREATE POLICY "Admins can delete section_progress"
  ON public.section_progress
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete bookmarks"
  ON public.bookmarks
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete notes"
  ON public.notes
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete profiles"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
