/*
  # Create Sections and Subsections Tables

  1. New Tables
    - `sections`
      - `id` (text, primary key) - slug-style identifier e.g. 'getting-started'
      - `title` (text) - display title
      - `description` (text) - module description
      - `icon` (text) - icon name from lucide-react
      - `estimated_minutes` (integer) - estimated completion time
      - `sort_order` (integer) - display order
      - `has_quiz` (boolean) - whether this section has a quiz
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `subsections`
      - `id` (text) - slug-style identifier
      - `section_id` (text, FK to sections) - parent section
      - `title` (text) - display title
      - `sort_order` (integer) - display order within section
      - `created_at` (timestamptz)
      - Primary key: (section_id, id)

  2. Security
    - Enable RLS on both tables
    - All authenticated users can read sections and subsections
    - Only admins can insert, update, and delete
*/

CREATE TABLE IF NOT EXISTS public.sections (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'BookOpen',
  estimated_minutes integer DEFAULT 15,
  sort_order integer NOT NULL DEFAULT 0,
  has_quiz boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subsections (
  id text NOT NULL,
  section_id text NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (section_id, id)
);

CREATE INDEX IF NOT EXISTS idx_subsections_section_id ON public.subsections(section_id);

ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subsections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sections"
  ON public.sections
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert sections"
  ON public.sections
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update sections"
  ON public.sections
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete sections"
  ON public.sections
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Authenticated users can read subsections"
  ON public.subsections
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert subsections"
  ON public.subsections
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update subsections"
  ON public.subsections
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete subsections"
  ON public.subsections
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
